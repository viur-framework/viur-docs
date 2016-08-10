Server API Reference
####################

Main server entry.

.. autofunction:: server.setup

.. autofunction:: server.setDefaultLanguage

.. autofunction:: server.setDefaultDomainLanguage

.. autofunction:: server.translate

bones
=====
.. _reference_bones:

.. automodule:: server.bones.bone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

booleanBone
-----------

.. automodule:: server.bones.booleanBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

colorBone
---------

.. automodule:: server.bones.colorBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

dateBone
--------

.. automodule:: server.bones.dateBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

emailBone
---------

.. automodule:: server.bones.emailBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

fileBone
--------

.. automodule:: server.bones.fileBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

hierarchyBone
-------------

.. automodule:: server.bones.hierarchyBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

numericBone
-----------

.. automodule:: server.bones.numericBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

passwordBone
------------

.. automodule:: server.bones.passwordBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

randomSliceBone
---------------

.. automodule:: server.bones.randomSliceBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

relationalBone
--------------

.. automodule:: server.bones.relationalBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

selectCountryBone
-----------------

.. automodule:: server.bones.selectCountryBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

selectMultiBone
---------------

.. automodule:: server.bones.selectMultiBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

selectOneBone
-------------

.. automodule:: server.bones.selectOneBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

spatialBone
-----------

.. automodule:: server.bones.spatialBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

stringBone
----------

.. automodule:: server.bones.stringBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

textBone
--------

.. automodule:: server.bones.textBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

treeDirBone
-----------

.. automodule:: server.bones.treeDirBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

treeItemBone
------------

.. automodule:: server.bones.treeItemBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

userBone
--------

.. automodule:: server.bones.userBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

db
==
Low-level database API and data query layer.

.. autofunction:: server.db.Delete

.. autofunction:: server.db.DeleteAsync

.. autoclass:: server.db.Entity
   :show-inheritance:
   :members:
   :special-members:

.. autofunction:: server.db.Get

.. autofunction:: server.db.GetAsync

.. autofunction:: server.db.GetOrInsert

.. autofunction:: server.db.Put

.. autofunction:: server.db.PutAsync

.. autoclass:: server.db.Query
   :show-inheritance:
   :members:
   :special-members:

errors
======
Map Python exceptions to HTTP error codes.

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

.. autoclass:: server.errors.Censored
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

indexes
=======
An efficient index manager.

.. autoclass:: server.indexes.IndexMannager
    :members: __init__, keyFromQuery, cursorForQuery, getPages, refreshIndex

prototypes
==========

Basic
-----
.. autoclass:: server.prototypes.basic.BasicApplication
   :members:

Hierarchy
---------
.. autoclass:: server.prototypes.hierarchy.Hierarchy
   :members:

List
----
.. autoclass:: server.prototypes.list.List
   :members:

Singleton
---------
.. autoclass:: server.prototypes.singleton.Singleton
   :members:

Tree
----
.. autoclass:: server.prototypes.tree.Tree
   :members:


renderers
=========

jinja2
------
.. autoclass:: server.render.jinja2.default.Render
   :members:

json
----
.. autoclass:: server.render.json.default.Render
   :members:


securitykey
===========
One-time tokens.

.. automodule:: server.securitykey
    :members:

skeleton
========
High-level database API.

.. autoclass:: server.skeleton.RelSkel
   :show-inheritance:
   :members:
   :special-members:

.. autoclass:: server.skeleton.Skeleton
   :show-inheritance:
   :members:
   :special-members:

.. autoclass:: server.skeleton.SkelList
   :show-inheritance:
   :members:
   :special-members:

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

