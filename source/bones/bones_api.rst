server.bones
------------

Datatypes
---------

The following datatypes are provided by ViUR (in lexical order).

 \tablefirsthead{ Name & Usecase & Parameters \\ \hline}
 \tablehead{ Name & Usecase & Parameters \\}
 \tablecaption{Datatypes provided by ViUR}
 \begin{supertabular}{p{3cm}|p{5cm}|p{6cm}}

 baseBone & 	Baseclass for all bones.
		Every custom-bone must subclass this.
		Its not used by the system directly,
		but it can be used to store additional
		data computed by the system. &
						      \begin{itemize}
						       \item defaultValue (None): Preinitialize this bone with the given value if not set by the user
						       \item required (False): Enforce a <em>valid</em> value for this bone. Whats <em>valid</em> depends on the specific subclass
						       \item params (None): Optional dictionary which will be passed along with the bone to the admin and templates.
							      Put project-specifiy data here
						       \item multiple (False): Allow this bone to have more than one value. Not supported by all subclasses (eg. password)
						       \item indexed (False): Include its value in the searchindex. Whats exactly included is determined by the subclass.
						       \item vfunc (None): Function, which checks if a given value is valid. Subclasses can override the \emph{canUse} function insted.
							      If multiple values are allowed, this is called once for each value.
						       \item readOnly (False): If true, prevents the user from changing its value.
							      Its still possible to set its value from within the application by assigning to bone.value
						       \item visible (True): If false, this bone wont show up in add/edit formulars. Nevertheless its possible for
							      the template to expose its value in list/view
						      \end{itemize} \\

\hline

booleanBone &	Stores a Yes/No choice.
		Derives from selectOne. & \\

\hline

captchaBone &	Renders a captcha\footnote{http://wikipedia.org/wiki/CAPTCHA}.
		Its value is not stored inside the datastore.
		This bone is allways required (except on the local development
		server where its displayed but not validated).
		Dont include this into entities editable by the admin
		(or remove the Captcha from the skeleton if its build for an admin),
		as the admin is not capable of displaying captchas. &
							 \begin{itemize}
							  \item required: Parameter ignored and allways True
							  \item publicKey (None): Google's ReCaptcha - PublicKey. If None, its tried to read from conf[``viur.captcha.publicKey'']
							  \item privateKey (None): Google's ReCaptcha - privateKey. If None, its tried to read from conf[''viur.captcha.privateKey``]
							 \end{itemize}\\

\hline

colorBone & 	Allows selecting a color. Its stored in HTML-Hex notation.
		Dynamically supports 4/8 Bits/Pixel (e.g. \#00FFCC or \#0FC). &
							  \begin{itemize}
							   \item mode (''rgb``): Color-mode to use. Either ''rgb`` or ''rgba``.
							  \end{itemize}\\

\hline

dateBone &	Stores a date, a time, or both. &
							  \begin{itemize}
							   \item creationMagic (False): If True, this bone will save the current date/time if a new entity is saved.
							   \item updateMagic (False): If True, allways save the current date/time if the entity is saved.
							   \item date (True): Store the Date-Part. If False, only the time will be saved
							   \item time (True): Store the Time-Part. If False, only the date will be saved, the time will allways be 00:00
							   \item localize (False): Automatically convert into the users native timezone.
							  \end{itemize}\\
\hline

documentBone &	Stores an Textdocument (i.e. a large, structured Text). &
							  \begin{itemize}
							   \item extensions (None): A list of textextensions for this bone. (See server/plugins/youtube.py for an example)
							  \end{itemize}\\

\hline

fileBone &	Stores a reference to an uploaded file.
		Extends treeItemBone.
		\emph{Note:} This reference is ''strong``
		(the only strong reference you will find inside ViUR).
		If a user deletes a file from his file-repository
		it vanishes there, but the file itself is kept as
		long as an entity references that file. &
							  \begin{itemize}
							   \item format (''\$(name)``): Hint for the admin how to name elements of this type.
							  \end{itemize}\\

\hline

hierarchyBone &	Stores a reference to an entity inside an
		hierarchy-application. Extends relationalBone.& \\

\hline

numericBone &	Holds numeric values (ints or floats)
		For floats, the precision can be specified in decimal-places. &
							  \begin{itemize}
							   \item precision (0): If 0, values will be rounded to Int, otherwise specify the precision (amount of decimal-digits) of floats.
							   \item min (-100000000000): Minimum accepted value (including).
							   \item max (100000000000): Maximum accepted value (including).
							  \end{itemize}\\

\hline

passwordBone &	Stores a Password. Its allways empty if read
		from DB. If saved with an empty value, the
		password is left unchanged, otherwise its
		stored as sha512-hash. & \\

\hline

relationalBone & Implements relations to other entities.
		(Usually in Lists, see treeItemBone, treeDirBone and hierarchyBone) &
							  \begin{itemize}
							   \item type (None): Name of the entities to link to. Must match their modul-name.
							   \item refKeys (None): List of properties of the linked Entity which will be included in the relation.
							   \item parentKeys (None): List of properties of the Entity which holds this relation which will be included
							   \item format (''\$(name)``): Hint for the admin how to name elements of this type. See admin/utils.py:formatString for more information.
							  \end{itemize}\\

\hline

selectCountryBone & Allows for selecting a country.
		Stores its values as ISO2 or ISO3 - Country-codes.
		Converts the value if its mode is switched between these codes afterwards. &
							  \begin{itemize}
							   \item codes (selectCountryBone.ISO2): Which code to use. Either selectCountryBone.ISO2 or selectCountryBone.ISO3.
							  \end{itemize}\\

\hline

selectMultiBone & Allows selecting multiple values from a list. &
							  \begin{itemize}
							   \item defaultValue( None ): A list of elemts, which will be selected by default.
							   \item values (None): Dictionary of Key=>Names. Names will form the visible List of items to choose from,
								  Keys are the ones which are saved to DB.
							  \end{itemize}\\

\hline

selectOneBone & Allows choosing one value from a list. &
							  \begin{itemize}
							   \item defaultValue( None ): Element (Its key) which will be selected by default.
							   \item values (None): Dictionary of Key=>Names. Names will form the visible List of items to choose from,
								  Keys are the ones which are saved to DB.
							  \end{itemize}\\
\hline

stringBone &	Stores a short String (up to 254 Chars). &
							\begin{itemize}
							 \item caseSensitive( False ): If True, keep an case-Insensitive index for searching.
							\end{itemize}\\

\hline

textBone &	Stores a longer String or RichText. &
							\begin{itemize}
							 \item validHtml( \emph{undefined} ): Set of html-tags valid for this bone. If None, all tags are removed.
								See server/bones.textBone.py for more information.
							\end{itemize}\\

\hline

treeDirBone &	References a Folder inside an Treeapplication. &
							\begin{itemize}
							 \item type( None ): Name of the application of which directories should referenced
							\end{itemize}\\

\hline

treeItemBone &	References a Entity inside an Treeapplication.
		Extends relationalBone. &
							 \begin{itemize}
							  \item type( None ): Name of the application of which directories should referenced
							 \end{itemize}\\

\hline

userBone &	References an User. Works with GoogleUser
		aswell as CustomUser (adapts automatically). &
							  \begin{itemize}
							   \item creationMagic (False): If True, save the current User on creating an entity.
								  Saves None if the entity is created by a guest.
							    \item updateMagic (False): If True, save the current User everytime the entity is modified.
								  Saves None if the entity is created by a guest.
							  \end{itemize} \\

\hline
\end{supertabular}

\subsection{Dataconsitency}

Unlike traditional LAMP systems, consitency is handled differently on the gae. There are three differnt causes
for inconsitency if using ViUR on the gae.

Datastore
The datastore offers 2 kinds of queries, providing different consitency constrains. The ''normal`` and fast queries
provide only eventual consitency. This means that changes made to one entity might not be visible instantly.
To ensure that changes made are visible instantly, ancestor queries are needed.
However, theire slower and have other constrains, so they are not used in ViUR.

Consequences/Example:
Imagine you have a list of objects, and provide a list filtered by color of these objects.
Now you change the color of one of these objects from ''red`` to ''blue``.
Due to the inconsitency, its possible for that object to still appear in the list of ''red`` objects
(instead of the ''blue`` ones) for a (usually very short as in a fraction of second) period of time after the change
has been comitted to the datastore.

ViURs DB cache
ViUR tries to optimize speed and ressource usage by utilizing the memcache to cache database queries.
Unfortanly, this introduces another type of inconsitency. In rare cases its possible that the entry in
the memcache is updated before the indexes in the datastore can catch up. Given the example introduced before,
its possible for the recently changed entry to still show up in the list of ''red`` ones, but will
list itself as ''blue`` allready. In fact, its possible that a db query for red ones return results with entries
of a different color, if that entrys color has recently been changed from red to another color.
As the datastore usually applies these changes in less than a second, this is very unliekely to happen,
but its possible. You can configure ViURs db-caching by setting \emph{viur.db.caching}.
A value of ''2`` (the default) means cache as much as possible, where its possible for this inconsitency to appear
under rare circumstances.
''1`` means cache less aggresive, where queries aren't served from Memcache, sothat this inconsitency cannot happen .
Seting this value to ''0`` means absolutely no caching (not recomment)

Relations
Relations are a core feature offered by ViUR. But as the datastore is non-relational,
offering relations ontop a non-relational datastore is a fairly complex task. To mainain quick response times,
ViUR dosnt search and update relations when an entry is updated. Instead, a special timestamp is updated,
so that a task in the backend can catch such updated entries and process thier relations (if any) accordingly.
This background task runs every 4 hour by default.
Asume that you have a relation from user to the colored objects from the first example (i.e. a user liked that object).
If that relation is part of the user skeleton, this problem arises.
So if the color of an object is changed, the query ''all users who like a red object`` will return that object
for up to four as a red object (i.e. until the background task finished updateing the relations).
Note that this does not happen if the relation is a part of that objects (i.e if the objects reference the user who liked it).
Rule of thumb: Relations part of the kind which got updated are updated aswell instantly.
Relations referencing that kind from another kind are updated later.

ViURs request cache.
ViUR offers an request cache, to speed up serving complex pages. This cache is not enabled by default,
as it has to be thightly integrated into the individual application. As flushing that cache happens asyncronly
in the background, its possible to have inconsitency between two sequential requests.
Given our example this means that our recently changed object might appear in both (red and blue) lists
(or in no list at all)  for a short timeframe (again, usually less than a few seconds).


base bone
^^^^^^^^^

.. automodule:: server.bones.bone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


numericBones
^^^^^^^^^^^^

.. automodule:: server.bones.numericBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


string based bones
^^^^^^^^^^^^^^^^^^


.. automodule:: server.bones.stringBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


.. automodule:: server.bones.documentBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


.. automodule:: server.bones.textBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


.. automodule:: server.bones.emailBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


.. automodule:: server.bones.passwordBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


boolean bone
^^^^^^^^^^^^

.. automodule:: server.bones.booleanBone
   :show-inheritance:
   :members:
   :undoc-members:
   :private-members:
   :special-members:


choice bones
^^^^^^^^^^^^

.. automodule:: server.bones.selectOneBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


.. automodule:: server.bones.selectMultiBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


.. automodule:: server.bones.selectCountryBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


hierarchical bone
^^^^^^^^^^^^^^^^^

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


relational bones
^^^^^^^^^^^^^^^^

.. automodule:: server.bones.relationalBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


.. automodule:: server.bones.extendedRelationalBone
    :show-inheritance:
    :members:
    :undoc-members:
    :private-members:
    :special-members:


misc bones
^^^^^^^^^^

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
