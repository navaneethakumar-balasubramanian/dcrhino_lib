/**
 * for internal use, containing the axis reference and location
 */
declare type axisobj = any;

declare module geotoolkit {
    module widgets {
        /**
         * Scroll bar element
         */
        class ScrollBar {
            /**
             * Scroll bar element
             */
            constructor();
        }
        /**
         * Scrollable panel
         */
        class ScrollPanel {
            /**
             * Scrollable panel
             */
            constructor();
            /**
             * returns div element
             */
            getContainer(): HTMLElement;
            /**
             */
            getOverView(): geotoolkit.scene.Group;
            /**
             * Update Limits
             */
            updateLimits(): any;
            /**
             * set scroll event handler
             * @param handler  (Required) scroll event handler
             */
            setScrollEventHandler(handler: Function): this;
        }
        /**
         * The BaseWidget is the parent class of all widgets. <br>
         * It combines the concepts of Tool- {@link geotoolkit.controls.tools.AbstractTool } and Group- {@link geotoolkit.scene.Group }
         * to provide a simple way of creating a specific component like concept.<br>
         * Inheriting classes extend this concept by adding specific tools and shapes to provide a domain oriented component that can be reused easily.
         */
        class BaseWidget extends geotoolkit.scene.Group {
            /**
             * The BaseWidget is the parent class of all widgets. <br>
             * It combines the concepts of Tool- {@link geotoolkit.controls.tools.AbstractTool } and Group- {@link geotoolkit.scene.Group }
             * to provide a simple way of creating a specific component like concept.<br>
             * Inheriting classes extend this concept by adding specific tools and shapes to provide a domain oriented component that can be reused easily.
             * @param options  (Required) 
             * @param options.bounds  (Optional) bounds of the current widget
             */
            constructor(options: any | { bounds?: geotoolkit.util.Rect; } );
            /**
             * function call in the constructor to initialize tools in the widget
             */
            protected initializeTools(): this;
            /**
             * Connect a new tool with a toolname to the widget
             * @param tool  (Required) tool associated with the widget
             */
            connectTool(tool: geotoolkit.controls.tools.AbstractTool|geotoolkit.controls.tools.AbstractTool[]): this;
            /**
             * Disconnect the tool from the widget
             * @param tool  (Required) tool to disconnect
             */
            disconnectTool(tool: geotoolkit.controls.tools.AbstractTool|geotoolkit.controls.tools.AbstractTool[]): this;
            /**
             * Returns root tool associated to this widget
             */
            getTool(): geotoolkit.controls.tools.CompositeTool;
            /**
             * Set root tool associated to this widget
             * @param tool  (Required) tool to be set
             */
            protected setTool(tool: geotoolkit.controls.tools.CompositeTool): this;
            /**
             * Returns the tool matching the given name.<br>
             * This function also accepts tool 'path' instead of absolute name.<br>
             * For example:<br>
             * getToolByName("compositeTool.panningTools.trackPanning.TrackPanning")<br>
             * Would return the same tool than <br>
             * getToolByName("TrackPanning")<br>
             * As long as there is only one tool named "TrackPanning" in this composite<br>
             * See listToolsNames()<br>
             * @param toolName  (Required) The tool name or path
             */
            getToolByName(toolName: string): geotoolkit.controls.tools.AbstractTool;
            /**
             * Returns the tool matching the given type. or null if nothing is matching the tool type<br>
             * For example:<br>
             * getToolByType(geotoolkit.controls.tools.Selection)<br>
             * Would return the same tool than<br>
             * getToolByName("pick")<br>
             * @param toolType  (Required) toolType of the tool
             */
            getToolByType(toolType: string): geotoolkit.controls.tools.AbstractTool;
            /**
             * List all the tools contained in this composite.
             * Prepend their parent tools parent using a '.'.
             */
            listToolsNames(): string[];
            /**
             * Dispose node. Clear all listeners
             * and disconnect style to avoid memory
             * leaks
             */
            dispose(): any;
            /**
             * Load template loads the saved visual properties of the current template. It is only a visual representation of the current widget. It does not contain any data
             * @param template  (Required) template to be applied to current widget
             * @param registry  (Optional) registry
             */
            loadTemplate(template: string, registry?: geotoolkit.persistence.Registry): any;
            /**
             * Save template saves visual properties of the current template. It is only a visual representation of the current widget. It does not contain any data
             * @param registry  (Optional) registry
             */
            saveTemplate(registry?: geotoolkit.persistence.Registry): string;
            /**
             * get options
             * @param data  (Required) how to extract data, null by default
             */
            getData(data: any): any;
            /**
             * Gets all the properties pertaining to this object
             * See {@link geotoolkit.scene.Group.getProperties} for details
             * Keep in mind that widgets does not return scene-graph information
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * Keep in mind that widgets does not accept scene-graph information
             * NOTE properties.children property will be ignored
             * @param properties  (Required) JSON containing properties
             */
            setProperties(properties: any): this;
        }
        /**
         * The AnnotatedWidget widget extends the BaseWidget using an AnnotatedNode. It has a center model {@link geotoolkit.scene.Group} and a set of eight annotations on each side to display axes, titles, or legends.
         * It has settings to specify sizes of the annotations and create axis. It also provides scrollbars and capabilities to zoom for the center element. <br>
         * 
         * A connect function is used to synchronize the object with a model. It propagates limits and scroll position, so while scrolling the connect function synchronizes scale coefficients.
         * <p>
         * The main way to configure and customize the widget is to use the setOptions() function that provides a comprehensible way of changing the default look and feel of the widget.<br>
         * The constructor calls the functions geotoolkit.widgets.AnnotatedWidget.prototype.initializeLayout() and geotoolkit.widgets.AnnotatedWidget.prototype.initializeTools().<br>
         * 
         * See {@link geotoolkit.scene.AnnotatedNode} for more details on the annotation layout and features.
         * </p>
         * 
         * <p> It also includes some default tools:
         * <ul>
         * <li> cross-hair {@link geotoolkit.controls.tools.CrossHair} </li
         * <li> panning {@link geotoolkit.controls.tools.Panning} </li>
         * <li> pick {@link geotoolkit.controls.tools.Selection} </li>
         * <li> rubberband {@link geotoolkit.controls.tools.RubberBand} </li>
         * <li> pinchtozoom {@link geotoolkit.controls.tools.PinchToZoom} </li>
         * <li> horizontalscroll {@link geotoolkit.controls.tools.scroll.HorizontalScroll} </li>
         * <li> verticalscroll {@link geotoolkit.controls.tools.scroll.VerticalScroll}</li>
         * </ul>
         * The widget also provides builtin export to PDF, please refer to the example below<br>
         * </p>
         */
        class AnnotatedWidget extends geotoolkit.widgets.BaseWidget implements geotoolkit.scene.exports.IExportable {
            /**
             * The AnnotatedWidget widget extends the BaseWidget using an AnnotatedNode. It has a center model {@link geotoolkit.scene.Group} and a set of eight annotations on each side to display axes, titles, or legends.
             * It has settings to specify sizes of the annotations and create axis. It also provides scrollbars and capabilities to zoom for the center element. <br>
             * 
             * A connect function is used to synchronize the object with a model. It propagates limits and scroll position, so while scrolling the connect function synchronizes scale coefficients.
             * <p>
             * The main way to configure and customize the widget is to use the setOptions() function that provides a comprehensible way of changing the default look and feel of the widget.<br>
             * The constructor calls the functions geotoolkit.widgets.AnnotatedWidget.prototype.initializeLayout() and geotoolkit.widgets.AnnotatedWidget.prototype.initializeTools().<br>
             * 
             * See {@link geotoolkit.scene.AnnotatedNode} for more details on the annotation layout and features.
             * </p>
             * 
             * <p> It also includes some default tools:
             * <ul>
             * <li> cross-hair {@link geotoolkit.controls.tools.CrossHair} </li
             * <li> panning {@link geotoolkit.controls.tools.Panning} </li>
             * <li> pick {@link geotoolkit.controls.tools.Selection} </li>
             * <li> rubberband {@link geotoolkit.controls.tools.RubberBand} </li>
             * <li> pinchtozoom {@link geotoolkit.controls.tools.PinchToZoom} </li>
             * <li> horizontalscroll {@link geotoolkit.controls.tools.scroll.HorizontalScroll} </li>
             * <li> verticalscroll {@link geotoolkit.controls.tools.scroll.VerticalScroll}</li>
             * </ul>
             * The widget also provides builtin export to PDF, please refer to the example below<br>
             * </p>
             * @param options  (Optional) The widget options see initializeLayout() for details
             * @param options.model  (Optional) model or group
             * @param options.bounds  (Optional) bounds of the model
             * @param options.north  (Optional) JSON to hold north annotation options
             * @param options.north.size  (Optional) north annotation desired size (width for horizontal; height for vertical)
             * @param options.north.title  (Optional) north annotation title options (see {@link geotoolkit.scene.shapes.Text}'s "setProperties" description for details)
             * @param options.north.axis  (Optional) north annotation axis options (see {@link geotoolkit.axis.Axis}'s "setProperties" description for details)
             * @param options.east  (Optional) JSON to hold east annotation options
             * @param options.south  (Optional) JSON to hold south annotation options
             * @param options.west  (Optional) JSON to hold west annotation options
             * @param options.annotationitemswrap  (Optional) true if you want to wrap annotation items in constructor with a new group with zero to one limits
             * @param options.annotationssizes  (Optional) JSON to hold (width or height) of the annotation {@link geotoolkit.widgets.AnnotatedWidget.setAnnotationSize}
             * @param options.annotationssizes.east  (Optional) JSON to hold east annotation size
             * @param options.annotationssizes.south  (Optional) JSON to hold south annotation size
             * @param options.annotationssizes.west  (Optional) JSON to hold west annotation size
             * @param options.annotationssizes.north  (Optional) JSON to hold north annotation size
             * @param options.tools  (Optional) see {@link geotoolkit.widgets.AnnotatedWidget.setToolsOptions}
             * @param options.border  (Optional) defines properties for widget outer border
             * @param options.border.color  (Optional) color of border border
             */
            constructor(options?: any | { model?: geotoolkit.scene.Group; bounds?: geotoolkit.util.Rect; north?: any | { size?: number|string; title?: any; axis?: any; } ; east?: any; south?: any; west?: any; annotationitemswrap?: boolean; annotationssizes?: any | { east?: number|string; south?: number|string; west?: number|string; north?: number|string; } ; tools?: any; border?: any | { color?: any; } ; } );
            /**
             * Annotated Widget Events enumerator
             */
            static Events: any;
            /**
             */
            static DEFAULT_SCROLL_BAR_HEIGHT: number;
            /**
             */
            static DEFAULT_SCROLL_BAR_WIDTH: number;
            /**
             * @param settings  (Required) define widgets settings
             * @param settings.model  (Optional) model or group
             * @param settings.border  (Optional) defines properties for widget outer border
             * @param settings.border.color  (Optional) color of border border
             * @param settings.annotationssizes  (Optional) defines annotations sizes
             * @param settings.annotationssizes.north  (Optional) JSON to hold (width or height) of the annotation
             * @param settings.annotationssizes.south  (Optional) JSON to hold east annotation size
             * @param settings.annotationssizes.west  (Optional) JSON to hold west annotation size
             * @param settings.annotationssizes.east  (Optional) JSON to hold east annotation size
             * @param settings.north  (Optional) the Array of geotoolkit.scene.Node to display on top of the model
             * @param settings.north.size  (Optional) north annotation desired size (width for horizontal; height for vertical)
             * @param settings.north.title  (Optional) north annotation title options (see {@link geotoolkit.scene.shapes.Text}'s "setProperties" description for details)
             * @param settings.north.axis  (Optional) north annotation axis options (see {@link geotoolkit.axis.Axis}'s "setProperties" description for details)
             * @param settings.south  (Optional) the Array of geotoolkit.scene.Node to display on top of the model
             * @param settings.west  (Optional) the Array of geotoolkit.scene.Node to display on top of the model
             * @param settings.east  (Optional) the Array of geotoolkit.scene.Node to display on top of the model
             * @param settings.applicationId  (Optional) id object id
             */
            initializeLayout(settings: any | { model?: geotoolkit.scene.Group; border?: any | { color?: string|geotoolkit.util.RgbaColor; } ; annotationssizes?: any | { north?: string|number; south?: string|number; west?: string|number; east?: string|number; } ; north?: any[]|geotoolkit.scene.Node|any | { size?: number|string; title?: any; axis?: any; } ; south?: any[]|geotoolkit.scene.Node; west?: any[]|geotoolkit.scene.Node; east?: any[]|geotoolkit.scene.Node; applicationId?: number|string; } ): geotoolkit.scene.Group;
            /**
             * Sets visible model limits
             * @param limits  (Optional) the visible model limits
             */
            zoomToRect(limits?: geotoolkit.util.Rect): any;
            /**
             * Sets bounds of the node in the parent coordinates
             * @param bounds  (Required) bound of the node in the parent coordinates
             */
            setBounds(bounds: geotoolkit.util.Rect|any): this;
            /**
             * Refresh layout of inner components of the widget
             */
            refreshLayout(): this;
            /**
             * Attempts to set local transformation for the model.
             * NOTE: the local transformation set may not be equal
             * to transformation passed - it depends on current
             * ScaleScrollStrategy set on the node.
             * @param transformation  (Required) transformation to set
             */
            setModelTransformation(transformation: geotoolkit.util.Transformation): this;
            /**
             * function call in the constructor to initialize tools in the widget<br>
             * This widget contains by default :<br>
             * - geotoolkit.controls.tools.CrossHair tool <br>
             * - geotoolkit.controls.tools.RubberBand tool <br>
             * - geotoolkit.controls.tools.Panning tool <br>
             * - geotoolkit.controls.tools.scroll.HorizontalScroll <br>
             * - geotoolkit.controls.tools.scroll.VerticalScroll <br>
             */
            protected initializeTools(): any;
            /**
             * Attempts to set model's visible limits to specified limits.
             * NOTE: the limits set may not be equal
             * to the limit passed - it depends on current
             * ScaleScrollStrategy set on the node.
             * @param newVisibleModelLimits  (Required) limits to set
             */
            setVisibleModelLimits(newVisibleModelLimits: geotoolkit.util.Rect): this;
            /**
             * Translates widget's contents.
             * @param tx  (Required) x translation
             * @param ty  (Required) y translation
             */
            translateModel(tx: number, ty: number): this;
            /**
             * Scale node's contents.
             * @param xx  (Required) x scale factor
             * @param yy  (Required) y scale factor
             * @param posX  (Optional) x position to scale from (in pxl)
             * @param posY  (Optional) y position to scale from (in pxl)
             */
            scaleModel(xx: number, yy: number, posX?: number, posY?: number): this;
            /**
             * Set the model limits of center model
             * @param modellimits  (Required) model limits
             */
            setCenterModelLimits(modellimits: geotoolkit.util.Rect): this;
            /**
             * Return model limits
             */
            getCenterModelLimits(): geotoolkit.util.Rect|any;
            /**
             * Returns visible model limits of the center model
             * @param ignoreModelLimits  (Optional) flag defines whether to ignore model limits or not. By default this option is false and
visible limits will be intersected with center model limits
             */
            getVisibleCenterModelLimits(ignoreModelLimits?: boolean): geotoolkit.util.Rect|any;
            /**
             * Attempts to set model's visible limits to specified limits.
             * NOTE: the limits set may not be equal
             * to the limit passed - it depends on current
             * ScaleScrollStrategy set on the node.
             * @param newVisibleModelLimits  (Required) limits to set
             */
            setVisibleCenterModelLimits(newVisibleModelLimits: geotoolkit.util.Rect): this;
            /**
             * apply size (width or height) to annotation (convenience method)
             * @param annotationSize  (Optional) JSON to hold (width or height) of the annotation
             * @param annotationSize.east  (Optional) preferred width of east annotation size
             * @param annotationSize.south  (Optional) preferred height of south annotation size
             * @param annotationSize.west  (Optional) preferred width of west annotation size
             * @param annotationSize.north  (Optional) preferred height of north annotation size
             */
            setAnnotationSize(annotationSize?: any | { east?: any|string|number; south?: any|string|number; west?: any|string|number; north?: any|string|number; } ): this;
            /**
             * Return size of all annotations
             */
            getAnnotationSize(): {sizes:{west:number;east:number;north:number;south:number}}|any;
            /**
             * Sets annotations' options. currently setAnnotationOptions can only modify existing annotation, while the constructor for the widget can create new ones.
             * @param options  (Required) JSON to hold annotations' options
             * @param options.north  (Optional) JSON to hold north annotation options
             * @param options.north.size  (Optional) north annotation desired size (width for horizontal; height for vertical)
             * @param options.north.title  (Optional) north annotation title options (see {@link geotoolkit.scene.shapes.Text}'s "setProperties" description for details)
             * @param options.north.axis  (Optional) north annotation axis options (see {@link geotoolkit.axis.Axis}'s "setProperties" description for details)
             * @param options.east  (Optional) JSON to hold east annotation options
             * @param options.south  (Optional) JSON to hold south annotation options
             * @param options.west  (Optional) JSON to hold west annotation options
             */
            setAnnotationsOptions(options: any | { north?: any | { size?: number|string; title?: any; axis?: any; } ; east?: any; south?: any; west?: any; } ): this;
            /**
             * Add title to annotation
             * @param location  (Required) of the title
             * @param options  (Required) title options
             * @param options.text  (Optional) text to display in title
             * @param options.textstyle  (Optional) textstyle of title
             */
            addTitle(location: geotoolkit.layout.AnnotationLocation, options: any | { text?: string; textstyle?: any|geotoolkit.attributes.TextStyle; } ): any;
            /**
             * set options for title
             * @param location  (Required) of the title
             * @param options  (Required) title options
             * @param options.text  (Optional) text to display in title
             * @param options.textstyle  (Optional) textstyle of title
             */
            setTitleOptions(location: geotoolkit.layout.AnnotationLocation, options: any | { text?: string; textstyle?: any|geotoolkit.attributes.TextStyle; } ): this;
            /**
             * remove title in the location
             * @param location  (Required) of the title
             */
            removeTitle(location: geotoolkit.layout.AnnotationLocation): any;
            /**
             * add new axis and connect with object
             * @param axis  (Required) new axis instance or options
             * @param location  (Required) location of annotation for adding new axis
             * @param connectedObject  (Optional) connected object of axis*
             */
            addAxis(axis: geotoolkit.axis.Axis|any, location: geotoolkit.layout.AnnotationLocation, connectedObject?: geotoolkit.scene.Node): {obj:{axis:geotoolkit.axis.Axis;group:geotoolkit.scene.Group}}|any;
            /**
             * remove axis
             * @param axis  (Required) axis to be removed
             */
            removeAxis(axis: geotoolkit.axis.Axis): any;
            /**
             * Synchronizes object with a model
             * @param object  (Required) object to be synchronised
             * @param model  (Required) source model
             * @param orientation  (Optional) horizontal or vertical
             * @param autoSize  (Optional) true if object and model share the same device size in the orientation, true by default if not specified
             */
            connect(object: geotoolkit.scene.Group|geotoolkit.axis.Axis, model: geotoolkit.scene.Group, orientation?: geotoolkit.util.Orientation, autoSize?: boolean): this;
            /**
             * Disconnect an object from its source model
             * @param object  (Required) object to disconnect
             */
            disconnect(object: geotoolkit.scene.Group|geotoolkit.axis.Axis): this;
            /**
             * zoom in, with default factor = 5/4
             */
            zoomIn(): this;
            /**
             * zoom out, with default factor = 5/4
             */
            zoomOut(): this;
            /**
             * get model node
             */
            getModel(): geotoolkit.scene.Group;
            /**
             * fit bounds to model limits
             */
            fitToBounds(): this;
            /**
             * attempts to translate the model using the specific x, y translation
             * @param dx  (Required) relative horizontal change
             * @param dy  (Required) relative vertical change
             */
            pan(dx: number, dy: number): this;
            /**
             * set the scale scroll strategy to apply to the widget
             * @param delegate  (Required) scaleScrollStrategy to set
             */
            setScaleScrollStrategy(delegate: geotoolkit.scene.ScaleScrollStrategy|Function): this;
            /**
             * return the node at the specific annotation
             * @param location  (Required) position to return the node for
             */
            getAnnotation(location: geotoolkit.layout.AnnotationLocation): geotoolkit.scene.Group;
            /**
             * Export a part of the container to PDF
             * <p>This method sets automatically export scale and limits based on input parameters and current model scale and limits</p>
             * @param options  (Optional) option to specify paper parameters and header and footer
             * @param options.header  (Optional) define optional header
             * @param options.footer  (Optional) define optional header
             * @param options.output  (Optional) the name of the file to be created
             * @param options.printsettings  (Optional) define optional paper and export parameters
             * @param options.printsettings.paperformat  (Optional) define optional paper paper format
             * @param options.printsettings.top  (Optional) define optional top margin
             * @param options.printsettings.bottom  (Optional) define optional bottom margin
             * @param options.printsettings.left  (Optional) define optional left margin
             * @param options.printsettings.right  (Optional) define optional top margin
             * @param options.printsettings.orientation  (Optional) define optional paper orientation
             * @param options.printsettings.scaling  (Optional) define optional scaling mode
             * @param options.printsettings.keepaspectratio  (Optional) keep aspect ratio
             * @param options.printsettings.continuous  (Optional) continuous printing
             * @param options.printsettings.drawwesttoeast  (Optional) draw pages from West to East
             * @param options.modellimits  (Optional) model limits that should be exported. By default the virtual limits
             * @param options.scale  (Optional) export scale  by default as is
             * @param options.scale.x  (Optional) export scale by x
             * @param options.scale.y  (Optional) export scale by y
             * @param options.imagecompression  (Optional) options to specify the image compression
             * @param options.imagecompression.mode  (Optional) image compression method used to exporting pdf.
             * @param options.imagecompression.quality  (Optional) quality range from 0 to 1 that will express the jpeg image compression quality, available for jpeg mode only.
             * @param options.imagecompression.speed  (Optional) speed referring to the png compression speed, available  for png mode only.
             * @param options.streamcompression  (Optional) enable or disable pdf output compression
             * @param options.save  (Optional) flag to save the stream directly to file or open dialog
             */
            exportToPdf(options?: any | { header?: geotoolkit.scene.exports.HeaderComponent; footer?: geotoolkit.scene.exports.FooterComponent; output?: string; printsettings?: any | { paperformat?: geotoolkit.scene.exports.AbstractPaperFormat|string; top?: number; bottom?: number; left?: number; right?: number; orientation?: string; scaling?: string; keepaspectratio?: boolean; continuous?: boolean; drawwesttoeast?: boolean; } ; modellimits?: geotoolkit.util.Rect; scale?: any | { x?: number; y?: number; } ; imagecompression?: any | { mode?: geotoolkit.pdf.ImageCompression; quality?: number; speed?: geotoolkit.pdf.SpeedCompression; } ; streamcompression?: boolean; save?: boolean; } ): geotoolkit.util.Promise;
            /**
             * Return export limits
             */
            getExportLimits(): geotoolkit.util.Rect;
            /**
             * Sets export limits
             * @param limits  (Required) export limits
             */
            setExportLimits(limits: geotoolkit.util.Rect): this;
            /**
             * Sets export scale. By default scale is nto ste and equal to screen scale
             */
            getExportScale(): {scale:{x:number;y:number}}|any;
            /**
             * Sets export scale. By default scale is nto ste and equal to screen scale
             * @param scale  (Optional) scale
             * @param scale.x  (Optional) scale by x form model to device
             * @param scale.y  (Optional) scale by y form model to device
             */
            setExportScale(scale?: any | { x?: number; y?: number; } ): this;
            /**
             * Prepares object before exporting and saving state
             */
            beginExport(): this;
            /**
             * Restores object's state after exporting
             */
            endExport(): any;
            /**
             * Returns exportable element
             * @param options  (Optional) options
             * @param options.documentheader  (Optional) an optional document PDF header
             * @param options.documentfooter  (Optional) an optional document PDF footer
             */
            getExportElement(options?: any | { documentheader?: geotoolkit.scene.exports.FooterComponent; documentfooter?: geotoolkit.scene.exports.FooterComponent; } ): geotoolkit.scene.exports.AbstractDocumentElement;
            /**
             * Set Tools Options
             * @param options  (Optional) JSON which defines tools options
             * @param options.verticalscroll  (Optional) JSON which defines vertical scroll bar
             * @param options.verticalscroll.type  (Optional) vertical scroll bar type
             * @param options.verticalscroll.visible  (Optional) vertical scroll bar visibility
             * @param options.horizontalscroll  (Optional) JSON which defines horizontal scroll bar
             * @param options.horizontalscroll.type  (Optional) horizontal scroll bar type
             * @param options.horizontalscroll.visible  (Optional) horizontal scroll bar visibility
             * @param options.crosshair  (Optional) JSON which defines crosshair cursor. See {geotoolkit.controls.tools.CrossHair.setSettings} for details
             * @param options.panning  (Optional) JSON which defines panning.
             * @param options.panning.enabled  (Optional) is panning enabled
             * @param options.rubberbandzoom  (Optional) JSON which defines rubber band zoom. See {geotoolkit.controls.tools.RubberBand.setSettings} for details
             * @param options.selection  (Optional) JSON which defines selection. See {geotoolkit.controls.tools.Selection.setSettings} for details
             * @param options.selection.resetselection  (Optional) does the selection resets between two picks
             */
            setToolsOptions(options?: any | { verticalscroll?: any | { type?: string; visible?: boolean; } ; horizontalscroll?: any | { type?: string; visible?: boolean; } ; crosshair?: any; panning?: any | { enabled?: boolean; } ; rubberbandzoom?: any; selection?: any | { resetselection?: boolean; } ; } ): this;
            /**
             * Gets all the properties pertaining to this object
             * (getData needs to be defined)
             * See {@link geotoolkit.widgets.AnnotatedWidget.getProperties} for details
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * (setData needs to be defined)
             * @param properties  (Optional) JSON containing properties
             * @param properties.backgroundfillstyle  (Optional) deprecated since 2.6 use [properties.fillstyle] instead, see {@link geotoolkit.scene.Group#setProperties}
             * @param properties.annotationssizes  (Optional) see {@link geotoolkit.widgets.AnnotatedWidget#setAnnotationSize}
             * @param properties.tools  (Optional) see {@link geotoolkit.widgets.AnnotatedWidget#setToolsOptions}
             */
            setProperties(properties?: any | { backgroundfillstyle?: geotoolkit.attributes.FillStyle; annotationssizes?: any; tools?: any; } ): this;
            /**
             * get options
             * @param getDataOptions  (Optional) how to extract data, by default undefined
             */
            getData(getDataOptions?: any): any;
            /**
             * Sets data
             * @param data  (Required) data and widget properties
             */
            setData(data: any): this;
            /**
             * Saves tools state
             */
            saveToolsState(): this;
        }
        /**
         * The crossplot widget is an annotated widget that is specialized for cross plot representations.
         * <p>
         * Cross plot is a two dimensional chart, that uses horizontal and vertical axes to plot the data points. <br/>
         * Cross plot shows how much one variable is affected by another. The relationship between two variables is called their correlation. </br>
         * Cross plots usually consist of a large body of data. <br>
         * </p>
         * <p>
         * It uses {@link geotoolkit.controls.shapes.CrossPlot} internally.
         * setOptions() API can be used to configure and customize the widget. It provides a comprehensible way of changing the default look and feel of the widget.
         * </p>
         * <p>
         * It reuses the default <b>tools</b> provided by the {@link geotoolkit.widgets.AnnotatedWidget} and customizes them for crossplot related operations.
         * It also provides utility functions to highlight points in a given area (or by index)<br>
         * Selection function not only selects crossplot shapes but also provides selected point index.
         * </p>
         * <p>
         * The crossplot can represent 3 dimesions: X, Y, and color of datasets.
         * By default, crossplot can contain only a single dataset.
         * Another dataset could also be added on top of it as long as its modellimits and bounds are also managed independently.
         * The color of each point can be defined using a {@link geotoolkit.util.ColorProvider}
         * and the corresponding {@link geotoolkit.controls.shapes.ColorBar} can be displayed.
         * 
         * </p>
         */
        class CrossPlot extends geotoolkit.widgets.AnnotatedWidget {
            /**
             * The crossplot widget is an annotated widget that is specialized for cross plot representations.
             * <p>
             * Cross plot is a two dimensional chart, that uses horizontal and vertical axes to plot the data points. <br/>
             * Cross plot shows how much one variable is affected by another. The relationship between two variables is called their correlation. </br>
             * Cross plots usually consist of a large body of data. <br>
             * </p>
             * <p>
             * It uses {@link geotoolkit.controls.shapes.CrossPlot} internally.
             * setOptions() API can be used to configure and customize the widget. It provides a comprehensible way of changing the default look and feel of the widget.
             * </p>
             * <p>
             * It reuses the default <b>tools</b> provided by the {@link geotoolkit.widgets.AnnotatedWidget} and customizes them for crossplot related operations.
             * It also provides utility functions to highlight points in a given area (or by index)<br>
             * Selection function not only selects crossplot shapes but also provides selected point index.
             * </p>
             * <p>
             * The crossplot can represent 3 dimesions: X, Y, and color of datasets.
             * By default, crossplot can contain only a single dataset.
             * Another dataset could also be added on top of it as long as its modellimits and bounds are also managed independently.
             * The color of each point can be defined using a {@link geotoolkit.util.ColorProvider}
             * and the corresponding {@link geotoolkit.controls.shapes.ColorBar} can be displayed.
             * 
             * </p>
             * @param options  (Optional) options to initialize crossplot
             * @param options.bounds  (Optional) where to place the XPlot
             * @param options.border  (Optional) defines properties for widget outer border
             * @param options.border.color  (Optional) color of border border
             * @param options.viewcache  (Optional) enable tiled cache. It increase rendering performance for geometry used to represent data history
             * @param options.viewcachesize  (Optional) viewcachesize
             * @param options.viewcachesize.width  (Optional) set tiled cache size.
             * @param options.viewcachesize.height  (Optional) set tiled cache size.
             */
            constructor(options?: any | { bounds?: geotoolkit.util.Rect; border?: any | { color?: any; } ; viewcache?: boolean; viewcachesize?: any | { width?: any; height?: any; } ; } );
            /**
             */
            dispose(): any;
            /**
             * Refresh layout of inner components of the widget
             */
            refreshLayout(): this;
            /**
             * Sets bounds of the node in the parent coordinates
             * @param bounds  (Required) bound of the node in the parent coordinates
             */
            setBounds(bounds: geotoolkit.util.Rect|any): this;
            /**
             * function call in the constructor to initialize tools in the widget <br>
             * This widget adds a selection filter. This filter is used to send a object that contains the crossplot shape reference and
             * an array of indices that represents selected shapes.
             */
            protected initializeTools(): this;
            /**
             * Sets data options (for non-data parameters use CrossPlot.prototype.setOptions)
             * @param data  (Optional) options and data
             * @param data.bounds  (Optional) bounds. See {@link geotoolkit.util.Rect.setProperties} for details.
             * @param data.header  (Optional) JSON which defines header area
             * @param data.header.title  (Optional) JSON which defines main title. See {@link geotoolkit.attributes.TextStyle.setProperties} for details.
             * @param data.header.annotationsize  (Optional) height of header
             * @param data.colorprovider  (Optional) ColorProvider used to color the data
             * @param data.x  (Optional) JSON which defines X-data.
             * @param data.x.datasource  (Optional) DataSource of X-data
             * @param data.x.autominmax  (Optional) are X min/max fixed (false) or given by datasource (true). X DataSource has to exist
             * @param data.x.data  (Optional) Array of X-data
             * @param data.x.label  (Optional) JSON which defines X-label. See {@link geotoolkit.attributes.TextStyle.setProperties} for details.
             * @param data.x.annotationsize  (Optional) height of X-annotation
             * @param data.x.min  (Optional) Minimum X-Value to display X-data. If never set, will be min of [data.x.data]
             * @param data.x.max  (Optional) Maximum X-Value to display X-data. If never set, will be max of [data.x.data]
             * @param data.x.reversed  (Optional) Is the X-Axis reversed. If never set, will be true if [data.x.max]<[data.x.min]
             * @param data.x.logarithmic  (Optional) Is the X-Axis logarithmic. default is false
             * @param data.x.axisticks  (Optional) JSON which defines ticks options of the X-axis. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
             * @param data.x.gridticks  (Optional) JSON which defines vertical ticks options of the grid. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
             * @param data.x.histogram  (Optional) JSON which defines histogram properties
             * @param data.x.histogram.visible  (Optional) Is the histogram visible (default is false)
             * @param data.x.histogram.color  (Optional) deprecated rgba color to be used
             * @param data.x.histogram.fillstyle  (Optional) fill style to be used
             * @param data.x.histogram.linestyle  (Optional) line style to be used
             * @param data.x.histogram.bins  (Optional) number of bins to be used (default is 25)
             * @param data.y  (Optional) JSON which defines Y-data.
             * @param data.y.datasource  (Optional) DataSource of Y-data
             * @param data.y.autominmax  (Optional) are Y min/max fixed (false) or given by datasource (true). Y DataSource has to exist
             * @param data.y.data  (Optional) Array of Y-data
             * @param data.y.label  (Optional) JSON which defines Y-label. See {@link geotoolkit.scene.shapes.Text.setProperties} for details.
             * @param data.y.annotationsize  (Optional) width of Y-annotation
             * @param data.y.min  (Optional) Minimum Y-Value to display Y-data. If never set, will be min of [data.y.data]
             * @param data.y.max  (Optional) Maximum Y-Value to display Y-data. If never set, will be max of [data.y.data]
             * @param data.y.reversed  (Optional) Is the Y-Axis reversed. If never set, will be true if [data.y.max]>[data.y.min]
             * @param data.y.logarithmic  (Optional) Is the Y-Axis logarithmic. default is false
             * @param data.y.axisticks  (Optional) JSON which defines ticks options of the Y-axis. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
             * @param data.y.gridticks  (Optional) JSON which defines horizontal ticks options of the grid. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
             * @param data.y.histogram  (Optional) JSON which defines histogram properties
             * @param data.y.histogram.visible  (Optional) Is the histogram visible (default is false)
             * @param data.y.histogram.color  (Optional) deprecated rgba color to be used
             * @param data.y.histogram.fillstyle  (Optional) fill style to be used
             * @param data.y.histogram.linestyle  (Optional) line style to be used
             * @param data.y.histogram.bins  (Optional) number of bins to be used (default is 25)
             * @param data.z  (Optional) JSON which defines Z-data.
             * @param data.z.datasource  (Optional) DataSource of Z-data
             * @param data.z.autominmax  (Optional) are Z min/max fixed (false) or given by datasource (true). Z DataSource has to exist
             * @param data.z.data  (Optional) Array of Z-data
             * @param data.z.label  (Optional) JSON which defines Z-label. See {@link geotoolkit.scene.shapes.Text.setProperties} for details.
             * @param data.z.annotationsize  (Optional) width of Z-annotation
             * @param data.z.min  (Optional) Minimum Z-Value of Z-data colorbox. If never set, will be min of [data.z.data]
             * @param data.z.max  (Optional) Maximum Z-Value of Z-data colorbox. If never set, will be max of [data.z.data]
             * @param data.z.reversed  (Optional) Is the Z-Axis reversed. If never set, will be true if [data.z.max]>[data.z.min]
             * @param data.z.logarithmic  (Optional) Is the Z-Axis colorbox logarithmic. default is false
             * @param data.z.axisticks  (Optional) JSON which defines ticks options of the Z-axis. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
             * @param data.z.legendvisible  (Optional) legend visibility
             * @param data.marker  (Optional) JSON which defines marker options
             * @param data.marker.painter  (Optional) painter style
             * @param data.marker.size  (Optional) marker size
             * @param data.marker.defaultcolor  (Optional) default color
             * @param data.marker.defaultlinecolor  (Optional) default line color
             * @param data.marker.highlightcolor  (Optional) highlight color
             * @param data.marker.highlightsize  (Optional) size of the highlighted markers
             * @param data.tools  (Optional) JSON which defines tools options. See {@link geotoolkit.widgets.CrossPlot.setToolsOptions} for details
             */
            setData(data?: any | { bounds?: any|geotoolkit.util.Rect; header?: any | { title?: any; annotationsize?: number; } ; colorprovider?: geotoolkit.util.ColorProvider; x?: any | { datasource?: geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; autominmax?: boolean; data?: number[]; label?: any; annotationsize?: number; min?: number; max?: number; reversed?: boolean; logarithmic?: boolean; axisticks?: any; gridticks?: any; histogram?: any | { visible?: boolean; color?: string; fillstyle?: geotoolkit.attributes.FillStyle|any; linestyle?: geotoolkit.attributes.LineStyle|any; bins?: number; } ; } ; y?: any | { datasource?: geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; autominmax?: boolean; data?: number[]; label?: any; annotationsize?: number; min?: number; max?: number; reversed?: boolean; logarithmic?: boolean; axisticks?: any; gridticks?: any; histogram?: any | { visible?: boolean; color?: string; fillstyle?: geotoolkit.attributes.FillStyle|any; linestyle?: geotoolkit.attributes.LineStyle|any; bins?: number; } ; } ; z?: any | { datasource?: geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; autominmax?: boolean; data?: number[]; label?: any; annotationsize?: number; min?: number; max?: number; reversed?: boolean; logarithmic?: boolean; axisticks?: any; legendvisible?: boolean; } ; marker?: any | { painter?: geotoolkit.scene.shapes.painters.AbstractPainter; size?: number; defaultcolor?: string; defaultlinecolor?: string; highlightcolor?: string; highlightsize?: string; } ; tools?: any; } ): this;
            /**
             * get options
             * @param getDataOptions  (Required) how to extract data, null by default
             * @param getDataOptions.no-data  (Optional) in case of you will not get Array of X, Y and Z-data
             */
            getData(getDataOptions: any | { "no-data"?: boolean; } |any): any;
            /**
             * Sets specific non-data options for the visuals like header, marker color etc.
             * @param data  (Optional) options to apply
             * @param data.header  (Optional) JSON which defines header area
             * @param data.marker  (Optional) JSON which defines marker options
             * @param data.marker.painter  (Optional) painter style
             * @param data.marker.size  (Optional) marker size
             * @param data.marker.defaultcolor  (Optional) default color
             * @param data.marker.defaultlinecolor  (Optional) default line color
             * @param data.marker.highlightcolor  (Optional) highlight color
             * @param data.marker.highlightsize  (Optional) size of the highlighted markers
             * @param colorprovider  (Optional) defines the color provider for the markers.
             */
            setOptions(data?: any | { header?: any; marker?: any | { painter?: geotoolkit.scene.shapes.painters.AbstractPainter; size?: number; defaultcolor?: string; defaultlinecolor?: string; highlightcolor?: string; highlightsize?: string; } ; } , colorprovider?: geotoolkit.util.ColorProvider): this;
            /**
             * Gets visual options
             */
            getOptions(): {options:{header:{title:any;annotationsize:number};colorprovider:geotoolkit.util.ColorProvider;marker:{painter:geotoolkit.scene.shapes.painters.AbstractPainter;size:number;defaultcolor:string;defaultlinecolor:string;highlightcolor:string;highlightsize:string};tools:any}}|any;
            /**
             * Set marker Options
             * @param data  (Optional) JSON which defines marker options
             * @param data.painter  (Optional) painter style
             * @param data.size  (Optional) marker size
             * @param data.defaultcolor  (Optional) default color
             * @param data.defaultlinecolor  (Optional) default line color
             * @param data.highlightcolor  (Optional) highlight color
             * @param data.highlightsize  (Optional) highlight symbol size. it equals to symbols size by default
             */
            setMarkerOptions(data?: any | { painter?: geotoolkit.scene.shapes.painters.AbstractPainter; size?: number; defaultcolor?: string; defaultlinecolor?: string; highlightcolor?: string; highlightsize?: string; } ): this;
            /**
             * Get marker Options
             */
            getMarkerOptions(): {data:{painter:geotoolkit.scene.shapes.painters.AbstractPainter|string;size:number;defaultcolor:string;defaultlinecolor:string;highlightsize:number}}|any;
            /**
             * Set Options for Header
             * @param options  (Optional) JSON which defines header area
             * @param options.title  (Optional) JSON which defines main title. See {@link geotoolkit.attributes.TextStyle.setProperties} for details.
             * @param options.annotationsize  (Optional) height of header
             */
            setHeaderOptions(options?: any | { title?: any; annotationsize?: number; } ): this;
            /**
             * Get Options for Header
             */
            getHeaderOptions(): {data:{title:any;annotationsize:number}}|any;
            /**
             * Set Parameters for axis
             * @param axis  (Required) axis to apply ('x', 'y' or 'z')
             * @param data  (Optional) JSON which defines data.
             * @param data.data  (Optional) Array of data
             * @param data.datasource  (Optional) DataSource of data
             * @param data.unit  (Optional) display unit
             * @param data.autominmax  (Optional) are min/max fixed (false) or given by datasource (true). DataSource has to exist
             * @param data.label  (Optional) JSON which defines label. See {@link geotoolkit.attributes.TextStyle.setProperties} for details.
             * @param data.annotationsize  (Optional) width or height of annotation
             * @param data.min  (Optional) Minimum Value to display data. If never set, will be min of [options.data]
             * @param data.max  (Optional) Maximum Value to display data. If never set, will be max of [options.data]
             * @param data.neatlimits  (Optional) Calculate smart limits for linear mode. For logarithmic mode it is disabled
             * @param data.minspan  (Optional) axis min span for smart limits. It works if neatlimits is true
             * @param data.reversed  (Optional) Is the Axis reversed.
             * @param data.logarithmic  (Optional) Is the Axis logarithmic. default is false
             * @param data.tickgenerator  (Optional) a custom tickgenerator for this axis
             * @param data.axisticks  (Optional) JSON which defines ticks options of the axis. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
             * @param data.gridticks  (Optional) JSON which defines horizontal ticks options of the grid (X or Y axis only). See {@link geotoolkit.axis.TickGenerator.setOptions} for details
             * @param data.legendvisible  (Optional) legend visibility (Z only)
             * @param data.histogram  (Optional) JSON which defines histogram properties  (X or Y axis only)
             * @param data.histogram.visible  (Optional) Is the histogram visible (default is false)  (X or Y axis only)
             * @param data.histogram.color  (Optional) deprecated, rgba color to be used (X or Y axis only)
             * @param data.histogram.fillstyle  (Optional) fillstyle to be used (X or Y axis only)
             * @param data.histogram.linestyle  (Optional) linestyle to be used (X or Y axis only)
             * @param data.histogram.bins  (Optional) number of bins to be used (default is 25)  (X or Y axis only)
             * @param xplotData  (Optional) optional data
             */
            setAxisDataOptions(axis: string, data?: any | { data?: number[]; datasource?: geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView|any; unit?: geotoolkit.util.AbstractUnit|string|any; autominmax?: boolean; label?: any; annotationsize?: number; min?: number; max?: number; neatlimits?: boolean; minspan?: boolean; reversed?: boolean; logarithmic?: boolean; tickgenerator?: geotoolkit.axis.TickGenerator; axisticks?: any; gridticks?: any; legendvisible?: boolean; histogram?: any | { visible?: boolean; color?: string; fillstyle?: geotoolkit.attributes.FillStyle|any; linestyle?: geotoolkit.attributes.LineStyle|any; bins?: number; } ; } , xplotData?: any): this;
            /**
             * Get axis options
             * @param axis  (Required) axis to get options
             * @param getDataOptions  (Required) how to extract data, null by default
             * @param getDataOptions.no-data  (Optional) in case of you will not get Array of X, Y and Z-data
             */
            getAxisDataOptions(axis: string, getDataOptions: any | { "no-data"?: boolean; } |any): any;
            /**
             * Sets color provider
             * @param cp  (Optional) color provider
             * @param log  (Optional) flag to determine if it has been in logarithmic mode
             */
            setColorProvider(cp?: geotoolkit.util.ColorProvider, log?: boolean|any): this;
            /**
             * Returns color provider
             */
            getColorProvider(): geotoolkit.util.ColorProvider;
            /**
             * Gets Highlighted Indices
             * @param name  (Optional) name of the selection
             */
            getHighlightedIndices(name?: string): number[];
            /**
             * Highlights the selected area
             * @param rect  (Required) search area
             * @param reset  (Required) un-highlights previously selected indices
             */
            highlightArea(rect: geotoolkit.util.Point|geotoolkit.util.Rect, reset: boolean): any;
            /**
             * Highlights the selected indices
             * @param indices  (Required) to be highlighted
             * @param reset  (Required) un-highlights previously selected indices
             */
            highlightIndices(indices: number[]|any, reset: boolean): this;
            /**
             * Return indices in search area
             * @param rect  (Required) search area
             */
            getIndicesAt(rect: geotoolkit.util.Point|geotoolkit.util.Rect): number[];
            /**
             * Set Tools Options
             * See {@link geotoolkit.widgets.AnnotatedWidget.setToolsOptions} for details
             * @param options  (Required) tools options
             */
            setToolsOptions(options: any): this;
            /**
             * Switch on ColorBarCursorTool
             * @param symbolAlignment  (Optional) direction of symbol
             * @param offset  (Optional) offset
             * @param symbol  (Optional) symbol for colorbar cursor
             */
            switchOnCursorTool(symbolAlignment?: geotoolkit.controls.tools.ColorBarCursorTool.SymbolAlignment, offset?: number, symbol?: geotoolkit.scene.shapes.Symbol): this;
        }
        /**
         * The Histogram widget  is  an annotated widget that is specialized for histogram representations.It uses {@link geotoolkit.controls.shapes.Histogram} internally.
         * <p>
         * A histogram is a graphical display of tabulated frequencies, shown as bars. It shows what proportion of cases fall into each of several categories.
         * The categories are usually specified as non-overlapping intervals of some variable. The categories are adjacent. The intervals (or bands) should ideally be of the same size
         * </p>
         * <p>
         * </p>
         * <p>
         * The main way to configure and customize the widget is to use the different setOptions() function that provides a comprehensible way of changing the default look and feel of the widget.
         * This widget by default, allows horizontally zoom only.
         * </p>
         * <p>
         * It reuses the default tools provided by the AnnotatedWidget and customize them for histogram related operations.
         * <ul>
         * <li> rubberzoom: limits the zoom direction to horizontal only.</li>
         * <li> selection: Selects only histogram shapes but provides selected bin index </li>
         * </ul>
         * It also provides utility functions to highlight bin in a given range (or by index). The histogram widget can display and manage several histograms at once, overlapping them.
         * It also provides an 'accumulative' curve feature and can generate statistics.
         * </p>
         */
        class Histogram extends geotoolkit.widgets.AnnotatedWidget {
            /**
             * The Histogram widget  is  an annotated widget that is specialized for histogram representations.It uses {@link geotoolkit.controls.shapes.Histogram} internally.
             * <p>
             * A histogram is a graphical display of tabulated frequencies, shown as bars. It shows what proportion of cases fall into each of several categories.
             * The categories are usually specified as non-overlapping intervals of some variable. The categories are adjacent. The intervals (or bands) should ideally be of the same size
             * </p>
             * <p>
             * </p>
             * <p>
             * The main way to configure and customize the widget is to use the different setOptions() function that provides a comprehensible way of changing the default look and feel of the widget.
             * This widget by default, allows horizontally zoom only.
             * </p>
             * <p>
             * It reuses the default tools provided by the AnnotatedWidget and customize them for histogram related operations.
             * <ul>
             * <li> rubberzoom: limits the zoom direction to horizontal only.</li>
             * <li> selection: Selects only histogram shapes but provides selected bin index </li>
             * </ul>
             * It also provides utility functions to highlight bin in a given range (or by index). The histogram widget can display and manage several histograms at once, overlapping them.
             * It also provides an 'accumulative' curve feature and can generate statistics.
             * </p>
             * @param options  (Optional) 
             * @param options.bounds  (Optional) where to place the XPlot
             * @param options.border  (Optional) defines properties for widget outer border
             * @param options.border.color  (Optional) color of border
             */
            constructor(options?: any | { bounds?: geotoolkit.util.Rect; border?: any | { color?: any; } ; } );
            /**
             * Histogram Widget's Events enumerator
             */
            static Events: any;
            /**
             */
            dispose(): any;
            /**
             * Add a new histogram
             */
            protected addHistogram(): any;
            /**
             * @param index  (Optional) index of the histogram or active index.
             */
            protected getHistogram(index?: number|any): geotoolkit.controls.shapes.Histogram;
            /**
             * Initialize tools
             */
            protected initializeTools(): this;
            /**
             * update tools according to the orientation of widget
             */
            updateTools(): any;
            /**
             * get orientation
             */
            getOrientation(): geotoolkit.util.Orientation;
            /**
             * set orientation
             * @param orientation  (Required) orientation
             */
            setOrientation(orientation: geotoolkit.util.Orientation): this;
            /**
             * Sets options and/or data
             * @param data  (Optional) data
             * @param data.bounds  (Optional) bounds. See {@link geotoolkit.util.Rect.setProperties} for details.
             * @param data.header  (Optional) JSON which defines header area
             * @param data.header.title  (Optional) JSON which defines main title.
             * @param data.header.annotationsize  (Optional) height of header
             * @param data.datasource  (Optional) DataSource
             * @param data.autominmax  (Optional) are X min/max fixed (false) or given by datasource (true). DataSource has to exist
             * @param data.data  (Optional) Array of data
             * @param data.bins  (Optional) Number of bins
             * @param data.binspacing  (Optional) bin spacing in percentage
             * @param data.fillstyle  (Optional) Bins FillStyle. See {@link geotoolkit.attributes.FillStyle.setProperties} for details.
             * @param data.autogradient  (Optional) FillStyle autogradient
             * @param data.linestyle  (Optional) Bins LineStyle. See {@link geotoolkit.attributes.LineStyle} for details.
             * @param data.frequencytype  (Optional) Frequency Type
             * @param data.highlightcolor  (Optional) Color used to highlight bins
             * @param data.accumulation  (Optional) JSON for accumulation curve.
             * @param data.accumulation.visible  (Optional) Visibility of accumulation curve.
             * @param data.accumulation.linestyle  (Optional) JSON for accumulation curve.
             * @param data.x  (Optional) JSON which defines X-data.
             * @param data.x.label  (Optional) JSON which defines X-label.
             * @param data.x.annotationsize  (Optional) height of X-annotation
             * @param data.x.min  (Optional) Minimum X-Value to display X-data. If never set, will be min of [data.x.data]
             * @param data.x.max  (Optional) Maximum X-Value to display X-data. If never set, will be max of [data.x.data]
             * @param data.x.reversed  (Optional) Is the X-Axis reversed. If never set, will be true if [data.x.max]<[data.x.min]
             * @param data.x.axisticks  (Optional) JSON which defines ticks data of the X-axis. See {geotoolkit.axis.TickGenerator.setdata} for details
             * @param data.x.gridticks  (Optional) JSON which defines vertical ticks data of the grid. See {geotoolkit.axis.TickGenerator.setdata} for details
             * @param data.x.tickgenenerator  (Optional) a custom tick generator
             * @param data.y  (Optional) JSON which defines Y-data.
             * @param data.y.label  (Optional) JSON which defines Y-label.
             * @param data.y.annotationsize  (Optional) width of Y-annotation
             * @param data.y.annotationside  (Optional) specifies which side should have axes. By default 'both' means from left and right
             * @param data.y.min  (Optional) Minimum Y-Value to display Y-data. If never set, will be min of [data.y.data]
             * @param data.y.max  (Optional) Maximum Y-Value to display Y-data. If never set, will be max of [data.y.data]
             * @param data.y.reversed  (Optional) Is the Y-Axis reversed. If never set, will be true if [data.y.max]>[data.y.min]
             * @param data.y.axisticks  (Optional) JSON which defines ticks data of the Y-axis.
             * @param data.y.gridticks  (Optional) JSON which defines horizontal ticks data of the grid.
             * @param data.y.tickgenenerator  (Optional) a custom tick generator
             * @param data.tools  (Optional) JSON which defines tools data. See {@link geotoolkit.widgets.AnnotatedWidget.setToolsOptions} for details
             */
            setData(data?: any | { bounds?: any|geotoolkit.util.Rect; header?: any | { title?: any; annotationsize?: number; } ; datasource?: geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; autominmax?: boolean; data?: number[]; bins?: number; binspacing?: number; fillstyle?: any|geotoolkit.attributes.FillStyle; autogradient?: boolean; linestyle?: any|geotoolkit.attributes.LineStyle; frequencytype?: geotoolkit.controls.shapes.Histogram.FrequencyType|string; highlightcolor?: string; accumulation?: any | { visible?: boolean; linestyle?: any; } ; x?: any | { label?: any; annotationsize?: number; min?: number; max?: number; reversed?: boolean; axisticks?: any; gridticks?: any; tickgenenerator?: geotoolkit.axis.TickGenerator; } ; y?: any | { label?: any; annotationsize?: number; annotationside?: string; min?: number; max?: number; reversed?: boolean; axisticks?: any; gridticks?: any; tickgenenerator?: geotoolkit.axis.TickGenerator; } ; tools?: any; } ): this;
            /**
             * get options
             * @param getDataOptions  (Required) how to extract data, null by default
             * @param getDataOptions.no-data  (Optional) in case of you will not get Array of X-data and Y-data
             */
            getData(getDataOptions: any | { "no-data"?: boolean; } |any): any;
            /**
             * Set Options for Header
             * @param data  (Optional) JSON which defines header area
             * @param data.title  (Optional) JSON which defines main title.
             * @param data.annotationsize  (Optional) height of header
             */
            setHeaderOptions(data?: any | { title?: any; annotationsize?: number; } ): this;
            /**
             * Returns calculated statistics of values
             *      - Data samples count
             *      - min sample value
             *      - max sample value
             *      - average value
             *      - variance value
             *      - average deviation value
             *      - standard deviation value
             *      - skewness value
             *      - standard kurtosis value
             *      - Theoretical P10 value (centile)
             *      - Theoretical P50 value (centile)
             *      - Theoretical P90 value (centile)
             */
            getStatistics(): any[];
            /**
             * Maximum frequency
             */
            getMaxFrequency(): number;
            /**
             * Get lowest value
             */
            getMinValue(): number;
            /**
             * Get highest data value
             */
            getMaxValue(): number;
            /**
             * Get Options for Header
             */
            getHeaderOptions(): {data:{title:any;annotationsize:number}}|any;
            /**
             * Set Parameters for axis
             * @param axis  (Required) axis to apply ('x' or 'y')
             * @param data  (Optional) JSON which defines data.
             * @param data.label  (Optional) JSON which defines label.
             * @param data.annotationsize  (Optional) width or height of annotation
             * @param data.min  (Optional) Minimum Value to display data. If never set, will be min of [options.data]
             * @param data.max  (Optional) Maximum Value to display data. If never set, will be max of [options.data]
             * @param data.neatlimits  (Optional) Calculate smart limits
             * @param data.neatlimitscenteredonzero  (Optional) Center the smart limits on zero
             * @param data.reversed  (Optional) Is the Axis reversed.
             * @param data.axisticks  (Optional) JSON which defines ticks options of the axis. See {geotoolkit.axis.TickGenerator.setOptions} for details
             * @param data.gridticks  (Optional) JSON which defines horizontal ticks options of the grid. See {geotoolkit.axis.TickGenerator.setOptions} for details
             */
            setAxisDataOptions(axis: string, data?: any | { label?: any; annotationsize?: number; min?: number; max?: number; neatlimits?: boolean; neatlimitscenteredonzero?: boolean; reversed?: boolean; axisticks?: any; gridticks?: any; } ): this;
            /**
             * get axis options
             * @param axis  (Required) The name of the axis
             * @param getDataOptions  (Required) how to extract data, null by default
             * @param getDataOptions.no-data  (Optional) in case of you will not get Array of X-data and Y-data
             */
            getAxisDataOptions(axis: string, getDataOptions: any | { "no-data"?: boolean; } ): any;
            /**
             * on DataSource Axis change listener
             * @param event  (Required) DataObject event
             * @param src  (Required) data series
             * @param data  (Required) data
             */
            onAxisChanged(event: string, src: geotoolkit.data.DataSeries, data: any): this;
            /**
             * Gets Highlighted Bins
             */
            getHighlightedBins(): number[];
            /**
             * Highlights the selected area
             * @param rect  (Required) area
             * @param reset  (Required) un-highlights previously selected indices
             */
            highlightRange(rect: geotoolkit.util.Point|geotoolkit.util.Range, reset: boolean): any;
            /**
             * Highlights the selected indices
             * @param indices  (Required) to be highlighted
             * @param reset  (Required) un-highlights previously selected indices
             */
            highlightBins(indices: number[], reset: boolean): this;
            /**
             * Set Tools Options
             * See {@link geotoolkit.widgets.AnnotatedWidget.setToolsOptions} for details
             * @param options  (Optional) options
             */
            setToolsOptions(options?: any): this;
            /**
             * Load template
             * @param template  (Required) template to be applied to the widget
             * @param registry  (Optional) registry
             */
            loadTemplate(template: string, registry?: geotoolkit.persistence.Registry): any;
            /**
             * Save template
             * @param registry  (Optional) registry
             */
            saveTemplate(registry?: geotoolkit.persistence.Registry): string;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) JSON containing properties see {@link geotoolkit.widgets.AnnotatedWidget#setProperties}
             */
            setProperties(properties?: any): this;
        }
        /**
         * The multihistograms widget is a container to wrap multiple histograms into one widget
         * and mange axes, selection and model limits for different histograms.
         * see more details about initialization of  widget in constructor of geotoolkit.widgets.AnnotatedWidget
         */
        class MultiHistograms extends geotoolkit.widgets.AnnotatedWidget {
            /**
             * The multihistograms widget is a container to wrap multiple histograms into one widget
             * and mange axes, selection and model limits for different histograms.
             * see more details about initialization of  widget in constructor of geotoolkit.widgets.AnnotatedWidget
             * @param options  (Required) 
             * @param options.header  (Optional) options for setting header of widget, see {@link geotoolkit.widgets.MultiHistograms#setHeader}
             * @param options.axiswidth  (Optional) default width when adding new vertical axis
             * @param options.axisheight  (Optional) default height when adding new horizontal axis
             * @param options.annotationsgaps  (Optional) options for setting gaps between annotations and center model, see details in setGaps method
             * @param options.autoannotationsize  (Optional) auto modify the size of annotation based on the total size of component in the annotation
             * @param options.tools  (Optional) options for tools setting, see details in setToolsOptions method
             * @param options.annotationssizes  (Optional) JSON object container - Generated
             * @param options.annotationssizes.east  (Optional) JSON to hold east annotation size
             * @param options.annotationssizes.south  (Optional) JSON to hold south annotation size
             * @param options.annotationssizes.west  (Optional) JSON to hold west annotation size
             * @param options.annotationssizes.north  (Optional) JSON to hold north annotation size
             * @param options.bounds  (Optional) where to place the widget
             * @param options.border  (Optional) defines properties for widget outer border
             * @param options.border.color  (Optional) color of border border
             * @param options.viewcache  (Optional) if set veiwcache for the widget
             * @param options.viewcachesize  (Optional) viewcache size
             * @param options.viewcachesize.width  (Optional) set tiled cache size.
             * @param options.viewcachesize.height  (Optional) set tiled cache size.
             */
            constructor(options: any | { header?: any; axiswidth?: number; axisheight?: number; annotationsgaps?: any; autoannotationsize?: boolean; tools?: any; annotationssizes?: any | { east?: number; south?: number; west?: number; north?: number; } ; bounds?: geotoolkit.util.Rect; border?: any | { color?: any; } ; viewcache?: boolean; viewcachesize?: any | { width?: number; height?: number; } ; } );
            /**
             * enum for Events triggered by the Widget.
             */
            static Events: any;
            /**
             * return underlay layer for add new visual under histograms
             */
            getUnderlayLayer(): geotoolkit.scene.Group;
            /**
             * return overlay layer for add new visual in front of histograms
             */
            getOverlayLayer(): geotoolkit.scene.Group;
            /**
             * setup selection tool and scroll bar for annotations
             */
            initializeTools(): any;
            /**
             * create a new histogram with axes
             * @param options  (Required) options to set up histogram shape
             * @param axes  (Optional) 
             * @param axes.xaxis  (Optional) x axis for histogram, by default add axis with AdaptivetickGenerator, null means not add x axis
             * @param axes.yaxis  (Optional) y axis for histogram, by default add axis with HistogramTickGenerator, null means not add y axis
             * @param id  (Optional) id for identifying histogram and axis
             */
            addHistogram(options: any, axes?: any | { xaxis?: geotoolkit.axis.Axis|any; yaxis?: geotoolkit.axis.Axis|any; } , id?: string): geotoolkit.controls.shapes.Histogram;
            /**
             * remove histograms from widget
             * @param shapes  (Required) array of histograms
             */
            removeHistograms(shapes: geotoolkit.controls.shapes.Histogram[]|string[]|geotoolkit.controls.shapes.Histogram|string): this;
            /**
             * set if histograms can be highlighted
             * @param shapes  (Required) array of histograms
             * @param highlightable  (Required) if histograms are available for selection
             */
            setHighlightableHistograms(shapes: geotoolkit.controls.shapes.Histogram[]|string[]|geotoolkit.controls.shapes.Histogram|string, highlightable: boolean): this;
            /**
             * get highlightable histograms
             */
            getHighlightableHistograms(): geotoolkit.controls.shapes.Histogram[];
            /**
             * get selected bins in highlightable histograms
             * @param shapes  (Required) of histograms id or instance
             */
            getHighlightedBins(shapes: geotoolkit.controls.shapes.Histogram[]|string[]|geotoolkit.controls.shapes.Histogram|string): number[][];
            /**
             * get all histograms
             * @param returnId  (Required) instead return histograms instance, return Ids of histograms
             */
            getHistograms(returnId: boolean): geotoolkit.controls.shapes.Histogram[]|number[];
            /**
             * get all limits groupId
             */
            getGroupsId(): number[];
            /**
             * add title to annotation
             * @param location  (Optional) location of the axis
             * @param options  (Optional) 
             * @param options.text  (Optional) text to display in title
             * @param options.textstyle  (Optional) style
             * @param options.length  (Optional) width or height of title group
             */
            addTitle(location?: geotoolkit.layout.AnnotationLocation, options?: any | { text?: string; textstyle?: any|geotoolkit.attributes.TextStyle; length?: number; } ): {obj:{text:geotoolkit.scene.shapes.Text;group:geotoolkit.scene.Group}}|any;
            /**
             * create new axis with options, adding and connect it with object
             * @param location  (Required) location of annotation for adding new axis
             * @param options  (Required) 
             * @param options.length  (Optional) width or height of axis component
             * @param options.flip  (Optional) set if flip the axis
             * @param options.accumulative  (Optional) set if the axis serve for showing accumulative value in histogram accumulative mode
See geotoolkit.scene.AnnotatedNode.createAxis for other properties' definition.
             * @param connectedObject  (Optional) connected object of axis
             */
            addAxisTo(location: geotoolkit.layout.AnnotationLocation, options: any | { length?: number; flip?: boolean; accumulative?: boolean; } , connectedObject?: geotoolkit.scene.Node|geotoolkit.controls.shapes.Histogram|string): any;
            /**
             * internal method, remove axis instance from widget
             * @param axisRef  (Required) id or reference to identify axis
             */
            internalRemoveAxis(axisRef: geotoolkit.axis.Axis|string): this;
            /**
             * refer to axis based on histogram or group and remove the axis from widget
             * @param ref  (Required) id or reference to identify histogram or group related to the axis
             * @param location  (Required) location of axis
             */
            removeAxisFrom(ref: geotoolkit.controls.shapes.Histogram|string|any, location: geotoolkit.layout.AnnotationLocation): this|any;
            /**
             */
            dispose(): any;
            /**
             * event handler for bin number updating of histogram
             * @param event  (Required) 
             * @param src  (Required) 
             * @param data  (Required) 
             */
            onBinsUpdated(event: string, src: any, data: any): any;
            /**
             * add histograms to an existing group as new members
             * @param shapes  (Required) array of histograms or their id
             * @param groupRef  (Required) id string or object that contain groupid property
             */
            addHistogramsToGroup(shapes: geotoolkit.controls.shapes.Histogram[]|string[]|geotoolkit.controls.shapes.Histogram|string, groupRef: any|string): this|any;
            /**
             * remove histograms from all existing limits group
             * @param shapes  (Required) array of histograms or their id
             */
            removeHistogramsFromAllGroup(shapes: geotoolkit.controls.shapes.Histogram[]|string[]|geotoolkit.controls.shapes.Histogram|string): this;
            /**
             * remove histograms from an existing group
             * @param shapes  (Required) array of histograms or their id
             * @param groupRef  (Required) id string or object that contain groupid property
             */
            removeHistogramsFromGroup(shapes: geotoolkit.controls.shapes.Histogram[]|string[]|geotoolkit.controls.shapes.Histogram|string, groupRef: any|string): this|any;
            /**
             * create group in certain annotation(along certain axis) based on histograms
             * @param shapes  (Required) array of histograms
             * @param location  (Required) location of annotation that containing axis for limits group
             * @param axisOptions  (Optional) options to set up new axis. The default value of options would be the options get from the axis of one histogram in the group.
For details, see the internalAddAxis method.
             * @param gid  (Optional) group id
             */
            createGroup(shapes: geotoolkit.controls.shapes.Histogram[]|string[], location: geotoolkit.layout.AnnotationLocation, axisOptions?: any, gid?: string|any): {object:{groupid:string}}|any;
            /**
             * set properties of widget
             * @param props  (Required) see detail in setOptions method
             */
            setProperties(props: any): this;
            /**
             * set options for widget
             * @param options  (Required) 
             * @param options.header  (Optional) options for setting header of widget, see {@link geotoolkit.widgets.MultiHistograms#setHeader}
             * @param options.axiswidth  (Optional) default width when adding new vertical axis
             * @param options.axisheight  (Optional) default height when adding new horizontal axis
             * @param options.annotationsgaps  (Optional) options for setting gaps between annotations and center model, see details in setGaps method
             * @param options.autoannotationsize  (Optional) auto modify the size of annotation based on the total size of component in the annotation
             * @param options.tools  (Optional) options for tools setting, see details in setToolsOptions method
             */
            setOptions(options: any | { header?: any|geotoolkit.scene.shapes.Text; axiswidth?: number; axisheight?: number; annotationsgaps?: any; autoannotationsize?: boolean; tools?: any; } ): this;
            /**
             * get axis and related group options
             * @param ref  (Required) shape histogram reference or group reference for identifying the axis
             * @param location  (Required) location of the axis
             */
            getAxisOptions(ref: geotoolkit.controls.shapes.Histogram|string|any, location: geotoolkit.layout.AnnotationLocation): {options:{length:number;flip:boolean;accumulative:boolean}}|any;
            /**
             * set options of axis
             * @param ref  (Required) shape histogram reference or group reference for identifying the axis
             * @param location  (Required) location of the axis
             * @param options  (Required) axis options
             * @param options.tickgenerator  (Optional) tickgenOptions options to configure tickgenerator of axis, see setProperties method of related tickgenerator for details
             * @param options.length  (Optional) width of vertical axis or height of horizontal axis
             * @param options.flip  (Optional) check if flip the axis other params could be seen in the definition of axis setOptions methods
             */
            setAxisOptions(ref: geotoolkit.controls.shapes.Histogram|string|any, location: geotoolkit.layout.AnnotationLocation, options: any | { tickgenerator?: any; length?: number; flip?: boolean; } |any): this;
            /**
             * get properties of widget
             */
            getProperties(): {props:{header:any;axiswidth:number;axisheight:number;autoannotationsize:boolean;tools:{axisselection:any;southscroll:any}}}|any;
            /**
             * set header for widget
             * @param options  (Required) 
             * @param options.title  (Optional) object to describe the properties for header text.For details, see setProperties method of geotoolkit.scene.shapes.Text object
             */
            setHeader(options: any | { title?: any; } |geotoolkit.scene.shapes.Text): this;
            /**
             * get header options
             */
            getHeader(): geotoolkit.scene.shapes.Text;
            /**
             * set desired length for the axis
             * @param axisRef  (Required) id or reference to identify axis
             * @param length  (Required) desired width or height for the axis
             */
            setAxisWidthOrHeight(axisRef: geotoolkit.axis.Axis|string, length: number): this;
            /**
             * set up tools options
             * @param options  (Required) 
             * @param options.axisselection  (Optional) options for set up selection on axis, see details in setAxisSelection method
             * @param options.southscroll  (Optional) options for set up vertical scroll bar for south annotation, see details in setAnnotationsScrollBar method
             */
            setToolsOptions(options: any | { axisselection?: any; southscroll?: any; } ): this;
            /**
             * get tools options
             */
            getToolsOptions(): {props:{axisselection:any;southscroll:any}}|any;
            /**
             * set up options for axis selection
             * @param options  (Required) 
             * @param options.enabled  (Optional) flag to enable axis selection
             * @param options.highlightstyle  (Optional) fillstyle for background of axis
             */
            setAxisSelection(options: any | { enabled?: boolean; highlightstyle?: geotoolkit.attributes.FillStyle|any; } ): this;
            /**
             * get axis selection options
             */
            getAxisSelectionOptions(): {options:{enabled:boolean;highlightstyle:any}}|any;
            /**
             * set up options for annotation scroll bar
             * @param options  (Required) 
             * @param options.size  (Optional) height for horizontal scroll bar or width for vertical scroll bar
             * @param options.visible  (Optional) flag to set visibility of scroll bar
             * @param options.options  (Optional) properties for setting scroll bar
             * @param location  (Optional) location of annotation that containing axis for the group
             */
            setAnnotationsScrollBar(options: any | { size?: number; visible?: boolean; options?: any; } , location?: geotoolkit.layout.AnnotationLocation): this;
            /**
             * get scroll bar options
             */
            getAnnotationScrollBarOptions(): any;
            /**
             * set up gaps for annotations
             * @param options  (Required) 
             * @param options.south  (Optional) desired height for axis in south annotation
             * @param options.west  (Optional) desired width for axis in west annotation
             * @param options.east  (Optional) desired width for axis in east annotation
             */
            setGaps(options: any | { south?: number; west?: number; east?: number; } ): this;
            /**
             * remove group
             * @param groupRef  (Required) id string or object that contain groupid property
             */
            removeGroup(groupRef: any|string): this;
            /**
             * set visibility of histograms and related axis
             * @param shapes  (Required) array of histograms
             * @param visible  (Required) set the visibility of histogram and related axis
             */
            setHistogramsVisible(shapes: geotoolkit.controls.shapes.Histogram[]|string[]|geotoolkit.controls.shapes.Histogram|string, visible: boolean): this;
            /**
             * set properties of widget
             * @param props  (Required) see detail in setOptions method
             */
            setProperties(props: any): this;
            /**
             * unbind all group in certain location or all locations
             * @param location  (Required) location of annotation that containing axis for limits group
             */
            removeAllGroup(location: geotoolkit.layout.AnnotationLocation): this;
            /**
             * bring the shape in front of all other shapes and activate it
             * @param shape  (Required) the histogram need to be show on the top
             */
            setInFrontHistogram(shape: geotoolkit.controls.shapes.Histogram): this;
            /**
             * bring the group and the top shape in the group in front of all shapes and then activate it
             * @param groupRef  (Required) id string or object that contain groupid property
             */
            setInFrontGroup(groupRef: any|string): this;
            /**
             * Sets a new data model
             * @param data  (Required) data model set
             */
            setData(data: geotoolkit.data.DataSource): this;
            /**
             * returns data source
             */
            getData(): geotoolkit.data.DataSource;
            /**
             * Sets the data binding
             * @param binding  (Required) data binding
             * @param silent  (Optional) silent mode to forbid
             */
            setDataBinding(binding: geotoolkit.data.DataBinding, silent?: boolean): this;
            /**
             * Return the data binding
             */
            getDataBinding(): geotoolkit.data.DataBinding;
            /**
             * get histograms from bind group
             * @param groupRef  (Required) id string or object that contain groupid property
             * @param returnVisibleModel  (Required) the flag to determine if only return visible models
             * @param returnId  (Required) set if only return id of histogram instead of histogram instance
             */
            getRelatedHistogramsByGroup(groupRef: any|string, returnVisibleModel: boolean, returnId: boolean): geotoolkit.controls.shapes.Histogram[]|any;
            /**
             * get location of limits group
             * @param groupRef  (Required) id string or object that contain groupid property
             */
            getLocationOfGroup(groupRef: any|string): geotoolkit.layout.AnnotationLocation;
            /**
             * get the id of groups which histogram belong to
             * @param shape  (Required) the histogram in the group
             */
            getGroupIdByHistogram(shape: geotoolkit.controls.shapes.Histogram): any;
            /**
             * return visual(could be not real limit get from shape's getModelLimits method) model limits of histogram in widget
             * @param shape  (Required) histogram reference
             */
            getHistogramModelLimits(shape: geotoolkit.controls.shapes.Histogram|string): geotoolkit.util.Rect|any;
            /**
             * get the shared model limits of limits group
             * @param groupRef  (Required) id string or object that contain groupid property
             */
            getGroupModelLimits(groupRef: any|string): geotoolkit.util.Rect|any;
        }
        /**
         * This class holds the details of a visiblerange change event.
         * <br>
         * When such events occur, one could retrieve this from the event object and fetch some information from it.For example the newly visible range.
         */
        class VisibleRangeChangeEventArgs extends geotoolkit.controls.tools.BaseEventArgs {
            /**
             * This class holds the details of a visiblerange change event.
             * <br>
             * When such events occur, one could retrieve this from the event object and fetch some information from it.For example the newly visible range.
             * @param eventName  (Required) information about the events arguments
             * @param range  (Required) visible limits
             */
            constructor(eventName: string, range: geotoolkit.util.Range);
            /**
             * return visible limits
             */
            getVisibleRange(): geotoolkit.util.Range;
        }
        /**
         * This class holds the details of a selection change event.
         * You can access the id of the selected object using this object.
         */
        class SelectionChangeEventArgs extends geotoolkit.controls.tools.BaseEventArgs {
            /**
             * This class holds the details of a selection change event.
             * You can access the id of the selected object using this object.
             * @param eventName  (Required) information about the events arguments
             * @param id  (Required) 
             * @param type  (Optional) selection type ('line', 'fill', 'axis' or 'legend')
             */
            constructor(eventName: string, id: string|any, type?: string);
            /**
             * return selected id
             */
            getId(): string|any;
            /**
             * Gets selection type
             */
            getType(): string;
        }
        /**
         * The time series widget plots data points horizontally along a time axis. It inherits from BaseWidget.
         * Curves are added to the widget by calling the addCurve() function:
         * <ul>
         * <li> name -- curve name </li>
         * <li> uri -- unique dataset id </li>
         * <li> data -- geotoolkit.data.DataTableView </li>
         * <li> properties //visual properties </li>
         * </ul>
         * insertCurve() function is used to insert a curve at a particular position or order.<br>
         * setVisibleRange() can be used to set the visiblemodellimits programmatically <br>
         * In addition to plotting the data, the widget also supports fills via the addFill() function and annotations via addAnnotation() and addAnnotationLine() functions.
         * <br>
         * Configuring the various options of the widget can be achieved by calling setOptions().<br>
         * Selection is handled in the application by using the onSelectionChanged event.
         */
        class TimeSeriesWidget extends geotoolkit.widgets.BaseWidget {
            /**
             * The time series widget plots data points horizontally along a time axis. It inherits from BaseWidget.
             * Curves are added to the widget by calling the addCurve() function:
             * <ul>
             * <li> name -- curve name </li>
             * <li> uri -- unique dataset id </li>
             * <li> data -- geotoolkit.data.DataTableView </li>
             * <li> properties //visual properties </li>
             * </ul>
             * insertCurve() function is used to insert a curve at a particular position or order.<br>
             * setVisibleRange() can be used to set the visiblemodellimits programmatically <br>
             * In addition to plotting the data, the widget also supports fills via the addFill() function and annotations via addAnnotation() and addAnnotationLine() functions.
             * <br>
             * Configuring the various options of the widget can be achieved by calling setOptions().<br>
             * Selection is handled in the application by using the onSelectionChanged event.
             * @param options  (Optional) javascript object used to define properties (see setOptions for more details)
             */
            constructor(options?: any);
            /**
             * TimeseriesWidget events following example shows how user can subscribe to the events.
             */
            static Events: any;
            /**
             * LegendPosition
             */
            static LegendPosition: any;
            /**
             * FillDirection
             */
            static FillDirection: any;
            /**
             * FillType
             */
            static FillType: any;
            /**
             * ScrollBarType
             */
            static ScrollBarType: any;
            /**
             * Sets locale
             * @param locale  (Required) locale
             */
            setLocale(locale: geotoolkit.util.Locale): this;
            /**
             * Returns Current Locale
             */
            getLocale(): geotoolkit.util.Locale;
            /**
             * Initializes layout of this widget
             */
            initializeLayout(): geotoolkit.scene.Group;
            /**
             * Initializes default tools used by this widget
             */
            protected initializeTools(): this;
            /**
             * Select Curve By ID. The example shows the API for setting the selected curve in the TimeSeriesWidget. The widget will trigger the event TimeSeriesWidget.Events.onSelectionChanged, if the selection has changed.
             * @param id  (Required) (null to deselect)
             */
            selectCurveById(id: string): any;
            /**
             * Gets properties from this widget (same as getOptions)
             */
            getProperties(): any;
            /**
             * Gets options from this widget
             */
            getOptions(): any;
            /**
             * Sets Properties same as setOptions {@link geotoolkit.widgets.TimeSeriesWidget#setOptions}
             * @param options  (Required) JSON containing widget options see {@link geotoolkit.widgets.TimeSeriesWidget#setOptions}
             */
            setProperties(options: any): this;
            /**
             * Sets options
             * @param options  (Optional) JSON containing widget options
             * @param options.bounds  (Optional) bounds of the current widget
             * @param options.model  (Optional) Timeseries' center model limits can be specified using this option
             * @param options.automodellimitsmode  (Optional) automodellimits mode
             * @param options.alignaxis  (Optional) align axis
             * @param options.margin  (Optional) array of margins of this widget [top, right, bottom, left]
             * @param options.title  (Optional) JSON which defines title area
             * @param options.title.visible  (Optional) visibility of title text
             * @param options.title.height  (Optional) height of title
             * @param options.title.text  (Optional) title text
             * @param options.title.font  (Optional) title text font
             * @param options.title.color  (Optional) title text color
             * @param options.title.centered  (Optional) centers title text
             * @param options.title.padding  (Optional) array of padding for title text
             * @param options.legends  (Optional) JSON which defines legends area
             * @param options.legends.direction  (Optional) direction of legends (left-to-right, right-to-left)
             * @param options.legends.visible  (Optional) visibility of legends area
             * @param options.legends.position  (Optional) Outside/Inside model
             * @param options.legends.alignwithcentermodel  (Optional) aligns the legendcontainer with the centermodel when positioned outside
             * @param options.legends.height  (Optional) legends area height
             * @param options.legends.width  (Optional) if positioned inside, container width
             * @param options.legends.margintext  (Optional) legend text margin left and right
             * @param options.legends.marginbottom  (Optional) legends area bottom margin (outside only)
             * @param options.legends.autocolorlabel  (Optional) legend's text label color
             * @param options.legends.legendoptions  (Optional) JSON which defines legend options
             * @param options.legends.legendoptions.formatter  (Optional) represents the legend number formatter.
             * @param options.legends.legendoptions.margintext  (Optional) margin text
             * @param options.legends.legendoptions.font  (Optional) font
             * @param options.legends.legendoptions.height  (Optional) height
             * @param options.legends.legendoptions.internalpadding  (Optional) internal padding
             * @param options.legends.legendoptions.fixedwidth  (Optional) fixed width
             * @param options.legends.legendoptions.labelcolor  (Optional) label color
             * @param options.legends.legendoptions.linestyle  (Optional) linestyle
             * @param options.legends.legendoptions.fillstyle  (Optional) fillstyle
             * @param options.lastupdatedate  (Optional) JSON which defines last update date area
             * @param options.lastupdatedate.visible  (Optional) visibility of the last update date area
             * @param options.lastupdatedate.followcursor  (Optional) false means the last data time will be displayed and true means the cursor position data time will be displayed
             * @param options.lastupdatedate.font  (Optional) last update date text font
             * @param options.lastupdatedate.color  (Optional) last update date text color
             * @param options.lastupdatedate.formatter  (Optional) visible range text formatter
             * @param options.curvelimits  (Optional) JSON which defines curve limits area
             * @param options.curvelimits.visible  (Optional) visibility of curve limits area
             * @param options.curvelimits.margin  (Optional) curve limits area margin (top and bottom)
             * @param options.curvelimits.width  (Optional) width for each curve limits column
             * @param options.curvelimits.font  (Optional) curve limits text font
             * @param options.curveaxis  (Optional) JSON which defines curve axis
             * @param options.curveaxis.visible  (Optional) visibility of curve axis
             * @param options.curveaxis.autocoloraxis  (Optional) synchronize axis color with curve color
             * @param options.curveaxis.autocolorlabel  (Optional) synchronize axis and label color with curve color
             * @param options.curveaxis.titlevisible  (Optional) curve axis label visibility
             * @param options.curveaxis.textcolor  (Optional) curve axis label color
             * @param options.curveaxis.axiswidth  (Optional) curve axis and text width
             * @param options.curveaxis.font  (Optional) curve axis text font
             * @param options.curveaxis.tickgeneratoroptions  (Optional) JSON which defines tick generator options
             * @param options.curveaxis.tickgeneratoroptions.edge  (Optional) edge
             * @param options.curveaxis.tickgeneratoroptions.edge.tickvisible  (Optional) edge tick visibility
             * @param options.curveaxis.tickgeneratoroptions.edge.labelvisible  (Optional) edge label visibility
             * @param options.curveaxis.tickgeneratoroptions.major  (Optional) major
             * @param options.curveaxis.tickgeneratoroptions.major.tickvisible  (Optional) major tick visibility
             * @param options.curveaxis.tickgeneratoroptions.major.labelvisible  (Optional) major label visibility
             * @param options.curveaxis.tickgeneratoroptions.minor  (Optional) minor
             * @param options.curveaxis.tickgeneratoroptions.minor.tickvisible  (Optional) minor tick visibility
             * @param options.curveaxis.tickgeneratoroptions.minor.labelvisible  (Optional) minor label visibility
             * @param options.curvesymbol  (Optional) JSON which defines curve highlighting symbol
             * @param options.curvesymbol.visible  (Optional) visibility of curve highlighting symbol
             * @param options.curvesymbol.width  (Optional) curve highlighting symbol width
             * @param options.curvesymbol.height  (Optional) curve highlighting symbol height
             * @param options.curvesymbol.type  (Optional) curve highlighting symbol type, default is circle and available values are cross, diamond, plus, square, star and triangle
             * @param options.cursor  (Optional) JSON object container - Generated
             * @param options.cursor.linestyle  (Optional) defines linestyle for timeseries cursor tool
             * @param options.modelgrid  (Optional) JSON which contains 'horizontaltickgenerator' and 'verticaltickgenerator'
             * @param options.modelgrid.horizontaltickgenerator  (Optional) Horizontal tickgenerator for the model grid. (Horizontal reference curve takes precedence over this option). Default is an instance of geotoolkit.axis.AdaptiveTickGenerator
             * @param options.modelgrid.verticaltickgenerator  (Optional) Vertical tickgenerator for the model grid (default visibility of ticks is false). Default is an instance of geotoolkit.axis.AdaptiveDateTimeTickGenerator
             * @param options.modelgrid.horizontalvisibility  (Optional) JSON defining horizontal gridline visibility
             * @param options.modelgrid.verticalvisibility  (Optional) JSON defining vertical gridline visibility
             * @param options.modelaxis  (Optional) JSON which defines axis inside model
             * @param options.modelaxis.visible  (Optional) visiblility of the axis inside model
             * @param options.modelaxis.tickgenerator  (Optional) tick generator for the axis inside model
             * @param options.modelaxis.baselinestyle  (Optional) base linestyle for the model axis
             * @param options.southaxis  (Optional) JSON which defines south axis
             * @param options.southaxis.visible  (Optional) visibility of south axis
             * @param options.southaxis.height  (Optional) south axis height
             * @param options.southaxis.font  (Optional) south axis label font
             * @param options.southaxis.color  (Optional) south axis label color
             * @param options.southaxis.tickgenerator  (Optional) tick generator for south axis. Default is an instance of geotoolkit.axis.AdaptiveDateTimeTickGenerator
             * @param options.visiblerange  (Optional) JSON which defines visible range area
             * @param options.visiblerange.visible  (Optional) visibility of visible range area
             * @param options.visiblerange.height  (Optional) visible range area height
             * @param options.visiblerange.font  (Optional) visible range text font
             * @param options.visiblerange.color  (Optional) visible range text color
             * @param options.visiblerange.formatter  (Optional) visible range text formatter
             * @param options.intervalbuttons  (Optional) JSON which defines the interval buttons
             * @param options.intervalbuttons.visible  (Optional) visibility of the interval buttons
             * @param options.intervalbuttons.intervals  (Optional) JSON which defines the text and scale value of each interval button
             * @param options.scrolltonowbutton  (Optional) JSON which defines the now button
             * @param options.scrolltonowbutton.visible  (Optional) visibility of the now button
             * @param options.scrollbar  (Optional) JSON which defines scroll bar area
             * @param options.scrollbar.visible  (Optional) visibility of scroll bar area
             * @param options.scrollbar.type  (Optional) Advanced or Compact scrollbar
             * @param options.scrollbar.options  (Optional) Additional options to use for scrollbar (this depends on the options the specific scrollbar accepts)
             * @param options.scrollbar.height  (Optional) scroll bar area height
             * @param options.scrollbar.font  (Optional) scroll bar text font
             * @param options.scrollbar.color  (Optional) scroll bar text color
             * @param options.scrollbar.tickgenerator  (Optional) tick generator for scroll bar
             * @param options.scrollbar.formatter  (Optional) scroll bar text formatter
             * @param options.tooltips  (Optional) json defining tooltips
             * @param options.tooltips.visible  (Optional) tooltip visibility
             * @param options.tooltips.linestyle  (Optional) linestyle of tooltip box
             * @param options.tooltips.fillstyle  (Optional) fillstyle of tooltip box
             * @param options.tooltips.symbollinestyle  (Optional) border linestyle of tooltip symbol
             * @param options.tooltips.selectionradius  (Optional) radius of tooltip selection visibility
             * @param options.tooltips.tooltipoptions  (Optional) JSON which defines tooltip options
             * @param options.tooltips.tooltipoptions.formatter  (Optional) represents the tooltip number formatter.
             * @param options.tooltips.tooltipoptions.margintext  (Optional) margin text
             * @param options.tooltips.tooltipoptions.font  (Optional) font
             * @param options.tooltips.tooltipoptions.symbolsize  (Optional) symbol size
             * @param options.tooltips.tooltipoptions.internalpadding  (Optional) internal padding
             * @param options.tooltips.tooltipoptions.externalpadding  (Optional) external padding
             * @param options.tooltips.tooltipoptions.linestyle  (Optional) linestyle
             * @param options.tooltips.tooltipoptions.fillstyle  (Optional) fillstyle
             * @param options.tooltips.tooltipoptions.fixedwidth  (Optional) fixed width
             * @param options.tooltips.tooltipoptions.nanvisibility  (Optional) nan visibility
             * @param options.tooltips.tooltipoptions.formatdatahandler  (Optional) optional handler to prepare text, symbol and value
             * @param options.tooltips.tooltipoptions.index  (Optional) index options
             * @param options.tooltips.tooltipoptions.index.visible  (Optional) visibility of the index tooltip
             * @param options.tooltips.tooltipoptions.index.color  (Optional) symbol color
             * @param options.tooltips.tooltipoptions.index.symbol  (Optional) symbol shape
             * @param options.tooltips.tooltipoptions.index.name  (Optional) name of the index
             * @param options.tooltips.tooltipoptions.index.indextext  (Optional) index text
             * @param options.tooltips.tooltipoptions.index.unittext  (Optional) index unit
             * @param options.viewcache  (Optional) enable viewcache
             * @param options.cursorselectionlimit  (Optional) Threshold distance indevice space, from vertical cursor line to show symbol, update legend and show tooltip
             * @param options.timezone  (Optional) UTC or local time
             * @param options.selectionstrategy  (Optional) selection strategy to set
             */
            setOptions(options?: any | { bounds?: geotoolkit.util.Rect; model?: geotoolkit.scene.Group; automodellimitsmode?: boolean; alignaxis?: boolean; margin?: number[]; title?: any | { visible?: boolean; height?: number; text?: string; font?: string; color?: string; centered?: boolean; padding?: number[]; } ; legends?: any | { direction?: geotoolkit.layout.HorizontalPriorityLayout.Direction; visible?: boolean; position?: boolean; alignwithcentermodel?: number; height?: number; width?: number; margintext?: number; marginbottom?: number; autocolorlabel?: boolean; legendoptions?: any | { formatter?: geotoolkit.util.Format; margintext?: number; font?: string; height?: number; internalpadding?: number; fixedwidth?: number; labelcolor?: string; linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; } ; } ; lastupdatedate?: any | { visible?: boolean; followcursor?: boolean; font?: string; color?: string; formatter?: string|Function; } ; curvelimits?: any | { visible?: boolean; margin?: number; width?: number; font?: string; } ; curveaxis?: any | { visible?: boolean; autocoloraxis?: boolean; autocolorlabel?: boolean; titlevisible?: boolean; textcolor?: boolean; axiswidth?: number; font?: string; tickgeneratoroptions?: any | { edge?: any | { tickvisible?: boolean; labelvisible?: boolean; } ; major?: any | { tickvisible?: boolean; labelvisible?: boolean; } ; minor?: any | { tickvisible?: boolean; labelvisible?: boolean; } ; } ; } ; curvesymbol?: any | { visible?: boolean; width?: number; height?: number; type?: string; } ; cursor?: any | { linestyle?: geotoolkit.attributes.LineStyle; } ; modelgrid?: any | { horizontaltickgenerator?: geotoolkit.axis.TickGenerator; verticaltickgenerator?: geotoolkit.axis.TickGenerator; horizontalvisibility?: any; verticalvisibility?: any; } ; modelaxis?: any | { visible?: boolean; tickgenerator?: geotoolkit.axis.TickGenerator; baselinestyle?: geotoolkit.attributes.LineStyle; } ; southaxis?: any | { visible?: boolean; height?: number; font?: string; color?: string; tickgenerator?: geotoolkit.axis.TickGenerator; } ; visiblerange?: any | { visible?: boolean; height?: number; font?: string; color?: string; formatter?: string|Function; } ; intervalbuttons?: any | { visible?: boolean; intervals?: any; } ; scrolltonowbutton?: any | { visible?: boolean; } ; scrollbar?: any | { visible?: boolean; type?: geotoolkit.widgets.TimeSeriesWidget.ScrollBarType; options?: any; height?: number; font?: string; color?: string; tickgenerator?: geotoolkit.axis.TickGenerator; formatter?: string|Function; } ; tooltips?: any | { visible?: boolean; linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; symbollinestyle?: geotoolkit.attributes.LineStyle; selectionradius?: number; tooltipoptions?: any | { formatter?: geotoolkit.util.Format; margintext?: number; font?: string; symbolsize?: number; internalpadding?: number; externalpadding?: number; linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; fixedwidth?: number|any; nanvisibility?: boolean; formatdatahandler?: Function; index?: any | { visible?: boolean; color?: string|geotoolkit.util.RgbaColor; symbol?: geotoolkit.scene.shapes.Symbol; name?: string; indextext?: string; unittext?: string; } ; } ; } ; viewcache?: boolean; cursorselectionlimit?: number; timezone?: number; selectionstrategy?: Function; } ): this;
            /**
             * Gets all curves id
             */
            getCurves(): string[];
            /**
             * Get TimeSeriesObject by id
             * @param id  (Required) timeseries object id
             */
            getTimeSeriesObjectById(id: string): geotoolkit.widgets.timeseries.TimeSeriesObject|any;
            /**
             * retrieve data element with specified id
             * @param id  (Required) specified id of data element
             */
            getDataById(id: string): geotoolkit.data.DataTable|geotoolkit.data.DataTableView|any;
            /**
             * Adds a curve to the widget
             * @param name  (Required) curve name or JSON object containing all parameters
             * @param uri  (Required) curve uri
             * @param data  (Optional) geotoolkit.data.DataTableView object for this curve
             * @param properties  (Optional) JSON object can be accepted by function setCurveProperties()
             * @param properties.id  (Optional) curve id
             * @param properties.autoscale  (Optional) true if curve in auto-scaling mode
             * @param properties.min  (Optional) curve min value
             * @param properties.max  (Optional) curve max value
             * @param properties.value  (Optional) current value
             * @param properties.unit  (Optional) unit string
             * @param properties.linestyle  (Optional) curve line style
             * @param properties.curvevisible  (Optional) curve visibility
             * @param properties.markervisible  (Optional) curve marker visibility
             * @param properties.marker  (Optional) marker properties
             * @param properties.decimationSpacing  (Optional) spacing of markers
             * @param properties.spline  (Optional) spline mode
             * @param properties.values  (Optional) display values
             * @param properties.axisvisible  (Optional) curve axis visibility
             * @param properties.axisposition  (Optional) curve axis position 'left'/'right'
             * @param properties.name  (Optional) curve name
             * @param properties.axisautolabelrotation  (Optional) auto label rotation in curve axis
             */
            addCurve(name: string|any, uri: string, data?: geotoolkit.data.DataTableView, properties?: any | { id?: string|geotoolkit.widgets.timeseries.TimeSeriesObject; autoscale?: boolean; min?: number; max?: number; value?: number; unit?: string; linestyle?: geotoolkit.attributes.LineStyle; curvevisible?: boolean; markervisible?: boolean; marker?: any; decimationSpacing?: any; spline?: boolean; values?: boolean; axisvisible?: boolean; axisposition?: string; name?: string; axisautolabelrotation?: boolean; } ): string;
            /**
             * Inserts a curve to the widget at a desired position.
             * @param name  (Required) curve name or JSON object containing all parameters
             * @param uri  (Required) dataset uri
             * @param data  (Optional) geotoolkit.data.DataTableView object for this curve
             * @param properties  (Optional) JSON object can be accepted by function setCurveProperties()
             * @param properties.id  (Optional) curve id
             * @param properties.autoscale  (Optional) true if curve in auto-scaling mode
             * @param properties.min  (Optional) curve min value
             * @param properties.max  (Optional) curve max value
             * @param properties.value  (Optional) current value
             * @param properties.unit  (Optional) unit string
             * @param properties.linestyle  (Optional) curve line style
             * @param properties.curvevisible  (Optional) curve visibility
             * @param properties.markervisible  (Optional) curve marker visibility
             * @param properties.marker  (Optional) curve marker properties
             * @param properties.decimationSpacing  (Optional) spacing of markers
             * @param properties.spline  (Optional) spline mode
             * @param properties.values  (Optional) display values
             * @param properties.axisvisible  (Optional) curve axis visibility
             * @param properties.axisposition  (Optional) curve axis position 'left'/'right'
             * @param properties.name  (Optional) curve name
             * @param properties.axisautolabelrotation  (Optional) auto label rotation in curve axis
             * @param properties.microposition  (Optional) microposition limits
             * @param properties.microposition.top  (Optional) upper bound of microposition (range from 0 to 1)
             * @param properties.microposition.bottom  (Optional) lower bound of microposition (range from 0 to 1)
             * @param position  (Optional) desired position of curve in TimeSeriesWidget.getCurves()
             * @param id  (Optional) desired id of curve, defaults to uri if unspecified
             */
            insertCurve(name: string|any, uri: string, data?: geotoolkit.data.DataTableView, properties?: any | { id?: string|geotoolkit.widgets.timeseries.TimeSeriesObject; autoscale?: boolean; min?: number; max?: number; value?: number; unit?: string; linestyle?: geotoolkit.attributes.LineStyle; curvevisible?: boolean; markervisible?: boolean; marker?: any; decimationSpacing?: any; spline?: boolean; values?: boolean; axisvisible?: boolean; axisposition?: string; name?: string; axisautolabelrotation?: boolean; microposition?: any | { top?: number; bottom?: number; } ; } , position?: number, id?: string): string;
            /**
             * Adds an array of curves
             * @param curves  (Required) Array of JSON objects containing curve definitions
             */
            addCurves(curves: any[]): string[]|number;
            /**
             * Inserts an array of curves
             * @param curves  (Required) Array of JSON objects containing curve definitions
             */
            insertCurves(curves: any[]): string[]|number;
            /**
             * Associates the horizontal grid with a curve.
             * If null is passed in or curve is not found, it defaults to the first curve
             * @param curveId  (Required) unique curve id
             */
            setHorizontalGridCurveReference(curveId: string): this;
            /**
             * Add a fill to a curve(id1)
             * @param id1  (Required) (From curve)
             * @param id2  (Required) (To curve/referenceline/null)
             * @param fillStyle  (Required) the fill style
             * @param fillType  (Required) fill type
             * @param fillDirection  (Required) Direction of the fill
             */
            addFill(id1: string, id2: string|number|any, fillStyle: geotoolkit.attributes.FillStyle|string|any, fillType: geotoolkit.widgets.TimeSeriesWidget.FillType, fillDirection: geotoolkit.widgets.TimeSeriesWidget.FillDirection): any;
            /**
             * Removes a fillstyle associated with a curve in a specific direction
             * @param curveId  (Required) curve id for which fillstyle is to be removed
             * @param filldirection  (Required) direction of the fill
             */
            removeCurveFill(curveId: string, filldirection: geotoolkit.widgets.TimeSeriesWidget.FillDirection): any;
            /**
             * Gets both top and bottom fillstyles associated with curve
             * @param curveId  (Required) unique curve id
             */
            getCurveFills(curveId: string): any|any;
            /**
             * Get the fill style associated with a curve in a specific direction
             * @param curveId  (Required) unique curve id
             * @param filldirection  (Required) direction on the fill
             */
            getCurveFillStyle(curveId: string, filldirection: geotoolkit.widgets.TimeSeriesWidget.FillDirection): any|geotoolkit.attributes.FillStyle;
            /**
             * Removes a curve
             * @param id  (Required) array of curve ids
             */
            removeCurve(id: string|string[]): this;
            /**
             * Gets properties of a curve
             * @param id  (Required) id of the curve to get properties
             */
            getCurveProperties(id: string): any|any;
            /**
             * Sets properties of a curve. The parameters can be either a single JSON object or individual parameters.
             * @param id  (Optional) curve id
             * @param autoscale  (Optional) true if curve in auto-scaling mode
             * @param min  (Optional) curve min value
             * @param max  (Optional) curve max value
             * @param value  (Optional) current value
             * @param unit  (Optional) unit string
             * @param linestyle  (Optional) curve line style
             * @param curvevisible  (Optional) curve visibility
             * @param symbolvisible  (Optional) curve symbol visibility
             * @param axisvisible  (Optional) curve axis visibility
             * @param axisposition  (Optional) curve axis position 'left'/'right'
             * @param name  (Optional) curve name
             * @param axisautolabelrotation  (Optional) auto label rotation in curve axis
             */
            setCurveProperties(id?: string|geotoolkit.widgets.timeseries.TimeSeriesObject, autoscale?: boolean, min?: number, max?: number, value?: number, unit?: string, linestyle?: geotoolkit.attributes.LineStyle, curvevisible?: boolean, symbolvisible?: boolean, axisvisible?: boolean, axisposition?: string, name?: string, axisautolabelrotation?: boolean): this;
            /**
             * Rebuilds all layers
             */
            rebuildLayers(): this;
            /**
             * Gets the model range
             */
            getRange(): geotoolkit.util.Range;
            /**
             * Sets the model range
             * @param range  (Required) the model range
             */
            setRange(range: geotoolkit.util.Range): this;
            /**
             * Gets the visible model range
             */
            getVisibleRange(): geotoolkit.util.Range;
            /**
             * Sets the visible model range
             * If the range is less than 1ms the range will be expanded and applied within the model's range
             * If the model's limits are less than the minimum range, the range will be set to the model's limits
             * @param range  (Required) visible model range
             */
            setVisibleRange(range: geotoolkit.util.Range): this;
            /**
             * Translates widget's contents
             * @param dx  (Required) x translate
             */
            translateModel(dx: number): this;
            /**
             * Scale widget's contents
             * @param scaleX  (Required) x scale factor
             */
            scaleModel(scaleX: number): this;
            /**
             * Zoom in with default factor
             */
            zoomIn(): this;
            /**
             * Zoom out with default factor
             */
            zoomOut(): this;
            /**
             * Fits bounds to model limits
             */
            fitToBounds(): this;
            /**
             * Add Annotation Line
             * @param options  (Required) JSON for annotation properties
             * @param options.point  (Optional) Location of the annotation. (X = position of line, Y = normalized vertical position of text)
             * @param options.text  (Optional) The 'header' text for the annotation line
             * @param options.textvisible  (Optional) visibility of the text
             * @param options.linevisible  (Optional) visibility of the line
             * @param options.linestyle  (Optional) Linestyle of the annotation line
             * @param options.fillstyle  (Optional) Background Fillstyle of the text
             * @param options.textstyle  (Optional) Textstyle of the text
             * @param options.alignment  (Optional) Anchor position of the text
             * @param options.angle  (Optional) angle
             */
            addAnnotationLine(options: any | { point?: geotoolkit.util.Point; text?: string; textvisible?: boolean; linevisible?: boolean; linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; textstyle?: geotoolkit.attributes.TextStyle; alignment?: geotoolkit.util.AnchorType; angle?: number; } ): string;
            /**
             * Remove annotation line
             * @param id  (Required) annotation id
             */
            removeAnnotationLine(id: string): this;
            /**
             * Edit annotation line
             * @param id  (Required) annotation id
             * @param options  (Required) JSON for annotation options
             * @param options.point  (Optional) point
             * @param options.text  (Optional) text
             * @param options.textvisible  (Optional) text visibility
             * @param options.linevisible  (Optional) line visibility
             * @param options.linestyle  (Optional) linestyle
             * @param options.fillstyle  (Optional) fillstyle
             * @param options.textstyle  (Optional) textstyle
             * @param options.alignment  (Optional) alignment
             * @param options.angle  (Optional) angle
             */
            editAnnotationLine(id: string, options: any | { point?: geotoolkit.util.Point; text?: string; textvisible?: boolean; linevisible?: boolean; linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; textstyle?: geotoolkit.attributes.TextStyle; alignment?: geotoolkit.util.AnchorType; angle?: number; } ): string;
            /**
             * add an Annotation object at the specific point : [curveid, time]
             * note: it will try to find the nearest point at the specific time.
             * @param options  (Required) json object that represents the annotation options
             * @param options.curveid  (Required) curve id to match the poi
             * @param options.time  (Required) time index in model space
             * @param options.label  (Optional) annotation text
             * @param options.textstyle  (Optional) text style of the annotation
             * @param options.textbackground  (Optional) background of the annotation label
             * @param options.symbol  (Optional) annotation symbol type
             * @param options.linestyle  (Optional) symbol line style
             * @param options.fillstyle  (Optional) symbol fill style
             * @param options.symbolsize  (Optional) symbol size width and height
             */
            addAnnotation(options: any | { curveid?: string; time?: number; label?: string; textstyle?: geotoolkit.attributes.TextStyle; textbackground?: geotoolkit.attributes.FillStyle; symbol?: string; linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; symbolsize?: number; } ): string|any;
            /**
             * @param id  (Required) annotation id
             * @param options  (Required) annotation options
             */
            editAnnotation(id: string, options: any): string;
            /**
             * remove annotation with the specified id.
             * @param id  (Required) of the annotation to remove
             */
            removeAnnotation(id: string): this;
            /**
             * Gets properties of the annotation line
             * @param id  (Required) id of annotation line to get properties
             */
            getAnnotationLineProperties(id: string): any;
            /**
             * Gets properties of the annotation
             * @param id  (Required) id of annotation line to get properties
             */
            getAnnotationProperties(id: string): any;
            /**
             * @param curve  (Required) id of curve to re-ordered
             * @param order  (Required) type of node re-ordering
             * @param anchor  (Optional) id of anchor for re-ordering
             */
            changeVisualOrder(curve: string, order: geotoolkit.scene.CompositeNode.NodeOrder, anchor?: string): this;
            /**
             * Add a time series group, which shares axis and limits only
             * @param id  (Required) group id
             * @param id.curveids  (Optional) curve ids
             * @param id.min  (Optional) min
             * @param id.max  (Optional) max
             * @param id.options  (Optional) See TimeSeriesObject axis options
             */
            createGroup(id: string|any | { curveids?: string[]; min?: number; max?: number; options?: any; } ): string|any;
            /**
             * Remove a timeseries group
             * @param groupid  (Required) group id
             */
            removeGroup(groupid: string): this;
            /**
             * Get TimeSeriesObjectGroup by ID
             * @param groupid  (Required) group id
             */
            getGroupById(groupid: string): geotoolkit.widgets.timeseries.TimeSeriesObjectGroup|any;
            /**
             * Returns visual layer
             */
            getVisualFrontLayer(): geotoolkit.scene.Group;
            /**
             * Returns visual layer
             */
            getVisualBackLayer(): geotoolkit.scene.Group;
            /**
             * Returns overlay layer
             */
            getOverlayLayer(): geotoolkit.scene.Group;
            /**
             * Exports the widget content as a PDF file
             * @param options  (Optional) PDF options
             * @param options.header  (Optional) an optional PDF header
             * @param options.footer  (Optional) an optional PDF footer
             * @param options.output  (Optional) define optional output filename
             * @param options.save  (Optional) flag to save the pdf directly to file or open dialog
             * @param options.printsettings  (Optional) define optional paper and export parameters
             * @param options.printsettings.paperformat  (Optional) define optional paper paper format
             * @param options.printsettings.top  (Optional) define optional top margin
             * @param options.printsettings.bottom  (Optional) define optional bottom margin
             * @param options.printsettings.left  (Optional) define optional left margin
             * @param options.printsettings.right  (Optional) define optional top margin
             * @param options.printsettings.orientation  (Optional) define optional paper orientation
             * @param options.printsettings.scaling  (Optional) define optional scaling mode. Specify ( 'scaling': geotoolkit.scene.exports.ScalingOptions.FitWidth,) to fit all tracks in your page width.
             * @param options.printsettings.keepaspectratio  (Optional) keep aspect ratio
             * @param options.printsettings.continuous  (Optional) continuous printing
             * @param options.printsettings.drawwesttoeast  (Optional) draw pages from West to East. For continuous printing set drawwesttoeast = false
             * @param options.limits  (Optional) export depth or time limits
             * @param options.limits.start  (Optional) start limit by default visible limits
             * @param options.limits.end  (Optional) end limit by default visible limits
             * @param options.scale  (Optional) export scale from model index unit to pixels by default as is
             * @param options.imagecompression  (Optional) JSON object container - Generated
             * @param options.imagecompression.speed  (Optional) speed referring to the png compression speed, available  for png mode only.
             * @param options.streamcompression  (Optional) enable or disable pdf output compression
             * @param options.pdfstream  (Optional) optional user-customized Stream object
             */
            exportToPDF(options?: any | { header?: geotoolkit.scene.exports.HeaderComponent; footer?: geotoolkit.scene.exports.FooterComponent; output?: string; save?: boolean; printsettings?: any | { paperformat?: any; top?: number; bottom?: number; left?: number; right?: number; orientation?: string; scaling?: string; keepaspectratio?: boolean; continuous?: boolean; drawwesttoeast?: boolean; } ; limits?: any | { start?: any; end?: any; } ; scale?: number; imagecompression?: any | { speed?: geotoolkit.pdf.SpeedCompression; } ; streamcompression?: boolean; pdfstream?: geotoolkit.util.stream.Stream; } ): geotoolkit.util.Promise;
            /**
             * Dispose
             */
            dispose(): any;
        }
        /**
         * A table view displays a list of items in a single column and allows users to scroll through the table. The data is either passed by a data object or a function.
         * The widget can be customized using options() in the constructor.<br>
         * Some of the default tools are available to support:
         * <ul>
         *  <li>Horizontal Scrollbar</li>
         *  <li>Vertical Scrollbar</li>
         *  <li>Panning Listener</li>
         *  <li>Tableview Highlight</li>
         *  <li>Tableview Selection</li>
         * </ul>
         * The widget can be customized using options() in the constructor. <br>
         */
        class TableView extends geotoolkit.widgets.AnnotatedWidget {
            /**
             * A table view displays a list of items in a single column and allows users to scroll through the table. The data is either passed by a data object or a function.
             * The widget can be customized using options() in the constructor.<br>
             * Some of the default tools are available to support:
             * <ul>
             *  <li>Horizontal Scrollbar</li>
             *  <li>Vertical Scrollbar</li>
             *  <li>Panning Listener</li>
             *  <li>Tableview Highlight</li>
             *  <li>Tableview Selection</li>
             * </ul>
             * The widget can be customized using options() in the constructor. <br>
             * @param options  (Optional) the json object
             * @param options.rows  (Optional) rows
             * @param options.cols  (Optional) columns
             * @param options.fixedsize  (Optional) performance hint for table view
             * @param options.bounds  (Optional) bounds
             * @param options.border  (Optional) defines properties for widget outer border
             * @param options.border.color  (Optional) color of border border
             */
            constructor(options?: any | { rows?: number; cols?: number; fixedsize?: boolean; bounds?: geotoolkit.util.Rect; border?: any | { color?: any; } ; } );
            /**
             * TableView's Events enumerator
             */
            static Events: any;
            /**
             * returns a real size of columns
             * @param column  (Optional) column index
             */
            getColumnsSize(column?: number): number;
            /**
             * Set column width
             * @param column  (Required) column to set the size for, -1 for the index column
             * @param width  (Required) width or size for the column
             */
            setColumnsSize(column: number, width: number): this;
            /**
             * Resize all column widths to fit to visible table width
             * @param distributeColumnsEvenly  (Optional) evenly flag
             */
            fitToWidth(distributeColumnsEvenly?: boolean): this;
            /**
             * Returns a real size of rows
             */
            getRowsSize(): number;
            /**
             * Sets bounds of the node in the parent coordinates
             * @param bounds  (Required) bound of the node in the parent coordinates
             */
            setBounds(bounds: geotoolkit.util.Rect|any): this;
            /**
             * Returns base shape
             */
            getTableViewShape(): geotoolkit.controls.shapes.TableView;
            /**
             * Set bounds for table in rows, columns
             * @param rows  (Required) bounds for table in rows
             * @param columns  (Required) bounds for table in columns
             */
            setTableBounds(rows: number, columns: number): this;
            /**
             * Returns table bounds
             */
            getTableBounds(): geotoolkit.util.Rect;
            /**
             * Returns table size in column, row count
             */
            getTableSize(): geotoolkit.util.Dimension;
            /**
             * Returns table limits in column, row size
             */
            getVisibleTableLimits(): geotoolkit.util.Rect;
            /**
             * Set visible table limits to specific position in column, row
             * @param row  (Required) table limits to specific position in row
             * @param column  (Required) table limits to specific position in column
             */
            setVisibleTableLimits(row: number, column: number): this;
            /**
             * set data and properties of the tableview widget.
             * @param data  (Required) the data object
             * @param data.indextitle  (Optional) JSON to set index title - see {geotoolkit.controls.shapes.TableView.setIndexTitle}
             * @param data.indexvisible  (Optional) value to set index column visibility
             * @param data.fixedsize  (Optional) performance hint for table view
             * @param data.contentmeasure  (Optional) JSON setting table view content measurer - see {geotoolkit.controls.shapes.TableView.setContentMeasure}
             * @param data.contentprepare  (Optional) JSON setting table view content preparer - see {geotoolkit.controls.shapes.TableView.setContentPrepare}
             * @param data.contentprovider  (Optional) JSON setting table view content provider - see {geotoolkit.controls.shapes.TableView.setContentProvider}
             * @param data.headerprovider  (Optional) JSON setting table view header provider - see {geotoolkit.controls.shapes.TableView.setHeaderProvider}
             * @param data.indexprepare  (Optional) JSON setting table view index preparer - see {geotoolkit.controls.shapes.TableView.setIndexPrepare}
             * @param data.indexprovider  (Optional) JSON setting table view index provider - see {geotoolkit.controls.shapes.TableView.setIndexProvider}
             * @param data.markerprovider  (Optional) JSON setting table view marker provider - see {geotoolkit.controls.shapes.TableView.setMarkerProvider}
             * @param data.header  (Optional) json defining header style
             * @param data.header.gridstyle  (Optional) Grid style
             * @param data.header.textstyle  (Optional) Text style
             * @param data.header.headerfillstyle  (Optional) Header fill style
             * @param data.content  (Optional) json defining content style
             * @param data.content.gridstyle  (Optional) Grid style
             * @param data.content.textstyle  (Optional) Text style
             * @param data.content.oddfillstyle  (Optional) Odd row style
             * @param data.content.evenfillstyle  (Optional) Even row style
             * @param data.index  (Optional) json defining index style
             * @param data.index.gridstyle  (Optional) Grid style
             * @param data.index.textstyle  (Optional) Text style
             * @param data.index.oddfillstyle  (Optional) Odd row style
             * @param data.index.evenfillstyle  (Optional) Even row style
             * @param data.index.markerfillstyle  (Optional) Marker fill style
             * @param data.index.markerlinestyle  (Optional) Marker line style
             * @param data.highlightfillstyle  (Optional) Highlight style
             * @param data.bounds  (Optional) Bounds
             * @param data.rows  (Optional) Table view row count
             * @param data.cols  (Optional) Table view column count
             * @param data.defaultcellsize  (Optional) Default cell dimensions
             */
            setData(data: any | { indextitle?: string; indexvisible?: boolean; fixedsize?: boolean; contentmeasure?: any|Function; contentprepare?: any|Function; contentprovider?: any|Function; headerprovider?: any|Function; indexprepare?: any|Function; indexprovider?: any|Function; markerprovider?: any|Function; header?: any | { gridstyle?: geotoolkit.attributes.LineStyle; textstyle?: geotoolkit.attributes.TextStyle; headerfillstyle?: geotoolkit.attributes.FillStyle; } ; content?: any | { gridstyle?: geotoolkit.attributes.LineStyle; textstyle?: geotoolkit.attributes.TextStyle; oddfillstyle?: geotoolkit.attributes.FillStyle; evenfillstyle?: geotoolkit.attributes.FillStyle; } ; index?: any | { gridstyle?: geotoolkit.attributes.LineStyle; textstyle?: geotoolkit.attributes.TextStyle; oddfillstyle?: geotoolkit.attributes.FillStyle; evenfillstyle?: geotoolkit.attributes.FillStyle; markerfillstyle?: geotoolkit.attributes.FillStyle; markerlinestyle?: geotoolkit.attributes.LineStyle; } ; highlightfillstyle?: geotoolkit.attributes.FillStyle; bounds?: geotoolkit.util.Rect; rows?: number; cols?: number; defaultcellsize?: geotoolkit.util.Dimension; } ): this;
            /**
             * Main method of scrolling the table view
             * @param dx  (Required) relative change in x coordinate
             * @param dy  (Required) relative change in y coordinate
             */
            translateTable(dx: number, dy: number): this;
            /**
             * Select row index for highlighting
             * @param row  (Required) row index for highlighting
             * @param autoScroll  (Required) by default is true
             */
            highlightRow(row: number, autoScroll: boolean|any): this;
            /**
             * Return highlighted row index
             */
            getHighlightedRow(): number;
            /**
             * Set active row index
             * @param rows  (Required) active row index
             * @param autoScroll  (Required) by default is true
             */
            setActiveRow(rows: number[]|number|any, autoScroll: boolean|any): this;
            /**
             * Return active row index
             */
            getActiveRow(): number;
            /**
             * Return active rows as array index
             */
            getActiveRows(): number[];
            /**
             * Select column index for highlighting
             * @param column  (Required) column index for highlighting
             */
            highlightColumn(column: number): this;
            /**
             * Return highlighted column index
             */
            getHighlightedColumn(): number;
            /**
             * Horizontal Scrollbar
             * Vertical Scrollbar
             * Panning Listener
             * Table Row Highlighting
             */
            protected initializeTools(): this;
        }
        /**
         * The barchart widget is an annotated widget that is specialized for bar charts representation
         * <p>
         * A bar chart is a chart that uses either horizontal or vertical bars to show comparisons among categories.
         * One axis of the chart shows the specific categories being compared, and the other axis represents a discrete value.
         * It uses {@link geotoolkit.controls.shapes.BarChart} internally
         * </p>
         * <p>
         * Barchart widget inherits from AnnotatedWidget, so it takes most of its functionality including all its tools.
         * The main way to configure and customize the widget is to use the different setData() and setOptions() functions
         * that provide a comprehensible way of changing the default look and feel of the widget.
         * <ul>
         * <li> setData() will pass through everything to the {@link geotoolkit.controls.shapes.BarChart}'s "setData" for the internal shape.</li>
         * <li> setOptions() will pass 'shape' on to {@link geotoolkit.controls.shapes.BarChart}'s "setOptions" for the internal shape options. Here we can set the two grid tickgenerators, reference line and take the AnnotatedWidgets values for annotations.
         * From the Shape, the Widget adds ReferenceLine, Axes, and Grids to the Barchart shape. </li>
         * </ul>
         * </p>
         */
        class BarChartWidget extends geotoolkit.widgets.AnnotatedWidget {
            /**
             * The barchart widget is an annotated widget that is specialized for bar charts representation
             * <p>
             * A bar chart is a chart that uses either horizontal or vertical bars to show comparisons among categories.
             * One axis of the chart shows the specific categories being compared, and the other axis represents a discrete value.
             * It uses {@link geotoolkit.controls.shapes.BarChart} internally
             * </p>
             * <p>
             * Barchart widget inherits from AnnotatedWidget, so it takes most of its functionality including all its tools.
             * The main way to configure and customize the widget is to use the different setData() and setOptions() functions
             * that provide a comprehensible way of changing the default look and feel of the widget.
             * <ul>
             * <li> setData() will pass through everything to the {@link geotoolkit.controls.shapes.BarChart}'s "setData" for the internal shape.</li>
             * <li> setOptions() will pass 'shape' on to {@link geotoolkit.controls.shapes.BarChart}'s "setOptions" for the internal shape options. Here we can set the two grid tickgenerators, reference line and take the AnnotatedWidgets values for annotations.
             * From the Shape, the Widget adds ReferenceLine, Axes, and Grids to the Barchart shape. </li>
             * </ul>
             * </p>
             * @param options  (Required) widget options set
             * @param options.shape  (Optional) BarChart shape options see {@link geotoolkit.controls.shapes.BarChart#setOptions}
             * @param options.shape.orientation  (Optional) shape orientation
             * @param options.referenceline  (Optional) reference line options set
             * @param options.referenceline.visible  (Optional) visibility flag
             * @param options.referenceline.value  (Optional) value to display reference line at
             * @param options.referenceline.linestyle  (Optional) reference line style
             * @param options.mirror  (Optional) enables bar chart mirroring
             * @param options.grid  (Optional) grid options set
             * @param options.grid.values  (Optional) JSON with tick options for the gridvalue tick generator. See {@link geotoolkit.axis.TickGenerator#setOptions}
             * @param options.grid.groups  (Optional) JSON with tick options for the gridgroup tick generator. See {@link geotoolkit.axis.TickGenerator#setOptions}
             * @param options.annotations  (Optional) JSON to hold annotations' options see {@link geotoolkit.widgets.AnnotatedWidget#setAnnotationsOptions}
             * @param options.neatlimits  (Optional) enable automatic calculation of limits for value axis and gridlines
             * @param options.minspan  (Optional) minimum span for neat limits in pixel between ticks
             * @param data  (Optional) data data (see "setData" API for detailed description)
             */
            constructor(options: any | { shape?: any | { orientation?: geotoolkit.controls.shapes.BarChart.Orientation; } ; referenceline?: any | { visible?: boolean; value?: number; linestyle?: geotoolkit.attributes.LineStyle; } ; mirror?: boolean; grid?: any | { values?: geotoolkit.axis.TickGenerator; groups?: geotoolkit.axis.TickGenerator; } ; annotations?: any; neatlimits?: boolean; minspan?: boolean; } , data?: any);
            /**
             * Gets data layer
             */
            getDataLayer(): geotoolkit.scene.Layer;
            /**
             * Sets bounds of the node in the parent coordinates
             * @param bounds  (Required) bound of the node in the parent coordinates
             */
            setBounds(bounds: geotoolkit.util.Rect|any): this;
            /**
             * set format handler for labels
             * @param handler  (Required) format handler
             */
            setFormatLabelHandler(handler: Function): this;
            /**
             * Sets bar chart's data
             * @param data  (Required) data object (see {@link geotoolkit.controls.shapes.BarChart}'s "setData" description)
             */
            setData(data: any): this;
            /**
             */
            getData(): any;
            /**
             * Gets value of sample
             * @param series  (Required) series id
             * @param sample  (Required) sample id
             */
            getValueAt(series: number, sample: number): number|any;
            /**
             * Updates the widget's configuration with the passed in configuration
             * @param options  (Required) widget options set
             * @param options.shape  (Optional) BarChart shape options see {@link geotoolkit.controls.shapes.BarChart#setOptions}
             * @param options.shape.orientation  (Optional) shape orientation
             * @param options.referenceline  (Optional) reference line options set
             * @param options.referenceline.visible  (Optional) visibility flag
             * @param options.referenceline.value  (Optional) value to display reference line at
             * @param options.referenceline.linestyle  (Optional) reference line style
             * @param options.mirror  (Optional) enables bar chart mirroring
             * @param options.grid  (Optional) grid options set
             * @param options.grid.values  (Optional) JSON with tick options for the gridvalue tick generator. See {@link geotoolkit.axis.TickGenerator#setOptions}
             * @param options.grid.groups  (Optional) JSON with tick options for the gridgroup tick generator. See {@link geotoolkit.axis.TickGenerator#setOptions}
             * @param options.annotations  (Optional) JSON to hold annotations' options see {@link geotoolkit.widgets.AnnotatedWidget#setAnnotationsOptions}
             * @param options.neatlimits  (Optional) enable automatic calculation of limits for value axis and gridlines
             * @param options.minspan  (Optional) minimum span for neat limits in pixel between ticks
             */
            setOptions(options: any | { shape?: any | { orientation?: geotoolkit.controls.shapes.BarChart.Orientation; } ; referenceline?: any | { visible?: boolean; value?: number; linestyle?: geotoolkit.attributes.LineStyle; } ; mirror?: boolean; grid?: any | { values?: geotoolkit.axis.TickGenerator; groups?: geotoolkit.axis.TickGenerator; } ; annotations?: any; neatlimits?: boolean; minspan?: boolean; } ): this;
            /**
             * Updates layout
             */
            updateLayout(): this;
            /**
             * Highlight specified bars
             * @param bars  (Required) array of {@link geotoolkit.controls.data.SerieElementInfo} bars to highlight
             * @param append  (Optional) append/replace flag
             */
            highlightBars(bars: any[], append?: boolean): this;
            /**
             * Select elements at specified canvas coordinates
             * @param x  (Required) x-coordinate OR {x,y}-coordinates
             * @param y  (Optional) y-coordinate
             * @param highlight  (Optional) highlight selected elements
             */
            selectBarsAt(x: number|geotoolkit.util.Point, y?: number, highlight?: boolean): any[];
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param props  (Required) JSON containing properties see {@link geotoolkit.widgets.BarChartWidget#setOptions}
             */
            setProperties(props: any): this;
        }
        /**
         * The bubblechart widget is an annotated widget that is specialized for bubble chart representations.
         * It uses {@link geotoolkit.controls.shapes.BubbleChart} internally.<br>
         *  <p>
         * The main way to configure and customize the widget is to use the different setData() function that provides a comprehensible way of changing the default look and feel of the widget.
         * </p>
         * <p>
         * It reuses the default tools provided by the AnnotatedWidget and customizes them for bubblechart related operations.
         * It also provides utility functions to highlight points  by index <br>
         * </p>
         * <p>
         * The Bubblechart can represent 4D datasets (X,Y ,color and size) and by default contains only a single dataset.
         * The color of each point can be defined using a colorprovider and the corresponding colorbar can be displayed.
         * </p>
         */
        class BubbleChart extends geotoolkit.widgets.AnnotatedWidget {
            /**
             * The bubblechart widget is an annotated widget that is specialized for bubble chart representations.
             * It uses {@link geotoolkit.controls.shapes.BubbleChart} internally.<br>
             *  <p>
             * The main way to configure and customize the widget is to use the different setData() function that provides a comprehensible way of changing the default look and feel of the widget.
             * </p>
             * <p>
             * It reuses the default tools provided by the AnnotatedWidget and customizes them for bubblechart related operations.
             * It also provides utility functions to highlight points  by index <br>
             * </p>
             * <p>
             * The Bubblechart can represent 4D datasets (X,Y ,color and size) and by default contains only a single dataset.
             * The color of each point can be defined using a colorprovider and the corresponding colorbar can be displayed.
             * </p>
             * @param options  (Optional) 
             * @param options.bounds  (Optional) where to place the XPlot
             * @param options.viewcache  (Optional) enable tiled cache. It increase rendering performance for historical data
             * @param options.viewcachesize  (Optional) 
             * @param options.viewcachesize.width  (Optional) set tiled cache size.
             * @param options.viewcachesize.height  (Optional) set tiled cache size.
             */
            constructor(options?: any | { bounds?: geotoolkit.util.Rect; viewcache?: boolean; viewcachesize?: any | { width?: any; height?: any; } ; } );
            /**
             * create grid and axes
             */
            createGridAndAxes(): this;
            /**
             * function call in the constructor to initialize tools in the widget <br>
             * This widget adds a selection filter. This filter is used to send a object that contains the bubblechart shape reference and
             * an array of indices that represents selected shapes. Also, this widget adds a hover selection filter for showing tooltip when hovering on the bubble.
             */
            protected initializeTools(): this;
            /**
             * Sets options and/or data
             * @param data  (Required) options
             * @param data.bounds  (Optional) bounds. See {geotoolkit.util.Rect.setProperties} for details.
             * @param data.header  (Optional) JSON which defines header area
             * @param data.header.title  (Optional) JSON which defines main title. See {geotoolkit.attributes.Text.setProperties} for details.
             * @param data.header.annotationsize  (Optional) height of header
             * @param data.painter  (Optional) JSON which defines painter options
             * @param data.painter.symbol  (Optional) symbol painter style
             * @param data.painter.defaultcolor  (Optional) default color for symbol
             * @param data.painter.defaultfillstyle  (Optional) default fillstyle for symbol
             * @param data.painter.defaultlinestyle  (Optional) default linestyle for symbol
             * @param data.colorprovider  (Optional) color provider
             * @param data.x  (Optional) JSON which define the properties of axis X , See {geotoolkit.widgets.BubbleChart.setAxisData} for details.
             * @param data.y  (Optional) JSON which define the properties of axis Y , See {geotoolkit.widgets.BubbleChart.setAxisData} for details.
             * @param data.z  (Optional) JSON which define the properties of axis z , See {geotoolkit.widgets.BubbleChart.setAxisData} for details.
             * @param data.s  (Optional) JSON which define the size of bubble and related properties S , See {geotoolkit.widgets.BubbleChart.setAxisData} for details.
             * @param data.tools  (Optional) JSON which define the tools used in this widgets, See { geotoolkit.widgets.BubbleChart.setToolsOptions} for details.
             * @param data.trendline  (Optional) JSON which defines trend line options
             * @param data.trendline.model  (Optional) regression model
             * @param data.trendline.interval  (Optional) sample interval(pixel) for drawing the line based on calculated regression function
             * @param data.trendline.order  (Optional) polynomial order only work for polynomial regression
             * @param data.trendline.linestyle  (Optional) the style of trend line
             */
            setData(data: any | { bounds?: any|geotoolkit.util.Rect; header?: any | { title?: any; annotationsize?: number; } ; painter?: any | { symbol?: geotoolkit.scene.shapes.painters.AbstractPainter; defaultcolor?: string; defaultfillstyle?: string|any|geotoolkit.attributes.FillStyle; defaultlinestyle?: string|any|geotoolkit.attributes.LineStyle; } ; colorprovider?: geotoolkit.util.ColorProvider; x?: any; y?: any; z?: any; s?: any; tools?: any; trendline?: any | { model?: any; interval?: number; order?: number; linestyle?: geotoolkit.attributes.LineStyle; } ; } ): this;
            /**
             * get data and options
             * @param ignoreDataOptions  (Required) when true get all thins excluding data array
             */
            getData(ignoreDataOptions: boolean): any;
            /**
             * Sets visual options
             * @param options  (Required) bubble chart options
             * @param options.header  (Optional) JSON which defines header area
             * @param options.header.title  (Optional) JSON which defines main title. See {geotoolkit.attributes.Text.setProperties} for details.
             * @param options.header.annotationsize  (Optional) height of header
             * @param options.painter  (Optional) JSON which defines painter options
             * @param options.painter.symbol  (Optional) symbol painter style
             * @param options.painter.defaultcolor  (Optional) deprecated (since 2.6) default symbol color
             * @param options.painter.defaultfillstyle  (Optional) default fillstyle for symbol
             * @param options.painter.defaultlinestyle  (Optional) default linestyle for symbol
             * @param options.colorprovider  (Optional) color provider
             * @param options.trendline  (Optional) JSON which defines trend line options
             * @param options.trendline.model  (Optional) regression model
             * @param options.trendline.interval  (Optional) sample interval(pixel) for drawing the line based on calculated regression function
             * @param options.trendline.order  (Optional) polynomial order only work for polynomial regression
             * @param options.trendline.linestyle  (Optional) the style of trend line
             */
            setOptions(options: any | { header?: any | { title?: any; annotationsize?: number; } ; painter?: any | { symbol?: geotoolkit.scene.shapes.painters.AbstractPainter; defaultcolor?: string; defaultfillstyle?: string|any|geotoolkit.attributes.FillStyle; defaultlinestyle?: string|any|geotoolkit.attributes.LineStyle; } ; colorprovider?: geotoolkit.util.ColorProvider; trendline?: any | { model?: any; interval?: number; order?: number; linestyle?: geotoolkit.attributes.LineStyle; } ; } ): this;
            /**
             * gets visual options
             */
            getOptions(): {options:{header:{title:any;annotationsize:number};painter:{symbol:geotoolkit.scene.shapes.painters.AbstractPainter;defaultcolor:string;defaultfillstyle:string|any|geotoolkit.attributes.FillStyle;defaultlinestyle:string|any|geotoolkit.attributes.LineStyle};colorprovider:geotoolkit.util.ColorProvider;trendline:{model:any;interval:number};tools:any};data:{trendline:{linestyle:geotoolkit.attributes.LineStyle}}}|any;
            /**
             * get instance of color bar
             */
            getColorBar(): geotoolkit.controls.shapes.ColorBar;
            /**
             * return results of analysis
             */
            getRegressionAnalysis(): any;
            /**
             * draw regression line on the chart
             * @param options  (Optional) JSON which defines trend line options, see geotoolkit.controls.shapes.RegressionLine for details
             */
            updateRegressionLine(options?: any): this;
            /**
             * get options of trend line
             */
            getTrendlineOptions(): any;
            /**
             * Get converted label text
             * @param axis  (Required) axis to apply
             */
            getLabelTextConverter(axis: string): any;
            /**
             * Set Parameters for axis
             * @param axis  (Required) axis to apply ('x', 'y' , 'z' or 's' )
             * @param data  (Optional) JSON which defines data.
             * @param data.data  (Optional) Array of data
             * @param data.datasource  (Optional) DataSource of data
             * @param data.unit  (Optional) display unit
             * @param data.autominmax  (Optional) are min/max fixed (false) or automatically calculated
             * @param data.neatlimit  (Optional) enable to calculate neat limits based on existing limits
             * @param data.label  (Optional) JSON which defines label. See {geotoolkit.attributes.Text.setProperties} for details.
             * @param data.annotationsize  (Optional) width or height of annotation
             * @param data.min  (Optional) set the minimum limit to display data.
             * @param data.max  (Optional) set the maximum limit to display data.
             * @param data.reversed  (Optional) Is the Axis reversed.
             * @param data.logarithmic  (Optional) Is the Axis logarithmic.
             * @param data.tickgenerator  (Optional) a custom tickgenerator for this axis
             * @param data.axisticks  (Optional) JSON which defines ticks options of the axis. See {geotoolkit.axis.TickGenerator.setOptions} for details
             * @param data.gridticks  (Optional) JSON which defines horizontal ticks options of the grid (X or Y axis only). See {geotoolkit.axis.TickGenerator.setOptions} for details
             * @param data.legendvisible  (Optional) set legend (colorbar) visibility (Z only)
             * @param chartData  (Optional) JSON which defines bubblechart shape data and options
             */
            setAxisData(axis: string, data?: any | { data?: any[]; datasource?: geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView|any; unit?: geotoolkit.util.AbstractUnit|string|any; autominmax?: boolean; neatlimit?: boolean; label?: any; annotationsize?: number; min?: number; max?: number; reversed?: boolean; logarithmic?: boolean; tickgenerator?: geotoolkit.axis.TickGenerator; axisticks?: any; gridticks?: any; legendvisible?: boolean; } , chartData?: any): this;
            /**
             * @param axis  (Required) axis
             * @param ignoreDataOptions  (Required) when true get all thins excluding data array
             */
            getAxisData(axis: string, ignoreDataOptions: boolean): any;
            /**
             * Highlights the selected symbols
             * @param items  (Required) object which contain the symbols to be highlighted
             * @param reset  (Required) un-highlights previously selected symbols
             */
            highlightIndices(items: any, reset: boolean): any;
            /**
             * Get the reference of overlay layer
             */
            getOverLayer(): geotoolkit.scene.Layer;
            /**
             * Get the R-squared value for measuring the performance the regression line
             */
            getRsquared(): number;
            /**
             * Gets Highlighted Indices
             */
            getHighlightIndices(): any[];
            /**
             * Set Options for Header
             * @param data  (Optional) JSON which defines header area
             * @param data.title  (Optional) JSON which defines main title. See {geotoolkit.attributes.Text.setProperties} for details.
             * @param data.annotationsize  (Optional) height of header
             */
            setHeader(data?: any | { title?: any; annotationsize?: number; } ): this;
            /**
             * get header options
             */
            getHeader(): any;
            /**
             * set labels for bubbles
             * @param data  (Optional) JSON which define properties of labels
             * @param data.data  (Optional) Data series of labels
             * @param data.location  (Optional) The relative location of label to bubble
             * @param data.secondarylocation  (Optional) The relative location of label to bubble when first location is unable to show the label completely
             * @param data.textstyle  (Optional) the text style of labels
             * @param data.padding  (Optional) the padding between labels and bubble or view boundary
             * @param data.visible  (Optional) flag determine the visibility of labels
             * @param chartData  (Optional) JSON which defines bubblechart shape data and options
             */
            setLabels(data?: any | { data?: any[]|geotoolkit.data.DataSeries; location?: string; secondarylocation?: string; textstyle?: geotoolkit.attributes.TextStyle; padding?: number; visible?: boolean; } , chartData?: any): this;
            /**
             * get properties of labels
             */
            getLabels(): any;
            /**
             * Set painter Options
             * @param data  (Optional) JSON which defines painter options
             * @param data.symbol  (Optional) symbol painter style
             * @param data.defaultcolor  (Optional) deprecated (since 2.6) default color for symbol
             * @param data.defaultfillstyle  (Optional) default fillstyle for symbol
             * @param data.defaultlinestyle  (Optional) default linestyle for symbol
             * @param data.highlightcolor  (Optional) highlight color for symbol
             * @param chartData  (Optional) JSON which defines bubblechart shape data and options
             */
            setPainter(data?: any | { symbol?: geotoolkit.scene.shapes.painters.AbstractPainter; defaultcolor?: string; defaultfillstyle?: string|any|geotoolkit.attributes.FillStyle; defaultlinestyle?: string|any|geotoolkit.attributes.LineStyle; highlightcolor?: string; } , chartData?: any): this;
            /**
             * get painter's properties
             */
            getPainter(): any;
            /**
             * Sets color provider
             * @param cp  (Optional) color provider
             * @param chartData  (Optional) JSON which defines bubblechart shape data and options
             */
            setColorProvider(cp?: geotoolkit.util.ColorProvider, chartData?: any): this;
            /**
             * get color provider
             */
            getColorProvider(): geotoolkit.util.ColorProvider;
            /**
             * set symbol cache size
             * @param options  (Required) symbol options
             * @param options.width  (Optional) the width of symbol cache
             * @param options.height  (Optional) the height of symbol cache
             * @param chartData  (Optional) JSON which defines bubble chart shape data and options
             */
            setSymbolCache(options: any | { width?: number; height?: number; } , chartData?: any): this;
            /**
             * Set Tools Options
             * @param options  (Optional) which define the tools options
             * @param options.tooltip  (Optional) which define the tooltip options
             * @param options.tooltip.enabled  (Optional) flag to enable tooltip
             * @param options.tooltip.displayprops  (Optional) list define which axis value could be displayed when hovering on the bubble
             * @param options.tooltip.fillstyle  (Optional) fillstyle for tooltip
             * @param options.tooltip.linestyle  (Optional) linestyle for tooltip bounds
             * @param options.tooltip.textstyle  (Optional) textstyle for tooltip item
See {geotoolkit.widgets.AnnotatedWidget.setToolsOptions} for details of other tools
             */
            setToolsOptions(options?: any | { tooltip?: any | { enabled?: boolean; displayprops?: any[]; fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; textstyle?: geotoolkit.attributes.TextStyle; } ; } ): this;
            /**
             * get tools options
             */
            getToolsOptions(): any;
            /**
             */
            dispose(): any;
        }
        module sync {
            /**
             * Synchronizer Events
             */
            var Events: any;
            /**
             * Enum defining synchronization modes
             */
            var SyncMode: any;
            /**
             * Define base class for all synchronization operations.
             */
            class SyncOperation {
                /**
                 * Define base class for all synchronization operations.
                 * @param name  (Required) name of the operations
                 */
                constructor(name: string);
                /**
                 * Return a name of operation
                 */
                getName(): string;
                /**
                 * Connect events to item
                 * @param events  (Required) events to connect
                 * @param item  (Required) item to connect events
                 * @param listener  (Required) listener to be connected
                 */
                connect(events: string[], item: geotoolkit.util.EventDispatcher, listener: Function): any;
                /**
                 * Disconnect events from item
                 * @param events  (Required) events to disconnect
                 * @param item  (Required) item to disconnect events
                 * @param listener  (Required) listener to be disconnected
                 */
                disconnect(events: string[], item: geotoolkit.util.EventDispatcher, listener: Function): any;
                /**
                 * Gets data for the current operation
                 * @param item  (Required) 
                 * @param direction  (Required) 
                 * @param options  (Required) 
                 */
                getData(item: any, direction: geotoolkit.util.Orientation, options: any): any|any;
                /**
                 * Sets data for the current operation
                 * @param item  (Required) 
                 * @param data  (Required) 
                 * @param direction  (Required) 
                 * @param options  (Required) 
                 */
                setData(item: any, data: any, direction: geotoolkit.util.Orientation, options: any): any;
            }
            /**
             * Define a registry for synchronization operations.
             */
            class SyncOperationRegistry {
                /**
                 * Define a registry for synchronization operations.
                 */
                constructor();
                /**
                 * Register operation
                 * @param operation  (Required) operation of synchronization
                 * @param type  (Optional) type of the object
                 */
                registerOperation(operation: geotoolkit.widgets.sync.SyncOperation, type?: string): any;
                /**
                 * Return registered operation
                 * @param name  (Required) name of operation
                 * @param type  (Optional) type of object to apply operation
                 */
                getOperation(name: string, type?: string): geotoolkit.widgets.sync.SyncOperation;
                /**
                 * Return instance of the registry
                 */
                static getInstance(): geotoolkit.widgets.sync.SyncOperationRegistry;
            }
            /**
             * Define synchronized space. This class synchronize different nodes.
             */
            class ViewSynchronizer extends geotoolkit.util.EventDispatcher {
                /**
                 * Define synchronized space. This class synchronize different nodes.
                 * @param options  (Optional) options of synchronization
                 * @param options.mode  (Optional) an array of enabled modes to synchronize
                 * @param options.registry  (Optional) registry of operations
all listeners
                 */
                constructor(options?: any | { mode?: geotoolkit.widgets.sync.SyncMode[]; registry?: geotoolkit.widgets.sync.SyncOperationRegistry; } );
                /**
                 * Connect item to a collection of items to be synchronized
                 * @param item  (Required) item to be added
                 * @param options  (Optional) options to connect listener / receiver
                 * @param options.sender  (Optional) sender of events
                 * @param options.receiver  (Optional) receiver of events
                 * @param options.events  (Optional) listener of events
                 * @param options.orientation  (Optional) item own orientation
                 */
                connect(item: geotoolkit.scene.Group, options?: any | { sender?: boolean; receiver?: boolean; events?: string[]; orientation?: geotoolkit.util.Orientation; } ): this;
                /**
                 * Send data for all receivers of the current action
                 * @param data  (Required) data
                 * @param data.vertical  (Required) data in the vertical direction
                 * @param data.horizontal  (Required) data in horizontal direction
                 * @param name  (Required) name of the action
                 */
                send(data: any | { vertical?: any; horizontal?: any; } , name?: string): any;
                /**
                 * Synchronize
                 * @param source  (Required) source to synchronize
                 * @param name  (Required) action name to applied for synchronization
                 */
                synchronize(source: any, name: string): this;
                /**
                 * Disconnect item from a collection of items to be synchronized
                 * @param item  (Required) item to be removed
                 */
                disconnect(item: geotoolkit.scene.Group): any;
            }
            /**
             * Synchronizer Events
             */
            interface Events {
                /**
                 * Event type fired when a synchronized item is changed
                 */
                ItemChanged: string;
            }
            /**
             * Enum defining synchronization modes
             */
            interface SyncMode {
                /**
                 * Synchronize the visible model range
                 */
                VisibleRange: string;
                /**
                 * Synchronize the scale factors and position
                 */
                Scale: string;
                /**
                 * Custom synchronization
                 */
                Custom: string;
            }
        }
        module timeseries {
            /**
             * Base class for TimeSeriesObject and TimeSeriesObjectGroup.
             * This class contains the set/get AxisOptions and ID
             */
            class TimeSeriesObjectBase extends geotoolkit.util.EventDispatcher {
                /**
                 * Base class for TimeSeriesObject and TimeSeriesObjectGroup.
                 * This class contains the set/get AxisOptions and ID
                 * @param options  (Required) JSON object
                 * @param options.id  (Required) Object's id/uri
                 * @param options.name  (Required) Object/curve's name
                 * @param options.curveaxis  (Optional) JSON with curveaxis options
                 */
                constructor(options: any | { id?: string; name?: string; curveaxis?: any; } );
                /**
                 * Get object's ID
                 */
                getId(): string;
                /**
                 * Get axis options
                 */
                getAxisOptions(): {options:{visible:boolean;position:string;autocoloraxis:boolean;autocolorlabel:boolean;titlevisible:boolean;textcolor:boolean;axiscolor:string;labeltext:string;width:number;font:string;tickgeneratoroptions:{edge:{tickvisible:boolean;labelvisible:boolean};major:{tickvisible:boolean;labelvisible:boolean};minor:{tickvisible:boolean;labelvisible:boolean}}}}|any;
                /**
                 * Sets axis options. Refer to example below to make a curve's axis invisible. This can be useful to save space while displaying several curves that use the same vertical unit.<br>
                 * User would have to determine which curves share the same units and limits and hide the redundant axis.
                 * @param options  (Optional) JSON which defines curve axis
                 * @param options.visible  (Optional) visibility of curve axis
                 * @param options.position  (Optional) curve axis position 'left'/'right'
                 * @param options.autocoloraxis  (Optional) synchronize axis color with curve color
                 * @param options.autocolorlabel  (Optional) synchronize axis and label color with curve color
                 * @param options.titlevisible  (Optional) curve axis label visibility
                 * @param options.axisvisible  (Optional) axis visibility
                 * @param options.textcolor  (Optional) curve axis label color
                 * @param options.axiscolor  (Optional) axis color is autocoloraxis is false
                 * @param options.labeltext  (Optional) title text override
                 * @param options.width  (Optional) curve axis and text width
                 * @param options.font  (Optional) curve axis text font
                 * @param options.tickgeneratoroptions  (Optional) JSON which defines tick generator options
                 * @param options.tickgeneratoroptions.edge  (Optional) edge
                 * @param options.tickgeneratoroptions.edge.tickvisible  (Optional) edge tick visibility
                 * @param options.tickgeneratoroptions.edge.labelvisible  (Optional) edge label visibility
                 * @param options.tickgeneratoroptions.major  (Optional) major
                 * @param options.tickgeneratoroptions.major.tickvisible  (Optional) major tick visibility
                 * @param options.tickgeneratoroptions.major.labelvisible  (Optional) major label visibility
                 * @param options.tickgeneratoroptions.minor  (Optional) minor
                 * @param options.tickgeneratoroptions.minor.tickvisible  (Optional) minor tick visibility
                 * @param options.tickgeneratoroptions.minor.labelvisible  (Optional) minor label visibility
                 * @param options.tickgeneratoroptions.format  (Optional) label formatter for tick generator
                 * @param options.baselinestyle  (Optional) base line style. Color set to curve's color, width = 1 by default.
                 */
                setAxisOptions(options?: any | { visible?: boolean; position?: string; autocoloraxis?: boolean; autocolorlabel?: boolean; titlevisible?: boolean; axisvisible?: boolean; textcolor?: boolean; axiscolor?: string; labeltext?: string; width?: number; font?: string; tickgeneratoroptions?: any | { edge?: any | { tickvisible?: boolean; labelvisible?: boolean; } ; major?: any | { tickvisible?: boolean; labelvisible?: boolean; } ; minor?: any | { tickvisible?: boolean; labelvisible?: boolean; } ; format?: Function; } ; baselinestyle?: geotoolkit.attributes.LineStyle; } ): this;
                /**
                 */
                dispose(): any;
            }
            /**
             * TimeSeriesObject is a container of visuals used in TimeSeries Widget.
             * It primarily lets you get and set options of the different visuals.
             */
            class TimeSeriesObject extends geotoolkit.widgets.timeseries.TimeSeriesObjectBase {
                /**
                 * TimeSeriesObject is a container of visuals used in TimeSeries Widget.
                 * It primarily lets you get and set options of the different visuals.
                 * @param options  (Required) JSON object
                 * @param options.id  (Required) Object's id/uri
                 * @param options.name  (Required) Object/curve's name
                 * @param options.curve  (Required) curve properties
                 * @param options.curve.data  (Required) 
                 * @param options.curve.properties  (Optional) javascript object used to define curve properties (see setCurveOptions for details)
                 * @param options.curvesymbol  (Optional) javascript object used to define curvesymbol properties (see setSymbolOptions for details)
                 * @param options.curvelimits  (Optional) javascript object used to define curvelimits properties (see getCurveLimitsGroupOptions for details)
                 * @param options.curveaxis  (Optional) javascript object used to define curveaxis properties (see setAxisOptions for details)
                 */
                constructor(options: any | { id?: string; name?: string; curve?: any | { data?: geotoolkit.data.DataTableView; properties?: any; } ; curvesymbol?: any; curvelimits?: any; curveaxis?: any; } );
                /**
                 * Get curve's data
                 */
                getData(): geotoolkit.data.DataTableView;
                /**
                 * Set  data
                 * @param data  (Required) JSON containing left, right, and sort data
                 */
                setData(data: geotoolkit.data.DataTableView): this;
                /**
                 * Set curve options
                 * @param options  (Optional) JSON containing curve options
                 * @param options.visible  (Optional) visibility of curve
                 * @param options.linestyle  (Optional) curve linestyle
                 * @param options.autoscale  (Optional) true if curve in auto-scaling mode
                 * @param options.min  (Optional) curve min value
                 * @param options.max  (Optional) curve max value
                 * @param options.neatlimits  (Optional) true if curve in neat-limits mode
                 * @param options.neatlimitscenteredonzero  (Optional) true if curve in neat-limits mode
                 * @param options.unit  (Optional) unit string
                 * @param options.microposition  (Optional) micro position limits
                 * @param options.microposition.top  (Optional) vertical start micro position in the range from 0 to 1
                 * @param options.microposition.bottom  (Optional) vertical end micro position in the range from 0 to 1
                 * @param options.borderlinestyle  (Optional) timeseriesshape border line style
                 * @param options.spline  (Optional) toggle spline interpolation
                 * @param options.markervisible  (Optional) visibility of point markers
                 * @param options.marker  (Optional) JSON containing marker symbol
                 * @param options.values  (Optional) JSON containing point values options
                 * @param options.values.visible  (Optional) visibility of point values
                 * @param options.values.color  (Optional) color of value text font
                 * @param options.values.font  (Optional) value text font
                 * @param options.values.fillstyle  (Optional) fillstyle of value text container
                 * @param options.values.linestyle  (Optional) linestyle of value text container
                 * @param options.values.format  (Optional) formatter for value text
                 */
                setCurveOptions(options?: any | { visible?: boolean; linestyle?: geotoolkit.attributes.LineStyle; autoscale?: boolean; min?: number; max?: number; neatlimits?: boolean; neatlimitscenteredonzero?: boolean; unit?: string; microposition?: any | { top?: number; bottom?: number; } ; borderlinestyle?: geotoolkit.attributes.LineStyle; spline?: boolean; markervisible?: boolean; marker?: any; values?: any | { visible?: boolean; color?: string; font?: string; fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; format?: geotoolkit.util.NumberFormat; } ; } ): this;
                /**
                 * Get curve options
                 */
                getCurveOptions(): {options:{name:string;visible:boolean;linestyle:geotoolkit.attributes.LineStyle;flip:boolean;autoscale:boolean;min:number;max:number;neatlimits:boolean;neatlimitscenteredonzero:boolean;unit:string;position:string}}|any;
                /**
                 * Set symbol options
                 * @param options  (Optional) JSON of symbol options
                 * @param options.width  (Optional) width of symbol
                 * @param options.height  (Optional) height of symbol
                 * @param options.type  (Optional) type geotoolkit.scene.shapes.painters.CrossPainter/DiamondPainter/PlusPainter/SquarePainter/StarPainter/TrianglePainter/CirclePainter
                 * @param options.fillstyle  (Optional) fillstyle of symbol
                 */
                setSymbolOptions(options?: any | { width?: number; height?: number; type?: string; fillstyle?: geotoolkit.attributes.FillStyle; } ): this;
                /**
                 * Get symbol options
                 */
                getSymbolOptions(): {options:{width:number;height:number;type:string;fillstyle:geotoolkit.attributes.FillStyle}}|any;
                /**
                 * Get Curve Limits group option
                 */
                getCurveLimitsGroupOptions(): {options:{visible:boolean;margin:number;width:number;font:string}}|any;
                /**
                 * Set curve limits group options
                 * @param options  (Optional) JSON describing curve limits group options
                 * @param options.visible  (Optional) visibility of curve limits area
                 * @param options.margin  (Optional) curve limits area margin (top and bottom)
                 * @param options.width  (Optional) width for each curve limits column
                 * @param options.font  (Optional) curve limits text font
                 */
                setCurveLimitsGroupOptions(options?: any | { visible?: boolean; margin?: number; width?: number; font?: string; } ): this;
                /**
                 * Get legend options
                 */
                getLegendOptions(): {options:{formatter:geotoolkit.util.Format;margintext:number;font:string;height:number;internalpadding:number;fixedwidth:number;labelcolor:string;linestyle:geotoolkit.attributes.LineStyle;fillstyle:geotoolkit.attributes.FillStyle}}|any;
                /**
                 * Set legend item options
                 * @param options  (Optional) JSON which defines legend options
                 * @param options.formatter  (Optional) represents the legend number formatter.
                 * @param options.margintext  (Optional) margin between edge and text of legend
                 * @param options.font  (Optional) legend font
                 * @param options.height  (Optional) legend height
                 * @param options.internalpadding  (Optional) legend padding
                 * @param options.fixedwidth  (Optional) fixed with option
                 * @param options.labelcolor  (Optional) legend text color
                 * @param options.linestyle  (Optional) legend border linestyle
                 * @param options.fillstyle  (Optional) legend fillstyle
                 */
                setLegendOptions(options?: any | { formatter?: geotoolkit.util.Format; margintext?: number; font?: string; height?: number; internalpadding?: number; fixedwidth?: number; labelcolor?: string; linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; } ): this;
                /**
                 * Set tooltip options
                 * @param options  (Optional) JSON which defines tooltip options
                 * @param options.formatter  (Optional) represents the tooltip number formatter.
                 * @param options.margintext  (Optional) margin between edge and text of tooltip
                 * @param options.font  (Optional) legend
                 * @param options.symbolsize  (Optional) size of symbol
                 * @param options.internalpadding  (Optional) internal padding
                 * @param options.externalpadding  (Optional) external padding
                 * @param options.linestyle  (Optional) tooltip linestyle
                 * @param options.fillstyle  (Optional) tooltip fillstyle
                 * @param options.fixedwidth  (Optional) fixed width
                 * @param options.nanvisibility  (Optional) visibility when value is NaN
                 */
                setTooltipOptions(options?: any | { formatter?: geotoolkit.util.Format; margintext?: number; font?: string; symbolsize?: number; internalpadding?: number; externalpadding?: number; linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; fixedwidth?: number|any; nanvisibility?: boolean; } ): this;
                /**
                 * Get tooltip options
                 */
                getTooltipOptions(): {options:{formatter:geotoolkit.util.Format;margintext:number;font:string;symbolsize:number;internalpadding:number;externalpadding:number;linestyle:geotoolkit.attributes.LineStyle;fillstyle:geotoolkit.attributes.FillStyle;fixedwidth:number|any}}|any;
                /**
                 */
                dispose(): any;
            }
            /**
             * TimeSeriesObject is a container of visuals used in TimeSeries Widget.
             * It primarily lets you get and set options of the different visuals.
             */
            class TimeSeriesObjectGroup extends geotoolkit.widgets.timeseries.TimeSeriesObjectBase {
                /**
                 * TimeSeriesObject is a container of visuals used in TimeSeries Widget.
                 * It primarily lets you get and set options of the different visuals.
                 * @param options  (Required) JSON object
                 * @param options.id  (Required) Object's id/uri
                 * @param options.name  (Required) Object/curve's name
                 * @param options.min  (Optional) Object/curve's name
                 * @param options.max  (Optional) Object/curve's name
                 * @param options.curveaxis  (Optional) JSON with curveaxis options
                 */
                constructor(options: any | { id?: string; name?: string; min?: number; max?: number; curveaxis?: any; } );
                /**
                 * Set min
                 * @param value  (Required) 
                 */
                setMin(value: number): this;
                /**
                 * Get min
                 */
                getMin(): number;
                /**
                 * Set max
                 * @param value  (Required) 
                 */
                setMax(value: number): this;
                /**
                 * Get max
                 */
                getMax(): number;
                /**
                 * Sets if limits are shared between groups member
                 * @param value  (Required) if limits are shared between groups member
                 */
                setShareLimits(value: boolean): this;
                /**
                 * Get max
                 */
                getShareLimits(): boolean;
                /**
                 * Set axis options
                 * @param options  (Optional) JSON which defines curve axis
                 * @param options.visible  (Optional) visibility of curve axis
                 * @param options.position  (Optional) curve axis position 'left'/'right'
                 * @param options.titlevisible  (Optional) curve axis label visibility
                 * @param options.width  (Optional) curve axis and text width
                 * @param options.font  (Optional) curve axis text font
                 * @param options.tickgeneratoroptions  (Optional) JSON which defines tick generator options
                 * @param options.tickgeneratoroptions.edge  (Optional) edge
                 * @param options.tickgeneratoroptions.edge.tickvisible  (Optional) edge tick visibility
                 * @param options.tickgeneratoroptions.edge.labelvisible  (Optional) edge label visibility
                 * @param options.tickgeneratoroptions.major  (Optional) major
                 * @param options.tickgeneratoroptions.major.tickvisible  (Optional) major tick visibility
                 * @param options.tickgeneratoroptions.major.labelvisible  (Optional) major label visibility
                 * @param options.tickgeneratoroptions.minor  (Optional) minor
                 * @param options.tickgeneratoroptions.minor.tickvisible  (Optional) minor tick visibility
                 * @param options.tickgeneratoroptions.minor.labelvisible  (Optional) minor label visibility
                 */
                setAxisOptions(options?: any | { visible?: boolean; position?: string; titlevisible?: boolean; width?: number; font?: string; tickgeneratoroptions?: any | { edge?: any | { tickvisible?: boolean; labelvisible?: boolean; } ; major?: any | { tickvisible?: boolean; labelvisible?: boolean; } ; minor?: any | { tickvisible?: boolean; labelvisible?: boolean; } ; } ; } ): this;
                /**
                 * Add time series object to group. If the item (or any item in the array) is a member of another group, none of the items are added
                 * @param item  (Required) 
                 */
                addObject(item: geotoolkit.widgets.timeseries.TimeSeriesObject|geotoolkit.widgets.timeseries.TimeSeriesObject[]): this;
                /**
                 * Remove time series object from group
                 * @param item  (Required) 
                 */
                removeObject(item: geotoolkit.widgets.timeseries.TimeSeriesObject|geotoolkit.widgets.timeseries.TimeSeriesObject[]): this;
            }
            /**
             * The ScaledData is a helper object that encapsulates the data
             * representing a time series line and allows to associate either
             * conversion and/or interpolation objects with this data.
             */
            class ScaledData {
                /**
                 * The ScaledData is a helper object that encapsulates the data
                 * representing a time series line and allows to associate either
                 * conversion and/or interpolation objects with this data.
                 * @param data  (Required) abstract log data
                 * @param conversion  (Required) data conversion
                 * @param interpolation  (Optional) algorithm to interpolate samples
                 * @param useOutOfRangeData  (Optional) convert values equals or less to zero to 0 instead of NaN
                 */
                constructor(data: geotoolkit.data.DataTableView, conversion: geotoolkit.data.DataConversion, interpolation?: geotoolkit.data.DataInterpolation, useOutOfRangeData?: boolean);
                /**
                 * Sets conversion
                 * @param conversion  (Required) conversion of the data
                 */
                setConversion(conversion: geotoolkit.data.DataConversion): this;
                /**
                 * Sets interpolation
                 * @param interpolation  (Required) algorithm to interpolate samples
                 */
                setInterpolation(interpolation: geotoolkit.data.DataInterpolation): this;
                /**
                 * Gets data source
                 */
                getSource(): geotoolkit.data.DataTableView;
                /**
                 * Get minimum depth
                 */
                getMinPosition(): number;
                /**
                 * Returns maximum depth
                 */
                getMaxPosition(): number;
                /**
                 * Returns minimum value
                 */
                getMinValue(): number;
                /**
                 * Returns maximum value
                 */
                getMaxValue(): number;
                /**
                 * Gets scaled samples
                 */
                getSamples(): geotoolkit.data.DataSample[];
                /**
                 * Gets a count of samples
                 */
                getLength(): number;
                /**
                 * Always return true for time series data
                 */
                isForwardOnly(): boolean;
                /**
                 * Always return geotoolkit.data.DataOrder.Ascending for time series data
                 */
                getDataOrder(): geotoolkit.data.DataOrder|number;
                /**
                 * Convert value from original source to current scaled data
                 * @param v  (Required) value of the original data source
                 */
                convertValueFromSource(v: number[]|number): number[]|number;
                /**
                 * Convert value from scaled data source to original source
                 * @param v  (Required) value of the scaled data source
                 */
                convertValueToSource(v: number[]|number): number[]|number;
                /**
                 */
                getDataTimeStamp(): number;
                /**
                 * Return a wrap levels, If data doesn't have wraps than it returns null
                 * @param fromPosition  (Required) from position
                 * @param toPosition  (Required) to position
                 */
                getIndexRange(fromPosition: number, toPosition: number): geotoolkit.util.Range;
                /**
                 * Find index corresponding to depth
                 * @param scaledSamples  (Required) samples
                 * @param position  (Required) depth
                 * @param length  (Required) length of the array in the sample
                 */
                static findIndex(scaledSamples: geotoolkit.data.DataSample[], position: number, length: number): number;
                /**
                 * Return minimum wrap level. By default it is 0
                 */
                getMinWrapLevel(): number;
                /**
                 * Sets minimum wrap level value
                 * @param level  (Required) minimum wrap level
                 */
                setMinWrapLevel(level: number): this;
                /**
                 * Return maximum wrap level. By default it is 0
                 */
                getMaxWrapLevel(): number;
                /**
                 * Sets maximum wrap level value
                 * @param level  (Required) maximum wrap level.
                 */
                setMaxWrapLevel(level: number): this;
                /**
                 * Returns value at specified depth
                 * @param position  (Required) to return value
                 */
                getValue(position: number): number;
                /**
                 * @param position  (Required) position to return value
                 * @param samples  (Required) samples
                 */
                protected getValueInternal(position: number, samples: geotoolkit.data.DataSample[]): number;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 */
                setProperties(properties: any): this;
            }
            module TimeSeriesShape {
                module Events {
                    /**
                     * micropositionChanged
                     */
                    var micropositionChanged: string;
                }
            }
            module TimeSeriesTooltipObject {
                module Events {
                    /**
                     * Change
                     */
                    var Change: string;
                }
            }
            module TimeSeriesLine {
                module Events {
                    /**
                     * Updated
                     */
                    var Updated: string;
                    /**
                     * Limits Changed
                     */
                    var LimitsChanged: string;
                }
            }
            module ReferenceLine {
                module Type {
                    /**
                     * Top
                     */
                    var Top: any;
                    /**
                     * Value
                     */
                    var Value: any;
                    /**
                     * Bottom
                     */
                    var Bottom: any;
                }
            }
            module TimeSeriesFill {
                module FillType {
                    /**
                     * Single Fill
                     */
                    var Single: string;
                    /**
                     * Dual Fill
                     */
                    var Dual: string;
                    /**
                     * Positive Fill
                     */
                    var Positive: string;
                    /**
                     * Negative FIll
                     */
                    var Negative: string;
                    /**
                     * Positive And Negative Fill
                     */
                    var PositiveAndNegative: string;
                }
            }
        }
        module overlays {
            /**
             * Defines an abstract implementation of a widget overlay. Abstract overlay supports ...
             */
            class AbstractOverlay extends geotoolkit.util.EventDispatcher {
                /**
                 * Defines an abstract implementation of a widget overlay. Abstract overlay supports ...
                 * @param widget  (Required) 
                 */
                constructor(widget: geotoolkit.widgets.BaseWidget);
                /**
                 * AbstractOverlay Events
                 */
                static Events: any;
                /**
                 * Disposes this node, once disposes a node should not be used anymore.<br>
                 * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
                 * Also aggressively 'cleanup' this node by setting some of its members to null.
                 */
                dispose(): any;
                /**
                 * Returns widget
                 */
                getWidget(): geotoolkit.widgets.BaseWidget;
                /**
                 * @param state  (Required) 
                 */
                protected onStateChanged(state: any): this;
                /**
                 * Return visibility state
                 */
                getVisible(): boolean;
                /**
                 * Set visibility state
                 * @param visible  (Required) 
                 */
                setVisible(visible: boolean): this;
                /**
                 * Return enabled state
                 */
                getEnabled(): boolean;
                /**
                 * Set enabled state
                 * @param enabled  (Required) 
                 */
                setEnabled(enabled: boolean): this;
            }
            /**
             * Creates default implementation of the annotation
             */
            class Annotation extends geotoolkit.util.EventDispatcher implements geotoolkit.widgets.overlays.IAnnotation {
                /**
                 * Creates default implementation of the annotation
                 * @param data  (Required) 
                 * @param data.name  (Optional) annotation name
                 * @param data.text  (Optional) annotation text
                 * @param data.symbol  (Optional) base64 image
                 * @param data.anchor  (Optional) 
                 * @param data.target  (Optional) target
                 * @param data.options  (Optional) options
                 */
                constructor(data: any | { name?: string; text?: string; symbol?: string; anchor?: geotoolkit.util.Point; target?: geotoolkit.scene.Node; options?: any; } );
                /**
                 * Get annotation name
                 */
                getName(): string;
                /**
                 * Set annotation name
                 * @param name  (Required) new annotation name
                 */
                setName(name: string): this;
                /**
                 * Get annotation text
                 */
                getText(): string;
                /**
                 * Set annotation text
                 * @param text  (Required) new annotation text
                 */
                setText(text: string): this;
                /**
                 * Get annotation symbol
                 */
                getSymbol(): {symbol:{width:number;height:number;keepaspectratio:boolean;url:string;node:geotoolkit.scene.Node}}|any;
                /**
                 * Set annotation symbol
                 * @param symbol  (Required) 
                 * @param symbol.width  (Optional) 
                 * @param symbol.height  (Optional) 
                 * @param symbol.keepaspectratio  (Optional) default is true
                 * @param symbol.url  (Optional) 
                 * @param symbol.node  (Optional) 
                 */
                setSymbol(symbol: string|geotoolkit.scene.shapes.Image|geotoolkit.scene.Group|any | { width?: number; height?: number; keepaspectratio?: boolean; url?: string; node?: geotoolkit.scene.Node; } ): this;
                /**
                 * Get annotation anchor
                 */
                getAnchor(): geotoolkit.util.Point;
                /**
                 * Set annotation anchor
                 * @param anchor  (Required) 
                 */
                setAnchor(anchor: geotoolkit.util.Point): this;
                /**
                 * Get annotation target
                 */
                getTarget(): geotoolkit.scene.Node;
                /**
                 * Set annotation target
                 * @param target  (Required) 
                 */
                setTarget(target: geotoolkit.scene.Node): this;
                /**
                 * Get annotation options
                 */
                getOptions(): geotoolkit.scene.Node;
                /**
                 * Set annotation options
                 * @param options  (Required) 
                 */
                setOptions(options: any): this;
                /**
                 * Create IAnnotation from object
                 * @param object  (Required) 
                 */
                static fromObject(object: any|geotoolkit.widgets.overlays.IAnnotation): geotoolkit.widgets.overlays.IAnnotation;
            }
            /**
             * Creates default implementation of the annotation overlay event args
             */
            class AnnotationEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * Creates default implementation of the annotation overlay event args
                 */
                constructor();
                /**
                 * Cancel event
                 */
                cancel(): this;
                /**
                 * Return annotation
                 */
                getAnnotation(): any|geotoolkit.widgets.overlays.IAnnotation;
                /**
                 * Set object
                 * @param annotation  (Required) annotation object
                 */
                setAnnotation(annotation: any): this;
            }
            /**
             * Creates default implementation of the widget annotation overlay
             */
            class AnnotationOverlay extends geotoolkit.widgets.overlays.AbstractOverlay {
                /**
                 * Creates default implementation of the widget annotation overlay
                 * @param widget  (Required) 
                 * @param options  (Optional) extra options
                 * @param options.overlay  (Optional) Overlay layer can be specified instead of default layer
                 * @param options.cancreate  (Optional) can create annotation
                 * @param options.candelete  (Optional) can delete annotation
                 * @param options.canedit  (Optional) can edit annotation
                 * @param options.canmove  (Optional) can move annotation
                 */
                constructor(widget: geotoolkit.widgets.AnnotatedWidget, options?: any | { overlay?: geotoolkit.scene.Layer; cancreate?: boolean; candelete?: boolean; canedit?: boolean; canmove?: boolean; } );
                /**
                 * AnnotationOverlay Events
                 */
                static Events: any;
                /**
                 * Disposes this node, once disposes a node should not be used anymore.<br>
                 * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
                 * Also aggressively 'cleanup' this node by setting some of its members to null.
                 */
                dispose(): any;
                /**
                 */
                protected getModel(): geotoolkit.scene.Group;
                /**
                 */
                protected onUpdateGeometry(): any;
                /**
                 * @param state  (Required) overlay state
                 */
                protected onStateChanged(state: any): this;
                /**
                 * Set options
                 * @param options  (Required) options
                 * @param options.cancreate  (Optional) can create annotation
                 * @param options.candelete  (Optional) can delete annotation
                 * @param options.canedit  (Optional) can edit annotation
                 * @param options.canmove  (Optional) can move annotation
                 */
                setOptions(options: any | { cancreate?: boolean; candelete?: boolean; canedit?: boolean; canmove?: boolean; } ): this;
                /**
                 * Return options
                 */
                getOptions(): {options:{cancreate:boolean;candelete:boolean;canedit:boolean;canmove:boolean}}|any;
                /**
                 * Add annotation
                 * @param annotation  (Required) annotation object
                 * @param annotation.name  (Optional) annotation name
                 * @param annotation.text  (Optional) annotation text
                 * @param annotation.symbol  (Optional) base64 image
                 * @param annotation.anchor  (Optional) anchor position in target coordinates
                 * @param annotation.target  (Optional) node to specify anchor position
                 * @param annotation.options  (Optional) extra options
                 * @param annotation.options.connectorsize  (Optional) connector size
                 * @param annotation.options.offset  (Optional) offset of text frame from anchor in device coordinates
                 * @param annotation.options.frame  (Optional) annotation text dimension
                 * @param annotation.options.linestyle  (Optional) line style
                 * @param annotation.options.fillstyle  (Optional) fill style
                 * @param annotation.options.textstyle  (Optional) text style
                 */
                addAnnotation(annotation: any | { name?: string; text?: string; symbol?: string; anchor?: geotoolkit.util.Point; target?: geotoolkit.scene.Node; options?: any | { connectorsize?: number; offset?: geotoolkit.util.Point; frame?: geotoolkit.util.Dimension; linestyle?: any|geotoolkit.attributes.LineStyle; fillstyle?: any|geotoolkit.attributes.FillStyle; textstyle?: any|geotoolkit.attributes.TextStyle; } ; } |geotoolkit.widgets.overlays.IAnnotation): geotoolkit.widgets.overlays.IAnnotation;
                /**
                 * Remove annotation
                 * @param annotation  (Required) annotation to be removed
                 */
                removeAnnotation(annotation: geotoolkit.widgets.overlays.IAnnotation): this;
                /**
                 * Edit annotation, by default it starts embedded TextArea editor
                 * @param annotation  (Required) annotation to edit
                 */
                editAnnotation(annotation: geotoolkit.widgets.overlays.IAnnotation): this;
                /**
                 * Scroll to annotation
                 * @param annotation  (Required) annotation
                 */
                scrollToAnnotation(annotation: geotoolkit.widgets.overlays.IAnnotation): this;
                /**
                 * Return iterator by child nodes
                 * @param filter  (Optional) a filter function. Returns all nodes if null
                 */
                getAnnotations(filter?: Function): geotoolkit.util.Iterator;
                /**
                 * Return active annotation
                 */
                getActiveAnnotation(): geotoolkit.widgets.overlays.IAnnotation;
                /**
                 * Set active annotation
                 * @param annotation  (Required) annotation
                 */
                setActiveAnnotation(annotation: geotoolkit.widgets.overlays.IAnnotation): this;
                /**
                 * Set orientation
                 * @param orientation  (Required) overlay orientation
                 */
                setOrientation(orientation: geotoolkit.util.Orientation): this;
                /**
                 * Register geometry extension
                 * @param geometryName  (Required) geometry name
                 * @param extension  (Required) geometry extension
                 */
                static registerGeometry(geometryName: string, extension: Function): any;
                /**
                 * Return known geometry
                 * @param geometryName  (Required) geometry name
                 */
                static getGeometry(geometryName: string): Function;
            }
            /**
             * Annotation
             */
            interface IAnnotation {
                /**
                 * Get annotation name
                 */
                getName(): string;
                /**
                 * Set annotation name
                 * @param name  (Required) 
                 */
                setName(name: string): this;
                /**
                 * Get annotation text
                 */
                getText(): string;
                /**
                 * Set annotation text
                 * @param text  (Required) 
                 */
                setText(text: string): this;
                /**
                 * Get annotation symbol
                 */
                getSymbol(): {symbol:{width:number;height:number;keepaspectratio:boolean;url:string;node:geotoolkit.scene.Node}}|any;
                /**
                 * Set annotation symbol
                 * @param symbol  (Required) (base64 in case of url)
                 * @param symbol.width  (Optional) 
                 * @param symbol.height  (Optional) 
                 * @param symbol.keepaspectratio  (Optional) default is true
                 * @param symbol.url  (Optional) 
                 * @param symbol.node  (Optional) 
                 */
                setSymbol(symbol: string|geotoolkit.scene.shapes.Image|geotoolkit.scene.Group|any | { width?: number; height?: number; keepaspectratio?: boolean; url?: string; node?: geotoolkit.scene.Node; } ): this;
                /**
                 * Get annotation anchor
                 */
                getAnchor(): geotoolkit.util.Point;
                /**
                 * Set annotation anchor
                 * Returns annotation
                 * @param anchor  (Required) 
                 */
                setAnchor(anchor: geotoolkit.util.Point): this;
                /**
                 * Get annotation target
                 */
                getTarget(): geotoolkit.scene.Node;
                /**
                 * Set annotation target
                 * @param target  (Required) 
                 */
                setTarget(target: geotoolkit.scene.Node): this;
                /**
                 * Get annotation options
                 */
                getOptions(): any;
                /**
                 * Set annotation options
                 * @param options  (Required) 
                 * @param options.id  (Optional) 
                 * @param options.cssclass  (Optional) 
                 * @param options.name  (Optional) 
                 */
                setOptions(options: any | { id?: string; cssclass?: string; name?: string; } ): this;
            }
            module AnnotationShape {
                module Events {
                    /**
                     * This Event is fired when the geometry was changed
                     */
                    var GeometryChanged: string;
                }
            }
            module AbstractOverlay {
                /**
                 * AbstractOverlay Events
                 */
                interface Events {
                    /**
                     * This Event is fired when the Abstract Overlay State (props: visible, enable) has been changed
                     */
                    StateChanged: string;
                }
            }
            module AnnotationOverlay {
                /**
                 * AnnotationOverlay Events
                 */
                interface Events {
                    /**
                     * This Event is fired when the Annotation should be created
                     */
                    CreateAnnotation: string;
                    /**
                     * This Event is fired when the Annotation should be removed
                     */
                    RemoveAnnotation: string;
                    /**
                     * This Event is fired when the Annotation should be edited
                     */
                    EditAnnotation: string;
                    /**
                     * This Event is fired when active annotation has to be changed
                     */
                    ChangeActiveAnnotation: string;
                }
            }
        }
        module tools {
            /**
             * InPlace Editor
             * 
             * Double click to activate InPLace Editor.
             * EscapeKey to exit from editing mode (without submitting new value)
             * EnterKey (or CtrlKey + ArrowKey) to submit value and edit next cell
             * CtrlKey + EnterKey to submit value and exit from editing mode
             */
            class InPlaceEditor extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * InPlace Editor
                 * 
                 * Double click to activate InPLace Editor.
                 * EscapeKey to exit from editing mode (without submitting new value)
                 * EnterKey (or CtrlKey + ArrowKey) to submit value and edit next cell
                 * CtrlKey + EnterKey to submit value and exit from editing mode
                 * @param tableViewWidget  (Required) 
                 */
                constructor(tableViewWidget: geotoolkit.widgets.TableView);
                /**
                 * Events
                 */
                static Events: any;
                /**
                 * Return active cell
                 */
                getActiveCell(): {activeCell:{row:number;column:number}}|any;
                /**
                 * set active cell
                 * @param cell  (Required) call coordinates
                 * @param cell.row  (Required) row
                 * @param cell.column  (Required) column
                 */
                setActiveCell(cell: any | { row?: number; column?: number; } ): this;
            }
            class LegendToolEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * @param eventArgs  (Required) contains info about the event
                 * @param fromAnnotation  (Required) move from Annotation
                 * @param toAnnotation  (Required) move to Annotation
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs, fromAnnotation: geotoolkit.layout.AnnotationLocation, toAnnotation: geotoolkit.layout.AnnotationLocation);
            }
            /**
             * Tool to handle moving and resizing of legend around annotated widget
             */
            class LegendTool extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * Tool to handle moving and resizing of legend around annotated widget
                 * @param options  (Optional) 
                 * @param options.widget  (Optional) widget
                 * @param options.group  (Optional) Collection of legends or shape.
                 * @param options.manipulatorlayer  (Optional) Manipulator layer for holding shapes.
                 * @param options.padding  (Optional) padding around the legends.
                 */
                constructor(options?: any | { widget?: geotoolkit.widgets.AnnotatedWidget; group?: geotoolkit.scene.Group; manipulatorlayer?: geotoolkit.scene.Group; padding?: geotoolkit.scene.Group; } );
                /**
                 * Mouse down event handler
                 * @param eventArgs  (Required) eventArgs
                 */
                onMouseDown(eventArgs: geotoolkit.controls.tools.ProxyEventArgs): any;
                /**
                 * Mouse move event handler
                 * @param eventArgs  (Required) eventArgs
                 */
                onMouseMove(eventArgs: geotoolkit.controls.tools.ProxyEventArgs): any;
                /**
                 * Mouse up event handler
                 * @param eventArgs  (Required) eventArgs
                 */
                onMouseUp(eventArgs: geotoolkit.controls.tools.ProxyEventArgs): any;
            }
            module LegendTool {
                module Events {
                    /**
                     * onAnnotationChanged
                     */
                    var onAnnotationChanged: string;
                    /**
                     * onMoveStart
                     */
                    var onMoveStart: string;
                    /**
                     * onMoveEnd
                     */
                    var onMoveEnd: string;
                }
            }
            module InPlaceEditor {
                /**
                 * Events
                 */
                interface Events {
                    /**
                     * onCanEdit
                     */
                    onCanEdit: string;
                    /**
                     * onValueChanged
                     */
                    onValueChanged: string;
                }
            }
        }
        module Button {
            module State {
                /**
                 * Off
                 */
                var Off: number;
                /**
                 * On
                 */
                var On: number;
            }
        }
        module templates {
            /**
             * The implementation of the default serializer registry for widgets
             */
            class Registry extends geotoolkit.persistence.Registry {
                /**
                 * The implementation of the default serializer registry for widgets
                 */
                constructor();
                /**
                 * Return instance of the default registry
                 */
                static getDefault(): geotoolkit.widgets.templates.Registry;
                /**
                 * Return instance of the default registry
                 */
                static getInstance(): geotoolkit.widgets.templates.Registry;
            }
            /**
             * The implementation of the default serializer registry for HistogramWidget
             */
            class HistogramRegistry extends geotoolkit.persistence.Registry {
                /**
                 * The implementation of the default serializer registry for HistogramWidget
                 */
                constructor();
            }
            /**
             * The implementation of the default serializer registry for MultiHistograms widget
             */
            class MultiHistogramsRegistry extends geotoolkit.persistence.Registry {
                /**
                 * The implementation of the default serializer registry for MultiHistograms widget
                 */
                constructor();
                /**
                 * Return instance of the default registry
                 */
                static getInstance(): geotoolkit.widgets.templates.MultiHistogramsRegistry;
            }
        }
        module BubbleChart {
            /**
             * this legend is only for bubblechart to show tooltip
             */
            class BubbleWidgetTooltipLegendItem extends geotoolkit.controls.shapes.LegendItem {
                /**
                 * this legend is only for bubblechart to show tooltip
                 * @param object  (Required) 
                 * @param options  (Required) 
                 * @param options.axisname  (Optional) displayed name for this item
                 * @param options.unit  (Optional) displayed unit for this item
                 * @param options.value  (Optional) displayed value for this item
                 * @param options.textstyle  (Optional) textstyle for the text
                 */
                constructor(object: any, options: any | { axisname?: string; unit?: string; value?: number|string; textstyle?: geotoolkit.attributes.TextStyle; } );
            }
        }
        module data {
            /**
             * <p>
             *     DataTableAdapter allows use of DataTables with the tableView Widget.
             * </p>
             */
            class DataTableAdapter extends geotoolkit.util.EventDispatcher {
                /**
                 * <p>
                 *     DataTableAdapter allows use of DataTables with the tableView Widget.
                 * </p>
                 * @param options  (Required) DataTableAdapter Options
                 * @param options.datatable  (Required) dataTable
                 * @param options.sortingarrowoptions  (Optional) Color of arrow if Sorting tool is attached.
                 * @param options.sortingarrowoptions.uparrowfillcolor  (Optional) fillColor of up-arrow.
                 * @param options.sortingarrowoptions.downarrowfillcolor  (Optional) fillColor of down-arrow.
                 * @param options.sortingarrowoptions.uparrowlinecolor  (Optional) lineColor of up-arrow.
                 * @param options.sortingarrowoptions.downarrowlinecolor  (Optional) lineColor of down-arrow.
                 */
                constructor(options: any | { datatable?: geotoolkit.data.DataTable|geotoolkit.data.DataTableView; sortingarrowoptions?: string|any | { uparrowfillcolor?: string; downarrowfillcolor?: string; uparrowlinecolor?: string; downarrowlinecolor?: string; } ; } );
                /**
                 * Gets sorted column number.
                 */
                getSortedByColumn(): any|any;
                /**
                 * Gives number of rows
                 */
                getRowsCount(): number;
                /**
                 * Gives number of columns
                 */
                getColumnsCount(): number;
                /**
                 * Setting Content prepare
                 * @param fromRow  (Required) Row-number
                 * @param toRow  (Required) Row-number
                 */
                prepareContent(fromRow: number, toRow: number): any;
                /**
                 * Returns the cell values of Table View Widget
                 * @param column  (Required) column-number
                 * @param row  (Required) row-number
                 */
                getContentData(column: number, row: number): string|number|any;
                /**
                 * Returns header data of Table View Widget
                 * @param column  (Required) column-number
                 */
                getHeaderData(column: number): string;
                /**
                 * Returns Header style
                 * @param column  (Required) column number
                 * @param headerStyle  (Required) headerstyle
                 */
                getHeaderFormat(column: number, headerStyle: any): any;
                /**
                 * Sorting by column in TableViewWidget using specified comparator function.
                 * @param column  (Required) column number
                 * @param comparator  (Required) comparator function
                 */
                sortByColumn(column: number, comparator: Function): any;
                /**
                 * Filtering in TableViewWidget by value specified by filter. By default, this method will return all column - cellvalues containing value to filter.
                 * External function for filtering can also be provided.
                 * @param column  (Required) column-number to filter column-specific data
                 * @param filterValue  (Required) filtering term

<p>
    Filtering term can be string or function. <br/>
    For using function, which filters value containing 'a'.<br/>
    var filteringFunction = function (index , value){ <br/>
    &nbsp&nbsp return value.toString().indexOf('a') !== -1 <br/>
    }
</p>
                 */
                filter(column: number, filterValue: string|Function): this;
            }
        }
        module AnnotatedWidget {
            /**
             * Annotated Widget Events enumerator
             */
            interface Events {
                /**
                 * Event type fired when the models visible limits could have changed
                 */
                ModelVisibleLimitsChanged: string;
            }
        }
        module Histogram {
            /**
             * Histogram Widget's Events enumerator
             */
            interface Events {
                /**
                 * Event type fired when this models data has been updated
                 */
                DataUpdated: string;
            }
        }
        module MultiHistograms {
            /**
             * enum for Events triggered by the Widget.
             */
            interface Events {
                /**
                 * fired when histograms are selected
                 */
                HistogramsSelected: string;
                /**
                 * fired when bins of highlightable histograms are selected
                 */
                BinsSelected: string;
                /**
                 * fired when axis is selected
                 */
                AxisSelected: string;
                /**
                 * fired when Data source updated
                 */
                DataUpdated: string;
            }
        }
        module TimeSeriesWidget {
            /**
             * TimeseriesWidget events following example shows how user can subscribe to the events.
             */
            interface Events {
                /**
                 * onVisibleRangeChanged
                 */
                onVisibleRangeChanged: string;
                /**
                 * onVisibleRangeChanging
                 */
                onVisibleRangeChanging: string;
                /**
                 * onCursorChanged
                 */
                onCursorChanged: string;
                /**
                 * beforeSelectionChange
                 */
                beforeSelectionChange: string;
                /**
                 * onSelectionChanged
                 */
                onSelectionChanged: string;
                /**
                 * onAnnotationLineClick
                 */
                onAnnotationLineClick: string;
                /**
                 * onAnnotationClick
                 */
                onAnnotationClick: string;
            }
            /**
             * LegendPosition
             */
            interface LegendPosition {
                /**
                 * Top
                 */
                Outside: string;
                /**
                 * Bottom
                 */
                Inside: string;
            }
            /**
             * FillDirection
             */
            interface FillDirection {
                /**
                 * Top
                 */
                Top: string;
                /**
                 * Bottom
                 */
                Bottom: string;
            }
            /**
             * FillType
             */
            interface FillType {
                /**
                 * CurveToCurve
                 */
                CurveToCurve: string;
                /**
                 * CurveToReferenceLine
                 */
                CurveToReferenceLine: string;
                /**
                 * CurveToBaseLine
                 */
                CurveToBaseLine: string;
            }
            /**
             * ScrollBarType
             */
            interface ScrollBarType {
                /**
                 * Advanced
                 */
                Advanced: string;
                /**
                 * Compact
                 */
                Compact: string;
                /**
                 * Simple
                 */
                Simple: string;
            }
        }
        module TableView {
            /**
             * TableView's Events enumerator
             */
            interface Events {
                /**
                 * Event type fired when the column width has changed
                 */
                ColumnWidthChanged: string;
                /**
                 * Event type fired when the table size has changed
                 */
                TableSizeChanged: string;
                /**
                 * Event type fired when the table content view position was changed
                 */
                TableAdjusted: string;
            }
        }
    }
}
