declare module geotoolkit {
    module gauges {
        /**
         * Defines a base class for gauges
         */
        class Gauge extends geotoolkit.scene.Group {
            /**
             * Defines a base class for gauges
             * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
             * @param left.left  (Optional) X location of the left boundary of the gauge
             * @param left.top  (Optional) Y location of the top boundary of the gauge
             * @param left.right  (Optional) X location of the right boundary of the gauge
             * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
             * @param left.width  (Optional) Width of the gauge
             * @param left.height  (Optional) Height of the gauge
             * @param left.min  (Optional) Minimum of the gauge
             * @param left.max  (Optional) Maximum of the gauge
             * @param left.name  (Optional) Name of the gauge
             * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
             * @param top  (Optional) X location of the right boundary of the gauge
             * @param right  (Optional) Y location of the bottom boundary of the gauge
             * @param bottom  (Optional) Width of the gauge
             * @param width  (Optional) Height of the gauge
             * @param height  (Optional) Minimum of the gauge
             * @param min  (Optional) Maximum of the gauge
             * @param name  (Optional) Name of the gauge
             * @param ranges  (Optional) Array of ranges to apply
             */
            constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[]);
            /**
             * Dispose node.
             */
            dispose(): any;
            /**
             * Returns gauge model limits
             */
            protected getGaugeModelLimits(): geotoolkit.util.Rect;
            /**
             * Records that the gauge has been changed, full redraw will be forced
             */
            hasChanged(): this;
            /**
             * Returns a boolean value defining if the gauge supports animation
             */
            supportsAnimation(): boolean;
            /**
             * Sets animation support flag (if a gauge can be animated)
             * @param v  (Required) Animation support boolean flag
             */
            setSupportsAnimation(v: boolean): this;
            /**
             * Sets minimum value
             * @param min  (Required) New minimum value
             */
            setLow(min: number): this;
            /**
             * Sets maximum value
             * @param max  (Required) New maximum value
             */
            setHigh(max: number): this;
            /**
             * Get minimum value
             */
            getLow(): number;
            /**
             * Get maximum value
             */
            getHigh(): number;
            /**
             * Get all Managers associated to this gauge
             */
            getAllManagers(): geotoolkit.gauges.utils.Manager[];
            /**
             * Get Animation Manager associated to this gauge
             */
            getAnimationManager(): geotoolkit.gauges.utils.AnimationManager;
            /**
             * Set Manager associated to this gauge
             * @param mgr  (Required) Manager to associate with this gauge
             * @param type  (Required) Manager type
             */
            setManager(mgr: geotoolkit.gauges.utils.Manager, type: geotoolkit.gauges.utils.ManagerType): this;
            /**
             * Sets new bounds
             * @param rect  (Required) New bounds
             */
            setBounds(rect: geotoolkit.util.Rect): this;
            /**
             * Returns name shape
             */
            getNameShape(): geotoolkit.scene.shapes.Text;
            /**
             * Get background shape
             */
            getBackgroundShape(): geotoolkit.scene.shapes.ScaledShape;
            /**
             * Set background shape
             * @param shape  (Required) background shape
             */
            setBackgroundShape(shape: geotoolkit.scene.shapes.ScaledShape): this;
            /**
             * Get value shape
             */
            getValueShape(): geotoolkit.scene.shapes.Text;
            /**
             * Set gauge name
             * @param name  (Required) Name to be displayed
             */
            setName(name: string): this;
            /**
             * Returns gauge name
             */
            getName(): string;
            /**
             * Sets display strategy
             * @param strategy  (Required) Strategy function to be used for display of value
             */
            setDisplayStrategy(strategy: Function): this;
            /**
             * Get display strategy
             */
            getDisplayStrategy(): Function;
            /**
             * Increments animation value by specified number
             * @param incr  (Required) Value to increment by
             */
            incrementAnimation(incr: number): this;
            /**
             * Terminates the animation
             */
            terminateAnimation(): this;
            /**
             * Set new gauge value to display
             * @param val  (Required) New value of the gauge
             * @param animated  (Optional) animated True to perform an animation
             */
            setValue(val: number|string, animated?: boolean): this;
            /**
             * Set alt values (for custom gauges or DoubleCircularGauge)
             * @param val  (Required) New alt value(s) of the gauge
             * @param animated  (Optional) animated True to perform an animation
             */
            setAltValues(val: number[]|number, animated?: boolean): this;
            /**
             * Get value
             */
            getValue(): number;
            /**
             * Get alt values
             */
            getAltValues(): number[];
            /**
             * Initialize gauge component shapes
             */
            initShapes(): this;
            /**
             * Creates one alert which implements all alerts of all alarms registered
             */
            getResultingAlert(): geotoolkit.gauges.alarms.Alert;
            /**
             * Creates one streaming alert which implements all streaming alerts of all alarms registered
             */
            getResultingStreamingAlert(): geotoolkit.gauges.alarms.Alert;
            /**
             * Returns true if static shapes exist
             */
            isInitiatedStatic(): boolean;
            /**
             * Returns true if force update is required
             */
            isForceUpdate(): boolean;
            /**
             * Update static shapes
             */
            updateStatic(): this;
            /**
             * Add a static shape. Static shapes are not affected by Value updates
             * @param shape  (Required) Shape to add
             */
            addStaticShape(shape: geotoolkit.scene.Node): this;
            /**
             * Remove a static shape. Static shapes are not affected by Value updates
             * @param shape  (Required) shape to remove
             */
            removeStaticShape(shape: geotoolkit.scene.Node): this;
            /**
             * Remove a dynamic shape. Dynamic shapes are updated at each value change
             * @param shape  (Required) Shape to remove
             */
            removeDynamicShape(shape: geotoolkit.scene.Node): this;
            /**
             * Get static shapes
             */
            getStaticShapes(): geotoolkit.scene.Node[];
            /**
             * Get dynamic shapes.
             */
            getDynamicShapes(): geotoolkit.scene.Node[];
            /**
             * Add a range to the gauge. To use for known gauges
             * @param range  (Required) Range to add
             */
            addRange(range: geotoolkit.gauges.utils.Range|geotoolkit.gauges.utils.Range[]): this;
            /**
             * Get all ranges
             */
            getRanges(): geotoolkit.gauges.utils.Range[];
            /**
             * Force hardcoded shapes to reload based on new ranges.
             * To be called when Ranges are updated after their representation is drawn.
             */
            reloadRanges(): any;
            /**
             * Add a known shape
             * @param shape  (Required) Shape to add
             */
            addKnownShape(shape: geotoolkit.gauges.shapes.BaseShape): any;
            /**
             * Remove a known shape
             * @param shape  (Required) shape to remove
             */
            removeKnownShape(shape: geotoolkit.gauges.shapes.BaseShape): any;
            /**
             * Add a dynamic shape. Dynamic shapes are affected by Value updates
             * @param shape  (Required) Shape to add
             * @param shape.shape  (Optional) Shape to add
             * @param shape.event  (Optional) method to call at value update. Should return the updated shape.
             * @param event  (Optional) method to call at value update. Should return the updated shape.
             */
            addDynamicShape(shape: geotoolkit.scene.Node|geotoolkit.scene.Node[]|any | { shape?: geotoolkit.scene.Node; event?: Function; } , event?: Function): this;
            /**
             * Update value of the gauge
             */
            updateValue(): this;
            /**
             * Adds an alarm to the gauge
             * @param alarm  (Required) alarm to be added
             */
            addAlarm(alarm: geotoolkit.gauges.alarms.Alarm): this;
            /**
             * Returns the alarms associated to the gauge
             */
            getAlarms(): geotoolkit.gauges.alarms.Alarm[];
            /**
             * Remove an alarm from the gauge
             * @param alarm  (Required) Alarm to be added
             */
            removeAlarm(alarm: geotoolkit.gauges.alarms.Alarm): this;
            /**
             * Forced update the gauge
             */
            update(): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {props:{modellimits:geotoolkit.util.Rect;bounds:geotoolkit.util.Rect;localtransform:geotoolkit.util.Transformation;name:string;pickingchildren:boolean;alarms:geotoolkit.gauges.alarms.Alarm[];supportsanimation:boolean;displaystrategy:string;ranges:geotoolkit.gauges.utils.Range[];min:number;max:number;nameshape:any;valueshape:any;backgroundshape:geotoolkit.scene.shapes.Shape;value:number;altvalues:number[]}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) JSON containing the properties to set
             * @param properties.modellimits  (Optional) shape model limits
             * @param properties.bounds  (Optional) shape bounds
             * @param properties.localtransform  (Optional) shape local transformation
             * @param properties.name  (Optional) shape name
             * @param properties.pickingchildren  (Optional) allow children selection
             * @param properties.alarms  (Optional) array of alarms
             * @param properties.supportsanimation  (Optional) is animation supported
             * @param properties.displaystrategy  (Optional) string function display strategy
             * @param properties.ranges  (Optional) array of ranges
             * @param properties.min  (Optional) min value
             * @param properties.max  (Optional) max value
             * @param properties.nameshape  (Optional) shape name text
             * @param properties.valueshape  (Optional) shape value text
             * @param properties.backgroundshape  (Optional) shape for background
             * @param properties.value  (Optional) shape value
             */
            setProperties(properties?: any | { modellimits?: geotoolkit.util.Rect|any; bounds?: geotoolkit.util.Rect|any; localtransform?: geotoolkit.util.Transformation; name?: string; pickingchildren?: boolean; alarms?: geotoolkit.gauges.alarms.Alarm[]; supportsanimation?: boolean; displaystrategy?: string; ranges?: geotoolkit.gauges.utils.Range[]; min?: number; max?: number; nameshape?: geotoolkit.scene.shapes.Text|any; valueshape?: geotoolkit.scene.shapes.Text|any; backgroundshape?: geotoolkit.scene.shapes.Shape|any; value?: number; } ): this;
        }
        module utils {
            /**
             * Enum of circular tick locations
             */
            var CircularTickLocation: any;
            /**
             * Enum of directions
             */
            var Direction: any;
            /**
             * Enum of standard locations
             */
            var StandardLocation: any;
            /**
             * Enum of manager Types
             */
            var ManagerType: any;
            /**
             * Defines a class which implements a range to use in gauges.
             * The class defines range of data from a to b, and how this range will be displayed (color, fill, text)
             */
            class Range {
                /**
                 * Defines a class which implements a range to use in gauges.
                 * The class defines range of data from a to b, and how this range will be displayed (color, fill, text)
                 * @param low  (Optional) Lower range limit or JSON with parameters
                 * @param low.low  (Optional) Lower range limit
                 * @param low.high  (Optional) Higher range limit
                 * @param low.color  (Optional) Color of fill in the range
                 * @param low.text  (Optional) Text to display for the range
                 * @param low.fillstyle  (Optional) Filling of the range
                 * @param high  (Optional) Higher range limit
                 * @param color  (Optional) Color of fill in the range
                 * @param text  (Optional) Text to display for the range
                 * @param fillstyle  (Optional) Filling of the range
                 */
                constructor(low?: number|any | { low?: number; high?: number; color?: string; text?: string; fillstyle?: geotoolkit.attributes.FillStyle; } , high?: number, color?: string, text?: string, fillstyle?: geotoolkit.attributes.FillStyle);
                /**
                 * Clone the range
                 */
                clone(): geotoolkit.gauges.utils.Range;
                /**
                 * Set low limit for the range
                 * @param low  (Required) New lower limit
                 */
                setLow(low: number): this;
                /**
                 * Set high limit for the range
                 * @param high  (Required) New higher limit
                 */
                setHigh(high: number): this;
                /**
                 * Set color for the range fill
                 * @param color  (Required) New color to fill the range with
                 */
                setColor(color: string): this;
                /**
                 * Set range fill style
                 * @param fillstyle  (Required) New fillstyle for the range
                 */
                setFillStyle(fillstyle: geotoolkit.attributes.FillStyle): this;
                /**
                 * Get range fill style
                 */
                getFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Set text to the range
                 * @param text  (Required) New text to display
                 */
                setText(text: string): this;
                /**
                 * Get low limit of the range
                 */
                getLow(): number;
                /**
                 * Get high limit of the range
                 */
                getHigh(): number;
                /**
                 * Get color of the range fill
                 */
                getColor(): string;
                /**
                 * Get text of the range
                 */
                getText(): string;
                /**
                 * Checks if a number falls within this range
                 * @param val  (Required) Number to test
                 */
                fallsWithin(val: number): boolean;
            }
            /**
             * Defines a Base Gauges Manager
             */
            class Manager {
                /**
                 * Defines a Base Gauges Manager
                 */
                constructor();
                /**
                 * Updates gauges using the stored action methods
                 */
                updateGauges(): this;
                /**
                 * Stores action called when gauge is being updated
                 * @param f  (Required) Function to be applied on valid gauge g (f(g){ g.dostuff(); })
                 */
                setDoGaugeAction(f: Function): this;
                /**
                 * Returns the stored gauge action
                 */
                getDoGaugeAction(): Function;
                /**
                 * Get Refresh Rate in ms
                 */
                getRefreshRate(): number;
                /**
                 * Returns manager type
                 */
                getManagerType(): geotoolkit.gauges.utils.ManagerType;
                /**
                 * Set Refresh Rate in ms
                 * @param rate  (Required) New rate to set
                 */
                setRefreshRate(rate: number): this;
                /**
                 * Get connected gauges
                 */
                getConnectedGauges(): geotoolkit.gauges.Gauge[];
                /**
                 * Connect a gauge
                 * @param gauge  (Required) Gauge to connect
                 */
                connect(gauge: geotoolkit.gauges.Gauge): this;
                /**
                 * Disconnect a Gauge
                 * @param gauge  (Required) Gauge to disconnect
                 */
                disconnect(gauge: geotoolkit.gauges.Gauge): this;
                /**
                 * Disconnect all connected Gauges
                 */
                disconnectAll(): this;
            }
            /**
             * Defines a manager that controls animations in gauges
             */
            class AnimationManager extends geotoolkit.gauges.utils.Manager {
                /**
                 * Defines a manager that controls animations in gauges
                 */
                constructor();
                /**
                 * Set Refresh Rate in ms
                 * Changing it during an animation will cause all associated Gauges to instantly achieve their last animation frame
                 * @param rate  (Required) Refresh rate
                 */
                setRefreshRate(rate: number): this;
                /**
                 * Get Animation Length in number of steps
                 */
                getAnimationLength(): number;
                /**
                 * Set Animation Length in number of steps
                 * @param n  (Required) Animation length in number of steps
                 */
                setAnimationSteps(n: number): this;
            }
            /**
             * Defines a manager which controls the streaming process
             */
            class StreamingManager extends geotoolkit.gauges.utils.Manager {
                /**
                 * Defines a manager which controls the streaming process
                 */
                constructor();
            }
            /**
             * Enum of circular tick locations
             */
            interface CircularTickLocation {
                /**
                 * Outside
                 */
                Outside: number;
                /**
                 * Inside
                 */
                Inside: number;
                /**
                 * Center
                 */
                Center: number;
                /**
                 * InAndOut
                 */
                InAndOut: number;
            }
            /**
             * Enum of directions
             */
            interface Direction {
                /**
                 * Left
                 */
                Left: number;
                /**
                 * Right
                 */
                Right: number;
                /**
                 * Up Right
                 */
                Up: number;
                /**
                 * Down
                 */
                Down: number;
            }
            /**
             * Enum of standard locations
             */
            interface StandardLocation {
                /**
                 * Bottom Left
                 */
                BottomLeft: geotoolkit.util.Point;
                /**
                 * Bottom Center
                 */
                BottomCenter: geotoolkit.util.Point;
                /**
                 * Bottom Right
                 */
                BottomRight: geotoolkit.util.Point;
                /**
                 * Center Left
                 */
                LeftCenter: geotoolkit.util.Point;
                /**
                 * Center
                 */
                Center: geotoolkit.util.Point;
                /**
                 * Center Right
                 */
                CenterRight: geotoolkit.util.Point;
                /**
                 * Top Left
                 */
                TopLeft: geotoolkit.util.Point;
                /**
                 * Top Center
                 */
                TopCenter: geotoolkit.util.Point;
                /**
                 * Top Right
                 */
                TopRight: geotoolkit.util.Point;
            }
            /**
             * Enum of manager Types
             */
            interface ManagerType {
                /**
                 * Undefined
                 */
                Undefined: string;
                /**
                 * Animation
                 */
                Animation: string;
                /**
                 * Streaming
                 */
                Streaming: string;
                /**
                 * Reserved for User
                 */
                Custom: string;
            }
        }
        module alarms {
            /**
             * Defines an alarm
             * An Alarm is attached to a gauge and contains a collection of Alerts
             */
            class Alarm {
                /**
                 * Defines an alarm
                 * An Alarm is attached to a gauge and contains a collection of Alerts
                 */
                constructor();
                /**
                 * Combines actions from multiple alert into one alert
                 * @param value  (Required) value at which to alert
                 */
                getResultingAlert(value: number): geotoolkit.gauges.alarms.Alert;
                /**
                 * Add action for each Alert action based on Alert's text and color parameters
                 * @param symbol  (Required) Symbol to be colored when Alert is active
                 * @param textShape  (Required) Textshape to be edited when Alert is active
                 */
                setAction(symbol: geotoolkit.scene.shapes.Shape, textShape: geotoolkit.scene.shapes.Text): this;
                /**
                 * Add an alert to the alarm
                 * @param alert  (Required) Alert to add
                 */
                addAlert(alert: geotoolkit.gauges.alarms.Alert): this;
                /**
                 * Get the Alerts
                 */
                getAlerts(): geotoolkit.gauges.alarms.Alert[];
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{alerts:geotoolkit.gauges.alarms.Alert[]}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.alerts  (Optional) array of geotoolkit.gauges.alarms.Alert
                 */
                setProperties(properties: any | { alerts?: geotoolkit.gauges.alarms.Alert[]; } ): this;
            }
            /**
             * Defines a streaming Alarm - An Alarm designed for streaming survey
             */
            class StreamAlarm extends geotoolkit.gauges.alarms.Alarm {
                /**
                 * Defines a streaming Alarm - An Alarm designed for streaming survey
                 */
                constructor();
                /**
                 * Add Streaming Alert
                 * @param upperlimit  (Optional) Upper limit in ms
                 * @param upperlimit.color  (Optional) Color of the alert
                 * @param upperlimit.text  (Optional) Text of the alert
                 * @param color  (Optional) Color of the alert
                 * @param text  (Optional) Text of the alert
                 */
                addStreamingAlert(upperlimit?: number|any | { color?: string; text?: string; } , color?: string, text?: string): geotoolkit.gauges.alarms.RangeAlert|any;
                /**
                 * Combines actions from multiple alert into one alert
                 * @param value  (Required) Value at which to alert
                 */
                getResultingStreamingAlert(value: number): geotoolkit.gauges.alarms.Alert;
                /**
                 * Return the resulting alert
                 * @param value  (Required) Value of
                 */
                getResultingAlert(value: number): geotoolkit.gauges.alarms.Alert;
            }
            /**
             * Defines an alert
             * 
             * An Alert is a test and the associated set of consequences
             */
            class Alert {
                /**
                 * Defines an alert
                 * 
                 * An Alert is a test and the associated set of consequences
                 * @param condition  (Required) test function to be applied on the gauge value (default) or else. Use boolean 'true' for always true conditions.
                 * @param action  (Required) action to be performed when condition is true
                 * @param text  (Optional) label associated with the alert
                 * @param color  (Optional) a color associated with the alert
                 */
                constructor(condition: Function, action: Function, text?: string, color?: string);
                /**
                 * Set or reset Alert Elements.
                 * @param condition  (Required) test function to be applied on the gauge value (default) or else
                 * @param action  (Required) action to be performed when condition is true
                 * @param text  (Optional) label associated with the alert
                 * @param color  (Optional) a color associated with the alert
                 */
                setAlert(condition: Function, action: Function, text?: string, color?: string): this;
                /**
                 * Get Action
                 */
                getAction(): Function;
                /**
                 * Disable the Alert by removing its Action
                 */
                deleteAction(): any;
                /**
                 * Check if alert is active
                 * Returns true if condition is true.
                 */
                isActive(): boolean;
                /**
                 * Add new action based on Alert's text and color parameters
                 * @param symbol  (Required) symbol to be colored when Alert is active
                 * @param textShape  (Required) textshape to be edited when Alert is active
                 */
                setAction(symbol: geotoolkit.scene.shapes.Shape, textShape: geotoolkit.scene.shapes.Text): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.color  (Optional) color
                 * @param properties.text  (Optional) text
                 */
                setProperties(properties?: any | { color?: string; text?: string; } ): this;
            }
            /**
             * Defines an alert based on a range
             * 
             * An Alert is a test and the associated set of consequences
             */
            class RangeAlert extends geotoolkit.gauges.alarms.Alert {
                /**
                 * Defines an alert based on a range
                 * 
                 * An Alert is a test and the associated set of consequences
                 * @param range  (Required) range to be used
                 * @param action  (Required) action to be performed
                 */
                constructor(range: geotoolkit.gauges.utils.Range, action: Function);
                /**
                 * Get Range
                 * return {geotoolkit.gauges.utils.Range} range used
                 */
                getRange(): any;
                /**
                 * Set Range
                 * @param range  (Required) range to be used
                 */
                setRange(range: geotoolkit.gauges.utils.Range): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.range  (Optional) range
                 */
                setProperties(properties?: any | { range?: geotoolkit.gauges.utils.Range; } ): this;
            }
        }
        module knownGauges {
            /**
             * Defines a advanced digital gauge with alarm indicators
             */
            class AdvancedDigitalGauge extends geotoolkit.gauges.Gauge {
                /**
                 * Defines a advanced digital gauge with alarm indicators
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param left.unitname  (Optional) Units of the value displayed by gauge
                 * @param left.painter  (Optional) Painter ti apply to the gauge
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of ranges to apply
                 * @param unitname  (Optional) Units of the value displayed by gauge
                 * @param painter  (Optional) Painter ti apply to the gauge
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; unitname?: string; painter?: Function; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[], unitname?: string, painter?: Function);
                /**
                 * Initialize custom gauge shapes. Overrides base method
                 * @param data  (Required) JSON containing parameters required for initialization
                 * @param data.unitname  (Optional) Units of the value displayed by gauge
                 * @param data.painter  (Optional) Painter ti apply to the gauge
                 */
                initCustomShapes(data: any | { unitname?: string; painter?: Function; } ): this;
                /**
                 * Set unit label
                 * @param unit  (Required) Label to be displayed
                 */
                setUnit(unit: string|geotoolkit.util.AbstractUnit): this;
                /**
                 * Get unit label
                 */
                getUnit(): string;
                /**
                 * Get unit shape
                 */
                getUnitShape(): geotoolkit.scene.shapes.Text;
                /**
                 * Initialize gauge. Overrides base method.
                 */
                init(): this;
                /**
                 * Get alarm shape
                 */
                getAlarmShape(): geotoolkit.gauges.shapes.AlarmShape;
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 * To be called when Ranges are updated after their representation is drawn.
                 */
                reloadRanges(): this;
                /**
                 * Update gauge
                 */
                update(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{unitshape:geotoolkit.scene.shapes.Text;alarmsymbol:geotoolkit.scene.shapes.Symbol;unit:string}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.value  (Optional) New gauge value
                 * @param properties.unitshape  (Optional) Text shape for unit
                 * @param properties.alarmsymbol  (Optional) alarm symbol
                 * @param properties.unit  (Optional) Gauge value units text
                 */
                setProperties(properties: any | { value?: number; unitshape?: geotoolkit.scene.shapes.Text|any; alarmsymbol?: geotoolkit.scene.shapes.Symbol; unit?: string; } ): this;
            }
            /**
             * Defines an linear gauge
             */
            class LinearGauge extends geotoolkit.gauges.Gauge {
                /**
                 * Defines an linear gauge
                 * @param left  (Required) X location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[]);
                /**
                 * Initializes gauge components. Overrides parent method
                 */
                initCustomShapes(): this;
                /**
                 * Refresh gauge limits.
                 */
                refreshLimits(): this;
                /**
                 * Initialize the gauge. Overrides parent method.
                 */
                init(): this;
                /**
                 * Returns the linear shape contained in this gauge
                 */
                getShape(): geotoolkit.gauges.shapes.LinearShape;
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
                /**
                 * Get gauge axis
                 */
                getAxis(): geotoolkit.axis.Axis;
                /**
                 * Get group containing the axis, for min/max or position editing
                 */
                getAxisGroup(): geotoolkit.scene.Group;
                /**
                 * Force Update gauge
                 */
                update(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{horishape:geotoolkit.gauges.shapes.LinearShape;axis:any;axisgroup:any;vertical:boolean}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.vertical  (Optional) Is shape vertical
                 * @param properties.horishape  (Optional) Horizontal shape
                 * @param properties.axis  (Optional) Gauge axis
                 * @param properties.axisgroup  (Optional) Axis group
                 */
                setProperties(properties: any | { vertical?: boolean; horishape?: geotoolkit.gauges.shapes.LinearShape; axis?: geotoolkit.axis.Axis|any; axisgroup?: geotoolkit.scene.Group|any; } ): this;
            }
            /**
             * Defines an Horizontal gauge
             */
            class HorizontalGauge extends geotoolkit.gauges.knownGauges.LinearGauge {
                /**
                 * Defines an Horizontal gauge
                 * @param left  (Required) X location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[]);
            }
            /**
             * Defines a Modern Horizontal Gauge
             */
            class ModernHorizontalGauge extends geotoolkit.gauges.knownGauges.HorizontalGauge {
                /**
                 * Defines a Modern Horizontal Gauge
                 * @param left  (Required) X location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number);
                /**
                 * Initialize gauge components. Overrides parent method
                 */
                initCustomShapes(): this;
            }
            /**
             * Defines a Simple Traffic gauge
             */
            class SimpleTrafficGauge extends geotoolkit.gauges.Gauge {
                /**
                 * Defines a Simple Traffic gauge
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param left.painter  (Optional) Painter that will define the indicators
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of ranges to apply
                 * @param painter  (Optional) Painter that will define the indicators
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; painter?: geotoolkit.scene.shapes.painters.AbstractPainter; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[], painter?: geotoolkit.scene.shapes.painters.AbstractPainter);
                /**
                 * Initialize gauge components. Overrides parent method to create a custom gauge.
                 */
                initCustomShapes(): this;
                /**
                 * Initialize gauge. Overrides parent method to create a custom gauge.
                 */
                init(): this;
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
                /**
                 * Set painter type for symbols. To use your own painter see CarnacJS/Symbols
                 * @param painter  (Required) The gauge painter
                 */
                setPainter(painter: geotoolkit.scene.shapes.painters.AbstractPainter): this;
                /**
                 * Force gauge update
                 */
                update(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{alarmshapes:geotoolkit.gauges.alarms.Alarm[];painter:string}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.alarmshapes  (Optional) Array of alarms
                 * @param properties.painter  (Optional) Symbol's painter's className
                 */
                setProperties(properties: any | { alarmshapes?: geotoolkit.gauges.shapes.AlarmShape[]; painter?: string; } ): this;
            }
            /**
             * Defines a Symbol Traffic gauge with no text
             */
            class SymbolTrafficGauge extends geotoolkit.gauges.knownGauges.SimpleTrafficGauge {
                /**
                 * Defines a Symbol Traffic gauge with no text
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number);
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
            }
            /**
             * Defines a Vertical Traffic Gauge
             */
            class VerticalTrafficGauge extends geotoolkit.gauges.knownGauges.SimpleTrafficGauge {
                /**
                 * Defines a Vertical Traffic Gauge
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param left.painter  (Optional) Painter that will define the indicators
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of ranges to apply
                 * @param painter  (Optional) Painter that will define the indicators
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; painter?: geotoolkit.scene.shapes.painters.AbstractPainter; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[], painter?: geotoolkit.scene.shapes.painters.AbstractPainter);
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{alarmshapes:any[]}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.alarmshapes  (Required) Array of alarm shapes
                 */
                setProperties(properties: any | { alarmshapes?: geotoolkit.gauges.shapes.AlarmShape[]; } ): this;
            }
            /**
             * Defines an Horizontal Traffic gauge
             */
            class HorizontalTrafficGauge extends geotoolkit.gauges.knownGauges.SimpleTrafficGauge {
                /**
                 * Defines an Horizontal Traffic gauge
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param left.painter  (Optional) Painter that will define the indicators
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of ranges to apply
                 * @param painter  (Optional) Painter that will define the indicators
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; painter?: geotoolkit.scene.shapes.painters.AbstractPainter; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[], painter?: geotoolkit.scene.shapes.painters.AbstractPainter);
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{painter:string;alarmshapes:geotoolkit.gauges.shapes.AlarmShape[]}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.painter  (Optional) Symbol's painter's className
                 * @param properties.alarmshapes  (Optional) Array of geotoolkit.gauges.alarms.Alarm
                 */
                setProperties(properties: any | { painter?: string; alarmshapes?: geotoolkit.gauges.shapes.AlarmShape[]; } ): this;
            }
            /**
             * Defines a traffic gauge with no text and only one single circle
             */
            class SymbolCircleTrafficGauge extends geotoolkit.gauges.knownGauges.SymbolTrafficGauge {
                /**
                 * Defines a traffic gauge with no text and only one single circle
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number);
            }
            /**
             * Defines a minimalistic Digital Gauge
             */
            class TitleGauge extends geotoolkit.gauges.Gauge {
                /**
                 * Defines a minimalistic Digital Gauge
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param left.headerFill  (Optional) Fillstyle for the header
                 * @param left.geaderLine  (Optional) Linestyle to apply to header
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of ranges to apply
                 * @param headerFill  (Optional) Fillstyle for the header
                 * @param geaderLine  (Optional) Linestyle to apply to header
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; headerFill?: geotoolkit.attributes.FillStyle; geaderLine?: geotoolkit.attributes.LineStyle; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[], headerFill?: geotoolkit.attributes.FillStyle, geaderLine?: geotoolkit.attributes.LineStyle);
                /**
                 * Get contour rectangle
                 */
                getHeaderRectangle(): geotoolkit.scene.shapes.Rectangle;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:any;properties:{headerrectangle:any}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.value  (Optional) shape value
                 * @param properties.headerrectangle  (Optional) Rectangle to set for header
                 */
                setProperties(properties: any | { value?: number; headerrectangle?: geotoolkit.scene.shapes.Rectangle|any; } ): this;
            }
            /**
             * Defines a Simple Label Gauge
             */
            class SimpleLabelGauge extends geotoolkit.gauges.knownGauges.TitleGauge {
                /**
                 * Defines a Simple Label Gauge
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of ranges to apply
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[]);
            }
            /**
             * Defines a Simple Circular Gauge
             */
            class SimpleCircularGauge extends geotoolkit.gauges.Gauge {
                /**
                 * Defines a Simple Circular Gauge
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param left.tickstrategy  (Optional) Tick strategy to apply
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of ranges to apply
                 * @param tickStrategy  (Optional) Tick strategy to apply
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; tickstrategy?: Function; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[], tickStrategy?: Function);
                /**
                 * Initialize gauge. Overrides parent method
                 */
                initCustomShapes(): this;
                /**
                 * Get circular shape
                 */
                getCircularShape(): geotoolkit.gauges.shapes.CircularShape;
                /**
                 * Gets the shape defining circular gauge
                 */
                getShape(): geotoolkit.gauges.shapes.CircularShape;
                /**
                 * Gets the circular tick
                 */
                getCircularTick(): geotoolkit.gauges.shapes.CircularTick;
                /**
                 * Force update gauge
                 */
                update(): this;
                /**
                 * Initialize gauge. Overrides parent method
                 */
                init(): this;
                /**
                 * Set minimum value of the gauge
                 * @param min  (Required) Minimum value
                 */
                setLow(min: number): this;
                /**
                 * Set maximum value of the gauge
                 * @param max  (Required) Maximum value
                 */
                setHigh(max: number): this;
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{fillbyvalue:boolean;circularshape:any;circulartick:any}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.value  (Optional) Gauge value
                 * @param properties.circularshape  (Optional) Circular shape
                 * @param properties.circulartick  (Optional) Circular tick
                 */
                setProperties(properties: any | { value?: number; circularshape?: geotoolkit.gauges.shapes.CircularShape|any; circulartick?: geotoolkit.gauges.shapes.CircularTick|any; } ): this;
            }
            /**
             * Defines a Simple Circular Gauge
             */
            class ModernCircularGauge extends geotoolkit.gauges.knownGauges.SimpleCircularGauge {
                /**
                 * Defines a Simple Circular Gauge
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of ranges to apply
Array of geotoolkit.gauges.utils.Range to apply
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[]);
                /**
                 * Initialize gauge components. Overrides parent method
                 */
                initCustomShapes(): this;
                /**
                 * Force update gauge
                 */
                update(): this;
            }
            /**
             * Defines a Circular Gauge with two values.
             */
            class DoubleCircularGauge extends geotoolkit.gauges.Gauge {
                /**
                 * Defines a Circular Gauge with two values.
                 * @param left  (Required) X location of the left boundary of the gauge or a JSON with parameters
                 * @param left.left  (Required) X location of the left boundary of the gauge or a JSON with parameters
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.externalLow  (Optional) Min of the external gauge
                 * @param left.externalHigh  (Optional) Max of the external gauge
                 * @param left.externalName  (Optional) Name of the external gauge
                 * @param left.internalLow  (Optional) Min of the internal gauge
                 * @param left.internalHigh  (Optional) Max of the internal gauge
                 * @param left.internalName  (Optional) Name of the internal gauge
                 * @param left.externalTickStrategy  (Optional) The external tick strategy of the gauge, default will generate a random between 0 and 100
                 * @param left.internalTickStrategy  (Optional) The internal tick strategy of the gauge, default will generate a random between 0 and 100
                 * @param right  (Optional) X location of the right boundary of the gauge
                 * @param bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param width  (Optional) Width of the gauge
                 * @param height  (Optional) Height of the gauge
                 * @param externalLow  (Optional) Min of the external gauge
                 * @param externalHigh  (Optional) Max of the external gauge
                 * @param externalName  (Optional) Name of the external gauge
                 * @param internalLow  (Optional) Min of the internal gauge
                 * @param internalHigh  (Optional) Max of the internal gauge
                 * @param internalName  (Optional) Name of the internal gauge
                 * @param externalTickStrategy  (Optional) The external tick strategy of the gauge, default will generate a random between 0 and 100
                 * @param internalTickStrategy  (Optional) The internal tick strategy of the gauge, default will generate a random between 0 and 100
                 */
                constructor(left: number|any | { left?: number|any; top?: number; right?: number; bottom?: number; width?: number; height?: number; externalLow?: number; externalHigh?: number; externalName?: string; internalLow?: number; internalHigh?: number; internalName?: string; externalTickStrategy?: Function; internalTickStrategy?: Function; } , right?: number, bottom?: number, width?: number, height?: number, externalLow?: number, externalHigh?: number, externalName?: string, internalLow?: number, internalHigh?: number, internalName?: string, externalTickStrategy?: Function, internalTickStrategy?: Function);
                /**
                 * Initialize gauge. Overrides parent method
                 */
                initCustomShapes(): this;
                /**
                 * Get name shape for internal circle
                 */
                getInternalNameShape(): geotoolkit.scene.shapes.Text;
                /**
                 * Get value shape for internal circle
                 */
                getInternalValueShape(): geotoolkit.scene.shapes.Text;
                /**
                 * Set minimum for inner circle
                 * @param min  (Required) min for inner circle
                 */
                setInternalLow(min: number): this;
                /**
                 * Set maximum for inner circle
                 * @param max  (Required) New maximum value
                 */
                setInternalHigh(max: number): this;
                /**
                 * Get circular shape for external circle
                 */
                getCircularShape(): geotoolkit.gauges.shapes.CircularShape;
                /**
                 * Get circular tick for internal circle
                 */
                getInternalCircularTick(): geotoolkit.gauges.shapes.CircularTick;
                /**
                 * Get circular shape for internal circle
                 */
                getInternalCircularShape(): geotoolkit.gauges.shapes.CircularShape;
                /**
                 * Get circular tick for external circle
                 */
                getCircularTick(): geotoolkit.gauges.shapes.CircularTick;
                /**
                 * Updates values in both circles. Overrides gauge updateValue
                 */
                updateValue(): this;
                /**
                 * Update gauge. Override this method to customize inherited gauges
                 */
                update(): this;
                /**
                 * Initialize gauge. Overrides parent method
                 */
                init(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{circularshape:any;circulartick:any;innercircularshape:any;innercirculartick:any;innernameshape:any;innervalueshape:any}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.value  (Optional) Shape value
                 * @param properties.circularshape  (Optional) circular shape
                 * @param properties.circulartick  (Optional) circular tick
                 * @param properties.innercircularshape  (Optional) inner circular shape
                 * @param properties.innercirculartick  (Optional) inner circular tick
                 * @param properties.innernameshape  (Optional) inner shape name text
                 * @param properties.innervalueshape  (Optional) inner shape value text
                 */
                setProperties(properties: any | { value?: number; circularshape?: geotoolkit.gauges.shapes.CircularShape|any; circulartick?: geotoolkit.gauges.shapes.CircularTick|any; innercircularshape?: geotoolkit.gauges.shapes.CircularShape|any; innercirculartick?: geotoolkit.gauges.shapes.CircularTick|any; innernameshape?: geotoolkit.scene.shapes.Text|any; innervalueshape?: geotoolkit.scene.shapes.Text|any; } ): this;
            }
            /**
             * Defines a Simple Digital Gauge
             */
            class SimpleDigitalGauge extends geotoolkit.gauges.Gauge {
                /**
                 * Defines a Simple Digital Gauge
                 * @param left  (Required) x location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of ranges to apply
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[]);
                /**
                 * Initialize gauge components. Overrides parent method
                 */
                initCustomShapes(): this;
                /**
                 * Initialize gauge. Overrides parent method
                 */
                init(): this;
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
                /**
                 * Get contour Rectangle. This is the rectangle affected by the Alarm
                 */
                getContourRectangle(): geotoolkit.scene.shapes.Rectangle;
                /**
                 * Get inner Rectangle. This is the colored static rectangle
                 */
                getInnerRectangle(): geotoolkit.scene.shapes.Rectangle;
                /**
                 * Force update gauge
                 */
                update(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{contourRectangle:geotoolkit.scene.shapes.Rectangle;innerRectangle:geotoolkit.scene.shapes.Rectangle;alarmContour:geotoolkit.gauges.alarms.Alarm}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.contourRectangle  (Optional) Contour rectangle
                 * @param properties.innerRectangle  (Optional) Inner rectangle
                 * @param properties.alarmContour  (Optional) Contour alarm
                 */
                setProperties(properties: any | { contourRectangle?: geotoolkit.scene.shapes.Rectangle; innerRectangle?: geotoolkit.scene.shapes.Rectangle; alarmContour?: geotoolkit.gauges.alarms.Alarm; } ): this;
            }
            /**
             * Defines an vertical gauge
             */
            class VerticalGauge extends geotoolkit.gauges.knownGauges.LinearGauge {
                /**
                 * Defines an vertical gauge
                 * @param left  (Required) X location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param left.name  (Optional) Name of the gauge
                 * @param left.ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 * @param name  (Optional) Name of the gauge
                 * @param ranges  (Optional) Array of geotoolkit.gauges.utils.Range to apply
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; name?: string; ranges?: geotoolkit.gauges.utils.Range[]; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number, name?: string, ranges?: geotoolkit.gauges.utils.Range[]);
            }
            /**
             * Defines a Modern Vertical Gauge
             */
            class ModernVerticalGauge extends geotoolkit.gauges.knownGauges.VerticalGauge {
                /**
                 * Defines a Modern Vertical Gauge
                 * @param left  (Required) X location of the left boundary of the gauge or JSON with parameters
                 * @param left.left  (Optional) X location of the left boundary of the gauge
                 * @param left.top  (Optional) Y location of the top boundary of the gauge
                 * @param left.right  (Optional) X location of the right boundary of the gauge
                 * @param left.bottom  (Optional) Y location of the bottom boundary of the gauge
                 * @param left.width  (Optional) Width of the gauge
                 * @param left.height  (Optional) Height of the gauge
                 * @param left.min  (Optional) Minimum of the gauge
                 * @param left.max  (Optional) Maximum of the gauge
                 * @param top  (Optional) X location of the right boundary of the gauge
                 * @param right  (Optional) Y location of the bottom boundary of the gauge
                 * @param bottom  (Optional) Width of the gauge
                 * @param width  (Optional) Height of the gauge
                 * @param height  (Optional) Minimum of the gauge
                 * @param min  (Optional) Maximum of the gauge
                 */
                constructor(left: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; min?: number; max?: number; } , top?: number, right?: number, bottom?: number, width?: number, height?: number, min?: number);
                /**
                 * Initialize gauge components. Overrides parent method
                 */
                initCustomShapes(): this;
            }
            /**
             * Implements a horizontal/vertical bar gauge which has color defined ranges that are portrayed by a
             * axis-like color bar. The gauge displays one value, unit, and status. A linear numeric axis is also present
             */
            class ColorRangeBarGauge extends geotoolkit.gauges.knownGauges.LinearGauge {
                /**
                 * Implements a horizontal/vertical bar gauge which has color defined ranges that are portrayed by a
                 * axis-like color bar. The gauge displays one value, unit, and status. A linear numeric axis is also present
                 * @param params  (Required) JSON with options to set
                 * @param params.axis  (Optional) Properties pertaining to axis shape
                 * @param params.axis.width  (Optional) Width of axis
                 * @param params.axis.ticks  (Optional) Object with tick properties see {@link geotoolkit.axis.AdaptiveTickGenerator}
                 * @param params.colorbar  (Optional) Properties pertaining to colorbar shape
                 * @param params.colorbar.width  (Optional) Width of colorbar
                 * @param params.colorbar.ranges  (Optional) Ranges that the color bar displays
                 * @param params.units  (Optional) Properties pertaining to units shape
                 * @param params.units.text  (Optional) Units text
                 * @param params.name  (Optional) Properties pertaining to name shape
                 * @param params.name.text  (Optional) Gauge name
                 * @param params.name.textstyle  (Optional) Styling of gauge name
                 * @param params.name.maxcharacters  (Optional) Maximum number of characters displayed in gauge name
                 * @param params.background  (Optional) Properties pertaining to background shape
                 * @param params.background.fillstyle  (Optional) Fill Style of background
                 * @param params.background.linestyle  (Optional) Line Style of background
                 * @param params.status  (Optional) Properties pertaining to status shape
                 * @param params.status.textstyle  (Optional) Text style of status shape
                 * @param params.value  (Optional) Properties pertaining to value shape
                 * @param params.value.value  (Optional) Value to set
                 * @param params.value.textstyle  (Optional) Text style of value shape
                 * @param params.value.ranges  (Optional) Ranges to display with handler functions
                 */
                constructor(params: any | { axis?: any | { width?: number; ticks?: any; } ; colorbar?: any | { width?: number; ranges?: geotoolkit.gauges.utils.Range[]; } ; units?: any | { text?: string; } ; name?: any | { text?: string; textstyle?: geotoolkit.attributes.TextStyle; maxcharacters?: number; } ; background?: any | { fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; } ; status?: any | { textstyle?: geotoolkit.attributes.TextStyle; } ; value?: any | { value?: number; textstyle?: geotoolkit.attributes.TextStyle; ranges?: any[]; } ; } );
                /**
                 * Sets options pertaining to this gauge
                 * @param data  (Required) JSON with options to set
                 * @param data.axis  (Optional) Properties pertaining to axis shape
                 * @param data.axis.width  (Optional) Width of axis
                 * @param data.axis.ticks  (Optional) Object with tick properties see {@link geotoolkit.axis.AdaptiveTickGenerator}
                 * @param data.colorbar  (Optional) Properties pertaining to colorbar shape
                 * @param data.colorbar.width  (Optional) Width of colorbar
                 * @param data.colorbar.ranges  (Optional) Ranges that the color bar displays
                 * @param data.units  (Optional) Properties pertaining to units shape
                 * @param data.units.text  (Optional) Units text
                 * @param data.name  (Optional) Properties pertaining to name shape
                 * @param data.name.text  (Optional) Gauge name
                 * @param data.name.textstyle  (Optional) Styling of gauge name
                 * @param data.name.maxcharacters  (Optional) Maximum number of characters displayed in gauge name
                 * @param data.background  (Optional) Properties pertaining to background shape
                 * @param data.background.fillstyle  (Optional) Fill Style of background
                 * @param data.background.linestyle  (Optional) Line Style of background
                 * @param data.status  (Optional) Properties pertaining to status shape
                 * @param data.status.textstyle  (Optional) Text style of status shape
                 * @param data.value  (Optional) Properties pertaining to value shape
                 * @param data.value.value  (Optional) Value to set
                 * @param data.value.textstyle  (Optional) Text style of value shape
                 * @param data.value.ranges  (Optional) Ranges to display with handler functions
                 */
                setOptions(data: any | { axis?: any | { width?: number; ticks?: any; } ; colorbar?: any | { width?: number; ranges?: geotoolkit.gauges.utils.Range[]; } ; units?: any | { text?: string; } ; name?: any | { text?: string; textstyle?: geotoolkit.attributes.TextStyle; maxcharacters?: number; } ; background?: any | { fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; } ; status?: any | { textstyle?: geotoolkit.attributes.TextStyle; } ; value?: any | { value?: number; textstyle?: geotoolkit.attributes.TextStyle; ranges?: any[]; } ; } ): this;
                /**
                 * Returns properties pertaining to this object
                 */
                getOptions(): {data:{axis:{width:number;ticks:any};colorbar:{width:number;ranges:geotoolkit.gauges.utils.Range[]};units:{text:string};name:{text:string;textstyle:geotoolkit.attributes.TextStyle;maxcharacters:number};background:{fillstyle:geotoolkit.attributes.FillStyle;linestyle:geotoolkit.attributes.LineStyle};status:{textstyle:geotoolkit.attributes.TextStyle};value:{value:number;textstyle:geotoolkit.attributes.TextStyle;ranges:any[]}}}|any;
                /**
                 * Sets options pertaining to this gauge
                 * @param data  (Required) JSON with options to set
                 * @param data.axis  (Optional) Properties pertaining to axis shape
                 * @param data.axis.width  (Optional) Width of axis
                 * @param data.axis.ticks  (Optional) Object with tick properties see {@link geotoolkit.axis.AdaptiveTickGenerator}
                 * @param data.colorbar  (Optional) Properties pertaining to colorbar shape
                 * @param data.colorbar.width  (Optional) Width of colorbar
                 * @param data.colorbar.ranges  (Optional) Ranges that the color bar displays
                 * @param data.units  (Optional) Properties pertaining to units shape
                 * @param data.units.text  (Optional) Units text
                 * @param data.name  (Optional) Properties pertaining to name shape
                 * @param data.name.text  (Optional) Gauge name
                 * @param data.name.textstyle  (Optional) Styling of gauge name
                 * @param data.name.maxcharacters  (Optional) Maximum number of characters displayed in gauge name
                 * @param data.background  (Optional) Properties pertaining to background shape
                 * @param data.background.fillstyle  (Optional) Fill Style of background
                 * @param data.background.linestyle  (Optional) Line Style of background
                 * @param data.status  (Optional) Properties pertaining to status shape
                 * @param data.status.textstyle  (Optional) Text style of status shape
                 * @param data.value  (Optional) Properties pertaining to value shape
                 * @param data.value.value  (Optional) Value to set
                 * @param data.value.textstyle  (Optional) Text style of value shape
                 * @param data.value.ranges  (Optional) Ranges to display with handler functions
                 */
                setProperties(data: any | { axis?: any | { width?: number; ticks?: any; } ; colorbar?: any | { width?: number; ranges?: geotoolkit.gauges.utils.Range[]; } ; units?: any | { text?: string; } ; name?: any | { text?: string; textstyle?: geotoolkit.attributes.TextStyle; maxcharacters?: number; } ; background?: any | { fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; } ; status?: any | { textstyle?: geotoolkit.attributes.TextStyle; } ; value?: any | { value?: number; textstyle?: geotoolkit.attributes.TextStyle; ranges?: any[]; } ; } ): this;
                /**
                 * Returns properties pertaining to this object
                 */
                getProperties(): {data:{axis:{width:number;ticks:any};colorbar:{width:number;ranges:geotoolkit.gauges.utils.Range[]};units:{text:string};name:{text:string;textstyle:geotoolkit.attributes.TextStyle;maxcharacters:number};background:{fillstyle:geotoolkit.attributes.FillStyle;linestyle:geotoolkit.attributes.LineStyle};status:{textstyle:geotoolkit.attributes.TextStyle};value:{value:number;textstyle:geotoolkit.attributes.TextStyle;ranges:any[]}}}|any;
                /**
                 * Sets fill style for fill bu value shape
                 * @param fillStyle  (Required) a new fill style
                 * @param fillStyle.color  (Optional) color
                 * @param fillStyle.pattern  (Optional) pattern
                 * @param fillStyle.foreground  (Optional) foreground color
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setValueFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
                /**
                 * Gets fill style for fill bu value shape
                 */
                getValueFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Applies a new set of color ranges to the color bar
                 * @param ranges  (Required) New ranges to apply
                 */
                setColorRanges(ranges: geotoolkit.gauges.utils.Range[]): this;
                /**
                 * Applies a new set of color ranges to the color bar
                 */
                getColorRanges(): geotoolkit.gauges.utils.Range[];
                /**
                 * Rebuild node. This method resets state, cache, and invalidate node.
                 */
                rebuild(): this;
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
                /**
                 * Set new gauge value, check if there are any defined ranges that this value falls within and call its handler
                 * @param val  (Required) New value of the gauge
                 * @param animated  (Optional) animated True to perform an animation
                 */
                setValue(val: number, animated?: boolean): this;
                /**
                 * Forced update the gauge
                 * @param forceUpdate  (Optional) 
                 */
                update(forceUpdate?: boolean): this;
                /**
                 * Refresh gauge limits.
                 */
                refreshLimits(): this;
                /**
                 * Initializes standsrd shapes pertaining to the gauge
                 */
                initShapes(): this;
                /**
                 * Gets color bar shape
                 */
                getColorBar(): geotoolkit.gauges.shapes.ColorBarShape;
                /**
                 * Gets group that contains color bar
                 */
                getColorBarGroup(): geotoolkit.scene.Group;
                /**
                 * Gets shape which displays status
                 */
                getStatusShape(): geotoolkit.scene.shapes.Text;
                /**
                 * Gets shape which displays units
                 */
                getUnitsShape(): geotoolkit.scene.shapes.Text;
                /**
                 * Only in vertical gauge returns axis which contains the color bar.
                 * In horizontal shape will return null
                 */
                getColorAxis(): geotoolkit.axis.Axis;
                /**
                 * Only in vertical gauge returns axis Group which contains the color bar.
                 * In horizontal shape will return null
                 */
                getColorAxisGroup(): geotoolkit.scene.Group;
                /**
                 * Initializes gauge components. Overrides parent method
                 */
                initCustomShapes(): this;
                /**
                 * Changes status text of the gauge (Everything after 'Status: ' prefix)
                 * @param status  (Required) New status to set
                 */
                setStatus(status: string): this;
                /**
                 * Updates static shapes
                 */
                updateStatic(): this;
            }
        }
        module shapes {
            class ColorBarShape extends geotoolkit.scene.Group {
                /**
                 * @param params  (Required) A JSON with properties
                 * @param params.ranges  (Required) Ranges that this color bar represents
                 * @param params.orientation  (Required) Orientation of the color bar
                 * @param params.max  (Required) Maximum of the range represented by this color bar
                 * @param params.min  (Required) Minimum of the range represented by this color bar
                 */
                constructor(params: any | { ranges?: geotoolkit.gauges.utils.Range[]; orientation?: string|geotoolkit.util.Orientation; max?: number; min?: number; } );
                /**
                 * Applies a new set of color ranges to the color bar
                 * @param ranges  (Required) New ranges to apply
                 */
                setColorRanges(ranges: geotoolkit.gauges.utils.Range[]): this;
                /**
                 * Adds one range to color ranges
                 * @param range  (Required) New range to add
                 */
                addRange(range: geotoolkit.gauges.utils.Range): this;
                /**
                 * Flips the color bar range positions
                 */
                flip(): this;
                /**
                 * Sets flipped state
                 * @param flipped  (Required) Flipped flag
                 */
                setFlipped(flipped: boolean): this;
                /**
                 * Gets flipped state
                 */
                isFlipped(): boolean;
                /**
                 * Sets minimum of the shape
                 * @param min  (Required) New minimum bound of the shape
                 */
                setMin(min: number): this;
                /**
                 * Sets maximum of the shape
                 * @param max  (Required) New maximum bound of the shape
                 */
                setMax(max: number): this;
                /**
                 * Sets properties pertaining to this object
                 * @param props  (Required) Properties to apply
                 * @param props.ranges  (Required) Ranges that this color bar represents
                 * @param props.orientation  (Required) Orientation of the color bar
                 * @param props.max  (Required) Maximum of the range represented by this color bar
                 * @param props.min  (Required) Minimum of the range represented by this color bar
                 */
                setProperties(props: any | { ranges?: geotoolkit.gauges.utils.Range[]; orientation?: string|geotoolkit.util.Orientation; max?: number; min?: number; } ): this;
                /**
                 * Gets properties pertaining to this object
                 */
                getProperties(): {props:{ranges:geotoolkit.gauges.utils.Range[];orientation:string|geotoolkit.util.Orientation;max:number;min:number}}|any;
            }
            /**
             * Defines a Base Shape
             */
            class BaseShape extends geotoolkit.scene.Group {
                /**
                 * Defines a Base Shape
                 * @param low  (Required) low value of the range
                 * @param high  (Required) high value of the range
                 * @param center  (Required) center location of the shape
                 * @param needle  (Required) needle to be used for this shape
                 * @param fillbyvalue  (Required) chooses to draw based on value
                 * @param rangeset  (Required) set of ranges for display
                 * @param linestyle  (Required) lineStyle for the shape
                 */
                constructor(low: number, high: number, center: geotoolkit.util.Point, needle: geotoolkit.gauges.shapes.NeedleShape, fillbyvalue: boolean, rangeset: any[], linestyle: geotoolkit.attributes.LineStyle);
                /**
                 * Add range to rangeSet
                 * @param range  (Required) Range to be added to Array of ranges
                 */
                addRange(range: geotoolkit.gauges.utils.Range): any;
                /**
                 * Set needle
                 * @param needle  (Required) to use
                 */
                setNeedle(needle: geotoolkit.gauges.shapes.NeedleShape): this;
                /**
                 * Get needle
                 */
                getNeedle(): geotoolkit.gauges.shapes.NeedleShape;
                /**
                 * Set rangeSet
                 * @param set  (Required) 
                 */
                setRangeSet(set: any[]): this;
                /**
                 * Set refresh behavior.
                 * @param fill  (Required) true if shape affected by value, false if shape is static
                 */
                setFillByValue(fill: boolean): any;
                /**
                 * Get refresh behavior.
                 */
                getFillByValue(): boolean;
                /**
                 * Get line style
                 */
                getLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Set low value
                 * @param low  (Required) low value
                 */
                setLow(low: number): this;
                /**
                 * Normalize a value based on the low and high
                 * @param value  (Required) value to normalize
                 */
                normalize(value: number): number;
                /**
                 * Pre-Normalize a value based on the low and high
                 * @param value  (Required) value to normalize
                 */
                prenormalize(value: number): number;
                /**
                 * Set high value
                 * @param high  (Required) high value
                 */
                setHigh(high: number): this;
                /**
                 * get high value
                 */
                getHigh(): number;
                /**
                 * get low value
                 */
                getLow(): number;
                /**
                 * Init Elements.
                 * Override to define action
                 */
                initElements(): any;
                /**
                 * Get static elements
                 */
                getStaticElements(): any[];
                /**
                 * Get dynamic elements
                 */
                getDynamicElements(): any[];
                /**
                 * Set center anchor
                 * @param center  (Required) center point
                 */
                setCenter(center: geotoolkit.util.Point): this;
                /**
                 * Get center anchor
                 */
                getCenter(): geotoolkit.util.Point;
                /**
                 * Get alarm
                 */
                getAlarm(): geotoolkit.gauges.alarms.Alarm;
                /**
                 * Get ranges
                 */
                getRanges(): geotoolkit.util.Range[];
                /**
                 * Set line style
                 * @param style  (Required) linestyle to be used by the shape(s)
                 */
                setLineStyle(style: geotoolkit.attributes.LineStyle): this;
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{center:geotoolkit.util.Point;rangeset:any[];fillbyvalue:boolean;min:number;max:number;needle:any;linestyle:geotoolkit.attributes.LineStyle;alarm:geotoolkit.gauges.alarms.Alarm}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.center  (Optional) center position
                 * @param properties.rangeset  (Optional) array of geotoolkit.gauges.utils.Range
                 * @param properties.fillbyvalue  (Optional) is filled by value
                 * @param properties.min  (Optional) min value
                 * @param properties.max  (Optional) max value
                 * @param properties.needle  (Optional) needle shape
                 * @param properties.linestyle  (Optional) lineStyle
                 * @param properties.alarm  (Optional) alarm
                 */
                setProperties(properties?: any | { center?: geotoolkit.util.Point; rangeset?: any[]; fillbyvalue?: boolean; min?: number; max?: number; needle?: geotoolkit.gauges.shapes.NeedleShape|any; linestyle?: geotoolkit.attributes.LineStyle; alarm?: geotoolkit.gauges.alarms.Alarm|any; } ): this;
            }
            /**
             * Shape defined by a symbol and a text, updated based on an Alarm behavior.
             */
            class AlarmShape extends geotoolkit.gauges.shapes.BaseShape {
                /**
                 * Shape defined by a symbol and a text, updated based on an Alarm behavior.
                 * @param symbol  (Optional) Symbol to be used or JSON with parameters
                 * @param symbol.symbol  (Optional) Symbol to be used
                 * @param symbol.text  (Optional) Text for the alarm shape
                 * @param symbol.alarm  (Optional) Alarm to be used
                 * @param text  (Optional) Text for the alarm shape
                 * @param alarm  (Optional) Alarm to be used
                 */
                constructor(symbol?: geotoolkit.scene.shapes.Symbol|any | { symbol?: geotoolkit.scene.shapes.Symbol; text?: string; alarm?: geotoolkit.gauges.alarms.Alarm; } , text?: string, alarm?: geotoolkit.gauges.alarms.Alarm);
                /**
                 * Initialize shape elements.
                 * Override this method to customize shape
                 */
                initElements(): this;
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
                /**
                 * Set alarm for this shape
                 * @param alarm  (Required) Alarm to be used
                 */
                setAlarm(alarm: geotoolkit.gauges.alarms.Alarm): this;
                /**
                 * Set symbol for this shape
                 * @param symbol  (Required) symbol to be used
                 */
                setSymbol(symbol: geotoolkit.scene.shapes.Symbol): this;
                /**
                 * Set text for this shape
                 * @param text  (Required) to be used
                 */
                setText(text: geotoolkit.scene.shapes.Text): this;
                /**
                 * Get symbol of this shape
                 */
                getSymbol(): geotoolkit.scene.shapes.Symbol;
                /**
                 * Get text used in this shape
                 */
                getText(): geotoolkit.scene.shapes.Text;
            }
            /**
             * Defines a Circular Shape
             */
            class CircularShape extends geotoolkit.gauges.shapes.BaseShape {
                /**
                 * Defines a Circular Shape
                 * @param innerradius  (Required) innerRadius of the circle
                 * @param outerradius  (Required) outerRadius of the circle
                 * @param startangle  (Required) startAngle of the circle
                 * @param endangle  (Required) endAngle of the circle
                 */
                constructor(innerradius: number, outerradius: number, startangle: number, endangle: number);
                /**
                 * Initialize shape elements
                 * Override to customize inherited classes
                 */
                initElements(): this;
                /**
                 * Set angle range in which the shape will be displayed
                 * @param start  (Required) start Angle
                 * @param end  (Required) end Angle
                 */
                setAngles(start: number, end: number): this;
                /**
                 * Set radius range for shape
                 * @param inner  (Required) inner radius
                 * @param outer  (Required) outer radius
                 */
                setRadius(inner: number, outer: number): this;
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
                /**
                 * Creates a light grey shadow on the outer circle of the gauge
                 */
                initShadow(): this;
                /**
                 * Create a behavior for the needle element
                 */
                initNeedle(): this;
                /**
                 * Gets an object with inner and outer radius set on this shape
                 */
                getRadius(): {obj:{inner:number;outer:number}}|any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{innerradius:number;outerradius:number;startangle:number;endangle:number;deltaarc:number;circles:geotoolkit.scene.Group}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.innerradius  (Optional) Inner radius length
                 * @param properties.outerradius  (Optional) Outer radius length
                 * @param properties.startangle  (Optional) Angle where the arc starts
                 * @param properties.endangle  (Optional) Angle where the arc ends
                 * @param properties.deltaarc  (Optional) Delta angle
                 * @param properties.circles  (Optional) Group containing circle components
                 */
                setProperties(properties: any | { innerradius?: number; outerradius?: number; startangle?: number; endangle?: number; deltaarc?: number; circles?: geotoolkit.scene.Group; } ): this;
            }
            /**
             * Create Ticks for Circular Shapes
             */
            class CircularTick extends geotoolkit.gauges.shapes.BaseShape {
                /**
                 * Create Ticks for Circular Shapes
                 * @param center  (Optional) Center point of the circular gauge or JSON with parameters
                 * @param center.center  (Optional) Center point of the circular gauge
                 * @param center.innerrad  (Optional) Inner limit of the shape
                 * @param center.outerrad  (Optional) Outer limit of the shape
                 * @param center.startangle  (Optional) Angle at which low value is displayed
                 * @param center.endangle  (Optional) Angle at which high value is displayed
                 * @param innerRad  (Optional) Inner limit of the shape
                 * @param outerRad  (Optional) Outer limit of the shape
                 * @param startAngle  (Optional) Angle at which low value is displayed
                 * @param endAngle  (Optional) Angle at which high value is displayed
                 */
                constructor(center?: geotoolkit.util.Point|any | { center?: geotoolkit.util.Point; innerrad?: number; outerrad?: number; startangle?: number; endangle?: number; } , innerRad?: number, outerRad?: number, startAngle?: number, endAngle?: number);
                /**
                 * Sets the offset that labels have from the ticks
                 * @param offset  (Required) Offset of the lable from tick along the radius
                 */
                setLabelOffset(offset: number): this;
                /**
                 * Init shape elements. Override of parent method
                 */
                initElements(): this;
                /**
                 * Gets properties pertaining to the ticks of specified grade
                 * @param grade  (Required) 
                 */
                getTickProperties(grade: any): {obj:{number:number;linestyle:geotoolkit.attributes.LineStyle;range:geotoolkit.util.Range}}|any;
                /**
                 * Force redraw of shape
                 */
                redraw(): this;
                /**
                 * Set display strategy for labeling
                 * @param strategy  (Required) Strategy function to be used
                 */
                setDisplayStrategy(strategy: Function): this;
                /**
                 * Get display strategy
                 */
                getDisplayStrategy(): Function;
                /**
                 * Fill tick values
                 * @param isMajorFilled  (Required) Are major labels already Filled
                 * @param isMinorFilled  (Required) Are minor labels already Filled
                 */
                fillTickValues(isMajorFilled: boolean, isMinorFilled: boolean): this;
                /**
                 * Normalize index and get label using it
                 * @param list  (Required) Array of labels
                 * @param i  (Required) Index inside the array
                 */
                getLabel(list: any[], i: number): any;
                /**
                 * Place a tick on the gauge
                 * @param angle  (Required) angle where to place the tick
                 * @param type  (Required) Location type of the tick
                 * @param style  (Required) Style of the label
                 * @param value  (Required) Value to be displayed
                 */
                placeTick(angle: number, type: geotoolkit.gauges.utils.CircularTickLocation, style: geotoolkit.attributes.TextStyle, value: string): this;
                /**
                 * Gets text shape used to render tick labels
                 */
                getText(): geotoolkit.scene.shapes.Text;
                /**
                 * Get inside anchor depending on input angle
                 * @param angle  (Required) Input angle where tick is to be placed
                 */
                getInsideAnchor(angle: number): geotoolkit.util.AnchorType;
                /**
                 * Set strategy for major ticks
                 * @param number  (Required) Amount of ticks to be displayed or JSON with parameters
                 * @param number.number  (Optional) Amount of ticks to be displayed
                 * @param number.style  (Optional) Linestyle for ticks
                 * @param number.range  (Optional) Tick internal size
                 * @param style  (Optional) Linestyle for ticks
                 * @param range  (Optional) Tick internal size
                 */
                setMajorTick(number: number|any | { number?: number; style?: geotoolkit.attributes.LineStyle; range?: geotoolkit.util.Range; } , style?: geotoolkit.attributes.LineStyle, range?: geotoolkit.util.Range): this;
                /**
                 * Set strategy for minor ticks
                 * @param number  (Required) Amount of ticks to be displayed between two major ticks
                 * @param number.number  (Optional) Amount of ticks to be displayed between two major ticks
                 * @param number.style  (Optional) Linestyle for ticks
                 * @param number.range  (Optional) Tick internal size
                 * @param style  (Optional) Linestyle for ticks
                 * @param range  (Optional) Tick internal size
                 */
                setMinorTick(number: number|any | { number?: number; style?: geotoolkit.attributes.LineStyle|any; range?: geotoolkit.util.Range; } , style?: geotoolkit.attributes.LineStyle|any, range?: geotoolkit.util.Range): this;
                /**
                 * Set angle range in which the shape will be displayed
                 * @param start  (Required) Start Angle
                 * @param end  (Required) End Angle
                 */
                setAngles(start: number, end: number): this;
                /**
                 * Set radius range for shape
                 * @param inner  (Required) Inner radius
                 * @param outer  (Required) Outer radius
                 */
                setRadius(inner: number, outer: number): this;
                /**
                 * Set strategy for major labels
                 * @param visible  (Required) Set visibility on or off or JSON with parameters
                 * @param visible.type  (Optional) Location of ticks
                 * @param visible.textstyle  (Optional) Style of labels
                 * @param visible.values  (Optional) List of labels to be used - null for automated values
                 * @param type  (Optional) Location of ticks
                 * @param textstyle  (Optional) Style of labels
                 * @param values  (Optional) List of labels to be used - null for automated values
                 */
                setMajorLabels(visible: boolean|any | { type?: geotoolkit.gauges.utils.CircularTickLocation; textstyle?: geotoolkit.attributes.TextStyle; values?: number[]|string[]; } , type?: geotoolkit.gauges.utils.CircularTickLocation, textstyle?: geotoolkit.attributes.TextStyle, values?: number[]|string[]): this;
                /**
                 * Set strategy for minor labels
                 * @param visible  (Required) Set visibility on or off or JSON with parameters
                 * @param visible.visible  (Required) Set visibility on or off or JSON with parameters
                 * @param visible.type  (Optional) Location of ticks
                 * @param visible.textstyle  (Optional) Style of labels
                 * @param visible.values  (Optional) List of labels to be used - null for automated values
                 * @param type  (Optional) Location of ticks
                 * @param textstyle  (Optional) Style of labels
                 * @param values  (Optional) List of labels to be used - null for automated values
                 */
                setMinorLabels(visible: boolean|any | { visible?: boolean; type?: geotoolkit.gauges.utils.CircularTickLocation; textstyle?: geotoolkit.attributes.TextStyle; values?: number[]|string[]; } , type?: geotoolkit.gauges.utils.CircularTickLocation, textstyle?: geotoolkit.attributes.TextStyle, values?: number[]|string[]): this;
                /**
                 * Set high value
                 * @param high  (Required) New high value
                 */
                setHigh(high: number): this;
                /**
                 * Set low value
                 * @param low  (Required) New low value
                 */
                setLow(low: number): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{width:number;height:number;outerrad:number;innerrad:number;center:geotoolkit.util.Point;adaptedx:number;adaptedy:number;innercirclepercentage:number;startangle:number;endangle:number;majortick:any;minortick:any;majorlabel:any;minorlabel:any;ticklist:geotoolkit.scene.Group;displaystrategy:string}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.width  (Optional) Width
                 * @param properties.height  (Optional) Height
                 * @param properties.outerrad  (Optional) Outer radius
                 * @param properties.innerrad  (Optional) Inner radius
                 * @param properties.center  (Optional) Center position
                 * @param properties.adaptedx  (Optional) Center x
                 * @param properties.adaptedy  (Optional) Center y
                 * @param properties.innercirclepercentage  (Optional) Inner circle percentage
                 * @param properties.startangle  (Optional) Angle where the angle starts
                 * @param properties.endangle  (Optional) Angle where the angle ends
                 * @param properties.majortick  (Optional) JSON with major tick infos
                 * @param properties.minortick  (Optional) JSON with minor tick infos
                 * @param properties.majorlabel  (Optional) JSON with major label infos
                 * @param properties.minorlabel  (Optional) JSON with minor label infos
                 * @param properties.ticklist  (Optional) Group of ticks
                 * @param properties.displaystrategy  (Optional) Function display
                 */
                setProperties(properties: any | { width?: number; height?: number; outerrad?: number; innerrad?: number; center?: geotoolkit.util.Point; adaptedx?: number; adaptedy?: number; innercirclepercentage?: number; startangle?: number; endangle?: number; majortick?: any; minortick?: any; majorlabel?: any; minorlabel?: any; ticklist?: geotoolkit.scene.Group; displaystrategy?: string; } ): this;
            }
            /**
             * Defines a painter to service circular ticks.
             */
            class CircularTickPainter {
                /**
                 * Defines a painter to service circular ticks.
                 * @param symbol  (Required) A symbol to paint on the circular tick
                 * @param bbox  (Required) Bounding box of the circular tick
                 * @param context  (Required) Rendering context
                 */
                constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
            }
            /**
             * Defines a RectangularShape
             */
            class LinearShape extends geotoolkit.gauges.shapes.BaseShape {
                /**
                 * Defines a RectangularShape
                 * @param width  (Optional) Width of the shape or JSON with parameters
                 * @param width.width  (Optional) Width of the shape
                 * @param width.height  (Optional) Height of the shape
                 * @param width.center  (Optional) Center point for this shape
                 * @param width.lineStyle  (Optional) LineStyle for this shape
                 * @param width.vertical  (Optional) Defines whether line is vertical or not
                 * @param height  (Optional) Height of the shape
                 * @param center  (Optional) Center point for this shape
                 * @param lineStyle  (Optional) LineStyle for this shape
                 */
                constructor(width?: number|any | { width?: number; height?: number; center?: geotoolkit.util.Point; lineStyle?: geotoolkit.attributes.LineStyle; vertical?: geotoolkit.attributes.LineStyle; } , height?: number, center?: geotoolkit.util.Point, lineStyle?: geotoolkit.attributes.LineStyle);
                /**
                 * Initialize Elements.
                 * Override to customize inherited classes
                 */
                initElements(): this;
                /**
                 * Set dimensions within the gauge
                 * @param width  (Required) Width of the gauge
                 * @param height  (Required) Height of the gauge
                 */
                setDimensions(width: number, height: number): this;
                /**
                 * Force hardcoded shapes to reload based on new ranges
                 */
                reloadRanges(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{vertical:boolean;shadow:geotoolkit.scene.shapes.Rectangle;rects:geotoolkit.scene.Group;rectshadow:geotoolkit.scene.Group;rectneedle:geotoolkit.scene.Group}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.vertical  (Optional) Vartical shape flag
                 * @param properties.shadow  (Optional) Shadow rectangle
                 * @param properties.rects  (Optional) Rects group
                 * @param properties.rectshadow  (Optional) Rectshadow group
                 * @param properties.rectneedle  (Optional) Needle group
                 */
                setProperties(properties: any | { vertical?: boolean; shadow?: geotoolkit.scene.shapes.Rectangle; rects?: geotoolkit.scene.Group; rectshadow?: geotoolkit.scene.Group; rectneedle?: geotoolkit.scene.Group; } ): this;
            }
            /**
             * Defines a shape that has rounded sides
             */
            class AnnotatedFillGaugeShape extends geotoolkit.gauges.shapes.BaseShape {
                /**
                 * Defines a shape that has rounded sides
                 * @param params  (Required) JSON with properties pertaining to this class
                 * @param params.width  (Optional) 
                 * @param params.height  (Optional) 
                 * @param params.orientation  (Optional) 
                 * @param params.linestyle  (Optional) 
                 * @param params.bounds  (Optional) 
                 * @param params.min  (Optional) 
                 * @param params.max  (Optional) 
                 * @param params.initshadow  (Optional) 
                 * @param params.fillstyle  (Optional) 
                 * @param params.ranges  (Optional) 
                 * @param params.markerstyle  (Optional) when the fill value is bigger than the tick
                 */
                constructor(params: any | { width?: number; height?: number; orientation?: geotoolkit.util.Orientation; linestyle?: geotoolkit.attributes.LineStyle; bounds?: geotoolkit.util.Rect; min?: number; max?: number; initshadow?: boolean; fillstyle?: geotoolkit.attributes.FillStyle; ranges?: geotoolkit.util.Range[]; markerstyle?: geotoolkit.attributes.LineStyle; } );
                /**
                 * Returns a clone of this shape
                 */
                clone(): geotoolkit.gauges.shapes.AnnotatedFillGaugeShape;
                /**
                 * Updates the shape
                 */
                update(): any;
                /**
                 * Returns axis which draws ticks on the shape
                 */
                getAxis(): geotoolkit.axis.Axis|any;
                /**
                 * Returns tick generator which calculates lines on the shape
                 */
                static getTickGenerator(): geotoolkit.axis.NumericLinearTickGenerator;
                /**
                 * Sets needle width
                 * @param width  (Required) 
                 */
                setNeedleWidth(width: number): this;
                /**
                 * Sets needle height
                 * @param height  (Required) 
                 */
                setNeedleHeight(height: number): this;
                /**
                 * Sets color of needle line
                 * @param color  (Required) 
                 */
                setNeedleColor(color: string): this;
                /**
                 * Sets style for the marker which is placed at the position of current value
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setMarkerStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Sets bounds of the shape part
                 * @param bounds  (Required) 
                 */
                setShapeBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Sets value by which the shape should be filled. Value should be from 0 to 1
                 * @param val  (Required) Value from 0 to 1
                 */
                setFillValue(val: number): this;
                /**
                 * Sets fill style for value fill
                 * @param fillstyle  (Required) 
                 */
                setValueFillStyle(fillstyle: geotoolkit.attributes.FillStyle): this;
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
                 * Gets fill style
                 */
                getFillStyle(): geotoolkit.attributes.FillStyle;
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
                 * Returns line style
                 */
                getLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Sets edge radius to the shape
                 * @param radius  (Required) New rsdius to set
                 */
                setEdgeRadius(radius: number): this;
                /**
                 * Sets fill style for the shadow element
                 * @param fillStyle  (Required) 
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setShadowFillStyle(fillStyle: geotoolkit.attributes.FillStyle, merge?: boolean): this;
                /**
                 * Sets fill style for the shadow element
                 */
                getShadowFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Sets value ranges for the gauge
                 * @param ranges  (Required) 
                 */
                setRanges(ranges: geotoolkit.gauges.utils.Range[]): this;
                /**
                 * Sets orientation for the bar
                 * @param orientation  (Required) 
                 * @param skipShadow  (Optional) 
                 */
                protected setOrientation(orientation: string, skipShadow?: boolean): any;
                /**
                 * Sets shape bounds inside gauge
                 * @param bounds  (Required) bound of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect|any): this;
                /**
                 * Returns fill value of the shape
                 */
                getFillValue(): number|any;
                /**
                 * Returns itself as a static element
                 */
                getStaticElements(): geotoolkit.gauges.shapes.AnnotatedFillGaugeShape[];
                /**
                 * Sets lower limit of the range
                 * @param low  (Required) New lower limit
                 */
                setLow(low: number): this;
                /**
                 * Sets higher limit of the range
                 * @param high  (Required) New higher limit
                 */
                setHigh(high: number): this;
                /**
                 * Setps properties pertaining to this object
                 */
                getProperties(): {props:{center:geotoolkit.util.Point;rangeset:geotoolkit.gauges.utils.Range[];fillbyvalue:boolean;min:number;max:number;needle:geotoolkit.gauges.shapes.NeedleShape|any;linestyle:geotoolkit.attributes.LineStyle;alarm:geotoolkit.gauges.alarms.Alarm|any}}|any;
                /**
                 * Setps properties pertaining to this object
                 * @param props  (Optional) JSON containing the properties to set
                 * @param props.center  (Optional) center position
                 * @param props.rangeset  (Optional) array of geotoolkit.gauges.utils.Range
                 * @param props.fillbyvalue  (Optional) is filled by value
                 * @param props.min  (Optional) min value
                 * @param props.max  (Optional) max value
                 * @param props.needle  (Optional) needle shape
                 * @param props.linestyle  (Optional) lineStyle
                 * @param props.alarm  (Optional) alarm
                 */
                setProperties(props?: any | { center?: geotoolkit.util.Point; rangeset?: geotoolkit.gauges.utils.Range[]; fillbyvalue?: boolean; min?: number; max?: number; needle?: geotoolkit.gauges.shapes.NeedleShape|any; linestyle?: geotoolkit.attributes.LineStyle; alarm?: geotoolkit.gauges.alarms.Alarm|any; } ): this;
            }
            /**
             * Defines a Horizontal Shape
             */
            class HorizontalShape extends geotoolkit.gauges.shapes.LinearShape {
                /**
                 * Defines a Horizontal Shape
                 * @param width  (Optional) width of the shape or JSON object with parameters
                 * @param width.width  (Optional) width of the shape or JSON object with parameters
                 * @param width.height  (Optional) height of the shapegood morning!
                 * @param width.center  (Optional) center point for this shape
                 * @param width.lineStyle  (Optional) lineStyle for this shape
                 * @param height  (Optional) Height of the shape
                 * @param center  (Optional) Center point for this shape
                 * @param lineStyle  (Optional) LineStyle for this shape
                 */
                constructor(width?: number|any | { width?: number|any; height?: number; center?: geotoolkit.util.Point; lineStyle?: geotoolkit.attributes.LineStyle; } , height?: number, center?: geotoolkit.util.Point, lineStyle?: geotoolkit.attributes.LineStyle);
            }
            /**
             * Defines a Vertical Shape
             */
            class VerticalShape extends geotoolkit.gauges.shapes.LinearShape {
                /**
                 * Defines a Vertical Shape
                 * @param width  (Optional) Width of the shape or JSON with parameters
                 * @param width.width  (Optional) Width of the shape
                 * @param width.height  (Optional) Height of the shape
                 * @param width.center  (Optional) Center point for this shape
                 * @param width.lineStyle  (Optional) LineStyle for this shape
                 * @param width.vertical  (Optional) Defines whether line is vertical or not
                 * @param height  (Optional) Height of the shape
                 * @param center  (Optional) Center point for this shape
                 * @param lineStyle  (Optional) LineStyle for this shape
                 */
                constructor(width?: number|any | { width?: number; height?: number; center?: geotoolkit.util.Point; lineStyle?: geotoolkit.attributes.LineStyle; vertical?: geotoolkit.attributes.LineStyle; } , height?: number, center?: geotoolkit.util.Point, lineStyle?: geotoolkit.attributes.LineStyle);
            }
            /**
             * Defines a Needle Shape
             */
            class NeedleShape extends geotoolkit.scene.Group {
                /**
                 * Defines a Needle Shape
                 * @param center  (Required) center of needle
                 * @param size  (Required) size of needle
                 * @param lineSize  (Required) lineSize for needle
                 * @param symbolPainter  (Required) symbolPainter
                 * @param symbolSizeX  (Required) symbolSizeX for symbol
                 * @param symbolSizeY  (Required) symbolSizeY for symbol
                 * @param colorFill  (Required) colorFill of the needle
                 * @param colorLine  (Required) colorLine of the needle
                 */
                constructor(center: geotoolkit.util.Point, size: number, lineSize: number, symbolPainter: geotoolkit.scene.shapes.painters.AbstractPainter, symbolSizeX: number, symbolSizeY: number, colorFill: string, colorLine: string);
                /**
                 * Init the shape.
                 * Override to build your own
                 */
                init(): any;
                /**
                 * Resize the shape
                 */
                setSize(): this;
                /**
                 * Set the center
                 */
                setCenter(): this;
                /**
                 * get the center
                 */
                getCenter(): geotoolkit.util.Point;
                /**
                 * rotate the needle for Horizontal (rather than vertical) shape
                 */
                forHorizontal(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{center:geotoolkit.util.Point;size:number;symbolSizeX:number;symbolSizeY:number;colorFill:string;colorLine:string;lineSize:number;symbolPainter:string}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.center  (Optional) center position
                 * @param properties.size  (Optional) size of needle
                 * @param properties.symbolSizeX  (Optional) X size of needle symbol
                 * @param properties.symbolSizeY  (Optional) Y size of needle symbol
                 * @param properties.colorFill  (Optional) fill color
                 * @param properties.colorLine  (Optional) line color
                 * @param properties.lineSize  (Optional) line size
                 * @param properties.symbolPainter  (Optional) symbol painter
                 */
                setProperties(properties?: any | { center?: geotoolkit.util.Point; size?: number; symbolSizeX?: number; symbolSizeY?: number; colorFill?: string; colorLine?: string; lineSize?: number; symbolPainter?: string; } ): this;
            }
            module needles {
                /**
                 * Defines a Needle Shape
                 */
                class ModernCircular extends geotoolkit.gauges.shapes.NeedleShape {
                    /**
                     * Defines a Needle Shape
                     * @param center  (Required) center
                     * @param size  (Required) size of the needle
                     * @param colorFill  (Required) colorFill of the needle
                     * @param colorLine  (Required) colorLine outline of the needle
                     * @param centerSize  (Required) centerSize of the anchor
                     */
                    constructor(center: geotoolkit.util.Point, size: number, colorFill: string, colorLine: string, centerSize: number);
                    /**
                     * Init the shape.
                     * Override to build your own
                     */
                    init(): any;
                    /**
                     * Customizes the circle
                     * @param color  (Required) for the inner circle
                     */
                    setCircleColor(color: string): this;
                    /**
                     * Customizes the circle
                     * @param fillstyle  (Required) for the inner circle
                     */
                    setCircleFillStyle(fillstyle: geotoolkit.attributes.FillStyle): this;
                    /**
                     * Customizes the lines
                     * @param linestyle  (Required) 
                     */
                    setLineStyle(linestyle: geotoolkit.attributes.LineStyle): this;
                    /**
                     * Customizes the needle
                     * @param fillstyle  (Required) for the needle
                     */
                    setFillStyle(fillstyle: geotoolkit.attributes.FillStyle): this;
                    /**
                     * Customizes the needle
                     * @param size  (Required) for the needle
                     */
                    setCenterSize(size: number): this;
                    /**
                     * Gets all the properties pertaining to this object
                     */
                    getProperties(): any;
                    /**
                     * Sets all the properties pertaining to this object
                     * @param properties  (Required) An object containing the properties to set
                     * @param properties.centerSize  (Optional) size of center
                     * @param properties.symbol  (Optional) symbol
                     * @param properties.circleFillStyle  (Optional) circle fillStyle
                     */
                    setProperties(properties: any | { centerSize?: number; symbol?: geotoolkit.scene.shapes.Symbol|any; circleFillStyle?: geotoolkit.attributes.FillStyle|any; } ): this;
                }
                /**
                 * Defines a Needle Shape
                 */
                class ModernLinear extends geotoolkit.gauges.shapes.NeedleShape {
                    /**
                     * Defines a Needle Shape
                     * @param center  (Required) center
                     * @param width  (Required) width of the needle
                     * @param height  (Required) height of the needle
                     * @param colorFill  (Required) colorFill of the needle
                     * @param colorLine  (Required) colorLine outline of the needle
                     */
                    constructor(center: geotoolkit.util.Point, width: number, height: number, colorFill: string, colorLine: string);
                    /**
                     * Init the shape.
                     * Override to build your own
                     */
                    init(): any;
                    /**
                     * Set pointing direction
                     * @param dir  (Required) 
                     */
                    setPointing(dir: geotoolkit.gauges.utils.Direction): this;
                }
                /**
                 * Defines a Needle Shape
                 */
                class SimpleCircular extends geotoolkit.gauges.shapes.NeedleShape {
                    /**
                     * Defines a Needle Shape
                     * @param center  (Required) center
                     * @param size  (Required) size of the needle
                     * @param colorfill  (Required) colorFill of the needle
                     * @param colorline  (Required) colorLine outline of the needle
                     * @param centersize  (Required) centerSize of the anchor
                     */
                    constructor(center: geotoolkit.util.Point, size: number, colorfill: string, colorline: string, centersize: number);
                    /**
                     * Init the shape.
                     * override to build your own
                     */
                    init(): any;
                    /**
                     * Customizes the lines
                     * @param linestyle  (Required) 
                     */
                    setLineStyle(linestyle: geotoolkit.attributes.LineStyle): this;
                    /**
                     * Customizes the line used for the center
                     * @param linestyle  (Required) 
                     */
                    setCenterLineStyle(linestyle: geotoolkit.attributes.LineStyle): this;
                    /**
                     * Customizes the needle
                     * @param fillstyle  (Required) for the needle
                     */
                    setFillStyle(fillstyle: geotoolkit.attributes.FillStyle): this;
                    /**
                     * Customizes the needle
                     * @param size  (Required) for the needle
                     */
                    setCenterSize(size: number): this;
                    /**
                     * Gets all the properties pertaining to this object
                     */
                    getProperties(): {props:{centerSize:number}}|any;
                    /**
                     * Sets all the properties pertaining to this object
                     * @param properties  (Required) An object containing the properties to set
                     * @param properties.centerSize  (Optional) size of center
                     */
                    setProperties(properties: any | { centerSize?: number; } ): this;
                }
                /**
                 * Defines a Needle Shape
                 */
                class SimpleLinear extends geotoolkit.gauges.shapes.NeedleShape {
                    /**
                     * Defines a Needle Shape
                     * @param center  (Required) center of needle
                     * @param size  (Required) size of needle
                     * @param linesize  (Required) linesize for needle
                     * @param symbolpainter  (Required) symbolPainter
                     * @param symbolsizex  (Required) symbolSizeX for symbol
                     * @param symbolsizey  (Required) symbolSizeY for symbol
                     * @param colorfill  (Required) colorFill of the needle
                     * @param colorfine  (Required) colorLine of the needle
                     */
                    constructor(center: geotoolkit.util.Point, size: number, linesize: number, symbolpainter: geotoolkit.scene.shapes.painters.AbstractPainter, symbolsizex: number, symbolsizey: number, colorfill: string, colorfine: string);
                    /**
                     * Init the shape.
                     * Override to build your own
                     */
                    init(): any;
                }
                /**
                 * Defines a Needle Shape
                 */
                class Triangular extends geotoolkit.gauges.shapes.NeedleShape {
                    /**
                     * Defines a Needle Shape
                     * @param center  (Required) center of needle or JSON with properties
                     * @param center.size  (Optional) size of needle
                     * @param center.linesize  (Optional) linesize for needle
                     * @param center.symbolpainter  (Optional) symbolPainter
                     * @param center.symbolsizex  (Optional) symbolSizeX for symbol
                     * @param center.symbolsizey  (Optional) symbolSizeY for symbol
                     * @param center.colorfill  (Optional) colorFill of the needle
                     * @param center.colorfine  (Optional) colorLine of the needle
                     * @param center.width  (Optional) width of the circle in the center of needle
                     * @param center.height  (Optional) height of the circle in the center of needle
                     * @param center.centercolor  (Optional) color of the circle in the center of needle
                     * @param center.circleradius  (Optional) radius of the circle in the center of needle
                     * @param center.centerradius  (Optional) radius of the circle in the center of needle
                     * @param size  (Optional) size of needle
                     * @param linesize  (Optional) linesize for needle
                     * @param symbolpainter  (Optional) symbolPainter
                     * @param symbolsizex  (Optional) symbolSizeX for symbol
                     * @param symbolsizey  (Optional) symbolSizeY for symbol
                     * @param colorfill  (Optional) colorFill of the needle
                     * @param colorfine  (Optional) colorLine of the needle
                     */
                    constructor(center: any | { size?: number; linesize?: number; symbolpainter?: geotoolkit.scene.shapes.painters.AbstractPainter; symbolsizex?: number; symbolsizey?: number; colorfill?: string; colorfine?: string; width?: string; height?: string; centercolor?: string; circleradius?: string; centerradius?: string; } |geotoolkit.util.Point, size?: number, linesize?: number, symbolpainter?: geotoolkit.scene.shapes.painters.AbstractPainter, symbolsizex?: number, symbolsizey?: number, colorfill?: string, colorfine?: string);
                    /**
                     * Init the shape.
                     * Override to build your own
                     */
                    init(): any;
                }
            }
        }
    }
}
