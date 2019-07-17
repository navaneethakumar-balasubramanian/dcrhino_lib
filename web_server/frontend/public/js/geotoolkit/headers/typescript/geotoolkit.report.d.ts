declare module geotoolkit {
    module report {
        class Parser {
            /**
             * @param xmlDocument  (Required) 
             * @param options  (Optional) addtional options
             * @param options.parsers  (Optional) for future use
             */
            constructor(xmlDocument: string|Document, options?: any | { parsers?: geotoolkit.report.parsers.Registry; } );
            /**
             * Type of parser state changes
             */
            static Events: any;
            /**
             * Parses the given XML document into given group
             * @param xml  (Optional) The document to parse
             */
            static parse(xml?: string|Document): geotoolkit.util.Promise;
            /**
             * Parses the given XML document into given group
             * @param doc  (Optional) The document to parse
             */
            parse(doc?: string|Document): geotoolkit.util.Promise;
        }
        class ParserContext {
            /**
             * @param parser  (Required) 
             * @param parent  (Required) context
             * @param xml  (Required) node
             */
            constructor(parser: geotoolkit.report.Parser, parent: geotoolkit.report.ParserContext, xml: Node);
            /**
             * Return xml node
             */
            getNode(): Node;
            /**
             * Register loadable resource
             * @param resourceName  (Required) 
             * @param resource  (Required) 
             */
            registerResource(resourceName: string, resource: any): this;
            /**
             * Resolve resource
             */
            resolveResource(): this;
            /**
             * Return parent context
             */
            getParent(): geotoolkit.report.ParserContext;
            /**
             * Return geotoolkit node
             */
            getElement(): geotoolkit.scene.Node;
            /**
             * Set geotoolkit node
             * @param element  (Required) 
             */
            setElement(element: geotoolkit.scene.Node): this;
            /**
             * Set geotoolkit content node
             * @param content  (Required) 
             */
            setContent(content: geotoolkit.scene.Node): this;
            /**
             * Return geotoolkit content node
             */
            getContent(): geotoolkit.scene.Node;
            /**
             * Return preferred layout
             */
            getLayout(): geotoolkit.layout.Layout;
            /**
             * Set preferred layout
             * @param layout  (Required) 
             */
            setLayout(layout: geotoolkit.layout.Layout): this;
            /**
             * Return preferred layout style
             */
            getLayoutStyle(): geotoolkit.layout.LayoutStyle;
            /**
             * Set preferred layout style
             * @param layoutStyle  (Required) 
             */
            setLayoutStyle(layoutStyle: any|geotoolkit.layout.LayoutStyle): this;
            /**
             * Parse child node
             * @param childNode  (Required) 
             */
            parseChild(childNode: Node): geotoolkit.scene.Node;
        }
        /**
         * Define parsed document
         */
        class Document {
            /**
             * Define parsed document
             * @param context  (Required) parser context
             */
            constructor(context: geotoolkit.report.ParserContext);
            /**
             * Return known property value
             * @param propertyName  (Required) 
             */
            getProperty(propertyName: string): any|string|any;
            /**
             * Returns root element
             * @param width  (Required) 
             * @param height  (Optional) 
             */
            getRootElement(width: number, height?: number): geotoolkit.scene.Group;
        }
        /**
         * Defines html text, that can render fragment of valid html code with tags and attribute. Also this shape supports AnchoredShape behavior,
         * like anchor type and other
         */
        class HtmlText extends geotoolkit.scene.AbstractNode {
            /**
             * Defines html text, that can render fragment of valid html code with tags and attribute. Also this shape supports AnchoredShape behavior,
             * like anchor type and other
             */
            constructor();
            /**
             * See {@link geotoolkit.scene.shapes.Text#recalculateLayout} for details
             */
            recalculateLayout(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#getDisplayableText} for details
             */
            getDisplayableText(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setShowEllipsis} for details
             */
            setShowEllipsis(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#getShowEllipsis} for details
             */
            getShowEllipsis(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setSizeMode} for details
             */
            setSizeMode(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#getSizeMode} for details
             */
            getSizeMode(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#getText} for details
             */
            getText(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#getTextStyle} for details
             */
            getTextStyle(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setRect} for details
             */
            setRect(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setSize} for details
             */
            setSize(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setUserSize} for details
             */
            setUserSize(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setWidth} for details
             */
            setWidth(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setHeight} for details
             */
            setHeight(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setTextStyle} for details
             */
            setTextStyle(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setCornerRadius} for details
             */
            setCornerRadius(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#getCornerRadius} for details
             */
            getCornerRadius(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setPadding} for details
             */
            setPadding(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#getPadding} for details
             */
            getPadding(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#render} for details
             */
            render(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#updateGeometry} for details
             */
            updateGeometry(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#updateState} for details
             */
            updateState(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#getProperties} for details
             */
            getProperties(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#setProperties} for details
             */
            setProperties(): any;
            /**
             * See {@link geotoolkit.scene.shapes.Text#dispose} for details
             */
            dispose(): any;
            /**
             * Update content with string or html.
             * @param text  (Required) new text or html
             */
            setText(text: string): this;
        }
        /**
         * Define html node, use for parsing html string without <document> tag
         */
        class HtmlNode {
            /**
             * Define html node, use for parsing html string without <document> tag
             * @param context  (Required) parser context
             */
            constructor(context: geotoolkit.report.ParserContext);
            /**
             * Returns root element
             * @param width  (Optional) width of root element
             * @param height  (Optional) height of root element
             */
            getRootElement(width?: number, height?: number): geotoolkit.scene.Group;
        }
        module elements {
            /**
             * Report Events enumerator
             */
            var Events: any;
            /**
             * Define an object that represents the report element
             */
            interface IElement {
                /**
                 * Returns element style
                 */
                getElementStyle(): geotoolkit.report.elements.styles.ElementStyle;
                /**
                 * Set element style
                 * @param elementStyle  (Required) 
                 * @param styleValue  (Optional) 
                 */
                setElementStyle(elementStyle: geotoolkit.report.elements.styles.ElementStyle|string, styleValue?: any): this;
                /**
                 * Return preferred layout
                 * @param layout  (Optional) 
                 * @param layout.width  (Optional) 
                 * @param layout.height  (Optional) 
                 */
                getPreferredLayout(layout?: geotoolkit.util.Rect|geotoolkit.util.Dimension|any | { width?: number; height?: number; } ): any;
            }
            /**
             * Define an object which can be laid out.
             */
            type IResource = any; //TODO: Could not determine underlying type for this typedef. Falling back to 'any'

            /**
             * Report Events enumerator
             */
            interface Events {
                /**
                 * Event type fired when resource is loaded
                 */
                ResourceLoaded: string;
            }
            module ElementContent {
                module Orientation {
                    /**
                     * Vertical: default orientation
                     */
                    var Vertical: string;
                    /**
                     * Horizontal: horizontal orientation, all content is rotated -90° degree
                     */
                    var Horizontal: string;
                }
            }
            module styles {
                class ElementStyle {
                    /**
                     * @param style  (Required) 
                     */
                    constructor(style: string);
                    /**
                     * set parent style
                     * @param parent  (Required) 
                     */
                    setParent(parent: geotoolkit.report.elements.styles.ElementStyle): this;
                    /**
                     * set style
                     * @param style  (Required) 
                     * @param value  (Optional) 
                     */
                    setStyle(style: string|geotoolkit.report.elements.styles.ElementStyle|any, value?: string|number|geotoolkit.report.elements.styles.ElementStyle|any|any): this;
                    /**
                     * @param styleName  (Required) 
                     * @param styleValue  (Required) 
                     */
                    protected parseStyle(styleName: string, styleValue: string): string|this|any;
                    /**
                     * @param styleName  (Required) 
                     * @param styleValue  (Required) 
                     */
                    protected createStyle(styleName: string, styleValue: string): string|this|any;
                    /**
                     * @param styleName  (Required) styleName 'border-left'|'fill-pattern-position'|'float'|.....
                     */
                    getStyle(styleName: string): string|number|any|geotoolkit.report.elements.styles.ElementStyle;
                }
                /**
                 * for future use only
                 */
                class Registry {
                    /**
                     * for future use only
                     */
                    constructor();
                    /**
                     * Check style name
                     * @param styleName  (Required) 
                     */
                    checkStyle(styleName: string): boolean;
                    /**
                     * Return style by style name
                     * @param styleName  (Required) 
                     */
                    createStyle(styleName: string): geotoolkit.report.elements.styles.ElementStyle;
                }
                module BorderLineStyle {
                    module Style {
                        /**
                         * None
                         */
                        var None: string;
                        /**
                         * None
                         */
                        var Hidden: string;
                        /**
                         * None
                         */
                        var Dotted: string;
                        /**
                         * None
                         */
                        var Dashed: string;
                        /**
                         * None
                         */
                        var Solid: string;
                        /**
                         * None
                         */
                        var Double: string;
                        /**
                         * None
                         */
                        var Groove: string;
                        /**
                         * None
                         */
                        var Ridge: string;
                        /**
                         * None
                         */
                        var Inset: string;
                        /**
                         * None
                         */
                        var Outset: string;
                        /**
                         * None
                         */
                        var Initial: string;
                        /**
                         * None
                         */
                        var Inherit: string;
                    }
                }
            }
        }
        module parsers {
            class NodeParser {
                /**
                 * @param nodeName  (Required) 
                 * @param nodeType  (Required) 
                 */
                constructor(nodeName: string, nodeType: number);
                /**
                 * Return parser name
                 */
                getName(): string;
                /**
                 * Return node type
                 */
                getType(): number;
                /**
                 * Extracts requested attribute from provided node
                 * @param node  (Required) XML node
                 * @param attrName  (Required) The name of attribute to obtain
                 * @param defaultValue  (Optional) default value
                 */
                getAttribute(node: Node, attrName: string, defaultValue?: any): any|any;
                /**
                 * @param node  (Required) 
                 * @param context  (Required) 
                 */
                parseAttributes(node: Node, context: geotoolkit.report.ParserContext): any;
                /**
                 * Create element associated with node
                 * @param node  (Required) 
                 * @param context  (Required) The parsing context to be used to parse the node
                 */
                createElement(node: Node, context: geotoolkit.report.ParserContext): geotoolkit.report.ParserContext;
                /**
                 * @param node  (Required) 
                 * @param context  (Required) 
                 */
                parseElement(node: Node, context: geotoolkit.report.ParserContext): geotoolkit.report.ParserContext;
                /**
                 * add child elements
                 * @param childElements  (Required) 
                 * @param context  (Required) 
                 */
                addElements(childElements: geotoolkit.report.ParserContext[], context: geotoolkit.report.ParserContext): geotoolkit.report.ParserContext;
                /**
                 * Parse string into array of objects, assuming that string value looks like "[value,value,value]"
                 * for example "[10,20,30,75.8999,36]" or "[x:10;y:20,x:15;y:45]"
                 * <polygon path="x:[1,2,3,4,5];y:[5,4,3,2,1]"/>
                 * @param value  (Required) 
                 */
                tryParseArray(value: string): any[]|any;
                /**
                 * Parse string into array of objects, assuming that string value looks like "[value,value,value]"
                 * for example "[10,20,30,75.8999,36]" or "[x:10;y:20,x:15;y:45]"
                 * <polygon path="x:[1,2,3,4,5];y:[5,4,3,2,1]"/>
                 * @param value  (Required) 
                 */
                static tryParseArray(value: string|any): any[]|any;
                /**
                 * Parse string in to JSON object, assuming that string value looks like "name:value;name:value"
                 * for example <group bounds="x:10;y:10;width:100;height:200" limits="auto"/>
                 * or <group layoutstyle="left:50%;top:50%;right:0;bottom:0" limits="auto"/>
                 * @param value  (Required) 
                 */
                tryParseJSON(value: string): any|any;
                /**
                 * Parse string in to JSON object, assuming that string value looks like "name:value;name:value"
                 * for example <group bounds="x:10;y:10;width:100;height:200" limits="auto"/>
                 * or <group layoutstyle="left:50%;top:50%;right:0;bottom:0" limits="auto"/>
                 * @param value  (Required) 
                 */
                static tryParseJSON(value: string|any): any|any;
                /**
                 * Try parse value to avoid converting it in our existing code
                 * @param value  (Required) 
                 */
                tryParseValue(value: string): number|string|boolean;
                /**
                 * Try parse value to avoid converting it in our existing code
                 * @param value  (Required) 
                 */
                static tryParseValue(value: string): number|string|boolean;
            }
            class TextNodeParser extends geotoolkit.report.parsers.NodeParser {
                /**
                 * @param nodeName  (Required) 
                 * @param nodeType  (Required) 
                 */
                constructor(nodeName: string, nodeType: number);
                /**
                 * create Element
                 * @param node  (Required) node to parse
                 * @param context  (Required) parser context
                 */
                createElement(node: Node, context: geotoolkit.report.ParserContext): geotoolkit.report.ParserContext;
                /**
                 * @param node  (Required) node to parse
                 * @param context  (Required) parser context
                 */
                parseAttributes(node: Node, context: geotoolkit.report.ParserContext): geotoolkit.report.ParserContext;
                /**
                 * @param node  (Required) node to parse
                 * @param context  (Required) parser context
                 */
                parseElement(node: Node, context: geotoolkit.report.ParserContext): geotoolkit.report.ParserContext;
            }
            /**
             * Define an abstract parser of element
             */
            class ElementParser extends geotoolkit.report.parsers.NodeParser {
                /**
                 * Define an abstract parser of element
                 * @param nodeName  (Required) 
                 * @param nodeType  (Required) 
                 */
                constructor(nodeName: string, nodeType: number);
                /**
                 * @param node  (Required) node to parse
                 * @param context  (Required) parser context
                 */
                parseAttributes(node: Node, context: geotoolkit.report.ParserContext): any;
            }
            /**
             * Define a registry of element parsers.
             */
            class Registry {
                /**
                 * Define a registry of element parsers.
                 */
                constructor();
                /**
                 * Returns default parser to be used if parser is not found for node
                 */
                getDefaultParser(): geotoolkit.report.parsers.ElementParser;
                /**
                 * Set default parser to be used if parser is not found for node
                 * @param parser  (Required) parser
                 */
                setDefaultParser(parser: geotoolkit.report.parsers.ElementParser): this;
                /**
                 * Register an instance of a parser
                 * @param parser  (Required) parser to register
                 * @param nodeName  (Optional) node name
                 * @param nodeType  (Optional) node type
                 */
                register(parser: geotoolkit.report.parsers.ElementParser, nodeName?: string, nodeType?: number): this;
                /**
                 * Return parser by tag name
                 * @param node  (Required) node
                 */
                getParser(node: string|Node): geotoolkit.report.parsers.ElementParser;
                /**
                 * Return default instance of the parsers Registry
                 */
                static getDefaultInstance(): geotoolkit.report.parsers.Registry;
            }
            module widgets {
                class TemplateNodeParser extends geotoolkit.report.parsers.NodeParser {
                    /**
                     * @param nodeName  (Required) 
                     * @param nodeType  (Required) 
                     */
                    constructor(nodeName: string, nodeType: number);
                    /**
                     * create Element
                     * @param node  (Required) element node
                     * @param context  (Required) parser context
                     */
                    createElement(node: Node, context: geotoolkit.report.ParserContext): geotoolkit.report.ParserContext;
                }
            }
        }
        module widgets {
            /**
             * DocumentViewWidget is essentially a base widget specialized for display report document.
             */
            class DocumentViewWidget extends geotoolkit.widgets.BaseWidget {
                /**
                 * DocumentViewWidget is essentially a base widget specialized for display report document.
                 * @param options  (Required) 
                 * @param options.bounds  (Optional) bounds of the current widget
                 */
                constructor(options: any | { bounds?: geotoolkit.util.Rect; } );
                /**
                 * Sets bounds of the node in the parent coordinates
                 * @param bounds  (Required) bound of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect|any): this;
                /**
                 * Initialize panning tool
                 */
                initializePanningTool(): geotoolkit.controls.tools.Panning;
                /**
                 * update Scroll Positions using visible limits and model limits.
                 * @param enableAnimation  (Optional) show animation
                 */
                updateScrollPositions(enableAnimation?: boolean): this;
                /**
                 * Zoom out
                 */
                zoomIn(): this;
                /**
                 * Zoom in
                 */
                zoomOut(): this;
                /**
                 * scale widget
                 * @param factor  (Required) scale factor
                 */
                scaleView(factor: number): this;
                /**
                 * Translate view
                 * @param dx  (Required) offset x
                 * @param dy  (Required) offset y
                 */
                translateView(dx: number, dy: number): this;
                /**
                 */
                adjustPages(): this;
                /**
                 * Load document
                 * @param document  (Required) document to load
                 */
                loadDocument(document: geotoolkit.report.Document): this;
                /**
                 */
                getDocument(): geotoolkit.report.Document;
                /**
                 * Return current paper format
                 */
                getPaperSize(): geotoolkit.scene.exports.AbstractPaperFormat;
                /**
                 */
                getDocumentElement(): geotoolkit.scene.Group;
            }
        }
        module Parser {
            /**
             * Type of parser state changes
             */
            interface Events {
                /**
                 * New element created
                 */
                ElementCreated: string;
            }
        }
    }
}
