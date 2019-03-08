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
        onUrlLoaded: function( newUrl ) {}, // callback
        onUrlLoadError: function( newUrl, resultObject ) {}, // callback
        onPopState: function( event ) {} // callback
    };

    $.fn.historyNavigation.handleUrlLoad = function(newUrl, resultObject, resultStatus) {

        var opts = $.data(document, 'historyNavigation');
        var navItem = $("." + opts.navigationElementClass).find(".nav-item");

        navItem.removeClass("active");
        var a = navItem.find("a." + opts.linkClass + "[href=\""+newUrl+"\"]");
        a.closest(".nav-item").addClass("active");

        if (resultStatus == "error") {
            if (typeof opts.onUrlLoadError === 'function') {
                opts.onUrlLoadError(newUrl, resultObject); // callback
            }
        } else {
            if (typeof opts.onUrlLoaded === 'function') {
                opts.onUrlLoaded(newUrl); // callback
            }
        }
    };

    $.fn.historyNavigation.loadUrl = function(url, mainElementId, contentElementId) {
        var opts = $.data(document, 'historyNavigation');
        var mainElement = $("#" + mainElementId);
        var contentElement = $("#" + contentElementId);

        contentElement.fadeOut(200, function() { // hide contentElement, then:

            mainElement.hide(); //hide main element

            var newUrl;
            var resultObject;
            var resultStatus;

            var jqxhr = $.ajax({
                method: "GET",
                url: url,
                data: {},
                contentType: "application/x-www-form-urlencoded; charset=UTF-8'", // default
                error: function(jqXHR, textStatus, errorThrown){
                    newUrl = url;
                    resultObject = jqXHR;
                    resultStatus = textStatus;

                    /* if content element has the custom url data attribute */
                    if (contentElement.is('[data-url]')) {
                        contentElement.attr("data-url", newUrl); // set new url
                    }
                    contentElement.html("") // empty
                    .show(); // display
                },
                success: function(data, textStatus, jqXHR){
                    var content = $(data).find("#" + contentElementId);
                    mainElement.empty();
                    mainElement.append(content);
                    /*
                    Simulate "follow redirects".
                    Check if the loaded content has a data-url attribute. If so, use it as the new url.
                    Otherwise the new url is the one actually being loaded */
                    newUrl = content.data("url") || url;
                    /* If the new url (from custom data) is different than the one we have loaded */
                    if (newUrl != url) {
                        /* make sure the new url appears in the browser url bar */
                        window.history.pushState(null, null, newUrl);
                    }
                    resultObject = jqXHR;
                    resultStatus = textStatus;
                }
            })
            .done(function(){})
            .fail(function(){})
            .always(function(){
                mainElement.fadeIn(200, function() {
                    $.fn.historyNavigation.handleUrlLoad(newUrl, resultObject, resultStatus);
                });
            });
        });
    };

    // Check if the History API is supported in the browser.
    $.fn.historyNavigation.supportsHistory = function() {
        return !!(window.history && window.history.pushState);
    };
}( jQuery ));
