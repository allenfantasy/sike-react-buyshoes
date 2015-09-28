.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/app.css --output bundle/app.css

.PHONY: server
server:
	browser-sync start --server --files='index.html,bundle/app.css,js/app.js'

.PHONY: push
push:
	git push origin master && git push origin master:gh-pages

.PHONY: clean
clean:
	rm -r bundle
