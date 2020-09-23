===========
securitykey
===========
One-time and CSRF tokens.

.. automodule:: viur.core.securitykey
    :members:



=====
utils
=====
Utility functions.

.. autofunction:: viur.core.utils.generateRandomString

.. autofunction:: viur.core.utils.sendEMail

.. autofunction:: viur.core.utils.sendEMailToAdmins

.. autofunction:: viur.core.utils.getCurrentUser

.. autofunction:: viur.core.utils.markFileForDeletion

.. autofunction:: viur.core.utils.escapeString

.. autofunction:: viur.core.utils.normalizeKey


=======
indexes
=======
An efficient index manager.

.. autoclass:: viur.core.indexes.IndexMannager
    :members: __init__, keyFromQuery, cursorForQuery, getPages, refreshIndex

