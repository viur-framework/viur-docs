ViUR Prototypes
---------------

Prototypes are what makes most of ViUR tick. An prototype takes a model defined by a skeleton and provides the logic
to interact with its data. There are four prototypes that ship with ViUR:

- The :class:`server.prototypes.list.List` application stores entities in a flat list,
- the :class:`server.prototypes.hierarchy.Hierarchy` application stores entities in a tree,
- the :class:`server.prototypes.tree.Tree` application store entities in a tree of folders,
- and the :class:`server.prototypes.singleton.Singleton` application ensures that only one entity per module exists.


Singleton
^^^^^^^^^
.. autoclass:: server.prototypes.singleton.Singleton
   :show-inheritance:
   :members:
   :special-members:

List
^^^^
.. autoclass:: server.prototypes.list.List
   :show-inheritance:
   :members:
   :special-members:

Hierarchy
^^^^^^^^^
.. autoclass:: server.prototypes.hierarchy.Hierarchy
   :show-inheritance:
   :members:
   :special-members:

Tree
^^^^

.. autoclass:: server.prototypes.tree.Tree
   :show-inheritance:
   :members:
   :special-members:
