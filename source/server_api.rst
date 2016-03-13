server
------


.. autofunction:: server.setup

lang support
^^^^^^^^^^^^

.. autofunction:: server.translate

.. autofunction:: server.setDefaultLanguage

.. autofunction:: server.setDefaultDomainLanguage


server.cache - A Request Cache
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. automodule:: server.cache
   :members:
   :undoc-members:
   :private-members:
   :special-members:
   :inherited-members:



server.securityheaders - Set varius security releated http-headers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This module allows configuring security related http-headers. The use is highly recommended.

 - Content Security Policy: This header tells the clients browser, in which way and from which sources resources
   like images, css and javascript may be supplied. You should at *least* deny inline javascript.
   See https://developer.mozilla.org/docs/Web/Security/CSP for more informations.
 - Http strict transport security: Force the use of https:// for the current domain even if the user enters an http://
   link in the future. Currently only supported on *.appspot.com.
   See https://developer.mozilla.org/docs/Web/Security/HTTP_strict_transport_security and https://cloud.google.com/appengine/docs/python/requests#Python_Request_headers .
 - Public key pinning: Explicitly white-list specifiy certificates / certificate authorities for this domain. The client
   will reject any other (possibly even valid) certificates not matching these criteria. Currently not supported on
   the appengine. See https://code.google.com/p/googleappengine/issues/detail?id=12694 and
   https://developer.mozilla.org/docs/Web/Security/Public_Key_Pinning .
 - X-Frame-Options: Prevents loading your site inside an <iframe>. Prevents certain types of click-jacking attacks if
   supported by the browser. See https://developer.mozilla.org/docs/Web/HTTP/X-Frame-Options .
 - X-Xss-Protection: Configure reflected XSS-Protection found in IE and Chrome. Use with care, as certain versions of IE
   contain a bug that actually *opens* an XSS-vulnerability if enabled!
   See https://hackademix.net/2009/11/21/ies-xss-filter-creates-xss-vulnerabilities/ and
   https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-iv-the-xss-filter/ .
 - X-Content-Type-Options: Disables Mimetype-sniffing performed by IE and Chrome.
   See https://blogs.msdn.microsoft.com/ie/2008/09/02/ie8-security-part-vi-beta-2-update/ .


.. automodule:: server.securityheaders
   :members:
   :undoc-members:
   :private-members:
   :special-members:
   :inherited-members:

server.db - Database access tools
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. autofunction:: server.db.Get

.. autofunction:: server.db.GetAsync

.. autofunction:: server.db.GetOrInsert

.. autofunction:: server.db.Put

.. autofunction:: server.db.PutAsync

.. autofunction:: server.db.Delete

.. autofunction:: server.db.DeleteAsync

.. autoclass:: server.db.Entity
   :show-inheritance:
   :members:
   :special-members:


.. autoclass:: server.db.Query
   :show-inheritance:
   :members:
   :special-members:


server.errors - Map Python Exceptions to HTTP Error-Codes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. autoclass:: server.errors.HTTPException
    :members: = __init__

.. autoclass:: server.errors.BadRequest
    :members: = __init__

.. autoclass:: server.errors.Redirect
    :members: = __init__

.. autoclass:: server.errors.Unauthorized
    :members: = __init__

.. autoclass:: server.errors.PaymentRequired
    :members: = __init__

.. autoclass:: server.errors.Forbidden
    :members: = __init__

.. autoclass:: server.errors.NotFound
    :members: = __init__

.. autoclass:: server.errors.MethodNotAllowed
    :members: = __init__

.. autoclass:: server.errors.NotAcceptable
    :members: = __init__

.. autoclass:: server.errors.RequestTimeout
    :members: = __init__

.. autoclass:: server.errors.Gone
    :members: = __init__

.. autoclass:: server.errors.PreconditionFailed
    :members: = __init__

.. autoclass:: server.errors.RequestTooLarge
    :members: = __init__

.. autoclass:: server.errors.InternalServerError
    :members: = __init__

.. autoclass:: server.errors.NotImplemented
    :members: = __init__

.. autoclass:: server.errors.BadGateway
    :members: = __init__

.. autoclass:: server.errors.ServiceUnavailable
    :members: = __init__

.. autoclass:: server.errors.ReadFromClientError
    :members: = __init__

server.indexes - Efficient Pagination
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: server.indexes.IndexMannager
    :members: __init__, keyFromQuery, cursorForQuery, getPages, refreshIndex


server.request - Access the BrowseHandler-Instance for the current request
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. autoclass:: server.request.RequestWrapper


server.securitykey - One-time Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. automodule:: server.securitykey
    :members:

server.utils
^^^^^^^^^^^^

.. autofunction:: server.utils.generateRandomString

.. autofunction:: server.utils.sendEMail

.. autofunction:: server.utils.sendEMailToAdmins

.. autofunction:: server.utils.getCurrentUser

.. autofunction:: server.utils.markFileForDeletion

.. autofunction:: server.utils.escapeString
