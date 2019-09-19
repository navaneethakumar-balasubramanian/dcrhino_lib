declare module geotoolkit {
    module cgm {
        /**
         * Utility class for CGM rendering
         */
        class CgmExport {
            /**
             * Utility class for CGM rendering
             */
            constructor();
            /**
             * Export group to CGM stream
             * @param root  (Required) root node to be used for export.
             * @param cgmStream  (Required) output stream
             * @param exportBounds  (Optional) export bounds
             * @param options  (Optional) export options
             * @param options.usesimplegradient  (Optional) set true if use two-coloured gradients
             */
            exportToCgmStream(root: geotoolkit.scene.exports.IExportable|geotoolkit.scene.exports.AbstractDocumentElement|geotoolkit.scene.Group|geotoolkit.scene.shapes.Shape, cgmStream: geotoolkit.util.stream.BinaryStream, exportBounds?: geotoolkit.util.Rect, options?: any | { usesimplegradient?: boolean; } ): geotoolkit.util.stream.BinaryStream;
        }
    }
}
