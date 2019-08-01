/**
 * API for CGM+ export
 * @namespace */
geotoolkit.seismic.cgmplus = {};

/**
 * Utility class for CGM+ rendering. NOTE: use exportToCgmStreamAsync() method.
 * @augments geotoolkit.cgm.CgmExport
 * @class geotoolkit.seismic.cgmplus.CgmPlusExport
 */
geotoolkit.seismic.cgmplus.CgmPlusExport = {};
    /**
     * Export group to CGM stream asynchronously
     *
     * @param {geotoolkit.scene.exports.IExportable | geotoolkit.scene.exports.AbstractDocumentElement | geotoolkit.scene.Group | geotoolkit.scene.shapes.Shape} root root node to be used for export.
     * @param {geotoolkit.util.stream.BinaryStream} cgmStream output stream for cgm+
     * @param {geotoolkit.util.Rect} [exportBounds] export bounds
     * @param {object} [options] export options
     * @param {function} progress progress function
     * @param {function} callback callback function
     */
    geotoolkit.seismic.cgmplus.CgmPlusExport.prototype.exportToCgmStreamAsync = function(root, cgmStream, exportBounds, options, progress, callback){};
    /**
     * Stops exporting
     */
    geotoolkit.seismic.cgmplus.CgmPlusExport.prototype.cancel = function(){};

