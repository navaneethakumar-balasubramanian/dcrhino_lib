declare module geotoolkit {
    module pdf {
        /**
         * Enum of font sub type
         */
        var FontSubType: any;
        /**
         */
        var MaximumImageSize: any;
        /**
         * ImageCompression
         */
        var ImageCompression: any;
        /**
         * SpeedCompression (used for PNG compression only)
         */
        var SpeedCompression: any;
        /**
         * Defines PDF stream
         */
        class PdfStream extends geotoolkit.util.stream.Stream {
            /**
             * Defines PDF stream
             */
            constructor();
        }
        /**
         * Defines String stream
         */
        class StringStream extends geotoolkit.util.stream.StringStream {
            /**
             * Defines String stream
             */
            constructor();
        }
        /**
         * Enum of font sub type
         */
        interface FontSubType {
            /**
             * Type1
             */
            Type1: string;
            /**
             * TrueType
             */
            TrueType: string;
        }
        /**
         * ImageCompression
         */
        interface ImageCompression {
            /**
             * NONE
             */
            NONE: string;
            /**
             * JPEG
             */
            JPEG: string;
            /**
             * PNG
             */
            PNG: string;
            /**
             * AUTO mode. Save original compress images in original format. JPEG in JPEG, 
             * PNG in PNG, other tries to save to PNG
             */
            AUTO: string;
        }
        /**
         * SpeedCompression (used for PNG compression only)
         */
        interface SpeedCompression {
            /**
             * MEDIUM (reference)
             */
            MEDIUM: string;
            /**
             * FAST (avg. 0.13x faster than medium)
             */
            FAST: string;
            /**
             * SLOW (avg. 2.80x slower than medium)
             */
            SLOW: string;
        }
    }
    module scene {
        module exports {
            /**
             * Utility class to export node
             */
            class PdfExport {
                /**
                 * Utility class to export node
                 */
                constructor();
                /**
                 * Export group to PDF
                 * @param root  (Required) root node to be used for export.
                 * @param imageWidth  (Required) image width(Optional)
                 * @param imageHeight  (Required) image height (Optional)
                 * @param modelLimits  (Required) modellimits (Optional)
                 */
                exportToPdf(root: geotoolkit.scene.Group, imageWidth: number, imageHeight: number, modelLimits: geotoolkit.util.Rect): string|Uint8Array;
                /**
                 * Export document to PDF
                 * @param document  (Required) document to be exported
                 * @param printSettings  (Required) info about print settings
                 * @param printSettings.pdfStream  (Optional) output stream for pdf
                 * @param printSettings.paperFormat  (Optional) paper format
                 * @param printSettings.outputUnit  (Optional) unit
                 * @param printSettings.author  (Optional) author
                 * @param printSettings.clippingEnabled  (Optional) if this flag is set then clipping is enabled
                 */
                documentExportToPdf(document: geotoolkit.scene.exports.Document, printSettings: any | { pdfStream?: geotoolkit.util.stream.StringStream; paperFormat?: geotoolkit.scene.exports.AbstractPaperFormat|string; outputUnit?: geotoolkit.util.AbstractUnit|string; author?: string; clippingEnabled?: boolean; } ): string|Uint8Array;
                /**
                 * set image compression settings for the pdf export.
                 * right now three methods are available @see {@link geotoolkit.pdf.ImageCompression},
                 * if you select the PNG method, then you could pass a {@link geotoolkit.pdf.SpeedCompression} speed parameter
                 * if you select the JPEG method, then you could pass a number ranged from 0 to 1 to specify the quality of the image
                 * if you select the NONE method, all parameters will be ignored.
                 * WARNING! if you select the NONE method and memory is not enough, the PNG method will be selected
                 * @param method  (Required) 
                 * @param quality  (Optional) level of quality
                 * @param speed  (Optional) compression speed
                 */
                setImageCompression(method: geotoolkit.pdf.ImageCompression, quality?: number, speed?: geotoolkit.pdf.SpeedCompression): this;
                /**
                 * Enable or disable stream compression. By default it is enable
                 * @param enable  (Required) enable or disable image compression
                 */
                setStreamCompression(enable: boolean): this;
                /**
                 * Return status of stream compression if it is enable or disable
                 */
                getStreamCompression(): boolean;
                /**
                 * Embeds font into PDF
                 * @param subType  (Required) sub type
                 * @param fontName  (Required) font name
                 * @param fontWeight  (Required) font weight
                 * @param fontStyle  (Required) font style
                 * @param fontBase64EncodedFile  (Required) base64 encoded True Type Font file (TTF)
                 * @param encoding  (Required) encoding Identity-H
                 */
                embedFont(subType: geotoolkit.pdf.FontSubType, fontName: string, fontWeight: string, fontStyle: string, fontBase64EncodedFile: any[], encoding: string): any;
                /**
                 * Export document to PDF stream
                 * @param document  (Required) document to export
                 * @param printSettings  (Required) info about print settings
                 * @param printSettings.pdfStream  (Optional) output stream for pdf
                 * @param printSettings.paperFormat  (Optional) paper format
                 * @param printSettings.outputUnit  (Optional) unit
                 * @param printSettings.author  (Optional) author
                 * @param printSettings.clippingEnabled  (Optional) if this flag is set then clipping is enabled
                 * @param pdfStream  (Optional) output stream for pdf
                 */
                documentExportToPdfStream(document: geotoolkit.scene.exports.Document, printSettings: any | { pdfStream?: geotoolkit.util.stream.StringStream; paperFormat?: geotoolkit.scene.exports.AbstractPaperFormat|string; outputUnit?: geotoolkit.util.AbstractUnit|string; author?: string; clippingEnabled?: boolean; } , pdfStream?: geotoolkit.util.stream.Stream): geotoolkit.util.stream.Stream;
                /**
                 * Export document to PDF stream asynchronously
                 * @param document  (Required) document to export
                 * @param printSettings  (Required) info about print settings
                 * @param printSettings.pdfStream  (Optional) output stream for pdf
                 * @param printSettings.paperFormat  (Optional) paper format
                 * @param printSettings.outputUnit  (Optional) unit
                 * @param printSettings.author  (Optional) author
                 * @param printSettings.clippingEnabled  (Optional) if this flag is set then clipping is enabled
                 * @param pdfStream  (Optional) outstream for pdf
                 */
                documentExportToPdfStreamAsync(document: geotoolkit.scene.exports.Document, printSettings: any | { pdfStream?: geotoolkit.util.stream.StringStream; paperFormat?: geotoolkit.scene.exports.AbstractPaperFormat|string; outputUnit?: geotoolkit.util.AbstractUnit|string; author?: string; clippingEnabled?: boolean; } , pdfStream?: geotoolkit.util.stream.Stream): geotoolkit.util.Promise;
                /**
                 * Returns true if exporting a PDF is supported by this browser
                 */
                static isSupported(): boolean;
                /**
                 * Static method to Enable/Disable Text and Image Clipping in Pdf
                 * @param textClippingEnabled  (Required) Text Shape Clipping (default: true)
                 * @param imageClippingEnabled  (Required) Image Shape Clipping (default: true)
                 */
                public static enableClipping(textClippingEnabled: boolean, imageClippingEnabled: boolean): any;
                /**
                 * Sets maximum image size (in bytes)
                 * @param maximumImageSize  (Required) image size for forced selecting PNG compression method
                 */
                static setMaximumImageSize(maximumImageSize: number): any;
            }
        }
    }
}
