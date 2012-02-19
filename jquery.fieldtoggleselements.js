/*!
 * Field Toggles Elements
 * https://github.com/sorich87/field-toggles-elements
 *
 * Copyright 2012, Ulrich Sossou (https://github.com/sorich87)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function( $ ) {

  var isMatch = function( val, values ) {
    if ( values ) {
      match = $.inArray( val, values ) > -1;
    // if no values, just check for existence of user entered input
    } else {
      match = $.trim( val ).length > 0;
    }

    return match;
  };

  var toggleElements = function( field, condition, settings ) {
    var match = false,
      val = field.val();

    if ( $.isArray( val ) ) {
      $.each( val, function( i, val ) {
        match = isMatch( val, condition.values );

        if ( match ) {
          return;
        }
      });
    } else {
      match = isMatch( val, condition.values );
    }

    if ( match ) {
      $( condition.forTrue ).each( settings.showFunction );
      $( condition.forFalse ).each( settings.hideFunction );
    } else {
      $( condition.forTrue ).each( settings.hideFunction );
      $( condition.forFalse ).each( settings.showFunction );
    }
  };

  $.fn.fieldTogglesElements = function( options ) {
    var settings, event,
      field = this,
      textFields = ["text", "password", "textarea"];

    // do nothing if no options
    if ( ! options ) {
      return this;
    }

    // if the option is the condition, properly reassign it
    if ( options.conditions === undefined ) {
      options = {
        "conditions" : options
      };
    }

    // set events to bind depending on field type
    if ( $.inArray( field.prop("type"), textFields ) > -1 ) {
      event = 'keyup';
    } else {
      event = 'change';
    }

    // options
    settings = $.extend( {
      "conditions"   : [],
      "showFunction" : function() {
        $(this).show("slow");
      },
      "hideFunction" : function () {
        $(this).hide("slow");
      },
      "event" : event
    }, options);

    // do nothing if no conditions
    if ( ! settings.conditions ) {
      return this;
    }

    // conditions should be an array
    if ( settings.conditions && !$.isArray( settings.conditions ) ) {
      settings.conditions = [settings.conditions];
    }

    $.each( settings.conditions, function(i, condition) {
      // values should be an array
      if ( condition.values && !$.isArray( condition.values ) ) {
        condition.values = [condition.values];
      }

      field.bind( settings.event + ".fieldTogglesElements", function() {
        toggleElements( field, condition, settings );
      });
    });

    return this;
  };

})( jQuery );
