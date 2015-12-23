Introduction
============

**ViUR** is an application development framework that mainly focuses on web-based
cloud development on top of the `Google AppEngine™`_ and using the power of the
`Python programming language`_.

ViUR-based applications are designated to be simple, flexible, extendible, versatile,
high-scalable and easy-to-use, and focus on agile software development workflows.
Applications implemented in ViUR cannot be seen as pure websites - Therefore, ViUR is not
meant to be some kind of shop, forum or CMS, but a framework to implement different
kinds of software running in the cloud. This can be only a website, but it also can be more.

ViUR currently exists of three parts:

- The **server** is the core of a ViUR application. It provides the server-parts of the
  web-application, a library of pre-defined data-models, modules, tools and libraries for
  data management and much more, and several renders to support different output kinds.
- The **admin** is the client-based, cross-platform administration backend to manage
  a ViUR application. It focuses on power-users that want to manage their applications
  with the full power of a desktop client computer.
- The **vi** is the web-based administration backend written in pure HTML5, to provide an
  easy-to-access management tool that directly runs system-independently in the web-browser
  of any desktop or even mobile devices.

Both administration tools support the integration of application-specific plug-ins and can
be used independently, depending on what is wanted and required.

.. _Google AppEngine™: http://appengine.google.com
.. _Python programming language: http://www.python.org/


Prerequisites
-------------

The server components of ViUR are written in **Python 2.7** because they are based on the
Google App Engine SDK. The `Google App Engine SDK <https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python>`_
is required for testing and deployment in the latest version.

As client system, Windows, OS X and Linux are supported, but Linux will give you the best
platform for development tasks with ViUR.

Terminology
-----------

ViUR introduces some special terminology also used in this documentation.

- **Application**
  A core set of functionality of the server, defining semantic relations between different entries of a
  module. An application is always the base class used for a *module*.

- **Module**
  A set of functionality usually built on top of an application.

  ViUR ships some predefined modules (like an user-module) and developers are encouraged to build
  custom modules for their particular projects.

- **Renderer**

  The final element in the output pipe. The renderer receives the data which should be rendered in
  the current request and wraps it into the desired output format (like HTML, JSON, XML and other.)

- **Kind**
  A *kind* roughly equals to the term of a table in SQL, or a collection in mongoDB.

  A kind is the name of an information group the AppEngine stores data in.
  But a kind is not bound to the restrictions known from an SQL-Table; its possible to
  have multiple models utilizing one kind, even with different attributes or conflicting types.

- **Skeleton**
  A skeleton describes the data that is written into the data store.

  In a more generic terminology, skeletons can be seen as models.
  Skeletons consist of several *bones*, defining the attributes of that model.

- **Bone**
  A bone stores the type, meta data and the value of one attribute in a skeleton.

  In ViUR, an attribute isn't just defined by its name, value and type, but also additional
  information used to automatically create input masks used to interact with the user.

  That's why we declare additional information (like descriptions, help text, etc.)
  along with the data model.
