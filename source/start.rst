Getting started
###############

This part of the documentation provides a first steps guide for quickly setting up an application with ViUR. The following chapters will go much deeper into ViUR, its architecture and how it is used.

This part of the documentation only discusses the Google App Engine™ shortly. A little knowledge on what it is, how it works and how an application is registered there is required, before continuing.

Prerequisites
=============

ViUR runs on top of the Google App Engine™ (GAE). This means, that a ViUR application needs to be deployed to the Google Cloud Platform when it is run on the internet. For the deployment as well as a local development and testing environment, Google offers the `Google App Engine SDK for Python`_ for free.

There are two ways to get the SDK run on your machine:

1. Manually download and install the SDK natively from the above location for your particular operating system. Windows, Mac OS and Linux are supported. In case that Linux is used, the particular package manager should be consulted first, maybe it already supports packages for the Google App Engine SDK for Python.

2. If you are familiar with Docker, we also offer several `ViUR docker recipes`_ to quickly set up a dedicated, Linux-based build-environment, with all prerequisites installed.


.. _Google App Engine SDK for Python: https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python
.. _ViUR docker recipes: https://hub.docker.com/u/viur/


Setting up a ViUR project from scratch
======================================

Setting up a new ViUR project is easy, and takes only a few steps for getting a working result.

The way described here only provides a basic stub for a fresh ViUR project to start from. It has no functionality at all. If you want to start with a pre-configured example project, take a look at :ref:`Setting up the demo project`.

Make sure that the :ref:`Prerequisites` are installed so far, and Python is in your PATH.

1. Download the latest server package as :download:`tar.gz-file <http://www.viur.is/package/download/server/latest>` or
as :download:`zip-file <http://www.viur.is/package/download/server/latest/zip>`.

2. Create an empty project folder of your choice.

3. Unpack the server into a folder called ``server`` inside the new project folder.

4. On Linux or Mac OS, open up a command-line and change into your project folder. Run ``python server/server.py``. On Windows, simply double-click ``setup.py`` in the just extracted ``server`` directory.

6. The setup utility determines the project name from the project directory. This should be the same name as the unique application identifier registered for the application on GAE, if deploying is wanted. Enter a project-name or confirm the default one.

7. Confirm the installation when the correct folder is prompted. The setup utility then will write all necessary files.

8. Now you're done! Start your app locally with the Google App Engine Launcher (Windows, Mac OS) or type ``dev_appserver.py .`` on your console prompt.

**Todo: I think we have to differ here in sections between Linux (console users) and Windows/Mac OS "klickibunti" Users**.

Setting up the demo project
===========================

Todo
