var Lightbox = (function() {

    // Component variables
    var isDimCreated = false;
    var $currentEl; // Current element (link with the image)
    var $lightbox = $('<div class="lightbox">'); // Create box to dim everything
    var $controls = $('<div class="lightbox-controls">'); // Controls container

    // Show previous/next image
    var _move = function(isLeft) {

        // Get previous/next element
        var $next = isLeft ? $currentEl.prev() : $currentEl.next();

        // When there is nothing more, get first (or last) element
        if ($next.length === 0) {
            var $allElements = $currentEl.parent().find('a');
            $next = isLeft ? $allElements.last() : $allElements.first();
        }

        // Add loading icon
        $lightbox.css({
            backgroundImage: 'url(img/loading.gif)'
        });

        // Get current image
        $lightbox.find('img').fadeOut(function() {

            // Change image src
            $(this).attr('src', $next.attr('href')).on('load', function() {

                // Remove loading icon
                $lightbox.css({
                    backgroundImage: 'none'
                });

                // Show image
                $(this).fadeIn();
            });
        });

        // Set new element as current
        $currentEl = $next;

    };

    // Remove lightbox
    var _remove = function(e) {
        if (!e || (e && e.target === this)) {
            isDimCreated = false;
            $lightbox.fadeOut(function() {
                $controls.empty().remove();
                $lightbox.empty().remove();
            });
        }
    };

    // Create screen with the image
    var _createLightbox = function(imgSrc) {
        var $img = $('<img src="' + imgSrc + '" alt="" class="lightbox-image" />');
        $lightbox.append($img);
        $lightbox.appendTo($('body'));
        $lightbox.fadeIn();
        $lightbox.on('click', _remove);
    };

    // Create control button
    var _createBtn = function(name, value, action) {
        var $btn = $('<button type="button" title="' + name + '">' + value + '</button>');
        $btn.appendTo($controls);
        $btn.on('click', action);
    };

    // Create controls
    var _createControls = function() {
        _createBtn('Previous', '&lt;', function() {
            _move(true);
        });
        _createBtn('Next', '&gt;', function() {
            _move();
        });
        _createBtn('Close', '&times;', _remove);
        $lightbox.append($controls);
    };

    // Initialize lightbox
    var init = function($el) {
        if (!isDimCreated) {
            $currentEl = $el;

            _createLightbox($el.attr('href'));
            _createControls();

            isDimCreated = true;
        }
    };

    // Return public object
    return {
        init: init
    };

})();