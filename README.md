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
```
$(document).ready(function() {
    /* history navigation */
    $(document).historyNavigation({
        linkClass: "app-nav", // class of the links which trigger the navigation
        mainElementId: "main", // id of content wrapper element
        contentElementId: "content", // id of content element
        navigationElementClass: "navbar", // class of the element containing the navigation links
        onLinkClick: function( element ) { // callback
            //console.log("callback: onLinkClick");
        },
        onUrlLoaded: function() { // callback
            //console.log("callback: onUrlLoaded");
        },
        onPopState: function( event ) { // callback
            //console.log("callback: onPopstate");
        },
    });
});
```

### Examples
For an example of a full HTML implementation please see the project [webservco/html5-app](https://github.com/webservco/html5-app)


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
