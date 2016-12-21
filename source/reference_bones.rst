-----
bones
-----

.. _reference_bones:


baseBone
--------
The base-class for all bones. If you implement your own bones you *must* also subclass from this one.


.. automodule:: server.bones.bone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


booleanBone
-----------
A simple yes/no switch.

.. automodule:: server.bones.booleanBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:



captchaBone
-----------
If used, requires the solving of its captcha before the entry can be stored / formmailer sends it's email.
Not stored inside the database.

.. automodule:: server.bones.captchaBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


credentialBone
--------------
Can be used to store data that a user can supply, but that should never leak in any output (= Write only).
To retrieve the value stored, replace this bone with a stringBone or use db.Get().

.. automodule:: server.bones.credentialBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


colorBone
---------
A color-picker.

.. automodule:: server.bones.colorBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


dateBone
--------
Stores a date, a time or both. Supports localizing (representing it's value in the users native timezone).

.. automodule:: server.bones.dateBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


emailBone
---------
A stringBone that verifies it's value represent a semantically correct email address. Provides no guarantee of
existence or deliverability, just checks if it looks valid.

.. automodule:: server.bones.emailBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


fileBone
--------
Reference to a file. Must be used for files as the default relationalBone won't claim a lock on this file.

.. automodule:: server.bones.fileBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


hierarchyBone
-------------
A relationalBone that picks it's references from a hierarchy application.
.. automodule:: server.bones.hierarchyBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


numericBone
-----------
Stores integers or floats.

.. automodule:: server.bones.numericBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


passwordBone
------------
Safely stores passwords. All passwords are hashed with PBKDF2 and an randomly choosen salt.

.. automodule:: server.bones.passwordBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


randomSliceBone
---------------
Stores no data but provides orderby=random functionality.

.. automodule:: server.bones.randomSliceBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


relationalBone
--------------
References another entry.

.. automodule:: server.bones.relationalBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


selectCountryBone
-----------------
SelectOneBone with values preset to a list of countries. You can choose between ISO2 and ISO3 codes.
It's possible to switch between ISO2 and ISO3 codes; a rebuildSearchIndex will convert the values accordingly.

.. automodule:: server.bones.selectCountryBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


selectMultiBone
---------------
Select multiple elements from a predefined list.

.. automodule:: server.bones.selectMultiBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


selectOneBone
-------------
Select one element from a predefined list.

.. automodule:: server.bones.selectOneBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


spatialBone
-----------
Stores a latitude/longitude pair and provides proximity-search.

.. automodule:: server.bones.spatialBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


stringBone
----------
Stores a short text without formatting. Can hold multiple texts per language.

.. automodule:: server.bones.stringBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


textBone
--------
Stores longer texts that may contain format directives. Can hold multiple texts per language.

.. automodule:: server.bones.textBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


treeDirBone
-----------
RelationalBone that selects a node from a tree application.

.. automodule:: server.bones.treeDirBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


treeItemBone
------------
RelationalBone that selects a leaf from a tree application.

.. automodule:: server.bones.treeItemBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


userBone
--------
RelationalBone that selects a user from the user-module.

.. automodule:: server.bones.userBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:
