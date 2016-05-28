Other commonly accessed functionality
-------------------------------------

The current request
^^^^^^^^^^^^^^^^^^^
Sometimes a function need to gather more information about the currently running request.
In ViUR its possible to retrieve the current wsgi wrapper object .. py:class::`google.appengine.ext.webapp.Request`.

::

        from server import request

        req = request.current.get()

Testing for internal requests

To check if your function is called within an internal request (eg. called by *execRequest* from an jinja2 template),
use

::

        request.current.get().internalRequest


Testing for development environment

::

        if request.current.get().isDevServer:
                pass


Testing for a secure connection

::

        if request.current.get().isSSLConnection:
                pass


Setting the content-type:

::

        request.current.get().response.headers['Content-Type'] = "your/content-type"



Store and retrieve request-temporal values:

::

        tmp = request.current.requestData()
        tmp[key] = value

.. Note::

        This is *not* the session-data. The data stored here vanishes with the end of the current http-request.


