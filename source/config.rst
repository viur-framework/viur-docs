Configuring the Server
----------------------

The behaviour of ViUR's server can be customized in various ways.


Grouping modules
^^^^^^^^^^^^^^^
Its possible to group different modules, so they share a single entry in the admin.
This is done by choosing a prefix, which will be used to group the different modules.
::

    conf[ "admin.modulGroups" ] = [
       {"prefix":"Tea: ", "name": "Tea", "icon": "icons/modules/produktdatenbank.png" },
     ]

This example will add all modules, which descriptions starts with the prefix *Tea:* to the group *Tea* with the given icon.

Bugtracking with bugsnag
^^^^^^^^^^^^^^^^^^^^^^^^

ViUR has integrated support for bugsnag. To enable reporting to bugsnag, just set your API-Key, the rest will be determined automatically.

::

    conf["bugsnag.apiKey"] = "your api key"



