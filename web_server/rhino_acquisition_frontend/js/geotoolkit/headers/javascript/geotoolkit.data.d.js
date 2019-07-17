/**
 * Define base data object
 *
 * @class geotoolkit.data.DataObject
 * @augments geotoolkit.util.EventDispatcher
 * @param {object} [options] options JSON options object
 * @param {string} [options.name=''] name
 * @param {string} [options.uri=''] unique resource identifier
 * @param {string} [options.type=''] type
 */
geotoolkit.data.DataObject = {};
    /**
     * Events
     * @enum
     * @readonly
     */
    geotoolkit.data.DataObject.Events = {};
        /**
         * ChildAdded
         * @type {string}
         */
        geotoolkit.data.DataObject.Events.ChildAdded = "";
        /**
         * ChildRemoved
         * @type {string}
         */
        geotoolkit.data.DataObject.Events.ChildRemoved = "";
        /**
         * PropertyChanged
         * @type {string}
         */
        geotoolkit.data.DataObject.Events.PropertyChanged = "";
    /**
     * Returns data object name
     * @returns {string}
     */
    geotoolkit.data.DataObject.prototype.getName = function(){};
    /**
     * Sets data object name
     * @param {string} name data object name
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.setName = function(name){};
    /**
     * Returns unique resource identifier
     * @returns {string}
     */
    geotoolkit.data.DataObject.prototype.getUri = function(){};
    /**
     * Sets unique resource identifier
     * @param {string} uri unique identifier
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.setUri = function(uri){};
    /**
     * Returns data type
     * @returns {string}
     */
    geotoolkit.data.DataObject.prototype.getType = function(){};
    /**
     * Sets data object type
     * @param {string} type data type
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.setType = function(type){};
    /**
     * Return property bag
     * @returns {*}
     */
    geotoolkit.data.DataObject.prototype.getProperties = function(){};
    /**
     * Add additional properties
     * @param {object} properties additional properties of the dataobject
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.addProperties = function(properties){};
    /**
     * Returns whether data object contains specific property
     * @param {string} name property name
     * @returns {boolean}
     */
    geotoolkit.data.DataObject.prototype.hasProperty = function(name){};
    /**
     * Gets property by name
     * @param {string} name property name
     * @returns {object}
     */
    geotoolkit.data.DataObject.prototype.getProperty = function(name){};
    /**
     * Sets property by name
     * @param {string} name property name
     * @param {object} value property value
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.setProperty = function(name, value){};
    /**
     * Add a child object
     *
     * @param {geotoolkit.data.DataObject | Array<geotoolkit.data.DataObject>} data the child data to be added
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.addChild = function(data){};
    /**
     * Remove child data object
     *
     * @param {geotoolkit.data.DataObject} data data object to be removed
     * @param {boolean} [silent=false] will not fire any events if true
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.removeChild = function(data, silent){};
    /**
     * Sets item by index
     *
     * @param {number} index index of the item
     * @param {geotoolkit.data.DataObject} item node
     * @returns {?geotoolkit.data.DataObject}
     */
    geotoolkit.data.DataObject.prototype.set = function(index, item){};
    /**
     * Insert item by index
     *
     * @param {number} index
     * specified index
     * @param {geotoolkit.data.DataObject} item
     * node
     * @param {boolean} [silent=false] will not fire any events if true
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.insertChild = function(index, item, silent){};
    /**
     * Remove all child data
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.clearChildren = function(){};
    /**
     * Return data by index
     *
     * @param {number} i index of the data
     * @returns {geotoolkit.data.DataObject}
     */
    geotoolkit.data.DataObject.prototype.getChild = function(i){};
    /**
     * Return number of child data
     *
     * @returns {number}
     */
    geotoolkit.data.DataObject.prototype.getChildrenCount = function(){};
    /**
     * Return index of child data
     * ( index of the specified child or -1 if data is not found)
     *
     * @param {geotoolkit.data.DataObject} data data object to check index
     * @returns {number}
     */
    geotoolkit.data.DataObject.prototype.indexOfChild = function(data){};
    /**
     * Sets parent data item
     *
     * @param {geotoolkit.data.DataObject} parent parent data item
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.setParent = function(parent){};
    /**
     * @returns {geotoolkit.data.DataObject} parent dataobject
     */
    geotoolkit.data.DataObject.prototype.getParent = function(){};
    /**
     * This method is called if property bag is changed using setProperty method
     * @param {object} prop
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.onPropertyChanged = function(prop){};
    /**
     * Query data item and child items by different conditions
     * @returns {object} query object which has methods 'where' tp specify conditions, 'select' to run query,
     * 'selectToArray' select results to array
     * Expressions syntax:
     * "item => expression", where expression:
     * - logical and arithmetic operators
     * - embedded functions:
     * name(item) - gets name of the data object
     * url(item) - gets url of the data object
     * type(item) - gets type of the data object
     * @example
     * // Select by function
     * dataobject.query()
     * .where( function(item){ return item.getParent() == dataobject })
     * .where( function(item){ return item.getUri() == "item2" })
     * .select(function(item) {
     * found_item = item;
     * });
     *@example
     * // Select by expression
     * dataobject.query()
     * .where('item => uri(item) == "item2_1"')
     * .select(function(item) {
     * found_item = item;
     * });
     */
    geotoolkit.data.DataObject.prototype.query = function(){};
    /**
     * Dispose data object and all children. Clear all listeners
     */
    geotoolkit.data.DataObject.prototype.dispose = function(){};
    /**
     * Copy constructor function.<br>
     * Function used as part of the cloning mechanism.<br>
     * Implementations should copy the given instance state to this instance.<br>
     * @protected
     * @param {geotoolkit.data.DataObject} src Source to copy from
     * @returns {geotoolkit.data.DataObject} this
     */
    geotoolkit.data.DataObject.prototype.copyConstructor = function(src){};
    /**
     * All subclasses should override copyConstructor or provide custom implementation for this method
     * @param {boolean} [copyData=false]
     */
    geotoolkit.data.DataObject.prototype.clone = function(copyData){};

/**
 * Define an abstract series of data of any type.
 * This is an abstract class and cannot be instantiated.
 *
 * @class geotoolkit.data.AbstractDataSeries
 * @augments geotoolkit.data.DataObject
 * @param {object} [options] options
 * @param {number|string} [options.id] unique id of the data series
 * @param {string} [options.name=''] name name of the data series
 * @param {string} [options.type=''] type type of the data series
 */
geotoolkit.data.AbstractDataSeries = {};
    /**
     * AbstractDataSeries events.
     * @enum
     * @readonly
     */
    geotoolkit.data.AbstractDataSeries.Events = {};
        /**
         * ValuesAdding
         * @type {string}
         */
        geotoolkit.data.AbstractDataSeries.Events.ValuesAdding = "";
        /**
         * ValuesAdded
         * @type {string}
         */
        geotoolkit.data.AbstractDataSeries.Events.ValuesAdded = "";
        /**
         * ValuesUpdating
         * @type {string}
         */
        geotoolkit.data.AbstractDataSeries.Events.ValuesUpdating = "";
        /**
         * ValuesUpdated
         * @type {string}
         */
        geotoolkit.data.AbstractDataSeries.Events.ValuesUpdated = "";
        /**
         * ValuesRemoving
         * @type {string}
         */
        geotoolkit.data.AbstractDataSeries.Events.ValuesRemoving = "";
        /**
         * ValuesRemoved
         * @type {string}
         */
        geotoolkit.data.AbstractDataSeries.Events.ValuesRemoved = "";
        /**
         * ValuesSetting
         * @type {string}
         */
        geotoolkit.data.AbstractDataSeries.Events.ValuesSetting = "";
        /**
         * ValuesSet
         * @type {string}
         */
        geotoolkit.data.AbstractDataSeries.Events.ValuesSet = "";
        /**
         * UnitChanged
         * @type {string}
         */
        geotoolkit.data.AbstractDataSeries.Events.UnitChanged = "";
        /**
         * Disposing
         * @type {string}
         */
        geotoolkit.data.AbstractDataSeries.Events.Disposing = "";
    /**
     * @override
     */
    geotoolkit.data.AbstractDataSeries.prototype.dispose = function(){};
    /**
     * Returns the identifier of the data series.
     * @returns {number|string}
     */
    geotoolkit.data.AbstractDataSeries.prototype.getId = function(){};
    /**
     * Sets the identifier of the data series.
     * @param {number|string} id a new identifier
     * @returns {geotoolkit.data.AbstractDataSeries} this
     */
    geotoolkit.data.AbstractDataSeries.prototype.setId = function(id){};
    /**
     * Notifies the data series has been updated.
     * The timestamp will be updated and geotoolkit.data.Events.Updated event will be fired.
     *
     * @fires geotoolkit.data.Events#Updated
     * @param {object} [args] event args
     * @returns {geotoolkit.data.AbstractDataSeries} this
     */
    geotoolkit.data.AbstractDataSeries.prototype.update = function(args){};
    /**
     * Notifies the data series has been started updating.
     * The timestamp will be updated and geotoolkit.data.Events.Updated event will be fired.
     * @protected
     * @fires geotoolkit.data.Events#Updating
     * @param {object} [args] event args
     * @returns {geotoolkit.data.AbstractDataSeries} this
     */
    geotoolkit.data.AbstractDataSeries.prototype.updating = function(args){};
    /**
     * Returns the timestamp of the data series.
     * @protected
     * @returns {number}
     */
    geotoolkit.data.AbstractDataSeries.prototype.getTimeStamp = function(){};
    /**
     * Updates timestamp of the data series.
     * @protected
     */
    geotoolkit.data.AbstractDataSeries.prototype.updateTimeStamp = function(){};
    /**
     * Returns data ordering of the data series.
     * @returns {geotoolkit.data.DataOrder|number}
     */
    geotoolkit.data.AbstractDataSeries.prototype.getDataOrder = function(){};
    /**
     * Returns whether the data series is immutable and cannot be changed.
     * @function
     * @abstract
     * @returns {boolean}
     */
    geotoolkit.data.AbstractDataSeries.prototype.isReadOnly = function(){};
    /**
     * Returns unit of the data series.
     * @function
     * @abstract
     * @returns {?geotoolkit.util.AbstractUnit} unit
     */
    geotoolkit.data.AbstractDataSeries.prototype.getUnit = function(){};
    /**
     * Returns the number of values in the data series.
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.data.AbstractDataSeries.prototype.getLength = function(){};
    /**
     * Returns the value at the given index.
     * The type of the returned value depends on the data series type.
     *
     * @function
     * @abstract
     * @param {number} index
     * @returns {?object}
     */
    geotoolkit.data.AbstractDataSeries.prototype.getValue = function(index){};
    /**
     * Returns an array of objects in the data series.
     *
     * @function
     * @abstract
     * @param {boolean} [copy=false] whether creating a copy of data
     * @param {string|geotoolkit.util.AbstractUnit} [unit=null] unit optional output unit to convert the data to. if not specified, data will not be converted
     * @returns {Array<object>}
     */
    geotoolkit.data.AbstractDataSeries.prototype.toArray = function(copy, unit){};
    /**
     * Converts values from one unit to another specified unit.
     *
     * @function
     * @abstract
     * @protected
     * @param {Array<object>|object} values array of values or a single value
     * @param {geotoolkit.util.AbstractUnit} [fromUnit] the original unit of the value(s)
     * @param {geotoolkit.util.AbstractUnit} [toUnit] the unit to convert the value(s) to
     * @returns {Array<object>|object}
     */
    geotoolkit.data.AbstractDataSeries.prototype.convertValues = function(values, fromUnit, toUnit){};

/**
 * Define a generic series of data to be used for any type.
 *
 * @class geotoolkit.data.DataSeries
 * @augments geotoolkit.data.AbstractDataSeries
 * @param {object} options JSON options object
 * @param {number|string} [options.id] unique id of the series
 * @param {string} [options.name] name of the data series
 * @param {string} [options.type='object'] a JavaScript type of the data series
 * @param {string|geotoolkit.util.AbstractUnit} [options.unit] unit of the data series
 * @param {Array<object>} [options.data] an array of data
 */
geotoolkit.data.DataSeries = {};
    /**
     * Type of state changes
     * @deprecated since 2.3
     * @enum
     * @readonly
     */
    geotoolkit.data.DataSeries.StateChanges = {};
        /**
         * Added new values
         * @type {string}
         */
        geotoolkit.data.DataSeries.StateChanges.Added = "";
        /**
         * Removed values
         * @type {string}
         */
        geotoolkit.data.DataSeries.StateChanges.Removed = "";
    /**
     * Copy constructor function.<br>
     * Function used as part of the cloning mechanism.<br>
     * Implementations should copy the given instance state to this instance.<br>
     *
     * @protected
     * @param {geotoolkit.data.DataSeries} src Source to copy from
     * @param {boolean} [copyData=false] copy data
     * @returns {geotoolkit.data.DataSeries}
     */
    geotoolkit.data.DataSeries.prototype.copyConstructor = function(src, copyData){};
    /**
     * @override
     * @returns {boolean} false
     */
    geotoolkit.data.DataSeries.prototype.isReadOnly = function(){};
    /**
     * Adds a value to the data series.
     * @param {object} value a new value
     * @returns {geotoolkit.data.DataSeries} this
     */
    geotoolkit.data.DataSeries.prototype.addValue = function(value){};
    /**
     * Adds an array of values to the data series.
     * @param {Array<object>} array an array of values
     * @returns {geotoolkit.data.DataSeries} this
     */
    geotoolkit.data.DataSeries.prototype.addValues = function(array){};
    /**
     * Inserts a value at the specified index.
     * @param {number} index the index number where to insert the value.
     * @param {object} value the value to insert
     * @returns {geotoolkit.data.DataSeries} this
     */
    geotoolkit.data.DataSeries.prototype.insertValue = function(index, value){};
    /**
     * Inserts an array of values at the specified index.
     * @param {number} index the index number where to insert the values. Values will be added starting at the index number.
     * @param {Array<object>} array the array of values to insert
     * @returns {geotoolkit.data.DataSeries} this
     */
    geotoolkit.data.DataSeries.prototype.insertValues = function(index, array){};
    /**
     * Returns the value at given index.
     * @param {number} index the index should be a number greater than or equal to zero, and less than the number of values as returned by getLength() method.
     * @returns {?object}
     */
    geotoolkit.data.DataSeries.prototype.getValue = function(index){};
    /**
     * Sets the value at given index.
     * @param {number} index the index should be a number greater than or equal to zero, and less than the number of values as returned by getLength() method.
     * @param {object} value value to set
     * @returns {geotoolkit.data.DataSeries} this
     */
    geotoolkit.data.DataSeries.prototype.setValue = function(index, value){};
    /**
     * Sets an array of values to the data series.
     * @param {Array<object>} array an array of values to set
     * @param {boolean} [copy=true] make a deep copy of the values
     * @returns {geotoolkit.data.DataSeries} this
     */
    geotoolkit.data.DataSeries.prototype.setValues = function(array, copy){};
    /**
     * Removes a specified amount of values at the specified index.
     * @param {number} index the index number where to start removing the values
     * @param {number} [count=1] the amount of values to remove
     * @returns {geotoolkit.data.DataSeries} this
     */
    geotoolkit.data.DataSeries.prototype.removeValues = function(index, count){};
    /**
     * Clears all values of the data series.
     * @returns {geotoolkit.data.DataSeries} this
     */
    geotoolkit.data.DataSeries.prototype.clearValues = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeries.prototype.toArray = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeries.prototype.convertValues = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeries.prototype.getLength = function(){};
    /**
     * Sets unit of the data series.
     * @param {string|geotoolkit.util.AbstractUnit} [unit] unit to be set
     * @returns {geotoolkit.data.DataSeries} this
     */
    geotoolkit.data.DataSeries.prototype.setUnit = function(unit){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeries.prototype.getUnit = function(){};

/**
 * Define a generic read-only view of an underlying {@link geotoolkit.data.DataSeries} or {@link geotoolkit.data.DataSeriesView}.
 * A DataSeriesView allows unit conversion, pre- and post-processing and filtering.<br>
 *
 * @class geotoolkit.data.DataSeriesView
 * @augments geotoolkit.data.AbstractDataSeries
 * @param {geotoolkit.data.DataSeries|geotoolkit.data.DataSeriesView} data the original data series or data series view
 * @param {object} [options] options
 * @param {string} [options.unit] unit of the view
 * @param {function()} [options.preprocessor=null] pre-processor function. See setPreProcessor() method
 * @param {function()} [options.postprocessor=null] post-processor function. See setPostProcessor() method
 * @param {Array<function(index, value)|geotoolkit.data.DataSeriesView>} [options.filters] array of filters
 * @throws {Error} if data is not an instance of geotoolkit.data.DataSeries or geotoolkit.data.DataSeriesView
 */
geotoolkit.data.DataSeriesView = {};
    /**
     * DataSeriesView events.
     * @enum
     * @readonly
     */
    geotoolkit.data.DataSeriesView.Events = {};
        /**
         * FilterChanged
         * @type {string}
         */
        geotoolkit.data.DataSeriesView.Events.FilterChanged = "";
        /**
         * Rebuild
         * @type {string}
         */
        geotoolkit.data.DataSeriesView.Events.Rebuild = "";
    /**
     * FilterType.
     * @enum
     * @readonly
     */
    geotoolkit.data.DataSeriesView.FilterType = {};
        /**
         * General. Filter function can filter on both index and value.
         * @type {string}
         */
        geotoolkit.data.DataSeriesView.FilterType.General = "";
        /**
         * Value. Filter function can only filter value.
         * @type {string}
         */
        geotoolkit.data.DataSeriesView.FilterType.Value = "";
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeriesView.prototype.dispose = function(){};
    /**
     * Returns a clone of the data series view.
     * @returns {geotoolkit.data.DataSeriesView} clone
     */
    geotoolkit.data.DataSeriesView.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeriesView.prototype.getValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeriesView.prototype.getLength = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeriesView.prototype.getId = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeriesView.prototype.getName = function(){};
    /**
     * DataSeriesView does not support setName() method.
     * @override
     */
    geotoolkit.data.DataSeriesView.prototype.setName = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeriesView.prototype.getType = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeriesView.prototype.getProperty = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeriesView.prototype.getProperties = function(){};
    /**
     * Sets view unit of the data series view.
     * @param {string|geotoolkit.util.AbstractUnit} [unit] unit to set
     * @returns {geotoolkit.data.DataSeriesView}
     */
    geotoolkit.data.DataSeriesView.prototype.setUnit = function(unit){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataSeriesView.prototype.getUnit = function(){};
    /**
     * Returns view unit of the data series view. This method returns unit set through setUnit() method, which can be different from getUnit() if view unit is not convertable to data unit.
     * @returns {?geotoolkit.util.AbstractUnit}
     */
    geotoolkit.data.DataSeriesView.prototype.getViewUnit = function(){};
    /**
     * Sets pre-processor function. This processor will be called before filters.
     * @param {Function} [preProcessor] pre-processor function. The function must accept single value and array of values as parameter.
     * @returns {geotoolkit.data.DataSeriesView}
     */
    geotoolkit.data.DataSeriesView.prototype.setPreProcessor = function(preProcessor){};
    /**
     * Returns pre-processor function.
     * @returns {Function}
     */
    geotoolkit.data.DataSeriesView.prototype.getPreProcessor = function(){};
    /**
     * Sets post-processor function. This processor will be called after filters.
     * @param {Function} [postProcessor] post-processor function. The function must accept single value and array of values as parameter.
     * @returns {geotoolkit.data.DataSeriesView}
     */
    geotoolkit.data.DataSeriesView.prototype.setPostProcessor = function(postProcessor){};
    /**
     * Returns post-processor function.
     * @returns {Function}
     */
    geotoolkit.data.DataSeriesView.prototype.getPostProcessor = function(){};
    /**
     * Synchronizes internal mapping for filters.
     * @protected
     */
    geotoolkit.data.DataSeriesView.prototype.synchronize = function(){};
    /**
     * @override
     */
    geotoolkit.data.DataSeriesView.prototype.toArray = function(){};
    /**
     * @override
     */
    geotoolkit.data.DataSeriesView.prototype.convertValues = function(){};
    /**
     * Return the array of value filters as functions or geotoolkit.data.DataSeriesView.
     * @returns {Array<geotoolkit.data.DataSeriesView|function()>}
     */
    geotoolkit.data.DataSeriesView.prototype.getFilters = function(){};
    /**
     * Adds a value filter to the end of existing filters.
     * @param {function()|geotoolkit.data.DataSeriesView|object} filter filter function or DataSeriesView.
     * If DataSeriesView specified, changes from DataSeriesView might not be applied.
     * @param {geotoolkit.data.DataSeriesView.FilterType} [filterType=geotoolkit.data.DataSeriesView.FilterType.General] filter type.
     * Value type filter only filters by value and index passed in will be null. Value type filter will be optimized.
     * @returns {geotoolkit.data.DataSeriesView} this
     */
    geotoolkit.data.DataSeriesView.prototype.addFilter = function(filter, filterType){};
    /**
     * Removes a value filter from the data series view.
     * @param {function()|geotoolkit.data.DataSeriesView} filter filter to remove
     * @returns {geotoolkit.data.DataSeriesView} this
     */
    geotoolkit.data.DataSeriesView.prototype.removeFilter = function(filter){};
    /**
     * Replaces an existing filter with a new filter.
     * @param {function()|geotoolkit.data.DataSeriesView|object} oldFilter old filter
     * @param {function()|geotoolkit.data.DataSeriesView|object} newFilter new filter
     * @param {geotoolkit.data.DataSeriesView.FilterType} [filterType=geotoolkit.data.DataSeriesView.FilterType.General] filter type
     * @returns {geotoolkit.data.DataSeriesView} this
     */
    geotoolkit.data.DataSeriesView.prototype.replaceFilter = function(oldFilter, newFilter, filterType){};
    /**
     * Clears all filters.
     * @returns {geotoolkit.data.DataSeriesView} this
     */
    geotoolkit.data.DataSeriesView.prototype.clearFilters = function(){};
    /**
     * @override
     * @returns {boolean} true
     */
    geotoolkit.data.DataSeriesView.prototype.isReadOnly = function(){};

/**
 * Define a numerical data interface
 * @interface
 */
geotoolkit.data.INumericalDataSeries = {};
    /**
     * Returns min value
     * @function
     * @abstract
     * @param {string} [unit=null] unit optional output unit to convert the data to (if none specified, data is not converted)
     * @returns {number} min
     */
    geotoolkit.data.INumericalDataSeries.prototype.getMin = function(unit){};
    /**
     * Returns max value
     * @function
     * @abstract
     * @param {string} [unit=null] unit optional output unit to convert the data to (if none specified, data is not converted)
     * @returns {number} max
     */
    geotoolkit.data.INumericalDataSeries.prototype.getMax = function(unit){};

/**
 * Define a numerical series of data
 *
 * @class geotoolkit.data.NumericalDataSeries
 * @augments geotoolkit.data.DataSeries
 * @implements {geotoolkit.data.INumericalDataSeries}
 * @param {object} [options] JSON options object
 * @param {number|string} [options.id] unique id of the series
 * @param {string} [options.name] name of the data series
 * @param {string|geotoolkit.util.AbstractUnit} [options.unit] unit of the data series
 * @param {Array<number>} [options.data] an array of data
 */
geotoolkit.data.NumericalDataSeries = {};
    /**
     * Adds a value to the data series.
     * @override
     * @param {number} value a new value
     * @returns {geotoolkit.data.NumericalDataSeries} this
     */
    geotoolkit.data.NumericalDataSeries.prototype.addValue = function(value){};
    /**
     * Adds an array of values to the data series.
     * @override
     * @param {Array<number>} array an array of values
     * @returns {geotoolkit.data.NumericalDataSeries} this
     */
    geotoolkit.data.NumericalDataSeries.prototype.addValues = function(array){};
    /**
     * Inserts a value at the specified index.
     * @override
     * @param {number} index the index number where to insert the value.
     * @param {number} value the value to insert
     * @returns {geotoolkit.data.NumericalDataSeries} this
     */
    geotoolkit.data.NumericalDataSeries.prototype.insertValue = function(index, value){};
    /**
     * Inserts an array of values at the specified index.
     * @override
     * @param {number} index the index number where to insert the values. Values will be added starting at the index number.
     * @param {Array<number>} array the array of values to insert
     * @returns {geotoolkit.data.NumericalDataSeries} this
     */
    geotoolkit.data.NumericalDataSeries.prototype.insertValues = function(index, array){};
    /**
     * Sets the value at given index.
     * @override
     * @param {number} index the index should be a number greater than or equal to zero, and less than the number of values as returned by getLength() method.
     * @param {number} value value to set
     * @returns {geotoolkit.data.NumericalDataSeries} this
     */
    geotoolkit.data.NumericalDataSeries.prototype.setValue = function(index, value){};
    /**
     * Sets an array of values to the data series.
     * @override
     * @param {Array<number>} array an array of values to set
     * @param {boolean} [copy=true] make a deep copy of the values
     * @returns {geotoolkit.data.NumericalDataSeries} this
     */
    geotoolkit.data.NumericalDataSeries.prototype.setValues = function(array, copy){};
    /**
     * Returns min value
     * @param {string} [unit=null] unit optional output unit to convert the data to (if none specified, data is not converted)
     * @returns {number} min
     */
    geotoolkit.data.NumericalDataSeries.prototype.getMin = function(unit){};
    /**
     * Returns max value
     * @param {string} [unit=null] unit optional output unit to convert the data to (if none specified, data is not converted)
     * @returns {number} max
     */
    geotoolkit.data.NumericalDataSeries.prototype.getMax = function(unit){};
    /**
     * @override
     */
    geotoolkit.data.NumericalDataSeries.prototype.convertValues = function(){};
    /**
     * @override
     */
    geotoolkit.data.NumericalDataSeries.prototype.getDataOrder = function(){};
    /**
     * Returns series as array of numbers. This method is for compatibility only.
     * @deprecated since 2.5. Use geotoolkit.data.NumericalDataSeries.toArray instead
     * @param {string} [unit=null] unit optional output unit to convert the data to (if none specified, data is not converted)
     * @returns {Array<number>}
     */
    geotoolkit.data.NumericalDataSeries.prototype.getData = function(unit){};
    /**
     * Returns whether the data is in ascending order. This method is for compatibility only.
     * @deprecated since 2.5. Use geotoolkit.data.NumericalDataSeries.getDataOrder instead
     * @returns {boolean}
     */
    geotoolkit.data.NumericalDataSeries.prototype.isAscendingData = function(){};

/**
 * Define a numerical customized readonly view of {@link geotoolkit.data.NumericalDataSeries} or {geotoolkit.data.NumericalDataSeriesView} for filtering,
 * and unit conversion
 *
 * @class geotoolkit.data.NumericalDataSeriesView
 * @augments geotoolkit.data.DataSeriesView
 * @implements geotoolkit.data.INumericalDataSeries
 * @param {geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} data an original data series or data series view
 * @param {object} [options] options
 * @param {string} [options.unit] unit of the view
 * @param {function()} [options.preprocessor=null] optional pre-processor function. (for example: converter to logarithmic mode) See setPreProcessor() method
 * @param {function()} [options.postprocessor=null] optional post-processor function. See setPostProcessor() method
 * @param {Array<function(index, value)|geotoolkit.data.NumericalDataSeriesView>} [options.filters] array of filters
 * @throws {Error} if data is not an instance of geotoolkit.data.NumericalDataSeries or geotoolkit.data.NumericalDataSeriesView
 */
geotoolkit.data.NumericalDataSeriesView = {};
    /**
     * Returns a clone of the numerical data series view.
     * @returns {geotoolkit.data.NumericalDataSeriesView} clone
     */
    geotoolkit.data.NumericalDataSeriesView.prototype.clone = function(){};
    /**
     * @override
     */
    geotoolkit.data.NumericalDataSeriesView.prototype.setUnit = function(){};
    /**
     * Sets pre-processor function. This processor will be called before filters.
     * @param {function()} [preProcessor] pre-processor function. The function must accept single value and array of values as parameter.
     * @returns {geotoolkit.data.NumericalDataSeriesView}
     * @override
     */
    geotoolkit.data.NumericalDataSeriesView.prototype.setPreProcessor = function(preProcessor){};
    /**
     * Sets post-processor function. This processor will be called after filters.
     * @param {function()} [postProcessor] post-processor function. The function must accept single value and array of values as parameter.
     * @returns {geotoolkit.data.NumericalDataSeriesView}
     * @override
     */
    geotoolkit.data.NumericalDataSeriesView.prototype.setPostProcessor = function(postProcessor){};
    /**
     * Gets min value
     * @param {string} [unit=null] unit optional output unit to convert the data to (if none specified, data is not converted)
     * @returns {number} min
     */
    geotoolkit.data.NumericalDataSeriesView.prototype.getMin = function(unit){};
    /**
     * Gets max value
     * @param {string} [unit=null] unit optional output unit to convert the data to (if none specified, data is not converted)
     * @returns {number} max
     */
    geotoolkit.data.NumericalDataSeriesView.prototype.getMax = function(unit){};
    /**
     * Return series as array of numbers. This method is for compatibility only.
     * @deprecated since 2.3
     * @param {string} [unit=null] unit optional output unit to convert the data to (if none specified, data is not converted)
     * @returns {Array<number>}
     */
    geotoolkit.data.NumericalDataSeriesView.prototype.getData = function(unit){};
    /**
     * @override
     */
    geotoolkit.data.NumericalDataSeriesView.prototype.getDataOrder = function(){};
    /**
     * Return true if data is ordered.This method is for compatibility only.
     * @deprecated since 2.3
     * @returns {boolean}
     */
    geotoolkit.data.NumericalDataSeriesView.prototype.isAscendingData = function(){};
    /**
     * @override
     */
    geotoolkit.data.NumericalDataSeriesView.prototype.convertValues = function(){};

/**
 * Provides a set of methods to operate with {@link geotoolkit.data.DataSeries}
 *
 * @class geotoolkit.data.DataSeriesUtil
 */
geotoolkit.data.DataSeriesUtil = {};
    /**
     * Remove values from start to end value of the index series and corresponded indices of the other series.
     * All series must have the same size.
     *
     * @param {geotoolkit.data.NumericalDataSeries} indexSeries series to represent index data
     * @param {number} startIndexValue start value of the index series where to start trim
     * @param {number} endIndexValue end value of the index series where to end trim
     * @param {Array.<geotoolkit.data.DataSeries>} arrayOfSeries array of data series
     * @param {geotoolkit.data.DataTable} [datatable] optional data table as a host of destination series
     * @throws {Error} if indexSeries is not {@link geotoolkit.data.NumericalDataSeries}
     */
    geotoolkit.data.DataSeriesUtil.trimValues = function(indexSeries, startIndexValue, endIndexValue, arrayOfSeries, datatable){};
    /**
     * Merge data series from source to destination
     * This function works ONLY if the existing data is ordered.
     *
     * @example
     * Depth Value
     * 50 0
     * 100 1
     * 200 2
     * 300 3
     *
     * mergeValues: [0,100,150,500], [-1,-100,-150,-500]
     *
     * ---- Depth Value
     * ===> 0 -1
     * ---- 50 0
     * ===> 100 -100
     * ===> 150 -150
     * ---- 200 2
     * ---- 300 3
     * ===> 500 -500
     *
     * @param {object} [src] object to represent source data
     * @param {geotoolkit.data.NumericalDataSeries} [src.index] series to represent index data of the source
     * @param {Array.<geotoolkit.data.DataSeries>} [src.series] array of input data series
     * @param {object} [dst] object to represent destination data
     * @param {geotoolkit.data.NumericalDataSeries} [dst.index] series to represent index data of the source
     * @param {Array.<geotoolkit.data.DataSeries>} [dst.series] array of data series
     * @param {geotoolkit.data.DataTable} [dst.datatable] optional data table as a host of destination series
     * @throws {Error} if src.index or dst.index is not {@link geotoolkit.data.NumericalDataSeries}
     */
    geotoolkit.data.DataSeriesUtil.mergeValues = function(src, dst){};

/**
 * Define data object as array.
 *
 * @class geotoolkit.data.ArrayData
 * @augments geotoolkit.data.NumericalDataSeries
 * @param {object} [options] - JSON Object
 * @param {array.<number>} options.data - array data
 * @param {string} options.name - name of the Array
 * @param {string} options.unit - unit of the Array
 */
geotoolkit.data.ArrayData = {};
    /**
     * return value at specified index
     * @param {number} index index at which value will be returned
     * @param {string} [unit=null] to convert the data to (if none specified, data is not converted)
     * @returns {number}
     */
    geotoolkit.data.ArrayData.prototype.getValue = function(index, unit){};
    /**
     * Sets array of data
     * @param {number[]} value array data
     * @returns {geotoolkit.data.ArrayData} this
     */
    geotoolkit.data.ArrayData.prototype.setData = function(value){};
    /**
     * @param {number} shift The shift to apply to the data
     * @returns {geotoolkit.data.ArrayData} this
     */
    geotoolkit.data.ArrayData.prototype.shift = function(shift){};
    /**
     * Add array of data
     * @param {number[]} value array of data
     * @returns {geotoolkit.data.ArrayData} this
     */
    geotoolkit.data.ArrayData.prototype.addData = function(value){};

/**
 * Define Abstract Data Model
 * @class geotoolkit.data.DataSource
 * @augments geotoolkit.util.EventDispatcher
 */
geotoolkit.data.DataSource = {};
    /**
     * DataSource's Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.data.DataSource.Events = {};
        /**
         * Event type fired on a State Change
         * @type {string}
         */
        geotoolkit.data.DataSource.Events.StateChanged = "";
    /**
     * begin transaction
     * @returns {geotoolkit.data.DataSource} this
     */
    geotoolkit.data.DataSource.prototype.beginUpdate = function(){};
    /**
     * end transaction
     * @returns {geotoolkit.data.DataSource}
     */
    geotoolkit.data.DataSource.prototype.endUpdate = function(){};
    /**
     * Add a child object
     *
     * @param {geotoolkit.data.DataObject | Array<geotoolkit.data.DataObject>} data the child data to be added
     * @returns {geotoolkit.data.DataSource} this
     */
    geotoolkit.data.DataSource.prototype.addChild = function(data){};
    /**
     * Remove child data object
     *
     * @param {geotoolkit.data.DataObject} data data to be removed
     * @returns {geotoolkit.data.DataSource} this
     */
    geotoolkit.data.DataSource.prototype.removeChild = function(data){};
    /**
     * Remove all child data
     */
    geotoolkit.data.DataSource.prototype.clearChildren = function(){};
    /**
     * Return data by index
     *
     * @param {number} i index of the data
     * @returns {geotoolkit.data.DataObject}
     */
    geotoolkit.data.DataSource.prototype.getChild = function(i){};
    /**
     * Return number of child data
     *
     * @returns {number}
     */
    geotoolkit.data.DataSource.prototype.getChildrenCount = function(){};
    /**
     * Query data object items
     * @returns {object}
     */
    geotoolkit.data.DataSource.prototype.query = function(){};
    /**
     * Load a part of the data
     * @returns {geotoolkit.data.DataSource} this
     */
    geotoolkit.data.DataSource.prototype.update = function(){};

/**
 * Define a data table as a collection of data series defined as columns in the
 * table. This code is inspired by google table.
 * <p>
 * The data table can be read only, which means that each column is immutable,
 * but it is still possible to add or remove columns.
 * </p>
 *
 * @class geotoolkit.data.DataTable
 * @augments geotoolkit.util.EventDispatcher
 * @example Example how to create a table
 * datatable = new geotoolkit.data.DataTable({
 * cols: [
 * { name: 'col1', type: 'number'},
 * { name: 'col2', type: 'number'}
 * ]
 * });
 * @param {object} data parameters
 * @param {object} [data.meta=null] a map of meta information properties
 * @param {function(description)} [data.columnFactory=null] a custom factory to create a new data series from JSON object
 * @param {Array<geotoolkit.data.DataSeries|object>} [data.cols=null] an array of series to represents columns. All columns must have the same number of rows
 * @param {Array<Array<object>>|number} [data.rowsdata=null] an array of rows or a number of empty rows to add
 * @param {Array<Array<object>>} [data.colsdata=null] an array of columns data to add. Will be ignored if rowsdata is not null
 */
geotoolkit.data.DataTable = {};
    /**
     * DataTable events.
     * @enum
     * @readonly
     */
    geotoolkit.data.DataTable.Events = {};
        /**
         * ColumnsAdding
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.ColumnsAdding = "";
        /**
         * ColumnsAdded
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.ColumnsAdded = "";
        /**
         * ColumnsRemoving
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.ColumnsRemoving = "";
        /**
         * ColumnsRemoved
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.ColumnsRemoved = "";
        /**
         * ColumnsSet
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.ColumnsSet = "";
        /**
         * RowsAdding
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.RowsAdding = "";
        /**
         * RowsAdded
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.RowsAdded = "";
        /**
         * RowsRemoving
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.RowsRemoving = "";
        /**
         * RowsRemoved
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.RowsRemoved = "";
        /**
         * ValuesSet
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.ValuesSet = "";
        /**
         * Disposing
         * @type {string}
         */
        geotoolkit.data.DataTable.Events.Disposing = "";
    /**
     * @override
     */
    geotoolkit.data.DataTable.prototype.dispose = function(){};
    /**
     * Returns a clone of the data table.
     * @param {boolean} [copyData=false] copy data
     * @returns {geotoolkit.data.DataTable} clone
     */
    geotoolkit.data.DataTable.prototype.clone = function(copyData){};
    /**
     * Adds a new column to the data table.
     * @param {geotoolkit.data.DataSeries|object} column a geotoolkit.data.DataSeries object or a JSON object containing descriptions.
     * @param {number|string} [column.id] unique id of the data series
     * @param {string} [column.name] name of the data series
     * @param {string} [column.type='object'] a JavaScript type of the data series
     * @param {string|geotoolkit.util.AbstractUnit} [column.unit] unit of the data series
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.addColumn = function(column){};
    /**
     * Returns the column at the specified index.
     * @param {number} columnIndex column index
     * @returns {geotoolkit.data.DataSeries}
     */
    geotoolkit.data.DataTable.prototype.getColumn = function(columnIndex){};
    /**
     * Removes the column at the specified index.
     * @deprecated since 2.4
     * @param {number} columnIndex column index to remove
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.removeColumn = function(columnIndex){};
    /**
     * Removes column(s) at the specified index.
     * @param {number} columnIndex column index to remove
     * @param {number} [numberOfColumns=1] number of columns to remove
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.removeColumns = function(columnIndex, numberOfColumns){};
    /**
     * Inserts a column at specified index.
     * @param {number} columnIndex column index to insert
     * @param {geotoolkit.data.DataSeries|object} column column
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.insertColumn = function(columnIndex, column){};
    /**
     * Returns the index of specified column.
     * @param {geotoolkit.data.DataSeries} column column
     * @returns {number} index
     */
    geotoolkit.data.DataTable.prototype.indexOfColumn = function(column){};
    /**
     * Fills data table with specified array of column data.
     * @param {Array<Array<object>>} columnsArray array of values by column
     * @returns {geotoolkit.data.DataTable} this
     * @example How to fill table with two columns
     * datatable.fillTable([[10, 20, 30, 50], [30, 40, 30, 50]]);
     */
    geotoolkit.data.DataTable.prototype.fillTable = function(columnsArray){};
    /**
     * Adds a new row to the data table.
     * @param {Array<object>} cellArray array of cells
     * @param {boolean} [ignoreMissingValue] ignore missing value
     * @returns {geotoolkit.data.DataTable} this
     * @example How to add a new row to a four-column data table
     * datatable.addRow([10, 20, 30, 50]);
     */
    geotoolkit.data.DataTable.prototype.addRow = function(cellArray, ignoreMissingValue){};
    /**
     * Adds new rows to the data table. This method can be called to create new empty rows, or with data used to populate the rows
     * @param {Array<Array<object>>|number} rowsArray rows data or a number of empty rows to add
     * @param {boolean} [ignoreMissingValue] ignore missing value
     * @returns {geotoolkit.data.DataTable} this
     * @example How to add two rows to a three-column data table
     * datatable.addRows([[10, 20, 30], [50, 70, 100]]);
     */
    geotoolkit.data.DataTable.prototype.addRows = function(rowsArray, ignoreMissingValue){};
    /**
     * Insert a row at the specified row index
     * @param {number} rowIndex index number where to insert the new row
     * @param {Array<object>} cellArray array of cells
     * @returns {geotoolkit.data.DataTable} this
     * @example How to insert a row at index 10 to a four-column data table
     * datatable.insertRow(10, [10, 20, 30, 50]);
     */
    geotoolkit.data.DataTable.prototype.insertRow = function(rowIndex, cellArray){};
    /**
     * Returns an array of values at specified row index.
     * @param {number} rowIndex index of the row. It should be a number greater than or equal to zero, and less than
     * the number of rows as returned by the getNumberOfRows() method.
     * @param {Array<object>} [cells=null] optional array to fill values
     * @returns {Array<object>} array of values
     */
    geotoolkit.data.DataTable.prototype.getRow = function(rowIndex, cells){};
    /**
     * Returns the value of the cell at given row and column index.
     * @param {number} rowIndex index of the row. It should be a number greater than or equal to zero, and less than
     * the number of rows as returned by the getNumberOfRows() method.
     * @param {number} columnIndex index of the column. should be a number greater than or equal to zero, and less
     * than the number of columns as returned by the getNumberOfColumns() method.
     * @returns {?object}
     */
    geotoolkit.data.DataTable.prototype.getValue = function(rowIndex, columnIndex){};
    /**
     * Sets the value of the cell at given row and column index.
     * @param {number} rowIndex index of the row. It should be a number greater than or equal to zero, and less than
     * the number of rows as returned by the getNumberOfRows() method.
     * @param {number} columnIndex index of the column. should be a number greater than or equal to zero, and less
     * than the number of columns as returned by the getNumberOfColumns() method.
     * @param {object} [value] a value to be set to the cell.
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.setValue = function(rowIndex, columnIndex, value){};
    /**
     * Sets an array of values at specified column index.
     * @param {number} columnIndex index of the column
     * @param {Array<object>} cellArray array of values to set
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.setColumnValues = function(columnIndex, cellArray){};
    /**
     * Returns the number of columns in the data table.
     * @returns {number} number of columns
     */
    geotoolkit.data.DataTable.prototype.getNumberOfColumns = function(){};
    /**
     * Returns the number of rows in the data table.
     * @returns {number} number of rows
     */
    geotoolkit.data.DataTable.prototype.getNumberOfRows = function(){};
    /**
     * Removes row from all columns in the data table.
     * @deprecated since 2.4, use DataTable.removeRows() instead
     * @param {number} rowIndex the index number where to start removing the rows
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.removeRow = function(rowIndex){};
    /**
     * Removes row(s) from all columns in the data table.
     * @param {number} rowIndex the index number where to start removing the rows
     * @param {number} [numberOfRows=1] the amount of rows to remove
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.removeRows = function(rowIndex, numberOfRows){};
    /**
     * Clears all cells of the data table.
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.clear = function(){};
    /**
     * Notify if data is changed
     * @param {object} [args] event args
     * @fires geotoolkit.data.Events#Updated
     * @returns {geotoolkit.data.DataTable}
     */
    geotoolkit.data.DataTable.prototype.update = function(args){};
    /**
     * Returns column by specified identifier. If multiple columns have the same identifier, the first one will be returned.
     * @param {number|string} id identifier of the column
     * @returns {?geotoolkit.data.DataSeries} a column
     */
    geotoolkit.data.DataTable.prototype.getColumnById = function(id){};
    /**
     * Returns column by specified name. If multiple columns have the same name, the first one will be returned.
     * @param {string} name name of the column
     * @returns {?geotoolkit.data.DataSeries} a column
     */
    geotoolkit.data.DataTable.prototype.getColumnByName = function(name){};
    /**
     * Returns the map of all properties of specified column.
     * @param {number} columnIndex index of the column
     * @returns {object}
     */
    geotoolkit.data.DataTable.prototype.getColumnProperties = function(columnIndex){};
    /**
     * Sets properties of specified column.
     * @param {number} columnIndex index of the column
     * @param {object} properties a map of properties for the specified column.
     * All properties will be merged with existing ones.
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.setColumnProperties = function(columnIndex, properties){};
    /**
     * Returns the map of all meta data of the data table. This method returns the reference to the meta data.
     * @returns {object}
     */
    geotoolkit.data.DataTable.prototype.getMetaData = function(){};
    /**
     * Sets the map of all meta data of the data table.
     * @param {object} meta meta data
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.setMetaData = function(meta){};
    /**
     * Sorting of DataTable
     * @param {number} [column = 0] Identifier of Column
     * @param {function} comparator comparator function that return postive, negative and zero based on condition.
     * @returns {geotoolkit.data.DataTable} this
     */
    geotoolkit.data.DataTable.prototype.sort = function(column, comparator){};
    /**
     * Query data item and child items by different conditions
     * @returns {object} query object which has methods 'where' tp specify conditions, 'select' to run query,
     * 'selectToArray' select results to array
     * Expressions syntax:
     * "item => expression", where expression:
     * - logical and arithmetic operators
     * - embedded functions:
     * name(item) - gets name of the data object
     * url(item) - gets url of the data object
     * type(item) - gets type of the data object
     * @example
     * // Select by function
     * table.query()
     * .where( function(item){ return item.getParent() == dataobject })
     * .where( function(item){ return item.getUri() == "item2" })
     * .select(function(item) {
     * found_item = item;
     * });
     *@example
     * // Select by expression
     * table.query()
     * .where('item => uri(item) == "item2_1"')
     * .select(function(item) {
     * found_item = item;
     * });
     */
    geotoolkit.data.DataTable.prototype.query = function(){};

/**
 * A read-only view of an underlying DataTable.
 * A DataTableView allows selection of only a subset of the columns.
 * It also allows reordering columns and duplicating columns.<br>
 * A DataTableView is a "view" of a datasource {@link geotoolkit.data.DataTable} . To add data, you will have to do so to the original {@link geotoolkit.data.DataTable}.<br>
 * Please refer to the example below for a way to create and use DataTableView.
 * @example
 * //Create a DataTable
 * var dataTable = new geotoolkit.data.DataTable({ 'cols': [
 * {'type': 'number', 'data': indicesArray},
 * {'type': 'number', 'data': valuesArray}
 * ]});
 * dataTable.getColumn(0).setUnit(indexunit);
 * dataTable.getColumn(1).setUnit(valueunit);
 * //
 * //Create a DataTableView of the DataTable
 * var dataTableView = new geotoolkit.data.DataTableView(dataTable);
 * //
 * //user can modify the data in the original DataTable using the API of the DataTable
 * //addRow, addRows, removeRow, insertRow
 *
 * @class geotoolkit.data.DataTableView
 * @augments geotoolkit.util.EventDispatcher
 * @param {geotoolkit.data.DataTable|geotoolkit.data.DataTableView} dataTable
 */
geotoolkit.data.DataTableView = {};
    /**
     * DataTableView events.
     * @enum
     * @readonly
     */
    geotoolkit.data.DataTableView.Events = {};
        /**
         * Rebuild
         * @type {string}
         */
        geotoolkit.data.DataTableView.Events.Rebuild = "";
    /**
     * Dispose data table view object.
     */
    geotoolkit.data.DataTableView.prototype.dispose = function(){};
    /**
     * Returns number of columns.
     * @returns {number}
     */
    geotoolkit.data.DataTableView.prototype.getNumberOfColumns = function(){};
    /**
     * Returns number of rows.
     * @returns {number}
     */
    geotoolkit.data.DataTableView.prototype.getNumberOfRows = function(){};
    /**
     * Returns the columns in this view. Identical array will be returned after calling setColumns().
     * @returns {Array<number>}
     */
    geotoolkit.data.DataTableView.prototype.getViewColumns = function(){};
    /**
     * Get data table
     * @returns {geotoolkit.data.DataTable|geotoolkit.data.DataTableView} data table
     */
    geotoolkit.data.DataTableView.prototype.getDataTable = function(){};
    /**
     * Sets visible columns indexes. Any columns not specified will be hidden.
     * @param {Array<number>} columnIndexes array of column indexes
     * @returns {geotoolkit.data.DataTableView}
     */
    geotoolkit.data.DataTableView.prototype.setColumns = function(columnIndexes){};
    /**
     * Returns a column by index.
     * @param {number} columnIndex index of column
     * @returns {geotoolkit.data.DataSeriesView}
     */
    geotoolkit.data.DataTableView.prototype.getColumn = function(columnIndex){};
    /**
     * Returns the index of the column
     * @param {geotoolkit.data.DataSeriesView} column instance of column
     * @returns {number} index
     */
    geotoolkit.data.DataTableView.prototype.indexOfColumn = function(column){};
    /**
     * Return the value of a cell.
     * @param {number} rowIndex index of the row. It should be a number greater than or equal to zero, and less than
     * the number of rows as returned by the getNumberOfRows() method.
     * @param {number} columnIndex index of the column. should be a number greater than or equal to zero, and less
     * than the number of columns as returned by the getNumberOfColumns() method.
     * @returns {object}
     **/
    geotoolkit.data.DataTableView.prototype.getValue = function(rowIndex, columnIndex){};
    /**
     * Return a first column by id
     * @param {number|string} id id of the column
     * @returns {?geotoolkit.data.DataSeriesView} a column
     */
    geotoolkit.data.DataTableView.prototype.getColumnById = function(id){};
    /**
     * Return a first column by name
     * @param {string} name name of the column
     * @returns {?geotoolkit.data.DataSeriesView} a column
     */
    geotoolkit.data.DataTableView.prototype.getColumnByName = function(name){};
    /**
     * Returns a map of all properties for the specified column.
     * @param {number} columnIndex index of the column
     * @returns {object}
     */
    geotoolkit.data.DataTableView.prototype.getColumnProperties = function(columnIndex){};
    /**
     * Returns a map of all data properties for the current table.
     * This method returns a reference to meta data information
     * @returns {object}
     */
    geotoolkit.data.DataTableView.prototype.getMetaData = function(){};
    /**
     * Query data item and child items by different conditions
     * @returns {object} query object which has methods 'where' tp specify conditions, 'select' to run query,
     * 'selectToArray' select results to array
     * Expressions syntax:
     * "item => expression", where expression:
     * - logical and arithmetic operators
     * - embedded functions:
     * name(item) - gets name of the data object
     * url(item) - gets url of the data object
     * type(item) - gets type of the data object
     * @example
     * // Select by function
     * table.query()
     * .where( function(item){ return item.getParent() == dataobject })
     * .where( function(item){ return item.getUri() == "item2" })
     * .select(function(item) {
     * found_item = item;
     * });
     *@example
     * // Select by expression
     * table.query()
     * .where('item => uri(item) == "item2_1"')
     * .select(function(item) {
     * found_item = item;
     * });
     */
    geotoolkit.data.DataTableView.prototype.query = function(){};

/**
 * Define DataBinding
 *
 * @class geotoolkit.data.DataBinding
 */
geotoolkit.data.DataBinding = {};
    /**
     * Check if connector accepts node
     * @function
     * @abstract
     * @param {geotoolkit.scene.Node} node instance to apply the databinding to
     */
    geotoolkit.data.DataBinding.prototype.accept = function(node){};
    /**
     * Bind data
     * @function
     * @abstract
     * @param {geotoolkit.scene.Node} node instance to apply the databinding to
     * @param {object} data data to bind to the node
     */
    geotoolkit.data.DataBinding.prototype.bind = function(node, data){};
    /**
     * Unbind data
     * @function
     * @abstract
     * @param {geotoolkit.scene.Node} node instance to apply the databinding to
     * @param {object} data data to bind to the node
     */
    geotoolkit.data.DataBinding.prototype.unbind = function(node, data){};

/**
 * Define DataBindingRegistry
 *
 * @class geotoolkit.data.DataBindingRegistry
 * @augments geotoolkit.data.DataBinding
 */
geotoolkit.data.DataBindingRegistry = {};
    /**
     * Add a data connector
     * @param {geotoolkit.data.DataBinding} connector binding between node and data
     * @returns {geotoolkit.data.DataBindingRegistry}
     */
    geotoolkit.data.DataBindingRegistry.prototype.add = function(connector){};
    /**
     * Return connector by index
     *
     * @param {number} i
     * index of the node
     * @returns {geotoolkit.data.DataBinding}
     */
    geotoolkit.data.DataBindingRegistry.prototype.getConnector = function(i){};
    /**
     * Return number of connectors
     *
     * @returns {number}
     */
    geotoolkit.data.DataBindingRegistry.prototype.getCount = function(){};
    /**
     * Remove data connector
     * @param {geotoolkit.data.DataBinding} connector binding between node and data
     * @returns {geotoolkit.data.DataBindingRegistry}
     */
    geotoolkit.data.DataBindingRegistry.prototype.remove = function(connector){};
    /**
     * Check if binding accept node
     * @param {geotoolkit.scene.Node} node node to check
     * @returns {boolean}
     */
    geotoolkit.data.DataBindingRegistry.prototype.accept = function(node){};
    /**
     * Unbind data
     * @param {geotoolkit.scene.Node} node instance to apply the databinding to
     * @param {object} data data to bind to the node
     */
    geotoolkit.data.DataBindingRegistry.prototype.bind = function(node, data){};
    /**
     * Disconnect data
     * @param {geotoolkit.scene.Node} node instance to apply the databinding to
     * @param {object} data data to bind to the node
     */
    geotoolkit.data.DataBindingRegistry.prototype.unbind = function(node, data){};
    /**
     * Return default instance of the registry
     * @returns {geotoolkit.data.DataBindingRegistry} registry
     */
    geotoolkit.data.DataBindingRegistry.getInstance = function(){};

/**
 * Define resolver of the links
 * @class geotoolkit.data.ILinkResolver
 */
geotoolkit.data.ILinkResolver = {};
    /**
     * @this {geotoolkit.data.ILinkResolver}
     */
    geotoolkit.data.ILinkResolver.prototype = {};
    /**
     * Accept data link
     * @function
     * @abstract
     * @param {string} data data link
     * @returns {boolean} true if link is supported and false if link is not supported
     */
    geotoolkit.data.ILinkResolver.prototype.accept = function(data){};
    /**
     * Resolve data link
     * @function
     * @abstract
     * @param {string} data data link
     */
    geotoolkit.data.ILinkResolver.prototype.resolve = function(data){};

/**
 * Define link resolver registry
 * @class geotoolkit.data.LinkResolverRegistry
 * @augments geotoolkit.util.EventDispatcher
 */
geotoolkit.data.LinkResolverRegistry = {};
    /**
     * Link resolver registry events
     * @enum
     * @readonly
     */
    geotoolkit.data.LinkResolverRegistry.Events = {};
        /**
         * ResolverRegistered
         * @type {number}
         */
        geotoolkit.data.LinkResolverRegistry.Events.ResolverRegistered = NaN;
    /**
     * Registers a link resolver
     * @param {geotoolkit.data.ILinkResolver} provider provider to register
     */
    geotoolkit.data.LinkResolverRegistry.prototype.register = function(provider){};
    /**
     * Returns resolver, which accepts data
     * @param {string} data data to accept
     * @returns {?geotoolkit.data.ILinkResolver} a provider which accepts
     */
    geotoolkit.data.LinkResolverRegistry.prototype.getResolver = function(data){};
    /**
     * Returns instance of the registry
     * @returns {geotoolkit.data.LinkResolverRegistry} registry
     */
    geotoolkit.data.LinkResolverRegistry.getInstance = function(){};
    /**
     * Registers resolver
     * @param {geotoolkit.data.ILinkResolver} provider provider to register
     */
    geotoolkit.data.LinkResolverRegistry.registerResolver = function(provider){};

/**
 * Define a set of tables to make requests, manage allocated memory,
 * merge received data samples
 * <p>
 * Data source can contain several data tables with different data ranges. Each table has a virtual
 * range, which usually contains a full data range on server. If method fetch is called then data set verifies
 * if data is already exist. If data is not exists then it makes request to retrieve a data range. If data set receives
 * a new data it merges existing data table with new data and keeps a valid range. if data is not received then it
 * marks invalid range and it can be updated the next time. In the same time data set tracks allocated memory and deallocate
 * automatically old ranges.
 * </p>
 *
 * @class geotoolkit.data.DataSet
 * @augments geotoolkit.data.DataSource
 * @example How to provide data
 * dataset.on(geotoolkit.data.Events.DataFetching, function (event, sender, args) {
 * var data = [[500, 600],[0.5, 0.7],[100, 200]];
 * args['callback'](null, [data]);
 * });
 * dataset.fetch(new geotoolkit.util.Range(1000, 2000), 5);
 * @param {object} [options=null] parameters
 * @param {number} [options.autoupdateinterval=100] auto update interval in ms
 * @param {number} [options.numberofparallelrequests=5] number of parallel requests
 * @param {number} [options.requestwindowmultiplier=0.5] extend of requested range
 * @param {number} [options.maxmemory=2] maximum memory for all data table in Mb
 * @param {boolean} [options.decimation=true] support decimation with requests
 * @param {boolean} [options.cleartableonscale=false] clear requested data range in the tables before making fetch and scale is changed. If it is false then
 * range will be clean before making request overwise it is cleaned then new data is arrived. This option works only if decimation is enabled.
 */
geotoolkit.data.DataSet = {};
    /**
     * Add a new data table to data set
     *
     * @param {geotoolkit.data.DataTable} table a table to add
     * @param {geotoolkit.util.Range} range a virtual range on the server
     * @param {string} [indexColumnName] name of column used for Index data
     * @throws {Error} if table is null or range is null or table has less then one column
     * @returns {geotoolkit.data.DataSet} this
     */
    geotoolkit.data.DataSet.prototype.addTable = function(table, range, indexColumnName){};
    /**
     * Remove table from data set
     * @param {geotoolkit.data.DataTable} table table to be removed
     * @returns {geotoolkit.data.DataSet} this
     */
    geotoolkit.data.DataSet.prototype.removeTable = function(table){};
    /**
     * Remove table from data set by index
     * @param {number} index index of the table to be removed
     * @throws {Error} if index is out of range
     * @returns {geotoolkit.data.DataSet} this
     */
    geotoolkit.data.DataSet.prototype.removeTableAt = function(index){};
    /**
     * Returns number of tables
     * @returns {number} number of tables
     */
    geotoolkit.data.DataSet.prototype.getNumberOfTables = function(){};
    /**
     * Return data table by index
     * @param {number} index index of table
     * @throws {Error} if index is out of range
     * @returns {geotoolkit.data.DataTable} data table
     */
    geotoolkit.data.DataSet.prototype.getTable = function(index){};
    /**
     * Return data range by index
     * @param {number} index index of table
     * @throws {Error} if index is out of range
     * @returns {geotoolkit.util.Range} data table
     */
    geotoolkit.data.DataSet.prototype.getIndexRange = function(index){};
    /**
     * Sets data range by index
     * @param {number} index index of table
     * @param {geotoolkit.util.Range} range a virtual range on the server
     * @throws {Error} if index is out of range
     * @returns {geotoolkit.data.DataSet} this
     */
    geotoolkit.data.DataSet.prototype.setIndexRange = function(index, range){};
    /**
     * Invalid a data range of the specified table
     * @param {number} index index of table
     * @param {geotoolkit.util.Range} [range=null] range to invalidate
     * @param {boolean} [clearData=true] clear rows of data table
     * @throws {Error} if index is out of range
     * @returns {geotoolkit.data.DataSet} this
     */
    geotoolkit.data.DataSet.prototype.invalidateTableRange = function(index, range, clearData){};
    /**
     * Invalid a data range of all tables
     * @param {geotoolkit.util.Range} [range=null] range to invalidate
     * @param {boolean} [clearData=true] clear rows of data table
     */
    geotoolkit.data.DataSet.prototype.invalidateRange = function(range, clearData){};
    /**
     * Gets index column for the specified table
     * @param {number} index index of table
     * @throws {Error} if index is out of range
     * @returns {?geotoolkit.data.DataSeries}
     */
    geotoolkit.data.DataSet.prototype.getIndexColumn = function(index){};
    /**
     * Return a union data range by all tables
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.data.DataSet.prototype.getFullIndexRange = function(){};
    /**
     * Update data from data base
     */
    geotoolkit.data.DataSet.prototype.update = function(){};
    /**
     * Enable / disable decimation
     * @param {boolean} enabled enable decimation
     * @returns {geotoolkit.data.DataSet} this
     */
    geotoolkit.data.DataSet.prototype.enableDecimation = function(enabled){};
    /**
     * Returns status if decimation is enabled
     * @returns {boolean}
     */
    geotoolkit.data.DataSet.prototype.isDecimationEnabled = function(){};
    /**
     * Fetch data for all tables from the source. This method can modify existing data
     *
     * @param {geotoolkit.util.Range} limits data range to fetch
     * @param {number} scale current scale factor
     * @returns {geotoolkit.data.DataSet} this
     */
    geotoolkit.data.DataSet.prototype.fetch = function(limits, scale){};
    /**
     * Fetch data table from the source. This method can modify existing data
     *
     * @param {number} index index of the table
     * @param {geotoolkit.util.Range} limits data range to fetch
     * @param {number} scale current scale factor
     * @throws {Error} if index is out of range
     * @returns {geotoolkit.data.DataSet} this
     */
    geotoolkit.data.DataSet.prototype.fetchTable = function(index, limits, scale){};
    /**
     * Clear the current data
     * @param {?geotoolkit.util.Range} [limits] limits that has been released
     * @returns {geotoolkit.data.DataSet} this
     */
    geotoolkit.data.DataSet.prototype.clearAllTables = function(limits){};
    /**
     * Fetch data range.
     * @protected
     * @param {Array.<geotoolkit.data.DataTable>} tables an array of updating tables
     * @param {geotoolkit.util.Range} limits limits
     * @param {number} scale scale
     * @param {function(err,arrayOfDataTablesCells)} callback callback function to return a result of query
     */
    geotoolkit.data.DataSet.prototype.fetchDataRange = function(tables, limits, scale, callback){};
    /**
     * Dispose.
     */
    geotoolkit.data.DataSet.prototype.dispose = function(){};

/**
 * Represent a processed data sample
 *
 * @class geotoolkit.data.DataSample
 * @param {number} position position
 * @param {number} value value
 * @param {number} [level=0] level
 * @param {boolean} [valid=true] valid or not
 * @param {number} [srcIndex] source index
 */
geotoolkit.data.DataSample = {};
    /**
     * Check if sample is null
     * @returns {boolean}
     */
    geotoolkit.data.DataSample.prototype.isNull = function(){};
    /**
     * Sets position
     * @param {number} position position
     * @returns {geotoolkit.data.DataSample} this
     */
    geotoolkit.data.DataSample.prototype.setPosition = function(position){};
    /**
     * Return position
     * @returns {number}
     */
    geotoolkit.data.DataSample.prototype.getPosition = function(){};
    /**
     * Returns original value of the sample
     * @protected
     * @returns {number}
     */
    geotoolkit.data.DataSample.prototype.getOriginalValue = function(){};
    /**
     * Sets value of the sample
     * @param {number} value value
     * @returns {geotoolkit.data.DataSample} this
     */
    geotoolkit.data.DataSample.prototype.setValue = function(value){};
    /**
     * Returns value of the sample
     * @returns {number}
     */
    geotoolkit.data.DataSample.prototype.getValue = function(){};
    /**
     * Sets wrap level
     * @param {number} level level
     * @returns {geotoolkit.data.DataSample} this
     */
    geotoolkit.data.DataSample.prototype.setLevel = function(level){};
    /**
     * Return level of the wrap
     * @returns {number}
     */
    geotoolkit.data.DataSample.prototype.getLevel = function(){};
    /**
     * Sets status of the sample
     * @param {boolean} valid valid
     * @returns {geotoolkit.data.DataSample} this
     */
    geotoolkit.data.DataSample.prototype.setValid = function(valid){};
    /**
     * Return sample status
     * @returns {boolean}
     */
    geotoolkit.data.DataSample.prototype.getValid = function(){};
    /**
     * Sets original index
     * @param {number} srcIndex src index
     * @returns {geotoolkit.data.DataSample} this
     */
    geotoolkit.data.DataSample.prototype.setOriginalIndex = function(srcIndex){};
    /**
     * Get original index in the data set
     * @returns {number}
     */
    geotoolkit.data.DataSample.prototype.getOriginalIndex = function(){};
    /**
     * Create clone
     * @returns {geotoolkit.data.DataSample} clone
     */
    geotoolkit.data.DataSample.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.data.DataSample.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.position] position
     * @param {number} [properties.value] value
     * @param {number} [properties.level] level
     * @param {boolean} [properties.valid] valid
     * @param {number} [properties.index] src index
     * @returns {geotoolkit.data.DataSample}
     */
    geotoolkit.data.DataSample.prototype.setProperties = function(properties){};

/**
 * Defines two arrays depths and values of samples
 * @class geotoolkit.data.DataValueArray
 * @param {geotoolkit.data.DataSample[]} samples array of {@link geotoolkit.data.DataSample} elements
 */
geotoolkit.data.DataValueArray = {};
    /**
     * @param {geotoolkit.data.DataSample[]} samples samples
     * @returns {geotoolkit.data.DataValueArray} this
     */
    geotoolkit.data.DataValueArray.prototype.setSamples = function(samples){};
    /**
     * @returns {geotoolkit.data.DataSample[]}
     */
    geotoolkit.data.DataValueArray.prototype.getSamples = function(){};
    /**
     * Set index of sample which is interpolated
     * @param {number} index index of the sample, which was interpolated
     * @protected
     * @returns {geotoolkit.data.DataValueArray} this
     */
    geotoolkit.data.DataValueArray.prototype.setLastInterpolatedIndex = function(index){};
    /**
     * @param {number} minWrapLevel min wrap level
     * @returns {geotoolkit.data.DataValueArray} this
     */
    geotoolkit.data.DataValueArray.prototype.setMinWrapLevel = function(minWrapLevel){};
    /**
     * @param {number} maxWrapLevel max wrap level
     * @returns {geotoolkit.data.DataValueArray} this
     */
    geotoolkit.data.DataValueArray.prototype.setMaxWrapLevel = function(maxWrapLevel){};
    /**
     * Return minimum wrap level. By default it is 0
     *
     * @returns {number}
     */
    geotoolkit.data.DataValueArray.prototype.getMinWrapLevel = function(){};
    /**
     * Return maximum wrap level. By default it is 0
     *
     * @returns {number}
     */
    geotoolkit.data.DataValueArray.prototype.getMaxWrapLevel = function(){};
    /**
     * Get index of sample, which is interpolated
     * @returns {number}
     * @protected
     */
    geotoolkit.data.DataValueArray.prototype.getLastInterpolatedIndex = function(){};
    /**
     * Create a deep copy
     *
     * @returns {geotoolkit.data.DataValueArray} clone
     */
    geotoolkit.data.DataValueArray.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.data.DataValueArray.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.data.DataSample[]} [properties.samples] samples
     * @param {number} [properties.minwraplevel] min wrap level
     * @param {number} [properties.maxwraplevel] max wrap level
     * @returns {geotoolkit.data.DataValueArray}
     */
    geotoolkit.data.DataValueArray.prototype.setProperties = function(properties){};

/**
 * The DataConversion interface class defines the base conversion operations
 * that must be implemented by all conversion objects. Conversion
 * objects are used to modify the values before being sent to the rendering system.
 * Conversion objects simply modify
 * the flow of data values from their current coordinate system to a new
 * coordinate system. This destination coordinate system may be another linear
 * coordinate system or a non-linear mapping like logarithmic. Conversion
 * objects are only associated with the value component of data
 * source. The position component of data source is never modified.
 *
 * @class geotoolkit.data.DataConversion
 */
geotoolkit.data.DataConversion = {};
    /**
     * Direct convert
     * @function
     * @abstract
     * @param {number} v value to convert
     * @returns {number}
     * @throws {Error} when invoked to indicate the method should be
     * overridden.
     */
    geotoolkit.data.DataConversion.prototype.direct = function(v){};
    /**
     * Reverse convert
     * @function
     * @abstract
     * @param {number} v value to convert
     * @returns {number}
     * @throws {Error} when invoked to indicate the method should be
     * overridden.
     */
    geotoolkit.data.DataConversion.prototype.reverse = function(v){};

/**
 * @class geotoolkit.data.LinearDataConversion
 * @augments geotoolkit.data.DataConversion
 * @param {number} srcLow lower source limit
 * @param {number} srcHigh higher source limit
 * @param {number} dstLow track destination limit
 * @param {number} dstHigh track destination limit
 */
geotoolkit.data.LinearDataConversion = {};
    /**
     @inheritdoc
     */
    geotoolkit.data.LinearDataConversion.prototype.direct = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.LinearDataConversion.prototype.reverse = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.data.LinearDataConversion.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.directa] directa
     * @param {number} [properties.directb] directb
     * @param {number} [properties.reverseb] reverseb
     * @returns {geotoolkit.data.LinearDataConversion}
     */
    geotoolkit.data.LinearDataConversion.prototype.setProperties = function(properties){};

/**
 * @class geotoolkit.data.LogarithmicDataConversion
 * @augments geotoolkit.data.DataConversion
 * @param {number} coeff coefficient
 * @param {number} base logarithmic base
 * @param {number} lowLog low value
 * @param {number} logHigh high value
 * @param {number} trackLow track lower value
 * @param {number} trackHigh track high value
 * @param {number} logMin logmin
 * @param {geotoolkit.data.NormalizeDataConversion} normalizeConvertion normalizeConvertion
 */
geotoolkit.data.LogarithmicDataConversion = {};
    /**
     * Direct convert
     *
     * @param {number} v the number to be converted
     * @returns {number}
     */
    geotoolkit.data.LogarithmicDataConversion.prototype.direct = function(v){};
    /**
     * Reverse convert
     *
     * @param {number} v the number to reverse convert
     * @returns {number}
     */
    geotoolkit.data.LogarithmicDataConversion.prototype.reverse = function(v){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.data.LogarithmicDataConversion.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.coeff] coefficient
     * @param {number} [properties.base] logarithmic base
     * @param {number} [properties.logmin] logmin
     * @returns {geotoolkit.data.LogarithmicDataConversion}
     */
    geotoolkit.data.LogarithmicDataConversion.prototype.setProperties = function(properties){};

/**
 * @class geotoolkit.data.NormalizeDataConversion
 * @augments geotoolkit.data.DataConversion
 * @param {number} min lower source limit
 * @param {number} max higher source limit
 */
geotoolkit.data.NormalizeDataConversion = {};
    /**
     @inheritdoc
     */
    geotoolkit.data.NormalizeDataConversion.prototype.direct = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.NormalizeDataConversion.prototype.reverse = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.data.NormalizeDataConversion.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.min] lower source limit
     * @param {number} [properties.max] higher source limit
     * @returns {geotoolkit.data.NormalizeDataConversion}
     */
    geotoolkit.data.NormalizeDataConversion.prototype.setProperties = function(properties){};

/**
 * The DataInterpolation interface defines a set of methods that allow you to synthetically generate points<br>
 * between two depth values that define how the curve for the data will be drawn.<br>
 * Interpolation objects are used to modify the default linear interpolation between two depth values defined in a <br>
 * particular well log data source (LogData) before being sent to the rendering system.<br>
 * Interpolation objects modify the flow of data values by adding generated points in between two depth values that are drawn.<br>
 * Interpolation objects do not modify the source data. They only generate new values between two existing depth values. <br>
 * Interpolation objects were designed to be extensible to meet the requirements of well log visualization.
 *
 * @class geotoolkit.data.DataInterpolation
 */
geotoolkit.data.DataInterpolation = {};
    /**
     * Interpolate array of samples
     * @function
     * @abstract
     * @param {number} start The start index
     * @param {number} count The count of samples to interpolate
     * @param {geotoolkit.data.DataValueArray} input The input data
     * @param {geotoolkit.data.DataValueArray} output The output data
     * @return {boolean} true if interpolation is successful
     * @throws {Error} when invoked to indicate the method should be overridden.
     */
    geotoolkit.data.DataInterpolation.prototype.interpolate = function(start, count, input, output){};

/**
 * Provides step-like interpolation for well log data. It provides zigzag-type
 * interpolation with alternate horizontal and vertical lines.
 *
 * @class geotoolkit.data.DataStepInterpolation
 * @augments geotoolkit.data.DataInterpolation
 * @param {geotoolkit.data.DataStepInterpolation.InterpolationType} interpolationType interpolation type
 * [interpolationType=geotoolkit.data.DataStepInterpolation.InterpolationType.Linear] Type of step interpolation
 *
 */
geotoolkit.data.DataStepInterpolation = {};
    /**
     * Enum of step interpolation type
     * @enum
     * @readonly
     */
    geotoolkit.data.DataStepInterpolation.InterpolationType = {};
        /**
         * Linear
         * @type {string}
         */
        geotoolkit.data.DataStepInterpolation.InterpolationType.Linear = "";
        /**
         * Middle
         * @type {string}
         */
        geotoolkit.data.DataStepInterpolation.InterpolationType.MiddleStep = "";
        /**
         * End
         * @type {string}
         */
        geotoolkit.data.DataStepInterpolation.InterpolationType.EndStep = "";
        /**
         * Start
         * @type {string}
         */
        geotoolkit.data.DataStepInterpolation.InterpolationType.StartStep = "";
    /**
     * @deprecated since 2.5
     * @type {number}
     */
    geotoolkit.data.DataStepInterpolation.Linear = NaN;
    /**
     * @deprecated since 2.5
     * @type {number}
     */
    geotoolkit.data.DataStepInterpolation.Middle = NaN;
    /**
     * @deprecated since 2.5
     * @type {number}
     */
    geotoolkit.data.DataStepInterpolation.End = NaN;
    /**
     * @deprecated since 2.5
     * @type {number}
     */
    geotoolkit.data.DataStepInterpolation.Start = NaN;
    /**
     * Interpolate array of samples
     * @param {number} start
     * start index
     * @param {number} count
     * count of samples to interpolate
     * @param {geotoolkit.data.DataValueArray} input
     * input data
     * @param {geotoolkit.data.DataValueArray} output
     * output (interpolated) data
     * @returns {boolean} true if interpolation is successful
     */
    geotoolkit.data.DataStepInterpolation.prototype.interpolate = function(start, count, input, output){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.data.DataStepInterpolation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.data.DataStepInterpolation.InterpolationType} [properties.interpolationtype] interpolation type
     * @returns {geotoolkit.data.DataStepInterpolation}
     */
    geotoolkit.data.DataStepInterpolation.prototype.setProperties = function(properties){};

/**
 * The DataClipInterpolation implements a simple clipping interpolation for the curve data.
 *
 * @class geotoolkit.data.DataClipInterpolation
 * @augments geotoolkit.data.DataInterpolation
 * @param {geotoolkit.data.DataConversion} conversion conversion from current to new coordinate system
 * @param {number} low low limits
 * @param {number} high high limits
 * @throws Error if conversion is null
 */
geotoolkit.data.DataClipInterpolation = {};
    /**
     * Interpolate array of samples
     * @param {number} start
     * start index
     * @param {number} count
     * count of samples to interpolate
     * @param {geotoolkit.data.DataValueArray} input
     * input data
     * @param {geotoolkit.data.DataValueArray} output
     * output (interpolated) data
     * @returns {boolean} true if interpolation is successful
     */
    geotoolkit.data.DataClipInterpolation.prototype.interpolate = function(start, count, input, output){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {Object}
     */
    geotoolkit.data.DataClipInterpolation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {Object} properties An object containing the properties to set
     * @param {number} [properties.low] low limits
     * @param {number} [properties.high] high limits
     * @param {geotoolkit.data.DataConversion} [properties.conversion] conversion from current to new coordinate system
     * @param {number} [properties.range] range
     * @returns {geotoolkit.data.DataClipInterpolation}
     */
    geotoolkit.data.DataClipInterpolation.prototype.setProperties = function(properties){};

/**
 * The DataWrapInterpolation implements a simple wrapping interpolation for the curve data.
 *
 * @class geotoolkit.data.DataWrapInterpolation
 * @augments geotoolkit.data.DataInterpolation
 * @param {geotoolkit.data.DataConversion} conversion conversion from current to new coordinate system
 * @param {number} low track low limits
 * @param {number} high track high limits
 * @param {number} maxWraps maximum count of wraps (by default 5)
 * @throws Error if conversion is null
 */
geotoolkit.data.DataWrapInterpolation = {};
    /**
     * Interpolate array of samples
     * @param {number} start
     * start index
     * @param {number} count
     * count of samples to interpolate
     * @param {geotoolkit.data.DataValueArray} input
     * input data
     * @param {geotoolkit.data.DataValueArray} output
     * output (interpolated) data
     * @returns {boolean} true if interpolation is successful
     */
    geotoolkit.data.DataWrapInterpolation.prototype.interpolate = function(start, count, input, output){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.data.DataWrapInterpolation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.low] track low limits
     * @param {number} [properties.high] track high limits
     * @param {geotoolkit.data.DataConversion} [properties.conversion] conversion from current to new coordinate system
     * @param {number} [properties.maxwraps] maximum count of wraps
     * @param {number} [properties.range] range
     * @returns {geotoolkit.data.DataWrapInterpolation}
     */
    geotoolkit.data.DataWrapInterpolation.prototype.setProperties = function(properties){};

/**
 * This interpolation cuts values lower and upper track limits
 *
 * @class geotoolkit.data.DataLimitsInterpolation
 * @augments geotoolkit.data.DataInterpolation
 * @param {number} low low limit
 * @param {number} high high limit
 */
geotoolkit.data.DataLimitsInterpolation = {};
    /**
     * Interpolate array of samples as follows:
     * values smaller than track low limit are adjusted to the low limit
     * whereas
     * values greater than track high limit are adjusted to the high limit
     * @param {number} start
     * start index
     * @param {number} count
     * count of samples to interpolate
     * @param {geotoolkit.data.DataValueArray} input
     * input data
     * @param {geotoolkit.data.DataValueArray} output
     * output data
     * @returns {boolean} true always
     */
    geotoolkit.data.DataLimitsInterpolation.prototype.interpolate = function(start, count, input, output){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.data.DataLimitsInterpolation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.low] low limit
     * @param {number} [properties.high] high limit
     * @returns {geotoolkit.data.DataLimitsInterpolation}
     */
    geotoolkit.data.DataLimitsInterpolation.prototype.setProperties = function(properties){};

/**
 * The DataGapFillInterpolation interface removes NaN values that form a gap in the data less than or equal to a specified size.
 *
 * @class geotoolkit.data.DataGapFillInterpolation
 * @augments geotoolkit.data.DataInterpolation
 * @param {number} cutoff
 */
geotoolkit.data.DataGapFillInterpolation = {};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataGapFillInterpolation.prototype.interpolate = function(){};
    /**
     * Sets the cutoff used for removing NaN valued samples.
     * @param {number} cutoff gap fill cutoff
     * @returns {geotoolkit.data.DataGapFillInterpolation} this
     */
    geotoolkit.data.DataGapFillInterpolation.prototype.setGapFillCutoff = function(cutoff){};
    /**
     * Returns the value of the cutoff used for removing NaN valued samples
     * @returns {number} The cutoff value
     */
    geotoolkit.data.DataGapFillInterpolation.prototype.getGapFillCutoff = function(){};

/**
 * The DataGapInterpolation interface adds NaN values for a depth in the data greater than to a specified gap size.
 *
 * @class geotoolkit.data.DataGapInterpolation
 * @augments geotoolkit.data.DataInterpolation
 * @param {number} gap gap
 */
geotoolkit.data.DataGapInterpolation = {};
    /**
     * @inheritdoc
     */
    geotoolkit.data.DataGapInterpolation.prototype.interpolate = function(){};
    /**
     * Sets the gap value to show discontinuity of the difference between sample is greater than specified value
     * @param {number} gap gap
     * @returns {geotoolkit.data.DataGapInterpolation} this
     */
    geotoolkit.data.DataGapInterpolation.prototype.setGapValue = function(gap){};
    /**
     * Returns the value of gap
     * @returns {number} The gap value
     */
    geotoolkit.data.DataGapInterpolation.prototype.getGapValue = function(){};

/**
 * Represents a chain of interpolations
 * @class geotoolkit.data.CompositeDataInterpolation
 * @augments geotoolkit.data.DataInterpolation
 */
geotoolkit.data.CompositeDataInterpolation = {};
    /**
     * Add data interpolator
     * @param {geotoolkit.data.DataInterpolation} interpolator data interpolator
     * @returns {geotoolkit.data.CompositeDataInterpolation} this
     */
    geotoolkit.data.CompositeDataInterpolation.prototype.addInterpolator = function(interpolator){};
    /**
     * Remove data interpolator
     * @param {geotoolkit.data.DataInterpolation} interpolator interpolator to be removed
     * @returns {geotoolkit.data.CompositeDataInterpolation}
     */
    geotoolkit.data.CompositeDataInterpolation.prototype.removeInterpolator = function(interpolator){};
    /**
     * Insert data interpolator at specified index
     * @param {number} index specified index
     * @param {geotoolkit.data.DataInterpolation} interpolator interpolator to add
     * @returns {geotoolkit.data.CompositeDataInterpolation}
     */
    geotoolkit.data.CompositeDataInterpolation.prototype.insertInterpolator = function(index, interpolator){};
    /**
     * Get data interpolator by index
     * @param {number} index interpolator index
     * @returns {geotoolkit.data.DataInterpolation} interpolatore
     */
    geotoolkit.data.CompositeDataInterpolation.prototype.getInterpolator = function(index){};
    /**
     * Return amount of interpolators
     * @returns {Number}
     */
    geotoolkit.data.CompositeDataInterpolation.prototype.getInterpolatorsCount = function(){};
    /**
     * Interpolate
     *
     * @param {number} start The start index
     * @param {number} count The count of samples to interpolate
     * @param {geotoolkit.data.DataValueArray} input The input data
     * @param {geotoolkit.data.DataValueArray} output The output data
     * @returns {boolean} true if interpolation is successful
     */
    geotoolkit.data.CompositeDataInterpolation.prototype.interpolate = function(start, count, input, output){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {geotoolkit.data.DataInterpolation[]}
     */
    geotoolkit.data.CompositeDataInterpolation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.data.DataInterpolation[]} [properties.interpolators] data interpolator
     * @returns {geotoolkit.data.CompositeDataInterpolation}
     */
    geotoolkit.data.CompositeDataInterpolation.prototype.setProperties = function(properties){};

/**
 * Defines an scaled data interface
 * @class geotoolkit.data.AbstractScaledData
 */
geotoolkit.data.AbstractScaledData = {};
    /**
     * Sets conversion
     * @function
     * @abstract
     * @param {geotoolkit.data.DataConversion} conversion
     */
    geotoolkit.data.AbstractScaledData.prototype.setConversion = function(conversion){};
    /**
     * Set interpolation
     * @function
     * @abstract
     * @param {geotoolkit.data.DataInterpolation} interpolation
     */
    geotoolkit.data.AbstractScaledData.prototype.setInterpolation = function(interpolation){};
    /**
     * Gets samples
     * @function
     * @abstract
     * @returns {geotoolkit.data.DataSample[]}
     */
    geotoolkit.data.AbstractScaledData.prototype.getSamples = function(){};
    /**
     * Return sample at specified index
     * @function
     * @abstract
     * @param {number} index index of the sample
     * @returns {geotoolkit.data.DataSample} sample
     */
    geotoolkit.data.AbstractScaledData.prototype.getSample = function(index){};
    /**
     * Get length
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.data.AbstractScaledData.prototype.getLength = function(){};
    /**
     * Is data source forward only
     * @function
     * @abstract
     * @returns {boolean}
     */
    geotoolkit.data.AbstractScaledData.prototype.isForwardOnly = function(){};
    /**
     * return the order of the data set
     * @function
     * @abstract
     * @return {geotoolkit.data.DataOrder|number}
     */
    geotoolkit.data.AbstractScaledData.prototype.getDataOrder = function(){};
    /**
     * Gets index range
     * @function
     * @abstract
     * @param {number} from from position
     * @param {number} to to position
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.data.AbstractScaledData.prototype.getIndexRange = function(from, to){};
    /**
     * Gets value
     * @function
     * @abstract
     * @param {number} position
     * @returns {number}
     */
    geotoolkit.data.AbstractScaledData.prototype.getValue = function(position){};
    /**
     * Get data source
     * @function
     * @abstract
     * @returns {object}
     */
    geotoolkit.data.AbstractScaledData.prototype.getSource = function(){};
    /**
     * Gets min wrap level
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.data.AbstractScaledData.prototype.getMinWrapLevel = function(){};
    /**
     * Gets max wrap level
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.data.AbstractScaledData.prototype.getMaxWrapLevel = function(){};
    /**
     * Gets min value
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.data.AbstractScaledData.prototype.getMinValue = function(){};
    /**
     * Gets max value
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.data.AbstractScaledData.prototype.getMaxValue = function(){};
    /**
     * Gets min depth
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.data.AbstractScaledData.prototype.getMinPosition = function(){};
    /**
     * Gets max depth
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.data.AbstractScaledData.prototype.getMaxPosition = function(){};
    /**
     * If data is outdated
     * @function
     * @abstract
     * @returns {boolean}
     */
    geotoolkit.data.AbstractScaledData.prototype.isOutdated = function(){};
    /**
     * Convert value from original source to current scaled data
     * @function
     * @abstract
     * @param {array<number>|number} v
     * value of the original data source
     * @returns {array<number>|number}
     */
    geotoolkit.data.AbstractScaledData.prototype.convertValueFromSource = function(v){};
    /**
     * Convert value from scaled data source to original source
     * @function
     * @abstract
     * @param {array<number>|number} v
     * value of the scaled data source
     * @returns {array<number>|number}
     */
    geotoolkit.data.AbstractScaledData.prototype.convertValueToSource = function(v){};

/**
 * The OptimizedData is a helper object that decorate ScaledData and allows to optimized it
 *
 * @class geotoolkit.data.OptimizedData
 * @augments geotoolkit.data.AbstractScaledData
 * @param {geotoolkit.data.AbstractScaledData} scaledData abstract scaled data
 * @param {boolean} [useXAxisForX=true] use OX axis for x coordinate of the sample
 *
 */
geotoolkit.data.OptimizedData = {};
    /**
     * Enum of rendering optimization types
     * @enum
     * @readonly
     */
    geotoolkit.data.OptimizedData.OptimizationType = {};
        /**
         * Filter points which are close to each other and are rendered in one pixel
         * @type {number}
         */
        geotoolkit.data.OptimizedData.OptimizationType.FilterClosePoints = NaN;
        /**
         * Ramer–Douglas–Peucker optimization
         * @type {number}
         */
        geotoolkit.data.OptimizedData.OptimizationType.RDP = NaN;
    /**
     * Sets optimization type
     * @param {geotoolkit.data.OptimizedData.OptimizationType} optimizationType optimization type which is used
     * @returns {geotoolkit.data.OptimizedData} this
     */
    geotoolkit.data.OptimizedData.prototype.setOptimizationType = function(optimizationType){};
    /**
     * Turns on/off optimization
     * @param {boolean} [needOptimization] Is optimization on
     * @returns {geotoolkit.data.OptimizedData} this
     */
    geotoolkit.data.OptimizedData.prototype.setOptimization = function(needOptimization){};
    /**
     * Returns the state of optimization, is it on or off
     * @returns {boolean} needOptimization Is optimization on`
     */
    geotoolkit.data.OptimizedData.prototype.getOptimization = function(){};
    /**
     * Sets conversion
     * @override
     * @param {geotoolkit.data.DataConversion} conversion conversion of the data
     * @returns {geotoolkit.data.OptimizedData} this
     */
    geotoolkit.data.OptimizedData.prototype.setConversion = function(conversion){};
    /**
     * Sets interpolation
     * @override
     * @param {geotoolkit.data.DataInterpolation} interpolation algorithm to interpolate samples
     * @returns {geotoolkit.data.OptimizedData} this
     */
    geotoolkit.data.OptimizedData.prototype.setInterpolation = function(interpolation){};
    /**
     * Gets scaled samples
     * @override
     * @returns {geotoolkit.data.DataSample[]} array of {geotoolkit.data.DataSample}.
     */
    geotoolkit.data.OptimizedData.prototype.getSamples = function(){};
    /**
     * Return sample at specified index
     * @override
     * @param {number} index sample index
     * @returns {geotoolkit.data.DataSample} sample.
     */
    geotoolkit.data.OptimizedData.prototype.getSample = function(index){};
    /**
     * Sets transformation for which optimization was/will be calculated
     * @param {geotoolkit.util.Transformation} modelToDevice model to device transformation
     * @returns {geotoolkit.data.OptimizedData} this
     */
    geotoolkit.data.OptimizedData.prototype.setModelToDevice = function(modelToDevice){};
    /**
     * Gets value array either optimized or not
     * @param {boolean} [needOptimization] Is optimization needed
     * @returns {Object[]} Value array
     */
    geotoolkit.data.OptimizedData.prototype.getValueArray = function(needOptimization){};
    /**
     * Gets position array either optimized or not
     * @param {boolean} [needOptimization] Is optimization needed
     * @returns {Object[]} Position array
     */
    geotoolkit.data.OptimizedData.prototype.getPositionArray = function(needOptimization){};
    /**
     * Gets a count of samples either optimized or not
     * @override
     * @param {boolean} [needOptimization] is optimization needed
     * @returns {number}
     */
    geotoolkit.data.OptimizedData.prototype.getLength = function(needOptimization){};
    /**
     * Return a wrap levels, If data doesn't have wraps than it returns null
     * @override
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.data.OptimizedData.prototype.getIndexRange = function(){};
    /**
     * Returns value at specified position
     * @override
     * @param {number} position position to return value
     * @returns {number} return value by position
     */
    geotoolkit.data.OptimizedData.prototype.getValue = function(position){};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.getSource = function(){};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.isForwardOnly = function(){};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.getDataOrder = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.getMinWrapLevel = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.getMaxWrapLevel = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.getMinValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.getMaxValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.getMinPosition = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.getMaxPosition = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.isOutdated = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.convertValueFromSource = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.data.OptimizedData.prototype.convertValueToSource = function(){};

/**
 * <pre>
 * Class defines CSVWriter for datatable or Array.
 * 'stream' defines instance of geotoolkit.util.stream.Stream(). It must be passed as paramter to write to stream.
 * User can provide their own stream or use stream such as geotoolkit.util.stream.TextStream().
 * stream should be inhertid from geotoolkit.util.stream.Stream() and it must have methods:
 * </pre>
 * @class geotoolkit.data.CSVWriter
 * @param {object} options options
 * @param {geotoolkit.util.stream.Stream} options.stream stream
 * @param {string} [options.delimiter = ','] string used to separate fields.
 * @param {string} [options.lineterminator = '\r\n'] string used to terminate lines produced by writer.
 * @example var csvWriter = geotoolkit.util.CSVWriter({
 * 'stream' : geotoolkit.util.stream.TextStream({
 * 'filename': 'csvfile.csv',
 * 'type': 'text\/csv'
 * })
 * });
 */
geotoolkit.data.CSVWriter = {};
    /**
     * Set options for writer
     * @param {object} options options
     * @param {geotoolkit.util.stream.Stream} [options.stream] stream
     * @param {string} [options.delimiter = ','] string used to separate fields.
     * @param {string} [options.lineterminator = '\r\n'] string used to terminate lines produced by writer.
     * @returns {geotoolkit.data.CSVWriter}
     */
    geotoolkit.data.CSVWriter.prototype.setOptions = function(options){};
    /**
     * Get Options
     * @returns {object} options see {@link geotoolkit..util.CSVWriter#setOptions}
     */
    geotoolkit.data.CSVWriter.prototype.getOptions = function(){};
    /**
     * write Datatable to stream
     * @param {geotoolkit.data.DataTable | geotoolkit.data.DataTableView} datatable DataTable or DataTableView to write
     * @param {object} [options] options
     * @param {number} [options.maxBuffer = totalRows] maxRows to save in memory before writing to stream
     * @param {boolean} [options.includeHeaders = false] whether to include header or not
     * @returns {geotoolkit.data.CSVWriter}
     */
    geotoolkit.data.CSVWriter.prototype.writeTable = function(datatable, options){};
    /**
     * Write a row to stream
     * @param {Array.<string>} row row
     * @returns {geotoolkit.data.CSVWriter}
     */
    geotoolkit.data.CSVWriter.prototype.writeRow = function(row){};
    /**
     * Write array of rows to stream
     * @param {Array.<Array.<string>>} rows array of rows
     * @param {number} [maxBuffer = totalRows] maxBuffer maxRows to save in memory before writing to stream
     * @returns {geotoolkit.data.CSVWriter}
     */
    geotoolkit.data.CSVWriter.prototype.writeRows = function(rows, maxBuffer){};
    /**
     * Write text to stream
     * @param {string} text text
     * @param {boolean} [eol = true] indicate if it's end of line
     * @returns {geotoolkit.data.CSVWriter}
     */
    geotoolkit.data.CSVWriter.prototype.writeText = function(text, eol){};
    /**
     * Closes writer. It is necessary to close the writer in order to save and stream
     * @returns {geotoolkit.data.CSVWriter}
     */
    geotoolkit.data.CSVWriter.prototype.close = function(){};

/**
 * Remote Data Source that retrieves data from a remote source using promises
 *
 * @class geotoolkit.data.RemoteDataSource
 * @param {object} [options]
 * @param {string} [options.host] host to connect to and provide data
 * @param {string} [options.protocol=''] protocol to connect to the server
 * @param {string} [options.basepath=''] base path on the server where the data is located
 * @param {string} [options.port] port to use to connect to the server
 */
geotoolkit.data.RemoteDataSource = {};
    /**
     * returns a GigaGridProvider based on the client information
     *
     * @param {object} [options] Json options
     * @param {string} [options.basepath] base path on the server where the data is located
     * @param {string} [options.port] port to use to connect to the server
     * @returns {geotoolkit.data.RemoteDataSource} data source
     */
    geotoolkit.data.RemoteDataSource.createFromClientInformation = function(options){};
    /**
     * gets the base url for the remote server
     *
     * @returns {string} Base url
     */
    geotoolkit.data.RemoteDataSource.prototype.getBaseUrl = function(){};
    /**
     * gets the path for the requested URI
     *
     * @param {string} uri location
     * @returns {string} path for the uri
     */
    geotoolkit.data.RemoteDataSource.prototype.getURI = function(uri){};
    /**
     * query the server for the requested path and parameters
     *
     * @param {string} path on the server
     * @param {object} parameter json parameters
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.data.RemoteDataSource.prototype.query = function(path, parameter){};
    /**
     * query the server for the requested path and parameters
     *
     * @param {string} path on the server
     * @param {object} parameter json parameters
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.data.RemoteDataSource.prototype.queryJson = function(path, parameter){};

