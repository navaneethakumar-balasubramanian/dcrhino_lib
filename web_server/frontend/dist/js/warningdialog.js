define(['bootstrap', 'geotoolkit'], function () {
    var _instance = null;
    var DEFAULT_MESSAGE = 'Due to a limitation in Chrome, PDF saving does not work when run from the file system';

    var WarningDialog = function (options) {
        options = geotoolkit.mergeObjects(options, {
            'warning': DEFAULT_MESSAGE,
            'id': 'warningDialog'
        });
        this._dialogId = options['id'];
        this._warning = options['warning'];
        this._error = options['error'];
        this.generateHTML();
    };

    WarningDialog.prototype.setMessage = function (warning) {
        $('#' + this._dialogId + 'Body').html(warning);
        return this;
    };

    WarningDialog.prototype.generateHTML = function () {
        var dialogType = this._error != null ? 'Error' : 'Warning';
        var dialogMessage = this._error != null ? this._error : this._warning;

        // ensure print html was not generated already.
        if ($('#' + this._dialogId).length !== 0) {
            $('#' + this._dialogId + 'Label').text(dialogType);
            $('#' + this._dialogId + 'Body').text(dialogMessage);
            return;
        }

        var dialogHTML =
            '<div id=' + this._dialogId +
                    ' class="dialog-view modal fade ui-draggable" tabindex="-1" ' +
                    'role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header ui-draggable-handle">' +
                            '<button type="button" class="close" data-dismiss="modal">' +
                            '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                            '<h4 class="modal-title" id="' + this._dialogId + 'Label" >' + dialogType + '</h4>' +
                        '</div>' +
                        '<div class="modal-body" id="' + this._dialogId + 'Body">' +
                            dialogMessage +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button type="button" class="modal-close btn btn-default btn-primary" ' +
                                'data-dismiss="modal">Close</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        $('body').append($(dialogHTML));
    };

    WarningDialog.isChromeAndLocal = function () {
        var isChrome = false;
        if (typeof navigator !== 'undefined') {
            var version = /Chrome\/(\d+\.\d+)/.exec(navigator.userAgent);
            if (version != null) {
                var browserVersion = parseFloat(version[1]);
                if ((+browserVersion) > 41) isChrome = true;
            }
        }
        if (!isChrome) {
            return false;
        }

        switch (window.location.protocol) {
            case 'http:':
            case 'https:':
                return false;
            case 'file:':
                return true;
            default:
                // better to warn
                return true;
        }
    };

    WarningDialog.prototype.show = function () {
        $('#' + this._dialogId).modal('show');
    };

    WarningDialog.delimiter = /\n/g;

    WarningDialog.showWarning = function (warning) {
        if (!warning || typeof warning !== 'string') {
            warning = DEFAULT_MESSAGE;
        } else {
            warning = warning.replace(WarningDialog.delimiter, '<br>');
        }

        if (_instance == null) {
            _instance = new WarningDialog({
                'warning': warning
            });
        } else {
            _instance.setMessage(warning);
        }

        _instance.show();
    };

    WarningDialog.showError = function (error) {
        if (!error || typeof error !== 'string') {
            error = DEFAULT_MESSAGE;
        } else {
            error = error.replace(WarningDialog.delimiter, '<br>');
        }

        if (_instance == null) {
            _instance = new WarningDialog({
                'error': error
            });
        } else {
            _instance.setMessage(error);
        }

        _instance.show();
    };

    return WarningDialog;
});
