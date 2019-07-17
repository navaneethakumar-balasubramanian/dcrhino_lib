/**
 * Copyright: Copyright (c) 2013 by INT, Inc.  All rights reserved.
 * Company: INT, Inc. <br>
 * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
/* globals $*/
define(['preview', 'datasource', 'lassource', 'bootbox', 'printdialog', 'warningdialog', 'geotoolkit.welllog.widgets.ui', 'geotoolkit.cgm', 'jquery-contextmenu','axios'], function (WellLogPreview, DataSource, LASSource, BootBox, PrintDialog, WarningDialog) {
    const axios = require('axios')
    var DEFAULT_DARK_COLOR = '#757575';
    var DEFAULT_LIGHT_COLOR = 'rgba(245,245,245,0.85)';// #f5f5f5

    var _dialog = null;
    var _pdfDialog = null;
    /**
     * Return curve data source
     * @param {geotoolkit.data.DataTable} table table
     * @param {string} id id
     * @returns {geotoolkit.welllog.data.LogCurveDataSource}
     */
    var getCurveSource = function (table, id) {
        var indexName = table.getMetaData()['index'];
        var depths = table.getColumnByName(indexName);
        var values = table.getColumnByName(id);
        // Sets data source
        return values == null ? null :
            new geotoolkit.welllog.data.LogCurveDataSource({'depths': depths, 'values': values});
    };
    var configureHeaders = function (widget) {
        var headerProvider = widget.getHeaderContainer().getHeaderProvider();

        // configure Depth ant Time axis header
        var logAxisVisualHeader = headerProvider.getHeaderProvider(geotoolkit.welllog.LogAxis.getClassName());
        logAxisVisualHeader.setHeaderType(geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType.Simple);

        // configure curve header
        var header = new geotoolkit.welllog.header.AdaptiveLogCurveVisualHeader()
            .setElement({
                'ScaleTo': {'horizontalpos': 'right', 'verticalpos': 'top'},
                'ScaleFrom': {'horizontalpos': 'left', 'verticalpos': 'top'},
                'Line': {'horizontalpos': 'center', 'verticalpos': 'center'},
                'Name': {'horizontalpos': 'center', 'verticalpos': 'top'},
                'Unit': {'horizontalpos': 'center', 'verticalpos': 'bottom'},
                'Tracking': {'horizontalpos': 'center', 'verticalpos': 'bottom'}
            });
        headerProvider.registerHeaderProvider(geotoolkit.welllog.CompositeLogCurve.getClassName(), header);
    };
    var createWidget = function (data) {
        var dataTableView = new geotoolkit.data.DataTableView(data);
        var range = dataTableView.getMetaData()['range'];
        var widget = new geotoolkit.welllog.widgets.WellLogWidget({
            'highlight': {
                'cssclass': 'highlight'
            },
            'range': range,
            'scrollable': true,
            'indent': 0,
            'splitter': true,
            'header': {
                'visible': true
            },
            'track': {
                'header': {
                    'firsttolast': false
                }
            },
            'footer': {
                'visible': false
            },
            'trackcontainer': {
                'border': {'visible': true}
            },
            'border': {'visible': true},
            'indexType': 'md',
            'indexUnit': 'ft',
            'scroll': {
                'headerverticalscroll': {
                    'size': 11,
                    'visible': true,
                    'options': {
                        'rounded': true,
                        'resizable': false
                    }
                },
                'trackverticalscroll': {
                    'size': 11,
                    'visible': true,
                    'options': {
                        'rounded': true,
                        'resizable': false
                    }
                },
                'footerverticalscroll': {
                    'size': 11,
                    'visible': true,
                    'options': {
                        'rounded': true,
                        'resizable': false
                    }
                },
                'trackhorizontalscroll': {
                    'size': 11,
                    'visible': true,
                    'options': {
                        'rounded': true,
                        'resizable': false
                    }
                }
            },
            'nodefilter': function (node) {
                // to capture click events on axis header
                return node instanceof geotoolkit.welllog.LogAbstractVisual || node instanceof geotoolkit.welllog.LogAxis;
            }
        })
            .setLayoutStyle({'left': 0, 'top': 0, 'right': 0, 'bottom': 0}, true);

        var BindingFunction = function () {
            this.accept = function (node) {
                return node instanceof geotoolkit.welllog.LogCurve;
            };
            this.bind = function (curve, data) {
                var info = curve.getId();
                if (curve.getDataSource() != null) {
                    curve.getDataSource().clear();
                }

                var source = getCurveSource(data, typeof info === 'object' ? info['id'] : info);
                if (source != null) {
                    if (curve.isCustomLimits() === true) {
                        curve.setData(source, false, true);
                    } else {
                        curve.setData(source, true, true);
                    }
                    if (curve.getLimitsType() === geotoolkit.welllog.LogCurve.LimitsType.Neat) {
                        var limits = geotoolkit.util.Math.calculateNeatLimits(source.getMinValue(), source.getMaxValue());
                        curve.setNormalizationLimits(limits.getLow(), limits.getHigh());
                    }
                }
            };
        };
        configureHeaders(widget);
        // Add data binding for curve
        widget.getDataBinding().add(new BindingFunction());
        widget.setData(dataTableView);
        return widget;
    };
    var addDefaultTemplate = function (wellLogWidget, curveMnemonic, colors) {
        // TODO: It will be changed to real template
        for (var i = 0; i < curveMnemonic.length; i++) {
            wellLogWidget.addTrack(geotoolkit.welllog.TrackType.IndexTrack, 50)
                .enableClipping(true);

            var track = wellLogWidget.addTrack(geotoolkit.welllog.TrackType.LinearTrack,
                geotoolkit.welllog.TrackDirection.Last)
                .enableClipping(true);
            track.setName('Well' + ' Track' + ' #' + (i + 1));
            wellLogWidget.getTrackHeader(track).setVisibleTrackTitle(true);
            var logCurve = new geotoolkit.welllog.CompositeLogCurve()
                .setLineStyle({'color': colors[i], 'width': 2})
                .setId({'id': curveMnemonic[i], 'wellId': 'wellId'});

            track.addChild(logCurve);
        }
    };
    /* eslint-disable max-statements*/
    var showPropertiesDialogForSelection = function (selection) {
        var widget = window._wellLogWidget;
        var selectedVisual = null;
        var visual;
        for (var i = 0; i < selection.length; i++) {
            visual = selection[i];
            if (visual instanceof geotoolkit.welllog.LogCurve ||
                    (visual instanceof geotoolkit.welllog.LogTrack && visual.getId() !== 'INDEX') ||
                    geotoolkit.isInstanceOf(visual, geotoolkit.widgets.overlays.IAnnotation)) {
                selectedVisual = visual;
            } else if (visual instanceof geotoolkit.welllog.header.LogCurveVisualHeader) {
                selectedVisual = visual.getVisual();
            } else if (visual instanceof geotoolkit.welllog.LogAxis) {
                var headerProvider = widget.getHeaderContainer().getHeaderProvider();
                selectedVisual = headerProvider.getHeader(visual);
            }
        }

        if (_dialog != null) {
            _dialog.remove();
        }
        var DialogView = geotoolkit.welllog.widgets.ui.PropertiesDialogView;
        var dialogModel, cd;

        var idx;
        if (selectedVisual instanceof geotoolkit.welllog.LogCurve) {
            var leftLogRef = null;
            var rightLogRef = null;
            if (selectedVisual.getLeftFill() == null) {
                selectedVisual.setLeftReferencePointSet((leftLogRef = new geotoolkit.welllog.LogReferenceLine(0.0)));
                leftLogRef.setName('leftReferenceLine');
                selectedVisual.getLeftFill().setVisible(false).setFillType(geotoolkit.welllog.LogFill.FillType.Right);
            }
            if (selectedVisual.getRightFill() == null) {
                selectedVisual.setRightReferencePointSet((rightLogRef = new geotoolkit.welllog.LogReferenceLine(1)));
                rightLogRef.setName('rightReferenceLine');
                selectedVisual.getRightFill().setVisible(false).setFillType(geotoolkit.welllog.LogFill.FillType.Left);
            }

            if (selectedVisual.getTrack() != null) {// needs to add references line to the track as well
                idx = selectedVisual.getTrack().indexOfChild(selectedVisual);
                if (leftLogRef !== null) {
                    selectedVisual.getTrack().insertChild(idx + 1, leftLogRef);
                }
                if (rightLogRef !== null) {
                    selectedVisual.getTrack().insertChild(idx + 2, rightLogRef);
                }
            }

            dialogModel = new geotoolkit.welllog.widgets.ui.CurvePropertyDialog().parse(selectedVisual, selectedVisual.getLeftFill(), selectedVisual.getRightFill());
            cd = new DialogView({
                'model': dialogModel
            });
            cd.on('saved', function (src) {
                dialogModel.save(selectedVisual, selectedVisual.getLeftFill(), selectedVisual.getRightFill());
                widget.getHeaderContainer().rebuild();
                window._wellLogPreview.buildDocumentView();
            });
            cd.show();
            _dialog = cd;
        } else if (selectedVisual instanceof geotoolkit.welllog.LogTrack) { // Filter index track for now
            dialogModel = new geotoolkit.welllog.widgets.ui.TrackPropertyDialog().parse(selectedVisual, widget.getTrackHeader(selectedVisual));
            cd = new DialogView({
                'model': dialogModel
            });
            cd.on('saved', function (src) {
                dialogModel.save(selectedVisual, widget.getTrackHeader(selectedVisual));
                widget.getHeaderContainer().rebuild();
                widget.getTrackContainer().rebuild();
                widget.updateLayout();
                widget.invalidate();
                window._wellLogPreview.buildDocumentView();
            });
            cd.show();
            _dialog = cd;
        } else if (selectedVisual instanceof geotoolkit.welllog.header.LogAxisVisualHeader) {
            dialogModel = new geotoolkit.welllog.widgets.ui.AxisHeaderPropertyDialog().parse(selectedVisual);
            cd = new DialogView({
                'model': dialogModel
            });
            cd.on('saved', function (src) {
                dialogModel.save(selectedVisual);
                widget.updateLayout();
                widget.invalidate();
            });
            cd.show();
            _dialog = cd;
        } else if (geotoolkit.isInstanceOf(selectedVisual, geotoolkit.widgets.overlays.IAnnotation)) {
            dialogModel = new geotoolkit.welllog.widgets.ui.AnnotationPropertyDialog()
                .parse(visual);

            cd = new DialogView({
                'model': dialogModel
            });
            cd.on('saved', function (src) {
                dialogModel.save(selectedVisual);
                window._wellLogPreview.updateAnnotations();
            });
            cd.show();
            _dialog = cd;
        }
    };
    /* eslint-enable max-statements*/
    var createWellLogWidget = function (datasource) {
        var wellLogWidget = createWidget(datasource);
        //addDefaultTemplate(wellLogWidget, ['GR', 'CALI', 'DLT'], ['#ef6c00', '#2196f3', '#7cb342']);

       // wellLogWidget.setDepthLimits(0, 100);

        // Tools
        wellLogWidget.getToolByName('cross-hair')
            .setEnabled(true)
            .setSettings({
                'horizontal': {
                    'color': DEFAULT_DARK_COLOR,
                    'width': 1,
                    'pattern': null,
                    'pixelsnapmode': {'x': true, 'y': true}
                },
                'west': {
                    'visible': true,
                    'border': {
                        'visible': true,
                        'fillstyle': DEFAULT_LIGHT_COLOR,
                        'linestyle': DEFAULT_DARK_COLOR,
                        'padding': 6,
                        'radius': 6
                    },
                    'alignment': geotoolkit.util.AnchorType.LeftCenter
                }
            });
        var selector = new geotoolkit.selection.Selector();
        wellLogWidget.connectTool(new geotoolkit.controls.tools.ToolTipTool({
            'group': wellLogWidget,
            'divelement': document.getElementById('tooltip-container'),
            'callback': function (pt) {
                // select nodes
                var nodes = selector.select(wellLogWidget, pt.x, pt.y, 2);
                if (nodes == null || nodes.length === 0) return '';

                nodes = nodes.reverse();
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] instanceof geotoolkit.welllog.LogCurve) {
                        var logCurve = nodes[i];
                        var pos = logCurve.getSceneTransform().inverseTransform(pt);
                        var rawValue = logCurve.getDataSource()
                            .getValueAt(pos.getY(), 0, logCurve.getDataSource().getSize(), logCurve.getInterpolationType());
                        return 'Name: ' + nodes[i].getName() + '<br>' +
                            'Depth: ' + pos.y.toFixed(2) + '<br>' +
                            'Value: ' + rawValue.toFixed(2);
                    }
                }
                return '';
            }
        }));
        wellLogWidget.getToolByName('pick')
            .addListener(geotoolkit.controls.tools.Selection.Events.onDoubleClick, function (sender, eventArgs) {
                if (eventArgs.getSelection().length === 0) {
                    return;
                }
                showPropertiesDialogForSelection(eventArgs.getSelection());
            });

        return wellLogWidget;
    };
    var createNavigationWidget = function (targetWidget) {
        var widget = new geotoolkit.welllog.widgets.WellLogWidget({
            'horizontalscrollable': false,
            'verticalscrollable': false,
            'trackcontainer': {
                'border': {'visible': false}
            },
            'header': {
                'visible': false
            },
            'border': {'visible': true}
        })
            .setDataBinding(null)
            .setDepthLimits(targetWidget.getDepthLimits());

        widget.addTrack(geotoolkit.welllog.TrackType.IndexTrack)
            .setWidth(40)
            .addChild([
                new geotoolkit.welllog.LogCurve(null)
            ]);

        // initializing tools
        // do not allow user to select visuals
        widget.getToolByName('pick')
            .setEnabled(false);
        // do not allow user to pinchzoom index track
        widget.getToolByName('pinchtozoom')
            .setEnabled(false);
        // do not allow user resize tracks
        widget.getToolByName('splitter')
            .setEnabled(false);
        // disable cross-hair
        widget.getToolByName('cross-hair')
            .setEnabled(false);
        // and change scale
        widget.getToolByName('TrackPanning')
            .setEnabled(false);

        window._wellLogWidget.getToolByName('pick')
            .addListener(geotoolkit.controls.tools.Selection.Events.onSelectionChanged, function (sender, eventArgs) {
                if (eventArgs.getSelection().length === 0) {
                    return;
                }
                eventArgs.getSelection()
                    .forEach(function (selection) {
                        if (selection instanceof geotoolkit.welllog.LogCurve) {
                            geotoolkit.selection.from(this._navigationWidget)
                                .where(function (node) {
                                    return node instanceof geotoolkit.welllog.LogCurve;
                                })
                                .select(function (curve) {
                                    curve.setLineStyle(selection.getLineStyle())
                                        .setData(selection.getDataSource(), true, true);
                                });
                        }
                    }.bind(this));
            }.bind(this));

        window._navigationTool = new geotoolkit.welllog.widgets.tools.Navigation(widget.getToolByName('cross-hair').getManipulatorLayer());
        widget.getTool().add(this._navigationTool);
        return widget;
    };

    // show or hide menu labels (shown in mobile mode; hidden otherwise)
    var displayNavbarMenuLabels = function () {
        var isMobileMode = $('button.navbar-toggle').is(':visible');
        var navbarlabels = $('.navbar-default .navbar-nav>li>a>span.mobileNavbarLabel');

        if (isMobileMode) {
            navbarlabels.show();
        } else {
            navbarlabels.hide();
        }
    };
    var checkSelection = function () {
        var logObjectSelected = false;
        var annotationSelected = false;
        var canDeleteAnnotation = true;

        var annotationOverlay = window._annotationsOverlay;
        if (annotationOverlay != null && annotationOverlay.getEnabled()) {
            canDeleteAnnotation = window._annotationsOverlay.getOptions()['candelete'] && annotationOverlay.getAnnotations().hasNext();
            annotationSelected = annotationOverlay.getActiveAnnotation() != null;
        } else {
            logObjectSelected = window._wellLogWidget.getToolByName('pick').getSelection().length > 0;
        }

        var canDelete = (annotationSelected && canDeleteAnnotation) || logObjectSelected;
        var disabled = canDelete === false ? 'disabled' : false;
        if (disabled) {
            $('#DeleteButton').addClass('disabled');
        } else {
            $('#DeleteButton').removeClass('disabled');
        }

        var hasProperties = annotationSelected || logObjectSelected;
        disabled = hasProperties === false ? 'disabled' : false;
        if (disabled) {
            $('#PropertiesButton').addClass('disabled');
        } else {
            $('#PropertiesButton').removeClass('disabled');
        }
    };
    var createAnnotationsOverlay = function (wellLogWidget) {
        var annotationsOverlay = new geotoolkit.welllog.widgets.overlays.AnnotationOverlay(wellLogWidget)
            .on(geotoolkit.widgets.overlays.AbstractOverlay.Events.StateChanged, function (event, sender, state) {
                if (sender.getEnabled()) {
                    $('#AnnotationModeButton').addClass('selected');
                } else {
                    $('#AnnotationModeButton').removeClass('selected');
                }
                // eslint-disable-next-line no-use-before-define
                // tooltipElement.className = 'geo-tooltiptext';
                $('#AnnotationModeMenu')[0].innerHTML = sender.getEnabled() ? 'Disable annotation' : 'Enable annotation';

                if (sender.getEnabled()) {
                    window._wellLogWidget.getToolByName('drag-and-drop').setEnabled(false);
                }


                if (state === 'Enabled' && sender.getEnabled()) {
                    var selector = window._wellLogWidget.getToolByName('pick');
                    var selection = selector != null ? selector.getSelection() : null;
                    if (selection != null && selection.length > 0) {
                        selection.forEach(function (visual) {
                            window._wellLogWidget.highlightVisual(visual, !sender.getEnabled());
                        });
                    }
                }
                checkSelection();
            })
            .on(geotoolkit.widgets.overlays.AnnotationOverlay.Events.CreateAnnotation, function (event, sender, eventArgs) {
                var data = eventArgs.getAnnotation();
                data['text'] = 'text';
                // eslint-disable-next-line max-len
                data['symbol'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xNkRpr/UAAAKqSURBVDhPbZNbSBNgFMc3CLJeIkENqQcpopceepAiKhFKIiWIAksXtbJ1UdEerAyym3azyFosA8W0FMrNNqcTvKBzWZuXzGreB8o0UtOMDO1iv84sszEf/vCdc/7n/33n/32fApgXB7QO/NVmAuLK2Z5hk9T8vHmTqkwbu++08mnyB1O/fhGf30VEWq2UfLk+CdV1K+EZDspa3pOiayI5y05p8yAx996yLbVSKN58ryA6vZawy41M/QRz83tO3m8i5X4LeXX9Up4mViciZ7xF/i3236hnT1YbA2NTZFe6KLT1U9/1kbrOEfQv3WSVdzP8+RtJ+Z3sOFcjLf8JaLR2wtObcPSNsy7BgnJ9DgujilgQUTADP1krN+YSrDJg6x0jVtvGrgzrjIgiKbeZDedfMvV9GlvHCJmmTswyf7Hdjf4vnsoJPJ7ctfRgbBz0NLLzVgv7shpQBMaZqWr7gL17lKvSXGIf5LG1j8L6/jnIOI8kZ5DazbIeTI0DOIQffLQMRZCmlA73ZzTZzSi35LFUbWRxrIFFgsWqkn/wk9j/sAnl1gI2p9aIV5OsTLSgiLndQIzuNa6hCUJTKlmwt5jlx8sIOmJi2ZHSGQTFmVhxzCxCBlbIhu2y4akiJ2uSK/44ufuKlcMP3jH29TtW5xAvuj/iGp7A6R4X8ji9It7iGqX6zRBf5I4v6LsIOGT0WDF3jVFpNWhynIiXXCx2ornrIMPYQfqzDpKym0jIfcW3n9PiUy+BB/80ewl4EHG2imjtGznFMCHRepSb8lCGPWRJZBFmMS65wEmw2iTUuR4vAQ88z/X0Exc9IxOckA+lzmygVcbQVblZHW8RijffK5hFxNlqGaedSTmyvGouGXpYm1AhK1+uT2IWkdeeE5JYyarECkJTqyU1Hw/Fb8Ss6LTDRVrLAAAAAElFTkSuQmCC';

                sender.setOptions({
                    'cancreate': false
                });

                window._wellLogPreview.updateAnnotations();
            })
            .on(geotoolkit.widgets.overlays.AnnotationOverlay.Events.RemoveAnnotation, function () {
                checkSelection();
                window._wellLogPreview.updateAnnotations();
            })
            .on(geotoolkit.widgets.overlays.AnnotationOverlay.Events.EditAnnotation, function () {
                window._wellLogPreview.updateAnnotations();
            })
            .on(geotoolkit.widgets.overlays.AnnotationOverlay.Events.ChangeActiveAnnotation, function () {
                checkSelection();
                window._wellLogPreview.updateAnnotations();
            });

        annotationsOverlay.notify(geotoolkit.widgets.overlays.AbstractOverlay.Events.StateChanged, annotationsOverlay);
        return annotationsOverlay;
    };
    var updateCurvesList = function () {
        var helper = function (e) {
            var item = $(e.target);

            // if image or other child element of li is selected, select the li
            while (item.is('li') === false && item.parent() != null) {
                item = item.parent();
            }

            if (!item.hasClass('selected')) {
                item.addClass('selected').siblings().removeClass('selected');
            }
            var elements = item.parent().children('.selected').clone();
            elements.addClass('dragListItem');
            var helper = $('<div/>', {id: 'placeholder'});
            return helper.append(elements);
        };

        var onClick = function (e) {
            if (e.ctrlKey || e.metaKey) {
                $(this).toggleClass('selected');
            } else {
                $(this).addClass('selected').siblings().removeClass('selected');
            }
        };

        $('#curveslist').empty();
        if (window._wellLogWidget != null && window._wellLogWidget.getData() != null) {
            var data = window._wellLogWidget.getData();
            for (var i = 1; i < data.getNumberOfColumns(); ++i) {
                var curve = data.getColumn(i);
                var item = $('<li class="list-group-item" id="curveid' + i + '">' +
                    '<img src="./images/curve.png"/>' +
                    curve.getName() + '</li>')
                    .draggable({
                        helper: helper,
                        addClasses: true,
                        appendTo: 'body',
                        cursorAt: {left: 0, top: 0}
                    })
                    .click(onClick);

                $('#curveslist').append(item);
            }
        }
    };
    var loadLAS = function (file) {
        if (window.FileReader != null) {
            $('#loadspinner').show();
            LASSource.open(file).then(function (table) {
                var dataTableView = new geotoolkit.data.DataTableView(table);
                var range = dataTableView.getMetaData()['range'];
                window._wellLogWidget.setData(dataTableView);
                var limits = geotoolkit.util.Math.calculateNeatLimits(range.getLow(), range.getHigh(), false, false);
                window._wellLogWidget.setDepthLimits(limits.getLow(), limits.getHigh());
                updateCurvesList();
                window._wellLogPreview.buildDocumentView();
                $('#loadspinner').hide();
            }, function (err) {
                $('#loadspinner').hide();
                BootBox.alert('An error occured while reading file: ' + err, function () {
                });
            });
        } else {
            BootBox.alert('Your browser does not support local files', function () {
            });
        }
    };
    var resize = function () {
        if (window._plot) {
            var host = $('#geotoolkit-plot-host');
            window._plot.setSize(host.width(), host.height());
            window._navigationWidget.fitToHeight();
            window._wellLogPreview.updateDocumentViewVisibleLimits();
            window._annotationsOverlay.editAnnotation(null);
        }

        displayNavbarMenuLabels();
    };
    var addCurveToTrack = function (curveData, track) {
        // get alpha between 0.8 - 1.0
        var randomAlpha = Math.floor(Math.random() * (255 - 204 + 1)) + 204;
        var randomColor = geotoolkit.util.ColorUtil.parseColor(geotoolkit.util.ColorUtil.getRandomColorRgb());
        randomColor.alpha = randomAlpha;

        var logCurve = new geotoolkit.welllog.CompositeLogCurve(curveData)
            .setLineStyle({'color': randomColor.toRgbaString(), 'width': 2})
            .setId({'id': curveData.getName(), 'wellId': 'wellId'});

        track.addChild(logCurve);
    };
    var addTrack = function (type, direction, isFirst) {
        var width = 0;
        if (window._wellLogWidget != null) {
            var trackType;
            if (type === 'index') {
                trackType = geotoolkit.welllog.TrackType.IndexTrack;
                width = (window._wellLogWidget.getTracksCount() === 0) ? 70 : 50;
            } else if (type === 'log') {
                trackType = geotoolkit.welllog.TrackType.LogTrack;
                width = 200;
            } else {
                trackType = geotoolkit.welllog.TrackType.LinearTrack;
                width = 200;
            }
            var track = window._wellLogWidget.addTrack(trackType, direction, width);
            if (type !== 'index') {
                window._wellLogWidget.getTrackHeader(track).setVisibleTrackTitle(true);
            }
            return track;
        }
        return null;
    };
    var initGUI = function () {
        $('#las').bind('change', function (event) {
            var files = event.target.files;
            for (var i = 0; i < files.length; ++i) {
                loadLAS(files[i]);
            }
        });
        // left side panel for shape creation
        $('#curveTree').on('click', function () {
            if ($('#curvesSideBar').css('display') === 'block') {
                $('#geotoolkit-plot-host').css('padding-left', '0px');
                $('#curvesSideBar').css('display', 'none');
                resize();
            } else {
                $('#geotoolkit-plot-host').css('padding-left', '200px');
                $('#curvesSideBar').css('display', 'block');
                resize();
            }

            // Toggle Expand/Collapse Sidebar Icon
            $('nav #curveTree span.glyphicon').toggleClass('glyphicon-chevron-left');
            $('nav #curveTree span.glyphicon').toggleClass('glyphicon-chevron-right');
        });

        $('#geotoolkit-plot').droppable({
            drop: function (event, object) {
                var data = window._wellLogWidget.getData();
                var absolutePosition = this.getBoundingClientRect();
                var items = $(event.currentTarget).find('#placeholder li');
                var position = {
                    x: object.position.left - absolutePosition.left,
                    y: object.position.top - absolutePosition.top
                };

                if (position.x < 0 || position.y < 0) {
                    return;
                }

                var track = window._wellLogWidget.getTrackAtPosition(position.x, position.y);

                if (track == null) {
                    track = addTrack(null, geotoolkit.welllog.TrackDirection.Last);
                }

                for (var i = 0; i < items.length; i++) {
                    var obj = items[i];
                    addCurveToTrack(getCurveSource(data, obj.innerText), track);
                }
                // remove the dragable helper
                $(event.currentTarget).find('#placeholder').remove();

                // deselect all curves in curvelist
                $('#curveslist li').removeClass('selected');

                window._wellLogPreview.buildDocumentView();
            }
        });

        window._wellLogWidget.getToolByName('drag-and-drop')
            .addListener(geotoolkit.controls.tools.AbstractTool.Events.onEnabledStateChanged, function (sender) {
                if (sender.isEnabled()) {
                    $('#DragAndDropModeButton').addClass('selected');
                } else {
                    $('#DragAndDropModeButton').removeClass('selected');
                }

                if (sender.isEnabled()) {
                    window._annotationsOverlay.setEnabled(false);
                }
            });

        window._wellLogWidget.getToolByName('pick')
            .addListener(geotoolkit.controls.tools.Selection.Events.onSelectionChanged, function (sender) {
                checkSelection();
            });

        /**
         * initialize tooltip
         */
        var tooltipElement = document.createElement('span');
        tooltipElement.className = 'geo-tooltiptext';
        tooltipElement.innerHTML = 'Use Ctrl+Enter to submit changes<br>Or ESC to cancel';

        var textArea = $('.geotoolkit-inlineeditor')[0];
        textArea.parentElement.className = 'geo-tooltip';
        textArea.parentElement.appendChild(tooltipElement);

        // Create navbar Labels that appear on mobile screens
        $('div#main-navbar>ul>li').each(function (index) {
            $(this).children('a').append('<span class="mobileNavbarLabel">' + $(this).attr('title') + '</span>');
        });

        // Create navbar Labels that appear on mobile screens
        $('nav.navbar div.navbar-collapse>ul>li')
            .each(function (index) {
                $(this).children('a')
                    .append('<span class="mobileNavbarLabel visible-xs-inline-block">' + $(this).attr('title') + '</span>');
            });
        displayNavbarMenuLabels();

        $('#loadspinner').hide();
    };
    var deleteSelection = function () {
        if ($('#DeleteButton').hasClass('disabled')) {
            return;
        }

        if (window._wellLogWidget == null) {
            return;
        }

        var annotationOverlay = window._annotationsOverlay;
        if (annotationOverlay.getEnabled()) {
            var activeAnnotation = annotationOverlay.getActiveAnnotation();
            if (activeAnnotation != null) {
                annotationOverlay.removeAnnotation(activeAnnotation);
            }
            return;
        }

        var selector = window._wellLogWidget.getToolByName('pick');
        var currentSelection = selector.getSelection();
        // Check visuals
        var visualDeleted = false;
        currentSelection.forEach(function (visual) {
            if (visual instanceof geotoolkit.welllog.LogAbstractVisual) {
                var track = visual.getParent();
                if (track == null) {
                    return;
                }

                track.removeChild(visual);
                visualDeleted = true;
            }
        });
        if (!visualDeleted) {
            // check tracks if visual is not deleted
            currentSelection.forEach(function (visual) {
                if (visual instanceof geotoolkit.welllog.LogTrack) {
                    window._wellLogWidget.removeTrack(visual);
                }
            });
        }
        geotoolkit.selection.from(window._navigationWidget)
            .where(function (node) {
                return node instanceof geotoolkit.welllog.LogCurve;
            })
            .select(function (curve) {
                curve.setLineStyle('transparent');
            });
        // clear selection after deleting selected
        selector.setSelection([]);
        window._wellLogPreview.buildDocumentView();
    };

    function getNewVisualIndexAndOrder (currentVisual, track, direction) {
        function isRegularVisual (visual) {
            return (visual instanceof geotoolkit.welllog.LogAbstractVisual &&
                !(visual instanceof geotoolkit.welllog.LogReferenceLine) &&
                !(visual instanceof geotoolkit.welllog. LogBlock));
        }
        var idx = track.indexOfChild(currentVisual);
        var children = geotoolkit.util.Iterator.toArray(track.getChildren());
        var i;
        switch (direction) {
            case 'Forward': {
                for (i = idx + 1; i < track.getChildrenCount(); i++) {
                    if (isRegularVisual(children[i])) {
                        return {
                            'index': i,
                            'order': geotoolkit.scene.CompositeNode.NodeOrder.After
                        };
                    }
                }
                break;
            }
            case 'Backward': {
                for (i = idx - 1; i > 0; i--) {
                    if (isRegularVisual(children[i])) {
                        return {
                            'index': i,
                            'order': geotoolkit.scene.CompositeNode.NodeOrder.Before
                        };
                    }
                }
                break;
            }
            case 'First': {
                for (i = 0; i < idx; i++) {
                    if (isRegularVisual(children[i])) {
                        return {
                            'index': i,
                            'order': geotoolkit.scene.CompositeNode.NodeOrder.Before
                        };
                    }
                }
                break;
            }
            case 'Last': {
                for (i = track.getChildrenCount(); i > idx; i--) {
                    if (isRegularVisual(children[i])) {
                        return {
                            'index': i,
                            'order': geotoolkit.scene.CompositeNode.NodeOrder.After
                        };
                    }
                }
                break;
            }
        }
        return null;
    }

    function changeZIndex (direction) {
        var visual = window._wellLogWidget.getSelectedVisuals().pop();
        if (visual instanceof geotoolkit.welllog.LogAbstractVisual) {
            var track = visual.getTrack();
            var idx = getNewVisualIndexAndOrder(visual, track, direction);
            if (idx === null) return;
            track.changeChildOrder(visual, idx.order, track.children[idx.index]);
        }
    }

    var contextMenu = {
        rect: new geotoolkit.util.Rect(),
        getElement: function () {
            return document.getElementsByClassName('context-menu-list')[0];
        },
        setLayerEventsPropagate: function () {
            var layer = document.getElementById('context-menu-layer');
            if (layer != null) layer.style.pointerEvents = 'none';
        },
        isOverMenu: function (x, y) {
            return !contextMenu.rect.isEmpty() && contextMenu.rect.contains(x, y);
        },
        show: showContextMenu,
        hide: hideContextMenu,
        init: initContextMenu
    };

    function initContextMenu () {
        $.contextMenu({
            'trigger': 'none',
            'selector': '#geotoolkit-plot',
            'reposition': true,
            'autoHide': false,
            'events': {
                'show': function () {
                    var selection = window._wellLogWidget.getToolByName('pick').getSelection();
                    return selection.some(function (shape) {
                        return shape instanceof geotoolkit.welllog.LogAbstractVisual ||
                               shape instanceof geotoolkit.welllog.LogTrack;
                    });
                },
                'activated': function () {
                    contextMenu.setLayerEventsPropagate();
                }
            },
            'callback': function (key) {
                switch (key) {
                    case 'delete': deleteSelection(); break;
                    case 'properties': showPropertiesDialogForSelection(window._wellLogWidget.getToolByName('pick').getSelection()); break;
                    default: changeZIndex(key); break;
                }
            },
            'items': {
                'Forward': {name: 'Move visual up', icon: 'up'},
                'Backward': {name: 'Move visual down', icon: 'down'},
                'Last': {name: 'Visual on top', icon: 'top'},
                'First': {name: 'Visual on bottom', icon: 'bottom'},
                'sep0': '---------',
                'delete': {name: 'Delete', icon: 'delete'},
                'properties': {name: 'Properties', icon: 'properties'}
            }
        });
    }

    function showContextMenu (x, y) {
        $('#geotoolkit-plot').contextMenu({x: x, y: y});
        var menu = contextMenu.getElement();
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        contextMenu.rect.setRect({
            x: menu.offsetLeft,
            y: menu.offsetTop,
            width: menu.offsetWidth,
            height: menu.offsetHeight
        });
    }
    function hideContextMenu () {
        $('#geotoolkit-plot').contextMenu('hide');
        contextMenu.rect.setRect(0, 0, 0, 0);
    }

    function afterLoadData(datasource){

        window._wellLogWidget = createWellLogWidget(datasource);
        window._navigationWidget = createNavigationWidget(window._wellLogWidget);
        window._annotationsOverlay = createAnnotationsOverlay(window._wellLogWidget);

        window._plot = new geotoolkit.plot.Plot({
            'canvasElement': document.getElementById('geotoolkit-plot'),
            'root': new geotoolkit.scene.Group()
                .setAutoModelLimitsMode(true)
                .setLayout(new geotoolkit.layout.CssLayout())
                .addChild([
                    window._wellLogWidget.setLayoutStyle({
                        'left': 50,
                        'top': 0,
                        'right': 0,
                        'bottom': 0
                    }, true),
                    window._navigationWidget.setLayoutStyle({
                        'left': 5,
                        'top': 5,
                        'width': 40,
                        'bottom': 5
                    }, true)
                ]),
            'autoSize': false,
            'autoRootBounds': true
        });
        var host = $('#geotoolkit-plot-host');
        window._plot.setSize(host.width(), host.height());

        window._navigationWidget.fitToHeight();
        window._navigationTool.setVisibleDepthLimits(window._wellLogWidget.getVisibleDepthLimits());

        window._navigationTool.addListener(geotoolkit.welllog.widgets.tools.Navigation.Events.DepthRangeChanged,
            function (sender, eventArgs) {
                window._wellLogWidget.setVisibleDepthLimits(eventArgs['limits']);
            });

        var setVisibleDepthLimits = function () {
            window._navigationTool.setVisibleDepthLimits(window._wellLogWidget.getVisibleDepthLimits());
        };
        window._wellLogWidget.on(geotoolkit.welllog.widgets.WellLogWidget.Events.DepthRangeChanged, setVisibleDepthLimits);
        var setDepthLimits = function () {
            window._navigationWidget
                .setDepthLimits(window._wellLogWidget.getDepthLimits())
                .fitToHeight();
        };
        window._wellLogWidget.on(geotoolkit.welllog.widgets.WellLogWidget.Events.DepthRangeChanged, setDepthLimits);
        window._wellLogWidget.on(geotoolkit.welllog.widgets.WellLogWidget.Events.VisibleDepthLimitsChanged, setVisibleDepthLimits);


        // init tools container to support interactions with widget
        window._wellLogWidget.connectTool(new geotoolkit.controls.tools.DOMSupport()
            .setNodeFilter(function (nodes) {
                return nodes.filter(function (node) {
                    return node instanceof geotoolkit.welllog.LogCurve ||
                        node instanceof geotoolkit.welllog.LogTrack;
                });
            }));

        contextMenu.init();
        window.addEventListener('pointermove', function (args) {
            window._wellLogWidget.getToolByType(geotoolkit.controls.tools.DOMSupport).setEnabled(!contextMenu.isOverMenu(args.clientX, args.clientY));
        });

        window._wellLogWidget.getToolByName('pick')
            .addListener(geotoolkit.controls.tools.Selection.Events.onSelectionEnd, function (sender, eventArgs) {
                if (eventArgs.getSelection().length === 0) {
                    contextMenu.hide();
                    return;
                }
                var native = eventArgs.getNativeEventArgs();
                if (native.button === 2) contextMenu.show(native.x, native.y);
                else contextMenu.hide();
            });

        new geotoolkit.controls.tools.ToolsContainer(window._plot)
            .add(window._wellLogWidget.getTool())
            .add(window._navigationWidget.getTool());

        window._wellLogWidget.setCss(new geotoolkit.css.CssStyle(
            {
                'css': [
                    '.geotoolkit.welllog.LogCurve:hover {',
                    '   linestyle-width: 3;',
                    '}',
                    '.geotoolkit.welllog.LogCurve:highlight {',
                    '   linestyle-width: 3;',
                    '}',
                    '.geotoolkit.welllog.LogTrack:hover {',
                    '   fillstyle: rgba(255,232,166,0.2);',
                    '}',
                    '.geotoolkit.welllog.LogTrack:highlight {',
                    '   fillstyle: rgba(255,232,166,0.2);',
                    '   linestyle-color: rgba(255,232,166,1);',
                    '   linestyle-width: 2;',
                    '}',
                    '.geotoolkit.welllog.LogTrack:highlight {',
                    '   fillstyle: rgba(255,232,166,0.2);',
                    '   linestyle-color: rgba(255,232,166,1);',
                    '   linestyle-width: 2;',
                    '}',
                    '.geotoolkit.welllog.header.LogVisualHeader:highlight {',
                    '   fillstyle: rgba(255,232,166,0.2);',
                    '   borderlinestyle-color: rgba(255,232,166,1);',
                    '   borderlinestyle-width: 2;',
                    '}'
                ].join('')
            }
        ));

        window._wellLogPreview = new WellLogPreview(
            document.getElementById('geotoolkit-preview-plot'), window._wellLogWidget, window._annotationsOverlay);

        initGUI();
        updateCurvesList();
    }

    var init = function () {
        axios.get('http://localhost:5000/df', {
        })
        .then(function(_result) {
            df = _result.data
            cols = []
            colsdata = []
            for (col in df){
                cols.push({'name': col,'type': 'number', 'unit': 'ft'})
                colsdata.push(Object.values(df[col]))
            }
            startIndex = df['measured_depth'][0]
            endIndex = df['measured_depth'][Object.values(df['measured_depth']).length-1]
            var meta =  {
                range: new geotoolkit.util.Range(startIndex, endIndex),
                index: "measured_depth"
            }
            console.log(Object.values(colsdata[0]))
            datasource = new geotoolkit.data.DataTable({cols:cols,colsdata:colsdata,meta:meta});
            afterLoadData(datasource)
        })
    };

    var toggleDragAndDrop = function () {
        if (window._wellLogWidget == null) {
            return;
        }
        window._wellLogWidget.getToolByName('drag-and-drop').toggle();
    };

    var toggleAnnotationTool = function () {
        if (window._wellLogWidget == null) {
            return this;
        }
        var overlay = window._annotationsOverlay;
        if (overlay.getEnabled()) {
            // turn it off and disable creating mode
            overlay.setEnabled(false)
                .setOptions({
                    'cancreate': false
                });
        } else {
            // activate
            overlay.setEnabled(true);
            // if there is no annotations at all, then activate ['cancreate'] mode
            if (overlay.getAnnotations().hasNext() === false) {
                overlay.setOptions({
                    'cancreate': true
                });
            }
        }
        return this;
    };

    var createNewAnnotation = function () {
        if (window._wellLogWidget == null) {
            return this;
        }
        var overlay = window._annotationsOverlay;
        if (overlay.getEnabled()) {
            // if it already enabled then reverse ['cancreate'] options
            overlay.setOptions({
                'cancreate': !overlay.getOptions()['cancreate']
            });
        } else {
            // if it disabled then activate and enable creation
            overlay.setEnabled(true)
                .setOptions({
                    'cancreate': true
                });
        }
        return this;
    };

    var zoomIn = function () {
        if (window._wellLogWidget != null) {
            window._wellLogWidget.scale(2);
        }
    };

    var zoomOut = function () {
        if (window._wellLogWidget != null) {
            window._wellLogWidget.scale(0.5);
        }
    };

    var exportToPDF = function () {
        if (WarningDialog.isChromeAndLocal()) {
            if (this._warningDialog == null) {
                this._warningDialog = new WarningDialog({});
            }
            this._warningDialog.show();
            return;
        }
        if (_pdfDialog == null) {
            _pdfDialog = new PrintDialog({
                'drawWestToEast': false
            });
            _pdfDialog.on('saved', function (event, sender, settings) {
                var annotationEnabled = window._annotationsOverlay.getEnabled();
                window._annotationsOverlay.setEnabled(false);

                // Export visible part for now
                var limits = window._wellLogWidget.getDepthLimits();
                // disable all compression or speed.
                var browserInfo = new geotoolkit.util.BrowserInfo();
                // firefox has a bad performance with compression
                var compression = browserInfo['isFirefox'] !== true;

                window._wellLogWidget.exportToPdf({
                    'output': 'Widget',
                    'printsettings': settings['printsettings'],
                    'limits': {
                        'start': limits.getLow(),
                        'end': limits.getHigh()
                    },
                    'header': new geotoolkit.scene.exports.HeaderComponent(600, 20, 'PDF Output'),
                    'footer': new geotoolkit.scene.exports.FooterComponent(600, 20),
                    'imagecompression': {
                        'mode': geotoolkit.pdf.ImageCompression.NONE
                    },
                    'streamcompression': compression
                }).catch(function (fail) {
                    WarningDialog.showError(fail.message);
                });

                window._annotationsOverlay.setEnabled(annotationEnabled);
            });
        }
        _pdfDialog.show();
    };

    var exportToCGM = function () {
        window._wellLogWidget.setExportDepthLimits(window._wellLogWidget.getDepthLimits());

        var options = {
            'filename': 'welllog.cgm',
            'type': 'cgm'
        };
        var cgmStream = new geotoolkit.util.stream.BinaryStream();
        cgmStream.setSaveOptions(options);
        var exporter = new geotoolkit.cgm.CgmExport();
        exporter.exportToCgmStream(window._wellLogWidget, cgmStream, null, options);
        cgmStream.save();
    };

    var showProperties = function () {
        if ($('#PropertiesButton').hasClass('disabled')) {
            return;
        }

        var selection = null;
        // Is Annotation Mode?
        if (window._annotationsOverlay.getEnabled()) {
            window._annotationsOverlay.editAnnotation(null);
            selection = window._annotationsOverlay.getActiveAnnotation();
        }

        if (selection == null) {
            selection = window._wellLogWidget.getSelectedVisuals();
            if (selection == null || selection.length === 0) {
                selection = window._wellLogWidget.getSelectedTracks();
            }
        }

        selection = (selection == null) ? [] : (Array.isArray(selection) ? selection : [selection]);
        showPropertiesDialogForSelection(selection);
    };
    var setOrientation = function (orientation) {
        window._wellLogPreview.buildDocumentView();

        if (orientation === geotoolkit.util.Orientation.Horizontal) {
            $('#horizontalModeButton').hide();
            $('#verticalModeButton').show();

            window._wellLogWidget.setLayoutStyle({
                'left': 0,
                'top': 0,
                'right': 0,
                'bottom': window._navigationWidget.getVisible() ? 50 : 0
            });
            window._navigationWidget.setLayoutStyle({
                'left': 5,
                'right': 5,
                'top': null,
                'width': null,
                'height': 40,
                'bottom': 5
            });
        } else {
            $('#horizontalModeButton').show();
            $('#verticalModeButton').hide();

            window._wellLogWidget.setLayoutStyle({
                'left': window._navigationWidget.getVisible() ? 50 : 0,
                'top': 0,
                'right': 0,
                'bottom': 0
            });
            window._navigationWidget.setLayoutStyle({
                'left': 5,
                'top': 0,
                'right': null,
                'width': 40,
                'bottom': 5
            });
        }
        window._wellLogWidget.getRoot().updateLayout();
        window._wellLogWidget.setOrientation(orientation);
        window._navigationWidget.setOrientation(orientation);
        // window._wellLogWidget.getRoot().updateLayout();
        window._navigationWidget.fitToHeight();
        window._navigationTool.setVisibleDepthLimits(window._wellLogWidget.getVisibleDepthLimits());

        window._annotationsOverlay.setOrientation(orientation);
    };

    var toggleOrientation = function () {
        var orientationBtn = $('#OrientationButton span.glyphicon');
        if (orientationBtn.hasClass('glyphicon-object-align-left')) {
            setOrientation(geotoolkit.util.Orientation.Horizontal);
        } else if (orientationBtn.hasClass('glyphicon-object-align-top')) {
            setOrientation(geotoolkit.util.Orientation.Vertical);
        }

        orientationBtn.toggleClass('glyphicon-object-align-left');
        orientationBtn.toggleClass('glyphicon-object-align-top');
    };

    var saveTemplateToFile = function () {
        if (window._wellLogWidget == null) {
            return;
        }
        var template, data, fileName = 'int_template.json';
        try {
            template = window._wellLogWidget.saveTemplate();
            data = new Blob([template], {type: 'text/plain'});

            // IE SUPPORT
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(data, fileName);
                return;
            }

            // MOZ CHROME SUPPORT
            var file = window.URL.createObjectURL(data);

            var save = document.createElement('a');
            save.href = file;
            save.target = '_blank';
            save.download = fileName;
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            save.dispatchEvent(evt);
            setTimeout(function () {
                window.URL.revokeObjectURL(file);// remove previous objecturl
            }, 2000);
        } catch (e) {
            geotoolkit.warn('ERROR cannot save the template');
            return;
        }
    };

    var $input = null;
    var getAsText = function (file, callback) {
        var reader = new FileReader();
        reader.readAsText(file, 'utf-8');

        reader.onerror = function () {
            geotoolkit.warn('ERROR cannot read the file');
        };
        reader.onload = callback;
    };
    var loadTemplateFromFile = function () {
        var callback = function () {
            if (window._wellLogWidget != null) {
                try {
                    var orientation = window._wellLogWidget.getOrientation();

                    var files = $(this)[0].files;
                    if (files == null || files.length === 0) {
                        return;
                    }
                    getAsText(files[0], function (event) {
                        if (event == null) {
                            return;
                        }
                        var template = event.target.result;
                        window._wellLogWidget.loadTemplate(template);
                        window._wellLogPreview.buildDocumentView();

                        // validate orientation
                        if (orientation !== window._wellLogWidget.getOrientation()) {
                            setOrientation(window._wellLogWidget.getOrientation());
                        }

                        window._annotationsOverlay = createAnnotationsOverlay(window._wellLogWidget);
                    });
                } catch (e) {
                    geotoolkit.warn('ERROR cannot load the template');
                }
            }
            $input.off('change');
            $input.remove();
            $input = null;
        };
        if ($input == null) {
            $('#geotoolkit-plot-host')
                .append($('<input id="tpl" type="file" style="position: absolute; visibility: hidden;" accept=".json"/>'));

            $input = $('input[id=tpl]');
            $input.on('change', callback);
        }
        $input.trigger('click');
    };
    var saveTemplateToLocalStorage = function () {
        if (window._wellLogWidget == null) {
            return;
        }
        var template;
        try {
            template = window._wellLogWidget.saveTemplate();
        } catch (e) {
            geotoolkit.warn('ERROR cannot save the template');
            return;
        }
        localStorage.setItem('template_saved', template);
    };

    var loadTemplateFromLocalStorage = function () {
        if (window._wellLogWidget == null) {
            return;
        }
        var template;
        try {
            template = localStorage.getItem('template_saved');
            window._wellLogWidget.loadTemplate(template);
        } catch (e) {
            geotoolkit.warn('ERROR cannot load the template');
            return;
        }
    };

    var toggleNavigation = function () {
        window._navigationWidget.setVisible(!window._navigationWidget.getVisible());
        window._wellLogPreview.setVisible(!window._wellLogPreview.getVisible());

        window._wellLogWidget.setLayoutStyle({
            'left': window._wellLogWidget.getOrientation() === geotoolkit.util.Orientation.Vertical && window._navigationWidget.getVisible() ? 50 : 0,
            'top': 0,
            'right': 0,
            'bottom': window._wellLogWidget.getOrientation() === geotoolkit.util.Orientation.Horizontal && window._navigationWidget.getVisible() ? 50 : 0
        });
        window._wellLogWidget.getRoot().updateLayout();
    };

    (function () {
        // for data sources
        geotoolkit.applyImplementations(true);
    })();

    return {
        'init': init,
        'resize': resize,
        'zoomIn': zoomIn,
        'zoomOut': zoomOut,
        'addTrack': addTrack,
        'toggleDragAndDrop': toggleDragAndDrop,

        'createNewAnnotation': createNewAnnotation,
        'toggleAnnotationTool': toggleAnnotationTool,
        'exportToPDF': exportToPDF,
        'exportToCGM': exportToCGM,
        'deleteSelection': deleteSelection,
        'showProperties': showProperties,
        'saveTemplateToFile': saveTemplateToFile,
        'loadTemplateFromFile': loadTemplateFromFile,
        'saveTemplateToLocalStorage': saveTemplateToLocalStorage,
        'loadTemplateFromLocalStorage': loadTemplateFromLocalStorage,

        'toggleNavigation': toggleNavigation,
        'toggleOrientation': toggleOrientation
    };
});
