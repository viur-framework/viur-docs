Configuration
=============
The module ``config`` provided by the ViUR server contains several configuration entries to change the
servers behavior, access system-global parameters, or provide some kind of global variables within a
ViUR project setup.

It simply can be imported into any server-side module with

::

    from server.config import conf

All ViUR-specific parameters have the prefix **viur.**. Parameters that influence or extend information
used by the Admin-tools start with the prefix **admin.** or more specialized with **admin.vi.**.

If parameters are changed for configuration issues, this should be done on the server's main entry, which
the Python source file that calls the ``server.run()`` function.

This section gives an overview and detailed information about how to use ViURs pre-defined configuration
parameters.

Server configuration
********************

viur.accessRights
-----------------
Defines a list of default user access rights. Defaults to ``["admin", "root"]``.

This list can be extended to project-specific access rights that are made available to every user
entity created by the user module. By default, there exists two entries which are

- *admin* defines if the user has admin-access
- *root* defines if the user is a root-admin (root admins are allowed to change every entity)

These entries can be enhanced in the application's main entry with

::

    conf["viur.accessRights"].append("myProjectFlag")


*viur.accessRights* also contains entries for every module to specify the access rights for single modules
per user. These flags are added later on when the server is started.


viur.availableLanguages
-----------------------
Defines a list of valid language-codes. These are languages that are available on projects with
multi-language setup.

The language code defines the name of the language translation file in the *translations* folder of the
project and is used to select the current display language, which can be done by several methods.

Example configuration:
::

    conf["viur.availableLanguages"] = ["de", "en", "fr"] # German, English, French.

See also `viur.defaultLanguage`_, `viur.domainLanguageMapping`_, `viur.languageMethod`_
and `viur.logMissingTranslations`_.


viur.cacheEnvironmentKey
------------------------
Call this function for each cache-attempt.

If the configuration parameter *viur.cacheEnvironmentKey* contains a callable, this function will be
called for each cache-attempt and the result will be included in the computed cache-key. This allows you to
easily include environment variables like the current language into the key used to determine the caching-slot.


viur.capabilities
-----------------
Reserved for further use.

Can be used to advertise system-wide addons to modules.


viur.contentSecurityPolicy
--------------------------
Emit Content-Security-Policy HTTP-header with each request.

Use server.securityheaders to modify this property.


viur.db.caching
---------------
Defines a caching strategy that is used by the database API to reduce read-requests on cloud-databases
like Google Datastore. We recommend to leave this set to *2*. See :doc:`consistency`.

- 2: Aggressive mode (default)
- 1: Safe mode
- 0: Turns optimization off


viur.debug.traceExceptions
--------------------------
Disable catch and handling of user-generated http-exceptions. Useful to trace where a Redirect or Forbidden etc. error
is raised inside deeply nested code.


viur.debug.traceExternalCallRouting
-----------------------------------
Logging calls of any functions marked as exposed. It will write the called function name and it's parameter to the log.

.. Warning:

    This might include sensitive data like unencrypted usernames and passwords in your log! Keep it off in production!


viur.debug.traceInternalCallRouting
-----------------------------------
Logging calls of any functions marked as internalExposed. It will write the called function name and it's parameter to the log.

.. Warning:

    This might include sensitive data like unencrypted usernames and passwords in your log! Keep it off in production!


viur.debug.traceQueries
-----------------------
Logging of datastore queries.

If enabled, ViUR will write each query run against the datastore into the log - including it's kind, filters and orders.


viur.defaultLanguage
--------------------
Default language used by the project, if no other language code was specified.

Unless overridden, english ("en") will be used as the default language.

See also `viur.availableLanguages`_, `viur.domainLanguageMapping`_, `viur.languageMethod`_
and `viur.logMissingTranslations`_.


viur.disableCache
-----------------
If set True, the decorator @enableCache from server.cache has no effect.


viur.domainLanguageMapping
--------------------------
Map domains to alternative default languages.

See also `viur.availableLanguages`_, `viur.defaultLanguage`_, `viur.languageMethod`_
and `viur.logMissingTranslations`_.


viur.emailRecipientOverride
---------------------------
Override recipients for all outgoing email. This should be done for testing purposes only.

If set, all outgoing emails will be send to this address
(always overriding the *dests*-parameter in `server.utils.sendEmail`_).

::

    conf["viur.emailRecipientOverride"] = "john@doe.net" # Simple override
    conf["viur.emailRecipientOverride"] = ["john@doe.net", "max@mustermann.de"] # Override to multiple targets
    conf["viur.emailRecipientOverride"] = "@viur.is" # Redirect all emails to this domain. "me@gmail.com" would become "me_at_gmail_dot_com@viur.is"
    conf["viur.emailRecipientOverride"] = False # Entirely disable sending emails.
    conf["viur.emailRecipientOverride"] = None # Default, outgoing email go to the specified recipients.


See also `viur.emailSenderOverride`_.


viur.emailSenderOverride
------------------------
Override the sender of all outgoing emails by this one.

If set, this sender will be used, regardless of what the templates advertise as sender.

::

    conf["viur.emailSenderOverride"] = "john@doe.net" # Simple override
    conf["viur.emailSenderOverride"] = "John Doe <john@doe.net>" # Override with name
    conf["viur.emailSenderOverride"] = None # No override (default)


See also `viur.emailRecipientOverride`_.


viur.errorHandler
-----------------
Defines a custom error handler. If set, ViUR calls this function instead of rendering the
`viur.errorTemplate`_ in case of exception.

The function must accept one argument (an instance of the Python exception object, or an instance of the
`server.errors.HTTPException`_, in case that an HTTP-exception occurs).


viur.errorTemplate
------------------
Defines a custom error template. This is a path to the template to render if an unhandled error occurs.

This is a Python String-template, *not* a Jinja2 one! Might have no effect if `viur.errorHandler` is set.


viur.exportPassword
-------------------
Activates the database export API if set.

Must be exactly 32 chars. *Everyone* knowing this password can dump the entire database!


viur.forceSSL
-------------
Enable HTTPS enforcement.

::

    config["viur.forceSSL"] = True # We want to be secure!

If set True, all requests must be encrypted (ignored on development server). If unencrypted requests are received,
a redirect to https://your.domain/ is raised (the path and request paremeters are *not* preserved for security reasons).


viur.importPassword
-------------------
Activates the database import API if set.

Must be exactly 32 chars. *Everyone* knowing this password can override the entire database!


viur.languageAliasMap
---------------------
Defines a mapping for certain languages directing to one translation (ie. us->en).


viur.languageMethod
-------------------
Method of how translation is applied.
By default, this is configured to "session".

- *session* saves within session (default)
- *url* injects a language prefix into the URL
- *domain* configures one domain per language


viur.logMissingTranslations
---------------------------
Silently log missing translations during application run.
If True, ViUR will log missing translations in the datastore.


viur.mainApp
------------
Holds a reference to the pre-build application-instance that exists
after ``server.run()`` was called. **May not be overridden!**


viur.maxPasswordLength
----------------------
Defines a maximum password length.

This prevents denial of service attacks using large inputs for pbkdf2.

The value defaults to 512.


viur.maxPostParamsCount
-----------------------
Upper limit of the amount of parameters accepted per request.

Prevents Hash-Collision-Attacks.

The value defaults to 250.


viur.models
-----------
Holds a dictionary of all models. **May not be overridden!**


viur.noSSLCheckUrls
-------------------
Disable SSL checking for URL-prefixes.

This is a list of URLs for which `viur.forceSSL`_ will be ignored.
It defaults to ``["/_tasks*", "/ah/*"]``.

Add an asterisk to mark that entry as a prefix (exact match otherwise).


viur.requestPreprocessor
------------------------
Definition of a request preprocessor.

This allows the application to register a function that is called before the request gets routed.
This function takes the original input path as parameter, and returns a different or rewritten path.

The returned path with then be used by ViURs internal module handler logic.


viur.salt
---------
Default salt used for passwords.

Don't change. It's deprecated and will be removed in a future version.


viur.searchValidChars
---------------------
Characters valid for the internal search functionality (all other characters are ignored).


viur.security.contentSecurityPolicy
-----------------------------------
If set, viur will emit a CSP http-header with each request.

Use securityheaders.addCspRule to set this property.


viur.security.strictTransportSecurity
-------------------------------------
If set, viur will emit a HSTS http-header with each request.

Use securityheaders.enableStrictTransportSecurity to set this property. Only partially supported on the Appengine atm.


viur.security.publicKeyPins
---------------------------
If set, viur will emit a Public Key Pins http-header with each request.

Use securityheaders.setPublicKeyPins to set this property. Currently not supported by the Appengine.


viur.security.xFrameOptions
---------------------------
If set, ViUR will emit a X-Frame-Options header.

Use securityheaders.setPublicKeyPins to set this property

viur.security.xXssProtection
----------------------------
ViUR will emit a X-XSS-Protection header if set (the default).

Use securityheaders.setXXssProtection to set this property.


viur.security.xContentTypeOptions
---------------------------------
ViUR will emit *X-Content-Type-Options: nosniff* Header unless set to False.

Use securityheaders.setXContentTypeNoSniff to set this property.


viur.session.lifeTime
---------------------
Specifies the lifetime of sessions.

The value must be given in seconds.
Default is 60 minutes lifetime for ViUR sessions.


viur.session.persistentFieldsOnLogin
------------------------------------
Hold session values on login.

The session is reset after login. Fields specified in this list will be kept on login.

::

    from server import session, config
    config["viur.session.persistentFieldsOnLogin"] = ["username"]

    session.current["username"] = "john" # Will be kept after logging in
    session.current["password"] = "secret" # Will be lost after logging in
    session.current.markChanged()


viur.session.persistentFieldsOnLogout
-------------------------------------
Hold session values on logout.

The session is reset after logout. Fields specified in this list will be kept on logout.

For example, see `viur.session.persistentFieldsOnLogin`_.


viur.tasks.customEnvironmentHandler
-----------------------------------
Preserve additional environment in deferred tasks.

If set, must be a tuple of two functions (serializeEnv, restoreEnv) for serializing/restoring your enviromental data.
The serializeEnv function must not accept any parameter and return and json-serializable object with the information
you need to preserve. The restoreEnv function receives that object and should write the information contained therein
into the environment of that deferred request.


Admin configuration
*******************

admin.modulGroups
-----------------
Grouping modules within panes.

It is possible to group different modules into logical panes, so they share a single entry in the admin.
This is done by choosing a prefix, which will be used to group the different modules.

::

	conf[ "admin.modulGroups" ] = [
       {"prefix":"Tea: ", "name": "Tea", "icon": "icons/modules/produktdatenbank.png" },
     ]


This example will add all modules, which descriptions starts with the prefix *Tea:* to the group *Tea*
with the given icon.

admin.vi.name
-------------
Specifies a custom name in the vi admin.

::

    conf["admin.vi.name"] = u"Admin"

admin.vi.logo
-------------
Specifies a custom logo in the vi admin.

::

    conf["admin.vi.logo"] = "/static/meta/project-logo.svg"

Miscellaneous configuration
***************************

bugsnag.apiKey
--------------
ViUR has integrated support for bugsnag.

To enable reporting to bugsnag, just set your personal bugsnag API-Key,
the rest will be determined automatically.

::

    conf["bugsnag.apiKey"] = "your api key"
