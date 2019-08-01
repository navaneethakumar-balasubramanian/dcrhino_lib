function toggleclass(el, className) {
    if (el.hasClass(className)) {
        el.removeClass(className);
    } else {
        el.addClass(className);
    }
}

/**
 * Expands or shrinks tutorial code blocks
 */
function togglecode(event) {
    var child = event.currentTarget.parentElement.firstChild;
    var counter = 0;
    while(child!= null){ // skip TextNodes
        if(child.nodeType == Node.TEXT_NODE) {
            child = child.nextSibling;
            continue;
        }
        if(counter === 0) {
            toggleclass($(child), 'collapsed');
        } else {
            toggleclass($(child), 'hidden');
        }
        child = child.nextSibling;
        counter++;
    }
}

/**
 * Call this method for tutorials with deprecated content, it will display a message in the beginnig of the page
 * stating that the tutorial is deprecated. Pass a string if you want to display any other text.
 */
function displayDeprecatedWarning(text) {
    var container = $('<div />', {
        'class': 'deprecated-container'
    });
    var cell = $('<div />', {
        'class': 'deprecated-cell'
    }).appendTo(container);
    var p = $('<p />', {
        'text': text != null ? text : 'Functionality explained in this tutorial has been deprecated and should not be used for any new products!'
    }).appendTo(cell);
    var header = $('.c1');
    if(header.length !== 0) {
        container.insertAfter(header);
    } else {
        container.prependTo($('.body-content'));
    }

    var closeSymbol = $('<div />', {
        'class': 'close-warning'
    });
    var span = $('<span />', {
        'class': 'glyphicon glyphicon-remove'
    }).appendTo(closeSymbol);
    closeSymbol.appendTo(container);
    closeSymbol.click(function() {
        container.hide();
    });
}

/**
 *
 * @param {string} searchString
 */
function getParamFromUrl(searchString, key) {
    if(searchString.charAt(0) === '?')
        searchString = searchString.substring(1);
    var keysArr = searchString.split('&');
    for(var i = 0; i < keysArr.length; i++) {
        var tmpArr = keysArr[i].split('=');
        if(tmpArr.length > 1) {
            if(tmpArr[0] === key) {
                return tmpArr[1];
            }
        }
    }
    return null;
}