(function ($) {

    $.fn.metrofly = function (options) {

        var settings = $.extend({
            // Specify Direction {top, bottom}
            position: "bottom",
            // Specify Speed of Sliding {Default 500 ms}
            speed: 120,
            // Specify Colour {Default #00ACEE}
            color: '#00ACEE',
            // Specify Text {Default Hello World}
            text: "Hello, World!",
            // Specify Text Color {Default #FFF}
            textColor: '#FFF',
            // Specify Border thickness {Default 2px}
            borderThickness: 2,
            // If enabled, random colours will be assigned.
            isRandomEnabled: false
        }, options);

        return this.each(function () {

            var Random = ["#D89A09", "#00A8AB", "#1D9625", "#6B1CB6", "#BD0251", "#B21E1E"];
            var _root = $(this);
            var _child = _root.find('img');
            var _span = $('<span />');
            var _border = $('<span />');
            var _color = null;

            var child = {
                height: _child.height(),
                width: _child.width(),
                URL: _child.attr('src'),
                getColor: function () {
                    if (!Boolean(settings.isRandomEnabled)) {
                        return settings.color;
                    }
                    else {
                        if (_color === null) {
                            var index = Math.floor((Math.random() * Random.length));
                            _color = Random[index];
                            return _color;
                        }
                        else {
                            return _color;
                        }
                    }
                }
            };
            var span = {
                text: settings.text,
                css: {
                    'position': 'relative',
                    'display': 'block',
                    'padding': '4px',
                    'background-color': child.getColor(),
                    'width': '100%',
                    'text-align': 'left',
                    'color': settings.textColor
                },
                initHeight: function () {
                    switch (settings.position) {

                        case "top":
                            return -(_span.height() + 8);
                        case "bottom":
                            return (child.height);
                    }
                },
                finalHeight: function () {
                    switch (settings.position) {

                        case "top":
                            return 0;
                        case "bottom":
                            return (child.height - (_span.height() + 8));
                    }
                }
            }

            _root.css({
                'display': 'inline-block',
                'background-image': 'url(' + child.URL + ')',
                'height': child.height,
                'width': child.width,
                'cursor': 'pointer',
                'overflow': 'hidden'
            });

            _border.css({
                'diplay': 'block',
                'height': child.height - (2 * settings.borderThickness),
                'width': child.width - (2 * settings.borderThickness),
                'border': settings.borderThickness + 'px solid' + child.getColor(),
                'position': 'absolute',
                'margin-left': -(child.width / 2)
            });


            if (_root.data('text') === undefined) { _span.text(settings.text); }
            else { _span.text(_root.data('text')); }

            _span.css(span.css);


            _root.bind({
                mouseenter: function (e) {
                    if ($(_child).is(":visible")) {
                        if (_root.height() !== 0) { _child.hide(); }
                        else { _root.height(_child.height()); _root.width(_child.width()); }
                    }
                    _border.appendTo(_root);
                    _span.appendTo(_root);
                    _span.css('top', span.initHeight());
                    _span.animate({ 'top': span.finalHeight() }, settings.speed);
                },
                mouseleave: function (e) {
                    _border.remove();
                    _span.animate({ 'top': span.initHeight() }, settings.speed);
                }
            });

        });
    };
}(jQuery));