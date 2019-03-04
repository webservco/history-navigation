(function( $ ) {

    // Plugin definition.
    $.fn.historyNavigation = function( options ) {
        // Extend our default options with those provided.
        // Note that the first argument to extend is an empty
        // object – this is to keep from overriding our "defaults" object.
        var opts = $.extend( {}, $.fn.historyNavigation.defaults, options );
        $.data(document, 'historyNavigation', opts);

        if (!$.fn.historyNavigation.supportsHistory()) {
            return false
        }

        $(window).bind("popstate", function( event ) {
            $.fn.historyNavigation.loadUrl(
                event.target.location.href,
                opts.mainElementId,
                opts.contentElementId
            );

            if (typeof opts.onPopState === 'function') {
                opts.onPopState(event); // callback
            }
        });

        // use document so the plugin works also on dynamically added elements
        $(document).on("click", "a." + opts.linkClass, function( e ) {
            e.preventDefault();
            var url = $(this).attr("href");
            if (url != "#") {
                window.history.pushState(null, null, url);
                $.fn.historyNavigation.loadUrl(url, opts.mainElementId, opts.contentElementId);
            }
            if (typeof opts.onLinkClick === 'function') {
                opts.onLinkClick(this); // callback
            }
        });

        return this;
    };

    // Plugin defaults
    $.fn.historyNavigation.defaults = {
        linkClass: "app-nav", // class of the links which trigger the navigation
        mainElementId: "main", // id of content wrapper element
        contentElementId: "content", // id of content element
        navigationElementClass: "navbar", // class of the element containing the navigation links
        onLinkClick: function( element ) {}, // callback
        onUrlLoaded: function( element ) {}, // callback
        onPopState: function( event ) {} // callback
    };

    $.fn.historyNavigation.handleUrlLoad = function(status, contentElement, url) {
        var opts = $.data(document, 'historyNavigation');
        if (status == "error") {
            contentElement
            .html("<div class=\"alert alert-danger\" role=\"alert\">Error loading page</div>")
            .show();
        }
        var navItem = $("." + opts.navigationElementClass).find(".nav-item");
        navItem.removeClass("active");
        var a = navItem.find("a." + opts.linkClass + "[href=\""+url+"\"]");
        a.closest(".nav-item").addClass("active");
        if (typeof opts.onUrlLoaded === 'function') {
            opts.onUrlLoaded(contentElement); // callback
        }
    };

    $.fn.historyNavigation.loadUrl = function(url, mainElementId, contentElementId) {
        var mainElement = $("#" + mainElementId);
        var contentElement = $("#" + contentElementId);
        contentElement.fadeOut(200, function() {
            mainElement
            .hide()
            .load(url + " #" + contentElementId, function(response, status, xhr) {
                var newUrl = $("#" + contentElementId).data("url") || url; // check custom url data attribute
                if (newUrl != url) { // is a redirect
                    window.history.pushState(null, null, newUrl); // make sure the current url appears in the browser url bar
                }
                mainElement.fadeIn(200, function() {
                    $.fn.historyNavigation.handleUrlLoad(status, contentElement, newUrl);
                });
            });
        });
    };

    // Check if the History API is supported in the browser.
    $.fn.historyNavigation.supportsHistory = function() {
        return !!(window.history && window.history.pushState);
    };
}( jQuery ));
