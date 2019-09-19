declare module geotoolkit {
    module svg {
        /**
         * A class that parses svg documents into carnac shapes
         */
        class SVGParser {
            /**
             * A class that parses svg documents into carnac shapes
             * @param xmlDocument  (Optional) Input SVG document to parse
             * @param xmlDocument.xmldocument  (Optional) Input SVG document to parse
             * @param xmlDocument.dpi  (Optional) Screen resolution
             * @param dpi  (Optional) Screen resolution
             */
            constructor(xmlDocument?: string|any | { xmldocument?: string; dpi?: number; } , dpi?: number);
            /**
             * Returns pattern scalability flag
             */
            scalablePatterns(): boolean;
            /**
             * Sets pattern scalability flag
             * @param scale  (Required) Pattern scalability flag
             */
            setScalablePatterns(scale: boolean): this;
            /**
             * Parses the given XML document into given group
             * @param shapesGroup  (Required) A group to fill with parsed elements
             * @param doc  (Required) The document to parse
             */
            parse(shapesGroup: geotoolkit.scene.Group, doc: Document|string): {obj:{bounds:geotoolkit.util.Rect;viewBox:geotoolkit.util.Rect}}|any;
            /**
             * Returns information stored in svg tag of the document
             * @param doc  (Optional) The document to parse
             */
            getSvgMetaInfo(doc?: Document|string): {obj:{overflow:string;viewBox:geotoolkit.util.Rect;height:number;width:number}}|any;
        }
        /**
         * Default data provider for SVG application. Implements standard XMLHttpRequest to load
         * data from the same server that the page was loaded
         */
        class SvgDataProvider {
            /**
             * Default data provider for SVG application. Implements standard XMLHttpRequest to load
             * data from the same server that the page was loaded
             */
            constructor();
            /**
             * Loads the file accessible by the path parameter provided and passes it to callback
             * @param path  (Required) Path to the file on server, or url
             * @param cb  (Required) Callback to call
             */
            loadXmlData(path: string, cb: Function): any;
        }
        /**
         * A group which expands bounds to fits its children. Used to mimic the behavior of SVG Groups and
         * avoid failing checkCollision when the children transform into scene
         */
        class SvgGroup extends geotoolkit.scene.Group {
            /**
             * A group which expands bounds to fits its children. Used to mimic the behavior of SVG Groups and
             * avoid failing checkCollision when the children transform into scene
             * @param options  (Optional) options
             * @param options.verticalFlip  (Optional) vertical axis goes from bottom to top
             * @param options.horizontalFlip  (Optional) horizontal axis goes from right to left
             * @param options.modelLimits  (Optional) define inner model coordinates of the group
             * @param options.bounds  (Optional) define position of the group in the parent
             * @param options.children  (Optional) the child nodes to be added
             */
            constructor(options?: any | { verticalFlip?: boolean; horizontalFlip?: boolean; modelLimits?: geotoolkit.util.Rect|any; bounds?: geotoolkit.util.Rect|any; children?: geotoolkit.scene.Node|geotoolkit.scene.Node[]|geotoolkit.util.Iterator; } );
            /**
             * Adds a child and subscribes to its bounds and transformation changes
             * @param node  (Required) node or array of nodes to be added
             */
            addChild(node: geotoolkit.scene.Node|geotoolkit.scene.Node[]): this;
            /**
             * Insert child node at specified index
             * @param index  (Required) specified index
             * @param node  (Required) a child node to add
             */
            insertChild(index: number, node: geotoolkit.scene.Node): this;
            /**
             * Removes a child and unsubscribes from bounds and transformation change events
             * @param node  (Required) node or array of nodes to be removed
             */
            removeChild(node: geotoolkit.scene.Node|geotoolkit.scene.Node[]): this;
            /**
             * Mark this group to be updated.
             * @param regions  (Optional) optional array to return invalid rectangles
             * @param changes  (Optional) optional parameter to specify a reason of changes
             */
            updateState(regions?: geotoolkit.util.Rect[], changes?: geotoolkit.scene.Node.StateChanges): this;
            /**
             * Remove all child nodes from this composite group
             * @param disposeChildren  (Optional) automatically dispose children. If it is
true then method dispose is called for each child.
             */
            clearChildren(disposeChildren?: boolean): this;
        }
    }
}
