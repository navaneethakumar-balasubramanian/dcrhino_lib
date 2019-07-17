declare module geotoolkit {
    module welllog {
        /**
         * Enum of border strategy
         */
        var BorderStrategy: any;
        /**
         * enum for TrackType
         */
        var TrackType: any;
        /**
         * Enum for Track Direction
         */
        var TrackDirection: any;
        /**
         * This represents a parent class of all well log visuals. LogVisuals are shapes that are considered by the WelllogJS toolkit as 'top level' shapes.
         * The LogHeader and LogFooters for those visuals are created by the toolkit. <br>
         * Some advanced features like the Widget's SelectionTool will ignore any shape that is not a Visual. This class defines the parent class that needs to be inherited from, to benefit from those features.<br>
         * Most common WellLog shapes already inherit from this class, like LogCurve, LogTrack, etc.
         */
        class LogAbstractVisual extends geotoolkit.scene.Node {
            /**
             * This represents a parent class of all well log visuals. LogVisuals are shapes that are considered by the WelllogJS toolkit as 'top level' shapes.
             * The LogHeader and LogFooters for those visuals are created by the toolkit. <br>
             * Some advanced features like the Widget's SelectionTool will ignore any shape that is not a Visual. This class defines the parent class that needs to be inherited from, to benefit from those features.<br>
             * Most common WellLog shapes already inherit from this class, like LogCurve, LogTrack, etc.
             */
            constructor();
            /**
             * Invalidate bounds
             * @param bounds  (Optional) if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
             */
            invalidateParent(bounds?: geotoolkit.util.Rect|any): any;
            /**
             * Returns parent track if geotoolkit.welllog.LogTrack
             */
            getTrack(): geotoolkit.welllog.LogTrack;
            /**
             * Sets line style
             * @param lineStyle  (Required) The style in which the line is displayed
object can be in format of constructor of geotoolkit.attributes.LineStyle
             * @param lineStyle.color  (Optional) line color
             * @param lineStyle.width  (Optional) line width
             * @param lineStyle.pattern  (Optional) line pattern
             * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
             */
            setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|string|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } , merge?: boolean): this;
            /**
             * Returns line style
             */
            getLineStyle(): geotoolkit.attributes.LineStyle;
            /**
             * Return meaning data limits
             * @param fullLimits  (Optional) default value is false
             */
            getDataLimits(fullLimits?: boolean): geotoolkit.util.Rect;
            /**
             * Returns parent model limits
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Returns bounds in the parent coordinates
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Sets bounds of the curve in the parent coordinates
             * and sets up auto bounds to false
             * @param bounds  (Required) the rectangle specifying position of the curve in the track.
             */
            setBounds(bounds: geotoolkit.util.Rect): this;
            /**
             * Enables or disables auto bounds. If auto bounds is enabled then it
             * equals to parent model limits
             * @param enable  (Required) Enables or disables auto bounds
             */
            setAutoBounds(enable: boolean): this;
            /**
             * Returns auto bounds value
             */
            isAutoBounds(): boolean;
            /**
             * Retrieves the world transformation of the spatial
             * Returns null
             */
            getContentsTransform(): geotoolkit.util.Transformation;
            /**
             * Retrieves the local transformation of the node which represents
             * multiplication of parent to bounds and contents transformations.
             */
            getWorldTransform(): geotoolkit.util.Transformation;
            /**
             * Check culling.
             * Returns true if object is inside of renderable area
             * @param context  (Required) Rendering Context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.bounds  (Optional) the rectangle specifying position of the curve in the track.
             * @param properties.autobounds  (Optional) Enables or disables auto bounds
             * @param properties.linestyle  (Optional) linestyle
             */
            setProperties(properties: any | { bounds?: geotoolkit.util.Rect; autobounds?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; } ): this;
            /**
             * return an object that contains all headers registered with the visual
             */
            getHeaders(): any;
            /**
             * return the header registered by the name
             */
            getHeader(): any;
        }
        /**
         * Create point set visual
         */
        class LogPointSet extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * Create point set visual
             */
            constructor();
            /**
             * Return model limits
             */
            getModelLimits(): any;
            /**
             * Return bound in the parent coordinates
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Sets bounds of the point set in the parent coordinates false
             * @param bounds  (Required) bounds of the point set
             */
            setBounds(bounds: geotoolkit.util.Rect): this;
            /**
             * Enable or disable auto bounds If auto bounds is enabled then it equals to
             * parent model limits
             * @param enable  (Required) Enable or disable auto bounds
             */
            setAutoBounds(enable: boolean): this;
            /**
             * Enable automatic bounds. If auto bounds is enabled then it equals to
             * parent model limits
             */
            isAutoBounds(): boolean;
            /**
             * Retrieves the world transformation of the spatial
             */
            getContentsTransform(): any;
            /**
             * Gets the visual's scaled data
             */
            getScaledData(): geotoolkit.data.AbstractScaledData;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             */
            setProperties(properties: any): this;
        }
        /**
         * The LogTrack is a generic container of Well elements like logcurves, log-axis, log-images, etc.
         * It can be used for various purposes like DepthIndex, TimeIndex or a plain LogCurve container. <br>
         * For example, one could add {@link geotoolkit.axis.Axis} to a log track to create an index-track, Or add a {@link geotoolkit.welllog.LogLog10ValueGrid} to create a logarithmic display.<br>
         * Track it self is not linear or logarithmic, you can mix regular curve and logarithmic in linear track and logarithmic curve with regular in logarithmic track.<br>
         * <br>
         * Options in the constructor are used to manipulate other properties like border,bounds. A combination of tracks can be displayed by using {@link geotoolkit.welllog.TrackContainer}.<br>
         * To add a curve to the track simply use addChild,  geotoolkit.welllog.LogTrack.addChild({@link geotoolkit.welllog.LogCurve}). <br>
         * The children are displayed in order you add it in to the track so if you add curve and then lithology, then lithology will be above curve. <br>
         * To change the order you can remove child and add it again or use : <br>
         * track.changeChildOrder(curve, geotoolkit.scene.CompositeNode.NodeOrder.Last); // Please see CompositeNode.prototype.changeChildOrder documentation
         */
        class LogTrack extends geotoolkit.scene.CompositeNode implements geotoolkit.layout.ILayoutable {
            /**
             * The LogTrack is a generic container of Well elements like logcurves, log-axis, log-images, etc.
             * It can be used for various purposes like DepthIndex, TimeIndex or a plain LogCurve container. <br>
             * For example, one could add {@link geotoolkit.axis.Axis} to a log track to create an index-track, Or add a {@link geotoolkit.welllog.LogLog10ValueGrid} to create a logarithmic display.<br>
             * Track it self is not linear or logarithmic, you can mix regular curve and logarithmic in linear track and logarithmic curve with regular in logarithmic track.<br>
             * <br>
             * Options in the constructor are used to manipulate other properties like border,bounds. A combination of tracks can be displayed by using {@link geotoolkit.welllog.TrackContainer}.<br>
             * To add a curve to the track simply use addChild,  geotoolkit.welllog.LogTrack.addChild({@link geotoolkit.welllog.LogCurve}). <br>
             * The children are displayed in order you add it in to the track so if you add curve and then lithology, then lithology will be above curve. <br>
             * To change the order you can remove child and add it again or use : <br>
             * track.changeChildOrder(curve, geotoolkit.scene.CompositeNode.NodeOrder.Last); // Please see CompositeNode.prototype.changeChildOrder documentation
             * @param options  (Optional) 
             * @param options.bounds  (Optional) bounds of the visual
             * @param options.border  (Optional) outline of the track
             * @param options.borderstrategy  (Optional) strategy on how to display the border of the track
             */
            constructor(options?: any | { bounds?: any; border?: any; borderstrategy?: boolean; } );
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.welllog.LogTrack): any;
            /**
             * Invalidate bounds
             * @param bounds  (Optional) if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
             * @param force  (Optional) force invalidation
             */
            invalidateParent(bounds?: geotoolkit.util.Rect|any, force?: boolean): this;
            /**
             * Return parent track container or null
             */
            getTrackContainer(): geotoolkit.welllog.TrackContainer|any;
            /**
             * Set track width and layout remains tracks
             * @param width  (Required) a new track width
             */
            setWidth(width: number): this;
            /**
             * Returns track width
             */
            getWidth(): number;
            /**
             * Returns an object that has getDeviceUnit and getScaleUnit functions
             */
            getUnitInfo(): any|any;
            /**
             * Sets the track's unit info object, which holds getDeviceUnit and getScaleUnit functions
             * @param unitInfo  (Required) track's unit info - device unit and the scaled unit
             */
            setUnitInfo(unitInfo: any): any;
            /**
             * Return an object { left: {boolean}, right: {boolean}, bottom: {boolean}, top: {boolean} };
             * where it is possible to specify the visibility of the each border
             */
            getBorders(): any;
            /**
             * return border visual
             */
            getBorder(): geotoolkit.scene.shapes.Border;
            /**
             * set borders state
             * @param borders  (Required) borders
             * @param borders.top  (Optional) state of border on top
             * @param borders.bottom  (Optional) state of border at bottom
             * @param borders.left  (Optional) state of border on left
             * @param borders.right  (Optional) state of border on right
             */
            setBorders(borders: any | { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean; } ): this;
            /**
             * Return border style
             */
            getLineStyle(): geotoolkit.attributes.LineStyle;
            /**
             * Sets border color
             * Returns this track
             * @param lineStyle  (Required) line style or options
             * @param lineStyle.color  (Optional) line color
             * @param lineStyle.width  (Optional) line width
             * @param lineStyle.pattern  (Optional) line pattern
             * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
             */
            setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
            /**
             * Return background color
             */
            getFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Sets background fill style
             * Returns this track
             * @param fillStyle  (Required) a new fill style
             * @param fillStyle.color  (Optional) color
             * @param fillStyle.pattern  (Optional) pattern
             * @param fillStyle.foreground  (Optional) foreground color
             * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
             */
            setFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
            /**
             * render to specified context
             * @param context  (Required) Rendering Context
             */
            renderContent(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Occurs before child rendering
             * @param context  (Required) Rendering Context
             */
            preRendering(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * To be called after rendering
             * @param context  (Required) Rendering Context
             */
            postRendering(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Update state
             * @param regions  (Optional) optional array to return invalid rectangles
             * @param changes  (Optional) optional parameter to specify a reason of changes
             */
            updateState(regions?: geotoolkit.util.Rect[], changes?: geotoolkit.scene.Node.StateChanges): any;
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
             * Retrieves the world transformation
             * of the spatial.
             */
            getContentsTransform(): geotoolkit.util.Transformation;
            /**
             * Update current transformation
             */
            updateContentsTransform(): any;
            /**
             * Sets model minimum and maximum depth
             * @param minDepth  (Required) minimum depth
             * @param maxDepth  (Required) maximum depth
             */
            setDepthLimits(minDepth: number, maxDepth: number): this;
            /**
             * Returns depth range
             */
            getDepthLimits(): geotoolkit.util.Range;
            /**
             * Returns model limits
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Return log block
             */
            getBlock(): geotoolkit.welllog.LogBlock;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.borderstrategy  (Optional) border strategy
             * @param properties.bounds  (Optional) bounds of the node in the parent coordinates
             * @param properties.limits  (Optional) depth or model limits of the node? mb set parameter format to .minDepth, .maxDepth and call setDepthLimits?
             * @param properties.logblock  (Optional) log block
             * @param properties.border  (Optional) border
             * @param properties.backgroundcolor  (Optional) background color fill style
             */
            setProperties(properties: any | { borderstrategy?: geotoolkit.welllog.BorderStrategy; bounds?: geotoolkit.util.Rect; limits?: geotoolkit.util.Rect; logblock?: geotoolkit.welllog.LogBlock; border?: any; backgroundcolor?: geotoolkit.attributes.FillStyle|string|any; } ): this;
            /**
             * Specify desired layout style
             * @param layoutStyle  (Required) desired layout style
             */
            setLayoutStyle(layoutStyle: geotoolkit.layout.LayoutStyle|any): this;
            /**
             * Return desired layout style
             */
            getLayoutStyle(): geotoolkit.layout.LayoutStyle;
            /**
             * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
             */
            invalidateLayout(): this;
        }
        /**
         * Create the representation of a reference line.
         */
        class LogReferenceLine extends geotoolkit.welllog.LogPointSet {
            /**
             * Create the representation of a reference line.
             * @param value  (Optional) value in track coordinates. by default from 0 to 1.
             */
            constructor(value?: number);
            /**
             * return meaning data limits
             * @param fullLimits  (Optional) default value is false
             */
            getDataLimits(fullLimits?: boolean): geotoolkit.util.Rect|any;
            /**
             * Returns the current value
             */
            getValue(): number;
            /**
             * Sets the current value
             * @param value  (Required) value in track coordinates. by default from 0 to 1.
             */
            setValue(value: number): this;
            /**
             * Return the current level
             * @param level  (Required) level of wrap interpolation
             */
            setLevel(level: number): this;
            /**
             * Return model limits
             */
            getModelLimits(): geotoolkit.util.Rect|any;
            /**
             * Render line
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Update geometry
             * Update scaled data, set state and draw graphics
             * @param context  (Required) Rendering Context
             */
            updateGeometry(context: geotoolkit.renderer.RenderingContext): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.value  (Optional) current value in track coordinates. by default from 0 to 1.
             * @param properties.level  (Optional) current level of wrap interpolation
             */
            setProperties(properties: any | { value?: number; level?: number; } ): this;
        }
        /**
         * Creates the standard representation of a well log curve. Data is passed in a LogAbstractData.<br>
         * The LogCurve is constructed from the passed data source, then addChild() has to be used to add the curve to the track. The corresponding Line Style and interpolation type is set with helper methods.<br>
         * Several methods are also available to handle Clipping, Wrapping, Display Modes( symbols, values etc), curve limits , decimation etc.<br>
         * setMicroPosition() can be used to place log curve at a specified position of the track in horizontal direction.<br>
         * Similarly, the add/remove/get-Child() has to be used to add the track containing the curve, to the TrackContainer.
         */
        class LogCurve extends geotoolkit.welllog.LogPointSet {
            /**
             * Creates the standard representation of a well log curve. Data is passed in a LogAbstractData.<br>
             * The LogCurve is constructed from the passed data source, then addChild() has to be used to add the curve to the track. The corresponding Line Style and interpolation type is set with helper methods.<br>
             * Several methods are also available to handle Clipping, Wrapping, Display Modes( symbols, values etc), curve limits , decimation etc.<br>
             * setMicroPosition() can be used to place log curve at a specified position of the track in horizontal direction.<br>
             * Similarly, the add/remove/get-Child() has to be used to add the track containing the curve, to the TrackContainer.
             * @param data  (Optional) data source to be displayed
             * @param autoUpdate  (Optional) automatic update from data. If it sets to true then curve listens on data changes from data source.
             */
            constructor(data?: geotoolkit.welllog.data.LogAbstractData, autoUpdate?: boolean);
            /**
             * Enum of rendering optimization types
             */
            static OptimizationType: any;
            /**
             * Enum of rendering optimization types
             */
            static SymbolOptimizationType: any;
            /**
             * Enum of curve limits type
             */
            static LimitsType: any;
            /**
             * Returns the curve description
             */
            getDescription(): string;
            /**
             * Sets description of the node
             * @param description  (Optional) The node description
             */
            setDescription(description?: string): this;
            /**
             * Returns reference curve
             */
            getReferenceCurve(): geotoolkit.welllog.LogCurve;
            /**
             * Set reference curve
             * @param referenceCurve  (Required) reference curve
             */
            setReferenceCurve(referenceCurve: geotoolkit.welllog.LogCurve): this;
            /**
             * Sets symbol's skip intersection ratio
             * @param symbolSkipintersectionRatio  (Required) value to set
             */
            setSymbolSkipIntersectionRatio(symbolSkipintersectionRatio: number): this;
            /**
             * Gets symbols' skip intersection ratio
             */
            getSymbolsSkipIntersectionRatio(): number|any;
            /**
             */
            getDataLimits(): any;
            /**
             * Sets data source to be displayed.
             * @param data  (Required) data to display
             * @param resetNormalizationLimits  (Optional) resets custom normalization limits
           and take it from data. By default it is true
             * @param autoUpdate  (Optional) automatic update from data source. If it sets to true then curve listens on data changes from data source.
             */
            setData(data: geotoolkit.welllog.data.LogAbstractData, resetNormalizationLimits?: boolean, autoUpdate?: boolean): this;
            /**
             * Synchronize state from data
             * @param rect  (Optional) optional area to invalidate
             * @param args  (Optional) event arguments
             */
            updateFromData(rect?: geotoolkit.util.Rect, args?: geotoolkit.welllog.data.LogDataEvent): this;
            /**
             * Returns WellLog Data
             */
            getDataSource(): geotoolkit.welllog.data.LogAbstractData;
            /**
             * Returns whether wrapping is enabled
             */
            isWrapping(): boolean;
            /**
             * Sets whether wrapping is enabled.
             * @param wrapping  (Required) wrapping on or off, based on if you want to see the clipped part of the track or not
             */
            setWrapping(wrapping: boolean): this;
            /**
             * Sets normalization limits of the data values. The data limits are used by
             * default.
             * @param minValue  (Required) min value which can be specified for normalization
             * @param maxValue  (Optional) max value which can be specified for normalization
             */
            setNormalizationLimits(minValue: number|geotoolkit.util.Range, maxValue?: number): this;
            /**
             * Enum of step interpolation type
             */
            static ClippingType: any;
            /**
             * Default Clipping type
             */
            static DefaultClippingType: geotoolkit.welllog.LogCurve.ClippingType|string;
            /**
             * Sets Clipping limits of the data values. The data limits are used by
             * default.
             * @param minValue  (Required) This provides a way to specify min limit for clipping.
             * @param maxValue  (Required) This provides a way to specify max limit for clipping.
             * @param clippingType  (Optional) optional clipping type
             */
            setClippingLimits(minValue: number, maxValue: number, clippingType?: geotoolkit.welllog.LogCurve.ClippingType): this;
            /**
             * Returns true if clipping is enabled
             */
            isClippingEnabled(): boolean;
            /**
             * Returns true if normalization is enabled
             */
            isNormalizationEnabled(): boolean;
            /**
             * Returns true if limits are custom
             */
            isCustomLimits(): boolean;
            /**
             * Sets neat log limits
             * @param centerOnZeroOnNegativeMin  (Required) center the limits
             */
            setNeatLogLimits(centerOnZeroOnNegativeMin: boolean): this;
            /**
             * Gets the value of centerOnZeroOnNegativeMin property
             */
            getNeatLogLimits(): boolean;
            /**
             * This method resets custom normalization limits
             */
            resetNormalizationLimits(): this;
            /**
             * This method resets clipping limits
             */
            resetClippingLimits(): this;
            /**
             * Returns minimum normalization limit
             */
            getMinimumNormalizationLimit(): number;
            /**
             * Returns maximum normalization limit
             */
            getMaximumNormalizationLimit(): number;
            /**
             * Returns minimum clipping limit
             */
            getMinimumClippingLimit(): number;
            /**
             * Returns maximum clipping limit
             */
            getMaximumClippingLimit(): number;
            /**
             * Returns original data value limits
             */
            getValueDataLimits(): geotoolkit.util.Range;
            /**
             * Returns model limits
             */
            getModelLimits(): geotoolkit.util.Rect|any;
            /**
             * Update state
             * @param regions  (Optional) optional array to return invalid rectangles
             * @param changes  (Optional) optional parameter to specify a reason of changes
             */
            updateState(regions?: geotoolkit.util.Rect[], changes?: geotoolkit.scene.Node.StateChanges): this;
            /**
             * Returns interpolation type
             * ('Linear', 'MiddleStep', 'EndStep', 'StartStep')
             */
            getInterpolationType(): geotoolkit.data.DataStepInterpolation.InterpolationType;
            /**
             * Sets interpolation type
             * @param interpolationType  (Required) interpolation type
             */
            setInterpolationType(interpolationType: geotoolkit.data.DataStepInterpolation.InterpolationType|string): this;
            /**
             * Returns display mode
             * (any combination of values: 'line', 'symbol', 'value'; or an empty array)
             */
            getDisplayMode(): string[];
            /**
             * Sets display mode
             * @param t  (Required) in the new version, an array with a combination of values: 'line', 'symbol', 'value', 'bar'; or an empty array.
               In the old version, a string: 'line', 'symbol', 'both', 'bar', 'value' or 'none'
             */
            setDisplayMode(t: any[]|string): this;
            /**
             * Sets maximum count of wraps for wrap interpolation
             * @param count  (Required) count of wraps
             */
            setMaxWraps(count: number): this;
            /**
             * Returns maximum count of the wraps
             */
            getMaxWraps(): number;
            /**
             * Helper method to setup line visibility
             * @param enable  (Required) visibility of the line
             */
            setVisibleLine(enable: boolean): this;
            /**
             * Returns true if line is visible (convenience method)
             */
            isVisibleLine(): boolean;
            /**
             * Helper method to set up symbols visibility
             * @param enable  (Required) symbols visibility on or off
             */
            setVisibleSymbol(enable: boolean): this;
            /**
             * Returns true if symbols are visible (convenience method)
             */
            isVisibleSymbol(): boolean;
            /**
             * Helper method to set up values visibility.
             * @param enable  (Required) values visibility on or off
             */
            setVisibleValue(enable: boolean): this;
            /**
             * Returns true if values are visible (convenience method)
             */
            isVisibleValue(): boolean;
            /**
             * Helper method to set up value-bars visibility.
             * @param enable  (Required) value-bars visibility on or off
             */
            setVisibleBar(enable: boolean): this;
            /**
             * Returns true if value-bars are visible
             */
            isVisibleBar(): boolean;
            /**
             * Helper method to set value-bars line style.
             * @param lineStyle  (Required) line style or options
             * @param lineStyle.color  (Optional) line color
             * @param lineStyle.width  (Optional) line width
             * @param lineStyle.pattern  (Optional) line pattern
             * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
             */
            setBarLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
            /**
             * Helper method to get value-bars line style
             */
            getBarLineStyle(): geotoolkit.attributes.LineStyle;
            /**
             * Helper method to set alignment of value-bars to the right
             * @param enable  (Required) defines if value-bars right align is true or false
             */
            setBarsRightAligned(enable: boolean): this;
            /**
             * Returns true if value-bars right align is true
             */
            isBarsRightAligned(): boolean;
            /**
             * Converts data sample value to curve model value
             * @param v  (Required) data value
             * @param d  (Optional) data depth
             */
            convertDataToCurveValue(v: number, d?: number): number;
            /**
             * Set state of rendering for out of range values
             * @param outOfRangeValues  (Required) value to set
             */
            setDrawOutOfRangeValues(outOfRangeValues: boolean): this;
            /**
             * Returns true if zero is a valid value in logarithmic mode
             */
            getDrawOutOfRangeValues(): boolean;
            /**
             * Sets the value of the cutoff used for removing NaN valued samples. Gaps will only be 'filled' when the cutoff value is non zero and the unit is convertible to the index unit.
             * @param cutoff  (Required) The cutoff value. When non zero and a matching unit is set
             */
            setGapFillCutoffValue(cutoff: number): this;
            /**
             * Returns the value of the cutoff used for removing NaN valued samples
             */
            getGapFillCutoffValue(): number;
            /**
             * Set the value of the gap. Value will be used to disconnect the sample if the distance between two samples in depth or time is more than specified value
             * @param value  (Required) The maximum discontinuity allowed in depth or time
             */
            setGapValue(value: number): this;
            /**
             * Returns The maximum discontinuity allowed in depth or time
             */
            getGapValue(): number;
            /**
             * Sets the unit of the cutoff used for removing NaN valued samples. Gaps will only be 'filled'
             * when the cutoff value is non zero and the unit is convertible to the index unit. If unit is not specified
             * then curve index unit is used. if a depth or time interval is less than specified cutoff value then interval is connected and NaN
             * values between are removed.
             * @param unit  (Required) The unit or unit symbol to use for the gap fill cutoff
             */
            setGapFillCutoffUnit(unit: geotoolkit.util.AbstractUnit|string): this;
            /**
             * Returns the unit of the cutoff used for removing NaN valued samples
             */
            getGapFillCutoffUnit(): geotoolkit.util.AbstractUnit;
            /**
             * Sets the unit of the gap to show discontinuity in sample
             * when the cutoff value is non zero and the unit is convertible to the index unit. If unit is not specified
             * then curve index unit is used. if a depth or time interval is less than specified cutoff value then interval is connected and NaN
             * values between are removed.
             * @param unit  (Required) The unit
             */
            setGapUnit(unit: geotoolkit.util.AbstractUnit|string): this;
            /**
             * Returns the unit of the gap
             */
            getGapUnit(): geotoolkit.util.AbstractUnit;
            /**
             * Returns true if logarithmic mode is enabled
             */
            isLogarithmicScale(): boolean;
            /**
             * Sets logarithmic mode. This applies a log on the values themselves.
             * @param enable  (Required) logarithmic mode on or off.
             */
            setLogarithmicScale(enable: boolean): this;
            /**
             * @param optimizationType  (Required) optimization type
             */
            static convertOptimizationTypeValue(optimizationType: geotoolkit.welllog.LogCurve.OptimizationType): geotoolkit.data.OptimizedData.OptimizationType;
            /**
             * Returns scaled data
             */
            getScaledData(): geotoolkit.data.AbstractScaledData|any;
            /**
             * Returns data range
             * @param fromDepth  (Required) from depth
             * @param toDepth  (Required) to depth
             * @param transformation  (Required) transformation
             */
            getDataRange(fromDepth: number, toDepth: number, transformation: geotoolkit.util.Transformation): geotoolkit.data.AbstractScaledData;
            /**
             * Gets array of {geotoolkit.welllog.data.LogDataSample} elements within defined depth range (convenience method).
             * @param fromDepth  (Optional) start depth in the current range
             * @param toDepth  (Optional) to depth in the current range
             */
            getScaledDataRange(fromDepth?: number, toDepth?: number): any|any;
            /**
             * Sets optimization type
             * @param optimizationType  (Required) optimization type which used with current curve
             */
            setOptimizationType(optimizationType: geotoolkit.welllog.LogCurve.OptimizationType): this;
            /**
             * Turns on/off optimization for curve
             * @param needOptimize  (Optional) Is optimization for curve on
             */
            setOptimizationCurve(needOptimize?: boolean): this;
            /**
             * Returns curve optimization flag
             */
            getOptimizationCurve(): boolean;
            /**
             * Turns on/off optimization for bars
             * @param needOptimize  (Optional) Is optimization for bars on
             */
            setOptimizationBar(needOptimize?: boolean): this;
            /**
             * Returns bars optimization flag
             */
            getOptimizationBar(): boolean;
            /**
             * Sets optimization type
             * @param optimizationType  (Required) optimization type which used with current symbols
             */
            setSymbolOptimizationType(optimizationType: geotoolkit.welllog.LogCurve.SymbolOptimizationType): this;
            /**
             * Turns on/off optimization for symbols
             * @param needOptimize  (Optional) Is optimization for symbols on
             */
            setOptimizationSymbol(needOptimize?: boolean): this;
            /**
             * Returns symbol optimization flag
             */
            getOptimizationSymbol(): boolean;
            /**
             * Turns on/off optimization for values
             * @param needOptimize  (Optional) Is optimization for values on
             */
            setOptimizationValue(needOptimize?: boolean): this;
            /**
             * Returns values optimization flag
             */
            getOptimizationValue(): boolean;
            /**
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Set wrap line style handler. Custom colors can be set for different wrap levels, please refer to example below.
             * @param wrapLineStyleHandler  (Required) handler should return {@link geotoolkit.attributes.LineStyle}
             */
            setWrapLineStyleHandler(wrapLineStyleHandler: Function): this;
            /**
             * Returns wrap line style handler
             */
            getWrapLineStyleHandler(): Function;
            /**
             * Set log gradient style
             * @param gradientLineStyle  (Required) style
             */
            setGradientLineStyle(gradientLineStyle: geotoolkit.welllog.attributes.LogGradientStyle): this;
            /**
             * Returns log gradient style
             */
            getGradientLineStyle(): geotoolkit.welllog.attributes.LogGradientStyle;
            /**
             * Sets symbol to be used to render markers for null value
             * @param symbol  (Required) symbol used at the start and end of the gap(null value)
             */
            setNullValueSymbol(symbol: geotoolkit.scene.shapes.Symbol): this;
            /**
             * Returns symbol to be used to draw markers for null value
             */
            getNullValueSymbol(): geotoolkit.scene.shapes.Symbol;
            /**
             * Returns true if symbol to be used to draw markers for null value is visible
             */
            isVisibleNullValueSymbol(): boolean;
            /**
             * Display or hide null values symbols
             * @param visible  (Required) visible null value symbols
             */
            setVisibleNullValueSymbol(visible: boolean): this;
            /**
             * Sets symbol to be used to render markers
             * @param symbol  (Required) symbols to be used for markers
             */
            setSymbol(symbol: geotoolkit.scene.shapes.Symbol): this;
            /**
             * Returns symbol to be used to draw markers
             */
            getSymbol(): geotoolkit.scene.shapes.Symbol;
            /**
             * Sets symbol decimation step
             * @param step  (Required) range to skip the symbols
             */
            setSymbolDecimationStep(step: number): this;
            /**
             * Returns symbols gap
             */
            getSymbolsGap(): geotoolkit.util.Dimension;
            /**
             * Returns symbol decimation step
             */
            getSymbolDecimationStep(): number;
            /**
             * Sets micro position (0 - 1).  It allows application code to display the curve in a subarea of the track.<br>
             * By default log curve uses all space of the trace in the horizontal direction, but micro position allows to place log curve or other visual in the specified position of the track in horizontal direction.
             * See example below
             * @param left  (Required) left position
             * @param right  (Required) right position
             */
            setMicroPosition(left: number, right: number): this;
            /**
             * Returns micro position left
             */
            getMicroPositionLeft(): number;
            /**
             * Returns micro position right
             */
            getMicroPositionRight(): number;
            /**
             * Returns display unit
             */
            getDisplayUnit(): geotoolkit.util.AbstractUnit;
            /**
             * Sets display unit
             * @param unit  (Required) display unit like feet, meters etc
             */
            setDisplayUnit(unit: geotoolkit.util.AbstractUnit|string): this;
            /**
             * Returns limits type
             */
            getLimitsType(): geotoolkit.welllog.LogCurve.LimitsType|number;
            /**
             * Sets text style
             * @param textStyle  (Required) a new shape text style
             * @param textStyle.color  (Optional) text color
             * @param textStyle.baseLine  (Optional) base line.
             * @param textStyle.alignment  (Optional) alignment.
             * @param textStyle.font  (Optional) font.
             * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
             */
            setTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
            /**
             * Gets text style
             */
            getTextStyle(): geotoolkit.attributes.TextStyle;
            /**
             * Sets text anchor type
             * @param anchorType  (Required) position to place the anchor
             */
            setTextAnchorType(anchorType: geotoolkit.util.AnchorType): this;
            /**
             * Gets text anchor type
             */
            getTextAnchorType(): geotoolkit.util.AnchorType;
            /**
             * Sets text formatter to be used to convert values to texts
             * @param textFormatter  (Required) formatter to be used to convert values to texts
             */
            setTextFormatter(textFormatter: Function): this;
            /**
             * Returns text formatter to be used to convert values to texts
             */
            getTextFormatter(): Function;
            /**
             * Sets text reference.
             * Accepted values: 'track' or 'sample'.
             * @param textReference  (Required) sets textreference 'track' or 'sample'.
             */
            setTextReference(textReference: string): this;
            /**
             * Enable / disable automatic text alignment for text values, which intersects border of the track
             * If it is enabled text is shifted inside the track. By default it is false
             * @param enabled  (Required) enable automatic text alignment
             */
            setTextAutoAlignment(enabled: boolean): this;
            /**
             * Gets status if automatic text alignment is enabled for text values which intersect border of the track
             */
            getTextAutoAlignment(): boolean;
            /**
             * Gets sample's text reference type: 'track' or 'sample'
             */
            getTextReference(): string;
            /**
             * Sets text decimation step
             * @param step  (Required) range to skip while decimating
             */
            setTextDecimationStep(step: number): this;
            /**
             * Returns text decimation step
             */
            getTextDecimationStep(): number;
            /**
             * Returns clone of the object
             */
            clone(): geotoolkit.welllog.LogCurve;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.description  (Optional) The node description
             * @param properties.barlinestyle  (Optional) value-bar line style
             * @param properties.textstyle  (Optional) text style
             * @param properties.logscale  (Optional) logarithmic scale on or off
             * @param properties.textreference  (Optional) type of the text to be put on the track
             * @param properties.displayunit  (Optional) display unit
             * @param properties.displaymode  (Optional) display mode like 'line' , 'symbol'
             * @param properties.limitstype  (Optional) limits type
             * @param properties.interpolationType  (Optional) interpolation type
             * @param properties.centeronzeroonnegativemin  (Optional) flag set to center the limits
             * @param properties.symbol  (Optional) symbol to be used
             * @param properties.nullvaluesymbol  (Optional) null value symbol
             * @param properties.nullvaluesymbolvisible  (Optional) flag to change visibility of null value symbol
             * @param properties.symboldecimationstep  (Optional) symbol decimation step or level
             * @param properties.maxwraps  (Optional) maximum count of wraps (by default 5)
             * @param properties.wrapping  (Optional) flag to enable wrapping based on if you want to see the clipped part of the track or not
             * @param properties.textdecimationstep  (Optional) text decimation step
             * @param properties.gradientLineStyle  (Optional) style
             * @param properties.gapfillcutoff  (Optional) an object containing cutoff options
             * @param properties.gapfillcutoff.value  (Optional) The cutoff value. When non zero and a matching unit is set
             * @param properties.gapfillcutoff.unit  (Optional) unit The unit or unit symbol to use for the gap fill cutoff
             * @param properties.referenceCurve  (Optional) reference curve
             * @param properties.microposleft  (Optional) micropos left (between 0-1)
             * @param properties.microposright  (Optional) micropos right (between 0-1)
             * @param properties.outofrangevalues  (Optional) outofrangevalues flag
             * @param properties.optimization  (Optional) optimization flags
             * @param properties.optimization.curve  (Optional) curve optimization flag
             * @param properties.optimization.bar  (Optional) bar optimization flag
             * @param properties.optimization.symbol  (Optional) symbol optimization flag
             * @param properties.optimization.value  (Optional) value optimization flag
             */
            setProperties(properties: any | { description?: string; barlinestyle?: geotoolkit.attributes.LineStyle|string|any; textstyle?: geotoolkit.attributes.TextStyle|string|any; logscale?: boolean; textreference?: string; displayunit?: geotoolkit.util.AbstractUnit|string; displaymode?: any[]|string; limitstype?: geotoolkit.welllog.LogCurve.LimitsType; interpolationType?: geotoolkit.data.DataStepInterpolation.InterpolationType|string; centeronzeroonnegativemin?: boolean; symbol?: geotoolkit.scene.shapes.Symbol; nullvaluesymbol?: geotoolkit.scene.shapes.Symbol; nullvaluesymbolvisible?: boolean; symboldecimationstep?: number; maxwraps?: number; wrapping?: boolean; textdecimationstep?: number; gradientLineStyle?: geotoolkit.welllog.attributes.LogGradientStyle; gapfillcutoff?: any | { value?: number; unit?: geotoolkit.util.AbstractUnit|string; } ; referenceCurve?: geotoolkit.welllog.LogCurve; microposleft?: number; microposright?: number; outofrangevalues?: boolean; optimization?: any | { curve?: boolean; bar?: boolean; symbol?: boolean; value?: boolean; } |boolean; } ): this;
        }
        /**
         * Define visual to display accumulation cycles
         */
        class AccumulationCycle extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * Define visual to display accumulation cycles
             * @param data  (Optional) data source to be displayed
             */
            constructor(data?: geotoolkit.welllog.data.AccumulationCycleData);
            /**
             * Render
             * @param inputContext  (Required) Rendering Context
             */
            render(inputContext: geotoolkit.renderer.RenderingContext): any;
            /**
             * Returns Data
             */
            getDataSource(): geotoolkit.welllog.data.AccumulationCycleData;
            /**
             * Sets data source to be displayed.
             * @param data  (Required) data to display
             */
            setData(data: geotoolkit.welllog.data.AccumulationCycleData): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Synchronize state from data
             * @param rect  (Optional) optional area to invalidate track
             */
            updateFromData(rect?: geotoolkit.util.Rect): this;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             */
            setProperties(properties: any): this;
        }
        /**
         * Creates a tick curve. Data is passed in LogData.
         */
        class TickCurve extends geotoolkit.welllog.LogPointSet {
            /**
             * Creates a tick curve. Data is passed in LogData.
             * @param data  (Optional) data source to be displayed
             * @param categories  (Optional) An array of objects which contain the different categories
             * @param categories.key  (Optional) key of the category
             * @param categories.length  (Optional) length of the category
             * @param categories.linestyle  (Optional) linestyle for the tick
             * @param categories.textstyle  (Optional) textstyle for the tick
             * @param categoryCallback  (Optional) A function which accepts parameters: index, depth and value
                                     and returns a string, which corresponds to a category key
             * @param autoUpdate  (Optional) autoUpdate automatic update from data
             */
            constructor(data?: geotoolkit.welllog.data.LogAbstractData, categories?: any[]|any | { key?: string; length?: number; linestyle?: geotoolkit.attributes.LineStyle|string|any; textstyle?: geotoolkit.attributes.TextStyle|string|any; } , categoryCallback?: Function, autoUpdate?: boolean);
            /**
             * Sets data source to be displayed.
             * @param data  (Required) data to display
             * @param autoUpdate  (Optional) automatic update from data source
             */
            setData(data: geotoolkit.welllog.data.LogAbstractData, autoUpdate?: boolean): this;
            /**
             * Synchronize state from data
             * @param rect  (Optional) optional area to invalidate track
             */
            updateFromData(rect?: geotoolkit.util.Rect): this;
            /**
             * Returns WellLog Data
             */
            getDataSource(): geotoolkit.welllog.data.LogAbstractData;
            /**
             * Returns original data value limits
             */
            getValueDataLimits(): geotoolkit.util.Range;
            /**
             * Set category callback, sets the callback function to determine the category
             * of an (index, depth, value) combination
             * @param value  (Required) A function which accepts parameters: index, depth and value
                        and returns a string, which corresponds to a category key
             */
            setCategoryCallback(value: Function): this;
            /**
             * Sets  categories
             * @param categories  (Optional) An array of JSON objects which contain the different categories
             * @param categories.key  (Optional) unique key for category
             * @param categories.length  (Optional) length of the category
             * @param categories.linestyle  (Optional) linestyle for the tick
             * @param categories.textstyle  (Optional) textstyle for the tick
             */
            setCategories(categories?: any[]|any | { key?: string; length?: number; linestyle?: geotoolkit.attributes.LineStyle|string|any; textstyle?: geotoolkit.attributes.TextStyle|string|any; } ): this;
            /**
             * Get category by key
             * @param key  (Required) unique key for category
             */
            getCategory(key: string): any|any;
            /**
             * Removes a category by key
             * @param key  (Required) category style like major,medium,minor.
             */
            removeCategory(key: string): this;
            /**
             * Adds a new category or replaces an existing one with the same key
             * @param key  (Required) unique key for category
             * @param length  (Required) line length
             * @param linestyle  (Required) line style
             * @param textstyle  (Required) text style for the tick
             */
            addCategory(key: string, length: number, linestyle: geotoolkit.attributes.LineStyle|string|any, textstyle: geotoolkit.attributes.TextStyle|string|any): this;
            /**
             * Gets the array of categories
             */
            getCategories(): any;
            /**
             * Returns display mode
             * (any combination of values: "line", "symbol", "value"; or an empty array)
             */
            getDisplayMode(): string[];
            /**
             * Sets display mode
             * @param t  (Required) in the new version, an array with a combination of values: "line", "value"; or an empty array.
               In the old version, a string: "line", "both" or "none"
             */
            setDisplayMode(t: any[]|string): this;
            /**
             * Helper method to setup line visibility
             * @param enable  (Required) set visibility of line
             */
            setVisibleLine(enable: boolean): this;
            /**
             * Returns true if line is visible (convenience method)
             */
            isVisibleLine(): boolean;
            /**
             * Helper method to set up values visibility.
             * @param enable  (Required) sets up values visibility
             */
            setVisibleValue(enable: boolean): this;
            /**
             * Returns true if values are visible (convenience method)
             */
            isVisibleValue(): boolean;
            /**
             * Enables or disables adjusting of anchor for first and last text value
             * @param value  (Required) Enables or disables adjusting of anchor for first and last text value
             */
            setAdjustTopAndBottomTextAnchor(value: boolean): this;
            /**
             * Gets flag for adjusting anchor of first and last text
             */
            isAdjustTopAndBottomTextAnchor(): boolean;
            /**
             * Set text margin/distance from line in pixels
             * @param value  (Required) in device space(pixels)
             */
            setTextMargin(value: number): this;
            /**
             * Gets the text margin
             */
            getTextMargin(): number;
            /**
             * Helper method to set direction of tick lines
             * @param enable  (Required) set direction of tick lines
             */
            setTicksReversed(enable: boolean): this;
            /**
             * Returns true if tick direction is reversed
             */
            isTicksReversed(): boolean;
            /**
             * Sets the position of the reference line for the ticks
             * @param val  (Required) Number between 0 and 1
             */
            setReferenceLinePosition(val: number): this;
            /**
             * Returns the reference line position
             */
            getReferenceLinePosition(): number;
            /**
             * Sets the position of the text in relation to the ticks
             * 'true' sets the position near the start of the tick line
             * 'false' sets the position near the end of the tick line
             * @param val  (Required) sets position of the text in relation to the tick
             */
            setTextOpposite(val: boolean): this;
            /**
             * Returns true if text if positioned at the start of the tick
             */
            isTextOpposite(): boolean;
            /**
             * Sets text anchor type, only the 'top', 'bottom' and 'center' (vertical)
             * component of the anchor is used
             * @param anchorType  (Required) position to display the tick
             */
            setTextAnchorType(anchorType: geotoolkit.util.AnchorType): this;
            /**
             * Gets text anchor type
             */
            getTextAnchorType(): geotoolkit.util.AnchorType;
            /**
             * Sets text formatter to be used to convert values to texts
             * @param textFormatter  (Required) text formatter to be used to convert values to texts
             */
            setTextFormatter(textFormatter: Function): this;
            /**
             * Returns text formatter to be used to convert values to texts
             */
            getTextFormatter(): Function;
            /**
             * Sets text decimation step
             * @param step  (Required) text decimation step or level
             */
            setTextDecimationStep(step: number): this;
            /**
             * Returns text decimation step
             */
            getTextDecimationStep(): number;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.displaymode  (Optional) an array with a combination of values: "line", "value"; or an empty array.
             * @param properties.textdecimationstep  (Optional) text decimation step or level
             * @param properties.textopposite  (Optional) sets position of the text in relation to the tick
             * @param properties.ticksreversed  (Optional) set direction of tick lines
             * @param properties.textmargin  (Optional) in device space(pixels)
             * @param properties.categories  (Optional) an object containing categories see {@link geotoolkit.welllog.TickCurve#setCategories}
             */
            setProperties(properties: any | { displaymode?: any[]|string; textdecimationstep?: number; textopposite?: boolean; ticksreversed?: boolean; textmargin?: number; categories?: any; } ): this;
        }
        /**
         * Creates a LogBar visual. Data is passed in an LogData.
         */
        class LogBarVisual extends geotoolkit.welllog.LogPointSet {
            /**
             * Creates a LogBar visual. Data is passed in an LogData.
             * @param options  (Required) The log bar visual options object.
             * @param options.data  (Optional) data source to be displayed
             * @param options.autoUpdate  (Optional) Whether to automatically update from data
             * @param options.barSpacing  (Optional) The amount of space between adjacent bars
             * @param options.barWidth  (Optional) The width of each bar
             * @param options.unitType  (Optional) The type of unit for bar width and bar spacing.
             * @param options.lineStyle  (Optional) The line style.
             * @param options.fillStyle  (Optional) The fill style.
             * @param options.enableAutoLimits  (Optional) Whether the limits should be automatically calculated
             * @param options.limits  (Optional) The value limits that should be used if autoLimits is disabled
             */
            constructor(options: any | { data?: geotoolkit.welllog.data.LogAbstractData; autoUpdate?: boolean; barSpacing?: number; barWidth?: number|number[]; unitType?: geotoolkit.util.AbstractUnit; lineStyle?: geotoolkit.attributes.LineStyle|string|any; fillStyle?: geotoolkit.attributes.FillStyle|string|any; enableAutoLimits?: boolean; limits?: geotoolkit.util.Range; } );
            /**
             * Gets the flag which indicates whether auto value limits are enabled.
             */
            getEnableAutoLimits(): boolean;
            /**
             * Sets the flag which indicates whether auto value limits are enabled.
             * @param enableAutoLimits  (Required) The autoLimits flag.
             */
            setEnableAutoLimits(enableAutoLimits: boolean): this;
            /**
             * Gets the value limits
             */
            getLimits(): geotoolkit.util.Range;
            /**
             * Sets the manual value limits
             * @param limits  (Required) The value limits.
             */
            setLimits(limits: geotoolkit.util.Range): this;
            /**
             * Sets data source to be displayed.
             * @param data  (Required) data to display
             * @param autoUpdate  (Optional) automatic update from data source
             */
            setData(data: geotoolkit.welllog.data.LogAbstractData|geotoolkit.welllog.data.LogAbstractData[], autoUpdate?: boolean): this;
            /**
             * Returns WellLog Data
             */
            getDataSource(): geotoolkit.welllog.data.LogAbstractData;
            /**
             * Returns true if logarithmic mode is enabled
             */
            isLogarithmicScale(): boolean;
            /**
             * Sets logarithmic mode
             * @param enable  (Required) defines state of logarithmic mode
             */
            setLogarithmicScale(enable: boolean): this;
            /**
             * Sets the amount of space between adjacent bars.
             * @param barSpacing  (Required) The amount of space between adjacent bars.
             */
            setBarSpacing(barSpacing: number): this;
            /**
             * Gets the amount of space between adjacent bars.
             */
            getBarSpacing(): number;
            /**
             * Sets the width of each bar
             * @param barWidth  (Required) The width of each bar
             */
            setBarWidth(barWidth: number|number[]): this;
            /**
             * Gets the width of each bar.
             */
            getBarWidth(): number;
            /**
             * Sets the depth unit
             * @param unit  (Required) The type of unit for bar width and bar spacing.
             */
            setUnit(unit: geotoolkit.util.AbstractUnit): this;
            /**
             * Gets the depth unit
             */
            getUnit(): geotoolkit.util.AbstractUnit;
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
             * Gets the fill style
             */
            getFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Gets the auto update flag
             */
            getAutoUpdate(): boolean;
            /**
             * Sets the auto update flag
             * @param autoUpdate  (Required) Flag that determines whether to automatically update from data.
             */
            setAutoUpdate(autoUpdate: boolean): this;
            /**
             * Synchronize state from data
             * @param rect  (Optional) optional area to invalidate track
             */
            updateFromData(rect?: geotoolkit.util.Rect): this;
            /**
             * Returns meaning data limits
             * @param fullLimits  (Optional) default value is false
             */
            getDataLimits(fullLimits?: boolean): geotoolkit.util.Rect|any;
            /**
             * Returns original data value limits
             */
            getValueDataLimits(): geotoolkit.util.Range;
            /**
             * Returns model limits
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Update state
             * @param regions  (Optional) optional array to return invalid rectangles
             */
            updateState(regions?: geotoolkit.util.Rect[]): this;
            /**
             * Perform the rendering
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Creates a clone of this LogBarVisual.
             */
            clone(): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.autoupdate  (Optional) Flag that determines whether to automatically update from data.
             * @param properties.barspacing  (Optional) The amount of space between adjacent bars.
             * @param properties.barwidth  (Optional) The width of each bar
             * @param properties.unit  (Optional) The type of unit for bar width and bar spacing.
             * @param properties.fillstyle  (Optional) fill style
             * @param properties.enableautolimits  (Optional) The autoLimits flag.
             * @param properties.limits  (Optional) The value limits.
             */
            setProperties(properties: any | { autoupdate?: boolean; barspacing?: number; barwidth?: number|number[]; unit?: geotoolkit.util.AbstractUnit; fillstyle?: geotoolkit.attributes.FillStyle|string|any; enableautolimits?: boolean; limits?: geotoolkit.util.Range; } ): this;
        }
        /**
         * Creates the standard representation of a discrete well log curve. Data is passed in a LogAbstractData.
         */
        class LogDiscreteCurve extends geotoolkit.welllog.LogPointSet {
            /**
             * Creates the standard representation of a discrete well log curve. Data is passed in a LogAbstractData.
             * @param data  (Optional) data source to be displayed
             * @param autoUpdate  (Optional) automatic update from data
             */
            constructor(data?: geotoolkit.welllog.data.LogAbstractData, autoUpdate?: boolean);
            /**
             * fill type
             */
            static FillType: any;
            /**
             * Sets data source to be displayed
             * @param data  (Required) data to display
             * @param autoUpdate  (Optional) automatic update from data source
             */
            setData(data: geotoolkit.welllog.data.LogAbstractData, autoUpdate?: boolean): this;
            /**
             * Sets fill mode
             * @param type  (Required) data mode or fill type
             * @param mappingFunc  (Optional) a mapping function to adjust native values
             */
            setFillType(type: geotoolkit.welllog.LogDiscreteCurve.FillType, mappingFunc?: Function): this;
            /**
             * Returns fill type
             */
            getFillType(): geotoolkit.welllog.LogDiscreteCurve.FillType;
            /**
             * Returns unique categories
             */
            getCategories(): number[];
            /**
             * Sets fill info.  Each code has an associated pair of values and a fill style
             * @param fillInfo  (Required) An object contains a gradient color provider with type ColorProvider, or fill information for other types.
             * @param fillInfo.type  (Required) the Fill type
             * @param fillInfo.codes  (Optional) code value for each section
             * @param fillInfo.ranges  (Optional) range to color or fill
             * @param fillInfo.names  (Optional) fill name for the section
             * @param fillInfo.fillstyles  (Optional) the fill style
             * @param fillInfo.colorprovider  (Optional) the color provider
             * @param fillInfo.defaultfillstyle  (Optional) the default fill style for uncovered values
             */
            setFillInfo(fillInfo: any | { type?: geotoolkit.welllog.LogDiscreteCurve.FillType; codes?: number[]; ranges?: number[]; names?: string[]; fillstyles?: (geotoolkit.attributes.FillStyle|any|string)[]; colorprovider?: geotoolkit.util.DiscreteGradientColorProvider; defaultfillstyle?: geotoolkit.attributes.FillStyle|string|any; } ): this;
            /**
             * Returns code info
             */
            getFillInfo(): any;
            /**
             * Returns welllog data
             */
            getDataSource(): geotoolkit.welllog.data.LogAbstractData;
            /**
             * Returns minimum value
             */
            getMinValue(): number;
            /**
             * Returns maximum value
             */
            getMaxValue(): number;
            /**
             * Sets line visibility
             * @param visible  (Required) line visibility
             */
            setVisibleSeparateLine(visible: boolean): this;
            /**
             * Returns line visibility
             */
            isVisibleSeparateLine(): boolean;
            /**
             * Sets text visibility
             * @param visible  (Required) sets the visibility of the text along the track for each block on or off
             */
            setVisibleText(visible: boolean): this;
            /**
             * Returns text visibility
             */
            isVisibleText(): boolean;
            /**
             * Sets display mode
             * @param mode  (Required) an array with a combination of values: "line" and "text"
             */
            setDisplayMode(mode: string[]|string): this;
            /**
             * Returns display mode
             * (any combination of values: "line" and "text", or an empty array)
             */
            getDisplayMode(): string[];
            /**
             * Sets text style
             * @param textStyle  (Required) a new shape text style
             * @param textStyle.color  (Optional) text color
             * @param textStyle.baseLine  (Optional) base line.
             * @param textStyle.alignment  (Optional) alignment.
             * @param textStyle.font  (Optional) font.
             * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
             */
            setTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
            /**
             * Returns text style
             */
            getTextStyle(): geotoolkit.attributes.TextStyle;
            /**
             * Sets text position
             * @param position  (Required) position of the text
             */
            setTextPosition(position: geotoolkit.util.AnchorType): this;
            /**
             * Returns text position
             */
            getTextPosition(): geotoolkit.util.AnchorType;
            /**
             */
            getModelLimits(): any;
            /**
             * Returns text orientation
             */
            getTextOrientation(): geotoolkit.util.Orientation;
            /**
             * Sets text orientation
             * @param orientation  (Required) orientation of the text
             */
            setTextOrientation(orientation: geotoolkit.util.Orientation): this;
            /**
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             */
            getDataLimits(): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.displaymode  (Optional) an array with a combination of values: "line" and "text"
             * @param properties.fillinfo  (Optional) see setFillInfo
             * @param properties.filltype  (Optional) the type of the filling
             * @param properties.textstyle  (Optional) the text style
             * @param properties.textposition  (Optional) position of the text
             * @param properties.interpolationtype  (Optional) the type of the interpolation
             * @param properties.textorientation  (Optional) orientation of the text
             */
            setProperties(properties: any | { displaymode?: string[]|string; fillinfo?: any; filltype?: geotoolkit.welllog.LogDiscreteCurve.FillType; textstyle?: geotoolkit.attributes.TextStyle|string|any; textposition?: geotoolkit.util.AnchorType; interpolationtype?: geotoolkit.data.DataStepInterpolation.InterpolationType; textorientation?: geotoolkit.util.Orientation; } ): this;
        }
        /**
         * Creates a logtadpole using the dataobject that contains a datasource for the depth and dip values {@link geotoolkit.welllog.data.LogData}  and symbols{@link geotoolkit.welllog.TadPoleSymbol}.<br>
         * It also contains arrays for symbol types (string), symbol fillStyle (geotoolkit.attributes.FillStyle) and lineStyle (geotoolkit.attributes.LineStyle).<br>
         * Finally it contains arrays for ticks azimuths (arrays of number), lengths (arrays of number) and lineStyles (arrays of geotoolkit.attributes.LineStyle)
         * A tadpole is associated with one or several ticks and defined by a depth, a dip, and a TadpoleSymbol. <br>
         * User has to first create a track and then add LogTadPole to it. see example below.
         */
        class LogTadPole extends geotoolkit.welllog.LogCurve {
            /**
             * Creates a logtadpole using the dataobject that contains a datasource for the depth and dip values {@link geotoolkit.welllog.data.LogData}  and symbols{@link geotoolkit.welllog.TadPoleSymbol}.<br>
             * It also contains arrays for symbol types (string), symbol fillStyle (geotoolkit.attributes.FillStyle) and lineStyle (geotoolkit.attributes.LineStyle).<br>
             * Finally it contains arrays for ticks azimuths (arrays of number), lengths (arrays of number) and lineStyles (arrays of geotoolkit.attributes.LineStyle)
             * A tadpole is associated with one or several ticks and defined by a depth, a dip, and a TadpoleSymbol. <br>
             * User has to first create a track and then add LogTadPole to it. see example below.
             * @param datasource  (Required) 
             * @param datasource.datasource  (Required) data source to be displayed
             * @param datasource.symbols  (Optional) symbols to be displayed
             * @param symbols  (Optional) symbols to be displayed
             */
            constructor(datasource: any | { datasource?: geotoolkit.welllog.data.LogData; symbols?: geotoolkit.welllog.TadPoleSymbol[]; } |geotoolkit.welllog.data.LogData, symbols?: geotoolkit.welllog.TadPoleSymbol[]);
            /**
             * Draw symbols
             * @param context  (Required) Rendering Context
             * @param tr  (Required) transformation
             * @param deviceRect  (Required) invalid area
             */
            drawSymbols(context: geotoolkit.renderer.RenderingContext, tr: geotoolkit.util.Transformation, deviceRect: geotoolkit.util.Rect): any;
        }
        /**
         * Creates a tadpole, which is a symbol associated with one or several ticks.
         */
        class TadPoleSymbol extends geotoolkit.scene.shapes.Symbol {
            /**
             * Creates a tadpole, which is a symbol associated with one or several ticks.
             * @param ax  (Required) anchor x position
             * @param ay  (Required) anchor y position
             * @param width  (Required) symbol width
             * @param height  (Required) symbol height
             * @param alignment  (Optional) anchor type of symbol
             * @param sizeIsInDeviceSpace  (Optional) flag to indicate if size of the symbol in device
             * @param centerSymbol  (Optional) center symbol to be used
             * @param legs  (Optional) line element associated with the tadpole symbol.
             */
            constructor(ax: number, ay: number, width: number, height: number, alignment?: geotoolkit.util.AnchorType, sizeIsInDeviceSpace?: number, centerSymbol?: geotoolkit.scene.shapes.Symbol, legs?: any[]);
            /**
             * Specify rotations angle
             * @param angle  (Required) angle
             */
            setAngle(angle: number): this;
            /**
             * Return rotation angle
             */
            getAngle(): number;
            /**
             * Set symbol
             * @param centerSymbol  (Required) center symbol to be used
             */
            setSymbol(centerSymbol: geotoolkit.scene.shapes.Symbol): this;
            /**
             * Set Legs
             * @param legs  (Required) line element associated with the symbol
             */
            setLegs(legs: any[]): this;
            /**
             * Get symbol
             */
            getSymbol(): geotoolkit.scene.shapes.Symbol;
            /**
             * Get Legs
             */
            getLegs(): any[];
            /**
             * Add Leg
             * @param angle  (Required) in [0-2PI]
             * @param length  (Required) length of the leg
             * @param linestyle  (Optional) line style of the leg
             */
            addLeg(angle: number, length: number, linestyle?: geotoolkit.attributes.LineStyle|string|any): geotoolkit.scene.shapes.Symbol;
        }
        /**
         * LogFill class implements a fill between two LogPointSet.<br>
         * <br>
         * Those LogPointSet are generally either LogCurves or LogReferenceLine.<br>
         * The LogFill accepts 3 fillstyles, 'default', 'left' and 'right'.<br>
         * FillType can be one of the following types.<br>
         * 1) Left <br>
         * 2) Right <br>
         * 3) Left and Right(Dual left and right with different fill styles or Single which only has one fill style) please refer to the example below.
         * The given FillType will determine which fillstyles should be applied to each area in between given LogPointSet.<br>
         * If no FillType is specified the internal logic will assign the fillType based on the fillStyle.
         * It is recommended to pass both curve1 and curve2 parameters (even if the internal logic will try to fill missing parameters).<br>
         * <br>
         */
        class LogFill extends geotoolkit.welllog.LogPointSet {
            /**
             * LogFill class implements a fill between two LogPointSet.<br>
             * <br>
             * Those LogPointSet are generally either LogCurves or LogReferenceLine.<br>
             * The LogFill accepts 3 fillstyles, 'default', 'left' and 'right'.<br>
             * FillType can be one of the following types.<br>
             * 1) Left <br>
             * 2) Right <br>
             * 3) Left and Right(Dual left and right with different fill styles or Single which only has one fill style) please refer to the example below.
             * The given FillType will determine which fillstyles should be applied to each area in between given LogPointSet.<br>
             * If no FillType is specified the internal logic will assign the fillType based on the fillStyle.
             * It is recommended to pass both curve1 and curve2 parameters (even if the internal logic will try to fill missing parameters).<br>
             * <br>
             * @param options  (Optional) left points set or a JSON
             * @param options.curve2  (Optional) right point set
             * @param options.fillstyle  (Optional) fillstyle
             * @param options.leftfillstyle  (Optional) fillstyle for left part
             * @param options.rightfillstyle  (Optional) fillstyle for right part
             * @param options.filltype  (Optional) filltype
             * @param curve2  (Optional) right point set
             * @param fillstyle  (Optional) fillstyle
             * @param leftfillstyle  (Optional) fillstyle for left part
             * @param rightfillstyle  (Optional) fillstyle for right part
             * @param filltype  (Optional) filltype
             */
            constructor(options?: geotoolkit.welllog.LogPointSet|any | { curve2?: geotoolkit.welllog.LogPointSet|number; fillstyle?: geotoolkit.attributes.FillStyle|string|any; leftfillstyle?: geotoolkit.attributes.FillStyle|string|any; rightfillstyle?: geotoolkit.attributes.FillStyle|string|any; filltype?: geotoolkit.welllog.LogFill.FillType|string; } |number, curve2?: geotoolkit.welllog.LogPointSet|number, fillstyle?: geotoolkit.attributes.FillStyle|string|any, leftfillstyle?: geotoolkit.attributes.FillStyle|string|any, rightfillstyle?: geotoolkit.attributes.FillStyle|string|any, filltype?: geotoolkit.welllog.LogFill.FillType|string);
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.welllog.LogFill): this;
            /**
             * Enum of FillTypes
             */
            static FillType: any;
            /**
             * Sets point set to fill from
             * @param curve  (Required) a point set or number to fill from
             */
            setCurve1(curve: geotoolkit.welllog.LogPointSet|number): this;
            /**
             * Returns a point set to fill from
             */
            getCurve1(): geotoolkit.welllog.LogPointSet;
            /**
             * Sets point set to fill to
             * @param curve  (Required) a point set or number to fill to
             */
            setCurve2(curve: geotoolkit.welllog.LogPointSet|number): this;
            /**
             * Returns a point set to fill to
             */
            getCurve2(): geotoolkit.welllog.LogPointSet;
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
             * Return fill style
             */
            getFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Sets negative fill style
             * @param fillStyle  (Required) a new fill style
             * @param fillStyle.color  (Optional) color
             * @param fillStyle.pattern  (Optional) pattern
             * @param fillStyle.foreground  (Optional) foreground color
             * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
             */
            setNegativeFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
            /**
             * Sets right (negative) fill style
             * @param fillStyle  (Required) a new fill style
             * @param fillStyle.color  (Optional) color
             * @param fillStyle.pattern  (Optional) pattern
             * @param fillStyle.foreground  (Optional) foreground color
             * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
             */
            setRightFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
            /**
             * Returns fill style to be used to fill negative areas
             */
            getNegativeFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Returns fill style to be used to fill right (negative) areas
             */
            getRightFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Sets positive fill style
             * @param fillStyle  (Required) a new fill style
             * @param fillStyle.color  (Optional) color
             * @param fillStyle.pattern  (Optional) pattern
             * @param fillStyle.foreground  (Optional) foreground color
             * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
             */
            setPositiveFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
            /**
             * Sets left (positive) fill style
             * @param fillStyle  (Required) a new fill style
             * @param fillStyle.color  (Optional) color
             * @param fillStyle.pattern  (Optional) pattern
             * @param fillStyle.foreground  (Optional) foreground color
             * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
             */
            setLeftFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
            /**
             * Returns fill style to be used to fill positive areas
             */
            getPositiveFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Returns fill style to be used to fill left (positive) areas
             */
            getLeftFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * return meaning data limits
             * @param fullLimits  (Optional) default value is false
             */
            getDataLimits(fullLimits?: boolean): geotoolkit.util.Rect|any;
            /**
             * Gets bounds
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Gets the fill type
             */
            getFillType(): geotoolkit.welllog.LogFill.FillType;
            /**
             * Sets the fill type
             * @param fillType  (Required) enum of filltype
             */
            setFillType(fillType: geotoolkit.welllog.LogFill.FillType|string): this;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.curve1  (Optional) a curve to fill from
             * @param properties.curve2  (Optional) a point set to fill to
             * @param properties.fillstyle  (Optional) fillstyle
             * @param properties.negativefillstyle  (Optional) fill style to be used to fill negative areas
             * @param properties.positivefillstyle  (Optional) fill style to be used to positive areas
             * @param properties.filltype  (Optional) enum of filltype
             */
            setProperties(properties: any | { curve1?: geotoolkit.welllog.LogPointSet; curve2?: geotoolkit.welllog.LogPointSet; fillstyle?: geotoolkit.attributes.FillStyle|string|any; negativefillstyle?: geotoolkit.attributes.FillStyle|string|any; positivefillstyle?: geotoolkit.attributes.FillStyle|string|any; filltype?: geotoolkit.welllog.LogFill.FillType|string; } ): this;
        }
        /**
         * Creates the custom representation of a well log curve with optional left and right fill. Data is passed in an LogAbstractData.
         * It uses geotoolkit.welllog.LogCurve internally. Please refer to WellLog Widget Visuals Tutorial ( Composite curve fill section) for an example.
         */
        class CompositeLogCurve extends geotoolkit.welllog.LogCurve {
            /**
             * Creates the custom representation of a well log curve with optional left and right fill. Data is passed in an LogAbstractData.
             * It uses geotoolkit.welllog.LogCurve internally. Please refer to WellLog Widget Visuals Tutorial ( Composite curve fill section) for an example.
             * @param data  (Optional) data source to be displayed
             * @param autoUpdate  (Optional) automatic update form data
             */
            constructor(data?: geotoolkit.welllog.data.LogAbstractData, autoUpdate?: boolean);
            /**
             * Returns clone of the object
             */
            clone(): geotoolkit.welllog.CompositeLogCurve;
            /**
             * @param event  (Required) broadcast event
             * @param source  (Required) who is initializing this event
             * @param args  (Required) additional parameter
             */
            notify(event: string, source: geotoolkit.scene.Node, args: any): any;
            /**
             * Return curve bounds
             */
            getBounds(): geotoolkit.util.Rect|any;
            /**
             * Return left fill
             */
            getLeftFill(): any|geotoolkit.welllog.LogFill;
            /**
             * Return right fill
             */
            getRightFill(): any|geotoolkit.welllog.LogFill;
            /**
             * Sets reference point set
             */
            getLeftReferencePointSet(): any|geotoolkit.welllog.LogPointSet;
            /**
             * returns the reference point set
             */
            getRightReferencePointSet(): any|geotoolkit.welllog.LogPointSet;
            /**
             * returns the left fill type
             */
            getLeftFillType(): string;
            /**
             * returns the right fill type
             */
            getRightFillType(): string;
            /**
             * Sets reference point set to fill to the left
             * @param reference  (Required) reference point set
             */
            setLeftReferencePointSet(reference: geotoolkit.welllog.LogPointSet): this;
            /**
             * Sets reference point set to fill to the right
             * @param reference  (Required) reference point set
             */
            setRightReferencePointSet(reference: geotoolkit.welllog.LogPointSet): this;
            /**
             * Sets fill type
             * @param type  (Required) type of the fill
             */
            setLeftFillType(type: geotoolkit.welllog.LogFill.FillType|string): this;
            /**
             * Sets fill type
             * @param type  (Required) type of the fill
             */
            setRightFillType(type: geotoolkit.welllog.LogFill.FillType|string): this;
            /**
             * @param context  (Required) rendering context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets left fill
             * @param fill  (Required) left fill
             */
            protected setLeftFill(fill: geotoolkit.welllog.LogFill): this;
            /**
             * Sets right fill
             * @param fill  (Required) right fill
             */
            protected setRightFill(fill: geotoolkit.welllog.LogFill): this;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.leftfill  (Optional) left fill
             * @param properties.rightfill  (Optional) right fill
             * @param properties.leftfilltype  (Optional) type of the left fill
             * @param properties.rightfilltype  (Optional) type of the right fill
             * @param properties.leftreferencepointset  (Optional) left referencepointset point set
             * @param properties.rightreferencepointset  (Optional) right referencepointset point set
             */
            setProperties(properties: any | { leftfill?: geotoolkit.welllog.LogFill; rightfill?: geotoolkit.welllog.LogFill; leftfilltype?: geotoolkit.welllog.LogFill.FillType|string; rightfilltype?: geotoolkit.welllog.LogFill.FillType|string; leftreferencepointset?: geotoolkit.welllog.LogPointSet; rightreferencepointset?: geotoolkit.welllog.LogPointSet; } ): this;
        }
        /**
         * Define frame visual with bounds
         */
        class LogFrameVisual extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * Define frame visual with bounds
             * @param bounds  (Required) bounds of the visual
             */
            constructor(bounds: geotoolkit.util.Rect);
            /**
             * Enables height of the frame to be fixed in
             * the device coordinates
             * @param enable  (Required) Enables height of the frame to be fixed in the device coordinates
             */
            setFixedHeight(enable: boolean): this;
            /**
             * Returns true if height is fixed in the device coordinates
             */
            isFixedHeight(): boolean;
            /**
             * Checks culling
             * Returns true if object is inside of renderable area
             * @param context  (Required) Rendering Context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
            /**
             * Returns calculated bounds
             * @param context  (Optional) Rendering Context
             */
            getBounds(context?: geotoolkit.renderer.RenderingContext): geotoolkit.util.Rect;
            /**
             * Return fill style
             */
            getFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Sets fill style
             * @param fillStyle  (Required) a new fill style
             * @param fillStyle.color  (Optional) color
             * @param fillStyle.pattern  (Optional) pattern
             * @param fillStyle.foreground  (Optional) foreground color
             * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
             */
            setFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
            /**
             * Sets rectangle geometry
             * @param rect  (Required) Sets rectangle geometry based on bounds of the visual
             */
            setRect(rect: geotoolkit.util.Rect): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.bounds  (Optional) Sets rectangle geometry based on bounds of the visual
             * @param properties.fillstyle  (Optional) FillStyle
             * @param properties.fixedheight  (Optional) Enables height of the frame to be fixed in the device coordinates
             */
            setProperties(properties: any | { bounds?: geotoolkit.util.Rect; fillstyle?: geotoolkit.attributes.FillStyle|string|any; fixedheight?: boolean; } ): this;
        }
        /**
         * Defines annotation visual.
         * It is defined by a string and a rectangle to set its bounds.
         */
        class LogAnnotation extends geotoolkit.welllog.LogFrameVisual {
            /**
             * Defines annotation visual.
             * It is defined by a string and a rectangle to set its bounds.
             * @param bounds  (Required) bounds of the visual
             * @param text  (Required) the text to be displayed
             */
            constructor(bounds: geotoolkit.util.Rect, text: string);
            /**
             * LogAnnotation TextOrientation
             */
            static TextOrientation: any;
            /**
             * Sets text
             * @param text  (Required) text to be displayed
             */
            setText(text: string): this;
            /**
             * Returns the current text
             */
            getText(): string;
            /**
             * Sets text orientation. if text orientation is regular then text follows the widgets orientation
             * if text is rotated then text is always rotated on 90 degree.
             * @param orientation  (Required) text orientation
             */
            setTextOrientation(orientation: geotoolkit.welllog.LogAnnotation.TextOrientation): this;
            /**
             * Return text orientation
             */
            getTextOrientation(): geotoolkit.welllog.LogAnnotation.TextOrientation;
            /**
             * Sets text style
             * @param textStyle  (Required) a new shape text style
             * @param textStyle.color  (Optional) text color
             * @param textStyle.baseLine  (Optional) base line.
             * @param textStyle.alignment  (Optional) alignment.
             * @param textStyle.font  (Optional) font.
             * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
             */
            setTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
            /**
             * Returns text style
             */
            getTextStyle(): geotoolkit.attributes.TextStyle;
            /**
             * Sets text padding
             * @param padding  (Optional) It has properties for specifying the padding for each side
             * @param padding.top  (Optional) top padding in pixels
             * @param padding.bottom  (Optional) top padding  in pixels
             * @param padding.right  (Optional) right padding  in pixels
             * @param padding.left  (Optional) left padding  in pixels
             */
            setPadding(padding?: any | { top?: number; bottom?: number; right?: number; left?: number; } ): this;
            /**
             * Return text padding
             */
            getPadding(): {padding:{top:number;bottom:number;right:number;left:number}}|any;
            /**
             * Set auto height flag
             * @param enable  (Required) flag
             */
            setAutoHeight(enable: boolean): this;
            /**
             * Returns auto height flag
             */
            getAutoHeight(): boolean;
            /**
             * Sets how text size is computed
             * @param textSizeMode  (Required) Enum of size modes
             */
            setTextSizeMode(textSizeMode: geotoolkit.scene.shapes.Text.SizeMode|string): this;
            /**
             * Returns how the size is computed
             */
            getTextSizeMode(): geotoolkit.scene.shapes.Text.SizeMode|string;
            /**
             * Set show ellipsis
             * @param showTextEllipsis  (Required) 
             */
            setShowEllipsis(showTextEllipsis: boolean): this;
            /**
             * Returns ellipsis flag
             */
            getShowEllipsis(): boolean;
            /**
             * Returns calculated bounds
             * @param context  (Optional) Rendering Context
             */
            getBounds(context?: geotoolkit.renderer.RenderingContext): geotoolkit.util.Rect;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.text  (Optional) text to be displayed
             * @param properties.textstyle  (Optional) the style of the text
             * @param properties.textsizemode  (Optional) Enum of size modes
             * @param properties.textellipsis  (Optional) text ellipsis
             * @param properties.textorientation  (Optional) text orientation
             * @param properties.padding  (Optional) It has properties for specifying the padding for each side see {@link geotoolkit.welllog.LogAnnotation#setPadding}
             * @param properties.autoheight  (Optional) auto height flag
             */
            setProperties(properties: any | { text?: string; textstyle?: geotoolkit.attributes.TextStyle|string|any; textsizemode?: geotoolkit.scene.shapes.Text.SizeMode|string; textellipsis?: boolean; textorientation?: geotoolkit.welllog.LogAnnotation.TextOrientation; padding?: any; autoheight?: boolean; } ): this;
        }
        /**
         * Create a log label (LogAnnotation)
         */
        class LogLabel extends geotoolkit.welllog.LogAnnotation {
            /**
             * Create a log label (LogAnnotation)
             * @param bounds  (Required) bounds of the visual
             * @param text  (Required) text
             */
            constructor(bounds: geotoolkit.util.Rect, text: string);
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             */
            setProperties(properties: any): this;
        }
        /**
         * Welllog Lithology is a visual that fills a pattern between a set of depth ranges and two reference lines defined by {@link geotoolkit.welllog.LogPointSet}<br>
         * Users can define their own patterns for lithology fills.
         */
        class LogLithology extends geotoolkit.welllog.LogFill {
            /**
             * Welllog Lithology is a visual that fills a pattern between a set of depth ranges and two reference lines defined by {@link geotoolkit.welllog.LogPointSet}<br>
             * Users can define their own patterns for lithology fills.
             * @param depths  (Optional) an array of the depths
             * @param depths.depths  (Optional) an array of the depths
             * @param depths.left  (Optional) left points set
             * @param depths.right  (Optional) right point set
             * @param depths.fillstyles  (Optional) fill styles
             * @param depths.text  (Optional) name of the lithology
             * @param depths.names  (Optional) array of the names
             * @param depths.titles  (Optional) array for the header titles
             * @param depths.linetypes  (Optional) array for the line type
             * @param depths.labelfillmode  (Optional) mode for how to back the name text
             * @param depths.labelfillstyle  (Optional) label fill style used if mode is set to SINGLECOLOR
             * @param depths.nameorientation  (Optional) lithology name orientation
             * @param depths.textellipsis  (Optional) ellipsis flag
             * @param depths.textsizemode  (Optional) Enum of size modes
             * @param curve1  (Optional) left points set
             * @param curve2  (Optional) right point set
             * @param fillstyles  (Optional) fill styles
             * @param names  (Optional) array of the names
             * @param titles  (Optional) array for the header titles
             * @param labelfillstyle  (Optional) label fill style used if mode is set to SINGLECOLOR
             * @param labelfillmode  (Optional) mode for how to back the name text
             * @param nameorientation  (Optional) lithology name orientation
             */
            constructor(depths?: number[]|any | { depths?: any[]|any; left?: geotoolkit.welllog.LogPointSet; right?: geotoolkit.welllog.LogPointSet; fillstyles?: geotoolkit.attributes.FillStyle[]; text?: string; names?: string[]; titles?: string[]; linetypes?: geotoolkit.welllog.LogLithology.LineType[]; labelfillmode?: geotoolkit.welllog.LogLithology.LabelFillMode; labelfillstyle?: geotoolkit.attributes.FillStyle|string|any; nameorientation?: geotoolkit.welllog.LogLithology.NameOrientation; textellipsis?: boolean; textsizemode?: geotoolkit.scene.shapes.Text.SizeMode|string; } , curve1?: geotoolkit.welllog.LogPointSet, curve2?: geotoolkit.welllog.LogPointSet, fillstyles?: (geotoolkit.attributes.FillStyle|string|any)[], names?: string[], titles?: string[], labelfillstyle?: geotoolkit.attributes.FillStyle|string|any, labelfillmode?: geotoolkit.welllog.LogLithology.LabelFillMode, nameorientation?: geotoolkit.welllog.LogLithology.NameOrientation);
            /**
             * LogLithology LineType
             */
            static LineType: any;
            /**
             * LogLithology Label Fill Mode
             */
            static LabelFillMode: any;
            /**
             * Sets how text size is computed
             * @param textSizeMode  (Required) Enum of size modes
             */
            setTextSizeMode(textSizeMode: geotoolkit.scene.shapes.Text.SizeMode|string): this;
            /**
             * Returns how the size is computed
             */
            getTextSizeMode(): geotoolkit.scene.shapes.Text.SizeMode|string;
            /**
             * Set show ellipsis
             * @param showTextEllipsis  (Required) show ellipses
             */
            setShowEllipsis(showTextEllipsis: boolean): this;
            /**
             * Returns ellipsis flag
             */
            getShowEllipsis(): boolean;
            /**
             * sets the label fill style used if the mode is set to SINGLECOLOR
             * @param fillstyle  (Required) label fill style
             */
            setLabelFillStyle(fillstyle: geotoolkit.attributes.FillStyle|string|any): this;
            /**
             * Returns label fill style used if the mode is set to SINGLECOLOR
             */
            getLabelFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * LogLithology NameOrientation
             */
            static NameOrientation: any;
            /**
             * Sets lithology names
             * @param names  (Required) lithology names
             */
            setNames(names: string[]): this;
            /**
             * Returns lithology names
             */
            getNames(): string[];
            /**
             * Sets lithology titles
             * @param titles  (Required) track header titles
             */
            setTitles(titles: string[]): this;
            /**
             * Returns lithology titles
             */
            getTitles(): string[];
            /**
             * Sets lithology patterns
             * @param patterns  (Required) lithology patterns
             */
            setPatterns(patterns: geotoolkit.attributes.ImagePattern[]): this;
            /**
             * Returns lithology patterns
             */
            getPatterns(): geotoolkit.attributes.ImagePattern[];
            /**
             * Sets text backing mode
             * @param mode  (Required) Label fill mode
             */
            setLabelFillMode(mode: geotoolkit.welllog.LogLithology.LabelFillMode): this;
            /**
             * Returns Label fill mode
             */
            getLabelFillMode(): geotoolkit.welllog.LogLithology.LabelFillMode;
            /**
             * Sets lithology fillColors
             * @param fillColors  (Required) lithology fillColors
             */
            setFillColors(fillColors: any[]): this;
            /**
             * Return lithology colors
             */
            getFillColors(): any[];
            /**
             * Returns array of fillstyles
             */
            getFillStyles(): geotoolkit.attributes.FillStyle[];
            /**
             * Sets lithology line types
             * @param lineTypes  (Optional) array for the line type
             */
            setLineTypes(lineTypes?: geotoolkit.welllog.LogLithology.LineType[]): this;
            /**
             * Return Lithology Line Types
             */
            getLineTypes(): geotoolkit.welllog.LogLithology.LineType[];
            /**
             * Sets array of fillstyles
             * @param fillStyles  (Required) array of fillstyles
             */
            setFillStyles(fillStyles: geotoolkit.attributes.FillStyle[]): this;
            /**
             * Sets depths intervals
             * @param depths  (Required) depths intervals
             */
            setDepths(depths: number[]): this;
            /**
             * Returns depths
             */
            getDepths(): number[];
            /**
             * Returns a bounds
             */
            getBounds(): geotoolkit.util.Rect|any;
            /**
             * Return text style
             */
            getTextStyle(): geotoolkit.attributes.TextStyle;
            /**
             * Sets text style
             * @param textStyle  (Required) a new shape text style
             * @param textStyle.color  (Optional) text color
             * @param textStyle.baseLine  (Optional) base line.
             * @param textStyle.alignment  (Optional) alignment.
             * @param textStyle.font  (Optional) font.
             * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
             */
            setTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
            /**
             * Returns fill style
             */
            getFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Sets a fill style for a specific type
             */
            getFillStyleByType(): geotoolkit.attributes.FillStyle;
            /**
             * Sets text
             * @param text  (Required) Sets text to be displayed
             */
            setText(text: string): this;
            /**
             * Returns text
             */
            getText(): string;
            /**
             * Return minimum height for label
             */
            getMinHeightForLabel(): number;
            /**
             * Sets minimum height for label
             * @param min  (Required) min height for label ( used to decide when to turn off display of label)
             */
            setMinHeightForLabel(min: number): this;
            /**
             * Check collision
             * @param context  (Required) Rendering Context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
            /**
             * Render
             * @param inputContext  (Required) Rendering Context
             */
            render(inputContext: geotoolkit.renderer.RenderingContext): any;
            /**
             * Render
             * @param inputContext  (Required) Rendering Context
             */
            drawFill(inputContext: geotoolkit.renderer.RenderingContext): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.minheightforlabel  (Optional) min height where display of label can be turned off
             * @param properties.depths  (Optional) depths intervals
             * @param properties.textstyle  (Optional) the text style
             * @param properties.linestyle  (Optional) the line style
             * @param properties.fillstyles  (Optional) the fill styles
             * @param properties.text  (Optional) lithology names
             * @param properties.names  (Optional) lithology names
             * @param properties.titles  (Optional) track header titles
             * @param properties.labelfillmode  (Optional) the label fill mode
             * @param properties.labelfillstyle  (Optional) the fill style used for mode SINGLECOLOR
             * @param properties.nameorientation  (Optional) lithology name orientation
             */
            setProperties(properties: any | { minheightforlabel?: number; depths?: number[]; textstyle?: geotoolkit.attributes.TextStyle|string|any; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyles?: (geotoolkit.attributes.FillStyle|string|any)[]; text?: string[]; names?: string[]; titles?: string[]; labelfillmode?: geotoolkit.welllog.LogLithology.LabelFillMode; labelfillstyle?: geotoolkit.attributes.FillStyle|string|any; nameorientation?: geotoolkit.welllog.LogLithology.NameOrientation; } ): this;
        }
        /**
         * A Welllog marker implementation.<br>
         * This shape is a horizontal line meant to be used in a LogTrack to highlight a specific depth.
         * It holds two labels (depth and name) that can be displayed or not.<br>
         * Note that this is not related to the WelllogWidget builtin markers and that this implementation is a <b>per track</b> marker.
         * So it will display a line only in its track. However a marker can be added on the entire Track Container as well.
         */
        class LogMarker extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * A Welllog marker implementation.<br>
             * This shape is a horizontal line meant to be used in a LogTrack to highlight a specific depth.
             * It holds two labels (depth and name) that can be displayed or not.<br>
             * Note that this is not related to the WelllogWidget builtin markers and that this implementation is a <b>per track</b> marker.
             * So it will display a line only in its track. However a marker can be added on the entire Track Container as well.
             * @param depth  (Required) depth of the marker
             * @param nameLabel  (Required) name label on the marker
             * @param depthLabel  (Optional) optional label for depth
             * @param horizontalTextOffset  (Optional) horizontal label offset in device space
             * @param verticalTextOffset  (Optional) vertical label offset in device space
             */
            constructor(depth: number, nameLabel: string, depthLabel?: string, horizontalTextOffset?: number, verticalTextOffset?: number);
            /**
             * Sets vertical label offset in device space
             * @param offset  (Required) offset
             */
            setVerticalTextOffset(offset: number): this;
            /**
             * Sets horizontal label offset in device space
             * @param offset  (Required) offset
             */
            setHorizontalTextOffset(offset: number): this;
            /**
             * Gets vertical label offset in device space
             */
            getVerticalTextOffset(): number;
            /**
             * Gets horizontal label offset in device space
             */
            getHorizontalTextOffset(): number;
            /**
             * Specify name label visible or not.
             * @param visible  (Required) name label visible or not.
             */
            setVisibleNameLabel(visible: boolean): this;
            /**
             * Return true if name label is visible. It is visible by default.
             */
            isVisibleNameLabel(): boolean;
            /**
             * Specify depth label visible or not.
             * @param visible  (Required) specifies if depth label visible or not
             */
            setVisibleDepthLabel(visible: boolean): this;
            /**
             * Return true if depth label is visible. It is visible by default.
             */
            isVisibleDepthLabel(): boolean;
            /**
             * Specify border name visible or not.
             * @param visible  (Required) border name visible or not.
             */
            setVisibleNameBorder(visible: boolean): this;
            /**
             * Return true if Name label border is visible. It is visible by default.
             */
            isVisibleNameBorder(): boolean;
            /**
             * Specify depth label border visible or not.
             * @param visible  (Required) depth label border visible or not
             */
            setVisibleDepthBorder(visible: boolean): this;
            /**
             * Return true if depth label border is visible. It is visible by default.
             */
            isVisibleDepthBorder(): boolean;
            /**
             * Specify name label fill style enabled or not.
             * @param enable  (Required) name label fill style enabled or not.
             */
            setFillNameLabel(enable: boolean): this;
            /**
             * Return true if name label fill style enabled. It is enabled by default.
             */
            isFillNameLabel(): boolean;
            /**
             * Specify depth label fill style enabled or not.
             * @param enable  (Required) depth label fill style enabled or not
             */
            setFillDepthLabel(enable: boolean): this;
            /**
             * Return true if depth label fill style enabled. It is enabled by default.
             */
            isFillDepthLabel(): boolean;
            /**
             * Specify fill style for both name and depth labels.
             * @param fillStyle  (Required) fill style for both name and depth labels.
             * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
             */
            setFillStyle(fillStyle: geotoolkit.attributes.FillStyle|string|any, merge?: boolean): this;
            /**
             * Return fill style of name label
             */
            getFillStyleName(): geotoolkit.attributes.FillStyle;
            /**
             * Sets fill style of name label
             * @param fillStyle  (Required) a new fill style
             * @param fillStyle.color  (Optional) color
             * @param fillStyle.pattern  (Optional) pattern
             * @param fillStyle.foreground  (Optional) foreground color
             * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
             */
            setFillStyleName(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
            /**
             * Return fill style of depth label
             */
            getFillStyleDepth(): geotoolkit.attributes.FillStyle;
            /**
             * Sets fill style of depth label
             * @param fillStyle  (Required) a new fill style
             * @param fillStyle.color  (Optional) color
             * @param fillStyle.pattern  (Optional) pattern
             * @param fillStyle.foreground  (Optional) foreground color
             * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
             */
            setFillStyleDepth(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
            /**
             * Return text style
             */
            getTextStyle(): geotoolkit.attributes.TextStyle;
            /**
             * Sets text style
             * @param textStyle  (Required) text style
             */
            setTextStyle(textStyle: geotoolkit.attributes.TextStyle|string|any): this;
            /**
             * specify the orientation of text
             * @param orientation  (Required) fixed orientation of text, null value means orientation determined by widget's rotation
             */
            setTextOrientation(orientation: geotoolkit.util.Orientation|any): this;
            /**
             * return orientation of text
             */
            getTextOrientation(): geotoolkit.util.Orientation;
            /**
             * @param localContext  (Required) context
             * @param nameLabelRect  (Required) bounds for name label
             * @param depthLabelRect  (Required) bounds for depth label
             */
            protected drawMarker(localContext: geotoolkit.renderer.RenderingContext, nameLabelRect: geotoolkit.util.Rect, depthLabelRect: geotoolkit.util.Rect): any;
            /**
             * for internal use only, make text always readable
             * @param context  (Required) rendering context
             * @param x  (Required) x position to place text
             * @param y  (Required) y position to place text
             * @param text  (Required) text to be displayed
             * @param style  (Required) text style
             * @param alignment  (Required) alignment for placement of text
             * @param theta  (Optional) angle of rotation
             */
            drawText(context: geotoolkit.renderer.RenderingContext, x: number, y: number, text: string, style: geotoolkit.attributes.TextStyle, alignment: geotoolkit.util.AnchorType, theta?: number): any;
            /**
             * Sets marker
             * @param depth  (Required) depth to place marker
             * @param displayNameLabel  (Optional) name label
             * @param displayDepthLabel  (Optional) depth label
             */
            setDepthValue(depth: number, displayNameLabel?: string|any, displayDepthLabel?: string|any): this;
            /**
             * Sets name to be displayed
             * @param nameLabel  (Required) name to be displayed
             */
            setNameLabel(nameLabel: string): this;
            /**
             * Returns name to be displayed
             */
            getNameLabel(): string;
            /**
             * Sets depth value to be displayed
             * @param depthLabel  (Required) name to be displayed
             */
            setDepthLabel(depthLabel: string): this;
            /**
             * Returns depth label to be displayed
             */
            getDepthLabel(): string;
            /**
             * Set depth
             * @param depth  (Required) depth to place marker
             */
            setDepth(depth: number): this;
            /**
             * Return depth
             */
            getDepth(): number;
            /**
             * Verifies if object is within given context.
             * @param context  (Required) Rendering Context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
            /**
             * Return model limits
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * return meaning depth limits
             */
            getMeaningDepthLimits(): geotoolkit.util.Range;
            /**
             * Return model limits
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Gets contents transform.
             * Returns null
             */
            getContentsTransform(): geotoolkit.util.Transformation;
            /**
             * Return name label position as an anchor point
             */
            getNameLabelPosition(): geotoolkit.util.AnchorType;
            /**
             * Set label position
             * @param anchorPoint  (Required) label position
             */
            setNameLabelPosition(anchorPoint: geotoolkit.util.AnchorType): this;
            /**
             * Return depth label position as an anchor point
             */
            getDepthLabelPosition(): geotoolkit.util.AnchorType;
            /**
             * Set depth label position
             * @param anchorPoint  (Required) label position
             */
            setDepthLabelPosition(anchorPoint: geotoolkit.util.AnchorType): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.depth  (Optional) depth to place marker
             * @param properties.displaynamelabel  (Optional) name label
             * @param properties.displaydepthlabel  (Optional) depth label
             * @param properties.textstyle  (Optional) The TextStyle
             * @param properties.fillstyle  (Optional) The Fill Style for name and depth
             * @param properties.fillstylename  (Optional) The Fill Style name
             * @param properties.fillstyledepth  (Optional) The Fill Style depth
             * @param properties.visiblenamelabel  (Optional) display name label or not
             * @param properties.visibledepthlabel  (Optional) display depth label or not
             * @param properties.visiblenameborder  (Optional) display name border or not
             * @param properties.visibledepthborder  (Optional) display depth border or not
             * @param properties.fillnamelabel  (Optional) display fill name label or not
             * @param properties.filldepthlabel  (Optional) display fill depth label or not
             * @param properties.depthlabelposition  (Optional) depth label position
             * @param properties.namelabelposition  (Optional) name label position
             * @param properties.textorientation  (Optional) orientation of text
             * @param properties.verticaltextoffset  (Optional) vertical text offset
             * @param properties.horizontaltextoffset  (Optional) horizontal text offset
             */
            setProperties(properties: any | { depth?: number; displaynamelabel?: string; displaydepthlabel?: string; textstyle?: geotoolkit.attributes.TextStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; fillstylename?: geotoolkit.attributes.FillStyle|string|any; fillstyledepth?: geotoolkit.attributes.FillStyle|string|any; visiblenamelabel?: boolean; visibledepthlabel?: boolean; visiblenameborder?: boolean; visibledepthborder?: boolean; fillnamelabel?: boolean; filldepthlabel?: boolean; depthlabelposition?: geotoolkit.util.AnchorType; namelabelposition?: geotoolkit.util.AnchorType; textorientation?: geotoolkit.util.Orientation|any; verticaltextoffset?: number; horizontaltextoffset?: number; } ): this;
        }
        /**
         * Creates custom marker visual using th eoverlapping markers and {@link geotoolkit.layout.ILayout1D}.
         */
        class MarkerSet extends geotoolkit.scene.CompositeNode {
            /**
             * Creates custom marker visual using th eoverlapping markers and {@link geotoolkit.layout.ILayout1D}.
             * @param options  (Optional) markerset options. See {@link geotoolkit.welllog.MarkerSet.html#setProperties} setProperties() for details
             * @param options.layout  (Optional) markers layout
             * @param options.showoverlappedlabels  (Optional) show overlapped labels
             * @param options.visiblenamelabel  (Optional) visible name label
             * @param options.visibledepthlabel  (Optional) visible depth label
             * @param options.namelabelposition  (Optional) name label anchor
             * @param options.depthlabelposition  (Optional) depth label anchor
             * @param options.visiblenameborder  (Optional) visible name border
             * @param options.visibledepthborder  (Optional) visible depth border
             */
            constructor(options?: any | { layout?: geotoolkit.layout.ILayout1D; showoverlappedlabels?: boolean; visiblenamelabel?: boolean; visibledepthlabel?: boolean; namelabelposition?: geotoolkit.util.AnchorType; depthlabelposition?: geotoolkit.util.AnchorType; visiblenameborder?: boolean; visibledepthborder?: boolean; } );
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.layout  (Optional) markers layout
             * @param properties.showoverlappedlabels  (Optional) show overlapped labels
             * @param properties.visiblenamelabel  (Optional) visible name label
             * @param properties.visibledepthlabel  (Optional) visible depth label
             * @param properties.namelabelposition  (Optional) name label anchor
             * @param properties.depthlabelposition  (Optional) depth label anchor
             * @param properties.visiblenameborder  (Optional) visible name border
             * @param properties.visibledepthborder  (Optional) visible depth border
             */
            setProperties(properties: any | { layout?: geotoolkit.layout.ILayout1D; showoverlappedlabels?: boolean; visiblenamelabel?: boolean; visibledepthlabel?: boolean; namelabelposition?: geotoolkit.util.AnchorType; depthlabelposition?: geotoolkit.util.AnchorType; visiblenameborder?: boolean; visibledepthborder?: boolean; } ): this;
            /**
             * Specify border name visible or not.
             * @param visible  (Required) border name visible or not.
             */
            setVisibleNameBorder(visible: boolean): this;
            /**
             * Return true if Name label border is visible. It is visible by default.
             */
            isVisibleNameBorder(): boolean;
            /**
             * Specify depth label border visible or not.
             * @param visible  (Required) depth label border visible or not
             */
            setVisibleDepthBorder(visible: boolean): this;
            /**
             * Return true if depth label border is visible. It is visible by default.
             */
            isVisibleDepthBorder(): boolean;
            /**
             * Specify name label visible or not.
             * @param visible  (Required) name label visible or not.
             */
            setVisibleNameLabel(visible: boolean): this;
            /**
             * Return true if name label is visible. It is visible by default.
             */
            isVisibleNameLabel(): boolean;
            /**
             * Specify depth label visible or not.
             * @param visible  (Required) specifies if depth label visible or not
             */
            setVisibleDepthLabel(visible: boolean): this;
            /**
             * Return true if depth label is visible. It is visible by default.
             */
            isVisibleDepthLabel(): boolean;
            /**
             * Return name label position as an anchor point
             */
            getNameLabelPosition(): geotoolkit.util.AnchorType;
            /**
             * Set label position
             * @param anchorPoint  (Required) label position
             */
            setNameLabelPosition(anchorPoint: geotoolkit.util.AnchorType): this;
            /**
             * Return depth label position as an anchor point
             */
            getDepthLabelPosition(): geotoolkit.util.AnchorType;
            /**
             * Set depth label position
             * @param anchorPoint  (Required) label position
             */
            setDepthLabelPosition(anchorPoint: geotoolkit.util.AnchorType): this;
            /**
             * Remove marker or array of markers
             * @param marker  (Required) marker(s) to remove
             */
            removeChild(marker: geotoolkit.welllog.LogMarker|geotoolkit.welllog.LogMarker[]): this;
            /**
             * Add marker or array of markers
             * @param marker  (Required) marker(s) to add
             */
            addChild(marker: geotoolkit.welllog.LogMarker|geotoolkit.welllog.LogMarker[]|geotoolkit.util.Iterator): this;
            /**
             * Returns parent model limits
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Returns parent visible model limits
             */
            getVisibleModelLimits(): geotoolkit.util.Rect;
            /**
             * Verifies if object is within given context.
             * @param context  (Required) Rendering Context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
        }
        /**
         * LogCurveMarker object can renders symbol in position of the last/latest depth and value of the curve provided.
         */
        class LogCurveMarker extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * LogCurveMarker object can renders symbol in position of the last/latest depth and value of the curve provided.
             * @param curve  (Required) a curve to draw markers
             */
            constructor(curve: geotoolkit.welllog.LogCurve);
            /**
             * Returns curve
             */
            getCurve(): geotoolkit.welllog.LogCurve;
            /**
             * Returns symbol
             */
            getSymbol(): geotoolkit.scene.shapes.Symbol;
            /**
             * Sets symbol
             * @param symbol  (Required) used for points along the curve
             */
            setSymbol(symbol: geotoolkit.scene.shapes.Symbol): this;
            /**
             * Returns model limits
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Returns bound in the parent coordinates
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Mark this marker to be updated.
             */
            updateState(): this;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Retrieves the world transformation of the spatial.
             */
            getContentsTransform(): any;
            /**
             * Returns false
             */
            isSelectable(): boolean;
            /**
             * set marker indexes
             * @param indexes  (Required) array of numbers with marker indexes
             */
            setIndexes(indexes: number[]): this;
            /**
             * Draw symbols
             * @param gr  (Required) RenderingContext
             * @param tr  (Required) Transformation of symbols
             * @param deviceRect  (Required) invalid area of the device
             */
            drawSymbols(gr: geotoolkit.renderer.RenderingContext, tr: geotoolkit.util.Transformation, deviceRect: geotoolkit.util.Rect): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.indexes  (Optional) array of numbers with marker indexes
             * @param properties.symbol  (Optional) symbol used for points along the curve
             * @param properties.curve  (Optional) The curve value.
             */
            setProperties(properties: any | { indexes?: number[]; symbol?: geotoolkit.scene.shapes.Symbol; curve?: number; } ): this;
        }
        /**
         * Defines a 2D log visual. Data is passed in an Log2DVisualData containing rows of Log2DDataRow.
         * This visual is added to a log track to be displayed. <br>
         * Log2DVisual visual can be used to display FMI logs (Acoustic/Optic borehole imaging) or  density logs.<br>
         * It requires to provide column base data for each depth. The provided data is organized as a table: a collection of rows and columns inside the row.<br>
         * You can specify your values as in vertical or horizontal or both directions.<br>
         * 
         * Please refer to tutorial Log2D Visual in Welllog.
         */
        class Log2DVisual extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * Defines a 2D log visual. Data is passed in an Log2DVisualData containing rows of Log2DDataRow.
             * This visual is added to a log track to be displayed. <br>
             * Log2DVisual visual can be used to display FMI logs (Acoustic/Optic borehole imaging) or  density logs.<br>
             * It requires to provide column base data for each depth. The provided data is organized as a table: a collection of rows and columns inside the row.<br>
             * You can specify your values as in vertical or horizontal or both directions.<br>
             * 
             * Please refer to tutorial Log2D Visual in Welllog.
             * @param data  (Optional) instance of log2data
             * @param autoUpdate  (Optional) automatic update from data source
             */
            constructor(data?: geotoolkit.welllog.data.ArrayLogAbstractData, autoUpdate?: boolean);
            /**
             * Enum of column alignment types
             */
            static ColumnAlignment: any;
            /**
             * Enum of interpolation types
             */
            static InterpolationType: any;
            /**
             * Enum of plotMode modes
             */
            static PlotTypes: any;
            /**
             * Returns type of interpolation for rows values
             */
            getRowsInterpolation(): geotoolkit.welllog.Log2DVisual.InterpolationType;
            /**
             * Set type of interpolation for rows values
             * @param interpolation  (Required) specify a type of interpolation between rows
             */
            setRowsInterpolation(interpolation: geotoolkit.welllog.Log2DVisual.InterpolationType): this;
            /**
             * Set wrap interpolation
             * @param wrapInterpolation  (Required) type of the wrap interpolation to specify how to process the edge values
             */
            setWrapInterpolation(wrapInterpolation: boolean): this;
            /**
             * Return wrap interpolation
             */
            getWrapInterpolation(): boolean;
            /**
             * Set interpolation alignment
             * @param alignment  (Required) alignment of column
             */
            setAlignment(alignment: geotoolkit.welllog.Log2DVisual.ColumnAlignment): this;
            /**
             * Return interpolation alignment
             */
            getAlignment(): geotoolkit.welllog.Log2DVisual.ColumnAlignment;
            /**
             * Sets data
             * @param data  (Required) instance of log2data
             * @param autoUpdate  (Optional) automatic update from data source
             */
            setData(data: geotoolkit.welllog.data.ArrayLogAbstractData, autoUpdate?: boolean): this;
            /**
             * Returns bounds in the parent coordinates
             */
            getBounds(): geotoolkit.util.Rect|any;
            /**
             * @param fullLimits  (Optional) flag to return a full depth limits or mining depth limits without null values
             */
            getDataLimits(fullLimits?: boolean): geotoolkit.util.Rect|any;
            /**
             * Returns micro position left
             */
            getMicroPositionLeft(): number;
            /**
             * Returns micro position right
             */
            getMicroPositionRight(): number;
            /**
             * Returns minimum normalization limit --  Depreciated : now read from the colorprovider
             */
            getMinimumNormalizationLimit(): number;
            /**
             * Returns maximum normalization limit  --  Deprecated : now read from the colorprovider
             */
            getMaximumNormalizationLimit(): number;
            /**
             * Sets limits in the track. Setting it to 0, 1 will
             * fill the whole width of the track. -- Deprecated : now use @link {geotoolkit.welllog.Log2DVisual.setMicroPosition}
             * @param left  (Required) left limit of the track to display
             * @param right  (Required) right limit of the track to display
             */
            setLimits(left: number, right: number): this;
            /**
             * Sets micro position (0 - 1) . It allows application code to display the curve in a subarea of the track.
             * @param left  (Required) left position
             * @param right  (Required) right position
             */
            setMicroPosition(left: number, right: number): this;
            /**
             * Enable / disable usage limits from data. By default automatic limit is disabled
             * @param enable  (Required) enable or disable usage data limits
             */
            setAutoAnglesLimits(enable: boolean): this;
            /**
             * Returns the status of the auto angle limits
             */
            getAutoAnglesLimits(): boolean;
            /**
             * Sets angles limits of the data. By default it is from 0 to 2*PI
             * @param left  (Required) left angle in radians
             * @param right  (Required) right angle in radians
             */
            setAnglesLimits(left: number, right: number): this;
            /**
             * Returns angle limits
             */
            getAnglesLimits(): geotoolkit.util.Range;
            /**
             * Returns data
             */
            getData(): geotoolkit.welllog.data.ArrayLogAbstractData;
            /**
             * Sets color provider
             * @param colorProvider  (Required) the color provider
             */
            setColorProvider(colorProvider: geotoolkit.util.ColorProvider): this;
            /**
             * Gets color provider
             */
            getColorProvider(): geotoolkit.util.ColorProvider;
            /**
             * Sets Plot type to specify linear o step interpolation of values in columns
             * <p>
             * In linear interpolation mode it interpolates value from the previous column to the end of the current column
             * and the first column is ignored, which can be represented as end of the sector if consider each column as a sector.
             * if it is necessary to start from beginning of the sector or in the middle then you can specify offset equal to
             * the first column angle or
             * the half the first column angle.
             * </p>
             * @param mode  (Required) plot types (step plot mode or linear plot mode) to be used for interpolation
             */
            setPlotType(mode: geotoolkit.welllog.Log2DVisual.PlotTypes|string): this;
            /**
             * Gets plot type
             */
            getPlotType(): geotoolkit.welllog.Log2DVisual.PlotTypes|string;
            /**
             * Sets the offset of data
             * @param offsets  (Required) array of the same size as data set
             */
            setOffsets(offsets: number[]|number|any): this;
            /**
             * Returns the offset of data
             */
            getOffsets(): number[]|number;
            /**
             * Returns minimum depth of the data set
             */
            getMinDepth(): number;
            /**
             * Returns maximum depth of the data set
             */
            getMaxDepth(): number;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.colorprovider  (Optional) color provider
             * @param properties.plotmode  (Optional) plot mode
             * @param properties.minvalue  (Optional) deprecated (since 2.6) min value
             * @param properties.maxvalue  (Optional) deprecated (since 2.6) max value
             * @param properties.minangle  (Optional) min angle
             * @param properties.maxangle  (Optional) max angle
             * @param properties.microposleft  (Optional) left micro position
             * @param properties.microposright  (Optional) right micro position
             * @param properties.autoanglelimits  (Optional) auto angle model limits
             * @param properties.wrapinterpolation  (Optional) type of the wrap interpolation to specify how to process the edge values
             * @param properties.rowsinterpolation  (Optional) specify a type of interpolation between rows
             * @param properties.offsets  (Optional) offsets
             */
            setProperties(properties: any | { colorprovider?: any|geotoolkit.util.ColorProvider; plotmode?: geotoolkit.welllog.Log2DVisual.PlotTypes|string; minvalue?: number; maxvalue?: number; minangle?: number; maxangle?: number; microposleft?: number; microposright?: number; autoanglelimits?: boolean; wrapinterpolation?: boolean; rowsinterpolation?: geotoolkit.welllog.Log2DVisual.InterpolationType; offsets?: number[]; } ): this;
            /**
             * Update state.
             * @param regions  (Optional) optional array to return invalid rectangles
             * @param changes  (Optional) optional parameter to specify a reason of changes
             */
            updateState(regions?: geotoolkit.util.Rect[], changes?: geotoolkit.scene.Node.StateChanges): this;
        }
        /**
         * Defines a raster log visual which loads image by tiles using tile provider and maps them
         * to different intervals
         */
        class RasterLog extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * Defines a raster log visual which loads image by tiles using tile provider and maps them
             * to different intervals
             * @param options  (Optional) options
             * @param options.mapping  (Optional) array of mapping
             * @param options.imagesize  (Optional) image size
             * @param options.provider  (Optional) tile provider
             */
            constructor(options?: any | { mapping?: {src: geotoolkit.util.Rect, dst: geotoolkit.util.Rect}[]; imagesize?: geotoolkit.util.Rect; provider?: geotoolkit.scene.shapes.tiledshape.AbstractTileSource; } );
            /**
             * Sets mapping
             * @param mapping  (Optional) array of mapping
             */
            setMapping(mapping?: {src: geotoolkit.util.Rect, dst: geotoolkit.util.Rect}[]): this;
            /**
             */
            getMapping(): {src: geotoolkit.util.Rect, dst: geotoolkit.util.Rect}[];
            /**
             * Sets image options
             * @param options  (Required) image options
             * @param options.provider  (Optional) tile provider
             * @param options.imagesize  (Optional) image size
             */
            setImageOptions(options: any | { provider?: geotoolkit.scene.shapes.tiledshape.AbstractTileSource; imagesize?: geotoolkit.util.Rect; } ): this;
            /**
             * Recalculate limits if mapping is changed
             */
            updateLimits(): any;
            /**
             * Render raster log visual
             * @param context  (Required) rendering context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Return image position and depth position by device position
             * @param pt  (Required) position in device
             */
            getImagePosition(pt: geotoolkit.util.Point): {info:{depth:number;value:number;imageX:number;imageY:number}}|any;
            /**
             * Return bounds
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Returns minimum depth
             */
            getMinDepth(): number;
            /**
             * Returns maximum depth
             */
            getMaxDepth(): number;
            /**
             */
            getDataLimits(): any;
        }
        /**
         * Creates the standard representation of a well log axis. It can be added to the track and a tickgenerator like {@link geotoolkit.welllog.axis.DateTimeTickGenerator} can be assigned to it based on the trajectory data.
         */
        class LogAxis extends geotoolkit.axis.Axis {
            /**
             * Creates the standard representation of a well log axis. It can be added to the track and a tickgenerator like {@link geotoolkit.welllog.axis.DateTimeTickGenerator} can be assigned to it based on the trajectory data.
             * @param tg  (Optional) axis tick generator
             */
            constructor(tg?: geotoolkit.axis.TickGenerator);
            /**
             * Returns a parent log track
             */
            getTrack(): geotoolkit.welllog.LogTrack;
            /**
             * Render
             * @param context  (Required) RenderingContext
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Enum of axis tick positions
             */
            static TitleAlignment: any;
            /**
             * Get title alignment
             */
            getTitleAlignment(): geotoolkit.welllog.LogAxis.TitleAlignment;
            /**
             * Set title alignment
             * @param titleAlignment  (Required) title alignment
             */
            setTitleAlignment(titleAlignment: geotoolkit.welllog.LogAxis.TitleAlignment): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.title  (Optional) JSON object container - Generated
             * @param properties.title.alignment  (Optional) title alignment
             */
            setProperties(properties: any | { title?: any | { alignment?: geotoolkit.welllog.LogAxis.TitleAlignment; } ; } ): this;
        }
        /**
         * Create horizontal depth grid.
         */
        class LogHorizontalGrid extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * Create horizontal depth grid.
             * @param tickGenerator  (Optional) The algorithm used to generate lines along the grid(default is adaptive tick generator)
             */
            constructor(tickGenerator?: geotoolkit.axis.TickGenerator);
            /**
             * Sets the new tick generator
             * @param tickGenerator  (Required) The algorithm used to generate lines along the grid(default is adaptive tick generator)
             */
            setTickGenerator(tickGenerator: geotoolkit.axis.TickGenerator): this;
            /**
             * Gets the current tick generator
             */
            getTickGenerator(): geotoolkit.axis.TickGenerator;
            /**
             * Sets minor line style. This method does the same as setMinorLineStyle.
             * This line style is used if the tick generator is not set otherwise the
             * tick generator style is used.
             * @param lineStyle  (Required) line style or options
             * @param lineStyle.color  (Optional) line color
             * @param lineStyle.width  (Optional) line width
             * @param lineStyle.pattern  (Optional) line pattern
             * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
             */
            setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
            /**
             * Returns the minor line style
             */
            getLineStyle(): geotoolkit.attributes.LineStyle;
            /**
             * Returns the minor line style
             */
            getMinorLineStyle(): geotoolkit.attributes.LineStyle;
            /**
             * Sets minor line style This line style is used if the tick generator is
             * not set otherwise the tick generator style is used.
             * @param lineStyle  (Required) line style or options
             * @param lineStyle.color  (Optional) line color
             * @param lineStyle.width  (Optional) line width
             * @param lineStyle.pattern  (Optional) line pattern
             * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
             */
            setMinorLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
            /**
             * Returns the major line style
             */
            getMajorLineStyle(): geotoolkit.attributes.LineStyle;
            /**
             * Sets major line style This line style is used if the tick generator is
             * not set otherwise the tick generator style is used.
             * @param lineStyle  (Required) line style or options
             * @param lineStyle.color  (Optional) line color
             * @param lineStyle.width  (Optional) line width
             * @param lineStyle.pattern  (Optional) line pattern
             * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
             */
            setMajorLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
            /**
             * return meaning data limits
             * @param fullLimits  (Optional) default value is false
             */
            getDataLimits(fullLimits?: boolean): geotoolkit.util.Rect|any;
            /**
             * Gets track model limits
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Update state
             */
            updateState(): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.minorlinestyle  (Optional) minor line style
             * @param properties.majorlinestyle  (Optional) major line style
             * @param properties.tickgenerator  (Optional) The algorithm to generate lines along the grid
             */
            setProperties(properties: any | { minorlinestyle?: geotoolkit.attributes.LineStyle|string|any; majorlinestyle?: geotoolkit.attributes.LineStyle|string|any; tickgenerator?: geotoolkit.axis.TickGenerator; } ): this;
        }
        /**
         * Create the standard representation of a well linear value grid.
         */
        class LogLinearValueGrid extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * Create the standard representation of a well linear value grid.
             * @param linesCount  (Optional) number of lines by default 10
             */
            constructor(linesCount?: number);
            /**
             * Return counts line
             */
            getLinesCount(): number;
            /**
             * Sets lines count
             * @param linesCount  (Required) number of lines to display
             */
            setLinesCount(linesCount: number): this;
            /**
             * return meaning data limits
             * @param fullLimits  (Optional) default value is false
             */
            getDataLimits(fullLimits?: boolean): geotoolkit.util.Rect|any;
            /**
             * Return bound in the parent coordinates
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Sets bounds of the curve in the parent coordinates
             * @param bounds  (Required) bounds or position of the visual
             */
            setBounds(bounds: geotoolkit.util.Rect): this;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Put grid inside track (to avoid clipping)
             * @param inside  (Required) default is false
             */
            setInsideTrack(inside: boolean): this;
            /**
             * Get grid state, is it inside track or not
             */
            isInsideTrack(): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.linescount  (Optional) number of lines to display
             */
            setProperties(properties: any | { linescount?: number; } ): this;
        }
        /**
         * Create a logarithmic value grid where you can specify a count of decades as shown in example
         */
        class LogLog10ValueGrid extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * Create a logarithmic value grid where you can specify a count of decades as shown in example
             * @param decadeCount  (Required) number of decades to be displayed or options object
             * @param decadeCount.decadecount  (Optional) number of decades to be displayed
             * @param decadeCount.logstart  (Optional) left limits of log grid
             * @param decadeCount.logstop  (Optional) right limits of log grid
             * @param decadeCount.intermediate  (Optional) enables or disables display of minor lines in the grid
             * @param decadeCount.logbase  (Optional) a logarithm base
             * @param decadeCount.reverse  (Optional) enables or disables reverse direction
             * @param intermediate  (Optional) enables or disables display of minor lines in the grid
             */
            constructor(decadeCount: number|any | { decadecount?: number; logstart?: number; logstop?: number; intermediate?: boolean; logbase?: number; reverse?: boolean; } , intermediate?: boolean);
            /**
             * Enable or disable reverse direction
             * @param reverse  (Required) enables or disables reverse direction
             */
            setReverse(reverse: boolean): this;
            /**
             * Returns reverse direction flag
             */
            getReverse(): boolean;
            /**
             * Enable or disable displaying intermediate lines
             * @param enable  (Required) enables or disables display of minor lines in the grid
             */
            setIntermediate(enable: boolean): this;
            /**
             * Returns true if visual displays intermediate lines
             */
            getIntermediate(): boolean;
            /**
             * Return a decade count
             */
            getDecadeCount(): number;
            /**
             * Sets decade count
             * @param decadeCount  (Required) number of decades to be displayed
             */
            setDecadeCount(decadeCount: number): this;
            /**
             * Return a logarithmic scale.
             */
            getLogScale(): number;
            /**
             * Sets a logarithmic scale
             * @param scale  (Required) Must be more then zero (because logarithmic).
             */
            setLogScale(scale: number): this;
            /**
             * Sets logarithmic line range.
             * @param start  (Required) start value of tick generator
             * @param stop  (Required) stop value of tick generator
             */
            setLogarithmicRange(start: number, stop: number): this;
            /**
             * get log start and log stop
             */
            getLogarithmicRange(): {value:{logstart:number;logstop:number}}|any;
            /**
             * return meaning data limits
             * @param fullLimits  (Optional) default value is false
             */
            getDataLimits(fullLimits?: boolean): geotoolkit.util.Rect|any;
            /**
             * Returns model limits
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Sets bounds
             * @param bounds  (Required) bounds of the visual
             */
            setBounds(bounds: geotoolkit.util.Rect): this;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Draws grid
             * @param gr  (Required) Rendering Context
             * @param deviceModelRect  (Required) invalid area of the device
             * @param tr  (Required) transformation from model to device
             */
            drawGrid(gr: geotoolkit.renderer.RenderingContext, deviceModelRect: geotoolkit.util.Rect, tr: geotoolkit.util.Transformation): any;
            /**
             * Draws vertical ticks
             * @param gr  (Required) Rendering Context
             * @param top  (Required) where to start drawing ticks
             * @param height  (Required) height of the ticks
             * @param l  (Required) left position inside track
             * @param r  (Required) right position inside track
             */
            drawVerticalTicks(gr: geotoolkit.renderer.RenderingContext, top: number, height: number, l: number, r: number): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.decadecount  (Optional) number of decades to be displayed
             * @param properties.scale  (Optional) deprecated (since 2.5) a logarithmic scale
             * @param properties.offset  (Optional) grid offset
             * @param properties.step  (Optional) deprecated (since 2.5) grid step
             * @param properties.intermediate  (Optional) enables or disables display of minor lines in the grid
             * @param properties.reverse  (Optional) enables or disables reverse direction
             * @param properties.bounds  (Optional) bounds
             * @param properties.logstart  (Optional) left limits of log grid
             * @param properties.logstop  (Optional) right limits of log grid
             */
            setProperties(properties: any | { decadecount?: number; scale?: number; offset?: number; step?: number; intermediate?: boolean; reverse?: boolean; bounds?: geotoolkit.util.Rect; logstart?: number; logstop?: number; } ): this;
        }
        /**
         * Defines visual to displayed blocks of the depths
         */
        class LogBlock extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * Defines visual to displayed blocks of the depths
             */
            constructor();
            /**
             * Position
             */
            static Position: any;
            /**
             * Sets reference depths
             * @param depths  (Required) an array of numbers specifying point along the track
             */
            setReferenceDepths(depths: number[]): this;
            /**
             * Sets depths
             * @param depths  (Required) an array of numbers
             */
            setDepths(depths: number[]): this;
            /**
             * Gets position
             */
            getPosition(): geotoolkit.welllog.LogBlock.Position;
            /**
             * Sets position
             * @param pos  (Required) position(left or right or both)
             */
            setPosition(pos: geotoolkit.welllog.LogBlock.Position): this;
            /**
             * Gets fill style
             */
            getFillStyle(): geotoolkit.attributes.FillStyle;
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
             * Render
             * @param inputContext  (Required) Rendering Context
             */
            render(inputContext: geotoolkit.renderer.RenderingContext): any;
            /**
             * Gets parent model limits
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.position  (Optional) position(left or right or both)
             * @param properties.fillstyle  (Optional) The fill style
             */
            setProperties(properties: any | { position?: geotoolkit.welllog.LogBlock.Position; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ): this;
        }
        /**
         * The StackedTrack serves as a container for all kinds of tracks and visuals like curves, fill etc.
         */
        class StackedTrack extends geotoolkit.welllog.LogTrack {
            /**
             * The StackedTrack serves as a container for all kinds of tracks and visuals like curves, fill etc.
             * @param options  (Optional) 
             * @param options.bounds  (Optional) bounds of the visual
             * @param options.border  (Optional) outline of the track
             * @param options.borderstrategy  (Optional) strategy on how to display the border of the track
             */
            constructor(options?: any | { bounds?: any; border?: any; borderstrategy?: boolean; } );
            /**
             * @param event  (Required) broadcast event
             * @param source  (Required) who is initializing this event
             * @param args  (Required) additional parameter
             */
            notify(event: string, source: geotoolkit.scene.Node, args: any): this;
            /**
             * Add a track
             * @param track  (Required) track to insert
             * @param trackDirection  (Optional) The location of the track (first, last, etc)
             * @param reference  (Optional) reference track
             */
            addTrack(track: geotoolkit.welllog.LogTrack, trackDirection?: geotoolkit.welllog.TrackDirection, reference?: geotoolkit.welllog.LogTrack): geotoolkit.welllog.LogTrack;
            /**
             * Insert track to the container at specified index
             * @param track  (Required) track to insert
             * @param index  (Required) index of the track
             * @param trackWidth  (Optional) optional track width
             */
            insertTrack(track: geotoolkit.welllog.LogTrack, index: number, trackWidth?: number): geotoolkit.welllog.LogTrack;
            /**
             * Remove the track
             * @param track  (Required) track to remove
             */
            removeTrack(track: geotoolkit.welllog.LogTrack): this;
            /**
             * Returns amount of tracks
             */
            getTracksCount(): number;
            /**
             * Returns {geotoolkit.welllog.LogTrack} at specified index
             * @param index  (Required) index to return track at
             */
            getTrackAt(index: number): geotoolkit.welllog.LogTrack;
            /**
             * Return index of track
             * @param track  (Required) to get index
             */
            getTrackIndex(track: geotoolkit.welllog.LogTrack): number;
            /**
             * Associate layout with a track to layout children tracks
             * @param layout  (Required) layout to be set
             */
            setLayout(layout: geotoolkit.layout.Layout): this;
            /**
             * Returns layout associated with the group
             */
            getLayout(): geotoolkit.layout.Layout;
            /**
             * Sets the same depth limits for all tracks
             * @param minDepth  (Required) min depth for all tracks or the range to set
             * @param maxDepth  (Required) max depth for all tracks
             */
            setDepthLimits(minDepth: number|geotoolkit.util.Range, maxDepth: number): this;
            /**
             * @param callback  (Required) callback
             * @param target  (Required) target
             */
            enumerateNodes(callback: Function, target: any): any;
        }
        /**
         * Define factory to create tracks
         */
        class TrackFactory {
            /**
             * Define factory to create tracks
             */
            constructor();
            /**
             * Create track
             * @param trackType  (Required) track to create
             * @param options  (Required) track options
             * @param options.width  (Optional) track width
             * @param options.name  (Optional) track name
             * @param options.border  (Optional) track border options
             * @param options.border.visible  (Optional) visibility of the border
             * @param options.border.color  (Optional) color of border border
             * @param options.indextype  (Optional) primary index types
             * @param options.indexunit  (Optional) primary index unit
             * @param options.indextrack  (Optional) defines properties for index track
             * @param options.indextrack.styles  (Optional) index track line styles and text styles
             * @param options.indextrack.labelformat  (Optional) custom label format function
             * @param options.indextrack.axis  (Optional) axis settings
             * @param options.indextrack.axis.name  (Optional) name of axis
             * @param options.indextrack.axis.locale  (Optional) locale for tickgenerator of axis
             * @param options.timezone  (Optional) timezone
             * @param options.timezoneoffset  (Optional) time zone offset in hours
             * @param options.gridlinestyle  (Optional) gridlines
             * @param options.logtrack  (Optional) log10 track options
             * @param options.logtrack.decadecount  (Optional) log20 grid decadecount, see {@link geotoolkit.welllog.LogLog10ValueGrid}
             * @param options.logtrack.reverse  (Optional) log20 grid direction, see {@link geotoolkit.welllog.LogLog10ValueGrid}
             */
            createTrack(trackType: geotoolkit.welllog.TrackType|geotoolkit.welllog.LogTrack, options: any | { width?: number; name?: string; border?: any | { visible?: boolean; color?: any; } ; indextype?: string; indexunit?: string; indextrack?: any | { styles?: any; labelformat?: any; axis?: any | { name?: string; locale?: string; } ; } ; timezone?: number; timezoneoffset?: number; gridlinestyle?: any; logtrack?: any | { decadecount?: number; reverse?: boolean; } ; } ): geotoolkit.welllog.LogTrack;
            /**
             * Create track header
             * @param track  (Required) log track
             * @param options  (Optional) track header options
             * @param options.visibletracktitle  (Optional) track visible track title
             * @param options.titlefirst  (Optional) display title first
             * @param options.firsttolast  (Optional) display headers from first to last
             * @param options.toptobottom  (Optional) display headers from top to bottom
             * @param options.border  (Optional) border property
             * @param options.border.visible  (Optional) border visibility
             * @param options.border.color  (Optional) border color
             * @param options.border.width  (Optional) border width
             * @param options.border.background  (Optional) border background
             */
            createTrackHeader(track: geotoolkit.welllog.LogTrack, options?: any | { visibletracktitle?: boolean; titlefirst?: boolean; firsttolast?: boolean; toptobottom?: boolean; border?: any | { visible?: boolean; color?: string; width?: number; background?: geotoolkit.attributes.FillStyle|string|any; } ; } ): geotoolkit.welllog.header.LogTrackHeader;
            /**
             * Return factory instance
             */
            static getInstance(): geotoolkit.welllog.TrackFactory;
        }
        /**
         * Defines a container of log headers
         */
        class HeaderContainer extends geotoolkit.scene.Group {
            /**
             * Defines a container of log headers
             * @param provider  (Optional) provider of header prototypes
             */
            constructor(provider?: geotoolkit.welllog.header.LogVisualHeaderProvider);
            /**
             * Enum defining Orientation values
             */
            static DisplayType: any;
            /**
             * Set display type
             * @param displayType  (Required) level of detail
             */
            setDisplayType(displayType: geotoolkit.welllog.HeaderContainer.DisplayType): this;
            /**
             * Returns display type
             */
            getDisplayType(): geotoolkit.welllog.HeaderContainer.DisplayType;
            /**
             * Sets header provider
             * @param provider  (Required) provider of header prototypes
             */
            setHeaderProvider(provider: geotoolkit.welllog.header.LogVisualHeaderProvider): this;
            /**
             * Return a header provider
             */
            getHeaderProvider(): geotoolkit.welllog.header.LogVisualHeaderProvider;
            /**
             * Add child
             * @param node  (Required) the child
             */
            addChild(node: geotoolkit.scene.Node|geotoolkit.scene.Node[]): this;
            /**
             * Remove child node
             * @param node  (Required) node or array of nodes to be removed
             */
            removeChild(node: geotoolkit.scene.Node|geotoolkit.scene.Node[]): this;
            /**
             * Insert child at given index
             * @param index  (Required) position where to insert child
             * @param node  (Required) the child
             */
            insertChild(index: number, node: geotoolkit.welllog.HeaderContainer): any;
            /**
             * Return preferred size to layout children
             * @param rect  (Optional) desired rect to layout
             */
            getPreferredSize(rect?: geotoolkit.util.Rect): geotoolkit.util.Rect;
            /**
             * @param event  (Required) type of event
             * @param source  (Required) source who called the event
             * @param args  (Required) event arguments
             */
            notify(event: string, source: geotoolkit.scene.Node, args: any): any;
            /**
             * Set margin in pixels between headers
             * @param margin  (Required) margin in pixels between header
             */
            setMargin(margin: number): this;
            /**
             * Return margin in pixels between headers
             */
            getMargin(): number;
            /**
             * Set margin in pixels between headers
             * @param padding  (Required) padding in pixels header to use in header containers
             */
            setPadding(padding: number): this;
            /**
             * Return padding in pixels in header containers
             */
            getPadding(): number;
            /**
             */
            rebuild(): any;
            /**
             * Determines whether this container is scrollable
             * Returns true if scrollable
             */
            isScrollable(): boolean;
            /**
             * Sets whether this container is scrollable
             * @param scrollable  (Required) sets whether this container is scrollable
             */
            setScrollable(scrollable: boolean): this;
            /**
             * Scroll to the top
             */
            scrollToTop(): this;
            /**
             * Scroll to the bottom
             */
            scrollToBottom(): this;
            /**
             * Return marker depth to be used to display value. By default it is nan and value is not displayed
             */
            getDisplayMarkerDepth(): number;
            /**
             * Sets marker depth
             * @param value  (Required) depth of time value used by header
             */
            setDisplayMarkerDepth(value: number): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.margin  (Optional) margin
             * @param properties.padding  (Optional) padding
             * @param properties.provider  (Optional) provider of header prototypes
             * @param properties.scrollable  (Optional) sets whether this container is scrollable
             */
            setProperties(properties: any | { margin?: number; padding?: number; provider?: geotoolkit.welllog.header.LogVisualHeaderProvider; scrollable?: boolean; } ): this;
            /**
             * Return log track header
             * @param track  (Required) log track
             */
            getTrackHeader(track: geotoolkit.welllog.LogTrack): geotoolkit.welllog.header.LogBaseTrackHeader|any;
        }
        /**
         * This class implements a container for all kinds of tracks. Multiple tracks can be added to the container using addChild().
         * The trackcontainer will maintain coherent depth limits on the tracks it contains. It also offers convenience functions to manipulate the visible depth limits (scale, scroll, etc).
         * Its size relative to its parent can be defined using the setBounds() function.<br>
         * The trackcontainer also manages the units used in 'model space' (data) to 'device space' (screen). Units can be used along with the 'PPI' {@link geotoolkit.util.UnitFactory}.setPPI() to compute the actual display scale.
         */
        class TrackContainer extends geotoolkit.scene.Group {
            /**
             * This class implements a container for all kinds of tracks. Multiple tracks can be added to the container using addChild().
             * The trackcontainer will maintain coherent depth limits on the tracks it contains. It also offers convenience functions to manipulate the visible depth limits (scale, scroll, etc).
             * Its size relative to its parent can be defined using the setBounds() function.<br>
             * The trackcontainer also manages the units used in 'model space' (data) to 'device space' (screen). Units can be used along with the 'PPI' {@link geotoolkit.util.UnitFactory}.setPPI() to compute the actual display scale.
             */
            constructor();
            /**
             * Sets the same depth limits for all tracks
             * @param minDepth  (Required) min depth for all tracks or the range to set
             * @param maxDepth  (Required) max depth for all tracks
             */
            setDepthLimits(minDepth: number|geotoolkit.util.Range, maxDepth: number): this;
            /**
             * Returns depth range
             */
            getDepthLimits(): geotoolkit.util.Range;
            /**
             * enum for scroll to depth location
             */
            static ScrollToLocation: any;
            /**
             * Scroll to depth, you also can specify a location of this depth in the track container,
             * for example if you want to move the depth point location at the bottom of the track put 'BOTTOM' for the location variable.
             * location support : 'center' 'top' 'bottom' and 'visible' cases.
             * 
             * warning depth limits should be expanded in order to see it correctly
             * @param depth  (Optional) depth in the track container
             * @param location  (Optional) location of this depth in the track container
             */
            scrollToDepth(depth?: number, location?: geotoolkit.welllog.TrackContainer.ScrollToLocation): this;
            /**
             * Returns visible depth range
             */
            getVisibleDepthLimits(): geotoolkit.util.Range;
            /**
             * Sets visible depth limits
             * @param fromDepth  (Required) visible starting depth t or the visible range to set
             * @param toDepth  (Optional) visible ending depth
             */
            setVisibleDepthLimits(fromDepth: number|geotoolkit.util.Range, toDepth?: number): this;
            /**
             * Return unit of the measure to be used to display scale in the header
             */
            getScaleUnit(): geotoolkit.util.AbstractUnit;
            /**
             * Sets unit of the measure to be used to display scale in the header
             * @param unit  (Required) a scale unit or string symbol
             */
            setScaleUnit(unit: geotoolkit.util.AbstractUnit|string): this;
            /**
             * Sets unit of the measure to be used for device
             * @param unit  (Required) unit of the device
             */
            setDeviceUnit(unit: geotoolkit.util.AbstractUnit|string): this;
            /**
             * Return a unit of the measure of device
             */
            getDeviceUnit(): geotoolkit.util.AbstractUnit;
            /**
             * Sets a scale unit to be used in the header
             * @param display  (Required) device unit
             * @param scale  (Required) scale unit
             */
            setScaleUnits(display: string|geotoolkit.util.AbstractUnit, scale: string|geotoolkit.util.AbstractUnit): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.scaleunit  (Optional) a scale unit or string symbol
             * @param properties.deviceunit  (Optional) unit of the device
             */
            setProperties(properties: any | { scaleunit?: geotoolkit.util.AbstractUnit|string; deviceunit?: geotoolkit.util.AbstractUnit|string; } ): this;
        }
        /**
         * Define visual to represent comment section intervals.
         */
        class LogMudLogSection extends geotoolkit.welllog.LogAbstractVisual {
            /**
             * Define visual to represent comment section intervals.
             * @param depths  (Optional) an array of the depths
             * @param depths.depths  (Optional) an array of the depths
             * @param depths.values  (Optional) array of the corresponding values
             * @param depths.fillstyles  (Optional) fill styles
             * @param depths.fillMode  (Optional) mode for how to display the values
             * @param depths.textstyle  (Optional) text style of the displayed values
             * @param depths.ellipsisstring  (Optional) ellipsis text to string (must be under 15 characters)
             * @param depths.evenfillstyle  (Optional) even fill style
             * @param depths.oddfillstyle  (Optional) odd fill style
             * @param depths.verticalmargin  (Optional) verticalMargin vertical margin in pixel in device space
             * @param values  (Optional) array of the corresponding values
             */
            constructor(depths?: number[]|any | { depths?: number[]; values?: string[]; fillstyles?: geotoolkit.attributes.FillStyle[]; fillMode?: geotoolkit.welllog.LogMudLogSection.FillMode; textstyle?: geotoolkit.attributes.TextStyle|string|any; ellipsisstring?: string; evenfillstyle?: geotoolkit.attributes.FillStyle|string|any; oddfillstyle?: geotoolkit.attributes.FillStyle|string|any; verticalmargin?: geotoolkit.welllog.LogMudLogSection.FillMode; } , values?: string[]);
            /**
             * An enum defining fill mode
             */
            static FillMode: any;
            /**
             * An enum defining text alignment
             */
            static TextAlign: any;
            /**
             * Sets array of depths and array of corresponding values
             * @param depths  (Required) array of depths
             * @param values  (Required) array of corresponding values along the depth
             */
            setDepthsAndValues(depths: number[], values: string[]): this;
            /**
             * Sets array of fill Styles
             * @param fillStyles  (Required) fill styles
             */
            setFillStyles(fillStyles: (geotoolkit.attributes.FillStyle|string|any)[]): this;
            /**
             * Returns array of depths
             */
            getDepths(): number[];
            /**
             * Returns array of values
             */
            getValues(): string[];
            /**
             * Returns array of Fill
             */
            getFillStyles(): geotoolkit.attributes.FillStyle[];
            /**
             * Returns value closest to specified depth
             * @param depth  (Required) value at depth of current section
             */
            getValueAtDepth(depth: number): any;
            /**
             * Returns fill mode
             */
            getFillMode(): geotoolkit.welllog.LogMudLogSection.FillMode;
            /**
             * Sets fill mode
             * @param fillMode  (Required) The fill mode
             */
            setFillMode(fillMode: geotoolkit.welllog.LogMudLogSection.FillMode): this;
            /**
             * Returns text alignment
             */
            getTextAlign(): geotoolkit.welllog.LogMudLogSection.TextAlign;
            /**
             * Sets text alignment
             * @param textAlign  (Required) 
             */
            setTextAlign(textAlign: geotoolkit.welllog.LogMudLogSection.TextAlign): this;
            /**
             * Sets ellipsis text to string under 15 characters
             * @param str  (Required) value in the current section
             */
            setEllipsisString(str: string): this|any;
            /**
             * Get ellipsis text to string
             */
            getEllipsisString(): string|any;
            /**
             * Returns a bounds
             */
            getBounds(): geotoolkit.util.Rect|any;
            /**
             * Returns a text style
             */
            getTextStyle(): geotoolkit.attributes.TextStyle;
            /**
             * Sets text style
             * @param textStyle  (Required) a new shape text style
             * @param textStyle.color  (Optional) text color
             * @param textStyle.baseLine  (Optional) base line.
             * @param textStyle.alignment  (Optional) alignment.
             * @param textStyle.font  (Optional) font.
             * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
             */
            setTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
            /**
             * Returns odd fill style
             */
            getOddFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Sets odd fill style
             * @param fillStyle  (Required) a new fill style
             * @param fillStyle.color  (Optional) color
             * @param fillStyle.pattern  (Optional) pattern
             * @param fillStyle.foreground  (Optional) foreground color
             * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
             */
            setOddFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
            /**
             * Returns even fill style
             */
            getEvenFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Sets even fill style
             * @param fillStyle  (Required) a new fill style
             * @param fillStyle.color  (Optional) color
             * @param fillStyle.pattern  (Optional) pattern
             * @param fillStyle.foreground  (Optional) foreground color
             * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
             */
            setEvenFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
            /**
             * Returns vertical margin
             */
            getVerticalMargin(): number;
            /**
             * Sets vertical margin
             * @param verticalMargin  (Required) vertical margin in pixel in device space
             */
            setVerticalMargin(verticalMargin: number): this;
            /**
             * Check collision
             * Returns true if object is inside of rendering area
             * @param context  (Required) Rendering context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.textstyle  (Optional) the text style
             * @param properties.textalign  (Optional) textalign
             * @param properties.ellipsisstring  (Optional) ellipsis text to string under 15 characters
             * @param properties.verticalmargin  (Optional) vertical margin in pixel in device space
             * @param properties.depths  (Optional) array of depths
             * @param properties.values  (Optional) array of corresponding values along the depth
             * @param properties.fillstyles  (Optional) fillstyles
             * @param properties.fillmode  (Optional) The fill mode
             * @param properties.oddfillstyle  (Optional) OddFillStyle
             * @param properties.evenfillstyle  (Optional) EvenFillStyle
             */
            setProperties(properties: any | { textstyle?: geotoolkit.attributes.TextStyle|string|any; textalign?: geotoolkit.welllog.LogMudLogSection.TextAlign; ellipsisstring?: string; verticalmargin?: number; depths?: number[]; values?: string[]; fillstyles?: (geotoolkit.attributes.FillStyle|string|any)[]; fillmode?: geotoolkit.welllog.LogMudLogSection.FillMode; oddfillstyle?: geotoolkit.attributes.FillStyle|string|any; evenfillstyle?: geotoolkit.attributes.FillStyle|string|any; } ): this;
        }
        /**
         * Enum of border strategy
         */
        interface BorderStrategy {
            /**
             * BorderOnTop
             */
            BorderOnTop: string;
            /**
             * BorderAtBottom
             */
            BorderAtBottom: string;
        }
        /**
         * enum for TrackType
         */
        interface TrackType {
            /**
             * Index track
             */
            IndexTrack: number;
            /**
             * Linear Track
             */
            LinearTrack: number;
            /**
             * Logarithmic  Track
             */
            LogTrack: number;
            /**
             * Annotation Track
             */
            AnnotationTrack: number;
        }
        /**
         * Enum for Track Direction
         */
        interface TrackDirection {
            /**
             * First
             */
            First: number;
            /**
             * Before
             */
            Before: number;
            /**
             * After
             */
            After: number;
            /**
             * Last
             */
            Last: number;
        }
        module data {
            /**
             * Enum of log data state
             */
            var LogDataState: any;
            /**
             * Log Data Events
             */
            var Events: any;
            /**
             * The LogDataConversion interface class defines the base conversion operations
             * that must be implemented by all well log conversion objects. Conversion
             * objects are used to modify the values in a particular well log data (LogData)
             * before being sent to the rendering system. Conversion objects simply modify
             * the flow of data values from their current coordinate system to a new
             * coordinate system. This destination coordinate system may be another linear
             * coordinate system or a non-linear mapping like logarithmic. Conversion
             * objects are only associated with the value component of a well log data
             * source. The depth component of a well data source is never modified.
             */
            class LogDataConversion {
                /**
                 * The LogDataConversion interface class defines the base conversion operations
                 * that must be implemented by all well log conversion objects. Conversion
                 * objects are used to modify the values in a particular well log data (LogData)
                 * before being sent to the rendering system. Conversion objects simply modify
                 * the flow of data values from their current coordinate system to a new
                 * coordinate system. This destination coordinate system may be another linear
                 * coordinate system or a non-linear mapping like logarithmic. Conversion
                 * objects are only associated with the value component of a well log data
                 * source. The depth component of a well data source is never modified.
                 */
                constructor();
            }
            class LinearDataConversion extends geotoolkit.data.LinearDataConversion {
                /**
                 * @param dataLow  (Required) lower data limit of the curve
                 * @param dataHigh  (Required) higher data limit of the curve
                 * @param trackLow  (Required) track lower limit
                 * @param trackHigh  (Required) track high limit
                 */
                constructor(dataLow: number, dataHigh: number, trackLow: number, trackHigh: number);
            }
            class LogarithmicDataConversion extends geotoolkit.welllog.data.LinearDataConversion {
                /**
                 * @param coeff  (Required) coefficient
                 * @param base  (Required) logarithmic base
                 * @param logLow  (Required) low value
                 * @param logHigh  (Required) high value
                 * @param trackLow  (Required) track lower value
                 * @param trackHigh  (Required) track high value
                 */
                constructor(coeff: number, base: number, logLow: number, logHigh: number, trackLow: number, trackHigh: number);
            }
            /**
             * Represent a processed data sample
             */
            class LogDataSample extends geotoolkit.data.DataSample {
                /**
                 * Represent a processed data sample
                 * @param depth  (Required) depth
                 * @param value  (Required) value
                 * @param level  (Required) level
                 * @param valid  (Required) 
                 * @param srcIndex  (Required) 
                 */
                constructor(depth: number, value: number, level: number, valid: boolean, srcIndex: number);
                /**
                 * Sets depth
                 * @param depth  (Required) depth
                 */
                setDepth(depth: number): this;
                /**
                 * Return depth
                 */
                getDepth(): number;
                /**
                 * Create clone
                 */
                clone(): geotoolkit.welllog.data.LogDataSample;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.depth  (Optional) depth
                 */
                setProperties(properties: any | { depth?: number; } ): this;
            }
            /**
             * Defines two arrays depths and values of samples
             */
            class LogDataValueArray {
                /**
                 * Defines two arrays depths and values of samples
                 * @param samples  (Required) array of {@link geotoolkit.welllog.data.LogDataSample} elements
                 */
                constructor(samples: any[]);
            }
            /**
             * The LogDataInterpolation interface defines a set of methods that allow you to synthetically generate points<br>
             * between two depth values that define how the curve for the data will be drawn.<br>
             * Interpolation objects are used to modify the default linear interpolation between two depth values defined in a <br>
             * particular well log data source (LogData) before being sent to the rendering system.<br>
             * Interpolation objects modify the flow of data values by adding generated points in between two depth values that are drawn.<br>
             * Interpolation objects do not modify the source data. They only generate new values between two existing depth values. <br>
             * Interpolation objects were designed to be extensible to meet the requirements of well log visualization.
             */
            class LogDataInterpolation {
                /**
                 * The LogDataInterpolation interface defines a set of methods that allow you to synthetically generate points<br>
                 * between two depth values that define how the curve for the data will be drawn.<br>
                 * Interpolation objects are used to modify the default linear interpolation between two depth values defined in a <br>
                 * particular well log data source (LogData) before being sent to the rendering system.<br>
                 * Interpolation objects modify the flow of data values by adding generated points in between two depth values that are drawn.<br>
                 * Interpolation objects do not modify the source data. They only generate new values between two existing depth values. <br>
                 * Interpolation objects were designed to be extensible to meet the requirements of well log visualization.
                 */
                constructor();
                /**
                 * Interpolate array of samples
                 * @param start  (Required) The start index
                 * @param count  (Required) The count of samples to interpolate
                 * @param input  (Required) The input data
                 * @param output  (Required) The output data
                 */
                interpolate(start: number, count: number, input: geotoolkit.welllog.data.LogDataValueArray, output: geotoolkit.welllog.data.LogDataValueArray): boolean;
            }
            /**
             * This interpolation cuts values lower and upper track limits
             */
            class LogDataLimitsInterpolation extends geotoolkit.data.DataLimitsInterpolation {
                /**
                 * This interpolation cuts values lower and upper track limits
                 * @param dataLow  (Required) track low limit
                 * @param dataHigh  (Required) track high limit
                 */
                constructor(dataLow: number, dataHigh: number);
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 */
                setProperties(properties: any): this;
            }
            /**
             * Provides step-like interpolation for well log data. It provides zigzag-type
             * interpolation with alternate horizontal and vertical lines.
             */
            class LogDataStepInterpolation extends geotoolkit.data.DataStepInterpolation {
                /**
                 * Provides step-like interpolation for well log data. It provides zigzag-type
                 * interpolation with alternate horizontal and vertical lines.
                 * @param interpolationType  (Required) [interpolationType=geotoolkit.welllog.data.LogDataStepInterpolation.InterpolationType.Linear] Type of step interpolation
                 */
                constructor(interpolationType: geotoolkit.data.DataStepInterpolation.InterpolationType);
                /**
                 * Enum of step interpolation type
                 */
                static InterpolationType: any;
            }
            /**
             * The LogDataWrapInterpolation implements a simple wrapping interpolation for the curve data.
             */
            class LogDataWrapInterpolation extends geotoolkit.data.DataWrapInterpolation {
                /**
                 * The LogDataWrapInterpolation implements a simple wrapping interpolation for the curve data.
                 * @param conversion  (Required) conversion from current to new coordinate system
                 * @param trackLow  (Required) track low limits
                 * @param trackHigh  (Required) track high limits
                 * @param maxWraps  (Required) maximum count of wraps (by default 5)
                 */
                constructor(conversion: geotoolkit.data.DataConversion, trackLow: number, trackHigh: number, maxWraps: number);
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 */
                setProperties(properties: any): this;
            }
            /**
             * The LogDataClipInterpolation implements a simple clipping interpolation for the curve data.
             */
            class LogDataClipInterpolation extends geotoolkit.data.DataClipInterpolation {
                /**
                 * The LogDataClipInterpolation implements a simple clipping interpolation for the curve data.
                 * @param conversion  (Required) conversion from current to new coordinate system
                 * @param trackLow  (Required) track low limits
                 * @param trackHigh  (Required) track high limits
                 */
                constructor(conversion: geotoolkit.data.DataConversion, trackLow: number, trackHigh: number);
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 */
                setProperties(properties: any): this;
            }
            /**
             * The LogDataGapFillInterpolation interface removes NaN values that form a gap in the data less than or equal to a specified size.
             */
            class LogDataGapFillInterpolation extends geotoolkit.data.DataGapFillInterpolation {
                /**
                 * The LogDataGapFillInterpolation interface removes NaN values that form a gap in the data less than or equal to a specified size.
                 * @param cutoff  (Required) 
                 */
                constructor(cutoff: number);
            }
            /**
             * Represents a chain of interpolations
             */
            class CompositeDataInterpolation extends geotoolkit.data.CompositeDataInterpolation {
                /**
                 * Represents a chain of interpolations
                 */
                constructor();
            }
            /**
             * Define container of the drilling sections
             */
            class LogDrillingSectionContainer {
                /**
                 * Define container of the drilling sections
                 */
                constructor();
                /**
                 * Add Section
                 * @param section  (Required) 
                 */
                addSection(section: geotoolkit.welllog.data.LogDrillingSection): this;
                /**
                 * Get Sections Array
                 * @param from  (Required) 
                 * @param to  (Required) 
                 */
                getSectionsArray(from: number, to: number): geotoolkit.welllog.data.LogDrillingSection[]|any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.sections  (Optional) sections
                 */
                setProperties(properties: any | { sections?: geotoolkit.welllog.data.LogDrillingSection[]; } ): this;
            }
            /**
             * Define container of the drilling sections
             */
            class LogDrillingSection {
                /**
                 * Define container of the drilling sections
                 * @param depthFrom  (Required) from depth
                 * @param depthTo  (Required) to depth
                 * @param valueFrom  (Required) 
                 * @param valueFrom.Break  (Required) 
                 * @param valueFrom.Date  (Required) 
                 * @param valueTo  (Required) 
                 * @param valueTo.Break  (Required) 
                 * @param valueTo.Date  (Required) 
                 * @param hint  (Optional) array of rendering hints that will value markers at specified depths, defined by a depth Depth: and time Time:
                 */
                constructor(depthFrom: number, depthTo: number, valueFrom: any | { Break?: boolean; Date?: Date; } , valueTo?: any | { Break?: boolean; Date?: Date; } , hint?: any[]);
                /**
                 * Gets depth from
                 */
                getDepthFrom(): number;
                /**
                 * Get DepthTo
                 */
                getDepthTo(): number;
                /**
                 * Get value from
                 * Used by the {geotoolkit.axis.DateTimeTickGenerator} such that if Break, label is drawn at beginning or end of section instead of middle
                 */
                getValueFrom(): {result:{Date:Date;Break:boolean}}|any;
                /**
                 * Get value to
                 * Used by the {geotoolkit.axis.DateTimeTickGenerator} such that if Break, label is drawn at beginning or end of section instead of middle
                 */
                getValueTo(): {result:{Date:Date;Break:boolean}}|any;
                /**
                 * Gets hints associated with this LogDrillingSection
                 */
                getHint(): any[];
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.depthfrom  (Optional) depth from
                 * @param properties.depthto  (Optional) depth to
                 * @param properties.valuefrom  (Optional) an object containing valuefrom options
                 * @param properties.valuefrom.break  (Optional) break
                 * @param properties.valuefrom.date  (Optional) date
                 * @param properties.valueto  (Optional) an object containing valueto options
                 * @param properties.valueto.break  (Optional) break
                 * @param properties.valueto.date  (Optional) date
                 */
                setProperties(properties: any | { depthfrom?: number; depthto?: number; valuefrom?: any | { break?: boolean; date?: Date; } ; valueto?: any | { break?: boolean; date?: Date; } ; } ): this;
            }
            /**
             * Class for compatibility. Implements depth methods
             */
            class OptimizedData extends geotoolkit.data.OptimizedData {
                /**
                 * Class for compatibility. Implements depth methods
                 * @param scaledData  (Required) abstract scaled data
                 */
                constructor(scaledData: geotoolkit.data.AbstractScaledData);
            }
            /**
             * The ScaledData is a helper object that encapsulates the data
             * representing a well log curve and allows to associate either
             * conversion and/or interpolation objects with this data.
             */
            class ScaledData {
                /**
                 * The ScaledData is a helper object that encapsulates the data
                 * representing a well log curve and allows to associate either
                 * conversion and/or interpolation objects with this data.
                 * @param data  (Required) abstract log data
                 * @param conversion  (Required) data conversion
                 * @param interpolation  (Optional) algorithm to interpolate samples
                 * @param useOutOfRangeData  (Optional) convert values equals or less to zero to 0 instead of NaN
                 */
                constructor(data: geotoolkit.welllog.data.LogAbstractData, conversion: geotoolkit.data.DataConversion, interpolation?: geotoolkit.data.DataInterpolation, useOutOfRangeData?: boolean);
                /**
                 * Return name of the data
                 */
                getName(): string;
                /**
                 * Sets conversion
                 * @param conversion  (Required) conversion of the data
                 */
                setConversion(conversion: geotoolkit.data.DataConversion): this;
                /**
                 * Sets interpolation
                 * @param interpolation  (Required) algorithm to interpolate samples
                 */
                setInterpolation(interpolation: geotoolkit.data.DataInterpolation): this;
                /**
                 * Gets source
                 */
                getSource(): any;
                /**
                 * Get minimum depth
                 */
                getMinDepth(): number;
                /**
                 * Returns maximum depth
                 */
                getMaxDepth(): number;
                /**
                 * Get minimum depth
                 */
                getMinPosition(): number;
                /**
                 * Returns maximum depth
                 */
                getMaxPosition(): number;
                /**
                 * Returns minimum value
                 */
                getMinValue(): number;
                /**
                 * Returns maximum value
                 */
                getMaxValue(): number;
                /**
                 * Gets scaled samples
                 */
                getSamples(): any[];
                /**
                 * Return sample at specified index
                 * @param index  (Required) index of the sample
                 */
                getSample(index: number): geotoolkit.welllog.data.LogDataSample;
                /**
                 * Gets a count of samples
                 */
                getLength(): number;
                /**
                 * Return the count of the samples
                 */
                getSize(): number;
                /**
                 * Return true if array of the depths is ordered
                 */
                isForwardOnly(): boolean;
                /**
                 * return the order of depths array
                 */
                getDataOrder(): geotoolkit.data.DataOrder|number;
                /**
                 * Convert value from original source to current scaled data
                 * @param v  (Required) value of the original data source
                 * @param d  (Optional) depth of the original data source
                 */
                convertValueFromSource(v: number[]|number, d?: number[]|number): number[]|number;
                /**
                 * Convert value from scaled data source to original source
                 * @param v  (Required) value of the scaled data source
                 */
                convertValueToSource(v: number[]|number): number[]|number;
                /**
                 * Return a wrap levels, If data doesn't have wraps than it returns null
                 * @param fromDepth  (Required) from depth
                 * @param toDepth  (Required) to depth
                 */
                getIndexRange(fromDepth: number, toDepth: number): geotoolkit.util.Range;
                /**
                 * Find index corresponding to depth
                 * @param scaledSamples  (Required) samples
                 * @param depth  (Required) depth
                 * @param length  (Required) length of the array in the sample
                 */
                static findIndex(scaledSamples: geotoolkit.welllog.data.LogDataSample[], depth: number, length: number): number;
                /**
                 * Return minimum wrap level. By default it is 0
                 */
                getMinWrapLevel(): number;
                /**
                 * Sets minimum wrap level value
                 * @param level  (Required) minimum wrap level
                 */
                setMinWrapLevel(level: number): this;
                /**
                 * Return maximum wrap level. By default it is 0
                 */
                getMaxWrapLevel(): number;
                /**
                 * Sets maximum wrap level value
                 * @param level  (Required) maximum wrap level.
                 */
                setMaxWrapLevel(level: number): this;
                /**
                 * Returns value at specified depth
                 * @param depth  (Required) to return value
                 */
                getValue(depth: number): number;
                /**
                 * @param depth  (Required) depth to return value
                 * @param samples  (Required) samples
                 */
                protected getValueInternal(depth: number, samples: number[]): number;
                /**
                 * Return the value matching the given depth or NaN if the given depth is out of the logdata depth range.
                 * 
                 * If the depths are strictly increasing:
                 *  - The returned value will be interpolated when necessary. See example 1
                 * 
                 * If the depths are not strictly increasing but never decreasing:
                 * - The value returned will be the first one found (in the insertion order). See example 2
                 * - The value returned will be interpolated between the last one found and its closest larger neighbor. See example 2
                 * 
                 * If the depths are not always increasing (not forward only):
                 * - The value returned will be the last one found (in the insertion order). See example 3
                 * - The value returned will be interpolated between the first one found and its closest larger neighbor. See example 3
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param fromIndex  (Optional) index of sample in depths
                 * @param toIndex  (Optional) index of sample in depths
                 * @param interpolation  (Optional) interpolation type for the value
                 */
                getValueAt(depth: number, fromIndex?: number, toIndex?: number, interpolation?: geotoolkit.data.DataStepInterpolation.InterpolationType): number;
                /**
                 * private
                 * @param samples  (Required) samples
                 * @param depth  (Required) depth
                 * @param prev  (Required) prev
                 * @param next  (Required) next
                 */
                getSampleAt(samples: geotoolkit.data.DataSample[], depth: number, prev: number, next: number): number;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 */
                setProperties(properties: any): this;
            }
            /**
             * Define event to be used to notify about data changed
             */
            class LogDataEvent {
                /**
                 * Define event to be used to notify about data changed
                 * @param startDepth  (Optional) start depth
                 * @param endDepth  (Optional) end depth
                 * @param oldStartDepth  (Optional) old start depth
                 * @param oldEndDepth  (Optional) old end depth
                 * @param valueLimitsChanged  (Optional) defines if values limits are changed or not
                 * @param valueAddedToTail  (Optional) defines if values are added to the tail
                 */
                constructor(startDepth?: number, endDepth?: number, oldStartDepth?: number, oldEndDepth?: number, valueLimitsChanged?: boolean, valueAddedToTail?: boolean);
                /**
                 * Return start depth
                 */
                getStartDepth(): number;
                /**
                 * Return end depth
                 */
                getEndDepth(): number;
                /**
                 * Return old start depth
                 */
                getOldStartDepth(): number;
                /**
                 * Return old end depth
                 */
                getOldEndDepth(): number;
                /**
                 * Return true if values limits are changed
                 */
                isValueLimitsChanged(): boolean;
                /**
                 * Return true if values are added to the tail. This could happen in case of real time
                 */
                isValueAddedToTail(): boolean;
                /**
                 * Return true if values was removed from the top of the datasource
                 */
                isValueRemovedFromStart(): boolean;
                /**
                 * Return true if values was removed from the bottom of the datasource
                 */
                isValueRemovedFromEnd(): boolean;
                /**
                 * Returns the same instance of the event arguments to void multiple events creation.
                 * It means that this event cannot be kept.
                 * @param startDepth  (Optional) start depth
                 * @param endDepth  (Optional) end depth
                 * @param oldStartDepth  (Optional) old start depth
                 * @param oldEndDepth  (Optional) old end depth
                 * @param valueLimitsChanged  (Optional) defines if values limits are changed or not
                 * @param valueAddedToTail  (Optional) defines if values are added to the tail
                 */
                static getEvent(startDepth?: number, endDepth?: number, oldStartDepth?: number, oldEndDepth?: number, valueLimitsChanged?: boolean, valueAddedToTail?: boolean): geotoolkit.welllog.data.LogDataEvent;
            }
            /**
             * Define abstract Log data
             */
            class LogAbstractData extends geotoolkit.util.EventDispatcher {
                /**
                 * Define abstract Log data
                 */
                constructor();
                /**
                 * Return the value to indicate if data source was changed
                 */
                getTimeStamp(): number;
                /**
                 * Update time stamp
                 */
                updateTimeStamp(): any;
                /**
                 * Notify when data has been changed.
                 * @param args  (Optional) optional parameters
                 */
                update(args?: geotoolkit.welllog.data.LogDataEvent): any;
                /**
                 * Return index for specified depth
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param fromIndex  (Optional) index of sample in depths
                 * @param toIndex  (Optional) index of sample in depths
                 */
                getIndexAt(depth: number, fromIndex?: number, toIndex?: number): number;
                /**
                 * Return the value matching the given depth or NaN if the given depth is out of the logdata depth range.
                 * 
                 * If the depths are strictly increasing:
                 *  - The returned value will be interpolated when necessary. See example 1
                 * 
                 * If the depths are not strictly increasing but never decreasing:
                 * - The value returned will be the first one found (in the insertion order). See example 2
                 * - The value returned will be interpolated between the last one found and its closest larger neighbor. See example 2
                 * 
                 * If the depths are not always increasing (not forward only):
                 * - The value returned will be the last one found (in the insertion order). See example 3
                 * - The value returned will be interpolated between the first one found and its closest larger neighbor. See example 3
                 * 
                 * Examples assume the default linear interpolation
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param fromIndex  (Optional) index of sample in depths
                 * @param toIndex  (Optional) index of sample in depths
                 * @param interpolation  (Optional) interpolation type for the value
                 */
                getValueAt(depth: number, fromIndex?: number, toIndex?: number, interpolation?: geotoolkit.data.DataStepInterpolation.InterpolationType): number;
                /**
                 * Utility function to interpolate a value between two depths.
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param depths  (Required) The array of ordered depths
                 * @param values  (Required) The array of values
                 * @param prev  (Required) The index of the largest previous depth
                 * @param next  (Required) The index of the smallest following depth
                 * @param interpolation  (Optional) interpolation type for the value
                 */
                static findValueAt(depth: number, depths: number[], values: number[], prev: number, next: number, interpolation?: geotoolkit.data.DataStepInterpolation.InterpolationType): number;
                /**
                 * Utility function to interpolate a value between two depths.
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param depthPrev  (Required) prev depth
                 * @param valuePrev  (Required) prev value
                 * @param depthNext  (Required) next depth
                 * @param valueNext  (Required) next value
                 * @param interpolation  (Optional) interpolation type for the value
                 */
                static interpolateValueAt(depth: number, depthPrev: number, valuePrev: number, depthNext: number, valueNext: number, interpolation?: geotoolkit.data.DataStepInterpolation.InterpolationType): number;
                /**
                 * Return the count of the samples
                 */
                getSize(): number;
                /**
                 * Return value unit name
                 */
                getUnitName(): string;
                /**
                 * Return depth unit name
                 */
                getIndexUnitName(): string;
                /**
                 * Return the depth unit
                 */
                getValueUnit(): geotoolkit.util.AbstractUnit;
                /**
                 * Return the value unit
                 */
                getIndexUnit(): geotoolkit.util.AbstractUnit;
                /**
                 * Return name of the data
                 */
                getName(): string;
                /**
                 * Return minimum depth
                 */
                getMinDepth(): number;
                /**
                 * Return maximum depth
                 */
                getMaxDepth(): number;
                /**
                 * Return minimum data value
                 */
                getMinValue(): number;
                /**
                 * Return maximum data value
                 */
                getMaxValue(): number;
                /**
                 * Return an array of values
                 */
                getValues(): number[];
                /**
                 * Return an array of depths
                 */
                getDepths(): number[];
                /**
                 * Return true if data is in ascending order
                 */
                isForwardOnly(): boolean;
                /**
                 * Return the order of the log data
                 */
                getDataOrder(): geotoolkit.data.DataOrder|number;
                /**
                 * Return an array of neat min and max
                 * @param logScale  (Required) scale log scale
                 * @param centerOnZeroOnNegativeMin  (Required) If negative and positive values, center around 0
                 * @param displayUnit  (Required) displayed unit
                 */
                calculateNeatLimits(logScale: number, centerOnZeroOnNegativeMin: boolean, displayUnit: string|geotoolkit.util.AbstractUnit): number[];
            }
            /**
             * This class is the default implementation of a welllog datasource. It contains both the index values (md, tvd, etc) and the corresponding log values.
             * {@link geotoolkit.welllog.LogCurve} can use LogData as a datasource to render a welllog as a curve in a track.<br>
             * <br>
             * The LogData does not requires the index to be strictly increasing and it will not sort the indices/values.
             * It also keeps track of its state (typically for realtime scenario) through {@link geotoolkit.welllog.data.LogDataState}.
             * The LogData computes and maintains some statistics about its data (min, max) that are used by the shapes to render properly and efficiently.<br>
             * <br>
             * Any data sample can be marked as null. Null data values are
             * supported by visuals as breaks in the curve. The null value of sample can be specified using Number.NaN or NaN value.
             * <br>
             * It offers several functions to change the data it contains and will fire events accordingly. Note that most of the shapes that use LogData as datasource are optimized based on those events.
             * Therefore care must be given when changing the data. For example, clearing and setting all the values+1 is more expensive than adding a value.
             */
            class LogData extends geotoolkit.welllog.data.LogAbstractData {
                /**
                 * This class is the default implementation of a welllog datasource. It contains both the index values (md, tvd, etc) and the corresponding log values.
                 * {@link geotoolkit.welllog.LogCurve} can use LogData as a datasource to render a welllog as a curve in a track.<br>
                 * <br>
                 * The LogData does not requires the index to be strictly increasing and it will not sort the indices/values.
                 * It also keeps track of its state (typically for realtime scenario) through {@link geotoolkit.welllog.data.LogDataState}.
                 * The LogData computes and maintains some statistics about its data (min, max) that are used by the shapes to render properly and efficiently.<br>
                 * <br>
                 * Any data sample can be marked as null. Null data values are
                 * supported by visuals as breaks in the curve. The null value of sample can be specified using Number.NaN or NaN value.
                 * <br>
                 * It offers several functions to change the data it contains and will fire events accordingly. Note that most of the shapes that use LogData as datasource are optimized based on those events.
                 * Therefore care must be given when changing the data. For example, clearing and setting all the values+1 is more expensive than adding a value.
                 * @param options  (Optional) array of depths, data name, or object
                 * @param options.name  (Optional) name of data
                 * @param options.depths  (Optional) The array of depths
                 * @param options.values  (Optional) The array of values
                 * @param options.indexunit  (Optional) unit index unit
                 * @param options.valuesunit  (Optional) unit values unit
                 * @param values  (Optional) array of values
                 */
                constructor(options?: number[]|string|any | { name?: string; depths?: number[]; values?: number[]; indexunit?: geotoolkit.util.AbstractUnit|string; valuesunit?: geotoolkit.util.AbstractUnit|string; } , values?: number[]);
                /**
                 * Set name of the data
                 * @param name  (Required) The log data name
                 */
                setName(name: string): this;
                /**
                 * Clear log data. Removes all samples and reset depth limits
                 */
                clear(): this;
                /**
                 * Sets state of data.
                 * Values can be (Empty,Normal, Warning,Error,Fetching).
                 * @param state  (Required) state of data.
                 */
                setState(state: string): this;
                /**
                 * Return state
                 */
                getState(): string;
                /**
                 * Return depth by index
                 * @param index  (Required) index at the depth
                 */
                getDepth(index: number): number;
                /**
                 * Return value by index
                 * @param index  (Required) index of the sample in the array
                 */
                getValue(index: number): number;
                /**
                 * Set value by index
                 * @param index  (Required) index of the sample
                 * @param value  (Required) sample values
                 */
                setValue(index: number, value: number): this;
                /**
                 * Sets values
                 * @param depths  (Required) The array of ordered depths
                 * @param values  (Required) The array of values
                 */
                setValues(depths: number[], values: number[]): this;
                /**
                 * Suspend update
                 */
                suspendUpdate(): this;
                /**
                 * Resume update.
                 * forceUpdate calls updateDataStatistics (update min, max of values, depths...)
                 * @param forceUpdate  (Required) force update based on the state of the data
                 */
                resumeUpdate(forceUpdate: boolean): this;
                /**
                 * Add values
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param value  (Required) value at the specified depth
                 */
                addValue(depth: number, value: number): this;
                /**
                 * Add values at the bottom of the log
                 * @param depths  (Required) The array of ordered depths
                 * @param values  (Required) The array of values
                 */
                addValues(depths: number[], values: number[]): this;
                /**
                 * Remove values
                 * @param index  (Required) position where to remove the values
                 * @param count  (Required) count of samples
                 */
                removeValues(index: number, count: number): this;
                /**
                 * Insert/Replace the given value at the correct place in the log.
                 * This function works ONLY if the existing data is ordered.
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param value  (Required) value at the depth
                 */
                mergeValue(depth: number, value: number): this;
                /**
                 * Remove values from start to end depth.
                 * If startDepth is NaN or endDepth is NaN then it uses infinity values
                 * @param startDepth  (Required) where to start trim
                 * @param endDepth  (Required) where to end trim
                 */
                trimValues(startDepth: number, endDepth: number): this;
                /**
                 * Inserts/Replace the given values at the correct place in the log.
                 * This function works ONLY if the existing data is ordered.
                 * @param depths  (Required) the place where to merge in the log
                 * @param values  (Required) the values to merge
                 * @param checkValues  (Optional) check values before merge
                 */
                mergeValues(depths: number[], values: number[], checkValues?: boolean): this;
                /**
                 * Sets the depths and values of this logdata using the given string arrays.
                 * Uses parseFloat() to parse strings, also recognize 'NaN' values as Number.NaN.
                 * @param depths  (Required) array of strings
                 * @param values  (Required) array of strings
                 */
                parseFromString(depths: string[], values: string[]): this;
                /**
                 * Return minimum Meaning depth (first depth with value)
                 */
                getMinMeaningDepth(): number;
                /**
                 * Return maximum Meaning depth (last depth with value)
                 */
                getMaxMeaningDepth(): number;
                /**
                 * Return value by depth, using linear interpolation if necessary.
                 * See LogAbstractData.findValueAt.
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param prev  (Required) The index of the largest previous depth
                 * @param next  (Required) The index of the smallest following depth
                 */
                getValueInRange(depth: number, prev: number, next: number): number;
                /**
                 * computes a value at specified depth
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param depths  (Required) The array of ordered depths
                 * @param values  (Required) The array of values
                 * @param prev  (Required) The index of the largest previous depth
                 * @param next  (Required) The index of the smallest following depth
                 */
                static findValueAt(depth: number, depths: any[], values: any[], prev: number, next: number): number;
                /**
                 * Sets value unit
                 * @param unit  (Required) value unit
                 */
                setValueUnit(unit: geotoolkit.util.AbstractUnit|string): this;
                /**
                 * Sets index unit
                 * @param unit  (Required) index unit
                 */
                setIndexUnit(unit: geotoolkit.util.AbstractUnit|string): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.depths  (Optional) depths
                 * @param properties.values  (Optional) values
                 * @param properties.name  (Optional) The log data name
                 * @param properties.indexunit  (Optional) index unit
                 * @param properties.valueunit  (Optional) value unit
                 */
                setProperties(properties: any | { depths?: number[]; values?: number[]; name?: string; indexunit?: geotoolkit.util.AbstractUnit|string; valueunit?: geotoolkit.util.AbstractUnit|string; } ): this;
            }
            /**
             * Define data for AccumulationCycle visual
             */
            class AccumulationCycleData extends geotoolkit.welllog.data.LogAbstractData {
                /**
                 * Define data for AccumulationCycle visual
                 * @param name  (Optional) data name, or object
                 * @param depth  (Optional) array of depth values
                 * @param values  (Optional) array of values
                 * @param colors  (Optional) array of colors
                 * @param titles  (Optional) array of titles
                 */
                constructor(name?: string|any, depth?: number[], values?: number[], colors?: string[], titles?: string[]);
                /**
                 * Return titles of the data
                 */
                getTitles(): string[];
                /**
                 * Return title by index
                 * @param index  (Required) index at the depth
                 */
                getTitle(index: number): string|any;
                /**
                 * Set titles of the data
                 * @param titles  (Required) The log data titles
                 */
                setTitles(titles: string[]): this;
                /**
                 * Return name of the data
                 */
                getName(): string;
                /**
                 * Set name of the data
                 * @param name  (Required) The log data name
                 */
                setName(name: string): this;
                /**
                 * Clear log data. Removes all samples and reset depth limits
                 */
                clear(): any;
                /**
                 * Return a count of the samples
                 */
                getSize(): number;
                /**
                 * Return depth by index
                 * @param index  (Required) index at the depth
                 */
                getDepth(index: number): number;
                /**
                 * Return value by index
                 * @param index  (Required) index of the sample in the array
                 */
                getValue(index: number): number;
                /**
                 * Set fill color by index
                 * @param index  (Required) index of the sample
                 * @param color  (Required) fill color
                 */
                setColor(index: number, color: string): this;
                /**
                 * Return color by index
                 * @param index  (Required) index of the sample in the array
                 */
                getColor(index: number): string;
                /**
                 * Set value by index
                 * @param index  (Required) index of the sample
                 * @param value  (Required) sample values
                 */
                setValue(index: number, value: number): this;
                /**
                 * Sets values
                 * @param depths  (Required) The array of ordered depths
                 * @param values  (Required) The array of values
                 * @param colors  (Required) The array of colors
                 * @param titles  (Optional) The array of titles
                 */
                setValues(depths: number[], values: number[], colors: string[], titles?: string[]): this;
                /**
                 * Suspend update
                 */
                suspendUpdate(): any;
                /**
                 * Resume update.
                 * forceUpdate calls updateDataStatistics (update min, max of values, depths...)
                 * @param forceUpdate  (Required) force update based on the state of the data
                 */
                resumeUpdate(forceUpdate: boolean): any;
                /**
                 * Add values
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param value  (Required) value at the specified depth
                 * @param color  (Required) color at the specified depth
                 */
                addValue(depth: number, value: number, color: string): any;
                /**
                 * Add values at the bottom of the log
                 * @param depths  (Required) The array of ordered depths
                 * @param values  (Required) The array of values
                 * @param colors  (Required) The array of colors
                 */
                addValues(depths: number[], values: number[], colors: string[]): any;
                /**
                 * Remove values
                 * @param index  (Required) position where to remove the values
                 * @param count  (Required) count of samples
                 */
                removeValues(index: number, count: number): any;
                /**
                 * Insert/Replace the given value at the correct place in the log.
                 * This function works ONLY if the existing data is ordered.
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param value  (Required) value at the depth
                 * @param color  (Required) color at the depth
                 */
                mergeValue(depth: number, value: number, color: string): any;
                /**
                 * Remove values from start to end depth.
                 * If startDepth is NaN or endDepth is NaN then it uses infinity values
                 * @param startDepth  (Required) where to start trim
                 * @param endDepth  (Required) where to end trim
                 */
                trimValues(startDepth: number, endDepth: number): any;
                /**
                 * Inserts/Replace the given values at the correct place in the log.
                 * This function works ONLY if the existing data is ordered.
                 * @param depths  (Required) the place where to merge in the log
                 * @param values  (Required) the values to merge
                 * @param colors  (Required) the colors to merge
                 */
                mergeValues(depths: number[], values: number[], colors: string[]): any;
                /**
                 * Sets the depths and values of this AccumulationCycleData using the given string arrays.
                 * Uses parseFloat() to parse strings, also recognize 'NaN' values as Number.NaN.
                 * @param depths  (Required) array of strings
                 * @param values  (Required) array of strings
                 * @param colors  (Required) colors of strings
                 */
                parseFromString(depths: string[], values: string[], colors: string[]): this;
                /**
                 * Return minimum depth
                 */
                getMinDepth(): number;
                /**
                 * Return maximum depth
                 */
                getMaxDepth(): number;
                /**
                 * Return minimum Meaning depth (first depth with value)
                 */
                getMinMeaningDepth(): number;
                /**
                 * Return maximum Meaning depth (last depth with value)
                 */
                getMaxMeaningDepth(): number;
                /**
                 * Return values
                 */
                getValues(): number[];
                /**
                 * Return an array of depths
                 */
                getDepths(): number[];
                /**
                 * Return an array of colors
                 */
                getColors(): string[];
                /**
                 * Return value by depth, using linear interpolation if necessary.
                 * 
                 * See LogAbstractData.findValueAt.
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param prev  (Required) The index of the largest previous depth
                 * @param next  (Required) The index of the smallest following depth
                 */
                getValueInRange(depth: number, prev: number, next: number): number;
                /**
                 * computes a value at specified depth
                 * @param depth  (Required) The depth for which you want to compute the value
                 * @param depths  (Required) The array of ordered depths
                 * @param values  (Required) The array of values
                 * @param prev  (Required) The index of the largest previous depth
                 * @param next  (Required) The index of the smallest following depth
                 */
                static findValueAt(depth: number, depths: any[], values: any[], prev: number, next: number): number;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.depths  (Optional) The array of ordered depths
                 * @param properties.values  (Optional) The array of values
                 * @param properties.colors  (Optional) The array of colors
                 * @param properties.name  (Optional) The log data name
                 */
                setProperties(properties: any | { depths?: number[]; values?: number[]; colors?: string[]; name?: string; } ): this;
            }
            /**
             * This class defines a well log curve data source.
             */
            class LogCurveDataSource extends geotoolkit.welllog.data.LogAbstractData {
                /**
                 * This class defines a well log curve data source.
                 * @param options  (Optional) options
                 * @param options.name  (Optional) name of the curve
                 * @param options.depths  (Optional) depths array, series or name or index of series in data table if it is provided
                 * @param options.values  (Optional) values array, series or name or index of series in data table if it is provided
                 * @param options.datatable  (Optional) DataTable or DataTableView which contains depth and value column
                 */
                constructor(options?: any | { name?: string; depths?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView|string|number; values?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView|string|number; datatable?: geotoolkit.data.DataTable|geotoolkit.data.DataTableView; } );
                /**
                 * Sets data
                 * @param options  (Optional) addition options
                 * @param options.name  (Optional) name of the curve
                 * @param options.depths  (Optional) depths array, series or name or index of series in data table if it is provided
                 * @param options.values  (Optional) values array, series or name or index of series in data table if it is provided
                 * @param options.datatable  (Optional) DataTable or DataTableView which contains depth and value column
                 */
                setData(options?: any | { name?: string; depths?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView|string|number; values?: number[]|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView|string|number; datatable?: geotoolkit.data.DataTable|geotoolkit.data.DataTableView; } ): this;
                /**
                 * Returns the internal series object used to store the depth data
                 */
                getDepthData(): geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView;
                /**
                 * Returns the internal series object used to store the value data
                 */
                getValuesData(): geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView;
                /**
                 * Return minimum Meaning depth (first depth with value)
                 */
                getMinMeaningDepth(): number;
                /**
                 * Return maximum Meaning depth (last depth with value)
                 */
                getMaxMeaningDepth(): number;
                /**
                 * Clear log data.
                 */
                clear(): any;
                /**
                 * Return value unit
                 */
                getValueUnit(): geotoolkit.util.AbstractUnit;
            }
            /**
             * Defines data utils
             */
            class LogDataUtil {
                /**
                 * Defines data utils
                 */
                constructor();
                /**
                 * Parse array from strings
                 * @param values  (Required) array of log values
                 */
                parseFromString(values: string[]): number[];
            }
            /**
             * Define an abstract implementation of a row of Array Log Data set
             */
            class AbstractDataRow {
                /**
                 * Define an abstract implementation of a row of Array Log Data set
                 */
                constructor();
                /**
                 * Return a count of the samples in the row
                 */
                getSize(): number;
                /**
                 * Return the depth
                 */
                getDepth(): number;
                /**
                 * Return the values
                 * @param values  (Optional) optional buffer to fill values
                 */
                getValues(values?: number[]): number[];
                /**
                 * Return the angles
                 */
                getAngles(): number[];
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 */
                setProperties(properties: any): this;
            }
            /**
             * Define abstract data source for array log visuals like Log2DVisual
             */
            class ArrayLogAbstractData extends geotoolkit.util.EventDispatcher {
                /**
                 * Define abstract data source for array log visuals like Log2DVisual
                 * @param name  (Optional) name of data
                 */
                constructor(name?: string);
                /**
                 * Return name of the data
                 */
                getName(): string;
                /**
                 * Set name of the data
                 * @param name  (Required) The data name
                 */
                setName(name: string): this;
                /**
                 * Notify if data is changed
                 * @param args  (Optional) optional parameters
                 */
                update(args?: geotoolkit.welllog.data.LogDataEvent): any;
                /**
                 * Return the value to indicate if data source was changed
                 */
                getTimeStamp(): number;
                /**
                 * Update time stamp
                 */
                protected updateTimeStamp(): any;
                /**
                 * Return number of rows
                 */
                getNumberOfRows(): number;
                /**
                 * Return a row by index
                 * @param index  (Required) index of the row
                 */
                getRow(index: number): geotoolkit.welllog.data.AbstractDataRow;
                /**
                 * Return minimum value
                 */
                getMinValue(): number;
                /**
                 * Return maximum value
                 */
                getMaxValue(): number;
                /**
                 * Return minimum depth
                 */
                getMinDepth(): number;
                /**
                 * Return maximum depth
                 */
                getMaxDepth(): number;
                /**
                 * Return minimum angle of columns in radians
                 */
                getMinAngle(): number;
                /**
                 * Return maximum angle of columns in radians
                 */
                getMaxAngle(): number;
            }
            /**
             * Define data source for array log visuals like Log2DVisual wo use DataSeries
             */
            class ArrayLogDataSource extends geotoolkit.welllog.data.ArrayLogAbstractData {
                /**
                 * Define data source for array log visuals like Log2DVisual wo use DataSeries
                 * @param options  (Optional) initialization parameters
                 * @param options.name  (Optional) name of the data source
                 * @param options.datatable  (Optional) optional parameter to specify data
                 * @param options.depths  (Optional) optional parameter to specify depths data
                 * @param options.depths.series  (Optional) optional parameter to specify depths
                 * @param options.depths.index  (Optional) optional column index from table
                 * @param options.values  (Optional) optional parameter to specify values
                 * @param options.values.series  (Optional) values array of data series for each column
                 * @param options.values.indices  (Optional) optional array of column indices from data table
                 * @param options.angles  (Optional) optional properties of column angles
                 * @param options.angles.series  (Optional) array of series to provide
                 * @param options.angles.indices  (Optional) array of indices of columns to specify angles
                 * @param options.angles.values  (Optional) array of angles
                 */
                constructor(options?: any | { name?: string; datatable?: geotoolkit.data.DataTable|geotoolkit.data.DataTableView; depths?: any | { series?: geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; index?: number; } ; values?: any | { series?: geotoolkit.data.NumericalDataSeries[]|geotoolkit.data.NumericalDataSeriesView[]; indices?: number[]; } ; angles?: any | { series?: geotoolkit.data.NumericalDataSeries[]|geotoolkit.data.NumericalDataSeriesView[]; indices?: number[]; values?: number[]; } ; } );
                /**
                 */
                dispose(): any;
                /**
                 * Sets data
                 * @param options  (Optional) initialization parameters
                 * @param options.name  (Optional) name of the data source
                 * @param options.datatable  (Optional) optional parameter to specify data
                 * @param options.depths  (Optional) optional parameter to specify depths data
                 * @param options.depths.series  (Optional) optional parameter to specify depths
                 * @param options.depths.index  (Optional) optional column index from table
                 * @param options.values  (Optional) optional parameter to specify values
                 * @param options.values.series  (Optional) values array of data series for each column
                 * @param options.values.indices  (Optional) optional array of column indices from data table
                 * @param options.angles  (Optional) optional properties of column angles
                 * @param options.angles.series  (Optional) array of series to provide
                 * @param options.angles.indices  (Optional) array of indices of columns to specify angles
                 * @param options.angles.values  (Optional) array of angles
                 */
                setData(options?: any | { name?: string; datatable?: geotoolkit.data.DataTable|geotoolkit.data.DataTableView; depths?: any | { series?: geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView; index?: number; } ; values?: any | { series?: geotoolkit.data.NumericalDataSeries[]|geotoolkit.data.NumericalDataSeriesView[]; indices?: number[]; } ; angles?: any | { series?: geotoolkit.data.NumericalDataSeries[]|geotoolkit.data.NumericalDataSeriesView[]; indices?: number[]; values?: number[]; } ; } ): any;
                /**
                 * Return number of rows
                 */
                getNumberOfRows(): number;
                /**
                 * Return a row by index
                 * @param index  (Required) index of the row
                 */
                getRow(index: number): geotoolkit.welllog.data.AbstractDataRow;
                /**
                 * Return minimum value
                 */
                getMinValue(): number;
                /**
                 * Return maximum value
                 */
                getMaxValue(): number;
                /**
                 * Return minimum depth
                 */
                getMinDepth(): number;
                /**
                 * Return maximum depth
                 */
                getMaxDepth(): number;
                /**
                 * Return minimum angle of columns in radians
                 */
                getMinAngle(): number;
                /**
                 * Return maximum angle of columns in radians
                 */
                getMaxAngle(): number;
                /**
                 * Return information if depths have ascending order
                 */
                isForwardOnly(): boolean;
                /**
                 * return the order of depths array
                 */
                getDataOrder(): geotoolkit.data.DataOrder|number;
            }
            /**
             * One line of 2D Data to be passed into Log2DVisualData. After being built can be added to a Log2DVisualData
             * by pushing it to getRows().
             */
            class Log2DDataRow extends geotoolkit.welllog.data.AbstractDataRow {
                /**
                 * One line of 2D Data to be passed into Log2DVisualData. After being built can be added to a Log2DVisualData
                 * by pushing it to getRows().
                 * @param depth  (Required) depth
                 * @param values  (Required) array of values
                 * @param angles  (Required) array of angles in radians
                 */
                constructor(depth: number, values: number[], angles: number[]);
                /**
                 * Sets data
                 * @param values  (Required) values
                 * @param angles  (Required) angles in radians
                 */
                setData(values: number[], angles: number[]): this;
                /**
                 * Add single data
                 * @param value  (Required) value
                 * @param angle  (Required) angle in radians
                 */
                addData(value: number, angle: number): this;
                /**
                 * Return a count of the samples in the row
                 */
                getSize(): number;
                /**
                 * Return the depth
                 */
                getDepth(): number;
                /**
                 * Return the values
                 * @param values  (Optional) optional buffer to fill values
                 */
                getValues(values?: number[]): number[];
                /**
                 * Return the angles
                 */
                getAngles(): number[];
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.depth  (Optional) depth
                 * @param properties.values  (Optional) values
                 * @param properties.angles  (Optional) angles
                 */
                setProperties(properties: any | { depth?: number; values?: number[]; angles?: number[]; } ): this;
            }
            /**
             * Log2DVisualData holds Log2DDataRow objects and is passed into a Log2DVisual.
             */
            class Log2DVisualData extends geotoolkit.welllog.data.ArrayLogAbstractData {
                /**
                 * Log2DVisualData holds Log2DDataRow objects and is passed into a Log2DVisual.
                 * @param depths  (Optional) array of depths or object with properties
                 * @param depths.depths  (Optional) array of depths or object with properties
                 * @param depths.values  (Optional) array of values
                 * @param depths.name  (Optional) name of dataset
                 * @param values  (Optional) array of values
                 * @param name  (Optional) name of dataset
                 */
                constructor(depths?: number[]|any | { depths?: number[]; values?: number[]; name?: string; } , values?: number[], name?: string);
                /**
                 * A array of the rows. if the data in changed then it is necessary to call
                 * updateLimits to recalculate the data limits
                 */
                getRows(): geotoolkit.welllog.data.Log2DDataRow[];
                /**
                 * Return number of rows
                 */
                getNumberOfRows(): number;
                /**
                 * Return a row by index
                 * @param index  (Required) index of the row
                 */
                getRow(index: number): geotoolkit.welllog.data.Log2DDataRow;
                /**
                 * Return values
                 */
                getValues(): number[];
                /**
                 * Return an array of depths
                 */
                getDepths(): number[];
                /**
                 * Set NDV.
                 * All NDV values in the data will be deleted at the first rasterize
                 * If you wish to change NDV after rasterize, please reload data
                 * @param ndv  (Required) value used as NDV
                 */
                setNDVValue(ndv: number): this;
                /**
                 * Get NDV
                 */
                getNDVValue(): number;
                /**
                 * Get order of depths
                 */
                getDataOrder(): geotoolkit.data.DataOrder|number;
                /**
                 * Recalculate depth limits and optional value limits
                 * @param calculateValues  (Required) Recalculate depth limits and optional value limits or not
                 */
                calculateLimits(calculateValues: boolean): this;
                /**
                 * Set the extreme values. If unknown or unspecified, please use calculateLimits
                 * @param minDepth  (Required) min depth limit
                 * @param maxDepth  (Required) max depth limit
                 * @param minValue  (Required) min value for all rows
                 * @param maxValue  (Required) max value for all rows
                 */
                setExtremumValues(minDepth: number, maxDepth: number, minValue: number, maxValue: number): this;
                /**
                 * Recalculate depth and value limits
                 */
                updateLimits(): this;
                /**
                 * Return minimum value
                 */
                getMinValue(): number;
                /**
                 * Return maximum value
                 */
                getMaxValue(): number;
                /**
                 * Return minimum depth
                 */
                getMinDepth(): number;
                /**
                 * Return maximum depth
                 */
                getMaxDepth(): number;
                /**
                 * Return minimum angle of columns in radians
                 */
                getMinAngle(): number;
                /**
                 * Return maximum angle of columns in radians
                 */
                getMaxAngle(): number;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.rows  (Optional) rows
                 */
                setProperties(properties: any | { rows?: geotoolkit.welllog.data.Log2DDataRow[]; } ): this;
                /**
                 * Add row
                 * @param row  (Required) rows of values and angles at current depths
                 */
                addRow(row: geotoolkit.welllog.data.Log2DDataRow): any;
                /**
                 * Notifies this shape that the data was changed outside of its knowledge
                 */
                dataChanged(): any;
                /**
                 * Add values
                 * @param depths  (Required) array of depths
                 * @param values  (Required) sample values array
                 */
                addValues(depths: number[], values: number[]): any;
                /**
                 * Sets passed values
                 * @param depths  (Required) array of depths
                 * @param values  (Required) array of array values of current depths
                 * @param angles  (Required) array of angles
                 */
                setValues(depths: any[], values: any[], angles: any[]): this;
                /**
                 * Cleans all data
                 */
                clear(): any;
                /**
                 * Inserts/Replace the given values at the correct place in the log.
                 * This function works ONLY if the existing data is ordered.
                 * @param depths  (Required) array of depths
                 * @param values  (Required) array of array values of current depths
                 * @param angles  (Required) array angle values
                 */
                mergeValues(depths: any[], values: any[], angles: any[]): any;
            }
            /**
             * Enum of log data state
             */
            interface LogDataState {
                /**
                 * Empty
                 */
                Empty: number;
                /**
                 * Normal
                 */
                Normal: number;
                /**
                 * Warning
                 */
                Warning: number;
                /**
                 * Error
                 */
                Error: number;
                /**
                 * Fetching
                 */
                Fetching: number;
            }
            /**
             * Log Data Events
             */
            interface Events {
                /**
                 * Updated
                 */
                Updated: string;
                /**
                 * Unit changed
                 */
                UnitChanged: string;
            }
            module LogDataStepInterpolation {
                /**
                 * Enum of step interpolation type
                 */
                interface InterpolationType {
                    /**
                     * Linear
                     */
                    Linear: string;
                    /**
                     * Middle
                     */
                    MiddleStep: string;
                    /**
                     * End
                     */
                    EndStep: string;
                    /**
                     * Start
                     */
                    StartStep: string;
                }
            }
        }
        module attributes {
            /**
             * Defines log gradient fill style. This fillstyle can have a color and a pattern plus data source that can be used to gradient colors.
             * If you need to set the gradient color based on the " Normalization Limits " please refer to setColorRange() method.
             */
            class LogGradientStyle extends geotoolkit.attributes.FillStyle implements geotoolkit.attributes.IRasterable {
                /**
                 * Defines log gradient fill style. This fillstyle can have a color and a pattern plus data source that can be used to gradient colors.
                 * If you need to set the gradient color based on the " Normalization Limits " please refer to setColorRange() method.
                 * @param color  (Optional) Rgba Color
                 * @param pattern  (Optional) fill pattern
                 * @param foregroundcolor  (Optional) Rgba Color
                 */
                constructor(color?: string|geotoolkit.util.RgbaColor, pattern?: geotoolkit.attributes.ImagePattern, foregroundcolor?: string|geotoolkit.util.RgbaColor);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.welllog.attributes.LogGradientStyle): any;
                /**
                 * set color range (min and max value). If you need to set the gradient color based on the " Normalization Limits "  refer to the code in the example while changing normalization limits on the curve.
                 * @param range  (Required) color range (min and max value)
                 */
                setColorRange(range: geotoolkit.util.Range): {this:geotoolkit.welllog.attributes.LogGradientStyle}|any;
                /**
                 * returns color range (min and max value)
                 */
                getColorRange(): geotoolkit.util.Range;
                /**
                 * Set transparency
                 * @param transparency  (Required) value for alpha chanel
                 */
                setTransparency(transparency: number): this;
                /**
                 * Returns transparency
                 */
                getTransparency(): number;
                /**
                 * return color provider
                 */
                getColorProvider(): geotoolkit.util.ColorProvider;
                /**
                 * set color provider
                 * @param colorProvider  (Required) the color provider
                 */
                setColorProvider(colorProvider: geotoolkit.util.ColorProvider): this;
                /**
                 * return log data
                 */
                getLogData(): geotoolkit.welllog.data.LogData;
                /**
                 * set color provider
                 * @param logData  (Required) log data
                 */
                setLogData(logData: geotoolkit.welllog.data.LogAbstractData): this;
                /**
                 * Sets interpolation type
                 * @param interpolationType  (Required) interpolation type
                 */
                setInterpolationType(interpolationType: geotoolkit.data.DataStepInterpolation.InterpolationType|string): this;
                /**
                 * Returns interpolation type
                 * ('Linear', 'MiddleStep', 'EndStep', 'StartStep')
                 */
                getInterpolationType(): geotoolkit.data.DataStepInterpolation.InterpolationType;
                /**
                 * return render background state
                 */
                getRenderBackground(): boolean;
                /**
                 * set render background state
                 * @param renderBackground  (Required) extra style parameter for background fill
                 */
                setRenderBackground(renderBackground: boolean): this;
                /**
                 * return log data id
                 */
                getLogDataId(): string|any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.colorprovider  (Optional) color provider
                 * @param properties.renderbackground  (Optional) extra style parameter for background fill
                 * @param properties.transparency  (Optional) value for alpha chanel
                 * @param properties.datasource  (Optional) log data id
                 * @param properties.colorrange  (Optional) color range (min and max value)
                 */
                setProperties(properties: any | { colorprovider?: any|geotoolkit.util.DiscreteGradientColorProvider; renderbackground?: boolean; transparency?: number; datasource?: string; colorrange?: geotoolkit.util.Range; } ): this;
                /**
                 * Returns a new instance of geotoolkit.attributes.Raster
                 * @param xMin  (Optional) x Min position to get color
                 * @param yMin  (Optional) y Min position to get color
                 * @param xMax  (Optional) x Max position to get color
                 * @param yMax  (Optional) y Max position to get color
                 */
                getRaster(xMin?: number, yMin?: number, xMax?: number, yMax?: number): geotoolkit.attributes.Raster;
            }
        }
        module layout {
            /**
             * Layout to perform on {@link geotoolkit.welllog.MarkerSet} object
             */
            class MarkerSetLayout extends geotoolkit.layout.ValueCorrelatedRangeLayout1D {
                /**
                 * Layout to perform on {@link geotoolkit.welllog.MarkerSet} object
                 * @param options  (Optional) layout options
                 * @param options.overlap  (Optional) what to do if ranges don't fit: 'some' or 'all'
                 * @param options.maxoffset  (Optional) if defined do not draw labels further than 'maxoffset' device units from its model position
                 */
                constructor(options?: any | { overlap?: string; maxoffset?: number; } );
            }
        }
        module header {
            /**
             * Define an abstract implementation of visual header.
             * NOTE: Custom LogVisualHeader implementation MUST override "clone" operation for
             * LogVisualHeaderProvider to be able to create new header instance(s) internally.
             * This is a base class for all visual headers.
             */
            class LogVisualHeader extends geotoolkit.scene.AbstractNode {
                /**
                 * Define an abstract implementation of visual header.
                 * NOTE: Custom LogVisualHeader implementation MUST override "clone" operation for
                 * LogVisualHeaderProvider to be able to create new header instance(s) internally.
                 * This is a base class for all visual headers.
                 * @param visual  (Optional) visual for the header
                 */
                constructor(visual?: geotoolkit.scene.Node);
                /**
                 * EventDispatcher Events
                 */
                static Events: any;
                /**
                 * Dispose node. Clear all listeners
                 * and disconnect style to avoid memory
                 * leaks
                 */
                dispose(): any;
                /**
                 * Return visibility of the header
                 */
                getVisible(): boolean;
                /**
                 * Specify desired layout style
                 * @param layoutStyle  (Required) desired layout style
                 */
                setLayoutStyle(layoutStyle: geotoolkit.layout.LayoutStyle|any): this;
                /**
                 * return desired layout style
                 */
                getLayoutStyle(): geotoolkit.layout.LayoutStyle;
                /**
                 * Return header container
                 */
                getHeaderContainer(): geotoolkit.welllog.HeaderContainer;
                /**
                 * Return header container
                 */
                getTrackHeader(): geotoolkit.welllog.HeaderContainer;
                /**
                 * Invalidate area of the shape.  This method invalidates parent by default. invalidated from parent to root node.
                 * @param bounds  (Optional) bounds of the invalid rectangle in the inner node coordinates
                 * @param force  (Optional) true if parent should be invalidated immediately
if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
                 */
                invalidate(bounds?: geotoolkit.util.Rect|any, force?: boolean): this;
                /**
                 * Returns highlight options
                 */
                getHighlightOptions(): any;
                /**
                 * Set highlight options
                 * @param options  (Required) highlight options
                 * @param options.highlight  (Optional) highlight flag
                 * @param options.linestyle  (Optional) line style
                 * @param options.fillstyle  (Optional) fill style
                 */
                setHighlightOptions(options: any | { highlight?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string; fillstyle?: geotoolkit.attributes.FillStyle|string; } |any): this;
                /**
                 * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
                 */
                invalidateLayout(): this;
                /**
                 * Return line style
                 */
                getLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Sets a line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Return fill style
                 */
                getFillStyle(): geotoolkit.attributes.FillStyle;
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
                 * Sets border line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setBorderLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Gets border line style
                 */
                getBorderLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Sets a current text style
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Return a current text style
                 */
                getTextStyle(): geotoolkit.attributes.TextStyle;
                /**
                 * Draws a rectangle at the model limits and fill it with specified fillStyle
                 * @param context  (Required) Rendering Context
                 * @param fillStyle  (Optional) Fill Style for the rectangle
                 */
                fillBorder(context: geotoolkit.renderer.RenderingContext, fillStyle?: geotoolkit.attributes.FillStyle): this;
                /**
                 * Stroke border with specified
                 * @param context  (Required) Rendering Context
                 * @param borderLineStyle  (Optional) the LineStyle for the border
                 */
                drawBorder(context: geotoolkit.renderer.RenderingContext, borderLineStyle?: geotoolkit.attributes.LineStyle|string|any): this;
                /**
                 * Sets model limits
                 * @param modelLimits  (Required) desired model Limits
                 */
                setModelLimits(modelLimits: geotoolkit.util.Rect): this;
                /**
                 * Return model limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Return header desired height
                 */
                getDesiredHeight(): number;
                /**
                 * Return bound in the parent coordinates
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Sets bounds of the curve in the parent coordinates and set up auto bounds
                 * false
                 * @param bounds  (Required) bounds of the curve in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Enable or disable auto bounds If auto bounds is enabled then it equals to
                 * parent model limits
                 * @param enable  (Required) Enable or disable auto bounds
                 */
                setAutoBounds(enable: boolean): this;
                /**
                 * Return current transformation
                 */
                getContentsTransform(): geotoolkit.util.Transformation|any;
                /**
                 * <code>getWorldTransform</code> retrieves the local transformation
                 * of the node which represents multiplication of parent to bounds and
                 * contents transformations.
                 */
                getWorldTransform(): geotoolkit.util.Transformation;
                /**
                 * Enable automatic bounds. If auto bounds is enabled then it equals to
                 * parent model limits
                 */
                isAutoBounds(): boolean;
                /**
                 * Gets visual to be used to render header
                 */
                getVisual(): geotoolkit.welllog.LogAbstractVisual;
                /**
                 * Returns the displayed mode value
                 */
                getDisplayMode(): any;
                /**
                 * Sets the displayed mode value
                 * @param displayMode  (Required) header display mode
                 */
                setDisplayMode(displayMode: any): this;
                /**
                 * Returns the displayed value
                 */
                getDisplayString(): string;
                /**
                 * Sets the displayed value
                 * @param displayString  (Required) the displayed value
                 */
                setDisplayString(displayString: string): this;
                /**
                 * Returns 0
                 */
                getDisplayValue(): number;
                /**
                 * Returns the displayed depth value
                 */
                getDisplayDepth(): number;
                /**
                 * Check culling
                 * Returns true if object is inside of renderable area
                 * @param context  (Required) Rendering Context
                 */
                checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.visual  (Optional) visual
                 * @param properties.textstyle  (Optional) the text style
                 * @param properties.linestyle  (Optional) the line style
                 * @param properties.fillstyle  (Optional) the fill style
                 * @param properties.borderlinestyle  (Optional) border line style
                 * @param properties.modellimits  (Optional) desired model Limits
                 * @param properties.bounds  (Optional) bounds of the curve in the parent coordinates
                 * @param properties.autobounds  (Optional) automatic calculation of header size on or off
                 * @param properties.depth  (Optional) depth
                 * @param properties.displaymode  (Optional) display mode
                 * @param properties.displaystring  (Optional) display string
                 */
                setProperties(properties: any | { visual?: geotoolkit.welllog.LogAbstractVisual; textstyle?: geotoolkit.attributes.TextStyle|string|any; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; borderlinestyle?: geotoolkit.attributes.LineStyle|string|any; modellimits?: geotoolkit.util.Rect; bounds?: geotoolkit.util.Rect; autobounds?: boolean; depth?: number; displaymode?: any; displaystring?: string; } ): this;
                /**
                 * for internal use only, make text always readable
                 * @param context  (Required) rendering context
                 * @param x  (Optional) x position to place text
                 * @param y  (Optional) y position to place text
                 * @param text  (Optional) text to be displayed
                 * @param style  (Optional) text style
                 * @param alignment  (Optional) alignment for placement of text
                 * @param theta  (Optional) of rotation
                 */
                protected drawText(context: geotoolkit.renderer.RenderingContext, x?: number, y?: number, text?: string, style?: geotoolkit.attributes.TextStyle, alignment?: geotoolkit.util.AnchorType, theta?: number|any): any;
                /**
                 * Returns bounding box of the text
                 * @param context  (Required) rendering context
                 * @param x  (Optional) x position to place text
                 * @param y  (Optional) y position to place text
                 * @param text  (Optional) text to be displayed
                 * @param style  (Optional) text style
                 * @param alignment  (Optional) alignment for placement of text
                 * @param theta  (Optional) of rotation
                 */
                protected getTextBoundingBox(context: geotoolkit.renderer.RenderingContext, x?: number, y?: number, text?: string, style?: geotoolkit.attributes.TextStyle, alignment?: geotoolkit.util.AnchorType, theta?: number|any): geotoolkit.util.Rect;
                /**
                 * Returns biggest text in specified width
                 * @param context  (Required) Rendering Context
                 * @param text  (Required) Text to calculate the size for
                 * @param maxLen  (Required) max length available for the text
                 */
                checkTextSize(context: geotoolkit.renderer.RenderingContext, text: string, maxLen: number): string;
            }
            /**
             * Define visual to render composite curve header
             */
            class LogCompositeVisualHeader extends geotoolkit.welllog.header.LogVisualHeader implements geotoolkit.scene.INodeEnumerable {
                /**
                 * Define visual to render composite curve header
                 * @param visual  (Optional) visual for the header
                 */
                constructor(visual?: geotoolkit.scene.Node);
                /**
                 * @param visual  (Required) visual
                 */
                setVisual(visual: geotoolkit.welllog.LogAbstractVisual): this;
                /**
                 * Return header desired height
                 */
                getDesiredHeight(): number;
                /**
                 * Sets desired height of the header as a layoutable object
                 * @param value  (Required) desired height to set
                 */
                setDesiredHeight(value: string|number): this;
                /**
                 * specify desired layout style
                 * @param layoutStyle  (Required) desired layout style
                 * @param silent  (Optional) silent setting
                 */
                setLayoutStyle(layoutStyle: geotoolkit.layout.LayoutStyle|any, silent?: boolean): this;
                /**
                 * return desired layout style
                 */
                getLayoutStyle(): geotoolkit.layout.LayoutStyle;
                /**
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
                 * Sets inner model limits
                 * @param modelLimits  (Required) inner limits
                 */
                setModelLimits(modelLimits: geotoolkit.util.Rect): this;
                /**
                 * Gets model limits, the limits of this container inside space
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
                 * Add a child node
                 * @param node  (Required) the child node to be added
                 */
                addChild(node: geotoolkit.scene.Node|geotoolkit.scene.Node[]|geotoolkit.util.Iterator): this;
                /**
                 * Return iterator by child nodes
                 * @param filter  (Optional) a filter function. Returns all nodes if null
                 */
                getChildren(filter?: Function): geotoolkit.util.Iterator;
                /**
                 * Remove child node
                 * @param node  (Required) node or array of nodes to be removed
                 */
                removeChild(node: geotoolkit.scene.Node|geotoolkit.scene.Node[]): this;
                /**
                 * Remove all child nodes from this composite group
                 * @param disposeChildren  (Optional) automatically dispose children. If it is
true then method dispose is called for each child.
                 */
                clearChildren(disposeChildren?: boolean): this;
                /**
                 * Return node by index
                 * @param i  (Required) index of the node
                 */
                getChild(i: number): geotoolkit.scene.Node;
                /**
                 * Return number of child nodes
                 */
                getChildrenCount(): number;
                /**
                 * @param callback  (Required) callback
                 * @param target  (Required) target
                 */
                enumerateNodes(callback: Function, target: any): any;
                /**
                 * Mark this group to be updated.
                 * @param regions  (Optional) optional array to return invalid rectangles
                 * @param changes  (Optional) optional parameter to specify a reason of changes
                 */
                updateState(regions?: geotoolkit.util.Rect[], changes?: geotoolkit.scene.Node.StateChanges): this;
                /**
                 */
                setBounds(): this;
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
            }
            /**
             * Define visual to render curve header
             */
            class AccumulationCycleHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * Define visual to render curve header
                 * @param visual  (Optional) visual for the header
                 */
                constructor(visual?: geotoolkit.scene.Node);
                /**
                 */
                updateState(): any;
                /**
                 * Render
                 * @param inputContext  (Required) Rendering Context
                 */
                render(inputContext: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 */
                setProperties(properties: any): this;
            }
            class AdaptiveLogVisualHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * @param visual  (Optional) visual
                 */
                constructor(visual?: geotoolkit.welllog.LogAbstractVisual);
                /**
                 * Sets text style for all textual elements
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Gets header elements with their parameters.
                 * NOTE: deep copy of elements is created and returned.
                 */
                getElements(): any[];
                /**
                 * Sets header element's parameters.
                 * @param names  (Required) names include<br>
(a) element name or <br>
(b) an array of element names or <br>
(c) JSON-object with entries in the form of: "an_element_name": { the_element_JSON_options }
(see second parameter description for details)
                 * @param options  (Optional) options to set
                 * @param options.visible  (Optional) visibility flag
                 * @param options.text  (Optional) static text for textual element(s)
                 * @param options.cut  (Optional) values supported: 'left-to-right', 'right-to-left' and undefined (no cut is allowed)
                 * @param options.textstyle  (Optional) text style for textual element(s)
                 * @param options.updatemethod  (Optional) callback for textual element's contents update
                 * @param options.drawmethod  (Optional) callback for non-textual element's contents update
                 * @param options.numberformat  (Optional) number format
                 * @param options.verticalpos  (Optional) values supported: 'top', 'bottom', 'center'
                 * @param options.horizontalpos  (Optional) values supported: 'left', 'right', 'center'
                 */
                setElement(names: string|any[]|any, options?: any | { visible?: boolean; text?: string; cut?: string; textstyle?: geotoolkit.attributes.TextStyle|string|any; updatemethod?: Function; drawmethod?: Function; numberformat?: geotoolkit.util.NumberFormat; verticalpos?: string; horizontalpos?: string; } ): this;
                /**
                 * Gets general settings.
                 * NOTE: deep copy of settings is created and returned.
                 */
                getSettings(): any;
                /**
                 * Sets settings element's parameters.
                 * @param settings  (Required) settings
                 * @param settings.gap  (Optional) gap value in pixels
                 * @param settings.order  (Optional) spatial order of textual elements:
first "Left-to-right" then "top-to-bottom":
                 * @param settings.priority  (Optional) "least-to-most" important textual elements
                 * @param settings.padding  (Optional) padding
                 * @param settings.padding.left  (Optional) left padding
                 * @param settings.padding.right  (Optional) right padding
                 * @param settings.padding.top  (Optional) top padding
                 * @param settings.padding.bottom  (Optional) bottom padding
                 */
                setSettings(settings: any | { gap?: number; order?: any[]; priority?: any[]; padding?: any | { left?: number; right?: number; top?: number; bottom?: number; } ; } ): this;
                /**
                 * Gets all the properties pertaining to the header
                 */
                getProperties(): any;
                /**
                 * Sets properties pertaining to this object
                 * @param properties  (Required) object containing properties to set
                 * @param properties.element  (Required) element properties
                 * @param properties.element.elementName  (Required) see {@link geotoolkit.welllog.header.AdaptiveLogVisualHeader#setElement}
                 */
                setProperties(properties: any | { element?: any | { elementName?: any; } ; } ): this;
                /**
                 * Sets vertical header
                 * @param vertical  (Required) true, if vertical header, else false
                 */
                setVertical(vertical: boolean): this;
            }
            /**
             * This header contains elements: ScaleFrom, Name, Description, Tracking, Unit, ScaleTo, Axis, Fill, Line, Symbol
             */
            class AdaptiveLogCurveVisualHeader extends geotoolkit.welllog.header.AdaptiveLogVisualHeader {
                /**
                 * This header contains elements: ScaleFrom, Name, Description, Tracking, Unit, ScaleTo, Axis, Fill, Line, Symbol
                 * @param visual  (Optional) visual
                 */
                constructor(visual?: geotoolkit.welllog.LogAbstractVisual);
                /**
                 * Sets symbol to be used
                 * @param symbol  (Required) symbol to be used
                 */
                setSymbol(symbol: geotoolkit.scene.shapes.Symbol): this;
                /**
                 * Gets symbol
                 */
                getSymbol(): geotoolkit.scene.shapes.Symbol;
            }
            /**
             * Define visual to render curve header
             */
            class LogFillVisualHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * Define visual to render curve header
                 * @param visual  (Optional) visual visual for curve header
                 */
                constructor(visual?: geotoolkit.welllog.LogFill);
                /**
                 * Sets a current text style for displayed value
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setDisplayNamesTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Return a current text style for displayed value
                 */
                getDisplayNamesTextStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.symbol  (Optional) symbol to be used
                 * @param properties.displayvaluetextstyle  (Optional) display value textstyle
                 */
                setProperties(properties: any | { symbol?: geotoolkit.scene.shapes.Symbol; displayvaluetextstyle?: geotoolkit.attributes.TextStyle|string|any; } ): this;
            }
            /**
             * Define visual to render curve header
             */
            class LogLithologyHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * Define visual to render curve header
                 * @param visual  (Optional) visual for the header
                 */
                constructor(visual?: geotoolkit.scene.Node);
                /**
                 * Enum of lithography header display types
                 */
                static HeaderType: any;
                /**
                 * Sets Header Type
                 * @param type  (Required) Enum of lithography header display types
                 */
                setHeaderType(type: geotoolkit.welllog.header.LogLithologyHeader.HeaderType): this;
                /**
                 * Gets the current header type
                 */
                getHeaderType(): geotoolkit.welllog.header.LogLithologyHeader.HeaderType;
                /**
                 * Sets a current text style for displayed value
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setDisplayValueTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Return a current text style for displayed value
                 */
                getDisplayValueTextStyle(): geotoolkit.attributes.TextStyle;
                /**
                 * Render
                 * @param inputContext  (Required) Rendering Context
                 */
                render(inputContext: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Update state.
                 */
                updateState(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.displayvaluetextstyle  (Optional) display value textstyle
                 * @param properties.symbol  (Optional) symbol to set
                 * @param properties.headertype  (Optional) Enum of header type
                 */
                setProperties(properties: any | { displayvaluetextstyle?: geotoolkit.attributes.TextStyle|string|any; symbol?: geotoolkit.scene.shapes.Symbol; headertype?: any; } ): this;
            }
            /**
             * Define visual to render curve header
             */
            class Log2DVisualHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * Define visual to render curve header
                 * @param visual  (Optional) visual for the header
                 */
                constructor(visual?: geotoolkit.welllog.Log2DVisual);
                /**
                 * Sets a current text style for displayed value
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setDisplayValueTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Return a current text style for displayed value
                 */
                getDisplayValueTextStyle(): geotoolkit.attributes.TextStyle;
                /**
                 * @param inputContext  (Required) Rendering Context
                 */
                render(inputContext: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Fill the rectangle (model limits)
                 * @param context  (Required) Rendering Context
                 */
                fillRectangle(context: geotoolkit.renderer.RenderingContext): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.displayvaluetextstyle  (Optional) Text Style
                 */
                setProperties(properties: any | { displayvaluetextstyle?: geotoolkit.attributes.TextStyle|string|any; } ): this;
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
            class CompositeLog2DVisualHeader extends geotoolkit.welllog.header.LogCompositeVisualHeader {
                /**
                 * @param visual  (Optional) visual for the header
                 */
                constructor(visual?: geotoolkit.welllog.LogAbstractVisual);
                /**
                 * @param event  (Required) broadcast event
                 * @param source  (Required) who is initializing this event
                 * @param args  (Required) additional parameter
                 */
                notify(event: string, source: geotoolkit.scene.Node, args: any): any;
                /**
                 * Return header options
                 */
                getOptions(): {options:{colorbar:any}}|any;
                /**
                 * Set header options
                 * @param options  (Required) header options
                 * @param options.colorbar  (Optional) colorbar options @see {@link geotoolkit.controls.shapes.ColorBar.setOptions}
                 */
                setOptions(options: any | { colorbar?: any; } ): this;
                /**
                 * Returns tick generator using for color bar
                 */
                getTickGenerator(): geotoolkit.axis.TickGenerator;
                /**
                 * Set color bar tick generator
                 * @param tickGenerator  (Required) color bar tick generator
                 */
                setTickGenerator(tickGenerator: geotoolkit.axis.TickGenerator): this;
            }
            /**
             * Define visual to render curve header
             */
            class LogCurveVisualHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * Define visual to render curve header
                 * @param visual  (Optional) visual for the header
                 */
                constructor(visual?: geotoolkit.scene.Node);
                /**
                 * Sets a current text style for displayed value
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setDisplayValueTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Return a current text style for displayed value
                 */
                getDisplayValueTextStyle(): geotoolkit.attributes.TextStyle;
                /**
                 * Sets symbol to be used
                 * @param symbol  (Required) symbol to be used
                 */
                setSymbol(symbol: geotoolkit.scene.shapes.Symbol): this;
                /**
                 * Gets symbol
                 */
                getSymbol(): geotoolkit.scene.shapes.Symbol;
                /**
                 * Sets inline mode
                 * @param inline  (Required) mode to draw everything in one line
                 */
                setInline(inline: boolean): this;
                /**
                 * gets inline mode
                 */
                getInline(): boolean;
                /**
                 * Return marker depth to be used to display value. By default it is nan and value is not displayed
                 */
                getDisplayMarkerDepth(): number;
                /**
                 * Returns the number formatter for the min value
                 */
                getMinValueFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Sets the number formatter for the min value
                 * @param format  (Required) number formatter
                 */
                setMinValueFormat(format: geotoolkit.util.NumberFormat): this;
                /**
                 * Returns the number formatter for the max value
                 */
                getMaxValueFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Sets the number formatter for the max value
                 * @param format  (Required) number formatter
                 */
                setMaxValueFormat(format: geotoolkit.util.NumberFormat): this;
                /**
                 * Returns the number formatter for the value
                 */
                getValueFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Gets value at last, first or custom depth position
                 */
                getDisplayValue(): number;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.displayvaluetextstyle  (Optional) text style of the displayed value
                 * @param properties.symbol  (Optional) symbol to be displayed
                 * @param properties.inline  (Optional) draw inline or no
                 * @param properties.minvalueformat  (Optional) number format
                 * @param properties.maxvalueformat  (Optional) number format
                 * @param properties.valueformat  (Optional) number format for value
                 */
                setProperties(properties: any | { displayvaluetextstyle?: geotoolkit.attributes.TextStyle|string|any; symbol?: geotoolkit.scene.shapes.Symbol; inline?: boolean; minvalueformat?: geotoolkit.util.NumberFormat; maxvalueformat?: geotoolkit.util.NumberFormat; valueformat?: geotoolkit.util.NumberFormat; } ): this;
            }
            /**
             * Define visual to render discrete curve header
             */
            class LogDiscreteCurveVisualHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * Define visual to render discrete curve header
                 * @param visual  (Optional) visual for discrete curve header
                 */
                constructor(visual?: geotoolkit.welllog.header.LogVisualHeader);
                /**
                 * Enum defining Orientation values
                 */
                static Orientation: any;
                /**
                 * Sets header orientation
                 * @param orientation  (Required) header orientation
                 */
                setOrientation(orientation: geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.Orientation): this;
                /**
                 * Returns header orientation
                 */
                getOrientation(): geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.Orientation;
                /**
                 * Set the visibility of curve name
                 * @param visible  (Required) The visibility of the curve name
                 */
                setCurveNameVisible(visible: boolean): this;
                /**
                 * Gets visibility of curve name
                 */
                getCurveNameVisible(): boolean;
                /**
                 */
                updateState(): any;
            }
            /**
             * Defines default header implementation for {geotoolkit.welllog.CompositeLogCurve} visual
             */
            class CompositeLogCurveHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * Defines default header implementation for {geotoolkit.welllog.CompositeLogCurve} visual
                 * @param visual  (Required) header implementation for visual
                 */
                constructor(visual: geotoolkit.welllog.LogAbstractVisual);
                /**
                 * Return header desired height
                 */
                getDesiredHeight(): number;
                /**
                 * Sets a current text style for displayed value
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setDisplayValueTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Return a current text style for displayed value
                 */
                getDisplayValueTextStyle(): geotoolkit.attributes.TextStyle;
                /**
                 * @param context  (Required) Rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 */
                updateState(): any;
                /**
                 * Return marker depth to be used to display value. By default it is nan and value is not displayed
                 */
                getDisplayMarkerDepth(): number;
                /**
                 * Returns the number formatter for the min value
                 */
                getMinValueFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Returns the number formatter for the max value
                 */
                getMaxValueFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Returns the number formatter for the value
                 */
                getValueFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Update unit in header
                 */
                updateUnit(): any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.displayvaluetextstyle  (Optional) text style of the display value
                 * @param properties.minvalueformat  (Optional) NumberFormat
                 * @param properties.maxvalueformat  (Optional) NumberFormat
                 * @param properties.valueformat  (Optional) NumberFormat
                 */
                setProperties(properties: any | { displayvaluetextstyle?: geotoolkit.attributes.TextStyle|string|any; minvalueformat?: geotoolkit.util.NumberFormat; maxvalueformat?: geotoolkit.util.NumberFormat; valueformat?: geotoolkit.util.NumberFormat; } ): this;
            }
            /**
             * Create the standard representation of a well log header provider.
             */
            class LogVisualHeaderProvider {
                /**
                 * Create the standard representation of a well log header provider.
                 */
                constructor();
                /**
                 * return name of provider
                 */
                getName(): string;
                /**
                 * set name
                 * @param name  (Required) name of the header provider
                 */
                setName(name: string): this;
                /**
                 * set margin in pixels between header
                 * @param margin  (Required) margin in pixels between header
                 */
                setMargin(margin: number): this;
                /**
                 * return margin in pixels between header
                 */
                getMargin(): number;
                /**
                 * Gets header helpers
                 */
                getHeaderHelpers(): any;
                /**
                 * Returns header instance associated with specified visual
                 * @param node  (Required) specified visual
                 */
                getHeader(node: geotoolkit.welllog.LogAbstractVisual): geotoolkit.welllog.header.LogVisualHeader|any;
                /**
                 * Sets header
                 * @param node  (Required) current node
                 * @param headerInstance  (Required) prototype to create the header instance
                 */
                registerHeader(node: geotoolkit.scene.Node, headerInstance: any): this;
                /**
                 * Sets header helper
                 * @param className  (Required) class name for visual
                 * @param headerInstance  (Required) prototype to create the header instance
                 */
                registerHeaderProvider(className: string, headerInstance: geotoolkit.scene.Node): this;
                /**
                 * return default header implementation for specified class name
                 * @param className  (Required) class name for visual
                 */
                getHeaderProvider(className: string): geotoolkit.welllog.header.LogVisualHeader;
                /**
                 * get header prototype
                 * @param node  (Required) type of visual to return
                 */
                getHeaderPrototype(node: geotoolkit.scene.Node): geotoolkit.welllog.header.LogVisualHeader;
                /**
                 * Return default instance of the LogVisualHeaderProvider
                 */
                static getDefaultInstance(): geotoolkit.welllog.header.LogVisualHeaderProvider;
                /**
                 * Returns clone
                 */
                clone(): geotoolkit.welllog.header.LogVisualHeaderProvider;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.headerhelpers  (Optional) see {@link geotoolkit.welllog.header.LogVisualHeaderProvider#registerHeaderProvider}
                 * @param properties.name  (Optional) name of the header provider
                 * @param properties.margin  (Optional) deprecated margin in pixels between header
                 */
                setProperties(properties: any | { headerhelpers?: any; name?: string; margin?: number; } ): this;
            }
            /**
             * Define a base implementation of the track header. This class doesn't create
             * headers for track children
             */
            class LogBaseTrackHeader extends geotoolkit.scene.CompositeNode implements geotoolkit.layout.ILayoutable {
                /**
                 * Define a base implementation of the track header. This class doesn't create
                 * headers for track children
                 * @param track  (Required) [track] a log track to create header
                 * @param height  (Optional) height of the track
                 */
                constructor(track: geotoolkit.welllog.LogTrack, height?: number);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.welllog.header.LogBaseTrackHeader): this;
                /**
                 * Return track to create a header
                 */
                getTrack(): geotoolkit.welllog.LogTrack;
                /**
                 * Returns track visibility if track is not null, true instead
                 */
                getVisible(): boolean;
                /**
                 * Returns bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Sets bounds of the node in the parent coordinates
                 * @param bounds  (Required) bounds of the node
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * return desired layout style
                 */
                getLayoutStyle(): geotoolkit.layout.LayoutStyle;
                /**
                 * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
                 */
                invalidateLayout(): this;
                /**
                 * @param event  (Required) broadcast event
                 * @param source  (Required) who is initializing this event
                 * @param args  (Required) additional parameter
                 */
                notify(event: string, source: geotoolkit.scene.Node, args: any): any;
                /**
                 * Return desired height of the header
                 */
                getDesiredHeight(): number;
                /**
                 * Sets the border visibility
                 * @param visible  (Required) The visibility of the border
                 */
                setBorderVisibility(visible: boolean): this;
                /**
                 * Gets the header border's visibility.
                 */
                getBorderVisibility(): boolean;
                /**
                 * Sets the border line style
                 * @param lineStyle  (Required) The style in which the line is displayed
object can be in format of constructor of geotoolkit.attributes.LineStyle
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setBorderLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Gets the border line style
                 */
                getBorderLineStyle(): geotoolkit.attributes.LineStyle|any;
                /**
                 * Sets the border fill style
                 * @param fillStyle  (Required) a new fill style
                 * @param fillStyle.color  (Optional) color
                 * @param fillStyle.pattern  (Optional) pattern
                 * @param fillStyle.foreground  (Optional) foreground color
                 * @param merge  (Optional) true if you want to merge fillStyle with existing attribute, false by default
                 */
                setBorderFillStyle(fillStyle: geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } |string, merge?: boolean): this;
                /**
                 * Gets the border fill style
                 */
                getBorderFillStyle(): geotoolkit.attributes.FillStyle|any;
                /**
                 * Mark this group to be updated.
                 */
                updateState(): any;
                /**
                 * Render
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets transformation
                 */
                getContentsTransform(): geotoolkit.util.Transformation|any;
                /**
                 * Get models limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Update layout of the children headers
                 */
                updateLayout(): any;
                /**
                 * Rebuild
                 */
                rebuild(): any;
                /**
                 * invalidate Method
                 */
                getInvalidateMethod(): Function;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.track  (Optional) a log track to create header
                 * @param properties.borderfillstyle  (Optional) see {@link geotoolkit.welllog.header.LogBaseTrackHeader#setBorderFillStyle}
                 * @param properties.borderlinestyle  (Optional) The line style of the border. See {@link geotoolkit.welllog.header.LogBaseTrackHeader#setBorderLineStyle}
                 * @param properties.borders  (Optional) see {@link geotoolkit.scene.shapes.Border#setBorder}
                 * @param properties.isbordervisible  (Optional) The visibility of the border
                 * @param properties.modellimits  (Optional) model limits
                 * @param properties.bounds  (Optional) bounds
                 */
                setProperties(properties: any | { track?: geotoolkit.welllog.LogTrack; borderfillstyle?: geotoolkit.attributes.FillStyle|string|any; borderlinestyle?: geotoolkit.attributes.LineStyle|string|any; borders?: any; isbordervisible?: boolean; modellimits?: geotoolkit.util.Rect; bounds?: geotoolkit.util.Rect; } ): this;
            }
            /**
             * Define LogHeader
             */
            class LogTrackHeader extends geotoolkit.welllog.header.LogBaseTrackHeader implements geotoolkit.layout.ILayoutable {
                /**
                 * Define LogHeader
                 * @param track  (Optional) a log track to create header
                 * @param provider  (Optional) provider of the headers
                 */
                constructor(track?: geotoolkit.welllog.LogTrack, provider?: geotoolkit.welllog.header.LogVisualHeaderProvider);
                /**
                 * copyConstructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.welllog.header.LogTrackHeader): any;
                /**
                 * Sets header provider
                 * @param provider  (Required) header provider
                 */
                setHeaderProvider(provider: geotoolkit.welllog.header.LogVisualHeaderProvider): this;
                /**
                 * Sets visible track title. This method removes all headers and build it
                 * again.
                 * @param visible  (Required) defines track visibility
                 */
                setVisibleTrackTitle(visible: boolean): this;
                /**
                 * Return true if track title is visible
                 */
                isVisibleTrackHeader(): boolean;
                /**
                 * Sets order of the track title header.
                 * @param titleFirst  (Required) track child order
                 */
                setTitleFirst(titleFirst: boolean): this;
                /**
                 * Return order of the track title header.
                 */
                getTitleFirst(): boolean;
                /**
                 * Sets order of the track child headers.
                 * @param firstToLast  (Required) track child order
                 */
                setFirstToLast(firstToLast: boolean): this;
                /**
                 * Return order of the track child headers
                 */
                getFirstToLast(): boolean;
                /**
                 * Sets position of the track child headers.
                 * @param topToBottom  (Required) track child order
                 */
                setTopToBottom(topToBottom: boolean): this;
                /**
                 * Return position of the track child headers
                 */
                getTopToBottom(): boolean;
                /**
                 */
                rebuild(): any;
                /**
                 * Returns the current header provider
                 */
                getHeaderProvider(): geotoolkit.welllog.header.LogVisualHeaderProvider|any;
                /**
                 * Return desired height of the header
                 */
                getDesiredHeight(): number;
                /**
                 * @param event  (Required) broadcast event
                 * @param source  (Required) who is initializing this event
                 * @param args  (Required) additional parameter
                 */
                notify(event: string, source: geotoolkit.scene.Node, args: any): any;
                /**
                 * Returns active visual
                 */
                getActiveVisual(): geotoolkit.welllog.LogAbstractVisual;
                /**
                 * Set active visual
                 * @param activeVisual  (Required) new instance of the active visual
                 */
                setActiveVisual(activeVisual: geotoolkit.welllog.LogAbstractVisual): this;
                /**
                 * Update state. This methods reset node state and update state for children. This method is useful to
                 * refresh a scene graph
                 * @param regions  (Optional) optional array to return invalid rectangles
                 * @param changes  (Optional) optional parameter to specify a reason of changes
                 * @param args  (Optional) event arguments
                 */
                updateState(regions?: geotoolkit.util.Rect[], changes?: geotoolkit.scene.Node.StateChanges, args?: any): this;
                /**
                 * Update layout
                 */
                updateLayout(): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.headerprovider  (Optional) header provider
                 * @param properties.visibletracktitle  (Optional) defines track title header visibility
                 * @param properties.titlefirst  (Optional) defines track track title header order
                 * @param properties.firsttolast  (Optional) defines track item headers order
                 * @param properties.toptobottom  (Optional) defines position of the track child headers
                 */
                setProperties(properties: any | { headerprovider?: geotoolkit.welllog.header.LogVisualHeaderProvider; visibletracktitle?: boolean; titlefirst?: boolean; firsttolast?: boolean; toptobottom?: boolean; } ): this;
            }
            /**
             * Define header for  StackedTrack
             */
            class StackedTrackHeader extends geotoolkit.welllog.header.LogTrackHeader {
                /**
                 * Define header for  StackedTrack
                 * @param track  (Optional) a log track to create header
                 * @param provider  (Optional) provider of the headers
                 */
                constructor(track?: geotoolkit.welllog.LogTrack, provider?: geotoolkit.welllog.header.LogVisualHeaderProvider);
            }
            class AdaptiveLog2DVisualHeader extends geotoolkit.welllog.header.AdaptiveLogVisualHeader {
                /**
                 * @param visual  (Optional) visual
                 */
                constructor(visual?: geotoolkit.welllog.LogAbstractVisual);
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
                /**
                 * Sets all properties
                 * @param properties  (Required) properties
                 * @param properties.minvalueformat  (Optional) min value number format
                 * @param properties.maxvalueformat  (Optional) max value number format
                 */
                setProperties(properties: any | { minvalueformat?: geotoolkit.util.NumberFormat; maxvalueformat?: geotoolkit.util.NumberFormat; } ): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
            }
            /**
             * Define header for LogTrack
             */
            class LogTrackVisualHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * Define header for LogTrack
                 * @param visual  (Required) visual for logtrack
                 */
                constructor(visual: geotoolkit.welllog.LogTrack);
                /**
                 * Set auto label rotation
                 * @param value  (Required) enable automatic label rotation
                 */
                setAutoLabelRotation(value: boolean): this;
                /**
                 * Get auto label rotation
                 */
                getAutoLabelRotation(): boolean;
                /**
                 * Sets label rotation angle in radians
                 * @param angle  (Required) label rotation angle, in radians
                 */
                setLabelRotationAngle(angle: number): this;
                /**
                 * Returns label rotation angle
                 */
                getLabelRotationAngle(): number;
                /**
                 * Set adaptive height flag
                 * @param enable  (Required) set adaptive height or not
                 */
                setAdaptiveHeight(enable: boolean): this;
                /**
                 * get adaptive height flag
                 */
                getAdaptiveHeight(): boolean;
                /**
                 * Render
                 * @param inputContext  (Required) Rendering Context
                 */
                render(inputContext: geotoolkit.renderer.RenderingContext): any;
                /**
                 * This method can be used to draw multiple lines. Each line is truncated to fit in the maxWidth
                 * (You can use the getLines method to split a string up into multiple lines)
                 * @param maxWidth  (Required) maxwidth of the model
                 * @param lineBounds  (Required) position of header inside of container
                 * @param textStyle  (Required) text style of title
                 * @param context  (Required) rendering context
                 */
                drawLines(maxWidth: number, lineBounds: geotoolkit.util.Rect, textStyle: geotoolkit.attributes.TextStyle, context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.adaptiveheight  (Optional) height of the header
                 * @param properties.autolabelrotation  (Optional) define automatic label rotation if track is narrow
                 * @param properties.labelrotationangle  (Optional) define optional label rotation angle relative to header
                 */
                setProperties(properties: any | { adaptiveheight?: boolean; autolabelrotation?: boolean; labelrotationangle?: number; } ): this;
                /**
                 */
                updateState(): this;
                /**
                 * Return header desired height
                 */
                getDesiredHeight(): number;
            }
            /**
             * Define header for LogAxis. Any of the predefined {@link geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType} can be used for displaying axis labels. <br>
             * It is not possible to modify the existing header, but user can provide own callback function to return text, which can have only necessary
             * information to be displayed in the header.
             * User also has an option to define custom Header Types. please refer to the example below.
             */
            class LogAxisVisualHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * Define header for LogAxis. Any of the predefined {@link geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType} can be used for displaying axis labels. <br>
                 * It is not possible to modify the existing header, but user can provide own callback function to return text, which can have only necessary
                 * information to be displayed in the header.
                 * User also has an option to define custom Header Types. please refer to the example below.
                 * @param visual  (Optional) logaxis visual
                 */
                constructor(visual?: geotoolkit.welllog.LogAxis);
                /**
                 * Enum of value type style to specify how to display a scale value
                 */
                static TypeStyles: any;
                /**
                 * Enum of HeaderType
                 */
                static HeaderType: any;
                /**
                 * Set auto label rotation
                 * @param bool  (Required) enable automatic label rotation
                 */
                setAutoLabelRotation(bool: boolean): this;
                /**
                 * Get auto label rotation
                 */
                getAutoLabelRotation(): boolean;
                /**
                 * Sets label rotation angle in radians
                 * @param angle  (Required) label rotation angle, in radians
                 */
                setLabelRotationAngle(angle: number): this;
                /**
                 * Returns label rotation angle
                 */
                getLabelRotationAngle(): number;
                /**
                 * Gets textStyle of the value displayed
                 */
                getDisplayValueTextStyle(): geotoolkit.attributes.TextStyle;
                /**
                 * Sets a type of header. In addition to predefined header types Custom header type can be used.
                 * @param headerType  (Required) type of header (Enum of header type)
                 */
                setHeaderType(headerType: geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType): this;
                /**
                 * Return a type of the header
                 */
                getHeaderType(): geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType;
                /**
                 * Sets a current text style for displayed value
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setDisplayValueTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Set displayed unit  for date time axis.
                 * If null, units will be automatically calculated
                 * ex. ['h','min','s','ms'] and 1 inch of 4830040 ms  will be displayed
                 * 1: 1:20:30:40
                 *  in:h:min:s:ms
                 * @param units  (Required) unit for date time axis.
                 */
                setTimeIntervalUnits(units: any[]): this;
                /**
                 * Get displayed unit for date time axis
                 */
                getTimeIntervalUnits(): any[];
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Sets format header handler
                 * @param handler  (Required) handler is called to specify format of the header
                 */
                setFormatHeaderHandler(handler: Function): this;
                /**
                 * Return value type style how to display scale if header type is Scale.
                 */
                getValueTypeStyle(): geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles;
                /**
                 * Sets a value type style how to display scale value if header type is Scale.
                 * @param style  (Required) a style how to display a scale value if header type is scale
                 */
                setValueTypeStyle(style: geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {properties:{displayvaluetextstyle:geotoolkit.attributes.TextStyle;headertype:geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType;valuetypestyle:geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles;autolabelrotation:boolean;labelrotationangle:number}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) An object containing the properties to set
                 * @param properties.displayvaluetextstyle  (Optional) text style of the display value
                 * @param properties.headertype  (Optional) enum of header type
                 * @param properties.autolabelrotation  (Optional) define automatic label rotation if track is narrow
                 * @param properties.labelrotationangle  (Optional) define optional label rotation angle relative to header
                 * @param properties.valuetypestyle  (Optional) style a style how to display a scale value if header type is scale
                 */
                setProperties(properties?: any | { displayvaluetextstyle?: geotoolkit.attributes.TextStyle|string|any; headertype?: any; autolabelrotation?: boolean; labelrotationangle?: number; valuetypestyle?: geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles; } ): this;
                /**
                 * used to trigger a redraw when styles has been changed
                 */
                protected getInvalidateMethod(): Function;
            }
            /**
             * Define visual to render curve header
             */
            class LogBarVisualHeader extends geotoolkit.welllog.header.LogVisualHeader {
                /**
                 * Define visual to render curve header
                 * @param visual  (Optional) visual for the header
                 */
                constructor(visual?: geotoolkit.welllog.LogBarVisual);
                /**
                 * Render
                 * @param inputContext  (Required) Rendering Context
                 */
                render(inputContext: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Returns the number formatter for the min value
                 */
                getMinValueFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Returns the number formatter for the max value
                 */
                getMaxValueFormat(): geotoolkit.util.NumberFormat;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.minvalueformat  (Optional) number format for min value
                 * @param properties.maxvalueformat  (Optional) number format for max value
                 */
                setProperties(properties: any | { minvalueformat?: geotoolkit.util.NumberFormat; maxvalueformat?: geotoolkit.util.NumberFormat; } ): this;
            }
            /**
             * Define default header for geotoolkit.welllog.RasterLog
             */
            class RasterLogHeader extends geotoolkit.welllog.header.AdaptiveLogVisualHeader {
                /**
                 * Define default header for geotoolkit.welllog.RasterLog
                 * @param visual  (Required) 
                 */
                constructor(visual: geotoolkit.welllog.LogAbstractVisual);
            }
            module LogVisualHeader {
                /**
                 * EventDispatcher Events
                 */
                interface Events {
                    /**
                     * This Event is fired when the visual was changed
                     */
                    VisualChanged: string;
                    /**
                     * This Event is fired when the visual has been invalidated
                     */
                    VisualInvalidate: string;
                    /**
                     * This Event is fired when the visual visibility has been invalidated
                     */
                    VisualVisibilityChanged: string;
                }
            }
            module LogLithologyHeader {
                /**
                 * Enum of lithography header display types
                 */
                interface HeaderType {
                    /**
                     * Default (TextInside) display type
                     */
                    Default: string;
                    /**
                     * Text will appear centered and inside the key rectangles.
                     */
                    FullWidth: string;
                    /**
                     * Text will appear legend-style outside the key rectangles, with the boxes to the left
                     */
                    BoxesLeft: string;
                    /**
                     * Text will appear legend-style outside the key rectangles, with the boxes to the right
                     */
                    BoxesRight: string;
                    /**
                     * Text will appear vertically legend-style outside the key rectangles, with the boxes to the top
                     */
                    VerticalBoxesRight: string;
                }
            }
            module LogDiscreteCurveVisualHeader {
                /**
                 * Enum defining Orientation values
                 */
                interface Orientation {
                    /**
                     * Vertical
                     */
                    Vertical: string;
                    /**
                     * Horizontal
                     */
                    Horizontal: string;
                }
            }
            module LogAxisVisualHeader {
                /**
                 * Enum of value type style to specify how to display a scale value
                 */
                interface TypeStyles {
                    /**
                     * Display text of scale
                     */
                    Text: number;
                    /**
                     * Display a button with scale
                     */
                    Button: number;
                    /**
                     * Display nothing
                     */
                    None: number;
                }
                /**
                 * Enum of HeaderType
                 */
                interface HeaderType {
                    /**
                     * Display scale, name and unit
                     */
                    Scale: string;
                    /**
                     * Display name and unit only
                     */
                    Simple: string;
                    /**
                     * Display name, unit and visible range
                     */
                    Range: string;
                    /**
                     * Display name, unit and full model range
                     */
                    FullRange: string;
                    /**
                     * Custom
                     */
                    Custom: string;
                }
            }
        }
        module axis {
            class DateTimeTickGenerator extends geotoolkit.axis.TickGenerator {
                /**
                 * @param trajectory  (Required) trajectory options
                 */
                constructor(trajectory: any);
                /**
                 * Returns valid Tick Grades : "SECTIONS", "MAJOR"
                 */
                getTickGrades(): string[];
                /**
                 * Reset
                 * @param parent  (Required) parent axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) tick info
                 */
                reset(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): string[];
                /**
                 * Reset ticks (lineStyles, tickSizes, tickTypes)
                 * @param parent  (Required) parent axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) a info about labels. This information is used to pass and receive information about the current tick or label
                 */
                resetTicks(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
                /**
                 * Reset labels (textStyles)
                 * @param parent  (Required) axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) tick info
                 */
                resetLabels(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
                /**
                 * Gets next tick index
                 * @param parent  (Required) parent axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) info about tick
                 * @param tickIndex  (Required) tick index from 0 to count-1, which resetTicks returns
                 */
                nextTick(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
                /**
                 * Gets next label index
                 * @param parent  (Required) parent axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) info about tick
                 * @param tickIndex  (Required) tickIndex tick index from 0 to count-1, which resetLabels returns
                 */
                nextLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
                /**
                 * Format label
                 * @param parent  (Required) parent axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) a info about tick
                 * @param tickIndex  (Required) tickIndex tick index from 0 to count-1, which resetLabels returns
                 * @param modelValue  (Required) model value
                 */
                formatLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number, modelValue: number): string;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.dttrajectory  (Optional) trajectory options
                 */
                setProperties(properties: any | { dttrajectory?: any; } ): this;
            }
        }
        module LogCurve {
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
             * Enum of rendering optimization types
             */
            interface SymbolOptimizationType {
                /**
                 * The same optimization as for curve
                 */
                SameAsCurve: number;
                /**
                 * Symbols bbox intersection optimization
                 */
                Intersection: number;
            }
            /**
             * Enum of curve limits type
             */
            interface LimitsType {
                /**
                 * Auto limits
                 */
                Auto: number;
                /**
                 * Neat limits
                 */
                Neat: number;
                /**
                 * Manual limits
                 */
                Manual: number;
            }
            /**
             * Enum of step interpolation type
             */
            interface ClippingType {
                /**
                 * None
                 */
                None: string;
                /**
                 * Software
                 */
                Software: string;
                /**
                 * Hardware
                 */
                Hardware: string;
            }
        }
        module LogDiscreteCurve {
            /**
             * fill type
             */
            interface FillType {
                /**
                 * color provider
                 */
                ColorProvider: number;
                /**
                 * discrete
                 */
                Discrete: number;
                /**
                 * continuous
                 */
                Continuous: number;
            }
        }
        module LogFill {
            /**
             * Enum of FillTypes
             */
            interface FillType {
                /**
                 * Single Fill
                 */
                Single: string;
                /**
                 * Dual Fill
                 */
                Dual: string;
                /**
                 * Positive Fill
                 */
                Positive: string;
                /**
                 * Negative FIll
                 */
                Negative: string;
                /**
                 * Positive And Negative Fill
                 */
                PositiveAndNegative: string;
                /**
                 * Left Fill
                 */
                Left: string;
                /**
                 * Negative FIll
                 */
                Right: string;
                /**
                 * Left And Right Fill
                 */
                LeftAndRight: string;
            }
        }
        module LogAnnotation {
            /**
             * LogAnnotation TextOrientation
             */
            interface TextOrientation {
                /**
                 * Regular
                 */
                Regular: string;
                /**
                 * Rotated
                 */
                Rotated: string;
            }
        }
        module LogLithology {
            /**
             * LogLithology LineType
             */
            interface LineType {
                /**
                 * CONTINUE
                 */
                CONTINUE: number;
                /**
                 * DISCONTINUE
                 */
                DISCONTINUE: number;
            }
            /**
             * LogLithology Label Fill Mode
             */
            interface LabelFillMode {
                /**
                 * SINGLECOLOR - label fill will be a single color for all labels
                 */
                SINGLECOLOR: number;
                /**
                 * FILLSTYLE - label fill will be the corresponding fill styles color
                 */
                FILLSTYLE: number;
                /**
                 * NONE - no label fill
                 */
                NONE: number;
            }
            /**
             * LogLithology NameOrientation
             */
            interface NameOrientation {
                /**
                 * Regular
                 */
                Regular: string;
                /**
                 * Rotated
                 */
                Rotated: string;
                /**
                 * Automatic
                 */
                Auto: string;
            }
        }
        module Log2DVisual {
            /**
             * Enum of column alignment types
             */
            interface ColumnAlignment {
                /**
                 * Alignment to the left
                 */
                Left: string;
                /**
                 * Alignment to the center
                 */
                Center: string;
                /**
                 * Alignment to the right (default)
                 */
                Right: string;
            }
            /**
             * Enum of interpolation types
             */
            interface InterpolationType {
                /**
                 * Step plot mode (no interpolation)
                 */
                Step: string;
                /**
                 * Linear plot mode
                 */
                Linear: string;
            }
            /**
             * Enum of plotMode modes
             */
            type PlotTypes = any;

        }
        module LogAxis {
            /**
             * Enum of axis tick positions
             */
            interface TitleAlignment {
                /**
                 * Title is on the top side.
                 */
                Top: string;
                /**
                 * Title is on the center.
                 */
                Center: string;
                /**
                 * Title is on the bottom side.
                 */
                Bottom: string;
            }
        }
        module LogBlock {
            /**
             * Position
             */
            interface Position {
                /**
                 * Left
                 */
                Left: number;
                /**
                 * Right
                 */
                Right: number;
                /**
                 * Both
                 */
                Both: number;
            }
        }
        module HeaderContainer {
            /**
             * Enum defining Orientation values
             */
            interface DisplayType {
                /**
                 * Default
                 */
                Default: string;
                /**
                 * Maximized
                 */
                Maximized: string;
                /**
                 * Minimized
                 */
                Minimized: string;
            }
        }
        module TrackContainer {
            /**
             * enum for scroll to depth location
             */
            interface ScrollToLocation {
                /**
                 * CENTER, set the scroll depth point at the center of the track container visible limits.
                 */
                CENTER: string;
                /**
                 * TOP, set the scroll depth point at the top of the track container visible limits.
                 */
                TOP: string;
                /**
                 * BOTTOM, set the scroll depth point at the bottom of the track container visible limits.
                 */
                BOTTOM: string;
                /**
                 * VISIBLE, set the scroll depth point visible in the track container visible limits.
                 */
                VISIBLE: string;
            }
        }
        module LogMudLogSection {
            /**
             * An enum defining fill mode
             */
            interface FillMode {
                /**
                 * All
                 */
                All: number;
                /**
                 * TextOnly
                 */
                TextOnly: number;
            }
            /**
             * An enum defining text alignment
             */
            interface TextAlign {
                /**
                 * Top
                 */
                Top: string;
                /**
                 * Bottom
                 */
                Bottom: string;
            }
        }
    }
    module scene {
        module shapes {
            module painters {
                /**
                 * <p>Creates tadpole painter. A tadpole is a symbol associated with one or several ticks.</p>
                 * 
                 * <p>The main symbol can be a circle, a square, a triangle or a diamond. You can change its fillStyle and its lineStyle.
                 * Each tadpole symbol needs one (depth,dip) value to be displayed.</p>
                 * 
                 * <p>Each tadpole symbol can have one or several ticks.
                 * Each tick needs an azimuth (in degrees) and a length value.
                 * Each tick can have its own color and pattern.</p>
                 */
                class TadpolePainter {
                    /**
                     * <p>Creates tadpole painter. A tadpole is a symbol associated with one or several ticks.</p>
                     * 
                     * <p>The main symbol can be a circle, a square, a triangle or a diamond. You can change its fillStyle and its lineStyle.
                     * Each tadpole symbol needs one (depth,dip) value to be displayed.</p>
                     * 
                     * <p>Each tadpole symbol can have one or several ticks.
                     * Each tick needs an azimuth (in degrees) and a length value.
                     * Each tick can have its own color and pattern.</p>
                     * @param symbol  (Required) the parent symbol, used to set properties
                     * @param bbox  (Required) bounding box this symbolPainter should paint within
                     * @param context  (Required) renderingContext
                     */
                    constructor(symbol: geotoolkit.welllog.TadPoleSymbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
            }
        }
    }
}
