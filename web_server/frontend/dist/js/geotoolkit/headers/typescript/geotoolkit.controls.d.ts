declare module geotoolkit {
    module controls {
        module util {
            module Interpolation {
                module Strategy {
                    /**
                     * Interpolate zero for missing values
                     */
                    var InterpolateZero: number;
                    /**
                     * Interpolate null for missing values
                     */
                    var InterpolateNull: number;
                    /**
                     * Interpolate missing values using linear interpolation
                     */
                    var InterpolateMissingValues: number;
                }
            }
            module regression {
                /**
                 * Base class of regression model
                 */
                class RegressionBase extends geotoolkit.util.EventDispatcher {
                    /**
                     * Base class of regression model
                     * @param options  (Required) see setOptions and setData for details
                     * @param customFunc  (Required) custom function to represent regression model
                     */
                    constructor(options: any, customFunc: any);
                    /**
                     * Type of events
                     */
                    static Events: any;
                    /**
                     * pre-defined probability value of confidence level when picking value from t-table
                     */
                    static Probability: any;
                    /**
                     * fit the curve with given data set
                     * the subclass of RegressionBase need to support incremental fitting by default
                     * that means the model have to keep necessary intermediate values as properties
                     * which can be used to do incremental calculating when add new data point to model
                     * @param dataX  (Required) data set x
                     * @param dataY  (Required) data set y
                     * @param weights  (Required) of data point
                     */
                    fit(dataX: number[], dataY: number[], weights: number[]): any;
                    /**
                     * get all data for training
                     */
                    getData(): {data:any;array:number[]}|any;
                    /**
                     * predict y value(s) with given x value
                     * @param dataX  (Required) single value or data set of X
                     */
                    predict(dataX: number|number[]): number|number[];
                    /**
                     * set options
                     * @param options  (Required) options
                     * @param options.coefficients  (Optional) array of coefficients
                     */
                    setOptions(options: any | { coefficients?: number[]; } ): this;
                    /**
                     * reset the model including all intermediate variables and training data
                     */
                    resetModel(): any;
                    /**
                     * get customized coefficients flag
                     */
                    isCustomizedCoef(): boolean;
                    /**
                     * get options
                     */
                    getOptions(): any;
                    /**
                     * get properties
                     */
                    getProperties(): any;
                    /**
                     * set probability for looking up t-table to determine confidence interval
                     * @param prob  (Required) probability
                     */
                    setConfidenceProbability(prob: number|geotoolkit.controls.util.regression.RegressionBase.Probability): this;
                    /**
                     * get probability for determine confidence interval
                     */
                    getConfidenceProbability(): number;
                    /**
                     * set probability for looking up t-table to determine prediction interval
                     * @param prob  (Required) probability
                     */
                    setPredictionProbability(prob: number|geotoolkit.controls.util.regression.RegressionBase.Probability): this;
                    /**
                     * get probability for determine prediction interval
                     */
                    getPredictionProbability(): number;
                    /**
                     * get mean value for data set x or y
                     * @param axis  (Required) axis could be 'x' or 'y'
                     */
                    getMean(axis: string): number|any;
                    /**
                     * get sum squared for data set x or y
                     * @param axis  (Required) axis could be 'x' or 'y'
                     */
                    getTotalSumSquared(axis: string): number|any;
                    /**
                     * get sum squared of residual
                     */
                    getSumSquaredResidual(): number|any;
                    /**
                     * get degree of freedom
                     */
                    getDegreeOfFreedom(): number;
                    /**
                     * get R squared value
                     */
                    getRsquared(): number|any;
                    /**
                     * get array of residuals
                     */
                    getResiduals(): number[]|any;
                    /**
                     * get confidence interval for given x value
                     * @param x  (Required) given value to determine the confidence interval
                     */
                    getConfidenceInterval(x: number): number|any;
                    /**
                     * get prediction interval for given x value
                     * @param x  (Required) given value to determine the prediction interval
                     */
                    getPredictionInterval(x: number): number|any;
                    /**
                     * get statistics of regression analysis
                     */
                    getStatistics(): {statistics:{rsquared:number;meanx:number;meany:number;df:number;sumsquaredx:number;sumsquaredy:number;sumsquaredres:number}}|any;
                    /**
                     * get coefficients
                     */
                    getCoefficients(): any[];
                }
                /**
                 * generate a exponential regression model
                 */
                class Exponential extends geotoolkit.controls.util.regression.RegressionBase {
                    /**
                     * generate a exponential regression model
                     * @param options  (Required) 
                     */
                    constructor(options: any);
                    /**
                     * fit curve
                     * @param dataX  (Required) data array of observations x
                     * @param dataY  (Required) data array in observations y
                     * @param weights  (Required) of data point
                     */
                    fit(dataX: number[], dataY: number[], weights: number[]): any;
                    /**
                     * get x value of edge point where derivative of regression line is 1 or -1 after adjust scale of x and y
                     * @param scale  (Optional) scale
                     */
                    getEdge(scale?: number): number;
                    /**
                     * predict x value with given y value(s)
                     * @param dataY  (Required) y value(s)
                     */
                    inversePredict(dataY: number|number[]): number|number[];
                }
                /**
                 * generate a linear regression model
                 */
                class Linear extends geotoolkit.controls.util.regression.RegressionBase {
                    /**
                     * generate a linear regression model
                     * @param options  (Required) 
                     */
                    constructor(options: any);
                    /**
                     * fit curve
                     * @param dataX  (Required) data array of observations x
                     * @param dataY  (Required) data array in observations y
                     * @param weights  (Required) of data point
                     */
                    fit(dataX: number[], dataY: number[], weights: number[]): any;
                }
                /**
                 * generate a logarithmic regression model
                 */
                class Logarithmic extends geotoolkit.controls.util.regression.RegressionBase {
                    /**
                     * generate a logarithmic regression model
                     * @param options  (Required) 
                     */
                    constructor(options: any);
                    /**
                     * fit curve
                     * @param dataX  (Required) data array of observations x
                     * @param dataY  (Required) data array in observations y
                     * @param weights  (Required) of data point
                     */
                    fit(dataX: number[], dataY: number[], weights: number[]): any;
                }
                /**
                 * generate a power regression model
                 */
                class Power extends geotoolkit.controls.util.regression.RegressionBase {
                    /**
                     * generate a power regression model
                     * @param options  (Required) 
                     */
                    constructor(options: any);
                    /**
                     * fit curve
                     * @param dataX  (Required) data array of observations x
                     * @param dataY  (Required) data array in observations y
                     * @param weights  (Required) of data point
                     */
                    fit(dataX: number[], dataY: number[], weights: number[]): any;
                }
                /**
                 * generate a polynomial regression model
                 */
                class Polynomial extends geotoolkit.controls.util.regression.RegressionBase {
                    /**
                     * generate a polynomial regression model
                     * @param options  (Required) 
                     * @param options.order  (Optional) the order of polynomial formula
                     */
                    constructor(options: any | { order?: number; } );
                    /**
                     * set options for model
                     * @param options  (Required) 
                     * @param options.order  (Optional) the order of polynomial formula
                     */
                    setOptions(options: any | { order?: number; } ): this;
                    /**
                     */
                    getOptions(): {options:{order:number}}|any;
                    /**
                     * reset regression model to fit new data set
                     */
                    resetModel(): any;
                    /**
                     * fit curve
                     * @param dataX  (Required) data array of observations x
                     * @param dataY  (Required) data array in observations y
                     * @param weights  (Required) of data point
                     */
                    fit(dataX: number[], dataY: number[], weights: number[]): any;
                }
                module RegressionBase {
                    /**
                     * Type of events
                     */
                    interface Events {
                        /**
                         * emit when model or its propeties changed
                         */
                        UpdatedModel: string;
                    }
                    /**
                     * pre-defined probability value of confidence level when picking value from t-table
                     */
                    interface Probability {
                        /**
                         * fixed 80%
                         */
                        P80: number;
                        /**
                         * fixed 90%
                         */
                        P90: number;
                        /**
                         * fixed 95%
                         */
                        P95: number;
                        /**
                         * fixed 99%
                         */
                        P99: number;
                    }
                }
            }
        }
        module editing {
            /**
             * An enumerator containing events fired by Editing tools
             */
            var Events: any;
            /**
             * Implements an abstract handle which can be used to manipulate toolkit components.
             */
            class AbstractHandle extends geotoolkit.scene.shapes.Shape {
                /**
                 * Implements an abstract handle which can be used to manipulate toolkit components.
                 * @param params  (Required) JSON with properties
                 * @param params.activefillstyle  (Optional) Fill style of the handle when it is active
                 * @param params.inactivefillstyle  (Optional) Fill style to apply to handle when it is not active
                 * @param params.activelinestyle  (Optional) Line style of the handle when it is active
                 * @param params.inactivelinestyle  (Optional) Line style to apply to handle when it is not active
                 */
                constructor(params: any | { activefillstyle?: geotoolkit.attributes.FillStyle|string|any; inactivefillstyle?: geotoolkit.attributes.FillStyle|string|any; activelinestyle?: geotoolkit.attributes.LineStyle|string|any; inactivelinestyle?: geotoolkit.attributes.LineStyle|string|any; } );
                /**
                 * Used for cloning
                 * @param src  (Required) Source to copy from
                 */
                copyConstructor(src: geotoolkit.controls.editing.AbstractHandle): any;
                /**
                 * Gets or sets current adapter. Gets if the parameter is not specified or null. Sets new adapter if the parameter
                 * is not null
                 * @param adapter  (Optional) adapter for current shape
                 */
                adapter(adapter?: geotoolkit.controls.editing.ShapeAdapter): geotoolkit.controls.editing.ShapeAdapter;
                /**
                 * Sets active and sets fill style color to either green or white
                 * @param active  (Required) active state or not
                 */
                active(active: boolean): boolean;
                /**
                 * Sets the adapter which owns this handle.
                 * @param adapter  (Required) The owner adapter
                 */
                setAdapter(adapter: geotoolkit.controls.editing.ShapeAdapter): this;
                /**
                 * Returns the adapter which owns this handle.
                 */
                getAdapter(): geotoolkit.controls.editing.ShapeAdapter|any;
                /**
                 * Sets active state of this handle. Active state defines which style will be used
                 * when rendering the handle.
                 * @param active  (Required) Active state flag
                 */
                setActive(active: boolean): this;
                /**
                 * Returns active state of this handle. Active state defines which style will be used
                 * when rendering the handle.
                 */
                isActive(): boolean;
                /**
                 * Return fill style for active state
                 */
                getActiveFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Sets fill style for active state
                 * @param fillStyle  (Required) a new fill style
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setActiveFillStyle(fillStyle: geotoolkit.attributes.FillStyle|string|any, merge?: boolean): this;
                /**
                 * Sets fill style for active state
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setActiveLineStyle(lineStyle: geotoolkit.attributes.LineStyle|string|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } , merge?: boolean): this;
                /**
                 * Return fill style for inactive state
                 */
                getActiveLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Sets fill style for active state
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setInactiveLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Return fill style for inactive state
                 */
                getInactiveLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Return fill style for inactive state
                 */
                getInactiveFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Sets fill style for inactive state
                 * @param fillStyle  (Required) a new fill style
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setInactiveFillStyle(fillStyle: geotoolkit.attributes.FillStyle|string|any, merge?: boolean): this;
                /**
                 * Render the handle
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Sets a json with information required to operate this handle.
                 * The information may be different for every adapter and defined by adapter itself
                 * @param operationInfo  (Required) operation info contains x, y, width and height as numbers
                 */
                setOperationInfo(operationInfo: any): this;
                /**
                 * Returns a json with information required to operate this handle.
                 * The information may be different for every adapter and defined by adapter itself
                 */
                getOperationInfo(): any|any;
                /**
                 * Gets properties pertaining to this handle
                 */
                getProperties(): any;
                /**
                 * Sets properties pertaining to this object
                 * @param props  (Required) object with the new properties to set
                 * @param props.activefillstyle  (Optional) Fill style of the handle when it is active
                 * @param props.inactivefillstyle  (Optional) Fill style to apply to handle when it is not active
                 * @param props.activelinestyle  (Optional) Line style of the handle when it is active
                 * @param props.inactivelinestyle  (Optional) Line style to apply to handle when it is not active
                 * @param props.operationinfo  (Optional) operation info contains x, y, width and height as numbers
                 * @param props.shapeadapter  (Optional) The owner adapter
                 * @param props.active  (Optional) Active state flag
                 */
                setProperties(props: any | { activefillstyle?: geotoolkit.attributes.FillStyle|string|any; inactivefillstyle?: geotoolkit.attributes.FillStyle|string|any; activelinestyle?: geotoolkit.attributes.LineStyle|string|any; inactivelinestyle?: geotoolkit.attributes.LineStyle|string|any; operationinfo?: any; shapeadapter?: geotoolkit.controls.editing.ShapeAdapter; active?: boolean; } ): this;
            }
            /**
             * Implements a handle which has an option to create a ghost of itself and has the api to manage the ghost.
             */
            class GhostBearingHandle extends geotoolkit.controls.editing.AbstractHandle {
                /**
                 * Implements a handle which has an option to create a ghost of itself and has the api to manage the ghost.
                 * @param params  (Required) JSON containing handle properties
                 * @param params.ghostlinestyle  (Optional) The line style to apply to the ghost
                 * @param params.ghostfillstyle  (Optional) The fill style to apply to the ghost
width and height will be set to that number
                 */
                constructor(params: any | { ghostlinestyle?: geotoolkit.attributes.LineStyle|string|any; ghostfillstyle?: geotoolkit.attributes.FillStyle|string|any; } );
                /**
                 * Returns true if a ghost has been initialized for this handle
                 */
                hasGhost(): boolean;
                /**
                 * If a ghost exists, this method disposes the ghost
                 */
                removeGhost(): this;
                /**
                 * Disposes this handle, Clear all listeners and remove the ghost
                 */
                dispose(): any;
                /**
                 * Creates a copy of this handle, sets ghost styles, registers it as a ghosts
                 * and returns the ghost
                 */
                createGhost(): this;
                /**
                 * Returns true if this handle is a ghost
                 */
                isGhost(): boolean;
                /**
                 * Returns the ghost registered with this handle. If ghost does not exists, returns null
                 */
                getGhost(): any|this;
                /**
                 * Resets ghost anchors and transformation to match the real handle
                 */
                resetGhost(): this;
                /**
                 * Sets a flag to this handle which specifies if it is currently a ghost, used internally
                 * @param ghost  (Required) Is Ghost flag
                 */
                protected setGhostMode(ghost: boolean): this;
                /**
                 * Gets the handle to which this ghost is associated
                 */
                getParentHandle(): any|this;
                /**
                 * Sets the handle to which this ghost is associated, used internally
                 * @param parent  (Required) The parent to associate this handle with
                 */
                protected setParentHandle(parent: geotoolkit.controls.editing.GhostBearingHandle): this;
                /**
                 * Gets or sets current adapter of the real handle. Gets if the parameter is not specified or null. Sets new
                 * adapter if the parameter is not null
                 * @param adapter  (Optional) adapter for current shape
                 */
                adapter(adapter?: geotoolkit.controls.editing.ShapeAdapter): geotoolkit.controls.editing.ShapeAdapter;
                /**
                 * Sets current adapter of the real handle if this is a ghost, otherwise sets the adapter to this handle
                 * @param adapter  (Optional) adapter for current shape
                 */
                setAdapter(adapter?: geotoolkit.controls.editing.ShapeAdapter): this;
                /**
                 * Returns current adapter of the real handle if this is a ghost, otherwise returns the adapter to this handle
                 */
                getAdapter(): geotoolkit.controls.editing.ShapeAdapter|any;
                /**
                 * Gets properties pertaining to this handle
                 */
                getProperties(): any;
                /**
                 * Sets properties pertaining to this object
                 * @param props  (Required) 
                 * @param props.ghostlinestyle  (Optional) The line style to apply to the ghost
                 * @param props.ghostfillstyle  (Optional) The fill style to apply to the ghost
                 * @param props.isghost  (Optional) Is Ghost flag
                 */
                setProperties(props: any | { ghostlinestyle?: geotoolkit.attributes.LineStyle|string|any; ghostfillstyle?: geotoolkit.attributes.FillStyle|string|any; isghost?: boolean; } ): this;
                /**
                 * Sets visibility of the handle and its ghost
                 * @param visible  (Required) Visibility flag
                 */
                setVisible(visible: boolean): this;
            }
            /**
             * Implements a handle which has an anchor point and a size. The shape uses symbols to render and accepts painters
             * to change the rendering shape. Anchored handle extends Ghost Bearung Hanle, thus handles ghost rendering in device
             * space as well as model space
             */
            class AnchoredHandle extends geotoolkit.controls.editing.GhostBearingHandle {
                /**
                 * Implements a handle which has an anchor point and a size. The shape uses symbols to render and accepts painters
                 * to change the rendering shape. Anchored handle extends Ghost Bearung Hanle, thus handles ghost rendering in device
                 * space as well as model space
                 * @param x  (Required) X coordinate of handle anchor or a JSON with handle properties
                 * @param x.size  (Optional) The two dimensional size of the anchor
                 * @param x.x  (Optional) X coordinate of handle's anchor
                 * @param x.y  (Optional) Y coordinate of handle's anchor
                 * @param x.painter  (Optional) Painter used to draw the handle
                 * @param x.isindevicespace  (Optional) Flag defining if the handle is in device space
                 * @param y  (Optional) Y coordinate of handle anchor
                 * @param size  (Optional) The two dimensional size of the anchor
                 */
                constructor(x: any | { size?: geotoolkit.util.Dimension|number; x?: number; y?: number; painter?: Function; isindevicespace?: boolean; } |number, y?: number, size?: number|geotoolkit.util.Dimension);
                /**
                 * Sets the point defining the anchor of this handle (coordinates of the symbol)
                 * @param anchor  (Required) position
                 */
                setAnchor(anchor: geotoolkit.util.Point): this;
                /**
                 * Returns the position of the handle
                 */
                getAnchor(): geotoolkit.util.Point;
                /**
                 * Sets the size of the handle. Size is defined in two dimensions and is rendered
                 * with respect to the anchor of this handle
                 * @param size  (Required) size of the handle
                 */
                setHandleSize(size: geotoolkit.util.Dimension): this;
                /**
                 * Return handle size as a two-dimensional unit
                 */
                getHandleSize(): geotoolkit.util.Dimension;
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Check if object is within rendering area
                 * @param context  (Required) Rendering Context
                 */
                checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
                /**
                 * Gets properties pertaining to this handle
                 */
                getProperties(): {props:{size:geotoolkit.util.Dimension;x:number;y:number;painter:Function;isindevicespace:boolean}}|any;
                /**
                 * Gets properties pertaining to this handle
                 * @param props  (Required) JSON with properties
                 * @param props.size  (Optional) The two dimensional size of the anchor
                 * @param props.x  (Optional) X coordinate of handle's anchor
                 * @param props.y  (Optional) Y coordinate of handle's anchor
                 * @param props.painter  (Optional) Painter used to draw the handle
                 * @param props.isindevicespace  (Optional) Flag defining if the handle is in device space
                 */
                setProperties(props: any | { size?: geotoolkit.util.Dimension; x?: number; y?: number; painter?: Function; isindevicespace?: boolean; } ): this;
            }
            /**
             * Defines a shape to draw bounds around shape
             */
            class Box extends geotoolkit.scene.shapes.Rectangle {
                /**
                 * Defines a shape to draw bounds around shape
                 * @param x1  (Optional) x coordinate of the top left corner OR  options to specify rectangle { x1 : {number}, y1 : {number}, x2 :
           {number}, y2 : {number} }
                 * @param y1  (Optional) y coordinate of the top left corner
                 * @param x2  (Optional) x coordinate of the bottom right corner
                 * @param y2  (Optional) y coordinate of the bottom right corner
                 */
                constructor(x1?: number|any, y1?: number, x2?: number, y2?: number);
                /**
                 * Gets or sets current adapter. Gets if the parameter is not specified or null. Sets new adapter if the parameter
                 * is not null
                 * @param adapter  (Optional) adapter for current shape
                 */
                adapter(adapter?: geotoolkit.controls.editing.ShapeAdapter): geotoolkit.controls.editing.ShapeAdapter;
                /**
                 * Gets current adapter
                 */
                getAdapter(): geotoolkit.controls.editing.ShapeAdapter;
                /**
                 * Sets new adapter
                 * @param adapter  (Required) adapter for current shape
                 */
                setAdapter(adapter: geotoolkit.controls.editing.ShapeAdapter): this;
                /**
                 * Return fill style for active state
                 */
                getActiveFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Sets fill style for active state
                 * @param fillStyle  (Required) a new fill style
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setActiveFillStyle(fillStyle: geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle, merge?: boolean): this;
                /**
                 * Return fill style for inactive state
                 */
                getInactiveFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Sets fill style for inactive state
                 * @param fillStyle  (Required) a new fill style
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setInactiveFillStyle(fillStyle: geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle, merge?: boolean): this;
                /**
                 * Sets active
                 * @param active  (Required) active state or not
                 */
                active(active: boolean): boolean;
                /**
                 * Sets active
                 * @param active  (Required) active state or not
                 */
                setActive(active: boolean): this;
                /**
                 * Returns active state of this Box
                 */
                isActive(): boolean;
                /**
                 * Sets the operation info for this item
                 * Operation info contains x, y, width and height as numbers
                 * @param operationInfo  (Required) contains four parameters X,Y,Width and Heigth
                 */
                setOperationInfo(operationInfo: any): this;
                /**
                 * Gets the operation info for this item
                 * Operation info contains x, y, width and height as numbers
                 */
                getOperationInfo(): any;
                /**
                 * Gets properties pertaining to this handle
                 */
                getProperties(): any;
                /**
                 * Sets properties pertaining to this object
                 * @param props  (Required) object with the new properties to set
                 * @param props.activefillstyle  (Optional) Fill style of the handle when it is active
                 * @param props.inactivefillstyle  (Optional) Fill style to apply to handle when it is not active
                 * @param props.active  (Optional) Active state flag
                 */
                setProperties(props: any | { activefillstyle?: geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle; inactivefillstyle?: geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle; active?: boolean; } ): this;
            }
            /**
             * Defines a shape to draw handles for rectangle.
             */
            class BoxHandle extends geotoolkit.controls.editing.GhostBearingHandle {
                /**
                 * Defines a shape to draw handles for rectangle.
                 * @param options  (Optional) x coordinate of the top left corner or a JSON object with properties
                 * @param options.rect  (Optional) Rect object
                 * @param options.activefillstyle  (Optional) The fill style to apply to the active handle
                 * @param options.inactivefillstyle  (Optional) The fill style to apply to the inactive handle
                 * @param y1  (Optional) y coordinate of the top left corner
                 * @param x2  (Optional) x coordinate of the bottom right corner
                 * @param y2  (Optional) y coordinate of the bottom right corner
                 */
                constructor(options?: number|any | { rect?: geotoolkit.util.Rect; activefillstyle?: geotoolkit.attributes.FillStyle|string|any; inactivefillstyle?: geotoolkit.attributes.FillStyle|string|any; } , y1?: number, x2?: number, y2?: number);
                /**
                 * Sets properties pertaining to this object
                 * @param props  (Optional) JSON object with properties
                 * @param props.rect  (Optional) Rect object
                 */
                setProperties(props?: any | { rect?: geotoolkit.util.Rect; } ): this;
                /**
                 * Invalidate node
                 * @param bounds  (Optional) optional rectangular area to be invalidated, or force flag if rectangle is empty
                 * @param force  (Optional) optional boolean parameter that can force invalidation
                 */
                invalidate(bounds?: geotoolkit.util.Rect, force?: boolean): this;
                /**
                 * Gets properties pertaining to this handle
                 */
                getProperties(): any;
                /**
                 * Sets rectangle
                 * @param bounds  (Required) Bounds of rectangle
                 */
                setRect(bounds: geotoolkit.util.Rect): this;
                /**
                 * Gets rectangle
                 */
                getRect(): geotoolkit.util.Rect;
            }
            /**
             * Defines a shape to draw handles for line
             */
            class LineBox extends geotoolkit.controls.editing.GhostBearingHandle {
                /**
                 * Defines a shape to draw handles for line
                 * @param x1  (Optional) x coordinate of the start or a JSON object with properties
                 * @param y1  (Optional) y coordinate of the start
                 * @param x2  (Optional) x coordinate of the end
                 * @param y2  (Optional) y coordinate of the end
                 */
                constructor(x1?: number|any, y1?: number, x2?: number, y2?: number);
                /**
                 * Gets properties pertaining to this handle
                 */
                getProperties(): any;
                /**
                 * Sets properties pertaining to this object
                 * @param props  (Required) 
                 * @param props.x1  (Optional) x coordinate of the start
                 * @param props.y1  (Optional) y coordinate of the start
                 * @param props.x2  (Optional) x coordinate of the end
                 * @param props.y2  (Optional) y coordinate of the end
                 * @param props.linewidth  (Optional) line width
                 */
                setProperties(props: any | { x1?: number; y1?: number; x2?: number; y2?: number; linewidth?: number; } ): this;
                /**
                 * Renders the handle
                 * @param context  (Required) 
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Sets two points defining the line, or one of the edges
                 * @param point1  (Required) The first point defining the line (from), or an object with points
                 * @param point1.from  (Optional) The first point defining the line (from)
                 * @param point1.to  (Optional) The second point defining the line (to)
                 * @param point2  (Optional) The second point defining the line (to)
                 */
                setLine(point1: any | { from?: geotoolkit.util.Point; to?: geotoolkit.util.Point; } |geotoolkit.util.Point, point2?: geotoolkit.util.Point): this;
                /**
                 * Returns the point defining "From" coordinate of the line
                 */
                getFrom(): any|geotoolkit.util.Point;
                /**
                 * Returns the point defining "To" coordinate of the line
                 */
                getTo(): any|geotoolkit.util.Point;
                /**
                 * Changes the line to match its center point with the provided point. Length remains the same
                 * @param anchor  (Required) 
                 */
                setAnchor(anchor: geotoolkit.util.Point): this;
            }
            /**
             * Defines a shape to draw a handle. The shape is part of the editor feature that lets a user interact with a shape.<br>
             * It provides the rendering for the handles that can be grabbed and moved by the user.
             */
            class Handle extends geotoolkit.controls.editing.AnchoredHandle {
                /**
                 * Defines a shape to draw a handle. The shape is part of the editor feature that lets a user interact with a shape.<br>
                 * It provides the rendering for the handles that can be grabbed and moved by the user.
                 * @param x  (Required) X coordinate of handle anchor or a JSON with handle properties
                 * @param x.size  (Optional) The two dimensional size of the anchor
                 * @param x.x  (Optional) X coordinate of handle's anchor
                 * @param x.y  (Optional) Y coordinate of handle's anchor
                 * @param x.painter  (Optional) Painter used to draw the handle
                 * @param x.isindevicespace  (Optional) Flag defining if the handle is in device space
                 * @param y  (Optional) Y coordinate of handle anchor
                 * @param size  (Optional) The two dimensional size of the anchor
                 */
                constructor(x: any | { size?: geotoolkit.util.Dimension; x?: number; y?: number; painter?: Function; isindevicespace?: boolean; } |number, y?: number, size?: number|geotoolkit.util.Dimension);
            }
            /**
             * Defines an abstract adapter to perform operation for shapes<br>
             * This is the parent class for shape adapters responsible of implementing editing capabilities for a shape.
             */
            class ShapeAdapter extends geotoolkit.util.EventDispatcher {
                /**
                 * Defines an abstract adapter to perform operation for shapes<br>
                 * This is the parent class for shape adapters responsible of implementing editing capabilities for a shape.
                 */
                constructor();
                /**
                 * Get state of the adapter
                 */
                isInitialized(): boolean;
                /**
                 * Initialize
                 */
                initialize(): boolean;
                /**
                 * Sets registry
                 * @param registry  (Required) associated with current shape adapter
                 */
                setRegistry(registry: geotoolkit.controls.editing.ShapeAdapterRegistry): this;
                /**
                 * Return transformation
                 */
                getTransformation(): geotoolkit.util.Transformation;
                /**
                 * Update
                 */
                update(): any;
                /**
                 * Return manipulator layer
                 */
                getManipulatorLayer(): any;
                /**
                 * Sets shape to be modified
                 * @param shape  (Required) shape to be modified
                 */
                setShape(shape: geotoolkit.scene.Node): this;
                /**
                 * Shape
                 */
                getShape(): geotoolkit.scene.Node;
                /**
                 * Activate
                 * @param active  (Required) active state or not
                 */
                active(active: boolean): boolean;
                /**
                 * Activate
                 * @param active  (Required) active state or not
                 */
                setActive(active: boolean): this;
                /**
                 * Returns active state of this handle
                 */
                isActive(): boolean;
                /**
                 * Sets active handle
                 * @param handle  (Required) active handle
                 */
                setActiveHandle(handle: geotoolkit.controls.editing.Handle): this;
                /**
                 * Gets active handle
                 */
                getActiveHandle(): any;
                /**
                 * Sets position
                 * @param x  (Optional) x coordinate
                 * @param y  (Optional) y coordinate
                 */
                setPosition(x?: number, y?: number): this;
                /**
                 * Gets position
                 */
                getPosition(): geotoolkit.util.Point;
                /**
                 * Move adapter and send event {geotoolkit.controls.editing.ShapeAdapter.Moved}
                 * @param x  (Required) x position
                 * @param y  (Required) y position
                 */
                move(x: number, y: number): this;
                /**
                 * Returns empty object
                 */
                getProperties(): any;
                /**
                 * OnMove
                 * @param x  (Required) x coordinate
                 * @param y  (Required) y coordinate
                 */
                onMove(x: number, y: number): this;
                /**
                 * Active state is changed
                 * @param active  (Required) active state or not
                 */
                onActiveStateChanged(active: boolean): any;
                /**
                 * OnInitialize
                 */
                onInitialize(): boolean;
                /**
                 * ShapeAdapter Events enumerator
                 */
                static Events: any;
            }
            /**
             * Defines a shape adapter which has functionality to manipulate Symbols.
             * This adapter associates itself to an instance of Symbol shape, creates a handle rendered on top of the shape
             * and allows dragging the shape around the scene.
             */
            class SymbolAdapter extends geotoolkit.controls.editing.ShapeAdapter {
                /**
                 * Defines a shape adapter which has functionality to manipulate Symbols.
                 * This adapter associates itself to an instance of Symbol shape, creates a handle rendered on top of the shape
                 * and allows dragging the shape around the scene.
                 */
                constructor();
                /**
                 * Called during initialization process. Creates handles
                 */
                onInitialize(): boolean;
                /**
                 * Updates the parameters of the handles to match the current state
                 * of the shape and adapter
                 */
                updateHandles(): this;
                /**
                 * Sets shape to be modified
                 * @param shape  (Required) shape to be modified
                 */
                setShape(shape: geotoolkit.scene.Node): this;
                /**
                 * Sets the visibility of the handles registered with this adapter
                 * @param visible  (Required) Visibility to set on handles
                 */
                setHandlesVisible(visible: boolean): this;
                /**
                 * Called when adapter goes from active to non-active and vice versa
                 * @param active  (Required) New state of the adapter
                 */
                onActiveStateChanged(active: boolean): any;
                /**
                 * Moves the handle and the shape, if shape editing is enabled
                 * @param x  (Required) The device x position to move to
                 * @param y  (Required) The device y position to move to
                 * @param eventArgs  (Optional) Event arguments from the calling tool
                 */
                onMove(x: number, y: number, eventArgs?: any): this;
                /**
                 * Called when a handle owned by this adapter has been released and editing stops.
                 * @param x  (Required) X coordinate of pointer when mouseup occurred
                 * @param y  (Required) Y coordinate of pointer when mouseup occurred
                 * @param eventArgs  (Optional) Event arguments from the calling tool
                 */
                release(x: number, y: number, eventArgs?: any): this;
                /**
                 * Called when a handle owned by this adapter has been selected and activated. The editing began.
                 * @param x  (Required) X coordinate of the point where the mouse was clicked to engage the handle
                 * @param y  (Required) Y coordinate of the point where the mouse was clicked to engage the handle
                 * @param eventArgs  (Optional) arguments from the event that started the change
                 */
                engage(x: number, y: number, eventArgs?: any): any;
                /**
                 * Sets the flag defining if this adapter has to directly edit the shape which it is associated with.
                 * Otherwise it will only send an event.
                 * @param allow  (Required) True to edit the shape directly
                 */
                setAllowShapeEdit(allow: boolean): this;
                /**
                 * Returns the flag defining if this adapter directly edits the shape which it is associated with.
                 */
                getAllowShapeEdit(): boolean;
                /**
                 * Sets the flag defining if a ghost should be moved instead of an actual handle when the shape is being manipulated.
                 * @param show  (Required) True to display a ghost handle
                 */
                setShowGhost(show: boolean): this;
                /**
                 * Returns the flag defining if a ghost is moved instead of an actual handle when the shape is being manipulated.
                 */
                getShowGhost(): boolean;
                /**
                 * Sets styles for active, inactive, and ghost states of all handles, and redraws the handle
                 * @param styles  (Required) JSON containing stylings for different types of handle states
                 * @param styles.ghostlinestyle  (Optional) Line Style of the handle when it is in ghost state
                 * @param styles.ghostfillstyle  (Optional) Fill Style of the handle when it is in ghost state
                 * @param styles.activefillstyle  (Optional) Fill Style of the handle when it is selected and active
                 * @param styles.inactivefillstyle  (Optional) Fill Style of the handle when it is selected and active
                 * @param styles.activelinestyle  (Optional) Line Style of the handle when when it is inactive (most of the time)
                 * @param styles.inactivelinestyle  (Optional) Line Style of the handle when when it is inactive (most of the time)
                 */
                setHandleStyles(styles: any | { ghostlinestyle?: geotoolkit.attributes.LineStyle|string|any; ghostfillstyle?: geotoolkit.attributes.FillStyle|string|any; activefillstyle?: geotoolkit.attributes.FillStyle|string|any; inactivefillstyle?: geotoolkit.attributes.FillStyle|string|any; activelinestyle?: geotoolkit.attributes.LineStyle|string|any; inactivelinestyle?: geotoolkit.attributes.LineStyle|string|any; } ): this;
                /**
                 * Updates the state of the adapter, recalculates position and size of handles, and redraws.
                 */
                update(): this;
            }
            /**
             * Defines a registry of shape adapters to edit shapes
             */
            class ShapeAdapterRegistry extends geotoolkit.util.EventDispatcher {
                /**
                 * Defines a registry of shape adapters to edit shapes
                 * @param plot  (Required) plot which renders node
                 * @param manipulatorLayer  (Required) layer to put temporary shapes in
                 */
                constructor(plot: geotoolkit.plot.Plot, manipulatorLayer: geotoolkit.scene.CompositeNode);
                /**
                 * ShapeAdapterRegistry's Events enumerator
                 */
                static Events: any;
                /**
                 * Update plot
                 */
                update(): any;
                /**
                 * Return manipulator layer
                 */
                getManipulatorLayer(): any;
                /**
                 * Register shape adapter
                 * @param classType  (Required) class name of shape
                 * @param shapeAdapter  (Required) instance of shape adapter
                 */
                register(classType: string, shapeAdapter: geotoolkit.controls.editing.ShapeAdapter): this;
                /**
                 * Return adapter for the specified shape
                 * @param shape  (Required) current shape
                 */
                getAdapter(shape: any|string): any;
                /**
                 * Gets a list of all shape classes, previously registered using register method
                 */
                getRegisteredClasses(): string[];
                /**
                 * Sets transformation
                 * @param transformation  (Required) transformation
                 */
                setTransformation(transformation: geotoolkit.util.Transformation): this;
                /**
                 * Gets transformation
                 */
                getTransformation(): geotoolkit.util.Transformation;
                /**
                 * Sets active adapter and send events
                 * @param adapter  (Required) instance of shape adapter
                 */
                setActiveAdapter(adapter: geotoolkit.controls.editing.ShapeAdapter): this;
                /**
                 * Return adapter
                 */
                getActiveAdapter(): geotoolkit.controls.editing.ShapeAdapter;
            }
            /**
             * Defines adapter to move and modify a Line shape
             */
            class LineShapeAdapter extends geotoolkit.controls.editing.ShapeAdapter {
                /**
                 * Defines adapter to move and modify a Line shape
                 */
                constructor();
                /**
                 * OnInitialize
                 */
                onInitialize(): boolean;
                /**
                 * Sets shape
                 * @param shape  (Required) shape to be modified
                 */
                setShape(shape: geotoolkit.scene.Node): this;
                /**
                 * Active state is changed
                 * @param active  (Required) active state or not
                 */
                onActiveStateChanged(active: boolean): any;
                /**
                 * Update handles
                 */
                updateHandles(): this;
            }
            /**
             * Defines adapter to move and modify a positions of the polyline or polygon shape
             */
            class PolyLineShapeAdapter extends geotoolkit.controls.editing.ShapeAdapter {
                /**
                 * Defines adapter to move and modify a positions of the polyline or polygon shape
                 */
                constructor();
                /**
                 * OnInitialize
                 */
                onInitialize(): boolean;
                /**
                 * Sets shape
                 * @param shape  (Required) shape to be modified
                 */
                setShape(shape: geotoolkit.scene.Node): this;
                /**
                 * Active state is changed
                 * @param active  (Required) active state or not
                 */
                onActiveStateChanged(active: boolean): any;
                /**
                 * Update handles
                 */
                updateHandles(): this;
            }
            /**
             * Defines adapter to move text shape
             */
            class TextShapeAdapter extends geotoolkit.controls.editing.scaling.RectangularShapeAdapter {
                /**
                 * Defines adapter to move text shape
                 */
                constructor();
                /**
                 * OnInitialize
                 */
                onInitialize(): boolean;
                /**
                 * Sets shape
                 * @param shape  (Required) shape to be set
                 */
                setShape(shape: geotoolkit.scene.Node): this;
                /**
                 * Active state is changed
                 * @param active  (Required) active state or not
                 */
                onActiveStateChanged(active: boolean): any;
                /**
                 * Return shape bounds
                 */
                getShapeBounds(): geotoolkit.util.Rect;
                /**
                 * Update handles
                 */
                updateHandles(): this;
            }
            /**
             * An enumerator containing events fired by Editing tools
             */
            interface Events {
                /**
                 * Event fired before the first move is executed on a handle
                 */
                DragStart: string;
                /**
                 * Event fired on every move of the handle if the ghost handle is disabled
                 */
                Dragging: string;
                /**
                 * Event fired when the handle or a ghost is released
                 */
                DragEnd: string;
                /**
                 * Event fired when deleting occurs
                 */
                Delete: string;
                /**
                 * Event fired when inserting occurs
                 */
                Insert: string;
                /**
                 * Event fired when mouse has been moved across the plot, but no dragging happens
                 */
                Move: string;
            }
            module scaling {
                /**
                 * Defines adapter to scale and move rectangular shape
                 */
                class RectangularShapeAdapter extends geotoolkit.controls.editing.ShapeAdapter {
                    /**
                     * Defines adapter to scale and move rectangular shape
                     * @param options  (Optional) options
                     * @param options.box  (Optional) options for box
                     * @param options.box.activefillstyle  (Optional) options for active box fill style
                     * @param options.box.inactivefillstyle  (Optional) options for inactive box inactive fill style
                     * @param options.box.linestyle  (Optional) options for box line style
                     * @param options.handlers  (Optional) handlers positions
                     */
                    constructor(options?: any | { box?: any | { activefillstyle?: any; inactivefillstyle?: any; linestyle?: any; } ; handlers?: geotoolkit.util.AnchorType[]; } );
                    /**
                     * @param options  (Optional) options
                     * @param options.box  (Optional) options for box
                     * @param options.box.activefillstyle  (Optional) options for active box fill style
                     * @param options.box.inactivefillstyle  (Optional) options for inactive box inactive fill style
                     * @param options.box.linestyle  (Optional) options for box line style
                     * @param options.handlers  (Optional) handlers positions
                     */
                    setOptions(options?: any | { box?: any | { activefillstyle?: any; inactivefillstyle?: any; linestyle?: any; } ; handlers?: geotoolkit.util.AnchorType[]; } ): this;
                    /**
                     * Sets shape
                     * @param shape  (Required) current shape
                     */
                    setShape(shape: geotoolkit.scene.Node): this;
                    /**
                     * Return shape bounds
                     */
                    getShapeBounds(): geotoolkit.util.Rect;
                    /**
                     * Active state is changed
                     * @param active  (Required) active state or not
                     */
                    onActiveStateChanged(active: boolean): any;
                    /**
                     * Return box handle
                     */
                    getBoxHandle(): geotoolkit.controls.editing.Box;
                    /**
                     * Return box handle
                     */
                    getHandle(): geotoolkit.controls.editing.BoxHandle;
                    /**
                     * OnInitialize
                     */
                    onInitialize(): boolean;
                    /**
                     * OnMove
                     * @param x  (Required) x coordinate
                     * @param y  (Required) y coordinate
                     */
                    onMove(x: number, y: number): this;
                    /**
                     * Sets linestyle and fillstyle for the main handle (rectangle) and all the corner handles (squares)
                     * @param json  (Optional) json object for new style
                     * @param json.main  (Optional) object contains properties for main rectangle
                     * @param json.main.linestyle  (Optional) linestyle
                     * @param json.main.fillstyle  (Optional) fillstyle
                     * @param json.corners  (Optional) object contains properties for all the corners and sides handles
                     * @param json.corners.linestyle  (Optional) linestyle
                     * @param json.corners.fillstyle  (Optional) fillstyle
                     */
                    setStyle(json?: any | { main?: any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; corners?: any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; } ): this;
                    /**
                     * Update handles
                     */
                    updateHandles(): any;
                }
            }
            module ShapeAdapter {
                /**
                 * ShapeAdapter Events enumerator
                 */
                interface Events {
                    /**
                     * Shape adapter is moved
                     */
                    Moved: string;
                    /**
                     * Adapter position is changed
                     */
                    PositionChanged: string;
                    /**
                     * Active state is changed
                     */
                    ActiveStateChanged: string;
                }
            }
            module ShapeAdapterRegistry {
                /**
                 * ShapeAdapterRegistry's Events enumerator
                 */
                interface Events {
                    /**
                     * Event type fired when an adapter is deactivated
                     */
                    Deactivated: string;
                    /**
                     * Event type fired when an adapter is activated
                     */
                    Activated: string;
                }
            }
        }
        module shapes {
            /**
             * Enum for defining the location of the color bar
             */
            var ColorBarLocation: any;
            /**
             * Create a advanced histogram shape, which is a graphical display of tabulated frequencies, shown as bars.<br>
             * The histogram can be customized using the options like 'bin spacing','Frequency Type', 'colors' etc. Refer to options below for more details.
             */
            class Histogram extends geotoolkit.scene.shapes.Shape {
                /**
                 * Create a advanced histogram shape, which is a graphical display of tabulated frequencies, shown as bars.<br>
                 * The histogram can be customized using the options like 'bin spacing','Frequency Type', 'colors' etc. Refer to options below for more details.
                 * @param options  (Required) JSON object
                 * @param options.data  (Required) data array
                 * @param options.bounds  (Optional) bounds of the node
                 * @param options.bins  (Optional) number of bins this histogram has
                 * @param options.frequencytype  (Optional) frequency type
                 * @param options.accumulatedmode  (Optional) accumulated mode
                 * @param options.histogrammode  (Optional) histogram mode
                 * @param options.fillstyle  (Optional) fill color of the histogram bin shape
                 * @param options.linestyle  (Optional) line color of the histogram bin shape
                 * @param options.autogradient  (Optional) auto gradient inside the bin to give a 3D look
                 * @param options.binspacing  (Optional) bin spacing in percentage
                 * @param options.verticalscale  (Optional) vertical scale in percentage
                 * @param options.logstartvalue  (Optional) log start value
                 * @param options.highlightstyle  (Optional) highlight style
                 * @param options.highvalueinclusive  (Optional) 
                 * @param options.minvalue  (Optional) Lowest value to display
                 * @param options.maxvalue  (Optional) Highest value to display
                 */
                constructor(options: any | { data?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; bounds?: geotoolkit.util.Rect; bins?: number; frequencytype?: geotoolkit.controls.shapes.Histogram.FrequencyType|string; accumulatedmode?: geotoolkit.controls.shapes.Histogram.AccumulatedMode|string; histogrammode?: geotoolkit.controls.shapes.Histogram.HistogramMode|string; fillstyle?: geotoolkit.attributes.FillStyle|string|any; linestyle?: geotoolkit.attributes.LineStyle|string|any; autogradient?: boolean; binspacing?: number; verticalscale?: number; logstartvalue?: number; highlightstyle?: geotoolkit.attributes.FillStyle|string|any; highvalueinclusive?: boolean; minvalue?: number; maxvalue?: number; } );
                /**
                 * Histogram's Events enumerator
                 */
                static Events: any;
                /**
                 * GapType
                 */
                static GapType: any;
                /**
                 * FrequencyType
                 */
                static FrequencyType: any;
                /**
                 * AccumulatedMode
                 */
                static AccumulatedMode: any;
                /**
                 * HistogramMode
                 */
                static HistogramMode: any;
                /**
                 * Set the data to be plotted in the histogram, optionally with min and max values.
                 * @param values  (Required) Data to be charted in histogram or options for histogram (for compatibility)
                 * @param minValue  (Optional) Lowest value to display
                 * @param maxValue  (Optional) Highest value to display
                 */
                setData(values: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView|any, minValue?: number, maxValue?: number): this;
                /**
                 * get raw data
                 */
                getData(): {object:{data:number[];minvalue:number;maxvalue:number}}|any;
                /**
                 * set shape properties
                 * @param properties  (Required) JSON object, see {@link geotoolkit.controls.shapes.Histogram#setOptions}
                 */
                setProperties(properties: any): this;
                /**
                 * set options
                 * @param options  (Required) JSON object
                 * @param options.bounds  (Optional) bounds of the node
                 * @param options.bins  (Optional) number of bins this histogram has
                 * @param options.frequencytype  (Optional) frequency type
                 * @param options.accumulatedmode  (Optional) accumulated mode
                 * @param options.histogrammode  (Optional) histogram mode
                 * @param options.fillstyle  (Optional) fill color of the histogram bin shape
                 * @param options.linestyle  (Optional) line color of the histogram bin shape
                 * @param options.autogradient  (Optional) auto gradient inside the bin to give a 3D look
                 * @param options.binspacing  (Optional) bin spacing in percentage
                 * @param options.verticalscale  (Optional) vertical scale in percentage
                 * @param options.logstartvalue  (Optional) log start value
                 * @param options.highlightstyle  (Optional) highlight style
                 * @param options.highvalueinclusive  (Optional) high value inclusive
                 * @param options.minvalue  (Optional) Lowest value to display
                 * @param options.maxvalue  (Optional) Highest value to display
                 * @param options.unit  (Optional) represent the {string} name, {string} symbol or {geotoolkit.util.Unit} unit to be created
                 * @param options.flipedx  (Optional) set the flag if swap the min and max of X values
                 */
                setOptions(options: any | { bounds?: geotoolkit.util.Rect; bins?: number; frequencytype?: geotoolkit.controls.shapes.Histogram.FrequencyType|string; accumulatedmode?: geotoolkit.controls.shapes.Histogram.AccumulatedMode|string; histogrammode?: geotoolkit.controls.shapes.Histogram.HistogramMode|string; fillstyle?: geotoolkit.attributes.FillStyle|string|any; linestyle?: geotoolkit.attributes.LineStyle|string|any; autogradient?: boolean; binspacing?: number; verticalscale?: number; logstartvalue?: number; highlightstyle?: geotoolkit.attributes.FillStyle|string|any; highvalueinclusive?: boolean; minvalue?: number; maxvalue?: number; unit?: string|geotoolkit.util.Unit; flipedx?: boolean; } ): this;
                /**
                 * set neat limits for x axis
                 * @param neatlimits  (Required) set if apply neat limits for x axis
                 */
                setNeatLimitsX(neatlimits: boolean): this;
                /**
                 * set neat limits for y axis
                 * @param neatlimits  (Required) set if apply neat limits for y axis
                 */
                setNeatLimitsY(neatlimits: boolean): this;
                /**
                 * get shape properties
                 */
                getProperties(): any;
                /**
                 * get histogram options
                 */
                getOptions(): {options:{bins:number;frequencytype:geotoolkit.controls.shapes.Histogram.FrequencyType|string;accumulatedmode:geotoolkit.controls.shapes.Histogram.AccumulatedMode|string;histogrammode:geotoolkit.controls.shapes.Histogram.HistogramMode|string;fillstyle:geotoolkit.attributes.FillStyle;linestyle:geotoolkit.attributes.LineStyle;autogradient:boolean;binspacing:number;verticalscale:number;logstartvalue:number;highlightstyle:geotoolkit.attributes.FillStyle;minvalue:number;maxvalue:number;unit:string|geotoolkit.util.Unit;flipedx:boolean}}|any;
                /**
                 * set desired unit for data source, the finally display unit could be not the desired one due to failling of unit coversion
                 * @param unit  (Required) represent the {string} name, {string} symbol or {geotoolkit.util.Unit} unit to be created
                 */
                setUnit(unit: string|geotoolkit.util.Unit): this;
                /**
                 */
                dispose(): any;
                /**
                 * set orientation
                 * @param orientation  (Required) 
                 */
                setOrientation(orientation: geotoolkit.util.Orientation): this;
                /**
                 * get orientation
                 */
                getOrientation(): geotoolkit.util.Orientation;
                /**
                 * get displayed unit
                 */
                getDisplayUnit(): geotoolkit.util.Unit;
                /**
                 * Resets the highest and lowest values to be computed values
                 */
                resetValues(): any;
                /**
                 * Set the highest and lowest values to be displayed in this histogram
                 * @param minValue  (Required) lowest value to be displayed
                 * @param maxValue  (Required) highest value to be displayed
                 */
                setValueRange(minValue: number, maxValue: number): this;
                /**
                 * Resets the highest and lowest values to be computed values
                 */
                areValuesCustomized(): boolean;
                /**
                 * Get lowest value to be displayed
                 */
                getMinValue(): number;
                /**
                 * Get highest value to be displayed
                 */
                getMaxValue(): number;
                /**
                 * Returns calculated statistics of values
                 * see description {@link geotoolkit.controls.shapes.Histogram.prototype.getStatisticsDescription}
                 */
                getStatistics(): number[];
                /**
                 * Descriptions of statistics
                 */
                getStatisticsDescription(): string[];
                /**
                 * Maximum frequency
                 */
                getMaxFrequency(): number;
                /**
                 * Gets the frequency for the current index
                 * @param index  (Required) current index
                 * @param ignoreMode  (Required) ignore mode on or not
                 */
                getFrequency(index: number, ignoreMode: boolean): number;
                /**
                 * Calculate distribution with normalization
                 * @param keepModelLimits  (Optional) set if keep model limits unchanged
                 */
                calculate(keepModelLimits?: boolean): this;
                /**
                 * Gets the values of the bins in the following array format
                 * Array [{ 'minvalue' : number, 'maxvalue' : number, 'binnumber' : number, 'frequency' : number }, ...]
                 */
                getBins(): any[];
                /**
                 * Determines if type of gap a value is located on.
                 * @param x  (Required) The x-value that is checked
                 */
                getGapTypeForValue(x: number): geotoolkit.controls.shapes.Histogram.GapType|number;
                /**
                 * Gets the bin at the input x value
                 * @param x  (Required) input x value
                 * @param excludeGaps  (Optional) True if gaps between bins should be excluded
                 */
                getBinAt(x: number, excludeGaps?: boolean): {bin:{minvalue:number;maxvalue:number;binnumber:number;frequency:number}}|any;
                /**
                 * Returns bin numbers for specified indices
                 * @param indices  (Required) of indices
                 */
                getBinsByIndices(indices: number[]): number[];
                /**
                 * get hit bins
                 * @param hitArea  (Required) selected area
                 * @param bins  (Required) the bins in certain range along x axis
                 */
                hitTest(hitArea: geotoolkit.util.Rect, bins: number[]): number[];
                /**
                 * Gets the bin at the input x value
                 * @param x  (Required) input x value
                 */
                getBinsAt(x: geotoolkit.util.Point|geotoolkit.util.Range|geotoolkit.util.Rect): any[];
                /**
                 * Highlight Bins
                 * @param bins  (Required) indices
                 * @param reset  (Required) previous selection
                 */
                highlightBins(bins: number[], reset: boolean): any;
                /**
                 * get highlighted bins
                 */
                getHighlightedBins(): number[];
                /**
                 * Updates the model limits
                 */
                updateModelLimits(): any;
                /**
                 * Sets bin count.
                 * @param binCount  (Required) a count of the bins
                 */
                setBinCount(binCount: number): this;
                /**
                 * Sets bin count using a step value
                 * @param binStep  (Required) a count of the binsthis._binCount
                 */
                setBinSteps(binStep: number): this;
                /**
                 * Resets the bin count to use _autoBinCount
                 */
                resetBinCount(): any;
                /**
                 * Returns _autoBinCount
                 */
                isAutoBinCount(): boolean;
                /**
                 * Calculates the automatic amount of bins
                 * @param force  (Optional) force calculation of bins count
                 */
                updateBinCount(force?: boolean): this;
                /**
                 * Return bin count
                 */
                getBinCount(): number;
                /**
                 * sets if the high value is inclusive
                 * @param inclusive  (Required) high value is inclusive or not
                 */
                setHighValueInclusive(inclusive: boolean): this;
                /**
                 * gets if the high value is inclusive
                 */
                getHighValueInclusive(): boolean;
                /**
                 * Gets model limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Returns current bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Check collision
                 * @param context  (Required) Rendering Context
                 */
                checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
                /**
                 * Sets bounds of the node in the parent coordinates
                 * @param bounds  (Required) bound of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Retrieves the world transformation of the spatial.
                 */
                getContentsTransform(): geotoolkit.util.Transformation;
                /**
                 * Render histogram shape
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): this;
                /**
                 * Computers the statics based on the new data
                 */
                computeStatistics(): any;
                /**
                 * Sets _autoGradient
                 * @param isAutoGradient  (Required) Autogradient on or off
                 */
                setAutoGradient(isAutoGradient: boolean): this;
                /**
                 * Gets percentage of fill
                 */
                getBinSpacing(): number;
                /**
                 * Sets percentage of fill
                 * Everything lower than 50 is set to 50
                 * Everything higher than 100 is set to 100
                 * All values in between are saved as is
                 * @param percentage  (Required) percentage of fill
                 */
                setBinSpacing(percentage: number): this;
                /**
                 * Sets bars vertical scale
                 * @param percentage  (Required) percentage of fill
                 */
                setVerticalScaling(percentage: number): this;
                /**
                 * Gets vertical scale
                 */
                getVerticalScaling(): number;
                /**
                 * Gets if we are auto gradient
                 */
                getAutoGradient(): boolean;
                /**
                 * Sets frequency type
                 * @param frequencyType  (Required) enum of FrequencyType
                 */
                setFrequencyType(frequencyType: geotoolkit.controls.shapes.Histogram.FrequencyType|string): this;
                /**
                 * Gets frequency type
                 */
                getFrequencyType(): geotoolkit.controls.shapes.Histogram.FrequencyType;
                /**
                 * Sets accumulated mode
                 * @param accumulatedMode  (Required) enum of AccumulatedMode (Disabled or Enabled)
                 */
                setAccumulatedMode(accumulatedMode: geotoolkit.controls.shapes.Histogram.AccumulatedMode|string): this;
                /**
                 * Gets accumulated mode
                 */
                getAccumulatedMode(): geotoolkit.controls.shapes.Histogram.AccumulatedMode;
                /**
                 * Sets histogram mode
                 * @param histogramMode  (Required) enum of HistogramMode (Linear or Logarithmic)
                 */
                setHistogramMode(histogramMode: geotoolkit.controls.shapes.Histogram.HistogramMode|string): this;
                /**
                 * Gets the histogram mode
                 */
                getHistogramMode(): geotoolkit.controls.shapes.Histogram.HistogramMode;
                /**
                 * Gets log start value
                 */
                getStartValue(): number;
                /**
                 * Sets highlight style
                 * @param fillStyle  (Required) a new fill style
                 * @param fillStyle.color  (Optional) color
                 * @param fillStyle.pattern  (Optional) pattern
                 * @param fillStyle.foreground  (Optional) foreground color
                 */
                setHighlightStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } ): this;
                /**
                 * Gets highlight style
                 */
                getHighlightStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Sets log start value
                 * @param logStartValue  (Required) log start value
                 */
                setLogStartValue(logStartValue: number): this;
            }
            /**
             * The Line Chart is a chart that displays data with lines. <br>
             * Line Chart can display data with several curve types: <br>
             *  Linear - A simple polyline <br>
             *  Spline - Spline (Bezier) <br>
             *  Logscale - logarithmic <br>
             * It can be further customized by using the options in the constructor.
             */
            class LineChart extends geotoolkit.scene.Group implements geotoolkit.controls.shapes.IChartDataVisual {
                /**
                 * The Line Chart is a chart that displays data with lines. <br>
                 * Line Chart can display data with several curve types: <br>
                 *  Linear - A simple polyline <br>
                 *  Spline - Spline (Bezier) <br>
                 *  Logscale - logarithmic <br>
                 * It can be further customized by using the options in the constructor.
                 * @param x  (Required) array of X coordinates or parameters object
                 * @param x.x  (Required) array of X coordinates
                 * @param x.y  (Optional) The x object contains arrays of y series data
                 * @param x.linestyles  (Optional) Line styles to apply to curves
                 * @param x.fillstyles  (Optional) Fill styles to apply to curves
                 * @param x.cache  (Optional) boolean flag that specify cache usage
                 * @param x.baseline  (Optional) A base line for the fill
                 * @param x.stackedarea  (Optional) use to determine if stacked area or not
                 * @param x.percentarea  (Optional) use to determine if percent area of not
                 * @param x.datainterpolationstrategy  (Optional) Data Interpolation strategy for stacked chart for missing values
                 * @param x.symbols  (Optional) Symbols definition for data series. This object may contain definition for more than one series
                 * @param x.symbols.width  (Optional) Symbols width, for all series
                 * @param x.symbols.height  (Optional) Symbols height, for all series
                 * @param x.symbols.step  (Optional) Number of step at which symbol should be displayed, for all series
                 * @param x.symbols.visible  (Optional) define visibility of the symbols
                 * @param x.symbols.sizeIsInDeviceSpace  (Optional) Flag that determines if symbols must keep device size
                 * @param x.symbols.painters  (Optional) painters for series. Nulls are acceptable if a series should not have a symbols - functions are in geotoolkit.scene.shapes.painter namespace
                 * @param x.symbols.linestyles  (Optional) Defines series symbols line styles
                 * @param x.symbols.fillstyles  (Optional) Defines series symbols fill styles
                 * @param x.gridvisible  (Optional) set visible the gridlines
                 * @param x.bounds  (Optional) bounds or position on the chart
                 * @param x.modelLimits  (Optional) model limits of chart. if it is not set then model limits is calculated.
                 * @param x.autodatalimits  (Optional) automatic model limits calculation
                 * @param x.arearange  (Optional) Defines Area Range
                 * @param x.arearange.range  (Optional) Defines upper bound range and lowerbound range
                 * @param x.arearange.linestyles  (Optional) Linestyles for area range series
                 * @param x.arearange.fillstyle  (Optional) fillstyle to apply between ranges
                 * @param x.labels  (Optional) labels for linechart points
                 * @param x.labels.offsetx  (Optional) text margin for label in x-direction
                 * @param x.labels.offsety  (Optional) text margin for label in y-direction
                 * @param x.labels.annotations  (Optional) annotations for linechart points, if not specified y value of linechart will be displayed
                 * @param x.labels.textstyle  (Optional) teextstyle for label
                 * @param x.labels.showellipses  (Optional) show ellipses for textstyle
                 * @param y  (Optional) array of Y coordinates
                 * @param linestyles  (Optional) Line styles to apply to curves
                 * @param bounds  (Optional) bounds or position on the chart
                 * @param spline  (Optional) smooth the curve or not
                 * @param logscale  (Optional) use log scale or not
                 * @param fillstyles  (Optional) Fill Styles
                 * @param baseLine  (Optional) Y value of a horizontal line which will define the base line for fill
                 * @param stackedarea  (Optional) use to determine if stacked area or not
                 * @param percentarea  (Optional) use to determine if percent area of not
                 * @param arearange  (Optional) Defines Area Range
                 * @param arearange.range  (Optional) Defines upper bound range and lowerbound range
                 * @param arearange.linestyles  (Optional) Linestyles for area range series
                 * @param arearange.fillstyle  (Optional) fillstyle to apply between ranges
                 */
                constructor(x: number[]|number[][]|geotoolkit.data.INumericalDataSeries[]|any | { x?: number[]|number[][]|geotoolkit.data.INumericalDataSeries[]; y?: number[][]|geotoolkit.data.INumericalDataSeries[]; linestyles?: geotoolkit.attributes.LineStyle[]; fillstyles?: geotoolkit.attributes.FillStyle[]; cache?: boolean; baseline?: number; stackedarea?: boolean; percentarea?: boolean; datainterpolationstrategy?: string; symbols?: any | { width?: number; height?: number; step?: number; visible?: boolean; sizeIsInDeviceSpace?: boolean; painters?: Function[]; linestyles?: geotoolkit.attributes.LineStyle[]; fillstyles?: geotoolkit.attributes.FillStyle[]; } ; gridvisible?: boolean; bounds?: geotoolkit.util.Rect; modelLimits?: geotoolkit.util.Rect; autodatalimits?: boolean; arearange?: any[]|any | { range?: number[][]; linestyles?: (geotoolkit.attributes.LineStyle|string|any)[]; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; labels?: any | { offsetx?: number; offsety?: number; annotations?: number[][]|string[][]|geotoolkit.data.DataSeries[]|geotoolkit.data.DataSeriesView[]; textstyle?: geotoolkit.attributes.TextStyle[][]; showellipses?: boolean; } ; } , y?: number[][], linestyles?: geotoolkit.attributes.LineStyle[], bounds?: geotoolkit.util.Rect, spline?: boolean, logscale?: boolean, fillstyles?: geotoolkit.attributes.FillStyle[], baseLine?: number, stackedarea?: boolean, percentarea?: boolean, arearange?: any[]|any | { range?: number[][]; linestyles?: (geotoolkit.attributes.LineStyle|string|any)[]; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } );
                /**
                 * Enum of rendering optimization types
                 */
                static OptimizationType: any;
                /**
                 * Enum of Data-Interpolation type for stacked area
                 */
                static DataInterpolationType: any;
                /**
                 * Sets optimization type
                 * @param optimizationType  (Required) optimization type which used with current line
                 */
                setOptimizationType(optimizationType: geotoolkit.controls.shapes.LineChart.OptimizationType): this;
                /**
                 * Turns on/off optimization for line
                 * @param needOptimization  (Optional) Is optimization for line on
                 */
                setOptimization(needOptimization?: boolean): this;
                /**
                 * Turns on/off optimization for symbols
                 * @param needOptimize  (Optional) Is optimization for symbols on
                 */
                setOptimizationSymbol(needOptimize?: boolean): this;
                /**
                 * Return the current chart setting
                 */
                getData(): {options:{x:number[]|number[][];y:number[][];linestyles:geotoolkit.attributes.LineStyle[];fillstyles:geotoolkit.attributes.FillStyle[];baseline:number;symbols:{width:number;height:number;visible:boolean;sizeIsInDeviceSpace:boolean;painters:geotoolkit.scene.shapes.painters.AbstractPainter[];linestyles:geotoolkit.attributes.LineStyle[];fillstyles:geotoolkit.attributes.FillStyle[]};gridvisible:boolean;stackedarea:boolean;percentarea:boolean;arearange:{range:number[][];linestyles:geotoolkit.attributes.LineStyle[];fillstyle:geotoolkit.attributes.FillStyle};labels:{offsetx:number;offsety:number;annotations:number[][]|string[][]|geotoolkit.data.DataSeries[]|geotoolkit.data.DataSeriesView[];textstyle:geotoolkit.attributes.TextStyle[][];showellipses:boolean}}}|any;
                /**
                 * Set the data to be plotted in the line chart.
                 * @param data  (Required) data
                 * @param data.x  (Optional) deprecated (since 2.6 Array.<geotoolkit.data.DataSeries> type is deprecated) The x object contains x series data
                 * @param data.y  (Optional) deprecated (since 2.6 Array.<geotoolkit.data.DataSeries> type is deprecated) The y object contains arrays of y series data
                 * @param data.modelLimits  (Optional) model limits of chart. if it is not set then model limits is calculated.
                 * @param data.autodatalimits  (Optional) automatic model limits calculation
                 * @param data.linestyles  (Optional) Line styles to apply to curves
                 * @param data.fillstyles  (Optional) Fill styles to apply to curves
                 * @param data.baseline  (Optional) A base line for the fill
                 * @param data.stackedarea  (Optional) Determine if stacked area graph or not
                 * @param data.percentarea  (Optional) Determine if stacked area graph or not
                 * @param data.datainterpolationstrategy  (Optional) Data Interpolation strategy for stacked chart for missing values
                 * @param data.symbols  (Optional) Symbols definition for data series. This object may contain definition for more than one series
                 * @param data.symbols.width  (Optional) Symbols width, for all series
                 * @param data.symbols.height  (Optional) Symbols height, for all series
                 * @param data.symbols.sizeIsInDeviceSpace  (Optional) Flag that determines if symbols must keep device size,
                 * @param data.symbols.painters  (Optional) painters for series. Nulls are acceptable if a series should not have a symbols
                 * @param data.symbols.linestyles  (Optional) Defines series symbols line styles
                 * @param data.symbols.fillstyles  (Optional) Defines series symbols fill styles
                 * @param data.labels  (Optional) labels for linechart points
                 * @param data.labels.offsetx  (Optional) text margin for label in x-direction
                 * @param data.labels.offsety  (Optional) text margin for label in y-direction
                 * @param data.labels.annotations  (Optional) annotations for linechart points, if not specified y value of linechart will be displayed
                 * @param data.labels.textstyle  (Optional) teextstyle for label
                 * @param data.labels.showellipses  (Optional) show ellipses for textstyle
                 * @param data.arearange  (Optional) Defines Area Range
                 * @param data.arearange.range  (Optional) Defines upper bound range and lowerbound range
                 * @param data.arearange.linestyles  (Optional) Linestyles for area range series
                 * @param data.arearange.fillstyle  (Optional) fillstyle to apply between ranges
                 */
                setData(data: any | { x?: number[]|geotoolkit.data.INumericalDataSeries[]|geotoolkit.data.DataSeries[]; y?: number[]|geotoolkit.data.INumericalDataSeries[]|geotoolkit.data.DataSeries[]; modelLimits?: geotoolkit.util.Rect; autodatalimits?: boolean; linestyles?: geotoolkit.attributes.LineStyle[]; fillstyles?: geotoolkit.attributes.FillStyle[]; baseline?: number; stackedarea?: boolean; percentarea?: boolean; datainterpolationstrategy?: string; symbols?: any | { width?: number; height?: number; sizeIsInDeviceSpace?: boolean; painters?: geotoolkit.scene.shapes.painters.AbstractPainter[]; linestyles?: geotoolkit.attributes.LineStyle[]; fillstyles?: geotoolkit.attributes.FillStyle[]; } ; labels?: any | { offsetx?: number; offsety?: number; annotations?: number[][]|string[][]|geotoolkit.data.DataSeries[]|geotoolkit.data.DataSeriesView[]; textstyle?: geotoolkit.attributes.TextStyle[][]; showellipses?: boolean; } ; arearange?: any[]|any | { range?: number[][]; linestyles?: (geotoolkit.attributes.LineStyle|string|any)[]; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; } ): this;
                /**
                 * Sets visual options for the chart
                 * @param options  (Required) options
                 * @param options.linestyles  (Optional) Line styles to apply to curves
                 * @param options.fillstyles  (Optional) Fill styles to apply to curves
                 * @param options.baseline  (Optional) A base line for the fill
                 * @param options.spline  (Optional) Defines whether to build a spline or polygon path
                 * @param options.symbols  (Optional) Symbols definition for data series. This object may contain definition for more than one series
                 * @param options.symbols.width  (Optional) Symbols width, for all series
                 * @param options.symbols.height  (Optional) Symbols height, for all series
                 * @param options.symbols.sizeIsInDeviceSpace  (Optional) Flag that determines if symbols must keep device size,
                 * @param options.symbols.painters  (Optional) painters for series. Nulls are acceptable if a series should not have a symbols
                 * @param options.symbols.linestyles  (Optional) Defines series symbols line styles
                 * @param options.symbols.fillstyles  (Optional) Defines series symbols fill styles
                 * @param options.modelLimits  (Optional) model limits of chart. if it is not set then model limits is calculated.
                 * @param options.autodatalimits  (Optional) automatic model limits calculation
                 * @param options.labels  (Optional) labels for linechart points
                 * @param options.labels.offsetx  (Optional) text margin for label in x-direction
                 * @param options.labels.offsety  (Optional) text margin for label in y-direction
                 * @param options.labels.annotations  (Optional) annotations for linechart points, if not specified y value of linechart will be displayed
                 * @param options.labels.textstyle  (Optional) teextstyle for label
                 * @param options.labels.showellipses  (Optional) show ellipses for textstyle
                 */
                setOptions(options: any | { linestyles?: geotoolkit.attributes.LineStyle[]; fillstyles?: geotoolkit.attributes.FillStyle[]; baseline?: number; spline?: boolean; symbols?: any | { width?: number; height?: number; sizeIsInDeviceSpace?: boolean; painters?: geotoolkit.scene.shapes.painters.AbstractPainter[]; linestyles?: geotoolkit.attributes.LineStyle[]; fillstyles?: geotoolkit.attributes.FillStyle[]; } ; modelLimits?: geotoolkit.util.Rect; autodatalimits?: boolean; labels?: any | { offsetx?: number; offsety?: number; annotations?: number[][]|string[][]|geotoolkit.data.DataSeries[]|geotoolkit.data.DataSeriesView[]; textstyle?: geotoolkit.attributes.TextStyle[][]; showellipses?: boolean; } ; } ): this;
                /**
                 * Gets visual options for the chart
                 */
                getOptions(): {options:{linestyles:geotoolkit.attributes.LineStyle[];fillstyles:geotoolkit.attributes.FillStyle[];baseline:number;spline:boolean;symbols:{width:number;height:number;sizeIsInDeviceSpace:boolean;painters:geotoolkit.scene.shapes.painters.AbstractPainter[];linestyles:geotoolkit.attributes.LineStyle[];fillstyles:geotoolkit.attributes.FillStyle[]};modelLimits:geotoolkit.util.Rect;autodatalimits:boolean;labels:{offsetx:number;offsety:number;annotations:number[][]|string[][]|geotoolkit.data.DataSeries[]|geotoolkit.data.DataSeriesView[];textstyle:geotoolkit.attributes.TextStyle[][];showellipses:boolean}}}|any;
                /**
                 */
                dispose(): any;
                /**
                 * Gets model limits, the limits of this groups inside space
                 */
                getModelLimits(): geotoolkit.util.Rect|any;
                /**
                 * Sets inner model limits and it sets autodatalimits to false
                 * @param limits  (Required) inner limits
                 */
                setModelLimits(limits: geotoolkit.util.Rect): this;
                /**
                 * render to specified context
                 * @param context  (Required) Rendering Context
                 */
                renderContent(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Set grid line styles
                 * @param tickStyles  (Optional) json for tick line styles
                 */
                setGridStyle(tickStyles?: any): this;
                /**
                 * Return embedded gridlines
                 */
                getGrid(): geotoolkit.axis.Grid;
                /**
                 * Hit test in the device coordinate. This method checks if any point is inside the area and shape
                 * intersects area.
                 * @param area  (Required) model area or position
                 * @param area.x  (Optional) optional array of x coordinates
                 * @param area.y  (Optional) optional array of y coordinates
                 * @param radius  (Optional) radius of selection
                 * @param ignoreOrientation  (Optional) Orientation to ignore - this parameter is ignored for arrays of points
                 */
                hitTest(area: geotoolkit.util.Rect|geotoolkit.util.Point|any | { x?: number[]; y?: number[]; } , radius?: number, ignoreOrientation?: geotoolkit.util.Orientation): {result:{visual:geotoolkit.controls.shapes.LineChart;series:number;indices:number[];points:any[]}}|any;
                /**
                 * Returns flag to indicate automatic calculation of data limits
                 */
                getAutoDataLimits(): boolean;
                /**
                 * Sets a flag to indicate automatic calculation of data limits
                 * @param enable  (Required) enable or disable calculation of the data limits
                 */
                setAutoDataLimits(enable: boolean): this;
                /**
                 * Return original data limits
                 */
                getDataLimits(): geotoolkit.util.Rect;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set, see {@link geotoolkit.controls.shapes.LineChart#setOptions}
                 */
                setProperties(properties: any): this;
            }
            /**
             * RegressionLine shape wrap a regression model and draw the curve (and also confidence and prediction interval)
             * for the given data set x and y based on the model
             */
            class RegressionLine extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * RegressionLine shape wrap a regression model and draw the curve (and also confidence and prediction interval)
                 * for the given data set x and y based on the model
                 * @param options  (Required) 
                 * @param options.datax  (Optional) data set x
                 * @param options.datay  (Optional) data set y
                 * @param options.extended  (Optional) the flag if extend x limits of curve to the limits of shape's model limits
                 * @param options.horizontallogmode  (Optional) Log mode in horizontal direction
                 * @param options.verticallogmode  (Optional) Log mode in vertical direction
                 * @param options.plotinterval  (Optional) the interval of sampling x when drawing curve
                 * @param options.regressionmodel  (Optional) options for regression model
                 * @param options.regressionline  (Optional) options for regression line
                 * @param options.confidenceline  (Optional) options for confidence line
                 * @param options.predictionline  (Optional) options for prediction line
                 */
                constructor(options: any | { datax?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; datay?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; extended?: boolean; horizontallogmode?: boolean; verticallogmode?: boolean; plotinterval?: number; regressionmodel?: any; regressionline?: any; confidenceline?: any; predictionline?: any; } );
                /**
                 * set options for shape
                 * @param options  (Required) options
                 * @param options.extended  (Optional) the flag if extend x limits of curve to the limits of shape's model limits
                 * @param options.plotinterval  (Optional) the interval of sampling x when drawing curve
                 * @param options.regressionmodel  (Optional) options for regression model
                 * @param options.regressionline  (Optional) options for regression line
                 * @param options.confidenceline  (Optional) options for confidence line
                 * @param options.predictionline  (Optional) options for prediction line
                 * @param options.horizontallogmode  (Optional) Log mode in horizontal direction
                 * @param options.verticallogmode  (Optional) Log mode in vertical direction
                 */
                setOptions(options: any | { extended?: boolean; plotinterval?: number; regressionmodel?: any; regressionline?: any; confidenceline?: any; predictionline?: any; horizontallogmode?: boolean; verticallogmode?: boolean; } ): this;
                /**
                 * set model limits of shape
                 * @param limits  (Required) model limits
                 */
                setModelLimits(limits: geotoolkit.util.Rect): this;
                /**
                 * get model limits of shape
                 */
                getModelLimits(): geotoolkit.util.Rect|any;
                /**
                 * set model bounds of shape
                 * @param bounds  (Required) model bounds
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * get model bounds of shape
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * set properties for shape
                 * @param properties  (Required) properties see {@link geotoolkit.controls.shapes.RegressionLine#setOptions}
                 */
                setProperties(properties: any): this;
                /**
                 * get properties of shape
                 */
                getProperties(): any;
                /**
                 * get options for regression model
                 */
                getRegressionModelOptions(): {options:{type:geotoolkit.controls.util.regression.RegressionBase}}|any;
                /**
                 * get options of shape
                 */
                getOptions(): {options:{extended:boolean;plotinterval:number;regressionmodel:any;regressionline:any;confidenceline:any;predictionline:any}}|any;
                /**
                 * set if extend x limits of curve from the limit of data set x to the x model limits(since they could be different)
                 * @param extended  (Required) the flag to determine if extend x limits
                 */
                setExtended(extended: boolean): this;
                /**
                 * set the interval when sampling the x for drawing curve
                 * @param interval  (Required) the sampling interval in screen pixel
                 */
                setPlotInterval(interval: number): this;
                /**
                 * set data source for x and y
                 * @param data  (Required) data
                 * @param data.datax  (Optional) data source for x
                 * @param data.datay  (Optional) data source for y
                 * @param data.weights  (Optional) weights of data point
                 * @param incremental  (Optional) incremental
                 */
                setData(data: any | { datax?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; datay?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; weights?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; } , incremental?: boolean): this;
                /**
                 * get statistics of regression model
                 */
                getStatistics(): any;
                /**
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * get current regression model
                 */
                getRegressionModel(): geotoolkit.controls.util.regression.RegressionBase|any;
            }
            /**
             * Cross plot is a two dimensional chart, that uses horizontal and vertical axes to plot the data points. <br/>
             * Crossplot shows how much one variable is affected by another. The relationship between two variables is called their correlation. </br>
             * Crossplots usually consist of a large body of data. <br>
             * The closer the data points plotted as making a straight line, the higher the correaltion between variables.<br/>
             * geotoolkit.controls.shapes.CrossPlot is used internally by the {@link geotoolkit.widgets.CrossPlot}.
             */
            class CrossPlot extends geotoolkit.scene.shapes.RectangularShape {
                /**
                 * Cross plot is a two dimensional chart, that uses horizontal and vertical axes to plot the data points. <br/>
                 * Crossplot shows how much one variable is affected by another. The relationship between two variables is called their correlation. </br>
                 * Crossplots usually consist of a large body of data. <br>
                 * The closer the data points plotted as making a straight line, the higher the correaltion between variables.<br/>
                 * geotoolkit.controls.shapes.CrossPlot is used internally by the {@link geotoolkit.widgets.CrossPlot}.
                 * @param data  (Required) data
                 * @param data.x  (Optional) The x object containing values, min and max
                 * @param data.x.data  (Optional) The x values
                 * @param data.x.min  (Optional) The x minimum to use, can be used to clip the data
                 * @param data.x.max  (Optional) The x maximum to use, can be used to clip the data
                 * @param data.y  (Optional) The y object containing values, min and max
                 * @param data.y.data  (Optional) The y values
                 * @param data.y.min  (Optional) The y minimum to use, can be used to clip the data
                 * @param data.y.max  (Optional) The y maximum to use, can be used to clip the data
                 * @param data.z  (Optional) The z object containing values, min and max
                 * @param data.z.data  (Optional) The z values
                 * @param data.datax  (Optional) The x values
                 * @param data.minx  (Optional) The x minimum to use, can be used to clip the data
                 * @param data.maxx  (Optional) The x maximum to use, can be used to clip the data
                 * @param data.datay  (Optional) The y values
                 * @param data.miny  (Optional) The y minimum to use, can be used to clip the data
                 * @param data.maxy  (Optional) The y maximum to use, can be used to clip the data
                 * @param data.dataz  (Optional) The z values
                 * @param data.colorprovider  (Optional) The colorProvider used to color points based on their Z value
                 * @param data.defaultcolor  (Optional) The color to be used if there is no ColorProvider provided or if a point has no valid Z value
                 * @param data.defaultlinecolor  (Optional) The color of line to be used in symbol
                 * @param data.painter  (Optional) The painter to draw symbols
                 * @param data.symbolsize  (Optional) The symbol size in pixel
                 * @param data.highlightcolor  (Optional) The color to use for highlighted shapes
                 */
                constructor(data: any | { x?: any | { data?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; min?: number; max?: number; } ; y?: any | { data?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; min?: number; max?: number; } ; z?: any | { data?: number[]; } ; datax?: number[]; minx?: number; maxx?: number; datay?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; miny?: number; maxy?: number; dataz?: number[]; colorprovider?: geotoolkit.util.ColorProvider; defaultcolor?: string; defaultlinecolor?: string; painter?: any; symbolsize?: number; highlightcolor?: string; } );
                /**
                 * Modifies the crossplot content, the content of the given object will be merged with the current state of the shape.
                 * IE: If you pass only one parameter, all the others will remain unchanged.
                 * @param data  (Required) data
                 * @param data.x  (Optional) The x object containing values, min and max
                 * @param data.x.data  (Optional) The x values
                 * @param data.x.min  (Optional) The x minimum to use, can be used to clip the data
                 * @param data.x.max  (Optional) The x maximum to use, can be used to clip the data
                 * @param data.y  (Optional) The y object containing values, min and max
                 * @param data.y.data  (Optional) The y values
                 * @param data.y.min  (Optional) The y minimum to use, can be used to clip the data
                 * @param data.y.max  (Optional) The y maximum to use, can be used to clip the data
                 * @param data.z  (Optional) The z object containing values, min and max
                 * @param data.z.data  (Optional) The z values
                 * @param data.datax  (Optional) The x values
                 * @param data.minx  (Optional) The x minimum to use, can be used to clip the data
                 * @param data.maxx  (Optional) The x maximum to use, can be used to clip the data
                 * @param data.datay  (Optional) The y values
                 * @param data.miny  (Optional) The y minimum to use, can be used to clip the data
                 * @param data.maxy  (Optional) The y maximum to use, can be used to clip the data
                 * @param data.dataz  (Optional) The z values
                 * @param data.colorprovider  (Optional) The colorProvider used to color points based on their Z value
                 * @param data.defaultcolor  (Optional) The color to use if there is no ColorProvider provided or if a point has no valid Z value
                 * @param data.defaultlinecolor  (Optional) The color of line to be used in symbol
                 * @param data.painter  (Optional) The painter to draw symbols
                 * @param data.symbolsize  (Optional) The symbol size in pixel
                 * @param data.highlightcolor  (Optional) The color to use for highlighted shapes
                 */
                setData(data: any | { x?: any | { data?: number[]; min?: number; max?: number; } ; y?: any | { data?: number[]; min?: number; max?: number; } ; z?: any | { data?: number[]; } ; datax?: number[]; minx?: number; maxx?: number; datay?: number[]; miny?: number; maxy?: number; dataz?: number[]; colorprovider?: geotoolkit.util.ColorProvider; defaultcolor?: string; defaultlinecolor?: string; painter?: any; symbolsize?: number; highlightcolor?: string; } ): this;
                /**
                 * Get Data
                 */
                getData(): {data:{datax:number[];minx:number;maxx:number;datay:number[];miny:number;maxy:number;dataz:number[];colorprovider:geotoolkit.util.ColorProvider;defaultcolor:string;defaultlinecolor:string;highlightcolor:string;symbolsize:number;painter:any}}|any;
                /**
                 * Return ColorProvider
                 */
                getColorProvider(): geotoolkit.util.ColorProvider;
                /**
                 * Return false if bounds is equal to zero
                 */
                isEmpty(): boolean;
                /**
                 * Update limits
                 */
                updateLimits(): boolean;
                /**
                 * Sets the painter that will be used to draw crossplot points
                 * @param painter  (Required) The symbol painter function to draw
                 */
                setSymbolPainter(painter: Function): this;
                /**
                 * Get the current painter used to draw points
                 */
                getSymbolPainter(): Function;
                /**
                 * Render contents of the crossplot shape
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Returns if clipping is enabled or not for this node.
                 */
                isClippingEnabled(): boolean;
                /**
                 * Enables or disables clipping of this node. If enabled,
                 * shapes will not be rendered outside of its bounds.
                 * @param doClip  (Required) enable clipping on this node
                 */
                enableClipping(doClip: boolean): this;
                /**
                 * Draw canvas points
                 * @param context  (Required) Rendering Context
                 */
                drawCanvasPoints(context: geotoolkit.renderer.RenderingContext): this;
                /**
                 * Push symbol symbol
                 * @param color  (Required) color
                 * @param symbol  (Required) symbol to be pushed
                 */
                pushSymbol(color: geotoolkit.util.RgbaColor, symbol: any): this;
                /**
                 * Gets Highlighted Indices
                 */
                getHighlightedIndices(): any[];
                /**
                 * Highlights the selected area
                 * @param rect  (Required) search area
                 * @param reset  (Required) un-highlights previously selected indices
                 */
                highlightArea(rect: geotoolkit.util.Point|geotoolkit.util.Rect, reset: boolean): this;
                /**
                 * Highlights the selected indices
                 * @param indices  (Required) indices to be highlighted
                 * @param reset  (Required) un-highlights previously selected indices
                 */
                highlightIndices(indices: number[], reset: boolean): this;
                /**
                 * Return indices in search area
                 * @param area  (Required) search area
                 */
                getIndicesAt(area: geotoolkit.util.Area): number[];
                /**
                 * Return points in search area
                 * @param rect  (Required) search area
                 */
                getPointsAt(rect: geotoolkit.util.Point|geotoolkit.util.Rect): any[];
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
            }
            /**
             * Defines a Table View Shape
             */
            class TableView extends geotoolkit.scene.Group {
                /**
                 * Defines a Table View Shape
                 * @param options  (Required) JSON object
                 * @param options.rows  (Optional) rows
                 * @param options.cols  (Optional) columns
                 * @param options.fixedsize  (Optional) performance hint for table view
                 * @param options.indexwidth  (Optional) index column width
                 * @param options.headerheight  (Optional) header height
                 * @param options.cellsize  (Optional) cell size
                 * @param options.bounds  (Optional) bounds
                 */
                constructor(options: any | { rows?: number; cols?: number; fixedsize?: boolean; indexwidth?: number; headerheight?: number; cellsize?: geotoolkit.util.Dimension; bounds?: geotoolkit.util.Rect; } );
                /**
                 * TableViews's Events enumerator
                 */
                static Events: any;
                /**
                 * Set bounds for table in rows, columns
                 * @param rows  (Required) rows in the table
                 * @param columns  (Required) columns in the table
                 * @param rebuild  (Required) rebuild or not
                 */
                setTableBounds(rows: number, columns: number, rebuild: boolean): this;
                /**
                 * Measure column widths
                 */
                measureTableSize(): this;
                /**
                 * return column width
                 * @param column  (Required) index of the column, -1 for the index column
                 */
                getColumnWidth(column: number): number;
                /**
                 * Set column width
                 * @param column  (Required) index of the column, -1 for the index column
                 * @param width  (Required) column width
                 */
                setColumnWidth(column: number, width: number): this;
                /**
                 * Resize all column widths to fit to visible table width
                 * @param distributeColumnsEvenly  (Optional) 
                 */
                fitToWidth(distributeColumnsEvenly?: boolean): this;
                /**
                 * Set bounds in model space
                 * @param bounds  (Required) bounds in model space
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Returns visible model bounds in pixel space
                 */
                getVisibleTableModelLimits(): geotoolkit.util.Rect;
                /**
                 * Returns total model bounds in pixel space
                 */
                getContentTableBounds(): geotoolkit.util.Rect;
                /**
                 * Returns header model bounds in pixel space
                 */
                getHeaderBounds(): geotoolkit.util.Rect;
                /**
                 * Returns fixed columns model bounds in pixel space
                 */
                getFixedTableBounds(): geotoolkit.util.Rect;
                /**
                 * Returns table size in column, row count
                 */
                getTableSize(): geotoolkit.util.Dimension;
                /**
                 * Returns table limits in column, row size
                 */
                getVisibleTableLimits(): geotoolkit.util.Rect;
                /**
                 * Set visible table limits to specific position in column, row
                 * @param row  (Required) index at the row
                 * @param column  (Optional) index at the column
                 */
                setVisibleTableLimits(row: number, column?: number): this;
                /**
                 * Returns total table bounds in terms of column, row
                 */
                getTableBounds(): geotoolkit.util.Rect;
                /**
                 * Main method of scrolling the table view
                 * @param dx  (Required) number of model units to shift along x axis
                 * @param dy  (Required) number of model units to shift along y axis
                 */
                translateTable(dx: number, dy: number): this;
                /**
                 * Relayout table
                 */
                adjustTable(): this;
                /**
                 * Convenience method to set groups of visual properties
                 * @param data  (Required) JSON object
                 * @param data.indextitle  (Optional) JSON to set index title - see {geotoolkit.controls.shapes.TableView.setIndexTitle}
                 * @param data.indexvisible  (Optional) value to set index column visibility
                 * @param data.fixedsize  (Optional) performance hint for table view
                 * @param data.contentmeasure  (Optional) JSON setting table view content measurer - see {geotoolkit.controls.shapes.TableView.setContentMeasure}
                 * @param data.contentprepare  (Optional) JSON setting table view content preparer - see {geotoolkit.controls.shapes.TableView.setContentPrepare}
                 * @param data.contentprovider  (Optional) JSON setting table view content provider - see {geotoolkit.controls.shapes.TableView.setContentProvider}
                 * @param data.headerprovider  (Optional) JSON setting table view header provider - see {geotoolkit.controls.shapes.TableView.setHeaderProvider}
                 * @param data.indexprepare  (Optional) JSON setting table view index preparer - see {geotoolkit.controls.shapes.TableView.setIndexPrepare}
                 * @param data.indexprovider  (Optional) JSON setting table view index provider - see {geotoolkit.controls.shapes.TableView.setIndexProvider}
                 * @param data.markerprovider  (Optional) JSON setting table view marker provider - see {geotoolkit.controls.shapes.TableView.setMarkerProvider}
                 * @param data.header  (Optional) header options
                 * @param data.header.gridstyle  (Optional) Grid style
                 * @param data.header.textstyle  (Optional) Text style
                 * @param data.header.headerfillstyle  (Optional) Header fill style
                 * @param data.content  (Optional) content options
                 * @param data.content.gridstyle  (Optional) Grid style
                 * @param data.content.textstyle  (Optional) Text style
                 * @param data.content.oddfillstyle  (Optional) Odd row style
                 * @param data.content.evenfillstyle  (Optional) Even row style
                 * @param data.index  (Optional) index options
                 * @param data.index.gridstyle  (Optional) Grid style
                 * @param data.index.textstyle  (Optional) Text style
                 * @param data.index.oddfillstyle  (Optional) Odd row style
                 * @param data.index.evenfillstyle  (Optional) Even row style
                 * @param data.index.markerfillstyle  (Optional) Marker fill style
                 * @param data.index.markerlinestyle  (Optional) Marker line style
                 * @param data.highlightrowfillstyle  (Optional) Highlight row style
                 * @param data.highlightcolumnfillstyle  (Optional) Highlight column style
                 * @param data.bounds  (Optional) Bounds
                 * @param data.rows  (Optional) Table view row count
                 * @param data.cols  (Optional) Table view column count
                 * @param data.defaultcellsize  (Optional) Default cell dimensions
                 * @param data.defaultheadersize  (Optional) Default header dimensions
                 */
                setData(data: any | { indextitle?: string; indexvisible?: boolean; fixedsize?: boolean; contentmeasure?: any|Function; contentprepare?: any|Function; contentprovider?: any|Function; headerprovider?: any|Function; indexprepare?: any|Function; indexprovider?: any|Function; markerprovider?: any|Function; header?: any | { gridstyle?: geotoolkit.attributes.LineStyle; textstyle?: geotoolkit.attributes.TextStyle; headerfillstyle?: geotoolkit.attributes.FillStyle; } ; content?: any | { gridstyle?: geotoolkit.attributes.LineStyle; textstyle?: geotoolkit.attributes.TextStyle; oddfillstyle?: geotoolkit.attributes.FillStyle; evenfillstyle?: geotoolkit.attributes.FillStyle; } ; index?: any | { gridstyle?: geotoolkit.attributes.LineStyle; textstyle?: geotoolkit.attributes.TextStyle; oddfillstyle?: geotoolkit.attributes.FillStyle; evenfillstyle?: geotoolkit.attributes.FillStyle; markerfillstyle?: geotoolkit.attributes.FillStyle; markerlinestyle?: geotoolkit.attributes.LineStyle; } ; highlightrowfillstyle?: geotoolkit.attributes.FillStyle; highlightcolumnfillstyle?: geotoolkit.attributes.FillStyle; bounds?: geotoolkit.util.Rect; rows?: number; cols?: number; defaultcellsize?: geotoolkit.util.Dimension; defaultheadersize?: geotoolkit.util.Dimension; } ): this;
                /**
                 * Set left hand corner index text
                 * @param indexTitle  (Required) left hand corner index text
                 */
                setIndexTitle(indexTitle: string): this;
                /**
                 * Set optional cell measurement device, typical use would be to determine min table cell widths by contents.
                 * contentMeasure parameter format: contentMeasure(column, textAttribute)
                 * function will run with TableView set as this
                 * object will run normally
                 * @param contentMeasure  (Required) function to determine min table cell widths by contents
                 */
                setContentMeasure(contentMeasure: Function|any): this;
                /**
                 * Set optional formatter of content values, use to prepare content value provider output.
                 * contentPrepare parameter format: (startRow, endRow)
                 * function will run with TableView set as this
                 * object will run normally
                 * @param contentPrepare  (Required) optional formatter of content values
                 */
                setContentPrepare(contentPrepare: Function|any): this;
                /**
                 * Set content value provider, returns optionally formatted content value at col, row.
                 * contentProvider parameter format: (column, row)
                 * function will run with TableView set as this
                 * object will run normally
                 * @param contentProvider  (Required) content value provider
                 */
                setContentProvider(contentProvider: Function|any): this;
                /**
                 * Set content format provider, returns optional text style at row.
                 * contentFormatProvider parameter format: (row)
                 * function will run with TableView set as this
                 * object will run normally
                 * @param contentFormatProvider  (Required) content format provider
                 */
                setContentFormatProvider(contentFormatProvider: Function|any): this;
                /**
                 * Set header value provider, returns column header name.
                 * headerProvider parameter format: (column)
                 * function will run with TableView set as this
                 * object will run normally
                 * @param headerProvider  (Required) header value provider, returns column header name
                 */
                setHeaderProvider(headerProvider: Function|any): this;
                /**
                 * Set header format provider, returns optionally text style at column.
                 * headerFormatProvider parameter format: (column)
                 * function will run with TableView set as this
                 * object will run normally
                 * @param headerFormatProvider  (Required) header format provider, returns optionally text style at column
                 */
                setHeaderFormatProvider(headerFormatProvider: Function|any): this;
                /**
                 * Set optional formatter of index values, use to prepare index value provider output.
                 * indexPrepare parameter format: (startRow, endRow)
                 * function will run with TableView set as this
                 * object will run normally
                 * @param indexPrepare  (Required) optional formatter of index values, use to prepare index value provider output
                 */
                setIndexPrepare(indexPrepare: Function|any): this;
                /**
                 * Set index value provider, returns optionally formatted index value at row.
                 * indexProvider parameter format: (row)
                 * function will run with TableView set as this
                 * object will run normally
                 * @param indexProvider  (Required) index value provider, returns optionally formatted index value at row
                 */
                setIndexProvider(indexProvider: Function|any): this;
                /**
                 * Set index format provider, returns optionally text style at row.
                 * indexFormatProvider parameter format: (row)
                 * function will run with TableView set as this
                 * object will run normally
                 * @param indexFormatProvider  (Required) index format provider, returns text style at row
                 */
                setIndexFormatProvider(indexFormatProvider: Function|any): this;
                /**
                 * Set marker provider, returns boolean value to show/hide marker.
                 * markerProvider parameter format: (row)
                 * function will run with TableView set as this
                 * object will run normally
                 * @param markerProvider  (Required) marker provider, returns boolean value to show/hide marker
                 */
                setMarkerProvider(markerProvider: Function|any): this;
                /**
                 * Run once before rendering content data. This should be used to prepare content data output formatting.
                 * @param fromRow  (Required) fromRow used to prepare content data output formatting
                 * @param toRow  (Required) toRow used to prepare content data output formatting
                 * @param fromColumn  (Required) 
                 * @param toColumn  (Required) 
                 */
                prepareContent(fromRow: number, toRow: number, fromColumn: number, toColumn: number): any;
                /**
                 * Return optionally formatted content text field at col, row
                 * @param column  (Required) index at the column
                 * @param row  (Required) index at the column
                 */
                getContentData(column: number, row: number): string;
                /**
                 * Return header text at column
                 * @param column  (Required) index where the header text will be returned
                 */
                getHeaderData(column: number): string;
                /**
                 * Run once before rendering index data. This should be used to prepare index data output formatting.
                 * @param fromRow  (Required) fromRow used to prepare index data output formatting
                 * @param toRow  (Required) toRow used to prepare index data output formatting
                 */
                prepareIndex(fromRow: number, toRow: number): any;
                /**
                 * Return optionally formatted index value at row
                 * @param row  (Required) index value at row
                 */
                getIndexData(row: number): string;
                /**
                 * Show marker at row
                 * @param row  (Required) index value at row
                 */
                getMarkerData(row: number): boolean;
                /**
                 * Select row index for active row
                 * @param row  (Required) index value at row
                 */
                setActiveRow(row: number): this;
                /**
                 * Select row indexes for active rows
                 * @param rows  (Optional) index value at row
                 */
                setActiveRows(rows?: number[]|number|any): this;
                /**
                 * Return active row index
                 */
                getActiveRow(): number;
                /**
                 * Return active rows as array index
                 */
                getActiveRows(): number[];
                /**
                 * Select row index for highlighting
                 * @param row  (Required) index value at row
                 */
                highlightRow(row: number): this;
                /**
                 * Return highlighted row index
                 */
                getHighlightedRow(): number;
                /**
                 * Select column index for highlighting
                 * @param column  (Required) column index for highlighting
                 */
                highlightColumn(column: number): this;
                /**
                 * Returns highlighted column index
                 */
                getHighlightedColumn(): number;
                /**
                 * Returns cell row by x y position (in table view model coordinates)
                 * @param x  (Required) x coordinate
                 * @param y  (Optional) y coordinate
                 * @param exactValue  (Optional) exact value
                 */
                resolveCellCoordinate(x: number|geotoolkit.util.Point, y?: number, exactValue?: boolean): geotoolkit.util.Point;
                /**
                 * Returns cell bounds
                 * @param row  (Required) index at row
                 * @param column  (Required) index at column
                 */
                getCellBounds(row: number, column: number): geotoolkit.util.Rect;
            }
            /**
             * Defines a color bar shape. The ColorBar shape is an advanced shape that can display a colorprovider as a legend.<br>
             * It will render the colors from the colorprovider along with an axis and the corresponding ticks & labels.
             */
            class ColorBar extends geotoolkit.scene.Group {
                /**
                 * Defines a color bar shape. The ColorBar shape is an advanced shape that can display a colorprovider as a legend.<br>
                 * It will render the colors from the colorprovider along with an axis and the corresponding ticks & labels.
                 * @param options  (Optional) 
                 * @param options.colorprovider  (Optional) default color provider
                 * @param options.location  (Optional) color bar location
                 * @param options.flip  (Optional) flip or not
                 * @param options.linestyle  (Optional) line style
                 * @param options.range  (Optional) data range
                 * @param options.range.min  (Optional) data range min value. If not specified then color provider's getMinValue() is used.
                 * @param options.range.max  (Optional) data range max value. If not specified then color provider's getMaxValue() is used.
                 * @param options.title  (Optional) color bar title
                 * @param options.title.size  (Optional) title area desired size
                 * @param options.title.visible  (Optional) title visibility
                 * @param options.title.text  (Optional) title text
                 * @param options.title.textstyle  (Optional) title textstyle
                 * @param options.title.item  (Optional) title text object instance
                 * @param options.axis  (Optional) 
                 * @param options.axis.size  (Optional) axis area desired size
                 * @param options.axis.visible  (Optional) axis visibility
                 * @param options.axis.autolabelrotation  (Optional) axis auto label rotation flag
                 * @param options.axis.item  (Optional) axis object instance
                 * @param options.colorbox  (Optional) color box attributes
                 * @param options.colorbox.size  (Optional) colorbox area desired size
                 * @param options.colorbox.linestyle  (Optional) colorbox outline rectangle linestyle
                 * @param options.namedcolors  (Optional) namedcolors options
                 * @param options.namedcolors.size  (Optional) named colors desired size
                 */
                constructor(options?: any | { colorprovider?: geotoolkit.util.ColorProvider; location?: geotoolkit.controls.shapes.ColorBarLocation|string; flip?: boolean; linestyle?: geotoolkit.attributes.LineStyle|any; range?: any | { min?: number; max?: number; } ; title?: any | { size?: number; visible?: boolean; text?: string; textstyle?: geotoolkit.attributes.TextStyle|string|any; item?: geotoolkit.scene.shapes.Text; } ; axis?: any | { size?: number; visible?: boolean; autolabelrotation?: boolean; item?: geotoolkit.axis.Axis; } ; colorbox?: any | { size?: number; linestyle?: geotoolkit.attributes.LineStyle|any; } ; namedcolors?: any | { size?: number; } ; } );
                /**
                 * Return new instance of the ColorBar node
                 */
                clone(): geotoolkit.controls.shapes.ColorBar;
                /**
                 * Sets color bar options
                 * @param options  (Optional) colorbar options
                 * @param options.colorprovider  (Optional) default color provider
                 * @param options.location  (Optional) color bar location
                 * @param options.flip  (Optional) flip or not
                 * @param options.linestyle  (Optional) line style
                 * @param options.range  (Optional) colorbar range
                 * @param options.range.min  (Optional) data range min value. If not specified then color provider's getMinValue() is used.
                 * @param options.range.max  (Optional) data range max value. If not specified then color provider's getMaxValue() is used.
                 * @param options.min  (Optional) data range min value. If not specified then color provider's getMinValue() is used.
                 * @param options.max  (Optional) data range max value. If not specified then color provider's getMaxValue() is used.
                 * @param options.title  (Optional) title attributes
                 * @param options.title.size  (Optional) title area desired size
                 * @param options.title.visible  (Optional) title visibility
                 * @param options.title.text  (Optional) title text
                 * @param options.title.textstyle  (Optional) title textstyle
                 * @param options.title.item  (Optional) title text object instance
                 * @param options.titletext  (Optional) title text
                 * @param options.axis  (Optional) colorbar axis
                 * @param options.axis.size  (Optional) axis area desired size
                 * @param options.axis.visible  (Optional) axis visibility
                 * @param options.axis.labelrotation  (Optional) axis label rotation in radians
                 * @param options.axis.autolabelrotation  (Optional) auto rotate the labels if true
                 * @param options.axis.autolabelrotationangle  (Optional) rotation angle if active auto label rotation
                 * @param options.axis.tickgenerator  (Optional) tickgenerator options, see {@link geotoolkit.controls.Axis#setProperties}
                 * @param options.axis.item  (Optional) axis object instance
                 * @param options.colorbox  (Optional) color box
                 * @param options.colorbox.size  (Optional) colorbox area desired size
                 * @param options.colorbox.linestyle  (Optional) colorbox outline rectangle linestyle
                 * @param options.componentsizes  (Optional) size of components
                 * @param options.componentsizes.title  (Optional) title area desired size
                 * @param options.componentsizes.colorbox  (Optional) colorbox area desired size
                 * @param options.componentsizes.axis  (Optional) axis area desired size
                 * @param options.componentsizes.namedcolors  (Optional) named colors desired size
                 * @param options.namedcolors  (Optional) namedcolors options
                 * @param options.namedcolors.size  (Optional) named colors desired size
                 * @param options.namedcolors.visible  (Optional) named colors visibility
                 */
                setOptions(options?: any | { colorprovider?: geotoolkit.util.ColorProvider; location?: geotoolkit.controls.shapes.ColorBarLocation|string; flip?: boolean; linestyle?: geotoolkit.attributes.LineStyle|any; range?: number|any | { min?: number; max?: number; } ; min?: number; max?: number; title?: number|any | { size?: number; visible?: boolean; text?: string; textstyle?: geotoolkit.attributes.TextStyle|string|any; item?: geotoolkit.scene.shapes.Text; } ; titletext?: string; axis?: number|any | { size?: number; visible?: boolean; labelrotation?: number; autolabelrotation?: boolean; autolabelrotationangle?: number; tickgenerator?: number; item?: geotoolkit.axis.Axis; } ; colorbox?: number|any | { size?: number; linestyle?: geotoolkit.attributes.LineStyle|any; } ; componentsizes?: number|any | { title?: number; colorbox?: number; axis?: number; namedcolors?: number; } ; namedcolors?: any | { size?: number; visible?: boolean; } ; } ): this;
                /**
                 * Gets color bar options
                 */
                getOptions(): any;
                /**
                 * Updates layout
                 * @param targets  (Optional) optional parameter about which element to layout
                 */
                updateLayout(targets?: geotoolkit.scene.Node[]): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set see {@link geotoolkit.controls.shapes.ColorBar#setOptions}
                 */
                setProperties(properties: any): this;
                /**
                 * Returns the tick generator of inner axis for manipulations
                 */
                getTickGenerator(): geotoolkit.axis.TickGenerator|any;
                /**
                 * Set tick generator
                 * @param tickGenerator  (Required) tick generator
                 */
                setTickGenerator(tickGenerator: geotoolkit.axis.TickGenerator): this;
                /**
                 * Gets the offset of value on ColorBar
                 * @param value  (Required) value
                 */
                getPointAtValue(value: number): number;
            }
            /**
             * Defines a basic polar grid. This class is a base class for rendering polar grid. Polar grid is a base class for all diagrams in polar coordinates.<br>
             * Three parameters should be passed to polar visual to make it work properly:<br>
             * 1) Center of the diagram(in model coordinates)<br>
             * 2) Radius of the grid(in model coordinates)<br>
             * 3) Angle increment to draw sectors <br>
             * The grid in the polar chart can be customized very easily, please refer to the gridlines properties in the constructor below.<br>
             * Sectors can be added to highlight areas in the grid as shown in the example
             */
            class PolarGrid extends geotoolkit.scene.shapes.RectangularShape {
                /**
                 * Defines a basic polar grid. This class is a base class for rendering polar grid. Polar grid is a base class for all diagrams in polar coordinates.<br>
                 * Three parameters should be passed to polar visual to make it work properly:<br>
                 * 1) Center of the diagram(in model coordinates)<br>
                 * 2) Radius of the grid(in model coordinates)<br>
                 * 3) Angle increment to draw sectors <br>
                 * The grid in the polar chart can be customized very easily, please refer to the gridlines properties in the constructor below.<br>
                 * Sectors can be added to highlight areas in the grid as shown in the example
                 * @param options  (Optional) 
                 * @param options.center  (Optional) a center of the polar grid
                 * @param options.center.x  (Optional) x coordinate of the center
                 * @param options.center.y  (Optional) y coordinate of the center
                 * @param options.angle  (Optional) an increment angle of the grid
                 * @param options.outerradius  (Optional) a radius of the polar chart
                 * @param options.modelradius  (Optional) radius of the polar chart in the model coordinates
                 * @param options.startangle  (Optional) a start angle to be used for 0 angle (by default it is E direction)
                 * @param options.linestyle  (Optional) line style to specify style for outer circle
                 * @param options.gridlines  (Optional) gridlines properties
                 * @param options.gridlines.radius  (Optional) define options of radius gridlines
                 * @param options.gridlines.radius.linestyle  (Optional) line style
                 * @param options.gridlines.radius.step  (Optional) step by radius in model coordinates
                 * @param options.gridlines.radius.values  (Optional) optional positions of lines. In this case step ignored. values are in raduses
                 * @param options.gridlines.radius.visible  (Optional) visibility of radius grid
                 * @param options.gridlines.radius.highlighted  (Optional) define a color to highlight grid
                 * @param options.gridlines.angles  (Optional) define options of angles gridlines
                 * @param options.gridlines.angles.visible  (Optional) visibility of angles grid
                 * @param options.gridlines.angles.visiblelabels  (Optional) visibility of angles labels
                 * @param options.gridlines.angles.linestyle  (Optional) line style
                 * @param options.gridlines.angles.textstyle  (Optional) labels style
                 * @param options.gridlines.angles.labels  (Optional) define optional labels instead of standard
                 * @param options.gridlines.angles.labels.values  (Optional) define optional array of angles
                 * @param options.gridlines.angles.labels.text  (Optional) define optional array of text labels
                 * @param options.gridlines.angles.labelsalongcircumference  (Optional) draw text labels along the circumfrence of the outer circle
                 */
                constructor(options?: any | { center?: geotoolkit.util.Point|any | { x?: number; y?: number; } ; angle?: number; outerradius?: number; modelradius?: number; startangle?: number; linestyle?: geotoolkit.attributes.LineStyle|any; gridlines?: any | { radius?: any | { linestyle?: geotoolkit.attributes.LineStyle|any; step?: number; values?: number; visible?: boolean; highlighted?: string; } ; angles?: any | { visible?: boolean; visiblelabels?: boolean; linestyle?: geotoolkit.attributes.LineStyle|any; textstyle?: geotoolkit.attributes.TextStyle|any; labels?: any | { values?: number[]; text?: string[]; } ; labelsalongcircumference?: boolean; } ; } ; } );
                /**
                 * Sets an array of sectors
                 * @param sectors  (Required) each element {start, end, color, length)
                 */
                setSectors(sectors: any[]): this;
                /**
                 * Set options
                 * @param options  (Required) JSON containing grid options
                 * @param options.center  (Required) a center of the polar chart
                 * @param options.angle  (Optional) an increment angle of the grid
                 * @param options.outerradius  (Optional) a radius of the polar chart
                 * @param options.linestyle  (Optional) line style to specify style for outer circle
                 * @param options.gridlines  (Optional) gridlines properties
                 * @param options.gridlines.radius  (Optional) define options of radius gridlines
                 * @param options.gridlines.radius.linestyle  (Optional) line style
                 * @param options.gridlines.radius.step  (Optional) step by radius in model coordinates
                 * @param options.gridlines.radius.values  (Optional) optional positions of lines. In this case step ignored. values are in raduses
                 * @param options.gridlines.radius.visible  (Optional) visibility of radius grid
                 * @param options.gridlines.angles  (Optional) define options of angles gridlines
                 * @param options.gridlines.angles.visible  (Optional) visibility of angles grid
                 * @param options.gridlines.angles.visiblelabels  (Optional) visibility of angles labels
                 * @param options.gridlines.angles.linestyle  (Optional) line style
                 * @param options.gridlines.angles.textstyle  (Optional) labels style
                 * @param options.gridlines.angles.labels  (Optional) define optional labels instead of standard
                 * @param options.gridlines.angles.labels.values  (Optional) define optional array of angles
                 * @param options.gridlines.angles.labels.text  (Optional) define optional array of text labels
                 * @param options.gridlines.angles.labelsalongcircumference  (Optional) lables drawn along outer circumfrance
                 * @param options.gridlines.angles.labeloffset  (Optional) radius offset for labels
                 * @param refresh  (Optional) invalidate graph
                 */
                setOptions(options: any | { center?: geotoolkit.util.Point; angle?: number; outerradius?: number; linestyle?: geotoolkit.attributes.LineStyle|any; gridlines?: any | { radius?: any | { linestyle?: geotoolkit.attributes.LineStyle|any; step?: number; values?: number; visible?: boolean; } ; angles?: any | { visible?: boolean; visiblelabels?: boolean; linestyle?: geotoolkit.attributes.LineStyle|any; textstyle?: geotoolkit.attributes.TextStyle|any; labels?: any | { values?: number[]; text?: string[]; } ; labelsalongcircumference?: boolean; labeloffset?: boolean; } ; } ; } , refresh?: boolean): this;
                /**
                 * Return option to be used to draw a grid
                 */
                getOptions(): any;
                /**
                 * Convert model radius to outer radius
                 * @param value  (Required) value of the outer radius
                 */
                modelToOuterRadius(value: number): number;
                /**
                 * Render contents of the crossplot shape
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Render angle grid
                 * @param context  (Required) Rendering Context
                 */
                drawSectors(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Render angle grid
                 * @param context  (Required) Rendering Context
                 */
                drawAngleGrid(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Render angle axis
                 * @param context  (Required) Rendering Context
                 */
                drawAngleAxis(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Render angle text horizontally
                 * @param context  (Required) Rendering Context
                 */
                drawAngleAxisRegular(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Render angle text along circumference
                 * @param context  (Required) Rendering Context
                 */
                drawAngleAxisAlongCircumference(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Render value grid
                 * @param context  (Required) Rendering Context
                 */
                drawValueGrid(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Convert point from polar to cartesian coordinate system. the center is int e
                 * @param r  (Required) radius
                 * @param theta  (Required) angle in grad
                 */
                polarToCartesian(r: number, theta: number): geotoolkit.util.Point;
                /**
                 * Convert point from polar to cartesian coordinate system
                 * @param x  (Required) x coordinate (offset from center point)
                 * @param y  (Required) coordinate (offset from center point)
                 */
                cartesianToPolar(x: number, y: number): geotoolkit.util.Point;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.options  (Optional) options to set see {@link geotoolkit.controls.shapes.PolarGrid#setOptions}
                 */
                setProperties(properties: any | { options?: any; } ): this;
            }
            /**
             * A Polar Chart is a circular graph used for data comparison.
             */
            class PolarChart extends geotoolkit.scene.shapes.Shape {
                /**
                 * A Polar Chart is a circular graph used for data comparison.
                 * @param options  (Optional) 
                 * @param options.center  (Optional) a center of the polar chart
                 * @param options.center.x  (Optional) x coordinate of the center
                 * @param options.center.y  (Optional) y coordinate of the center
                 * @param options.polargrid  (Optional) grid to get initialization parameters.
                 * @param options.outerradius  (Optional) a radius of the polar chart
                 * @param options.modelradius  (Optional) radius of the polar chart in the model coordinates
                 * @param options.startangle  (Optional) a start angle to be used for 0 angle (by default it is E direction)
                 * @param options.data  (Optional) array of polar chart data
                 */
                constructor(options?: any | { center?: geotoolkit.util.Point|any | { x?: number; y?: number; } ; polargrid?: geotoolkit.controls.shapes.PolarGrid; outerradius?: number; modelradius?: number; startangle?: number; data?: any[]; } );
                /**
                 * set model radius
                 * @param radius  (Required) model radius
                 */
                setModelRadius(radius: number): this;
                /**
                 * Return model radius
                 */
                getModelRadius(): number;
                /**
                 * Set the data to be plotted in chart
                 * @param data  (Required) polar chart options
                 * @param data.name  (Optional) chart name
                 * @param data.polargrid  (Optional) chart grid
                 * @param data.outerRadius  (Optional) outer radius
                 * @param data.modelradius  (Optional) model radius
                 * @param data.startangle  (Optional) start angle
                 * @param data.center  (Optional) center point
                 * @param data.data  (Optional) to be charted in polar chart
                 */
                setData(data: any | { name?: string; polargrid?: geotoolkit.controls.shapes.PolarGrid; outerRadius?: number; modelradius?: number; startangle?: number; center?: geotoolkit.util.Point; data?: any[]; } ): this;
                /**
                 * Returns current bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Return array of chart options
                 */
                getOptions(): any;
                /**
                 * Sets bounds of the node in the parent coordinates
                 * @param bounds  (Required) bound of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Reset highlighting
                 */
                resetHighlighting(): any;
                /**
                 * Highlights the selected indices
                 * @param indices  (Required) indices to be highlighted
                 * @param series  (Optional) series number
                 * @param reset  (Optional) un-highlights previously selected indices
                 */
                highlightIndices(indices: number[], series?: number, reset?: boolean): this;
                /**
                 * Hit test in the device coordinate
                 * @param area  (Required) model area or position
                 * @param radius  (Optional) radius of selection
                 */
                hitTest(area: geotoolkit.util.Rect|geotoolkit.util.Point, radius?: number): geotoolkit.scene.Node[];
                /**
                 * Render polar chart shape
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Convert point from polar to cartesian coordinate system. the center is int e
                 * @param r  (Required) radius
                 * @param theta  (Required) angle in grad
                 */
                polarToCartesian(r: number, theta: number): geotoolkit.util.Point;
                /**
                 * Convert model radius to outer radius
                 * @param value  (Required) value of the outer radius
                 */
                modelToOuterRadius(value: number): number;
            }
            /**
             * Defines an crossplot shape in the polar coordinates. First a polar grid will need to be created and then CrossPlot shape can be added to the grid as shown in the example below.<br>
             * Sectors can be added to highlight the area and third dimension can be defined for each point in the cross plot. To display a tool tip while clicking a symbol on polar cross plot, refer to the Polar Plot section Polar Chart tutorial.
             */
            class PolarCrossPlot extends geotoolkit.controls.shapes.CrossPlot {
                /**
                 * Defines an crossplot shape in the polar coordinates. First a polar grid will need to be created and then CrossPlot shape can be added to the grid as shown in the example below.<br>
                 * Sectors can be added to highlight the area and third dimension can be defined for each point in the cross plot. To display a tool tip while clicking a symbol on polar cross plot, refer to the Polar Plot section Polar Chart tutorial.
                 * @param options  (Optional) 
                 * @param options.center  (Optional) a center of the polar chart
                 * @param options.outerradius  (Optional) a radius of the polar chart
                 * @param options.modelradius  (Optional) a radius of the polar chart in the model coordinates
                 * @param options.startangle  (Optional) a start angle to be used for 0 angle (by default it is E direction)
                 * @param options.colorProvider  (Optional) a color provider
                 * @param options.painter  (Optional) a painter
                 * @param options.defaultcolor  (Optional) The color to use if there is no ColorProvider provided or if a point has no valid Z value
                 * @param options.symbolsize  (Optional) The symbol size in pxl
                 * @param options.highlightcolor  (Optional) The color to use for highlighted shapes
                 * @param options.polargrid  (Optional) grid to get initialization parameters. If grid is specified other
parameters are ignored
                 * @param options.data  (Optional) a data in polar coordinates
                 * @param options.data.radius  (Optional) an array of radius
                 * @param options.data.angle  (Optional) an array of angles in grad
                 * @param options.data.variable  (Optional) an array of numbers to be used for third dimension
                 */
                constructor(options?: any | { center?: geotoolkit.util.Point; outerradius?: number; modelradius?: number; startangle?: number; colorProvider?: geotoolkit.util.ColorProvider; painter?: any; defaultcolor?: string; symbolsize?: number; highlightcolor?: string; polargrid?: geotoolkit.controls.shapes.PolarGrid; data?: any | { radius?: number[]; angle?: number[]; variable?: number[]; } ; } );
                /**
                 * @param options  (Required) 
                 * @param options.center  (Required) a center of the polar chart
                 * @param options.outerradius  (Optional) a radius of the polar chart
                 * @param options.modelradius  (Optional) a radius of the polar chart in the model coordinates
                 * @param options.startangle  (Optional) a start angle to be used for 0 angle (by default it is E direction)
                 * @param options.colorProvider  (Optional) a color provider
                 * @param options.painter  (Optional) a painter
                 * @param options.polargrid  (Optional) grid to get initialization parameters. If grid is specified other
parameters are ignored
                 * @param options.data  (Optional) a data in polar coordinates
                 * @param options.data.radius  (Optional) an array of radius
                 * @param options.data.angle  (Optional) an array of angles in grad
                 * @param options.data.variable  (Optional) an array of numbers to be used for third dimension
                 */
                setData(options: any | { center?: geotoolkit.util.Point; outerradius?: number; modelradius?: number; startangle?: number; colorProvider?: geotoolkit.util.ColorProvider; painter?: any; polargrid?: geotoolkit.controls.shapes.PolarGrid; data?: any | { radius?: number[]; angle?: number[]; variable?: number[]; } ; } ): this;
                /**
                 * Convert point from polar to cartesian coordinate system. the center is int e
                 * @param r  (Required) radius
                 * @param theta  (Required) angle in grad
                 */
                polarToCartesian(r: number, theta: number): geotoolkit.util.Point;
                /**
                 * Convert point from polar to cartesian coordinate system
                 * @param x  (Required) x coordinate (offset from center point)
                 * @param y  (Required) coordinate (offset from center point)
                 */
                cartesianToPolar(x: number, y: number): geotoolkit.util.Point;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.options  (Optional) options to set see {@link geotoolkit.controls.shapes.PolarCrossPlot#setData}
                 */
                setProperties(properties?: any | { options?: any; } ): this;
            }
            /**
             * A Rose Chart is a circular graph used for data comparison. Each category or interval in data is divided into equal segments on the radial chart.<br>
             * How far each segment extends from the centre, in proportion to the value it represents, depends on a polar axis.<br>
             */
            class RoseChart extends geotoolkit.scene.shapes.Shape {
                /**
                 * A Rose Chart is a circular graph used for data comparison. Each category or interval in data is divided into equal segments on the radial chart.<br>
                 * How far each segment extends from the centre, in proportion to the value it represents, depends on a polar axis.<br>
                 * @param options  (Required) 
                 */
                constructor(options: any);
                /**
                 * Enum for RoseMode
                 */
                static RoseMode: any;
                /**
                 * Set fill styles
                 * @param styles  (Optional) line styles
                 */
                setFillStyles(styles?: geotoolkit.util.Iterator|(geotoolkit.attributes.FillStyle|any)[]|geotoolkit.attributes.LineStyle|any): this;
                /**
                 * Return iterator with fill styles
                 * @param func  (Optional) to filter fill styles
                 */
                getFillStyles(func?: Function): geotoolkit.util.Iterator;
                /**
                 * Return fill style by specified index if any, or background fill style
                 * @param index  (Optional) index of the fill style
                 */
                getFillStyle(index?: number): geotoolkit.attributes.FillStyle;
                /**
                 * Returns amount of known fill styles
                 */
                getFillStylesCount(): number;
                /**
                 * Set line styles
                 * @param styles  (Optional) line styles
                 */
                setLineStyles(styles?: geotoolkit.util.Iterator|(geotoolkit.attributes.LineStyle|any)[]|geotoolkit.attributes.LineStyle|any): this;
                /**
                 * Return iterator with fill styles
                 * @param func  (Optional) to filter fill styles
                 */
                getLineStyles(func?: Function): geotoolkit.util.Iterator;
                /**
                 * Return line style by specified index if any, or border line style
                 * @param index  (Optional) index of the line style
                 */
                getLineStyle(index?: number): geotoolkit.attributes.LineStyle;
                /**
                 * Returns amount of known line styles
                 */
                getLineStylesCount(): number;
                /**
                 * Set values
                 * @param values  (Required) values
                 */
                setValues(values: (number|any)[]): this;
                /**
                 * Set rose mode
                 * @param mode  (Required) rose mode
                 */
                setRoseMode(mode: geotoolkit.controls.shapes.RoseChart.RoseMode): this;
                /**
                 * Return rose mode
                 */
                getRoseMode(): geotoolkit.controls.shapes.RoseChart.RoseMode;
                /**
                 * Set model radius
                 * @param radius  (Required) model radius
                 */
                setModelRadius(radius: number): this;
                /**
                 * Return model radius
                 */
                getModelRadius(): number;
                /**
                 * Set the data to be plotted in the rose chart
                 * @param data  (Required) Data to be charted in histogram
                 * @param data.name  (Required) name of the rose chart diagram
                 * @param data.polargrid  (Optional) polar grid
                 * @param data.rosemode  (Optional) Rosemode
                 * @param data.outerradius  (Optional) outer radius
                 * @param data.startangle  (Optional) start angle
                 * @param data.center  (Optional) center
                 * @param data.fillstyle  (Optional) background fill style
                 * @param data.linestyle  (Optional) border line style
                 * @param data.values  (Optional) values values
                 * @param data.data  (Optional) data object
                 * @param data.data.bins  (Optional) bins bins
                 * @param data.data.fillstyles  (Optional) an array of fill styles
                 * @param data.data.linestyles  (Optional) an array of line styles
                 */
                setData(data: any | { name?: string; polargrid?: geotoolkit.controls.shapes.PolarGrid; rosemode?: geotoolkit.controls.shapes.RoseChart; outerradius?: number; startangle?: number; center?: geotoolkit.util.Point; fillstyle?: geotoolkit.attributes.FillStyle|any; linestyle?: geotoolkit.attributes.LineStyle|any; values?: number[]; data?: any | { bins?: number; fillstyles?: geotoolkit.util.Iterator|(geotoolkit.attributes.FillStyle|any)[]|geotoolkit.attributes.FillStyle|any; linestyles?: geotoolkit.util.Iterator|(geotoolkit.attributes.LineStyle|any)[]|geotoolkit.attributes.LineStyle|any; } ; } ): this;
                /**
                 * Returns rose chart options
                 */
                getOptions(): {options:{name:string;polargrid:geotoolkit.controls.shapes.PolarGrid;rosemode:geotoolkit.controls.shapes.RoseChart;outerradius:number;startangle:number;center:geotoolkit.util.Point;fillstyle:geotoolkit.attributes.FillStyle;linestyle:geotoolkit.attributes.LineStyle;values:number[];data:{bins:number;fillstyles:geotoolkit.util.Iterator;linestyles:geotoolkit.util.Iterator}}}|any;
                /**
                 * Return bin count
                 */
                getBinCount(): number;
                /**
                 * Set bins count
                 * @param bins  (Required) bins count
                 */
                setBinCount(bins: number): this;
                /**
                 * Sets bounds of the node in the parent coordinates
                 * @param bounds  (Required) bounds of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Returns current bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Render histogram shape
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Convert model radius to outer radius
                 * @param value  (Required) value of the outer raidus
                 */
                modelToOuterRadius(value: number): number;
            }
            /**
             * This class defines a DonutChart object. The doughnut and pie charts are generally equal. <br>
             * The only difference is that doughnut chart has a hole in the center so it has one extra parameter - inner radius. <br>
             */
            class DonutChart extends geotoolkit.scene.Group {
                /**
                 * This class defines a DonutChart object. The doughnut and pie charts are generally equal. <br>
                 * The only difference is that doughnut chart has a hole in the center so it has one extra parameter - inner radius. <br>
                 * @param options  (Required) options object
                 * @param options.outerradius  (Optional) outer radius
                 * @param options.maxouterradius  (Optional) max outer radius
                 * @param options.innerradius  (Optional) inner radius
                 * @param options.piemode  (Optional) 2d- or 3d-representation
                 * @param options.startangle  (Optional) starting angle of the first slice drawn, in degrees
                 * @param options.direction  (Optional) slices' rendering direction
                 * @param options.fillstyles  (Optional) fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
                 * @param options.selected-fillstyles  (Optional) fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
                 * @param options.linestyle  (Optional) slice line style
                 * @param options.autogradient  (Optional) autogradient flag
                 * @param options.createselectedstyle  (Optional) method to create selected style based on "regular" one (used when "selected_fillstyles" not set explicitly)
                 * @param options.minpercentage  (Optional) minimum percentage cutoff for a slice before it becomes part of "other". 0 for no limit
                 * @param options.maxslices  (Optional) maximum amount of slices the graph can have including an "other" slice. 0 for infinite
                 * @param options.showpercentagesthreshold  (Optional) below this threshold (from 0 to 100) the percentage is not displayed
                 * @param options.modellimitsmode  (Optional) model limits mode
                 * @param options.label  (Optional) labeling options object
                 * @param options.label.hideifdontfit  (Optional) hide an inside label if it doesn't fit
                 * @param options.label.format  (Optional) label formatting method in form "function myLabelFormat(annotation, value) {...}" returning {string} value
                 * @param options.label.location  (Optional) label location
                 * @param options.label.direction  (Optional) label direction
                 * @param options.label.textstyle  (Optional) label text style
                 * @param options.outsideline  (Optional) outside line options object
                 * @param options.outsideline.linestyle  (Optional) outside line style
                 * @param options.outsideline.length  (Optional) outside line length
                 * @param options.outsideline.pad  (Optional) outside line pad
                 * @param options.sliceshift  (Optional) slice shift options object
                 * @param options.sliceshift.offsets  (Optional) slices shift offsets. Index in the array to match the index of slice
                 * @param options.sliceshift.offset  (Optional) deprecated (since 2.6) slice shift offset
                 * @param options.sliceshift.index  (Optional) deprecated (since 2.6) index (indices) of slices to shift
                 * @param options.depth3d  (Optional) height of a pseudo-3d chart
                 * @param options.inclination3d  (Optional) angle of the pseudo-3d chart. should be between 0 and 90
                 */
                constructor(options: any | { outerradius?: number; maxouterradius?: number; innerradius?: number; piemode?: geotoolkit.controls.shapes.DonutChart.PieMode|string; startangle?: number; direction?: geotoolkit.controls.shapes.DonutChart.Direction|string; fillstyles?: (geotoolkit.attributes.FillStyle|string|any)[]; "selected-fillstyles"?: (geotoolkit.attributes.FillStyle|string|any)[]; linestyle?: geotoolkit.attributes.LineStyle|string|any; autogradient?: boolean; createselectedstyle?: Function; minpercentage?: number; maxslices?: number; showpercentagesthreshold?: number; modellimitsmode?: geotoolkit.controls.shapes.DonutChart.ModelLimitsMode|string; label?: any | { hideifdontfit?: boolean; format?: Function; location?: geotoolkit.controls.shapes.DonutChart.LabelLocation|string; direction?: geotoolkit.controls.shapes.DonutChart.LabelDirection|string; textstyle?: geotoolkit.attributes.TextStyle|string|any; } ; outsideline?: any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; length?: number; pad?: number; } ; sliceshift?: any | { offsets?: number[]; offset?: number; index?: number|any[]; } ; depth3d?: number; inclination3d?: number; } );
                /**
                 * Sets data to display. Sends {@link geotoolkit.scene.Node.Events.Changed} event at the end.
                 * @param data  (Required) data object
                 * @param data.mode  (Optional) data mode
                 * @param data.order  (Optional) data order
                 * @param data.values  (Optional) Array of values or associative object
                 */
                setData(data: any | { mode?: geotoolkit.controls.shapes.DonutChart.DataMode|string; order?: geotoolkit.controls.shapes.DonutChart.DataOrder|string; values?: any[]|geotoolkit.data.DataSeries|geotoolkit.data.DataSeriesView|any; } ): this;
                /**
                 * Gets display options
                 * (see {@link geotoolkit.controls.shapes.DonutChart.setOptions} for more info)
                 */
                getOptions(): any;
                /**
                 * Sets display options. Sends {@link geotoolkit.scene.Node.Events.Changed} event at the end.
                 * @param options  (Required) options object
                 * @param options.outerradius  (Optional) outer radius
                 * @param options.maxouterradius  (Optional) max outer radius
                 * @param options.innerradius  (Optional) inner radius
                 * @param options.piemode  (Optional) 2d- or 3d-representation
                 * @param options.startangle  (Optional) starting angle of the first slice drawn, in degrees
                 * @param options.direction  (Optional) slices' rendering direction
                 * @param options.fillstyles  (Optional) fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
                 * @param options.selected-fillstyles  (Optional) fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
                 * @param options.linestyle  (Optional) slice line style
                 * @param options.autogradient  (Optional) autogradient flag
                 * @param options.createselectedstyle  (Optional) method to create selected style based on "regular" one (used when "selected_fillstyles" not set explicitly)
                 * @param options.minpercentage  (Optional) minimum percentage cutoff for a slice before it becomes part of "other". 0 for no limit
                 * @param options.maxslices  (Optional) maximum amount of slices the graph can have including an "other" slice. 0 for infinite
                 * @param options.showpercentagesthreshold  (Optional) below this threshold (from 0 to 100) the percentage is not displayed
                 * @param options.modellimitsmode  (Optional) model limits mode
                 * @param options.label  (Optional) labeling options object
                 * @param options.label.hideifdontfit  (Optional) hide an inside label if it doesn't fit
                 * @param options.label.format  (Optional) label formatting method in form "function myLabelFormat(annotation, value) {...}" returning {string} value
                 * @param options.label.location  (Optional) label location
                 * @param options.label.direction  (Optional) label direction
                 * @param options.label.textstyle  (Optional) label text style
                 * @param options.outsideline  (Optional) outside line options object
                 * @param options.outsideline.linestyle  (Optional) outside line style
                 * @param options.outsideline.length  (Optional) outside line length
                 * @param options.outsideline.pad  (Optional) outside line pad
                 * @param options.sliceshift  (Optional) slice shift options object
                 * @param options.sliceshift.offsets  (Optional) slices shift offsets. Index in the array to match the index of slice
                 * @param options.sliceshift.offset  (Optional) deprecated (since 2.6) slice shift offset
                 * @param options.sliceshift.index  (Optional) deprecated (since 2.6) index (indices) of slices to shift
                 * @param options.depth3d  (Optional) height of a pseudo-3d chart
                 * @param options.inclination3d  (Optional) angle of the pseudo-3d chart. should be between 0 and 90
                 */
                setOptions(options: any | { outerradius?: number; maxouterradius?: number; innerradius?: number; piemode?: geotoolkit.controls.shapes.DonutChart.PieMode|string; startangle?: number; direction?: geotoolkit.controls.shapes.DonutChart.Direction|string; fillstyles?: any[]; "selected-fillstyles"?: any[]; linestyle?: geotoolkit.attributes.LineStyle|string|any; autogradient?: boolean; createselectedstyle?: Function; minpercentage?: number; maxslices?: number; showpercentagesthreshold?: number; modellimitsmode?: geotoolkit.controls.shapes.DonutChart.ModelLimitsMode|string; label?: any | { hideifdontfit?: boolean; format?: Function; location?: geotoolkit.controls.shapes.DonutChart.LabelLocation|string; direction?: geotoolkit.controls.shapes.DonutChart.LabelDirection|string; textstyle?: geotoolkit.attributes.TextStyle|string|any; } ; outsideline?: any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; length?: number; pad?: number; } ; sliceshift?: any | { offsets?: number[]; offset?: number; index?: number|any[]; } ; depth3d?: number; inclination3d?: number; } ): this;
                /**
                 * Enum defining PieMode
                 */
                static PieMode: any;
                /**
                 * Enum defining donut charts model limits mode
                 */
                static ModelLimitsMode: any;
                /**
                 * Enum defining DataMode
                 */
                static DataMode: any;
                /**
                 * Enum defining LabelLocation
                 */
                static LabelLocation: any;
                /**
                 * Enum defining LabelDirection
                 */
                static LabelDirection: any;
                /**
                 * Enum defining Direction
                 */
                static Direction: any;
                /**
                 * Enum defining Data Order Mode
                 */
                static DataOrder: any;
                /**
                 * Render to specified context
                 * @param context  (Required) Rendering Context
                 */
                renderContent(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Sets chart bounds
                 * @param rect  (Required) bounds
                 */
                setBounds(rect: geotoolkit.util.Rect): this;
                /**
                 * Check collision
                 * @param context  (Required) Rendering Context
                 */
                checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
                /**
                 * Sets chart model limits
                 * @param rect  (Required) model limits
                 */
                setModelLimits(rect: geotoolkit.util.Rect): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 */
                setProperties(properties: any): this;
                /**
                 * return the number of slices in the donut chart
                 */
                getSlicesCount(): number;
                /**
                 * return slice at specific index if it exist, null otherwise
                 * @param index  (Required) specified index to return the slice at
                 */
                getSliceByIndex(index: number): any;
                /**
                 * Select elements at specified canvas coordinates
                 * @param x  (Required) x-ordinate OR {x,y}-coordinates
                 * @param y  (Optional) y-ordinate
                 * @param highlight  (Optional) highlight selected elements
                 */
                selectSlicesAt(x: number|geotoolkit.util.Point, y?: number, highlight?: boolean): any[];
                /**
                 * Highlight specified slicess
                 * @param slices  (Required) array of slices' indices to highlight
                 * @param append  (Optional) append or replace flag
                 */
                highlightSlices(slices: any[], append?: boolean): this;
                /**
                 * Dispose DonutChart and its shapes
                 */
                dispose(): any;
            }
            /**
             * Tornado Chart
             */
            class TornadoChart extends geotoolkit.scene.shapes.Shape {
                /**
                 * Tornado Chart
                 * @param params  (Required) 
                 * @param params.left  (Optional) leftData
                 * @param params.right  (Optional) rightData
                 * @param params.bounds  (Optional) bounds for the chart
                 * @param params.leftfillstyle  (Optional) left fillstyle
                 * @param params.rightfillstyle  (Optional) right fillstyle
                 * @param params.linestyle  (Optional) center line style
                 * @param params.rightlinestyle  (Optional) right line style
                 * @param params.leftlinestyle  (Optional) left line style
                 * @param params.lefttextstyle  (Optional) left text style
                 * @param params.righttextstyle  (Optional) right text style
                 * @param params.spacing  (Optional) spacing
                 * @param params.autogradient  (Optional) autogradient
                 * @param params.sort  (Optional) sort mode
                 */
                constructor(params: any | { left?: any[]; right?: any[]; bounds?: geotoolkit.util.Rect; leftfillstyle?: geotoolkit.attributes.FillStyle|string|any; rightfillstyle?: geotoolkit.attributes.FillStyle|string|any; linestyle?: geotoolkit.attributes.LineStyle|string|any; rightlinestyle?: geotoolkit.attributes.LineStyle|string|any; leftlinestyle?: geotoolkit.attributes.LineStyle|string|any; lefttextstyle?: geotoolkit.attributes.TextStyle|string|any; righttextstyle?: geotoolkit.attributes.TextStyle|string|any; spacing?: number; autogradient?: boolean; sort?: geotoolkit.controls.shapes.TornadoChart.SortMode|string; } );
                /**
                 * Sort Mode
                 */
                static SortMode: any;
                /**
                 * /**
                 * Text placement
                 */
                static TextPlacement: any;
                /**
                 * This function is primarily used to set or change the left and right data of the tornado shape. The sort will work only if the left and right data is provided with it.
                 * If you want to only sort the data after creating the shape, then use the setSort() function instead.
                 * @param data  (Required) data object defining the data
                 * @param data.left  (Optional) leftData
                 * @param data.right  (Optional) rightData
                 * @param data.sort  (Optional) Determines if the data will be sorted or not.
                 */
                setData(data: any | { left?: any[]; right?: any[]; sort?: geotoolkit.controls.shapes.TornadoChart.SortMode|string; } ): this;
                /**
                 * private
                 */
                sortData(): any;
                /**
                 * gets the ticks and labels for the axis that will be attached via discrete value tick generator
                 */
                getTicksAndLabels(): any;
                /**
                 * set Auto Gradient
                 * @param autogradient  (Required) Autogradient on or off
                 */
                setAutoGradient(autogradient: boolean): this;
                /**
                 * get Auto Gradient
                 */
                getAutoGradient(): boolean;
                /**
                 * set spacing between bars
                 * @param spacing  (Required) spacing between bars
                 */
                setSpacing(spacing: number): this;
                /**
                 * get spacing percentage between bars
                 */
                getSpacing(): number;
                /**
                 * sets if we are drawing the labels
                 * @param draw  (Required) drawing the labels or not
                 */
                setDrawLabels(draw: boolean): this;
                /**
                 * gets if we are drawing the labels
                 */
                getDrawLabels(): boolean;
                /**
                 * sets the location of where the text will be rendered
                 * @param position  (Required) location or position of the text
                 */
                setLabelPosition(position: geotoolkit.controls.shapes.TornadoChart.TextPlacement|number): this;
                /**
                 * gets the location of where the text will be rendered
                 */
                getLabelPosition(): geotoolkit.controls.shapes.TornadoChart.TextPlacement|number;
                /**
                 * Get the internal data
                 * <pre>
                 */
                getData(): any[];
                /**
                 * Render TornadoChart shape
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): this;
                /**
                 * Sets right line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setRightLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Sets left line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setLeftLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Sets right fill style
                 * @param fillStyle  (Required) a new fill style
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setRightFillStyle(fillStyle: geotoolkit.attributes.FillStyle|string|any, merge?: boolean): this;
                /**
                 * Gets right line style
                 */
                getRightLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Gets left line style
                 */
                getLeftLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Gets right fill style
                 */
                getRightFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Gets left fill style
                 */
                getLeftFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Sets left fill style
                 * @param fillStyle  (Required) a new fill style
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setLeftFillStyle(fillStyle: geotoolkit.attributes.FillStyle|string|any, merge?: boolean): this;
                /**
                 * Sets left text style
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setLeftTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Sets right text style
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setRightTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Gets model limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Gets sort mode
                 */
                getSort(): geotoolkit.controls.shapes.TornadoChart.SortMode|string;
                /**
                 * Sets sort mode
                 * @param sort  (Required) sort mode
                 */
                setSort(sort: geotoolkit.controls.shapes.TornadoChart.SortMode|string): this;
                /**
                 * Returns current bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Sets bounds of the node in the parent coordinates
                 * @param bounds  (Required) bound of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{limits:geotoolkit.util.Rect;bounds:geotoolkit.util.Rect;lefttextstyle:geotoolkit.attributes.TextStyle;leftfillstyle:geotoolkit.attributes.FillStyle;leftlinestyle:geotoolkit.attributes.LineStyle;linestyle:geotoolkit.attributes.LineStyle;righttextstyle:geotoolkit.attributes.FillStyle;rightfillstyle:geotoolkit.attributes.FillStyle;rightlinestyle:geotoolkit.attributes.LineStyle;data:any[];autogradient:boolean;spacing:number;left:any[];right:any[];sort:geotoolkit.controls.shapes.TornadoChart.SortMode|string}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.limits  (Optional) modelLimits
                 * @param properties.bounds  (Optional) bounds
                 * @param properties.lefttextstyle  (Optional) left text style
                 * @param properties.leftfillstyle  (Optional) left fill style
                 * @param properties.leftlinestyle  (Optional) left lines style
                 * @param properties.linestyle  (Optional) center line style
                 * @param properties.righttextstyle  (Optional) right text style
                 * @param properties.rightlinestyle  (Optional) right line style
                 * @param properties.rightfillstyle  (Optional) right fill style
                 * @param properties.data  (Optional) data see {@link geotoolkit.controls.shapes.TornadoChart#setData}
                 * @param properties.autogradient  (Optional) autogradient
                 * @param properties.spacing  (Optional) spacing
                 * @param properties.left  (Optional) left data
                 * @param properties.right  (Optional) right data
                 * @param properties.sort  (Optional) sort mode
                 */
                setProperties(properties?: any | { limits?: geotoolkit.util.Rect; bounds?: geotoolkit.util.Rect; lefttextstyle?: geotoolkit.attributes.TextStyle|string|any; leftfillstyle?: geotoolkit.attributes.FillStyle|string|any; leftlinestyle?: geotoolkit.attributes.LineStyle|string|any; linestyle?: geotoolkit.attributes.LineStyle|string|any; righttextstyle?: geotoolkit.attributes.TextStyle|string|any; rightlinestyle?: geotoolkit.attributes.LineStyle|string|any; rightfillstyle?: geotoolkit.attributes.FillStyle|string|any; data?: any[]; autogradient?: boolean; spacing?: number; left?: any[]; right?: any[]; sort?: geotoolkit.controls.shapes.TornadoChart.SortMode|string; } ): this;
            }
            /**
             * A bar chart is a chart that uses either horizontal or vertical bars to show comparisons among categories. <br>
             * One axis of the chart shows the specific categories being compared, and the other axis represents a discrete value. <br>
             * Display Modes and Styles can be selected based on the Enum. <br>
             * geotoolkit.controls.shapes.BarChart is used internally by the {@link geotoolkit.widgets.BarChartWidget}
             */
            class BarChart extends geotoolkit.scene.Group {
                /**
                 * A bar chart is a chart that uses either horizontal or vertical bars to show comparisons among categories. <br>
                 * One axis of the chart shows the specific categories being compared, and the other axis represents a discrete value. <br>
                 * Display Modes and Styles can be selected based on the Enum. <br>
                 * geotoolkit.controls.shapes.BarChart is used internally by the {@link geotoolkit.widgets.BarChartWidget}
                 * @param options  (Required) (see "setOptions" method description for details)
                 * @param data  (Required) (see "setData" method description for details)
                 */
                constructor(options: any, data: any);
                /**
                 * Enum for BarChart.BarMode
                 */
                static BarMode: any;
                /**
                 * Enum for BarChart.DataMode
                 */
                static DataMode: any;
                /**
                 * Enum for BarChart.BarValueLocation
                 */
                static BarValueLocation: any;
                /**
                 * Enum for BarChart.Orientation
                 */
                static Orientation: any;
                /**
                 * Sets data to display
                 * @param data  (Required) data object
                 * @param data.append  (Optional) append/replace flag
                 * @param data.mode  (Optional) Data mode for the barchart
                 * @param data.datasets  (Optional) Array of Values for non-float and Array of Array(2) Values for float charts
                 */
                setData(data: any | { append?: boolean; mode?: geotoolkit.controls.shapes.BarChart.DataMode|string; datasets?: any[]; } ): any;
                /**
                 * Sets display options
                 * @param options  (Required) options object
                 * @param options.barstyles  (Optional) array of barstyles (see example below)
                 * @param options.valuelimits  (Optional) value limits parameters
                 * @param options.valuelimits.minvalue  (Optional) min value to set
                 * @param options.valuelimits.maxvalue  (Optional) max value to set
                 * @param options.neatlimits  (Optional) use neatlimits flag
                 * @param options.barvalues  (Optional) bar values parameters
                 * @param options.barvalues.visible  (Optional) bar values visibility flag
                 * @param options.barvalues.location  (Optional) bar values' label location
                 * @param options.barvalues.decimalprecision  (Optional) bar values decimal precision
                 * @param options.barvalues.rotationangle  (Optional) bar value labels rotation
                 * @param options.barvalues.margins  (Optional) margins options
                 * @param options.barvalues.margins.anchorx  (Optional) labels anchor x margin in pixels. This value will be added to anchor _before_ text rotation
                 * @param options.barvalues.margins.anchory  (Optional) labels anchor y margin in pixels. This value will be added to anchor _before_ text rotation
                 * @param options.barvalues.textstyle  (Optional) bar value text style
                 * @param options.orientation  (Optional) orientation of the chart
                 * @param options.barmode  (Optional) Bar display mode of the chart
                 * @param options.barwidth  (Optional) width of the bars
                 * @param options.barpad  (Optional) padding between the datasets
                 * @param options.autogradient  (Optional) enables auto gradient of the bars
                 * @param options.ismissingvalue  (Optional) missing value verification criteria; default is function(value){ return (value===null); }
                 * @param options.createselectedstyle  (Optional) method to create selected style based on "regular" one
                 */
                setOptions(options: any | { barstyles?: any[]; valuelimits?: any | { minvalue?: number|Function; maxvalue?: number|Function; } ; neatlimits?: boolean; barvalues?: any | { visible?: boolean; location?: geotoolkit.controls.shapes.BarChart.BarValueLocation|string; decimalprecision?: number; rotationangle?: number; margins?: any | { anchorx?: number; anchory?: number; } ; textstyle?: geotoolkit.attributes.TextStyle|string|any; } ; orientation?: geotoolkit.controls.shapes.BarChart.Orientation|string; barmode?: geotoolkit.controls.shapes.BarChart.BarMode|string; barwidth?: number; barpad?: number; autogradient?: boolean; ismissingvalue?: Function; createselectedstyle?: Function; } ): this;
                /**
                 * Calculates minimal neat limit based on input limits
                 * (see {@link geotoolkit.util.Math.calculateNeatLimits} for more info)
                 * @param minValue  (Required) min value to create neat limits from
                 * @param maxValue  (Required) max value to create neat limits from
                 */
                static getNeatMinValue(minValue: number, maxValue: number): number;
                /**
                 * Calculates maximal neat limit based on input limits
                 * (see {@link geotoolkit.util.Math.calculateNeatLimits} for more info)
                 * @param minValue  (Required) min value to create neat limits from
                 * @param maxValue  (Required) max value to create neat limits from
                 */
                static getNeatMaxValue(minValue: number, maxValue: number): number;
                /**
                 * Select elements at specified canvas coordinates
                 * @param x  (Required) x-ordinate OR {x,y}-coordinates
                 * @param y  (Optional) y-ordinate
                 * @param highlight  (Optional) highlight selected elements
                 */
                selectBarsAt(x: number|geotoolkit.util.Point, y?: number, highlight?: boolean): any[];
                /**
                 * Highlight specified bars
                 * @param bars  (Required) array of {@link geotoolkit.controls.data.SerieElementInfo} bars bars to highlight
                 * @param append  (Optional) append or replace flag
                 */
                highlightBars(bars: any[], append?: boolean): this;
                /**
                 * set format handler for labels
                 * @param handler  (Required) format handler
                 */
                setFormatLabelHandler(handler: Function): this;
                /**
                 * Render to specified context
                 * @param context  (Required) Rendering Context
                 */
                renderContent(context: geotoolkit.renderer.RenderingContext): any;
            }
            /**
             * Box plot is a convenient way of graphically depicting groups of numerical data
             * through their five-number summaries (the smallest observation, lower quartile (Q1), median (Q2), upper quartile (Q3), and largest observation).
             * One axis of the chart shows the specific categories being compared, and the other axis represents a discrete value. <br>
             * Display Modes and Styles can be selected based on the Enum. <br>
             */
            class BoxPlot extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * Box plot is a convenient way of graphically depicting groups of numerical data
                 * through their five-number summaries (the smallest observation, lower quartile (Q1), median (Q2), upper quartile (Q3), and largest observation).
                 * One axis of the chart shows the specific categories being compared, and the other axis represents a discrete value. <br>
                 * Display Modes and Styles can be selected based on the Enum. <br>
                 * @param options  (Required) (see "setOptions" method description for details)
                 * @param data  (Required) (see "setData" method description for details)
                 */
                constructor(options: any, data: any);
                /**
                 * Enum for BoxPlot.DataMode
                 */
                static DataMode: any;
                /**
                 * Enum for Boxplot.Orientation
                 */
                static Orientation: any;
                /**
                 * Enum for Boxplot.BoxValueLocation
                 */
                static BoxValueLocation: any;
                /**
                 * get the bounds of model
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Sets data to display
                 * @param data  (Optional) data object
                 * @param data.mode  (Optional) Data mode for the BoxPlot
                 * @param data.datasets  (Optional) Array of dataset, each item is an object containing property values and fillstyle
                 * @param data.datasets.values  (Optional) collection of values to be rendered
                 * @param data.datasets.fillstyle  (Optional) Array of fillstyle object for corresponding values.
                 * @param data.datasets.fillstyle.primaryfillstyle  (Optional) fillstyle for the box area between third quartile and median
                 * @param data.datasets.fillstyle.secondaryfillstyle  (Optional) fillstyle for the box area between first quartile and median
                 */
                setData(data?: any | { mode?: geotoolkit.controls.shapes.BoxPlot.DataMode; datasets?: any[]|any | { values?: any[]|geotoolkit.data.DataSource; fillstyle?: any[]|any | { primaryfillstyle?: geotoolkit.attributes.FillStyle|string|any; secondaryfillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; } ; } ): this;
                /**
                 * Sets display options
                 * @param options  (Optional) options object
                 * @param options.valuelimits  (Optional) value limits parameters
                 * @param options.valuelimits.minvalue  (Optional) min value to set
                 * @param options.valuelimits.maxvalue  (Optional) max value to set
                 * @param options.valuelimits.nearlimits  (Optional) neat limits flag
                 * @param options.boxvalues  (Optional) box values parameters
                 * @param options.boxvalues.visible  (Optional) box values visibility flag
                 * @param options.boxvalues.suppress  (Optional) enable label suppress when intersection
                 * @param options.boxvalues.location  (Optional) box values' label location
                 * @param options.boxvalues.verticalOffset  (Optional) box values' vertical offset from original position
                 * @param options.boxvalues.horizontaloffset  (Optional) box values' horizontal offset from original position
                 * @param options.boxvalues.decimalprecision  (Optional) box values decimal precision
                 * @param options.boxvalues.textstyle  (Optional) box value text style
                 * @param options.orientation  (Optional) orientation of the plot
                 * @param options.boxwidth  (Optional) width of the boxs
                 * @param options.boxpad  (Optional) padding between the box group (datasets)
                 * @param options.whiskersWidth  (Optional) width of whiskers (the line representing max and min value)
                 * @param options.boxwidthunit  (Optional) set unit for the width of box when using absolute width value
                 * @param options.fixedboxwidth  (Optional) set absolute value for the width of box
                 * @param options.linestyle  (Optional) linstyle of box plot
                 * @param options.connectedlinepattern  (Optional) pattern of connected line
                 * @param options.isoutliersvisible  (Optional) enable display of outliers
                 * @param options.ismissingvalue  (Optional) missing value verification criteria; default is function(value){ return (value===null); }
                 */
                setOptions(options?: any | { valuelimits?: any | { minvalue?: number; maxvalue?: number; nearlimits?: boolean; } ; boxvalues?: any | { visible?: boolean; suppress?: boolean; location?: geotoolkit.controls.shapes.BoxPlot.BoxValueLocation|string; verticalOffset?: number; horizontaloffset?: number; decimalprecision?: number; textstyle?: geotoolkit.attributes.TextStyle|string|any; } ; orientation?: geotoolkit.controls.shapes.BoxPlot.Orientation|string; boxwidth?: number; boxpad?: number; whiskersWidth?: number; boxwidthunit?: string; fixedboxwidth?: number; linestyle?: geotoolkit.attributes.LineStyle|string|any; connectedlinepattern?: number[]; isoutliersvisible?: boolean; ismissingvalue?: Function; } ): this;
                /**
                 * get orientation of boxes
                 */
                isHorizontal(): boolean;
                /**
                 * set model limits
                 * @param limits  (Required) current model limits
                 */
                setModelLimits(limits: geotoolkit.util.Rect): this;
                /**
                 * get model limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * return processed data sets
                 */
                getProcessedDatasets(): any[];
                /**
                 * calculate model unit width of each component based on the absolute value of box width
                 * @param context  (Required) rendering context
                 */
                calculateAbsWidth(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Render to specified context
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 */
                dispose(): any;
            }
            /**
             * A bubble chart is a variation of a scatter chart in which the data points are replaced with bubbles, <br>
             * and an additional dimension of the data is represented in the size of the bubbles. <br>
             * a bubble chart plots x values, y values, z (color) values and s (size) values. <br>
             * geotoolkit.controls.shapes.BubbleChart is used internally by the {@link geotoolkit.widgets.BubbleChart}.
             */
            class BubbleChart extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * A bubble chart is a variation of a scatter chart in which the data points are replaced with bubbles, <br>
                 * and an additional dimension of the data is represented in the size of the bubbles. <br>
                 * a bubble chart plots x values, y values, z (color) values and s (size) values. <br>
                 * geotoolkit.controls.shapes.BubbleChart is used internally by the {@link geotoolkit.widgets.BubbleChart}.
                 * @param data  (Required) 
                 * @param data.datax  (Optional) Data series x
                 * @param data.minx  (Optional) The x minimum to use, can be used to clip the data
                 * @param data.maxx  (Optional) The x maximum to use, can be used to clip the data
                 * @param data.autominmaxx  (Optional) automatically adjust x limit to contain all symbols in x axis direction without clipping anyone
                 * @param data.neatlimitx  (Optional) enable calculation of neat limit for series x
                 * @param data.datay  (Optional) Data series y
                 * @param data.miny  (Optional) The y minimum to use, can be used to clip the data
                 * @param data.maxy  (Optional) The y maximum to use, can be used to clip the data
                 * @param data.autominmaxy  (Optional) automatically adjust y limit to contain all symbols in  axis direction without clipping anyone
                 * @param data.neatlimity  (Optional) enable calculation of neat limit for series y
                 * @param data.datas  (Optional) Data series s
                 * @param data.mins  (Optional) The s minimum to use
                 * @param data.maxs  (Optional) The s maximum to use
                 * @param data.autominmaxs  (Optional) enable automatically calculate minimum and maximum of series s
                 * @param data.dataz  (Optional) Data series z
                 * @param data.minz  (Optional) The z minimum to use
                 * @param data.maxz  (Optional) The z maximum to use
                 * @param data.autominmaxz  (Optional) enable automatically calculate minimum and maximum of series z
                 * @param data.labels  (Optional) text value of labels
                 * @param data.lablelocation  (Optional) The relative location of label to bubble
                 * @param data.secondarylocation  (Optional) The relative location of label to bubble when first location is unable to show the label completely
                 * @param data.labeltextstyle  (Optional) the text style of labels
                 * @param data.labelpadding  (Optional) the padding between labels and bubble or view boundary
                 * @param data.labelvisible  (Optional) flag determine the visibility of labels
                 * @param data.validlength  (Optional) the min length of four data series
                 * @param data.minsize  (Optional) minimum size (side length of square) of symbol
                 * @param data.maxsize  (Optional) maximum size (side length of square) of symbol
                 * @param data.sizebin  (Optional) the number of bins for showing different degree of size, defaluat value is the number of items in data series
                 * @param data.cachewidthlimit  (Optional) the upper limit for the width of cache
                 * @param data.cacheheightlimit  (Optional) the upper limit for the height of cache
                 * @param data.colorprovider  (Optional) The colorProvider used to color points based on their Z value
                 * @param data.defaultcolor  (Optional) deprecated (since 2.6) The color to be used if there is no ColorProvider provided or if a point has no valid Z value
                 * @param data.defaultfillstyle  (Optional) The linestyle to be used to render symbol
                 * @param data.symbol  (Optional) The painter to draw symbols
                 * @param data.selectable  (Optional) determine if the shape is selectable
                 */
                constructor(data: any | { datax?: any[]; minx?: number; maxx?: number; autominmaxx?: boolean; neatlimitx?: boolean; datay?: any[]; miny?: number; maxy?: number; autominmaxy?: boolean; neatlimity?: boolean; datas?: any[]; mins?: number; maxs?: number; autominmaxs?: boolean; dataz?: any[]; minz?: number; maxz?: number; autominmaxz?: boolean; labels?: any[]; lablelocation?: string; secondarylocation?: string; labeltextstyle?: geotoolkit.attributes.TextStyle|string|any; labelpadding?: number; labelvisible?: boolean; validlength?: number; minsize?: number; maxsize?: number; sizebin?: number; cachewidthlimit?: number; cacheheightlimit?: number; colorprovider?: geotoolkit.util.ColorProvider; defaultcolor?: string; defaultfillstyle?: string|any|geotoolkit.attributes.LineStyle; symbol?: any; selectable?: boolean; } );
                /**
                 * Enum for Boxplot.BoxValueLocation
                 */
                static LabelLocation: any;
                /**
                 * Get data
                 * @param ignoreFixedLimit  (Required) if it is true, return real limit for each axis, otherwise return fixed limit
                 * @param ignoreAutoLimit  (Required) ignore the auto limits
                 */
                getData(ignoreFixedLimit: boolean, ignoreAutoLimit: boolean): {data:{datax:any[];minx:number;maxx:number;autominmaxx:boolean;neatlimitx:boolean;datay:any[];miny:number;maxy:number;autominmaxy:boolean;neatlimity:boolean;datas:any[];mins:number;maxs:number;autominmaxs:boolean;dataz:any[];minz:number;maxz:number;labels:any[];lablelocation:string;secondarylocation:string;labeltextstyle:geotoolkit.attributes.TextStyle;labelpadding:number;laabelvisible:boolean;validlength:number;minsize:number;maxsize:number;colorprovider:geotoolkit.util.ColorProvider;defaultcolor:string;defaultfillstyle:geotoolkit.attributes.FillStyle;defaultlinestyle:geotoolkit.attributes.LineStyle;symbol:any}}|any;
                /**
                 * Add values to chart
                 * @param amount  (Required) the amount of added values
                 */
                addData(amount: number): any;
                /**
                 * remove data from chart
                 * @param from  (Required) index where starting remove
                 * @param amount  (Required) amount of data to be removed
                 */
                removeData(from: number, amount: number): any;
                /**
                 * Set the real bounds (real size in pixel) for chart
                 * @param parentbounds  (Required) bounds of the chart in pixel
                 */
                setParentBounds(parentbounds: geotoolkit.util.Rect): this;
                /**
                 * Get the real bounds of chart in pixel
                 */
                getParentBounds(): geotoolkit.util.Rect;
                /**
                 * Set the bounds of the chart in model unit
                 * @param bounds  (Required) bounds of the chart in model unit
                 */
                setBounds(bounds: geotoolkit.util.Rect): boolean;
                /**
                 * Get the bounds of the chart in model unit
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Update the model bounds
                 * @param parentbounds  (Required) bounds of parent node
                 * @param start  (Required) the starting index for incrementally calculating new model bounds
                 * @param end  (Required) the ending index for incrementally calculating new model bounds
                 */
                updateLimits(parentbounds: geotoolkit.util.Rect, start: number, end: number): any;
                /**
                 * Initialize the cache for better rending performance
                 */
                initializeCache(): any;
                /**
                 * Invalidate cache for rebuilding cache before rendering
                 */
                invalidateCache(): any;
                /**
                 * Set the status of covering rectangle
                 * @param active  (Optional) enable rectangle for covering model space when doing selection
                 */
                setActive(active?: boolean): any;
                /**
                 * Render to specified context
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * determine symbol color and size
                 * @param i  (Required) index of data item
                 * @param localContext  (Required) Rendering Context
                 * @param tr  (Required) transformation
                 */
                preDrawSymbols(i: number, localContext: geotoolkit.renderer.RenderingContext, tr: geotoolkit.util.Transformation): any;
                /**
                 * render labels
                 * @param context  (Required) Rendering Context
                 */
                renderText(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * get selected symbols
                 * @param area  (Required) selected area
                 * @param context  (Required) Rendering Context
                 */
                getIndicesAt(area: geotoolkit.util.Rect|geotoolkit.util.Polygon, context: geotoolkit.renderer.RenderingContext): any[];
            }
            /**
             * Defines a 2D heatmap, A heat map  is a graphical representation
             * of data where the individual values contained in a matrix are represented as colors
             */
            class HeatMap extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * Defines a 2D heatmap, A heat map  is a graphical representation
                 * of data where the individual values contained in a matrix are represented as colors
                 * @param data  (Required) the data source
                 * @param options  (Required) ( see {@link geotoolkit.controls.shapes.HeatMap.setOptions} method description for details)
                 */
                constructor(data: geotoolkit.data.DataTable|geotoolkit.data.DataTableView|number[][], options: any);
                /**
                 * Enum of Plotting types
                 */
                static PlotType: any;
                /**
                 * Get model limit
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Set model bounds
                 * @param bounds  (Required) model bounds
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Get model bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Set options of heatmap
                 * @param options  (Required) options
                 * @param options.colplottype  (Optional) plot type of column
                 * @param options.rowplottype  (Optional) plot type of row
                 * @param options.min  (Optional) minimum value limit in data source
                 * @param options.max  (Optional) maximum value limit in data source
                 * @param options.offsetx  (Optional) offset of x axis
                 * @param options.offsety  (Optional) offset of y axis
                 * @param options.keepmodellimits  (Optional) flag to keep model limits
                 * @param options.colorprovider  (Optional) color provider for rendering heatmap
                 */
                setOptions(options: any | { colplottype?: geotoolkit.controls.shapes.HeatMap.PlotType; rowplottype?: geotoolkit.controls.shapes.HeatMap.PlotType; min?: number; max?: number; offsetx?: number; offsety?: number; keepmodellimits?: boolean; colorprovider?: geotoolkit.util.ColorProvider; } ): this;
                /**
                 * Get options of heatmap
                 */
                getOptions(): {options:{colplottype:geotoolkit.controls.shapes.HeatMap.PlotType;rowplottype:geotoolkit.controls.shapes.HeatMap.PlotType;min:number;max:number;offsetx:number;offsety:number;keepmodellimits:boolean;colorprovider:geotoolkit.util.ColorProvider};labels:{visible:boolean};textstyle:geotoolkit.attributes.TextStyle}|any;
                /**
                 * set if keep model limit of shape when setting offset property
                 * @param iskeepmodellimits  (Required) set if keep model limits when offsetting heatmap
                 */
                setKeepModelLimits(iskeepmodellimits: boolean): this;
                /**
                 * get keep model limits property
                 */
                isKeepModelLimits(): boolean;
                /**
                 * set x and y offset seperately
                 * @param offsetx  (Required) offsets for each column
                 * @param offsety  (Required) offsets for each row
                 */
                setModelOffset(offsetx: number|number[], offsety: number|number[]): this;
                /**
                 * get offset x and y
                 */
                getModelOffset(): {offset:any;object:{offsetx:number|number[];offsety:number|number[]}}|any;
                /**
                 * set min and max value limit
                 * @param min  (Required) customized min value
                 * @param max  (Required) customized max value
                 */
                setMinMax(min: number, max: number): this;
                /**
                 * Set color provider
                 * @param colorProvider  (Required) the color provider
                 */
                setColorProvider(colorProvider: geotoolkit.util.ColorProvider): this;
                /**
                 * Gets color provider
                 */
                getColorProvider(): any|geotoolkit.util.ColorProvider;
                /**
                 * Set plot mode of column
                 * @param type  (Required) plot type
                 */
                setColPlotMode(type: geotoolkit.controls.shapes.HeatMap.PlotType): this;
                /**
                 * get plot mode of column
                 */
                getColumnPlotMode(): geotoolkit.controls.shapes.HeatMap.PlotType;
                /**
                 * Set plot mode of row
                 * @param type  (Required) plot type
                 */
                setRowPlotMode(type: geotoolkit.controls.shapes.HeatMap.PlotType): this;
                /**
                 * get plot mode of row
                 */
                getRowPlotMode(): geotoolkit.controls.shapes.HeatMap.PlotType;
                /**
                 * Set data source
                 * @param data  (Required) the data source
                 */
                setData(data: geotoolkit.data.DataTable|geotoolkit.data.DataTableView|number[][]): this;
                /**
                 * rendering method
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * draw labels
                 * @param context  (Required) rendering context
                 */
                drawLabels(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * set the visibility of labels
                 * @param visible  (Required) the flag to set the visibility of labels
                 */
                setLabelsVisible(visible: boolean): this;
                /**
                 * return the visibility of labels
                 */
                isLabelsVisible(): boolean;
                /**
                 * set textstyle for labels
                 * @param textstyle  (Required) textstyle for labels
                 */
                setLabelsTextStyle(textstyle: geotoolkit.attributes.TextStyle|string|any): this;
                /**
                 * return textstyle of labels
                 */
                getLabelsTextStyle(): geotoolkit.attributes.TextStyle;
                /**
                 * hit test return point in model space
                 * @param pt  (Required) point in device space
                 */
                hitTest(pt: geotoolkit.util.Point): geotoolkit.util.Point|any;
                /**
                 */
                dispose(): any;
            }
            /**
             * This class defines the PieChart object. Pie Chart is the kind of diagram that displays data as a “pie”. Every data item in data source represents a “piece of pie” - slice.<br>
             * The doughnut and pie charts are generally equal but  pie chart does not have a hole in the center so extra parameter - inner radius is always equal to '0'.
             */
            class PieChart extends geotoolkit.controls.shapes.DonutChart {
                /**
                 * This class defines the PieChart object. Pie Chart is the kind of diagram that displays data as a “pie”. Every data item in data source represents a “piece of pie” - slice.<br>
                 * The doughnut and pie charts are generally equal but  pie chart does not have a hole in the center so extra parameter - inner radius is always equal to '0'.
                 * @param options  (Optional) options object
                 * @param options.outerradius  (Optional) outer radius
                 * @param options.innerradius  (Optional) inner radius
                 * @param options.piemode  (Optional) 2d- or 3d-representation
                 * @param options.startangle  (Optional) starting angle of the first slice drawn, in degrees
                 * @param options.direction  (Optional) slices' rendering direction
                 * @param options.fillstyles  (Optional) fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
                 * @param options.selected-fillstyles  (Optional) fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
                 * @param options.linestyle  (Optional) slice line style
                 * @param options.autogradient  (Optional) autogradient flag
                 * @param options.createselectedstyle  (Optional) method to create selected style based on "regular" one (used when "selected_fillstyles" not set explicitly)
                 * @param options.minpercentage  (Optional) minimum percentage cutoff for a slice before it becomes part of "other". 0 for no limit
                 * @param options.maxslices  (Optional) maximum amount of slices the graph can have including an "other" slice. 0 for infinite
                 * @param options.label  (Optional) labeling options object
                 * @param options.label.hideifdontfit  (Optional) hide an inside label if it doesn't fit
                 * @param options.label.format  (Optional) label formatting method in form "function myLabelFormat(annotation, value) {...}" returning {string} value
                 * @param options.label.location  (Optional) label location
                 * @param options.label.textstyle  (Optional) label text style
                 * @param options.outsideline  (Optional) outside line options object
                 * @param options.outsideline.linestyle  (Optional) outside line style
                 * @param options.outsideline.length  (Optional) outside line length
                 * @param options.outsideline.pad  (Optional) outside line pad
                 * @param options.sliceshift  (Optional) slice shift options object
                 * @param options.sliceshift.offsets  (Optional) slices shift offsets. Index in the array to match the index of slice
                 * @param options.sliceshift.offset  (Optional) deprecated (since 2.6) slice shift offset
                 * @param options.sliceshift.index  (Optional) deprecated (since 2.6) index (indices) of slices to shift
                 * @param data  (Optional) data object
                 * @param data.mode  (Optional) data mode
                 * @param data.order  (Optional) data order
                 * @param data.values  (Optional) Array of values
                 */
                constructor(options?: any | { outerradius?: number; innerradius?: number; piemode?: geotoolkit.controls.shapes.DonutChart.PieMode|string; startangle?: number; direction?: geotoolkit.controls.shapes.DonutChart.Direction|string; fillstyles?: any[]; "selected-fillstyles"?: any[]; linestyle?: geotoolkit.attributes.LineStyle|string|any; autogradient?: boolean; createselectedstyle?: Function; minpercentage?: number; maxslices?: number; label?: any | { hideifdontfit?: boolean; format?: Function; location?: geotoolkit.controls.shapes.DonutChart.LabelLocation|string; textstyle?: geotoolkit.attributes.TextStyle|string|any; } ; outsideline?: any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; length?: number; pad?: number; } ; sliceshift?: any | { offsets?: any; offset?: number; index?: number|any[]; } ; } , data?: any | { mode?: geotoolkit.controls.shapes.DonutChart.DataMode|string; order?: geotoolkit.controls.shapes.DonutChart.DataOrder|string; values?: any[]; } );
                /**
                 * Sets display options.
                 * The implementation keeps 'innerradius' equal to '0' always.
                 * @param options  (Required) options object (see {@link geotoolkit.controls.shapes.DonutChart.setOptions} for more info)
                 */
                setOptions(options: any): this;
            }
            /**
             * Defines a radar(spider) chart. The data points in the dataset are drawn around the chart. The value of each point in the dataset is represented as the distance from the center of the chart. The center of the chart represents the minimum value and the chart edge represents the maximum value. Grid lines, which typically represents the Y axis, are displayed by default to represent values from the center of the chart to the perimeter.
             *  The X axis is plotted along the perimeter using the data category variables <br>
             */
            class RadarChart extends geotoolkit.scene.shapes.RectangularShape {
                /**
                 * Defines a radar(spider) chart. The data points in the dataset are drawn around the chart. The value of each point in the dataset is represented as the distance from the center of the chart. The center of the chart represents the minimum value and the chart edge represents the maximum value. Grid lines, which typically represents the Y axis, are displayed by default to represent values from the center of the chart to the perimeter.
                 *  The X axis is plotted along the perimeter using the data category variables <br>
                 * @param options  (Optional) 
                 * @param options.center  (Optional) a center of the polar chart
                 * @param options.outerradius  (Optional) a radius of the polar chart
                 * @param options.linestyle  (Optional) line style to specify style for outer circle
                 * @param options.modelradius  (Optional) radius of the polar chart in the model coordinates
                 * @param options.startangle  (Optional) a start angle to be used for 0 angle (by default it is E direction)
                 * @param options.gridlines  (Optional) gridlines properties
                 * @param options.gridlines.linestyle  (Optional) line style
                 * @param options.gridlines.step  (Optional) step by radius in model coordinates
                 * @param options.gridlines.visible  (Optional) visibility of radius grid
                 * @param options.categories  (Optional) define options of the categories
                 * @param options.categories.linestyle  (Optional) line style
                 * @param options.categories.textstyle  (Optional) labels style
                 * @param options.categories.data  (Optional) data that is the names of the categories to rate
                 * @param options.categories.labelsalongcircumference  (Optional) lables drawn along outer circumfrance
                 * @param options.content  (Optional) content that defines the polygons in the chart
                 * @param options.content.linestyle  (Optional) line style
                 * @param options.content.fillstyle  (Optional) fill style
                 * @param options.content.name  (Optional) name of the item
                 * @param options.content.data  (Optional) data to show on the chart
                 */
                constructor(options?: any | { center?: geotoolkit.util.Point; outerradius?: number; linestyle?: geotoolkit.attributes.LineStyle|any; modelradius?: number; startangle?: number; gridlines?: any | { linestyle?: geotoolkit.attributes.LineStyle|any; step?: number; visible?: boolean; } ; categories?: any | { linestyle?: geotoolkit.attributes.LineStyle|any; textstyle?: geotoolkit.attributes.TextStyle|any; data?: string[]; labelsalongcircumference?: boolean; } ; content?: any[]|any | { linestyle?: geotoolkit.attributes.LineStyle|any; fillstyle?: geotoolkit.attributes.FillStyle|any; name?: string; data?: number[]|geotoolkit.data.NumericalDataSeries; } ; } );
                /**
                 * Set options
                 * @param options  (Required) options
                 * @param options.center  (Required) a center of the polar chart
                 * @param options.outerradius  (Optional) a radius of the polar chart
                 * @param options.linestyle  (Optional) line style to specify style for outer circle
                 * @param options.modelradius  (Optional) radius of the polar chart in the model coordinates
                 * @param options.startangle  (Optional) a start angle to be used for 0 angle (by default it is E direction)
                 * @param options.gridlines  (Optional) gridlines properties
                 * @param options.gridlines.linestyle  (Optional) line style
                 * @param options.gridlines.step  (Optional) step by radius in model coordinates
                 * @param options.gridlines.visible  (Optional) visibility of radius grid
                 * @param options.categories  (Optional) define options of the categories
                 * @param options.categories.linestyle  (Optional) line style
                 * @param options.categories.textstyle  (Optional) labels style
                 * @param options.categories.data  (Optional) data that is the names of the categories to rate
                 * @param options.categories.labelsalongcircumference  (Optional) lables drawn along outer circumfrance
                 * @param options.content  (Optional) content that defines the polygons in the chart
                 * @param options.content.linestyle  (Optional) line style
                 * @param options.content.fillstyle  (Optional) fill style
                 * @param options.content.name  (Optional) name of the item
                 * @param options.content.data  (Optional) data to show on the chart
                 * @param refresh  (Optional) invalidate the shape
                 */
                setOptions(options: any | { center?: geotoolkit.util.Point; outerradius?: number; linestyle?: geotoolkit.attributes.LineStyle|any; modelradius?: number; startangle?: number; gridlines?: any | { linestyle?: geotoolkit.attributes.LineStyle|any; step?: number; visible?: boolean; } ; categories?: any | { linestyle?: geotoolkit.attributes.LineStyle|any; textstyle?: geotoolkit.attributes.TextStyle|any; data?: string[]; labelsalongcircumference?: boolean; } ; content?: any[]|any | { linestyle?: geotoolkit.attributes.LineStyle|any; fillstyle?: geotoolkit.attributes.FillStyle|any; name?: string; data?: number[]|geotoolkit.data.NumericalDataSeries; } ; } , refresh?: boolean): this;
                /**
                 * Return option to be used to draw a grid
                 */
                getOptions(): {options:{center:geotoolkit.util.Point;outerradius:number;linestyle:geotoolkit.attributes.LineStyle|any;modelradius:number;startangle:number;gridlines:{linestyle:geotoolkit.attributes.LineStyle|any;step:number;visible:boolean};categories:{linestyle:geotoolkit.attributes.LineStyle|any;textstyle:geotoolkit.attributes.TextStyle|any;data:string[];labelsalongcircumference:boolean};content:{linestyle:geotoolkit.attributes.LineStyle|any;fillstyle:geotoolkit.attributes.FillStyle|any;name:string;data:number[]|geotoolkit.data.NumericalDataSeries}};refresh:boolean}|any;
                /**
                 * Convert model radius to outer radius
                 * @param value  (Required) value of the outer raidus
                 */
                modelToOuterRadius(value: number): number;
                /**
                 * set the content for this shape
                 * @param content  (Optional) content that defines the polygons in the chart
                 * @param content.linestyle  (Optional) line style
                 * @param content.fillstyle  (Optional) fill style
                 * @param content.name  (Optional) name of the item
                 * @param content.data  (Optional) data to show on the chart
                 */
                setContent(content?: any[]|any | { linestyle?: geotoolkit.attributes.LineStyle|any; fillstyle?: geotoolkit.attributes.FillStyle|any; name?: string; data?: number[]|geotoolkit.data.NumericalDataSeries; } ): this;
                /**
                 * get the content for this shape
                 */
                getContent(): any[];
                /**
                 * Render contents of the crossplot shape
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * @param context  (Required) Rendering Context
                 */
                renderContent(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Render angle axis
                 * @param context  (Required) Rendering Context
                 */
                drawLabels(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Render angle text horizontally
                 * @param context  (Required) Rendering Context
                 */
                drawAngleAxisRegular(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Render angle text along circumference
                 * @param context  (Required) Rendering Context
                 */
                drawAngleAxisAlongCircumference(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Convert point from polar to cartesian coordinate system. the center is int e
                 * @param r  (Required) radius
                 * @param theta  (Required) angle in grad
                 */
                polarToCartesian(r: number, theta: number): geotoolkit.util.Point;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.options  (Optional) options to set see {@link geotoolkit.controls.shapes.RadarChart#setOptions}
                 */
                setProperties(properties: any | { options?: any; } ): this;
            }
            /**
             * <pre>
             * Treemap allows visualization of hierarchical data using nested rectangles.
             * Each branch of the tree is displayed as rectangle. Area of rectangle is proportional to specified dimension of data.
             * e.g. Array of datasets object provided to Treemap <b> must contain 'value' property </b>. It can be initialized following ways:
             * 1. datasets object containing value only:
             *    var data = [{'value' : 6}, {'value': 4}, {'value': 1}, {'value': 3}];
             * 2. datasets object can also have optional properties 'name': name of the node, 'color': color of the node, 'level': children of the node(datasets object)
             *    var data =
             *        [
             *          {'value': 6, 'name': 'A', 'level': [
             *              {'value': 6, 'color': 'orange', 'name': 'A1'},
             *              {'value': 6, 'color': 'orange', 'name': 'A2'},
             *              {'value': 4, 'color': 'orange', 'name': 'A3'},
             *              {'value': 3, 'color': 'orange', 'name': 'A4'}
             *          ]},
             *          {'value': 5, 'color': 'red', 'name': 'B'},
             *          {'value': 7, 'color': 'yellow', 'name': 'C'},
             *          {'value': 3, 'color': 'green', 'name': 'D'}
             *       ];
             * </pre>
             */
            class Treemap extends geotoolkit.scene.shapes.RectangularShape {
                /**
                 * <pre>
                 * Treemap allows visualization of hierarchical data using nested rectangles.
                 * Each branch of the tree is displayed as rectangle. Area of rectangle is proportional to specified dimension of data.
                 * e.g. Array of datasets object provided to Treemap <b> must contain 'value' property </b>. It can be initialized following ways:
                 * 1. datasets object containing value only:
                 *    var data = [{'value' : 6}, {'value': 4}, {'value': 1}, {'value': 3}];
                 * 2. datasets object can also have optional properties 'name': name of the node, 'color': color of the node, 'level': children of the node(datasets object)
                 *    var data =
                 *        [
                 *          {'value': 6, 'name': 'A', 'level': [
                 *              {'value': 6, 'color': 'orange', 'name': 'A1'},
                 *              {'value': 6, 'color': 'orange', 'name': 'A2'},
                 *              {'value': 4, 'color': 'orange', 'name': 'A3'},
                 *              {'value': 3, 'color': 'orange', 'name': 'A4'}
                 *          ]},
                 *          {'value': 5, 'color': 'red', 'name': 'B'},
                 *          {'value': 7, 'color': 'yellow', 'name': 'C'},
                 *          {'value': 3, 'color': 'green', 'name': 'D'}
                 *       ];
                 * </pre>
                 * @param options  (Required) (see "setOptions" method description for details)
                 * @param data  (Required) (see "setData" method description for details)
                 */
                constructor(options: any, data: any);
                /**
                 * Enum for Treemap.LayoutMode
                 */
                static LayoutMode: any;
                /**
                 * Enum for Treemap.NodeValueLocation
                 */
                static NodeValueLocation: any;
                /**
                 * Treemap Event's enumerator
                 */
                static Events: any;
                /**
                 * Set Layout mode of Treemap
                 * @param mode  (Required) LayoutMode fore the Treemap
                 */
                setLayoutMode(mode: geotoolkit.controls.shapes.Treemap.LayoutMode): this;
                /**
                 * Returns LayoutMode selection
                 */
                getLayoutMode(): geotoolkit.controls.shapes.Treemap.LayoutMode|number;
                /**
                 * Sets data to display
                 * @param data  (Optional) data object
                 * @param data.datasets  (Optional) Array of dataset
                 * @param data.mode  (Optional) LayoutMode fore the Treemap
                 */
                setData(data?: any | { datasets?: any[]; mode?: geotoolkit.controls.shapes.Treemap.LayoutMode; } ): any;
                /**
                 * Get data on treemap
                 */
                getData(): {data:{mode:geotoolkit.controls.shapes.Treemap.LayoutMode;datasets:any[]}}|any;
                /**
                 * Update Dataset
                 * @param datasets  (Optional) Array of dataset
                 */
                updateDataSets(datasets?: any[]): any;
                /**
                 * set display options
                 * @param options  (Optional) options object
                 * @param options.nodevalues  (Optional) node values parameters
                 * @param options.nodevalues.visible  (Optional) node values visibility flags
                 * @param options.nodevalues.location  (Optional) node values' label location
                 * @param options.nodevalues.textstyle  (Optional) node values' label text style
                 * @param options.linestyle  (Optional) Treemap node linestyle
                 * @param options.fillstyle  (Optional) Treemap node fillstyle
                 */
                setOptions(options?: any | { nodevalues?: any | { visible?: boolean; location?: geotoolkit.controls.shapes.Treemap.NodeValueLocation; textstyle?: geotoolkit.attributes.TextStyle|string|any; } ; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ): this;
                /**
                 * Returns options pertaining nodevalues.
                 */
                getOptions(): any;
                /**
                 * Render to specified context
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * It will return array of id specified by name.
                 * @param name  (Required) name of node
                 */
                lookUpForIdByName(name: string): any[];
                /**
                 * Returns Array of Rectangles in which the pointer is including it's ancestors.
                 * @param pt  (Required) pt is the device coordinates received by mouse event
                 */
                hitTest(pt: geotoolkit.util.Point): geotoolkit.util.Rect[];
                /**
                 * Display parent level or children level of id. If goToParent is set to true it will display it's parent level.
                 * @param id  (Required) id of node
                 * @param goToParent  (Optional) Whether to display parent or children level
                 */
                showLevel(id: number, goToParent?: boolean): any;
                /**
                 * It will display the Parent level at specific distance
                 * @param distance  (Required) distance From Current Level
                 */
                showParentLevelAtDistance(distance: number): any;
            }
            /**
             * Define a callout shape
             */
            class Callout extends geotoolkit.scene.shapes.AnchoredShape {
                /**
                 * Define a callout shape
                 * @param target  (Required) target point
                 * @param anchor  (Required) anchor point
                 * @param frame  (Required) callout frame
                 * @param alignment  (Required) alignment
                 * @param sizeIsInDeviceSpace  (Required) is size is in device frame
                 * @param text  (Required) callout text
                 * @param textStyle  (Required) callout text style
                 */
                constructor(target: geotoolkit.util.Point, anchor: geotoolkit.util.Point|number, frame: geotoolkit.util.Rect, alignment: number, sizeIsInDeviceSpace: boolean, text: string, textStyle: geotoolkit.attributes.TextStyle|string|any);
                /**
                 * Check if inside context
                 * @param context  (Required) context
                 */
                checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
                /**
                 * Sets target point to specified coordinates.
                 * @param x  (Required) x-ordinate
                 * @param y  (Required) y-ordinate
                 */
                setTarget(x: number, y: number): this;
                /**
                 * Gets style attribute for the text.
                 */
                getTextStyle(): geotoolkit.attributes.TextStyle;
                /**
                 * Sets text's style
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setTextStyle(textStyle: geotoolkit.attributes.TextStyle|string|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Sets text
                 * @param text  (Required) text
                 */
                setText(text: string): this;
                /**
                 * Gets text
                 */
                getText(): string;
                /**
                 * Set border radius to specified coordinates.
                 * @param rx  (Required) x-axis border radius
                 * @param ry  (Required) y-axis border radius
                 */
                setBorderRadius(rx: number, ry: number): this;
                /**
                 * Render
                 * @param context  (Required) context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
            }
            /**
             * Pyramid Chart reflects an hierarchical way of representing the data.
             * It divides the whole triangle into number of sections.
             * Size of each section is a percentage of data contributing with respect to the whole height.<br>
             * It takes arrays of Label names and its values.<br>
             * It provides options for fillstyle , Alignment , Invert.<br>
             */
            class PyramidChart extends geotoolkit.scene.CompositeNode {
                /**
                 * Pyramid Chart reflects an hierarchical way of representing the data.
                 * It divides the whole triangle into number of sections.
                 * Size of each section is a percentage of data contributing with respect to the whole height.<br>
                 * It takes arrays of Label names and its values.<br>
                 * It provides options for fillstyle , Alignment , Invert.<br>
                 * @param data  (Required) 
                 * @param data.name  (Optional) Array of label names.
                 * @param data.value  (Optional) Array of values corresponding to the label names.
                 * @param data.bounds  (Optional) Bounds to draw pyramid, can specify if necessary.
                 * @param data.fillstyle  (Optional) Array of fill styles objects for each section.
                 * @param data.invert  (Optional) Creates a regular pyramid, when set true inverts the shape.
                 * @param data.align  (Optional) This is the preference to have labels at "right" or "left" for every section
                 * @param data.linestyle  (Optional) to change the color of lines pointing to the label for all sections.
                 * @param data.border  (Optional) to change the border color for each section section.
                 * @param data.linelength  (Optional) To specify length of the line pointing the labels.
                 * @param data.highlight  (Optional) highlights each section of the chart, when set false it does not show any highlight feature.
                 * @param data.highlightstyle  (Optional) to change fillstyle of the highlighting shape, should be Rgba color object
                 */
                constructor(data: any | { name?: string[]; value?: number[]; bounds?: geotoolkit.util.Rect; fillstyle?: geotoolkit.attributes.FillStyle[]; invert?: boolean; align?: string; linestyle?: geotoolkit.attributes.LineStyle[]; border?: geotoolkit.attributes.LineStyle[]; linelength?: number; highlight?: boolean; highlightstyle?: geotoolkit.util.RgbaColor|string; } );
                /**
                 * setData takes all the input and feeds it to the chart drawn
                 * @param data  (Required) data
                 */
                setData(data: any): this;
                /**
                 * sets all properties related to the chart
                 * @param properties  (Required) properties
                 * @param properties.fillstyle  (Optional) Array of fill styles objects for each section.
                 * @param properties.linestyle  (Optional) to change the color of lines pointing to the label for all sections.
                 * @param properties.border  (Optional) to change the border color for each section section.
                 * @param properties.align  (Optional) This is the preference to have labels at "right" or "left" for every section
                 * @param properties.invert  (Optional) Creates a regular pyramid, when set true inverts the shape.
                 * @param properties.linelength  (Optional) To specify length of the line pointing the labels.
                 * @param properties.highlight  (Optional) highlights each section of the chart, when set false it does not show any highlight feature.
                 * @param properties.highlightstyle  (Optional) to change fillstyle of the highlighting shape, should be Rgba color object
                 */
                setProperties(properties: any | { fillstyle?: geotoolkit.attributes.FillStyle[]; linestyle?: geotoolkit.attributes.LineStyle[]; border?: geotoolkit.attributes.LineStyle[]; align?: string; invert?: boolean; linelength?: number; highlight?: boolean; highlightstyle?: geotoolkit.util.RgbaColor|string; } ): this;
                /**
                 * gets any property of the chart
                 */
                getProperties(): any;
                /**
                 * Get data
                 */
                getData(): {data:{name:string[];value:number[];bounds:geotoolkit.util.Rect;fillstyle:geotoolkit.attributes.FillStyle[];invert:boolean;align:string;linestyle:geotoolkit.attributes.LineStyle[];linelength:number;highlight:boolean;highlightstyle:geotoolkit.util.RgbaColor}}|any;
                /**
                 * Gets model limits, the limits of this groups inside space
                 */
                getModelLimits(): geotoolkit.util.Rect|any;
                /**
                 * Sets inner model limits
                 * @param limits  (Required) inner limits
                 */
                setModelLimits(limits: geotoolkit.util.Rect): this;
                /**
                 * Returns the name and value represented by the section which is
                 * referenced by the index provided.
                 * @param index  (Required) The index of the section
                 */
                getSectionInfo(index: number): {info:{name:string;value:number}}|any;
                /**
                 * Highlights the shape specified by the index and with the choice you can set it false too.
                 * @param index  (Required) of the section to be highlighted
                 */
                highlight(index: number): this;
                /**
                 * Performs selection of the node with its device coordinates
                 * @param pt  (Required) is the device coordinates received by mouse event
                 * @param radius  (Required) [radius =5] is the radius of selection
                 */
                hitTest(pt: geotoolkit.util.Point, radius: number): number;
            }
            /**
             * This class defines a legend container in which legends items are laid out using specified layout.
             * Items can be located in the legend vertically using geotoolkit.layout.VerticalPriorityLayout() or
             * horizontally using geotoolkit.layout.HorizontalPriorityLayout() or in any location inside the legend with other layout or manually.
             * The legend has an anchor position in the parent coordinates and width and height of the legend in model
             * or device coordinates. This position can be specified with setAnchor method and size with setSize method. In addition
             * it is possible to use automatic calculation of the legend size, which is supported for device size legend only.
             * Legends can be customized using setOptions().
             */
            class Legend extends geotoolkit.scene.shapes.AnchoredShape {
                /**
                 * This class defines a legend container in which legends items are laid out using specified layout.
                 * Items can be located in the legend vertically using geotoolkit.layout.VerticalPriorityLayout() or
                 * horizontally using geotoolkit.layout.HorizontalPriorityLayout() or in any location inside the legend with other layout or manually.
                 * The legend has an anchor position in the parent coordinates and width and height of the legend in model
                 * or device coordinates. This position can be specified with setAnchor method and size with setSize method. In addition
                 * it is possible to use automatic calculation of the legend size, which is supported for device size legend only.
                 * Legends can be customized using setOptions().
                 * @param options  (Required) (see {@link geotoolkit.controls.shapes.Legend.setOptions} for more info)
                 */
                constructor(options: any);
                /**
                 * Sets padding style
                 * @param paddingStyle  (Required) padding style
                 */
                setPaddingStyle(paddingStyle: geotoolkit.attributes.SpaceStyle|any): this;
                /**
                 * Return padding style
                 */
                getPaddingStyle(): geotoolkit.attributes.SpaceStyle;
                /**
                 * Sets visualization options
                 * @param options  (Required) options
                 * @param options.data  (Optional) collection containing an array or an array itself of
{@link geotoolkit.controls.shapes.LegendItem} and/or {@link geotoolkit.controls.shapes.ShapeLegendAdapter} elements
                 * @param options.linestyle  (Optional) whole legend line style
                 * @param options.fillstyle  (Optional) whole legend fill style
                 * @param options.sizeisindevicespace  (Optional) is width and height of the legend in device space
                 * @param options.preserveaspectratio  (Optional) preserve aspect ratio of the legend
                 * @param options.ispointingup  (Optional) pointing up
                 * @param options.preservereadingorientation  (Optional) preserve reading orientation for local transform
                 * @param options.alignment  (Optional) alignment according of the anchor point
                 * @param options.mindimension  (Optional) minimum size for rendering
                 * @param options.maxdimension  (Optional) maximum size for rendering
                 * @param options.width  (Optional) legend width (it is ignored if autosize is true)
                 * @param options.height  (Optional) legend height (it is ignored if autosize is true)
                 * @param options.autosize  (Optional) auto size to calculate device size of the legend. it doesn't work if legend in the model space.
                 * @param options.padding  (Optional) It has properties for specifying the padding for each side of an legend
                 * @param options.padding.top  (Optional) top padding in pixels
                 * @param options.padding.bottom  (Optional) top padding  in pixels
                 * @param options.padding.right  (Optional) right padding  in pixels
                 * @param options.padding.left  (Optional) left padding  in pixels
                 */
                setOptions(options: any | { data?: geotoolkit.util.Collection|any[]; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; sizeisindevicespace?: boolean; preserveaspectratio?: boolean; ispointingup?: boolean; preservereadingorientation?: boolean; alignment?: geotoolkit.util.AnchorType; mindimension?: geotoolkit.util.Dimension; maxdimension?: geotoolkit.util.Dimension; width?: number; height?: number; autosize?: boolean; padding?: any | { top?: number; bottom?: number; right?: number; left?: number; } |geotoolkit.attributes.SpaceStyle; } ): this;
                /**
                 * Return the collection of SymbolLegendItem {@link geotoolkit.controls.shapes.SymbolLegendItem} to be displayed
                 */
                getData(): geotoolkit.util.Collection;
                /**
                 * Rebuild a legend
                 */
                rebuild(): any;
                /**
                 * Sets bounds of the node in the parent coordinates. This method
                 * takes anchor position and width and height if size is not in device space
                 * @param bounds  (Required) bound of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect|any): this;
                /**
                 * dispose
                 */
                dispose(): any;
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * render to specified context
                 * @param context  (Required) Rendering Context
                 */
                renderContent(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Return device area occupied by legend shape
                 * @param legendToDevice  (Required) transformation of the unit rectangle [0,0,1,1] to device
                 */
                getLegendDeviceSize(legendToDevice: geotoolkit.util.Transformation): geotoolkit.util.Rect;
                /**
                 * @param callback  (Required) callback
                 * @param target  (Required) target
                 */
                enumerateNodes(callback: Function, target: any): any;
                /**
                 * Add a child node
                 * @param node  (Required) the child node to be added
                 */
                protected addChild(node: geotoolkit.scene.Node|geotoolkit.scene.Node[]|geotoolkit.util.Iterator): this;
                /**
                 * Return iterator by child nodes
                 * @param filter  (Optional) a filter function. Returns all nodes if null
                 */
                protected getChildren(filter?: Function): geotoolkit.util.Iterator;
                /**
                 * Remove child node
                 * @param node  (Required) node or array of nodes to be removed
                 */
                protected removeChild(node: geotoolkit.scene.Node|geotoolkit.scene.Node[]): this;
                /**
                 * Remove all child nodes from this composite group
                 * @param disposeChildren  (Optional) automatically dispose children. If it is
true then method dispose is called for each child.
                 */
                protected clearChildren(disposeChildren?: boolean): this;
                /**
                 * Sets inner model limits for legends' items
                 * @param limits  (Required) inner limits
                 */
                setModelLimits(limits: geotoolkit.util.Rect): this;
                /**
                 * Returns if clipping is enabled or not for this node.
                 */
                isClippingEnabled(): boolean;
                /**
                 * Enables or disables clipping of this node. If enabled,
                 * shapes will not be rendered outside of its bounds.
                 * @param doClip  (Required) enable clipping on this node
                 */
                enableClipping(doClip: boolean): this;
                /**
                 * Gets model limits, the limits of this groups inside space
                 */
                getModelLimits(): geotoolkit.util.Rect|any;
                /**
                 * Associate layout with a group.
                 * @param layout  (Required) layout to be set
                 */
                setLayout(layout: geotoolkit.layout.Layout): this;
                /**
                 * Returns layout associated with the group
                 */
                getLayout(): geotoolkit.layout.Layout;
                /**
                 * Updates layout(s)
                 * @param targets  (Optional) optional parameter about which element to layout
                 */
                updateLayout(targets?: geotoolkit.scene.Node[]): this;
                /**
                 * Set Model Limits Logics to use when no Model Limits have been set
                 * set to true: will use parents width and height, starting at 0
                 * set to false: will use parents bounds
                 * @param mode  (Required) Model Limits Logics to be used
                 */
                setAutoModelLimitsMode(mode: boolean): this;
                /**
                 * Get Model Limits Logics to use when no Model Limits have been set
                 * set to true: will use parents width and height, starting at 0
                 * set to false: will use parents bounds
                 */
                getAutoModelLimitsMode(): boolean;
                /**
                 * Sets fill style
                 * @param fillStyle  (Required) a new fill style
                 * @param fillStyle.color  (Optional) color
                 * @param fillStyle.pattern  (Optional) pattern
                 * @param fillStyle.foreground  (Optional) foreground color
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setFillStyle(fillStyle: geotoolkit.attributes.FillStyle|string|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } , merge?: boolean): this;
                /**
                 * Sets line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{layoutstyle:geotoolkit.layout.LayoutStyle;padding:geotoolkit.attributes.SpaceStyle}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.layoutstyle  (Optional) desired layout style
                 * @param properties.padding  (Optional) padding
                 */
                setProperties(properties: any | { layoutstyle?: geotoolkit.layout.LayoutStyle|any; padding?: geotoolkit.attributes.SpaceStyle; } ): this;
                /**
                 * specify desired layout style
                 * @param layoutStyle  (Required) desired layout style
                 */
                setLayoutStyle(layoutStyle: geotoolkit.layout.LayoutStyle|any): this;
                /**
                 * return desired layout style
                 */
                getLayoutStyle(): geotoolkit.layout.LayoutStyle;
                /**
                 * Returns desired width of the group as a layoutable object.
                 * This method is a helper method to get access to getLayoutStyle()
                 */
                getDesiredWidth(): string|number;
                /**
                 * Sets desired width of the group as a layoutable object
                 * @param value  (Required) desired width to set
                 */
                setDesiredWidth(value: string|number): this;
                /**
                 * Returns desired height of the group as a layoutable object
                 * This method is a helper method to get access to getLayoutStyle()
                 */
                getDesiredHeight(): string|number;
                /**
                 * Sets desired height of the group as a layoutable object
                 * @param value  (Required) desired height to set
                 */
                setDesiredHeight(value: string|number): this;
            }
            /**
             * This is a parent class for legend items, which contains information to display.<br>
             * Legend items are shapes used to add information on a chart like donutchart, timeseries, etc.
             */
            class LegendItem extends geotoolkit.scene.Group {
                /**
                 * This is a parent class for legend items, which contains information to display.<br>
                 * Legend items are shapes used to add information on a chart like donutchart, timeseries, etc.
                 * @param object  (Required) associated with the legend item
                 */
                constructor(object: any);
                /**
                 * LegendItem Events
                 */
                static Events: any;
                /**
                 * Gets object
                 */
                getObject(): any;
                /**
                 * Sets object
                 * @param object  (Required) 
                 */
                setObject(object: any): this;
                /**
                 * Sets options.
                 * The implementations does nothing
                 * @param options  (Required) 
                 */
                setOptions(options: any): this;
                /**
                 * Updates Geometry.
                 * The implementations does nothing
                 */
                updateGeometry(): any;
                /**
                 * Disposes the object.
                 */
                dispose(): any;
            }
            /**
             * Legend item with symbol and text elements
             */
            class SymbolLegendItem extends geotoolkit.controls.shapes.LegendItem {
                /**
                 * Legend item with symbol and text elements
                 * @param object  (Required) associated with the legend item
                 * @param options  (Optional) (see "setOptions" API for more info)
                 */
                constructor(object: any, options?: any);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.controls.shapes.SymbolLegendItem): this;
                /**
                 * Returns the current symbol legend options
                 */
                getOptions(): {options:{background:{linestyle:geotoolkit.attributes.LineStyle;fillstyle:geotoolkit.attributes.FillStyle};textstyle:geotoolkit.attributes.TextStyle;internalpadding:number;margintext:number;alignment:geotoolkit.util.AnchorType;symbol:{width:number;height:number;painter:any;linestyle:geotoolkit.attributes.LineStyle;fillstyle:geotoolkit.attributes.FillStyle}}}|any;
                /**
                 * Sets item's options
                 * @param options  (Required) options
                 * @param options.background  (Optional) background rectangle options
                 * @param options.background.linestyle  (Optional) Line style for background rectangle
                 * @param options.background.fillstyle  (Optional) Fill style for background rectangle
                 * @param options.textstyle  (Optional) text style
                 * @param options.internalpadding  (Optional) padding of the background rectangle
                 * @param options.margintext  (Optional) Text margin for text to the left and right
                 * @param options.alignment  (Optional) alignment
                 * @param options.symbol  (Optional) symbol options
                 * @param options.symbol.width  (Optional) symbol width
                 * @param options.symbol.height  (Optional) symbol height
                 * @param options.symbol.painter  (Optional) symbol painter
                 * @param options.symbol.linestyle  (Optional) symbol line style
                 * @param options.symbol.fillstyle  (Optional) symbol fill style
                 */
                setOptions(options: any | { background?: any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; textstyle?: geotoolkit.attributes.TextStyle|string|any; internalpadding?: number; margintext?: number; alignment?: geotoolkit.util.AnchorType; symbol?: any | { width?: number; height?: number; painter?: any; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; } ): this;
            }
            /**
             * Abstract class that creates {@link geotoolkit.controls.shapes.LegendItem} elements
             * based on the "shape" state
             */
            class ShapeLegendAdapter extends geotoolkit.util.EventDispatcher {
                /**
                 * Abstract class that creates {@link geotoolkit.controls.shapes.LegendItem} elements
                 * based on the "shape" state
                 * @param object  (Optional) an object to tie legend items to
                 * @param legendItemOptions  (Optional) external legend item options
                 */
                constructor(object?: any, legendItemOptions?: any);
                /**
                 * Gets object the adapter and legend items are associated with
                 */
                getObject(): any;
                /**
                 * Creates legend items based on its shape's state
                 * @param options  (Optional) legend items' options
                 */
                createLegendItems(options?: any): geotoolkit.controls.shapes.LegendItem[];
                /**
                 * Legend adapter events enumerator
                 */
                static Events: any;
                /**
                 * Gets legend item's external options
                 */
                getLegendItemOptions(): any;
                /**
                 * Sets legend item's external options.
                 * Sends {@link geotoolkit.controls.shapes.ShapeLegendAdapter.Events.LegendItemOptionsChanged} event
                 * @param options  (Required) options
                 */
                setLegendItemOptions(options: any): this;
            }
            /**
             * Creates {@link geotoolkit.controls.shapes.SymbolLegendItem} elements
             * based on {@link geotoolkit.controls.shapes.DonutChart} shape
             */
            class DonutChartLegendAdapter extends geotoolkit.controls.shapes.ShapeLegendAdapter {
                /**
                 * Creates {@link geotoolkit.controls.shapes.SymbolLegendItem} elements
                 * based on {@link geotoolkit.controls.shapes.DonutChart} shape
                 * @param donutChart  (Required) shape
                 * @param options  (Optional) external options
                 */
                constructor(donutChart: geotoolkit.controls.shapes.DonutChart, options?: any);
                /**
                 * Creates legend items based on donut shape instance (and options if provided)
                 * @param options  (Optional) legend items' options
                 */
                createLegendItems(options?: any): any[];
                /**
                 * Disposes the object.
                 */
                dispose(): any;
            }
            /**
             * Define an interface for data chart visuals
             */
            interface IChartDataVisual {
                /**
                 * Returns flag to indicate automatic calculation of data limits
                 */
                getAutoDataLimits(): boolean;
                /**
                 * Sets a flag to indicate automatic calculation of data limits
                 * @param enable  (Required) enable or disable calculation of the data limits
                 */
                setAutoDataLimits(enable: boolean): this;
                /**
                 * Return original data limits
                 */
                getDataLimits(): geotoolkit.util.Rect;
            }
            /**
             * Enum for defining the location of the color bar
             */
            interface ColorBarLocation {
                /**
                 * North
                 */
                North: string;
                /**
                 * East
                 */
                East: string;
                /**
                 * South
                 */
                South: string;
                /**
                 * West
                 */
                West: string;
            }
            module painters {
                /**
                 * Created by ivan.kolodin on 9/22/2015.
                 */
                var AbstractSymbolMap: any;
            }
            module Histogram {
                /**
                 * Histogram's Events enumerator
                 */
                interface Events {
                    /**
                     * Event type fired when this shapes data has been updated, kept for compatiable purpose
                     */
                    DataUpdated: string;
                    /**
                     * Event type fired when model limits has been updated.
                     */
                    ModelLimitsUpdated: string;
                    /**
                     * set or get new calculated bin count
                     */
                    BinsUpdated: string;
                }
                /**
                 * GapType
                 */
                interface GapType {
                    /**
                     * No Gap
                     */
                    None: number;
                    /**
                     * Left Gap
                     */
                    Left: number;
                    /**
                     * Right Gap
                     */
                    Right: number;
                }
                /**
                 * FrequencyType
                 */
                interface FrequencyType {
                    /**
                     * Represents the total number of observations within a given interval or frequency bin. Sum of the absolute frequencies is equal to the total number of data.
                     */
                    Absolute: string;
                    /**
                     * Height of the histogram bar represents the proportion of the data in each class.
                     */
                    Normalized: string;
                    /**
                     * Histogram vertical axis uses relative or proportional frequency instead of simple frequency. It then shows the proportion of cases that fall into each of several categories
                     */
                    Relative: string;
                }
                /**
                 * AccumulatedMode
                 */
                interface AccumulatedMode {
                    /**
                     * Disabled
                     */
                    Disabled: string;
                    /**
                     * Enabled
                     */
                    Enabled: string;
                }
                /**
                 * HistogramMode
                 */
                interface HistogramMode {
                    /**
                     * Linear
                     */
                    Linear: string;
                    /**
                     * Logarithmic
                     */
                    Logarithmic: string;
                }
            }
            module LineChart {
                /**
                 * Enum of rendering optimization types
                 */
                interface OptimizationType {
                    /**
                     * Filter points which are close to each other and are rendered in one pixel
                     */
                    FilterClosePoints: number;
                    /**
                     * Ramer–Douglas–Peucker optimization
                     */
                    RDP: number;
                }
                /**
                 * Enum of Data-Interpolation type for stacked area
                 */
                interface DataInterpolationType {
                    /**
                     * Interpolate as 0 for missing points
                     */
                    InterpolateZero: number;
                    /**
                     * Interpolate as Null for missing points
                     */
                    InterpolateNull: number;
                    /**
                     * Apply linear interpolation for missing points
                     */
                    InterpolateMissingValues: number;
                }
            }
            module TableView {
                /**
                 * TableViews's Events enumerator
                 */
                interface Events {
                    /**
                     * Event type fired prior to column width change
                     */
                    ColumnWidthChanging: string;
                    /**
                     * Event type fired after a column width change
                     */
                    ColumnWidthChanged: string;
                }
            }
            module RoseChart {
                /**
                 * Enum for RoseMode
                 */
                interface RoseMode {
                    /**
                     * bar
                     */
                    Bar: string;
                    /**
                     * histogram
                     */
                    Histogram: string;
                    /**
                     * slices, each value can has own start and end angle, value, fillstyle and linestyle properties
                     */
                    Slices: string;
                }
            }
            module DonutChart {
                /**
                 * Enum defining PieMode
                 */
                interface PieMode {
                    /**
                     * Pie2D
                     */
                    Pie2D: string;
                    /**
                     * Pie3D
                     */
                    Pie3D: string;
                }
                /**
                 * Enum defining donut charts model limits mode
                 */
                interface ModelLimitsMode {
                    /**
                     * Radius - Model Limits will be the based on the outerRadius
                     */
                    Radius: string;
                    /**
                     * Padded - Model Limits will be the based on the outerRadius plus the slice shift
                     */
                    Padded: string;
                    /**
                     * Dynamic - Model Limits will adjust to fit the shape in the bounds
                     */
                    Dynamic: string;
                    /**
                     * Auto - Model Limits will be the based on the maxOuterRadius
                     */
                    Auto: string;
                }
                /**
                 * Enum defining DataMode
                 */
                interface DataMode {
                    /**
                     * Raw
                     */
                    Raw: string;
                    /**
                     * Associative
                     */
                    Associative: string;
                }
                /**
                 * Enum defining LabelLocation
                 */
                interface LabelLocation {
                    /**
                     * Inside
                     */
                    Inside: string;
                    /**
                     * Outside
                     */
                    Outside: string;
                }
                /**
                 * Enum defining LabelDirection
                 */
                interface LabelDirection {
                    /**
                     * Horizontal
                     */
                    Horizontal: string;
                    /**
                     * Radial
                     */
                    Radial: string;
                }
                /**
                 * Enum defining Direction
                 */
                interface Direction {
                    /**
                     * Clockwise
                     */
                    Clockwise: string;
                    /**
                     * CounterClockwise
                     */
                    CounterClockwise: string;
                }
                /**
                 * Enum defining Data Order Mode
                 */
                interface DataOrder {
                    /**
                     * Ascending
                     */
                    Ascending: string;
                    /**
                     * Descending
                     */
                    Descending: string;
                    /**
                     * Natural
                     */
                    Natural: string;
                }
            }
            module TornadoChart {
                /**
                 * Sort Mode
                 */
                interface SortMode {
                    /**
                     * Max to Min
                     */
                    MaxToMin: string;
                    /**
                     * Min to Max
                     */
                    MinToMax: string;
                    /**
                     * None
                     */
                    None: string;
                }
                /**
                 * /**
                 * Text placement
                 */
                interface TextPlacement {
                    /**
                     * Inside
                     */
                    Inside: number;
                    /**
                     * Outside
                     */
                    Outside: number;
                    /**
                     * Center
                     */
                    Center: number;
                }
            }
            module BarChart {
                /**
                 * Enum for BarChart.BarMode
                 */
                interface BarMode {
                    /**
                     * Default
                     */
                    Default: string;
                    /**
                     * Stacked
                     */
                    Stacked: string;
                    /**
                     * Float
                     */
                    Float: string;
                }
                /**
                 * Enum for BarChart.DataMode
                 */
                interface DataMode {
                    /**
                     * Raw
                     */
                    Raw: string;
                    /**
                     * Associative
                     */
                    Associative: string;
                    /**
                     * Single
                     */
                    Single: string;
                }
                /**
                 * Enum for BarChart.BarValueLocation
                 */
                interface BarValueLocation {
                    /**
                     * TopOutside
                     */
                    TopOutside: string;
                    /**
                     * TopInside
                     */
                    TopInside: string;
                    /**
                     * BottomInside
                     */
                    BottomInside: string;
                    /**
                     * Center
                     */
                    Center: string;
                }
                /**
                 * Enum for BarChart.Orientation
                 */
                interface Orientation {
                    /**
                     * Bottom
                     */
                    Bottom: string;
                    /**
                     * Left
                     */
                    Left: string;
                    /**
                     * Top
                     */
                    Top: string;
                    /**
                     * Right
                     */
                    Right: string;
                }
            }
            module BoxPlot {
                /**
                 * Enum for BoxPlot.DataMode
                 */
                interface DataMode {
                    /**
                     * Raw
                     */
                    Raw: string;
                    /**
                     * Associative
                     */
                    Associative: string;
                }
                /**
                 * Enum for Boxplot.Orientation
                 */
                interface Orientation {
                    /**
                     * Horizontal
                     */
                    Horizontal: string;
                    /**
                     * Vertical
                     */
                    Vertical: string;
                }
                /**
                 * Enum for Boxplot.BoxValueLocation
                 */
                interface BoxValueLocation {
                    /**
                     * on top of line
                     */
                    Top: string;
                    /**
                     * below the line
                     */
                    Below: string;
                    /**
                     * on left of the line
                     */
                    Left: string;
                    /**
                     * on right of the line
                     */
                    Right: string;
                }
            }
            module BubbleChart {
                /**
                 * Enum for Boxplot.BoxValueLocation
                 */
                interface LabelLocation {
                    /**
                     * on top of bubble
                     */
                    Top: string;
                    /**
                     * below the bubble
                     */
                    Bottom: string;
                    /**
                     * on center of the bubble
                     */
                    Center: string;
                }
            }
            module HeatMap {
                /**
                 * Enum of Plotting types
                 */
                interface PlotType {
                    /**
                     * Step plot mode (no interpolation)
                     */
                    Step: string;
                    /**
                     * Linear interpolation between data point, first column(or row) and last column(or row)
                     * are mapped to the bound of the image
                     */
                    LinearInbound: string;
                }
            }
            module Treemap {
                /**
                 * Enum for Treemap.LayoutMode
                 */
                interface LayoutMode {
                    /**
                     * Squarify
                     */
                    Squarify: string;
                    /**
                     * HorizontalSliceAndDice
                     */
                    HorizontalSliceAndDice: string;
                    /**
                     * VerticalSliceAndDice
                     */
                    VerticalSliceAndDice: string;
                    /**
                     * AlternateSliceAndDice
                     */
                    AlternateSliceAndDice: string;
                }
                /**
                 * Enum for Treemap.NodeValueLocation
                 */
                interface NodeValueLocation {
                    /**
                     * on top of line
                     */
                    Top: string;
                    /**
                     * below the line
                     */
                    Below: string;
                    /**
                     * on left of the line
                     */
                    Left: string;
                    /**
                     * on right of the line
                     */
                    Right: string;
                }
                /**
                 * Treemap Event's enumerator
                 */
                interface Events {
                    /**
                     * Event type fired after Data Changed
                     */
                    DataChanged: string;
                }
            }
            module LegendItem {
                /**
                 * LegendItem Events
                 */
                interface Events {
                    /**
                     * Change
                     */
                    Change: string;
                }
            }
            module ShapeLegendAdapter {
                /**
                 * Legend adapter events enumerator
                 */
                interface Events {
                    /**
                     * LegendItemOptionsChanged
                     */
                    LegendItemOptionsChanged: string;
                    /**
                     * LegendSourceStateChanged
                     */
                    LegendSourceStateChanged: string;
                }
            }
        }
        module tools {
            /**
             * Enum for the rendering of the rubber band tool
             */
            var RubberBandRenderMode: any;
            /**
             * Enums of Selection Mode
             */
            var SelectionMode: any;
            /**
             * Enums of RubberBand Selection Mode
             */
            var RubberBandMode: any;
            /**
             * Enums of Pointer Selection Mode
             */
            var PointerMode: any;
            /**
             * PinchToZoomModes enum
             */
            var PinchToZoomModes: any;
            /**
             * Base class for event wrappers used by tools and widgets.
             */
            class BaseEventArgs {
                /**
                 * Base class for event wrappers used by tools and widgets.
                 * @param eventName  (Required) name of the event
                 */
                constructor(eventName: string);
                /**
                 * Returns event name
                 */
                getEventName(): string;
                /**
                 * Stops propagation
                 */
                stopPropagation(): this;
                /**
                 * Prevents default
                 */
                preventDefault(): this;
                /**
                 * Returns whether event has been cancelled
                 */
                isCanceled(): boolean;
                /**
                 * Returns whether event has been prevented default
                 */
                isPreventDefault(): boolean;
            }
            /**
             * Native event wrapper class.
             */
            class EventArgs extends geotoolkit.controls.tools.BaseEventArgs {
                /**
                 * Native event wrapper class.
                 * @param eventName  (Required) name of the event
                 * @param nativeEventArgs  (Required) arguments of the DOM event
                 * @param plotPoint  (Required) position of the mouse inside of the plot
                 * @param node  (Required) owner of the event
                 * @param plot  (Required) plot which renders nodes
                 */
                constructor(eventName: string, nativeEventArgs: Event, plotPoint: geotoolkit.util.Point, node: geotoolkit.scene.Node, plot: geotoolkit.plot.Plot);
                /**
                 * Returns point in plot coordinate
                 */
                getPlotPoint(): geotoolkit.util.Point;
                /**
                 * Returns plot
                 */
                getPlot(): geotoolkit.plot.Plot;
                /**
                 * Returns node on the plot
                 */
                getNode(): geotoolkit.scene.Node;
                /**
                 * Returns original event args
                 */
                getNativeEventArgs(): Event;
                /**
                 * Cancels event processing
                 * @param preventDefault  (Optional) prevent default system events
                 * @param stopPropagation  (Optional) stop propagation to next listener
                 */
                stopPropagation(preventDefault?: boolean, stopPropagation?: boolean): this;
                /**
                 * Returns whether event position is inside of plot
                 */
                inPlot(): boolean;
            }
            /**
             * ProxyEventArgs
             */
            class ProxyEventArgs extends geotoolkit.controls.tools.EventArgs {
                /**
                 * ProxyEventArgs
                 * @param eventArgs  (Required) contains info about the event
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs);
                /**
                 * Returns node on the plot
                 */
                getNode(): geotoolkit.scene.Node;
                /**
                 * Returns plot
                 */
                getPlot(): geotoolkit.plot.Plot;
                /**
                 * Returns point in plot coordinate
                 */
                getPlotPoint(): geotoolkit.util.Point;
                /**
                 * Returns event name
                 */
                getEventName(): string;
                /**
                 * Returns original event args
                 */
                getNativeEventArgs(): Event;
                /**
                 * Cancels event processing
                 * @param preventDefault  (Required) prevent default system events
                 * @param stopPropagation  (Required) stop propogation to next listener
                 */
                stopPropagation(preventDefault: boolean, stopPropagation: boolean): this;
                /**
                 * Returns whether event has been cancelled
                 */
                isCanceled(): boolean;
                /**
                 * Returns whether event position is inside of plot
                 */
                inPlot(): boolean;
            }
            /**
             * RejectableEventArgs
             */
            class RejectableEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * RejectableEventArgs
                 * @param eventArgs  (Required) contains info about the event
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs);
                /**
                 * set target
                 * @param target  (Required) object that initialised this event
                 */
                setTarget(target: any): this;
                /**
                 * returns target
                 */
                getTarget(): any|any;
                /**
                 * reject action
                 * @param doReject  (Required) reject event or not
                 */
                reject(doReject: boolean): this;
                /**
                 * return rejected state
                 */
                isRejected(): boolean;
            }
            /**
             * EventHandler*
             */
            class EventHandler {
                /**
                 * EventHandler*
                 * @param compositeTool  (Required) abstract composite tool
                 * @param eventName  (Required) event
                 * @param tool  (Required) tool
                 * @param obj  (Required) extra obj
                 * @param delegate  (Required) to execute
                 */
                constructor(compositeTool: geotoolkit.controls.tools.AbstractCompositeTool, eventName: string, tool: geotoolkit.controls.tools.AbstractTool, obj: any, delegate: Function);
                /**
                 * return tool container
                 */
                getCompositeTool(): geotoolkit.controls.tools.AbstractCompositeTool;
                /**
                 * return event name
                 */
                getEventName(): string;
                /**
                 */
                getObject(): any;
                /**
                 * return tool
                 */
                getTool(): geotoolkit.controls.tools.AbstractTool;
                /**
                 * return enable state
                 */
                isEnabled(): boolean;
                /**
                 * set enable state
                 * @param enabled  (Required) flag to set enable state
                 */
                setEnabled(enabled: boolean): this;
                /**
                 * returns true if event was captured be event handler
                 * @param nativeEventArgs  (Required) event args from DOM events
                 */
                execute(nativeEventArgs: any): geotoolkit.controls.tools.EventArgs;
            }
            /**
             * AbstractTool is a layer of abstraction between the HTML5 element events. Uses generic event mechanism for different browsers.
             * <br>
             * <br>
             * <h5>Events {@link geotoolkit.controls.tools.AbstractTool.Events} </h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Event</th><th>Arguments</th><th>Description</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>onStateChanged</td>
             *              <td>null</td>
             *              <td>This Event is fired when the Abstract Tool State (props: active) has been changed</td>
             *          </tr>
             *           <tr>
             *              <td>onEnabledStateChanged</td>
             *              <td>null</td>
             *              <td>This Event is fired when the Abstract Tool State (enable) has been changed</td>
             *          </tr>
             *           <tr>
             *              <td>onEnter</td>
             *              <td>null</td>
             *              <td>This Event is fired on entering the canvas</td>
             *          </tr>
             *           <tr>
             *              <td>onLeave</td>
             *              <td>null</td>
             *              <td>This Event is fired on leaving the canvas</td>
             *          </tr>
             *      <tbody>
             *  </table>
             *  <br>
             * Below is a list of valid slot names ( this could change depending on the browser and its version. ) <br>
             * pointerdown <br>
             * pointermove <br>
             * pointerup <br>
             * MSPointerDown <br>
             * MSPointerMove <br>
             * MSPointerUp <br>
             * mousedown <br>
             * touchstart <br>
             * mousemove <br>
             * touchmove <br>
             * mouseup <br>
             * touchend <br>
             */
            class AbstractTool implements geotoolkit.plot.ITool {
                /**
                 * AbstractTool is a layer of abstraction between the HTML5 element events. Uses generic event mechanism for different browsers.
                 * <br>
                 * <br>
                 * <h5>Events {@link geotoolkit.controls.tools.AbstractTool.Events} </h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>onStateChanged</td>
                 *              <td>null</td>
                 *              <td>This Event is fired when the Abstract Tool State (props: active) has been changed</td>
                 *          </tr>
                 *           <tr>
                 *              <td>onEnabledStateChanged</td>
                 *              <td>null</td>
                 *              <td>This Event is fired when the Abstract Tool State (enable) has been changed</td>
                 *          </tr>
                 *           <tr>
                 *              <td>onEnter</td>
                 *              <td>null</td>
                 *              <td>This Event is fired on entering the canvas</td>
                 *          </tr>
                 *           <tr>
                 *              <td>onLeave</td>
                 *              <td>null</td>
                 *              <td>This Event is fired on leaving the canvas</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * Below is a list of valid slot names ( this could change depending on the browser and its version. ) <br>
                 * pointerdown <br>
                 * pointermove <br>
                 * pointerup <br>
                 * MSPointerDown <br>
                 * MSPointerMove <br>
                 * MSPointerUp <br>
                 * mousedown <br>
                 * touchstart <br>
                 * mousemove <br>
                 * touchmove <br>
                 * mouseup <br>
                 * touchend <br>
                 * @param slots  (Required) type of system events like mousedown etc. The slot object allows to attach browser events (HTML Dom Events) to your callback function
                 * @param slots.slots  (Optional) type of system events
                 * @param slots.name  (Optional) name of the tool used like crosshair etc
                 * @param slots.layer  (Optional) manipulator layer
                 * @param name  (Optional) name of the tool used like crosshair etc
                 */
                constructor(slots: any | { slots?: any; name?: string; layer?: geotoolkit.scene.CompositeNode; } , name?: string);
                /**
                 * AbstractTool Events
                 */
                static Events: any;
                /**
                 * Sets new slots. This method remove old slots and sets new ones.
                 * @param slots  (Optional) type of system events
                 */
                setSlots(slots?: any): this;
                /**
                 * Return an object which contains all slots. Don't modify this object
                 */
                getSlots(): any;
                /**
                 * for internal use only
                 * @param plot  (Required) plot
                 */
                protected attachToPlot(plot: geotoolkit.plot.Plot): this;
                /**
                 * Set exclusive tool for plot
                 * @param plot  (Required) plot
                 * @param tool  (Required) tool
                 */
                static lock(plot: geotoolkit.plot.Plot, tool: geotoolkit.controls.tools.AbstractTool): any;
                /**
                 * Remove exclusive tool from plot
                 * @param value  (Required) value
                 */
                static unlock(value: geotoolkit.plot.Plot|geotoolkit.controls.tools.AbstractTool): any;
                /**
                 * return exclusive tool associated with plot
                 * @param plot  (Required) plot
                 */
                static getExclusiveTool(plot: geotoolkit.plot.Plot): geotoolkit.controls.tools.AbstractTool|any;
                /**
                 * Sets slot enabled
                 * @param eventName  (Required) eventName
                 * @param value  (Required) value
                 * @param target  (Optional) target
                 */
                setSlotEnabled(eventName: string, value: boolean, target?: any): this;
                /**
                 * set tool name
                 * @param name  (Required) the tool name
                 */
                setName(name: string): this;
                /**
                 * return tool name if any
                 */
                getName(): string;
                /**
                 * return manipulator layer
                 */
                getManipulatorLayer(): geotoolkit.scene.CompositeNode;
                /**
                 * listen to window mouse events in order to catch a mouse up action outside of the tool container DOM element.
                 * useful for example when you pan and release click outside of DOM element.
                 */
                captureMouseUp(): any;
                /**
                 * dispose object
                 */
                dispose(): any;
                /**
                 * return true if the event is a touch event and false otherwise.
                 * @param eventArgs  (Required) contains info of the event
                 */
                isTouchEvent(eventArgs: geotoolkit.controls.tools.EventArgs): boolean;
                /**
                 * return position relative to the parent
                 * @param element  (Required) HTML element
                 * @param parentElement  (Optional) the parent HTML element
                 */
                getAbsolutePosition(element: HTMLElement, parentElement?: HTMLElement): any;
                /**
                 * return position relative to the canvas
                 * @param eventArgs  (Required) parentElement the parent HTML element
                 * @param externalPlot  (Optional) plot
                 */
                pageToCanvas(eventArgs: geotoolkit.controls.tools.EventArgs, externalPlot?: geotoolkit.plot.Plot): any;
                /**
                 * converts device coordinates to inner coordinates of node
                 * @param model  (Required) the model
                 * @param eventArgs  (Required) arguments of the event.
                 */
                pointToModel(model: geotoolkit.scene.Node, eventArgs: geotoolkit.controls.tools.EventArgs): geotoolkit.util.Point;
                /**
                 * add event listener. The listener receives the message when the system event happens.
                 * @param eventName  (Required) event name or unique event identifier
                 * @param listener  (Required) the event listener
                 */
                addListener(eventName: string|number, listener: Function): this;
                /**
                 * remove event listener. The listener reveives the message when the system event happens.
                 * @param eventName  (Required) event name
                 * @param listener  (Required) the event listener
                 */
                removeListener(eventName: string, listener: Function): this;
                /**
                 * remove event listener
                 * @param eventName  (Required) event name
                 */
                getListenersForEvent(eventName: string): Function[];
                /**
                 * This method is Protected. Fire an Event.
                 * @param eventName  (Required) event name
                 * @param eventArgs  (Required) contains info of the event
                 */
                fireEvent(eventName: string, eventArgs: any|any): any;
                /**
                 * set enable state
                 * @param enabled  (Required) sets the enabled state
                 */
                setEnabled(enabled: boolean): this;
                /**
                 * returns enable state
                 */
                isEnabled(): boolean;
                /**
                 * switch enable state to opposite state
                 */
                toggle(): this;
                /**
                 * start
                 * @param eventArgs  (Optional) event args
                 */
                protected start(eventArgs?: geotoolkit.controls.tools.EventArgs): this;
                /**
                 * stop
                 */
                protected stop(): this;
                /**
                 * set active state
                 * @param active  (Required) set active state
                 */
                setActive(active: boolean): this;
                /**
                 * return active state
                 */
                isActive(): boolean;
                /**
                 */
                protected onActiveStateChanged(): any;
                /**
                 */
                protected onEnabledStateChanged(): any;
                /**
                 * Returns associated tool containers
                 */
                getCompositeTools(): geotoolkit.util.Iterator;
                /**
                 * @param eventName  (Required) 
                 * @param tool  (Required) tool
                 * @param obj  (Required) 
                 * @param delegate  (Required) 
                 */
                on(eventName: string, tool: geotoolkit.controls.tools.AbstractTool, obj: any|any, delegate: Function): geotoolkit.controls.tools.EventHandler;
                /**
                 * @param handler  (Required) handler
                 */
                off(handler: geotoolkit.controls.tools.EventHandler): this;
                /**
                 */
                getEventHandlers(): any;
            }
            /**
             * AbstractRubberTool
             */
            class AbstractRubberTool extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * AbstractRubberTool
                 * @param slots  (Optional) type of system events like mousedown etc. The slot object allows to attach browser events (HTML Dom Events) to your callback function
                 * @param slots.slots  (Optional) type of system events which should be processed
                 * @param slots.layer  (Optional) manipulator layer
                 * @param slots.name  (Optional) name of the tool
                 * @param slots.mode  (Optional) Rubber mode
                 * @param name  (Optional) name of the tool
                 * @param mode  (Optional) Rubber mode
                 */
                constructor(slots?: any | { slots?: any; layer?: geotoolkit.scene.CompositeNode; name?: string; mode?: geotoolkit.controls.tools.RubberBandRenderMode|number; } , name?: string, mode?: geotoolkit.controls.tools.RubberBandRenderMode|number);
                /**
                 * Set the way the rectangle has to be displayed
                 * @param mode  (Required) the way the rectangle has to be displayed
                 */
                setRubberBandRenderMode(mode: geotoolkit.controls.tools.RubberBandRenderMode|number): this;
                /**
                 * Return the way the rectangle is displayed
                 */
                getRubberBandRenderMode(): geotoolkit.controls.tools.RubberBandRenderMode|number;
            }
            /**
             * Abstract composite tool.
             */
            class AbstractCompositeTool extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * Abstract composite tool.
                 * @param name  (Optional) name of the tool
                 */
                constructor(name?: string);
                /**
                 * Returns the tool matching the given name.
                 * This function also accepts tool 'path' instead of absolute name.
                 * For example:
                 * getToolByName("compositeTool.panningTools.trackPanning.TrackPanning")
                 * Would return the same tool than
                 * getToolByName("TrackPanning")
                 * As long as there is only one tool named "TrackPanning" in this composite
                 * 
                 * See listToolsNames()
                 * @param name  (Required) tool name or path
                 */
                getToolByName(name: string): geotoolkit.controls.tools.AbstractTool;
                /**
                 * Returns the tool matching the given type.
                 * @param type  (Required) type
                 */
                getToolByType(type: string): geotoolkit.controls.tools.AbstractTool;
                /**
                 * List all the tools contained in this composite.
                 * Prepend their composite tool parent using a '.'
                 */
                listToolsNames(): string[];
                /**
                 * Return index of specified tool.
                 * @param tool  (Required) abstract tool
                 */
                getToolIndex(tool: geotoolkit.controls.tools.AbstractTool): number;
                /**
                 * Insert tool at specified index.
                 * @param index  (Required) index to insert the tool
                 * @param tool  (Required) abstract tool
                 */
                insert(index: number, tool: geotoolkit.controls.tools.AbstractTool): this;
                /**
                 * Add tool to the container.
                 * @param tool  (Required) abstract tool to be added
                 */
                add(tool: geotoolkit.controls.tools.AbstractTool|geotoolkit.controls.tools.AbstractTool[]): this;
                /**
                 * Remove tool from container.
                 * @param tool  (Required) to remove
                 */
                remove(tool: geotoolkit.controls.tools.AbstractTool|geotoolkit.controls.tools.AbstractTool[]): this;
                /**
                 * Dispatch event through the handlers.
                 * @param eventName  (Required) contains the name of the event to dispatch.
                 * @param eventArgs  (Required) contains info of the event.
                 */
                dispatchEvent(eventName: string, eventArgs: geotoolkit.controls.tools.EventArgs): boolean;
            }
            /**
             * The tools container class is a container of tools {@link geotoolkit.controls.tools.AbstractTool} connecting tools to their plot. It can hold several tools using a composite tool as a root.
             */
            class ToolsContainer implements geotoolkit.plot.IToolContainer {
                /**
                 * The tools container class is a container of tools {@link geotoolkit.controls.tools.AbstractTool} connecting tools to their plot. It can hold several tools using a composite tool as a root.
                 * @param plot  (Required) plot which renders nodes
                 */
                constructor(plot: geotoolkit.plot.Plot);
                /**
                 * Dispose tool container
                 * @param disposeTool  (Optional) dispose tool flag
                 */
                dispose(disposeTool?: boolean): any;
                /**
                 * /**
                 * set enable state
                 * @param enabled  (Required) sets the enabled state
                 */
                setEnabled(enabled: boolean): this;
                /**
                 * returns enable state
                 */
                isEnabled(): boolean;
                /**
                 * Returns the tool matching the given name.<br>
                 * This function also accepts tool 'path' instead of absolute name.<br>
                 * For example:<br>
                 * getToolByName("compositeTool.panningTools.trackPanning.TrackPanning")<br>
                 * Would return the same tool than <br>
                 * getToolByName("TrackPanning")<br>
                 * As long as there is only one tool named "TrackPanning" in this composite<br>
                 * See listToolsNames()<br>
                 * @param toolName  (Required) The tool name or path
                 */
                getToolByName(toolName: string): geotoolkit.plot.ITool;
                /**
                 * Returns the tool matching the given type. or null if nothing is matching the tool type<br>
                 * For example:<br>
                 * getToolByType(geotoolkit.controls.tools.Selection)<br>
                 * Would return the same tool than<br>
                 * getToolByName("pick")<br>
                 * @param toolType  (Required) toolType of the tool
                 */
                getToolByType(toolType: string): geotoolkit.plot.ITool;
                /**
                 * List all the tools contained in this composite.
                 * Prepend their parent tools parent using a '.'.
                 */
                listToolsNames(): string[];
                /**
                 */
                getPlot(): geotoolkit.plot.Plot;
                /**
                 */
                getNode(): geotoolkit.scene.Node;
                /**
                 * Add tool or array of tools to container
                 * @param tool  (Required) tool or array of tools
                 */
                add(tool: geotoolkit.plot.ITool|geotoolkit.plot.ITool[]): this;
                /**
                 * Remove tool from container
                 * @param tool  (Required) tool to remove
                 */
                remove(tool: geotoolkit.plot.ITool): this;
                /**
                 * Get tool
                 */
                getTool(): geotoolkit.controls.tools.CompositeTool;
            }
            /**
             * Composite tool.
             */
            class CompositeTool extends geotoolkit.controls.tools.AbstractCompositeTool {
                /**
                 * Composite tool.
                 * @param node  (Required) associated with layer to display temporary shapes
                 * @param name  (Optional) name of the tool
                 */
                constructor(node: geotoolkit.scene.CompositeNode, name?: string);
                /**
                 * Returns node associated with manipulator.
                 */
                getNode(): geotoolkit.scene.Group;
                /**
                 * Sets node associated with manipulator
                 * @param node  (Required) node
                 */
                setNode(node: geotoolkit.scene.Group): this;
                /**
                 * Attaches a tool to the container.
                 * @param container  (Required) the container to which this object is attached.
                 */
                attach(container: geotoolkit.controls.tools.CompositeTool): any;
            }
            /**
             * CrossHairEventArgs
             */
            class CrossHairEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * CrossHairEventArgs
                 * @param eventArgs  (Required) contains info of the event
                 * @param position  (Required) mouse position
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs, position: any|geotoolkit.util.Point);
                /**
                 * returns cursor position
                 */
                getPosition(): geotoolkit.util.Point;
            }
            /**
             * Creates a CrossHair tool. The tool supports events shown below. It provides builtin functions to customize the styles for the tool and its labels.
             * <br>
             * <h5>Events {@link geotoolkit.controls.tools.CrossHair.Events}</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Event</th><th>Arguments</th><th>Description</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>onPositionChanged</td>
             *              <td>{@link geotoolkit.controls.tools.CrossHairEventArgs}</td>
             *              <td>This Event is fired when the Cross Hair Mouse position has been changed</td>
             *          </tr>
             *          <tr>
             *              <td>onPointerUp</td>
             *              <td>{@link geotoolkit.controls.tools.CrossHairEventArgs}</td>
             *              <td>This Event is fired when the Cross Hair pointer is up</td>
             *          </tr>
             *      <tbody>
             *  </table>
             *  <br>
             */
            class CrossHair extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * Creates a CrossHair tool. The tool supports events shown below. It provides builtin functions to customize the styles for the tool and its labels.
                 * <br>
                 * <h5>Events {@link geotoolkit.controls.tools.CrossHair.Events}</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>onPositionChanged</td>
                 *              <td>{@link geotoolkit.controls.tools.CrossHairEventArgs}</td>
                 *              <td>This Event is fired when the Cross Hair Mouse position has been changed</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onPointerUp</td>
                 *              <td>{@link geotoolkit.controls.tools.CrossHairEventArgs}</td>
                 *              <td>This Event is fired when the Cross Hair pointer is up</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * @param options  (Required) JSON containing crosshair option OR manipulator layer
                 * @param options.group  (Optional) manipulator layer
                 * @param options.name  (Optional) name of the tool
                 * @param options.linestyle  (Optional) default linestyle shared for all orientations.
                 * @param options.textstyle  (Optional) default textstyle shared for all orientations.
                 * @param name  (Optional) name of the tool
                 */
                constructor(options: any | { group?: geotoolkit.scene.CompositeNode; name?: string; linestyle?: geotoolkit.attributes.LineStyle|string|any; textstyle?: geotoolkit.attributes.TextStyle|string|any; } |geotoolkit.scene.CompositeNode, name?: string);
                /**
                 * CrossHair Events
                 */
                static Events: any;
                /**
                 * enum about label positions
                 */
                static LabelPositions: any;
                /**
                 * enum about line orientation
                 */
                static LineOrientations: any;
                /**
                 */
                onEnabledStateChanged(): any;
                /**
                 * Sets line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Set tool settings
                 * @param settings  (Required) tool settings
                 * @param settings.enabled  (Required) tool is enabled
                 * @param settings.linestyle  (Required) Linestyle for both lines
                 * @param settings.horizontal  (Required) Linestyle for horizontal line
                 * @param settings.vertical  (Required) Linestyle for vertical line
                 * @param settings.north  (Required) JSON for north label. See setLabelSettings for more details
                 * @param settings.south  (Required) JSON for south label. See setLabelSettings for more details
                 * @param settings.east  (Required) JSON for east label. See setLabelSettings for more details
                 * @param settings.west  (Required) JSON for west label. See setLabelSettings for more details
                 * @param settings.center  (Required) JSON for center label. See setLabelSettings for more details
                 * @param settings.center.labelsoffset  (Optional) central labels offset relative to mouse position
                 * @param settings.center.labelsoffset.x  (Optional) x-offset in pixels
                 * @param settings.center.labelsoffset.y  (Optional) y-offset in pixels
                 */
                setSettings(settings: any | { enabled?: boolean; linestyle?: any|geotoolkit.attributes.LineStyle; horizontal?: any|geotoolkit.attributes.LineStyle; vertical?: any|geotoolkit.attributes.LineStyle; north?: any; south?: any; east?: any; west?: any; center?: any | { labelsoffset?: any | { x?: number; y?: number; } ; } ; } ): this;
                /**
                 * Set Settings for one label
                 * @param orientation  (Required) orientation
                 * @param settings  (Optional) JSON to configure label
                 * @param settings.textstyle  (Optional) text style of the text
                 * @param settings.fillstyle  (Optional) fill style of the text
                 * @param settings.linestyle  (Optional) line style of the text border
                 * @param settings.visible  (Optional) visibility of the text
                 * @param settings.alignment  (Optional) alignment of the text
                 * @param settings.padding  (Optional) padding between the text and the border
                 * @param settings.radius  (Optional) radius of the text border line
                 * @param settings.textconverter  (Optional) strategy to convert x,y to text
                 */
                setLabelSettings(orientation: geotoolkit.layout.AnnotationLocation, settings?: any | { textstyle?: any|geotoolkit.attributes.TextStyle; fillstyle?: any|geotoolkit.attributes.FillStyle; linestyle?: any|geotoolkit.attributes.LineStyle; visible?: boolean; alignment?: geotoolkit.util.AnchorType; padding?: number; radius?: number; textconverter?: Function; } ): this;
                /**
                 * Sets the text style of labels
                 * @param textStyle  (Required) for the crosshair labels on screen, either textStyle or
                          object with "west", "east", "north", "south", "center" textStyle's
                 */
                setTextStyle(textStyle: geotoolkit.attributes.TextStyle|any): this;
                /**
                 * Sets vertical line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setVerticalLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * return vertical line style
                 */
                getVerticalLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Sets vertical line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setHorizontalLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * return horizontal line style
                 */
                getHorizontalLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * return visible state
                 */
                isVisible(): boolean;
                /**
                 * Sets visible
                 * @param visible  (Required) visible attribute set or not
                 */
                setVisible(visible: boolean): this;
                /**
                 * The current cross hair position
                 */
                getPosition(): geotoolkit.util.Point;
                /**
                 * Update position of cursor for the last mouse position. This code can be used
                 * if content is scrolled to display the position of the cursor in the last mouse position
                 * @param silent  (Optional) notification enabled or not
                 */
                updateCursorPosition(silent?: boolean): this;
                /**
                 * Sets the current position in model coordinates of the manipulator layer
                 * @param position  (Required) current mouse position
                 * @param silent  (Optional) notification enabled or not
                 * @param eventArgs  (Optional) additional event args
                 */
                setPosition(position: geotoolkit.util.Point, silent?: boolean, eventArgs?: any): this;
                /**
                 * @param position  (Required) of the label to be changed
                 * @param textConverter  (Required) function that takes x and y to convert to text for the label
                 */
                setLabelsTextConverter(position: geotoolkit.controls.tools.CrossHair.LabelPositions, textConverter: Function): this;
                /**
                 * @param draw  (Required) draw the crosshair labels on screen, either boolean or
                          object with "west", "east", "north", "south", "center"  booleans
                 */
                drawLabels(draw: boolean|any): any;
            }
            /**
             * Provides HTML based tooltip tool to display content information
             * <p>
             *     To initialize it is necessary to add div element on your page and specify styles:
             * </p>
             */
            class ToolTipTool extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * Provides HTML based tooltip tool to display content information
                 * <p>
                 *     To initialize it is necessary to add div element on your page and specify styles:
                 * </p>
                 * @param options  (Required) tool options
                 * @param options.group  (Optional) manipulator layer @deprecated use 'layer' instead
                 * @param options.layer  (Optional) manipulator layer
                 * @param options.name  (Optional) name of the tool
                 * @param options.divelement  (Optional) HTML div container element or it will be created with className cg-tooltip-container
                 * @param options.offsetx  (Optional) offset of tooltip from current position by x in pixels
                 * @param options.offsety  (Optional) offset of tooltip from current position by y in pixels
                 * @param options.alignment  (Optional) tooltip alignment according to the point set by offsets
                 * @param options.mode  (Optional) tooltip appearance mode
                 * @param options.callback  (Optional) callback to return information about the current position
                 * @param options.init  (Optional) callback function to initialize tool
                 * @param options.autoupdate  (Optional) true if tooltip info should be auto updated after layer.invalidate() was called
                 */
                constructor(options: any | { group?: geotoolkit.scene.CompositeNode; layer?: geotoolkit.scene.CompositeNode; name?: string; divelement?: HTMLElement; offsetx?: number; offsety?: number; alignment?: geotoolkit.util.AnchorType; mode?: geotoolkit.controls.tools.PointerMode|string; callback?: Function; init?: Function; autoupdate?: boolean; } );
                /**
                 * Sets tooltip offset x
                 * @param offsetX  (Required) offset x
                 */
                setOffsetX(offsetX: number): this;
                /**
                 * Sets tooltip offset y
                 * @param offsetY  (Required) offset y
                 */
                setOffsetY(offsetY: number): this;
                /**
                 * Sets tooltip options
                 * @param options  (Optional) options
                 * @param options.offsetx  (Optional) offset of tooltip from current position by x in pixels
                 * @param options.offsety  (Optional) offset of tooltip from current position by y in pixels
                 * @param options.alignment  (Optional) tooltip alignment according to the point set by offsets
                 * @param options.autoupdate  (Optional) true if tooltip info should be auto updated after layer.invalidate() was called
                 */
                setOptions(options?: any | { offsetx?: number; offsety?: number; alignment?: geotoolkit.util.AnchorType; autoupdate?: boolean; } ): this;
                /**
                 * Updates tooltip information using previous tooltip point
                 */
                updateInfo(): this;
                /**
                 * set radius for touch selection
                 * @param radius  (Required) radius for touch selection
                 */
                setTouchRadius(radius: number): this;
                /**
                 * set radius for mouse selection
                 * @param radius  (Required) radius for mouse selection
                 */
                setMouseRadius(radius: number): this;
                /**
                 * get radius for touch selection
                 */
                getTouchRadius(): number;
                /**
                 * get radius for mouse selection
                 */
                getMouseRadius(): number;
            }
            class PanningEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * @param eventArgs  (Required) contains info about the event
                 * @param direction  (Optional) direction of the object
                 * @param direction.x  (Optional) direction x of the panning
                 * @param direction.y  (Optional) direction y of the panning
                 * @param wheel  (Optional) is eventArgs is wheel event args
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs, direction?: any | { x?: number; y?: number; } , wheel?: boolean);
                /**
                 * Return wheel flag
                 */
                isWheel(): boolean;
                /**
                 * Return direction object for e.g.: {'x': 0 ,'y': -10} will go
                 */
                getDirection(): any;
            }
            /**
             * Defines a Panning tool for the target or object to pan. It supports various events shown below and has builtin functions to capture the panning direction and wheel ratios.<br>
             * User can use the default panning function or customize the function and add listeners.
             */
            class Panning extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * Defines a Panning tool for the target or object to pan. It supports various events shown below and has builtin functions to capture the panning direction and wheel ratios.<br>
                 * User can use the default panning function or customize the function and add listeners.
                 * @param options  (Optional) options for the tool
                 * @param options.name  (Optional) tool name
                 * @param options.wheelratio  (Optional) number that represent the number default
                 * @param options.acceptx  (Optional) 
                 * @param options.inertiacoef  (Optional) inertia coefficient for kinetic effect
WARNING: if you set positive inertia coefficient, some panning events'll be fired with null eventArgs
                 */
                constructor(options?: any | { name?: string; wheelratio?: number; acceptx?: boolean; inertiacoef?: number|boolean; } );
                /**
                 * Panning Events
                 */
                static Events: any;
                /**
                 * returns Panning direction
                 * @param eventArgs  (Required) contains info of the event
                 */
                getDirection(eventArgs: geotoolkit.controls.tools.EventArgs): {obj:{x:number;y:number;start:{x:number;y:number};end:{x:number;y:number}}}|any;
                /**
                 * Sets the target for panning
                 * @param target  (Required) the target for panning
                 * @param translateMethod  (Optional) method that is responsible to translate the target
                 */
                setTarget(target: geotoolkit.scene.Group, translateMethod?: Function|any): this;
                /**
                 * returns acceptX
                 */
                getAcceptX(): boolean;
                /**
                 * set acceptX
                 * @param acceptX  (Required) 
                 */
                setAcceptX(acceptX: boolean): this;
                /**
                 * returns wheel ratio
                 */
                getWheelRatio(): number;
                /**
                 * set wheel ratio
                 * @param ratio  (Required) wheel ratio
                 */
                setWheelRatio(ratio: number): this;
                /**
                 * set enable state
                 * @param enabled  (Required) state enables or not
                 */
                setEnabled(enabled: boolean): this;
                /**
                 * Sets inertia coefficient for kinetic effect while panning
                 * WARNING: if you set positive inertia coefficient, some panning events'll be fired with null eventArgs
                 * @param inertiaCoef  (Required) inertia coefficient
                 */
                setInertia(inertiaCoef: number|boolean): this;
            }
            class RubberBandEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * @param eventArgs  (Required) contains info about the event
                 * @param area  (Required) selected area in the model coordinates
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs, area: geotoolkit.util.Rect);
                /**
                 * Return a selected area in the model coordinates
                 */
                getArea(): geotoolkit.util.Rect;
            }
            /**
             * RubberBand tool supports several events as shown below and it has several builtin functions to customise the tool.<br>
             * The rendering is based on the {@link geotoolkit.controls.tools.RubberBandRenderMode}.
             * <br>
             * <br>
             * <h5>Events {@link geotoolkit.controls.tools.RubberBand.Events}</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Event</th><th>Arguments</th><th>Description</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>onZoomStart</td>
             *              <td>{@link geotoolkit.controls.tools.RubberBandEventArgs}</td>
             *              <td>This Event is fired when the RubberBand Tool left button click occurs.</td>
             *          </tr>
             *          <tr>
             *              <td>onZoomEnd</td>
             *              <td>{@link geotoolkit.controls.tools.RubberBandEventArgs}</td>
             *              <td>This Event is fired when the RubberBand Tool left button click is released.</td>
             *          </tr>
             *          <tr>
             *              <td>onRangeChanged</td>
             *              <td>{@link geotoolkit.controls.tools.RubberBandEventArgs}</td>
             *              <td>This Event is fired when the RubberBand Tool is moving.</td>
             *          </tr>
             *      <tbody>
             *  </table>
             *  <br>
             * 
             * Tool name: 'rubberband'
             */
            class RubberBand extends geotoolkit.controls.tools.AbstractRubberTool {
                /**
                 * RubberBand tool supports several events as shown below and it has several builtin functions to customise the tool.<br>
                 * The rendering is based on the {@link geotoolkit.controls.tools.RubberBandRenderMode}.
                 * <br>
                 * <br>
                 * <h5>Events {@link geotoolkit.controls.tools.RubberBand.Events}</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>onZoomStart</td>
                 *              <td>{@link geotoolkit.controls.tools.RubberBandEventArgs}</td>
                 *              <td>This Event is fired when the RubberBand Tool left button click occurs.</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onZoomEnd</td>
                 *              <td>{@link geotoolkit.controls.tools.RubberBandEventArgs}</td>
                 *              <td>This Event is fired when the RubberBand Tool left button click is released.</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onRangeChanged</td>
                 *              <td>{@link geotoolkit.controls.tools.RubberBandEventArgs}</td>
                 *              <td>This Event is fired when the RubberBand Tool is moving.</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * 
                 * Tool name: 'rubberband'
                 * @param manipulatorGroup  (Required) used to display temporary shapes
                 * @param mode  (Optional) render mode
                 */
                constructor(manipulatorGroup: geotoolkit.scene.Group, mode?: geotoolkit.controls.tools.RubberBandRenderMode);
                /**
                 * RubberBand Events
                 */
                static Events: any;
                /**
                 * set minimum selection dimension
                 * @param minDimension  (Required) minimum selection dimension
                 * @param isInDevice  (Optional) true if in device coordinates
                 */
                setMinDimension(minDimension: geotoolkit.util.Dimension, isInDevice?: boolean): this;
                /**
                 * Get minimum selection dimension
                 */
                getMinDimension(): geotoolkit.util.Dimension;
                /**
                 * set minimum dimension mode
                 * @param mode  (Required) minimum dimension mode
                 */
                setMinDimensionMode(mode: geotoolkit.controls.tools.RubberBand.MinimumDimensionMode): this;
                /**
                 * Get minimum dimension mode
                 */
                getMinDimensionMode(): geotoolkit.controls.tools.RubberBand.MinimumDimensionMode;
                /**
                 * Enum of rubberband Minimum Dimension modes
                 */
                static MinimumDimensionMode: any;
                /**
                 * Sets rubberband rendering mode
                 * @param mode  (Required) rubberband rendering mode
                 */
                setMode(mode: geotoolkit.controls.tools.RubberBandRenderMode): this;
                /**
                 * Set auto-disabled mode
                 * @param mode  (Required) does the RB automatically disable itself on zoom End
                 */
                setAutoDisabled(mode: boolean): this;
                /**
                 * Get auto-disabled mode
                 */
                isAutoDisabled(): boolean;
                /**
                 * Gets rubberband rendering mode
                 */
                getMode(): geotoolkit.controls.tools.RubberBandRenderMode;
                /**
                 * Sets the rubberbands Target
                 * @param target  (Required) rubberbands Target
                 */
                setTarget(target: geotoolkit.scene.CompositeNode): this;
                /**
                 * Sets line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Sets fill style
                 * @param fillStyle  (Required) a new fill style
                 * @param fillStyle.color  (Optional) color
                 * @param fillStyle.pattern  (Optional) pattern
                 * @param fillStyle.foreground  (Optional) foreground color
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
                /**
                 * Set Settings
                 * @param options  (Optional) JSON containing options
                 * @param options.enabled  (Optional) is rubber band enabled
                 * @param options.linestyle  (Optional) rubber band linestyle
                 * @param options.fillstyle  (Optional) rubber band fillstyle
                 * @param options.autodisabled  (Optional) does rubber band automatically disabled on zoom end
                 */
                setSettings(options?: any | { enabled?: boolean; linestyle?: any|geotoolkit.attributes.LineStyle; fillstyle?: any|geotoolkit.attributes.FillStyle; autodisabled?: boolean; } ): this;
            }
            class PolygonToolEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * @param eventArgs  (Required) contains info about the event
                 * @param coordinates  (Required) 
                 * @param coordinates.x  (Required) x coordinate
                 * @param coordinates.y  (Required) y coordinate
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs, coordinates: any | { x?: number[]; y?: number[]; } );
                /**
                 * Gets polygon's coordinates in model coordinates
                 */
                getCoordinates(): any;
            }
            /**
             * PolygonTool
             * <br>
             * <br>
             * <h5>Events {@link geotoolkit.controls.tools.PolygonTool}</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Event</th><th>Arguments</th><th>Description</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>onStart</td>
             *              <td>{@link geotoolkit.controls.tools.PolygonToolEventArgs}</td>
             *              <td>This Event is fired when very first left button click occurs.</td>
             *          </tr>
             *          <tr>
             *              <td>onContinue</td>
             *              <td>{@link geotoolkit.controls.tools.PolygonToolEventArgs}</td>
             *              <td>This Event is fired when subsequent left button clicks occurs.</td>
             *          </tr>
             *          <tr>
             *              <td>onEnd</td>
             *              <td>{@link geotoolkit.controls.tools.PolygonToolEventArgs}</td>
             *              <td>This Event is fired when right button click occurs.</td>
             *          </tr>
             *      <tbody>
             *  </table>
             *  <br>
             * Tool name: 'polygontool'
             */
            class PolygonTool extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * PolygonTool
                 * <br>
                 * <br>
                 * <h5>Events {@link geotoolkit.controls.tools.PolygonTool}</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>onStart</td>
                 *              <td>{@link geotoolkit.controls.tools.PolygonToolEventArgs}</td>
                 *              <td>This Event is fired when very first left button click occurs.</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onContinue</td>
                 *              <td>{@link geotoolkit.controls.tools.PolygonToolEventArgs}</td>
                 *              <td>This Event is fired when subsequent left button clicks occurs.</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onEnd</td>
                 *              <td>{@link geotoolkit.controls.tools.PolygonToolEventArgs}</td>
                 *              <td>This Event is fired when right button click occurs.</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * Tool name: 'polygontool'
                 * @param manipulatorLayer  (Required) manipulator layer
                 */
                constructor(manipulatorLayer: geotoolkit.scene.CompositeNode);
                /**
                 * PolygonTool Events
                 */
                static Events: any;
                /**
                 * Sets line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Return line style
                 */
                getLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Sets fill style
                 * @param fillStyle  (Required) a new fill style
                 * @param fillStyle.color  (Optional) color
                 * @param fillStyle.pattern  (Optional) pattern
                 * @param fillStyle.foreground  (Optional) foreground color
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
                /**
                 * Sets line style of the start and end symbols
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setSymbolLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Return symbol line style
                 */
                getSymbolLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Sets fill style of the start and end symbols
                 * @param fillStyle  (Required) a new fill style
                 * @param fillStyle.color  (Optional) color
                 * @param fillStyle.pattern  (Optional) pattern
                 * @param fillStyle.foreground  (Optional) foreground color
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setSymbolFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
                /**
                 * Sets visibility of the start and end symbols.
                 * @param visible  (Required) visibility of symbols
                 */
                setSymbolVisibility(visible: boolean): this;
                /**
                 * Sets visibility of the start line.
                 * @param visible  (Required) visibility of line
                 */
                setStartLineVisibility(visible: boolean): this;
                /**
                 * Sets visibility of the text.
                 * @param visible  (Required) visibility of text
                 */
                setTextVisibility(visible: boolean): this;
                /**
                 * Sets text style of the text.
                 * @param textStyle  (Required) text style of text
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setTextStyle(textStyle: geotoolkit.attributes.TextStyle|string|any, merge?: boolean): this;
                /**
                 */
                getPolygon(): geotoolkit.scene.shapes.Polygon|any;
                /**
                 */
                protected onEnabledStateChanged(): any;
                /**
                 * Remove last point from selection area
                 */
                removeLastPoint(): this;
            }
            /**
             * SelectionEventArgs
             */
            class SelectionEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * SelectionEventArgs
                 * @param eventArgs  (Required) contains info about the event arguments
                 * @param selection  (Required) array of selected nodes
                 * @param selectionMode  (Required) 
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs, selection: geotoolkit.scene.Node[], selectionMode: geotoolkit.controls.tools.SelectionMode|string);
                /**
                 * returns selection mode
                 */
                getSelectionMode(): geotoolkit.controls.tools.SelectionMode|string;
                /**
                 * returns array of selected nodes
                 */
                getSelection(): geotoolkit.scene.Node[];
                /**
                 * set array of selected nodes
                 * @param selection  (Required) array of selected nodes
                 */
                setSelection(selection: geotoolkit.scene.Node[]): this;
            }
            /**
             * Selection
             * <br>
             * <br>
             * <h5>Events {@link geotoolkit.controls.tools.Selection.Events}</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Event</th><th>Arguments</th><th>Description</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>onPick</td>
             *              <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
             *              <td>This Event is fired when the Selection Tool select a visual.</td>
             *          </tr>
             *          <tr>
             *              <td>onSelectionEnd</td>
             *              <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
             *              <td>This Event is fired when the Selection Tool select a visual. (similar to Selection.Events.onPick)</td>
             *          </tr>
             *          <tr>
             *              <td>onSelectionChanged</td>
             *              <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
             *              <td>This Event is fired when the Selection Tool select a visual and it is different from previous selection.</td>
             *          </tr>
             *          <tr>
             *              <td>beforeSelectionChange</td>
             *              <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
             *              <td>This Event is fired before the Selection Tool select a visual and it is different from previous selection.</td>
             *          </tr>
             *          <tr>
             *              <td>onDoubleClick</td>
             *              <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
             *              <td>This Event is fired when the Selection Tool select a visual with a double click.</td>
             *          </tr>
             *      <tbody>
             *  </table>
             *  <br>
             * 
             * Tool name: 'pick'
             */
            class Selection extends geotoolkit.controls.tools.AbstractRubberTool {
                /**
                 * Selection
                 * <br>
                 * <br>
                 * <h5>Events {@link geotoolkit.controls.tools.Selection.Events}</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>onPick</td>
                 *              <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
                 *              <td>This Event is fired when the Selection Tool select a visual.</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onSelectionEnd</td>
                 *              <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
                 *              <td>This Event is fired when the Selection Tool select a visual. (similar to Selection.Events.onPick)</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onSelectionChanged</td>
                 *              <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
                 *              <td>This Event is fired when the Selection Tool select a visual and it is different from previous selection.</td>
                 *          </tr>
                 *          <tr>
                 *              <td>beforeSelectionChange</td>
                 *              <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
                 *              <td>This Event is fired before the Selection Tool select a visual and it is different from previous selection.</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onDoubleClick</td>
                 *              <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
                 *              <td>This Event is fired when the Selection Tool select a visual with a double click.</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * 
                 * Tool name: 'pick'
                 * @param manipulatorGroup  (Required) used to display temporary shapes
                 * @param mode  (Optional) render mode, the rubberband selection mode, this will define how the rubberband will behave when selecting a rectangle
                 */
                constructor(manipulatorGroup: geotoolkit.scene.CompositeNode, mode?: geotoolkit.controls.tools.RubberBandRenderMode|number);
                /**
                 * Selection Events
                 */
                static Events: any;
                /**
                 * set radius for touch selection
                 * @param radius  (Required) radius for touch selection
                 */
                setTouchRadius(radius: number): this;
                /**
                 * set radius for mouse selection
                 * @param radius  (Required) radius for mouse selection
                 */
                setMouseRadius(radius: number): this;
                /**
                 * get radius for touch selection
                 */
                getTouchRadius(): number;
                /**
                 * get radius for mouse selection
                 */
                getMouseRadius(): number;
                /**
                 * set tool selection mode
                 * @param mode  (Required) tool selection mode
                 */
                setSelectionMode(mode: geotoolkit.controls.tools.SelectionMode|string): this;
                /**
                 * get tool selection mode
                 */
                getSelectionMode(): geotoolkit.controls.tools.SelectionMode|string;
                /**
                 * Sets tool rubberband selection mode
                 * @param mode  (Required) tool rubberband selection mode
                 */
                setRubberBandMode(mode: geotoolkit.controls.tools.RubberBandMode|string): this;
                /**
                 * Gets tool rubberband selection mode
                 */
                getRubberBandMode(): geotoolkit.controls.tools.RubberBandMode|string;
                /**
                 * Sets tool pointer selection mode
                 * @param mode  (Required) tool pointer selection mode
                 */
                setPointerMode(mode: geotoolkit.controls.tools.PointerMode|string): this;
                /**
                 * Gets tool pointer selection mode
                 */
                getPointerMode(): geotoolkit.controls.tools.PointerMode|string;
                /**
                 * sets if on Hover selection is enabled
                 * @param state  (Required) sets if on Hover selection is enabled
                 */
                setOnHoverSelection(state: boolean): this;
                /**
                 * gets if on hover selection is enabled
                 */
                getOnHoverSelection(): boolean;
                /**
                 * set filter handler
                 * @param filter  (Required) This allows to filter selected nodes.
                 */
                setNodeFilter(filter: Function): this;
                /**
                 * Return start point of selection
                 */
                getStartPoint(): geotoolkit.util.Point;
                /**
                 * Return end point of selection
                 */
                getEndPoint(): geotoolkit.util.Point;
                /**
                 * pick node
                 * @param x  (Required) x coordinate
                 * @param y  (Required) y coordinate
                 */
                pick(x: number, y: number): geotoolkit.scene.Node[];
                /**
                 * gets the currently selected items
                 */
                getSelection(): geotoolkit.scene.Node[];
                /**
                 * sets the currently selected items
                 * @param selection  (Required) selection
                 */
                setSelection(selection: geotoolkit.scene.Node[]): this;
                /**
                 * Sets line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Sets fill style
                 * @param fillStyle  (Required) a new fill style
                 * @param fillStyle.color  (Optional) color
                 * @param fillStyle.pattern  (Optional) pattern
                 * @param fillStyle.foreground  (Optional) foreground color
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
                /**
                 * Set Settings
                 * @param options  (Optional) JSON containing options
                 * @param options.enabled  (Optional) is selection enabled
                 * @param options.mode  (Optional) selection mode
                 * @param options.linestyle  (Optional) rubber band selection linestyle
                 * @param options.fillstyle  (Optional) rubber band selection fillstyle
                 * @param options.autodisabled  (Optional) does selection automatically disabled on selection changed
                 * @param options.mouseradius  (Optional) apply mouse selection radius setting
                 * @param options.touchradius  (Optional) apply touch selection radius setting
                 */
                setSettings(options?: any | { enabled?: boolean; mode?: geotoolkit.controls.tools.SelectionMode|string; linestyle?: any|geotoolkit.attributes.LineStyle; fillstyle?: any|geotoolkit.attributes.FillStyle; autodisabled?: boolean; mouseradius?: number; touchradius?: number; } ): this;
                /**
                 * Set auto-disabled mode
                 * @param mode  (Required) does the selection automatically disable itself on selection changed
                 */
                setAutoDisabled(mode: boolean): this;
                /**
                 * Get auto-disabled mode
                 */
                isAutoDisabled(): boolean;
            }
            class PinchToZoomEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * @param eventArgs  (Required) contains info about the event
                 * @param visibleModelLimits  (Required) visible model limits
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs, visibleModelLimits: geotoolkit.util.Rect);
                /**
                 * Returns the visible model limits
                 */
                getVisibleModelLimits(): geotoolkit.util.Rect;
            }
            /**
             * PinchToZoom tool
             * <br>
             * <br>
             * <h5>Events {@link geotoolkit.controls.tools.PinchToZoom.Events}</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Event</th><th>Arguments</th><th>Description</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>onZoomStart</td>
             *              <td>{@link geotoolkit.controls.tools.PinchToZoomEventArgs}</td>
             *              <td>This Event is fired when the Pinch To Zoom Tool start Zooming</td>
             *          </tr>
             *          <tr>
             *              <td>onZoom</td>
             *              <td>{@link geotoolkit.controls.tools.PinchToZoomEventArgs}</td>
             *              <td>This Event is fired when the Pinch To Zoom Tool is Zooming</td>
             *          </tr>
             *          <tr>
             *              <td>onZoomEnd</td>
             *              <td>{@link geotoolkit.controls.tools.PinchToZoomEventArgs}</td>
             *              <td>This Event is fired when the Pinch To Zoom Tool end Zooming</td>
             *          </tr>
             *      <tbody>
             *  </table>
             *  <br>
             * Tool name: 'pinchtozoom'
             */
            class PinchToZoom extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * PinchToZoom tool
                 * <br>
                 * <br>
                 * <h5>Events {@link geotoolkit.controls.tools.PinchToZoom.Events}</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>onZoomStart</td>
                 *              <td>{@link geotoolkit.controls.tools.PinchToZoomEventArgs}</td>
                 *              <td>This Event is fired when the Pinch To Zoom Tool start Zooming</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onZoom</td>
                 *              <td>{@link geotoolkit.controls.tools.PinchToZoomEventArgs}</td>
                 *              <td>This Event is fired when the Pinch To Zoom Tool is Zooming</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onZoomEnd</td>
                 *              <td>{@link geotoolkit.controls.tools.PinchToZoomEventArgs}</td>
                 *              <td>This Event is fired when the Pinch To Zoom Tool end Zooming</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * Tool name: 'pinchtozoom'
                 * @param layer  (Required) layer on which pinch to zoom will be performed
                 * @param mode  (Optional) enum of PinchToZoomModes
                 */
                constructor(layer: geotoolkit.scene.CompositeNode, mode?: geotoolkit.controls.tools.PinchToZoomModes);
                /**
                 * PinchToZoom Events
                 */
                static Events: any;
                /**
                 * Sets zoom mode
                 * @param mode  (Optional) enum of PinchToZoomModes
                 */
                setMode(mode?: geotoolkit.controls.tools.PinchToZoomModes): this;
                /**
                 * Return position relative to the canvas
                 * @param eventArgs  (Required) info about the event arguments with respect to position
                 * @param externalPlot  (Required) optional parameter
                 */
                pageToCanvas(eventArgs: geotoolkit.controls.tools.EventArgs, externalPlot: geotoolkit.plot.Plot): geotoolkit.util.Point[];
            }
            class PolygonSelectionEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * @param eventArgs  (Required) contains info about the event
                 * @param selection  (Required) array of selected nodes
                 * @param coordinates  (Required) 
                 * @param coordinates.x  (Required) x coordinate
                 * @param coordinates.y  (Required) y coordinate
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs, selection: geotoolkit.scene.Node[], coordinates: any | { x?: number[]; y?: number[]; } );
                /**
                 * gets array of selected nodes
                 */
                getSelection(): geotoolkit.scene.Node[];
                /**
                 * set selection
                 * @param selection  (Required) array of selected nodes
                 */
                setSelection(selection: geotoolkit.scene.Node[]): this;
            }
            /**
             * PolygonSelection
             * <br>
             * <br>
             * <h5>Events {@link geotoolkit.controls.tools.PolygonSelection.Events}</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Event</th><th>Arguments</th><th>Description</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>onSelectionEnd</td>
             *              <td>{@link geotoolkit.controls.tools.PolygonSelectionEventArgs}</td>
             *              <td>This Event is fired when the Selection Tool select a visual. (similar to Selection.Events.onPick)</td>
             *          </tr>
             *          <tr>
             *              <td>onSelectionChanged</td>
             *              <td>{@link geotoolkit.controls.tools.PolygonSelectionEventArgs}</td>
             *              <td>This Event is fired when the Selection Tool select a visual and it is different from previous selection.</td>
             *          </tr>
             *          <tr>
             *              <td>beforeSelectionChange</td>
             *              <td>{@link geotoolkit.controls.tools.PolygonSelectionEventArgs}</td>
             *              <td>This Event is fired before the Selection Tool select a visual and it is different from previous selection.</td>
             *          </tr>
             *      <tbody>
             *  </table>
             *  <br>
             * 
             * Tool name: 'polygon-selection'
             */
            class PolygonSelection extends geotoolkit.controls.tools.PolygonTool {
                /**
                 * PolygonSelection
                 * <br>
                 * <br>
                 * <h5>Events {@link geotoolkit.controls.tools.PolygonSelection.Events}</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>onSelectionEnd</td>
                 *              <td>{@link geotoolkit.controls.tools.PolygonSelectionEventArgs}</td>
                 *              <td>This Event is fired when the Selection Tool select a visual. (similar to Selection.Events.onPick)</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onSelectionChanged</td>
                 *              <td>{@link geotoolkit.controls.tools.PolygonSelectionEventArgs}</td>
                 *              <td>This Event is fired when the Selection Tool select a visual and it is different from previous selection.</td>
                 *          </tr>
                 *          <tr>
                 *              <td>beforeSelectionChange</td>
                 *              <td>{@link geotoolkit.controls.tools.PolygonSelectionEventArgs}</td>
                 *              <td>This Event is fired before the Selection Tool select a visual and it is different from previous selection.</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * 
                 * Tool name: 'polygon-selection'
                 * @param manipulatorGroup  (Required) used to display temporary shapes
                 */
                constructor(manipulatorGroup: geotoolkit.scene.Group);
                /**
                 * PolygonSelection Events
                 */
                static Events: any;
                /**
                 * gets the currently selected items
                 */
                getSelection(): any[];
                /**
                 * set filter handler
                 * @param filter  (Required) This allows to filter selected nodes.
                 */
                setNodeFilter(filter: Function): this;
                /**
                 * Set allow intersection
                 * @param mode  (Required) will this select items that intersect
                 */
                setAllowIntersection(mode: boolean): this;
                /**
                 * Get allow intersection
                 */
                getAllowIntersection(): boolean;
                /**
                 * Set even odd mode
                 * @param mode  (Required) even odd mode
                 */
                setEvenOddMode(mode: boolean): this;
                /**
                 * Get even odd mode
                 */
                getEvenOddMode(): boolean;
                /**
                 * Set auto-disabled mode
                 * @param mode  (Required) does the selection automatically disable itself on selection changed
                 */
                setAutoDisabled(mode: boolean): this;
                /**
                 * Get auto-disabled mode
                 */
                isAutoDisabled(): boolean;
            }
            /**
             * Add cursor to colorbar, which shows value from group
             */
            class ColorBarCursorTool extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * Add cursor to colorbar, which shows value from group
                 * @param options  (Required) tool options
                 * @param options.colorbar  (Required) color bar
                 * @param options.name  (Optional) name of the tool
                 * @param options.offset  (Optional) offset of cursor across color bar
                 * @param options.group  (Optional) manipulator layer, by default parent of color bar
                 * @param options.symbolalignment  (Optional) option of orientation of cursor
                 * @param options.symbol  (Optional) symbol, by default black triangle
                 * @param options.callback  (Optional) callback to return current position in terms of value for colorbar
                 * @param options.init  (Optional) callback function to initialize tool
                 */
                constructor(options: any | { colorbar?: geotoolkit.controls.shapes.ColorBar; name?: string; offset?: number; group?: geotoolkit.scene.CompositeNode; symbolalignment?: geotoolkit.controls.tools.ColorBarCursorTool.SymbolAlignment; symbol?: geotoolkit.scene.shapes.Symbol; callback?: Function; init?: Function; } );
                /**
                 * Enum for symbol alignment
                 */
                static SymbolAlignment: any;
                /**
                 * set cursor offset across the colorbar
                 * @param offset  (Required) offset
                 */
                setOffset(offset: number): this;
                /**
                 * set cursor position along the colorbar
                 * @param position  (Required) position
                 */
                setPosition(position: number): this;
                /**
                 * update cursor position along the colorbar
                 */
                updatePosition(): this;
                /**
                 * Sets new symbol
                 * @param symbol  (Required) new symbol
                 */
                setSymbol(symbol: geotoolkit.scene.shapes.Symbol): this;
            }
            /**
             * This tool provides DOM features into geotoolkit scene <br>
             *   1. events like click, mouseover etc. <br>
             *   2. css pseudo-class 'hover', by default this tool sets 'hover' on top most node <br>
             *   If you want another strategy you should use geotoolkit.controls.tools.DOMSupport#setNodeFilter.
             *   This tool sets 'hover' on all nodes returned by this filter
             */
            class DOMSupport extends geotoolkit.controls.tools.Selection {
                /**
                 * This tool provides DOM features into geotoolkit scene <br>
                 *   1. events like click, mouseover etc. <br>
                 *   2. css pseudo-class 'hover', by default this tool sets 'hover' on top most node <br>
                 *   If you want another strategy you should use geotoolkit.controls.tools.DOMSupport#setNodeFilter.
                 *   This tool sets 'hover' on all nodes returned by this filter
                 * @param layer  (Required) manipulator layer
                 */
                constructor(layer: geotoolkit.scene.CompositeNode);
            }
            /**
             * Enum for the rendering of the rubber band tool
             */
            interface RubberBandRenderMode {
                /**
                 * As is - no modifications to resize area
                 */
                Free: number;
                /**
                 * Horizontal resize only
                 */
                Horizontal: number;
                /**
                 * Vertical resize only
                 */
                Vertical: number;
                /**
                 * Keep aspect ratio resize
                 */
                AspectRatio: number;
            }
            /**
             * Enums of Selection Mode
             */
            interface SelectionMode {
                /**
                 * Pointer
                 */
                Pointer: string;
                /**
                 * RubberBand
                 */
                RubberBand: string;
            }
            /**
             * Enums of RubberBand Selection Mode
             */
            interface RubberBandMode {
                /**
                 * Collision
                 *  will select if the object is touching the section rect
                 */
                Collision: string;
                /**
                 * Inside
                 *  will only select if the object is completely inside the section rect
                 */
                Inside: string;
            }
            /**
             * Enums of Pointer Selection Mode
             */
            interface PointerMode {
                /**
                 * Hover
                 *  will select if the object is under the mouse pointer
                 */
                Hover: string;
                /**
                 * Click
                 *  will select if the object is under the pointer while clicking
                 */
                Click: string;
                /**
                 * MouseDown
                 * will select if the object pressed under the pointer
                 */
                MouseDown: string;
                /**
                 * MouseUp
                 * will select if the object released under the pointer
                 */
                MouseUp: string;
                /**
                 * DoubleClick
                 * will select if the object is double clicked
                 */
                DoubleClick: string;
                /**
                 * TapHold
                 * will select if the object is long pressed
                 */
                TapHold: string;
            }
            /**
             * PinchToZoomModes enum
             */
            interface PinchToZoomModes {
                /**
                 * X
                 */
                X: number;
                /**
                 * Y
                 */
                Y: number;
                /**
                 * XY
                 */
                XY: number;
                /**
                 * Zoom from the Center Point of the visible area
                 */
                Center: number;
                /**
                 * Zoom from the users' touch point
                 */
                TouchPoint: number;
            }
            module tableview {
                /**
                 * Hover event args for table view
                 */
                class HoverEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                    /**
                     * Hover event args for table view
                     * @param eventArgs  (Required) info about arguments of the event
                     * @param row  (Required) rows
                     * @param column  (Required) columns
                     * @param mousePosition  (Required) 
                     */
                    constructor(eventArgs: geotoolkit.controls.tools.EventArgs, row: number, column: number, mousePosition: geotoolkit.util.Point);
                    /**
                     * Return row
                     */
                    getRowNumber(): number;
                    /**
                     * Return column
                     */
                    getColumnNumber(): number;
                    /**
                     * Return mouse position in cell coordinate
                     */
                    getMousePosition(): geotoolkit.util.Point;
                }
                /**
                 * Defines Highlight tool for Table View shape
                 * <br>
                 * <br>
                 * <h5>Events</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>Highlight.Events.onHover</td>
                 *              <td>geotoolkit.controls.tools.tableview.HoverEventArgs</td>
                 *              <td>This Event is fired when the Pointer is hover an table element.</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * 
                 * Tool name: 'Highlight'
                 */
                class Highlight extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Defines Highlight tool for Table View shape
                     * <br>
                     * <br>
                     * <h5>Events</h5>
                     * <table class="params">
                     *     <thead>
                     *          <tr>
                     *              <th>Event</th><th>Arguments</th><th>Description</th>
                     *          </tr>
                     *      </thead>
                     *      <tbody>
                     *          <tr>
                     *              <td>Highlight.Events.onHover</td>
                     *              <td>geotoolkit.controls.tools.tableview.HoverEventArgs</td>
                     *              <td>This Event is fired when the Pointer is hover an table element.</td>
                     *          </tr>
                     *      <tbody>
                     *  </table>
                     *  <br>
                     * 
                     * Tool name: 'Highlight'
                     * @param tableView  (Required) current Table View Shape
                     */
                    constructor(tableView: geotoolkit.controls.shapes.TableView);
                    /**
                     * Events
                     */
                    static Events: any;
                    /**
                     * Fires onHover events
                     * @param eventArgs  (Required) information about event arguments
                     */
                    onMouseMove(eventArgs: geotoolkit.controls.tools.EventArgs): any;
                }
                /**
                 * Defines Splitter tool for Table View shape
                 * 
                 * Tool name: 'Splitter'
                 */
                class Splitter extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Defines Splitter tool for Table View shape
                     * 
                     * Tool name: 'Splitter'
                     * @param tableView  (Required) table view shape
                     */
                    constructor(tableView: geotoolkit.controls.shapes.TableView);
                    /**
                     * Events
                     */
                    static Events: any;
                    /**
                     */
                    protected onActiveStateChanged(): any;
                    /**
                     * return splitter size
                     */
                    getSize(): number;
                    /**
                     * set splitter size
                     * @param size  (Required) splitter size
                     */
                    setSize(size: number): this;
                    /**
                     * Sets line style
                     * @param lineStyle  (Required) line style or options
                     * @param lineStyle.color  (Optional) line color
                     * @param lineStyle.width  (Optional) line width
                     * @param lineStyle.pattern  (Optional) line pattern
                     * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                     */
                    setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                    /**
                     * Return line style
                     */
                    getLineStyle(): geotoolkit.attributes.LineStyle;
                    /**
                     * Sets fill style
                     * @param fillStyle  (Required) a new fill style
                     * @param fillStyle.color  (Optional) color
                     * @param fillStyle.pattern  (Optional) pattern
                     * @param fillStyle.foreground  (Optional) foreground
                     */
                    setFillStyle(fillStyle: geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } ): this;
                    /**
                     * Return fill style
                     */
                    getFillStyle(): geotoolkit.attributes.FillStyle;
                    /**
                     * Fires onHover events
                     * @param plot  (Required) 
                     * @param position  (Required) 
                     */
                    applyMouseMove(plot: geotoolkit.plot.Plot, position: geotoolkit.util.Point): any;
                }
                /**
                 * Defines Column manipulator for Table View shape
                 * 
                 * Tool name: 'HeaderHandler'
                 */
                class HeaderHandler extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Defines Column manipulator for Table View shape
                     * 
                     * Tool name: 'HeaderHandler'
                     * @param tableView  (Required) table view shape
                     */
                    constructor(tableView: geotoolkit.controls.shapes.TableView);
                    /**
                     * Events
                     */
                    static Events: any;
                    /**
                     * Specify handle size
                     * @param size  (Required) 
                     */
                    setSize(size: geotoolkit.util.Dimension): this;
                    /**
                     * Returns handle size
                     */
                    getSize(): geotoolkit.util.Dimension;
                    /**
                     * Specify handle margin from top right corner
                     * @param margin  (Required) 
                     */
                    setMargin(margin: geotoolkit.util.Dimension): this;
                    /**
                     * Returns handle margin
                     */
                    getMargin(): geotoolkit.util.Dimension;
                }
                /**
                 * Defines Column manipulator for Table View shape
                 * 
                 * Tool name: 'ColumnHandler'
                 */
                class ColumnHandler extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Defines Column manipulator for Table View shape
                     * 
                     * Tool name: 'ColumnHandler'
                     * @param tableView  (Required) table view shape
                     */
                    constructor(tableView: geotoolkit.controls.shapes.TableView);
                    /**
                     * Events
                     */
                    static Events: any;
                    /**
                     */
                    protected onActiveStateChanged(): any;
                }
                /**
                 * Defines Row manipulator for Table View shape
                 * 
                 * Tool name: 'RowHandler'
                 */
                class RowHandler extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Defines Row manipulator for Table View shape
                     * 
                     * Tool name: 'RowHandler'
                     * @param tableView  (Required) table view shape
                     */
                    constructor(tableView: geotoolkit.controls.shapes.TableView);
                    /**
                     * Events
                     */
                    static Events: any;
                    /**
                     */
                    protected onActiveStateChanged(): any;
                }
                module Highlight {
                    /**
                     * Events
                     */
                    interface Events {
                        /**
                         * onHover
                         */
                        onHover: string;
                    }
                }
                module Splitter {
                    /**
                     * Events
                     */
                    interface Events {
                        /**
                         * onResize
                         */
                        onResize: string;
                    }
                }
                module HeaderHandler {
                    /**
                     * Events
                     */
                    interface Events {
                        /**
                         * onHeaderHover
                         */
                        onHeaderHover: string;
                        /**
                         * onButtonHover
                         */
                        onButtonHover: string;
                        /**
                         * onClick
                         */
                        onClick: string;
                    }
                }
                module ColumnHandler {
                    /**
                     * Events
                     */
                    interface Events {
                        /**
                         * onStart
                         */
                        onStart: string;
                        /**
                         * onHover
                         */
                        onHover: string;
                        /**
                         * onMove
                         */
                        onMove: string;
                        /**
                         * onScroll
                         */
                        onScroll: string;
                    }
                }
                module RowHandler {
                    /**
                     * Events
                     */
                    interface Events {
                        /**
                         * onStart
                         */
                        onStart: string;
                        /**
                         * onHover
                         */
                        onHover: string;
                        /**
                         * onMove
                         */
                        onMove: string;
                        /**
                         * onScroll
                         */
                        onScroll: string;
                    }
                }
            }
            module treemap {
                /**
                 * <p>TreemapLevelTool handles visualization of data according to hierarchy.</p>
                 */
                class TreemapLevelTool extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * <p>TreemapLevelTool handles visualization of data according to hierarchy.</p>
                     * @param options  (Required) tool options
                     * @param options.group  (Required) manipulator layer
                     * @param options.name  (Optional) name of the tool
                     * @param options.chart  (Optional) chart shape
                     * @param options.callback  (Optional) callback to return information about current level and it's parent nodes. callback return object {'list' :[...], 'action': 'added' / 'removed} depending on operation.
                     */
                    constructor(options: any | { group?: geotoolkit.scene.CompositeNode; name?: string; chart?: geotoolkit.controls.shapes.Treemap; callback?: Function; } );
                }
            }
            module HeatMap {
                /**
                 * Tool name: 'Highlight'
                 */
                class Highlight extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Tool name: 'Highlight'
                     * @param heatmap  (Required) current heat map shape
                     */
                    constructor(heatmap: geotoolkit.controls.shapes.HeatMap);
                    /**
                     * Highlight the cell when move the mouse
                     * @param eventArgs  (Required) information about event arguments
                     */
                    onMouseMove(eventArgs: geotoolkit.controls.tools.EventArgs): any;
                }
            }
            module splitter {
                /**
                 * HorizontalSplitterEventArgs
                 */
                class HorizontalSplitterEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                    /**
                     * HorizontalSplitterEventArgs
                     * @param eventArgs  (Required) info about the event argments
                     * @param delta  (Required) delta
                     * @param affectedPlots  (Required) json object contains information about affected plots
                     * @param affectedPlots.top  (Optional) top plot
                     * @param affectedPlots.bottom  (Optional) bottom plot
                     */
                    constructor(eventArgs: geotoolkit.controls.tools.EventArgs, delta: number, affectedPlots: any | { top?: geotoolkit.scene.Group|any; bottom?: geotoolkit.scene.Group|any; } );
                    /**
                     * Return effective delta
                     */
                    getDelta(): number;
                    /**
                     * Returns affected plots
                     */
                    getPlots(): {plots:{top:geotoolkit.scene.Group|any;bottom:geotoolkit.scene.Group|any}}|any;
                }
                /**
                 * Creates default implementation of the horizontal splitter
                 * 
                 * <br>
                 * <br>
                 * <h5>Events</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>HorizontalSplitter.Events.onPlotSizeChanged</td>
                 *              <td>geotoolkit.controls.tools.splitter.HorizontalSplitterEventArgs</td>
                 *              <td>This Event is fired when the Splitter has moved.</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * 
                 * Tool name: 'horizontal-splitter'
                 */
                class HorizontalSplitter extends geotoolkit.controls.tools.AbstractTool {
                    /**
                     * Creates default implementation of the horizontal splitter
                     * 
                     * <br>
                     * <br>
                     * <h5>Events</h5>
                     * <table class="params">
                     *     <thead>
                     *          <tr>
                     *              <th>Event</th><th>Arguments</th><th>Description</th>
                     *          </tr>
                     *      </thead>
                     *      <tbody>
                     *          <tr>
                     *              <td>HorizontalSplitter.Events.onPlotSizeChanged</td>
                     *              <td>geotoolkit.controls.tools.splitter.HorizontalSplitterEventArgs</td>
                     *              <td>This Event is fired when the Splitter has moved.</td>
                     *          </tr>
                     *      <tbody>
                     *  </table>
                     *  <br>
                     * 
                     * Tool name: 'horizontal-splitter'
                     * @param manipulatorLayer  (Required) layer for holding temporary shapes
                     */
                    constructor(manipulatorLayer: geotoolkit.scene.Group);
                    /**
                     * Events
                     */
                    static Events: any;
                    /**
                     * Set the plots managed by the splitter in the correct order (order on screen)
                     * @param plots  (Required) group for which we want to change the size
                     */
                    setPlots(plots: geotoolkit.scene.Group[]): this;
                }
                module HorizontalSplitter {
                    /**
                     * Events
                     */
                    interface Events {
                        /**
                         * onPlotSizeChanged
                         */
                        onPlotSizeChanged: string;
                    }
                }
            }
            module scroll {
                /**
                 * ScrollEventArgs
                 */
                class ScrollEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                    /**
                     * ScrollEventArgs
                     * @param eventArgs  (Required) info about event arguments
                     * @param modelLimits  (Required) visible model limits
                     */
                    constructor(eventArgs: geotoolkit.controls.tools.EventArgs, modelLimits: geotoolkit.util.Rect);
                    /**
                     * Return visibles limits
                     */
                    getVisibleModelLimits(): geotoolkit.util.Rect;
                }
                /**
                 * AbstractScroll class is the parent class for toolkit builtin scrollbar shapes. It includes the logic to scroll using an internal {@link geotoolkit.controls.tools.AbstractTool}
                 * <br>
                 * <br>
                 * <h5>Events {@link geotoolkit.controls.tools.scroll.AbstractScroll}</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>onActivate</td>
                 *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                 *              <td>scrollbar activated</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onScrollStart</td>
                 *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                 *              <td>on scroll start</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onScaleStart</td>
                 *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                 *              <td>on scale start</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onScroll</td>
                 *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                 *              <td>on scroll</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onScale</td>
                 *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                 *              <td>on scale</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onScrollEnd</td>
                 *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                 *              <td>on scroll end</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onScaleEnd</td>
                 *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                 *              <td>on scale end</td>
                 *          </tr>
                 *          <tr>
                 *              <td>onRangeChanged</td>
                 *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                 *              <td>on visible range changed</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 */
                class AbstractScroll extends geotoolkit.scene.Group {
                    /**
                     * AbstractScroll class is the parent class for toolkit builtin scrollbar shapes. It includes the logic to scroll using an internal {@link geotoolkit.controls.tools.AbstractTool}
                     * <br>
                     * <br>
                     * <h5>Events {@link geotoolkit.controls.tools.scroll.AbstractScroll}</h5>
                     * <table class="params">
                     *     <thead>
                     *          <tr>
                     *              <th>Event</th><th>Arguments</th><th>Description</th>
                     *          </tr>
                     *      </thead>
                     *      <tbody>
                     *          <tr>
                     *              <td>onActivate</td>
                     *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                     *              <td>scrollbar activated</td>
                     *          </tr>
                     *          <tr>
                     *              <td>onScrollStart</td>
                     *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                     *              <td>on scroll start</td>
                     *          </tr>
                     *          <tr>
                     *              <td>onScaleStart</td>
                     *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                     *              <td>on scale start</td>
                     *          </tr>
                     *          <tr>
                     *              <td>onScroll</td>
                     *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                     *              <td>on scroll</td>
                     *          </tr>
                     *          <tr>
                     *              <td>onScale</td>
                     *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                     *              <td>on scale</td>
                     *          </tr>
                     *          <tr>
                     *              <td>onScrollEnd</td>
                     *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                     *              <td>on scroll end</td>
                     *          </tr>
                     *          <tr>
                     *              <td>onScaleEnd</td>
                     *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                     *              <td>on scale end</td>
                     *          </tr>
                     *          <tr>
                     *              <td>onRangeChanged</td>
                     *              <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
                     *              <td>on visible range changed</td>
                     *          </tr>
                     *      <tbody>
                     *  </table>
                     *  <br>
                     * @param options  (Required) 
                     * @param options.name  (Required) scroll bar name
                     */
                    constructor(options: any | { name?: string; } );
                    /**
                     * enum of AbstractScroll Events
                     */
                    static Events: any;
                    /**
                     * onMouseDown
                     * @param eventArgs  (Required) information about event arguments
                     */
                    protected onMouseDown(eventArgs: geotoolkit.controls.tools.EventArgs): any;
                    /**
                     * onMouseMove
                     * @param eventArgs  (Required) information about event arguments
                     */
                    protected onMouseMove(eventArgs: geotoolkit.controls.tools.EventArgs): any;
                    /**
                     * onMouseUp
                     * @param eventArgs  (Required) information about event arguments
                     */
                    protected onMouseUp(eventArgs: geotoolkit.controls.tools.EventArgs): any;
                    /**
                     * Doubleclick handler
                     * Detects if double click happens on scrollbar and prevents propagation
                     * @param eventArgs  (Required) event arguments
                     */
                    protected onDoubleClick(eventArgs: geotoolkit.controls.tools.EventArgs): any;
                    /**
                     * onWindowMouseMove
                     * @param eventArgs  (Required) information about event arguments
                     */
                    protected onWindowMouseMove(eventArgs: geotoolkit.controls.tools.EventArgs): any;
                    /**
                     * onWindowMouseUp
                     * @param evt  (Required) onWindowMouseUp event
                     */
                    protected onWindowMouseUp(evt: geotoolkit.controls.tools.EventArgs): any;
                    /**
                     * Get the tool
                     */
                    getTool(): geotoolkit.controls.tools.AbstractTool;
                    /**
                     * Add Listener
                     * @param event  (Required) scroll event
                     * @param callback  (Required) function to be called
                     */
                    addListener(event: string, callback: Function): this;
                    /**
                     * Sets floating mode
                     * @param floatingMode  (Required) flag to set floating mode
                     */
                    setFloatingMode(floatingMode: boolean): this;
                    /**
                     * Returns floating mode
                     */
                    getFloatingMode(): boolean;
                    /**
                     * @param modelLimits  (Required) model limits
                     * @param visibleLimits  (Optional) visible model limits
                     * @param flipped  (Optional) orientation flipped or not
                     * @param enableAnimation  (Optional) show animation or not
                     */
                    setModelLimits(modelLimits: geotoolkit.util.Rect, visibleLimits?: geotoolkit.util.Rect, flipped?: boolean, enableAnimation?: boolean): this;
                    /**
                     * Gets all the properties pertaining to this object
                     */
                    getProperties(): any;
                    /**
                     * Sets all the properties pertaining to this object
                     * @param properties  (Required) JSON containing properties
                     * @param properties.layoutstyle  (Optional) layout style
                     * @param properties.backgroundfillstyle  (Optional) background fill style
                     * @param properties.floating  (Optional) flag to set floating mode
                     */
                    setProperties(properties: any | { layoutstyle?: any|geotoolkit.layout.LayoutStyle; backgroundfillstyle?: geotoolkit.attributes.FillStyle|any; floating?: boolean; } ): this;
                    /**
                     * Set scrollbar options
                     * @param options  (Required) specific to the scrollbar type
                     */
                    setOptions(options: any): any;
                    /**
                     * Get scrollbar options
                     */
                    getOptions(): any;
                    /**
                     * Returns optimal size for scroll bar
                     */
                    getDesiredSize(): number;
                }
                /**
                 * Abstract base class for common Vertical and Horizontal scrollers
                 */
                class HVBaseScroll extends geotoolkit.controls.tools.scroll.AbstractScroll {
                    /**
                     * Abstract base class for common Vertical and Horizontal scrollers
                     * @param options  (Required) 
                     * @param options.target  (Optional) scroll target object
                     * @param options.modellimits  (Optional) model limits
                     * @param options.visiblelimits  (Optional) visible model limits
                     * @param options.name  (Optional) This tool's name
                     * @param options.size  (Optional) scrollbar size
                     */
                    constructor(options: any | { target?: geotoolkit.scene.CompositeNode; modellimits?: geotoolkit.util.Rect; visiblelimits?: geotoolkit.util.Rect; name?: string; size?: number; } );
                    /**
                     * specify scroll bar orientation
                     * @param flip  (Required) scroll bar orientation
                     */
                    setFlip(flip: boolean): this;
                    /**
                     * set size of the scrollbar
                     * @param size  (Required) size of the scrollbar, size should not be even
                     */
                    setSize(size: number): this;
                    /**
                     * Sets the scrollTarget
                     * @param object  (Required) scroll target
                     */
                    setTarget(object: geotoolkit.scene.CompositeNode): this;
                    /**
                     * Gets the scrolls Model Limits Range
                     */
                    getModelRange(): geotoolkit.util.Range;
                    /**
                     * Gets the scroll visible Model Range
                     */
                    getVisibleModelRange(): geotoolkit.util.Range;
                    /**
                     * specify current model limits
                     * @param modelLimits  (Required) model limits
                     * @param visibleLimits  (Required) visible model limits
                     * @param flipped  (Optional) orientation flipped or not
                     * @param enableAnimation  (Optional) show animation or not
                     */
                    setModelLimits(modelLimits: geotoolkit.util.Rect, visibleLimits: geotoolkit.util.Rect, flipped?: boolean, enableAnimation?: boolean): this;
                    /**
                     * Gets all the properties pertaining to this object
                     */
                    getOptions(): any;
                    /**
                     * Set Options
                     * @param properties  (Optional) JSON containing properties
                     * @param properties.name  (Optional) name of the tool
                     * @param properties.size  (Optional) size of the scrollbar
                     * @param properties.rounded  (Optional) rounded borders
                     * @param properties.minimumcarretsize  (Optional) minimum size of the the carriage
                     * @param properties.minscrollbutton  (Optional) minscrollbutton properties
                     * @param properties.minscrollbutton.visible  (Optional) minscrollbutton visibility
                     * @param properties.maxscrollbutton  (Optional) maxscrollbutton properties
                     * @param properties.maxscrollbutton.visible  (Optional) maxscrollbutton visibility
                     * @param properties.borderlinestyle  (Optional) border line style
                     * @param properties.backgroundfillstyle  (Optional) background fill style, deprecated (since 2.6) use [properties.fillstyle] instead
                     * @param properties.fillstyle  (Optional) fill style
                     * @param properties.linestyle  (Optional) line style
                     * @param properties.caretlinestyle  (Optional) caret line style
                     * @param properties.caretfillstyle  (Optional) caret fill style
                     * @param properties.arrowlinestyle  (Optional) arrow line style
                     */
                    setOptions(properties?: any | { name?: string; size?: number; rounded?: boolean; minimumcarretsize?: number; minscrollbutton?: any | { visible?: boolean; } ; maxscrollbutton?: any | { visible?: boolean; } ; borderlinestyle?: geotoolkit.attributes.LineStyle|any; backgroundfillstyle?: geotoolkit.attributes.FillStyle|any; fillstyle?: geotoolkit.attributes.FillStyle|any; linestyle?: geotoolkit.attributes.LineStyle|any; caretlinestyle?: geotoolkit.attributes.LineStyle|any; caretfillstyle?: geotoolkit.attributes.FillStyle|any; arrowlinestyle?: geotoolkit.attributes.LineStyle|any; } ): this;
                }
                /**
                 * Create a HorizontalScroll bar
                 */
                class HorizontalScroll extends geotoolkit.controls.tools.scroll.HVBaseScroll {
                    /**
                     * Create a HorizontalScroll bar
                     * @param options  (Optional) 
                     * @param options.name  (Optional) This tool's name
                     */
                    constructor(options?: any | { name?: string; } );
                    /**
                     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
                     */
                    static Events: any;
                }
                /**
                 * Create a VerticalScroll
                 */
                class VerticalScroll extends geotoolkit.controls.tools.scroll.HVBaseScroll {
                    /**
                     * Create a VerticalScroll
                     * @param options  (Optional) 
                     * @param options.name  (Optional) This tool's name
                     */
                    constructor(options?: any | { name?: string; } );
                    /**
                     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
                     */
                    static Events: any;
                }
                /**
                 * Defines a Compact Scroll bar
                 */
                class CompactBaseScroll extends geotoolkit.controls.tools.scroll.AbstractScroll {
                    /**
                     * Defines a Compact Scroll bar
                     * @param options  (Required) An object containing options
                     * @param options.name  (Optional) tool name
                     */
                    constructor(options: any | { name?: string; } );
                    /**
                     * Enum of Alternative manipulation mode types.
                     */
                    static AlternativeManipulationMode: any;
                    /**
                     * Events
                     * see {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
                     */
                    static Events: any;
                    /**
                     * Set options
                     * @param options  (Optional) 
                     * @param options.resizable  (Optional) resizable or not
                     * @param options.minhandle  (Optional) symbol to be displayed on the left end(or start) of the scroll bar
                     * @param options.maxhandle  (Optional) symbol to be displayed on the right end(or end) of the scroll bar
                     * @param options.manipulation  (Optional) manipulation
                     * @param options.manipulation.type  (Optional) The type of alternative manipulation mode.
                     * @param options.manipulation.threshold  (Optional) The mimimum size in pixels below which the alternate manipulation mode should activate.
                     * @param options.minscrollbutton  (Optional) minscrollbutton
                     * @param options.minscrollbutton.visible  (Optional) minscrollbutton visibility flag
                     * @param options.minscrollbutton.linestyle  (Optional) minscrollbutton linestyle
                     * @param options.minscrollbutton.fillstyle  (Optional) minscrollbutton fillstyle
                     * @param options.minscrollbutton.caret  (Optional) minscrollbutton symbol
                     * @param options.maxscrollbutton  (Optional) maxscrollbutton
                     * @param options.maxscrollbutton.visible  (Optional) maxscrollbutton visibility flag
                     * @param options.maxscrollbutton.linestyle  (Optional) maxscrollbutton linestyle
                     * @param options.maxscrollbutton.fillstyle  (Optional) maxscrollbutton fillstyle
                     * @param options.maxscrollbutton.caret  (Optional) maxscrollbutton symbol
                     * @param options.scrollbar  (Optional) scrollbar
                     * @param options.scrollbar.visible  (Optional) scrollbar visibility flag
                     * @param options.scrollbar.linestyle  (Optional) scrollbar linestyle
                     * @param options.scrollbar.fillstyle  (Optional) scrollbar fillstyle
                     * @param options.scrolltrack  (Optional) scrolltrack
                     * @param options.scrolltrack.visible  (Optional) scrolltrack visibility flag
                     * @param options.scrolltrack.linestyle  (Optional) scrolltrack linestyle
                     * @param options.scrolltrack.fillstyle  (Optional) scrolltrack fillstyle
                     */
                    setOptions(options?: any | { resizable?: boolean; minhandle?: geotoolkit.scene.shapes.Symbol; maxhandle?: geotoolkit.scene.shapes.Symbol; manipulation?: any | { type?: geotoolkit.controls.tools.scroll.CompactBaseScroll.AlternativeManipulationMode; threshold?: number; } ; minscrollbutton?: any | { visible?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; caret?: geotoolkit.scene.shapes.Symbol; } ; maxscrollbutton?: any | { visible?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; caret?: geotoolkit.scene.shapes.Symbol; } ; scrollbar?: any | { visible?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; scrolltrack?: any | { visible?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; } ): this;
                    /**
                     * Get options
                     */
                    getOptions(): any;
                    /**
                     * Get visible model
                     */
                    getVisibleModel(): geotoolkit.scene.Group;
                    /**
                     * Set model limits
                     * @param modelLimits  (Required) model coordinate limits
                     * @param visibleModelLimits  (Required) visible model limits
                     */
                    setModelLimits(modelLimits: geotoolkit.util.Rect, visibleModelLimits: geotoolkit.util.Rect): this;
                    /**
                     * Updates the scrolling mode to work correctly with small visible area.
                     * @param visibleModelLimits  (Required) The current visible model limits.
                     * @param isHorizontal  (Required) The orientation of the scroll bar.
                     */
                    updateMinimumScrollMode(visibleModelLimits: geotoolkit.util.Rect, isHorizontal: boolean): any;
                    /**
                     * Returns optimal size for scroll bar
                     */
                    getDesiredSize(): number;
                }
                /**
                 * Defines a Compact Scroll bar
                 */
                class CompactHorizontalScroll extends geotoolkit.controls.tools.scroll.CompactBaseScroll {
                    /**
                     * Defines a Compact Scroll bar
                     * @param options  (Required) 
                     * @param options.name  (Optional) tool name
                     */
                    constructor(options: any | { name?: string; } );
                    /**
                     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
                     */
                    static Events: any;
                    /**
                     * Set options
                     * @param options  (Optional) options
                     * @param options.resizable  (Optional) resizable or not
                     * @param options.minhandle  (Optional) symbol to be displayed on the left end(or start) of the scroll bar
                     * @param options.maxhandle  (Optional) symbol to be displayed on the right end(or end) of the scroll bar
                     * @param options.minscrollbutton  (Optional) minscrollbutton
                     * @param options.minscrollbutton.visible  (Optional) minscrollbutton visibility flag
                     * @param options.minscrollbutton.size  (Optional) minscrollbutton size
                     * @param options.minscrollbutton.linestyle  (Optional) minscrollbutton line style
                     * @param options.minscrollbutton.fillstyle  (Optional) minscrollbutton fill style
                     * @param options.minscrollbutton.caret  (Optional) minscrollbutton symbol
                     * @param options.maxscrollbutton  (Optional) maxscrollbutton
                     * @param options.maxscrollbutton.visible  (Optional) maxscrollbutton visibility flag
                     * @param options.maxscrollbutton.size  (Optional) maxscrollbutton size
                     * @param options.maxscrollbutton.linestyle  (Optional) maxscrollbutton line style
                     * @param options.maxscrollbutton.fillstyle  (Optional) maxscrollbutton fill style
                     * @param options.maxscrollbutton.caret  (Optional) maxscrollbutton symbol
                     * @param options.scrollbar  (Optional) scrollbar
                     * @param options.scrollbar.visible  (Optional) scrollbar visibility flag
                     * @param options.scrollbar.autohide  (Optional) scrollbar autohide flag
                     * @param options.scrollbar.linestyle  (Optional) scrollbar linestyle
                     * @param options.scrollbar.fillstyle  (Optional) scrollbar fill style
                     * @param options.scrolltrack  (Optional) scrolltrack
                     * @param options.scrolltrack.visible  (Optional) scrolltrack visibility flag
                     * @param options.scrolltrack.linestyle  (Optional) scrolltrack linestyle
                     * @param options.scrolltrack.fillstyle  (Optional) scrolltrack fillstyle
                     */
                    setOptions(options?: any | { resizable?: boolean; minhandle?: geotoolkit.scene.shapes.Symbol; maxhandle?: geotoolkit.scene.shapes.Symbol; minscrollbutton?: any | { visible?: boolean; size?: number; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; caret?: geotoolkit.scene.shapes.Symbol; } ; maxscrollbutton?: any | { visible?: boolean; size?: number; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; caret?: geotoolkit.scene.shapes.Symbol; } ; scrollbar?: any | { visible?: boolean; autohide?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; scrolltrack?: any | { visible?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; } ): this;
                    /**
                     * specify scroll bar orientation
                     * @param flip  (Required) scroll bar orientation
                     */
                    setFlip(flip: boolean): this;
                    /**
                     * Gets the scrolls Model Limits Range
                     */
                    getModelRange(): geotoolkit.util.Range;
                    /**
                     * Gets the scroll visible Model Range
                     */
                    getVisibleModelRange(): geotoolkit.util.Range;
                    /**
                     * Set Model Limits
                     * @param modelLimits  (Required) model coordinate limits
                     * @param visibleModelLimits  (Required) visible model limits
                     */
                    setModelLimits(modelLimits: geotoolkit.util.Rect, visibleModelLimits: geotoolkit.util.Rect): this;
                }
                /**
                 * Defines a Compact Scroll bar
                 */
                class CompactVerticalScroll extends geotoolkit.controls.tools.scroll.CompactBaseScroll {
                    /**
                     * Defines a Compact Scroll bar
                     * @param options  (Required) 
                     * @param options.name  (Optional) tool name
                     */
                    constructor(options: any | { name?: string; } );
                    /**
                     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
                     */
                    static Events: any;
                    /**
                     * Set options
                     * @param options  (Optional) 
                     * @param options.resizable  (Optional) resizable or not
                     * @param options.minhandle  (Optional) symbol to be displayed on the left end(or start) of the scroll bar
                     * @param options.maxhandle  (Optional) symbol to be displayed on the right end(or end) of the scroll bar
                     * @param options.minscrollbutton  (Optional) minscrollbutton
                     * @param options.minscrollbutton.visible  (Optional) minscrollbutton visibility flag
                     * @param options.minscrollbutton.size  (Optional) minscrollbutton size
                     * @param options.minscrollbutton.linestyle  (Optional) minscrollbutton line style
                     * @param options.minscrollbutton.fillstyle  (Optional) minscrollbutton fill style
                     * @param options.minscrollbutton.caret  (Optional) minscrollbutton symbol
                     * @param options.maxscrollbutton  (Optional) maxscrollbutton
                     * @param options.maxscrollbutton.visible  (Optional) maxscrollbutton visibility flag
                     * @param options.maxscrollbutton.size  (Optional) maxscrollbutton size
                     * @param options.maxscrollbutton.linestyle  (Optional) maxscrollbutton line style
                     * @param options.maxscrollbutton.fillstyle  (Optional) maxscrollbutton fill style
                     * @param options.maxscrollbutton.caret  (Optional) maxscrollbutton symbol
                     * @param options.scrollbar  (Optional) scrollbar
                     * @param options.scrollbar.visible  (Optional) scrollbar visibility flag
                     * @param options.scrollbar.autohide  (Optional) scrollbar autohide flag
                     * @param options.scrollbar.linestyle  (Optional) scrollbar linestyle
                     * @param options.scrollbar.fillstyle  (Optional) scrollbar fillstyle
                     * @param options.scrolltrack  (Optional) scrolltrack
                     * @param options.scrolltrack.visible  (Optional) scrolltrack visibility flag
                     * @param options.scrolltrack.linestyle  (Optional) scrolltrack linestyle
                     * @param options.scrolltrack.fillstyle  (Optional) scrolltrack fillstyle
                     */
                    setOptions(options?: any | { resizable?: boolean; minhandle?: geotoolkit.scene.shapes.Symbol; maxhandle?: geotoolkit.scene.shapes.Symbol; minscrollbutton?: any | { visible?: boolean; size?: number; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; caret?: geotoolkit.scene.shapes.Symbol; } ; maxscrollbutton?: any | { visible?: boolean; size?: number; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; caret?: geotoolkit.scene.shapes.Symbol; } ; scrollbar?: any | { visible?: boolean; autohide?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; scrolltrack?: any | { visible?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ; } ): this;
                    /**
                     * specify scroll bar orientation
                     * @param flip  (Required) scroll bar orientation
                     */
                    setFlip(flip: boolean): this;
                    /**
                     * Gets the scrolls Model Limits Range
                     */
                    getModelRange(): geotoolkit.util.Range;
                    /**
                     * Gets the scroll visible Model Range
                     */
                    getVisibleModelRange(): geotoolkit.util.Range;
                    /**
                     * Set model limtis
                     * @param modelLimits  (Required) model coordinate limits
                     * @param visibleModelLimits  (Required) visible model limits
                     */
                    setModelLimits(modelLimits: geotoolkit.util.Rect, visibleModelLimits: geotoolkit.util.Rect): this;
                }
                /**
                 * Scroll factory
                 * 
                 * This factory registers a name-function pair.
                 * the function is responsible for creating an instance of a scrollbar which inherits from
                 * geotoolkit.controls.tools.scroll.AbstractScroll, and returns it
                 */
                class ScrollFactory {
                    /**
                     * Scroll factory
                     * 
                     * This factory registers a name-function pair.
                     * the function is responsible for creating an instance of a scrollbar which inherits from
                     * geotoolkit.controls.tools.scroll.AbstractScroll, and returns it
                     */
                    constructor();
                    /**
                     * Get instance
                     */
                    static getInstance(): any;
                    /**
                     * Register scrollbar
                     * @param name  (Required) class name or unique name
                     * @param constructor  (Required) function which instantiates the required scrollbar
                     */
                    registerScrollbar(name: string, constructor: Function): any;
                    /**
                     * Get scrollbar
                     * @param name  (Required) class name
                     * @param options  (Required) for the scrollbar requested. Must include 'modellimits' and 'visiblelimits'
                     */
                    getScrollbar(name: string, options: any): geotoolkit.controls.tools.scroll.AbstractScroll;
                }
                module AbstractScroll {
                    /**
                     * enum of AbstractScroll Events
                     */
                    interface Events {
                        /**
                         * onActivate
                         */
                        onActivate: string;
                        /**
                         * onScrollStart
                         */
                        onScrollStart: string;
                        /**
                         * onScaleStart
                         */
                        onScaleStart: string;
                        /**
                         * onScroll
                         */
                        onScroll: string;
                        /**
                         * onScale
                         */
                        onScale: string;
                        /**
                         * onScrollEnd
                         */
                        onScrollEnd: string;
                        /**
                         * onScaleEnd
                         */
                        onScaleEnd: string;
                        /**
                         * onRangeChanged
                         */
                        onRangeChanged: string;
                    }
                }
                module HorizontalScroll {
                    /**
                     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
                     */
                    type Events = any;

                }
                module VerticalScroll {
                    /**
                     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
                     */
                    type Events = any;

                }
                module CompactBaseScroll {
                    /**
                     * Enum of Alternative manipulation mode types.
                     */
                    interface AlternativeManipulationMode {
                        /**
                         * Never enable alternative manipulation mode.
                         */
                        Disabled: string;
                        /**
                         * Use default threshold for alternative manipulation mode.
                         */
                        Default: string;
                        /**
                         * Use custom threshold for alternative manipulation mode.
                         */
                        Custom: string;
                    }
                    /**
                     * Events
                     * see {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
                     */
                    type Events = any;

                }
                module CompactHorizontalScroll {
                    /**
                     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
                     */
                    type Events = any;

                }
                module CompactVerticalScroll {
                    /**
                     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
                     */
                    type Events = any;

                }
            }
            module AbstractTool {
                /**
                 * AbstractTool Events
                 */
                interface Events {
                }
            }
            module CrossHair {
                /**
                 * CrossHair Events
                 */
                interface Events {
                    /**
                     * onPositionChanged
                     */
                    onPositionChanged: string;
                    /**
                     * onPointerUp
                     */
                    onPointerUp: string;
                }
                /**
                 * enum about label positions
                 */
                type LabelPositions = any;

                /**
                 * enum about line orientation
                 */
                type LineOrientations = any;

            }
            module Panning {
                /**
                 * Panning Events
                 */
                interface Events {
                }
            }
            module RubberBand {
                /**
                 * RubberBand Events
                 */
                interface Events {
                    /**
                     * onZoomStart
                     */
                    onZoomStart: string;
                    /**
                     * onZoomEnd
                     */
                    onZoomEnd: string;
                    /**
                     * onRangeChanged
                     */
                    onRangeChanged: string;
                }
                /**
                 * Enum of rubberband Minimum Dimension modes
                 */
                interface MinimumDimensionMode {
                    /**
                     * Expands highlighted area from the start point
                     */
                    Hard: number;
                    /**
                     * Expands highlighted area around selection
                     */
                    Smart: number;
                }
            }
            module PolygonTool {
                /**
                 * PolygonTool Events
                 */
                interface Events {
                    /**
                     * onStart
                     */
                    onStart: string;
                    /**
                     * onContinue
                     */
                    onContinue: string;
                    /**
                     * onEnd
                     */
                    onEnd: string;
                }
            }
            module Selection {
                /**
                 * Selection Events
                 */
                interface Events {
                    /**
                     * onPick
                     */
                    onPick: string;
                    /**
                     * onSelectionEnd
                     */
                    onSelectionEnd: string;
                    /**
                     * onSelectionChanged
                     */
                    onSelectionChanged: string;
                    /**
                     * beforeSelectionChange
                     */
                    beforeSelectionChange: string;
                    /**
                     * onDoubleClick
                     */
                    onDoubleClick: string;
                }
            }
            module PinchToZoom {
                /**
                 * PinchToZoom Events
                 */
                interface Events {
                    /**
                     * onZoom
                     */
                    onZoom: string;
                    /**
                     * onZoomEnd
                     */
                    onZoomEnd: string;
                    /**
                     * onZoomStart
                     */
                    onZoomStart: string;
                }
            }
            module PolygonSelection {
                /**
                 * PolygonSelection Events
                 */
                interface Events {
                    /**
                     * onSelectionEnd
                     */
                    onSelectionEnd: string;
                    /**
                     * onSelectionChanged
                     */
                    onSelectionChanged: string;
                    /**
                     * beforeSelectionChange
                     */
                    beforeSelectionChange: string;
                }
            }
            module ColorBarCursorTool {
                /**
                 * Enum for symbol alignment
                 */
                interface SymbolAlignment {
                    /**
                     * Left
                     */
                    Left: string;
                    /**
                     * Right
                     */
                    Right: string;
                    /**
                     * Both
                     */
                    Both: string;
                }
            }
        }
        module data {
            class SerieElementInfo {
                /**
                 * @param serieId  (Required) serie ID
                 * @param sampleId  (Required) sample ID
                 */
                constructor(serieId: number|string|any, sampleId: number|string|any);
                /**
                 * Gets serie ID
                 */
                getSerieId(): number|string|any;
                /**
                 * Gets sample ID
                 */
                getSampleId(): number|string|any;
            }
        }
        module axis {
            /**
             * Defines a tick Generator for the histogram Shape
             */
            class HistogramTickGenerator extends geotoolkit.axis.TickGenerator {
                /**
                 * Defines a tick Generator for the histogram Shape
                 * @param binCount  (Required) number of bins this histogram has
                 */
                constructor(binCount: number);
                /**
                 * Enum of geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy
                 */
                static LabelStrategy: any;
                /**
                 * Set format label handler
                 * @param handler  (Required) format label handler
                 */
                setFormatLabelHandler(handler: Function): this;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.major  (Optional) JSON object container - Generated
                 * @param properties.major.labelformat  (Optional) major label format
                 * @param properties.labelstrategy  (Optional) label strategy
                 * @param properties.minimumspan  (Optional) minimum span distance for labels and ticks
                 * @param properties.bins  (Optional) number of bins this histogram has
                 */
                setProperties(properties: any | { major?: any | { labelformat?: geotoolkit.util.NumberFormat; } ; labelstrategy?: geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy; minimumspan?: number; bins?: number; } ): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets major label format
                 * @param format  (Required) major label format
                 */
                setMajorLabelFormat(format: geotoolkit.util.NumberFormat): this;
                /**
                 * Return major label format
                 */
                getMajorLabelFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Sets bin count
                 * @param binCount  (Required) number of bins this histogram has
                 */
                setBinCount(binCount: number): this;
                /**
                 * Sets the label strategy
                 * @param strat  (Required) label strategy
                 */
                setLabelStrategy(strat: geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy): this;
                /**
                 * Gets the label strategy
                 */
                getLabelStrategy(): geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy;
                /**
                 * sets the minimum span distance for labels and ticks
                 * @param span  (Required) minimum span distance for labels and ticks
                 */
                setMinimumSpan(span: number): this;
                /**
                 * gets the minimum span distance for labels and ticks
                 */
                getMinimumSpan(): number;
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.controls.axis.HistogramTickGenerator): any;
                /**
                 */
                reset(): any;
                /**
                 * Set rotation strategy
                 * @param value  (Required) rotate labels or not
                 */
                setRotateLabels(value: boolean): this;
                /**
                 */
                resetTicks(): any;
                /**
                 */
                resetLabels(): any;
                /**
                 */
                nextTick(): any;
                /**
                 */
                nextLabel(): any;
                /**
                 */
                formatLabel(): any;
            }
            module HistogramTickGenerator {
                /**
                 * Enum of geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy
                 */
                interface LabelStrategy {
                    /**
                     * Tick marks are on the edges of bins
                     */
                    Edge: number;
                    /**
                     * Tick Marks are in the center of bins and show a range for the bin
                     */
                    Range: number;
                    /**
                     * Tick Marks are in the center of bins and show the center bin value
                     */
                    Center: number;
                }
            }
        }
    }
}
