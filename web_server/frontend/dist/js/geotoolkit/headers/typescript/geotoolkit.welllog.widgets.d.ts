declare module geotoolkit {
    module welllog {
        module widgets {
            /**
             * enum for TrackType
             */
            var TrackType: any;
            /**
             * Enum for Track Direction
             */
            var TrackDirection: any;
            /**
             * <p>
             * The WellLog widget is a widget that is specialized for well related data. It uses classes from the WellLog toolkit internally.<br>
             * The main way to configure and customize the default look and feel of the widget is by using the different setOptions() function in the constructor.<br>
             * The widget content can be manipulated through add/remove/get-Track() and the Track content can be controlled through track.add/remove/get-Child() as shown in example below.<br>
             * Similarly all supported well data (track, index track, log curves, log fills, log2d, markers etc) can be manipulated.<br>
             * Widget has header, footer containers to display tracks and visuals headers and track container to display tracks.
             * The widget provides builtin support for Time/Depth modes, Resizing headers and footers, Selection and highlighting, Track resizing.
             * 
             * The Default tools include:
             * <ul>
             *  <li> Horizontal scrollbar </li>
             *  <li> Vertical scrollbars (header, tracks, footer) </li>
             *  <li> Panning </li>
             *  <li> Pinching </li>
             *  <li> Crosshair </li>
             *  <li> Header/Footer splitters (for resizing) </li>
             *  <li> Track splitters (for resizing) </li>
             *  <li> Rubberband (for rubberband Zoom) </li>
             *  <li> Selection </li>
             *  <li> drag-and-drop (for drag'n drop track or curve) </li>
             * </ul>
             * </p>
             */
            class WellLogWidget extends geotoolkit.widgets.BaseWidget implements geotoolkit.scene.exports.IExportable {
                /**
                 * <p>
                 * The WellLog widget is a widget that is specialized for well related data. It uses classes from the WellLog toolkit internally.<br>
                 * The main way to configure and customize the default look and feel of the widget is by using the different setOptions() function in the constructor.<br>
                 * The widget content can be manipulated through add/remove/get-Track() and the Track content can be controlled through track.add/remove/get-Child() as shown in example below.<br>
                 * Similarly all supported well data (track, index track, log curves, log fills, log2d, markers etc) can be manipulated.<br>
                 * Widget has header, footer containers to display tracks and visuals headers and track container to display tracks.
                 * The widget provides builtin support for Time/Depth modes, Resizing headers and footers, Selection and highlighting, Track resizing.
                 * 
                 * The Default tools include:
                 * <ul>
                 *  <li> Horizontal scrollbar </li>
                 *  <li> Vertical scrollbars (header, tracks, footer) </li>
                 *  <li> Panning </li>
                 *  <li> Pinching </li>
                 *  <li> Crosshair </li>
                 *  <li> Header/Footer splitters (for resizing) </li>
                 *  <li> Track splitters (for resizing) </li>
                 *  <li> Rubberband (for rubberband Zoom) </li>
                 *  <li> Selection </li>
                 *  <li> drag-and-drop (for drag'n drop track or curve) </li>
                 * </ul>
                 * </p>
                 * @param options  (Optional) addition options
                 * @param options.horizontalscrollable  (Optional) defines if plot displays horizontal scrollbars, true | false | 'auto' | 'floating'
                 * @param options.verticalscrollable  (Optional) defines if plot displays vertical scrollbars, true | false | 'auto' | 'floating'
                 * @param options.indextype  (Optional) primary index types
                 * @param options.indexunit  (Optional) primary index unit
                 * @param options.deviceunit  (Optional) primary device unit
                 * @param options.timezone  (Optional) time zone for time axis
                 * @param options.timezoneoffset  (Optional) time zone offset for date time axis
                 * @param options.indent  (Optional) indent
                 * @param options.header  (Optional) header options
                 * @param options.header.visible  (Optional) visibility of the headers, if it is 'none' then header is not created
                 * @param options.header.margin  (Optional) margin margin between header components
                 * @param options.header.padding  (Optional) padding padding inside header components
                 * @param options.header.display-type  (Optional) display-type
                 * @param options.header.height  (Optional) header height
                 * @param options.header.border  (Optional) defines properties for header outer border
                 * @param options.header.border.visible  (Optional) visibility of the border
                 * @param options.header.border.color  (Optional) color of border border
                 * @param options.header.viewcache  (Optional) enable tiled cache. It increase rendering performance for historical data
                 * @param options.header.viewcachesize  (Optional) deprecated (since 2.6) define view cache parameters. Use options.header.viewcache to set up cache.
                 * @param options.header.viewcachesize.width  (Optional) deprecated (since 2.6) set tiled cache size. Use options.header.viewcache to set up cache.
                 * @param options.header.viewcachesize.height  (Optional) deprecated (since 2.6) set tiled cache size. Use options.header.viewcache to set up cache.
                 * @param options.footer  (Optional) footer options
                 * @param options.footer.visible  (Optional) visibility of the footer, if it is 'none' then footer is not created
                 * @param options.footer.margin  (Optional) margin margin between footer components
                 * @param options.footer.padding  (Optional) padding padding inside footer components
                 * @param options.footer.display-type  (Optional) display-type
                 * @param options.footer.height  (Optional) footer height
                 * @param options.footer.border  (Optional) defines properties for footer outer border
                 * @param options.footer.border.visible  (Optional) visibility of the border
                 * @param options.footer.border.color  (Optional) color of border border
                 * @param options.footer.viewcache  (Optional) enable tiled cache. It increase rendering performance for historical data
                 * @param options.footer.viewcachesize  (Optional) deprecated (since 2.6) define view cache parameters. Use options.footer.viewcache to set up cache.
                 * @param options.footer.viewcachesize.width  (Optional) deprecated (since 2.6) set tiled cache size. Use options.footer.viewcache to set up cache.
                 * @param options.footer.viewcachesize.height  (Optional) deprecated (since 2.6) set tiled cache size. Use options.footer.viewcache to set up cache.
                 * @param options.viewcache  (Optional) enable tiled cache. It increase rendering performance for historical data
                 * @param options.viewcachesize  (Optional) deprecated (since 2.6) optional properties of view cache. Use options.viewcache to set up cache.
                 * @param options.viewcachesize.width  (Optional) deprecated (since 2.6) set tiled cache size. Use options.viewcache to set up cache.
                 * @param options.viewcachesize.height  (Optional) deprecated (since 2.6) set tiled cache size. Use options.viewcache to set up cache.
                 * @param options.border  (Optional) defines properties for widget outer border
                 * @param options.border.visible  (Optional) visibility of the border
                 * @param options.border.color  (Optional) color of border border
                 * @param options.trackcontainer  (Optional) defines properties for track container
                 * @param options.trackcontainer.border  (Optional) defines properties for track container outer border
                 * @param options.trackcontainer.border.visible  (Optional) visibility of the border
                 * @param options.trackcontainer.border.color  (Optional) color of border border
                 * @param options.trackcontainer.track  (Optional) options of track inside the track container
                 * @param options.trackcontainer.track.borderstrategy  (Optional) apply a border strategy to the LogTrack class
                 * @param options.trackcontainer.verticalflip  (Optional) specify direction of the vertical axis. By default it goes from top to bottom. if it is true
then an axis goes from bottom to top.
                 * @param options.track  (Optional) defines properties for track
                 * @param options.track.background  (Optional) defines properties for track background
                 * @param options.track.border  (Optional) defines properties for track border
                 * @param options.track.border.visible  (Optional) visibility of the border
                 * @param options.track.border.color  (Optional) color of border border
                 * @param options.track.header  (Optional) optional track header properties
                 * @param options.track.header.visibletracktitle  (Optional) visibility of track title
                 * @param options.track.header.titlefirst  (Optional) order of the track title header
                 * @param options.track.header.firsttolast  (Optional) order of the track child headers
                 * @param options.track.header.toptobottom  (Optional) position of the track child headers
                 * @param options.track.header.border  (Optional) optional track header properties
                 * @param options.track.header.border.visible  (Optional) visibility of the track header border
                 * @param options.track.header.border.color  (Optional) color of track header border
                 * @param options.track.header.border.width  (Optional) line width of track header border
                 * @param options.track.header.border.background  (Optional) color of border background
                 * @param options.track.footer  (Optional) optional track footer properties
                 * @param options.track.footer.visibletracktitle  (Optional) visibility of track title
                 * @param options.track.footer.titlefirst  (Optional) order of the track title footer
                 * @param options.track.footer.firsttolast  (Optional) order of the track child footers
                 * @param options.track.footer.toptobottom  (Optional) position of the track child footers
                 * @param options.track.footer.border  (Optional) optional track footer properties
                 * @param options.track.footer.border.visible  (Optional) visibility of the track footer border
                 * @param options.track.footer.border.color  (Optional) color of track footer border
                 * @param options.track.footer.border.width  (Optional) line width of track footer border
                 * @param options.track.footer.border.background  (Optional) color of border background
                 * @param options.gridlinestyle  (Optional) grid line style
                 * @param options.indextrack  (Optional) defines properties for index track
                 * @param options.indextrack.styles  (Optional) index track line styles and text styles
                 * @param options.indextrack.labelformat  (Optional) custom label format function
                 * @param options.indextrack.axis  (Optional) axis settings
                 * @param options.indextrack.axis.name  (Optional) name of axis
                 * @param options.indextrack.axis.locale  (Optional) locale for tickgenerator of axis
                 * @param options.highlight  (Optional) define highlight properties
                 * @param options.highlight.cssclass  (Optional) define highlight class name, see cssstyle.html tutorial
                 * @param options.highlight.linestyle  (Optional) define line style attribute for visual highlight
                 * @param options.highlight.fillstyle  (Optional) define fill style attribute for visual highlight
                 * @param options.orientation  (Optional) set orientation of the well log widget
                 * @param options.nodefilter  (Optional) node filter for visual which can be selected
                 * @param options.bounds  (Optional) bounds of the node
                 * @param options.range  (Optional) min and max depth range.
                 */
                constructor(options?: any | { horizontalscrollable?: boolean|string; verticalscrollable?: boolean|string; indextype?: string; indexunit?: string; deviceunit?: string; timezone?: number; timezoneoffset?: number; indent?: number; header?: any | { visible?: boolean|string; margin?: number; padding?: number; "display-type"?: geotoolkit.welllog.HeaderContainer.DisplayType; height?: number; border?: any | { visible?: boolean; color?: string; } ; viewcache?: boolean|geotoolkit.scene.Cache; viewcachesize?: any | { width?: number; height?: number; } ; } ; footer?: any | { visible?: boolean|string; margin?: number; padding?: number; "display-type"?: geotoolkit.welllog.HeaderContainer.DisplayType; height?: number; border?: any | { visible?: boolean; color?: string; } ; viewcache?: boolean|geotoolkit.scene.Cache; viewcachesize?: any | { width?: number; height?: number; } ; } ; viewcache?: boolean|geotoolkit.scene.Cache; viewcachesize?: any | { width?: number; height?: number; } ; border?: any | { visible?: boolean; color?: string; } ; trackcontainer?: any | { border?: any | { visible?: boolean; color?: string; } ; track?: any | { borderstrategy?: any; } ; verticalflip?: any; } ; track?: any | { background?: geotoolkit.attributes.FillStyle|any; border?: any | { visible?: boolean; color?: string; } ; header?: any | { visibletracktitle?: boolean; titlefirst?: boolean; firsttolast?: boolean; toptobottom?: boolean; border?: any | { visible?: boolean; color?: string; width?: number; background?: string; } ; } ; footer?: any | { visibletracktitle?: boolean; titlefirst?: boolean; firsttolast?: boolean; toptobottom?: boolean; border?: any | { visible?: boolean; color?: string; width?: number; background?: string; } ; } ; } ; gridlinestyle?: any|geotoolkit.attributes.LineStyle; indextrack?: any | { styles?: any; labelformat?: any; axis?: any | { name?: string; locale?: string; } ; } ; highlight?: any | { cssclass?: string; linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; } ; orientation?: geotoolkit.util.Orientation; nodefilter?: Function; bounds?: geotoolkit.util.Rect|any; range?: geotoolkit.util.Range; } );
                /**
                 * Gets annotation at specified location
                 * @param location  (Required) Enum of annotation locations used to specify direction to insert
                 */
                getAnnotation(location: geotoolkit.layout.AnnotationLocation): geotoolkit.scene.Group;
                /**
                 * enum for Events triggered by the WellLog Widget.
                 */
                static Events: any;
                /**
                 * Returns some widget options
                 */
                getOptions(): {options:{header:{visible:boolean;height:number};footer:{visible:boolean;height:number}}}|any;
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
                 * Sets header scrollbar visibility flag
                 * @param value  (Required) visibility option
                 */
                setHeaderScrollVisible(value: boolean): this;
                /**
                 * Gets visibility flag for the header scroll bar
                 */
                getHeaderScrollVisible(): boolean;
                /**
                 * Sets footer scrollbar visibility flag
                 * @param value  (Required) visibility flag
                 */
                setFooterScrollVisible(value: boolean): this;
                /**
                 * Gets visibility flag for the footer header scroll bar
                 */
                getFooterScrollVisible(): boolean;
                /**
                 * Sets some widget options
                 * @param options  (Optional) addition options
                 * @param options.header  (Optional) header options
                 * @param options.header.visible  (Optional) visibility of the headers
                 * @param options.header.height  (Optional) header height in pixels or 'auto' to fit header height
                 * @param options.footer  (Optional) footer options
                 * @param options.footer.visible  (Optional) visibility of the footer
                 * @param options.footer.height  (Optional) footer height in pixels or 'auto' to fit footer height
                 */
                setOptions(options?: any | { header?: any | { visible?: boolean; height?: number|string; } ; footer?: any | { visible?: boolean; height?: number|string; } ; } ): this;
                /**
                 * Attach or detach header and footer
                 * @param enable  (Required) enable or disable attached headers
                 */
                setAttachedHeaders(enable: boolean): this;
                /**
                 * Return true if headers and footers are attached to track
                 */
                isAttachedHeaders(): boolean;
                /**
                 * Add depth markers
                 * @param depths  (Optional) depths
                 * @param lineStyle  (Optional) line style or options
                 */
                setDepthMarkers(depths?: number[]|number, lineStyle?: geotoolkit.attributes.LineStyle|any): this;
                /**
                 * Returns manipulator overlay to draw temporary shapes on top of the track container
                 */
                getTrackManipulatorLayer(): geotoolkit.scene.Layer;
                /**
                 * Function call in the constructor to initialize tools in the widget
                 */
                protected initializeTools(): this;
                /**
                 * Set annotation sizes
                 * @param annotationSizes  (Required) annotation sizes
                 * @param annotationSizes.west  (Optional) a size of west annotation
                 * @param annotationSizes.east  (Optional) a size of east annotation
                 * @param annotationSizes.south  (Optional) a size of south annotation (if size is null it will be equal to footer height if it is visible)
                 * @param annotationSizes.north  (Optional) a size of north annotation (if size is null it will be equal to header height if it is visible)
                 */
                setAnnotationSize(annotationSizes: any | { west?: number; east?: number; south?: number; north?: number; } ): this;
                /**
                 * Raising an event 'visibleDepthLimitsChanged'
                 * eventName : (WellLogWidget.Events.VisibleDepthLimitsChanged)
                 * @param oldLimits  (Required) old visible limits
                 * @param newLimits  (Required) visible limits
                 */
                onVisibleDepthLimitsChanged(oldLimits: geotoolkit.util.Range, newLimits: geotoolkit.util.Range): this;
                /**
                 * Sets the axis header type
                 * @param headerType  (Required) The axis header type enum.
                 */
                setAxisHeaderType(headerType: geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType): this;
                /**
                 * Highlights header for the specified visual (if header exists)
                 * @param visual  (Required) a reference visual
                 * @param highlight  (Required) boolean value that indicating whether the header must be highlighted or de-highlighted
                 */
                protected highlightVisualHeader(visual: geotoolkit.welllog.LogTrack|geotoolkit.welllog.LogAbstractVisual, highlight: boolean): any;
                /**
                 * Highlights a visual or track. Called whenever a visual is selected to highlight it. <br>
                 * If user selects a curve and the track, the curve,track and header are highlighted. Programmatically deselecting a track doesn't automatically deselect curves.<br>
                 * Deselect all selected tracks and visuals using the example shown below.
                 * @param visual  (Required) The visual to highlight
                 * @param highlight  (Required) the status of the highlight
                 */
                highlightVisual(visual: geotoolkit.welllog.LogTrack|geotoolkit.welllog.LogAbstractVisual, highlight: boolean): this;
                /**
                 * return selected track collection
                 */
                getSelectedTracks(): geotoolkit.welllog.LogTrack[];
                /**
                 * Return an array of the selected visuals for the specified track. if track is not specified
                 * then all selected visuals are returned. This method is a helper method and uses selected visuals
                 * from 'pick' tool. The code below shows how to get access to all selected tracks and visuals instead
                 * @param track  (Optional) track to return selected visuals specified by node filter
                 */
                getSelectedVisuals(track?: geotoolkit.welllog.LogTrack): geotoolkit.welllog.LogAbstractVisual[];
                /**
                 * Return a depth range, which is visible now
                 */
                getVisibleDepthLimits(): geotoolkit.util.Range;
                /**
                 * Sets visible depth limits
                 * @param fromIndex  (Required) fromindex limit
                 * @param toIndex  (Optional) toindex limit
                 */
                setVisibleDepthLimits(fromIndex: number|geotoolkit.util.Range, toIndex?: number): this;
                /**
                 * Insert a track
                 * @param track  (Required) track to insert
                 * @param track.type  (Optional) track type to insert
                 * @param track.name  (Optional) track name
                 * @param track.width  (Optional) track width
                 * @param track.gridlinestyle  (Optional) grid line style
                 * @param track.background  (Optional) track background
                 * @param track.border  (Optional) track border options
                 * @param track.border.visible  (Optional) track border visibility
                 * @param track.border.color  (Optional) track border line style
                 * @param track.indextrack  (Optional) index track options
                 * @param track.indextrack.style  (Optional) index track tick styles
                 * @param track.indextrack.labelformat  (Optional) index track label format
                 * @param track.logtrack  (Optional) log track options
                 * @param track.logtrack.decadecount  (Optional) log track decade count
                 * @param track.logtrack.reverse  (Optional) log track reverse direction
                 * @param trackDirection  (Optional) The location of the track (first, last, etc)
                 * @param trackWidth  (Optional) width of the track in pixels
                 */
                addTrack(track: any | { type?: geotoolkit.welllog.TrackType; name?: string; width?: number; gridlinestyle?: any; background?: any|string|geotoolkit.attributes.FillStyle; border?: any | { visible?: boolean; color?: any|string|geotoolkit.attributes.LineStyle; } ; indextrack?: any | { style?: any; labelformat?: any; } ; logtrack?: any | { decadecount?: number; reverse?: boolean; } ; } |geotoolkit.welllog.TrackType|geotoolkit.welllog.LogTrack, trackDirection?: geotoolkit.welllog.TrackDirection, trackWidth?: number): geotoolkit.welllog.LogTrack;
                /**
                 * Insert track to the container at specified index
                 * @param track  (Required) track to insert
                 * @param index  (Required) index of the track
                 * @param trackWidth  (Optional) optional track width
                 */
                insertTrack(track: geotoolkit.welllog.TrackType|geotoolkit.welllog.LogTrack, index: number, trackWidth?: number): geotoolkit.welllog.LogTrack;
                /**
                 * Remove the track with headers and footers
                 * @param track  (Required) track to remove
                 */
                removeTrack(track: geotoolkit.welllog.LogTrack): this;
                /**
                 * Returns track options
                 * @param track  (Required) welllogtrack
                 */
                getTrackOptions(track: geotoolkit.welllog.LogTrack): any;
                /**
                 * Sets track options
                 * @param track  (Required) log track
                 * @param options  (Required) track options
                 * @param options.name  (Optional) track name
                 * @param options.type  (Optional) track type
                 * @param options.autolabelrotation  (Optional) enable or disable automatic label rotation for index track
                 * @param options.index  (Optional) track index grid settings, only available when track type is NOT IndexTrack
                 * @param options.index.major  (Optional) track index grid major settings
                 * @param options.index.major.visible  (Optional) track index grid major visibility
                 * @param options.index.major.style  (Optional) track index grid major line style
                 * @param options.index.minor  (Optional) track index grid minor settings
                 * @param options.index.minor.visible  (Optional) track index grid minor visibility
                 * @param options.index.minor.style  (Optional) track index grid minor line style
                 * @param options.value  (Optional) track value grid settings, only available when track type is NOT IndexTrack
                 * @param options.value.logstart  (Optional) log start, only available when track type is LogTrack
                 * @param options.value.logstop  (Optional) log stop, only available when track type is LogTrack
                 * @param options.value.logscale  (Optional) log scale, only available when track type is LogTrack
                 * @param options.value.logdecades  (Optional) log decades, only available when track type is LogTrack
                 * @param options.value.major  (Optional) track value grid major settings
                 * @param options.value.major.increment  (Optional) major increment, only available when track type is LinearTrack
                 * @param options.value.major.visible  (Optional) track value grid major visibility
                 * @param options.value.major.style  (Optional) track value grid major line style
                 * @param options.value.minor  (Optional) track value grid minor settings
                 * @param options.value.minor.increment  (Optional) minor increment, only available when track type is LinearTrack
                 * @param options.value.minor.visible  (Optional) track value grid minor visibility
                 * @param options.value.minor.style  (Optional) track value grid minor line style
                 * @param options.block  (Optional) block settings
                 * @param options.block.visible  (Optional) block visibility
                 * @param options.block.position  (Optional) block position
                 * @param options.axis  (Optional) axis settings
                 * @param options.axis.name  (Optional) name of axis
                 * @param options.axis.locale  (Optional) locale for tickgenerator of axis
                 * @param options.axis.timezone  (Optional) time zone for time axis
                 * @param options.axis.timezoneoffset  (Optional) time zone offset for date time axis
                 */
                setTrackOptions(track: geotoolkit.welllog.LogTrack, options: any | { name?: string; type?: geotoolkit.welllog.TrackType|number; autolabelrotation?: boolean; index?: any | { major?: any | { visible?: boolean; style?: any; } ; minor?: any | { visible?: boolean; style?: any; } ; } ; value?: any | { logstart?: number; logstop?: number; logscale?: number; logdecades?: number; major?: any | { increment?: number; visible?: boolean; style?: any; } ; minor?: any | { increment?: number; visible?: boolean; style?: any; } ; } ; block?: any | { visible?: boolean; position?: geotoolkit.welllog.LogBlock.Position; } ; axis?: any | { name?: string; locale?: string; timezone?: number; timezoneoffset?: number; } ; } ): geotoolkit.welllog.LogTrack;
                /**
                 * Updates layout(s)
                 * @param targets  (Optional) list of nodes to update layout
                 * @param updateScrollBarState  (Optional) update scroll bar flag
                 */
                updateLayout(targets?: geotoolkit.scene.Node[], updateScrollBarState?: boolean): this;
                /**
                 * update Scroll Positions using visible limits and model limits.
                 * @param updateScrollBarState  (Optional) update Scroll Positions using visible limits and model limits or not
                 * @param enableAnimation  (Optional) show animation
                 */
                updateScrollPositions(updateScrollBarState?: boolean, enableAnimation?: boolean): this;
                /**
                 * @param event  (Required) type of event
                 * @param source  (Required) source who called the event
                 * @param args  (Required) event arguments
                 */
                notify(event: string, source: geotoolkit.scene.Node, args: any): any;
                /**
                 * Update header
                 */
                updateHeader(): any;
                /**
                 * Update footer
                 */
                updateFooter(): any;
                /**
                 * Returns header container. Note that container's bounds are not necessary match with
                 * its visible limits as it can reside in other container. To get/set device header size, use
                 * get/set HeaderHeight() method
                 */
                getHeaderContainer(): geotoolkit.welllog.HeaderContainer;
                /**
                 * Returns footer container. Note that container's bounds are not necessary match with
                 * its visible limits as it can reside in other container. To get/set device footer size, use
                 * get/set FooterHeight() method
                 */
                getFooterContainer(): geotoolkit.welllog.HeaderContainer;
                /**
                 */
                getTrackContainer(): geotoolkit.welllog.widgets.visuals.LogTrackContainer;
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
                 * Returns track at specified position in plot coordinate
                 * @param x  (Required) x coordinate position
                 * @param y  (Optional) y coordinate position
                 */
                getTrackAtPosition(x: number|geotoolkit.util.Point, y?: number): geotoolkit.welllog.LogTrack;
                /**
                 * Return index of track
                 * @param track  (Required) to get index
                 */
                getTrackIndex(track: geotoolkit.welllog.LogTrack): number;
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
                getDataBinding(): geotoolkit.data.DataBinding|geotoolkit.data.DataBindingRegistry;
                /**
                 * Sets the data binding
                 * @param binding  (Required) data binding
                 * @param silent  (Optional) silent mode to forbid
                 */
                setDataBinding(binding: geotoolkit.data.DataBinding|geotoolkit.data.DataBindingRegistry, silent?: boolean): this;
                /**
                 * Sets index unit
                 * @param unit  (Required) index unit
                 */
                setIndexUnit(unit: geotoolkit.util.AbstractUnit|string): this;
                /**
                 * Gets index unit
                 */
                getIndexUnit(): string;
                /**
                 * Sets device unit
                 * @param unit  (Required) device unit
                 */
                setDeviceUnit(unit: geotoolkit.util.AbstractUnit|string): this;
                /**
                 * Gets device unit
                 */
                getDeviceUnit(): string;
                /**
                 * Gets index type
                 */
                getIndexType(): string;
                /**
                 * Sets index type
                 * @param type  (Required) index type
                 */
                setIndexType(type: string): this;
                /**
                 * Sets the same depth limits for all tracks
                 * @param minIndex  (Required) min index limit
                 * @param maxIndex  (Optional) max index limit
                 */
                setDepthLimits(minIndex: number|geotoolkit.util.Range, maxIndex?: number): this;
                /**
                 * Returns depth range.
                 */
                getDepthLimits(): geotoolkit.util.Range;
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
                 * Change scale
                 * @param scaleY  (Required) scaleY
                 * @param scaleX  (Optional) scaleX
                 */
                scale(scaleY: number, scaleX?: number): this;
                /**
                 * Display the whole scene graph. Resets the zoom level/scale to fit the whole tracks height in the visible area
                 */
                fitToHeight(): this;
                /**
                 * Resize widget width to fit it in visible area
                 */
                fitToWidth(): this;
                /**
                 * Scroll to index position
                 * @param index  (Required) index to scroll to
                 * @param position  (Optional) position to scroll to
                 * @param enableAnimation  (Optional) show animation or not
                 */
                scrollToIndex(index: number, position?: geotoolkit.welllog.TrackContainer.ScrollToLocation, enableAnimation?: boolean): this;
                /**
                 * Set track width and layout remains track
                 * @param width  (Required) track width
                 * @param track  (Required) track to change track width
                 */
                setTrackWidth(width: number, track: geotoolkit.welllog.LogTrack|any[]): this;
                /**
                 * Returns the track header if it exists
                 * @param track  (Required) current welllog track
                 */
                getTrackHeader(track: geotoolkit.welllog.LogTrack): any;
                /**
                 * Returns the track footer if it exists
                 * @param track  (Required) current welllog track
                 */
                getTrackFooter(track: geotoolkit.welllog.LogTrack): any;
                /**
                 * change highlight linestyle
                 * @param linestyle  (Required) highlight linestyle
                 */
                setHighlightLineStyle(linestyle: geotoolkit.attributes.LineStyle): this;
                /**
                 * get border highlight line style
                 */
                getHighlightLineStyle(): geotoolkit.attributes.LineStyle|any;
                /**
                 * change highlight fillstyle
                 * @param fillstyle  (Required) highlight fillstyle
                 */
                setHighlightFillStyle(fillstyle: geotoolkit.attributes.FillStyle): this;
                /**
                 * get track highlight fillstyle
                 */
                getHighlightFillStyle(): geotoolkit.attributes.FillStyle|any;
                /**
                 * Calculate a real size of tracks
                 */
                getTracksSize(): number;
                /**
                 * Sets node filter for selection tool
                 * @param nodeFilter  (Required) filter that allows to filter selected nodes.
                 */
                setNodeFilter(nodeFilter: Function): this;
                /**
                 * Exports the widget content as a PDF file, user has option to select the scale of track in pdf.
                 * @param options  (Optional) option to specify paper parameters and header and footer
                 * @param options.header  (Optional) an optional PDF header
                 * @param options.footer  (Optional) an optional PDF footer
                 * @param options.documentheader  (Optional) an optional document PDF header
                 * @param options.documentfooter  (Optional) an optional document PDF footer
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
                 * @param options.limits  (Optional) export depth or time limits
                 * @param options.limits.start  (Optional) start limit by default visible limits
                 * @param options.limits.end  (Optional) end limit by default visible limits
                 * @param options.scale  (Optional) export scale from model index unit to pixels by default as is
                 * @param options.deviceunit  (Optional) define how many depth units in one device unit.
                 * @param options.imagescalefactor  (Optional) options to specify the image scale factor, right now 8 is maximum, Math.floor(600 / 72)
                 * @param options.imagecompression  (Optional) options to specify the image compression
                 * @param options.imagecompression.mode  (Optional) image compression method used to exporting pdf.
                 * @param options.imagecompression.quality  (Optional) quality range from 0 to 1 that will express the jpeg image compression quality, available for jpeg mode only.
                 * @param options.imagecompression.speed  (Optional) speed referring to the png compression speed, available  for png mode only.
                 * @param options.streamcompression  (Optional) enable or disable pdf output compression
                 * @param options.pdfstream  (Optional) optional user-customized Stream object
                 */
                exportToPdf(options?: any | { header?: geotoolkit.scene.exports.HeaderComponent; footer?: geotoolkit.scene.exports.FooterComponent; documentheader?: geotoolkit.scene.exports.HeaderComponent; documentfooter?: geotoolkit.scene.exports.FooterComponent; output?: string; save?: boolean; printsettings?: any | { paperformat?: any; top?: number; bottom?: number; left?: number; right?: number; orientation?: string; scaling?: string; keepaspectratio?: boolean; continuous?: boolean; drawwesttoeast?: boolean; } ; limits?: any | { start?: any; end?: any; } ; scale?: number; deviceunit?: string; imagescalefactor?: number; imagecompression?: any | { mode?: geotoolkit.pdf.ImageCompression; quality?: number; speed?: geotoolkit.pdf.SpeedCompression; } ; streamcompression?: boolean; pdfstream?: geotoolkit.util.stream.Stream; } ): geotoolkit.util.Promise;
                /**
                 * Prepares object before exporting and saving state
                 */
                beginExport(): this;
                /**
                 * Used to restore object's state after exporting
                 */
                endExport(): any;
                /**
                 * Return export depth limits
                 */
                getExportDepthLimits(): geotoolkit.util.Range;
                /**
                 * Sets export depth limits
                 * @param limits  (Required) export limits
                 */
                setExportDepthLimits(limits: geotoolkit.util.Range): this;
                /**
                 * Return export depth scale
                 */
                getExportDepthScale(): number;
                /**
                 * Sets export depth scale
                 * @param scale  (Required) depth scale
                 */
                setExportDepthScale(scale: number): this;
                /**
                 * Returns exportable element
                 * @param options  (Optional) export options
                 * @param options.documentheader  (Optional) an optional document PDF header
                 * @param options.documentfooter  (Optional) an optional document PDF footer
                 */
                getExportElement(options?: any | { documentheader?: geotoolkit.scene.exports.HeaderComponent; documentfooter?: geotoolkit.scene.exports.FooterComponent; } ): geotoolkit.scene.exports.AbstractDocumentElement;
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
                 * set widget orientation and apply rotation if needed.
                 * @param mode  (Required) widget orientation mode
                 */
                setOrientation(mode: geotoolkit.util.Orientation): this;
                /**
                 * Sets bounds of the node in the parent coordinates
                 * @param bounds  (Required) bound of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect|any): this;
                /**
                 * Sets the model limits of the node
                 * @param modelLimits  (Required) The model limits of the node
                 */
                setModelLimits(modelLimits: geotoolkit.util.Rect|any): this;
                /**
                 * Returns widget orientation mode
                 */
                getOrientation(): geotoolkit.util.Orientation;
                /**
                 * Sets all the properties pertaining to this object {@link geotoolkit.welllog.widgets.WellLogWidget#setOptions}
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.indextype  (Optional) primary index types
                 * @param properties.indexunit  (Optional) primary index unit
                 * @param properties.deviceunit  (Optional) primary device unit
                 */
                setProperties(properties: any | { indextype?: string; indexunit?: string; deviceunit?: string; } ): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
            }
            /**
             * enum for TrackType
             */
            type TrackType = any;

            /**
             * Enum for Track Direction
             */
            type TrackDirection = any;

            module tools {
                /**
                 * Creates default implementation of the track splitter <br>
                 * The tool fires the following types of event:<br>
                 * (1) "onCanResize" - {geotoolkit.controls.tools.RejectableEventArgs} - occurs before track resize is starting.<br>
                 * (2) "onTrackWidthChanged" - {geotoolkit.controls.tools.RejectableEventArgs} - occurs after track resize is done.<br>
                 * (3) "onContainerWidthChanged" - {geotoolkit.controls.tools.EventArgs} - occurs after container resize is done.<br>
                 * 
                 * <br>
                 * <br>
                 * <h5>Events</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>Splitter.Events.onCanResize</td>
                 *              <td>geotoolkit.controls.tools.RejectableEventArgs</td>
                 *              <td>occurs before track resize is starting.</td>
                 *          </tr>
                 *          <tr>
                 *              <td>Splitter.Events.onTrackWidthChanged</td>
                 *              <td>geotoolkit.controls.tools.RejectableEventArgs</td>
                 *              <td> occurs after track resize is done.</td>
                 *          </tr>
                 *          <tr>
                 *              <td>Splitter.Events.onContainerWidthChanged</td>
                 *              <td>geotoolkit.controls.tools.EventArgs</td>
                 *              <td>occurs after container resize is done.</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * 
                 * Tool name: 'splitter'
                 */
                class Splitter extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Creates default implementation of the track splitter <br>
                     * The tool fires the following types of event:<br>
                     * (1) "onCanResize" - {geotoolkit.controls.tools.RejectableEventArgs} - occurs before track resize is starting.<br>
                     * (2) "onTrackWidthChanged" - {geotoolkit.controls.tools.RejectableEventArgs} - occurs after track resize is done.<br>
                     * (3) "onContainerWidthChanged" - {geotoolkit.controls.tools.EventArgs} - occurs after container resize is done.<br>
                     * 
                     * <br>
                     * <br>
                     * <h5>Events</h5>
                     * <table class="params">
                     *     <thead>
                     *          <tr>
                     *              <th>Event</th><th>Arguments</th><th>Description</th>
                     *          </tr>
                     *      </thead>
                     *      <tbody>
                     *          <tr>
                     *              <td>Splitter.Events.onCanResize</td>
                     *              <td>geotoolkit.controls.tools.RejectableEventArgs</td>
                     *              <td>occurs before track resize is starting.</td>
                     *          </tr>
                     *          <tr>
                     *              <td>Splitter.Events.onTrackWidthChanged</td>
                     *              <td>geotoolkit.controls.tools.RejectableEventArgs</td>
                     *              <td> occurs after track resize is done.</td>
                     *          </tr>
                     *          <tr>
                     *              <td>Splitter.Events.onContainerWidthChanged</td>
                     *              <td>geotoolkit.controls.tools.EventArgs</td>
                     *              <td>occurs after container resize is done.</td>
                     *          </tr>
                     *      <tbody>
                     *  </table>
                     *  <br>
                     * 
                     * Tool name: 'splitter'
                     * @param manipulatorLayer  (Required) layer for holding temporary shapes
                     * @param trackContainer  (Optional) optional trackContainer
                     */
                    constructor(manipulatorLayer: geotoolkit.scene.Group, trackContainer?: geotoolkit.welllog.TrackContainer);
                    /**
                     * Events
                     */
                    static Events: any;
                    /**
                     */
                    protected onActiveStateChanged(): any;
                }
                /**
                 * HorizontalSplitterEventArgs
                 */
                class HorizontalSplitterEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                    /**
                     * HorizontalSplitterEventArgs
                     * @param eventArgs  (Required) info about the event arguments
                     */
                    constructor(eventArgs: geotoolkit.controls.tools.EventArgs);
                }
                /**
                 * Creates default implementation of the plot splitter
                 */
                class HorizontalSplitter extends geotoolkit.controls.tools.splitter.HorizontalSplitter {
                    /**
                     * Creates default implementation of the plot splitter
                     * @param manipulatorLayer  (Required) layer for holding temporary shapes
                     */
                    constructor(manipulatorLayer: geotoolkit.scene.Group);
                    /**
                     * Events
                     */
                    static Events: any;
                }
                /**
                 * Creates default implementation of the Navigation tool <br>
                 * The tool fires the following types of event:<br>
                 * (1) "positionChanged" - {object} - occurs when position changed.<br>
                 * (2) "depthRangeChanged" - {object} - occurs when depth limits changed.<br>
                 * 
                 * Tool name: 'navigation-tool'
                 */
                class Navigation extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Creates default implementation of the Navigation tool <br>
                     * The tool fires the following types of event:<br>
                     * (1) "positionChanged" - {object} - occurs when position changed.<br>
                     * (2) "depthRangeChanged" - {object} - occurs when depth limits changed.<br>
                     * 
                     * Tool name: 'navigation-tool'
                     * @param manipulatorLayer  (Required) layer for holding temporary shapes
                     */
                    constructor(manipulatorLayer: geotoolkit.scene.Group);
                    /**
                     */
                    static Events: any;
                    /**
                     * returns visible depth limits
                     */
                    getVisibleDepthLimits(): geotoolkit.util.Range;
                    /**
                     * Set visible model limits
                     * @param visibleDepthLimits  (Required) visible depth limits
                     */
                    setVisibleDepthLimits(visibleDepthLimits: geotoolkit.util.Range): this;
                    /**
                     * set enable state
                     * @param enabled  (Required) sets the enabled state
                     */
                    setEnabled(enabled: boolean): this;
                    /**
                     * Gets all the options pertaining to this object
                     */
                    getOptions(): {options:{enabled:boolean;background:geotoolkit.attributes.FillStyle;scale:{enabled:boolean;linestyle:geotoolkit.attributes.LineStyle;fillstyle:geotoolkit.attributes.FillStyle};panning:{enabled:boolean;linestyle:geotoolkit.attributes.LineStyle;fillstyle:geotoolkit.attributes.FillStyle}}}|any;
                    /**
                     * @param options  (Optional) options
                     * @param options.enabled  (Optional) enabled flag
                     * @param options.background  (Optional) background fill style
                     * @param options.scale  (Optional) scale options
                     * @param options.scale.enabled  (Optional) enabled flag
                     * @param options.scale.linestyle  (Optional) scale handle line style
                     * @param options.scale.fillstyle  (Optional) scale handle fill style
                     * @param options.panning  (Optional) panning options
                     * @param options.panning.enabled  (Optional) enabled flag
                     * @param options.panning.linestyle  (Optional) panning handle line style
                     * @param options.panning.fillstyle  (Optional) panning handle fill style
                     */
                    setOptions(options?: any | { enabled?: boolean; background?: geotoolkit.attributes.FillStyle; scale?: any | { enabled?: boolean; linestyle?: geotoolkit.attributes.LineStyle|any; fillstyle?: geotoolkit.attributes.FillStyle|any; } ; panning?: any | { enabled?: boolean; linestyle?: geotoolkit.attributes.LineStyle|any; fillstyle?: geotoolkit.attributes.FillStyle|any; } ; } ): this;
                }
                /**
                 * Implements an abstract class for tools which manipulate Log Visuals
                 */
                class AbstractLogVisualEditingTool extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Implements an abstract class for tools which manipulate Log Visuals
                     */
                    constructor();
                    /**
                     */
                    update(): any;
                    /**
                     * Handles the event caused by user pressing the mouse button
                     * @param eventArgs  (Required) Native event arguments received from EventDispatcher
                     */
                    onMouseDown(eventArgs: any): any;
                    /**
                     * Handles the event caused by user moving the mouse
                     * @param eventArgs  (Required) Native event arguments received from EventDispatcher
                     */
                    onMouseMove(eventArgs: any): any;
                    /**
                     * Handles the event caused by user releasing the mouse button
                     * @param eventArgs  (Required) Native event arguments received from EventDispatcher
                     */
                    onMouseUp(eventArgs: any): any;
                    /**
                     * Returns a point in model coordinates, edits one of the util points
                     * @param args  (Required) Event arguments
                     */
                    protected getDeviceXY(args: any): geotoolkit.util.Point;
                    /**
                     * Makes a selection according to current position of the pointer
                     * @param x  (Required) X coordinate of the pointer
                     * @param y  (Required) Y coordinate of the pointer
                     */
                    protected makeSelection(x: number, y: number): geotoolkit.scene.Node[];
                    /**
                     * Iterates through handles and sets the provided visibility.
                     * If the visibility is to hide, hides the ghosts as well
                     * @param visible  (Required) Visibility flag for handles
                     */
                    protected setHandlesVisible(visible: boolean): this;
                    /**
                     * Returns the last registered position of the mouse in device space
                     */
                    getPosition(): geotoolkit.util.Point;
                    /**
                     * Gets the manipulator layer with contains handles
                     */
                    getCachedManipulatorLayer(): geotoolkit.scene.Group|geotoolkit.scene.Layer;
                    /**
                     * Returns the shape which this tool is manipulating
                     */
                    getShape(): geotoolkit.welllog.LogAbstractVisual|any;
                    /**
                     * Returns currently active handle,if exists, otherwise null
                     */
                    getActiveHandle(): any|geotoolkit.controls.editing.GhostBearingHandle;
                    /**
                     * Returns the flag defining if a ghost should be moved instead of the actual handle
                     */
                    getShowGhost(): boolean;
                    /**
                     * Gets a flag defining if the ghost should be reset after it has been dropped
                     */
                    getHideGhostOnDrop(): boolean;
                    /**
                     * Returns registered styles for active, inactive, and ghost states of all handles
                     */
                    getHandleStyles(): {styles:{ghostlinestyle:geotoolkit.attributes.LineStyle;ghostfillstyle:geotoolkit.attributes.FillStyle;activefillstyle:geotoolkit.attributes.FillStyle;inactivefillstyle:geotoolkit.attributes.FillStyle;activelinestyle:geotoolkit.attributes.LineStyle;inactivelinestyle:geotoolkit.attributes.LineStyle}}|any;
                    /**
                     * Gets the shape painter with which is used to render handles. Format is the same as in geotoolkit.scene.shapes.Symbol
                     * Redraws all handles
                     */
                    getHandlePainter(): Function;
                    /**
                     * Sets the last registered position of the mouse in device space
                     * @param x  (Required) The new X position
                     * @param y  (Required) The new Y position
                     */
                    setPosition(x: number, y: number): this;
                    /**
                     * Sets the handle currently active
                     * @param handle  (Required) The handle to be active
                     */
                    setActiveHandle(handle: geotoolkit.controls.editing.GhostBearingHandle): this;
                    /**
                     * Sets the shape which this tool has to manipulate and calculate its handles from.
                     * @param shape  (Required) The new shape to set for manipulation
                     */
                    setShape(shape: geotoolkit.scene.Node|any): this;
                    /**
                     * Sets the flag defining if a ghost should be moved instead of the actual handle
                     * @param showGhost  (Required) Show ghost flag
                     */
                    setShowGhost(showGhost: boolean): this;
                    /**
                     * Gets a flag defining if the ghost should be reset after it has been dropped
                     * @param hide  (Required) True to hide ghosts when dropped
                     */
                    setHideGhostOnDrop(hide: boolean): this;
                    /**
                     * Sets styles for active, inactive, and ghost states of all handles, and redraws each handle (this will lose edited handles position)
                     * @param styles  (Required) JSON containing stylings for different types of handle states
                     * @param styles.ghostlinestyle  (Optional) Line Style of the handle when it is in ghost state
                     * @param styles.ghostfillstyle  (Optional) Fill Style of the handle when it is in ghost state
                     * @param styles.activefillstyle  (Optional) Fill Style of the handle when it is selected and active
                     * @param styles.inactivefillstyle  (Optional) Fill Style of the handle when it is selected and active
                     * @param styles.activelinestyle  (Optional) Line Style of the handle when when it is inactive (most of the time)
                     * @param styles.inactivelinestyle  (Optional) Line Style of the handle when when it is inactive (most of the time)
                     */
                    setHandleStyles(styles: any | { ghostlinestyle?: geotoolkit.attributes.LineStyle|any|string; ghostfillstyle?: geotoolkit.attributes.FillStyle|any|string; activefillstyle?: geotoolkit.attributes.FillStyle|any|string; inactivefillstyle?: geotoolkit.attributes.FillStyle|any|string; activelinestyle?: geotoolkit.attributes.LineStyle|any|string; inactivelinestyle?: geotoolkit.attributes.LineStyle|any|string; } ): this;
                    /**
                     * Sets the shape painter with which the handles will be drawn. Format is the same as in
                     * geotoolkit.scene.shapes.Symbol
                     * Redraws all handles
                     * @param painter  (Required) The painter which will be used to draw the handles for linearly interpolated curves
                     */
                    setHandlePainter(painter: Function): this;
                    /**
                     * Sets the pixel side of the handles to which a size is applicable (anchored handles)
                     * @param size  (Required) The size of the handles in device coordinates (pixels)
                     */
                    setHandleSize(size: number): this;
                    /**
                     * for internal use only
                     * @param plot  (Required) Plot to which this tool should be attached.
                     */
                    protected attachToPlot(plot: geotoolkit.plot.Plot): this;
                    /**
                     * Called when the tool is enabled or disabled
                     */
                    protected onEnabledStateChanged(): any;
                }
                /**
                 * <p>
                 * Implements a tool capable of editing log curve sample points.
                 * </p>
                 * <p>
                 * When given a curve, this tool will create a set of manipulatable handles corresponding with each data sample point.
                 * If the curve is step interpolated, then the tool will build a set of lines covering the entire curve.
                 * Curve editing tool does not edit the actual curve which it is corresponded with, instead, each manipulation
                 * results in an event describing the action and changes. The tool can work in three modes: Edit, Insert, and Delete.
                 * </p>
                 * <h4>
                 * Edit Mode:
                 * </h4>
                 * <p>
                 * Provides a set of handles which become activated when clicked, and deactivated when released, and dragged with the mouse when the mouse pointer is moved.
                 * </p>
                 * <ul>
                 * <li>When a mouse down occurs, "dragstart" event is fired with parameters:
                 * <ul>
                 * <li>depth: The depth (y) in curve model which belongs to the point where mouse down occurred</li>
                 * <li>value: The value (x) in curve model which belongs to the point where mouse down occurred</li>
                 * </ul>
                 * </li>
                 * <li>When a mouse up occurs, "dragend" event is fired with parameters:
                 * <ul>
                 * <li>depth: The depth (y) in curve model which belongs to the point where mouse up occurred </li>
                 * <li>value: The value (x) in curve model which belongs to the point where mouse up occurred </li>
                 * <li>index: The index of manipulated data point in the original data set </li>
                 * </ul>
                 * </li>
                 * <li>If a mouse move occurs, "dragging" event is fired with parameters:
                 * <ul>
                 * <li>oldDepth: the depth (y) of the handle before the dragging occurred</li>
                 * <li>oldValue: the value (x) of the handle before the dragging occurred</li>
                 * <li>depth: the new depth (y) of the handle, resultant from the dragging action</li>
                 * <li>value: the new value (x) of the handle, resultant from the dragging action</li>
                 * <li>index: the index of the data sample (in the array of all data samples of the curve corresponding to this tool), which is being manipulated</li>
                 * </ul>
                 * </li>
                 * </ul>
                 * <h4>Insert Mode:</h4>
                 * <p>
                 * Fires an "insert" event when a mouse down on the track occurs, also fires "move" event when the mouse pointer moves across the curve.
                 * </p>
                 * <ul>
                 * <li>If a mouse move occurs, "move" event is fired with following arguments:
                 * <ul>
                 * <li>depth: The depth (y) of the mouse pointer in the curve model</li>
                 * <li>value: The value (x) of the mouse pointer in the curve model</li>
                 * <li>handleDepth: The depth of the handle which moves along the curve as the projection of the mouse pointer position</li>
                 * <li>handleValue: The value of the handle which moves along the curve as the projection of the mouse pointer position</li>
                 * </ul>
                 * </li>
                 * <li>When a mouse down occurs, "insert" event is fired with following arguments:
                 * <ul>
                 * <li>depth: The depth (y) of the mouse pointer in the curve model</li>
                 * <li>value: The value (x) of the mouse pointer in the curve model</li>
                 * <li>handleDepth: The depth of the handle which moves along the curve as the projection of the mouse pointer position</li>
                 * <li>handleValue: The value of the handle which moves along the curve as the projection of the mouse pointer position</li>
                 * </ul>
                 * </li>
                 * </ul>
                 * <h4>Delete Mode:</h4>
                 * <p>
                 * Fires a "delete" event with handle info every time a mouse down occurs on a handle.
                 * </p>
                 * <ul>
                 * <li>When a mouse down occurs on top of a handle, a "delete" event is fired with parameters:
                 * <ul>
                 * <li>depth: The depth of the data point corresponding to the handle</li>
                 * <li>value: The value of the data point corresponding to the handle</li>
                 * <li>index: The index of the data point in the original data set</li>
                 * </ul>
                 * </li>
                 * </ul>
                 * </br>
                 * <p>
                 * <strong>NOTE</strong>: If the curve is interpolated with StartStep, MiddleStep, or EndStep, the tool will draw lines between each
                 * point, </br>
                 * and the events will be fired with the information about the point which the tool edits. However, in case of Middle
                 * Step, the point divides some lines in two, and some lines do not have any original data set points to manipulate: </br>
                 * p1----------p2 (p1 and p2 are not registered in curve data set) </br>
                 * | </br>
                 * | </br>
                 * p3 (this is the only point which actually existed in the data set) </br>
                 * | </br>
                 * | </br>
                 * p5----------p4 (p4 and p4 are not registered in curve data set) </br>
                 * </p>
                 */
                class CurveEditor extends geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool {
                    /**
                     * <p>
                     * Implements a tool capable of editing log curve sample points.
                     * </p>
                     * <p>
                     * When given a curve, this tool will create a set of manipulatable handles corresponding with each data sample point.
                     * If the curve is step interpolated, then the tool will build a set of lines covering the entire curve.
                     * Curve editing tool does not edit the actual curve which it is corresponded with, instead, each manipulation
                     * results in an event describing the action and changes. The tool can work in three modes: Edit, Insert, and Delete.
                     * </p>
                     * <h4>
                     * Edit Mode:
                     * </h4>
                     * <p>
                     * Provides a set of handles which become activated when clicked, and deactivated when released, and dragged with the mouse when the mouse pointer is moved.
                     * </p>
                     * <ul>
                     * <li>When a mouse down occurs, "dragstart" event is fired with parameters:
                     * <ul>
                     * <li>depth: The depth (y) in curve model which belongs to the point where mouse down occurred</li>
                     * <li>value: The value (x) in curve model which belongs to the point where mouse down occurred</li>
                     * </ul>
                     * </li>
                     * <li>When a mouse up occurs, "dragend" event is fired with parameters:
                     * <ul>
                     * <li>depth: The depth (y) in curve model which belongs to the point where mouse up occurred </li>
                     * <li>value: The value (x) in curve model which belongs to the point where mouse up occurred </li>
                     * <li>index: The index of manipulated data point in the original data set </li>
                     * </ul>
                     * </li>
                     * <li>If a mouse move occurs, "dragging" event is fired with parameters:
                     * <ul>
                     * <li>oldDepth: the depth (y) of the handle before the dragging occurred</li>
                     * <li>oldValue: the value (x) of the handle before the dragging occurred</li>
                     * <li>depth: the new depth (y) of the handle, resultant from the dragging action</li>
                     * <li>value: the new value (x) of the handle, resultant from the dragging action</li>
                     * <li>index: the index of the data sample (in the array of all data samples of the curve corresponding to this tool), which is being manipulated</li>
                     * </ul>
                     * </li>
                     * </ul>
                     * <h4>Insert Mode:</h4>
                     * <p>
                     * Fires an "insert" event when a mouse down on the track occurs, also fires "move" event when the mouse pointer moves across the curve.
                     * </p>
                     * <ul>
                     * <li>If a mouse move occurs, "move" event is fired with following arguments:
                     * <ul>
                     * <li>depth: The depth (y) of the mouse pointer in the curve model</li>
                     * <li>value: The value (x) of the mouse pointer in the curve model</li>
                     * <li>handleDepth: The depth of the handle which moves along the curve as the projection of the mouse pointer position</li>
                     * <li>handleValue: The value of the handle which moves along the curve as the projection of the mouse pointer position</li>
                     * </ul>
                     * </li>
                     * <li>When a mouse down occurs, "insert" event is fired with following arguments:
                     * <ul>
                     * <li>depth: The depth (y) of the mouse pointer in the curve model</li>
                     * <li>value: The value (x) of the mouse pointer in the curve model</li>
                     * <li>handleDepth: The depth of the handle which moves along the curve as the projection of the mouse pointer position</li>
                     * <li>handleValue: The value of the handle which moves along the curve as the projection of the mouse pointer position</li>
                     * </ul>
                     * </li>
                     * </ul>
                     * <h4>Delete Mode:</h4>
                     * <p>
                     * Fires a "delete" event with handle info every time a mouse down occurs on a handle.
                     * </p>
                     * <ul>
                     * <li>When a mouse down occurs on top of a handle, a "delete" event is fired with parameters:
                     * <ul>
                     * <li>depth: The depth of the data point corresponding to the handle</li>
                     * <li>value: The value of the data point corresponding to the handle</li>
                     * <li>index: The index of the data point in the original data set</li>
                     * </ul>
                     * </li>
                     * </ul>
                     * </br>
                     * <p>
                     * <strong>NOTE</strong>: If the curve is interpolated with StartStep, MiddleStep, or EndStep, the tool will draw lines between each
                     * point, </br>
                     * and the events will be fired with the information about the point which the tool edits. However, in case of Middle
                     * Step, the point divides some lines in two, and some lines do not have any original data set points to manipulate: </br>
                     * p1----------p2 (p1 and p2 are not registered in curve data set) </br>
                     * | </br>
                     * | </br>
                     * p3 (this is the only point which actually existed in the data set) </br>
                     * | </br>
                     * | </br>
                     * p5----------p4 (p4 and p4 are not registered in curve data set) </br>
                     * </p>
                     * @param manipulatorLayer  (Required) layer to which handles will be added. Cache disabled
                     * @param cachedManipulatorLayer  (Required) layer to which handles will be added. Cache enabled
                     */
                    constructor(manipulatorLayer: geotoolkit.scene.Group|geotoolkit.scene.Layer, cachedManipulatorLayer: geotoolkit.scene.Group|geotoolkit.scene.Layer);
                    /**
                     * Defines the editing mode supported by this adapter
                     */
                    static Modes: any;
                    /**
                     * Handles pointerdown in the manipulated area
                     * @param eventArgs  (Required) Arguments proxied from the event dispatcher
                     */
                    onMouseDown(eventArgs: any): this;
                    /**
                     * Handles the event of ponter release, pointerup
                     * @param eventArgs  (Required) Arguments proxied from the event dispatcher
                     */
                    onMouseUp(eventArgs: any): this;
                    /**
                     * Handles the move of the pointer over the manipulated area
                     * @param eventArgs  (Required) Arguments proxied from the event dispatcher
                     */
                    onMouseMove(eventArgs: any): this;
                    /**
                     * Creates the handles for every point that curve has visible on the screen if in linear interpolation mode.
                     * In step interpolation creates a line handle between each visible point
                     */
                    protected createHandles(): this;
                    /**
                     * Checks if a sample or a value falls within the visible limits of the parent track.
                     * @param sample1  (Required) The sample or value to test.
If a line segment is tested, this is the first point of the tested line
                     * @param sample2  (Optional) When a line segment is tested, this is the second
point constructing the line
                     * @param activeHandle  (Optional) True if the test is done for the active handle. Used in cases of handle manipulation.
                     */
                    checkHandleCollision(sample1: number|geotoolkit.welllog.data.LogDataSample, sample2?: number|geotoolkit.welllog.data.LogDataSample, activeHandle?: boolean): boolean;
                    /**
                     * Updates the state of the tool, recalculated and redraws the handles and curve limits (for spilling handles)
                     */
                    update(): any;
                    /**
                     * Clears all the handles from the adapter and manipulator layer
                     */
                    removeHandles(): this;
                    /**
                     * Hides all the handles. Has an option to hide everything except the active handle
                     * @param skipActive  (Required) If true, active handle will not be hidden
                     */
                    hideHandles(skipActive: boolean): this;
                    /**
                     * Shows all existing handles on the screen.
                     */
                    showHandles(): this;
                    /**
                     * Retrieves the type of editing that this adapter is doing
                     */
                    getMode(): string|geotoolkit.welllog.widgets.tools.CurveEditor.Modes;
                    /**
                     * Gets the value of flag defining if the active handles can only move inside the track
                     */
                    getHandleInsideTrack(): boolean;
                    /**
                     * Gets the value of the flag defining if the handles which overflow the track boundaries
                     * should be hidden
                     */
                    getHideSpillingHandles(): boolean;
                    /**
                     * Gets a flag defining if the data points can change their depths
                     */
                    getVerticalEditAllowed(): boolean;
                    /**
                     * Returns a flag which defines if inactive handles have to be hidden when dragging.
                     */
                    getHideInactiveHandles(): {hide:boolean}|any;
                    /**
                     * Sets a flag which defines if inactive handles have to be hidden when a move with an existing active handle
                     * occurs. Once you grab a handle and start dragging it around, every other handle will be hidden to aid a better
                     * view of the curve you are editing.
                     * @param hide  (Required) True to hide inactive handles on dragging
                     */
                    setHideInactiveHandles(hide: boolean): this;
                    /**
                     * Sets a flag which defines if the active handle can only move within the track area
                     * @param inside  (Required) True to restrict the position of active handle in the track
                     */
                    setHandleInsideTrack(inside: boolean): this;
                    /**
                     * Sets what kind of edition this adapter has to do for the curve
                     * @param mode  (Required) The new mode in which this tool will work
                     */
                    setMode(mode: string|geotoolkit.welllog.widgets.tools.CurveEditor.Modes): this;
                    /**
                     * Sets the value of the flag defining if the handles which overflow the track boundaries
                     * should be hidden
                     * @param hide  (Required) If true, overflowing handles will not display
                     */
                    setHideSpillingHandles(hide: boolean): this;
                    /**
                     * Sets a flag defining if the data points can change their depths
                     * @param allow  (Required) True to allow depth change
                     */
                    setVerticalEditAllowed(allow: boolean): this;
                }
                /**
                 * <p>
                 * Implements a tool which edits log markers (tops), or allows to visually create them.
                 * </p>
                 * <p>
                 * This tool does not edit the actual marker visual. Instead it fires events which contain all the information
                 * which is needed to manipulate or create a log marker. The tool can work in two modes: Edit and Insert.
                 * </p>
                 * <h4>
                 * Edit Mode:
                 * </h4>
                 * <p>
                 * Draws handles on top of a log marker which has been associated with the tool. When handles are clicked and
                 * dragged, either draws a ghost in the dragged position, or drags the actual handle. In ghost mode, no events
                 * are fired until the handles are released (by releasing the mouse button). In ghost mode set to false, fires dragging
                 * events every time a move occurs.
                 * </p>
                 * <ul>
                 * <li>When a mouse down occurs, "dragstart" event is fired with parameters:
                 * <ul>
                 * <li>depth: The depth (y) in track model limits representing the position of the pointer</li>
                 * <li>shape: The log visual which is being manipulated
                 * </ul>
                 * </li>
                 * <li>When a mouse up occurs, "dragend" event is fired with parameters:
                 * <ul>
                 * <li>depth: The depth (y) in track model limits representing the position of handles</li>
                 * <li>shape: The log visual which is being manipulated
                 * </ul>
                 * </li>
                 * <li>If a mouse move occurs, "dragging" event is fired (When ghost mode is set to false) with parameters:
                 * <ul>
                 * <li>depth: the new depth (y) of the handles, resultant from the dragging action</li>
                 * <li>shape: The log visual which is being manipulated
                 * </ul>
                 * </li>
                 * </ul>
                 * <h4>Insert Mode:</h4>
                 * <p>
                 * Fires an "insert" event when a mouse down on the track occurs.
                 * </p>
                 * <ul>
                 * <li>When a mouse down occurs, "insert" event is fired with following arguments:
                 * <ul>
                 * <li>depth: The depth (y) of the mouse pointer in the model of the track where a log marker should be inserted</li>
                 * <li>shape: The log track where to insert the marker
                 * </ul>
                 * </li>
                 * </ul>
                 * </br>
                 * <h3>Working With Marker Editor</h3>
                 * <p>
                 *     For Marker Editor to work, it always needs a reference to either the marker which is being manipulated, or to the
                 *     track where a marker will be inserted. To start operating the tool enable it through setEnabled() and  pass the
                 *     appropriate shape to the tool through setShape(). To disassociate the Marker Editor and hide the handles without
                 *     disabling the tool call setShape with a null argument.
                 * </p>
                 */
                class MarkerEditor extends geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool {
                    /**
                     * <p>
                     * Implements a tool which edits log markers (tops), or allows to visually create them.
                     * </p>
                     * <p>
                     * This tool does not edit the actual marker visual. Instead it fires events which contain all the information
                     * which is needed to manipulate or create a log marker. The tool can work in two modes: Edit and Insert.
                     * </p>
                     * <h4>
                     * Edit Mode:
                     * </h4>
                     * <p>
                     * Draws handles on top of a log marker which has been associated with the tool. When handles are clicked and
                     * dragged, either draws a ghost in the dragged position, or drags the actual handle. In ghost mode, no events
                     * are fired until the handles are released (by releasing the mouse button). In ghost mode set to false, fires dragging
                     * events every time a move occurs.
                     * </p>
                     * <ul>
                     * <li>When a mouse down occurs, "dragstart" event is fired with parameters:
                     * <ul>
                     * <li>depth: The depth (y) in track model limits representing the position of the pointer</li>
                     * <li>shape: The log visual which is being manipulated
                     * </ul>
                     * </li>
                     * <li>When a mouse up occurs, "dragend" event is fired with parameters:
                     * <ul>
                     * <li>depth: The depth (y) in track model limits representing the position of handles</li>
                     * <li>shape: The log visual which is being manipulated
                     * </ul>
                     * </li>
                     * <li>If a mouse move occurs, "dragging" event is fired (When ghost mode is set to false) with parameters:
                     * <ul>
                     * <li>depth: the new depth (y) of the handles, resultant from the dragging action</li>
                     * <li>shape: The log visual which is being manipulated
                     * </ul>
                     * </li>
                     * </ul>
                     * <h4>Insert Mode:</h4>
                     * <p>
                     * Fires an "insert" event when a mouse down on the track occurs.
                     * </p>
                     * <ul>
                     * <li>When a mouse down occurs, "insert" event is fired with following arguments:
                     * <ul>
                     * <li>depth: The depth (y) of the mouse pointer in the model of the track where a log marker should be inserted</li>
                     * <li>shape: The log track where to insert the marker
                     * </ul>
                     * </li>
                     * </ul>
                     * </br>
                     * <h3>Working With Marker Editor</h3>
                     * <p>
                     *     For Marker Editor to work, it always needs a reference to either the marker which is being manipulated, or to the
                     *     track where a marker will be inserted. To start operating the tool enable it through setEnabled() and  pass the
                     *     appropriate shape to the tool through setShape(). To disassociate the Marker Editor and hide the handles without
                     *     disabling the tool call setShape with a null argument.
                     * </p>
                     * @param manipulatorLayer  (Required) layer to which handles will be added
                     */
                    constructor(manipulatorLayer: geotoolkit.scene.Group|geotoolkit.scene.Layer);
                    /**
                     * Defines the editing mode supported by this tool
                     */
                    static Modes: any;
                    /**
                     * Implements the logic of mouse down event handler. Locks in a marker for editing, or fires an insertion event.
                     * Stops propagation of mouse down event
                     * @param eventArgs  (Required) Native event arguments received from EventDispatcher
                     */
                    onMouseDown(eventArgs: any): this;
                    /**
                     * Implements the logic of mouse up event handler. De-activates handles and releases them. Deactivates this tool.
                     * (does not disable!)
                     * @param eventArgs  (Required) Native event arguments received from EventDispatcher
                     */
                    onMouseUp(eventArgs: any): this;
                    /**
                     * Implements the logic of mouse move event handler
                     * If in editing mode and a handle has been locked in for mouse move, moves that handle.
                     * If in insert mode, updates the position of the handle to represent where a marker will be inserted (by pointer position)
                     * Stops propagation of mouse down event
                     * @param eventArgs  (Required) Native event arguments received from EventDispatcher
                     */
                    onMouseMove(eventArgs: any): this;
                    /**
                     * Creates three handles which are used to edit or create a marker:
                     * Two bubbles on the ends of the marker line, and one line handle connecting them
                     */
                    protected createHandles(): any;
                    /**
                     * Updates the state of this tool. Recalculates handle positions, updates the styles, and
                     * hides/shows handles based on the current state
                     */
                    update(): this;
                    /**
                     * Sets the type of manipulations which this tool should do.
                     * Edit mode will draw handles on an existing marker and fire events when the position of those has been changed
                     * Insert mode will draw handles to follow the mouse pointer and will fire an insert event at the position of
                     * the pointer when a mouse down happens
                     * @param mode  (Required) The mode to set on the tool
                     */
                    setMode(mode: string|geotoolkit.welllog.widgets.tools.MarkerEditor.Modes): this;
                    /**
                     * Sets the shape which this tool has to edit. In insert mode sets the track to which a LogMarker should be inserted
                     * @param shape  (Required) The marker to edit, or the
track to which a marker should be added
                     */
                    setShape(shape: geotoolkit.scene.Node|any): this;
                    /**
                     * Returns the mode in which this tool is currently working. See setMode
                     */
                    getMode(): string|geotoolkit.welllog.widgets.tools.MarkerEditor.Modes;
                    /**
                     * Iterates through handles and sets the provided visibility.
                     * Ghosts are hidden always, even if the visibility is set to true
                     * @param visible  (Required) Visibility flag for handles
                     */
                    protected setHandlesVisible(visible: boolean): this;
                }
                /**
                 * Defines a shape adapter which has functionality to manipulate WellLog Markers.
                 * This adapter associates itself to an instance of LogMarker shape, creates handles rendered on top of the shape
                 * and allows dragging the shape along the track.
                 */
                class LogMarkerAdapter extends geotoolkit.controls.editing.ShapeAdapter {
                    /**
                     * Defines a shape adapter which has functionality to manipulate WellLog Markers.
                     * This adapter associates itself to an instance of LogMarker shape, creates handles rendered on top of the shape
                     * and allows dragging the shape along the track.
                     */
                    constructor();
                    /**
                     * Called during initialization process. Creates handles
                     */
                    onInitialize(): boolean;
                    /**
                     * Updates the parameters of the handles to match the current state
                     * of the shape and adapter
                     */
                    updateHandles(): this;
                    /**
                     * Removes all the handles and their ghosts from the adapter and scene
                     */
                    removeHandles(): this;
                    /**
                     * Sets the visibility of the handles registered with this adapter
                     * @param visible  (Required) Visibility to set on handles
                     */
                    setHandlesVisible(visible: boolean): this;
                    /**
                     * Called when adapter goes from active to non-active and vice versa
                     * @param active  (Required) New state of the adapter
                     */
                    onActiveStateChanged(active: boolean): any;
                    /**
                     * Move adapter and send event {geotoolkit.controls.editing.ShapeAdapter.Moved}
                     * This method also supports moving programmatically, as opposed to by event only.
                     * If modelDeltaXY is passed as "true", then the x and y are treated as deltaX and deltaY
                     * in model coordinates of the associated shape.
                     * @param x  (Required) X coordinate of pointer position at the moment of the move, or the dx of the adapter in
model coordinates of the associated shape
                     * @param y  (Required) Y coordinate of pointer position at the moment of the move, or the dy of the adapter in
model coordinates of the associated shape
                     * @param eventArgs  (Optional) Event arguments passed from the tool for further passing
                     * @param modelDeltaXY  (Optional) If true passed, x and y will be treated as respective deltas in model coordinates
of the associated shape
                     */
                    move(x: number, y: number, eventArgs?: any, modelDeltaXY?: boolean): this;
                    /**
                     * Moves the handle and the shape, if shape editing is enabled, usually used internally and is called by
                     * "move" method of this class.
                     * @param x  (Required) X coordinate of pointer position at the moment of the move, or the dx of the adapter in
model coordinates of the associated shape
                     * @param y  (Required) Y coordinate of pointer position at the moment of the move, or the dy of the adapter in
model coordinates of the associated shape
                     * @param eventArgs  (Optional) Event arguments passed from the tool for further passing
                     * @param modelDeltaXY  (Optional) If true passed, x and y will be treated as respective deltas in model coordinates
of the associated shape
                     */
                    onMove(x: number, y: number, eventArgs?: any, modelDeltaXY?: boolean): this;
                    /**
                     * Called when a handle owned by this adapter has been released and editing stops.
                     * @param x  (Required) X coordinate of pointer when mouseup occurred
                     * @param y  (Required) Y coordinate of pointer when mouseup occurred
                     * @param eventArgs  (Required) Event arguments from the calling tool
                     */
                    release(x: number, y: number, eventArgs: any): this;
                    /**
                     * Called when a handle owned by this adapter has been selected and activated. The editing began. Fires
                     * geotoolkit.controls.editing.Events.DragStart event.
                     * @param x  (Required) X coordinate of the point where the mouse was clicked to engage the handle in device space
                     * @param y  (Required) Y coordinate of the point where the mouse was clicked to engage the handle in device space
                     * @param eventArgs  (Required) 
                     */
                    engage(x: number, y: number, eventArgs: geotoolkit.controls.tools.EventArgs): this;
                    /**
                     * Sets the flag defining if this adapter has to directly edit the shape which it is associated with.
                     * Otherwise it will only send an event.
                     * @param allow  (Required) True to edit the shape directly
                     */
                    setAllowShapeEdit(allow: boolean): this;
                    /**
                     * Returns the flag defining if this adapter directly edits the shape which it is associated with.
                     */
                    getAllowShapeEdit(): boolean;
                    /**
                     * Sets the flag defining if a ghost should be moved instead of an actual handle when the shape is being manipulated.
                     * @param show  (Required) True to display a ghost handle
                     */
                    setShowGhost(show: boolean): this;
                    /**
                     * Returns the flag defining if a ghost is moved instead of an actual handle when the shape is being manipulated.
                     */
                    getShowGhost(): boolean;
                    /**
                     * Associates the shape passed in parameters to this adapter. All manipulations done via this
                     * adapter are calculated and applied with respect to this shape
                     * @param shape  (Required) 
                     */
                    setShape(shape: geotoolkit.scene.Node): this;
                    /**
                     * Sets styles for active, inactive, and ghost states of all handles, and redraws each handle (this will lose edited handles position)
                     * @param styles  (Required) JSON containing stylings for different types of handle states
                     * @param styles.ghostlinestyle  (Optional) Line Style of the handle when it is in ghost state
                     * @param styles.ghostfillstyle  (Optional) Fill Style of the handle when it is in ghost state
                     * @param styles.activefillstyle  (Optional) Fill Style of the handle when it is selected and active
                     * @param styles.inactivefillstyle  (Optional) Fill Style of the handle when it is selected and active
                     * @param styles.activelinestyle  (Optional) Line Style of the handle when when it is inactive (most of the time)
                     * @param styles.inactivelinestyle  (Optional) Line Style of the handle when when it is inactive (most of the time)
                     */
                    setHandleStyles(styles: any | { ghostlinestyle?: geotoolkit.attributes.LineStyle; ghostfillstyle?: geotoolkit.attributes.FillStyle; activefillstyle?: geotoolkit.attributes.FillStyle; inactivefillstyle?: geotoolkit.attributes.FillStyle; activelinestyle?: geotoolkit.attributes.LineStyle; inactivelinestyle?: geotoolkit.attributes.LineStyle; } ): this;
                }
                class GhostToolEventArgs {
                    /**
                     * @param selection  (Required) selected visuals
                     * @param minDepth  (Required) min depth
                     * @param maxDepth  (Required) max depth
                     * @param track  (Required) track to select
                     */
                    constructor(selection: geotoolkit.scene.Node[], minDepth: number, maxDepth: number, track: geotoolkit.welllog.LogTrack);
                    /**
                     * Return a selected nodes in the current track. (by default are all curve)
                     */
                    getSelection(): geotoolkit.scene.Node[];
                    /**
                     */
                    getMinDepth(): number;
                    /**
                     */
                    getMaxDepth(): number;
                    /**
                     */
                    getTrack(): geotoolkit.welllog.LogTrack;
                    /**
                     * Sets a selected area in the model coordinate
                     * @param selection  (Required) selected visuals
                     */
                    setSelection(selection: geotoolkit.scene.Node[]): this;
                }
                /**
                 * Creates tool to compare curves and tops between tracks
                 * <br>
                 * <h5>Events {@link geotoolkit.welllog.widgets.tools.GhostTool.Events}</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>Selected</td>
                 *              <td>{@link geotoolkit.welllog.widgets.tools.GhostToolEventArgs}</td>
                 *              <td>This Event is fired when the Ghost Tool selection in track occurs.</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 */
                class GhostTool extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Creates tool to compare curves and tops between tracks
                     * <br>
                     * <h5>Events {@link geotoolkit.welllog.widgets.tools.GhostTool.Events}</h5>
                     * <table class="params">
                     *     <thead>
                     *          <tr>
                     *              <th>Event</th><th>Arguments</th><th>Description</th>
                     *          </tr>
                     *      </thead>
                     *      <tbody>
                     *          <tr>
                     *              <td>Selected</td>
                     *              <td>{@link geotoolkit.welllog.widgets.tools.GhostToolEventArgs}</td>
                     *              <td>This Event is fired when the Ghost Tool selection in track occurs.</td>
                     *          </tr>
                     *      <tbody>
                     *  </table>
                     *  <br>
                     * @param manipulatorLayer  (Required) layer for holding temporary shapes
                     * @param options  (Optional) options for box
                     * @param options.ghost  (Optional) options for ghost
                     * @param options.ghost.fillstyle  (Optional) options for active ghost fill style
                     * @param options.ghost.linestyle  (Optional) options for ghost line style
                     * @param options.rubberband  (Optional) options for rubber band
                     * @param options.rubberband.fillstyle  (Optional) options for active rubber band fill style
                     * @param options.rubberband.linestyle  (Optional) options for rubber band line style
                     * @param options.highlight  (Optional) options for highlighting the track where the tool will snap
                     * @param options.highlight.enable  (Optional) enable highlighting of the snap track (note: the "snaptotrack" option must also be enabled)
                     * @param options.highlight.fillstyle  (Optional) options for track highlighting fill style
                     * @param options.highlight.linestyle  (Optional) options for track highlighting line style
                     * @param options.snaptotrack  (Optional) snap to track
                     * @param options.shadow  (Optional) shadow to show original selection location
                     */
                    constructor(manipulatorLayer: geotoolkit.scene.CompositeNode, options?: any | { ghost?: any | { fillstyle?: any|geotoolkit.attributes.FillStyle; linestyle?: any|geotoolkit.attributes.LineStyle; } ; rubberband?: any | { fillstyle?: any|geotoolkit.attributes.FillStyle; linestyle?: any|geotoolkit.attributes.LineStyle; } ; highlight?: any | { enable?: boolean; fillstyle?: any|geotoolkit.attributes.FillStyle; linestyle?: any|geotoolkit.attributes.LineStyle; } ; snaptotrack?: boolean; shadow?: boolean; } );
                    /**
                     * GhostTool Events
                     */
                    static Events: any;
                    /**
                     * Return true if the representation is flipped vertically
                     */
                    isVerticalFlip(): boolean;
                    /**
                     * Set vertical flip of the representation
                     * @param flip  (Required) flag to set the vertical flip of the representation
                     */
                    setVerticalFlip(flip: boolean): this;
                    /**
                     * Return true if the representation is flipped horizontally
                     */
                    isHorizontalFlip(): boolean;
                    /**
                     * Set horizontal flip of the representation
                     * @param enable  (Required) enable flip
                     */
                    setHorizontalFlip(enable: boolean): this;
                    /**
                     * Set visuals filter callback
                     * @param callback  (Required) visuals filter callback
                     */
                    setVisualsFilter(callback: geotoolkit.welllog.widgets.tools.GhostTool.visualsFilterCallback|boolean|any): this;
                    /**
                     * Shift ghost track if it is created
                     * @param deltaX  (Required) delta in pixels in horizontal direction
                     * @param deltaY  (Required) delta in pixels in vertical direction
                     */
                    shiftGhost(deltaX: number, deltaY: number): any;
                    /**
                     * Returns active track to apply selection
                     */
                    getActiveTrack(): geotoolkit.welllog.LogTrack;
                    /**
                     */
                    protected onEnabledStateChanged(): any;
                }
                module GhostTool {
                    /**
                     * filterVisualsCallback definition
                     */
                    type visualsFilterCallback = (visuals: geotoolkit.welllog.LogAbstractVisual[], track: geotoolkit.welllog.LogTrack) => geotoolkit.welllog.LogAbstractVisual[]|any;
                    /**
                     * GhostTool Events
                     */
                    interface Events {
                        /**
                         * Visual Selected
                         */
                        Selected: string;
                    }
                }
                module Splitter {
                    /**
                     * Events
                     */
                    interface Events {
                        /**
                         * onContainerWidthChanged
                         */
                        onContainerWidthChanged: string;
                        /**
                         * onTrackWidthChanged
                         */
                        onTrackWidthChanged: string;
                        /**
                         * onCanResize
                         */
                        onCanResize: string;
                    }
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
                module Navigation {
                    interface Events {
                        /**
                         * This event occurs when the visible depth limits is changed. It can scroll, scale operations.
                         */
                        PositionChanged: string;
                        /**
                         * This events occurs when virtual depth model limit is changed. For example, if you call method setDepthLimits.
                         */
                        DepthRangeChanged: string;
                    }
                }
                module CurveEditor {
                    /**
                     * Defines the editing mode supported by this adapter
                     */
                    interface Modes {
                        /**
                         * The mode when an existing data point can be edited to change value or depth
                         */
                        Edit: string;
                        /**
                         * The mode when an existing data point can be deleted
                         */
                        Delete: string;
                        /**
                         * The mode when an new data point can be added
                         */
                        Insert: string;
                    }
                }
                module MarkerEditor {
                    /**
                     * Defines the editing mode supported by this tool
                     */
                    interface Modes {
                        /**
                         * The mode when an existing marker can be edited to change depth
                         */
                        Edit: string;
                        /**
                         * The mode when a new marked can be added
                         */
                        Insert: string;
                    }
                }
            }
            module data {
                /**
                 * Define abstract curve data object which provides samples and indices together
                 */
                class CurveDataObject extends geotoolkit.data.DataObject {
                    /**
                     * Define abstract curve data object which provides samples and indices together
                     */
                    constructor();
                    /**
                     * Request load data
                     * @param options  (Required) additional parameters of curve data passed to callback function
                     * @param callback  (Required) function called to request data
                     */
                    getData(options: any, callback: Function): any;
                }
            }
            module headers {
                class CustomLogTrackHeader extends geotoolkit.welllog.header.LogTrackHeader {
                    /**
                     */
                    constructor();
                }
            }
            module visuals {
                class LogTrackContainer extends geotoolkit.welllog.TrackContainer {
                    /**
                     */
                    constructor();
                    /**
                     */
                    dispose(): any;
                    /**
                     * @param callback  (Required) callback
                     * @param target  (Required) target
                     */
                    enumerateNodes(callback: Function, target: any): any;
                    /**
                     * Set indent between tracks
                     * @param indent  (Required) indent between tracks
                     */
                    setIndent(indent: number): this;
                    /**
                     * Return indent between tracks
                     */
                    getIndent(): number;
                    /**
                     * Add layer to container
                     * @param layer  (Required) layer to be added
                     */
                    addLayer(layer: geotoolkit.scene.CompositeNode|geotoolkit.scene.CompositeNode[]): this;
                    /**
                     * Returns amount of layers
                     */
                    getLayersCount(): number;
                    /**
                     * Return layer at specified index
                     * @param index  (Required) index at which to get the layer for
                     */
                    getLayerAt(index: number): geotoolkit.scene.CompositeNode;
                    /**
                     * Add track to container
                     * @param track  (Required) track to be added
                     */
                    addTrack(track: geotoolkit.welllog.LogTrack): this;
                    /**
                     * Remove track from container
                     * @param track  (Required) track to be removed
                     */
                    removeTrack(track: geotoolkit.welllog.LogTrack): this;
                    /**
                     * Returns amount of tracks
                     */
                    getTracksCount(): number;
                    /**
                     * Return track at specified index
                     * @param index  (Required) index at which to get the track for
                     */
                    getTrackAt(index: number): geotoolkit.welllog.LogTrack;
                    /**
                     * return index of track
                     * @param track  (Required) index of track
                     */
                    getTrackIndex(track: geotoolkit.welllog.LogTrack): number;
                    /**
                     * @param event  (Required) broadcast event
                     * @param source  (Required) who is initializing this event
                     * @param args  (Required) additional parameter
                     */
                    notify(event: string, source: geotoolkit.scene.Node, args: any): any;
                    /**
                     * Set track width and layout remains tracks
                     * @param width  (Required) track width
                     * @param track  (Required) current track
                     */
                    setTrackWidth(width: number, track: geotoolkit.welllog.LogTrack|any[]): this;
                    /**
                     * Returns the minimum width of a track
                     * @param track  (Optional) track to get minimum width
                     */
                    getMinWidth(track?: geotoolkit.welllog.LogTrack): geotoolkit.layout.LayoutStyle;
                    /**
                     * Returns the maximum width of a track
                     * @param track  (Optional) track to get maximum width
                     */
                    getMaxWidth(track?: geotoolkit.welllog.LogTrack): geotoolkit.layout.LayoutStyle;
                    /**
                     * Find nearest track at specified {number} x-coordinate
                     * @param x  (Required) x coordinate to get the track at
                     * @param gap  (Required) gap
                     */
                    static getTrackAtPosition(x: number, gap: number): any;
                    /**
                     * Find nearest track at specified {number} x-coordinate
                     * @param x  (Required) x coordinate to get the track at
                     * @param gap  (Required) gap
                     */
                    getTrackAtPosition(x: number, gap: number): any;
                    /**
                     * Update state.
                     * @param regions  (Optional) optional array to return invalid rectangles
                     * @param changes  (Optional) optional parameter to specify a reason of changes
                     */
                    updateState(regions?: geotoolkit.util.Rect[], changes?: geotoolkit.scene.Node.StateChanges): this;
                    /**
                     * Gets all the properties pertaining to this object
                     */
                    getProperties(): any;
                    /**
                     * Sets all the properties pertaining to this object
                     * @param properties  (Required) An object containing the properties to set
                     * @param properties.indent  (Optional) indent indent between tracks
                     * @param properties.tracks  (Optional) tracks
                     * @param properties.layers  (Optional) layers
                     */
                    setProperties(properties: any | { indent?: number; tracks?: geotoolkit.welllog.LogTrack[]; layers?: geotoolkit.scene.CompositeNode[]; } ): this;
                }
                class LogHeaderContainer extends geotoolkit.welllog.HeaderContainer {
                    /**
                     */
                    constructor();
                    /**
                     * Add layer to container
                     * @param layer  (Required) layer to be added
                     */
                    addLayer(layer: geotoolkit.scene.Layer): this;
                    /**
                     * @param context  (Required) to render header container
                     */
                    render(context: geotoolkit.renderer.RenderingContext): any;
                    /**
                     * Gets all the properties pertaining to this object
                     */
                    getProperties(): any;
                    /**
                     * Sets all the properties pertaining to this object
                     * @param properties  (Required) An object containing the properties to set
                     * @param properties.layers  (Optional) layers
                     */
                    setProperties(properties: any | { layers?: geotoolkit.scene.Layer[]; } ): this;
                }
                /**
                 * This class is used internally in WellLogWidget to show selected depths.
                 */
                class DepthMarkerShape extends geotoolkit.scene.shapes.ScaledShape {
                    /**
                     * This class is used internally in WellLogWidget to show selected depths.
                     * @param options  (Optional) shape options
                     * @param options.linestyle  (Optional) style applied on outline
                     * @param options.fillstyle  (Optional) style applied on fill
                     * @param options.textstyle  (Optional) style applied on text
                     * @param options.showdepth  (Optional) show depths
                     * @param options.datetimeformat  (Optional) date time format in case if track container scale unit belongs to 'time'
                     * @param options.depthformater  (Optional) depth index format that accept number
                     * @param options.valueformater  (Optional) curve value format that accept object with properties { 'curve', 'depth', 'value' }
                     * @param trackContainer  (Optional) track container to display depth markers
                     */
                    constructor(options?: any | { linestyle?: geotoolkit.attributes.LineStyle|any; fillstyle?: geotoolkit.attributes.FillStyle|any; textstyle?: geotoolkit.attributes.TextStyle|any; showdepth?: boolean; datetimeformat?: string; depthformater?: geotoolkit.util.Format|Function; valueformater?: geotoolkit.util.Format|Function; } , trackContainer?: geotoolkit.welllog.widgets.visuals.LogTrackContainer);
                    /**
                     * copy constructor
                     * @param src  (Required) Source to copy from
                     */
                    protected copyConstructor(src: geotoolkit.welllog.widgets.visuals.DepthMarkerShape): this;
                    /**
                     * Return text style
                     */
                    getTextStyle(): geotoolkit.attributes.TextStyle;
                    /**
                     * Set text style
                     * @param textStyle  (Required) a new shape text style
                     * @param textStyle.color  (Optional) text color
                     * @param textStyle.baseLine  (Optional) base line.
                     * @param textStyle.alignment  (Optional) alignment.
                     * @param textStyle.font  (Optional) font.
                     * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                     */
                    setTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                    /**
                     * Return bounds
                     */
                    getBounds(): geotoolkit.util.Rect;
                    /**
                     * Set depth value
                     * @param depth  (Required) depth value
                     */
                    setDepth(depth: number): this;
                    /**
                     * Renders node
                     * @param context  (Required) The rendering context to be used to draw the node
                     */
                    render(context: geotoolkit.renderer.RenderingContext): any;
                }
            }
            module overlays {
                /**
                 * Creates default implementation of the welllog annotation overlay
                 */
                class AnnotationOverlay extends geotoolkit.widgets.overlays.AnnotationOverlay {
                    /**
                     * Creates default implementation of the welllog annotation overlay
                     * @param widget  (Required) 
                     */
                    constructor(widget: geotoolkit.welllog.widgets.WellLogWidget);
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
            module persistence {
                /**
                 * The implementation of the default serializer registry for WellLogWidgets
                 */
                class Registry extends geotoolkit.persistence.Registry {
                    /**
                     * The implementation of the default serializer registry for WellLogWidgets
                     */
                    constructor();
                    /**
                     * Return instance of the default registry
                     */
                    static getInstance(): geotoolkit.welllog.widgets.persistence.Registry;
                }
            }
            module WellLogWidget {
                /**
                 * enum for Events triggered by the WellLog Widget.
                 */
                interface Events {
                    /**
                     * This event occurs when the visible depth limits is changed. It can scroll, scale operations.
                     */
                    VisibleDepthLimitsChanged: string;
                    /**
                     * If widget orientation changed.
                     */
                    OrientationChanged: string;
                    /**
                     * This events occurs when virtual depth model limit is changed. For example, if you call method setDepthLimits.
                     */
                    DepthRangeChanged: string;
                    /**
                     * This occurs if any sum size of all tracks is changed. It can also happen if a track is deleted, inserted or changed size
                     */
                    TracksSizeChanged: string;
                    /**
                     * It occurs when widget can request data. It happens if visible limits or scale is changed.
                     */
                    DataUpdating: string;
                    /**
                     * If visual is selected.
                     */
                    VisualsSelected: string;
                }
            }
        }
    }
}
