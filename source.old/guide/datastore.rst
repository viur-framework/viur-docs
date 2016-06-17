How data is managed
===================

ViUR comes with its own, unique data model access API.

The concept behind these models is similar to the one used within the Google AppEngine™ in general. However, ViURs implementation of the data model layer is much more powerful:

- It also stores meta data (descriptions for each field, help and error texts, visible and editable to/by the user etc.)
- More fine-grained. E.g. Numeric Bones allows specification of min and max values and its precision
- Complex types: relations, captchas, text documents

And best of all: It is completely extensible! If you need a complex type that is not part of the system, its easy to add it on your own. The application developer has two ways accessing the database: By low-level and by high-level.

The low-level approach is provided by the module ``server.db``. This allows querying and storing data without the need to define models first. Its a thin proxy to the object-storage provided by the datastore. If low-level access is needed, the application *must* use this module. Its not valid to use the ext.db or ext.ndb modules supplied by Google AppEngine™ directly. To enhance the speed and lower the costs of database queries, ViUR uses the memcache to efficiently serve queries where possible. Altering data directly through one of these APIs will lead to cache-inconsistency and might result in stale data being delivered to the clients.

The high-level API allows querying along a defined data model. This allows easy access to complex queries (i.e. filtering by an relational property), which are not directly possible on the datastore.

Data consistency
================

Unlike traditional `LAMP systems`_, consistency is handled differently on the `GAE`_. There are three different causes
for inconsistency when using ViUR on the GAE_.

.. _LAMP systems: https://en.wikipedia.org/wiki/LAMP_(software_bundle)
.. _GAE: http://appengine.google.com

Datastore
---------
The datastore offers 2 kinds of queries, providing different consistency constrains. The ''normal`` and fast queries
provide only eventual consistency. This means that changes made to one entity might not be visible instantly.
To ensure that changes made are visible instantly, ancestor queries are needed.
However, they're slower and have other constrains, so they are not used in ViUR.

Consequences/Example:
Imagine you have a list of objects, and provide a list filtered by the object's color.
Now you change the color of one of these objects from ''red`` to ''blue``.
Due to the inconsistency, it's possible for that object to still appear in the list of ''red`` objects
(instead of the ''blue`` ones) for a (usually very short as in a fraction of second) period of time after the change
has been committed to the datastore.

Data cache
----------
ViUR tries to optimize speed and resource usage by utilizing the Memcache to cache database queries.
Unfortunately, this introduces another type of inconsistency. In rare cases it's possible that the entry in
the Memcache is updated before the indexes in the datastore can catch up. Given the example introduced before,
it's possible for the recently changed entry to still show up in the list of ''red`` ones, but will
list itself as ''blue`` already. In fact, it's possible that a db query for red ones returns results with entries
of a different color, if that entries' color has recently been changed from red to another color.
As the datastore usually applies these changes in less than a second, this is very unlikely to happen,
but it's possible. You can configure ViURs db-caching by setting :py:data:`server.config.conf['viur.db.caching']`.
A value of '2' (the default) means cache as much as possible, where it's possible for this inconsistency to appear
under rare circumstances. '1' means less aggressive cache, where queries aren't served from Memcache, so that this
inconsistency cannot happen. Setting this value to '0' means no caching at all (not recommend).

Relations
---------
Relations are a core feature offered by ViUR. But as the datastore is non-relational,
offering relations on top of a non-relational datastore is a fairly complex task. To maintain quick response times,
ViUR doesn't search and update relations when an entry is updated. Instead, a deferred task is kicked off
which will update these releations in the background. Through depending on the current load of your application, these
tasks usually catch up within a few seconds. Within this time, a search by such a relation might return stale results.
Assume that you have a relation from user to the colored objects from the first example (e.g. a user liked that object).
If that relation is part of the user skeleton, this problem arises.
So if the color of an object is changed, the query ''all users who like a red object`` will still include that object
until the background task finished updating the relations - though the object returned will already have blue as value
for the color property.
Note that this does not happen if the relation is part of that objects (i.e if the objects reference the user who liked it).
Rule of thumb: Relations which are part of the kind which got updated are updated instantly.
Relations referencing that kind from another kind are updated later.

Request cache
-------------
ViUR offers a request cache, to speed up serving complex pages. This cache is not enabled by default,
as it has to be tightly integrated into the individual application. As flushing that cache happens asynchronous
in the background, it's possible to have inconsistency between two sequential requests.
Given our example this means that our recently changed object might appear in both (red and blue) lists
(or in no list at all)  for a short time-frame (again, usually less than a few seconds).


Indexes
=======

The datastore doesn't provide a good and efficient method for pagination.
In traditional relational (SQL) databases, it's common to implement pagination using skip - ignoring
results before the given page and fetch only the results of the requested page.
This is possible on the datastore too, but is highly inefficient. Each skipped result costs time and one small-op.
Therefore, ViUR doesn't provide support for this pagination method.
The recommended method for pagination on the GAE is using cursors. While this approach is efficient,
it has one mayor drawback: It doesn't allow for random access. The user is forced to click ``next page'' five
times to reach the fifth page, he cannot jump to that page directly.
ViUR provides a functionality which solves that problem under certain circumstances.
It can store an index for each query in the datastore, containing a list of start-cursors (one for each page).
This way, it's possible to provide efficient random access to lists.
As said, this works only under certain circumstances:

 - You *must* know all possible querys in advance. This implies that the total number of queries is limited.
  Note that queries with the same structure, but with different parameters are different queries in this case
  (price\$gt=5 and price\$gt=10 are *different* queries!).
 - On adding/editing/deleting an entry, you *must* be able to name all queries that might contain this entry.
 - The average write-rate per index *should* not exceed 1/min. It wont fail if it does, but its efficiency will decrease!


If these requirements are meet, using an index is easy.
Create a new instance of the indexmannager, specifying the pageSize (number of results per page) and maxPage (upper bound of pages).
The pageSize must match the limit of the queries run later.
Then just create your datastore query as usual (by calling db.Query or skel.all()) and call
:py:func:`server.indexes.IndexMannager.cursorForQuery` with this query and the page the user requested.
It will return an cursor that points to the first element of the requested page. If the page is out-of-range for
the given query (or it exceeds maxPages), None is returned (which can still be safely passed to query.setCursor as it means ``first page'').
Alternatively it's possible to call :py:func:`server.indexes.IndexMannager.getPages` with that query,
returning a list of startcursors (one cursor per page).
The length of that list equals the total amout of pages available for this query.
If an entry is added/edited/deleted, create the queries that might contain this entry (again using db.Query() or skel.all()) and pass these
queries to :py:func:`server.indexes.IndexMannager.refreshIndex`.




Using the low-level API
=======================

The low-level API #todo.

Creating an Entity
------------------

To store a new entity in the datastore, first create an instance of db.Entity.
An kind must be specified. This is the collection (think of an SQL-Tablename) for that entity.
::

	dbObj = db.Entity("person")


Then its possible to add data to this entity.

::

	dbObj["name"] = "Alice"
	dbObj["age"] = 42

Finally save that entry to the datastore.

::

	db.Put(dbObj)


After saving the entity, its valid to call dbObj.key() to retrieve the key under which it has been saved.

Querying Data
^^^^^^^^^^^^^
To start a query, create a instance of db.Query.

::

	query = db.Query("person")

After creating a query for a given kind, its possible to filter / sort the results.

.. Warning::
	The low-level API does **not** prevent you from running invalid queries.
	Filtering and ordering works only for indexed properties. If you filter or sort by an property that doesn't exist
	or is not indexed the query will **silently** fail and return zero results.

The following will filter the results by age and sort these results from Z to a.

::

	query.filter("age =", 20).order(("name",query.DESCENDING))


To fetch these results, use query.run(). If you only need one result (the first one if there are more), use query.get().
Query.run() will always return an iterator yielding db.Entity, query.get() will return one db.Entity if there is at least one result,
None otherwise.

If an Entity is not needed anymore, you can delete it using db.Delete()
::

	db.Delete(entity.key())


ViURs database API provides more functions than these basic ones; see the API reference for more details.

Using the high level API
========================

The high-level API operates on the so called bones/skeleton system.

This allows complex queries (ie. relations) and provides a safety net regarding invalid queries.

Defining the model
^^^^^^^^^^^^^^^^^^

As the high-level API operates on a data model, it's required to define such a model first.

::

	class Person(Skeleton):
		kindName = "person"

		name = stringBone(descr=u"Name", required=True, indexed=True)
		age = numericBone(descr=u"Age", required=True, indexed=True,
							min=0, max=150, precision=0)


This will define a model called Person with two properties (name and age). Both properties are required
(ie. the user is forced to supply valid data for these properties before he's able to save it),
and all entities are saved as kind *person*.
For stringBones, required=True means a non-empty string; for the numericBone a value between min and max (inclusive).
Detailed information about all included bones, and their possible parameters can be found in :ref:`server-bones-datatypes`.

Storing data
^^^^^^^^^^^^

You create an entity by calling its corresponding skeleton-class.
Unlike the lowlevel API, its only possible to store data according to the defined datamodel.
Its possible (but not recommend, as its possible to assign invalid data) to directly set the data of individual bones.

::

	skel = Person()
	skel["name"].value = "Alice"
	skel["age"].value = 42


The recommended method is calling :py:func:`server.skeleton.Skeleton.fromClient` on the skeleton.
This tries to parse the data according its model, and returns True on success (meaning the given data was successful parsed for this model), False otherwise.
Even if this function returns False, all bones are guaranteed to be in a valid state; the ones which have been read correctly contain their data,
the other ones are set back to a safe default (None in most cases).
So its possible to call toDB() afterwards even if reading data fromClient failed (through this might violate your
assumptions about required fields!).

.. Note::

	This function never alters the dictionary passed to this function. Its safe to supply user-supplied data
	to this function.

::

	skel = Person()
	success = skel.fromClient( { "name": "Alice", "age": 42 } )


After providing data according to the model, safe its data using skel.toDB()

::

	key = skel.toDB()

This function returns the key (as string) the entity has been saved as.
If you want to update an existing entity, you have to load the old one first using skel.fromDB().


.. Note::
	If you used the low-level API to store additional values in that entity that have no representation in your
	skeleton-model, these values are left unchanged by skel.toDB(). toDB() only updates the fields known to the
	skeleton; it will never touch fields unknown to it.

Querying
^^^^^^^^

First, create an query object calling :py:func:`server.skeleton.Skeleton.all` on a skeleton.

::

	query = Person.all()

This returns a db.Query instance, bound to this model.
All functions mentioned in the lowlevel API are valid on this object, too. However, there are additional Methods available.
:py:func:`server.db.mergeExternalFilter` allows querying along the datamodel.
This function is aware of our extended syntax, allowing querying relations. This syntax is equal to the syntax used in
HTTP-Requests.

::

	query.mergeExternalFilter({"age": 20, "orderby": "name", "orderdir": "1"})

.. Note::
	Its safe to use client-supplied data in this function, as invalid parameters are ignored.
	This function also warns you if an unsatisfiable query is supplied.


After all filters and orders are applied, the results can be fetched using :py:func:`server.db.Query.run` or :py:func:`server.db.Query.get`.
If you want a skeleton (or a skellist) instead of the raw db.Entities, call query.getSkel() or query.fetch().

::

	skel = query.getSkel()

If not needed any more, delete an entity by calling :py:func:`server.skeleton.Skeleton.delete` on your skeleton.

::

	skel.delete()

.. Warning::
	If an Entity has been created/modified using the highlevel API, always delete it using the highlevel-API.
	Otherwise there will be garbage left in the datastore.
