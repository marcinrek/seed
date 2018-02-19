/* 
 * {{module_name}}
 * @author {{author}}
 * @version {{version}}
 *
 * @param {TYPE} NAME - DESCRIPTION
 * @returns {TYPE} - DESCRIPTION
 */

var {{module_name}} = (function() {

    // This is private
    var private_var = {
        flag: true
    };

    // This is public
    var {{module_name}}_public = {
        public_method: function() {
            console.log(`This is public but has access to private ${private_var.flag}`);
        },

        another_public_method: function() {
            console.log(`This is totally different ... ${!private_var.flag}`);
        }
    };

    return {{module_name}}_public;
})();

// jQuery plugin
/*
(function ( $ ) {

    $.fn.{{module_name}} = function(options) {

        // Default options - returned as settings {object}
        var settings = $.extend({
            // These are the defaults.
            backgroundColor: '#000',
            textColor:       '#fff'
        }, options );

        // Action based on the settings {object} returning this for chaining
        return this.css({
            'background-color': settings.backgroundColor,
            'color':            settings.textColor
        });

   };


}( jQuery ));
*/
