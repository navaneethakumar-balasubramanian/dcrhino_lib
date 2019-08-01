/**
 * API to render svg graphics
 * @namespace */
geotoolkit.svg = {};

/**
 * A class that parses svg documents into carnac shapes
 * @class geotoolkit.svg.SVGParser
 * @param {string} [xmlDocument=null] Input SVG document to parse
 * @param {string} [xmlDocument.xmldocument=null] Input SVG document to parse
 * @param {number} [xmlDocument.dpi=96.0] Screen resolution
 * @param {number} [dpi=96.0] Screen resolution
 */
geotoolkit.svg.SVGParser = {};
    /**
     * Returns pattern scalability flag
     * @returns {boolean}
     */
    geotoolkit.svg.SVGParser.prototype.scalablePatterns = function(){};
    /**
     * Sets pattern scalability flag
     * @param {boolean} scale Pattern scalability flag
     * @returns {geotoolkit.svg.SVGParser}
     */
    geotoolkit.svg.SVGParser.prototype.setScalablePatterns = function(scale){};
    /**
     * Parses the given XML document into given group
     *
     * @param {geotoolkit.scene.Group} shapesGroup A group to fill with parsed elements
     * @param {Document | String} doc The document to parse
     * @returns {?Object} obj
     * @returns {?geotoolkit.util.Rect} obj.bounds Bounding box of the root group containing all the parsed elements
     * @returns {?geotoolkit.util.Rect} obj.viewBox Viewbox of the svg file
     */
    geotoolkit.svg.SVGParser.prototype.parse = function(shapesGroup, doc){};
    /**
     * Returns information stored in svg tag of the document
     * @param {Document | String} [doc] The document to parse
     * @returns {object} obj Object with meta information from the svg tag
     * @returns {string} obj.overflow Overflow property of svg
     * @returns {geotoolkit.util.Rect} obj.viewBox Parsed viewBox property
     * @returns {number} obj.height Numeric height in device
     * @returns {number} obj.width Numeric width in device
     */
    geotoolkit.svg.SVGParser.prototype.getSvgMetaInfo = function(doc){};

/**
 * Default data provider for SVG application. Implements standard XMLHttpRequest to load
 * data from the same server that the page was loaded
 * @class geotoolkit.svg.SvgDataProvider
 */
geotoolkit.svg.SvgDataProvider = {};
    /**
     * Loads the file accessible by the path parameter provided and passes it to callback
     * @param {string} path Path to the file on server, or url
     * @param {Function} cb Callback to call
     */
    geotoolkit.svg.SvgDataProvider.prototype.loadXmlData = function(path, cb){};

/**
 * A group which expands bounds to fits its children. Used to mimic the behavior of SVG Groups and
 * avoid failing checkCollision when the children transform into scene
 * @class geotoolkit.svg.SvgGroup
 * @augments geotoolkit.scene.Group
 * @param {object} [options=null] options
 * @param {boolean} [options.verticalFlip=false] vertical axis goes from bottom to top
 * @param {boolean} [options.horizontalFlip=false] horizontal axis goes from right to left
 * @param {geotoolkit.util.Rect|null} [options.modelLimits=null] define inner model coordinates of the group
 * @param {geotoolkit.util.Rect|null} [options.bounds=null] define position of the group in the parent
 * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node> | geotoolkit.util.Iterator} [options.children=null] the child nodes to be added
 */
geotoolkit.svg.SvgGroup = {};
    /**
     * Adds a child and subscribes to its bounds and transformation changes
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node>} node node or array of nodes to be added
     * @returns {geotoolkit.svg.SvgGroup} this
     */
    geotoolkit.svg.SvgGroup.prototype.addChild = function(node){};
    /**
     * Insert child node at specified index
     *
     * @param {number} index
     * specified index
     * @param {geotoolkit.scene.Node} node
     * a child node to add
     * @returns {geotoolkit.svg.SvgGroup}
     */
    geotoolkit.svg.SvgGroup.prototype.insertChild = function(index, node){};
    /**
     * Removes a child and unsubscribes from bounds and transformation change events
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node>} node node or array of nodes to be removed
     * @returns {geotoolkit.svg.SvgGroup} this
     */
    geotoolkit.svg.SvgGroup.prototype.removeChild = function(node){};
    /**
     * Mark this group to be updated.
     * @param {Array<geotoolkit.util.Rect>} [regions] optional array to return invalid rectangles
     * @param {geotoolkit.scene.Node.StateChanges} [changes] optional parameter to specify a reason of changes
     * @returns {geotoolkit.svg.SvgGroup} this
     */
    geotoolkit.svg.SvgGroup.prototype.updateState = function(regions, changes){};
    /**
     * Remove all child nodes from this composite group
     * @param {boolean} [disposeChildren=falsw] automatically dispose children. If it is
     * true then method dispose is called for each child.
     * @returns {geotoolkit.svg.SvgGroup} this
     */
    geotoolkit.svg.SvgGroup.prototype.clearChildren = function(disposeChildren){};

