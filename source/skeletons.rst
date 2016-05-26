Skeletons
^^^^^^^^^

Skeletons are classes which describe data structures that are handled by the ViUR system.
Every Skeleton contains several Bones, which define the properties stored on that model.
By default, each skeleton has three bones predefined: key, creationdate and enddate.
Key is a baseBone storing the datastore key that entry is stored under (or None if that skeleton hasn't be saved yet) while
creation- and end-Date contain datetime-objects of when this entry had been created and when it was last updated.
For skeletons that should be saved to the datastore, the kindName property must be set (a kind roughly correlates to an
sql *table* or an mongodb *collection*). You can enable the fulltext search index provided by the appengine by assigning
a name (usually the same as the kindName) to the *searchIndex* property. Finally, you can declare subskeletons here using
the *subSkel* property. You can use subskeletons to limit add/edit/views to certain fields. To declare a subskel assign
a dictionary to the subSkel property, where the key is the name of the subskel and the value is a list of fields that should
be in that subskel (you can append an asterisk to a field name to make it a prefix match).

If you intend to create a model that's never saved to the datastore (e.g. for formmailing or attaching data to an relation),
use the RelSkel class instead.


.. autoclass:: server.skeleton.Skeleton
   :show-inheritance:
   :members:
   :special-members:

RelSkel
#######

.. autoclass:: server.skeleton.RelSkel
   :show-inheritance:
   :members:
   :special-members:


SkelList
########

.. autoclass:: server.skeleton.SkelList
   :show-inheritance:
   :members:
   :special-members:


