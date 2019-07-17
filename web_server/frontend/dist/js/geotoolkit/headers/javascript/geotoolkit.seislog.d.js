/**
 * API used to generate a wave seismic image
 * @namespace */
geotoolkit.seislog = {};

/**
 * APIs for seismic image header representation
 * @namespace */
geotoolkit.seislog.headers = {};

/**
 * Defines seismic image to render data from seismic pipeline
 *
 * @class geotoolkit.seislog.WaveSeismicImage
 * @augments geotoolkit.seismic.image.SeismicImage
 * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline represents seismic data
 * @param {number} x1 model coordinate in the parent object.
 * @param {number} y1 model coordinate in the parent object.
 * @param {number} x2 model coordinate in the parent object.
 * @param {number} y2 model coordinate in the parent object.
 */
geotoolkit.seislog.WaveSeismicImage = {};
    /**
     * Sets the location and size of the framing rectangle of this
     * rectangular shape to the specified values. This method is the same as setRect.
     *
     * @param {number} x1
     * x coordinate of the top left corner
     * @param {number} y1
     * y coordinate of the top left corner
     * @param {number} x2
     * x coordinate of the bottom right corner
     * @param {number} y2
     * y coordinate of the bottom right corner
     * @returns {geotoolkit.seislog.WaveSeismicImage}
     */
    geotoolkit.seislog.WaveSeismicImage.prototype.setBounds = function(x1, y1, x2, y2){};

/**
 * @class geotoolkit.seislog.headers.AdaptiveSeismicImageHeader
 * @augments geotoolkit.welllog.header.AdaptiveLogVisualHeader
 * @param {?geotoolkit.seismic.image.SeismicImage} visual visual
 */
geotoolkit.seislog.headers.AdaptiveSeismicImageHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.seislog.headers.AdaptiveSeismicImageHeader.prototype.render = function(){};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.seislog.headers.AdaptiveSeismicImageHeader} src Source to copy from
     */
    geotoolkit.seislog.headers.AdaptiveSeismicImageHeader.prototype.copyConstructor = function(src){};
    /**
     * Returns the number formatter for the min value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.seislog.headers.AdaptiveSeismicImageHeader.prototype.getMinValueFormat = function(){};
    /**
     * Returns the number formatter for the max value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.seislog.headers.AdaptiveSeismicImageHeader.prototype.getMaxValueFormat = function(){};
    /**
     * Sets the number formatter for the min value
     * @param {geotoolkit.util.NumberFormat} format number format
     * @returns {geotoolkit.seislog.headers.AdaptiveSeismicImageHeader}
     */
    geotoolkit.seislog.headers.AdaptiveSeismicImageHeader.prototype.setMinValueFormat = function(format){};
    /**
     * Sets the number formatter for the max value
     * @param {geotoolkit.util.NumberFormat} format number format
     * @returns {geotoolkit.seislog.headers.AdaptiveSeismicImageHeader}
     */
    geotoolkit.seislog.headers.AdaptiveSeismicImageHeader.prototype.setMaxValueFormat = function(format){};

