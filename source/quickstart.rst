Getting started
===============

This is a short step by step guide to create your first custom module.

 - Modulname: Test
 - Application: List (Flat Data)
 - Entities consist of Name and Description (Optional)
 - List is public (everyone can see entries)
 - Only admins can add or edit entries (ViURs default)
\end{itemize}

Create the module
----------------

First step: Create the file "test.py" inside the modules folder of the application and  import the required modules.

::

    # -*- coding: utf-8 -*-
    from server.bones import *
    from server.applications.list import List
    from server.skeleton import Skeleton


Second step: Define the data-model. We define an Entity *testentries*, which contains two properties: name and description.
Name is a short String (< 255 Chars); Description a longer, optional Text.


::

    class TestSkel( Skeleton ): #Datamodel for this modul:
        entityName = "testentries" #Save entities to the collection testentries
        name = stringBone(  descr="Name", required=True )
        descr = textBone(  descr="Descr", required=False )


Third step: Connect the Datamodel with an application. This connects the previously defined datamodel with an ViUR-Application that organizes this data.

::

   class Test( List ):
       viewSkel = TestSkel
       addSkel = TestSkel
       editSkel = TestSkel


Fourth step: Specify the required information for the admintool. These information provide the necessary information for the
admin-tool for the just created module. If a module should be hidden from the admin, set this information to None.


::

    adminInfo = {
            "name": "My first Testapp", #Name of this modul, as shown in Admin
            "handler": "list",  #Which handler to invoke
            "icon": "icons/modules/liste_small.png", #Icon for this modul
            "filter":{"orderby":"name"}, #Default filter for the admin (i.e. dont filter; just sort )
            "coumns":["name"] # Default set of columns visible in the admin
    }


Fifths step: Define the accessrights. In this example, we'll make the list public;
but changes are still restricted to administrators of the application.
If we don't override this function, read-access would be also restricted to administrators only.

::

    def listFilter(self, rawfilter):
        # Accesscontrol: Let everyone view the contents
        return( rawfilter )


Last step: Registering the module. This enables the application.
The module must be named inside the __init__.py in the modules-Folder.

::

    from modules.test import Test as test


The application is now active and can be administrated using the admin-tool.
However, there are no templates for displaying the data inside a webbrowser defined yet.

Create a template
----------------

Before you create the template for this module, its required to register this template first in the module.
Add the following lines to the module-class.

::

     viewTemplate = "test_view" #Name of the template which displays *one* entry
     listTemplate = "test_list" #Name of the template which displays several entries


The whole module should now look like this:

::

    # -*- coding: utf-8 -*-
    from server.bones import *
    from server.applications.list import List
    from server.skeleton import Skeleton

    class TestSkel( Skeleton ): #Datamodel for this modul:
       entityName = "testentries" #Save entities to the collection testentries
       name = stringBone(  descr="Name", required=True )
       descr = textBone(  descr="Descr", required=False )

    class Test( List ):
       viewSkel = TestSkel
       addSkel = TestSkel
       editSkel = TestSkel

       viewTemplate = "test_view" #Name of the template which displayes *one* entry
       listTemplate = "test_list" #Name of the template which displayes several entries

       adminInfo = {  "name": "My first Testapp", #Name of this modul, as shown in Admin
            "handler": "list",  #Which handler to invoke
            "icon": "icons/modules/liste_small.png", #Icon for this modul
            "filter":{"orderby":"name"}, #Default filter for the admin (i.e. dont filter; just sort )
            "coumns":["name"] # Default set of columns visible in the admin
       }

       def listFilter(self, rawfilter):
           # Accesscontrol: Let everyone view the contents
           return( rawfilter )


Now create the templates.
Possible layout for html/test_view.html:

::

   ...
   <h1>{{skel.name}}</h1>
   {{skel.descr}}
   ...

Possible layout for html/test_list.html:

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


Switching to hierarchical Data
-------------------------------

If a flat datastructure doesn't fit your needs anymore, its easy to switch to a hierarchical structure.
The following code shows the modified module, which utilizes the hierarchy application to store its data.

::

 # -*- coding: utf-8 -*-
 from server.bones import *
 from server.applications.hierarchy import Hierarchy, HierarchySkel

 class TestSkel( HierarchySkel ):
   entityName = "testentries"
   name = stringBone(  descr="Name", params={"searchable": True} )
   descr = textBone(  descr="Descr", params={"searchable": True} )

 class Test( Hierarchy ):
   viewSkel = TestSkel
   addSkel = TestSkel
   editSkel = TestSkel

   adminInfo = {  "name": "My first Testapp", #Name of this modul, as shown in Admin
         "handler": "hierarchy",  #Which handler to invoke
         "icon": "icons/modules/liste_small.png", #Icon for this modul
         "filter":{"orderby":"name"}, #Default filter for the admin (i.e. dont filter; just sort )
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

