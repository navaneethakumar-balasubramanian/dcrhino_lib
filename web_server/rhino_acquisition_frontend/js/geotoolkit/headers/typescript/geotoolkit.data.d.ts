declare module geotoolkit {
    module data {
        /**
         * Data Events enumerator
         */
        var Events: any;
        /**
         * Enumeration for data ordering directions.
         */
        var DataOrder: any;
        /**
         * Define base data object
         */
        class DataObject extends geotoolkit.util.EventDispatcher {
            /**
             * Define base data object
             * @param options  (Optional) options JSON options object
             * @param options.name  (Optional) name
             * @param options.uri  (Optional) unique resource identifier
             * @param options.type  (Optional) type
             */
            constructor(options?: any | { name?: string; uri?: string; type?: string; } );
            /**
             * Events
             */
            static Events: any;
            /**
             * Returns data object name
             */
            getName(): string;
            /**
             * Sets data object name
             * @param name  (Required) data object name
             */
            setName(name: string): this;
            /**
             * Returns unique resource identifier
             */
            getUri(): string;
            /**
             * Sets unique resource identifier
             * @param uri  (Required) unique identifier
             */
            setUri(uri: string): this;
            /**
             * Returns data type
             */
            getType(): string;
            /**
             * Sets data object type
             * @param type  (Required) data type
             */
            setType(type: string): this;
            /**
             * Return property bag
             */
            getProperties(): any;
            /**
             * Add additional properties
             * @param properties  (Required) additional properties of the dataobject
             */
            addProperties(properties: any): this;
            /**
             * Returns whether data object contains specific property
             * @param name  (Required) property name
             */
            hasProperty(name: string): boolean;
            /**
             * Gets property by name
             * @param name  (Required) property name
             */
            getProperty(name: string): any;
            /**
             * Sets property by name
             * @param name  (Required) property name
             * @param value  (Required) property value
             */
            setProperty(name: string, value: any): this;
            /**
             * Add a child object
             * @param data  (Required) the child data to be added
             */
            addChild(data: geotoolkit.data.DataObject|geotoolkit.data.DataObject[]): this;
            /**
             * Remove child data object
             * @param data  (Required) data object to be removed
             * @param silent  (Optional) will not fire any events if true
             */
            removeChild(data: geotoolkit.data.DataObject, silent?: boolean): this;
            /**
             * Sets item by index
             * @param index  (Required) index of the item
             * @param item  (Required) node
             */
            set(index: number, item: geotoolkit.data.DataObject): this;
            /**
             * Insert item by index
             * @param index  (Required) specified index
             * @param item  (Required) node
             * @param silent  (Optional) will not fire any events if true
             */
            insertChild(index: number, item: geotoolkit.data.DataObject, silent?: boolean): this;
            /**
             * Remove all child data
             */
            clearChildren(): this;
            /**
             * Return data by index
             * @param i  (Required) index of the data
             */
            getChild(i: number): this;
            /**
             * Return number of child data
             */
            getChildrenCount(): number;
            /**
             * Return index of child data
             * ( index of the specified child or -1 if data is not found)
             * @param data  (Required) data object to check index
             */
            indexOfChild(data: geotoolkit.data.DataObject): number;
            /**
             * Sets parent data item
             * @param parent  (Required) parent data item
             */
            setParent(parent: geotoolkit.data.DataObject): this;
            /**
             */
            getParent(): geotoolkit.data.DataObject;
            /**
             * This method is called if property bag is changed using setProperty method
             * @param prop  (Required) 
             */
            onPropertyChanged(prop: any): this;
            /**
             * Query data item and child items by different conditions
             */
            query(): any;
            /**
             * Dispose data object and all children. Clear all listeners
             */
            dispose(): any;
            /**
             * Copy constructor function.<br>
             * Function used as part of the cloning mechanism.<br>
             * Implementations should copy the given instance state to this instance.<br>
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.data.DataObject): this;
            /**
             * All subclasses should override copyConstructor or provide custom implementation for this method
             * @param copyData  (Optional) 
             */
            clone(copyData?: boolean): any;
        }
        /**
         * Define an abstract series of data of any type.
         * This is an abstract class and cannot be instantiated.
         */
        class AbstractDataSeries extends geotoolkit.data.DataObject {
            /**
             * Define an abstract series of data of any type.
             * This is an abstract class and cannot be instantiated.
             * @param options  (Optional) options
             * @param options.id  (Optional) unique id of the data series
             * @param options.name  (Optional) name name of the data series
             * @param options.type  (Optional) type type of the data series
             */
            constructor(options?: any | { id?: number|string; name?: string; type?: string; } );
            /**
             * AbstractDataSeries events.
             */
            static Events: any;
            /**
             */
            dispose(): any;
            /**
             * Returns the identifier of the data series.
             */
            getId(): number|string;
            /**
             * Sets the identifier of the data series.
             * @param id  (Required) a new identifier
             */
            setId(id: number|string): this;
            /**
             * Notifies the data series has been updated.
             * The timestamp will be updated and geotoolkit.data.Events.Updated event will be fired.
             * @param args  (Optional) event args
             */
            update(args?: any): this;
            /**
             * Notifies the data series has been started updating.
             * The timestamp will be updated and geotoolkit.data.Events.Updated event will be fired.
             * @param args  (Optional) event args
             */
            protected updating(args?: any): this;
            /**
             * Returns the timestamp of the data series.
             */
            protected getTimeStamp(): number;
            /**
             * Updates timestamp of the data series.
             */
            protected updateTimeStamp(): any;
            /**
             * Returns data ordering of the data series.
             */
            getDataOrder(): geotoolkit.data.DataOrder|number;
            /**
             * Returns whether the data series is immutable and cannot be changed.
             */
            isReadOnly(): boolean;
            /**
             * Returns unit of the data series.
             */
            getUnit(): geotoolkit.util.AbstractUnit;
            /**
             * Returns the number of values in the data series.
             */
            getLength(): number;
            /**
             * Returns the value at the given index.
             * The type of the returned value depends on the data series type.
             * @param index  (Required) 
             */
            getValue(index: number): any;
            /**
             * Returns an array of objects in the data series.
             * @param copy  (Optional) whether creating a copy of data
             * @param unit  (Optional) unit optional output unit to convert the data to. if not specified, data will not be converted
             */
            toArray(copy?: boolean, unit?: string|geotoolkit.util.AbstractUnit): any[];
            /**
             * Converts values from one unit to another specified unit.
             * @param values  (Required) array of values or a single value
             * @param fromUnit  (Optional) the original unit of the value(s)
             * @param toUnit  (Optional) the unit to convert the value(s) to
             */
            protected convertValues(values: any[]|any, fromUnit?: geotoolkit.util.AbstractUnit, toUnit?: geotoolkit.util.AbstractUnit): any[]|any;
        }
        /**
         * Define a generic series of data to be used for any type.
         */
        class DataSeries extends geotoolkit.data.AbstractDataSeries {
            /**
             * Define a generic series of data to be used for any type.
             * @param options  (Required) JSON options object
             * @param options.id  (Optional) unique id of the series
             * @param options.name  (Optional) name of the data series
             * @param options.type  (Optional) a JavaScript type of the data series
             * @param options.unit  (Optional) unit of the data series
             * @param options.data  (Optional) an array of data
             */
            constructor(options: any | { id?: number|string; name?: string; type?: string; unit?: string|geotoolkit.util.AbstractUnit; data?: any[]; } );
            /**
             * Type of state changes
             */
            static StateChanges: any;
            /**
             * Copy constructor function.<br>
             * Function used as part of the cloning mechanism.<br>
             * Implementations should copy the given instance state to this instance.<br>
             * @param src  (Required) Source to copy from
             * @param copyData  (Optional) copy data
             */
            protected copyConstructor(src: geotoolkit.data.DataSeries, copyData?: boolean): this;
            /**
             */
            isReadOnly(): boolean;
            /**
             * Adds a value to the data series.
             * @param value  (Required) a new value
             */
            addValue(value: any): this;
            /**
             * Adds an array of values to the data series.
             * @param array  (Required) an array of values
             */
            addValues(array: any[]): this;
            /**
             * Inserts a value at the specified index.
             * @param index  (Required) the index number where to insert the value.
             * @param value  (Required) the value to insert
             */
            insertValue(index: number, value: any): this;
            /**
             * Inserts an array of values at the specified index.
             * @param index  (Required) the index number where to insert the values. Values will be added starting at the index number.
             * @param array  (Required) the array of values to insert
             */
            insertValues(index: number, array: any[]): this;
            /**
             * Returns the value at given index.
             * @param index  (Required) the index should be a number greater than or equal to zero, and less than the number of values as returned by getLength() method.
             */
            getValue(index: number): any;
            /**
             * Sets the value at given index.
             * @param index  (Required) the index should be a number greater than or equal to zero, and less than the number of values as returned by getLength() method.
             * @param value  (Required) value to set
             */
            setValue(index: number, value: any): this;
            /**
             * Sets an array of values to the data series.
             * @param array  (Required) an array of values to set
             * @param copy  (Optional) make a deep copy of the values
             */
            setValues(array: any[], copy?: boolean): this;
            /**
             * Removes a specified amount of values at the specified index.
             * @param index  (Required) the index number where to start removing the values
             * @param count  (Optional) the amount of values to remove
             */
            removeValues(index: number, count?: number): this;
            /**
             * Clears all values of the data series.
             */
            clearValues(): this;
            /**
             * Sets unit of the data series.
             * @param unit  (Optional) unit to be set
             */
            setUnit(unit?: string|geotoolkit.util.AbstractUnit): this;
        }
        /**
         * Define a generic read-only view of an underlying {@link geotoolkit.data.DataSeries} or {@link geotoolkit.data.DataSeriesView}.
         * A DataSeriesView allows unit conversion, pre- and post-processing and filtering.<br>
         */
        class DataSeriesView extends geotoolkit.data.AbstractDataSeries {
            /**
             * Define a generic read-only view of an underlying {@link geotoolkit.data.DataSeries} or {@link geotoolkit.data.DataSeriesView}.
             * A DataSeriesView allows unit conversion, pre- and post-processing and filtering.<br>
             * @param data  (Required) the original data series or data series view
             * @param options  (Optional) options
             * @param options.unit  (Optional) unit of the view
             * @param options.preprocessor  (Optional) pre-processor function. See setPreProcessor() method
             * @param options.postprocessor  (Optional) post-processor function. See setPostProcessor() method
             * @param options.filters  (Optional) array of filters
             */
            constructor(data: geotoolkit.data.DataSeries|geotoolkit.data.DataSeriesView, options?: any | { unit?: string; preprocessor?: Function; postprocessor?: Function; filters?: ((index: any, value: any) => any|geotoolkit.data.DataSeriesView)[]; } );
            /**
             * DataSeriesView events.
             */
            static Events: any;
            /**
             * FilterType.
             */
            static FilterType: any;
            /**
             * Returns a clone of the data series view.
             */
            clone(): geotoolkit.data.DataSeriesView;
            /**
             * DataSeriesView does not support setName() method.
             */
            setName(): any;
            /**
             * Sets view unit of the data series view.
             * @param unit  (Optional) unit to set
             */
            setUnit(unit?: string|geotoolkit.util.AbstractUnit): this;
            /**
             * Returns view unit of the data series view. This method returns unit set through setUnit() method, which can be different from getUnit() if view unit is not convertable to data unit.
             */
            getViewUnit(): geotoolkit.util.AbstractUnit;
            /**
             * Sets pre-processor function. This processor will be called before filters.
             * @param preProcessor  (Optional) pre-processor function. The function must accept single value and array of values as parameter.
             */
            setPreProcessor(preProcessor?: Function): this;
            /**
             * Returns pre-processor function.
             */
            getPreProcessor(): Function;
            /**
             * Sets post-processor function. This processor will be called after filters.
             * @param postProcessor  (Optional) post-processor function. The function must accept single value and array of values as parameter.
             */
            setPostProcessor(postProcessor?: Function): this;
            /**
             * Returns post-processor function.
             */
            getPostProcessor(): Function;
            /**
             * Synchronizes internal mapping for filters.
             */
            protected synchronize(): any;
            /**
             */
            toArray(): any;
            /**
             */
            convertValues(): any;
            /**
             * Return the array of value filters as functions or geotoolkit.data.DataSeriesView.
             */
            getFilters(): (geotoolkit.data.DataSeriesView|Function)[];
            /**
             * Adds a value filter to the end of existing filters.
             * @param filter  (Required) filter function or DataSeriesView.
            If DataSeriesView specified, changes from DataSeriesView might not be applied.
             * @param filterType  (Optional) filter type.
            Value type filter only filters by value and index passed in will be null. Value type filter will be optimized.
             */
            addFilter(filter: Function|geotoolkit.data.DataSeriesView|any, filterType?: geotoolkit.data.DataSeriesView.FilterType): this;
            /**
             * Removes a value filter from the data series view.
             * @param filter  (Required) filter to remove
             */
            removeFilter(filter: Function|geotoolkit.data.DataSeriesView): this;
            /**
             * Replaces an existing filter with a new filter.
             * @param oldFilter  (Required) old filter
             * @param newFilter  (Required) new filter
             * @param filterType  (Optional) filter type
             */
            replaceFilter(oldFilter: Function|geotoolkit.data.DataSeriesView|any, newFilter: Function|geotoolkit.data.DataSeriesView|any, filterType?: geotoolkit.data.DataSeriesView.FilterType): this;
            /**
             * Clears all filters.
             */
            clearFilters(): this;
            /**
             */
            isReadOnly(): boolean;
        }
        /**
         * Define a numerical series of data
         */
        class NumericalDataSeries extends geotoolkit.data.DataSeries implements geotoolkit.data.INumericalDataSeries {
            /**
             * Define a numerical series of data
             * @param options  (Optional) JSON options object
             * @param options.id  (Optional) unique id of the series
             * @param options.name  (Optional) name of the data series
             * @param options.unit  (Optional) unit of the data series
             * @param options.data  (Optional) an array of data
             */
            constructor(options?: any | { id?: number|string; name?: string; unit?: string|geotoolkit.util.AbstractUnit; data?: number[]; } );
            /**
             * Adds a value to the data series.
             * @param value  (Required) a new value
             */
            addValue(value: number): this;
            /**
             * Adds an array of values to the data series.
             * @param array  (Required) an array of values
             */
            addValues(array: number[]): this;
            /**
             * Inserts a value at the specified index.
             * @param index  (Required) the index number where to insert the value.
             * @param value  (Required) the value to insert
             */
            insertValue(index: number, value: number): this;
            /**
             * Inserts an array of values at the specified index.
             * @param index  (Required) the index number where to insert the values. Values will be added starting at the index number.
             * @param array  (Required) the array of values to insert
             */
            insertValues(index: number, array: number[]): this;
            /**
             * Sets the value at given index.
             * @param index  (Required) the index should be a number greater than or equal to zero, and less than the number of values as returned by getLength() method.
             * @param value  (Required) value to set
             */
            setValue(index: number, value: number): this;
            /**
             * Sets an array of values to the data series.
             * @param array  (Required) an array of values to set
             * @param copy  (Optional) make a deep copy of the values
             */
            setValues(array: number[], copy?: boolean): this;
            /**
             * Returns min value
             * @param unit  (Optional) unit optional output unit to convert the data to (if none specified, data is not converted)
             */
            getMin(unit?: string): number;
            /**
             * Returns max value
             * @param unit  (Optional) unit optional output unit to convert the data to (if none specified, data is not converted)
             */
            getMax(unit?: string): number;
            /**
             */
            convertValues(): any;
            /**
             */
            getDataOrder(): any;
            /**
             * Returns series as array of numbers. This method is for compatibility only.
             * @param unit  (Optional) unit optional output unit to convert the data to (if none specified, data is not converted)
             */
            getData(unit?: string): number[];
            /**
             * Returns whether the data is in ascending order. This method is for compatibility only.
             */
            isAscendingData(): boolean;
        }
        /**
         * Define a numerical customized readonly view of {@link geotoolkit.data.NumericalDataSeries} or {geotoolkit.data.NumericalDataSeriesView} for filtering,
         * and unit conversion
         */
        class NumericalDataSeriesView extends geotoolkit.data.DataSeriesView implements geotoolkit.data.INumericalDataSeries {
            /**
             * Define a numerical customized readonly view of {@link geotoolkit.data.NumericalDataSeries} or {geotoolkit.data.NumericalDataSeriesView} for filtering,
             * and unit conversion
             * @param data  (Required) an original data series or data series view
             * @param options  (Optional) options
             * @param options.unit  (Optional) unit of the view
             * @param options.preprocessor  (Optional) optional pre-processor function. (for example: converter to logarithmic mode) See setPreProcessor() method
             * @param options.postprocessor  (Optional) optional post-processor function. See setPostProcessor() method
             * @param options.filters  (Optional) array of filters
             */
            constructor(data: geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView, options?: any | { unit?: string; preprocessor?: Function; postprocessor?: Function; filters?: ((index: any, value: any) => any|geotoolkit.data.NumericalDataSeriesView)[]; } );
            /**
             * Returns a clone of the numerical data series view.
             */
            clone(): geotoolkit.data.NumericalDataSeriesView;
            /**
             */
            setUnit(): any;
            /**
             * Sets pre-processor function. This processor will be called before filters.
             * @param preProcessor  (Optional) pre-processor function. The function must accept single value and array of values as parameter.
             */
            setPreProcessor(preProcessor?: Function): this;
            /**
             * Sets post-processor function. This processor will be called after filters.
             * @param postProcessor  (Optional) post-processor function. The function must accept single value and array of values as parameter.
             */
            setPostProcessor(postProcessor?: Function): this;
            /**
             * Gets min value
             * @param unit  (Optional) unit optional output unit to convert the data to (if none specified, data is not converted)
             */
            getMin(unit?: string): number;
            /**
             * Gets max value
             * @param unit  (Optional) unit optional output unit to convert the data to (if none specified, data is not converted)
             */
            getMax(unit?: string): number;
            /**
             * Return series as array of numbers. This method is for compatibility only.
             * @param unit  (Optional) unit optional output unit to convert the data to (if none specified, data is not converted)
             */
            getData(unit?: string): number[];
            /**
             */
            getDataOrder(): any;
            /**
             * Return true if data is ordered.This method is for compatibility only.
             */
            isAscendingData(): boolean;
            /**
             */
            convertValues(): any;
        }
        /**
         * Provides a set of methods to operate with {@link geotoolkit.data.DataSeries}
         */
        class DataSeriesUtil {
            /**
             * Provides a set of methods to operate with {@link geotoolkit.data.DataSeries}
             */
            constructor();
            /**
             * Remove values from start to end value of the index series and corresponded indices of the other series.
             * All series must have the same size.
             * @param indexSeries  (Required) series to represent index data
             * @param startIndexValue  (Required) start value of the index series where to start trim
             * @param endIndexValue  (Required) end value of the index series where to end trim
             * @param arrayOfSeries  (Required) array of data series
             * @param datatable  (Optional) optional data table as a host of destination series
             */
            static trimValues(indexSeries: geotoolkit.data.NumericalDataSeries, startIndexValue: number, endIndexValue: number, arrayOfSeries: geotoolkit.data.DataSeries[], datatable?: geotoolkit.data.DataTable): any;
            /**
             * Merge data series from source to destination
             * This function works ONLY if the existing data is ordered.
             * @param src  (Optional) object to represent source data
             * @param src.index  (Optional) series to represent index data of the source
             * @param src.series  (Optional) array of input data series
             * @param dst  (Optional) object to represent destination data
             * @param dst.index  (Optional) series to represent index data of the source
             * @param dst.series  (Optional) array of data series
             * @param dst.datatable  (Optional) optional data table as a host of destination series
             */
            static mergeValues(src?: any | { index?: geotoolkit.data.NumericalDataSeries; series?: geotoolkit.data.DataSeries[]; } , dst?: any | { index?: geotoolkit.data.NumericalDataSeries; series?: geotoolkit.data.DataSeries[]; datatable?: geotoolkit.data.DataTable; } ): any;
        }
        /**
         * Define data object as array.
         */
        class ArrayData extends geotoolkit.data.NumericalDataSeries {
            /**
             * Define data object as array.
             * @param options  (Optional) JSON Object
             * @param options.data  (Optional) array data
             * @param options.name  (Optional) name of the Array
             * @param options.unit  (Optional) unit of the Array
             */
            constructor(options?: any | { data?: number[]; name?: string; unit?: string; } );
            /**
             * return value at specified index
             * @param index  (Required) index at which value will be returned
             * @param unit  (Optional) to convert the data to (if none specified, data is not converted)
             */
            getValue(index: number, unit?: string): number;
            /**
             * Sets array of data
             * @param value  (Required) array data
             */
            setData(value: number[]): this;
            /**
             * @param shift  (Required) The shift to apply to the data
             */
            shift(shift: number): this;
            /**
             * Add array of data
             * @param value  (Required) array of data
             */
            addData(value: number[]): this;
        }
        /**
         * Define Abstract Data Model
         */
        class DataSource extends geotoolkit.util.EventDispatcher {
            /**
             * Define Abstract Data Model
             */
            constructor();
            /**
             * DataSource's Events enumerator
             */
            static Events: any;
            /**
             * begin transaction
             */
            beginUpdate(): this;
            /**
             * end transaction
             */
            endUpdate(): this;
            /**
             * Add a child object
             * @param data  (Required) the child data to be added
             */
            addChild(data: geotoolkit.data.DataObject|geotoolkit.data.DataObject[]): this;
            /**
             * Remove child data object
             * @param data  (Required) data to be removed
             */
            removeChild(data: geotoolkit.data.DataObject): this;
            /**
             * Remove all child data
             */
            clearChildren(): any;
            /**
             * Return data by index
             * @param i  (Required) index of the data
             */
            getChild(i: number): geotoolkit.data.DataObject;
            /**
             * Return number of child data
             */
            getChildrenCount(): number;
            /**
             * Query data object items
             */
            query(): any;
            /**
             * Load a part of the data
             */
            update(): this;
        }
        /**
         * Define a data table as a collection of data series defined as columns in the
         * table. This code is inspired by google table.
         * <p>
         * The data table can be read only, which means that each column is immutable,
         * but it is still possible to add or remove columns.
         * </p>
         */
        class DataTable extends geotoolkit.util.EventDispatcher {
            /**
             * Define a data table as a collection of data series defined as columns in the
             * table. This code is inspired by google table.
             * <p>
             * The data table can be read only, which means that each column is immutable,
             * but it is still possible to add or remove columns.
             * </p>
             * @param data  (Required) parameters
             * @param data.meta  (Optional) a map of meta information properties
             * @param data.columnFactory  (Optional) a custom factory to create a new data series from JSON object
             * @param data.cols  (Optional) an array of series to represents columns. All columns must have the same number of rows
             * @param data.rowsdata  (Optional) an array of rows or a number of empty rows to add
             * @param data.colsdata  (Optional) an array of columns data to add. Will be ignored if rowsdata is not null
             */
            constructor(data: any | { meta?: any; columnFactory?: Function; cols?: (geotoolkit.data.DataSeries|any)[]; rowsdata?: any[][]|number; colsdata?: any[][]; } );
            /**
             * DataTable events.
             */
            static Events: any;
            /**
             */
            dispose(): any;
            /**
             * Returns a clone of the data table.
             * @param copyData  (Optional) copy data
             */
            clone(copyData?: boolean): geotoolkit.data.DataTable;
            /**
             * Adds a new column to the data table.
             * @param column  (Required) a geotoolkit.data.DataSeries object or a JSON object containing descriptions.
             * @param column.id  (Optional) unique id of the data series
             * @param column.name  (Optional) name of the data series
             * @param column.type  (Optional) a JavaScript type of the data series
             * @param column.unit  (Optional) unit of the data series
             */
            addColumn(column: geotoolkit.data.DataSeries|any | { id?: number|string; name?: string; type?: string; unit?: string|geotoolkit.util.AbstractUnit; } ): this;
            /**
             * Returns the column at the specified index.
             * @param columnIndex  (Required) column index
             */
            getColumn(columnIndex: number): geotoolkit.data.DataSeries;
            /**
             * Removes the column at the specified index.
             * @param columnIndex  (Required) column index to remove
             */
            removeColumn(columnIndex: number): this;
            /**
             * Removes column(s) at the specified index.
             * @param columnIndex  (Required) column index to remove
             * @param numberOfColumns  (Optional) number of columns to remove
             */
            removeColumns(columnIndex: number, numberOfColumns?: number): this;
            /**
             * Inserts a column at specified index.
             * @param columnIndex  (Required) column index to insert
             * @param column  (Required) column
             */
            insertColumn(columnIndex: number, column: geotoolkit.data.DataSeries|any): this;
            /**
             * Returns the index of specified column.
             * @param column  (Required) column
             */
            indexOfColumn(column: geotoolkit.data.DataSeries): number;
            /**
             * Fills data table with specified array of column data.
             * @param columnsArray  (Required) array of values by column
             */
            fillTable(columnsArray: any[][]): this;
            /**
             * Adds a new row to the data table.
             * @param cellArray  (Required) array of cells
             * @param ignoreMissingValue  (Optional) ignore missing value
             */
            addRow(cellArray: any[], ignoreMissingValue?: boolean): this;
            /**
             * Adds new rows to the data table. This method can be called to create new empty rows, or with data used to populate the rows
             * @param rowsArray  (Required) rows data or a number of empty rows to add
             * @param ignoreMissingValue  (Optional) ignore missing value
             */
            addRows(rowsArray: any[][]|number, ignoreMissingValue?: boolean): this;
            /**
             * Insert a row at the specified row index
             * @param rowIndex  (Required) index number where to insert the new row
             * @param cellArray  (Required) array of cells
             */
            insertRow(rowIndex: number, cellArray: any[]): this;
            /**
             * Returns an array of values at specified row index.
             * @param rowIndex  (Required) index of the row. It should be a number greater than or equal to zero, and less than
the number of rows as returned by the getNumberOfRows() method.
             * @param cells  (Optional) optional array to fill values
             */
            getRow(rowIndex: number, cells?: any[]): any[];
            /**
             * Returns the value of the cell at given row and column index.
             * @param rowIndex  (Required) index of the row. It should be a number greater than or equal to zero, and less than
the number of rows as returned by the getNumberOfRows() method.
             * @param columnIndex  (Required) index of the column. should be a number greater than or equal to zero, and less
than the number of columns as returned by the getNumberOfColumns() method.
             */
            getValue(rowIndex: number, columnIndex: number): any;
            /**
             * Sets the value of the cell at given row and column index.
             * @param rowIndex  (Required) index of the row. It should be a number greater than or equal to zero, and less than
the number of rows as returned by the getNumberOfRows() method.
             * @param columnIndex  (Required) index of the column. should be a number greater than or equal to zero, and less
than the number of columns as returned by the getNumberOfColumns() method.
             * @param value  (Optional) a value to be set to the cell.
             */
            setValue(rowIndex: number, columnIndex: number, value?: any): this;
            /**
             * Sets an array of values at specified column index.
             * @param columnIndex  (Required) index of the column
             * @param cellArray  (Required) array of values to set
             */
            setColumnValues(columnIndex: number, cellArray: any[]): this;
            /**
             * Returns the number of columns in the data table.
             */
            getNumberOfColumns(): number;
            /**
             * Returns the number of rows in the data table.
             */
            getNumberOfRows(): number;
            /**
             * Removes row from all columns in the data table.
             * @param rowIndex  (Required) the index number where to start removing the rows
             */
            removeRow(rowIndex: number): this;
            /**
             * Removes row(s) from all columns in the data table.
             * @param rowIndex  (Required) the index number where to start removing the rows
             * @param numberOfRows  (Optional) the amount of rows to remove
             */
            removeRows(rowIndex: number, numberOfRows?: number): this;
            /**
             * Clears all cells of the data table.
             */
            clear(): this;
            /**
             * Notify if data is changed
             * @param args  (Optional) event args
             */
            update(args?: any): this;
            /**
             * Returns column by specified identifier. If multiple columns have the same identifier, the first one will be returned.
             * @param id  (Required) identifier of the column
             */
            getColumnById(id: number|string): geotoolkit.data.DataSeries;
            /**
             * Returns column by specified name. If multiple columns have the same name, the first one will be returned.
             * @param name  (Required) name of the column
             */
            getColumnByName(name: string): geotoolkit.data.DataSeries;
            /**
             * Returns the map of all properties of specified column.
             * @param columnIndex  (Required) index of the column
             */
            getColumnProperties(columnIndex: number): any;
            /**
             * Sets properties of specified column.
             * @param columnIndex  (Required) index of the column
             * @param properties  (Required) a map of properties for the specified column.
All properties will be merged with existing ones.
             */
            setColumnProperties(columnIndex: number, properties: any): this;
            /**
             * Returns the map of all meta data of the data table. This method returns the reference to the meta data.
             */
            getMetaData(): any;
            /**
             * Sets the map of all meta data of the data table.
             * @param meta  (Required) meta data
             */
            setMetaData(meta: any): this;
            /**
             * Sorting of DataTable
             * @param column  (Optional) Identifier of Column
             * @param comparator  (Optional) comparator function that return postive, negative and zero based on condition.
             */
            sort(column?: number, comparator?: Function): this;
            /**
             * Query data item and child items by different conditions
             */
            query(): any;
        }
        /**
         * A read-only view of an underlying DataTable.
         * A DataTableView allows selection of only a subset of the columns.
         * It also allows reordering columns and duplicating columns.<br>
         * A DataTableView is a "view" of a datasource {@link geotoolkit.data.DataTable} . To add data, you will have to do so to the original {@link geotoolkit.data.DataTable}.<br>
         * Please refer to the example below for a way to create and use DataTableView.
         */
        class DataTableView extends geotoolkit.util.EventDispatcher {
            /**
             * A read-only view of an underlying DataTable.
             * A DataTableView allows selection of only a subset of the columns.
             * It also allows reordering columns and duplicating columns.<br>
             * A DataTableView is a "view" of a datasource {@link geotoolkit.data.DataTable} . To add data, you will have to do so to the original {@link geotoolkit.data.DataTable}.<br>
             * Please refer to the example below for a way to create and use DataTableView.
             * @param dataTable  (Required) 
             */
            constructor(dataTable: geotoolkit.data.DataTable|geotoolkit.data.DataTableView);
            /**
             * DataTableView events.
             */
            static Events: any;
            /**
             * Dispose data table view object.
             */
            dispose(): any;
            /**
             * Returns number of columns.
             */
            getNumberOfColumns(): number;
            /**
             * Returns number of rows.
             */
            getNumberOfRows(): number;
            /**
             * Returns the columns in this view. Identical array will be returned after calling setColumns().
             */
            getViewColumns(): number[];
            /**
             * Get data table
             */
            getDataTable(): geotoolkit.data.DataTable|geotoolkit.data.DataTableView;
            /**
             * Sets visible columns indexes. Any columns not specified will be hidden.
             * @param columnIndexes  (Required) array of column indexes
             */
            setColumns(columnIndexes: number[]): this;
            /**
             * Returns a column by index.
             * @param columnIndex  (Required) index of column
             */
            getColumn(columnIndex: number): geotoolkit.data.DataSeriesView;
            /**
             * Returns the index of the column
             * @param column  (Required) instance of column
             */
            indexOfColumn(column: geotoolkit.data.DataSeriesView): number;
            /**
             * Return the value of a cell.
             * @param rowIndex  (Required) index of the row. It should be a number greater than or equal to zero, and less than
the number of rows as returned by the getNumberOfRows() method.
             * @param columnIndex  (Required) index of the column. should be a number greater than or equal to zero, and less
than the number of columns as returned by the getNumberOfColumns() method.
             */
            getValue(rowIndex: number, columnIndex: number): any;
            /**
             * Return a first column by id
             * @param id  (Required) id of the column
             */
            getColumnById(id: number|string): geotoolkit.data.DataSeriesView;
            /**
             * Return a first column by name
             * @param name  (Required) name of the column
             */
            getColumnByName(name: string): geotoolkit.data.DataSeriesView;
            /**
             * Returns a map of all properties for the specified column.
             * @param columnIndex  (Required) index of the column
             */
            getColumnProperties(columnIndex: number): any;
            /**
             * Returns a map of all data properties for the current table.
             * This method returns a reference to meta data information
             */
            getMetaData(): any;
            /**
             * Query data item and child items by different conditions
             */
            query(): any;
        }
        /**
         * Define DataBinding
         */
        class DataBinding {
            /**
             * Define DataBinding
             */
            constructor();
            /**
             * Check if connector accepts node
             * @param node  (Required) instance to apply the databinding to
             */
            accept(node: geotoolkit.scene.Node): any;
            /**
             * Bind data
             * @param node  (Required) instance to apply the databinding to
             * @param data  (Required) data to bind to the node
             */
            bind(node: geotoolkit.scene.Node, data: any): any;
            /**
             * Unbind data
             * @param node  (Required) instance to apply the databinding to
             * @param data  (Required) data to bind to the node
             */
            unbind(node: geotoolkit.scene.Node, data: any): any;
        }
        /**
         * Define DataBindingRegistry
         */
        class DataBindingRegistry extends geotoolkit.data.DataBinding {
            /**
             * Define DataBindingRegistry
             */
            constructor();
            /**
             * Add a data connector
             * @param connector  (Required) binding between node and data
             */
            add(connector: geotoolkit.data.DataBinding): this;
            /**
             * Return connector by index
             * @param i  (Required) index of the node
             */
            getConnector(i: number): geotoolkit.data.DataBinding;
            /**
             * Return number of connectors
             */
            getCount(): number;
            /**
             * Remove data connector
             * @param connector  (Required) binding between node and data
             */
            remove(connector: geotoolkit.data.DataBinding): this;
            /**
             * Check if binding accept node
             * @param node  (Required) node to check
             */
            accept(node: geotoolkit.scene.Node): boolean;
            /**
             * Unbind data
             * @param node  (Required) instance to apply the databinding to
             * @param data  (Required) data to bind to the node
             */
            bind(node: geotoolkit.scene.Node, data: any): any;
            /**
             * Disconnect data
             * @param node  (Required) instance to apply the databinding to
             * @param data  (Required) data to bind to the node
             */
            unbind(node: geotoolkit.scene.Node, data: any): any;
            /**
             * Return default instance of the registry
             */
            static getInstance(): geotoolkit.data.DataBindingRegistry;
        }
        /**
         * Define resolver of the links
         */
        class ILinkResolver {
            /**
             * Define resolver of the links
             */
            constructor();
            /**
             * Accept data link
             * @param data  (Required) data link
             */
            accept(data: string): boolean;
            /**
             * Resolve data link
             * @param data  (Required) data link
             */
            resolve(data: string): any;
        }
        /**
         * Define link resolver registry
         */
        class LinkResolverRegistry extends geotoolkit.util.EventDispatcher {
            /**
             * Define link resolver registry
             */
            constructor();
            /**
             * Link resolver registry events
             */
            static Events: any;
            /**
             * Registers a link resolver
             * @param provider  (Required) provider to register
             */
            register(provider: geotoolkit.data.ILinkResolver): any;
            /**
             * Returns resolver, which accepts data
             * @param data  (Required) data to accept
             */
            getResolver(data: string): geotoolkit.data.ILinkResolver;
            /**
             * Returns instance of the registry
             */
            static getInstance(): geotoolkit.data.LinkResolverRegistry;
            /**
             * Registers resolver
             * @param provider  (Required) provider to register
             */
            static registerResolver(provider: geotoolkit.data.ILinkResolver): any;
        }
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
         */
        class DataSet extends geotoolkit.data.DataSource {
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
             * @param options  (Optional) parameters
             * @param options.autoupdateinterval  (Optional) auto update interval in ms
             * @param options.numberofparallelrequests  (Optional) number of parallel requests
             * @param options.requestwindowmultiplier  (Optional) extend of requested range
             * @param options.maxmemory  (Optional) maximum memory for all data table in Mb
             * @param options.decimation  (Optional) support decimation with requests
             * @param options.cleartableonscale  (Optional) clear requested data range in the tables before making fetch and scale is changed. If it is false then
range will be clean before making request overwise it is cleaned then new data is arrived. This option works only if decimation is enabled.
             */
            constructor(options?: any | { autoupdateinterval?: number; numberofparallelrequests?: number; requestwindowmultiplier?: number; maxmemory?: number; decimation?: boolean; cleartableonscale?: boolean; } );
            /**
             * Add a new data table to data set
             * @param table  (Required) a table to add
             * @param range  (Required) a virtual range on the server
             * @param indexColumnName  (Optional) name of column used for Index data
             */
            addTable(table: geotoolkit.data.DataTable, range: geotoolkit.util.Range, indexColumnName?: string): this;
            /**
             * Remove table from data set
             * @param table  (Required) table to be removed
             */
            removeTable(table: geotoolkit.data.DataTable): this;
            /**
             * Remove table from data set by index
             * @param index  (Required) index of the table to be removed
             */
            removeTableAt(index: number): this;
            /**
             * Returns number of tables
             */
            getNumberOfTables(): number;
            /**
             * Return data table by index
             * @param index  (Required) index of table
             */
            getTable(index: number): geotoolkit.data.DataTable;
            /**
             * Return data range by index
             * @param index  (Required) index of table
             */
            getIndexRange(index: number): geotoolkit.util.Range;
            /**
             * Sets data range by index
             * @param index  (Required) index of table
             * @param range  (Required) a virtual range on the server
             */
            setIndexRange(index: number, range: geotoolkit.util.Range): this;
            /**
             * Invalid a data range of the specified table
             * @param index  (Required) index of table
             * @param range  (Optional) range to invalidate
             * @param clearData  (Optional) clear rows of data table
             */
            invalidateTableRange(index: number, range?: geotoolkit.util.Range, clearData?: boolean): this;
            /**
             * Invalid a data range of all tables
             * @param range  (Optional) range to invalidate
             * @param clearData  (Optional) clear rows of data table
             */
            invalidateRange(range?: geotoolkit.util.Range, clearData?: boolean): any;
            /**
             * Gets index column for the specified table
             * @param index  (Required) index of table
             */
            getIndexColumn(index: number): geotoolkit.data.DataSeries;
            /**
             * Return a union data range by all tables
             */
            getFullIndexRange(): geotoolkit.util.Range;
            /**
             * Update data from data base
             */
            update(): any;
            /**
             * Enable / disable decimation
             * @param enabled  (Required) enable decimation
             */
            enableDecimation(enabled: boolean): this;
            /**
             * Returns status if decimation is enabled
             */
            isDecimationEnabled(): boolean;
            /**
             * Fetch data for all tables from the source. This method can modify existing data
             * @param limits  (Required) data range to fetch
             * @param scale  (Required) current scale factor
             */
            fetch(limits: geotoolkit.util.Range, scale: number): this;
            /**
             * Fetch data table from the source. This method can modify existing data
             * @param index  (Required) index of the table
             * @param limits  (Required) data range to fetch
             * @param scale  (Required) current scale factor
             */
            fetchTable(index: number, limits: geotoolkit.util.Range, scale: number): this;
            /**
             * Clear the current data
             * @param limits  (Optional) limits that has been released
             */
            clearAllTables(limits?: geotoolkit.util.Range): this;
            /**
             * Fetch data range.
             * @param tables  (Required) an array of updating tables
             * @param limits  (Required) limits
             * @param scale  (Required) scale
             * @param callback  (Required) callback function to return a result of query
             */
            protected fetchDataRange(tables: geotoolkit.data.DataTable[], limits: geotoolkit.util.Range, scale: number, callback: Function): any;
            /**
             * Dispose.
             */
            dispose(): any;
        }
        /**
         * Represent a processed data sample
         */
        class DataSample {
            /**
             * Represent a processed data sample
             * @param position  (Required) position
             * @param value  (Required) value
             * @param level  (Optional) level
             * @param valid  (Optional) valid or not
             * @param srcIndex  (Optional) source index
             */
            constructor(position: number, value: number, level?: number, valid?: boolean, srcIndex?: number);
            /**
             * Check if sample is null
             */
            isNull(): boolean;
            /**
             * Sets position
             * @param position  (Required) position
             */
            setPosition(position: number): this;
            /**
             * Return position
             */
            getPosition(): number;
            /**
             * Returns original value of the sample
             */
            protected getOriginalValue(): number;
            /**
             * Sets value of the sample
             * @param value  (Required) value
             */
            setValue(value: number): this;
            /**
             * Returns value of the sample
             */
            getValue(): number;
            /**
             * Sets wrap level
             * @param level  (Required) level
             */
            setLevel(level: number): this;
            /**
             * Return level of the wrap
             */
            getLevel(): number;
            /**
             * Sets status of the sample
             * @param valid  (Required) valid
             */
            setValid(valid: boolean): this;
            /**
             * Return sample status
             */
            getValid(): boolean;
            /**
             * Sets original index
             * @param srcIndex  (Required) src index
             */
            setOriginalIndex(srcIndex: number): this;
            /**
             * Get original index in the data set
             */
            getOriginalIndex(): number;
            /**
             * Create clone
             */
            clone(): geotoolkit.data.DataSample;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.position  (Optional) position
             * @param properties.value  (Optional) value
             * @param properties.level  (Optional) level
             * @param properties.valid  (Optional) valid
             * @param properties.index  (Optional) src index
             */
            setProperties(properties: any | { position?: number; value?: number; level?: number; valid?: boolean; index?: number; } ): this;
        }
        /**
         * Defines two arrays depths and values of samples
         */
        class DataValueArray {
            /**
             * Defines two arrays depths and values of samples
             * @param samples  (Required) array of {@link geotoolkit.data.DataSample} elements
             */
            constructor(samples: geotoolkit.data.DataSample[]);
            /**
             * @param samples  (Required) samples
             */
            setSamples(samples: geotoolkit.data.DataSample[]): this;
            /**
             */
            getSamples(): geotoolkit.data.DataSample[];
            /**
             * Set index of sample which is interpolated
             * @param index  (Required) index of the sample, which was interpolated
             */
            protected setLastInterpolatedIndex(index: number): this;
            /**
             * @param minWrapLevel  (Required) min wrap level
             */
            setMinWrapLevel(minWrapLevel: number): this;
            /**
             * @param maxWrapLevel  (Required) max wrap level
             */
            setMaxWrapLevel(maxWrapLevel: number): this;
            /**
             * Return minimum wrap level. By default it is 0
             */
            getMinWrapLevel(): number;
            /**
             * Return maximum wrap level. By default it is 0
             */
            getMaxWrapLevel(): number;
            /**
             * Get index of sample, which is interpolated
             */
            protected getLastInterpolatedIndex(): number;
            /**
             * Create a deep copy
             */
            clone(): geotoolkit.data.DataValueArray;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.samples  (Optional) samples
             * @param properties.minwraplevel  (Optional) min wrap level
             * @param properties.maxwraplevel  (Optional) max wrap level
             */
            setProperties(properties: any | { samples?: geotoolkit.data.DataSample[]; minwraplevel?: number; maxwraplevel?: number; } ): this;
        }
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
         */
        class DataConversion {
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
             */
            constructor();
            /**
             * Direct convert
             * @param v  (Required) value to convert
             */
            direct(v: number): number;
            /**
             * Reverse convert
             * @param v  (Required) value to convert
             */
            reverse(v: number): number;
        }
        class LinearDataConversion extends geotoolkit.data.DataConversion {
            /**
             * @param srcLow  (Required) lower source limit
             * @param srcHigh  (Required) higher source limit
             * @param dstLow  (Required) track destination limit
             * @param dstHigh  (Required) track destination limit
             */
            constructor(srcLow: number, srcHigh: number, dstLow: number, dstHigh: number);
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.directa  (Optional) directa
             * @param properties.directb  (Optional) directb
             * @param properties.reverseb  (Optional) reverseb
             */
            setProperties(properties: any | { directa?: number; directb?: number; reverseb?: number; } ): this;
        }
        class LogarithmicDataConversion extends geotoolkit.data.DataConversion {
            /**
             * @param coeff  (Required) coefficient
             * @param base  (Required) logarithmic base
             * @param lowLog  (Required) low value
             * @param logHigh  (Required) high value
             * @param trackLow  (Required) track lower value
             * @param trackHigh  (Required) track high value
             * @param logMin  (Required) logmin
             * @param normalizeConvertion  (Required) normalizeConvertion
             */
            constructor(coeff: number, base: number, lowLog: number, logHigh: number, trackLow: number, trackHigh: number, logMin: number, normalizeConvertion: geotoolkit.data.NormalizeDataConversion);
            /**
             * Direct convert
             * @param v  (Required) the number to be converted
             */
            direct(v: number): number;
            /**
             * Reverse convert
             * @param v  (Required) the number to reverse convert
             */
            reverse(v: number): number;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.coeff  (Optional) coefficient
             * @param properties.base  (Optional) logarithmic base
             * @param properties.logmin  (Optional) logmin
             */
            setProperties(properties: any | { coeff?: number; base?: number; logmin?: number; } ): this;
        }
        class NormalizeDataConversion extends geotoolkit.data.DataConversion {
            /**
             * @param min  (Required) lower source limit
             * @param max  (Required) higher source limit
             */
            constructor(min: number, max: number);
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.min  (Optional) lower source limit
             * @param properties.max  (Optional) higher source limit
             */
            setProperties(properties: any | { min?: number; max?: number; } ): this;
        }
        /**
         * The DataInterpolation interface defines a set of methods that allow you to synthetically generate points<br>
         * between two depth values that define how the curve for the data will be drawn.<br>
         * Interpolation objects are used to modify the default linear interpolation between two depth values defined in a <br>
         * particular well log data source (LogData) before being sent to the rendering system.<br>
         * Interpolation objects modify the flow of data values by adding generated points in between two depth values that are drawn.<br>
         * Interpolation objects do not modify the source data. They only generate new values between two existing depth values. <br>
         * Interpolation objects were designed to be extensible to meet the requirements of well log visualization.
         */
        class DataInterpolation {
            /**
             * The DataInterpolation interface defines a set of methods that allow you to synthetically generate points<br>
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
            interpolate(start: number, count: number, input: geotoolkit.data.DataValueArray, output: geotoolkit.data.DataValueArray): boolean;
        }
        /**
         * Provides step-like interpolation for well log data. It provides zigzag-type
         * interpolation with alternate horizontal and vertical lines.
         */
        class DataStepInterpolation extends geotoolkit.data.DataInterpolation {
            /**
             * Provides step-like interpolation for well log data. It provides zigzag-type
             * interpolation with alternate horizontal and vertical lines.
             * @param interpolationType  (Required) interpolation type
[interpolationType=geotoolkit.data.DataStepInterpolation.InterpolationType.Linear] Type of step interpolation
             */
            constructor(interpolationType: geotoolkit.data.DataStepInterpolation.InterpolationType);
            /**
             * Enum of step interpolation type
             */
            static InterpolationType: any;
            /**
             */
            static Linear: number;
            /**
             */
            static Middle: number;
            /**
             */
            static End: number;
            /**
             */
            static Start: number;
            /**
             * Interpolate array of samples
             * @param start  (Required) start index
             * @param count  (Required) count of samples to interpolate
             * @param input  (Required) input data
             * @param output  (Required) output (interpolated) data
             */
            interpolate(start: number, count: number, input: geotoolkit.data.DataValueArray, output: geotoolkit.data.DataValueArray): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.interpolationtype  (Optional) interpolation type
             */
            setProperties(properties: any | { interpolationtype?: geotoolkit.data.DataStepInterpolation.InterpolationType; } ): this;
        }
        /**
         * The DataClipInterpolation implements a simple clipping interpolation for the curve data.
         */
        class DataClipInterpolation extends geotoolkit.data.DataInterpolation {
            /**
             * The DataClipInterpolation implements a simple clipping interpolation for the curve data.
             * @param conversion  (Required) conversion from current to new coordinate system
             * @param low  (Required) low limits
             * @param high  (Required) high limits
             */
            constructor(conversion: geotoolkit.data.DataConversion, low: number, high: number);
            /**
             * Interpolate array of samples
             * @param start  (Required) start index
             * @param count  (Required) count of samples to interpolate
             * @param input  (Required) input data
             * @param output  (Required) output (interpolated) data
             */
            interpolate(start: number, count: number, input: geotoolkit.data.DataValueArray, output: geotoolkit.data.DataValueArray): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.low  (Optional) low limits
             * @param properties.high  (Optional) high limits
             * @param properties.conversion  (Optional) conversion from current to new coordinate system
             * @param properties.range  (Optional) range
             */
            setProperties(properties: any | { low?: number; high?: number; conversion?: geotoolkit.data.DataConversion; range?: number; } ): this;
        }
        /**
         * The DataWrapInterpolation implements a simple wrapping interpolation for the curve data.
         */
        class DataWrapInterpolation extends geotoolkit.data.DataInterpolation {
            /**
             * The DataWrapInterpolation implements a simple wrapping interpolation for the curve data.
             * @param conversion  (Required) conversion from current to new coordinate system
             * @param low  (Required) track low limits
             * @param high  (Required) track high limits
             * @param maxWraps  (Required) maximum count of wraps (by default 5)
             */
            constructor(conversion: geotoolkit.data.DataConversion, low: number, high: number, maxWraps: number);
            /**
             * Interpolate array of samples
             * @param start  (Required) start index
             * @param count  (Required) count of samples to interpolate
             * @param input  (Required) input data
             * @param output  (Required) output (interpolated) data
             */
            interpolate(start: number, count: number, input: geotoolkit.data.DataValueArray, output: geotoolkit.data.DataValueArray): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.low  (Optional) track low limits
             * @param properties.high  (Optional) track high limits
             * @param properties.conversion  (Optional) conversion from current to new coordinate system
             * @param properties.maxwraps  (Optional) maximum count of wraps
             * @param properties.range  (Optional) range
             */
            setProperties(properties: any | { low?: number; high?: number; conversion?: geotoolkit.data.DataConversion; maxwraps?: number; range?: number; } ): this;
        }
        /**
         * This interpolation cuts values lower and upper track limits
         */
        class DataLimitsInterpolation extends geotoolkit.data.DataInterpolation {
            /**
             * This interpolation cuts values lower and upper track limits
             * @param low  (Required) low limit
             * @param high  (Required) high limit
             */
            constructor(low: number, high: number);
            /**
             * Interpolate array of samples as follows:
             * values smaller than track low limit are adjusted to the low limit
             * whereas
             * values greater than track high limit are adjusted to the high limit
             * @param start  (Required) start index
             * @param count  (Required) count of samples to interpolate
             * @param input  (Required) input data
             * @param output  (Required) output data
             */
            interpolate(start: number, count: number, input: geotoolkit.data.DataValueArray, output: geotoolkit.data.DataValueArray): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.low  (Optional) low limit
             * @param properties.high  (Optional) high limit
             */
            setProperties(properties: any | { low?: number; high?: number; } ): this;
        }
        /**
         * The DataGapFillInterpolation interface removes NaN values that form a gap in the data less than or equal to a specified size.
         */
        class DataGapFillInterpolation extends geotoolkit.data.DataInterpolation {
            /**
             * The DataGapFillInterpolation interface removes NaN values that form a gap in the data less than or equal to a specified size.
             * @param cutoff  (Required) 
             */
            constructor(cutoff: number);
            /**
             * Sets the cutoff used for removing NaN valued samples.
             * @param cutoff  (Required) gap fill cutoff
             */
            setGapFillCutoff(cutoff: number): this;
            /**
             * Returns the value of the cutoff used for removing NaN valued samples
             */
            getGapFillCutoff(): number;
        }
        /**
         * The DataGapInterpolation interface adds NaN values for a depth in the data greater than to a specified gap size.
         */
        class DataGapInterpolation extends geotoolkit.data.DataInterpolation {
            /**
             * The DataGapInterpolation interface adds NaN values for a depth in the data greater than to a specified gap size.
             * @param gap  (Required) gap
             */
            constructor(gap: number);
            /**
             * Sets the gap value to show discontinuity of the difference between sample is greater than specified value
             * @param gap  (Required) gap
             */
            setGapValue(gap: number): this;
            /**
             * Returns the value of gap
             */
            getGapValue(): number;
        }
        /**
         * Represents a chain of interpolations
         */
        class CompositeDataInterpolation extends geotoolkit.data.DataInterpolation {
            /**
             * Represents a chain of interpolations
             */
            constructor();
            /**
             * Add data interpolator
             * @param interpolator  (Required) data interpolator
             */
            addInterpolator(interpolator: geotoolkit.data.DataInterpolation): this;
            /**
             * Remove data interpolator
             * @param interpolator  (Required) interpolator to be removed
             */
            removeInterpolator(interpolator: geotoolkit.data.DataInterpolation): this;
            /**
             * Insert data interpolator at specified index
             * @param index  (Required) specified index
             * @param interpolator  (Required) interpolator to add
             */
            insertInterpolator(index: number, interpolator: geotoolkit.data.DataInterpolation): this;
            /**
             * Get data interpolator by index
             * @param index  (Required) interpolator index
             */
            getInterpolator(index: number): geotoolkit.data.DataInterpolation;
            /**
             * Return amount of interpolators
             */
            getInterpolatorsCount(): number;
            /**
             * Interpolate
             * @param start  (Required) The start index
             * @param count  (Required) The count of samples to interpolate
             * @param input  (Required) The input data
             * @param output  (Required) The output data
             */
            interpolate(start: number, count: number, input: geotoolkit.data.DataValueArray, output: geotoolkit.data.DataValueArray): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): geotoolkit.data.DataInterpolation[];
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.interpolators  (Optional) data interpolator
             */
            setProperties(properties: any | { interpolators?: geotoolkit.data.DataInterpolation[]; } ): this;
        }
        /**
         * Defines an scaled data interface
         */
        class AbstractScaledData {
            /**
             * Defines an scaled data interface
             */
            constructor();
            /**
             * Sets conversion
             * @param conversion  (Required) 
             */
            setConversion(conversion: geotoolkit.data.DataConversion): any;
            /**
             * Set interpolation
             * @param interpolation  (Required) 
             */
            setInterpolation(interpolation: geotoolkit.data.DataInterpolation): any;
            /**
             * Gets samples
             */
            getSamples(): geotoolkit.data.DataSample[];
            /**
             * Return sample at specified index
             * @param index  (Required) index of the sample
             */
            getSample(index: number): geotoolkit.data.DataSample;
            /**
             * Get length
             */
            getLength(): number;
            /**
             * Is data source forward only
             */
            isForwardOnly(): boolean;
            /**
             * return the order of the data set
             */
            getDataOrder(): geotoolkit.data.DataOrder|number;
            /**
             * Gets index range
             * @param from  (Required) from position
             * @param to  (Required) to position
             */
            getIndexRange(from: number, to: number): geotoolkit.util.Range;
            /**
             * Gets value
             * @param position  (Required) 
             */
            getValue(position: number): number;
            /**
             * Get data source
             */
            getSource(): any;
            /**
             * Gets min wrap level
             */
            getMinWrapLevel(): number;
            /**
             * Gets max wrap level
             */
            getMaxWrapLevel(): number;
            /**
             * Gets min value
             */
            getMinValue(): number;
            /**
             * Gets max value
             */
            getMaxValue(): number;
            /**
             * Gets min depth
             */
            getMinPosition(): number;
            /**
             * Gets max depth
             */
            getMaxPosition(): number;
            /**
             * If data is outdated
             */
            isOutdated(): boolean;
            /**
             * Convert value from original source to current scaled data
             * @param v  (Required) value of the original data source
             */
            convertValueFromSource(v: number[]|number): number[]|number;
            /**
             * Convert value from scaled data source to original source
             * @param v  (Required) value of the scaled data source
             */
            convertValueToSource(v: number[]|number): number[]|number;
        }
        /**
         * The OptimizedData is a helper object that decorate ScaledData and allows to optimized it
         */
        class OptimizedData extends geotoolkit.data.AbstractScaledData {
            /**
             * The OptimizedData is a helper object that decorate ScaledData and allows to optimized it
             * @param scaledData  (Required) abstract scaled data
             * @param useXAxisForX  (Optional) use OX axis for x coordinate of the sample
             */
            constructor(scaledData: geotoolkit.data.AbstractScaledData, useXAxisForX?: boolean);
            /**
             * Enum of rendering optimization types
             */
            static OptimizationType: any;
            /**
             * Sets optimization type
             * @param optimizationType  (Required) optimization type which is used
             */
            setOptimizationType(optimizationType: geotoolkit.data.OptimizedData.OptimizationType): this;
            /**
             * Turns on/off optimization
             * @param needOptimization  (Optional) Is optimization on
             */
            setOptimization(needOptimization?: boolean): this;
            /**
             * Returns the state of optimization, is it on or off
             */
            getOptimization(): boolean;
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
             * Gets scaled samples
             */
            getSamples(): geotoolkit.data.DataSample[];
            /**
             * Return sample at specified index
             * @param index  (Required) sample index
             */
            getSample(index: number): geotoolkit.data.DataSample;
            /**
             * Sets transformation for which optimization was/will be calculated
             * @param modelToDevice  (Required) model to device transformation
             */
            setModelToDevice(modelToDevice: geotoolkit.util.Transformation): this;
            /**
             * Gets value array either optimized or not
             * @param needOptimization  (Optional) Is optimization needed
             */
            getValueArray(needOptimization?: boolean): any[];
            /**
             * Gets position array either optimized or not
             * @param needOptimization  (Optional) Is optimization needed
             */
            getPositionArray(needOptimization?: boolean): any[];
            /**
             * Gets a count of samples either optimized or not
             * @param needOptimization  (Optional) is optimization needed
             */
            getLength(needOptimization?: boolean): number;
            /**
             * Return a wrap levels, If data doesn't have wraps than it returns null
             */
            getIndexRange(): geotoolkit.util.Range;
            /**
             * Returns value at specified position
             * @param position  (Required) position to return value
             */
            getValue(position: number): number;
        }
        /**
         * <pre>
         *     Class defines CSVWriter for datatable or Array.
         *     'stream' defines instance of geotoolkit.util.stream.Stream(). It must be passed as paramter to write to stream.
         *     User can provide their own stream or use stream such as geotoolkit.util.stream.TextStream().
         *     stream should be inhertid from geotoolkit.util.stream.Stream() and it must have methods:
         * </pre>
         */
        class CSVWriter {
            /**
             * <pre>
             *     Class defines CSVWriter for datatable or Array.
             *     'stream' defines instance of geotoolkit.util.stream.Stream(). It must be passed as paramter to write to stream.
             *     User can provide their own stream or use stream such as geotoolkit.util.stream.TextStream().
             *     stream should be inhertid from geotoolkit.util.stream.Stream() and it must have methods:
             * </pre>
             * @param options  (Required) options
             * @param options.stream  (Required) stream
             * @param options.delimiter  (Optional) string used to separate fields.
             * @param options.lineterminator  (Optional) string used to terminate lines produced by writer.
             */
            constructor(options: any | { stream?: geotoolkit.util.stream.Stream; delimiter?: string; lineterminator?: string; } );
            /**
             * Set options for writer
             * @param options  (Required) options
             * @param options.stream  (Optional) stream
             * @param options.delimiter  (Optional) string used to separate fields.
             * @param options.lineterminator  (Optional) string used to terminate lines produced by writer.
             */
            setOptions(options: any | { stream?: geotoolkit.util.stream.Stream; delimiter?: string; lineterminator?: string; } ): this;
            /**
             * Get Options
             */
            getOptions(): any;
            /**
             * write Datatable to stream
             * @param datatable  (Required) DataTable or DataTableView to write
             * @param options  (Optional) options
             * @param options.maxBuffer  (Optional) maxRows to save in memory before writing to stream
             * @param options.includeHeaders  (Optional) whether to include header or not
             */
            writeTable(datatable: geotoolkit.data.DataTable|geotoolkit.data.DataTableView, options?: any | { maxBuffer?: number; includeHeaders?: boolean; } ): this;
            /**
             * Write a row to stream
             * @param row  (Required) row
             */
            writeRow(row: string[]): this;
            /**
             * Write array of rows to stream
             * @param rows  (Required) array of rows
             * @param maxBuffer  (Optional) maxBuffer maxRows to save in memory before writing to stream
             */
            writeRows(rows: string[][], maxBuffer?: number): this;
            /**
             * Write text to stream
             * @param text  (Required) text
             * @param eol  (Optional) indicate if it's end of line
             */
            writeText(text: string, eol?: boolean): this;
            /**
             * Closes writer. It is necessary to close the writer in order to save and stream
             */
            close(): this;
        }
        /**
         * Remote Data Source that retrieves data from a remote source using promises
         */
        class RemoteDataSource {
            /**
             * Remote Data Source that retrieves data from a remote source using promises
             * @param options  (Optional) 
             * @param options.host  (Optional) host to connect to and provide data
             * @param options.protocol  (Optional) protocol to connect to the server
             * @param options.basepath  (Optional) base path on the server where the data is located
             * @param options.port  (Optional) port to use to connect to the server
             */
            constructor(options?: any | { host?: string; protocol?: string; basepath?: string; port?: string; } );
            /**
             * returns a GigaGridProvider based on the client information
             * @param options  (Optional) Json options
             * @param options.basepath  (Optional) base path on the server where the data is located
             * @param options.port  (Optional) port to use to connect to the server
             */
            static createFromClientInformation(options?: any | { basepath?: string; port?: string; } ): geotoolkit.data.RemoteDataSource;
            /**
             * gets the base url for the remote server
             */
            getBaseUrl(): string;
            /**
             * gets the path for the requested URI
             * @param uri  (Required) location
             */
            getURI(uri: string): string;
            /**
             * query the server for the requested path and parameters
             * @param path  (Required) on the server
             * @param parameter  (Required) json parameters
             */
            query(path: string, parameter: any): geotoolkit.util.Promise;
            /**
             * query the server for the requested path and parameters
             * @param path  (Required) on the server
             * @param parameter  (Required) json parameters
             */
            queryJson(path: string, parameter: any): geotoolkit.util.Promise;
        }
        /**
         * Data Events enumerator
         */
        interface Events {
            /**
             * Data is changed and updated
             */
            Updated: string;
            /**
             * Data is updating
             */
            Updating: string;
            /**
             * Data is fetching
             */
            DataFetching: string;
        }
        /**
         * Enumeration for data ordering directions.
         */
        interface DataOrder {
            /**
             * None
             */
            None: number;
            /**
             * Data is ascending
             */
            Ascending: number;
            /**
             * Data is descending
             */
            Descending: number;
        }
        /**
         * Define a numerical data interface
         */
        interface INumericalDataSeries {
            /**
             * Returns min value
             * @param unit  (Optional) unit optional output unit to convert the data to (if none specified, data is not converted)
             */
            getMin(unit?: string): number;
            /**
             * Returns max value
             * @param unit  (Optional) unit optional output unit to convert the data to (if none specified, data is not converted)
             */
            getMax(unit?: string): number;
        }
        module DataObject {
            /**
             * Events
             */
            interface Events {
                /**
                 * ChildAdded
                 */
                ChildAdded: string;
                /**
                 * ChildRemoved
                 */
                ChildRemoved: string;
                /**
                 * PropertyChanged
                 */
                PropertyChanged: string;
            }
        }
        module AbstractDataSeries {
            /**
             * AbstractDataSeries events.
             */
            interface Events {
                /**
                 * ValuesAdding
                 */
                ValuesAdding: string;
                /**
                 * ValuesAdded
                 */
                ValuesAdded: string;
                /**
                 * ValuesUpdating
                 */
                ValuesUpdating: string;
                /**
                 * ValuesUpdated
                 */
                ValuesUpdated: string;
                /**
                 * ValuesRemoving
                 */
                ValuesRemoving: string;
                /**
                 * ValuesRemoved
                 */
                ValuesRemoved: string;
                /**
                 * ValuesSetting
                 */
                ValuesSetting: string;
                /**
                 * ValuesSet
                 */
                ValuesSet: string;
                /**
                 * UnitChanged
                 */
                UnitChanged: string;
                /**
                 * Disposing
                 */
                Disposing: string;
            }
        }
        module DataSeries {
            /**
             * Type of state changes
             */
            interface StateChanges {
                /**
                 * Added new values
                 */
                Added: string;
                /**
                 * Removed values
                 */
                Removed: string;
            }
        }
        module DataSeriesView {
            /**
             * DataSeriesView events.
             */
            interface Events {
                /**
                 * FilterChanged
                 */
                FilterChanged: string;
                /**
                 * Rebuild
                 */
                Rebuild: string;
            }
            /**
             * FilterType.
             */
            interface FilterType {
                /**
                 * General. Filter function can filter on both index and value.
                 */
                General: string;
                /**
                 * Value. Filter function can only filter value.
                 */
                Value: string;
            }
        }
        module DataSource {
            /**
             * DataSource's Events enumerator
             */
            interface Events {
                /**
                 * Event type fired on a State Change
                 */
                StateChanged: string;
            }
        }
        module DataTable {
            /**
             * DataTable events.
             */
            interface Events {
                /**
                 * ColumnsAdding
                 */
                ColumnsAdding: string;
                /**
                 * ColumnsAdded
                 */
                ColumnsAdded: string;
                /**
                 * ColumnsRemoving
                 */
                ColumnsRemoving: string;
                /**
                 * ColumnsRemoved
                 */
                ColumnsRemoved: string;
                /**
                 * ColumnsSet
                 */
                ColumnsSet: string;
                /**
                 * RowsAdding
                 */
                RowsAdding: string;
                /**
                 * RowsAdded
                 */
                RowsAdded: string;
                /**
                 * RowsRemoving
                 */
                RowsRemoving: string;
                /**
                 * RowsRemoved
                 */
                RowsRemoved: string;
                /**
                 * ValuesSet
                 */
                ValuesSet: string;
                /**
                 * Disposing
                 */
                Disposing: string;
            }
        }
        module DataTableView {
            /**
             * DataTableView events.
             */
            interface Events {
                /**
                 * Rebuild
                 */
                Rebuild: string;
            }
        }
        module LinkResolverRegistry {
            /**
             * Link resolver registry events
             */
            interface Events {
                /**
                 * ResolverRegistered
                 */
                ResolverRegistered: number;
            }
        }
        module DataStepInterpolation {
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
        module OptimizedData {
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
        }
    }
}
