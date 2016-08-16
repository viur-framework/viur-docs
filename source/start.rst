Getting started
###############

This part of the documentation provides a first steps guide for quickly setting up an application with ViUR. The following chapters will go much deeper into ViUR, its architecture and how it is used. The Google App Engine™ is only introduced shortly here. Knowledge on what it is, how it works and how an application is registered there is required, before continuing.

Prerequisites
=============

ViUR runs on top of the Google App Engine™ (GAE). This means, that a ViUR application needs to be deployed to the Google Cloud Platform when it is run on the internet. For the deployment as well as a local development and testing environment, Google offers the **Google App Engine SDK for Python** for free on `<https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python>`_.

There are two ways to get the SDK run on your machine:

1. Manually download and install the SDK natively from the above location for your particular operating system. Windows, Mac OS and Linux are supported. In case that Linux is used, the particular package manager should be consulted first, maybe it already supports packages for the Google App Engine SDK for Python.

  It is also required to have a working **Python 2.7** installation on your machine. This can be obtained from `python.org <https://www.python.org>`_, but may be pre-installed already when you are on Linux or Mac OS.

2. If you are familiar with Docker, we also offer several *ViUR docker recipes* to quickly set up a dedicated, Linux-based build-environment, with all prerequisites installed. To make use of these, just visit `<https://hub.docker.com/u/viur/>`_.

Setting up a ViUR project from scratch
======================================

Setting up a new ViUR project is easy, and takes only a few steps for getting a working result. Make sure that the :ref:`Prerequisites` described above are installed so far, and Python is in your PATH.

The way described here only provides a basic stub for a fresh ViUR project to start from. It has no functionality at all. If you want to start with a pre-configured example project, take a look at :ref:`Setting up the demo project`.

1. Create an empty project folder of your choice in a location of your choice. Change into this location.

2. Download the latest server as tarball from `<http://viur.is/package/download/server/latest>`_ or a zipfile from `<http://viur.is/package/download/server/latest/zip>`_.

3. Unpack the server into your project directory as a subfolder ``server``. After that, the archive can be removed again or copied elsewhere.

4. Run ``python server/setup.py``. On Windows, just double-clicking the file ``setup.py`` should do the job.

5. The setup utility determines the project name from the project directory. This should be the same name as the unique application identifier registered for the application on GAE, if deploying is wanted. Enter a project-name or confirm the default one.

6. Confirm the installation when the correct folder is prompted. The setup utility then will write all necessary files.

Then, you're done! The app can now be locally run with ``dev_appserver.py .`` from the terminal (Linux, Mac OS) or from the *Google App Engine Launcher* (Windows, Mac OS). By default, the app runs on port 8080 (`<http://localhost:8080>`_), or with the port provided by the *Google App Engine Launcher*.

Below is an example for a few commands on a Linux terminal to setup a clean ViUR project from scratch:

::

	mkdir hello-viur                                                       # Setup project folder
	cd hello-viur                                                          # Change into this folder
	wget -qO server.tar.gz http://viur.is/package/download/server/latest   # Download latest server
	tar xfz server.tar.gz                                                  # Unpack the server
	rm server.tar.gz                                                       # Remove server package
	python server/setup.py                                                 # Run ViUR setup tool
	dev_appserver.py .                                                     # Start Google App Engine


When you see a friendly "Hello World" welcoming you in your browser, your app is running!

Installing the Vi interface
---------------------------

To access the system's backend, we recommend to use the Vi. Vi stands for Visual Interface, and is a HTML5 web-app that allows to administrate and manage information in a ViUR application.

Download the Vi in its latest tarball from `<http://viur.is/package/download/vi/latest>`_ or as zipfile from `<http://viur.is/package/download/vi/latest/zip>`_.

Then, unpack it into your project folder right on the same level as the ``server`` package previously extracted.

On a Linux terminal again, this is simply done with

::

	wget -qO vi.tar.gz http://viur.is/package/download/vi/latest
	tar xfz vi.tar.gz
	rm vi.tar.gz

After that, the Vi can be access at `<http://localhost:8080/vi>`_, or under your particular port.

Logging into the new system
---------------------------

On the first startup, ViUR creates an new admin-user named ``admin@<your-app-id>.appspot.com`` with a random password within the database. This password is printed to the server debug console, where you have to copy it out.

Watch out for a line like this:
::

	ViUR created a new admin-user for you! Username: admin@myapp.appspot.com, Password: SU7juUIb1F2aZ

When the system is started in the cloud for the first time, an e-mail with this password is sent to all application administrators.

Alternatively, you can login with a simulated Google user. Both login forms are provided by the default server and can be done using the Vi.


Setting up the demo project
===========================

Todo
