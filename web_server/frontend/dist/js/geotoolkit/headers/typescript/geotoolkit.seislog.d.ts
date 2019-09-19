declare module geotoolkit {
    module seislog {
        /**
         * Defines seismic image to render data from seismic pipeline
         */
        class WaveSeismicImage extends geotoolkit.seismic.image.SeismicImage {
            /**
             * Defines seismic image to render data from seismic pipeline
             * @param pipeline  (Required) represents seismic data
             * @param x1  (Required) model coordinate in the parent object.
             * @param y1  (Required) model coordinate in the parent object.
             * @param x2  (Required) model coordinate in the parent object.
             * @param y2  (Required) model coordinate in the parent object.
             */
            constructor(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, x1: number, y1: number, x2: number, y2: number);
            /**
             * Sets the location and size of the framing rectangle of this
             * rectangular shape to the specified values. This method is the same as setRect.
             * @param x1  (Required) x coordinate of the top left corner
             * @param y1  (Required) y coordinate of the top left corner
             * @param x2  (Required) x coordinate of the bottom right corner
             * @param y2  (Required) y coordinate of the bottom right corner
             */
            setBounds(x1: number, y1: number, x2: number, y2: number): this;
        }
        module headers {
            class AdaptiveSeismicImageHeader extends geotoolkit.welllog.header.AdaptiveLogVisualHeader {
                /**
                 * @param visual  (Optional) visual
                 */
                constructor(visual?: geotoolkit.seismic.image.SeismicImage);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.seislog.headers.AdaptiveSeismicImageHeader): any;
                /**
                 * Returns the number formatter for the min value
                 */
                getMinValueFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Returns the number formatter for the max value
                 */
                getMaxValueFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Sets the number formatter for the min value
                 * @param format  (Required) number format
                 */
                setMinValueFormat(format: geotoolkit.util.NumberFormat): this;
                /**
                 * Sets the number formatter for the max value
                 * @param format  (Required) number format
                 */
                setMaxValueFormat(format: geotoolkit.util.NumberFormat): this;
            }
        }
    }
}
