# Convert QRify into a minified JavaScript bookmarklet
# Requires yui-compressor

qrify.url: qrify-min.js
	./bookmarklet.py qrify-min.js > qrify.url

qrify-min.js: qrify.js
	yui-compressor qrify.js > qrify-min.js

.PHONY: clean
clean:
	-rm qrify-min.js qrify.url

