declare module geotoolkit {
    /**
     * Specify a reference to the dom element window.
     */
    var window: any;
    /**
     * Defines a namespace
     * @param namespaceString  (Required) namespace string
     * @param func  (Required) the function
     */
    function namespace(namespaceString: string, func: Function): any;
    /**
     * expose class
     * @param namespaceString  (Required) strongly specified class name
     * @param object  (Required) object using the class
     */
    function exposeClass(namespaceString: string, object: any): any;
    /**
     * expose interface
     * @param i  (Required) interface
     */
    function exposeInterface(i: any[]): any;
    /**
     * expose static method
     * @param publicName  (Required) public name of the method to expose
     * @param target  (Required) target
     * @param name  (Required) name of the method
     */
    function exposeStaticMethod(publicName: string, target: Function, name: string): Function;
    /**
     * Exposes namespaces and objects using their public names.
     * Maintains a symbolsDictionary with public and obfuscated names.
     * It is an internal method and is used for obfuscation
     * @param name  (Required) name of the object to expose
     * @param object  (Required) object to expose
     * @param objectToExportTo  (Required) object to export to
     */
    function exportSymbol(name: string, object: any, objectToExportTo: any): any;
    /**
     * This method is used if user uses advanced obfuscation libraries which has extension "adv.js". This method maps
     * non obfuscated class with obfuscated base class.
     * When inheriting from a class, this method needs to be called to change names of overridden methods
     * to the obfuscated name
     * @param proto  (Required) sub class
     * @param inheritsfrom  (Required) a base class to be inherited
     */
    function obfuscate(proto: any, inheritsfrom: any): any;
    /**
     * The method registeImplemenation is used to map unobfuscated method to obfuscated in your code, because if you extend obfuscated class its prototype has public methods with different names.<br>
     * For example, your class has a method: <br>
     * myclass.prototype.render = function(context) {}.
     * After obfuscation it will look like: <br>
     * a.prototype.b = function(d) {} <br>
     * and the names of the class "myclass" and method "render" will be in the toolkit in the special map, which actually try to show:
     * a.prototype.b := Myclass.prototype.render.
     * The method registerImplemenation tries to map your method to obfuscated method otherwise libraries cannot understand what method "render" is "a" inside.
     * This class is optional and geotoolkit.obfuscate can be used instead. The difference between two methods is following. The "obfuscate" works for each class and registerImplementation registers all classes and map them at the end.
     * @param proto  (Required) sub class
     * @param inheritsfrom  (Required) a base class to be inherited
     */
    function registerImplementation(proto: any, inheritsfrom: any): any;
    /**
     * compile implementations
     * @param apply  (Required) compile implementations using the apply parameter.
     */
    function applyImplementations(apply: boolean): any;
    /**
     * Sets resources
     * @param moduleName  (Required) module name
     * @param resourceName  (Required) resource name
     * @param resource  (Required) resource object
     */
    function setResource(moduleName: string, resourceName: string, resource: string|any): any;
    /**
     * Return a resource for the current
     * module and resource name.
     * @param moduleName  (Required) current modeule
     * @param resourceName  (Required) resource name
     */
    function getResource(moduleName: string, resourceName: string): string|any|any;
    /**
     * It makes all objects, which belongs to namespace be available by alias name, which is returned.
     * @param namespaceString  (Required) namespace
     */
    function using(namespaceString: string): any|any|any;
    /**
     * Print in console log message. Passes on all parameters as passed.
     * @param args  (Required) a list of objects to output. The string representations of each of these objects are appended together in the order listed and output
     */
    function log(...args: any[]): any;
    /**
     * Print in console info message. Passes on all parameters as passed.
     * @param args  (Required) a list of objects to output. The string representations of each of these objects are appended together in the order listed and output
     */
    function info(...args: any[]): any;
    /**
     * Print in console warn message. Passes on all parameters as passed.
     * @param args  (Required) a list of objects to output. The string representations of each of these objects are appended together in the order listed and output
     */
    function warn(...args: any[]): any;
    /**
     * This method is used to merge properties of two objects from options to results
     * @param options  (Required) an object to merge properties.
     * @param result  (Required) Object to merge properties from options. All properties from options are copied to result. If result contains property from options it is replaced. If result has a property and options doesn't have a property the property will be saved in result.
     * @param lowercase  (Optional) merge all properties to lower case. if this flag is set then result will
have all properties in lower case
     * @param copyUndefinedOptions  (Optional) copy input options with undefined values
     */
    function mergeObjects(options: any, result: any, lowercase?: boolean, copyUndefinedOptions?: boolean): any;
    /**
     * Deep merge object method is the same as mergeObject method , except it supports nested objects.
     * @param options  (Required) an object to merge properties.
     * @param result  (Required) Object to merge properties from options
     * @param lowercase  (Optional) merge all properties to lower case. if this flag is set then result will
have all properties in lower case
     */
    function deepMergeObject(options: any, result: any, lowercase?: boolean): any;
    /**
     * Copy options with values from source object, which exists in options only
     * @param source  (Required) source object
     * @param options  (Required) options to copy from source
     * @param lowercase  (Optional) source and result properties to lower case. if this flag is set then result will
have all properties in lower case
     */
    function copyOptions(source: any, options: any, lowercase?: boolean): any;
    /**
     * return true if the display has touchevents otherwise false
     */
    function isTouchDevice(): boolean;
    /**
     * Inherit the prototype methods from one constructor into another.
     * Based on the Closure Library
     * @param childClass  (Required) Child class.
     * @param parentClass  (Required) Parent class.
     */
    function inherits(childClass: Function, parentClass: Function): any;
    /**
     * call base type copy constructor
     * @param obj  (Required) to be initialized
     * @param src  (Required) data
     */
    function initializePrototype(obj: any, src: any): any;
    /**
     * Return an object class name
     * @param obj  (Required) object to return a class name
     */
    function getObjectClassName(obj: any): string;
    /**
     * Create copy of the object
     * @param obj  (Required) object to copy
     * @param target  (Optional) target
     * @param param  (Optional) param to be passed to copy constructor
     */
    function createCopy(obj: any, target?: any, param?: any): any;
    /**
     * Sets name of the class, which can be retrieved using method getClassName()
     * or toString()
     * @param currentClass  (Required) class
     * @param className  (Required) name of the class
     */
    function setClassName(currentClass: any, className: string): any;
    /**
     * Accepts a collection of image URIs, will pass loaded images to the function
     * passed in as callback
     * @param sources  (Required) array or JSON of images to be loaded
     * @param callback  (Required) function to be called after all images are loaded
     * @param crossOrigin  (Optional) crossOrigin value to be set
     */
    function loadImages(sources: any|string[], callback: Function, crossOrigin?: string): any;
    /**
     * Gets  absolute position of the HTMLElement in window coordinates.
     * @param element  (Required) html element to get the position for
     */
    function getAbsolutePosition(element: HTMLElement): {result:{x:number;y:number}}|any;
    /**
     * This method is used to mark a method, which does not have implementation. By default it throws exception that method is not implemented.
     */
    function abstractMethod(): any;
    /**
     * Specifies a virtual method.<br>
     * MyClass.prototype.myMethod = geotoolkit.virtualMethod<br>
     * 
     * by default it generates log message when invoked to indicate the method should be
     *   overridden.
     */
    function virtualMethod(): any;
    /**
     * Return the current version
     */
    function getVersion(): string;
    /**
     * Return the current version with full information
     */
    function getFullVersion(): any;
    /**
     * gets the properties of a parent of an object
     * @param obj  (Required) The object
     */
    function getParentProperties(obj: any): any;
    /**
     * sets the properties of a parent of an object
     * @param obj  (Required) The object
     * @param properties  (Required) The properties to set
     */
    function setParentProperties(obj: any, properties: any): any;
    /**
     * Returns class constructor of the class, which is specified
     * as string with full namespace.
     * @param className  (Required) class name to get the type for
     */
    function getClassType(className: string): Function;
    /**
     * Return a base class name if it is exists
     * @param className  (Required) class name
     */
    function getBaseClassName(className: string): string|any;
    /**
     * Create instance of the class, which is specified as string with
     * full namespace. This class must have default constructor
     * @param className  (Required) class name to instantiate
     * @param options  (Optional) optional parameters
     */
    function instantiateClass(className: string, options?: any): any|any;
    /**
     * Create a function from a string containing the function
     * @param str  (Required) string to unpack into a function
     */
    function str2Function(str: string): Function;
    /**
     * Enables render using native resolution
     * @param enabled  (Required) device pixel ratio is set based on this flag
     */
    function enableRenderNativeResolution(enabled: boolean): any;
    /**
     * Returns pixel scale on current device
     */
    function getPixelScale(): number;
    /**
     * Converts css size to canvas size
     * @param size  (Required) canvas size
     */
    function convertCssToCanvas(size: number): number;
    /**
     * Converts object to object with properties in lower case
     * @param object  (Required) object to be processed
     */
    function toLowerCase(object: any): any;
    /**
     * process object in order to return the same object with flat property names.
     * @param object  (Required) object to be processed
     * @param recursive  (Optional) is recursive call flag
     */
    function processObjectProperties(object: any, recursive?: boolean): any;
    /**
     * Declares "childClass" to implement "parentInterface"
     * @param childClass  (Required) child class
     * @param parentInterface  (Required) parent interface
     */
    function implements(childClass: Function, parentInterface: Function): any;
    /**
     * Requests "childClass" for "parentInterface" support
     * @param childInstance  (Required) child class instance
     * @param parentInterface  (Required) parent interface
     */
    function interfaceCast(childInstance: any, parentInterface: Function): any;
    /**
     * Check if instance is a parentClass or implements interface
     * @param instance  (Required) instance to check implementation
     * @param parentClass  (Required) parent interface or class
     */
    function isInstanceOf(instance: any, parentClass: Function): boolean;
    module util {
        /**
         * load font into browser
         * @param location  (Required) font location
         * @param family  (Required) font family, must match to file name
         */
        function loadFont(location: string, family: string): geotoolkit.util.Promise;
        /**
         * Enum of anchor types
         */
        var AnchorType: any;
        /**
         * GeometryOreration. Specifies a type of operation to be applied for clipping
         */
        var GeometryOperation: any;
        /**
         * Copyright: Copyright (c) 2013 by INT, Inc.  All rights reserved.<br>
         * Company: INT, Inc. <br>
         * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.<br>
         */
        var Units: any;
        /**
         * Enum of orientations
         */
        var Orientation: any;
        class Base64 {
            /**
             */
            constructor();
            /**
             * encode to base64
             * @param input  (Required) string to encode
             */
            static encode(input: string): string;
            /**
             * decode from base64
             * @param input  (Required) string to decode
             */
            static decode(input: string): string;
        }
        /**
         * This class is a 2D Point implementation. It holds the xy values that define a point coordinates in two dimensions.<br>
         * It also provides some utility functions to manipulate Points, compare points or calculate distance between points.
         */
        class Point {
            /**
             * This class is a 2D Point implementation. It holds the xy values that define a point coordinates in two dimensions.<br>
             * It also provides some utility functions to manipulate Points, compare points or calculate distance between points.
             * @param x  (Optional) x coordinate or an object with 'x' and 'y' properties
             * @param x.x  (Optional) x coordinate
             * @param x.y  (Optional) y coordinate
             * @param y  (Optional) y coordinate
             */
            constructor(x?: number|any | { x?: number; y?: number; } |geotoolkit.util.Point, y?: number);
            /**
             * Return x value
             */
            getX(): number;
            /**
             * Return x value
             */
            getY(): number;
            /**
             * set Point coordinates
             * @param x  (Required) x coordinate
             * @param y  (Required) y coordinate
             */
            setPoint(x: number, y: number): this;
            /**
             * set X Point coordinate
             * @param x  (Required) x coordinate
             */
            setX(x: number): this;
            /**
             * set Y Point coordinates
             * @param y  (Required) y coordinate
             */
            setY(y: number): this;
            /**
             * translate point of dx, dy.
             * @param dx  (Required) dx
             * @param dy  (Required) dy
             */
            translate(dx: number, dy: number): this;
            /**
             * return clone object
             */
            clone(): geotoolkit.util.Point;
            /**
             * Returns a string that represents the current point.
             */
            toString(): string;
            /**
             * compares a point against this one, if equal returns true
             * @param point  (Required) point to compare to
             * @param epsilon  (Optional) acceptance criteria
             */
            equalsPoint(point: geotoolkit.util.Point, epsilon?: number): boolean;
            /**
             * round point coordinates
             */
            round(): this;
            /**
             * Calculates distance between two points
             * @param a  (Required) first point
             * @param b  (Required) second point
             */
            static getDistance(a: geotoolkit.util.Point, b: geotoolkit.util.Point): number;
            /**
             * Returns squared distance between two points {x1, y1} and {x2, y2}
             * @param x1  (Required) first point x-ordinate or the first point object
             * @param y1  (Required) first point y-ordinate or the second point object
             * @param x2  (Optional) second point x-ordinate
             * @param y2  (Optional) second point y-ordinate
             */
            static getSquaredDistance(x1: number|geotoolkit.util.Point, y1: number|geotoolkit.util.Point, x2?: number, y2?: number): number;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {properties:{x:number;y:number}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) JSON containing the properties to set
             * @param properties.x  (Optional) x value
             * @param properties.y  (Optional) y value
             */
            setProperties(properties?: any | { x?: number; y?: number; } ): this;
            /**
             * Create or get point from object
             * @param object  (Optional) object can be in format of constructor of geotoolkit.attributes.LineStyle
             */
            static fromObject(object?: any|geotoolkit.util.Point): geotoolkit.util.Point;
        }
        /**
         * This class is a 2D Line implementation. It holds two points define a line segment two dimensions.</br>
         * It also provides some utility functions to manipulate Lines and do basic geometrical calculations</br>
         * The line segment is defined by two points: start and end. </br>
         * StartPoint----------------------------EndPoint
         */
        class LineSegment {
            /**
             * This class is a 2D Line implementation. It holds two points define a line segment two dimensions.</br>
             * It also provides some utility functions to manipulate Lines and do basic geometrical calculations</br>
             * The line segment is defined by two points: start and end. </br>
             * StartPoint----------------------------EndPoint
             * @param start  (Optional) start Point
             * @param to  (Optional) end point
             */
            constructor(start?: geotoolkit.util.Point, to?: geotoolkit.util.Point);
            /**
             * Sets the start point to the line
             * @param start  (Required) Start Point
             */
            setStart(start: geotoolkit.util.Point): this;
            /**
             * Sets the end point to the line segment
             * @param end  (Required) End Point
             */
            setEnd(end: geotoolkit.util.Point): this;
            /**
             * Return end point of the line segment
             */
            getEnd(): geotoolkit.util.Point;
            /**
             * Return start point of the line segment
             */
            getStart(): geotoolkit.util.Point;
            /**
             * Returns the length of the line segment
             */
            getLength(): number;
            /**
             * Sets the two points which define a line segment.
             * @param start  (Required) Point representing the "start" position
             * @param end  (Required) Point representing the "end" position
             */
            setLineSegment(start: geotoolkit.util.Point, end: geotoolkit.util.Point): this;
            /**
             * Translates the line segment by the deltas passed as arguments
             * @param dx  (Required) Change in x coordinates
             * @param dy  (Required) Change in y coordinates
             */
            translate(dx: number, dy: number): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {properties:{start:geotoolkit.util.Point;end:geotoolkit.util.Point}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) JSON containing the properties to set
             * @param properties.start  (Optional) start point
             * @param properties.end  (Optional) end point
             */
            setProperties(properties?: any | { start?: geotoolkit.util.Point; end?: geotoolkit.util.Point; } ): this;
            /**
             * Clones this line segment and returns the newly created clone object
             */
            clone(): geotoolkit.util.LineSegment;
            /**
             * Create or get LineSegment from object
             * @param object  (Optional) object can be in format of constructor of geotoolkit.util.LineSegment
             */
            static fromObject(object?: any|geotoolkit.util.LineSegment): geotoolkit.util.LineSegment;
            /**
             * Defines types of intersection detectable by the line
             * Assume line segments are: p1----p2 and p3----p4
             */
            static IntersectionType: any;
            /**
             * Checks if two lines are intersecting. If they do, will return intersection point, if they don't,
             * will return null. If second argument is passed, it will be assigned a property "intersectiontype",
             * which will contain one of the geotoolkit.util.LineSegment.IntersectionType types defining how the two
             * line segments are correlated. If a destination point is provided, the point will be filled with
             * intersection coordinates and returned. (optimization)
             * @param ls1  (Required) The line to check intersection with
             * @param typeObject  (Optional) An optional to which a property called "intersectiontype" will be added
             * @param dst  (Optional) Destination point to fill with intersection coordinates
             */
            findIntersection(ls1: geotoolkit.util.LineSegment, typeObject?: any, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
        }
        /**
         * Defined functions to work with memory
         */
        class Memory {
            /**
             * Defined functions to work with memory
             */
            constructor();
            /**
             * Creates an array that contains 32 Bit float values. If browser doesn't support it
             * then it returns Array
             * @param number  (Required) of the elements
             */
            static createFloat32Array(number: number): any[]|Float32Array;
            /**
             * Tries to create and then return a 64 bit float array.
             * If browser supports 32 bit float arrays but not 64 bit float arrays a 32 bit float array is returned.
             * If browser does not support both 32 bit float arrays and 64 bit float arrays a regular array is returned.
             * @param size  (Required) Another array or desired array size.
             */
            static createFloat64Array(size: any[]|ArrayBuffer|number): any[]|Float32Array|Float64Array;
            /**
             * Tries to create and then return a 32 bit int array.
             * If browser does not support 32 bit int array a regular array is returned.
             * @param size  (Required) Another array or desired array size.
             */
            static createInt32Array(size: any[]|ArrayBuffer|number): any[]|Int32Array;
        }
        /**
         * Defines locale class, which contains information for formatting numbers, dates and time.<br>
         * The setDefault() function explained below, sets up your locale and then it will use it by default for all formatters.<br>
         * To create a custom format or change format without specifying 'local' of a country you can use {@link geotoolkit.util.DecimalFormat}
         */
        class Locale {
            /**
             * Defines locale class, which contains information for formatting numbers, dates and time.<br>
             * The setDefault() function explained below, sets up your locale and then it will use it by default for all formatters.<br>
             * To create a custom format or change format without specifying 'local' of a country you can use {@link geotoolkit.util.DecimalFormat}
             * @param options  (Optional) 
             * @param options.numberformat  (Optional) defines number format
             * @param options.numberformat.dec  (Optional) defines decimal symbol
             * @param options.numberformat.group  (Optional) defines group symbol
             * @param options.numberformat.neg  (Optional) defines negative symbol
             * @param options.numberformat.infinity  (Optional) defines infinity text
             */
            constructor(options?: any | { numberformat?: any | { dec?: any; group?: any; neg?: any; infinity?: any; } ; } );
            /**
             * Return number format
             */
            getNumberFormatInfo(): any;
            /**
             * Return a name of the locale
             */
            getLocaleName(): string;
            /**
             * @param locale  (Required) current locale
             */
            static getLocale(locale: string): geotoolkit.util.Locale;
            /**
             * Return default locale
             */
            static getDefault(): geotoolkit.util.Locale;
            /**
             * Sets default locale. Once user sets a default locale here it will be used by default for all formatters in all the plots.<br>
             * 
             * Please refer to the example below
             * @param locale  (Required) default locale . It supports ['ae', 'au', 'ca', 'cn', 'eg', 'gb', 'hk', 'il', 'in', 'jp', 'sk', 'th', 'tw', 'us', 'at', 'br', 'de', 'dk', 'es',
'gr', 'it', 'nl', 'pt', 'tr', 'vn', 'bg', 'cz', 'fi', 'fr', 'no', 'pl', 'ru', 'se', 'ch']
             */
            static setDefault(locale: geotoolkit.util.Locale): any;
            /**
             * Sets the properties pertaining to Locale
             * @param options  (Required) JSON containing locale properties
             * @param options.numberformat  (Optional) defines number format
             * @param options.numberformat.dec  (Optional) defines decimal symbol
             * @param options.numberformat.group  (Optional) defines group symbol
             * @param options.numberformat.neg  (Optional) defines negative symbol
             * @param options.numberformat.infinity  (Optional) defines infinity text
             * @param options.locale  (Optional) The name of the locale
             */
            setProperties(options: any | { numberformat?: any | { dec?: string; group?: string; neg?: string; infinity?: string; } ; locale?: string; } ): this;
            /**
             * Returns the properties pertaining to Locale
             */
            getProperties(): {options:{numberformat:{dec:string;group:string;neg:string;infinity:string};locale:string}}|any;
        }
        /**
         * Defines abstract class for formatting numbers, dates and time
         */
        class Format {
            /**
             * Defines abstract class for formatting numbers, dates and time
             */
            constructor();
            /**
             * Formats object to string
             * @param num  (Required) number or object
             */
            format(num: number|any): string;
            /**
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.util.Format): this;
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
             * Create or get fill style from object
             * @param object  (Optional) object can be in format of constructor geotoolkit.util.Format
             */
            static fromObject(object?: any|geotoolkit.util.Format): geotoolkit.util.NumberFormat|geotoolkit.util.DateTimeFormat;
        }
        /**
         * Defines base class for formatting numbers based on Java NumberFormatter. <br>
         * User can also use {@link geotoolkit.util.DecimalFormat} which allows creating a custom format as well.
         */
        class NumberFormat extends geotoolkit.util.Format {
            /**
             * Defines base class for formatting numbers based on Java NumberFormatter. <br>
             * User can also use {@link geotoolkit.util.DecimalFormat} which allows creating a custom format as well.
             * @param options  (Optional) 
             * @param options.locale  (Optional) format locale
             * @param options.round  (Optional) round number
             * @param options.fulllocale  (Optional) specify format how to provide locale
             * @param options.maximumfractiondigits  (Optional) specify maximum fraction digits
             * @param options.grouplength  (Optional) specify group length of numbers
             */
            constructor(options?: any | { locale?: string|geotoolkit.util.Locale; round?: boolean; fulllocale?: boolean; maximumfractiondigits?: number; grouplength?: number; } );
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.util.NumberFormat): this;
            /**
             * Returns a clone of the current format
             */
            clone(): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets properties
             * @param properties  (Required) properties pertaining to this object
             */
            setProperties(properties: any): this;
            /**
             * Return object, which contains 'dec', 'group', 'neg' symbols
             * @param locale  (Optional) locale
             */
            protected getLocalFormatData(locale?: geotoolkit.util.Locale|string): any;
            /**
             * Formats number to string
             * @param number  (Required) number to be formatted
             */
            format(number: number): string;
            /**
             * Return maximum fraction digits
             * @param digits  (Required) maximum fraction digits
             */
            setMaximumFractionDigits(digits: number): this;
            /**
             * Return maximum faction digits
             * @param number  (Optional) an optional number to get maximum fraction digits
             */
            getMaximumFractionDigits(number?: number): number;
            /**
             * Sets locale
             * @param locale  (Required) locale
             */
            setLocale(locale: geotoolkit.util.Locale|string): this;
            /**
             * Return the current locale
             */
            getLocale(): geotoolkit.util.Locale|string;
            /**
             * Convert number to format with fixed point
             * @param number  (Required) number to be converted
             * @param decimalPlaces  (Required) number of decimal places this number can have
             */
            protected toFixed(number: number, decimalPlaces: number): string;
            /**
             * Return instance of the number format
             * @param locale  (Optional) locale of formatter. Locals is not supported for now.
             */
            static getInstance(locale?: string): geotoolkit.util.NumberFormat;
        }
        /**
         * Defines a class for formatting date time
         */
        class DateTimeFormat extends geotoolkit.util.Format {
            /**
             * Defines a class for formatting date time
             * @param options  (Optional) 
             * @param options.format  (Optional) date time format
             * @param options.timezone  (Optional) time zone
             */
            constructor(options?: any | { format?: string; timezone?: geotoolkit.axis.TimeZone|number|string; } );
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.util.DateTimeFormat): this;
            /**
             * All inheritors should implement copy constructor or provide custom implementation for this method
             */
            clone(): geotoolkit.util.DateTimeFormat;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets properties
             * @param properties  (Required) properties pertaining to this object
             */
            setProperties(properties: any): this;
            /**
             * Formats number to string
             * @param number  (Required) number to be formatted
             */
            format(number: number): string;
            /**
             * Return instance of the number format
             * @param locale  (Optional) locale of formatter. Locals is not supported for now.
             */
            static getInstance(locale?: string): geotoolkit.util.DateTimeFormat;
        }
        /**
         * Defines class for formatting decimal numbers
         */
        class DecimalFormat extends geotoolkit.util.NumberFormat {
            /**
             * Defines class for formatting decimal numbers
             * @param options  (Optional) The options
             * @param options.format  (Optional) format : The syntax for the formatting is:<br>
0 = Digit<br>
# = Digit, zero shows as absent<br>
. = Decimal separator<br>
- = Negative sign<br>
, = Grouping Separator<br>
% = Percent (multiplies the number by 100)<br>
E = Separates mantissa and exponent in scientific notation. Need not be quoted in prefix or suffix.<br>
             * @param options.locale  (Optional) locale
             * @param options.decimalseparatoralwaysshown  (Optional) decimalseparatoralwaysshown
             * @param options.round  (Optional) round
             * @param options.overridegroupsep  (Optional) overridegroupsep
             * @param options.overridenegsign  (Optional) overridenegsign
             * @param options.ispercentage  (Optional) ispercentage
             * @param options.autodetectpercentage  (Optional) autodetectpercentage
             */
            constructor(options?: any | { format?: string; locale?: string; decimalseparatoralwaysshown?: boolean; round?: boolean; overridegroupsep?: string; overridenegsign?: string; ispercentage?: boolean; autodetectpercentage?: boolean; } );
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.util.DecimalFormat): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets properties
             * @param properties  (Optional) properties pertaining to this object
             */
            setProperties(properties?: any): this;
            /**
             * Formats number to string
             * @param number  (Required) number to be formatted
             */
            format(number: number): string;
        }
        /**
         * Define the proper number format for a double value formatted for DISPLAY
         * only.
         */
        class AutoNumberFormat extends geotoolkit.util.NumberFormat {
            /**
             * Define the proper number format for a double value formatted for DISPLAY
             * only.
             * @param options  (Optional) 
             * @param options.locale  (Optional) format locale
             * @param options.round  (Optional) round number
             * @param options.fulllocale  (Optional) specify format how to provide locale
             * @param options.maximumfractiondigits  (Optional) specify maximum fraction digits
             * @param options.grouplength  (Optional) specify group length of numbers
             */
            constructor(options?: any | { locale?: string; round?: boolean; fulllocale?: boolean; maximumfractiondigits?: number; grouplength?: number; } );
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.util.AutoNumberFormat): any;
            /**
             * Sets maximum fraction digits.
             * This method is not supported
             * @param digits  (Required) maximum faction digits
             */
            setMaximumFractionDigits(digits: number): any;
            /**
             * Return maximum faction digits
             * @param number  (Optional) an optional number to get maximum fraction digits
             */
            getMaximumFractionDigits(number?: number): number;
            /**
             * Formats number to string
             * @param number  (Required) number to be formatted
             */
            format(number: number): string;
            /**
             * Estimate the maximum fraction digits
             * @param number  (Required) number to provide the estimate
             */
            static estimateMaximumFractionDigits(number: number): number;
            /**
             * Creates format geotoolkit.util.NumberFormat based on specified value
             * @param number  (Required) number to provide the best format
             */
            static matchFormat(number: number): geotoolkit.util.NumberFormat;
        }
        /**
         * Define date time factory
         */
        class DateTimeFormatFactory {
            /**
             * Define date time factory
             */
            constructor();
            /**
             * Return default factory instance
             */
            static getDefault(): geotoolkit.util.DateTimeFormatFactory;
            /**
             * Create a new format
             * @param options  (Optional) 
             * @param options.format  (Optional) date time format such as "M j H:i"
             * @param options.locale  (Optional) locale
             * @param options.timezone  (Optional) UTC or local time,
If using Third Party such as momentJS see also {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}
             */
            createFormat(options?: any | { format?: string; locale?: geotoolkit.util.Locale|string; timezone?: geotoolkit.axis.TimeZone|string; } ): geotoolkit.util.Format;
            /**
             * Sets default format factory
             * @param instance  (Required) a new instance
             */
            static setDefault(instance: geotoolkit.util.DateTimeFormatFactory): any;
        }
        /**
         * This abstract class defines the interface of a readonly Iterator. Subclasses are responsible for implementing the actual iteration mechanism.
         */
        class Iterator {
            /**
             * This abstract class defines the interface of a readonly Iterator. Subclasses are responsible for implementing the actual iteration mechanism.
             */
            constructor();
            /**
             * Returns the next element in the iteration.
             */
            next(): any;
            /**
             * Returns true if the iteration has more elements.
             */
            hasNext(): boolean;
            /**
             * Applies filter to every element according to the function passed via the only parameter
             * @param func  (Required) function to apply to each element
             */
            filter(func: Function): any[];
            /**
             * Executes a method for each item in iterator and return new iterator.
             * @param func  (Required) function to apply to each element
             */
            forEach(func: Function): this;
            /**
             * Resets iterator to its initial state.
             */
            reset(): this;
            /**
             * Creates array based on iterator items
             * @param maxElements  (Optional) array size upper limit
             */
            toArray(maxElements?: number): any[];
            /**
             * Returns iterator by array elements
             * @param array  (Required) of any object
             * @param func  (Optional) to filter elements
             */
            static getArrayIterator(array: any[], func?: Function): geotoolkit.util.Iterator;
            /**
             * Returns iterator by the data
             * @param parameter  (Required) data to iterate
             */
            static getIterator(parameter: geotoolkit.util.Iterator|any[]|any): geotoolkit.util.Iterator;
            /**
             * Runs asynchronous function for each element and wait execution
             * @param array  (Required) array of any object or iterator
             * @param func  (Required) function to apply to each element
             * @param callback  (Optional) function to be called at the end of execution
             */
            static awaitForEach(array: any[]|geotoolkit.util.Iterator, func: Function, callback?: Function): any;
            /**
             * Creates array based on elements to iterate
             * @param iterator  (Required) iterator
             * @param maxElements  (Optional) array size upper limit
             */
            static toArray(iterator: geotoolkit.util.Iterator, maxElements?: number): any[];
        }
        /**
         * Specify RGBA color, which can be defined as s set of the four color
         * components (Red, Green, Blue, Alpha). The each component must be from 0 to
         * 255.
         */
        class RgbaColor {
            /**
             * Specify RGBA color, which can be defined as s set of the four color
             * components (Red, Green, Blue, Alpha). The each component must be from 0 to
             * 255.
             * @param red  (Optional) red component from 0 to 255 OR ready-to-use color (string, rgbacolor...)
             * @param green  (Optional) green component from 0 to 255
             * @param blue  (Optional) blue component from 0 to 255
             * @param alpha  (Optional) alpha component from 0 to 255
             */
            constructor(red?: number|string|geotoolkit.util.RgbaColor, green?: number, blue?: number, alpha?: number);
            /**
             * Return clone of the color
             */
            clone(): geotoolkit.util.RgbaColor;
            /**
             * set color value
             * @param red  (Optional) red component form 0 to 255
             * @param green  (Optional) green component form 0 to 255
             * @param blue  (Optional) blue component form 0 to 255
             * @param alpha  (Optional) alpha component form 0 to 255
             */
            setColor(red?: number, green?: number, blue?: number, alpha?: number): this;
            /**
             * Sets the red component to the given value.<br>
             * This function expects the red component to be in range[0-255].<br>
             * @param val  (Required) value of the red component
             */
            setRed(val: number): this;
            /**
             * Sets the blue component to the given value.<br>
             * This function expects the blue component to be in range[0-255].<br>
             * @param val  (Required) value of the blue component
             */
            setBlue(val: number): this;
            /**
             * Sets the green component to the given value.<br>
             * This function expects the green component to be in range[0-255].<br>
             * @param val  (Required) value of the green component
             */
            setGreen(val: number): this;
            /**
             * Sets the alpha component to the given value.<br>
             * This function expects the alpha component to be in range[0-1].<br>
             * @param val  (Required) value of the alpha component
             */
            setAlpha(val: number): this;
            /**
             * Return the red component value.<br>
             * The value should be in range[0-255]
             */
            getRed(): number;
            /**
             * Return the green component value.<br>
             * The value should be in range[0-255]
             */
            getGreen(): number;
            /**
             * Return the blue component value.<br>
             * The value should be in range[0-255]
             */
            getBlue(): number;
            /**
             * Return the alpha component value.<br>
             * The value should be in range[0-255]
             */
            getAlpha(): number;
            /**
             * make color twice lighter
             */
            light(): geotoolkit.util.RgbaColor;
            /**
             * Make color darker by factor of two.
             */
            dark(): geotoolkit.util.RgbaColor;
            /**
             * set brightness
             * @param correctionFactor  (Required) correction Factor
             */
            setBrightness(correctionFactor: number): geotoolkit.util.RgbaColor;
            /**
             * Convert color to string
             */
            toRgbaString(): string;
            /**
             * Convert color to string
             */
            toCSS(): string;
            /**
             * Create or get RGBA color from object
             * @param object  (Required) object can be in format of constructor of
geotoolkit.util.RgbaColor
             */
            static fromObject(object: any|geotoolkit.util.RgbaColor): geotoolkit.util.RgbaColor|any;
        }
        /**
         * Specify HSV color, which can be defined as s set of the three color
         * components (Hue, Saturation, Value).
         */
        class HsvColor {
            /**
             * Specify HSV color, which can be defined as s set of the three color
             * components (Hue, Saturation, Value).
             * @param hue  (Optional) hue from 0 to 360
             * @param sat  (Optional) sat from 0 to 1
             * @param val  (Optional) val from 0 to 1
             */
            constructor(hue?: number|geotoolkit.util.RgbaColor, sat?: number, val?: number);
            /**
             * Return clone of the color
             */
            clone(): geotoolkit.util.HsvColor;
            /**
             * Return hue
             */
            getHue(): number;
            /**
             * Return saturation
             */
            getSaturation(): number;
            /**
             * Return value
             */
            getValue(): number;
            /**
             * \
             * Add delta to saturation.
             * Saturation is between 0 and 1
             * @param delta  (Required) delta value to be added
             */
            adjustSaturation(delta: number): any;
            /**
             * Add delta to value.
             * Value is between 0 and 1
             * @param delta  (Required) delta value to be added
             */
            adjustValue(delta: number): any;
            /**
             * Multiply saturation factor.
             * Saturation is between 0 and 1
             * @param factor  (Required) saturation factor (between 0 - 1)
             */
            adjustSaturationByFactor(factor: number): any;
            /**
             * Multiply value by factor.
             * Value is between 0 and 1
             * @param factor  (Required) factor to multiply this color by
             */
            adjustValueByFactor(factor: number): any;
            /**
             * Convert current value and saturation to RGBA
             */
            toRgbaColor(): geotoolkit.util.RgbaColor;
        }
        /**
         * Specify HLS color, which can be defined as a set of the three color components (Hue, Luminosity and Saturation). It provides several functions to manipulate
         * colors based on (HLS) as well as to convert colors to {@link geotoolkit.util.RgbaColor}
         */
        class HlsColor {
            /**
             * Specify HLS color, which can be defined as a set of the three color components (Hue, Luminosity and Saturation). It provides several functions to manipulate
             * colors based on (HLS) as well as to convert colors to {@link geotoolkit.util.RgbaColor}
             * @param hue  (Required) RGBA color between 0 - 360
             * @param luminosity  (Required) between 0 - 1
             * @param saturation  (Required) between 0 - 1
             */
            constructor(hue: number, luminosity: number, saturation: number);
            /**
             * Return hue
             */
            getHue(): number;
            /**
             * Return saturation
             */
            getSaturation(): number;
            /**
             * Return luminosity
             */
            getLuminosity(): number;
            /**
             * Convert color from HLS to RGBA
             */
            toRgbaColor(): geotoolkit.util.RgbaColor;
            /**
             * Make the color lighter
             * @param percLighter  (Required) percentage to lighten the color
             */
            lighter(percLighter: number): geotoolkit.util.RgbaColor;
            /**
             * Make the color darker
             * @param percDarker  (Required) percentage to make the color darker
             */
            darker(percDarker: number): geotoolkit.util.RgbaColor;
        }
        /**
         * Defines helper methods to work with geometries
         */
        class GeometryUtil {
            /**
             * Defines helper methods to work with geometries
             */
            constructor();
            /**
             * Gets bounding box for a geometry defined by array of {@link geotoolkit.util.Point} points
             * or by arrays of x-ordinates and y-ordinates.
             * @param parameter1  (Required) array of {@link geotoolkit.util.Point} or array of numbers (x-values)
             * @param parameter2  (Optional) array of numbers (y-values)
             */
            static getBoundingBox(parameter1: any[], parameter2?: any[]): geotoolkit.util.Rect;
            /**
             * Gets device size of vector specified in model coordinates
             * @param x  (Required) x position of vector in model coordinates
             * @param y  (Required) y position of vector in model coordinates
             * @param transformation  (Required) context transformation
             */
            static getVectorLength(x: number, y: number, transformation: geotoolkit.util.Transformation): number;
            /**
             * Gets model size of vector specified in device coordinates
             * @param x  (Required) x position of vector in device coordinates
             * @param y  (Required) y position of vector in device coordinates
             * @param transformation  (Required) context transformation
             */
            static getVectorLengthInModel(x: number, y: number, transformation: geotoolkit.util.Transformation): number;
        }
        /**
         * The class Math contains methods for performing basic numeric operations and basic algorithms.
         */
        class Math {
            /**
             * The class Math contains methods for performing basic numeric operations and basic algorithms.
             */
            constructor();
            /**
             * Calculates log base 10
             * @param val  (Required) value to calculate log base 10
             * @param precision  (Optional) the number of digits after the decimal point
             * @param handlenegative  (Optional) set true if handling of negative value and 0 is required when mapping
             */
            static log10(val: number, precision?: number, handlenegative?: boolean): number;
            /**
             * Get sign of specified value
             * @param x  (Required) current value
             */
            static sign(x: number): number;
            /**
             * Clamp the value to the range
             * @param value  (Required) current value
             * @param min  (Required) minimum value
             * @param max  (Required) maximum value
             */
            static clamp(value: number, min: number, max: number): number;
            /**
             * Compare two values with specified precision
             * @param v1  (Required) 1st number to compare
             * @param v2  (Required) 2nd number to compare
             * @param epsilon  (Optional) difference bet 2 numbers to compare
             */
            static equals(v1: number, v2: number, epsilon?: number): boolean;
            /**
             * Uses binary search to find an index between 2 indices, that is the closest to the given value.
             * @param value  (Required) object to find
             * @param values  (Required) sorted array on objects
             * @param fromIndex  (Optional) index to start the search
             * @param toIndex  (Optional) index to end search scope
             * @param compareFunction  (Optional) compare function that defines the sort order.  If omitted, the object type must be number.
The second parameter passed to this compareFunction is the value passed to findIndex().
             */
            static findIndex(value: any, values: any[], fromIndex?: number, toIndex?: number, compareFunction?: Function): number;
            /**
             * Bezier curves are aften used to model smooth curves. calcCubicBezier Performs cubic Bezier approximation.
             * The control points P1 and P2 are only used to provide directional information.The arc or circle is divided into four equal sections and each section fit to a cubic Bézier curve.
             * When points are spaced far apart approximation is performed based on the precision(flatness) and control points on the same side of vector.
             * @param first  (Required) first point
             * @param p1  (Required) control point #1
             * @param p2  (Required) control point #2
             * @param last  (Required) last point
             * @param flatness  (Optional) precision
             */
            static calcCubicBezier(first: geotoolkit.util.Point, p1: geotoolkit.util.Point, p2: geotoolkit.util.Point, last: geotoolkit.util.Point, flatness?: number): any[];
            /**
             * Computes rounded limits using margin percentages as constraints.<br>
             * <br>
             * This function tries to compute a 'smart' range that includes the given min/max.<br>
             * To do so it will try to simplify the decimal part of the given values to the closest value.<br>
             * The original range is always contained in the returned range, meaning that the returned 'low' is lesser than the given min and the returned 'high' is greater than the given max.<br>
             * <br>
             * The given margin parameters will be used to constrain rounding process:<br>
             * <ul>
             *  <li>Margin:<br>
             *  The margin percentage determines how much margin the algorithm will try to introduce.<br>
             *  If the given margin percentage is 10%, then the returned 'high'' will be around:<br>
             *  <i>high = max + 10% * (max - min)</i>.<br>
             *  </li>
             *  <br>
             *  <li>Margin tolerance:<br>
             *  The margin tolerance percentage determines how much the 'smart rounding' process can change the value computed above.<br>
             *  If the given margin percentage is 4%, then the returned 'high' will be in the range:<br>
             *  <i>[high - <b>0.02</b>  * (max - min), high + <b>0.04</b> * (max - min)]</i>.<br>
             *  Note that margin tolerance is applied differently for inner tolerance.<br>
             * <pre>
             *     ------------------|-----------<----|-------->
             *                      max             +10% (margin)
             * 
             * 
             *                                  -2%            +4% (margin tolerance)
             *     ------------------|-----------<----|-------->
             *                                       high (before rounding)
             * </pre>
             * @param min  (Required) The minimum value to be rounded
             * @param max  (Required) The maximum value to be rounded
             * @param marginPercentage  (Optional) Percentage of margin desired
             * @param marginPercentageTolerance  (Optional) Percentage of margin tolerance desired
             */
            static calculateRoundedLimits(min: number, max: number, marginPercentage?: number, marginPercentageTolerance?: number): geotoolkit.util.Range;
            /**
             * Find a "nice" settings based on "Algorithm for Optimal Scaling on a Chart Axis".
             * @param min  (Required) minimum value
             * @param max  (Required) maximum value
             * @param modelStep  (Required) desired model space between ticks
             * @param minPadding  (Optional) percentage padding for minimum size based on range
             * @param maxPadding  (Optional) percentage padding for maximum size based on range
             */
            static findNiceLimits(min: number, max: number, modelStep: number, minPadding?: number, maxPadding?: number): {limits:{min:number;max:number;spacing:number;count:number}}|any;
            /**
             * Create a "nice" range based on "Algorithm for Optimal Scaling on a Chart Axis".
             * @param min  (Required) minimum value
             * @param max  (Required) maximum value
             * @param desiredNumberOfTicks  (Required) desired number of ticks
             * @param minPadding  (Optional) percentage padding for minimum size based on range
             * @param maxPadding  (Optional) percentage padding for maximum size based on range
             */
            static calculateNiceLimits(min: number, max: number, desiredNumberOfTicks: number, minPadding?: number, maxPadding?: number): {limits:{min:number;max:number;spacing:number;count:number}}|any;
            /**
             * Returns a "nice" number approximately equal to range Rounds
             * the number if round = true takes the ceiling if round = false.
             * @param value  (Required) input number
             * @param round  (Optional) round value
             */
            static niceNumber(value: number, round?: number): number;
            /**
             * This function computes human readable limits so that the returned interval is easily apprehended by the user.<br>
             * To do so, it will compute a minimum and maximum that can be easily divided by 2.<br>
             * Which means the user will immediately guess the mid and quarter values.<br>
             * <br>
             * The purpose of this function is not to provide accurately rounded limits but limits that will be easily apprehended.<br>
             * Using the given limits can virtually remove the necessity of displaying the intermediates labels on a axis.<br>
             * <br>
             * For example it will return [0, 4000] for the values [790, 3050].<br>
             * The user will easily guess the mid value to be 2000.<br>
             * @param min  (Required) The minimum value
             * @param max  (Required) The maximum value
             * @param logScale  (Optional) If this should use a logarithmic scale instead of linear
             * @param centerOnZeroOnNegativeMin  (Optional) If this should center the limits around 0 if minimum is a negative value
             * @param splitOnZero  (Optional) If this should split neat limits result around 0, applicable only when Math.sign(minimum) != Math.sign(maximum)
             */
            static calculateNeatLimits(min: number, max: number, logScale?: boolean, centerOnZeroOnNegativeMin?: boolean, splitOnZero?: boolean): geotoolkit.util.Range;
            /**
             * Rounds "src" to relative (see example below) "precision"
             * @param src  (Required) source value to be rounded
             * @param precision  (Required) relative precision
             */
            static roundTo(src: number, precision: number): number;
            /**
             * Return the min value of a given array.
             * it internally filter NaN and null values.
             * @param arr  (Required) represents the array.
             * @param init  (Optional) represents the initial min value
             * @param nullvalue  (Optional) A nullvalue to ignore, note that null and NaN are ignored
             */
            static getMin(arr: number[], init?: number, nullvalue?: number): number;
            /**
             * Return the max values of a given array.<br>
             * This function ignores NaN and null values.
             * @param arr  (Required) represents the array.
             * @param init  (Optional) represents the initial max value
             * @param nullvalue  (Optional) A nullvalue to ignore, note that null and NaN are ignored
             */
            static getMax(arr: number[], init?: number, nullvalue?: number): number;
            /**
             * Get centile
             * @param values  (Required) the percent value
             * @param centileNum  (Required) percentile
             */
            static getCentile(values: number[], centileNum: number): number;
            /**
             * Return the min and max values of a given array.<br>
             * This function ignores NaN and null values.
             * @param arr  (Required) represents the array
             * @param init  (Optional) represents the initials min and max values: [min, max]
             * @param nullvalue  (Optional) A nullvalue to ignore, note that null and NaN are ignored
             */
            static getLimits(arr: number[], init?: number[], nullvalue?: number): number[];
            /**
             * Convert degree to radians
             * @param deg  (Required) The angle in degrees
             */
            static degToRad(deg: number): number;
            /**
             * Convert radians to degree
             * @param rad  (Required) The angle in radians
             */
            static radToDeg(rad: number): number;
            /**
             * Normalizes the provided angle to be in range [0, 2*PI]
             * @param angle  (Required) Angle to normalize
             */
            static normalizeAngle(angle: number): number;
            /**
             * Compute Statistics for a collection
             * @param array  (Required) raw number array
             */
            static computeStatistics(array: number[]): {statistics:{count:number;minvalue:number;maxvalue:number;average:number;variance:number;avgdeviation:number;stddeviation:number;skewness:number;kurtosis:number;p10:number;p50:number;p90:number}}|any;
            /**
             * Checks if current platform is little endian
             */
            static isPlatformLittleEndian(): boolean;
        }
        /**
         * Implements a dimension which is defined by an absolute width and height
         */
        class Dimension {
            /**
             * Implements a dimension which is defined by an absolute width and height
             * @param width  (Optional) Width of dimension or JSON with properties
             * @param width.width  (Optional) Width of dimension or JSON with properties
             * @param width.height  (Optional) Height of dimension
             * @param height  (Optional) Height of dimension
             */
            constructor(width?: number|any | { width?: number; height?: number; } , height?: number);
            /**
             * return clone object
             */
            clone(): geotoolkit.util.Dimension;
            /**
             * Gets width
             */
            getWidth(): number;
            /**
             * Gets height
             */
            getHeight(): number;
            /**
             * Sets width and height
             * @param width  (Required) desired width
             * @param height  (Required) desired height
             */
            setSize(width: number, height: number): this;
            /**
             * Round width and height of dimension object and return itself
             */
            round(): this;
            /**
             * Inflate dimension by the specified amount.
             * @param w  (Required) the amount to inflate this dimension horizontally.
             * @param h  (Required) the amount to inflate this dimension vertically.
             */
            inflate(w: number, h: number): this;
            /**
             * returns a string that represents the current dimension.
             */
            toString(): string;
            /**
             * compares a dimension against this one, if equal returns true
             * @param dimension  (Required) to check against
             * @param epsilon  (Optional) acceptance criteria
             */
            equalsDimension(dimension: geotoolkit.util.Dimension, epsilon?: number): boolean;
            /**
             * Returns properties pertaining to dimension
             */
            getProperties(): {obj:{width:number;height:number}}|any;
            /**
             * Sets properties pertaining to dimension
             * @param props  (Required) JSON with properties
             * @param props.width  (Optional) Width of the dimension
             * @param props.height  (Optional) Height of the dimension
             */
            setProperties(props: any | { width?: number; height?: number; } ): this;
            /**
             * Create or get dimension from object
             * @param object  (Optional) object can be in format of constructor of geotoolkit.util.Dimension
             */
            static fromObject(object?: any|geotoolkit.util.Dimension): geotoolkit.util.Dimension;
        }
        /**
         * Represents a data range, with low and high value
         */
        class Range {
            /**
             * Represents a data range, with low and high value
             * @param low  (Optional) Lower range boundary
             * @param low.low  (Optional) Lower range boundary
             * @param low.high  (Optional) Upper range boundary
             * @param high  (Optional) Upper range boundary
             */
            constructor(low?: number|geotoolkit.util.Range|any | { low?: number; high?: number; } , high?: number);
            /**
             * returns true if the Ranges are equal
             * @param range  (Required) range to compare to
             * @param epsilon  (Optional) acceptance criteria
             */
            equalsRange(range: geotoolkit.util.Range, epsilon?: number): boolean;
            /**
             * Gets upper range boundary
             */
            getHigh(): number;
            /**
             * Gets lower range boundary
             */
            getLow(): number;
            /**
             * Sets upper range boundary
             * @param high  (Required) New upper boundary
             */
            setHigh(high: number): this;
            /**
             * Sets lower range boundary
             * @param low  (Required) New low boundary
             */
            setLow(low: number): this;
            /**
             * Sets a new range with given lower and upper boundaries. This method
             * checks if low is less then high otherwise swaps limits
             * @param low  (Required) Lower range boundary
             * @param high  (Optional) Upper range boundary
             */
            setRange(low: number|geotoolkit.util.Range, high?: number): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {properties:{low:number;high:number}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.low  (Optional) Lower range boundary
             * @param properties.high  (Optional) Upper range boundary
             */
            setProperties(properties: any | { low?: number; high?: number; } ): this;
            /**
             * Returns string representation
             */
            toString(): string;
            /**
             * Return clone object.
             */
            clone(): geotoolkit.util.Range;
            /**
             * return the size of the range
             */
            getSize(): number;
            /**
             * Determines whether or not this Range and the specified Range
             * intersection. Two ranges intersect if their intersection is nonempty.
             * @param low  (Required) range or lower range boundary
             * @param high  (Optional) Upper range boundary
             */
            intersects(low: number|geotoolkit.util.Range, high?: number): boolean;
            /**
             * Determines whether or not this Range and the specified Range
             * intersection. Two ranges intersect if their intersection is nonempty.
             * @param low  (Required) range or lower range boundary
             * @param high  (Optional) Upper range boundary
             */
            intersect(low: number|geotoolkit.util.Range, high?: number): this;
            /**
             * Check if range contains another range
             * @param range  (Required) The range to check containment with current one
             */
            contains(range: geotoolkit.util.Range): boolean;
            /**
             * Union this Range with the specified
             * @param range  (Required) The range to union with current one
             */
            union(range: geotoolkit.util.Range): any;
            /**
             * Subtract second range from the first range and returns result as array of non-overlapping contiguous ranges.
             * @param first  (Required) the first range
             * @param second  (Required) range the first range
             */
            static subtract(first: geotoolkit.util.Range, second: geotoolkit.util.Range): geotoolkit.util.Range[];
            /**
             * Create or get range from object
             * @param object  (Optional) object can be in format of constructor of geotoolkit.util.Range
             */
            static fromObject(object?: any|geotoolkit.util.Range): geotoolkit.util.Range;
        }
        /**
         * Represents an abstract class that specify model area.
         */
        class Area {
            /**
             * Represents an abstract class that specify model area.
             */
            constructor();
            /**
             * Check if the area contains point
             * @param x  (Required) x position of the point if parameter is a number OR if parameter is a point then it checks if point is inside the rect or not
             * @param y  (Optional) y position of the point
             */
            contains(x: number|geotoolkit.util.Point, y?: number): boolean;
            /**
             * Return bounds and locks the bounds rect from further editing.
             */
            getBounds(): geotoolkit.util.Rect|any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) JSON containing the properties to set
             */
            setProperties(properties?: any): this;
        }
        /**
         * Represents a rectangle with sides parallel to the axes. This rectangle has methods that allow the geometry
         * to be queried and modified. The geometry that makes up a rectangle consists
         * of two coordinate points that define the diagonal between the left bottom
         * corner and the right top corner. Note that the bottom vertical coordinate is
         * guaranteed to be less than the top vertical coordinate, and that the left
         * horizontal coordinate is less than the right horizontal coordinate.
         */
        class Rect extends geotoolkit.util.Area {
            /**
             * Represents a rectangle with sides parallel to the axes. This rectangle has methods that allow the geometry
             * to be queried and modified. The geometry that makes up a rectangle consists
             * of two coordinate points that define the diagonal between the left bottom
             * corner and the right top corner. Note that the bottom vertical coordinate is
             * guaranteed to be less than the top vertical coordinate, and that the left
             * horizontal coordinate is less than the right horizontal coordinate.
             * @param x1  (Optional) left or object to copy
             * @param x1.x  (Optional) left
             * @param x1.y  (Optional) top
             * @param x1.width  (Optional) width
             * @param x1.height  (Optional) height
             * @param y1  (Optional) top
             * @param x2  (Optional) right
             * @param y2  (Optional) bottom
             */
            constructor(x1?: number|geotoolkit.util.Rect|any | { x?: number; y?: number; width?: number; height?: number; } , y1?: number, x2?: number, y2?: number);
            /**
             * Returns a path shape which represents a rectangle which is defined by this rect
             */
            toGeometry(): geotoolkit.renderer.GraphicsPath;
            /**
             * Return clone object.
             */
            clone(): geotoolkit.util.Rect;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {properties:{x:number;y:number;width:number;height:number}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) JSON containing the properties to set
             * @param properties.readonly  (Optional) readonly flag
             * @param properties.x  (Optional) left value
             * @param properties.y  (Optional) top value
             * @param properties.width  (Optional) width
             * @param properties.height  (Optional) height
             */
            setProperties(properties?: any | { readonly?: boolean; x?: number; y?: number; width?: number; height?: number; } ): this;
            /**
             * return Rect state. If true, rect cannot be modified.
             */
            isReadOnly(): boolean;
            /**
             * protect Rect instance from modification.
             */
            lock(): this;
            /**
             * unlock Rect instance. Will allow modification again.
             */
            unlock(): this;
            /**
             * Intersects this rectangle with the specified one
             * @param x  (Required) The x coordinate or rectangle to intersect with
             * @param y  (Optional) The y coordinate
             * @param width  (Optional) The width
             * @param height  (Optional) The height
             */
            intersect(x: number|geotoolkit.util.Rect, y?: number, width?: number, height?: number): this;
            /**
             * Union this Rect with the specified
             * @param rect  (Required) The rect to union with current one
             */
            union(rect: geotoolkit.util.Rect): this;
            /**
             * Unions this Rect with the specified x,y-point
             * @param x  (Required) The x coordinate
             * @param y  (Required) The y coordinate
             */
            unionPoint(x: number, y: number): this;
            /**
             * Returns true if rectangles are identical
             * @param rect  (Required) rect to compare to
             * @param epsilon  (Optional) acceptance criteria
             */
            equalsRect(rect: geotoolkit.util.Rect, epsilon?: number): boolean;
            /**
             * Determines whether or not this Rectangle and the specified Rectangle
             * intersection. Two rectangles intersect if their intersection is nonempty.
             * @param x  (Required) The x coordinate or another rectangle
             * @param y  (Optional) The y coordinate
             * @param w  (Optional) The width
             * @param h  (Optional) The height
             */
            intersects(x: number|geotoolkit.util.Rect, y?: number, w?: number, h?: number): boolean;
            /**
             * Set left position
             * @param x  (Required) left position
             */
            setX(x: number): this;
            /**
             * Set top position
             * @param y  (Required) top position
             */
            setY(y: number): this;
            /**
             * Return left position
             */
            getX(): number;
            /**
             * Return top position
             */
            getY(): number;
            /**
             * Sets width
             * @param w  (Required) width
             */
            setWidth(w: number): this;
            /**
             * Sets height
             * @param h  (Required) height
             */
            setHeight(h: number): this;
            /**
             * Return height
             */
            getHeight(): number;
            /**
             * Return width
             */
            getWidth(): number;
            /**
             * Return coordinate of left corner
             */
            getLeft(): number;
            /**
             * Return coordinate of right corner
             */
            getRight(): number;
            /**
             * Return top coordinate
             */
            getTop(): number;
            /**
             * Return bottom coordinate (always top < bottom)
             */
            getBottom(): number;
            /**
             * Return bounds and locks the bounds rect from further editing.
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Sets rectangle center
             * @param x  (Required) X coordinate of the rectangle's center
             * @param y  (Required) Y coordinate of the rectangle's center
             */
            setCenter(x: number, y: number): geotoolkit.util.Rect;
            /**
             * Gets X coordinate of the rectangle's center
             */
            getCenterX(): number;
            /**
             * Gets Y coordinate of the rectangle's center
             */
            getCenterY(): number;
            /**
             * Gets coordinates of the rectangle's center
             */
            getCenter(): geotoolkit.util.Point;
            /**
             * Return left top position
             */
            getLeftTop(): geotoolkit.util.Point;
            /**
             * Return left top position
             */
            getRightTop(): geotoolkit.util.Point;
            /**
             * Return right bottom position
             */
            getRightBottom(): geotoolkit.util.Point;
            /**
             * Return left bottom position
             */
            getLeftBottom(): geotoolkit.util.Point;
            /**
             * Return Left center position
             */
            getLeftCenter(): geotoolkit.util.Point;
            /**
             * Return Right center position
             */
            getRightCenter(): geotoolkit.util.Point;
            /**
             * Return Top center position
             */
            getTopCenter(): geotoolkit.util.Point;
            /**
             * Return Bottom center position
             */
            getBottomCenter(): geotoolkit.util.Point;
            /**
             * Sets rectangle
             * @param x1  (Required) the x-coordinate of one corner
             * @param y1  (Optional) the y-coordinate of one corner
             * @param x2  (Optional) the x-coordinate of the opposite corner
             * @param y2  (Optional) the y coordinate of the opposite corner
             */
            setRect(x1: number|geotoolkit.util.Rect, y1?: number, x2?: number, y2?: number): this;
            /**
             * Check if rectangle contains point
             * @param x  (Required) x position of the point if parameter is a number OR if parameter is a point then it checks if point is inside the rect or not
             * @param y  (Optional) y position of the point
             */
            contains(x: number|geotoolkit.util.Point, y?: number): boolean;
            /**
             * Check if rectangle contains rectangle
             * @param x  (Required) x positon
             * @param y  (Optional) y position
             * @param w  (Optional) width
             * @param h  (Optional) height
             */
            containsRect(x: number|geotoolkit.util.Rect, y?: number, w?: number, h?: number): boolean;
            /**
             * Clips a line by rectangle.
             * 
             * a1 [IN] the start position of the line. a2 [IN] the end position of the
             * line. result1 [OUT] the first point of the clipped line. result2 [OUT]
             * the end point of the clipped line. return true if clipped rectangle
             * intersects line or line is inside of the rectangle.
             * @param a1  (Required) the first input point
             * @param a2  (Required) the second input point
             * @param result1  (Required) the first output point
             * @param result2  (Required) the second output point
             */
            clipLine(a1: geotoolkit.util.Point, a2: geotoolkit.util.Point, result1: geotoolkit.util.Point, result2: geotoolkit.util.Point): number;
            /**
             * Translates rectangle a specified distance
             * @param tx  (Required) x translation
             * @param ty  (Required) y translation
             */
            translate(tx: number, ty: number): this;
            /**
             * Inflate rectangle from each side by width and height
             * @param width  (Required) extend in horizontal direction
             * @param height  (Required) extend in vertical direction
             */
            inflate(width: number, height: number): this;
            /**
             * Inflate rectangle
             * @param source  (Required) rect to be inflated
             * @param w  (Required) The width to inflate
             * @param h  (Required) The height to inflate
             */
            static inflateRect(source: geotoolkit.util.Rect, w: number, h: number): geotoolkit.util.Rect;
            /**
             * returns Rect state
             */
            isEmpty(): boolean;
            /**
             * Round this rectangle to integer values for coordinates.
             * This method sets the largest whole numbers less than or equal to the current
             * values of left-top corner and sets the smallest whole numbers greater than or equal
             * to the current values of right-bottom corner of the rectangle.
             */
            round(): this;
            /**
             * Returns string like: "Rect: x1,y1:x2,y2
             * With x1 left
             * With y1 top
             * With x2 right
             * With y2 bottom
             */
            toString(): string;
            /**
             * Merges provided rectangular areas according to the operation applied.
             * @param oldRect  (Required) 1st rect to merge
             * @param newRect  (Required) 2nd rect to merge
             * @param operation  (Optional) operation to be performed on the new rect
             * @param dstRect  (Optional) destination rectangular geometry
             */
            static merge(oldRect: geotoolkit.util.Rect, newRect: geotoolkit.util.Rect, operation?: geotoolkit.util.GeometryOperation, dstRect?: geotoolkit.util.Rect): geotoolkit.util.Rect;
            /**
             * Merges with provided rectangular area according to the operation applied.
             * @param newRect  (Required) rect to be merged with the current
             * @param operation  (Optional) operation to apply
             */
            merge(newRect: geotoolkit.util.Rect, operation?: geotoolkit.util.GeometryOperation): this;
            /**
             * Check if rectangle1 contains rectangle2
             * @param rect1  (Required) rectangle 1
             * @param rect2  (Required) rectangle 2
             */
            static containsRect(rect1: geotoolkit.util.Rect, rect2: geotoolkit.util.Rect): boolean;
            /**
             * Check if rectangle1 intersects rectangle2
             * @param rect1  (Required) rectangle 1
             * @param rect2  (Required) rectangle 2
             */
            static intersectsRect(rect1: geotoolkit.util.Rect, rect2: geotoolkit.util.Rect): boolean;
            /**
             * Check if rectangle contains polygon
             * @param polygon  (Required) polygon
             */
            containsPolygon(polygon: geotoolkit.util.Polygon): boolean;
            /**
             * Check if rectangle intersects polygon
             * @param polygon  (Required) polygon
             */
            intersectsPolygon(polygon: geotoolkit.util.Polygon): boolean;
            /**
             * Casts rectangle to polygon
             */
            toPolygon(): geotoolkit.util.Polygon;
            /**
             * Create or get rect from object
             * @param object  (Optional) object can be in format of constructor of geotoolkit.util.Rect
             */
            static fromObject(object?: any|geotoolkit.util.Rect): geotoolkit.util.Rect;
            /**
             * Get diagonal length of rectangle
             */
            getDiagonalLength(): number;
            /**
             * Empty rectangle
             */
            static Empty: geotoolkit.util.Rect;
            /**
             * Unitsquare (0, 0, 1, 1)
             */
            static UnitSquare: geotoolkit.util.Rect;
        }
        /**
         * Represents a polygon with methods that allow the geometry of the polygon
         * to be queried and modified.
         */
        class Polygon extends geotoolkit.util.Area {
            /**
             * Represents a polygon with methods that allow the geometry of the polygon
             * to be queried and modified.
             * @param x  (Optional) x coordinates
             * @param y  (Optional) y coordinates
             * @param evenOddMode  (Optional) even odd mode
             */
            constructor(x?: number[], y?: number[], evenOddMode?: boolean);
            /**
             * Return bounds and locks the bounds rect from further editing.
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Sets arrays of points. Will overwrite any exisitng points in this polygon.
             * @param x  (Required) array of x coordinates
             * @param y  (Required) array of y coordinates
             */
            setCoordinates(x: number[], y: number[]): this;
            /**
             * Add point to array of points.
             * @param x  (Required) x coordinate
             * @param y  (Required) y coordinate
             */
            push(x: number, y: number): any;
            /**
             * Gets x-coords of points
             */
            getPointsX(): number[];
            /**
             * Gets y-coords of points
             */
            getPointsY(): number[];
            /**
             * Gets number of points
             */
            getSize(): number;
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
             * Check if polygon contains point
             * @param x  (Required) x position of the point if parameter is a number OR if parameter is a point then it checks if point is inside the rect or not
             * @param y  (Optional) y position of the point
             */
            contains(x: number|geotoolkit.util.Point, y?: number): boolean;
            /**
             * Check if polygon contains polygon
             * @param polygon  (Required) polygon
             */
            containsPolygon(polygon: geotoolkit.util.Polygon): boolean;
            /**
             * Check if polygon intersects polygon
             * @param polygon  (Required) polygon
             */
            intersectsPolygon(polygon: geotoolkit.util.Polygon): boolean;
            /**
             * Check if polygon contains rectangle
             * @param rectangle  (Required) rectangle
             */
            containsRectangle(rectangle: geotoolkit.util.Rect): boolean;
            /**
             * Check if polygon intersects rectangle
             * @param rectangle  (Required) rectangle
             */
            intersectsRectangle(rectangle: geotoolkit.util.Rect): boolean;
            /**
             * Clone polygon
             */
            clone(): geotoolkit.util.Polygon;
            /**
             * Intersects polygon with the rectangle and leaves only the inner part of polygon
             * WARNING! The result might have self-intersections in some cases
             * @param rectangle  (Required) rectangle
             */
            intersectRectangle(rectangle: geotoolkit.util.Rect): this;
        }
        /**
         * Create transformation matrix
         */
        class Transformation {
            /**
             * Create transformation matrix
             * @param xx  (Optional) x scale
             * @param yx  (Optional) yx skew
             * @param xy  (Optional) xy skew
             * @param yy  (Optional) y scale
             * @param dx  (Optional) x axis translation
             * @param dy  (Optional) y axis translation
             */
            constructor(xx?: number, yx?: number, xy?: number, yy?: number, dx?: number, dy?: number);
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.xx  (Optional) x scale
             * @param properties.yx  (Optional) yx skew
             * @param properties.xy  (Optional) xy skew
             * @param properties.yy  (Optional) y scale
             * @param properties.dx  (Optional) x axis translation
             * @param properties.dy  (Optional) y axis translation
             */
            setProperties(properties: any | { xx?: number; yx?: number; xy?: number; yy?: number; dx?: number; dy?: number; } ): this;
            /**
             * Transform point defined by two coordinates X and Y
             * @param x  (Required) x coordinate
             * @param y  (Required) y coordinate
             */
            transformXY(x: number, y: number): geotoolkit.util.Point;
            /**
             * Inverse transform point defined by two coordinates X and Y
             * @param x  (Required) x coordinate
             * @param y  (Required) y coordinate
             */
            inverseTransformXY(x: number, y: number): geotoolkit.util.Point;
            /**
             * Transforms from one point, rect, or dimension to another
             * @param source  (Required) origin to be transformed from
             * @param destination  (Optional) destination rectangle
             */
            transform(source: number|geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension, destination?: number|geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension): number|geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension;
            /**
             * Performs an inverse transform using points, rect or dimension
             * @param source  (Required) source rect
             * @param destination  (Optional) destination rect
             */
            inverseTransform(source: geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension, destination?: geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension|any): geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension;
            /**
             * Transform rectangle
             * @param source  (Required) source rectangle
             * @param destination  (Optional) destination rectangle
             */
            transformRect(source: geotoolkit.util.Rect, destination?: geotoolkit.util.Rect): geotoolkit.util.Rect|any;
            /**
             * Sets rect to rect transformation
             * @param source  (Required) source rectangle
             * @param destination  (Required) destination rectangle
             * @param horizontalFlip  (Optional) horizontal flip
             * @param verticalFlip  (Optional) vertical flip
             * @param aspectRatio  (Optional) keeps aspect ratio
             */
            setRectToRectTransformation(source: geotoolkit.util.Rect, destination: geotoolkit.util.Rect, horizontalFlip?: boolean, verticalFlip?: boolean, aspectRatio?: boolean): this;
            /**
             * Inverse transform rectangle
             * @param source  (Required) source rectangle
             * @param destination  (Optional) destination rectangle
             */
            inverseTransformRect(source: geotoolkit.util.Rect, destination?: geotoolkit.util.Rect): geotoolkit.util.Rect;
            /**
             * Transform point
             * @param src  (Required) source point to transform
             * @param dst  (Optional) optional returned transformed point
             */
            transformPoint(src: geotoolkit.util.Point, dst?: geotoolkit.util.Point): geotoolkit.util.Point;
            /**
             * Inverse transforms the specified point
             * @param sourcePoint  (Required) source point to transform
             * @param destinationPoint  (Optional) optional destination point
             */
            inverseTransformPoint(sourcePoint: geotoolkit.util.Point, destinationPoint?: geotoolkit.util.Point): geotoolkit.util.Point;
            /**
             * Inverse transforms the specified dimension
             * @param sourceSize  (Required) the point to be inverse transformed
             * @param targetSize  (Optional) the size to hold the transformed point
             */
            transformDimension(sourceSize: geotoolkit.util.Dimension, targetSize?: geotoolkit.util.Dimension): geotoolkit.util.Dimension;
            /**
             * Inverse transforms the specified dimension
             * @param sourceSize  (Required) the point to be inverse transformed
             * @param targetSize  (Optional) the size to hold the transformed point
             */
            inverseTransformDimension(sourceSize: geotoolkit.util.Dimension, targetSize?: geotoolkit.util.Dimension): geotoolkit.util.Dimension;
            /**
             * Resets this transform to the Identity transform.
             */
            setToIdentity(): this;
            /**
             * Returns X Scale(xx)
             */
            getScaleX(): number;
            /**
             * Returns Y Scale(yy)
             */
            getScaleY(): number;
            /**
             * Sets X & Y Scale by xx and yy
             * @param xx  (Required) x scale
             * @param yy  (Required) y scale
             */
            setScale(xx: number, yy: number): this;
            /**
             * Returns X sheer (xy)
             */
            getShearX(): number;
            /**
             * Returns Y sheer (yx)
             */
            getShearY(): number;
            /**
             * Returns X translation (dx)
             */
            getTranslateX(): number;
            /**
             * Returns Y translation (dy)
             */
            getTranslateY(): number;
            /**
             * Returns translation in both X & Y (dx, dy)
             */
            getTranslate(): geotoolkit.util.Point;
            /**
             * Sets X & Y translation by dx and dy
             * @param dx  (Required) x offset
             * @param dy  (Required) y offset
             */
            setTranslate(dx: number, dy: number): this;
            /**
             * Returns matrix determinant
             */
            getDeterminant(): number;
            /**
             * Pre-concatenates transformation matrix with Tx
             * @param Tx  (Required) transformation
             */
            preConcatenate(Tx: geotoolkit.util.Transformation): this;
            /**
             * Is rotated transformation
             */
            isRotated(): boolean;
            /**
             * Is identity transformation
             */
            isIdentity(): boolean;
            /**
             * Concatenates Tx to transformation
             * @param Tx  (Required) transformation
             */
            concatenate(Tx: geotoolkit.util.Transformation): this;
            /**
             * Sets transformation
             * @param xx  (Optional) x scale
             * @param yx  (Optional) yx skew
             * @param xy  (Optional) xy skew
             * @param yy  (Optional) y scale
             * @param dx  (Optional) x axis translation
             * @param dy  (Optional) y axis translation
             */
            setTransformation(xx?: number, yx?: number, xy?: number, yy?: number, dx?: number, dy?: number): this;
            /**
             * Create inverse transformation
             */
            createInverse(): this;
            /**
             * Rotate
             * @param theta  (Required) angle to rotate
             */
            rotate(theta: number): this;
            /**
             * Translate
             * @param tx  (Required) x offset along x coordinate
             * @param ty  (Required) y offset along y coordinate
             */
            translate(tx: number, ty: number): this;
            /**
             * Scale
             * @param sx  (Required) scale factor along x coordinate
             * @param sy  (Required) scale factor along y coordinate
             */
            scale(sx: number, sy: number): this;
            /**
             * Applies a shear mapping to the transform
             * @param shx  (Required) shear coefficient along x coordinate
             * @param shy  (Required) shear coefficient along y coordinate
             */
            shear(shx: number, shy: number): this;
            /**
             * Transform a set of point defined by two arrays
             * @param x  (Required) an array of x-coordinates
             * @param y  (Required) an array of y-coordinates
             * @param count  (Required) a count of point to transform
             */
            transformPoints(x: number[], y: number[], count: number): any;
            /**
             * Apply X transformation do x,y
             * @param x  (Required) x coordinate
             * @param y  (Required) y coordinate
             */
            transformX(x: number, y: number): number;
            /**
             * Apply Y transformation do x,y
             * @param x  (Required) x coordinate
             * @param y  (Required) y coordinate
             */
            transformY(x: number, y: number): number;
            /**
             * Transforms GraphicsPath
             * @param srcPath  (Required) source path to transform
             * @param dstPath  (Optional) transformed path
             */
            transformPath(srcPath: geotoolkit.renderer.GraphicsPath, dstPath?: geotoolkit.renderer.GraphicsPath): geotoolkit.renderer.GraphicsPath;
            /**
             * Return true if transformation are identical
             * @param Tx  (Required) transformation
             */
            fastEquals(Tx: geotoolkit.util.Transformation): boolean;
            /**
             * Return length to X ratio
             */
            getLengthToXRatioAt(): number;
            /**
             * Return length to Y ratio
             */
            getLengthToYRatioAt(): number;
            /**
             * Return clone object.
             */
            clone(): geotoolkit.util.Transformation;
            /**
             * Gets translate instance
             * @param x  (Required) x coordinate
             * @param y  (Required) y coordinate
             * @param dst  (Optional) destination transformation object
             */
            static getTranslateInstance(x: number, y: number, dst?: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Gets rotate instance
             * @param theta  (Required) angle
             * @param x  (Required) x coordinate
             * @param y  (Required) y coordinate
             * @param dst  (Optional) destination transformation object
             */
            static getRotateInstance(theta: number, x: number, y: number, dst?: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Gets rect to rect transformation
             * @param source  (Required) source rectangle
             * @param destination  (Required) destination rectangle
             * @param horizontalFlip  (Optional) horizontal flip
             * @param verticalFlip  (Optional) vertical flip
             * @param aspectRatio  (Optional) keeps aspect ratio
             * @param dst  (Optional) destination transformation object
             */
            static getRectToRectInstance(source: geotoolkit.util.Rect, destination: geotoolkit.util.Rect, horizontalFlip?: boolean, verticalFlip?: boolean, aspectRatio?: boolean, dst?: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Return true if transformation can be created from source rectangle to destination rectangle.
             * Vertical or horizontal dimension can be empty
             * @param source  (Required) source rectangle
             * @param destination  (Required) destination rectangle
             */
            static canCreateRectToRectInstance(source: geotoolkit.util.Rect, destination: geotoolkit.util.Rect): boolean;
            /**
             * Get a new transformation instance based on scale values
             * @param scaleX  (Required) scale factor along x coordinate
             * @param scaleY  (Required) scale factor along y coordinate
             * @param dst  (Optional) destination transformation object
             */
            static getScaleInstance(scaleX: number, scaleY: number, dst?: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Get a new transformation instance based on shear values
             * @param shx  (Required) shear coefficient along x coordinate
             * @param shy  (Required) shear coefficient along y coordinate
             * @param dst  (Optional) destination transformation object
             */
            static getShearInstance(shx: number, shy: number, dst?: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Multiply two matrices
             * @param a  (Required) the first matrix
             * @param b  (Required) the second matrix
             * @param dst  (Optional) destination transformation object
             */
            static multiply(a: geotoolkit.util.Transformation, b: geotoolkit.util.Transformation, dst?: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Divide two matrices
             * @param a  (Required) the first matrix
             * @param b  (Required) the second matrix
             * @param dst  (Optional) destination transformation object
             */
            static divide(a: geotoolkit.util.Transformation, b: geotoolkit.util.Transformation, dst?: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Returns transformation parameters as one string
             */
            toString(): string;
        }
        /**
         * An interface that represents an unit
         */
        class AbstractUnit {
            /**
             * An interface that represents an unit
             */
            constructor();
            /**
             * Convert unit value from base unit
             * @param value  (Required) value to be converted
             */
            fromBaseUnit(value: number): number;
            /**
             * Convert unit value to base unit
             * @param value  (Required) value to be converted
             */
            toBaseUnit(value: number): number;
            /**
             * Unit symbol
             */
            getSymbol(): string;
            /**
             * get the Quantity types of the unit
             */
            getQuantityType(): string[];
            /**
             * Returns unit name
             */
            getName(): string;
            /**
             * Returns unit description
             */
            getDescription(): string;
            /**
             * Convert the value to a specific unit if <code>canConvertTo</code>
             * @param value  (Required) value to be converted
             * @param other  (Required) other unit to be converted
             */
            convert(value: number|number[], other: geotoolkit.util.AbstractUnit|string): number|number[];
            /**
             * Check if a unit can be converted from the current unit
             * @param other  (Required) unit to be converted
             */
            canConvertTo(other: geotoolkit.util.AbstractUnit|string): boolean;
            /**
             * Check if the unit belongs to the type
             * @param type  (Required) quantity type to be tested
             */
            belongsTo(type: string): boolean;
            /**
             * Compares this unit with another unit
             * @param other  (Required) 
             */
            sameAs(other: geotoolkit.util.AbstractUnit|string): boolean;
            /**
             * Returns base unit symbol
             */
            getBaseUnitSymbol(): string;
        }
        /**
         * Defines an interface, which represents an unit of measure,
         * the ratio for new unit is computed with: y= (a+b*x)/(c+d*x)
         */
        class Unit extends geotoolkit.util.AbstractUnit {
            /**
             * Defines an interface, which represents an unit of measure,
             * the ratio for new unit is computed with: y= (a+b*x)/(c+d*x)
             * @param name  (Required) represent the name of the unit (example : 'pint')
             * @param quantityType  (Optional) represent the quantity type of the unit like length, time, pressure etc. (example: 'volume')
             * @param symbol  (Optional) symbol to represent the unit (example: 'pt' to represent pint)
             * @param baseUnitSymbol  (Optional) represents the unit symbol of it's base unit (example for volume, 'm3' can be the base unit)
             * @param a  (Optional) factor
             * @param b  (Optional) factor
             * @param c  (Optional) factor
             * @param d  (Optional) factor
             * @param description  (Optional) It represents the description of unit
             */
            constructor(name: string|geotoolkit.util.Unit|any, quantityType?: string[], symbol?: string, baseUnitSymbol?: string, a?: number, b?: number, c?: number, d?: number, description?: string);
            /**
             * Converts value from base unit and gives value in current unit
             * @param value  (Required) value to be converted
             */
            fromBaseUnit(value: number): number;
            /**
             * Converts value from current unit to base unit
             * @param value  (Required) value to be converted
             */
            toBaseUnit(value: number): number;
            /**
             * Returns the quantityTypes of this unit
             */
            getQuantityType(): string[];
            /**
             * Returns the symbol of this unit
             */
            getSymbol(): string;
            /**
             * Returns baseUnitSymbol of this unit
             */
            getBaseUnitSymbol(): string;
            /**
             * Returns the name of the unit
             */
            getName(): string;
            /**
             * Returns the description of the unit
             */
            getDescription(): string;
            /**
             * Convert value to other unit if conversation is possible and giver converted value(s) in other unit
             * @param value  (Required) specific value(s) to be converted to other unit
             * @param other  (Required) represents the other unit to which the values will be converted
             */
            convert(value: number|number[], other: geotoolkit.util.AbstractUnit|string): number|number[];
            /**
             * Returns whether the unit conversation is possible from this unit to other unit
             * @param other  (Required) unit to be converted
             */
            canConvertTo(other: geotoolkit.util.AbstractUnit|string): boolean;
            /**
             * Returns whether current unit belongs to the specified type(s)
             * @param type  (Required) quantityType(s) to be tested
             */
            belongsTo(type: string|string[]): boolean;
            /**
             * Returns whether this unit is similar to other unit
             * @param other  (Required) 
             */
            sameAs(other: geotoolkit.util.AbstractUnit|string): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.name  (Optional) represent the name of the unit (example : 'pint')
             * @param properties.quantitytype  (Optional) represent the quantity type of the unit like length, time, pressure etc. (example: 'volume')
             * @param properties.symbol  (Optional) symbol to represent the unit (example: 'pt' to represent pint)
             * @param properties.baseunitsymbol  (Optional) represents the unit symbol of it's base unit (example for volume, 'm3' can be the base unit)
             * @param properties.a  (Optional) factor
             * @param properties.b  (Optional) factor
             * @param properties.c  (Optional) factor
             * @param properties.d  (Optional) factor
             * @param properties.description  (Optional) It represents the description of unit
             */
            setProperties(properties: any | { name?: string|geotoolkit.util.Unit|any; quantitytype?: string[]; symbol?: string; baseunitsymbol?: string; a?: number; b?: number; c?: number; d?: number; description?: string; } ): this;
            /**
             * Returns a clone of the unit.
             */
            clone(): geotoolkit.util.Unit;
        }
        /**
         * Factory that creates geotoolkit.util.Unit.
         * This class acts as a factory and a registry class that can convert string representation of units into plain unit object. Unit objects themselves can perform conversion of values. <br>
         * This class embeds a default catalog of commonly used units. <b>Units Tutorial</b> in Geotoolkit/CarnacJS/Utils demonstrates how one could extend or replace units by creating and registering new units.<br>
         * It lists the base units and shows how to convert and add new units to the factory as shown in the example below.<br>
         * This class also holds the information used by the toolkit to convert device (screen) dimensions to rendering dimensions.<br>
         * For example if we are are rendering a track with width 1" on display or device size, this 1" can be measured through a ruler.
         * But Javascript cannot set size in device coordinates, so we need Pixel per Inch (PPI, each device has different value) and
         * Pixel per css Pixel (PPCP is what can be used in Javascript and is not same as Pixel).<br>
         * UnitFactory Class has a static dictionary and can recognize all existing Apple devices and we have APIs to let predefined devices set correct values.
         * The toolkit embeds a recognition algorithm that will try to retrieve those values from a dictionary by analysing the user-agent and other
         * global properties of the browser. However this algorithm will only recognize some of the predefined devices.<br>
         * One could either extend this list or customize the algorithm or explicitly set those ppi & ppcp values.<br>
         * The later is recommended for production application where the displayed scales are critical and the supported platforms list is open.
         * The suggested approach is to provide the user with a calibration tool that will let him set the actual ratios manually.
         */
        class UnitFactory {
            /**
             * Factory that creates geotoolkit.util.Unit.
             * This class acts as a factory and a registry class that can convert string representation of units into plain unit object. Unit objects themselves can perform conversion of values. <br>
             * This class embeds a default catalog of commonly used units. <b>Units Tutorial</b> in Geotoolkit/CarnacJS/Utils demonstrates how one could extend or replace units by creating and registering new units.<br>
             * It lists the base units and shows how to convert and add new units to the factory as shown in the example below.<br>
             * This class also holds the information used by the toolkit to convert device (screen) dimensions to rendering dimensions.<br>
             * For example if we are are rendering a track with width 1" on display or device size, this 1" can be measured through a ruler.
             * But Javascript cannot set size in device coordinates, so we need Pixel per Inch (PPI, each device has different value) and
             * Pixel per css Pixel (PPCP is what can be used in Javascript and is not same as Pixel).<br>
             * UnitFactory Class has a static dictionary and can recognize all existing Apple devices and we have APIs to let predefined devices set correct values.
             * The toolkit embeds a recognition algorithm that will try to retrieve those values from a dictionary by analysing the user-agent and other
             * global properties of the browser. However this algorithm will only recognize some of the predefined devices.<br>
             * One could either extend this list or customize the algorithm or explicitly set those ppi & ppcp values.<br>
             * The later is recommended for production application where the displayed scales are critical and the supported platforms list is open.
             * The suggested approach is to provide the user with a calibration tool that will let him set the actual ratios manually.
             */
            constructor();
            /**
             * Returns the time stamp (version) of unit factory. This value will be updated whenever modification made.
             */
            getTimeStamp(): number;
            /**
             * Returns an instance of unit based on specified information
             * @param value  (Required) represent the {string} name, {string} symbol or {geotoolkit.util.AbstractUnit} unit to be created
             * @param quantityType  (Optional) expected quantity types
             * @param nullIfNotExist  (Optional) return null if unit does not exist instead of returning a user-defined unit
             */
            getUnit(value: string|geotoolkit.util.AbstractUnit, quantityType?: string[], nullIfNotExist?: boolean): geotoolkit.util.AbstractUnit|any;
            /**
             * Return array of unit symbols by class name
             * @param name  (Required) class name
             */
            getUnitSymbolsByClass(name: string): string[];
            /**
             * Returns all convertable unit symbols
             * @param unit  (Required) unit to convert from/to
             */
            getConvertableUnitSymbols(unit: geotoolkit.util.AbstractUnit|string): string[];
            /**
             * Clears all units from unit factory except CSS units (pixel, point and pica)
             */
            clearUnits(): this;
            /**
             * Add a unit to factory. please reference the constructor in {@link geotoolkit.util.Unit} for more details.
             * @param name  (Required) unit name or unit inherited from AbstractUnit
             * @param quantityType  (Required) expected quantity type
             * @param symbol  (Required) unit symbol
             * @param baseUnitSymbol  (Required) base unit symbol
             * @param a  (Required) factor
             * @param b  (Required) factor
             * @param c  (Required) factor
             * @param d  (Required) factor
             * @param description  (Optional) description of the unit
             */
            addUnit(name: string|geotoolkit.util.AbstractUnit|any, quantityType: string[]|string, symbol: string, baseUnitSymbol: string, a: number, b: number, c: number, d: number, description?: string): this;
            /**
             * Clears all unit classes from unit factory
             */
            clearUnitClasses(): this;
            /**
             * Adds a unit class to unit factory
             * @param name  (Required) unit name
             * @param baseUnitSymbol  (Required) base unit symbol
             * @param unitSymbols  (Required) array of unit symbols
             */
            addUnitClass(name: string, baseUnitSymbol: string, unitSymbols: string[]): this;
            /**
             * Clears all unit alias from unit factory
             */
            clearUnitAlias(): this;
            /**
             * Adds a unit alias to unit factory
             * @param baseUnitSymbol  (Required) base unit symbol
             * @param isCaseSensitive  (Required) case sensitivity flag
             * @param alias  (Optional) alias unit symbols
             */
            addUnitAlias(baseUnitSymbol: string, isCaseSensitive: string|boolean, alias?: string[]|string): this;
            /**
             * Adds device PPI list
             * @param list  (Required) each JSON object should be <pre>{'device': 'device name', 'ppi': 96, 'ppcp': 1, 'accept': function}. </pre> Accept function returns true if device matched.
             */
            addDevicePPIList(list: any[]): this;
            /**
             * Clears device PPI list
             */
            clearDevicePPIList(): this;
            /**
             * Returns physical pixels per inch of the device
             */
            getPPI(): number;
            /**
             * Sets physical pixels per inch of the device
             * @param ppi  (Required) pixel per inch
             * @param ppcp  (Required) pixel per css pixel (sometimes different from geotoolkit.window.devicePixelRatio)
             */
            setPPI(ppi: number, ppcp: number): this;
            /**
             * Returns the number of CSS pixels (browser) per physical inch (device)
             * CSS pixels per physical inch is different from pixels per inch of the device.
             * It considers operating system and browser scaling and the ratio between browser inch and physical device inch
             */
            getCSSPixelPerInch(): number;
            /**
             * Updates CSS pixels per physical inch
             */
            updateDevicePPI(): this;
            /**
             * Returns instance of unit factory
             */
            static getInstance(): geotoolkit.util.UnitFactory;
        }
        /**
         * This class provides a Timer feature. It uses the browser's native capabilities to implement a Timer mechanism that will notify the given callback at the given rate.
         *  Calling code is responsible for stopping the timer to dispose it cleanly.
         */
        class Timer {
            /**
             * This class provides a Timer feature. It uses the browser's native capabilities to implement a Timer mechanism that will notify the given callback at the given rate.
             *  Calling code is responsible for stopping the timer to dispose it cleanly.
             * @param interval  (Optional) interval between ticks in ms. Default is 1000 ms.
             * @param listener  (Optional) function to be called for each tick
             */
            constructor(interval?: number, listener?: Function);
            /**
             * Start timer
             */
            start(): this;
            /**
             * Stop timer
             */
            stop(): any;
            /**
             * Return true if timer is started
             */
            isStarted(): boolean;
            /**
             * Sets interval of the timer in ms. The given interval will not be applied if the Timer is already started. One should stop and restart the timer to make this change effective.
             * @param interval  (Required) interval
             */
            setInterval(interval: number): any;
            /**
             * Return time interval im ms between ticks
             */
            getInterval(): number;
            /**
             * Sets listener
             * @param listener  (Required) function to be called for each tick
             */
            setListener(listener: Function): any;
        }
        /**
         * Defines sender of the events. This class implements a dispatcher/listeners pattern. It's inherited by many classes of the toolkit that requires to send events.<br>
         * Listeners are callbacks(functions) that can be added and removed at any time. Those will be notified when the corresponding event-type is fired on this object.
         */
        class EventDispatcher {
            /**
             * Defines sender of the events. This class implements a dispatcher/listeners pattern. It's inherited by many classes of the toolkit that requires to send events.<br>
             * Listeners are callbacks(functions) that can be added and removed at any time. Those will be notified when the corresponding event-type is fired on this object.
             */
            constructor();
            /**
             * EventDispatcher Events
             */
            static Events: any;
            /**
             * Dispose.
             */
            dispose(): any;
            /**
             * Attach listener on event
             * @param type  (Required) type of event or property
             * @param callback  (Required) to be called
             */
            on(type: string, callback: Function): this;
            /**
             * Detach listener on event.
             * Calling .off() with no arguments removes all attached listeners.
             * Calling .off(type) with no callback removes all attached listeners for specific type.
             * @param type  (Optional) type of the event
             * @param callback  (Optional) function to be called
             */
            off(type?: string, callback?: Function): this;
            /**
             * Notify listeners
             * @param type  (Required) event types
             * @param source  (Required) of the event
             * @param args  (Optional) arguments of the event
             */
            protected notify(type: string, source: any, args?: any): this;
            /**
             * Return true if the event dispatcher doesn't notify any events
             */
            isSilent(): boolean;
            /**
             * Set silent mode
             * @param bool  (Required) flag to enable silent mode
             */
            setSilent(bool: boolean): this;
            /**
             * Returns whether this object has been disposed
             */
            isDisposed(): boolean;
        }
        /**
         * This abstract class is the parent class of all ColorProviders. A colorprovider converts a value to a color based on its configuration. It's generally created by associating some colors to specific values.<br>
         * Then it will interpolate (algorithm depends of the actual implementation) those colors on the fly to find the actual color corresponding to a value.<br>
         * This class also provides a list of builtin color maps {@link geotoolkit.util.ColorProvider.KnownScales}.<br>
         * All the color providers inherit from this class, for examples please refer to:<br>
         *     <br>
         *  {@link geotoolkit.util.DefaultColorProvider} ; <br>
         *  {@link geotoolkit.util.DiscreteGradientColorProvider} ; <br>
         *  {@link geotoolkit.util.LogColorProvider} ; <br>
         *  {@link geotoolkit.util.RangeColorProvider} ; <br>
         */
        class ColorProvider extends geotoolkit.util.EventDispatcher implements geotoolkit.attributes.IRasterable {
            /**
             * This abstract class is the parent class of all ColorProviders. A colorprovider converts a value to a color based on its configuration. It's generally created by associating some colors to specific values.<br>
             * Then it will interpolate (algorithm depends of the actual implementation) those colors on the fly to find the actual color corresponding to a value.<br>
             * This class also provides a list of builtin color maps {@link geotoolkit.util.ColorProvider.KnownScales}.<br>
             * All the color providers inherit from this class, for examples please refer to:<br>
             *     <br>
             *  {@link geotoolkit.util.DefaultColorProvider} ; <br>
             *  {@link geotoolkit.util.DiscreteGradientColorProvider} ; <br>
             *  {@link geotoolkit.util.LogColorProvider} ; <br>
             *  {@link geotoolkit.util.RangeColorProvider} ; <br>
             */
            constructor();
            /**
             * Enum of known Named Colors
             */
            static KnownColors: any;
            /**
             * Enum of known Scales
             */
            static KnownScales: any;
            /**
             * Style Events enumerator
             */
            static Events: any;
            /**
             * Returns a new instance of geotoolkit.attributes.Raster
             * @param xMin  (Optional) x Min position to get color
             * @param yMin  (Optional) y Min position to get color
             * @param xMax  (Optional) x Max position to get color
             * @param yMax  (Optional) y Max position to get color
             */
            getRaster(xMin?: number, yMin?: number, xMax?: number, yMax?: number): geotoolkit.attributes.Raster;
            /**
             * Return ColorProvider constructor from the object class name or type.
             * @param objectType  (Optional) ColorProvider class name
             */
            static getColorProviderType(objectType?: string): any;
            /**
             * Returns known color value/s
             * @param colorName  (Optional) color name, if not specified then returns list of known colors
             */
            getNamedColor(colorName?: string|geotoolkit.util.ColorProvider.KnownColors): {array:any[];colorPair:{name:string;value:any|string|geotoolkit.attributes.FillStyle}}|any;
            /**
             * Set color value
             * @param colorName  (Required) 
             * @param colorValue  (Required) 
             */
            setNamedColor(colorName: string|geotoolkit.util.ColorProvider.KnownColors, colorValue: any|string|geotoolkit.attributes.FillStyle): this;
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
             * invalidate the color provider and fire an event to the visuals
             */
            invalidate(): any;
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
             * set properties
             * @param properties  (Required) 
             */
            setProperties(properties: any): this;
            /**
             * get properties
             */
            getProperties(): any;
        }
        /**
         * A utility class that provides helpful functions to manipulate colors. This class provides functions to parse, edit and convert colors from rgba to hsb.
         *  It's especially useful to convert colors in css format to toolkit {@link geotoolkit.util.RgbaColor}.
         */
        class ColorUtil {
            /**
             * A utility class that provides helpful functions to manipulate colors. This class provides functions to parse, edit and convert colors from rgba to hsb.
             *  It's especially useful to convert colors in css format to toolkit {@link geotoolkit.util.RgbaColor}.
             */
            constructor();
            /**
             * Returns random RGBA color
             * @param alpha  (Optional) transparency chanel from 0 to 1
             */
            static getRandomColorRgba(alpha?: number): string;
            /**
             * return random RGB color
             */
            static getRandomColorRgb(): string;
            /**
             * return new color
             */
            static getNewColor(): string;
            /**
             * convert css color {string} to {geotoolkit.util.RgbaColor}
             * @param color  (Required) color to parse
             */
            static parseColor(color: string|geotoolkit.util.RgbaColor): geotoolkit.util.RgbaColor;
            /**
             * @param color  (Required) CSS Color
             */
            parseColor(color: string): geotoolkit.util.RgbaColor|any;
            /**
             * set value for the alpha chanel
             * @param color  (Required) CSS color
             * @param a  (Required) alpha component 0 - 255
             */
            static setAlpha(color: string, a: number): string;
            /**
             * Converts legacy MS Access Code to a RGBA color
             * @param accessCode  (Required) The MS access code to convert to a color
             */
            static parseMSColor(accessCode: number): geotoolkit.util.RgbaColor|any;
            /**
             * converts color to string
             * @param color  (Required) color to convert
             */
            static colorToString(color: string|geotoolkit.util.RgbaColor|geotoolkit.util.HsvColor): string;
        }
        /**
         * This class is the default implementation of a colorprovider.<br>
         * <br>
         * It uses a map of sorted values and colors.<br>
         * When retrieving the Color for a specified value, if the value is not found in the collection it gets the minimum and maximum value relative to the specified value.<br>
         * Then it gets the colors corresponding to these values, interpolates the colors and returns the color according to the relative position of the value between the minimum and maximum values.<br>
         */
        class DefaultColorProvider extends geotoolkit.util.ColorProvider {
            /**
             * This class is the default implementation of a colorprovider.<br>
             * <br>
             * It uses a map of sorted values and colors.<br>
             * When retrieving the Color for a specified value, if the value is not found in the collection it gets the minimum and maximum value relative to the specified value.<br>
             * Then it gets the colors corresponding to these values, interpolates the colors and returns the color according to the relative position of the value between the minimum and maximum values.<br>
             * @param values  (Required) The values or a json
             * @param values.values  (Optional) The values
             * @param values.colors  (Optional) The colors
             * @param values.reversed  (Optional) boolean to define the sorting direction
             * @param values.scale  (Optional) A predefined set of colors
             * @param values.min  (Optional) Start value for the scale
             * @param values.max  (Optional) End value for the scale
             * @param colors  (Optional) The colors
             */
            constructor(values: number[]|any | { values?: number[]; colors?: geotoolkit.util.RgbaColor[]; reversed?: boolean; scale?: geotoolkit.util.ColorProvider.KnownScales; min?: number; max?: number; } , colors?: geotoolkit.util.RgbaColor[]);
            /**
             * Style Events enumerator
             */
            static Events: any;
            /**
             * Add color to the collection
             * Compatibility: old JSON format {'value': 0, 'red': 255, 'green': 255, 'blue': 255, 'alpha': 1} is supported,
             * but new parameter list is recommended
             * @param value  (Required) index of this color on the colorbar
             * @param color  (Required) CSS color string or RgbaColor object
             */
            addColor(value: number, color: string|geotoolkit.util.RgbaColor): this;
            /**
             * Replace all colors in the collection by this set
             * @param values  (Required) new values
             * @param colors  (Optional) new colors
             */
            setColors(values: number[], colors?: (string|geotoolkit.util.RgbaColor)[]): this;
            /**
             * Replace all colors in the collection by this scale
             * @param scale  (Required) Scale to use
             * @param start  (Optional) Start value to use
             * @param end  (Optional) End value to use
             */
            setScale(scale: geotoolkit.util.ColorProvider.KnownScales, start?: number, end?: number): this;
            /**
             */
            getScale(): geotoolkit.util.ColorProvider.KnownScales;
            /**
             * Remove color from the collection
             * @param value  (Required) value to remove color
             */
            removeColor(value: number): this;
            /**
             * Returns minimum value set in the collection
             */
            getMinValue(): number;
            /**
             * Returns the maximum value set in this collection
             */
            getMaxValue(): number;
            /**
             * Always return a reference to sorted array of values.
             * Don't change this array.
             */
            getValues(): number[];
            /**
             */
            getColors(): geotoolkit.util.RgbaColor[];
            /**
             * reverse the axis
             */
            reverse(): this;
            /**
             * return true if the min / max is reversed
             */
            isReversed(): boolean;
            /**
             * set the min/max of the colorprovider, interpolating all values on the way.
             * @param start  (Required) Start value to use
             * @param end  (Required) End value to use
             */
            scaleTo(start: number, end: number): this;
            /**
             */
            getStopPoints(): any[];
            /**
             * Return color for the current value
             * @param value  (Required) index of this color on the colorbar
             */
            getColor(value: number): geotoolkit.util.RgbaColor;
            /**
             * get Properties
             */
            getProperties(): any;
            /**
             * set Properties
             * @param properties  (Required) Json object with properties
             * @param properties.scale  (Optional) color scale for provider to use
             * @param properties.min  (Optional) min value to use
             * @param properties.max  (Optional) max value to use
             * @param properties.reversed  (Optional) reversed flag
             */
            setProperties(properties: any | { scale?: geotoolkit.util.ColorProvider.KnownScales; min?: number; max?: number; reversed?: boolean; } ): this;
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
             * Create or get DefaultColorProvider from an object
             * @param object  (Required) to get provider from
             */
            static fromObject(object: any): geotoolkit.util.DefaultColorProvider;
        }
        /**
         * This class implements a colorprovider that use discretization to emulate a gradient.<br>
         * It's main purpose is to simplify a gradient by reducing the amount of possible colors (mostly for performance reasons).<br>
         * <br>
         * The discretization process can be controlled through the given 'bins' parameter that defines how many discrete colors will be used.<br>
         */
        class DiscreteGradientColorProvider extends geotoolkit.util.DefaultColorProvider {
            /**
             * This class implements a colorprovider that use discretization to emulate a gradient.<br>
             * It's main purpose is to simplify a gradient by reducing the amount of possible colors (mostly for performance reasons).<br>
             * <br>
             * The discretization process can be controlled through the given 'bins' parameter that defines how many discrete colors will be used.<br>
             * @param values  (Required) list of values
             * @param values.values  (Required) list of colors
             * @param values.colors  (Required) list of colors
             * @param values.bins  (Required) number of bins
             * @param colors  (Optional) list of colors
             * @param bins  (Optional) number of bins
             */
            constructor(values: number[]|any | { values?: string[]; colors?: string[]; bins?: number; } , colors?: geotoolkit.util.RgbaColor[], bins?: number);
            /**
             * Sets how many colors can be provided
             * @param colorNumber  (Required) number of colors that can be provided
             */
            setColorNumber(colorNumber: number): this;
            /**
             * Returns how many colors can be provided
             */
            getColorNumber(): number;
            /**
             */
            getStopPoints(): any[];
            /**
             */
            getColors(): any;
            /**
             */
            getValues(): any;
            /**
             * Returns color
             * @param value  (Required) index of this color on the colorbar
             */
            getColor(value: number): geotoolkit.util.RgbaColor|any;
            /**
             * @param values  (Required) new values
             * @param colors  (Required) new colors
             */
            setColors(values: number[], colors: (string|geotoolkit.util.RgbaColor)[]): this;
            /**
             * Replace all colors in the collection by this scale
             * @param scale  (Required) Scale to use
             * @param min  (Required) Minimum to use
             * @param max  (Required) Maximum to use
             */
            setScale(scale: geotoolkit.util.ColorProvider.KnownScales, min: number, max: number): this;
            /**
             * reverse the axis
             */
            reverse(): this;
            /**
             * get Properties
             */
            getProperties(): any;
            /**
             * set Properties of the object
             * @param properties  (Required) color provider properties
             * @param properties.bins  (Optional) number of bins.
             */
            setProperties(properties: any | { bins?: number; } ): this;
            /**
             * Create or get DiscreteGradientColorProvider from an object
             * @param object  (Required) gradient provider properties or instance
             */
            static fromObject(object: geotoolkit.util.DiscreteGradientColorProvider|any): geotoolkit.util.DiscreteGradientColorProvider;
        }
        /**
         * Creates a representation of Log color provider
         */
        class DefaultLogColorProvider extends geotoolkit.util.DefaultColorProvider {
            /**
             * Creates a representation of Log color provider
             * @param values  (Required) list of values
             * @param values.values  (Required) list of values
             * @param values.colors  (Required) list of colors
             * @param values.bins  (Required) number of bins
             * @param colors  (Required) list of colors
             * @param bins  (Required) number of bins
             */
            constructor(values: number[]|any | { values?: number[]; colors?: number[]; bins?: number; } , colors?: geotoolkit.util.RgbaColor[], bins?: number);
            /**
             * Enum of display style
             */
            static DisplayStyle: any;
            /**
             * Replace all colors in the collection by this set
             * @param values  (Required) new values
             * @param colors  (Required) new colors
             */
            setColors(values: number[], colors: (string|geotoolkit.util.RgbaColor)[]): this;
            /**
             * Method used to set graphical representation of DefaultLogColorProvider in a fillStyle
             * @param style  (Required) 
             */
            setDisplayStyle(style: geotoolkit.util.DefaultLogColorProvider.DisplayStyle): this;
            /**
             */
            getDisplayStyle(): geotoolkit.util.DefaultLogColorProvider.DisplayStyle;
            /**
             */
            getStopPoints(): any[];
            /**
             * Replace all colors in the collection by this scale
             * @param scale  (Required) Scale to Use
             * @param min  (Required) Minimum to Use
             * @param max  (Required) Maximum to Use
             */
            setScale(scale: geotoolkit.util.ColorProvider.KnownScales, min: number, max: number): this;
            /**
             * get Properties
             */
            getProperties(): any;
            /**
             * set Properties of the object
             * @param properties  (Required) Json with properties to set
             * @param properties.style  (Optional) Enum of display style
             */
            setProperties(properties: any | { style?: geotoolkit.util.DefaultLogColorProvider.DisplayStyle; } ): this;
            /**
             * Create or get DefaultLogColorProvider from an object
             * @param object  (Required) to get provider from
             */
            static fromObject(object: any): geotoolkit.util.DefaultLogColorProvider;
        }
        /**
         * Creates a representation of Log color provider
         */
        class LogColorProvider extends geotoolkit.util.DiscreteGradientColorProvider {
            /**
             * Creates a representation of Log color provider
             * @param values  (Required) list of values
             * @param values.values  (Required) list of values
             * @param values.colors  (Required) list of colors
             * @param values.bins  (Required) number of bins
             * @param colors  (Required) list of colors
             * @param bins  (Required) number of bins
             */
            constructor(values: number[]|any | { values?: number[]; colors?: number[]; bins?: number; } , colors?: geotoolkit.util.RgbaColor[], bins?: number);
            /**
             * Enum of display style
             */
            static DisplayStyle: any;
            /**
             * Replace all colors in the collection by this set
             * @param values  (Required) new values
             * @param colors  (Required) new colors
             */
            setColors(values: number[], colors: (string|geotoolkit.util.RgbaColor)[]): this;
            /**
             * Method used to set graphical representation of LogColorProvider in a fillStyle
             * @param style  (Required) 
             */
            setDisplayStyle(style: geotoolkit.util.LogColorProvider.DisplayStyle): this;
            /**
             */
            getDisplayStyle(): geotoolkit.util.LogColorProvider.DisplayStyle;
            /**
             */
            getStopPoints(): any[];
            /**
             * Replace all colors in the collection by this scale
             * @param scale  (Required) Scale to Use
             * @param min  (Required) Minimum to Use
             * @param max  (Required) Maximum to Use
             */
            setScale(scale: geotoolkit.util.ColorProvider.KnownScales, min: number, max: number): this;
            /**
             * convert value v to logarithmic t
             */
            valToLog(): any;
            /**
             * convert logarithmic t to value v
             */
            logToVal(): any;
            /**
             * get Properties
             */
            getProperties(): any;
            /**
             * set Properties of the object
             * @param properties  (Required) 
             * @param properties.style  (Optional) Enum of display style
             */
            setProperties(properties: any | { style?: geotoolkit.util.LogColorProvider.DisplayStyle; } ): this;
            /**
             * Create or get LogColorProvider from an object
             * @param object  (Required) 
             */
            static fromObject(object: any): geotoolkit.util.LogColorProvider;
        }
        /**
         * Creates a representation of Range color provider
         */
        class RangeColorProvider extends geotoolkit.util.ColorProvider {
            /**
             * Creates a representation of Range color provider
             * @param values  (Required) list of ranges
             * @param colors  (Required) list of colors
             */
            constructor(values: geotoolkit.util.Range[], colors: string[]|geotoolkit.util.RgbaColor[]);
            /**
             * Enum of display style
             */
            static DisplayStyle: any;
            /**
             * Method used to set graphical representation of LogColorProvider in a fillStyle
             * @param style  (Required) 
             */
            setDisplayStyle(style: geotoolkit.util.RangeColorProvider.DisplayStyle): this;
            /**
             */
            getDisplayStyle(): geotoolkit.util.RangeColorProvider.DisplayStyle;
            /**
             */
            getStopPoints(): any[];
            /**
             * Replace all colors in the collection by this set
             * @param values  (Required) list of ranges
             * @param colors  (Required) list of colors
             */
            setColors(values: geotoolkit.util.Range[], colors: string[]|geotoolkit.util.RgbaColor[]): this;
            /**
             * Returns color
             * @param value  (Required) index of the color
             */
            getColor(value: number): geotoolkit.util.RgbaColor;
            /**
             * sets the default/out of range color
             * @param color  (Required) default/out of range color
             */
            setDefaultColor(color: string): this;
            /**
             * gets the default/out of range color
             */
            getDefaultColor(): geotoolkit.util.RgbaColor;
            /**
             * Returns minimum value set in the collection
             */
            getMinValue(): number;
            /**
             * Returns the maximum value set in this collection
             */
            getMaxValue(): number;
            /**
             * Returns color provider properties
             */
            getProperties(): {properties:{values:geotoolkit.util.Range[];colors:(string|geotoolkit.util.RgbaColor)[];default:string}}|any;
            /**
             * Sets properties
             * @param properties  (Required) properties
             * @param properties.values  (Optional) list of ranges
             * @param properties.colors  (Optional) list of colors
             */
            setProperties(properties: any | { values?: geotoolkit.util.Range[]; colors?: string[]|geotoolkit.util.RgbaColor[]; } ): this;
            /**
             * Invalidate Default ColorProvider and notify visuals for update
             */
            invalidate(): this;
            /**
             * Return state of notification
             */
            isNotificationEnabled(): boolean;
            /**
             * Enable / disable notification
             * @param enable  (Required) enable or disable notifications
             * @param force  (Optional) true if parent should be invalidated immediately
             */
            setNotification(enable: boolean, force?: boolean): this;
            /**
             * Create or get RangeColorProvider from an object
             * @param object  (Required) 
             */
            static fromObject(object: any): geotoolkit.util.RangeColorProvider;
        }
        /**
         * Uses the filesystem API to make files locally for temporary storage.
         * Currently each FileInOut object makes a filesystem for one file. The file
         * can be written to with outToFile.
         * 
         * The file can be emptied with clearFile after the writer has been initialized, or written to with outToFile
         */
        class FileInOut {
            /**
             * Uses the filesystem API to make files locally for temporary storage.
             * Currently each FileInOut object makes a filesystem for one file. The file
             * can be written to with outToFile.
             * 
             * The file can be emptied with clearFile after the writer has been initialized, or written to with outToFile
             */
            constructor();
            /**
             * Called after the writer is initialized to perform all of the queued writes
             * 
             * Called onwriteend to write the next queued item
             */
            onWriterReady(): any;
            /**
             * Called to clear the contents of a file
             */
            clearFile(): any;
            /**
             * Builds a new file system
             */
            initFileSystem(): any;
            /**
             * Private method to build a blob and write it to the fileWriter
             * @param str  (Required) 
             */
            pushToFileStream(str: string): any;
            /**
             * Returns the URL of a file.
             * 
             * This URL may not be downloadable. Further testing required
             */
            getFileURL(): any;
            /**
             * Will open up a window
             */
            openFileWindow(): any;
        }
        /**
         * Defines helper methods to work with URL
         */
        class URLUtil {
            /**
             * Defines helper methods to work with URL
             */
            constructor();
            /**
             * Return host URL from document location
             */
            static getHost(): string;
            /**
             * Return base host URL from document location
             */
            static getBaseHost(): string;
            /**
             * Compress integer array by creating difference array and use RLE
             * @param data  (Required) input array
             */
            static compressArray(data: number[]): string;
            /**
             * @param url  (Required) URL to decompress
             */
            static decompressToArray(url: string): number[];
        }
        /**
         * This class is an implementation of promise interface.<br/>
         * 
         * The Promise interface is a proxy of something that is not known at its creation time, like a remote resource.<br/>
         * This Callback API can be used to asynchronously load this data without using forcing the rest of the application to wait for this resource.<br/>
         * Thus achieving a smooth loading of the required resources that will minimize down time time for the user.<br/>
         * <br/>
         * Reading materials on the Promise concept:<br/>
         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}<br/>
         * {@link http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&s=promise}<br/>
         */
        class Promise {
            /**
             * This class is an implementation of promise interface.<br/>
             * 
             * The Promise interface is a proxy of something that is not known at its creation time, like a remote resource.<br/>
             * This Callback API can be used to asynchronously load this data without using forcing the rest of the application to wait for this resource.<br/>
             * Thus achieving a smooth loading of the required resources that will minimize down time time for the user.<br/>
             * <br/>
             * Reading materials on the Promise concept:<br/>
             * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}<br/>
             * {@link http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&s=promise}<br/>
             * @param execute  (Required) execute function
             * @param abort  (Optional) optional abort function
             */
            constructor(execute: Function, abort?: Function);
            /**
             * Abort promise execution
             */
            abort(): any;
            /**
             * Appends fulfillment and rejection handlers to the promise and return a new promise
             * @param onResolved  (Optional) called if promise is accepted
             * @param onRejected  (Optional) called if promise is rejected
             */
            then(onResolved?: Function, onRejected?: Function): this;
            /**
             * Appends a rejection handler callback to the promise and returns a new promise resolving to the return value
             * of the callback
             * @param onRejected  (Optional) called if the promise is rejected
             */
            catch(onRejected?: Function): this;
            /**
             * returns a new promise that will give the result of all promises when fulfilled
             * @param promises  (Required) an array of promises
             */
            static all(promises: geotoolkit.util.Promise[]): geotoolkit.util.Promise;
            /**
             * Returns a new promise that resolves or rejects as soon as one of the promises in the array resolves or rejects
             * @param promises  (Required) an array of promises
             * @param interval  (Optional) [interval] to check promises result
             * @param timeout  (Optional) [timeout] that automatically reject the promise.
             */
            static race(promises: geotoolkit.util.Promise[], interval?: number, timeout?: number): geotoolkit.util.Promise;
            /**
             * returns a new promise that has been rejected.
             * 
             * tip: it is useful to make reason an instance of Error. (for debugging purpose)
             * @param reason  (Optional) reason why the promise has been rejected.
             */
            static reject(reason?: any): geotoolkit.util.Promise;
            /**
             * returns a new promise that has been resolved.
             * @param value  (Optional) value to resolve
             */
            static resolve(value?: any|geotoolkit.util.Promise): geotoolkit.util.Promise;
            /**
             * returns true if the object is an instance of geotoolkit.util.Promise
             * @param object  (Required) object to check if it is a promise
             */
            static isPromise(object: any): boolean;
        }
        /**
         * Collection represents a group of objects, known as its elements
         */
        class Collection extends geotoolkit.util.EventDispatcher {
            /**
             * Collection represents a group of objects, known as its elements
             */
            constructor();
            /**
             * Collection events enumerator
             */
            static Events: any;
            /**
             * Add item(s)
             * @param items  (Required) item(s) to add
             */
            add(items: any|any[]): any;
            /**
             * insert item at index
             * @param index  (Required) index
             * @param item  (Required) item to insert
             */
            insert(index: number, item: any): any;
            /**
             * Remove At index
             * @param index  (Required) index of item
             */
            removeAtIndex(index: number): any;
            /**
             * Remove
             * @param item  (Required) item
             */
            remove(item: any): any;
            /**
             * Clear All
             */
            clear(): any;
            /**
             * Return number of items int eh collection
             */
            getCount(): number;
            /**
             * Return item by index
             * @param index  (Required) index of the item in collection
             */
            get(index: number): any;
            /**
             * Return index of item
             * ( index of the specified child or -1 if node is not found)
             * @param item  (Required) item to check index
             */
            indexOf(item: any): number;
            /**
             * Get Iterator
             */
            getIterator(): geotoolkit.util.Iterator;
        }
        /**
         * This utility class allows fast checking of point existence in constant time.
         *  This is optimized for speed and not memory efficiency.
         */
        class FastLookup {
            /**
             * This utility class allows fast checking of point existence in constant time.
             *  This is optimized for speed and not memory efficiency.
             */
            constructor();
            /**
             * Adds a new point to the lookup set
             * @param x  (Required) The x-coordinate.
             * @param y  (Required) The y-coordinate.
             */
            add(x: number, y: number): any;
            /**
             * Checks if there is an point with the given coordinates in the set.
             * @param x  (Required) The x-coordinate.
             * @param y  (Required) The y-coordinate.
             */
            check(x: number, y: number): boolean;
            /**
             * Clears all the data without typed array de-allocation the arrays
             */
            clear(): any;
        }
        /**
         * This utility class performs a various line simplification algorithms
         */
        class PolylineOptimizer {
            /**
             * This utility class performs a various line simplification algorithms
             */
            constructor();
            /**
             * Enum of Polygon data types
             */
            static ResultType: any;
            /**
             * Determines what points can be removed without compromising the polyline structure. (Douglas-Peucker algorithm)
             * @param x  (Required) The x-coordinates of the points
             * @param y  (Required) The y-coordinates of the points
             * @param size  (Required) The size of the coordinate arrays to use
             * @param tolerancesArray  (Required) The tolerance limit
             * @param nonSmoothedPoints  (Optional) deprecated (since 2.6) The non-smoothed points (for polygons only)
             */
            static reducePoints(x: Float64Array, y: Float64Array, size: number, tolerancesArray: Float64Array|number[], nonSmoothedPoints?: geotoolkit.util.FastLookup): any;
            /**
             * Enum of clipping sides
             */
            static ClippingSide: any;
        }
        /**
         * Class with can handle some operation with rectangles and polygons and represent a geometry region
         */
        class Region {
            /**
             * Class with can handle some operation with rectangles and polygons and represent a geometry region
             * @param epsilon  (Optional) epsilon, accuracy of clipping
             */
            constructor(epsilon?: number);
            /**
             * Enum for defining clipping operation
             */
            static Operations: any;
            /**
             * Union shape
             * @param shape  (Required) shape
             * @param dest  (Required) destination region
             */
            union(shape: geotoolkit.util.Polygon|geotoolkit.util.Rect|geotoolkit.util.Region|geotoolkit.util.Polygon[]|geotoolkit.util.Rect[]|geotoolkit.util.Region[], dest: geotoolkit.util.Region): geotoolkit.util.Polygon[];
            /**
             * Intersect shape
             * @param shape  (Required) shape
             * @param dest  (Required) destination region
             */
            intersect(shape: geotoolkit.util.Polygon|geotoolkit.util.Rect|geotoolkit.util.Region|geotoolkit.util.Polygon[]|geotoolkit.util.Rect[]|geotoolkit.util.Region[], dest: geotoolkit.util.Region): geotoolkit.util.Polygon[];
            /**
             * Check if region contains shape
             * @param shape  (Required) shape
             */
            contains(shape: geotoolkit.util.Polygon|geotoolkit.util.Rect|geotoolkit.util.Region): boolean;
            /**
             * Check if region intersects shape
             * @param shape  (Required) shape
             */
            intersects(shape: geotoolkit.util.Polygon|geotoolkit.util.Rect|geotoolkit.util.Region): boolean;
            /**
             * Subtract polygon
             * @param shape  (Required) shape
             * @param dest  (Required) destination region
             */
            subtract(shape: geotoolkit.util.Polygon|geotoolkit.util.Rect|geotoolkit.util.Region|geotoolkit.util.Polygon[]|geotoolkit.util.Rect[]|geotoolkit.util.Region[], dest: geotoolkit.util.Region): geotoolkit.util.Polygon[];
            /**
             * Check if region contains point
             * @param point  (Required) point
             */
            containsPoint(point: geotoolkit.util.Point): boolean;
            /**
             * Check if region is empty
             */
            isEmpty(): boolean;
            /**
             * Transform region
             * @param transformation  (Required) transformation
             */
            transformRegion(transformation: geotoolkit.util.Transformation): this;
            /**
             * Return bounding rectangle
             */
            getBoundingBox(): geotoolkit.util.Rect;
            /**
             * Return polygon as any array of non-overlapping graphics paths.
             */
            getGraphicsPaths(): geotoolkit.renderer.GraphicsPath[];
            /**
             * Return polygon as graphics path
             */
            getGraphicsPath(): geotoolkit.renderer.GraphicsPath;
            /**
             * Returns polygons
             */
            getPolygons(): geotoolkit.util.Polygon[];
            /**
             * Return an array of non-overlapping rectangles that make up the region
             * @param eps  (Optional) epsilon, accuracy
             */
            getRectangles(eps?: number): geotoolkit.util.Rect[];
            /**
             * Clear region
             */
            clear(): this;
        }
        /**
         * Defines helper methods to work with line style
         */
        class LineStyleUtil {
            /**
             * Defines helper methods to work with line style
             */
            constructor();
            /**
             * Returns line width in dest units
             * @param lineStyle  (Required) the line style
             * @param destUnit  (Required) dest unit
             */
            static getLineWidth(lineStyle: geotoolkit.attributes.LineStyle, destUnit: geotoolkit.util.Unit): number;
        }
        /**
         * Enum of anchor types
         */
        interface AnchorType {
            /**
             * None
             */
            None: number;
            /**
             * Top Left
             */
            LeftTop: number;
            /**
             * Left Bottom
             */
            LeftBottom: number;
            /**
             * Right Top
             */
            RightTop: number;
            /**
             * Right Bottom
             */
            RightBottom: number;
            /**
             * Center
             */
            Center: number;
            /**
             * Left Center
             */
            LeftCenter: number;
            /**
             * Bottom Center
             */
            BottomCenter: number;
            /**
             * Right Center
             */
            RightCenter: number;
            /**
             * Top Center
             */
            TopCenter: number;
        }
        /**
         * GeometryOreration. Specifies a type of operation to be applied for clipping
         */
        interface GeometryOperation {
            /**
             * Replaces current area with new one
             */
            Replace: string;
            /**
             * Intersects current area with new one
             */
            Intersect: string;
        }
        /**
         * Enum of orientations
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
        module stream {
            /**
             * A data stream, typical implementation include FileStream or MemoryStream.<br>
             * This class offers 'random' access to the underlying data without requiring to load the whole data in memory.
             */
            class AbstractStream {
                /**
                 * A data stream, typical implementation include FileStream or MemoryStream.<br>
                 * This class offers 'random' access to the underlying data without requiring to load the whole data in memory.
                 */
                constructor();
                /**
                 * Read a chunk of data and calls the callback when it's done.
                 * @param offset  (Required) The position to start reading from
                 * @param length  (Required) The amount of bytes to read
                 * @param callback  (Required) The callback that will be called with the result
                 */
                readChunk(offset: number, length: number, callback: Function): this;
                /**
                 * Returns the size of the underlying data
                 */
                getSize(): number;
                /**
                 * Returns the stride of this stream
                 */
                getStride(): number;
                /**
                 * Disposes this stream, releasing all the resources used.
                 */
                dispose(): this;
            }
            /**
             * A stream implementation using a browser {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer} as backing store.<br>
             * (Use BrowserMemoryStream.stringToArrayBuffer to convert a string into an ArrayBuffer).<br>
             * This implementation provides compatibility with stream-based mechanism for dataset that are already in memory.<br>
             * <br>
             * Note that this class relies on the {@link https://w3c.github.io/FileAPI/ HTML5 File API}.<br>
             */
            class BrowserMemoryStream extends geotoolkit.util.stream.AbstractStream {
                /**
                 * A stream implementation using a browser {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer} as backing store.<br>
                 * (Use BrowserMemoryStream.stringToArrayBuffer to convert a string into an ArrayBuffer).<br>
                 * This implementation provides compatibility with stream-based mechanism for dataset that are already in memory.<br>
                 * <br>
                 * Note that this class relies on the {@link https://w3c.github.io/FileAPI/ HTML5 File API}.<br>
                 * @param options  (Required) The options
                 * @param options.buffer  (Required) The buffer
                 * @param options.stride  (Optional) The stride of this stream
                 */
                constructor(options: any | { buffer?: ArrayBuffer; stride?: number; } );
                /**
                 * Converts a String in an ArrayBuffer using String.charCodeAt (encoding is forced to utf16).<br>
                 * @param string  (Required) The string to convert
                 */
                static stringToArrayBuffer(string: string): ArrayBuffer;
            }
            /**
             * A stream implementation using a browser File object and a browser FileReader.<br>
             * This implementation relies on the {@link https://w3c.github.io/FileAPI/ HTML5 File API}.<br>
             * As of August 2016 it's still a working draft and may not be supported by old browsers.
             */
            class BrowserFileStream extends geotoolkit.util.stream.AbstractStream {
                /**
                 * A stream implementation using a browser File object and a browser FileReader.<br>
                 * This implementation relies on the {@link https://w3c.github.io/FileAPI/ HTML5 File API}.<br>
                 * As of August 2016 it's still a working draft and may not be supported by old browsers.
                 * @param options  (Required) The options
                 * @param options.file  (Required) The file to read from
                 * @param options.stride  (Optional) The stride of this stream
                 */
                constructor(options: any | { file?: File; stride?: number; } );
            }
            /**
             * Defines abstract representation of stream
             */
            class Stream {
                /**
                 * Defines abstract representation of stream
                 */
                constructor();
                /**
                 * Put value to stream to stream
                 * @param data  (Required) a data to save
                 */
                out(data: any): number;
                /**
                 * Close stream
                 */
                close(): any;
                /**
                 * Save stream
                 * @param name  (Required) file name/ string name
                 */
                save(name: string): any;
                /**
                 * Gets stream content
                 */
                getContent(): any;
            }
            /**
             * Defines representation of memory binary stream
             */
            class BinaryStream extends geotoolkit.util.stream.Stream {
                /**
                 * Defines representation of memory binary stream
                 */
                constructor();
                /**
                 * @param byte  (Required) to be saved
                 * @param offset  (Optional) offset
                 * @param length  (Optional) length
                 */
                out(byte: number|any[], offset?: number, length?: number): number;
                /**
                 */
                close(): any;
                /**
                 * Gets current position
                 */
                getPosition(): number;
                /**
                 * Set saving options
                 * @param options  (Required) options
                 * @param options.filename  (Required) full filename
                 * @param options.type  (Required) type
                 * @param options.popupBlockedMessage  (Optional) message to alert if popup-blocker blocked opening file
                 * @param options.save  (Optional) flag to save data directly to file or open dialog
                 */
                setSaveOptions(options: any | { filename?: string; type?: string; popupBlockedMessage?: string; save?: boolean; } ): any;
                /**
                 * @param name  (Optional) the name of the file to be created
                 * @param save  (Optional) flag to save the stream directly to file or open dialog
                 */
                save(name?: string, save?: boolean): any;
                /**
                 * Returns content
                 */
                getContent(): Uint8Array;
                /**
                 * Clears all date, stops any operations
                 */
                dispose(): any;
            }
            /**
             * Defines representation memory string stream
             */
            class StringStream extends geotoolkit.util.stream.Stream {
                /**
                 * Defines representation memory string stream
                 * @param features  (Optional) optional. A comma-separated list of items, no whitespaces, see https://www.w3schools.com/jsref/met_win_open.asp
                 */
                constructor(features?: string);
                /**
                 * Returns window features
                 */
                getWindowFeatures(): string;
                /**
                 * Sets window features
                 * @param features  (Required) a comma-separated list of items, no whitespaces, see https://www.w3schools.com/jsref/met_win_open.asp
                 */
                setWindowFeatures(features: string|any): this;
                /**
                 * write the data into the file
                 * @param str  (Required) string to be saved
                 */
                out(str: string): number;
                /**
                 * Set saving options
                 * @param options  (Required) options
                 * @param options.filename  (Required) full filename
                 * @param options.type  (Required) type
                 * @param options.onError  (Optional) error callback
                 * @param options.popupBlockedMessage  (Optional) message to alert if popup-blocker blocked opening file
                 * @param options.save  (Optional) flag to save data directly to file or open dialog
                 */
                setSaveOptions(options: any | { filename?: string; type?: string; onError?: Function; popupBlockedMessage?: string; save?: boolean; } ): this;
                /**
                 * Save stream
                 * @param name  (Optional) the name of the file to be created
                 * @param save  (Optional) flag to save the stream directly to file or open dialog
                 */
                save(name?: string, save?: boolean): any;
                /**
                 * Returns content
                 */
                getContent(): Uint8Array;
                /**
                 * Save content
                 * @param options  (Required) options
                 * @param options.filename  (Required) full filename
                 * @param options.type  (Required) type
                 * @param options.onError  (Optional) error callback
                 * @param options.popupBlockedMessage  (Optional) message to alert if popup-blocker blocked opening file
                 * @param options.save  (Optional) flag to save data directly to file or open dialog
                 * @param content  (Optional) content
                 */
                static save(options: any | { filename?: string; type?: string; onError?: Function; popupBlockedMessage?: string; save?: boolean; } , content?: string): any;
            }
            /**
             * A wrapper class offering line based reading on top of a regular {@link geotoolkit.util.stream.AbstractStream stream}.<br>
             * This implementation hides the complexity of the underlying stream to offer line based reading instead.<br>
             * To do so, this reader will (lazily) parse the stream to text and search for \n \r chars.<br>
             * Doing so, it will build a line based index to allow faster access to specific lines further on.<br>
             */
            class LineReader {
                /**
                 * A wrapper class offering line based reading on top of a regular {@link geotoolkit.util.stream.AbstractStream stream}.<br>
                 * This implementation hides the complexity of the underlying stream to offer line based reading instead.<br>
                 * To do so, this reader will (lazily) parse the stream to text and search for \n \r chars.<br>
                 * Doing so, it will build a line based index to allow faster access to specific lines further on.<br>
                 * @param options  (Optional) The options
                 * @param options.chunksize  (Optional) The amount of bytes to read at once. The default value is 1 megabyte
                 * @param options.stream  (Optional) The data stream to be wrapped by this reader
                 */
                constructor(options?: any | { chunksize?: number; stream?: geotoolkit.util.stream.AbstractStream; } );
                /**
                 * Reads the lines starting at the given line index up to the given count.<br>
                 * @param index  (Required) Starting line index
                 * @param count  (Required) Amount of lines to read
                 * @param callback  (Required) The function called with the result
                 */
                readLines(index: number, count: number, callback: geotoolkit.util.stream.LineReader.readLinesCallback): any;
                /**
                 * Search for the given regexp starting at the given line number.<br>
                 * @param regex  (Required) The regular expression to search for (as a string)
                 * @param index  (Required) Starting line index
                 * @param callback  (Required) The function called with the result
                 */
                find(regex: string, index: number, callback: geotoolkit.util.stream.LineReader.findCallback): any;
                /**
                 * Search for the sequence starting by the given regexp and ending by the other regexp.<br>
                 * The search starts at the given line number and ends (at worst) after maxcount lines have been read (if maxcount != -1).<br>
                 * <br>
                 * Note that reaching END-OF-STREAM without finding the searched regexp will not be considered as an error.<br>
                 * @param startRegex  (Optional) The start regular expression to search for (as a string)
                 * @param endRegex  (Optional) The end regular expression to search for (as a string)
                 * @param index  (Optional) Starting line index
                 * @param maxcount  (Optional) Maximum count of line that can be read. If the capture did not finish in that range, an error will be reported. -1 for no limit
                 * @param callback  (Optional) The function called with the result
                 */
                capture(startRegex?: string, endRegex?: string, index?: number, maxcount?: number, callback?: geotoolkit.util.stream.LineReader.captureCallback): any;
            }
            class TextStream extends geotoolkit.util.stream.Stream {
                /**
                 * @param options  (Optional) options options
                 * @param options.filename  (Optional) full filename
                 * @param options.type  (Optional) type
                 * @param options.popupBlockedMessage  (Optional) popupBlockedMessage popupBlockedMessage
                 * @param options.save  (Optional) save flag to save the stream directly to file or open dialog
                 */
                constructor(options?: any | { filename?: string; type?: string; popupBlockedMessage?: string; save?: boolean; } );
                /**
                 * @param data  (Required) data to be written
                 */
                out(data: string[]|string): number;
                /**
                 */
                close(): any;
                /**
                 * @param name  (Optional) the name of the file to be created
                 * @param save  (Optional) flag to save the stream directly to file or open dialog
                 */
                save(name?: string, save?: boolean): any;
                /**
                 * Returns content
                 */
                getContent(): string[]|string;
                /**
                 * Clears all data, stops all operation of TextStream
                 */
                dispose(): any;
            }
            module LineReader {
                /**
                 * Callback for readLines().
                 */
                type readLinesCallback = (err: any, index: number, result?: string[], eof?: boolean, progress?: number) => any;
                /**
                 * Callback for find().
                 */
                type findCallback = (err: any, index?: number) => any;
                /**
                 * Callback for capture().
                 */
                type captureCallback = (result: any | { error?: any; start?: number; end?: number; lines?: string[]; } ) => any;
            }
        }
        module LineSegment {
            /**
             * Defines types of intersection detectable by the line
             * Assume line segments are: p1----p2 and p3----p4
             */
            interface IntersectionType {
                /**
                 * Lie on the same line and overlapp1---p3-p2---p4
                 */
                Overlapping: string;
                /**
                 * Lie on the same line but don't overlapp1----p2 p3----p4
                 */
                Disjoint: string;
                /**
                 * Lie on parallel linesp1----p2  p3----p4
                 */
                Parallel: string;
                /**
                 * Lie on different lines and intersect
                 */
                Intersecting: string;
                /**
                 * Lie on different lines but don't intersect
                 */
                NonIntersecting: string;
            }
        }
        module EventDispatcher {
            /**
             * EventDispatcher Events
             */
            interface Events {
                /**
                 * This Event is fired when the property was changed
                 */
                PropertyChanged: string;
            }
        }
        module ColorProvider {
            /**
             * Enum of known Named Colors
             */
            interface KnownColors {
                /**
                 * NaN
                 */
                NaN: string;
                /**
                 * NegativeInfinity
                 */
                NegativeInfinity: string;
                /**
                 * PositiveInfinity
                 */
                PositiveInfinity: string;
            }
            /**
             * Enum of known Scales
             */
            interface KnownScales {
                /**
                 * Autumn
                 */
                Autumn: string;
                /**
                 * Blue to Red
                 */
                BlueToRed: string;
                /**
                 * Cool
                 */
                Cool: string;
                /**
                 * Copper
                 */
                Copper: string;
                /**
                 * Dark body
                 */
                DarkBody: string;
                /**
                 * Flag
                 */
                Flag: string;
                /**
                 * Gray
                 */
                Gray: string;
                /**
                 * Hot
                 */
                Hot: string;
                /**
                 * HSV
                 */
                HSV: string;
                /**
                 * Orange
                 */
                Orange: string;
                /**
                 * Rainbow
                 */
                Rainbow: string;
                /**
                 * Spring
                 */
                Spring: string;
                /**
                 * Summer
                 */
                Summer: string;
                /**
                 * Winter
                 */
                Winter: string;
                /**
                 * Bone
                 */
                Bone: string;
                /**
                 * Binary
                 */
                Binary: string;
                /**
                 * Pink
                 */
                Pink: string;
                /**
                 * Parula
                 */
                Parula: string;
            }
            /**
             * Style Events enumerator
             */
            interface Events {
                /**
                 * Invalidate
                 */
                Invalidate: string;
            }
        }
        module DefaultColorProvider {
            /**
             * Style Events enumerator
             */
            type Events = any;

        }
        module DefaultLogColorProvider {
            /**
             * Enum of display style
             */
            interface DisplayStyle {
                /**
                 * linear
                 */
                Linear: string;
                /**
                 * logarithmic
                 */
                Logarithmic: string;
            }
        }
        module LogColorProvider {
            /**
             * Enum of display style
             */
            interface DisplayStyle {
                /**
                 * linear
                 */
                Linear: string;
                /**
                 * logarithmic
                 */
                Logarithmic: string;
            }
        }
        module RangeColorProvider {
            /**
             * Enum of display style
             */
            interface DisplayStyle {
                /**
                 * linear
                 */
                Linear: string;
                /**
                 * block
                 */
                Block: string;
            }
        }
        module Collection {
            /**
             * Collection events enumerator
             */
            interface Events {
                /**
                 * Add
                 */
                Add: string;
                /**
                 * Remove
                 */
                Remove: string;
                /**
                 * Change
                 */
                Change: string;
                /**
                 * Clear
                 */
                Clear: string;
            }
        }
        module PolylineOptimizer {
            /**
             * Enum of Polygon data types
             */
            interface ResultType {
                /**
                 * The resulting tolerances (squared)
                 */
                Tolerances: number;
                /**
                 * The resulting x-coordinates.
                 */
                XCoordinates: number;
                /**
                 * The resulting y-coordinates
                 */
                YCoordinates: number;
                /**
                 * The number of points in the result set
                 */
                Cardinality: number;
                /**
                 * Association of input and output indices
                 */
                IndexAssociations: number;
            }
            /**
             * Enum of clipping sides
             */
            interface ClippingSide {
                /**
                 * The top side
                 */
                Top: number;
                /**
                 * The right side
                 */
                Right: number;
                /**
                 * The bottom side
                 */
                Bottom: number;
                /**
                 * The left side
                 */
                Left: number;
            }
        }
        module Region {
            /**
             * Enum for defining clipping operation
             */
            interface Operations {
                /**
                 * Intersect
                 */
                Intersect: number;
                /**
                 * Subtract
                 */
                Subtract: number;
                /**
                 * Union
                 */
                Union: number;
            }
        }
    }
    module dom {
        /**
         * create a canvas element,
         * supports for HTMLCanvasElement and node-canvas.
         * @param width  (Required) the canvas width in pixels
         * @param height  (Required) the canvas height in pixels
         * @param inDevicePixel  (Optional) if set to true width and height will be converted to canvas pixels.
         */
        function createCanvasElement(width: number, height: number, inDevicePixel?: boolean): HTMLCanvasElement|any;
    }
    module renderer {
        /**
         * ClipOperation. Specifies a type of operation to be applied for clipping using {@link geotoolkit.util.GeometryOperation}
         */
        var ClipOperation: any;
        /**
         * Create a new Pattern from a pattern and a specific foreground color
         * @param pattern  (Required) image pattern
         * @param foregroundColor  (Required) foreground color to be set
         * @param rawSize  (Required) flag for raw size
         */
        function createPattern(pattern: geotoolkit.attributes.ImagePattern, foregroundColor: string, rawSize: boolean): string;
        /**
         * Represent interface for an off-screen image representation
         */
        class Pixmap extends geotoolkit.attributes.Raster {
            /**
             * Represent interface for an off-screen image representation
             */
            constructor();
            /**
             * Return a one-dimensional array containing the data in the
             * RGBA order, with integer values between 0 and 255 (included).
             */
            getData(): number[];
        }
        /**
         * Graphics
         */
        class Graphics {
            /**
             * Graphics
             */
            constructor();
            /**
             * Sets clipping
             * @param geometry  (Required) geometry to clip
             * @param operation  (Required) operation to be applied for a new clipping
             * @param isModel  (Required) model coordinates flag
             */
            setClip(geometry: geotoolkit.util.Rect|geotoolkit.renderer.GraphicsPath|geotoolkit.util.Region, operation: geotoolkit.renderer.ClipOperation, isModel: boolean): any;
            /**
             * Draw and fill rectangle with the current style. If fill style is null
             * then it draws outline only.
             * @param x  (Required) X coordinate of the start point
             * @param y  (Optional) Y coordinate of the start point
             * @param width  (Optional) Width of rectangle
             * @param height  (Optional) Height of rectangle
             */
            drawRectangle(x: geotoolkit.util.Rect|number, y?: number, width?: number, height?: number): any;
            /**
             * Draw line
             * @param x1  (Required) x-position of start point
             * @param y1  (Required) y-position of start point
             * @param x2  (Required) x-position of end point
             * @param y2  (Required) y-position of end point
             */
            drawLine(x1: number, y1: number, x2: number, y2: number): any;
            /**
             * Draw polyline
             * @param x  (Required) array of x coordinates of points
             * @param y  (Required) array of y coordinates of points
             * @param start  (Required) index of the first point in the array
             * @param end  (Required) index of the last point in the array
             * @param multiDirection  (Optional) false for one direction array
             */
            drawPolyline(x: any[], y: any[], start: number, end: number, multiDirection?: boolean): any;
            /**
             * Draw and fill polygon. If fill style is null
             * then it draws outline only.
             * @param x  (Required) array of x coordinates of points
             * @param array  (Required) of y coordinates of points
             * @param start  (Required) index of the first point in the array
             * @param end  (Required) index of the last point in the array
             */
            drawPolygon(x: any[], array: any[], start: number, end: number): any;
            /**
             * Draw and fill ellipse
             * @param x  (Required) x-coordinate of the upper-left corner of the bounding rectangle that defines the ellipse
             * @param y  (Required) y--coordinate of the upper-left corner of the bounding rectangle that defines the ellipse
             * @param width  (Required) width of the bounding rectangle that defines the ellipse.
             * @param height  (Required) height of the bounding rectangle that defines the ellipse.
             */
            drawEllipse(x: number, y: number, width: number, height: number): any;
            /**
             * Draws an arc clockwise from startAngle to endAngle.
             * If endAngle exceeds startAngle by Math.PI * 2 or more then ellipse is drawn.
             * If fillStyle is not null, will fill the arc area using a direct line
             * to close the path between start and end of arc.
             * By default this function renders a "pie" shape, using given fill and stroke style. In order to draw a real arc,
             * set suppressLineToCenter=true.
             * @param x  (Required) x-coordinate of the upper-left corner of the rectangle that bounds the ellipse.
             * @param y  (Required) y-coordinate of the upper-left corner of the rectangle that bounds the ellipse.
             * @param width  (Required) width of the rectangle that bounds the ellipse.
             * @param height  (Required) height of the rectangle that bounds the ellipse.
             * @param startAngle  (Required) angle in radians measured clockwise from positive x-axis to the starting point of the arc.
             * @param endAngle  (Required) Angle in radians measured clockwise from positive x-axis to the ending point of the arc.
             * @param sweepAngle  (Optional) Defines the sweep of the arc in radians. This parameter used if and only if
startAngle == endAngle
             * @param suppressLineToCenter  (Optional) Does not draw lines from the edges of arc to center point
             */
            drawArc(x: number, y: number, width: number, height: number, startAngle: number, endAngle: number, sweepAngle?: number, suppressLineToCenter?: boolean): any;
            /**
             * Draws a portion of an annulus clockwise ranging from startAngle to endAngle.
             * If endAngle exceeds startAngle by Math.PI * 2 or more then annulus is drawn.
             * Will fill in between the two arcs if fillStyle exists.
             * @param x  (Required) x-coordinate of the center of the arc.
             * @param y  (Required) y-coordinate of the center of the arc.
             * @param innerRadius  (Required) inner radius of the arc
             * @param outerRadius  (Required) outer radius of the arc
             * @param startAngle  (Required) angle in radians measured from x-axis to the starting point of the arc
(clockwise means positive angle; counterclockwise - otherwise).
             * @param endAngle  (Required) Angle in radians measured from x-axis to ending point of the arc.
             * @param sweepAngle  (Optional) Defines the sweep of the arc
             */
            drawAnnulusArc(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, sweepAngle?: number): geotoolkit.renderer.RenderingContext;
            /**
             * Draw text
             * @param x  (Required) x anchor position
             * @param y  (Required) y anchor position
             * @param text  (Required) text to draw
             */
            drawText(x: number, y: number, text: string): any;
            /**
             * Draw image
             * @param image  (Required) image to be rendered
             * @param srcX  (Required) source x position
             * @param srcY  (Required) source y position
             * @param srcW  (Required) source width
             * @param srcH  (Required) source height
             * @param dstX  (Required) destination x position
             * @param dstY  (Required) destination y position
             * @param dstW  (Required) destination width
             * @param dstH  (Required) destination height
             */
            drawImage(image: HTMLImageElement|geotoolkit.renderer.Surface, srcX: number, srcY: number, srcW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): any;
            /**
             * Set fill style
             * @param style  (Required) fill style
             * @param area  (Optional) area
             */
            setFillStyle(style: geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle, area?: geotoolkit.util.Rect): any;
            /**
             * Set fill pattern
             * @param pattern  (Required) pattern to fill the area
             */
            setFillPattern(pattern: geotoolkit.attributes.ImagePattern): any;
            /**
             * Set line style
             * @param style  (Required) a line style
             * @param area  (Optional) area to apply fill property of line style
             */
            setLineStyle(style: geotoolkit.attributes.LineStyle, area?: geotoolkit.util.Rect): any;
            /**
             * Set text style
             * @param textStyle  (Required) style
             */
            setTextStyle(textStyle: geotoolkit.attributes.TextStyle): any;
            /**
             * Begin path
             */
            beginPath(): any;
            /**
             * Move current position to x,y. Create a new subpath with the specified
             * point as its first (and only) point.
             * @param x  (Required) x position
             * @param y  (Required) y position
             */
            moveTo(x: number, y: number): any;
            /**
             * Draw line from the current position to the specified position
             * @param x  (Required) x position
             * @param y  (Required) y position
             */
            lineTo(x: number, y: number): any;
            /**
             * Draws a cubic B\u00e9zier curve from the current point to the point (x,
             * y), with control points (cp1x, cp1y) and (cp2x, cp2y).
             * @param cp1x  (Required) the x coordinate of the first control point
             * @param cp1y  (Required) the y coordinate of the first control point
             * @param cp2x  (Required) the x coordinate of the second control point
             * @param cp2y  (Required) the y coordinate of the second control point
             * @param x  (Required) the x coordinate of the end point
             * @param y  (Required) the y coordinate of the end point
             */
            bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): any;
            /**
             * Calculate the strokes of all the subpaths of the current path
             */
            stroke(): any;
            /**
             * Draws an arc to the target point as part of a path.
             * @param x1  (Required) coordinate of destination
             * @param y1  (Required) coordinate of destination
             * @param x2  (Required) coordinate
             * @param y2  (Required) coordinate
             * @param radius  (Required) radius of arc
             */
            arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): any;
            /**
             * Do nothing if the context has no subpaths. Otherwise, it marks the last
             * subpath as closed, create a new subpath whose first point is the same as
             * the previous subpath's first point, and finally add this new subpath to
             * the path.
             */
            closePath(): any;
            /**
             * Fill all the subpaths of the current path, using fillStyle, and using the
             * non-zero winding number rule. Open subpaths will be implicitly closed
             * when being filled (without affecting the actual subpaths).
             */
            fillPath(): any;
            /**
             * Apply geometry on the rendering context. The method stroke must be called to draw path outlines or fillPath to fill the geometry
             * @param path  (Required) path to draw
             */
            drawPath(path: geotoolkit.renderer.GraphicsPath): any;
        }
        /**
         * Provides a container for connected lines, curves.
         */
        class GraphicsPath {
            /**
             * Provides a container for connected lines, curves.
             */
            constructor();
            /**
             */
            static PointType: any;
            /**
             * Copy constructor
             * @param src  (Required) instance to create a copy from
             */
            protected copyConstructor(src: geotoolkit.renderer.GraphicsPath): any;
            /**
             * Copy path from source
             * @param src  (Required) source path to copy from
             */
            copy(src: geotoolkit.renderer.GraphicsPath): this;
            /**
             * Create a deep copy
             */
            clone(): geotoolkit.renderer.GraphicsPath;
            /**
             * Add command to move the current position.
             * @param x  (Required) The x-coordinate of the destination point
             * @param y  (Required) The y-coordinate of the destination point
             */
            moveTo(x: number, y: number): this;
            /**
             * Close path
             */
            close(): this;
            /**
             * Add command to draw a line from the current position to specified point
             * @param x  (Required) The x-coordinate of the destination point
             * @param y  (Required) The y-coordinate of the destination point
             */
            lineTo(x: number, y: number): this;
            /**
             * Add command to draw an arc from the current position to specified point
             * @param x1  (Required) x-coordinate of control point
             * @param y1  (Required) y-coordinate of control point
             * @param x2  (Required) The x-coordinate of the destination point
             * @param y2  (Required) The y-coordinate of the destination point
             * @param radius  (Required) The radius of arc
             */
            arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
            /**
             * Draws a cubic Bezier curve from the current point to the point (x, y),
             * with control points (cp1x, cp1y) and (cp2x, cp2y).
             * @param cp1x  (Required) the x coordinate of the first control point
             * @param cp1y  (Required) the y coordinate of the first control point
             * @param cp2x  (Required) the x coordinate of the second control point
             * @param cp2y  (Required) the y coordinate of the second control point
             * @param x  (Required) the x coordinate of the end point
             * @param y  (Required) the y coordinate of the end point
             */
            bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): this;
            /**
             * Return bounds
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Remove all of this path's points.
             */
            clear(): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Returns true if there are no elements in this path
             */
            isEmpty(): boolean;
            /**
             * Returns the length of the current path.
             */
            getLength(): number;
            /**
             * Returns an array of tags.
             */
            getTags(): any[];
            /**
             * Returns an array of x coordinates.
             */
            getX(): any[];
            /**
             * Returns an array of y coordinates.
             */
            getY(): any[];
            /**
             * Returns a start index in the x and y for the current command.
             * @param i  (Required) index of the element
             */
            getIndex(i: number): number;
            /**
             * Returns the element at the given index in the painter path.
             * @param i  (Required) index of the element
             */
            getElement(i: number): any;
            /**
             * Returns the number of elements
             */
            getElementCount(): number;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.x  (Optional) x
             * @param properties.y  (Optional) y
             * @param properties.index  (Optional) index
             * @param properties.tags  (Optional) tags
             * @param properties.bounds  (Optional) bounds
             */
            setProperties(properties: any | { x?: number[]; y?: number[]; index?: number[]; tags?: geotoolkit.renderer.GraphicsPath.PointType[]; bounds?: geotoolkit.util.Rect; } ): this;
            /**
             * Returns the path's string representation
             */
            toString(): string;
            /**
             * Makes the intersection of this path's fill area
             * and rectangle. This methid is experemental and work for
             * bounds only.
             * @param rect  (Required) the specified rectangle
             */
            intersect(rect: geotoolkit.util.Rect): this;
            /**
             * Transform path using the current transformation
             * @param transformation  (Required) the specified transformation
             */
            transform(transformation: geotoolkit.util.Transformation): this;
        }
        /**
         * Defines text metrics
         */
        class TextMetrics {
            /**
             * Defines text metrics
             */
            constructor();
            /**
             * setMetrics
             * @param width  (Required) width
             * @param height  (Required) height
             * @param fontMetrics  (Optional) font metrics
             */
            setMetrics(width: number, height: number, fontMetrics?: any): this;
            /**
             * Return font metrics
             */
            getFontMetrics(): {fontMetrics:{ascent:number;descent:number;height:number}}|any;
            /**
             * return width
             */
            getWidth(): number;
            /**
             * return height
             */
            getHeight(): number;
            /**
             * Return clone object.
             */
            clone(): geotoolkit.renderer.TextMetrics;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Convert current instance TextMetrics to geotoolkit.util.Rect
             */
            toRect(): geotoolkit.util.Rect;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.width  (Optional) set the width
             * @param properties.height  (Optional) set the height
             */
            setProperties(properties: any | { width?: number; height?: number; } ): this;
            /**
             * Enum of text measure strategies
             */
            static TextMetricsMeasureStrategy: any;
            /**
             * Parse font weight, size and family based on font string
             * follow w3 recommendation see {@link http://www.w3.org/TR/css3-fonts/}
             * if the font cannot be parsed it will return default font : 12px arial.
             * @param font  (Required) current font for the text
             */
            static parseFont(font: string|geotoolkit.attributes.TextStyle): {obj:{fontweight:string;fontsize:string;fontfamily:string;fontlineheight:string;fontstyle:string}}|any;
            /**
             * Sets the maximum cache limit
             * @param val  (Required) number of different font metrics that can be implemented
             */
            static setCacheLimit(val: number): any;
            /**
             * clears the current cache
             */
            static clearCache(): any;
            /**
             * Measure text size in device coordinates
             * @param text  (Required) current text string
             * @param textStyle  (Optional) the text style
             * @param useFontMetrics  (Optional) flag to calculate font metrics
             */
            static measureText(text: string, textStyle?: geotoolkit.attributes.TextStyle, useFontMetrics?: boolean): geotoolkit.renderer.TextMetrics;
            /**
             * Measure text size in device coordinates
             * @param text  (Required) current text string
             * @param textStyle  (Optional) the text style
             */
            static MeasureText(text: string, textStyle?: geotoolkit.attributes.TextStyle): geotoolkit.renderer.TextMetrics;
            /**
             * Sets the strategy to use when measuring text size
             * This function sets the 'MeasureText' function according ot the strategy
             * @param val  (Required) strategy to measure text
             */
            static setMeasureTextStrategy(val: geotoolkit.renderer.TextMetrics.TextMetricsMeasureStrategy): any;
            /**
             * Returns the current text measure strategy
             */
            static getMeasureTextStrategy(): geotoolkit.renderer.TextMetrics.TextMetricsMeasureStrategy;
        }
        /**
         * Represents context to traverse nodes during picking and rendering
         */
        class RenderingContext extends geotoolkit.renderer.Graphics {
            /**
             * Represents context to traverse nodes during picking and rendering
             * @param deviceUnit  (Required) represent the {string} name, {string} symbol or {geotoolkit.util.AbstractUnit} unit to be used as unit for device
             * @param filters  (Optional) an array of filters
             */
            constructor(deviceUnit: string|geotoolkit.util.AbstractUnit, filters?: geotoolkit.renderer.IFilter[]);
            /**
             * Add filter to be applied
             * @param filter  (Required) filter to add
             */
            addFilter(filter: geotoolkit.renderer.IFilter): this;
            /**
             * Remove an instance of the filter
             * @param filter  (Required) filter to remove
             */
            removeFilter(filter: geotoolkit.renderer.IFilter): this;
            /**
             * Gets an array of filters
             */
            protected getFilters(): geotoolkit.renderer.IFilter[]|any;
            /**
             * Sets an array of filters
             * @param filters  (Required) filters
             */
            protected setFilters(filters: geotoolkit.renderer.IFilter[]|any): this;
            /**
             * Gets the current transformation, which defines transformation from model
             * coordinates to device coordinates
             */
            getTransformation(): geotoolkit.util.Transformation;
            /**
             * Sets the current transformation, which defines transformation from model
             * coordinates to device coordinates
             * @param transformation  (Required) transformation to be set
             */
            setTransformation(transformation: geotoolkit.util.Transformation): any;
            /**
             * Gets the current transformation, which defines transformation from device
             * coordinates to model coordinates.
             * Note, that inverse transformation can be calculated based on
             * getTransformation() call (and vice versa).
             */
            getInverseTransformation(): geotoolkit.util.Transformation;
            /**
             * Gets a transformation from model coordinates to parent. For node it means
             * node contents of rendered node to parent node.
             */
            getLocalTransformation(): geotoolkit.util.Transformation;
            /**
             * Creates rendering state
             */
            createRenderingState(): geotoolkit.renderer.RenderingState;
            /**
             * Creates a new surface
             * @param width  (Required) width of surface
             * @param height  (Required) height of surface
             */
            createSurface(width: number, height: number): geotoolkit.renderer.Surface;
            /**
             * Creates a new context with concatenated transformation
             * @param tr  (Required) a transformation to concatenate
             */
            pushTransformation(tr: geotoolkit.util.Transformation): geotoolkit.renderer.RenderingContext;
            /**
             * Gets rectangular area (defined in device space) to invalidate
             */
            getDeviceRect(): geotoolkit.util.Rect;
            /**
             * Gets "global" view port (defined in device space).
             * The implementation calls for "this.getDeviceRect()"
             */
            getGlobalViewPort(): geotoolkit.util.Rect;
            /**
             * Sets "global" view port (defined in device space)
             * The implementation is empty
             * @param globalViewPort  (Required) "global" view port
             */
            setGlobalViewPort(globalViewPort: geotoolkit.util.Rect): this;
            /**
             * Gets rectangular area (defined in model space) to invalidate.
             * Note, that having called getTransformation() (or getInverseTransformation())
             * model rect can be calculated based on device rect (and vice versa).
             */
            getModelRect(): geotoolkit.util.Rect;
            /**
             * Sets device rectangle area of interest
             * @param rect  (Required) 
             */
            setDeviceRect(rect: geotoolkit.util.Rect): any;
            /**
             * Sets model rectangle
             * @param rect  (Required) model area of interest
             */
            setModelRect(rect: geotoolkit.util.Rect): any;
            /**
             * Return true if context is doing picking now
             */
            isPicking(): boolean;
            /**
             * Return text metrics
             * @param text  (Required) text
             * @param textStyle  (Optional) the text style
             */
            measureText(text: string, textStyle?: geotoolkit.attributes.TextStyle): any;
            /**
             * Returns line dimension at the current context
             * @param lineStyle  (Required) the line style
             */
            measureLine(lineStyle: geotoolkit.attributes.LineStyle): number;
            /**
             * Save the current state
             */
            save(): any;
            /**
             * Restore current state
             */
            restore(): any;
            /**
             * Filter node
             * @param node  (Required) node to be rendered
             */
            filter(node: geotoolkit.scene.Node): boolean;
            /**
             * Specify node to be rendered
             * @param node  (Required) node to be rendered
             */
            setCurrentNode(node: geotoolkit.scene.Node): any;
            /**
             * Prepare rendering context. The default implementation blocks notifications from nodes and
             * styles. if you call beginRendering then call the endRendering.
             */
            beginRendering(): any;
            /**
             * End usage ot the rendering context
             */
            endRendering(): any;
        }
        /**
         * Represents context to traverse nodes during picking and rendering
         */
        class DocumentRenderingContext extends geotoolkit.renderer.RenderingContext {
            /**
             * Represents context to traverse nodes during picking and rendering
             */
            constructor();
            /**
             * Sets the pages count
             * @param xPageCount  (Required) page count along x
             * @param yPageCount  (Required) page count along y
             */
            setPagesCount(xPageCount: number, yPageCount: number): any;
            /**
             * Sets the page info settings
             * @param pageX  (Required) index of the page by x
             * @param pageY  (Required) index of the page by y
             */
            setPageInfoSettings(pageX: number, pageY: number): any;
            /**
             * Sets document settings
             * @param documentSettings  (Required) document settings
             */
            setDocumentSettings(documentSettings: any): this;
            /**
             * Return document settings
             */
            getDocumentSettings(): any;
        }
        /**
         * Define buffer of commands
         */
        class RenderingState extends geotoolkit.renderer.Graphics {
            /**
             * Define buffer of commands
             */
            constructor();
            /**
             * Clear buffer
             */
            clear(): any;
            /**
             * Draw buffer on context.
             * @param context  (Required) 
             */
            draw(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Check if the state is valid for the current context
             * @param context  (Required) context to check
             */
            isValid(context: geotoolkit.renderer.RenderingContext): boolean;
        }
        /**
         * Define interface for a raster surface. This surface can be rendered to
         * context
         */
        class Surface {
            /**
             * Define interface for a raster surface. This surface can be rendered to
             * context
             */
            constructor();
            /**
             * Begin paint
             * @param tr  (Required) transformation
             * @param offset  (Required) The offset of the surface relative to device.
             * @param rect  (Optional) The rectangle area to be cleared
             * @param clearArea  (Optional) clear rendering area
             */
            beginPaint(tr: geotoolkit.util.Transformation, offset: geotoolkit.util.Point, rect?: geotoolkit.util.Rect, clearArea?: boolean): geotoolkit.renderer.RenderingContext;
            /**
             * End paint
             */
            endPaint(): any;
            /**
             * Render a surface at specified position of the target device. This method ignores transformation,
             * which is set on context.
             * @param context  (Required) context to render surface
             * @param x  (Required) the x coordinate of the upper-left corner of the destination
           rectangle
             * @param y  (Required) the y coordinate of the upper-left corner of the destination
           rectangle
             * @param dstW  (Optional) device width
             * @param dstH  (Optional) device height
             * @param xImg  (Optional) xPosition of the image to start rendering
             * @param yImg  (Optional) yPosition of the image to start rendering
             * @param imgW  (Optional) width of the image to draw
             * @param imgH  (Optional) height of the image to draw
             */
            render(context: geotoolkit.renderer.RenderingContext, x: number, y: number, dstW?: number, dstH?: number, xImg?: number, yImg?: number, imgW?: number, imgH?: number): any;
            /**
             * Return width of the surface
             */
            getWidth(): number;
            /**
             * Return height of the surface
             */
            getHeight(): number;
            /**
             * Draw image to surface
             * @param image  (Required) image to draw
             * @param dx  (Required) the x coordinate of the upper-left corner of the destination
           rectangle
             * @param dy  (Required) the y coordinate of the upper-left corner of the destination
           rectangle
             */
            drawImage(image: geotoolkit.scene.shapes.Image, dx: number, dy: number): any;
            /**
             * Clear surface
             */
            clear(): any;
            /**
             * Release surface
             */
            release(): any;
            /**
             * Create pixmap object with the specified dimensions
             * @param width  (Required) width of the image data
             * @param height  (Required) height of the image data
             */
            createPixmap(width: number, height: number): geotoolkit.renderer.Pixmap;
            /**
             * Get pixmap object representing the underlying pixel data for the area of the surface
             * denoted by the rectangle which starts at (x, y) and has width and height.
             * @param x  (Required) The x coordinate of the upper left corner of the rectangle from which the Pixmap will be extracted.
             * @param y  (Required) The y coordinate of the upper left corner of the rectangle from which the Pixmap will be extracted.
             * @param width  (Required) width of the image data
             * @param height  (Required) height of the image data
             */
            getPixmap(x: number, y: number, width: number, height: number): geotoolkit.renderer.Pixmap;
            /**
             * Renders data from the given Pixmap object onto the surface. If a dirty rectangle is provided, only the
             * pixels from that rectangle are rendered.
             * @param pixmap  (Required) pixmap, which contains pixels to be rendered
             * @param srcX  (Required) horizontal position (x-coordinate) of the upper-left corner of the pixmap data rectangle in the target surface.
             * @param srcY  (Required) vertical position (y-coordinate) of the upper-left corner of the pixmap data rectangle in the target surface
             * @param dstX  (Optional) horizontal position (x-coordinate) where to place the image on the surface. Defaults to the top left
of the whole pixmap.
             * @param dstY  (Optional) vertical position (y-coordinate) where to place the image on the surface. Defaults to the top left of the
whole image data.
             * @param dstWidth  (Optional) width of the rectangle to be rendered, in the origin image data. Defaults to the width of the image data.
             * @param dstHeight  (Optional) width of the rectangle to be rendered, in the origin image data. Defaults to the width of the image data.
             */
            putPixmap(pixmap: geotoolkit.renderer.Pixmap, srcX: number, srcY: number, dstX?: number, dstY?: number, dstWidth?: number, dstHeight?: number): any;
            /**
             * Check if surface is valid. If it was created for different pixel scale it is marked as invalid
             */
            isValid(): boolean;
        }
        /**
         * ClipOperation. Specifies a type of operation to be applied for clipping using {@link geotoolkit.util.GeometryOperation}
         */
        type ClipOperation = any;

        /**
         * Define an interface that controls whether or not to render a particular nodes
         */
        interface IFilter {
            /**
             * Checks if the node should be drawn.
             * <p>
             * All children nodes will be given
             * the chance to render or not to render.
             * </p>
             * @param node  (Required) node to check
             * @param context  (Optional) rendering context
             */
            filter(node: geotoolkit.scene.Node, context?: geotoolkit.renderer.RenderingContext): boolean;
            /**
             * Begin filtering. If a filter should be applied to children nodes it needs to
             * be added to context and removed in the method end
             * @param context  (Optional) rendering context
             */
            begin(context?: geotoolkit.renderer.RenderingContext): this;
            /**
             * End filtering. If a filter should be applied to children nodes it needs to
             * be added to context and removed in the method end
             * @param context  (Optional) rendering context
             */
            end(context?: geotoolkit.renderer.RenderingContext): this;
        }
        module GraphicsPath {
            interface PointType {
            }
        }
        module TextMetrics {
            /**
             * Enum of text measure strategies
             */
            interface TextMetricsMeasureStrategy {
                /**
                 * LimitedCache
                 */
                LimitedCache: number;
                /**
                 * SymbolCache
                 */
                SymbolCache: number;
                /**
                 * CanvasAndLimited
                 */
                CanvasAndLimited: number;
                /**
                 * CanvasMRULimited
                 */
                CanvasMRULimited: number;
                /**
                 * NodeCanvas
                 */
                NodeCanvas: number;
            }
        }
    }
    module layout {
        /**
         * Define resize mode of the layoutable.
         */
        var SizeConstraint: any;
        /**
         * Enum of annotation locations
         * Supported values are:
         * North, South, East, West,
         * NorthWest, NorthEast, SouthWest, SouthEast,
         * Center, None
         */
        var AnnotationLocation: any;
        /**
         * Layout Events enumerator
         */
        var Events: any;
        /**
         * Defines properties for node layout.
         */
        class LayoutStyle extends geotoolkit.attributes.SpaceStyle {
            /**
             * Defines properties for node layout.
             * @param layoutStyle  (Optional) object which contains the following fields
             * @param layoutStyle.left  (Optional) left position
             * @param layoutStyle.right  (Optional) right position
             * @param layoutStyle.width  (Optional) width
             * @param layoutStyle.height  (Optional) height
             * @param layoutStyle.top  (Optional) top position
             * @param layoutStyle.bottom  (Optional) bottom position
             * @param layoutStyle.constraint  (Optional) layout constrains
             * @param layoutStyle.min-height  (Optional) minimum height
             * @param layoutStyle.max-height  (Optional) maximum height
             * @param layoutStyle.min-width  (Optional) minimum width
             * @param layoutStyle.max-width  (Optional) maximum width
             */
            constructor(layoutStyle?: any | { left?: number|string; right?: number|string; width?: number|string; height?: number|string; top?: number|string; bottom?: number|string; constraint?: geotoolkit.layout.SizeConstraint; "min-height"?: number|string; "max-height"?: number|string; "min-width"?: number|string; "max-width"?: number|string; } );
            /**
             * return width position
             */
            getWidth(): number|string;
            /**
             * set width
             * @param width  (Required) position
             */
            setWidth(width: number|string): this;
            /**
             * return height position
             */
            getHeight(): number|string;
            /**
             * set height
             * @param height  (Required) position
             */
            setHeight(height: number|string): this;
            /**
             * return size
             */
            getSize(): number|string;
            /**
             * set size
             * @param size  (Required) size
             */
            setSize(size: number|string): this;
            /**
             * set  size constraint
             * @param constraint  (Required) size constraint
             */
            setSizeConstraint(constraint: geotoolkit.layout.SizeConstraint): this;
            /**
             * Return size constraint
             */
            getSizeConstraint(): geotoolkit.layout.SizeConstraint;
            /**
             * sets minimum height
             * @param height  (Required) height
             */
            setMinHeight(height: number|string): this;
            /**
             * Returns minimum height
             */
            getMinHeight(): number|string;
            /**
             * sets maximum height
             * @param height  (Required) height
             */
            setMaxHeight(height: number|string): this;
            /**
             * Returns maximum height
             */
            getMaxHeight(): number|string;
            /**
             * sets minimum width
             * @param width  (Required) width
             */
            setMinWidth(width: number|string): this;
            /**
             * Returns minimum width
             */
            getMinWidth(): number|string;
            /**
             * sets maximum width
             * @param width  (Required) width
             */
            setMaxWidth(width: number|string): this;
            /**
             * Returns maximum width
             */
            getMaxWidth(): number|string;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.width  (Optional) width
             * @param properties.height  (Optional) height
             * @param properties.size  (Optional) size
             * @param properties.constraint  (Optional) layout constrains
             * @param properties.min-height  (Optional) minimum height
             * @param properties.max-height  (Optional) maximum height
             * @param properties.min-width  (Optional) minimum width
             * @param properties.max-width  (Optional) maximum width
             */
            setProperties(properties: any | { width?: number|string; height?: number|string; size?: number|string; constraint?: geotoolkit.layout.SizeConstraint; "min-height"?: number|string; "max-height"?: number|string; "min-width"?: number|string; "max-width"?: number|string; } ): this;
            /**
             * Create or get layout style from object
             * @param object  (Optional) object can be in format of constructor
geotoolkit.layout.LayoutStyle
             */
            static fromObject(object?: any|geotoolkit.layout.LayoutStyle): geotoolkit.layout.LayoutStyle;
        }
        /**
         * The Layout class provides an abstract class for all layouts in the toolkits. This class defines a virtual API for arranging children nodes using method layout, which has parameter area.
         */
        class Layout {
            /**
             * The Layout class provides an abstract class for all layouts in the toolkits. This class defines a virtual API for arranging children nodes using method layout, which has parameter area.
             */
            constructor();
            /**
             * Performs layout operation
             * @param area  (Required) desired rect to layout
             * @param targets  (Optional) array of nodes or iterator of nodes supposed to layout
             */
            layout(area: geotoolkit.util.Rect, targets?: geotoolkit.layout.ILayoutable[]|geotoolkit.scene.Node[]|geotoolkit.util.Iterator): this;
            /**
             * Return the preferable size of children. Default implementation returns desired rect
             * @param rect  (Required) desired rect to layout
             * @param targets  (Optional) array of nodes supposed to layout
             */
            getPreferredSize(rect: geotoolkit.util.Rect, targets?: geotoolkit.scene.Node[]): geotoolkit.util.Rect;
            /**
             * All subclasses should override copyConstructor or provide custom implementation for this method
             */
            clone(): this;
            /**
             * Copy constructor function.<br>
             * Function used as part of the cloning mechanism.<br>
             * Implementations should copy the given instance state to this instance.<br>
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.layout.Layout): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             */
            setProperties(properties: any): geotoolkit.layout.Layout;
        }
        /**
         * Defines a container of layouts
         */
        class CompositeLayout extends geotoolkit.layout.Layout {
            /**
             * Defines a container of layouts
             */
            constructor();
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.layout.CompositeLayout): any;
            /**
             * Return the preferable size of children. It returns an union of all children
             * @param rect  (Required) desired rect to layout
             * @param targets  (Optional) array of nodes supposed to layout
             */
            getPreferredSize(rect: geotoolkit.util.Rect, targets?: geotoolkit.scene.Node[]): geotoolkit.util.Rect;
            /**
             * Return index of child
             * ( index of the specified child or -1 if layout is not found)
             * @param layout  (Required) layout to check index
             */
            indexOfChild(layout: geotoolkit.layout.Layout): number;
            /**
             * Insert child layout at specified index
             * @param index  (Required) specified index
             * @param layout  (Required) a child layout to add
             */
            insertChild(index: number, layout: geotoolkit.layout.Layout): this;
            /**
             * Add a child layout(s)
             * @param layout  (Required) the child layout to be added
             */
            add(layout: geotoolkit.layout.Layout|geotoolkit.layout.Layout[]): this;
            /**
             * Return iterator by child layouts
             * @param filter  (Optional) a filter function. Returns all layouts if null
             */
            getChildren(filter?: Function): geotoolkit.util.Iterator;
            /**
             * Remove child layout
             * @param layout  (Required) layout to be removed
             */
            removeChild(layout: geotoolkit.layout.Layout): this;
            /**
             * Remove all child layouts from this composite layout
             */
            clearChildren(): any;
            /**
             * Return layout by index
             * @param i  (Required) index of the layout
             */
            getChild(i: number): geotoolkit.layout.Layout;
            /**
             * Return number of child layouts
             */
            getChildrenCount(): number;
        }
        /**
         * Implements simple css layout (in absolute values)
         */
        class CssLayout extends geotoolkit.layout.Layout {
            /**
             * Implements simple css layout (in absolute values)
             */
            constructor();
            /**
             * Add item to be layout
             * @param item  (Required) item to add to layout
             */
            add(item: geotoolkit.layout.ILayoutable): this;
            /**
             * Add additional item to be layout
             * @param item  (Required) item to add to layout
             */
            remove(item: geotoolkit.layout.ILayoutable): this;
            /**
             * Performs layout operation
             * @param rect  (Required) desired rect to layout
             * @param targets  (Required) of nodes supposed to layout
             */
            layout(rect: geotoolkit.util.Rect, targets: geotoolkit.scene.Node[]): this;
            /**
             * Return the preferable size of children. Default implementation returns null
             * @param rect  (Required) desired rect to layout
             * @param targets  (Optional) array of nodes supposed to layout
             */
            getPreferredSize(rect: geotoolkit.util.Rect, targets?: geotoolkit.scene.Node[]): geotoolkit.util.Rect;
        }
        /**
         * This utility class provides functions used by geotoolkit.layout.LayoutStyle implementations
         */
        class LayoutHelper {
            /**
             * This utility class provides functions used by geotoolkit.layout.LayoutStyle implementations
             */
            constructor();
            /**
             * Converts desired width of the "node" layoutable component to {number} if possible
             * @param node  (Required) layoutable component
             * @param totalWidth  (Required) parent width of the container or layoutable area
             */
            static getDesiredWidth(node: geotoolkit.layout.ILayoutable, totalWidth: number): number;
            /**
             * Converts desired height of the "node" layoutable component to {number} if possible
             * @param node  (Required) layoutable component
             * @param totalHeight  (Required) parent height of the container or layoutable area
             */
            static getDesiredHeight(node: geotoolkit.layout.ILayoutable, totalHeight: number): number;
            /**
             * Returns left margin
             * @param node  (Required) layoutable component
             * @param totalWidth  (Optional) parent width of the container or layoutable area
             */
            static getLeftMargin(node: geotoolkit.layout.ILayoutable, totalWidth?: number): number;
            /**
             * Returns right margin
             * @param node  (Required) layoutable component
             * @param totalWidth  (Optional) parent width of the container or layoutable area
             */
            static getRightMargin(node: geotoolkit.layout.ILayoutable, totalWidth?: number): number;
            /**
             * Returns top margin
             * @param node  (Required) layoutable component
             * @param totalHeight  (Optional) parent height of the container or layoutable area
             */
            static getTopMargin(node: geotoolkit.layout.ILayoutable, totalHeight?: number): number;
            /**
             * Returns bottom margin
             * @param node  (Required) layoutable component
             * @param totalHeight  (Optional) parent height of the container or layoutable area
             */
            static getBottomMargin(node: geotoolkit.layout.ILayoutable, totalHeight?: number): number;
            /**
             * Gets the Maximum Height of layoutable component
             * @param node  (Required) layoutable component
             * @param totalHeight  (Optional) parent height of the container or layoutable area
             */
            static getDesiredMaxHeight(node: geotoolkit.layout.ILayoutable, totalHeight?: number): number;
            /**
             * Gets the Minimum Height of layoutable component
             * @param node  (Required) layoutable component
             * @param totalHeight  (Optional) parent height of the container or layoutable area
             */
            static getDesiredMinHeight(node: geotoolkit.layout.ILayoutable, totalHeight?: number): number;
            /**
             * Gets the Maximum Width of layoutable component
             * @param node  (Required) layoutable component
             * @param totalWidth  (Optional) parent width of the container or layoutable area
             */
            static getDesiredMaxWidth(node: geotoolkit.layout.ILayoutable, totalWidth?: number): number;
            /**
             * Gets the Minimum Width of layoutable component
             * @param node  (Required) layoutable component
             * @param totalWidth  (Optional) parent width of the container or layoutable area
             */
            static getDesiredMinWidth(node: geotoolkit.layout.ILayoutable, totalWidth?: number): number;
            /**
             * Update layout style preferred size based on size constrains from calculated size
             * @param style  (Required) style to be updated
             * @param rect  (Optional) desired rect to layout
             */
            static getPreferredStyle(style: geotoolkit.layout.LayoutStyle, rect?: geotoolkit.util.Rect): geotoolkit.layout.LayoutStyle;
            /**
             * Return number from value
             * @param val  (Required) value as absolute or percentage value form maxValue
             * @param maxValue  (Optional) maximum value
             * @param defaultValue  (Optional) default value if val is null
             */
            static getNumber(val: string|number, maxValue?: number, defaultValue?: number): number;
        }
        /**
         * Define an abstract class for box layout to line up child <code>geotoolkit.layout.ILayoutable</code> horizontally or vertically.
         * 
         * Children can be added using methods: <code>add</code> or <code>insert</code>  or can be passed as parameter in method <code>layout</code>
         */
        class BoxLayout extends geotoolkit.layout.Layout {
            /**
             * Define an abstract class for box layout to line up child <code>geotoolkit.layout.ILayoutable</code> horizontally or vertically.
             * 
             * Children can be added using methods: <code>add</code> or <code>insert</code>  or can be passed as parameter in method <code>layout</code>
             * @param dstRect  (Optional) layout area
             */
            constructor(dstRect?: geotoolkit.util.Rect);
            /**
             * Enum of alignment
             */
            static Alignment: any;
            /**
             * Gets rectangular layout area
             */
            getRect(): geotoolkit.util.Rect;
            /**
             * Sets rectangular layout area
             * @param dstRect  (Required) rectangular layout area
             */
            setRect(dstRect: geotoolkit.util.Rect): this;
            /**
             * Adds layoutable element
             * @param node  (Required) layoutable element(s)
             */
            add(node: geotoolkit.layout.ILayoutable|geotoolkit.layout.ILayoutable[]|geotoolkit.util.Iterator): this;
            /**
             * Inserts layoutable element
             * @param index  (Required) index where element will be inserted
             * @param node  (Required) layoutable element(s)
             */
            insert(index: number, node: geotoolkit.layout.ILayoutable|geotoolkit.layout.ILayoutable[]|geotoolkit.util.Iterator): this;
            /**
             * Removes a layoutable node if found
             * @param node  (Required) layoutable element
             */
            remove(node: geotoolkit.scene.Group): this;
            /**
             * Returns iterator by layoutable elements
             * @param filter  (Optional) a filter function. Returns all elements if null
             */
            getIterator(filter?: Function): geotoolkit.util.Iterator;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {properties:{rect:geotoolkit.util.Rect}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) An object containing the properties to set
             * @param properties.rect  (Optional) bounds of the layout
             * @param properties.layoutables  (Optional) 
             */
            setProperties(properties?: any | { rect?: geotoolkit.util.Rect; layoutables?: geotoolkit.layout.ILayoutable[]; } ): this;
        }
        /**
         * The HorizontalBoxLayout class lines up child elements <code>geotoolkit.layout.ILayoutable</code> horizontally.
         * <p>
         * Each child will get at least its desired width and at most its desired height, minimum and maximum height.
         * If height is not specified a child takes a height of layout area. This area can be passed via method <code>setRect</code> or
         * as a parameter of the <code>layout</code>.
         * </p>
         * <p>
         * The desired width can be specified in model parent units or in percentage to width of the a layout area.
         * </p>
         */
        class HorizontalBoxLayout extends geotoolkit.layout.BoxLayout {
            /**
             * The HorizontalBoxLayout class lines up child elements <code>geotoolkit.layout.ILayoutable</code> horizontally.
             * <p>
             * Each child will get at least its desired width and at most its desired height, minimum and maximum height.
             * If height is not specified a child takes a height of layout area. This area can be passed via method <code>setRect</code> or
             * as a parameter of the <code>layout</code>.
             * </p>
             * <p>
             * The desired width can be specified in model parent units or in percentage to width of the a layout area.
             * </p>
             * @param dstRect  (Required) layout area
             * @param alignment  (Optional) vertical alignment
             * @param direction  (Optional) optional direction of layout
             */
            constructor(dstRect: geotoolkit.util.Rect, alignment?: geotoolkit.layout.BoxLayout.Alignment, direction?: geotoolkit.layout.HorizontalBoxLayout.Direction);
            /**
             * Returns vertical alignment
             */
            getAlignment(): geotoolkit.layout.BoxLayout.Alignment;
            /**
             * Sets vertical alignment
             * @param alignment  (Required) alignment
             */
            setAlignment(alignment: geotoolkit.layout.BoxLayout.Alignment): this;
            /**
             * Enum for Direction of Layout
             */
            static Direction: any;
            /**
             * Set direction
             * @param value  (Required) direction
             */
            setDirection(value: geotoolkit.layout.HorizontalBoxLayout.Direction): this;
            /**
             * Returns direction of layout
             */
            getDirection(): geotoolkit.layout.HorizontalBoxLayout.Direction;
            /**
             * Sets rectangular layout area
             * @param dstRect  (Required) rectangular layout area
             */
            setRect(dstRect: geotoolkit.util.Rect): this;
            /**
             * Return the preferable size of children. It returns an union of all children
             * @param layoutRect  (Required) desired rect to layout
             * @param targets  (Optional) array of nodes supposed to layout
             */
            getPreferredSize(layoutRect: geotoolkit.util.Rect, targets?: geotoolkit.scene.Node[]): geotoolkit.util.Rect;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.alignment  (Optional) alignment of the layout
             * @param properties.direction  (Optional) direction of the layout
             */
            setProperties(properties: any | { alignment?: geotoolkit.layout.BoxLayout.Alignment; direction?: geotoolkit.layout.HorizontalBoxLayout.Direction; } ): this;
        }
        /**
         * The VerticalBoxLayout class lines up child elements <code>geotoolkit.layout.ILayoutable</code> vertically.
         * <p>
         * Each child will get at least its desired width and at most its desired height, minimum and maximum height.
         * If height is not specified a child takes a height of layout area. This area can be passed via method <code>setRect</code> or
         * as a parameter of the <code>layout</code>.
         * </p>
         * <p>
         * The desired width can be specified in model parent units or in percentage to width of the a layout area.
         * </p>
         */
        class VerticalBoxLayout extends geotoolkit.layout.BoxLayout {
            /**
             * The VerticalBoxLayout class lines up child elements <code>geotoolkit.layout.ILayoutable</code> vertically.
             * <p>
             * Each child will get at least its desired width and at most its desired height, minimum and maximum height.
             * If height is not specified a child takes a height of layout area. This area can be passed via method <code>setRect</code> or
             * as a parameter of the <code>layout</code>.
             * </p>
             * <p>
             * The desired width can be specified in model parent units or in percentage to width of the a layout area.
             * </p>
             * @param dstRect  (Optional) layout area
             * @param alignment  (Optional) horizontal alignment
             * @param direction  (Optional) optional direction of layout
             */
            constructor(dstRect?: geotoolkit.util.Rect, alignment?: geotoolkit.layout.BoxLayout.Alignment, direction?: geotoolkit.layout.VerticalBoxLayout.Direction);
            /**
             * Returns horizontal alignment
             */
            getAlignment(): geotoolkit.layout.BoxLayout.Alignment;
            /**
             * Sets horizontal alignment
             * @param alignment  (Required) alignment
             */
            setAlignment(alignment: geotoolkit.layout.BoxLayout.Alignment): this;
            /**
             * Enum for Direction of Layout
             */
            static Direction: any;
            /**
             * Set direction
             * @param value  (Required) direction
             */
            setDirection(value: geotoolkit.layout.VerticalBoxLayout.Direction): this;
            /**
             * Returns direction of layout
             */
            getDirection(): geotoolkit.layout.VerticalBoxLayout.Direction;
            /**
             * Sets rectangular layout area
             * @param dstRect  (Required) rectangular layout area
             */
            setRect(dstRect: geotoolkit.util.Rect): this;
            /**
             * Return the preferable size of children. It returns an union of all children
             * @param layoutRect  (Required) desired rect to layout
             * @param targets  (Optional) array of nodes supposed to layout
             */
            getPreferredSize(layoutRect: geotoolkit.util.Rect, targets?: geotoolkit.scene.Node[]): geotoolkit.util.Rect;
            /**
             * Performs layout operation
             * @param layoutRect  (Optional) desired rect to layout
             * @param targets  (Optional) array of nodes supposed to layout
             */
            layout(layoutRect?: geotoolkit.util.Rect, targets?: geotoolkit.scene.Node[]): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.alignment  (Optional) alignment of the layout
             * @param properties.direction  (Optional) direction of the layout
             */
            setProperties(properties: any | { alignment?: geotoolkit.layout.BoxLayout.Alignment; direction?: geotoolkit.layout.VerticalBoxLayout.Direction; } ): this;
        }
        /**
         * Children are arranged in a grid based on
         * number of Rows and Columns in the grid.
         */
        class RegularGridLayout extends geotoolkit.layout.BoxLayout {
            /**
             * Children are arranged in a grid based on
             * number of Rows and Columns in the grid.
             * @param rowCount  (Required) number of columns for layout
             * @param colCount  (Required) number of rows for layout
             * @param containerDirection  (Required) direction for container's layout
             * @param dstRect  (Required) rectangular layout area
             */
            constructor(rowCount: number, colCount: number, containerDirection: geotoolkit.layout.RegularGridLayout.ContainerDirection, dstRect: geotoolkit.util.Rect);
            /**
             * Sets rectangular layout area
             * @param dstRect  (Required) rectangular layout area
             */
            setRect(dstRect: geotoolkit.util.Rect): this;
            /**
             * Enum of mutual columns and rows positions in the layout
             */
            static ContainerDirection: any;
            /**
             * Layout
             * @param layoutRect  (Optional) desired rect to layout
             * @param targets  (Optional) array of nodes supposed to layout
             */
            layout(layoutRect?: geotoolkit.util.Rect, targets?: geotoolkit.layout.ILayoutable[]): this;
            /**
             * Sets direction for container's layout
             * @param direction  (Required) direction for container's layout
             */
            setDirection(direction: geotoolkit.layout.RegularGridLayout.ContainerDirection): this;
            /**
             * Gets direction of the container that this layout for
             */
            getDirection(): geotoolkit.layout.RegularGridLayout.ContainerDirection;
            /**
             * Sets number of columns for layout
             * @param colCount  (Required) number of columns for layout
             */
            setColumnCount(colCount: number): this;
            /**
             * Gets number of columns for layout
             */
            getColumnCount(): number;
            /**
             * Sets number of rows for layout
             * @param rowCount  (Required) number of rows for layout
             */
            setRowCount(rowCount: number): this;
            /**
             * Gets number of rows for layout
             */
            getRowCount(): number;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.rowcount  (Optional) rowcount rowcount
             * @param properties.columncount  (Optional) columncount columncount
             * @param properties.direction  (Optional) direction of the layout
             */
            setProperties(properties: any | { rowcount?: number; columncount?: number; direction?: geotoolkit.layout.RegularGridLayout.ContainerDirection; } ): this;
        }
        class HorizontalPriorityLayout extends geotoolkit.layout.Layout {
            /**
             */
            constructor();
            /**
             * Enum for Horizontal Priority Layout
             */
            static Direction: any;
            /**
             * Set direction
             * @param value  (Required) direction of layout
             */
            setDirection(value: geotoolkit.layout.HorizontalPriorityLayout.Direction): this;
            /**
             * Returns direction
             */
            getDirection(): geotoolkit.layout.HorizontalPriorityLayout.Direction;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {properties:{direction:geotoolkit.layout.HorizontalPriorityLayout.Direction}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) An object containing the properties to set
             * @param properties.direction  (Optional) direction of the layout
             */
            setProperties(properties?: any | { direction?: geotoolkit.layout.HorizontalPriorityLayout.Direction; } ): this;
        }
        class VerticalPriorityLayout extends geotoolkit.layout.Layout {
            /**
             */
            constructor();
            /**
             * Enum for Horizontal Priority Layout
             */
            static Direction: any;
            /**
             * Set direction
             * @param value  (Required) the new layout direction
             */
            setDirection(value: geotoolkit.layout.VerticalPriorityLayout.Direction): this;
            /**
             * Returns direction
             */
            getDirection(): geotoolkit.layout.VerticalPriorityLayout.Direction;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.direction  (Optional) direction of the layout
             */
            setProperties(properties: any | { direction?: geotoolkit.layout.VerticalPriorityLayout.Direction; } ): this;
        }
        class TableLayout extends geotoolkit.layout.Layout {
            /**
             * @param rowCount  (Optional) A count of rows
             * @param colCount  (Optional) A count of columns
             * @param dstRect  (Optional) 
             */
            constructor(rowCount?: number, colCount?: number, dstRect?: geotoolkit.util.Rect);
            /**
             * Enum of mutual columns and rows positions in layout
             */
            static Direction: any;
            /**
             * set direction for Table layout
             * @param value  (Required) a new direction
             */
            setDirection(value: geotoolkit.layout.TableLayout.Direction): this;
            /**
             * Gets direction of the layout
             */
            getDirection(): geotoolkit.layout.TableLayout.Direction;
            /**
             * Sets the number of columns
             * @param colCount  (Required) the number of columns for the layout
             */
            setColumnCount(colCount: number): this;
            /**
             * Gets the number of columns
             */
            getColumnCount(): number;
            /**
             * Sets the number of rows
             * @param rowCount  (Required) the number of rows for the layout
             */
            setRowCount(rowCount: number): this;
            /**
             * Gets the number of Rows
             */
            getRowCount(): number;
            /**
             * Sets Distance between two columns.
             * @param distance  (Required) a horizontal distance
             */
            setHorizontalDistance(distance: number): this;
            /**
             * Gets the Horizontal Distance between two columns
             */
            getHorizontalDistance(): number;
            /**
             * Sets Distance between two rows.
             * @param distance  (Required) a vertical distance
             */
            setVerticalDistance(distance: number): this;
            /**
             * Gets the Vertical Distance between two rows
             */
            getVerticalDistance(): number;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.rowcount  (Optional) rowcount rowcount
             * @param properties.columncount  (Optional) columncount columncount
             * @param properties.horizontaldistance  (Optional) horizontaldistance horizontal distance
             * @param properties.verticaldistance  (Optional) verticaldistance vertical distance
             * @param properties.direction  (Optional) direction of the layout
             */
            setProperties(properties: any | { rowcount?: number; columncount?: number; horizontaldistance?: number; verticaldistance?: number; direction?: geotoolkit.layout.TableLayout.Direction; } ): this;
        }
        class ValueCorrelatedRangeLayout1D implements geotoolkit.layout.ILayout1D {
            /**
             * @param options  (Optional) layout options
             * @param options.overlap  (Optional) what to do if ranges don't fit: 'some' or 'all'
             * @param options.maxoffset  (Optional) if defined do not draw labels further than 'maxoffset' device units from its model position
             */
            constructor(options?: any | { overlap?: string; maxoffset?: number; } );
            /**
             * Layouts elements
             * @param elements  (Required) elements to layout
             * @param context  (Required) rendering context
             * @param limits  (Optional) limits to layout elements within
             */
            layout(elements: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext, limits?: geotoolkit.util.Range): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.offset  (Optional) offset offset
             * @param properties.overlapped  (Optional) overlapped overlapped
             */
            setProperties(properties: any | { offset?: number; overlapped?: boolean; } ): this;
        }
        /**
         * Define an object which can be laid out.
         */
        interface ILayoutable {
            /**
             * Returns area, which object occupies
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Set area, which object occupies
             * @param area  (Required) an area to occupy
             */
            setBounds(area: geotoolkit.util.Rect): this;
            /**
             * Return desired layout style
             */
            getLayoutStyle(): geotoolkit.layout.LayoutStyle;
        }
        /**
         * Define resize mode of the layoutable.
         */
        interface SizeConstraint {
            /**
             * The layoutable item is not constrained.
             */
            NoConstraint: string;
            /**
             * The layoutable item returns preferred width and height from the layout manager
             */
            PreferredSize: string;
            /**
             * The layoutable item returns preferred width from the layout manager
             */
            PreferredWidth: string;
            /**
             * The layoutable item returns preferred height from the layout manager
             */
            PreferredHeight: string;
        }
        /**
         * Enum of annotation locations
         * Supported values are:
         * North, South, East, West,
         * NorthWest, NorthEast, SouthWest, SouthEast,
         * Center, None
         */
        interface AnnotationLocation {
            /**
             * West
             */
            West: string;
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
             * NorthWest
             */
            NorthWest: string;
            /**
             * NorthEast
             */
            NorthEast: string;
            /**
             * SouthEast
             */
            SouthEast: string;
            /**
             * SouthWest
             */
            SouthWest: string;
            /**
             * None
             */
            None: string;
            /**
             * Center
             */
            Center: string;
        }
        /**
         * Layout Events enumerator
         */
        interface Events {
            /**
             * Event type fired when layout is invalidated
             */
            LayoutInvalidated: string;
            /**
             * Event type fired when layout is updated
             */
            LayoutUpdated: string;
        }
        /**
         * Interface to layout {@link geotoolkit.layout.ILayoutElement1D} elements.
         */
        interface ILayout1D {
            /**
             * Layouts elements
             * @param elements  (Required) {@link geotoolkit.layout.ILayoutElement1D} elements to layout
             * @param context  (Required) rendering context
             * @param limits  (Required) limits to layout elements within
             */
            layout(elements: geotoolkit.util.Iterator, context: geotoolkit.renderer.RenderingContext, limits: geotoolkit.util.Range): any;
        }
        /**
         * Layout element to be used for layout by {@link geotoolkit.layout.ILayout1D} implementation.
         */
        interface ILayoutElement1D {
            /**
             * Gets value
             */
            getValue(): number;
            /**
             * Gets value range to layout
             */
            getLayoutRange(): geotoolkit.util.Range;
            /**
             * Updates value range to layout
             */
            updateLayoutRange(): any;
            /**
             * Gets offset applied
             */
            getOffset(): number;
            /**
             * Sets offset to apply
             * @param offset  (Required) to apply
             */
            setOffset(offset: number): this;
            /**
             * Gets "overlapped" flag
             */
            getOverlapped(): boolean;
            /**
             * Sets "overlapped" flag
             * @param overlapped  (Required) "overlapped" flag
             */
            setOverlapped(overlapped: boolean): any;
        }
        module BoxLayout {
            /**
             * Enum of alignment
             */
            interface Alignment {
                /**
                 * Top
                 */
                Top: number;
                /**
                 * Bottom
                 */
                Bottom: number;
                /**
                 * Left
                 */
                Left: number;
                /**
                 * Right
                 */
                Right: number;
                /**
                 * Center
                 */
                Center: number;
            }
        }
        module HorizontalBoxLayout {
            /**
             * Enum for Direction of Layout
             */
            interface Direction {
                /**
                 * LeftToRight
                 */
                LeftToRight: string;
                /**
                 * RightToLeft
                 */
                RightToLeft: string;
            }
        }
        module VerticalBoxLayout {
            /**
             * Enum for Direction of Layout
             */
            interface Direction {
                /**
                 * TopToBottom
                 */
                TopToBottom: string;
                /**
                 * BottomToTop
                 */
                BottomToTop: string;
            }
        }
        module RegularGridLayout {
            /**
             * Enum of mutual columns and rows positions in the layout
             */
            interface ContainerDirection {
                /**
                 * Elements in the layout array go column-by-column.
                 */
                Vertical: string;
                /**
                 * Elements in the layout array go row-by-row.
                 */
                Horizontal: string;
            }
        }
        module HorizontalPriorityLayout {
            /**
             * Enum for Horizontal Priority Layout
             */
            interface Direction {
                /**
                 * LeftToRight
                 */
                LeftToRight: string;
                /**
                 * RightToLeft
                 */
                RightToLeft: string;
            }
        }
        module VerticalPriorityLayout {
            /**
             * Enum for Horizontal Priority Layout
             */
            interface Direction {
                /**
                 * TopToBottom
                 */
                TopToBottom: string;
                /**
                 * BottomToTop
                 */
                BottomToTop: string;
            }
        }
        module TableLayout {
            /**
             * Enum of mutual columns and rows positions in layout
             */
            interface Direction {
                /**
                 * Elements set in row-by-row manner.
                 */
                Horizontal: string;
                /**
                 * Elements set column-by-column manner.
                 */
                Vertical: string;
            }
        }
    }
    module scene {
        /**
         * The Node class is the abstract class parent of all geotoolkit shapes.<br>
         * <br>
         * Node implements the functions required by a shape to be inserted in a Plot. (Except the render function which is Geotoolkit abstract method.)<br>
         * Every Node has two <b>transformations</b>: World Transform and the Scene Transform. <br>
         * WorldTransform corresponds to the concatenation of local and contents transforms <br>
         * Scene Transform corresponds to the concatenation of a Node's World Transform with its parent's World Transforms or the ultimate transformation beween the group and the plot.<br>
         * <br>
         * A node handles some of the <b>invalidation</b> mechanism as it forwards (upward) the invalidation event to its parent.<br>
         * One may add an invalidationHandler to be notified when the node has been invalidated, see {@link geotoolkit.node.addInvalidateHandler()}
         * <br>
         * When implementing a new shape, one will have to implement the <b>render()</b>function which allows rendering graphics.<br>
         * Note that shape selection/detection is also using rendering.<br>
         * It is also recommended to implement the <b>checkCollision()</b> function to let the toolkit optimize rendering by checking if the node is in the specified area and needs to be rendered.<br>
         * If it passes the test then only render() function will be called.<br>
         * <br>
         * The node class also introduces the functions <b>getProperties</b> and <b>setProperties</b> that may be used for serialization/deserialization.<br>
         * Therefore, a custom shape should extend those functions to be able to be serialized and deserialized.
         */
        class Node extends geotoolkit.util.EventDispatcher {
            /**
             * The Node class is the abstract class parent of all geotoolkit shapes.<br>
             * <br>
             * Node implements the functions required by a shape to be inserted in a Plot. (Except the render function which is Geotoolkit abstract method.)<br>
             * Every Node has two <b>transformations</b>: World Transform and the Scene Transform. <br>
             * WorldTransform corresponds to the concatenation of local and contents transforms <br>
             * Scene Transform corresponds to the concatenation of a Node's World Transform with its parent's World Transforms or the ultimate transformation beween the group and the plot.<br>
             * <br>
             * A node handles some of the <b>invalidation</b> mechanism as it forwards (upward) the invalidation event to its parent.<br>
             * One may add an invalidationHandler to be notified when the node has been invalidated, see {@link geotoolkit.node.addInvalidateHandler()}
             * <br>
             * When implementing a new shape, one will have to implement the <b>render()</b>function which allows rendering graphics.<br>
             * Note that shape selection/detection is also using rendering.<br>
             * It is also recommended to implement the <b>checkCollision()</b> function to let the toolkit optimize rendering by checking if the node is in the specified area and needs to be rendered.<br>
             * If it passes the test then only render() function will be called.<br>
             * <br>
             * The node class also introduces the functions <b>getProperties</b> and <b>setProperties</b> that may be used for serialization/deserialization.<br>
             * Therefore, a custom shape should extend those functions to be able to be serialized and deserialized.
             * @param options  (Optional) The options
             * @param options.name  (Optional) name of the node. It is often used for debugging purposes or to simplify queries
             * @param options.visible  (Optional) visibility of the node, A boolean to determine if the node should be rendered or not
             * @param options.selectable  (Optional) selectable node A boolean to determine if selection should consider this node
             * @param options.id  (Optional) id of the node , its a unique identifier
             * @param options.tag  (Optional) custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
             * @param options.cssclass  (Optional) The css class name of this node
             */
            constructor(options?: any | { name?: string; visible?: boolean; selectable?: boolean; id?: number|string; tag?: any; cssclass?: string; } );
            /**
             * Returns the instance class name, see {@link geotoolkit.setClassName}
             */
            getClassName(): string;
            /**
             * All subclasses should override copyConstructor or provide custom implementation for this method
             */
            clone(): geotoolkit.scene.Node;
            /**
             * Copy constructor function.<br>
             * Function used as part of the cloning mechanism.<br>
             * Implementations should copy the given instance state to this instance.<br>
             * @param src  (Required) Source to copy from
             * @param deepCopy  (Optional) deep copy
             */
            protected copyConstructor(src: geotoolkit.scene.Node, deepCopy?: boolean): this;
            /**
             * Type of state changes
             */
            static StateChanges: any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {properties:{selectable:boolean;name:string;visible:boolean;id:string;tag:any}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.selectable  (Optional) selectable node
             * @param properties.name  (Optional) name of the node
             * @param properties.visible  (Optional) visibility of the node
             * @param properties.id  (Optional) id of the node
             * @param properties.tag  (Optional) custom information associated with node
             */
            setProperties(properties: any | { selectable?: boolean; name?: string; visible?: boolean; id?: string; tag?: any; } ): this;
            /**
             * Returns a string representation of this object (generally the classname)
             */
            toString(): string;
            /**
             * Returns true if node can be picked/selected.
             */
            isSelectable(): boolean;
            /**
             * Allows to select node. If node is not selectable then child node is
             * not selectable.
             * @param selectable  (Required) flag to allow node selection
             */
            setSelectable(selectable: boolean): this;
            /**
             * Returns the node name
             */
            getName(): string;
            /**
             * Sets name of the node
             * @param name  (Required) The node name
             */
            setName(name: string): this;
            /**
             * Returns css class name to be used to apply CSS style
             */
            getCssClass(): string;
            /**
             * Sets css class name of the node to be used to apply CSS style
             * @param name  (Required) css class name of the node
             */
            setCssClass(name: string): this;
            /**
             * Returns the object associated with the node by user.
             */
            getTag(): any;
            /**
             * Allows the user to associate any arbitrary object with the node.
             * @param tag  (Required) The object to be associated with the node.
             */
            setTag(tag: any): this;
            /**
             * Returns the associated identifier of the node
             */
            getId(): number|string;
            /**
             * Allows the user to associate any identifier
             * @param id  (Required) object id
             */
            setId(id: number|string): this;
            /**
             * Return visibility of the node
             */
            getVisible(): boolean;
            /**
             * Sets visibility of the node
             * @param value  (Required) flag specifying visibility of the node
             */
            setVisible(value: boolean): this;
            /**
             * Return parent node
             */
            getParent(): geotoolkit.scene.Node;
            /**
             * <code>getWorldTransform</code> retrieves the local transformation
             * of the inner node coordinates to parent coordinates.
             */
            getWorldTransform(): geotoolkit.util.Transformation|any;
            /**
             * Returns transformation from node to root scene
             */
            getSceneTransform(): geotoolkit.util.Transformation;
            /**
             * Update state. This methods reset node state and update state for children. this method is useful to
             * refresh a scene graph
             * @param regions  (Optional) optional array to return invalid rectangles in the parent coordinates
             * @param changes  (Optional) optional parameter to specify a reason of changes
             */
            updateState(regions?: geotoolkit.util.Rect[], changes?: geotoolkit.scene.Node.StateChanges): this;
            /**
             * Update scene transformation
             */
            updateSceneTransformation(): this;
            /**
             * Returns root node. <br>
             * If node doesn't have parent then it returns itself.
             */
            getRoot(): geotoolkit.scene.Node;
            /**
             * Invalidate area of the shape.  This method invalidates parent by default. invalidated from parent to root node.
             * @param bounds  (Optional) bounds of the invalid rectangle in the inner node coordinates
             * @param force  (Optional) true if parent should be invalidated immediately
if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
             */
            invalidate(bounds?: geotoolkit.util.Rect|any, force?: boolean): this;
            /**
             * set notification state
             * @param notify  (Required) flag set to invalidate parent or not
             * @param force  (Optional) true if parent should be invalidated immediately
             */
            setNotification(notify: boolean, force?: boolean): this;
            /**
             * return state of notification
             */
            isNotificationEnabled(): boolean;
            /**
             * Invalidate parent and notify all listeners.
             * @param bounds  (Optional) bounds of the invalid rectangle in the inner node coordinates
             * @param force  (Optional) force rendering
             */
            protected invalidateParent(bounds?: geotoolkit.util.Rect, force?: boolean): this;
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
             * Check if this node is within the area being rendered by the context
             * @param context  (Required) Rendering Context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
            /**
             * Renders node
             * @param context  (Required) The rendering context to be used to draw the node
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Render node in asynchronous mode. Default implementation creates call method "render" inside
             * @param context  (Required) The rendering context to be used to draw the node
             * @param callback  (Required) callback function
             */
            renderAsync(context: geotoolkit.renderer.RenderingContext, callback: Function): any;
            /**
             * Executes delegate and return the result.It allows us to keep all initialization calls in one place, <br>
             * and we do not need to scroll up or down in IDE to find how and where it was initialized.
             * @param delegate  (Required) Function to execute
             */
            execute(delegate: Function): any;
            /**
             * @param event  (Required) type of event
             * @param source  (Required) source who called the event
             * @param args  (Optional) event arguments
             */
            protected notify(event: string, source: geotoolkit.scene.Node, args?: any): this;
            /**
             * Disposes this node, once disposes a node should not be used anymore.<br>
             * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
             * Also aggressively 'cleanup' this node by setting some of its members to null.
             */
            dispose(): any;
            /**
             * Connects style.<br>
             * <br>
             * This convenience method subscribes a listener to given style for the specified type.<br>
             * And automatically un-subscribes listener if node is disposed to prevent memory leaks
             * @param style  (Required) connect style
             * @param type  (Required) type of event or property
             * @param callback  (Required) function to be called
             */
            protected connectStyle(style: geotoolkit.util.EventDispatcher, type: string, callback: Function): any;
            /**
             * Disconnect style<br>
             * <br>
             * This convenience method un-subscribes a listener to given style for the specified type.<br>
             * @param style  (Required) connect style
             * @param type  (Required) type of event or property
             * @param callback  (Required) function to be called
             */
            protected disconnectStyle(style: geotoolkit.util.EventDispatcher, type: string, callback: Function): any;
            /**
             * Gets dynamic property by name. These properties can be
             * used as a property bags
             * @param name  (Required) property name
             */
            getProperty(name: string): any;
            /**
             * Sets dynamic property by name
             * @param name  (Required) property name
             * @param value  (Required) property value
             */
            setProperty(name: string, value: any): this;
            /**
             * Enable / disable all notifications
             * @param enabled  (Required) sets if this object sends notifications
             */
            static enableSceneGraphNotification(enabled: boolean): any;
            /**
             * Return status of the global notification for all nodes.
             */
            static isSceneGraphNotificationEnabled(): boolean;
            /**
             * Gets list of css class names which applied to this node
             */
            getCssClasses(): string[];
            /**
             * Check if node has specified css class
             * @param cssClass  (Required) css class name
             */
            hasCssClass(cssClass: string): boolean;
            /**
             * Adds new css class to node
             * @param cssclass  (Required) css class name('s)
             */
            addCssClass(cssclass: string[]|string): this;
            /**
             * Removes css class from node
             * @param cssclass  (Required) css class name('s)
             */
            removeCssClass(cssclass: string[]|string): this;
            /**
             * Find root of the node with specified type
             * @param node  (Required) node to start search
             * @param classType  (Required) type of the class to search for
             */
            static findParent(node: geotoolkit.scene.Node, classType: any): geotoolkit.scene.Node|any;
            /**
             * Node Events enumerator
             */
            static Events: any;
        }
        /**
         * Defines an abstract implementation of a graphics node. Abstract node supports rotation, clipping and local transform.
         * It has several helper methods like scale, rotate, translate, shear.
         */
        class AbstractNode extends geotoolkit.scene.Node {
            /**
             * Defines an abstract implementation of a graphics node. Abstract node supports rotation, clipping and local transform.
             * It has several helper methods like scale, rotate, translate, shear.
             * @param options  (Optional) options
             * @param options.visible  (Optional) visibility of node
             * @param options.selectable  (Optional) selectable node A boolean to determine if selection should consider this node
             * @param options.id  (Optional) id of the node , its a unique identifier
             * @param options.tag  (Optional) custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
             * @param options.cssclass  (Optional) The ccs class name of this node
             * @param options.clipstyle  (Optional) clipping style
             * @param options.responsivestyle  (Optional) responsive style
             * @param options.margins  (Optional) It has properties for specifying the margins for each side
             * @param options.margins.top  (Optional) top margin
             * @param options.margins.bottom  (Optional) top margin
             * @param options.margins.right  (Optional) right margin
             * @param options.margins.left  (Optional) left margin
             * @param options.renderingfilter  (Optional) rendering filter
             * @param options.animationstyle  (Optional) animation style
             */
            constructor(options?: any | { visible?: boolean; selectable?: boolean; id?: string; tag?: any; cssclass?: string; clipstyle?: geotoolkit.attributes.ClipStyle|any; responsivestyle?: geotoolkit.responsive.ResponsiveStyle|any; margins?: any | { top?: number|string; bottom?: number|string; right?: number|string; left?: number|string; } |geotoolkit.attributes.SpaceStyle; renderingfilter?: geotoolkit.renderer.IFilter; animationstyle?: geotoolkit.attributes.AnimationStyle; } );
            /**
             * Sets a new clipping style
             * @param style  (Required) a new clipping style
             */
            setClipStyle(style: geotoolkit.attributes.ClipStyle|any): this;
            /**
             * Gets the current clipping style
             */
            getClipStyle(): geotoolkit.attributes.ClipStyle;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {props:{localtransform:any;clipstyle:geotoolkit.attributes.ClipStyle|any;responsivestyle:geotoolkit.responsive.ResponsiveStyle|any;margins:geotoolkit.attributes.SpaceStyle;renderingFilter:geotoolkit.renderer.IFilter}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) JSON containing the properties to set
             * @param properties.localtransform  (Optional) local transform
             * @param properties.clipstyle  (Optional) clipping style
             * @param properties.responsivestyle  (Optional) responsive style
             * @param properties.margins  (Optional) margin style
             * @param properties.renderingfilter  (Optional) rendering filter
             */
            setProperties(properties?: any | { localtransform?: geotoolkit.util.Transformation; clipstyle?: geotoolkit.attributes.ClipStyle|any; responsivestyle?: geotoolkit.responsive.ResponsiveStyle|any; margins?: any|geotoolkit.attributes.SpaceStyle; renderingfilter?: geotoolkit.renderer.IFilter; } ): this;
            /**
             * Sets local transformation to be used to transform from local to parent
             * coordinate
             * @param localTransform  (Required) local transformation for this node
             */
            setLocalTransform(localTransform: geotoolkit.util.Transformation): this;
            /**
             * Scale node
             * @param xx  (Required) x scale factor
             * @param yy  (Required) y scale factor
             */
            scale(xx: number, yy: number): this;
            /**
             * Translate bounds
             * @param tx  (Required) x translation
             * @param ty  (Required) y translation
             */
            translate(tx: number, ty: number): this;
            /**
             * Shear this node's bounds
             * @param shx  (Required) x-axis shear
             * @param shy  (Required) y-axis shear
             */
            shear(shx: number, shy: number): this;
            /**
             * Rotate bounds around a given coordinate
             * @param theta  (Required) angle to rotate node, in radians
             * @param x  (Required) x coordinate to rotate around
             * @param y  (Required) y coordinate to rotate around
             */
            rotate(theta: number, x: number, y: number): this;
            /**
             * Retrieves the transformation of bounds to parent
             */
            getLocalTransform(): geotoolkit.util.Transformation;
            /**
             * Retrieves the local transformation
             * of the node which represents multiplication of parent to bounds and
             * contents transformations.
             */
            getWorldTransform(): geotoolkit.util.Transformation;
            /**
             * Occurs before rendering this method sets clipping by default. Call this method
             * if you override method render
             * @param context  (Required) Rendering Context
             */
            protected preRendering(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * To be called after rendering. Call this method if you override method render
             * @param context  (Required) Rendering Context
             */
            protected postRendering(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Sets CSS style. This style will be applied for all inserted elements
             * @param style  (Required) CSS style to be applied to inserted elements
             * @param merge  (Optional) merge flag
             */
            setCss(style: string|any|geotoolkit.css.CssStyle, merge?: boolean): this;
            /**
             * Return CSS style
             */
            getCss(): geotoolkit.css.CssStyle;
            /**
             * Sets responsive style.
             * @param style  (Required) responsive style
             */
            setResponsiveStyle(style: string|any|geotoolkit.responsive.ResponsiveStyle): this;
            /**
             * Return responsive style
             */
            getResponsiveStyle(): geotoolkit.responsive.ResponsiveStyle;
            /**
             * Sets margins style
             * @param margins  (Optional) margins style
             */
            setMarginsStyle(margins?: geotoolkit.attributes.SpaceStyle|any): this;
            /**
             * Return margins style
             */
            getMarginsStyle(): geotoolkit.attributes.SpaceStyle;
            /**
             * Apply a responsive style rules it is exists
             */
            protected applyResponsiveStyle(): any;
            /**
             * Sets filter to be applied before rendering and picking
             * @param filter  (Required) filter to set
             */
            setRenderingFilter(filter: geotoolkit.renderer.IFilter): this;
            /**
             * Return filter to be used for rendering and picking
             */
            getRenderingFilter(): geotoolkit.renderer.IFilter;
            /**
             * Gets invalidate method
             */
            protected getInvalidateMethod(): Function;
            /**
             * Return animation style
             */
            getAnimationStyle(): geotoolkit.attributes.AnimationStyle;
            /**
             * Sets animation style
             * @param animationStyle  (Required) animation style
             */
            setAnimationStyle(animationStyle: geotoolkit.attributes.AnimationStyle): this;
            /**
             * Filter node
             * @param context  (Required) Rendering Context
             */
            protected filter(context: geotoolkit.renderer.RenderingContext): boolean;
            /**
             * Check if this node is within the area being rendered by the context
             * @param context  (Required) Rendering Context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
        }
        /**
         * A compositenode is a container for other nodes. Nodes/Children can be added/removed/inserted at any time.<br>
         * When clipping is enabled shapes will not be rendered outside the bounds of the composite node. Clipping children is based on the composite bounds.<br>
         * New clipping style can be set using setClipStyle() and it replaces the bounds clipping. If bounds clipping is disabled the new clip style will still be applied for the children.
         */
        class CompositeNode extends geotoolkit.scene.AbstractNode implements geotoolkit.scene.INodeEnumerable {
            /**
             * A compositenode is a container for other nodes. Nodes/Children can be added/removed/inserted at any time.<br>
             * When clipping is enabled shapes will not be rendered outside the bounds of the composite node. Clipping children is based on the composite bounds.<br>
             * New clipping style can be set using setClipStyle() and it replaces the bounds clipping. If bounds clipping is disabled the new clip style will still be applied for the children.
             * @param options  (Optional) options
             * @param options.clipping  (Optional) enable clipping, This does not consider the clipstyle , it is related to bounds-clipping.
             */
            constructor(options?: any | { clipping?: boolean; } );
            /**
             * Enum for node order
             */
            static NodeOrder: any;
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
             * Return index of child
             * ( index of the specified child or -1 if node is not found)
             * @param node  (Required) node to check index
             */
            indexOfChild(node: geotoolkit.scene.Node): number;
            /**
             * Insert child node at specified index
             * @param index  (Required) specified index
             * @param node  (Required) a child node to add
             */
            insertChild(index: number, node: geotoolkit.scene.Node): this;
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
             * changes the z-order of the nodes being rendered.
             * @param node  (Required) any child added in the Composite node
             * @param order  (Required) position to be added
             * @param anchor  (Optional) anchor node to specify changeOrder with respect to this node
             */
            changeChildOrder(node: geotoolkit.scene.Node, order: geotoolkit.scene.CompositeNode.NodeOrder, anchor?: geotoolkit.scene.Node): this;
            /**
             * @param callback  (Required) callback
             * @param target  (Required) target
             */
            enumerateNodes(callback: Function, target: any): any;
            /**
             * Occurs before child rendering
             * @param context  (Required) Rendering Context
             */
            preRendering(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * To be called after rendering, used for PDF output
             * @param context  (Required) Rendering Context
             */
            postRendering(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Render node in asynchronous mode
             * @param context  (Required) The rendering context to be used to draw the node
             * @param callback  (Required) callback function
             */
            renderAsync(context: geotoolkit.renderer.RenderingContext, callback: Function): this;
            /**
             * Render children in asynchronous mode
             * @param context  (Required) The rendering context to be used to draw the node
             * @param callback  (Required) callback function to be called then all children are rendered
             */
            protected renderContentAsync(context: geotoolkit.renderer.RenderingContext, callback: Function): this;
            /**
             * render to specified context. This method calls preRendering, renderChildren, postRendering
             * @param context  (Required) Rendering Context
             */
            renderContent(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Render children
             * @param context  (Required) Rendering Context
             */
            protected renderChildren(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Return true if the representation is flipped vertically
             */
            isVerticalFlip(): boolean;
            /**
             * Return true if the representation is flipped horizontally
             */
            isHorizontalFlip(): boolean;
            /**
             * Sets node by index
             * @param index  (Required) index of the node
             * @param node  (Required) node
             */
            set(index: number, node: geotoolkit.scene.Node): geotoolkit.scene.Node;
            /**
             * Set visible model limits
             * @param visibleModelBounds  (Required) visible model limits or bounds
             * @param deviceBounds  (Optional) device bounds
             */
            setVisibleModelLimits(visibleModelBounds: geotoolkit.util.Rect, deviceBounds?: geotoolkit.util.Rect): this;
            /**
             * Return visible model limits
             * @param ignoreModelLimits  (Optional) flag defines whether to ignore ModelLimits or not
             */
            getVisibleModelLimits(ignoreModelLimits?: boolean): geotoolkit.util.Rect;
            /**
             * Return visible device limits
             * @param ignoreModelLimits  (Optional) flag defines whether to ignore ModelLimts or not
             */
            getVisibleDeviceLimits(ignoreModelLimits?: boolean): geotoolkit.util.Rect;
            /**
             * Return device limits
             */
            getDeviceLimits(): geotoolkit.util.Rect;
            /**
             * Return model limits. (By default it returns null)
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Gets bounds in the parent coordinates
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Transformation of inner contents to bounds
             */
            getContentsTransform(): geotoolkit.util.Transformation;
            /**
             * Retrieves the local transformation of the node which represents multiplication of parent to bounds and
             * contents transformations.
             */
            getWorldTransform(): geotoolkit.util.Transformation;
            /**
             * Check culling
             * Returns true if object is inside of renderable area
             * @param context  (Required) Rendering Context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
            /**
             * Adjust position of node to specified area
             * @param area  (Optional) specified area. Default to Parent Model Limits
             * @param vAlign  (Optional) vertical alignment. It can be "top", "bottom", "center". Defaults to "top".
             * @param hAlign  (Optional) horizontal alignment It can be "left", "right", "center". Defaults to "left".
             */
            adjustPosition(area?: geotoolkit.util.Rect, vAlign?: string, hAlign?: string): this;
            /**
             * MoveTo position of node to specified area
             * @param area  (Required) specified area
             * @param vAlign  (Optional) vertical alignment. It can be "top", "bottom", "center".
             * @param hAlign  (Optional) horizontal alignment It can be "left", "right", "center".
             */
            moveTo(area: geotoolkit.util.Rect, vAlign?: string, hAlign?: string): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.clipping  (Optional) flag set to enable clipping or not
             * @param properties.children  (Optional) array of children nodes, nodes won't be disposed
             */
            setProperties(properties: any | { clipping?: boolean; children?: geotoolkit.scene.Node[]; } ): this;
            /**
             * Dispose node. Clear all listeners
             * and disconnect style to avoid memory
             * leaks
             */
            dispose(): any;
        }
        /**
         * Define a composite node, which always has the same bounds and model limits as its parent
         */
        class Layer extends geotoolkit.scene.CompositeNode {
            /**
             * Define a composite node, which always has the same bounds and model limits as its parent
             * @param options  (Optional) addition options
             * @param options.verticalFlip  (Optional) vertical axis goes from bottom to top
             * @param options.horizontalFlip  (Optional) horizontal axis goes from right to left
             * @param options.modelLimits  (Optional) define inner model coordinates of the group
             * @param options.bounds  (Optional) define position of the group in the parent
             * @param options.children  (Optional) the child nodes to be added
             */
            constructor(options?: any | { verticalFlip?: boolean; horizontalFlip?: boolean; modelLimits?: geotoolkit.util.Rect|any; bounds?: geotoolkit.util.Rect|any; children?: geotoolkit.scene.Node|geotoolkit.scene.Node[]|geotoolkit.util.Iterator; } );
            /**
             * Returns parent bounds
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Returns parent model limits
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Returns parent visible model limits
             * @param ignoreModelLimits  (Optional) a flag to ignore model limits
             */
            getVisibleModelLimits(ignoreModelLimits?: boolean): geotoolkit.util.Rect;
            /**
             * Invalidate parent and notify all listeners.
             * @param bounds  (Optional) bounds of the invalid rectangle in the inner node coordinates
             * @param force  (Optional) force invalidate
             */
            invalidateParent(bounds?: geotoolkit.util.Rect, force?: boolean): this;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
        }
        /**
         * Abstract parent class of caches
         */
        class Cache {
            /**
             * Abstract parent class of caches
             */
            constructor();
            /**
             * Sets cache owner.
             * @param owner  (Required) node which should be cached
             */
            setOwner(owner: geotoolkit.scene.Node): any;
            /**
             * Returns cache owner.
             */
            getOwner(): geotoolkit.scene.Node;
            /**
             * Sets render content delegate.
             * @param renderContentDelegate  (Required) parameter which can render content for this node
             */
            setRenderContent(renderContentDelegate: Function): any;
            /**
             * Render cache.
             * @param context  (Required) rendering context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Rebuilds cache.
             */
            rebuild(): any;
            /**
             * Invalidates cache. Marks cache to be rendered.
             * @param bounds  (Optional) rectangular area to be invalidated
             */
            invalidate(bounds?: geotoolkit.util.Rect): any;
            /**
             * for internal use only
             */
            expand(): any;
            /**
             * Returns resource manager.
             */
            getResourceManager(): geotoolkit.scene.TileResourceManager;
            /**
             * Returns a cloned cache object.
             * All inheritors should emplement copy constructor or provide custom implementation for this method.
             */
            clone(): this;
            /**
             * Enum of cache mode
             */
            static CacheMode: any;
        }
        /**
         * Defines a group node to be a collection of children nodes.<br>
         * A group has bounds, which specify a position and size in the parent
         * coordinates and has own inner model coordinates. All children nodes use
         * inner model coordinates to specify own location inside the group.<br>
         * The group maps model coordinates to bounds automatically for children.
         * Children can be prerendered using {@link geotoolkit.scene.Cache} strategy.<br>
         * It means that system renders children to cache and cache to display. As a rule a cache is a
         * raster image.<br>
         * If a child is changed then you need to rebuild group to refresh representation.
         */
        class Group extends geotoolkit.scene.CompositeNode implements geotoolkit.layout.ILayoutable {
            /**
             * Defines a group node to be a collection of children nodes.<br>
             * A group has bounds, which specify a position and size in the parent
             * coordinates and has own inner model coordinates. All children nodes use
             * inner model coordinates to specify own location inside the group.<br>
             * The group maps model coordinates to bounds automatically for children.
             * Children can be prerendered using {@link geotoolkit.scene.Cache} strategy.<br>
             * It means that system renders children to cache and cache to display. As a rule a cache is a
             * raster image.<br>
             * If a child is changed then you need to rebuild group to refresh representation.
             * @param options  (Optional) options
             * @param options.verticalFlip  (Optional) vertical axis goes from bottom to top
             * @param options.horizontalFlip  (Optional) horizontal axis goes from right to left
             * @param options.modelLimits  (Optional) define inner model coordinates of the group
             * @param options.bounds  (Optional) define position of the group in the parent
             * @param options.linestyle  (Optional) line style
             * @param options.fillstyle  (Optional) fill style
             * @param options.padding  (Optional) It has properties for specifying the padding for each side
             * @param options.padding.top  (Optional) top padding
             * @param options.padding.bottom  (Optional) top padding
             * @param options.padding.right  (Optional) right padding
             * @param options.padding.left  (Optional) left padding
             * @param options.margins  (Optional) It has properties for specifying the margins for each side
             * @param options.margins.top  (Optional) top margin
             * @param options.margins.bottom  (Optional) top margin
             * @param options.margins.right  (Optional) right margin
             * @param options.margins.left  (Optional) left margin
             * @param options.layoutstyle  (Optional) layout style to be used for parent layout
             * @param options.layoutstyle.left  (Optional) left position
             * @param options.layoutstyle.right  (Optional) right position
             * @param options.layoutstyle.width  (Optional) width
             * @param options.layoutstyle.height  (Optional) height
             * @param options.layoutstyle.top  (Optional) top position
             * @param options.layoutstyle.bottom  (Optional) bottom position
             * @param options.layoutstyle.constraint  (Optional) layout constrains
             * @param options.layoutstyle.min-height  (Optional) minimum height
             * @param options.layoutstyle.max-height  (Optional) maximum height
             * @param options.layoutstyle.min-width  (Optional) minimum width
             * @param options.layoutstyle.max-width  (Optional) maximum width
             * @param options.children  (Optional) the child nodes to be added
             */
            constructor(options?: any | { verticalFlip?: boolean; horizontalFlip?: boolean; modelLimits?: geotoolkit.util.Rect|any; bounds?: geotoolkit.util.Rect|any; linestyle?: geotoolkit.attributes.LineStyle|any; fillstyle?: geotoolkit.attributes.FillStyle|any; padding?: any | { top?: number|string; bottom?: number|string; right?: number|string; left?: number|string; } |geotoolkit.attributes.SpaceStyle; margins?: any | { top?: number|string; bottom?: number|string; right?: number|string; left?: number|string; } |geotoolkit.attributes.SpaceStyle; layoutstyle?: any | { left?: number|string; right?: number|string; width?: number|string; height?: number|string; top?: number|string; bottom?: number|string; constraint?: geotoolkit.layout.SizeConstraint; "min-height"?: number|string; "max-height"?: number|string; "min-width"?: number|string; "max-width"?: number|string; } |geotoolkit.layout.LayoutStyle; children?: geotoolkit.scene.Node|geotoolkit.scene.Node[]|geotoolkit.util.Iterator; } );
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
             * Return preferred size to layout children
             */
            getPreferredSize(): geotoolkit.util.Rect;
            /**
             * Returns desired width of the group as a layoutable object.
             * This method is a helper method to get access to getLayoutStyle()
             */
            getDesiredWidth(): string|number;
            /**
             * Sets desired width of the group as a layoutable object
             * @param value  (Required) desired width to set
             * @param silent  (Optional) silent setting
             */
            setDesiredWidth(value: string|number, silent?: boolean): this;
            /**
             * Returns desired height of the group as a layoutable object
             * This method is a helper method to get access to getLayoutStyle()
             */
            getDesiredHeight(): string|number;
            /**
             * Sets desired height of the group as a layoutable object
             * @param value  (Required) desired height to set
             * @param silent  (Optional) silent setting
             */
            setDesiredHeight(value: string|number, silent?: boolean): this;
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
             * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
             */
            invalidateLayout(): this;
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.scene.Group): this;
            /**
             * Return true if the representation is flipped vertically
             */
            isVerticalFlip(): boolean;
            /**
             * Set vertical flip of the representation
             * @param flip  (Required) flag to set the vertical flip of the representation
             */
            setVerticalFlip(flip: boolean): this;
            /**
             * Return true if the representation is flipped horizontally
             */
            isHorizontalFlip(): boolean;
            /**
             * Set horizontal flip of the representation
             * @param enable  (Required) enable flip
             */
            setHorizontalFlip(enable: boolean): this;
            /**
             * Sets cache to be used to cache
             * @param cache  (Required) cache to be used
             * @param rebuild  (Optional) rebuild cache
             */
            setCache(cache: geotoolkit.scene.Cache, rebuild?: boolean): this;
            /**
             * Return cache strategy to be used to cache children nodes
             */
            getCache(): geotoolkit.scene.Cache;
            /**
             * Clear cache
             */
            clearCache(): this;
            /**
             * Dispose node. Clear all listeners
             * and disconnect style to avoid memory
             * leaks
             */
            dispose(): any;
            /**
             * Render node in asynchronous mode. This implementation doesn't support cache for now.
             * @param context  (Required) The rendering context to be used to draw the node
             * @param callback  (Required) callback function
             */
            renderAsync(context: geotoolkit.renderer.RenderingContext, callback: Function): this;
            /**
             * Render group
             * @param context  (Required) context to render group
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Draws a rectangle at the bounding box (in parent coordinates)
             * @param localContext  (Required) The local rendering context
             * @param bounds  (Optional) group bounds
             */
            protected drawBorder(localContext: geotoolkit.renderer.RenderingContext, bounds?: geotoolkit.util.Rect): this;
            /**
             * Return border style
             */
            getLineStyle(): geotoolkit.attributes.LineStyle;
            /**
             * Sets border color
             * Returns this
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
             * Rebuild node. This method resets state, cache, and invalidate node.
             * @param force  (Optional) optional boolean parameter that can force invalidation
             */
            rebuild(force?: boolean): this;
            /**
             * Sets bounds of the node in the parent coordinates
             * @param bounds  (Required) bound of the node in the parent coordinates
             */
            setBounds(bounds: geotoolkit.util.Rect|any): this;
            /**
             * Sets inner model limits
             * @param limits  (Required) inner limits
             */
            setModelLimits(limits: geotoolkit.util.Rect): this;
            /**
             * Get the bounds in the parents model space. If bounds are not set,
             * then parent model limits are used.
             */
            getBounds(): geotoolkit.util.Rect|any;
            /**
             * Gets model limits, the limits of this groups inside space
             */
            getModelLimits(): geotoolkit.util.Rect|any;
            /**
             * Invalidate node
             * @param bounds  (Optional) optional rectangular area to be invalidated, or force flag if rectangle is empty
             * @param force  (Optional) optional boolean parameter that can force invalidation
             */
            invalidate(bounds?: geotoolkit.util.Rect, force?: boolean): this;
            /**
             * Invalidate parent area
             * @param bounds  (Optional) area to invalidate
             * @param force  (Optional) force
             */
            invalidateParent(bounds?: geotoolkit.util.Rect, force?: boolean): this;
            /**
             * Return state of suspend state
             */
            updateSuspended(): boolean;
            /**
             * Suspend auto update
             */
            suspendUpdate(): this;
            /**
             * Resume auto update
             * @param rebuild  (Optional) force rebuild
             */
            resumeUpdate(rebuild?: boolean): this;
            /**
             * <code>getContentsTransform()</code> retrieves the world transformation
             * of the node.
             */
            getContentsTransform(): geotoolkit.util.Transformation;
            /**
             * Set Model Limits Logics to use when no Model Limits have been set
             * set to true: will use parents width and height, starting at 0
             * set to false: will use parents bounds. This is convenient method. It
             * creates @see {geotoolkit.scene.AutoModelLimitsStrategy}
             * @param mode  (Required) Model Limits Logics to be used
             */
            setAutoModelLimitsMode(mode: boolean): this;
            /**
             * Set Model Limits Logics Strategy
             * @param strategy  (Required) Model Limits logic strategy to use
             */
            setAutoModelLimitsStrategy(strategy: geotoolkit.scene.ModelLimitsStrategy): this;
            /**
             * Get Model Limits Logics Strategy
             */
            getAutoModelLimitsStrategy(): geotoolkit.scene.ModelLimitsStrategy;
            /**
             * Get Model Limits Logics to use when no Model Limits have been set
             * set to true: will use parents width and height, starting at 0
             * set to false: will use parents bounds
             */
            getAutoModelLimitsMode(): boolean;
            /**
             * Returns if picking children is enabled or not for this node.
             */
            isPickingChildrenEnabled(): boolean;
            /**
             * Enables or disables picking children
             * @param enable  (Required) enable picking children
             */
            enablePickingChildren(enable: boolean): this;
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
             * Return area without paddings. Model limits are
             * mapped to content area, where children are layout.
             */
            getContentsArea(): geotoolkit.util.Rect;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.bounds  (Optional) bounds of the group
             * @param properties.limits  (Optional) modellimits of the group
             * @param properties.verticalflip  (Optional) vertical flip of the group
             * @param properties.horizontalflip  (Optional) horizontal flip of the group
             * @param properties.pickingchildren  (Optional) enable picking children
             * @param properties.linestyle  (Optional) line style
             * @param properties.fillstyle  (Optional) fill style
             * @param properties.layoutstyle  (Optional) layout style
             * @param properties.layout  (Optional) layout to be set
             * @param properties.backgroundfillstyle  (Optional) deprecated (since 2.3) use [properties.fillstyle] instead
             * @param properties.padding  (Optional) It has properties for specifying the padding for each side. See {@link geotoolkit.attributes.SpaceStyle#setProperties}
             */
            setProperties(properties: any | { bounds?: geotoolkit.util.Rect; limits?: geotoolkit.util.Rect; verticalflip?: boolean; horizontalflip?: boolean; pickingchildren?: boolean; linestyle?: geotoolkit.attributes.LineStyle|any; fillstyle?: geotoolkit.attributes.FillStyle|any; layoutstyle?: geotoolkit.layout.LayoutStyle|any; layout?: geotoolkit.layout.Layout; backgroundfillstyle?: geotoolkit.attributes.FillStyle|any; padding?: any|geotoolkit.attributes.SpaceStyle; } ): this;
        }
        /**
         * Abstraction to calculate auto model limits
         */
        class ModelLimitsStrategy {
            /**
             * Abstraction to calculate auto model limits
             */
            constructor();
            /**
             * Adjusts model limits
             * @param model  (Required) model
             * @param modelLimits  (Required) model limits
             */
            adjustModelLimits(model: geotoolkit.scene.Group, modelLimits: geotoolkit.util.Rect): geotoolkit.util.Rect;
        }
        /**
         * Synchronize model limits with bounds in horizontal or/and vertical direction
         */
        class AutoModelLimitsStrategy extends geotoolkit.scene.ModelLimitsStrategy {
            /**
             * Synchronize model limits with bounds in horizontal or/and vertical direction
             * @param options  (Optional) options
             * @param options.horizontalDirection  (Optional) flag to set synchronization with bounds in horizontal direction
             * @param options.verticalDirection  (Optional) flag to set synchronization with bounds in vertical direction
             */
            constructor(options?: any | { horizontalDirection?: boolean; verticalDirection?: boolean; } );
            /**
             * Adjusts model limits
             * @param model  (Required) model
             * @param modelLimits  (Required) model limits
             */
            adjustModelLimits(model: geotoolkit.scene.Group, modelLimits: geotoolkit.util.Rect): geotoolkit.util.Rect;
        }
        /**
         * Implements node with four annotations by default (west, north, east and south)
         */
        class AnnotatedNode extends geotoolkit.scene.Group {
            /**
             * Implements node with four annotations by default (west, north, east and south)
             * @param model  (Optional) 
             * @param model.model  (Optional) the model to display
             * @param model.bounds  (Optional) the bounds to use
             * @param model.north  (Optional) the Array of geotoolkit.scene.Node to display on top of the model
             * @param model.south  (Optional) the Array of geotoolkit.scene.Node to display on bottom of the model
             * @param model.west  (Optional) the Array of geotoolkit.scene.Node to display on left of the model
             * @param model.east  (Optional) the Array of geotoolkit.scene.Node to display on right of the model
             * @param model.northwest  (Optional) the Array of geotoolkit.scene.Node to display on northwest corner of the model
             * @param model.northeast  (Optional) the Array of geotoolkit.scene.Node to display on northeast corner of the model
             * @param model.southwest  (Optional) the Array of geotoolkit.scene.Node to display on southwest corner of the model
             * @param model.southeast  (Optional) the Array of geotoolkit.scene.Node to display on southeast corner of the model
             * @param model.keepvisiblelimits  (Optional) keep visible model limits of the center part if size of the node is changed
             * @param model.isdatamodel  (Optional) is the model passed via first parameter the data model
             * @param model.annotationitemswrap  (Optional) wrap annotation items in constructor with a new group with zero to one limits
             */
            constructor(model?: any | { model?: geotoolkit.scene.Group; bounds?: geotoolkit.util.Rect; north?: geotoolkit.scene.Node[]|geotoolkit.scene.Node; south?: geotoolkit.scene.Node[]|geotoolkit.scene.Node; west?: geotoolkit.scene.Node[]|geotoolkit.scene.Node; east?: geotoolkit.scene.Node[]|geotoolkit.scene.Node; northwest?: geotoolkit.scene.Node[]|geotoolkit.scene.Node; northeast?: geotoolkit.scene.Node[]|geotoolkit.scene.Node; southwest?: geotoolkit.scene.Node[]|geotoolkit.scene.Node; southeast?: geotoolkit.scene.Node[]|geotoolkit.scene.Node; keepvisiblelimits?: boolean; isdatamodel?: boolean; annotationitemswrap?: boolean; } );
            /**
             * AnnotatedNode's Events enumerator
             */
            static Events: any;
            /**
             * Sets layout, not supported in this class
             * @param layout  (Required) layout
             */
            setLayout(layout: geotoolkit.layout.Layout): any;
            /**
             * get Annotation at given point
             * @param x  (Required) x coordinate in parent domain coordinates
             * @param y  (Required) y coordinate in parent domain coordinates
             */
            getAnnotationAt(x: number, y: number): geotoolkit.scene.Group;
            /**
             * get Annotation Location at given point
             * @param x  (Required) x coordinate in parent domain coordinates
             * @param y  (Required) y coordinate in parent domain coordinates
             */
            getAnnotationLocationAt(x: number, y: number): geotoolkit.layout.AnnotationLocation;
            /**
             * Gets center plot
             */
            getCenterPlot(): geotoolkit.scene.Group;
            /**
             * Gets annotation at specified location
             * @param location  (Required) Enum of annotation locations used to specify direction to insert
             */
            getAnnotation(location: geotoolkit.layout.AnnotationLocation): geotoolkit.scene.Group;
            /**
             * Helper method to add group to the annotation and layout at specified location
             * @param item  (Required) group to be inserted in the annotated node
             * @param location  (Required) Enum of annotation locations used to specify direction to insert
             */
            addItem(item: geotoolkit.scene.Group, location: geotoolkit.layout.AnnotationLocation): this;
            /**
             * Helper method to insert group to the annotation and it layout at specified location
             * @param index  (Required) index where to item to be inserted
             * @param item  (Required) group to be inserted in the annotated node
             * @param location  (Required) Enum of annotation locations used to specify direction to insert
             */
            insertItem(index: number, item: geotoolkit.scene.Group, location: geotoolkit.layout.AnnotationLocation): this;
            /**
             * Helper method to remove group from the annotation and it layout at specified location
             * @param item  (Required) group to be inserted in the annotated node
             * @param location  (Required) Enum of annotation locations used to specify direction to insert
             */
            removeItem(item: geotoolkit.scene.Group, location: geotoolkit.layout.AnnotationLocation): this;
            /**
             * Synchronizes object with a model
             * @param object  (Required) object to connect to the central component
             * @param model  (Optional) source model
             * @param orientation  (Optional) model orientation
             * @param autoSize  (Optional) true if object and model share the same device size in the orientation, true by default if not specified
             */
            connect(object: geotoolkit.scene.Group|geotoolkit.axis.Axis, model?: geotoolkit.scene.Group, orientation?: geotoolkit.util.Orientation, autoSize?: boolean): this;
            /**
             * Disconnect an object from its source model
             * @param object  (Required) object to disconnect
             */
            disconnect(object: geotoolkit.scene.Group|geotoolkit.axis.Axis): this;
            /**
             * Gets data model
             */
            getModel(): geotoolkit.scene.Group;
            /**
             * Sets data model
             * @param model  (Required) data model
             * @param keepvisiblelimits  (Optional) keep visible model limits of the center part
             * @param isdatamodel  (Optional) is the model passed the data model?
             */
            setModel(model: geotoolkit.scene.Group, keepvisiblelimits?: boolean, isdatamodel?: boolean): this;
            /**
             * Sets scale scroll strategy. <br>
             * <pre>
             * Parameter can be either:
             * (A) reference to {geotoolkit.scene.ScaleScrollStrategy} implementation
             * - or -
             * (B) a function with two parameters as follows:
             * {geotoolkit.scene.Group} data model
             * {geotoolkit.util.Transformation} input transformation to adjust
             * The function must return adjusted transformation instance.
             * </pre>
             * @param scaleScrollStrategy  (Required) scaleScrollStrategy to set
             */
            setScaleScrollStrategy(scaleScrollStrategy: geotoolkit.scene.ScaleScrollStrategy|Function): this;
            /**
             * Gets ScaleScrollStrategy ("undefined" by default)
             */
            getScaleScrollStrategy(): geotoolkit.scene.ScaleScrollStrategy|Function;
            /**
             * Attempts to set local transformation for the model.
             * NOTE: the local transformation set may not be equal
             * to tranformation passed - it depends on current
             * ScaleScrollStrategy set on the node.
             * @param transformation  (Required) transformation to set
             */
            setModelTransformation(transformation: geotoolkit.util.Transformation): this;
            /**
             * Attempts to translate the model using specified "dx" and "dy" pixels.
             * @param dx  (Required) in pixels
             * @param dy  (Required) in pixels
             */
            translateModel(dx: number, dy: number): this;
            /**
             * Attempts to scale the model using specified x and y scale factors
             * relative to {posX, posY} provided.
             * NOTE: the local transformation set may not be equal
             * to transformation passed - it depends on current
             * ScaleScrollStrategy set on the node.
             * @param fX  (Required) x scaling factor
             * @param fY  (Required) y scaling factor
             * @param posX  (Optional) x position to scale from (in pxl)
             * @param posY  (Optional) y position to scale from (in pxl)
             */
            scaleModel(fX: number, fY: number, posX?: number, posY?: number): this;
            /**
             * Attempts to set model's visible limits to specified limits.
             * NOTE: the limits set may not be equal
             * to the limit passed - it depends on current
             * ScaleScrollStrategy set on the node.
             * @param newVisibleModelLimits  (Required) limits to set
             */
            setVisibleModelLimits(newVisibleModelLimits: geotoolkit.util.Rect): this;
            /**
             * Updates underlying layout
             */
            updateLayout(): this;
            /**
             * Suspends layout update.
             */
            suspendUpdateLayout(): this;
            /**
             * Resumes layout update.
             */
            resumeUpdateLayout(): this;
            /**
             * Sets bounds of the node in its parent's coordinate system
             * @param bounds  (Required) bound of the node to set
             */
            setBounds(bounds: geotoolkit.util.Rect): this;
            /**
             * Update model limits and transform of all connected objects
             */
            updateConnectedObjects(): this;
            /**
             * This method creates an axis, put it in the
             * new group, add this group to annotated node and returns the axis and group
             * @param annotatednode  (Required) node to add axis
             * @param options  (Optional) options
             * @param options.location  (Optional) location of the axis
             * @param options.tickgenerator  (Optional) optional tick generator (by default geotoolkit.axis.AdaptiveTickGenerator is used)
             * @param options.connect  (Optional) connect axis to the center model
             * @param options.autolabelrotation  (Optional) auto label rotation {@link geotoolkit.axis.Axis.prototype.setAutoLabelRotation}
             * @param options.autolabelrotationangle  (Optional) auto label rotation {@link geotoolkit.axis.Axis.prototype.setAutoLabelRotationAngle}
             * @param options.title  (Optional) title properties {@link geotoolkit.axis.Axis.prototype.setTitle}
             */
            static createAxis(annotatednode: geotoolkit.scene.AnnotatedNode, options?: any | { location?: geotoolkit.layout.AnnotationLocation; tickgenerator?: geotoolkit.axis.TickGenerator; connect?: boolean; autolabelrotation?: boolean; autolabelrotationangle?: number; title?: any|string; } ): any;
            /**
             * This method creates text title, put it in the
             * new group, add this group to annotated node
             * and return the title and group
             * @param annotatednode  (Required) node to add title
             * @param options  (Required) options
             * @param options.text  (Optional) text to display int eh title
             * @param options.location  (Optional) location of the axis
             * @param options.textstyle  (Optional) title text style
             */
            static createTitle(annotatednode: geotoolkit.scene.AnnotatedNode, options: any | { text?: string; location?: geotoolkit.layout.AnnotationLocation; textstyle?: any|geotoolkit.attributes.TextStyle; } ): any;
        }
        /**
         * Defines a cache strategy to prerender composite node's children in a set of tiles,
         * which have a raster format. For example, it can be an image or texture. The format
         * depends on rendering engine.
         */
        class ViewCache extends geotoolkit.scene.Cache {
            /**
             * Defines a cache strategy to prerender composite node's children in a set of tiles,
             * which have a raster format. For example, it can be an image or texture. The format
             * depends on rendering engine.
             * @param tileWidth  (Optional) tile width in device coordinates
             * @param tileWidth.tileWidth  (Optional) tile width in device coordinates
             * @param tileWidth.tileHeight  (Optional) tile height in device coordinates
             * @param tileWidth.mode  (Optional) Shared mode by default
             * @param tileWidth.memoryLimit  (Optional) Upper memory limit in Megabyte, ignored when in Shared mode
     use geotoolkit.scene.TileResourceManager.getInstance().setMemoryLimit() to set memory limit in Shared mode
             * @param tileWidth.async  (Optional) true if actions are performed asynchronously
             * @param tileWidth.keepalive  (Optional) keep alive strategy, keeps tiles alive when rebuild as mach as possible
             * @param tileHeight  (Optional) tile height in device coordinates
             * @param mode  (Optional) Shared mode by default
             * @param memoryLimit  (Optional) memoryLimit Upper memory limit in Megabyte, ignored when in Shared mode
     use geotoolkit.scene.TileResourceManager.getInstance().setMemoryLimit() to set memory limit in Shared mode
             * @param async  (Optional) true if actions are performed asynchronously
             */
            constructor(tileWidth?: any | { tileWidth?: number; tileHeight?: number; mode?: geotoolkit.scene.Cache.CacheMode; memoryLimit?: number; async?: boolean; keepalive?: boolean; } |number, tileHeight?: number, mode?: geotoolkit.scene.Cache.CacheMode, memoryLimit?: number, async?: boolean);
            /**
             * Set extend
             * @param extend  (Required) overlap between 2 tiles
             */
            setExtend(extend: geotoolkit.util.Dimension): this;
            /**
             * Set keep alive strategy, keep tiles alive when rebuild as mach as possible
             * @param keepAlive  (Required) flag
             */
            setKeepAlive(keepAlive: boolean): this;
            /**
             * When this is set to true will essentially freeze the cache - tiles will no longer be created, existing tiles will be used and scaled to fit the visible bounds
             * if tiles do not exist for a particular area nothing will be rendered.
             * @param stop  (Required) flag to freeze the cache
             */
            setStopCreationOrUpdate(stop: boolean): this;
            /**
             * Returns flag which freezes the cache.
             */
            getStopCreationOrUpdate(): boolean;
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.scene.ViewCache): any;
            /**
             * Sets cache owner.
             * @param owner  (Required) node which should be cached
             */
            setOwner(owner: geotoolkit.scene.Node): this;
            /**
             * Returns cache owner.
             */
            getOwner(): geotoolkit.scene.Node;
            /**
             */
            getResourceManager(): any;
            /**
             * Returns tile width.
             */
            getTileWidth(): number;
            /**
             * Returns tile height.
             */
            getTileHeight(): number;
            /**
             * Render to context. Will only render tiles within visible model limits.
             * @param context  (Required) rendering context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Sets render content.
             * @param renderContentDelegate  (Required) external method to render tiles
             */
            setRenderContent(renderContentDelegate: Function): this;
            /**
             * Invalidates cache. Marks cache to be rendered.
             * @param bounds  (Optional) rectangular area to be invalidated
             */
            invalidate(bounds?: geotoolkit.util.Rect): any;
            /**
             * Stops all asynchronous rendering processes (if existed)
             */
            stopRenderAsync(): this;
            /**
             * Checks if cache is asynchronous
             */
            isAsync(): boolean;
            /**
             * Sets asynchrony of the cache
             * @param bool  (Optional) true if cache should be asynchronous
             */
            setAsync(bool?: boolean): this;
            /**
             * Flags the ViewCache as needing a clear / rebuild.
             * Called after zooming or when we've hit the cap for number of images
             * @param force  (Optional) force flag
             */
            rebuild(force?: boolean): this;
        }
        /**
         * Keeps handles to HTML Canvas objects so they can be re-used
         */
        class TileResourceManager {
            /**
             * Keeps handles to HTML Canvas objects so they can be re-used
             * @param memoryLimit  (Required) Upper memory limit in Megabyte
             */
            constructor(memoryLimit: number);
            /**
             * Returns upper memory limit
             */
            getMemoryLimit(): number;
            /**
             * Sets upper memory limit
             * @param memoryLimit  (Required) in MB
             */
            setMemoryLimit(memoryLimit: number): this;
            /**
             * Access surface. This function should be called whenever the surface has been drawn.
             * @param surface  (Required) surface to be released
             */
            accessSurface(surface: geotoolkit.renderer.Surface): any;
            /**
             * Returns TileResourceManager instance
             */
            static getInstance(): geotoolkit.scene.TileResourceManager;
        }
        /**
         * Abstraction to formalize an input transformation adjustment
         */
        class ScaleScrollStrategy {
            /**
             * Abstraction to formalize an input transformation adjustment
             */
            constructor();
            /**
             * Adjusts input transformation
             * @param model  (Required) 
             * @param newTr  (Required) transformation to adjust
             */
            adjustTransformation(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Modifies (if necessary) input transformation so that vertical scaling and translation is suppressed.
             * @param model  (Required) data model
             * @param newTr  (Required) requested transformation
             */
            static noVerticalScaleScroll(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Modifies (if necessary) input transformation so that horizontal scaling and translation is suppressed.
             * @param model  (Required) data model
             * @param newTr  (Required) requested transformation
             */
            static noHorizontalScaleScroll(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Modifies (if necessary) input transformation so that the model's visible limits do not go beyond data model limits.
             * @param model  (Required) data model
             * @param newTr  (Required) requested transformation
             */
            static restrictVisibleModelLimits(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Modifies input transformation so that the model's visible limits do not go beyond data model limits if visible area size is smaller
             * than data model size; aligns position of the model in the opposite case.
             * @param model  (Required) data model
             * @param newTr  (Required) requested transformation
             * @param horizontalAlignment  (Optional) horizontal alignment It can be "left", "right" or "center"
             * @param verticalAlignment  (Optional) vertical alignment. It can be "top", "bottom" or "center"
             */
            static anchoredTransformationAdjustment(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation, horizontalAlignment?: string, verticalAlignment?: string): geotoolkit.util.Transformation;
            /**
             * KeepAspectRatio scaling modes
             */
            static KeepAspectRatioScalingMode: any;
            /**
             * Modifies input transformation so that the model scene transformation's "getScaleY()/getScaleY()==aspectRatio".
             * @param model  (Required) data model
             * @param newLocalTr  (Required) requested local transformation
             * @param aspectRatio  (Optional) y-scale to x-scale ratio; must be greater than "0"
             * @param mode  (Optional) scaling mode
             */
            static keepAspectRatioAdjustment(model: geotoolkit.scene.Group, newLocalTr: geotoolkit.util.Transformation, aspectRatio?: number, mode?: geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode): geotoolkit.util.Transformation;
            /**
             * Modifies (if necessary) input transformation so that vertical scaling and translation is suppressed.
             * @param model  (Required) data model
             * @param newTr  (Required) requested transformation
             */
            static NoVerticalScaleScroll(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Modifies input transformation so that the model's visible limits do not go beyond data model limits if visible area size is smaller
             * than data model size; aligns position of the model in the opposite case.
             * @param model  (Required) data model
             * @param newTr  (Required) requested transformation
             * @param horizontalAlignment  (Optional) horizontal alignment It can be "left", "right" or "center"
             * @param verticalAlignment  (Optional) vertical alignment. It can be "top", "bottom" or "center"
             */
            static AnchoredTransformationAdjustment(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation, horizontalAlignment?: string, verticalAlignment?: string): geotoolkit.util.Transformation;
            /**
             * Modifies (if necessary) input transformation so that the model's visible limits do not go beyond data model limits.
             * @param model  (Required) data model
             * @param newTr  (Required) requested transformation
             */
            static RestrictVisibleModelLimits(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Modifies input transformation so that the model scene transformation's "getScaleY()/getScaleY()==aspectRatio".
             * @param model  (Required) data model
             * @param newLocalTr  (Required) requested local transformation
             * @param aspectRatio  (Optional) y-scale to x-scale ratio; must be greater than "0"
             * @param mode  (Optional) scaling mode
             */
            static KeepAspectRatioAdjustment(model: geotoolkit.scene.Group, newLocalTr: geotoolkit.util.Transformation, aspectRatio?: number, mode?: geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode): geotoolkit.util.Transformation;
            /**
             * Modifies (if necessary) input transformation so that horizontal scaling and translation is suppressed.
             * @param model  (Required) data model
             * @param newTr  (Required) requested transformation
             */
            static NoHorizontalScaleScroll(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
        }
        /**
         * NoHorizontalScaleScrollStrategy input transformation adjustment. horizontal part of scaling/scrolling is blocked
         */
        class NoHorizontalScaleScrollStrategy extends geotoolkit.scene.ScaleScrollStrategy {
            /**
             * NoHorizontalScaleScrollStrategy input transformation adjustment. horizontal part of scaling/scrolling is blocked
             */
            constructor();
            /**
             * Adjusts input transformation the way its horizonal components are ignored
             * @param model  (Required) data model
             * @param newTr  (Required) transformation to adjust
             */
            adjustTransformation(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
        }
        /**
         * NoVerticalScaleScrollStrategy input transformation adjustment. vertical part of scaling/scrolling is blocked
         */
        class NoVerticalScaleScrollStrategy extends geotoolkit.scene.ScaleScrollStrategy {
            /**
             * NoVerticalScaleScrollStrategy input transformation adjustment. vertical part of scaling/scrolling is blocked
             */
            constructor();
            /**
             * Adjusts input transformation the way its vertical components are ignored
             * @param model  (Required) data model
             * @param newTr  (Required) transformation to adjust
             */
            adjustTransformation(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
        }
        /**
         * RestrictVisibleModelLimitsStrategy input transformation adjustment is restricted based on the options supplied.<br>
         * This is same as either:<br>
         * "ScaleScrollStrategy.RestrictVisibleModelLimits + ScaleScrollStrategy.NoHorizontalScaleScroll" <br>
         *                -or- <br>
         * "ScaleScrollStrategy.RestrictVisibleModelLimits + ScaleScrollStrategy.NoVerticalScaleScroll" <br>
         * depending to the options applied.
         */
        class RestrictVisibleModelLimitsStrategy extends geotoolkit.scene.ScaleScrollStrategy {
            /**
             * RestrictVisibleModelLimitsStrategy input transformation adjustment is restricted based on the options supplied.<br>
             * This is same as either:<br>
             * "ScaleScrollStrategy.RestrictVisibleModelLimits + ScaleScrollStrategy.NoHorizontalScaleScroll" <br>
             *                -or- <br>
             * "ScaleScrollStrategy.RestrictVisibleModelLimits + ScaleScrollStrategy.NoVerticalScaleScroll" <br>
             * depending to the options applied.
             * @param options  (Optional) 
             * @param options.nohorizontalscalescroll  (Optional) flag to set nohorizontalscalescroll
             * @param options.noverticalscalescroll  (Optional) flag to set noverticalscalescroll
             */
            constructor(options?: any | { nohorizontalscalescroll?: boolean; noverticalscalescroll?: boolean; } );
            /**
             * Adjusts input transformation
             * @param model  (Required) data model
             * @param newTr  (Required) transformation to adjust
             */
            adjustTransformation(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
        }
        /**
         * AnchoredTransformationAdjustmentStrategy input transformation adjustment <br>
         * This adjustments is same as "ScaleScrollStrategy.KeepAspectRatioAdjustment + ScaleScrollStrategy.AnchoredTransformationAdjustment"
         */
        class AnchoredTransformationAdjustmentStrategy extends geotoolkit.scene.ScaleScrollStrategy {
            /**
             * AnchoredTransformationAdjustmentStrategy input transformation adjustment <br>
             * This adjustments is same as "ScaleScrollStrategy.KeepAspectRatioAdjustment + ScaleScrollStrategy.AnchoredTransformationAdjustment"
             * @param options  (Optional) 
             * @param options.horizontalAlignment  (Optional) horizontal alignment
             * @param options.verticalAlignment  (Optional) vertical alignment
             * @param options.keepAspectRatio  (Optional) keep aspect ratio flag
             * @param options.aspectRatio  (Optional) y-scale to x-scale ratio; must be greater than "0"
             * @param options.mode  (Optional) scaling mode
             */
            constructor(options?: any | { horizontalAlignment?: string; verticalAlignment?: string; keepAspectRatio?: boolean; aspectRatio?: number; mode?: geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode; } );
            /**
             * Adjusts input transformation
             * @param model  (Required) modle to adjaust transformation
             * @param newLocalTr  (Required) transformation to adjust
             */
            adjustTransformation(model: geotoolkit.scene.Group, newLocalTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
        }
        /**
         * KeepAspectRatioRestrictedAnchoredStrategy input transformation adjustment. This keeps aspect ratio based on the options supplied and also aligns the model bounds.
         */
        class KeepAspectRatioRestrictedAnchoredStrategy extends geotoolkit.scene.ScaleScrollStrategy {
            /**
             * KeepAspectRatioRestrictedAnchoredStrategy input transformation adjustment. This keeps aspect ratio based on the options supplied and also aligns the model bounds.
             * @param options  (Optional) 
             * @param options.horizontalAlignment  (Optional) horizontal alignment
             * @param options.verticalAlignment  (Optional) vertical alignment
             * @param options.aspectRatio  (Optional) y-scale to x-scale ratio
             * @param options.mode  (Optional) scaling mode
             */
            constructor(options?: any | { horizontalAlignment?: string; verticalAlignment?: string; aspectRatio?: number; mode?: geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode; } );
            /**
             * Adjusts input transformation
             * @param model  (Required) modle to adjust transformation
             * @param newTr  (Required) transformation to adjust
             */
            adjustTransformation(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
        }
        /**
         * KeepAspectRestrictVisibleStrategy input transformation adjustment. This is same as "RestrictVisibleModelLimitsStrategy + KeepAspectRatioRestrictedAnchoredStrategy"
         */
        class KeepAspectRestrictVisibleStrategy extends geotoolkit.scene.ScaleScrollStrategy {
            /**
             * KeepAspectRestrictVisibleStrategy input transformation adjustment. This is same as "RestrictVisibleModelLimitsStrategy + KeepAspectRatioRestrictedAnchoredStrategy"
             * @param options  (Optional) JSON object
             * @param options.horizontalAlignment  (Optional) horizontal alignment
             * @param options.verticalAlignment  (Optional) vertical alignment
             * @param options.aspectRatio  (Optional) y-scale to x-scale ratio
             * @param options.mode  (Optional) scaling mode
             */
            constructor(options?: any | { horizontalAlignment?: string; verticalAlignment?: string; aspectRatio?: number; mode?: geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode; } );
            /**
             * Adjusts input transformation
             * @param model  (Required) data model
             * @param newTr  (Required) transformation to adjust
             */
            adjustTransformation(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
        }
        /**
         * KeepScaleAspectRatioStrategy input transformation adjustment. Keeps transformation scale when parent bounds were changed,
         * if not possible scales with keeping aspect ratio
         */
        class KeepScaleAspectRatioStrategy extends geotoolkit.scene.ScaleScrollStrategy {
            /**
             * KeepScaleAspectRatioStrategy input transformation adjustment. Keeps transformation scale when parent bounds were changed,
             * if not possible scales with keeping aspect ratio
             * @param options  (Optional) JSON object
             * @param options.horizontalAlignment  (Optional) horizontal alignment
             * @param options.verticalAlignment  (Optional) vertical alignment
             * @param options.aspectRatio  (Optional) y-scale to x-scale ratio
             * @param options.wrapped  (Optional) true if model limits should be wrapped
             */
            constructor(options?: any | { horizontalAlignment?: string; verticalAlignment?: string; aspectRatio?: number; wrapped?: boolean; } );
            /**
             * Adjusts input transformation
             * @param model  (Required) data model
             * @param newTr  (Required) transformation to adjust
             */
            adjustTransformation(model: geotoolkit.scene.Group, newTr: geotoolkit.util.Transformation): geotoolkit.util.Transformation;
            /**
             * Sets scale scroll options
             * @param options  (Optional) JSON object
             * @param options.horizontalAlignment  (Optional) horizontal alignment
             * @param options.verticalAlignment  (Optional) vertical alignment
             * @param options.aspectRatio  (Optional) y-scale to x-scale ratio
             * @param options.wrapped  (Optional) true if model limits should be wrapped
             */
            setOptions(options?: any | { horizontalAlignment?: string; verticalAlignment?: string; aspectRatio?: number; wrapped?: boolean; } ): this;
        }
        /**
         * Defines helper method(s) to create annotation title instance
         */
        class AnnotationTitleFactory {
            /**
             * Defines helper method(s) to create annotation title instance
             */
            constructor();
            /**
             * Returns instance of the factory
             */
            static getInstance(): geotoolkit.scene.AnnotationTitleFactory;
            /**
             * Creates annotation title
             * @param options  (Required) annotation title options
             * @param options.text  (Required) text
             * @param options.textstyle  (Optional) text style
             * @param options.textstyle.color  (Optional) text color
             * @param options.textstyle.font  (Optional) text font
             * @param options.sizeisindevicespace  (Optional) device size flag
             */
            create(options: any | { text?: string; textstyle?: geotoolkit.attributes.TextStyle|any | { color?: string; font?: string; } ; sizeisindevicespace?: boolean; } ): geotoolkit.scene.shapes.Text;
        }
        /**
         * Define an interface to support a simple iteration over a nodes
         */
        interface INodeEnumerable {
            /**
             * Enumerate children nodes
             * @param callback  (Required) callback
             * @param target  (Required) target
             */
            enumerateNodes(callback: Function, target: any): any;
        }
        module exports {
            /**
             * Enum of annotation locations:
             * for annotated layout
             *      - Center : 0
             *      - North : 2
             *      - South : 4
             *      - West : 1
             *      - East : 3
             */
            var AnnotationLocation: any;
            /**
             * Enum for linear layouts:
             *      - Vertical : 0
             *      - Horizontal : 1
             */
            var LinearLocation: any;
            /**
             * Enum of paper orientations:
             *       - Portrait : 'Portrait'
             *       - Landscape : 'Landscape'
             */
            var PaperOrientation: any;
            /**
             * Enum of paper scaling options:
             *     - AsIs : 'AsIs'
             *     - FitWidth : 'FitWidth'
             *     - FitHeight : 'FitHeight'
             *     - FitBoth : 'FitBoth'
             */
            var ScalingOptions: any;
            /**
             * Utility class to export nodes of various types for PDF output.
             */
            class NodeExport {
                /**
                 * Utility class to export nodes of various types for PDF output.
                 */
                constructor();
                /**
                 * Exports node to image.
                 * @param node  (Required) node to be exported
                 * @param imageWidth  (Optional) width
                 * @param imageHeight  (Optional) height
                 * @param horizontalFlip  (Optional) flag to set horizontal flip
                 * @param verticalFlip  (Optional) flag to set vertical flip
                 * @param modelLimits  (Optional) model limits
                 * @param handler  (Optional) called when image is ready
                 */
                static exportToImage(node: geotoolkit.scene.Node|any, imageWidth?: number, imageHeight?: number, horizontalFlip?: boolean, verticalFlip?: boolean, modelLimits?: geotoolkit.util.Rect, handler?: Function): HTMLElement;
                /**
                 * Exports node imageUrl
                 * @param node  (Required) node
                 * @param imageWidth  (Optional) width
                 * @param imageHeight  (Optional) height
                 * @param horizontalFlip  (Optional) flag to set horizontal flip
                 * @param verticalFlip  (Optional) flag to set vertical flip
                 * @param modelLimits  (Optional) model limits. if it is not specified then node model limits is used.
                 */
                static exportToImageUrl(node: geotoolkit.scene.Node|any, imageWidth?: number, imageHeight?: number, horizontalFlip?: boolean, verticalFlip?: boolean, modelLimits?: geotoolkit.util.Rect): string;
                /**
                 * Export to surface
                 * @param node  (Required) node to export
                 * @param imageWidth  (Required) image width
                 * @param imageHeight  (Required) image height
                 * @param horizontalFlip  (Required) flag to set horizontal flip
                 * @param verticalFlip  (Required) flag to set vertical flip
                 * @param modelLimits  (Optional) model limits. model limits. if it is not specified then node model limits is used.
                 */
                static exportToSurface(node: geotoolkit.scene.Node, imageWidth: number, imageHeight: number, horizontalFlip: boolean, verticalFlip: boolean, modelLimits?: geotoolkit.util.Rect): geotoolkit.renderer.Surface;
                /**
                 * Export the node using a given context.
                 * This will separate the scene into pages using print settings, header and footer information
                 * @param context  (Required) rendering context
                 * @param document  (Required) Document class representing a pdf document
                 * @param printSettings  (Required) print settings
                 */
                static render(context: geotoolkit.renderer.DocumentRenderingContext, document: geotoolkit.scene.exports.Document, printSettings: any): any;
                /**
                 * Compute page settings
                 * @param document  (Required) 
                 * @param printSettings  (Required) 
                 * @param drawWestToEast  (Required) 
                 */
                static computeDocumentSettings(document: geotoolkit.scene.exports.Document, printSettings: any, drawWestToEast: boolean): {pageSettings:{X:number;Y:number;ScaleFactor:{X:number;Y:number};PageSpace:{X:number;Y:number};Page:geotoolkit.scene.exports.PaperFormat;Margin:{Top:number;Bottom:number;Left:number;Right:number};Continuous:boolean};FixedDimension:geotoolkit.util.Dimension;ScaledDimension:any}|any;
                /**
                 * @param document  (Required) Document class representing a pdf document
                 * @param docSettings  (Required) 
                 * @param header  (Required) 
                 * @param footer  (Required) 
                 * @param pixelUnit  (Required) unit
                 * @param outputUnit  (Required) device unit
                 */
                protected static computeElementsSizeInPages(document: geotoolkit.scene.exports.Document, docSettings: any, header: geotoolkit.scene.exports.PageElement, footer: geotoolkit.scene.exports.PageElement, pixelUnit: geotoolkit.util.AbstractUnit, outputUnit: geotoolkit.util.AbstractUnit): any[];
            }
            /**
             * Utility class used to create page component such as header and footer in a document. Used in PDF output.
             */
            class PageElement {
                /**
                 * Utility class used to create page component such as header and footer in a document. Used in PDF output.
                 * @param width  (Required) width of the component
                 * @param height  (Required) height of the component
                 */
                constructor(width: number, height: number);
                /**
                 * draw component
                 * @param context  (Required) RenderingContext
                 * @param pageInfo  (Optional) optional-contains all data about the pdf page
                 */
                render(context: geotoolkit.renderer.RenderingContext, pageInfo?: any): any;
                /**
                 * get the defaultSize of the component
                 */
                getDefaultSize(): geotoolkit.util.Dimension;
                /**
                 * get the maximum size of the component
                 */
                getMaximumSize(): geotoolkit.util.Dimension;
            }
            /**
             * Footer Component that print the page number of the document, and any additional data
             */
            class FooterComponent extends geotoolkit.scene.exports.PageElement {
                /**
                 * Footer Component that print the page number of the document, and any additional data
                 * @param width  (Required) paper width
                 * @param height  (Required) paper height
                 * @param textStyle  (Required) text style
                 */
                constructor(width: number, height: number, textStyle: string);
                /**
                 * render the footer
                 * @param context  (Required) PdfRenderingContext
                 * @param pageInfo  (Optional) JSON Object
                 * @param pageInfo.Margin  (Optional) JSON Object
                 * @param pageInfo.Margin.Top  (Optional) Top margin
                 * @param pageInfo.Margin.Bottom  (Optional) Bottom margin
                 * @param pageInfo.Margin.Left  (Optional) Left margin
                 * @param pageInfo.Margin.Right  (Optional) Right margin
                 * @param pageInfo.Page  (Optional) 
                 * @param pageInfo.currentPage  (Optional) 
                 * @param pageInfo.numberPage  (Optional) 
                 * @param pageInfo.date  (Optional) 
                 * @param pageInfo.title  (Optional) 
                 */
                render(context: geotoolkit.renderer.DocumentRenderingContext, pageInfo?: any | { Margin?: any | { Top?: number; Bottom?: number; Left?: number; Right?: number; } ; Page?: geotoolkit.scene.exports.AbstractPaperFormat; currentPage?: number; numberPage?: number; date?: Date; title?: string; } ): any;
            }
            /**
             * Header Component that print the title and the date of the pdf document
             */
            class HeaderComponent extends geotoolkit.scene.exports.PageElement {
                /**
                 * Header Component that print the title and the date of the pdf document
                 * @param width  (Required) 
                 * @param height  (Required) 
                 * @param title  (Required) 
                 * @param date  (Required) 
                 * @param textStyle  (Required) 
                 */
                constructor(width: number, height: number, title: string, date: Date, textStyle: string);
                /**
                 * print title and date in the context
                 * @param context  (Required) PdfRenderingContext
                 * @param pageInfo  (Optional) JSON Object
                 * @param pageInfo.Margin  (Optional) JSON Object
                 * @param pageInfo.Margin.Top  (Optional) Top margin
                 * @param pageInfo.Margin.Bottom  (Optional) Bottom margin
                 * @param pageInfo.Margin.Left  (Optional) Left margin
                 * @param pageInfo.Margin.Right  (Optional) Right margin
                 * @param pageInfo.Page  (Optional) 
                 * @param pageInfo.currentPage  (Optional) 
                 * @param pageInfo.numberPage  (Optional) 
                 * @param pageInfo.date  (Optional) 
                 * @param pageInfo.title  (Optional) 
                 */
                render(context: geotoolkit.renderer.DocumentRenderingContext, pageInfo?: any | { Margin?: any | { Top?: number; Bottom?: number; Left?: number; Right?: number; } ; Page?: geotoolkit.scene.exports.AbstractPaperFormat; currentPage?: number; numberPage?: number; date?: Date; title?: string; } ): any;
                /**
                 * get title
                 */
                getTitle(): string;
                /**
                 * get date
                 */
                getDate(): Date;
            }
            /**
             * Abstract parent class used for PDF output.
             */
            class AbstractDocumentElement {
                /**
                 * Abstract parent class used for PDF output.
                 */
                constructor();
                /**
                 * Compute the dimension in the layout, this dimension is described by a fixed dimension and a scaled dimension
                 */
                getLayoutedDimension(): any;
                /**
                 * render the document in the context
                 * @param context  (Required) rendering context
                 * @param position  (Required) position of current document element relative to the parent document
                 */
                render(context: geotoolkit.renderer.DocumentRenderingContext, position: geotoolkit.util.Point): any;
                /**
                 * Render document in asynchronous mode. Default implementation creates call method "render" inside
                 * @param context  (Required) rendering context
                 * @param position  (Required) position of current document element relative to the parent document
                 * @param callback  (Required) callback function
                 */
                renderAsync(context: geotoolkit.renderer.DocumentRenderingContext, position: geotoolkit.util.Point, callback: Function): any;
                /**
                 * Used to restore object's state after exporting
                 */
                endExport(): any;
                /**
                 * Used to prepare object before exporting
                 */
                beginExport(): any;
                /**
                 * Set the document bounds
                 * @param rect  (Optional) document bounds
                 */
                updateLayout(rect?: geotoolkit.util.Rect): any;
                /**
                 * set the document scale depending of the parameters isScaledVertically and isScaledHorizontally
                 * @param sx  (Required) scale factor in x direction
                 * @param sy  (Required) scale factor in y direction
                 */
                setScale(sx: number, sy: number): this;
                /**
                 * set the document translation
                 * @param x  (Required) offset x coordinate
                 * @param y  (Required) offset y coordinate
                 */
                setTranslation(x: number, y: number): this;
            }
            /**
             * Document Element class that is used to layout the pdf document
             */
            class NodeAdapter extends geotoolkit.scene.exports.AbstractDocumentElement implements geotoolkit.layout.ILayoutable {
                /**
                 * Document Element class that is used to layout the pdf document
                 * @param node  (Required) node
                 * @param exportLimits  (Required) export limits in the bounds coordinates
                 */
                constructor(node: geotoolkit.scene.Group, exportLimits: geotoolkit.util.Rect);
                /**
                 * Enum of node adapter scaling options:
                 *     - TrueScale : 'TrueScale'
                 *     - PixelScale : 'PixelScale'
                 */
                static ScaleMode: any;
                /**
                 * Returns node adapter scale mode
                 */
                getScaleMode(): geotoolkit.scene.exports.NodeAdapter.ScaleMode;
                /**
                 * Set node adapter scale mode
                 * @param scaleMode  (Required) scale mode
                 */
                setScaleMode(scaleMode: geotoolkit.scene.exports.NodeAdapter.ScaleMode): this;
                /**
                 * Sets bounds of the node
                 * @param bounds  (Required) bound of the node
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
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
                 * Sets export limits of the node
                 * @param bounds  (Required) bound of the node
                 */
                setExportLimits(bounds: geotoolkit.util.Rect): this;
                /**
                 * Returns export limits
                 */
                getExportLimits(): geotoolkit.util.Rect;
                /**
                 * Return bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Compute dimensions in the layout, this dimension is described by a fixed dimension and a scaled dimension
                 */
                getLayoutedDimension(): any;
                /**
                 * get the Element node
                 */
                getNode(): geotoolkit.scene.Group;
                /**
                 * return local transformation
                 */
                getLocalTransformation(): geotoolkit.util.Transformation;
                /**
                 * set local transformation
                 * @param localTransformation  (Required) local transformation
                 */
                setLocalTransformation(localTransformation: geotoolkit.util.Transformation): this;
                /**
                 * render the document in the context
                 * @param context  (Required) rendering context
                 * @param position  (Required) position of the current document relative to the parent document
                 */
                render(context: geotoolkit.renderer.DocumentRenderingContext, position: geotoolkit.util.Point): any;
                /**
                 * render the document in the context
                 * @param context  (Required) rendering context
                 * @param position  (Required) position of the current document relative to the parent document
                 * @param callback  (Required) callback function
                 */
                renderAsync(context: geotoolkit.renderer.DocumentRenderingContext, position: geotoolkit.util.Point, callback: Function): any;
                /**
                 * set the document translation
                 * @param x  (Required) offset x
                 * @param y  (Required) offset y
                 */
                setTranslation(x: number, y: number): this;
                /**
                 * set the document scale depending of the parameters isScaledVertically and isScaledHorizontally
                 * @param sx  (Required) scale factor in x direction
                 * @param sy  (Required) scale factor in y direction
                 */
                setScale(sx: number, sy: number): this;
                /**
                 * update the layout of the document
                 * @param rect  (Required) rect to layout area
                 */
                updateLayout(rect: geotoolkit.util.Rect): any;
            }
            /**
             * Document Element class that is used to layout the pdf document
             */
            class DocumentElement extends geotoolkit.scene.exports.AbstractDocumentElement {
                /**
                 * Document Element class that is used to layout the pdf document
                 * @param node  (Required) node
                 * @param isScaledVertically  (Required) flag to scale vertically
                 * @param isScaledHorizontally  (Required) flag to scale horizontally
                 */
                constructor(node: geotoolkit.scene.Group, isScaledVertically: boolean, isScaledHorizontally: boolean);
                /**
                 * Compute dimensions in the layout, this dimension is described by a fixed dimension and a scaled dimension
                 */
                getLayoutedDimension(): any;
                /**
                 * get the Element node
                 */
                getNode(): geotoolkit.scene.Group;
                /**
                 * get if the document element is scaled vertically
                 */
                isScaledVertically(): boolean;
                /**
                 * get if the document element is scaled horizontally
                 */
                isScaledHorizontally(): boolean;
                /**
                 * render the document in the context
                 * @param context  (Required) PdfRendering Context
                 * @param position  (Required) position of the current document relative to the parent document
                 */
                render(context: geotoolkit.renderer.DocumentRenderingContext, position: geotoolkit.util.Point): any;
                /**
                 * set the document translation
                 * @param x  (Required) offset x
                 * @param y  (Required) offset y
                 */
                setTranslation(x: number, y: number): this;
                /**
                 * set the document scale depending of the parameters isScaledVertically and isScaledHorizontally
                 * @param sx  (Required) scale factor in x
                 * @param sy  (Required) scale factor in y
                 */
                setScale(sx: number, sy: number): this;
                /**
                 * update the layout of the document
                 * @param rect  (Required) rect to layout area
                 */
                updateLayout(rect: geotoolkit.util.Rect): any;
            }
            /**
             * CompositeDocumentElement class contains layouts as children for PDF rendering
             */
            class CompositeDocumentElement extends geotoolkit.scene.exports.AbstractDocumentElement implements geotoolkit.layout.ILayoutable {
                /**
                 * CompositeDocumentElement class contains layouts as children for PDF rendering
                 * @param list  (Required) of {geotoolkit.scene.exports.AbstractDocumentElement}
DocumentElement
                 * @param layout  (Optional) layout of elements
                 */
                constructor(list: geotoolkit.scene.exports.AbstractDocumentElement[], layout?: geotoolkit.scene.exports.AnnotatedLayout|geotoolkit.scene.exports.LinearLayout|geotoolkit.layout.Layout);
                /**
                 * Add DocumentElement as child
                 * @param child  (Required) Document Element
                 */
                addChild(child: geotoolkit.scene.exports.AbstractDocumentElement|geotoolkit.scene.exports.IExportable): geotoolkit.scene.exports.AbstractDocumentElement;
                /**
                 * Set child at specific index
                 * @param index  (Required) index where to set the child
                 * @param child  (Required) Document Element
                 */
                setChild(index: number, child: geotoolkit.scene.exports.AbstractDocumentElement): this;
                /**
                 * Add child at specific index
                 * @param index  (Required) index where to insert the child
                 * @param child  (Required) Document Element
                 */
                insertChildAtIndex(index: number, child: geotoolkit.scene.exports.DocumentElement): any;
                /**
                 * Clear all children
                 */
                clearChild(): any;
                /**
                 * Get child at index.
                 * @param index  (Required) index where to get the child
                 */
                getChild(index: number): geotoolkit.scene.exports.AbstractDocumentElement;
                /**
                 * Get the number of children in the composite document element.
                 */
                getChildrenCount(): number;
                /**
                 * Get index of a specified element.
                 * @param element  (Required) document element
                 */
                getIndex(element: geotoolkit.scene.exports.DocumentElement): number;
                /**
                 * Gets the list of children.
                 */
                getList(): any[];
                /**
                 * Compute dimensions in the layout, this dimension is described by a fixed dimension and a scaled dimension.
                 */
                getLayoutedDimension(): any;
                /**
                 * Render the document in the context.
                 * @param context  (Required) rendering context
                 * @param position  (Required) position of the current document relative to the parent document
                 */
                render(context: geotoolkit.renderer.DocumentRenderingContext, position: geotoolkit.util.Point): any;
                /**
                 * set the layout
                 * @param layout  (Required) current layout
                 */
                setLayout(layout: geotoolkit.scene.exports.AnnotatedLayout|geotoolkit.scene.exports.LinearLayout|geotoolkit.layout.Layout): this;
                /**
                 * set the document scale depending of the parameters isScaledVertically and isScaledHorizontally
                 * @param sx  (Required) scale factor if scaledVertically
                 * @param sy  (Required) scale factor if ScaledHorizontally
                 */
                setScale(sx: number, sy: number): this;
                /**
                 * set the document translation
                 * @param x  (Required) offset x coordinate
                 * @param y  (Required) offset y coordinate
                 */
                setTranslation(x: number, y: number): this;
                /**
                 * Return preferred size to layout children
                 * @param rect  (Optional) layout area of document
                 */
                getPreferredSize(rect?: geotoolkit.util.Rect): geotoolkit.util.Rect;
                /**
                 * Sets bounds of the document if it is a part of layout
                 * @param bounds  (Required) bound of the node
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Return bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Specify desired layout style
                 * @param layoutStyle  (Required) desired layout style
                 */
                setLayoutStyle(layoutStyle: geotoolkit.layout.LayoutStyle|any): geotoolkit.scene.exports.NodeAdapter;
                /**
                 * Return desired layout style
                 */
                getLayoutStyle(): geotoolkit.layout.LayoutStyle;
                /**
                 * update the layout of the document
                 * @param rect  (Optional) layout area of document
                 */
                updateLayout(rect?: geotoolkit.util.Rect): any;
            }
            /**
             * Document class represents a pdf document
             * this class can contains a :
             *              - root element { geotoolkit.scene.exports.CompositeDocumentElement || geotoolkit.scene.exports.DocumentElement}
             *              - header : pdf header component {@link geotoolkit.scene.exports.PageElement}
             *              - footer : pdf footer component {@link geotoolkit.scene.exports.PageElement}
             */
            class Document {
                /**
                 * Document class represents a pdf document
                 * this class can contains a :
                 *              - root element { geotoolkit.scene.exports.CompositeDocumentElement || geotoolkit.scene.exports.DocumentElement}
                 *              - header : pdf header component {@link geotoolkit.scene.exports.PageElement}
                 *              - footer : pdf footer component {@link geotoolkit.scene.exports.PageElement}
                 * @param root  (Required) 
                 * @param pageHeader  (Required) 
                 * @param pageFooter  (Required) 
                 * @param trueScale  (Required) enable true scale
                 * @param document  (Required) options
                 */
                constructor(root: geotoolkit.scene.exports.CompositeDocumentElement|geotoolkit.scene.exports.DocumentElement, pageHeader: geotoolkit.scene.exports.PageElement, pageFooter: geotoolkit.scene.exports.PageElement, trueScale: boolean, document: any);
                /**
                 * Returns options
                 */
                getOptions(): any;
                /**
                 * Set Root document
                 * @param root  (Required) Root document
                 */
                setRoot(root: geotoolkit.scene.exports.CompositeDocumentElement|geotoolkit.scene.exports.DocumentElement): this;
                /**
                 * Get root document
                 */
                getRoot(): geotoolkit.scene.exports.CompositeDocumentElement|geotoolkit.scene.exports.DocumentElement;
                /**
                 * Used to restore object's state after exporting
                 */
                endExport(): any;
                /**
                 * Used to prepare object before exporting
                 */
                beginExport(): any;
                /**
                 * Set PDF Page Header component.
                 * @param pageHeader  (Required) pdf Header component
                 */
                setHeader(pageHeader: geotoolkit.scene.exports.PageElement): any;
                /**
                 * Get PDF Page Header component
                 */
                getHeader(): geotoolkit.scene.exports.PageElement;
                /**
                 * Set PDF Page Footer Component
                 * @param pageFooter  (Required) pdf Footer Component
                 */
                setFooter(pageFooter: geotoolkit.scene.exports.PageElement): any;
                /**
                 * Get PDF Page Footer Component
                 */
                getFooter(): geotoolkit.scene.exports.PageElement;
                /**
                 * Set PDF Page Header component.
                 * @param pageHeader  (Required) Page Header
                 */
                setPageHeader(pageHeader: geotoolkit.scene.exports.PageElement): this;
                /**
                 * Get PDF Page Header component
                 */
                getPageHeader(): geotoolkit.scene.exports.PageElement;
                /**
                 * Set PDF Page Footer Component
                 * @param pageFooter  (Required) Page Footer
                 */
                setPageFooter(pageFooter: geotoolkit.scene.exports.PageElement): this;
                /**
                 * Get PDF Page Footer Component
                 */
                getPageFooter(): geotoolkit.scene.exports.PageElement;
                /**
                 * Set PDF Document Header component.
                 * @param docHeader  (Required) Document Header
                 */
                setDocumentHeader(docHeader: geotoolkit.scene.exports.PageElement): this;
                /**
                 * Get PDF Document Header component
                 */
                getDocumentHeader(): geotoolkit.scene.exports.PageElement;
                /**
                 * Set PDF Document Footer Component
                 * @param docFooter  (Required) Document Footer
                 */
                setDocumentFooter(docFooter: geotoolkit.scene.exports.PageElement): this;
                /**
                 * Get PDF Document Footer Component
                 */
                getDocumentFooter(): geotoolkit.scene.exports.PageElement;
                /**
                 * Get true if true scale mode is enabled
                 */
                getTrueScale(): boolean;
            }
            class LinearLayout {
                /**
                 * @param parent  (Required) 
                 * @param orientation  (Required) 'horizontal' or 'vertical'
                 */
                constructor(parent: geotoolkit.scene.exports.CompositeDocumentElement, orientation: geotoolkit.scene.exports.LinearLocation);
                /**
                 * set the parent
                 * @param parent  (Required) parent
                 */
                setParent(parent: geotoolkit.scene.exports.CompositeDocumentElement): this;
                /**
                 * set the layout orientation
                 * @param orientation  (Required) layout orientation
                 */
                setOrientation(orientation: geotoolkit.scene.exports.LinearLocation): this;
                /**
                 * compute the dimension in the layout this dimension is represented by a fixed dimension and a scaled dimension
                 */
                getLayoutedDimension(): any;
                /**
                 * update the position of elements in the layout
                 */
                updateLayout(): any;
            }
            /**
             * Layout class that represents an AnnotatedLayout
             */
            class AnnotatedLayout {
                /**
                 * Layout class that represents an AnnotatedLayout
                 * @param parent  (Required) parent document element of this layout
                 */
                constructor(parent: geotoolkit.scene.exports.CompositeDocumentElement);
                /**
                 * Set the parent of this annotated layout.
                 * @param parent  (Required) parent document element of this layout
                 */
                setParent(parent: geotoolkit.scene.exports.CompositeDocumentElement): this;
                /**
                 * Compute the dimension in the layout this dimension is represented by a fixed dimension and a scaled dimension.
                 */
                getLayoutedDimension(): {layoutedDimension:{fixed:geotoolkit.util.Dimension;scaled:geotoolkit.util.Dimension}}|any;
                /**
                 * update the position of elements in the layout
                 */
                updateLayout(): any;
            }
            class FreeLayout {
                /**
                 * @param width  (Required) 
                 * @param height  (Required) 
                 */
                constructor(width: number, height: number);
                /**
                 * compute the dimension in the layout this dimension is represented by a fixed dimension and a scaled dimension
                 */
                getLayoutedDimension(): any;
                /**
                 * set the parent
                 * @param parent  (Required) parent document for this layout
                 */
                setParent(parent: geotoolkit.scene.exports.CompositeDocumentElement): this;
                /**
                 * update the position of elements in the layout
                 */
                updateLayout(): any;
            }
            /**
             * Abstract Paper Format class
             */
            class AbstractPaperFormat {
                /**
                 * Abstract Paper Format class
                 * @param name  (Required) paper name
                 * @param width  (Required) paper width
                 * @param height  (Required) paper height
                 * @param top  (Required) margin
                 paper top margin
                 * @param right  (Required) margin
                 paper right margin
                 * @param bottom  (Required) margin
                 paper bottom margin
                 * @param left  (Required) margin
                 paper left margin
                 * @param unit  (Required) paper measure unit
                 * @param orientation  (Required) paper orientation
                 */
                constructor(name: string, width: number, height: number, top: number, right: number, bottom: number, left: number, unit: geotoolkit.util.AbstractUnit, orientation: geotoolkit.scene.exports.PaperOrientation);
                /**
                 * get the paper name
                 */
                getName(): string;
                /**
                 * get paper width
                 */
                getWidth(): number;
                /**
                 * get paper height
                 */
                getHeight(): number;
                /**
                 * get top margin
                 */
                getTop(): number;
                /**
                 * get bottom margin
                 */
                getBottom(): number;
                /**
                 * get left margin
                 */
                getLeft(): number;
                /**
                 * get right margin
                 */
                getRight(): number;
                /**
                 * get paper unit
                 */
                getUnit(): geotoolkit.util.AbstractUnit;
                /**
                 * get dimension
                 */
                getDimension(): geotoolkit.util.Dimension;
                /**
                 * get paper orientation
                 */
                getOrientation(): geotoolkit.scene.exports.PaperOrientation;
            }
            /**
             * Paper format factory
             */
            class PaperFormatFactory {
                /**
                 * Paper format factory
                 */
                constructor();
                /**
                 * Return the instance of paper format factory. Will build new one if one has not been constructed.
                 */
                static getInstance(): geotoolkit.scene.exports.PaperFormatFactory;
                /**
                 * Return an instance of paper format.
                 * @param paperformat  (Required) paper format
                 * @param unit  (Optional) optional if paperformat is a {geotoolkit.scene.exports.PaperFormat}
                 * @param orientation  (Optional) optional if paperformat is a {geotoolkit.scene.exports.PaperFormat}
                 */
                getPaper(paperformat: geotoolkit.scene.exports.PaperFormat|string, unit?: geotoolkit.util.AbstractUnit|string, orientation?: geotoolkit.scene.exports.PaperOrientation): geotoolkit.scene.exports.AbstractPaperFormat;
                /**
                 * Register a custom paper format to the paper format factory. The paper format must extend AbstractPaperFormat.
                 * @param newPaper  (Required) custom paper format
                 */
                registerNewPaperFormat(newPaper: geotoolkit.scene.exports.CustomPaperFormat): any;
                /**
                 * Return the list of all papers supported by the factory.
                 */
                getPaperList(): any[];
            }
            /**
             * Paper format
             */
            class PaperFormat extends geotoolkit.scene.exports.AbstractPaperFormat {
                /**
                 * Paper format
                 * @param name  (Required) 
                 * @param width  (Required) 
                 * @param height  (Required) 
                 * @param top  (Required) margin
                 * @param right  (Required) margin
                 * @param bottom  (Required) margin
                 * @param left  (Required) margin
                 * @param unit  (Required) 
                 * @param orientation  (Required) 
                 */
                constructor(name: string, width: number, height: number, top: number, right: number, bottom: number, left: number, unit: geotoolkit.util.AbstractUnit, orientation: geotoolkit.scene.exports.PaperOrientation);
            }
            /**
             * Custom paper format
             */
            class CustomPaperFormat extends geotoolkit.scene.exports.PaperFormat {
                /**
                 * Custom paper format
                 * @param name  (Required) 
                 * @param width  (Required) 
                 * @param height  (Required) 
                 * @param top  (Required) margin
                 * @param right  (Required) margin
                 * @param bottom  (Required) margin
                 * @param left  (Required) margin
                 * @param unit  (Required) 
                 * @param orientation  (Required) 
                 */
                constructor(name: string, width: number, height: number, top: number, right: number, bottom: number, left: number, unit: geotoolkit.util.AbstractUnit, orientation: geotoolkit.scene.exports.PaperOrientation);
                /**
                 * set the paper name
                 * @param name  (Required) paper name
                 */
                setName(name: string): this;
                /**
                 * set paper width
                 * @param width  (Required) paper width
                 */
                setWidth(width: number): this;
                /**
                 * set paper height
                 * @param height  (Required) paper height
                 */
                setHeight(height: number): this;
                /**
                 * set top margin
                 * @param top  (Required) top margin
                 */
                setTop(top: number): this;
                /**
                 * set bottom margin
                 * @param bottom  (Required) bottom margin
                 */
                setBottom(bottom: number): this;
                /**
                 * set left margin
                 * @param left  (Required) left margin
                 */
                setLeft(left: number): this;
                /**
                 * set right margin
                 * @param right  (Required) right margin
                 */
                setRight(right: number): this;
                /**
                 * set paper unit
                 * @param unit  (Required) paper unit
                 */
                setUnit(unit: geotoolkit.util.AbstractUnit): this;
                /**
                 * set dimension
                 * @param dimension  (Required) paper dimension
                 */
                setDimension(dimension: geotoolkit.util.Dimension): this;
                /**
                 * set paper orientation
                 * @param orientation  (Required) paper orientation
                 */
                setOrientation(orientation: geotoolkit.scene.exports.PaperOrientation): this;
            }
            /**
             * Enum of annotation locations:
             * for annotated layout
             *      - Center : 0
             *      - North : 2
             *      - South : 4
             *      - West : 1
             *      - East : 3
             */
            interface AnnotationLocation {
                /**
                 * Center
                 */
                Center: number;
                /**
                 * West
                 */
                West: number;
                /**
                 * East
                 */
                East: number;
                /**
                 * North
                 */
                North: number;
                /**
                 * South
                 */
                South: number;
            }
            /**
             * Enum for linear layouts:
             *      - Vertical : 0
             *      - Horizontal : 1
             */
            interface LinearLocation {
                /**
                 * Vertical
                 */
                Vertical: number;
                /**
                 * Horizontal
                 */
                Horizontal: number;
            }
            /**
             * Enum of paper orientations:
             *       - Portrait : 'Portrait'
             *       - Landscape : 'Landscape'
             */
            interface PaperOrientation {
                /**
                 * Portrait
                 */
                Portrait: string;
                /**
                 * Landscape
                 */
                Landscape: string;
            }
            /**
             * Enum of paper scaling options:
             *     - AsIs : 'AsIs'
             *     - FitWidth : 'FitWidth'
             *     - FitHeight : 'FitHeight'
             *     - FitBoth : 'FitBoth'
             */
            interface ScalingOptions {
                /**
                 * As is
                 */
                AsIs: string;
                /**
                 * Fit width
                 */
                FitWidth: string;
                /**
                 * Fit height
                 */
                FitHeight: string;
                /**
                 * Fit both
                 */
                FitBoth: string;
            }
            /**
             * Define an interface to provide exportable elements.
             * It is used to provide custom layouting for printing and exporting
             * to various graphic formats.
             */
            interface IExportable {
                /**
                 * Returns exportable element
                 * @param options  (Optional) 
                 */
                getExportElement(options?: any): geotoolkit.scene.exports.AbstractDocumentElement;
                /**
                 * Used to prepare object before exporting
                 */
                beginExport(): any;
                /**
                 * Used to restore object's state after exporting
                 */
                endExport(): any;
            }
            module NodeAdapter {
                /**
                 * Enum of node adapter scaling options:
                 *     - TrueScale : 'TrueScale'
                 *     - PixelScale : 'PixelScale'
                 */
                interface ScaleMode {
                    /**
                     * True Scale
                     */
                    TrueScale: string;
                    /**
                     * Pixel Scale
                     */
                    PixelScale: string;
                }
            }
        }
        module filters {
            /**
             * Filter nodes based on range of scale factor
             */
            class ScaleRange implements geotoolkit.renderer.IFilter {
                /**
                 * Filter nodes based on range of scale factor
                 * @param options  (Optional) options
                 * @param options.minscale  (Optional) minimal scale
                 * @param options.maxscale  (Optional) maximal scale
                 * @param options.minscaleinclusive  (Optional) minimal scale is inclusive
                 * @param options.maxscaleinclusive  (Optional) maximal scale is inclusive
                 */
                constructor(options?: any | { minscale?: number; maxscale?: number; minscaleinclusive?: number; maxscaleinclusive?: number; } );
                /**
                 * Filters node based on scale range provided
                 * @param node  (Required) to apply filter to
                 * @param context  (Optional) rendering context
                 */
                filter(node: geotoolkit.scene.Node, context?: geotoolkit.renderer.RenderingContext): boolean;
                /**
                 * Gets options
                 */
                getOptions(): any;
                /**
                 * Sets options
                 * @param options  (Optional) options
                 * @param options.minscale  (Optional) minimal scale
                 * @param options.maxscale  (Optional) maximal scale
                 */
                setOptions(options?: any | { minscale?: number; maxscale?: number; } ): this;
                /**
                 * Begin filtering
                 * @param context  (Optional) rendering context
                 */
                begin(context?: geotoolkit.renderer.RenderingContext): this;
                /**
                 * End filtering
                 * @param context  (Optional) rendering context
                 */
                end(context?: geotoolkit.renderer.RenderingContext): this;
            }
            /**
             * Define a composite filter to apply a several filters
             */
            class Composite implements geotoolkit.renderer.IFilter {
                /**
                 * Define a composite filter to apply a several filters
                 * @param filters  (Optional) an array of filters
                 */
                constructor(filters?: geotoolkit.renderer.IFilter[]);
                /**
                 * Add filter to be applied
                 * @param filter  (Required) filter to add
                 */
                addFilter(filter: geotoolkit.renderer.IFilter): this;
                /**
                 * Remove an instance of the filter
                 * @param filter  (Required) filter to remove
                 */
                removeFilter(filter: geotoolkit.renderer.IFilter): this;
                /**
                 * Filters node based on an array of filters
                 * @param node  (Required) to apply filter to
                 * @param context  (Optional) rendering context
                 */
                filter(node: geotoolkit.scene.Node, context?: geotoolkit.renderer.RenderingContext): boolean;
                /**
                 * Begin filtering
                 * @param context  (Optional) rendering context
                 */
                begin(context?: geotoolkit.renderer.RenderingContext): this;
                /**
                 * End filtering
                 * @param context  (Optional) rendering context
                 */
                end(context?: geotoolkit.renderer.RenderingContext): this;
            }
            /**
             * Define a simple filter based on array
             */
            class InArray implements geotoolkit.renderer.IFilter {
                /**
                 * Define a simple filter based on array
                 * @param array  (Optional) array
                 */
                constructor(array?: any[]);
                /**
                 * Set array to be used
                 * @param array  (Required) array
                 */
                setArray(array: any[]): this;
                /**
                 * Get array to be used
                 */
                getArray(): this;
                /**
                 * Filters node based on array
                 * @param node  (Required) to apply filter to
                 * @param context  (Optional) rendering context
                 */
                filter(node: geotoolkit.scene.Node, context?: geotoolkit.renderer.RenderingContext): boolean;
                /**
                 * Begin filtering
                 * @param context  (Optional) rendering context
                 */
                begin(context?: geotoolkit.renderer.RenderingContext): this;
                /**
                 * End filtering
                 * @param context  (Optional) rendering context
                 */
                end(context?: geotoolkit.renderer.RenderingContext): this;
            }
        }
        module shapes {
            /**
             * Defines an abstract shape node with predefined line, fill and, text styles
             */
            class Shape extends geotoolkit.scene.AbstractNode {
                /**
                 * Defines an abstract shape node with predefined line, fill and, text styles
                 * @param options  (Optional) style applied on outline or it is options
                 * @param options.linestyle  (Optional) style applied on outline
                 * @param options.fillstyle  (Optional) style applied on fill
                 * @param options.visible  (Optional) visibility of node
                 * @param options.selectable  (Optional) a boolean to determine if selection should consider this shape
                 * @param options.id  (Optional) id of the node , its a unique identifier
                 * @param options.tag  (Optional) custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
                 * @param options.cssclass  (Optional) The ccs class name of this node
                 * @param fillstyle  (Optional) style applied on fill
                 */
                constructor(options?: geotoolkit.attributes.LineStyle|string|any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; visible?: boolean; selectable?: boolean; id?: string; tag?: any; cssclass?: string; } , fillstyle?: geotoolkit.attributes.FillStyle|string|any);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Shape): this;
                /**
                 * Return line style
                 */
                getLineStyle(): geotoolkit.attributes.LineStyle;
                /**
                 * Sets line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|string|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } , merge?: boolean): this;
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
                 * Invalidate bounds
                 * @param bounds  (Optional) if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
                 * @param force  (Optional) flag indicating if the parent must be forcibly invalidated
                 */
                invalidateParent(bounds?: geotoolkit.util.Rect|any, force?: boolean): this;
                /**
                 * Check collision of the shape bounds with parent invalid area
                 * @param bounds  (Required) shape bounds
                 * @param localTransformation  (Required) local transformation of the bounds
                 * @param parentInvalidArea  (Required) invalid parent area
                 * @param expand  (Optional) optional expand the bounds in model coordinate
                 */
                static intersectsBounds(bounds: geotoolkit.util.Rect, localTransformation: geotoolkit.util.Transformation, parentInvalidArea: geotoolkit.util.Rect, expand?: geotoolkit.util.Dimension): boolean;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.linestyle  (Optional) line style
                 * @param properties.fillstyle  (Optional) fill style
                 */
                setProperties(properties: any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } ): this;
                /**
                 * invalidate Method
                 */
                getInvalidateMethod(): Function;
            }
            /**
             * Define abstract shape with defined anchor point and scalable or restricted size.
             */
            class AnchoredShape extends geotoolkit.scene.shapes.Shape implements geotoolkit.layout.ILayoutable {
                /**
                 * Define abstract shape with defined anchor point and scalable or restricted size.
                 * @param options  (Required) anchor x position
                 * @param options.ax  (Optional) anchor x position
                 * @param options.ay  (Optional) anchor y position
                 * @param options.width  (Optional) shape width
                 * @param options.height  (Optional) shape height
                 * @param options.rotationangle  (Optional) rotation angle at anchor
                 * @param options.alignment  (Optional) alignment according of the anchor point
                 * @param options.sizeisindevicespace  (Optional) is coordinate in device space
                 * @param options.preserveaspectratio  (Optional) preserve aspect ratio of the anchored shape
                 * @param options.ispointingup  (Optional) pointing up
                 * @param options.preservereadingorientation  (Optional) preserve reading orientation for local transform
                 * @param options.preserverightangle  (Optional) preserve right angle for local transformation
                 * @param options.useminmaxdimensions  (Optional) use the min max dimensions to limit visual size
                 * @param options.mindimension  (Optional) minimum size for rendering
                 * @param options.maxdimension  (Optional) maximum size for rendering
                 * @param options.layoutstyle  (Optional) layout style to specify how to lay out shape
                 * @param ay  (Optional) anchor y position
                 * @param width  (Optional) symbol width
                 * @param height  (Optional) symbol height
                 * @param alignment  (Optional) alignment according of the anchor point
                 * @param sizeIsInDeviceSpace  (Optional) flag to indicate if size of the symbol in device,
                 * @param linestyle  (Optional) the line style
                 * @param fillstyle  (Optional) the fill style
                 */
                constructor(options: number|any | { ax?: number; ay?: number; width?: number; height?: number; rotationangle?: number; alignment?: geotoolkit.util.AnchorType; sizeisindevicespace?: boolean; preserveaspectratio?: boolean; ispointingup?: boolean; preservereadingorientation?: boolean; preserverightangle?: boolean; useminmaxdimensions?: boolean; mindimension?: geotoolkit.util.Dimension; maxdimension?: geotoolkit.util.Dimension; layoutstyle?: geotoolkit.layout.LayoutStyle|any; } , ay?: number, width?: number, height?: number, alignment?: geotoolkit.util.AnchorType, sizeIsInDeviceSpace?: boolean, linestyle?: geotoolkit.attributes.LineStyle|string|any, fillstyle?: geotoolkit.attributes.FillStyle|string|any);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.AnchoredShape): this;
                /**
                 * Return anchor position
                 * @param rect  (Required) rectangle to get anchor position
                 * @param anchorType  (Required) anchor type
                 */
                static getAnchorPosition(rect: geotoolkit.util.Rect, anchorType: geotoolkit.util.AnchorType): geotoolkit.util.Point;
                /**
                 * Sets whether the shape size is set in device space.
                 * @param sizeIsInDeviceSpace  (Required) true if the shape size is fixed in device space; otherwise, false.
                 */
                setSizeIsInDeviceSpace(sizeIsInDeviceSpace: boolean): this;
                /**
                 * Returns true if the shape size is set in device space
                 */
                getSizeIsInDeviceSpace(): boolean;
                /**
                 * Sets whether to use the min max device space sizes
                 * @param useMinMaxSize  (Required) true if using the min max device space sizes otherwise, false.
                 */
                setUseMinMaxSize(useMinMaxSize: boolean): this;
                /**
                 * true if using the min max device space sizes
                 */
                getUseMinMaxSize(): boolean;
                /**
                 * returns the maximum device space rendering dimension
                 * only works when setUseMinMaxSize is enabled.
                 */
                getMaxSize(): geotoolkit.util.Dimension;
                /**
                 * returns the minimum device space rendering dimension
                 * * only works when setUseMinMaxSize is enabled.
                 */
                getMinSize(): geotoolkit.util.Dimension;
                /**
                 * sets the maximum device space rendering dimension
                 * @param maxSize  (Required) maximum device space rendering dimension
                 */
                setMaxSize(maxSize: geotoolkit.util.Dimension): this;
                /**
                 * sets the minimum device space rendering dimension
                 * only works when setUseMinMaxSize is enabled.
                 * @param minSize  (Required) minimum device space rendering dimension
                 */
                setMinSize(minSize: geotoolkit.util.Dimension): this;
                /**
                 * Sets whether the shape is always pointing up. Particularly useful for text.
                 * @param isPointingUp  (Required) flag setting whether the shape is always pointing up
                 */
                setIsPointingUp(isPointingUp: boolean): this;
                /**
                 * Returns true if the shape is always pointing up
                 */
                getIsPointingUp(): boolean;
                /**
                 * Sets whether the shape is always in a readable orientation. Particularly useful for text. Prevents mirror effects
                 * @param preserveReadingOrientation  (Required) sets flag whether the shape is always in a readable orientation
                 */
                setPreserveReadingOrientation(preserveReadingOrientation: boolean): this;
                /**
                 * Returns true if the shape is always in a readable orientation
                 */
                getPreserveReadingOrientation(): boolean;
                /**
                 * Sets whether right angles are preserved
                 * @param preserveRightAngle  (Required) flag setting if right angles are preserved
                 */
                setPreserveRightAngle(preserveRightAngle: boolean): this;
                /**
                 * Returns true if right angles are preserved
                 */
                getPreserveRightAngle(): boolean;
                /**
                 * Sets whether aspect ratio is preserved
                 * @param preserveAspectRatio  (Required) flag Sets whether aspect ratio is preserved
                 */
                setPreserveAspectRatio(preserveAspectRatio: boolean): this;
                /**
                 * Returns true if aspect ratio is preserved
                 */
                getPreserveAspectRatio(): boolean;
                /**
                 * Returns aspect ratio of the content of the shape
                 * Returns 1
                 */
                getAspectRatio(): number;
                /**
                 * Returns the current anchor type.
                 */
                getAnchorType(): geotoolkit.util.AnchorType;
                /**
                 * Sets the anchor type.
                 * @param alignment  (Required) anchor alignment
                 */
                setAnchorType(alignment: geotoolkit.util.AnchorType): this;
                /**
                 * Returns rotation angle (in radians)
                 */
                getRotationAngle(): number;
                /**
                 * Set rotation angle
                 * @param rotationAngle  (Required) rotation angle (in radians) at anchor
                 */
                setRotationAngle(rotationAngle: number): this;
                /**
                 * Gets the anchor
                 * @param tr  (Optional) transformation to transform anchor
                 */
                getAnchor(tr?: geotoolkit.util.Transformation): geotoolkit.util.Point;
                /**
                 * Return anchored x position
                 */
                getAnchorX(): number;
                /**
                 * Sets x anchor position
                 * @param ax  (Required) anchor x position
                 */
                setAnchorX(ax: number): this;
                /**
                 * Return anchored y position
                 */
                getAnchorY(): number;
                /**
                 * Sets y anchor position
                 * @param ay  (Required) anchor x position
                 */
                setAnchorY(ay: number): this;
                /**
                 * Sets anchor point to given position
                 * @param p1  (Required) point or x coordinate
                 * @param p2  (Optional) y coordinate
                 */
                setAnchor(p1: geotoolkit.util.Point|number, p2?: number): this;
                /**
                 * Sets size of the shape, will accept a width and height number or a Dimension object.
                 * @param width  (Required) width of the shape
                 * @param height  (Optional) height of the shape
                 */
                setSize(width: number|geotoolkit.util.Dimension, height?: number): this;
                /**
                 * Returns the size as a dimension object.
                 */
                getSize(): geotoolkit.util.Dimension;
                /**
                 * Return width of the shape
                 */
                getWidth(): number;
                /**
                 * Sets width of the shape
                 * @param width  (Required) width of the shape
                 */
                setWidth(width: number): this;
                /**
                 * Return height of the shape
                 */
                getHeight(): number;
                /**
                 * Sets height of the shape
                 * @param height  (Required) height of the shape
                 */
                setHeight(height: number): this;
                /**
                 * Return bound in the parent coordinates
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{ax:number;ay:number;width:number;height:number;rotationangle:number;alignment:geotoolkit.util.AnchorType;sizeisindevicespace:boolean;preserveaspectratio:boolean;ispointingup:boolean;preservereadingorientation:boolean;preserverightangle:boolean;useminmaxdimensions:boolean;mindimension:geotoolkit.util.Dimension;maxdimension:geotoolkit.util.Dimension;layoutstyle:geotoolkit.layout.LayoutStyle}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.ax  (Optional) x coordinate of the anchor
                 * @param properties.ay  (Optional) y coordinate of the anchor
                 * @param properties.width  (Optional) width
                 * @param properties.height  (Optional) height
                 * @param properties.rotationangle  (Optional) rotation angle
                 * @param properties.alignment  (Optional) anchor type
                 * @param properties.sizeisindevicespace  (Optional) size is in device space
                 * @param properties.preserveaspectratio  (Optional) is preserve ratio activated
                 * @param properties.ispointingup  (Optional) is pointing up
                 * @param properties.preservereadingorientation  (Optional) is preserve reading orientation activated
                 * @param properties.preserverightangle  (Optional) is preserve right angle activated
                 * @param properties.useminmaxdimensions  (Optional) use device space size capping
                 * @param properties.mindimension  (Optional) minimum device space size
                 * @param properties.maxdimension  (Optional) maximum device space size
                 * @param properties.layoutstyle  (Optional) layout style to specify how to lay out shape
                 */
                setProperties(properties?: any | { ax?: number; ay?: number; width?: number; height?: number; rotationangle?: number; alignment?: geotoolkit.util.AnchorType; sizeisindevicespace?: boolean; preserveaspectratio?: boolean; ispointingup?: boolean; preservereadingorientation?: boolean; preserverightangle?: boolean; useminmaxdimensions?: boolean; mindimension?: geotoolkit.util.Dimension; maxdimension?: geotoolkit.util.Dimension; layoutstyle?: geotoolkit.layout.LayoutStyle|any; } ): this;
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
                 * Sets bounds of the node in the parent coordinates. This method
                 * takes anchor position and width and height if size is not in device space.
                 * This method was added to support layout.
                 * @param bounds  (Required) bound of the node in the parent coordinates
                 */
                setBounds(bounds: geotoolkit.util.Rect|any): this;
            }
            /**
             * The abstract class for a number of shapes whose geometry
             * is scaled by specified transformation. The scaled shapes has bounds, which
             * specify geometry bounding box without applying local transformation
             */
            class ScaledShape extends geotoolkit.scene.shapes.Shape {
                /**
                 * The abstract class for a number of shapes whose geometry
                 * is scaled by specified transformation. The scaled shapes has bounds, which
                 * specify geometry bounding box without applying local transformation
                 * @param options  (Optional) style applied on outline or it is options
                 * @param options.linestyle  (Optional) style applied on outline
                 * @param options.fillstyle  (Optional) style applied on fill
                 * @param options.visible  (Optional) visibility of node
                 * @param options.selectable  (Optional) a boolean to determine if selection should consider this shape
                 * @param options.id  (Optional) id of the node , its a unique identifier
                 * @param options.tag  (Optional) custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
                 * @param options.cssclass  (Optional) The ccs class name of this node
                 * @param fillstyle  (Optional) style applied on fill
                 */
                constructor(options?: geotoolkit.attributes.LineStyle|string|any | { linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; visible?: boolean; selectable?: boolean; id?: string; tag?: any; cssclass?: string; } , fillstyle?: geotoolkit.attributes.FillStyle|string|any);
                /**
                 * Return bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Check collision
                 * @param context  (Required) Rendering Context
                 */
                checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
            }
            /**
             * Symbols are shapes created using Symbol Painters {@link geotoolkit.scene.shapes.painters}. It has builtin function to draw the shape based on the selected painter.
             */
            class Symbol extends geotoolkit.scene.shapes.AnchoredShape {
                /**
                 * Symbols are shapes created using Symbol Painters {@link geotoolkit.scene.shapes.painters}. It has builtin function to draw the shape based on the selected painter.
                 * @param options  (Optional) anchor x position
                 * @param options.ax  (Optional) anchor x position
                 * @param options.ay  (Optional) anchor y position
                 * @param options.width  (Optional) symbol width
                 * @param options.height  (Optional) symbol height
                 * @param options.alignment  (Optional) anchor type of symbol
                 * @param options.sizeIsInDeviceSpace  (Optional) flag to indicate if size of the symbol in device
                 * @param options.painter  (Optional) a function with has parameters: symbol, box, context
                 * @param options.lineStyle  (Optional) line style of symbol
                 * @param options.fillStyle  (Optional) fill style of symbol
                 * @param ay  (Optional) anchor y position
                 * @param width  (Optional) symbol width
                 * @param height  (Optional) symbol height
                 * @param alignment  (Optional) anchor type of symbol
                 * @param sizeIsInDeviceSpace  (Optional) flag to indicate if size of the symbol in device
                 * @param painter  (Optional) a function with has parameters: symbol, box, context
                 * @param lineStyle  (Optional) line style of symbol
                 * @param fillStyle  (Optional) fill style of symbol
                 */
                constructor(options?: number|any | { ax?: number; ay?: number; width?: number; height?: number; alignment?: geotoolkit.util.AnchorType; sizeIsInDeviceSpace?: boolean; painter?: Function|any; lineStyle?: geotoolkit.attributes.LineStyle|string|any; fillStyle?: geotoolkit.attributes.FillStyle|string|any; } , ay?: number, width?: number, height?: number, alignment?: geotoolkit.util.AnchorType, sizeIsInDeviceSpace?: boolean, painter?: Function|any, lineStyle?: geotoolkit.attributes.LineStyle|string|any, fillStyle?: geotoolkit.attributes.FillStyle|string|any);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Symbol): this;
                /**
                 * Sets painter function for this symbol.
                 * @param painter  (Required) painter function for this symbol
                 */
                setPainter(painter: string|any|Function): this;
                /**
                 * Get painter function
                 */
                getPainter(): any|Function;
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Draw
                 * @param context  (Required) Rendering Context
                 */
                draw(context: geotoolkit.renderer.RenderingContext): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{painter:string}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.painter  (Optional) symbol's painter's className
                 */
                setProperties(properties?: any | { painter?: string; } ): this;
            }
            /**
             * Define a line shape.
             * <p>
             * Line shapes are the simplest shapes and they provide a foundation for more complex shapes.
             * Width, color, and style is set by assigning attributes to the line shape.<br>
             * Line shape itself defines geometry and assigned attributes provide information about drawing.
             * </p>
             */
            class Line extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * Define a line shape.
                 * <p>
                 * Line shapes are the simplest shapes and they provide a foundation for more complex shapes.
                 * Width, color, and style is set by assigning attributes to the line shape.<br>
                 * Line shape itself defines geometry and assigned attributes provide information about drawing.
                 * </p>
                 * @param from  (Optional) origin point of line
                 * @param from.from  (Optional) origin point of line
                 * @param from.to  (Optional) endpoint of line
                 * @param from.visible  (Optional) line visible
                 * @param from.linestyle  (Optional) line style
                 * @param to  (Optional) endpoint of line
                 * @param visible  (Optional) line visible
                 * @param linestyle  (Optional) line style
                 */
                constructor(from?: geotoolkit.util.Point|any | { from?: geotoolkit.util.Point; to?: geotoolkit.util.Point; visible?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; } , to?: geotoolkit.util.Point, visible?: boolean, linestyle?: geotoolkit.attributes.LineStyle|string|any);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Line): any;
                /**
                 * returns from point
                 */
                getFrom(): geotoolkit.util.Point;
                /**
                 * returns to point
                 */
                getTo(): geotoolkit.util.Point;
                /**
                 * Set line positions
                 * @param line  (Required) set of two points
                 * @param line.from  (Required) from position
                 * @param line.to  (Required) to position
                 */
                setLine(line: any | { from?: geotoolkit.util.Point; to?: geotoolkit.util.Point; } ): this;
                /**
                 * Render line
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Update bounds
                 */
                updateBounds(): this;
                /**
                 * Return bounding box of this line.
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{from:geotoolkit.util.Point;to:geotoolkit.util.Point};properties:{bounds:geotoolkit.util.Rect}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.from  (Optional) from
                 * @param properties.to  (Optional) to
                 * @param properties.bounds  (Optional) shape bounds
                 */
                setProperties(properties?: any | { from?: geotoolkit.util.Point; to?: geotoolkit.util.Point; bounds?: geotoolkit.util.Rect|any; } ): this;
                /**
                 */
                updateState(): any;
                /**
                 */
                checkCollision(): any;
                /**
                 */
                invalidate(): any;
            }
            /**
             * The base abstract class for a number of shapes whose geometry
             * is defined by a rectangular frame. This class does not directly
             * specify any specific geometry by itself, but merely provides
             * manipulation methods inherited by a whole category of shapes.
             */
            class RectangularShape extends geotoolkit.scene.shapes.ScaledShape implements geotoolkit.layout.ILayoutable {
                /**
                 * The base abstract class for a number of shapes whose geometry
                 * is defined by a rectangular frame. This class does not directly
                 * specify any specific geometry by itself, but merely provides
                 * manipulation methods inherited by a whole category of shapes.
                 * @param options  (Optional) x coordinate of the top left corner
                 * @param options.left  (Optional) x coordinate of the top left corner
                 * @param options.top  (Optional) y coordinate of the top left corner
                 * @param options.right  (Optional) x coordinate of the bottom right corner (if 'width' not specified)
                 * @param options.bottom  (Optional) y coordinate of the bottom right corner (if 'height' not specified)
                 * @param options.width  (Optional) width (if 'right' not specified)
                 * @param options.height  (Optional) height (if 'bottom' not specified)
                 * @param options.linestyle  (Optional) style applied on outline
                 * @param options.fillstyle  (Optional) style applied on fill
                 * @param options.visible  (Optional) visibility of node
                 * @param options.selectable  (Optional) a boolean to determine if selection should consider this shape
                 * @param options.id  (Optional) id of the node , its a unique identifier
                 * @param options.tag  (Optional) custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
                 * @param options.cssclass  (Optional) The ccs class name of this node
                 * @param top  (Optional) y coordinate of the top left corner
                 * @param right  (Optional) x coordinate of the bottom right corner (if 'width' not specified)
                 * @param bottom  (Optional) y coordinate of the bottom right corner (if 'height' not specified)
                 */
                constructor(options?: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; visible?: boolean; selectable?: boolean; id?: string; tag?: any; cssclass?: string; } , top?: number, right?: number, bottom?: number);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.RectangularShape): any;
                /**
                 * Returns the X coordinate of the center of the framing
                 * rectangle of this rectangular shape.
                 */
                getCenterX(): number;
                /**
                 * Returns the Y coordinate of the center of the framing
                 * rectangle of this rectangular shape.
                 */
                getCenterY(): number;
                /**
                 * Returns the X coordinate of the left bottom corner of the framing rectangle.
                 */
                getX(): number;
                /**
                 * Returns the Y coordinate of the left bottom corner of
                 * the framing rectangle.
                 */
                getY(): number;
                /**
                 * Returns the width of the framing rectangle.
                 */
                getWidth(): number;
                /**
                 * Returns the height of the framing rectangle.
                 */
                getHeight(): number;
                /**
                 * Return bounds. Will also lock the bounds so they cannot be directly modified.
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Sets the location and size of the framing rectangle of this
                 * rectangular shape to the specified values. This method is the same as setRect.
                 * @param x1  (Required) x coordinate of the top left corner
                 * @param y1  (Optional) y coordinate of the top left corner
                 * @param x2  (Optional) x coordinate of the bottom right corner
                 * @param y2  (Optional) y coordinate of the bottom right corner
                 */
                setBounds(x1: number|geotoolkit.util.Rect, y1?: number, x2?: number, y2?: number): this;
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
                 * Sets the location and size of the framing rectangle of this
                 * rectangular shape to the specified values.
                 * @param x1  (Required) x coordinate of the top left corner
                 * @param y1  (Optional) y coordinate of the top left corner
                 * @param x2  (Optional) x coordinate of the bottom right corner
                 * @param y2  (Optional) y coordinate of the bottom right corner
                 */
                setRect(x1: number|geotoolkit.util.Rect, y1?: number, x2?: number, y2?: number): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{bounds:geotoolkit.util.Rect}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.bounds  (Optional) shape bounds
                 */
                setProperties(properties?: any | { bounds?: geotoolkit.util.Rect|any; } ): this;
                /**
                 * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
                 */
                invalidateLayout(): this;
            }
            /**
             * Defines rectangle node
             */
            class Rectangle extends geotoolkit.scene.shapes.RectangularShape {
                /**
                 * Defines rectangle node
                 * @param options  (Optional) x coordinate of the top left corner
                 * @param options.left  (Optional) x coordinate of the top left corner
                 * @param options.top  (Optional) y coordinate of the top left corner
                 * @param options.right  (Optional) x coordinate of the bottom right corner (if 'width' not specified)
                 * @param options.bottom  (Optional) y coordinate of the bottom right corner (if 'height' not specified)
                 * @param options.width  (Optional) width (if 'right' not specified)
                 * @param options.height  (Optional) height (if 'bottom' not specified)
                 * @param options.radius  (Optional) This defines if the rectangle has rounded border corners. 'radius' is the length denoting a radius for the rounded border of each corner.
                 * @param options.linestyle  (Optional) style applied on outline
                 * @param options.fillstyle  (Optional) style applied on fill
                 * @param options.visible  (Optional) visibility of node
                 * @param options.selectable  (Optional) a boolean to determine if selection should consider this shape
                 * @param options.id  (Optional) id of the node , its a unique identifier
                 * @param options.tag  (Optional) custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
                 * @param options.cssclass  (Optional) The ccs class name of this node
                 * @param top  (Optional) y coordinate of the top left corner
                 * @param right  (Optional) x coordinate of the bottom right corner (if 'width' not specified)
                 * @param bottom  (Optional) y coordinate of the bottom right corner (if 'height' not specified)
                 */
                constructor(options?: number|any | { left?: number; top?: number; right?: number; bottom?: number; width?: number; height?: number; radius?: number; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; visible?: boolean; selectable?: boolean; id?: string; tag?: any; cssclass?: string; } , top?: number, right?: number, bottom?: number);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Rectangle): this;
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Set border radius in model coordinates.
                 * @param radius  (Required) border radius in model coordinates
                 */
                setCornerRadius(radius: number): this;
                /**
                 * return corner radius
                 */
                getCornerRadius(): number;
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
                 * Sets line style
                 * @param lineStyle  (Required) line style or options
                 * @param lineStyle.color  (Optional) line color
                 * @param lineStyle.width  (Optional) line width
                 * @param lineStyle.pattern  (Optional) line pattern
                 * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
                 */
                setLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
                /**
                 * Update state
                 */
                updateState(): any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{bounds:geotoolkit.util.Rect}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.radius  (Optional) corner radius
                 */
                setProperties(properties?: any | { radius?: number; } ): this;
            }
            /**
             * Defines ellipse node which is an elongated circle defined by a bounding frame.
             */
            class Ellipse extends geotoolkit.scene.shapes.RectangularShape {
                /**
                 * Defines ellipse node which is an elongated circle defined by a bounding frame.
                 * @param centerX  (Optional) x coordinate of the center
                 * @param centerX.centerx  (Optional) x coordinate of the center
                 * @param centerX.centery  (Optional) y coordinate of the center
                 * @param centerX.radiusx  (Optional) radius along the x axis
                 * @param centerX.radiusy  (Optional) radius along the y axis
                 * @param centerX.visible  (Optional) visibility
                 * @param centerX.linestyle  (Optional) style applied on outline
                 * @param centerX.fillstyle  (Optional) style applied on fill
                 * @param centerY  (Optional) y coordinate of the center
                 * @param radiusX  (Optional) radius along the x axis
                 * @param radiusY  (Optional) radius along the y axis
                 * @param visible  (Optional) visibility
                 * @param linestyle  (Optional) style applied on outline
                 * @param fillstyle  (Optional) style applied on fill
                 */
                constructor(centerX?: number|any | { centerx?: number|any; centery?: number; radiusx?: number; radiusy?: number; visible?: boolean; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } , centerY?: number, radiusX?: number, radiusY?: number, visible?: boolean, linestyle?: geotoolkit.attributes.LineStyle|string|any, fillstyle?: geotoolkit.attributes.FillStyle|string|any);
                /**
                 * Creates ellipse
                 * @param x  (Optional) x coordinate of the center OR options to specify ellipse { x : {number}, y : {number}, radiusX :
       {number}, radiusY : {number} }
                 * @param y  (Optional) y coordinate of the center
                 * @param radiusX  (Optional) radius along the x axis
                 * @param radiusY  (Optional) radius along the y axis
                 */
                setEllipse(x?: number|any, y?: number, radiusX?: number, radiusY?: number): this;
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
            }
            /**
             * Defines AnnulusArc node
             */
            class AnnulusArc extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * Defines AnnulusArc node
                 * @param x  (Optional) x coordinate of the center
                 * @param x.x  (Optional) x coordinate of the center
                 * @param x.y  (Optional) y coordinate of the center
                 * @param x.innerradius  (Optional) innerRadius
                 * @param x.outerradius  (Optional) outerRadius
                 * @param x.startarc  (Optional) start arc
                 * @param x.endarc  (Optional) end arc
                 * @param x.sweepsngle  (Optional) sweep angle of the arc
                 * @param y  (Optional) y coordinate of the center
                 * @param innerRadius  (Optional) innerRadius
                 * @param outerRadius  (Optional) outerRadius
                 * @param startArc  (Optional) start arc
                 * @param endArc  (Optional) end arc
                 */
                constructor(x?: number|any | { x?: number; y?: number; innerradius?: number; outerradius?: number; startarc?: number; endarc?: number; sweepsngle?: number; } , y?: number, innerRadius?: number, outerRadius?: number, startArc?: number, endArc?: number);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.AnnulusArc): this;
                /**
                 * Creates arc
                 * @param x  (Optional) x coordinate of the center OR options to specify ellipse { x : {number}, y : {number}, radius :
       {number}, startArc : {number}, endArc: {number} }
                 * @param x.x  (Optional) x coordinate of the center
                 * @param x.y  (Optional) y coordinate of the center
                 * @param x.innerradius  (Optional) innerRadius
                 * @param x.outerradius  (Optional) outerRadius
                 * @param x.startarc  (Optional) start arc
                 * @param x.endarc  (Optional) end arc
                 * @param y  (Optional) y coordinate of the center
                 * @param innerRadius  (Optional) innerRadius
                 * @param outerRadius  (Optional) outerRadius
                 * @param startArc  (Optional) start arc
                 * @param endArc  (Optional) end arc
                 */
                setAnnulusArc(x?: number|any | { x?: any; y?: number; innerradius?: number; outerradius?: number; startarc?: number; endarc?: number; } , y?: number, innerRadius?: number, outerRadius?: number, startArc?: number, endArc?: number): this;
                /**
                 * Return bounds of annulus arc, these bounds will include entire arc.
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Render
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{x:number;y:number;innerRadius:number;outerRadius:number;startArc:number;endArc:number;bounds:geotoolkit.util.Rect}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.x  (Optional) x coordinate of the center
                 * @param properties.y  (Optional) y coordinate of the center
                 * @param properties.innerradius  (Optional) size of the innerradius
                 * @param properties.outerradius  (Optional) size of the outerradius
                 * @param properties.startarc  (Optional) angle where the arc starts
                 * @param properties.endarc  (Optional) angle where the arc ends
                 * @param properties.sweepangle  (Optional) Sweep angle of the arc
                 * @param properties.bounds  (Optional) shape bounds
                 */
                setProperties(properties: any | { x?: number; y?: number; innerradius?: number; outerradius?: number; startarc?: number; endarc?: number; sweepangle?: number; bounds?: geotoolkit.util.Rect|any; } ): this;
            }
            /**
             * Defines the StripArc class, which is a modified AnnulusArc to allow "height" for pseudo-3d pie chart cap drawing
             */
            class StripArc extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * Defines the StripArc class, which is a modified AnnulusArc to allow "height" for pseudo-3d pie chart cap drawing
                 * @param x  (Optional) x coordinate of the center OR options to specify ellipse { x : {number}, y : {number}, radius :
       {number}, startArc : {number}, endArc: {number}, height: {number} }
                 * @param y  (Optional) y coordinate of the center
                 * @param innerradius  (Optional) innerRadius
                 * @param outerradius  (Optional) outerRadius
                 * @param startarc  (Optional) start arc
                 * @param endarc  (Optional) end arc
                 * @param linestyle  (Optional) the linestyle
                 * @param fillstyle  (Optional) the fillstyle
                 * @param height  (Optional) height of the arc when drawn with a "depth"
                 */
                constructor(x?: number|any, y?: number, innerradius?: number, outerradius?: number, startarc?: number, endarc?: number, linestyle?: geotoolkit.attributes.LineStyle|string|any, fillstyle?: geotoolkit.attributes.FillStyle|string|any, height?: number);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.StripArc): this;
                /**
                 * Sets data for the arc
                 * @param x  (Optional) x coordinate of the center OR options to specify ellipse { x : {number}, y : {number}, radius :
           {number}, startArc : {number}, endArc: {number}, height: {number} }
                 * @param y  (Optional) y coordinate of the center
                 * @param innerRadius  (Optional) innerRadius
                 * @param outerRadius  (Optional) outerRadius
                 * @param startArc  (Optional) start arc
                 * @param endArc  (Optional) end arc
                 * @param height  (Optional) height of the arc when drawn with a "depth"
                 */
                setData(x?: number|any, y?: number, innerRadius?: number, outerRadius?: number, startArc?: number, endArc?: number, height?: number): any;
                /**
                 * Return bounds of strip arc, these bounds will include entire arc.
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * getProperties function
                 */
                getProperties(): any;
                /**
                 * Set properties
                 * @param properties  (Required) the properties to set
                 * @param properties.x  (Optional) x coordinate of the center
                 * @param properties.y  (Optional) y coordinate of the center
                 * @param properties.innerradius  (Optional) innerRadius
                 * @param properties.outerradius  (Optional) outerRadius
                 * @param properties.startarc  (Optional) start arc
                 * @param properties.endarc  (Optional) end arc
                 * @param properties.height  (Optional) height of the arc when drawn with a "depth"
                 * @param properties.bounds  (Optional) 
                 */
                setProperties(properties: any | { x?: number|any; y?: number; innerradius?: number; outerradius?: number; startarc?: number; endarc?: number; height?: number; bounds?: geotoolkit.util.Rect; } ): this;
            }
            /**
             * The Arc shape is defined by its center, radius and start/end angles.<br>
             */
            class Arc extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * The Arc shape is defined by its center, radius and start/end angles.<br>
                 * @param options  (Optional) x coordinate of the center
                 * @param options.x  (Optional) x coordinate of the center
                 * @param options.y  (Optional) y coordinate of the center
                 * @param options.radius  (Optional) The radius of the arc
                 * @param options.startarc  (Optional) The start angle for the arc in radians
                 * @param options.endarc  (Optional) The end angle for the arc in radians
                 * @param options.sweepArc  (Optional) Defines the sweep of the arc
                 * @param options.linestyle  (Optional) style applied on outline
                 * @param options.fillstyle  (Optional) style applied on fill
                 * @param options.visible  (Optional) visiblity of node
                 * @param options.selectable  (Optional) A boolean to determine if selection should consider this node
                 * @param options.id  (Optional) id of the node, its a unique identifier
                 * @param options.tag  (Optional) custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shapes
                 * @param options.cssclass  (Optional) The ccs class name of this node
                 * @param options.connecttocenter  (Optional) A flag which specifies if the end points of the arc should be connected to
center with lines, like a pie slice
                 * @param y  (Optional) y coordinate of the center
                 * @param radius  (Optional) The radius of the arc
                 * @param startArc  (Optional) The start angle for the arc in radians
                 * @param endArc  (Optional) The end angle for the arc in radians
                 * @param sweepArc  (Optional) Defines the sweep of the arc
                 * @param connectToCenter  (Optional) A flag which specifies if the end points of the arc should be connected to
center with lines, like a pie slice
                 */
                constructor(options?: number|any | { x?: any; y?: number; radius?: number; startarc?: number; endarc?: number; sweepArc?: number; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; visible?: boolean; selectable?: boolean; id?: string; tag?: any; cssclass?: string; connecttocenter?: boolean; } , y?: number, radius?: number, startArc?: number, endArc?: number, sweepArc?: number, connectToCenter?: boolean);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Arc): any;
                /**
                 * Set arc parameters
                 * @param options  (Optional) x coordinate of the center
                 * @param options.x  (Optional) x coordinate of the center
                 * @param options.y  (Optional) y coordinate of the center
                 * @param options.radius  (Optional) The radius of the arc
                 * @param options.startarc  (Optional) The start angle for the arc in radians
                 * @param options.endarc  (Optional) The end angle for the arc in radians
                 * @param y  (Optional) y coordinate of the center
                 * @param radius  (Optional) The radius of the arc
                 * @param startArc  (Optional) The start angle for the arc in radians
                 * @param endArc  (Optional) The end angle for the arc in radians
                 * @param sweepArc  (Optional) Defines the sweep of the arc
                 * @param connectToCenter  (Optional) connect to center
                 */
                setArc(options?: number|any | { x?: any; y?: number; radius?: number; startarc?: number; endarc?: number; } , y?: number, radius?: number, startArc?: number, endArc?: number, sweepArc?: number, connectToCenter?: boolean): this;
                /**
                 * Return bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Render arc
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{visible:boolean;x:number;y:number;radius:number;startarc:number;endarc:number;sweeparc:number;bounds:geotoolkit.util.Rect}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) JSON containing the properties to set
                 * @param properties.x  (Optional) x coordinate of the center
                 * @param properties.y  (Optional) y coordinate of the center
                 * @param properties.radius  (Optional) size of the radius
                 * @param properties.startarc  (Optional) angle where the arc starts
                 * @param properties.endarc  (Optional) angle where the arc ends
                 * @param properties.sweeparc  (Optional) Defines the sweep of the arc
                 * @param properties.connecttocenter  (Optional) A flag which specifies if the end points of the arc should be connected to center with lines, like a pie slice
                 * @param properties.bounds  (Optional) shape bounds
                 */
                setProperties(properties: any | { x?: number; y?: number; radius?: number; startarc?: number; endarc?: number; sweeparc?: number; connecttocenter?: boolean; bounds?: geotoolkit.util.Rect|any; } ): this;
            }
            /**
             * Defines image node. Image shapes help in manipulating pictures and support all common transformations such as scaling and rotation.<br>
             * Image shapes also support the anchoring technique.
             */
            class Image extends geotoolkit.scene.shapes.AnchoredShape {
                /**
                 * Defines image node. Image shapes help in manipulating pictures and support all common transformations such as scaling and rotation.<br>
                 * Image shapes also support the anchoring technique.
                 * @param x  (Optional) left
                 * @param x.x  (Optional) left
                 * @param x.y  (Optional) top
                 * @param x.url  (Optional) Image dataUrls
                 * @param x.w  (Optional) width
                 * @param x.h  (Optional) height
                 * @param x.opacity  (Optional) image opacity (from 0 to 1)
                 * @param x.image  (Optional) an instance of image instead of url
                 * @param x.alignment  (Optional) alignment
                 * @param x.sizeisindevicespace  (Optional) image size is in pixel
                 * @param x.crossorigin  (Optional) cross origin to set when loading images
                 * @param y  (Optional) top
                 * @param url  (Optional) Image dataUrls
                 * @param w  (Optional) width
                 * @param h  (Optional) height
                 * @param alignment  (Optional) 
                 * @param sizeisindevicespace  (Optional) image size is in pixel
                 */
                constructor(x?: number|any | { x?: number; y?: number; url?: string; w?: number; h?: number; opacity?: number; image?: HTMLImageElement; alignment?: geotoolkit.util.AnchorType; sizeisindevicespace?: boolean; crossorigin?: string|any; } , y?: number, url?: string, w?: number, h?: number, alignment?: geotoolkit.util.AnchorType, sizeisindevicespace?: boolean);
                /**
                 * Image's Events enumerator
                 */
                static Events: any;
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Image): this;
                /**
                 * LoadImage image
                 */
                loadImage(): any;
                /**
                 * Render image
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Sets image opacity
                 * @param opacity  (Required) image opacity from 0 to 1
                 */
                setOpacity(opacity: number): this;
                /**
                 * Returns current image opacity
                 */
                getOpacity(): number;
                /**
                 * Returns this images aspect ratio, width over height
                 */
                getAspectRatio(): number;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{url:string;alt:string;image:HTMLImageElement}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.url  (Optional) Image dataUrls
                 * @param properties.alt  (Optional) alternative text
                 * @param properties.image  (Optional) image
                 */
                setProperties(properties?: any | { url?: string; alt?: string; image?: HTMLImageElement; } ): this;
                /**
                 * Gets image element
                 */
                getImage(): HTMLImageElement;
            }
            /**
             * Defines Path node
             */
            class Path extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * Defines Path node
                 * @param options  (Optional) options or visible flag
                 * @param options.visible  (Optional) visibility of the path
                 * @param options.geometry  (Optional) geometry the path
                 * @param options.linestyle  (Optional) linestyle
                 * @param linestyle  (Optional) linestyle
                 */
                constructor(options?: any | { visible?: boolean; geometry?: geotoolkit.renderer.GraphicsPath; linestyle?: geotoolkit.attributes.LineStyle|string|any; } |boolean, linestyle?: geotoolkit.attributes.LineStyle|string|any);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Path): any;
                /**
                 * Remove all of this path's points.
                 */
                clear(): this;
                /**
                 * Add command to move the current position.
                 * @param x  (Required) The x-coordinate of the destination point
                 * @param y  (Required) The y-coordinate of the destination point
                 */
                moveTo(x: number, y: number): this;
                /**
                 * Close path
                 */
                close(): this;
                /**
                 * Add command to draw a line from the current position to specified point
                 * @param x  (Required) The x-coordinate of the destination point
                 * @param y  (Required) The y-coordinate of the destination point
                 */
                lineTo(x: number, y: number): this;
                /**
                 * Add command to draw an arc from the current position to specified point
                 * @param x1  (Required) The x-coordinate of the destination point
                 * @param y1  (Required) The y-coordinate of the destination point
                 * @param x2  (Required) x-coordinate of control point
                 * @param y2  (Required) y-coordinate of control point
                 * @param radius  (Required) The radius of arc
                 */
                arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
                /**
                 * Draws a cubic Bezier curve from the current point to the point (x, y),
                 * with control points (cp1x, cp1y) and (cp2x, cp2y).
                 * @param cp1x  (Required) the the x coordinate of the first control point OR options to specify bezier curve { x : {number}, y : {number},
           cp1x : {number}, cp1y : {number}, cp2x : {number}, cp2y :
           {number} }
                 * @param cp1y  (Required) the y coordinate of the first control point
                 * @param cp2x  (Required) the x coordinate of the second control point
                 * @param cp2y  (Required) the y coordinate of the second control point
                 * @param x  (Required) the x coordinate of the end point
                 * @param y  (Required) the y coordinate of the end point
                 */
                bezierCurveTo(cp1x: number|any, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): this;
                /**
                 * Return bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Render
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): this;
                /**
                 * Update geometry
                 * @param context  (Required) rendering context
                 */
                updateGeometry(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Returns the geometry of this item as a GeometryPath in
                 * model coordinates.
                 */
                getGeometry(): geotoolkit.renderer.GraphicsPath;
                /**
                 * Sets a geometry for the path in model coordinates
                 * @param geometry  (Required) New geometry
                 */
                setGeometry(geometry: geotoolkit.renderer.GraphicsPath): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set see {@link geotoolkit.renderer.GraphicsPath#setProperties}
                 */
                setProperties(properties: any): this;
            }
            /**
             * Defines text label. Text shapes support various kinds of text strings in the model. Anchoring technique allows developer to specify location of the text relative to anchor point.<br>
             * Other attributes like text size and style can also be set.
             */
            class Text extends geotoolkit.scene.shapes.AnchoredShape {
                /**
                 * Defines text label. Text shapes support various kinds of text strings in the model. Anchoring technique allows developer to specify location of the text relative to anchor point.<br>
                 * Other attributes like text size and style can also be set.
                 * @param options  (Optional) text to display or object, which contains shape properties
                 * @param options.text  (Optional) text to display
                 * @param options.ax  (Optional) x coordinate of anchor
                 * @param options.ay  (Optional) y coordinate of anchor
                 * @param options.width  (Optional) desired width
                 * @param options.height  (Optional) desired height
                 * @param options.textstyle  (Optional) textStyle to display
                 * @param options.sizeisindevicespace  (Optional) size Is In Device Space
                 * @param options.alignment  (Optional) anchor type
                 * @param options.visible  (Optional) visibility of node
                 * @param options.selectable  (Optional) a boolean to determine if selection should consider this shape
                 * @param options.id  (Optional) id of the node , its a unique identifier
                 * @param options.tag  (Optional) custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
                 * @param options.cssclass  (Optional) The ccs class name of this node
                 * @param options.linestyle  (Optional) linestyle of border rectangle
                 * @param options.fillstyle  (Optional) fillstyle of border rectangle
                 * @param ax  (Optional) x coordinate of anchor
                 * @param ay  (Optional) y coordinate of anchor
                 * @param width  (Optional) desired width
                 * @param height  (Optional) desired height
                 * @param textStyle  (Optional) textStyle to display
                 * @param sizeIsInDeviceSpace  (Optional) size Is In Device Space
                 * @param showellipsis  (Optional) boolean flag that enables/disables ellipsis in case if text is too long
                 * @param alignment  (Optional) anchor type
                 */
                constructor(options?: string|any | { text?: string; ax?: number; ay?: number; width?: number; height?: number; textstyle?: geotoolkit.attributes.TextStyle|string|any; sizeisindevicespace?: boolean; alignment?: geotoolkit.util.AnchorType; visible?: boolean; selectable?: boolean; id?: string; tag?: any; cssclass?: string; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; } , ax?: number, ay?: number, width?: number, height?: number, textStyle?: geotoolkit.attributes.TextStyle|string|any, sizeIsInDeviceSpace?: boolean, showellipsis?: boolean, alignment?: geotoolkit.util.AnchorType);
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Text): this;
                /**
                 * Enum of size modes (to specify that size mode depends from width and height use Text.SizeMode.FixedWidth | Text.SizeMode.FixedHeight)
                 */
                static SizeMode: any;
                /**
                 * Calculates the size from text style
                 * @param text  (Required) to be measured
                 * @param textStyle  (Required) text style
                 */
                recalculateLayout(text: string, textStyle: geotoolkit.attributes.TextStyle): geotoolkit.util.Rect;
                /**
                 * Returns the text string that will be rendered depending on textStyle's wrapping value.
                 */
                getDisplayableText(): string;
                /**
                 * Set show ellipsis
                 * @param showEllipsis  (Required) showEllipsis boolean flag that enables/disables ellipsis in case if text is too long
                 */
                setShowEllipsis(showEllipsis: boolean): this;
                /**
                 * Returns ellipsis flag
                 */
                getShowEllipsis(): boolean;
                /**
                 * Sets how text size is computed
                 * @param sizeMode  (Required) Enum of size modes
                 */
                setSizeMode(sizeMode: geotoolkit.scene.shapes.Text.SizeMode|string): this;
                /**
                 * Returns how the size is computed
                 */
                getSizeMode(): geotoolkit.scene.shapes.Text.SizeMode|string;
                /**
                 * Get this text's contents as a string.
                 */
                getText(): string;
                /**
                 * The style associated with this text.
                 */
                getTextStyle(): geotoolkit.attributes.TextStyle;
                /**
                 * Sets rectangle geometry.
                 * @param x1  (Required) x coordinate of the top left corner
                 * @param y1  (Required) y coordinate of the top left corner
                 * @param x2  (Required) x coordinate of the bottom right corner
                 * @param y2  (Required) y coordinate of the bottom right corner
                 */
                setRect(x1: number, y1: number, x2: number, y2: number): this;
                /**
                 * Update the string this text displays.
                 * @param text  (Required) new text for this shape     *
can contains text formatting tags, <p> <font> <b> <strong> <i> <em> <mark> <small> <del> <ins> <sub> <sup>
see https://www.w3schools.com/html/html_formatting.asp
each tags except <br> can contains style attribute with set of 'font-size', 'font-family', 'font-weight', 'font-style', 'font-color' properties
                 */
                setText(text: string): this;
                /**
                 * Set size
                 * @param width  (Required) text width
                 * @param height  (Required) text height
                 */
                setSize(width: number, height: number): this;
                /**
                 * Called internally to save user size.
                 * @param width  (Required) width
                 * @param height  (Required) height
                 */
                setUserSize(width: number, height: number): this;
                /**
                 * Set text width. If width set to zero, text will accept size from font.
                 * @param width  (Required) text width
                 */
                setWidth(width: number): this;
                /**
                 * Set text height. If height set to zero, text will get its height from font.
                 * @param height  (Required) text height
                 */
                setHeight(height: number): this;
                /**
                 * Set text style
                 * @param textStyle  (Required) a new shape text style
                 * @param textStyle.color  (Optional) text color
                 * @param textStyle.baseLine  (Optional) base line.
                 * @param textStyle.alignment  (Optional) alignment.
                 * @param textStyle.font  (Optional) font.
                 * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
                 */
                setTextStyle(textStyle: geotoolkit.attributes.TextStyle|string|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
                /**
                 * Set border radius in device coordinates.
                 * @param radius  (Required) border radius in device coordinates
                 */
                setCornerRadius(radius: number): this;
                /**
                 * return corner radius
                 */
                getCornerRadius(): number;
                /**
                 * Set inner padding in device coordinates.
                 * @param padding  (Required) inner padding in device coordinates
                 */
                setPadding(padding: number): this;
                /**
                 * return inner padding
                 */
                getPadding(): number;
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Update geometry
                 * @param context  (Required) Rendering Context
                 */
                updateGeometry(context: geotoolkit.renderer.RenderingContext): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{text:string;textstyle:geotoolkit.attributes.TextStyle;bounds:geotoolkit.util.Rect;state:string;layout:geotoolkit.util.Rect;sizemode:geotoolkit.scene.shapes.Text.SizeMode|string;ellipsis:boolean;userheight:number;userwidth:number;radius:number;padding:number}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.text  (Optional) text
                 * @param properties.textstyle  (Optional) JSON containing the properties to set TextStyle. See {geotoolkit.attributes.TextStyle#setProperties}
                 * @param properties.state  (Optional) state
                 * @param properties.sizemode  (Optional) enum size mode
                 * @param properties.ellipsis  (Optional) ellipsis flag
                 * @param properties.userheight  (Optional) height
                 * @param properties.userwidth  (Optional) width
                 * @param properties.radius  (Optional) radius
                 * @param properties.padding  (Optional) padding
                 */
                setProperties(properties?: any | { text?: string; textstyle?: geotoolkit.attributes.TextStyle|any; state?: string; sizemode?: geotoolkit.scene.shapes.Text.SizeMode|string; ellipsis?: boolean; userheight?: number; userwidth?: number; radius?: number; padding?: number; } ): this;
                /**
                 * Disposes the Text
                 */
                dispose(): any;
                /**
                 * invalidate Method
                 */
                getInvalidateMethod(): Function;
            }
            /**
             * A polygon node which is defined by arrays of points.
             */
            class Polygon extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * A polygon node which is defined by arrays of points.
                 * @param options  (Required) set of x coordinates or object, which contains shape properties
                 * @param options.x  (Optional) set of x coordinates
                 * @param options.y  (Optional) set of y coordinates
                 * @param options.linestyle  (Optional) style applied on outline
                 * @param options.fillstyle  (Optional) apply polygon fillstyle
                 * @param options.visible  (Optional) visibility of node
                 * @param options.selectable  (Optional) a boolean to determine if selection should consider this shape
                 * @param options.id  (Optional) id of the node , its a unique identifier
                 * @param options.tag  (Optional) custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
                 * @param options.cssclass  (Optional) The ccs class name of this node
                 * @param y  (Optional) set of y coordinates
                 * @param visible  (Optional) 
                 * @param linestyle  (Optional) 
                 * @param fillstyle  (Optional) apply polygon fillstyle
                 */
                constructor(options: number[]|any | { x?: number[]; y?: number[]; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; visible?: boolean; selectable?: boolean; id?: string; tag?: any; cssclass?: string; } , y?: number[], visible?: boolean, linestyle?: geotoolkit.attributes.LineStyle|string|any, fillstyle?: geotoolkit.attributes.FillStyle|string|any);
                /**
                 * Returns path geometry of the polygon
                 */
                getGeometry(): geotoolkit.renderer.GraphicsPath;
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Polygon): this;
                /**
                 * Returns bounds and locks the bounds rect from further editing.
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Sets arrays of points. Will overwrite any existing points in this polygon.
                 * @param x  (Required) array of x coordinates
                 * @param y  (Required) array of y coordinates
                 */
                setCoordinates(x: number[], y: number[]): this;
                /**
                 * Adds point to array of points.
                 * @param x  (Required) x-coordinate
                 * @param y  (Required) y-coordinate
                 */
                push(x: number, y: number): this;
                /**
                 * Gets x-coords of points
                 */
                getPointsX(): number[];
                /**
                 * Gets y-coords of points
                 */
                getPointsY(): number[];
                /**
                 * Gets number of points
                 */
                getSize(): number;
                /**
                 * Render
                 * @param context  (Required) rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{x:number[];y:number[];npts:number}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.x  (Optional) set of x coordinates
                 * @param properties.y  (Optional) set of y coordinates
                 */
                setProperties(properties?: any | { x?: number[]; y?: number[]; } ): this;
            }
            /**
             * A line defined by x and y arrays of coordinates.
             */
            class Polyline extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * A line defined by x and y arrays of coordinates.
                 * @param options  (Required) set of x coordinates or object, which contains shape properties
                 * @param options.x  (Optional) set of x coordinates
                 * @param options.y  (Optional) set of y coordinates
                 * @param options.linestyle  (Optional) style applied on outline
                 * @param options.visible  (Optional) visibility of node
                 * @param options.selectable  (Optional) a boolean to determine if selection should consider this shape
                 * @param options.id  (Optional) id of the node , its a unique identifier
                 * @param options.tag  (Optional) custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
                 * @param options.cssclass  (Optional) The ccs class name of this node
                 * @param y  (Optional) set of y coordinates
                 * @param visible  (Optional) 
                 * @param linestyle  (Optional) 
                 */
                constructor(options: number[]|any | { x?: number[]; y?: number[]; linestyle?: geotoolkit.attributes.LineStyle|string|any; visible?: boolean; selectable?: boolean; id?: string; tag?: any; cssclass?: string; } , y?: number[], visible?: boolean, linestyle?: geotoolkit.attributes.LineStyle|string|any);
                /**
                 * Enum of rendering optimization types
                 */
                static OptimizationType: any;
                /**
                 * Sets optimization type
                 * @param optimizationType  (Required) optimization type which used with current line
                 */
                setOptimizationType(optimizationType: geotoolkit.scene.shapes.Polyline.OptimizationType): this;
                /**
                 * Returns optimization type
                 */
                getOptimizationType(): geotoolkit.scene.shapes.Polyline.OptimizationType;
                /**
                 * Turns on/off optimization for line
                 * @param needOptimization  (Optional) Is optimization for line on
                 */
                setOptimization(needOptimization?: boolean): this;
                /**
                 * Returns current optimization state
                 */
                getOptimization(): boolean;
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Polyline): this;
                /**
                 * Check collision
                 * @param context  (Required) Rendering Context
                 */
                checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
                /**
                 * Update shape bounds
                 */
                updateBounds(): this;
                /**
                 * Return bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Sets arrays of points
                 * @param x  (Required) an array of x coordinates
                 * @param y  (Required) an array of y coordinates
                 */
                setCoordinates(x: number[], y: number[]): this;
                /**
                 * Add point to array of points.
                 * @param x  (Required) x coordinate
                 * @param y  (Required) y coordinate
                 */
                push(x: number, y: number): this;
                /**
                 * Gets x-coords of points
                 */
                getPointsX(): number[];
                /**
                 * Gets y-coords of points
                 */
                getPointsY(): number[];
                /**
                 */
                getSize(): number;
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {properties:{optimization:string;x:number[];y:number[];npts:number}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.optimization  (Optional) optimization type boolean || ['none' | 'rdp' | 'closepoints']
                 * @param properties.x  (Optional) set of x coordinates
                 * @param properties.y  (Optional) set of y coordinates
                 */
                setProperties(properties?: any | { optimization?: boolean|string; x?: number[]; y?: number[]; } ): this;
            }
            /**
             * The set of polyline shape.
             */
            class PolylineSet extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * The set of polyline shape.
                 */
                constructor();
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.PolylineSet): any;
                /**
                 * Add new polyline segment
                 * @param x  (Required) x-coordinates
                 * @param y  (Required) y-coordinates
                 */
                add(x: number[], y: number[]): any;
                /**
                 * Return bounds and lock bounds rect from modification.
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.bounds  (Optional) bounds of the model
                 * @param properties.segments  (Optional) polyline segment
                 */
                setProperties(properties: any | { bounds?: geotoolkit.util.Rect; segments?: geotoolkit.scene.shapes.PolylineSegment; } ): this;
            }
            /**
             * The set of polyline shape.
             */
            class PolylineSegment {
                /**
                 * The set of polyline shape.
                 */
                constructor();
                /**
                 * Return bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{x:number[];y:number[];bounds:geotoolkit.util.Rect;npts:number}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.x  (Optional) set of x coordinates
                 * @param properties.y  (Optional) set of y coordinates
                 * @param properties.bounds  (Optional) shape bounds
                 */
                setProperties(properties?: any | { x?: number[]; y?: number[]; bounds?: geotoolkit.util.Rect|any; } ): this;
            }
            /**
             * Spline curve where the polynomial of each spline is in bezier form
             */
            class BezierSpline {
                /**
                 * Spline curve where the polynomial of each spline is in bezier form
                 */
                constructor();
            }
            /**
             * Define spline shape
             */
            class Spline extends geotoolkit.scene.shapes.Path {
                /**
                 * Define spline shape
                 * @param x  (Required) coordinates
                 * @param x.x  (Optional) x coordinates
                 * @param x.y  (Optional) y coordinates
                 * @param x.linestyle  (Optional) line style
                 * @param y  (Optional) coordinates
                 * @param linestyle  (Optional) style
                 */
                constructor(x: number[]|any | { x?: number[]; y?: number[]; linestyle?: geotoolkit.attributes.LineStyle|string|any; } , y?: number[], linestyle?: geotoolkit.attributes.LineStyle|string|any);
                /**
                 * Sets arrays of points
                 * @param x  (Required) x coordinates
                 * @param y  (Required) y coordinates
                 */
                setCoordinates(x: number[], y: number[]): this;
                /**
                 * Gets x-coords of points
                 */
                getPointsX(): number[];
                /**
                 * Gets y-coords of points
                 */
                getPointsY(): number[];
                /**
                 */
                getSize(): number;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.x  (Optional) x coordinates
                 * @param properties.y  (Optional) y coordinates
                 */
                setProperties(properties?: any | { x?: number[]; y?: number[]; } ): this;
            }
            /**
             * Defines an abstract node to represents a big tiled image
             */
            class TiledImage extends geotoolkit.scene.shapes.RectangularShape {
                /**
                 * Defines an abstract node to represents a big tiled image
                 * @param x1  (Optional) x coordinate of the top left corner OR  options to specify rectangle { x1 : {number}, y1 : {number}, x2 :
           {number}, y2 : {number} }
                 * @param y1  (Optional) y coordinate of the top left corner
                 * @param x2  (Optional) x coordinate of the bottom right corner
                 * @param y2  (Optional) y coordinate of the bottom right corner
                 */
                constructor(x1?: number|any, y1?: number, x2?: number, y2?: number);
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{cache:geotoolkit.scene.ViewCache}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.cache  (Optional) cache
                 */
                setProperties(properties?: any | { cache?: geotoolkit.scene.ViewCache; } ): this;
            }
            /**
             * Defines shape to draw a dynamic snapped rectangle which can be used to draw borders
             */
            class Border extends geotoolkit.scene.shapes.ScaledShape {
                /**
                 * Defines shape to draw a dynamic snapped rectangle which can be used to draw borders
                 * @param options  (Optional) deprecated (since 2.6 function type deprecated) options object or a function to return {@link geotoolkit.util.Rect} rectangle to draw a border
                 * @param options.callback  (Optional) deprecated a function to return {@link geotoolkit.util.Rect} rectangle to draw a border
                 * @param options.linestyle  (Optional) style applied on outline
                 * @param options.fillstyle  (Optional) style applied on fill
                 * @param options.borders  (Optional) style applied on borders, by default is {'left': true, 'right': true, 'bottom': true, 'top': true}
                 * @param options.borderstyle  (Optional) style applied on borders, "visible-bounds", "visible-width", "visible-height" or "model-bounds"
                 * @param fillstyle  (Optional) style applied on fill
                 */
                constructor(options?: Function|any | { callback?: Function; linestyle?: geotoolkit.attributes.LineStyle|string|any; fillstyle?: geotoolkit.attributes.FillStyle|string|any; borders?: any; borderstyle?: string; } , fillstyle?: geotoolkit.attributes.FillStyle|string|any);
                /**
                 * Sets the border style. Can be one from the list: "visible-bounds", "visible-width", "visible-height" or "model-bounds"
                 * @param style  (Required) border style
                 */
                setBorderStyle(style: string): this;
                /**
                 * copy constructor
                 * @param src  (Required) Source to copy from
                 */
                protected copyConstructor(src: geotoolkit.scene.shapes.Border): any;
                /**
                 * Returns an object { left: {boolean}, right: {boolean}, bottom: {boolean}, top: {boolean} };
                 */
                getBorders(): any;
                /**
                 * Sets borders state
                 * @param borders  (Required) JSON which defines border settings
                 * @param borders.top  (Optional) visibility of top part
                 * @param borders.bottom  (Optional) visibility of bottom part
                 * @param borders.left  (Optional) visibility of left part
                 * @param borders.right  (Optional) visibility of right part
                 */
                setBorders(borders: any | { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean; } ): this;
                /**
                 * Render
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Returns bounds
                 */
                getBounds(): geotoolkit.util.Rect;
                /**
                 * Sets bounds
                 * @param bounds  (Required) bounds of the shape
                 */
                setBounds(bounds: geotoolkit.util.Rect): this;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Required) An object containing the properties to set
                 * @param properties.borderstyle  (Optional) border style to be set
                 * @param properties.borders  (Optional) borders see {@link geotoolkit.scene.shapes.Border#setBorders}
                 */
                setProperties(properties: any | { borderstyle?: string; borders?: any; } ): this;
            }
            /**
             * Defines arrow node, a line with a symbol on one, both, or no ends.
             */
            class Arrow extends geotoolkit.scene.shapes.Line {
                /**
                 * Defines arrow node, a line with a symbol on one, both, or no ends.
                 * @param options  (Optional) origin point of arrow or the object with arrow properties
                 * @param options.from  (Optional) origin point of arrow
                 * @param options.to  (Optional) endpoint of arrow
                 * @param options.visible  (Optional) arrow visible
                 * @param options.symbolstart  (Optional) arrow start symbol
                 * @param options.symbolend  (Optional) arrow end symbol
                 * @param options.linestyle  (Optional) line style
                 * @param to  (Optional) endpoint of arrow
                 * @param visible  (Optional) arrow visible
                 * @param symbolstart  (Optional) arrow start symbol
                 * @param symbolend  (Optional) arrow end symbol
                 */
                constructor(options?: geotoolkit.util.Point|any | { from?: geotoolkit.util.Point; to?: geotoolkit.util.Point; visible?: boolean; symbolstart?: geotoolkit.scene.shapes.Symbol; symbolend?: geotoolkit.scene.shapes.Symbol; linestyle?: geotoolkit.attributes.LineStyle|string|any; } , to?: geotoolkit.util.Point, visible?: boolean, symbolstart?: geotoolkit.scene.shapes.Symbol, symbolend?: geotoolkit.scene.shapes.Symbol);
                /**
                 * Enum to define types of heads that arrow can have
                 */
                static Heads: any;
                /**
                 * Sets the symbol to be drawn at the start of the arrow
                 * @param symbol  (Required) symbol to be drawn at the start of the arrow
                 */
                setSymbolStart(symbol: geotoolkit.scene.shapes.Symbol): this;
                /**
                 * Sets the symbol to be drawn at the end of the arrow
                 * @param symbol  (Required) symbol to be drawn at the end of the arrow
                 */
                setSymbolEnd(symbol: geotoolkit.scene.shapes.Symbol): this;
                /**
                 * Sets the symbol to be drawn at both ends of the arrow
                 * @param symbol  (Required) symbol to be drawn at both ends of the arrow
                 */
                setSymbol(symbol: geotoolkit.scene.shapes.Symbol): this;
                /**
                 */
                getSymbolStart(): geotoolkit.scene.shapes.Symbol;
                /**
                 */
                getSymbolEnd(): geotoolkit.scene.shapes.Symbol;
                /**
                 * @param heads  (Required) the type of ends that this arrow had
                 */
                setHeads(heads: geotoolkit.scene.shapes.Arrow.Heads|string): this;
                /**
                 * Returns arrow heads
                 */
                getHeads(): geotoolkit.scene.shapes.Arrow.Heads|string;
                /**
                 * Render arrow
                 * @param context  (Required) Rendering Context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets all the properties pertaining to this object
                 */
                getProperties(): {props:{symbolstart:geotoolkit.scene.shapes.Symbol;symbolend:geotoolkit.scene.shapes.Symbol;heads:geotoolkit.scene.shapes.Arrow.Heads|string}}|any;
                /**
                 * Sets all the properties pertaining to this object
                 * @param properties  (Optional) JSON containing the properties to set
                 * @param properties.symbolstart  (Optional) start symbol
                 * @param properties.symbolend  (Optional) end symbol
                 * @param properties.heads  (Optional) the type of ends that this arrow had
                 */
                setProperties(properties?: any | { symbolstart?: geotoolkit.scene.shapes.Symbol|any; symbolend?: geotoolkit.scene.shapes.Symbol|any; heads?: geotoolkit.scene.shapes.Arrow.Heads|string; } ): this;
            }
            /**
             * Defines a shape which displays tiled images
             */
            class TiledShape extends geotoolkit.scene.shapes.RectangularShape {
                /**
                 * Defines a shape which displays tiled images
                 * @param options  (Required) JSON object with parameters
                 * @param options.provider  (Optional) Instance of data provider
                 * @param options.modelArea  (Optional) Bounds of the shape,
defines the size of image on the server
                 * @param options.capacity  (Optional) Number of tiles stored in cache
                 * @param options.tileW  (Optional) Width of a tile
                 * @param options.tileH  (Optional) Height of a tile
                 * @param options.maxNumReq  (Optional) Maximum number of requests that can be sent at the same time
                 * @param options.extendedrenderingborders  (Optional) option to request more data not only visible part
                 */
                constructor(options: any | { provider?: geotoolkit.scene.shapes.tiledshape.AbstractTileSource; modelArea?: geotoolkit.util.Rect; capacity?: number; tileW?: number; tileH?: number; maxNumReq?: number; extendedrenderingborders?: number; } );
                /**
                 * Sets options
                 * @param options  (Required) JSON object with parameters
                 * @param options.provider  (Optional) Instance of tile provider
                 * @param options.modelArea  (Optional) Bounds of the shape,
defines the size of image on the server
                 * @param options.capacity  (Optional) Number of tiles stored in cache
                 * @param options.tileW  (Optional) Width of a tile
                 * @param options.tileH  (Optional) Height of a tile
                 * @param options.maxNumReq  (Optional) Maximum number of requests that can be sent at the same time
                 */
                setOptions(options: any | { provider?: geotoolkit.scene.shapes.tiledshape.AbstractTileSource; modelArea?: geotoolkit.util.Rect; capacity?: number; tileW?: number; tileH?: number; maxNumReq?: number; } ): any;
                /**
                 * Render method, overrides render method of the parent. Calculates tiles required
                 * for the invalidated area (all the calculations are made in device coordinates),
                 * renders existing ones, or requests non existing ones
                 * @param context  (Required) a rendering context
                 */
                render(context: geotoolkit.renderer.RenderingContext): any;
                /**
                 * Gets image size of the tiled shape
                 */
                getModelArea(): geotoolkit.util.Rect;
            }
            module tiledshape {
                /**
                 * Define abstract source of tile for TiledShape
                 */
                class AbstractTileSource extends geotoolkit.util.EventDispatcher {
                    /**
                     * Define abstract source of tile for TiledShape
                     */
                    constructor();
                    /**
                     * Sends load request for the image, and sets callbacks
                     * @param tiledImg  (Required) tiled image to load
                     * @param callback  (Required) callback on successful load
                     * @param errCallback  (Required) callback on loading error
                     * @param area  (Required) The total area of the image
                     * @param tileRect  (Required) Tile rect in device coordinates
                     * @param modelTileRect  (Required) Tile rect im model coordinates
                     * @param i  (Required) i-coordinate of the tile (x)
                     * @param j  (Required) j-coordinate of the tile (y)
                     */
                    load(tiledImg: geotoolkit.scene.shapes.TiledShape, callback: Function, errCallback: Function, area: geotoolkit.util.Rect, tileRect: geotoolkit.util.Rect, modelTileRect: geotoolkit.util.Rect, i: number, j: number): any;
                    /**
                     * Kills an image whenever Tiled Shape has processed it
                     * @param id  (Required) id of the tile
                     */
                    doneWorkingWithImage(id: any): any;
                    /**
                     * @param id  (Required) Id of the image
                     */
                    requestPosted(id: any): boolean;
                    /**
                     */
                    numOfImages(): number;
                    /**
                     * Kills all images and their callbacks, however, images are not being stopped from loading
                     */
                    killAllImages(): any;
                    /**
                     * Resend load request for particular image
                     * @param id  (Required) The id of the image
                     */
                    reloadImage(id: any): any;
                    /**
                     * Sends a request to server to get image information
                     * @param obj  (Required) the calling object instance
                     * @param callback  (Required) callback to be called when info is received
                     */
                    getImageSize(obj: any, callback: Function): any;
                }
                /**
                 * Define default implementation of tile source
                 */
                class TileSource extends geotoolkit.scene.shapes.tiledshape.AbstractTileSource {
                    /**
                     * Define default implementation of tile source
                     * @param fileName  (Required) the name of image to load
                     * @param host  (Required) that will return titles upon request
                     * @param uriResolver  (Required) resolver
                     */
                    constructor(fileName: string, host: string, uriResolver: Function|any);
                }
            }
            module TiledShape {
                /**
                 * Define TiledShapeDataProvider
                 */
                class TiledShapeDataProvider extends geotoolkit.scene.shapes.tiledshape.TileSource {
                    /**
                     * Define TiledShapeDataProvider
                     * @param fileName  (Required) the name of image to load
                     * @param host  (Required) that will return titles upon request
                     * @param uriResolver  (Required) resolver
                     */
                    constructor(fileName: string, host: string, uriResolver: Function|any);
                }
            }
            module painters {
                /**
                 * Abstract Painter class
                 */
                class AbstractPainter {
                    /**
                     * Abstract Painter class
                     * @param symbol  (Required) the parent symbol, used to set properties
                     * @param bbox  (Required) bounding box this symbolPainter should paint within
                     * @param context  (Required) Rendering Context
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a circle symbol
                 */
                class CirclePainter {
                    /**
                     * Draws a circle symbol
                     * @param symbol  (Required) the parent symbol, used to set properties
                     * @param bbox  (Required) bounding box this symbolPainter should paint within
                     * @param context  (Required) Rendering Context
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a cross symbol
                 */
                class CrossPainter {
                    /**
                     * Draws a cross symbol
                     * @param symbol  (Required) the parent symbol, used to set properties
                     * @param bbox  (Required) bounding box this symbolPainter should paint within
                     * @param context  (Required) rendering Context
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a diamond symbol
                 */
                class DiamondPainter {
                    /**
                     * Draws a diamond symbol
                     * @param symbol  (Required) the parent symbol, used to set properties
                     * @param bbox  (Required) bounding box this symbolPainter should paint within
                     * @param context  (Required) rendering Context
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a plus symbol
                 */
                class PlusPainter {
                    /**
                     * Draws a plus symbol
                     * @param symbol  (Required) 
                     * @param bbox  (Required) 
                     * @param context  (Required) 
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a plus bar symbol that can be filled in by color
                 */
                class PlusBarPainter {
                    /**
                     * Draws a plus bar symbol that can be filled in by color
                     * @param symbol  (Required) the parent symbol, used to set properties
                     * @param bbox  (Required) bounding box this symbolPainter should paint within
                     * @param context  (Required) rendering Context
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a square symbol
                 */
                class SquarePainter {
                    /**
                     * Draws a square symbol
                     * @param symbol  (Required) 
                     * @param bbox  (Required) 
                     * @param context  (Required) 
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a star symbol
                 */
                class StarPainter {
                    /**
                     * Draws a star symbol
                     * @param symbol  (Required) 
                     * @param bbox  (Required) 
                     * @param context  (Required) 
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a star symbol with 5 spikes
                 */
                class Star5Painter {
                    /**
                     * Draws a star symbol with 5 spikes
                     * @param symbol  (Required) 
                     * @param bbox  (Required) 
                     * @param context  (Required) 
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a triangle symbol
                 */
                class TrianglePainter {
                    /**
                     * Draws a triangle symbol
                     * @param symbol  (Required) 
                     * @param bbox  (Required) 
                     * @param context  (Required) 
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a horizontal line
                 */
                class HorizontalLinePainter {
                    /**
                     * Draws a horizontal line
                     * @param symbol  (Required) the parent symbol, used to set properties
                     * @param bbox  (Required) bounding box this symbolPainter should paint within
                     * @param context  (Required) Rendering Context
                     */
                    constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                }
                /**
                 * Draws a font symbol
                 */
                class FontPainter extends geotoolkit.util.EventDispatcher {
                    /**
                     * Draws a font symbol
                     * @param url  (Required) font url
                     * @param family  (Required) font family, must match to file name
                     * @param text  (Required) text which be drawn as a symbol, ascii or unicode
                     */
                    constructor(url: string, family: string, text: string);
                    /**
                     * Draw text on context
                     * @param context  (Required) rendering context
                     * @param symbol  (Required) symbol, which uses this painter
                     * @param bbox  (Required) bounding box
                     */
                    render(context: geotoolkit.renderer.RenderingContext, symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect): any;
                }
                /**
                 * Draws line and symbol defined by painter
                 */
                class LineAndSymbolPainter extends geotoolkit.util.EventDispatcher {
                    /**
                     * Draws line and symbol defined by painter
                     * @param painter  (Optional) Painter to be displayed with Horizontal line painter
                     */
                    constructor(painter?: geotoolkit.scene.shapes.painters.AbstractPainter);
                    /**
                     * Sets symbol painter for Line Chart
                     * @param painter  (Optional) Painter to be displayed with Horizontal line painter
                     */
                    setPainter(painter?: geotoolkit.scene.shapes.painters.AbstractPainter): any;
                    /**
                     * Returns symbol painter
                     */
                    getPainter(): any|geotoolkit.scene.shapes.painters.AbstractPainter;
                    /**
                     * Draw text on context
                     * @param context  (Required) rendering context
                     * @param symbol  (Required) symbol, which uses this painter
                     * @param bbox  (Required) bounding box
                     */
                    render(context: geotoolkit.renderer.RenderingContext, symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect): any;
                }
                module oilandgas {
                    /**
                     * Draws a Brine symbol
                     */
                    class Brine {
                        /**
                         * Draws a Brine symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Dry symbol
                     */
                    class Dry {
                        /**
                         * Draws a Dry symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Dry Show Gas symbol
                     */
                    class DryShowGas {
                        /**
                         * Draws a Dry Show Gas symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Dry Show Oil symbol
                     */
                    class DryShowOil {
                        /**
                         * Draws a Dry Show Oil symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Dry Show OilGas symbol
                     */
                    class DryShowOilGas {
                        /**
                         * Draws a Dry Show OilGas symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Gas symbol
                     */
                    class Gas {
                        /**
                         * Draws a Gas symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Gas Show Oil symbol
                     */
                    class GasShowOil {
                        /**
                         * Draws a Gas Show Oil symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Injection symbol
                     */
                    class Injection {
                        /**
                         * Draws a Injection symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a location permit symbol
                     */
                    class LocationPermit {
                        /**
                         * Draws a location permit symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Location Permit Expired symbol
                     */
                    class LocationPermitExpired {
                        /**
                         * Draws a Location Permit Expired symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Lost symbol
                     */
                    class Lost {
                        /**
                         * Draws a Lost symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Observation symbol
                     */
                    class Observation {
                        /**
                         * Draws a Observation symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Oil symbol
                     */
                    class Oil {
                        /**
                         * Draws a Oil symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Oil Gas symbol
                     */
                    class OilGas {
                        /**
                         * Draws a Oil Gas symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Oil Show Gas symbol
                     */
                    class OilShowGas {
                        /**
                         * Draws a Oil Show Gas symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Plugged Brine symbol
                     */
                    class PluggedBrine {
                        /**
                         * Draws a Plugged Brine symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Plugged Gas symbol
                     */
                    class PluggedGas {
                        /**
                         * Draws a Plugged Gas symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Plugged Gas Show Oil symbol
                     */
                    class PluggedGasShowOil {
                        /**
                         * Draws a Plugged Gas Show Oil symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Plugged Injection symbol
                     */
                    class PluggedInjection {
                        /**
                         * Draws a Plugged Injection symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Plugged Oil symbol
                     */
                    class PluggedOil {
                        /**
                         * Draws a Plugged Oil symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Plugged Oil Gas symbol
                     */
                    class PluggedOilGas {
                        /**
                         * Draws a Plugged Oil Gas symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Plugged Oil Show Gas symbol
                     */
                    class PluggedOilShowGas {
                        /**
                         * Draws a Plugged Oil Show Gas symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Plugged Water Supply symbol
                     */
                    class PluggedWaterSupply {
                        /**
                         * Draws a Plugged Water Supply symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Show Gas symbol
                     */
                    class ShowGas {
                        /**
                         * Draws a Show Gas symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Show Oil symbol
                     */
                    class ShowOil {
                        /**
                         * Draws a Show Oil symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Show OilGas symbol
                     */
                    class ShowOilGas {
                        /**
                         * Draws a Show OilGas symbol
                         * @param symbol  (Required) 
                         * @param bbox  (Required) 
                         * @param context  (Required) 
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Unknown symbol
                     */
                    class Unknown {
                        /**
                         * Draws a Unknown symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Water symbol
                     */
                    class Water {
                        /**
                         * Draws a Water symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                    /**
                     * Draws a Water Supply symbol
                     */
                    class WaterSupply {
                        /**
                         * Draws a Water Supply symbol
                         * @param symbol  (Required) symbol
                         * @param bbox  (Required) bounding box
                         * @param context  (Required) rendering context
                         */
                        constructor(symbol: geotoolkit.scene.shapes.Symbol, bbox: geotoolkit.util.Rect, context: geotoolkit.renderer.RenderingContext);
                    }
                }
            }
            module Image {
                /**
                 * Image's Events enumerator
                 */
                interface Events {
                    /**
                     * Event type fired when an image is done loading
                     */
                    ImageLoaded: string;
                    /**
                     * Event type fired if an image loading is failed
                     */
                    ImageFailed: string;
                }
            }
            module Text {
                /**
                 * Enum of size modes (to specify that size mode depends from width and height use Text.SizeMode.FixedWidth | Text.SizeMode.FixedHeight)
                 */
                interface SizeMode {
                    /**
                     * From Font: calculates text size based only on font
                     */
                    FromFont: number;
                    /**
                     * Fixed Width: calculates text size based on width
                     */
                    FixedWidth: number;
                    /**
                     * Fixed Height: calculates text size based on height
                     */
                    FixedHeight: number;
                    /**
                     * From Font when possible: calculates text size based only on font. Makes it fit width/height if text too big.
                     */
                    FromFontWhenPossible: number;
                    /**
                     * Wrapped Width: adds line breaks between words to fit it into a user defined width
                     * Will not Split words that are larger than Width
                     * *WARNING* This is an expensive operation and using it for very large pieces of texts is not advised
                     * If you know your width and font and will not be changing these it is better to manually split the line yourself
                     */
                    WrappedWidth: number;
                    /**
                     * WrappedWidthSplitWords: adds line breaks to text to fit it into a user defined width
                     * Will Split words that are larger than Width
                     * *WARNING* This is an expensive operation and using it for very large pieces of texts is not advised
                     * If you know your width and font and will not be changing these it is better to manually split the line yourself
                     */
                    WrappedWidthSplitWords: number;
                }
            }
            module Polyline {
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
            module Arrow {
                /**
                 * Enum to define types of heads that arrow can have
                 */
                interface Heads {
                    /**
                     * Symbol at start of arrow
                     */
                    Start: string;
                    /**
                     * Symbol at end of arrow
                     */
                    End: string;
                    /**
                     * Symbol on both ends of the arrow
                     */
                    Both: string;
                    /**
                     * No symbols on arrow
                     */
                    None: string;
                }
            }
        }
        module Node {
            /**
             * Type of state changes
             */
            interface StateChanges {
                /**
                 * Window pixel scale is changed
                 */
                PixelScaleChanged: string;
                /**
                 * Node is translated
                 */
                Translated: string;
                /**
                 * Required to rebuild tree
                 */
                Rebuild: string;
                /**
                 * Parent state changed
                 */
                TransformationChanged: string;
                /**
                 * UpdateLayout
                 */
                UpdateLayout: string;
                /**
                 * Style Changed
                 */
                StyleChanged: string;
            }
            /**
             * Node Events enumerator
             */
            interface Events {
                /**
                 * Event type fired when a shape is modified and requires a render cycle to be done
                 */
                Invalidate: string;
                /**
                 * Event type fired when a shape is added as a child to another shape
                 */
                ChildAdded: string;
                /**
                 * Event type fired when a shape is removed from another shape children.
                 */
                ChildRemoved: string;
                /**
                 * Event type fired when a shape's modellimits have been changed. For example using setModelLimits()
                 */
                ModelLimitsChanged: string;
                /**
                 * Event type fired when a node's SceneTransformation has been changed.
                 */
                SceneTransformationChanged: string;
                /**
                 * Event type fired when a node's LocalTransformation has been changed.
                 */
                LocalTransformationChanged: string;
                /**
                 * Event type fired when a node's order has been changed.
                 */
                NodeOrderChanged: string;
                /**
                 * Changed
                 */
                Changed: string;
                /**
                 * Changed
                 */
                BoundsChanged: string;
                /**
                 * Visibility is changed
                 */
                VisibilityChanged: string;
                /**
                 * Css class is changed
                 */
                CssClassChanged: string;
            }
        }
        module CompositeNode {
            /**
             * Enum for node order
             */
            interface NodeOrder {
                /**
                 * First in array
                 */
                First: string;
                /**
                 * An index prior to the given anchor node
                 */
                Before: string;
                /**
                 * An index next to the given anchor node
                 */
                After: string;
                /**
                 * Last in the array
                 */
                Last: string;
                /**
                 * An index next to where it currently is
                 */
                Forward: string;
                /**
                 * An index prior to where it currently is
                 */
                Backward: string;
            }
        }
        module Cache {
            /**
             * Enum of cache mode
             */
            interface CacheMode {
                /**
                 * Shared
                 */
                Shared: number;
                /**
                 * Independent
                 */
                Independent: number;
            }
        }
        module AnnotatedNode {
            /**
             * AnnotatedNode's Events enumerator
             */
            interface Events {
                /**
                 * Event type fired when the shape is updating
                 */
                Updating: string;
            }
        }
        module ScaleScrollStrategy {
            /**
             * KeepAspectRatio scaling modes
             */
            interface KeepAspectRatioScalingMode {
                /**
                 * Most
                 */
                Most: string;
                /**
                 * Least
                 */
                Least: string;
                /**
                 * Average
                 */
                Average: string;
            }
        }
    }
    module selection {
        /**
         * Enum of traverse direction
         */
        var Direction: any;
        /**
         * Query all nodes from the specified node and do the specified action
         * @param node  (Required) node to start search
         * @param direction  (Optional) traverse direction
         */
        function from(node: geotoolkit.scene.Node, direction?: geotoolkit.selection.Direction): geotoolkit.selection.NodeQueryBuilder;
        /**
         * Define a base selection context to be used for picking strategies
         */
        class SelectionContext extends geotoolkit.renderer.RenderingContext {
            /**
             * Define a base selection context to be used for picking strategies
             */
            constructor();
            /**
             * Check selection of node and call onselect if node is selected
             * @param node  (Required) node to pick
             * @param listener  (Required) function to be called on select
             */
            pick(node: geotoolkit.scene.Node, listener: Function): any;
            /**
             * Push selection
             * @param selection  (Required) selected object
             */
            pushSelection(selection: any): this;
        }
        /**
         * Defines node selection. This class provides the logic to do shape selection using device coordinates.<br>
         * It implements several algorithms to perform different types of selection:
         * <ul>
         * <li> By point: At a given point with an optional radius </li>
         * <li> By rect: In a given rectangle </li>
         * <li> By polygon: In a given arbitrary polygon </li>
         * </ul>
         *  The picking algorithm implemented in this Selector emulates 'rendering' to perform the selection and find the shape(s) at the given coordinates.<br>
         *  Selection returns multiple objects in the current position.
         */
        class Selector {
            /**
             * Defines node selection. This class provides the logic to do shape selection using device coordinates.<br>
             * It implements several algorithms to perform different types of selection:
             * <ul>
             * <li> By point: At a given point with an optional radius </li>
             * <li> By rect: In a given rectangle </li>
             * <li> By polygon: In a given arbitrary polygon </li>
             * </ul>
             *  The picking algorithm implemented in this Selector emulates 'rendering' to perform the selection and find the shape(s) at the given coordinates.<br>
             *  Selection returns multiple objects in the current position.
             * @param transformation  (Optional) transformation from current node to plot (device). It is equal
to node.getParent().getSceneTransform(). If a root node is used as a start node then it is not necessary
to specify transformation.
             */
            constructor(transformation?: geotoolkit.util.Transformation);
            /**
             * Select node in the current point OR in the polygonal area. This method starts selection from the specified node.
             * Coordinates provided are in the parent node coordinate system or device coordinates if the node is a root.
             * @param root  (Required) node to be used for selection.
             * @param p1  (Required) x-coordinate of the selection point OR x-coordinates of the selection polygon OR a selection rectangle.
             * @param p2  (Required) y-coordinate of the selection point OR y-coordinates of the selection polygon.
             * @param p3  (Required) selection radius OR "allow intersection" flag
             * @param p4  (Optional) even odd mode for polygonal selection
             */
            select(root: geotoolkit.scene.Node, p1: number|any[]|geotoolkit.util.Rect, p2: number|any[], p3: number|boolean, p4?: boolean): geotoolkit.scene.Node[];
            /**
             * Select node in the current point OR in the polygonal area. This method starts selection from the specified node.
             * Coordinates provided are in the parent node coordinate system or device coordinates if the node is a root.
             * @param callback  (Required) selection callback
             * @param root  (Required) node to be used for selection.
             * @param p1  (Required) x-coordinate of the selection point OR x-coordinates of the selection polygon OR a selection rectangle OR center point.
             * @param p2  (Required) y-coordinate of the selection point OR y-coordinates of the selection polygon OR radius (in case if p1 is geotoolkit.util.Point).
             * @param p3  (Required) selection radius OR "allow intersection" flag
             * @param p4  (Optional) even odd mode for polygonal selection
             */
            asyncSelect(callback: Function, root: geotoolkit.scene.Node, p1: number|any[]|geotoolkit.util.Rect|geotoolkit.util.Point, p2: number|any[], p3: number|boolean, p4?: boolean): any;
            /**
             * Sets current transformation
             * @param transformation  (Required) transformation from current node to device
             */
            setTransformation(transformation: geotoolkit.util.Transformation): this;
            /**
             * Gets current transformation
             */
            getTransformation(): geotoolkit.util.Transformation;
        }
        /**
         * This class parses formulas and logical conditions to expression, which can be used as
         * a function
         */
        class QueryParser {
            /**
             * This class parses formulas and logical conditions to expression, which can be used as
             * a function
             * @param functions  (Required) array of functions
             */
            constructor(functions: Function[]);
            /**
             * Register additional functions
             * @param functions  (Required) function to be registered
             */
            registerFunctions(functions: any): any;
            /**
             * Parse string to expressions
             * @param s  (Required) string to parse
             */
            parse(s: string): any;
        }
        /**
         * Provides search by any item in the hierarchical structure
         */
        class QueryBuilder {
            /**
             * Provides search by any item in the hierarchical structure
             * @param item  (Required) item to apply this query
             * @param options  (Optional) an additional options
             * @param options.parser  (Optional) a parser to be used to parse search request
             * @param options.map  (Optional) a map of functions to be used
             * @param options.enumerateItems  (Optional) enumerate children items
             * @param options.values  (Optional) function tio return a map of values to be used in query like node
             */
            constructor(item: any, options?: any | { parser?: geotoolkit.selection.QueryParser; map?: any; enumerateItems?: Function; values?: Function; } );
            /**
             * Iterates over the children of the given item.
             * This iterator does not support concurrent modification (the callback provided should not add/remove children)
             * @param item  (Required) item to apply this query
             * @param callback  (Required) The callback function taking the parameters: (child, index, node, this)
             */
            enumerateNodes(item: geotoolkit.scene.Node|any, callback: Function): any;
            /**
             * Specify filter
             * @param f  (Required) function or condition to provide filter of items or string to specify query
             */
            where(f: Function|string): this;
            /**
             * Execute all queries
             * @param callback  (Required) function called for each item that matches this query condition
             */
            select(callback: Function): this;
            /**
             * Register functions
             * @param functions  (Required) allows to register additional functions
             */
            functions(functions: any): this;
            /**
             * Execute all queries
             * @param callback  (Required) function called for each item that matches this query condition
             */
            execute(callback: Function): this;
            /**
             * Select all items to array
             */
            selectToArray(): any[];
            /**
             * Select the first item
             */
            selectFirst(): any|any;
        }
        class NodeQueryBuilder extends geotoolkit.selection.QueryBuilder {
            /**
             * @param node  (Required) node to apply this query
             * @param parser  (Optional) query parser
             * @param direction  (Optional) traverse direction
             */
            constructor(node: geotoolkit.scene.Node, parser?: geotoolkit.selection.QueryParser, direction?: geotoolkit.selection.Direction);
        }
        /**
         * Enum of traverse direction
         */
        interface Direction {
            /**
             * Upward
             */
            Upwards: string;
            /**
             * Downward
             */
            Downwards: string;
        }
    }
    module axis {
        /**
         * Enum of zoom level
         */
        var DateZoomLevel: any;
        /**
         * Enum of time zone
         */
        var TimeZone: any;
        /**
         * Enum of axis orientations
         */
        var AxisOrientation: any;
        /**
         * Define axis model dimension. This is experimental api
         */
        class AxisDimension extends geotoolkit.util.EventDispatcher {
            /**
             * Define axis model dimension. This is experimental api
             * @param options  (Optional) The options
             * @param options.name  (Optional) name of the dimension
             * @param options.orientation  (Optional) axis orientation
             */
            constructor(options?: any | { name?: string; orientation?: geotoolkit.axis.AxisOrientation; } );
            /**
             * Dimension Events enumerator
             */
            static Events: any;
            /**
             * Sets axis orientation
             * @param orientation  (Required) axis orientation
             */
            setOrientation(orientation: geotoolkit.axis.AxisOrientation): this;
            /**
             * Gets axis orientation
             */
            getOrientation(): geotoolkit.axis.AxisOrientation;
            /**
             * Return minimum value
             */
            getMin(): number;
            /**
             * Sets options
             * @param options  (Required) data
             */
            setOptions(options: any): this;
            /**
             * Enable / disable neat limits
             * @param enable  (Required) enable or disable neat limits
             */
            setNeatLimits(enable: boolean): this;
            /**
             * Returns true if neat limits is enabled.
             */
            getNeatLimits(): boolean;
            /**
             * Return options
             */
            getOptions(): any;
            /**
             * Return minimum value
             */
            getMax(): number;
            /**
             * Update limits
             * @param min  (Required) minimum value
             * @param max  (Required) maximum value
             * @param transformation  (Required) from model range to device
             */
            updateLimits(min: number, max: number, transformation: geotoolkit.util.Transformation): any;
        }
        /**
         * Define axis model dimension. This is experimental api
         */
        class AxisLinearDimension extends geotoolkit.axis.AxisDimension {
            /**
             * Define axis model dimension. This is experimental api
             * @param options  (Optional) The options
             * @param options.name  (Optional) name of the dimension
             * @param options.minspan  (Optional) desired minimum distance between ticks in pixels
             * @param options.desiredmodelstep  (Optional) desired model step
             */
            constructor(options?: any | { name?: string; minspan?: number; desiredmodelstep?: number; } );
            /**
             * Return desired model spacing
             */
            getSpacing(): number;
            /**
             * Update limits
             * @param min  (Required) minimum value
             * @param max  (Required) maximum value
             * @param transformation  (Required) from model range to device
             */
            updateLimits(min: number, max: number, transformation: geotoolkit.util.Transformation): any;
        }
        /**
         * Abstraction to formalize an input value transform
         */
        class ValueTransformer {
            /**
             * Abstraction to formalize an input value transform
             */
            constructor();
            /**
             * Transforms input value
             * @param inputValue  (Required) value to transform
             */
            transform(inputValue: number): number;
        }
        /**
         * ValueTransform implementation for piece-linear case.
         */
        class PieceLinearValueTransformer extends geotoolkit.axis.ValueTransformer {
            /**
             * ValueTransform implementation for piece-linear case.
             * @param inputValues  (Optional) array of input values
             * @param outputValues  (Optional) array of output values
             * @param extrapolationType  (Optional) Enum of ExtrapolationType
             */
            constructor(inputValues?: number[], outputValues?: number[], extrapolationType?: geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType);
            /**
             * Enum of extrapolation types (Out-of-range input value's transformed value)
             */
            static ExtrapolationType: any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.inputValues  (Optional) array of input values with size not less than 2
             * @param properties.outputValues  (Optional) array of output values
             * @param properties.extrapolationType  (Optional) Enum of ExtrapolationType
             */
            setProperties(properties: any | { inputValues?: number[]; outputValues?: number[]; extrapolationType?: geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType; } ): this;
            /**
             * Gets extrapolation type (by default: PieceLinearValueTransformer.ExtrapolationType.Boundary)
             */
            getExtrapolationType(): geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType;
            /**
             * Sets extrapolation type for out-of-range input values
             * @param extrapolationType  (Required) Enum of ExtrapolationType
             */
            setExtrapolationType(extrapolationType: geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType): this;
            /**
             * Transforms input value
             * @param val  (Required) inputValue value to transform
             * @param reverse  (Optional) direction of transformation
             */
            transform(val: number, reverse?: boolean): number;
        }
        /**
         * Define a base class for tick generators. Toolkit provides several tick generators to help generate numeric labels.<br>
         * It generates ticks and labels based on the tick info and tickgrades. {@link geotoolkit.axis.Axis} uses the TickGenerator while creating the axis.
         * Please refer to Axes and Grids Tutorial in CarnacJS for examples of the different tick generators supported.<br>
         * A tick generator mainly provides the positions of sequential ticks as well as the informational data associated with tick positions.
         */
        class TickGenerator {
            /**
             * Define a base class for tick generators. Toolkit provides several tick generators to help generate numeric labels.<br>
             * It generates ticks and labels based on the tick info and tickgrades. {@link geotoolkit.axis.Axis} uses the TickGenerator while creating the axis.
             * Please refer to Axes and Grids Tutorial in CarnacJS for examples of the different tick generators supported.<br>
             * A tick generator mainly provides the positions of sequential ticks as well as the informational data associated with tick positions.
             */
            constructor();
            /**
             * Returns valid Tick Grades : "EDGE", "MAJOR", "MINOR"
             */
            getTickGrades(): string[];
            /**
             * Reset max label info
             */
            protected resetMaxLabels(): this;
            /**
             * Returns max labels for each type of grades
             * @param tickInfo  (Required) info about the tick
             * @param orient  (Required) orientation
             * @param fromValue  (Required) generate labels from
             * @param toValue  (Required) generate labels to
             */
            protected getMaxLabels(tickInfo: geotoolkit.axis.TickInfo, orient: geotoolkit.axis.AxisOrientation|string, fromValue: number, toValue: number): any[];
            /**
             * Returns maximum label.
             * @param parent  (Required) parent axis or grid
             * @param orientation  (Required) orientation
             * @param tickInfo  (Required) info about tick position
             * @param fromValue  (Required) generate labels from
             * @param toValue  (Required) generate labels to
             */
            getMaxLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orientation: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, fromValue: number, toValue: number): string;
            /**
             * Returns maximum label metrics. For internal use only
             * @param parent  (Required) parent axis or grid
             * @param orientation  (Required) orientation
             * @param tickInfo  (Required) info about tick position
             * @param fromValue  (Required) generate labels from
             * @param toValue  (Required) generate labels to
             */
            protected getMaxLabelMetrics(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orientation: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, fromValue: number, toValue: number): geotoolkit.util.Dimension;
            /**
             * Returns bounding box of label
             * @param tickInfo  (Required) info about the tick
             * @param orient  (Required) orientation
             * @param labelPos  (Required) label position along index direction
             * @param labelText  (Optional) label text. If not defined labelPos.toString() is used.
             */
            getBoundingBox(tickInfo: geotoolkit.axis.TickInfo, orient: geotoolkit.axis.AxisOrientation|string, labelPos: number, labelText?: string): geotoolkit.util.Rect;
            /**
             * Gets label anchor type
             * @param grade  (Required) tick grade
             */
            getLabelAnchorType(grade: string): geotoolkit.util.AnchorType;
            /**
             * Sets label anchor type
             * @param grade  (Required) tick grade
             * @param anchorType  (Required) anchorType
             */
            setLabelAnchorType(grade: string, anchorType: geotoolkit.util.AnchorType): this;
            /**
             * Sets visibility of tick for a specific tick grade
             * Implementation of the reset should check visibility of the ticks
             * @param tickGrade  (Required) Tick grade
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             * @param visible  (Required) tick grade visibility flag
             */
            setVisibleTickGrade(tickGrade: string, visible: boolean): this;
            /**
             * Returns visibility of tick for a specific tick grade
             * @param tickGrade  (Required) Tick grade
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             */
            isVisibleTickGrade(tickGrade: string): boolean;
            /**
             * Sets visibility of label for a specific tick grade
             * Implementation of the reset should check visibility of the labels.
             * @param tickGrade  (Required) Tick grade
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             * @param visible  (Required) tick label visibility flag
             */
            setVisibleLabelGrade(tickGrade: string, visible: boolean): this;
            /**
             * Returns visibility of label for a specific tick grade
             * @param tickGrade  (Required) Tick grade
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             */
            isVisibleLabelGrade(tickGrade: string): boolean;
            /**
             * Sets tick style
             * @param tickGrade  (Required) Tick grade
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             * @param lineStyle  (Optional) line style for the tick
             */
            setTickStyle(tickGrade: string, lineStyle?: geotoolkit.attributes.LineStyle|string|any): this;
            /**
             * Changes the size of specified ticks
             * @param grade  (Required) Grade of the tick to set the size
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             * @param size  (Required) New size
             */
            setTickSize(grade: string, size: number): this;
            /**
             * Returns the size of specified tick
             * @param grade  (Required) Grade of the tick to get the size
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             */
            getTickSize(grade: string): number|any;
            /**
             * Returns tick style
             * @param tickGrade  (Required) Tick Grade
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             */
            getTickStyle(tickGrade: string): geotoolkit.attributes.LineStyle;
            /**
             * Sets label style
             * @param tickGrade  (Required) Tick grade
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             * @param labelStyle  (Optional) tick text style
             */
            setLabelStyle(tickGrade: string, labelStyle?: geotoolkit.attributes.TextStyle|string|any): this;
            /**
             * Returns label style
             * @param tickGrade  (Required) Tick grade
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             */
            getLabelStyle(tickGrade: string): geotoolkit.attributes.TextStyle;
            /**
             * Sets label rotation angle
             * @param tickGrade  (Required) Tick grade
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             * @param angle  (Required) label rotation angle, in radians
             */
            setLabelRotationAngle(tickGrade: string, angle: number): this;
            /**
             * Returns label rotation angle
             * @param tickGrade  (Required) Tick grade
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             */
            getLabelRotationAngle(tickGrade: string): number;
            /**
             * Sets precision from string
             * @param precision  (Required) precision to be set
             */
            setPrecision(precision: string): this;
            /**
             * Executes delegate and returns the result
             * @param delegate  (Required) execute delegate and return the result
             */
            execute(delegate: Function): any|this;
            /**
             * Sets tag
             * @param tag  (Required) user can specify info associated with current object
             */
            setTag(tag: any): this;
            /**
             * Returns tag
             */
            getTag(): any;
            /**
             * Resets tick generator
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            reset(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): string[];
            /**
             * Resets tick generator asynchronously
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             * @param callback  (Required) calls when asynchronous reset is done
             */
            resetAsync(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, callback: Function): any;
            /**
             * Reset labels. This method is called to start iteration by labels.
             * The implementation also sets appropriate {@link geotoolkit.attributes.TextStyle} on labels.
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) a info about labels. This information is used to pass and receive information about the current tick or label
             */
            resetLabels(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Resets ticks. This method is called to start iteration by ticks.
             * The implementation also sets appropriate {@link geotoolkit.attributes.LineStyle} on the ticks
             * as well as their tick size.
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) a info about labels. This information is used to pass and receive information about the current tick or label
             */
            resetTicks(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Generates information about next label
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) info about tick
             * @param tickIndex  (Required) tickIndex tick index from 0 to count-1, which resetLabels returns
             */
            nextLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Generates information about next tick
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) info about tick
             * @param tickIndex  (Required) tick index from 0 to count-1, which resetTicks returns
             */
            nextTick(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Gets adjust label anchor flag for specified label grade
             * @param grade  (Required) label grade
             */
            getAdjustLabelAnchor(grade: string): boolean;
            /**
             * Sets adjust label anchor flag for specified label grade
             * @param grade  (Required) label grade
             * @param flag  (Required) adjust label anchor flag
             */
            setAdjustLabelAnchor(grade: string, flag: boolean): this;
            /**
             * Formats label text. This method must be overridden in the base classes and the the base class method must be called first.
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) a info about tick
             * @param tickIndex  (Required) tickIndex tick index from 0 to count-1, which resetLabels returns
             * @param modelValue  (Required) model value
             */
            formatLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number, modelValue: number): string;
            /**
             * Returns an array of the visible tick grades
             * @param supported  (Required) supported grades
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             */
            getVisibleTickGrades(supported: string[]): string[];
            /**
             * Return an array of the visible label grades
             * @param supported  (Required) supported grades
see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
             */
            getVisibleLabelGrades(supported: string[]): string[];
            /**
             * Copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.TickGenerator): any;
            /**
             * Clone
             */
            clone(): geotoolkit.axis.TickGenerator;
            /**
             * Gets all the properties pertaining to this object
             * See {@link geotoolkit.axis.TickGenerator.setProperties} for details
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.major  (Optional) An object containing major grade properties
             * @param properties.minor  (Optional) An object containing minor grade properties
             * @param properties.edge  (Optional) An object containing edge grade properties
See {geotoolkit.axis.TickGenerator.setTickOptions} for Tick properties
             * @param properties.tickstyles  (Optional) An object containing tick styles for specified grades
             * @param properties.visibleticks  (Optional) An object containing tick visibility for specified grades
             * @param properties.ticksizes  (Optional) An object containing tick sizes for specified grades
             * @param properties.labelstyles  (Optional) An object containing label style for specified grades
             * @param properties.visiblelabels  (Optional) An object containing label visibility for specified grades
             * @param properties.labelangles  (Optional) An object containing label rotation angles for specified grades
             * @param properties.transformer  (Optional) transformer label value transformer
             * @param properties.tag  (Optional) tag user can specify info associated with current object
             */
            setProperties(properties: any | { major?: any; minor?: any; edge?: any; tickstyles?: any; visibleticks?: any; ticksizes?: any; labelstyles?: any; visiblelabels?: any; labelangles?: any; transformer?: geotoolkit.axis.ValueTransformer|Function|any; tag?: any; } ): this;
            /**
             * Sets label value transformer (optional)
             * @param transformer  (Required) label value transformer
             */
            setLabelValueTransformer(transformer: geotoolkit.axis.ValueTransformer|Function|any): this;
            /**
             * Gets label value transformer (by default: 'undefined' - no transformation is applied to a value)
             */
            getLabelValueTransformer(): geotoolkit.axis.TickGenerator;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) An object containing the properties to set
             * @param properties.major  (Optional) An object containing the major ticks properties
             * @param properties.major.tickstyle  (Optional) JSON containing the properties to set LineStyle of tick. See {geotoolkit.attributes.LineStyle.setProperties} for details
             * @param properties.major.tickvisible  (Optional) tick visibility
             * @param properties.major.labelstyle  (Optional) JSON containing the properties to set TextStyle of label. See {geotoolkit.attributes.TextStyle.setProperties} for details
             * @param properties.major.labelvisible  (Optional) label visibility
             */
            setOptions(properties?: any | { major?: any | { tickstyle?: any; tickvisible?: boolean; labelstyle?: any; labelvisible?: boolean; } ; } ): this;
            /**
             * Sets all the properties pertaining to this tick
             * @param properties  (Optional) An object containing the properties to set
             * @param properties.tickstyle  (Optional) JSON containing the properties to set LineStyle of tick. See {geotoolkit.attributes.LineStyle.setProperties} for details
             * @param properties.tickvisible  (Optional) tick visibility
             * @param properties.ticksize  (Optional) tick size
             * @param properties.labelstyle  (Optional) JSON containing the properties to set TextStyle of label. See {geotoolkit.attributes.TextStyle.setProperties} for details
             * @param properties.labelvisible  (Optional) label visibility
             * @param properties.labelangle  (Optional) angle label rotation angle, in radians
             * @param tickGrade  (Optional) Tick grade
             */
            setTickOptions(properties?: any | { tickstyle?: any; tickvisible?: boolean; ticksize?: number; labelstyle?: any; labelvisible?: boolean; labelangle?: number; } , tickGrade?: string): this;
        }
        /**
         * Define an abstract class for numeric tick generators
         */
        class NumericTickGenerator extends geotoolkit.axis.TickGenerator {
            /**
             * Define an abstract class for numeric tick generators
             */
            constructor();
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.NumericTickGenerator): any;
            /**
             * Sets label format
             * @param tickGrade  (Required) grade to set format: "MAJOR", "MINOR", "EDGE"
             * @param format  (Required) number format for label
             */
            setLabelFormat(tickGrade: string, format: geotoolkit.util.NumberFormat): this;
            /**
             * Returns label format
             * @param tickGrade  (Required) grade to get format: "MAJOR", "MINOR", "EDGE"
             */
            getLabelFormat(tickGrade: string): geotoolkit.util.NumberFormat;
            /**
             * Sets locale
             * @param locale  (Required) locale
             */
            setLocale(locale: geotoolkit.util.Locale|string): this;
            /**
             * Return the current locale
             */
            getLocale(): geotoolkit.util.Locale|string;
            /**
             * Format label
             * @param upperTickType  (Required) "EDGE" or "MAJOR" or "MINOR"
             * @param modelValue  (Required) model coordinate position
             */
            protected formatLabelInternal(upperTickType: string, modelValue: number): string;
            /**
             * Formats label text
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             * @param tickIndex  (Required) index at tick position
             * @param modelValue  (Required) model coordinate value
             */
            formatLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number, modelValue: number): string;
            /**
             * Sets format label handler
             * @param handler  (Required) handler is called to specify format of the label
             */
            setFormatLabelHandler(handler: Function): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.transformer  (Optional) class used for transformation
             * @param properties.labelformat  (Optional) label format, label format to be applied to all grades
             * @param properties.edge  (Optional) JSON object container - Generated
             * @param properties.edge.labelformat  (Optional) edge label format
             * @param properties.major  (Optional) JSON object container - Generated
             * @param properties.major.labelformat  (Optional) major label format
             * @param properties.minor  (Optional) JSON object container - Generated
             * @param properties.minor.labelformat  (Optional) minor label format
             * @param properties.formatlabeleventhandler  (Optional) formatlebeleventhandler
             */
            setProperties(properties: any | { transformer?: any; labelformat?: any|geotoolkit.util.NumberFormat; edge?: any | { labelformat?: any; } ; major?: any | { labelformat?: any; } ; minor?: any | { labelformat?: any; } ; formatlabeleventhandler?: Function; } ): this;
        }
        /**
         * Define information about tick, which is used in tick generator
         */
        class TickInfo {
            /**
             * Define information about tick, which is used in tick generator
             * @param tickType  (Required) tick type like major, minor, edge
             * @param tickPosition  (Required) Enum of axis tick positions
             * @param tickSize  (Required) size of the tick
             * @param lineStyle  (Required) line style
             * @param textStyle  (Required) text style
             */
            constructor(tickType: string, tickPosition: geotoolkit.axis.TickInfo.TickPosition, tickSize: number, lineStyle: geotoolkit.attributes.LineStyle, textStyle: geotoolkit.attributes.TextStyle);
            /**
             * Enum of axis tick positions
             */
            static TickPosition: any;
            /**
             * Enum of label positions
             */
            static LabelPosition: any;
            /**
             * Set model bounds
             * @param modelBounds  (Required) model bounds
             */
            setModelBounds(modelBounds: geotoolkit.util.Rect): this;
            /**
             * Set visible model bounds
             * @param modelBounds  (Required) visible model bounds
             */
            setVisibleModelBounds(modelBounds: geotoolkit.util.Rect): this;
            /**
             * Get model bounds
             */
            getModelBounds(): geotoolkit.util.Rect;
            /**
             * Get visible model bounds
             */
            getVisibleModelBounds(): geotoolkit.util.Rect;
            /**
             * Set device bounds
             * @param deviceBounds  (Required) bounds of the device
             */
            setDeviceBounds(deviceBounds: geotoolkit.util.Rect): this;
            /**
             * Set visible device bounds
             * @param deviceBounds  (Required) visible device bounds
             */
            setVisibleDeviceBounds(deviceBounds: geotoolkit.util.Rect): this;
            /**
             * Get device bounds
             */
            getDeviceBounds(): geotoolkit.util.Rect;
            /**
             * Get visible device bounds
             */
            getVisibleDeviceBounds(): geotoolkit.util.Rect;
            /**
             * Set context transform
             * @param transformation  (Required) transformation from model space to device space
             */
            setContextTransformation(transformation: geotoolkit.util.Transformation): this;
            /**
             * Get context transform
             */
            getContextTransformation(): geotoolkit.util.Transformation;
            /**
             * Set tick end
             * @param end  (Required) tick end
             */
            setTickEnd(end: number): this;
            /**
             * Get tick end
             */
            getTickEnd(): number;
            /**
             * Set tick origin
             * @param origin  (Required) tick origin
             */
            setTickOrigin(origin: number): this;
            /**
             * Get tick origin
             */
            getTickOrigin(): number;
            /**
             * Set anchor type
             * @param type  (Required) anchor position of the label
             */
            setAnchorType(type: geotoolkit.util.AnchorType): this;
            /**
             * Get anchor type
             */
            getAnchorType(): geotoolkit.util.AnchorType;
            /**
             * Return tick type as string
             */
            getTickType(): string;
            /**
             * Sets tick type
             * @param tickType  (Required) a tick type
             */
            setTickType(tickType: string): this;
            /**
             * Return line style
             */
            getLineStyle(): geotoolkit.attributes.LineStyle;
            /**
             * Sets line style
             * @param lineStyle  (Required) line style
             */
            setLineStyle(lineStyle: geotoolkit.attributes.LineStyle): this;
            /**
             * Return text style
             */
            getTextStyle(): geotoolkit.attributes.TextStyle;
            /**
             * Sets text style
             * @param textStyle  (Required) text style
             */
            setTextStyle(textStyle: geotoolkit.attributes.TextStyle): this;
            /**
             * Return tick position
             */
            getTickPosition(): number;
            /**
             * Sets tick position
             * @param tickPosition  (Required) tick position
             */
            setTickPosition(tickPosition: number): this;
            /**
             * Return rotation angle
             */
            getRotationAngle(): number;
            /**
             * Sets rotation angle
             * @param rotationAngle  (Required) rotation angle
             */
            setRotationAngle(rotationAngle: number): this;
            /**
             * Return tick size
             */
            getTickSize(): number;
            /**
             * Return axis dimension
             */
            getAxisDimension(): geotoolkit.axis.AxisDimension;
            /**
             * Sets axis dimension
             * @param dimension  (Required) axis dimension
             */
            setAxisDimension(dimension: geotoolkit.axis.AxisDimension): this;
            /**
             * Set tick size
             * @param tickSize  (Required) a tick size
             */
            setTickSize(tickSize: number): this;
            /**
             * Cancel
             */
            cancel(): any;
            /**
             * Repeat
             */
            repeat(): any;
            /**
             * Is canceled
             */
            isCanceled(): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.ticktype  (Optional) a tick type
             * @param properties.tickposition  (Optional) tick position
             * @param properties.ticksize  (Optional) a tick size
             * @param properties.linestyle  (Optional) line style
             * @param properties.textstyle  (Optional) text style
             * @param properties.anchortype  (Optional) anchor position of the label
             * @param properties.rotationangle  (Optional) rotation angle
             * @param properties.visiblemodelbounds  (Optional) visible model bounds
             * @param properties.modelbounds  (Optional) model bounds
             * @param properties.devicevisiblebounds  (Optional) visible device bounds
             * @param properties.devicebounds  (Optional) bounds of the device
             * @param properties.tickorigin  (Optional) tick origin
             * @param properties.tickend  (Optional) tick end
             * @param properties.contexttransformation  (Optional) transformation from model space to device space
             * @param properties.cancel  (Optional) cancel flag
             */
            setProperties(properties: any | { ticktype?: string; tickposition?: number; ticksize?: number; linestyle?: geotoolkit.attributes.LineStyle; textstyle?: geotoolkit.attributes.TextStyle; anchortype?: geotoolkit.util.AnchorType; rotationangle?: number; visiblemodelbounds?: geotoolkit.util.Rect; modelbounds?: geotoolkit.util.Rect; devicevisiblebounds?: geotoolkit.util.Rect; devicebounds?: geotoolkit.util.Rect; tickorigin?: number; tickend?: number; contexttransformation?: geotoolkit.util.Transformation; cancel?: boolean; } ): this;
        }
        /**
         * Creates adaptive tick generator. It generates ticks and labels considering the minimum distance between ticks in pixels and it automatically configures itself to create ticks at a reasonable intervals.<br>
         */
        class AdaptiveTickGenerator extends geotoolkit.axis.NumericTickGenerator {
            /**
             * Creates adaptive tick generator. It generates ticks and labels considering the minimum distance between ticks in pixels and it automatically configures itself to create ticks at a reasonable intervals.<br>
             */
            constructor();
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.AdaptiveTickGenerator): any;
            /**
             * Gets min span
             */
            getMinSpan(): number;
            /**
             * Sets min span
             * @param minSpan  (Required) minimun distance between ticks
             */
            setMinSpan(minSpan: number): this;
            /**
             * Set tick grades priority
             * @param tickGradesPriority  (Required) default is ["MAJOR", "MINOR", "EDGE"]
             */
            setGradesPriority(tickGradesPriority: string[]): this;
            /**
             * Returns tick grades priority
             */
            getGradesPriority(): string[];
            /**
             * Sets min span's grade
             * @param minSpanGrade  (Required) ('MAJOR' or 'MINOR' values are allowed)
             */
            setMinSpanGrade(minSpanGrade: string): this;
            /**
             * Gets min span's grade ('MINOR' by default)
             */
            getMinSpanGrade(): string;
            /**
             * Returns minor ticks amount
             */
            getMinorTicksAmount(): number;
            /**
             * Set amount of minor ticks
             * @param minorTicksAmount  (Required) minor ticks amount
             */
            setMinorTicksAmount(minorTicksAmount: number): this;
            /**
             * An enumeration defining rounding precision values.
             */
            static AdaptivePrecision: any;
            /**
             * An enumeration defining rounding precision values.
             */
            static AdaptiveType: any;
            /**
             * Sets label alignment
             */
            setLabelsAlignment(): any;
            /**
             * Returns precision
             */
            getPrecision(): geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision;
            /**
             * Sets precision
             * @param precision  (Required) legacy algorithm precision
             */
            setPrecision(precision: string|geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision): this;
            /**
             * Returns type of adaptive algorithm
             */
            getAdaptiveType(): geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType;
            /**
             * Sets type of adaptive algorithm
             * @param adaptiveType  (Required) type of adaptive algorithm
             */
            setAdaptiveType(adaptiveType: geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType): this;
            /**
             * Sets spacing to be used instead of calculated step in nice mode
             * If spaicng is NaN then it is not used
             * @param spacing  (Required) desired step between major ticks
             */
            setSpacing(spacing: number): this;
            /**
             * Returns spacing to be used instead of calculated step in nice mode
             * If spacing is NaN then it is not used
             */
            getSpacing(): number;
            /**
             * Reset
             */
            reset(): string[];
            /**
             * Reset ticks
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            resetTicks(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * @param ti  (Required) tickInfo tickinfo
             * @param orient  (Required) axis orientation
             * @param fromValue  (Required) generate labels from
             * @param toValue  (Required) generate labels to
             */
            getMaxLabels(ti: geotoolkit.axis.TickInfo, orient: geotoolkit.axis.AxisOrientation|string, fromValue: number, toValue: number): any[];
            /**
             * Resets labels
             * Generate labels from the model limits and return number of labels
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            resetLabels(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Gets next tick index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientaion
             * @param tickInfo  (Required) tick info
             * @param tickIndex  (Required) index at tick position
             */
            nextTick(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Gets next label index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             * @param tickIndex  (Required) index at tick position
             */
            nextLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Gets hide labels on span too small flag ("true" by default)
             */
            getHideLabelsOnSpanTooSmall(): boolean;
            /**
             * Sets hide labels on span too small flag
             * @param flag  (Required) hide labels flag
             */
            setHideLabelsOnSpanTooSmall(flag: boolean): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.minspan  (Optional) minimum distance between ticks
             * @param properties.minspangrade  (Optional) tick grade to be used for minimum distance between ticks
             * @param properties.precision  (Optional) precision for legacy algorithm
             * @param properties.adaptivetype  (Optional) type of adaptive algorithm
             * @param properties.minorticksamount  (Optional) count of minor ticks
             * @param properties.gradespriority  (Optional) default is ["MAJOR", "MINOR", "EDGE"]
             * @param properties.hidelabelsonspantoosmall  (Optional) hide labels flag
             */
            setProperties(properties: any | { minspan?: number; minspangrade?: number; precision?: string|geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision; adaptivetype?: geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType; minorticksamount?: number; gradespriority?: string[]; hidelabelsonspantoosmall?: boolean; } ): this;
        }
        /**
         * Defines helper method(s) to create tick generator instance
         */
        class NumericTickGeneratorFactory {
            /**
             * Defines helper method(s) to create tick generator instance
             */
            constructor();
            /**
             * Enum of axis tick generator type
             */
            static GeneratorType: any;
            /**
             * Returns instance of the factory
             */
            static getInstance(): geotoolkit.axis.NumericTickGeneratorFactory;
            /**
             * Creates tick generator instance based on specified type
             * @param options  (Optional) tick generator options
             * @param options.ticks  (Optional) ticks options
             * @param options.ticks.EDGE  (Optional) 'EDGE' grade ticks options
             * @param options.ticks.EDGE.visible  (Optional) 'EDGE' grade ticks visibility
             * @param options.labels  (Optional) labels options
             * @param options.labels.EDGE  (Optional) 'EDGE' grade labels options
             * @param options.labels.EDGE.visible  (Optional) 'EDGE' grade labels visibility
             * @param type  (Optional) type of tick generator
             */
            create(options?: any | { ticks?: any | { EDGE?: string|any | { visible?: boolean; } ; } ; labels?: any | { EDGE?: string|any | { visible?: boolean; } ; } ; } , type?: geotoolkit.axis.NumericTickGeneratorFactory.GeneratorType|string): geotoolkit.axis.NumericTickGenerator;
            /**
             * Creates linear numeric tick generator instance
             * @param options  (Optional) tick generator options
             * @param options.ticks  (Optional) ticks options
             * @param options.ticks.EDGE  (Optional) 'EDGE' grade ticks options
             * @param options.ticks.EDGE.visible  (Optional) 'EDGE' grade ticks visibility
             * @param options.labels  (Optional) labels options
             * @param options.labels.EDGE  (Optional) 'EDGE' grade labels options
             * @param options.labels.EDGE.visible  (Optional) 'EDGE' grade labels visibility
             */
            createLinear(options?: any | { ticks?: any | { EDGE?: string|any | { visible?: boolean; } ; } ; labels?: any | { EDGE?: string|any | { visible?: boolean; } ; } ; } ): geotoolkit.axis.NumericLinearTickGenerator;
            /**
             * Creates adaptive tick generator instance
             * @param options  (Optional) adaptive tick generator options
             * @param options.adaptivetype  (Optional) type of adaptive algorithm
             * @param options.minspan  (Optional) minimum distance between ticks
             * @param options.minspangrade  (Optional) tick grade to be used for minimum distance between ticks
             * @param options.ticks  (Optional) ticks options
             * @param options.ticks.EDGE  (Optional) 'EDGE' grade ticks options
             * @param options.ticks.EDGE.visible  (Optional) 'EDGE' grade ticks visibility
             * @param options.labels  (Optional) labels options
             * @param options.labels.EDGE  (Optional) 'EDGE' grade labels options
             * @param options.labels.EDGE.visible  (Optional) 'EDGE' grade labels visibility
             */
            createAdaptive(options?: any | { adaptivetype?: geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType; minspan?: number; minspangrade?: number; ticks?: any | { EDGE?: string|any | { visible?: boolean; } ; } ; labels?: any | { EDGE?: string|any | { visible?: boolean; } ; } ; } ): geotoolkit.axis.AdaptiveTickGenerator;
        }
        /**
         * Logarithmic tick generator with automatic spacing of ticks and labels.
         */
        class AdaptiveLogTickGenerator extends geotoolkit.axis.NumericTickGenerator {
            /**
             * Logarithmic tick generator with automatic spacing of ticks and labels.
             * @param rounded  (Optional) specify how to use powers of ten
             */
            constructor(rounded?: boolean);
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.AdaptiveLogTickGenerator): any;
            /**
             * Sets label alignment
             */
            setLabelsAlignment(): any;
            /**
             * Resets this tick generator to given parameters
             * @param parent  (Required) for the node
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            reset(parent: geotoolkit.scene.Node, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): string[];
            /**
             * Reset ticks (lineStyles, tickSizes, tickTypes)
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            resetTicks(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * @param ti  (Required) tickInfo tickinfo
             * @param orient  (Required) axis orientation
             * @param fromValue  (Required) generate labels from
             * @param toValue  (Required) generate labels to
             */
            getMaxLabels(ti: geotoolkit.axis.TickInfo, orient: geotoolkit.axis.AxisOrientation|string, fromValue: number, toValue: number): any[];
            /**
             * Reset labels (textStyles)
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            resetLabels(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Gets next tick index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             * @param tickIndex  (Required) index at the tick position
             */
            nextTick(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Gets next label index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             * @param tickIndex  (Required) index at tick position
             */
            nextLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Formats label text
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
             * @param properties.orientation  (Optional) orientation
             */
            setProperties(properties: any | { orientation?: geotoolkit.axis.AxisOrientation|string; } ): this;
        }
        /**
         * Creates discrete value tick generator
         */
        class DiscreteValueTickGenerator extends geotoolkit.axis.NumericTickGenerator {
            /**
             * Creates discrete value tick generator
             * @param dataProvider  (Required) should be a function or instance of class that implements 'getTicksAndLabels' method
             * @param dataProvider.labels  (Optional) array of labels
             * @param dataProvider.positions  (Optional) array of the model label positions
             */
            constructor(dataProvider: any | { labels?: string[]; positions?: number[]; } |Function);
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.DiscreteValueTickGenerator): any;
            /**
             * Sets label alignment
             */
            setLabelsAlignment(): any;
            /**
             * Set Major or Minor tick step size
             * @param tickGrade  (Required) tick grade MAJOR or MINOR
             * @param tickStep  (Required) amount each tick should step
             */
            setTickStep(tickGrade: string, tickStep: number): this;
            /**
             * Reset
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            reset(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): string[];
            /**
             * Reset ticks and by reset this means you are getting the amount of ticks for this grade
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            resetTicks(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Gets maximum label.
             * Orient defines if it is horizontal of vertical.
             * Uses fromLabel and toLabel values
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) info about tick position
             * @param fromValue  (Required) generate labels from
             * @param toValue  (Required) generate labels to
             */
            getMaxLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, fromValue: number, toValue: number): string;
            /**
             * Reset labels
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation horizontal or vertical
             * @param tickInfo  (Required) information about the tick
             */
            resetLabels(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Sets label format handler
             * @param handler  (Required) handler is called to specify format of the label
             */
            setFormatLabelHandler(handler: Function): this;
            /**
             * Gets next tick index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation : horizontal or vertical
             * @param tickInfo  (Required) information about the tick
             * @param tickIndex  (Required) index at the tick position
             */
            nextTick(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Gets next label index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation  : horizontal or vertical
             * @param tickInfo  (Required) information about the tick
             * @param tickIndex  (Required) index at the tick position
             */
            nextLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Formats label text
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
             * @param properties.maxlabel  (Optional) max label
             */
            setProperties(properties: any | { maxlabel?: string; } ): this;
        }
        /**
         * Creates numeric linear tick generator
         */
        class NumericLinearTickGenerator extends geotoolkit.axis.NumericTickGenerator {
            /**
             * Creates numeric linear tick generator
             */
            constructor();
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.NumericLinearTickGenerator): any;
            /**
             * Sets label alignment
             */
            setLabelsAlignment(): any;
            /**
             * Set Major or Minor tick step size
             * @param tickGrade  (Required) tick grade MAJOR or MINOR
             * @param tickStep  (Required) amount each tick should step
             */
            setTickStep(tickGrade: string, tickStep: number): this;
            /**
             * Sets offset for tick generator
             * @param offset  (Required) tick generator offset
             */
            setOffset(offset: number): this;
            /**
             * Return offset
             */
            getOffset(): number;
            /**
             * Returns precision
             */
            getPrecision(): number;
            /**
             * set precision
             * @param precision  (Required) precision value to be set
             */
            setPrecision(precision: string): this;
            /**
             * Reset
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) information about the tick
             */
            reset(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): string[];
            /**
             * Reset ticks
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) information about the tick
             */
            resetTicks(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * @param ti  (Required) tickInfo tickinfo
             * @param orient  (Required) axis orientation
             * @param fromValue  (Required) generate labels from
             * @param toValue  (Required) generate labels to
             */
            getMaxLabels(ti: geotoolkit.axis.TickInfo, orient: geotoolkit.axis.AxisOrientation|string, fromValue: number, toValue: number): any[];
            /**
             * Reset labels
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) information about the tick
             */
            resetLabels(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Gets next tick index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) information about the tick
             * @param tickIndex  (Required) index at the tick poisition
             */
            nextTick(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Gets next label index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) information about the tick
             * @param tickIndex  (Required) index at the tick
             */
            nextLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Gets hide labels on span between labels is too small flag ("true" by default)
             */
            getHideLabelsOnSpanTooSmall(): boolean;
            /**
             * Sets hide labels on span between lebels too small flag
             * @param flag  (Required) hide labels flag
             */
            setHideLabelsOnSpanTooSmall(flag: boolean): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.majormodelstep  (Optional) step for each major tick
             * @param properties.minormodelstep  (Optional) step for each minor tick
             * @param properties.precision  (Optional) precision
             * @param properties.offset  (Optional) tick generator offset
             * @param properties.hidelabelsonspantoosmall  (Optional) hide labels flag
             */
            setProperties(properties: any | { majormodelstep?: number; minormodelstep?: number; precision?: number; offset?: number; hidelabelsonspantoosmall?: boolean; } ): this;
        }
        /**
         * Define date and time tick generator. Ticks are generated based on UTC date and time by default if no timezone offset is specified
         */
        class DateTimeTickGenerator extends geotoolkit.axis.TickGenerator {
            /**
             * Define date and time tick generator. Ticks are generated based on UTC date and time by default if no timezone offset is specified
             * @param timeZoneOffset  (Required) UTC time if timeZoneOffset is 0
             * @param offsetUnit  (Required) offset unit specified in sec,mls,hours.
             */
            constructor(timeZoneOffset: number, offsetUnit: geotoolkit.util.AbstractUnit);
            /**
             * Enum of label mode
             */
            static LabelMode: any;
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.DateTimeTickGenerator): any;
            /**
             * Set time zone
             * @param timeZone  (Required) time zone UTC or Local Time
             */
            setTimeZone(timeZone: geotoolkit.axis.TimeZone): this;
            /**
             */
            getMaxLabels(): any;
            /**
             * Get time zone
             */
            getTimeZone(): geotoolkit.axis.TimeZone;
            /**
             * Reset
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            reset(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): string[];
            /**
             * Sets rotation strategy
             * @param rotate  (Required) rotate labels or not
             */
            setRotateLabels(rotate: boolean): this;
            /**
             * Sets label mode
             * @param mode  (Required) label mode
             */
            setLabelMode(mode: geotoolkit.axis.DateTimeTickGenerator.LabelMode): this;
            /**
             * Gets label mode
             */
            getLabelMode(): geotoolkit.axis.DateTimeTickGenerator.LabelMode;
            /**
             * Sets zoom level
             * @param zoomLevel  (Required) Date ZoomLevel
             */
            setZoomLevel(zoomLevel: geotoolkit.axis.DateZoomLevel|number): this;
            /**
             * Gets zoom level
             */
            getZoomLevel(): geotoolkit.axis.DateZoomLevel|number;
            /**
             * Reset ticks (lineStyles, tickSizes, tickTypes)
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            resetTicks(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Reset labels (textStyles)
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            resetLabels(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Gets next tick index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             * @param tickIndex  (Required) index at the tick position
             */
            nextTick(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Gets next label index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             * @param tickIndex  (Required) index at tick position
             */
            nextLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Formats label text
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             * @param tickIndex  (Required) index at tick position
             * @param modelValue  (Required) model coordinate value
             */
            formatLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number, modelValue: number): string;
            /**
             * Sets format label handler
             * @param handler  (Required) handler is called to set the format of the label
             */
            setFormatLabelHandler(handler: Function): this;
            /**
             * Sets unit
             * @param unit  (Required) unit to be set
             */
            setUnit(unit: string|geotoolkit.util.AbstractUnit): this;
            /**
             * Enables week starting from Monday
             * @param enable  (Required) Enables or disables week starting from Monday
             */
            static setWeekStartMonday(enable: boolean): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.timezone  (Optional) time zone UTC or Local Time
             * @param properties.zoomlevel  (Optional) zoom level
             * @param properties.minspan  (Optional) minimum span between ticks
             * @param properties.rotatelabels  (Optional) rotate lebels or not
             * @param properties.labelmode  (Optional) label mode (0 or 1)
             * @param properties.formatlabeleventhandler  (Optional) format label event handler
             * @param properties.localtimezoneoffset  (Optional) local time zone offset unit
             * @param properties.unitconversionfactor  (Optional) unit converstion factor
             * @param properties.tickgrades  (Optional) array of the type of ticks that are supported
             * @param properties.major  (Optional) JSON object container - Generated
             * @param properties.major.majortick  (Optional) major tick line style
             * @param properties.major.majorlabel  (Optional) major label text style
             */
            setProperties(properties: any | { timezone?: geotoolkit.axis.TimeZone; zoomlevel?: number; minspan?: number; rotatelabels?: boolean; labelmode?: geotoolkit.axis.DateTimeTickGenerator.LabelMode; formatlabeleventhandler?: Function; localtimezoneoffset?: number; unitconversionfactor?: number; tickgrades?: string[]; major?: any | { majortick?: any|geotoolkit.attributes.LineStyle; majorlabel?: any|geotoolkit.attributes.TextStyle; } ; } ): this;
        }
        /**
         * The adaptive data time tick generator will automatically configure itself to create DateTime Ticks at a reasonable interval.
         */
        class AdaptiveDateTimeTickGenerator extends geotoolkit.axis.TickGenerator {
            /**
             * The adaptive data time tick generator will automatically configure itself to create DateTime Ticks at a reasonable interval.
             * @param timeZoneOffset  (Required) UTC time if timeZoneOffset is 0
             * @param offsetUnit  (Required) specified in sec,mls,hours.
             */
            constructor(timeZoneOffset: number, offsetUnit: geotoolkit.util.AbstractUnit|string);
            /**
             */
            getTickGrades(): any;
            /**
             * Sets locale
             * @param locale  (Required) locale
             */
            setLocale(locale: geotoolkit.util.Locale|string): this;
            /**
             * Return the current locale
             */
            getLocale(): geotoolkit.util.Locale|string;
            /**
             * Set Daylight Saving Time dates in milliseconds
             * @param timeStamps  (Optional) Daylight Saving Time dates in milliseconds
             */
            setDSTTimestamps(timeStamps?: number[]): this;
            /**
             * Copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.AdaptiveDateTimeTickGenerator): any;
            /**
             * Invalidate
             */
            invalidate(): this;
            /**
             * Set time zone
             * @param timeZone  (Required) UTC or local time,
If using Third Party such as momentJS see also {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}
             */
            setTimeZone(timeZone: geotoolkit.axis.TimeZone|string): this;
            /**
             * Set time zone offset
             * @param timeZoneOffset  (Required) UTC time if timeZoneOffset is 0
             * @param offsetUnit  (Optional) specified in sec,mls,hours.
             */
            setTimeZoneOffset(timeZoneOffset: number, offsetUnit?: geotoolkit.util.AbstractUnit|string): this;
            /**
             * Get time zone
             */
            getTimeZone(): geotoolkit.axis.TimeZone|string;
            /**
             * Get time zone offset
             * @param offsetUnit  (Optional) specified in sec,mls,hours
             */
            getTimeZoneOffset(offsetUnit?: geotoolkit.util.AbstractUnit|string): geotoolkit.axis.TimeZone|string;
            /**
             * @param tickInfo  (Required) information about the tick
             * @param orient  (Required) orientation
             * @param fromValue  (Required) get max labels from
             * @param toValue  (Required) get max labels to
             */
            getMaxLabels(tickInfo: geotoolkit.axis.TickInfo, orient: geotoolkit.axis.AxisOrientation|string, fromValue: number, toValue: number): any[];
            /**
             * Reset
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) axis orientation
             * @param tickInfo  (Required) tick Info
             */
            reset(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): string[];
            /**
             * Sets rotation strategy
             * @param rotate  (Required) rotate labels or not
             */
            setRotateLabels(rotate: boolean): this;
            /**
             * Set label pattern
             * @param pattern  (Required) internal object represents labels pattern information
             */
            setLabelPattern(pattern: any): this;
            /**
             * Reset ticks
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            resetTicks(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Reset labels
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tickinfo
             */
            resetLabels(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Gets next tick index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) info about the tick
             * @param tickIndex  (Required) tick index from 0 to count-1
             */
            nextTick(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Gets next label index
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) info about the tick
             * @param tickIndex  (Required) tick index from 0 to count-1,
             */
            nextLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Formats label text
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) info about the tick
             * @param tickIndex  (Required) tick index from 0 to count-1,
             * @param modelValue  (Required) model coordinate position
             */
            formatLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number, modelValue: number): string;
            /**
             * Sets format label handler.
             * This function will be used by the tickgenerator to build a label for a given model value.
             * 
             * Function parameters are:
             * tickGenerator {geotoolkit.axis.TickGenerator} The tickgenerator
             * parent {object} that triggered the label creation, generally a {geotoolkit.axis.Axis}
             * orientation {geotoolkit.axis.AxisOrientation|string} of the axis
             * tickInfo {geotoolkit.axis.TickInfo} The tickinformation containing the tick type
             * tickIndex {number} The index of the tick
             * modelValue {number}  The value to build a label for
             * @param handler  (Required) handler is called to specify format of the label
             */
            setFormatLabelHandler(handler: Function): this;
            /**
             * Set label max text
             * @param tickGrade  (Required) valid values are "EDGE", "DST", "MAJOR" and "MINOR"
             * @param text  (Required) label text
             */
            setLabelMaxText(tickGrade: string, text: string): this;
            /**
             * Sets format dictionary
             * 
             * Default dictionary is ["s.u", "s.u", "s.u", "H:i:s", "H:i:s", "H:i", "H:i", "M j<b\r/>H:i", "M j<b\r/>H:i", "M j<b\r/>H:i", "M j", "M, Y", "Y", "Y", "Y"]
             * The index of the dictionary should match geotoolkit.axis.DateZoomLevel
             * @param dictionary  (Required) dictionary to use to format "EDGE", "DST", "MAJOR" and "MINOR" and  labels when label grade format not specified
             */
            setFormatDictionary(dictionary: string[]): this;
            /**
             * Set label grade format
             * @param tickGrade  (Required) valid values are "EDGE", "DST", "MAJOR" and "MINOR"
             * @param format  (Optional) label grade format
             */
            setLabelGradeFormat(tickGrade: string, format?: string): this;
            /**
             * Return label grade format
             * @param tickGrade  (Required) valid values are "EDGE", "DST", "MAJOR" and "MINOR"
             */
            getLabelGradeFormat(tickGrade: string): string;
            /**
             * Sets unit
             * @param unit  (Required) unit to set
             */
            setUnit(unit: string|geotoolkit.util.AbstractUnit): this;
            /**
             * Sets supported ticks visible.
             * Note that this would also change the resulting visibility of the corresponding label.
             * (An AdaptiveDateTimeTickGenerator's label can be visible only if the corresponding tick is visible)
             * Use LineStyle null to make tick invisible.
             * @param tickGrade  (Required) Tick grade
             * @param visible  (Required) Tick visibility
             */
            setVisibleTickGrade(tickGrade: string, visible: boolean): this;
            /**
             * Enable or disable 'Monday' flag
             * @param enable  (Required) Enables week starting from Monday, default is disabled
             */
            static setWeekStartMonday(enable: boolean): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.formatlabeleventhandler  (Optional) format of the label see {@link geotoolkit.axis.AdaptiveDateTimeTickGenerator#setFormatLabelHandler}
             * @param properties.labelformat  (Optional) tickGrade valid values are "EDGE", "DST", "MAJOR" and "MINOR" with corresponding format label grade format
             * @param properties.labelminspan  (Optional) min distance between 2 labels
             * @param properties.labeledgespan  (Optional) distance of label from edge
             * @param properties.labelautohide  (Optional) minimum distance to hide label
             * @param properties.rotatelabels  (Optional) rotate label or not
             * @param properties.locale  (Optional) locale
             * @param properties.timezone  (Optional) timeZone UTC or local time
             * @param properties.localtimezoneoffset  (Optional) timezoneoffset
             * @param properties.minspan  (Optional) min distance between ticks in device space
             * @param properties.edgetick  (Optional) style for edge tick
             * @param properties.majortick  (Optional) style for major tick
             * @param properties.minortick  (Optional) style for minor tick
             * @param properties.dsttick  (Optional) style for DST tick
             * @param properties.edgelabel  (Optional) text style for edge label
             * @param properties.majorlabel  (Optional) text style for major label
             * @param properties.minorlabel  (Optional) text style for minor label
             * @param properties.dstlabel  (Optional) text style for DST label
             */
            setProperties(properties: any | { formatlabeleventhandler?: Function; labelformat?: any; labelminspan?: number; labeledgespan?: number; labelautohide?: number; rotatelabels?: boolean; locale?: geotoolkit.util.Locale|string; timezone?: geotoolkit.axis.TimeZone|string; localtimezoneoffset?: number; minspan?: number; edgetick?: any|geotoolkit.attributes.LineStyle; majortick?: any|geotoolkit.attributes.LineStyle; minortick?: any|geotoolkit.attributes.LineStyle; dsttick?: any|geotoolkit.attributes.LineStyle; edgelabel?: any|geotoolkit.attributes.TextStyle; majorlabel?: any|geotoolkit.attributes.TextStyle; minorlabel?: any|geotoolkit.attributes.TextStyle; dstlabel?: any|geotoolkit.attributes.TextStyle; } ): this;
        }
        /**
         * SecondaryTickGenerator utilizes "primaryValues-to-secondaryValues" mapping
         * to generate ticks/labels linearly spaced in secondary model space, so that distance
         * between major ticks/labels in the space is equal to "majorStep" (or "minorStep" for
         * minor ticks/labels correspondingly). Note, that linear spacing in secondary space
         * does not mean linear spacing in primary space.
         */
        class SecondaryTickGenerator extends geotoolkit.axis.NumericTickGenerator {
            /**
             * SecondaryTickGenerator utilizes "primaryValues-to-secondaryValues" mapping
             * to generate ticks/labels linearly spaced in secondary model space, so that distance
             * between major ticks/labels in the space is equal to "majorStep" (or "minorStep" for
             * minor ticks/labels correspondingly). Note, that linear spacing in secondary space
             * does not mean linear spacing in primary space.
             * @param primaryValues  (Required) growing array of values in primary model space
(the generator's axis parent model space)
             * @param secondaryValues  (Required) an array of values in a secondary space
             * @param majorStep  (Required) tick step for major ticks (in secondary space)
             * @param minorStep  (Required) tick step for minor ticks (in secondary space)
             */
            constructor(primaryValues: number[], secondaryValues: number[], majorStep: number, minorStep: number);
            /**
             * Copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.SecondaryTickGenerator): any;
            /**
             * Sets labels decimation state
             * @param labelsDecimation  (Required) labels decimation state
             */
            setLabelsDecimation(labelsDecimation: boolean): this;
            /**
             * Gets labels decimation state
             */
            getLabelsDecimation(): boolean;
            /**
             * Gets primary-to-secondary values mapping.
             */
            getMapping(): any;
            /**
             * Gets primary-to-secondary values mapping.
             * @param primaryValues  (Required) growing array of values in primary model space (the generator's axis parent model space)
             * @param secondaryValues  (Required) an array of values in a secondary space
             */
            setMapping(primaryValues: number[], secondaryValues: number[]): this;
            /**
             * Sets tick step (in secondary space)
             * @param tickGrade  (Required) tick grade
             * @param tickStep  (Required) amount each tick should step
             */
            setTickStep(tickGrade: string, tickStep: number): this;
            /**
             * Gets tick step (in secondary space)
             * @param tickGrade  (Required) tick grade
             */
            getTickStep(tickGrade: string): number;
            /**
             * Sets tick size (length)
             * @param tickGrade  (Required) tick grade
             * @param tickSize  (Required) tick size to set
             */
            setTickSize(tickGrade: string, tickSize: number): this;
            /**
             * Gets tick size (length)
             * @param tickGrade  (Required) tick grade
             */
            getTickSize(tickGrade: string): number;
            /**
             * Resets tick generator state
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) tick info
             */
            reset(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): string[];
            /**
             * Returns supported tick grades: ["MAJOR", "MINOR", "MAJORREVERSED" and "MINORREVERSED"]
             */
            getTickGrades(): string[];
            /**
             * Resets labels. This method is called to start iterating through labels.
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) a info about labels
             */
            resetLabels(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Resets ticks. This method is called to start  iterating through ticks.
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) a info about labels
             */
            resetTicks(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo): number;
            /**
             * Generates information about next tick
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) an info about tick
             * @param tickIndex  (Required) tick index from 0 to count-1, which resetTicks returns
             */
            nextTick(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Generates information about next label
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) an info about tick
             * @param tickIndex  (Required) tick index from 0 to count-1, which resetLabels returns
             */
            nextLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number): number;
            /**
             * Formats label text positioned at "labelPos" in primary model space.
             * IMPORTANT: Textual content of the label is formatted out of its position
             * in secondary space.
             * @param parent  (Required) parent axis or grid
             * @param orient  (Required) orientation
             * @param tickInfo  (Required) an info about tick
             * @param tickIndex  (Required) tick index from 0 to count-1, which resetTicks returns
             * @param labelPos  (Required) model value (in primary space) - ignored by the implementation
             */
            formatLabel(parent: geotoolkit.axis.Grid|geotoolkit.axis.Axis, orient: geotoolkit.axis.AxisOrientation|string, tickInfo: geotoolkit.axis.TickInfo, tickIndex: number, labelPos: number): string;
        }
        /**
         * This class uses the {@link geotoolkit.axis.TickGenerator} which is passed to it and creates an axis.<br>
         * It allows to modify the axis tick positions, axis orientations, axis label positions etc. CSS can be used to modify all axis settings.
         */
        class Axis extends geotoolkit.scene.shapes.Shape implements geotoolkit.layout.ILayoutable {
            /**
             * This class uses the {@link geotoolkit.axis.TickGenerator} which is passed to it and creates an axis.<br>
             * It allows to modify the axis tick positions, axis orientations, axis label positions etc. CSS can be used to modify all axis settings.
             * @param tickGenerator  (Optional) User can pass an object OR a tickGenerator (by default geotoolkit.axis.AdaptiveTickGenerator is used of nothing is passed)
             * @param tickGenerator.tickgenerator  (Optional) tickGenerator to use in axis
             * @param tickGenerator.tickposition  (Optional) tick position
             * @param tickGenerator.labelposition  (Optional) label position
             * @param tickGenerator.orientation  (Optional) axis orientation
             * @param tickGenerator.title  (Optional) deprecated (since 2.6 type string is obsolete, use object) axis title
             * @param tickGenerator.title.text  (Optional) axis title
             * @param tickGenerator.title.showellipsis  (Optional) boolean flag that enables/disables ellipsis in case if text is too long
             * @param tickGenerator.title.visible  (Optional) axis title visibility
             * @param tickGenerator.title.textstyle  (Optional) a new title text style
             * @param tickGenerator.title.alignment  (Optional) title anchor
             * @param tickGenerator.title.anchor  (Optional) deprecated (since 2.6) title anchor
             * @param tickGenerator.titlevisible  (Optional) deprecated (since 2.6 use tickGenerator.title.visible) axis title visibility
             * @param tickGenerator.titletextstyle  (Optional) deprecated (since 2.6 use tickGenerator.title.textstyle) a new title text style
             * @param tickGenerator.titletextstyle.color  (Optional) deprecated (since 2.6) text color
             * @param tickGenerator.titletextstyle.baseLine  (Optional) deprecated (since 2.6) base line
             * @param tickGenerator.titletextstyle.alignment  (Optional) deprecated (since 2.6) alignment
             * @param tickGenerator.titletextstyle.font  (Optional) deprecated (since 2.6) font
             * @param tickGenerator.titleanchor  (Optional) deprecated (since 2.6 use tickGenerator.title.anchor) title anchor
             * @param tickGenerator.hideoverlappedtext  (Optional) hide overlapped text flag
             * @param tickGenerator.labelpadding  (Optional) label padding size in pixels
             */
            constructor(tickGenerator?: geotoolkit.axis.TickGenerator|any | { tickgenerator?: geotoolkit.axis.TickGenerator; tickposition?: geotoolkit.axis.TickInfo.TickPosition; labelposition?: geotoolkit.axis.TickInfo.LabelPosition; orientation?: geotoolkit.axis.AxisOrientation; title?: string|any | { text?: string; showellipsis?: boolean; visible?: boolean; textstyle?: geotoolkit.attributes.TextStyle|any; alignment?: geotoolkit.util.AnchorType; anchor?: geotoolkit.util.AnchorType; } ; titlevisible?: boolean; titletextstyle?: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } ; titleanchor?: boolean; hideoverlappedtext?: boolean; labelpadding?: number; } );
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.Axis): any;
            /**
             * Sets label manual settings mode (AnchorType and no shifts)
             * @param state  (Required) label manual settings mode
             */
            setLabelManualSettings(state: boolean): this;
            /**
             * Gets label manual settings mode (AnchorType and no shifts)
             */
            getLabelManualSettings(): boolean;
            /**
             * Sets label padding
             * @param padding  (Required) label padding
             */
            setLabelPadding(padding: number): this;
            /**
             * Gets label padding
             */
            getLabelPadding(): number;
            /**
             * Sets the labelPosition
             * @param position  (Required) label position
  number is deprecated
             */
            setLabelPosition(position: geotoolkit.axis.TickInfo.LabelPosition): this;
            /**
             * Return the labelPosition
             */
            getLabelPosition(): geotoolkit.axis.TickInfo.LabelPosition;
            /**
             * Sets the labelOffset
             * @param offset  (Required) the label offset
             */
            setLabelOffset(offset: number): this;
            /**
             * Return the labelOffset
             */
            getLabelOffset(): number;
            /**
             * Sets a base line style
             * @param lineStyle  (Required) line style or options
             * @param lineStyle.color  (Optional) line color
             * @param lineStyle.width  (Optional) line width
             * @param lineStyle.pattern  (Optional) line pattern
             * @param merge  (Optional) true if you want to merge lineStyle with existing attribute, false by default
             */
            setBaseLineStyle(lineStyle: geotoolkit.attributes.LineStyle|any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]; } |string, merge?: boolean): this;
            /**
             * Return a base line style
             */
            getBaseLineStyle(): geotoolkit.attributes.LineStyle;
            /**
             * Return base line visibility
             */
            getBaseLineVisible(): boolean;
            /**
             * Set base line visibility
             * @param visible  (Required) 
             */
            setBaseLineVisible(visible: boolean): this;
            /**
             * Return a text style
             */
            getTextStyle(): geotoolkit.attributes.TextStyle;
            /**
             * Set text style
             * @param textStyle  (Required) a new shape text style
             * @param textStyle.color  (Optional) text color
             * @param textStyle.baseLine  (Optional) base line.
             * @param textStyle.alignment  (Optional) alignment.
             * @param textStyle.font  (Optional) font.
             * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
             */
            setTextStyle(textStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
            /**
             * Return boolean flag that enables/disables ellipsis in case if text is too long
             */
            getShowTitleEllipsis(): boolean;
            /**
             * Enables/disables ellipsis in case if text is too long
             * @param showellipsis  (Required) true for ellipsis
             */
            setShowTitleEllipsis(showellipsis: boolean): this;
            /**
             * Sets tick generator
             * @param tickGenerator  (Required) a tick generator to be used
             */
            setTickGenerator(tickGenerator: geotoolkit.axis.TickGenerator): this;
            /**
             * Return a current tick generator
             */
            getTickGenerator(): geotoolkit.axis.TickGenerator;
            /**
             * Gets axis bounds
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Gets model limits
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Sets model limits
             * @param modelLimits  (Required) model limits or rectangle where ticks are to be generated
             */
            setModelLimits(modelLimits: geotoolkit.util.Rect): this;
            /**
             * Sets a axis bounds
             * @param bounds  (Required) axis bounds
             */
            setBounds(bounds: geotoolkit.util.Rect): this;
            /**
             * Sets hide overlapped text flag
             * @param flag  (Required) hide overlapped text flag
             */
            setHideOverlappedText(flag: boolean): this;
            /**
             * Gets hide overlapped text flag
             */
            getHideOverlappedText(): boolean;
            /**
             * Enum of axis tick positions
             */
            static TitleAlignment: any;
            /**
             * Get title anchor
             */
            getTitleAnchor(): geotoolkit.util.AnchorType;
            /**
             * Set title alignment
             * @param titleAnchor  (Required) anchor
             */
            setTitleAnchor(titleAnchor: geotoolkit.util.AnchorType): this;
            /**
             * Set title visibility state
             * @param visible  (Required) visible title
             */
            setTitleVisible(visible: boolean): this;
            /**
             * Get title visibility state
             */
            getTitleVisible(): boolean;
            /**
             * Sets title text
             * @param titleText  (Required) title text
             */
            setTitleText(titleText: string): this;
            /**
             * Set title
             * @param title  (Required) axis title text or title object
             * @param title.title  (Optional) deprecated (since 2.4 use title.text instead) axis title text
             * @param title.text  (Optional) axis title text
             * @param title.visible  (Optional) visibility
             * @param title.offset  (Optional) offset
             * @param title.textstyle  (Optional) text style
             * @param title.alignment  (Optional) alignment
             * @param title.showellipsis  (Optional) enables/disables ellipsis in case if text is too long
             */
            setTitle(title: string|any | { title?: string; text?: string; visible?: boolean; offset?: geotoolkit.util.Dimension; textstyle?: geotoolkit.attributes.TextStyle|any; alignment?: geotoolkit.util.AnchorType; showellipsis?: boolean; } ): this;
            /**
             * Get axis title
             */
            getTitle(): string;
            /**
             * Returns title offset
             */
            getTitleOffset(): geotoolkit.util.Dimension;
            /**
             * Sets title offset
             * @param titleOffset  (Required) offset
             */
            setTitleOffset(titleOffset: geotoolkit.util.Dimension): this;
            /**
             * Set axis title text style
             * @param titleTextStyle  (Required) a new title text style
             * @param titleTextStyle.color  (Optional) text color
             * @param titleTextStyle.baseLine  (Optional) base line.
             * @param titleTextStyle.alignment  (Optional) alignment.
             * @param titleTextStyle.font  (Optional) font.
             * @param merge  (Optional) true if you want to merge textStyle with existing attribute, false by default
             */
            setTitleTextStyle(titleTextStyle: geotoolkit.attributes.TextStyle|any | { color?: string|geotoolkit.util.RgbaColor; baseLine?: string; alignment?: string; font?: string; } , merge?: boolean): this;
            /**
             * The style associated with this axis title.
             */
            getTitleTextStyle(): geotoolkit.attributes.TextStyle;
            /**
             * Sets axis orientation as text
             * @param orientation  (Required) (It can be "Vertical" or "Horizontal");
             */
            setOrientation(orientation: string): this;
            /**
             * Return axis orientation
             */
            getOrientation(): string;
            /**
             * Returns axis tick info
             */
            getTickInfo(): geotoolkit.axis.TickInfo;
            /**
             * Draw base line
             * @param context  (Required) Rendering Context
             */
            drawBaseLine(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Return tick position
             */
            getTickPosition(): geotoolkit.axis.TickInfo.TickPosition;
            /**
             * Sets tick position as text
             * @param position  (Required) (Can be "left", "right", "leftandright", "between", "middle");
  number is deprecated
             */
            setTickPosition(position: string|number|geotoolkit.axis.TickInfo.TickPosition): this;
            /**
             * Sets auto rotation angle for vertical axis
             * @param angle  (Required) angle of label auto rotation
             */
            setAutoLabelRotationAngle(angle: number): this;
            /**
             * Gets auto rotation angle for vertical axis
             */
            getAutoLabelRotationAngle(): number;
            /**
             * Set auto label rotation
             * @param enable  (Required) enable automatic label rotation
             */
            setAutoLabelRotation(enable: boolean): this;
            /**
             * Get auto label rotation
             */
            getAutoLabelRotation(): boolean;
            /**
             * Check culling
             * @param context  (Required) Rendering Context
             */
            checkCollision(context: geotoolkit.renderer.RenderingContext): boolean;
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
             * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
             */
            invalidateLayout(): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.orientation  (Optional) axis orientation
             * @param properties.modellimits  (Optional) rectangle where to generate ticks
             * @param properties.tickgenerator  (Optional) instance of tick generator
             * @param properties.tickposition  (Optional) position of the tick
             * @param properties.labelposition  (Optional) position label position
             * @param properties.labeloffset  (Optional) offset the label offset
             * @param properties.baselinestyle  (Optional) base line style
             * @param properties.autolabelrotation  (Optional) automatic label rotation
             * @param properties.visiblebaseline  (Optional) visibility of baseline
             * @param properties.hideoverlappedtext  (Optional) enable label filtering if labels are overlapped.
             * @param properties.title  (Optional) see {@link geotoolkit.axis.Axis#setTitle}
             */
            setProperties(properties: any | { orientation?: geotoolkit.axis.AxisOrientation|string; modellimits?: geotoolkit.util.Rect; tickgenerator?: geotoolkit.axis.TickGenerator; tickposition?: geotoolkit.axis.TickInfo.TickPosition|string; labelposition?: geotoolkit.axis.TickInfo.LabelPosition; labeloffset?: number; baselinestyle?: any|geotoolkit.attributes.LineStyle; autolabelrotation?: boolean; visiblebaseline?: boolean; hideoverlappedtext?: boolean; title?: any; } ): this;
            /**
             * Dispose node. Clear all listeners
             * and disconnect style to avoid memory
             * leaks
             */
            dispose(): any;
            /**
             * Sets axis dimension to synchronize tick generator parameters with external source
             * @param dimension  (Required) dimension
             */
            setAxisDimension(dimension: geotoolkit.axis.AxisDimension): this;
            /**
             * Called if axis dimension is changed
             * @param dimension  (Required) dimension
             */
            protected onAxisDimensionChanged(dimension: geotoolkit.axis.AxisDimension): any;
        }
        /**
         * Defines helper method(s) to create axis instance
         */
        class AxisFactory {
            /**
             * Defines helper method(s) to create axis instance
             */
            constructor();
            /**
             * Returns instance of the factory
             */
            static getInstance(): geotoolkit.axis.AxisFactory;
            /**
             * Creates axis
             * @param options  (Required) axis options
             * @param options.location  (Required) of the axis
             * @param options.tickgenerator  (Optional) optional tick generator (by default geotoolkit.axis.AdaptiveTickGenerator is used)
             * @param options.autolabelrotation  (Optional) auto label rotation {@link geotoolkit.axis.Axis.prototype.setAutoLabelRotation}
             * @param options.autolabelrotationangle  (Optional) auto label rotation {@link geotoolkit.axis.Axis.prototype.setAutoLabelRotationAngle}
             * @param options.title  (Optional) title properties {@link geotoolkit.axis.Axis.prototype.setTitle}
             */
            create(options: any | { location?: geotoolkit.layout.AnnotationLocation; tickgenerator?: geotoolkit.axis.TickGenerator; autolabelrotation?: boolean; autolabelrotationangle?: number; title?: any|string; } ): geotoolkit.axis.Axis;
        }
        /**
         * Creates a grid that will fill its parent container with grid lines
         */
        class Grid extends geotoolkit.scene.Node {
            /**
             * Creates a grid that will fill its parent container with grid lines
             * @param htg  (Optional) horizontal tick generator
             * @param vtg  (Optional) vertical tick generator
             */
            constructor(htg?: geotoolkit.axis.TickGenerator, vtg?: geotoolkit.axis.TickGenerator);
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.axis.Grid): this;
            /**
             * Render
             * @param context  (Required) Rendering Context
             */
            render(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Gets bounds in the parent coordinates
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Gets line style for the specified tick type and orientation
             * @param orient  (Required) orientation
             * @param tickGrade  (Required) tick type, which supports tick generator like "MAJOR", "MINOR"
             */
            getLineStyle(orient: geotoolkit.util.Orientation|string, tickGrade: string): geotoolkit.attributes.LineStyle|any;
            /**
             * Sets line style for the specified tick type and orientation
             * WARNING! since 2.7 returning value type is geotoolkit.axis.Grid, not geotoolkit.attributes.LineStyle
             * @param orient  (Required) orientation
             * @param tickGrade  (Required) tick type, which supports tick generator like "MAJOR", "MINOR"
             * @param style  (Required) line style for the specified tick type
             * @param returnThis  (Optional) return this or style
             */
            setLineStyle(orient: geotoolkit.util.Orientation|string, tickGrade: string, style: geotoolkit.attributes.LineStyle|any, returnThis?: boolean): geotoolkit.attributes.LineStyle|this;
            /**
             * Return tick generator
             * @param orient  (Required) orientation
             */
            getTickGenerator(orient: geotoolkit.util.Orientation|string): geotoolkit.axis.TickGenerator|any;
            /**
             * Sets tick generator
             * @param orient  (Required) orientation
             * @param tg  (Required) a new tick generator
             */
            setTickGenerator(orient: geotoolkit.util.Orientation|string, tg: geotoolkit.axis.TickGenerator|any): this;
            /**
             * Sets axis dimension to synchronize tick generator parameters with external source
             * @param orient  (Required) orientation
             * @param dimension  (Required) dimension
             */
            setAxisDimension(orient: geotoolkit.util.Orientation|string, dimension: geotoolkit.axis.AxisDimension): this;
            /**
             * Called if axis dimension is changed
             * @param dimension  (Required) dimension
             */
            protected onAxisDimensionChanged(dimension: geotoolkit.axis.AxisDimension): any;
            /**
             * Draw grid
             * @param context  (Required) Rendering Context
             * @param orient  (Required) orientation ( horizontal or vertical)
             * @param tg  (Required) tick generator
             */
            drawGrid(context: geotoolkit.renderer.RenderingContext, orient: geotoolkit.axis.AxisOrientation|string, tg: geotoolkit.axis.TickGenerator): any;
            /**
             * Draw grids
             * @param context  (Required) Rendering Context
             */
            drawGrids(context: geotoolkit.renderer.RenderingContext): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.vtg  (Optional) vertical tick generator
             * @param properties.htg  (Optional) horizontal tick generator
             * @param properties.hstyles  (Optional) line style for horizontal ticks
             * @param properties.vstyles  (Optional) line style for vertical ticks
             */
            setProperties(properties: any | { vtg?: any; htg?: any; hstyles?: any|geotoolkit.attributes.LineStyle; vstyles?: any|geotoolkit.attributes.LineStyle; } ): this;
        }
        /**
         * Enum of zoom level
         */
        interface DateZoomLevel {
            /**
             * Millisecond
             */
            Millisecond: number;
            /**
             * Centisecond
             */
            Centisecond: number;
            /**
             * Decisecond
             */
            Decisecond: number;
            /**
             * Second
             */
            Second: number;
            /**
             * TenSeconds
             */
            TenSeconds: number;
            /**
             * Minute
             */
            Minute: number;
            /**
             * TenMinutes
             */
            TenMinutes: number;
            /**
             * Hour
             */
            Hour: number;
            /**
             * SixHours
             */
            SixHours: number;
            /**
             * Day
             */
            Day: number;
            /**
             * Week
             */
            Week: number;
            /**
             * Month
             */
            Month: number;
            /**
             * Quarter
             */
            Quarter: number;
            /**
             * Year
             */
            Year: number;
            /**
             * Decade
             */
            Decade: number;
            /**
             * Century
             */
            Century: number;
        }
        /**
         * Enum of time zone
         */
        interface TimeZone {
            /**
             * Coordinated Universal Time
             */
            UTC: number;
            /**
             * Local time
             */
            LocalTime: number;
        }
        /**
         * Enum of axis orientations
         */
        type AxisOrientation = any;

        module AxisDimension {
            /**
             * Dimension Events enumerator
             */
            interface Events {
                /**
                 * Changed
                 */
                Changed: string;
            }
        }
        module PieceLinearValueTransformer {
            /**
             * Enum of extrapolation types (Out-of-range input value's transformed value)
             */
            interface ExtrapolationType {
                /**
                 * Transformed value is Number.NaN
                 */
                NaN: number;
                /**
                 * Transformed value is equal to corresponding boundary's output value
                 */
                Boundary: number;
                /**
                 * Transformed value is an linearly extrapolated value based on corresponding boundary's piece mapping.
                 */
                Extrapolated: number;
            }
        }
        module TickInfo {
            /**
             * Enum of axis tick positions
             */
            interface TickPosition {
                /**
                 * Ticks and labels are on the left side.
                 */
                Left: string;
                /**
                 * Ticks and labels are on the top side.
                 */
                Top: string;
                /**
                 * Ticks and labels are on the right side.
                 */
                Right: string;
                /**
                 * Ticks and labels are on the bottom side.
                 */
                Bottom: string;
                /**
                 * Ticks are on the left and right side.
                 */
                LeftAndRight: string;
                /**
                 * Ticks are on the top and bottom side.
                 */
                TopAndBottom: string;
                /**
                 * Ticks is rendering between the axis or grid border.
                 */
                Between: string;
                /**
                 * Ticks and labels are at the center.
                 */
                Middle: string;
            }
            /**
             * Enum of label positions
             */
            interface LabelPosition {
                /**
                 * Labels are centered in the axis (default)
                 */
                Center: string;
                /**
                 * Labels are left-aligned and on the left side of the axis
                 */
                Left: string;
                /**
                 * Labels are top-aligned and on the top side of the axis
                 */
                Top: string;
                /**
                 * Labels are right-aligned and on the right side of the axis
                 */
                Right: string;
                /**
                 * Labels are bottom-aligned and on the bottom side of the axis
                 */
                Bottom: string;
            }
        }
        module AdaptiveTickGenerator {
            /**
             * An enumeration defining rounding precision values.
             */
            interface AdaptivePrecision {
                /**
                 * By1
                 */
                By1: number;
                /**
                 * By2
                 */
                By2: number;
                /**
                 * By3
                 */
                By3: number;
                /**
                 * By4
                 */
                By4: number;
                /**
                 * By5
                 */
                By5: number;
                /**
                 * By6
                 */
                By6: number;
                /**
                 * By7
                 */
                By7: number;
                /**
                 * By8
                 */
                By8: number;
                /**
                 * By9
                 */
                By9: number;
            }
            /**
             * An enumeration defining rounding precision values.
             */
            interface AdaptiveType {
                /**
                 * Fixed limits
                 */
                Fixed: string;
                /**
                 * Nice, nice adaptive algorithm
                 */
                Nice: string;
            }
        }
        module NumericTickGeneratorFactory {
            /**
             * Enum of axis tick generator type
             */
            interface GeneratorType {
                /**
                 * Adaptive tick generator
                 */
                Adaptive: string;
                /**
                 * Linear tick generator
                 */
                Linear: string;
            }
        }
        module DateTimeTickGenerator {
            /**
             * Enum of label mode
             */
            interface LabelMode {
                /**
                 * Default
                 */
                Default: number;
                /**
                 * Between
                 */
                Between: number;
            }
        }
        module Axis {
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
    }
    module plot {
        /**
         * A plot with 2D rendering capabilities.<br>
         * The plot requires a canvas to be passed in the options to render its content.<br>
         * <br>
         * The plot is internally structured as a SceneGraph, using {@link geotoolkit.scene.Node}.<br>
         * Each node having a scene-transform transformation that will be applied at render time.<br>
         * <br>
         * The plot offers an autoupdate behavior that will check regularly if a render is required (using requestanimationframe if available,
         * polling otherwise).<br> When this autoupdate lands, the plot will check if it is flagged as dirty.<br> If so, it will trigger a render
         * phase.<br> This mechanism can be configured when instantiating the Plot or changed using the corresponding setters.<br> One could also
         * temporarily suspend any rendering by calling suspendUpdate in order to apply large scale changes or simply force the plot to hibernate
         * when not used/visible.<br>
         * <br>
         * If the autoupdate mechanism is not enabled, the client code is responsible of calling the update function to tell the plot that it
         * should render itself.<br>
         * <br>
         */
        class Plot extends geotoolkit.util.EventDispatcher {
            /**
             * A plot with 2D rendering capabilities.<br>
             * The plot requires a canvas to be passed in the options to render its content.<br>
             * <br>
             * The plot is internally structured as a SceneGraph, using {@link geotoolkit.scene.Node}.<br>
             * Each node having a scene-transform transformation that will be applied at render time.<br>
             * <br>
             * The plot offers an autoupdate behavior that will check regularly if a render is required (using requestanimationframe if available,
             * polling otherwise).<br> When this autoupdate lands, the plot will check if it is flagged as dirty.<br> If so, it will trigger a render
             * phase.<br> This mechanism can be configured when instantiating the Plot or changed using the corresponding setters.<br> One could also
             * temporarily suspend any rendering by calling suspendUpdate in order to apply large scale changes or simply force the plot to hibernate
             * when not used/visible.<br>
             * <br>
             * If the autoupdate mechanism is not enabled, the client code is responsible of calling the update function to tell the plot that it
             * should render itself.<br>
             * <br>
             * @param options  (Optional) The plot options
             * @param options.canvaselement  (Optional) The canvas to be used as target for rendering
             * @param options.root  (Optional) The scenegraph root
             * @param options.autoupdate  (Optional) If true, the plot will automatically update when a node is invalidated
             * @param options.autoupdateinterval  (Optional) Auto update time interval. window.requestAnimationFrame will be used if available and
    autoUpdateInterval not specified
             * @param options.infiniteautoupdate  (Optional) Enables or disables infinite auto update mechanism.<br>
if true, run timer or request animation frame in infinite loop overwise if node is invalidated it will trigger a Plot
update/render. if false, browser pixel scale is not updated.
             * @param options.autosize  (Optional) If true, canvas element automatically fulfill its parent element
             * @param options.autorootbounds  (Optional) If true, set automatically root node bounds to the size of the canvas
             * @param options.suspendupdate  (Optional) Suspend plot update until resumeUpdate is called
             * @param options.offscreendetection  (Optional) Suspend auto plot update if canvas is not in the visible part of the page. if this mode is enabled then
infiniteautoupdate is enabled automatically
             * @param options.debuginfo  (Optional) If true, plot will write to console render time in milliseconds
             * @param options.canvassize  (Optional) 
             * @param options.divelement  (Optional) 
             */
            constructor(options?: any | { canvaselement?: HTMLCanvasElement; root?: geotoolkit.scene.Node; autoupdate?: boolean; autoupdateinterval?: number; infiniteautoupdate?: boolean; autosize?: boolean; autorootbounds?: boolean; suspendupdate?: boolean; offscreendetection?: boolean; debuginfo?: boolean; canvassize?: number; divelement?: HTMLDivElement; } );
            /**
             * Returns root tool associated to this widget
             */
            getTool(): geotoolkit.plot.IToolContainer;
            /**
             * Disposes the plot and the associated resources.<br>
             * This may also call dispose on the root node (see disposeRoot).<br>
             * The plot should not be used/accessed anymore after this has been called.<br>
             * @param disposeRoot  (Optional) Also dispose root node
             */
            dispose(disposeRoot?: boolean): any;
            /**
             * Sets the root node ot be the given node.<br>
             * @param root  (Required) The scenegraph root node
             */
            setRoot(root: geotoolkit.scene.Node): this;
            /**
             * Returns the root node of the scenegraph.<br>
             */
            getRoot(): geotoolkit.scene.Node;
            /**
             * Updates the plot, forcing a render.<br>
             * This will be called automatically when the plot has been marked as dirty if the autoupdate is enabled.<br>
             */
            update(): this;
            /**
             * Returns the canvas element or elements used by this plot
             */
            getCanvas(): HTMLCanvasElement|HTMLCanvasElement[];
            /**
             * Sets the plot size to the given dimensions.<br>
             * This will also change the canvas size if autosize is enabled.<br>
             * If autorootbounds is enabled, this will also update the bounds of the root node.<br>
             * @param width  (Required) The width of plot
             * @param height  (Required) The height of plot
             */
            setSize(width: number, height: number): this;
            /**
             * Returns the containing element for the plot<br>
             * This is either the canvas element or the div element depending on the chosen functionality<br>
             */
            getContainingElement(): HTMLElement;
            /**
             * Returns the containing element width in virtual pixels.<br>
             * This returns the raw size given at initialization or through the setSize function.<br>
             * It ignores any Browser zoom.<br>
             */
            getWidth(): number;
            /**
             * Returns the containing element height in virtual pixels.<br>
             * This returns the raw size given at initialization or through the setSize function.<br>
             * It ignores any Browser zoom.<br>
             */
            getHeight(): number;
            /**
             * Returns the canvas width in virtual pixels.<br>
             * This returns the raw size given at initialization or through the setSize function.<br>
             * It ignores any Browser zoom.<br>
             */
            getCanvasWidth(): number;
            /**
             * Returns the canvas height in virtual pixels.<br>
             * This returns the raw size given at initialization or through the setSize function.<br>
             * It ignores any Browser zoom.<br>
             */
            getCanvasHeight(): number;
            /**
             * Suspends plot update, preventing the update function from triggering a render.<br>
             */
            suspendUpdate(): this;
            /**
             * Resumes plot update, allowing the update function of triggering a render.<br>
             * @param refresh  (Optional) If set to true, a render will be run immediately
             */
            resumeUpdate(refresh?: boolean): this;
            /**
             * Adds an invalidate handler.<br>
             * The invalidate handlers will be notified whenever an invalidation occurs.<br>
             * @param handler  (Required) The handler to be notified about invalidation
             */
            addInvalidateHandler(handler: Function): this;
            /**
             * Removes an invalidate handler.<br>
             * The invalidate handlers will be notified whenever an invalidation occurs.<br>
             * @param handler  (Required) The handler to be notified about invalidation
             */
            removeInvalidateHandler(handler: Function): this;
            /**
             * Enables or disables auto update mechanism.<br>
             * If auto update is enabled, whenever a node is invalidated it will trigger a Plot update/render.<br>
             * @param enable  (Required) The autoupdate status
             * @param infinite  (Optional) Enables or disables infinite auto update mechanism.<br>
if true, run timer or request animation frame in infinite
loop overwise if node is invalidated it will trigger a Plot
update/render. if false, browser pixel scale is not updated.
             */
            setAutoUpdate(enable: boolean, infinite?: boolean): this;
            /**
             * Return true if auto update is enabled.<br>
             */
            isAutoUpdate(): boolean;
            /**
             * Return true if infinite auto update is enabled.<br>
             */
            isInfiniteAutoUpdate(): boolean;
            /**
             * Sets the time interval for autoupdate mechanism.<br>
             * This will define the delay for polling the status of the Plot and trigger an update/render if necessary.<br>
             * @param interval  (Optional) The time interval in ms. window.requestAnimationFrame will be used if available and interval set to null.
             */
            setAutoUpdateInterval(interval?: number): this;
            /**
             * Returns the time interval for autoupdate mechanism.<br>
             */
            getAutoUpdateInterval(): number;
            /**
             * Returns the client rect for the plots container element as DOMRect.<br>
             */
            getBoundingClientRect(): any;
            /**
             * Enable or disable autosize mechanism.<br>
             * If enabled, this will let the Plot resize the associated canvas whenever the plot itself is resized.<br>
             * @param autoSize  (Required) The status of autosize
             */
            setAutoSize(autoSize: boolean): this;
            /**
             * Forces a resize on the plot using its known width and height.<br>
             */
            onResize(): this;
        }
        /**
         * Define an interface that implement plot tool
         */
        interface ITool {
            /**
             * return tool name if any
             */
            getName(): string;
            /**
             * set enable state
             * @param enabled  (Required) sets the enabled state
             */
            setEnabled(enabled: boolean): this;
            /**
             * returns enable state
             */
            isEnabled(): boolean;
        }
        /**
         * Define an interface that implement plot tool container
         */
        interface IToolContainer {
            /**
             * Returns tool by name
             * @param node  (Required) node to check
             */
            getToolByName(node: string): geotoolkit.plot.ITool;
            /**
             * Returns the tool matching the given type. or null if nothing is matching the tool type<br>
             * @param toolType  (Required) toolType of the tool
             */
            getToolByType(toolType: string): geotoolkit.plot.ITool;
            /**
             * List all the tools contained in this composite.
             * Prepend their parent tools parent using a '.'.
             */
            listToolsNames(): string[];
            /**
             * Add tool
             * @param tool  (Required) tool to add
             */
            add(tool: geotoolkit.plot.ITool|geotoolkit.plot.ITool[]): this;
            /**
             * Remove tool
             * @param tool  (Required) tool to remove
             */
            remove(tool: geotoolkit.plot.ITool): this;
            /**
             * Dispose
             */
            dispose(): any;
        }
        module Plot {
            module Events {
                /**
                 * Rendering
                 */
                var Rendering: string;
                /**
                 * Rendered
                 */
                var Rendered: string;
                /**
                 * Invalidated
                 */
                var Invalidated: string;
            }
        }
    }
    module animation {
        /**
         * Defines animation behavior after it just ended.
         * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#Fill}.
         */
        var AnimationFill: any;
        /**
         * Defines effect's interpolation mode.
         * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#AnimFuncCalcMode}.
         */
        var CalcMode: any;
        /**
         * Controls whether or not the animation is additive.
         * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#AdditiveAnim}.
         */
        var Additive: any;
        /**
         * Controls whether or not the animation is cumulative.
         * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#AccumulateAttribute}.
         */
        var Accumulate: any;
        /**
         * Defines a class which contains default easing functions to apply to animation
         */
        class Easing {
            /**
             * Defines a class which contains default easing functions to apply to animation
             */
            constructor();
            /**
             * Contains name of all functions that are registered in default gauge registry.
             * All easing functions are taken from https://raw.github.com/danro/jquery-easing/master/LICENSE
             * ============================================================
             * Open source under the BSD License.
             * 
             * Copyright 2008 George McGinley Smith
             * All rights reserved.
             * https://raw.github.com/danro/jquery-easing/master/LICENSE
             * ========================================================
             */
            static Functions: any;
            /**
             * Returns an object with easing functions indexed by function name
             * Functions have signature
             * param: x; type: geotoolkit.gauges.Gauge; description: Gauge which will be calling the animation
             * param: t; type: number; description: currentTime
             * param: b; type: number; description: startValue
             * param: c; type: number; description: changeInValue
             * param: d; type: number; description: totalIterations
             */
            static getFunctions(): any;
        }
        /**
         * Defines animation behavior after it just ended.
         * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#Fill}.
         */
        interface AnimationFill {
            /**
             * The animation effect F(t) is defined to freeze the effect value at the last value of the active
             * duration. The animation effect is "frozen" for the remainder of the document duration (or until
             * the animation is restarted - see Restarting Animations).
             */
            Freeze: string;
            /**
             * The animation effect is removed (no longer applied) when the active duration of the animation is
             * over. After the active end AE of the animation, the animation no longer affects the target (unless
             * the animation is restarted - see Restarting Animations).
             * This is the default value.
             */
            Remove: string;
        }
        /**
         * Defines effect's interpolation mode.
         * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#AnimFuncCalcMode}.
         */
        interface CalcMode {
            /**
             * This specifies that the animation function will jump from one value to the next without any interpolation.
             */
            Discrete: string;
            /**
             * Simple linear interpolation between values is used to calculate the animation function. This is the default CalcMode.
             */
            Linear: string;
            /**
             * Defines interpolation to produce an even pace of change across the animation. This is only
             * supported for values that define a linear numeric range, and for which some notion of "distance"
             * between points can be calculated (e.g. position, width, height, etc.). If "paced" is specified, any
             * keyTimes or keySplines will be ignored.
             */
            Paced: string;
            /**
             * Interpolates from one value in the values list to the next according to a time function defined
             * by a cubic Bezier spline. The points of the spline are defined in the keyTimes attribute, and the
             * control points for each interval are defined in the keySplines attribute.
             */
            Spline: string;
        }
        /**
         * Controls whether or not the animation is additive.
         * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#AdditiveAnim}.
         */
        interface Additive {
            /**
             * Specifies that the animation will override the underlying value of the attribute and other lower priority animations.
             * This is the default, however the behavior is also affected by the animation value attributes by
             * and to, as described in {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#FromToByAndAdditive} SMIL Animation: How from, to and by attributes affect additive behavior</a>.
             */
            Replace: string;
            /**
             * Specifies that the animation will add to the underlying value of the attribute and other lower priority animations.
             */
            Sum: string;
        }
        /**
         * Controls whether or not the animation is cumulative.
         * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#AccumulateAttribute}.
         */
        interface Accumulate {
            /**
             * Specifies that repeat iterations are not cumulative. This is the default.
             */
            None: string;
            /**
             * Specifies that each repeat iteration after the first builds upon the last value of the previous iteration.
             */
            Sum: string;
        }
        module effects {
            /**
             * Registry which stores animation effect.
             * If you want to add your own effect you should call geotoolkit.animation.effects.Registry.getInstance().registerEffect(class_name)
             * If you want to instantiate class from object you should call geotoolkit.animation.effects.Registry.getInstance().createEffect(effect_object)
             */
            class Registry {
                /**
                 * Registry which stores animation effect.
                 * If you want to add your own effect you should call geotoolkit.animation.effects.Registry.getInstance().registerEffect(class_name)
                 * If you want to instantiate class from object you should call geotoolkit.animation.effects.Registry.getInstance().createEffect(effect_object)
                 */
                constructor();
                /**
                 * Finds class appropriate passed object and instantiates it
                 * @param effect  (Required) effect properties
                 * @param node  (Required) node to which effect would be applied
                 */
                createEffect(effect: any, node: geotoolkit.scene.AbstractNode): geotoolkit.animation.effects.AbstractEffect;
                /**
                 * Register effect in registry
                 * @param Effect  (Required) effect
                 */
                registerEffect(Effect: Function): this;
                /**
                 * Returns instance of the Effects registry
                 */
                static getInstance(): geotoolkit.animation.effects.Registry;
            }
            /**
             * Defines abstract animation effect, API is subset of SMIL animation with two extensions: <br>
             *     1. Can accept param 'function' - like transition-timing-function in CSS <br>
             *     2. Can accept value 'auto' as 'begin' parameter - animation will run automatically when animated attribute is changed.
             */
            class AbstractEffect {
                /**
                 * Defines abstract animation effect, API is subset of SMIL animation with two extensions: <br>
                 *     1. Can accept param 'function' - like transition-timing-function in CSS <br>
                 *     2. Can accept value 'auto' as 'begin' parameter - animation will run automatically when animated attribute is changed.
                 * @param options  (Required) object that contains effect options
                 * @param options.accumulate  (Optional) Controls whether or not the animation is cumulative. For more information
                 * @param options.additive  (Optional) Controls whether or not the animation is additive. For more information .
                 * @param options.begin  (Optional) The begin time of an animation in ms or 'auto' for transition animation
                 * @param options.calcmode  (Optional) Defines effect's interpolation mode.
                 * @param options.duration  (Optional) effect duration
                 * @param options.fill  (Optional) Defines animation behavior after it ends.
                 * @param options.keypoints  (Optional) 
                 * @param options.repeatcount  (Optional) repeat count
                 * @param options.id  (Optional) effect id
                 * @param options.attributename  (Optional) name of animated attribute
                 * @param options.function  (Optional) easing function, if provide keypoints param will be ignored
                 * @param options.from  (Optional) start value of animated attribute, ignored when 'begin'='auto'
                 * @param options.to  (Optional) end value of animated attribute, ignored when 'begin'='auto'
                 * @param options.type  (Optional) type animated attribute for  'attributename'='transform', valid value: 'translate', 'scale', 'rotate'
                 */
                constructor(options: any | { accumulate?: geotoolkit.animation.Accumulate; additive?: geotoolkit.animation.Additive; begin?: string; calcmode?: geotoolkit.animation.CalcMode; duration?: number; fill?: geotoolkit.animation.AnimationFill; keypoints?: number[]; repeatcount?: number; id?: string; attributename?: string; function?: geotoolkit.animation.Easing.Functions; from?: string|number; to?: string|number; type?: string; } );
                /**
                 * Returns true if this class can accept passed effect as a parameter
                 * @param effect  (Required) effect parameters
                 * @param node  (Required) target node
                 */
                isApplicable(effect: any, node: geotoolkit.scene.Node): boolean;
                /**
                 * Extracts value which can animated from node
                 * @param node  (Required) animated node
                 */
                protected getAnimatedValue(node: geotoolkit.scene.Node): number|string|any;
                /**
                 * Returns current value, which should be applied
                 */
                protected getCurrentValue(): any;
                /**
                 * Set processor, which will be used for calculate intermediate values
                 * @param processor  (Required) processor for calculate intermediate values
                 */
                protected setProcessor(processor: geotoolkit.animation.processors.AbstractProcessor): this;
                /**
                 * Gets the number of the time segment.
                 * @param time  (Required) time from effect's start
                 */
                getTimeSegmentIndex(time: number): number;
                /**
                 * Returns transformation, that will be applied to the node
                 */
                protected getTransformation(): geotoolkit.util.Transformation;
                /**
                 * Applies effect to node and invalidate it
                 * To add animation support to target class create new Animation Effect by inherit from this class,
                 * and override method 'apply' to apply intermediate_value to target class(for example with setters)
                 * @param node  (Required) target node
                 */
                protected apply(node: geotoolkit.scene.AbstractNode): any;
                /**
                 * Create or get effect from object
                 * @param object  (Optional) effect
                 */
                static fromObject(object?: any|geotoolkit.animation.effects.AbstractEffect): geotoolkit.animation.effects.AbstractEffect;
            }
            module Motion {
                module RotateType {
                    /**
                     * Allows to set the angle of the rotation manually.
                     */
                    var Value: string;
                    /**
                     * Auto indicates that the object is rotated over time by the angle of the
                     * direction (i.e., directional tangent vector) of the motion path.
                     */
                    var Auto: string;
                    /**
                     * Auto-reverse indicates that the object is rotated over time by the angle of the
                     * direction (i.e., directional tangent vector) of the motion path plus 180 degrees.
                     */
                    var AutoReverse: string;
                }
            }
        }
        module processors {
            /**
             * This class provide interface for processors which are used by geotoolkit.animation.effects.AbstractEffect to animate complex structures
             * like object, array or other.
             */
            class AbstractProcessor {
                /**
                 * This class provide interface for processors which are used by geotoolkit.animation.effects.AbstractEffect to animate complex structures
                 * like object, array or other.
                 */
                constructor();
                /**
                 * Method iterates over passed object, extracts numeric properties and call function func with them
                 * @param from  (Required) initial state
                 * @param to  (Required) target state
                 * @param out  (Required) destination state
                 * @param func  (Required) interpolate function
                 */
                process(from: any, to: any, out: any, func: Function): any;
                /**
                 * Calculate distance between two object
                 * @param v1  (Required) first object
                 * @param v2  (Required) second object
                 */
                distance(v1: any, v2: any): number;
                /**
                 * Returns clone of passed object
                 * @param v  (Required) object to clone
                 */
                clone(v: any): any;
            }
            /**
             * Can process number
             */
            class NumberProcessor extends geotoolkit.animation.processors.AbstractProcessor {
                /**
                 * Can process number
                 */
                constructor();
                /**
                 * Returns instance of the Effects registry
                 */
                static getInstance(): geotoolkit.animation.effects.Registry;
            }
            /**
             * Can process object {key: value}, typeof value === number
             */
            class ObjectProcessor extends geotoolkit.animation.processors.AbstractProcessor {
                /**
                 * Can process object {key: value}, typeof value === number
                 */
                constructor();
                /**
                 * Returns instance of the Effects registry
                 */
                static getInstance(): geotoolkit.animation.effects.Registry;
            }
            /**
             * Can process array of number
             */
            class ArrayProcessor extends geotoolkit.animation.processors.AbstractProcessor {
                /**
                 * Can process array of number
                 */
                constructor();
                /**
                 * Returns instance of the Effects registry
                 */
                static getInstance(): geotoolkit.animation.effects.Registry;
            }
        }
        module Easing {
            /**
             * Contains name of all functions that are registered in default gauge registry.
             * All easing functions are taken from https://raw.github.com/danro/jquery-easing/master/LICENSE
             * ============================================================
             * Open source under the BSD License.
             * 
             * Copyright 2008 George McGinley Smith
             * All rights reserved.
             * https://raw.github.com/danro/jquery-easing/master/LICENSE
             * ========================================================
             */
            interface Functions {
                /**
                 * NoEing sing function
                 */
                NoEasing: string;
                /**
                 * Linear function
                 */
                Linear: string;
                /**
                 * Easing InQuad function
                 */
                EaseInQuad: string;
                /**
                 * Easing OutQuad function
                 */
                EaseOutQuad: string;
                /**
                 * Easing InOutQuad function
                 */
                EaseInOutQuad: string;
                /**
                 * Easing InCubic function
                 */
                EaseInCubic: string;
                /**
                 * Easing OutCubic function
                 */
                EaseOutCubic: string;
                /**
                 * Easing InOutCubic function
                 */
                EaseInOutCubic: string;
                /**
                 * Easing InQuart function
                 */
                EaseInQuart: string;
                /**
                 * Easing OutQuart function
                 */
                EaseOutQuart: string;
                /**
                 * easing InOutQuart function
                 */
                easeInOutQuart: string;
                /**
                 * Easing InQuint function
                 */
                EaseInQuint: string;
                /**
                 * Easing OutQuint function
                 */
                EaseOutQuint: string;
                /**
                 * Easing InOutQuint function
                 */
                EaseInOutQuint: string;
                /**
                 * Easing InSine function
                 */
                EaseInSine: string;
                /**
                 * Easing OutSine function
                 */
                EaseOutSine: string;
                /**
                 * Easing InOutSine function
                 */
                EaseInOutSine: string;
                /**
                 * Easing InExpo function
                 */
                EaseInExpo: string;
                /**
                 * Easing OutExpo function
                 */
                EaseOutExpo: string;
                /**
                 * Easing InOutExpo function
                 */
                EaseInOutExpo: string;
                /**
                 * Easing InCirc function
                 */
                EaseInCirc: string;
                /**
                 * Easing OutCirc function
                 */
                EaseOutCirc: string;
                /**
                 * Easing InOutCirc function
                 */
                EaseInOutCirc: string;
                /**
                 * Easing InElastic function
                 */
                EaseInElastic: string;
                /**
                 * Easing OutElastic function
                 */
                EaseOutElastic: string;
                /**
                 * Easing InOutElastic function
                 */
                EaseInOutElastic: string;
                /**
                 * Easing InBack function
                 */
                EaseInBack: string;
                /**
                 * Easing OutBack function
                 */
                EaseOutBack: string;
                /**
                 * Easing InOutBack function
                 */
                EaseInOutBack: string;
                /**
                 * Easing OutBounce function
                 */
                EaseOutBounce: string;
            }
        }
    }
    module attributes {
        /**
         * Defines a fragment of the underlying pixel data of an area.
         */
        class Raster {
            /**
             * Defines a fragment of the underlying pixel data of an area.
             */
            constructor();
            /**
             * Return an array of colors for the current position
             * @param x  (Required) x position to get color
             * @param y  (Required) y position to get color
             * @param color  (Required) array of color components
             * @param offset  (Optional) offset inside of array fo colors
             * @param count  (Optional) a count of samples in the line
             */
            getColors(x: number, y: number, color: number[], offset?: number, count?: number): any;
            /**
             * Return the actual width, in pixels, of the raster
             */
            getWidth(): number;
            /**
             * Return the actual height, in pixels, of the raster
             */
            getHeight(): number;
        }
        /**
         * Service to provide reusable patterns
         */
        class PatternFactory {
            /**
             * Service to provide reusable patterns
             */
            constructor();
            /**
             * add a new category
             * @param categoryName  (Required) name of category
             */
            add(categoryName: string): any;
            /**
             * return an array with all the categories
             */
            getCategories(): string[];
            /**
             * return the service if exist otherwise null
             * @param categoryName  (Required) unique name of category of patterns
             */
            getCategory(categoryName: string): geotoolkit.attributes.PatternService|any;
            /**
             * remove a category
             * @param name  (Required) name of the Pattern
             */
            remove(name: string): any;
            /**
             * remove all the categories
             */
            clear(): any;
            /**
             * Returns instance of the registry
             */
            static getInstance(): geotoolkit.attributes.PatternFactory;
        }
        /**
         * Parent class for all styles
         */
        class Style extends geotoolkit.util.EventDispatcher {
            /**
             * Parent class for all styles
             */
            constructor();
            /**
             * All inheritors should implement copy constructor or provide custom implementation for this method
             */
            clone(): any;
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             * @param deepCopy  (Optional) deep copy
             */
            protected copyConstructor(src: geotoolkit.attributes.Style, deepCopy?: boolean): this;
            /**
             * Gets time stamp
             */
            getTimeStamp(): number;
            /**
             * Update time stamp to indicate that style has been changed.
             */
            updateTimeStamp(): this;
            /**
             * Set silent mode
             * @param bool  (Required) flag to enable silent mode
             * @param force  (Optional) true if parent should be invalidated immediately
             */
            setSilent(bool: boolean, force?: boolean): this;
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
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             */
            setProperties(properties: any): any;
            /**
             * Notify the node that the style is invalidated
             */
            invalidate(): this;
            /**
             * Return status of the global notification for all styles.
             */
            static isStyleNotificationEnabled(): boolean;
        }
        /**
         * Defines properties to specify margins or
         * padding
         */
        class SpaceStyle extends geotoolkit.attributes.Style {
            /**
             * Defines properties to specify margins or
             * padding
             * @param space  (Optional) object which contains the following fields
             * @param space.left  (Optional) left position
             * @param space.right  (Optional) right position
             * @param space.top  (Optional) top position
             * @param space.bottom  (Optional) bottom position
             */
            constructor(space?: any | { left?: number|string; right?: number|string; top?: number|string; bottom?: number|string; } );
            /**
             * return JSON representation of the space object
             */
            getStyle(): {o:{left:number|string;right:number|string;bottom:number|string;top:number|string}}|any;
            /**
             * Set style
             * @param spaceStyle  (Required) space style
             */
            setStyle(spaceStyle: geotoolkit.attributes.SpaceStyle|any): this;
            /**
             * Return left position
             */
            getLeft(): number|string;
            /**
             * Set left position
             * @param left  (Required) position
             */
            setLeft(left: number|string): this;
            /**
             * Return top position
             */
            getTop(): number|string;
            /**
             * Set top position
             * @param top  (Required) position
             */
            setTop(top: number|string): this;
            /**
             * Return right position
             */
            getRight(): number|string;
            /**
             * Set right position
             * @param right  (Required) position
             */
            setRight(right: number|string): this;
            /**
             * Return bottom position
             */
            getBottom(): number|string;
            /**
             * Set bottom position
             * @param bottom  (Required) position
             */
            setBottom(bottom: number|string): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) object which contains the following fields
             * @param properties.left  (Optional) left position
             * @param properties.right  (Optional) right position
             * @param properties.top  (Optional) top position
             * @param properties.bottom  (Optional) bottom position
             */
            setProperties(properties?: any | { left?: number|string; right?: number|string; top?: number|string; bottom?: number|string; } ): this;
            /**
             * Create or get space style from object
             * @param object  (Optional) object can be in format of constructor
geotoolkit.attributes.SpaceStyle
             */
            static fromObject(object?: any|geotoolkit.attributes.SpaceStyle): geotoolkit.attributes.SpaceStyle;
            /**
             * Return area excluding space
             * @param style  (Required) style to exclude space
             * @param rect  (Optional) original area
             */
            static excludeSpace(style: geotoolkit.attributes.SpaceStyle, rect?: geotoolkit.util.Rect): geotoolkit.util.Rect;
            /**
             * Return area including space
             * @param style  (Required) style to add space
             * @param rect  (Optional) original area
             */
            static addSpace(style: geotoolkit.attributes.SpaceStyle, rect?: geotoolkit.util.Rect): geotoolkit.util.Rect;
        }
        /**
         * Defines a base class to define a pattern.
         */
        class Pattern extends geotoolkit.util.EventDispatcher {
            /**
             * Defines a base class to define a pattern.
             * @param data  (Optional) The image patterns options
             * @param data.patternname  (Optional) name of this pattern for indexing
             * @param data.userhandle  (Optional) additional info associated with current image pattern
             * @param data.containername  (Optional) an optional container name, which creates an image pattern. This
parameter is used for serialization if you want to save are reference to pattern instead of the pattern itself
             * @param data.scalable  (Optional) flag that sets scalability of the pattern
coordinates, or relative to the shape it is filling (It is not supported)
             */
            constructor(data?: any | { patternname?: string; userhandle?: any; containername?: string; scalable?: boolean; } );
            /**
             * Makes a pattern from the image
             * @param context  (Required) 2d rendering context from canvas
             * @param repetition  (Required) style of repetition
             * @param foregroundColor  (Optional) of the pattern
             * @param transform  (Optional) current transformation
             */
            getPattern(context: any, repetition: string, foregroundColor?: string, transform?: geotoolkit.util.Transformation): CanvasPattern;
            /**
             * Gets the X scale for image transformation.
             */
            protected getScaleX(): number;
            /**
             * Gets the Y scale for image transformation.
             */
            protected getScaleY(): number;
            /**
             * Returns true if image has already loaded and current instance is ready to draw.
             */
            isReady(): boolean;
            /**
             * Returns size as a Dimension object with width and height attributes
             */
            getSize(): geotoolkit.util.Dimension;
            /**
             * Width of this pattern's image
             */
            getWidth(): number;
            /**
             * Height of this pattern's image
             */
            getHeight(): number;
            /**
             */
            getUserHandle(): any;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.patternname  (Optional) Pattern name
             * @param properties.containername  (Optional) Container name
             * @param properties.scalable  (Optional) Defines pattern scalability
             * @param properties.userhandle  (Optional) User handle function
             */
            setProperties(properties: any | { patternname?: string; containername?: string; scalable?: boolean; userhandle?: Function; } ): this;
            /**
             * invalidate parent
             * @param foregroundColor  (Optional) of the pattern
             */
            invalidate(foregroundColor?: string): this;
            /**
             * return the load image promise
             */
            getPromise(): geotoolkit.util.Promise;
            /**
             * This method sets the container and pattern name to be
             * used for serialization.
             * @param patternName  (Required) pattern name
             * @param containerName  (Required) container name
             */
            setPatternName(patternName: string, containerName: string): this;
            /**
             * Returns pattern name
             */
            getPatternName(): string;
            /**
             * Returns a name of the pattern container
             */
            getContainerName(): string;
            /**
             * Return the imagepattern data url promise
             */
            getDataURL(): geotoolkit.util.Promise;
        }
        /**
         * Defines a base class to define an image pattern.
         */
        class ImagePattern extends geotoolkit.attributes.Pattern {
            /**
             * Defines a base class to define an image pattern.
             * @param src  (Required) image from DOM element or The image patterns options
             * @param src.src  (Required) image from DOM element
             * @param src.patternname  (Optional) name of this pattern for indexing
             * @param src.userhandle  (Optional) additional info associated with current image pattern
             * @param src.url  (Optional) or url of the image to load
             * @param src.rawsize  (Optional) using image raw size
             * @param src.containername  (Optional) an optional container name, which creates an image pattern. This
parameter is used for serialization if you want to save are reference to pattern instead of the pattern itself
             * @param src.scalable  (Optional) Flag that sets scalability of the pattern
             * @param src.desiredWidth  (Optional) desired image width
             * @param src.desiredHeight  (Optional) desired image height
             * @param patternName  (Optional) name of this pattern for indexing
             * @param userHandle  (Optional) additional info associated with current image pattern
             * @param url  (Optional) or url of the image to load
             * @param rawsize  (Optional) using image raw size
             * @param containerName  (Optional) an optional container name, which creates an image pattern. This
parameter is used for serialization if you want to save are reference to pattern instead of the pattern itself
             * @param scalable  (Optional) Flag that sets scalability of the pattern
coordinates, or relative to the shape it is filling
             */
            constructor(src: HTMLImageElement|any | { src?: HTMLImageElement; patternname?: string; userhandle?: any; url?: string; rawsize?: boolean; containername?: string; scalable?: boolean; desiredWidth?: number; desiredHeight?: number; } , patternName?: string, userHandle?: any, url?: string, rawsize?: boolean, containerName?: string, scalable?: boolean);
            /**
             * Sets desired image width and height
             * @param width  (Required) either dimension object or desired width of the image pattern
             * @param height  (Optional) desired height of the image pattern
             */
            setDesiredSize(width: geotoolkit.util.Dimension|number, height?: number): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {props:{src:string;alt:string;rawsize:boolean}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.rawsize  (Optional) using image raw size
             * @param properties.desiredwidth  (Optional) desired width of the image pattern
             * @param properties.desiredheight  (Optional) desired height of the image pattern
             * @param properties.alt  (Optional) text for an image
             * @param properties.src  (Optional) image from DOM element or The image patterns options
             */
            setProperties(properties: any | { rawsize?: boolean; desiredwidth?: number; desiredheight?: number; alt?: string; src?: HTMLImageElement|any; } ): this;
        }
        /**
         * Defines pattern as a collection of shapes
         */
        class GeometryPattern extends geotoolkit.attributes.Pattern {
            /**
             * Defines pattern as a collection of shapes
             * @param options  (Optional) The image patterns options
             * @param options.patternname  (Optional) name of this pattern for indexing
             * @param options.userhandle  (Optional) additional info associated with current image pattern
parameter is used for serialization if you want to save are reference to pattern instead of the pattern itself
             * @param options.model  (Optional) A geometry to draw the pattern from
             * @param options.scalable  (Optional) Flag that sets scalability of the pattern
coordinates, or relative to the shape it is filling
             */
            constructor(options?: any | { patternname?: string; userhandle?: any; model?: geotoolkit.scene.Group; scalable?: boolean; } );
            /**
             * Makes a pattern from the image
             * @param context  (Required) 2d rendering context from canvas
             * @param repetition  (Required) style of repetition
             * @param foregroundColor  (Optional) of the pattern
             * @param transform  (Optional) Current transformation
             */
            getPattern(context: any, repetition: string, foregroundColor?: string, transform?: geotoolkit.util.Transformation): CanvasPattern;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {props:{patternname:string;scalable:boolean}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.model  (Optional) A geometry to draw the pattern from
             */
            setProperties(properties: any | { model?: geotoolkit.scene.Group; } ): this;
        }
        /**
         * Define an image container or named collection of images.
         */
        class ImageContainer {
            /**
             * Define an image container or named collection of images.
             * @param name  (Required) name of this image container
             */
            constructor(name: string);
            /**
             * IE9 is supported with Fl;
             * Query image element by name
             * @param imageName  (Required) name of the image
             */
            queryImage(imageName: string): HTMLImageElement;
            /**
             * Query image pattern by name
             * @param imageName  (Required) name of the image
             */
            queryPattern(imageName: string): geotoolkit.attributes.ImagePattern;
            /**
             * Register image element
             * @param imageName  (Optional) nullable an unique name
             * @param element  (Optional) nullable image element to be registered
             * @param userHandler  (Optional) optional user handle
             */
            register(imageName?: string, element?: HTMLImageElement, userHandler?: any): any;
            /**
             * Unregister image element
             * @param imageName  (Required) an unique name
             */
            unRegister(imageName: string): any;
            /**
             * Clear all the image
             */
            clear(): any;
            /**
             * Return an array that contains all images names in container
             */
            queryImageNames(): string[];
            /**
             * Returns image container by name
             * @param name  (Required) name of the container
             */
            static getContainer(name: string): geotoolkit.attributes.ImageContainer;
        }
        /**
         * Implements a container to store geometries that define a pattern
         */
        class GeometryContainer {
            /**
             * Implements a container to store geometries that define a pattern
             * @param name  (Required) name of this geometry container
             */
            constructor(name: string);
            /**
             * Query geometry element by name
             * @param geometryName  (Required) name of the geometry
             */
            queryGeometry(geometryName: string): geotoolkit.scene.Group;
            /**
             * Query geometry pattern by name
             * @param geometryName  (Required) name of the geometry
             */
            queryPattern(geometryName: string): geotoolkit.attributes.GeometryPattern;
            /**
             * Register geometry element
             * @param geometryName  (Optional) an unique name
             * @param element  (Optional) geometry element to be registered
             * @param userHandler  (Optional) optional user handle
             */
            register(geometryName?: string, element?: geotoolkit.scene.Group, userHandler?: any): any;
            /**
             * Unregister geometry element
             * @param geometryName  (Required) an unique name
             */
            unRegister(geometryName: string): any;
            /**
             * Unregisteres and removes all the geometries from container
             */
            clear(): any;
            /**
             * Returns an array of names registered in geometry container at the moment of calling
             */
            queryGeometryNames(): string[];
            /**
             * Returns geometry container by name
             * @param name  (Required) name of the container
             */
            static getContainer(name: string): geotoolkit.attributes.GeometryContainer;
        }
        /**
         * Defines a base class to define a style that has a color attribute.
         */
        class ColoredStyle extends geotoolkit.attributes.Style {
            /**
             * Defines a base class to define a style that has a color attribute.
             * @param color  (Optional) color in CSS form
             * @param shadow  (Optional) JSON for displaying shadow
             * @param shadow.color  (Optional) shadow color
             * @param shadow.blur  (Optional) shadow blur
             * @param shadow.offsetx  (Optional) shadow offset in x direction
             * @param shadow.offsety  (Optional) shadow offset in y direction
             * @param shadow.enable  (Optional) check if shadow is enable or not
             */
            constructor(color?: string|geotoolkit.util.RgbaColor|any, shadow?: any | { color?: string; blur?: number; offsetx?: number; offsety?: number; enable?: boolean; } );
            /**
             * Sets color
             * @param color  (Required) in CSS string form or RgbaColor object
             */
            setColor(color: string|geotoolkit.util.RgbaColor): this;
            /**
             * Returns color
             */
            getColor(): string;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {props:{color:string|geotoolkit.util.RgbaColor;shadow:{color:string;blur:number;offsetx:number;offsety:number;enable:boolean}}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.color  (Optional) The attribute color
             * @param properties.shadow  (Optional) shadow JSON see {@link geotoolkit.attributes.ColoredStyle#setShadow}
             */
            setProperties(properties: any | { color?: string|geotoolkit.util.RgbaColor; shadow?: any; } ): this;
            /**
             * Sets all properties pertaining to shadow
             * @param shadow  (Required) data
             * @param shadow.color  (Optional) color of shadow
             * @param shadow.blur  (Optional) blur shadow
             * @param shadow.offsetx  (Optional) x offset for shadow
             * @param shadow.offsety  (Optional) y offset for shadow
             * @param shadow.enable  (Optional) check if shadow is enable or not
             */
            setShadow(shadow: any | { color?: string; blur?: number; offsetx?: number; offsety?: number; enable?: boolean; } ): this;
            /**
             * Gets all properties pertaining to shadow
             */
            getShadow(): {shadow:{shadow:{color:string;blur:number;offsetx:number;offsety:number;enable:boolean}};props:{color:string|geotoolkit.util.RgbaColor}}|any;
        }
        /**
         * Defines properties of outline. It contains line color, line width, and
         * pattern. Patterns can be passed in using LineStyle.Pattern.Dot etc.
         */
        class LineStyle extends geotoolkit.attributes.ColoredStyle {
            /**
             * Defines properties of outline. It contains line color, line width, and
             * pattern. Patterns can be passed in using LineStyle.Pattern.Dot etc.
             * @param color  (Optional) The line color
             * @param color.color  (Optional) The line color
             * @param color.width  (Optional) The line thickness
             * @param color.pattern  (Optional) The line pattern
             * @param color.linejoin  (Optional) The line join style
             * @param color.linecap  (Optional) The line cap style
             * @param color.fill  (Optional) optional fill style to be used to fill lines generated with this style.
             * @param color.unit  (Optional) optional unit for the width
             * @param color.shadow  (Optional) JSON for displaying shadow
             * @param color.shadow.color  (Optional) shadow color
             * @param color.shadow.blur  (Optional) shadow blur
             * @param color.shadow.offsetx  (Optional) shadow offset in x direction
             * @param color.shadow.offsety  (Optional) shadow offset in y direction
             * @param color.shadow.enable  (Optional) check if shadow is enable or not
             * @param color.pixelsnapmode  (Optional) pixelSnapMode JSON with x and y attributes with booleans default({'x': false, 'y': false})
             * @param width  (Optional) The line thickness
             * @param pattern  (Optional) The line pattern
             */
            constructor(color?: any | { color?: string|geotoolkit.util.RgbaColor; width?: number; pattern?: number[]|geotoolkit.attributes.LineStyle.Patterns; linejoin?: geotoolkit.attributes.LineStyle.JoinStyle|string; linecap?: geotoolkit.attributes.LineStyle.CapStyle|string; fill?: geotoolkit.attributes.FillStyle; unit?: geotoolkit.util.AbstractUnit|string; shadow?: any | { color?: string; blur?: number; offsetx?: number; offsety?: number; enable?: boolean; } ; pixelsnapmode?: any; } |string|geotoolkit.util.RgbaColor, width?: number, pattern?: number[]|geotoolkit.attributes.LineStyle.Patterns);
            /**
             * Enum of line style patterns
             */
            static Patterns: any;
            /**
             * Enum of line join
             */
            static JoinStyle: any;
            /**
             * Enum of line join
             */
            static CapStyle: any;
            /**
             * return Pixel Snap Mode
             */
            getPixelSnapMode(): any;
            /**
             * Set Pixel Snap Mode
             * @param pixelSnapMode  (Optional) JSON with x and y attributes with booleans
             * @param pixelSnapMode.x  (Optional) snap by x
             * @param pixelSnapMode.y  (Optional) snap by y
             */
            setPixelSnapMode(pixelSnapMode?: any | { x?: boolean; y?: boolean; } |boolean): this;
            /**
             * Sets fill style to fill line content. if fill is set line color is ignored
             * @param fill  (Required) fill style to to be used to fill line.
             */
            setFillStyle(fill: geotoolkit.attributes.FillStyle|any): this;
            /**
             * Returns fill style
             */
            getFillStyle(): geotoolkit.attributes.FillStyle;
            /**
             * Line join style, passes through to the underlying html5 canvas renderer.
             * @param lineJoin  (Required) style, can be 'miter', 'round' and 'bevel'
             */
            setJoinStyle(lineJoin: geotoolkit.attributes.LineStyle.JoinStyle|string): this;
            /**
             * Get current lineJoin style
             */
            getJoinStyle(): geotoolkit.attributes.LineStyle.JoinStyle|string;
            /**
             * Line cap style, passes through to canvas directly
             * @param capStyle  (Required) can be 'butt', 'square', or 'round'
             */
            setCapStyle(capStyle: geotoolkit.attributes.LineStyle.CapStyle|string): this;
            /**
             * Get current line cap style
             */
            getCapStyle(): geotoolkit.attributes.LineStyle.CapStyle|string;
            /**
             * Returns unit of the measure for the width
             */
            getUnit(): geotoolkit.util.AbstractUnit;
            /**
             * Sets unit of the measure for the width
             * @param unit  (Required) a scale unit or string symbol
             */
            setUnit(unit: geotoolkit.util.AbstractUnit|string): this;
            /**
             * Sets line width
             * @param width  (Required) line width
             */
            setWidth(width: number): this;
            /**
             * Return line width
             */
            getWidth(): number;
            /**
             * Return line pattern
             */
            getPattern(): geotoolkit.attributes.LineStyle.Patterns|number[];
            /**
             * Sets line pattern
             * @param pattern  (Required) line pattern
             */
            setPattern(pattern: geotoolkit.attributes.LineStyle.Patterns|number[]): this;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * <br>
             * <br>
             * <h5>CSS Descriptions:</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Property</th><th>Description</th><th>Example</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>linestyle-color</td><td>Change line style color</td><td>{  linestyle-color:  #000; }</td>
             *          </tr>
             *          <tr>
             *              <td>linestyle-width</td><td>Change line style width </td><td>{ linestyle-width: 2 ;}</td>
             *          </tr>
             *      <tbody>
             *  </table>
             * <br>
             * @param properties  (Optional) An object containing the properties to set
             * @param properties.width  (Optional) line thickness
             * @param properties.pattern  (Optional) line pattern
             * @param properties.linepattern  (Optional) deprecated (since 2.6) line pattern
             * @param properties.linejoin  (Optional) The line join style
             * @param properties.linecap  (Optional) The line cap style
             * @param properties.unit  (Optional) optional unit for the width
             * @param properties.pixelsnapmode  (Optional) pixel SnapMode JSON see {@link geotoolkit.attributes.LineStyle#setPixelSnapMode}
             */
            setProperties(properties?: any | { width?: number; pattern?: geotoolkit.attributes.LineStyle.Patterns|number[]; linepattern?: geotoolkit.attributes.LineStyle.Patterns|number[]; linejoin?: geotoolkit.attributes.LineStyle.JoinStyle|string; linecap?: geotoolkit.attributes.LineStyle.CapStyle|string; unit?: geotoolkit.util.AbstractUnit|string; pixelsnapmode?: any; } ): this;
            /**
             * Create or get line style from object
             * @param object  (Optional) object can be in format of constructor of geotoolkit.attributes.LineStyle
             */
            static fromObject(object?: any|geotoolkit.attributes.LineStyle): geotoolkit.attributes.LineStyle;
            /**
             * Merge css linestyle object with existing instance
             * @param node  (Required) 
             * @param lineStyle  (Required) instance of node property
             * @param object  (Required) contains line style
             * @param merge  (Optional) merge flag
             * @param invalidateMethod  (Optional) 
             */
            static mergeFromObject(node: geotoolkit.scene.Node, lineStyle: geotoolkit.attributes.LineStyle, object: geotoolkit.attributes.LineStyle|string|any, merge?: boolean, invalidateMethod?: Function): geotoolkit.attributes.LineStyle;
            /**
             * Empty style
             */
            static Empty: geotoolkit.attributes.LineStyle;
        }
        /**
         * Defines fill style. This fill style can have a color and a pattern
         */
        class FillStyle extends geotoolkit.attributes.ColoredStyle implements geotoolkit.attributes.IRasterable {
            /**
             * Defines fill style. This fill style can have a color and a pattern
             * @param color  (Optional) The fill color
             * @param color.color  (Optional) The fill color
             * @param color.pattern  (Optional) The background pattern
             * @param color.foreground  (Optional) The foreground color of the pattern
             * @param color.evenoddmode  (Optional) The flag indicating whether even-odd fill mode is to be used.
             * @param pattern  (Optional) The background pattern
             * @param foreground  (Optional) The foreground color of the pattern
             * @param evenoddmode  (Optional) The flag indicating whether even-odd fill mode is to be used.
             * @param shadow  (Optional) JSON for displaying shadow
             * @param shadow.color  (Optional) shadow color
             * @param shadow.blur  (Optional) shadow blur
             * @param shadow.offsetx  (Optional) shadow offset in x direction
             * @param shadow.offsety  (Optional) shadow offset in y direction
             * @param shadow.enable  (Optional) check if shadow is enable or not
             */
            constructor(color?: string|geotoolkit.util.RgbaColor|geotoolkit.attributes.FillStyle|any | { color?: string|geotoolkit.util.RgbaColor; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; evenoddmode?: boolean; } , pattern?: geotoolkit.attributes.ImagePattern, foreground?: string|geotoolkit.util.RgbaColor, evenoddmode?: boolean, shadow?: any | { color?: string; blur?: number; offsetx?: number; offsety?: number; enable?: boolean; } );
            /**
             * Attach listener on event
             * @param type  (Required) type of event or property
             * @param callback  (Required) to be called
             */
            on(type: string, callback: Function): this;
            /**
             * Detach listener on event.
             * Calling .off() with no arguments removes all attached listeners.
             * Calling .off(type) with no callback removes all attached listeners for specific type.
             * @param type  (Optional) type of the event
             * @param callback  (Optional) function to be called
             */
            off(type?: string, callback?: Function): this;
            /**
             * Return fill pattern. Can pass in rendering context to get HTML DOM
             * pattern, or no arguments to get fillPattern object.
             * @param context  (Optional) Rendering Context
             */
            getPattern(context?: geotoolkit.renderer.RenderingContext): geotoolkit.attributes.ImagePattern;
            /**
             * Sets fill pattern.
             * @param pattern  (Optional) fill pattern
             */
            setPattern(pattern?: geotoolkit.attributes.ImagePattern): this;
            /**
             * Gets type of style this is, STYLE_TYPE_COLOR or STYLE_TYPE_PATTERN
             */
            getStyleType(): string;
            /**
             * Sets foreground color
             * @param color  (Required) RgbaColor for foreground
             */
            setForegroundColor(color: string|geotoolkit.util.RgbaColor): this;
            /**
             * gets foreground color
             */
            getForegroundColor(): string;
            /**
             * Gets the even odd fill mode
             */
            getEvenOddMode(): boolean;
            /**
             * Sets the even odd fill mode
             * @param evenOddMode  (Required) The even odd fill mode flag.
             */
            setEvenOddMode(evenOddMode: boolean): this;
            /**
             * Returns true if fills are identical
             * @param other  (Required) FillStyle to compare against
             */
            equalsTo(other: geotoolkit.attributes.FillStyle): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {object:{pattern:geotoolkit.attributes.ImagePattern;foreground:string|geotoolkit.util.RgbaColor}}|any;
            /**
             * Sets all the properties pertaining to this object
             * <br>
             * <br>
             * <h5>CSS Descriptions:</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Property</th><th>Description</th><th class="last">Example</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td class="name"> fillstyle-color </td><td class="type">Change fill style color</td><td class="description last">{  fillstyle-color:  #000; }</td>
             *          </tr>
             *      </tbody>
             * </table>
             * <br>
             * <br>
             * @param properties  (Required) An object containing the properties to set
             * @param properties.pattern  (Optional) the pattern to fill
             * @param properties.fillpattern  (Optional) deprecated (since 2.6) the pattern to fill
             * @param properties.foreground  (Optional) foreground color
             */
            setProperties(properties: any | { pattern?: geotoolkit.attributes.ImagePattern; fillpattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; } ): this;
            /**
             * Returns a new instance of geotoolkit.attributes.Raster
             * @param xMin  (Optional) x Min position to get color
             * @param yMin  (Optional) y Min position to get color
             * @param xMax  (Optional) x Max position to get color
             * @param yMax  (Optional) y Max position to get color
             */
            getRaster(xMin?: number, yMin?: number, xMax?: number, yMax?: number): geotoolkit.attributes.Raster;
            /**
             * Disposes this style, once disposes a style should not be used anymore.
             */
            dispose(): any;
            /**
             * Create or get fill style from object
             * @param object  (Optional) object can be in format of constructor
geotoolkit.attributes.FillStyle
             */
            static fromObject(object?: any|geotoolkit.attributes.FillStyle): geotoolkit.attributes.FillStyle|geotoolkit.attributes.LinearGradientStyle|geotoolkit.attributes.RadialGradientStyle;
            /**
             * Merge css fillstyle object with existing instance
             * @param node  (Required) 
             * @param fillStyle  (Required) instance of node property
             * @param object  (Required) contains fill style
             * @param merge  (Optional) merge flag
             * @param invalidateMethod  (Optional) 
             */
            static mergeFromObject(node: geotoolkit.scene.Node, fillStyle: geotoolkit.attributes.FillStyle, object: geotoolkit.attributes.FillStyle|any|string, merge?: boolean, invalidateMethod?: Function): geotoolkit.attributes.FillStyle;
            /**
             * Empty style
             */
            static Empty: geotoolkit.attributes.FillStyle;
            /**
             * Pick style
             */
            static Pick: geotoolkit.attributes.FillStyle;
        }
        /**
         * Defines a collection of text properties.
         * Constructor can be TextStyle(color,baseLine,alignment,font) or
         * TextStyle(font) or TextStyle(baseLine, alignment)
         */
        class TextStyle extends geotoolkit.attributes.ColoredStyle {
            /**
             * Defines a collection of text properties.
             * Constructor can be TextStyle(color,baseLine,alignment,font) or
             * TextStyle(font) or TextStyle(baseLine, alignment)
             * @param options  (Optional) text color or a json object
             * @param options.color  (Optional) text color
             * @param options.baseline  (Optional) base line.
             * @param options.alignment  (Optional) alignment.
             * @param options.font  (Optional) font.
             * @param options.autosize  (Optional) auto font size on high definition display.
             * @param options.multiline  (Optional) allow multi-line text
             * @param options.fonturl  (Optional) the place from which the font will be loaded, if null - uses system fonts
             * @param baseLine  (Optional) base line.
             * @param alignment  (Optional) alignment.
             * @param font  (Optional) font.
             * @param autoSize  (Optional) auto font size on high definition display.
             * @param multiline  (Optional) allow multi-line text
             * @param shadow  (Optional) JSON for displaying shadow
             * @param shadow.color  (Optional) shadow color
             * @param shadow.blur  (Optional) shadow blur
             * @param shadow.offsetx  (Optional) shadow offset in x direction
             * @param shadow.offsety  (Optional) shadow offset in y direction
             * @param shadow.enable  (Optional) check if shadow is enable or not
             */
            constructor(options?: string|geotoolkit.util.RgbaColor|any | { color?: string|geotoolkit.util.RgbaColor; baseline?: geotoolkit.attributes.TextStyle.BaseLineStyle|string; alignment?: geotoolkit.attributes.TextStyle.AlignmentStyle|string; font?: string; autosize?: boolean; multiline?: boolean; fonturl?: string; } , baseLine?: geotoolkit.attributes.TextStyle.BaseLineStyle|string, alignment?: geotoolkit.attributes.TextStyle.AlignmentStyle|string, font?: string, autoSize?: boolean, multiline?: boolean, shadow?: any | { color?: string; blur?: number; offsetx?: number; offsety?: number; enable?: boolean; } );
            /**
             * Create a deep copy
             */
            clone(): geotoolkit.attributes.TextStyle;
            /**
             * Allows text to be printed along multiple lines.
             * @param multiLine  (Required) allow text to be printed along multiple lines or not
             */
            setMultiLine(multiLine: boolean): this;
            /**
             * true if text is multiline
             */
            getMultiLine(): boolean;
            /**
             * Sets line height
             * see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
             * @param lineHeight  (Required) line height
             */
            setLineHeight(lineHeight: string|number): this;
            /**
             * Return line height
             * see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
             */
            getLineHeight(): string|number;
            /**
             * Return font
             */
            getFont(): string;
            /**
             * Sets font
             * @param font  (Required) font in CSS format
             */
            setFont(font: string): this;
            /**
             * Gets outline style
             */
            getOutline(): geotoolkit.attributes.LineStyle;
            /**
             * Sets outline style
             * @param style  (Required) outline style
             */
            setOutline(style: string|any|geotoolkit.attributes.LineStyle): this;
            /**
             * Return current text baseline
             */
            getBaseLine(): geotoolkit.attributes.TextStyle.BaseLineStyle;
            /**
             * Enum of base line
             */
            static BaseLineStyle: any;
            /**
             * Enum of alignment
             */
            static AlignmentStyle: any;
            /**
             * Sets base line, for alignment geotoolkit.scene.shapes.Text use AnchorType
             * @param baseLine  (Required) in CSS format
             */
            setBaseLine(baseLine: geotoolkit.attributes.TextStyle.BaseLineStyle|string): this;
            /**
             * Return text alignment
             */
            getAlignment(): string|geotoolkit.attributes.TextStyle.AlignmentStyle;
            /**
             * Sets text alignment
             * @param alignment  (Required) in CSS format
             */
            setAlignment(alignment: geotoolkit.attributes.TextStyle.AlignmentStyle|string): this;
            /**
             * Sets auto size
             * @param autoSize  (Required) autosize enable or not
             */
            setAutoSize(autoSize: boolean): this;
            /**
             * Return an object results of the {@link geotoolkit.attributes.TextStyle.parseFont} of the inline font string.
             */
            getProcessedFont(): any;
            /**
             * Return text auto size
             */
            getAutoSize(): boolean;
            /**
             */
            toString(): string;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * <br>
             * <br>
             * <h5>CSS Descriptions:</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Property</th><th>Description</th><th>Example</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>textstyle-color</td><td>Change text style color</td><td>{  textstyle-color:  #000; }</td>
             *          </tr>
             *          <tr>
             *              <td>textstyle-baseline</td><td>Change baseline</td><td>{  textstyle-baseline:  alphabetic; }</td>
             *          </tr>
             *          <tr>
             *              <td>textstyle-font</td><td>Change font</td><td>{textstyle-font: 42px Roboto;}</td>
             *          </tr>
             *          <tr>
             *              <td>textstyle-alignment</td><td>Change text style alignment</td><td>{textstyle-alignment: center;}</td>
             *          </tr>
             *      <tbody>
             *  </table>
             * <br>
             * @param properties  (Optional) An object containing the properties to set
             * @param properties.font  (Optional) font in CSS format
             * @param properties.alignment  (Optional) alignment
             * @param properties.baseline  (Optional) baseLine in CSS
             * @param properties.lineheight  (Optional) line height
             * @param properties.multiline  (Optional) multi line
             * @param properties.autosize  (Optional) auto size
             */
            setProperties(properties?: any | { font?: string; alignment?: geotoolkit.attributes.TextStyle.AlignmentStyle|string; baseline?: geotoolkit.attributes.TextStyle.BaseLineStyle|string; lineheight?: string|number; multiline?: boolean; autosize?: boolean; } ): this;
            /**
             * Create or get fill style from object
             * @param object  (Required) object can be in format of constructor of
geotoolkit.attributes.TextStyle
             */
            static fromObject(object: any|string|geotoolkit.attributes.TextStyle|any): geotoolkit.attributes.TextStyle|any;
            /**
             * Merge css textstyle object with existing instance
             * @param node  (Required) node
             * @param textStyle  (Required) instance of node property
             * @param object  (Required) contains text style
             * @param merge  (Optional) merge flag
             * @param invalidateMethod  (Optional) optional invalidate method
             */
            static mergeFromObject(node: geotoolkit.scene.Node, textStyle: geotoolkit.attributes.TextStyle, object: geotoolkit.attributes.TextStyle|any|string, merge?: boolean, invalidateMethod?: Function): geotoolkit.attributes.TextStyle;
        }
        /**
         * Defines an abstract gradient fill style. It contains information about gradient stops and colors.
         */
        class GradientStyle extends geotoolkit.attributes.FillStyle {
            /**
             * Defines an abstract gradient fill style. It contains information about gradient stops and colors.
             * @param color  (Required) Color of FillStyle (not used in Gradient) or JSON with parameters
             * @param color.color  (Optional) Color of FillStyle (not used in Gradient)
             * @param color.pattern  (Optional) The background pattern (not used in Gradient)
             * @param color.foreground  (Optional) The foreground color of the pattern (not used in Gradient)
             * @param color.evenoddmode  (Optional) The flag indicating whether even-odd fill mode is to be used.
             * @param color.spreadMethod  (Optional) Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
             * @param color.unitType  (Optional) Type of coordinated used to define gradient
             * @param color.transformation  (Optional) Gradient transformation
             * @param pattern  (Optional) The background pattern (not used in Gradient)
             * @param foreground  (Optional) The foreground color of the pattern (not used in Gradient)
             * @param evenoddmode  (Optional) The flag indicating whether even-odd fill mode is to be used.
             * @param spreadMethod  (Optional) Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
             * @param unitType  (Optional) Type of coordinated used to define gradient
             * @param transformation  (Optional) Gradient transformation
             */
            constructor(color: geotoolkit.util.RgbaColor|string|any | { color?: geotoolkit.util.RgbaColor|string; pattern?: geotoolkit.attributes.ImagePattern; foreground?: string|geotoolkit.util.RgbaColor; evenoddmode?: boolean; spreadMethod?: geotoolkit.attributes.GradientStyle.SpreadMethods|string; unitType?: geotoolkit.attributes.GradientStyle.GradientUnits|string; transformation?: geotoolkit.util.Transformation; } , pattern?: geotoolkit.attributes.ImagePattern, foreground?: string|geotoolkit.util.RgbaColor, evenoddmode?: boolean, spreadMethod?: geotoolkit.attributes.GradientStyle.SpreadMethods|string, unitType?: geotoolkit.attributes.GradientStyle.GradientUnits|string, transformation?: geotoolkit.util.Transformation);
            /**
             * Returns the transformation set on the gradient
             */
            getTransformation(): geotoolkit.util.Transformation;
            /**
             * Sets transformation for the gradient
             * @param transform  (Required) The new gradient transformation
             */
            setTransformation(transform: geotoolkit.util.Transformation): this;
            /**
             * Enum for gradient Spread methods
             */
            static SpreadMethods: any;
            /**
             * Enum for gradient units
             */
            static GradientUnits: any;
            /**
             */
            getSpreadMethod(): geotoolkit.attributes.GradientStyle.SpreadMethods|string;
            /**
             * Changes spread method for the gradient
             * @param sMethod  (Required) Spread method to apply to the gradient
             */
            setSpreadMethod(sMethod: geotoolkit.attributes.GradientStyle.SpreadMethods|string): this;
            /**
             * Sets unit type for the gradient
             * @param u  (Required) Unit type
             */
            setUnits(u: geotoolkit.attributes.GradientStyle.GradientUnits|string): this;
            /**
             * Gets the type of units
             */
            getUnits(): geotoolkit.attributes.GradientStyle.GradientUnits|string;
            /**
             * Enable usage of absolute coordinates as units. By default it is relative
             * coordinates, which means it displayed in model limits. Relative
             * coordinates are defined from 0 to 1.
             * @param enable  (Required) enable or disable gradient stops defined in absolute coordinates
             */
            enableAbsoluteCoordinates(enable: boolean): this;
            /**
             * Returns true if gradient stop coordinates are absolute, false if relative.
             */
            isAbsoluteCoordinates(): boolean;
            /**
             * Return the number of defined gradient stop points
             */
            getStopPointsCount(): number;
            /**
             * Add a new stop point at a given position and color.
             * @param position  (Required) position of the stop point, if in relative coordinates from 0 to 1
             * @param color  (Required) color in CSS form for specified stop point
             */
            addStopPoint(position: number, color: string): this;
            /**
             * Removes stop point at index.
             * @param index  (Required) index of the stop point
             */
            removeStopPoint(index: number): this;
            /**
             * Return color at a stop point by index.
             * @param index  (Required) index of a stop point
             */
            getStopPointColor(index: number): string|any;
            /**
             * Sets color to a stop point by index.
             * @param index  (Required) index of a stop point
             * @param color  (Required) Color to set to the stop point
             */
            setStopPointColor(index: number, color: string|geotoolkit.util.RgbaColor): this;
            /**
             * Return stop point position
             * @param index  (Required) index of stop point
             */
            getStopPointPosition(index: number): number|any;
            /**
             * Clear all stop points
             */
            clearStopPoints(): this;
            /**
             * Returns style type
             */
            getStyleType(): string;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {properties:{stoppoints:any[];absolutecoordinates:boolean;spreadMethod:{Pad:geotoolkit.attributes.GradientStyle.SpreadMethods|string};unitType:geotoolkit.attributes.GradientStyle.GradientUnits|string;transformation:geotoolkit.util.Transformation}}|any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Optional) An object containing the properties to set
             * @param properties.stoppoints  (Optional) Array with stop points. Each object should contain the position and the color.
             * @param properties.absolutecoordinates  (Optional) deprecated (since 2.3, use unitType instead) Specifies if the gradient is defined in absolute coordinates.
             * @param properties.spreadmethod  (Optional) Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
             * @param properties.unitType  (Optional) Type of coordinated used to define gradient
             * @param properties.transformation  (Optional) Gradient transformation
             */
            setProperties(properties?: any | { stoppoints?: any[]; absolutecoordinates?: boolean; spreadmethod?: geotoolkit.attributes.GradientStyle.SpreadMethods|string; unitType?: geotoolkit.attributes.GradientStyle.GradientUnits|string; transformation?: geotoolkit.util.Transformation; } ): this;
            /**
             * Removes points that are identical, leaving only one
             */
            cleanDuplicatePoints(): this;
        }
        /**
         * Defines a linear gradient fill style to provide smooth transitions between two or more specified colors.
         */
        class LinearGradientStyle extends geotoolkit.attributes.GradientStyle {
            /**
             * Defines a linear gradient fill style to provide smooth transitions between two or more specified colors.
             * @param startColor  (Optional) start color in CSS format or JSON with parameters
             * @param startColor.startcolor  (Optional) start color in CSS format
             * @param startColor.endcolor  (Optional) end color in CSS format
             * @param startColor.startpoint  (Optional) start point of gradient in relative form, 0-1 or absolute coordinates
             * @param startColor.endpoint  (Optional) end point of gradient in relative form, 0-1 or absolute coordinates
             * @param startColor.colorprovider  (Optional) colorProvider
             * @param startColor.spreadmethod  (Optional) Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
             * @param startColor.unitType  (Optional) Type of coordinated used to define gradient
             * @param startColor.transformation  (Optional) Gradient transformation
             * @param endColor  (Optional) end color in CSS format
             * @param startPoint  (Optional) start point of gradient in relative form, 0-1 or absolute coordinates
             * @param endPoint  (Optional) end point of gradient in relative form, 0-1 or absolute coordinates
             * @param colorProvider  (Optional) colorProvider
             * @param spreadMethod  (Optional) Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
             * @param unitType  (Optional) Type of coordinated used to define gradient
             * @param transformation  (Optional) Gradient transformation
             */
            constructor(startColor?: string|any | { startcolor?: string; endcolor?: string; startpoint?: geotoolkit.util.Point; endpoint?: geotoolkit.util.Point; colorprovider?: geotoolkit.util.ColorProvider; spreadmethod?: geotoolkit.attributes.GradientStyle.SpreadMethods|string; unitType?: geotoolkit.attributes.GradientStyle.GradientUnits|string; transformation?: geotoolkit.util.Transformation; } , endColor?: string, startPoint?: geotoolkit.util.Point, endPoint?: geotoolkit.util.Point, colorProvider?: geotoolkit.util.ColorProvider, spreadMethod?: geotoolkit.attributes.GradientStyle.SpreadMethods|string, unitType?: geotoolkit.attributes.GradientStyle.GradientUnits|string, transformation?: geotoolkit.util.Transformation);
            /**
             * Set start point from 0 to 1
             * @param p  (Required) start point
             */
            setStartPoint(p: geotoolkit.util.Point): this;
            /**
             * Return start point from 0 to 1
             */
            getStartPoint(): geotoolkit.util.Point;
            /**
             * Set end point from 0 to 1
             * @param p  (Required) end point
             */
            setEndPoint(p: geotoolkit.util.Point): this;
            /**
             * Return end point from 0 to 1
             */
            getEndPoint(): geotoolkit.util.Point;
            /**
             * Sets start color
             * @param color  (Required) color to set
             */
            setStartColor(color: string): this;
            /**
             * Returns start color
             */
            getStartColor(): string;
            /**
             * Sets end color
             * @param color  (Required) color to set in CSS format
             */
            setEndColor(color: string): this;
            /**
             * Returns end color
             */
            getEndColor(): string;
            /**
             * Return type of the style.
             */
            getStyleType(): string;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.startcolor  (Optional) start color in CSS format
             * @param properties.endcolor  (Optional) end color in CSS format
             * @param properties.startpoint  (Optional) start point of gradient in relative form, 0-1 or absolute coordinates
             * @param properties.endpoint  (Optional) end point of gradient in relative form, 0-1 or absolute coordinates
             */
            setProperties(properties: any | { startcolor?: string; endcolor?: string; startpoint?: geotoolkit.util.Point; endpoint?: geotoolkit.util.Point; } ): this;
            /**
             * Returns a new instance of geotoolkit.attributes.Raster
             * @param xMin  (Optional) x Min position to get color
             * @param yMin  (Optional) y Min position to get color
             * @param xMax  (Optional) x Max position to get color
             * @param yMax  (Optional) y Max position to get color
             */
            getRaster(xMin?: number, yMin?: number, xMax?: number, yMax?: number): geotoolkit.attributes.Raster;
        }
        /**
         * Defines a radial gradient fill style, which represents a gradient of colors along of cone between two circles.<br>
         * Radial gradients are defined with relative numbers from 0-1 describing the inner and outer circles. radius values are percentages of the shape's radius
         */
        class RadialGradientStyle extends geotoolkit.attributes.GradientStyle {
            /**
             * Defines a radial gradient fill style, which represents a gradient of colors along of cone between two circles.<br>
             * Radial gradients are defined with relative numbers from 0-1 describing the inner and outer circles. radius values are percentages of the shape's radius
             * @param startColor  (Optional) start color in CSS format
             * @param startColor.endcolor  (Optional) end color in CSS format
             * @param startColor.innercenter  (Optional) centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
             * @param startColor.outercenter  (Optional) centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
             * @param startColor.innerradius  (Optional) radius of inner circle in relative form, 0-1 or absolute coordinates
             * @param startColor.outerradius  (Optional) radius of outer circle of gradient from 0-1 or absolute coordinates
             * @param startColor.transformation  (Optional) Gradient transformation
             * @param startColor.unitType  (Optional) Type of coordinated used to define gradient
             * @param endColor  (Optional) end color in CSS format
             * @param innerCenter  (Optional) centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
             * @param outerCenter  (Optional) centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
             * @param innerRadius  (Optional) radius of inner circle in relative form, 0-1 or absolute coordinates
             * @param outerRadius  (Optional) radius of outer circle of gradient from 0-1 or absolute coordinates
             * @param transformation  (Optional) Gradient transformation
             * @param unitType  (Optional) Type of coordinated used to define gradient
             */
            constructor(startColor?: string|any | { endcolor?: string; innercenter?: geotoolkit.util.Point; outercenter?: geotoolkit.util.Point; innerradius?: number; outerradius?: number; transformation?: geotoolkit.util.Transformation; unitType?: geotoolkit.attributes.GradientStyle.GradientUnits|string; } , endColor?: string, innerCenter?: geotoolkit.util.Point, outerCenter?: geotoolkit.util.Point, innerRadius?: number, outerRadius?: number, transformation?: geotoolkit.util.Transformation, unitType?: geotoolkit.attributes.GradientStyle.GradientUnits|string);
            /**
             * Set inner centerpoint in relative terms
             * @param p  (Required) point defining center of inner circle
             */
            setInnerCenter(p: geotoolkit.util.Point): this;
            /**
             * Get the center of the inner circle
             */
            getInnerCenter(): geotoolkit.util.Point;
            /**
             * Set end point from 0 to 1
             * @param p  (Required) end point
             */
            setOuterCenter(p: geotoolkit.util.Point): this;
            /**
             * Return start center in relative coordinates from 0 to 1
             */
            getOuterCenter(): geotoolkit.util.Point;
            /**
             * Set end point from 0 to 1
             * @param r  (Required) radius of outer circle of gradient from 0-1
             */
            setOuterRadius(r: number): this;
            /**
             * Return start point from 0 to 1
             */
            getOuterRadius(): number;
            /**
             * @param r  (Required) Radius of inner circle
             */
            setInnerRadius(r: number): this;
            /**
             */
            getInnerRadius(): number;
            /**
             * Sets start color
             * @param color  (Required) color to set
             */
            setStartColor(color: string): this;
            /**
             * Returns start color
             */
            getStartColor(): string;
            /**
             * Sets end color
             * @param color  (Required) color to set in CSS format
             */
            setEndColor(color: string): this;
            /**
             * Returns end color
             */
            getEndColor(): string;
            /**
             * Return type of the style.
             */
            getStyleType(): string;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.startcolor  (Optional) start color in CSS format
             * @param properties.endcolor  (Optional) end color in CSS format
             * @param properties.innercenter  (Optional) centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
             * @param properties.outercenter  (Optional) centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
             * @param properties.innerradius  (Optional) radius of inner circle in relative form, 0-1 or absolute coordinates
             * @param properties.outerradius  (Optional) radius of outer circle of gradient from 0-1 or absolute coordinates
             */
            setProperties(properties: any | { startcolor?: string; endcolor?: string; innercenter?: geotoolkit.util.Point; outercenter?: geotoolkit.util.Point; innerradius?: number; outerradius?: number; } ): this;
        }
        /**
         * Defines an elliptical gradient fill style.
         */
        class EllipticalGradientStyle extends geotoolkit.attributes.GradientStyle {
            /**
             * Defines an elliptical gradient fill style.
             * @param startColor  (Optional) start color in CSS format
             * @param endColor  (Optional) end color in CSS format
             * @param innerCenter  (Optional) centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
             * @param outerCenter  (Optional) centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
             * @param innerRadius  (Optional) radius of inner circle in relative form, 0-1 or absolute coordinates
             * @param outerRadius  (Optional) radius of outer circle of gradient from 0-1 or absolute coordinates
             * @param yScale  (Optional) height to width ratio of ellipse.
             * @param options  (Optional) options pertaining to the fill style
             * @param options.startcolor  (Optional) start color in CSS format
             * @param options.endcolor  (Optional) end color in CSS format
             * @param options.innercenter  (Optional) centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
             * @param options.outercenter  (Optional) centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
             * @param options.innerradius  (Optional) radius of inner circle in relative form, 0-1 or absolute coordinates
             * @param options.outerradius  (Optional) radius of outer circle of gradient from 0-1 or absolute coordinates
             * @param options.yscale  (Optional) height to width ratio of ellipse.
             */
            constructor(startColor?: string, endColor?: string, innerCenter?: geotoolkit.util.Point, outerCenter?: geotoolkit.util.Point, innerRadius?: number, outerRadius?: number, yScale?: number, options?: any | { startcolor?: string; endcolor?: string; innercenter?: geotoolkit.util.Point; outercenter?: geotoolkit.util.Point; innerradius?: number; outerradius?: number; yscale?: number; } );
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.attributes.EllipticalGradientStyle): any;
            /**
             * Set inner centerpoint in relative terms
             * @param p  (Required) point defining center of inner circle
             */
            setInnerCenter(p: geotoolkit.util.Point): this;
            /**
             * Get the center of the inner circle
             */
            getInnerCenter(): geotoolkit.util.Point;
            /**
             * Set outer center point
             * @param p  (Required) point defining center of outer circle
             */
            setOuterCenter(p: geotoolkit.util.Point): this;
            /**
             * Return start center in relative coordinates from 0 to 1
             */
            getOuterCenter(): geotoolkit.util.Point;
            /**
             * Set outer radius from 0 to 1
             * @param r  (Required) radius of outer circle in relative form 0-1
             */
            setOuterRadius(r: number): this;
            /**
             * Return outer circle radius from 0 to 1
             */
            getOuterRadius(): number;
            /**
             * Set the inner circle radius from 0 to 1
             * @param r  (Required) Radius of inner circle
             */
            setInnerRadius(r: number): this;
            /**
             * Get the inner circle radius
             */
            getInnerRadius(): number;
            /**
             * Sets start color
             * @param color  (Required) color to set
             */
            setStartColor(color: string): this;
            /**
             * Get height to width ratio of ellipse
             */
            getYScale(): number;
            /**
             * Set height to width ratio of ellipse
             * @param yScale  (Required) the ratio of y to x axis in the gradient
             */
            setYScale(yScale: number): this;
            /**
             * Returns start color
             */
            getStartColor(): string;
            /**
             * Sets end color
             * @param color  (Required) color to set in CSS format
             */
            setEndColor(color: string): this;
            /**
             * Returns end color
             */
            getEndColor(): string;
            /**
             * Return type of the style.
             */
            getStyleType(): string;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.innerRadius  (Optional) radius of inner circle in relative form, 0-1 or absolute coordinates
             * @param properties.innerCenter  (Optional) centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
             * @param properties.outerCenter  (Optional) centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
             * @param properties.outerRadius  (Optional) radius of outer circle of gradient from 0-1 or absolute coordinates
             * @param properties.startColor  (Optional) start color in CSS format
             * @param properties.endColor  (Optional) end color in CSS format
             * @param properties.yScale  (Optional) height to width ratio of ellipse
             */
            setProperties(properties: any | { innerRadius?: number; innerCenter?: geotoolkit.util.Point; outerCenter?: geotoolkit.util.Point; outerRadius?: number; startColor?: string; endColor?: string; yScale?: number; } ): this;
        }
        /**
         * Service to provide patterns
         */
        class PatternService {
            /**
             * Service to provide patterns
             * @param name  (Required) name of the container of patterns
             */
            constructor(name: string);
            /**
             * Returns this pattern service name
             */
            getName(): string;
            /**
             * Returns all image patterns contained in this service
             */
            getPatterns(): geotoolkit.attributes.ImagePattern[];
            /**
             * Adds pattern alias
             * @param base  (Required) original pattern name
             * @param alias  (Required) name(s) of the original name
             */
            addAlias(base: string, alias: string|string[]): any;
            /**
             * Returns the pattern of specific name
             * @param name  (Required) of the pattern
             */
            getPattern(name: string): geotoolkit.attributes.Pattern;
            /**
             * Returns a promise which gets all the patterns
             */
            getAll(): geotoolkit.util.Promise;
            /**
             * Return the list of pattern names
             */
            getNames(): string[];
            /**
             * Return a promise which gets data urls of all patterns
             */
            getDataURLs(): geotoolkit.util.Promise;
            /**
             * Returns a promise which gets width of all patterns
             */
            getWidths(): geotoolkit.util.Promise;
            /**
             * Returns a promise which gets height of all patterns
             */
            getHeights(): geotoolkit.util.Promise;
            /**
             * Adds a new pattern with the specified pattern image.
             * note: if the pattern already exist it will override it.
             * This method specifies pattern name and container for registered pattern
             * @param name  (Required) name of the pattern
             * @param pattern  (Required) pattern object or image url
             */
            add(name: string, pattern: geotoolkit.attributes.Pattern|string): any;
            /**
             * Removes a pattern from this service
             * @param name  (Required) name of the pattern
             */
            remove(name: string): any;
            /**
             * Removes a pattern alias
             * @param alias  (Required) name
             */
            removeAlias(alias: string): any;
            /**
             * Removes all aliases
             */
            clearAliases(): any;
            /**
             * Removes all patterns and aliases
             */
            clear(): any;
        }
        /**
         * Defines style to be used as model clipping style.
         */
        class ClipStyle extends geotoolkit.attributes.Style {
            /**
             * Defines style to be used as model clipping style.
             * @param geometry  (Optional) clipping geometry or options object
             * @param geometry.geometry  (Optional) clipping geometry
             * @param geometry.evenodd  (Optional) true if evenodd mode is on ('nonzero' mode otherwise)
             * @param evenodd  (Optional) true if evenodd mode is on ('nonzero' mode otherwise)
             */
            constructor(geometry?: geotoolkit.renderer.GraphicsPath|any | { geometry?: geotoolkit.renderer.GraphicsPath; evenodd?: boolean; } , evenodd?: boolean);
            /**
             * Return clone object
             */
            clone(): geotoolkit.attributes.ClipStyle;
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.attributes.ClipStyle): any;
            /**
             * Sets clipping geometry
             * @param geometry  (Required) region or area
             */
            setGeometry(geometry: geotoolkit.renderer.GraphicsPath): this;
            /**
             * Gets clipping geometry
             */
            getGeometry(): geotoolkit.renderer.GraphicsPath;
            /**
             * Sets evenodd clipping mode
             * @param bool  (Required) true if evenodd mode is on
             */
            setEvenOdd(bool: boolean): this;
            /**
             * Returns true if evenodd clipping mode is on
             */
            getEvenOdd(): boolean;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.geometry  (Optional) clipping geometry
             * @param properties.evenodd  (Optional) true if evenodd mode is on ('nonzero' mode otherwise)
             */
            setProperties(properties: any | { geometry?: geotoolkit.renderer.GraphicsPath; evenodd?: boolean; } ): this;
            /**
             * Create or get clipping style from object
             * @param object  (Optional) object can be in format of constructor ofgeotoolkit.attributes.ClipStyle
             */
            static fromObject(object?: any|geotoolkit.attributes.ClipStyle): geotoolkit.attributes.ClipStyle;
        }
        /**
         * Defines properties of transition animation. Its transition duration, easing function and array of animated properties
         */
        class AnimationStyle extends geotoolkit.attributes.Style {
            /**
             * Defines properties of transition animation. Its transition duration, easing function and array of animated properties
             * @param effects  (Required) Please refer to geotoolkit.animation.effects.AbstractEffect properties
             */
            constructor(effects: any[]);
            /**
             * Type of state changes
             */
            static Events: any;
            /**
             * Returns true if animation is active
             */
            isActive(): boolean;
            /**
             * Makes effect active when an event occurs
             * @param id  (Required) event id. See {@link https://www.w3.org/TR/SVG/animate.html#BeginValueSyntax} for details
             */
            activateEffects(id: string): any;
        }
        /**
         * Define an object which can return Raster
         */
        interface IRasterable {
            /**
             * Returns a new instance of geotoolkit.attributes.Raster
             * @param xMin  (Optional) x Min position to get color
             * @param yMin  (Optional) y Min position to get color
             * @param xMax  (Optional) x Max position to get color
             * @param yMax  (Optional) y Max position to get color
             */
            getRaster(xMin?: number, yMin?: number, xMax?: number, yMax?: number): geotoolkit.attributes.Raster;
        }
        module LineStyle {
            /**
             * Enum of line style patterns
             */
            interface Patterns {
                /**
                 * Solid line
                 */
                Solid: any;
                /**
                 * Line with long dashes
                 */
                Dash: number[];
                /**
                 * Small dots continuously
                 */
                Dot: number[];
                /**
                 * Dash followed by dot
                 */
                DashDot: number[];
                /**
                 * Short Dashes
                 */
                ShortDash: number[];
                /**
                 * Very long dashes
                 */
                LongDash: number[];
                /**
                 * Dash followed by two dots
                 */
                DashDotDot: number[];
                /**
                 * Dash followed by long dash
                 */
                DashLongDash: number[];
            }
            /**
             * Enum of line join
             */
            interface JoinStyle {
                /**
                 * Angular
                 */
                Miter: string;
                /**
                 * Rounded
                 */
                Round: string;
                /**
                 * Bevelled
                 */
                Bevel: string;
            }
            /**
             * Enum of line join
             */
            interface CapStyle {
                /**
                 * Short Angular
                 */
                Butt: string;
                /**
                 * Rounded
                 */
                Round: string;
                /**
                 * Long Angular
                 */
                Square: string;
            }
        }
        module TextStyle {
            /**
             * Enum of base line
             */
            interface BaseLineStyle {
                /**
                 * Alphabetic (Default)
                 */
                Alphabetic: string;
                /**
                 * Top
                 */
                Top: string;
                /**
                 * Hanging
                 */
                Hanging: string;
                /**
                 * Middle
                 */
                Middle: string;
                /**
                 * Ideographic
                 */
                Ideographic: string;
                /**
                 * Bottom
                 */
                Bottom: string;
            }
            /**
             * Enum of alignment
             */
            interface AlignmentStyle {
                /**
                 * Start
                 */
                Start: string;
                /**
                 * End
                 */
                End: string;
                /**
                 * Left (Default)
                 */
                Left: string;
                /**
                 * Center
                 */
                Center: string;
                /**
                 * Right
                 */
                Right: string;
            }
        }
        module GradientStyle {
            /**
             * Enum for gradient Spread methods
             */
            interface SpreadMethods {
                /**
                 * Reflect
                 */
                Reflect: string;
                /**
                 * Repeat
                 */
                Repeat: string;
                /**
                 * Pad
                 */
                Pad: string;
            }
            /**
             * Enum for gradient units
             */
            interface GradientUnits {
                /**
                 * Absolute Coordinates
                 */
                AbsoluteCoordinates: string;
                /**
                 * Object Bounding Box
                 */
                ObjectBoundingBox: string;
                /**
                 * User Space On Use
                 */
                UserSpaceOnUse: string;
            }
        }
        module AnimationStyle {
            /**
             * Type of state changes
             */
            interface Events {
                /**
                 * Animation starts
                 */
                AnimationBegin: string;
                /**
                 * Animation ends
                 */
                AnimationEnd: string;
            }
        }
    }
    module persistence {
        /**
         * The serialization context
         */
        class SerializationContext {
            /**
             * The serialization context
             */
            constructor();
            /**
             * Adds the specified value with name "name" to the current context
             * @param name  (Required) unique property name
             * @param value  (Required) object value
             */
            addValue(name: string, value: any): any;
            /**
             * Adds child element with the specified name and optional type to the current context.
             * Unlike "setObject", this method creates a child node to store the object.
             * @param name  (Required) unique property name
             * @param object  (Required) object to be serialized
             * @param type  (Optional) the optional serialization type
             */
            addObject(name: string, object: any, type?: string): this;
            /**
             * Sets value to the current context (no child nodes for the value will be created in current context)
             * @param value  (Required) object value
             */
            setValue(value: any): this;
            /**
             * Sets object to the current context (no child nodes for the object will be created in current context)
             * @param value  (Required) object value
             * @param type  (Optional) the optional serialization type
             */
            setObject(value: any, type?: string): this;
            /**
             * Create child element in the current context
             * @param name  (Required) unique property name
             * @param type  (Optional) type of the object
             */
            createChild(name: string, type?: string): this;
            /**
             * Get reference id for the specified object. Null as return value means that the object
             * was not saved before
             * @param object  (Required) object value
             */
            getReferenceId(object: any): string|number|any;
            /**
             * Add reference to the object
             * @param object  (Required) object to get reference
             */
            addReference(object: any): string|number;
            /**
             * Get registry of memento serializers
             */
            getRegistry(): geotoolkit.persistence.Registry;
            /**
             * Commit changes
             */
            commit(): any;
        }
        /**
         * The deserialization context
         */
        class DeserializationContext {
            /**
             * The deserialization context
             */
            constructor();
            /**
             * Get value
             * @param name  (Required) name of the property
             */
            getValue(name: string): any;
            /**
             * Get object
             * @param type  (Required) type of the object
             * @param name  (Required) name of the property
             */
            getObject(type: string, name: string): any;
            /**
             * Request object
             * @param id  (Required) unique id of the object
             * @param callback  (Required) function contains parameter object that can be requested
             */
            requestObject(id: string, callback: Function): any;
            /**
             * Enumerate each child property
             * @param callback  (Required) function called by each object child
             * @param propertyName  (Optional) optional property name
             */
            queryChildren(callback: Function, propertyName?: string): any;
            /**
             * Get object by reference
             * @param id  (Required) reference id
             */
            getReference(id: string): any;
            /**
             * Register instance of the object
             * @param id  (Required) unique id of the object
             * @param object  (Required) instance of the deserialised class
             */
            addReference(id: string, object: any): any;
            /**
             * Get registry of memento deserializers
             */
            getRegistry(): geotoolkit.persistence.Registry;
            /**
             * Push the current deserialized object. This method can be used if it is necessary to
             * provide the existing object for deserialization
             * @param object  (Required) instance of the deserialised class
             */
            pushCurrentObject(object: any): any;
            /**
             * Pop the current object from the stack
             */
            popCurrentObject(): any;
            /**
             * Return the current object on the stack
             */
            getCurrentObject(): any;
        }
        /**
         * The serialization context to Memento
         */
        class MementoSerializationContext extends geotoolkit.persistence.SerializationContext {
            /**
             * The serialization context to Memento
             */
            constructor();
            /**
             * Commits changes
             */
            commit(): any;
            /**
             * Gets a result of the serialization to memento
             */
            getMemento(): any;
        }
        /**
         * The deserialization context to Memento
         */
        class MementoDeserializationContext extends geotoolkit.persistence.DeserializationContext {
            /**
             * The deserialization context to Memento
             */
            constructor();
            /**
             * Get value
             * @param name  (Required) name of the property
             * @param type  (Optional) optional type
             */
            getValue(name: string, type?: string): any|any;
            /**
             * Gets object. This method is for compatibility with Viewer only
             * @param type  (Required) type of the object
             * @param name  (Required) name of the property
             */
            getObject(type: string, name: string): any;
            /**
             * Request value
             * @param id  (Required) unique id of the object
             * @param callback  (Required) function contains parameter object that can be requested
             */
            requestObject(id: string, callback: Function): any;
            /**
             * Set object reference
             * @param id  (Required) of the property
             * @param reference  (Required) of the property
             */
            addReference(id: string, reference: any): any;
            /**
             * Get object
             * @param id  (Required) of the property
             */
            getReference(id: string): any;
            /**
             * Enumerate each child property
             * @param callback  (Required) function called by each child
             * @param propertyName  (Optional) optional property name
             */
            queryChildren(callback: Function, propertyName?: string): any;
            /**
             * Get registry of memento serializers
             */
            getRegistry(): geotoolkit.persistence.Registry;
            /**
             * Push the current deserialized object. This method can be used if it is necessary to
             * provide the existing object for deserialization
             * @param object  (Required) instance of the deserialised class
             */
            pushCurrentObject(object: any): any;
            /**
             * Pop the current object from the stack
             */
            popCurrentObject(): any;
            /**
             * Return the current object on the stack
             */
            getCurrentObject(): any;
        }
        /**
         * The abstract serializer
         */
        class ObjectSerializer {
            /**
             * The abstract serializer
             */
            constructor();
            /**
             * Save object to context
             * @param object  (Required) object to save
             * @param context  (Required) context to save
             */
            save(object: any, context: any): any;
            /**
             * Load object from context
             * @param context  (Required) context to save
             * @param object  (Optional) object save properties
             */
            load(context: any, object?: any): any;
        }
        /**
         * The implementation fo the default serializer registry
         */
        class Registry {
            /**
             * The implementation fo the default serializer registry
             */
            constructor();
            /**
             * Return instance of the default registry
             */
            static getInstance(): geotoolkit.persistence.Registry;
            /**
             * Add serializer
             * @param type  (Required) type of the serializer
             * @param serializer  (Required) serializer
             */
            addSerializer(type: string, serializer: any): any;
            /**
             * Remove serializer
             * @param type  (Required) type of the serializer
             */
            removeSerializer(type: string): any;
            /**
             * Return serializer for the specified type
             * @param type  (Required) serializer for the specified type
             */
            getSerializer(type: string|any): any;
        }
        /**
         * The JsonSerializer class exposes the trivial serialization functions from a
         * JavaScript object to JSON and back
         */
        class JsonSerializer {
            /**
             * The JsonSerializer class exposes the trivial serialization functions from a
             * JavaScript object to JSON and back
             * @param registry  (Required) registry of serializers
             */
            constructor(registry: geotoolkit.persistence.Registry);
            /**
             * Serializes an object to a JSON string
             * @param name  (Required) the name of the object or the object to mementoize
             * @param value  (Optional) The value to mementoize
             * @param source  (Optional) the source project to add property
             */
            serialize(name: string|any, value?: any, source?: any): string;
            /**
             * Deserializes a JSON string to the original object
             * @param str  (Required) text to be deserialised
             */
            deserialize(str: string): geotoolkit.persistence.MementoDeserializationContext;
        }
        /**
         * The serialization context to XML
         */
        class XmlSerializationContext extends geotoolkit.persistence.SerializationContext {
            /**
             * The serialization context to XML
             */
            constructor();
            /**
             * Commit changes
             */
            commit(): any;
            /**
             * Return a result of the  serialization to Node
             */
            getNode(): any;
        }
        /**
         * The deserialization context from XML
         */
        class XmlDeserializationContext extends geotoolkit.persistence.DeserializationContext {
            /**
             * The deserialization context from XML
             */
            constructor();
            /**
             * Get value
             * @param name  (Required) unique property name
             * @param type  (Optional) optional type
             */
            getValue(name: string, type?: string): any;
            /**
             * Gets object. This method is for compatibility with Viewer only
             * @param type  (Required) type of the object
             * @param name  (Required) name of the property
             */
            getObject(type: string, name: string): any;
            /**
             * Request value
             * @param id  (Required) unique id of the object
             * @param callback  (Required) function contains parameter object that can be requested
             */
            requestObject(id: string, callback: Function): any;
            /**
             * Add reference
             * @param id  (Required) unique id for the object
             * @param reference  (Required) reference to the object to be connected to current id
             */
            addReference(id: string, reference: any): any;
            /**
             * Get reference to object
             * @param id  (Required) unique object id
             */
            getReference(id: string): any;
            /**
             * Enumerate each child property
             * @param callback  (Required) called by each child
             * @param propertyName  (Optional) optional property name
             */
            queryChildren(callback: Function, propertyName?: string): any;
            /**
             * Get registry of memento serializers
             */
            getRegistry(): geotoolkit.persistence.Registry;
            /**
             * Push the current deserialized object. This method can be used if it is necessary to
             * provide the existing object for deserialization
             * @param object  (Required) current deserialized object
             */
            pushCurrentObject(object: any): any;
            /**
             * Pop the current object from the stack
             */
            popCurrentObject(): any;
            /**
             * Return the current object on the stack
             */
            getCurrentObject(): any;
        }
        /**
         * The XmlSerializer class exposes the trivial serialization functions from a JavaScript object to
         * XML
         */
        class XmlSerializer {
            /**
             * The XmlSerializer class exposes the trivial serialization functions from a JavaScript object to
             * XML
             * @param registry  (Required) registry of serializers
             */
            constructor(registry: geotoolkit.persistence.Registry);
            /**
             * Serialize data
             * @param name  (Required) property name
             * @param value  (Required) object value
             */
            serialize(name: string, value: any): string;
            /**
             * Deserialize data
             * @param data  (Required) text to be deserialized
             */
            deserialize(data: string|Node): any;
        }
    }
    module responsive {
        /**
         * Defines behavior of responsive nodes.
         */
        class ResponsiveStyle extends geotoolkit.attributes.Style {
            /**
             * Defines behavior of responsive nodes.
             * @param options  (Optional) options
             * @param options.start  (Optional) start applying options
             * @param options.end  (Optional) end applying options
             * @param options.target  (Optional) optional target to apply styles
             * @param options.events  (Optional) events to apply responsive style
             * @param options.rules  (Optional) an array of rules {@link geotoolkit.responsive.ResponsiveStyle~Rule}
             */
            constructor(options?: any | { start?: Function; end?: Function; target?: geotoolkit.scene.Node; events?: string[]; rules?: geotoolkit.responsive.ResponsiveStyle.Rule[]|any[]|geotoolkit.responsive.ResponsiveStyle.Rule|any; } );
            /**
             * copy constructor
             * @param src  (Required) Source to copy from
             */
            protected copyConstructor(src: geotoolkit.responsive.ResponsiveStyle): any;
            /**
             * Check if style should be applied for the current event
             * @param event  (Required) event to check
             */
            supportsEvent(event: string): boolean;
            /**
             * Return a source of events
             */
            getSource(): geotoolkit.scene.Node;
            /**
             * Gets all the properties pertaining to this object
             */
            getProperties(): {result:{rules:geotoolkit.responsive.ResponsiveStyle.Rule[]|any[]}}|any;
            /**
             * Apply rules for the current node
             * @param node  (Required) current instance of the node
             */
            apply(node: geotoolkit.scene.Node): any;
            /**
             * Sets all the properties pertaining to this object
             * @param properties  (Required) An object containing the properties to set
             * @param properties.rules  (Optional) an array of rules {@link geotoolkit.responsive.ResponsiveStyle~Rule}
             * @param properties.events  (Optional) events
             */
            setProperties(properties: any | { rules?: geotoolkit.responsive.ResponsiveStyle.Rule[]; events?: geotoolkit.scene.Node.Events[]; } ): this;
            /**
             * Create or get responsive style from object
             * @param object  (Optional) object can be in format of constructor
geotoolkit.responsive.ResponsiveStyle
             */
            static fromObject(object?: any|geotoolkit.responsive.ResponsiveStyle): geotoolkit.responsive.ResponsiveStyle;
        }
        module ResponsiveStyle {
            /**
             * The rule definition.
             */
            type Rule = any;

        }
    }
    module css {
        /**
         * Defines a CSS style which has a set of css rules to be applied for a node and all children.
         * This CSS wrapper class can parse css given as a String.<br>
         * <b>CSS Styles Tutorial</b> in CarnacJS shows how CSS Styles can be applied.
         */
        class CssStyle extends geotoolkit.attributes.Style {
            /**
             * Defines a CSS style which has a set of css rules to be applied for a node and all children.
             * This CSS wrapper class can parse css given as a String.<br>
             * <b>CSS Styles Tutorial</b> in CarnacJS shows how CSS Styles can be applied.
             * @param options  (Optional) Object containing css and additional properties or the CSS string
             * @param options.css  (Optional) css The css string to parse or object with selector and properties or array
of objects with selector and properties
             * @param options.css.selector  (Optional) selector of CSS
             * @param options.css.properties  (Optional) properties to apply
             * @param options.registry  (Optional) registry of serializers for declaration blocks
             */
            constructor(options?: any | { css?: string|any | { selector?: string; properties?: any; } |any[]; registry?: geotoolkit.persistence.Registry; } |string);
            /**
             * Return the current CSS properties
             */
            getCss(): any|string;
            /**
             * Return clone object
             */
            clone(): geotoolkit.css.CssStyle;
            /**
             * Apply CSS for the current node
             * @param node  (Required) current instance of the node
             */
            apply(node: geotoolkit.scene.Node|geotoolkit.scene.Node[]): this;
            /**
             * Return a state of node and selected children before applying style
             * @param node  (Optional) node to apply selectors
             */
            getState(node?: any): any;
            /**
             * Create or get css style from object
             * @param object  (Optional) object can be in format of constructor of geotoolkit.css.CssStyle
             */
            static fromObject(object?: string|any|geotoolkit.css.CssStyle): geotoolkit.css.CssStyle;
        }
        /**
         * Defines css Lexical unit
         */
        class LexicalUnit {
            /**
             * Defines css Lexical unit
             */
            constructor();
            /**
             * Gets an integer representing the type of CssLexeme
             * @param type  (Optional) 
             */
            getLexicalUnitType(type?: string): number;
            /**
             * Parses value passed into constructor
             * @param value  (Required) Value of the parameter
             * @param p  (Optional) Previous lexical unit
             */
            parseParameters(value: string, p?: geotoolkit.css.LexicalUnit): this;
            /**
             * Returns string representing dimension unit
             */
            getDimensionUnitText(): string;
            /**
             * Get number value
             */
            getNumberValue(): number;
            /**
             * Gets the next lexical unit, if present, otherwise null
             */
            getNextLexicalUnit(): this|any;
            /**
             * Gets the previous lexical unit, if present, otherwise null
             */
            getPreviousLexicalUnit(): this|any;
            /**
             * Gets the string representation of value
             * If the type is CSS_URI, the return value doesn't contain uri(....) or quotes.
             * If the type is CSS_ATTR, the return value doesn't contain attr(....).
             */
            getStringValue(): string;
        }
        /**
         * Defines utility class to support CSS parser.
         */
        class Parser {
            /**
             * Defines utility class to support CSS parser.
             * @param registry  (Required) registry of serializers for declaration blocks
             */
            constructor(registry: geotoolkit.persistence.Registry);
            /**
             * Parse CSS text
             * @param css  (Required) CSS text
             * @param options  (Required) custom options
             */
            static parse(css: string|any|any[], options: any): any;
            /**
             * Gets state of all selected objects from the current node
             * @param node  (Required) node to apply CSS rules
             * @param ast  (Required) abstract syntax tree
             * @param registry  (Optional) registry of serializer for declaration blocks
             */
            protected static getState(node: geotoolkit.scene.Node, ast: any, registry?: geotoolkit.persistence.Registry): any;
            /**
             * Apply CSS for the current object
             * @param node  (Required) node to apply CSS rules
             * @param ast  (Required) abstract syntax tree
             * @param registry  (Required) registry of serializers for declaration blocks
             */
            protected static applyAST(node: geotoolkit.scene.Node, ast: any, registry: geotoolkit.persistence.Registry): any;
            /**
             * Apply CSS for the current object
             * @param node  (Required) node to apply CSS rules
             * @param css  (Required) text
             */
            apply(node: geotoolkit.scene.Node, css: string): any;
            /**
             * Parses a css property value from a string
             * @param stringValue  (Required) The input string
             */
            parsePropertyValue(stringValue: string): any;
            /**
             * Parses a CSS style string
             * @param str  (Required) Css string
             */
            parseStyleString(str: string): any;
        }
    }
}
