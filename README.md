# @webservco/history-navigation

A jQuery plugin.

Loads local pages with Ajax and the History API instead of full page reloads, and highlights the active link in the navigation menu.

- Requires: jQuery 3
- Related: [webservco/html5-app](https://github.com/webservco/html5-app) (a full HTML example using it)

---

## Installation

```shell
npm install @webservco/history-navigation
```

Include it after jQuery:

```html
<script defer src="node_modules/@webservco/history-navigation/src/jquery.history-navigation.js"></script>
```

---

## Usage

Each page wraps its content in two elements. When a link with the `app-nav` class is clicked, the plugin fetches the page, takes its `#content` element, and puts it in `#main` of the current page.

```html
<nav class="navbar">
    <ul>
        <li class="nav-item"><a class="app-nav" href="/about">About</a></li>
    </ul>
</nav>
<main id="main">
    <div id="content">...</div>
</main>
```

```javascript
// These are the default options.
$(document).historyNavigation({
    // Class of the links that load pages.
    linkClass: 'app-nav',
    // ID of the element that receives the content.
    mainElementId: 'main',
    // ID of the element to take from the loaded page.
    contentElementId: 'content',
    // Class of the element holding the .nav-item links.
    navigationElementClass: 'navbar',
    onLinkClick: function (element) {},
    onUrlLoaded: function (newUrl) {},
    onUrlLoadError: function (newUrl, jqXHR) {
        $('#content').html('Error loading page: ' + jqXHR.status + ' ' + jqXHR.statusText);
    },
    onPopState: function (event) {}
});
```

After each load, the `.nav-item` holding the link to the new URL gets the `active` class. The back and forward buttons load pages the same way.

---

## Notes

If the loaded `#content` element has a `data-url` attribute, that URL replaces the requested one in the address bar. Use it to simulate a redirect.

The plugin doesn't use jQuery's [`.load()`](https://api.jquery.com/load/), because `.load()` with a selector strips the scripts from the loaded content. The page title and meta description aren't updated after a load.

The published npm package ships only `src/`, so `main` in `package.json` points to a file that isn't there. Include the `src` file directly.

Links with `href="#"` don't load anything, but still call `onLinkClick`. In browsers without the History API the plugin does nothing and links work normally.

### TODO

Update the page title and meta description after a load. This attempt didn't work:

```javascript
var title = $(data).find("title").text();
var description = $(data).find('meta[name=description]').attr("content");
console.log(title);
console.log(description);
```

---

## Development

```shell
# Install dependencies.
npm install
# Create the minified file in dist/.
npm run build
# Delete dist/ and the build cache.
npm run clean
```

---

## License

[MIT](LICENSE)
