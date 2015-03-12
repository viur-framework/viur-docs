Renders
=========

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
