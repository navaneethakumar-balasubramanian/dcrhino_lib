declare module geotoolkit {
    module map {
        /**
         * Enum for geodetic coordinate systems
         */
        var GeodeticSystem: any;
        /**
         * Map Widget defines a single map which is a collection of the different map layers ( WFS, WMTS, Shape, GeoJson layer..) Its supports different map providers that are tile and feature based.<br>
         * addLayer(), insertLayer() and removeLayer() functions are used to add or remove MapJS layers ( {@link geotoolkit.map.layers.AbstractLayer } ).<br>
         * Widget supports changing the Z-order of layers as shown in Advanced Map Tutorial. <br>
         * getModelLimits/setModelLimits handle the bounds for the layer and other properties can be set using setOptions().<br>
         * Some navigation/utility functions like PanTo allows moving view position of the map to the specified map coordinate or focuses the map on a point.<br>
         * In version 2.6 map has no API for dynamic rotation.
         * <br>
         * Widget includes some default tools like:
         * <ul>
         *     <li> Pan Tool </li>
         *     <li> RubberBand Tool </li>
         *     <li> Selection </li>
         *     <li> Pinch Zoom </li>
         *     <li> Zoom with Scroll Wheel</li>
         * </ul>
         */
        class Map extends geotoolkit.widgets.AnnotatedWidget {
            /**
             * Map Widget defines a single map which is a collection of the different map layers ( WFS, WMTS, Shape, GeoJson layer..) Its supports different map providers that are tile and feature based.<br>
             * addLayer(), insertLayer() and removeLayer() functions are used to add or remove MapJS layers ( {@link geotoolkit.map.layers.AbstractLayer } ).<br>
             * Widget supports changing the Z-order of layers as shown in Advanced Map Tutorial. <br>
             * getModelLimits/setModelLimits handle the bounds for the layer and other properties can be set using setOptions().<br>
             * Some navigation/utility functions like PanTo allows moving view position of the map to the specified map coordinate or focuses the map on a point.<br>
             * In version 2.6 map has no API for dynamic rotation.
             * <br>
             * Widget includes some default tools like:
             * <ul>
             *     <li> Pan Tool </li>
             *     <li> RubberBand Tool </li>
             *     <li> Selection </li>
             *     <li> Pinch Zoom </li>
             *     <li> Zoom with Scroll Wheel</li>
             * </ul>
             * @param options  (Optional) Data passed in
             * @param options.bounds  (Optional) bounds where to place the widget
             * @param options.border  (Optional) defines properties for widget outer border
             * @param options.border.color  (Optional) color of border border
             * @param options.maplimits  (Optional) limits of the map
             * @param options.system  (Optional) geodetic system we want the map to use
             * @param options.mapimage  (Optional) image to be displayed locked at the bottom right of the map
             * @param options.mapscale  (Optional) sets the initial map scale
             * @param options.model  (Optional) optional model of the center
             * @param options.layerscontainer  (Optional) defined a container of map layers.
If it is not specified than the default container is used. If a container specified than it must be inserted the model.
             * @param options.wrapped  (Optional) is map model limits wrapped in infinite loop
             * @param options.viewcache  (Optional) enable tiled cache for all map layers. It increase rendering performance for historical data
             * @param options.viewcachesize  (Optional) viewcachesize options to set
             * @param options.viewcachesize.width  (Optional) set tiled cache size.
             * @param options.viewcachesize.height  (Optional) set tiled cache size.
             * @param options.viewcachemode  (Optional) set tiled cache mode
             * @param options.viewcachememorylimit  (Optional) set tiled cache memory limit
             * @param options.viewcacheasync  (Optional) set tiled cache asynchrony
             * @param options.zoom  (Optional) map zoom options
             * @param options.zoom.max  (Optional) maximum zoom limit (i.e. '500' value means user cannot zoom-out after 1:500 scale - 500 meters in 1 pixel). Scale is counted on the equator (by .getMapScale() method), so it can be different with the actual scale on current parallel
             * @param options.zoom.min  (Optional) minimum zoom limit (i.e. '100' value means user cannot zoom-in after 1:100 scale - 100 meters in 1 pixel). Scale is counted on the equator (by .getMapScale() method), so it can be different with the actual scale on current parallel
             * @param options.zoom.speed  (Optional) zoom speed (e.g. 2 means that zoom-in brings the map x2 times closer)
             * @param options.zoom.time  (Optional) zoom time in milliseconds (set to 0 for instant zoom)
             * @param options.tooltip  (Optional) tooltip options
             * @param options.tooltip.divelement  (Optional) HTML div tooltip element or it will be created with className cg-tooltip-container
             * @param options.tooltip.offsetx  (Optional) offset of tooltip from current position by x in pixels
             * @param options.tooltip.offsety  (Optional) offset of tooltip from current position by y in pixels
             * @param options.tooltip.alignment  (Optional) tooltip alignment according to the point set by offsets
             * @param options.tooltip.mode  (Optional) tooltip appearance mode
             * @param options.tooltip.max  (Optional) max number of the features info showing (set to Infinity for unlimited selection)
             * @param options.tooltip.autoupdate  (Optional) true if tooltip info should be auto updated after map.invalidate() was called
             * @param options.mapscaleobject  (Optional) MapScale information to be locked at the bottom left of the map
             * @param options.webmap  (Optional) the ArcGIS WebMap server url
             * @param options.scaleunit  (Optional) scale unit
             */
            constructor(options?: any | { bounds?: geotoolkit.util.Rect; border?: any | { color?: any; } ; maplimits?: geotoolkit.util.Rect; system?: geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem; mapimage?: geotoolkit.scene.shapes.Image; mapscale?: number; model?: geotoolkit.scene.Group; layerscontainer?: geotoolkit.scene.Group; wrapped?: boolean; viewcache?: boolean; viewcachesize?: any | { width?: number; height?: number; } ; viewcachemode?: number; viewcachememorylimit?: number; viewcacheasync?: boolean; zoom?: any | { max?: number; min?: number; speed?: number; time?: number; } ; tooltip?: any | { divelement?: HTMLElement; offsetx?: number; offsety?: number; alignment?: geotoolkit.util.AnchorType; mode?: geotoolkit.controls.tools.PointerMode|string; max?: number; autoupdate?: boolean; } ; mapscaleobject?: geotoolkit.map.util.MapScale; webmap?: string; scaleunit?: geotoolkit.util.Unit; } );
            /**
             * Map Events
             */
            static Events: any;
            /**
             * Transform a point from coordinate system to map coordinate system
             * @param point  (Required) point to transform
             * @param from  (Required) system converting from
             */
            transformToMap(point: geotoolkit.util.Point, from: geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem): geotoolkit.util.Point;
            /**
             * Transform a point from map coordinate system to specified coordinate system
             * @param point  (Required) point to transform
             * @param to  (Required) system converting from
             */
            transformFromMap(point: geotoolkit.util.Point, to: geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem): geotoolkit.util.Point;
            /**
             * Transform point
             * @param point  (Required) point to transform
             * @param from  (Required) system converting from
             * @param to  (Required) system converting to
             */
            transformPoint(point: geotoolkit.util.Point, from: geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem, to: geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem): geotoolkit.util.Point|any;
            /**
             * Returns the map logo (if exists)
             */
            getMapImage(): geotoolkit.scene.shapes.Image|any;
            /**
             * Scale node's contents.
             * @param amount  (Required) zoom factor (> 1 for in, \< 1 for out)
             * @param posX  (Required) x position to scale from (in pxl)
             * @param posY  (Required) y position to scale from (in pxl)
             */
            zoom(amount: number, posX: number, posY: number): this;
            /**
             * Sets the current map scale
             * @param scale  (Required) map scale
             * @param onCurrentParallel  (Optional) true, if you need to use factor, else false
             */
            setMapScale(scale: number, onCurrentParallel?: boolean): this;
            /**
             * gets the current map scale
             * @param onCurrentParallel  (Optional) true, if you need to use factor, else false
             */
            getMapScale(onCurrentParallel?: boolean): number;
            /**
             * removes scrollbars
             */
            getOptions(): any;
            /**
             * Sets options
             * @param options  (Optional) options
             * @param options.mapimage  (Optional) image to be displayed locked at the bottom right of the map
             * @param options.maplimits  (Optional) limits of the map
             * @param options.scaleunit  (Optional) scale unit
             * @param options.mapscale  (Optional) sets the initial map scale
             * @param options.mapscaleobject  (Optional) MapScale information to be locked at the bottom left of the map
             */
            setOptions(options?: any | { mapimage?: geotoolkit.scene.shapes.Image; maplimits?: geotoolkit.util.Rect; scaleunit?: geotoolkit.util.Unit; mapscale?: number; mapscaleobject?: geotoolkit.map.util.MapScale; } ): this;
            /**
             * Notifies the Map of a device resize
             * @param device  (Required) new device bounds
             * @param oldscale  (Required) previous map scale to keep the map at
             */
            onResize(device: geotoolkit.util.Rect, oldscale: number): any;
            /**
             * Gets the working system of the map
             */
            getCoordinateSystem(): geotoolkit.map.coordinatesystems.AbstractSystem;
            /**
             * initialize tools
             */
            initializeTools(): any;
            /**
             * Method to add a map layer. Layers can be added on top of existing layers.
             * @param layer  (Required) layer to add
             */
            addLayer(layer: geotoolkit.map.layers.AbstractLayer): this;
            /**
             * Sets inner model limits
             * @param limits  (Required) inner limits
             */
            setCenterModelLimits(limits: geotoolkit.util.Rect): this;
            /**
             * Gets model limits, the limits of this groups inside space
             */
            getCenterModelLimits(): geotoolkit.util.Rect|any;
            /**
             * Sets the Map scale object that is anchored in the bottom right of the map
             * @param mapscale  (Required) map scale
             */
            setMapScaleObject(mapscale: geotoolkit.map.util.MapScale): this;
            /**
             * gets the center point on the map.
             */
            getMapCenter(): geotoolkit.util.Point;
            /**
             * Pans the map to the point.
             * @param center  (Required) point where to pan
             * @param coordSystem  (Required) if null assumes map system
             * @param elastic  (Optional) is panTo move elastic or instant
             */
            panTo(center: geotoolkit.util.Point, coordSystem: geotoolkit.map.GeodeticSystem, elastic?: boolean): this;
            /**
             * Return layer count
             */
            getLayerCount(): number;
            /**
             * Return layer by index
             * @param i  (Required) index of the node
             */
            getLayer(i: number): geotoolkit.map.layers.AbstractLayer;
            /**
             * Removes a Layer
             * @param layer  (Required) Layer to remove
             */
            removeLayer(layer: geotoolkit.map.layers.AbstractLayer): this;
            /**
             * Inserts a Layer, if the layer is already a child, this moves it.  Layer can be inserted at a z depth or index as required.<br>
             * For Example <code> map.insertLayer(layer, index); </code>
             * @param layer  (Required) Layer to insert
             * @param index  (Required) where to insert layer
             */
            insertLayer(layer: geotoolkit.map.layers.AbstractLayer, index: number): this;
            /**
             * Gets scale unit
             */
            getScaleUnit(): geotoolkit.util.Unit;
            /**
             * Sets scale unit
             * @param unit  (Required) new unit of this map
             */
            setScaleUnit(unit: geotoolkit.util.Unit): this;
            /**
             * Sets bounds of the map
             * @param bounds  (Required) bound of the map
             */
            setBounds(bounds: geotoolkit.util.Rect|any): this;
        }
        /**
         * Enum for geodetic coordinate systems
         */
        interface GeodeticSystem {
            /**
             * World Geodetic System 1984
             */
            WGS84: string;
            /**
             * Latitude/Longitude (Geographic) coordinate system
             */
            LatLon: string;
            /**
             * Universal Transverse Mercator
             */
            UTM: string;
            /**
             * None
             */
            None: string;
        }
        module sources {
            /**
             * Feature sources events.
             */
            var Events: any;
            /**
             * Abstract map source that loads server settings and then queries some sort of data from it
             */
            class AbstractSource extends geotoolkit.util.EventDispatcher {
                /**
                 * Abstract map source that loads server settings and then queries some sort of data from it
                 * @param options  (Optional) options
                 * @param options.loader  (Optional) loader for loading server settings. If loader=null,
                 * @param options.ondataloaded  (Optional) after loader load data
                 * @param options.ondatafailed  (Optional) after loader failed to load data
there's not server settings request sending.
                 * @param options.format  (Optional) format for the server data requests formatting
                 * @param options.system  (Optional) initial data coordinate system
                 * @param options.url  (Optional) data server url
                 */
                constructor(options?: any | { loader?: geotoolkit.map.sources.loaders.AbstractLoader; ondataloaded?: Function; ondatafailed?: Function; format?: geotoolkit.map.sources.formats.AbstractFormat; system?: string|geotoolkit.map.coordinatesystems.AbstractSystem; url?: string; } );
                /**
                 * Sets the server url to use for requesting
                 * @param url  (Required) server url
                 */
                setServerURL(url: string): this;
                /**
                 * Returns true if server data is already loaded (or no loader provided)
                 */
                isDataLoaded(): boolean;
                /**
                 * Gets the server url that is currently used for requests
                 */
                getServerURL(): string;
                /**
                 * Returns promise that is loaded when server settings are ready to process
                 */
                loadServerData(): geotoolkit.util.Promise;
                /**
                 * Returns the current data model limits (presumably loaded from the server if it's settled)
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Sets map coordinate system.
                 * @param system  (Required) map coordinate system
                 */
                setMapCoordinateSystem(system: string|geotoolkit.map.coordinatesystems.AbstractSystem): this;
                /**
                 * Gets current map coordinate system.
                 */
                getMapCoordinateSystem(): geotoolkit.map.coordinatesystems.AbstractSystem;
                /**
                 * Sets the data initial coordinate system.
                 * @param system  (Required) initial coordinate system
                 */
                setInitialCoordinateSystem(system: string|geotoolkit.map.coordinatesystems.AbstractSystem): this;
                /**
                 * Gets current data initial coordinate system.
                 */
                getInitialCoordinateSystem(): geotoolkit.map.coordinatesystems.AbstractSystem;
                /**
                 * Gets transformer to transform data to map coordinate system
                 */
                getTransformerToMap(): geotoolkit.map.coordinatesystems.Transformer;
                /**
                 * Gets transformer to transform data from map coordinate system
                 */
                getTransformerFromMap(): geotoolkit.map.coordinatesystems.Transformer;
                /**
                 * Clears all the data.
                 */
                clear(): this;
                /**
                 * Aborts all the sent requests, resends the last one
                 */
                update(): this;
                /**
                 * Disposes this source, once disposed it should not be used anymore.<br>
                 */
                dispose(): any;
            }
            /**
             * Vector source that allows user to get features from remote resource
             */
            class Vector extends geotoolkit.map.sources.AbstractSource {
                /**
                 * Vector source that allows user to get features from remote resource
                 * @param options  (Optional) options
                 * @param options.format  (Optional) the remote features format
                 * @param options.idfield  (Optional) field that contains the id for the features
                 * @param options.mode  (Optional) the features requesting mode
                 * @param options.requestresolution  (Optional) a grid size for layer partitioning, that is used for server requests in 'Grid' mode
                 * @param options.timeout  (Optional) the timeout (in ms) between viewport changed and new features requested (if request is needed)
                 */
                constructor(options?: any | { format?: geotoolkit.map.sources.formats.AbstractFormat; idfield?: string; mode?: string|geotoolkit.map.features.QueryMode; requestresolution?: number; timeout?: number; } );
                /**
                 * Sends a request for features in given bounding box.
                 * @param bbox  (Required) bounding box for features
                 * @param layer  (Required) layer requesting
                 */
                queryFeatures(bbox: geotoolkit.util.Rect, layer: geotoolkit.map.layers.AbstractFeatureLayer): this;
                /**
                 * Notifies source to add features.
                 * @param features  (Required) features to add
                 * @param needTransform  (Optional) true if features should be transformed to the map coordinates
                 */
                addFeatures(features: geotoolkit.map.features.AbstractFeature[], needTransform?: boolean): this;
                /**
                 * Notifies source to remove feature.
                 * @param feature  (Required) feature to remove
                 */
                removeFeature(feature: geotoolkit.map.features.AbstractFeature): this;
                /**
                 * Notifies source to remove all features added.
                 */
                clearFeatures(): this;
                /**
                 * Parses features from the data object and adds it to the source
                 * @param data  (Required) data object (or its string representation) containing the features data in a specific format
                 */
                loadData(data: string|any): this;
                /**
                 * Requests data from the resource and parses the response
                 * @param resource  (Required) resource url for request
                 */
                requestData(resource: string): any;
                /**
                 * Sets the unique identifier for the features
                 * @param field  (Required) unique identifier
                 */
                setUniqueField(field: string): this;
                /**
                 * Gets the unique identifier for the dataset
                 */
                getUniqueField(): string;
                /**
                 * Sets the grid size for layer partitioning that is used for server requests
                 * @param resolution  (Required) grid size
                 */
                setRequestResolution(resolution: number): this;
                /**
                 * Gets the grid size for layer partitioning that is used for server requests
                 */
                getRequestResolution(): number;
            }
            /**
             * Image source that allows user to get map data as an image using the format provided
             */
            class Image extends geotoolkit.map.sources.AbstractSource {
                /**
                 * Image source that allows user to get map data as an image using the format provided
                 * @param options  (Optional) options
                 * @param options.timeout  (Optional) the timeout (in ms) between viewport changed and new image requested
                 * @param options.inflate  (Optional) inflate ratio for requesting area (0.2 by default means +20%)
                 * @param options.uselayerlimits  (Optional) set true to clip requesting image with the layer limits, false otherwise
                 */
                constructor(options?: any | { timeout?: number; inflate?: number; uselayerlimits?: boolean; } );
                /**
                 * Notifies source to remove all data added.
                 */
                clear(): this;
                /**
                 * Sets image inflate ratio to use
                 * @param ratio  (Required) image inflate ratio (e.g. 0.2 means the 20% inflation)
                 */
                setInflateRatio(ratio: number): this;
                /**
                 * Returns current inflate ratio
                 */
                getInflateRatio(): number;
                /**
                 * Sets the server layer name(s) to be shown on the layer
                 * @param layers  (Required) layer id(s) to be shown
                 */
                showLayers(layers: string|number[]): this;
                /**
                 * Adds the passed in ID's to the list of layers to hide
                 * @param id  (Optional) ID(s) for the layers to show
                 */
                hideLayers(id?: number|number[]): this;
                /**
                 * Returns the server layer ids that are requested.
                 */
                getVisibleLayers(): number[];
                /**
                 * Returns layers JSON data loaded from the server
                 * Should be used asynchronically after loadServerData() method is called
                 */
                getLayers(): any;
            }
            /**
             * Tile source that allows user to get tiles from the server
             */
            class Tile extends geotoolkit.map.sources.AbstractSource {
                /**
                 * Tile source that allows user to get tiles from the server
                 * @param options  (Optional) options
                 * @param options.tilewidth  (Optional) width for the tiles to use (in px)
                 * @param options.tileheight  (Optional) height for the tiles to use (in px)
                 * @param options.imagepool  (Optional) the amount of cache for the tile images
                 * @param options.minlod  (Optional) the minimum level of details for the tiles
                 * @param options.maxlod  (Optional) the maximum level of details for the tiles
                 * @param options.formatterfunction  (Optional) the function that takes z, y, x and turns that into tile location (replaces the format field)
                 * @param options.token  (Optional) authorization token (for ArcGIS tile servers if needed)
                 */
                constructor(options?: any | { tilewidth?: number; tileheight?: number; imagepool?: number; minlod?: number; maxlod?: number; formatterfunction?: Function; token?: string; } );
                /**
                 * Notifies source to remove all tiles added.
                 */
                clear(): this;
                /**
                 * Sets properties (default properties listed are for construction time only)
                 * @param properties  (Optional) options
                 * @param properties.tilewidth  (Optional) width for the tiles to use (in px)
                 * @param properties.tileheight  (Optional) height for the tiles to use (in px)
                 * @param properties.imagepool  (Optional) the amount of cache for the tile images
                 * @param properties.minlod  (Optional) the minimum level of details for the tiles
                 * @param properties.maxlod  (Optional) the maximum level of details for the tiles
                 * @param properties.url  (Optional) the server url
                 */
                setProperties(properties?: any | { tilewidth?: number; tileheight?: number; imagepool?: number; minlod?: number; maxlod?: number; url?: string; } ): this;
            }
            /**
             * Composite source that stores multiple vector sources for centralized control and processing
             */
            class CompositeSource extends geotoolkit.map.sources.Vector {
                /**
                 * Composite source that stores multiple vector sources for centralized control and processing
                 * @param sources  (Optional) source(s) for storing
                 */
                constructor(sources?: geotoolkit.map.sources.Vector|any[]);
                /**
                 * Adds vector source to the list for getting new features
                 * @param source  (Required) source to add
                 */
                addFeatureSource(source: geotoolkit.map.sources.Vector): this;
                /**
                 * Removes source from the sources list
                 * @param source  (Required) source to remove
                 */
                removeFeatureSource(source: geotoolkit.map.sources.Vector): this;
                /**
                 * Gets current sources list used to add a new features
                 */
                getFeatureSourceList(): geotoolkit.map.sources.Vector[];
                /**
                 * Sets map coordinate system.
                 * @param system  (Required) map coordinate system
                 */
                setMapCoordinateSystem(system: string|geotoolkit.map.coordinatesystems.AbstractSystem): this;
                /**
                 * Sets initial features coordinate system.
                 * @param system  (Required) initial coordinate system
                 */
                setInitialCoordinateSystem(system: geotoolkit.map.coordinatesystems.AbstractSystem): this;
                /**
                 * Sets the grid size for layer partitioning that is used for server requests
                 * @param resolution  (Required) grid size
                 */
                setRequestResolution(resolution: number): this;
                /**
                 * Sets the unique identifier for the features
                 * @param field  (Required) unique identifier
                 */
                setUniqueField(field: string): this;
                /**
                 * Notifies source to remove all features added.
                 */
                clear(): this;
                /**
                 * Disposes this source, once disposes a node should not be used anymore.<br>
                 */
                dispose(): any;
            }
            /**
             * Vector source that allows user to get features from ArcGIS FeatureService server
             */
            class ArcGISFeature extends geotoolkit.map.sources.Vector {
                /**
                 * Vector source that allows user to get features from ArcGIS FeatureService server
                 * @param options  (Optional) options
                 * @param options.requestfields  (Optional) an array for requested fields. If null, all the fields are loaded
                 * @param options.layers  (Optional) server layers to request (for multilayer server only)
                 * @param options.offsetsupport  (Optional) true if offsetSupport server's property should be used (otherwise quadtree division is used)
                 * @param options.token  (Optional) authorization token for ArcGIS data servers (if needed)
                 */
                constructor(options?: any | { requestfields?: string[]; layers?: string|string[]; offsetsupport?: boolean; token?: string; } );
                /**
                 * Sets the list of the fields to request from the server (should be set before the server url)
                 * @param requestFields  (Required) an array of fields to request from server
                 */
                setRequestFields(requestFields: string[]): this;
                /**
                 * Returns an array of fields to be requested from server
                 */
                getRequestFields(): string[]|any;
                /**
                 * Returns the layers data array (for the multilayer server source)
                 * Should be used asynchronically after loadServerData() method is called
                 */
                getLayers(): any[];
                /**
                 * Returns separate feature source for the given layer (for the multilayer server source)
                 * Should be used asynchronically after loadServerData() method is called
                 * @param id  (Required) required layer id
                 */
                getLayerSource(id: string): geotoolkit.map.sources.ArcGISFeature;
                /**
                 * Returns true if feature source's server contains multiple layers
                 * Should be used asynchronically after loadServerData() method is called
                 */
                isMultilayerSource(): boolean;
                /**
                 * Returns the server layer's global alpha (for singlelayer servers basically)
                 * Should be used asynchronically after loadServerData() method is called
                 */
                getGlobalAlpha(): number;
                /**
                 * Returns scale visible range for the server's layer (for singlelayer servers basically)
                 * Should be used asynchronically after loadServerData() method is called
                 */
                getScaleRange(): number[];
                /**
                 * Returns annotation's text shape parsed from the server (for singlelayer servers basically)
                 * Should be used asynchronically after loadServerData() method is called
                 */
                getAnnotationShape(): geotoolkit.scene.shapes.Text;
                /**
                 * Adds the passed in ID's to the list of layers to show
                 * @param id  (Required) id(s) for the layer(s) to show
                 */
                showLayers(id: number|number[]): this;
                /**
                 * Returns layer initial extent rectangle
                 */
                getInitialModelLimits(): geotoolkit.util.Rect;
                /**
                 * Returns the server layer ids that are requested.
                 */
                getVisibleLayers(): number[];
                /**
                 * Disposes this source, once disposed it should not be used anymore.<br>
                 */
                dispose(): any;
                /**
                 * Creates a server legend from its templates (short info about each layer, such as layer name, type and icon)
                 * @param callback  (Required) the result handler
                 */
                queryLegend(callback: Function): any;
            }
            /**
             * Image source for ArcGIS servers that supports additional features provided by ArcGIS servers (such as getting legend)
             */
            class ArcGISImage extends geotoolkit.map.sources.Image {
                /**
                 * Image source for ArcGIS servers that supports additional features provided by ArcGIS servers (such as getting legend)
                 * @param options  (Optional) options
                 * @param options.token  (Optional) authorization token for ArcGIS data servers (if needed)
                 */
                constructor(options?: any | { token?: string; } );
                /**
                 * Queries server legend (short info about each layer, such as layer name, type and icon)
                 * @param callback  (Required) the result handler
                 */
                queryLegend(callback: Function): any;
                /**
                 * Queries data by the geometry provided
                 * @param geometry  (Required) geometry to query
                 */
                queryGeometry(geometry: any): any[];
                /**
                 * Aborts all the geometry data queried
                 */
                abortGeometryQueries(): this;
                /**
                 * Queries data by the geometry provided
                 * @param geometry  (Required) area geometry to identify
                 * @param layer  (Required) layer for query
                 */
                identify(geometry: geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Polygon, layer: geotoolkit.map.layers.ArcGISImage): any[];
                /**
                 * Returns layer initial extent rectangle
                 */
                getInitialModelLimits(): geotoolkit.util.Rect;
                /**
                 * Sets layers to show as the tooltip info (in .queryGeometry and .identify methods)
                 * @param layers  (Required) layers to show tooltip
                 */
                setTooltipLayers(layers: number|number[]): this;
            }
            /**
             * Vector source that allows user to get features from remote resource in GeoJSON format
             */
            class GeoJSON extends geotoolkit.map.sources.Vector {
                /**
                 * Vector source that allows user to get features from remote resource in GeoJSON format
                 * @param options  (Optional) options
                 * @param options.format  (Optional) the remote features format
                 */
                constructor(options?: any | { format?: geotoolkit.map.sources.formats.AbstractFormat; } );
            }
            /**
             * Vector source that allows user to get features from remote resource in KML (Keyhole Markup Language) format
             */
            class KML extends geotoolkit.map.sources.Vector {
                /**
                 * Vector source that allows user to get features from remote resource in KML (Keyhole Markup Language) format
                 * @param options  (Optional) options
                 * @param options.format  (Optional) the remote features format
                 */
                constructor(options?: any | { format?: geotoolkit.map.sources.formats.AbstractFormat; } );
            }
            /**
             * Vector source that allows user to get features from WFS (Web Feature Service) server
             */
            class WFS extends geotoolkit.map.sources.Vector {
                /**
                 * Vector source that allows user to get features from WFS (Web Feature Service) server
                 * @param options  (Optional) options
                 * @param options.format  (Optional) the remote features format
                 * @param options.loader  (Optional) loader for loading server settings
                 * @param options.featureTypes  (Optional) featureType name(s) to receive from the server
                 * @param options.version  (Optional) WFS version to use
                 */
                constructor(options?: any | { format?: geotoolkit.map.sources.formats.AbstractFormat; loader?: geotoolkit.map.sources.loaders.AbstractLoader; featureTypes?: string[]|string; version?: string; } );
                /**
                 * Sets the featureTypes parameter sent to the server. The first one from the list is used, if no types provided
                 * @param types  (Optional) featureType name(s) to receive from the server
                 */
                setFeatureTypes(types?: string[]|string): this;
                /**
                 * Returns the featureTypes parameter sent to the server.
                 */
                getFeatureTypes(): string[]|string|any;
            }
            /**
             * Image source that allows user to get map data as an image using the WMS (Web Map Service) server
             */
            class WMS extends geotoolkit.map.sources.Image {
                /**
                 * Image source that allows user to get map data as an image using the WMS (Web Map Service) server
                 * @param options  (Optional) options
                 * @param options.imageformat  (Optional) image format to use
                 */
                constructor(options?: any | { imageformat?: string; } );
                /**
                 * Sets the image format to be used
                 * @param format  (Required) image format to use (e.g. 'png')
                 */
                setImageFormat(format: string): this;
                /**
                 * Returns the image format currently used
                 */
                getImageFormat(): string;
                /**
                 * Sets the image transparency
                 * @param transparent  (Required) image transparency
                 */
                setTransparent(transparent: boolean): this;
                /**
                 * Returns the image current transparency
                 */
                getTransparent(): boolean;
                /**
                 * Sets WMS version to use
                 * @param version  (Required) version to use (in '1.3.0' format)
                 */
                setVersion(version: string): this;
                /**
                 * Returns WMS version currently used
                 */
                getVersion(): string;
            }
            /**
             * Vector source that allows user to get features from remote resource in CSV (Comma-Separated Values) format
             */
            class CSV extends geotoolkit.map.sources.Vector {
                /**
                 * Vector source that allows user to get features from remote resource in CSV (Comma-Separated Values) format
                 * @param options  (Optional) options
                 * @param options.format  (Optional) the remote features format
                 * @param options.delimiter  (Optional) data delimiter, ',' symbol is used for CSV format by default
                 * @param options.longitudeField  (Optional) string(s) defining the field name(s) that holds the longitude (X) coordinate
                 * @param options.latitudeField  (Optional) string(s) defining the field name(s) that holds the latitude (Y) coordinate
                 */
                constructor(options?: any | { format?: geotoolkit.map.sources.formats.AbstractFormat; delimiter?: string; longitudeField?: string|string[]; latitudeField?: string|string[]; } );
                /**
                 * Sets the latitude coordinate field name(s)
                 * @param field  (Required) latitude field name(s)
                 */
                setLatitudeField(field: string|string[]): this;
                /**
                 * Returns the latitude coordinate field name(s)
                 */
                getLatitudeField(): string|string[];
                /**
                 * Sets the longitude coordinate field name(s)
                 * @param field  (Required) longitude field name(s)
                 */
                setLongitudeField(field: string): this;
                /**
                 * Returns the longitude coordinate field name(s)
                 */
                getLongitudeField(): string|string[];
            }
            /**
             * Vector source that allows user to get features from remote resource in GeoRSS (Geographically Encoded Objects for RSS feeds) format
             */
            class GeoRSS extends geotoolkit.map.sources.Vector {
                /**
                 * Vector source that allows user to get features from remote resource in GeoRSS (Geographically Encoded Objects for RSS feeds) format
                 * @param options  (Optional) options
                 * @param options.format  (Optional) the remote features format
                 */
                constructor(options?: any | { format?: geotoolkit.map.sources.formats.AbstractFormat; } );
            }
            /**
             * Vector source that allows user to get features from ArcGIS Stream server
             */
            class Stream extends geotoolkit.map.sources.Vector {
                /**
                 * Vector source that allows user to get features from ArcGIS Stream server
                 * @param options  (Optional) options
                 * @param options.loader  (Optional) loader for loading server settings
                 * @param options.format  (Optional) the remote features format
                 * @param options.token  (Optional) authorization token (for ArcGIS stream servers if needed)
                 */
                constructor(options?: any | { loader?: geotoolkit.map.sources.loaders.Stream; format?: geotoolkit.map.sources.formats.Stream; token?: string; } );
            }
            /**
             * Tile source that allows user to get tiles from the Bing Maps server
             */
            class Bing extends geotoolkit.map.sources.Tile {
                /**
                 * Tile source that allows user to get tiles from the Bing Maps server
                 * @param options  (Optional) options
                 * @param options.loader  (Optional) loader for loading server settings
                 * @param options.key  (Optional) Bing Maps API key. Get yours at http://www.bingmapsportal.com/
                 * @param options.culture  (Optional) the culture code to use for the request
                 * @param options.imagerySet  (Optional) the type of imagery for request. See
geotoolkit.map.sources.Bing.ImagerySet enum for all imagery supported
                 * @param options.centerPoint  (Optional) the center point to use for the imagery
WARNING! center point is required for the Birdseye imagery and its varieties
                 */
                constructor(options?: any | { loader?: geotoolkit.map.sources.loaders.AbstractLoader; key?: string; culture?: string; imagerySet?: geotoolkit.map.sources.Bing.ImagerySet|string; centerPoint?: geotoolkit.util.Point; } );
                /**
                 * The type of Bing imagery supported
                 */
                static ImagerySet: any;
                /**
                 * Sets Bing imagery set
                 * @param imagerySet  (Required) bing imagery set
                 */
                setImagerySet(imagerySet: string): this;
                /**
                 * Sets Bing Maps API key
                 * @param key  (Required) bing maps key
                 */
                setKey(key: string): this;
                /**
                 * Sets Bing Maps culture code
                 * @param culture  (Required) bing maps culture code
                 */
                setCulture(culture: string): this;
                /**
                 * Sets Bing Maps center point
                 * @param point  (Required) bing maps culture code
                 */
                setCenterPoint(point: geotoolkit.util.Point): this;
            }
            /**
             * Vector Tile source that allows user to get features from remote resource in Pbf format
             */
            class VectorTile extends geotoolkit.map.sources.Vector {
                /**
                 * Vector Tile source that allows user to get features from remote resource in Pbf format
                 * @param options  (Optional) options
                 * @param options.format  (Optional) the remote features format
                 * @param options.styleUrl  (Optional) features drawing styles file url, if no set default styles are used
                 */
                constructor(options?: any | { format?: geotoolkit.map.sources.loaders.VectorTile; styleUrl?: string; } );
            }
            /**
             * Vector source that allows user to get features from remote resource in Lerc (Limited Error Raster Compression) format
             * Vector query mode cannot be changed, it is set to 'Bbox' permanently.
             */
            class Lerc extends geotoolkit.map.sources.Vector {
                /**
                 * Vector source that allows user to get features from remote resource in Lerc (Limited Error Raster Compression) format
                 * Vector query mode cannot be changed, it is set to 'Bbox' permanently.
                 * @param options  (Optional) source options
                 * @param options.format  (Optional) format for the server data requests formatting
                 */
                constructor(options?: any | { format?: number; } );
            }
            /**
             * Feature sources events.
             */
            interface Events {
                /**
                 * Feature added (Vector source only)
                 */
                FeatureAdded: string;
                /**
                 * Feature removed (Vector source only)
                 */
                FeatureRemoved: string;
                /**
                 * All features cleared (Vector source only)
                 */
                FeaturesCleared: string;
                /**
                 * Image Loaded (Image source only)
                 */
                ImageLoaded: string;
                /**
                 * Image Cleared (Image source only)
                 */
                ImageCleared: string;
                /**
                 * Tiles Updated (Tile source only)
                 */
                TilesUpdated: string;
                /**
                 * Info Updated
                 */
                InfoUpdated: string;
            }
            module connectors {
                /**
                 * Abstract source connector that is able to send url requests and receive data responses
                 */
                class AbstractConnector {
                    /**
                     * Abstract source connector that is able to send url requests and receive data responses
                     */
                    constructor();
                    /**
                     * Sends a request using the query provided
                     * @param url  (Required) the url requested
                     * @param options  (Required) extra options for the request (null if no needed)
                     * @param callback  (Required) the result handler that's called when response is received
                     */
                    send(url: string, options: any, callback: Function): any;
                    /**
                     * Aborts the previous queries sent
                     * @param key  (Optional) key of the queries to abort (all queries aborted if nothing provided)
                     */
                    abort(key?: string): this;
                }
                /**
                 * Source connector that sends requests by creating XMLHttpRequest with appropriate GET request
                 */
                class HttpRequest extends geotoolkit.map.sources.connectors.AbstractConnector {
                    /**
                     * Source connector that sends requests by creating XMLHttpRequest with appropriate GET request
                     */
                    constructor();
                    /**
                     * Sends XMLHttpRequest to the url provided
                     * @param url  (Required) the url requested
                     * @param options  (Optional) extra options for the request (null if no needed)
                     * @param options.key  (Optional) request key (can be used to abort it later)
                     * @param options.responseType  (Optional) request response type if necessary
                     * @param options.priority  (Optional) request priority (more priority requests are sending earlier)
                     * @param callback  (Optional) the result handler
                     */
                    send(url: string, options?: any | { key?: string; responseType?: string; priority?: number; } , callback?: Function): any;
                }
                /**
                 * Source connector that sends requests by creating DOM image with appropriate url
                 */
                class DOMImage extends geotoolkit.map.sources.connectors.AbstractConnector {
                    /**
                     * Source connector that sends requests by creating DOM image with appropriate url
                     */
                    constructor();
                    /**
                     * Creates DOM Image that requests image from the url provided
                     * @param url  (Required) url requested
                     * @param options  (Required) extra options for the request (null if no needed)
                     * @param options.key  (Optional) request key (can be used to abort it later)
                     * @param options.dst  (Optional) destination image if there's no need to create a new object
                     * @param callback  (Optional) the result handler
                     */
                    send(url: string, options: any | { key?: string; dst?: geotoolkit.scene.shapes.Image; } , callback?: Function): any;
                }
                /**
                 * Source connector that sends http requests to load the data, and after that creates DOM image with the received base64 data
                 * This approach allows user to effectively abort the requests, if necessary, and the DOM image data reload occurs quickly due to browser cache
                 */
                class PreloadedImage extends geotoolkit.map.sources.connectors.DOMImage {
                    /**
                     * Source connector that sends http requests to load the data, and after that creates DOM image with the received base64 data
                     * This approach allows user to effectively abort the requests, if necessary, and the DOM image data reload occurs quickly due to browser cache
                     */
                    constructor();
                    /**
                     * Sends http request that requests data from the url provided. After that creates DOM image with the base64 data
                     * @param url  (Required) url requested
                     * @param options  (Required) extra options for the request (null if no needed)
                     * @param options.key  (Optional) request key (can be used to abort it later)
                     * @param options.dst  (Optional) destination image if there's no need to create a new object
                     * @param options.priority  (Optional) request priority (more priority requests are sending earlier)
                     * @param callback  (Optional) the result handler
                     */
                    send(url: string, options: any | { key?: string; dst?: geotoolkit.scene.shapes.Image; priority?: number; } , callback?: Function): any;
                }
                /**
                 * Source connector that simulates the request sending and receives the predefined object
                 */
                class Stub extends geotoolkit.map.sources.connectors.AbstractConnector {
                    /**
                     * Source connector that simulates the request sending and receives the predefined object
                     * @param options  (Optional) options
                     * @param options.data  (Optional) the predefined data object
                     */
                    constructor(options?: any | { data?: any; } );
                    /**
                     * Simulates the request sending with the predefined data receiving
                     * @param url  (Required) the url requested
                     * @param options  (Required) extra options for the request (null if no needed)
                     * @param callback  (Required) the result handler
                     */
                    send(url: string, options: any, callback: Function): any;
                }
                /**
                 * Source connector that sends requests by creating WebSocket
                 */
                class WebSocket extends geotoolkit.map.sources.connectors.AbstractConnector {
                    /**
                     * Source connector that sends requests by creating WebSocket
                     */
                    constructor();
                    /**
                     * Creates WebSocket listening the url provided
                     * @param url  (Required) the url requested
                     * @param options  (Required) extra options for the request (null if no needed)
                     * @param options.key  (Optional) socket request key (can be used to abort it later)
                     * @param callback  (Optional) the result handler
                     */
                    send(url: string, options: any | { key?: string; } , callback?: Function): any;
                }
                /**
                 * Source connector that proxies another connector's request using the callback provided by user
                 */
                class Proxy extends geotoolkit.map.sources.connectors.AbstractConnector {
                    /**
                     * Source connector that proxies another connector's request using the callback provided by user
                     * @param options  (Optional) 
                     * @param options.connector  (Optional) connector to proxy
                     * @param options.callback  (Optional) callback to modify the data
                     */
                    constructor(options?: any | { connector?: geotoolkit.map.sources.connectors.AbstractConnector; callback?: Function; } );
                    /**
                     * Proxies the request with the connector provided and handles the request before the passing by
                     * @param url  (Required) the url requested
                     * @param options  (Required) extra options for the request (null if no needed)
                     * @param options.key  (Optional) request key (can be used to abort it later)
                     * @param callback  (Optional) the result handler
                     */
                    send(url: string, options: any | { key?: string; } , callback?: Function): any;
                }
                /**
                 * Source connector that wraps another one, adding (and requesting) ArcGIS token if needed
                 */
                class ArcGISToken extends geotoolkit.map.sources.connectors.AbstractConnector {
                    /**
                     * Source connector that wraps another one, adding (and requesting) ArcGIS token if needed
                     * @param options  (Optional) 
                     * @param options.connector  (Optional) connector to wrap
                     */
                    constructor(options?: any | { connector?: geotoolkit.map.sources.connectors.AbstractConnector; } );
                    /**
                     * Sends request to the url provided
                     * @param url  (Required) the url requested
                     * @param options  (Required) extra options for the request (null if no needed)
                     * @param options.key  (Optional) request key (can be used to abort it later)
                     * @param callback  (Optional) the result handler
                     */
                    send(url: string, options: any | { key?: string; } , callback?: Function): any;
                }
                module AbstractConnector {
                    /**
                     * Callback for send().
                     */
                    type sendCallback = (err: any, data: any) => any;
                }
                module HttpRequest {
                    /**
                     * Callback for send().
                     */
                    type sendCallback = (err: any, data: string) => any;
                }
                module DOMImage {
                    /**
                     * Callback for send().
                     */
                    type sendCallback = (err: any, data: geotoolkit.scene.shapes.Image) => any;
                }
                module PreloadedImage {
                    /**
                     * Callback for send().
                     */
                    type sendCallback = (err: any, data: geotoolkit.scene.shapes.Image) => any;
                }
                module Stub {
                    /**
                     * Callback for send().
                     */
                    type sendCallback = (err: any, data: string) => any;
                }
                module WebSocket {
                    /**
                     * Callback for send().
                     */
                    type sendCallback = (err: any, data: string) => any;
                }
                module Proxy {
                    /**
                     * Callback for send().
                     */
                    type sendCallback = (err: any, data: string) => any;
                }
                module ArcGISToken {
                    /**
                     * Callback for send().
                     */
                    type sendCallback = (err: any, data: string|any) => any;
                }
            }
            module loaders {
                /**
                 * Abstract source loader that loads server settings by sending appropriate query and parsing its response
                 * The settings request could be flexibly adjusted the by additional parameters specified in 'options'. All of them
                 * will be added as a query parameter.
                 */
                class AbstractLoader {
                    /**
                     * Abstract source loader that loads server settings by sending appropriate query and parsing its response
                     * The settings request could be flexibly adjusted the by additional parameters specified in 'options'. All of them
                     * will be added as a query parameter.
                     * @param options  (Optional) options
                     * @param options.connector  (Optional) connector to use
                     * @param options.settings  (Optional) settings object
                     */
                    constructor(options?: any | { connector?: geotoolkit.map.sources.connectors.AbstractConnector; settings?: any; } );
                    /**
                     * Parses server data response
                     * @param data  (Required) data received from the server
                     * @param onload  (Required) function to be called when data is loaded
                     */
                    parse(data: string, onload: Function): any;
                    /**
                     * Returns server settings request url
                     */
                    getSettingsUrl(): string;
                    /**
                     * Returns server settings request options
                     */
                    getRequestOptions(): any|any;
                    /**
                     * Sets the query parameter to add to the server settings request
                     * @param param  (Required) parameter name
                     * @param value  (Required) parameter value
                     */
                    setQueryParameter(param: string, value: string): this;
                    /**
                     * Copies query parameters from another loader
                     * @param loader  (Required) loader to clone parameters
                     */
                    cloneQueryParameters(loader: geotoolkit.map.sources.loaders.AbstractLoader): this;
                }
                /**
                 * ArcGIS source loader that loads settings and styles from FeatureService server
                 */
                class ArcGISFeature extends geotoolkit.map.sources.loaders.AbstractLoader {
                    /**
                     * ArcGIS source loader that loads settings and styles from FeatureService server
                     * @param options  (Optional) options
                     * @param options.connector  (Optional) connector to use
                     */
                    constructor(options?: any | { connector?: geotoolkit.map.sources.connectors.AbstractConnector; } );
                    /**
                     * Parses server data response
                     * @param data  (Required) data received from the server
                     * @param onload  (Required) function to be called when data is loaded
                     */
                    parse(data: string|any, onload: Function): any;
                    /**
                     * Returns server settings request url
                     */
                    getSettingsUrl(): string;
                }
                /**
                 * ArcGIS source loader that loads settings from MapService or ImageService server
                 */
                class ArcGISImage extends geotoolkit.map.sources.loaders.AbstractLoader {
                    /**
                     * ArcGIS source loader that loads settings from MapService or ImageService server
                     * @param options  (Optional) options
                     * @param options.connector  (Optional) connector to use
                     */
                    constructor(options?: any | { connector?: geotoolkit.map.sources.connectors.AbstractConnector; } );
                    /**
                     * Parses server data response
                     * @param data  (Required) data received from the server
                     * @param onload  (Required) function to be called when data is loaded
                     */
                    parse(data: string|any, onload: Function): any;
                    /**
                     */
                    clear(): any;
                    /**
                     * Returns server settings request url
                     */
                    getSettingsUrl(): string;
                }
                /**
                 * ArcGIS source loader that loads tileInfo settings from ImageService server
                 */
                class ArcGISTile extends geotoolkit.map.sources.loaders.ArcGISImage {
                    /**
                     * ArcGIS source loader that loads tileInfo settings from ImageService server
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Parses server data response
                     * @param data  (Required) data received from the server
                     * @param onload  (Required) function to be called when data is loaded
                     */
                    parse(data: string|any, onload: Function): any;
                }
                /**
                 * WMS source loader that loads settings from WMS (Web Map Service) server
                 */
                class WMS extends geotoolkit.map.sources.loaders.AbstractLoader {
                    /**
                     * WMS source loader that loads settings from WMS (Web Map Service) server
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Parses server data response
                     * @param data  (Required) data received from the server
                     * @param onload  (Required) function to be called when data is loaded
                     */
                    parse(data: string|any, onload: Function): any;
                    /**
                     * Returns server settings request url
                     */
                    getSettingsUrl(): string;
                }
                /**
                 * WFS source loader that loads settings from WFS (Web Feature Service) server
                 */
                class WFS extends geotoolkit.map.sources.loaders.AbstractLoader {
                    /**
                     * WFS source loader that loads settings from WFS (Web Feature Service) server
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Parses server data response
                     * @param data  (Required) data received from the server
                     * @param onload  (Required) function to be called when data is loaded
                     */
                    parse(data: string|any, onload: Function): any;
                    /**
                     * Returns server settings request url
                     */
                    getSettingsUrl(): string;
                }
                /**
                 * Bing source loader that loads settings from Bing Maps server
                 */
                class Bing extends geotoolkit.map.sources.loaders.AbstractLoader {
                    /**
                     * Bing source loader that loads settings from Bing Maps server
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Parses server data response
                     * @param data  (Required) data received from the server
                     * @param onload  (Required) function to be called when data is loaded
                     */
                    parse(data: string|any, onload: Function): any;
                    /**
                     * Returns server settings request url
                     */
                    getSettingsUrl(): string;
                }
                /**
                 * Stream source loader that loads settings from ArcGIS Stream server
                 */
                class Stream extends geotoolkit.map.sources.loaders.ArcGISFeature {
                    /**
                     * Stream source loader that loads settings from ArcGIS Stream server
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Parses server data response
                     * @param data  (Required) data received from the server
                     * @param onload  (Required) function to be called when data is loaded
                     */
                    parse(data: string|any, onload: Function): any;
                }
                /**
                 * VectorTile source loader that loads settings and styles from Mapbox VectorTile layer
                 */
                class VectorTile extends geotoolkit.map.sources.loaders.AbstractLoader {
                    /**
                     * VectorTile source loader that loads settings and styles from Mapbox VectorTile layer
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Parses server data response
                     * @param data  (Required) data received from the server
                     * @param onload  (Required) function to be called when data is loaded
                     */
                    parse(data: string|any, onload: Function): any;
                    /**
                     * Returns server settings request url
                     */
                    getSettingsUrl(): string;
                }
                module ArcGISImage {
                    /**
                     * Callback for queryLegend().
                     */
                    type queryLegend = (err: any, data: any) => any;
                }
            }
            module ArcGISFeature {
                /**
                 * Callback for queryLegend().
                 */
                type queryLegend = (err: any, data: any) => any;
            }
            module ArcGISImage {
                /**
                 * Callback for queryLegend().
                 */
                type queryLegend = (err: any, data: any) => any;
            }
            module formats {
                /**
                 * Abstract source format that formats data queries and sends it using the connector provided
                 * The data requests could be flexibly adjusted the by additional parameters specified in 'options'. All of them
                 * will be added as a query parameter.
                 */
                class AbstractFormat extends geotoolkit.util.EventDispatcher {
                    /**
                     * Abstract source format that formats data queries and sends it using the connector provided
                     * The data requests could be flexibly adjusted the by additional parameters specified in 'options'. All of them
                     * will be added as a query parameter.
                     * @param options  (Optional) options
                     * @param options.connector  (Optional) connector to use
                     * @param options.settings  (Optional) settings object
                     */
                    constructor(options?: any | { connector?: geotoolkit.map.sources.connectors.AbstractConnector; settings?: any; } );
                    /**
                     * Sends a request based on a settings provided
                     * That's a basic implementation for the file requests. Implement parse method to use it or override this method directly.
                     * @param query  (Optional) query params
                     * @param query.key  (Optional) connection(s) key (can be used to abort it later)
                     */
                    query(query?: any | { key?: string; } ): this;
                    /**
                     * Parses the data provided and notifies about the result.
                     * Is used in the default query implementation.
                     * @param data  (Required) data object or its string representation
                     */
                    parse(data: string|any): this;
                    /**
                     * Aborts all previous requests
                     * @param key  (Optional) key of the connections to abort (all connections aborted if nothing provided)
                     */
                    abort(key?: string): this;
                    /**
                     * Sets the query parameter to add to the data requests
                     * @param param  (Required) parameter name
                     * @param value  (Required) parameter value
                     */
                    setQueryParameter(param: string, value: string): this;
                    /**
                     * Copies query parameters from another format
                     * @param format  (Required) format to clone parameters
                     */
                    cloneQueryParameters(format: geotoolkit.map.sources.formats.AbstractFormat): this;
                }
                /**
                 * ArcGIS source format that formats map image queries to the MapService or ImageService server
                 */
                class ArcGISImage extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * ArcGIS source format that formats map image queries to the MapService or ImageService server
                     * @param options  (Optional) options
                     * @param options.connector  (Optional) connector to use
                     * @param options.geometryconnector  (Optional) connector to use for geometry queries
                     */
                    constructor(options?: any | { connector?: geotoolkit.map.sources.connectors.AbstractConnector; geometryconnector?: geotoolkit.map.sources.connectors.AbstractConnector; } );
                    /**
                     * Sends an image request based on a settings provided
                     * @param query  (Required) query params
                     * @param query.left  (Required) requesting left limit in model coordinates
                     * @param query.right  (Required) requesting right limit in model coordinates
                     * @param query.top  (Required) requesting top limit in model coordinates
                     * @param query.bottom  (Required) requesting bottom limit in model coordinates
                     * @param query.width  (Required) requesting image width in device coordinates
                     * @param query.height  (Required) requesting image height in device coordinates
                     */
                    query(query: any | { left?: number; right?: number; top?: number; bottom?: number; width?: number; height?: number; } ): this;
                    /**
                     * Sends a data information request based on a geometry provided
                     * @param query  (Required) query params
                     * @param query.geometry  (Required) geometry to query
                     * @param query.layer  (Optional) quering layer id
                     * @param query.key  (Optional) connection key (can be used to abort it later)
                     */
                    queryGeometry(query: any | { geometry?: any; layer?: number; key?: string; } ): this;
                    /**
                     * Aborts geometry queries previously sent
                     * @param key  (Optional) key of the queries to abort (all geometry queries aborted if nothing provided)
                     */
                    abortGeometryQueries(key?: string): this;
                    /**
                     * Identifies the information in the area provided
                     * @param query  (Required) query params
                     * @param query.left  (Required) map extent left limit in model coordinates
                     * @param query.right  (Required) map extent right limit in model coordinates
                     * @param query.top  (Required) map extent top limit in model coordinates
                     * @param query.bottom  (Required) map extent bottom limit in model coordinates
                     * @param query.width  (Required) image display width in device coordinates
                     * @param query.height  (Required) image display height in device coordinates
                     * @param query.geometry  (Required) area geometry to identify
                     * @param query.layers  (Optional) layers to identify in ArcGIS format (e.g. 'visible:1,2,5')
                     * @param query.key  (Optional) connection key (can be used to abort it later)
                     */
                    identify(query: any | { left?: number; right?: number; top?: number; bottom?: number; width?: number; height?: number; geometry?: geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Polygon; layers?: string; key?: string; } ): this;
                }
                /**
                 * ArcGIS source format that formats feature queries to the FeatureService server
                 */
                class ArcGISFeature extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * ArcGIS source format that formats feature queries to the FeatureService server
                     * @param options  (Optional) options
                     * @param options.connector  (Optional) connector to use
                     */
                    constructor(options?: any | { connector?: geotoolkit.map.sources.connectors.AbstractConnector; } );
                    /**
                     * Sends a feature request based on a settings provided
                     * @param query  (Required) query params
                     * @param query.left  (Required) requesting left limit in model coordinates
                     * @param query.right  (Required) requesting right limit in model coordinates
                     * @param query.top  (Required) requesting top limit in model coordinates
                     * @param query.bottom  (Required) requesting bottom limit in model coordinates
                     */
                    query(query: any | { left?: number; right?: number; top?: number; bottom?: number; } ): this;
                }
                /**
                 * GeoJSON source format that formats feature queries and parses the GeoJSON formatted response
                 */
                class GeoJSON extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * GeoJSON source format that formats feature queries and parses the GeoJSON formatted response
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Parses GeoJSON data into the geotoolkit features and notifies about the result
                     * @param data  (Required) JSON object or its string representation that contains features data in GeoJSON format
                     */
                    parse(data: string|any): this;
                }
                /**
                 * WMS source format that formats map image queries to the WMS (Web Map Service) server
                 */
                class WMS extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * WMS source format that formats map image queries to the WMS (Web Map Service) server
                     * @param options  (Optional) options
                     * @param connector  (Optional) connector to use
                     */
                    constructor(options?: any, connector?: geotoolkit.map.sources.connectors.AbstractConnector);
                    /**
                     * Sends an image request based on a settings provided
                     * @param query  (Required) query params
                     * @param query.left  (Required) requesting left limit in model coordinates
                     * @param query.right  (Required) requesting right limit in model coordinates
                     * @param query.top  (Required) requesting top limit in model coordinates
                     * @param query.bottom  (Required) requesting bottom limit in model coordinates
                     * @param query.width  (Required) requesting image width in device coordinates
                     * @param query.height  (Required) requesting image height in device coordinates
                     * @param query.key  (Optional) connection key (can be used to abort it later)
                     */
                    query(query: any | { left?: number; right?: number; top?: number; bottom?: number; width?: number; height?: number; key?: string; } ): this;
                }
                /**
                 * KML source format that formats feature queries and parses the KML formatted response
                 */
                class KML extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * KML source format that formats feature queries and parses the KML formatted response
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Parses KML data into the geotoolkit features and notifies about the result
                     * @param data  (Required) XML object or its string representation that contains features data in KML format
                     */
                    parse(data: string|any): this;
                }
                /**
                 * WFS source format that formats feature queries to the WFS (Web Feature Service) server
                 */
                class WFS extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * WFS source format that formats feature queries to the WFS (Web Feature Service) server
                     * @param options  (Optional) options
                     * @param options.format  (Optional) format to request from server
                     * @param options.parser  (Optional) parser format to parse the server response
                     */
                    constructor(options?: any | { format?: string; parser?: string; } );
                    /**
                     * Sends a feature request based on a settings provided
                     * @param query  (Required) query params
                     * @param query.left  (Required) requesting left limit in model coordinates
                     * @param query.right  (Required) requesting right limit in model coordinates
                     * @param query.top  (Required) requesting top limit in model coordinates
                     * @param query.bottom  (Required) requesting bottom limit in model coordinates
                     * @param query.key  (Optional) connection key (can be used to abort it later)
                     */
                    query(query: any | { left?: number; right?: number; top?: number; bottom?: number; key?: string; } ): this;
                }
                /**
                 * Tile source format that formats tile queries based on formatter function provided
                 */
                class Tile extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * Tile source format that formats tile queries based on formatter function provided
                     * @param options  (Optional) options
                     * @param options.formatterfunction  (Optional) formatter function that formats a tile request based on its z, y, x indices
                     * @param options.connector  (Optional) connector to use
                     */
                    constructor(options?: any | { formatterfunction?: Function; connector?: geotoolkit.map.sources.connectors.AbstractConnector; } );
                    /**
                     * Sends a tile request based on a settings provided
                     * @param query  (Required) query params
                     * @param query.x  (Required) tile x-ordinate
                     * @param query.y  (Required) tile y-ordinate
                     * @param query.z  (Required) tile zoom level
                     * @param query.dst  (Optional) destination image
                     * @param query.key  (Optional) connection key (can be used to abort it later)
                     * @param query.priority  (Optional) query priority
                     */
                    query(query: any | { x?: number; y?: number; z?: number; dst?: geotoolkit.scene.shapes.Image; key?: string; priority?: number; } ): this;
                }
                /**
                 * CSV source format that formats feature queries and parses the CSV formatted response
                 */
                class CSV extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * CSV source format that formats feature queries and parses the CSV formatted response
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Sets CSV data string delimiter (',' by default)
                     * @param delimiter  (Required) CSV delimiter to use for CSV parse
                     */
                    static setDelimiter(delimiter: string): any;
                    /**
                     * Parses CSV data into the geotoolkit features and notifies about the result
                     * @param data  (Required) table object or its string representation that contains features data in CSV format
                     */
                    parse(data: string|string[]): this;
                }
                /**
                 * GeoRSS source format that formats feature queries and parses the GeoRSS formatted response
                 */
                class GeoRSS extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * GeoRSS source format that formats feature queries and parses the GeoRSS formatted response
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                    /**
                     * Parses GeoRSS data into the geotoolkit features and notifies about the result
                     * @param data  (Required) XML object or its string representation that contains features data in GeoRSS format
                     */
                    parse(data: string|any): this;
                }
                /**
                 * Stream source format that formats feature queries and parses the ArcGIS Stream formatted response
                 */
                class Stream extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * Stream source format that formats feature queries and parses the ArcGIS Stream formatted response
                     * @param options  (Optional) options
                     * @param options.connector  (Optional) connector to use
                     */
                    constructor(options?: any | { connector?: geotoolkit.map.sources.connectors.AbstractConnector; } );
                    /**
                     * Parses Stream data into the geotoolkit features and notifies about the result
                     * @param data  (Required) JSON object or its string representation that contains features data
                     */
                    parse(data: string|any): this;
                }
                /**
                 * VectorTile source format that formats tile queries to Mapbox server and parses Pbf (Protocolbuffer Binary Format) formatted response
                 */
                class VectorTile extends geotoolkit.map.sources.formats.Tile {
                    /**
                     * VectorTile source format that formats tile queries to Mapbox server and parses Pbf (Protocolbuffer Binary Format) formatted response
                     * @param options  (Optional) options
                     * @param options.connector  (Optional) connector to use
                     */
                    constructor(options?: any | { connector?: geotoolkit.map.sources.connectors.AbstractConnector; } );
                    /**
                     * Sends a tile request based on a settings provided
                     * @param query  (Required) query params
                     * @param query.x  (Required) tile x-ordinate
                     * @param query.y  (Required) tile y-ordinate
                     * @param query.z  (Required) tile zoom level
                     * @param query.dst  (Required) destination object
                     * @param query.key  (Optional) connection key (can be used to abort it later)
                     */
                    query(query: any | { x?: number; y?: number; z?: number; dst?: any; key?: string; } ): this;
                }
                /**
                 * ArcGIS source format that parses Lerc (Limited Error Raster Compression) formatted responses. Can be used both as a features format
                 * or parse LERC images (see tutorial for details)
                 */
                class Lerc extends geotoolkit.map.sources.formats.AbstractFormat {
                    /**
                     * ArcGIS source format that parses Lerc (Limited Error Raster Compression) formatted responses. Can be used both as a features format
                     * or parse LERC images (see tutorial for details)
                     * @param options  (Optional) options
                     * @param options.colorprovider  (Optional) color provider to use for one-dimensional
                     * @param options.symbolTileSize  (Optional) the tile size for each symbol/feature (in px). Set to use format for the vectors
                     * @param options.connector  (Optional) connector to use
                     */
                    constructor(options?: any | { colorprovider?: geotoolkit.util.ColorProvider; symbolTileSize?: number; connector?: geotoolkit.map.sources.connectors.AbstractConnector; } );
                    /**
                     * Sends an image request based on a settings provided
                     * @param query  (Required) query params
                     * @param query.left  (Required) requesting left limit in model coordinates
                     * @param query.right  (Required) requesting right limit in model coordinates
                     * @param query.top  (Required) requesting top limit in model coordinates
                     * @param query.bottom  (Required) requesting bottom limit in model coordinates
                     * @param query.width  (Required) requesting image width in device coordinates
                     * @param query.height  (Required) requesting image height in device coordinates
                     * @param query.key  (Optional) connection key (can be used to abort it later)
                     */
                    query(query: any | { left?: number; right?: number; top?: number; bottom?: number; width?: number; height?: number; key?: string; } ): this;
                }
            }
            module Bing {
                /**
                 * The type of Bing imagery supported
                 */
                interface ImagerySet {
                    /**
                     * Aerial imagery
                     */
                    Aerial: string;
                    /**
                     * Aerial imagery with a road overlay
                     */
                    AerialWithLabels: string;
                    /**
                     * Aerial imagery with on-demand road overlay
                     */
                    AerialWithLabelsOnDemand: string;
                    /**
                     * Bird's eye (oblique-angle) imagery
                     */
                    Birdseye: string;
                    /**
                     * Bird's eye imagery with a road overlay
                     */
                    BirdseyeWithLabels: string;
                    /**
                     * The second generation Bird's eye (oblique-angle) imagery
                     */
                    BirdseyeV2: string;
                    /**
                     * A dark version of the road maps
                     */
                    CanvasDark: string;
                    /**
                     * A lighter version of the road maps which also has some of the details such as hill shading disabled
                     */
                    CanvasLight: string;
                    /**
                     * A grayscale version of the road maps
                     */
                    CanvasGray: string;
                    /**
                     * Roads without additional imagery. Uses the legacy static tile service
                     */
                    Road: string;
                    /**
                     * Roads without additional imagery. Uses the dynamic tile service
                     */
                    RoadOnDemand: string;
                    /**
                     * Ordnance Survey imagery. This imagery is visible only for the London area
                     */
                    OrdnanceSurvey: string;
                }
            }
        }
        module layers {
            /**
             * Defines a Map Layer, an Abstract class that will be used by the Map.
             * Map layer represents the geographic layer which can be a tile layer, map layer or any custom layer. <br>
             * addLayer(), insertLayer() and removeLayer() is used to add and remove layers.
             */
            class AbstractLayer extends geotoolkit.scene.Node {
                /**
                 * Defines a Map Layer, an Abstract class that will be used by the Map.
                 * Map layer represents the geographic layer which can be a tile layer, map layer or any custom layer. <br>
                 * addLayer(), insertLayer() and removeLayer() is used to add and remove layers.
                 * @param options  (Optional) options (see "setOptions" method for details)
                 * @param options.source  (Optional) the layer data source
                 * @param options.system  (Optional) coordinate system this layer's data is in
                 * @param options.layerfilter  (Optional) layer filter
                 */
                constructor(options?: any | { source?: geotoolkit.map.sources.AbstractSource; system?: geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem; layerfilter?: geotoolkit.renderer.IFilter; } );
                /**
                 */
                getWorldTransform(): geotoolkit.util.Transformation;
                /**
                 * Return visible model limits
                 * @param ignoreModelLimits  (Optional) flag defines whether to ignore ModelLimits or not
                 */
                getVisibleModelLimits(ignoreModelLimits?: boolean): geotoolkit.util.Rect;
                /**
                 * Gets user defined model limits if set; calculated model limits otherwise
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Sets model limits
                 * @param limits  (Optional) new model limits
                 */
                setModelLimits(limits?: geotoolkit.util.Rect): this;
                /**
                 * Gets calculated model limits
                 */
                getDefaultModelLimits(): geotoolkit.util.Rect;
                /**
                 * Returns default model limits (based on the map coordinate system)
                 */
                protected calculateDefaultModelLimits(): geotoolkit.util.Rect;
                /**
                 * Return a the alpha of the layer
                 * between 0.0 (fully transparent) and 1.0 (fully opaque). The default value is 1.0.
                 */
                getLayerAlpha(): number;
                /**
                 * Set the alpha of the layer
                 * @param alpha  (Required) between 0.0 (fully transparent) and 1.0 (fully opaque). The default value is 1.0.
                 */
                setLayerAlpha(alpha: number): this;
                /**
                 * Gets options
                 */
                getOptions(): any;
                /**
                 * Sets options (default options listed are for construction time only)
                 * @param options  (Optional) options
                 * @param options.limits  (Optional) limits of this layer
                 * @param options.layerfilter  (Optional) layer drawing filter (default "layerfilter=null" means layer _is_ drawn)
                 * @param options.alpha  (Optional) the alpha of the layer
                 */
                setOptions(options?: any | { limits?: number; layerfilter?: geotoolkit.renderer.IFilter; alpha?: number; } ): this;
                /**
                 * Return coordinate system for this layer
                 */
                getCoordinateSystem(): geotoolkit.map.coordinatesystems.AbstractSystem;
                /**
                 * Set vertical flip of the representation
                 * @param flip  (Required) flag to set the vertical flip of the representation
                 */
                setVerticalFlip(flip: boolean): this;
                /**
                 * Return true if the representation is flipped vertically
                 */
                isVerticalFlip(): boolean;
                /**
                 * Renders layer
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Renders layer content
                 * @param context  (Required) rendering context
                 */
                renderContent(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Sets cache to be used to cache
                 * @param cache  (Required) cache to be used
                 */
                setCache(cache: geotoolkit.scene.Cache): this;
                /**
                 * Invalidate layer
                 * @param bounds  (Optional) bounds of the invalid rectangle in the inner node coordinates
                 * @param force  (Optional) true if parent should be invalidated immediately
if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
                 */
                invalidate(bounds?: geotoolkit.util.Rect|any, force?: boolean): this;
                /**
                 * Return cache strategy to be used to cache children nodes
                 */
                getCache(): geotoolkit.scene.Cache;
                /**
                 * Clear cache
                 */
                clearCache(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {properties:{url:string|any}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * see {@link geotoolkit.map.layers.AbstractLayer#getProperties}
                 * @param properties  (Optional) JSON containing the properties to set
                 */
                setProperties(properties?: any): this;
                /**
                 * Return a map coordinate system
                 */
                getMapCoordinateSystem(): geotoolkit.map.coordinatesystems.AbstractSystem;
                /**
                 * Sets a map coordinate system
                 * @param system  (Optional) new map coordinate system
                 */
                setMapCoordinateSystem(system?: geotoolkit.map.coordinatesystems.AbstractSystem|geotoolkit.map.GeodeticSystem|number): this;
                /**
                 * Transform point
                 * @param point  (Optional) point to transform
                 * @param from  (Optional) system converting from
                 * @param to  (Optional) system converting to
                 * @param dst  (Optional) optional destination point
                 */
                transformPoint(point?: geotoolkit.util.Point, from?: geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem, to?: geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem, dst?: geotoolkit.util.Point): geotoolkit.util.Point|any;
                /**
                 * Transform a point from layer coordinate system to map coordinate system
                 * @param point  (Optional) point to transform
                 * @param dst  (Optional) optional destination point
                 */
                transformToMap(point?: geotoolkit.util.Point, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
                /**
                 * Transform a point from map coordinate system to layer coordinate system
                 * @param point  (Optional) point to transform
                 * @param dst  (Optional) optional destination point
                 */
                transformFromMap(point?: geotoolkit.util.Point, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
                /**
                 * Sets the url to the layer source
                 * @param url  (Required) server url
                 */
                setServerURL(url: string): this;
                /**
                 * Gets the server url from the layer source
                 */
                getServerURL(): string;
                /**
                 * Disposes this layer, once disposed it should not be used anymore.<br>
                 */
                dispose(): any;
                /**
                 * Returns current data source
                 */
                getDataSource(): geotoolkit.map.sources.AbstractSource;
                /**
                 * Performs selection of the data with its device coordinates. Returns null, if no data available but will be loaded
                 * asynchronously later (fires geotoolkit.map.sources.Events.InfoUpdated).
                 * @param pt  (Required) is the device coordinates to select
                 * @param radius  (Optional) the radius of selection (in px)
                 */
                hitTest(pt: geotoolkit.util.Point, radius?: number): any|any[];
                /**
                 * Returns the format function to use for the tooltip info (null if tooltips are not visible)
                 */
                getTooltipFormatter(): any|Function;
            }
            /**
             * This layer is a collection of features (see {@link geotoolkit.map.features.IFeature}).<br>
             * addFeature() and removeFeature() are used to add and remove features; getFeatures() to iterate.
             */
            class AbstractFeatureLayer extends geotoolkit.map.layers.AbstractLayer {
                /**
                 * This layer is a collection of features (see {@link geotoolkit.map.features.IFeature}).<br>
                 * addFeature() and removeFeature() are used to add and remove features; getFeatures() to iterate.
                 * @param options  (Optional) options (see "setOptions" method for more details)
                 * @param options.features  (Optional) features options
                 * @param options.features.filter  (Optional) features filter(s)
                 * @param options.annotations  (Optional) annotations options
                 * @param options.annotations.filter  (Optional) annotations filter(s)
                 * @param options.annotations.visible  (Optional) annotations visibility flag
                 * @param options.annotations.strategy  (Optional) annotation strategy
                 * @param options.annotations.text  (Optional) JSON-object or text shape instance (see {@link geotoolkit.scene.shapes.Text} constructor JSON-object for details)
                 * @param options.annotations.text.preservereadingorientation  (Optional) preservereadingorientation flag
(if options.annotations.text is JSON-object then and only then its <b>preservereadingorientation=true</b> default value is acknowledged)
                 * @param options.annotations.text.ispointingup  (Optional) ispointingup flag
(if options.annotations.text is JSON-object then and only then its <b>ispointingup=true</b> default value is acknowledged)
                 * @param options.tooltip  (Optional) tooltip options
                 * @param options.tooltip.visible  (Optional) tooltip visibility flag
                 * @param options.tooltip.formatter  (Optional) tooltip data formatter
                 * @param options.converters  (Optional) converter that is used for vector data conversions
                 */
                constructor(options?: any | { features?: any | { filter?: geotoolkit.map.features.filters.IFilter|any[]; } ; annotations?: any | { filter?: geotoolkit.map.features.filters.IFilter|any[]; visible?: boolean; strategy?: geotoolkit.map.features.strategies.IGetAnnotation; text?: any | { preservereadingorientation?: boolean; ispointingup?: boolean; } |geotoolkit.scene.shapes.Text; } ; tooltip?: any | { visible?: boolean; formatter?: Function|any; } ; converters?: geotoolkit.map.features.converters.BaseConverter; } );
                /**
                 * Feature layer events.
                 */
                static Events: any;
                /**
                 * Gets features iterator
                 * @param filter  (Optional) features query filter.
                 */
                getFeatures(filter?: geotoolkit.map.util.Query|Function): geotoolkit.util.Iterator;
                /**
                 * Gets feature_geometry-to-text_anchor_position adapter
                 * @param feature  (Optional) feature  to get adapter for
                 */
                getGeometryToText(feature?: geotoolkit.map.features.IFeature): geotoolkit.map.features.adapters.IGeometryToText;
                /**
                 * Gets feature by feature id.
                 * @param id  (Required) feature identifier
                 */
                getFeatureById(id: number|string): geotoolkit.map.features.IFeature;
                /**
                 * queries layer for items that match the search
                 * @param query  (Required) query
                 */
                queryFeatures(query: geotoolkit.map.util.Query|Function): geotoolkit.map.features.IFeature[];
                /**
                 * Renders features. The basic implementations iterates over the features provided and
                 * renders them if derived from {@link geotoolkit.scene.Node}.
                 * @param featuresIt  (Required) features iterator
                 * @param context  (Required) rendering context
                 */
                renderFeatures(featuresIt: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Renders annotations (to filtered features only)
                 * @param featuresIt  (Required) features iterator
                 * @param context  (Required) rendering context
                 */
                renderAnnotations(featuresIt: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Renders content. The implementation:
                 * 1. Applies features filter(s) if set;
                 * 2. Execute "renderFeatures";
                 * If annotations visible then:
                 * 3. Applies annotations filter(s) if set;
                 * 4. Execute "renderAnnotations"
                 * @param context  (Required) to render layer
                 */
                renderContent(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Sets a map coordinate system
                 * @param system  (Required) coordinate system
                 */
                setMapCoordinateSystem(system: geotoolkit.map.coordinatesystems.AbstractSystem|geotoolkit.map.GeodeticSystem): this;
                /**
                 * Returns the tooltip formatter or format function to use (null if tooltips are not visible)
                 */
                getTooltipFormatter(): any|Function;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {properties:{annotations:boolean;tooltip:boolean}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * see {@link geotoolkit.map.layers.AbstractFeatureLayer#getProperties}
                 * @param properties  (Optional) JSON containing the properties to set
                 */
                setProperties(properties?: any): this;
                /**
                 * Sets options
                 * @param options  (Optional) options
                 * @param options.features  (Optional) features options
                 * @param options.features.filter  (Optional) features filter(s)
                 * @param options.annotations  (Optional) annotations options
                 * @param options.annotations.filter  (Optional) annotations filter(s)
                 * @param options.annotations.text  (Optional) JSON-object or text shape instance (see {@link geotoolkit.scene.shapes.Text} for details)
                 * @param options.annotations.strategy  (Optional) annotation strategy
                 */
                setOptions(options?: any | { features?: any | { filter?: geotoolkit.map.features.filters.IFilter|any[]; } ; annotations?: any | { filter?: geotoolkit.map.features.filters.IFilter|any[]; text?: any|geotoolkit.scene.shapes.Text; strategy?: geotoolkit.map.features.strategies.IGetAnnotation; } ; } ): this;
                /**
                 * Converts layer features into GeoJSON format
                 */
                toGeoJSON(): any;
                /**
                 * Disposes this layer, once disposed it should not be used anymore.<br>
                 */
                dispose(): any;
            }
            /**
             * The layer uses {@link geotoolkit.map.features.templates.BaseTemplate} instance(s)
             * to render its {@link geotoolkit.map.features.IFeature} elements.
             */
            class Template extends geotoolkit.map.layers.AbstractFeatureLayer {
                /**
                 * The layer uses {@link geotoolkit.map.features.templates.BaseTemplate} instance(s)
                 * to render its {@link geotoolkit.map.features.IFeature} elements.
                 * @param options  (Required) options (see {@link geotoolkit.map.layers.AbstractFeatureLayer#setOptions setOptions} method for parent class options)
                 * @param options.templates  (Required) shape template(s) to visualize features (see example below)
                 * @param options.annotations  (Optional) annotations options
                 * @param options.annotations.visibleonzoom  (Optional) annotations visibility on zoom
                 */
                constructor(options: any | { templates?: any|any[]; annotations?: any | { visibleonzoom?: boolean; } ; } );
                /**
                 * If no features provided then resets all shape templates to their initial states;<br>
                 * otherwise resets specific templates for the features provided
                 * @param features  (Optional) features to reset their specific template(s) to a default one
                 * @param suppressInvalidate  (Optional) suppress layer invalidation flag
                 */
                resetFeatureTemplates(features?: geotoolkit.map.features.IFeature|geotoolkit.map.features.IFeature[]|geotoolkit.util.Iterator, suppressInvalidate?: boolean): this;
                /**
                 * Gets template associated with a feature or its class name
                 * @param parameter  (Required) reference to a feature instance OR feature class name
                 */
                getTemplate(parameter: geotoolkit.map.features.IFeature|string): any;
                /**
                 * Sets template associated with a feature or features
                 * @param parameter  (Required) feature class name OR reference to a feature instance OR feature iterator
                 * @param template  (Required) feature(s) template or feature class template
                 * @param template.shape  (Optional) carnac shape to visualize a feature instance
                 * @param template.geometrytoshape  (Optional) feature geometry to carnac shape state converter
                 * @param template.geometrytotext  (Optional) feature geometry to text shape state converter
                 * @param suppressInvalidate  (Optional) suppress layer invalidatation flag
                 */
                setTemplate(parameter: string|geotoolkit.map.features.IFeature|geotoolkit.util.Iterator|geotoolkit.map.features.IFeature[], template: any | { shape?: geotoolkit.scene.Node; geometrytoshape?: Function; geometrytotext?: Function; } , suppressInvalidate?: boolean): this;
                /**
                 * The implementation builds default limits from scratch if no iterator is provided;
                 * otherwise, it extends previously calculated limits with limits calculated over new features.
                 * @param features  (Optional) iterator or array of the new features
                 */
                protected calculateDefaultModelLimits(features?: geotoolkit.util.Iterator|any[]): any;
                /**
                 * updates the geometry for the feature in this layer
                 * @param feature  (Required) feature to be modified
                 * @param geometry  (Required) the geometry to be set on the feature
                 */
                updateGeometry(feature: geotoolkit.map.features.IFeature, geometry: any): this;
                /**
                 * Adds feature(s)
                 * @param parameter  (Required) feature(s) to be added
                 */
                addFeature(parameter: geotoolkit.map.features.IFeature|geotoolkit.map.features.IFeature[]|geotoolkit.util.Iterator): this;
                /**
                 * Removes feature(s)
                 * @param parameter  (Required) feature(s) to be removed
                 */
                removeFeature(parameter: geotoolkit.map.features.IFeature|geotoolkit.map.features.IFeature[]|geotoolkit.util.Iterator): this;
                /**
                 * Removes all feature(s)
                 */
                clearFeatures(): this;
                /**
                 * Renders features.<br>
                 * NOTE:<br>
                 * When picking is performed, then feature is selected if its shape gets picked.
                 * @param featuresIt  (Required) iterator over filtered features
                 * @param context  (Required) rendering context
                 */
                renderFeatures(featuresIt: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets feature_geometry-to-text_anchor_position adapter
                 * @param feature  (Required) feature to get adapter for
                 */
                getGeometryToText(feature: geotoolkit.map.features.IFeature): geotoolkit.map.features.adapters.IGeometryToText;
                /**
                 * Renders annotations (to filtered features only)
                 * @param featuresIt  (Required) features iterator
                 * @param context  (Required) rendering context
                 */
                renderAnnotations(featuresIt: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Performs selection of the features with its device coordinates
                 * @param pt  (Required) is the device coordinates received by mouse event
                 * @param radius  (Optional) the radius of selection (in px)
                 */
                hitTest(pt: geotoolkit.util.Point, radius?: number): geotoolkit.map.features.AbstractFeature[];
                /**
                 * Sets a map coordinate system
                 * @param system  (Required) coordinate system
                 */
                setMapCoordinateSystem(system: geotoolkit.map.coordinatesystems.AbstractSystem|geotoolkit.map.GeodeticSystem): this;
            }
            /**
             * The Image layer is an image received from a server and drawn on the canvas. Varieties (inheritors) of this case are WMS and ArcGISImage layers.
             * This layer connects to the server and displays a single image layer from that server.
             */
            class Image extends geotoolkit.map.layers.AbstractLayer {
                /**
                 * The Image layer is an image received from a server and drawn on the canvas. Varieties (inheritors) of this case are WMS and ArcGISImage layers.
                 * This layer connects to the server and displays a single image layer from that server.
                 * @param options  (Optional) options
                 */
                constructor(options?: any);
                /**
                 * Renders layer
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Renders layer content
                 * @param context  (Required) rendering context
                 */
                renderContent(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets the JSON data of the available layers for the server
                 */
                getLayers(): any|any;
                /**
                 * Returns the server layer names that are requested.
                 */
                getVisibleLayers(): string[]|any;
                /**
                 * Adds the passed in ID's to the list of layers to show
                 * @param id  (Required) id(s) for the layer(s) to show
                 */
                showLayers(id: number|number[]): this;
                /**
                 * Adds the passed in ID's to the list of layers to hide
                 * @param id  (Optional) ID(s) for the layers to show
                 */
                hideLayers(id?: number|number[]): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {properties:{showlayers:string[]|any}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * see {@link geotoolkit.map.layers.Image#getProperties}
                 * @param properties  (Optional) JSON containing the properties to set
                 */
                setProperties(properties?: any): this;
            }
            /**
             * Vector layer differs from the others in that it does not draw pictures, but vector data (called "features"): points, polylines and polygons. <br>
             * These features can be either used as additional information for drawing on top of another layer — for example, set of points-capitals from the maplayers.html tutorial — or cover the entire space and not requiring any background.<br>
             * Most of the layers —  ArcGISFeature, CSV, GeoJSON, GeoRSS, KML, WFS, etc. — are vector and allows to automatically parse vector data and drawing styles from different formats.
             * The implementation is capable of loading features data from files (objects) in different formats.<br>
             * It has following predefined shape templates:<br>
             * 'templates': [ <br>
             *     { 'featureclassname': geotoolkit.map.features.Polygon.getClassName(), 'template': new geotoolkit.map.features.templates.Polygon() },<br>
             *     { 'featureclassname': geotoolkit.map.features.MultiPolygon.getClassName(), 'template': new geotoolkit.map.features.templates.Polygon() },<br>
             *     { 'featureclassname': geotoolkit.map.features.LineString.getClassName(), 'template': new geotoolkit.map.features.templates.LineString() },<br>
             *     { 'featureclassname': geotoolkit.map.features.MultiLineString.getClassName(), 'template': new geotoolkit.map.features.templates.LineString() },<br>
             *     { 'featureclassname': geotoolkit.map.features.Point.getClassName(), 'template': new geotoolkit.map.features.templates.Point() },<br>
             *     { 'featureclassname': geotoolkit.map.features.MultiPoint.getClassName(), 'template': new geotoolkit.map.features.templates.Point() }<br>
             * ]
             */
            class Vector extends geotoolkit.map.layers.Template {
                /**
                 * Vector layer differs from the others in that it does not draw pictures, but vector data (called "features"): points, polylines and polygons. <br>
                 * These features can be either used as additional information for drawing on top of another layer — for example, set of points-capitals from the maplayers.html tutorial — or cover the entire space and not requiring any background.<br>
                 * Most of the layers —  ArcGISFeature, CSV, GeoJSON, GeoRSS, KML, WFS, etc. — are vector and allows to automatically parse vector data and drawing styles from different formats.
                 * The implementation is capable of loading features data from files (objects) in different formats.<br>
                 * It has following predefined shape templates:<br>
                 * 'templates': [ <br>
                 *     { 'featureclassname': geotoolkit.map.features.Polygon.getClassName(), 'template': new geotoolkit.map.features.templates.Polygon() },<br>
                 *     { 'featureclassname': geotoolkit.map.features.MultiPolygon.getClassName(), 'template': new geotoolkit.map.features.templates.Polygon() },<br>
                 *     { 'featureclassname': geotoolkit.map.features.LineString.getClassName(), 'template': new geotoolkit.map.features.templates.LineString() },<br>
                 *     { 'featureclassname': geotoolkit.map.features.MultiLineString.getClassName(), 'template': new geotoolkit.map.features.templates.LineString() },<br>
                 *     { 'featureclassname': geotoolkit.map.features.Point.getClassName(), 'template': new geotoolkit.map.features.templates.Point() },<br>
                 *     { 'featureclassname': geotoolkit.map.features.MultiPoint.getClassName(), 'template': new geotoolkit.map.features.templates.Point() }<br>
                 * ]
                 * @param options  (Optional) options
                 * @param options.idfield  (Optional) field that contains the id for this shape
                 * @param options.data  (Optional) data object (or its string representation) containing the features data @deprecated since 2.6
                 */
                constructor(options?: any | { idfield?: string; data?: any|string; } );
                /**
                 * Parses features from the data object and adds it to the layer
                 * @param data  (Required) data object (or its string representation) containing the features data in a specific format
                 */
                loadData(data: string|any): this;
                /**
                 * Sets the unique identifier for the features
                 * @param field  (Required) unique identifier
                 */
                setUniqueField(field: string): this;
                /**
                 * Gets the unique identifier for the dataset
                 */
                getUniqueField(): string;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{idfield:string}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * see {@link geotoolkit.map.layers.Vector#getProperties}
                 * @param properties  (Optional) JSON containing the properties to set
                 */
                setProperties(properties?: any): this;
            }
            /**
             * Tile layer connects to the server and displays a layer created from the server tiles.
             * It consists of a several images (tiles) painted next to each other and thus forming a complete picture. The example of this approach is the Bing layer.
             */
            class Tile extends geotoolkit.map.layers.AbstractLayer {
                /**
                 * Tile layer connects to the server and displays a layer created from the server tiles.
                 * It consists of a several images (tiles) painted next to each other and thus forming a complete picture. The example of this approach is the Bing layer.
                 * @param options  (Optional) options
                 * @param options.source  (Optional) tile source
                 * @param options.formatterfunction  (Optional) the function that takes z, y, x and turns that into tile location
                 * @param options.tilewidth  (Optional) width for the tiles to use (in px)
                 * @param options.tileheight  (Optional) height for the tiles to use (in px)
                 * @param options.imagepool  (Optional) the amount of cache for the tile images
                 * @param options.minlod  (Optional) the minimum level of details for the tiles
                 * @param options.maxlod  (Optional) the maximum level of details for the tiles
                 */
                constructor(options?: any | { source?: geotoolkit.map.sources.Tile; formatterfunction?: Function; tilewidth?: number; tileheight?: number; imagepool?: number; minlod?: number; maxlod?: number; } );
                /**
                 * Renders layer
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Renders layer content
                 * @param context  (Required) rendering context
                 */
                renderContent(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets the minimum Lod for the server
                 */
                getMinLod(): number;
                /**
                 * Gets the maximum Lod for the server
                 */
                getMaxLod(): number;
                /**
                 * Returns current tile resolution (in px)
                 */
                getTileResolution(): geotoolkit.util.Dimension;
                /**
                 * Sets image format for the server
                 * This converts the z, x, y image indexes into a path that is added to the server param to locate
                 * the requested tile.
                 * @param formatter  (Required) image formatter
                 */
                setImageFormatter(formatter: Function): this;
                /**
                 * Gets the current formatter function if the function format is used
                 */
                getImageFormatter(): Function;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{tilewidth:number;tileheight:number;minlod:number;maxlod:number;formatterfunction:Function}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * see {@link geotoolkit.map.layers.Tile#getProperties}
                 * @param properties  (Optional) JSON containing the properties to set
                 */
                setProperties(properties?: any): this;
                /**
                 * Sets the min/max numbers of details for the server
                 * @param min  (Required) minimum Lod
                 * @param max  (Required) maximum Lod
                 */
                setLods(min: number, max: number): this;
                /**
                 * Gets map zoom level
                 */
                getZoomLevel(): number;
                /**
                 * Sets the resolution of the tiles from the server
                 * @param width  (Required) tile width (in px)
                 * @param height  (Required) tile height (in px)
                 */
                setTileResolution(width: number, height: number): this;
            }
            /**
             * The Shape layer is a collection of geotoolkit shapes (polylines, polygons, symbols, etc.)<br>
             * In essence, it copies the functionality of the Vector layer, but instead of features it displays shapes — features combined with its drawing style. <br>
             * This approach increases consumed memory, but it is comparatively easier to use. Also, not all objects can be represented by a point, polyline or polygon (for example, a bezier curve), which makes this layer more universal for some special cases.
             */
            class Shape extends geotoolkit.map.layers.AbstractLayer {
                /**
                 * The Shape layer is a collection of geotoolkit shapes (polylines, polygons, symbols, etc.)<br>
                 * In essence, it copies the functionality of the Vector layer, but instead of features it displays shapes — features combined with its drawing style. <br>
                 * This approach increases consumed memory, but it is comparatively easier to use. Also, not all objects can be represented by a point, polyline or polygon (for example, a bezier curve), which makes this layer more universal for some special cases.
                 * @param options  (Optional) options (see {@link geotoolkit.map.layers.AbstractLayer} for details)
                 * @param options.tooltip  (Optional) tooltip options
                 * @param options.tooltip.visible  (Optional) tooltip visibility flag
                 * @param options.tooltip.formatter  (Optional) tooltip data formatter
                 */
                constructor(options?: any | { tooltip?: any | { visible?: boolean; formatter?: Function; } ; } );
                /**
                 */
                protected calculateDefaultModelLimits(): geotoolkit.util.Rect;
                /**
                 * Gets shapes iterator
                 * @param filter  (Optional) a filter function.
                 */
                getShapes(filter?: Function): geotoolkit.util.Iterator;
                /**
                 * Adds shape(s)
                 * @param parameter  (Required) shape(s) to be added
                 */
                addShape(parameter: geotoolkit.scene.Node|geotoolkit.scene.Node[]|geotoolkit.util.Iterator): this;
                /**
                 * Removes shape(s) (and dispose them if needed)
                 * @param parameter  (Required) shape(s) to be removed
                 * @param dispose  (Optional) dispose shape(s)
                 */
                removeShape(parameter: geotoolkit.scene.Node|geotoolkit.scene.Node[]|geotoolkit.util.Iterator, dispose?: boolean): this;
                /**
                 * Removes all shapes (and dispose them if needed)
                 * @param dispose  (Optional) automatically dispose shape(s)
                 */
                clearShapes(dispose?: boolean): this;
                /**
                 * Renders content
                 * @param context  (Required) rendering context
                 */
                renderContent(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Returns the format function to use (null if tooltips are not visible)
                 */
                getTooltipFormatter(): any|Function;
                /**
                 * Performs selection of the shapes with its device coordinates
                 * @param pt  (Required) is the device coordinates received by mouse event
                 * @param radius  (Optional) is the radius of selection
                 */
                hitTest(pt: geotoolkit.util.Point, radius?: number): geotoolkit.scene.Node[];
            }
            /**
             * This shape connects to a server to display a map.<br>
             * Setting the limits will change the extents of the map.
             */
            class WMS extends geotoolkit.map.layers.Image {
                /**
                 * This shape connects to a server to display a map.<br>
                 * Setting the limits will change the extents of the map.
                 * @param options  (Optional) options
                 * @param options.imageformat  (Optional) image format to use
                 * @param options.layers  (Optional) layer name(s) to be shown
                 * @param options.version  (Optional) WMS version to be used
                 * @param options.inflate  (Optional) inflate ratio for requesting area (0.2 by default means +20%)
                 * @param options.transparent  (Optional) true if layer should be transparent
                 * @param options.timeout  (Optional) the timeout (in ms) between viewport changed and new image requested
                 */
                constructor(options?: any | { imageformat?: string; layers?: string|string[]; version?: string; inflate?: number; transparent?: boolean; timeout?: number; } );
                /**
                 * Sets the image format to use by the layer
                 * @param format  (Required) image format to use
                 */
                setImageFormat(format: string): this;
                /**
                 * Returns the image format used by the layer
                 */
                getImageFormat(): string;
                /**
                 * Sets the transparency of the layer
                 * @param bool  (Required) true if layer should be transparent
                 */
                setTransparent(bool: boolean): this;
                /**
                 * Returns the transparency of the layer
                 */
                getTransparent(): boolean;
                /**
                 * Sets WMS version to use
                 * @param version  (Required) version to use (in '1.3.0' format)
                 */
                setVersion(version: string): this;
                /**
                 * Returns WMS version currently used
                 */
                getVersion(): string;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {properties:{format:string;version:string;inflate:number;transparent:boolean}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * see {@link geotoolkit.map.layers.WMS#getProperties}
                 * @param properties  (Optional) JSON containing the properties to set
                 */
                setProperties(properties?: any): this;
            }
            /**
             * This layer connects to an Web Feature Service and displays received features from that server.
             */
            class WFS extends geotoolkit.map.layers.Vector {
                /**
                 * This layer connects to an Web Feature Service and displays received features from that server.
                 * @param options  (Optional) options
                 * @param options.featureTypes  (Optional) featureType name(s) to receive from the server
                 */
                constructor(options?: any | { featureTypes?: string[]|string; } );
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {properties:{featureTypes:string[]|string|any}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * see {@link geotoolkit.map.layers.WFS#getProperties}
                 * @param properties  (Optional) JSON containing the properties to set
                 */
                setProperties(properties?: any): this;
            }
            /**
             * This shape connects to an Esri Map Server and displays a single dynamic layer from that server.
             */
            class ArcGISImage extends geotoolkit.map.layers.Image {
                /**
                 * This shape connects to an Esri Map Server and displays a single dynamic layer from that server.
                 * @param options  (Optional) options
                 */
                constructor(options?: any);
                /**
                 * Queries layer legend data
                 * @param callback  (Optional) callback to call when the legend data is loaded
                 */
                queryLegend(callback?: Function): this;
                /**
                 * Returns the tooltip formatter or format function to use (null if tooltips are not visible)
                 */
                getTooltipFormatter(): any|Function;
            }
            /**
             * This shape connects to an Esri Feature Server and displays a single layer from that server.
             */
            class ArcGISFeature extends geotoolkit.map.layers.Vector {
                /**
                 * This shape connects to an Esri Feature Server and displays a single layer from that server.
                 * @param options  (Optional) options
                 * @param options.server  (Optional) The esri server we are being served from
                 * @param options.layer  (Optional) layer id(s) to display (for multilayer servers only)
                 * @param options.idfield  (Optional) field that contains the id for this shape
                 * @param options.requestresolution  (Optional) layer will be broken into a grid requestresolution x requestresolution for server requests
                 * @param options.requestfields  (Optional) an array for requested fields. if it is not specified all fields are loaded
                 */
                constructor(options?: any | { server?: string; layer?: string|any[]; idfield?: string; requestresolution?: number; requestfields?: string[]; } );
                /**
                 * Returns an array of fields to be requested from server
                 */
                getRequestFields(): string[];
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {properties:{requestresolution:number}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * see {@link geotoolkit.map.layers.ArcGISFeature#getProperties}
                 * @param properties  (Optional) JSON containing the properties to set
                 */
                setProperties(properties?: any): this;
                /**
                 * Adds the passed in ID's to the list of layers to show
                 * @param id  (Required) id(s) for the layer(s) to show
                 */
                showLayers(id: number|number[]): this;
                /**
                 * Returns the server layer names that are requested.
                 */
                getVisibleLayers(): string[]|any;
                /**
                 * Queries layer legend data
                 * @param callback  (Optional) callback to call when the legend data is loaded
                 */
                queryLegend(callback?: Function): this;
            }
            /**
             * The implementation is capable of loading GeoJSON data.<br>
             */
            class GeoJSON extends geotoolkit.map.layers.Vector {
                /**
                 * The implementation is capable of loading GeoJSON data.<br>
                 * @param options  (Optional) options
                 */
                constructor(options?: any);
                /**
                 * Loads GeoJson feature collection
                 * @param geoJson  (Required) geoJson object
                 */
                loadGeoJson(geoJson: any): this;
            }
            /**
             * The implementation is capable of loading KML (Keyhole Markup Language) data.<br>
             */
            class KML extends geotoolkit.map.layers.Vector {
                /**
                 * The implementation is capable of loading KML (Keyhole Markup Language) data.<br>
                 * @param options  (Optional) options
                 * @param options.source  (Optional) the layer data source
                 */
                constructor(options?: any | { source?: geotoolkit.map.sources.KML; } );
            }
            /**
             * The implementation is capable of loading CSV (Comma-Separated Values) data.<br>
             */
            class CSV extends geotoolkit.map.layers.Vector {
                /**
                 * The implementation is capable of loading CSV (Comma-Separated Values) data.<br>
                 * @param options  (Optional) options
                 * @param options.source  (Optional) the layer data source
                 * @param options.system  (Optional) initial data coordinate system
                 * @param options.longitudeField  (Optional) string defining the field name that holds the longitude (X) coordinate
                 * @param options.latitudeField  (Optional) string defining the field name that holds the latitude (Y) coordinate
                 */
                constructor(options?: any | { source?: geotoolkit.map.sources.CSV; system?: string|geotoolkit.map.coordinatesystems.AbstractSystem; longitudeField?: string; latitudeField?: string; } );
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {properties:{latitudefield:string|any;longitudefield:string|any}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * see {@link geotoolkit.map.layers.CSV#getProperties}
                 * @param properties  (Optional) JSON containing the properties to set
                 */
                setProperties(properties?: any): this;
            }
            /**
             * The implementation is capable of loading GeoRSS (Geographically Encoded Objects for RSS feeds) data.<br>
             */
            class GeoRSS extends geotoolkit.map.layers.Vector {
                /**
                 * The implementation is capable of loading GeoRSS (Geographically Encoded Objects for RSS feeds) data.<br>
                 * @param options  (Optional) options
                 * @param options.system  (Optional) initial data coordinate system
                 * @param options.source  (Optional) the layer data source
                 */
                constructor(options?: any | { system?: string|geotoolkit.map.coordinatesystems.AbstractSystem; source?: geotoolkit.map.sources.GeoRSS; } );
            }
            /**
             * This shape connects to an ArcGIS Stream Server and displays a single layer from it.
             */
            class Stream extends geotoolkit.map.layers.Vector {
                /**
                 * This shape connects to an ArcGIS Stream Server and displays a single layer from it.
                 * @param options  (Optional) options
                 * @param options.source  (Optional) the layer data source
                 */
                constructor(options?: any | { source?: geotoolkit.map.sources.Stream; } );
            }
            /**
             * This shape connects to a Bing Maps server to display a map.<br>
             */
            class Bing extends geotoolkit.map.layers.Tile {
                /**
                 * This shape connects to a Bing Maps server to display a map.<br>
                 * @param options  (Optional) 
                 * @param options.source  (Optional) Bing Maps source
                 * @param options.key  (Optional) Bing Maps API key. Get yours at http://www.bingmapsportal.com/
                 * @param options.culture  (Optional) the culture code to use for the request
                 * @param options.imagerySet  (Optional) the type of imagery for request. See
geotoolkit.map.sources.Bing.ImagerySet enum for all imagery supported
                 * @param options.centerPoint  (Optional) the center point to use for the imagery
WARNING! center point is required for the Birdseye imagery and its varieties
                 */
                constructor(options?: any | { source?: geotoolkit.map.sources.Bing; key?: string; culture?: string; imagerySet?: geotoolkit.map.sources.Bing.ImagerySet|string; centerPoint?: geotoolkit.util.Point; } );
            }
            /**
             * This layer connects to Mapbox VectorTile server and displays received features.
             */
            class VectorTile extends geotoolkit.map.layers.Vector {
                /**
                 * This layer connects to Mapbox VectorTile server and displays received features.
                 * @param options  (Optional) 
                 * @param options.source  (Optional) the layer data source
                 * @param options.styleUrl  (Optional) features drawing styles file url, if no set default styles are used
                 */
                constructor(options?: any | { source?: geotoolkit.map.sources.VectorTile; styleUrl?: string; } );
                /**
                 * Gets features iterator
                 * @param filter  (Optional) features query filter.
                 */
                getFeatures(filter?: geotoolkit.map.util.Query|Function): geotoolkit.util.Iterator;
            }
            class ScaleRangeLayerFilter extends geotoolkit.scene.filters.ScaleRange implements geotoolkit.renderer.IFilter {
                /**
                 * @param options  (Optional) options
                 * @param options.minscale  (Optional) minimal scale
                 * @param options.maxscale  (Optional) maximal scale
                 * @param options.minscaleinclusive  (Optional) minimal scale is inclusive
                 * @param options.maxscaleinclusive  (Optional) maximal scale is inclusive
                 */
                constructor(options?: any | { minscale?: number; maxscale?: number; minscaleinclusive?: number; maxscaleinclusive?: number; } );
            }
            /**
             * Defines a Map Layer, an Abstract class that will be used by the Map. Map layer represents the geographic layer which can be a tile layer, map layer or any custom layer. <br>
             * addLayer(), insertLayer() and removeLayer() is used to add and remove layers.
             */
            class AbstractMapLayer extends geotoolkit.scene.Node {
                /**
                 * Defines a Map Layer, an Abstract class that will be used by the Map. Map layer represents the geographic layer which can be a tile layer, map layer or any custom layer. <br>
                 * addLayer(), insertLayer() and removeLayer() is used to add and remove layers.
                 * @param options  (Optional) options (see "setOptions" method for details)
                 * @param options.system  (Optional) coordinate system this layer's data is in
                 */
                constructor(options?: any | { system?: geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystem.CoordinateSystem; } );
            }
            /**
             * The layer uses {@link geotoolkit.map.templates.ShapeTemplate} instance(s)
             * to render its {@link geotoolkit.map.features.IMapFeature} elements.
             */
            class ShapeTemplateFeatureLayer extends geotoolkit.map.layers.AbstractFeatureLayer {
                /**
                 * The layer uses {@link geotoolkit.map.templates.ShapeTemplate} instance(s)
                 * to render its {@link geotoolkit.map.features.IMapFeature} elements.
                 * @param options  (Required) options (see {@link geotoolkit.map.layers.AbstractFeatureLayer#setOptions setOptions} method for parent class options)
                 * @param options.templates  (Required) shape template(s) to visualize features (see example below)
                 */
                constructor(options: any | { templates?: any|any[]; } );
            }
            /**
             * This shape connects to a tile server to display a map. Map coordinates are assumed to be mercator Spherical Meters.<br>
             * Setting the limits will change the extents of the map.
             */
            class WMTSLayer extends geotoolkit.map.layers.AbstractMapLayer {
                /**
                 * This shape connects to a tile server to display a map. Map coordinates are assumed to be mercator Spherical Meters.<br>
                 * Setting the limits will change the extents of the map.
                 * @param options  (Optional) options
                 * @param options.server  (Optional) The tile server we are being served from
                 * @param options.tilewidth  (Optional) width resolution of the tiles
                 * @param options.tileheight  (Optional) height resolution of the tiles
                 * @param options.minlod  (Optional) minimum level of detail
                 * @param options.maxlod  (Optional) maximum level of detail
                 * @param options.imagepool  (Optional) pool size for map tiles
                 * @param options.formatterfunction  (Optional) function that takes z, y, x and turns that into tile location
                 */
                constructor(options?: any | { server?: string; tilewidth?: number; tileheight?: number; minlod?: number; maxlod?: number; imagepool?: number; formatterfunction?: Function; } );
            }
            /**
             * This shape connects to a server to display a map.<br>
             * Setting the limits will change the extents of the map.
             */
            class WMSLayer extends geotoolkit.map.layers.AbstractMapLayer {
                /**
                 * This shape connects to a server to display a map.<br>
                 * Setting the limits will change the extents of the map.
                 * @param options  (Optional) options
                 * @param options.server  (Optional) The map server url
                 * @param options.format  (Optional) image format to be used
                 * @param options.layers  (Optional) layer name(s) to be shown
                 * @param options.version  (Optional) WMS version to be used
                 * @param options.inflate  (Optional) inflate coefficient for the querying area (0.2 by default means +20%)
                 * @param options.transparent  (Optional) true if layer should be transparent
                 */
                constructor(options?: any | { server?: string; format?: string; layers?: string|string[]; version?: string; inflate?: number; transparent?: boolean; } );
            }
            /**
             * This shape connects to an Esri Map Server and displays a single dynamic layer from that server.
             */
            class ArcGISDynamicLayer extends geotoolkit.map.layers.AbstractMapLayer {
                /**
                 * This shape connects to an Esri Map Server and displays a single dynamic layer from that server.
                 * @param options  (Optional) options
                 * @param options.server  (Optional) The esri server we are being served from
                 * @param options.systemconverter  (Optional) coordinate system converter that can be used if server coordinate systems is not supported
                 */
                constructor(options?: any | { server?: string; systemconverter?: string; } );
            }
            /**
             * This shape connects to an Esri Feature Server and displays a single layer from that server.
             */
            class ArcGISFeatureLayer extends geotoolkit.map.layers.ShapeTemplateFeatureLayer {
                /**
                 * This shape connects to an Esri Feature Server and displays a single layer from that server.
                 * @param options  (Optional) options
                 * @param options.server  (Optional) The esri server we are being served from
                 * @param options.layer  (Optional) layer id(s) to display (for multilayer servers only)
                 * @param options.idfield  (Optional) field that contains the id for this shape
                 * @param options.requestresolution  (Optional) layer will be broken into a grid requestresolution x requestresolution for server requests
                 * @param options.requestfields  (Optional) an array for requested fields. if it is not specified all fields are loaded
                 */
                constructor(options?: any | { server?: string; layer?: string|any[]; idfield?: string; requestresolution?: number; requestfields?: string[]; } );
            }
            /**
             * The layer is a collection of geotoolkit shapes (polylines, polygons, symbols, etc.)<br>
             */
            class ShapeLayer extends geotoolkit.map.layers.AbstractMapLayer {
                /**
                 * The layer is a collection of geotoolkit shapes (polylines, polygons, symbols, etc.)<br>
                 * @param options  (Optional) options (see {@link geotoolkit.map.layers.AbstractMapLayer} for details)
                 */
                constructor(options?: any);
            }
            /**
             * The implementation is capable of loading GeoJSON data.<br>
             * It has following predefined shape templates:<br>
             * 'templates': [ <br>
             *     { 'featureclassname': geotoolkit.map.features.PolygonMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PolygonTemplate() },<br>
             *     { 'featureclassname': geotoolkit.map.features.MultiPolygonMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PolygonTemplate() },<br>
             *     { 'featureclassname': geotoolkit.map.features.LineStringMapFeature.getClassName(), 'template': new geotoolkit.map.templates.LineStringTemplate() },<br>
             *     { 'featureclassname': geotoolkit.map.features.MultiLineStringMapFeature.getClassName(), 'template': new geotoolkit.map.templates.LineStringTemplate() },<br>
             *     { 'featureclassname': geotoolkit.map.features.PointMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PointTemplate() },<br>
             *     { 'featureclassname': geotoolkit.map.features.MultiPointMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PointTemplate() }<br>
             * ]
             */
            class GeoJSONLayer extends geotoolkit.map.layers.ShapeTemplateFeatureLayer {
                /**
                 * The implementation is capable of loading GeoJSON data.<br>
                 * It has following predefined shape templates:<br>
                 * 'templates': [ <br>
                 *     { 'featureclassname': geotoolkit.map.features.PolygonMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PolygonTemplate() },<br>
                 *     { 'featureclassname': geotoolkit.map.features.MultiPolygonMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PolygonTemplate() },<br>
                 *     { 'featureclassname': geotoolkit.map.features.LineStringMapFeature.getClassName(), 'template': new geotoolkit.map.templates.LineStringTemplate() },<br>
                 *     { 'featureclassname': geotoolkit.map.features.MultiLineStringMapFeature.getClassName(), 'template': new geotoolkit.map.templates.LineStringTemplate() },<br>
                 *     { 'featureclassname': geotoolkit.map.features.PointMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PointTemplate() },<br>
                 *     { 'featureclassname': geotoolkit.map.features.MultiPointMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PointTemplate() }<br>
                 * ]
                 * @param options  (Optional) options
                 * @param options.idfield  (Optional) field that contains the id for this shape
                 * @param options.data  (Optional) Json data
                 */
                constructor(options?: any | { idfield?: string; data?: any; } );
            }
            /**
             * Layer rendering filter interface
             */
            type ILayerFilter = any; //TODO: Could not determine underlying type for this typedef. Falling back to 'any'

            module ArcGISFeature {
                /**
                 * Callback for queryLegend().
                 */
                type queryLegend = (err: any, data: any) => any;
            }
            module AbstractFeatureLayer {
                /**
                 * Feature layer events.
                 */
                interface Events {
                    /**
                     * Features updated
                     */
                    FeaturesUpdated: string;
                }
            }
        }
        module coordinatesystems {
            /**
             * Enum for axis directions
             */
            var AxisDirection: any;
            /**
             * Any layer data has some coordinates, for example: From where to draw a picture for a Image layer, or feature coordinates for Vector layers. There is no single agreement which coordinate system to use and there are thousands of different coordinate systems. <br>
             * Therefore, to draw different layers on one map, the data must be converted to one system. For this purpose, transformers and coordinate systems from the geotoolkit.map.coordinatesystems are used. <br>
             * They contain information about how the coordinates are set in each case and thus can convert from one system to another. This class specifies the generalized coordinate system.
             */
            class AbstractSystem {
                /**
                 * Any layer data has some coordinates, for example: From where to draw a picture for a Image layer, or feature coordinates for Vector layers. There is no single agreement which coordinate system to use and there are thousands of different coordinate systems. <br>
                 * Therefore, to draw different layers on one map, the data must be converted to one system. For this purpose, transformers and coordinate systems from the geotoolkit.map.coordinatesystems are used. <br>
                 * They contain information about how the coordinates are set in each case and thus can convert from one system to another. This class specifies the generalized coordinate system.
                 * @param options  (Required) options to specify coordinate system.
                 * @param options.name  (Required) name of the coordinate system.
                 * @param options.units  (Required) units of the coordinate system.
                 * @param options.limits  (Required) the default minimal rectangular bounding region that will entirely contain
                 * @param options.epsg  (Optional) epsg code of coordinate system
this AbstractSystem (approximately)
                 */
                constructor(options: any | { name?: string; units?: string|string[]; limits?: geotoolkit.util.Rect; epsg?: number; } );
                /**
                 * Return a name of the coordinate system
                 */
                getName(): string;
                /**
                 * Return units of the coordinate system
                 */
                getUnits(): string|string[];
                /**
                 * Return epsg code of the coordinate system
                 */
                getEpsgCode(): number;
                /**
                 * Return transformer for initial coordinate system
                 * @param system  (Required) initial coordinate system
                 */
                getTransformer(system: geotoolkit.map.coordinatesystems.AbstractSystem): geotoolkit.map.coordinatesystems.Transformer;
                /**
                 * Return if vertical axis goes up
                 */
                isVerticalAxisUp(): boolean;
                /**
                 * Gets the default minimal rectangular bounding region that will entirely contain
                 * this AbstractSystem (approximately). A CSR is an arbitrary complex closed
                 * region that touches the rectangular extent at least once on all four sides.
                 */
                getDefaultModelLimits(): geotoolkit.util.Rect;
                /**
                 * Transforms the specified coordinate to projection from lat / lng
                 * @param lon  (Required) long
                 * @param lat  (Required) lat
                 * @param dst  (Optional) optional destination point
                 */
                transform(lon: number, lat: number, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
                /**
                 * Return transformed point to lat / lng from projection
                 * @param x  (Required) x coordinate
                 * @param y  (Required) y coordinate
                 * @param dst  (Optional) optional destination point
                 */
                inverseTransform(x: number, y: number, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
                /**
                 * Get AbstractSystem from string identifier or inheritor
                 * @param object  (Required) object can be identifier or inheritor
                 */
                static fromObject(object: string|geotoolkit.map.coordinatesystems.AbstractSystem): geotoolkit.map.coordinatesystems.AbstractSystem|any;
            }
            /**
             * This class provides registry of coordinate systems.
             */
            class Registry {
                /**
                 * This class provides registry of coordinate systems.
                 */
                constructor();
                /**
                 * Returns coordinate system by the name
                 * @param name  (Required) name of the coordinate system or epsg code or WKT string
                 */
                getCoordinateSystem(name: string|number): geotoolkit.map.coordinatesystems.AbstractSystem;
                /**
                 * Registers a new coordinate system
                 * @param system  (Required) a new coordinate system
                 */
                registerCoordinateSystem(system: geotoolkit.map.coordinatesystems.AbstractSystem): this;
                /**
                 * Returns singleton instance of the coordinate system registry
                 */
                static getDefault(): geotoolkit.map.coordinatesystems.Registry;
            }
            /**
             * This class specifies the Geographic (lat/lon) coordinate system with datum WGS84 where longitude is x-axis and latitude is y-axis
             */
            class LatLon extends geotoolkit.map.coordinatesystems.AbstractSystem {
                /**
                 * This class specifies the Geographic (lat/lon) coordinate system with datum WGS84 where longitude is x-axis and latitude is y-axis
                 * @param epsg  (Optional) epsg epsg
                 */
                constructor(epsg?: number);
                /**
                 * Gets a transformer from initial coordinate system to the current coordinate system.
                 * @param system  (Required) initial coordinate system
                 */
                getTransformer(system: geotoolkit.map.coordinatesystems.AbstractSystem): geotoolkit.map.coordinatesystems.LatLonTransformer;
                /**
                 * Transforms the specified coordinate to projection from lat / lng
                 * @param lon  (Required) long
                 * @param lat  (Required) lat
                 * @param dst  (Optional) optional destination point
                 */
                transform(lon: number, lat: number, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
                /**
                 * Return transformed point to lat / lng from projection
                 * @param x  (Required) x coordinate
                 * @param y  (Required) y coordinate
                 * @param dst  (Optional) optional destination point
                 */
                inverseTransform(x: number, y: number, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
            }
            /**
             * Based on Geographic/UTM (Universal Transverse Mercator) Coordinate Converter
             */
            class UTM extends geotoolkit.map.coordinatesystems.AbstractSystem {
                /**
                 * Based on Geographic/UTM (Universal Transverse Mercator) Coordinate Converter
                 * @param zone  (Required) The UTM zone in which the point lies.
                 * @param southhemi  (Required) True if the point is in the southern hemisphere; false otherwise.
                 */
                constructor(zone: number|any, southhemi: boolean);
                /**
                 * Transforms the specified coordinate to projection from lat / lon
                 * @param lon  (Required) long
                 * @param lat  (Required) lat
                 * @param dst  (Optional) optional destination point
                 */
                transform(lon: number, lat: number, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
                /**
                 */
                getZone(): number;
                /**
                 * Sets the current zone
                 * @param zone  (Required) current zone
                 */
                setZone(zone: number): this;
                /**
                 * Set southern or northern hemisphere
                 * @param southhemi  (Required) true if southern
                 */
                setSouthernHemisphere(southhemi: boolean): this;
                /**
                 * Return true if it is southern hemisphere
                 */
                isSouthernHemisphere(): boolean;
                /**
                 * Return transformed point to lat / lng from projection
                 * @param x  (Required) x coordinate
                 * @param y  (Required) y coordinate
                 * @param dst  (Optional) optional destination point
                 */
                inverseTransform(x: number, y: number, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
            }
            /**
             * This class specifies the Web Mercator coordinate system
             */
            class WebMercator extends geotoolkit.map.coordinatesystems.AbstractSystem {
                /**
                 * This class specifies the Web Mercator coordinate system
                 * @param epsg  (Optional) epsg code of coordinate system
                 */
                constructor(epsg?: number);
                /**
                 * Transforms the specified coordinate to projection from lat / lng
                 * @param lon  (Required) long
                 * @param lat  (Required) lat
                 * @param dst  (Optional) optional destination point
                 */
                transform(lon: number, lat: number, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
                /**
                 * Return transformed point to lat / lng from projection
                 * @param mercatorX  (Required) x coordinate
                 * @param mercatorY  (Required) y coordinate
                 * @param dst  (Optional) optional destination point
                 */
                inverseTransform(mercatorX: number, mercatorY: number, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
            }
            /**
             * Based on WKT converter, can use parameters spheroid, towgs84, primem
             */
            class WKT extends geotoolkit.map.coordinatesystems.AbstractSystem {
                /**
                 * Based on WKT converter, can use parameters spheroid, towgs84, primem
                 * @param options  (Optional) options
                 * @param options.spheroid  (Optional) spheroid
                 * @param options.towgs84  (Optional) towgs84
                 * @param options.primem  (Optional) prime meridian
                 * @param options.spheroidunits  (Optional) spheroid units
                 * @param options.axis  (Optional) axis directions
                 * @param options.zone  (Optional) UTM zone
                 * @param options.southhemi  (Optional) true, if it is south hemisphere, false, if north
                 * @param options.standartparallel1  (Optional) sp1 latitude
                 * @param options.standartparallel2  (Optional) sp2 latitude
                 * @param options.latitudeoforigin  (Optional) origin latitude
                 * @param options.centralmeridian  (Optional) origin longitude
                 * @param options.falseeasting  (Optional) false easting
                 * @param options.falsenorthing  (Optional) false northing
                 * @param options.scalefactor  (Optional) scale
                 */
                constructor(options?: any | { spheroid?: number[]; towgs84?: number[]; primem?: number; spheroidunits?: geotoolkit.util.AbstractUnit|string; axis?: geotoolkit.map.coordinatesystems.AxisDirection[]; zone?: number; southhemi?: boolean; standartparallel1?: number; standartparallel2?: number; latitudeoforigin?: number; centralmeridian?: number; falseeasting?: number; falsenorthing?: number; scalefactor?: number; } );
                /**
                 * Transforms the specified coordinate to projection from lat / lng
                 * @param lon  (Required) long
                 * @param lat  (Required) lat
                 * @param dst  (Optional) optional destination point
                 */
                transform(lon: number, lat: number, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
                /**
                 * Return transformed point to lat / lng from projection
                 * @param mercatorX  (Required) x coordinate
                 * @param mercatorY  (Required) y coordinate
                 * @param dst  (Optional) optional destination point
                 */
                inverseTransform(mercatorX: number, mercatorY: number, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
                /**
                 * Gets spheroid
                 */
                getSpheroid(): number[];
                /**
                 * Gets toWGS84
                 */
                getToWGS84(): number[];
                /**
                 * Gets prime meridian
                 */
                getPrimeMeridian(): number;
                /**
                 * Gets spheroid units
                 */
                getSpheroidUnits(): geotoolkit.util.AbstractUnit;
                /**
                 * Parses Well-Known text projection representation into WKT coordinate system
                 * @param str  (Required) WKT text
                 */
                static parse(str: string): any|geotoolkit.map.coordinatesystems.WKT;
            }
            /**
             * Used to transform points from one CoordinateSystem to another.
             */
            class Transformer {
                /**
                 * Used to transform points from one CoordinateSystem to another.
                 * @param options  (Required) options to specify transformer.
                 * @param options.initialcoordinatesystem  (Required) initial coordinate system
                 * @param options.targetcoordinatesystem  (Required) target coordinate system
                 */
                constructor(options: any | { initialcoordinatesystem?: geotoolkit.map.coordinatesystems.AbstractSystem|string; targetcoordinatesystem?: geotoolkit.map.coordinatesystems.AbstractSystem|string; } );
                /**
                 * Returns transformed point, rectangle or polygonal geometry object
                 * @param source  (Required) origin to be transformed
                 * @param dst  (Optional) optional destination object
                 */
                transform(source: geotoolkit.util.Point|geotoolkit.util.Rect|any, dst?: geotoolkit.util.Point|geotoolkit.util.Rect|any): geotoolkit.util.Point|geotoolkit.util.Rect|any;
                /**
                 * Returns transformed point
                 * @param point  (Required) to transform
                 * @param dst  (Optional) optional destination point
                 */
                transformPoint(point: geotoolkit.util.Point, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
                /**
                 * Returns transformed rectangle
                 * @param rect  (Required) rectangle to transform
                 * @param dst  (Optional) optional destination rectangle
                 */
                transformRect(rect: geotoolkit.util.Rect, dst?: geotoolkit.util.Rect): geotoolkit.util.Rect;
                /**
                 * Returns transformed polygonal geometry object
                 * @param geometry  (Required) polygonal geometry object to transform
                 * @param geometry.x  (Required) x-ordinates to be transformed
                 * @param geometry.y  (Required) y-ordinates to be transformed
                 * @param dst  (Optional) optional destination geometry
                 */
                transformPolygon(geometry: any | { x?: number[]; y?: number[]; } , dst?: any): any;
                /**
                 * Sets initial coordinate system
                 * @param system  (Required) initial coordinate system
                 */
                setInitialCoordinateSystem(system: string|geotoolkit.map.coordinatesystems.AbstractSystem): this;
                /**
                 * Gets initial coordinate system
                 */
                getInitialCoordinateSystem(): geotoolkit.map.coordinatesystems.AbstractSystem;
                /**
                 * Sets target coordinate system
                 * @param system  (Required) target coordinate system
                 */
                setTargetCoordinateSystem(system: string|geotoolkit.map.coordinatesystems.AbstractSystem): this;
                /**
                 * Gets target coordinate system
                 */
                getTargetCoordinateSystem(): geotoolkit.map.coordinatesystems.AbstractSystem;
            }
            /**
             * Used to transform points to lat/lon coordinate system.
             */
            class LatLonTransformer extends geotoolkit.map.coordinatesystems.Transformer {
                /**
                 * Used to transform points to lat/lon coordinate system.
                 * @param options  (Required) options to specify transformer.
                 * @param options.initialcoordinatesystem  (Required) initial coordinate system
                 */
                constructor(options: any | { initialcoordinatesystem?: geotoolkit.map.coordinatesystems.AbstractSystem; } );
                /**
                 * Return transformed point
                 * @param point  (Required) to transform
                 * @param dst  (Optional) optional destination point
                 */
                transform(point: geotoolkit.util.Point, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
            }
            /**
             * Enum for axis directions
             */
            interface AxisDirection {
                /**
                 * North
                 */
                North: string;
                /**
                 * South
                 */
                South: string;
                /**
                 * West
                 */
                West: string;
                /**
                 * East
                 */
                East: string;
            }
        }
        module features {
            /**
             * Features query mode (the way to calculate requesting area) for the Vector sources
             */
            var QueryMode: any;
            /**
             * Abstract map feature class. Feature must have an ID (unique within a layer it's contained in) and geometry;<br>
             * may have set of attributes (non-spatial properties)
             */
            class AbstractFeature implements geotoolkit.map.features.IFeature {
                /**
                 * Abstract map feature class. Feature must have an ID (unique within a layer it's contained in) and geometry;<br>
                 * may have set of attributes (non-spatial properties)
                 * @param options  (Required) options
                 * @param options.id  (Required) ID
                 * @param options.geometry  (Required) geometry
                 * @param options.attributes  (Optional) attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any; attributes?: any; } );
                /**
                 * Gets ID
                 */
                getId(): number|string;
                /**
                 * Gets geometry
                 * @param isMapCS  (Optional) Map coordinate system flag
                 */
                getGeometry(isMapCS?: boolean): any;
                /**
                 * Gets attributes (non-spatial properties)
                 */
                getAttributes(): any;
                /**
                 * Applies Map coordinate system to itself
                 * @param layer  (Required) map layer to use for coordinate system conversion
                 */
                applyMapCS(layer: geotoolkit.map.layers.AbstractLayer): this;
            }
            /**
             * Point map feature implementation.
             */
            class Point extends geotoolkit.map.features.AbstractFeature {
                /**
                 * Point map feature implementation.
                 * @param options  (Required) options
                 * @param options.id  (Required) ID
                 * @param options.geometry  (Required) geometry
                 * @param options.geometry.x  (Required) x-ordinate
                 * @param options.geometry.y  (Required) y-ordinate
                 * @param options.attributes  (Optional) attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any | { x?: number; y?: number; } ; attributes?: any; } );
                /**
                 * Applies Map coordinate system to itself
                 * @param layer  (Required) map layer to use for coordinate system conversion
                 */
                applyMapCS(layer: geotoolkit.map.layers.AbstractLayer): this;
            }
            /**
             * Multi-point map feature implementation.
             */
            class MultiPoint extends geotoolkit.map.features.AbstractFeature {
                /**
                 * Multi-point map feature implementation.
                 * @param options  (Required) options
                 * @param options.id  (Required) ID
                 * @param options.geometry  (Required) feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.Point}'s geometry
                 * @param options.attributes  (Optional) attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any[]; attributes?: any; } );
                /**
                 * Applies Map coordinate system to itself
                 * @param layer  (Required) map layer to use for coordinate system conversion
                 */
                applyMapCS(layer: geotoolkit.map.layers.AbstractLayer): this;
            }
            /**
             * Line string (or "polyline") map feature implementation.
             */
            class LineString extends geotoolkit.map.features.AbstractFeature {
                /**
                 * Line string (or "polyline") map feature implementation.
                 * @param options  (Required) line and map feature options
                 * @param options.id  (Required) feature ID
                 * @param options.geometry  (Required) feature geometry
                 * @param options.geometry.x  (Required) array of x-coordinates
                 * @param options.geometry.y  (Required) array of y-coordinates
                 * @param options.attributes  (Optional) feature attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any | { x?: any[]; y?: any[]; } ; attributes?: any; } );
                /**
                 * Applies Map coordinate system to itself
                 * @param layer  (Required) map layer to use for coordinate system conversion
                 */
                applyMapCS(layer: geotoolkit.map.layers.AbstractLayer): this;
            }
            /**
             * Multi line string map feature implementation.
             */
            class MultiLineString extends geotoolkit.map.features.AbstractFeature {
                /**
                 * Multi line string map feature implementation.
                 * @param options  (Required) feature options
                 * @param options.id  (Required) feature ID
                 * @param options.geometry  (Required) feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.LineString}'s geometry
                 * @param options.attributes  (Optional) feature attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any[]; attributes?: any; } );
                /**
                 * Applies Map coordinate system to itself
                 * @param layer  (Required) map layer to use for coordinate system conversion
                 */
                applyMapCS(layer: geotoolkit.map.layers.AbstractLayer): this;
            }
            /**
             * Polygon map feature implementation.
             */
            class Polygon extends geotoolkit.map.features.AbstractFeature {
                /**
                 * Polygon map feature implementation.
                 * @param options  (Required) options
                 * @param options.id  (Required) feature ID
                 * @param options.geometry  (Required) feature geometry
                 * @param options.geometry.x  (Required) array of x-coordinates
                 * @param options.geometry.y  (Required) array of y-coordinates
                 * @param options.attributes  (Optional) feature attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any | { x?: any[]; y?: any[]; } ; attributes?: any; } );
                /**
                 * Applies Map coordinate system to itself
                 * @param layer  (Required) map layer to use for coordinate system conversion
                 */
                applyMapCS(layer: geotoolkit.map.layers.AbstractLayer): this;
            }
            /**
             * Multi-polygon map feature implementation.
             */
            class MultiPolygon extends geotoolkit.map.features.AbstractFeature {
                /**
                 * Multi-polygon map feature implementation.
                 * @param options  (Required) feature options
                 * @param options.id  (Required) feature ID
                 * @param options.geometry  (Required) feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.Polygon}'s geometry
                 * @param options.attributes  (Optional) feature attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any[]; attributes?: any; } );
                /**
                 * Applies Map coordinate system to itself
                 * @param layer  (Required) map layer to use for coordinate system conversion
                 */
                applyMapCS(layer: geotoolkit.map.layers.AbstractLayer): this;
            }
            /**
             * Point map feature implementation.
             */
            class Aggregation extends geotoolkit.map.features.Point {
                /**
                 * Point map feature implementation.
                 * @param options  (Required) options
                 * @param options.id  (Required) ID
                 * @param options.geometry  (Required) geometry
                 * @param options.geometry.x  (Required) x-ordinate
                 * @param options.geometry.y  (Required) y-ordinate
                 * @param options.aggregation  (Optional) iterator through aggregated features
                 * @param options.attributes  (Optional) attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any | { x?: number; y?: number; } ; aggregation?: geotoolkit.util.Iterator; attributes?: any; } );
                /**
                 * Returns iterator through aggregated features
                 */
                getAggregation(): geotoolkit.util.Iterator;
                /**
                 * Sets expanded mode
                 * @param expanded  (Required) true, if expanded, else false
                 */
                setExpanded(expanded: boolean): this;
            }
            /**
             * Gets feature ID based on a feature properties.
             * The implementation returns properties[propertyName] to use as a feature ID.
             */
            class PropertyToFeatureId extends geotoolkit.map.features.strategies.IdByAttribute implements geotoolkit.map.features.IGetFeatureId {
                /**
                 * Gets feature ID based on a feature properties.
                 * The implementation returns properties[propertyName] to use as a feature ID.
                 * @param propertyName  (Required) property name to use as a feature ID
                 */
                constructor(propertyName: string);
            }
            /**
             * FeatureTypeFeaturesFilter class filters out all features that are not featureType(s) instances.
             */
            class FeatureTypeFeaturesFilter extends geotoolkit.map.features.filters.ByType implements geotoolkit.map.features.IFeaturesFilter {
                /**
                 * FeatureTypeFeaturesFilter class filters out all features that are not featureType(s) instances.
                 * @param featureType  (Required) feature type(s) to render
                 */
                constructor(featureType: Function|Function[]);
            }
            /**
             * AnchoredShapeFeaturesFilter filters out:<br>
             * 1. features outside of canvas rendering area<br>
             * 2. overlapped AnchoredShape's MapFeatures (optionally)<br>
             * The filter assumes feature geometries having 'x' and 'y' components to use as anchored shape anchor.
             */
            class AnchoredShapeFeaturesFilter extends geotoolkit.map.features.filters.VisibilityArea implements geotoolkit.map.features.IFeaturesFilter {
                /**
                 * AnchoredShapeFeaturesFilter filters out:<br>
                 * 1. features outside of canvas rendering area<br>
                 * 2. overlapped AnchoredShape's MapFeatures (optionally)<br>
                 * The filter assumes feature geometries having 'x' and 'y' components to use as anchored shape anchor.
                 * @param shape  (Required) anchored shape template
                 * @param options  (Optional) options (see "setOptions" method for details)
                 * @param options.nooverlap  (Optional) "No overlapping Features allowed" flag
                 */
                constructor(shape: geotoolkit.scene.shapes.AnchoredShape, options?: any | { nooverlap?: boolean; } );
            }
            /**
             * TextFitFeaturesFilter filters out features who's annotations do not fit in the features' geometries
             */
            class TextFitFeaturesFilter extends geotoolkit.map.features.filters.AnnotationFit implements geotoolkit.map.features.IFeaturesFilter {
                /**
                 * TextFitFeaturesFilter filters out features who's annotations do not fit in the features' geometries
                 * @param text  (Optional) JSON-object or text shape instance
(see {@link geotoolkit.scene.shapes.Text} constructor JSON-object for details)
                 */
                constructor(text?: any|geotoolkit.scene.shapes.Text);
            }
            /**
             * BiggestGeometryTextFilter annotates biggest features' geometries.
             */
            class BiggestGeometryTextFilter extends geotoolkit.map.features.filters.BiggestGeometry implements geotoolkit.map.features.IFeaturesFilter {
                /**
                 * BiggestGeometryTextFilter annotates biggest features' geometries.
                 */
                constructor();
            }
            /**
             * CascadeGeometryTextFilter annotates features' geometries that are not wrapped by another geometry (no-annotated 'holes').
             */
            class CascadeGeometryTextFilter extends geotoolkit.map.features.filters.EvenOddGeometry implements geotoolkit.map.features.IFeaturesFilter {
                /**
                 * CascadeGeometryTextFilter annotates features' geometries that are not wrapped by another geometry (no-annotated 'holes').
                 */
                constructor();
            }
            /**
             * NoOverlapTextFilter filters out overlapped text<br>
             * If two or more texts overlap each other, then only one with the biggest geometry is shown
             */
            class NoOverlapTextFilter extends geotoolkit.map.features.filters.NoAnnotationOverlap implements geotoolkit.map.features.IFeaturesFilter {
                /**
                 * NoOverlapTextFilter filters out overlapped text<br>
                 * If two or more texts overlap each other, then only one with the biggest geometry is shown
                 * @param text  (Optional) JSON-object or text shape instance
(see {@link geotoolkit.scene.shapes.Text} constructor JSON-object for details)
                 * @param ignoreTypes  (Optional) feature types that should be passed without filtering
                 */
                constructor(text?: any|geotoolkit.scene.shapes.Text, ignoreTypes?: any[]);
            }
            /**
             * Abstract map feature class. Feature must have an ID (unique within a layer it's contained in) and geometry;<br>
             * may have set of attributes (non-spatial properties)
             */
            class AbstractMapFeature extends geotoolkit.map.features.AbstractFeature implements geotoolkit.map.features.IMapFeature {
                /**
                 * Abstract map feature class. Feature must have an ID (unique within a layer it's contained in) and geometry;<br>
                 * may have set of attributes (non-spatial properties)
                 * @param options  (Required) options
                 * @param options.id  (Required) ID
                 * @param options.geometry  (Required) geometry
                 * @param options.attributes  (Optional) attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any; attributes?: any; } );
            }
            /**
             * Point map feature implementation.
             */
            class PointMapFeature extends geotoolkit.map.features.AbstractMapFeature implements geotoolkit.map.features.IMapFeature {
                /**
                 * Point map feature implementation.
                 * @param options  (Required) options
                 * @param options.id  (Required) ID
                 * @param options.geometry  (Required) geometry
                 * @param options.geometry.x  (Required) x-ordinate
                 * @param options.geometry.y  (Required) y-ordinate
                 * @param options.attributes  (Optional) attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any | { x?: number; y?: number; } ; attributes?: any; } );
            }
            /**
             * Multi-point map feature implementation.
             */
            class MultiPointMapFeature extends geotoolkit.map.features.AbstractMapFeature implements geotoolkit.map.features.IMapFeature {
                /**
                 * Multi-point map feature implementation.
                 * @param options  (Required) options
                 * @param options.id  (Required) ID
                 * @param options.geometry  (Required) feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.PointMapFeature}'s geometry
                 * @param options.attributes  (Optional) attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any[]; attributes?: any; } );
            }
            /**
             * Line string (or "polyline") map feature implementation.
             */
            class LineStringMapFeature extends geotoolkit.map.features.AbstractMapFeature implements geotoolkit.map.features.IMapFeature {
                /**
                 * Line string (or "polyline") map feature implementation.
                 * @param options  (Required) line and map feature options
                 * @param options.id  (Required) feature ID
                 * @param options.geometry  (Required) feature geometry
                 * @param options.geometry.x  (Required) array of x-coordinates
                 * @param options.geometry.y  (Required) array of y-coordinates
                 * @param options.attributes  (Optional) feature attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any | { x?: any[]; y?: any[]; } ; attributes?: any; } );
            }
            /**
             * Multi line string map feature implementation.
             */
            class MultiLineStringMapFeature extends geotoolkit.map.features.AbstractMapFeature implements geotoolkit.map.features.IMapFeature {
                /**
                 * Multi line string map feature implementation.
                 * @param options  (Required) feature options
                 * @param options.id  (Required) feature ID
                 * @param options.geometry  (Required) feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.LineStringMapFeature}'s geometry
                 * @param options.attributes  (Optional) feature attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any[]; attributes?: any; } );
            }
            /**
             * Polygon map feature implementation.
             */
            class PolygonMapFeature extends geotoolkit.map.features.AbstractMapFeature implements geotoolkit.map.features.IMapFeature {
                /**
                 * Polygon map feature implementation.
                 * @param options  (Required) options
                 * @param options.id  (Required) feature ID
                 * @param options.geometry  (Required) feature geometry
                 * @param options.geometry.x  (Required) array of x-coordinates
                 * @param options.geometry.y  (Required) array of y-coordinates
                 * @param options.attributes  (Optional) feature attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any | { x?: any[]; y?: any[]; } ; attributes?: any; } );
            }
            /**
             * Multi-polygon map feature implementation.
             */
            class MultiPolygonMapFeature extends geotoolkit.map.features.AbstractMapFeature implements geotoolkit.map.features.IMapFeature {
                /**
                 * Multi-polygon map feature implementation.
                 * @param options  (Required) feature options
                 * @param options.id  (Required) feature ID
                 * @param options.geometry  (Required) feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.PolygonMapFeature}'s geometry
                 * @param options.attributes  (Optional) feature attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any[]; attributes?: any; } );
            }
            /**
             * Point map feature implementation.
             */
            class AggregationMapFeature extends geotoolkit.map.features.PointMapFeature {
                /**
                 * Point map feature implementation.
                 * @param options  (Required) options
                 * @param options.id  (Required) ID
                 * @param options.geometry  (Required) geometry
                 * @param options.geometry.x  (Required) x-ordinate
                 * @param options.geometry.y  (Required) y-ordinate
                 * @param options.aggregation  (Optional) iterator through aggregated features
                 * @param options.attributes  (Optional) attributes (non-spatial properties)
                 */
                constructor(options: any | { id?: number|string; geometry?: any | { x?: number; y?: number; } ; aggregation?: geotoolkit.util.Iterator; attributes?: any; } );
            }
            /**
             * Applies feature geometry's 'x' and 'y' (in Map C.S.) to {@link geotoolkit.scene.shapes.AnchoredShape} as an anchor
             */
            class PointMapFeatureToAnchor extends geotoolkit.map.features.adapters.Point implements geotoolkit.map.features.IFeatureGeometryToShape,geotoolkit.map.features.IFeatureGeometryToText {
                /**
                 * Applies feature geometry's 'x' and 'y' (in Map C.S.) to {@link geotoolkit.scene.shapes.AnchoredShape} as an anchor
                 * @param options  (Optional) options
                 * @param options.offset  (Optional) anchor offset
                 * @param options.offset.x  (Optional) x-offset
                 * @param options.offset.y  (Optional) y-offset
                 */
                constructor(options?: any | { offset?: any | { x?: number; y?: number; } ; } );
            }
            /**
             * Applies feature geometry's 'x' and 'y' coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polygon}
             */
            class GeometryToPolygon extends geotoolkit.map.features.adapters.Polygon implements geotoolkit.map.features.IFeatureGeometryToShape {
                /**
                 * Applies feature geometry's 'x' and 'y' coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polygon}
                 */
                constructor();
            }
            /**
             * Applies feature geometry's 'x' and 'y' coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polyline}
             */
            class GeometryToPolyline extends geotoolkit.map.features.adapters.LineString implements geotoolkit.map.features.IFeatureGeometryToShape {
                /**
                 * Applies feature geometry's 'x' and 'y' coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polyline}
                 */
                constructor();
            }
            /**
             * Calculates right end point of polyline and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
             */
            class LineStringMapFeatureToAnchor extends geotoolkit.map.features.adapters.Edge implements geotoolkit.map.features.IFeatureGeometryToText {
                /**
                 * Calculates right end point of polyline and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
                 * @param options  (Optional) options
                 * @param options.offset  (Optional) anchor offset
                 * @param options.offset.x  (Optional) x-offset
                 * @param options.offset.y  (Optional) y-offset
                 */
                constructor(options?: any | { offset?: any | { x?: number; y?: number; } ; } );
            }
            /**
             * Calculates geometry center and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
             */
            class GeometryCenterToAnchor extends geotoolkit.map.features.adapters.Center implements geotoolkit.map.features.IFeatureGeometryToText {
                /**
                 * Calculates geometry center and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
                 * @param mode  (Optional) geometry center to anchor mode
                 */
                constructor(mode?: string);
            }
            /**
             * The map feature interface IFeature shows the basic properties that any feature should have.
             */
            interface IFeature {
                /**
                 * Gets ID <br>
                 * Id is a unique identifier of the feature, usually one of the attributes. It is used to simplify settings for the user, as a default 'annotation' (text info) for the feature.
                 */
                getId(): number|string;
                /**
                 * Gets attributes (non-spatial properties) <br>
                 * Attributes are some additional (non-spatial) properties. These attributes can be written as a text next to the feature itself for more information for the user.<br>
                 */
                getAttributes(): any;
                /**
                 * Gets geometry. Geometry is the place, where the feature should be rendered. It is point coordinates for a point feature or a points array for polygons and polylines.
                 * @param isMapCS  (Optional) Map coordinate system flag
                 */
                getGeometry(isMapCS?: boolean): any;
            }
            /**
             * Features query mode (the way to calculate requesting area) for the Vector sources
             */
            interface QueryMode {
                /**
                 * Query all features with a single request
                 */
                All: string;
                /**
                 * Query features based on the visible bounding box
                 */
                Bbox: string;
                /**
                 * Query features using 256x256px tiles
                 */
                Tile: string;
                /**
                 * Query features using grid cells
                 */
                Grid: string;
            }
            interface IGetFeatureId {
            }
            /**
             * Features rendering filter interface
             */
            interface IFeaturesFilter {
            }
            /**
             * Map feature interface
             */
            interface IMapFeature {
            }
            /**
             * Interface to retreive feature geometry and apply it to {@link geotoolkit.scene.shapes.Text} as an anchor
             */
            interface IFeatureGeometryToText {
            }
            /**
             * Interface to retrieve feature geometry and apply it to {@link geotoolkit.scene.Node} shape
             */
            interface IFeatureGeometryToShape {
            }
            module converters {
                /**
                 * Feature converters events.
                 */
                var Events: any;
                /**
                 * Converts features in a form convenient for storage and processing. Returns saved features on request.
                 */
                class BaseConverter extends geotoolkit.util.EventDispatcher {
                    /**
                     * Converts features in a form convenient for storage and processing. Returns saved features on request.
                     */
                    constructor();
                    /**
                     * Converts and saves new features in array. All features are supported.
                     * @param features  (Required) new features to add
                     */
                    saveConvertedFeatures(features: geotoolkit.map.features.IFeature[]): any[]|any;
                    /**
                     * Returns saved features corresponded to the options
                     * @param options  (Required) request options
                     * @param options.bbox  (Optional) bounding box for requested features
                     * @param options.filter  (Optional) additional filter by features
                     */
                    getFeatures(options: any | { bbox?: geotoolkit.util.Rect; filter?: Function; } ): geotoolkit.map.features.IFeature[]|geotoolkit.util.Iterator;
                    /**
                     * Removes feature(s) from the store
                     * @param features  (Required) feature(s) to remove
                     */
                    removeFeatures(features: geotoolkit.util.Iterator|geotoolkit.map.features.IFeature): this;
                    /**
                     * Clears all the features from the store
                     */
                    clear(): this;
                }
                /**
                 * Provides feature converters store for centralized control and processing
                 */
                class CompositeConverter extends geotoolkit.util.EventDispatcher {
                    /**
                     * Provides feature converters store for centralized control and processing
                     * @param converters  (Required) converter(s) for storing
                     */
                    constructor(converters: geotoolkit.map.features.converters.BaseConverter|any[]);
                    /**
                     * Adds converter to the end of the list for storing features
                     * @param converter  (Required) converter to add
                     */
                    addFeatureConverter(converter: geotoolkit.map.features.converters.BaseConverter): this;
                    /**
                     * Removes converter from the converters list
                     * @param converter  (Required) converter to remove
                     */
                    removeFeatureConverter(converter: geotoolkit.map.features.converters.BaseConverter): this;
                    /**
                     * Returns features from the converters corresponded to the options
                     * @param options  (Required) request options
                     * @param options.bbox  (Optional) bounding box for requested features
                     * @param options.filter  (Optional) additional filter by features
                     */
                    getFeatures(options: any | { bbox?: geotoolkit.util.Rect; filter?: Function; } ): geotoolkit.util.Iterator;
                }
                /**
                 * Converts features into a scaled view in purpose of simplify geometry and remove unnecessary points using RDP(Ramer-Douglas-Peucker) algorithm.
                 * Only multipoint-like features are supported.
                 */
                class RDP extends geotoolkit.map.features.converters.BaseConverter {
                    /**
                     * Converts features into a scaled view in purpose of simplify geometry and remove unnecessary points using RDP(Ramer-Douglas-Peucker) algorithm.
                     * Only multipoint-like features are supported.
                     */
                    constructor();
                    /**
                     * Converts and saves features in a scaled view. Only multipoint-like features are supported.
                     * @param features  (Required) new features to add
                     */
                    saveConvertedFeatures(features: geotoolkit.map.features.IFeature[]): any[]|any;
                    /**
                     * Returns saved features corresponded to the options
                     * @param options  (Required) request options
                     * @param options.bbox  (Optional) bounding box for requested features
                     * @param options.filter  (Optional) additional filter by features
                     * @param options.scale  (Optional) map scale to calculate minimum distance between features for aggregation
                     */
                    getFeatures(options: any | { bbox?: geotoolkit.util.Rect; filter?: Function; scale?: number; } ): geotoolkit.map.features.IFeature[];
                    /**
                     * Removes feature(s) from the store
                     * @param features  (Required) feature(s) to remove
                     */
                    removeFeatures(features: geotoolkit.util.Iterator|geotoolkit.map.features.IFeature): this;
                }
                /**
                 * Converts features into a binary tree for the purpose of aggregation nearby points.
                 * Only point-like features are supported.
                 */
                class Aggregator extends geotoolkit.map.features.converters.BaseConverter {
                    /**
                     * Converts features into a binary tree for the purpose of aggregation nearby points.
                     * Only point-like features are supported.
                     * @param options  (Required) convert options
                     * @param options.mindistance  (Optional) minimum distance between aggregations (in pixel)
                     * @param options.min  (Optional) minimum number of points to start aggregation
                     * @param options.enabled  (Optional) true if aggregation is enabled
                     * @param options.timeout  (Optional) timeout between features cached request and the actual data query (in ms)
                     * @param options.amountaggregations  (Optional) number of children in aggregation tree for extension
                     * @param options.radius  (Optional) difference between layers for extension
                     */
                    constructor(options: any | { mindistance?: number; min?: number; enabled?: boolean; timeout?: number; amountaggregations?: number; radius?: number; } );
                    /**
                     * Converts and saves features as a binary tree. Only point-like features are supported.
                     * @param features  (Required) new features to add
                     */
                    saveConvertedFeatures(features: geotoolkit.map.features.IFeature[]): any[]|any;
                    /**
                     * Returns saved features corresponded to the options
                     * @param options  (Required) request options
                     * @param options.bbox  (Optional) bounding box for requested features
                     * @param options.filter  (Optional) additional filter by features
                     * @param options.scale  (Optional) map scale to calculate minimum distance between features for aggregation
                     */
                    getFeatures(options: any | { bbox?: geotoolkit.util.Rect; filter?: Function; scale?: number; } ): geotoolkit.map.features.IFeature[];
                    /**
                     * Removes feature(s) from the store
                     * @param features  (Required) feature(s) to remove
                     */
                    removeFeatures(features: geotoolkit.util.Iterator|geotoolkit.map.features.IFeature): this;
                    /**
                     * Gets current conversion options.
                     */
                    getOptions(): {options:{mindistance:number;min:number;enabled:boolean;timeout:number}}|any;
                    /**
                     * Sets new conversion options.
                     * @param options  (Required) convert options
                     * @param options.mindistance  (Optional) minimum distance between aggregations (in pixel)
                     * @param options.min  (Optional) minimum number of points to start aggregation
                     * @param options.enabled  (Optional) true if aggregation is enabled
                     * @param options.timeout  (Optional) timeout between features cached request and the actual data query (in ms)
                     */
                    setOptions(options: any | { mindistance?: number; min?: number; enabled?: boolean; timeout?: number; } ): this;
                }
                /**
                 * Converts features in a form convenient for storage and processing. Returns saved features on request.
                 */
                class DefaultFeatureConverter extends geotoolkit.util.EventDispatcher {
                    /**
                     * Converts features in a form convenient for storage and processing. Returns saved features on request.
                     */
                    constructor();
                }
                /**
                 * Provides FeatureConverters store for centralized control and processing
                 */
                class FeatureConverterGroup extends geotoolkit.util.EventDispatcher {
                    /**
                     * Provides FeatureConverters store for centralized control and processing
                     * @param converters  (Required) converter(s) for storing
                     */
                    constructor(converters: geotoolkit.map.features.converters.DefaultFeatureConverter|any[]);
                }
                /**
                 * Stores features as a binary tree for the purpose of aggregation nearby points. Not point-like features are unsupported.
                 */
                class PointAggregationConverter extends geotoolkit.map.features.converters.DefaultFeatureConverter {
                    /**
                     * Stores features as a binary tree for the purpose of aggregation nearby points. Not point-like features are unsupported.
                     * @param options  (Required) convert options
                     * @param options.mindistance  (Optional) minimum distance between aggregations (in pixel)
                     * @param options.min  (Optional) minimum number of points to start aggregation
                     * @param options.enabled  (Optional) true if aggregation is enabled
                     * @param options.timeout  (Optional) timeout between features cached request and the actual data query (in ms)
                     */
                    constructor(options: any | { mindistance?: number; min?: number; enabled?: boolean; timeout?: number; } );
                }
                /**
                 * Stores features as a scaled view in purpose of simplify geometry and remove unnecessary point using RDP(Ramer-Douglas-Peucker) algorithm.
                 * Only multipoint-like features are supported.
                 */
                class RDPFeatureConverter extends geotoolkit.map.features.converters.DefaultFeatureConverter {
                    /**
                     * Stores features as a scaled view in purpose of simplify geometry and remove unnecessary point using RDP(Ramer-Douglas-Peucker) algorithm.
                     * Only multipoint-like features are supported.
                     */
                    constructor();
                }
                /**
                 * Feature converters events.
                 */
                type Events = any;

            }
            module strategies {
                /**
                 * The strategy returns feature's attribute 'attributeName' as annotation
                 */
                class AnnotationByAttribute implements geotoolkit.map.features.strategies.IGetAnnotation {
                    /**
                     * The strategy returns feature's attribute 'attributeName' as annotation
                     * @param attributeName  (Required) define attribute name to get from feature for visualization
                     */
                    constructor(attributeName: string);
                    /**
                     * Gets annotation text for a feature.<br>
                     * The implementation returns feature.getAttributes()[propertyName].
                     * @param feature  (Required) map feature
                     * @param layer  (Required) feature layer (not used)
                     */
                    getAnnotation(feature: geotoolkit.map.features.IFeature, layer: geotoolkit.map.layers.AbstractFeatureLayer): string;
                }
                /**
                 * The strategy returns feature ID as annotation
                 */
                class AnnotationById implements geotoolkit.map.features.strategies.IGetAnnotation {
                    /**
                     * The strategy returns feature ID as annotation
                     */
                    constructor();
                    /**
                     * Gets annotation text for a feature.<br>
                     * The implementation returns feature's ID
                     * @param feature  (Required) map feature
                     * @param layer  (Required) feature layer (not used)
                     */
                    getAnnotation(feature: geotoolkit.map.features.IFeature, layer: geotoolkit.map.layers.AbstractFeatureLayer): string;
                }
                /**
                 * Gets feature ID based on a feature attributes.
                 * The implementation returns attributes[attributeName] to use as a feature ID.
                 */
                class IdByAttribute implements geotoolkit.map.features.strategies.IGetId {
                    /**
                     * Gets feature ID based on a feature attributes.
                     * The implementation returns attributes[attributeName] to use as a feature ID.
                     * @param attributeName  (Required) attribute name to use as a feature ID
                     */
                    constructor(attributeName: string);
                    /**
                     * Gets feature ID based on a feature attributes.
                     * The implementation returns attributes[attributeName].
                     * @param attributes  (Required) feature attributes
                     */
                    getFeatureId(attributes: any): number|string;
                    /**
                     * Gets the property name that is used to identify feature
                     */
                    getPropertyName(): string;
                    /**
                     * Gets the attribute name that is used to identify feature
                     */
                    getAttributeName(): string;
                }
                /**
                 * Annotation strategy interface
                 */
                interface IGetAnnotation {
                    /**
                     * Gets annotation text for a feature
                     * @param feature  (Required) map feature
                     * @param layer  (Required) feature layer
                     */
                    getAnnotation(feature: geotoolkit.map.features.IFeature, layer: geotoolkit.map.layers.AbstractFeatureLayer): string;
                }
                /**
                 * Gets feature ID based on a feature properties
                 */
                interface IGetId {
                    /**
                     * Gets feature ID based on a feature properties
                     * @param source  (Required) feature properties
                     */
                    getFeatureId(source: any): number|string;
                }
            }
            module formatters {
                /**
                 * Features info formatter based on the one attribute field.
                 */
                class SingleField {
                    /**
                     * Features info formatter based on the one attribute field.
                     * @param field  (Optional) field to show, id is used if no value provided
                     * @param separator  (Optional) html separator between different features info (e.g use ', ' for comma-separated list)
                     * @param limit  (Optional) upper limit for the aggregated features are shown
                     * @param unique  (Optional) true to filter repeating fields
                     */
                    constructor(field?: string, separator?: string, limit?: number, unique?: boolean);
                    /**
                     * Formats html text based on the provided features attribute field
                     * @param features  (Required) features list to format
                     * @param text  (Required) text created by the previous formatters from other layers
                     */
                    format(features: geotoolkit.map.features.AbstractFeature[], text: string): string;
                }
                /**
                 * Features info formatter that creates table based on the one attribute field.
                 */
                class Table {
                    /**
                     * Features info formatter that creates table based on the one attribute field.
                     * @param fields  (Optional) fields to show in table, all fields are shown if no value provided
                     * @param vertical  (Optional) true if feature info should be located in a column with the field names at the first.
Otherwise features are placed in a row one under another with field names as a header
                     */
                    constructor(fields?: string[], vertical?: boolean);
                    /**
                     * Formats html text based on the provided features attribute field
                     * @param features  (Required) features list to format
                     * @param text  (Required) text created by the previous formatters from other layers
                     */
                    format(features: geotoolkit.map.features.AbstractFeature[], text: string): string;
                    /**
                     * Creates table formatter function based on the provided object with structure { tableField: fieldFormatterFunction }
                     * @param obj  (Required) fields formatter object
                     * @param vertical  (Optional) true if feature info should be located in a column with the field names at the first.
Otherwise features are placed in a row one under another with field names as a header
                     */
                    static fromObject(obj: any, vertical?: boolean): Function;
                }
            }
            module filters {
                /**
                 * AnnotationFit filters out features who's annotations do not fit in their geometries
                 */
                class AnnotationFit implements geotoolkit.map.features.filters.IFilter {
                    /**
                     * AnnotationFit filters out features who's annotations do not fit in their geometries
                     * @param text  (Optional) JSON-object or text shape instance
(see {@link geotoolkit.scene.shapes.Text} constructor JSON-object for details)
                     */
                    constructor(text?: any|geotoolkit.scene.shapes.Text);
                    /**
                     * Gets iterator over filtered features
                     * @param iterator  (Required) input features iterator
                     * @param context  (Required) rendering context
                     * @param layer  (Required) feature layer
                     */
                    filterFeatures(iterator: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext, layer: geotoolkit.map.layers.AbstractFeatureLayer): geotoolkit.util.Iterator;
                    /**
                     * Resets itself
                     */
                    reset(): this;
                }
                /**
                 * BiggestGeometry filters out feature parts with the biggest geometry (for Multi-features only).
                 */
                class BiggestGeometry implements geotoolkit.map.features.filters.IFilter {
                    /**
                     * BiggestGeometry filters out feature parts with the biggest geometry (for Multi-features only).
                     */
                    constructor();
                    /**
                     * Gets iterator over filtered features
                     * @param iterator  (Required) input features iterator
                     * @param context  (Required) rendering context
                     * @param layer  (Required) feature layer
                     */
                    filterFeatures(iterator: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext, layer: geotoolkit.map.layers.AbstractFeatureLayer): geotoolkit.util.Iterator;
                    /**
                     * Resets itself
                     */
                    reset(): this;
                }
                /**
                 * ByType filters out all features that are not featureType(s) instances.
                 */
                class ByType implements geotoolkit.map.features.filters.IFilter {
                    /**
                     * ByType filters out all features that are not featureType(s) instances.
                     * @param featureType  (Required) feature type(s) to pass
                     */
                    constructor(featureType: Function|Function[]);
                    /**
                     * Gets iterator over filtered features
                     * @param iterator  (Required) input features iterator
                     * @param context  (Required) rendering context
                     * @param layer  (Optional) feature layer (not used)
                     */
                    filterFeatures(iterator: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext, layer?: geotoolkit.map.layers.AbstractFeatureLayer): geotoolkit.util.Iterator;
                    /**
                     * Resets itself (the implementation does nothing)
                     */
                    reset(): this;
                }
                /**
                 * EvenOddGeometry filters features' geometries that are inside the others using even-odd algorithm ('holes' do not pass)
                 */
                class EvenOddGeometry implements geotoolkit.map.features.filters.IFilter {
                    /**
                     * EvenOddGeometry filters features' geometries that are inside the others using even-odd algorithm ('holes' do not pass)
                     */
                    constructor();
                    /**
                     * Gets iterator over filtered features
                     * @param iterator  (Required) input features iterator
                     * @param context  (Required) rendering context
                     * @param layer  (Required) feature layer
                     */
                    filterFeatures(iterator: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext, layer: geotoolkit.map.layers.AbstractFeatureLayer): geotoolkit.util.Iterator;
                    /**
                     * Resets itself
                     */
                    reset(): this;
                }
                /**
                 * NoAnnotationOverlap filters out geometries with overlapped annotations.<br>
                 * If two or more annotations overlap each other, then only one with the biggest geometry is shown
                 */
                class NoAnnotationOverlap implements geotoolkit.map.features.filters.IFilter {
                    /**
                     * NoAnnotationOverlap filters out geometries with overlapped annotations.<br>
                     * If two or more annotations overlap each other, then only one with the biggest geometry is shown
                     * @param text  (Optional) JSON-object or text shape instance
(see {@link geotoolkit.scene.shapes.Text} constructor JSON-object for details)
                     * @param ignoreTypes  (Optional) feature types that should be passed without filtering
                     */
                    constructor(text?: any|geotoolkit.scene.shapes.Text, ignoreTypes?: any[]);
                    /**
                     * Gets iterator over filtered features
                     * @param iterator  (Required) input features iterator
                     * @param context  (Required) rendering context
                     * @param layer  (Required) feature layer
                     */
                    filterFeatures(iterator: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext, layer: geotoolkit.map.layers.AbstractFeatureLayer): geotoolkit.util.Iterator;
                    /**
                     * Resets itself
                     */
                    reset(): this;
                }
                /**
                 * VisibilityArea can be applied to the Point features only. It filters out:<br>
                 * 1. features outside of canvas rendering area<br>
                 * 2. overlapped map features (optionally)<br>
                 * 3. Non-point like features<br>
                 * The filter assumes feature geometries having 'x' and 'y' components to use as anchored shape anchor.
                 */
                class VisibilityArea implements geotoolkit.map.features.filters.IFilter {
                    /**
                     * VisibilityArea can be applied to the Point features only. It filters out:<br>
                     * 1. features outside of canvas rendering area<br>
                     * 2. overlapped map features (optionally)<br>
                     * 3. Non-point like features<br>
                     * The filter assumes feature geometries having 'x' and 'y' components to use as anchored shape anchor.
                     * @param shape  (Required) anchored shape as a template
                     * @param options  (Optional) options (see "setOptions" method for details)
                     * @param options.nooverlap  (Optional) "No overlapping Features allowed" flag
                     */
                    constructor(shape: geotoolkit.scene.shapes.AnchoredShape, options?: any | { nooverlap?: boolean; } );
                    /**
                     * Sets options
                     * @param options  (Optional) options
                     * @param options.nooverlap  (Optional) "No overlapping Features allowed" flag
                     */
                    setOptions(options?: any | { nooverlap?: boolean; } ): this;
                    /**
                     * Gets options
                     */
                    getOptions(): any;
                    /**
                     * Gets iterator over filtered features
                     * @param iterator  (Required) input features iterator
                     * @param context  (Required) rendering context
                     * @param layer  (Optional) feature layer (not used)
                     */
                    filterFeatures(iterator: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext, layer?: geotoolkit.map.layers.AbstractFeatureLayer): geotoolkit.util.Iterator;
                    /**
                     * Resets itself
                     */
                    reset(): this;
                }
                /**
                 * Features rendering filter interface
                 */
                interface IFilter {
                    /**
                     * Gets iterator over filtered features
                     * @param iterator  (Required) input features iterator
                     * @param context  (Required) rendering context
                     * @param layer  (Required) feature layer
                     */
                    filterFeatures(iterator: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext, layer: geotoolkit.map.layers.AbstractFeatureLayer): geotoolkit.util.Iterator;
                    /**
                     * Resets itself
                     */
                    reset(): this;
                }
            }
            module adapters {
                /**
                 * Calculates geometry center and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
                 */
                class Center implements geotoolkit.map.features.adapters.IGeometryToText {
                    /**
                     * Calculates geometry center and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
                     * @param mode  (Optional) geometry center to anchor mode
                     */
                    constructor(mode?: geotoolkit.map.features.adapters.Center.Mode);
                    /**
                     * Enum for GeometryToText modes
                     */
                    static Mode: any;
                    /**
                     * Calculates geometry center and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
                     * @param geometry  (Required) feature geometry
                     * @param geometry.x  (Required) array of x-ordinates
                     * @param geometry.y  (Required) array of y-ordinates
                     * @param text  (Required) text shape to set the anchor on
                     * @param context  (Required) rendering context
                     */
                    apply(geometry: any | { x?: number[]; y?: number[]; } , text?: geotoolkit.scene.shapes.Text, context?: geotoolkit.renderer.RenderingContext): any;
                }
                /**
                 * Calculates right edge point of geometry and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
                 */
                class Edge implements geotoolkit.map.features.adapters.IGeometryToText {
                    /**
                     * Calculates right edge point of geometry and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
                     * @param options  (Optional) options
                     * @param options.offset  (Optional) anchor offset
                     * @param options.offset.x  (Optional) x-offset
                     * @param options.offset.y  (Optional) y-offset
                     */
                    constructor(options?: any | { offset?: any | { x?: number; y?: number; } ; } );
                    /**
                     * Sets feature_geometry-to-text_anchor_position offset options. For the new options to take effect on layer, the layer has to be invalidated.
                     * @param options  (Required) options
                     * @param options.offset  (Optional) offset offset options
                     * @param options.offset.x  (Optional) x-ordinate offset in device coordinates
                     * @param options.offset.y  (Optional) y-ordinate offset in device coordinates
                     */
                    setOptions(options: any | { offset?: any | { x?: number; y?: number; } ; } ): this;
                    /**
                     * Calculates right end point of polyline and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
                     * @param geometry  (Required) feature geometry
                     * @param geometry.x  (Required) array of x-ordinates
                     * @param geometry.y  (Required) array of y-ordinates
                     * @param text  (Required) text shape to set the anchor on
                     * @param context  (Required) rendering context or its transformation
                     */
                    apply(geometry: any | { x?: any[]; y?: any[]; } , text?: geotoolkit.scene.shapes.Text, context?: geotoolkit.renderer.RenderingContext|geotoolkit.util.Transformation): any;
                }
                /**
                 * Applies feature geometry's 'x' and 'y' (in Map C.S.) to {@link geotoolkit.scene.shapes.AnchoredShape} as an anchor
                 */
                class Point implements geotoolkit.map.features.adapters.IGeometryToShape,geotoolkit.map.features.adapters.IGeometryToText {
                    /**
                     * Applies feature geometry's 'x' and 'y' (in Map C.S.) to {@link geotoolkit.scene.shapes.AnchoredShape} as an anchor
                     * @param options  (Optional) options
                     * @param options.offset  (Optional) anchor offset
                     * @param options.offset.x  (Optional) x-offset
                     * @param options.offset.y  (Optional) y-offset
                     */
                    constructor(options?: any | { offset?: any | { x?: number; y?: number; } ; } );
                    /**
                     * Sets feature_geometry-to-text_anchor_position offset options. For the new options to take effect on layer, the layer has to be invalidated.
                     * @param options  (Optional) options
                     * @param options.offset  (Optional) offset offset options
                     * @param options.offset.x  (Optional) x-ordinate offset in device coordinates
                     * @param options.offset.y  (Optional) y-ordinate offset in device coordinates
                     */
                    setOptions(options?: any | { offset?: any | { x?: number; y?: number; } ; } ): this;
                    /**
                     * Applies feature geometry's 'x' and 'y' to {@link geotoolkit.scene.shapes.AnchoredShape} as an anchor
                     * @param geometry  (Required) feature geometry
                     * @param geometry.x  (Required) x-ordinate
                     * @param geometry.y  (Required) y-ordinate
                     * @param shape  (Required) shape to set the anchor on
                     * @param context  (Required) rendering context
                     */
                    apply(geometry: any | { x?: number; y?: number; } , shape?: geotoolkit.scene.Node, context?: geotoolkit.renderer.RenderingContext|geotoolkit.util.Transformation): any;
                }
                /**
                 * Applies {@link geotoolkit.map.features.LineString} LineString geometry's coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polyline}
                 */
                class LineString implements geotoolkit.map.features.adapters.IGeometryToShape {
                    /**
                     * Applies {@link geotoolkit.map.features.LineString} LineString geometry's coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polyline}
                     */
                    constructor();
                    /**
                     * Applies feature geometry's 'x' and 'y' coordinates to {@link geotoolkit.scene.shapes.Polyline} shape
                     * @param geometry  (Required) feature geometry
                     * @param geometry.x  (Required) x-coordinates
                     * @param geometry.y  (Required) y-coordinates
                     * @param polyline  (Required) polyline to set the coordinates on
                     */
                    apply(geometry: any | { x?: any[]; y?: any[]; } , polyline?: geotoolkit.scene.shapes.Polyline): any;
                }
                /**
                 * Applies feature geometry's 'x' and 'y' coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polygon}
                 */
                class Polygon implements geotoolkit.map.features.adapters.IGeometryToShape {
                    /**
                     * Applies feature geometry's 'x' and 'y' coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polygon}
                     */
                    constructor();
                    /**
                     * Applies feature geometry's 'x' and 'y' coordinates to {@link geotoolkit.scene.shapes.Polygon} shape
                     * @param geometry  (Required) feature geometry
                     * @param geometry.x  (Required) x-coordinates
                     * @param geometry.y  (Required) y-coordinates
                     * @param polygon  (Required) polygon to set the coordinates on
                     * @param context  (Required) rendering context or context transform
                     */
                    apply(geometry: any | { x?: any[]; y?: any[]; } , polygon?: geotoolkit.scene.shapes.Polygon, context?: geotoolkit.renderer.RenderingContext|geotoolkit.util.Transformation): any;
                }
                /**
                 * Applies {@link geotoolkit.map.features.LineString} or {@link geotoolkit.map.features.Polygon}
                 * geometry's coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Path}
                 */
                class Path implements geotoolkit.map.features.adapters.IGeometryToShape {
                    /**
                     * Applies {@link geotoolkit.map.features.LineString} or {@link geotoolkit.map.features.Polygon}
                     * geometry's coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Path}
                     */
                    constructor();
                    /**
                     * Applies feature geometry's 'x' and 'y' coordinates to {@link geotoolkit.scene.shapes.Path} shape
                     * @param geometry  (Required) feature geometry
                     * @param geometry.x  (Required) x-coordinates
                     * @param geometry.y  (Required) y-coordinates
                     * @param path  (Required) path to set the coordinates on
                     */
                    apply(geometry: any | { x?: any[]; y?: any[]; } , path?: geotoolkit.scene.Node): any;
                }
                /**
                 * Interface to retrieve feature geometry and apply it to {@link geotoolkit.scene.Node} shape
                 */
                interface IGeometryToShape {
                    /**
                     * Applies feature geometry to {@link geotoolkit.scene.Node} shape
                     * @param geometry  (Required) feature geometry
                     * @param shape  (Required) shape to set the geometry on
                     */
                    apply(geometry: any, shape: geotoolkit.scene.Node): any;
                }
                /**
                 * Interface to retrieve feature geometry and apply it to {@link geotoolkit.scene.shapes.Text} as an anchor
                 */
                interface IGeometryToText {
                    /**
                     * Applies feature geometry to {@link geotoolkit.scene.shapes.Text} shape
                     * @param geometry  (Required) feature geometry
                     * @param shape  (Required) text shape to set the geometry on
                     * @param context  (Required) rendering context
                     */
                    apply(geometry: any, shape: geotoolkit.scene.shapes.Text, context: geotoolkit.renderer.RenderingContext): any;
                }
                module Center {
                    /**
                     * Enum for GeometryToText modes
                     */
                    interface Mode {
                        /**
                         * Use centroid point
                         */
                        Centroid: string;
                        /**
                         * Use center of the inscribed circle with the biggest possible radius
                         */
                        Incenter: string;
                        /**
                         * Use centroid with a few iterations of circle inscribing to improve the result
                         */
                        Mixed: string;
                    }
                }
            }
            module templates {
                /**
                 * Manages {@link geotoolkit.map.features.IFeature}-to-{@link geotoolkit.scene.Node} logic used by
                 * {@link geotoolkit.map.layers.Template} class or its inheritants
                 */
                class BaseTemplate {
                    /**
                     * Manages {@link geotoolkit.map.features.IFeature}-to-{@link geotoolkit.scene.Node} logic used by
                     * {@link geotoolkit.map.layers.Template} class or its inheritants
                     * @param options  (Required) options
                     * @param options.shape  (Required) carnac shape to visualize a feature instance
                     * @param options.geometrytoshape  (Required) feature geometry to carnac shape state adapter
                     * @param options.geometrytotext  (Required) feature geometry to text shape state adapter
                     * @param options.shapecallback  (Optional) callback to modify template's shape parameter(s) dynamically (see example below)
                     */
                    constructor(options: any | { shape?: geotoolkit.scene.Node; geometrytoshape?: geotoolkit.map.features.adapters.IGeometryToShape; geometrytotext?: geotoolkit.map.features.adapters.IGeometryToText; shapecallback?: Function; } );
                    /**
                     * Gets template options
                     */
                    getOptions(): any;
                    /**
                     * Sets template options. For the new options to take effect on layer, the layer has to be invalidated.
                     * @param options  (Required) options
                     * @param options.shape  (Optional) carnac shape associated with a feature
                     * @param options.geometrytoshape  (Optional) feature_geometry-to-shape_geometry adapter
                     * @param options.geometrytotext  (Optional) feature_geometry-to-text_anchor_position adapter
                     * @param options.shapecallback  (Optional) shape callback function
                     */
                    setOptions(options: any | { shape?: geotoolkit.scene.Node; geometrytoshape?: geotoolkit.map.features.adapters.IGeometryToShape; geometrytotext?: geotoolkit.map.features.adapters.IGeometryToText; shapecallback?: Function; } ): this;
                    /**
                     * Gets {@link geotoolkit.scene.Node} carnac shape associated with a feature
                     */
                    getShape(): geotoolkit.scene.Node;
                    /**
                     * Gets feature_geometry-to-shape_geometry adapter
                     */
                    getGeometryToShape(): geotoolkit.map.features.adapters.IGeometryToShape;
                    /**
                     * Gets feature_geometry-to-text_anchor_position adapter
                     */
                    getGeometryToText(): geotoolkit.map.features.adapters.IGeometryToText;
                    /**
                     * Gets {geotoolkit.scene.shapes.Text} text shape for annotations
                     */
                    getTextShape(): geotoolkit.scene.shapes.Text;
                    /**
                     * Gets optional shape callback
                     */
                    getShapeCallback(): Function;
                }
                /**
                 * Manages {@link geotoolkit.map.features.Point}-to-{@link geotoolkit.scene.shapes.Symbol}
                 * logic used by {@link geotoolkit.map.layers.Template} class
                 */
                class Point extends geotoolkit.map.features.templates.BaseTemplate {
                    /**
                     * Manages {@link geotoolkit.map.features.Point}-to-{@link geotoolkit.scene.shapes.Symbol}
                     * logic used by {@link geotoolkit.map.layers.Template} class
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                }
                /**
                 * Manages {@link geotoolkit.map.features.LineString}-to-{@link geotoolkit.scene.shapes.Polyline}
                 * logic used by {@link geotoolkit.map.layers.Template} class
                 */
                class LineString extends geotoolkit.map.features.templates.BaseTemplate {
                    /**
                     * Manages {@link geotoolkit.map.features.LineString}-to-{@link geotoolkit.scene.shapes.Polyline}
                     * logic used by {@link geotoolkit.map.layers.Template} class
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                }
                /**
                 * Manages {@link geotoolkit.map.features.Polygon}-to-{@link geotoolkit.scene.shapes.Polygon}
                 * logic used by {@link geotoolkit.map.layers.Template} class
                 */
                class Polygon extends geotoolkit.map.features.templates.BaseTemplate {
                    /**
                     * Manages {@link geotoolkit.map.features.Polygon}-to-{@link geotoolkit.scene.shapes.Polygon}
                     * logic used by {@link geotoolkit.map.layers.Template} class
                     * @param options  (Optional) options
                     */
                    constructor(options?: any);
                }
                /**
                 * Manages {@link geotoolkit.map.features.Aggregation}-to-{@link geotoolkit.scene.shapes.Symbol}
                 * logic used by {@link geotoolkit.map.layers.Template} class
                 */
                class Aggregation extends geotoolkit.map.features.templates.BaseTemplate {
                    /**
                     * Manages {@link geotoolkit.map.features.Aggregation}-to-{@link geotoolkit.scene.shapes.Symbol}
                     * logic used by {@link geotoolkit.map.layers.Template} class
                     * @param options  (Required) template options
                     * @param options.shape  (Optional) carnac shape to visualize aggregation feature
                     * @param options.expandedshape  (Optional) carnac shape to visualize
expanded aggregation feature (if geotoolkit.map.tools.AggregationSelection tool is used)
                     * @param options.colorprovider  (Optional) color provider to change shape fill color depending on
aggregation size (number of points aggregated)
                     * @param options.expandedcolorprovider  (Optional) color provider to change shape fill color depending on
expanded aggregation level (0 for root, 1 for its children, etc.)
                     * @param options.expandedline  (Optional) line to connect expanded aggregation with its child (set visible false if no needed)
                     */
                    constructor(options: any | { shape?: geotoolkit.scene.shapes.AnchoredShape; expandedshape?: geotoolkit.scene.shapes.AnchoredShape; colorprovider?: geotoolkit.util.ColorProvider; expandedcolorprovider?: geotoolkit.util.ColorProvider; expandedline?: geotoolkit.scene.shapes.Line; } );
                    /**
                     * Sets template options. For the new options to take effect on layer, the layer has to be invalidated.
                     * @param options  (Required) options
                     * @param options.shape  (Optional) carnac shape associated with a feature
                     * @param options.geometrytoshape  (Optional) feature_geometry-to-shape_geometry adapter
                     * @param options.geometrytotext  (Optional) feature_geometry-to-text_anchor_position adapter
                     * @param options.shapecallback  (Optional) shape callback function
                     */
                    setOptions(options: any | { shape?: geotoolkit.scene.Node; geometrytoshape?: geotoolkit.map.features.adapters.IGeometryToShape; geometrytotext?: geotoolkit.map.features.adapters.IGeometryToText; shapecallback?: Function; } ): this;
                }
            }
            module sources {
                /**
                 * Provides default feature source that allows user to add and remove features directly
                 */
                class DefaultFeatureSource extends geotoolkit.util.EventDispatcher {
                    /**
                     * Provides default feature source that allows user to add and remove features directly
                     * @param from  (Required) initial coordinate system
                     * @param to  (Required) map coordinate system
                     */
                    constructor(from: geotoolkit.map.coordinatesystem.CoordinateSystem, to: geotoolkit.map.coordinatesystem.CoordinateSystem);
                }
                /**
                 * Provides FeatureSources store for centralized control and processing
                 */
                class FeatureSourceGroup extends geotoolkit.map.features.sources.DefaultFeatureSource {
                    /**
                     * Provides FeatureSources store for centralized control and processing
                     * @param sources  (Required) source(s) for storing
                     */
                    constructor(sources: geotoolkit.map.features.sources.DefaultFeatureSource|any[]);
                }
                /**
                 * Provides feature source that allows user to get features from GeoJSON files
                 */
                class GeoJSONFeatureSource extends geotoolkit.map.features.sources.DefaultFeatureSource {
                    /**
                     * Provides feature source that allows user to get features from GeoJSON files
                     * @param options  (Optional) options
                     * @param options.idfield  (Optional) field that contains the id for the features
                     * @param options.data  (Optional) GeoJSON object containing the features data
                     */
                    constructor(options?: any | { idfield?: string; data?: any; } );
                }
                /**
                 * Provides feature source that allows user to get features from ArcGIS server
                 */
                class ArcGISFeatureSource extends geotoolkit.map.features.sources.DefaultFeatureSource {
                    /**
                     * Provides feature source that allows user to get features from ArcGIS server
                     * @param options  (Optional) options
                     * @param options.server  (Optional) The ArcGIS server to get features from
                     * @param options.idfield  (Optional) field that contains the id for the features
                     * @param options.requestresolution  (Optional) a grid size for layer partitioning, that is used for server requests
                     * @param options.requestfields  (Optional) an array for requested fields. if it is not specified all fields are loaded
                     * @param options.system  (Optional) map coordinate system
                     * @param options.systemconverter  (Optional) coordinate system converter that can be used if map/server coordinate systems are not supported
                     */
                    constructor(options?: any | { server?: string; idfield?: string; requestresolution?: number; requestfields?: string[]; system?: geotoolkit.map.coordinatesystem.CoordinateSystem; systemconverter?: string; } );
                }
            }
        }
        module tools {
            /**
             * Helper class for aggregation selection
             */
            class AggregationSelection extends geotoolkit.controls.tools.Selection {
                /**
                 * Helper class for aggregation selection
                 * @param manipulatorGroup  (Required) used to display temporary shapes
                 */
                constructor(manipulatorGroup: geotoolkit.scene.Group);
                /**
                 * Sets enabled
                 * @param enabled  (Required) true, if enabled, else false
                 */
                setEnabled(enabled: boolean): this;
            }
        }
        module util {
            /**
             * ArcGIS feature templates parser
             */
            class ArcGIS {
                /**
                 * ArcGIS feature templates parser
                 */
                constructor();
                /**
                 * Creates GeoToolkit Shape-based {@link geotoolkit.map.features.IFeature} objects based on ArcGIS features
                 * @param data  (Required) ArcGIS layers data
                 * @param url  (Required) ArcGIS server url (for relative references)
                 * @param textShape  (Optional) annotations text shape
                 */
                static parse(data: any, url: string, textShape?: geotoolkit.scene.shapes.Text): geotoolkit.map.features.IFeature[];
            }
            /**
             * Defines helper methods to work with feature geometries
             */
            class Geometry {
                /**
                 * Defines helper methods to work with feature geometries
                 */
                constructor();
                /**
                 * Gets bounds for a geometry defined by arrays of x-ordinates and y-ordinates.
                 * @param geometry  (Required) feature geometry
                 * @param geometry.x  (Required) feature geometry x-ordinate(s)
                 * @param geometry.y  (Required) feature geometry x-ordinate(s)
                 */
                static getCachedGeometryBounds(geometry: any | { x?: number|any[]; y?: number|any[]; } ): geotoolkit.util.Rect;
                /**
                 * Returns true if polygon geometry is clockwise, false otherwise
                 * @param geometry  (Required) polygon geometry
                 */
                static isClockwise(geometry: any): boolean;
            }
            /**
             * This layer is a collection of geotoolkit shapes that will be displayed on a map
             * Setting the limits will change the extents of the map.
             */
            class Query {
                /**
                 * This layer is a collection of geotoolkit shapes that will be displayed on a map
                 * Setting the limits will change the extents of the map.
                 * @param options  (Required) options
                 * @param options.geometry  (Optional) spacial geometry in map coordinate system to define the query
                 * @param options.properties  (Optional) Map of properties to look for
                 * @param options.filter  (Optional) node filter that will return true to keep the element
                 */
                constructor(options: any | { geometry?: geotoolkit.util.Rect|geotoolkit.util.Point|any; properties?: any; filter?: Function; } );
                /**
                 * sets the geometry for this query
                 * @param geo  (Required) geometry
                 */
                setGeometry(geo: geotoolkit.util.Rect|geotoolkit.util.Point[]): this;
                /**
                 * sets the search properties for this query
                 * @param properties  (Required) properties
                 */
                setProperties(properties: any): this;
                /**
                 * sets the name field for this query
                 * @param name  (Required) name
                 */
                setName(name: string): this;
                /**
                 * gets the name field for this query
                 */
                getName(): string;
                /**
                 * gets the geometry for this query
                 */
                getGeometry(): geotoolkit.util.Rect|geotoolkit.util.Point[];
                /**
                 * gets the properties for this query
                 */
                getProperties(): any;
                /**
                 * sets the filter for this query
                 * @param filter  (Required) filter function
                 */
                setFilter(filter: Function): this;
                /**
                 * gets the filter for this query
                 */
                getFilter(): Function;
            }
            /**
             * Defines "Map scale" object
             */
            class MapScale extends geotoolkit.scene.shapes.AnchoredShape {
                /**
                 * Defines "Map scale" object
                 * @param options  (Optional) map scale options
                 * @param options.x  (Optional) left offset (in px)
                 * @param options.y  (Optional) top offset (in px)
                 * @param options.width  (Optional) maximum measurer width (in px)
                 * @param options.height  (Optional) scale shape height (in px)
                 * @param options.textstyle  (Optional) label text style
                 * @param options.linestyle  (Optional) measurer line style
                 * @param options.alignment  (Optional) alignment for the scale object on the map widget
                 * @param options.textalign  (Optional) alignment for the text label on the scale object
                 * @param options.tickheight  (Optional) tick height from 0 to 1 (where 1 means full shape height)
                 * @param options.metric  (Optional) is the metric system used (meters & kilometers if true, foots and miles if false)
                 */
                constructor(options?: any | { x?: number; y?: number; width?: number; height?: number; textstyle?: geotoolkit.attributes.TextStyle|string|any; linestyle?: geotoolkit.attributes.LineStyle|string|any; alignment?: geotoolkit.util.AnchorType; textalign?: geotoolkit.util.AnchorType; tickheight?: number; metric?: boolean; } );
                /**
                 * Sets scale
                 * @param scale  (Required) scale to set
                 */
                setMapScale(scale: number): this;
                /**
                 * Renders itself
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
            }
            /**
             * GeoJSON parser and converter
             */
            class GeoJSON {
                /**
                 * GeoJSON parser and converter
                 */
                constructor();
                /**
                 * Creates GeoToolkit Shape-based {@link geotoolkit.map.features.IFeature} objects based on GeoJSON features
                 * @param geoJsonFeatures  (Required) array of GeoJSON features
                 * @param iGetFeatureId  (Optional) how to retrieve feature id from geoJson feature's properties
                 * @param crsConversion  (Optional) function for converting points into the map coordinate system
                 * @param coordinateOrder  (Optional) x/y coordinate order ([1, 0] to reverse)
                 */
                static parse(geoJsonFeatures: any|any[], iGetFeatureId?: geotoolkit.map.features.strategies.IGetId, crsConversion?: Function, coordinateOrder?: any[]): geotoolkit.map.features.IFeature[];
                /**
                 * Converts GeoToolkit Shape-based {@link geotoolkit.map.features.IFeature} objects to GeoJSON format
                 * @param features  (Required) features to be converted to GeoJSON
                 * @param crsConversion  (Optional) function for converting points into the result coordinate system
                 * @param coordinateOrder  (Optional) x/y coordinate order ([1, 0] to reverse)
                 */
                static toGeoJSON(features: geotoolkit.map.features.IFeature|any[]|geotoolkit.util.Iterator, crsConversion?: Function, coordinateOrder?: any[]): any;
            }
            /**
             * KML (Keyhole Markup Language) parser
             */
            class KML {
                /**
                 * KML (Keyhole Markup Language) parser
                 */
                constructor();
                /**
                 * Creates GeoToolkit Shape-based {@link geotoolkit.map.features.IFeature} objects based on KML features
                 * @param xmlElement  (Required) DOMElement object that contains all the features data in KML format
                 * @param iGetFeatureId  (Optional) how to retrieve feature id from geoJson feature's properties
                 * @param crsConversion  (Optional) function for converting points into the map coordinate system
                 * @param invalidateHandler  (Optional) function to be called when async templates are ready to be drawn
                 * @param styles  (Optional) styles map that contains connection between style ids and feature templates
                 * @param features  (Optional) features array to store parsed features (new array created if not provided)
                 */
                static parse(xmlElement: any, iGetFeatureId?: geotoolkit.map.features.strategies.IGetId, crsConversion?: Function, invalidateHandler?: Function, styles?: any, features?: geotoolkit.map.features.IFeature[]): geotoolkit.map.features.IFeature[];
            }
            /**
             * ArcGIS Web Map layers parser
             */
            class WebMap {
                /**
                 * ArcGIS Web Map layers parser
                 */
                constructor();
                /**
                 * Loads WebMap layers from the server and adds them to the map
                 * @param map  (Required) the map widget for the result
                 * @param url  (Required) the ArcGIS WebMap server url
                 */
                static load(map: geotoolkit.map.Map, url: string): any;
                /**
                 * Sets the Bing Maps API key to use in the Webmap-created Bing layers. Get yours key at http://www.bingmapsportal.com/
                 * @param key  (Required) Bing Maps API key
                 */
                static setBingMapsKey(key: string): any;
            }
        }
        module strategies {
            class SimpleAnnotationStrategy extends geotoolkit.map.features.strategies.AnnotationById implements geotoolkit.map.strategies.IAnnotationStrategy {
                /**
                 */
                constructor();
            }
            class PropertyToAnnotation extends geotoolkit.map.features.strategies.AnnotationByAttribute implements geotoolkit.map.strategies.IAnnotationStrategy {
                /**
                 * @param propertyName  (Required) define property name to get from feature for visualization
                 */
                constructor(propertyName: string);
            }
            /**
             * Annotation strategy interface
             */
            interface IAnnotationStrategy {
            }
        }
        module coordinatesystem {
            class CoordinateSystem {
                /**
                 * @param options  (Required) options to specify coordinate system.
                 * @param options.name  (Required) name of the coordinate system.
                 * @param options.units  (Required) units of the coordinate system.
                 * @param options.limits  (Required) the default minimal rectangular bounding region that will entirely contain
this CoordinateSystem (approximately)
                 */
                constructor(options: any | { name?: string; units?: string|string[]; limits?: geotoolkit.util.Rect; } );
            }
            class CoordinateSystemRegistry {
                /**
                 */
                constructor();
            }
            /**
             * This class specifies the Geographical coordinate system with datum WGS84 where longitude is x-axis and latitude is y-axis
             */
            class GeographicCoordinateSystem extends geotoolkit.map.coordinatesystem.CoordinateSystem {
                /**
                 * This class specifies the Geographical coordinate system with datum WGS84 where longitude is x-axis and latitude is y-axis
                 */
                constructor();
            }
            /**
             * Based on Geographic/UTM Coordinate Converter
             */
            class UTMCoordinateSystem extends geotoolkit.map.coordinatesystem.CoordinateSystem {
                /**
                 * Based on Geographic/UTM Coordinate Converter
                 * @param zone  (Required) The UTM zone in which the point lies.
                 * @param southhemi  (Required) True if the point is in the southern hemisphere; false otherwise.
                 */
                constructor(zone: number, southhemi: boolean);
            }
            /**
             * This class specifies the Web Mercator coordinate system
             */
            class WebMercator extends geotoolkit.map.coordinatesystem.CoordinateSystem {
                /**
                 * This class specifies the Web Mercator coordinate system
                 */
                constructor();
            }
            /**
             * Used to transform points from one CoordinateSystem to another.
             */
            class Transformer {
                /**
                 * Used to transform points from one CoordinateSystem to another.
                 * @param options  (Required) options to specify transformer.
                 * @param options.initialcoordinatesystem  (Required) initial coordinate system
                 * @param options.targetcoordinatesystem  (Required) target coordinate system
                 */
                constructor(options: any | { initialcoordinatesystem?: geotoolkit.map.coordinatesystem.CoordinateSystem; targetcoordinatesystem?: geotoolkit.map.coordinatesystem.CoordinateSystem; } );
            }
            /**
             * Used to transform points to lat long coordinate.
             */
            class LatLongTransformer extends geotoolkit.map.coordinatesystem.Transformer {
                /**
                 * Used to transform points to lat long coordinate.
                 * @param options  (Required) options to specify transformer.
                 * @param options.initialcoordinatesystem  (Required) initial coordinate system
                 */
                constructor(options: any | { initialcoordinatesystem?: geotoolkit.map.coordinatesystem.CoordinateSystem; } );
            }
        }
        module templates {
            /**
             * Manages {@link geotoolkit.map.features.IMapFeature}-to-{@link geotoolkit.scene.Node} logic used by
             * {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class or its inheritance
             */
            class ShapeTemplate {
                /**
                 * Manages {@link geotoolkit.map.features.IMapFeature}-to-{@link geotoolkit.scene.Node} logic used by
                 * {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class or its inheritance
                 * @param options  (Required) options
                 * @param options.shape  (Required) carnac shape to visualize a feature instance
                 * @param options.geometrytoshape  (Required) feature geometry to carnac shape state converter
                 * @param options.geometrytotext  (Required) feature geometry to text shape state converter
                 * @param options.shapecallback  (Optional) callback to modify template's shape parameter(s) dynamically (see example below)
                 */
                constructor(options: any | { shape?: geotoolkit.scene.Node; geometrytoshape?: geotoolkit.map.features.IFeatureGeometryToShape; geometrytotext?: geotoolkit.map.features.IFeatureGeometryToText; shapecallback?: Function; } );
            }
            /**
             * Manages {@link geotoolkit.map.features.PolygonMapFeature}-to-{@link geotoolkit.scene.shapes.Polygon}
             * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
             */
            class PolygonTemplate extends geotoolkit.map.templates.ShapeTemplate {
                /**
                 * Manages {@link geotoolkit.map.features.PolygonMapFeature}-to-{@link geotoolkit.scene.shapes.Polygon}
                 * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
                 */
                constructor();
            }
            /**
             * Manages {@link geotoolkit.map.features.LineStringMapFeature}-to-{@link geotoolkit.scene.shapes.Polyline}
             * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
             */
            class LineStringTemplate extends geotoolkit.map.templates.ShapeTemplate {
                /**
                 * Manages {@link geotoolkit.map.features.LineStringMapFeature}-to-{@link geotoolkit.scene.shapes.Polyline}
                 * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
                 */
                constructor();
            }
            /**
             * Manages {@link geotoolkit.map.features.PointMapFeature}-to-{@link geotoolkit.scene.shapes.Symbol}
             * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
             */
            class PointTemplate extends geotoolkit.map.templates.ShapeTemplate {
                /**
                 * Manages {@link geotoolkit.map.features.PointMapFeature}-to-{@link geotoolkit.scene.shapes.Symbol}
                 * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
                 */
                constructor();
            }
            /**
             * Manages {@link geotoolkit.map.features.AggregationMapFeature}-to-{@link geotoolkit.scene.shapes.Symbol}
             * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
             */
            class AggregationTemplate extends geotoolkit.map.templates.ShapeTemplate {
                /**
                 * Manages {@link geotoolkit.map.features.AggregationMapFeature}-to-{@link geotoolkit.scene.shapes.Symbol}
                 * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
                 */
                constructor();
            }
        }
        module Map {
            /**
             * Map Events
             */
            interface Events {
            }
        }
    }
}
