.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/app.css --output bundle/app.css

.PHONY: js
js:
	babel --watch js/app.jsx --out-file build/app.js

.PHONY: server
server:
	browser-sync start --server --files='index.html,bundle/app.css,js/app.js,build/app.js'

.PHONY: all
all:
	(make css & make js & make server & wait)

.PHONY: push
push:
	git push origin master && git push origin master:gh-pages

.PHONY: clean
clean:
	rm -r bundle
