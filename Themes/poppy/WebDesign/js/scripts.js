// Initialize lightbox on link click

$('.gallery2').on('click', 'a', function(e) {
    e.preventDefault();
    Lightbox.init($(this));
});