---------
Changelog
---------


Version 2.0.0
-------------


New:
 - Unified user module supporting different authentification methods
 - Added spatialBone
 - Added randomSliceBone
 - Added credentialBone
 - Support for various security related http-headers


Important changes:
   - Renamed "id" to "key" to prevent shadowing of id()
   - Renamed "jinja2" to "html"
   - Completely revised skeleton/bone API (with huge performance optimization)
   - Removed unused and unmaintained default modules (forum, geo)
   - Removed unused and unmaintained renders (pdf, rss)
   - extendedRelationalBone merged into relationalBone
   - Sortable entries for multiple relationalBone entries
   - relationalBone now holds a ref/rel-Skel structure in it's value instead of raw db values



Version 1.1.0
-------------

New:
 - Added extendedRelationalBone
 - Added cc, bcc and replyTo to sendMail()
 - Added support for translatable string/textBones

Important fixes:
 - fileBone not adding a lock if multiple=True
 - relationalBone removed sort-orders from query
 - numericBone did not enforce min/max if precision is set
 - processing of requests that arrived unencrypted despite forceSSL being set



Version 1.0.0
-------------

Initial public release

