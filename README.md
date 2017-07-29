[![Build Status](https://travis-ci.org/ajwann/highlightjs-turbolinks.svg?branch=master)](https://travis-ci.org/ajwann/highlightjs-turbolinks)

# Highlight.js for Turbolinks 5

This is a [Turbolinks 5](https://github.com/turbolinks/turbolinks) compatible fork of [Highlight.js](https://github.com/isagalaev/highlight.js), and is up to date with v9.12.0.

To make Highlight.js compatible with Turbolinks 5, two event
listeners have been added to ```initHighlightingOnLoad```, which
listen for the ```turbolinks:load``` and ```turbolinks:render``` events.

The original event listeners used by ```initHighlightingOnLoad```
have been left in place. They listen for the ```DOMContentLoaded```
and ```load``` events. This allows ```highlight-js-turbolinks```
to be compatible with applications that use turbolinks,
and also compatable with applications that do not. Therefore
if you ever choose to disable or remove turbolinks from
your application, you may continue to use ```highlightjs-turbolinks```.

## Installing with Yarn and Rails

### For Rails 5

Coming soon!

### For Rails 5.1 and up

From your Rails root, run
```
yarn add highlightjs-turbolinks
```
Then add the following line to ```app/assets/javascripts/application.js```
```
//= require highlightjs-turbolinks/lib/highlightjs-turbolinks.js
```
Then add the following line to ```app/assets/stylesheets/application.css```
```
*= require highlightjs-turbolinks/styles/default.css
```

## License

Highlightjs-turbolinks is released under the BSD License. See [LICENSE][7] file
for details.

## Links

The official site for the original library is at <https://highlightjs.org/>.

Further in-depth documentation for the API and other topics is at
<http://highlightjs.readthedocs.io/>.

Authors and contributors are listed in the [AUTHORS.en.txt][8] file.

[1]: http://highlightjs.readthedocs.io/en/latest/api.html#inithighlightingonload
[2]: http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
[3]: http://highlightjs.readthedocs.io/en/latest/api.html#highlightblock-block
[4]: http://highlightjs.readthedocs.io/en/latest/api.html#configure-options
[5]: https://highlightjs.org/download/
[6]: http://highlightjs.readthedocs.io/en/latest/building-testing.html
[7]: https://github.com/isagalaev/highlight.js/blob/master/LICENSE
[8]: https://github.com/isagalaev/highlight.js/blob/master/AUTHORS.en.txt
