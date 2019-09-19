/**
 * API defining classes used by INTGeoServer
 * @namespace */
geotoolkit.intgeo = {};

/**
 * A connector for INTGeoServer 'Pillar' faults
 * @param {object} options The options
 * @param {object} options.server The server url
 * @param {object} [options.metaservice] The metadata service name
 * @param {object} [options.dataservice] The data service name
 * @param {object} options.file The file path
 * @class geotoolkit.intgeo.RemoteFaultPillarDataSource
 */
geotoolkit.intgeo.RemoteFaultPillarDataSource = {};
    /**
     * Retrieves asynchronously the metadata for the fault
     * @param {function} callback Success callback function
     * @param {function} error Error callback function
     * @returns {XMLHttpRequest}
     */
    geotoolkit.intgeo.RemoteFaultPillarDataSource.prototype.readMetadata = function(callback, error){};
    /**
     * Retrieves asynchronously the data for the fault as json
     * @param {function} callback Success callback function
     * @param {function} error Error callback function
     * @returns {XMLHttpRequest}
     */
    geotoolkit.intgeo.RemoteFaultPillarDataSource.prototype.readData = function(callback, error){};

/**
 * A connector for INTGeoServer 'Stream' GridSurfaces
 * @param {object} options The options
 * @param {object} options.server The server url
 * @param {object} [options.metaservice] The metadata service name
 * @param {object} [options.dataservice] The data service name
 * @param {object} options.file The file path
 * @class geotoolkit.intgeo.RemoteGridSurfaceDataSource
 */
geotoolkit.intgeo.RemoteGridSurfaceDataSource = {};
    /**
     * Retrieves asynchronously the metadata for the gridsurface
     * @param {function} callback Success callback function
     * @param {function} error Error callback function
     * @returns {XMLHttpRequest}
     */
    geotoolkit.intgeo.RemoteGridSurfaceDataSource.prototype.readMetadata = function(callback, error){};
    /**
     * Retrieves asynchronously the data for the gridsurface as Float32Array
     * @param {function} callback Success callback function
     * @param {function} error Error callback function
     * @returns {XMLHttpRequest}
     */
    geotoolkit.intgeo.RemoteGridSurfaceDataSource.prototype.readDataArray = function(callback, error){};

/**
 * A connector for INTGeoServer welllogs
 * @param {object} options The options
 * @param {object} options.server The server url
 * @param {object} [options.metaservice] The metadata service name
 * @param {object} [options.dataservice] The data service name
 * @param {object} options.file The file path
 * @class geotoolkit.intgeo.RemoteWelllogDataSource
 */
geotoolkit.intgeo.RemoteWelllogDataSource = {};
    /**
     * Retrieves asynchronously the metadata for the gridwell
     * @param {function} callback Success callback function
     * @param {function} error Error callback function
     * @returns {XMLHttpRequest}
     */
    geotoolkit.intgeo.RemoteWelllogDataSource.prototype.readMetadata = function(callback, error){};
    /**
     * Retrieves asynchronously the data for the well
     * @param {string} curveId The curve to request id
     * @param {function} callback Success callback function
     * @param {function} error Error callback function
     * @returns {XMLHttpRequest}
     */
    geotoolkit.intgeo.RemoteWelllogDataSource.prototype.readCurve = function(curveId, callback, error){};

