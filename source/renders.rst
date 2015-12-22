Renders
=======

In ViUR, the logic rendering the actual output is separated from the application logic.
Each application communicates with its assigned render using the API defined below, and that render
is responsible of rendering the data supplied to the desired output format.
Currently, ViUR provides renders for

 - Html (using the jinja2 template engine)
 - json
 - pdf
 - rss
 - xml

.. Note::
    Not every render is capable of performing every action. The pdf-render is currently lacking support of embedded forms,
    so its currently not possible to add or edit entities using the pdf-render.

The default render is *jinja2*. This render uses the jinja2 template engine to provide a simple an fast way of wrapping data into html templates.
We recommend to use this render for new projects wherever possible, but its also possible to build you own render and use a different template engine.
ViUR does some magic on startup to map each render to modules. Each render gets its own prefix under which modules enabled for this render are reachable.
The only exception is the default-render; its modules are available without prefix. In the following example, all requests are made to the same module (page)
and action (list all pages), but to different renders. The first request will be routed to the default render (as said, usually jinja2), the second will
render the same data as pdf, and the third one will yield the data as json.

::

 /page/list
 /pdf/page/list
 /json/page/list

The pairing from modules - renders is initialized by calling the :py:func:`server.setup` command. It accepts an optional third parameter *default*
which allows specifying the name of the default render.

\subsection{Jinja2}
The jinja2 render offers the whole default-functionality of jinja2 and adds some ViUR specific extras.


Admin
^^^^^
The admin-render is a clone of the json render. The only customisation is that access to this render is restricted
to users having 'admin' or 'root' access.

Jinja2
^^^^^^

Jinja2 is the default template engine in ViUR. Data made available to templates if prepared to its use-case. In view,
a skeleton is passed in a different way than in edit/add. In views, data from bones is mapped in the following ways:

    - String and Text-bones contain their value as string if they are not translated. If translation is enabled for such
        bones, a special wrapper is returned, yielding the content of that bone in the language of the current request
        (If there is no translation available for that bone in this language, ViUR tries to choose the best one from
        that bone). If you need to access the data of such a bone in different languages, append ["lang"].

        ::

            {{skel.name}} {# Returns the contents of name in the current language #}
            {{skel.name["de"]}} {# Retrives the contents in German. Might be None if no such translation was saved #}

    - SelectOne and SelectMulti-Bones return a wapper that yields the *key* of the selected options. The (translated)
        Description is available by appending *.descr*

        ::

            {{skel.option}} {# The *key* (or list-of-keys) of that selection #}
            {{skel.option.descr}} {# The *description* (or list-of-descriptions) of that selection #}

    - Relational and ExtendedRelationalBones yield a dictionary (or list-of-dicts) containing the id and any keys
        named in refKeys of the referenced object. If a bone is multiple, a special list of such dictionaries is provided,
        allowing direct selection of values from those dictionaries.

        ::

            {{skel.rel}} {# A dict like {"id": "ah......", "name": "TestEntry"} for multiple=False#}
            {{skel.rel}} {# A list of dict like [{"id": "ah......", "name": "TestEntry1"}, {"id": "ah......", "name": "TestEntry2"}] for multiple=True#}
            {{skel.rel.name}} {# A list of all values for *name* like  ["TestEntry1", "TestEntry2"] #}

    - PasswordBones are always None as passwords are stored hashed and cannot be read.

    - All other Bones contain their native types (Int/Float/Bool)

In edit/add forms, no such conversion is performed. ViUR passes a dictionary of *structure*, *errors* and *value*.
*Structure* is a OrderedDict, containing all the information needed to render a input field for that bone (visible?, readOnly?, *values* for select*Bones, ...).
*Value* is a dictionary, containing the *raw* values of these bones (ie. whats'ever in skel[bone].value).
*Errors* lists errors returned from the save during the last save attempt (if it has been tried to save the entry, but
it was rejected due to invalid/missing data). ViUR provides a ready-to-use macro to create a html form from this data.

In addition to the data, ViUR also exposed several functions and filters to your templates.

    - requestParams: Returns a dictionary of the parameters send along with the current Get/Post request. Keys and Values
     have been htmlQuoted for safety reasons.
    - getSession: Reads a separate space of the current session and returns the keys/values stored there
    - setSession: Stores a new key->value pair in the session. Its saved in a seperate space of the session so it can
     never conflict with data stored by ViUR/modul-level code.
    - getSkel: Returns the structure of the requested skel. The format is same as in edit/add.
    - getEntry: Fetches a entry from the datastore and returns it in the same format as in view/list. This obeys
      canView/listFilter from the module - if the current user has no access to that entry, none is returned.
    - TBD


--- LIST OF builtin filters/funcs

.. automodule:: server.render.jinja2.default
   :show-inheritance:
   :members:
   :private-members:
   :special-members:


Json
^^^^

.. automodule:: server.render.json.default
   :show-inheritance:
   :members:
   :private-members:
   :special-members:


PDF
^^^

.. automodule:: server.render.pdf.default
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


RSS
^^^

.. automodule:: server.render.rss.default
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


Vi
^^
Like the admin-render, this is a clone of the json render.
The only customisation is that access to this render is restricted to users having 'admin' or 'root' access.


