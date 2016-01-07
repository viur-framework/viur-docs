Introduction
============
**ViUR** is an application development framework that focuses on
cloud-based information systems implemented on top of the `Google AppEngine™`_.

ViUR is designed to enable applications which are simple, clear, flexible,
extendible, versatile, high-scalable and easy-to-use. To fit the
requirements of modern agile software development workflows, ViUR is entirely
written in the `Python programming language`_.

Applications implemented in ViUR are not limited to websites or any other
kind of specialized web-application. Therefore we call ViUR an information
system, because it goes beyond the limitations of a content-management-system
or other kinds of specialized web-application software.

ViUR helps to manage any kind of information. It comes with a set of four
pre-defined application types which can be used to build modules for any
desired tasks. Pre-defined modules can easily be adapted for particular goals.
New modules are simply created or
extended from other ones. Data structures can be defined, extended and changed
during the development workflow. Input masks and data management interfaces
are dynamically created within the administration tools.

ViUR currently exists of three parts:

- The **server** is the core of a ViUR application.

  It provides the server-parts
  of the web-application, a library of pre-defined data-models, modules, tools
  and libraries for data management, and several renderers for different types of output.

- The **admin** is the client-based administration backend used to
  manage a ViUR application.

  It is cross-platform capable and focuses on
  power-users that want to manage
  their applications with the full power of a desktop client computer.

- The **vi** (visual interface) is the web-based administration backend.

  It is an easy-to-access management tool.
  Written in pure HTML5, it runs system-independently in the web-browser and can be
  used on any desktop or mobile device.

Both administration tools support the integration of application-specific
plug-ins and can be used independently, depending on what is wanted and
required.

.. _Google AppEngine™: http://appengine.google.com
.. _Python programming language: http://www.python.org/

Prerequisites
-------------

The server components of ViUR are written in **Python 2.7** because they are
based on the Google App Engine SDK. The `Google App Engine SDK
<https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python>`_
is required for testing and deployment in the latest version.

As client system, Windows, OS X and Linux are supported. We recommend Linux for
ViUR development tasks.


Terminology
-----------

ViUR introduces some special terminology also used in this documentation.

- **Application**

  A core set of functionality of the server, defining semantic relations between different entries of a
  module. An application is always the base class used for a *module*.

- **Module**

  A set of functionality usually built on top of an application.

  ViUR ships some predefined modules (like a user-module) and developers are encouraged to build
  custom modules for their particular projects.

- **Renderer**

  The final element in the output pipe. The renderer receives the data which should be rendered in
  the current request and wraps it into the desired output format (HTML, JSON, XML and other).

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

  A bone stores the type, value and meta data of one attribute in a skeleton.

  The meta data is additional information (descriptions, help text, etc.)
  used to automatically create input masks for user interaction.
