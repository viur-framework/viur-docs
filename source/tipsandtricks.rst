Tips and Tricks
===============

Custom error handlers
---------------------

By default, ViUR provides a generic error template that is located in ``server/template/error.html`` and is purposely **not** a template expressed in the Jinja template engine to reduce the possibility of running into errors during the template generation. This ViUR-server build-in template cannot be directly overridden, but a custom error handler can be expressed.

The error handler can be located into the project's main entry. An example for a custom error handler that also prints a traceback in case when running in a development system is shown below:

.. code-block:: python

	from renders.jinja2.default import Render
	from server import utils, request, errors
	import traceback
	from StringIO import StringIO

	def errorHandler(e):
		render = Render()

		descr = u"Unfortunatelly, and unexpected error occured."
		tbstr = None
		code = "500"
		name = "Internal Server Error"

		if isinstance(e, errors.HTTPException):
			code = utils.escapeString(str(e.status), maxLength=0)
			name = utils.escapeString(e.name, maxLength=0)

		#Were running on development Server
		if request.current.get().isDevServer:
			strIO = StringIO()
			traceback.print_exc(file=strIO)
			tbstr = utils.escapeString(strIO.getvalue().replace("\n","--br--"),
										maxLength=0).replace(" ", "&nbsp;").replace("--br--", "<br />")

		return render.view({"name": name,
							"code": code,
							"descr": descr,
							"traceback": tbstr},
							tpl="error")

	# Assign the error handler
	conf["viur.errorHandler"] = errorHandler

