/**
 * Abstract class for gridding interpolators
 * @class geotoolkit.gridding.AbstractInterpolator
 * @param {object} [options] options
 * @param {object} [options.filter = true] filter duplicates before training - last data is used
 */
geotoolkit.gridding.AbstractInterpolator = {};
    /**
     * Prepare data and run training
     * @param {number[]} xSeries x series
     * @param {number[]} ySeries y series
     * @param {number[]} zSeries z series
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.gridding.AbstractInterpolator.prototype.prepare = function(xSeries, ySeries, zSeries){};
    /**
     * Teach algorithm with existing points
     * @function
     * @abstract
     * @protected
     * @param {number[]} xSeries x series
     * @param {number[]} ySeries y series
     * @param {number[]} zSeries z series
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.gridding.AbstractInterpolator.prototype.train = function(xSeries, ySeries, zSeries){};
    /**
     * Get interpolate z series by (x,y) pairs. Returns Promise, which resolves with array of z-series
     * @function
     * @abstract
     * @param {number[]} xSeries x series
     * @param {number[]} ySeries y series
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.gridding.AbstractInterpolator.prototype.getValues = function(xSeries, ySeries){};

/**
 * Class implements Kriging algorithm.
 * See {@link https://en.wikipedia.org/wiki/Kriging} for more details.
 * (based on implementation by Omar Olmedo, released under The MIT License)
 * @class geotoolkit.gridding.KrigingInterpolator
 * @augments geotoolkit.gridding.AbstractInterpolator
 * @param {Object} [options] JSON options
 * @param {geotoolkit.gridding.KrigingInterpolator.Model} [options.model = geotoolkit.gridding.KrigingInterpolator.Model.Exponential] Variogram model
 * @param {number} [options.sigma2 = 0] sigma^2 coeff
 * @param {number} [options.alfa = 10] alfa coeff
 */
geotoolkit.gridding.KrigingInterpolator = {};
    /**
     * Variogram model
     * @enum
     * @readonly
     */
    geotoolkit.gridding.KrigingInterpolator.Model = {};
        /**
         * Gaussian
         * @type {string}
         */
        geotoolkit.gridding.KrigingInterpolator.Model.Gaussian = "";
        /**
         * Exponential
         * @type {string}
         */
        geotoolkit.gridding.KrigingInterpolator.Model.Exponential = "";
        /**
         * Spherical
         * @type {string}
         */
        geotoolkit.gridding.KrigingInterpolator.Model.Spherical = "";
    /**
     * @inheritdoc
     */
    geotoolkit.gridding.KrigingInterpolator.prototype.train = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.gridding.KrigingInterpolator.prototype.getValues = function(){};

/**
 * Class implements Thin Plate algorithm.
 * See {@link https://en.wikipedia.org/wiki/Thin_plate_spline} for more details.
 * @class geotoolkit.gridding.ThinPlateInterpolator
 * @augments geotoolkit.gridding.AbstractInterpolator
 */
geotoolkit.gridding.ThinPlateInterpolator = {};
    /**
     * @inheritdoc
     */
    geotoolkit.gridding.ThinPlateInterpolator.prototype.train = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.gridding.ThinPlateInterpolator.prototype.getValues = function(){};

