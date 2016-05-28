Users
-----

ViUR comes with a module for managing and authenicating users. It has a unified user database and supports different
authenication and verification providers. An authenication provider is always the first step within the authentication
flow as these can tell the module *which* user tries to log in. Currently, we provide a one for username/password and
one for google accounts. An verification-provider is the second (optional) step within the authentication flow. It gets
the information from the user-module which user tries to log in and challenges him to verify him self using a second
factor. For this second factor we currently provide support for time based on-time passwords as they're generated
from the various hardware tokens available.

If the usermodule is used, you can always call module-independent function :py:func:`server.utils.getCurrentUser` to
retrieve the currently logged in user (if any). From jinja2, there's a global function with the same name available.


Configuring the usermodule
^^^^^^^^^^^^^^^^^^^^^^^^^^
There are 3 core properties on the usermodule that should be set.
*authenticationProviders* is the list of classes that can act as an authentication-provider
*secondFactorProviders* is the list of classes that can act as an additional verification provider
*validAuthenticationMethods* is the list of all valid pairs of authenticationProviders and secondFactorProviders

To enable users to login, at least one pair of an authentication and verification must be configured. If no secondFactor
verification is needed, the second parameter in that tuple can be None. The pairs are tried in the order they're listed.
When a user wants to login and there are multiple authentication-providers configured, he must be given the choice which
way he wants to authenticate him self (Username/Password or using his Google-account). Of course his account must be
configured to match that provider (ie it must have an username+password if that's chosen). After succefull authentication,
the verification providers are tried in order. The first one claiming it can verify that account is selected. If for the
authenticationProvider used a tuple with None as the secondFactorProvider is reached, the login process completes without
requiring an second factor. If a secondFactor is required all the times and none if it is properly configured for that
account, login is denied.

.. Note::
        All authentication and verification-providers are instantiated and made available under auth_<classname> and
        f2_<classname> properties. So if they have exposed functions there made reachable through this.



Configuring the UsernamePassword authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The UserPassword authentication can be configured to allow users to sign up (create their own account) by setting
the class-variable *registrationEnabled* to True. By default its set to False which means only admins can create
new accounts. If *registrationEmailVerificationRequired* is set to True (the default), new accounts aren't active until
the user proves that he owns the email address used during registration. If set, an email is sent to that address
containing a key the user has to enter on the site to prove he received that email. If *registrationAdminVerificationRequired*
is set, newly created accounts are locked until being approved by an admin. If both verifications are active, the user
has to prove his address first before the account enters the state of getting approved by an admin.

.. Note::
        Both properties have no effect if an user is created manually by an admin.

This authprovider also offers a method for users to reset a lost password. A user can request to have a new password
set for his account, and then gets an email with a code to verify that it was him who made the request and actually
perform the password change.

Configuring GoogleAccount authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
For that provider there is currently no configuration available. If enabled, it works out of the box.

.. Warning::
        If this module is active users can **always** create new accounts in your application by just hitting login.
        As it depends on an uid assigned by google only at login, it's not possible to create these accounts by hand.
        *registrationAdminVerificationRequired* isn't supported by this module yet.

Configuring timebased onetime password verification
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The only configurable property for this module is the *windowSize* parameter. As these hardware-token usually come with
a very crappy clock that can't be adjusted there's a high probability that the clock in such a token drifts away
from the time the server uses to calculate the valid keys from. With the defaultValue of 5, we accept all tokens within
a ten minute window (five minutes ahead and also five back in time). A larger value means greater tolerance for tokens
with bad clocks but also means reduced security. We recommend leaving it set to its default as this module has code that
detects and accommodates for this timedrift if the user logs in at least 3 to 4 times a year.



.. autoclass:: server.modules.user.User
   :show-inheritance:
   :members:
   :special-members:


.. autoclass:: server.modules.user.UserPassword
   :show-inheritance:
   :members:
   :special-members:

.. autoclass:: server.modules.user.GoogleAccount
   :show-inheritance:
   :members:
   :special-members:

.. autoclass:: server.modules.user.Otp2Factor
   :show-inheritance:
   :members:
   :special-members: