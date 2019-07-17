/** @namespace */
geotoolkit.cgm = {};

/**
 * Utility class for CGM rendering
 *
 * @class geotoolkit.cgm.CgmExport
 */
geotoolkit.cgm.CgmExport = {};
    /**
     * Export group to CGM stream
     *
     * @param {geotoolkit.scene.exports.IExportable | geotoolkit.scene.exports.AbstractDocumentElement | geotoolkit.scene.Group | geotoolkit.scene.shapes.Shape} root root node to be used for export.
     * @param {geotoolkit.util.stream.BinaryStream} cgmStream output stream
     * @param {geotoolkit.util.Rect} [exportBounds] export bounds
     * @param {object} [options] export options
     * @param {boolean} [options.usesimplegradient=false] set true if use two-coloured gradients
     * @returns {geotoolkit.util.stream.BinaryStream} CGM stream
     */
    geotoolkit.cgm.CgmExport.prototype.exportToCgmStream = function(root, cgmStream, exportBounds, options){};

