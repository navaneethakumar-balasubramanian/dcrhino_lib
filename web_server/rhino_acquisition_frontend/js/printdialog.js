define(['bootstrap', 'geotoolkit'], function () {
    var dialogId = 'printDialog';
    var panelId = 'printContent';

    var generateHTML = function () {
        // ensure print html was not generated already.
        if ($('#' + dialogId).length !== 0) {
            return;
        }

        var dialogHTML =
            '<div id=' + dialogId + ' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal">' +
                                '<span aria-hidden="true">&times;</span>' +
                                '<span class="sr-only">Close</span>' +
                            '</button>' +
                            '<h4 class="modal-title" id="myModalLabel">Print Settings</h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<table class="table table-bordered table-striped table-condensed" id="printContent">' +
                                '<tr>' +
                                    '<th>Paper Format</th>' +
                                    '<td><select class="form-control select-paper-format"></select></td>' +
                                '</tr>' +
                                '<tr id="row-custom-sizes"><th></th>' +
                                    '<td>' +
                                    '<div class="row">' +
                                        '<div class="col-lg-3">Width<input type="text" class="form-control input-custom-width"></div>' +
                                        '<div class="col-lg-3">Height<input type="text" class="form-control input-custom-height"></div>' +
                                    '</div>' +
                                    '</td>' +
                                '</tr>' +
                                    '<tr><th>Orientation</th><td><select class="form-control select-orientation"></select></td></tr>' +
                                    '<tr><th>Scaling</th><td><select class="form-control select-scaling"></select></td></tr>' +
                                    '<tr id="scale"><th>Scale</th><td><select class="form-control select-scale"></select></td></tr>' +
                                    '<tr><th>Keep Proportions</th><td><input class="cbx-aspect-ratio" type="checkbox"/></td></tr>' +
                                    '<tr><th>Continuous</th><td><input class="cbx-continuous"  type="checkbox"/></td></tr>' +
                                    //'<tr><th>Pdf pages display</th><td><select class="form-control select-page-display"></select></td></tr>' +
                                    '<tr><th>Margins</th>' +
                                '<td>' +
                                    '<select class="form-control select-units"></select>' +
                                        '<table id="printMargins" style="margin-top:4px" cellpadding="4">' +
                                            '<tr>' +
                                                '<td class="col-lg-1">Top</td>' +
                                                '<td style="padding:2px!important">' +
                                                    '<input value="0" type="text" class="form-control input-margin-top">' +
                                                '</td>' +
                                                '<td class="col-lg-1">Bottom</td>' +
                                                '<td style="padding:2px!important">' +
                                                    '<input value="0" type="text" class="form-control input-margin-bottom">' +
                                                '</td>' +
                                            '</tr>' +
                                            '<tr>' +
                                                '<td class="col-lg-1">Left</td>' +
                                                '<td style="padding:2px!important">' +
                                                    '<input value="0" type="text" class="form-control input-margin-left">' +
                                                '</td>' +
                                                '<td class="col-lg-1">Right</td>' +
                                                '<td style="padding:2px!important">' +
                                                    '<input value="0" type="text" class="form-control input-margin-right">' +
                                                '</td>' +
                                            '</tr>' +
                                        '</table>' +
                                '</td>' +
                                '</tr>' +
                            '</table>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-default btn-close" data-dismiss="modal">Close</button>' +
                            '<button type="button" class="btn btn-primary btn-save">Print</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        $('body').append($(dialogHTML));
    };

    var generateHtmlOptions = function (obj) {
        var opts = '';
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                opts += '<option value="' + obj[name] + '">' + name + '</option>';
            }
        }
        return opts;
    };

    var PrintDialog = function (options) {
        geotoolkit.util.EventDispatcher.call(this);

        this._customPageWidth = NaN;
        this._customPageHeight = NaN;

        generateHTML();
        $('#' + dialogId).find('.btn-save').click(this.save.bind(this));
        $('#' + panelId).find('.select-paper-format').change(this.initializeCustomPageSize.bind(this));
        this.initialize(options);
    };
    geotoolkit.inherits(PrintDialog, geotoolkit.util.EventDispatcher);

    var initializePanel = function (options) {
        var orientations = geotoolkit.scene.exports.PaperOrientation;
        var scaling = geotoolkit.scene.exports.ScalingOptions;
        //var pageDisplay = {'North To South': 'northtosouth', 'West To East': 'drawWestToEast'};
        var units = {'Centimeter': 'cm', 'Milimeter': 'mm', 'Pixel': 'px', 'Inch': 'in'};

        var paperFormatList = geotoolkit.scene.exports.PaperFormatFactory.getInstance().getPaperList();
        var paperFormats = {};
        for (var i = 0; i < paperFormatList.length; i++) {
            paperFormats[paperFormatList[i]] = paperFormatList[i];
        }

        var paperFormatOptions = generateHtmlOptions(paperFormats);
        var orientationOptions = generateHtmlOptions({
            'Portrait': orientations.Portrait,
            'Landscape': orientations.Landscape
        });
        var scalingOptions = generateHtmlOptions({
            'As Is': scaling.AsIs,
            'Fit Width': scaling.FitWidth,
            'Fit Height': scaling.FitHeight,
            'Fit Both': scaling.FitBoth
        });

        //var pageDisplayOptions = generateHtmlOptions(pageDisplay);
        var unitOptions = generateHtmlOptions(units);

        var panel = $('#' + panelId);

        if (options['scale'] === undefined) {
            panel.find('#scale').hide();
        } else {
            var scaleDisplayOptions = generateHtmlOptions(options['scale']['options']);
            panel.find('.select-scale').empty().append(scaleDisplayOptions);
            if (options['scale']['value'] !== undefined) {
                panel.find('.select-scale').val(options['scale']['value']);
            }
        }

        panel.find('.select-paper-format').empty().append(paperFormatOptions);
        panel.find('.select-orientation').empty().append(orientationOptions);
        panel.find('.select-scaling').empty().append(scalingOptions);
        panel.find('.select-units').empty().append(unitOptions);
        // Sets default options
        panel.find('.select-paper-format').val(options['paperformat']['name'] || options['paperformat']);

        panel.find('.select-orientation').val(options['orientation']);
        panel.find('.select-scaling').val(options['scaling']);

        if (options['keepaspectratio']) panel.find('.cbx-aspect-ratio').prop('checked', options['keepaspectratio']);
        if (options['continuous']) panel.find('.cbx-continuous').prop('checked', options['continuous'] );

        panel.find('.select-units').val(options['units']);

        panel.find('.input-margin-top').val(options['top']);
        panel.find('.input-margin-left').val(options['left']);
        panel.find('.input-margin-right').val(options['right']);
        panel.find('.input-margin-bottom').val(options['bottom']);
    };

    PrintDialog.prototype.setOptions = function (options) {
        this.initialize(options);
    };

    PrintDialog.prototype.initialize = function (options) {
        options = options || {};
        options = geotoolkit.deepMergeObject(options, this._options || {
            'paperformat': 'Letter',
            'orientation': geotoolkit.scene.exports.PaperOrientation.Portrait,
            'top': 1,
            'bottom': 1,
            'left': 0.5,
            'right': 0.5,

            'scaling': geotoolkit.scene.exports.ScalingOptions.AsIs,

            'keepaspectratio': false,
            'continuous': false,
            'units': 'cm',

            'drawwesttoEast': false
        }, true);
        initializePanel(options);
        this.initializeCustomPageSize();
    };

    PrintDialog.prototype.initializeCustomPageSize = function () {
        var panel = $('#' + panelId);

        var paperFormat = panel.find('.select-paper-format').val();
        var unit = panel.find('.select-units').val();
        var orientation = panel.find('.select-orientation').val();
        var paper = geotoolkit.scene.exports.PaperFormatFactory.getInstance()
            .getPaper(paperFormat, unit, orientation);

        var row = $('#row-custom-sizes');
        if (paper['name'] === 'Custom') {
            var customPageWidth = (isNaN(this._customPageWidth) ? paper['width'] : this._customPageWidth);
            var customPageHeight = (isNaN(this._customPageHeight) ? paper['height'] : this._customPageHeight);

            panel.find('.input-custom-width').val(Number(customPageWidth).toFixed(2));
            panel.find('.input-custom-height').val(Number(customPageHeight).toFixed(2));

            row.show();
        } else {
            row.hide();
        }
    };

    PrintDialog.prototype.save = function () {
        var panel = $('#' + panelId);
        //var westToEast = panel.find('.select-page-display').val().toLowerCase() == 'drawwesttoeast';
        var paperFormat = panel.find('.select-paper-format').val();
        var unit = panel.find('.select-units').val();
        var orientation = panel.find('.select-orientation').val();
        var paper = geotoolkit.scene.exports.PaperFormatFactory.getInstance()
            .getPaper(paperFormat, unit, orientation);
        if (paper['name'] === 'Custom') {
            paper['width'] = (+panel.find('.input-custom-width').val());
            paper['height'] = (+panel.find('.input-custom-height').val());

            this._customPageWidth = paper['width'];
            this._customPageHeight = paper['height'];
        }

        var top = (+panel.find('.input-margin-top').val());
        var left = (+panel.find('.input-margin-left').val());
        var right = (+panel.find('.input-margin-right').val());
        var bottom = (+panel.find('.input-margin-bottom').val());
        var options = {};
        var printSettings = {
            'paperFormat': paper,
            'orientation': orientation,
            'scaling': panel.find('.select-scaling').val(),
            'scale': {
                'value': panel.find('.select-scale').val()
            },

            'keepaspectratio': panel.find('.cbx-aspect-ratio').prop('checked'),
            'continuous': panel.find('.cbx-continuous').prop('checked'),
            'drawwesttoeast': false,
            'units': panel.find('.select-units').val(),
            'top': isNaN(top) ? 0 : top,
            'bottom': isNaN(bottom) ? 0 : bottom,
            'left': isNaN(left) ? 0 : left,
            'right': isNaN(right) ? 0 : right
        };
        options['printsettings'] = printSettings;
        this._options = printSettings;
        this.notify('saved', this, options);
    };

    PrintDialog.prototype.show = function () {
        $('#' + dialogId)['modal']('show');
    };

    PrintDialog.prototype.hide = function () {
        $('#' + dialogId)['modal']('hide');
    };

    return PrintDialog;
});

