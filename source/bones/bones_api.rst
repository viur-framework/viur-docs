Bones
=====

The bones define which datatypes are supported by ViUR. The following table lists all bones shipped with ViUR, but it's
also possible to implement custom bones on a per-project base.

Datatypes
^^^^^^^^^

The following data-types are provided by ViUR (in lexical order).

+------------------------+-----------------------------------------+---------------------------------------------------------+
| Name                   | Usecase                                 | Parameters                                              |
+========================+=========================================+=========================================================+
| baseBone               | Base class for all bones.               | - defaultValue (None): Preinitialize this bone with the |
|                        | Every custom-bone must subclass this.   |       given value.                                      |
|                        | Its not used by the system directly,    | - required (False): Require the user to supply a *valid*|
|                        | but it can be used to store additional  |      value for this bone (i.e. this field. cannot be    |
|                        | data computed by the system.            |      left blank). Whats *valid* for this bone depends   |
|                        |                                         |      on the specific subclass.                          |
|                        |                                         | - params (None): Optional dictionary which will be      |
|                        |                                         |      passed along with the bone to the admin and        |
|                        |                                         |      templates. Put project-specific data here.         |
|                        |                                         | - multiple (False): Allow this bone to have more than   |
|                        |                                         |      one value. Not supported by all subclasses         |
|                        |                                         |      (eg. password).                                    |
|                        |                                         | - indexed (False): Include its value in the searchindex.|
|                        |                                         |      Whats exactly included is determined by the        |
|                        |                                         |        subclass.                                        |
|                        |                                         | - vfunc (None): Function, which checks if a given       |
|                        |                                         |      value is valid. Subclasses can override isInvalid  |
|                        |                                         |      instead. If multiple values are allowed, this is   |
|                        |                                         |      called once for each value.                        |
|                        |                                         | - readOnly (False): If true, prevents the user from     |
|                        |                                         |      modifying the value. Its still possible to set     |
|                        |                                         |      its value from within the application by assigning |
|                        |                                         |      to bone.value.                                     |
|                        |                                         | - visible (True): If false, this bone wont show up in   |
|                        |                                         |      add/edit forms. Nevertheless its possible for the  |
|                        |                                         |      template to expose its value in list/view.         |
|                        |                                         |                                                         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| booleanBone            | Stores a Yes/No choice.                 | *(no additional parameters)*                            |
|                        | Derives from selectOne.                 |                                                         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| captchaBone            | Renders a captcha. It's value is not    | - required: Parameter ignored and always True           |
|                        | stored inside the datastore. This bone  | - publicKey (None): Google's ReCaptcha - PublicKey.     |
|                        | is always required (except on the local |       If None, its tried to read from                   |
|                        | development server where its displayed  |       conf['viur.captcha.publicKey']                    |
|                        | but not validated).                     | - privateKey (None): Google's ReCaptcha - privateKey.   |
|                        | Don't include this into entities        |       If None, its tried to read from                   |
|                        | editable by the admin (or remove the    |       conf['viur.captcha.privateKey']                   |
|                        |  Captcha from the skeleton if its build |                                                         |
|                        | for an admin),as the admin is not       |                                                         |
|                        | capable of displaying captchas.         |                                                         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| colorBone              | Allows selecting a color. Its stored in | - mode (enum): Color-mode to use.                       |
|                        | HTML-Hex notation. Dynamically supports |       Either 'rgb' or 'rgba'.                           |
|                        | 4/8 Bits/Pixel (e.g. \#00FFCC or \#0FC) |                                                         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| dateBone               | Stores a date, a time, or both.         | - creationMagic (False): If True, this bone will store  |
|                        |                                         |       the current date/time if a new entity is saved.   |
|                        |                                         | - updateMagic (False): If True, always store the current|
|                        |                                         |       date/time if the entity is saved.                 |
|                        |                                         | - date (True): Store the Date-Part. If False, only the  |
|                        |                                         |       time will be saved.                               |
|                        |                                         | - time (True): Store the Time-Part. If False, only the  |
|                        |                                         |       date will be saved, the time will always be 00:00.|
|                        |                                         | - localize (False): Automatically convert into the      |
|                        |                                         |       users native timezone.                            |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| emailBone              | Like stringBone, but requires a valid   | *(no additional parameters)*                            |
|                        | email-address to be provided            |                                                         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| fileBone               | Stores a reference to an uploaded file. | - format (str): Hint for the admin how to name          |
|                        | Extends treeItemBone. This reference is |       elements of this type.                            |
|                        | **strong** (the only strong reference   |                                                         |
|                        | you will find inside ViUR).             |                                                         |
|                        | If a user deletes a file from his       |                                                         |
|                        | file-repository it vanishes there, but  |                                                         |
|                        | the file is kept as ong as an entity    |                                                         |
|                        | references that file.                   |                                                         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| hierarchyBone          | Stores a reference to an entity inside  | *(no additional parameters)*                            |
|                        | an hierarchy-application                |                                                         |
|                        | Extends relationalBone.                 |                                                         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| numericBone            | Holds numeric values (ints or floats)   | - precision (0): If 0, values will be rounded to Int,   |
|                        | For floats, the precision can be        |       otherwise specify the precision (amount of        |
|                        | specified in decimal-places.            |       decimal-digits) of floats.                        |
|                        |                                         | - min (-2^30): Minimum accepted value (including).      |
|                        |                                         | - max (2^30): Maximum accepted value (including).       |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| passwordBone           | Stores a Password. Its always empty if  | *(no additional parameters)*                            |
|                        | read from DB. If saved with an empty    |                                                         |
|                        | value, the password is left unchanged,  |                                                         |
|                        | otherwise its stored as a salted        |                                                         |
|                        | sha512-hash.                            |                                                         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| randomSliceBone        | Implements orderby=random known from    | - slices (2): Amount of slices to fetch on each request |
|                        | traditional relational databases.       | - sliceSize (0.5): What size does each slice have       |
|                        | Does not store any user-supplied data   | See Chapter implementationdetails for more information  |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| relationalBone         | Implements relations to other entities. | - type (None): Name of the entities to link to.         |
|                        | (Usually in Lists, see treeItemBone,    |        Must match their kind-name.                      |
|                        | treeDirBone and hierarchyBone) for other| - module (None): Name of the module to link to.         |
|                        | use cases.                              |        Must match their module-name. If left blank, the |
|                        |                                         |        type argument is also used as the module-name.   |
|                        |                                         | - refKeys (None): List of properties of the linked      |
|                        |                                         |        Entity which will be included in the relation.   |
|                        |                                         | - parentKeys (None): List of properties of the Entity   |
|                        |                                         |        which holds this relation which will be included.|
|                        |                                         | - format (''\$(name)``): Hint for the admin how to name |
|                        |                                         |        elements of this type. See                       |
|                        |                                         |        admin/utils.py:formatString for more information.|
|                        |                                         | - using: a RelSkel-Class determining what properties    |
|                        |                                         |       should be stored with each referenced entry       |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| selectCountryBone      | Allows selecting a country. Stores it's | - codes (selectCountryBone.ISO2): Which code to use.    |
|                        | values as ISO2 or ISO3 - Country-codes. |        Either selectCountryBone.ISO2 or                 |
|                        | Converts the value if its mode is       |        selectCountryBone.ISO3.                          |
|                        | switched between these codes afterwards |                                                         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| selectMultiBone        | Allows selecting multiple values from   | - defaultValue ( None ): A list of elements, which will |
|                        | a predefined set.                       |        be selected by default.                          |
|                        |                                         | - values (None): Dictionary of Key=>Names. Names will   |
|                        |                                         |        form the visible List of items to choose from,   |
|                        |                                         |        Keys are the ones which are saved to DB.         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| selectOneBone          | Allows choosing one value from a list.  | - defaultValue( None ): Element (Its key) which will    |
|                        |                                         |        be selected by default.                          |
|                        |                                         | - values (None): Dictionary of Key=>Names. Names will   |
|                        |                                         |        form the visible List of items to choose from,   |
|                        |                                         |        Keys are the ones which are saved to DB.         |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| spartialBone           | Stores a pair of latitude/longitude     | - boundsLat: Outer boundary for latitude values         |
|                        | coordinates and allows performing a     | - boundsLng: Outer boundary for longitude values        |
|                        | proximity search                        | - gridDimensions: Number of sub-regions the map will    |
|                        |                                         |        be divided in                                    |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| stringBone             | Stores a short String (up to 254 Chars).| - caseSensitive( False ): If True, keep an              |
|                        |                                         |        case-Insensitive index for searching.            |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| textBone               | Stores a longer String or RichText.     | - validHtml( *undefined* ): Set of html-tags valid for  |
|                        |                                         |        this bone. If None, all tags are removed. See    |
|                        |                                         |        server/bones.textBone.py for more information.   |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| treeDirBone            | References a Folder inside an           | - type( None ): Name of the application of which        |
|                        | Tree-application.                       |        directories should referenced                    |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| treeItemBone           | References a Entity inside an           | - type( None ): Name of the application of which        |
|                        | Tree-application.                       |        directories should referenced                    |
+------------------------+-----------------------------------------+---------------------------------------------------------+
| userBone               | References an User. Works with          | - creationMagic (False): If True, save the current user |
|                        | GoogleUser aswell as CustomUser         |        on creating an entity. Saves None if the entity  |
|                        | (adapts automatically)                  |        is created by a guest.                           |
|                        |                                         | - updateMagic (False): If True, save the current User   |
|                        |                                         |        every time the entity is modified. Saves None    |
|                        |                                         |        if the entity is created by a guest.             |
+------------------------+-----------------------------------------+---------------------------------------------------------+


Base bone
^^^^^^^^^

.. automodule:: server.bones.bone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


numericBone
^^^^^^^^^^^

.. automodule:: server.bones.numericBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

booleanBone
^^^^^^^^^^^

.. automodule:: server.bones.booleanBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


String-based bones
^^^^^^^^^^^^^^^^^^

stringBone
~~~~~~~~~~
.. automodule:: server.bones.stringBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

textBone
~~~~~~~~
.. automodule:: server.bones.textBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

emailBone
~~~~~~~~~
.. automodule:: server.bones.emailBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

passwordBone
~~~~~~~~~~~~
.. automodule:: server.bones.passwordBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


Selectional bones
^^^^^^^^^^^^^^^^^

selectOneBone
~~~~~~~~~~~~~

Allow for selection one entry from a pre-defined list of values.

.. automodule:: server.bones.selectOneBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

selectMultiBone
~~~~~~~~~~~~~~~

Allow for selection one several entries from a pre-defined list of values.

.. automodule:: server.bones.selectMultiBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

selectCountryBone
~~~~~~~~~~~~~~~~~
Selection for a country from a standardized country list.

.. automodule:: server.bones.selectCountryBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


Hierarchical bones
^^^^^^^^^^^^^^^^^^

.. automodule:: server.bones.hierarchyBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

.. automodule:: server.bones.treeItemBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

.. automodule:: server.bones.treeDirBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:

.. automodule:: server.bones.fileBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


Relational bones
^^^^^^^^^^^^^^^^

One of ViURs core features is providing relations ontop of the non-relational datastore.
This Bone wraps this functionality into a standard property for your datamodel.
There are just 2 Properties to set to use this bone. *Descrition* (as with any bone), and *type*.
The *type* parameter determines what kinds are being referenced. It *must* match a kindName defined by a skeleton.
If your module for that kind has a different name, you must also set the *module* parameter. I.E. if you referencing
a kind *news*, but your news-module is available at /my_news_module/ instead of /news/, you must set it. Otherwise
you won't be able to select any values in your admin tool. *refKeys* and *parentKeys* determine what properties are
available in a relational query.

Example:
Your news-skeleton has a property *ispublic* and references a skeleton product, which has a property *color*.
If you need to filter your news by associated products in a specific color, you need to include *color* in the
*refKeys* of that relationalBone.
If you need to update your filter to also only return public news, you have to include *public* in the *parentKeys* list.

Sometimes it's needed to store additional data along with such a relation (i.E. on a relation student->exam you might
want to store the note received in that exam). In such a case create a new Skeleton (use RelSkel as base-class - *not*
Skeleton!) and pass this class in the *using*-parameter. You can also use filtering on such a relSkel (i.E. find students
which archived at least x points for a given exam).


 .. Tip::
     If you ever encounter an query, that includes a relational filter and doesn't return any results despite it should,
     check your server-log. Usually you miss a property in parent/ref-Keys and ViUR will warn you about that. Otherwise
     try to rebuild the search-index of the kind that relationalBone is in.

 .. Note::
     *refKeys* must be always set. However, *parentKeys* are only used if you also specify multiple=True. Otherwise
     that property is ignored.


.. automodule:: server.bones.relationalBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:



Miscellaneous bones
^^^^^^^^^^^^^^^^^^^

.. automodule:: server.bones.captchaBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

.. automodule:: server.bones.colorBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

.. automodule:: server.bones.dateBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

.. automodule:: server.bones.userBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

.. automodule:: server.bones.randomSliceBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

.. automodule:: server.bones.spatialBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:

