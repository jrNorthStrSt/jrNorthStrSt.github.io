/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));





/*
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());


/*!
 * jQuery Migrate - v1.2.1 - 2013-05-08
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function( jQuery, window, undefined ) {
// See http://bugs.jquery.com/ticket/13335
// "use strict";


var warnedAbout = {};

// List of warnings already given; public read only
jQuery.migrateWarnings = [];

// Set to true to prevent console output; migrateWarnings still maintained
jQuery.migrateMute = true;

// Show a message on the console so devs know we're active
if ( !jQuery.migrateMute && window.console && window.console.log ) {
    window.console.log("JQMIGRATE: Logging is active");
}

// Set to false to disable traces that appear with warnings
if ( jQuery.migrateTrace === undefined ) {
    jQuery.migrateTrace = true;
}

// Forget any warnings we've already given; public
jQuery.migrateReset = function() {
    warnedAbout = {};
    jQuery.migrateWarnings.length = 0;
};

function migrateWarn( msg) {
    var console = window.console;
    if ( !warnedAbout[ msg ] ) {
        warnedAbout[ msg ] = true;
        jQuery.migrateWarnings.push( msg );
        if ( console && console.warn && !jQuery.migrateMute ) {
            console.warn( "JQMIGRATE: " + msg );
            if ( jQuery.migrateTrace && console.trace ) {
                console.trace();
            }
        }
    }
}

function migrateWarnProp( obj, prop, value, msg ) {
    if ( Object.defineProperty ) {
        // On ES5 browsers (non-oldIE), warn if the code tries to get prop;
        // allow property to be overwritten in case some other plugin wants it
        try {
            Object.defineProperty( obj, prop, {
                configurable: true,
                enumerable: true,
                get: function() {
                    migrateWarn( msg );
                    return value;
                },
                set: function( newValue ) {
                    migrateWarn( msg );
                    value = newValue;
                }
            });
            return;
        } catch( err ) {
            // IE8 is a dope about Object.defineProperty, can't warn there
        }
    }

    // Non-ES5 (or broken) browser; just set the property
    jQuery._definePropertyBroken = true;
    obj[ prop ] = value;
}

if ( document.compatMode === "BackCompat" ) {
    // jQuery has never supported or tested Quirks Mode
    migrateWarn( "jQuery is not compatible with Quirks Mode" );
}


var attrFn = jQuery( "<input/>", { size: 1 } ).attr("size") && jQuery.attrFn,
    oldAttr = jQuery.attr,
    valueAttrGet = jQuery.attrHooks.value && jQuery.attrHooks.value.get ||
        function() { return null; },
    valueAttrSet = jQuery.attrHooks.value && jQuery.attrHooks.value.set ||
        function() { return undefined; },
    rnoType = /^(?:input|button)$/i,
    rnoAttrNodeType = /^[238]$/,
    rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    ruseDefault = /^(?:checked|selected)$/i;

// jQuery.attrFn
migrateWarnProp( jQuery, "attrFn", attrFn || {}, "jQuery.attrFn is deprecated" );

jQuery.attr = function( elem, name, value, pass ) {
    var lowerName = name.toLowerCase(),
        nType = elem && elem.nodeType;

    if ( pass ) {
        // Since pass is used internally, we only warn for new jQuery
        // versions where there isn't a pass arg in the formal params
        if ( oldAttr.length < 4 ) {
            migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");
        }
        if ( elem && !rnoAttrNodeType.test( nType ) &&
            (attrFn ? name in attrFn : jQuery.isFunction(jQuery.fn[name])) ) {
            return jQuery( elem )[ name ]( value );
        }
    }

    // Warn if user tries to set `type`, since it breaks on IE 6/7/8; by checking
    // for disconnected elements we don't warn on $( "<button>", { type: "button" } ).
    if ( name === "type" && value !== undefined && rnoType.test( elem.nodeName ) && elem.parentNode ) {
        migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8");
    }

    // Restore boolHook for boolean property/attribute synchronization
    if ( !jQuery.attrHooks[ lowerName ] && rboolean.test( lowerName ) ) {
        jQuery.attrHooks[ lowerName ] = {
            get: function( elem, name ) {
                // Align boolean attributes with corresponding properties
                // Fall back to attribute presence where some booleans are not supported
                var attrNode,
                    property = jQuery.prop( elem, name );
                return property === true || typeof property !== "boolean" &&
                    ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?

                    name.toLowerCase() :
                    undefined;
            },
            set: function( elem, value, name ) {
                var propName;
                if ( value === false ) {
                    // Remove boolean attributes when set to false
                    jQuery.removeAttr( elem, name );
                } else {
                    // value is true since we know at this point it's type boolean and not false
                    // Set boolean attributes to the same name and set the DOM property
                    propName = jQuery.propFix[ name ] || name;
                    if ( propName in elem ) {
                        // Only set the IDL specifically if it already exists on the element
                        elem[ propName ] = true;
                    }

                    elem.setAttribute( name, name.toLowerCase() );
                }
                return name;
            }
        };

        // Warn only for attributes that can remain distinct from their properties post-1.9
        if ( ruseDefault.test( lowerName ) ) {
            migrateWarn( "jQuery.fn.attr('" + lowerName + "') may use property instead of attribute" );
        }
    }

    return oldAttr.call( jQuery, elem, name, value );
};

// attrHooks: value
jQuery.attrHooks.value = {
    get: function( elem, name ) {
        var nodeName = ( elem.nodeName || "" ).toLowerCase();
        if ( nodeName === "button" ) {
            return valueAttrGet.apply( this, arguments );
        }
        if ( nodeName !== "input" && nodeName !== "option" ) {
            migrateWarn("jQuery.fn.attr('value') no longer gets properties");
        }
        return name in elem ?
            elem.value :
            null;
    },
    set: function( elem, value ) {
        var nodeName = ( elem.nodeName || "" ).toLowerCase();
        if ( nodeName === "button" ) {
            return valueAttrSet.apply( this, arguments );
        }
        if ( nodeName !== "input" && nodeName !== "option" ) {
            migrateWarn("jQuery.fn.attr('value', val) no longer sets properties");
        }
        // Does not return so that setAttribute is also used
        elem.value = value;
    }
};


var matched, browser,
    oldInit = jQuery.fn.init,
    oldParseJSON = jQuery.parseJSON,
    // Note: XSS check is done below after string is trimmed
    rquickExpr = /^([^<]*)(<[\w\W]+>)([^>]*)$/;

// $(html) "looks like html" rule change
jQuery.fn.init = function( selector, context, rootjQuery ) {
    var match;

    if ( selector && typeof selector === "string" && !jQuery.isPlainObject( context ) &&
            (match = rquickExpr.exec( jQuery.trim( selector ) )) && match[ 0 ] ) {
        // This is an HTML string according to the "old" rules; is it still?
        if ( selector.charAt( 0 ) !== "<" ) {
            migrateWarn("$(html) HTML strings must start with '<' character");
        }
        if ( match[ 3 ] ) {
            migrateWarn("$(html) HTML text after last tag is ignored");
        }
        // Consistently reject any HTML-like string starting with a hash (#9521)
        // Note that this may break jQuery 1.6.x code that otherwise would work.
        if ( match[ 0 ].charAt( 0 ) === "#" ) {
            migrateWarn("HTML string cannot start with a '#' character");
            jQuery.error("JQMIGRATE: Invalid selector string (XSS)");
        }
        // Now process using loose rules; let pre-1.8 play too
        if ( context && context.context ) {
            // jQuery object as context; parseHTML expects a DOM object
            context = context.context;
        }
        if ( jQuery.parseHTML ) {
            return oldInit.call( this, jQuery.parseHTML( match[ 2 ], context, true ),
                    context, rootjQuery );
        }
    }
    return oldInit.apply( this, arguments );
};
jQuery.fn.init.prototype = jQuery.fn;

// Let $.parseJSON(falsy_value) return null
jQuery.parseJSON = function( json ) {
    if ( !json && json !== null ) {
        migrateWarn("jQuery.parseJSON requires a valid JSON string");
        return null;
    }
    return oldParseJSON.apply( this, arguments );
};

jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};

// Don't clobber any existing jQuery.browser in case it's different
if ( !jQuery.browser ) {
    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};

    if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
        browser.webkit = true;
    } else if ( browser.webkit ) {
        browser.safari = true;
    }

    jQuery.browser = browser;
}

// Warn if the code tries to get jQuery.browser
migrateWarnProp( jQuery, "browser", jQuery.browser, "jQuery.browser is deprecated" );

jQuery.sub = function() {
    function jQuerySub( selector, context ) {
        return new jQuerySub.fn.init( selector, context );
    }
    jQuery.extend( true, jQuerySub, this );
    jQuerySub.superclass = this;
    jQuerySub.fn = jQuerySub.prototype = this();
    jQuerySub.fn.constructor = jQuerySub;
    jQuerySub.sub = this.sub;
    jQuerySub.fn.init = function init( selector, context ) {
        if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
            context = jQuerySub( context );
        }

        return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
    };
    jQuerySub.fn.init.prototype = jQuerySub.fn;
    var rootjQuerySub = jQuerySub(document);
    migrateWarn( "jQuery.sub() is deprecated" );
    return jQuerySub;
};


// Ensure that $.ajax gets the new parseJSON defined in core.js
jQuery.ajaxSetup({
    converters: {
        "text json": jQuery.parseJSON
    }
});


var oldFnData = jQuery.fn.data;

jQuery.fn.data = function( name ) {
    var ret, evt,
        elem = this[0];

    // Handles 1.7 which has this behavior and 1.8 which doesn't
    if ( elem && name === "events" && arguments.length === 1 ) {
        ret = jQuery.data( elem, name );
        evt = jQuery._data( elem, name );
        if ( ( ret === undefined || ret === evt ) && evt !== undefined ) {
            migrateWarn("Use of jQuery.fn.data('events') is deprecated");
            return evt;
        }
    }
    return oldFnData.apply( this, arguments );
};


var rscriptType = /\/(java|ecma)script/i,
    oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack;

jQuery.fn.andSelf = function() {
    migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
    return oldSelf.apply( this, arguments );
};

// Since jQuery.clean is used internally on older versions, we only shim if it's missing
if ( !jQuery.clean ) {
    jQuery.clean = function( elems, context, fragment, scripts ) {
        // Set context per 1.8 logic
        context = context || document;
        context = !context.nodeType && context[0] || context;
        context = context.ownerDocument || context;

        migrateWarn("jQuery.clean() is deprecated");

        var i, elem, handleScript, jsTags,
            ret = [];

        jQuery.merge( ret, jQuery.buildFragment( elems, context ).childNodes );

        // Complex logic lifted directly from jQuery 1.8
        if ( fragment ) {
            // Special handling of each script element
            handleScript = function( elem ) {
                // Check if we consider it executable
                if ( !elem.type || rscriptType.test( elem.type ) ) {
                    // Detach the script and store it in the scripts array (if provided) or the fragment
                    // Return truthy to indicate that it has been handled
                    return scripts ?
                        scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
                        fragment.appendChild( elem );
                }
            };

            for ( i = 0; (elem = ret[i]) != null; i++ ) {
                // Check if we're done after handling an executable script
                if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
                    // Append to fragment and handle embedded scripts
                    fragment.appendChild( elem );
                    if ( typeof elem.getElementsByTagName !== "undefined" ) {
                        // handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
                        jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

                        // Splice the scripts into ret after their former ancestor and advance our index beyond them
                        ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
                        i += jsTags.length;
                    }
                }
            }
        }

        return ret;
    };
}

var eventAdd = jQuery.event.add,
    eventRemove = jQuery.event.remove,
    eventTrigger = jQuery.event.trigger,
    oldToggle = jQuery.fn.toggle,
    oldLive = jQuery.fn.live,
    oldDie = jQuery.fn.die,
    ajaxEvents = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
    rajaxEvent = new RegExp( "\\b(?:" + ajaxEvents + ")\\b" ),
    rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
    hoverHack = function( events ) {
        if ( typeof( events ) !== "string" || jQuery.event.special.hover ) {
            return events;
        }
        if ( rhoverHack.test( events ) ) {
            migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'");
        }
        return events && events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
    };

// Event props removed in 1.9, put them back if needed; no practical way to warn them
if ( jQuery.event.props && jQuery.event.props[ 0 ] !== "attrChange" ) {
    jQuery.event.props.unshift( "attrChange", "attrName", "relatedNode", "srcElement" );
}

// Undocumented jQuery.event.handle was "deprecated" in jQuery 1.7
if ( jQuery.event.dispatch ) {
    migrateWarnProp( jQuery.event, "handle", jQuery.event.dispatch, "jQuery.event.handle is undocumented and deprecated" );
}

// Support for 'hover' pseudo-event and ajax event warnings
jQuery.event.add = function( elem, types, handler, data, selector ){
    if ( elem !== document && rajaxEvent.test( types ) ) {
        migrateWarn( "AJAX events should be attached to document: " + types );
    }
    eventAdd.call( this, elem, hoverHack( types || "" ), handler, data, selector );
};
jQuery.event.remove = function( elem, types, handler, selector, mappedTypes ){
    eventRemove.call( this, elem, hoverHack( types ) || "", handler, selector, mappedTypes );
};

jQuery.fn.error = function() {
    var args = Array.prototype.slice.call( arguments, 0);
    migrateWarn("jQuery.fn.error() is deprecated");
    args.splice( 0, 0, "error" );
    if ( arguments.length ) {
        return this.bind.apply( this, args );
    }
    // error event should not bubble to window, although it does pre-1.7
    this.triggerHandler.apply( this, args );
    return this;
};

jQuery.fn.toggle = function( fn, fn2 ) {

    // Don't mess with animation or css toggles
    if ( !jQuery.isFunction( fn ) || !jQuery.isFunction( fn2 ) ) {
        return oldToggle.apply( this, arguments );
    }
    migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");

    // Save reference to arguments for access in closure
    var args = arguments,
        guid = fn.guid || jQuery.guid++,
        i = 0,
        toggler = function( event ) {
            // Figure out which function to execute
            var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
            jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

            // Make sure that clicks stop
            event.preventDefault();

            // and execute the function
            return args[ lastToggle ].apply( this, arguments ) || false;
        };

    // link all the functions, so any of them can unbind this click handler
    toggler.guid = guid;
    while ( i < args.length ) {
        args[ i++ ].guid = guid;
    }

    return this.click( toggler );
};

jQuery.fn.live = function( types, data, fn ) {
    migrateWarn("jQuery.fn.live() is deprecated");
    if ( oldLive ) {
        return oldLive.apply( this, arguments );
    }
    jQuery( this.context ).on( types, this.selector, data, fn );
    return this;
};

jQuery.fn.die = function( types, fn ) {
    migrateWarn("jQuery.fn.die() is deprecated");
    if ( oldDie ) {
        return oldDie.apply( this, arguments );
    }
    jQuery( this.context ).off( types, this.selector || "**", fn );
    return this;
};

// Turn global events into document-triggered events
jQuery.event.trigger = function( event, data, elem, onlyHandlers  ){
    if ( !elem && !rajaxEvent.test( event ) ) {
        migrateWarn( "Global events are undocumented and deprecated" );
    }
    return eventTrigger.call( this,  event, data, elem || document, onlyHandlers  );
};
jQuery.each( ajaxEvents.split("|"),
    function( _, name ) {
        jQuery.event.special[ name ] = {
            setup: function() {
                var elem = this;

                // The document needs no shimming; must be !== for oldIE
                if ( elem !== document ) {
                    jQuery.event.add( document, name + "." + jQuery.guid, function() {
                        jQuery.event.trigger( name, null, elem, true );
                    });
                    jQuery._data( this, name, jQuery.guid++ );
                }
                return false;
            },
            teardown: function() {
                if ( this !== document ) {
                    jQuery.event.remove( document, name + "." + jQuery._data( this, name ) );
                }
                return false;
            }
        };
    }
);


})( jQuery, window );








