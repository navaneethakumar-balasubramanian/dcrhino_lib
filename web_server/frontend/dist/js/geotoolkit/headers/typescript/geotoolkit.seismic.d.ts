declare module geotoolkit {
    module seismic {
        module data {
            /**
             * An enumeration for byte orders.
             */
            var ByteOrder: any;
            /**
             * Data format type enum
             */
            var DataFormatType: any;
            /**
             * Data format type enum
             */
            var SampleDataFormatType: any;
            /**
             * Defines a result which is returned by query
             */
            class QueryResult {
                /**
                 * Defines a result which is returned by query
                 */
                constructor();
                /**
                 * Iterate each section is result set
                 * @param callback  (Required) callback function with two parameters section id and section
                 */
                foreach(callback: Function): any;
                /**
                 * Returns initial query object
                 */
                getQuery(): any;
                /**
                 * Return trace by index
                 */
                getTrace(): geotoolkit.seismic.data.Trace;
            }
            /**
             * Seismic meta data is a map of general properties of the seismic data source like: number of traces, sample rate, ...
             * The seismic toolkit creates instances of SeismicMetaData inside the toolkit.
             * Toolkit users do not need to create instances of this class.
             */
            class SeismicMetaData {
                /**
                 * Seismic meta data is a map of general properties of the seismic data source like: number of traces, sample rate, ...
                 * The seismic toolkit creates instances of SeismicMetaData inside the toolkit.
                 * Toolkit users do not need to create instances of this class.
                 * @param samplePower  (Optional) An integer power of 10 that is multiplied by the sample rate from the seismic dataset header before
the sample rate is used. Defaults to -6 if not specified. This default value implies that the sample rate in the dataset is
stored in micro-seconds.
                 */
                constructor(samplePower?: number);
                /**
                 * IndexType enumerator, describes the index type of the underlying seismic
                 */
                static IndexType: any;
                /**
                 * Returns the index type of the under
                 */
                getIndexType(): geotoolkit.seismic.data.SeismicMetaData.IndexType;
                /**
                 * Returns the volume key names IF available, null otherwise.
                 * Those keys are the grid coordinates key names that can eventually be used to map IJ to XY
                 */
                getVolumeKeyNames(): {volumeKeyNames:{i:string;j:string}}|any;
                /**
                 * Returns the volume default key names If available, null otherwise.
                 * Those keys are the grid coordinates key names that may eventually be used to map IJ to XY
                 */
                getVolumeDefaultKeyNames(): {volumeDefaultKeyNames:{i:string;j:string}}|any;
                /**
                 * Returns the XY key information IF available, null otherwise.
                 * Those keys can be used to retrieve the X,Y coordinate of a given trace by looking up the values in the header.
                 */
                getXYKeyInformation(): {xyKeyInformation:{x:string;y:string;xKeyName:string;yKeyName:string;multiplierType:string;multiplierFieldName:string;fixedMultiplier:string}}|any;
                /**
                 * Returns the sample unit
                 */
                getZUnit(): geotoolkit.util.AbstractUnit;
                /**
                 * Returns start value of first sample.
                 */
                getStartValue(): number;
                /**
                 * Gets the sample rate for the seismic data. The sample rate is
                 * specified in the units returned by <c>getZUnit()<c>.
                 */
                getSampleRate(): number;
                /**
                 * Gets the samples per trace
                 */
                getSamplesPerTrace(): number;
                /**
                 * Gets the number of traces
                 */
                getNumberOfTraces(): number;
                /**
                 * Gets the sections.<br>
                 * <br>
                 * Sections describes any optional seismic subdivisions.<br>
                 * This is typically used to identify seismic panels in an arbitrary line.<br>
                 */
                getSections(): number[];
                /**
                 * Gets EBCDIC header information or text.
                 */
                getEBCDICHeader(): string;
            }
            /**
             * Abstract seismic trace is a collection of samples.
             * A trace is logically subdivided into zero or more trace headers and zero or more samples.
             * Data is organized as list of traces sorted by headers. The number of samples equals to the number of corresponding headers.
             */
            class Trace {
                /**
                 * Abstract seismic trace is a collection of samples.
                 * A trace is logically subdivided into zero or more trace headers and zero or more samples.
                 * Data is organized as list of traces sorted by headers. The number of samples equals to the number of corresponding headers.
                 */
                constructor();
                /**
                 * Returns an array of the samples
                 * @param buffer  (Optional) Array of samples to be used as buffer to copy samples
                 */
                getSamples(buffer?: any[]): any[];
                /**
                 * Returns a count of the samples in the trace
                 */
                getCountOfSamples(): number;
                /**
                 * Return trace header value by identifier
                 * @param index  (Optional) index of the header if index is not specified it returns a header and header data
                 */
                getHeader(index?: number): {header:{header:any;data:any}}|any;
                /**
                 * Returns the trace id in the reader
                 */
                getTraceId(): number;
            }
            /**
             * TraceSection is an 'interface' class for seismic traces collection.
             * A trace section provides access to its traces individually whatever the internal format is (for example a bulk array of binary values).
             * Inheriting classes are responsible for providing the actual implementation.
             */
            class TraceSection {
                /**
                 * TraceSection is an 'interface' class for seismic traces collection.
                 * A trace section provides access to its traces individually whatever the internal format is (for example a bulk array of binary values).
                 * Inheriting classes are responsible for providing the actual implementation.
                 */
                constructor();
                /**
                 * Return trace by number from 0 to reader.getTraceNumber()-1
                 * @param traceid  (Required) unique trace id
                 */
                getTrace(traceid: number): geotoolkit.seismic.data.Trace;
                /**
                 * Creates a clone of the trace section
                 */
                clone(): this;
                /**
                 * Returns start and end trace indices
                 */
                getTraceRange(): geotoolkit.util.Range;
                /**
                 * Returns number of traces in the section
                 */
                getNumberOfTraces(): number;
                /**
                 * Returns trace by index in the section
                 * @param index  (Required) trace index in the section starting from 0 to  getNumberOfTraces()-1
                 */
                getTraceByIndex(index: number): geotoolkit.seismic.data.Trace;
            }
            /**
             * Creates wrapper class for a file reader.
             */
            class LocalFile {
                /**
                 * Creates wrapper class for a file reader.
                 * @param localFile  (Required) the local file for e.g SEG-Y file.
                 */
                constructor(localFile: File);
                /**
                 * Returns file name
                 */
                getFileName(): string;
                /**
                 * Return file size
                 */
                getFileSize(): number;
                /**
                 * Returns the last modified date of the file as the number of milliseconds
                 * since the Unix epoch (January 1, 1970 at midnight). Files without
                 * a known last modified date return the current date.
                 */
                getLastModified(): number;
                /**
                 * Returns binary raw data
                 * @param callback  (Required) this is the function called when data is ready
                 * @param from  (Required) offset in bytes
                 * @param to  (Required) offset in bytes
                 * @param context  (Required) context
                 */
                readyBinarySection(callback: Function, from: number, to: number, context: any): any;
                /**
                 * Return true if local file is supported
                 */
                static isSupported(): boolean;
            }
            /**
             * Defines an interface for seismic data source/source of traces.<br>
             * It implements methods like getMetaData() which returns {@link geotoolkit.seismic.data.SeismicMetaData} and <br>
             * Select() function to select and load relevant seismic trace sections .
             */
            class SeismicData extends geotoolkit.util.EventDispatcher {
                /**
                 * Defines an interface for seismic data source/source of traces.<br>
                 * It implements methods like getMetaData() which returns {@link geotoolkit.seismic.data.SeismicMetaData} and <br>
                 * Select() function to select and load relevant seismic trace sections .
                 */
                constructor();
                /**
                 * IndexType enumerator, describes the index type of the underlying seismic
                 */
                static Events: any;
                /**
                 * Return the value to indicate if data was changed
                 */
                getTimeStamp(): number;
                /**
                 * Update time stamp
                 */
                protected updateTimeStamp(): any;
                /**
                 * Returns seismic meta data information
                 */
                getMetaData(): geotoolkit.seismic.data.SeismicMetaData;
                /**
                 * Select seismic trace sections and call "callback" method then section is loaded.
                 * @param query  (Required) a query in JSON format. Should contain parameters relevant to the trace, such as "from", "to", "headers", and "samples"
                 * @param query.headers  (Optional) result should have trace headers
                 * @param query.samples  (Optional) result should have trace samples
                 * @param query.from  (Optional) specify a start trace index from 0 to getTraceNumbers()-1
                 * @param query.to  (Optional) specify end trace index from 0 to getTraceNumbers()-1
                 * @param query.traceIndexes  (Optional) optional indices of traces from 0 to getTraceNumbers()-1
                 * @param callback  (Optional) callback to be called then section is loaded. This method has {geotoolkit.seismic.data.QueryResult}
as parameter
                 */
                select(query: any | { headers?: boolean; samples?: boolean; from?: number; to?: number; traceIndexes?: number[]; } , callback?: Function): any;
                /**
                 * Invalidate data and notify that data is changed
                 * @param rect  (Optional) optional area of tracers and samples to invalidate. It is not
supported now
                 */
                invalidate(rect?: geotoolkit.util.Rect): any;
            }
            /**
             * Seismic reader reads seismic data from the different sources and provides it to trace processor in uniform representation as a collection of traces,<br>
             * where a trace is a collection of samples. A trace is logically subdivided into zero or more trace headers and zero or more samples.<br>
             * Seismic Reader also returns information about seismic data, like number of many traces it has, number of samples per trace, <br>
             * unit of samples, sample rate and also provides trace headers information.
             */
            class SeismicReader extends geotoolkit.seismic.data.SeismicData {
                /**
                 * Seismic reader reads seismic data from the different sources and provides it to trace processor in uniform representation as a collection of traces,<br>
                 * where a trace is a collection of samples. A trace is logically subdivided into zero or more trace headers and zero or more samples.<br>
                 * Seismic Reader also returns information about seismic data, like number of many traces it has, number of samples per trace, <br>
                 * unit of samples, sample rate and also provides trace headers information.
                 * @param options  (Required) nullValue or options is passed when a value does not exist. There will be a break in the wiggles in that area. Fill will not fill that area. User can set a custom color for NullValue
                 * @param options.nullValue  (Optional) null value
                 * @param options.fetchsize  (Optional) maximum number of the traces per requests
                 */
                constructor(options: number|any | { nullValue?: number; fetchsize?: number; } );
                /**
                 * SeismicReader Events enumerator
                 */
                static Events: any;
                /**
                 * returns options
                 */
                getOptions(): any;
                /**
                 * Returns null value
                 */
                getNullValue(): number;
                /**
                 * Returns seismic model limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Load {geotoolkit.seismic.data.SeismicMetaData} seismic meta data.
                 * Seismic meta data is a map of general properties of the seismic data source like: number of traces, sample rate, .
                 * @param callback  (Required) method to be called when data is ready
                 */
                loadMetaData(callback: Function): any;
                /**
                 * Returns number of traces
                 */
                getNumberOfTraces(): number;
                /**
                 * Returns number of samples
                 */
                getNumberOfSamples(): number;
                /**
                 * Returns sample rate . Sample rate is the number of times an analog signal is measured (sampled) per second.<br>
                 * Basically it is a difference between nearest sample values. This term comes from digital signal processing and defines how <br>
                 * continuous signal is sampled.   For example: 0.004/ second
                 */
                getSampleRate(): number;
                /**
                 * Returns an array of field descriptors for the dataset read by this
                 * seismic reader.
                 */
                getTraceHeaderFields(): geotoolkit.seismic.data.FieldDesc[];
                /**
                 * returns seismic trace section
                 * @param query  (Required) this specifies the condition of the request
                 * @param callback  (Required) method to be called when data is ready
                 */
                select(query: any, callback: Function): any;
            }
            /**
             * A seismic reader that keeps all traces in memory.
             * This Reader is the Proxy for any SeismicReader.
             * It saves traces in inner cache at the first request and gives them from cache at the following requests.
             */
            class CachingReader extends geotoolkit.seismic.data.SeismicReader {
                /**
                 * A seismic reader that keeps all traces in memory.
                 * This Reader is the Proxy for any SeismicReader.
                 * It saves traces in inner cache at the first request and gives them from cache at the following requests.
                 * @param seismicReader  (Required) instance of SeismicReader that will be proxied
                 * @param memoryLimit  (Required) Memory limit in Megabytes
                 */
                constructor(seismicReader: geotoolkit.seismic.data.SeismicReader, memoryLimit: number);
                /**
                 * Sets memory limit in Megabytes. Attention! Removes all existing traces from cache.
                 * @param memoryLimit  (Required) Memory limit in Megabytes
                 */
                setCacheSize(memoryLimit: number): this;
                /**
                 */
                select(): any;
                /**
                 * proxy to original reader
                 */
                getOptions(): any;
                /**
                 * proxy to original reader
                 */
                getNullValue(): any;
                /**
                 * proxy to original reader
                 */
                getModelLimits(): any;
                /**
                 * proxy to original reader
                 */
                loadMetaData(): any;
                /**
                 * proxy to original reader
                 */
                getNumberOfTraces(): any;
                /**
                 * proxy to original reader
                 */
                getNumberOfSamples(): any;
                /**
                 * proxy to original reader
                 */
                getSampleRate(): any;
                /**
                 * proxy to original reader
                 */
                getTraceHeaderFields(): any;
                /**
                 * proxy to original reader
                 */
                getStatistics(): any;
                /**
                 * proxy to original reader
                 */
                getMetaData(): any;
            }
            /**
             * Defines trace mapping.
             */
            class TraceMapping {
                /**
                 * Defines trace mapping.
                 */
                constructor();
                /**
                 * Return model trace spacing
                 */
                getModelTraceSpacing(): any;
                /**
                 * Return index of the trace by its location
                 * @param location  (Required) 
                 */
                getTraceIndex(location: number): number;
                /**
                 * Return trace location by its index
                 * @param index  (Required) 
                 */
                getTraceLocation(index: number): number;
                /**
                 * Returns array of traces
                 * @param from  (Required) 
                 * @param to  (Required) 
                 */
                getTraces(from: number, to: number): number[];
                /**
                 * Return trace location range
                 */
                getTraceLocationRange(): geotoolkit.util.Range;
                /**
                 * Return number of destination traces
                 */
                getNumberOfDestinationTraces(): number;
            }
            /**
             * Defines variable space trace mapping
             */
            class VSTraceMapping extends geotoolkit.seismic.data.TraceMapping {
                /**
                 * Defines variable space trace mapping
                 * @param pipeline  (Required) 
                 * @param positions  (Required) positions of traces in the model space
                 * @param traceSpacing  (Optional) model trace spacing
                 * @param traceRange  (Optional) model trace range
                 */
                constructor(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, positions: geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView, traceSpacing?: number, traceRange?: geotoolkit.util.Range);
                /**
                 * Returns model trace spacing
                 */
                getModelTraceSpacing(): number;
            }
            /**
             * The FieldDesc is a base class for seismic trace header's field descriptors. It is common to all field descriptors.
             * A header field descriptor describes the name and identifier of a given header field.
             */
            class FieldDesc {
                /**
                 * The FieldDesc is a base class for seismic trace header's field descriptors. It is common to all field descriptors.
                 * A header field descriptor describes the name and identifier of a given header field.
                 * @param fieldId  (Required) identifier (type)
                 * @param name  (Required) name of the field
                 * @param title  (Optional) title of the field
                 */
                constructor(fieldId: string, name: string, title?: string);
                /**
                 * Returns name
                 */
                getName(): string;
                /**
                 * Returns identifier (type)
                 */
                getIdentifier(): string;
                /**
                 * Returns title
                 */
                getTitle(): string;
                /**
                 * Set title
                 * @param title  (Required) 
                 */
                setTitle(title: string): this;
                /**
                 * Returns clone of the field descriptor
                 */
                getClone(): this;
                /**
                 * Returns string representation
                 */
                toString(): string;
                /**
                 * Returns true if headers are identical
                 * @param header  (Required) 
                 */
                equalsTo(header: geotoolkit.seismic.data.FieldDesc): any;
            }
            /**
             * DataHeader is an 'interface/abstract' class responsible for holding the seismic trace header. Inheriting classes would provide the actual implementation.
             * Headers are organized as set of 'fields' and 'values'.
             */
            class DataHeader {
                /**
                 * DataHeader is an 'interface/abstract' class responsible for holding the seismic trace header. Inheriting classes would provide the actual implementation.
                 * Headers are organized as set of 'fields' and 'values'.
                 * @param size  (Required) number of bytes
                 * @param headerType  (Required) type of traceheader
                 */
                constructor(size: number, headerType: string);
                /**
                 * Return size
                 */
                getSize(): number;
                /**
                 * Return identifer (type)
                 */
                getHeaderType(): string;
                /**
                 * Return trace header value by identifier
                 * @param binary  (Required) binary data
                 */
                parse(binary: ArrayBuffer): any;
                /**
                 * Returns true if contains field type
                 * @param fieldType  (Required) type of the field in the array.
                 */
                containsField(fieldType: string): any;
                /**
                 * Returns true if array contains field type
                 * @param data  (Required) which contains the parse data
                 * @param headerFieldType  (Required) unique name of the header field
                 */
                getFieldValue(data: any, headerFieldType: string): any;
                /**
                 * Get a field by its identifier
                 * @param identifier  (Required) unique header number
                 */
                getFieldByIdentifier(identifier: string): geotoolkit.seismic.data.FieldDesc;
            }
            /**
             * Creates Binary Header.
             */
            class BinaryHeader extends geotoolkit.seismic.data.DataHeader {
                /**
                 * Creates Binary Header.
                 * @param size  (Required) byte size of header in data source
                 * @param headerType  (Required) type of trace header
                 */
                constructor(size: number, headerType: string);
                /**
                 * Add field to fields array
                 * @param field  (Required) Binary field inside header
                 */
                addField(field: geotoolkit.seismic.data.BinaryField): any;
                /**
                 * Set byte order.
                 * True if order === "BIG_ENDIAN"
                 * @param order  (Required) the byte order
                 */
                setByteOrder(order: geotoolkit.seismic.data.ByteOrder|string): this;
                /**
                 * Returns byte order.
                 * "BIG_ENDIAN" or LITTLE_ENDIAN"
                 */
                getByteOrder(): string|geotoolkit.seismic.data.ByteOrder;
                /**
                 * Returns true if fieldType exists in fields array
                 * @param fieldType  (Required) type of the field in the array
                 */
                containsField(fieldType: string): boolean;
                /**
                 * Returns true if fieldName exists in fields array
                 * @param fieldName  (Required) name that gives information about the field
                 */
                containsFieldByName(fieldName: string): boolean;
                /**
                 * Returns field for corresponding index
                 * @param index  (Required) index for the array of field data
                 */
                getFieldByIndex(index: number): geotoolkit.seismic.data.BinaryField;
                /**
                 * Returns field with correct fieldType
                 * @param fieldType  (Required) type of the binary field
                 */
                getField(fieldType: string): geotoolkit.seismic.data.BinaryField;
                /**
                 * Returns field with correct fieldName
                 * @param fieldName  (Required) name that gives information about the field
                 */
                getFieldByName(fieldName: string): geotoolkit.seismic.data.BinaryField;
                /**
                 * Returns an array of the fields
                 */
                getFields(): geotoolkit.seismic.data.BinaryField[];
                /**
                 * Returns an array of the fields
                 * @param binary  (Required) binary data
                 */
                parse(binary: ArrayBuffer): any;
                /**
                 * Parse a specific header
                 * @param uint8binary  (Required) array of 8-bit unsigned integers.
                 * @param field  (Required) the BinaryField
                 */
                parseField(uint8binary: Uint8Array, field: geotoolkit.seismic.data.BinaryField): number;
                /**
                 * Returns field for a specific identifier
                 * @param identifier  (Required) unique name for field
                 */
                getFieldByIdentifier(identifier: string): geotoolkit.seismic.data.BinaryField;
                /**
                 * Returns field value for a specific type
                 * @param data  (Required) data
                 * @param headerFieldType  (Required) unique name of the header field.
                 */
                getFieldValue(data: any, headerFieldType: string): any[];
            }
            /**
             * Creates binary header
             */
            class BinaryField extends geotoolkit.seismic.data.FieldDesc {
                /**
                 * Creates binary header
                 * @param offset  (Required) offset of the header
                 * @param dataType  (Required) type of the data
                 * @param fieldId  (Required) identifier (type)
                 * @param name  (Required) name of the identifier
                 */
                constructor(offset: number, dataType: number, fieldId: string, name: string);
                /**
                 * Returns offset
                 */
                getOffset(): number;
                /**
                 * Returns data type
                 */
                getDataType(): number;
            }
            /**
             * Defines abstract seismic Format
             */
            class SeismicFormat {
                /**
                 * Defines abstract seismic Format
                 */
                constructor();
                /**
                 * Add header
                 * @param header  (Required) 
                 */
                addHeader(header: geotoolkit.seismic.data.DataHeader): geotoolkit.seismic.data.DataHeader;
                /**
                 * Return headers count
                 */
                getHeadersCount(): number;
                /**
                 * Return header by index
                 * @param index  (Required) index of the header
                 */
                getHeader(index: number): geotoolkit.seismic.data.DataHeader;
                /**
                 * Add trace header
                 * @param header  (Required) 
                 */
                addTraceHeader(header: geotoolkit.seismic.data.BinaryHeader): geotoolkit.seismic.data.BinaryHeader;
                /**
                 * Return count of trace headers
                 */
                getTraceHeadersCount(): number;
                /**
                 * Return trace header by index
                 * @param index  (Required) 
                 */
                getTraceHeader(index: number): geotoolkit.seismic.data.BinaryHeader;
                /**
                 * Return a size of the line headers in bytes
                 */
                getLineHeadersSize(): number;
                /**
                 * Return a size of the trace header in bytes
                 */
                getTraceHeadersSize(): number;
            }
            /**
             * Defines StandardSegyFormat which is a SegyFormat class that provides basic
             *  information about SEG Y formatted file.
             */
            class StandardSegyFormat extends geotoolkit.seismic.data.SeismicFormat {
                /**
                 * Defines StandardSegyFormat which is a SegyFormat class that provides basic
                 *  information about SEG Y formatted file.
                 */
                constructor();
            }
            /**
             * Defines reader of local SEG-Y files.
             */
            class SegyReader extends geotoolkit.seismic.data.SeismicReader {
                /**
                 * Defines reader of local SEG-Y files.
                 * @param file  (Required) The file object
                 * @param segyFormat  (Required) specifies the  trace data format and location of headers
                 * @param samplePower  (Optional) 
                 * @param nullValue  (Optional) null value
                 */
                constructor(file: geotoolkit.seismic.data.LocalFile, segyFormat: geotoolkit.seismic.data.SeismicFormat, samplePower?: number, nullValue?: number);
                /**
                 * returns seismic model limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * load {geotoolkit.seismic.data.SeismicMetaData} seismic meta data
                 * @param callback  (Required) method to be called when data is ready
                 */
                loadMetaData(callback: Function): any;
                /**
                 * returns seismic meta data information
                 */
                getMetaData(): geotoolkit.seismic.data.SeismicMetaData;
                /**
                 * read SEG-Y statistics
                 * @param callback  (Required) method to be called when statistics will be calculated.
                 */
                readDataSetStatistics(callback: Function): any;
                /**
                 * returns number of traces
                 */
                getNumberOfTraces(): number;
                /**
                 * returns number of samples
                 */
                getNumberOfSamples(): number;
                /**
                 * returns sample rate
                 */
                getSampleRate(): number;
                /**
                 * Return SEG-Y data format
                 */
                getDataFormat(): geotoolkit.seismic.data.SeismicFormat;
                /**
                 * returns seismic trace section
                 * @param query  (Required) a query in JSON format. Should contain parameters relevant to the trace, such as "from", "to", "headers", and "samples"
                 * @param query.headers  (Optional) ignored
                 * @param query.samples  (Optional) ignored
                 * @param query.from  (Optional) specify a start trace index from 0 to getTraceNumbers()-1
                 * @param query.to  (Optional) specify end trace index from 0 to getTraceNumbers()-1
                 * @param query.traceIndexes  (Optional) optional indices of traces from 0 to getTraceNumbers()-1
                 * @param callback  (Optional) callback to be called then section is loaded. This method has {geotoolkit.seismic.data.QueryResult}
                 */
                select(query: any | { headers?: boolean; samples?: boolean; from?: number; to?: number; traceIndexes?: number[]; } , callback?: Function): any;
                /**
                 * Returns an array of field descriptors for the dataset read by this
                 * seismic reader.
                 */
                getTraceHeaderFields(): geotoolkit.seismic.data.FieldDesc[];
            }
            /**
             * A seismic reader that keeps all traces in memory.
             * This reader should only be used for small seismic datasets given that
             * all its data is kept in memory.
             * This reader can work in synchronous or asynchronous mode.
             * See the setTraceProcessor method for further details and examples.<br>
             * <i>The preferred way to call this constructor is with a single parameter object. Using
             * numeric parameters is deprecated.</i>
             */
            class MemoryReader extends geotoolkit.seismic.data.SeismicReader {
                /**
                 * A seismic reader that keeps all traces in memory.
                 * This reader should only be used for small seismic datasets given that
                 * all its data is kept in memory.
                 * This reader can work in synchronous or asynchronous mode.
                 * See the setTraceProcessor method for further details and examples.<br>
                 * <i>The preferred way to call this constructor is with a single parameter object. Using
                 * numeric parameters is deprecated.</i>
                 * @param options  (Required) deprecated (since 2.6 number type is deprecated) options object or number of traces in the memory reader
                 * @param options.numberOfSamples  (Optional) The sample count per trace
                 * @param options.numberOfTraces  (Optional) The number of traces in the memory reader
                 * @param options.nullValue  (Optional) nullValue is passed when a value does not exist. There will be a break in the wiggles or density plot in that area. Fill will not fill that area. User can set a custom color for nullValue
                 * @param options.sampleRate  (Optional) The sample rate
                 * @param options.sections  (Optional) If the reader has sections, the number of traces in each section. See SeismicMedataData.sections for more info.
                 * @param options.zUnit  (Optional) Unit for the usual time or depth axis in the dataset
                 * @param options.volumeKeyNames  (Optional) See SeismicMedataData VolumeKeyNames for more info.
                 * @param options.indexType  (Optional) Index type for this memory reader
                 * @param options.volumeDefaultKeyNames  (Optional) See SeismicMedataData VolumeDefaultKeyNames for more info.
                 * @param options.xyKeyNames  (Optional) See SeismicMedataData xyKeyInformation for more info.
                 * @param samplesPerTrace  (Optional) deprecated (since 2.2 use options instead) The samples per trace. This argument is only used if options is a number.
                 * @param sampleRate  (Optional) deprecated (since 2.2 use options instead) The sample rate. This argument is only used if options is a number.
                 * @param samplePower  (Optional) deprecated (since 2.2 use options instead) The sample power.
                 * @param nullValue  (Optional) deprecated (since 2.2 use options instead) The null value. This argument is only used if options is a number.
                 */
                constructor(options: any | { numberOfSamples?: number; numberOfTraces?: number; nullValue?: number; sampleRate?: number; sections?: number[]; zUnit?: geotoolkit.util.AbstractUnit; volumeKeyNames?: any; indexType?: geotoolkit.seismic.data.SeismicMetaData.IndexType; volumeDefaultKeyNames?: any; xyKeyNames?: any; } |number, samplesPerTrace?: number, sampleRate?: number, samplePower?: number, nullValue?: number);
                /**
                 */
                getTraceHeaderFields(): geotoolkit.seismic.data.FieldDesc[];
                /**
                 * Sets the 'trace processor' of this memory reader.<br>
                 * The trace processor is a delegate object responsible for providing data to the reader.<br>
                 * @param traceProcessor  (Required) object that implements following set of functions which provide trace data and statistics to reader.
                 * @param traceProcessor.getDataStatistics  (Required) method that should return seismic data statistics {'average':Number, 'min':Number, 'max':Number, 'rms':Number}
                 * @param traceProcessor.getTraceData  (Optional) A callback function that fills the given trace with its sample values
                 * @param traceProcessor.getTraceHeader  (Optional) A callback function to get trace header data
                 * @param traceProcessor.getAsyncData  (Optional) Function used in asynchronous mode, it should return an object with a function getTraceData
                 */
                setTraceProcessor(traceProcessor: Function|any | { getDataStatistics?: Function; getTraceData?: Function; getTraceHeader?: Function; getAsyncData?: Function; } ): this;
                /**
                 * Returns statistics
                 */
                getStatistics(): {statistics:{average:number;min:number;max:number;rms:number}}|any;
                /**
                 * read Seismic data statistics
                 * @param callback  (Required) method to be called when data is ready
                 */
                readDataSetStatistics(callback: Function): any;
                /**
                 * returns seismic model limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Set number of traces
                 * @param numberOfTraces  (Required) The number of traces in the memory reader
                 */
                setNumberOfTraces(numberOfTraces: number): this;
                /**
                 * returns number of traces
                 */
                getNumberOfTraces(): number;
                /**
                 * returns number of samples
                 */
                getNumberOfSamples(): number;
                /**
                 * Sets number of samples per trace
                 * @param numberOfSamples  (Required) number of samples per trace
                 */
                setNumberOfSamples(numberOfSamples: number): this;
                /**
                 * returns sample rate
                 */
                getSampleRate(): number;
                /**
                 * returns seismic trace section
                 * @param query  (Required) this specifies the condition of the request
                 * @param callback  (Required) method to be called when data is ready
                 */
                select(query: any, callback: Function): any;
                /**
                 * load {geotoolkit.seismic.data.SeismicMetaData} seismic meta data
                 * @param callback  (Required) method to be called when data is ready
                 */
                loadMetaData(callback: Function): any;
                /**
                 * returns seismic meta data information
                 */
                getMetaData(): geotoolkit.seismic.data.SeismicMetaData;
            }
            /**
             * Define registry of data providers for geotoolkit.seismic.data.RemoteSeismicDataSource. A new provider can be
             * registered and be called by version
             */
            class RemoteReaderDataProviderRegistry {
                /**
                 * Define registry of data providers for geotoolkit.seismic.data.RemoteSeismicDataSource. A new provider can be
                 * registered and be called by version
                 */
                constructor();
                /**
                 * Return instance of the registry
                 */
                static getInstance(): geotoolkit.seismic.data.RemoteReaderDataProviderRegistry;
                /**
                 * Create a new instance of geotoolkit.seismic.data.RemoteReaderDataProvider
                 * @param version  (Required) version of protocol
                 * @param options  (Optional) optional options to pass to an instance of provider
                 */
                getDataProvider(version: string|number, options?: any): geotoolkit.seismic.data.RemoteReaderDataProvider;
                /**
                 * Register a provider
                 * @param version  (Required) unique version fo provider
                 * @param provider  (Required) provider or be registered
                 */
                register(version: string|number, provider: geotoolkit.seismic.data.RemoteReaderDataProvider): any;
                /**
                 * Return a registered provider for the specified version. This method doesn't create a new instance.
                 * @param version  (Required) version of protocol
                 */
                getProvider(version: string|number): geotoolkit.seismic.data.RemoteReaderDataProvider;
                /**
                 * Create a new instance of geotoolkit.seismic.data.RemoteReaderDataProvider
                 * @param version  (Required) version of protocol
                 * @param options  (Optional) optional options to pass to an instance of provider
                 */
                createProvider(version: string|number, options?: any): geotoolkit.seismic.data.RemoteReaderDataProvider;
                /**
                 * Enumerate each provider
                 * @param callback  (Optional) a function with two parameters version and provider
                 */
                forEach(callback?: Function): any;
            }
            /**
             * Define abstract data provider for communication between  remote reader and server
             */
            class RemoteReaderDataProvider {
                /**
                 * Define abstract data provider for communication between  remote reader and server
                 */
                constructor();
                /**
                 * Create an instance
                 * @param options  (Required) 
                 */
                createInstance(options: any): geotoolkit.seismic.data.RemoteReaderDataProvider;
                /**
                 * Notify server that reader resources can be released on server
                 * @param sourceId  (Optional) optional parameter id of the data source
                 */
                close(sourceId?: string): any;
                /**
                 * This method open connection and load data source information. The output data can be received via success callback {@link geotoolkit.seismic.data.RemoteReaderDataProvider~openSuccess}
                 * @param fileName  (Required) 
                 */
                open(fileName: string): geotoolkit.util.Promise;
                /**
                 * This method query traces and returns information about traces {@link geotoolkit.seismic.data.RemoteReaderDataProvider~queryTracesSuccess}
                 * @param fileName  (Required) 
                 * @param query  (Optional) a query in JSON format. Should contain parameters relevant to the trace, such as "from", "to", "headers", and "samples"
                 * @param query.headers  (Optional) result should have trace headers
                 * @param query.samples  (Optional) result should have trace samples
                 * @param query.from  (Optional) specify a start trace index from 0 to getTraceNumbers()-1
                 * @param query.to  (Optional) specify end trace index from 0 to getTraceNumbers()-1
                 * @param query.traceIndexes  (Optional) optional indices of traces from 0 to getTraceNumbers()-1
                 */
                queryTraces(fileName: string, query?: any | { headers?: boolean; samples?: boolean; from?: number; to?: number; traceIndexes?: number[]; } ): geotoolkit.util.Promise;
                /**
                 * This method reads traces
                 * @param fileName  (Required) 
                 * @param options  (Optional) 
                 * @param options.from  (Optional) start trace number
                 * @param options.to  (Optional) end trace number
                 * @param options.traceIndexes  (Optional) optional array ot traces indices
                 * @param options.samples  (Optional) request samples
                 * @param options.headers  (Optional) request samples
                 * @param options.query  (Optional) query
                 * @param options.sourceId  (Optional) optional id of the source
                 * @param options.queryId  (Optional) optional id of the query
                 * @param options.byteOrder  (Optional) byte order
                 */
                readTraces(fileName: string, options?: any | { from?: number; to?: number; traceIndexes?: number[]; samples?: boolean; headers?: boolean; query?: any; sourceId?: string; queryId?: string; byteOrder?: string; } ): geotoolkit.util.Promise;
                /**
                 * Notify server that reader resources can be released on server
                 * @param sourceId  (Optional) 
                 * @param queryId  (Optional) 
                 */
                releaseQuery(sourceId?: string, queryId?: string): any;
                /**
                 */
                getByteOrder(): geotoolkit.seismic.data.ByteOrder;
            }
            /**
             * RemoteSeismicReader is a reader that can access data on a server rather than on a local file.<br>
             * This implementation follows the INTGeoServer(© Interactive Network Technologies, Inc.) API.<br>
             * Meaning that it can be used out of the box to fetch traces from an INTGeoServer(© Interactive Network Technologies, Inc.).<br>
             * <br>
             * This class uses internally xhr and binary transfer to fetch the traces from the server.<br>
             */
            class RemoteSeismicReader extends geotoolkit.seismic.data.SeismicReader {
                /**
                 * RemoteSeismicReader is a reader that can access data on a server rather than on a local file.<br>
                 * This implementation follows the INTGeoServer(© Interactive Network Technologies, Inc.) API.<br>
                 * Meaning that it can be used out of the box to fetch traces from an INTGeoServer(© Interactive Network Technologies, Inc.).<br>
                 * <br>
                 * This class uses internally xhr and binary transfer to fetch the traces from the server.<br>
                 * @param datasource  (Required) The datasource for this reader
                 * @param options  (Optional) The options to use
                 * @param options.nullValue  (Optional) nullValue is passed when a value does not exist. There will be a break in the wiggles in that area. Fill will not fill that area. User can set a custom color for NullValue
                 * @param options.metadata  (Optional) seismic meta data
                 * @param options.statistics  (Optional) data statistics
                 * @param options.traceheader  (Optional) The trace header
                 * @param options.byteorder  (Optional) byte order
                 * @param options.provider  (Optional) data provider
                 * @param nullValue  (Optional) nullValue is passed when a value does not exist. There will be a break in the wiggles in that area. Fill will not fill that area. User can set a custom color for NullValue
                 */
                constructor(datasource: geotoolkit.seismic.data.RemoteSeismicDataSource, options?: any | { nullValue?: number; metadata?: geotoolkit.seismic.data.SeismicMetaData; statistics?: any; traceheader?: geotoolkit.seismic.data.DataHeader; byteorder?: string; provider?: geotoolkit.seismic.data.RemoteReaderDataProvider; } , nullValue?: number);
                /**
                 * Returns host name
                 */
                getHost(): string;
                /**
                 * Returns file name
                 */
                getSeismicFileName(): string;
                /**
                 * Returns statistics
                 */
                getStatistics(): {statistics:{average:number;min:number;max:number;rms:number}}|any;
                /**
                 * Returns number of traces
                 */
                getNumberOfTraces(): number;
                /**
                 * Returns number of samples
                 */
                getNumberOfSamples(): number;
                /**
                 * Returns sample rate
                 */
                getSampleRate(): number;
                /**
                 * Returns seismic model limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Returns seismic meta data information
                 */
                getMetaData(): geotoolkit.seismic.data.SeismicMetaData;
                /**
                 * Select seismic trace sections and then call "callback" method. This function executes a 'select' operation using the given query.<br>
                 * The query is executed server side (for RemoteSeismicReader) to filter the traces requested by the client side.<br>
                 * The servers sends back the data, and when the request is finalized, the given callback function is called with the result.
                 * @param query  (Required) a condition in JSON format
                 * @param query.headers  (Optional) result should have trace headers
                 * @param query.samples  (Optional) result should have trace samples
                 * @param query.from  (Optional) specify a start trace index from 0 to getTraceNumbers()-1
                 * @param query.to  (Optional) specify end trace index from 0 to getTraceNumbers()-1
                 * @param query.traceIndexes  (Optional) optional indices of traces from 0 to getTraceNumbers()-1
                 * @param callback  (Optional) callback to be called then section is loaded.
                 */
                select(query: any | { headers?: boolean; samples?: boolean; from?: number; to?: number; traceIndexes?: number[]; } , callback?: Function): any;
                /**
                 * Return instance of data provider
                 */
                getDataProvider(): geotoolkit.seismic.data.RemoteReaderDataProvider;
                /**
                 * Notify server that reader resources can be released on server
                 */
                release(): any;
                /**
                 * Returns an array of field descriptors for the dataset read by this
                 * seismic reader.
                 */
                getTraceHeaderFields(): geotoolkit.seismic.data.FieldDesc[];
            }
            /**
             * Defines remote seismic data source
             * 
             * <p>
             * The data source communicate with server using JSON format via HTTP. It uses the following sequence of calls:
             *  </p>
             *  <ul>
             *  <li>-get information about data source</li>
             *  <li>-make query</li>
             *  <li>-read a bunch of traces from creating query.</li>
             * </ul>
             * 
             * <p>
             * The supported query:
             * </p>
             * <ul>
             * <li>
             * 1. Get meta information about data set:
             * 
             * <pre>
             * Input:
             * {
             *    "file" : fileName,
             *    "type" : "info"
             * }
             * Output:
             * {
             *   "version": number,
             *   "sourceId": number, // Used for optimization
             *   "keys": [ {"key": name, "min":minValue, "max":maxValue, "increment":step } ],
             *   "numberOfSamples": value,
             *   "numberOfTraces": value,
             *   "sampleRate": value,
             *   "startValue": value,
             *     "zUnit": value,
             *   "statistics": { "min":value, "max":value, "average":value, "rms":value "percentiles":[value1, value2, ...] }, //percentiles only if available
             *   "units": value, //cgUnits value
             *   "traceHeader": {
             *        "fields": [ { "name":name, "id":number, "type":string, "size":bytes } ],"size":bytes
             *        }
             * },
             * Example:
             * http://loclahost:8080/seismicreader?json=%7B%22file%22:%22seismicdata/cdp_stack.sgy%22,%22type%22:%22info%22,%22query%22:%7B%7D,%22sourceId%22:-1%7D
             * 
             *  Where query string parameters:
             * json:{"file":"seismicdata/cdp_stack.sgy","type":"info","query":{},"sourceId":-1}
             * </pre>
             * </li>
             * <li>
             * 2. Get information about query.
             * 
             * <pre>
             * Input:
             * {
             *   "file" : fileName,
             *   "type" : "query",
             *   "sourceId": number, // Used for optimization. It is optional
             *   "queryId": number, // Used for optimization. it is optional
             *   "query": {
             *           // See available queries in 3. and 4.
             *    }
             *  }
             *  Output:
             *  {
             *     "version": number,
             *     "queryId": number, // Used for optimization
             *     "numberOfSamples": value,
             *     "numberOfTraces": value,
             *     "sampleRate": value,
             *     "startValue": value,
             *     "statistics": { "min":value, "max":value, "mean":value, "average":value, "rms":value, "percentiles":[value1, value2, ...] }, //percentiles only if available
             *  }
             * 
             *  Example of query string parameters:
             * 
             *  json:{"file":"seismicdata/cdp_stack.sgy","type":"query","query":{},"sourceId":1169947804}
             *  </pre>
             *  </li>
             *  <li>
             *  3. Get binary data from the trace range
             * 
             *  <pre>
             *  Input:
             *  {
             *     "file" : fileName,
             *     "type" : "traces",
             *     "queryId": number, // Used for optimization. It is optional
             *     "query": {
             *          "keys": [
             *          {
             *              "name" : KeyName,
             *              "min": minValue,
             *              "max": maxValue,
             *              "step": stepValue,
             *              "order": asc or desc
             *           },
             *           ...
             *          ]
             *     },
             *     "data" : {
             *            "startTrace": startTrace,
             *            "endTrace": endTrace,
             *            "samples": "true" or "false",
             *            "headers": "true" or "false"
             *            "byteOrder": "LITTLE_ENDIAN", "BIG_ENDIAN0"
             *    }
             *   }
             * 
             *   Output: Binary data. It returns block (endTrace-startTrace+1). Each trace has HEADER and SMAPLES.
             *   The header size equals to information from meta data, Samples size equals (4 * samplesCount)
             *   The full size of the data block is (endTrace - startTrace + 1) * (headerSize + samplesSize)
             *   The samples are returned as float
             * 
             *   Example of query string parameters:
             *   json:{"file":"seismicdata/cdp_stack.sgy","type":"traces","query":{},
             *   "data":{"startTrace":0,"endTrace":255,"samples":true,"headers":true,
             *   "byteOrder":"LITTLE_ENDIAN"},"sourceId":1169947804,"queryId":1169945598}
             *   </pre>
             *   </li>
             *  <li>
             *  4. Get binary data for an arbitrary path
             * 
             *  <pre>
             *  Input:
             *  {
             *     "file" : fileName,
             *     "type" : "traces",
             *     "queryId": number, // Used for optimization. It is optional
             *     "query": {
             *           "keys": [
             *              {"name" : KeyName1, "values": [values for key1]},
             *              {"name" : KeyName2, "values": [values for key2]},
             *           ],
             *           "queryType": "seismicPath",
             *           'emptyTraces': true,
             *     },
             * 
             *     "data" : {
             *            "startTrace": startTrace,
             *            "endTrace": endTrace,
             *            "samples": "true" or "false",
             *            "headers": "true" or "false"
             *            "byteOrder": "LITTLE_ENDIAN", "BIG_ENDIAN0"
             *    }
             *   }
             * 
             *   Output: Binary data. It returns block (endTrace-startTrace+1). Each trace has HEADER and SMAPLES.
             *   The header size equals to information from meta data, Samples size equals (4 * samplesCount)
             *   The full size of the data block is (endTrace - startTrace + 1) * (headerSize + samplesSize)
             *   The samples are returned as float
             * 
             *   Example of query string parameters:
             * 
             *   json:{"file":"seismicdata/cdp_stack.sgy","type":"traces","query":{},
             *   "data":{"startTrace":0,"endTrace":255,"samples":true,"headers":true,
             *   "byteOrder":"LITTLE_ENDIAN"},"sourceId":1169947804,"queryId":1169945598}
             *   </pre>
             *   </li>
             *   <li>
             *   5. Release data source and/or query collection
             * 
             *   <pre>
             *   {
             *     "sourceId": number,
             *     "queryId": number, // optional
             *     "type" : "release"
             *   }
             *   </pre>
             *   </li>
             * </ul>
             */
            class RemoteSeismicDataSource {
                /**
                 * Defines remote seismic data source
                 * 
                 * <p>
                 * The data source communicate with server using JSON format via HTTP. It uses the following sequence of calls:
                 *  </p>
                 *  <ul>
                 *  <li>-get information about data source</li>
                 *  <li>-make query</li>
                 *  <li>-read a bunch of traces from creating query.</li>
                 * </ul>
                 * 
                 * <p>
                 * The supported query:
                 * </p>
                 * <ul>
                 * <li>
                 * 1. Get meta information about data set:
                 * 
                 * <pre>
                 * Input:
                 * {
                 *    "file" : fileName,
                 *    "type" : "info"
                 * }
                 * Output:
                 * {
                 *   "version": number,
                 *   "sourceId": number, // Used for optimization
                 *   "keys": [ {"key": name, "min":minValue, "max":maxValue, "increment":step } ],
                 *   "numberOfSamples": value,
                 *   "numberOfTraces": value,
                 *   "sampleRate": value,
                 *   "startValue": value,
                 *     "zUnit": value,
                 *   "statistics": { "min":value, "max":value, "average":value, "rms":value "percentiles":[value1, value2, ...] }, //percentiles only if available
                 *   "units": value, //cgUnits value
                 *   "traceHeader": {
                 *        "fields": [ { "name":name, "id":number, "type":string, "size":bytes } ],"size":bytes
                 *        }
                 * },
                 * Example:
                 * http://loclahost:8080/seismicreader?json=%7B%22file%22:%22seismicdata/cdp_stack.sgy%22,%22type%22:%22info%22,%22query%22:%7B%7D,%22sourceId%22:-1%7D
                 * 
                 *  Where query string parameters:
                 * json:{"file":"seismicdata/cdp_stack.sgy","type":"info","query":{},"sourceId":-1}
                 * </pre>
                 * </li>
                 * <li>
                 * 2. Get information about query.
                 * 
                 * <pre>
                 * Input:
                 * {
                 *   "file" : fileName,
                 *   "type" : "query",
                 *   "sourceId": number, // Used for optimization. It is optional
                 *   "queryId": number, // Used for optimization. it is optional
                 *   "query": {
                 *           // See available queries in 3. and 4.
                 *    }
                 *  }
                 *  Output:
                 *  {
                 *     "version": number,
                 *     "queryId": number, // Used for optimization
                 *     "numberOfSamples": value,
                 *     "numberOfTraces": value,
                 *     "sampleRate": value,
                 *     "startValue": value,
                 *     "statistics": { "min":value, "max":value, "mean":value, "average":value, "rms":value, "percentiles":[value1, value2, ...] }, //percentiles only if available
                 *  }
                 * 
                 *  Example of query string parameters:
                 * 
                 *  json:{"file":"seismicdata/cdp_stack.sgy","type":"query","query":{},"sourceId":1169947804}
                 *  </pre>
                 *  </li>
                 *  <li>
                 *  3. Get binary data from the trace range
                 * 
                 *  <pre>
                 *  Input:
                 *  {
                 *     "file" : fileName,
                 *     "type" : "traces",
                 *     "queryId": number, // Used for optimization. It is optional
                 *     "query": {
                 *          "keys": [
                 *          {
                 *              "name" : KeyName,
                 *              "min": minValue,
                 *              "max": maxValue,
                 *              "step": stepValue,
                 *              "order": asc or desc
                 *           },
                 *           ...
                 *          ]
                 *     },
                 *     "data" : {
                 *            "startTrace": startTrace,
                 *            "endTrace": endTrace,
                 *            "samples": "true" or "false",
                 *            "headers": "true" or "false"
                 *            "byteOrder": "LITTLE_ENDIAN", "BIG_ENDIAN0"
                 *    }
                 *   }
                 * 
                 *   Output: Binary data. It returns block (endTrace-startTrace+1). Each trace has HEADER and SMAPLES.
                 *   The header size equals to information from meta data, Samples size equals (4 * samplesCount)
                 *   The full size of the data block is (endTrace - startTrace + 1) * (headerSize + samplesSize)
                 *   The samples are returned as float
                 * 
                 *   Example of query string parameters:
                 *   json:{"file":"seismicdata/cdp_stack.sgy","type":"traces","query":{},
                 *   "data":{"startTrace":0,"endTrace":255,"samples":true,"headers":true,
                 *   "byteOrder":"LITTLE_ENDIAN"},"sourceId":1169947804,"queryId":1169945598}
                 *   </pre>
                 *   </li>
                 *  <li>
                 *  4. Get binary data for an arbitrary path
                 * 
                 *  <pre>
                 *  Input:
                 *  {
                 *     "file" : fileName,
                 *     "type" : "traces",
                 *     "queryId": number, // Used for optimization. It is optional
                 *     "query": {
                 *           "keys": [
                 *              {"name" : KeyName1, "values": [values for key1]},
                 *              {"name" : KeyName2, "values": [values for key2]},
                 *           ],
                 *           "queryType": "seismicPath",
                 *           'emptyTraces': true,
                 *     },
                 * 
                 *     "data" : {
                 *            "startTrace": startTrace,
                 *            "endTrace": endTrace,
                 *            "samples": "true" or "false",
                 *            "headers": "true" or "false"
                 *            "byteOrder": "LITTLE_ENDIAN", "BIG_ENDIAN0"
                 *    }
                 *   }
                 * 
                 *   Output: Binary data. It returns block (endTrace-startTrace+1). Each trace has HEADER and SMAPLES.
                 *   The header size equals to information from meta data, Samples size equals (4 * samplesCount)
                 *   The full size of the data block is (endTrace - startTrace + 1) * (headerSize + samplesSize)
                 *   The samples are returned as float
                 * 
                 *   Example of query string parameters:
                 * 
                 *   json:{"file":"seismicdata/cdp_stack.sgy","type":"traces","query":{},
                 *   "data":{"startTrace":0,"endTrace":255,"samples":true,"headers":true,
                 *   "byteOrder":"LITTLE_ENDIAN"},"sourceId":1169947804,"queryId":1169945598}
                 *   </pre>
                 *   </li>
                 *   <li>
                 *   5. Release data source and/or query collection
                 * 
                 *   <pre>
                 *   {
                 *     "sourceId": number,
                 *     "queryId": number, // optional
                 *     "type" : "release"
                 *   }
                 *   </pre>
                 *   </li>
                 * </ul>
                 * @param options  (Required) The options
                 * @param options.host  (Required) The service url, see example
                 * @param options.filename  (Required) The filename or resource id
                 * @param options.version  (Optional) default version of communication data provider. Supported: 1 and 2, ivaap
                 * @param options.seismicdata  (Optional) web service url to provide meta data about an individual seismic dataset
                 * @param options.seismicquery  (Optional) web service url to provide meta data about a selection of traces
                 * @param options.seismictraces  (Optional) web service url to stream all trace header and sample values for a selection of traces
                 * @param options.binaryheader  (Optional) web service url to provides the bytes that form the binary header, if any
                 * @param options.requestheaders  (Optional) HTTP request headers as key-value pair. it it is specified then ti will be applied
                 */
                constructor(options: any | { host?: string; filename?: string; version?: string|number; seismicdata?: string; seismicquery?: string; seismictraces?: string; binaryheader?: string; requestheaders?: any; } );
                /**
                 * Returns the data info
                 */
                getDataInfo(): any;
                /**
                 * Returns host name
                 */
                getHost(): string;
                /**
                 * Returns file name
                 */
                getSeismicFileName(): string;
                /**
                 * This method open connection and load data source information
                 * @param callback  (Required) is called then file is open
                 * @param error  (Required) function with parameter data
                 */
                open(callback: Function, error: Function): any;
                /**
                 * Returns a reader that provides a subset of this seismic data.<br>
                 * See class documentation for available queries.<br>
                 * @param query  (Optional) query object
                 * @param query.keys  (Optional) optional array of keys to make a query
                 * @param query.emptyTracesKey  (Optional) optional empty trace key
                 * @param query.emptyTraces  (Optional) generated empty traces on server
                 * @param query.queryType  (Optional) query type. It can be 'seismicPath' or null. if it is null then query is done by keys overwise by path.
                 * @param query.options  (Optional) additional options to send to server
                 * @param query.traceOrder  (Optional) define type of the query. A traceOrder of 1 indicates a XSection query. The Time key is
ignored for XSection queries. A trace order of 2 indicates a Map query. The Time key is required for Map queries, with identical min and max values (a time slice).
                 * @param callback  (Optional) The callback function to be called on success, will be called with the resulting reader as a parameter
                 * @param error  (Optional) The callback function to be called on error, will be called with the actual error as a parameter
                 */
                select(query?: any | { keys?: any[]; emptyTracesKey?: any; emptyTraces?: boolean; queryType?: string; options?: any; traceOrder?: number; } , callback?: Function, error?: Function): any;
                /**
                 * Returns keys
                 */
                getKeys(): any[];
                /**
                 * Returns seismic meta data information
                 */
                getMetaData(): geotoolkit.seismic.data.SeismicMetaData;
                /**
                 * Returns statistics
                 */
                getStatistics(): {statistics:{average:number;min:number;max:number;rms:number}}|any;
                /**
                 */
                getByteOrder(): geotoolkit.seismic.data.ByteOrder;
                /**
                 * Notify server that reader resources can be released on server
                 */
                release(): any;
            }
            /**
             * An enumeration for byte orders.
             */
            interface ByteOrder {
                /**
                 * Constant denoting little-endian byte order.
                 * In this order, the bytes of a multibyte value
                 * are ordered from least significant to most significant.
                 */
                LittleEndian: string;
                /**
                 * Constant denoting big-endian byte order. In this order, the bytes of a
                 * multibyte value are ordered from most significant to least significant.
                 */
                BigEndian: string;
            }
            /**
             * Data format type enum
             */
            interface DataFormatType {
                /**
                 * Undefined
                 */
                Undefined: number;
                /**
                 * Byte
                 */
                Byte: number;
                /**
                 * Short
                 */
                Short: number;
                /**
                 * Integer
                 */
                Int: number;
                /**
                 * Float
                 */
                Float: number;
                /**
                 * IBM Float
                 */
                IbmFloat: number;
                /**
                 * Double
                 */
                Double: number;
                /**
                 * Nibble
                 */
                Nibble: number;
                /**
                 * Unsigned byte
                 */
                UByte: number;
                /**
                 * Unsigned short
                 */
                UShort: number;
                /**
                 * Unsigned integer 32 bit (The same as UInt32)
                 */
                UInt: number;
                /**
                 * Unsigned integer 32 bit
                 */
                UInt32: number;
                /**
                 * Unsigned integer 64 bit
                 */
                UInt64: number;
                /**
                 * Integer 32 bit (The same as Int)
                 */
                Int32: number;
                /**
                 * Integer 64-bit
                 */
                Int64: number;
            }
            /**
             * Data format type enum
             */
            interface SampleDataFormatType {
                /**
                 * IBM Float
                 */
                IbmFloat: number;
                /**
                 * 32-bit Integer
                 */
                Int32: number;
                /**
                 * 16-bit Integer
                 */
                Int16: number;
                /**
                 * IEEE Float
                 */
                IeeeFloat: number;
                /**
                 * 8-bit Integer
                 */
                Int8: number;
            }
            module MemoryReader {
                /**
                 * Callback for geotoolkit.seismic.data.MemoryReader to get trace data
                 */
                type getTraceData = (reader: geotoolkit.seismic.data.MemoryReader, trace: number[], traceId: number) => any;
                /**
                 * Callback for geotoolkit.seismic.data.MemoryReader to get trace header
                 */
                type getTraceHeader = (reader: geotoolkit.seismic.data.MemoryReader, trace: geotoolkit.seismic.data.DataHeader, data: number[], traceId: number) => any;
                /**
                 * Callback for geotoolkit.seismic.data.MemoryReader for asynchronous to return samples and trace header
                 */
                type getTraceProcessor = (traceProcessor: any | { getTraceData?: getTraceData; getTraceHeader?: getTraceHeader; } ) => any;
                /**
                 * Callback for geotoolkit.seismic.data.MemoryReader for asynchronous requests.
                 */
                type getAsyncData = (query: any | { from?: number; to?: number; headers?: boolean; samples?: boolean; } , callback?: getTraceProcessor) => any;
            }
            module RemoteReaderDataProvider {
                /**
                 * Callback for geotoolkit.seismic.data.RemoteReaderDataProvider to success open. This is based on INTGeoServer
                 * protocol version 1.
                 */
                type openSuccess = (data: any | { version?: string; statistics?: any | { min?: number; max?: number; average?: number; rms?: number; } ; ebcdic?: string[]; gridCoordinates?: any[]; indexType?: string; keys?: any[]; numberOfTraces?: number; numberOfSamples?: number; startValue?: number; sampleRate?: number; outline?: any[]; traceHeader?: any | { fields?: any[]; } ; traceOrders?: number[]; volumeDefaultKeyNames?: any | { i?: string; j?: string; } ; volumeKeyNames?: any | { i?: string; j?: string; } ; zUnit?: string; xyKeyNames?: any | { xKeyName?: string; yKeyName?: string; } ; } ) => any;
                /**
                 * Callback for geotoolkit.seismic.data.RemoteReaderDataProvider to success queryTraces.
                 * This is based on INTGeoServer protocol version 1.
                 */
                type queryTracesSuccess = (data: any | { version?: string; statistics?: any | { min?: number; max?: number; average?: number; rms?: number; } ; numberOfTraces?: number; numberOfSamples?: number; startValue?: number; sampleRate?: number; } ) => any;
            }
            module snap {
                /**
                 * This class provides utility function to retrieve a seismic sample from a pipeline at a given coordinate.
                 * It will snap to the closest sample center.
                 */
                class SnapPicker {
                    /**
                     * This class provides utility function to retrieve a seismic sample from a pipeline at a given coordinate.
                     * It will snap to the closest sample center.
                     */
                    constructor();
                    /**
                     * Pick sample at specified coordinate
                     * @param x  (Required) x coordinate for picking sample (in seismic model space)
                     * @param y  (Required) y coordinate for picking sample (in seismic model space)
                     * @param strategy  (Required) used for picking
                     * @param pipeline  (Required) seismic pipeline
                     * @param target  (Required) instance of callback owner
                     * @param callback  (Required) This function called when data is ready. It accepts trace number, trace header, sample index, sample value
                     */
                    static pickSample(x: number, y: number, strategy: geotoolkit.seismic.data.snap.SnapPickingStrategy, pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, target: any, callback: Function): any;
                    /**
                     * Pick sample at specified trace and sample index
                     * @param traceIndex  (Required) trace
                     * @param sampleIndex  (Required) index of the sample
                     * @param strategy  (Required) strategy used for picking
                     * @param pipeline  (Required) seismic pipeline
                     * @param target  (Required) instance of callback owner
                     * @param callback  (Required) This function is called when data is ready. It accepts trace number, trace header, sample index, sample value
                     */
                    static pickTraceSampleIndex(traceIndex: number, sampleIndex: number, strategy: geotoolkit.seismic.data.snap.SnapPickingStrategy, pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, target: any, callback: Function): any;
                }
                /**
                 * Defines abstract picking strategy
                 */
                class SnapPickingStrategy {
                    /**
                     * Defines abstract picking strategy
                     * @param name  (Required) strategy name
                     */
                    constructor(name: string);
                    /**
                     * Returns name of the strategy
                     */
                    getName(): string;
                    /**
                     * Sets strategy name
                     * @param name  (Required) strategy name
                     */
                    setName(name: string): this;
                    /**
                     * @param trace  (Required) seismic trace
                     * @param index  (Required) of the sample
                     */
                    pickSample(trace: geotoolkit.seismic.data.Trace, index: number): number;
                }
            }
            module compression {
                /**
                 * The base class for data transformations.
                 */
                class DataTransformation {
                    /**
                     * The base class for data transformations.
                     */
                    constructor();
                    /**
                     * Configures this data transform.
                     * @param config  (Required) The data transform configuration.
                     * @param size  (Required) The size of the data transform.
                     * @param data  (Required) The data on which this transform is applied.
                     */
                    applyConfiguration(config: any, size: geotoolkit.util.Dimension, data: ArrayBuffer): any;
                    /**
                     * Loads binary data into this transform.
                     * @param config  (Required) The data transform configuration
                     * @param data  (Required) The data that has to be loaded.
                     */
                    loadBinaryData(config: any, data: ArrayBuffer): any;
                    /**
                     * Gets the name of this data transform.
                     */
                    getName(): string;
                    /**
                     * Gets the name of this data transform's inverse.
                     */
                    getInverseName(): string;
                    /**
                     * Gets the version of this transform
                     */
                    getVersion(): string;
                    /**
                     * Performs the transform on the data.
                     * @param data  (Required) The data that will be transformed.
                     */
                    transform(data: ArrayBuffer|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array): ArrayBuffer|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array;
                    /**
                     * Gets the size of the transform.
                     */
                    getSize(): geotoolkit.util.Dimension;
                    /**
                     * Sets the size of the transform.
                     * @param size  (Required) The size of the transform.
                     */
                    setSize(size: geotoolkit.util.Dimension): this;
                }
                /**
                 * Defines a singleton registry for the available data transforms.
                 */
                class DataTransformRegistry {
                    /**
                     * Defines a singleton registry for the available data transforms.
                     */
                    constructor();
                    /**
                     * Gets an instance of the data transform registry
                     */
                    static getInstance(): geotoolkit.seismic.data.compression.DataTransformRegistry;
                    /**
                     * Registers a data transform and associates it with a name.
                     * @param dataTransformName  (Required) The name of the data transform.
                     * @param dataTransformClass  (Required) The class that performs data transformation.
                     */
                    register(dataTransformName: string, dataTransformClass: geotoolkit.seismic.data.compression.DataTransformation): any;
                    /**
                     * Unregisters a data transform that is associated with a given name.
                     * @param dataTransformName  (Required) The name of the compression algorithm.
                     */
                    unregister(dataTransformName: string): any;
                    /**
                     * Gets a new instance of a data transform that is registered with a given name.
                     * @param dataTransformName  (Required) The name of the data transform.
                     */
                    getDataTransform(dataTransformName: string): geotoolkit.seismic.data.compression.DataTransformation|any|any;
                    /**
                     * Gets the names of all the registered data transforms.
                     */
                    getAvailableDataTransforms(): string[];
                }
                /**
                 * The base class for data transformations.
                 */
                class Decompress {
                    /**
                     * The base class for data transformations.
                     */
                    constructor();
                    /**
                     * Performs seismic data decompression.
                     * @param config  (Required) A json object containing the decompression configuration.
                     * @param config.height  (Optional) The number of data rows.
                     * @param config.width  (Optional) The number of data columns.
                     * @param config.transf  (Optional) The list of transformation configurations.
                     * @param data  (Optional) The seismic data that will be decompressed.
                     */
                    static decompress(config: any | { height?: number; width?: number; transf?: any[]; } , data?: ArrayBuffer): ArrayBuffer;
                }
            }
            module SeismicMetaData {
                /**
                 * IndexType enumerator, describes the index type of the underlying seismic
                 */
                interface IndexType {
                    /**
                     * Non indexed seismic
                     */
                    NonIndexed: string;
                    /**
                     * Seismic 2D line
                     */
                    TwoD: string;
                    /**
                     * A Seismic Volume, has at least 3 keys see getIndexKeyNames()
                     */
                    Volume: string;
                    /**
                     * Seismic Gather, has at least 4 keys see getIndexKeyNames()
                     */
                    Gather: string;
                    /**
                     * Custom index type
                     */
                    Custom: string;
                }
            }
            module SeismicData {
                /**
                 * IndexType enumerator, describes the index type of the underlying seismic
                 */
                interface Events {
                    /**
                     * Event type fired when a seismic data is modified and requires an update cycle to be done
                     */
                    Invalidate: string;
                }
            }
            module SeismicReader {
                /**
                 * SeismicReader Events enumerator
                 */
                interface Events {
                    /**
                     * Event fired when a data received from the source
                     */
                    DataReceived: string;
                    /**
                     * Event fired when failed to get data from the source
                     */
                    DataFailed: string;
                }
            }
        }
        module util {
            /**
             * Define a colormap which represents a range of color values which can be mapped to samples based on density.<br>
             * It has reserved values for positive and negative fill color. The toolkit also has several default colormaps available, <br>
             * please refer to  {@link geotoolkit.seismic.util.SeismicColors} getDefault()
             */
            class ColorMap extends geotoolkit.util.ColorProvider {
                /**
                 * Define a colormap which represents a range of color values which can be mapped to samples based on density.<br>
                 * It has reserved values for positive and negative fill color. The toolkit also has several default colormaps available, <br>
                 * please refer to  {@link geotoolkit.seismic.util.SeismicColors} getDefault()
                 * @param count  (Required) count of colors
                 * @param name  (Required) color map name
                 */
                constructor(count: number, name: string);
                /**
                 * Return color for the current value
                 * @param value  (Required) the specified color
                 */
                getColor(value: number): geotoolkit.util.RgbaColor;
                /**
                 * Return list of used Stop Points
                 */
                getStopPoints(): any[];
                /**
                 * Return min
                 */
                getMinValue(): number;
                /**
                 * Return max
                 */
                getMaxValue(): number;
                /**
                 * Set min and max value
                 * @param min  (Required) min value in the range of colors
                 * @param max  (Required) max value in the range of colors
                 */
                setRange(min: number, max: number): this;
                /**
                 * Copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.seismic.util.ColorMap): this;
                /**
                 * Returns clone of the color map
                 */
                clone(): geotoolkit.seismic.util.ColorMap;
                /**
                 * Reverse color map
                 */
                reverse(): this;
                /**
                 * Set alpha value for all colors
                 * @param alpha  (Required) the alpha value of the color
                 */
                setAlpha(alpha: number): this;
                /**
                 * Return name
                 */
                getName(): string;
                /**
                 * Set name
                 * @param name  (Required) the name of the colormap
                 */
                setName(name: string): this;
                /**
                 * Return size
                 */
                getSize(): number;
                /**
                 * Set wiggle color
                 * @param color  (Required) the RGBA color
                 */
                setTraceColor(color: any|geotoolkit.util.RgbaColor): this;
                /**
                 * Return trace color
                 */
                getTraceColor(): geotoolkit.util.RgbaColor;
                /**
                 * Set positive fill color
                 * @param color  (Required) the RGBA color
                 */
                setPositiveFillColor(color: geotoolkit.util.RgbaColor): this;
                /**
                 * Return positive fill color
                 */
                getPositiveFillColor(): geotoolkit.util.RgbaColor;
                /**
                 * Set positive fill style to be used instead of positive color
                 * @param style  (Optional) object can be in format of constructor geotoolkit.attributes.FillStyle
                 */
                setPositiveFillStyle(style?: any|geotoolkit.attributes.FillStyle): this;
                /**
                 * Return positive fill style to be used instead of positive color
                 */
                getPositiveFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Set negative fill color
                 * @param color  (Required) the RGBA color
                 */
                setNegativeFillColor(color: geotoolkit.util.RgbaColor): this;
                /**
                 * Return negative fill color
                 */
                getNegativeFillColor(): geotoolkit.util.RgbaColor;
                /**
                 * Set negative fill style to be used instead of negative fill color
                 * @param style  (Optional) object can be in format of constructor geotoolkit.attributes.FillStyle
                 */
                setNegativeFillStyle(style?: any|geotoolkit.attributes.FillStyle): this;
                /**
                 * Return negative fill style to be used instead of negative fill style
                 */
                getNegativeFillStyle(): geotoolkit.attributes.FillStyle;
                /**
                 * Return color array
                 */
                getColors(): any[];
                /**
                 * Sets colors
                 * @param colors  (Required) array of colors
                 */
                setColors(colors: geotoolkit.util.RgbaColor[]): this;
                /**
                 * internal use only
                 * @param alpha  (Optional) number from 0 to 1
                 * @param rgbaColor  (Optional) array of colors
                 */
                compile(alpha?: number, rgbaColor?: geotoolkit.util.RgbaColor[]|geotoolkit.util.RgbaColor): number[]|number;
                /**
                 * Returns clone of the color map
                 */
                clone(): geotoolkit.seismic.util.ColorMap;
                /**
                 * Invalidate Default ColorProvider and notify visuals for update
                 */
                invalidate(): this;
                /**
                 * Enable / disable notification
                 * @param enable  (Required) enable or disable notifications
                 * @param force  (Optional) true if parent should be invalidated immediately
                 */
                setNotification(enable: boolean, force?: boolean): this;
                /**
                 * Return state of notification
                 */
                isNotificationEnabled(): boolean;
                /**
                 * Returns surface that represents color map
                 * @param width  (Required) width of the image
                 * @param height  (Required) height of the image
                 * @param vertical  (Required) is vertical or not
                 */
                exportToImage(width: number, height: number, vertical: boolean): geotoolkit.renderer.Surface;
            }
            /**
             * Defines a default SeismicColor set. Users can create a custom SeismicColor set or get a default implementation. Please refer to SeismicColors.getDefault() for a list of default sets.
             */
            class SeismicColors {
                /**
                 * Defines a default SeismicColor set. Users can create a custom SeismicColor set or get a default implementation. Please refer to SeismicColors.getDefault() for a list of default sets.
                 */
                constructor();
                /**
                 * Register colorMap
                 * @param name  (Required) The name of the colorMap
                 * @param callback  (Required) The registration function.
                 */
                register(name: string, callback: Function): this;
                /**
                 * Returns list of available color map
                 */
                listNameColorMaps(): string[];
                /**
                 * Build named color map with specified ramp size
                 * @param name  (Required) The name of the colorMap
                 * @param rampSize  (Optional) The number of color bins in the colorMap.
                 */
                createNamedColorMap(name: string, rampSize?: number): geotoolkit.seismic.util.ColorMap;
                /**
                 * Returns the default instance of colormaps. The default colormaps available are: <br>
                 * <br>
                 * geotoolkit.seismic.util.defines.Angles5color, <br>
                 * geotoolkit.seismic.util.defines.BlackRedYellowWhite, <br>
                 * geotoolkit.seismic.util.defines.GreyOrange,<br>
                 * geotoolkit.seismic.util.defines.IntervalVelocity,<br>
                 * geotoolkit.seismic.util.defines.IntervalVelocity16,<br>
                 * geotoolkit.seismic.util.defines.IntervalVelocity32,<br>
                 * geotoolkit.seismic.util.defines.Rainbow,<br>
                 * geotoolkit.seismic.util.defines.RedGreenBlue,<br>
                 * geotoolkit.seismic.util.defines.RedWhiteBlack,<br>
                 * geotoolkit.seismic.util.defines.RedWhiteBlue,<br>
                 * geotoolkit.seismic.util.defines.RedWhiteBlueExtremes,<br>
                 * geotoolkit.seismic.util.defines.RedWhiteBlueHot,<br>
                 * geotoolkit.seismic.util.defines.RedYellowBlue,<br>
                 * geotoolkit.seismic.util.defines.Saddleback,<br>
                 * geotoolkit.seismic.util.defines.SaddlebackHot,<br>
                 * geotoolkit.seismic.util.defines.Spectrum,<br>
                 * geotoolkit.seismic.util.defines.WhiteBlack<br>
                 */
                static getDefault(): geotoolkit.seismic.util.SeismicColors;
            }
            module defines {
                /**
                 */
                var Angles5color: any;
                /**
                 */
                var BlackRedYellowWhite: any;
                /**
                 */
                var GreyOrange: any;
                /**
                 */
                var IntervalVelocity: any;
                /**
                 */
                var IntervalVelocity16: any;
                /**
                 */
                var IntervalVelocity32: any;
                /**
                 */
                var Rainbow: any;
                /**
                 */
                var RedGreenBlue: any;
                /**
                 */
                var RedWhiteBlack: any;
                /**
                 */
                var RedWhiteBlue: any;
                /**
                 */
                var RedWhiteBlueExtremes: any;
                /**
                 */
                var RedWhiteBlueHot: any;
                /**
                 */
                var RedYellowBlue: any;
                /**
                 */
                var Saddleback: any;
                /**
                 */
                var SaddlebackHot: any;
                /**
                 */
                var Spectrum: any;
                /**
                 */
                var WhiteBlack: any;
                /**
                 * Default builtin colormaps seeds.<br>
                 */
                var Defaults: any[];
            }
        }
        module pipeline {
            /**
             * This class is an implementation of the seismic data processing pipeline that handles seismic traces from the data source to the seismic image generation stage.
             * <p>
             * The first operation performed by the SeismicPipeline is to read the seismic traces.
             * The  users can apply one or more filters, perform gain control, scale data,  interpolate the trace samples based on the display scale and finally generate the seismic image (Rasterization process) based on the selected plot type. Moreover, the user may want to
             * create custom operations (filters) and apply them as well.
             * The SeismicPipeline provides a flexible structure for users to insert their own trace processing. The SeismicPipeline is organized as a succession
             * of trace processors working on individual trace data (samples). The output data from one trace process
             * serves as the input data for the next process in pipeline.
             * The base class for the trace processors is <a href="geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.html">SeismicTraceProcessor</a>. The default trace processes are data normalization, interpolation
             * and rasterization process, which can be configured using the methods provided in this class.
             * </p>
             * <p>The first stage of a SeismicPipeline always needs to be a Seismic Reader (geotoolkit.seismic.data.SeismicReader).
             * The last 3 stages of the pipelines are Data Normalization, Data Interpolation and Rasterization in that order.
             * Any additional processor (such as filtering, AGC or any custom processor) are inserted between the Seismic Reader and Data Normalization and applied in the order which they are inserted.</p>
             * <p><b>Data Normalization</b>: The data normalization stage is used to normalize the seismic amplitudes before scaling and rasterization.
             * The normalization process applies one constant scalar value across the entire trace. The normalization factor can be the same for
             * all the traces in a dataset or can be calculated on the fly for each trace (trace normalization options).
             * The normalization factor can be calculated based on the dataset min and max values, the average or the RMS value.
             * The user can also provide custom limits to make comparison between datasets easier.
             * </p>
             * <p><b>Data Interpolation</b>:
             * The data interpolation stage adjusts the number of samples in the trace to match the height of the display (based on vertical scale settings). This may require interpolation (adding samples) or decimation (removing samples).
             * See methods setInterpolationType() and setInterpolationEdge() to control how samples are interpolated.
             * </p>
             * <p><b>Rasterization</b>:
             * The rasterization stage generates the seismic image. Usually seismic data is represented as a density plot (based on a colormap), as wiggles (monochrome or colored) or a combination of both.
             * Use method setPlotType() to control the display type and method setColorMap() to specify a colormap if required.
             * These plot types include both density displays, variable area wiggle fill displays and combinations of both.
             * A list of supported plot types is provided below:
             * </p>
             * <ul>
             * <li>Wiggle  - Wiggle display</li>
             * <li>NegativeFill - Negative monochrome variable area fill</li>
             * <li>PositiveFill -  Positive monochrome variable area fill</li>
             * <li>NegativeColorFill - Negative color variable area fill. Color varies inside the lobe based on the sample amplitude at each sample location.</li>
             * <li>PositiveColorFill -  Positive color variable area fil. Color varies inside the lobe based on the sample amplitude at each sample location. </li>
             * <li>SimpleDensity - Density color fill</li>
             * <li>InterpolatedDensity - Interpolated density color fill (between traces).</li>
             * </ul>
             * <p> The general logic of the pipeline can be presented as:
             * When a seismic image needs to render specific portion of seismic data (range of traces,
             * range of samples) it requests pipeline to provide necessary data trace by trace.
             * Pipeline sends request to the <a href="geotoolkit.seismic.data.SeismicReader.html">geotoolkit.seismic.data.SeismicReader</a>
             * that provides seismic data and forwards loaded traces to each seismic traces processor. The data are modified by every
             * process in pipeline and then forwarded to rasterizer that produces an image the users see on the output device like screen.
             * </p>
             */
            class SeismicPipeline extends geotoolkit.util.EventDispatcher {
                /**
                 * This class is an implementation of the seismic data processing pipeline that handles seismic traces from the data source to the seismic image generation stage.
                 * <p>
                 * The first operation performed by the SeismicPipeline is to read the seismic traces.
                 * The  users can apply one or more filters, perform gain control, scale data,  interpolate the trace samples based on the display scale and finally generate the seismic image (Rasterization process) based on the selected plot type. Moreover, the user may want to
                 * create custom operations (filters) and apply them as well.
                 * The SeismicPipeline provides a flexible structure for users to insert their own trace processing. The SeismicPipeline is organized as a succession
                 * of trace processors working on individual trace data (samples). The output data from one trace process
                 * serves as the input data for the next process in pipeline.
                 * The base class for the trace processors is <a href="geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.html">SeismicTraceProcessor</a>. The default trace processes are data normalization, interpolation
                 * and rasterization process, which can be configured using the methods provided in this class.
                 * </p>
                 * <p>The first stage of a SeismicPipeline always needs to be a Seismic Reader (geotoolkit.seismic.data.SeismicReader).
                 * The last 3 stages of the pipelines are Data Normalization, Data Interpolation and Rasterization in that order.
                 * Any additional processor (such as filtering, AGC or any custom processor) are inserted between the Seismic Reader and Data Normalization and applied in the order which they are inserted.</p>
                 * <p><b>Data Normalization</b>: The data normalization stage is used to normalize the seismic amplitudes before scaling and rasterization.
                 * The normalization process applies one constant scalar value across the entire trace. The normalization factor can be the same for
                 * all the traces in a dataset or can be calculated on the fly for each trace (trace normalization options).
                 * The normalization factor can be calculated based on the dataset min and max values, the average or the RMS value.
                 * The user can also provide custom limits to make comparison between datasets easier.
                 * </p>
                 * <p><b>Data Interpolation</b>:
                 * The data interpolation stage adjusts the number of samples in the trace to match the height of the display (based on vertical scale settings). This may require interpolation (adding samples) or decimation (removing samples).
                 * See methods setInterpolationType() and setInterpolationEdge() to control how samples are interpolated.
                 * </p>
                 * <p><b>Rasterization</b>:
                 * The rasterization stage generates the seismic image. Usually seismic data is represented as a density plot (based on a colormap), as wiggles (monochrome or colored) or a combination of both.
                 * Use method setPlotType() to control the display type and method setColorMap() to specify a colormap if required.
                 * These plot types include both density displays, variable area wiggle fill displays and combinations of both.
                 * A list of supported plot types is provided below:
                 * </p>
                 * <ul>
                 * <li>Wiggle  - Wiggle display</li>
                 * <li>NegativeFill - Negative monochrome variable area fill</li>
                 * <li>PositiveFill -  Positive monochrome variable area fill</li>
                 * <li>NegativeColorFill - Negative color variable area fill. Color varies inside the lobe based on the sample amplitude at each sample location.</li>
                 * <li>PositiveColorFill -  Positive color variable area fil. Color varies inside the lobe based on the sample amplitude at each sample location. </li>
                 * <li>SimpleDensity - Density color fill</li>
                 * <li>InterpolatedDensity - Interpolated density color fill (between traces).</li>
                 * </ul>
                 * <p> The general logic of the pipeline can be presented as:
                 * When a seismic image needs to render specific portion of seismic data (range of traces,
                 * range of samples) it requests pipeline to provide necessary data trace by trace.
                 * Pipeline sends request to the <a href="geotoolkit.seismic.data.SeismicReader.html">geotoolkit.seismic.data.SeismicReader</a>
                 * that provides seismic data and forwards loaded traces to each seismic traces processor. The data are modified by every
                 * process in pipeline and then forwarded to rasterizer that produces an image the users see on the output device like screen.
                 * </p>
                 * @param name  (Required) Name of the pipeline
                 * @param reader  (Required) Instance of the reader that provide the seismic data
                 * @param statistics  (Required) object
                 * @param statistics.average  (Required) Average trace value
                 * @param statistics.min  (Required) Minimum trace value
                 * @param statistics.max  (Required) Maximum trace value
                 * @param statistics.rms  (Required) RMS of trace values
                 * @param options  (Optional) options, see {@link geotoolkit.seismic.pipeline.SeismicPipeline.setOptions}
                 */
                constructor(name: string, reader: geotoolkit.seismic.data.SeismicReader, statistics: any | { average?: number; min?: number; max?: number; rms?: number; } , options?: any);
                /**
                 * SeismicPipeline's Events enumerator. These events are fired while setting options ( see setOptions()) on the seismic pipeline.
                 */
                static Events: any;
                /**
                 * SeismicPipeline's Query type enumerator.
                 * These types are used with select option
                 */
                static QueryType: any;
                /**
                 * Construct a new seismic pipeline from the specified seismic pipeline.
                 * @param src  (Required) an instance of the seismic pipeline to make a copy.
                 */
                protected copyConstructor(src: geotoolkit.seismic.pipeline.SeismicPipeline): this;
                /**
                 * Creates a clone of the seismic pipline.
                 * All inheritors should implement copy constructor or provide custom implementation for this method.
                 */
                clone(): geotoolkit.seismic.pipeline.SeismicPipeline;
                /**
                 * Returns the seismic reader. The seismic reader is responsible for reading seismic data from various sources and providing it to the seismic pipeline.
                 */
                getReader(): geotoolkit.seismic.data.SeismicReader;
                /**
                 * Returns the current state of trace data fetching process. This method is useful to check if a pipeline is still receiving traces from the data
                 * source
                 */
                isFetching(): boolean;
                /**
                 * Adds a callback method to the trace data fetching process. The callback method is triggered when the seismic pipeline is ready to process the query.
                 * @param callback  (Required) Whenever pipeline is ready to process your query, callback funtion is triggered.
                 */
                await(callback: Function): any;
                /**
                 * Returns the number of traces available from the seismic metadata.
                 */
                getNumberOfTraces(): number;
                /**
                 * Returns the number of samples available from the seismic metadata.
                 */
                getNumberOfSamples(): number;
                /**
                 * Returns a JSON object that has seismic data statistics, namely 'average', 'min', 'max', 'rms'
                 */
                getStatistics(): {statistics:{average:number;min:number;max:number;rms:number}}|any;
                /**
                 * Enum of seismic pipeline interpolation types
                 */
                static InterpolationType: any;
                /**
                 * Enum of interpolation edge behavior, specify how interpolation will handle edges (beginning and end) of data
                 */
                static InterpolationEdge: any;
                /**
                 * Enum of normalization types used when rendering normalization.
                 */
                static NormalizationType: any;
                /**
                 * Returns seismic transformation which determines how many traces and samples per unit is displayed on the screen.
                 */
                getTransformation(): geotoolkit.util.Transformation;
                /**
                 * Sets trace mapping. If this mapping is set the trace decimation is off.
                 * @param mapping  (Required) a new trace mapping
                 */
                setTraceMapping(mapping: geotoolkit.seismic.data.TraceMapping): this;
                /**
                 * returns trace mapping
                 */
                getTraceMapping(): geotoolkit.seismic.data.TraceMapping;
                /**
                 * Returns trace offset
                 */
                getTraceOffset(): number;
                /**
                 * Set trace offset
                 * @param offset  (Required) trace offset
                 */
                setTraceOffset(offset: number): this;
                /**
                 * Executes a query with specified condition. This query result will be applied to all the trace processors active in the seismic pipeline.
                 * @param condition  (Required) object Condition to select range of traces based on parameters namely, from and to.
                 * @param condition.from  (Required) Start of the trace or trace location
                 * @param condition.to  (Required) End of the trace or trace location
                 * @param condition.type  (Optional) type fo the query
                 * @param fetchCallback  (Optional) Callback function which is executed when data (query result) has arrived for the selection.
                 * @param validationCallback  (Optional) Callback function which is executed before data requested.
                 */
                select(condition: any | { from?: number; to?: number; type?: geotoolkit.seismic.pipeline.SeismicPipeline.QueryType; } , fetchCallback?: Function, validationCallback?: Function): any;
                /**
                 * Adds trace processors to the seismic pipeline. The added trace processors should be made active to apply it to the data before rendering to a seismic image.
                 * @param processor  (Required) A process to apply for seismic trace
samples
                 */
                addTraceProcessor(processor: geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor): this;
                /**
                 * Removes an existing trace processor from the seismic pipeline.
                 * @param processor  (Required) The Seismic Data Trace Processor
                 */
                removeTraceProcessor(processor: geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor): this;
                /**
                 * Returns the existing trace processor by index.
                 * @param index  (Required) Index of the trace process in the collection
                 */
                getTraceProcessor(index: number): geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor;
                /**
                 * Returns a count of SeismicTraceProcessor[s] applied to the seismic pipeline
                 */
                getTraceProcessorsCount(): number;
                /**
                 * Reset model limits of the seismic pipeline to null.
                 */
                resetModelLimits(): this;
                /**
                 * Return data limits of traces and sampels
                 */
                getDataLimits(): geotoolkit.util.Rect;
                /**
                 * Returns the current model limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Returns the rasterization plot type
                 */
                getPlotType(): {plottype:{Wiggle:boolean;PositiveFill:boolean;NegativeFill:boolean;PositiveColorFill:boolean;NegativeColorFill:boolean;SimpleDensity:boolean;InterpolatedDensity:boolean;Reversed:boolean}}|any;
                /**
                 * Sets the rasterization plot type
                 * @param plotType  (Required) JSON object that contains combination of flags that specify how to render seismic
                 * @param plotType.Wiggle  (Optional) wiggle or not
                 * @param plotType.PositiveFill  (Optional) flag to set Positive Fill or not
                 * @param plotType.NegativeFill  (Optional) flag to set Negative Fill or not
                 * @param plotType.PositiveColorFill  (Optional) flag to set Positive ColorFill or not
                 * @param plotType.NegativeColorFill  (Optional) flag to set Negative ColorFill or not
                 * @param plotType.LobeColorFill  (Optional) flag to set LobeColorFill or not
                 * @param plotType.SimpleDensity  (Optional) flag to set Simple Density or not
                 * @param plotType.InterpolatedDensity  (Optional) flag to set Interpolated Density or not
                 * @param plotType.Reversed  (Optional) reversed amplitude direction
                 * @param invalidate  (Optional) flag set to notify the listener if pipeline changes
                 */
                setPlotType(plotType: any | { Wiggle?: boolean; PositiveFill?: boolean; NegativeFill?: boolean; PositiveColorFill?: boolean; NegativeColorFill?: boolean; LobeColorFill?: boolean; SimpleDensity?: boolean; InterpolatedDensity?: boolean; Reversed?: boolean; } , invalidate?: boolean): this;
                /**
                 * Returns the name of the seimsic pipeline.
                 */
                getName(): string;
                /**
                 * Sets color map for rendering the seismic image.
                 * @param colorMap  (Required) sets the color map
                 */
                setColorMap(colorMap: geotoolkit.seismic.util.ColorMap): this;
                /**
                 * Returns the color map used to render the seismic image.
                 */
                getColorMap(): geotoolkit.seismic.util.ColorMap;
                /**
                 * Sets interpolation type.
                 * @param interpolationType  (Required) Enum of seismic pipeline interpolation types
                 */
                setInterpolationType(interpolationType: geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType): boolean;
                /**
                 * Returns interpolation type defined under geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType
                 */
                getInterpolationType(): geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType;
                /**
                 * Sets the interpolation edge.
                 * @param interpolationEdge  (Required) Specifies how interpolation handles edge (begin and end elements) of data
                 */
                setInterpolationEdge(interpolationEdge: geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge): boolean;
                /**
                 * Returns interpolation edge
                 */
                getInterpolationEdge(): geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge;
                /**
                 * Sets interpolation type.
                 * @param interpolationType  (Required) Enum of seismic pipeline interpolation types
                 */
                setSamplesInterpolationType(interpolationType: geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType): boolean;
                /**
                 * Returns interpolation type defined under geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType
                 */
                getSamplesInterpolationType(): geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType;
                /**
                 * Sets the interpolation edge.
                 * @param interpolationEdge  (Required) Specifies how interpolation handles edge (begin and end elements) of data
                 */
                setSamplesInterpolationEdge(interpolationEdge: geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge): boolean;
                /**
                 * Returns interpolation edge
                 */
                getSamplesInterpolationEdge(): geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge;
                /**
                 * Sets interpolation type.
                 * @param interpolationType  (Required) Enum of seismic pipeline interpolation types
                 */
                setTracesInterpolationType(interpolationType: geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType): boolean;
                /**
                 * Returns interpolation type defined under geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType
                 */
                getTracesInterpolationType(): geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType;
                /**
                 * Sets the interpolation edge.
                 * @param interpolationEdge  (Required) Specifies how interpolation handles edge (begin and end elements) of data
                 */
                setTracesInterpolationEdge(interpolationEdge: geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge): boolean;
                /**
                 * Returns interpolation edge
                 */
                getTracesInterpolationEdge(): geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge;
                /**
                 * Sets data normalization parameters on the seismic pipeline.
                 * @param normalization  (Required) normalization options
                 * @param normalization.type  (Required) enum of normalization types
                 * @param normalization.limits  (Required) normalization limits (min,max)
                 * @param normalization.scale  (Required) scale factor
                 */
                setNormalization(normalization: any | { type?: geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType; limits?: geotoolkit.util.Range; scale?: number; } ): this;
                /**
                 * Return normalization
                 */
                getNormalization(): {Normalization:{type:geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType;limits:geotoolkit.util.Range;scale:number}}|any;
                /**
                 * Gets normalization scale
                 */
                getScaleFactor(): number;
                /**
                 * Returns current pipeline state
                 */
                getOptions(): {options:{maximumTracesPerPixel:number;tracemapping:geotoolkit.seismic.data.TraceMapping;traceoffset:number;interpolation:{type:string;edge:string;traces:{type:string;edge:string};samples:{type:string;edge:string}};normalization:{type:geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType;limits:geotoolkit.util.Range;scale:number};plot:{type:string;clippingFactor:number;decimationSpacing:number;densityDecimation:boolean|true};colors:{colorMap:string|geotoolkit.seismic.util.SeismicColors;alpha:number};dataProcessors:any;fetch:{synchronous:boolean;maxfetch:number;awaittime:number;fetchsize:number}}}|any;
                /**
                 * Set pipeline options
                 * @param options  (Optional) pipeline options
                 * @param options.maximumTracesPerPixel  (Optional) maximum traces per pixel
                 * @param options.tracemapping  (Optional) optional trace mapping
                 * @param options.traceoffset  (Optional) optional trace offset
                 * @param options.version  (Optional) version
                 * @param options.interpolation  (Optional) interpolation options
                 * @param options.interpolation.type  (Optional) deprecated (since 2.6 use options.interpolation.samples.type) enum of interpolation types
                 * @param options.interpolation.edge  (Optional) deprecated (since 2.6 use options.interpolation.samples.edge) enum of interpolation edge behavior
                 * @param options.interpolation.traces  (Optional) options for interpolation between traces
                 * @param options.interpolation.traces.type  (Optional) enum of interpolation types
                 * @param options.interpolation.traces.edge  (Optional) enum of interpolation edge behavior
                 * @param options.interpolation.samples  (Optional) options for interpolation between samples inside trace
                 * @param options.interpolation.samples.type  (Optional) enum of interpolation types
                 * @param options.interpolation.samples.edge  (Optional) enum of interpolation edge behavior
                 * @param options.normalization  (Optional) normalization options
                 * @param options.normalization.type  (Optional) normalization type
                 * @param options.normalization.limits  (Optional) normalization limits
                 * @param options.normalization.scale  (Optional) normalization params
                 * @param options.plot  (Optional) plot options
                 * @param options.plot.type  (Optional) plot type. Please refer to different options for plot type from method SeismicPipeline.setPlotType()
                 * @param options.plot.clippingFactor  (Optional) clipping factor for traces
                 * @param options.plot.decimationSpacing  (Optional) decimation for traces
                 * @param options.plot.densityDecimation  (Optional) decimation for traces in density mode, default value is undefined it means that it true only if wiggles are display
                 * @param options.colors  (Optional) colors
                 * @param options.colors.colorMap  (Optional) color map
                 * @param options.colors.alpha  (Optional) alpha chanel ratio
                 * @param options.fetch  (Optional) fetch options
                 * @param options.fetch.synchronous  (Optional) synchronous state
                 * @param options.fetch.maxfetch  (Optional) maximum amount of active queries
                 * @param options.fetch.awaittime  (Optional) time out
                 * @param options.fetch.fetchsize  (Optional) maximum amount of traces per request
                 */
                setOptions(options?: any | { maximumTracesPerPixel?: number; tracemapping?: geotoolkit.seismic.data.TraceMapping; traceoffset?: number; version?: string; interpolation?: any | { type?: string; edge?: string; traces?: string|any | { type?: string; edge?: string; } ; samples?: string|any | { type?: string; edge?: string; } ; } ; normalization?: any | { type?: geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType; limits?: geotoolkit.util.Range; scale?: number; } ; plot?: any | { type?: string; clippingFactor?: number; decimationSpacing?: number; densityDecimation?: boolean|any; } ; colors?: any | { colorMap?: string|geotoolkit.seismic.util.SeismicColors; alpha?: number; } ; fetch?: any | { synchronous?: boolean; maxfetch?: number; awaittime?: number; fetchsize?: number; } ; } ): this;
                /**
                 * Render seismic model in to the canvas
                 * @param seismicModelBounds  (Required) seismic source model bounds
                 * @param canvas  (Required) target image
                 * @param targetBounds  (Optional) target bounds
                 * @param offsetX  (Optional) x position on the canvas
                 * @param offsetY  (Optional) y position on the canvas
                 * @param fetchCallback  (Optional) Callback function which is executed when data (query result) has arrived for the selection.
                 * @param validationCallback  (Optional) Callback function which is executed before data requested.
                 */
                exportToImage(seismicModelBounds: geotoolkit.util.Rect, canvas: HTMLCanvasElement, targetBounds?: geotoolkit.util.Rect, offsetX?: number, offsetY?: number, fetchCallback?: Function, validationCallback?: Function): any;
                /**
                 * Returns model to sample transformation
                 */
                getModelToSamplesTransformation(): geotoolkit.util.Transformation;
                /**
                 * Invalidate node
                 * @param params  (Optional) additional invalidate parameters
                 */
                invalidate(params?: any): any;
                /**
                 * Add invalidate handler
                 * @param handler  (Required) Handler to be notified when the seismic pipeline is invalidated
                 */
                addInvalidateHandler(handler: Function): any;
                /**
                 * Remove the handler so that it does not receive any notification about the seismic pipeline invalidation.
                 * @param handler  (Required) Handler to be removed from receiving notification about invalidation
                 */
                removeInvalidateHandler(handler: Function): any;
                /**
                 * Disposes this pipeline. Once disposed, the pipeline should not be used anymore.<br>
                 * Please clear all listeners  and invalidate handlers to avoid memory leaks.<br>
                 */
                dispose(): any;
                /**
                 * This method invalidates the pipleine and any existing trace processors.
                 */
                refresh(): this;
                /**
                 * This method clears the pipeline and processors memory allocations
                 */
                clear(): this;
            }
            module processor {
                /**
                 * Defines a singleton registry for the available trace processor types
                 */
                class ProcessorRegistry {
                    /**
                     * Defines a singleton registry for the available trace processor types
                     */
                    constructor();
                    /**
                     * Registers a processor name with a processor class.
                     * @param processorName  (Required) The name of the trace processor.
                     * @param processorClass  (Required) The class of the trace processor.
                     */
                    static register(processorName: string, processorClass: any): any;
                    /**
                     * Unregisters a processor by name from the processor registry.
                     * @param processorName  (Required) The name of the trace processor.
                     */
                    static unregister(processorName: string): any;
                    /**
                     * Gets a default instance of the trace processor by its registered name
                     * @param processorName  (Required) The name of the trace processor.
                     */
                    static getProcessor(processorName: string): any;
                    /**
                     * Gets all of the registered processor names.
                     */
                    static getAllProcessors(): string[];
                }
                /**
                 * A Seismic Trace Processor is the implementation of a trace processing algorithm for seismic data. It is an extension point that allows the addition of custom trace processors.<br>
                 * A trace process usually represents an operation that can be performed on trace data (samples). It processes data trace by trace.
                 */
                class SeismicTraceProcessor {
                    /**
                     * A Seismic Trace Processor is the implementation of a trace processing algorithm for seismic data. It is an extension point that allows the addition of custom trace processors.<br>
                     * A trace process usually represents an operation that can be performed on trace data (samples). It processes data trace by trace.
                     * @param state  (Required) the default properties
                     * @param state.name  (Required) name of the processor
                     * @param state.apply  (Required) whether the processor is active or not.
                     */
                    constructor(state: any | { name?: string; apply?: boolean; } );
                    /**
                     * Returns stateValue if true or false, value instead
                     * @param value  (Required) value
                     * @param defaultValue  (Required) default value
                     */
                    verifyBoolean(value: boolean, defaultValue: boolean): boolean;
                    /**
                     * Returns stateValue if string, value instead
                     * @param value  (Required) value
                     * @param defaultValue  (Required) default value
                     */
                    verifyString(value: string, defaultValue: string): string;
                    /**
                     * Returns stateValue not null, value instead
                     * @param stateValue  (Required) value
                     * @param value  (Required) default value
                     */
                    verify(stateValue: any, value: any): any;
                    /**
                     * Sets state 'name' and 'apply' values to respectively name and false.
                     * Returns state object
                     * @param state  (Required) the default properties
                     * @param name  (Required) name of the processor
                     */
                    static verifyState(state: any, name: string): any;
                    /**
                     * Sets apply
                     * @param apply  (Required) whether the processor is active or not
                     */
                    apply(apply: boolean): any;
                    /**
                     * Returns name of the processor
                     */
                    getName(): string;
                    /**
                     * Set apply and name values
                     * @param state  (Required) the default properties
                     * @param state.name  (Required) name of the processor
                     * @param state.apply  (Required) whether the processor is active or not.
                     */
                    setState(state: any | { name?: string; apply?: boolean; } ): this;
                    /**
                     * Returns apply and name values
                     */
                    getState(): {state:{name:string;apply:boolean}}|any;
                    /**
                     * Returns true if processor is active
                     */
                    isApplicable(): boolean;
                    /**
                     * The function returns 'True' if the process was applied to the traces or 'False' if it was not applied.
                     * @param pipeline  (Required) the seismic pipeline name
                     * @param metadata  (Required) seismic metadata
                     * @param dataIn  (Required) The input data array on which the process should be applied
                     * @param dataOut  (Required) The output/processed data array
                     */
                    process(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, metadata: geotoolkit.seismic.data.SeismicMetaData, dataIn: Float32Array, dataOut: Float32Array): boolean;
                    /**
                     * Invalidate node
                     */
                    invalidate(): any;
                }
                /**
                 * Defines a processor to reverse trace values
                 */
                class Reverse extends geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor {
                    /**
                     * Defines a processor to reverse trace values
                     * @param state  (Required) 
                     * @param state.name  (Required) the name of the processor
                     * @param state.apply  (Required) to apply the process or not.
                     * @param state.reversed  (Required) reversed trace values or not
                     * @param state.inverted  (Required) invert polarity or not. Specifies if the polarity is +ve or -ve
                     */
                    constructor(state: any | { name?: string; apply?: boolean; reversed?: boolean; inverted?: boolean; } );
                    /**
                     */
                    isApplicable(): boolean;
                    /**
                     * Sets base line reversed to value
                     * @param reverse  (Required) specifies if the baseline of the trace is reversed or not
                     */
                    reverseBaseLine(reverse: boolean): any;
                    /**
                     * Sets polarity inverted to value
                     * @param inverse  (Required) specifies if the polarity is +ve or -ve
                     */
                    inversePolarity(inverse: boolean): any;
                    /**
                     * Sets state
                     * @param state  (Required) sets the state
                     * @param state.reversed  (Required) specifies if the baseline of the trace is reversed or not
                     * @param state.inverted  (Required) specifies if the polarity is +ve or -ve
                     */
                    setState(state: any | { reversed?: boolean; inverted?: boolean; } ): any;
                    /**
                     * return state of the processor
                     */
                    getState(): {state:{reversed:boolean;inverted:boolean}}|any;
                    /**
                     * @param pipeline  (Required) 
                     * @param metadata  (Required) 
                     * @param dataIn  (Required) 
                     * @param dataOut  (Required) 
                     */
                    process(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, metadata: any, dataIn: Float32Array, dataOut: Float32Array): boolean;
                }
                /**
                 * Defines implementation of the automatic gain control.
                 * 
                 * <p>
                 * Automatic gain control (AGC) increases the amplitude of the trace samples, automatically.
                 * AGC applies a fixed length window, which slides in the original trace and computes the average amplitude of the window samples.
                 * The gain is calculated and used to normalise the sample in the center part of this window to a fixed value, usually 1.0.
                 * Basically the sample amplitude is divided by the average value. The window then slides down one sample and the next gain
                 * correction is computed. The process continues until the whole trace has been processed.
                 * </p>
                 * <p>
                 * AGC is commonly used to improve visibility of late-arriving events.
                 * </p>
                 */
                class AGC extends geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor {
                    /**
                     * Defines implementation of the automatic gain control.
                     * 
                     * <p>
                     * Automatic gain control (AGC) increases the amplitude of the trace samples, automatically.
                     * AGC applies a fixed length window, which slides in the original trace and computes the average amplitude of the window samples.
                     * The gain is calculated and used to normalise the sample in the center part of this window to a fixed value, usually 1.0.
                     * Basically the sample amplitude is divided by the average value. The window then slides down one sample and the next gain
                     * correction is computed. The process continues until the whole trace has been processed.
                     * </p>
                     * <p>
                     * AGC is commonly used to improve visibility of late-arriving events.
                     * </p>
                     * @param state  (Required) of the data filter
                     * @param state.apply  (Required) process activated or not.
                     * @param state.desiredAverage  (Required) desired average amplitude
                     * @param state.units  (Required) enum of AGC units
                     * @param state.windowLength  (Required) the AGC window size
                     * @param state.agcLength  (Required) AGC length
                     * @param state.startSample  (Required) start smaple to start the AGC process
                     * @param state.step  (Required) step
                     */
                    constructor(state: any | { apply?: boolean; desiredAverage?: number; units?: geotoolkit.seismic.pipeline.processor.AGC.Units; windowLength?: number; agcLength?: number; startSample?: number; step?: number; } );
                    /**
                     * Enum of AGC units
                     */
                    static Units: any;
                    /**
                     * returns state of the AGC data filter
                     */
                    getState(): any;
                    /**
                     * Sets state of the AGC filter
                     * @param state  (Required) state of the data filter
                     */
                    setState(state: any): this;
                    /**
                     * @param pipeline  (Required) the seismic pipeline
                     * @param metadata  (Required) info of seismic data like sample rate ..
                     * @param dataIn  (Required) sample data in
                     * @param dataOut  (Required) sample data out
                     */
                    process(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, metadata: geotoolkit.seismic.data.SeismicMetaData, dataIn: Float32Array, dataOut: Float32Array): any;
                }
                module AGC {
                    /**
                     * Enum of AGC units
                     */
                    interface Units {
                        /**
                         * units in sample range
                         */
                        Sample: number;
                        /**
                         * units in time range
                         */
                        Time: number;
                    }
                }
            }
            module SeismicPipeline {
                /**
                 * SeismicPipeline's Events enumerator. These events are fired while setting options ( see setOptions()) on the seismic pipeline.
                 */
                interface Events {
                    /**
                     * Event type fired prior to options being set
                     */
                    BeforeSetOptions: string;
                    /**
                     * Event type fired when options are being set
                     */
                    SetOptions: string;
                    /**
                     * Event type fired when trace mapping updated
                     */
                    TraceMappingUpdated: string;
                }
                /**
                 * SeismicPipeline's Query type enumerator.
                 * These types are used with select option
                 */
                interface QueryType {
                    /**
                     * Query type to use from and to in the model coordinate of the pipeline
                     */
                    Model: string;
                    /**
                     * Query type to use from and to in trace coordinet of pipeline
                     */
                    Trace: string;
                }
                /**
                 * Enum of seismic pipeline interpolation types
                 */
                interface InterpolationType {
                    /**
                     * Linear
                     */
                    Linear: number;
                    /**
                     * Quadratic
                     */
                    Quadratic: number;
                    /**
                     * Step interpolation
                     */
                    Step: number;
                    /**
                     * Centered Step interpolation
                     */
                    CenteredStep: number;
                    /**
                     * Cubic spline interpolation
                     */
                    Cubic: number;
                    /**
                     * Logarithmic interpolation
                     */
                    Logarithmic: number;
                }
                /**
                 * Enum of interpolation edge behavior, specify how interpolation will handle edges (beginning and end) of data
                 */
                interface InterpolationEdge {
                    /**
                     * Use a value of 0 when interpolation needs value beyond the edge of the data
                     */
                    Zero: number;
                    /**
                     * Duplicate the nearest value when interpolation needs value beyond the edge of the data
                     */
                    Duplicate: number;
                }
                /**
                 * Enum of normalization types used when rendering normalization.
                 */
                interface NormalizationType {
                    /**
                     * Default behavior. No normalization is applied.
                     */
                    None: number;
                    /**
                     * Uses the maximum amplitude of all samples in the all traces.
                     */
                    Maximum: number;
                    /**
                     * Uses the maximum amplitude of all samples in the trace.
                     */
                    TraceMaximum: number;
                    /**
                     * Uses all traces average absolute value as a normalization amplitude.
                     */
                    Average: number;
                    /**
                     * Uses trace average absolute value as a normalization amplitude.
                     */
                    TraceAverage: number;
                    /**
                     * Uses the mean square of all samples in the all traces.
                     */
                    RMS: number;
                    /**
                     * Uses the mean square of all samples in the trace.
                     */
                    TraceRMS: number;
                    /**
                     * Uses custom normalization limits.
                     */
                    Limits: number;
                }
            }
        }
        module image {
            /**
             * Defines seismic shape implementation as a rectangular shape to render data from seismic pipeline.<br>
             * This shape can render seismic as a simple rectangular shape by using the {@link geotoolkit.seismic.pipeline.SeismicPipeline}.
             * It can be added to any plot/group as a shape. <br>
             * It will delegate rasterization to the pipeline itself so any configuration relative to the seismic rendering (Like Colormap,Interpolation, etc) should be done directly on the pipeline.<br>
             * Seismic Map Image tutorial demonstrates the use of seismic image in the toolkit.
             */
            class SeismicImage extends geotoolkit.scene.shapes.RectangularShape {
                /**
                 * Defines seismic shape implementation as a rectangular shape to render data from seismic pipeline.<br>
                 * This shape can render seismic as a simple rectangular shape by using the {@link geotoolkit.seismic.pipeline.SeismicPipeline}.
                 * It can be added to any plot/group as a shape. <br>
                 * It will delegate rasterization to the pipeline itself so any configuration relative to the seismic rendering (Like Colormap,Interpolation, etc) should be done directly on the pipeline.<br>
                 * Seismic Map Image tutorial demonstrates the use of seismic image in the toolkit.
                 * @param pipeline  (Required) represents seismic data
                 * @param x1  (Required) model coordinate in the parent object or rectangle of model coordinates.
                 * @param y1  (Optional) model coordinate in the parent object.
                 * @param x2  (Optional) model coordinate in the parent object.
                 * @param y2  (Optional) model coordinate in the parent object.
                 * @param mode  (Optional) Shared cache mode by default
                 */
                constructor(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, x1: number|geotoolkit.util.Rect, y1?: number, x2?: number, y2?: number, mode?: geotoolkit.scene.Cache.CacheMode);
                /**
                 * Copy constructor
                 * @param src  (Required) seismic image src
                 */
                protected copyConstructor(src: geotoolkit.seismic.image.SeismicImage): this;
                /**
                 * Sets pipeline
                 * @param pipeline  (Required) the Seismic Pipeline
                 */
                setPipeline(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline): this;
                /**
                 * Returns pipeline
                 */
                getPipeline(): geotoolkit.seismic.pipeline.SeismicPipeline;
                /**
                 * Check if shape is visible and if it's within context
                 * @param context  (Required) the Rendering Context
                 */
                checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
                /**
                 * Sets model limits
                 * @param limits  (Required) limits of the pipeline
                 */
                setModelLimits(limits: geotoolkit.util.Rect): this;
                /**
                 * Returns model limits
                 */
                getModelLimits(): geotoolkit.util.Rect;
                /**
                 * Returns model visible limits
                 */
                getVisibleModelLimits(): geotoolkit.util.Rect;
                /**
                 * Returns transformation
                 */
                getContentsTransform(): geotoolkit.util.Transformation;
                /**
                 * Returns scale options.
                 */
                getScaleOptions(): {scaleOptions:{deviceunit:geotoolkit.util.AbstractUnit;sampleunit:geotoolkit.util.AbstractUnit;tracescale:number;samplescale:number}}|any;
                /**
                 * Sets scale options.
                 * @param scaleOptions  (Required) scale options
                 * @param scaleOptions.deviceunit  (Optional) physical device unit
                 * @param scaleOptions.sampleunit  (Optional) sample unit, sample unit from pipeline will be used if not specified
                 * @param scaleOptions.tracescale  (Optional) in traces per device unit (e.g traces per inch)
                 * @param scaleOptions.samplescale  (Optional) in z unit per device unit if depth data (e.g feet per inch), or in device unit per z unit (e.g inches per second)
                 */
                setScaleOptions(scaleOptions: any | { deviceunit?: geotoolkit.util.AbstractUnit|string; sampleunit?: geotoolkit.util.AbstractUnit|string; tracescale?: number; samplescale?: number; } ): this;
                /**
                 * Render
                 * @param context  (Required) the Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): this;
                /**
                 * Disposes this node, once disposes a node should not be used anymore.<br>
                 * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
                 * Also aggressively 'cleanup' this node by setting some of its members to null.
                 */
                dispose(): any;
            }
            /**
             * Define an interface to provide rendering seismic image
             */
            interface IDrawSeismicImage {
                /**
                 * Draw seismic image
                 */
                drawSeismicImage(): any;
            }
        }
        module axis {
            /**
             * Defines a simple tick generator for seismic axis. This tick generator is specialized to display ticks for seismic shapes.
             */
            class IndexTickGenerator extends geotoolkit.axis.TickGenerator {
                /**
                 * Defines a simple tick generator for seismic axis. This tick generator is specialized to display ticks for seismic shapes.
                 */
                constructor();
                /**
                 * An enumeration defining display value type
                 */
                static DisplayValueType: any;
                /**
                 * Reset tick generator
                 * @param parent  (Required) axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) tick info
                 */
                reset(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): string[];
                /**
                 * Reset ticks. This method is called to start iteration by ticks.
                 * @param parent  (Required) axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) a info about labels.  This information is used to pass and receive information
           about the current tick or label
                 */
                resetTicks(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
                /**
                 * Reset labels. This method is called to start iteration by labels.
                 * @param parent  (Required) axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) a info about labels. This information is used to pass and receive information
            about the current tick or label
                 */
                resetLabels(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
                /**
                 * Generate information about next tick
                 * @param parent  (Required) axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) a info about tick
                 * @param tickIndex  (Required) tick index from 0 to count-1, which resetTicks returns
                 */
                nextTick(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
                /**
                 * Generate information about next label
                 * @param parent  (Required) axis or grid
                 * @param orient  (Required) orientation
                 * @param tickInfo  (Required) a info about tick
                 * @param tickIndex  (Required) tickIndex tick index from 0 to count-1, which resetLabels returns
                 */
                nextLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
                /**
                 * Generate information about label format
                 * @param parent  (Required) axis or grid
                 * @param orientation  (Required) orientation
                 * @param tickInfo  (Required) a info about tick
                 * @param tickIndex  (Required) tickIndex tick index from 0 to count-1, which resetLabels returns
                 * @param modelValue  (Required) model value
                 */
                formatLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orientation: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number, modelValue: number): string;
                /**
                 * Sets format label handler
                 * @param handler  (Required) Function called to generate the label of a value, or geotoolkit.util.Format instance
                 */
                setFormatLabelHandler(handler: Function|geotoolkit.util.Format): this;
                /**
                 * Returns min device step
                 */
                getMinimumSpan(): number;
                /**
                 * Set min device step
                 * @param minimumSpan  (Required) min span between ticks
                 */
                setMinimumSpan(minimumSpan: number): this;
                /**
                 * returns active pipeline
                 */
                getPipeline(): geotoolkit.seismic.pipeline.SeismicPipeline;
                /**
                 * set pipeline
                 * @param pipeline  (Required) Seismic Pipeline
                 */
                setPipeline(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline): this;
                /**
                 * returns type of display value
                 */
                getDisplayValueType(): geotoolkit.seismic.pipeline.SeismicPipeline;
                /**
                 * set type of display value, support Original(trace number) and Mapped(trace position)
                 * @param displayValueType  (Required) type of display value
                 */
                setDisplayValueType(displayValueType: geotoolkit.seismic.axis.IndexTickGenerator.DisplayValueType): this;
            }
            /**
             * Defines a tick generator for seismic traces header values. This tick generator can display ticks for the seismic traces headers.<br>
             * It will retrieve the header values from the given {@link geotoolkit.seismic.pipeline.SeismicPipeline} for the given {@link geotoolkit.seismic.data.FieldDesc} and display ticks for those trace headers.
             */
            class TraceHeaderTickGenerator extends geotoolkit.seismic.axis.IndexTickGenerator {
                /**
                 * Defines a tick generator for seismic traces header values. This tick generator can display ticks for the seismic traces headers.<br>
                 * It will retrieve the header values from the given {@link geotoolkit.seismic.pipeline.SeismicPipeline} for the given {@link geotoolkit.seismic.data.FieldDesc} and display ticks for those trace headers.
                 * @param pipeline  (Required) seismic pipeline
                 * @param headerField  (Required) header field or name of the header field, or id
                 */
                constructor(pipeline: geotoolkit.seismic.pipeline.SeismicPipeline, headerField: geotoolkit.seismic.data.FieldDesc|string|number);
                /**
                 * Reset tick generator
                 * @param parent  (Required) axis or grid
                 * @param orientation  (Required) orientation
                 * @param tickInfo  (Required) tick info
                 */
                reset(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orientation: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): string[];
                /**
                 * Generate information about label format
                 * @param parent  (Required) axis or grid
                 * @param orientation  (Required) orientation
                 * @param tickInfo  (Required) a info about tick
                 * @param tickIndex  (Required) tickIndex tick index from 0 to count-1, which resetLabels returns
                 * @param modelValue  (Required) model value
                 */
                formatLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orientation: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number, modelValue: number): string;
            }
            module IndexTickGenerator {
                /**
                 * An enumeration defining display value type
                 */
                interface DisplayValueType {
                    /**
                     * Original
                     */
                    Original: number;
                    /**
                     * Mapped
                     */
                    Mapped: number;
                }
            }
        }
    }
}
