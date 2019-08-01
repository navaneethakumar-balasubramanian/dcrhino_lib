declare module geotoolkit {
    module seismic {
        module cgmplus {
            /**
             * Utility class for CGM+ rendering. NOTE: use exportToCgmStreamAsync() method.
             */
            class CgmPlusExport extends geotoolkit.cgm.CgmExport {
                /**
                 * Utility class for CGM+ rendering. NOTE: use exportToCgmStreamAsync() method.
                 */
                constructor();
                /**
                 * Export group to CGM stream asynchronously
                 * @param root  (Required) root node to be used for export.
                 * @param cgmStream  (Required) output stream for cgm+
                 * @param exportBounds  (Optional) export bounds
                 * @param options  (Optional) export options
                 * @param progress  (Optional) progress function
                 * @param callback  (Optional) callback function
                 */
                exportToCgmStreamAsync(root: geotoolkit.scene.exports.IExportable|geotoolkit.scene.exports.AbstractDocumentElement|geotoolkit.scene.Group|geotoolkit.scene.shapes.Shape, cgmStream: geotoolkit.util.stream.BinaryStream, exportBounds?: geotoolkit.util.Rect, options?: any, progress?: Function, callback?: Function): any;
                /**
                 * Stops exporting
                 */
                cancel(): any;
            }
        }
    }
}
