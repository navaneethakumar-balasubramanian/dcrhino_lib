/**
 * API to Define classes used to create maps, add layers and manipulate maps.
 * @namespace */
geotoolkit.map = {};
    /**
     * Enum for geodetic coordinate systems
     * @enum
     * @readonly
     */
    geotoolkit.map.GeodeticSystem = {};
        /**
         * World Geodetic System 1984
         * @type {string}
         */
        geotoolkit.map.GeodeticSystem.WGS84 = "";
        /**
         * Latitude/Longitude (Geographic) coordinate system
         * @type {string}
         */
        geotoolkit.map.GeodeticSystem.LatLon = "";
        /**
         * Universal Transverse Mercator
         * @type {string}
         */
        geotoolkit.map.GeodeticSystem.UTM = "";
        /**
         * None
         * @type {string}
         */
        geotoolkit.map.GeodeticSystem.None = "";

/**
 * Any layer data has some coordinates and there are many coordinate systems. Therefore, in order to draw different layers on one map, the data must be converted to one system. For this purpose, transformers and coordinate systems from geotoolkit.map.coordinatesystems are used. It contains information about how the coordinates are set in each case and thus can convert from one system to another.
 * @namespace */
geotoolkit.map.coordinatesystems = {};
    /**
     * Enum for axis directions
     * @enum
     * @readonly
     */
    geotoolkit.map.coordinatesystems.AxisDirection = {};
        /**
         * North
         * @type {string}
         */
        geotoolkit.map.coordinatesystems.AxisDirection.North = "";
        /**
         * South
         * @type {string}
         */
        geotoolkit.map.coordinatesystems.AxisDirection.South = "";
        /**
         * West
         * @type {string}
         */
        geotoolkit.map.coordinatesystems.AxisDirection.West = "";
        /**
         * East
         * @type {string}
         */
        geotoolkit.map.coordinatesystems.AxisDirection.East = "";

/**
 * classes defining map features
 * @namespace */
geotoolkit.map.features = {};
    /**
     * Features query mode (the way to calculate requesting area) for the Vector sources
     * @enum
     * @readonly
     */
    geotoolkit.map.features.QueryMode = {};
        /**
         * Query all features with a single request
         * @type {string}
         */
        geotoolkit.map.features.QueryMode.All = "";
        /**
         * Query features based on the visible bounding box
         * @type {string}
         */
        geotoolkit.map.features.QueryMode.Bbox = "";
        /**
         * Query features using 256x256px tiles
         * @type {string}
         */
        geotoolkit.map.features.QueryMode.Tile = "";
        /**
         * Query features using grid cells
         * @type {string}
         */
        geotoolkit.map.features.QueryMode.Grid = "";

/** @namespace */
geotoolkit.map.features.adapters = {};

/** @namespace */
geotoolkit.map.features.converters = {};
    /**
     * Feature converters events.
     * @enum
     * @readonly
     */
    geotoolkit.map.features.converters.Events = {};

/** @namespace */
geotoolkit.map.features.filters = {};

/**
 * The sources allows user to get data from the a server, file etc. Every layer has one or more data source — feature, tile or image. The data obtained from different places can be displayed and processed on a single layer.
 * @namespace */
geotoolkit.map.sources = {};
    /**
     * Feature sources events.
     * @enum
     * @readonly
     */
    geotoolkit.map.sources.Events = {};
        /**
         * Feature added (Vector source only)
         * @type {string}
         */
        geotoolkit.map.sources.Events.FeatureAdded = "";
        /**
         * Feature removed (Vector source only)
         * @type {string}
         */
        geotoolkit.map.sources.Events.FeatureRemoved = "";
        /**
         * All features cleared (Vector source only)
         * @type {string}
         */
        geotoolkit.map.sources.Events.FeaturesCleared = "";
        /**
         * Image Loaded (Image source only)
         * @type {string}
         */
        geotoolkit.map.sources.Events.ImageLoaded = "";
        /**
         * Image Cleared (Image source only)
         * @type {string}
         */
        geotoolkit.map.sources.Events.ImageCleared = "";
        /**
         * Tiles Updated (Tile source only)
         * @type {string}
         */
        geotoolkit.map.sources.Events.TilesUpdated = "";
        /**
         * Info Updated
         * @type {string}
         */
        geotoolkit.map.sources.Events.InfoUpdated = "";

/** @namespace */
geotoolkit.map.sources.connectors = {};

/** @namespace */
geotoolkit.map.sources.formats = {};

/** @namespace */
geotoolkit.map.sources.loaders = {};

/**
 * classes defining attributes calculation strategies, e.g. for annotation
 * @namespace */
geotoolkit.map.features.strategies = {};

/**
 * @namespace */
geotoolkit.map.features.formatters = {};

/**
 * classes defining map templates
 * @namespace */
geotoolkit.map.features.templates = {};

/**
 * classes defining different map layers
 * There are four main types of layers: Image, Tile, Vector and Shape. All classes for layer types are shown below.
 * @namespace */
geotoolkit.map.layers = {};

/** @namespace */
geotoolkit.map.layers.filters = {};

/**
 * classes defining utility classes in maps
 * @namespace */
geotoolkit.map.util = {};

/**
 * classes defining tools classes in maps
 * @namespace */
geotoolkit.map.tools = {};

/**
 * Any layer data has some coordinates, for example: From where to draw a picture for a Image layer, or feature coordinates for Vector layers. There is no single agreement which coordinate system to use and there are thousands of different coordinate systems. <br>
 * Therefore, to draw different layers on one map, the data must be converted to one system. For this purpose, transformers and coordinate systems from the geotoolkit.map.coordinatesystems are used. <br>
 * They contain information about how the coordinates are set in each case and thus can convert from one system to another. This class specifies the generalized coordinate system.
 * @class geotoolkit.map.coordinatesystems.AbstractSystem
 * @param {object} options options to specify coordinate system.
 * @param {string} options.name name of the coordinate system.
 * @param {string | Array<string>} options.units units of the coordinate system.
 * @param {geotoolkit.util.Rect} options.limits the default minimal rectangular bounding region that will entirely contain
 * @param {number} [options.epsg] epsg code of coordinate system
 * this AbstractSystem (approximately)
 */
geotoolkit.map.coordinatesystems.AbstractSystem = {};
    /**
     * Return a name of the coordinate system
     * @returns {string}
     */
    geotoolkit.map.coordinatesystems.AbstractSystem.prototype.getName = function(){};
    /**
     * Return units of the coordinate system
     * @returns {string | Array<string>}
     */
    geotoolkit.map.coordinatesystems.AbstractSystem.prototype.getUnits = function(){};
    /**
     * Return epsg code of the coordinate system
     * @returns {number} epsg code
     */
    geotoolkit.map.coordinatesystems.AbstractSystem.prototype.getEpsgCode = function(){};
    /**
     * Return transformer for initial coordinate system
     * @param {geotoolkit.map.coordinatesystems.AbstractSystem} system initial coordinate system
     * @returns {geotoolkit.map.coordinatesystems.Transformer}
     */
    geotoolkit.map.coordinatesystems.AbstractSystem.prototype.getTransformer = function(system){};
    /**
     * Return if vertical axis goes up
     * @returns {boolean}
     */
    geotoolkit.map.coordinatesystems.AbstractSystem.prototype.isVerticalAxisUp = function(){};
    /**
     * Gets the default minimal rectangular bounding region that will entirely contain
     * this AbstractSystem (approximately). A CSR is an arbitrary complex closed
     * region that touches the rectangular extent at least once on all four sides.
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.map.coordinatesystems.AbstractSystem.prototype.getDefaultModelLimits = function(){};
    /**
     * Transforms the specified coordinate to projection from lat / lng
     * @function
     * @abstract
     * @param {number} lon long
     * @param {number} lat lat
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.AbstractSystem.prototype.transform = function(lon, lat, dst){};
    /**
     * Return transformed point to lat / lng from projection
     * @function
     * @abstract
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.AbstractSystem.prototype.inverseTransform = function(x, y, dst){};
    /**
     * Get AbstractSystem from string identifier or inheritor
     *
     * @param {string | geotoolkit.map.coordinatesystems.AbstractSystem} object object can be identifier or inheritor
     * @returns {geotoolkit.map.coordinatesystems.AbstractSystem | null}
     */
    geotoolkit.map.coordinatesystems.AbstractSystem.fromObject = function(object){};

/**
 * This class provides registry of coordinate systems.
 * @class geotoolkit.map.coordinatesystems.Registry
 */
geotoolkit.map.coordinatesystems.Registry = {};
    /**
     * Returns coordinate system by the name
     * @param {string | number} name name of the coordinate system or epsg code or WKT string
     * @returns {geotoolkit.map.coordinatesystems.AbstractSystem}
     */
    geotoolkit.map.coordinatesystems.Registry.prototype.getCoordinateSystem = function(name){};
    /**
     * Registers a new coordinate system
     *
     * @param {geotoolkit.map.coordinatesystems.AbstractSystem} system a new coordinate system
     * @returns {geotoolkit.map.coordinatesystems.Registry} this
     */
    geotoolkit.map.coordinatesystems.Registry.prototype.registerCoordinateSystem = function(system){};
    /**
     * Returns singleton instance of the coordinate system registry
     * @returns {geotoolkit.map.coordinatesystems.Registry}
     */
    geotoolkit.map.coordinatesystems.Registry.getDefault = function(){};

/**
 * This class specifies the Geographic (lat/lon) coordinate system with datum WGS84 where longitude is x-axis and latitude is y-axis
 *
 * @class geotoolkit.map.coordinatesystems.LatLon
 * @param {number} [epsg] epsg epsg
 * @augments geotoolkit.map.coordinatesystems.AbstractSystem
 */
geotoolkit.map.coordinatesystems.LatLon = {};
    /**
     * Gets a transformer from initial coordinate system to the current coordinate system.
     * @override
     * @param {geotoolkit.map.coordinatesystems.AbstractSystem} system initial coordinate system
     * @returns {geotoolkit.map.coordinatesystems.LatLonTransformer}
     */
    geotoolkit.map.coordinatesystems.LatLon.prototype.getTransformer = function(system){};
    /**
     * Transforms the specified coordinate to projection from lat / lng
     * @param {number} lon long
     * @param {number} lat lat
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.LatLon.prototype.transform = function(lon, lat, dst){};
    /**
     * Return transformed point to lat / lng from projection
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.LatLon.prototype.inverseTransform = function(x, y, dst){};

/**
 * Based on Geographic/UTM (Universal Transverse Mercator) Coordinate Converter
 *
 * @class geotoolkit.map.coordinatesystems.UTM
 * @augments geotoolkit.map.coordinatesystems.AbstractSystem
 * @param {number | object} zone - The UTM zone in which the point lies.
 * @param {boolean} southhemi - True if the point is in the southern hemisphere; false otherwise.
 * @example
 * // 1).
 * // To calculate a line n(x,y) meter away from particular latitude and longitude…..where x is distance towards east west, y is distance towards north south
 * var system = new geotoolkit.map.coordinatesystems.UTM(15, false); // 15 UTM zone, north hemisphere ('true' for southern)
 * var origin = system.transform(-95.388718, 29.716131); // your lat/lon origin, Houston coordinates here
 * var coordsX = [100, -200, 300]; // your coordinates in meters from the 'origin' lat/long point
 * var newX = coordsX.map(function (x) {
 * return x + origin.getX(); // shifting relative to the initial point
 * });
 * ... // same for the Y coordinates
 * var polygon = new geotoolkit.scene.shapes.Polygon({ // Your polygon to draw
 * x: newX,
 * y: newY
 * });
 * // To find the distance between the two lat/long points only by transforming them to UTM:
 * var system = new geotoolkit.map.coordinatesystems.UTM(18, false);
 * var point1 = system.transform(-77.009003, 38.889931); // Washington
 * var point2 = system.transform(-75.165222, 39.952583); // Philadelphia
 * geotoolkit.util.Point.getDistance(point1, point2); // 197744 meters
 * // You can also use the 'system' property in map layers for automatic conversion from one coordinate system to another
 * @example
 * // 2). To calculate the UTM zone dynamically:
 * var lat = 29.761993, lon = -95.366302; // your latitude/longitude for the origin point
 * var zone = Math.floor((lon + 180) / 6) % 60 + 1; // formula for UTM zone
 * var southern = (lat < 0); // calculate hemishere
 * var system = new geotoolkit.map.coordinatesystems.UTM(zone, southern); // create system for the point
 * var point1 = system.transform(lon, lat); // transform point to UTM
 * var point2 = new geotoolkit.util.Point(point1.x + dx, point1.y + dy); // dx, dy - distance between point1 & point2 in meters
 * system.inverseTransform(point2.x, point2.y, point2); // transform 'point2' back to lat/long coordinate system
 */
geotoolkit.map.coordinatesystems.UTM = {};
    /**
     * Transforms the specified coordinate to projection from lat / lon
     * @param {number} lon long
     * @param {number} lat lat
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.UTM.prototype.transform = function(lon, lat, dst){};
    /**
     * @returns {number} the current zone
     */
    geotoolkit.map.coordinatesystems.UTM.prototype.getZone = function(){};
    /**
     * Sets the current zone
     * @param {number} zone current zone
     * @returns {geotoolkit.map.coordinatesystems.UTM} this
     */
    geotoolkit.map.coordinatesystems.UTM.prototype.setZone = function(zone){};
    /**
     * Set southern or northern hemisphere
     * @param {boolean} southhemi true if southern
     * @returns {geotoolkit.map.coordinatesystems.UTM} this
     */
    geotoolkit.map.coordinatesystems.UTM.prototype.setSouthernHemisphere = function(southhemi){};
    /**
     * Return true if it is southern hemisphere
     * @returns {boolean}
     */
    geotoolkit.map.coordinatesystems.UTM.prototype.isSouthernHemisphere = function(){};
    /**
     * Return transformed point to lat / lng from projection
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.UTM.prototype.inverseTransform = function(x, y, dst){};

/**
 * This class specifies the Web Mercator coordinate system
 *
 * @class geotoolkit.map.coordinatesystems.WebMercator
 * @param {number} [epsg] epsg code of coordinate system
 * @augments geotoolkit.map.coordinatesystems.AbstractSystem
 */
geotoolkit.map.coordinatesystems.WebMercator = {};
    /**
     * Transforms the specified coordinate to projection from lat / lng
     * @param {number} lon long
     * @param {number} lat lat
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.WebMercator.prototype.transform = function(lon, lat, dst){};
    /**
     * Return transformed point to lat / lng from projection
     * @param {number} mercatorX x coordinate
     * @param {number} mercatorY y coordinate
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.WebMercator.prototype.inverseTransform = function(mercatorX, mercatorY, dst){};

/**
 * Based on WKT converter, can use parameters spheroid, towgs84, primem
 *
 * @class geotoolkit.map.coordinatesystems.WKT
 * @augments geotoolkit.map.coordinatesystems.AbstractSystem
 * @param {object} [options] options
 * @param {number[]} [options.spheroid] spheroid
 * @param {number[]} [options.towgs84] towgs84
 * @param {number} [options.primem] prime meridian
 * @param {geotoolkit.util.AbstractUnit | string} [options.spheroidunits] spheroid units
 * @param {geotoolkit.map.coordinatesystems.AxisDirection[]} [options.axis] axis directions
 * @param {number} [options.zone] UTM zone
 * @param {boolean} [options.southhemi] true, if it is south hemisphere, false, if north
 * @param {number} [options.standartparallel1] sp1 latitude
 * @param {number} [options.standartparallel2] sp2 latitude
 * @param {number} [options.latitudeoforigin] origin latitude
 * @param {number} [options.centralmeridian] origin longitude
 * @param {number} [options.falseeasting] false easting
 * @param {number} [options.falsenorthing] false northing
 * @param {number} [options.scalefactor] scale
 */
geotoolkit.map.coordinatesystems.WKT = {};
    /**
     * Transforms the specified coordinate to projection from lat / lng
     * @override
     * @param {number} lon long
     * @param {number} lat lat
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.WKT.prototype.transform = function(lon, lat, dst){};
    /**
     * Return transformed point to lat / lng from projection
     * @override
     * @param {number} mercatorX x coordinate
     * @param {number} mercatorY y coordinate
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.WKT.prototype.inverseTransform = function(mercatorX, mercatorY, dst){};
    /**
     * Gets spheroid
     * @returns {number[]} spheroid
     */
    geotoolkit.map.coordinatesystems.WKT.prototype.getSpheroid = function(){};
    /**
     * Gets toWGS84
     * @returns {number[]} toWGS84
     */
    geotoolkit.map.coordinatesystems.WKT.prototype.getToWGS84 = function(){};
    /**
     * Gets prime meridian
     * @returns {number} prime meridian
     */
    geotoolkit.map.coordinatesystems.WKT.prototype.getPrimeMeridian = function(){};
    /**
     * Gets spheroid units
     * @returns {geotoolkit.util.AbstractUnit} spheroid units
     */
    geotoolkit.map.coordinatesystems.WKT.prototype.getSpheroidUnits = function(){};
    /**
     * Parses Well-Known text projection representation into WKT coordinate system
     * @param {string} str WKT text
     * @returns {null|geotoolkit.map.coordinatesystems.WKT}
     */
    geotoolkit.map.coordinatesystems.WKT.parse = function(str){};

/**
 * Used to transform points from one CoordinateSystem to another.
 *
 * @class geotoolkit.map.coordinatesystems.Transformer
 * @param {object} options options to specify transformer.
 * @param {geotoolkit.map.coordinatesystems.AbstractSystem|string} options.initialcoordinatesystem initial coordinate system
 * @param {geotoolkit.map.coordinatesystems.AbstractSystem|string} options.targetcoordinatesystem target coordinate system
 * @example
 * // transform points from one CoordinateSystem to another.
 * var toMercator = new geotoolkit.map.coordinatesystems.Transformer({
 * 'initialcoordinatesystem': new geotoolkit.map.coordinatesystems.LatLon(),
 * 'targetcoordinatesystem': new geotoolkit.map.coordinatesystems.WebMercator()
 * });
 * toMercator.transform(new geotoolkit.util.Point(longitude, latitude));
 */
geotoolkit.map.coordinatesystems.Transformer = {};
    /**
     * Returns transformed point, rectangle or polygonal geometry object
     * @param {geotoolkit.util.Point|geotoolkit.util.Rect|object} source origin to be transformed
     * @param {geotoolkit.util.Point|geotoolkit.util.Rect|object} [dst] optional destination object
     * @returns {geotoolkit.util.Point|geotoolkit.util.Rect|object}
     */
    geotoolkit.map.coordinatesystems.Transformer.prototype.transform = function(source, dst){};
    /**
     * Returns transformed point
     * @param {geotoolkit.util.Point} point to transform
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.Transformer.prototype.transformPoint = function(point, dst){};
    /**
     * Returns transformed rectangle
     * @param {geotoolkit.util.Rect} rect rectangle to transform
     * @param {geotoolkit.util.Rect} [dst] optional destination rectangle
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.map.coordinatesystems.Transformer.prototype.transformRect = function(rect, dst){};
    /**
     * Returns transformed polygonal geometry object
     * @param {object} geometry polygonal geometry object to transform
     * @param {number[]} geometry.x x-ordinates to be transformed
     * @param {number[]} geometry.y y-ordinates to be transformed
     * @param {object} [dst] optional destination geometry
     * @returns {object}
     */
    geotoolkit.map.coordinatesystems.Transformer.prototype.transformPolygon = function(geometry, dst){};
    /**
     * Sets initial coordinate system
     * @param {string|geotoolkit.map.coordinatesystems.AbstractSystem} system initial coordinate system
     * @returns {geotoolkit.map.coordinatesystems.Transformer} this
     */
    geotoolkit.map.coordinatesystems.Transformer.prototype.setInitialCoordinateSystem = function(system){};
    /**
     * Gets initial coordinate system
     * @returns {geotoolkit.map.coordinatesystems.AbstractSystem}
     */
    geotoolkit.map.coordinatesystems.Transformer.prototype.getInitialCoordinateSystem = function(){};
    /**
     * Sets target coordinate system
     * @param {string|geotoolkit.map.coordinatesystems.AbstractSystem} system target coordinate system
     * @returns {geotoolkit.map.coordinatesystems.Transformer} this
     */
    geotoolkit.map.coordinatesystems.Transformer.prototype.setTargetCoordinateSystem = function(system){};
    /**
     * Gets target coordinate system
     * @returns {geotoolkit.map.coordinatesystems.AbstractSystem}
     */
    geotoolkit.map.coordinatesystems.Transformer.prototype.getTargetCoordinateSystem = function(){};

/**
 * Used to transform points to lat/lon coordinate system.
 *
 * @class geotoolkit.map.coordinatesystems.LatLonTransformer
 * @augments geotoolkit.map.coordinatesystems.Transformer
 * @param {object} options options to specify transformer.
 * @param {geotoolkit.map.coordinatesystems.AbstractSystem} options.initialcoordinatesystem initial coordinate system
 */
geotoolkit.map.coordinatesystems.LatLonTransformer = {};
    /**
     * Return transformed point
     * @param {geotoolkit.util.Point} point to transform
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.coordinatesystems.LatLonTransformer.prototype.transform = function(point, dst){};

/**
 * The map feature interface IFeature shows the basic properties that any feature should have.
 * @interface
 */
geotoolkit.map.features.IFeature = {};
    /**
     * Gets ID <br>
     * Id is a unique identifier of the feature, usually one of the attributes. It is used to simplify settings for the user, as a default 'annotation' (text info) for the feature.
     * @function
     * @abstract
     * @returns {number|string} ID
     */
    geotoolkit.map.features.IFeature.prototype.getId = function(){};
    /**
     * Gets attributes (non-spatial properties) <br>
     * Attributes are some additional (non-spatial) properties. These attributes can be written as a text next to the feature itself for more information for the user.<br>
     * @function
     * @abstract
     * @returns {object} attributes
     */
    geotoolkit.map.features.IFeature.prototype.getAttributes = function(){};
    /**
     * Gets geometry. Geometry is the place, where the feature should be rendered. It is point coordinates for a point feature or a points array for polygons and polylines.
     * @function
     * @abstract
     * @param {boolean} [isMapCS==false] Map coordinate system flag
     * @returns {object} geometry
     */
    geotoolkit.map.features.IFeature.prototype.getGeometry = function(isMapCS){};

/**
 * Abstract map feature class. Feature must have an ID (unique within a layer it's contained in) and geometry;<br>
 * may have set of attributes (non-spatial properties)
 *
 * @class geotoolkit.map.features.AbstractFeature
 * @implements geotoolkit.map.features.IFeature
 *
 * @param {object} options options
 * @param {!number|string} options.id ID
 * @param {!object} options.geometry geometry
 * @param {?object} [options.attributes] attributes (non-spatial properties)
 */
geotoolkit.map.features.AbstractFeature = {};
    /**
     * Gets ID
     *
     * @returns {number|string} ID
     */
    geotoolkit.map.features.AbstractFeature.prototype.getId = function(){};
    /**
     * Gets geometry
     *
     * @param {boolean} [isMapCS=false] Map coordinate system flag
     * @returns {?object} geometry
     */
    geotoolkit.map.features.AbstractFeature.prototype.getGeometry = function(isMapCS){};
    /**
     * Gets attributes (non-spatial properties)
     *
     * @returns {?object} attributes
     */
    geotoolkit.map.features.AbstractFeature.prototype.getAttributes = function(){};
    /**
     * Applies Map coordinate system to itself
     * @function
     * @abstract
     * @param {!geotoolkit.map.layers.AbstractLayer} layer map layer to use for coordinate system conversion
     * @returns {geotoolkit.map.features.AbstractFeature} this
     */
    geotoolkit.map.features.AbstractFeature.prototype.applyMapCS = function(layer){};

/**
 * Point map feature implementation.
 *
 * @class geotoolkit.map.features.Point
 * @augments geotoolkit.map.features.AbstractFeature
 *
 * @param {object} options options
 * @param {!number|string} options.id ID
 * @param {!object} options.geometry geometry
 * @param {!number} options.geometry.x x-ordinate
 * @param {!number} options.geometry.y y-ordinate
 * @param {?object} [options.attributes] attributes (non-spatial properties)
 */
geotoolkit.map.features.Point = {};
    /**
     * Applies Map coordinate system to itself
     *
     * @param {!geotoolkit.map.layers.AbstractLayer} layer map layer to use for coordinate system conversion
     * @returns {geotoolkit.map.features.Point} this
     */
    geotoolkit.map.features.Point.prototype.applyMapCS = function(layer){};

/**
 * Multi-point map feature implementation.
 *
 * @class geotoolkit.map.features.MultiPoint
 * @augments geotoolkit.map.features.AbstractFeature
 *
 * @param {object} options options
 * @param {!number|string} options.id ID
 * @param {!Array} options.geometry feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.Point}'s geometry
 * @param {?object} [options.attributes] attributes (non-spatial properties)
 */
geotoolkit.map.features.MultiPoint = {};
    /**
     * Applies Map coordinate system to itself
     *
     * @param {!geotoolkit.map.layers.AbstractLayer} layer map layer to use for coordinate system conversion
     * @returns {geotoolkit.map.features.MultiPoint} this
     */
    geotoolkit.map.features.MultiPoint.prototype.applyMapCS = function(layer){};

/**
 * Line string (or "polyline") map feature implementation.
 *
 * @class geotoolkit.map.features.LineString
 * @augments geotoolkit.map.features.AbstractFeature
 *
 * @param {object} options line and map feature options
 * @param {!number|string} options.id feature ID
 * @param {!object} options.geometry feature geometry
 * @param {!Array} options.geometry.x array of x-coordinates
 * @param {!Array} options.geometry.y array of y-coordinates
 * @param {?object} [options.attributes] feature attributes (non-spatial properties)
 */
geotoolkit.map.features.LineString = {};
    /**
     * Applies Map coordinate system to itself
     *
     * @param {!geotoolkit.map.layers.AbstractLayer} layer map layer to use for coordinate system conversion
     * @returns {geotoolkit.map.features.LineString} this
     */
    geotoolkit.map.features.LineString.prototype.applyMapCS = function(layer){};

/**
 * Multi line string map feature implementation.
 *
 * @class geotoolkit.map.features.MultiLineString
 * @augments geotoolkit.map.features.AbstractFeature
 *
 * @param {object} options feature options
 * @param {!number|string} options.id feature ID
 * @param {!Array} options.geometry feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.LineString}'s geometry
 * @param {?object} [options.attributes] feature attributes (non-spatial properties)
 */
geotoolkit.map.features.MultiLineString = {};
    /**
     * Applies Map coordinate system to itself
     *
     * @param {!geotoolkit.map.layers.AbstractLayer} layer map layer to use for coordinate system conversion
     * @returns {geotoolkit.map.features.MultiLineString} this
     */
    geotoolkit.map.features.MultiLineString.prototype.applyMapCS = function(layer){};

/**
 * Polygon map feature implementation.
 *
 * @class geotoolkit.map.features.Polygon
 * @augments geotoolkit.map.features.AbstractFeature
 *
 * @param {object} options options
 * @param {!number|string} options.id feature ID
 * @param {!object} options.geometry feature geometry
 * @param {!Array} options.geometry.x array of x-coordinates
 * @param {!Array} options.geometry.y array of y-coordinates
 * @param {?object} [options.attributes] feature attributes (non-spatial properties)
 */
geotoolkit.map.features.Polygon = {};
    /**
     * Applies Map coordinate system to itself
     *
     * @param {!geotoolkit.map.layers.AbstractLayer} layer map layer to use for coordinate system conversion
     * @returns {geotoolkit.map.features.Polygon} this
     */
    geotoolkit.map.features.Polygon.prototype.applyMapCS = function(layer){};

/**
 * Multi-polygon map feature implementation.
 *
 * @class geotoolkit.map.features.MultiPolygon
 * @augments geotoolkit.map.features.AbstractFeature
 *
 * @param {object} options feature options
 * @param {!number|string} options.id feature ID
 * @param {!Array} options.geometry feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.Polygon}'s geometry
 * @param {?object} [options.attributes] feature attributes (non-spatial properties)
 */
geotoolkit.map.features.MultiPolygon = {};
    /**
     * Applies Map coordinate system to itself
     *
     * @param {!geotoolkit.map.layers.AbstractLayer} layer map layer to use for coordinate system conversion
     * @returns {geotoolkit.map.features.MultiPolygon} this
     */
    geotoolkit.map.features.MultiPolygon.prototype.applyMapCS = function(layer){};

/**
 * Point map feature implementation.
 *
 * @class geotoolkit.map.features.Aggregation
 * @augments geotoolkit.map.features.Point
 *
 * @param {object} options options
 * @param {!number|string} options.id ID
 * @param {!object} options.geometry geometry
 * @param {!number} options.geometry.x x-ordinate
 * @param {!number} options.geometry.y y-ordinate
 * @param {geotoolkit.util.Iterator} [options.aggregation] iterator through aggregated features
 * @param {?object} [options.attributes] attributes (non-spatial properties)
 */
geotoolkit.map.features.Aggregation = {};
    /**
     * Returns iterator through aggregated features
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.map.features.Aggregation.prototype.getAggregation = function(){};
    /**
     * Sets expanded mode
     * @param {boolean} expanded true, if expanded, else false
     * @returns {geotoolkit.map.features.Aggregation} this
     */
    geotoolkit.map.features.Aggregation.prototype.setExpanded = function(expanded){};

/**
 * Annotation strategy interface
 * @interface
 */
geotoolkit.map.features.strategies.IGetAnnotation = {};
    /**
     * Gets annotation text for a feature
     * @function
     * @abstract
     * @param {!geotoolkit.map.features.IFeature} feature map feature
     * @param {!geotoolkit.map.layers.AbstractFeatureLayer} layer feature layer
     * @returns {?string} annotation text
     */
    geotoolkit.map.features.strategies.IGetAnnotation.prototype.getAnnotation = function(feature, layer){};

/**
 * The strategy returns feature's attribute 'attributeName' as annotation
 * @class geotoolkit.map.features.strategies.AnnotationByAttribute
 * @implements geotoolkit.map.features.strategies.IGetAnnotation
 * @param {string} attributeName define attribute name to get from feature for visualization
 */
geotoolkit.map.features.strategies.AnnotationByAttribute = {};
    /**
     * Gets annotation text for a feature.<br>
     * The implementation returns feature.getAttributes()[propertyName].
     *
     * @param {!geotoolkit.map.features.IFeature} feature map feature
     * @param {geotoolkit.map.layers.AbstractFeatureLayer} layer feature layer (not used)
     * @returns {?string} annotation text
     */
    geotoolkit.map.features.strategies.AnnotationByAttribute.prototype.getAnnotation = function(feature, layer){};

/**
 * The strategy returns feature ID as annotation
 * @class geotoolkit.map.features.strategies.AnnotationById
 * @implements geotoolkit.map.features.strategies.IGetAnnotation
 */
geotoolkit.map.features.strategies.AnnotationById = {};
    /**
     * Gets annotation text for a feature.<br>
     * The implementation returns feature's ID
     * @function
     *
     * @param {!geotoolkit.map.features.IFeature} feature map feature
     * @param {geotoolkit.map.layers.AbstractFeatureLayer} layer feature layer (not used)
     * @returns {?string} annotation text
     */
    geotoolkit.map.features.strategies.AnnotationById.prototype.getAnnotation = function(feature, layer){};

/**
 * Gets feature ID based on a feature properties
 * @interface
 */
geotoolkit.map.features.strategies.IGetId = {};
    /**
     * Gets feature ID based on a feature properties
     * @function
     * @abstract
     * @param {object} source feature properties
     * @returns {number|string} feature ID
     */
    geotoolkit.map.features.strategies.IGetId.prototype.getFeatureId = function(source){};

/**
 * Gets feature ID based on a feature attributes.
 * The implementation returns attributes[attributeName] to use as a feature ID.
 *
 * @class geotoolkit.map.features.strategies.IdByAttribute
 * @implements geotoolkit.map.features.strategies.IGetId
 * @param {!string} attributeName attribute name to use as a feature ID
 */
geotoolkit.map.features.strategies.IdByAttribute = {};
    /**
     * Gets feature ID based on a feature attributes.
     * The implementation returns attributes[attributeName].
     *
     * @param {!object} attributes feature attributes
     * @returns {number|string} feature ID
     */
    geotoolkit.map.features.strategies.IdByAttribute.prototype.getFeatureId = function(attributes){};
    /**
     * Gets the property name that is used to identify feature
     * @deprecated since 2.6 use getAttributeName instead
     * @returns {string}
     */
    geotoolkit.map.features.strategies.IdByAttribute.prototype.getPropertyName = function(){};
    /**
     * Gets the attribute name that is used to identify feature
     * @returns {string}
     */
    geotoolkit.map.features.strategies.IdByAttribute.prototype.getAttributeName = function(){};

/**
 * Features info formatter based on the one attribute field.
 * @param {string} [field=null] field to show, id is used if no value provided
 * @param {string} [separator='<br/>'] html separator between different features info (e.g use ', ' for comma-separated list)
 * @param {number} [limit=5] upper limit for the aggregated features are shown
 * @param {boolean} [unique=false] true to filter repeating fields
 * @class geotoolkit.map.features.formatters.SingleField
 */
geotoolkit.map.features.formatters.SingleField = {};
    /**
     * Formats html text based on the provided features attribute field
     * @param {Array<geotoolkit.map.features.AbstractFeature>} features features list to format
     * @param {string} text text created by the previous formatters from other layers
     * @returns {string} text the formatted text result
     */
    geotoolkit.map.features.formatters.SingleField.prototype.format = function(features, text){};

/**
 * Features info formatter that creates table based on the one attribute field.
 * @param {Array<string>} [fields=null] fields to show in table, all fields are shown if no value provided
 * @param {boolean} [vertical=true] true if feature info should be located in a column with the field names at the first.
 * Otherwise features are placed in a row one under another with field names as a header
 * @class geotoolkit.map.features.formatters.Table
 */
geotoolkit.map.features.formatters.Table = {};
    /**
     * Formats html text based on the provided features attribute field
     * @param {Array<geotoolkit.map.features.AbstractFeature>} features features list to format
     * @param {string} text text created by the previous formatters from other layers
     * @returns {string} text the formatted text result
     */
    geotoolkit.map.features.formatters.Table.prototype.format = function(features, text){};
    /**
     * Creates table formatter function based on the provided object with structure { tableField: fieldFormatterFunction }
     * @param {object} obj fields formatter object
     * @param {boolean} [vertical=true] true if feature info should be located in a column with the field names at the first.
     * Otherwise features are placed in a row one under another with field names as a header
     * @returns {function}
     * @example
     * var formatter = geotoolkit.map.features.formatters.Table.fromObject({
     * 'City': function (feature) { return feature.getAttributes()['city'] + ', ' + feature.getAttributes()['country']' },
     * 'Population': function (feature) { return feature.getAttributes()['pop']; },
     * 'Latitude': function (feature) { return feature.getGeometry()['y']; },
     * 'Longitude': function (feature) { return feature.getGeometry()['x']; }
     * });
     */
    geotoolkit.map.features.formatters.Table.fromObject = function(obj, vertical){};

/**
 * Features rendering filter interface
 * @interface
 */
geotoolkit.map.features.filters.IFilter = {};
    /**
     * Gets iterator over filtered features
     * @function
     * @abstract
     * @param {geotoolkit.util.Iterator} iterator input features iterator
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.map.layers.AbstractFeatureLayer} layer feature layer
     *
     * @returns {geotoolkit.util.Iterator} iterator iterator over features to render
     */
    geotoolkit.map.features.filters.IFilter.prototype.filterFeatures = function(iterator, context, layer){};
    /**
     * Resets itself
     * @function
     * @abstract
     * @returns {geotoolkit.map.features.filters.IFilter}
     */
    geotoolkit.map.features.filters.IFilter.prototype.reset = function(){};

/**
 * AnnotationFit filters out features who's annotations do not fit in their geometries
 *
 * @class geotoolkit.map.features.filters.AnnotationFit
 * @implements geotoolkit.map.features.filters.IFilter
 *
 * @param {object|geotoolkit.scene.shapes.Text} [text=new geotoolkit.scene.shapes.Text()] JSON-object or text shape instance
 * (see {@link geotoolkit.scene.shapes.Text} constructor JSON-object for details)
 */
geotoolkit.map.features.filters.AnnotationFit = {};
    /**
     * Gets iterator over filtered features
     *
     * @param {geotoolkit.util.Iterator} iterator input features iterator
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.map.layers.AbstractFeatureLayer} layer feature layer
     *
     * @returns {geotoolkit.util.Iterator} iterator over features to render
     */
    geotoolkit.map.features.filters.AnnotationFit.prototype.filterFeatures = function(iterator, context, layer){};
    /**
     * Resets itself
     *
     * @returns {geotoolkit.map.features.filters.AnnotationFit}
     */
    geotoolkit.map.features.filters.AnnotationFit.prototype.reset = function(){};

/**
 * BiggestGeometry filters out feature parts with the biggest geometry (for Multi-features only).
 *
 * @class geotoolkit.map.features.filters.BiggestGeometry
 * @implements geotoolkit.map.features.filters.IFilter
 */
geotoolkit.map.features.filters.BiggestGeometry = {};
    /**
     * Gets iterator over filtered features
     *
     * @param {geotoolkit.util.Iterator} iterator input features iterator
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.map.layers.AbstractFeatureLayer} layer feature layer
     *
     * @returns {geotoolkit.util.Iterator} iterator over features to render
     */
    geotoolkit.map.features.filters.BiggestGeometry.prototype.filterFeatures = function(iterator, context, layer){};
    /**
     * Resets itself
     *
     * @returns {geotoolkit.map.features.filters.BiggestGeometry}
     */
    geotoolkit.map.features.filters.BiggestGeometry.prototype.reset = function(){};

/**
 * ByType filters out all features that are not featureType(s) instances.
 *
 * @class geotoolkit.map.features.filters.ByType
 * @implements geotoolkit.map.features.filters.IFilter
 * @param {Function|Array<Function>} featureType feature type(s) to pass
 */
geotoolkit.map.features.filters.ByType = {};
    /**
     * Gets iterator over filtered features
     *
     * @param {geotoolkit.util.Iterator} iterator input features iterator
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.map.layers.AbstractFeatureLayer} [layer] feature layer (not used)
     *
     * @returns {geotoolkit.util.Iterator} iterator over features to render
     */
    geotoolkit.map.features.filters.ByType.prototype.filterFeatures = function(iterator, context, layer){};
    /**
     * Resets itself (the implementation does nothing)
     *
     *
     * @returns {geotoolkit.map.features.filters.ByType}
     */
    geotoolkit.map.features.filters.ByType.prototype.reset = function(){};

/**
 * EvenOddGeometry filters features' geometries that are inside the others using even-odd algorithm ('holes' do not pass)
 *
 * @class geotoolkit.map.features.filters.EvenOddGeometry
 * @implements geotoolkit.map.features.filters.IFilter
 */
geotoolkit.map.features.filters.EvenOddGeometry = {};
    /**
     * Gets iterator over filtered features
     * @param {geotoolkit.util.Iterator} iterator input features iterator
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.map.layers.AbstractFeatureLayer} layer feature layer
     * @returns {geotoolkit.util.Iterator} iterator over features to render
     */
    geotoolkit.map.features.filters.EvenOddGeometry.prototype.filterFeatures = function(iterator, context, layer){};
    /**
     * Resets itself
     * @returns {geotoolkit.map.features.filters.EvenOddGeometry} this
     */
    geotoolkit.map.features.filters.EvenOddGeometry.prototype.reset = function(){};

/**
 * NoAnnotationOverlap filters out geometries with overlapped annotations.<br>
 * If two or more annotations overlap each other, then only one with the biggest geometry is shown
 *
 * @class geotoolkit.map.features.filters.NoAnnotationOverlap
 * @implements geotoolkit.map.features.filters.IFilter
 *
 * @param {object|geotoolkit.scene.shapes.Text} [text=new geotoolkit.scene.shapes.Text()] JSON-object or text shape instance
 * (see {@link geotoolkit.scene.shapes.Text} constructor JSON-object for details)
 * @param {Array} [ignoreTypes=[]] feature types that should be passed without filtering
 */
geotoolkit.map.features.filters.NoAnnotationOverlap = {};
    /**
     * Gets iterator over filtered features
     *
     * @param {geotoolkit.util.Iterator} iterator input features iterator
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.map.layers.AbstractFeatureLayer} layer feature layer
     *
     * @returns {geotoolkit.util.Iterator} iterator over features to render
     */
    geotoolkit.map.features.filters.NoAnnotationOverlap.prototype.filterFeatures = function(iterator, context, layer){};
    /**
     * Resets itself
     *
     * @returns {geotoolkit.map.features.filters.NoAnnotationOverlap}
     */
    geotoolkit.map.features.filters.NoAnnotationOverlap.prototype.reset = function(){};

/**
 * VisibilityArea can be applied to the Point features only. It filters out:<br>
 * 1. features outside of canvas rendering area<br>
 * 2. overlapped map features (optionally)<br>
 * 3. Non-point like features<br>
 * The filter assumes feature geometries having 'x' and 'y' components to use as anchored shape anchor.
 *
 * @class geotoolkit.map.features.filters.VisibilityArea
 * @implements geotoolkit.map.features.filters.IFilter
 *
 * @param {!geotoolkit.scene.shapes.AnchoredShape} shape anchored shape as a template
 * @param {object} [options] options (see "setOptions" method for details)
 * @param {boolean} [options.nooverlap=false] "No overlapping Features allowed" flag
 */
geotoolkit.map.features.filters.VisibilityArea = {};
    /**
     * Sets options
     *
     * @param {object} [options] options
     * @param {boolean} [options.nooverlap] "No overlapping Features allowed" flag
     *
     * @returns {geotoolkit.map.features.filters.VisibilityArea}
     */
    geotoolkit.map.features.filters.VisibilityArea.prototype.setOptions = function(options){};
    /**
     * Gets options
     * @returns {object} options
     */
    geotoolkit.map.features.filters.VisibilityArea.prototype.getOptions = function(){};
    /**
     * Gets iterator over filtered features
     *
     * @param {geotoolkit.util.Iterator} iterator input features iterator
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.map.layers.AbstractFeatureLayer} [layer] feature layer (not used)
     *
     * @returns {geotoolkit.util.Iterator} iterator over features to render
     */
    geotoolkit.map.features.filters.VisibilityArea.prototype.filterFeatures = function(iterator, context, layer){};
    /**
     * Resets itself
     *
     *
     * @returns {geotoolkit.map.features.filters.VisibilityArea}
     */
    geotoolkit.map.features.filters.VisibilityArea.prototype.reset = function(){};

/**
 * Interface to retrieve feature geometry and apply it to {@link geotoolkit.scene.Node} shape
 * @interface
 */
geotoolkit.map.features.adapters.IGeometryToShape = {};
    /**
     * Applies feature geometry to {@link geotoolkit.scene.Node} shape
     * @function
     * @abstract
     * @param {!object} geometry feature geometry
     * @param {!geotoolkit.scene.Node} shape shape to set the geometry on
     */
    geotoolkit.map.features.adapters.IGeometryToShape.prototype.apply = function(geometry, shape){};

/**
 * Interface to retrieve feature geometry and apply it to {@link geotoolkit.scene.shapes.Text} as an anchor
 * @interface
 */
geotoolkit.map.features.adapters.IGeometryToText = {};
    /**
     * Applies feature geometry to {@link geotoolkit.scene.shapes.Text} shape
     * @function
     * @abstract
     * @param {!object} geometry feature geometry
     * @param {!geotoolkit.scene.shapes.Text} shape text shape to set the geometry on
     * @param {!geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.features.adapters.IGeometryToText.prototype.apply = function(geometry, shape, context){};

/**
 * Calculates geometry center and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
 *
 * @class geotoolkit.map.features.adapters.Center
 * @implements {geotoolkit.map.features.adapters.IGeometryToText}
 * @param {geotoolkit.map.features.adapters.Center.Mode} [mode=Mixed] geometry center to anchor mode
 */
geotoolkit.map.features.adapters.Center = {};
    /**
     * Enum for GeometryToText modes
     * @enum
     * @readonly
     */
    geotoolkit.map.features.adapters.Center.Mode = {};
        /**
         * Use centroid point
         * @type {string}
         */
        geotoolkit.map.features.adapters.Center.Mode.Centroid = "";
        /**
         * Use center of the inscribed circle with the biggest possible radius
         * @type {string}
         */
        geotoolkit.map.features.adapters.Center.Mode.Incenter = "";
        /**
         * Use centroid point by default, if it's outside the geometry use incenter
         */
        geotoolkit.map.features.adapters.Center.Mode.CentroidOrIncenter = {};
        /**
         * Use centroid with a few iterations of circle inscribing to improve the result
         * @type {string}
         */
        geotoolkit.map.features.adapters.Center.Mode.Mixed = "";
    /**
     * Calculates geometry center and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
     * @param {!object} geometry feature geometry
     * @param {!Array<number>} geometry.x array of x-ordinates
     * @param {!Array<number>} geometry.y array of y-ordinates
     * @param {!geotoolkit.scene.shapes.Text} text text shape to set the anchor on
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.features.adapters.Center.prototype.apply = function(geometry, text, context){};

/**
 * Calculates right edge point of geometry and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
 *
 * @class geotoolkit.map.features.adapters.Edge
 * @implements {geotoolkit.map.features.adapters.IGeometryToText}
 *
 * @param {object} [options] options
 * @param {object} [options.offset] anchor offset
 * @param {number} [options.offset.x=5] x-offset
 * @param {number} [options.offset.y=0] y-offset
 */
geotoolkit.map.features.adapters.Edge = {};
    /**
     * Sets feature_geometry-to-text_anchor_position offset options. For the new options to take effect on layer, the layer has to be invalidated.
     *
     * @param {!object} options options
     * @param {object} [options.offset] offset offset options
     * @param {number} [options.offset.x] x-ordinate offset in device coordinates
     * @param {number} [options.offset.y] y-ordinate offset in device coordinates
     *
     * @returns {geotoolkit.map.features.adapters.Edge} this
     */
    geotoolkit.map.features.adapters.Edge.prototype.setOptions = function(options){};
    /**
     * Calculates right end point of polyline and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
     *
     * @param {!object} geometry feature geometry
     * @param {!Array} geometry.x array of x-ordinates
     * @param {!Array} geometry.y array of y-ordinates
     * @param {!geotoolkit.scene.shapes.Text} text text shape to set the anchor on
     * @param {geotoolkit.renderer.RenderingContext | geotoolkit.util.Transformation} context rendering context or its transformation
     */
    geotoolkit.map.features.adapters.Edge.prototype.apply = function(geometry, text, context){};

/**
 * Applies feature geometry's 'x' and 'y' (in Map C.S.) to {@link geotoolkit.scene.shapes.AnchoredShape} as an anchor
 * @class geotoolkit.map.features.adapters.Point
 * @implements {geotoolkit.map.features.adapters.IGeometryToShape}
 * @implements {geotoolkit.map.features.adapters.IGeometryToText}
 *
 * @param {object} [options] options
 * @param {object} [options.offset] anchor offset
 * @param {number} [options.offset.x=0] x-offset
 * @param {number} [options.offset.y=0] y-offset
 */
geotoolkit.map.features.adapters.Point = {};
    /**
     * Sets feature_geometry-to-text_anchor_position offset options. For the new options to take effect on layer, the layer has to be invalidated.
     *
     * @param {!object} [options] options
     * @param {object} [options.offset] offset offset options
     * @param {number} [options.offset.x] x-ordinate offset in device coordinates
     * @param {number} [options.offset.y] y-ordinate offset in device coordinates
     *
     * @returns {geotoolkit.map.features.adapters.Point} this
     */
    geotoolkit.map.features.adapters.Point.prototype.setOptions = function(options){};
    /**
     * Applies feature geometry's 'x' and 'y' to {@link geotoolkit.scene.shapes.AnchoredShape} as an anchor
     *
     * @param {!object} geometry feature geometry
     * @param {!number} geometry.x x-ordinate
     * @param {!number} geometry.y y-ordinate
     * @param {!geotoolkit.scene.Node} shape shape to set the anchor on
     * @param {geotoolkit.renderer.RenderingContext | geotoolkit.util.Transformation} context rendering context
     */
    geotoolkit.map.features.adapters.Point.prototype.apply = function(geometry, shape, context){};

/**
 * Applies {@link geotoolkit.map.features.LineString} LineString geometry's coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polyline}
 * @class geotoolkit.map.features.adapters.LineString
 * @implements {geotoolkit.map.features.adapters.IGeometryToShape}
 */
geotoolkit.map.features.adapters.LineString = {};
    /**
     * Applies feature geometry's 'x' and 'y' coordinates to {@link geotoolkit.scene.shapes.Polyline} shape
     *
     * @param {!object} geometry feature geometry
     * @param {!Array} geometry.x x-coordinates
     * @param {!Array} geometry.y y-coordinates
     * @param {!geotoolkit.scene.shapes.Polyline} polyline polyline to set the coordinates on
     */
    geotoolkit.map.features.adapters.LineString.prototype.apply = function(geometry, polyline){};

/**
 * Applies feature geometry's 'x' and 'y' coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polygon}
 * @class geotoolkit.map.features.adapters.Polygon
 * @implements {geotoolkit.map.features.adapters.IGeometryToShape}
 */
geotoolkit.map.features.adapters.Polygon = {};
    /**
     * Applies feature geometry's 'x' and 'y' coordinates to {@link geotoolkit.scene.shapes.Polygon} shape
     *
     * @param {!object} geometry feature geometry
     * @param {!Array} geometry.x x-coordinates
     * @param {!Array} geometry.y y-coordinates
     * @param {!geotoolkit.scene.shapes.Polygon} polygon polygon to set the coordinates on
     * @param {geotoolkit.renderer.RenderingContext | geotoolkit.util.Transformation} context rendering context or context transform
     */
    geotoolkit.map.features.adapters.Polygon.prototype.apply = function(geometry, polygon, context){};

/**
 * Applies {@link geotoolkit.map.features.LineString} or {@link geotoolkit.map.features.Polygon}
 * geometry's coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Path}
 * @class geotoolkit.map.features.adapters.Path
 * @implements {geotoolkit.map.features.adapters.IGeometryToShape}
 */
geotoolkit.map.features.adapters.Path = {};
    /**
     * Applies feature geometry's 'x' and 'y' coordinates to {@link geotoolkit.scene.shapes.Path} shape
     *
     * @param {!object} geometry feature geometry
     * @param {!Array} geometry.x x-coordinates
     * @param {!Array} geometry.y y-coordinates
     * @param {!geotoolkit.scene.Node} path path to set the coordinates on
     */
    geotoolkit.map.features.adapters.Path.prototype.apply = function(geometry, path){};

/**
 * Converts features in a form convenient for storage and processing. Returns saved features on request.
 * @class geotoolkit.map.features.converters.BaseConverter
 * @augments geotoolkit.util.EventDispatcher
 */
geotoolkit.map.features.converters.BaseConverter = {};
    /**
     * Converts and saves new features in array. All features are supported.
     * @param {Array<geotoolkit.map.features.IFeature>} features new features to add
     * @returns {Array|null} features that were not processed
     */
    geotoolkit.map.features.converters.BaseConverter.prototype.saveConvertedFeatures = function(features){};
    /**
     * Returns saved features corresponded to the options
     * @param {object} options request options
     * @param {!geotoolkit.util.Rect} [options.bbox] bounding box for requested features
     * @param {?function} [options.filter=null] additional filter by features
     * @returns {Array<geotoolkit.map.features.IFeature>|geotoolkit.util.Iterator} features stored
     */
    geotoolkit.map.features.converters.BaseConverter.prototype.getFeatures = function(options){};
    /**
     * Removes feature(s) from the store
     * @param {geotoolkit.util.Iterator|geotoolkit.map.features.IFeature} features feature(s) to remove
     * @returns {geotoolkit.map.features.converters.BaseConverter} this
     */
    geotoolkit.map.features.converters.BaseConverter.prototype.removeFeatures = function(features){};
    /**
     * Clears all the features from the store
     * @returns {geotoolkit.map.features.converters.BaseConverter} this
     */
    geotoolkit.map.features.converters.BaseConverter.prototype.clear = function(){};

/**
 * Provides feature converters store for centralized control and processing
 * @param {geotoolkit.map.features.converters.BaseConverter|Array} converters converter(s) for storing
 * @class geotoolkit.map.features.converters.CompositeConverter
 * @augments geotoolkit.util.EventDispatcher
 */
geotoolkit.map.features.converters.CompositeConverter = {};
    /**
     * Adds converter to the end of the list for storing features
     * @param {geotoolkit.map.features.converters.BaseConverter} converter converter to add
     * @returns {geotoolkit.map.features.converters.CompositeConverter} this
     */
    geotoolkit.map.features.converters.CompositeConverter.prototype.addFeatureConverter = function(converter){};
    /**
     * Removes converter from the converters list
     * @param {geotoolkit.map.features.converters.BaseConverter} converter converter to remove
     * @returns {geotoolkit.map.features.converters.CompositeConverter} this
     */
    geotoolkit.map.features.converters.CompositeConverter.prototype.removeFeatureConverter = function(converter){};
    /**
     * Returns features from the converters corresponded to the options
     * @param {object} options request options
     * @param {!geotoolkit.util.Rect} [options.bbox] bounding box for requested features
     * @param {?function} [options.filter=null] additional filter by features
     * @returns {geotoolkit.util.Iterator} features stored
     */
    geotoolkit.map.features.converters.CompositeConverter.prototype.getFeatures = function(options){};

/**
 * Converts features into a scaled view in purpose of simplify geometry and remove unnecessary points using RDP(Ramer-Douglas-Peucker) algorithm.
 * Only multipoint-like features are supported.
 * @class geotoolkit.map.features.converters.RDP
 * @augments geotoolkit.map.features.converters.BaseConverter
 */
geotoolkit.map.features.converters.RDP = {};
    /**
     * Converts and saves features in a scaled view. Only multipoint-like features are supported.
     * @override
     * @param {Array<geotoolkit.map.features.IFeature>} features new features to add
     * @returns {Array|null} features that were not processed
     */
    geotoolkit.map.features.converters.RDP.prototype.saveConvertedFeatures = function(features){};
    /**
     * Returns saved features corresponded to the options
     * @override
     * @param {object} options request options
     * @param {!geotoolkit.util.Rect} [options.bbox] bounding box for requested features
     * @param {?function} [options.filter=null] additional filter by features
     * @param {!number} [options.scale] map scale to calculate minimum distance between features for aggregation
     * @returns {Array.<geotoolkit.map.features.IFeature>} features stored
     */
    geotoolkit.map.features.converters.RDP.prototype.getFeatures = function(options){};
    /**
     * Removes feature(s) from the store
     * @override
     * @param {geotoolkit.util.Iterator|geotoolkit.map.features.IFeature} features feature(s) to remove
     * @returns {geotoolkit.map.features.converters.RDP} this
     */
    geotoolkit.map.features.converters.RDP.prototype.removeFeatures = function(features){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.features.converters.RDP.prototype.clear = function(){};

/**
 * Converts features into a binary tree for the purpose of aggregation nearby points.
 * Only point-like features are supported.
 * @param {object} options convert options
 * @param {number} [options.mindistance=1] minimum distance between aggregations (in pixel)
 * @param {number} [options.min=2] minimum number of points to start aggregation
 * @param {boolean} [options.enabled=true] true if aggregation is enabled
 * @param {number} [options.timeout=0] timeout between features cached request and the actual data query (in ms)
 * @param {number} [options.amountaggregations=3] number of children in aggregation tree for extension
 * @param {number} [options.radius=30] difference between layers for extension
 * @class geotoolkit.map.features.converters.Aggregator
 * @augments geotoolkit.map.features.converters.BaseConverter
 */
geotoolkit.map.features.converters.Aggregator = {};
    /**
     * Converts and saves features as a binary tree. Only point-like features are supported.
     * @override
     * @param {Array<geotoolkit.map.features.IFeature>} features new features to add
     * @returns {Array|null} features that were not processed
     */
    geotoolkit.map.features.converters.Aggregator.prototype.saveConvertedFeatures = function(features){};
    /**
     * Returns saved features corresponded to the options
     * @override
     * @param {object} options request options
     * @param {!geotoolkit.util.Rect} [options.bbox] bounding box for requested features
     * @param {?function} [options.filter=null] additional filter by features
     * @param {!number} [options.scale] map scale to calculate minimum distance between features for aggregation
     * @returns {Array.<geotoolkit.map.features.IFeature>} features stored
     */
    geotoolkit.map.features.converters.Aggregator.prototype.getFeatures = function(options){};
    /**
     * Removes feature(s) from the store
     * @override
     * @param {geotoolkit.util.Iterator|geotoolkit.map.features.IFeature} features feature(s) to remove
     * @returns {geotoolkit.map.features.converters.Aggregator} this
     */
    geotoolkit.map.features.converters.Aggregator.prototype.removeFeatures = function(features){};
    /**
     * Gets current conversion options.
     * @returns {object} options convert options
     * @returns {number} [options.mindistance=1] minimum distance between aggregations (in pixel)
     * @returns {number} [options.min=2] minimum number of points to start aggregation
     * @returns {boolean} [options.enabled=true] true if aggregation is enabled
     * @returns {number} [options.timeout=50] timeout between features cached request and the actual data query (in ms)
     */
    geotoolkit.map.features.converters.Aggregator.prototype.getOptions = function(){};
    /**
     * Sets new conversion options.
     * @param {object} options convert options
     * @param {number} [options.mindistance=1] minimum distance between aggregations (in pixel)
     * @param {number} [options.min=2] minimum number of points to start aggregation
     * @param {boolean} [options.enabled=true] true if aggregation is enabled
     * @param {number} [options.timeout=0] timeout between features cached request and the actual data query (in ms)
     * @returns {geotoolkit.map.features.converters.Aggregator} this
     */
    geotoolkit.map.features.converters.Aggregator.prototype.setOptions = function(options){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.features.converters.Aggregator.prototype.clear = function(){};

/**
 * Abstract source connector that is able to send url requests and receive data responses
 * @class geotoolkit.map.sources.connectors.AbstractConnector
 */
geotoolkit.map.sources.connectors.AbstractConnector = {};
    /**
     * Sends a request using the query provided
     * @function
     * @abstract
     * @param {string} url the url requested
     * @param {object} options extra options for the request (null if no needed)
     * @param {function} callback the result handler that's called when response is received
     */
    geotoolkit.map.sources.connectors.AbstractConnector.prototype.send = function(url, options, callback){};
    /**
     * Aborts the previous queries sent
     * @param {string} [key] key of the queries to abort (all queries aborted if nothing provided)
     * @returns {geotoolkit.map.sources.connectors.AbstractConnector} this
     */
    geotoolkit.map.sources.connectors.AbstractConnector.prototype.abort = function(key){};

/**
 * Source connector that sends requests by creating XMLHttpRequest with appropriate GET request
 * @class geotoolkit.map.sources.connectors.HttpRequest
 * @augments geotoolkit.map.sources.connectors.AbstractConnector
 */
geotoolkit.map.sources.connectors.HttpRequest = {};
    /**
     * Sends XMLHttpRequest to the url provided
     * @override
     * @param {string} url the url requested
     * @param {object} [options] extra options for the request (null if no needed)
     * @param {string} [options.key] request key (can be used to abort it later)
     * @param {string} [options.responseType] request response type if necessary
     * @param {number} [options.priority] request priority (more priority requests are sending earlier)
     * @param {function} callback the result handler
     */
    geotoolkit.map.sources.connectors.HttpRequest.prototype.send = function(url, options, callback){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.connectors.HttpRequest.prototype.abort = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.connectors.HttpRequest.prototype.abortConnection = function(){};

/**
 * Source connector that sends requests by creating DOM image with appropriate url
 * @class geotoolkit.map.sources.connectors.DOMImage
 * @augments geotoolkit.map.sources.connectors.AbstractConnector
 */
geotoolkit.map.sources.connectors.DOMImage = {};
    /**
     * Creates DOM Image that requests image from the url provided
     * @override
     * @param {string} url url requested
     * @param {object} options extra options for the request (null if no needed)
     * @param {string} [options.key] request key (can be used to abort it later)
     * @param {geotoolkit.scene.shapes.Image} [options.dst=null] destination image if there's no need to create a new object
     * @param {function} callback the result handler
     */
    geotoolkit.map.sources.connectors.DOMImage.prototype.send = function(url, options, callback){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.connectors.DOMImage.prototype.abortConnection = function(){};

/**
 * Source connector that sends http requests to load the data, and after that creates DOM image with the received base64 data
 * This approach allows user to effectively abort the requests, if necessary, and the DOM image data reload occurs quickly due to browser cache
 * @class geotoolkit.map.sources.connectors.PreloadedImage
 * @augments geotoolkit.map.sources.connectors.DOMImage
 */
geotoolkit.map.sources.connectors.PreloadedImage = {};
    /**
     * Sends http request that requests data from the url provided. After that creates DOM image with the base64 data
     * @override
     * @param {string} url url requested
     * @param {object} options extra options for the request (null if no needed)
     * @param {string} [options.key] request key (can be used to abort it later)
     * @param {geotoolkit.scene.shapes.Image} [options.dst=null] destination image if there's no need to create a new object
     * @param {number} [options.priority] request priority (more priority requests are sending earlier)
     * @param {function} callback the result handler
     */
    geotoolkit.map.sources.connectors.PreloadedImage.prototype.send = function(url, options, callback){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.connectors.PreloadedImage.prototype.abort = function(){};

/**
 * Source connector that simulates the request sending and receives the predefined object
 * @class geotoolkit.map.sources.connectors.Stub
 * @augments geotoolkit.map.sources.connectors.AbstractConnector
 * @param {object} [options] options
 * @param {object} [options.data=null] the predefined data object
 */
geotoolkit.map.sources.connectors.Stub = {};
    /**
     * Simulates the request sending with the predefined data receiving
     * @override
     * @param {string} url the url requested
     * @param {object} options extra options for the request (null if no needed)
     * @param {function} callback the result handler
     */
    geotoolkit.map.sources.connectors.Stub.prototype.send = function(url, options, callback){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.connectors.Stub.prototype.abort = function(){};

/**
 * Source connector that sends requests by creating WebSocket
 * @class geotoolkit.map.sources.connectors.WebSocket
 * @augments geotoolkit.map.sources.connectors.AbstractConnector
 */
geotoolkit.map.sources.connectors.WebSocket = {};
    /**
     * Creates WebSocket listening the url provided
     * @override
     * @param {string} url the url requested
     * @param {object} options extra options for the request (null if no needed)
     * @param {string} [options.key] socket request key (can be used to abort it later)
     * @param {function} callback the result handler
     */
    geotoolkit.map.sources.connectors.WebSocket.prototype.send = function(url, options, callback){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.connectors.WebSocket.prototype.abortConnection = function(){};

/**
 * Source connector that proxies another connector's request using the callback provided by user
 * @class geotoolkit.map.sources.connectors.Proxy
 * @augments geotoolkit.map.sources.connectors.AbstractConnector
 * @param {object} [options]
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.HttpRequest()]
 * connector to proxy
 * @param {function} [options.callback=null] callback to modify the data
 */
geotoolkit.map.sources.connectors.Proxy = {};
    /**
     * Proxies the request with the connector provided and handles the request before the passing by
     * @override
     * @param {string} url the url requested
     * @param {object} options extra options for the request (null if no needed)
     * @param {string} [options.key] request key (can be used to abort it later)
     * @param {function} callback the result handler
     */
    geotoolkit.map.sources.connectors.Proxy.prototype.send = function(url, options, callback){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.connectors.Proxy.prototype.abort = function(){};

/**
 * Source connector that wraps another one, adding (and requesting) ArcGIS token if needed
 * @class geotoolkit.map.sources.connectors.ArcGISToken
 * @augments geotoolkit.map.sources.connectors.AbstractConnector
 * @param {object} [options]
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.HttpRequest()]
 * connector to wrap
 */
geotoolkit.map.sources.connectors.ArcGISToken = {};
    /**
     * Sends request to the url provided
     * @override
     * @param {string} url the url requested
     * @param {object} options extra options for the request (null if no needed)
     * @param {string} [options.key] request key (can be used to abort it later)
     * @param {function} callback the result handler
     */
    geotoolkit.map.sources.connectors.ArcGISToken.prototype.send = function(url, options, callback){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.connectors.ArcGISToken.prototype.abort = function(){};

/**
 * Abstract source loader that loads server settings by sending appropriate query and parsing its response
 * The settings request could be flexibly adjusted the by additional parameters specified in 'options'. All of them
 * will be added as a query parameter.
 *
 * @class geotoolkit.map.sources.loaders.AbstractLoader
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.HttpRequest()] connector to use
 * @param {object} [options.settings] settings object
 * @example
 * var loader = new geotoolkit.map.sources.loaders.ArcGISFeature({
 * // all undocumented parameters would be directly added to the request:
 * 'token': 'TikYtCP33k_Ql2mt_233AJZm3iHkFbowqWSUe9ZmkRp15PBbZLgYTEUP0sc46Nxjt5DPWBfSZst5b9ykD7x9mQ..'
 * });
 */
geotoolkit.map.sources.loaders.AbstractLoader = {};
    /**
     * Parses server data response
     * @function
     * @abstract
     * @param {string} data data received from the server
     * @param {function} onload function to be called when data is loaded
     */
    geotoolkit.map.sources.loaders.AbstractLoader.prototype.parse = function(data, onload){};
    /**
     * Returns server settings request url
     * @function
     * @abstract
     * @returns {?string} request server data request
     */
    geotoolkit.map.sources.loaders.AbstractLoader.prototype.getSettingsUrl = function(){};
    /**
     * Returns server settings request options
     * @returns {null|object}
     */
    geotoolkit.map.sources.loaders.AbstractLoader.prototype.getRequestOptions = function(){};
    /**
     * Sets the query parameter to add to the server settings request
     * @param {string} param parameter name
     * @param {string} value parameter value
     * @returns {geotoolkit.map.sources.loaders.AbstractLoader} this
     */
    geotoolkit.map.sources.loaders.AbstractLoader.prototype.setQueryParameter = function(param, value){};
    /**
     * Copies query parameters from another loader
     * @param {geotoolkit.map.sources.loaders.AbstractLoader} loader loader to clone parameters
     * @returns {geotoolkit.map.sources.loaders.AbstractLoader} this
     */
    geotoolkit.map.sources.loaders.AbstractLoader.prototype.cloneQueryParameters = function(loader){};

/**
 * ArcGIS source loader that loads settings and styles from FeatureService server
 * @class geotoolkit.map.sources.loaders.ArcGISFeature
 * @augments geotoolkit.map.sources.loaders.AbstractLoader
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.ArcGISToken()] connector to use
 */
geotoolkit.map.sources.loaders.ArcGISFeature = {};
    /**
     * Parses server data response
     * @override
     * @param {string|object} data data received from the server
     * @param {function} onload function to be called when data is loaded
     */
    geotoolkit.map.sources.loaders.ArcGISFeature.prototype.parse = function(data, onload){};
    /**
     * Returns server settings request url
     * @override
     * @returns {?string} request server data request
     */
    geotoolkit.map.sources.loaders.ArcGISFeature.prototype.getSettingsUrl = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.loaders.ArcGISFeature.prototype.getRequestOptions = function(){};

/**
 * ArcGIS source loader that loads settings from MapService or ImageService server
 * @class geotoolkit.map.sources.loaders.ArcGISImage
 * @augments geotoolkit.map.sources.loaders.AbstractLoader
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.ArcGISToken()] connector to use
 */
geotoolkit.map.sources.loaders.ArcGISImage = {};
    /**
     * Parses server data response
     * @override
     * @param {string|object} data data received from the server
     * @param {function} onload function to be called when data is loaded
     */
    geotoolkit.map.sources.loaders.ArcGISImage.prototype.parse = function(data, onload){};
    /**
     * @override
     */
    geotoolkit.map.sources.loaders.ArcGISImage.prototype.clear = function(){};
    /**
     * Returns server settings request url
     * @override
     * @returns {?string} request server data request
     */
    geotoolkit.map.sources.loaders.ArcGISImage.prototype.getSettingsUrl = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.loaders.ArcGISImage.prototype.getRequestOptions = function(){};

/**
 * ArcGIS source loader that loads tileInfo settings from ImageService server
 * @class geotoolkit.map.sources.loaders.ArcGISTile
 * @augments geotoolkit.map.sources.loaders.ArcGISImage
 * @param {object} [options] options
 */
geotoolkit.map.sources.loaders.ArcGISTile = {};
    /**
     * Parses server data response
     * @override
     * @param {string|object} data data received from the server
     * @param {function} onload function to be called when data is loaded
     */
    geotoolkit.map.sources.loaders.ArcGISTile.prototype.parse = function(data, onload){};

/**
 * WMS source loader that loads settings from WMS (Web Map Service) server
 * @class geotoolkit.map.sources.loaders.WMS
 * @augments geotoolkit.map.sources.loaders.AbstractLoader
 * @param {object} [options] options
 */
geotoolkit.map.sources.loaders.WMS = {};
    /**
     * Parses server data response
     * @override
     * @param {string|object} data data received from the server
     * @param {function} onload function to be called when data is loaded
     */
    geotoolkit.map.sources.loaders.WMS.prototype.parse = function(data, onload){};
    /**
     * Returns server settings request url
     * @override
     * @returns {?string} request server data request
     */
    geotoolkit.map.sources.loaders.WMS.prototype.getSettingsUrl = function(){};

/**
 * WFS source loader that loads settings from WFS (Web Feature Service) server
 * @class geotoolkit.map.sources.loaders.WFS
 * @augments geotoolkit.map.sources.loaders.AbstractLoader
 * @param {object} [options] options
 */
geotoolkit.map.sources.loaders.WFS = {};
    /**
     * Parses server data response
     * @override
     * @param {string|object} data data received from the server
     * @param {function} onload function to be called when data is loaded
     */
    geotoolkit.map.sources.loaders.WFS.prototype.parse = function(data, onload){};
    /**
     * Returns server settings request url
     * @override
     * @returns {?string} request server data request
     */
    geotoolkit.map.sources.loaders.WFS.prototype.getSettingsUrl = function(){};

/**
 * Bing source loader that loads settings from Bing Maps server
 * @class geotoolkit.map.sources.loaders.Bing
 * @augments geotoolkit.map.sources.loaders.AbstractLoader
 * @param {object} [options] options
 */
geotoolkit.map.sources.loaders.Bing = {};
    /**
     * Parses server data response
     * @override
     * @param {string|object} data data received from the server
     * @param {function} onload function to be called when data is loaded
     */
    geotoolkit.map.sources.loaders.Bing.prototype.parse = function(data, onload){};
    /**
     * Returns server settings request url
     * @override
     * @returns {string} request server data request
     */
    geotoolkit.map.sources.loaders.Bing.prototype.getSettingsUrl = function(){};

/**
 * Stream source loader that loads settings from ArcGIS Stream server
 * @class geotoolkit.map.sources.loaders.Stream
 * @augments geotoolkit.map.sources.loaders.ArcGISFeature
 * @param {object} [options] options
 */
geotoolkit.map.sources.loaders.Stream = {};
    /**
     * Parses server data response
     * @override
     * @param {string|object} data data received from the server
     * @param {function} onload function to be called when data is loaded
     */
    geotoolkit.map.sources.loaders.Stream.prototype.parse = function(data, onload){};

/**
 * VectorTile source loader that loads settings and styles from Mapbox VectorTile layer
 * @class geotoolkit.map.sources.loaders.VectorTile
 * @augments geotoolkit.map.sources.loaders.AbstractLoader
 * @param {object} [options] options
 */
geotoolkit.map.sources.loaders.VectorTile = {};
    /**
     * Parses server data response
     * @override
     * @param {string|object} data data received from the server
     * @param {function} onload function to be called when data is loaded
     */
    geotoolkit.map.sources.loaders.VectorTile.prototype.parse = function(data, onload){};
    /**
     * Returns server settings request url
     * @override
     * @returns {?string} request server data request
     */
    geotoolkit.map.sources.loaders.VectorTile.prototype.getSettingsUrl = function(){};

/**
 * Abstract source format that formats data queries and sends it using the connector provided
 * The data requests could be flexibly adjusted the by additional parameters specified in 'options'. All of them
 * will be added as a query parameter.
 * @class geotoolkit.map.sources.formats.AbstractFormat
 * @augments geotoolkit.util.EventDispatcher
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.HttpRequest()] connector to use
 * @param {object} [options.settings] settings object
 * @example
 * var format = new geotoolkit.map.sources.formats.ArcGISFeature({
 * // all undocumented parameters would be directly added to the send requests:
 * 'token': 'TikYtCP33k_Ql2mt_233AJZm3iHkFbowqWSUe9ZmkRp15PBbZLgYTEUP0sc46Nxjt5DPWBfSZst5b9ykD7x9mQ..'
 * });
 */
geotoolkit.map.sources.formats.AbstractFormat = {};
    /**
     * Sends a request based on a settings provided
     * That's a basic implementation for the file requests. Implement parse method to use it or override this method directly.
     * @param {object} [query] query params
     * @param {string} [query.key] connection(s) key (can be used to abort it later)
     * @returns {geotoolkit.map.sources.formats.AbstractFormat} this
     */
    geotoolkit.map.sources.formats.AbstractFormat.prototype.query = function(query){};
    /**
     * Parses the data provided and notifies about the result.
     * Is used in the default query implementation.
     * @function
     * @abstract
     * @param {string|object} data data object or its string representation
     * @returns {geotoolkit.map.sources.formats.AbstractFormat} this
     */
    geotoolkit.map.sources.formats.AbstractFormat.prototype.parse = function(data){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.formats.AbstractFormat.prototype.dispose = function(){};
    /**
     * Aborts all previous requests
     * @param {string} [key] key of the connections to abort (all connections aborted if nothing provided)
     * @returns {geotoolkit.map.sources.formats.AbstractFormat} this
     */
    geotoolkit.map.sources.formats.AbstractFormat.prototype.abort = function(key){};
    /**
     * Sets the query parameter to add to the data requests
     * @param {string} param parameter name
     * @param {string} value parameter value
     * @returns {geotoolkit.map.sources.formats.AbstractFormat} this
     */
    geotoolkit.map.sources.formats.AbstractFormat.prototype.setQueryParameter = function(param, value){};
    /**
     * Copies query parameters from another format
     * @param {geotoolkit.map.sources.formats.AbstractFormat} format format to clone parameters
     * @returns {geotoolkit.map.sources.formats.AbstractFormat} this
     */
    geotoolkit.map.sources.formats.AbstractFormat.prototype.cloneQueryParameters = function(format){};

/**
 * ArcGIS source format that formats map image queries to the MapService or ImageService server
 * @class geotoolkit.map.sources.formats.ArcGISImage
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.ArcGISToken()] connector to use
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.geometryconnector=new geotoolkit.map.sources.connectors.HttpRequest()] connector to use for geometry queries
 */
geotoolkit.map.sources.formats.ArcGISImage = {};
    /**
     * Sends an image request based on a settings provided
     * @override
     * @param {object} query query params
     * @param {number} query.left requesting left limit in model coordinates
     * @param {number} query.right requesting right limit in model coordinates
     * @param {number} query.top requesting top limit in model coordinates
     * @param {number} query.bottom requesting bottom limit in model coordinates
     * @param {number} query.width requesting image width in device coordinates
     * @param {number} query.height requesting image height in device coordinates
     * @returns {geotoolkit.map.sources.formats.ArcGISImage} this
     */
    geotoolkit.map.sources.formats.ArcGISImage.prototype.query = function(query){};
    /**
     * Sends a data information request based on a geometry provided
     * @param {object} query query params
     * @param {object} query.geometry geometry to query
     * @param {number} [query.layer] quering layer id
     * @param {string} [query.key] connection key (can be used to abort it later)
     * @returns {geotoolkit.map.sources.formats.ArcGISImage} this
     */
    geotoolkit.map.sources.formats.ArcGISImage.prototype.queryGeometry = function(query){};
    /**
     * Aborts geometry queries previously sent
     * @param {string} [key] key of the queries to abort (all geometry queries aborted if nothing provided)
     * @returns {geotoolkit.map.sources.formats.ArcGISImage} this
     */
    geotoolkit.map.sources.formats.ArcGISImage.prototype.abortGeometryQueries = function(key){};
    /**
     * Identifies the information in the area provided
     * @param {object} query query params
     * @param {number} query.left map extent left limit in model coordinates
     * @param {number} query.right map extent right limit in model coordinates
     * @param {number} query.top map extent top limit in model coordinates
     * @param {number} query.bottom map extent bottom limit in model coordinates
     * @param {number} query.width image display width in device coordinates
     * @param {number} query.height image display height in device coordinates
     * @param {geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Polygon} query.geometry area geometry to identify
     * @param {string} [query.layers] layers to identify in ArcGIS format (e.g. 'visible:1,2,5')
     * @param {string} [query.key] connection key (can be used to abort it later)
     * @returns {geotoolkit.map.sources.formats.ArcGISImage} this
     */
    geotoolkit.map.sources.formats.ArcGISImage.prototype.identify = function(query){};

/**
 * ArcGIS source format that formats feature queries to the FeatureService server
 * @class geotoolkit.map.sources.formats.ArcGISFeature
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.ArcGISToken()] connector to use
*/
geotoolkit.map.sources.formats.ArcGISFeature = {};
    /**
     * Sends a feature request based on a settings provided
     * @override
     * @param {object} query query params
     * @param {number} query.left requesting left limit in model coordinates
     * @param {number} query.right requesting right limit in model coordinates
     * @param {number} query.top requesting top limit in model coordinates
     * @param {number} query.bottom requesting bottom limit in model coordinates
     * @returns {geotoolkit.map.sources.formats.ArcGISFeature} this
     */
    geotoolkit.map.sources.formats.ArcGISFeature.prototype.query = function(query){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.formats.ArcGISFeature.prototype.abort = function(){};

/**
 * GeoJSON source format that formats feature queries and parses the GeoJSON formatted response
 * @class geotoolkit.map.sources.formats.GeoJSON
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 */
geotoolkit.map.sources.formats.GeoJSON = {};
    /**
     * Parses GeoJSON data into the geotoolkit features and notifies about the result
     * @override
     * @param {string|object} data JSON object or its string representation that contains features data in GeoJSON format
     * @returns {geotoolkit.map.sources.formats.GeoJSON} this
     */
    geotoolkit.map.sources.formats.GeoJSON.prototype.parse = function(data){};

/**
 * WMS source format that formats map image queries to the WMS (Web Map Service) server
 * @class geotoolkit.map.sources.formats.WMS
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [connector=new geotoolkit.map.sources.connectors.DOMImage()] connector to use
 */
geotoolkit.map.sources.formats.WMS = {};
    /**
     * Sends an image request based on a settings provided
     * @override
     * @param {object} query query params
     * @param {number} query.left requesting left limit in model coordinates
     * @param {number} query.right requesting right limit in model coordinates
     * @param {number} query.top requesting top limit in model coordinates
     * @param {number} query.bottom requesting bottom limit in model coordinates
     * @param {number} query.width requesting image width in device coordinates
     * @param {number} query.height requesting image height in device coordinates
     * @param {string} [query.key] connection key (can be used to abort it later)
     * @returns {geotoolkit.map.sources.formats.WMS} this
     */
    geotoolkit.map.sources.formats.WMS.prototype.query = function(query){};

/**
 * KML source format that formats feature queries and parses the KML formatted response
 * @class geotoolkit.map.sources.formats.KML
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 */
geotoolkit.map.sources.formats.KML = {};
    /**
     * Parses KML data into the geotoolkit features and notifies about the result
     * @override
     * @param {string|object} data XML object or its string representation that contains features data in KML format
     * @returns {geotoolkit.map.sources.formats.KML} this
     */
    geotoolkit.map.sources.formats.KML.prototype.parse = function(data){};

/**
 * WFS source format that formats feature queries to the WFS (Web Feature Service) server
 * @class geotoolkit.map.sources.formats.WFS
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 * @param {string} [options.format='json'] format to request from server
 * @param {string} [options.parser=new geotoolkit.map.sources.formats.GeoJSON()] parser format to parse the server response
 */
geotoolkit.map.sources.formats.WFS = {};
    /**
     * Sends a feature request based on a settings provided
     * @override
     * @param {object} query query params
     * @param {number} query.left requesting left limit in model coordinates
     * @param {number} query.right requesting right limit in model coordinates
     * @param {number} query.top requesting top limit in model coordinates
     * @param {number} query.bottom requesting bottom limit in model coordinates
     * @param {string} [query.key] connection key (can be used to abort it later)
     * @returns {geotoolkit.map.sources.formats.WFS} this
     */
    geotoolkit.map.sources.formats.WFS.prototype.query = function(query){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.formats.WFS.prototype.dispose = function(){};

/**
 * Tile source format that formats tile queries based on formatter function provided
 * @class geotoolkit.map.sources.formats.Tile
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 * @param {function} [options.formatterfunction] formatter function that formats a tile request based on its z, y, x indices
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.PreloadedImage()] connector to use
 */
geotoolkit.map.sources.formats.Tile = {};
    /**
     * Sends a tile request based on a settings provided
     * @override
     * @param {object} query query params
     * @param {number} query.x tile x-ordinate
     * @param {number} query.y tile y-ordinate
     * @param {number} query.z tile zoom level
     * @param {geotoolkit.scene.shapes.Image} [query.dst=null] destination image
     * @param {string} [query.key] connection key (can be used to abort it later)
     * @param {number} [query.priority] query priority
     * @returns {geotoolkit.map.sources.formats.Tile} this
     */
    geotoolkit.map.sources.formats.Tile.prototype.query = function(query){};

/**
 * CSV source format that formats feature queries and parses the CSV formatted response
 * @class geotoolkit.map.sources.formats.CSV
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 */
geotoolkit.map.sources.formats.CSV = {};
    /**
     * Sets CSV data string delimiter (',' by default)
     * @param {string} delimiter CSV delimiter to use for CSV parse
     */
    geotoolkit.map.sources.formats.CSV.setDelimiter = function(delimiter){};
    /**
     * Parses CSV data into the geotoolkit features and notifies about the result
     * @override
     * @param {string|string[]} data table object or its string representation that contains features data in CSV format
     * @returns {geotoolkit.map.sources.formats.CSV} this
     */
    geotoolkit.map.sources.formats.CSV.prototype.parse = function(data){};

/**
 * GeoRSS source format that formats feature queries and parses the GeoRSS formatted response
 * @class geotoolkit.map.sources.formats.GeoRSS
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 */
geotoolkit.map.sources.formats.GeoRSS = {};
    /**
     * Parses GeoRSS data into the geotoolkit features and notifies about the result
     * @override
     * @param {string|object} data XML object or its string representation that contains features data in GeoRSS format
     * @returns {geotoolkit.map.sources.formats.GeoRSS} this
     */
    geotoolkit.map.sources.formats.GeoRSS.prototype.parse = function(data){};

/**
 * Stream source format that formats feature queries and parses the ArcGIS Stream formatted response
 * @class geotoolkit.map.sources.formats.Stream
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.ArcGISToken()] connector to use
 */
geotoolkit.map.sources.formats.Stream = {};
    /**
     * Parses Stream data into the geotoolkit features and notifies about the result
     * @override
     * @param {string|object} data JSON object or its string representation that contains features data
     * @returns {geotoolkit.map.sources.formats.Stream} this
     */
    geotoolkit.map.sources.formats.Stream.prototype.parse = function(data){};

/**
 * VectorTile source format that formats tile queries to Mapbox server and parses Pbf (Protocolbuffer Binary Format) formatted response
 * @class geotoolkit.map.sources.formats.VectorTile
 * @augments geotoolkit.map.sources.formats.Tile
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.HttpRequest()] connector to use
 */
geotoolkit.map.sources.formats.VectorTile = {};
    /**
     * Sends a tile request based on a settings provided
     * @override
     * @param {object} query query params
     * @param {number} query.x tile x-ordinate
     * @param {number} query.y tile y-ordinate
     * @param {number} query.z tile zoom level
     * @param {object} query.dst destination object
     * @param {string} [query.key] connection key (can be used to abort it later)
     * @returns {geotoolkit.map.sources.formats.VectorTile} this
     */
    geotoolkit.map.sources.formats.VectorTile.prototype.query = function(query){};

/**
 * ArcGIS source format that parses Lerc (Limited Error Raster Compression) formatted responses. Can be used both as a features format
 * or parse LERC images (see tutorial for details)
 * @class geotoolkit.map.sources.formats.Lerc
 * @augments geotoolkit.map.sources.formats.AbstractFormat
 * @param {object} [options] options
 * @param {geotoolkit.util.ColorProvider} [options.colorprovider=new geotoolkit.util.DefaultColorProvider([0,1],['black','white'])]
 * color provider to use for one-dimensional
 * @param {number} [options.symbolTileSize=1] the tile size for each symbol/feature (in px). Set to use format for the vectors
 * @param {geotoolkit.map.sources.connectors.AbstractConnector} [options.connector=new geotoolkit.map.sources.connectors.HttpRequest()] connector to use
 */
geotoolkit.map.sources.formats.Lerc = {};
    /**
     * Sends an image request based on a settings provided
     * @override
     * @param {object} query query params
     * @param {number} query.left requesting left limit in model coordinates
     * @param {number} query.right requesting right limit in model coordinates
     * @param {number} query.top requesting top limit in model coordinates
     * @param {number} query.bottom requesting bottom limit in model coordinates
     * @param {number} query.width requesting image width in device coordinates
     * @param {number} query.height requesting image height in device coordinates
     * @param {string} [query.key] connection key (can be used to abort it later)
     * @returns {geotoolkit.map.sources.formats.Lerc} this
     */
    geotoolkit.map.sources.formats.Lerc.prototype.query = function(query){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.formats.Lerc.prototype.setQueryParameter = function(){};

/**
 * Abstract map source that loads server settings and then queries some sort of data from it
 * @class geotoolkit.map.sources.AbstractSource
 * @augments geotoolkit.util.EventDispatcher
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.loaders.AbstractLoader} [options.loader=null] loader for loading server settings. If loader=null,
 * @param {function} [options.ondataloaded=null] after loader load data
 * @param {function} [options.ondatafailed=null] after loader failed to load data
 * there's not server settings request sending.
 * @param {geotoolkit.map.sources.formats.AbstractFormat} [options.format=null] format for the server data requests formatting
 * @param {string|geotoolkit.map.coordinatesystems.AbstractSystem} [options.system='WGS84'] initial data coordinate system
 * @param {string} [options.url=null] data server url
 */
geotoolkit.map.sources.AbstractSource = {};
    /**
     * Sets the server url to use for requesting
     * @param {string} url server url
     * @returns {geotoolkit.map.sources.AbstractSource} this
     */
    geotoolkit.map.sources.AbstractSource.prototype.setServerURL = function(url){};
    /**
     * Returns true if server data is already loaded (or no loader provided)
     * @returns {boolean}
     */
    geotoolkit.map.sources.AbstractSource.prototype.isDataLoaded = function(){};
    /**
     * Gets the server url that is currently used for requests
     * @returns {string} server url
     */
    geotoolkit.map.sources.AbstractSource.prototype.getServerURL = function(){};
    /**
     * Returns promise that is loaded when server settings are ready to process
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.map.sources.AbstractSource.prototype.loadServerData = function(){};
    /**
     * Returns the current data model limits (presumably loaded from the server if it's settled)
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.map.sources.AbstractSource.prototype.getModelLimits = function(){};
    /**
     * Sets map coordinate system.
     * @param {string|geotoolkit.map.coordinatesystems.AbstractSystem} system map coordinate system
     * @returns {geotoolkit.map.sources.AbstractSource} this
     */
    geotoolkit.map.sources.AbstractSource.prototype.setMapCoordinateSystem = function(system){};
    /**
     * Gets current map coordinate system.
     * @returns {geotoolkit.map.coordinatesystems.AbstractSystem}
     */
    geotoolkit.map.sources.AbstractSource.prototype.getMapCoordinateSystem = function(){};
    /**
     * Sets the data initial coordinate system.
     * @param {string|geotoolkit.map.coordinatesystems.AbstractSystem} system initial coordinate system
     * @returns {geotoolkit.map.sources.AbstractSource} this
     */
    geotoolkit.map.sources.AbstractSource.prototype.setInitialCoordinateSystem = function(system){};
    /**
     * Gets current data initial coordinate system.
     * @returns {geotoolkit.map.coordinatesystems.AbstractSystem}
     */
    geotoolkit.map.sources.AbstractSource.prototype.getInitialCoordinateSystem = function(){};
    /**
     * Gets transformer to transform data to map coordinate system
     * @returns {geotoolkit.map.coordinatesystems.Transformer}
     */
    geotoolkit.map.sources.AbstractSource.prototype.getTransformerToMap = function(){};
    /**
     * Gets transformer to transform data from map coordinate system
     * @returns {geotoolkit.map.coordinatesystems.Transformer}
     */
    geotoolkit.map.sources.AbstractSource.prototype.getTransformerFromMap = function(){};
    /**
     * Clears all the data.
     * @returns {geotoolkit.map.sources.AbstractSource} this
     */
    geotoolkit.map.sources.AbstractSource.prototype.clear = function(){};
    /**
     * Aborts all the sent requests, resends the last one
     * @returns {geotoolkit.map.sources.AbstractSource} this
     */
    geotoolkit.map.sources.AbstractSource.prototype.update = function(){};
    /**
     * Disposes this source, once disposed it should not be used anymore.<br>
     * @override
     */
    geotoolkit.map.sources.AbstractSource.prototype.dispose = function(){};

/**
 * Vector source that allows user to get features from remote resource
 * @class geotoolkit.map.sources.Vector
 * @augments geotoolkit.map.sources.AbstractSource
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.formats.AbstractFormat} [options.format=new geotoolkit.map.sources.formats.GeoJSON()] the remote features format
 * @param {string} [options.idfield='name'] field that contains the id for the features
 * @param {string|geotoolkit.map.features.QueryMode} [options.mode='All'] the features requesting mode
 * @param {number} [options.requestresolution=10] a grid size for layer partitioning, that is used for server requests in 'Grid' mode
 * @param {number} [options.timeout=50] the timeout (in ms) between viewport changed and new features requested (if request is needed)
 */
geotoolkit.map.sources.Vector = {};
    /**
     * Sends a request for features in given bounding box.
     * @param {geotoolkit.util.Rect} bbox bounding box for features
     * @param {geotoolkit.map.layers.AbstractFeatureLayer} layer layer requesting
     * @returns {geotoolkit.map.sources.Vector} this
     */
    geotoolkit.map.sources.Vector.prototype.queryFeatures = function(bbox, layer){};
    /**
     * Notifies source to add features.
     * @param {Array<geotoolkit.map.features.AbstractFeature>} features features to add
     * @param {boolean} [needTransform=true] true if features should be transformed to the map coordinates
     * @returns {geotoolkit.map.sources.Vector} this
     */
    geotoolkit.map.sources.Vector.prototype.addFeatures = function(features, needTransform){};
    /**
     * Notifies source to remove feature.
     * @param {geotoolkit.map.features.AbstractFeature} feature feature to remove
     * @returns {geotoolkit.map.sources.Vector} this
     */
    geotoolkit.map.sources.Vector.prototype.removeFeature = function(feature){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.sources.Vector.prototype.clear = function(){};
    /**
     * Notifies source to remove all features added.
     * @returns {geotoolkit.map.sources.Vector} this
     */
    geotoolkit.map.sources.Vector.prototype.clearFeatures = function(){};
    /**
     * Parses features from the data object and adds it to the source
     * @deprecated since 2.6
     * @param {string|object} data data object (or its string representation) containing the features data in a specific format
     * @returns {geotoolkit.map.sources.Vector} this
     */
    geotoolkit.map.sources.Vector.prototype.loadData = function(data){};
    /**
     * Requests data from the resource and parses the response
     * @param {string} resource resource url for request
     */
    geotoolkit.map.sources.Vector.prototype.requestData = function(resource){};
    /**
     * Sets the unique identifier for the features
     * @param {string} field unique identifier
     * @returns {geotoolkit.map.sources.Vector} this
     */
    geotoolkit.map.sources.Vector.prototype.setUniqueField = function(field){};
    /**
     * Gets the unique identifier for the dataset
     * @returns {string} field
     */
    geotoolkit.map.sources.Vector.prototype.getUniqueField = function(){};
    /**
     * Sets the grid size for layer partitioning that is used for server requests
     * @param {number} resolution grid size
     * @returns {geotoolkit.map.sources.Vector} this
     */
    geotoolkit.map.sources.Vector.prototype.setRequestResolution = function(resolution){};
    /**
     * Gets the grid size for layer partitioning that is used for server requests
     * @returns {number}
     */
    geotoolkit.map.sources.Vector.prototype.getRequestResolution = function(){};

/**
 * Image source that allows user to get map data as an image using the format provided
 * @class geotoolkit.map.sources.Image
 * @augments geotoolkit.map.sources.AbstractSource
 * @param {object} [options] options
 * @param {number} [options.timeout=50] the timeout (in ms) between viewport changed and new image requested
 * @param {number} [options.inflate=0.2] inflate ratio for requesting area (0.2 by default means +20%)
 * @param {boolean} [options.uselayerlimits=false] set true to clip requesting image with the layer limits, false otherwise
 */
geotoolkit.map.sources.Image = {};
    /**
     * Notifies source to remove all data added.
     * @override
     * @returns {geotoolkit.map.sources.Image} this
     */
    geotoolkit.map.sources.Image.prototype.clear = function(){};
    /**
     * Sets image inflate ratio to use
     * @param {number} ratio image inflate ratio (e.g. 0.2 means the 20% inflation)
     * @returns {geotoolkit.map.sources.Image} this
     */
    geotoolkit.map.sources.Image.prototype.setInflateRatio = function(ratio){};
    /**
     * Returns current inflate ratio
     * @returns {number}
     */
    geotoolkit.map.sources.Image.prototype.getInflateRatio = function(){};
    /**
     * Sets the server layer name(s) to be shown on the layer
     * @param {string | Array<number>} layers layer id(s) to be shown
     * @returns {geotoolkit.map.sources.Image} this
     */
    geotoolkit.map.sources.Image.prototype.showLayers = function(layers){};
    /**
     * Adds the passed in ID's to the list of layers to hide
     * @param {number | Array<number>} [id] ID(s) for the layers to show
     * @returns {geotoolkit.map.sources.Image} this
     */
    geotoolkit.map.sources.Image.prototype.hideLayers = function(id){};
    /**
     * Returns the server layer ids that are requested.
     * @returns {Array<number>} layers
     */
    geotoolkit.map.sources.Image.prototype.getVisibleLayers = function(){};
    /**
     * Returns layers JSON data loaded from the server
     * Should be used asynchronically after loadServerData() method is called
     * @returns {object}
     */
    geotoolkit.map.sources.Image.prototype.getLayers = function(){};

/**
 * Tile source that allows user to get tiles from the server
 * @class geotoolkit.map.sources.Tile
 * @augments geotoolkit.map.sources.AbstractSource
 * @param {object} [options] options
 * @param {number} [options.tilewidth=256] width for the tiles to use (in px)
 * @param {number} [options.tileheight=256] height for the tiles to use (in px)
 * @param {number} [options.imagepool=400] the amount of cache for the tile images
 * @param {number} [options.minlod=0] the minimum level of details for the tiles
 * @param {number} [options.maxlod=15] the maximum level of details for the tiles
 * @param {function} [options.formatterfunction=null] the function that takes z, y, x and turns that into tile location (replaces the format field)
 * @param {string} [options.token=null] authorization token (for ArcGIS tile servers if needed)
 */
geotoolkit.map.sources.Tile = {};
    /**
     * Notifies source to remove all tiles added.
     * @override
     * @returns {geotoolkit.map.sources.Tile} this
     */
    geotoolkit.map.sources.Tile.prototype.clear = function(){};
    /**
     * Sets properties (default properties listed are for construction time only)
     * @param {object} [properties] options
     * @param {number} [properties.tilewidth] width for the tiles to use (in px)
     * @param {number} [properties.tileheight] height for the tiles to use (in px)
     * @param {number} [properties.imagepool] the amount of cache for the tile images
     * @param {number} [properties.minlod] the minimum level of details for the tiles
     * @param {number} [properties.maxlod] the maximum level of details for the tiles
     * @param {string} [properties.url] the server url
     * @returns {geotoolkit.map.sources.Tile} this
     */
    geotoolkit.map.sources.Tile.prototype.setProperties = function(properties){};

/**
 * Composite source that stores multiple vector sources for centralized control and processing
 * @param {geotoolkit.map.sources.Vector|Array} [sources=null] source(s) for storing
 * @class geotoolkit.map.sources.CompositeSource
 * @augments geotoolkit.map.sources.Vector
 */
geotoolkit.map.sources.CompositeSource = {};
    /**
     * Adds vector source to the list for getting new features
     * @param {geotoolkit.map.sources.Vector} source source to add
     * @returns {geotoolkit.map.sources.CompositeSource} this
     */
    geotoolkit.map.sources.CompositeSource.prototype.addFeatureSource = function(source){};
    /**
     * Removes source from the sources list
     * @param {geotoolkit.map.sources.Vector} source source to remove
     * @returns {geotoolkit.map.sources.CompositeSource} this
     */
    geotoolkit.map.sources.CompositeSource.prototype.removeFeatureSource = function(source){};
    /**
     * Gets current sources list used to add a new features
     * @returns {Array<geotoolkit.map.sources.Vector>}
     */
    geotoolkit.map.sources.CompositeSource.prototype.getFeatureSourceList = function(){};
    /**
     * Sets map coordinate system.
     * @override
     * @param {string|geotoolkit.map.coordinatesystems.AbstractSystem} system map coordinate system
     * @returns {geotoolkit.map.sources.CompositeSource} this
     */
    geotoolkit.map.sources.CompositeSource.prototype.setMapCoordinateSystem = function(system){};
    /**
     * Sets initial features coordinate system.
     * @override
     * @param {geotoolkit.map.coordinatesystems.AbstractSystem} system initial coordinate system
     * @returns {geotoolkit.map.sources.CompositeSource} this
     */
    geotoolkit.map.sources.CompositeSource.prototype.setInitialCoordinateSystem = function(system){};
    /**
     * Sets the grid size for layer partitioning that is used for server requests
     * @override
     * @param {number} resolution grid size
     * @returns {geotoolkit.map.sources.CompositeSource} this
     */
    geotoolkit.map.sources.CompositeSource.prototype.setRequestResolution = function(resolution){};
    /**
     * Sets the unique identifier for the features
     * @override
     * @param {string} field unique identifier
     * @returns {geotoolkit.map.sources.CompositeSource} this
     */
    geotoolkit.map.sources.CompositeSource.prototype.setUniqueField = function(field){};
    /**
     * Notifies source to remove all features added.
     * @override
     * @returns {geotoolkit.map.sources.CompositeSource} this
     */
    geotoolkit.map.sources.CompositeSource.prototype.clear = function(){};
    /**
     * Disposes this source, once disposes a node should not be used anymore.<br>
     * @override
     */
    geotoolkit.map.sources.CompositeSource.prototype.dispose = function(){};

/**
 * Vector source that allows user to get features from ArcGIS FeatureService server
 * @class geotoolkit.map.sources.ArcGISFeature
 * @augments geotoolkit.map.sources.Vector
 * @param {object} [options] options
 * @param {string[]} [options.requestfields=null] an array for requested fields. If null, all the fields are loaded
 * @param {string|string[]} [options.layers=null] server layers to request (for multilayer server only)
 * @param {boolean} [options.offsetsupport=false] true if offsetSupport server's property should be used (otherwise quadtree division is used)
 * @param {string} [options.token=null] authorization token for ArcGIS data servers (if needed)
 */
geotoolkit.map.sources.ArcGISFeature = {};
    /**
     * Sets the list of the fields to request from the server (should be set before the server url)
     * @param {string[]} requestFields an array of fields to request from server
     * @returns {geotoolkit.map.sources.ArcGISFeature} this
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.setRequestFields = function(requestFields){};
    /**
     * Returns an array of fields to be requested from server
     * @returns {string[]|null}
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.getRequestFields = function(){};
    /**
     * Returns the layers data array (for the multilayer server source)
     * Should be used asynchronically after loadServerData() method is called
     * @returns {Array}
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.getLayers = function(){};
    /**
     * Returns separate feature source for the given layer (for the multilayer server source)
     * Should be used asynchronically after loadServerData() method is called
     * @param {string} id required layer id
     * @returns {geotoolkit.map.sources.ArcGISFeature} source feature source for sublayer
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.getLayerSource = function(id){};
    /**
     * Returns true if feature source's server contains multiple layers
     * Should be used asynchronically after loadServerData() method is called
     * @returns {boolean}
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.isMultilayerSource = function(){};
    /**
     * Returns the server layer's global alpha (for singlelayer servers basically)
     * Should be used asynchronically after loadServerData() method is called
     * @returns {number}
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.getGlobalAlpha = function(){};
    /**
     * Returns scale visible range for the server's layer (for singlelayer servers basically)
     * Should be used asynchronically after loadServerData() method is called
     * @returns {Array<number>} [minScale, maxScale]
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.getScaleRange = function(){};
    /**
     * Returns annotation's text shape parsed from the server (for singlelayer servers basically)
     * Should be used asynchronically after loadServerData() method is called
     * @returns {geotoolkit.scene.shapes.Text}
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.getAnnotationShape = function(){};
    /**
     * Adds the passed in ID's to the list of layers to show
     * @param {number | Array<number>} id id(s) for the layer(s) to show
     * @returns {geotoolkit.map.sources.ArcGISFeature}
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.showLayers = function(id){};
    /**
     * Returns layer initial extent rectangle
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.getInitialModelLimits = function(){};
    /**
     * Returns the server layer ids that are requested.
     * @returns {Array<number>} layers
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.getVisibleLayers = function(){};
    /**
     * Disposes this source, once disposed it should not be used anymore.<br>
     * @override
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.dispose = function(){};
    /**
     * Creates a server legend from its templates (short info about each layer, such as layer name, type and icon)
     * @param {function} callback the result handler
     */
    geotoolkit.map.sources.ArcGISFeature.prototype.queryLegend = function(callback){};

/**
 * Image source for ArcGIS servers that supports additional features provided by ArcGIS servers (such as getting legend)
 * @class geotoolkit.map.sources.ArcGISImage
 * @augments geotoolkit.map.sources.Image
 * @param {object} [options] options
 * @param {string} [options.token=null] authorization token for ArcGIS data servers (if needed)
 */
geotoolkit.map.sources.ArcGISImage = {};
    /**
     * Queries server legend (short info about each layer, such as layer name, type and icon)
     * @param {function} callback the result handler
     */
    geotoolkit.map.sources.ArcGISImage.prototype.queryLegend = function(callback){};
    /**
     * Queries data by the geometry provided
     * @param {object} geometry geometry to query
     * @returns {Array}
     */
    geotoolkit.map.sources.ArcGISImage.prototype.queryGeometry = function(geometry){};
    /**
     * Aborts all the geometry data queried
     * @returns {geotoolkit.map.sources.ArcGISImage} this
     */
    geotoolkit.map.sources.ArcGISImage.prototype.abortGeometryQueries = function(){};
    /**
     * Queries data by the geometry provided
     * @param {geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Polygon} geometry area geometry to identify
     * @param {geotoolkit.map.layers.ArcGISImage} layer layer for query
     * @returns {Array}
     */
    geotoolkit.map.sources.ArcGISImage.prototype.identify = function(geometry, layer){};
    /**
     * Returns layer initial extent rectangle
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.map.sources.ArcGISImage.prototype.getInitialModelLimits = function(){};
    /**
     * Sets layers to show as the tooltip info (in .queryGeometry and .identify methods)
     * @param {number|number[]} layers layers to show tooltip
     * @returns {geotoolkit.map.sources.ArcGISImage} this
     */
    geotoolkit.map.sources.ArcGISImage.prototype.setTooltipLayers = function(layers){};

/**
 * Vector source that allows user to get features from remote resource in GeoJSON format
 * @class geotoolkit.map.sources.GeoJSON
 * @augments geotoolkit.map.sources.Vector
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.formats.AbstractFormat} [options.format=new geotoolkit.map.sources.formats.GeoJSON()] the remote features format
 */
geotoolkit.map.sources.GeoJSON = {};

/**
 * Vector source that allows user to get features from remote resource in KML (Keyhole Markup Language) format
 * @class geotoolkit.map.sources.KML
 * @augments geotoolkit.map.sources.Vector
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.formats.AbstractFormat} [options.format=new geotoolkit.map.sources.formats.KML()] the remote features format
 */
geotoolkit.map.sources.KML = {};

/**
 * Vector source that allows user to get features from WFS (Web Feature Service) server
 * @class geotoolkit.map.sources.WFS
 * @augments geotoolkit.map.sources.Vector
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.formats.AbstractFormat} [options.format=new geotoolkit.map.sources.formats.WFS()] the remote features format
 * @param {geotoolkit.map.sources.loaders.AbstractLoader} [options.loader=new geotoolkit.map.sources.loaders.WFS()] loader for loading server settings
 * @param {Array<string>|string} [options.featureTypes=null] featureType name(s) to receive from the server
 * @param {string} [options.version='1.1.0'] WFS version to use
 */
geotoolkit.map.sources.WFS = {};
    /**
     * Sets the featureTypes parameter sent to the server. The first one from the list is used, if no types provided
     * @param {Array<string>|string} [types] featureType name(s) to receive from the server
     * @returns {geotoolkit.map.sources.WFS} this
     */
    geotoolkit.map.sources.WFS.prototype.setFeatureTypes = function(types){};
    /**
     * Returns the featureTypes parameter sent to the server.
     * @returns {Array<string>|string|null} types featureType name(s) receiving from the server
     */
    geotoolkit.map.sources.WFS.prototype.getFeatureTypes = function(){};

/**
 * Image source that allows user to get map data as an image using the WMS (Web Map Service) server
 * @class geotoolkit.map.sources.WMS
 * @augments geotoolkit.map.sources.Image
 * @param {object} [options] options
 * @param {string} [options.imageformat=null] image format to use
 */
geotoolkit.map.sources.WMS = {};
    /**
     * Sets the image format to be used
     * @param {string} format image format to use (e.g. 'png')
     * @returns {geotoolkit.map.sources.WMS} this
     */
    geotoolkit.map.sources.WMS.prototype.setImageFormat = function(format){};
    /**
     * Returns the image format currently used
     * @returns {?string}
     */
    geotoolkit.map.sources.WMS.prototype.getImageFormat = function(){};
    /**
     * Sets the image transparency
     * @param {boolean} transparent image transparency
     * @returns {geotoolkit.map.sources.WMS} this
     */
    geotoolkit.map.sources.WMS.prototype.setTransparent = function(transparent){};
    /**
     * Returns the image current transparency
     * @returns {boolean}
     */
    geotoolkit.map.sources.WMS.prototype.getTransparent = function(){};
    /**
     * Sets WMS version to use
     * @param {string} version version to use (in '1.3.0' format)
     * @returns {geotoolkit.map.sources.WMS} this
     */
    geotoolkit.map.sources.WMS.prototype.setVersion = function(version){};
    /**
     * Returns WMS version currently used
     * @returns {string}
     */
    geotoolkit.map.sources.WMS.prototype.getVersion = function(){};

/**
 * Vector source that allows user to get features from remote resource in CSV (Comma-Separated Values) format
 * @class geotoolkit.map.sources.CSV
 * @augments geotoolkit.map.sources.Vector
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.formats.AbstractFormat} [options.format=new geotoolkit.map.sources.formats.CSV()] the remote features format
 * @param {string} [options.delimiter=','] data delimiter, ',' symbol is used for CSV format by default
 * @param {string|string[]} [options.longitudeField=['longitude','lon']] string(s) defining the field name(s) that holds the longitude (X) coordinate
 * @param {string|string[]} [options.latitudeField=['latitude','lat']] string(s) defining the field name(s) that holds the latitude (Y) coordinate
 */
geotoolkit.map.sources.CSV = {};
    /**
     * Sets the latitude coordinate field name(s)
     * @param {string|string[]} field latitude field name(s)
     * @returns {geotoolkit.map.sources.CSV} this
     */
    geotoolkit.map.sources.CSV.prototype.setLatitudeField = function(field){};
    /**
     * Returns the latitude coordinate field name(s)
     * @returns {string|string[]} field field name(s)
     */
    geotoolkit.map.sources.CSV.prototype.getLatitudeField = function(){};
    /**
     * Sets the longitude coordinate field name(s)
     * @param {string} field longitude field name(s)
     * @returns {geotoolkit.map.sources.CSV} this
     */
    geotoolkit.map.sources.CSV.prototype.setLongitudeField = function(field){};
    /**
     * Returns the longitude coordinate field name(s)
     * @returns {string|string[]} field field name(s)
     */
    geotoolkit.map.sources.CSV.prototype.getLongitudeField = function(){};

/**
 * Vector source that allows user to get features from remote resource in GeoRSS (Geographically Encoded Objects for RSS feeds) format
 * @class geotoolkit.map.sources.GeoRSS
 * @augments geotoolkit.map.sources.Vector
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.formats.AbstractFormat} [options.format=new geotoolkit.map.sources.formats.GeoRSS()] the remote features format
 */
geotoolkit.map.sources.GeoRSS = {};

/**
 * Vector source that allows user to get features from ArcGIS Stream server
 * @class geotoolkit.map.sources.Stream
 * @augments geotoolkit.map.sources.Vector
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.loaders.Stream} [options.loader=new geotoolkit.map.sources.loaders.Stream()] loader for loading server settings
 * @param {geotoolkit.map.sources.formats.Stream} [options.format=new geotoolkit.map.sources.formats.Stream()] the remote features format
 * @param {string} [options.token=null] authorization token (for ArcGIS stream servers if needed)
 */
geotoolkit.map.sources.Stream = {};

/**
 * Tile source that allows user to get tiles from the Bing Maps server
 * @class geotoolkit.map.sources.Bing
 * @augments geotoolkit.map.sources.Tile
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.loaders.AbstractLoader} [options.loader=new geotoolkit.map.sources.loaders.Bing()] loader for loading server settings
 * @param {string} [options.key=null] Bing Maps API key. Get yours at http://www.bingmapsportal.com/
 * @param {string} [options.culture='en-US'] the culture code to use for the request
 * @param {geotoolkit.map.sources.Bing.ImagerySet|string} [options.imagerySet='AerialWithLabels'] the type of imagery for request. See
 * geotoolkit.map.sources.Bing.ImagerySet enum for all imagery supported
 * @param {geotoolkit.util.Point} [options.centerPoint=null] the center point to use for the imagery
 * WARNING! center point is required for the Birdseye imagery and its varieties
 */
geotoolkit.map.sources.Bing = {};
    /**
     * The type of Bing imagery supported
     * @enum
     * @readonly
     */
    geotoolkit.map.sources.Bing.ImagerySet = {};
        /**
         * Aerial imagery
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.Aerial = "";
        /**
         * Aerial imagery with a road overlay
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.AerialWithLabels = "";
        /**
         * Aerial imagery with on-demand road overlay
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.AerialWithLabelsOnDemand = "";
        /**
         * Bird's eye (oblique-angle) imagery
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.Birdseye = "";
        /**
         * Bird's eye imagery with a road overlay
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.BirdseyeWithLabels = "";
        /**
         * The second generation Bird's eye (oblique-angle) imagery
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.BirdseyeV2 = "";
        /**
         * A dark version of the road maps
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.CanvasDark = "";
        /**
         * A lighter version of the road maps which also has some of the details such as hill shading disabled
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.CanvasLight = "";
        /**
         * A grayscale version of the road maps
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.CanvasGray = "";
        /**
         * Roads without additional imagery. Uses the legacy static tile service
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.Road = "";
        /**
         * Roads without additional imagery. Uses the dynamic tile service
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.RoadOnDemand = "";
        /**
         * Ordnance Survey imagery. This imagery is visible only for the London area
         * @type {string}
         */
        geotoolkit.map.sources.Bing.ImagerySet.OrdnanceSurvey = "";
    /**
     * Sets Bing imagery set
     * @param {string} imagerySet bing imagery set
     * @returns {geotoolkit.map.sources.Bing} this
     */
    geotoolkit.map.sources.Bing.prototype.setImagerySet = function(imagerySet){};
    /**
     * Sets Bing Maps API key
     * @param {string} key bing maps key
     * @returns {geotoolkit.map.sources.Bing} this
     */
    geotoolkit.map.sources.Bing.prototype.setKey = function(key){};
    /**
     * Sets Bing Maps culture code
     * @param {string} culture bing maps culture code
     * @returns {geotoolkit.map.sources.Bing} this
     */
    geotoolkit.map.sources.Bing.prototype.setCulture = function(culture){};
    /**
     * Sets Bing Maps center point
     * @param {geotoolkit.util.Point} point bing maps culture code
     * @returns {geotoolkit.map.sources.Bing} this
     */
    geotoolkit.map.sources.Bing.prototype.setCenterPoint = function(point){};

/**
 * Vector Tile source that allows user to get features from remote resource in Pbf format
 * @class geotoolkit.map.sources.VectorTile
 * @augments geotoolkit.map.sources.Vector
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.formats.VectorTile} [options.format=new geotoolkit.map.sources.formats.VectorTile()] the remote features format
 * @param {geotoolkit.map.sources.loaders.VectorTile} [options.format=new geotoolkit.map.sources.loaders.VectorTile()] the remote features format
 * @param {string} [options.styleUrl=null] features drawing styles file url, if no set default styles are used
 */
geotoolkit.map.sources.VectorTile = {};

/**
 * Vector source that allows user to get features from remote resource in Lerc (Limited Error Raster Compression) format
 * Vector query mode cannot be changed, it is set to 'Bbox' permanently.
 * @class geotoolkit.map.sources.Lerc
 * @augments geotoolkit.map.sources.Vector
 * @param {object} [options] source options
 * @param {number} [options.format=new geotoolkit.map.sources.formats.Lerc({'symbolTileSize': 50})] format for the server data requests formatting
 */
geotoolkit.map.sources.Lerc = {};

/**
 * Manages {@link geotoolkit.map.features.IFeature}-to-{@link geotoolkit.scene.Node} logic used by
 * {@link geotoolkit.map.layers.Template} class or its inheritants
 *
 * @class geotoolkit.map.features.templates.BaseTemplate
 *
 * @param {!object} options options
 *
 * @param {!geotoolkit.scene.Node} options.shape carnac shape to visualize a feature instance
 * @param {!geotoolkit.map.features.adapters.IGeometryToShape} options.geometrytoshape feature geometry to carnac shape state adapter
 * @param {!geotoolkit.map.features.adapters.IGeometryToText} options.geometrytotext feature geometry to text shape state adapter
 * @param {function} [options.shapecallback] callback to modify template's shape parameter(s) dynamically (see example below)
 * @example
 * var myShapeCallback = function(feature, shape) {
 * if(feature.getId()=='Houston')
 * shape.setFillStyle({ 'color': 'red' });
 * };
 */
geotoolkit.map.features.templates.BaseTemplate = {};
    /**
     * Gets template options
     *
     * @returns {object}
     */
    geotoolkit.map.features.templates.BaseTemplate.prototype.getOptions = function(){};
    /**
     * Sets template options. For the new options to take effect on layer, the layer has to be invalidated.
     *
     * @param {!object} options options
     * @param {geotoolkit.scene.Node} [options.shape] carnac shape associated with a feature
     * @param {geotoolkit.map.features.adapters.IGeometryToShape} [options.geometrytoshape] feature_geometry-to-shape_geometry adapter
     * @param {geotoolkit.map.features.adapters.IGeometryToText} [options.geometrytotext] feature_geometry-to-text_anchor_position adapter
     * @param {function} [options.shapecallback] shape callback function
     *
     * @returns {geotoolkit.map.features.templates.BaseTemplate} this
     */
    geotoolkit.map.features.templates.BaseTemplate.prototype.setOptions = function(options){};
    /**
     * Gets {@link geotoolkit.scene.Node} carnac shape associated with a feature
     *
     * @returns {geotoolkit.scene.Node} carnac shape
     */
    geotoolkit.map.features.templates.BaseTemplate.prototype.getShape = function(){};
    /**
     * Gets feature_geometry-to-shape_geometry adapter
     *
     * @returns {geotoolkit.map.features.adapters.IGeometryToShape}
     */
    geotoolkit.map.features.templates.BaseTemplate.prototype.getGeometryToShape = function(){};
    /**
     * Gets feature_geometry-to-text_anchor_position adapter
     *
     * @returns {geotoolkit.map.features.adapters.IGeometryToText}
     */
    geotoolkit.map.features.templates.BaseTemplate.prototype.getGeometryToText = function(){};
    /**
     * Gets {geotoolkit.scene.shapes.Text} text shape for annotations
     *
     * @returns {geotoolkit.scene.shapes.Text}
     */
    geotoolkit.map.features.templates.BaseTemplate.prototype.getTextShape = function(){};
    /**
     * Gets optional shape callback
     *
     * @returns {?function}
     */
    geotoolkit.map.features.templates.BaseTemplate.prototype.getShapeCallback = function(){};

/**
 * Manages {@link geotoolkit.map.features.Point}-to-{@link geotoolkit.scene.shapes.Symbol}
 * logic used by {@link geotoolkit.map.layers.Template} class
 *
 * @class geotoolkit.map.features.templates.Point
 * @augments geotoolkit.map.features.templates.BaseTemplate
 * @param {object} [options] options
 */
geotoolkit.map.features.templates.Point = {};

/**
 * Manages {@link geotoolkit.map.features.LineString}-to-{@link geotoolkit.scene.shapes.Polyline}
 * logic used by {@link geotoolkit.map.layers.Template} class
 *
 * @class geotoolkit.map.features.templates.LineString
 * @augments geotoolkit.map.features.templates.BaseTemplate
 * @param {object} [options] options
 */
geotoolkit.map.features.templates.LineString = {};

/**
 * Manages {@link geotoolkit.map.features.Polygon}-to-{@link geotoolkit.scene.shapes.Polygon}
 * logic used by {@link geotoolkit.map.layers.Template} class
 *
 * @class geotoolkit.map.features.templates.Polygon
 * @augments geotoolkit.map.features.templates.BaseTemplate
 * @param {object} [options] options
 */
geotoolkit.map.features.templates.Polygon = {};

/**
 * Manages {@link geotoolkit.map.features.Aggregation}-to-{@link geotoolkit.scene.shapes.Symbol}
 * logic used by {@link geotoolkit.map.layers.Template} class
 *
 * @class geotoolkit.map.features.templates.Aggregation
 * @augments geotoolkit.map.features.templates.BaseTemplate
 * @param {object} options template options
 * @param {geotoolkit.scene.shapes.AnchoredShape} [options.shape=new geotoolkit.scene.shapes.Symbol()] carnac shape to visualize aggregation feature
 * @param {geotoolkit.scene.shapes.AnchoredShape} [options.expandedshape=new geotoolkit.scene.shapes.Symbol()] carnac shape to visualize
 * expanded aggregation feature (if geotoolkit.map.tools.AggregationSelection tool is used)
 * @param {geotoolkit.util.ColorProvider} [options.colorprovider=null] color provider to change shape fill color depending on
 * aggregation size (number of points aggregated)
 * @param {geotoolkit.util.ColorProvider} [options.expandedcolorprovider=new geotoolkit.util.DefaultColorProvider()] color provider to change shape fill color depending on
 * expanded aggregation level (0 for root, 1 for its children, etc.)
 * @param {geotoolkit.scene.shapes.Line} [options.expandedline=new geotoolkit.scene.shapes.Line()] line to connect expanded aggregation with its child (set visible false if no needed)
 */
geotoolkit.map.features.templates.Aggregation = {};
    /**
     * Sets template options. For the new options to take effect on layer, the layer has to be invalidated.
     *
     * @param {!object} options options
     * @param {geotoolkit.scene.Node} [options.shape] carnac shape associated with a feature
     * @param {geotoolkit.map.features.adapters.IGeometryToShape} [options.geometrytoshape] feature_geometry-to-shape_geometry adapter
     * @param {geotoolkit.map.features.adapters.IGeometryToText} [options.geometrytotext] feature_geometry-to-text_anchor_position adapter
     * @param {function} [options.shapecallback] shape callback function
     *
     * @returns {geotoolkit.map.features.templates.Aggregation} this
     */
    geotoolkit.map.features.templates.Aggregation.prototype.setOptions = function(options){};

/**
 * Defines a Map Layer, an Abstract class that will be used by the Map.
 * Map layer represents the geographic layer which can be a tile layer, map layer or any custom layer. <br>
 * addLayer(), insertLayer() and removeLayer() is used to add and remove layers.
 *
 * @class geotoolkit.map.layers.AbstractLayer
 * @augments geotoolkit.scene.Node
 * @param {object} [options] options (see "setOptions" method for details)
 * @param {geotoolkit.map.sources.AbstractSource} [options.source=null] the layer data source
 * @param {geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem} [options.system=geotoolkit.map.GeodeticSystem.WGS84] coordinate system this layer's data is in
 * @param {geotoolkit.renderer.IFilter} [options.layerfilter] layer filter
 */
geotoolkit.map.layers.AbstractLayer = {};
    /**
     * @override
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getWorldTransform = function(){};
    /**
     * Return visible model limits
     * @param {boolean} [ignoreModelLimits=false] flag defines whether to ignore ModelLimits or not
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getVisibleModelLimits = function(ignoreModelLimits){};
    /**
     * Gets user defined model limits if set; calculated model limits otherwise
     * @returns {?geotoolkit.util.Rect} limits user defined or calculated model limits
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getModelLimits = function(){};
    /**
     * Sets model limits
     * @param {?geotoolkit.util.Rect} limits new model limits
     * @returns {geotoolkit.map.layers.AbstractLayer} this
     */
    geotoolkit.map.layers.AbstractLayer.prototype.setModelLimits = function(limits){};
    /**
     * Gets calculated model limits
     *
     * @returns {?geotoolkit.util.Rect} limits calculated model limits
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getDefaultModelLimits = function(){};
    /**
     * Returns default model limits (based on the map coordinate system)
     * @protected
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.calculateDefaultModelLimits = function(){};
    /**
     * Return a the alpha of the layer
     * between 0.0 (fully transparent) and 1.0 (fully opaque). The default value is 1.0.
     * @returns {number} alpha alpha
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getLayerAlpha = function(){};
    /**
     * Set the alpha of the layer
     * @param {number} alpha between 0.0 (fully transparent) and 1.0 (fully opaque). The default value is 1.0.
     * @returns {geotoolkit.map.layers.AbstractLayer} this
     */
    geotoolkit.map.layers.AbstractLayer.prototype.setLayerAlpha = function(alpha){};
    /**
     * Gets options
     * @returns {object} options options
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getOptions = function(){};
    /**
     * Sets options (default options listed are for construction time only)
     *
     * @param {object} [options] options
     * @param {number} [options.limits=null] limits of this layer
     * @param {geotoolkit.renderer.IFilter} [options.layerfilter=null] layer drawing filter (default "layerfilter=null" means layer _is_ drawn)
     * @param {number} [options.alpha] the alpha of the layer
     * @returns {geotoolkit.map.layers.AbstractLayer}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.setOptions = function(options){};
    /**
     * Return coordinate system for this layer
     *
     * @returns {geotoolkit.map.coordinatesystems.AbstractSystem}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getCoordinateSystem = function(){};
    /**
     * Set vertical flip of the representation
     *
     * @param {boolean} flip flag to set the vertical flip of the representation
     * @returns {geotoolkit.map.layers.AbstractLayer} this
     */
    geotoolkit.map.layers.AbstractLayer.prototype.setVerticalFlip = function(flip){};
    /**
     * Return true if the representation is flipped vertically
     *
     * @returns {boolean} flip vertical flip flag
     */
    geotoolkit.map.layers.AbstractLayer.prototype.isVerticalFlip = function(){};
    /**
     * Renders layer
     *
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.AbstractLayer.prototype.render = function(context){};
    /**
     * Renders layer content
     * @function
     * @abstract
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.AbstractLayer.prototype.renderContent = function(context){};
    /**
     * Sets cache to be used to cache
     *
     * @param {geotoolkit.scene.Cache} cache cache to be used
     * @returns {geotoolkit.map.layers.AbstractLayer} this
     */
    geotoolkit.map.layers.AbstractLayer.prototype.setCache = function(cache){};
    /**
     * Invalidate layer
     * @param {geotoolkit.util.Rect | undefined | null} [bounds] bounds of the invalid rectangle in the inner node coordinates
     * @param {boolean} [force=false] true if parent should be invalidated immediately
     * if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
     * @returns {geotoolkit.map.layers.AbstractLayer} this
     */
    geotoolkit.map.layers.AbstractLayer.prototype.invalidate = function(bounds, force){};
    /**
     * Return cache strategy to be used to cache children nodes
     *
     * @returns {geotoolkit.scene.Cache} cache cache strategy
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getCache = function(){};
    /**
     * Clear cache
     * @returns {geotoolkit.map.layers.AbstractLayer} this
     */
    geotoolkit.map.layers.AbstractLayer.prototype.clearCache = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {object} [properties] JSON containing the properties
     * @returns {string|null} [properties.url] the server url from the layer source
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * see {@link geotoolkit.map.layers.AbstractLayer#getProperties}
     * @param {object} [properties] JSON containing the properties to set
     * @returns {geotoolkit.map.layers.AbstractLayer} this
     */
    geotoolkit.map.layers.AbstractLayer.prototype.setProperties = function(properties){};
    /**
     * Return a map coordinate system
     * @returns {geotoolkit.map.coordinatesystems.AbstractSystem}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getMapCoordinateSystem = function(){};
    /**
     * Sets a map coordinate system
     * @param {geotoolkit.map.coordinatesystems.AbstractSystem | geotoolkit.map.GeodeticSystem | number} [system] new map coordinate system
     * @returns {geotoolkit.map.layers.AbstractLayer}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.setMapCoordinateSystem = function(system){};
    /**
     * Transform point
     * @param {geotoolkit.util.Point} [point] point to transform
     * @param {geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem} from system converting from
     * @param {geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem } to system converting to
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point | null}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.transformPoint = function(point, from, to, dst){};
    /**
     * Transform a point from layer coordinate system to map coordinate system
     * @param {geotoolkit.util.Point} [point] point to transform
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.transformToMap = function(point, dst){};
    /**
     * Transform a point from map coordinate system to layer coordinate system
     * @param {geotoolkit.util.Point} [point] point to transform
     * @param {geotoolkit.util.Point} [dst] optional destination point
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.transformFromMap = function(point, dst){};
    /**
     * Sets the url to the layer source
     * @param {string} url server url
     * @returns {geotoolkit.map.layers.AbstractLayer}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.setServerURL = function(url){};
    /**
     * Gets the server url from the layer source
     * @returns {string}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getServerURL = function(){};
    /**
     * Disposes this layer, once disposed it should not be used anymore.<br>
     * @override
     */
    geotoolkit.map.layers.AbstractLayer.prototype.dispose = function(){};
    /**
     * Returns current data source
     * @returns {geotoolkit.map.sources.AbstractSource} source
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getDataSource = function(){};
    /**
     * Performs selection of the data with its device coordinates. Returns null, if no data available but will be loaded
     * asynchronously later (fires geotoolkit.map.sources.Events.InfoUpdated).
     *
     * @param {geotoolkit.util.Point} pt is the device coordinates to select
     * @param {number} [radius=2] the radius of selection (in px)
     * @returns {null|Array} data data selected
     */
    geotoolkit.map.layers.AbstractLayer.prototype.hitTest = function(pt, radius){};
    /**
     * Returns the format function to use for the tooltip info (null if tooltips are not visible)
     * @returns {?object|function}
     */
    geotoolkit.map.layers.AbstractLayer.prototype.getTooltipFormatter = function(){};

/**
 * This layer is a collection of features (see {@link geotoolkit.map.features.IFeature}).<br>
 * addFeature() and removeFeature() are used to add and remove features; getFeatures() to iterate.
 *
 * @class geotoolkit.map.layers.AbstractFeatureLayer
 * @augments geotoolkit.map.layers.AbstractLayer
 *
 * @param {object} [options] options (see "setOptions" method for more details)
 *
 * @param {object} [options.features] features options
 * @param {geotoolkit.map.features.filters.IFilter|Array} [options.features.filter=null] features filter(s)
 *
 * @param {object} [options.annotations] annotations options
 * @param {geotoolkit.map.features.filters.IFilter|Array} [options.annotations.filter=null] annotations filter(s)
 * @param {boolean} [options.annotations.visible=false] annotations visibility flag
 * @param {geotoolkit.map.features.strategies.IGetAnnotation} [options.annotations.strategy=new geotoolkit.map.features.strategies.AnnotationById()] annotation strategy
 * @param {object|geotoolkit.scene.shapes.Text} [options.annotations.text] JSON-object or text shape instance (see {@link geotoolkit.scene.shapes.Text} constructor JSON-object for details)
 * @param {boolean} [options.annotations.text.preservereadingorientation=true] preservereadingorientation flag
 * (if options.annotations.text is JSON-object then and only then its <b>preservereadingorientation=true</b> default value is acknowledged)
 * @param {boolean} [options.annotations.text.ispointingup=true] ispointingup flag
 * (if options.annotations.text is JSON-object then and only then its <b>ispointingup=true</b> default value is acknowledged)
 * @param {object} [options.tooltip] tooltip options
 * @param {boolean} [options.tooltip.visible=false] tooltip visibility flag
 * @param {function|object} [options.tooltip.formatter=new geotoolkit.map.features.formatters.SingleField()] tooltip data formatter
 *
 * @param {geotoolkit.map.features.converters.BaseConverter} [options.converters=null] converter that is used for vector data conversions
 */
geotoolkit.map.layers.AbstractFeatureLayer = {};
    /**
     * Feature layer events.
     * @enum
     * @readonly
     */
    geotoolkit.map.layers.AbstractFeatureLayer.Events = {};
        /**
         * Features updated
         * @type {string}
         */
        geotoolkit.map.layers.AbstractFeatureLayer.Events.FeaturesUpdated = "";
    /**
     * Gets features iterator
     * @param {geotoolkit.map.util.Query|function} [filter=null] features query filter.
     * @returns {geotoolkit.util.Iterator} feature iterator (over all features if filter is null)
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.getFeatures = function(filter){};
    /**
     * Gets feature_geometry-to-text_anchor_position adapter
     * @function
     * @abstract
     * @param {geotoolkit.map.features.IFeature} [feature] feature to get adapter for
     * @returns {geotoolkit.map.features.adapters.IGeometryToText}
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.getGeometryToText = function(feature){};
    /**
     * Gets feature by feature id.
     *
     * @param {number|string} id feature identifier
     * @returns {?geotoolkit.map.features.IFeature} feature if found; null otherwise
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.getFeatureById = function(id){};
    /**
     * queries layer for items that match the search
     *
     * @param {geotoolkit.map.util.Query|function} query query
     * @returns {Array<geotoolkit.map.features.IFeature>} features selected features
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.queryFeatures = function(query){};
    /**
     * Renders features. The basic implementations iterates over the features provided and
     * renders them if derived from {@link geotoolkit.scene.Node}.
     *
     * @param {geotoolkit.util.Iterator} featuresIt features iterator
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.renderFeatures = function(featuresIt, context){};
    /**
     * Renders annotations (to filtered features only)
     *
     * @param {geotoolkit.util.Iterator} featuresIt features iterator
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.renderAnnotations = function(featuresIt, context){};
    /**
     * Renders content. The implementation:
     * 1. Applies features filter(s) if set;
     * 2. Execute "renderFeatures";
     * If annotations visible then:
     * 3. Applies annotations filter(s) if set;
     * 4. Execute "renderAnnotations"
     *
     * @param {geotoolkit.renderer.RenderingContext} context to render layer
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.renderContent = function(context){};
    /**
     * Sets a map coordinate system
     * @param {geotoolkit.map.coordinatesystems.AbstractSystem | geotoolkit.map.GeodeticSystem} system coordinate system
     * @returns {geotoolkit.map.layers.AbstractFeatureLayer} this
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.setMapCoordinateSystem = function(system){};
    /**
     * Returns the tooltip formatter or format function to use (null if tooltips are not visible)
     * @override
     * @returns {?object|function}
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.getTooltipFormatter = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {object} properties JSON containing the properties
     * @returns {boolean} properties.annotations annotations visibility flag
     * @returns {boolean} properties.tooltip tooltip visibility flag
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * see {@link geotoolkit.map.layers.AbstractFeatureLayer#getProperties}
     * @override
     * @param {object} [properties] JSON containing the properties to set
     * @returns {geotoolkit.map.layers.AbstractFeatureLayer} this
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.setProperties = function(properties){};
    /**
     * Sets options
     * @param {object} [options] options
     * @param {object} [options.features] features options
     * @param {geotoolkit.map.features.filters.IFilter|Array} [options.features.filter] features filter(s)
     * @param {object} [options.annotations] annotations options
     * @param {object} [options.annotations.text] annotations text options
     * @param {geotoolkit.attributes.TextStyle} [options.annotations.text.textstyle] text style for annotations
     * @param {geotoolkit.util.AnchorType} [options.annotations.text.alignment] anchor point for the annotations
     * @param {function} [options.annotations.strategy] function that takes the node and layer, then returns the annotation text
     * @param {boolean} [options.annotations.visible] boolean for visibility of annotations
     *
     * @param {object} [options.annotations] annotations options
     * @param {geotoolkit.map.features.filters.IFilter|Array} [options.annotations.filter] annotations filter(s)
     * @param {object|geotoolkit.scene.shapes.Text} [options.annotations.text] JSON-object or text shape instance (see {@link geotoolkit.scene.shapes.Text} for details)
     * @param {geotoolkit.map.features.strategies.IGetAnnotation} [options.annotations.strategy] annotation strategy
     *
     * @returns {geotoolkit.map.layers.AbstractFeatureLayer} this
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.setOptions = function(options){};
    /**
     * Converts layer features into GeoJSON format
     * @returns {object} geoJson geoJson object
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.toGeoJSON = function(){};
    /**
     * Disposes this layer, once disposed it should not be used anymore.<br>
     * @override
     */
    geotoolkit.map.layers.AbstractFeatureLayer.prototype.dispose = function(){};

/**
 * The layer uses {@link geotoolkit.map.features.templates.BaseTemplate} instance(s)
 * to render its {@link geotoolkit.map.features.IFeature} elements.
 *
 * @class geotoolkit.map.layers.Template
 * @augments geotoolkit.map.layers.AbstractFeatureLayer
 *
 * @param {!object} options options (see {@link geotoolkit.map.layers.AbstractFeatureLayer#setOptions setOptions} method for parent class options)
 * @param {!object|Array<object>} options.templates shape template(s) to visualize features (see example below)
 * @param {object} [options.annotations] annotations options
 * @param {boolean} [options.annotations.visibleonzoom=false] annotations visibility on zoom

 *
 * @example
 * var layer = new geotoolkit.map.layers.Template({
 * 'templates': {
 * 'featureclassname': geotoolkit.map.features.Point.getClassName(),
 * 'template': new geotoolkit.map.features.templates.BaseTemplate({
 * 'shape': circle,
 * 'geometrytoshape': geometryToAnchor,
 * 'geometrytotext': geometryToAnchor
 * })
 * }
 * });
 */
geotoolkit.map.layers.Template = {};
    /**
     * If no features provided then resets all shape templates to their initial states;<br>
     * otherwise resets specific templates for the features provided
     * @param {geotoolkit.map.features.IFeature|Array<geotoolkit.map.features.IFeature>|geotoolkit.util.Iterator} [features]
     * features to reset their specific template(s) to a default one
     * @param {boolean} [suppressInvalidate=false] suppress layer invalidation flag
     * @returns {geotoolkit.map.layers.Template}
     */
    geotoolkit.map.layers.Template.prototype.resetFeatureTemplates = function(features, suppressInvalidate){};
    /**
     * Gets template associated with a feature or its class name
     * @param {geotoolkit.map.features.IFeature|string} parameter reference to a feature instance OR feature class name
     * @returns {?object} template
     */
    geotoolkit.map.layers.Template.prototype.getTemplate = function(parameter){};
    /**
     * Sets template associated with a feature or features
     *
     * @param {string|geotoolkit.map.features.IFeature|geotoolkit.util.Iterator|Array<geotoolkit.map.features.IFeature>} parameter feature class name OR reference to a feature instance OR feature iterator
     *
     * @param {!object} template feature(s) template or feature class template
     * @param {!geotoolkit.scene.Node} [template.shape] carnac shape to visualize a feature instance
     * @param {!function} [template.geometrytoshape] feature geometry to carnac shape state converter
     * @param {!function} [template.geometrytotext] feature geometry to text shape state converter
     * @param {boolean} [suppressInvalidate=false] suppress layer invalidatation flag
     * @returns {geotoolkit.map.layers.Template}
     */
    geotoolkit.map.layers.Template.prototype.setTemplate = function(parameter, template, suppressInvalidate){};
    /**
     * The implementation builds default limits from scratch if no iterator is provided;
     * otherwise, it extends previously calculated limits with limits calculated over new features.
     * @protected
     * @override
     * @param {geotoolkit.util.Iterator|Array} [features] iterator or array of the new features
     */
    geotoolkit.map.layers.Template.prototype.calculateDefaultModelLimits = function(features){};
    /**
     * updates the geometry for the feature in this layer
     *
     * @param {geotoolkit.map.features.IFeature} feature feature to be modified
     * @param {object} geometry the geometry to be set on the feature
     * @returns {geotoolkit.map.layers.Template}
     */
    geotoolkit.map.layers.Template.prototype.updateGeometry = function(feature, geometry){};
    /**
     * Adds feature(s)
     *
     * @param {geotoolkit.map.features.IFeature | Array<geotoolkit.map.features.IFeature> | geotoolkit.util.Iterator} parameter feature(s) to be added
     * @returns {geotoolkit.map.layers.Template}
     * @throws {Error} if a feature to add is not supported
     */
    geotoolkit.map.layers.Template.prototype.addFeature = function(parameter){};
    /**
     * Removes feature(s)
     *
     * @param {geotoolkit.map.features.IFeature | Array<geotoolkit.map.features.IFeature> | geotoolkit.util.Iterator} parameter feature(s) to be removed
     * @returns {geotoolkit.map.layers.Template} this
     */
    geotoolkit.map.layers.Template.prototype.removeFeature = function(parameter){};
    /**
     * Removes all feature(s)
     *
     * @returns {geotoolkit.map.layers.Template} this
     */
    geotoolkit.map.layers.Template.prototype.clearFeatures = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.layers.Template.prototype.render = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.layers.Template.prototype.renderContent = function(){};
    /**
     * Renders features.<br>
     * NOTE:<br>
     * When picking is performed, then feature is selected if its shape gets picked.
     *
     * @param {geotoolkit.util.Iterator} featuresIt iterator over filtered features
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.Template.prototype.renderFeatures = function(featuresIt, context){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.layers.Template.prototype.getModelLimits = function(){};
    /**
     * Gets feature_geometry-to-text_anchor_position adapter
     *
     * @param {geotoolkit.map.features.IFeature} feature feature to get adapter for
     * @returns {geotoolkit.map.features.adapters.IGeometryToText}
     */
    geotoolkit.map.layers.Template.prototype.getGeometryToText = function(feature){};
    /**
     * Renders annotations (to filtered features only)
     *
     * @param {geotoolkit.util.Iterator} featuresIt features iterator
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.Template.prototype.renderAnnotations = function(featuresIt, context){};
    /**
     * Performs selection of the features with its device coordinates
     * @param {geotoolkit.util.Point} pt is the device coordinates received by mouse event
     * @param {number} [radius=2] the radius of selection (in px)
     * @returns {Array<geotoolkit.map.features.AbstractFeature>} features features selected
     */
    geotoolkit.map.layers.Template.prototype.hitTest = function(pt, radius){};
    /**
     * Sets a map coordinate system
     * @param {geotoolkit.map.coordinatesystems.AbstractSystem | geotoolkit.map.GeodeticSystem} system coordinate system
     * @returns {geotoolkit.map.layers.Template} this
     */
    geotoolkit.map.layers.Template.prototype.setMapCoordinateSystem = function(system){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.layers.Template.prototype.onFeaturesUpdated = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.layers.Template.prototype.invalidate = function(){};

/**
 * The Image layer is an image received from a server and drawn on the canvas. Varieties (inheritors) of this case are WMS and ArcGISImage layers.
 * This layer connects to the server and displays a single image layer from that server.
 * @class geotoolkit.map.layers.Image
 * @augments geotoolkit.map.layers.AbstractLayer
 * @param {object} [options] options
 */
geotoolkit.map.layers.Image = {};
    /**
     * Renders layer
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.Image.prototype.render = function(context){};
    /**
     * Renders layer content
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.Image.prototype.renderContent = function(context){};
    /**
     * Gets the JSON data of the available layers for the server
     * @returns {object | null}
     */
    geotoolkit.map.layers.Image.prototype.getLayers = function(){};
    /**
     * Returns the server layer names that are requested.
     * @returns {Array<string>|null} layers
     */
    geotoolkit.map.layers.Image.prototype.getVisibleLayers = function(){};
    /**
     * Adds the passed in ID's to the list of layers to show
     * @param {number | Array<number>} id id(s) for the layer(s) to show
     * @returns {geotoolkit.map.layers.Image}
     */
    geotoolkit.map.layers.Image.prototype.showLayers = function(id){};
    /**
     * Adds the passed in ID's to the list of layers to hide
     * @param {number | Array<number>} [id] ID(s) for the layers to show
     * @returns {geotoolkit.map.layers.Image}
     */
    geotoolkit.map.layers.Image.prototype.hideLayers = function(id){};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {object} properties JSON containing the properties
     * @returns {Array<string>|null} properties.showlayers the server layer names that are requested
     */
    geotoolkit.map.layers.Image.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * see {@link geotoolkit.map.layers.Image#getProperties}
     * @param {object} [properties] JSON containing the properties to set
     * @returns {geotoolkit.map.layers.Image} this
     */
    geotoolkit.map.layers.Image.prototype.setProperties = function(properties){};

/**
 * Vector layer differs from the others in that it does not draw pictures, but vector data (called "features"): points, polylines and polygons. <br>
 * These features can be either used as additional information for drawing on top of another layer — for example, set of points-capitals from the maplayers.html tutorial — or cover the entire space and not requiring any background.<br>
 * Most of the layers — ArcGISFeature, CSV, GeoJSON, GeoRSS, KML, WFS, etc. — are vector and allows to automatically parse vector data and drawing styles from different formats.
 * The implementation is capable of loading features data from files (objects) in different formats.<br>
 * It has following predefined shape templates:<br>
 * 'templates': [ <br>
 * { 'featureclassname': geotoolkit.map.features.Polygon.getClassName(), 'template': new geotoolkit.map.features.templates.Polygon() },<br>
 * { 'featureclassname': geotoolkit.map.features.MultiPolygon.getClassName(), 'template': new geotoolkit.map.features.templates.Polygon() },<br>
 * { 'featureclassname': geotoolkit.map.features.LineString.getClassName(), 'template': new geotoolkit.map.features.templates.LineString() },<br>
 * { 'featureclassname': geotoolkit.map.features.MultiLineString.getClassName(), 'template': new geotoolkit.map.features.templates.LineString() },<br>
 * { 'featureclassname': geotoolkit.map.features.Point.getClassName(), 'template': new geotoolkit.map.features.templates.Point() },<br>
 * { 'featureclassname': geotoolkit.map.features.MultiPoint.getClassName(), 'template': new geotoolkit.map.features.templates.Point() }<br>
 * ]
 *
 * @class geotoolkit.map.layers.Vector
 * @augments geotoolkit.map.layers.Template
 *
 * @param {object} [options] options
 * @param {string} [options.idfield=name] field that contains the id for this shape
 * @param {object|string} [options.data] data object (or its string representation) containing the features data @deprecated since 2.6
 */
geotoolkit.map.layers.Vector = {};
    /**
     * Parses features from the data object and adds it to the layer
     * @param {string|object} data data object (or its string representation) containing the features data in a specific format
     * @returns {geotoolkit.map.layers.Vector} this
     */
    geotoolkit.map.layers.Vector.prototype.loadData = function(data){};
    /**
     * Sets the unique identifier for the features
     * @param {string} field unique identifier
     * @returns {geotoolkit.map.layers.Vector} this
     */
    geotoolkit.map.layers.Vector.prototype.setUniqueField = function(field){};
    /**
     * Gets the unique identifier for the dataset
     * @returns {string}
     * @deprecated use geotoolkit.map.sources.ArcGISFeature.getUniqueField instead
     */
    geotoolkit.map.layers.Vector.prototype.getUniqueField = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {object} [props] JSON containing properties
     * @returns {string} [props.idfield] field that contains the id for this shape
     */
    geotoolkit.map.layers.Vector.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * see {@link geotoolkit.map.layers.Vector#getProperties}
     * @override
     * @param {object} [properties] JSON containing the properties to set
     * @returns {geotoolkit.map.layers.Vector} this
     */
    geotoolkit.map.layers.Vector.prototype.setProperties = function(properties){};

/**
 * Tile layer connects to the server and displays a layer created from the server tiles.
 * It consists of a several images (tiles) painted next to each other and thus forming a complete picture. The example of this approach is the Bing layer.
 * @class geotoolkit.map.layers.Tile
 * @augments geotoolkit.map.layers.AbstractLayer
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.Tile} [options.source=new geotoolkit.map.sources.Tile()] tile source
 * @param {function} [options.formatterfunction=null] the function that takes z, y, x and turns that into tile location
 * @param {number} [options.tilewidth=256] width for the tiles to use (in px)
 * @param {number} [options.tileheight=256] height for the tiles to use (in px)
 * @param {number} [options.imagepool=400] the amount of cache for the tile images
 * @param {number} [options.minlod=0] the minimum level of details for the tiles
 * @param {number} [options.maxlod=15] the maximum level of details for the tiles
 * @example
 * // To create a map based on Esri ArcGIS Tile Map.
 * curMap = new geotoolkit.map.Map();
 * curLayer = new geotoolkit.map.layers.Tile({
 * 'url': 'https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/',
 * 'minlod': 0,
 * 'maxlod': 24,
 * 'formatterfunction': function (z, y, x) {
 * return z + '/' + y + '/' + x + '.png';
 * }
 * });
 * curMap.addLayer(curLayer);
 */
geotoolkit.map.layers.Tile = {};
    /**
     * Renders layer
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.Tile.prototype.render = function(context){};
    /**
     * Renders layer content
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.Tile.prototype.renderContent = function(context){};
    /**
     * Gets the minimum Lod for the server
     * @returns {number}
     */
    geotoolkit.map.layers.Tile.prototype.getMinLod = function(){};
    /**
     * Gets the maximum Lod for the server
     * @returns {number}
     */
    geotoolkit.map.layers.Tile.prototype.getMaxLod = function(){};
    /**
     * Returns current tile resolution (in px)
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.map.layers.Tile.prototype.getTileResolution = function(){};
    /**
     * Sets image format for the server
     * This converts the z, x, y image indexes into a path that is added to the server param to locate
     * the requested tile.
     *
     * @param {function} formatter image formatter
     * @returns {geotoolkit.map.layers.Tile} this
     */
    geotoolkit.map.layers.Tile.prototype.setImageFormatter = function(formatter){};
    /**
     * Gets the current formatter function if the function format is used
     * @returns {function}
     */
    geotoolkit.map.layers.Tile.prototype.getImageFormatter = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {object} props JSON containing properties
     * @returns {number} props.tilewidth width for the tiles to use (in px)
     * @returns {number} props.tileheight height for the tiles to use (in px)
     * @returns {number} props.minlod the minimum level of details for the tiles
     * @returns {number} props.maxlod the maximum level of details for the tiles
     * @returns {function} props.formatterfunction the function that takes z, y, x and turns that into tile location
     */
    geotoolkit.map.layers.Tile.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * see {@link geotoolkit.map.layers.Tile#getProperties}
     * @param {object} [properties] JSON containing the properties to set
     * @returns {geotoolkit.map.layers.Tile} this
     */
    geotoolkit.map.layers.Tile.prototype.setProperties = function(properties){};
    /**
     * Sets the min/max numbers of details for the server
     * @param {number} min minimum Lod
     * @param {number} max maximum Lod
     * @returns {geotoolkit.map.layers.Tile} this
     */
    geotoolkit.map.layers.Tile.prototype.setLods = function(min, max){};
    /**
     * Gets map zoom level
     * @returns {number}
     */
    geotoolkit.map.layers.Tile.prototype.getZoomLevel = function(){};
    /**
     * Sets the resolution of the tiles from the server
     * @param {number} width tile width (in px)
     * @param {number} height tile height (in px)
     * @returns {geotoolkit.map.layers.Tile} this
     */
    geotoolkit.map.layers.Tile.prototype.setTileResolution = function(width, height){};

/**
 * The Shape layer is a collection of geotoolkit shapes (polylines, polygons, symbols, etc.)<br>
 * In essence, it copies the functionality of the Vector layer, but instead of features it displays shapes — features combined with its drawing style. <br>
 * This approach increases consumed memory, but it is comparatively easier to use. Also, not all objects can be represented by a point, polyline or polygon (for example, a bezier curve), which makes this layer more universal for some special cases.
 * @class geotoolkit.map.layers.Shape
 * @augments geotoolkit.map.layers.AbstractLayer
 * @param {object} [options] options (see {@link geotoolkit.map.layers.AbstractLayer} for details)
 * @param {object} [options.tooltip] tooltip options
 * @param {boolean} [options.tooltip.visible=false] tooltip visibility flag
 * @param {function} [options.tooltip.formatter=null] tooltip data formatter
 * @example
 * // to add a custom shape with fixed width and height
 * var customGroup = new geotoolkit.scene.Group()
 * .setModelLimits(new geotoolkit.util.Rect(0, 0, 100, 100))
 * .addChild([
 * new geotoolkit.scene.shapes.Path()
 * .moveTo(50, 0)
 * .lineTo(50, 100)
 * .moveTo(0, 50)
 * .lineTo(100, 50)
 * .setLineStyle({
 * 'color': 'blue',
 * 'width': 3,
 * 'pixelsnapmode': {'x': true, 'y': true}
 * })
 * ]);
 * var customSymbol = new geotoolkit.scene.shapes.Symbol({
 * 'ax': -12460000,
 * 'ay': 4055800,
 * 'width': 20,
 * 'height': 20,
 * 'alignment': geotoolkit.util.AnchorType.Center,
 * 'sizeisindevicespace': true,
 * 'painter': function (symbol, bbox, context) {
 * symbol.getTag()
 * .setBounds(bbox)
 * .render(context);
 * }
 * })
 * .setTag(customGroup);
 *
 * var circle = new geotoolkit.scene.shapes.Symbol({
 * 'ax': -12460000,
 * 'ay': 4055800,
 * 'width': 20,
 * 'height': 20,
 * 'alignment': geotoolkit.util.AnchorType.Center,
 * 'sizeisindevicespace': true,
 * 'linestyle': 'red',
 * 'fillstyle': 'yellow',
 * 'painter': geotoolkit.scene.shapes.painters.CirclePainter
 * });
 * layer.addShape(circle);
 * layer.addShape(customSymbol);
 */
geotoolkit.map.layers.Shape = {};
    /**
     * @protected
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.map.layers.Shape.prototype.calculateDefaultModelLimits = function(){};
    /**
     * Gets shapes iterator
     *
     * @param {function} [filter=null] a filter function.
     * @returns {geotoolkit.util.Iterator} feature iterator (over all features if filter is null)
     */
    geotoolkit.map.layers.Shape.prototype.getShapes = function(filter){};
    /**
     * Adds shape(s)
     *
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node> | geotoolkit.util.Iterator} parameter shape(s) to be added
     * @returns {geotoolkit.map.layers.Shape}
     */
    geotoolkit.map.layers.Shape.prototype.addShape = function(parameter){};
    /**
     * Removes shape(s) (and dispose them if needed)
     *
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node> | geotoolkit.util.Iterator} parameter shape(s) to be removed
     * @param {boolean} [dispose=false] dispose shape(s)
     * @returns {geotoolkit.map.layers.Shape} this
     */
    geotoolkit.map.layers.Shape.prototype.removeShape = function(parameter, dispose){};
    /**
     * Removes all shapes (and dispose them if needed)
     * @param {boolean} [dispose=false] automatically dispose shape(s)
     * @returns {geotoolkit.map.layers.Shape} this
     */
    geotoolkit.map.layers.Shape.prototype.clearShapes = function(dispose){};
    /**
     * Renders content
     *
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.map.layers.Shape.prototype.renderContent = function(context){};
    /**
     * Returns the format function to use (null if tooltips are not visible)
     * @override
     * @returns {?object|function}
     */
    geotoolkit.map.layers.Shape.prototype.getTooltipFormatter = function(){};
    /**
     * Performs selection of the shapes with its device coordinates
     * @param {geotoolkit.util.Point} pt is the device coordinates received by mouse event
     * @param {number} [radius=2] is the radius of selection
     * @returns {Array<geotoolkit.scene.Node>} shapes shapes selected
     */
    geotoolkit.map.layers.Shape.prototype.hitTest = function(pt, radius){};

/**
 * This shape connects to a server to display a map.<br>
 * Setting the limits will change the extents of the map.
 *
 * @class geotoolkit.map.layers.WMS
 * @augments geotoolkit.map.layers.Image
 * @param {object} [options=null] options
 * @param {string} [options.imageformat] image format to use
 * @param {string|Array<string>} [options.layers] layer name(s) to be shown
 * @param {string} [options.version] WMS version to be used
 * @param {number} [options.inflate=0.2] inflate ratio for requesting area (0.2 by default means +20%)
 * @param {boolean} [options.transparent=true] true if layer should be transparent
 * @param {number} [options.timeout=50] the timeout (in ms) between viewport changed and new image requested
 */
geotoolkit.map.layers.WMS = {};
    /**
     * Sets the image format to use by the layer
     *
     * @param {string} format image format to use
     * @returns {geotoolkit.map.layers.WMS} this
     */
    geotoolkit.map.layers.WMS.prototype.setImageFormat = function(format){};
    /**
     * Returns the image format used by the layer
     * @returns {?string} format image format that is used
     */
    geotoolkit.map.layers.WMS.prototype.getImageFormat = function(){};
    /**
     * Sets the transparency of the layer
     *
     * @param {boolean} bool true if layer should be transparent
     * @returns {geotoolkit.map.layers.WMS} this
     */
    geotoolkit.map.layers.WMS.prototype.setTransparent = function(bool){};
    /**
     * Returns the transparency of the layer
     *
     * @returns {?boolean} bool true if layer is transparent
     */
    geotoolkit.map.layers.WMS.prototype.getTransparent = function(){};
    /**
     * Sets WMS version to use
     * @param {string} version version to use (in '1.3.0' format)
     * @returns {geotoolkit.map.layers.WMS} this
     */
    geotoolkit.map.layers.WMS.prototype.setVersion = function(version){};
    /**
     * Returns WMS version currently used
     * @returns {?string}
     */
    geotoolkit.map.layers.WMS.prototype.getVersion = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {object} properties JSON containing the properties
     * @returns {string} properties.format the image format used by the layer
     * @returns {string} properties.version the WMS version currently used
     * @returns {number} properties.inflate current source inflate ratio
     * @returns {boolean} properties.transparent the layer transparency
     */
    geotoolkit.map.layers.WMS.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * see {@link geotoolkit.map.layers.WMS#getProperties}
     * @override
     * @param {object} [properties] JSON containing the properties to set
     * @returns {geotoolkit.map.layers.WMS} this
     */
    geotoolkit.map.layers.WMS.prototype.setProperties = function(properties){};

/**
 * This layer connects to an Web Feature Service and displays received features from that server.
 * @class geotoolkit.map.layers.WFS
 * @augments geotoolkit.map.layers.Vector
 * @param {object} [options] options
 * @param {Array<string>|string} [options.featureTypes=null] featureType name(s) to receive from the server
 */
geotoolkit.map.layers.WFS = {};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {object} properties JSON containing the properties
     * @returns {Array<string>|string|null} properties.featureTypes featureType name(s) receiving from the server
     */
    geotoolkit.map.layers.WFS.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * see {@link geotoolkit.map.layers.WFS#getProperties}
     * @override
     * @param {object} [properties] JSON containing the properties to set
     * @returns {geotoolkit.map.layers.WFS} this
     */
    geotoolkit.map.layers.WFS.prototype.setProperties = function(properties){};

/**
 * This shape connects to an Esri Map Server and displays a single dynamic layer from that server.
 * @class geotoolkit.map.layers.ArcGISImage
 * @augments geotoolkit.map.layers.Image
 * @param {object} [options] options
 */
geotoolkit.map.layers.ArcGISImage = {};
    /**
     * Queries layer legend data
     * @param {function} [callback] callback to call when the legend data is loaded
     * @returns {geotoolkit.map.layers.ArcGISImage} this
     */
    geotoolkit.map.layers.ArcGISImage.prototype.queryLegend = function(callback){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.layers.ArcGISImage.prototype.hitTest = function(){};
    /**
     * Returns the tooltip formatter or format function to use (null if tooltips are not visible)
     * @override
     * @returns {?object|function}
     */
    geotoolkit.map.layers.ArcGISImage.prototype.getTooltipFormatter = function(){};

/**
 * This shape connects to an Esri Feature Server and displays a single layer from that server.
 *
 * @param {object} [options] options
 * @param {string} [options.server] The esri server we are being served from
 * @param {string|Array} [options.layer] layer id(s) to display (for multilayer servers only)
 * @param {string} [options.idfield] field that contains the id for this shape
 * @param {number} [options.requestresolution] layer will be broken into a grid requestresolution x requestresolution for server requests
 * @param {string[]} [options.requestfields=null] an array for requested fields. if it is not specified all fields are loaded
 * @class geotoolkit.map.layers.ArcGISFeature
 * @augments geotoolkit.map.layers.Vector
 */
geotoolkit.map.layers.ArcGISFeature = {};
    /**
     * Returns an array of fields to be requested from server
     * @returns {string[]}
     */
    geotoolkit.map.layers.ArcGISFeature.prototype.getRequestFields = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {object} properties JSON containing the properties
     * @returns {number} properties.requestresolution a grid size for layer partitioning, that is used for server requests
     */
    geotoolkit.map.layers.ArcGISFeature.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * see {@link geotoolkit.map.layers.ArcGISFeature#getProperties}
     * @override
     * @param {object} [properties] JSON containing the properties to set
     * @returns {geotoolkit.map.layers.ArcGISFeature} this
     */
    geotoolkit.map.layers.ArcGISFeature.prototype.setProperties = function(properties){};
    /**
     * Adds the passed in ID's to the list of layers to show
     * @param {number | Array<number>} id id(s) for the layer(s) to show
     * @returns {geotoolkit.map.layers.ArcGISFeature}
     */
    geotoolkit.map.layers.ArcGISFeature.prototype.showLayers = function(id){};
    /**
     * Returns the server layer names that are requested.
     * @returns {Array<string>|null} layers
     */
    geotoolkit.map.layers.ArcGISFeature.prototype.getVisibleLayers = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.map.layers.ArcGISFeature.prototype.renderFeatures = function(){};
    /**
     * Queries layer legend data
     * @param {function} [callback] callback to call when the legend data is loaded
     * @returns {geotoolkit.map.layers.ArcGISFeature} this
     */
    geotoolkit.map.layers.ArcGISFeature.prototype.queryLegend = function(callback){};

/**
 * The implementation is capable of loading GeoJSON data.<br>
 *
 * @class geotoolkit.map.layers.GeoJSON
 * @augments geotoolkit.map.layers.Vector
 * @param {object} [options] options
 */
geotoolkit.map.layers.GeoJSON = {};
    /**
     * Loads GeoJson feature collection
     *
     * @param {!object} geoJson geoJson object
     * @returns {geotoolkit.map.layers.GeoJSON} this
     * @deprecated since 2.6 use setServerURL to load data automatically
     */
    geotoolkit.map.layers.GeoJSON.prototype.loadGeoJson = function(geoJson){};

/**
 * The implementation is capable of loading KML (Keyhole Markup Language) data.<br>
 *
 * @class geotoolkit.map.layers.KML
 * @augments geotoolkit.map.layers.Vector
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.KML} [options.source=new geotoolkit.map.sources.KML()] the layer data source
 */
geotoolkit.map.layers.KML = {};

/**
 * The implementation is capable of loading CSV (Comma-Separated Values) data.<br>
 *
 * @class geotoolkit.map.layers.CSV
 * @augments geotoolkit.map.layers.Vector
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.CSV} [options.source=new geotoolkit.map.sources.CSV()] the layer data source
 * @param {string|geotoolkit.map.coordinatesystems.AbstractSystem} [options.system='LatLon'] initial data coordinate system
 * @param {string} [options.longitudeField='longitude'] string defining the field name that holds the longitude (X) coordinate
 * @param {string} [options.latitudeField='latitude'] string defining the field name that holds the latitude (Y) coordinate
 */
geotoolkit.map.layers.CSV = {};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {object} properties JSON containing the properties
     * @returns {string|null} properties.latitudefield the source latitude coordinate field name
     * @returns {string|null} properties.longitudefield the source longitude coordinate field name
     */
    geotoolkit.map.layers.CSV.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * see {@link geotoolkit.map.layers.CSV#getProperties}
     * @override
     * @param {object} [properties] JSON containing the properties to set
     * @returns {geotoolkit.map.layers.CSV} this
     */
    geotoolkit.map.layers.CSV.prototype.setProperties = function(properties){};

/**
 * The implementation is capable of loading GeoRSS (Geographically Encoded Objects for RSS feeds) data.<br>
 *
 * @class geotoolkit.map.layers.GeoRSS
 * @augments geotoolkit.map.layers.Vector
 * @param {object} [options] options
 * @param {string|geotoolkit.map.coordinatesystems.AbstractSystem} [options.system='LatLon'] initial data coordinate system
 * @param {geotoolkit.map.sources.GeoRSS} [options.source=new geotoolkit.map.sources.GeoRSS()] the layer data source
 */
geotoolkit.map.layers.GeoRSS = {};

/**
 * This shape connects to an ArcGIS Stream Server and displays a single layer from it.
 * @class geotoolkit.map.layers.Stream
 * @augments geotoolkit.map.layers.Vector
 * @param {object} [options] options
 * @param {geotoolkit.map.sources.Stream} [options.source=new geotoolkit.map.sources.Stream()] the layer data source
 */
geotoolkit.map.layers.Stream = {};

/**
 * This shape connects to a Bing Maps server to display a map.<br>
 *
 * @class geotoolkit.map.layers.Bing
 * @augments geotoolkit.map.layers.Tile
 * @param {object} [options]
 * @param {geotoolkit.map.sources.Bing} [options.source=new geotoolkit.map.sources.Bing()] Bing Maps source
 * @param {string} [options.key=null] Bing Maps API key. Get yours at http://www.bingmapsportal.com/
 * @param {string} [options.culture='en-US'] the culture code to use for the request
 * @param {geotoolkit.map.sources.Bing.ImagerySet|string} [options.imagerySet='AerialWithLabels'] the type of imagery for request. See
 * geotoolkit.map.sources.Bing.ImagerySet enum for all imagery supported
 * @param {geotoolkit.util.Point} [options.centerPoint=null] the center point to use for the imagery
 * WARNING! center point is required for the Birdseye imagery and its varieties
 */
geotoolkit.map.layers.Bing = {};
    /**
     * @inheritdoc
     */
    geotoolkit.map.layers.Bing.prototype.renderContent = function(){};

/**
 * This layer connects to Mapbox VectorTile server and displays received features.
 * @class geotoolkit.map.layers.VectorTile
 * @augments geotoolkit.map.layers.Vector
 * @param {object} [options]
 * @param {geotoolkit.map.sources.VectorTile} [options.source=new geotoolkit.map.sources.VectorTile()] the layer data source
 * @param {string} [options.styleUrl=null] features drawing styles file url, if no set default styles are used
 */
geotoolkit.map.layers.VectorTile = {};
    /**
     * Gets features iterator
     * @override
     * @param {geotoolkit.map.util.Query|function} [filter=null] features query filter.
     * @returns {geotoolkit.util.Iterator} feature iterator (over all features if filter is null)
     */
    geotoolkit.map.layers.VectorTile.prototype.getFeatures = function(filter){};

/**
 * Helper class for aggregation selection
 * @class geotoolkit.map.tools.AggregationSelection
 * @augments {geotoolkit.controls.tools.Selection}
 * @param {geotoolkit.scene.Group} manipulatorGroup used to display temporary shapes
 */
geotoolkit.map.tools.AggregationSelection = {};
    /**
     * Sets enabled
     * @param {boolean} enabled true, if enabled, else false
     * @returns {geotoolkit.map.tools.AggregationSelection} this
     */
    geotoolkit.map.tools.AggregationSelection.prototype.setEnabled = function(enabled){};

/**
 * ArcGIS feature templates parser
 *
 * @class geotoolkit.map.util.ArcGIS
 */
geotoolkit.map.util.ArcGIS = {};
    /**
     * Creates GeoToolkit Shape-based {@link geotoolkit.map.features.IFeature} objects based on ArcGIS features
     *
     * @param {object} data ArcGIS layers data
     * @param {string} url ArcGIS server url (for relative references)
     * @param {geotoolkit.scene.shapes.Text} [textShape=null] annotations text shape
     * @returns {Array<geotoolkit.map.features.IFeature>}
     */
    geotoolkit.map.util.ArcGIS.parse = function(data, url, textShape){};

/**
 * Defines helper methods to work with feature geometries
 * @class geotoolkit.map.util.Geometry
 */
geotoolkit.map.util.Geometry = {};
    /**
     * Gets bounds for a geometry defined by arrays of x-ordinates and y-ordinates.
     *
     * @param {!object} geometry feature geometry
     * @param {!number|Array} geometry.x feature geometry x-ordinate(s)
     * @param {!number|Array} geometry.y feature geometry x-ordinate(s)
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.map.util.Geometry.getCachedGeometryBounds = function(geometry){};
    /**
     * Returns true if polygon geometry is clockwise, false otherwise
     * @param {!object} geometry polygon geometry
     * @returns {boolean}
     */
    geotoolkit.map.util.Geometry.isClockwise = function(geometry){};

/**
 * This layer is a collection of geotoolkit shapes that will be displayed on a map
 * Setting the limits will change the extents of the map.
 *
 * @class geotoolkit.map.util.Query
 * @param {!object} options options
 * @param {geotoolkit.util.Rect|geotoolkit.util.Point|Object} [options.geometry] spacial geometry in map coordinate system to define the query
 * @param {object} [options.properties] Map of properties to look for
 * @param {function} [options.filter] node filter that will return true to keep the element
 */
geotoolkit.map.util.Query = {};
    /**
     * sets the geometry for this query
     * @param {geotoolkit.util.Rect|Array<geotoolkit.util.Point>} geo geometry
     * @returns {geotoolkit.map.util.Query}
     */
    geotoolkit.map.util.Query.prototype.setGeometry = function(geo){};
    /**
     * sets the search properties for this query
     *
     * @param {object} properties properties
     * @returns {geotoolkit.map.util.Query}
     */
    geotoolkit.map.util.Query.prototype.setProperties = function(properties){};
    /**
     * sets the name field for this query
     *
     * @param {string} name name
     * @returns {geotoolkit.map.util.Query}
     */
    geotoolkit.map.util.Query.prototype.setName = function(name){};
    /**
     * gets the name field for this query
     *
     * @returns {string}
     */
    geotoolkit.map.util.Query.prototype.getName = function(){};
    /**
     * gets the geometry for this query
     * @returns {geotoolkit.util.Rect|Array<geotoolkit.util.Point>}
     */
    geotoolkit.map.util.Query.prototype.getGeometry = function(){};
    /**
     * gets the properties for this query
     *
     * @returns {object}
     */
    geotoolkit.map.util.Query.prototype.getProperties = function(){};
    /**
     * sets the filter for this query
     *
     * @param {function} filter filter function
     * @returns {geotoolkit.map.util.Query}
     */
    geotoolkit.map.util.Query.prototype.setFilter = function(filter){};
    /**
     * gets the filter for this query
     *
     * @returns {function}
     */
    geotoolkit.map.util.Query.prototype.getFilter = function(){};

/**
 * Defines "Map scale" object
 *
 * @class geotoolkit.map.util.MapScale
 * @augments geotoolkit.scene.shapes.AnchoredShape
 *
 * @param {object} [options] map scale options
 * @param {number} [options.x=20] left offset (in px)
 * @param {number} [options.y=20] top offset (in px)
 * @param {number} [options.width=160] maximum measurer width (in px)
 * @param {number} [options.height=40] scale shape height (in px)
 * @param {geotoolkit.attributes.TextStyle | string | object} [options.textstyle=new geotoolkit.attributes.TextStyle('black')] label text style
 * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle=new geotoolkit.attributes.LineStyle('black',2)] measurer line style
 * @param {geotoolkit.util.AnchorType} [options.alignment=geotoolkit.util.AnchorType.LeftBottom] alignment for the scale object on the map widget
 * @param {geotoolkit.util.AnchorType} [options.textalign=geotoolkit.util.AnchorType.Center] alignment for the text label on the scale object
 * @param {number} [options.tickheight=0.25] tick height from 0 to 1 (where 1 means full shape height)
 * @param {boolean} [options.metric=true] is the metric system used (meters & kilometers if true, foots and miles if false)
 */
geotoolkit.map.util.MapScale = {};
    /**
     * Sets scale
     *
     * @param {Number} scale scale to set
     * @returns {geotoolkit.map.util.MapScale} this
     */
    geotoolkit.map.util.MapScale.prototype.setMapScale = function(scale){};
    /**
     * Renders itself
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.map.util.MapScale.prototype.render = function(context){};

/**
 * GeoJSON parser and converter
 *
 * @class geotoolkit.map.util.GeoJSON
 */
geotoolkit.map.util.GeoJSON = {};
    /**
     * Creates GeoToolkit Shape-based {@link geotoolkit.map.features.IFeature} objects based on GeoJSON features
     *
     * @param {object|Array<object>} geoJsonFeatures array of GeoJSON features
     * @param {geotoolkit.map.features.strategies.IGetId} [iGetFeatureId=new geotoolkit.map.features.strategies.IdByAttribute('name')]
     * how to retrieve feature id from geoJson feature's properties
     * @param {function} [crsConversion] function for converting points into the map coordinate system
     * @param {Array} [coordinateOrder=[0,1]] x/y coordinate order ([1, 0] to reverse)
     * @returns {Array<geotoolkit.map.features.IFeature>}
     */
    geotoolkit.map.util.GeoJSON.parse = function(geoJsonFeatures, iGetFeatureId, crsConversion, coordinateOrder){};
    /**
     * Converts GeoToolkit Shape-based {@link geotoolkit.map.features.IFeature} objects to GeoJSON format
     *
     * @param {geotoolkit.map.features.IFeature|Array|geotoolkit.util.Iterator} features features to be converted to GeoJSON
     * @param {function} [crsConversion] function for converting points into the result coordinate system
     * @param {Array} [coordinateOrder=[0,1]] x/y coordinate order ([1, 0] to reverse)
     * @returns {object}
     */
    geotoolkit.map.util.GeoJSON.toGeoJSON = function(features, crsConversion, coordinateOrder){};

/**
 * KML (Keyhole Markup Language) parser
 *
 * @class geotoolkit.map.util.KML
 */
geotoolkit.map.util.KML = {};
    /**
     * Creates GeoToolkit Shape-based {@link geotoolkit.map.features.IFeature} objects based on KML features
     *
     * @param {object} xmlElement DOMElement object that contains all the features data in KML format
     * @param {geotoolkit.map.features.strategies.IGetId} [iGetFeatureId=new geotoolkit.map.features.strategies.IdByAttribute('name')]
     * how to retrieve feature id from geoJson feature's properties
     * @param {function} [crsConversion=null] function for converting points into the map coordinate system
     * @param {function} [invalidateHandler=null] function to be called when async templates are ready to be drawn
     * @param {object} [styles=null] styles map that contains connection between style ids and feature templates
     * @param {Array<geotoolkit.map.features.IFeature>} [features=null] features array to store parsed features (new array created if not provided)
     * @returns {Array<geotoolkit.map.features.IFeature>} features
     */
    geotoolkit.map.util.KML.parse = function(xmlElement, iGetFeatureId, crsConversion, invalidateHandler, styles, features){};

/**
 * ArcGIS Web Map layers parser
 *
 * @class geotoolkit.map.util.WebMap
 */
geotoolkit.map.util.WebMap = {};
    /**
     * Loads WebMap layers from the server and adds them to the map
     * @param {geotoolkit.map.Map} map the map widget for the result
     * @param {string} url the ArcGIS WebMap server url
     */
    geotoolkit.map.util.WebMap.load = function(map, url){};
    /**
     * Sets the Bing Maps API key to use in the Webmap-created Bing layers. Get yours key at http://www.bingmapsportal.com/
     * @param {string} key Bing Maps API key
     */
    geotoolkit.map.util.WebMap.setBingMapsKey = function(key){};

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
 * <li> Pan Tool </li>
 * <li> RubberBand Tool </li>
 * <li> Selection </li>
 * <li> Pinch Zoom </li>
 * <li> Zoom with Scroll Wheel</li>
 * </ul>
 *

 *
 * @class geotoolkit.map.Map
 * @augments geotoolkit.widgets.AnnotatedWidget
 * @param {object} [options] Data passed in
 * @param {geotoolkit.util.Rect} [options.bounds] bounds where to place the widget
 * @param {object} [options.border] defines properties for widget outer border
 * @param {object} [options.border.color=white] color of border border
 * @param {geotoolkit.util.Rect} [options.maplimits=null] limits of the map
 * @param {geotoolkit.map.GeodeticSystem | geotoolkit.map.coordinatesystems.AbstractSystem} [options.system=geotoolkit.map.GeodeticSystem.WGS84] geodetic system we want the map to use
 * @param {geotoolkit.scene.shapes.Image} [options.mapimage=null] image to be displayed locked at the bottom right of the map
 * @param {number} [options.mapscale=null] sets the initial map scale
 * @param {geotoolkit.scene.Group} [options.model=null] optional model of the center
 * @param {geotoolkit.scene.Group} [options.layerscontainer=null] defined a container of map layers.
 * If it is not specified than the default container is used. If a container specified than it must be inserted the model.
 * @param {boolean} [options.wrapped=false] is map model limits wrapped in infinite loop
 * @param {boolean} [options.viewcache=false] enable tiled cache for all map layers. It increase rendering performance for historical data
 * @param {object} [options.viewcachesize] viewcachesize options to set
 * @param {number} [options.viewcachesize.width=256] set tiled cache size.
 * @param {number} [options.viewcachesize.height=256] set tiled cache size.
 * @param {number} [options.viewcachemode=Shared] set tiled cache mode
 * @param {number} [options.viewcachememorylimit] set tiled cache memory limit
 * @param {boolean} [options.viewcacheasync=false] set tiled cache asynchrony
 * @param {object} [options.zoom] map zoom options
 * @param {number} [options.zoom.max=Infinity] maximum zoom limit (i.e. '500' value means user cannot zoom-out after 1:500 scale - 500 meters in 1 pixel). Scale is counted on the equator (by .getMapScale() method), so it can be different with the actual scale on current parallel
 * @param {number} [options.zoom.min=0] minimum zoom limit (i.e. '100' value means user cannot zoom-in after 1:100 scale - 100 meters in 1 pixel). Scale is counted on the equator (by .getMapScale() method), so it can be different with the actual scale on current parallel
 * @param {number} [options.zoom.speed=1.5] zoom speed (e.g. 2 means that zoom-in brings the map x2 times closer)
 * @param {number} [options.zoom.time=400] zoom time in milliseconds (set to 0 for instant zoom)
 * @param {object} [options.tooltip] tooltip options
 * @param {HTMLElement} [options.tooltip.divelement] HTML div tooltip element or it will be created with className cg-tooltip-container
 * @param {number} [options.tooltip.offsetx=10] offset of tooltip from current position by x in pixels
 * @param {number} [options.tooltip.offsety=-10] offset of tooltip from current position by y in pixels
 * @param {geotoolkit.util.AnchorType} [options.tooltip.alignment=geotoolkit.util.AnchorType.LeftTop] tooltip alignment according to the point set by offsets
 * @param {geotoolkit.controls.tools.PointerMode|string} [options.tooltip.mode=geotoolkit.controls.tools.PointerMode.Hover] tooltip appearance mode
 * @param {number} [options.tooltip.max=1] max number of the features info showing (set to Infinity for unlimited selection)
 * @param {boolean} [options.tooltip.autoupdate=true] true if tooltip info should be auto updated after map.invalidate() was called
 * @param {geotoolkit.map.util.MapScale} [options.mapscaleobject] MapScale information to be locked at the bottom left of the map
 * @param {string} [options.webmap] the ArcGIS WebMap server url
 * @param {geotoolkit.util.Unit} [options.scaleunit] scale unit
 * @example
 * // 1). Initialize Maps. As with other widgets, you need to add map to a canvas and attach the tools.
 * var map = new geotoolkit.map.Map();
 * var wmts = new geotoolkit.map.layers.Tile({..});
 * map.addLayer(wmts);
 * @example
 * // 2). This example shows how to change the Spatial Reference for the map while using the geotoolkit.map.Map with geotoolkit.map.layers.Tile.
 * // Only lat/lon, wgs84 and UTM coordinate systems are available, so map data must be transformed to one of them.
 * var map = new geotoolkit.map.Map({
 * ...
 * 'system': new geotoolkit.map.coordinatesystems.LatLon() // lat/long coordinate system
 * });
 */
geotoolkit.map.Map = {};
    /**
     * Transform a point from coordinate system to map coordinate system
     * @param {geotoolkit.util.Point} point point to transform
     * @param {geotoolkit.map.GeodeticSystem | geotoolkit.map.coordinatesystems.AbstractSystem} from system converting from
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.Map.prototype.transformToMap = function(point, from){};
    /**
     * Transform a point from map coordinate system to specified coordinate system
     * @param {geotoolkit.util.Point} point point to transform
     * @param {geotoolkit.map.GeodeticSystem | geotoolkit.map.coordinatesystems.AbstractSystem} to system converting from
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.Map.prototype.transformFromMap = function(point, to){};
    /**
     * Transform point
     * @param {geotoolkit.util.Point} point point to transform
     * @param {geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem} from system converting from
     * @param {geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystems.AbstractSystem } to system converting to
     * @returns {geotoolkit.util.Point | null}
     */
    geotoolkit.map.Map.prototype.transformPoint = function(point, from, to){};
    /**
     * Returns the map logo (if exists)
     * @returns {geotoolkit.scene.shapes.Image|null}
     */
    geotoolkit.map.Map.prototype.getMapImage = function(){};
    /**
     * Scale node's contents.
     *
     * @param {number} amount zoom factor (> 1 for in, \< 1 for out)
     * @param {number} posX x position to scale from (in pxl)
     * @param {number} posY y position to scale from (in pxl)
     * @returns {geotoolkit.map.Map} this
     */
    geotoolkit.map.Map.prototype.zoom = function(amount, posX, posY){};
    /**
     * Sets the current map scale
     * @param {number} scale map scale
     * @param {boolean} [onCurrentParallel = false] true, if you need to use factor, else false
     * @returns {geotoolkit.map.Map} this
     */
    geotoolkit.map.Map.prototype.setMapScale = function(scale, onCurrentParallel){};
    /**
     * gets the current map scale
     * @param {boolean} [onCurrentParallel = false] true, if you need to use factor, else false
     * @returns {number} current map scale
     */
    geotoolkit.map.Map.prototype.getMapScale = function(onCurrentParallel){};
    /**
     * removes scrollbars
     * @returns {Object}
     */
    geotoolkit.map.Map.prototype.getOptions = function(){};
    /**
     * Sets options
     * @param {object} [options] options
     * @param {geotoolkit.scene.shapes.Image} [options.mapimage] image to be displayed locked at the bottom right of the map
     * @param {geotoolkit.util.Rect} [options.maplimits] limits of the map
     * @param {geotoolkit.util.Unit} [options.scaleunit] scale unit
     * @param {number} [options.mapscale] sets the initial map scale
     * @param {geotoolkit.map.util.MapScale} [options.mapscaleobject] MapScale information to be locked at the bottom left of the map
     * @returns {geotoolkit.map.Map}
     */
    geotoolkit.map.Map.prototype.setOptions = function(options){};
    /**
     * Notifies the Map of a device resize
     * @deprecated since 2.6 use setBounds instead
     * @param {geotoolkit.util.Rect} device new device bounds
     * @param {number} oldscale previous map scale to keep the map at
     * @fires geotoolkit.map.Map~onResize
     */
    geotoolkit.map.Map.prototype.onResize = function(device, oldscale){};
    /**
     * Gets the working system of the map
     * @returns {geotoolkit.map.coordinatesystems.AbstractSystem}
     */
    geotoolkit.map.Map.prototype.getCoordinateSystem = function(){};
    /**
     * initialize tools
     *
     */
    geotoolkit.map.Map.prototype.initializeTools = function(){};
    /**
     * Method to add a map layer. Layers can be added on top of existing layers.
     * @param {geotoolkit.map.layers.AbstractLayer} layer layer to add
     * @returns {geotoolkit.map.Map} this
     * @fires geotoolkit.map.Map~onLayerAdded
     */
    geotoolkit.map.Map.prototype.addLayer = function(layer){};
    /**
     * Sets inner model limits
     *
     * @param {geotoolkit.util.Rect} limits
     * inner limits
     * @returns {geotoolkit.map.Map} this
     */
    geotoolkit.map.Map.prototype.setCenterModelLimits = function(limits){};
    /**
     * Gets model limits, the limits of this groups inside space
     *
     * @returns {geotoolkit.util.Rect | null} the current model limits
     */
    geotoolkit.map.Map.prototype.getCenterModelLimits = function(){};
    /**
     * Sets the Map scale object that is anchored in the bottom right of the map
     *
     * @param {geotoolkit.map.util.MapScale} mapscale map scale
     * @returns {geotoolkit.map.Map} this
     */
    geotoolkit.map.Map.prototype.setMapScaleObject = function(mapscale){};
    /**
     * gets the center point on the map.
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.map.Map.prototype.getMapCenter = function(){};
    /**
     * Pans the map to the point.
     * @param {geotoolkit.util.Point} center point where to pan
     * @param {geotoolkit.map.GeodeticSystem} coordSystem if null assumes map system
     * @param {boolean} [elastic=false] is panTo move elastic or instant
     *
     * @returns {geotoolkit.map.Map}
     */
    geotoolkit.map.Map.prototype.panTo = function(center, coordSystem, elastic){};
    /**
     * Return layer count
     *
     * @returns {number}
     */
    geotoolkit.map.Map.prototype.getLayerCount = function(){};
    /**
     * Return layer by index
     *
     * @param {number} i
     * index of the node
     * @returns {geotoolkit.map.layers.AbstractLayer}
     */
    geotoolkit.map.Map.prototype.getLayer = function(i){};
    /**
     * Removes a Layer
     * @param {geotoolkit.map.layers.AbstractLayer} layer Layer to remove
     * @returns {geotoolkit.map.Map}
     * @fires geotoolkit.map.Map~onLayerRemoved
     */
    geotoolkit.map.Map.prototype.removeLayer = function(layer){};
    /**
     * Inserts a Layer, if the layer is already a child, this moves it. Layer can be inserted at a z depth or index as required.<br>
     * For Example <code> map.insertLayer(layer, index); </code>
     * @param {geotoolkit.map.layers.AbstractLayer} layer Layer to insert
     * @param {number} index where to insert layer
     * @returns {geotoolkit.map.Map}
     * @fires geotoolkit.map.Map~onLayersModified
     * @fires geotoolkit.map.Map~onLayerAdded
     */
    geotoolkit.map.Map.prototype.insertLayer = function(layer, index){};
    /**
     * Gets scale unit
     * @returns {geotoolkit.util.Unit} unit of this map
     */
    geotoolkit.map.Map.prototype.getScaleUnit = function(){};
    /**
     * Sets scale unit
     * @param {geotoolkit.util.Unit} unit new unit of this map
     * @returns {geotoolkit.map.Map} this
     */
    geotoolkit.map.Map.prototype.setScaleUnit = function(unit){};
    /**
     * Sets bounds of the map
     * @param {geotoolkit.util.Rect | object} bounds bound of the map
     * @returns {geotoolkit.map.Map} this
     */
    geotoolkit.map.Map.prototype.setBounds = function(bounds){};

/** @namespace */
geotoolkit.map.strategies = {};

/**
 * Annotation strategy interface
 * @interface
 * @augments geotoolkit.map.features.strategies.IGetAnnotation
 */
geotoolkit.map.strategies.IAnnotationStrategy = {};

/**
 * @deprecated since 2.6, use geotoolkit.map.features.strategies.AnnotationById instead
 * The strategy returns feature ID as annotation
 * @class geotoolkit.map.strategies.SimpleAnnotationStrategy
 * @augments geotoolkit.map.features.strategies.AnnotationById
 * @implements geotoolkit.map.strategies.IAnnotationStrategy
 */
geotoolkit.map.strategies.SimpleAnnotationStrategy = {};

/**
 * @deprecated since 2.6, use geotoolkit.map.features.strategies.AnnotationByAttribute instead
 * The strategy returns feature's property 'propertyName' as annotation
 * @class geotoolkit.map.strategies.PropertyToAnnotation
 * @augments geotoolkit.map.features.strategies.AnnotationByAttribute
 * @implements geotoolkit.map.strategies.IAnnotationStrategy
 * @param {string} propertyName define property name to get from feature for visualization
 */
geotoolkit.map.strategies.PropertyToAnnotation = {};

/**
 * @deprecated since 2.6
 * Gets feature ID based on a feature properties
 * @interface
 * @augments geotoolkit.map.features.strategies.IGetId
 */
geotoolkit.map.features.IGetFeatureId = {};

/**
 * Gets feature ID based on a feature properties.
 * The implementation returns properties[propertyName] to use as a feature ID.
 * @deprecated since 2.6, use geotoolkit.map.features.strategies.IdByAttribute instead
 * @class geotoolkit.map.features.PropertyToFeatureId
 * @augments geotoolkit.map.features.strategies.IdByAttribute
 * @implements geotoolkit.map.features.IGetFeatureId
 * @param {!string} propertyName property name to use as a feature ID
 */
geotoolkit.map.features.PropertyToFeatureId = {};

/**
 * @deprecated since 2.6, use geotoolkit.map.coordinatesystems instead
 * @namespace */
geotoolkit.map.coordinatesystem = {};

/**
 * @deprecated since 2.6, use geotoolkit.map.coordinatesystems instead
 * This class specifies the Generalized Coordinate System
 * @class geotoolkit.map.coordinatesystem.CoordinateSystem
 * @param {object} options options to specify coordinate system.
 * @param {string} options.name name of the coordinate system.
 * @param {string | Array<string>} options.units units of the coordinate system.
 * @param {geotoolkit.util.Rect} options.limits the default minimal rectangular bounding region that will entirely contain
 * this CoordinateSystem (approximately)
 */
geotoolkit.map.coordinatesystem.CoordinateSystem = {};

/**
 * @deprecated since 2.6, use geotoolkit.map.coordinatesystems.Registry() instead
 * This class provides registry of coordinate systems.
 * @class geotoolkit.map.coordinatesystem.CoordinateSystemRegistry
 */
geotoolkit.map.coordinatesystem.CoordinateSystemRegistry = {};

/**
 * This class specifies the Geographical coordinate system with datum WGS84 where longitude is x-axis and latitude is y-axis
 * @deprecated since 2.6, use geotoolkit.map.coordinatesystems.LatLon instead.
 * @class geotoolkit.map.coordinatesystem.GeographicCoordinateSystem
 * @augments geotoolkit.map.coordinatesystem.CoordinateSystem
 */
geotoolkit.map.coordinatesystem.GeographicCoordinateSystem = {};

/**
 * Based on Geographic/UTM Coordinate Converter
 * @deprecated since 2.6, geotoolkit.map.coordinatesystems.UTM() instead.
 * @class geotoolkit.map.coordinatesystem.UTMCoordinateSystem
 * @augments geotoolkit.map.coordinatesystem.CoordinateSystem
 * @param {number} zone - The UTM zone in which the point lies.
 * @param {boolean} southhemi - True if the point is in the southern hemisphere; false otherwise.
 */
geotoolkit.map.coordinatesystem.UTMCoordinateSystem = {};

/**
 * This class specifies the Web Mercator coordinate system
 * @deprecated since 2.6, use geotoolkit.map.coordinatesystems.WebMercator() instead.
 * @class geotoolkit.map.coordinatesystem.WebMercator
 * @augments geotoolkit.map.coordinatesystem.CoordinateSystem
 */
geotoolkit.map.coordinatesystem.WebMercator = {};

/**
 * Used to transform points from one CoordinateSystem to another.
 * @deprecated since 2.6, use geotoolkit.map.coordinatesystems.Transformer() instead
 * @class geotoolkit.map.coordinatesystem.Transformer
 * @param {object} options options to specify transformer.
 * @param {geotoolkit.map.coordinatesystem.CoordinateSystem} options.initialcoordinatesystem initial coordinate system
 * @param {geotoolkit.map.coordinatesystem.CoordinateSystem} options.targetcoordinatesystem target coordinate system
 */
geotoolkit.map.coordinatesystem.Transformer = {};

/**
 * Used to transform points to lat long coordinate.
 * @deprecated since 2.6, use geotoolkit.map.coordinatesystems.LatLonTransformer instead
 * @class geotoolkit.map.coordinatesystem.LatLongTransformer
 * @augments geotoolkit.map.coordinatesystem.Transformer
 * @param {object} options options to specify transformer.
 * @param {geotoolkit.map.coordinatesystem.CoordinateSystem} options.initialcoordinatesystem initial coordinate system
 */
geotoolkit.map.coordinatesystem.LatLongTransformer = {};

/** @namespace */
geotoolkit.map.templates = {};

/**
 * Manages {@link geotoolkit.map.features.IMapFeature}-to-{@link geotoolkit.scene.Node} logic used by
 * {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class or its inheritance
 * @deprecated since 2.6, use geotoolkit.map.features.templates.BaseTemplate instead
 * @class geotoolkit.map.templates.ShapeTemplate
 *
 * @param {!object} options options
 *
 * @param {!geotoolkit.scene.Node} options.shape carnac shape to visualize a feature instance
 * @param {!geotoolkit.map.features.IFeatureGeometryToShape} options.geometrytoshape feature geometry to carnac shape state converter
 * @param {!geotoolkit.map.features.IFeatureGeometryToText} options.geometrytotext feature geometry to text shape state converter
 * @param {function} [options.shapecallback] callback to modify template's shape parameter(s) dynamically (see example below)
 * @example
 * var myShapeCallback = function(feature, shape) {
 * if(feature.getId()=='Houston')
 * shape.setFillStyle({ 'color': 'red' });
 * };
 */
geotoolkit.map.templates.ShapeTemplate = {};

/**
 * Manages {@link geotoolkit.map.features.PolygonMapFeature}-to-{@link geotoolkit.scene.shapes.Polygon}
 * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
 * @deprecated since 2.6, use geotoolkit.map.features.templates.Polygon instead
 * @class geotoolkit.map.templates.PolygonTemplate
 * @augments geotoolkit.map.templates.ShapeTemplate
 */
geotoolkit.map.templates.PolygonTemplate = {};

/**
 * Manages {@link geotoolkit.map.features.LineStringMapFeature}-to-{@link geotoolkit.scene.shapes.Polyline}
 * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
 *
 * @class geotoolkit.map.templates.LineStringTemplate
 * @augments geotoolkit.map.templates.ShapeTemplate
 */
geotoolkit.map.templates.LineStringTemplate = {};

/**
 * Manages {@link geotoolkit.map.features.PointMapFeature}-to-{@link geotoolkit.scene.shapes.Symbol}
 * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
 * @deprecated since 2.6, use geotoolkit.map.features.templates.Point instead
 * @class geotoolkit.map.templates.PointTemplate
 * @augments geotoolkit.map.templates.ShapeTemplate
 */
geotoolkit.map.templates.PointTemplate = {};

/**
 * Manages {@link geotoolkit.map.features.AggregationMapFeature}-to-{@link geotoolkit.scene.shapes.Symbol}
 * logic used by {@link geotoolkit.map.layers.ShapeTemplateFeatureLayer} class
 * @deprecated since 2.6, use geotoolkit.map.features.templates.Aggregation instead
 * @class geotoolkit.map.templates.AggregationTemplate
 * @augments geotoolkit.map.templates.ShapeTemplate
 */
geotoolkit.map.templates.AggregationTemplate = {};

/**
 * Layer rendering filter interface
 * @deprecated since 2.6, use geotoolkit.renderer.IFilter instead
 * @interface
 * @augments geotoolkit.renderer.IFilter
 */
geotoolkit.map.layers.ILayerFilter = {};

/**
 *
 * @class geotoolkit.map.layers.ScaleRangeLayerFilter
 * @augments geotoolkit.scene.filters.ScaleRange
 * @implements geotoolkit.renderer.IFilter
 * @deprecated since 2.6, use geotoolkit.scene.filters.ScaleRange instead
 * @param {object} [options] options
 * @param {number} [options.minscale] minimal scale
 * @param {number} [options.maxscale] maximal scale
 * @param {number} [options.minscaleinclusive=true] minimal scale is inclusive
 * @param {number} [options.maxscaleinclusive=true] maximal scale is inclusive
 */
geotoolkit.map.layers.ScaleRangeLayerFilter = {};

/**
 * Defines a Map Layer, an Abstract class that will be used by the Map. Map layer represents the geographic layer which can be a tile layer, map layer or any custom layer. <br>
 * addLayer(), insertLayer() and removeLayer() is used to add and remove layers.
 * @deprecated since 2.6, use geotoolkit.map.layers.AbstractLayer instead
 * @class geotoolkit.map.layers.AbstractMapLayer
 * @augments geotoolkit.scene.Node
 * @param {object} [options] options (see "setOptions" method for details)
 * @param {geotoolkit.map.GeodeticSystem|geotoolkit.map.coordinatesystem.CoordinateSystem} [options.system=geotoolkit.map.GeodeticSystem.WGS84] coordinate system this layer's data is in
 */
geotoolkit.map.layers.AbstractMapLayer = {};

/**
 * The layer uses {@link geotoolkit.map.templates.ShapeTemplate} instance(s)
 * to render its {@link geotoolkit.map.features.IMapFeature} elements.
 * @deprecated since 2.6, use geotoolkit.map.layers.Template instead
 * @class geotoolkit.map.layers.ShapeTemplateFeatureLayer
 * @augments geotoolkit.map.layers.AbstractFeatureLayer
 *
 * @param {!object} options options (see {@link geotoolkit.map.layers.AbstractFeatureLayer#setOptions setOptions} method for parent class options)
 * @param {!object|Array<object>} options.templates shape template(s) to visualize features (see example below)
 *
 * @example
 * var layer = new geotoolkit.map.layers.ShapeTemplateFeatureLayer({
 * 'templates': {
 * 'featureclassname': geotoolkit.map.features.PointMapFeature.getClassName(),
 * 'template': new geotoolkit.map.templates.ShapeTemplate({
 * 'shape': circle,
 * 'geometrytoshape': geometryToAnchor,
 * 'geometrytotext': geometryToAnchor
 * })
 * }
 * });
 */
geotoolkit.map.layers.ShapeTemplateFeatureLayer = {};

/**
 * This shape connects to a tile server to display a map. Map coordinates are assumed to be mercator Spherical Meters.<br>
 * Setting the limits will change the extents of the map.
 * @deprecated since 2.6, use geotoolkit.map.layers.Tile instead
 * @class geotoolkit.map.layers.WMTSLayer
 * @augments geotoolkit.map.layers.AbstractMapLayer
 * @param {object} [options=null] options
 * @param {string} [options.server] The tile server we are being served from
 * @param {number} [options.tilewidth=256] width resolution of the tiles
 * @param {number} [options.tileheight=256] height resolution of the tiles
 * @param {number} [options.minlod=0] minimum level of detail
 * @param {number} [options.maxlod=15] maximum level of detail
 * @param {number} [options.imagepool=100] pool size for map tiles
 * @param {function} [options.formatterfunction] function that takes z, y, x and turns that into tile location
 */
geotoolkit.map.layers.WMTSLayer = {};

/**
 * This shape connects to a server to display a map.<br>
 * Setting the limits will change the extents of the map.
 * @deprecated since 2.6, use geotoolkit.map.layers.WMS instead
 * @class geotoolkit.map.layers.WMSLayer
 * @augments geotoolkit.map.layers.AbstractMapLayer
 * @param {object} [options=null] options
 * @param {string} [options.server] The map server url
 * @param {string} [options.format] image format to be used
 * @param {string|Array<string>} [options.layers] layer name(s) to be shown
 * @param {string} [options.version] WMS version to be used
 * @param {number} [options.inflate=0.2] inflate coefficient for the querying area (0.2 by default means +20%)
 * @param {boolean} [options.transparent=true] true if layer should be transparent
 */
geotoolkit.map.layers.WMSLayer = {};

/**
 * This shape connects to an Esri Map Server and displays a single dynamic layer from that server.
 * @deprecated since 2.6, use geotoolkit.map.layers.ArcGISImage instead
 * @class geotoolkit.map.layers.ArcGISDynamicLayer
 * @augments geotoolkit.map.layers.AbstractMapLayer
 * @param {object} [options=null] options
 * @param {string} [options.server] The esri server we are being served from
 * @param {string} [options.systemconverter=null] coordinate system converter that can be used if server coordinate systems is not supported
 */
geotoolkit.map.layers.ArcGISDynamicLayer = {};

/**
 * This shape connects to an Esri Feature Server and displays a single layer from that server.
 * @deprecated since 2.6, use geotoolkit.map.layers.ArcGISFeature instead
 * @param {object} [options] options
 * @param {string} [options.server] The esri server we are being served from
 * @param {string|Array} [options.layer] layer id(s) to display (for multilayer servers only)
 * @param {string} [options.idfield] field that contains the id for this shape
 * @param {number} [options.requestresolution] layer will be broken into a grid requestresolution x requestresolution for server requests
 * @param {string[]} [options.requestfields=null] an array for requested fields. if it is not specified all fields are loaded
 * @class geotoolkit.map.layers.ArcGISFeatureLayer
 * @augments geotoolkit.map.layers.ShapeTemplateFeatureLayer
 */
geotoolkit.map.layers.ArcGISFeatureLayer = {};

/**
 * The layer is a collection of geotoolkit shapes (polylines, polygons, symbols, etc.)<br>
 * @deprecated since 2.6, use geotoolkit.map.layers.Shape instead
 * @class geotoolkit.map.layers.ShapeLayer
 * @augments geotoolkit.map.layers.AbstractMapLayer
 * @param {object} [options] options (see {@link geotoolkit.map.layers.AbstractMapLayer} for details)
 */
geotoolkit.map.layers.ShapeLayer = {};

/**
 * The implementation is capable of loading GeoJSON data.<br>
 * It has following predefined shape templates:<br>
 * 'templates': [ <br>
 * { 'featureclassname': geotoolkit.map.features.PolygonMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PolygonTemplate() },<br>
 * { 'featureclassname': geotoolkit.map.features.MultiPolygonMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PolygonTemplate() },<br>
 * { 'featureclassname': geotoolkit.map.features.LineStringMapFeature.getClassName(), 'template': new geotoolkit.map.templates.LineStringTemplate() },<br>
 * { 'featureclassname': geotoolkit.map.features.MultiLineStringMapFeature.getClassName(), 'template': new geotoolkit.map.templates.LineStringTemplate() },<br>
 * { 'featureclassname': geotoolkit.map.features.PointMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PointTemplate() },<br>
 * { 'featureclassname': geotoolkit.map.features.MultiPointMapFeature.getClassName(), 'template': new geotoolkit.map.templates.PointTemplate() }<br>
 * ]
 *
 * @class geotoolkit.map.layers.GeoJSONLayer
 * @augments geotoolkit.map.layers.ShapeTemplateFeatureLayer
 * @deprecated since 2.6, use geotoolkit.map.layers.GeoJSON instead
 * @param {object} [options] options
 * @param {string} [options.idfield=name] field that contains the id for this shape
 * @param {object} [options.data] Json data
 */
geotoolkit.map.layers.GeoJSONLayer = {};

/**
 * Features rendering filter interface
 * @interface
 * @augments geotoolkit.map.features.filters.IFilter
 * @deprecated since 2.6
 */
geotoolkit.map.features.IFeaturesFilter = {};

/**
 * FeatureTypeFeaturesFilter class filters out all features that are not featureType(s) instances.
 *
 * @class geotoolkit.map.features.FeatureTypeFeaturesFilter
 * @augments geotoolkit.map.features.filters.ByType
 * @implements geotoolkit.map.features.IFeaturesFilter
 * @param {Function|Array<Function>} featureType feature type(s) to render
 */
geotoolkit.map.features.FeatureTypeFeaturesFilter = {};

/**
 * AnchoredShapeFeaturesFilter filters out:<br>
 * 1. features outside of canvas rendering area<br>
 * 2. overlapped AnchoredShape's MapFeatures (optionally)<br>
 * The filter assumes feature geometries having 'x' and 'y' components to use as anchored shape anchor.
 * @deprecated since 2.6, use geotoolkit.map.features.filters.VisibilityArea instead
 * @class geotoolkit.map.features.AnchoredShapeFeaturesFilter
 * @augments geotoolkit.map.features.filters.VisibilityArea
 * @implements geotoolkit.map.features.IFeaturesFilter
 *
 * @param {!geotoolkit.scene.shapes.AnchoredShape} shape anchored shape template
 * @param {object} [options] options (see "setOptions" method for details)
 * @param {boolean} [options.nooverlap=false] "No overlapping Features allowed" flag
 */
geotoolkit.map.features.AnchoredShapeFeaturesFilter = {};

/**
 * TextFitFeaturesFilter filters out features who's annotations do not fit in the features' geometries
 *
 * @class geotoolkit.map.features.TextFitFeaturesFilter
 * @augments geotoolkit.map.features.filters.AnnotationFit
 * @implements geotoolkit.map.features.IFeaturesFilter
 * @deprecated since 2.6, use geotoolkit.map.features.filters.AnnotationFit instead
 * @param {object|geotoolkit.scene.shapes.Text} [text=new geotoolkit.scene.shapes.Text()] JSON-object or text shape instance
 * (see {@link geotoolkit.scene.shapes.Text} constructor JSON-object for details)
 */
geotoolkit.map.features.TextFitFeaturesFilter = {};

/**
 * BiggestGeometryTextFilter annotates biggest features' geometries.
 * @deprecated since 2.6, use geotoolkit.map.features.filters.BiggestGeometry instead
 * @class geotoolkit.map.features.BiggestGeometryTextFilter
 * @augments geotoolkit.map.features.filters.BiggestGeometry
 * @implements geotoolkit.map.features.IFeaturesFilter
 */
geotoolkit.map.features.BiggestGeometryTextFilter = {};

/**
 * CascadeGeometryTextFilter annotates features' geometries that are not wrapped by another geometry (no-annotated 'holes').
 * @deprecated since 2.6, use geotoolkit.map.features.filters.EvenOddGeometry instead
 * @class geotoolkit.map.features.CascadeGeometryTextFilter
 * @augments geotoolkit.map.features.filters.EvenOddGeometry
 * @implements geotoolkit.map.features.IFeaturesFilter
 */
geotoolkit.map.features.CascadeGeometryTextFilter = {};

/**
 * NoOverlapTextFilter filters out overlapped text<br>
 * If two or more texts overlap each other, then only one with the biggest geometry is shown
 * @deprecated since 2.6, use geotoolkit.map.features.filters.NoAnnotationOverlap instead
 * @class geotoolkit.map.features.NoOverlapTextFilter
 * @augments geotoolkit.map.features.filters.NoAnnotationOverlap
 * @implements geotoolkit.map.features.IFeaturesFilter
 *
 * @param {object|geotoolkit.scene.shapes.Text} [text=new geotoolkit.scene.shapes.Text()] JSON-object or text shape instance
 * (see {@link geotoolkit.scene.shapes.Text} constructor JSON-object for details)
 * @param {Array} [ignoreTypes=[]] feature types that should be passed without filtering
 */
geotoolkit.map.features.NoOverlapTextFilter = {};

/**
 * Map feature interface
 * @interface
 * @augments geotoolkit.map.features.IFeature
 * @deprecated since 2.6, use geotoolkit.map.features.IFeature instead
 */
geotoolkit.map.features.IMapFeature = {};

/**
 * Abstract map feature class. Feature must have an ID (unique within a layer it's contained in) and geometry;<br>
 * may have set of attributes (non-spatial properties)
 * @deprecated since 2.6, use geotoolkit.map.features.AbstractFeature instead
 * @class geotoolkit.map.features.AbstractMapFeature
 * @augments geotoolkit.map.features.AbstractFeature
 * @implements geotoolkit.map.features.IMapFeature
 *
 * @param {object} options options
 * @param {!number|string} options.id ID
 * @param {!object} options.geometry geometry
 * @param {?object} [options.attributes] attributes (non-spatial properties)
 */
geotoolkit.map.features.AbstractMapFeature = {};

/**
 * Point map feature implementation.
 * @deprecated since 2.6, use geotoolkit.map.features.Point instead
 * @class geotoolkit.map.features.PointMapFeature
 * @augments geotoolkit.map.features.AbstractMapFeature
 * @implements geotoolkit.map.features.IMapFeature
 *
 * @param {object} options options
 * @param {!number|string} options.id ID
 * @param {!object} options.geometry geometry
 * @param {!number} options.geometry.x x-ordinate
 * @param {!number} options.geometry.y y-ordinate
 * @param {?object} [options.attributes] attributes (non-spatial properties)
 */
geotoolkit.map.features.PointMapFeature = {};

/**
 * Multi-point map feature implementation.
 * @deprecated since 2.6, use geotoolkit.map.features.MultiPoint instead
 * @class geotoolkit.map.features.MultiPointMapFeature
 * @augments geotoolkit.map.features.AbstractMapFeature
 * @implements geotoolkit.map.features.IMapFeature
 *
 * @param {object} options options
 * @param {!number|string} options.id ID
 * @param {!Array} options.geometry feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.PointMapFeature}'s geometry
 * @param {?object} [options.attributes] attributes (non-spatial properties)
 */
geotoolkit.map.features.MultiPointMapFeature = {};

/**
 * Line string (or "polyline") map feature implementation.
 * @deprecated since 2.6, use geotoolkit.map.features.LineString instead
 * @class geotoolkit.map.features.LineStringMapFeature
 * @augments geotoolkit.map.features.AbstractMapFeature
 * @implements geotoolkit.map.features.IMapFeature
 *
 * @param {object} options line and map feature options
 * @param {!number|string} options.id feature ID
 * @param {!object} options.geometry feature geometry
 * @param {!Array} options.geometry.x array of x-coordinates
 * @param {!Array} options.geometry.y array of y-coordinates
 * @param {?object} [options.attributes] feature attributes (non-spatial properties)
 */
geotoolkit.map.features.LineStringMapFeature = {};

/**
 * Multi line string map feature implementation.
 * @deprecated since 2.6, use geotoolkit.map.features.MultiLineString instead
 * @class geotoolkit.map.features.MultiLineStringMapFeature
 * @augments geotoolkit.map.features.AbstractMapFeature
 * @implements geotoolkit.map.features.IMapFeature
 *
 * @param {object} options feature options
 * @param {!number|string} options.id feature ID
 * @param {!Array} options.geometry feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.LineStringMapFeature}'s geometry
 * @param {?object} [options.attributes] feature attributes (non-spatial properties)
 */
geotoolkit.map.features.MultiLineStringMapFeature = {};

/**
 * Polygon map feature implementation.
 * @deprecated since 2.6, use geotoolkit.map.features.Polygon instead
 * @class geotoolkit.map.features.PolygonMapFeature
 * @augments geotoolkit.map.features.AbstractMapFeature
 * @implements geotoolkit.map.features.IMapFeature
 *
 * @param {object} options options
 * @param {!number|string} options.id feature ID
 * @param {!object} options.geometry feature geometry
 * @param {!Array} options.geometry.x array of x-coordinates
 * @param {!Array} options.geometry.y array of y-coordinates
 * @param {?object} [options.attributes] feature attributes (non-spatial properties)
 */
geotoolkit.map.features.PolygonMapFeature = {};

/**
 * Multi-polygon map feature implementation.
 * @deprecated since 2.6, use geotoolkit.map.features.MultiPolygon instead
 * @class geotoolkit.map.features.MultiPolygonMapFeature
 * @augments geotoolkit.map.features.AbstractMapFeature
 * @implements geotoolkit.map.features.IMapFeature
 *
 * @param {object} options feature options
 * @param {!number|string} options.id feature ID
 * @param {!Array} options.geometry feature geometry as array of elements where each element is in the format of {@link geotoolkit.map.features.PolygonMapFeature}'s geometry
 * @param {?object} [options.attributes] feature attributes (non-spatial properties)
 */
geotoolkit.map.features.MultiPolygonMapFeature = {};

/**
 * Point map feature implementation.
 *
 * @class geotoolkit.map.features.AggregationMapFeature
 * @augments geotoolkit.map.features.PointMapFeature
 * @deprecated since 2.6, use geotoolkit.map.features.Aggregation instead
 * @param {object} options options
 * @param {!number|string} options.id ID
 * @param {!object} options.geometry geometry
 * @param {!number} options.geometry.x x-ordinate
 * @param {!number} options.geometry.y y-ordinate
 * @param {geotoolkit.util.Iterator} [options.aggregation] iterator through aggregated features
 * @param {?object} [options.attributes] attributes (non-spatial properties)
 */
geotoolkit.map.features.AggregationMapFeature = {};

/**
 * Interface to retreive feature geometry and apply it to {@link geotoolkit.scene.shapes.Text} as an anchor
 * @interface
 * @augments geotoolkit.map.features.adapters.IGeometryToText
 * @deprecated since 2.6
 */
geotoolkit.map.features.IFeatureGeometryToText = {};

/**
 * Interface to retrieve feature geometry and apply it to {@link geotoolkit.scene.Node} shape
 * @interface
 * @augments geotoolkit.map.features.adapters.IGeometryToShape
 */
geotoolkit.map.features.IFeatureGeometryToShape = {};

/**
 * Applies feature geometry's 'x' and 'y' (in Map C.S.) to {@link geotoolkit.scene.shapes.AnchoredShape} as an anchor
 * @class geotoolkit.map.features.PointMapFeatureToAnchor
 * @implements {geotoolkit.map.features.IFeatureGeometryToShape}
 * @implements {geotoolkit.map.features.IFeatureGeometryToText}
 * @augments geotoolkit.map.features.adapters.Point
 * @deprecated since 2.6, use geotoolkit.map.features.adapters.Point instead
 * @param {object} [options] options
 * @param {object} [options.offset] anchor offset
 * @param {number} [options.offset.x=0] x-offset
 * @param {number} [options.offset.y=0] y-offset
 */
geotoolkit.map.features.PointMapFeatureToAnchor = {};

/**
 * Applies feature geometry's 'x' and 'y' coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polygon}
 * @class geotoolkit.map.features.GeometryToPolygon
 * @augments geotoolkit.map.features.adapters.Polygon
 * @implements {geotoolkit.map.features.IFeatureGeometryToShape}
 * @deprecated since 2.6, use geotoolkit.map.features.adapters.Polygon instead
 */
geotoolkit.map.features.GeometryToPolygon = {};

/**
 * Applies feature geometry's 'x' and 'y' coordinates (in Map C.S.) to {@link geotoolkit.scene.shapes.Polyline}
 * @class geotoolkit.map.features.GeometryToPolyline
 * @augments geotoolkit.map.features.adapters.LineString
 * @implements {geotoolkit.map.features.IFeatureGeometryToShape}
 * @deprecated since 2.6, use geotoolkit.map.features.adapters.LineString instead
 */
geotoolkit.map.features.GeometryToPolyline = {};

/**
 * Calculates right end point of polyline and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
 *
 * @class geotoolkit.map.features.LineStringMapFeatureToAnchor
 * @augments geotoolkit.map.features.adapters.Edge
 * @implements {geotoolkit.map.features.IFeatureGeometryToText}
 * @deprecated since 2.6, use geotoolkit.map.features.adapters.Edge instead
 * @param {object} [options] options
 * @param {object} [options.offset] anchor offset
 * @param {number} [options.offset.x=5] x-offset
 * @param {number} [options.offset.y=0] y-offset
 */
geotoolkit.map.features.LineStringMapFeatureToAnchor = {};

/**
 * Calculates geometry center and applies it to {@link geotoolkit.scene.shapes.Text} as an anchor
 * @deprecated since 2.6, use geotoolkit.map.features.adapters.Center instead
 * @class geotoolkit.map.features.GeometryCenterToAnchor
 * @augments geotoolkit.map.features.adapters.Center
 * @implements {geotoolkit.map.features.IFeatureGeometryToText}
 * @param {string} [mode=Mixed] geometry center to anchor mode
 */
geotoolkit.map.features.GeometryCenterToAnchor = {};

/**
 * Converts features in a form convenient for storage and processing. Returns saved features on request.
 * @class geotoolkit.map.features.converters.DefaultFeatureConverter
 * @augments geotoolkit.util.EventDispatcher
 * @deprecated since 2.6, use geotoolkit.map.features.converters.BaseConverter instead
 */
geotoolkit.map.features.converters.DefaultFeatureConverter = {};

/**
 * Provides FeatureConverters store for centralized control and processing
 * @param {geotoolkit.map.features.converters.DefaultFeatureConverter|Array} converters converter(s) for storing
 * @class geotoolkit.map.features.converters.FeatureConverterGroup
 * @augments geotoolkit.util.EventDispatcher
 * @deprecated since 2.6, use geotoolkit.map.features.converters.CompositeConverter instead
 */
geotoolkit.map.features.converters.FeatureConverterGroup = {};

/**
 * Stores features as a binary tree for the purpose of aggregation nearby points. Not point-like features are unsupported.
 * @param {object} options convert options
 * @param {number} [options.mindistance=1] minimum distance between aggregations (in pixel)
 * @param {number} [options.min=2] minimum number of points to start aggregation
 * @param {boolean} [options.enabled=true] true if aggregation is enabled
 * @param {number} [options.timeout=50] timeout between features cached request and the actual data query (in ms)
 * @class geotoolkit.map.features.converters.PointAggregationConverter
 * @augments geotoolkit.map.features.converters.DefaultFeatureConverter
 * @deprecated since 2.6, use geotoolkit.map.features.converters.Aggregator instead
 */
geotoolkit.map.features.converters.PointAggregationConverter = {};

/**
 * Stores features as a scaled view in purpose of simplify geometry and remove unnecessary point using RDP(Ramer-Douglas-Peucker) algorithm.
 * Only multipoint-like features are supported.
 * @class geotoolkit.map.features.converters.RDPFeatureConverter
 * @augments geotoolkit.map.features.converters.DefaultFeatureConverter
 * @deprecated since 2.6, use geotoolkit.map.features.converters.RDP instead
 */
geotoolkit.map.features.converters.RDPFeatureConverter = {};

/** @namespace
 * @deprecated since 2.6
 */
geotoolkit.map.features.sources = {};

/**
 * Provides default feature source that allows user to add and remove features directly
 * @param {geotoolkit.map.coordinatesystem.CoordinateSystem} from initial coordinate system
 * @param {geotoolkit.map.coordinatesystem.CoordinateSystem} to map coordinate system
 * @class geotoolkit.map.features.sources.DefaultFeatureSource
 * @augments geotoolkit.util.EventDispatcher
 * @deprecated since 2.6, use geotoolkit.map.sources.Vector instead
 */
geotoolkit.map.features.sources.DefaultFeatureSource = {};

/**
 * Provides FeatureSources store for centralized control and processing
 * @param {geotoolkit.map.features.sources.DefaultFeatureSource|Array} sources source(s) for storing
 * @class geotoolkit.map.features.sources.FeatureSourceGroup
 * @augments geotoolkit.map.features.sources.DefaultFeatureSource
 * @deprecated since 2.6, use geotoolkit.map.sources.CompositeSource instead
 */
geotoolkit.map.features.sources.FeatureSourceGroup = {};

/**
 * Provides feature source that allows user to get features from GeoJSON files
 * @param {object} [options] options
 * @param {string} [options.idfield=name] field that contains the id for the features
 * @param {object} [options.data=null] GeoJSON object containing the features data
 * @class geotoolkit.map.features.sources.GeoJSONFeatureSource
 * @augments geotoolkit.map.features.sources.DefaultFeatureSource
 * @deprecated since 2.6, use geotoolkit.map.sources.GeoJSON instead
 */
geotoolkit.map.features.sources.GeoJSONFeatureSource = {};

/**
 * Provides feature source that allows user to get features from ArcGIS server
 * @param {object} [options] options
 * @param {string} [options.server=null] The ArcGIS server to get features from
 * @param {string} [options.idfield=name] field that contains the id for the features
 * @param {number} [options.requestresolution=10] a grid size for layer partitioning, that is used for server requests
 * @param {string[]} [options.requestfields=null] an array for requested fields. if it is not specified all fields are loaded
 * @param {geotoolkit.map.coordinatesystem.CoordinateSystem} [options.system] map coordinate system
 * @param {string} [options.systemconverter=null] coordinate system converter that can be used if map/server coordinate systems are not supported
 * @class geotoolkit.map.features.sources.ArcGISFeatureSource
 * @augments geotoolkit.map.features.sources.DefaultFeatureSource
 * @deprecated since 2.6, use geotoolkit.map.sources.ArcGISFeature instead
 */
geotoolkit.map.features.sources.ArcGISFeatureSource = {};

