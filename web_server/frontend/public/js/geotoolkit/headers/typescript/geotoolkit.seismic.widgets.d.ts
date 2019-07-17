declare module geotoolkit {
    module seismic {
        module widgets {
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
             */
            class SeismicViewWidget extends geotoolkit.widgets.BaseWidget {
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
                 * @param pipeline  (Required) seismic pipeline
                 * @param options  (Optional) options see {@link geotoolkit.seismic.widgets.SeismicViewWidget#setOptions}
                 */
                constructor(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, options?: any);
                /**
                 * SeismicViewWidget's Events enumerator
                 */
                static Events: any;
                /**
                 * Enum of seismic widget manipulator types
                 */
                static ManipulatorType: any;
                /**
                 * Set widget options
                 * @param options  (Optional) options
                 * @param options.lazyupdate  (Optional) deprecated (since 2.6) flag, if true then browser will render seismic in asynchronous mode, can be useful for old FireFox version, see (new geotoolkit.util.BrowserInfo())['isFirefox']
                 * @param options.layouttype  (Optional) type of layout 'default' or 'inside'
                 * @param options.title  (Optional) defines title options of widget
                 * @param options.title.text  (Optional) defines title of widget
                 * @param options.title.visible  (Optional) defines title visibility
                 * @param options.title.textstyle  (Optional) text style
                 * @param options.title.size  (Optional) size of the title in pixels
                 * @param options.title.alignment  (Optional) alignment
                 * @param options.title.location  (Optional) defines title location
                 * @param options.title.cssclass  (Optional) CSS style of the title
                 * @param options.colorbar  (Optional) json defining color bar
                 * @param options.colorbar.visible  (Optional) defines visibility of colorbar
                 * @param options.colorbar.location  (Optional) defines location of colorbar (geotoolkit.controls.shapes.ColorBarLocation.East|geotoolkit.controls.shapes.ColorBarLocation.West)
                 * @param options.colorbar.linestyle  (Optional) line style
                 * @param options.colorbar.title  (Optional) color bar title
                 * @param options.colorbar.title.size  (Optional) title area desired size
                 * @param options.colorbar.title.visible  (Optional) title visibility
                 * @param options.colorbar.title.text  (Optional) title text
                 * @param options.colorbar.title.textstyle  (Optional) title textstyle
                 * @param options.colorbar.axis  (Optional) colorbar axis
                 * @param options.colorbar.axis.size  (Optional) axis area desired size
                 * @param options.colorbar.axis.visible  (Optional) axis visibility
                 * @param options.colorbar.axis.autolabelrotation  (Optional) axis auto label rotation flag
                 * @param options.colorbar.colorbox  (Optional) color box attributes
                 * @param options.colorbar.colorbox.size  (Optional) colorbox area desired size
                 * @param options.colorbar.colorbox.linestyle  (Optional) colorbox outline rectangle linestyle
                 * @param options.colorbar.namedcolors  (Optional) JSON object container - Generated
                 * @param options.colorbar.namedcolors.size  (Optional) named colors desired size
                 * @param options.colorbar.maxheight  (Optional) maximun height of color bar. by default it is unlimited
                 * @param options.axis  (Optional) deprecated (since 2.3), specify instance of sample axis
                 * @param options.axes  (Optional) specify set of axes
                 * @param options.axes.samples  (Optional) specify properties of vertical axis
                 * @param options.axes.samples.visible  (Optional) defines visibility of sample axis
                 * @param options.axes.samples.cssclass  (Optional) defines cssclass of samples axis
                 * @param options.axes.samples.location  (Optional) defines location of sample axis
                 * @param options.axes.samples.instance  (Optional) defines instance of sample axis
                 * @param options.axes.samples.size  (Optional) defines size in pixels of samples axis
                 * @param options.axes.samples.title  (Optional) defines title options of sample axis
                 * @param options.axes.samples.title.text  (Optional) defines title of sample axis
                 * @param options.axes.samples.title.visible  (Optional) defines title visibility of sample axis
                 * @param options.axes.samples.title.textstyle  (Optional) defines title text style of sample axis
                 * @param options.axes.samples.ticks  (Optional) objects which defines ticks options of the axis. See {geotoolkit.axis.TickGenerator.setOptions} for details
                 * @param options.axes.headers  (Optional) seismic headers axes options
                 * @param options.axes.headers.fields  (Optional) array of trace headers axes, should contains JSON object with 'name', 'visible' and 'minimumSpan' properties
                 * @param options.axes.headers.options  (Optional) default options for all axes
                 * @param options.axes.headers.options.minimumSpan  (Optional) minimum span for header tick generator
                 * @param options.axes.headers.options.location  (Optional) default axes location, can be 'north' or 'south'
                 * @param options.axes.headers.options.direction  (Optional) default axes direction, can be 'toptobottom' or 'bottomtotop'
                 * @param options.axes.headers.options.size  (Optional) default axis size
                 * @param options.scroll  (Optional) specify scroll bar properties
                 * @param options.scroll.horizontal  (Optional) specify horizontal scroll bar properties
                 * @param options.scroll.horizontal.visible  (Optional) specify horizontal scroll bar visibility
                 * @param options.scroll.horizontal.cssclass  (Optional) specify horizontal scroll bar cssclass name
                 * @param options.scroll.vertical  (Optional) specify vertical scroll bar properties
                 * @param options.scroll.vertical.visible  (Optional) specify vertical scroll bar visibility
                 * @param options.scroll.vertical.cssclass  (Optional) specify vertical scroll bar cssclass name
                 * @param options.annotationssizes  (Optional) JSON to hold (width or height) of the annotation
                 * @param options.annotationssizes.east  (Optional) JSON to hold east annotation size
                 * @param options.annotationssizes.south  (Optional) JSON to hold south annotation size
                 * @param options.annotationssizes.west  (Optional) JSON to hold west annotation size
                 * @param options.annotationssizes.north  (Optional) JSON to hold north annotation size
                 * @param options.autoseismiclimits  (Optional) sets model limits of the center group based on the pipeline limits. If limits sets to false
then it is necessary to set up manually model limits for model
                 */
                setOptions(options?: any | { lazyupdate?: boolean; layouttype?: string; title?: any | { text?: string; visible?: boolean; textstyle?: geotoolkit.attributes.TextStyle|any; size?: number; alignment?: geotoolkit.util.AnchorType; location?: geotoolkit.layout.AnnotationLocation; cssclass?: string; } ; colorbar?: any | { visible?: boolean; location?: geotoolkit.controls.shapes.ColorBarLocation; linestyle?: geotoolkit.attributes.LineStyle|any; title?: any | { size?: number; visible?: boolean; text?: string; textstyle?: geotoolkit.attributes.TextStyle|any; } ; axis?: any | { size?: number; visible?: boolean; autolabelrotation?: boolean; } ; colorbox?: any | { size?: number; linestyle?: geotoolkit.attributes.LineStyle|any; } ; namedcolors?: any | { size?: number; } ; maxheight?: number; } ; axis?: geotoolkit.axis.Axis; axes?: any | { samples?: any | { visible?: boolean; cssclass?: string; location?: geotoolkit.layout.AnnotationLocation; instance?: geotoolkit.axis.Axis; size?: number; title?: any | { text?: string; visible?: boolean; textstyle?: geotoolkit.attributes.TextStyle|any; } ; ticks?: any; } ; headers?: any | { fields?: any[]; options?: any | { minimumSpan?: number; location?: string; direction?: geotoolkit.layout.VerticalBoxLayout.Direction; size?: number; } ; } ; } ; scroll?: any | { horizontal?: any | { visible?: boolean; cssclass?: string; } ; vertical?: any | { visible?: boolean; cssclass?: string; } ; } ; annotationssizes?: any | { east?: any; south?: any; west?: any; north?: any; } ; autoseismiclimits?: boolean; } ): this;
                /**
                 * Set widget title
                 * @param title  (Required) title
                 * @param title.text  (Optional) title text
                 * @param title.visible  (Optional) visibility
                 * @param title.textstyle  (Optional) text style
                 * @param title.size  (Optional) size of the title in pixels
                 * @param title.alignment  (Optional) alignment
                 * @param title.location  (Optional) defines location
                 * @param title.cssclass  (Optional) CSS style of the title
                 */
                setTitle(title: string|any | { text?: string; visible?: boolean; textstyle?: geotoolkit.attributes.TextStyle|any; size?: number; alignment?: geotoolkit.util.AnchorType; location?: geotoolkit.layout.AnnotationLocation; cssclass?: string; } ): this;
                /**
                 * Gets widget title
                 */
                getTitle(): {title:{title:string;visible:boolean;textstyle:geotoolkit.attributes.TextStyle|any;size:number;alignment:geotoolkit.util.AnchorType}}|any;
                /**
                 * Set samples title
                 * @param title  (Required) title
                 * @param title.title  (Optional) title
                 * @param title.visible  (Optional) visibility
                 * @param title.textstyle  (Optional) text style
                 * @param title.alignment  (Optional) alignment
                 */
                setSamplesTitle(title: string|any | { title?: string; visible?: boolean; textstyle?: geotoolkit.attributes.TextStyle|any; alignment?: geotoolkit.util.AnchorType; } ): this;
                /**
                 * function call in the constructor to initialize tools in the widget
                 */
                protected initializeTools(): this;
                /**
                 * Returns scale options.
                 */
                getScaleOptions(): {scaleOptions:{deviceunit:geotoolkit.util.AbstractUnit;sampleunit:geotoolkit.util.AbstractUnit;tracescale:number;samplescale:number}}|any;
                /**
                 * Sets scale options. If setScaleOption() is not set, the SeismicImage assumes a default .
                 * @param scaleOptions  (Required) scale options
                 * @param scaleOptions.deviceunit  (Optional) physical device unit
                 * @param scaleOptions.sampleunit  (Optional) sample unit, sample unit from pipeline will be used if not specified
                 * @param scaleOptions.tracescale  (Optional) in traces per device unit (e.g traces per inch)
                 * @param scaleOptions.samplescale  (Optional) in z unit per device unit if depth data (e.g feet per inch), or in device unit per z unit (e.g inches per second)
                 */
                setScaleOptions(scaleOptions: any | { deviceunit?: geotoolkit.util.AbstractUnit|string; sampleunit?: geotoolkit.util.AbstractUnit|string; tracescale?: number; samplescale?: number; } ): this;
                /**
                 * Returns the array of available headers
                 */
                getTraceHeaders(): string[];
                /**
                 * Returns header description, if header exists
                 * @param headerName  (Required) header name
                 */
                getTraceHeader(headerName: string): geotoolkit.seismic.data.FieldDesc;
                /**
                 * Returns information about shapes like axis and labels associated with the header
                 * @param headerField  (Required) header field description, accept only 'TraceNumber' as a string
                 */
                getTraceHeaderAxis(headerField: geotoolkit.seismic.data.FieldDesc|string): {header:{axis:geotoolkit.axis.Axis;label:geotoolkit.scene.shapes.Text}}|any;
                /**
                 * Check if the trace header is visible
                 * @param headerField  (Required) field to check visibility, accept only 'TraceNumber' as a string
                 */
                getTraceHeaderVisible(headerField: geotoolkit.seismic.data.FieldDesc|string): boolean;
                /**
                 * This method shows or hides the header
                 * @param headerField  (Required) field, accept only 'TraceNumber' as a string
                 * @param visible  (Required) header visibility
                 */
                setTraceHeaderVisible(headerField: geotoolkit.seismic.data.FieldDesc|string, visible: boolean): {header:{axis:geotoolkit.axis.Axis;label:geotoolkit.scene.shapes.Text}}|any;
                /**
                 * Returns the seismic model node
                 */
                getModel(): geotoolkit.scene.Group;
                /**
                 * Returns the group, which contains seismic images
                 */
                getSeismicModel(): geotoolkit.scene.Group;
                /**
                 * return seismic model limits
                 */
                getSeismicModelLimits(): geotoolkit.util.Rect;
                /**
                 * Sets seismic model limits if auto seismic model limits is off
                 * @param limits  (Required) model limits
                 */
                setSeismicModelLimits(limits: geotoolkit.util.Rect): this;
                /**
                 * return seismic model limits
                 */
                getVisibleSeismicDeviceLimits(): geotoolkit.util.Rect;
                /**
                 * Returns seismic visible model limits
                 * @param ignoreModelLimits  (Optional) flag defines whether to ignore model limits or not. By default this option is false and
visible limits will be intersected with model limits of the seismic
                 */
                getVisibleSeismicModelLimits(ignoreModelLimits?: boolean): geotoolkit.util.Rect;
                /**
                 * Returns active manipulator type
                 */
                getManipulatorType(): geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType;
                /**
                 * Set active manipulator type
                 * @param manipulatorType  (Required) enum of  of Manipulator type. Panning tool, RubberBand tool, magnifier tool and picking tool.
                 * @param active  (Required) state
                 */
                setManipulatorType(manipulatorType: geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType, active: boolean): this;
                /**
                 * Sets bounds of the node in the parent coordinates
                 * @param bounds  (Required) bound of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect|any): this;
                /**
                 * Fit content to bounds
                 * @param silent  (Optional) optional parameter to synchronize limits
                 */
                fitToBounds(silent?: boolean): this;
                /**
                 * translate seismic model
                 * @param dX  (Required) offset x
                 * @param dY  (Required) offset y
                 * @param silent  (Optional) update view
                 */
                translate(dX: number, dY: number, silent?: boolean): this;
                /**
                 * scale seismic model
                 * @param scaleX  (Required) scale factor by horizontal axis
                 * @param scaleY  (Required) scale factor by vertical axis
                 * @param silent  (Optional) update view
                 */
                scale(scaleX: number, scaleY: number, silent?: boolean): this;
                /**
                 * Zoom in
                 */
                zoomIn(): this;
                /**
                 * Zoom out
                 */
                zoomOut(): this;
                /**
                 * Reset zoom
                 */
                resetZoom(): this;
                /**
                 * set visible model limits
                 * @param visibleModelLimits  (Required) visible model limits
                 * @param silent  (Required) notification to listener on or not
                 */
                setVisibleSeismicModelLimits(visibleModelLimits: geotoolkit.util.Rect, silent: boolean): this;
                /**
                 * Attempts to set local transformation for the seismic model.
                 * @param transformation  (Required) transformation to set
                 */
                setSeismicModelTransformation(transformation: geotoolkit.util.Transformation): this;
                /**
                 * Disposes this node, once disposes a node should not be used anymore.<br>
                 * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
                 * Also aggressively 'cleanup' this node by setting some of its members to null.
                 */
                dispose(): any;
                /**
                 * returns active pipeline
                 */
                getPipeline(): geotoolkit.seismic.pipeline.SeismicPipeline;
                /**
                 * set pipeline
                 * @param pipeline  (Required) Seismic Pipeline
                 */
                setPipeline(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline): this;
                /**
                 * return active seismic image
                 */
                getSeismicImage(): geotoolkit.seismic.image.SeismicImage;
                /**
                 * Invalidate node
                 */
                notifyStateChanged(): any;
                /**
                 * Add invalidate handler
                 * @param handler  (Required) handler to be notified about invalidation
                 */
                addStateChangedHandler(handler: Function): any;
                /**
                 * Return manipulator layer
                 */
                getManipulatorLayer(): geotoolkit.scene.Layer;
                /**
                 * Return widgets tool
                 */
                getWidgetTools(): geotoolkit.controls.tools.AbstractCompositeTool;
                /**
                 * Remove invalidate handler
                 * @param handler  (Required) handler to be notified about invalidation
                 */
                removeStateChangedHandler(handler: Function): any;
                /**
                 */
                saveTemplate(): any;
                /**
                 */
                loadTemplate(): any;
                /**
                 * Get widget options
                 * @param getDataOptions  (Optional) optional parameter to specify addtional request to get colormap
                 */
                getData(getDataOptions?: any): {options:{pipeline:{version:string;interpolation:{type:string};normalization:{type:geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType;limits:geotoolkit.util.Range;scale:number};plot:{type:string;clippingFactor:string;decimationSpacing:string};colors:any};colors:{colorMap:string|geotoolkit.seismic.util.SeismicColors};scaleOptions:{tracePerInch:number;inchesPerSecond:number;feetPerInch:number;unit:string}}}|any;
                /**
                 * Sets options and/or data
                 * @param options  (Required) options
                 * @param options.pipeline  (Optional) pipeline options
                 * @param options.pipeline.version  (Optional) version
                 * @param options.pipeline.interpolation  (Optional) interpolation options
                 * @param options.pipeline.interpolation.type  (Optional) type of interpolation
                 * @param options.pipeline.normalization  (Optional) normalization options
                 * @param options.pipeline.normalization.type  (Optional) normalization type
                 * @param options.pipeline.normalization.limits  (Optional) normalization limits
                 * @param options.pipeline.normalization.scale  (Optional) normalization params
                 * @param options.pipeline.plot  (Optional) plot options
                 * @param options.pipeline.plot.type  (Optional) plot type
                 * @param options.pipeline.plot.clippingFactor  (Optional) factor used while clipping
                 * @param options.pipeline.plot.decimationSpacing  (Optional) decimation spacing
                 * @param options.pipeline.colors  (Optional) RGBA colors
                 * @param options.colors  (Optional) color options
                 * @param options.colors.colorMap  (Optional) color map
                 * @param options.scaleOptions  (Optional) scale options
                 * @param options.scaleOptions.tracePerInch  (Optional) traces per inch
                 * @param options.scaleOptions.inchesPerSecond  (Optional) inches per second
                 * @param options.scaleOptions.feetPerInch  (Optional) feet per inch
                 * @param options.scaleOptions.unit  (Optional) 'sec' or 'feet'
                 */
                setData(options: any | { pipeline?: any | { version?: string; interpolation?: any | { type?: string; } ; normalization?: any | { type?: geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType; limits?: geotoolkit.util.Range; scale?: number; } ; plot?: any | { type?: string; clippingFactor?: string; decimationSpacing?: string; } ; colors?: any; } ; colors?: any | { colorMap?: string|geotoolkit.seismic.util.SeismicColors; } ; scaleOptions?: any | { tracePerInch?: number; inchesPerSecond?: number; feetPerInch?: number; unit?: string; } ; } ): this;
                /**
                 * Return the node at the specific annotation
                 * @param location  (Required) position to return the node for
                 */
                getAnnotation(location: geotoolkit.layout.AnnotationLocation): geotoolkit.scene.Group;
                /**
                 * apply size (width or height) to annotation (convenience method)
                 * @param annotationSize  (Optional) JSON to hold (width or height) of the annotation
                 * @param annotationSize.east  (Optional) JSON to hold east annotation size
                 * @param annotationSize.south  (Optional) JSON to hold south annotation size
                 * @param annotationSize.west  (Optional) JSON to hold west annotation size
                 * @param annotationSize.north  (Optional) JSON to hold north annotation size
                 */
                setAnnotationSize(annotationSize?: any | { east?: any; south?: any; west?: any; north?: any; } ): this;
                /**
                 * Sets all the properties pertaining to this object see {@link geotoolkit.seismic.widgets.SeismicViewWidget#setOptions}
                 * @param properties  (Optional) JSON containing properties
                 */
                setProperties(properties?: any): this;
                /**
                 * Gets all the properties pertaining to this object
                 * See {@link geotoolkit.seismic.widgets.SeismicViewWidget.getProperties} for details
                 */
                getProperties(): any;
            }
            /**
             * TraceHeaderViewWidget is essentially a base widget specialized for seismic headers data display.
             */
            class TraceHeaderViewWidget extends geotoolkit.widgets.BaseWidget {
                /**
                 * TraceHeaderViewWidget is essentially a base widget specialized for seismic headers data display.
                 * @param pipeline  (Required) seismic pipeline
                 * @param options  (Required) headers options
                 * @param options.cssclass  (Optional) defines cssclass of headers table
                 * @param options.headers  (Optional) headers, array of header names, string contains header names divided by '|', or '*'
                 * @param options.index  (Optional) defines index column options
                 * @param options.index.size  (Optional) defines index column size in pixels, also accepts 'auto' that means that size depends on max header title size
                 */
                constructor(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, options: any | { cssclass?: string; headers?: geotoolkit.seismic.data.FieldDesc[]|string[]|string; index?: any | { size?: number|string; } ; } );
                /**
                 * function call in the constructor to initialize tools in the widget
                 */
                protected initializeTools(): this;
                /**
                 * dispose existing application
                 */
                dispose(): any;
                /**
                 * Returns pipeline
                 */
                getPipeline(): geotoolkit.seismic.pipeline.SeismicPipeline;
                /**
                 * Set pipeline
                 * @param pipeline  (Required) Seismic Pipeline
                 */
                setPipeline(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline): this;
                /**
                 * Returns preferred headers array(or string) that are displaying in table widget
                 */
                getTableHeaders(): string|any[];
                /**
                 * Set subset of header fields to be displayed in table widget
                 * @param headers  (Required) array of header names, string contains header names divided by '|', or '*'
                 */
                setTableHeaders(headers: geotoolkit.seismic.data.FieldDesc[]|string[]|string): this;
                /**
                 * Returns current widget options
                 */
                getOptions(): {options:{name:string;headers:string|any[];cssclass:string;index:{size:number|string}}}|any;
                /**
                 * Set widget options
                 * @param options  (Required) headers view options
                 * @param options.cssclass  (Optional) defines cssclass of headers table
                 * @param options.index  (Optional) defines index column options
                 * @param options.index.size  (Optional) defines index column size in pixels, also accepts 'auto' that means that size depends on max header title size
                 * @param options.headers  (Optional) headers, array of header names, string contains header names divided by '|', or '*'
                 */
                setOptions(options: any | { cssclass?: string; index?: any | { size?: number|string; } ; headers?: geotoolkit.seismic.data.FieldDesc[]|string[]|string; } ): this;
                /**
                 * Select trace index for highlighting
                 * @param traceIndex  (Required) trace index for highlighting
                 */
                highlightTraceIndex(traceIndex: number): this;
            }
            /**
             * TraceHeaderChartWidget is essentially a base widget specialized for seismic headers data display.
             */
            class TraceHeaderChartWidget extends geotoolkit.widgets.BaseWidget {
                /**
                 * TraceHeaderChartWidget is essentially a base widget specialized for seismic headers data display.
                 * @param pipeline  (Required) seismic pipeline
                 * @param options  (Optional) chart options {@link see geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setOptions}
                 * @param options.cssclass  (Optional) defines cssclass of headers table
                 * @param options.headers  (Optional) headers, array of header names, string contains header names divided by '|', or '*'
                 */
                constructor(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, options?: any | { cssclass?: string; headers?: geotoolkit.seismic.data.FieldDesc[]|string[]|string; } );
                /**
                 * Dispose node. Clear all listeners
                 * and disconnect style to avoid memory leaks
                 */
                dispose(): any;
                /**
                 * Returns pipeline
                 */
                getPipeline(): geotoolkit.seismic.pipeline.SeismicPipeline;
                /**
                 * set pipeline
                 * @param pipeline  (Required) Seismic Pipeline
                 */
                setPipeline(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline): this;
                /**
                 * Set widget or specific chart options
                 * @param options  (Required) header name or widget options or chart name if you apply options to one chart only
                 * @param options.charts  (Optional) array of char options {@link geotoolkit.scene.shapes.Text.prototype.addHeader}
                 * @param options.title  (Optional) title options or title text {@link see geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setTitle}
                 * @param options.title.text  (Optional) title text
                 * @param options.title.textstyle  (Optional) title text style {@link geotoolkit.scene.shapes.Text.prototype.setTextStyle}
                 * @param options.title.size  (Optional) title size
                 * @param chartOptions  (Optional) specific chart options if you apply options to specific chart only
                 */
                setOptions(options: string|any | { charts?: (any|string)[]; title?: string|any | { text?: string; textstyle?: geotoolkit.attributes.TextStyle|any; size?: number; } ; } , chartOptions?: any): this;
                /**
                 * Returns widget or specific chart options
                 */
                getOptions(): {options:{title:any;charts:any[]}}|any;
                /**
                 * Add header chart
                 * @param headerName  (Required) trace header name
                 * @param options  (Optional) chart options
                 * @param options.range  (Optional) header data range
                 * @param options.linestyle  (Optional) line style
                 * @param options.chart  (Optional) chart options
                 * @param options.chart.linestyle  (Optional) chart line style
                 * @param options.axis  (Optional) axis options
                 * @param options.axis.linestyle  (Optional) axis line style
                 * @param options.axis.title  (Optional) axis title
                 * @param options.axis.title.text  (Optional) axis title
                 * @param options.axis.title.visible  (Optional) axis title visibility
                 */
                addHeader(headerName: string, options?: any | { range?: geotoolkit.util.Range; linestyle?: geotoolkit.attributes.LineStyle|string|any; chart?: any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; } ; axis?: any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; title?: string|any | { text?: string; visible?: boolean; } ; } ; } ): this;
                /**
                 * Remove header
                 * @param headerName  (Required) trace header name
                 */
                removeHeader(headerName: string): this;
                /**
                 * Set chart title
                 * @param title  (Required) chart title or title options
                 * @param title.text  (Optional) title text
                 * @param title.textstyle  (Optional) title text style {@link geotoolkit.scene.shapes.Text.prototype.setTextStyle}
                 * @param title.size  (Optional) title size
                 */
                setTitle(title: string|any | { text?: string; textstyle?: geotoolkit.attributes.TextStyle|any; size?: number; } ): this;
                /**
                 * Returns chart title
                 */
                getTitle(): {title:{text:string;textstyle:geotoolkit.attributes.TextStyle;size:number}}|any;
            }
            /**
             * SeismicWidget is essentially a base widget specialized for seismic data display. It provides API to help viewing, interpreting and processing seismic data <br>
             * It has a center part to display seismic data and a set of annotations on each side to display axes, titles, or colorbar.  <br>
             * It supports default tools like cross hair, zooming, panning, cursor tracking, scrolling etc. It also has an option to display trace number headers table.<br>
             * Other options like horizontal and vertical scrollbars can be set here.
             */
            class SeismicWidget extends geotoolkit.seismic.widgets.SeismicViewWidget implements geotoolkit.scene.exports.IExportable {
                /**
                 * SeismicWidget is essentially a base widget specialized for seismic data display. It provides API to help viewing, interpreting and processing seismic data <br>
                 * It has a center part to display seismic data and a set of annotations on each side to display axes, titles, or colorbar.  <br>
                 * It supports default tools like cross hair, zooming, panning, cursor tracking, scrolling etc. It also has an option to display trace number headers table.<br>
                 * Other options like horizontal and vertical scrollbars can be set here.
                 * @param seismic  (Required) pipeline
                 * @param options  (Optional) additional options
                 * @param options.auxiliarychart  (Optional) auxiliarychart options
                 * @param options.auxiliarychart.size  (Optional) defines size of the auxiliarychart
                 * @param options.auxiliarychart.title  (Optional) defines options for auxiliarychart title
                 * @param options.auxiliarychart.charts  (Optional) defines options for charts {@link geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setOptions}
                 * @param options.table  (Optional) headers table
                 * @param options.table.visible  (Optional) defines if plot displays headers table, true | false | 'none' | 'visible' | 'hidden'
                 * @param options.table.enabled  (Optional) defines if header view default behaviour is enabled or not
                 * @param options.table.cssclass  (Optional) defines cssclass of headers table
                 * @param options.table.headers  (Optional) headers, array of header names, string contains header names divided by '|', or '*'
                 * @param options.table.index  (Optional) defines table index column properties
                 * @param options.table.index.size  (Optional) defines table index column size
                 * @param options.table.size  (Optional) defines size of headers table
                 * @param options.horizontalscrollable  (Optional) defines if plot displays horizontal scrollbars, true | false | 'auto' | 'floating'
                 * @param options.verticalscrollable  (Optional) defines if plot displays vertical scrollbars, true | false | 'auto' | 'floating'
                 * @param options.statusbar  (Optional) defines status bar settings
                 * @param options.statusbar.autosize  (Optional) defines status auto size mode
                 * @param options.statusbar.sizes  (Optional) defines status auto size settings
                 * @param options.statusbar.sizes.medium  (Optional) defines medium size
                 * @param options.statusbar.sizes.small  (Optional) defines small size
                 * @param options.statusbar.sections  (Optional) defines section setting
                 * @param options.statusbar.sections.info  (Optional) defines custom section formatter
                 * @param options.statusbar.sections.samples  (Optional) defines first section
                 * @param options.statusbar.sections.samples.label  (Optional) defines title of the section
                 * @param options.statusbar.sections.samples.format  (Optional) defines format of the section
                 * @param options.statusbar.sections.traces  (Optional) defines second section
                 * @param options.statusbar.sections.traces.format  (Optional) defines format of the section
                 * @param options.statusbar.sections.traces.label  (Optional) defines title of the section
                 * @param options.statusbar.sections.samplevalue  (Optional) defines third section
                 * @param options.statusbar.sections.samplevalue.label  (Optional) defines title of the section
                 * @param options.statusbar.sections.samplevalue.format  (Optional) defines format of the section
                 */
                constructor(seismic: geotoolkit.seismic.pipeline.SeismicPipeline, options?: any | { auxiliarychart?: any | { size?: any; title?: any; charts?: any; } ; table?: any | { visible?: boolean|string; enabled?: boolean; cssclass?: string; headers?: geotoolkit.seismic.data.FieldDesc[]|string[]|string; index?: any | { size?: number|string; } ; size?: number; } ; horizontalscrollable?: boolean|string; verticalscrollable?: boolean|string; statusbar?: any | { autosize?: boolean; sizes?: any | { medium?: number; small?: number; } ; sections?: any | { info?: Function; samples?: any | { label?: string; format?: string|geotoolkit.util.NumberFormat; } ; traces?: any | { format?: string|geotoolkit.util.NumberFormat; label?: string; } ; samplevalue?: any | { label?: string; format?: string|geotoolkit.util.NumberFormat; } ; } ; } ; } );
                /**
                 * Seismic widget events
                 */
                static Events: any;
                /**
                 * Disposes this node, once disposes a node should not be used anymore.<br>
                 * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
                 * Also aggressively 'cleanup' this node by setting some of its members to null.
                 */
                dispose(): any;
                /**
                 * Set widget options
                 * @param options  (Required) seismic view options
                 * @param options.lazyupdate  (Optional) deprecated (since 2.6) flag, if true then browser will render seismic in asynchronous mode, can be useful for old FireFox version, see (new geotoolkit.util.BrowserInfo())['isFirefox']
                 * @param options.layouttype  (Optional) type of layout 'default' or 'inside'
                 * @param options.colorbar  (Optional) json defining color bar
                 * @param options.colorbar.visible  (Optional) defines visibility of colorbar
                 * @param options.colorbar.location  (Optional) defines location of colorbar (geotoolkit.controls.shapes.ColorBarLocation.East|geotoolkit.controls.shapes.ColorBarLocation.West)
                 * @param options.colorbar.linestyle  (Optional) line style
                 * @param options.colorbar.title  (Optional) color bar title
                 * @param options.colorbar.title.size  (Optional) title area desired size
                 * @param options.colorbar.title.visible  (Optional) title visibility
                 * @param options.colorbar.title.text  (Optional) title text
                 * @param options.colorbar.title.textstyle  (Optional) title textstyle
                 * @param options.colorbar.axis  (Optional) colorbar axis
                 * @param options.colorbar.axis.size  (Optional) axis area desired size
                 * @param options.colorbar.axis.visible  (Optional) axis visibility
                 * @param options.colorbar.axis.autolabelrotation  (Optional) axis auto label rotation flag
                 * @param options.colorbar.colorbox  (Optional) color box attributes
                 * @param options.colorbar.colorbox.size  (Optional) colorbox area desired size
                 * @param options.colorbar.colorbox.linestyle  (Optional) colorbox outline rectangle linestyle
                 * @param options.colorbar.namedcolors  (Optional) JSON object container - Generated
                 * @param options.colorbar.namedcolors.size  (Optional) named colors desired size
                 * @param options.axis  (Optional) deprecated (since 2.3) specify instance of sample axis
                 * @param options.axes  (Optional) specify set of axes
                 * @param options.axes.samples  (Optional) specify properties of vertical axis
                 * @param options.axes.samples.visible  (Optional) defines visibility of sample axis
                 * @param options.axes.samples.cssclass  (Optional) defines cssclass of samples axis
                 * @param options.axes.samples.location  (Optional) defines location of sample axis
                 * @param options.axes.samples.instance  (Optional) defines instance of sample axis
                 * @param options.axes.samples.size  (Optional) defines size in pixels of samples axis
                 * @param options.axes.samples.title  (Optional) defines title options of sample axis
                 * @param options.axes.samples.title.text  (Optional) defines title of sample axis
                 * @param options.axes.samples.title.visible  (Optional) defines title visibility of sample axis
                 * @param options.axes.samples.title.textstyle  (Optional) defines title text style of sample axis
                 * @param options.axes.samples.ticks  (Optional) objects which defines ticks options of the axis. See {geotoolkit.axis.TickGenerator.setOptions} for details
                 * @param options.axes.headers  (Optional) seismic headers axes options
                 * @param options.axes.headers.fields  (Optional) array of trace headers axes, should contains JSON object with 'name', 'visible' and 'minimumSpan' properties
                 * @param options.axes.headers.options  (Optional) default options for all axes
                 * @param options.axes.headers.options.minimumSpan  (Optional) minimum span for header tick generator
                 * @param options.auxiliarychart  (Optional) auxiliarychart options
                 * @param options.auxiliarychart.size  (Optional) defines size of the auxiliarychart
                 * @param options.auxiliarychart.title  (Optional) defines options for auxiliarychart title
                 * @param options.auxiliarychart.charts  (Optional) defines options for charts {@link geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setOptions}
                 * @param options.scroll  (Optional) specify scroll bar properties
                 * @param options.scroll.horizontal  (Optional) specify horizontal scroll bar properties
                 * @param options.scroll.horizontal.visible  (Optional) specify horizontal scroll bar visibility
                 * @param options.scroll.horizontal.cssclass  (Optional) specify horizontal scroll bar cssclass name
                 * @param options.scroll.vertical  (Optional) specify vertical scroll bar properties
                 * @param options.scroll.vertical.visible  (Optional) specify vertical scroll bar visibility
                 * @param options.scroll.vertical.cssclass  (Optional) specify vertical scroll bar cssclass name
                 * @param options.annotationssizes  (Optional) JSON to hold (width or height) of the annotation
                 * @param options.annotationssizes.east  (Optional) JSON to hold east annotation size
                 * @param options.annotationssizes.south  (Optional) JSON to hold south annotation size
                 * @param options.annotationssizes.west  (Optional) JSON to hold west annotation size
                 * @param options.annotationssizes.north  (Optional) JSON to hold north annotation size
                 * @param options.table  (Optional) defines table properties
                 * @param options.table.visible  (Optional) defines if plot displays headers table, true | false | 'none' | 'visible' | 'hidden'
                 * @param options.table.size  (Optional) defines size of headers table
                 * @param options.table.cssclass  (Optional) defines cssclass of headers table
                 * @param options.table.headers  (Optional) headers, array of header names, string contains header names divided by '|', or '*'
                 * @param options.statusbar  (Optional) specify status bar properties
                 * @param options.statusbar.visible  (Optional) specify status bar visibility
                 * @param options.statusbar.cssclass  (Optional) specify status bar cssclass name
                 * @param options.statusbar.sections  (Optional) additional options of sections in statusbar
                 * @param options.statusbar.sections.info  (Optional) callback to return information for statusbar
                 * @param options.statusbar.sections.samples  (Optional) section to show information about samples like time or depth
                 * @param options.statusbar.sections.samples.label  (Optional) label to show information
                 * @param options.statusbar.sections.traces  (Optional) section to show information about traces
                 * @param options.statusbar.sections.traces.label  (Optional) label to show information about trace
                 * @param options.statusbar.sections.samplevalue  (Optional) section to show information about sample value
                 * @param options.statusbar.sections.samplevalue.label  (Optional) label to show information about trace
                 */
                setOptions(options: any | { lazyupdate?: boolean; layouttype?: string; colorbar?: any | { visible?: boolean; location?: geotoolkit.controls.shapes.ColorBarLocation; linestyle?: geotoolkit.attributes.LineStyle|any; title?: any | { size?: number; visible?: boolean; text?: string; textstyle?: geotoolkit.attributes.TextStyle|any; } ; axis?: any | { size?: number; visible?: boolean; autolabelrotation?: boolean; } ; colorbox?: any | { size?: number; linestyle?: geotoolkit.attributes.LineStyle|any; } ; namedcolors?: any | { size?: number; } ; } ; axis?: geotoolkit.axis.Axis; axes?: any | { samples?: any | { visible?: boolean; cssclass?: string; location?: geotoolkit.layout.AnnotationLocation; instance?: geotoolkit.axis.Axis; size?: number; title?: any | { text?: string; visible?: boolean; textstyle?: geotoolkit.attributes.TextStyle|any; } ; ticks?: any; } ; headers?: any | { fields?: any[]; options?: any | { minimumSpan?: number; } ; } ; } ; auxiliarychart?: any | { size?: any; title?: any; charts?: any; } ; scroll?: any | { horizontal?: any | { visible?: boolean; cssclass?: string; } ; vertical?: any | { visible?: boolean; cssclass?: string; } ; } ; annotationssizes?: any | { east?: any; south?: any; west?: any; north?: any; } ; table?: any | { visible?: boolean|string; size?: number; cssclass?: string; headers?: geotoolkit.seismic.data.FieldDesc[]|string[]|string; } ; statusbar?: any | { visible?: boolean; cssclass?: string; sections?: any | { info?: Function; samples?: any | { label?: any; } ; traces?: any | { label?: any; } ; samplevalue?: any | { label?: any; } ; } ; } ; } ): this;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing properties
                 * @param properties.layouttype  (Optional) type of layout 'default' or 'inside'
                 * @param properties.colorbar  (Optional) json defining color bar
                 * @param properties.colorbar.visible  (Optional) defines visibility of colorbar
                 * @param properties.colorbar.location  (Optional) defines location of colorbar (geotoolkit.controls.shapes.ColorBarLocation.East|geotoolkit.controls.shapes.ColorBarLocation.West)
                 * @param properties.colorbar.linestyle  (Optional) line style
                 * @param properties.colorbar.title  (Optional) color bar title
                 * @param properties.colorbar.title.size  (Optional) title area desired size
                 * @param properties.colorbar.title.visible  (Optional) title visibility
                 * @param properties.colorbar.title.text  (Optional) title text
                 * @param properties.colorbar.title.textstyle  (Optional) title textstyle
                 * @param properties.colorbar.axis  (Optional) colorbar axis
                 * @param properties.colorbar.axis.size  (Optional) axis area desired size
                 * @param properties.colorbar.axis.visible  (Optional) axis visibility
                 * @param properties.colorbar.axis.autolabelrotation  (Optional) axis auto label rotation flag
                 * @param properties.colorbar.colorbox  (Optional) color box attributes
                 * @param properties.colorbar.colorbox.size  (Optional) colorbox area desired size
                 * @param properties.colorbar.colorbox.linestyle  (Optional) colorbox outline rectangle linestyle
                 * @param properties.colorbar.namedcolors  (Optional) JSON object container - Generated
                 * @param properties.colorbar.namedcolors.size  (Optional) named colors desired size
                 * @param properties.axis  (Optional) deprecated (since 2.3) specify instance of sample axis
                 * @param properties.axes  (Optional) specify set of axes
                 * @param properties.axes.samples  (Optional) specify properties of vertical axis
                 * @param properties.axes.samples.visible  (Optional) defines visibility of sample axis
                 * @param properties.axes.samples.cssclass  (Optional) defines cssclass of samples axis
                 * @param properties.axes.samples.location  (Optional) defines location of sample axis
                 * @param properties.axes.samples.instance  (Optional) defines instance of sample axis
                 * @param properties.axes.samples.size  (Optional) defines size in pixels of samples axis
                 * @param properties.axes.samples.title  (Optional) defines title options of sample axis
                 * @param properties.axes.samples.title.text  (Optional) defines title of sample axis
                 * @param properties.axes.samples.title.visible  (Optional) defines title visibility of sample axis
                 * @param properties.axes.samples.title.textstyle  (Optional) defines title text style of sample axis
                 * @param properties.axes.samples.ticks  (Optional) objects which defines ticks options of the axis. See {geotoolkit.axis.TickGenerator.setOptions} for details
                 * @param properties.axes.headers  (Optional) seismic headers axes options
                 * @param properties.axes.headers.fields  (Optional) array of trace headers axes, should contains JSON object with 'name', 'visible' and 'minimumSpan' properties
                 * @param properties.axes.headers.options  (Optional) default options for all axes
                 * @param properties.axes.headers.options.minimumSpan  (Optional) minimum span for header tick generator
                 * @param properties.auxiliarychart  (Optional) options for auxiliary chart {@link geotoolkit.seismic.widgets.TraceHeaderChartWidget.prototype.setOptions}
                 * @param properties.scroll  (Optional) specify scroll bar properties
                 * @param properties.scroll.horizontal  (Optional) specify horizontal scroll bar properties
                 * @param properties.scroll.horizontal.visible  (Optional) specify horizontal scroll bar visibility
                 * @param properties.scroll.horizontal.cssclass  (Optional) specify horizontal scroll bar cssclass name
                 * @param properties.scroll.vertical  (Optional) specify vertical scroll bar properties
                 * @param properties.scroll.vertical.visible  (Optional) specify vertical scroll bar visibility
                 * @param properties.scroll.vertical.cssclass  (Optional) specify vertical scroll bar cssclass name
                 * @param properties.annotationssizes  (Optional) JSON to hold (width or height) of the annotation
                 * @param properties.annotationssizes.east  (Optional) JSON to hold east annotation size
                 * @param properties.annotationssizes.south  (Optional) JSON to hold south annotation size
                 * @param properties.annotationssizes.west  (Optional) JSON to hold west annotation size
                 * @param properties.annotationssizes.north  (Optional) JSON to hold north annotation size
                 * @param properties.table  (Optional) defines table properties
                 * @param properties.table.visible  (Optional) defines if plot displays headers table, true | false | 'none' | 'visible' | 'hidden'
                 * @param properties.table.size  (Optional) defines size of headers table
                 * @param properties.table.cssclass  (Optional) defines cssclass of headers table
                 * @param properties.table.headers  (Optional) headers, array of header names, string contains header names divided by '|', or '*'
                 * @param properties.statusbar  (Optional) specify status bar properties
                 * @param properties.statusbar.visible  (Optional) specify status bar visibility
                 * @param properties.statusbar.cssclass  (Optional) specify status bar cssclass name
                 * @param properties.statusbar.sections  (Optional) additional options of sections in statusbar
                 * @param properties.statusbar.sections.info  (Optional) callback to return information for statusbar
                 * @param properties.statusbar.sections.samples  (Optional) section to show information about samples like time or depth
                 * @param properties.statusbar.sections.samples.label  (Optional) label to show information
                 * @param properties.statusbar.sections.traces  (Optional) section to show information about traces
                 * @param properties.statusbar.sections.traces.label  (Optional) label to show information about trace
                 * @param properties.statusbar.sections.samplevalue  (Optional) section to show information about sample value
                 * @param properties.statusbar.sections.samplevalue.label  (Optional) label to show information about trace
                 */
                setProperties(properties?: any | { layouttype?: string; colorbar?: any | { visible?: boolean; location?: geotoolkit.controls.shapes.ColorBarLocation; linestyle?: geotoolkit.attributes.LineStyle|any; title?: any | { size?: number; visible?: boolean; text?: string; textstyle?: geotoolkit.attributes.TextStyle|any; } ; axis?: any | { size?: number; visible?: boolean; autolabelrotation?: boolean; } ; colorbox?: any | { size?: number; linestyle?: geotoolkit.attributes.LineStyle|any; } ; namedcolors?: any | { size?: number; } ; } ; axis?: geotoolkit.axis.Axis; axes?: any | { samples?: any | { visible?: boolean; cssclass?: string; location?: geotoolkit.layout.AnnotationLocation; instance?: geotoolkit.axis.Axis; size?: number; title?: any | { text?: string; visible?: boolean; textstyle?: geotoolkit.attributes.TextStyle|any; } ; ticks?: any; } ; headers?: any | { fields?: any[]; options?: any | { minimumSpan?: number; } ; } ; } ; auxiliarychart?: any; scroll?: any | { horizontal?: any | { visible?: boolean; cssclass?: string; } ; vertical?: any | { visible?: boolean; cssclass?: string; } ; } ; annotationssizes?: any | { east?: any; south?: any; west?: any; north?: any; } ; table?: any | { visible?: boolean|string; size?: number; cssclass?: string; headers?: geotoolkit.seismic.data.FieldDesc[]|string[]|string; } ; statusbar?: any | { visible?: boolean; cssclass?: string; sections?: any | { info?: Function; samples?: any | { label?: any; } ; traces?: any | { label?: any; } ; samplevalue?: any | { label?: any; } ; } ; } ; } ): this;
                /**
                 * Set subset of header fields to be displayed in table widget
                 * @param headers  (Required) array of header names, string contains header names divided by '|', or '*'
                 */
                setTableHeaders(headers: geotoolkit.seismic.data.FieldDesc[]|string[]|string): this;
                /**
                 * Returns preferred headers array(or string) that are displaying in table widget
                 */
                getTableHeaders(): string|any[];
                /**
                 * Add header chart
                 * @param headerName  (Required) trace header name
                 * @param options  (Optional) chart options
                 * @param options.range  (Optional) header data range
                 * @param options.linestyle  (Optional) line style
                 * @param options.chart  (Optional) chart options
                 * @param options.chart.linestyle  (Optional) chart line style
                 * @param options.axis  (Optional) axis options
                 * @param options.axis.linestyle  (Optional) axis line style
                 */
                addHeaderChart(headerName: string, options?: any | { range?: geotoolkit.util.Range; linestyle?: any|string|geotoolkit.attributes.LineStyle; chart?: any | { linestyle?: any|string|geotoolkit.attributes.LineStyle; } ; axis?: any | { linestyle?: any|string|geotoolkit.attributes.LineStyle; } ; } ): this;
                /**
                 * Remove header
                 * @param headerName  (Required) trace header name
                 */
                removeHeaderChart(headerName: string): this;
                /**
                 * Returns current widget options
                 */
                getOptions(): {options:{colorbar:{visible:boolean;location:geotoolkit.controls.shapes.ColorBarLocation};axes:{samples:{visible:boolean;cssclass:string;location:geotoolkit.layout.AnnotationLocation;instance:geotoolkit.axis.Axis;title:{text:string;visible:boolean;textstyle:geotoolkit.attributes.TextStyle|any}};headers:any[]};scroll:{horizontal:{visible:boolean;cssclass:string};vertical:{visible:boolean;cssclass:string}};table:{index:{size:number|string};headers:string|any[];visible:boolean|string;size:number;cssclass:string};statusbar:{visible:boolean;cssclass:string}}}|any;
                /**
                 * set pipeline
                 * @param pipeline  (Required) Seismic Pipeline
                 */
                setPipeline(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline): this;
                /**
                 * This method updates the layout of the seismic widget and all its child components with new/modified settings.
                 */
                updateLayout(): this;
                /**
                 * Returns exportable element
                 * @param options  (Optional) 
                 */
                getExportElement(options?: any): geotoolkit.scene.exports.AbstractDocumentElement;
                /**
                 * Used to prepare object before exporting
                 */
                beginExport(): this;
                /**
                 * Used to restore object's state after exporting
                 */
                endExport(): any;
            }
            module persistence {
                /**
                 * The implementation fo the default serializer registry for SeismicViewWidget
                 */
                class Registry extends geotoolkit.persistence.Registry {
                    /**
                     * The implementation fo the default serializer registry for SeismicViewWidget
                     */
                    constructor();
                    /**
                     * Return instance of the default registry
                     */
                    static getInstance(): geotoolkit.persistence.Registry;
                }
            }
            module tools {
                /**
                 * HorizontalSplitterEventArgs
                 */
                class HorizontalSplitterEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                    /**
                     * HorizontalSplitterEventArgs
                     * @param eventArgs  (Required) info about the event argments
                     */
                    constructor(eventArgs: geotoolkit.controls.tools.EventArgs);
                }
                /**
                 * Creates default implementation of the seismic plot splitter
                 */
                class HorizontalSplitter extends geotoolkit.controls.tools.splitter.HorizontalSplitter {
                    /**
                     * Creates default implementation of the seismic plot splitter
                     * @param manipulatorLayer  (Required) layer for holding temporary shapes
                     */
                    constructor(manipulatorLayer: geotoolkit.scene.Group);
                    /**
                     * Events
                     */
                    static Events: any;
                }
                /**
                 * Creates default implementation of the seismic comparison tool.
                 */
                class Comparator extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Creates default implementation of the seismic comparison tool.
                     * @param widget  (Required) the target widget to add the comparator to.
                     * @param manipulatorLayer  (Required) layer for holding temporary shapes
                     */
                    constructor(widget: geotoolkit.seismic.widgets.SeismicWidget, manipulatorLayer: geotoolkit.scene.Group);
                    /**
                     * dispose object
                     */
                    dispose(): any;
                    /**
                     */
                    protected onEnabledStateChanged(): any;
                    /**
                     * returns pipeline
                     */
                    getPipeline(): geotoolkit.seismic.pipeline.SeismicPipeline;
                    /**
                     * set pipeline
                     * @param pipeline  (Required) pipeline
                     */
                    setPipeline(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline): this;
                    /**
                     * Returns split flag
                     */
                    getSplit(): boolean;
                    /**
                     * Set split flag
                     * @param split  (Required) default is true
                     */
                    setSplit(split: boolean): this;
                    /**
                     * Set orientation
                     * @param orientation  (Required) orientation
                     */
                    setOrientation(orientation: geotoolkit.util.Orientation): this;
                    /**
                     * returns splitter orientation
                     */
                    getOrientation(): geotoolkit.util.Orientation;
                    /**
                     * Returns split position
                     */
                    getPosition(): number;
                    /**
                     * Set split position
                     * @param position  (Required) 
                     */
                    setPosition(position: number): this;
                }
                module HorizontalSplitter {
                    /**
                     * Events
                     */
                    interface Events {
                        /**
                         * onPlotSizeChanged
                         */
                        onPlotSizeChanged: string;
                    }
                }
            }
            module SeismicViewWidget {
                /**
                 * SeismicViewWidget's Events enumerator
                 */
                interface Events {
                    /**
                     * Event type fired when the visible limits have changed
                     */
                    VisibleLimitsChanged: string;
                }
                /**
                 * Enum of seismic widget manipulator types
                 */
                interface ManipulatorType {
                    /**
                     * Panning tool
                     */
                    Panning: number;
                    /**
                     * RubberBand tool
                     */
                    RubberBand: number;
                    /**
                     * Magnifier tool
                     */
                    Magnifier: number;
                    /**
                     * Picking tool
                     */
                    Pick: number;
                }
            }
            module SeismicWidget {
                /**
                 * Seismic widget events
                 */
                interface Events {
                    /**
                     * Event type fired when header view visibility changed
                     */
                    HeaderViewVisibilityChanged: string;
                }
            }
        }
    }
}
