Dataconsitency
============

Unlike traditional LAMP systems, consistency is handled differently on the gae. There are three different causes
for inconsistency if using ViUR on the gae.

Datastore
----------
The datastore offers 2 kinds of queries, providing different consistency constrains. The ''normal`` and fast queries
provide only eventual consistency. This means that changes made to one entity might not be visible instantly.
To ensure that changes made are visible instantly, ancestor queries are needed.
However, they're slower and have other constrains, so they are not used in ViUR.

Consequences/Example:
Imagine you have a list of objects, and provide a list filtered by color of these objects.
Now you change the color of one of these objects from ''red`` to ''blue``.
Due to the inconsistency, its possible for that object to still appear in the list of ''red`` objects
(instead of the ''blue`` ones) for a (usually very short as in a fraction of second) period of time after the change
has been committed to the datastore.

ViURs DB cache
-------------
ViUR tries to optimize speed and resource usage by utilizing the memcache to cache database queries.
Unfortunately, this introduces another type of inconsistency. In rare cases its possible that the entry in
the memcache is updated before the indexes in the datastore can catch up. Given the example introduced before,
its possible for the recently changed entry to still show up in the list of ''red`` ones, but will
list itself as ''blue`` already. In fact, its possible that a db query for red ones return results with entries
of a different color, if that entries color has recently been changed from red to another color.
As the datastore usually applies these changes in less than a second, this is very unlikely to happen,
but its possible. You can configure ViURs db-caching by setting :py:data:`server.config.conf['viur.db.caching']`.
A value of '2' (the default) means cache as much as possible, where its possible for this inconsistency to appear
under rare circumstances. '1' means cache less aggressive, where queries aren't served from Memcache, so that this
inconsistency cannot happen. Setting this value to '0' means absolutely no caching (not recommend)

Relations
-----------

Relations are a core feature offered by ViUR. But as the datastore is non-relational,
offering relations on top a non-relational datastore is a fairly complex task. To maintain quick response times,
ViUR doesn't search and update relations when an entry is updated. Instead, a deferred task is kicked off
which will update these releations in the background. Through depending on the current load of your application, these
tasks usually catches up within a few seconds. Within this time, a search by such a relation might return stale results.
Assume that you have a relation from user to the colored objects from the first example (i.e. a user liked that object).
If that relation is part of the user skeleton, this problem arises.
So if the color of an object is changed, the query ''all users who like a red object`` will still include that object
until the background task finished updating the relations - though the object returned will already have blue as value
for the color property.
Note that this does not happen if the relation is a part of that objects (i.e if the objects reference the user who liked it).
Rule of thumb: Relations part of the kind which got updated are updated instantly.
Relations referencing that kind from another kind are updated later.

ViURs request cache.
-------------------
ViUR offers an request cache, to speed up serving complex pages. This cache is not enabled by default,
as it has to be tightly integrated into the individual application. As flushing that cache happens asynchronous
in the background, its possible to have inconsistency between two sequential requests.
Given our example this means that our recently changed object might appear in both (red and blue) lists
(or in no list at all)  for a short time-frame (again, usually less than a few seconds).
