##############
Training guide
##############

This part of the documentation guides deeper into fundamental parts of the ViUR system. It serves as a training guide to get familar with all ViUR-related features that are used frequently.

===============
Data management
===============

As described previously, data models in ViUR are represented by subclasses of :class:`~server.skeleton.Skeleton`, which are extended with bones. The bones provide a higher abstraction layer of the data values stored in the database. This part of the training guide will introduce you to the Skeletons API and how to use these data models without the modules logic. This is sometimes necessary and later integrates into the ways on how data entities are handled inside your modules.

ViUR uses the Google Datastore as the underlying database. Google Datastore is a document-oriented, scalable, transactional "NoSQL"-database. Entities are stored schema-less, and are only identified by a unique key. This key is also the unique property used throughout the entire ViUR system to identify and reference individual data objects uniquely.

Let's start again with the skeleton storing personal data, introduced in the previous chapter.

.. code-block:: python

    class personSkel(Skeleton):
        name = stringBone(descr="Name")
        age = numericBone(descr="Age")

In ViUR, skeletons should be named after modules or usages they are used for. To easily connect a skeleton class with a module, the naming-convention with the trailing "Skel" - like above - should be used, so this is done automatically by the system. Under some circumstances, the name may differ, and can be referenced from the module otherwise, but this is not covered here right now.

The two bone assignments define the schema of the skeleton, which is extended to the pre-defined bones *key*, *creationdate* and *changedate*. Under some circumstances, *creationdate* and *changedate* can be removed again from the skeleton by overriding ``None`` to them.

.. figure:: images/training-dm-skeleton.png
   :scale: 60%
   :alt: The Entity to Skeleton abstraction in ViUR.

   How values and keys of an entity connect to the skeleton and bones in ViUR.

Since bones are used to define the data model structure, they can also be marked to be filled for data integrity reasons. To do so, the ``required`` attribute must be set.

.. code-block:: python

    name = stringBone(descr="Name", required=True)

After that, users will only be able to add/save entities with this skeleton if name is set. The developer however can
still decide to ignore these constrains.

------------------------------
Adding, modifying and deleting
------------------------------

To add a data entity with the above skeleton, it first needs to be instantiated. Values are then set by using the skeleton like a :class:`~dict`, except that unknown keys (=bones) are raising an exception.

.. code-block:: python

    # get instance
    skel = personSkel()

    # set values
    skel["name"] = "Vicky"
    skel["age"] = 32

    # write it!
    skel.toDB()

    # getting the key
    myKey = skel["key"]
    logging.info("Entity stored as %s" % str(myKey))

For storing an entity to the database, the function :meth:`~server.skeleton.Skeleton.toDB` is used. If a skeleton was not previously filled with data from the datastore using :meth:`~server.skeleton.Skeleton.fromDB`, a new key is automatically assigned.

To read an entity directly from the datastore, its key must be known. To do so, the function :meth:`~server.skeleton.Skeleton.fromDB` is used. The following code snippet loads the previously stored entity again, changes the age, and stores it back to the datastore.

.. code-block:: python

    # get instance
    skel = personSkel()

    # read entity into skeleton
    if not skel.fromDB(myKey):
        #some error handling.
        logging.error("The entity does not exist")
        return

    # change something
    logging.info("Current age of %s is %d" % (skel["name"], skel["age"])
    skel["age"] = 33

    # write entity back again
    skel.toDB()

That's it. To delete an entity, just :meth:`~server.skeleton.Skeleton.delete` needs to be called on a previously fetched skeleton, and it'll be removed permanently.

.. code-block:: python

    # delete it
    skel.delete()

The functions used so far:

- :meth:`server.skeleton.Skeleton.toDB` saves an entity to the datastore,
- :meth:`server.skeleton.Skeleton.fromDB` reads an entity from the datastore,
- :meth:`server.skeleton.Skeleton.delete` deletes the entity from the datastore.

-------------------
Queries and cursors
-------------------

ViUR provides powerful tools to easily query entities, even over relations.

To make bones usable within a query, the ``indexed`` attribute of the particular bones must be set in the skeleton. This is also required for attributes involved into an ordering.

.. code-block:: python
   :caption: skeletons/company.py

   class personSkel(Skeleton):
      name = stringBone(descr="Name", required=True, indexed=True)
      age = numericBone(descr="Age", indexed=True)

A query can be created from a skeleton using the :meth:`~server.skeleton.Skeleton.all` function. This default query is a selection of all entities of the given skeleton. To granulate the result of this default query, the function :meth:`~server.db.Query.filter` is used. It provides ways to also filter not on equality, but also on greater or lower conditions.

.. code-block:: python

    # create the query
    query = personSkel().all()
    query.filter("age >", 30)

    # how many result are expected?
    logging.info("%d entities in query" % query.count())

    # fetch the skeletons
    for skel in query.fetch():
        logging.info("%s is %d years old" % (skel["name"], skel["age"]))

~~~~~~~
Indexes
~~~~~~~

Using complex queries causes the datastore to work on index tables to find the correct entities. These index tables must be explicitly described and managed in the ``index.yaml`` file of the project. In a local development system, index definitions are automatically generated into this file when a query needs an index, and no definition for this index exists.

Doing so in the following snippet:

.. code-block:: python

    query = personSkel().all().order("name", "age")

    for skel in query.fetch():
        logging.info("%s is %d years old" % (skel["name"].value, skel["age"].value))

When executed, this yields in the following index definition in the ``index.yaml`` file. The function :meth:`~server.db.Query.order`, that was used above, allows to add an ordering on one ore multiple attributes to a query.

::

   - kind: person
     properties:
     - name: name
     - name: age

Indexes are lookup-tables, managed by the datastore. They are updated just in time when involved entities are changed, but need some time to be initially built. Therefore, an error is raised, when running a query requiring an index which does not exist or is currently established within an application running directly on the App Engine. So checking out the logs or the datastore index overview in the `Google Cloud Console <https://console.cloud.google.com>`_ gives help when index definitions are missing, or errors temporarily come up right after a web application with different query attributes was deployed.

~~~~~~~
Cursors
~~~~~~~

In web applications, queries underlie some restrictions, which are technically not a problem, but may cause timeout problems on HTTP requests. Therefore, the use of cursors is required, and queries sometimes need to be split in deferred tasks or requested asynchronously to decrease request latency. ViUR limits its maximum request limit for dataset fetches to a maximum of 99 entities. 30 entities is the default, if no other limitation was explicitly given. This means, that not more than 99 entities can be fetched per query. The query can be continued later on using a cursor.

To obtain a cursor, the :meth:`~server.db.Query.getCursor` function returns a proper cursor object. This can be set to the same query (means: having the same filtering and ordering) using the function :meth:`~server.db.Query.cursor`.

The following piece of code is an example for a function that works exactly on this mechanism. It is a deferred version of the querying example from above. This function runs, once initiated, on the server-side and fetches all entities of the persons available in the database.

.. code-block:: python

    @callDeferred
    def fetchAllPersons(cursor = None):
        # create the query
        query = personSkel().all().filter("age >", 30).cursor(cursor)

        # fetch the skeletons
        for skel in query.fetch():
            logging.info("%s is %d years old" % (skel["name"], skel["age"]))

        # if entities where fetched, take the next chunk
        if query.getCursor().urlsafe()!=cursor:
            fetchAllPersons(query.getCursor().urlsafe()))

Important functions used for querying:

- :meth:`server.skeleton.Skeleton.all` returns a query to all entities of the skeleton's data kind,
- :meth:`server.db.Query.filter` sets a filtering to one attribute to a query,
- :meth:`server.db.Query.order` sets an ordering to one or multiple attributes within a query,
- :meth:`server.db.Query.cursor` sets a cursor on a query,
- :meth:`server.db.Query.mergeExternalFilter` can be used as a safe alternative to apply multiple filters supplied by an untrusted source,
- :meth:`server.db.Query.getCursor` returns the next cursor of a query.

---------
Relations
---------

In ViUR, the :class:`~server.bones.relationalBone.relationalBone` is the usual way to create relations between data entities.

The :class:`~server.bones.relationalBone.relationalBone` is used to construct 1:1 or 1:N relations between entities directly, with an automatic module integration included into the admin tools. It is also possible to store additional data with each relation.

.. figure:: images/training-dm-relations.png
   :scale: 80%
   :alt: An image showing the relations between persons and companies.

   Assigning companies to persons.

Let's connect the persons to companies. The figure above shows a classic 1:N relationship. Every person can be assigned to one company, one company can be referenced by several persons. For storing companies, a new skeleton needs to be introduced.

.. code-block:: python
   :caption: skeletons/company.py

    class companySkel(Skeleton):
        name = stringBone(descr="Company name", required=True, indexed=True)

To administrate companies also with ViUR, a new module-stub needs to be created.

Then, the entity kind is connected to the person using a :class:`~server.bones.relationalBone.relationalBone`.

.. code-block:: python
   :caption: skeletons/person.py

    class personSkel(Skeleton):
        name = stringBone(descr="Name", required=True, indexed=True)
        age = numericBone(descr="Age", indexed=True)
        company = relationalBone(type="company", descr="Employed at", required=True)

This configures the data model to require for a company assignment, so that entities without a company relation are invalid. Editing a person entry now again in the Vi offers a method for selecting a company and assigning it to the person.

[screenshot missing]

As the datastore is non-relational, offering relations is a fairly complex task. To maintain quick response times, ViUR doesn't immediatelly search and update relations when an entry is updated. Instead, a deferred executed task is kicked off when data is changing, which updates all of these relations in the background. Through depending on the current load of the web application, these tasks usually catches up within a few seconds. Within this time, a search by such a relation might return stale results.

=================
Module management
=================

In ViUR, any custom modules are established on top of one of the four module prototypes. The modules are the linchpin of every ViUR application. They provide interfaces to securely add, edit, delete or view entries, to perform custom operations and tasks, to prepare output data or validate input data.

The most commonly used module prototype is :class:`~server.prototypes.list.List`, which provides a flat list of database entries with the same entity kind. To become more familiar with the management of modules in general, the next sections are mostly using the :class:`~server.prototypes.list.List` module prototype as its base. Moreover, the other module prototypes and their specialities are discussed later on, when the basics of the :class:`~server.prototypes.list.List` module are understood so far.

----------------
Creating modules
----------------

Creating a module is simple. It just requires to put a class named like the new module as a single Python file in the ``modules/`` directory of the current application.

.. code-block:: python
   :caption: modules/person.py
   :linenos:

   #-*- coding: utf-8 -*-
   from server.prototypes import List

   class Person(List):
      pass

This is already everything needed so far. The **import**-statement in line 2 imports the :class:`~server.prototypes.list.List` prototype. Certainly, it is also possible to import from another prototype or to import an already pre-build module from the server or from the current application itself. Any way of inheritance mechanism can be used here.

The **class**-statement in line 4 finally introduces the class of the new module, which inherits from the :class:`~server.prototypes.list.List` prototype. So this class initially provides all the features and functions provided by the :class:`~server.prototypes.list.List` class.

The naming of the class has also two important purposes:

1. The module tries to resolve for a skeleton named after the module in lower-case order with a trailing "Skel" that is used as data model. So in this example, "personSkel" will be the name of the skeleton ViUR will try to resolve. This detection can be completely bypassed, by overriding :meth:`~server.prototypes.list.List.baseSkel` and returning an appropriate skeleton instance.

2. If the default project setup has been done, the module is automatically imported in lower-case order (person) into the application, so it can be accessed by ``/person`` or ``/renderer/person`` as first part of the URL. This naming convention can be entirely changed by importing the module manually in the file ``modules/__init__.py``.

----------------------------
Data modification interfaces
----------------------------

All module prototypes provide several externally exposed functions for data modifications, serving as an interface to the web-application.

These functions are:

- **add** for adding a new entry (:meth:`List.add() <server.prototypes.list.List.add>`, :meth:`Hierarchy.add() <server.prototypes.hierarchy.Hierarchy.add>`, :meth:`Tree.add() <server.prototypes.tree.Tree.add>`),
- **delete** for deleting an existing entry (:meth:`List.delete() <server.prototypes.list.List.delete>`, :meth:`Hierarchy.delete() <server.prototypes.hierarchy.Hierarchy.delete>`, :meth:`Tree.delete() <server.prototypes.tree.Tree.delete>`),
- **edit** for updating an existing entry (:meth:`List.edit() <server.prototypes.list.List.edit>`, :meth:`Singleton.edit() <server.prototypes.singleton.Singleton.edit>`, :meth:`Hierarchy.edit() <server.prototypes.hierarchy.Hierarchy.edit>`, :meth:`Tree.edit() <server.prototypes.tree.Tree.edit>`),
- **view** for just viewing an existing entry (:meth:`List.view() <server.prototypes.list.List.view>`, :meth:`Singleton.view() <server.prototypes.singleton.Singleton.view>`, :meth:`Hierarchy.view() <server.prototypes.hierarchy.Hierarchy.view>`, :meth:`Tree.view() <server.prototypes.tree.Tree.view>`).

These functions are entirely working on the skeleton API as described above. Every module also provides more, module-specific functions for data management, but this is not covered here.

-------------------------
Post-processing functions
-------------------------

Usually, the standard data modification functions from above should not be overridden in sub-classed modules, because they implement a secure and enclosed workflow. Nevertheless, it is possible to engage into these functions by overriding the so called event-driven functions, all taking the skeleton object of the specific operation, for further tasks or logics required.

- **onItemAdded** after an item is newly added (:meth:`List.onItemAdded() <server.prototypes.list.List.onItemAdded>`, :meth:`Hierarchy.onItemAdded() <server.prototypes.hierarchy.Hierarchy.onItemAdded>`, :meth:`Tree.onItemAdded() <server.prototypes.tree.Tree.onItemAdded>`),
- **onItemDeleted** after an existing item is deleted (:meth:`List.onItemDeleted() <server.prototypes.list.List.onItemDeleted>`, :meth:`Hierarchy.onItemDeleted() <server.prototypes.hierarchy.Hierarchy.onItemDeleted>`, :meth:`Tree.onItemDeleted() <server.prototypes.tree.Tree.onItemDeleted>`),
- **onItemEdited** after an existing entry is updated (:meth:`List.onItemEdited() <server.prototypes.list.List.onItemEdited>`, :meth:`Singleton.onItemEdited() <server.prototypes.singleton.Singleton.onItemEdited>`, :meth:`Hierarchy.edit() <server.prototypes.hierarchy.Hierarchy.onItemEdited>`, :meth:`Tree.edit() <server.prototypes.tree.Tree.onItemEdited>`),
- **onItemViewed** right before an existing entry is viewed (:meth:`List.onItemViewed() <server.prototypes.list.List.onItemViewed>`, :meth:`Singleton.onItemViewed() <server.prototypes.singleton.Singleton.onItemViewed>`, :meth:`Hierarchy.onItemViewed() <server.prototypes.hierarchy.Hierarchy.onItemViewed>`, :meth:`Tree.onItemViewed() <server.prototypes.tree.Tree.onItemViewed>`).

-------------
Access rights
-------------

coming soon.


