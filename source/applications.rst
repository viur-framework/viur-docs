ViUR Applications
------------------

Applications are what makes most of ViUR tick. An application takes a model defined by a skeleton and provides the logic
to interact with its data. There are four applications that ship with ViUR:

- The :class:`server.applications.list.List` application stores entities in a flat list,
- the :class:`server.applications.hierarchy.Hierarchy` application stores entities in a tree,
- the :class:`server.applications.tree.Tree` application store entities in a tree of folders,
- and the :class:`server.applications.singleton.Singleton` application ensures that only one entity per module exists.


Singleton
^^^^^^^^^
.. autoclass:: server.applications.singleton.Singleton
   :show-inheritance:
   :members:
   :special-members:

List
^^^^
.. autoclass:: server.applications.list.List
   :show-inheritance:
   :members:
   :special-members:

Hierarchy
^^^^^^^^^
.. autoclass:: server.applications.hierarchy.Hierarchy
   :show-inheritance:
   :members:
   :special-members:

Tree
^^^^

.. autoclass:: server.applications.tree.Tree
   :show-inheritance:
   :members:
   :special-members:
