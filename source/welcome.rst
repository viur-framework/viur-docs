Terminology
===========

ViUR introduces some special terminology also used in this documentation.

 - Application:
    A core set of functionality of the server, defining semantic relations between different entries of an module.
    The list-application stores entities in a flat list, the hierarchy-app stores entities in a tree, the tree module in a tree of folders,
    and the singleton application ensures that there's only one entity per module.
  - Modul:
    A set of functionality usually built ontop an application. ViUR ships some predefined modules (like an user-module) and
    developers are encouraged to build custom modules for their projects.
  - Render:
    The final element in the output pipe. Renders receive the data which should be rendered in the current request and
    wrap it into the desired output format (like html or json)
  - Kind
    A "kind" roughly equals an SQL-Table (or "collection" in mongoDB). Its the name of group the
    appengine stores the data in. But a kind is not bound to the restrictions known from an SQL-Table; its possible to
    have multiple models utilizing one kind, even with different attributes or conflicting types.
  - Skeleton:
    ViURs terminology for a ``model''. Such a skeleton describes the data thats written into the datastore.
    In ViUR, such a Skeleton consists of several *Bones*, defining the attributes of that model.
  - Bone:
    Stores type,metadata and the value of one attribute in a Skeleton. In ViUR, a attribute doesn't just define its name,
    value and type, but also additional information's used to automatically create forms used to interact with the user.
    That's why we declare additional information (like descriptions, help text, etc.) along with the datamodel.

