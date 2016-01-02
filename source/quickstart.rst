Getting started
===============

Before getting started with ViUR, there are some pitfalls we should clarify up front.
First, ViUR is **not** a content mannagement system. It offers you the *building blocks to build one* in no time.
But again, it's not a ready to use cms. Second, you'll need to understand the basic principle of building applications
with ViUR. With ViUR, you'll merge a model (a *skeleton* in ViURs language) and an application
(like list/tree/hierarchy/singleton) into a module. On this level access-rights and module-specific code are added and
one (or usually more) output render are attached.

 .. figure:: images/quickstart/gettingstarted1.jpeg
    :align: center
    :alt: Overview of an example module
    :figclass: align-center

    Overview of an example module


So whats happening here?
 1) We define a model named "news". Each entry will have a (required) *name* and an optional *descr* (description).
    - This model *must* be defined in your models folder and *should* be in a file called news.py
 2) We'll use the list application to handle our data. So our news will be stored in a flat list, with lots filtering
    / sorting possibilities.
 3/8) We (explicitly) attach the jinja2 render to our module. As the jinja2 render is currently the default, there
    is no need to do this explicitly (ViUR will enable the admin and the jinja2 render by default. All other renders
    have to be named here!).
 4) Define the actual module. It *must* be in your *modules* folder and *should* be in a file called *news.py*.
    We define a single class called *News*. That name is used to determine which skeleton (model) should be attached to
    this module, so it must be named excatly as the kindName used in the skeleton (Override the function *_resolveSkel*
    if you need to change this behaviour).
 5) Within this module, we declare which templates to use. This module would use "news_list.tpl" inside your *html* folder
    for rendering /news/list and "news_view.html" for /news/view/some_news_id.
 6) We override the default access restriction for view (default: deny everything except for admins). We allow everyone
    to view all news present in the system.
 7) Add an adminInfo. If this dictionary is present, this module will show up in your admin/vi interface. Setting this
    to None will hide this module from your admin interfaces.



In this short step by step guide we create your first custom module.

 - Modulname: News
 - Application: List (Flat Data)
 - Entities consist of Name and Description (Optional)
 - List is public (everyone can see entries)
 - Only admins can add or edit entries (ViURs default)


First step: Define the data-model. We define an Entity *news*, which contains two properties: name and description.
Name is a short String (< 255 Chars); Description a longer, optional Text. This file should be named *news.py* and
*must* be in your models folder

::
    # -*- coding: utf-8 -*-
    from server.skeleton import Skeleton
    from server.bones import *

    class NewsSkel( Skeleton ): #Datamodel for this modul:
        kindName = "news" #Save entities to the collection news
        name = stringBone(  descr="Name", required=True )
        descr = textBone(  descr="Descr", required=False )



Second step: Create the file "news.py" inside the *modules* folder of the application and  import the required application.

::

    # -*- coding: utf-8 -*-

    from server.applications.list import List




Third step: Create a subclass from the list application and specify the required information for the admintool.
These information provide the necessary information for the admin-tool for the just created module.
If a module should be hidden from the admin, set this information to None.


::

class Test( List ):
    adminInfo = {
            "name": "News", #Name of this modul, as shown in Admin
            "handler": "list",  #Which handler to invoke
            "icon": "icons/modules/news.png", #Icon for this modul
            "filter":{"orderby":"creationdate"}, #Default filter for the admin (i.e. dont filter; just sort )
            "columns":["name"] # Default set of columns visible in the admin
    }


Fourth step: Define the accessrights. In this example, we'll make the list public;
but changes are still restricted to administrators of the application.
If we don't override this function, read-access would be also restricted to administrators only.

::

    def listFilter(self, rawfilter):
        # Accesscontrol: Let everyone view the contents
        return( rawfilter )


Fifths step: Registering the module. This enables the application.
The module must be named inside the __init__.py in the modules-Folder.

::

    from modules.news import News as news


The application is now active and can be administrated using your favorite admin interface.
However, there are no templates for displaying the data inside a webbrowser defined yet.




Create a template
----------------

Before you create the template for this module, its required to register this template first in the module.
Add the following lines to the module-class.

::

     viewTemplate = "news_view" #Name of the template which displays *one* entry
     listTemplate = "news_list" #Name of the template which displays several entries


The whole module should now look like this:

::

    # -*- coding: utf-8 -*-
    from server.applications.list import List

    class News(List):
       viewTemplate = "news_view" #Name of the template which displayes *one* entry
       listTemplate = "news_list" #Name of the template which displayes several entries

       adminInfo = {  "name": "News", #Name of this modul, as shown in Admin
            "handler": "list",  #Which handler to invoke
            "icon": "icons/modules/news.png", #Icon for this modul
            "filter":{"orderby":"creationdate"}, #Default filter for the admin (i.e. dont filter; just sort )
            "coumns":["name"] # Default set of columns visible in the admin
       }

       def listFilter(self, rawfilter):
           # Accesscontrol: Let everyone view the contents
           return( rawfilter )


Now create the templates.
Possible layout for html/news_view.html:

::

   ...
   <h1>{{skel.name}}</h1>
   {{skel.descr}}
   ...

Possible layout for html/news_list.html:

::

  <table>
    <thead>
      <tr>
        <td>Name</td>
        <td>View</td>
      </tr>
    </thead>
    {% for skel in skellist %}
      <tr>
        <td>{{skel.name}}</td>
        <td><a href="/test/view/{{skel.id}}">View more</a></td>
      </tr>
    {% endfor %}
  </table>


Example two: Add a more finegraned access model
-----------------------------------------------

So what if we need to distinguish between registered users and guests?
Step one: We add a new property to our newsmodel.

::

    class NewsSkel( Skeleton ): #Datamodel for this modul:
        kindName = "news" #Save entities to the collection news
        name = stringBone(  descr="Name", required=True )
        descr = textBone(  descr="Descr", required=False )
        access = selectOneBone(descr="Access", values={"0":"Everyone", "1":"Registered users", "2":"Admins Only"}, required=True, indexed=True)

Step two: make the listFilter function aware of this

::

       def listFilter(self, rawfilter):
           usr = utils.getCurrentUser() # Is this request from an authenticated user?
           if usr and usr["access"] and "root" in usr["access"]: # Its an admin
                return rawfilter # Don't enforce any constrains here
           if usr: # Just a normal user
                rawfilter.filter("access <=", "2")
           else: # Its a guest
                rawfilter.filter("access <=", "1")
           return rawfilter




Example three: Switching to hierarchical Data
---------------------------------------------

If a flat datastructure doesn't fit your needs anymore, its easy to switch to a hierarchical structure.
The following code shows the modified module, which utilizes the hierarchy application to store its data.

Update your skeleton to derive from server.applications.hierarchy.HierarchySkel

::

 # -*- coding: utf-8 -*-
    from server.bones import *
    from server.applications.hierarchy import HierarchySkel


    class NewsSkel( HierarchySkel ): #Datamodel for this modul:
        kindName = "news" #Save entities to the collection news
        name = stringBone(  descr="Name", required=True )
        descr = textBone(  descr="Descr", required=False )
        access = selectOneBone(descr="Access", values={"0":"Everyone", "1":"Registered users", "2":"Admins Only"}, required=True, indexed=True)



Then update your application to derive from server.applications.hierarchy.Hierarchy and override the corresponding
canAccess methods:

::


    # -*- coding: utf-8 -*-
    from server.applications.hierarchy import Hierarchy, HierarchySkel

    class News(Hierarchy):
       viewTemplate = "news_view" #Name of the template which displayes *one* entry
       listTemplate = "news_list" #Name of the template which displayes several entries

       adminInfo = {  "name": "News", #Name of this modul, as shown in Admin
            "handler": "list",  #Which handler to invoke
            "icon": "icons/modules/news.png", #Icon for this modul
            "filter":{"orderby":"creationdate"}, #Default filter for the admin (i.e. dont filter; just sort )
            "coumns":["name"] # Default set of columns visible in the admin
       }

    def getAvailableRootNodes( self, *args, **kwargs ):
        # We only want one RootNode per Application
        repo = self.ensureOwnModulRootNode()
        return( [{"name":u"Test", "key": repo.key.urlsafe() }] )

    def canView( self, id ):
        #Anybody can view every entry
        return( True )

    def canList( self, parent ):
        #Anybody can browse a node
        return( True )

