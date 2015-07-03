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



server.csp - Content Security Policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. automodule:: server.csp
   :members:
   :undoc-members:
   :private-members:
   :special-members:
   :inherited-members:

server.db
^^^^^^^^^

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


server.securitykey - Onetime Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. automodule:: server.securitykey
    :members:

server.skeleton
^^^^^^^^^^^^^^^

.. autoclass:: server.skeleton.Skeleton
   :show-inheritance:
   :members:
   :special-members:

.. autoclass:: server.skeleton.SkelList
   :show-inheritance:
   :members:
   :special-members:


.. autoclass:: server.skeleton.RelSkel
   :show-inheritance:
   :members:
   :special-members:

.. autoclass:: server.skeleton.TaskUpdateSeachIndex
   :show-inheritance:
   :members:
   :special-members:

server.utils
^^^^^^^^^^^^

.. autofunction:: server.utils.generateRandomString

.. autofunction:: server.utils.sendEMail

.. autofunction:: server.utils.sendEMailToAdmins

.. autofunction:: server.utils.getCurrentUser

.. autofunction:: server.utils.markFileForDeletion

.. autofunction:: server.utils.escapeString
