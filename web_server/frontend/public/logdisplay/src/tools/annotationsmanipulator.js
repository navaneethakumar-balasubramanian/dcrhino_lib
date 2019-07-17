/**
 * Copyright: Copyright (c) 2013 by INT, Inc.  All rights reserved.<br>
 * Company: INT, Inc. <br>
 * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.<br>
 */

define(['geotoolkit.welllog.widgets'], function () {
    var AnnotationsManipulator = function (wellLogWidget, manipulatorLayer, annotationsOverlay) {
        var slots = {
            'pointermove': this.onMouseMove.bind(this),
            'pointerdown': this.onMouseDown.bind(this),
            'pointerup': this.onMouseUp.bind(this)
        };

        var config = {
            'slots': slots,
            'name': 'annotations-manipulator',
            'layer': null
        };

        geotoolkit.controls.tools.AbstractTool.call(this, config);

        this._wellLogWidget = wellLogWidget;
        this._annotationsOverlay = annotationsOverlay;
        this._manipulatorLayer = manipulatorLayer;
        this._trackContainer = wellLogWidget.getTrackContainer();

        this._selector = new geotoolkit.selection.Selector();

        this._activeHandle = null;
        this._manipulatorLayer.addChild([
            this._annotationHandle = new geotoolkit.scene.shapes.Symbol({
                'ax': 0,
                'ay': 0,
                'width': 14,
                'height': 14,
                'painter': geotoolkit.scene.shapes.painters.CirclePainter,
                'alignment': geotoolkit.util.AnchorType.Center,
                'linestyle': null,
                'fillstyle': null,
                'sizeisindevicespace': true
            }).setSelectable(false)
                .setVisible(false)
        ]);

        this._startPoint = new geotoolkit.util.Point(0, 0);
        this._movePoint = new geotoolkit.util.Point(0, 0);
        this._lastPoint = new geotoolkit.util.Point(0, 0);

        this.setEnabled(true);
    };
    geotoolkit.inherits(AnnotationsManipulator, geotoolkit.controls.tools.AbstractTool);
    geotoolkit.setClassName(AnnotationsManipulator, 'LogDemo.Tools.AnnotationsManipulator');

    /**
     * @private
     * @param {number} position position
     * @returns {*}
     */
    AnnotationsManipulator.prototype.findTrack = function (position) {
        var radius = 2;
        var track = this._trackContainer.getTrackAtPosition(position, radius);

        if (track != null) {
            if (track instanceof geotoolkit.welllog.LogTrack) {
                return track;
            }
            if (track['right'] == null) {
                return null;
            }
            return track['left'];
        }
        return null;
    };

    /**
     * @inheritdoc
     */
    AnnotationsManipulator.prototype.start = function (eventArgs) {
        this._startPoint = this.pointToModel(this._manipulatorLayer.getRoot(), eventArgs);
        this._lastPoint = this.pointToModel(this._manipulatorLayer.getRoot(), eventArgs);
        eventArgs.stopPropagation();
        this.setActive(true);
        geotoolkit.controls.tools.AbstractTool.lock(eventArgs.getPlot(), this);
        return this;
    };

    /**
     * @inheritdoc
     */
    AnnotationsManipulator.prototype.stop = function () {
        this.setActive(false);
        this.highlightHandle(null);
        geotoolkit.controls.tools.AbstractTool.unlock(this);
        return this;
    };

    /**
     * @private
     * @param {geotoolkit.scene.shapes.Shape} handle handle
     * @returns {AnnotationsManipulator}
     */
    AnnotationsManipulator.prototype.highlightHandle = function (handle) {
        if (this._activeHandle === handle) {
            return this;
        }
        if (this._activeHandle != null) {
            this._annotationHandle.setVisible(false);
        }

        this._activeHandle = handle;

        if (this._activeHandle != null) {
            this._annotationHandle
                .setAnchor(this._activeHandle.getAnchor())
                .setLineStyle(this._activeHandle.getLineStyle())
                .setFillStyle(this._activeHandle.getFillStyle())
                .setVisible(true);
        }
        return this;
    };

    /**
     * @private
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs event args
     */
    AnnotationsManipulator.prototype.onMouseMove = function (eventArgs) {
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

            var handleX = this._activeHandle.getAnchorX() + manipulatorDiffX;
            var handleY = this._activeHandle.getAnchorY() + manipulatorDiffY;
            var track = this.findTrack(handleX);
            if (track != null) {
                this._activeHandle.setAnchor(handleX, handleY);
                this._annotationHandle.setAnchor(handleX, handleY);

                var anchor = track.getWorldTransform().inverseTransformPoint(new geotoolkit.util.Point(handleX, handleY));
                this._activeHandle.getTag()
                    .setTarget(track)
                    .setAnchor(anchor);
            }
            eventArgs.stopPropagation();
        } else {
            var handle = this.findHandle(eventArgs);
            this.highlightHandle(handle);
            if (handle) {
                eventArgs.stopPropagation();
            }
        }
    };

    /**
     * Find handle
     * @private
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs event args
     * @returns {geotoolkit.scene.shapes.Shape}
     */
    AnnotationsManipulator.prototype.findHandle = function (eventArgs) {
        var targetPoint = this.pointToModel(this._manipulatorLayer.getRoot(), eventArgs);
        var nodes = this._selector.select(this._manipulatorLayer.getRoot(), targetPoint.x, targetPoint.y, 2);

        var handle = null;
        for (var i = nodes.length - 1; i >= 0; i--) {
            handle = nodes[i];
            if (handle instanceof geotoolkit.scene.shapes.Symbol &&
                geotoolkit.isInstanceOf(handle.getTag(), geotoolkit.widgets.overlays.IAnnotation)) {
                return handle;
            }
        }
        return null;
    };

    /**
     * @private
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs event args
     */
    AnnotationsManipulator.prototype.onMouseDown = function (eventArgs) {
        if (this.isEnabled() === false) {
            return;
        }
        var handle = this.findHandle(eventArgs);
        if (handle != null) {
            this.highlightHandle(handle);

            eventArgs.stopPropagation(true, true);

            /*
            scrollTo annotation ?
            //geotoolkit.log("Annotation click : " +handle.getTag().getText());
            or start moving
            this.start(eventArgs);
             */
            this.start(eventArgs);
        }
    };

    /**
     * @private
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs event args
     */
    AnnotationsManipulator.prototype.onMouseUp = function (eventArgs) {
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

    geotoolkit.obfuscate(AnnotationsManipulator, geotoolkit.controls.tools.AbstractTool);
    return AnnotationsManipulator;
});
