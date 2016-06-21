Basic concepts
##############

This part of the documentation targets to the basic architecture behind ViUR, and describes how the system is made up and how things work together.

Overview
========

On the first view, ViUR is a modern implementation of the traditional Model-View-Controller (MVC) design pattern. But ViUR is also much more. It helps to quickly implement new, even complex data models using pre-defined but highly customizable controllers and viewers.

Let's section these three parts of the MVC-concept and explain them in the terms of ViUR.

- In ViUR, the *models* are called **skeletons**. As seen from the biological point of view, a skeleton is a collection of bones. Therefore, the data fields in ViUR are called **bones**. Bones have different specialization and features, but more about that will follow soon.

- The *controllers* are called **modules**. They form a callable module of the application, which focuses a specific data kind or task. To implement modules, ViUR provides four generic *prototypes*: List, hierarchy, tree and singleton. There are many pre-built modules delivered with the ViUR server that implement e.g. a user-module, including login and registration logics, or a file-module, which is a tree (like a filesystem) to store files in the cloud.

- The *views* are called **renderers**. They render the output of the modules in a specific, clearly defined way. ViUR provides different renderers for different purposes. The jinja2-renderer, for example,  connects the Jinja template engine to ViUR, to emit HTML code for websites. The JSON-render serves as a REST-API and is used by several applications and tools communicating with the ViUR system, including the admin-tools.

These are the fundamental basics of the ViUR information system. It is now necessary to get deeper into these topics and arrange these three parts to get working results.

Folder structure
================

A typical ViUR application has a clearly defined folder structure.

This is the folder structure that is created by the setup.py utility as described in the :ref:`Getting started` section.

::

	project
	├── app.yaml
	├── cron.yaml
	├── project.py
	├── emails/
	├── html/
	├── index.yaml
	├── modules/
	├── server/
	├── skeletons/
	├── static/
	├── translations/
	└── vi/


The following tables gives some short information about each file/folder and their description.

=============   =================================================================================
File / folder   Description
=============   =================================================================================
app.yaml        This is the Google App Engine main configuration file for the application.

                It contains information about how to trigger the application, which folders are exposed in which way and which libraries are used.

cron.yaml       This is a Google App Engine cron tasks configuration file.

project.py      This Python script is the application's main entry. It is project-specific and normally the place where configuration parameters or specialized settings can be done.

                This file is automatically named after the project, and referred by app.yaml.

emails/         Template folder for emails. Not necessary for now.

html/           Template folder for the HTML-templates rendered by the Jinja2 template engine.

index.yaml      This is an (mostly) automatically managed configuration file for the Google datastore database describing compound indexes for several document kinds in the database. These indexes are required for querying data, but will also be discussed later.

modules/        This is the folder where the applications modules code remains.

                Usually, every module is separated into one single Python file here, but it can also be split or merged, depending on the implementation. Every module that should be made available to the system must be imported in the ``__init__.py`` in order to Pythons typical packaging logic.

server/         This is the ViUR server as downloaded from `<http://viur.is>`_.

                It serves as a library for the entire application and provides all requirements for the ViUR system.

                This folder can be updated to a newer server version without changing the behavior of the application, except it is necessary (please read the updating guidelines, if so).

skeletons/      Like the modules folder, this is the place where the skeletons for the data models are put.

                Usually, one Python file for every skeleton, but this is also only an advise. ``__init__.py`` must also be extended when new skeletons are created.

static/         This folder is used for static files that are served by the applications when providing a HTML-frontend. CSS, images, JavaScripts, meta-files and fonts are stored here.

translations/   When multi-language support is wanted, this folder contains simple Python files which hold the translation of static texts to be replaced by their particular language. Its not important for now.

vi/             Contains the Vi.

                This folder is *not* created by the setup utility, but exists if the Vi was downloaded and installed from `<http://viur.is>`_, or a demo project is used.

                Vi is an HTML5-based administration interface to access the ViUR system's modules and its data. The Vi is some kind of backend for ViUR, but it could also be the front-end of the application - this all depends on what the ViUR system implements in its particular application.
=============   =================================================================================


