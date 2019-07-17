/**
 * API to Defines classes used to create flowcharts
 * @namespace
 */
geotoolkit.flowcharts = {};

/**
 * Contains utility classes required for flowcharts package
 * @namespace
 */
geotoolkit.flowcharts.utils = {};

/**
 * Contains scene-related classes, such as Scene Editor, visuals, etc.
 * @namespace
 */
geotoolkit.flowcharts.shapes = {};
    /**
     * String constants for all possible diagram widget tools
     * @enum
     * @type {{None: string, Panning: string, RubberBandSelection: string}}
     */
    geotoolkit.flowcharts.shapes.DiagramTools = {};
        
        geotoolkit.flowcharts.shapes.DiagramTools.None = {};
        /**
         * Panning
         * @type {string}
         */
        geotoolkit.flowcharts.shapes.DiagramTools.Panning = "";
        /**
         * RubberBandSelection
         * @type {string}
         */
        geotoolkit.flowcharts.shapes.DiagramTools.RubberBandSelection = "";

/**
 * Contains scene-related classes, such as Scene Editor, visuals, etc.
 * @namespace
 */
geotoolkit.flowcharts.shapes.connectors = {};
    /**
     * Defines a side of the link visual: Begin (0) or End (1)
     * @enum
     */
    geotoolkit.flowcharts.shapes.connectors.LinkSide = {};
        /**
         * Denotes "flow" start of the link
         * @type {number}
         */
        geotoolkit.flowcharts.shapes.connectors.LinkSide.Begin = NaN;
        /**
         * Denotes "flow" end of the link
         * @type {number}
         */
        geotoolkit.flowcharts.shapes.connectors.LinkSide.End = NaN;
    /**
     * Defines link mode: No links (definges logic connection), Single-side connection or double connection
     * @enum
     */
    geotoolkit.flowcharts.shapes.connectors.LinkingMode = {};
        /**
         * No links/connections
         * @type {number}
         */
        geotoolkit.flowcharts.shapes.connectors.LinkingMode.NoLinks = NaN;
        /**
         * Single side linked connection
         * @type {number}
         */
        geotoolkit.flowcharts.shapes.connectors.LinkingMode.SingleLink = NaN;
        /**
         * Double side linked connection
         * @type {number}
         */
        geotoolkit.flowcharts.shapes.connectors.LinkingMode.DoubleLink = NaN;
    /**
     * Link Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.flowcharts.shapes.connectors.Events = {};
        /**
         * Event type fired when a link has been disconnected
         * @type {string}
         */
        geotoolkit.flowcharts.shapes.connectors.Events.Disconnected = "";
        /**
         * Event type fired when a link has been connected
         * @type {string}
         */
        geotoolkit.flowcharts.shapes.connectors.Events.Connected = "";

/**
 * Contains classes that enable scene editing features
 * @namespace
 */
geotoolkit.flowcharts.shapes.edit = {};
    /**
     * Link type
     * @enum
     * @readonly
     */
    geotoolkit.flowcharts.shapes.edit.LinkType = {};
        /**
         * @type {number}
         */
        geotoolkit.flowcharts.shapes.edit.LinkType.Line = NaN;
        /**
         * @type {number}
         */
        geotoolkit.flowcharts.shapes.edit.LinkType.Step = NaN;

/**
 * Contains classes that define visual cue handles
 * @namespace
 */
geotoolkit.flowcharts.shapes.edit.handles = {};

/**
 * Contains classes that provide default visuals
 * @namespace
 */
geotoolkit.flowcharts.plugins = {};

/**
 * Classes with default libraries
 * @namespace
 */
geotoolkit.flowcharts.plugins.library = {};

/**
 * Provides API for the scene persistence and export
 * @namespace
 */
geotoolkit.flowcharts.persistence = {};

/**
 * Contains classes for visuals persistence
 * @namespace
 */
geotoolkit.flowcharts.persistence.visuals = {};

/**
 * Contains classes for commands
 * @namespace
 */
geotoolkit.flowcharts.commands = {};

/**
 * A simple and lite event emitter that represents a collection of functions
 * that will be invoked upon trigger() call
 * @class geotoolkit.flowcharts.utils.LiteEvent
 */
geotoolkit.flowcharts.utils.LiteEvent = {};
    /**
     * Subscribes a handler to the event
     * @param {*} handler function handler
     */
    geotoolkit.flowcharts.utils.LiteEvent.prototype.on = function(handler){};
    /**
     * Unsubscribes a handler from the event
     * @param {*} handler function handler
     */
    geotoolkit.flowcharts.utils.LiteEvent.prototype.off = function(handler){};
    /**
     * Emits an event with the specified data
     * @param {*} data event data that will be passed to all subscribed event handlers
     */
    geotoolkit.flowcharts.utils.LiteEvent.prototype.trigger = function(data){};

/**
 * Loads a resource from disk and stores it into a cache
 * @class geotoolkit.flowcharts.shapes.ResourceLoader
 */
geotoolkit.flowcharts.shapes.ResourceLoader = {};
    /**
     * Loads a text from the specified url and caches it. If was previously loaded then cache will be used instead
     * @param {string} url resource url
     * @returns {geotoolkit.util.Promise} a promise with "resolve" and "reject" methods. "resolve" will contain text on success,
     * "reject" will contain error message on fail.
     */
    geotoolkit.flowcharts.shapes.ResourceLoader.loadText = function(url){};

/**
 * Base interface for all visuals that can be placed into Diagram
 * @interface
 */
geotoolkit.flowcharts.shapes.IComponent = {};
    /**
     * Returns component class, string value
     * @function
     * @abstract
     * @returns {string}
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.getPrototypeId = function(){};
    /**
     * The name of the component
     * @function
     * @abstract
     * @returns {string}
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.getPrototypeName = function(){};
    /**
     * Drawing category. The default value is 'default'
     * @function
     * @abstract
     * @returns {string}
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.getCategory = function(){};
    /**
     * Cue words for the component search. By default, the shape will not be searched
     * @function
     * @abstract
     * @returns {Array<string>}
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.getSearchKeywords = function(){};
    /**
     * Defines default visual size in UI units (pixels by default). Default value is (50, 50)
     * @function
     * @abstract
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.getDefaultSize = function(){};
    /**
     * Defines default visual size in UI units (pixels by default). Default value is (50, 50)
     * @param {geotoolkit.util.Dimension} dimension new default dimension
     * @function
     * @abstract
     * @returns {*|geotoolkit.flowcharts.shapes.IComponent}
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.setDefaultSize = function(dimension){};
    /**
     * gets geometry for the drawing
     * @function
     * @abstract
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.getGeometry = function(){};
    /**
     * Gets default link points in model space. If not specified, the 'outline' property will be used.
     * If 'ouline' is not set, then the shape becomes 'unconnectable'
     * @function
     * @abstract
     * @returns {Array<geotoolkit.util.Point>}
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.getLinkPoints = function(){};
    /**
     * Sets link points. Link points must be defined in the shapes's model
     * space
     * @param {Array<geotoolkit.util.Point>} points an array of model-space points
     * that represent possible connections
     * @function
     * @abstract
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.setLinkPoints = function(points){};
    /**
     * Sets text and its options
     * @param {*|string} textOptions text and/or its options
     * @param {string} [textOptions.text] text content
     * @function
     * @abstract
     * @returns {*} this instance
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.setText = function(textOptions){};
    /**
     * @function
     * @abstract
     * @param {string} url
     * @returns {geotoolkit.flowcharts.shapes.IComponent} this
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.setUrl = function(url){};
    /** Gets URL for an icon
     * @function
     * @abstract
     * @returns {string}
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.getUrl = function(){};
    /**
     * @function
     * @abstract
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.flowcharts.shapes.IComponent.prototype.getDefaultIconSize = function(){};

/**
 * Stores information about connection between a visual and a link ("arrow").
 * That said, modelPoint defines a point for the link in visual's bounds (which does takes
 * Local Transformation into account). LinkSide defines the side of a link: Begin or End.
 * linkVisual defines a link that is connected to a visual.
 * @param {geotoolkit.flowcharts.shapes.IComponent} visual a visual that is related to the link
 * @param {geotoolkit.util.Point} point an anchor point in visual's coordinate system.
 * @param {geotoolkit.flowcharts.shapes.connectors.LinkSide} linkSide side of the link (begin=0 or end=1)
 * @param {*|geotoolkit.flowcharts.shapes.connectors.ILink} linkVisual a link visual instance
 * @class geotoolkit.flowcharts.shapes.connectors.LinkConnection
 */
geotoolkit.flowcharts.shapes.connectors.LinkConnection = {};
    /**
     * Gets associagated visual
     * @returns {*|geotoolkit.scene.Node}
     */
    geotoolkit.flowcharts.shapes.connectors.LinkConnection.prototype.getVisual = function(){};
    /**
     * Gets model point (in visual space)
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.flowcharts.shapes.connectors.LinkConnection.prototype.getModelPoint = function(){};
    /**
     * Gets link side that defines link orientation (flow)
     * @returns {geotoolkit.flowcharts.shapes.connectors.LinkSide}
     */
    geotoolkit.flowcharts.shapes.connectors.LinkConnection.prototype.getLinkSide = function(){};
    /**
     * return link visual
     * @returns {geotoolkit.scene.shapes.Polyline}
     */
    geotoolkit.flowcharts.shapes.connectors.LinkConnection.prototype.getLinkVisual = function(){};
    /**
     * gets a visual related to this connection
     * @public
     * @returns {*} a visual ID
     */
    geotoolkit.flowcharts.shapes.connectors.LinkConnection.prototype.getRelatedVisualId = function(){};

/**
 * A visual that can be inserted into the DiagramWidget. Base class for holding visuals used in the Diagram
 * @class geotoolkit.flowcharts.shapes.DiagramVisual
 * @augments geotoolkit.scene.Group
 * @implements geotoolkit.flowcharts.shapes.IComponent
 * @param {object} [options=null] visual options
 */
geotoolkit.flowcharts.shapes.DiagramVisual = {};
    /**
     * Creates a copy from the given source
     * @param {*|geotoolkit.flowcharts.shapes.DiagramVisual} src source object to copy from
     * @returns {geotoolkit.flowcharts.shapes.DiagramVisual}
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.copyConstructor = function(src){};
    /**
     * Mark this instance to be updated.
     * @param {geotoolkit.util.Rect[]} [regions] optional array to return invalid rectangles
     * @param {geotoolkit.scene.Node.StateChanges} [changes] optional parameter to specify a reason of changes
     * @returns {geotoolkit.flowcharts.shapes.DiagramVisual} this
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.updateState = function(regions, changes){};
    /**
     * Renders the diagram visual
     * @param {geotoolkit.renderer.RenderingContext} context context to render self
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.render = function(context){};
    /**
     * Returns component class, string value
     * @returns {string} string instance representing component class
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getPrototypeId = function(){};
    /**
     * Gets component name
     * @returns {string} string instance representing component name
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getPrototypeName = function(){};
    /**
     * Gets component category
     * @returns {string} string instance representing component catetory
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getCategory = function(){};
    /**
     * Gets an array of keywords for better search
     * @returns {Array<string>} an array of search keywords
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getSearchKeywords = function(){};
    /**
     * Sets default size of the visual
     * @param {geotoolkit.util.Dimension} dimension new default dimension
     * @returns {*|geotoolkit.flowcharts.shapes.DiagramVisual} this instance
     * @returns {geotoolkit.flowcharts.shapes.DiagramVisual} this
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.setDefaultSize = function(dimension){};
    /**
     * Gets default size of the visual
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getDefaultSize = function(){};
    /**
     * Gets geometry for the current link visual
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getGeometry = function(){};
    /**
     * Sets link points. Link points must be defined in the shapes's model
     * space
     * @param {Array<geotoolkit.util.Point>} points an array of model-space points
     * that represent possible connections
     * @returns {geotoolkit.flowcharts.shapes.DiagramVisual} this
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.setLinkPoints = function(points){};
    /**
     * Returns an array of link points: begin and end
     * @returns {Array<geotoolkit.util.Point>} an array of linking points
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getLinkPoints = function(){};
    /**
     * Gets outline (path) for the Visual
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getOutline = function(){};
    /**
     * Gets the default icon size for UI representation
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getDefaultIconSize = function(){};
    /**
     * Sets url for icon
     * @param {string} value url to an icon
     * @returns {geotoolkit.flowcharts.shapes.DiagramVisual} this
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.setUrl = function(value){};
    /**
     * Gets url for icon
     * @returns {string}
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getUrl = function(){};
    /**
     * Sets text and its options
     * @param {*|string} textOptions text and/or its options
     * @param {string} [textOptions.text] text content
     * @param {geotoolkit.attributes.TextStyle} [textOptions.style] text style
     * @returns {geotoolkit.flowcharts.shapes.DiagramVisual} this
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.setText = function(textOptions){};
    /**
     * Gets previously set text to the visual
     * @returns {object} [props] JSON containing text and its style
     * {string} [props.text] local transform
     * {*} [props.style] text style (geotoolkit.attributes.TextStyle object)
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getText = function(){};
    /**
     * Sets properties
     * @param {*} properties visual properties
     * @returns {geotoolkit.flowcharts.shapes.DiagramVisual}
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.setProperties = function(properties){};
    /**
     * Gets properties
     * @returns {*}
     */
    geotoolkit.flowcharts.shapes.DiagramVisual.prototype.getProperties = function(){};

/**
 * A visual used for SVG graphics rendering. SVG may load slowly or not load at all, this visual loads contents asynchronously and renders it once it’s done.
 * @class geotoolkit.flowcharts.shapes.SvgDiagramVisual
 * @augments geotoolkit.flowcharts.shapes.DiagramVisual
 * @param {*} [options] visual options
 */
geotoolkit.flowcharts.shapes.SvgDiagramVisual = {};
    /**
     * Sets a new SVG data
     * @param {string} svgData a well-formed SVG document to set
     */
    geotoolkit.flowcharts.shapes.SvgDiagramVisual.prototype.setData = function(svgData){};
    /**
     * Creates a copy from the given source
     * @param {*|geotoolkit.flowcharts.shapes.SvgDiagramVisual} src source object to copy from
     * @returns {geotoolkit.flowcharts.shapes.SvgDiagramVisual}
     */
    geotoolkit.flowcharts.shapes.SvgDiagramVisual.prototype.copyConstructor = function(src){};
    /**
     * @inheritdoc
     */
    geotoolkit.flowcharts.shapes.SvgDiagramVisual.prototype.setUrl = function(){};
    /**
     * Renders the SvgDiagram visual
     * @param {geotoolkit.renderer.RenderingContext} context context to render self
     */
    geotoolkit.flowcharts.shapes.SvgDiagramVisual.prototype.render = function(context){};
    /**
     * Gets a flag indicating if the link points are defined in
     * relative (proportional) values
     * @returns {boolean|*}
     */
    geotoolkit.flowcharts.shapes.SvgDiagramVisual.prototype.getIsLinkPointsRelative = function(){};
    /**
     * Get a collection of relative points, if defined.
     * Values assumed as percentages: 0 - 0%, 1 - 100%
     * @returns {Array<geotoolkit.util.Point>} an array of relative points
     */
    geotoolkit.flowcharts.shapes.SvgDiagramVisual.prototype.getRelativeLinkPoints = function(){};
    /**
     * Returns an array of link points. This array may be calculated
     * dynamically if points are defined in relative mode
     * @returns {Array<geotoolkit.util.Point>} an array of linking points
     */
    geotoolkit.flowcharts.shapes.SvgDiagramVisual.prototype.getLinkPoints = function(){};
    /**
     * Has no effect, assuming SVG image should remain unchanged
     * @param {*} properties ignored
     * @returns {geotoolkit.flowcharts.shapes.SvgDiagramVisual}
     */
    geotoolkit.flowcharts.shapes.SvgDiagramVisual.prototype.setProperties = function(properties){};
    /**
     * Gets properties
     * @returns {*}
     */
    geotoolkit.flowcharts.shapes.SvgDiagramVisual.prototype.getProperties = function(){};

/**
 * Base interface for links
 * @interface
 * @extends geotoolkit.flowcharts.shapes.IComponent
 */
geotoolkit.flowcharts.shapes.connectors.ILink = {};
    /**
     * Gets array of connections
     * @function
     * @abstract
     * @returns {Array<geotoolkit.flowcharts.shapes.connectors.LinkConnection>} an array of connections
     */
    geotoolkit.flowcharts.shapes.connectors.ILink.prototype.getConnections = function(){};
    /**
     * Gets array of connections
     * @param {boolean} [force] force
     * @function
     * @abstract
     * @returns {Array<geotoolkit.flowcharts.shapes.connectors.LinkConnection>} an array of connections
     */
    geotoolkit.flowcharts.shapes.connectors.ILink.prototype.updateLinks = function(force){};

/**
 * A simple polygonal link that connects two shapes together.
 * @class geotoolkit.flowcharts.shapes.connectors.LinkVisual
 * @augments geotoolkit.scene.shapes.Polyline
 * @implements geotoolkit.flowcharts.shapes.connectors.ILink
 * @param {object} [options=null] visual properties
 */
geotoolkit.flowcharts.shapes.connectors.LinkVisual = {};
    /**
     * Returns component class, string value
     * @returns {string} string instance representing component class
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getPrototypeId = function(){};
    /**
     * Gets component name
     * @returns {string} string instance representing component name
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getPrototypeName = function(){};
    /**
     * Gets component category
     * @returns {string} string instance representing component catetory
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getCategory = function(){};
    /**
     * Gets an array of keywords for better search
     * @returns {Array<string>} an array of search keywords
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getSearchKeywords = function(){};
    /**
     * Gets default size of the link visual
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getDefaultSize = function(){};
    /**
     * This method does nothing for the link visual
     * @param {geotoolkit.util.Dimension} dimension new default dimension
     * @returns {*|geotoolkit.flowcharts.shapes.connectors.LinkVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.setDefaultSize = function(dimension){};
    /**
     * Sets text and its options
     * @param {*|string} textOptions text and/or its options
     * @param {string} [textOptions.text] text content
     * @returns {geotoolkit.flowcharts.shapes.connectors.LinkVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.setText = function(textOptions){};
    /**
     * Gets geometry for the current link visual
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getGeometry = function(){};
    /**
     * Returns an array of link points: begin and end
     * @returns {Array<geotoolkit.util.Point>} an array of linking points
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getLinkPoints = function(){};
    /**
     * LinkVisual does not let setting alternative linking points, only begin and end
     * @param {*} ignored ignored parameter
     * @returns {geotoolkit.flowcharts.shapes.connectors.LinkVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.setLinkPoints = function(ignored){};
    /**
     * Gets outline (path) for the Link Visual
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getOutline = function(){};
    /**
     * Gets the default icon size for UI representation
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getDefaultIconSize = function(){};
    /**
     * Sets url for icon
     * @param {string} value url for icon
     * @returns {geotoolkit.flowcharts.shapes.connectors.LinkVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.setUrl = function(value){};
    /**
     * Gets url for icon
     * @returns {string}
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getUrl = function(){};
    /**
     * Gets text shape from the current link visual
     * @returns {geotoolkit.scene.shapes.Text|*} text visual instance (if set)
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getTextShape = function(){};
    /**
     * Get link type
     * @returns {geotoolkit.flowcharts.shapes.edit.LinkType} a type of the link
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getLinkType = function(){};
    /**
     * Sets link type
     * @param {geotoolkit.flowcharts.shapes.edit.LinkType} value desired link type
     * @returns {geotoolkit.flowcharts.shapes.connectors.LinkVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.setLinkType = function(value){};
    /**
     * Gets symbol size
     * @returns {{width: number, height: number}} symbol width and height
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getSymbolSize = function(){};
    /**
     * Sets linking mode. This mode defines logic of the link as well as its appearance.
     * @param {geotoolkit.flowcharts.shapes.connectors.LinkingMode} mode a new linking mode to set
     * @returns {geotoolkit.flowcharts.shapes.connectors.LinkVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.setLinkingMode = function(mode){};
    /**
     * Gets linking mode. This mode defines logic of the link as well as its appearance.
     * @returns {geotoolkit.flowcharts.shapes.connectors.LinkingMode}current linking mode
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getLinkingMode = function(){};
    /**
     * Gets tubing width, if set to Schematics/skin mode
     * @returns {number} a tubing width
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getTubingWidth = function(){};
    /**
     * Ses tubing width for schematic/skin mode
     * @param {number} value a width for the "tubing"
     * @returns {geotoolkit.flowcharts.shapes.connectors.LinkVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.setTubingWidth = function(value){};
    /**
     * Gets current bounds
     * @returns {geotoolkit.util.Rect} current bounds
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getBounds = function(){};
    /**
     * Creates exact self copy
     * @returns {geotoolkit.flowcharts.shapes.connectors.LinkVisual} a clone
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.clone = function(){};
    /**
     * Connects self to the given visual, using the given linkside to the model point (in coordinates of visual)
     * @param {geotoolkit.scene.Node} visual a visual to connect to
     * @param {geotoolkit.flowcharts.shapes.connectors.LinkSide} linkSide link side (begin or end)
     * @param {geotoolkit.util.Point} visualModelPoint model coordinates (in visual model space)
     * @returns {boolean} true on success, false on fail
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.connectTo = function(visual, linkSide, visualModelPoint){};
    /**
     * Gets array of connections
     * @returns {Array<geotoolkit.flowcharts.shapes.connectors.LinkConnection>} an array of connections
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getConnections = function(){};
    /**
     * Checks if the link visual was previously connected and disconnects if so.
     * If devicePoint coordinates are specified, then a point with index pointIndex will be set to
     * model position, calculated from devicePoint value.
     * The devicePoint X Y values are used to provide "sticky" behavior for hot points.
     * @param {geotoolkit.flowcharts.shapes.connectors.LinkSide} linkSide defines side of the link
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.disconnectFrom = function(linkSide){};
    /**
     * checks if the visual connected to the link and returns all link point indexes. If not connected, an empty
     * array returns
     * @param {geotoolkit.scene.Node} visual a visual to get connection points.
     * @returns {Array<number>}
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.getConnectedIndexes = function(visual){};
    /**
     * Performs links update, using previously set up connections.
     * It takes connected shapes and updates self begin and end points depending on
     * connected points
     * @param {boolean} [force] force
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.updateLinks = function(force){};
    /**
     * Moves link handle to the given device coordinates
     * @param {geotoolkit.flowcharts.shapes.connectors.LinkSide} linkSide a link side to move (begin or end)
     * @param {geotoolkit.util.Point} modelPoint new position for the link handle in parent's model coordinates
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.moveLinkHandle = function(linkSide, modelPoint){};
    /**
     * Checks if the link visual can connect to a component at the given model point (in parent's coordinate system)
     * @param {*} component a component to check if the link visual can connect to
     * @param {geotoolkit.util.Point} modelPoint a point in model space
     * @param {number} minDistance minimum distance in device units (pixels) for snapping
     * @returns {geotoolkit.util.Point} model link point or <b>null</b> if can not connect
     */
    geotoolkit.flowcharts.shapes.connectors.LinkVisual.prototype.canConnect = function(component, modelPoint, minDistance){};

/**
 * Polygonal link visual. This visual allows to create points in real-time,
 * e.g. draw custom link.
 * @class geotoolkit.flowcharts.shapes.connectors.PolylineVisual
 * @augments geotoolkit.scene.shapes.Polyline
 * @implements geotoolkit.flowcharts.shapes.connectors.ILink
 * @param {object} [options=null] options
 */
geotoolkit.flowcharts.shapes.connectors.PolylineVisual = {};
    /**
     * Returns component class, string value
     * @returns {string} string instance representing component class
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getPrototypeId = function(){};
    /**
     * Gets component name
     * @returns {string} string instance representing component name
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getPrototypeName = function(){};
    /**
     * Gets component category
     * @returns {string} string instance representing component catetory
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getCategory = function(){};
    /**
     * Gets an array of keywords for better search
     * @returns {Array<string>} an array of search keywords
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getSearchKeywords = function(){};
    /**
     * Gets default size of the link visual
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getDefaultSize = function(){};
    /**
     * This method does nothing for the link visual
     * @param {geotoolkit.util.Dimension} dimension new default dimension
     * @returns {*|geotoolkit.flowcharts.shapes.connectors.PolylineVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.setDefaultSize = function(dimension){};
    /**
     * Sets text and its options
     * @param {*|string} textOptions text and/or its options
     * @param {string} [textOptions.text] text content
     * @returns {geotoolkit.flowcharts.shapes.connectors.PolylineVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.setText = function(textOptions){};
    /**
     * Gets geometry for the current link visual
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getGeometry = function(){};
    /**
     * Returns an array of link points: begin and end
     * @returns {Array<geotoolkit.util.Point>} an array of linking points
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getLinkPoints = function(){};
    /**
     * LinkVisual does not let setting alternative linking points, only begin and end
     * @param {*} ignored ingored param
     * @returns {geotoolkit.flowcharts.shapes.connectors.PolylineVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.setLinkPoints = function(ignored){};
    /**
     * Gets outline (path) for the Link Visual
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getOutline = function(){};
    /**
     * Gets the default icon size for UI representation
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getDefaultIconSize = function(){};
    /**
     * Sets url for icon
     * @param {string} value a url to an icon
     * @returns {geotoolkit.flowcharts.shapes.connectors.PolylineVisual} this
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.setUrl = function(value){};
    /**
     * Gets url for icon
     * @returns {string}
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getUrl = function(){};
    /**
     * Gets tubing width, if set to Schematics/skin mode
     * @returns {number} a tubing width
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getTubingWidth = function(){};
    /**
     * Ses tubing width for schematic/skin mode
     * @param {number} value a width for the "tubing"
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.setTubingWidth = function(value){};
    /**
     * Gets current bounds
     * @returns {geotoolkit.util.Rect} current bounds
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getBounds = function(){};
    /**
     * Connects self to the given visual, using the given linkside to the model point (in coordinates of visual)
     * @param {geotoolkit.scene.Node} visual a visual to connect to
     * @param {geotoolkit.flowcharts.shapes.connectors.LinkSide} linkSide link side (begin or end)
     * @param {geotoolkit.util.Point} visualModelPoint model coordinates (in visual model space)
     * @returns {boolean} true on success, false on fail
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.connectTo = function(visual, linkSide, visualModelPoint){};
    /**
     * Gets array of connections
     * @returns {Array<geotoolkit.flowcharts.shapes.connectors.LinkConnection>} an array of connections
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getConnections = function(){};
    /**
     * Checks if the link visual was previously connected and disconnects if so.
     * If devicePoint coordinates are specified, then a point with index pointIndex will be set to
     * model position, calculated from devicePoint value.
     * The devicePoint X Y values are used to provide "sticky" behavior for hot points.
     * @param {geotoolkit.flowcharts.shapes.connectors.LinkSide} linkSide defines side of the link
     * @param {number} [devicePointX] device X-coordinate to reset. Ignored if null
     * @param {number} [devicePointY] device Y-coordinate to reset. Ignored if null
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.disconnectFrom = function(linkSide, devicePointX, devicePointY){};
    /**
     * checks if the visual connected to the link and returns all link point indexes. If not connected, an empty
     * array returns
     * @param {geotoolkit.scene.Node} visual a visual to get connection points.
     * @returns {Array<number>}
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.getConnectedIndexes = function(visual){};
    /**
     * Performs links update, using previously set up connections.
     * It takes connected shapes and updates self begin and end points depending on
     * connected points
     * @param {boolean} [force] force
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.updateLinks = function(force){};
    /**
     * Checks if the link visual can connect to a component
     * @param {geotoolkit.scene.Node} component a component to check if the link visual can connect to
     * @param {geotoolkit.util.Point} modelPoint a point in parent's model space
     * @param {number} minDistance minimum distance in device units (pixels) for snapping
     * @returns {geotoolkit.util.Point} model link point or <b>null</b> if can not connect
     */
    geotoolkit.flowcharts.shapes.connectors.PolylineVisual.prototype.canConnect = function(component, modelPoint, minDistance){};

/**
 * Class for group operations on shapes.
 * This is virtual group, and used only for logical selection and manipulations
 * over visuals
 * @class geotoolkit.flowcharts.shapes.edit.VirtualGroupVisual
 * @augments geotoolkit.flowcharts.shapes.DiagramVisual
 */
geotoolkit.flowcharts.shapes.edit.VirtualGroupVisual = {};
    /**
     * Sets shapes array to the group
     * @param {Array<geotoolkit.scene.Node>} shapes the shapes to operate
     * @returns {geotoolkit.flowcharts.shapes.edit.VirtualGroupVisual} this
     */
    geotoolkit.flowcharts.shapes.edit.VirtualGroupVisual.prototype.setShapes = function(shapes){};
    /**
     * Tes shapes being operated by the virtual group
     * @returns {Array<geotoolkit.scene.Node>|*}
     */
    geotoolkit.flowcharts.shapes.edit.VirtualGroupVisual.prototype.getShapes = function(){};

/**
 * The class for visual plugins manipulation
 * @class geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter
 * @augments geotoolkit.controls.editing.ShapeAdapter
 */
geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter = {};
    /**
     * Sets shape
     * @param {geotoolkit.scene.Node} shapes current shape
     * @returns {geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter} this
     */
    geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter.prototype.setShape = function(shapes){};
    /**
     * Return shape bounds
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter.prototype.getShapeBounds = function(){};
    /**
     * Active state is changed
     *
     * @param {boolean} active active state or not
     */
    geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter.prototype.onActiveStateChanged = function(active){};
    /**
     * OnInitialize
     *
     * @returns {boolean} success true if initialized successfully
     */
    geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter.prototype.onInitialize = function(){};
    /**
     * OnMove
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter} this
     */
    geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter.prototype.onMove = function(x, y){};
    /**
     * Sets linestyle and fillstyle for the main handle (rectangle) and all the corner handles (squares)
     * @param {object} [json] a JSON object with style
     * @param {object} [json.main] object contains properties for main rectangle
     * @param {object | geotoolkit.attributes.LineStyle} [json.main.linestyle] linestyle
     * @param {object | geotoolkit.attributes.FillStyle} [json.main.fillstyle] fillstyle
     * @param {object} [json.corners] object contains properties for all the corners and sides handles
     * @param {object | geotoolkit.attributes.LineStyle} [json.corners.linestyle] linestyle
     * @param {object | geotoolkit.attributes.FillStyle} [json.corners.fillstyle] fillstyle
     * @returns {geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter} this
     */
    geotoolkit.flowcharts.shapes.edit.VisualPluginAdapter.prototype.setStyle = function(json){};

/**
 * A mechanism providing interactivity between a user and DiagramWidget. Main tool for visuals editing in the Diagram
 * @class geotoolkit.flowcharts.shapes.edit.DiagramTool
 * @param {geotoolkit.scene.Group} model model layer
 * @param {geotoolkit.scene.Group} handlesLayer handles layer
 * @augments geotoolkit.controls.tools.AbstractTool
 */
geotoolkit.flowcharts.shapes.edit.DiagramTool = {};
    /**
     * @inheritdoc
     */
    geotoolkit.flowcharts.shapes.edit.DiagramTool.prototype.attachToPlot = function(){};
    /**
     * Gets an associated shapes adapter registry
     * @returns {geotoolkit.controls.editing.ShapeAdapterRegistry} a shape adapters registry associated with the tool
     */
    geotoolkit.flowcharts.shapes.edit.DiagramTool.prototype.getShapeAdapters = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.flowcharts.shapes.edit.DiagramTool.prototype.dispose = function(){};
    /**
     * Clears current selection
     */
    geotoolkit.flowcharts.shapes.edit.DiagramTool.prototype.clearSelection = function(){};
    /**
     * Starts the adapter, using devicePoint as start point
     * @param {Array<geotoolkit.scene.Node>} nodes nodes collection to operate on
     * @param {geotoolkit.util.Point} devicePoint start point in device coordinates
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs arguements to start
     * @returns {Array<*>} active selection
     */
    geotoolkit.flowcharts.shapes.edit.DiagramTool.prototype.startAdapter = function(nodes, devicePoint, eventArgs){};
    /**
     * Returns currently selected shapes.
     * @returns {Array<geotoolkit.scene.Node>} a collection of shapes
     * that are currently selected with this tool
     */
    geotoolkit.flowcharts.shapes.edit.DiagramTool.prototype.getActiveSelection = function(){};
    /**
     * Show shape adapters for specified shapes
     * @param {Array<geotoolkit.scene.shapes.Shape>} shapes a collection of shapes to select
     * @returns {geotoolkit.flowcharts.shapes.edit.DiagramTool}
     */
    geotoolkit.flowcharts.shapes.edit.DiagramTool.prototype.selectVisuals = function(shapes){};
    /**
     * Returns a flag indicating if the text editor should be enabled or not
     * @returns {boolean} true - if enabled, false - if not
     */
    geotoolkit.flowcharts.shapes.edit.DiagramTool.prototype.getTextEditorEnabled = function(){};
    /**
     * Enables or disables text editor upon double click
     * @param {boolean} value flag indicating if the text editor should be enabled or disabled
     * @returns {geotoolkit.flowcharts.shapes.edit.DiagramTool} this
     */
    geotoolkit.flowcharts.shapes.edit.DiagramTool.prototype.setTextEditorEnabled = function(value){};
    /**
     * Event that raises on selection change
     * @returns {geotoolkit.flowcharts.utils.LiteEvent}
     */
    geotoolkit.flowcharts.shapes.edit.DiagramTool.prototype.getOnSelectionChangeEvent = function(){};

/**
 * Serializer for geotoolkit.flowcharts.shapes.DiagramVisual class
 * @class geotoolkit.flowcharts.persistence.visuals.DiagramVisualSerializer
 * @augments geotoolkit.persistence.ObjectSerializer
 */
geotoolkit.flowcharts.persistence.visuals.DiagramVisualSerializer = {};

/**
 * @class geotoolkit.flowcharts.persistence.visuals.ExportDiagramVisualSerializer
 * @augments geotoolkit.persistence.ObjectSerializer
 */
geotoolkit.flowcharts.persistence.visuals.ExportDiagramVisualSerializer = {};

/**
 * @class geotoolkit.flowcharts.persistence.visuals.LinkVisualSerializer
 * @augments geotoolkit.persistence.ObjectSerializer
 */
geotoolkit.flowcharts.persistence.visuals.LinkVisualSerializer = {};

/**
 * @class geotoolkit.flowcharts.persistence.visuals.PolylineVisualSerializer
 * @augments geotoolkit.persistence.ObjectSerializer
 */
geotoolkit.flowcharts.persistence.visuals.PolylineVisualSerializer = {};

/**
 * Serializer for geotoolkit.flowcharts.shapes.DiagramVisual class
 * @class geotoolkit.flowcharts.persistence.visuals.SvgVisualPluginSerializer
 * @augments geotoolkit.flowcharts.persistence.visuals.DiagramVisualSerializer
 */
geotoolkit.flowcharts.persistence.visuals.SvgVisualPluginSerializer = {};

/**
 * Serializer singleton for the FlowChart persistence
 * @class geotoolkit.flowcharts.persistence.Serializer
 */
geotoolkit.flowcharts.persistence.Serializer = {};
    /**
     * Gets a singleton instance
     * @returns {geotoolkit.flowcharts.persistence.Serializer} serializer
     */
    geotoolkit.flowcharts.persistence.Serializer.getInstance = function(){};
    /**
     * Saves the given value to the source with name
     * @param {string|object} name the name of the object or the object to mementoize
     * @param {object} [value=null] The value to mementoize
     * @param {object} [source=null] the source project to add property
     * @returns {string} serialiation result
     */
    geotoolkit.flowcharts.persistence.Serializer.prototype.serialize = function(name, value, source){};
    /**
     * Deserializes a JSON string to the original object
     * @param {string} str text to be deserialised
     * @returns {geotoolkit.persistence.MementoDeserializationContext}
     */
    geotoolkit.flowcharts.persistence.Serializer.prototype.deserialize = function(str){};
    /**
     * Assignes a new serializer to a class with the given className
     * @param {string} className a name of the class that should get new serizlier
     * @param {*} serializer a serializer that knows how to save/load classes className
     */
    geotoolkit.flowcharts.persistence.Serializer.prototype.setSerializer = function(className, serializer){};
    /**
     * Gets a previously assigned serializer to the className
     * @param {string|object} type serializer for the specified type
     * @returns {Object} a serializer for the given className or null, if not found
     */
    geotoolkit.flowcharts.persistence.Serializer.prototype.getSerializer = function(type){};

/**
 * This class provides a set of default diagram visuals prototypes, such as Link, Rectangle, Text, etc.
 * Method getComponents returns an array of available visual prototypes
 * @class geotoolkit.flowcharts.plugins.library.DefaultComponents
 */
geotoolkit.flowcharts.plugins.library.DefaultComponents = {};
    /**
     * Gets all components stored in the library
     * @returns {Array<geotoolkit.flowcharts.shapes.IComponent>} an array of prototype instances
     */
    geotoolkit.flowcharts.plugins.library.DefaultComponents.getComponents = function(){};
    /**
     * Default components' category name
     * @type {string}
     */
    geotoolkit.flowcharts.plugins.library.DefaultComponents.Category = "";

/**
 * This class provides a set of Flow Chart related diagram visuals prototypes
 * Method getComponents returns an array of available visual prototypes
 * @class geotoolkit.flowcharts.plugins.library.FlowChartComponents
 */
geotoolkit.flowcharts.plugins.library.FlowChartComponents = {};
    /**
     * Gets all components stored in the library
     * @returns {Array<geotoolkit.flowcharts.shapes.IComponent>} an array of prototype instances
     */
    geotoolkit.flowcharts.plugins.library.FlowChartComponents.getComponents = function(){};
    /**
     * Category name
     * @type {string}
     */
    geotoolkit.flowcharts.plugins.library.FlowChartComponents.Category = "";

/**
 * This class provides a set of HR diagram visuals prototypes.
 * Method getComponents returns an array of available visual prototypes
 * @class geotoolkit.flowcharts.plugins.library.HRComponents
 */
geotoolkit.flowcharts.plugins.library.HRComponents = {};
    /**
     * Gets all components stored in the library
     * @returns {Array<geotoolkit.flowcharts.shapes.IComponent>} an array of prototype instances
     */
    geotoolkit.flowcharts.plugins.library.HRComponents.getComponents = function(){};
    /**
     * Category name
     * @type {string}
     */
    geotoolkit.flowcharts.plugins.library.HRComponents.Category = "";

/**
 * This class provides a set of industrial diagram visuals prototypes
 * Method getComponents returns an array of available visual prototypes
 * @class geotoolkit.flowcharts.plugins.library.IndustrialComponents
 */
geotoolkit.flowcharts.plugins.library.IndustrialComponents = {};
    /**
     * Gets all components stored in the library
     * @returns {Array<geotoolkit.flowcharts.shapes.IComponent>} an array of prototype instances
     */
    geotoolkit.flowcharts.plugins.library.IndustrialComponents.getComponents = function(){};
    /**
     * Industrial components' category name
     * @type {string}
     */
    geotoolkit.flowcharts.plugins.library.IndustrialComponents.Category = "";

/**
 * Factory that is used for creating Diagram Visual prototypes.
 * getInstance returns an singletone instance, otherwise, new visual prototypes can be registered with
 * registerPlugin method.
 * @example
 * geotoolkit.flowcharts.plugins.VisualFactory.getInstance().registerPlugin(new DiagramVisual({...}));
 * @class geotoolkit.flowcharts.plugins.VisualFactory
 */
geotoolkit.flowcharts.plugins.VisualFactory = {};
    /**
     * Gets an singletone instance
     * @returns {geotoolkit.flowcharts.plugins.VisualFactory} factory
     */
    geotoolkit.flowcharts.plugins.VisualFactory.getInstance = function(){};
    /**
     * Gets all available plugins
     * @returns {Array<geotoolkit.flowcharts.shapes.IComponent>}
     */
    geotoolkit.flowcharts.plugins.VisualFactory.prototype.getPlugins = function(){};
    /**
     * Gets a default fill style that should be applied to all newly created visuals
     * @returns {geotoolkit.attributes.FillStyle|*} a fill style instance
     */
    geotoolkit.flowcharts.plugins.VisualFactory.prototype.getDefaultFillStyle = function(){};
    /**
     * Sets a default fill style that should be applied to all newly created visuals
     * @param {geotoolkit.attributes.FillStyle|*} value a fill style instance
     * @returns {geotoolkit.flowcharts.plugins.VisualFactory} this
     */
    geotoolkit.flowcharts.plugins.VisualFactory.prototype.setDefaultFillStyle = function(value){};
    /**
     * Gets a default line style that should be applied to all newly created visuals
     * @returns {geotoolkit.attributes.LineStyle|*} a line style instance
     */
    geotoolkit.flowcharts.plugins.VisualFactory.prototype.getDefaultLineStyle = function(){};
    /**
     * Sets a default line style that should be applied to all newly created visuals
     * @param {geotoolkit.attributes.LineStyle|*} value a line style instance
     * @returns {geotoolkit.flowcharts.plugins.VisualFactory} this
     */
    geotoolkit.flowcharts.plugins.VisualFactory.prototype.setDefaultFillStyle = function(value){};
    /**
     * Registers the given component in the factory
     * @param {geotoolkit.flowcharts.shapes.IComponent} component a visual plugin instance
     */
    geotoolkit.flowcharts.plugins.VisualFactory.prototype.registerPlugin = function(component){};
    /**
     * Creates a new visual plugin instance using the given prototypeId name
     * @param {string} prototypeId class name for a component to creaate
     * @param {number} [width = 0] the desired width of the newly created component. If not set, a default
     * value from prototype will be used
     * @param {number} [height = 0] the desired height of the newly created component. If not set, a default
     * value from prototype will be used
     * @returns {geotoolkit.flowcharts.shapes.IComponent | null} a new visual plugin instance or null if an
     * error has occured
     */
    geotoolkit.flowcharts.plugins.VisualFactory.prototype.getVisual = function(prototypeId, width, height){};

/**
 * A basic widget that displays visuals, provides tools for manipulation, and API for persistence, copy/paste, delete, selection and other functions.
 * @class geotoolkit.flowcharts.shapes.DiagramWidget
 * @augments geotoolkit.widgets.BaseWidget
 * @param {object} [options=null] settings for the widget
 */
geotoolkit.flowcharts.shapes.DiagramWidget = {};
    /**
     * Gets annotation at specified location
     * @param {geotoolkit.layout.AnnotationLocation} location Enum of annotation locations used to specify direction to insert
     * @returns {?geotoolkit.scene.Group}
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.getAnnotation = function(location){};
    /**
     * Sets diagram size. It affects both on physical and model size
     * @param {geotoolkit.util.Rect} rect a new model limits
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget}
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.setDiagramLimits = function(rect){};
    /**
     * Toggles the tool
     * @param {geotoolkit.flowcharts.shapes.DiagramTools} toolType a tool type to activate
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.toggleTool = function(toolType){};
    /**
     * Gets a currently active tool
     * @returns {string} the name of currently active tool
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.getActiveTool = function(){};
    /**
     * Gets current widget scale {x: number, y: number}
     * @returns {Object} current scale
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.getScale = function(){};
    /**
     * Sets the specified scale-x and scale-y factors on the model
     * @param {number} sx horizontal scale
     * @param {number} sy vertical scale
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.setScale = function(sx, sy){};
    /**
     * Zoom In
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.zoomIn = function(){};
    /**
     * Zoom Out
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.zoomOut = function(){};
    /**
     * Scales the model for the specified amount for X and Y axis
     * @param {number} scale scale factor that will be applied to vertical and horizontal zoom
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.scaleModel = function(scale){};
    /**
     * Returns the Model that is being used for shapes storage, diagram saving and loading
     * @returns {geotoolkit.scene.Group} a primary model
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.getModel = function(){};
    /**
     * Gets primary model limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.getDiagramLimits = function(){};
    /**
     * Gets active selection
     * @returns {Array<geotoolkit.scene.Node>} an array of selected shapes
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.getSelection = function(){};
    /**
     * Tells the diagram widget that the polygon/polyline edit must be finished
     * @returns {boolean} true - on success, false - if cancelled
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.stopPolylineEdit = function(){};
    /**
     * De-selects currently selected shapes
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.clearSelection = function(){};
    /**
     * select visuals
     * @param {Array<geotoolkit.scene.Node>} shapes an array of shape to select
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.selectVisuals = function(shapes){};
    /**
     * Groups the given visuals into a group.
     * This method cuts off the visuals from primary model, creates a new group and places this group
     * into the model and selects the newly created group
     * @param {Array<geotoolkit.scene.Node>} visuals an array of visuals to group
     * @param {string} [groupName] a name for the new group
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.groupVisuals = function(visuals, groupName){};
    /**
     * Destructs the group causing all enclosed visuals to be placed to the Model. The Local group Transformation
     * will be multiplied with Local visuals Transformations.
     * @param {Array<geotoolkit.scene.Node>} visuals An array of SvgGroup to decompose. Even though the method accepts base Node, everything
     * but SvgGroup (and ancestors) will be ignored.
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.ungroupVisuals = function(visuals){};
    /**
     * Changes z-order for the specified array of visuals, placing them "closer" to an observer.
     * If array consists of more than 1 visual, then visual with 0 index will be placed "under" visual with Nth index.
     * @param {Array<geotoolkit.scene.Node> | geotoolkit.scene.Node} node An array of visuals to bring on top of others
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.bringToFront = function(node){};
    /**
     * Changes z-order for the specified array of visuals, placing them "farther" from an observer.
     * If array consists of more than 1 visual, then visual with Nth index will be placed "under" visual with 0th index.
     * @param {Array<geotoolkit.scene.Node> | geotoolkit.scene.Node} node An array of visuals to bring on top of others
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.sendToBack = function(node){};
    /**
     * Cleans up the diagram and resets it to an original state
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.resetDiagram = function(){};
    /**
     * Serializes the diagram into a JSON string
     * @returns {string} JSON string with serialized data
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.saveDiagram = function(){};
    /**
     * Restores a diagram from the given string, which contains JSON object. This object normally generated by
     * saveDiagram() method
     * @param {string} data well-formed JSON-string
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.loadDiagram = function(data){};
    /**
     * Unfolds an array of visuals and their children into a flat (single-dimension) array of nodes.
     * geotoolkit.scene.Group instances are also added to the collection
     * @param {Array<geotoolkit.scene.Node>} restoredItems all restored nodes as flat array
     * @returns {Array<geotoolkit.scene.Node>} an array of restored nodes
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.flattenVisuals = function(restoredItems){};
    /**
     * Copies Seleciton into JSON object
     * @returns {string} well-formed JSON string
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.copySelection = function(){};
    /**
     * Cuts selection out of scene and returns a copy of it as JSON string
     * @returns {string} well-formed JSON string
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.cutSelection = function(){};
    /**
     * Deletes all selected visuals from the scene
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.deleteSelection = function(){};
    /**
     * Adds the specified visual to the model
     * @param {geotoolkit.scene.Node} visual a shape to add
     * @param {geotoolkit.util.Point} [modelLocation=Point(0,0)] a point where the visual will be added. Default value is (0,0)
     * @param {boolean}[center=true] flag indicating if the visual should have center point at the given location
     * @param {boolean}[startPolylineCreation=false] starts manipulator for polygon/polyline creation
     * @returns {geotoolkit.flowcharts.shapes.IComponent} the newly added visual
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.addVisual = function(visual, modelLocation, center, startPolylineCreation){};
    /**
     * Deletes the specified visual from model, if this shape exists on top
     * @param {geotoolkit.scene.Node} shapeToRemove a shape to remove
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.deleteVisual = function(shapeToRemove){};
    /**
     * Deletes visuals from the scene
     * @param {Array<geotoolkit.scene.Node>} visuals visuals to delete
     * @returns {geotoolkit.flowcharts.shapes.DiagramWidget} this
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.deleteVisuals = function(visuals){};
    /**
     * Serializes the given visuals into a well-formed JSON object
     * @param {Array<geotoolkit.scene.Node>} visuals array of visuals to copy
     * @returns {string} well-formed JSON string
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.copyVisuals = function(visuals){};
    /**
     * Serialized the given visuals into a well-formed JSON objects and cuts the visuals
     * out of scene.
     * @param {Array<geotoolkit.scene.Node>} visuals Array of visuals to delete
     * @returns {string} well-formed JSON string
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.cutVisuals = function(visuals){};
    /**
     * Pastes the previously copied visuals from JSON string
     * @param {string} data well-formed JSON data string, previously obtained with copy/cut/save methods
     * @param {geotoolkit.util.Point} modelOrigin model origin point
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.paste = function(data, modelOrigin){};
    /**
     * Event that raises on selection change
     * @returns {geotoolkit.flowcharts.utils.LiteEvent}
     */
    geotoolkit.flowcharts.shapes.DiagramWidget.prototype.getOnSelectionChangeEvent = function(){};

/**
 * Base interface for commands
 * @interface
 */
geotoolkit.flowcharts.commands.ICommand = {};
    /**
     * Executes the command
     * @function
     * @abstract
     * @returns {boolean} true on success, false if not executed
     */
    geotoolkit.flowcharts.commands.ICommand.prototype.execute = function(){};
    /**
     * Rewinds the command
     * @function
     * @abstract
     * @returns {boolean} true on succss, false if couln't be undone
     */
    geotoolkit.flowcharts.commands.ICommand.prototype.undo = function(){};

/**
 * Adds a new visual to the DiagramWidget.
 * @class geotoolkit.flowcharts.commands.AddVisual
 * @param {*} options command options
 * @param {geotoolkit.flowcharts.shapes.DiagramWidget} [options.widget] a host widget
 * @param {Array<geotoolkit.flowcharts.shapes.IComponent>} [options.visuals] visuals to add
 * @param {boolean} [options.center] flag indicating if the location denotes visual's center
 * @param {geotoolkit.util.Point} [options.location] model location
 */
geotoolkit.flowcharts.commands.AddVisual = {};
    /**
     * Executes the command
     * @returns {boolean} true on success, false if not executed
     */
    geotoolkit.flowcharts.commands.AddVisual.prototype.execute = function(){};
    /**
     * Rewinds the command
     * @returns {boolean} true on succss, false if couln't be undone
     */
    geotoolkit.flowcharts.commands.AddVisual.prototype.undo = function(){};

/**
 * Transforms visuals
 * @class geotoolkit.flowcharts.commands.TransformVisuals
 * @param {*} options command options
 * @param {geotoolkit.flowcharts.shapes.IComponent} [options.visual] a visual to move
 * @param {geotoolkit.util.Transformation} [options.transformation] model location
 */
geotoolkit.flowcharts.commands.TransformVisuals = {};
    /**
     * Executes the command
     * @returns {boolean} true on success, false if not executed
     */
    geotoolkit.flowcharts.commands.TransformVisuals.prototype.execute = function(){};
    /**
     * Rewinds the command
     * @returns {boolean} true on succss, false if couln't be undone
     */
    geotoolkit.flowcharts.commands.TransformVisuals.prototype.undo = function(){};

/**
 * Translates visual using a delta
 * @class geotoolkit.flowcharts.commands.TranslateVisuals
 * @augments geotoolkit.flowcharts.commands.TransformVisuals
 * @param {*} options command options
 * @param {geotoolkit.flowcharts.shapes.IComponent} [options.visual] a visual to move
 * @param {geotoolkit.util.Point} [options.delta] model location
 */
geotoolkit.flowcharts.commands.TranslateVisuals = {};
    /**
     * Executes the command
     * @returns {boolean} true on success, false if not executed
     */
    geotoolkit.flowcharts.commands.TranslateVisuals.prototype.execute = function(){};

/**
 * Extends Transform visuals and performs scaling
 * @class geotoolkit.flowcharts.commands.ScaleVisuals
 * @augments geotoolkit.flowcharts.commands.TransformVisuals
 * @param {*} options command options
 * @param {geotoolkit.flowcharts.shapes.IComponent} [options.visual] a visual to move
 * @param {geotoolkit.util.Transformation} [options.transformation] model location
 */
geotoolkit.flowcharts.commands.ScaleVisuals = {};
    /**
     * Executes the command
     * @returns {boolean} true on success, false if not executed
     */
    geotoolkit.flowcharts.commands.ScaleVisuals.prototype.execute = function(){};

/**
 * Rotates the visual based on the provided rotation anchor type.
 * @class geotoolkit.flowcharts.commands.RotateVisuals
 * @augments geotoolkit.flowcharts.commands.TransformVisuals
 * @param {*} options command options
 * @param {geotoolkit.flowcharts.shapes.IComponent} [options.visual] a visual to rotate
 * @param {geotoolkit.util.AnchorType} [options.anchortype] rotation anchor
 */
geotoolkit.flowcharts.commands.RotateVisuals = {};
    /**
     * Executes the command
     * @returns {boolean} true on success, false if not executed
     */
    geotoolkit.flowcharts.commands.RotateVisuals.prototype.execute = function(){};

