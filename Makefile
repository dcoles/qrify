# Convert QRify into a minified JavaScript bookmarklet
# Requires jsmin

qrify-min.js: qrify.js
	jsmin < qrify.js | ./bookmarklet.py > qrify-min.js
