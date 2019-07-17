declare module geotoolkit {
    module gauges {
        /**
         * Different modes that define how the value and name texts fit the regions they are rendered in.
         */
        var ValueDisplayStrategies: any;
        /**
         * An Alarm is attached to a gauge and contains a collection of Alerts
         */
        class Alarm {
            /**
             * An Alarm is attached to a gauge and contains a collection of Alerts
             * @param params  (Required) JSON with properties
             * @param params.name  (Optional) Name of the alarm for indexing
             * @param params.range  (Optional) Range that the alarm is effective on
             * @param params.handlername  (Optional) Name of the handler function as defined in Alarm Factory
             * @param params.additionalproperties  (Optional) Extra properties which will be passed into the handler function as fourth parameter
             */
            constructor(params: any | { name?: string; range?: geotoolkit.util.Range; handlername?: string; additionalproperties?: any; } );
            /**
             * Gets the name of the function in Alarm Factory that is associated with this alarm
             */
            getHandlerName(): string;
            /**
             * Gets the name of the function in Alarm Factory that is associated with this alarm
             */
            getName(): string;
            /**
             * Takes a value and tests if it lies within this alarm range
             * @param val  (Required) Value to test
             */
            testValue(val: number): boolean;
            /**
             * Sets properties pertaining to alarm class
             * @param props  (Required) JSON with properties or an alarm to extract properties from
             * @param props.name  (Optional) Name of the alarm for indexing
             * @param props.range  (Optional) When value of the gauge or axis falls within this range, the alarm will fire
             * @param props.handlername  (Optional) Name of the handler in function registry which will be called when this alarm will fire
             * @param props.additionalproperties  (Optional) Extra properties which will be passed into the handler function as fourth parameter
             */
            setProperties(props: any | { name?: string; range?: geotoolkit.util.Range; handlername?: string; additionalproperties?: any; } |geotoolkit.gauges.Alarm): this;
            /**
             * Returns properties of alarm
             */
            getProperties(): {props:{name:string;range:geotoolkit.util.Range;handlername:string;additionalproperties:any}}|any;
            /**
             * Returns extra properties which will be passed into the handler function as fourth parameter
             */
            getAdditionalProperties(): any;
            /**
             * Sets extra properties which will be passed into the handler function as fourth parameter
             * @param props  (Required) Properties
             */
            setAdditionalProperties(props: any): this;
            /**
             * Returns an instance of alarm created using provided properties
             * @param props  (Required) alarm properties
             */
            static fromObject(props: any|geotoolkit.gauges.Alarm): geotoolkit.gauges.Alarm;
        }
        class AbstractGauge extends geotoolkit.scene.AbstractNode implements geotoolkit.scene.INodeEnumerable,geotoolkit.layout.ILayoutable {
            /**
             * @param props  (Required) JSON with gauge properties
             * @param props.x  (Optional) X coordinate of left top corner of the gauge in its parent model limits
             * @param props.y  (Optional) Y coordinate of left top corner of the gauge in its parent model limits
             * @param props.width  (Optional) Width of the gauge in its parent model limits
             * @param props.height  (Optional) Height of the gauge in its parent model limits
             * @param props.bounds  (Optional) Bounds of the gauge in parent model limits. Will override x,y,widht,height
             * @param props.name  (Optional) Name of the gauge
             * @param props.functionregistry  (Optional) Function registry which will be used
as a source of handler functions (ex: animation easing functions)
             * @param props.clipping  (Optional) Container group clipping
             */
            constructor(props: any | { x?: number; y?: number; width?: number; height?: number; bounds?: geotoolkit.util.Rect; name?: string; functionregistry?: geotoolkit.gauges.registry.FunctionRegistry; clipping?: boolean; } );
            /**
             * Layer to which a dynamic element should be added
             */
            static DynamicElementPosition: any;
            /**
             * Events fired by AbstractGauge
             */
            static Events: any;
            /**
             * Copy constructor function
             * Used to clone gauge
             * @param gauge  (Required) source gauge
             */
            protected copyConstructor(gauge: geotoolkit.gauges.AbstractGauge): this;
            /**
             * Returns current bounds of the gauge
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Sets bounds to the gauge
             * @param bounds  (Required) New bounds
             */
            setBounds(bounds: geotoolkit.util.Rect): this;
            /**
             * For North, South sides sets height, for East and West sets width, for custom regions sets x, y, width and height
             * @param regionType  (Required) Name of the region
             * @param size  (Required) Width or height of a side in CSS format, or an object with properties for custom regions
             * @param size.x  (Optional) X of the region in CSS notation
             * @param size.y  (Optional) Y of the region in CSS notation
             * @param size.width  (Optional) Width of the region in CSS notation
             * @param size.height  (Optional) Height of the region in CSS notation
             */
            setRegionSize(regionType: geotoolkit.gauges.layout.Regions|string, size: number|string|any | { x?: number|string; y?: number|string; width?: number|string; height?: number|string; } ): this;
            /**
             * Sets innergroup clipping
             * @param clipping  (Required) clipping
             */
            enableClipping(clipping: boolean): this;
            /**
             * Renders the gauge
             * @param context  (Required) Context to render the Gauge
             */
            render(context: geotoolkit.renderer.RenderingContext): this;
            /**
             * Adds a custom component to provided specified region. A custom component is a group with any geometry
             * inside. The group bounds will be changed to fit the region it is added to. To maintain the size of your custom
             * group it is better to add a custom region to the gauge.
             * @param component  (Required) A group with custom shape(s)
             * @param region  (Required) Name of the region to add component to. If such region does not
exist nothing will happen and the custom shape will not be added
             * @param layer  (Required) name of gauge layer to add component
             */
            addCustomComponent(component: geotoolkit.scene.Group, region: geotoolkit.gauges.layout.Regions|string, layer: geotoolkit.gauges.layout.Layers|string): this;
            /**
             * Return iterator on registered custom components
             * @param filter  (Optional) a filter function. Returns all nodes if null
             */
            getCustomComponents(filter?: Function): geotoolkit.util.Iterator;
            /**
             * Returns a registered custom component by its index
             * @param index  (Required) Index or name of the component to return
             */
            getCustomComponent(index: number|string): geotoolkit.scene.Group;
            /**
             * Removes a registered custom component from the gauge. If such component was not registered, does nothing.
             * @param component  (Required) The component which has to be deleted, or its index
in iterator.
             */
            removeCustomComponent(component: geotoolkit.scene.Group|number): this;
            /**
             * Adds a new region to the gauge. Region is a rectangular area on the gauge defined by x, y, width and height
             * all set in CSS format.
             * @param name  (Required) Name of the region or a json with region parameters (including name)
             * @param name.name  (Optional) Name of the region
             * @param name.x  (Optional) x-coordinate of the region
             * @param name.y  (Optional) y-coordinate of the region
             * @param name.width  (Optional) width of the region
             * @param name.height  (Optional) height of the region
             * @param region  (Optional) JSON with region parameters
             */
            addRegion(name: string|any | { name?: string|number; x?: string|number; y?: string|number; width?: string|number; height?: string|number; } , region?: any): this;
            /**
             * Deletes a region from the layout. Only custom added regions can be removed. Will do nothing if
             * no such region was registered
             * @param name  (Required) Name of the region
             */
            removeRegion(name: string): this;
            /**
             * Returns the region registered with provided name.
             * @param name  (Required) Name of the region to return
             */
            getRegion(name: geotoolkit.gauges.layout.Regions|string): geotoolkit.gauges.layout.Region;
            /**
             * Debug method to display regions of the gauge in different colors
             * @param name  (Optional) If you want to display only one region, pass its name here
             */
            displayRegions(name?: string): this;
            /**
             * Hides the regions displayed for debug reasons
             */
            hideRegions(): this;
            /**
             * Returns the current layout of the gauge
             */
            getLayoutStyle(): geotoolkit.layout.LayoutStyle;
            /**
             * Specify desired layout style
             * @param layoutStyle  (Required) desired layout style
             */
            setLayoutStyle(layoutStyle: geotoolkit.layout.LayoutStyle|any): this;
            /**
             * Sets function registry which will provide handlers for gauges animation and alarms
             * @param registry  (Required) New registry to set
             */
            setFunctionRegistry(registry: geotoolkit.gauges.registry.FunctionRegistry): this;
            /**
             * Returns function registry which provides handlers for gauges animation and alarms
             */
            getFunctionRegistry(): geotoolkit.gauges.registry.FunctionRegistry;
            /**
             * Update scene transformation
             */
            updateSceneTransformation(): this;
            /**
             * Check if gauge falls within visible area on the screen
             * @param context  (Required) Rendering Context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
            /**
             * Sets properties pertaining to this gauge. Used for serialization. Please use setOptions for gauge customization.
             * @param props  (Required) JSON with properties
             * @param props.x  (Optional) X coordinate of gauge in its parent model limits
             * @param props.y  (Optional) Y coordinate of gauge in its parent model limits
             * @param props.width  (Optional) Width of the gauge in its parent model limits
             * @param props.height  (Optional) Height of the gauge in its parent model limits
             * @param props.bounds  (Optional) Bounds of the gauge in parent model limits. Overrides x, y, width, and Height
             * @param props.clipping  (Optional) Enables/disables axis label clipping
             * @param props.functionregistry  (Optional) Function registry which will be used
             * @param props.fillstyle  (Optional) a new fill style
             * @param props.linestyle  (Optional) line style or options
             */
            setProperties(props: any | { x?: number; y?: number; width?: number; height?: number; bounds?: geotoolkit.util.Rect; clipping?: boolean; functionregistry?: geotoolkit.gauges.registry.FunctionRegistry; fillstyle?: geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle|any; linestyle?: geotoolkit.attributes.LineStyle|any; } ): this;
            /**
             * Sets properties pertaining to this gauge.
             * @param options  (Required) JSON with properties
             * @param options.x  (Optional) X coordinate of gauge in its parent model limits
             * @param options.y  (Optional) Y coordinate of gauge in its parent model limits
             * @param options.width  (Optional) Width of the gauge in its parent model limits
             * @param options.height  (Optional) Height of the gauge in its parent model limits
             * @param options.bounds  (Optional) Bounds of the gauge in parent model limits. Overrides x, y, width, and Height
             * @param options.functionregistry  (Optional) Function registry which will be used
             */
            setOptions(options: any | { x?: number; y?: number; width?: number; height?: number; bounds?: geotoolkit.util.Rect; functionregistry?: geotoolkit.gauges.registry.FunctionRegistry; } ): this;
            /**
             * Gets properties pertaining to this gauge.
             */
            getOptions(): {props:{bounds:geotoolkit.util.Rect;functionregistry:geotoolkit.gauges.registry.FunctionRegistry;clipping:boolean}}|any;
            /**
             * Gets properties pertaining to this gauge. Used for serialization. Please use setOptions for gauge customization.
             */
            getProperties(): {props:{bounds:geotoolkit.util.Rect;functionregistry:geotoolkit.gauges.registry.FunctionRegistry;clipping:boolean}}|any;
            /**
             * Add invalidate handler
             * @param handler  (Required) handler to be notified about invalidation
             */
            addInvalidateHandler(handler: Function): any;
            /**
             * Remove invalidate handler
             * @param handler  (Required) handler to be notified about invalidation
             */
            removeInvalidateHandler(handler: Function): any;
            /**
             * Enumerate children nodes
             * @param callback  (Required) callback function
             * @param target  (Optional) callback target
             */
            enumerateNodes(callback: Function, target?: any): any;
            /**
             * Returns transformation from node to root scene
             */
            getSceneTransform(): geotoolkit.util.Transformation;
            /**
             * Retrieves the transformation of bounds to parent
             */
            getLocalTransform(): geotoolkit.util.Transformation;
            /**
             * Sets local transformation to be used to transform from local to parent
             * coordinate
             * @param localTransform  (Required) local transformation for this node
             */
            setLocalTransform(localTransform: geotoolkit.util.Transformation): this;
        }
        /**
         * Defines a class which implements a gauge displaying data represented by axes. Each axis represents one specific data
         * set with lower and upper limit. Every normal operation, like setting value, function registry, animation, e.t.c, are
         * performed on the axes as opposed to gauge like it is done in the numeric gauges. In this case the gauge
         * works as a container of the axes and is only capable of axis manipulations and abstract gauge functionality.
         */
        class AxisGauge extends geotoolkit.gauges.AbstractGauge {
            /**
             * Defines a class which implements a gauge displaying data represented by axes. Each axis represents one specific data
             * set with lower and upper limit. Every normal operation, like setting value, function registry, animation, e.t.c, are
             * performed on the axes as opposed to gauge like it is done in the numeric gauges. In this case the gauge
             * works as a container of the axes and is only capable of axis manipulations and abstract gauge functionality.
             * @param params  (Required) Object with axis gauge properties
             */
            constructor(params: any);
            /**
             * Copy constructor function
             * Used to clone gauge
             * @param gauge  (Required) source gauge
             */
            protected copyConstructor(gauge: geotoolkit.gauges.AxisGauge): this;
            /**
             * Adds a new axis to the axis gauge.
             * @param params  (Required) Parameters required to create an axis
             */
            addAxis(params: any): geotoolkit.gauges.axis.Axis;
            /**
             * Sets properties pertaining to this gauge. Please use setOptions for customization.
             * @param props  (Required) Properties to set
             * @param props.axes  (Optional) JSON with axes properties where the key is the axis name and the property is an
object with axis properties. If no axis with such name has been registered, a new axis with the properties will be added.
             */
            setProperties(props: any | { axes?: any|geotoolkit.gauges.axis.Axis; } ): this;
            /**
             * Gets properties pertaining to this gauge. Please use setOptions for customization.
             */
            getProperties(): any;
            /**
             * Gets an axis by its name or index from axes iterator
             * @param name  (Required) Name of the axis or its index
             */
            getAxis(name: string|number): geotoolkit.gauges.axis.Axis;
            /**
             * Returns an iterator over existing axes in this gauge
             * @param filter  (Optional) a filter function. Returns all axes if null
             */
            getAxes(filter?: Function): geotoolkit.util.Iterator;
            /**
             * Removes an axis from the gauge. If no such gauge exists, nothing will be done.
             * @param name  (Required) Name of the axis or its index
             */
            removeAxis(name: string|number): this;
            /**
             * Changes the name of axis in the map without needing to remove and readd the axis
             * @param oldName  (Required) Old name of the axis
             * @param newName  (Required) New name of the axis
             */
            reassignAxisName(oldName: string, newName: string): this;
            /**
             * Checks if the gauge contains specified axis
             * @param axis  (Required) The axis or its name
             */
            hasAxis(axis: geotoolkit.gauges.axis.Axis|string): boolean;
            /**
             * Enumerate children nodes
             * @param callback  (Required) callback
             * @param target  (Optional) target
             */
            enumerateNodes(callback: Function, target?: any): any;
            /**
             * If this method is called on the gauge instead of an axis, the value and skipAnimation will be propagated
             * to each axis registered for the gauge. Equivalent to looping through each axis and setting this value.
             * @param val  (Required) New value for each axis
             * @param skipAnimation  (Required) True to not animate
             */
            setValue(val: number, skipAnimation: boolean): this;
            /**
             * If this method is called on the gauge instead of an axis, the value and skipAnimation will be propagated
             * to each axis registered for the gauge. Equivalent to looping through each axis and setting this value.
             * Sets a new data range displayed by this axis
             * @param range  (Required) New range to set
             * @param range.min  (Optional) lower limit
             * @param range.max  (Optional) upper limit
             */
            setRange(range: geotoolkit.util.Range|any | { min?: number; max?: number; } ): this;
        }
        /**
         * This class implements a full Circular Gauge with possibility of multiple arrows. <br>
         * A Circular Gauge is a visual representation of a measuring device with a radial axis that sweeps any angle from 0 to 360 degrees and a pointer (Needle or arrow) that indicates values on that scale.<br>
         * Gauges value is basically an angle on a circle plot. Gauges can have radius and start and end angle.
         * Gauge axes are usually colored for easy value distinction.
         */
        class CircularGauge extends geotoolkit.gauges.AxisGauge {
            /**
             * This class implements a full Circular Gauge with possibility of multiple arrows. <br>
             * A Circular Gauge is a visual representation of a measuring device with a radial axis that sweeps any angle from 0 to 360 degrees and a pointer (Needle or arrow) that indicates values on that scale.<br>
             * Gauges value is basically an angle on a circle plot. Gauges can have radius and start and end angle.
             * Gauge axes are usually colored for easy value distinction.
             * @param params  (Required) JSON with gauge parameters
             * @param params.startangle  (Optional) Start of the gauge body in radians
             * @param params.sweepangle  (Optional) Sweep of the gauge body in radians
             * @param params.background  (Optional) JSON with background properties
             * @param params.background.fillstyle  (Optional) Fillstyle to apply to background
             * @param params.background.linestyle  (Optional) Linestyle to apply to background
             * @param params.background.visible  (Optional) Sets visibility to background
             */
            constructor(params: any | { startangle?: number; sweepangle?: number; background?: any | { fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; visible?: boolean; } ; } );
            /**
             * Copy constructor function
             * Used to clone gauge
             * @param gauge  (Required) source gauge
             */
            protected copyConstructor(gauge: geotoolkit.gauges.CircularGauge): this;
            /**
             * Sets padding style
             * @param style  (Required) padding style
             */
            setPaddingStyle(style: geotoolkit.attributes.SpaceStyle|any): geotoolkit.scene.Group;
            /**
             * Gets padding style
             */
            getPaddingStyle(): geotoolkit.attributes.SpaceStyle;
            /**
             * Sets a new start angle
             * @param angle  (Required) Angle in radians
             */
            setStartAngle(angle: number): this;
            /**
             * Sets a new sweep angle
             * @param angle  (Required) Angle in radians
             */
            setSweepAngle(angle: number): this;
            /**
             * Adds a new circular axis to the gauge. An axis can have only one needle. In order to add more needles to a gauge
             * user needs to add a new axis with its own ranges and data.
             * @param params  (Required) Parameters required to create an axis
             */
            addAxis(params: any): geotoolkit.gauges.axis.Axis;
            /**
             * Sets properties pertaining to circulr gauge. Used for serialization. Please use setOptions for gauge customization.
             * @param opts  (Required) JSON with properties
             * @param opts.startangle  (Optional) Start angle of gauge body arc
             * @param opts.sweepangle  (Optional) Angle by which the axis body sweeps. End angle becomes startangle + sweepanle
             */
            setOptions(opts: any | { startangle?: number; sweepangle?: number; } ): this;
            /**
             * Returns properties pertaining to this gauge. Used for serialization, please use getOptions for customization.
             */
            getOptions(): {props:{startangle:number;sweepangle:number}}|any;
            /**
             * Returns properties pertaining to this gauge. Used for serialization, please use getOptions for customization.
             */
            getProperties(): {props:{startangle:number;sweepangle:number;background:{fillstyle:geotoolkit.attributes.FillStyle;linestyle:geotoolkit.attributes.LineStyle;visible:boolean}}}|any;
            /**
             * Sets properties pertaining to circulr gauge. Used for serialization. Please use setOptions for gauge customization.
             * @param props  (Required) JSON with properties
             * @param props.startangle  (Optional) Start angle of gauge body arc
             * @param props.sweepangle  (Optional) Angle by which the axis body sweeps. End angle becomes startangle + sweepanle
             * @param props.background  (Optional) JSON with background properties
             * @param props.background.fillstyle  (Optional) Fillstyle of background circle
             * @param props.background.linestyle  (Optional) Linestyle of background circle
             * @param props.background.visible  (Optional) Visibility of the background shape
             */
            setProperties(props: any | { startangle?: number; sweepangle?: number; background?: any | { fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; visible?: boolean; } ; } ): this;
            /**
             * Updates and recalculates parameters of gauge, like radius, angles, and updates axes.
             */
            update(): this;
        }
        /**
         * A gauge which only displays value, name, and any custom components added.
         */
        class NumericGauge extends geotoolkit.gauges.AbstractGauge {
            /**
             * A gauge which only displays value, name, and any custom components added.
             * @param params  (Required) JSON with properties
             * @param params.animationfunction  (Optional) Name of an easing function in function registry which will define the animation behavior
             * @param params.animationtime  (Optional) 
             * @param params.value  (Optional) Value of the gauge to set at initiation
             * @param params.alarms  (Optional) A list of alarms to set on the gauge.
             * @param params.units  (Optional) Units in which data is represented in this gauge
             * @param params.background  (Optional) JSON with properties for rectangular background of the gauge
             * @param params.background.fillstyle  (Optional) Fill style of the background rectangle
             * @param params.background.linestyle  (Optional) Line style of the background rectangle
             * @param params.background.visible  (Optional) Visibility of the background rectangle
             * @param params.namestyle  (Optional) JSON with properties of the test displaying name of the gauge
             * @param params.namestyle.position  (Optional) Region in which to render the name text
             * @param params.namestyle.color  (Optional) Color of name text
             * @param params.namestyle.font  (Optional) Font of name text
             * @param params.namestyle.textstyle  (Optional) Text style of the name text. If provided, overrides
font and color
             * @param params.namestyle.displaystrategy  (Optional) A display strategy to define how the
name text fits the region it is rendered in
             * @param params.namestyle.alignment  (Optional) Defines where in the region the name text will be positioned
             * @param params.namestyle.visible  (Optional) Visibility of the name text
             * @param params.valuestyle  (Optional) JSON with properties of the test displaying name of the gauge
             * @param params.valuestyle.position  (Optional) Region in which to render the name text
             * @param params.valuestyle.color  (Optional) Color of name text
             * @param params.valuestyle.font  (Optional) Font of value text
             * @param params.valuestyle.textstyle  (Optional) Text style of the value text. If provided, overrides
font and color
             * @param params.valuestyle.displaystrategy  (Optional) A display strategy to define how the
value text fits the region it is rendered in
             * @param params.valuestyle.alignment  (Optional) Defines where in the region the value text will be positioned
             * @param params.valuestyle.visible  (Optional) Visibility of the value text
             * @param params.valuestyle.formatter  (Optional) Formatter which will be used to format the value
before displaying it.
             * @param params.valuestyle.format  (Optional) Format of value to set on number formatter
             */
            constructor(params: any | { animationfunction?: string; animationtime?: number; value?: number; alarms?: geotoolkit.gauges.Alarm[]; units?: string; background?: any | { fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; visible?: boolean; } ; namestyle?: any | { position?: geotoolkit.gauges.layout.Regions; color?: string|geotoolkit.util.RgbaColor; font?: string; textstyle?: geotoolkit.attributes.TextStyle; displaystrategy?: geotoolkit.gauges.ValueDisplayStrategies; alignment?: geotoolkit.util.AnchorType; visible?: boolean; } ; valuestyle?: any | { position?: geotoolkit.gauges.layout.Regions; color?: string|geotoolkit.util.RgbaColor; font?: string; textstyle?: geotoolkit.attributes.TextStyle; displaystrategy?: geotoolkit.gauges.ValueDisplayStrategies; alignment?: geotoolkit.util.AnchorType; visible?: boolean; formatter?: geotoolkit.util.NumberFormat; format?: string; } ; } );
            /**
             * Copy constructor function
             * Used to clone gauge
             * @param gauge  (Required) gauge for cloning
             */
            protected copyConstructor(gauge: geotoolkit.gauges.NumericGauge): any;
            /**
             * Adds an alarm to the axis. Alarm handler will be called every time
             * value set on the axis falls within alarm's range
             * @param alarm  (Required) An alarm to add
             */
            addAlarm(alarm: geotoolkit.gauges.Alarm): this;
            /**
             * Gets the alarm referenced by provided name or index. If alarm name is not set or no such
             * index exists, null will be returned.
             * @param name  (Required) Name of alarm or its index in iterator
             */
            getAlarm(name: string|number): geotoolkit.gauges.Alarm|any;
            /**
             * Removes an alarm by its name, index, or instance of alarm. The alarm will never be called again and reference to
             * it will be removed. Does nothing if no such alarm has been added before
             * @param name  (Required) Name of alarm or its index in iterator
             */
            removeAlarm(name: string|number|geotoolkit.gauges.Alarm): this;
            /**
             * Removes all attached alarms
             */
            cleanAlarms(): this;
            /**
             * Gets an iterator over existing alarms in the gauge
             * @param filter  (Optional) a filter function. Returns all axes if not provided
             */
            getAlarms(filter?: Function): geotoolkit.util.Iterator;
            /**
             * Sets properties pertaining to text representing gauge value
             * @param props  (Required) Object with properties
             * @param props.properties  (Optional) see {@link geotoolkit.scene.shapes.Text#setProperties}
             * @param props.position  (Optional) Region in which to render the name text
             * @param props.color  (Optional) Color of name text
             * @param props.font  (Optional) Font of value text
             * @param props.textstyle  (Optional) Text style of the value text. If provided, overrides
font and color
             * @param props.displaystrategy  (Optional) A display strategy to define how the
value text fits the region it is rendered in
             * @param props.alignment  (Optional) Defines where in the region the value text will be positioned
             * @param props.visible  (Optional) Visibility of the value text
             * @param props.formatter  (Optional) Formatter which will be used to format the value
before displaying it.
             * @param props.format  (Optional) Format of value to set on number formatter
             */
            setValueProperties(props: any | { properties?: any; position?: geotoolkit.gauges.layout.Regions; color?: string|geotoolkit.util.RgbaColor; font?: string; textstyle?: geotoolkit.attributes.TextStyle; displaystrategy?: geotoolkit.gauges.ValueDisplayStrategies; alignment?: geotoolkit.util.AnchorType; visible?: boolean; formatter?: geotoolkit.util.NumberFormat; format?: string; } ): this;
            /**
             * Returns background styles
             */
            getBackgroundStyle(): any;
            /**
             * Sets background styles
             * @param props  (Required) JSON containing background styles
             * @param props.linestyle  (Optional) background linestyle
             * @param props.fillstyle  (Optional) background fillstyle
             * @param props.visible  (Optional) background visibility
             */
            setBackgroundStyle(props: any | { linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; visible?: boolean; } ): this;
            /**
             * Gets properties of value text
             */
            getValueProperties(): {props:string}|any;
            /**
             * Sets properties pertaining to text representing gauge name
             * @param props  (Required) Object with properties
             * @param props.properties  (Optional) see {@link geotoolkit.scene.shapes.Text#setProperties}
             * @param props.position  (Optional) Region in which to render the name text
             * @param props.color  (Optional) Color of name text
             * @param props.font  (Optional) Font of name text
             * @param props.textstyle  (Optional) Text style of the name text. If provided, overrides
font and color
             * @param props.displaystrategy  (Optional) A display strategy to define how the
name text fits the region it is rendered in
             * @param props.alignment  (Optional) Defines where in the region the name text will be positioned
             * @param props.visible  (Optional) Visibility of the name text
             */
            setNameProperties(props: any | { properties?: any; position?: geotoolkit.gauges.layout.Regions; color?: string|geotoolkit.util.RgbaColor; font?: string; textstyle?: geotoolkit.attributes.TextStyle; displaystrategy?: geotoolkit.gauges.ValueDisplayStrategies; alignment?: geotoolkit.util.AnchorType; visible?: boolean; } ): this;
            /**
             * Gets properties of value text
             */
            getNameProperties(): {props:{position:geotoolkit.gauges.layout.Regions;textstyle:geotoolkit.attributes.TextStyle;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;alignment:geotoolkit.util.AnchorType;visible:boolean}}|any;
            /**
             * Sets the name of animation function in function registry corresponding to this axis
             * @param name  (Required) Name of the function. This function has to be registered in the registry, otherwise no
animation will be applied.
             */
            setAnimation(name: string): this;
            /**
             * Returns the name of animation function associated with this gauge
             */
            getAnimation(): any|string;
            /**
             * Sets the value of the gauge.
             * @param val  (Required) New value to set
             * @param skipAnimation  (Optional) If true, value change will not be animated
             */
            setValue(val: number, skipAnimation?: boolean): this;
            /**
             * Returns the current value of the axis
             */
            getValue(): number;
            /**
             * Returns time in which a full animation cycle is finished (in seconds)
             */
            getAnimationTime(): number;
            /**
             * Sets time required to accomplish a full animation run in between two values (in seconds)
             * @param time  (Required) Time in seconds to perform the animation
             */
            setAnimationTime(time: number): this;
            /**
             * Sets the name of the gauge
             * @param name  (Required) The new gauge name
             */
            setName(name: string): this;
            /**
             * Sets properties pertaining to this gauge. Used for serialization. Please use setOptions for gauge customization.
             * @param props  (Required) JSON with properties
             * @param props.animationfunction  (Optional) Name of an easing function in function registry which will define the animation behavior
             * @param props.animationtime  (Optional) Time in seconds to perform the animation
             * @param props.value  (Optional) Value of the gauge to set at initiation
             * @param props.alarms  (Optional) A list of alarms to set on the gauge.
             * @param props.units  (Optional) Units in which data is represented in this gauge
             * @param props.background  (Optional) JSON with properties for rectangular background of the gauge see {@link geotoolkit.gauges.NumericGauge#setBackgroundStyle}
             * @param props.namestyle  (Optional) JSON with properties of the test displaying name of the gauge see {@link geotoolkit.gauges.NumericGauge#setNameProperties}
             * @param props.valuestyle  (Optional) JSON with properties of the test displaying name of the gauge see {@link geotoolkit.gauges.NumericGauge#setValueProperties}
             */
            setProperties(props: any | { animationfunction?: string; animationtime?: number; value?: number; alarms?: geotoolkit.gauges.Alarm[]; units?: string; background?: any; namestyle?: any; valuestyle?: any; } ): this;
            /**
             * Returns an object with all the properties pertaining to this gauge. This method is used for serialization, please
             * use getOptions to customize the gauge.
             */
            getProperties(): {props:{animationfunction:string;animationtime:number;value:number;alarms:geotoolkit.gauges.Alarm[];units:string;background:{fillstyle:geotoolkit.attributes.FillStyle;linestyle:geotoolkit.attributes.LineStyle;visible:boolean};namestyle:{position:geotoolkit.gauges.layout.Regions;color:string|geotoolkit.util.RgbaColor;font:string;textstyle:geotoolkit.attributes.TextStyle;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;alignment:geotoolkit.util.AnchorType;visible:boolean};valuestyle:{position:geotoolkit.gauges.layout.Regions;color:string|geotoolkit.util.RgbaColor;font:string;textstyle:geotoolkit.attributes.TextStyle;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;alignment:geotoolkit.util.AnchorType;visible:boolean;formatter:geotoolkit.util.NumberFormat;format:string}}}|any;
            /**
             * Sets options on the gauge. Use this method to customize the gauge.
             * @param options  (Required) JSON with properties
             * @param options.animationfunction  (Optional) Name of an easing function in function registry which will define the animation behavior
             * @param options.animationtime  (Optional) Time in seconds to perform the animation
             * @param options.value  (Optional) Value of the gauge to set at initiation
             * @param options.alarms  (Optional) A list of alarms to set on the gauge.
             * @param options.units  (Optional) Units in which data is represented in this gauge
             * @param options.background  (Optional) JSON with properties for rectangular background of the gauge
             * @param options.background.fillstyle  (Optional) Fill style of the background rectangle
             * @param options.background.linestyle  (Optional) Line style of the background rectangle
             * @param options.background.visible  (Optional) Visibility of the background rectangle
             * @param options.namestyle  (Optional) JSON with properties of the test displaying name of the gauge
             * @param options.namestyle.position  (Optional) Region in which to render the name text
             * @param options.namestyle.color  (Optional) Color of name text
             * @param options.namestyle.font  (Optional) Font of name text
             * @param options.namestyle.textstyle  (Optional) Text style of the name text. If provided, overrides
font and color
             * @param options.namestyle.displaystrategy  (Optional) A display strategy to define how the
name text fits the region it is rendered in
             * @param options.namestyle.alignment  (Optional) Defines where in the region the name text will be positioned
             * @param options.namestyle.visible  (Optional) Visibility of the name text
             * @param options.valuestyle  (Optional) JSON with properties of the test displaying name of the gauge
             * @param options.valuestyle.position  (Optional) Region in which to render the name text
             * @param options.valuestyle.color  (Optional) Color of name text
             * @param options.valuestyle.font  (Optional) Font of value text
             * @param options.valuestyle.textstyle  (Optional) Text style of the value text. If provided, overrides
font and color
             * @param options.valuestyle.displaystrategy  (Optional) A display strategy to define how the
value text fits the region it is rendered in
             * @param options.valuestyle.alignment  (Optional) Defines where in the region the value text will be positioned
             * @param options.valuestyle.visible  (Optional) Visibility of the value text
             * @param options.valuestyle.formatter  (Optional) Formatter which will be used to format the value
before displaying it.
             * @param options.valuestyle.format  (Optional) Format of value to set on number formatter
             */
            setOptions(options: any | { animationfunction?: string; animationtime?: number; value?: number; alarms?: geotoolkit.gauges.Alarm[]; units?: string; background?: any | { fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; visible?: boolean; } ; namestyle?: any | { position?: geotoolkit.gauges.layout.Regions; color?: string|geotoolkit.util.RgbaColor; font?: string; textstyle?: geotoolkit.attributes.TextStyle; displaystrategy?: geotoolkit.gauges.ValueDisplayStrategies; alignment?: geotoolkit.util.AnchorType; visible?: boolean; } ; valuestyle?: any | { position?: geotoolkit.gauges.layout.Regions; color?: string|geotoolkit.util.RgbaColor; font?: string; textstyle?: geotoolkit.attributes.TextStyle; displaystrategy?: geotoolkit.gauges.ValueDisplayStrategies; alignment?: geotoolkit.util.AnchorType; visible?: boolean; formatter?: geotoolkit.util.NumberFormat; format?: string; } ; } ): this;
            /**
             * Returns an object with all the options set on this gauge
             */
            getOptions(): {props:{animationfunction:string;animationtime:number;value:number;alarms:geotoolkit.gauges.Alarm[];units:string;background:{fillstyle:geotoolkit.attributes.FillStyle;linestyle:geotoolkit.attributes.LineStyle;visible:boolean};namestyle:{position:geotoolkit.gauges.layout.Regions;color:string|geotoolkit.util.RgbaColor;font:string;textstyle:geotoolkit.attributes.TextStyle;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;alignment:geotoolkit.util.AnchorType;visible:boolean};valuestyle:{position:geotoolkit.gauges.layout.Regions;color:string|geotoolkit.util.RgbaColor;font:string;textstyle:geotoolkit.attributes.TextStyle;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;alignment:geotoolkit.util.AnchorType;visible:boolean;formatter:geotoolkit.util.NumberFormat;format:string}}}|any;
            /**
             * Enumerate children nodes
             * @param callback  (Required) callback
             * @param target  (Optional) target
             */
            enumerateNodes(callback: Function, target?: any): any;
        }
        class TrafficGauge extends geotoolkit.gauges.NumericGauge {
            /**
             * @param props  (Required) JSON with properties
             * @param props.orientation  (Optional) Orientation of the gauge (horizontal or vertical)
             * @param props.trafficlights  (Optional) An array with properties of each traffic light or an object with a single light
             * @param props.lights  (Optional) light options
             * @param props.lights.name  (Optional) Name of the light, all the operations on this light will be referenced by this name
             * @param props.lights.linestyle  (Optional) Line style of the light shape
             * @param props.lights.activefill  (Optional) Fill style applied to this light when the value of the gauge falls within its range
             * @param props.lights.inactivefill  (Optional) Fill style applied to this light when the value of the gauge falls out of its range
             * @param props.lights.painter  (Optional) Painter used to draw the light shape
             * @param props.lights.preserveaspectratio  (Optional) A flag defining if the shape should have equal width and height regardless of its container dimensions
             * @param props.lights.padding  (Optional) Padding inside the container of this light in CSS notation. This will be applied to all the sides.
             * @param props.lights.padding-left  (Optional) Left padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.lights.padding-right  (Optional) Right padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.lights.padding-top  (Optional) Top padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.lights.padding-bottom  (Optional) Bottom padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.lights.low  (Optional) Lower bound of the range in which this light is active
             * @param props.lights.high  (Optional) Higher bound of the range in which this light is active
             * @param props.name  (Optional) JSON with Properties pertaining to name text
             * @param props.name.textstyle  (Optional) Text style to apply to name
             * @param props.name.color  (Optional) Color of text to apply to name (will override textstyle color)
             * @param props.name.font  (Optional) Font to apply to name (will override textstyle font)
             * @param props.name.position  (Optional) Position where to render the name
             * @param props.name.displaystrategy  (Optional) Display strategy type
             * @param props.name.alignment  (Optional) Alignment of the value shape in its container region
             * @param props.name.name  (Optional) Name of the gauge
             * @param props.value  (Optional) Object with properties pertaining to value text
             * @param props.value.textstyle  (Optional) Text style to apply to value
             * @param props.value.color  (Optional) Color of text to apply to value (will override textstyle color)
             * @param props.value.font  (Optional) Font to apply to value (will override textstyle font)
             * @param props.value.position  (Optional) Position where to render the value
             * @param props.value.formatter  (Optional) Name of the formatter function to apply to value
             * @param props.value.displaystrategy  (Optional) Display strategy type
             * @param props.value.alignment  (Optional) Alignment of the value shape in its container region
             * @param props.units  (Optional) Units to display by value text (will be styled same as value)
             */
            constructor(props: any | { orientation?: geotoolkit.util.Orientation; trafficlights?: any|any[]; lights?: any | { name?: string|geotoolkit.attributes.LineStyle; linestyle?: string|geotoolkit.attributes.LineStyle; activefill?: string|geotoolkit.attributes.FillStyle; inactivefill?: string|geotoolkit.attributes.FillStyle; painter?: string|Function; preserveaspectratio?: boolean; padding?: string|number; "padding-left"?: string|number; "padding-right"?: string|number; "padding-top"?: string|number; "padding-bottom"?: string|number; low?: number; high?: number; } ; name?: any | { textstyle?: geotoolkit.attributes.TextStyle; color?: string|geotoolkit.util.RgbaColor; font?: string; position?: string|geotoolkit.gauges.layout.Regions; displaystrategy?: string|geotoolkit.gauges.ValueDisplayStrategies; alignment?: string|geotoolkit.util.AnchorType; name?: string; } ; value?: any | { textstyle?: geotoolkit.attributes.TextStyle; color?: string|geotoolkit.util.RgbaColor; font?: string; position?: string|geotoolkit.gauges.layout.Regions; formatter?: string; displaystrategy?: geotoolkit.gauges.ValueDisplayStrategies; alignment?: geotoolkit.util.AnchorType; } ; units?: string; } );
            /**
             * Sets properties pertaining to traffic gauge. Used for serialization, to customize gauge use setOptions
             * @param props  (Required) JSON with properties
             * @param props.orientation  (Optional) Orientation of the gauge (horizontal or vertical)
             * @param props.trafficlights  (Optional) An object with properties of each traffic light or an object with a single light see {@link geotoolkit.gauges.TrafficGauge#setTrafficLightProperties}
             * @param props.name  (Optional) JSON with Properties pertaining to name text see {@link geotoolkit.gauges.NumericGauge#setNameProperties}
             * @param props.value  (Optional) Object with properties pertaining to value text see {@link geotoolkit.gauges.NumericGauge#setValueProperties}
             * @param props.units  (Optional) Units to display by value text (will be styled same as value)
             */
            setProperties(props: any | { orientation?: geotoolkit.util.Orientation; trafficlights?: any|any[]; name?: any; value?: any; units?: string; } ): this;
            /**
             * Sets options pertaining to traffic gauge
             * @param props  (Required) JSON with properties
             * @param props.orientation  (Optional) Orientation of the gauge (horizontal or vertical)
             * @param props.trafficlights  (Optional) An array with properties of each traffic light or an object with a single light
             * @param props.trafficlights.name  (Optional) Name of the light, all the operations on this light will be referenced by this name
             * @param props.trafficlights.linestyle  (Optional) Line style of the light shape
             * @param props.trafficlights.activefill  (Optional) Fill style applied to this light when the value of the gauge falls within its range
             * @param props.trafficlights.inactivefill  (Optional) Fill style applied to this light when the value of the gauge falls out of its range
             * @param props.trafficlights.painter  (Optional) Painter used to draw the light shape
             * @param props.trafficlights.preserveaspectratio  (Optional) A flag defining if the shape should have equal width and height regardless of its container dimensions
             * @param props.trafficlights.padding  (Optional) Padding inside the container of this light in CSS notation. This will be applied to all the sides.
             * @param props.trafficlights.padding-left  (Optional) Left padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.trafficlights.padding-right  (Optional) Right padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.trafficlights.padding-top  (Optional) Top padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.trafficlights.padding-bottom  (Optional) Bottom padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.trafficlights.low  (Optional) Lower bound of the range in which this light is active
             * @param props.trafficlights.high  (Optional) Higher bound of the range in which this light is active
             * @param props.name  (Optional) JSON with Properties pertaining to name text
             * @param props.name.textstyle  (Optional) Text style to apply to name
             * @param props.name.color  (Optional) Color of text to apply to name (will override textstyle color)
             * @param props.name.font  (Optional) Font to apply to name (will override textstyle font)
             * @param props.name.position  (Optional) Position where to render the name
             * @param props.name.displaystrategy  (Optional) Display strategy type
             * @param props.name.alignment  (Optional) Alignment of the value shape in its container region
             * @param props.name.name  (Optional) Name of the gauge
             * @param props.value  (Optional) Object with properties pertaining to value text
             * @param props.value.textstyle  (Optional) Text style to apply to value
             * @param props.value.color  (Optional) Color of text to apply to value (will override textstyle color)
             * @param props.value.font  (Optional) Font to apply to value (will override textstyle font)
             * @param props.value.position  (Optional) Position where to render the value
             * @param props.value.formatter  (Optional) Name of the formatter function to apply to value
             * @param props.value.displaystrategy  (Optional) Display strategy type
             * @param props.value.alignment  (Optional) Alignment of the value shape in its container region
             * @param props.units  (Optional) Units to display by value text (will be styled same as value)
             */
            setOptions(props: any | { orientation?: geotoolkit.util.Orientation; trafficlights?: any | { name?: string|geotoolkit.attributes.LineStyle; linestyle?: string|geotoolkit.attributes.LineStyle; activefill?: string|geotoolkit.attributes.FillStyle; inactivefill?: string|geotoolkit.attributes.FillStyle; painter?: string|Function; preserveaspectratio?: boolean; padding?: string|number; "padding-left"?: string|number; "padding-right"?: string|number; "padding-top"?: string|number; "padding-bottom"?: string|number; low?: number; high?: number; } |any[]; name?: any | { textstyle?: geotoolkit.attributes.TextStyle; color?: string|geotoolkit.util.RgbaColor; font?: string; position?: string|geotoolkit.gauges.layout.Regions; displaystrategy?: string|geotoolkit.gauges.ValueDisplayStrategies; alignment?: string|geotoolkit.util.AnchorType; name?: string; } ; value?: any | { textstyle?: geotoolkit.attributes.TextStyle; color?: string|geotoolkit.util.RgbaColor; font?: string; position?: string|geotoolkit.gauges.layout.Regions; formatter?: string; displaystrategy?: geotoolkit.gauges.ValueDisplayStrategies; alignment?: geotoolkit.util.AnchorType; } ; units?: string; } ): this;
            /**
             * Returns all options set on this gauge
             */
            getOptions(): {props:{orientation:geotoolkit.util.Orientation;trafficlights:{name:string|geotoolkit.attributes.LineStyle;linestyle:string|geotoolkit.attributes.LineStyle;activefill:string|geotoolkit.attributes.FillStyle;inactivefill:string|geotoolkit.attributes.FillStyle;painter:string|Function;preserveaspectratio:boolean;padding:string|number;'padding-left':string|number;'padding-right':string|number;'padding-top':string|number;'padding-bottom':string|number;low:number;high:number};name:{textstyle:geotoolkit.attributes.TextStyle;color:string|geotoolkit.util.RgbaColor;font:string;position:string|geotoolkit.gauges.layout.Regions;displaystrategy:string|geotoolkit.gauges.ValueDisplayStrategies;alignment:string|geotoolkit.util.AnchorType;name:string};value:{textstyle:geotoolkit.attributes.TextStyle;color:string|geotoolkit.util.RgbaColor;font:string;position:string|geotoolkit.gauges.layout.Regions;formatter:string;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;alignment:geotoolkit.util.AnchorType};units:string}}|any;
            /**
             * Sets properties pertaining to this object. Used for serialization, to get properties please use getOptions
             */
            getProperties(): {props:{orientation:geotoolkit.util.Orientation;trafficlights:{name:string|geotoolkit.attributes.LineStyle;linestyle:string|geotoolkit.attributes.LineStyle;activefill:string|geotoolkit.attributes.FillStyle;inactivefill:string|geotoolkit.attributes.FillStyle;painter:string|Function;preserveaspectratio:boolean;padding:string|number;'padding-left':string|number;'padding-right':string|number;'padding-top':string|number;'padding-bottom':string|number;low:number;high:number};name:{textstyle:geotoolkit.attributes.TextStyle;color:string|geotoolkit.util.RgbaColor;font:string;position:string|geotoolkit.gauges.layout.Regions;displaystrategy:string|geotoolkit.gauges.ValueDisplayStrategies;alignment:string|geotoolkit.util.AnchorType;name:string};value:{textstyle:geotoolkit.attributes.TextStyle;color:string|geotoolkit.util.RgbaColor;font:string;position:string|geotoolkit.gauges.layout.Regions;formatter:string;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;alignment:geotoolkit.util.AnchorType};units:string}}|any;
            /**
             * Adds a traffic light or an array of traffic lights to the
             * @param lights  (Required) Object with properties of the light or array with such objects
             * @param lights.name  (Optional) Name of the light, all the operations on this light will be referenced by this name
             * @param lights.linestyle  (Optional) Line style of the light shape
             * @param lights.activefill  (Optional) Fill style applied to this light when the value of the gauge falls within its range
             * @param lights.inactivefill  (Optional) Fill style applied to this light when the value of the gauge falls out of its range
             * @param lights.painter  (Optional) Painter used to draw the light shape
             * @param lights.preserveaspectratio  (Optional) A flag defining if the shape should have equal width and height regardless of its container dimensions
             * @param lights.padding  (Optional) Padding inside the container of this light in CSS notation. This will be applied to all the sides.
             * @param lights.padding-left  (Optional) Left padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param lights.padding-right  (Optional) Right padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param lights.padding-top  (Optional) Top padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param lights.padding-bottom  (Optional) Bottom padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param lights.low  (Optional) Lower bound of the range in which this light is active
             * @param lights.high  (Optional) Higher bound of the range in which this light is active
             * @param name  (Optional) Name of the light, used to reference this light in the future
             */
            addTrafficLights(lights: any | { name?: string|geotoolkit.attributes.LineStyle; linestyle?: string|geotoolkit.attributes.LineStyle; activefill?: string|geotoolkit.attributes.FillStyle; inactivefill?: string|geotoolkit.attributes.FillStyle; painter?: string|Function; preserveaspectratio?: boolean; padding?: string|number; "padding-left"?: string|number; "padding-right"?: string|number; "padding-top"?: string|number; "padding-bottom"?: string|number; low?: number; high?: number; } |any[], name?: string): this;
            /**
             * Sets properties pertaining to a specific light in the traffic gauge. The properties will be applies to the light with
             * provided name, or to none.
             * @param name  (Required) Name of the light, all the operations on this light will be referenced by this name,
array with light properties, or object with light properties containing name inside
             * @param props  (Optional) JSON with properties
             * @param props.name  (Optional) Name of the light, all the operations on this light will be referenced by this name
             * @param props.linestyle  (Optional) Line style of the light shape
             * @param props.activefill  (Optional) Fill style applied to this light when the value of the gauge falls within its range
             * @param props.inactivefill  (Optional) Fill style applied to this light when the value of the gauge falls out of its range
             * @param props.painter  (Optional) Painter used to draw the light shape
             * @param props.preserveaspectratio  (Optional) A flag defining if the shape should have equal width and height regardless of its container dimensions
             * @param props.padding  (Optional) Padding inside the container of this light in CSS notation. This will be applied to all the sides.
             * @param props.padding-left  (Optional) Left padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.padding-right  (Optional) Right padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.padding-top  (Optional) Top padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.padding-bottom  (Optional) Bottom padding inside the container of this light in CSS notation. This parameter overrides props.padding
             * @param props.low  (Optional) Lower bound of the range in which this light is active
             * @param props.high  (Optional) Higher bound of the range in which this light is active
             */
            setTrafficLightProperties(name: any[]|any|string, props?: any | { name?: string; linestyle?: string|geotoolkit.attributes.LineStyle; activefill?: string|geotoolkit.attributes.FillStyle; inactivefill?: string|geotoolkit.attributes.FillStyle; painter?: string|Function; preserveaspectratio?: boolean; padding?: string|number; "padding-left"?: string|number; "padding-right"?: string|number; "padding-top"?: string|number; "padding-bottom"?: string|number; low?: number; high?: number; } ): this;
            /**
             * Gets an array with JSON properties of all registered traffic lights
             */
            getTrafficLightsProperties(): any[];
            /**
             * Updates the state of the gauge
             */
            update(): any;
            /**
             * Updates the value of gauge, this will trigger the update of every dynamic component and
             * fire 'gaugeValueUpdated' event
             * @param value  (Required) New value to set
             */
            setValue(value: number): this;
            /**
             * Returnt current value of the traffic gauge
             */
            getValue(): number;
        }
        /**
         * Implements a class which defines a linear gauge. Linear gauge is a rectangular shape (possibly
         * with round corners), which represents a range of data. If horizontal - range is represented from left to right,
         * if vertical, range is represented from bottom to top (always from min to max). The linear gauge supports adding
         * one axis which can be placed on either sides of the main shape, or in the center. A indicator fill and a needle
         * are the tools which are used to visualize the current value of the gauge. Fill is filling the gauge shape
         * from min to the current value on the axis. Needle positions itself on the current value on top of the indicator shape.
         */
        class LinearGauge extends geotoolkit.gauges.NumericGauge {
            /**
             * Implements a class which defines a linear gauge. Linear gauge is a rectangular shape (possibly
             * with round corners), which represents a range of data. If horizontal - range is represented from left to right,
             * if vertical, range is represented from bottom to top (always from min to max). The linear gauge supports adding
             * one axis which can be placed on either sides of the main shape, or in the center. A indicator fill and a needle
             * are the tools which are used to visualize the current value of the gauge. Fill is filling the gauge shape
             * from min to the current value on the axis. Needle positions itself on the current value on top of the indicator shape.
             * @param params  (Required) JSON with properties
             * @param params.range  (Optional) Range displayed by this gauge
             * @param params.orientation  (Optional) Orientation of the gauge
             * @param params.regions  (Optional) Regions to display in the indicator
             * @param params.axes  (Optional) Array with axes and properties
             * @param params.indicator  (Optional) Properties pertaining to indicator and its fill
             * @param params.indicator.width  (Optional) Width of the indicator in CSS format, relative to the gauge width
             * @param params.indicator.height  (Optional) Height of the indicator in CSS format, relative to the gauge height
             * @param params.indicator.backgroundfill  (Optional) Fill style of the background of indicator
             * @param params.indicator.backgroundline  (Optional) Line style of the background of indicator
             * @param params.indicator.valuefillstyle  (Optional) Fill style of the value fill in the indicator
             * @param params.indicator.valuelinestyle  (Optional) Line style of the value fill in the indicator
             * @param params.indicator.cornerradius  (Optional) Corner radius of the indicator shape in CSS notation, relative to the width of the shape.
(50% will create a circle)
             * @param params.indicator.fillposition  (Optional) Layer position of the fill
             * @param params.needle  (Optional) JSON with needle properties
             * @param params.needle.geometry  (Optional) Geometry defining the needle
             * @param params.needle.width  (Optional) Width of the needle relative to the width of the gauge indicator (height if horizontal)
             */
            constructor(params: any | { range?: geotoolkit.util.Range; orientation?: string|geotoolkit.util.Orientation; regions?: geotoolkit.gauges.axis.Region|geotoolkit.gauges.axis.Region[]; axes?: any[]; indicator?: any | { width?: number|string; height?: number|string; backgroundfill?: geotoolkit.attributes.FillStyle; backgroundline?: geotoolkit.attributes.LineStyle; valuefillstyle?: geotoolkit.attributes.FillStyle; valuelinestyle?: geotoolkit.attributes.LineStyle; cornerradius?: number|string; fillposition?: geotoolkit.gauges.AbstractGauge.DynamicElementPosition|string; } ; needle?: any | { geometry?: geotoolkit.scene.Node; width?: number|string; } ; } );
            /**
             * Positions of axis relative to the indicator
             */
            static AxisPosition: any;
            /**
             * Copy constructor function
             * Used to clone gauge
             * @param gauge  (Required) source gauge
             */
            protected copyConstructor(gauge: geotoolkit.gauges.LinearGauge): this;
            /**
             * Gets an axis by its name or index from axes iterator
             * @param name  (Required) Name of the axis or its index
             */
            getAxis(name: string|number): geotoolkit.gauges.axis.Axis;
            /**
             * Removes an axis from the gauge. If no such gauge exists, nothing will be done.
             * @param name  (Required) Name of the axis or its index
             */
            removeAxis(name: string|number): this;
            /**
             * Returns an iterator over existing axes in this gauge
             * @param filter  (Optional) a filter function. Returns all axes if null
             */
            getAxes(filter?: Function): geotoolkit.util.Iterator;
            /**
             * Adds an axis to the gauge
             * @param name  (Required) Name of the new axis
             * @param axis  (Required) New axis to add
             * @param props  (Optional) JSON with axis properties
             * @param props.visible  (Optional) visibility
             * @param props.position  (Optional) Position relative to indicator
             * @param props.width  (Optional) Css width
             * @param props.gap  (Optional) Gap between the axis and the indicator or othes axes
             */
            addAxis(name: string, axis: geotoolkit.axis.Axis|geotoolkit.scene.Group|any, props?: any | { visible?: boolean; position?: geotoolkit.gauges.LinearGauge.AxisPosition; width?: string|number; gap?: string|number; } ): this;
            /**
             * Sets properties pertaining to axis of the gauge
             * @param name  (Optional) Name of the axis to apply properties. Name can also be passed inside props JSON.
If null properties will be applied to all axes.
             * @param props  (Optional) JSON with properties
             * @param props.position  (Optional) Position of the axis relative to indicator shape
             * @param props.width  (Optional) Width of the axis (height if horizontal) in CSS format
             * @param props.gap  (Optional) Gap between axis and indicator shape in CSS format
             * @param props.visible  (Optional) Visibility of the axis
             */
            setAxisProperties(name?: string, props?: any | { position?: geotoolkit.gauges.LinearGauge.AxisPosition; width?: number|string; gap?: number|string; visible?: boolean; } ): this;
            /**
             * Gets properties pertaining to axis of the gauge
             * @param name  (Optional) Name of the axis to get properties.
If null, properties will be retrieved from all axes
             */
            getAxisProperties(name?: string): any;
            /**
             * Checks if the gauge contains specified axis
             * @param axis  (Required) The axis or its name
             */
            hasAxis(axis: geotoolkit.gauges.axis.Axis|string): boolean;
            /**
             * Adds a region, or an array of regions to the gauge. Regions of indicator are indexed by the name
             * that you provide. if no such name has been passed into the method, it will be impossible to do
             * any further manipulations with this region.
             * @param name  (Required) Name of the region to add or a region which has the name set to it
             * @param region  (Optional) Region(s) to add
             */
            addIndicatorRegion(name: string|geotoolkit.gauges.axis.Region, region?: geotoolkit.gauges.axis.Region|geotoolkit.gauges.axis.Region[]): any;
            /**
             * Removes an earlier added region from the indicator
             * @param name  (Required) region name or region
             */
            removeIndicatorRegion(name: string|geotoolkit.gauges.axis.Region): any;
            /**
             * Removes all the regions from the scene
             */
            clearRegions(): this;
            /**
             * Sets options pertaining to linear gauge and its components
             * @param props  (Required) JSON with properties
             * @param props.axis  (Optional) JSON with axis properties
             * @param props.axis.linestyle  (Optional) Line style of the baseline
             * @param props.axis.tickgenerator  (Optional) Tick generator for the axis
             * @param props.axis.position  (Optional) Position of the axis relative to the indicator
             * @param props.axis.width  (Optional) Width of the axis in CSS notation, relative to the width of the gauge
             * @param props.axis.gap  (Optional) Gap between the indicator and the axis in CSS format
             * @param props.axis.tickposition  (Optional) Position of the ticks on the axis
             * @param props.axis.visible  (Optional) Visibility flag for the axis
             * @param props.indicator  (Optional) Properties pertaining to indicator and its fill
             * @param props.indicator.width  (Optional) Width of the indicator in CSS format, relative to the gauge width
             * @param props.indicator.height  (Optional) Height of the indicator in CSS format, relative to the gauge height
             * @param props.indicator.backgroundfill  (Optional) Fill style of the background of indicator
             * @param props.indicator.backgroundline  (Optional) Line style of the background of indicator
             * @param props.indicator.valuefillstyle  (Optional) Fill style of the value fill in the indicator
             * @param props.indicator.valuelinestyle  (Optional) Line style of the value fill in the indicator
             * @param props.indicator.cornerradius  (Optional) Corner radius of the indicator shape in CSS notation, relative to the width of the shape.
(50% will create a circle)
             * @param props.indicator.fillposition  (Optional) Layer position of the fill
             * @param props.needle  (Optional) JSON with needle properties
             * @param props.needle.geometry  (Optional) Geometry defining the needle
             * @param props.needle.width  (Optional) Width of the needle relative to the width of the gauge indicator (height if horizontal)
             * @param props.range  (Optional) Range displayed by this gauge
             * @param props.orientation  (Optional) Orientation of the gauge
             * @param props.regions  (Optional) Regions to display in the indicator
             */
            setOptions(props: any | { axis?: any | { linestyle?: geotoolkit.attributes.LineStyle; tickgenerator?: geotoolkit.axis.TickGenerator; position?: string|geotoolkit.gauges.LinearGauge.AxisPosition; width?: number|string; gap?: number|string; tickposition?: string|geotoolkit.axis.TickInfo.TickPosition; visible?: boolean; } ; indicator?: any | { width?: number|string; height?: number|string; backgroundfill?: geotoolkit.attributes.FillStyle; backgroundline?: geotoolkit.attributes.LineStyle; valuefillstyle?: geotoolkit.attributes.FillStyle; valuelinestyle?: geotoolkit.attributes.LineStyle; cornerradius?: number|string; fillposition?: geotoolkit.gauges.AbstractGauge.DynamicElementPosition|string; } ; needle?: any | { geometry?: geotoolkit.scene.Node; width?: number|string; } ; range?: geotoolkit.util.Range; orientation?: geotoolkit.util.Orientation; regions?: geotoolkit.gauges.axis.Region|geotoolkit.gauges.axis.Region[]; } ): this;
            /**
             * Gets options set on this Gauge
             */
            getOptions(): {props:{axis:{linestyle:geotoolkit.attributes.LineStyle;tickgenerator:geotoolkit.axis.TickGenerator;position:string|geotoolkit.gauges.LinearGauge.AxisPosition;width:number|string;gap:number|string;tickposition:string|geotoolkit.axis.TickInfo.TickPosition;visible:boolean};indicator:{width:number|string;height:number|string;backgroundfill:geotoolkit.attributes.FillStyle;backgroundline:geotoolkit.attributes.LineStyle;valuefillstyle:geotoolkit.attributes.FillStyle;valuelinestyle:geotoolkit.attributes.LineStyle;cornerradius:number|string;fillposition:geotoolkit.gauges.AbstractGauge.DynamicElementPosition|string};needle:{geometry:geotoolkit.scene.Node;width:number|string};range:geotoolkit.util.Range;orientation:geotoolkit.util.Orientation;regions:geotoolkit.gauges.axis.Region|geotoolkit.gauges.axis.Region[]}}|any;
            /**
             * Sets properties pertaining to linear gauge and its components. Used for serialization - to customize
             * the gauge use setOptions instead.
             * @param props  (Required) JSON with properties
             * @param props.axis  (Optional) JSON with axis properties see {@link geotoolkit.gauges.LinearGauge#setAxisProperties}
             * @param props.indicator  (Optional) Properties pertaining to indicator and its fill see {@link geotoolkit.gauges.LinearGauge#setIndicatorProperties}
             * @param props.needle  (Optional) JSON with needle properties see {@link geotoolkit.gauges.LinearGauge#setNeedleProperties}
             * @param props.range  (Optional) Range displayed by this gauge
             * @param props.regions  (Optional) Regions to display in the indicator
             */
            setProperties(props: any | { axis?: any; indicator?: any; needle?: any; range?: geotoolkit.util.Range; regions?: geotoolkit.gauges.axis.Region|geotoolkit.gauges.axis.Region[]; } ): this;
            /**
             * Gets properties pertaining to Linear Gauge
             */
            getProperties(): {props:{axis:{linestyle:geotoolkit.attributes.LineStyle;tickgenerator:geotoolkit.axis.TickGenerator;position:string|geotoolkit.gauges.LinearGauge.AxisPosition;width:number|string;gap:number|string;tickposition:string|geotoolkit.axis.TickInfo.TickPosition;visible:boolean};indicator:{width:number|string;height:number|string;backgroundfill:geotoolkit.attributes.FillStyle;backgroundline:geotoolkit.attributes.LineStyle;valuefillstyle:geotoolkit.attributes.FillStyle;valuelinestyle:geotoolkit.attributes.LineStyle;cornerradius:number|string;fillposition:geotoolkit.gauges.AbstractGauge.DynamicElementPosition|string};needle:{geometry:geotoolkit.scene.Node;width:number|string};range:geotoolkit.util.Range;orientation:geotoolkit.util.Orientation;regions:geotoolkit.gauges.axis.Region|geotoolkit.gauges.axis.Region[]}}|any;
            /**
             * Sets properties pertaining to needle shape of the gauge
             * @param props  (Required) JSON with properties
             * @param props.width  (Optional) Width of needle in CSS format (height if gauge is horizontal)
             * @param props.geometry  (Optional) A group containing the geometry of the needle
             */
            setNeedleProperties(props: any | { width?: number|string; geometry?: geotoolkit.scene.Group; } ): this;
            /**
             * Returns properties pertaining to needle shape of the gauge
             */
            getNeedleProperties(): {props:{width:number|string;geometry:geotoolkit.scene.Group}}|any;
            /**
             * Gets properties pertaining to indicator shape and value fill shape
             */
            getIndicatorProperties(): {props:{indicator:{width:number|string;height:number|string;backgroundfill:geotoolkit.attributes.FillStyle;backgroundline:geotoolkit.attributes.LineStyle;valuefillstyle:geotoolkit.attributes.FillStyle;valuelinestyle:geotoolkit.attributes.LineStyle;cornerradius:number|string;fillposition:geotoolkit.gauges.AbstractGauge.DynamicElementPosition|string}}}|any;
            /**
             * Sets current value of the gauge
             * @param val  (Required) New value for the gauge
             * @param skipAnimation  (Optional) Specifies if animation should be avoided
             */
            setValue(val: number, skipAnimation?: boolean): this;
            /**
             * Returns range displayed by this range
             */
            getRange(): geotoolkit.util.Range;
            /**
             * Returns range displayed by this range
             * @param min  (Required) Lower bounds of the range or the range to set
             * @param max  (Optional) Higher bound of the range
             */
            setRange(min: number|geotoolkit.util.Range, max?: number): this;
            /**
             * Returns orientation of the gauge.
             */
            getOrientation(): geotoolkit.util.Orientation;
            /**
             * Sets the needle for the axis
             * @param params  (Required) JSON with needle properties
             */
            setNeedle(params: any): this;
            /**
             * Enumerate children nodes
             * @param callback  (Required) callback
             * @param target  (Optional) target
             */
            enumerateNodes(callback: Function, target?: any): any;
        }
        /**
         * Abstract class for gauge factories.
         */
        class AbstractFactory {
            /**
             * Abstract class for gauge factories.
             * @param params  (Optional) Object with properties
             * @param params.name  (Optional) Name of the specific instance of the gauge
             * @param params.type  (Optional) The type of the gauge which will be created by this factory
             */
            constructor(params?: any | { name?: string; type?: string; } );
            /**
             * Returns a gauge ready for use
             * @param params  (Required) JSON with overriding properties
             */
            createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            /**
             * Gets the name of this implementation
             */
            getName(): string;
            /**
             * Gets the type of the gauge which this factory implements
             */
            getGaugeType(): string;
            /**
             * Returns properties pertaining to the gauge implemented by this factory
             */
            getGaugeProperties(): any;
        }
        /**
         * Different modes that define how the value and name texts fit the regions they are rendered in.
         */
        interface ValueDisplayStrategies {
            /**
             * Resize the text to fit the bounds of its container
             */
            ResizeToFit: string;
            /**
             * Keep the text font, but apply ellipsis if doesn't fit the container
             */
            FromFont: string;
            /**
             * Text is calculated in model limits. Shrinks and expands with container. Unproportional.
             */
            ShrinkExpand: string;
            /**
             * If the width of the text is smaller than the width of the container, text will rotate clockwise.
             */
            RotateClockwise: string;
            /**
             * If the width of the text is smaller than the width of the container, text will rotate counterclockwise.
             */
            RotateCounterClockwise: string;
            /**
             * Text fits the height of the region bounds. Ellipsis will be applied if does not fit the width.
             */
            FitToHeight: string;
            /**
             * Adds line breaks to fit region bounds.
             */
            WrappedText: string;
            /**
             * Adds line breaks between words to fit region bounds.
             */
            WrappedWords: string;
        }
        module axis {
            /**
             * Enumerator defining the positions of ticks
             */
            var TickPositions: any;
            /**
             * Defines events fired by axis
             */
            var Events: any;
            class TickInfo extends geotoolkit.axis.TickInfo {
                /**
                 */
                constructor();
            }
            /**
             * An axis region is a segment within axis range which has to be differentiated from the rest of the axis. Examples are
             * the critical section of the pressure gauge or the red segment of the tachometer in your car.<br>
             * A region can be highlighted by a different fillstyle and/or by a different linestyle than other parts of the gauge.<br>
             * Multiple regions can be added. Not to be used as a value fill, because axes have a different mechanism for that purpose.
             */
            class Region {
                /**
                 * An axis region is a segment within axis range which has to be differentiated from the rest of the axis. Examples are
                 * the critical section of the pressure gauge or the red segment of the tachometer in your car.<br>
                 * A region can be highlighted by a different fillstyle and/or by a different linestyle than other parts of the gauge.<br>
                 * Multiple regions can be added. Not to be used as a value fill, because axes have a different mechanism for that purpose.
                 * @param low  (Optional) Lower bound or object with parameters
                 * @param low.low  (Optional) Maximum value Lower bound of the range
                 * @param low.fillstyle  (Optional) Fill style of the range
                 * @param low.visible  (Optional) Defines if the range is visible and should be rendered
                 * @param low.name  (Optional) Name of the region
                 * @param high  (Optional) Upper bound of the range
                 * @param lineStyle  (Optional) Line style of the range
                 * @param fillStyle  (Optional) Fill style of the range
                 */
                constructor(low?: number|any | { low?: number; fillstyle?: geotoolkit.attributes.FillStyle; visible?: boolean; name?: string; } , high?: number, lineStyle?: geotoolkit.attributes.LineStyle, fillStyle?: geotoolkit.attributes.FillStyle);
                /**
                 * Returns class name for css reference
                 */
                getCssClass(): string;
                /**
                 * Sets visible flag for the range
                 * @param visible  (Required) Visibility flag
                 */
                setVisible(visible: boolean): this;
                /**
                 * Gets visibility status
                 */
                getVisible(): boolean;
                /**
                 * Gets lowest limit of the region
                 */
                getLow(): number;
                /**
                 * Gets highest limit of the region
                 */
                getHigh(): number;
                /**
                 * Returns the current name of the region
                 */
                getName(): string;
                /**
                 * Sets the name of the region
                 * @param name  (Required) New name for the region
                 */
                setName(name: string): this;
                /**
                 * Sets lowest limit of the region
                 * @param low  (Required) New lower bound
                 */
                setLow(low: number): this;
                /**
                 * Sets highest limit of the region
                 * @param high  (Required) New upper bound
                 */
                setHigh(high: number): this;
                /**
                 * Returns fill style set for the region
                 */
                getFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Sets fill style set for the region
                 * @param fillStyle  (Required) a new fill style
                 * @param fillStyle.color  (Optional) color
                 * @param fillStyle.pattern  (Optional) pattern
                 * @param fillStyle.foreground  (Optional) foreground color
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
                /**
                 * Returns line style set for the region
                 */
                getLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Sets line style set for the region
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Sets line style set for the region
                 * @param color  (Required) New color of the line
                 */
                setLineColor(color: geotoolkit.util.RgbaColor|string): this;
                /**
                 * Sets range that defines this region
                 */
                getRange(): geotoolkit.util.Range;
                /**
                 * Sets range that defines this region
                 * @param range  (Required) New range with min and max values
                 */
                setRange(range: geotoolkit.util.Range): this;
                /**
                 * Returns true if the region is static and visible at all times
                 */
                isStatic(): boolean;
                /**
                 * Sets a flag defining if the region should be static and visible at all times
                 * @param isStatic  (Required) True
                 */
                setStatic(isStatic: boolean): this;
                /**
                 * Returns properties pertaining to this object
                 */
                getProperties(): {props:{low:number;high:number;linestyle:geotoolkit.attributes.LineStyle;fillstyle:geotoolkit.attributes.FillStyle;alarms:Function[];visible:boolean}}|any;
                /**
                 * Sets properties pertaining to this object
                 * @param props  (Required) JSON with properties
                 * @param props.low  (Optional) lower bound
                 * @param props.high  (Optional) upper bound
                 * @param props.linestyle  (Optional) region linestyle
                 * @param props.fillstyle  (Optional) region fillstyle
                 * @param props.visible  (Optional) visibility
                 * @param props.color  (Optional) in CSS string form or RgbaColor object
                 * @param props.linecap  (Optional) can be 'butt', 'square', or 'round'
                 */
                setProperties(props: any | { low?: number; high?: number; linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; visible?: boolean; color?: string|geotoolkit.util.RgbaColor; linecap?: geotoolkit.attributes.LineStyle.CapStyle|string; } ): this;
            }
            /**
             * Implements an axis which uses Tick Generators to calculate number of ticks and their positions.
             * This axis calculates the ticks dynamically to not allow any intersections among labels and ticks.
             * The axis allows to render ticks and labels in three positions:
             * inside: tick growing from the inner bound of the axis towards the center
             * outside: tick growing from outer bound of axis towards the center
             */
            class Axis extends geotoolkit.scene.AbstractNode implements geotoolkit.scene.INodeEnumerable {
                /**
                 * Implements an axis which uses Tick Generators to calculate number of ticks and their positions.
                 * This axis calculates the ticks dynamically to not allow any intersections among labels and ticks.
                 * The axis allows to render ticks and labels in three positions:
                 * inside: tick growing from the inner bound of the axis towards the center
                 * outside: tick growing from outer bound of axis towards the center
                 */
                constructor();
                /**
                 * Disposes this node, once disposes a node should not be used anymore.<br>
                 * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
                 * Also aggressively 'cleanup' this node by setting some of its members to null.
                 * Disposes value and name shapes as well
                 */
                dispose(): any;
                /**
                 * A set of events fired by axis
                 */
                static Events: any;
                /**
                 * Changes the name of the axis
                 * @param name  (Required) The new axis name
                 */
                setName(name: string): this;
                /**
                 * Adds a  region or an array of regions to the axis. Regions are defined by color and range
                 * in bounds of the range displayed by the gauge.
                 * @param regions  (Required) Array of regions, a region, or region properties
                 */
                addRegion(regions: geotoolkit.gauges.axis.Region[]|any[]|geotoolkit.gauges.axis.Region|any): this;
                /**
                 * Removes all registered regions from the axis
                 */
                cleanRegions(): this;
                /**
                 * Pass options into this method to customize the gauge.
                 * @param options  (Required) JSON with properties
                 * @param options.tickGenerator  (Optional) The tick generator for the axis
                 * @param options.animationfunction  (Optional) name of animation function (see geotoolkit.gauges.defaults.EasingFunctions)
                 * @param options.ticks  (Optional) JSON with properties for ticks
                 * @param options.ticks.major  (Optional) Major tick properties
                 * @param options.ticks.minor  (Optional) Minor tick properties
                 * @param options.ticks.edge  (Optional) Edge tick properties
                 * @param options.range  (Optional) Range of values displayed by the axis.
                 */
                setOptions(options: any | { tickGenerator?: geotoolkit.axis.TickGenerator; animationfunction?: string; ticks?: any | { major?: any; minor?: any; edge?: any; } ; range?: geotoolkit.util.Range; } ): this;
                /**
                 * Sets properties pertaining to axis. To customize the axis please use setOptions/
                 * @param props  (Required) JSON with properties
                 * @param props.alarms  (Optional) alarm to add, an array of such alarms, or object (array of objects) to be passed into the alarm
                 * @param props.range  (Optional) range see {@link geotoolkit.gauges.axis.Axis#setRange}
                 * @param props.units  (Optional) units to append to the end
                 * @param props.tickGenerator  (Optional) The tick generator for the axis
                 * @param props.animationfunction  (Optional) name of animation function (see geotoolkit.gauges.defaults.EasingFunctions)
                 * @param props.ticks  (Optional) JSON with properties for ticks
                 * @param props.ticks.major  (Optional) Major tick properties see {@link geotoolkit.gauges.axis.Axis#setTickProperties}
                 * @param props.ticks.minor  (Optional) Minor tick properties see {@link geotoolkit.gauges.axis.Axis#setTickProperties}
                 * @param props.ticks.edge  (Optional) Edge tick properties see {@link geotoolkit.gauges.axis.Axis#setTickProperties}
                 * @param props.regions  (Optional) An array with regions that should be displayed by the gauge.
Regions will be added on top of existing regions.
                 * @param props.value  (Optional) Value of the axis
                 * @param props.valuestyle  (Optional) JSON with styling of the value text see {@link geotoolkit.gauges.axis.Axis#setValueProperties}
                 * @param props.namestyle  (Optional) Json with styling of the name text see {@link geotoolkit.gauges.axis.Axis#setNameProperties}
                 */
                setProperties(props: any | { alarms?: any|geotoolkit.gauges.Alarm|any[]|geotoolkit.gauges.Alarm[]; range?: any|geotoolkit.util.Range; units?: string; tickGenerator?: geotoolkit.axis.TickGenerator; animationfunction?: string; ticks?: any | { major?: any; minor?: any; edge?: any; } ; regions?: geotoolkit.gauges.axis.Region[]; value?: number; valuestyle?: any; namestyle?: any; } ): this;
                /**
                 * Returnt the tick generator currently set on the axis
                 */
                getTickGenerator(): geotoolkit.axis.TickGenerator;
                /**
                 * Sets tick generator on the axis
                 * @param tg  (Required) New tick generator
                 */
                setTickGenerator(tg: geotoolkit.axis.TickGenerator): this;
                /**
                 * Returns properties pertaining to axis.
                 */
                getProperties(): {props:{tickGenerator:geotoolkit.axis.TickGenerator;animationfunction:string;ticks:{major:any;minor:any;edge:any};range:geotoolkit.util.Range;valuestyle:{textstyle:geotoolkit.attributes.TextStyle;visible:boolean;position:geotoolkit.gauges.layout.Region|string;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;formatter:geotoolkit.util.Format;alignment:geotoolkit.util.AnchorType};namestyle:{textstyle:geotoolkit.attributes.TextStyle;visible:boolean;position:geotoolkit.gauges.layout.Region|string;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;formatter:geotoolkit.util.Format;alignment:geotoolkit.util.AnchorType}}}|any;
                /**
                 * Returns options set on this axis.
                 */
                getOptions(): {props:{tickGenerator:geotoolkit.axis.TickGenerator;animationfunction:string;ticks:{major:any;minor:any;edge:any};range:geotoolkit.util.Range}}|any;
                /**
                 * Sets the current value in the range of this axis. If value does not fall into
                 * range represented by this axis, it will be set to min or max depending if it's smaller or bigger
                 * than the range
                 * @param val  (Required) New value to set
                 * @param skipAnimation  (Optional) If true, no animation will be displayed
                 */
                setValue(val: number, skipAnimation?: boolean): this;
                /**
                 * Returns the value of the axis
                 * @param ignoreNaN  (Optional) if true, pass last real value
                 */
                getValue(ignoreNaN?: boolean): number;
                /**
                 * Returns the range of this axis
                 */
                getRange(): geotoolkit.util.Range;
                /**
                 * Sets a new data range displayed by this axis
                 * @param range  (Required) New range to set
                 * @param range.min  (Optional) lower limit
                 * @param range.max  (Optional) upper limit
                 */
                setRange(range: geotoolkit.util.Range|any | { min?: number; max?: number; } ): this;
                /**
                 * Sets the properties pertaining to the ticks of provided grade
                 * @param grade  (Required) Grade of the tick to apply properties to
                 * @param props  (Required) JSON with properties
                 * @param props.linestyle  (Optional) Line style for the tick symbol
                 * @param props.fillstyle  (Optional) Fill style for the tick symbol
                 * @param props.painter  (Optional) Painter which will be used to render the tick
                 * @param props.visible  (Optional) Visibility flag for the ticks
                 * @param props.width  (Optional) Width of individual tick dymbol
                 * @param props.height  (Optional) Height of individual tick dymbol
                 * @param props.tickposition  (Optional) Position of ticks relative to the axis
                 * @param props.labels  (Optional) JSON with label properties {@see geotoolkit.gauges.axis.Axis.setLabelProperties}
                 */
                setTickProperties(grade: string, props: any | { linestyle?: geotoolkit.attributes.LineStyle; fillstyle?: geotoolkit.attributes.FillStyle; painter?: Function; visible?: boolean; width?: number; height?: number; tickposition?: geotoolkit.gauges.axis.TickPositions; labels?: any; } ): this;
                /**
                 * Returns properties of the tick with provided grade
                 * @param grade  (Required) tick grade ('EDGE', 'MAJOR', 'MINOR')
                 */
                getTickProperties(grade: string): {props:{linestyle:geotoolkit.attributes.LineStyle;fillstyle:geotoolkit.attributes.FillStyle;painter:Function;visible:boolean;width:number;height:number;tickposition:geotoolkit.gauges.axis.TickPositions;labels:any}}|any;
                /**
                 * Sets properties pertaining to labels for ticks of provided grade
                 * @param grade  (Required) Grade of the ticks that properties should be applied to
                 * @param props  (Required) JSON with properties
                 * @param props.textstyle  (Optional) Text style for the labels. If text style is
passed, color and font properties are ignored
                 * @param props.color  (Optional) Color of the label text
                 * @param props.font  (Optional) Font for the label text
                 * @param props.position  (Optional) Position of the labels relative to the axis
                 * @param props.formatter  (Optional) Name of function in Function Registry which will be used to format the
value before rendering it into label
                 * @param props.visible  (Optional) Visibility flag of the labels
                 * @param props.gap  (Optional) Gap between the label and the tick or axis
                 */
                setLabelProperties(grade: string, props: any | { textstyle?: geotoolkit.attributes.TextStyle; color?: string|geotoolkit.util.RgbaColor; font?: string; position?: geotoolkit.gauges.axis.TickPositions; formatter?: string; visible?: boolean; gap?: number; } ): this;
                /**
                 * Returns properties pertaining to labels of requested grade
                 * @param grade  (Required) tick grade ('EDGE', 'MAJOR', 'MINOR')
                 */
                getLabelProperties(grade: string): {grade:string;props:{textstyle:geotoolkit.attributes.TextStyle;position:geotoolkit.gauges.axis.TickPositions;formatter:string;gap:number;visible:boolean}}|any;
                /**
                 * Returns an object with properties pertaining to the value shape
                 */
                getValueProperties(): {props:{textstyle:geotoolkit.attributes.TextStyle;visible:boolean;position:geotoolkit.gauges.layout.Region|string;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;formatter:geotoolkit.util.Format;alignment:geotoolkit.util.AnchorType}}|any;
                /**
                 * Sets properties pertaining to value shape of the gauge
                 * @param props  (Required) JSON with properties
                 * @param props.textstyle  (Optional) Style of the text showing axis value
                 * @param props.properties  (Optional) see {@link geotoolkit.scene.shapes.Text#setProperties}
                 * @param props.visible  (Optional) Visibility of the value
                 * @param props.position  (Optional) Region where the value is be rendered
                 * @param props.displaystrategy  (Optional) Strategy by which the value will fit the region
                 * @param props.formatter  (Optional) Formatter which will be applied to the value before rendering
                 * @param props.alignment  (Optional) Position of the value in the region
                 */
                setValueProperties(props: any | { textstyle?: geotoolkit.attributes.TextStyle; properties?: any; visible?: boolean; position?: geotoolkit.gauges.layout.Region|string; displaystrategy?: geotoolkit.gauges.ValueDisplayStrategies; formatter?: geotoolkit.util.Format; alignment?: geotoolkit.util.AnchorType; } ): this;
                /**
                 * Returns properties pertaining to name text
                 */
                getNameProperties(): {props:{textstyle:geotoolkit.attributes.TextStyle;visible:boolean;position:geotoolkit.gauges.layout.Region|string;displaystrategy:geotoolkit.gauges.ValueDisplayStrategies;formatter:geotoolkit.util.Format;alignment:geotoolkit.util.AnchorType}}|any;
                /**
                 * Sets properties pertaining to name shape of the gauge
                 * @param props  (Required) JSON with properties
                 * @param props.textstyle  (Optional) Style of the text showing axis name, overrides font and color
                 * @param props.properties  (Optional) see {@link geotoolkit.scene.shapes.Text#setProperties}
                 * @param props.font  (Optional) Font of the name text
                 * @param props.color  (Optional) Font of the name text
                 * @param props.visible  (Optional) Visibility of the name
                 * @param props.position  (Optional) Region where the name is be rendered
                 * @param props.displaystrategy  (Optional) Strategy by which the name will fit the region
                 * @param props.formatter  (Optional) Formatter which will be applied to the name before rendering
                 * @param props.alignment  (Optional) Position of the name in the region
                 */
                setNameProperties(props: any | { textstyle?: geotoolkit.attributes.TextStyle; properties?: any; font?: string; color?: string|geotoolkit.util.RgbaColor; visible?: boolean; position?: geotoolkit.gauges.layout.Region|string; displaystrategy?: geotoolkit.gauges.ValueDisplayStrategies; formatter?: geotoolkit.util.Format; alignment?: geotoolkit.util.AnchorType; } ): this;
                /**
                 * Sets the name of animation function corresponding to this axis
                 * @param name  (Required) New function name
                 */
                setAnimation(name: string): this;
                /**
                 * Returns the name of animation function associated with this axis
                 */
                getAnimation(): any|string;
                /**
                 * Sets function registry which will provide handlers for gauges animation and alarms
                 * @param registry  (Required) New registry to set
                 */
                setFunctionRegistry(registry: geotoolkit.gauges.registry.FunctionRegistry): this;
                /**
                 * Returns the name of animation function associated with this axis
                 */
                getFunctionRegistry(): {Returns:any|string;registry:geotoolkit.gauges.registry.FunctionRegistry}|any;
                /**
                 * Adds an alarm to the axis. Alarm handler will be called every time
                 * value set on the axis falls within alarm's range
                 * @param alarm  (Required) An alarm to add,
an array of such alarms, or object (array of objects) to be passed into the alarm
                 */
                addAlarm(alarm: any|geotoolkit.gauges.Alarm|any[]|geotoolkit.gauges.Alarm[]): this;
                /**
                 * Gets the alarm referenced by provided name or index. If alarm name is not set or no such
                 * index exists, null will be returned.
                 * @param name  (Required) Name of alarm or its index in iterator
                 */
                getAlarm(name: string|number): geotoolkit.gauges.Alarm|any;
                /**
                 * Removes an alarm by its name, index, or instance of alarm
                 * @param name  (Required) Name of alarm or its index in iterator
                 */
                removeAlarm(name: string|number|geotoolkit.gauges.Alarm): this;
                /**
                 * Removes all registered alarms
                 */
                cleanAlarms(): this;
                /**
                 * Gets an iterator over existing alarms in the gauge
                 * @param filter  (Optional) a filter function. Returns all axes if null
                 */
                getAlarms(filter?: Function): geotoolkit.util.Iterator;
                /**
                 * Returns time in which an animation should be finished in seconds
                 */
                getAnimationTime(): number;
                /**
                 * Sets time in which an animation should be finished in seconds
                 * @param time  (Required) Time in seconds to perform the animation
                 */
                setAnimationTime(time: number): this;
                /**
                 * Recalculates the parameters of the axis and rerenders
                 */
                redraw(): this;
                /**
                 * Enumerate children nodes
                 * @param callback  (Required) callback
                 * @param target  (Optional) target
                 */
                enumerateNodes(callback: Function, target?: any): any;
            }
            /**
             * Implements an axis which uses Tick Generators to calculate number of ticks and their positions.
             * This axis calculates the ticks dynamically to not allow any intersections among labels and ticks.
             * The axis allows to render ticks and labels in three positions:
             * inside: tick growing from the inner bound of the axis towards the center
             * outside: tick growing from outer bound of axis towards the center
             */
            class CircularAxis extends geotoolkit.gauges.axis.Axis {
                /**
                 * Implements an axis which uses Tick Generators to calculate number of ticks and their positions.
                 * This axis calculates the ticks dynamically to not allow any intersections among labels and ticks.
                 * The axis allows to render ticks and labels in three positions:
                 * inside: tick growing from the inner bound of the axis towards the center
                 * outside: tick growing from outer bound of axis towards the center
                 */
                constructor();
                /**
                 * Disposes this node, once disposes a node should not be used anymore.<br>
                 * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
                 * Also aggressively 'cleanup' this node by setting some of its members to null.
                 * Disposes value and name shapes as well
                 */
                dispose(): any;
                /**
                 * Returns an object with properties pertaining to this axis
                 */
                getProperties(): {props:{fillstyle:geotoolkit.attributes.FillStyle;linestyle:geotoolkit.attributes.LineStyle;visible:boolean;thickness:number|string;startangleoffset:number|string;endangleoffset:number|string;radius:number|string;shadow:any;name:string;regions:geotoolkit.gauges.axis.Region[];needle:{geometry:geotoolkit.scene.Group;center:geotoolkit.util.Point;position:geotoolkit.gauges.AbstractGauge.DynamicElementPosition;radius:number|string;visible:boolean}}}|any;
                /**
                 * Sets properties pertaining to this axis
                 * @param props  (Required) Object with properties
                 * @param props.fillstyle  (Optional) Fill style of the base arc of the axis
                 * @param props.linestyle  (Optional) Line style of the base arc of the axis
                 * @param props.visible  (Optional) Visibility flag to set on axis
                 * @param props.thickness  (Optional) Thickness of the axis base in CSS format (relative to the radius of the axis)
                 * @param props.startangel  (Optional) start angel
                 * @param props.sweepangel  (Optional) sweep angel
                 * @param props.center  (Optional) center
                 * @param props.startangleoffset  (Optional) The distance (offset) of the start angle of the axis from start angle of the gauge.
Rotates the axis clockwise
                 * @param props.endangleoffset  (Optional) The distance (offset) of the start angle of the axis from start angle of the gauge.
Shrinks the axis counterclockwise
                 * @param props.radius  (Optional) Radius of the axis in CSS format (relative to gauge radius)
                 * @param props.parentradius  (Optional) parent radius
                 * @param props.shadow  (Optional) JSON with shadow properties
                 * @param props.name  (Optional) Name of the gauge by which it is referenced
                 * @param props.regions  (Optional) An array with regions that should be displayed by the gauge.
Regions will be added on top of existing regions.
                 * @param props.needle  (Optional) Properties defining the needle see {@link geotoolkit.gauges.Needle#setProperties}
                 */
                setProperties(props: any | { fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; visible?: boolean; thickness?: number|string; startangel?: number|string; sweepangel?: number|string; center?: number|string; startangleoffset?: number|string; endangleoffset?: number|string; radius?: number|string; parentradius?: number|string; shadow?: any; name?: string; regions?: geotoolkit.gauges.axis.Region[]; needle?: any; } ): this;
                /**
                 * Sets options to customize the axis.
                 * @param options  (Required) JSON containing axis options
                 */
                setOptions(options: any): this;
                /**
                 * Gets options to customize the axis.
                 */
                getOptions(): any;
                /**
                 * Sets properties pertaining to shadow of the axis
                 * @param props  (Required) JSON with properties
                 * @param props.color  (Optional) Color of the filling of the gauge shadows
                 * @param props.visible  (Optional) Visibility flag for the shadow
                 * @param props.linecap  (Optional) Style of the edges of the shadow
                 */
                setShadowProperties(props: any | { color?: string|geotoolkit.util.RgbaColor; visible?: boolean; linecap?: geotoolkit.attributes.LineStyle.CapStyle|string; } ): this;
                /**
                 * Gets properties pertaining to shadow of the axis
                 */
                getShadowProperties(): {props:{color:string|geotoolkit.util.RgbaColor;visible:boolean;linecap:geotoolkit.attributes.LineStyle.CapStyle|string}}|any;
                /**
                 * Renders the axis and ticks
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Sets the needle for the axis
                 * @param params  (Required) JSON with needle properties
                 */
                setNeedle(params: any): this;
                /**
                 * Gets position of the needle (bottom layer or top layer)
                 */
                getNeedlePosition(): string;
                /**
                 * Gets the current needle geometry
                 */
                getNeedleGeometry(): geotoolkit.scene.Group;
                /**
                 * Sets the value of the axis
                 * @param val  (Required) The value to be displayed by the axis.
                 * @param skipAnimation  (Required) If true, no animation will be displayed
                 */
                setValue(val: number, skipAnimation: boolean): this;
                /**
                 * Sets the color of shadow fill for the gauge
                 * @param color  (Required) New color of the value fill
                 */
                setShadowColor(color: string|geotoolkit.util.RgbaColor): this;
                /**
                 * Gets the color of shadow fill for the gauge
                 */
                getShadowColor(): string|geotoolkit.util.RgbaColor;
                /**
                 * Sets a new tick generator on the axis
                 * @param tickGenerator  (Required) tick generator
                 */
                setTickGenerator(tickGenerator: geotoolkit.axis.TickGenerator): this;
                /**
                 * Returns the tick generator pertaining to this axis
                 */
                getTickGenerator(): geotoolkit.axis.TickGenerator;
                /**
                 * Updates the state of axis
                 */
                update(): geotoolkit.gauges.axis.Axis;
                /**
                 * Shows or hides the needle
                 * @param visible  (Required) Visibility flag for the needle
                 */
                setNeedleVisible(visible: boolean): this;
                /**
                 * Gets properties pertaining to needle
                 */
                getNeedleOptions(): {props:{geometry:geotoolkit.scene.Group;center:geotoolkit.util.Point;position:geotoolkit.gauges.AbstractGauge.DynamicElementPosition;radius:number|string;visible:boolean}}|any;
                /**
                 * Sets options pertaining to the needle
                 * @param props  (Required) JSON with properties
                 * @param props.geometry  (Optional) Geotoolkit group containing the shapes which form the geometry of the needle
                 * @param props.center  (Optional) A point in model of needle which serves as an anchor point for rotation
and centering the needle with the gauge.
                 * @param props.position  (Optional) Layer on which the needle should be positioned
either in front of all components, or in the back.
                 * @param props.radius  (Optional) For circular needle the length of the needle relative to the radius of the axis.     * @param {} geometry
The length will be calculated automatically and if the needle has to be enlarged or shrinked, this will be done with
preservation of aspect ratio.
                 * @param props.visible  (Optional) Visibility flag of the needle
                 */
                setNeedleOptions(props: any | { geometry?: geotoolkit.scene.Group; center?: geotoolkit.util.Point; position?: geotoolkit.gauges.AbstractGauge.DynamicElementPosition; radius?: number|string; visible?: boolean; } ): this;
            }
            /**
             * Enumerator defining the positions of ticks
             */
            interface TickPositions {
                /**
                 * Center position - ticks grow from center in and out
                 */
                Center: string;
                /**
                 * Inside position - ticks grow from inner bound of the axis and towards the center
                 */
                Inside: string;
                /**
                 * Outside position - ticks grow from outer bound of the axis and away from center
                 */
                Outside: string;
            }
            /**
             * Defines events fired by axis
             */
            interface Events {
                /**
                 * Fired when the region where value is rendered has been changed
                 */
                stateUpdated: string;
                /**
                 * Fired when the region where value is rendered has been changed
                 */
                StateUpdated: string;
            }
            module Axis {
                /**
                 * A set of events fired by axis
                 */
                interface Events {
                    /**
                     * Name of the axis has been changed
                     */
                    nameChanged: string;
                }
            }
        }
        module layout {
            /**
             * An enum representing all the possible positions inside a gauge
             */
            var Regions: any;
            /**
             * An enum representing all the layers inside a gauge
             */
            var Layers: any;
            /**
             * Implements a region which is the main component in the process of layouting the gauge elements. A region
             * is an abstract rectangle which defines some area withing the gauge bounds and can contain any part of the gauge.
             * By default, gauge is divided into 9 regions, but not limited to that. Custom regions can be added. Since regions
             * are an abstract object, no fill style and/or linestyle can be applied to them. Bounds of a region are calculated
             * and set by the gauge, thus, setting bounds from an application will be overridden.
             */
            class Region {
                /**
                 * Implements a region which is the main component in the process of layouting the gauge elements. A region
                 * is an abstract rectangle which defines some area withing the gauge bounds and can contain any part of the gauge.
                 * By default, gauge is divided into 9 regions, but not limited to that. Custom regions can be added. Since regions
                 * are an abstract object, no fill style and/or linestyle can be applied to them. Bounds of a region are calculated
                 * and set by the gauge, thus, setting bounds from an application will be overridden.
                 * @param params  (Required) JSON with properties
                 * @param params.x  (Optional) X coordinate of the region
                 * @param params.y  (Optional) Y coordinate of the region
                 * @param params.width  (Optional) Width of the region
                 * @param params.height  (Optional) Height of the region
                 * @param params.bounds  (Optional) 
                 * @param params.name  (Optional) 
                 * @param params.fillstyle  (Optional) 
                 * @param params.linestyle  (Optional) 
                 * @param params.parent  (Optional) The region relative to which this region is calculated
                 */
                constructor(params: any | { x?: number; y?: number; width?: number; height?: number; bounds?: geotoolkit.util.Rect; name?: string; fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; parent?: string|geotoolkit.gauges.layout.Regions; } );
                /**
                 * Get a clone of this object
                 */
                clone(): geotoolkit.gauges.layout.Region;
                /**
                 * Gets properties pertaining to this object
                 */
                getProperties(): {params:{bounds:geotoolkit.util.Rect;name:string;fillstyle:geotoolkit.attributes.FillStyle;linestyle:geotoolkit.attributes.LineStyle;parent:string|geotoolkit.gauges.layout.Regions}}|any;
                /**
                 * Sets properties pertaining to this object
                 * @param params  (Required) JSON with properties
                 * @param params.bounds  (Required) region bounds
                 * @param params.name  (Required) region name
                 * @param params.padding  (Required) padding
                 * @param params.fillstyle  (Required) region fillstyle
                 * @param params.linestyle  (Required) region border linestyle
                 */
                setProperties(params: any | { bounds?: geotoolkit.util.Rect; name?: string; padding?: number; fillstyle?: geotoolkit.attributes.FillStyle; linestyle?: geotoolkit.attributes.LineStyle; } ): this;
                /**
                 * Returns bounds of the region
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Sets bounds for this region
                 * @param bounds  (Required) New bounds
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Sets Width property of region
                 * @param w  (Required) New Width to set
                 */
                setWidth(w: number): this;
                /**
                 * Sets Height property of region
                 * @param h  (Required) New Height to set
                 */
                setHeight(h: number): this;
                /**
                 * Returns Width property of region
                 */
                getWidth(): number;
                /**
                 * Returns Height property of region
                 */
                getHeight(): number;
                /**
                 * Sets X property of region
                 * @param x  (Required) New X to set
                 */
                setX(x: number): this;
                /**
                 * Sets Y property of region
                 * @param y  (Required) New Y to set
                 */
                setY(y: number): this;
                /**
                 * Gets Line Style of this region
                 */
                getLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Gets Fill Style of this region
                 */
                getFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Gets the parent where this region is rendered
                 */
                getParent(): string|geotoolkit.gauges.layout.Regions;
                /**
                 * Returns the name of region relative to which this region is calculated
                 * @param parent  (Required) region parent
                 */
                setParent(parent: geotoolkit.gauges.layout.Regions): this;
                /**
                 * Create or get a region from an object
                 * @param region  (Required) A region or an object with region properties
                 */
                static fromObject(region: geotoolkit.gauges.layout.Region|any): geotoolkit.gauges.layout.Region;
            }
            /**
             * Defines a layout for gauges
             */
            class GaugeLayout extends geotoolkit.layout.Layout {
                /**
                 * Defines a layout for gauges
                 * @param props  (Required) JSON with properties
                 */
                constructor(props: any);
                /**
                 * Deletes a region from the layout. Only custom added regions can be removed.
                 * @param name  (Required) Name of the region
                 */
                removeRegion(name: string): this;
                /**
                 * Returns a custom component which was registered by provided name
                 * @param name  (Required) Name of component to return
                 */
                getCustomComponent(name: string): geotoolkit.scene.Node;
                /**
                 * Parser region CSS parameters and updates regions accordingly
                 */
                updateCssRegions(): any;
                /**
                 * Checks if the region with this name is a custom region
                 * @param name  (Required) Name of the region to test
                 */
                isCustomRegion(name: string): boolean;
                /**
                 * Changes parameters of custom regions
                 * @param name  (Required) Name of the custom region
                 * @param params  (Required) JSON with CSS properties
                 * @param params.x  (Required) X of the region relative to its parent
                 * @param params.y  (Required) Y of the region relative to its parent
                 * @param params.width  (Required) Width of the region relative to its parent
                 * @param params.height  (Required) Height of the region relative to its parent
                 */
                setCustomRegionParams(name: string, params: any | { x?: number|string; y?: number|string; width?: number|string; height?: number|string; } ): this;
            }
            /**
             * Defines layout for circular gauges
             */
            class CircularLayout extends geotoolkit.gauges.layout.GaugeLayout {
                /**
                 * Defines layout for circular gauges
                 */
                constructor();
            }
            /**
             * Defines layout for circular gauges
             */
            class VerticalSplitLayout extends geotoolkit.gauges.layout.GaugeLayout {
                /**
                 * Defines layout for circular gauges
                 */
                constructor();
            }
            /**
             * An enum representing all the possible positions inside a gauge
             */
            interface Regions {
                /**
                 * East position - exists in every gauge
                 */
                East: string;
                /**
                 * West position - exists in every gauge
                 */
                West: string;
                /**
                 * North position - exists in every gauge
                 */
                North: string;
                /**
                 * South position - exists in every gauge
                 */
                South: string;
                /**
                 * NorthWest position - exists in every gauge
                 */
                NorthWest: string;
                /**
                 * NorthEast position - exists in every gauge
                 */
                NorthEast: string;
                /**
                 * SouthEast position - exists in every gauge
                 */
                SouthEast: string;
                /**
                 * SouthWest position - exists in every gauge
                 */
                SouthWest: string;
                /**
                 * Center position - exists in every gauge
                 */
                Center: string;
                /**
                 * InnerSouth position - Exists in Circular gauges and Numeric gauges
                 */
                InnerSouth: string;
                /**
                 * InnerNorth position - Exists in Circular gauges and Numeric gauges
                 */
                InnerNorth: string;
                /**
                 * InnerNorth position - Exists in Circular gauges and Numeric gauges
                 */
                InnerCenter: string;
                /**
                 * InnerCenter position - Exists in Circular gauges
                 */
                InnerEast: string;
                /**
                 * InnerCenter position - Exists in Circular gauges
                 */
                InnerWest: string;
                /**
                 * The region which is a square containing the circle of the axis
                 */
                CircleRegion: string;
            }
            /**
             * An enum representing all the layers inside a gauge
             */
            interface Layers {
                /**
                 * Custom Component Layer - contains custom components, rendered on top
                 */
                CustomComponent: string;
                /**
                 * Top Dynamic Layer - contains dynamic elements, rendered on top of Bottom Dynamic
                 */
                TopDynamic: string;
                /**
                 * Bottom Dynamic Layer - contains dynamic elements, rendered below Top Dynamic
                 */
                BottomDynamic: string;
                /**
                 * Static Layer - contains static elements, rendered at bottom
                 */
                Static: string;
            }
        }
        module defaults {
            /**
             */
            var Templates: any;
            /**
             * Implements a simple circular gauge with adaptive ticks located inside. Axis is a thick line
             * with major, edge, and minor ticks. A classic needle is added to the gauge as well.
             */
            class ClassicCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a simple circular gauge with adaptive ticks located inside. Axis is a thick line
                 * with major, edge, and minor ticks. A classic needle is added to the gauge as well.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a circular gauge with three axis (displaying three different data sets). There are
             * one large, one medium, and one small axis, called 'large', 'medium', and 'small' respectively.
             * The name of the gauge is displayed in a circle in center, value for each axis is displayed in
             * the cut of that axis.
             */
            class ThreeBandCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a circular gauge with three axis (displaying three different data sets). There are
                 * one large, one medium, and one small axis, called 'large', 'medium', and 'small' respectively.
                 * The name of the gauge is displayed in a circle in center, value for each axis is displayed in
                 * the cut of that axis.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a factory which creates a gauge with two axes. One axis is slightly smaller than another
             * and is called 'inneraxis' and the bigger one is called 'outeraxis'. Two marker style needles are
             * also being added here, one pointins at the outside border of the outer axis and the other one points
             * at the inner border of the inner axis. Values are displayed inside the circle.
             */
            class DoubleAxisCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a factory which creates a gauge with two axes. One axis is slightly smaller than another
                 * and is called 'inneraxis' and the bigger one is called 'outeraxis'. Two marker style needles are
                 * also being added here, one pointins at the outside border of the outer axis and the other one points
                 * at the inner border of the inner axis. Values are displayed inside the circle.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties.
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a circular gauge with one axis and a shadow moving on the outer side of that axis.
             * Value is displayed in the center and the shadow acts as visualization.
             */
            class ArcIndicatorCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a circular gauge with one axis and a shadow moving on the outer side of that axis.
                 * Value is displayed in the center and the shadow acts as visualization.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a circular gauge with one axis where ticks are just hollow spaces which makes the gauge
             * axis look segmented
             * Value is displayed in the center and the shadow acts as visualization.
             */
            class SegmentedBandCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a circular gauge with one axis where ticks are just hollow spaces which makes the gauge
                 * axis look segmented
                 * Value is displayed in the center and the shadow acts as visualization.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory.  This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a circular gauge with a needle most parth of which is covered by a big circle which
             * has value displayed on it.
             * axis look segmented
             * Value is displayed in the center and the shadow acts as visualization.
             */
            class CoveredNeedleCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a circular gauge with a needle most parth of which is covered by a big circle which
                 * has value displayed on it.
                 * axis look segmented
                 * Value is displayed in the center and the shadow acts as visualization.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Defines a class which contains default easing functions to apply to animation
             */
            class EasingFunctions {
                /**
                 * Defines a class which contains default easing functions to apply to animation
                 */
                constructor();
            }
            /**
             * Implements a circular gauge without a needle which displays value by filling the grey circle with
             * light blue value fill which has round line tips. Value is displayed in the center and the shadow acts as visualization.
             */
            class ModernCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a circular gauge without a needle which displays value by filling the grey circle with
                 * light blue value fill which has round line tips. Value is displayed in the center and the shadow acts as visualization.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory.  This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a horizontal traffic gauge with three lights, green, yellow, and red. When a light is not active,
             * it is light grey.
             */
            class HorizontalTraffic extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a horizontal traffic gauge with three lights, green, yellow, and red. When a light is not active,
                 * it is light grey.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory.  This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Traffic Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a vertical traffic gauge with three lights, green, yellow, and red. When a light is not active,
             * it is light grey.
             */
            class VerticalTraffic extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a vertical traffic gauge with three lights, green, yellow, and red. When a light is not active,
                 * it is light grey.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Traffic Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a linear gauge (with horizontal scale) . The fill indicator shows the range of data and the main axis shows the ticks
             */
            class HorizontalBoxFillGauge extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a linear gauge (with horizontal scale) . The fill indicator shows the range of data and the main axis shows the ticks
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Linear Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a linear gauge (with Vertical scale) . The fill indicator shows the range of data and the main axis shows the ticks
             */
            class VerticalBoxFillGauge extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a linear gauge (with Vertical scale) . The fill indicator shows the range of data and the main axis shows the ticks
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Linear Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a circular gauge with 3 axes, 'outeraxis' and 'inneraxis' which render a set of ticks along a range of values.<br>
             * 'middleaxis' renders an inner color fill between 'axisouter' and 'axisinner'. Ranges can be differentiated by specifying unique color fills.
             */
            class Pressure extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a circular gauge with 3 axes, 'outeraxis' and 'inneraxis' which render a set of ticks along a range of values.<br>
                 * 'middleaxis' renders an inner color fill between 'axisouter' and 'axisinner'. Ranges can be differentiated by specifying unique color fills.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory.  This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a linear gauge (with vertical scale) . The fill is the indicator and shows the range of data, the value is displayed outside the gauge at the top. <br>
             * It provides a left axis and right axis. It has a custom component which shows the status text based on the range of the value.
             */
            class AnnotatedFillGauge extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a linear gauge (with vertical scale) . The fill is the indicator and shows the range of data, the value is displayed outside the gauge at the top. <br>
                 * It provides a left axis and right axis. It has a custom component which shows the status text based on the range of the value.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use . It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Linear gauges tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a simple circular gauge with adaptive ticks located inside. Axis is a thick line
             * with major, edge, and minor ticks. A classic needle is added to the gauge as well.
             */
            class HalfCircularSimple extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a simple circular gauge with adaptive ticks located inside. Axis is a thick line
                 * with major, edge, and minor ticks. A classic needle is added to the gauge as well.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Half-Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a horizontally-aligned numeric gauge.
             */
            class HorizontalNumeric extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a horizontally-aligned numeric gauge.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Numeric Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a linear gauge (with vertical scale) . The fill shows the range of data and the value is displayed in the center of the gauge.
             */
            class EllipseFillGauge extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a linear gauge (with vertical scale) . The fill shows the range of data and the value is displayed in the center of the gauge.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Linear Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a simple numeric gauge. Contains two regions with a descriptor in the north
             * position and a value in the south position. The north region has a blue fill background,
             * the south region has a white fill background
             */
            class SimpleNumeric extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a simple numeric gauge. Contains two regions with a descriptor in the north
                 * position and a value in the south position. The north region has a blue fill background,
                 * the south region has a white fill background
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Numeric Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a simple circular gauge with adaptive ticks located inside. Axis is a thick line
             * with major, edge, and minor ticks. A classic needle is added to the gauge as well.
             */
            class BandCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a simple circular gauge with adaptive ticks located inside. Axis is a thick line
                 * with major, edge, and minor ticks. A classic needle is added to the gauge as well.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a collection of implemented default gauges to be used with gauge registry
             */
            class Defaults {
                /**
                 * Implements a collection of implemented default gauges to be used with gauge registry
                 */
                constructor();
                /**
                 * Returns an array with instances of standard gauges factories
                 */
                static getAllDefaults(): geotoolkit.gauges.AbstractFactory[];
            }
            /**
             * Implements a simple half-circular gauge with no ticks. Axis is a thick filled bar with
             * colored regions. Also contains a simple needle
             */
            class ZonedHalfCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a simple half-circular gauge with no ticks. Axis is a thick filled bar with
                 * colored regions. Also contains a simple needle
                 */
                constructor();
                /**
                 * Return properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a simple half-circular gauge with no ticks. Axis is transparent,
             * uses a thick value fill instead of a needle.
             */
            class DoubleFanHalfCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a simple half-circular gauge with no ticks. Axis is transparent,
                 * uses a thick value fill instead of a needle.
                 */
                constructor();
                /**
                 * Return properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a horizontally-aligned numeric gauge that features a an icon for displaying value trends
             */
            class TrendingNumeric extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a horizontally-aligned numeric gauge that features a an icon for displaying value trends
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Numeric Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a circular gauge with irregular tick spacing. Some ticks/labels may be hidden
             * due to label collisions.
             */
            class UnevenCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a circular gauge with irregular tick spacing. Some ticks/labels may be hidden
                 * due to label collisions.
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            /**
             * Implements a minimal quarter circular gauge with a needle
             */
            class SimpleQuarterCircular extends geotoolkit.gauges.AbstractFactory {
                /**
                 * Implements a minimal quarter circular gauge with a needle
                 */
                constructor();
                /**
                 * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
                 */
                getGaugeProperties(): any;
                /**
                 * Returns a gauge ready for use. It is however recommended to use the {@link  geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
                 * @param params  (Required) JSON with overriding properties
                 */
                createGauge(params: any): geotoolkit.gauges.AbstractGauge;
            }
            interface Templates {
                /**
                 */
                ModernCircular: string;
                /**
                 */
                ClassicCircular: string;
                /**
                 */
                ThreeBandCircular: string;
                /**
                 */
                DoubleAxisCircular: string;
                /**
                 */
                ArcIndicatorCircular: string;
                /**
                 */
                SegmentedBandCircular: string;
                /**
                 */
                CoveredNeedleCircular: string;
                /**
                 */
                HorizontalTraffic: string;
                /**
                 */
                VerticalTraffic: string;
                /**
                 */
                AnnotatedFillGauge: string;
                /**
                 */
                HorizontalBoxFillGauge: string;
                /**
                 */
                VerticalBoxFillGauge: string;
                /**
                 */
                EllipseFillGauge: string;
                /**
                 */
                Pressure: string;
                /**
                 */
                SimpleNumeric: string;
                /**
                 */
                ZonedHalfCircular: string;
                /**
                 */
                HalfCircularSimple: string;
                /**
                 */
                DoubleFanHalfCircular: string;
                /**
                 */
                HorizontalNumeric: string;
                /**
                 */
                TrendingNumeric: string;
                /**
                 */
                BandCircular: string;
                /**
                 */
                SimpleQuarterCircular: string;
                /**
                 */
                UnevenCircular: string;
            }
        }
        module registry {
            /**
             * A simple class which knows how to store alarm functions and return them, all by name
             */
            class FunctionRegistry {
                /**
                 * A simple class which knows how to store alarm functions and return them, all by name
                 */
                constructor();
                /**
                 * Returns an instance of registry filled with easing functions
                 */
                static getDefaultInstance(): geotoolkit.gauges.registry.FunctionRegistry;
                /**
                 * Registers an alarm handler function by its name
                 * @param name  (Required) Name of the handler or an object with handlers
                 * @param func  (Optional) Handler Function
                 */
                registerFunction(name: string|any, func?: Function): this;
                /**
                 * Gets a handler function by its name
                 * @param name  (Required) Name of the function to get
                 */
                getFunction(name: string): Function;
            }
            /**
             * Implements a registry for gauge implementations (factories)
             */
            class GaugeRegistry {
                /**
                 * Implements a registry for gauge implementations (factories)
                 */
                constructor();
                /**
                 * Gets an instance of gauge registry
                 */
                static getDefaultInstance(): geotoolkit.gauges.registry.GaugeRegistry;
                /**
                 * Registers a factory to the registry, indexing is done by the name
                 * @param name  (Required) Name of factory to register
                 * @param factory  (Required) Factory to register
                 */
                register(name: string, factory: geotoolkit.gauges.AbstractFactory): this;
                /**
                 * Removes a factory from the registry
                 * @param name  (Required) Name of the factory which has to be removed
                 */
                unregister(name: string): this;
                /**
                 * Removes every factory from the registry
                 */
                clear(): this;
                /**
                 * Returns true if a factory with provided name is registered
                 * @param name  (Required) Name of the gauge factory to look for
                 */
                contains(name: string): boolean;
                /**
                 * Returns an instance of a gauge created by the factory which
                 * has been registered with provided name. Returns null if no such
                 * factory has been registered
                 * @param name  (Required) Name of the registered factory
                 * @param properties  (Required) JSON with properties that have to be overridden
                 */
                createGauge(name: string, properties: any): geotoolkit.gauges.AbstractGauge;
                /**
                 * Registers default geotoolkit gauge implementations to the registry
                 */
                registerDefaults(): this;
                /**
                 * Gets the type of the gauge returned by one of the factories registered in this registry
                 * and referred by the provided name.
                 * @param name  (Required) Name of the default gauge
                 */
                getGaugeType(name: string): string;
            }
        }
        module AbstractGauge {
            /**
             * Layer to which a dynamic element should be added
             */
            interface DynamicElementPosition {
                /**
                 * Top layer, displayed over everything else
                 */
                Top: string;
                /**
                 * Bottom layer, displayed under everything else
                 */
                Bottom: string;
            }
            /**
             * Events fired by AbstractGauge
             */
            interface Events {
                /**
                 * When gauge value has been updated
                 */
                ValueUpdated: string;
            }
        }
        module LinearGauge {
            /**
             * Positions of axis relative to the indicator
             */
            interface AxisPosition {
                /**
                 * Position to the left of indicator
                 */
                Left: string;
                /**
                 * Position to the right of indicator
                 */
                Right: string;
                /**
                 * Position to the top of indicator
                 */
                Top: string;
                /**
                 * Position to the bottom of indicator
                 */
                Bottom: string;
            }
        }
    }
}
