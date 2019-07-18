/**
 * Copyright: Copyright (c) 2013 by INT, Inc.  All rights reserved.<br>
 * Company: INT, Inc. <br>
 * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.<br>
 */

define(['geotoolkit.welllog.widgets'], function () {
    var ModelLimitsManipulator = function (wellLogWidget, manipulatorLayer) {
        var slots = {
            'mousewheel': this.onMouseWheel.bind(this),
            'wheel': this.onMouseWheel.bind(this),

            'pointerdown': this.onMouseDown.bind(this),
            'pointermove': [{
                'callback': this.onMouseMove.bind(this),
                'object': null
            },
            {
                'callback': this.onMouseMove.bind(this),
                'object': window,
                'enabled': false
            }
            ],
            'pointerup': [{
                'callback': this.onMouseUp.bind(this),
                'object': null
            },
            {
                'callback': this.onMouseUp.bind(this),
                'object': window,
                'enabled': false
            }
            ]

        };

        var config = {
            'slots': slots,
            'name': 'modelLimits-manipulator',
            'layer': manipulatorLayer
        };

        geotoolkit.controls.tools.AbstractTool.call(this, config);

        this._wellLogWidget = wellLogWidget;
        this._trackContainer = wellLogWidget.getTrackContainer();
        this._headerContainer = wellLogWidget.getHeaderContainer();
        this._footerContainer = wellLogWidget.getFooterContainer();
        this._manipulatorLayer = manipulatorLayer;

        this._manipulatorLayer.addChild([
            this._invisibleArea = new geotoolkit.scene.shapes.Rectangle({
                'left': 0,
                'top': 0,
                'right': 0,
                'height': 0,
                'visible': false, // default
                'linestyle': null,
                'fillstyle': 'rgba(100, 100, 100, 0.3)'
            }),

            this._manipulatorHandle = new geotoolkit.scene.shapes.Rectangle({
                'left': 0,
                'top': 0,
                'width': 0,
                'height': 0,
                'visible': false,
                'linestyle': {
                    'width': 1,
                    'color': 'gray',
                    'pixelsnapmode': {
                        'x': true,
                        'y': true
                    }
                },
                'fillstyle': {
                    'color': 'rgba(0,0,0,0)'
                }
            }),

            this._topResizeHandle = new geotoolkit.scene.shapes.Symbol({
                'visible': false,
                'ax': 0,
                'ay': 0,
                'width': 10,
                'height': 10,
                'alignment': geotoolkit.util.AnchorType.Center,
                'sizeisindevicespace': true,
                'painter': geotoolkit.scene.shapes.painters.CirclePainter,
                'linestyle': 'gray',
                'fillstyle': 'white'
            }),

            this._bottomResizeHandle = new geotoolkit.scene.shapes.Symbol({
                'visible': false,
                'ax': 0,
                'ay': 0,
                'width': 10,
                'height': 10,
                'alignment': geotoolkit.util.AnchorType.Center,
                'sizeisindevicespace': true,
                'painter': geotoolkit.scene.shapes.painters.CirclePainter,
                'linestyle': 'gray',
                'fillstyle': 'white'
            })
        ]);

        this._selector = new geotoolkit.selection.Selector();

        this._activeHandle = null;
        this._startPoint = new geotoolkit.util.Point(0, 0);
        this._movePoint = new geotoolkit.util.Point(0, 0);
        this._lastPoint = new geotoolkit.util.Point(0, 0);

        this._wheelSteps = 10;

        this.setEnabled(true);
    };
    geotoolkit.inherits(ModelLimitsManipulator, geotoolkit.controls.tools.AbstractTool);
    geotoolkit.setClassName(ModelLimitsManipulator, 'LogDemo.Tools.ModelLimitsManipulator');

    /**
     * @private
     * @param {boolean} value value
     */
    ModelLimitsManipulator.prototype.setWindowEventsEnabled = function (value) {
        this.setSlotEnabled('pointermove', value, window);
        this.setSlotEnabled('pointerup', value, window);
    };

    /**
     * @private
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs event args
     */
    ModelLimitsManipulator.prototype.start = function (eventArgs) {
        this._startPoint = this.pointToModel(this._manipulatorLayer.getRoot(), eventArgs);
        this._lastPoint = this.pointToModel(this._manipulatorLayer.getRoot(), eventArgs);
        eventArgs.stopPropagation();
        this.setActive(true);
        geotoolkit.controls.tools.AbstractTool.lock(eventArgs.getPlot(), this);

        this.setWindowEventsEnabled(true); // start listening to windows events.
        return this;
    };

    ModelLimitsManipulator.prototype.stop = function () {
        this.setActive(false);
        this.highlightHandle(null);
        geotoolkit.controls.tools.AbstractTool.unlock(this);
        this.setWindowEventsEnabled(false);
        return this;
    };

    /**
     * @private
     * @param {!Event} eventArgs event args
     */
    ModelLimitsManipulator.prototype.onMouseWheel = function (eventArgs) {
        var event = eventArgs.getNativeEventArgs();
        event.preventDefault();

        var yDirection = geotoolkit.util.Math.sign(event['deltaY'] !== undefined ? event['deltaY'] : -1 * event.wheelDelta);

        var modelStep = this._manipulatorLayer.getBounds().getHeight() / this._wheelSteps;
        var manipulatorTransformation = this._manipulatorHandle.getSceneTransform();
        var manipulatorDiffY = geotoolkit.util.GeometryUtil.getVectorLengthInModel(0, modelStep, manipulatorTransformation) * yDirection;

        var visibleModelLimits = this._manipulatorHandle.getTag();
        if (eventArgs.getNativeEventArgs().ctrlKey === true) {
            if ((visibleModelLimits.getHeight() + manipulatorDiffY > 0)) {
                visibleModelLimits.setHeight(visibleModelLimits.getHeight() + manipulatorDiffY);
            }
        } else {
            visibleModelLimits.setY(visibleModelLimits.getY() + manipulatorDiffY);
        }

        this._wellLogWidget.setVisibleDepthLimits(visibleModelLimits.getY(), visibleModelLimits.getBottom());
    };

    /**
     * get visible model limits
     * @returns {geotoolkit.util.Rect} modelLimits
     */
    ModelLimitsManipulator.prototype.getVisibleModelLimits = function () {
        return this._manipulatorHandle.getTag();
    };

    /**
     * set visible model limits
     * @param {geotoolkit.util.Rect} visibleModelLimits visible model limits
     * @returns {ModelLimitsManipulator}
     */
    ModelLimitsManipulator.prototype.setVisibleModelLimits = function (visibleModelLimits) {
        if (visibleModelLimits == null) {
            this._manipulatorHandle.setVisible(false);
            this._topResizeHandle.setVisible(false);
            this._bottomResizeHandle.setVisible(false);
            this._invisibleArea.setVisible(false);
            return this;
        }
        var manipulatorTransformation = this._manipulatorHandle.getSceneTransform();
        var borderModelWidth = geotoolkit.util.GeometryUtil.getVectorLengthInModel(1, 0, manipulatorTransformation);
        var borderModelHeight = geotoolkit.util.GeometryUtil.getVectorLengthInModel(0, 1, manipulatorTransformation);

        // in tag property we will store the real model limits
        this._manipulatorHandle.setTag(visibleModelLimits.clone());
        // adjust model limits to display right and bottom border
        visibleModelLimits = visibleModelLimits.clone()
            .setWidth(visibleModelLimits.getWidth() - borderModelWidth)
            .setHeight(visibleModelLimits.getHeight() - borderModelHeight);


        var modelLimits = this._manipulatorLayer.getModelLimits();
        var clipArea = new geotoolkit.renderer.GraphicsPath()
            .moveTo(modelLimits.getLeft(), modelLimits.getTop())
            .lineTo(modelLimits.getRight(), modelLimits.getTop())
            .lineTo(modelLimits.getRight(), modelLimits.getBottom())
            .lineTo(modelLimits.getLeft(), modelLimits.getBottom())
            .lineTo(modelLimits.getLeft(), modelLimits.getTop())
            .close()
            .moveTo(visibleModelLimits.getLeft(), visibleModelLimits.getTop())
            .lineTo(visibleModelLimits.getLeft(), visibleModelLimits.getBottom())
            .lineTo(visibleModelLimits.getRight(), visibleModelLimits.getBottom())
            .lineTo(visibleModelLimits.getRight(), visibleModelLimits.getTop())
            .lineTo(visibleModelLimits.getLeft(), visibleModelLimits.getTop())
            .close();
        this._invisibleArea
            .setBounds(this._manipulatorLayer.getModelLimits())
            .setVisible(true)
            .setClipStyle(new geotoolkit.attributes.ClipStyle(clipArea));

        this._manipulatorHandle.setBounds(visibleModelLimits)
            .setVisible(true);

        this._topResizeHandle.setAnchor(visibleModelLimits.getCenterX(), visibleModelLimits.getTop())
            .setVisible(true);
        this._bottomResizeHandle.setAnchor(visibleModelLimits.getCenterX(), visibleModelLimits.getBottom())
            .setVisible(true);
        return this;
    };

    /**
     * @private
     * @param {geotoolkit.scene.shapes.Shape} handle shape handle
     * @returns {ModelLimitsManipulator}
     */
    ModelLimitsManipulator.prototype.highlightHandle = function (handle) {
        if (this._activeHandle === handle) {
            return this;
        }
        if (this._activeHandle != null &&
            this._activeHandle instanceof geotoolkit.scene.shapes.Symbol) {
            this._activeHandle.setFillStyle('white');
        }

        this._activeHandle = handle;

        if (this._activeHandle != null &&
            this._activeHandle instanceof geotoolkit.scene.shapes.Symbol) {
            this._activeHandle.setFillStyle('gray');
        }
        return this;
    };

    /**
     * @private
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs event args
     */
    ModelLimitsManipulator.prototype.onMouseMove = function (eventArgs) {
        if (this.isEnabled() === false) {
            return;
        }

        if (this.isActive() && this._activeHandle != null) {
            this._movePoint = this.pointToModel(this._manipulatorLayer.getRoot(), eventArgs);
            var diffX = this._movePoint.getX() - this._lastPoint.getX();
            var diffY = this._movePoint.getY() - this._lastPoint.getY();
            if (diffX === 0 && diffY === 0) {
                return;
            }
            this._lastPoint = this._movePoint;

            var manipulatorTransformation = this._activeHandle.getSceneTransform();
            var manipulatorDiffX = geotoolkit.util.GeometryUtil.getVectorLengthInModel(diffX, 0, manipulatorTransformation) * geotoolkit.util.Math.sign(diffX);
            var manipulatorDiffY = geotoolkit.util.GeometryUtil.getVectorLengthInModel(0, diffY, manipulatorTransformation) * geotoolkit.util.Math.sign(diffY);

            var visibleModelLimits = this._manipulatorHandle.getTag();
            if (this._activeHandle === this._manipulatorHandle) {
                visibleModelLimits.setX(visibleModelLimits.getX() + manipulatorDiffX)
                    .setY(visibleModelLimits.getY() + manipulatorDiffY);

                var oldLimits = this._wellLogWidget.getVisibleDepthLimits();
                this._trackContainer.translate(-manipulatorDiffX, 0).adjustPosition();
                this._headerContainer.translate(-manipulatorDiffX, 0).adjustPosition();
                this._footerContainer.translate(-manipulatorDiffX, 0).adjustPosition();

                this._wellLogWidget.setVisibleDepthLimits(visibleModelLimits.getY(), visibleModelLimits.getBottom());
                var newLimits = this._wellLogWidget.getVisibleDepthLimits();
                this._wellLogWidget.notify(geotoolkit.welllog.widgets.WellLogWidget.Events.VisibleDepthLimitsChanged, this, {
                    'old': oldLimits,
                    'new': newLimits
                });
            } else {
                if (this._activeHandle === this._topResizeHandle) {
                    visibleModelLimits.setY(visibleModelLimits.getY() + manipulatorDiffY)
                        .setHeight(visibleModelLimits.getHeight() - manipulatorDiffY);
                } else {
                    visibleModelLimits.setHeight(visibleModelLimits.getHeight() + manipulatorDiffY);
                }

                this._wellLogWidget.setVisibleDepthLimits(visibleModelLimits.getY(), visibleModelLimits.getBottom());
            }
        } else {
            var handle = this.findHandle(eventArgs);
            if (handle == null || handle.getTag() == null) {
                this.highlightHandle(handle);
            }
        }

        eventArgs.stopPropagation();
    };

    /**
     * Find handle
     * @private
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs event args
     * @returns {geotoolkit.scene.shapes.Shape}
     */
    ModelLimitsManipulator.prototype.findHandle = function (eventArgs) {
        var targetPoint = this.pointToModel(this._manipulatorLayer.getRoot(), eventArgs);
        var nodes = this._selector.select(this._manipulatorLayer.getRoot(), targetPoint.x, targetPoint.y, 2);

        var handle = null;
        for (var i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i] === this._manipulatorHandle ||
                nodes[i] instanceof geotoolkit.scene.shapes.Symbol) {
                handle = nodes[i];
                break;
            }
        }
        return handle;
    };

    /**
     * @private
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs events args
     */
    ModelLimitsManipulator.prototype.onMouseDown = function (eventArgs) {
        if (this.isEnabled() === false) {
            return;
        }
        if (this._activeHandle == null) {
            this.highlightHandle(this.findHandle(eventArgs));
        }
        if (this._activeHandle != null) {
            this.start(eventArgs);
        }
    };

    /**
     * @private
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs events args
     */
    ModelLimitsManipulator.prototype.onMouseUp = function (eventArgs) {
        if (this.isEnabled() === false) {
            return;
        }
        if (this.isActive() != null) {
            this.stop();
            if (this.isTouchEvent(eventArgs) === false) {
                this.onMouseMove(eventArgs);
            }
        }
    };

    geotoolkit.obfuscate(ModelLimitsManipulator, geotoolkit.controls.tools.AbstractTool);
    return ModelLimitsManipulator;
});
