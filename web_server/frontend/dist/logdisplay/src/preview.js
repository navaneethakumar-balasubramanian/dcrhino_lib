/**
 * Copyright: Copyright (c) 2013 by INT, Inc.  All rights reserved.<br>
 * Company: INT, Inc. <br>
 * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.<br>
 */

define(['modellimitsmanipulator', 'annotationsmanipulator', 'geotoolkit.welllog.widgets'], function (ModelLimitsManipulator, AnnotationsManipulator) {
    var DEFAULT_WIDTH = 186;
    var DEFAULT_HEIGHT = 196;

    var getAnnotationOptions = function (iAnnotation) {
        var DEFAULT_FILL_COLOR = '#fdd835';
        var DEFAULT_LINE_COLOR = '#1565c0';
        var options = geotoolkit.mergeObjects(iAnnotation.getOptions(), {
            'textstyle': {
                'color': 'black',
                'alignment': 'left',
                'font': '12px Arial',
                'baseLine': 'top'
            },
            'fillstyle': DEFAULT_FILL_COLOR,
            'linestyle': DEFAULT_LINE_COLOR
        });
        return options;
    };

    var WellLogPreview = function (canvas, wellLogWidget, annotationsOverlay) {
        this._wellLogWidget = wellLogWidget;
        this._annotationsOverlay = annotationsOverlay;
        this._visible = true;

        this._documentViewDiv = $(canvas).parent();
        this._documentViewCanvas = canvas;
        this._documentViewPlot = null;
        this._documentViewContainer = null;
        this._documentViewManipulatorLayer = null;
        this._modelLimitsManipulator = null;
        this._previewImage = null;

        this._buildDocumentView = this.buildDocumentView.bind(this);
        this._updateDocumentViewVisibleLimits = this.updateDocumentViewVisibleLimits.bind(this);

        this.initializePlot(canvas);
    };
    geotoolkit.setClassName(WellLogPreview, 'LogDemo.WellLogPreview');

    WellLogPreview.prototype.setVisible = function (visible) {
        if (this._visible !== visible) {
            this._visible = visible;
            if (this._visible) {
                $(this._documentViewDiv).show();
            } else {
                $(this._documentViewDiv).hide();
            }
        }
        return this;
    };

    WellLogPreview.prototype.getVisible = function () {
        return this._visible;
    };

    WellLogPreview.prototype.initializePlot = function (canvas) {
        this._documentViewPlot = new geotoolkit.plot.Plot({
            'canvasElement': canvas, // document.getElementById("WellLogWidgetDocumentView"),
            'root': new geotoolkit.scene.Group()
                .setAutoModelLimitsMode(true)
                .setLayout(new geotoolkit.layout.CssLayout())
                .addChild([
                    this._documentViewContainer = new geotoolkit.scene.Group()
                        .setLayoutStyle({
                            'left': 0,
                            'top': 0,
                            'right': 0,
                            'bottom': 0
                        }),

                    this._documentViewManipulatorLayer = new geotoolkit.scene.Group()
                        .setLayoutStyle({
                            'left': 0,
                            'top': 0,
                            'right': 0,
                            'bottom': 0
                        }),

                    this._documentViewAnnotationsManipulatorLayer = new geotoolkit.scene.Group()
                        .setLayoutStyle({
                            'left': 0,
                            'top': 0,
                            'right': 0,
                            'bottom': 0
                        }),

                    this._documentViewAnnotationsLayer = new geotoolkit.scene.Group()
                        .setLayoutStyle({
                            'left': 0,
                            'top': 0,
                            'right': 0,
                            'bottom': 0
                        })
                ]),
            'autoSize': false,
            'autoRootBounds': true
        })
            .setSize(DEFAULT_WIDTH, DEFAULT_HEIGHT);

        // TODO - add new event for horizontal panning geotoolkit.welllog.widgets.WellLogWidget.Events.VisibleLimitsChanged
        /* temp solution - begin*/
        this._wellLogWidget.getToolByName('pick')
            .addListener(geotoolkit.controls.tools.Selection.Events.onSelectionChanged, this._buildDocumentView);

        this._wellLogWidget.getToolByName('pinchtozoom')
            .addListener(geotoolkit.controls.tools.PinchToZoom.Events.onZoom, this._updateDocumentViewVisibleLimits);
        this._wellLogWidget.getToolByName('HeaderPanning')
            .addListener(geotoolkit.controls.tools.Panning.Events.onPanning, this._updateDocumentViewVisibleLimits);
        this._wellLogWidget.getToolByName('TrackPanning')
            .addListener(geotoolkit.controls.tools.Panning.Events.onPanning, this._updateDocumentViewVisibleLimits);

        this._wellLogWidget.getToolByName('HorizontalPlotScroll')
            .addListener(geotoolkit.controls.tools.scroll.AbstractScroll.Events.onScroll, this._updateDocumentViewVisibleLimits);
        /* temp solution - end*/

        this._wellLogWidget.on(geotoolkit.welllog.widgets.WellLogWidget.Events.TracksSizeChanged, this._buildDocumentView);
        this._wellLogWidget.on(geotoolkit.welllog.widgets.WellLogWidget.Events.VisibleDepthLimitsChanged, this._updateDocumentViewVisibleLimits);

        new geotoolkit.controls.tools.ToolsContainer(this._documentViewPlot)
            .add(new geotoolkit.controls.tools.CompositeTool(this._documentViewManipulatorLayer, 'manipulatorTool')
                .add([
                    this._annotationsManipulator = new AnnotationsManipulator(this._wellLogWidget,
                        this._documentViewAnnotationsManipulatorLayer, this._annotationsOverlay),
                    this._modelLimitsManipulator = new ModelLimitsManipulator(this._wellLogWidget, this._documentViewManipulatorLayer)
                ]));

        this.buildDocumentView();
    };

    WellLogPreview.prototype.buildDocumentView = function () {
        var annotations = this._annotationsOverlay.getVisible();
        this._annotationsOverlay.setVisible(false);

        var manipulatorLayer = this._wellLogWidget.getToolByName('cross-hair').getManipulatorLayer();
        manipulatorLayer.setVisible(false);
        geotoolkit.selection.from(this._wellLogWidget)
            .where(function (node) {
                return node instanceof geotoolkit.welllog.LogMarker;
            })
            .select(function (marker) {
                marker
                    .setTag(marker.getProperties())
                    .setVisibleNameLabel(false)
                    .setVisibleDepthLabel(false)
                ;
            });


        var trackContainer = this._wellLogWidget.getTrackContainer();
        var containerBounds = trackContainer.getBounds();

        var track = null;
        if (this._wellLogWidget.getTracksCount() > 0) {
            track = this._wellLogWidget.getTrackAt(this._wellLogWidget.getTracksCount() - 1);
        }
        if (track != null && track.getBounds().getRight() < containerBounds.getRight()) {
            containerBounds = containerBounds.clone().setWidth(track.getBounds().getRight());
        }
        if (containerBounds == null ||
            containerBounds.getWidth() === 0 ||
            containerBounds.getHeight() === 0) {
            //container is empty
            if (this._previewImage != null) {
                this._previewImage.setVisible(false);
            }
            return;
        }

        if (this._documentViewPlot.getCanvasWidth() > 0 && this._documentViewPlot.getCanvasHeight() > 0) {
            var localTransformation = trackContainer.getLocalTransform();
            var containerCache = trackContainer.getCache();
            trackContainer.setCache(null, false)
                .setLocalTransform(null);

            var base64image = geotoolkit.scene.exports.NodeExport.exportToImageUrl(trackContainer,
                this._documentViewPlot.getCanvasWidth(), this._documentViewPlot.getCanvasHeight(),
                false, false, containerBounds);

            if (this._previewImage == null) {
                this._documentViewContainer.addChild([
                    this._previewImage = new geotoolkit.scene.shapes.Image(0, 0, base64image)
                ]);
            } else {
                this._previewImage.setProperties({
                    'url': base64image
                })
                    .setVisible(true);
            }
            trackContainer.setLocalTransform(localTransformation)
                .setCache(containerCache, false);
        }

        this.updateAnnotations();
        this.updateDocumentViewVisibleLimits();

        geotoolkit.selection.from(this._wellLogWidget)
            .where(function (node) {
                return node instanceof geotoolkit.welllog.LogMarker;
            })
            .select(function (marker) {
                marker.setProperties(marker.getTag());
            });

        manipulatorLayer.setVisible(true);
        this._annotationsOverlay.setVisible(annotations);
    };

    WellLogPreview.prototype.updateAnnotations = function () {
        this._documentViewAnnotationsLayer.clearChildren();
        var annotations = this._annotationsOverlay.getAnnotations();
        var identityTransformation = new geotoolkit.util.Transformation();
        annotations.forEach(function (annotation) {
            var anchor = annotation.getAnchor();
            var target = annotation.getTarget();
            var worldTransform = target.getWorldTransform() || identityTransformation;
            var targetPoint = worldTransform.transformPoint(anchor);
            var options = getAnnotationOptions(annotation);
            var annotationSymbol = new geotoolkit.scene.shapes.Symbol({
                'ax': targetPoint.getX(),
                'ay': targetPoint.getY(),
                'width': 8,
                'height': 8,
                'painter': geotoolkit.scene.shapes.painters.CirclePainter,
                'alignment': geotoolkit.util.AnchorType.Center,
                'linestyle': options['linestyle'],
                'fillstyle': options['fillstyle'],
                'sizeisindevicespace': true
            }).setTag(annotation);
            this._documentViewAnnotationsLayer.addChild(annotationSymbol);
        }.bind(this));
    };

    WellLogPreview.prototype.updateDocumentViewVisibleLimits = function () {
        if (this._wellLogWidget.getTracksCount() === 0) {
            this._modelLimitsManipulator.setVisibleModelLimits(null);
            return;
        }
        var trackContainer = this._wellLogWidget.getTrackContainer();
        var containerBounds = trackContainer.getBounds();
        var containerModelLimits = trackContainer.getModelLimits();
        var containerVisibleModelLimits = trackContainer.getVisibleModelLimits();
        var track = this._wellLogWidget.getTrackAt(this._wellLogWidget.getTracksCount() - 1);
        if (track != null && track.getBounds().getRight() < containerBounds.getRight()) {
            containerModelLimits = containerModelLimits.clone().setWidth(track.getBounds().getRight());
            containerVisibleModelLimits = containerVisibleModelLimits.clone().setWidth(track.getBounds().getRight());
        }

        this._documentViewAnnotationsLayer.setModelLimits(containerModelLimits.clone());
        this._documentViewAnnotationsManipulatorLayer.setModelLimits(containerModelLimits.clone());

        this._documentViewManipulatorLayer.setModelLimits(containerModelLimits.clone());
        this._modelLimitsManipulator.setVisibleModelLimits(containerVisibleModelLimits);
    };

    return WellLogPreview;
});
