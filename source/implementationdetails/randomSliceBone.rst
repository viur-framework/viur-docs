
RandomSliceBone
^^^^^^^^^^^^^^^

 To demonstrate the implementation-details, we\'ll use an Example of selecting two randomly chosen elements from a set
 of 15 entities in the datastore with *slices*=2, *sliceSize*=1 and fetch a total of two entities (amount=2).
 In order to simulate the orderby=random from traditional databases, this bone writes a randomly chosen float from
 [0..1) along with the entry saved to the datastore. Each time the skeleton is updated, this randomly chosen value
 also updated.

 .. figure:: images/implementationdetails/randomSliceBone1.png
    :align: center
    :alt: Implemenation-Details for randomSliceBone
    :figclass: align-center

    Example representation of our random float value from the 15 Entries


 Now, if a randomly chosen set of entries is requested by fetching a list with orderby=random,
 this bone shuffles a new random-value for each slice we are going to fetch from the datastore.
 This allows us to select these entities, which random properties are closest to the random value we've chosen.
 So for each slice 2 subqueries are send to the datastore: Entities, which random property are <= our random value
 (sorted descending), and entities which random property is > our random value.

 .. figure:: images/implementationdetails/randomSliceBone2.png
    :align: center
    :alt: Implemenation-Details for randomSliceBone
    :figclass: align-center

    Example from above, with 2 randomly chosen slices and the entites we've fetched from the datastore

 To increase the randomness of entities returned, we've now fetched four times the amount of entities requested.
 In the last step, we select randomly select the two entities we'll return from these eight entities we've fetched.

 .. figure:: images/implementationdetails/randomSliceBone3.png
    :align: center
    :alt: Implemenation-Details for randomSliceBone
    :figclass: align-center

    Entites actually returned in black



.. Note::
    In the default configuration of two slices and a sliceSize of 0.5, each request using orderby=random uses 2 times
    more datastore quota than a normal request. This can be reduced to a single db read overhead by setting slices=1
    and sliceSize=0.5. But this also reduces the actual randomness of the entities returned. On the other hand it's
    possible to increase the randomness by increasing slices and/or sliceSize (which will use up more quota in turn).