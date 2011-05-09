# Convert QRify into a minified JavaScript bookmarklet
# Requires yui-compressor

qrify-min.js: qrify.js
	yui-compressor qrify.js | ./bookmarklet.py > qrify-min.js
