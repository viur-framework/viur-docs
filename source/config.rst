Configuration
=============

The module ``config`` provided by the ViUR server contains several configuration entries to change the
servers behavior, access system-global parameters, or provide some kind of global variables within a
ViUR project setup.

It simply can be imported into any server-side module with

::

    from server.config import conf

All ViUR-specific parameters have the prefix **viur.**. Parameters that influence or extend information
used by the Admin-tools

This section gives an overview and detailed information about how to use ViURs pre-defined configuration
parameters.

Server configuration
********************

viur.accessRights - Default user access rights
----------------------------------------------

viur.availableLanguages - List of valid language-codes
------------------------------------------------------

viur.cacheEnvironmentKey - Call function for each cache-attempt
---------------------------------------------------------------

.. viur.capabilities -

viur.contentSecurityPolicy - Emit CSP HTTP-header with each request
-------------------------------------------------------------------

viur.db.caching - Define cache strategy
---------------------------------------

2: Aggressive, 1: Safe, 0: Off

viur.debug.traceExceptions - Catch and handle user-generated exceptions
-----------------------------------------------------------------------

viur.debug.traceExternalCallRouting - Logging exposed functions
---------------------------------------------------------------

viur.debug.traceInternalCallRouting - Logging internalExposed functions
-----------------------------------------------------------------------

viur.debug.traceQueries - Logging datastore queries
---------------------------------------------------

viur.defaultLanguage - Default language
---------------------------------------

Unless overridden, english ("en") will be used as the default language.

viur.disableCache - Override @enableCache decorator
---------------------------------------------------

If set True, the decorator @enableCache from server.cache has no effect

viur.domainLanguageMapping - Map domains to alternative default languages
-------------------------------------------------------------------------

viur.emailRecipientOverride - Override all outgoing emails recipients
---------------------------------------------------------------------

If set, all outgoing emails will be send to this address (overriding the 'dests'-parameter in utils.sendEmail).

viur.emailSenderOverride - Override sender of all outgoing emails
-----------------------------------------------------------------

If set, this sender will be used, regardless of what the templates advertise as sender.

viur.errorHandler - Defining custom error handler
-------------------------------------------------

If set, ViUR calls this function instead of rendering the viur.errorTemplate if an exception occurs.

viur.errorTemplate - Defining custom error template
---------------------------------------------------

Path to the template to render if an unhandled error occurs.
This is a Python String-template, *not* a Jinja2 one! (??)

viur.exportPassword - Enable database export API
------------------------------------------------
Activates the database export API if set.
Must be exactly 32 chars. *Everyone* knowing this password can dump the entire database!

viur.forceSSL - Enforce HTTPS
-----------------------------
If true, all requests must be encrypted (ignored on development server).

viur.importPassword - Enable database import API
------------------------------------------------

Activates the Database import API if set.
Must be exactly 32 chars. *Everyone* knowing this password can override the entire database!

viur.languageAliasMap - Mapping for certain languages
-----------------------------------------------------

Allows mapping of certain languages to one translation (ie. us->en).

viur.languageMethod - Method of how translation is applied
----------------------------------------------------------
Defines how translations are applied.

- session: save within session
- url: inject language prefix in url
- domain: one domain per language


viur.logMissingTranslations - Log missing translations
------------------------------------------------------

If True, ViUR will log missing translations in the datastore.

viur.mainApp - Reference application instance
---------------------------------------------

Reference to the pre-build Application-Instance. **May not be overridden!**

viur.maxPasswordLength - Maximum password length
------------------------------------------------

Prevent denial of service attacks using large inputs for pbkdf2. Defaults to 512.

viur.maxPostParamsCount - Maximum number of parameters
------------------------------------------------------
Upper limit of the amount of parameters accepted per request.
Prevents Hash-Collision-Attacks.

viur.models - Dictionary of all models
--------------------------------------

viur.noSSLCheckUrls - Disable SSL checking for URL-prefixes
-----------------------------------------------------------

List of Urls for which viur.forceSSL is ignored.
Add an asterisk to mark that entry as a prefix (exact match otherwise).

viur.requestPreprocessor - Defining request preprocessor
--------------------------------------------------------

Allows the application to register a function that is called before the request gets routed.


viur.salt - Default salt used for passwords
-------------------------------------------
Default salt which will be used for e.g. passwords.
Once the application is used, this may never change again!

viur.searchValidChars - Valid characters for the internal search
----------------------------------------------------------------
Characters valid for the internal search functionality (all other chars are ignored).

viur.session.lifeTime - Lifetime of sessions
--------------------------------------------
Default is 60 minutes lifetime for ViUR sessions. The value must be given in seconds.

viur.session.persistentFieldsOnLogin - Hold session values on login
-------------------------------------------------------------------
The session is reset after login. Fields specified in this list will be kept on login.

viur.session.persistentFieldsOnLogout - Hold session values on logout
---------------------------------------------------------------------
The session is reset after logout. Fields specified in this list will be kept on logout.

viur.tasks.startBackendOnDemand - Start a backend immediately
-------------------------------------------------------------
If True, allows the task module to start a backend immediately (instead of waiting for the cronjob)


Admin configuration
*******************

admin.modulGroups - Group modules within panes
----------------------------------------------

Its possible to group different modules, so they share a single entry in the admin.
This is done by choosing a prefix, which will be used to group the different modules.

::

	conf[ "admin.modulGroups" ] = [
       {"prefix":"Tea: ", "name": "Tea", "icon": "icons/modules/produktdatenbank.png" },
     ]


This example will add all modules, which descriptions starts with the prefix *Tea:* to the group *Tea* with the given icon.


admin.vi.name - Display name in the Visual Interface
----------------------------------------------------
Specifies a custom name in the Visual Interface admin.

::

    conf["admin.vi.name"] = u"Admin"

admin.vi.logo - Display logo in the Visual Interface
----------------------------------------------------
Specifies a custom logo in the Visual Interface admin.

::

    conf["admin.vi.logo"] = "/static/meta/project-logo.svg"

Miscellaneous configuration
***************************

bugsnag.apiKey - Key for Bugsnag error reporting
------------------------------------------------

ViUR has integrated support for bugsnag.
To enable reporting to bugsnag, just set your API-Key, the rest will be determined automatically.

::

    conf["bugsnag.apiKey"] = "your api key"
