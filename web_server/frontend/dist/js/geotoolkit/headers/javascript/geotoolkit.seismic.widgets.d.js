/**
 * API for defining seismic widgets and tools.
 * @namespace */
geotoolkit.seismic.widgets = {};

/** @namespace */
geotoolkit.seismic.widgets.persistence = {};

/** @namespace */
geotoolkit.seismic.widgets.tools = {};

/**
 * The implementation fo the default serializer registry for SeismicViewWidget
 *
 * @class geotoolkit.seismic.widgets.persistence.Registry
 * @augments geotoolkit.persistence.Registry
 */
geotoolkit.seismic.widgets.persistence.Registry = {};
    /**
     * Return instance of the default registry
     * @returns {geotoolkit.persistence.Registry} registry
     */
    geotoolkit.seismic.widgets.persistence.Registry.getInstance = function(){};

/**
 * HorizontalSplitterEventArgs
 * @deprecated since 2.5 use {geotoolkit.controls.tools.splitter.HorizontalSplitterEventArgs} instead
 * @class geotoolkit.seismic.widgets.tools.HorizontalSplitterEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs info about the event argments
 */
geotoolkit.seismic.widgets.tools.HorizontalSplitterEventArgs = {};

/**
 * Creates default implementation of the seismic plot splitter
 *
 * @deprecated since 2.5 use {geotoolkit.controls.tools.splitter.HorizontalSplitter} instead
 * @class geotoolkit.seismic.widgets.tools.HorizontalSplitter
 * @augments geotoolkit.controls.tools.splitter.HorizontalSplitter
 * @param {geotoolkit.scene.Group} manipulatorLayer layer for holding temporary shapes
 */
geotoolkit.seismic.widgets.tools.HorizontalSplitter = {};
    /**
     * Events
     * @enum
     * @readonly
     */
    geotoolkit.seismic.widgets.tools.HorizontalSplitter.Events = {};
        /**
         * onPlotSizeChanged
         * @type {string}
         */
        geotoolkit.seismic.widgets.tools.HorizontalSplitter.Events.onPlotSizeChanged = "";

/**
 * Creates default implementation of the seismic comparison tool.
 *
 * @class geotoolkit.seismic.widgets.tools.Comparator
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.seismic.widgets.SeismicWidget} widget the target widget to add the comparator to.
 * @param {geotoolkit.scene.Group} manipulatorLayer layer for holding temporary shapes
 * @example
 * // To initialize the comparator/layer tool
 * SeismicWidget.getToolByName("comparator").setEnabled(true)
 * @example
 * // By default the orientation is vertical. Following example shows how to change the orientation.
 * SeismicWidget.getToolByName("comparator").setOrientation(geotoolkit.util.Orientation.Horizontal);
 */
geotoolkit.seismic.widgets.tools.Comparator = {};
    /**
     * dispose object
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.dispose = function(){};
    /**
     * @protected
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.onEnabledStateChanged = function(){};
    /**
     * returns pipeline
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.getPipeline = function(){};
    /**
     * set pipeline
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline pipeline
     * @returns {geotoolkit.seismic.widgets.tools.Comparator} this
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.setPipeline = function(pipeline){};
    /**
     * Returns split flag
     * @returns {boolean}
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.getSplit = function(){};
    /**
     * Set split flag
     * @param {boolean} split default is true
     * @returns {geotoolkit.seismic.widgets.tools.Comparator}
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.setSplit = function(split){};
    /**
     * Set orientation
     * @param {geotoolkit.util.Orientation} orientation orientation
     * @returns {geotoolkit.seismic.widgets.tools.Comparator} this
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.setOrientation = function(orientation){};
    /**
     * returns splitter orientation
     * @returns {geotoolkit.util.Orientation} orientation
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.getOrientation = function(){};
    /**
     * Returns split position
     * @returns {number} return splitter position (between 0..1)
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.getPosition = function(){};
    /**
     * Set split position
     * @param {number} position
     * @returns {geotoolkit.seismic.widgets.tools.Comparator} this
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.setPosition = function(position){};
    /**
     * @inheritdoc
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.start = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.seismic.widgets.tools.Comparator.prototype.stop = function(){};

/**
 * SeismicViewWidget is essentially a base widget specialized for seismic data display. Internally it uses classes like {@link geotoolkit.seismic.image.SeismicImage} and {@link geotoolkit.seismic.pipeline.SeismicPipeline} from Seismic toolkit.<br>
 * The SeismicViewWidget handles the synchronization of the modellimits and display units while zooming and scrolling. The horizontal and vertical scroll bars will be displayed by default and its properties can be easily modified. <br>
 * The scaling functionality from seismic image is utilized by calling get/setScaleOptions().<br>
 * The widget utilizes the {@link geotoolkit.seismic.pipeline.SeismicPipeline} to manipulte the properties like Interpolation, Normalization etc.<br>
 * It can display a colorbar and also change its location as needed. The widget has default tools like Crosshair but it also supports tools like: <br>
 * <ul>
 * <li> panning </li>
 * <li> selection </li>
 * <li> rubberzoom </li>
 * <li> pinchzoom </li>
 * </ul>
 * @class geotoolkit.seismic.widgets.SeismicViewWidget
 * @augments geotoolkit.widgets.BaseWidget
 * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline seismic pipeline
 * @param {object} [options] options see {@link geotoolkit.seismic.widgets.SeismicViewWidget#setOptions}
 * @example
 * // following code shows how to create a seismic view widget using a pipeline. The {@link geotoolkit.seismic.pipeline.SeismicPipeline} is created earlier using a seismic reader.
 * function createWidget(pipeline) {
 * var widget = new geotoolkit.seismic.widgets.SeismicViewWidget(pipeline)
 * .setLayoutStyle({left: 0, top: 0, bottom: 0, right: 0});
 * widget.setScaleOptions({
 * 'tracescale': 35,
 * 'samplescale': 50,
 * 'deviceunit': 'in',
 * 'sampleunit': 'ms'
 * });
 * return widget;
 * }
 * @example How to change default scrollbars
 * var widget = new geotoolkit.seismic.widgets.SeismicViewWidget(pipeline, {
 * 'scroll': {
 * 'horizontal': {
 * 'visible': true,
 * 'cssclass': 'horizontal-scroll',
 * 'type': 'geotoolkit.controls.tools.scroll.CompactHorizontalScroll'
 * },
 * 'vertical': {
 * 'visible': true,
 * 'cssclass': 'vertical-scroll',
 * 'type': 'geotoolkit.controls.tools.scroll.CompactVerticalScroll'
 * }
 * }});
 * @example How to hide default axis ( headers)
 * widget.setTraceHeaderVisible('TraceNumber', false);
 * // OR
 * widget.setOptions({
 * 'axes': {
 * 'headers': {
 * 'fields': [
 * {
 * 'name': 'TraceNumber',
 * 'visible': false
 * }]
 * }
 * }
 * });
 */
geotoolkit.seismic.widgets.SeismicViewWidget = {};
    /**
     * SeismicViewWidget's Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.Events = {};
        /**
         * Event type fired when the visible limits have changed
         * @type {string}
         */
        geotoolkit.seismic.widgets.SeismicViewWidget.Events.VisibleLimitsChanged = "";
    /**
     * Enum of seismic widget manipulator types
     * @enum
     * @readonly
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType = {};
        /**
         * Panning tool
         * @type {number}
         */
        geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType.Panning = NaN;
        /**
         * RubberBand tool
         * @type {number}
         */
        geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType.RubberBand = NaN;
        /**
         * Magnifier tool
         * @type {number}
         */
        geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType.Magnifier = NaN;
        /**
         * Picking tool
         * @type {number}
         */
        geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType.Pick = NaN;
    /**
     * Set widget options
     * @param {object} [options] options
     * @param {boolean} [options.lazyupdate=false] deprecated (since 2.6) flag, if true then browser will render seismic in asynchronous mode, can be useful for old FireFox version, see (new geotoolkit.util.BrowserInfo())['isFirefox']
     * @param {string} [options.layouttype='default'] type of layout 'default' or 'inside'
     * @param {object} [options.title] defines title options of widget
     * @param {string} [options.title.text=''] defines title of widget
     * @param {boolean} [options.title.visible=false] defines title visibility
     * @param {geotoolkit.attributes.TextStyle|object} [options.title.textstyle] text style
     * @param {number} [options.title.size] size of the title in pixels
     * @param {geotoolkit.util.AnchorType} [options.title.alignment] alignment
     * @param {geotoolkit.layout.AnnotationLocation} [options.title.location=geotoolkit.layout.AnnotationLocation.North] defines title location
     * @param {string} [options.title.cssclass='seismic-title'] CSS style of the title
     * @param {object} [options.colorbar] json defining color bar
     * @param {boolean} [options.colorbar.visible] defines visibility of colorbar
     * @param {geotoolkit.controls.shapes.ColorBarLocation} [options.colorbar.location=geotoolkit.controls.shapes.ColorBarLocation.West] defines location of colorbar (geotoolkit.controls.shapes.ColorBarLocation.East|geotoolkit.controls.shapes.ColorBarLocation.West)
     * @param {geotoolkit.attributes.LineStyle|object} [options.colorbar.linestyle=null] line style
     * @param {object} [options.colorbar.title] color bar title
     * @param {number} [options.colorbar.title.size] title area desired size
     * @param {boolean} [options.colorbar.title.visible=true] title visibility
     * @param {string} [options.colorbar.title.text=""] title text
     * @param {geotoolkit.attributes.TextStyle|object} [options.colorbar.title.textstyle] title textstyle
     * @param {object} [options.colorbar.axis] colorbar axis
     * @param {number} [options.colorbar.axis.size] axis area desired size
     * @param {boolean} [options.colorbar.axis.visible=true] axis visibility
     * @param {boolean} [options.colorbar.axis.autolabelrotation=false] axis auto label rotation flag
     * @param {object} [options.colorbar.colorbox] color box attributes
     * @param {number} [options.colorbar.colorbox.size] colorbox area desired size
     * @param {number} [options.colorbar.namedcolors.size=0] named colors desired size
     * @param {number} [options.colorbar.maxheight] maximun height of color bar. by default it is unlimited
     * @param {geotoolkit.attributes.LineStyle|object} [options.colorbar.colorbox.linestyle=null] colorbox outline rectangle linestyle
     * @param {geotoolkit.axis.Axis} [options.axis=null] deprecated (since 2.3), specify instance of sample axis
     * @param {object} [options.axes] specify set of axes
     * @param {object} [options.axes.samples] specify properties of vertical axis
     * @param {boolean} [options.axes.samples.visible] defines visibility of sample axis
     * @param {string} [options.axes.samples.cssclass='seismic-samples-axis'] defines cssclass of samples axis
     * @param {geotoolkit.layout.AnnotationLocation} [options.axes.samples.location = geotoolkit.layout.AnnotationLocation.West] defines location of sample axis
     * @param {geotoolkit.axis.Axis} [options.axes.samples.instance=null] defines instance of sample axis
     * @param {number} [options.axes.samples.size] defines size in pixels of samples axis
     * @param {object} [options.axes.samples.title] defines title options of sample axis
     * @param {string} [options.axes.samples.title.text=''] defines title of sample axis
     * @param {boolean} [options.axes.samples.title.visible=false] defines title visibility of sample axis
     * @param {object} [options.axes.samples.ticks] objects which defines ticks options of the axis. See {geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {object} [options.axes.headers=null] seismic headers axes options
     * @param {Array<object>} [options.axes.headers.fields=[]] array of trace headers axes, should contains JSON object with 'name', 'visible' and 'minimumSpan' properties
     * @param {object} [options.axes.headers.options] default options for all axes
     * @param {number} [options.axes.headers.options.minimumSpan=10] minimum span for header tick generator
     * @param {string} [options.axes.headers.options.location='north'] default axes location, can be 'north' or 'south'
     * @param {geotoolkit.layout.VerticalBoxLayout.Direction} [options.axes.headers.options.direction='toptobottom'] default axes direction, can be 'toptobottom' or 'bottomtotop'
     * @param {number} [options.axes.headers.options.size=30] default axis size
     * @param {geotoolkit.attributes.TextStyle|object} [options.axes.samples.title.textstyle] defines title text style of sample axis
     * @param {object} [options.scroll] specify scroll bar properties
     * @param {object} [options.scroll.horizontal] specify horizontal scroll bar properties
     * @param {boolean} [options.scroll.horizontal.visible=true] specify horizontal scroll bar visibility
     * @param {string} [options.scroll.horizontal.cssclass='horizontal-scroll'] specify horizontal scroll bar cssclass name
     * @param {object} [options.scroll.vertical] specify vertical scroll bar properties
     * @param {boolean} [options.scroll.vertical.visible=true] specify vertical scroll bar visibility
     * @param {string} [options.scroll.vertical.cssclass='vertical-scroll'] specify vertical scroll bar cssclass name
     * @param {object} [options.annotationssizes=null] JSON to hold (width or height) of the annotation
     * @param {object} [options.annotationssizes.east] JSON to hold east annotation size
     * @param {object} [options.annotationssizes.south] JSON to hold south annotation size
     * @param {object} [options.annotationssizes.west] JSON to hold west annotation size
     * @param {object} [options.annotationssizes.north] JSON to hold north annotation size
     * @param {boolean} [options.autoseismiclimits=true] sets model limits of the center group based on the pipeline limits. If limits sets to false
     * then it is necessary to set up manually model limits for model
     * @example How to change size of axes and colorbar
     * widget.setOptions({
     * 'colorbar': {
     * 'location': geotoolkit.controls.shapes.ColorBarLocation.West,
     * 'axis': {
     * 'size': 50
     * },
     * 'title': {
     * 'size': 50
     * },
     * 'colorbox': {
     * 'size': 20
     * }
     * },
     * 'axes': {
     * 'headers': {
     * 'location': geotoolkit.controls.shapes.ColorBarLocation.North,
     * 'direction': geotoolkit.layout.VerticalBoxLayout.Direction.TopToBottom,
     * 'size': 30,
     * },
     * 'samples': {
     * 'size': 50
     * }
     * }
     * });
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setOptions = function(options){};
    /**
     * Set widget title
     * @param {string|object} title title
     * @param {string} [title.text] title text
     * @param {boolean} [title.visible] visibility
     * @param {geotoolkit.attributes.TextStyle|object} [title.textstyle] text style
     * @param {number} [title.size] size of the title in pixels
     * @param {geotoolkit.util.AnchorType} [title.alignment] alignment
     * @param {geotoolkit.layout.AnnotationLocation} [title.location=geotoolkit.layout.AnnotationLocation.North] defines location
     * @param {string} [title.cssclass='seismic-title'] CSS style of the title
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setTitle = function(title){};
    /**
     * Gets widget title
     * @returns {object} title title
     * @returns {string} [title.title] title
     * @returns {boolean} [title.visible] visibility
     * @returns {geotoolkit.attributes.TextStyle|object} [title.textstyle] text style
     * @returns {number} [title.size] size of the title in pixels
     * @returns {geotoolkit.util.AnchorType} [title.alignment] alignment
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getTitle = function(){};
    /**
     * Set samples title
     * @param {string|object} title title
     * @param {string} [title.title] title
     * @param {boolean} [title.visible] visibility
     * @param {geotoolkit.attributes.TextStyle|object} [title.textstyle] text style
     * @param {geotoolkit.util.AnchorType} [title.alignment] alignment
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setSamplesTitle = function(title){};
    /**
     * function call in the constructor to initialize tools in the widget
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget}
     * @protected
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.initializeTools = function(){};
    /**
     * Returns scale options.
     *
     * @returns {object} scaleOptions object
     * @returns {geotoolkit.util.AbstractUnit} scaleOptions.deviceunit physical device unit
     * @returns {?geotoolkit.util.AbstractUnit} scaleOptions.sampleunit sample unit, sample unit from pipeline will be used if not specified
     * @returns {number} scaleOptions.tracescale in traces per device unit (e.g traces per inch)
     * @returns {number} scaleOptions.samplescale in z unit per device unit if depth data (e.g feet per inch), or in device unit per z unit (e.g inches per second)
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getScaleOptions = function(){};
    /**
     * Sets scale options. If setScaleOption() is not set, the SeismicImage assumes a default .
     *
     * @param {object} scaleOptions scale options
     * @param {geotoolkit.util.AbstractUnit|string} [scaleOptions.deviceunit] physical device unit
     * @param {geotoolkit.util.AbstractUnit|string} [scaleOptions.sampleunit] sample unit, sample unit from pipeline will be used if not specified
     * @param {number} [scaleOptions.tracescale] in traces per device unit (e.g traces per inch)
     * @param {number} [scaleOptions.samplescale] in z unit per device unit if depth data (e.g feet per inch), or in device unit per z unit (e.g inches per second)
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setScaleOptions = function(scaleOptions){};
    /**
     * Returns the array of available headers
     * @returns {Array<string>} array of available headers
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getTraceHeaders = function(){};
    /**
     * Returns header description, if header exists
     * @param {string} headerName header name
     * @returns {?geotoolkit.seismic.data.FieldDesc} header description
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getTraceHeader = function(headerName){};
    /**
     * Returns information about shapes like axis and labels associated with the header
     * @param {geotoolkit.seismic.data.FieldDesc|string} headerField header field description, accept only 'TraceNumber' as a string
     * @returns {?Object} header helper, information about shapes associated with header
     * @returns {?geotoolkit.axis.Axis} header.axis header annotations
     * @returns {?geotoolkit.scene.shapes.Text} header.label header labels
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getTraceHeaderAxis = function(headerField){};
    /**
     * Check if the trace header is visible
     * @param {geotoolkit.seismic.data.FieldDesc|string} headerField field to check visibility, accept only 'TraceNumber' as a string
     * @returns {boolean}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getTraceHeaderVisible = function(headerField){};
    /**
     * This method shows or hides the header
     * @param {geotoolkit.seismic.data.FieldDesc|string} headerField field, accept only 'TraceNumber' as a string
     * @param {boolean} visible header visibility
     * @returns {?Object} header helper, information about shapes associated with header
     * @returns {?geotoolkit.axis.Axis} header.axis
     * @returns {?geotoolkit.scene.shapes.Text} header.label
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setTraceHeaderVisible = function(headerField, visible){};
    /**
     * Returns the seismic model node
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getModel = function(){};
    /**
     * Returns the group, which contains seismic images
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getSeismicModel = function(){};
    /**
     * return seismic model limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getSeismicModelLimits = function(){};
    /**
     * Sets seismic model limits if auto seismic model limits is off
     * @param {geotoolkit.util.Rect} limits model limits
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setSeismicModelLimits = function(limits){};
    /**
     * return seismic model limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getVisibleSeismicDeviceLimits = function(){};
    /**
     * Returns seismic visible model limits
     * @param {boolean} [ignoreModelLimits=false] flag defines whether to ignore model limits or not. By default this option is false and
     * visible limits will be intersected with model limits of the seismic
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getVisibleSeismicModelLimits = function(ignoreModelLimits){};
    /**
     * Returns active manipulator type
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getManipulatorType = function(){};
    /**
     * Set active manipulator type
     * @param {geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType} manipulatorType enum of of Manipulator type. Panning tool, RubberBand tool, magnifier tool and picking tool.
     * @param {boolean} active state
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setManipulatorType = function(manipulatorType, active){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect | object} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setBounds = function(bounds){};
    /**
     * Fit content to bounds
     * @param {boolean} [silent=false] optional parameter to synchronize limits
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.fitToBounds = function(silent){};
    /**
     * translate seismic model
     * @param {number} dX offset x
     * @param {number} dY offset y
     * @param {boolean} [silent=false] update view
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.translate = function(dX, dY, silent){};
    /**
     * scale seismic model
     * @param {number} scaleX scale factor by horizontal axis
     * @param {number} scaleY scale factor by vertical axis
     * @param {boolean} [silent=false] update view
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.scale = function(scaleX, scaleY, silent){};
    /**
     * Zoom in
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.zoomIn = function(){};
    /**
     * Zoom out
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.zoomOut = function(){};
    /**
     * Reset zoom
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.resetZoom = function(){};
    /**
     * set visible model limits
     * @param {geotoolkit.util.Rect} visibleModelLimits visible model limits
     * @param {boolean} silent notification to listener on or not
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setVisibleSeismicModelLimits = function(visibleModelLimits, silent){};
    /**
     * Attempts to set local transformation for the seismic model.
     * @param {geotoolkit.util.Transformation} transformation transformation to set
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setSeismicModelTransformation = function(transformation){};
    /**
     * Disposes this node, once disposes a node should not be used anymore.<br>
     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
     * Also aggressively 'cleanup' this node by setting some of its members to null.
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.dispose = function(){};
    /**
     * returns active pipeline
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getPipeline = function(){};
    /**
     * set pipeline
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline Seismic Pipeline
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setPipeline = function(pipeline){};
    /**
     * return active seismic image
     * @returns {geotoolkit.seismic.image.SeismicImage}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getSeismicImage = function(){};
    /**
     * Invalidate node
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.notifyStateChanged = function(){};
    /**
     * Add invalidate handler
     * @deprecated since 2.6
     * @param {function} handler
     * handler to be notified about invalidation
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.addStateChangedHandler = function(handler){};
    /**
     * Return manipulator layer
     * @returns {geotoolkit.scene.Layer}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getManipulatorLayer = function(){};
    /**
     * Return widgets tool
     * @returns {geotoolkit.controls.tools.AbstractCompositeTool}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getWidgetTools = function(){};
    /**
     * Remove invalidate handler
     *
     * @param {function} handler
     * handler to be notified about invalidation
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.removeStateChangedHandler = function(handler){};
    /**
     * @override
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.saveTemplate = function(){};
    /**
     * @override
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.loadTemplate = function(){};
    /**
     * Get widget options
     * @param {object} [getDataOptions] optional parameter to specify addtional request to get colormap
     * @returns {object} options options
     * @returns {object} options.pipeline pipeline options
     * @returns {string} options.pipeline.version version
     * @returns {object} options.pipeline.interpolation interpolation options
     * @returns {string} options.pipeline.interpolation.type type of interpolation
     * @returns {object} options.pipeline.normalization normalization options
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType} [options.pipeline.normalization.type] normalization type
     * @returns {geotoolkit.util.Range} [options.pipeline.normalization.limits] normalization limits
     * @returns {number} [options.pipeline.normalization.scale] normalization params
     * @returns {object} options.pipeline.plot plot options
     * @returns {string} options.pipeline.plot.type plot type
     * @returns {string} options.pipeline.plot.clippingFactor factor used while clipping
     * @returns {string} options.pipeline.plot.decimationSpacing decimation spacing
     * @returns {object} options.pipeline.colors RGBA colors
     * @returns {string|geotoolkit.seismic.util.SeismicColors} options.colors.colorMap
     * @returns {object} options.scaleOptions scale options
     * @returns {number} options.scaleOptions.tracePerInch traces per inch
     * @returns {number} options.scaleOptions.inchesPerSecond inches per second
     * @returns {number} options.scaleOptions.feetPerInch feet per inch
     * @returns {string} options.scaleOptions.unit 'sec' or 'feet'
     * @returns {object}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getData = function(getDataOptions){};
    /**
     * Sets options and/or data
     * @param {object} options options
     * @param {object} [options.pipeline] pipeline options
     * @param {string} [options.pipeline.version] version
     * @param {object} [options.pipeline.interpolation] interpolation options
     * @param {string} [options.pipeline.interpolation.type] type of interpolation
     * @param {object} [options.pipeline.normalization] normalization options
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType} [options.pipeline.normalization.type] normalization type
     * @param {geotoolkit.util.Range} [options.pipeline.normalization.limits] normalization limits
     * @param {number} [options.pipeline.normalization.scale] normalization params
     * @param {object} [options.pipeline.plot] plot options
     * @param {string} [options.pipeline.plot.type] plot type
     * @param {string} [options.pipeline.plot.clippingFactor] factor used while clipping
     * @param {string} [options.pipeline.plot.decimationSpacing] decimation spacing
     * @param {object} [options.pipeline.colors] RGBA colors
     * @param {object} [options.colors] color options
     * @param {string|geotoolkit.seismic.util.SeismicColors} [options.colors.colorMap] color map
     * @param {object} [options.scaleOptions] scale options
     * @param {number} [options.scaleOptions.tracePerInch] traces per inch
     * @param {number} [options.scaleOptions.inchesPerSecond] inches per second
     * @param {number} [options.scaleOptions.feetPerInch] feet per inch
     * @param {string} [options.scaleOptions.unit] 'sec' or 'feet'
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setData = function(options){};
    /**
     * Return the node at the specific annotation
     * @param {geotoolkit.layout.AnnotationLocation} location position to return the node for
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getAnnotation = function(location){};
    /**
     * apply size (width or height) to annotation (convenience method)
     * @example
     * {
     * west : 50,
     * east : '10%'
     * }
     * @param {object} [annotationSize] JSON to hold (width or height) of the annotation
     * @param {object} [annotationSize.east=null] JSON to hold east annotation size
     * @param {object} [annotationSize.south=null] JSON to hold south annotation size
     * @param {object} [annotationSize.west=null] JSON to hold west annotation size
     * @param {object} [annotationSize.north=null] JSON to hold north annotation size
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setAnnotationSize = function(annotationSize){};
    /**
     * Sets all the properties pertaining to this object see {@link geotoolkit.seismic.widgets.SeismicViewWidget#setOptions}
     * @param {object} [properties] JSON containing properties
     * @returns {geotoolkit.seismic.widgets.SeismicViewWidget} this
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.setProperties = function(properties){};
    /**
     * Gets all the properties pertaining to this object
     * See {@link geotoolkit.seismic.widgets.SeismicViewWidget.getProperties} for details
     * @returns {object} props JSON containing properties
     */
    geotoolkit.seismic.widgets.SeismicViewWidget.prototype.getProperties = function(){};

/**
 * TraceHeaderViewWidget is essentially a base widget specialized for seismic headers data display.
 * @class geotoolkit.seismic.widgets.TraceHeaderViewWidget
 * @augments geotoolkit.widgets.BaseWidget
 * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline seismic pipeline
 * @param {object} options headers options
 * @param {string} [options.cssclass='seismic-headers-table'] defines cssclass of headers table
 * @param {Array<geotoolkit.seismic.data.FieldDesc>|Array<string>|string} [options.headers] headers, array of header names, string contains header names divided by '|', or '*'
 * @param {object} [options.index] defines index column options
 * @param {number|string} [options.index.size] defines index column size in pixels, also accepts 'auto' that means that size depends on max header title size
 * @example
 * // following code shows how to create a seismic headers view widget using a pipeline. The {@link geotoolkit.seismic.pipeline.SeismicPipeline} is created earlier using a seismic reader.
 * function createWidget(pipeline) {
 * var widget = new geotoolkit.seismic.widgets.TraceHeaderViewWidget(pipeline, {
 * 'headers': [
 * 'INLINE',
 * {
 * 'name': 'XLINE',
 * 'title': 'X - line'//or change title of the particular header
 * }]
 * })
 * .setLayoutStyle({left: 0, top: 0, bottom: 0, right: 0});
 * return widget;
 * });
 */
geotoolkit.seismic.widgets.TraceHeaderViewWidget = {};
    /**
     * function call in the constructor to initialize tools in the widget
     * @protected
     * @returns {geotoolkit.seismic.widgets.TraceHeaderViewWidget} this
     */
    geotoolkit.seismic.widgets.TraceHeaderViewWidget.prototype.initializeTools = function(){};
    /**
     * dispose existing application
     */
    geotoolkit.seismic.widgets.TraceHeaderViewWidget.prototype.dispose = function(){};
    /**
     * Returns pipeline
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline
     */
    geotoolkit.seismic.widgets.TraceHeaderViewWidget.prototype.getPipeline = function(){};
    /**
     * Set pipeline
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline Seismic Pipeline
     * @returns {geotoolkit.seismic.widgets.TraceHeaderViewWidget} this
     */
    geotoolkit.seismic.widgets.TraceHeaderViewWidget.prototype.setPipeline = function(pipeline){};
    /**
     * Returns preferred headers array(or string) that are displaying in table widget
     *
     * @returns {string|Array<object>} can be '*' or array of JSON objects with 'identifier', 'name' and 'title' property
     */
    geotoolkit.seismic.widgets.TraceHeaderViewWidget.prototype.getTableHeaders = function(){};
    /**
     * Set subset of header fields to be displayed in table widget
     *
     * @param {Array<geotoolkit.seismic.data.FieldDesc>|Array<string>|string} headers array of header names, string contains header names divided by '|', or '*'
     * @returns {geotoolkit.seismic.widgets.TraceHeaderViewWidget}
     */
    geotoolkit.seismic.widgets.TraceHeaderViewWidget.prototype.setTableHeaders = function(headers){};
    /**
     * Returns current widget options
     * @returns {object} options
     * @returns {string} [options.name] widget name
     * @returns {string|Array<object>} [options.headers='*'] defines array of headers displayed in table, contains JSON objects with 'identifier', 'name' and 'title' property
     * @returns {string} [options.cssclass='seismic-headers-table'] defines cssclass of headers table
     * @returns {object} [options.index] defines index column properties
     * @returns {number|string} [options.index.size='auto'] defines index column size
     */
    geotoolkit.seismic.widgets.TraceHeaderViewWidget.prototype.getOptions = function(){};
    /**
     * Set widget options
     * @param {object} options headers view options
     * @param {string} [options.cssclass='seismic-headers-table'] defines cssclass of headers table
     * @param {object} [options.index] defines index column options
     * @param {number|string} [options.index.size] defines index column size in pixels, also accepts 'auto' that means that size depends on max header title size
     * @param {Array<geotoolkit.seismic.data.FieldDesc>|Array<string>|string} [options.headers] headers, array of header names, string contains header names divided by '|', or '*'
     *
     * @returns {geotoolkit.seismic.widgets.TraceHeaderViewWidget} this
     */
    geotoolkit.seismic.widgets.TraceHeaderViewWidget.prototype.setOptions = function(options){};
    /**
     * Select trace index for highlighting
     *
     * @param {number} traceIndex trace index for highlighting
     * @returns {geotoolkit.seismic.widgets.TraceHeaderViewWidget} this
     */
    geotoolkit.seismic.widgets.TraceHeaderViewWidget.prototype.highlightTraceIndex = function(traceIndex){};

/**
 * TraceHeaderChartWidget is essentially a base widget specialized for seismic headers data display.
 * @class geotoolkit.seismic.widgets.TraceHeaderChartWidget
 * @augments geotoolkit.widgets.BaseWidget
 * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline seismic pipeline
 * @param {object} [options] chart options {@link see geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setOptions}
 * @param {string} [options.cssclass='seismic-headers-chart'] defines cssclass of headers table
 * @param {Array<geotoolkit.seismic.data.FieldDesc>|Array<string>|string} [options.headers] headers, array of header names, string contains header names divided by '|', or '*'
 *
 * @example
 * // following code shows how to create a seismic headers view widget using a pipeline. The {@link geotoolkit.seismic.pipeline.SeismicPipeline} is created earlier using a seismic reader.
 * function createWidget(pipeline) {
 * var widget = new geotoolkit.seismic.widgets.TraceHeaderChartWidget(pipeline, {
 * 'charts': [
 * 'INLINE',
 * {
 * 'name': 'XLINE',
 * 'linestyle': 'red'
 * }]
 * })
 * .setLayoutStyle({left: 0, top: 0, bottom: 0, right: 0});
 * return widget;
 * });
 */
geotoolkit.seismic.widgets.TraceHeaderChartWidget = {};
    /**
     * Dispose node. Clear all listeners
     * and disconnect style to avoid memory leaks
     */
    geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.dispose = function(){};
    /**
     * Returns pipeline
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline}
     */
    geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.getPipeline = function(){};
    /**
     * set pipeline
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline Seismic Pipeline
     * @returns {geotoolkit.seismic.widgets.TraceHeaderChartWidget} this
     */
    geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setPipeline = function(pipeline){};
    /**
     * Set widget or specific chart options
     * @param {string|object} options header name or widget options or chart name if you apply options to one chart only
     * @param {Array<object|string>} [options.charts] array of char options {@link geotoolkit.scene.shapes.Text.prototype.addHeader}
     * @param {string|object} [options.title] title options or title text {@link see geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setTitle}
     * @param {string} [options.title.text] title text
     * @param {geotoolkit.attributes.TextStyle|object} [options.title.textstyle] title text style {@link geotoolkit.scene.shapes.Text.prototype.setTextStyle}
     * @param {number} [options.title.size] title size
     * @param {object} [chartOptions] specific chart options if you apply options to specific chart only
     * @returns {geotoolkit.seismic.widgets.TraceHeaderChartWidget} this
     *
     * @example
     * //following call will update CDPY chart only
     * chart.setOptions('CDPY', {'linestyle': 'blue'}); *
     * @example
     * chart.setOptions({
     * 'title': {
     * 'text': 'Auxiliary Chart',
     * 'textstyle': {
     * 'font': '16px Roboto',
     * 'color': 'gray'
     * },
     * 'size': 20
     * }
     * });
     * @example
     * chart.setOptions({'title': 'Auxiliary Chart', 'charts': ['CDPY', 'CDPX']});
     * @example
     * //following call will synchronize charts with array, means that all other charts will be deleted
     * chart.setOptions({
     * 'charts': [{
     * 'name': 'CDPY',
     * 'linestyle': 'blue'
     * },{
     * 'name': 'CDPX',
     * 'linestyle': 'red'
     * }]
     * });
     */
    geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setOptions = function(options, chartOptions){};
    /**
     * Returns widget or specific chart options
     * @returns {object} options
     * @returns {object} [options.title] see {@link geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.getTitle}
     * @returns {Array<object>} [options.charts] array of chart options, see {@link geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setOptions}
     */
    geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.getOptions = function(){};
    /**
     * Add header chart
     * @param {string} headerName trace header name
     * @param {object} [options] chart options
     * @param {geotoolkit.util.Range} [options.range] header data range
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle] line style
     * @param {object} [options.chart] chart options
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.chart.linestyle] chart line style
     * @param {object} [options.axis] axis options
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.axis.linestyle] axis line style
     * @param {string | object} [options.axis.title] axis title
     * @param {string} [options.axis.title.text] axis title
     * @param {boolean} [options.axis.title.visible] axis title visibility
     * @returns {geotoolkit.seismic.widgets.TraceHeaderChartWidget} this
     */
    geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.addHeader = function(headerName, options){};
    /**
     * Remove header
     * @param {string} headerName trace header name
     * @returns {geotoolkit.seismic.widgets.TraceHeaderChartWidget} this
     */
    geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.removeHeader = function(headerName){};
    /**
     * Set chart title
     * @param {string|object} title chart title or title options
     * @param {string} [title.text] title text
     * @param {geotoolkit.attributes.TextStyle|object} [title.textstyle] title text style {@link geotoolkit.scene.shapes.Text.prototype.setTextStyle}
     * @param {number} [title.size] title size
     * @returns {geotoolkit.seismic.widgets.TraceHeaderChartWidget} this
     * @example
     * chart.setTitle('Auxiliary Chart')
     * @example
     * chart.setTitle({'size': 20, 'textstyle': 'red'});
     * @example
     * chart.setTitle({
     * 'textstyle': {
     * 'font': '16px Roboto',
     * 'color': 'gray'
     * },
     * 'text': 'Auxiliary Chart'
     * });
     */
    geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setTitle = function(title){};
    /**
     * Returns chart title
     * @returns {object} title title options
     * @returns {string} [title.text] title text
     * @returns {geotoolkit.attributes.TextStyle} [title.textstyle] title text style
     * @returns {number} [title.size] title size
     */
    geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.getTitle = function(){};

/**
 * SeismicWidget is essentially a base widget specialized for seismic data display. It provides API to help viewing, interpreting and processing seismic data <br>
 * It has a center part to display seismic data and a set of annotations on each side to display axes, titles, or colorbar. <br>
 * It supports default tools like cross hair, zooming, panning, cursor tracking, scrolling etc. It also has an option to display trace number headers table.<br>
 * Other options like horizontal and vertical scrollbars can be set here.
 * @class geotoolkit.seismic.widgets.SeismicWidget
 * @augments geotoolkit.seismic.widgets.SeismicViewWidget
 * @implements geotoolkit.scene.exports.IExportable
 * @param {geotoolkit.seismic.pipeline.SeismicPipeline} seismic pipeline
 * @param {object} [options] additional options
 * @param {object} [options.auxiliarychart] auxiliarychart options
 * @param {object} [options.auxiliarychart.size] defines size of the auxiliarychart
 * @param {object} [options.auxiliarychart.title] defines options for auxiliarychart title
 * @param {object} [options.auxiliarychart.charts] defines options for charts {@link geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setOptions}
 * @param {object} [options.table] headers table
 * @param {boolean | string} [options.table.visible='none'] defines if plot displays headers table, true | false | 'none' | 'visible' | 'hidden'
 * @param {boolean} [options.table.enabled=true] defines if header view default behaviour is enabled or not
 * @param {string} [options.table.cssclass='seismic-headers-table'] defines cssclass of headers table
 * @param {Array<geotoolkit.seismic.data.FieldDesc>|Array<string>|string} [options.table.headers] headers, array of header names, string contains header names divided by '|', or '*'
 * @param {object} [options.table.index] defines table index column properties
 * @param {number|string} [options.table.index.size] defines table index column size
 * @param {number} [options.table.size=200] defines size of headers table
 * @param {boolean | string} [options.horizontalscrollable=true] defines if plot displays horizontal scrollbars, true | false | 'auto' | 'floating'
 * @param {boolean | string} [options.verticalscrollable=true] defines if plot displays vertical scrollbars, true | false | 'auto' | 'floating'
 * @param {object} [options.statusbar] defines status bar settings
 * @param {boolean} [options.statusbar.autosize=true] defines status auto size mode
 * @param {object} [options.statusbar.sizes] defines status auto size settings
 * @param {number} [options.statusbar.sizes.medium=500] defines medium size
 * @param {number} [options.statusbar.sizes.small=200] defines small size
 * @param {object} [options.statusbar.sections] defines section setting
 * @param {function} [options.statusbar.sections.info] defines custom section formatter
 * @param {object} [options.statusbar.sections.samples] defines first section
 * @param {string} [options.statusbar.sections.samples.label] defines title of the section
 * @param {string|geotoolkit.util.NumberFormat} [options.statusbar.sections.samples.format='#,###,##0.00'] defines format of the section
 * @param {object} [options.statusbar.sections.traces] defines second section
 * @param {string|geotoolkit.util.NumberFormat} [options.statusbar.sections.traces.format] defines format of the section
 * @param {string} [options.statusbar.sections.traces.label] defines title of the section
 * @param {object} [options.statusbar.sections.samplevalue] defines third section
 * @param {string} [options.statusbar.sections.samplevalue.label] defines title of the section
 * @param {string|geotoolkit.util.NumberFormat} [options.statusbar.sections.samplevalue.format='#,###,##0.000'] defines format of the section
 *
 * @example
 * // 1). Following code shows how to create a seismic widget using a pipeline. The {@link geotoolkit.seismic.pipeline.SeismicPipeline} is created earlier using a seismic reader.
 * function createWidget(pipeline) {
 * var widget = new geotoolkit.seismic.widgets.SeismicWidget(pipeline)
 * .setLayoutStyle({left: 0, top: 0, bottom: 0, right: 0});
 * widget.setScaleOptions({
 * 'tracescale': 3,
 * 'samplescale': 30,
 * 'deviceunit': 'in',
 * 'sampleunit': 's'
 * });
 * return widget;
 * }
 * @example
 * // 2). How to provide own information for statusbar
 * widget.setOptions({
 * 'statusbar': {
 * 'sections': {
 * 'info': function (widget, x, y, sample) {
 * var autoFormat = new geotoolkit.util.AutoNumberFormat();
 * var depthValue = Math.round(y * 100) / 100.0, sampleValue = '', traceNumber = '';
 * if (sample) {
 * traceNumber = sample['traceNumber'] + 1;
 * sampleValue = Math.round(sample['sampleValue'] * 10000) / 10000;
 * depthValue = Math.round(sample['location']['y'] * 100) / 100.0;
 * }
 * return {
 * 'samples': ' Depth: ' + autoFormat.format(depthValue),
 * 'value': ' Values: ' + sampleValue,
 * 'traces': ' Trace Number: ' + traceNumber
 * };
 * }
 * }
 * }
 * });
 *
 * @example
 * // 3). An example of adding text to corner annotation in the seismic widget:
 * var annotation = widget.getAnnotation(geotoolkit.layout.AnnotationLocation.NorthWest);
 * var text = new geotoolkit.scene.shapes.Text('New_Text', 1, 0.5, 0, 0,
 * new geotoolkit.attributes.TextStyle('black'), true)
 * .setAnchorType(geotoolkit.util.AnchorType.LeftCenter);
 * annotation.addChild(text);
 * annotation.getLayout().add(text);
 * annotation.updateLayout();
 *
 * // 4). Code snippet for automatic calculation of colorbar width for new data in SeismicWidget.
 * // After loading your data you can apply the following code (updateColorBarWidth) to calculate size of colorbar for seismic limits and you can listen to the following event of pipeline to update colorbar as well.
 * pipeline.on(geotoolkit.seismic.pipeline.SeismicPipeline.Events.SetOptions, function () {
 * this.updateColorBarWidth(pipeline, seismicWidget);
 * }.bind(this));
 * // Code to update colorbar width:
 * var updateColorBarWidth = function (pipeline, widget) {
 * var gap = 10;
 * var normalization = pipeline.getNormalization();
 * var limits = normalization['limits'];
 * var textStyle = new geotoolkit.attributes.TextStyle({
 * 'color': '#585858',
 * 'font': '16px sans-serif'
 * });
 * var format = new geotoolkit.util.NumberFormat({'locale': this.locale, 'maximumfractiondigits': 2});
 * var minLabelMetrics = geotoolkit.renderer.TextMetrics.measureText(format.format(limits.getLow()), textStyle);
 * var maxLabelMetrics = geotoolkit.renderer.TextMetrics.measureText(format.format(limits.getHigh()), textStyle);
 * var width = Math.max(minLabelMetrics.getWidth(), maxLabelMetrics.getWidth()) + gap;
 * widget.setOptions({
 * 'colorbar': {
 * 'axis': {
 * 'size': width
 * }
 * }
 * });
 * };
 * // 5). Example showing how to apply CSS style for whole widget
 * function generateDarkCSSRules () {
 * var DARK_THEME = [
 * '*[cssclass~="vertical-scroll"]{',
 * ' backgroundfillstyle-color: #303030;',
 * ' caretlinestyle-color: black;',
 * ' caretfillstyle-color: #666666;',
 * ' arrowfillstyle-color: #444477;',
 * ' arrowlinestyle-color: #7777AA;',
 * '}',
 * '*[cssclass~="horizontal-scroll"]{',
 * ' backgroundfillstyle-color: #303030;',
 * ' caretlinestyle-color: black;',
 * ' caretfillstyle-color: #666666;',
 * ' arrowfillstyle-color: #444477;',
 * ' arrowlinestyle-color: #7777AA;',
 * '}',
 * '*[cssclass~="seismic-status"]{',
 * ' backgroundfillstyle-color: #303030;',
 * '}',
 * '.Text { ',
 * ' textstyle-color: rgba(255,255,255,.3);',
 * '}',
 * '.geotoolkit.axis.Axis {',
 * ' tickgenerator-major-tickstyle-color: rgba(255,255,255,.3);',
 * ' tickgenerator-major-tickstyle-width: 1;',
 * ' tickgenerator-major-labelstyle-color: rgba(255,255,255,.3);',
 * ' tickgenerator-major-labelstyle-font: 11px Roboto;',
 * ' tickgenerator-edge-labelstyle-color: rgba(255,255,255,.3);',
 * ' tickgenerator-edge-tickstyle-color: rgba(255,255,255,.3);',
 * ' tickgenerator-edge-labelstyle-font: 11px Roboto;',
 * ' baselinestyle-color: rgba(255,255,255,.3);',
 * ' baselinestyle-width: 1;',
 * '}',
 * '.geotoolkit.axis.Grid {',
 * ' vtg-major-tickstyle-color: rgba(255,255,255,.3);',
 * ' htg-major-tickstyle-color: rgba(255,255,255,.3);',
 * ' htg-minor-tickvisible: false;',
 * ' vtg-minor-tickvisible: false;',
 * '}',
 * '.SeismicWidget { ',
 * ' backgroundfillstyle-color: #212121;',
 * '}'
 * ].join('\n');
 *
 * return [
 * DARK_THEME
 * ].join('');
 * }
 * ...
 * widget.setCss(new geotoolkit.css.CssStyle({'css': generateDarkCSSRules()}));
 */
geotoolkit.seismic.widgets.SeismicWidget = {};
    /**
     * Seismic widget events
     * @readonly
     * @enum
     */
    geotoolkit.seismic.widgets.SeismicWidget.Events = {};
        /**
         * Event type fired when header view visibility changed
         * @type {String}
         */
        geotoolkit.seismic.widgets.SeismicWidget.Events.HeaderViewVisibilityChanged = "";
    /**
     * Disposes this node, once disposes a node should not be used anymore.<br>
     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
     * Also aggressively 'cleanup' this node by setting some of its members to null.
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.dispose = function(){};
    /**
     * Set widget options
     * @param {object} options seismic view options
     * @param {boolean} [options.lazyupdate=false] deprecated (since 2.6) flag, if true then browser will render seismic in asynchronous mode, can be useful for old FireFox version, see (new geotoolkit.util.BrowserInfo())['isFirefox']
     * @param {string} [options.layouttype='default'] type of layout 'default' or 'inside'
     * @param {object} [options.colorbar] json defining color bar
     * @param {boolean} [options.colorbar.visible] defines visibility of colorbar
     * @param {geotoolkit.controls.shapes.ColorBarLocation} [options.colorbar.location=geotoolkit.controls.shapes.ColorBarLocation.West] defines location of colorbar (geotoolkit.controls.shapes.ColorBarLocation.East|geotoolkit.controls.shapes.ColorBarLocation.West)
     * @param {geotoolkit.attributes.LineStyle|object} [options.colorbar.linestyle=null] line style
     * @param {object} [options.colorbar.title] color bar title
     * @param {number} [options.colorbar.title.size] title area desired size
     * @param {boolean} [options.colorbar.title.visible=true] title visibility
     * @param {string} [options.colorbar.title.text=""] title text
     * @param {geotoolkit.attributes.TextStyle|object} [options.colorbar.title.textstyle] title textstyle
     * @param {object} [options.colorbar.axis] colorbar axis
     * @param {number} [options.colorbar.axis.size] axis area desired size
     * @param {boolean} [options.colorbar.axis.visible=true] axis visibility
     * @param {boolean} [options.colorbar.axis.autolabelrotation=false] axis auto label rotation flag
     * @param {object} [options.colorbar.colorbox] color box attributes
     * @param {number} [options.colorbar.colorbox.size] colorbox area desired size
     * @param {number} [options.colorbar.namedcolors.size=0] named colors desired size
     * @param {geotoolkit.attributes.LineStyle|object} [options.colorbar.colorbox.linestyle=null] colorbox outline rectangle linestyle
     * @param {geotoolkit.axis.Axis} [options.axis=null] deprecated (since 2.3) specify instance of sample axis
     * @param {object} [options.axes] specify set of axes
     * @param {object} [options.axes.samples] specify properties of vertical axis
     * @param {boolean} [options.axes.samples.visible] defines visibility of sample axis
     * @param {string} [options.axes.samples.cssclass='seismic-samples-axis'] defines cssclass of samples axis
     * @param {geotoolkit.layout.AnnotationLocation} [options.axes.samples.location = geotoolkit.layout.AnnotationLocation.West] defines location of sample axis
     * @param {geotoolkit.axis.Axis} [options.axes.samples.instance=null] defines instance of sample axis
     * @param {number} [options.axes.samples.size] defines size in pixels of samples axis
     * @param {object} [options.axes.samples.title] defines title options of sample axis
     * @param {string} [options.axes.samples.title.text=''] defines title of sample axis
     * @param {boolean} [options.axes.samples.title.visible=false] defines title visibility of sample axis
     * @param {geotoolkit.attributes.TextStyle|object} [options.axes.samples.title.textstyle] defines title text style of sample axis
     * @param {object} [options.axes.samples.ticks] objects which defines ticks options of the axis. See {geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {object} [options.axes.headers=null] seismic headers axes options
     * @param {Array<object>} [options.axes.headers.fields=[]] array of trace headers axes, should contains JSON object with 'name', 'visible' and 'minimumSpan' properties
     * @param {object} [options.axes.headers.options] default options for all axes
     * @param {number} [options.axes.headers.options.minimumSpan] minimum span for header tick generator
     * @param {object} [options.auxiliarychart] auxiliarychart options
     * @param {object} [options.auxiliarychart.size] defines size of the auxiliarychart
     * @param {object} [options.auxiliarychart.title] defines options for auxiliarychart title
     * @param {object} [options.auxiliarychart.charts] defines options for charts {@link geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setOptions}
     * @param {object} [options.scroll] specify scroll bar properties
     * @param {object} [options.scroll.horizontal] specify horizontal scroll bar properties
     * @param {boolean} [options.scroll.horizontal.visible=true] specify horizontal scroll bar visibility
     * @param {string} [options.scroll.horizontal.cssclass='horizontal-scroll'] specify horizontal scroll bar cssclass name
     * @param {object} [options.scroll.vertical] specify vertical scroll bar properties
     * @param {boolean} [options.scroll.vertical.visible=true] specify vertical scroll bar visibility
     * @param {string} [options.scroll.vertical.cssclass='vertical-scroll'] specify vertical scroll bar cssclass name
     * @param {object} [options.annotationssizes=null] JSON to hold (width or height) of the annotation
     * @param {object} [options.annotationssizes.east] JSON to hold east annotation size
     * @param {object} [options.annotationssizes.south] JSON to hold south annotation size
     * @param {object} [options.annotationssizes.west] JSON to hold west annotation size
     * @param {object} [options.annotationssizes.north] JSON to hold north annotation size
     * @param {object} [options.table] defines table properties
     * @param {boolean|string} [options.table.visible='none'] defines if plot displays headers table, true | false | 'none' | 'visible' | 'hidden'
     * @param {number} [options.table.size=200] defines size of headers table
     * @param {string} [options.table.cssclass='seismic-headers-table'] defines cssclass of headers table
     * @param {Array<geotoolkit.seismic.data.FieldDesc>|Array<string>|string} [options.table.headers] headers, array of header names, string contains header names divided by '|', or '*'
     * @param {object} [options.statusbar] specify status bar properties
     * @param {boolean} [options.statusbar.visible=true] specify status bar visibility
     * @param {string} [options.statusbar.cssclass='seismic-status'] specify status bar cssclass name
     * @param {object} [options.statusbar.sections] additional options of sections in statusbar
     * @param {function} [options.statusbar.sections.info=null] callback to return information for statusbar
     * @param {object} [options.statusbar.sections.samples] section to show information about samples like time or depth
     * @param {object} [options.statusbar.sections.samples.label=null] label to show information
     * @param {object} [options.statusbar.sections.traces] section to show information about traces
     * @param {object} [options.statusbar.sections.traces.label=' Trace Number: '] label to show information about trace
     * @param {object} [options.statusbar.sections.samplevalue] section to show information about sample value
     * @param {object} [options.statusbar.sections.samplevalue.label=' Value: '] label to show information about trace
     * @returns {geotoolkit.seismic.widgets.SeismicWidget}
     * @example
     * // 1). How to change labels in status bar
     * widget.setOptions({
     * 'statusbar': {
     * 'sections': {
     * 'samplevalue': {
     * 'label': ' Value: '
     * },
     * 'samples': {
     * 'label': 'INLINE: '
     * },
     * 'traces': {
     * 'label': 'XLINE: '
     * }
     * }
     * }
     * });
     * // 2). This example shows how to adjust the height of the colormap legend. Specify max height in %, position and sizes of each component like this
     * widget.setOptions({
     * 'colorbar': {
     * 'axis': {
     * 'size': 30
     * },
     * 'title': {
     * 'size': 20
     * },
     * 'colorbox': {
     * 'size': 10
     * },
     * 'location': geotoolkit.controls.shapes.ColorBarLocation.West,
     * 'maxheight': '90%',
     * 'alignment': geotoolkit.layout.BoxLayout.Alignment.Center
     * }, 'title': {
     * 'text': 'Seismic Widget',
     * 'location': geotoolkit.layout.AnnotationLocation.North,
     * 'visible': true
     * }, 'axes': {
     * 'samples': {
     * 'size': 50
     * }
     * }
     * });
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.setOptions = function(options){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing properties
     * @param {string} [properties.layouttype='default'] type of layout 'default' or 'inside'
     * @param {object} [properties.colorbar] json defining color bar
     * @param {boolean} [properties.colorbar.visible] defines visibility of colorbar
     * @param {geotoolkit.controls.shapes.ColorBarLocation} [properties.colorbar.location=geotoolkit.controls.shapes.ColorBarLocation.West] defines location of colorbar (geotoolkit.controls.shapes.ColorBarLocation.East|geotoolkit.controls.shapes.ColorBarLocation.West)
     * @param {geotoolkit.attributes.LineStyle|object} [properties.colorbar.linestyle=null] line style
     * @param {object} [properties.colorbar.title] color bar title
     * @param {number} [properties.colorbar.title.size] title area desired size
     * @param {boolean} [properties.colorbar.title.visible=true] title visibility
     * @param {string} [properties.colorbar.title.text=""] title text
     * @param {geotoolkit.attributes.TextStyle|object} [properties.colorbar.title.textstyle] title textstyle
     * @param {object} [properties.colorbar.axis] colorbar axis
     * @param {number} [properties.colorbar.axis.size] axis area desired size
     * @param {boolean} [properties.colorbar.axis.visible=true] axis visibility
     * @param {boolean} [properties.colorbar.axis.autolabelrotation=false] axis auto label rotation flag
     * @param {object} [properties.colorbar.colorbox] color box attributes
     * @param {number} [properties.colorbar.colorbox.size] colorbox area desired size
     * @param {number} [properties.colorbar.namedcolors.size=0] named colors desired size
     * @param {geotoolkit.attributes.LineStyle|object} [properties.colorbar.colorbox.linestyle=null] colorbox outline rectangle linestyle
     * @param {geotoolkit.axis.Axis} [properties.axis=null] deprecated (since 2.3) specify instance of sample axis
     * @param {object} [properties.axes] specify set of axes
     * @param {object} [properties.axes.samples] specify properties of vertical axis
     * @param {boolean} [properties.axes.samples.visible] defines visibility of sample axis
     * @param {string} [properties.axes.samples.cssclass='seismic-samples-axis'] defines cssclass of samples axis
     * @param {geotoolkit.layout.AnnotationLocation} [properties.axes.samples.location = geotoolkit.layout.AnnotationLocation.West] defines location of sample axis
     * @param {geotoolkit.axis.Axis} [properties.axes.samples.instance=null] defines instance of sample axis
     * @param {number} [properties.axes.samples.size] defines size in pixels of samples axis
     * @param {object} [properties.axes.samples.title] defines title options of sample axis
     * @param {string} [properties.axes.samples.title.text=''] defines title of sample axis
     * @param {boolean} [properties.axes.samples.title.visible=false] defines title visibility of sample axis
     * @param {object} [properties.axes.samples.ticks] objects which defines ticks options of the axis. See {geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {object} [properties.axes.headers=null] seismic headers axes options
     * @param {Array<object>} [properties.axes.headers.fields=[]] array of trace headers axes, should contains JSON object with 'name', 'visible' and 'minimumSpan' properties
     * @param {object} [properties.axes.headers.options] default options for all axes
     * @param {number} [properties.axes.headers.options.minimumSpan] minimum span for header tick generator
     * @param {geotoolkit.attributes.TextStyle|object} [properties.axes.samples.title.textstyle] defines title text style of sample axis
     * @param {object} [properties.auxiliarychart] options for auxiliary chart {@link geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setOptions}
     * @param {object} [properties.scroll] specify scroll bar properties
     * @param {object} [properties.scroll.horizontal] specify horizontal scroll bar properties
     * @param {boolean} [properties.scroll.horizontal.visible=true] specify horizontal scroll bar visibility
     * @param {string} [properties.scroll.horizontal.cssclass='horizontal-scroll'] specify horizontal scroll bar cssclass name
     * @param {object} [properties.scroll.vertical] specify vertical scroll bar properties
     * @param {boolean} [properties.scroll.vertical.visible=true] specify vertical scroll bar visibility
     * @param {string} [properties.scroll.vertical.cssclass='vertical-scroll'] specify vertical scroll bar cssclass name
     * @param {object} [properties.annotationssizes=null] JSON to hold (width or height) of the annotation
     * @param {object} [properties.annotationssizes.east] JSON to hold east annotation size
     * @param {object} [properties.annotationssizes.south] JSON to hold south annotation size
     * @param {object} [properties.annotationssizes.west] JSON to hold west annotation size
     * @param {object} [properties.annotationssizes.north] JSON to hold north annotation size
     * @param {object} [properties.table] defines table properties
     * @param {boolean|string} [properties.table.visible='none'] defines if plot displays headers table, true | false | 'none' | 'visible' | 'hidden'
     * @param {number} [properties.table.size=200] defines size of headers table
     * @param {string} [properties.table.cssclass='seismic-headers-table'] defines cssclass of headers table
     * @param {Array<geotoolkit.seismic.data.FieldDesc>|Array<string>|string} [properties.table.headers] headers, array of header names, string contains header names divided by '|', or '*'
     * @param {object} [properties.statusbar] specify status bar properties
     * @param {boolean} [properties.statusbar.visible=true] specify status bar visibility
     * @param {string} [properties.statusbar.cssclass='seismic-status'] specify status bar cssclass name
     * @param {object} [properties.statusbar.sections] additional options of sections in statusbar
     * @param {function} [properties.statusbar.sections.info=null] callback to return information for statusbar
     * @param {object} [properties.statusbar.sections.samples] section to show information about samples like time or depth
     * @param {object} [properties.statusbar.sections.samples.label=null] label to show information
     * @param {object} [properties.statusbar.sections.traces] section to show information about traces
     * @param {object} [properties.statusbar.sections.traces.label=' Trace Number: '] label to show information about trace
     * @param {object} [properties.statusbar.sections.samplevalue] section to show information about sample value
     * @param {object} [properties.statusbar.sections.samplevalue.label=' Value: '] label to show information about trace
     * @returns {geotoolkit.seismic.widgets.SeismicWidget} this
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.setProperties = function(properties){};
    /**
     * Set subset of header fields to be displayed in table widget
     *
     * @param {Array<geotoolkit.seismic.data.FieldDesc>|Array<string>|string} headers array of header names, string contains header names divided by '|', or '*'
     * @returns {geotoolkit.seismic.widgets.SeismicWidget}
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.setTableHeaders = function(headers){};
    /**
     * Returns preferred headers array(or string) that are displaying in table widget
     *
     * @returns {string|Array<object>} can be '*' or array of JSON objects with 'identifier', 'name' and 'title' property
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.getTableHeaders = function(){};
    /**
     * Add header chart
     * @param {string} headerName trace header name
     * @param {object} [options] chart options
     * @param {geotoolkit.util.Range} [options.range] header data range
     * @param {object|string|geotoolkit.attributes.LineStyle} [options.linestyle] line style
     * @param {object} [options.chart] chart options
     * @param {object|string|geotoolkit.attributes.LineStyle} [options.chart.linestyle] chart line style
     * @param {object} [options.axis] axis options
     * @param {object|string|geotoolkit.attributes.LineStyle} [options.axis.linestyle] axis line style
     * @returns {geotoolkit.seismic.widgets.SeismicWidget} this
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.addHeaderChart = function(headerName, options){};
    /**
     * Remove header
     * @param {string} headerName trace header name
     * @returns {geotoolkit.seismic.widgets.SeismicWidget} this
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.removeHeaderChart = function(headerName){};
    /**
     * Returns current widget options
     * @returns {object} options
     * @returns {object} [options.colorbar] colorbar
     * @returns {boolean} [options.colorbar.visible] defines visibility of colorbar
     * @returns {geotoolkit.controls.shapes.ColorBarLocation} [options.colorbar.location=geotoolkit.controls.shapes.ColorBarLocation.West] defines location of colorbar (geotoolkit.controls.shapes.ColorBarLocation.East|geotoolkit.controls.shapes.ColorBarLocation.West)
     * @returns {object} [options.axes] specify set of axes
     * @returns {object} [options.axes.samples] specify properties of vertical axis
     * @returns {boolean} [options.axes.samples.visible] defines visibility of sample axis
     * @returns {string} [options.axes.samples.cssclass='seismic-samples-axis'] defines cssclass of samples axis
     * @returns {geotoolkit.layout.AnnotationLocation} [options.axes.samples.location = geotoolkit.layout.AnnotationLocation.West] defines location of sample axis
     * @returns {geotoolkit.axis.Axis} [options.axes.samples.instance=null] defines instance of sample axis
     * @returns {object} [options.axes.samples.title] defines title options of sample axis
     * @returns {string} [options.axes.samples.title.text=''] defines title of sample axis
     * @returns {boolean} [options.axes.samples.title.visible=false] defines title visibility of sample axis
     * @returns {Array<object>} [options.axes.headers=[]] array of header axes, should contains JSON object with 'name' property and 'visible' property
     * @returns {geotoolkit.attributes.TextStyle|object} [options.axes.samples.title.textstyle] defines title text style of sample axis
     * @returns {object} [options.scroll] specify status bar properties
     * @returns {object} [options.scroll.horizontal] specify horizontal scroll bar properties
     * @returns {boolean} [options.scroll.horizontal.visible=true] specify horizontal scroll bar visibility
     * @returns {string} [options.scroll.horizontal.cssclass='horizontal-scroll'] specify horizontal scroll bar cssclass name
     * @returns {object} [options.scroll.vertical] specify vertical scroll bar properties
     * @returns {boolean} [options.scroll.vertical.visible=true] specify vertical scroll bar visibility
     * @returns {string} [options.scroll.vertical.cssclass='vertical-scroll'] specify vertical scroll bar cssclass name
     * @returns {object} [options.table] defines table properties
     * @returns {object} [options.table.index] defines table index column properties
     * @returns {number|string} [options.table.index.size] defines table index column size
     * @returns {string|Array<object>} [options.table.headers='*'] defines array of headers displayed in table, contains JSON objects with 'identifier', 'name' and 'title' property
     * @returns {boolean|string} [options.table.visible='none'] defines if plot displays headers table, true | false | 'none' | 'visible' | 'hidden'
     * @returns {number} [options.table.size=200] defines table size
     * @returns {string} [options.table.cssclass='seismic-headers-table'] defines cssclass of headers table
     * @returns {object} [options.statusbar] specify status bar properties
     * @returns {boolean} [options.statusbar.visible=true] specify status bar visibility
     * @returns {string} [options.statusbar.cssclass='seismic-status'] specify status bar cssclass name
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.getOptions = function(){};
    /**
     * set pipeline
     * @override
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline Seismic Pipeline
     * @returns {geotoolkit.seismic.widgets.SeismicWidget} this
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.setPipeline = function(pipeline){};
    /**
     * This method updates the layout of the seismic widget and all its child components with new/modified settings.
     * @returns {geotoolkit.seismic.widgets.SeismicWidget} this
     * @override
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.updateLayout = function(){};
    /**
     * Returns exportable element
     * @param {object} [options]
     * @returns {geotoolkit.scene.exports.AbstractDocumentElement} return exportable element
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.getExportElement = function(options){};
    /**
     * Used to prepare object before exporting
     * @returns {geotoolkit.seismic.widgets.SeismicWidget} this
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.beginExport = function(){};
    /**
     * Used to restore object's state after exporting
     */
    geotoolkit.seismic.widgets.SeismicWidget.prototype.endExport = function(){};

