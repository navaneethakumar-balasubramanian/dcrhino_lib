/**
 * API to build Geotoolkit reports
 * @namespace */
geotoolkit.report = {};

/**
 * @namespace
 */
geotoolkit.report.parsers = {};

/**
 * @namespace
 */
geotoolkit.report.parsers.widgets = {};

/**
 * @namespace
 */
geotoolkit.report.elements = {};

/**
 * @namespace
 */
geotoolkit.report.elements.widgets = {};

/**
 * @namespace
 */
geotoolkit.report.elements.styles = {};

/**
 * @namespace
 */
geotoolkit.report.view = {};

/**
 * @namespace
 */
geotoolkit.report.widgets = {};

/**
 * @class geotoolkit.report.Parser
 * @param {string|Document} xmlDocument
 * @param {object} [options] addtional options
 * @param {?geotoolkit.report.parsers.Registry} [options.parsers=null] for future use
 */
geotoolkit.report.Parser = {};
    /**
     * Type of parser state changes
     * @enum
     * @readonly
     */
    geotoolkit.report.Parser.Events = {};
        /**
         * New element created
         * @type {string}
         */
        geotoolkit.report.Parser.Events.ElementCreated = "";
    /**
     * Parses the given XML document into given group
     *
     * @param {string|Document} [xml = null] The document to parse
     * @returns {geotoolkit.util.Promise} promise
     */
    geotoolkit.report.Parser.parse = function(xml){};
    /**
     * Parses the given XML document into given group
     *
     * @param {string|Document} [doc = null] The document to parse
     * @returns {geotoolkit.util.Promise} promise
     */
    geotoolkit.report.Parser.prototype.parse = function(doc){};

/**
 * @class geotoolkit.report.ParserContext
 * @param {geotoolkit.report.Parser} parser
 * @param {geotoolkit.report.ParserContext} parent context
 * @param {Node} xml node
 */
geotoolkit.report.ParserContext = {};
    /**
     * Return xml node
     * @returns {Node}
     */
    geotoolkit.report.ParserContext.prototype.getNode = function(){};
    /**
     * Register loadable resource
     * @param {string} resourceName
     * @param {Object} resource
     * @returns {geotoolkit.report.ParserContext} this
     */
    geotoolkit.report.ParserContext.prototype.registerResource = function(resourceName, resource){};
    /**
     * Resolve resource
     * @returns {geotoolkit.report.ParserContext} this
     */
    geotoolkit.report.ParserContext.prototype.resolveResource = function(){};
    /**
     * Return parent context
     * @returns {geotoolkit.report.ParserContext} parent
     */
    geotoolkit.report.ParserContext.prototype.getParent = function(){};
    /**
     * Return geotoolkit node
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.report.ParserContext.prototype.getElement = function(){};
    /**
     * Set geotoolkit node
     * @param {geotoolkit.scene.Node} element
     * @returns {geotoolkit.report.ParserContext}
     */
    geotoolkit.report.ParserContext.prototype.setElement = function(element){};
    /**
     * Set geotoolkit content node
     * @param {geotoolkit.scene.Node} content
     * @returns {geotoolkit.report.ParserContext}
     */
    geotoolkit.report.ParserContext.prototype.setContent = function(content){};
    /**
     * Return geotoolkit content node
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.report.ParserContext.prototype.getContent = function(){};
    /**
     * Return preferred layout
     * @returns {geotoolkit.layout.Layout}
     */
    geotoolkit.report.ParserContext.prototype.getLayout = function(){};
    /**
     * Set preferred layout
     * @param {geotoolkit.layout.Layout} layout
     * @returns {geotoolkit.report.ParserContext}
     */
    geotoolkit.report.ParserContext.prototype.setLayout = function(layout){};
    /**
     * Return preferred layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.report.ParserContext.prototype.getLayoutStyle = function(){};
    /**
     * Set preferred layout style
     * @param {Object|geotoolkit.layout.LayoutStyle} layoutStyle
     * @returns {geotoolkit.report.ParserContext}
     */
    geotoolkit.report.ParserContext.prototype.setLayoutStyle = function(layoutStyle){};
    /**
     * Parse child node
     * @param {Node} childNode
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.report.ParserContext.prototype.parseChild = function(childNode){};

/**
 * Define parsed document
 * @class geotoolkit.report.Document
 * @param {geotoolkit.report.ParserContext} context parser context
 */
geotoolkit.report.Document = {};
    /**
     * Return known property value
     * @param {string} propertyName
     * @returns {Object|string|null} property value
     */
    geotoolkit.report.Document.prototype.getProperty = function(propertyName){};
    /**
     * Returns root element
     * @param {number} width
     * @param {?number} [height]
     * @returns {geotoolkit.scene.Group} root element
     */
    geotoolkit.report.Document.prototype.getRootElement = function(width, height){};

/**
 * @class geotoolkit.report.elements.styles.ElementStyle
 * @param {string} style
 */
geotoolkit.report.elements.styles.ElementStyle = {};
    /**
     * set parent style
     * @param {geotoolkit.report.elements.styles.ElementStyle} parent
     * @returns {geotoolkit.report.elements.styles.ElementStyle}
     */
    geotoolkit.report.elements.styles.ElementStyle.prototype.setParent = function(parent){};
    /**
     * set style
     * @param {string|geotoolkit.report.elements.styles.ElementStyle|object} style
     * @param {string|number|geotoolkit.report.elements.styles.ElementStyle|object|null} [value]
     * @returns {geotoolkit.report.elements.styles.ElementStyle} this
     */
    geotoolkit.report.elements.styles.ElementStyle.prototype.setStyle = function(style, value){};
    /**
     * @protected
     * @param {string} styleName
     * @param {string} styleValue
     * @returns {string|geotoolkit.report.elements.styles.ElementStyle|object}
     */
    geotoolkit.report.elements.styles.ElementStyle.prototype.parseStyle = function(styleName, styleValue){};
    /**
     * @protected
     * @param {string} styleName
     * @param {string} styleValue
     * @returns {string|geotoolkit.report.elements.styles.ElementStyle|object}
     */
    geotoolkit.report.elements.styles.ElementStyle.prototype.createStyle = function(styleName, styleValue){};
    /**
     *
     * @param {string} styleName styleName 'border-left'|'fill-pattern-position'|'float'|.....
     * @returns {string|number|object|geotoolkit.report.elements.styles.ElementStyle} style
     */
    geotoolkit.report.elements.styles.ElementStyle.prototype.getStyle = function(styleName){};

/**
 * for future use only
 * @class geotoolkit.report.elements.styles.Registry
 */
geotoolkit.report.elements.styles.Registry = {};
    /**
     * Check style name
     * @param {string} styleName
     * @returns {boolean}
     */
    geotoolkit.report.elements.styles.Registry.prototype.checkStyle = function(styleName){};
    /**
     * Return style by style name
     * @param {string} styleName
     * @returns {geotoolkit.report.elements.styles.ElementStyle}
     */
    geotoolkit.report.elements.styles.Registry.prototype.createStyle = function(styleName){};

/**
 * Define an object that represents the report element
 * @interface
 */
geotoolkit.report.elements.IElement = {};
    /**
     * Returns element style
     * @function
     * @abstract
     * @returns {geotoolkit.report.elements.styles.ElementStyle} return element style
     */
    geotoolkit.report.elements.IElement.prototype.getElementStyle = function(){};
    /**
     * Set element style
     * @function
     * @abstract
     * @param {geotoolkit.report.elements.styles.ElementStyle|string} elementStyle
     * @param {object} [styleValue]
     * @returns {geotoolkit.report.elements.IElement} this
     */
    geotoolkit.report.elements.IElement.prototype.setElementStyle = function(elementStyle, styleValue){};
    /**
     * Return preferred layout
     * @function
     * @abstract
     * @param {geotoolkit.util.Rect|geotoolkit.util.Dimension|object} [layout]
     * @param {number} [layout.width]
     * @param {number} [layout.height]
     * @returns {Object}
     */
    geotoolkit.report.elements.IElement.prototype.getPreferredLayout = function(layout){};

/**
 * Define an object which can be laid out.
 * @interface
 */
geotoolkit.report.elements.IResource = {};

/**
 * @class geotoolkit.report.parsers.NodeParser
 * @param {string} nodeName
 * @param {number} nodeType
 */
geotoolkit.report.parsers.NodeParser = {};
    /**
     * Return parser name
     * @returns {string}
     */
    geotoolkit.report.parsers.NodeParser.prototype.getName = function(){};
    /**
     * Return node type
     * @returns {Number}
     */
    geotoolkit.report.parsers.NodeParser.prototype.getType = function(){};
    /**
     * Extracts requested attribute from provided node
     * @param {Node} node XML node
     * @param {string} attrName The name of attribute to obtain
     * @param {object} [defaultValue] default value
     * @returns {object|null} Value of the attribute
     */
    geotoolkit.report.parsers.NodeParser.prototype.getAttribute = function(node, attrName, defaultValue){};
    /**
     *
     * @param {Node} node
     * @param {geotoolkit.report.ParserContext} context
     */
    geotoolkit.report.parsers.NodeParser.prototype.parseAttributes = function(node, context){};
    /**
     * Create element associated with node
     * @function
     * @abstract
     * @param {Node} node
     * @param {geotoolkit.report.ParserContext} context The parsing context to be used to parse the node
     * @returns {geotoolkit.report.ParserContext}
     */
    geotoolkit.report.parsers.NodeParser.prototype.createElement = function(node, context){};
    /**
     *
     * @param {Node} node
     * @param {geotoolkit.report.ParserContext} context
     * @returns {geotoolkit.report.ParserContext}
     */
    geotoolkit.report.parsers.NodeParser.prototype.parseElement = function(node, context){};
    /**
     * add child elements
     * @function
     * @abstract
     * @param {Array<geotoolkit.report.ParserContext>} childElements
     * @param {geotoolkit.report.ParserContext} context
     * @returns {geotoolkit.report.ParserContext}
     */
    geotoolkit.report.parsers.NodeParser.prototype.addElements = function(childElements, context){};
    /**
     * Parse string into array of objects, assuming that string value looks like "[value,value,value]"
     * for example "[10,20,30,75.8999,36]" or "[x:10;y:20,x:15;y:45]"
     * <polygon path="x:[1,2,3,4,5];y:[5,4,3,2,1]"/>
     * @param {string} value
     * @returns {Array<object>|null}
     */
    geotoolkit.report.parsers.NodeParser.prototype.tryParseArray = function(value){};
    /**
     * Parse string into array of objects, assuming that string value looks like "[value,value,value]"
     * for example "[10,20,30,75.8999,36]" or "[x:10;y:20,x:15;y:45]"
     * <polygon path="x:[1,2,3,4,5];y:[5,4,3,2,1]"/>
     * @param {string|null} value
     * @returns {Array<object>|null}
     */
    geotoolkit.report.parsers.NodeParser.tryParseArray = function(value){};
    /**
     * Parse string in to JSON object, assuming that string value looks like "name:value;name:value"
     * for example <group bounds="x:10;y:10;width:100;height:200" limits="auto"/>
     * or <group layoutstyle="left:50%;top:50%;right:0;bottom:0" limits="auto"/>
     * @param {string}value
     * @returns {object|null}
     */
    geotoolkit.report.parsers.NodeParser.prototype.tryParseJSON = function(value){};
    /**
     * Parse string in to JSON object, assuming that string value looks like "name:value;name:value"
     * for example <group bounds="x:10;y:10;width:100;height:200" limits="auto"/>
     * or <group layoutstyle="left:50%;top:50%;right:0;bottom:0" limits="auto"/>
     * @param {string|null}value
     * @returns {object|null}
     */
    geotoolkit.report.parsers.NodeParser.tryParseJSON = function(value){};
    /**
     * Try parse value to avoid converting it in our existing code
     * @param {string} value
     * @returns {Number|string|boolean}
     */
    geotoolkit.report.parsers.NodeParser.prototype.tryParseValue = function(value){};
    /**
     * Try parse value to avoid converting it in our existing code
     * @param {string} value
     * @returns {Number|string|boolean}
     */
    geotoolkit.report.parsers.NodeParser.tryParseValue = function(value){};

/**
 * @class geotoolkit.report.parsers.TextNodeParser
 * @augments geotoolkit.report.parsers.NodeParser
 * @param {string} nodeName
 * @param {number} nodeType
 */
geotoolkit.report.parsers.TextNodeParser = {};
    /**
     * create Element
     * @param {Node} node node to parse
     * @param {geotoolkit.report.ParserContext} context parser context
     * @returns {geotoolkit.report.ParserContext}
     */
    geotoolkit.report.parsers.TextNodeParser.prototype.createElement = function(node, context){};
    /**
     *
     * @param {Node} node node to parse
     * @param {geotoolkit.report.ParserContext} context parser context
     * @returns {geotoolkit.report.ParserContext}
     */
    geotoolkit.report.parsers.TextNodeParser.prototype.parseAttributes = function(node, context){};
    /**
     *
     * @param {Node} node node to parse
     * @param {geotoolkit.report.ParserContext} context parser context
     * @returns {geotoolkit.report.ParserContext}
     */
    geotoolkit.report.parsers.TextNodeParser.prototype.parseElement = function(node, context){};

/**
 * Define an abstract parser of element
 * @class geotoolkit.report.parsers.ElementParser
 * @augments geotoolkit.report.parsers.NodeParser
 * @param {string} nodeName
 * @param {number} nodeType
 * @example How to create a custom parser
 * var CrossPlotParser = function () {
 * geotoolkit.report.parsers.ElementParser.call(this);
 * };
 * geotoolkit.inherits(CrossPlotParser, geotoolkit.report.parsers.ElementParser);
 * CrossPlotParser.prototype.createElement = function (node, context) {
 * if (node.nodeType !== node.ELEMENT_NODE) return null;
 * var element = new geotoolkit.widgets.CrossPlot();
 * context.setElement(element);
 * context.notify(geotoolkit.report.Parser.Events.ElementCreated, this, element);
 * return context;
 * };
 * CrossPlotParser.prototype.parseAttributes = function (node, context) {
 * var element = context.getElement();
 * var properties = {};
 * if (node.attributes != null) {
 * var attributes = node.attributes, value, name;
 * for (var i = 0; i < attributes.length; i++) {
 * value = attributes[i].value;
 * name = attributes[i].name;
 * if (value == null || typeof value !== 'string') {
 * properties[name] = value;
 * continue;
 * }
 * properties[name] = geotoolkit.report.parsers.NodeParser.tryParseJSON(value) ||
 * geotoolkit.report.parsers.NodeParser.tryParseValue(value);
 * }
 * }
 * element.setProperties(properties);
 * };
 * CrossPlotParser.prototype.addElements = function (childContexts, context) {
 * };
 * geotoolkit.obfuscate(CrossPlotParser, geotoolkit.report.parsers.ElementParser);
 * var registry = geotoolkit.report.parsers.Registry.getDefaultInstance();
 * registry.register(new CrossPlotParser(), 'crossplot', geotoolkit.window.Node.ELEMENT_NODE);
 */
geotoolkit.report.parsers.ElementParser = {};
    /**
     *
     * @param {Node} node node to parse
     * @param {geotoolkit.report.ParserContext} context parser context
     */
    geotoolkit.report.parsers.ElementParser.prototype.parseAttributes = function(node, context){};

/**
 * @class geotoolkit.report.parsers.widgets.TemplateNodeParser
 * @param {string} nodeName
 * @param {number} nodeType
 * @augments geotoolkit.report.parsers.NodeParser
 */
geotoolkit.report.parsers.widgets.TemplateNodeParser = {};
    /**
     * create Element
     * @param {Node} node element node
     * @param {geotoolkit.report.ParserContext} context parser context
     * @returns {geotoolkit.report.ParserContext} context
     */
    geotoolkit.report.parsers.widgets.TemplateNodeParser.prototype.createElement = function(node, context){};

/**
 * Define a registry of element parsers.
 * @class geotoolkit.report.parsers.Registry
 */
geotoolkit.report.parsers.Registry = {};
    /**
     * Returns default parser to be used if parser is not found for node
     * @returns {geotoolkit.report.parsers.ElementParser} default parser
     */
    geotoolkit.report.parsers.Registry.prototype.getDefaultParser = function(){};
    /**
     * Set default parser to be used if parser is not found for node
     * @param {geotoolkit.report.parsers.ElementParser} parser parser
     * @returns {geotoolkit.report.parsers.Registry}
     */
    geotoolkit.report.parsers.Registry.prototype.setDefaultParser = function(parser){};
    /**
     * Register an instance of a parser
     * @param {geotoolkit.report.parsers.ElementParser} parser parser to register
     * @param {string} [nodeName] node name
     * @param {number} [nodeType] node type
     * @returns {geotoolkit.report.parsers.Registry} this
     */
    geotoolkit.report.parsers.Registry.prototype.register = function(parser, nodeName, nodeType){};
    /**
     * Return parser by tag name
     * @param {string|Node} node node
     * @returns {geotoolkit.report.parsers.ElementParser}
     */
    geotoolkit.report.parsers.Registry.prototype.getParser = function(node){};
    /**
     * Return default instance of the parsers Registry
     *
     * @returns {geotoolkit.report.parsers.Registry}
     */
    geotoolkit.report.parsers.Registry.getDefaultInstance = function(){};

/**
 * DocumentViewWidget is essentially a base widget specialized for display report document.
 * @class geotoolkit.report.widgets.DocumentViewWidget
 * @augments geotoolkit.widgets.BaseWidget
 * @param {object} options
 * @param {geotoolkit.util.Rect} [options.bounds] bounds of the current widget
 */
geotoolkit.report.widgets.DocumentViewWidget = {};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect | object} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.report.widgets.DocumentViewWidget} this
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.setBounds = function(bounds){};
    /**
     * Initialize panning tool
     * @returns {geotoolkit.controls.tools.Panning} panning tool
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.initializePanningTool = function(){};
    /**
     * update Scroll Positions using visible limits and model limits.
     *
     * @param {boolean} [enableAnimation=true] show animation
     * @returns {geotoolkit.report.widgets.DocumentViewWidget} this
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.updateScrollPositions = function(enableAnimation){};
    /**
     * Zoom out
     * @returns {geotoolkit.report.widgets.DocumentViewWidget}
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.zoomIn = function(){};
    /**
     * Zoom in
     * @returns {geotoolkit.report.widgets.DocumentViewWidget}
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.zoomOut = function(){};
    /**
     * scale widget
     * @param {number} factor scale factor
     * @returns {geotoolkit.report.widgets.DocumentViewWidget} this
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.scaleView = function(factor){};
    /**
     * Translate view
     * @param {number} dx offset x
     * @param {number} dy offset y
     * @returns {geotoolkit.report.widgets.DocumentViewWidget} this
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.translateView = function(dx, dy){};
    /**
     * @returns {geotoolkit.report.widgets.DocumentViewWidget} this
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.adjustPages = function(){};
    /**
     * Load document
     * @param {geotoolkit.report.Document} document document to load
     * @returns {geotoolkit.report.widgets.DocumentViewWidget} this
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.loadDocument = function(document){};
    /**
     *
     * @returns {geotoolkit.report.Document} this
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.getDocument = function(){};
    /**
     * Return current paper format
     * @returns {geotoolkit.scene.exports.AbstractPaperFormat}
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.getPaperSize = function(){};
    /**
     *
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.report.widgets.DocumentViewWidget.prototype.getDocumentElement = function(){};

/**
 * Defines html text, that can render fragment of valid html code with tags and attribute. Also this shape supports AnchoredShape behavior,
 * like anchor type and other
 *
 * @class geotoolkit.report.HtmlText
 * @augments geotoolkit.scene.AbstractNode
 * @see {@link geotoolkit.scene.shapes.Text} For arguments descriptions
 */
geotoolkit.report.HtmlText = {};
    /**
     * See {@link geotoolkit.scene.shapes.Text#recalculateLayout} for details
     */
    geotoolkit.report.HtmlText.prototype.recalculateLayout = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#getDisplayableText} for details
     */
    geotoolkit.report.HtmlText.prototype.getDisplayableText = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setShowEllipsis} for details
     */
    geotoolkit.report.HtmlText.prototype.setShowEllipsis = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#getShowEllipsis} for details
     */
    geotoolkit.report.HtmlText.prototype.getShowEllipsis = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setSizeMode} for details
     */
    geotoolkit.report.HtmlText.prototype.setSizeMode = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#getSizeMode} for details
     */
    geotoolkit.report.HtmlText.prototype.getSizeMode = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#getText} for details
     */
    geotoolkit.report.HtmlText.prototype.getText = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#getTextStyle} for details
     */
    geotoolkit.report.HtmlText.prototype.getTextStyle = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setRect} for details
     */
    geotoolkit.report.HtmlText.prototype.setRect = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setSize} for details
     */
    geotoolkit.report.HtmlText.prototype.setSize = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setUserSize} for details
     */
    geotoolkit.report.HtmlText.prototype.setUserSize = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setWidth} for details
     */
    geotoolkit.report.HtmlText.prototype.setWidth = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setHeight} for details
     */
    geotoolkit.report.HtmlText.prototype.setHeight = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setTextStyle} for details
     */
    geotoolkit.report.HtmlText.prototype.setTextStyle = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setCornerRadius} for details
     */
    geotoolkit.report.HtmlText.prototype.setCornerRadius = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#getCornerRadius} for details
     */
    geotoolkit.report.HtmlText.prototype.getCornerRadius = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setPadding} for details
     */
    geotoolkit.report.HtmlText.prototype.setPadding = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#getPadding} for details
     */
    geotoolkit.report.HtmlText.prototype.getPadding = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#render} for details
     */
    geotoolkit.report.HtmlText.prototype.render = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#updateGeometry} for details
     */
    geotoolkit.report.HtmlText.prototype.updateGeometry = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#updateState} for details
     */
    geotoolkit.report.HtmlText.prototype.updateState = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#getProperties} for details
     */
    geotoolkit.report.HtmlText.prototype.getProperties = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#setProperties} for details
     */
    geotoolkit.report.HtmlText.prototype.setProperties = function(){};
    /**
     * See {@link geotoolkit.scene.shapes.Text#dispose} for details
     */
    geotoolkit.report.HtmlText.prototype.dispose = function(){};
    /**
     * Update content with string or html.
     *
     * @param {string} text new text or html
     * @returns {geotoolkit.report.HtmlText} this
     */
    geotoolkit.report.HtmlText.prototype.setText = function(text){};

/**
 * Define html node, use for parsing html string without <document> tag
 * @class geotoolkit.report.HtmlNode
 * @param {geotoolkit.report.ParserContext} context parser context
 */
geotoolkit.report.HtmlNode = {};
    /**
     * Returns root element
     * @param {?number} width width of root element
     * @param {?number} height height of root element
     * @returns {geotoolkit.scene.Group} root element
     */
    geotoolkit.report.HtmlNode.prototype.getRootElement = function(width, height){};

