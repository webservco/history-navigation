# history-navigation

A jQuery plugin providing dynamic page navigation using the JavaScript History API

npm package: [@webservco/history-navigation](https://www.npmjs.com/package/@webservco/history-navigation)

---

## Features:
- Dynamic page navigation (JavaScript "history" navigation): local pages are loaded dynamically;
- Highlight active page in the navigation menu;

---

## Usage

### Install
```
npm install @webservco/history-navigation --save-dev
```

### Include the script tag in your project (after jQuery)
```
<script defer src="./../node_modules/@webservco/history-navigation/src/jquery.history-navigation.js"></script>
```

> Alternatively you could download the plugin for the project's `src` directory.

### Initialize the plugin

> Settings presented are the default ones

```JavaScript
    /* history navigation */
    $(document).historyNavigation({
        linkClass: "app-nav", // class of the links which trigger the navigation
        mainElementId: "main", // id of content wrapper element
        contentElementId: "content", // id of content element
        navigationElementClass: "navbar", // class of the element containing the navigation links
        onLinkClick: function( element ) { // callback
            //console.log("callback: onLinkClick");
        },
        onUrlLoaded: function( newUrl ) { // callback
            //console.log("callback: onUrlLoaded");
        },
        onUrlLoadError: function( newUrl, resultObject ) {
            //console.log("callback: onUrlLoadError");
            /* set custom content on error */
            $("#content").html(
                "<div class=\"alert alert-danger\" role=\"alert\"><h1>Error loading page</h1>" +
                "Status: " + resultObject.status + " " + resultObject.statusText +
                "</div>"
            );
        },
        onPopState: function( event ) { // callback
            //console.log("callback: onPopstate");
        },
    });
```

### Documentation and examples
For documentation and a full HTML implementation example please see the project [webservco/html5-app](https://github.com/webservco/html5-app)

---

## Development Setup

### Install
```
git clone https://github.com/webservco/history-navigation.git my-project
cd my-project
npm install
```

### Build the project
Clean everything and create production files in the `dist` folder:
```
npm run build
```

### Cleanup
```
npm run clean
```

---

## Notes

Initially the plugin was using the jQuery `.load()` functionality.
It has been however removed, because it doesn't load any scripts.
> http://api.jquery.com/load/
>
> "jQuery uses the browser's .innerHTML property to parse the retrieved document and insert it into the current document. During this process, browsers often filter elements from the document such as html, title, or head elements. As a result, the elements retrieved by .load() may not be exactly the same as if the document were retrieved directly by the browser."
>
> "If .load() is called with a selector expression appended to the URL, however, the scripts are stripped out prior to the DOM being updated, and thus are not executed."

---
