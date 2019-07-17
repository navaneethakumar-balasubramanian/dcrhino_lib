declare module geotoolkit {
    module gridding {
        /**
         * Abstract class for gridding interpolators
         */
        class AbstractInterpolator {
            /**
             * Abstract class for gridding interpolators
             * @param options  (Optional) options
             * @param options.filter  (Optional) filter duplicates before training - last data is used
             */
            constructor(options?: any | { filter?: any; } );
            /**
             * Prepare data and run training
             * @param xSeries  (Required) x series
             * @param ySeries  (Required) y series
             * @param zSeries  (Required) z series
             */
            prepare(xSeries: number[], ySeries: number[], zSeries: number[]): geotoolkit.util.Promise;
            /**
             * Teach algorithm with existing points
             * @param xSeries  (Required) x series
             * @param ySeries  (Required) y series
             * @param zSeries  (Required) z series
             */
            protected train(xSeries: number[], ySeries: number[], zSeries: number[]): geotoolkit.util.Promise;
            /**
             * Get interpolate z series by (x,y) pairs. Returns Promise, which resolves with array of z-series
             * @param xSeries  (Required) x series
             * @param ySeries  (Required) y series
             */
            getValues(xSeries: number[], ySeries: number[]): geotoolkit.util.Promise;
        }
        /**
         * Class implements Kriging algorithm.
         * See {@link https://en.wikipedia.org/wiki/Kriging} for more details.
         * (based on implementation by Omar Olmedo, released under The MIT License)
         */
        class KrigingInterpolator extends geotoolkit.gridding.AbstractInterpolator {
            /**
             * Class implements Kriging algorithm.
             * See {@link https://en.wikipedia.org/wiki/Kriging} for more details.
             * (based on implementation by Omar Olmedo, released under The MIT License)
             * @param options  (Optional) JSON options
             * @param options.model  (Optional) Variogram model
             * @param options.sigma2  (Optional) sigma^2 coeff
             * @param options.alfa  (Optional) alfa coeff
             */
            constructor(options?: any | { model?: geotoolkit.gridding.KrigingInterpolator.Model; sigma2?: number; alfa?: number; } );
            /**
             * Variogram model
             */
            static Model: any;
        }
        /**
         * Class implements Thin Plate algorithm.
         * See {@link https://en.wikipedia.org/wiki/Thin_plate_spline} for more details.
         */
        class ThinPlateInterpolator extends geotoolkit.gridding.AbstractInterpolator {
            /**
             * Class implements Thin Plate algorithm.
             * See {@link https://en.wikipedia.org/wiki/Thin_plate_spline} for more details.
             */
            constructor();
        }
        module KrigingInterpolator {
            /**
             * Variogram model
             */
            interface Model {
                /**
                 * Gaussian
                 */
                Gaussian: string;
                /**
                 * Exponential
                 */
                Exponential: string;
                /**
                 * Spherical
                 */
                Spherical: string;
            }
        }
    }
}
