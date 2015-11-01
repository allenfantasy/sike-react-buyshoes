.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/app.css --output bundle/app.css

.PHONY: js
js:
	webpack -d --watch js/app.jsx build/app.js --module-bind "jsx=babel" --module-bind "js=babel" --progress 

.PHONY: minjs
minjs:
	webpack -p js/app.jsx build/app.js --module-bind "jsx=babel" --module-bind "js=babel" --progress 

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
