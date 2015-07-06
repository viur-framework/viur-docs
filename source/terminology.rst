Terminology
===========

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

  A *kind* roughly equals to an SQL-Table (or "collection" in mongoDB).

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
