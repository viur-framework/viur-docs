Shop
====

ViUR offers a order module, providing a step by step checkout process,
integration of payment service providers like paypal or sofort.com and a simple state machine helping
the user keeping track of the state of individual orders.

[Bild Statemachine]

The module is mostly usable out of the box, but it needs some information's about what it should process.
First, it assumes that you use the cart module. If you don’t, you probably need to override the checkout function,
catch the case when step and id are None, and store the information what the user is about to order yourself.
Second, you must override the method :py:func:`server.modules.order.Order.getBillItems`, which returns a list on items to put on the bill for
the given order-id. Its also recommended to override the :py:func:`server.modules.order.Order.getBillPdf` and
:py:func:`server.modules.order.Order.getDeliverNotePdf` methods.
If overridden, they must return the bill/deliverynote as a PDF bytestring.
It also provides server hooks like :py:func:`server.modules.order.Order.sendOrderPayedEmai`},
which can be used to trigger custom actions if an order reaches the corresponding state.
If the default functionality isn't enough, it can be customized in several ways.


The module-level property :py:attribute:`server.modules.order.Order.steps` describes the steps the user has to go through in order to complete the checkout process.
Each step usually consist of one skeleton presented to the user (fe. the bill or shipping address).
If you need to query more or less data from the user during the checkout process, just add or remove
skeletons from that steps property. The property *mainHander* always references a skeleton.
The mode is either view (the skeletons data is just displayed to the user, but hes unable to alter that data) or edit.
*Skeleton* names the skeleton presented to the user, template the name of the template used to render
that skeleton and descr a human-readable descripton for that step.
Its possible to hook additional logic to the checkout-process using *preHandler* and *postHandler*.
Each can hold a callable (or a list of callables) executed either before the skeleton of that step
is presented to the user (preHandler) or after the user submitted valid information's for that step (postHandler).
Each handler can inject an html-page into the checkout process by raising the :py:exception:`server.modules.order.Order.ReturnHtml` exception.
For preHandlers its also possible to skip the step they're executed in by raising :py:exception:`server.modules.order.Order.SkipStep`
(Note that this also skips any remaining pre/post Handlers of that step).
If the default state-machine doesnt fit your needs, it can be extended by registering your own states
(by overriding the states-property) and hooking the predefined set*State* methods.

.. Note::
    It is not recommend to remove existing states from the module.
    If you need distinct groups of invoice numbers for different sets of items you are selling, override the assignBillSequence.


Paypal
^^^^^^^

To activate Paypal in your Shop, you need to request an API-Key from Paypal first.

 - Login to you Account
 - Choose My Account -> Profile -> My Settings
 - Select API Access (under Account Information)
 - Choose Option 2 - Request API credentials to create your own API username and password.

Now you'll see the API-Credentials for your account.
Finally, add them to your configuration

::

    conf["paypal"] = { 'USER' : '<your API user>',
                       'PWD' : '<your API password>',
                       'SIGNATURE' : '<your API signature'
                     }


Sofort.com
^^^^^^^^^^

For Sofort.com ViUR needs your UserID, ProjectID, ProjectPassword and NotificationPassword.
Login to your Account and create a new **classic project**.
Set its Success-URL to *https://{Your APP-ID}.appspot.com/order/doSofort*, its cancel/failure URL
to *https://{Your APP-ID}.appspot.com/order/sofortFailed* and enable HTTP-Post notifications to
*https://{Your APP-ID}.appspot.com/order/sofortStatus*.
Select My Project -> Select your Project -> Advanced Settings -> Password and Hash-Algorithm.
Select Create/Display your Project and Notification Password. Finally, set Input-Validation to SHA512.
Configure ViUR to use these newly created credentials.

::

    conf["sofort"] = { "userid":"<your user id>",
                       "projectid":"<project id>",
                       "projectpassword":"<project password>",
                       "notificationpassword":"<notification password>"
                      }

