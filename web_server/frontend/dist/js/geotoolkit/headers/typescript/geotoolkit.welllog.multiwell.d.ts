declare module geotoolkit {
    module welllog {
        module multiwell {
            /**
             * Well Events enumerator
             */
            var Events: any;
            /**
             * enum for TrackType
             */
            var TrackType: any;
            /**
             * Define track to display correlation between wells
             */
            class CorrelationTrack extends geotoolkit.scene.Group {
                /**
                 * Define track to display correlation between wells
                 * @param leftWell  (Optional) left track
                 * @param rightWell  (Optional) right track
                 */
                constructor(leftWell?: geotoolkit.welllog.multiwell.IWellTrack, rightWell?: geotoolkit.welllog.multiwell.IWellTrack);
                /**
                 * Specify left and right well
                 * @param leftWell  (Required) left well
                 * @param rightWell  (Required) right well
                 */
                setWells(leftWell: geotoolkit.welllog.multiwell.IWellTrack, rightWell: geotoolkit.welllog.multiwell.IWellTrack): this;
                /**
                 * Return left well
                 */
                getLeftWell(): geotoolkit.welllog.multiwell.IWellTrack;
                /**
                 * Return right well
                 */
                getRightWell(): geotoolkit.welllog.multiwell.IWellTrack;
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
                 * @param tool  (Required) tool to set
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
                getToolByType(toolType: string): geotoolkit.controls.tools.AbstractTool|any;
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
                 * Get the bounds in the parents model space. If bounds are not set,
                 * then parent model limits are used.
                 */
                getBounds(): geotoolkit.util.Rect;
            }
            /**
             * <p>
             * The MultiWell widget is a widget that provides a base multi well container functionality
             * 
             * The Default tools include:
             * <ul>
             *  <li> Horizontal scrollbar </li>
             *  <li> Panning </li>
             * </ul>
             * </p>
             */
            class MultiWellWidget extends geotoolkit.widgets.BaseWidget implements geotoolkit.scene.exports.IExportable {
                /**
                 * <p>
                 * The MultiWell widget is a widget that provides a base multi well container functionality
                 * 
                 * The Default tools include:
                 * <ul>
                 *  <li> Horizontal scrollbar </li>
                 *  <li> Panning </li>
                 * </ul>
                 * </p>
                 * @param options  (Optional) addition options
                 * @param options.modellimits  (Optional) define content limits in model coordinates
                 * @param options.visiblelimits  (Optional) define visible content limits in model coordinates
                 * @param options.horizontalscrollable  (Optional) defines if plot displays horizontal scrollbars, true | false | "auto" | "floating"
                 * @param options.verticalscrollable  (Optional) defines if plot displays vertical scrollbars, true | false | "auto" | "floating"
                 * @param options.attachedHeaders  (Optional) attached well headers and footers
                 * @param options.autoTracksLimits  (Optional) calculates content model limits based on tracks position as union
                 * @param options.header  (Optional) header options
                 * @param options.header.visible  (Optional) visibility of the headers. If it is 'none' then it is not created.
                 * @param options.header.height  (Optional) header height
                 * @param options.header.border  (Optional) defines properties for header outer border
                 * @param options.header.border.visible  (Optional) visibility of the border
                 * @param options.header.border.color  (Optional) color of border border
                 * @param options.header.viewcache  (Optional) enable tiled cache. It increase rendering performance for historical data
                 * @param options.header.viewcachesize  (Optional) define view cache parameters
                 * @param options.header.viewcachesize.width  (Optional) set tiled cache size.
                 * @param options.header.viewcachesize.height  (Optional) set tiled cache size.
                 * @param options.footer  (Optional) footer options
                 * @param options.footer.visible  (Optional) visibility of the footer. If it is 'none' then it is not created.
                 * @param options.footer.height  (Optional) footer height
                 * @param options.footer.border  (Optional) defines properties for footer outer border
                 * @param options.footer.border.visible  (Optional) visibility of the border
                 * @param options.footer.border.color  (Optional) color of border border
                 * @param options.footer.viewcache  (Optional) enable tiled cache. It increase rendering performance for historical data
                 * @param options.footer.viewcachesize  (Optional) define view cache parameters
                 * @param options.footer.viewcachesize.width  (Optional) set tiled cache size.
                 * @param options.footer.viewcachesize.height  (Optional) set tiled cache size.
                 * @param options.viewcache  (Optional) enable tiled cache. It increase rendering performance for historical data
                 * @param options.viewcachesize  (Optional) define view cache parameters
                 * @param options.viewcachesize.width  (Optional) set tiled cache size.
                 * @param options.viewcachesize.height  (Optional) set tiled cache size.
                 * @param options.border  (Optional) defines properties for widget outer border
                 * @param options.border.visible  (Optional) visibility of the border
                 * @param options.border.color  (Optional) color of border border
                 * @param options.trackcontainer  (Optional) defines properties for track container
                 * @param options.trackcontainer.border  (Optional) defines properties for track container outer border
                 * @param options.trackcontainer.border.visible  (Optional) visibility of the border
                 * @param options.trackcontainer.border.color  (Optional) color of border border
                 * @param options.track  (Optional) optional track options
                 * @param options.track.fixedwidth  (Optional) fixed width of tracks for horizontal scale
                 * @param options.track.header  (Optional) optional track header properties
                 * @param options.track.header.border  (Optional) optional track header properties
                 * @param options.track.header.border.visible  (Optional) visibility of the track header border
                 * @param options.track.header.border.color  (Optional) color of track header border
                 * @param options.track.header.border.width  (Optional) line width of track header border
                 * @param options.annotations  (Optional) annotations properties for axes, titles
                 * @param options.annotations.west  (Optional) an array of items to be inserted as annotations to west
                 * @param options.annotations.east  (Optional) an array of items to be inserted as annotations to east
                 * @param options.annotations.south  (Optional) an array of items to be inserted as annotations to south
                 * @param options.annotations.north  (Optional) an array of items to be inserted as annotations to north
                 * @param options.annotationssizes  (Optional) Properties to hold (width or height) of the annotations
                 * @param options.annotationssizes.west  (Optional) a size of west annotation
                 * @param options.annotationssizes.east  (Optional) a size of east annotation
                 * @param options.annotationssizes.south  (Optional) a size of south annotation (if size is null it will be equal to footer height if it is visible)
                 * @param options.annotationssizes.north  (Optional) a size of north annotation (if size is null it will be equal to header height if it is visible)
                 * @param options.offscreentrackpanning  (Optional) a percent of how much track should remain in the visible space when panning a track
                 */
                constructor(options?: any | { modellimits?: geotoolkit.util.Rect; visiblelimits?: geotoolkit.util.Rect; horizontalscrollable?: boolean|string; verticalscrollable?: boolean|string; attachedHeaders?: boolean; autoTracksLimits?: boolean; header?: any | { visible?: boolean; height?: number; border?: any | { visible?: boolean; color?: string; } ; viewcache?: boolean; viewcachesize?: any | { width?: number; height?: number; } ; } ; footer?: any | { visible?: boolean|string; height?: number; border?: any | { visible?: boolean; color?: string; } ; viewcache?: boolean; viewcachesize?: any | { width?: number; height?: number; } ; } ; viewcache?: boolean; viewcachesize?: any | { width?: number; height?: number; } ; border?: any | { visible?: boolean; color?: string; } ; trackcontainer?: any | { border?: any | { visible?: boolean; color?: string; } ; } ; track?: any | { fixedwidth?: boolean; header?: any | { border?: any | { visible?: boolean; color?: string; width?: number; } ; } ; } ; annotations?: any | { west?: geotoolkit.scene.Node[]; east?: geotoolkit.scene.Node[]; south?: geotoolkit.scene.Node[]; north?: geotoolkit.scene.Node[]; } ; annotationssizes?: any | { west?: number; east?: number; south?: number; north?: number; } ; offscreentrackpanning?: number; } );
                /**
                 * Add annotation to annotation container
                 * @param name  (Required) name of container
                 * @param item  (Required) item to add
                 */
                addAnnotation(name: string|geotoolkit.layout.AnnotationLocation, item: geotoolkit.scene.Group|geotoolkit.axis.Axis): this;
                /**
                 * Add annotation to annotation container
                 * @param name  (Required) name of container
                 * @param item  (Required) item to add
                 */
                removeAnnotation(name: string|geotoolkit.layout.AnnotationLocation, item: geotoolkit.scene.Group|geotoolkit.axis.Axis): this;
                /**
                 * Synchronizes axi or group with a track container model
                 * @param object  (Required) object to connect to the central component
                 * @param orientation  (Optional) model orientation
                 */
                connect(object: geotoolkit.scene.Group|geotoolkit.axis.Axis, orientation?: geotoolkit.util.Orientation): this;
                /**
                 * Returns manipulator overlay to draw temporary shapes on top of the track container
                 */
                getTrackManipulatorLayer(): geotoolkit.scene.Layer;
                /**
                 * function call in the constructor to initialize tools in the widget
                 */
                protected initializeTools(): this;
                /**
                 * Returns manipulator overlay to draw shapes that should move with the model
                 */
                getOverlayLayer(): geotoolkit.scene.Layer;
                /**
                 * Send event 'updating' to update data. The event argument's
                 * includes type, source, {'start,'end'}, where start and end is visible range
                 * eventName : (WellLogWidget.Events.DataUpdating)
                 */
                updateData(): this;
                /**
                 * Enumerate each visual in track container
                 * @param callback  (Required) callback method
                 */
                forEachVisual(callback: Function): any;
                /**
                 * Sets a new data model
                 * @param data  (Required) logdata
                 */
                setData(data: geotoolkit.data.DataSource|geotoolkit.data.DataTable|geotoolkit.data.DataTableView): this;
                /**
                 * returns data source
                 */
                getData(): geotoolkit.data.DataSource;
                /**
                 * Return the data binding
                 */
                getDataBinding(): geotoolkit.data.DataBinding;
                /**
                 * Sets the data binding
                 * @param binding  (Required) data binding
                 * @param silent  (Optional) silent mode to forbid
                 */
                setDataBinding(binding: geotoolkit.data.DataBinding, silent?: boolean): this;
                /**
                 * Sets node filter for selection tool
                 * @param nodeFilter  (Required) filter that allows to filter selected nodes.
                 */
                setNodeFilter(nodeFilter: Function): this;
                /**
                 * Return center model limits
                 */
                getCenterModelLimits(): geotoolkit.util.Rect;
                /**
                 * Sets center model limits if auto track limits is false
                 * @param limits  (Required) limits to set
                 */
                setCenterModelLimits(limits: geotoolkit.util.Rect): this;
                /**
                 * Add track, well to the container.
                 * <p>By default well track track has size specified in the range options and depth range specified in the options welllog</p>
                 * @param track  (Required) track to insert
                 * @param options  (Optional) options
                 */
                addTrack(track: geotoolkit.welllog.multiwell.TrackType|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.multiwell.CorrelationTrack|any[], options?: any): geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack;
                /**
                 * A factory method to create an instance of the track
                 * @param type  (Required) track type to create
                 * @param options  (Optional) options
                 */
                createTrack(type: geotoolkit.welllog.multiwell.TrackType, options?: any): geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack;
                /**
                 * Insert track, well to the container at specified index
                 * @param index  (Required) index of the track
                 * @param track  (Required) track to insert
                 * @param options  (Optional) track options
                 * @param options.id  (Optional) track id
                 * @param options.rage  (Optional) track depth limits
                 * @param options.width  (Optional) track width
                 */
                insertTrack(index: number, track: geotoolkit.welllog.multiwell.TrackType|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.IWellTrack, options?: any | { id?: string; rage?: geotoolkit.util.Range; width?: number; } ): geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack;
                /**
                 * Track it added to container
                 * @param track  (Required) track added
                 */
                protected onTrackAdded(track: any): this;
                /**
                 * Track is removing from container
                 * @param track  (Required) to be removed
                 */
                protected onTrackRemoving(track: geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack): any;
                /**
                 * Returns wells count
                 */
                getTracksCount(): number;
                /**
                 * Returns track at specified index
                 * @param index  (Required) index of the track
                 */
                getTrackAt(index: number): geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack;
                /**
                 * Returns track at specified position in plot coordinate
                 * @param x  (Required) x coordinate position
                 * @param y  (Optional) y coordinate position
                 */
                getTrackAtPosition(x: number|geotoolkit.util.Point, y?: number): geotoolkit.welllog.LogTrack;
                /**
                 * Remove Well Track at specified index
                 * @param index  (Required) track index
                 */
                removeTrackAt(index: number): this;
                /**
                 * Remove specified Well Track
                 * @param wellTrack  (Required) track to remove
                 */
                removeTrack(wellTrack: geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack): this;
                /**
                 * Returns the index of specified track.
                 * @param wellTrack  (Required) track to get index
                 */
                indexOfTrack(wellTrack: geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack): number;
                /**
                 * Returns the track header if it exists
                 * @param track  (Required) current track
                 */
                getTrackHeader(track: geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack): any;
                /**
                 * Returns the track footer if it exists
                 * @param track  (Required) current track
                 */
                getTrackFooter(track: geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack): any;
                /**
                 * Returns selected Well Track
                 */
                getSelectedTrack(): geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack;
                /**
                 * Set selected well
                 * @param wellTrack  (Required) track to select
                 */
                setSelectedTrack(wellTrack: geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack): this;
                /**
                 * Does zoom in (namely, scales with predefined scale factor (5 / 4))
                 */
                zoomIn(): this;
                /**
                 * Does zoom out (namely, scales with predefined scale factor (4 / 5))
                 */
                zoomOut(): this;
                /**
                 * Sets center visible model limits
                 * @param rect  (Required) a new center model visible limits
                 */
                setCenterVisibleModelLimits(rect: geotoolkit.util.Rect): this;
                /**
                 * Change scale of well
                 * @param scaleX  (Required) horizontal scale factor
                 * @param scaleY  (Optional) vertical scale factor
                 */
                scale(scaleX: number, scaleY?: number): this;
                /**
                 * Sets mode to keep fixed width of tracks and wells for horizontal scale
                 * @param enable  (Required) enable fixed width of wells  during scale
                 */
                setFixedTracksWidth(enable: boolean): this;
                /**
                 * Returns mode to keep fixed width of tracks and wells for horizontal scale
                 */
                getFixedTracksWidth(): boolean;
                /**
                 * Sets bounds of the node in the parent coordinates
                 * @param bounds  (Required) bound of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect|any): this;
                /**
                 */
                updateLayout(): this;
                /**
                 * Return true if headers and footers are attached to track
                 */
                isAttachedHeaders(): boolean;
                /**
                 * update Scroll Positions using visible limits and model limits.
                 * @param updateScrollBarState  (Optional) update Scroll Positions using visible limits and model limits or not
                 * @param enableAnimation  (Optional) show animation
                 */
                updateScrollPositions(updateScrollBarState?: boolean, enableAnimation?: boolean): this;
                /**
                 * Update header
                 */
                updateHeader(): this;
                /**
                 * Update footer
                 */
                updateFooter(): this;
                /**
                 * Returns header container. Note that container's bounds are not necessary match with
                 * its visible limits as it can reside in other container. To get/set device header size, use
                 * get/set HeaderHeight() method. if header visible option is 'none' then equals to null
                 */
                getHeaderContainer(): geotoolkit.welllog.HeaderContainer;
                /**
                 * Returns actual header height or model height whenever 'auto' is specified
                 * @param options  (Optional) header options
                 */
                getHeaderHeight(options?: any|string): number;
                /**
                 * Returns actual footer height or model height whenever 'auto' is specified
                 * @param options  (Optional) header options,
                 */
                getFooterHeight(options?: any|string): number;
                /**
                 * Sets footer height
                 * @param height  (Required) footer height in pixels or 'auto' to fit footer height
                 */
                setFooterHeight(height: number|string): this;
                /**
                 * Sets header height
                 * @param height  (Required) header height in pixels or 'auto' to fit header height
                 */
                setHeaderHeight(height: number|string): this;
                /**
                 * Sets some widget options
                 * @param options  (Optional) addition options
                 * @param options.header  (Optional) header options
                 * @param options.header.visible  (Optional) visibility of the headers.
If tracks are created and it is changed from 'none' to true then it doesn't rebuild headers for existing tracks
                 * @param options.header.height  (Optional) header height in pixels or 'auto' to fit header height
                 * @param options.footer  (Optional) footer options
If tracks are created and it is changed from 'none' to true then it doesn't rebuild footers for existing tracks
                 * @param options.footer.visible  (Optional) visibility of the footer. If it is 'none' then it is not created.
                 * @param options.footer.height  (Optional) footer height in pixels or 'auto' to fit footer height
                 */
                setOptions(options?: any | { header?: any | { visible?: boolean|string; height?: number|string; } ; footer?: any | { visible?: boolean|string; height?: number|string; } ; } ): this;
                /**
                 * Returns some widget options
                 */
                getOptions(): {options:{header:{visible:boolean;height:number};footer:{visible:boolean;height:number}}}|any;
                /**
                 * Sets all the properties pertaining to this object see {@link geotoolkit.welllog.multiwell.MultiWellWidget#setOptions}
                 * @param properties  (Optional) JSON containing properties
                 */
                setProperties(properties?: any): this;
                /**
                 * Gets all the properties pertaining to this object
                 * See {@link geotoolkit.welllog.multiwell.MultiWellWidget.getProperties} for details
                 */
                getProperties(): any;
                /**
                 * Returns footer container. Note that container's bounds are not necessary match with
                 * its visible limits as it can reside in other container. To get/set device footer size, use
                 * get/set FooterHeight() method. if footer visible option is 'none' then equals to null
                 */
                getFooterContainer(): geotoolkit.welllog.HeaderContainer;
                /**
                 * Returns track container
                 */
                getTrackContainer(): geotoolkit.welllog.widgets.visuals.LogTrackContainer;
                /**
                 * Distributes the same alignment to all tracks with regard to the top,
                 * the bottom or center of wells
                 * @param depth  (Required) a new wells depth to be aligned to
                 * @param alignment  (Optional) alignment of track according to container visible limits. alignment value is "top", "bottom", "center"
                 */
                alignToDepth(depth: number, alignment?: string): this;
                /**
                 * Distributes the same alignment to all tracks with regard to the top,
                 * the bottom or center of wells by marker name
                 * @param name  (Required) marker name or function to find marker
                 * @param alignment  (Optional) alignment of track according to container visible limits. alignment value is "top", "bottom", "center"
                 */
                alignToMarker(name: string|Function, alignment?: string): this;
                /**
                 * Scroll the  specified track in container then depth of this track is defined by alignment
                 * @param track  (Required) track to scroll
                 * @param depth  (Required) depth of the current track
                 * @param alignment  (Required) alignment of track according to container visible limits. alignment value is "top", "bottom", "center"
                 * @param anchor  (Optional) position of container to be aligned
                 */
                scrollTrackToDepth(track: geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack, depth: number, alignment: string, anchor?: number): this;
                /**
                 * Scroll track by depth on delta depth
                 * @param track  (Required) track to scroll
                 * @param delta  (Required) depth of the current track
                 */
                scrollTrackByDepth(track: geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack, delta: number): this;
                /**
                 * Convert track container vertical space to track depth
                 * @param track  (Required) track
                 * @param depth  (Required) depth
                 */
                convertModelDepthToTrackDepth(track: geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack, depth: number): number;
                /**
                 * Return model track size and position in the model coordinates consider offset and scale.
                 * @param track  (Required) track to return size
                 */
                getModelTrackSize(track: geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack): geotoolkit.util.Rect;
                /**
                 * Return export model limits
                 */
                getExportLimits(): geotoolkit.util.Rect;
                /**
                 * Sets export model limits
                 * @param limits  (Required) export limits
                 */
                setExportLimits(limits: geotoolkit.util.Range): this;
                /**
                 * Return export scale
                 */
                getExportScale(): {options:{scaleX:number;scaleY:number}}|any;
                /**
                 * Sets export scale
                 * @param scaleX  (Required) export scale factor along x coordinate
                 * @param scaleY  (Required) export scale factor along y coordinate
                 */
                setExportScale(scaleX: number, scaleY: number): this;
                /**
                 * Returns exportable element
                 * @param options  (Optional) export options
                 * @param options.documentheader  (Optional) an optional document PDF footer
                 * @param options.documentfooter  (Optional) an optional docuement PDF footer
                 */
                getExportElement(options?: any | { documentheader?: geotoolkit.scene.exports.FooterComponent; documentfooter?: geotoolkit.scene.exports.FooterComponent; } ): geotoolkit.scene.exports.AbstractDocumentElement;
                /**
                 * Used to prepare object before exporting
                 */
                beginExport(): this;
                /**
                 * Used to restore object's state after exporting
                 */
                endExport(): this;
                /**
                 * Gets annotation at specified location
                 * @param location  (Required) Enum of annotation locations used to specify direction to insert
                 */
                getAnnotation(location: geotoolkit.layout.AnnotationLocation): geotoolkit.scene.Group;
                /**
                 * Mark this group to be updated.
                 * @param regions  (Optional) optional array to return invalid rectangles
                 * @param changes  (Optional) optional parameter to specify a reason of changes
                 */
                updateState(regions?: geotoolkit.util.Rect[], changes?: geotoolkit.scene.Node.StateChanges): this;
                /**
                 * Exports the widget content as a PDF file, user has option to select the scale of track in pdf.
                 * @param options  (Optional) option to specify paper parameters and header and footer
                 * @param options.header  (Optional) an optional PDF header
                 * @param options.footer  (Optional) an optional PDF footer
                 * @param options.documentheader  (Optional) an optional document PDF footer
                 * @param options.documentfooter  (Optional) an optional docuement PDF footer
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
                 * @param options.printsettings.drawwesttoeast  (Optional) deprecated (since 2.3) draw pages from West to East. For continuous printing set drawwesttoeast = false
                 * @param options.scalex  (Optional) scale by x from model units to pixels
                 * @param options.scaley  (Optional) scale by y from model units to pixels
                 * @param options.limits  (Optional) export model limits
                 * @param options.limits.x1  (Optional) start limit by default visible limits
                 * @param options.limits.x2  (Optional) end limit by default visible limits
                 * @param options.limits.y1  (Optional) start limit by default visible limits
                 * @param options.limits.y2  (Optional) end limit by default visible limits
                 * @param options.imagescalefactor  (Optional) options to specify the image scale factor, right now 8 is maximum, Math.floor(600 / 72)
                 * @param options.imagecompression  (Optional) options to specify the image compression
                 * @param options.imagecompression.mode  (Optional) image compression method used to exporting pdf.
                 * @param options.imagecompression.quality  (Optional) quality range from 0 to 1 that will express the jpeg image compression quality, available for jpeg mode only.
                 * @param options.imagecompression.speed  (Optional) speed referring to the png compression speed, available  for png mode only.
                 * @param options.streamcompression  (Optional) enable or disable pdf output compression
                 * @param options.pdfstream  (Optional) optional user-customized Stream object
                 */
                exportToPdf(options?: any | { header?: geotoolkit.scene.exports.HeaderComponent; footer?: geotoolkit.scene.exports.FooterComponent; documentheader?: geotoolkit.scene.exports.FooterComponent; documentfooter?: geotoolkit.scene.exports.FooterComponent; output?: string; save?: boolean; printsettings?: any | { paperformat?: any; top?: number; bottom?: number; left?: number; right?: number; orientation?: string; scaling?: string; keepaspectratio?: boolean; continuous?: boolean; drawwesttoeast?: boolean; } ; scalex?: number; scaley?: number; limits?: any | { x1?: any; x2?: any; y1?: any; y2?: any; } ; imagescalefactor?: number; imagecompression?: any | { mode?: geotoolkit.pdf.ImageCompression; quality?: number; speed?: geotoolkit.pdf.SpeedCompression; } ; streamcompression?: boolean; pdfstream?: geotoolkit.util.stream.Stream; } ): geotoolkit.util.Promise;
            }
            /**
             * Well Events enumerator
             */
            interface Events {
                /**
                 * Event type fired when depth scale of the well is changed
                 */
                DepthScaleChanged: string;
            }
            /**
             * Define an interface for well track
             */
            interface IWellTrack {
                /**
                 * Insert a track
                 * @param track  (Required) track to insert
                 * @param trackDirection  (Optional) The location of the track (first, last, etc)
                 * @param trackWidth  (Optional) width of the track in pixels
                 */
                addTrack(track: geotoolkit.welllog.TrackType|geotoolkit.welllog.LogTrack, trackDirection?: geotoolkit.welllog.TrackDirection|number, trackWidth?: number): geotoolkit.welllog.LogTrack;
                /**
                 * Remove the track with headers and footers
                 * @param track  (Required) track to remove
                 */
                removeTrack(track: geotoolkit.welllog.LogTrack): this;
                /**
                 * Returns amount of tracks
                 */
                getTracksCount(): number;
                /**
                 * Returns {geotoolkit.welllog.LogTrack} at specified index
                 * @param index  (Required) index to return track at
                 */
                getTrackAt(index: number): geotoolkit.welllog.LogTrack;
                /**
                 * Return a layer to display markers
                 */
                getMarkerLayer(): geotoolkit.scene.Layer;
                /**
                 * Load template
                 * @param template  (Required) template to be applied to the widget
                 * @param registry  (Optional) registry
                 */
                loadTemplate(template: string, registry?: geotoolkit.persistence.Registry): this;
                /**
                 * Save template
                 * @param registry  (Optional) registry
                 */
                saveTemplate(registry?: geotoolkit.persistence.Registry): string;
                /**
                 * Sets a depth scale factor.
                 * @param scale  (Required) A number of depth units in device unit.
                 * @param scaleUnit  (Optional) scale unit of the display. if it is not specified then it takes from track container
                 * @param deviceUnit  (Optional) device unit of the display. if it is not specified then it takes from track container
                 */
                setDepthScale(scale: number, scaleUnit?: geotoolkit.util.AbstractUnit, deviceUnit?: geotoolkit.util.AbstractUnit): this;
                /**
                 * Return scale to device. How many scale units in one device unit.
                 * @param scaleUnit  (Optional) scale unit of the display. if it is not specified then it takes from track container
                 * @param deviceUnit  (Optional) device unit of the display. if it is not specified then it takes from track container
                 */
                getDepthScale(scaleUnit?: geotoolkit.util.AbstractUnit|string, deviceUnit?: geotoolkit.util.AbstractUnit|string): number;
                /**
                 * Returns depth ot time range
                 */
                getDepthLimits(): geotoolkit.util.Range;
                /**
                 * Sets the same depth or time limits for all tracks
                 * @param minIndex  (Required) min index limit
                 * @param maxIndex  (Optional) max index limit
                 */
                setDepthLimits(minIndex: number|geotoolkit.util.Range, maxIndex?: number): this;
                /**
                 * Return a depth range, which is visible now
                 */
                getVisibleDepthLimits(): geotoolkit.util.Range;
                /**
                 * Sets visible depth limits
                 * @param limits  (Required) 
                 */
                setVisibleDepthLimits(limits: geotoolkit.util.Range): this;
                /**
                 * Returns data source
                 */
                getData(): geotoolkit.data.DataSource;
                /**
                 * Sets a new data model
                 * @param data  (Required) logdata
                 */
                setData(data: geotoolkit.data.DataSource|geotoolkit.data.DataTable|geotoolkit.data.DataTableView): this;
                /**
                 * Return the data binding
                 */
                getDataBinding(): geotoolkit.data.DataBinding;
                /**
                 * Sets the data binding
                 * @param binding  (Required) data binding
                 * @param silent  (Optional) silent mode to forbid
                 */
                setDataBinding(binding: geotoolkit.data.DataBinding, silent?: boolean): this;
                /**
                 * Sets well title
                 * @param title  (Required) well title
                 */
                setTitle(title: string): this;
                /**
                 * Return title
                 */
                getTitle(): string;
                /**
                 * Return tool by name
                 * @param name  (Required) name of the tool
                 */
                getToolByName(name: string): geotoolkit.controls.tools.AbstractTool;
                /**
                 * Returns root tool associated to this widget
                 */
                getTool(): geotoolkit.controls.tools.CompositeTool;
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
                 * Prepares object before exporting and saving state
                 */
                beginExport(): this;
                /**
                 * Used to restore object's state after exporting
                 */
                endExport(): this;
                /**
                 * Resize tracks to fit width of the well
                 */
                fitToWidth(): this;
            }
            /**
             * Define interface for well actions
             */
            interface IWellBehavior {
                /**
                 * Highlight well or track
                 * @param widget  (Required) 
                 * @param track  (Required) track to remove
                 * @param highlight  (Required) 
                 */
                highlight(widget: geotoolkit.welllog.multiwell.MultiWellWidget, track: geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.multiwell.CorrelationTrack, highlight: boolean): any;
                /**
                 * Resize the track width
                 * @param widget  (Required) 
                 * @param track  (Required) track to remove
                 * @param size  (Required) a new size
                 */
                resize(widget: geotoolkit.welllog.multiwell.MultiWellWidget, track: geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.multiwell.CorrelationTrack, size: number): boolean;
                /**
                 * Return true if track is selectable
                 * @param widget  (Required) 
                 * @param track  (Required) track to remove
                 */
                isSelectable(widget: geotoolkit.welllog.multiwell.MultiWellWidget, track: geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.multiwell.CorrelationTrack): boolean;
                /**
                 * Return true if track is movable
                 * @param widget  (Required) 
                 * @param track  (Required) track to remove
                 */
                isMovable(widget: geotoolkit.welllog.multiwell.MultiWellWidget, track: geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.multiwell.CorrelationTrack): boolean;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) an object containing the properties to set
                 */
                setProperties(properties: any): this;
            }
            /**
             * enum for TrackType
             */
            interface TrackType {
                /**
                 * Track
                 */
                WellTrack: number;
                /**
                 * Correlation track
                 */
                CorrelationTrack: number;
            }
            module tools {
                /**
                 * Creates a CorrelationCursor tool. The tool supports events shown below. It provides built-in functions to customize the styles for the tool.
                 */
                class CorrelationCursor extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Creates a CorrelationCursor tool. The tool supports events shown below. It provides built-in functions to customize the styles for the tool.
                     * @param options  (Required) JSON containing cursor options OR multi-well widget
                     * @param options.multiwell  (Required) multi-well widget
                     * @param options.name  (Optional) name of the tool
                     * @param options.linestyle  (Optional) cursor line style
                     * @param name  (Optional) name of the tool
                     */
                    constructor(options: any | { multiwell?: geotoolkit.welllog.multiwell.MultiWellWidget; name?: string; linestyle?: geotoolkit.attributes.LineStyle; } |geotoolkit.welllog.multiwell.MultiWellWidget, name?: string);
                    /**
                     * CorrelationCursor Events
                     */
                    static Events: any;
                    /**
                     */
                    onEnabledStateChanged(): any;
                    /**
                     * Sets line style
                     * @param lineStyle  (Required) line style or options
                     * @param lineStyle.color  (Optional) line color
                     * @param lineStyle.width  (Optional) line width
                     * @param lineStyle.pattern  (Optional) line pattern
                     * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                     */
                    setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                    /**
                     * return line style
                     */
                    getLineStyle(): geotoolkit.attributes.LineStyle;
                    /**
                     * return visible state
                     */
                    isVisible(): boolean;
                    /**
                     * Sets visible
                     * @param visible  (Required) visible attribute set or not
                     */
                    setVisible(visible: boolean): this;
                    /**
                     * The current well depth of the cursor
                     */
                    getDepth(): number;
                    /**
                     * Update position of cursor for the last mouse position. This code can be used
                     * if content is scrolled to display the position of the cursor in the last mouse position
                     */
                    updateCursorPosition(): this;
                    /**
                     * Place the cursor at the specified well depth
                     * @param depth  (Required) well depth
                     * @param silent  (Optional) notification enabled or not
                     */
                    setDepth(depth: number, silent?: boolean): this;
                }
                /**
                 * Creates default implementation of the well navigation tool for well track.
                 * This tool displays navigation for each index track
                 */
                class WellNavigation extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Creates default implementation of the well navigation tool for well track.
                     * This tool displays navigation for each index track
                     * @param wellTrack  (Required) 
                     */
                    constructor(wellTrack: geotoolkit.welllog.multiwell.IWellTrack);
                    /**
                     * Returns navigation tool
                     */
                    getNavigation(): geotoolkit.welllog.widgets.tools.Navigation;
                }
                module Splitter {
                    module Events {
                        /**
                         * onContainerWidthChanged
                         */
                        var onContainerWidthChanged: string;
                        /**
                         * onTrackWidthChanged
                         */
                        var onTrackWidthChanged: string;
                        /**
                         * onCanResize
                         */
                        var onCanResize: string;
                    }
                }
                module CorrelationCursor {
                    /**
                     * CorrelationCursor Events
                     */
                    interface Events {
                        /**
                         * onPositionChanged
                         */
                        onPositionChanged: string;
                        /**
                         * onPointerUp
                         */
                        onPointerUp: string;
                    }
                }
            }
            module MultiWellWidget {
                module Events {
                    /**
                     * It occurs when widget can request data. It happens if visible limits or scale is changed.
                     */
                    var DataUpdating: string;
                }
            }
            module correlation {
                /**
                 * Define an abstract correlation to displayed in the correlation track
                 */
                class Correlation extends geotoolkit.scene.Node {
                    /**
                     * Define an abstract correlation to displayed in the correlation track
                     * @param options  (Optional) options
                     * @param options.linestyle  (Optional) applied style
                     */
                    constructor(options?: any | { linestyle?: geotoolkit.attributes.LineStyle; } );
                    /**
                     * Sets correlation marker style
                     * @param lineStyle  (Required) line style or options
                     * @param lineStyle.color  (Optional) line color
                     * @param lineStyle.width  (Optional) line width
                     * @param lineStyle.pattern  (Optional) line pattern
                     * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                     */
                    setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                    /**
                     * Returns line style of correlation.
                     */
                    getLineStyle(): geotoolkit.attributes.LineStyle;
                    /**
                     * Sets well
                     * @param leftWell  (Required) left well
                     * @param rightWell  (Required) right well
                     */
                    setWells(leftWell: geotoolkit.welllog.multiwell.IWellTrack, rightWell: geotoolkit.welllog.multiwell.IWellTrack): this;
                    /**
                     * Return left well
                     */
                    getLeftWell(): geotoolkit.welllog.multiwell.IWellTrack;
                    /**
                     * Return right well
                     */
                    getRightWell(): geotoolkit.welllog.multiwell.IWellTrack;
                    /**
                     * Gets all the properties pertaining to this object
                     */
                    getProperties(): any;
                    /**
                     * Sets all the properties pertaining to this object
                     * @param properties  (Required) An object containing the properties to set
                     * @param properties.linestyle  (Optional) line style
                     */
                    setProperties(properties: any | { linestyle?: geotoolkit.attributes.LineStyle; } ): this;
                }
                /**
                 * Define line correlation to connect two depth on different wells
                 */
                class CorrelationMarker extends geotoolkit.welllog.multiwell.correlation.Correlation {
                    /**
                     * Define line correlation to connect two depth on different wells
                     * @param leftDepth  (Required) depth on left well
                     * @param rightDepth  (Required) depth on right well
                     * @param options  (Optional) additional options
                     */
                    constructor(leftDepth: number, rightDepth: number, options?: any);
                    /**
                     * Set depth for correlation
                     * @param leftDepth  (Required) depth of the left well
                     * @param rightDepth  (Required) depth of the right well
                     */
                    setDepth(leftDepth: number, rightDepth: number): this;
                    /**
                     * Returns depth of the left well
                     */
                    getLeftDepth(): number;
                    /**
                     * Returns depth of the right well
                     */
                    getRightDepth(): number;
                    /**
                     * Render
                     * @param context  (Required) Rendering Context
                     */
                    render(context: geotoolkit.renderer.RenderingContext): any;
                }
                /**
                 * Define polygon correlation to connect two ranges of depths on different wells
                 */
                class CorrelationRange extends geotoolkit.welllog.multiwell.correlation.Correlation {
                    /**
                     * Define polygon correlation to connect two ranges of depths on different wells
                     * @param leftStartDepth  (Required) start depth on left well
                     * @param rightStartDepth  (Required) start depth on right well
                     * @param leftEndDepth  (Required) end depth of left well
                     * @param rightEndDepth  (Required) end depth of right well
                     * @param options  (Optional) additional options
                     */
                    constructor(leftStartDepth: number, rightStartDepth: number, leftEndDepth: number, rightEndDepth: number, options?: any);
                    /**
                     * Sets correlation fill style to fill range from two set of depths
                     * @param fillStyle  (Required) a new fill style
                     * @param fillStyle.color  (Optional) color
                     * @param fillStyle.pattern  (Optional) pattern
                     * @param fillStyle.foreground  (Optional) foreground color
                     * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                     */
                    setFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
                    /**
                     * Return the current fill style for correlation
                     */
                    getFillStyle(): geotoolkit.attributes.FillStyle;
                    /**
                     * Set start depth for correlation
                     * @param leftDepth  (Required) depth for left well
                     * @param rightDepth  (Required) depth for right well
                     */
                    setStartDepth(leftDepth: number, rightDepth: number): this;
                    /**
                     * Set end depth for correlation
                     * @param leftDepth  (Required) depth for left well
                     * @param rightDepth  (Required) depth for right well
                     */
                    setEndDepth(leftDepth: number, rightDepth: number): this;
                    /**
                     * Returns depth range for the left well
                     */
                    getLeftDepthRange(): geotoolkit.util.Range;
                    /**
                     * Returns depth range for the right well
                     */
                    getRightDepthRange(): geotoolkit.util.Range;
                    /**
                     * Gets all the properties pertaining to this object
                     */
                    getProperties(): any;
                    /**
                     * Sets all the properties pertaining to this object
                     * @param properties  (Required) An object containing the properties to set
                     * @param properties.linestyle  (Optional) line style
                     */
                    setProperties(properties: any | { linestyle?: geotoolkit.attributes.LineStyle; } ): this;
                }
            }
            module overlays {
                /**
                 * Creates implementation of the multi welllog annotation overlay
                 */
                class AnnotationOverlay extends geotoolkit.widgets.overlays.AnnotationOverlay {
                    /**
                     * Creates implementation of the multi welllog annotation overlay
                     * @param widget  (Required) 
                     */
                    constructor(widget: geotoolkit.welllog.multiwell.MultiWellWidget);
                    /**
                     * Disposes this node, once disposes a node should not be used anymore.<br>
                     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
                     * Also aggressively 'cleanup' this node by setting some of its members to null.
                     */
                    dispose(): any;
                    /**
                     */
                    protected initializeTools(): any;
                    /**
                     */
                    protected getModel(): geotoolkit.scene.Group;
                }
            }
        }
    }
}
