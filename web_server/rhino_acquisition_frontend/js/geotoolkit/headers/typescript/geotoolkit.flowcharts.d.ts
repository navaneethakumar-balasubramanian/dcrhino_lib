declare module geotoolkit {
    module flowcharts {
        module shapes {
            /**
             * String constants for all possible diagram widget tools
             */
            var DiagramTools: any;
            /**
             * Loads a resource from disk and stores it into a cache
             */
            class ResourceLoader {
                /**
                 * Loads a resource from disk and stores it into a cache
                 */
                constructor();
                /**
                 * Loads a text from the specified url and caches it. If was previously loaded then cache will be used instead
                 * @param url  (Required) resource url
                 */
                static loadText(url: string): geotoolkit.util.Promise;
            }
            /**
             * A visual that can be inserted into the DiagramWidget. Base class for holding visuals used in the Diagram
             */
            class DiagramVisual extends geotoolkit.scene.Group implements geotoolkit.flowcharts.shapes.IComponent {
                /**
                 * A visual that can be inserted into the DiagramWidget. Base class for holding visuals used in the Diagram
                 * @param options  (Optional) visual options
                 */
                constructor(options?: any);
                /**
                 * Creates a copy from the given source
                 * @param src  (Required) source object to copy from
                 */
                copyConstructor(src: any|geotoolkit.flowcharts.shapes.DiagramVisual): this;
                /**
                 * Mark this instance to be updated.
                 * @param regions  (Optional) optional array to return invalid rectangles
                 * @param changes  (Optional) optional parameter to specify a reason of changes
                 */
                updateState(regions?: geotoolkit.util.Rect[], changes?: geotoolkit.scene.Node.StateChanges): this;
                /**
                 * Renders the diagram visual
                 * @param context  (Required) context to render self
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Returns component class, string value
                 */
                getPrototypeId(): string;
                /**
                 * Gets component name
                 */
                getPrototypeName(): string;
                /**
                 * Gets component category
                 */
                getCategory(): string;
                /**
                 * Gets an array of keywords for better search
                 */
                getSearchKeywords(): string[];
                /**
                 * Sets default size of the visual
                 * @param dimension  (Required) new default dimension
                 */
                setDefaultSize(dimension: geotoolkit.util.Dimension): {this:geotoolkit.flowcharts.shapes.DiagramVisual}|any;
                /**
                 * Gets default size of the visual
                 */
                getDefaultSize(): geotoolkit.util.Dimension;
                /**
                 * Gets geometry for the current link visual
                 */
                getGeometry(): geotoolkit.scene.Node;
                /**
                 * Sets link points. Link points must be defined in the shapes's model
                 * space
                 * @param points  (Required) an array of model-space points
that represent possible connections
                 */
                setLinkPoints(points: geotoolkit.util.Point[]): this;
                /**
                 * Returns an array of link points: begin and end
                 */
                getLinkPoints(): geotoolkit.util.Point[];
                /**
                 * Gets outline (path) for the Visual
                 */
                getOutline(): geotoolkit.renderer.GraphicsPath;
                /**
                 * Gets the default icon size for UI representation
                 */
                getDefaultIconSize(): geotoolkit.util.Dimension;
                /**
                 * Sets url for icon
                 * @param value  (Required) url to an icon
                 */
                setUrl(value: string): this;
                /**
                 * Gets url for icon
                 */
                getUrl(): string;
                /**
                 * Sets text and its options
                 * @param textOptions  (Required) text and/or its options
                 * @param textOptions.text  (Optional) text content
                 * @param textOptions.style  (Optional) text style
                 */
                setText(textOptions: any | { text?: string; style?: geotoolkit.attributes.TextStyle; } |string): this;
                /**
                 * Gets previously set text to the visual
                 */
                getText(): any;
                /**
                 * Sets properties
                 * @param properties  (Required) visual properties
                 */
                setProperties(properties: any): this;
                /**
                 * Gets properties
                 */
                getProperties(): any;
            }
            /**
             * A visual used for SVG graphics rendering. SVG may load slowly or not load at all, this visual loads contents asynchronously and renders it once it’s done.
             */
            class SvgDiagramVisual extends geotoolkit.flowcharts.shapes.DiagramVisual {
                /**
                 * A visual used for SVG graphics rendering. SVG may load slowly or not load at all, this visual loads contents asynchronously and renders it once it’s done.
                 * @param options  (Optional) visual options
                 */
                constructor(options?: any);
                /**
                 * Sets a new SVG data
                 * @param svgData  (Required) a well-formed SVG document to set
                 */
                setData(svgData: string): any;
                /**
                 * Creates a copy from the given source
                 * @param src  (Required) source object to copy from
                 */
                copyConstructor(src: any|geotoolkit.flowcharts.shapes.SvgDiagramVisual): this;
                /**
                 * Renders the SvgDiagram visual
                 * @param context  (Required) context to render self
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets a flag indicating if the link points are defined in
                 * relative (proportional) values
                 */
                getIsLinkPointsRelative(): boolean|any;
                /**
                 * Get a collection of relative points, if defined.
                 * Values assumed as percentages: 0 - 0%, 1 - 100%
                 */
                getRelativeLinkPoints(): geotoolkit.util.Point[];
                /**
                 * Returns an array of link points. This array may be calculated
                 * dynamically if points are defined in relative mode
                 */
                getLinkPoints(): geotoolkit.util.Point[];
                /**
                 * Has no effect, assuming SVG image should remain unchanged
                 * @param properties  (Required) ignored
                 */
                setProperties(properties: any): this;
                /**
                 * Gets properties
                 */
                getProperties(): any;
            }
            /**
             * A basic widget that displays visuals, provides tools for manipulation, and API for persistence, copy/paste, delete, selection and other functions.
             */
            class DiagramWidget extends geotoolkit.widgets.BaseWidget {
                /**
                 * A basic widget that displays visuals, provides tools for manipulation, and API for persistence, copy/paste, delete, selection and other functions.
                 * @param options  (Optional) settings for the widget
                 */
                constructor(options?: any);
                /**
                 * Gets annotation at specified location
                 * @param location  (Required) Enum of annotation locations used to specify direction to insert
                 */
                getAnnotation(location: geotoolkit.layout.AnnotationLocation): geotoolkit.scene.Group;
                /**
                 * Sets diagram size. It affects both on physical and model size
                 * @param rect  (Required) a new model limits
                 */
                setDiagramLimits(rect: geotoolkit.util.Rect): this;
                /**
                 * Toggles the tool
                 * @param toolType  (Required) a tool type to activate
                 */
                toggleTool(toolType: geotoolkit.flowcharts.shapes.DiagramTools): this;
                /**
                 * Gets a currently active tool
                 */
                getActiveTool(): string;
                /**
                 * Gets current widget scale {x: number, y: number}
                 */
                getScale(): any;
                /**
                 * Sets the specified scale-x and scale-y factors on the model
                 * @param sx  (Required) horizontal scale
                 * @param sy  (Required) vertical scale
                 */
                setScale(sx: number, sy: number): this;
                /**
                 * Zoom In
                 */
                zoomIn(): any;
                /**
                 * Zoom Out
                 */
                zoomOut(): any;
                /**
                 * Scales the model for the specified amount for X and Y axis
                 * @param scale  (Required) scale factor that will be applied to vertical and horizontal zoom
                 */
                scaleModel(scale: number): any;
                /**
                 * Returns the Model that is being used for shapes storage, diagram saving and loading
                 */
                getModel(): geotoolkit.scene.Group;
                /**
                 * Gets primary model limits
                 */
                getDiagramLimits(): geotoolkit.util.Rect;
                /**
                 * Gets active selection
                 */
                getSelection(): geotoolkit.scene.Node[];
                /**
                 * Tells the diagram widget that the polygon/polyline edit must be finished
                 */
                stopPolylineEdit(): boolean;
                /**
                 * De-selects currently selected shapes
                 */
                clearSelection(): this;
                /**
                 * select visuals
                 * @param shapes  (Required) an array of shape to select
                 */
                selectVisuals(shapes: geotoolkit.scene.Node[]): this;
                /**
                 * Groups the given visuals into a group.
                 * This method cuts off the visuals from primary model, creates a new group and places this group
                 * into the model and selects the newly created group
                 * @param visuals  (Required) an array of visuals to group
                 * @param groupName  (Optional) a name for the new group
                 */
                groupVisuals(visuals: geotoolkit.scene.Node[], groupName?: string): this;
                /**
                 * Destructs the group causing all enclosed visuals to be placed to the Model. The Local group Transformation
                 * will be multiplied with Local visuals Transformations.
                 * @param visuals  (Required) An array of SvgGroup to decompose. Even though the method accepts base Node, everything
but SvgGroup (and ancestors) will be ignored.
                 */
                ungroupVisuals(visuals: geotoolkit.scene.Node[]): this;
                /**
                 * Changes z-order for the specified array of visuals, placing them "closer" to an observer.
                 * If array consists of more than 1 visual, then visual with 0 index will be placed "under" visual with Nth index.
                 * @param node  (Required) An array of visuals to bring on top of others
                 */
                bringToFront(node: geotoolkit.scene.Node[]|geotoolkit.scene.Node): this;
                /**
                 * Changes z-order for the specified array of visuals, placing them "farther" from an observer.
                 * If array consists of more than 1 visual, then visual with Nth index will be placed "under" visual with 0th index.
                 * @param node  (Required) An array of visuals to bring on top of others
                 */
                sendToBack(node: geotoolkit.scene.Node[]|geotoolkit.scene.Node): this;
                /**
                 * Cleans up the diagram and resets it to an original state
                 */
                resetDiagram(): this;
                /**
                 * Serializes the diagram into a JSON string
                 */
                saveDiagram(): string;
                /**
                 * Restores a diagram from the given string, which contains JSON object. This object normally generated by
                 * saveDiagram() method
                 * @param data  (Required) well-formed JSON-string
                 */
                loadDiagram(data: string): any;
                /**
                 * Unfolds an array of visuals and their children into a flat (single-dimension) array of nodes.
                 * geotoolkit.scene.Group instances are also added to the collection
                 * @param restoredItems  (Required) all restored nodes as flat array
                 */
                flattenVisuals(restoredItems: geotoolkit.scene.Node[]): geotoolkit.scene.Node[];
                /**
                 * Copies Seleciton into JSON object
                 */
                copySelection(): string;
                /**
                 * Cuts selection out of scene and returns a copy of it as JSON string
                 */
                cutSelection(): string;
                /**
                 * Deletes all selected visuals from the scene
                 */
                deleteSelection(): this;
                /**
                 * Adds the specified visual to the model
                 * @param visual  (Required) a shape to add
                 * @param modelLocation  (Optional) a point where the visual will be added. Default value is (0,0)
                 * @param center  (Optional) flag indicating if the visual should have center point at the given location
                 * @param startPolylineCreation  (Optional) starts manipulator for polygon/polyline creation
                 */
                addVisual(visual: geotoolkit.scene.Node, modelLocation?: geotoolkit.util.Point, center?: boolean, startPolylineCreation?: boolean): geotoolkit.flowcharts.shapes.IComponent;
                /**
                 * Deletes the specified visual from model, if this shape exists on top
                 * @param shapeToRemove  (Required) a shape to remove
                 */
                deleteVisual(shapeToRemove: geotoolkit.scene.Node): this;
                /**
                 * Deletes visuals from the scene
                 * @param visuals  (Required) visuals to delete
                 */
                deleteVisuals(visuals: geotoolkit.scene.Node[]): this;
                /**
                 * Serializes the given visuals into a well-formed JSON object
                 * @param visuals  (Required) array of visuals to copy
                 */
                copyVisuals(visuals: geotoolkit.scene.Node[]): string;
                /**
                 * Serialized the given visuals into a well-formed JSON objects and cuts the visuals
                 * out of scene.
                 * @param visuals  (Required) Array of visuals to delete
                 */
                cutVisuals(visuals: geotoolkit.scene.Node[]): string;
                /**
                 * Pastes the previously copied visuals from JSON string
                 * @param data  (Required) well-formed JSON data string, previously obtained with copy/cut/save methods
                 * @param modelOrigin  (Required) model origin point
                 */
                paste(data: string, modelOrigin: geotoolkit.util.Point): any;
                /**
                 * Event that raises on selection change
                 */
                getOnSelectionChangeEvent(): geotoolkit.flowcharts.utils.LiteEvent;
            }
            /**
             * Base interface for all visuals that can be placed into Diagram
             */
            interface IComponent {
                /**
                 * Returns component class, string value
                 */
                getPrototypeId(): string;
                /**
                 * The name of the component
                 */
                getPrototypeName(): string;
                /**
                 * Drawing category. The default value is 'default'
                 */
                getCategory(): string;
                /**
                 * Cue words for the component search. By default, the shape will not be searched
                 */
                getSearchKeywords(): string[];
                /**
                 * Defines default visual size in UI units (pixels by default). Default value is (50, 50)
                 */
                getDefaultSize(): geotoolkit.util.Dimension;
                /**
                 * Defines default visual size in UI units (pixels by default). Default value is (50, 50)
                 * @param dimension  (Required) new default dimension
                 */
                setDefaultSize(dimension: geotoolkit.util.Dimension): any|this;
                /**
                 * gets geometry for the drawing
                 */
                getGeometry(): geotoolkit.scene.Node;
                /**
                 * Gets default link points in model space. If not specified, the 'outline' property will be used.
                 * If 'ouline' is not set, then the shape becomes 'unconnectable'
                 */
                getLinkPoints(): geotoolkit.util.Point[];
                /**
                 * Sets link points. Link points must be defined in the shapes's model
                 * space
                 * @param points  (Required) an array of model-space points
that represent possible connections
                 */
                setLinkPoints(points: geotoolkit.util.Point[]): any;
                /**
                 * Sets text and its options
                 * @param textOptions  (Required) text and/or its options
                 * @param textOptions.text  (Optional) text content
                 */
                setText(textOptions: any | { text?: string; } |string): any;
                /**
                 * @param url  (Required) 
                 */
                setUrl(url: string): this;
                /**
                 * Gets URL for an icon
                 */
                getUrl(): string;
                /**
                 */
                getDefaultIconSize(): geotoolkit.util.Dimension;
            }
            /**
             * String constants for all possible diagram widget tools
             */
            interface DiagramTools {
                /**
                 */
                None: any;
                /**
                 * Panning
                 */
                Panning: string;
                /**
                 * RubberBandSelection
                 */
                RubberBandSelection: string;
            }
            module connectors {
                /**
                 * Defines a side of the link visual: Begin (0) or End (1)
                 */
                var LinkSide: any;
                /**
                 * Defines link mode: No links (definges logic connection), Single-side connection or double connection
                 */
                var LinkingMode: any;
                /**
                 * Link Events enumerator
                 */
                var Events: any;
                /**
                 * Stores information about connection between a visual and a link ("arrow").
                 * That said, modelPoint defines a point for the link in visual's bounds (which does takes
                 * Local Transformation into account). LinkSide defines the side of a link: Begin or End.
                 * linkVisual defines a link that is connected to a visual.
                 */
                class LinkConnection {
                    /**
                     * Stores information about connection between a visual and a link ("arrow").
                     * That said, modelPoint defines a point for the link in visual's bounds (which does takes
                     * Local Transformation into account). LinkSide defines the side of a link: Begin or End.
                     * linkVisual defines a link that is connected to a visual.
                     * @param visual  (Required) a visual that is related to the link
                     * @param point  (Required) an anchor point in visual's coordinate system.
                     * @param linkSide  (Required) side of the link (begin=0 or end=1)
                     * @param linkVisual  (Required) a link visual instance
                     */
                    constructor(visual: geotoolkit.flowcharts.shapes.IComponent, point: geotoolkit.util.Point, linkSide: geotoolkit.flowcharts.shapes.connectors.LinkSide, linkVisual: any|geotoolkit.flowcharts.shapes.connectors.ILink);
                    /**
                     * Gets associagated visual
                     */
                    getVisual(): any|geotoolkit.scene.Node;
                    /**
                     * Gets model point (in visual space)
                     */
                    getModelPoint(): geotoolkit.util.Point;
                    /**
                     * Gets link side that defines link orientation (flow)
                     */
                    getLinkSide(): geotoolkit.flowcharts.shapes.connectors.LinkSide;
                    /**
                     * return link visual
                     */
                    getLinkVisual(): geotoolkit.scene.shapes.Polyline;
                    /**
                     * gets a visual related to this connection
                     */
                    public getRelatedVisualId(): any;
                }
                /**
                 * A simple polygonal link that connects two shapes together.
                 */
                class LinkVisual extends geotoolkit.scene.shapes.Polyline implements geotoolkit.flowcharts.shapes.connectors.ILink {
                    /**
                     * A simple polygonal link that connects two shapes together.
                     * @param options  (Optional) visual properties
                     */
                    constructor(options?: any);
                    /**
                     * Returns component class, string value
                     */
                    getPrototypeId(): string;
                    /**
                     * Gets component name
                     */
                    getPrototypeName(): string;
                    /**
                     * Gets component category
                     */
                    getCategory(): string;
                    /**
                     * Gets an array of keywords for better search
                     */
                    getSearchKeywords(): string[];
                    /**
                     * Gets default size of the link visual
                     */
                    getDefaultSize(): geotoolkit.util.Dimension;
                    /**
                     * This method does nothing for the link visual
                     * @param dimension  (Required) new default dimension
                     */
                    setDefaultSize(dimension: geotoolkit.util.Dimension): any|this;
                    /**
                     * Sets text and its options
                     * @param textOptions  (Required) text and/or its options
                     * @param textOptions.text  (Optional) text content
                     */
                    setText(textOptions: any | { text?: string; } |string): this;
                    /**
                     * Gets geometry for the current link visual
                     */
                    getGeometry(): geotoolkit.scene.Node;
                    /**
                     * Returns an array of link points: begin and end
                     */
                    getLinkPoints(): geotoolkit.util.Point[];
                    /**
                     * LinkVisual does not let setting alternative linking points, only begin and end
                     * @param ignored  (Required) ignored parameter
                     */
                    setLinkPoints(ignored: any): this;
                    /**
                     * Gets outline (path) for the Link Visual
                     */
                    getOutline(): geotoolkit.renderer.GraphicsPath;
                    /**
                     * Gets the default icon size for UI representation
                     */
                    getDefaultIconSize(): geotoolkit.util.Dimension;
                    /**
                     * Sets url for icon
                     * @param value  (Required) url for icon
                     */
                    setUrl(value: string): this;
                    /**
                     * Gets url for icon
                     */
                    getUrl(): string;
                    /**
                     * Gets text shape from the current link visual
                     */
                    getTextShape(): geotoolkit.scene.shapes.Text|any;
                    /**
                     * Get link type
                     */
                    getLinkType(): geotoolkit.flowcharts.shapes.edit.LinkType;
                    /**
                     * Sets link type
                     * @param value  (Required) desired link type
                     */
                    setLinkType(value: geotoolkit.flowcharts.shapes.edit.LinkType): this;
                    /**
                     * Gets symbol size
                     */
                    getSymbolSize(): any;
                    /**
                     * Sets linking mode. This mode defines logic of the link as well as its appearance.
                     * @param mode  (Required) a new linking mode to set
                     */
                    setLinkingMode(mode: geotoolkit.flowcharts.shapes.connectors.LinkingMode): this;
                    /**
                     * Gets linking mode. This mode defines logic of the link as well as its appearance.
                     */
                    getLinkingMode(): geotoolkit.flowcharts.shapes.connectors.LinkingMode;
                    /**
                     * Gets tubing width, if set to Schematics/skin mode
                     */
                    getTubingWidth(): number;
                    /**
                     * Ses tubing width for schematic/skin mode
                     * @param value  (Required) a width for the "tubing"
                     */
                    setTubingWidth(value: number): this;
                    /**
                     * Gets current bounds
                     */
                    getBounds(): geotoolkit.util.Rect;
                    /**
                     * Creates exact self copy
                     */
                    clone(): geotoolkit.flowcharts.shapes.connectors.LinkVisual;
                    /**
                     * Connects self to the given visual, using the given linkside to the model point (in coordinates of visual)
                     * @param visual  (Required) a visual to connect to
                     * @param linkSide  (Required) link side (begin or end)
                     * @param visualModelPoint  (Required) model coordinates (in visual model space)
                     */
                    connectTo(visual: geotoolkit.scene.Node, linkSide: geotoolkit.flowcharts.shapes.connectors.LinkSide, visualModelPoint: geotoolkit.util.Point): boolean;
                    /**
                     * Gets array of connections
                     */
                    getConnections(): geotoolkit.flowcharts.shapes.connectors.LinkConnection[];
                    /**
                     * Checks if the link visual was previously connected and disconnects if so.
                     * If devicePoint coordinates are specified, then a point with index pointIndex will be set to
                     * model position, calculated from devicePoint value.
                     * The devicePoint X Y values are used to provide "sticky" behavior for hot points.
                     * @param linkSide  (Required) defines side of the link
                     */
                    disconnectFrom(linkSide: geotoolkit.flowcharts.shapes.connectors.LinkSide): any;
                    /**
                     * checks if the visual connected to the link and returns all link point indexes. If not connected, an empty
                     * array returns
                     * @param visual  (Required) a visual to get connection points.
                     */
                    getConnectedIndexes(visual: geotoolkit.scene.Node): number[];
                    /**
                     * Performs links update, using previously set up connections.
                     * It takes connected shapes and updates self begin and end points depending on
                     * connected points
                     * @param force  (Optional) force
                     */
                    updateLinks(force?: boolean): any;
                    /**
                     * Moves link handle to the given device coordinates
                     * @param linkSide  (Required) a link side to move (begin or end)
                     * @param modelPoint  (Required) new position for the link handle in parent's model coordinates
                     */
                    moveLinkHandle(linkSide: geotoolkit.flowcharts.shapes.connectors.LinkSide, modelPoint: geotoolkit.util.Point): any;
                    /**
                     * Checks if the link visual can connect to a component at the given model point (in parent's coordinate system)
                     * @param component  (Required) a component to check if the link visual can connect to
                     * @param modelPoint  (Required) a point in model space
                     * @param minDistance  (Required) minimum distance in device units (pixels) for snapping
                     */
                    canConnect(component: any, modelPoint: geotoolkit.util.Point, minDistance: number): geotoolkit.util.Point;
                }
                /**
                 * Polygonal link visual. This visual allows to create points in real-time,
                 * e.g. draw custom link.
                 */
                class PolylineVisual extends geotoolkit.scene.shapes.Polyline implements geotoolkit.flowcharts.shapes.connectors.ILink {
                    /**
                     * Polygonal link visual. This visual allows to create points in real-time,
                     * e.g. draw custom link.
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Returns component class, string value
                     */
                    getPrototypeId(): string;
                    /**
                     * Gets component name
                     */
                    getPrototypeName(): string;
                    /**
                     * Gets component category
                     */
                    getCategory(): string;
                    /**
                     * Gets an array of keywords for better search
                     */
                    getSearchKeywords(): string[];
                    /**
                     * Gets default size of the link visual
                     */
                    getDefaultSize(): geotoolkit.util.Dimension;
                    /**
                     * This method does nothing for the link visual
                     * @param dimension  (Required) new default dimension
                     */
                    setDefaultSize(dimension: geotoolkit.util.Dimension): any|this;
                    /**
                     * Sets text and its options
                     * @param textOptions  (Required) text and/or its options
                     * @param textOptions.text  (Optional) text content
                     */
                    setText(textOptions: any | { text?: string; } |string): this;
                    /**
                     * Gets geometry for the current link visual
                     */
                    getGeometry(): geotoolkit.scene.Node;
                    /**
                     * Returns an array of link points: begin and end
                     */
                    getLinkPoints(): geotoolkit.util.Point[];
                    /**
                     * LinkVisual does not let setting alternative linking points, only begin and end
                     * @param ignored  (Required) ingored param
                     */
                    setLinkPoints(ignored: any): this;
                    /**
                     * Gets outline (path) for the Link Visual
                     */
                    getOutline(): geotoolkit.renderer.GraphicsPath;
                    /**
                     * Gets the default icon size for UI representation
                     */
                    getDefaultIconSize(): geotoolkit.util.Dimension;
                    /**
                     * Sets url for icon
                     * @param value  (Required) a url to an icon
                     */
                    setUrl(value: string): this;
                    /**
                     * Gets url for icon
                     */
                    getUrl(): string;
                    /**
                     * Gets tubing width, if set to Schematics/skin mode
                     */
                    getTubingWidth(): number;
                    /**
                     * Ses tubing width for schematic/skin mode
                     * @param value  (Required) a width for the "tubing"
                     */
                    setTubingWidth(value: number): any;
                    /**
                     * Gets current bounds
                     */
                    getBounds(): geotoolkit.util.Rect;
                    /**
                     * Connects self to the given visual, using the given linkside to the model point (in coordinates of visual)
                     * @param visual  (Required) a visual to connect to
                     * @param linkSide  (Required) link side (begin or end)
                     * @param visualModelPoint  (Required) model coordinates (in visual model space)
                     */
                    connectTo(visual: geotoolkit.scene.Node, linkSide: geotoolkit.flowcharts.shapes.connectors.LinkSide, visualModelPoint: geotoolkit.util.Point): boolean;
                    /**
                     * Gets array of connections
                     */
                    getConnections(): geotoolkit.flowcharts.shapes.connectors.LinkConnection[];
                    /**
                     * Checks if the link visual was previously connected and disconnects if so.
                     * If devicePoint coordinates are specified, then a point with index pointIndex will be set to
                     * model position, calculated from devicePoint value.
                     * The devicePoint X Y values are used to provide "sticky" behavior for hot points.
                     * @param linkSide  (Required) defines side of the link
                     * @param devicePointX  (Optional) device X-coordinate to reset. Ignored if null
                     * @param devicePointY  (Optional) device Y-coordinate to reset. Ignored if null
                     */
                    disconnectFrom(linkSide: geotoolkit.flowcharts.shapes.connectors.LinkSide, devicePointX?: number, devicePointY?: number): any;
                    /**
                     * checks if the visual connected to the link and returns all link point indexes. If not connected, an empty
                     * array returns
                     * @param visual  (Required) a visual to get connection points.
                     */
                    getConnectedIndexes(visual: geotoolkit.scene.Node): number[];
                    /**
                     * Performs links update, using previously set up connections.
                     * It takes connected shapes and updates self begin and end points depending on
                     * connected points
                     * @param force  (Optional) force
                     */
                    updateLinks(force?: boolean): any;
                    /**
                     * Checks if the link visual can connect to a component
                     * @param component  (Required) a component to check if the link visual can connect to
                     * @param modelPoint  (Required) a point in parent's model space
                     * @param minDistance  (Required) minimum distance in device units (pixels) for snapping
                     */
                    canConnect(component: geotoolkit.scene.Node, modelPoint: geotoolkit.util.Point, minDistance: number): geotoolkit.util.Point;
                }
                /**
                 * Defines a side of the link visual: Begin (0) or End (1)
                 */
                interface LinkSide {
                    /**
                     * Denotes "flow" start of the link
                     */
                    Begin: number;
                    /**
                     * Denotes "flow" end of the link
                     */
                    End: number;
                }
                /**
                 * Defines link mode: No links (definges logic connection), Single-side connection or double connection
                 */
                interface LinkingMode {
                    /**
                     * No links/connections
                     */
                    NoLinks: number;
                    /**
                     * Single side linked connection
                     */
                    SingleLink: number;
                    /**
                     * Double side linked connection
                     */
                    DoubleLink: number;
                }
                /**
                 * Base interface for links
                 */
                interface ILink {
                    /**
                     * Gets array of connections
                     */
                    getConnections(): geotoolkit.flowcharts.shapes.connectors.LinkConnection[];
                    /**
                     * Gets array of connections
                     * @param force  (Optional) force
                     */
                    updateLinks(force?: boolean): geotoolkit.flowcharts.shapes.connectors.LinkConnection[];
                }
                /**
                 * Link Events enumerator
                 */
                interface Events {
                    /**
                     * Event type fired when a link has been disconnected
                     */
                    Disconnected: string;
                    /**
                     * Event type fired when a link has been connected
                     */
                    Connected: string;
                }
            }
            module edit {
                /**
                 * Link type
                 */
                var LinkType: any;
                /**
                 * Class for group operations on shapes.
                 * This is virtual group, and used only for logical selection and manipulations
                 * over visuals
                 */
                class VirtualGroupVisual extends geotoolkit.flowcharts.shapes.DiagramVisual {
                    /**
                     * Class for group operations on shapes.
                     * This is virtual group, and used only for logical selection and manipulations
                     * over visuals
                     */
                    constructor();
                    /**
                     * Sets shapes array to the group
                     * @param shapes  (Required) the shapes to operate
                     */
                    setShapes(shapes: geotoolkit.scene.Node[]): this;
                    /**
                     * Tes shapes being operated by the virtual group
                     */
                    getShapes(): geotoolkit.scene.Node[]|any;
                }
                /**
                 * The class for visual plugins manipulation
                 */
                class VisualPluginAdapter extends geotoolkit.controls.editing.ShapeAdapter {
                    /**
                     * The class for visual plugins manipulation
                     */
                    constructor();
                    /**
                     * Sets shape
                     * @param shapes  (Required) current shape
                     */
                    setShape(shapes: geotoolkit.scene.Node): this;
                    /**
                     * Return shape bounds
                     */
                    getShapeBounds(): geotoolkit.util.Rect;
                    /**
                     * Active state is changed
                     * @param active  (Required) active state or not
                     */
                    onActiveStateChanged(active: boolean): any;
                    /**
                     * OnInitialize
                     */
                    onInitialize(): boolean;
                    /**
                     * OnMove
                     * @param x  (Required) x coordinate
                     * @param y  (Required) y coordinate
                     */
                    onMove(x: number, y: number): this;
                    /**
                     * Sets linestyle and fillstyle for the main handle (rectangle) and all the corner handles (squares)
                     * @param json  (Optional) a JSON object with style
                     * @param json.main  (Optional) object contains properties for main rectangle
                     * @param json.main.linestyle  (Optional) linestyle
                     * @param json.main.fillstyle  (Optional) fillstyle
                     * @param json.corners  (Optional) object contains properties for all the corners and sides handles
                     * @param json.corners.linestyle  (Optional) linestyle
                     * @param json.corners.fillstyle  (Optional) fillstyle
                     */
                    setStyle(json?: any | { main?: any | { linestyle?: any|geotoolkit.attributes.LineStyle; fillstyle?: any|geotoolkit.attributes.FillStyle; } ; corners?: any | { linestyle?: any|geotoolkit.attributes.LineStyle; fillstyle?: any|geotoolkit.attributes.FillStyle; } ; } ): this;
                }
                /**
                 * A mechanism providing interactivity between a user and DiagramWidget. Main tool for visuals editing in the Diagram
                 */
                class DiagramTool extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * A mechanism providing interactivity between a user and DiagramWidget. Main tool for visuals editing in the Diagram
                     * @param model  (Required) model layer
                     * @param handlesLayer  (Required) handles layer
                     */
                    constructor(model: geotoolkit.scene.Group, handlesLayer: geotoolkit.scene.Group);
                    /**
                     * Gets an associated shapes adapter registry
                     */
                    getShapeAdapters(): geotoolkit.controls.editing.ShapeAdapterRegistry;
                    /**
                     * Clears current selection
                     */
                    clearSelection(): any;
                    /**
                     * Starts the adapter, using devicePoint as start point
                     * @param nodes  (Required) nodes collection to operate on
                     * @param devicePoint  (Required) start point in device coordinates
                     * @param eventArgs  (Required) arguements to start
                     */
                    startAdapter(nodes: geotoolkit.scene.Node[], devicePoint: geotoolkit.util.Point, eventArgs: geotoolkit.controls.tools.EventArgs): any[];
                    /**
                     * Returns currently selected shapes.
                     */
                    getActiveSelection(): geotoolkit.scene.Node[];
                    /**
                     * Show shape adapters for specified shapes
                     * @param shapes  (Required) a collection of shapes to select
                     */
                    selectVisuals(shapes: geotoolkit.scene.shapes.Shape[]): this;
                    /**
                     * Returns a flag indicating if the text editor should be enabled or not
                     */
                    getTextEditorEnabled(): boolean;
                    /**
                     * Enables or disables text editor upon double click
                     * @param value  (Required) flag indicating if the text editor should be enabled or disabled
                     */
                    setTextEditorEnabled(value: boolean): this;
                    /**
                     * Event that raises on selection change
                     */
                    getOnSelectionChangeEvent(): geotoolkit.flowcharts.utils.LiteEvent;
                }
                /**
                 * Link type
                 */
                interface LinkType {
                    /**
                     */
                    Line: number;
                    /**
                     */
                    Step: number;
                }
            }
        }
        module utils {
            /**
             * A simple and lite event emitter that represents a collection of functions
             * that will be invoked upon trigger() call
             */
            class LiteEvent {
                /**
                 * A simple and lite event emitter that represents a collection of functions
                 * that will be invoked upon trigger() call
                 */
                constructor();
                /**
                 * Subscribes a handler to the event
                 * @param handler  (Required) function handler
                 */
                on(handler: any): any;
                /**
                 * Unsubscribes a handler from the event
                 * @param handler  (Required) function handler
                 */
                off(handler: any): any;
                /**
                 * Emits an event with the specified data
                 * @param data  (Required) event data that will be passed to all subscribed event handlers
                 */
                trigger(data: any): any;
            }
        }
        module persistence {
            /**
             * Serializer singleton for the FlowChart persistence
             */
            class Serializer {
                /**
                 * Serializer singleton for the FlowChart persistence
                 */
                constructor();
                /**
                 * Gets a singleton instance
                 */
                static getInstance(): geotoolkit.flowcharts.persistence.Serializer;
                /**
                 * Saves the given value to the source with name
                 * @param name  (Required) the name of the object or the object to mementoize
                 * @param value  (Optional) The value to mementoize
                 * @param source  (Optional) the source project to add property
                 */
                serialize(name: string|any, value?: any, source?: any): string;
                /**
                 * Deserializes a JSON string to the original object
                 * @param str  (Required) text to be deserialised
                 */
                deserialize(str: string): geotoolkit.persistence.MementoDeserializationContext;
                /**
                 * Assignes a new serializer to a class with the given className
                 * @param className  (Required) a name of the class that should get new serizlier
                 * @param serializer  (Required) a serializer that knows how to save/load classes className
                 */
                setSerializer(className: string, serializer: any): any;
                /**
                 * Gets a previously assigned serializer to the className
                 * @param type  (Required) serializer for the specified type
                 */
                getSerializer(type: string|any): any;
            }
            module visuals {
                /**
                 * Serializer for geotoolkit.flowcharts.shapes.DiagramVisual class
                 */
                class DiagramVisualSerializer extends geotoolkit.persistence.ObjectSerializer {
                    /**
                     * Serializer for geotoolkit.flowcharts.shapes.DiagramVisual class
                     */
                    constructor();
                }
                class ExportDiagramVisualSerializer extends geotoolkit.persistence.ObjectSerializer {
                    /**
                     */
                    constructor();
                }
                class LinkVisualSerializer extends geotoolkit.persistence.ObjectSerializer {
                    /**
                     */
                    constructor();
                }
                class PolylineVisualSerializer extends geotoolkit.persistence.ObjectSerializer {
                    /**
                     */
                    constructor();
                }
                /**
                 * Serializer for geotoolkit.flowcharts.shapes.DiagramVisual class
                 */
                class SvgVisualPluginSerializer extends geotoolkit.flowcharts.persistence.visuals.DiagramVisualSerializer {
                    /**
                     * Serializer for geotoolkit.flowcharts.shapes.DiagramVisual class
                     */
                    constructor();
                }
            }
        }
        module plugins {
            /**
             * Factory that is used for creating Diagram Visual prototypes.
             * getInstance returns an singletone instance, otherwise, new visual prototypes can be registered with
             * registerPlugin method.
             */
            class VisualFactory {
                /**
                 * Factory that is used for creating Diagram Visual prototypes.
                 * getInstance returns an singletone instance, otherwise, new visual prototypes can be registered with
                 * registerPlugin method.
                 */
                constructor();
                /**
                 * Gets an singletone instance
                 */
                static getInstance(): geotoolkit.flowcharts.plugins.VisualFactory;
                /**
                 * Gets all available plugins
                 */
                getPlugins(): geotoolkit.flowcharts.shapes.IComponent[];
                /**
                 * Gets a default fill style that should be applied to all newly created visuals
                 */
                getDefaultFillStyle(): geotoolkit.attributes.FillStyle|any;
                /**
                 * Sets a default line style that should be applied to all newly created visuals
                 * @param value  (Required) a line style instance
                 */
                setDefaultFillStyle(value: geotoolkit.attributes.LineStyle|any): this;
                /**
                 * Gets a default line style that should be applied to all newly created visuals
                 */
                getDefaultLineStyle(): geotoolkit.attributes.LineStyle|any;
                /**
                 * Sets a default line style that should be applied to all newly created visuals
                 * @param value  (Required) a line style instance
                 */
                setDefaultFillStyle(value: geotoolkit.attributes.LineStyle|any): this;
                /**
                 * Registers the given component in the factory
                 * @param component  (Required) a visual plugin instance
                 */
                registerPlugin(component: geotoolkit.flowcharts.shapes.IComponent): any;
                /**
                 * Creates a new visual plugin instance using the given prototypeId name
                 * @param prototypeId  (Required) class name for a component to creaate
                 * @param width  (Optional) the desired width of the newly created component. If not set, a default
value from prototype will be used
                 * @param height  (Optional) the desired height of the newly created component. If not set, a default
value from prototype will be used
                 */
                getVisual(prototypeId: string, width?: number, height?: number): geotoolkit.flowcharts.shapes.IComponent|any;
            }
            module library {
                /**
                 * This class provides a set of default diagram visuals prototypes, such as Link, Rectangle, Text, etc.
                 * Method getComponents returns an array of available visual prototypes
                 */
                class DefaultComponents {
                    /**
                     * This class provides a set of default diagram visuals prototypes, such as Link, Rectangle, Text, etc.
                     * Method getComponents returns an array of available visual prototypes
                     */
                    constructor();
                    /**
                     * Gets all components stored in the library
                     */
                    static getComponents(): geotoolkit.flowcharts.shapes.IComponent[];
                    /**
                     * Default components' category name
                     */
                    static Category: string;
                }
                /**
                 * This class provides a set of Flow Chart related diagram visuals prototypes
                 * Method getComponents returns an array of available visual prototypes
                 */
                class FlowChartComponents {
                    /**
                     * This class provides a set of Flow Chart related diagram visuals prototypes
                     * Method getComponents returns an array of available visual prototypes
                     */
                    constructor();
                    /**
                     * Gets all components stored in the library
                     */
                    static getComponents(): geotoolkit.flowcharts.shapes.IComponent[];
                    /**
                     * Category name
                     */
                    static Category: string;
                }
                /**
                 * This class provides a set of HR diagram visuals prototypes.
                 * Method getComponents returns an array of available visual prototypes
                 */
                class HRComponents {
                    /**
                     * This class provides a set of HR diagram visuals prototypes.
                     * Method getComponents returns an array of available visual prototypes
                     */
                    constructor();
                    /**
                     * Gets all components stored in the library
                     */
                    static getComponents(): geotoolkit.flowcharts.shapes.IComponent[];
                    /**
                     * Category name
                     */
                    static Category: string;
                }
                /**
                 * This class provides a set of industrial diagram visuals prototypes
                 * Method getComponents returns an array of available visual prototypes
                 */
                class IndustrialComponents {
                    /**
                     * This class provides a set of industrial diagram visuals prototypes
                     * Method getComponents returns an array of available visual prototypes
                     */
                    constructor();
                    /**
                     * Gets all components stored in the library
                     */
                    static getComponents(): geotoolkit.flowcharts.shapes.IComponent[];
                    /**
                     * Industrial components' category name
                     */
                    static Category: string;
                }
            }
        }
        module commands {
            /**
             * Adds a new visual to the DiagramWidget.
             */
            class AddVisual {
                /**
                 * Adds a new visual to the DiagramWidget.
                 * @param options  (Required) command options
                 * @param options.widget  (Optional) a host widget
                 * @param options.visuals  (Optional) visuals to add
                 * @param options.center  (Optional) flag indicating if the location denotes visual's center
                 * @param options.location  (Optional) model location
                 */
                constructor(options: any | { widget?: geotoolkit.flowcharts.shapes.DiagramWidget; visuals?: geotoolkit.flowcharts.shapes.IComponent[]; center?: boolean; location?: geotoolkit.util.Point; } );
                /**
                 * Executes the command
                 */
                execute(): boolean;
                /**
                 * Rewinds the command
                 */
                undo(): boolean;
            }
            /**
             * Transforms visuals
             */
            class TransformVisuals {
                /**
                 * Transforms visuals
                 * @param options  (Required) command options
                 * @param options.visual  (Optional) a visual to move
                 * @param options.transformation  (Optional) model location
                 */
                constructor(options: any | { visual?: geotoolkit.flowcharts.shapes.IComponent; transformation?: geotoolkit.util.Transformation; } );
                /**
                 * Executes the command
                 */
                execute(): boolean;
                /**
                 * Rewinds the command
                 */
                undo(): boolean;
            }
            /**
             * Translates visual using a delta
             */
            class TranslateVisuals extends geotoolkit.flowcharts.commands.TransformVisuals {
                /**
                 * Translates visual using a delta
                 * @param options  (Required) command options
                 * @param options.visual  (Optional) a visual to move
                 * @param options.delta  (Optional) model location
                 */
                constructor(options: any | { visual?: geotoolkit.flowcharts.shapes.IComponent; delta?: geotoolkit.util.Point; } );
                /**
                 * Executes the command
                 */
                execute(): boolean;
            }
            /**
             * Extends Transform visuals and performs scaling
             */
            class ScaleVisuals extends geotoolkit.flowcharts.commands.TransformVisuals {
                /**
                 * Extends Transform visuals and performs scaling
                 * @param options  (Required) command options
                 * @param options.visual  (Optional) a visual to move
                 * @param options.transformation  (Optional) model location
                 */
                constructor(options: any | { visual?: geotoolkit.flowcharts.shapes.IComponent; transformation?: geotoolkit.util.Transformation; } );
                /**
                 * Executes the command
                 */
                execute(): boolean;
            }
            /**
             * Rotates the visual based on the provided rotation anchor type.
             */
            class RotateVisuals extends geotoolkit.flowcharts.commands.TransformVisuals {
                /**
                 * Rotates the visual based on the provided rotation anchor type.
                 * @param options  (Required) command options
                 * @param options.visual  (Optional) a visual to rotate
                 * @param options.anchortype  (Optional) rotation anchor
                 */
                constructor(options: any | { visual?: geotoolkit.flowcharts.shapes.IComponent; anchortype?: geotoolkit.util.AnchorType; } );
                /**
                 * Executes the command
                 */
                execute(): boolean;
            }
            /**
             * Base interface for commands
             */
            interface ICommand {
                /**
                 * Executes the command
                 */
                execute(): boolean;
                /**
                 * Rewinds the command
                 */
                undo(): boolean;
            }
        }
    }
}
