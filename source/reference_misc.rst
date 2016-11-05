===========
securitykey
===========
One-time and CSRF tokens.

.. automodule:: server.securitykey
    :members:



=====
utils
=====
Utility functions.

.. autofunction:: server.utils.generateRandomString

.. autofunction:: server.utils.sendEMail

.. autofunction:: server.utils.sendEMailToAdmins

.. autofunction:: server.utils.getCurrentUser

.. autofunction:: server.utils.markFileForDeletion

.. autofunction:: server.utils.escapeString

.. autofunction:: server.utils.safeStringComparison

.. autofunction:: server.utils.normalizeKey


=======
indexes
=======
An efficient index manager.

.. autoclass:: server.indexes.IndexMannager
    :members: __init__, keyFromQuery, cursorForQuery, getPages, refreshIndex

