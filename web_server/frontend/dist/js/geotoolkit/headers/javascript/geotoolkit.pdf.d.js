/**
 * API for representation of pdf stream
 * @namespace */
geotoolkit.pdf = {};
    /**
     * Enum of font sub type
     * @enum
     * @readonly
     */
    geotoolkit.pdf.FontSubType = {};
        /**
         * Type1
         * @type {string}
         */
        geotoolkit.pdf.FontSubType.Type1 = "";
        /**
         * TrueType
         * @type {string}
         */
        geotoolkit.pdf.FontSubType.TrueType = "";
    /** @preserve
     *Deflate.js - https://github.com/gildas-lormeau/zip.js
     *Copyright (c) 2013 Gildas Lormeau. All rights reserved.
     *
     *Redistribution and use in source and binary forms, with or without
     *modification, are permitted provided that the following conditions are met:
     *
     *1. Redistributions of source code must retain the above copyright notice,
     *this list of conditions and the following disclaimer.
     *
     *2. Redistributions in binary form must reproduce the above copyright
     *notice, this list of conditions and the following disclaimer in
     *the documentation and/or other materials provided with the distribution.
     *
     *3. The names of the authors may not be used to endorse or promote products
     *derived from this software without specific prior written permission.
     *
     *THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
     *INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
     *FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
     *INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
     *INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
     *LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
     *OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
     *LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     *NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
     *EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */
    geotoolkit.pdf.MaximumImageSize = {};
    /**
     * ImageCompression
     * @readonly
     * @enum
     */
    geotoolkit.pdf.ImageCompression = {};
        /**
         * NONE
         * @type {string}
         */
        geotoolkit.pdf.ImageCompression.NONE = "";
        /**
         * JPEG
         * @type {string}
         */
        geotoolkit.pdf.ImageCompression.JPEG = "";
        /**
         * PNG
         * @type {string}
         */
        geotoolkit.pdf.ImageCompression.PNG = "";
        /**
         * AUTO mode. Save original compress images in original format. JPEG in JPEG, 
         * PNG in PNG, other tries to save to PNG 
         * @type {string}
         */
        geotoolkit.pdf.ImageCompression.AUTO = "";
    /**
     * SpeedCompression (used for PNG compression only)
     * @readonly
     * @enum
     */
    geotoolkit.pdf.SpeedCompression = {};
        /**
         * MEDIUM (reference)
         * @type {string}
         */
        geotoolkit.pdf.SpeedCompression.MEDIUM = "";
        /**
         * FAST (avg. 0.13x faster than medium)
         * @type {string}
         */
        geotoolkit.pdf.SpeedCompression.FAST = "";
        /**
         * SLOW (avg. 2.80x slower than medium)
         * @type {string}
         */
        geotoolkit.pdf.SpeedCompression.SLOW = "";

/**
 * Defines PDF stream
 * @deprecated since 2.5, use geotoolkit.util.stream.Stream instead
 * @class geotoolkit.pdf.PdfStream
 * @augments geotoolkit.util.stream.Stream
 */
geotoolkit.pdf.PdfStream = {};

/**
 * Defines String stream
 * @deprecated since 2.5, use geotoolkit.util.stream.StringStream instead
 * @class geotoolkit.pdf.StringStream
 * @augments geotoolkit.util.stream.StringStream
 */
geotoolkit.pdf.StringStream = {};

/**
 * Utility class to export node
 *
 * @class geotoolkit.scene.exports.PdfExport
 */
geotoolkit.scene.exports.PdfExport = {};
    /**
     * Export group to PDF
     *
     * @throws {Error} if memory is not enough
     * @param {geotoolkit.scene.Group} root root node to be used for export.
     * @param {number} imageWidth image width(Optional)
     * @param {number} imageHeight image height (Optional)
     * @param {geotoolkit.util.Rect} modelLimits modellimits (Optional)
     * @returns {string | Uint8Array} PDF Content
     */
    geotoolkit.scene.exports.PdfExport.prototype.exportToPdf = function(root, imageWidth, imageHeight, modelLimits){};
    /**
     * Export document to PDF
     *
     * @throws {Error} if memory is not enough
     * @param {geotoolkit.scene.exports.Document} document document to be exported
     * @param {object} printSettings info about print settings
     * @param {geotoolkit.util.stream.StringStream} [printSettings.pdfStream] output stream for pdf
     * @param {geotoolkit.scene.exports.AbstractPaperFormat|string} [printSettings.paperFormat] paper format
     * @param {geotoolkit.util.AbstractUnit|string} [printSettings.outputUnit] unit
     * @param {string} [printSettings.author] author
     * @param {boolean} [printSettings.clippingEnabled] if this flag is set then clipping is enabled
     * @returns {string | Uint8Array} PDF in string
     */
    geotoolkit.scene.exports.PdfExport.prototype.documentExportToPdf = function(document, printSettings){};
    /**
     * set image compression settings for the pdf export.
     * right now three methods are available @see {@link geotoolkit.pdf.ImageCompression},
     * if you select the PNG method, then you could pass a {@link geotoolkit.pdf.SpeedCompression} speed parameter
     * if you select the JPEG method, then you could pass a number ranged from 0 to 1 to specify the quality of the image
     * if you select the NONE method, all parameters will be ignored.
     * WARNING! if you select the NONE method and memory is not enough, the PNG method will be selected
     *
     * @param {geotoolkit.pdf.ImageCompression} method
     * @param {number} [quality] level of quality
     * @param {geotoolkit.pdf.SpeedCompression} [speed] compression speed
     * @returns {geotoolkit.scene.exports.PdfExport}
     */
    geotoolkit.scene.exports.PdfExport.prototype.setImageCompression = function(method, quality, speed){};
    /**
     * Enable or disable stream compression. By default it is enable
     * @param {boolean} enable enable or disable image compression
     * @returns {geotoolkit.scene.exports.PdfExport}
     */
    geotoolkit.scene.exports.PdfExport.prototype.setStreamCompression = function(enable){};
    /**
     * Return status of stream compression if it is enable or disable
     * @returns {boolean}
     */
    geotoolkit.scene.exports.PdfExport.prototype.getStreamCompression = function(){};
    /**
     * Embeds font into PDF
     * @param {geotoolkit.pdf.FontSubType} subType sub type
     * @param {string} fontName - font name
     * @param {string} fontWeight - font weight
     * @param {string} fontStyle - font style
     * @param {Array} fontBase64EncodedFile - base64 encoded True Type Font file (TTF)
     * @param {string} encoding - encoding Identity-H
     */
    geotoolkit.scene.exports.PdfExport.prototype.embedFont = function(subType, fontName, fontWeight, fontStyle, fontBase64EncodedFile, encoding){};
    /**
     * Export document to PDF stream
     *
     * @throws {Error} if memory is not enough
     * @param {geotoolkit.scene.exports.Document} document document to export
     * @param {object} printSettings info about print settings
     * @param {geotoolkit.util.stream.StringStream} [printSettings.pdfStream] output stream for pdf
     * @param {geotoolkit.scene.exports.AbstractPaperFormat|string} [printSettings.paperFormat] paper format
     * @param {geotoolkit.util.AbstractUnit|string} [printSettings.outputUnit] unit
     * @param {string} [printSettings.author] author
     * @param {boolean} [printSettings.clippingEnabled] if this flag is set then clipping is enabled
     * @param {geotoolkit.util.stream.Stream} [pdfStream] output stream for pdf
     * @returns {geotoolkit.util.stream.Stream} PDF stream
     */
    geotoolkit.scene.exports.PdfExport.prototype.documentExportToPdfStream = function(document, printSettings, pdfStream){};
    /**
     * Export document to PDF stream asynchronously
     *
     * @param {geotoolkit.scene.exports.Document} document document to export
     * @param {object} printSettings info about print settings
     * @param {geotoolkit.util.stream.StringStream} [printSettings.pdfStream] output stream for pdf
     * @param {geotoolkit.scene.exports.AbstractPaperFormat|string} [printSettings.paperFormat] paper format
     * @param {geotoolkit.util.AbstractUnit|string} [printSettings.outputUnit] unit
     * @param {string} [printSettings.author] author
     * @param {boolean} [printSettings.clippingEnabled] if this flag is set then clipping is enabled
     * @param {geotoolkit.util.stream.Stream} [pdfStream] outstream for pdf
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.scene.exports.PdfExport.prototype.documentExportToPdfStreamAsync = function(document, printSettings, pdfStream){};
    /**
     * Returns true if exporting a PDF is supported by this browser
     *
     * @returns {boolean}
     */
    geotoolkit.scene.exports.PdfExport.isSupported = function(){};
    /**
     * Static method to Enable/Disable Text and Image Clipping in Pdf
     * @param {boolean} textClippingEnabled - Text Shape Clipping (default: true)
     * @param {boolean} imageClippingEnabled - Image Shape Clipping (default: true)
     * @public
     */
    geotoolkit.scene.exports.PdfExport.enableClipping = function(textClippingEnabled, imageClippingEnabled){};
    /**
     * Sets maximum image size (in bytes)
     * @param {number} maximumImageSize image size for forced selecting PNG compression method
     */
    geotoolkit.scene.exports.PdfExport.setMaximumImageSize = function(maximumImageSize){};

