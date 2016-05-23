User
=====

ViUR offers two different user modules.
One utilizes the users-api provided by the gae, the other provides a custom user database.
The users api depended module allows easy login by users already having an google account,
and is the easiest way of setting up a small application as users having access to the admin-console of
the gae automatically gain admin rights.
Just deploy your application and directly log in using the admin and your google account.

The other module provides a custom, google independent authentication.
This is useful if you don't want to require your users having/creating an google account or
you need to import an existing user database. Both modules share the same API and can substitute each other.
All components in ViUR adapt automatically to the chosen usermodule. However, once the application is deployed and used,
you should not change the underlying usermodule - you would lose all relations to existing users.
Both modules support extending the userSkel to store additional data along with the user.
Also both modules support editing an user, as well as logging in and out.
Adding an user is only supported by the custom user module; for the google-users-api depended module a user has to login once,
then its entry will be created. Deleting an user is also possible on both modules, but has limited effect on
the users-api depended module, as a new entry *with the same key* will be created the next time he logs in.
Only the additional data stored along with this user will not be restored.

+----------+-----------------------------------+-----------------------------------+-----------------------------------+
| Action   | Description                       | Google User                       | Custom User                       |
|          |                                   |                                   |                                   |
+==========+===================================+===================================+===================================+
| login    | Starts the login-process for      | Fully supported. If the user has  | Fully supported.                  |
|          | the current session.              | already given permission to this  |                                   |
|          |                                   | app, this falls directly thorough |                                   |
|          |                                   | to login\_succeeded.              |                                   |
+----------+-----------------------------------+-----------------------------------+-----------------------------------+
| logout   | Ends the current session.         | Fully supported.                  | Fully supported.                  |
|          | (Needs an SecurityKey)            |                                   |                                   |
+----------+-----------------------------------+-----------------------------------+-----------------------------------+
| add      | Creates a new user                | Not supported. A new user         | Fully supported.                  |
|          |                                   | must login once first.            |                                   |
+----------+-----------------------------------+-----------------------------------+-----------------------------------+
| edit     | Edits an user                     | Fully supported.                  | Fully supported.                  |
+----------+-----------------------------------+-----------------------------------+-----------------------------------+
| delete   | Removes an user from the system.  | Supported, but limited            | Fully supported.                  |
|          |                                   | consequences, as the entry        |                                   |
|          |                                   | will be recreated if the user     |                                   |
|          |                                   | logs in again.                    |                                   |
+----------+-----------------------------------+-----------------------------------+-----------------------------------+
| view     | Displays information's about an   | Fully supported.                  | Fully supported.                  |
|          | user. If the user-id is omitted,  |                                   |                                   |
|          | it displays the current user.     |                                   |                                   |
+----------+-----------------------------------+-----------------------------------+-----------------------------------+
| pwrecover| Starts the password-reset for the | Not supported. The user must use  | Fully supported.                  |
|          | given user                        | the Google account recovery       |                                   |
|          |                                   | instead.                          |                                   |
+----------+-----------------------------------+-----------------------------------+-----------------------------------+
| verify   | Verifies the users email.         | Not supported.                    | Fully supported.                  |
|          | (If verification has been enabled)|                                   |                                   |
+----------+-----------------------------------+-----------------------------------+-----------------------------------+


The custom user-module allows specifying if guests are allowed to register an account on this application and if,
under what conditions.


 - registrationEnabled:
      If true, Guests are allowed to register. If False, new users have to be created by an admin.
 - registrationEmailVerificationReq:
      If true, new users have to verify their email address first before the can log in.
      Has no effect if an user is created by an admin.
 - registrationAdminVerificationRequired:
    If true, new users must be approved by an admin.
    If combined with EmailVerificationRequired, a user has to proove his email first,
    and then be approved by an admin. No effect if the user is created by an admin.


To access information about the currently logged-in user, use the module-independent function
:py:function:`server.utils.getCurrentUser`.
