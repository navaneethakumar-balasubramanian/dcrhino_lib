/**
 * @namespace
 */
geotoolkit = {};
    /**
     * Specify a reference to the dom element window.
     * @type {window}
     */
    geotoolkit.window = {};
    /**
     * Defines a namespace
     * @param {string} namespaceString namespace string
     * @param {function()} func the function
     */
    geotoolkit.namespace = function(namespaceString, func){};
    /**
     * expose class
     * @param {string} namespaceString strongly specified class name
     * @param {object} object object using the class
     * @returns {Object} reference to the object
     */
    geotoolkit.exposeClass = function(namespaceString, object){};
    /**
     * expose interface
     * @param {array} i interface
     */
    geotoolkit.exposeInterface = function(i){};
    /**
     * expose static method
     * @param {string} publicName public name of the method to expose
     * @param {function} target target
     * @param {string} name name of the method
     * @returns {Function}
     */
    geotoolkit.exposeStaticMethod = function(publicName, target, name){};
    /**
     * Exposes namespaces and objects using their public names.
     * Maintains a symbolsDictionary with public and obfuscated names.
     * It is an internal method and is used for obfuscation
     * @param {string} name name of the object to expose
     * @param {object} object object to expose
     * @param {object} objectToExportTo object to export to
     */
    geotoolkit.exportSymbol = function(name, object, objectToExportTo){};
    /**
     * This method is used if user uses advanced obfuscation libraries which has extension "adv.js". This method maps
     * non obfuscated class with obfuscated base class.
     * When inheriting from a class, this method needs to be called to change names of overridden methods
     * to the obfuscated name
     * @param {object} proto sub class
     * @param {object} inheritsfrom a base class to be inherited
     */
    geotoolkit.obfuscate = function(proto, inheritsfrom){};
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
     * @param {object} proto sub class
     * @param {object} inheritsfrom a base class to be inherited
     */
    geotoolkit.registerImplementation = function(proto, inheritsfrom){};
    /**
     * compile implementations
     * @param {boolean} apply compile implementations using the apply parameter.
     */
    geotoolkit.applyImplementations = function(apply){};
    /**
     * Sets resources
     * @param {string} moduleName module name
     * @param {string} resourceName resource name
     * @param {string|object} resource resource object
     */
    geotoolkit.setResource = function(moduleName, resourceName, resource){};
    /**
     * Return a resource for the current
     * module and resource name.
     * @param {string} moduleName current modeule
     * @param {string} resourceName resource name
     * @returns {string|object|null}
     */
    geotoolkit.getResource = function(moduleName, resourceName){};
    /**
     * It makes all objects, which belongs to namespace be available by alias name, which is returned.
     * @param {string} namespaceString namespace
     * @returns {*|window|window}
     */
    geotoolkit.using = function(namespaceString){};
    /**
     * Print in console log message. Passes on all parameters as passed.
     *
     * @param {...object} args a list of objects to output. The string representations of each of these objects are appended together in the order listed and output
     */
    geotoolkit.log = function(args){};
    /**
     * Print in console info message. Passes on all parameters as passed.
     *
     * @param {...object} args a list of objects to output. The string representations of each of these objects are appended together in the order listed and output
     */
    geotoolkit.info = function(args){};
    /**
     * Print in console warn message. Passes on all parameters as passed.
     *
     * @param {...object} args a list of objects to output. The string representations of each of these objects are appended together in the order listed and output
     */
    geotoolkit.warn = function(args){};
    /**
     * This method is used to merge properties of two objects from options to results
     *
     * @param {object} options an object to merge properties.
     * @param {object} result Object to merge properties from options. All properties from options are copied to result. If result contains property from options it is replaced. If result has a property and options doesn't have a property the property will be saved in result.
     * @param {boolean} [lowercase=false] merge all properties to lower case. if this flag is set then result will
     * have all properties in lower case
     * @param {boolean} [copyUndefinedOptions=false] copy input options with undefined values
     * @returns {object}
     */
    geotoolkit.mergeObjects = function(options, result, lowercase, copyUndefinedOptions){};
    /**
     * Deep merge object method is the same as mergeObject method , except it supports nested objects.
     * @param {object} options an object to merge properties.
     * @param {object} result Object to merge properties from options
     * @param {boolean} [lowercase=false] merge all properties to lower case. if this flag is set then result will
     * have all properties in lower case
     * @returns {object}
     */
    geotoolkit.deepMergeObject = function(options, result, lowercase){};
    /**
     * Copy options with values from source object, which exists in options only
     * @param {object} source source object
     * @param {object} options options to copy from source
     * @param {boolean} [lowercase=false] source and result properties to lower case. if this flag is set then result will
     * have all properties in lower case
     * @returns {?object} returns undefined if no options are match in the source
     */
    geotoolkit.copyOptions = function(source, options, lowercase){};
    /**
     * return true if the display has touchevents otherwise false
     * @returns {boolean}
     */
    geotoolkit.isTouchDevice = function(){};
    /**
     * Inherit the prototype methods from one constructor into another.
     * Based on the Closure Library
     *
     * @param {Function} childClass Child class.
     * @param {Function} parentClass Parent class.
     */
    geotoolkit.inherits = function(childClass, parentClass){};
    /**
     * call base type copy constructor
     * @param {object} obj to be initialized
     * @param {object} src data
     */
    geotoolkit.initializePrototype = function(obj, src){};
    /**
     * Return an object class name
     * @param {object} obj object to return a class name
     * @returns {string}
     */
    geotoolkit.getObjectClassName = function(obj){};
    /**
     * Create copy of the object
     * @param {object} obj object to copy
     * @param {object} [target = null] target
     * @param {object} [param = null] param to be passed to copy constructor
     * @returns {object} a copy of the input object
     */
    geotoolkit.createCopy = function(obj, target, param){};
    /**
     * Sets name of the class, which can be retrieved using method getClassName()
     * or toString()
     * @param {object} currentClass class
     * @param {string} className name of the class
     */
    geotoolkit.setClassName = function(currentClass, className){};
    /**
     * Accepts a collection of image URIs, will pass loaded images to the function
     * passed in as callback
     *
     * @param {object|Array<string>} sources
     * array or JSON of images to be loaded
     * @param {function()} callback
     * function to be called after all images are loaded
     * @param {string} [crossOrigin]
     crossOrigin value to be set
     * @deprecated since 2.6
     */
    geotoolkit.loadImages = function(sources, callback, crossOrigin){};
    /**
     * Gets absolute position of the HTMLElement in window coordinates.
     *
     * @param {HTMLElement} element html element to get the position for
     * @returns {object} result
     * @returns {number} result.x x coordinate for the element
     * @returns {number} result.y y coordinate for the element
     */
    geotoolkit.getAbsolutePosition = function(element){};
    /**
     * This method is used to mark a method, which does not have implementation. By default it throws exception that method is not implemented.
     * @example
     * MyClass.prototype.myMethod = geotoolkit.abstractMethod
     *
     * @throws {Error} when invoked to indicate the method should be overridden.
     */
    geotoolkit.abstractMethod = function(){};
    /**
     * Specifies a virtual method.<br>
     * MyClass.prototype.myMethod = geotoolkit.virtualMethod<br>
     *
     * by default it generates log message when invoked to indicate the method should be
     * overridden.
     */
    geotoolkit.virtualMethod = function(){};
    /**
     * Return the current version
     * @returns {string}
     */
    geotoolkit.getVersion = function(){};
    /**
     * Return the current version with full information
     * @returns {object}
     */
    geotoolkit.getFullVersion = function(){};
    /**
     * gets the properties of a parent of an object
     * @param {object} obj The object
     * @returns {*}
     */
    geotoolkit.getParentProperties = function(obj){};
    /**
     * sets the properties of a parent of an object
     * @param {object} obj The object
     * @param {object} properties The properties to set
     */
    geotoolkit.setParentProperties = function(obj, properties){};
    /**
     * Returns class constructor of the class, which is specified
     * as string with full namespace.
     * @param {string} className class name to get the type for
     * @returns {function()} constructor of the specified type
     */
    geotoolkit.getClassType = function(className){};
    /**
     * Return a base class name if it is exists
     * @param {string} className class name
     * @returns {string|null}
     */
    geotoolkit.getBaseClassName = function(className){};
    /**
     * Create instance of the class, which is specified as string with
     * full namespace. This class must have default constructor
     * @param {string} className class name to instantiate
     * @param {object} [options=null] optional parameters
     * @returns {object|null} instance of the specified type
     */
    geotoolkit.instantiateClass = function(className, options){};
    /**
     * Create a function from a string containing the function
     * @param {string} str string to unpack into a function
     * @returns {Function} func function created from string
     */
    geotoolkit.str2Function = function(str){};
    /**
     * Enables render using native resolution
     *
     * @param {boolean} enabled device pixel ratio is set based on this flag
     */
    geotoolkit.enableRenderNativeResolution = function(enabled){};
    /**
     * Returns pixel scale on current device
     *
     * @returns {number}
     */
    geotoolkit.getPixelScale = function(){};
    /**
     * Converts css size to canvas size
     *
     * @param {number} size canvas size
     * @returns {number}
     */
    geotoolkit.convertCssToCanvas = function(size){};
    /**
     * Converts object to object with properties in lower case
     * @param {object} object object to be processed
     * @returns {object} object new object (!not modified)
     */
    geotoolkit.toLowerCase = function(object){};
    /**
     * process object in order to return the same object with flat property names.
     *
     * @param {object} object object to be processed
     * @param {?boolean} [recursive] is recursive call flag
     * @returns {object}
     */
    geotoolkit.processObjectProperties = function(object, recursive){};
    /**
     * Declares "childClass" to implement "parentInterface"
     *
     * @param {!Function} childClass child class
     * @param {!Function} parentInterface parent interface
     */
    geotoolkit.implements = function(childClass, parentInterface){};
    /**
     * Requests "childClass" for "parentInterface" support
     *
     * @param {object} childInstance child class instance
     * @param {Function} parentInterface parent interface
     * @returns {?object} child class instance if "parentInterface" is implemented; <b>null</b> otherwise
     * @throws {Error} if parentInterface is not defined
     */
    geotoolkit.interfaceCast = function(childInstance, parentInterface){};
    /**
     * Check if instance is a parentClass or implements interface
     * @param {object} instance instance to check implementation
     * @param {Function} parentClass parent interface or class
     * @returns {boolean}
     */
    geotoolkit.isInstanceOf = function(instance, parentClass){};

/**
 * API containing all the utility classes like units, format colorproviders etc
 * @namespace
 */
geotoolkit.util = {};
    /**
     * load font into browser
     * @param {string} location font location
     * @param {string} family font family, must match to file name
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.util.loadFont = function(location, family){};
    /**
     * Enum of anchor types
     * @enum
     * @readonly
     */
    geotoolkit.util.AnchorType = {};
        /**
         * None
         * @type {number}
         */
        geotoolkit.util.AnchorType.None = NaN;
        /**
         * Top Left
         * @type {number}
         */
        geotoolkit.util.AnchorType.LeftTop = NaN;
        /**
         * Left Bottom
         * @type {number}
         */
        geotoolkit.util.AnchorType.LeftBottom = NaN;
        /**
         * Right Top
         * @type {number}
         */
        geotoolkit.util.AnchorType.RightTop = NaN;
        /**
         * Right Bottom
         * @type {number}
         */
        geotoolkit.util.AnchorType.RightBottom = NaN;
        /**
         * Center
         * @type {number}
         */
        geotoolkit.util.AnchorType.Center = NaN;
        /**
         * Left Center
         * @type {number}
         */
        geotoolkit.util.AnchorType.LeftCenter = NaN;
        /**
         * Bottom Center
         * @type {number}
         */
        geotoolkit.util.AnchorType.BottomCenter = NaN;
        /**
         * Right Center
         * @type {number}
         */
        geotoolkit.util.AnchorType.RightCenter = NaN;
        /**
         * Top Center
         * @type {number}
         */
        geotoolkit.util.AnchorType.TopCenter = NaN;
    /**
     * GeometryOreration. Specifies a type of operation to be applied for clipping
     *
     * @enum
     * @readonly
     */
    geotoolkit.util.GeometryOperation = {};
        /**
         * Replaces current area with new one
         * @type {string}
         */
        geotoolkit.util.GeometryOperation.Replace = "";
        /**
         * Intersects current area with new one
         * @type {string}
         */
        geotoolkit.util.GeometryOperation.Intersect = "";
    /**
     * Copyright: Copyright (c) 2013 by INT, Inc. All rights reserved.<br>
     * Company: INT, Inc. <br>
     * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.<br>
     */
    geotoolkit.util.Units = {};
    /**
     * Enum of orientations
     * @enum
     * @readonly
     */
    geotoolkit.util.Orientation = {};
        /**
         * Horizontal
         * @type {string}
         */
        geotoolkit.util.Orientation.Horizontal = "";
        /**
         * Vertical
         * @type {string}
         */
        geotoolkit.util.Orientation.Vertical = "";

/**
 * A namespace containing classes which work with stream
 * @namespace
 */
geotoolkit.util.stream = {};

/**
 * API containing classes for data representation used by Geotoolkit Widgets
 * @namespace
 */
geotoolkit.data = {};

/**
 * API containing classes for data gridding algorithms implementations
 * @namespace
 */
geotoolkit.gridding = {};

/**
 * API containing classes which work with css styles.
 * @namespace
 */
geotoolkit.css = {};

/**
 * API containing classes which control the attributes (visual properties) used while drawing carnac objects.
 * @namespace
 */
geotoolkit.attributes = {};

/**
 * API containing classes which work with rendering
 * @namespace
 */
geotoolkit.renderer = {};
    /**
     * ClipOperation. Specifies a type of operation to be applied for clipping using {@link geotoolkit.util.GeometryOperation}
     *
     * @enum
     * @readonly
     */
    geotoolkit.renderer.ClipOperation = {};
    /**
     * Create a new Pattern from a pattern and a specific foreground color
     *
     * @param {geotoolkit.attributes.ImagePattern} pattern image pattern
     * @param {string} foregroundColor foreground color to be set
     * @param {boolean} rawSize flag for raw size
     * @returns {string} image.dataURL
     */
    geotoolkit.renderer.createPattern = function(pattern, foregroundColor, rawSize){};
    /**
     * Create a new Pattern from a pattern and a specific foreground color
     *
     * @deprecated since 2.5, use createPattern instead
     * @param {geotoolkit.attributes.ImagePattern} pattern image pattern
     * @param {string} foregroundColor foreground color to be set
     * @param {boolean} rawSize flag for raw size
     * @returns {string} image.dataURL
     */
    geotoolkit.renderer.CreatePattern = {};

/**
 * API containing classes which perform layout operations to place any shape in the model coordinates of the parent.
 * @namespace
 */
geotoolkit.layout = {};
    /**
     * Define resize mode of the layoutable.
     * @readonly
     * @enum
     */
    geotoolkit.layout.SizeConstraint = {};
        /**
         * The layoutable item is not constrained.
         * @type {string}
         */
        geotoolkit.layout.SizeConstraint.NoConstraint = "";
        /**
         * The layoutable item returns preferred width and height from the layout manager
         * @type {string}
         */
        geotoolkit.layout.SizeConstraint.PreferredSize = "";
        /**
         * The layoutable item returns preferred width from the layout manager
         * @type {string}
         */
        geotoolkit.layout.SizeConstraint.PreferredWidth = "";
        /**
         * The layoutable item returns preferred height from the layout manager
         * @type {string}
         */
        geotoolkit.layout.SizeConstraint.PreferredHeight = "";
    /**
     * Enum of annotation locations
     * Supported values are:
     * North, South, East, West,
     * NorthWest, NorthEast, SouthWest, SouthEast,
     * Center, None
     * @enum
     * @readonly
     */
    geotoolkit.layout.AnnotationLocation = {};
        /**
         * West
         * @type {string}
         */
        geotoolkit.layout.AnnotationLocation.West = "";
        /**
         * North
         * @type {string}
         */
        geotoolkit.layout.AnnotationLocation.North = "";
        /**
         * East
         * @type {string}
         */
        geotoolkit.layout.AnnotationLocation.East = "";
        /**
         * South
         * @type {string}
         */
        geotoolkit.layout.AnnotationLocation.South = "";
        /**
         * NorthWest
         * @type {string}
         */
        geotoolkit.layout.AnnotationLocation.NorthWest = "";
        /**
         * NorthEast
         * @type {string}
         */
        geotoolkit.layout.AnnotationLocation.NorthEast = "";
        /**
         * SouthEast
         * @type {string}
         */
        geotoolkit.layout.AnnotationLocation.SouthEast = "";
        /**
         * SouthWest
         * @type {string}
         */
        geotoolkit.layout.AnnotationLocation.SouthWest = "";
        /**
         * None
         * @type {string}
         */
        geotoolkit.layout.AnnotationLocation.None = "";
        /**
         * Center
         * @type {string}
         */
        geotoolkit.layout.AnnotationLocation.Center = "";

/**
 * API to specify styles for responsive nodes
 * @namespace */
geotoolkit.responsive = {};

/**
 * API for animation
 * @namespace */
geotoolkit.animation = {};
    /**
     * Defines animation behavior after it just ended.
     * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#Fill}.
     * @enum
     * @readonly
     */
    geotoolkit.animation.AnimationFill = {};
        /**
         * The animation effect F(t) is defined to freeze the effect value at the last value of the active
         * duration. The animation effect is "frozen" for the remainder of the document duration (or until
         * the animation is restarted - see Restarting Animations).
         * @type {string}
         */
        geotoolkit.animation.AnimationFill.Freeze = "";
        /**
         * The animation effect is removed (no longer applied) when the active duration of the animation is
         * over. After the active end AE of the animation, the animation no longer affects the target (unless
         * the animation is restarted - see Restarting Animations).
         * This is the default value.
         * @type {string}
         */
        geotoolkit.animation.AnimationFill.Remove = "";
    /**
     * Defines effect's interpolation mode.
     * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#AnimFuncCalcMode}.
     * @enum
     * @readonly
     */
    geotoolkit.animation.CalcMode = {};
        /**
         * This specifies that the animation function will jump from one value to the next without any interpolation.
         * @type {string}
         */
        geotoolkit.animation.CalcMode.Discrete = "";
        /**
         * Simple linear interpolation between values is used to calculate the animation function. This is the default CalcMode.
         * @type {string}
         */
        geotoolkit.animation.CalcMode.Linear = "";
        /**
         * Defines interpolation to produce an even pace of change across the animation. This is only
         * supported for values that define a linear numeric range, and for which some notion of "distance"
         * between points can be calculated (e.g. position, width, height, etc.). If "paced" is specified, any
         * keyTimes or keySplines will be ignored.
         * @type {string}
         */
        geotoolkit.animation.CalcMode.Paced = "";
        /**
         * Interpolates from one value in the values list to the next according to a time function defined
         * by a cubic Bezier spline. The points of the spline are defined in the keyTimes attribute, and the
         * control points for each interval are defined in the keySplines attribute.
         * @type {string}
         */
        geotoolkit.animation.CalcMode.Spline = "";
    /**
     * Controls whether or not the animation is additive.
     * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#AdditiveAnim}.
     * @enum
     * @readonly
     */
    geotoolkit.animation.Additive = {};
        /**
         * Specifies that the animation will override the underlying value of the attribute and other lower priority animations.
         * This is the default, however the behavior is also affected by the animation value attributes by
         * and to, as described in {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#FromToByAndAdditive} SMIL Animation: How from, to and by attributes affect additive behavior</a>.
         * @type {string}
         */
        geotoolkit.animation.Additive.Replace = "";
        /**
         * Specifies that the animation will add to the underlying value of the attribute and other lower priority animations.
         * @type {string}
         */
        geotoolkit.animation.Additive.Sum = "";
    /**
     * Controls whether or not the animation is cumulative.
     * For more information see {@link http://www.w3.org/TR/2001/REC-smil-animation-20010904/#AccumulateAttribute}.
     * @enum
     * @readonly
     */
    geotoolkit.animation.Accumulate = {};
        /**
         * Specifies that repeat iterations are not cumulative. This is the default.
         * @type {string}
         */
        geotoolkit.animation.Accumulate.None = "";
        /**
         * Specifies that each repeat iteration after the first builds upon the last value of the previous iteration.
         * @type {string}
         */
        geotoolkit.animation.Accumulate.Sum = "";

/** @namespace */
geotoolkit.animation.effects = {};

/** @namespace */
geotoolkit.animation.processors = {};

/**
 * API to create and manipulate shapes, nodes and groups to build scene graphs.
 * @namespace */
geotoolkit.scene = {};

/**
 * API to create and manipulate node filters for scene graphs.
 * @namespace */
geotoolkit.scene.filters = {};

/**
 * API to implement geotoolkit shapes and painters
 * @namespace */
geotoolkit.scene.shapes = {};

/**
 * API to tiled shape
 * @namespace */
geotoolkit.scene.shapes.tiledshape = {};

/** @namespace */
geotoolkit.scene.shapes.painters = {};

/** @namespace */
geotoolkit.scene.shapes.painters.oilandgas = {};

/**
 * API for defining export features
 * @namespace */
geotoolkit.scene.exports = {};
    /**
     * Enum of annotation locations:
     * for annotated layout
     * - Center : 0
     * - North : 2
     * - South : 4
     * - West : 1
     * - East : 3
     * @enum
     * @readonly
     */
    geotoolkit.scene.exports.AnnotationLocation = {};
        /**
         * Center
         * @type {number}
         * **/
        geotoolkit.scene.exports.AnnotationLocation.Center = NaN;
        /**
         * West
         * @type {number}
         * **/
        geotoolkit.scene.exports.AnnotationLocation.West = NaN;
        /**
         * East
         * @type {number}
         * **/
        geotoolkit.scene.exports.AnnotationLocation.East = NaN;
        /**
         * North
         * @type {number}
         * **/
        geotoolkit.scene.exports.AnnotationLocation.North = NaN;
        /**
         * South
         * @type {number}
         * **/
        geotoolkit.scene.exports.AnnotationLocation.South = NaN;
    /**
     * Enum for linear layouts:
     * - Vertical : 0
     * - Horizontal : 1
     * @enum
     * @readonly
     */
    geotoolkit.scene.exports.LinearLocation = {};
        /**
         * Vertical
         * @type {number}
         * **/
        geotoolkit.scene.exports.LinearLocation.Vertical = NaN;
        /**
         * Horizontal
         * @type {number}
         * **/
        geotoolkit.scene.exports.LinearLocation.Horizontal = NaN;
    /**
     * Enum of paper orientations:
     * - Portrait : 'Portrait'
     * - Landscape : 'Landscape'
     * @enum
     * @readonly
     */
    geotoolkit.scene.exports.PaperOrientation = {};
        /**
         * Portrait
         * @type {string}
         * **/
        geotoolkit.scene.exports.PaperOrientation.Portrait = "";
        /**
         * Landscape
         * @type {string}
         * **/
        geotoolkit.scene.exports.PaperOrientation.Landscape = "";
    /**
     * Enum of paper scaling options:
     * - AsIs : 'AsIs'
     * - FitWidth : 'FitWidth'
     * - FitHeight : 'FitHeight'
     * - FitBoth : 'FitBoth'
     * @enum
     * @readonly
     */
    geotoolkit.scene.exports.ScalingOptions = {};
        /**
         * As is
         * @type {string}
         */
        geotoolkit.scene.exports.ScalingOptions.AsIs = "";
        /**
         * Fit width
         * @type {string}
         */
        geotoolkit.scene.exports.ScalingOptions.FitWidth = "";
        /**
         * Fit height
         * @type {string}
         */
        geotoolkit.scene.exports.ScalingOptions.FitHeight = "";
        /**
         * Fit both
         * @type {string}
         */
        geotoolkit.scene.exports.ScalingOptions.FitBoth = "";

/**
 * API for node selection
 * @namespace */
geotoolkit.selection = {};
    /**
     * Enum of traverse direction
     * @enum
     * @readonly
     */
    geotoolkit.selection.Direction = {};
        /**
         * Upward
         * @type {string}
         */
        geotoolkit.selection.Direction.Upwards = "";
        /**
         * Downward
         * @type {string}
         */
        geotoolkit.selection.Direction.Downwards = "";
    /**
     * Query all nodes from the specified node and do the specified action
     *
     * @param {geotoolkit.scene.Node} node node to start search
     * @param {geotoolkit.selection.Direction} [direction=geotoolkit.selection.Direction.Downwards] traverse direction
     * @returns {geotoolkit.selection.NodeQueryBuilder} a new node query builder
     * @example
     * geotoolkit.selection.from(node)
     * .where(function(node) { return node.getId() === 'line'})
     * .select(function(node) {node.setLineStyle(mystyle)));
     */
    geotoolkit.selection.from = function(node, direction){};

/**
 * API to build and modify Axis and Grid which are generated using one of the several forms of tick generators provided.
 * @namespace */
geotoolkit.axis = {};
    /**
     * Enum of zoom level
     * @enum
     * @readonly
     */
    geotoolkit.axis.DateZoomLevel = {};
        /**
         * Millisecond
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Millisecond = NaN;
        /**
         * Centisecond
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Centisecond = NaN;
        /**
         * Decisecond
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Decisecond = NaN;
        /**
         * Second
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Second = NaN;
        /**
         * TenSeconds
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.TenSeconds = NaN;
        /**
         * Minute
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Minute = NaN;
        /**
         * TenMinutes
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.TenMinutes = NaN;
        /**
         * Hour
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Hour = NaN;
        /**
         * SixHours
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.SixHours = NaN;
        /**
         * Day
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Day = NaN;
        /**
         * Week
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Week = NaN;
        /**
         * Month
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Month = NaN;
        /**
         * Quarter
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Quarter = NaN;
        /**
         * Year
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Year = NaN;
        /**
         * Decade
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Decade = NaN;
        /**
         * Century
         * @type {number}
         */
        geotoolkit.axis.DateZoomLevel.Century = NaN;
    /**
     * Enum of time zone
     * @enum
     * @readonly
     */
    geotoolkit.axis.TimeZone = {};
        /**
         * Coordinated Universal Time
         * @type {number}
         */
        geotoolkit.axis.TimeZone.UTC = NaN;
        /**
         * Local time
         * @type {number}
         */
        geotoolkit.axis.TimeZone.LocalTime = NaN;
    /**
     * Enum of axis orientations
     * @enum
     * @readonly
     */
    geotoolkit.axis.AxisOrientation = {};

/**
 * API for Plot object that holds the canvas used for rendering and the scenegraph root node.
 * @namespace */
geotoolkit.plot = {};

/**
 * API defining classes for persistence, serialization/deserialization.
 * @namespace */
geotoolkit.persistence = {};

/**
 * API used in representation of the document as a structured group of nodes and objects.
 * @namespace */
geotoolkit.dom = {};
    /**
     * create a canvas element,
     * supports for HTMLCanvasElement and node-canvas.
     *
     * @param {number} width the canvas width in pixels
     * @param {number} height the canvas height in pixels
     * @param {boolean} [inDevicePixel=false] if set to true width and height will be converted to canvas pixels.
     *
     * @returns {HTMLCanvasElement|object} will return an HTMLCanvasElement inside a browser
     * or a Canvas instance inside a nodeJS environment.
     */
    geotoolkit.dom.createCanvasElement = function(width, height, inDevicePixel){};

/**
 * @class geotoolkit.util.Base64
 */
geotoolkit.util.Base64 = {};
    /**
     * encode to base64
     * @param {string} input string to encode
     * @returns {string} encoded string
     */
    geotoolkit.util.Base64.encode = function(input){};
    /**
     * decode from base64
     * @param {string} input string to decode
     * @returns {string} decoded string
     */
    geotoolkit.util.Base64.decode = function(input){};

/**
 * This class is a 2D Point implementation. It holds the xy values that define a point coordinates in two dimensions.<br>
 * It also provides some utility functions to manipulate Points, compare points or calculate distance between points.
 *
 * @class geotoolkit.util.Point
 * @param {number|object|geotoolkit.util.Point} [x=0] x coordinate or an object with 'x' and 'y' properties
 * @param {number} [x.x=0] x coordinate
 * @param {number} [x.y=0] y coordinate
 * @param {number} [y=0] y coordinate
 */
geotoolkit.util.Point = {};
    /**
     * Return x value
     *
     * @returns {number} x value
     */
    geotoolkit.util.Point.prototype.getX = function(){};
    /**
     * Return x value
     *
     * @returns {number} x value
     */
    geotoolkit.util.Point.prototype.getY = function(){};
    /**
     * set Point coordinates
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.util.Point.prototype.setPoint = function(x, y){};
    /**
     * set X Point coordinate
     * @param {number} x x coordinate
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.util.Point.prototype.setX = function(x){};
    /**
     * set Y Point coordinates
     * @param {number} y y coordinate
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.util.Point.prototype.setY = function(y){};
    /**
     * translate point of dx, dy.
     * @param {number} dx dx
     * @param {number} dy dy
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.util.Point.prototype.translate = function(dx, dy){};
    /**
     * return clone object
     * @returns {geotoolkit.util.Point} clone
     */
    geotoolkit.util.Point.prototype.clone = function(){};
    /**
     * Returns a string that represents the current point.
     * @returns {string} A string that represents the current point.
     */
    geotoolkit.util.Point.prototype.toString = function(){};
    /**
     * compares a point against this one, if equal returns true
     * @param {geotoolkit.util.Point} point point to compare to
     * @param {number} [epsilon=0] acceptance criteria
     * @returns {boolean} if these two points are equal
     */
    geotoolkit.util.Point.prototype.equalsPoint = function(point, epsilon){};
    /**
     * round point coordinates
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.util.Point.prototype.round = function(){};
    /**
     * Calculates distance between two points
     *
     * @param {geotoolkit.util.Point} a
     * first point
     * @param {geotoolkit.util.Point} b
     * second point
     * @returns {number} distance between points
     */
    geotoolkit.util.Point.getDistance = function(a, b){};
    /**
     * Returns squared distance between two points {x1, y1} and {x2, y2}
     * @param {number|geotoolkit.util.Point} x1 first point x-ordinate or the first point object
     * @param {number|geotoolkit.util.Point} y1 first point y-ordinate or the second point object
     * @param {number} [x2] second point x-ordinate
     * @param {number} [y2] second point y-ordinate
     * @returns {number} squared distance
     */
    geotoolkit.util.Point.getSquaredDistance = function(x1, y1, x2, y2){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties
     * @returns {number} properties.x x value
     * @returns {number} properties.y y value
     */
    geotoolkit.util.Point.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {number} [properties.x] x value
     * @param {number} [properties.y] y value
     * @returns {geotoolkit.util.Point} this
     */
    geotoolkit.util.Point.prototype.setProperties = function(properties){};
    /**
     * Create or get point from object
     * @param {Object|geotoolkit.util.Point} [object] object can be in format of constructor of geotoolkit.attributes.LineStyle
     * @returns {?geotoolkit.util.Point} point
     */
    geotoolkit.util.Point.fromObject = function(object){};

/**
 * This class is a 2D Line implementation. It holds two points define a line segment two dimensions.</br>
 * It also provides some utility functions to manipulate Lines and do basic geometrical calculations</br>
 * The line segment is defined by two points: start and end. </br>
 * StartPoint----------------------------EndPoint
 *
 * @class geotoolkit.util.LineSegment
 * @param {geotoolkit.util.Point} [start] start Point
 * @param {geotoolkit.util.Point} [to] end point
 */
geotoolkit.util.LineSegment = {};
    /**
     * Sets the start point to the line
     * @param {geotoolkit.util.Point} start Start Point
     * @returns {geotoolkit.util.LineSegment} this
     */
    geotoolkit.util.LineSegment.prototype.setStart = function(start){};
    /**
     * Sets the end point to the line segment
     * @param {geotoolkit.util.Point} end End Point
     * @returns {geotoolkit.util.LineSegment} this
     */
    geotoolkit.util.LineSegment.prototype.setEnd = function(end){};
    /**
     * Return end point of the line segment
     * @returns {geotoolkit.util.Point} End point
     */
    geotoolkit.util.LineSegment.prototype.getEnd = function(){};
    /**
     * Return start point of the line segment
     * @returns {geotoolkit.util.Point} Start point
     */
    geotoolkit.util.LineSegment.prototype.getStart = function(){};
    /**
     * Returns the length of the line segment
     * @returns {number} Length of the segment
     */
    geotoolkit.util.LineSegment.prototype.getLength = function(){};
    /**
     * Sets the two points which define a line segment.
     * @param {geotoolkit.util.Point} start Point representing the "start" position
     * @param {geotoolkit.util.Point} end Point representing the "end" position
     * @returns {geotoolkit.util.LineSegment} this
     */
    geotoolkit.util.LineSegment.prototype.setLineSegment = function(start, end){};
    /**
     * Translates the line segment by the deltas passed as arguments
     * @param {number} dx Change in x coordinates
     * @param {number} dy Change in y coordinates
     * @returns {geotoolkit.util.LineSegment} this
     */
    geotoolkit.util.LineSegment.prototype.translate = function(dx, dy){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties
     * @returns {geotoolkit.util.Point} properties.start start point
     * @returns {geotoolkit.util.Point} properties.end end point
     */
    geotoolkit.util.LineSegment.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.util.Point} [properties.start] start point
     * @param {geotoolkit.util.Point} [properties.end] end point
     * @returns {geotoolkit.util.LineSegment} this
     */
    geotoolkit.util.LineSegment.prototype.setProperties = function(properties){};
    /**
     * Clones this line segment and returns the newly created clone object
     * @returns {geotoolkit.util.LineSegment} clone
     */
    geotoolkit.util.LineSegment.prototype.clone = function(){};
    /**
     * Create or get LineSegment from object
     * @param {Object|geotoolkit.util.LineSegment} [object] object can be in format of constructor of geotoolkit.util.LineSegment
     * @returns {?geotoolkit.util.LineSegment} line segment
     */
    geotoolkit.util.LineSegment.fromObject = function(object){};
    /**
     * Defines types of intersection detectable by the line
     * Assume line segments are: p1----p2 and p3----p4
     * @enum
     * @readonly
     */
    geotoolkit.util.LineSegment.IntersectionType = {};
        /**
         * @type {string}
         * Lie on the same line and overlap
         * p1---p3-p2---p4
         */
        geotoolkit.util.LineSegment.IntersectionType.Overlapping = "";
        /**
         * @type {string}
         * Lie on the same line but don't overlap
         * p1----p2 p3----p4
         */
        geotoolkit.util.LineSegment.IntersectionType.Disjoint = "";
        /**
         * @type {string}
         * Lie on parallel lines
         * p1----p2
         * p3----p4
         */
        geotoolkit.util.LineSegment.IntersectionType.Parallel = "";
        /**
         * @type {string}
         * Lie on different lines and intersect
         */
        geotoolkit.util.LineSegment.IntersectionType.Intersecting = "";
        /**
         * @type {string}
         * Lie on different lines but don't intersect
         */
        geotoolkit.util.LineSegment.IntersectionType.NonIntersecting = "";
    /**
     * Checks if two lines are intersecting. If they do, will return intersection point, if they don't,
     * will return null. If second argument is passed, it will be assigned a property "intersectiontype",
     * which will contain one of the geotoolkit.util.LineSegment.IntersectionType types defining how the two
     * line segments are correlated. If a destination point is provided, the point will be filled with
     * intersection coordinates and returned. (optimization)
     * @param {geotoolkit.util.LineSegment} ls1 The line to check intersection with
     * @param {object} [typeObject] An optional to which a property called "intersectiontype" will be added
     * @returns {?geotoolkit.util.Point} Point of intersection if intersecting. Null otherwise
     * @param {geotoolkit.util.Point} [dst] Destination point to fill with intersection coordinates
     */
    geotoolkit.util.LineSegment.prototype.findIntersection = function(ls1, typeObject, dst){};

/**
 * Defined functions to work with memory
 *
 * @class geotoolkit.util.Memory
 */
geotoolkit.util.Memory = {};
    /**
     * Creates an array that contains 32 Bit float values. If browser doesn't support it
     * then it returns Array
     * @function
     * @param {number} number of the elements
     * @returns {Array|Float32Array}
     */
    geotoolkit.util.Memory.createFloat32Array = function(number){};
    /**
     * Tries to create and then return a 64 bit float array.
     * If browser supports 32 bit float arrays but not 64 bit float arrays a 32 bit float array is returned.
     * If browser does not support both 32 bit float arrays and 64 bit float arrays a regular array is returned.
     *
     * @function
     * @param {Array|ArrayBuffer|number}size Another array or desired array size.
     * @returns {Array|Float32Array|Float64Array}createdArray The generated array object.
     */
    geotoolkit.util.Memory.createFloat64Array = function(size){};
    /**
     * Tries to create and then return a 32 bit int array.
     * If browser does not support 32 bit int array a regular array is returned.
     *
     * @function
     * @param {Array|ArrayBuffer|number}size Another array or desired array size.
     * @returns {Array|Int32Array}createdArray The generated array object.
     */
    geotoolkit.util.Memory.createInt32Array = function(size){};

/**
 * Defines locale class, which contains information for formatting numbers, dates and time.<br>
 * The setDefault() function explained below, sets up your locale and then it will use it by default for all formatters.<br>
 * To create a custom format or change format without specifying 'local' of a country you can use {@link geotoolkit.util.DecimalFormat}
 *
 * @class geotoolkit.util.Locale
 * @param {object} [options]
 * @param {object} [options.numberformat] defines number format
 * @param {object} [options.numberformat.dec] defines decimal symbol
 * @param {object} [options.numberformat.group] defines group symbol
 * @param {object} [options.numberformat.neg] defines negative symbol
 * @param {object} [options.numberformat.infinity] defines infinity text
 */
geotoolkit.util.Locale = {};
    /**
     * Return number format
     * @returns {object}
     */
    geotoolkit.util.Locale.prototype.getNumberFormatInfo = function(){};
    /**
     * Return a name of the locale
     * @returns {string}
     */
    geotoolkit.util.Locale.prototype.getLocaleName = function(){};
    /**
     * @returns {geotoolkit.util.Locale}
     * @param {string} locale current locale
     */
    geotoolkit.util.Locale.getLocale = function(locale){};
    /**
     * Return default locale
     * @returns {geotoolkit.util.Locale} default locale
     */
    geotoolkit.util.Locale.getDefault = function(){};
    /**
     * Sets default locale. Once user sets a default locale here it will be used by default for all formatters in all the plots.<br>
     *
     * Please refer to the example below
     * @param {geotoolkit.util.Locale} locale default locale . It supports ['ae', 'au', 'ca', 'cn', 'eg', 'gb', 'hk', 'il', 'in', 'jp', 'sk', 'th', 'tw', 'us', 'at', 'br', 'de', 'dk', 'es',
     * 'gr', 'it', 'nl', 'pt', 'tr', 'vn', 'bg', 'cz', 'fi', 'fr', 'no', 'pl', 'ru', 'se', 'ch']
     * @example
     * geotoolkit.util.Locale.setDefault(locale)
     */
    geotoolkit.util.Locale.setDefault = function(locale){};
    /**
     * Sets the properties pertaining to Locale
     * @param {object} options JSON containing locale properties
     * @param {object} [options.numberformat] defines number format
     * @param {string} [options.numberformat.dec] defines decimal symbol
     * @param {string} [options.numberformat.group] defines group symbol
     * @param {string} [options.numberformat.neg] defines negative symbol
     * @param {string} [options.numberformat.infinity] defines infinity text
     * @param {string} [options.locale] The name of the locale
     * @returns {geotoolkit.util.Locale}
     */
    geotoolkit.util.Locale.prototype.setProperties = function(options){};
    /**
     * Returns the properties pertaining to Locale
     * @returns {object} options JSON containing locale properties
     * @returns {object} options.numberformat defines number format
     * @returns {string} [options.numberformat.dec] defines decimal symbol
     * @returns {string} [options.numberformat.group] defines group symbol
     * @returns {string} [options.numberformat.neg] defines negative symbol
     * @returns {string} [options.numberformat.infinity] defines infinity text
     * @returns {string} options.locale The name of the locale
     */
    geotoolkit.util.Locale.prototype.getProperties = function(){};

/**
 * Defines abstract class for formatting numbers, dates and time
 *
 * @class geotoolkit.util.Format
 */
geotoolkit.util.Format = {};
    /**
     * Formats object to string
     * @function
     * @abstract
     * @param {number|object} num number or object
     * @returns {string}
     */
    geotoolkit.util.Format.prototype.format = function(num){};
    /**
     * @function
     * @abstract
     * @protected
     * @param {geotoolkit.util.Format} src Source to copy from
     * @returns {geotoolkit.util.Format} this
     */
    geotoolkit.util.Format.prototype.copyConstructor = function(src){};
    /**
     * Gets all the properties pertaining to this object
     * @abstract
     * @function
     * @returns {*}
     */
    geotoolkit.util.Format.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @function
     * @abstract
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.util.Format} this
     */
    geotoolkit.util.Format.prototype.setProperties = function(properties){};
    /**
     * Create or get fill style from object
     *
     * @param {Object|geotoolkit.util.Format} [object] object can be in format of constructor geotoolkit.util.Format
     * @returns {?(geotoolkit.util.NumberFormat|geotoolkit.util.DateTimeFormat)}
     */
    geotoolkit.util.Format.fromObject = function(object){};

/**
 * A data stream, typical implementation include FileStream or MemoryStream.<br>
 * This class offers 'random' access to the underlying data without requiring to load the whole data in memory.
 * @class geotoolkit.util.stream.AbstractStream
 */
geotoolkit.util.stream.AbstractStream = {};
    /**
     * @function
     * @desc
     * Read a chunk of data and calls the callback when it's done.
     * @param {number} offset The position to start reading from
     * @param {number} length The amount of bytes to read
     * @param {function} callback The callback that will be called with the result
     * @returns {geotoolkit.util.stream.AbstractStream} this
     */
    geotoolkit.util.stream.AbstractStream.prototype.readChunk = function(offset, length, callback){};
    /**
     * @function
     * @abstract
     * @desc
     * Returns the size of the underlying data
     * @returns {number} size The size
     */
    geotoolkit.util.stream.AbstractStream.prototype.getSize = function(){};
    /**
     * @function
     * @abstract
     * @desc
     * Returns the stride of this stream
     * @returns {number} stride The stride
     */
    geotoolkit.util.stream.AbstractStream.prototype.getStride = function(){};
    /**
     * @function
     * @desc
     * Disposes this stream, releasing all the resources used.
     * @returns {geotoolkit.util.stream.AbstractStream} this
     */
    geotoolkit.util.stream.AbstractStream.prototype.dispose = function(){};

/**
 * A stream implementation using a browser {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer} as backing store.<br>
 * (Use BrowserMemoryStream.stringToArrayBuffer to convert a string into an ArrayBuffer).<br>
 * This implementation provides compatibility with stream-based mechanism for dataset that are already in memory.<br>
 * <br>
 * Note that this class relies on the {@link https://w3c.github.io/FileAPI/ HTML5 File API}.<br>
 *
 * @class geotoolkit.util.stream.BrowserMemoryStream
 * @augments geotoolkit.util.stream.AbstractStream
 * @param {object} options The options
 * @param {ArrayBuffer} options.buffer The buffer
 * @param {number} [options.stride=2] The stride of this stream
 */
geotoolkit.util.stream.BrowserMemoryStream = {};
    /**
     * Converts a String in an ArrayBuffer using String.charCodeAt (encoding is forced to utf16).<br>
     * @param {string} string The string to convert
     * @returns {ArrayBuffer} buffer The resulting ArrayBuffer
     */
    geotoolkit.util.stream.BrowserMemoryStream.stringToArrayBuffer = function(string){};

/**
 * A stream implementation using a browser File object and a browser FileReader.<br>
 * This implementation relies on the {@link https://w3c.github.io/FileAPI/ HTML5 File API}.<br>
 * As of August 2016 it's still a working draft and may not be supported by old browsers.
 *
 * @class geotoolkit.util.stream.BrowserFileStream
 * @augments geotoolkit.util.stream.AbstractStream
 * @param {object} options The options
 * @param {File} options.file The file to read from
 * @param {number} [options.stride=1] The stride of this stream
 */
geotoolkit.util.stream.BrowserFileStream = {};

/**
 * Defines abstract representation of stream
 *
 * @class geotoolkit.util.stream.Stream
 */
geotoolkit.util.stream.Stream = {};
    /**
     * Put value to stream to stream
     *
     * @function
     * @abstract
     * @param {*} data a data to save
     * @returns {number} offset
     */
    geotoolkit.util.stream.Stream.prototype.out = function(data){};
    /**
     * Close stream
     *
     * @function
     * @abstract
     * @returns this
     */
    geotoolkit.util.stream.Stream.prototype.close = function(){};
    /**
     * Save stream
     *
     * @function
     * @param {string} name file name/ string name
     */
    geotoolkit.util.stream.Stream.prototype.save = function(name){};
    /**
     * Gets stream content
     *
     * @function
     * @abstract
     * @returns {object}
     */
    geotoolkit.util.stream.Stream.prototype.getContent = function(){};

/**
 * Defines representation of memory binary stream
 * @augments geotoolkit.util.stream.Stream
 * @class geotoolkit.util.stream.BinaryStream
 */
geotoolkit.util.stream.BinaryStream = {};
    /**
     * @override
     * @param {number | Array} byte to be saved
     * @param {number} [offset] offset
     * @param {number} [length] length
     * @returns {number}
     */
    geotoolkit.util.stream.BinaryStream.prototype.out = function(byte, offset, length){};
    /**
     * @override
     */
    geotoolkit.util.stream.BinaryStream.prototype.close = function(){};
    /**
     * Gets current position
     * @returns {number} position
     */
    geotoolkit.util.stream.BinaryStream.prototype.getPosition = function(){};
    /**
     * Set saving options
     * @param {object} options options
     * @param {string} options.filename full filename
     * @param {string} options.type type
     * @param {string} [options.popupBlockedMessage] message to alert if popup-blocker blocked opening file
     * @param {boolean} [options.save = true] flag to save data directly to file or open dialog
     */
    geotoolkit.util.stream.BinaryStream.prototype.setSaveOptions = function(options){};
    /**
     * @override
     * @param {string} [name] the name of the file to be created
     * @param {boolean} [save] flag to save the stream directly to file or open dialog
     */
    geotoolkit.util.stream.BinaryStream.prototype.save = function(name, save){};
    /** Returns content
     * @override
     * @returns {Uint8Array}
     */
    geotoolkit.util.stream.BinaryStream.prototype.getContent = function(){};
    /**
     * Clears all date, stops any operations
     */
    geotoolkit.util.stream.BinaryStream.prototype.dispose = function(){};

/**
 * Defines representation memory string stream
 * @augments geotoolkit.util.stream.Stream
 * @class geotoolkit.util.stream.StringStream
 * @param {string} [features=null] optional. A comma-separated list of items, no whitespaces, see https://www.w3schools.com/jsref/met_win_open.asp
 */
geotoolkit.util.stream.StringStream = {};
    /**
     * Returns window features
     * @returns {string}
     */
    geotoolkit.util.stream.StringStream.prototype.getWindowFeatures = function(){};
    /**
     * Sets window features
     * @param {string|null} features a comma-separated list of items, no whitespaces, see https://www.w3schools.com/jsref/met_win_open.asp
     * @returns {geotoolkit.util.stream.StringStream} this
     */
    geotoolkit.util.stream.StringStream.prototype.setWindowFeatures = function(features){};
    /**
     * write the data into the file
     * @override
     * @param {string} str string to be saved
     * @returns {number} offset the offset
     */
    geotoolkit.util.stream.StringStream.prototype.out = function(str){};
    /**
     * @inheritdoc
     */
    geotoolkit.util.stream.StringStream.prototype.close = function(){};
    /**
     * Set saving options
     * @param {object} options options
     * @param {string} options.filename full filename
     * @param {string} options.type type
     * @param {function} [options.onError] error callback
     * @param {string} [options.popupBlockedMessage] message to alert if popup-blocker blocked opening file
     * @param {boolean} [options.save = true] flag to save data directly to file or open dialog
     * @returns {geotoolkit.util.stream.StringStream} this
     */
    geotoolkit.util.stream.StringStream.prototype.setSaveOptions = function(options){};
    /**
     * Save stream
     * @override
     * @param {string} [name] the name of the file to be created
     * @param {boolean} [save] flag to save the stream directly to file or open dialog
     */
    geotoolkit.util.stream.StringStream.prototype.save = function(name, save){};
    /** Returns content
     * @override
     * @returns {Uint8Array}
     */
    geotoolkit.util.stream.StringStream.prototype.getContent = function(){};
    /**
     * Save content
     * @param {object} options options
     * @param {string} options.filename full filename
     * @param {string} options.type type
     * @param {function} [options.onError] error callback
     * @param {string} [options.popupBlockedMessage] message to alert if popup-blocker blocked opening file
     * @param {boolean} [options.save = true] flag to save data directly to file or open dialog
     * @param {string} content content
     */
    geotoolkit.util.stream.StringStream.save = function(options, content){};

/**
 * A wrapper class offering line based reading on top of a regular {@link geotoolkit.util.stream.AbstractStream stream}.<br>
 * This implementation hides the complexity of the underlying stream to offer line based reading instead.<br>
 * To do so, this reader will (lazily) parse the stream to text and search for \n \r chars.<br>
 * Doing so, it will build a line based index to allow faster access to specific lines further on.<br>
 *
 * @class geotoolkit.util.stream.LineReader
 * @param {object} [options] The options
 * @param {number} [options.chunksize=1048576] The amount of bytes to read at once. The default value is 1 megabyte
 * @param {geotoolkit.util.stream.AbstractStream} options.stream The data stream to be wrapped by this reader
 */
geotoolkit.util.stream.LineReader = {};
    /**
     * Reads the lines starting at the given line index up to the given count.<br>
     *
     * @param {number} index Starting line index
     * @param {number} count Amount of lines to read
     * @param {geotoolkit.util.stream.LineReader~readLinesCallback} callback The function called with the result
     */
    geotoolkit.util.stream.LineReader.prototype.readLines = function(index, count, callback){};
    /**
     * Search for the given regexp starting at the given line number.<br>
     *
     * @param {string} regex The regular expression to search for (as a string)
     * @param {number} index Starting line index
     * @param {geotoolkit.util.stream.LineReader~findCallback} callback The function called with the result
     */
    geotoolkit.util.stream.LineReader.prototype.find = function(regex, index, callback){};
    /**
     * Search for the sequence starting by the given regexp and ending by the other regexp.<br>
     * The search starts at the given line number and ends (at worst) after maxcount lines have been read (if maxcount != -1).<br>
     * <br>
     * Note that reaching END-OF-STREAM without finding the searched regexp will not be considered as an error.<br>
     * @param {string} [startRegex] The start regular expression to search for (as a string)
     * @param {string} endRegex The end regular expression to search for (as a string)
     * @param {number} index Starting line index
     * @param {number} maxcount Maximum count of line that can be read. If the capture did not finish in that range, an error will be reported. -1 for no limit
     * @param {geotoolkit.util.stream.LineReader~captureCallback} callback The function called with the result
     */
    geotoolkit.util.stream.LineReader.prototype.capture = function(startRegex, endRegex, index, maxcount, callback){};

/**
 * @class geotoolkit.util.stream.TextStream
 * @augments geotoolkit.util.stream.Stream
 * @param {object} [options] options options
 * @param {string} options.filename full filename
 * @param {string} [options.type = 'text\plain'] type
 * @param {string} [options.popupBlockedMessage] popupBlockedMessage popupBlockedMessage
 * @param {boolean} [options.save = true] save flag to save the stream directly to file or open dialog
 */
geotoolkit.util.stream.TextStream = {};
    /**
     * @override
     * @param {Array.<string> | string} data data to be written
     * @returns {number} offset
     */
    geotoolkit.util.stream.TextStream.prototype.out = function(data){};
    /**
     * @override
     */
    geotoolkit.util.stream.TextStream.prototype.close = function(){};
    /**
     * @override
     * @param {string} [name] the name of the file to be created
     * @param {boolean} [save] flag to save the stream directly to file or open dialog
     */
    geotoolkit.util.stream.TextStream.prototype.save = function(name, save){};
    /**
     * Returns content
     * @override
     * @returns {Array.<string> | string}
     */
    geotoolkit.util.stream.TextStream.prototype.getContent = function(){};
    /**
     * Clears all data, stops all operation of TextStream
     */
    geotoolkit.util.stream.TextStream.prototype.dispose = function(){};

/**
 * Defines base class for formatting numbers based on Java NumberFormatter. <br>
 * User can also use {@link geotoolkit.util.DecimalFormat} which allows creating a custom format as well.
 *
 * @class geotoolkit.util.NumberFormat
 * @augments geotoolkit.util.Format
 * @param {object} [options]
 * @param {string|geotoolkit.util.Locale} [options.locale=us] format locale
 * @param {boolean} [options.round=true] round number
 * @param {boolean} [options.fulllocale=false] specify format how to provide locale
 * @param {number} [options.maximumfractiondigits=3] specify maximum fraction digits
 * @param {number} [options.grouplength=3] specify group length of numbers
 *
 * @example
 * // locale parameter can be used to specify 'Norway' as shown below. 'fr', 'ru', 'us', 'de' ... are also available.
 * var number = new geotoolkit.util.NumberFormat({'locale': 'no'});
 * number.setMaximumFractionDigits(2);
 * number.format(5000.123); // '5 000,12'
 */
geotoolkit.util.NumberFormat = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.util.NumberFormat} src Source to copy from
     * @returns {geotoolkit.util.NumberFormat} this
     */
    geotoolkit.util.NumberFormat.prototype.copyConstructor = function(src){};
    /**
     * Returns a clone of the current format
     * @returns {geotoolkit.util.NumberFormat }
     */
    geotoolkit.util.NumberFormat.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.util.NumberFormat.prototype.getProperties = function(){};
    /**
     * Sets properties
     * @param {object} properties properties pertaining to this object
     * @returns {geotoolkit.util.NumberFormat} this
     */
    geotoolkit.util.NumberFormat.prototype.setProperties = function(properties){};
    /**
     * Return object, which contains 'dec', 'group', 'neg' symbols
     * @param {geotoolkit.util.Locale|string} [locale] locale
     * @returns {*}
     * @protected
     */
    geotoolkit.util.NumberFormat.prototype.getLocalFormatData = function(locale){};
    /**
     * Formats number to string
     * @param {number} number number to be formatted
     * @returns {string}
     */
    geotoolkit.util.NumberFormat.prototype.format = function(number){};
    /**
     * Return maximum fraction digits
     * @param {number} digits maximum fraction digits
     * @returns {geotoolkit.util.NumberFormat} this
     */
    geotoolkit.util.NumberFormat.prototype.setMaximumFractionDigits = function(digits){};
    /**
     * Return maximum faction digits
     * @param {number} [number] an optional number to get maximum fraction digits
     * @returns {number}
     */
    geotoolkit.util.NumberFormat.prototype.getMaximumFractionDigits = function(number){};
    /**
     * Sets locale
     * @param {geotoolkit.util.Locale|string} locale locale
     * @returns {geotoolkit.util.NumberFormat} this
     */
    geotoolkit.util.NumberFormat.prototype.setLocale = function(locale){};
    /**
     * Return the current locale
     * @returns {geotoolkit.util.Locale|string}
     */
    geotoolkit.util.NumberFormat.prototype.getLocale = function(){};
    /**
     * Convert number to format with fixed point
     * @param {number} number number to be converted
     * @param {number} decimalPlaces number of decimal places this number can have
     * @returns {string}
     * @protected
     */
    geotoolkit.util.NumberFormat.prototype.toFixed = function(number, decimalPlaces){};
    /**
     * Return instance of the number format
     * @param {string} [locale=null] locale of formatter. Locals is not supported for now.
     * @returns {geotoolkit.util.NumberFormat} instance of the number format
     */
    geotoolkit.util.NumberFormat.getInstance = function(locale){};

/**
 * Defines a class for formatting date time
 *
 * @class geotoolkit.util.DateTimeFormat
 * @augments geotoolkit.util.Format
 * @param {object} [options]
 * @param {string} [options.format="M j H:i"] date time format
 * @param {geotoolkit.axis.TimeZone|number|string} [options.timezone=geotoolkit.axis.TimeZone.UTC] time zone
 */
geotoolkit.util.DateTimeFormat = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.util.DateTimeFormat} src Source to copy from
     * @returns {geotoolkit.util.DateTimeFormat} this
     */
    geotoolkit.util.DateTimeFormat.prototype.copyConstructor = function(src){};
    /**
     * All inheritors should implement copy constructor or provide custom implementation for this method
     * @returns {geotoolkit.util.DateTimeFormat} clone
     */
    geotoolkit.util.DateTimeFormat.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.util.DateTimeFormat.prototype.getProperties = function(){};
    /**
     * Sets properties
     * @param {object} properties properties pertaining to this object
     * @returns {geotoolkit.util.DateTimeFormat}
     */
    geotoolkit.util.DateTimeFormat.prototype.setProperties = function(properties){};
    /**
     * Formats number to string
     * @param {number} number number to be formatted
     * @returns {string}
     */
    geotoolkit.util.DateTimeFormat.prototype.format = function(number){};
    /**
     * Return instance of the number format
     * @param {string} [locale=null] locale of formatter. Locals is not supported for now.
     * @returns {geotoolkit.util.DateTimeFormat} instance of the format
     */
    geotoolkit.util.DateTimeFormat.getInstance = function(locale){};

/**
 * Defines class for formatting decimal numbers
 *
 * @class geotoolkit.util.DecimalFormat
 * @augments geotoolkit.util.NumberFormat
 * @param {object} [options] The options
 * @param {string} [options.format] format : The syntax for the formatting is:<br>
 * 0 = Digit<br>
 * # = Digit, zero shows as absent<br>
 * . = Decimal separator<br>
 * - = Negative sign<br>
 * , = Grouping Separator<br>
 * % = Percent (multiplies the number by 100)<br>
 * E = Separates mantissa and exponent in scientific notation. Need not be quoted in prefix or suffix.<br>
 * @param {string} [options.locale] locale
 * @param {boolean} [options.decimalseparatoralwaysshown] decimalseparatoralwaysshown
 * @param {boolean} [options.round] round
 * @param {string} [options.overridegroupsep] overridegroupsep
 * @param {string} [options.overridenegsign] overridenegsign
 * @param {boolean} [options.ispercentage] ispercentage
 * @param {boolean} [options.autodetectpercentage] autodetectpercentage
 * @example
 * 1) df = new geotoolkit.util.DecimalFormat( {'format':"#,###,##0.00"} ); //df.format(364565.14) gives "364,565.14"
 * @example
 * 2) df = new geotoolkit.util.DecimalFormat( {'format':"#,###,##0.000", 'locale': 'ru'} ); //df.format(364565.14) gives '364 565,140'
 * @example
 * 3) df = new geotoolkit.util.DecimalFormat( {'format':"0.####E0"}); //df.format(364565.14) gives '3.6457E5'
 * @example
 * 4)// The code below shows how to replace decimal separator to be a comma/',' without having to specify a local of a country that uses ',' comma.
 * // It changes 'overridedecsep' property and overridegroupsep for group separator.
 * var df = new geotoolkit.util.DecimalFormat({'format':"###,###.###", overridedecsep: ',', overridegroupsep: ''});
 * var str = df.format(12345.6); // 'str' should be '12345,6'.
 */
geotoolkit.util.DecimalFormat = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.util.DecimalFormat} src Source to copy from
     * @returns {DecimalFormat} this instance, filled with properties copied from the given src
     */
    geotoolkit.util.DecimalFormat.prototype.copyConstructor = function(src){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.util.DecimalFormat.prototype.getProperties = function(){};
    /**
     * Sets properties
     * @param {object} [properties] properties pertaining to this object
     * @returns {geotoolkit.util.DecimalFormat} this
     */
    geotoolkit.util.DecimalFormat.prototype.setProperties = function(properties){};
    /**
     * Formats number to string
     * @param {number} number number to be formatted
     * @returns {string}
     */
    geotoolkit.util.DecimalFormat.prototype.format = function(number){};

/**
 * Define the proper number format for a double value formatted for DISPLAY
 * only.
 *
 * @class geotoolkit.util.AutoNumberFormat
 * @augments geotoolkit.util.NumberFormat
 * @param {object} [options]
 * @param {string} [options.locale=us] format locale
 * @param {boolean} [options.round=true] round number
 * @param {boolean} [options.fulllocale=false] specify format how to provide locale
 * @param {number} [options.maximumfractiondigits=3] specify maximum fraction digits
 * @param {number} [options.grouplength=3] specify group length of numbers
 */
geotoolkit.util.AutoNumberFormat = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.util.AutoNumberFormat} src Source to copy from
     */
    geotoolkit.util.AutoNumberFormat.prototype.copyConstructor = function(src){};
    /**
     * Sets maximum fraction digits.
     * This method is not supported
     * @param {number} digits maximum faction digits
     */
    geotoolkit.util.AutoNumberFormat.prototype.setMaximumFractionDigits = function(digits){};
    /**
     * Return maximum faction digits
     * @param {number} [number] an optional number to get maximum fraction digits
     * @returns {number}
     */
    geotoolkit.util.AutoNumberFormat.prototype.getMaximumFractionDigits = function(number){};
    /**
     * Formats number to string
     * @param {number} number number to be formatted
     * @returns {string}
     */
    geotoolkit.util.AutoNumberFormat.prototype.format = function(number){};
    /**
     * Estimate the maximum fraction digits
     * @param {number} number number to provide the estimate
     * @returns {number}
     */
    geotoolkit.util.AutoNumberFormat.estimateMaximumFractionDigits = function(number){};
    /**
     * Creates format geotoolkit.util.NumberFormat based on specified value
     * @param {number} number number to provide the best format
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.util.AutoNumberFormat.matchFormat = function(number){};

/**
 * Define date time factory
 * @class geotoolkit.util.DateTimeFormatFactory
 */
geotoolkit.util.DateTimeFormatFactory = {};
    /**
     * Return default factory instance
     * @returns {geotoolkit.util.DateTimeFormatFactory}
     */
    geotoolkit.util.DateTimeFormatFactory.getDefault = function(){};
    /**
     * Create a new format
     * @param {object} [options]
     * @param {string} [options.format] date time format such as "M j H:i"
     * @param {geotoolkit.util.Locale|string} [options.locale] locale
     * @param {geotoolkit.axis.TimeZone|string} [options.timezone] UTC or local time,
     * If using Third Party such as momentJS see also {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}
     * @returns {geotoolkit.util.Format} a new Format instance
     */
    geotoolkit.util.DateTimeFormatFactory.prototype.createFormat = function(options){};
    /**
     * Sets default format factory
     * @param {geotoolkit.util.DateTimeFormatFactory} instance a new instance
     */
    geotoolkit.util.DateTimeFormatFactory.setDefault = function(instance){};

/**
 * This abstract class defines the interface of a readonly Iterator. Subclasses are responsible for implementing the actual iteration mechanism.
 *
 * @class geotoolkit.util.Iterator
 */
geotoolkit.util.Iterator = {};
    /**
     * Returns the next element in the iteration.
     * @function
     * @abstract
     * @returns {*}
     */
    geotoolkit.util.Iterator.prototype.next = function(){};
    /**
     * Returns true if the iteration has more elements.
     * @function
     * @abstract
     * @returns {boolean}
     */
    geotoolkit.util.Iterator.prototype.hasNext = function(){};
    /**
     * Applies filter to every element according to the function passed via the only parameter
     * @function
     * @abstract
     * @param {function()} func function to apply to each element
     * @returns {Array}
     */
    geotoolkit.util.Iterator.prototype.filter = function(func){};
    /**
     * Executes a method for each item in iterator and return new iterator.
     * @function
     * @abstract
     * @param {function()} func function to apply to each element
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.util.Iterator.prototype.forEach = function(func){};
    /**
     * Resets iterator to its initial state.
     * @function
     * @abstract
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.util.Iterator.prototype.reset = function(){};
    /**
     * Creates array based on iterator items
     * @param {number} [maxElements] array size upper limit
     * @returns {!Array}
     */
    geotoolkit.util.Iterator.prototype.toArray = function(maxElements){};
    /**
     * Returns iterator by array elements
     * @param {Array<object>} array of any object
     * @param {function()} [func=null] to filter elements
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.util.Iterator.getArrayIterator = function(array, func){};
    /**
     * Returns iterator by the data
     * @param {?geotoolkit.util.Iterator|object[]|object} parameter data to iterate
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.util.Iterator.getIterator = function(parameter){};
    /**
     * Runs asynchronous function for each element and wait execution
     * @param {Array<object>|geotoolkit.util.Iterator} array array of any object or iterator
     * @param {function(item,done)} func function to apply to each element
     * @param {function()} [callback=null] function to be called at the end of execution
     */
    geotoolkit.util.Iterator.awaitForEach = function(array, func, callback){};
    /**
     * Creates array based on elements to iterate
     * @param {geotoolkit.util.Iterator} iterator iterator
     * @param {number} [maxElements] array size upper limit
     * @returns {!Array}
     */
    geotoolkit.util.Iterator.toArray = function(iterator, maxElements){};

/**
 * Specify RGBA color, which can be defined as s set of the four color
 * components (Red, Green, Blue, Alpha). The each component must be from 0 to
 * 255.
 *
 * @class geotoolkit.util.RgbaColor
 * @param {number | string | geotoolkit.util.RgbaColor} [red] red component from 0 to 255 OR ready-to-use color (string, rgbacolor...)
 * @param {number} [green] green component from 0 to 255
 * @param {number} [blue] blue component from 0 to 255
 * @param {number} [alpha] alpha component from 0 to 255
 */
geotoolkit.util.RgbaColor = {};
    /**
     * Return clone of the color
     * @returns {geotoolkit.util.RgbaColor} clone
     */
    geotoolkit.util.RgbaColor.prototype.clone = function(){};
    /**
     * set color value
     * @param {number} [red] red component form 0 to 255
     * @param {number} [green] green component form 0 to 255
     * @param {number} [blue] blue component form 0 to 255
     * @param {number} [alpha] alpha component form 0 to 255
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.util.RgbaColor.prototype.setColor = function(red, green, blue, alpha){};
    /**
     * Sets the red component to the given value.<br>
     * This function expects the red component to be in range[0-255].<br>
     * @param {number} val value of the red component
     * @returns {geotoolkit.util.RgbaColor} this
     */
    geotoolkit.util.RgbaColor.prototype.setRed = function(val){};
    /**
     * Sets the blue component to the given value.<br>
     * This function expects the blue component to be in range[0-255].<br>
     * @param {number} val value of the blue component
     * @returns {geotoolkit.util.RgbaColor} this
     */
    geotoolkit.util.RgbaColor.prototype.setBlue = function(val){};
    /**
     * Sets the green component to the given value.<br>
     * This function expects the green component to be in range[0-255].<br>
     * @param {number} val value of the green component
     * @returns {geotoolkit.util.RgbaColor} this
     */
    geotoolkit.util.RgbaColor.prototype.setGreen = function(val){};
    /**
     * Sets the alpha component to the given value.<br>
     * This function expects the alpha component to be in range[0-1].<br>
     * @param {number} val value of the alpha component
     * @returns {geotoolkit.util.RgbaColor} this
     */
    geotoolkit.util.RgbaColor.prototype.setAlpha = function(val){};
    /**
     * Return the red component value.<br>
     * The value should be in range[0-255]
     * @returns {number}
     */
    geotoolkit.util.RgbaColor.prototype.getRed = function(){};
    /**
     * Return the green component value.<br>
     * The value should be in range[0-255]
     * @returns {number}
     */
    geotoolkit.util.RgbaColor.prototype.getGreen = function(){};
    /**
     * Return the blue component value.<br>
     * The value should be in range[0-255]
     * @returns {number}
     */
    geotoolkit.util.RgbaColor.prototype.getBlue = function(){};
    /**
     * Return the alpha component value.<br>
     * The value should be in range[0-255]
     * @returns {number}
     */
    geotoolkit.util.RgbaColor.prototype.getAlpha = function(){};
    /**
     * make color twice lighter
     * @returns {geotoolkit.util.RgbaColor} lighter color
     */
    geotoolkit.util.RgbaColor.prototype.light = function(){};
    /**
     * Make color darker by factor of two.
     * @returns {geotoolkit.util.RgbaColor} color darkened by factor of two
     */
    geotoolkit.util.RgbaColor.prototype.dark = function(){};
    /**
     * set brightness
     * @param {number} correctionFactor correction Factor
     * @returns {geotoolkit.util.RgbaColor} result
     */
    geotoolkit.util.RgbaColor.prototype.setBrightness = function(correctionFactor){};
    /**
     * Convert color to string
     * @returns {string}
     */
    geotoolkit.util.RgbaColor.prototype.toRgbaString = function(){};
    /**
     * Convert color to string
     * @returns {string}
     */
    geotoolkit.util.RgbaColor.prototype.toCSS = function(){};
    /**
     * Create or get RGBA color from object
     *
     * @param {object | geotoolkit.util.RgbaColor} object object can be in format of constructor of
     * geotoolkit.util.RgbaColor
     * @returns {geotoolkit.util.RgbaColor | null}
     */
    geotoolkit.util.RgbaColor.fromObject = function(object){};

/**
 * Specify HSV color, which can be defined as s set of the three color
 * components (Hue, Saturation, Value).
 *
 * @class geotoolkit.util.HsvColor
 * @param {number|geotoolkit.util.RgbaColor} [hue] hue from 0 to 360
 * @param {number} [sat] sat from 0 to 1
 * @param {number} [val] val from 0 to 1
 */
geotoolkit.util.HsvColor = {};
    /**
     * Return clone of the color
     * @returns {geotoolkit.util.HsvColor} clone
     */
    geotoolkit.util.HsvColor.prototype.clone = function(){};
    /**
     * Return hue
     *
     * @returns {number}
     */
    geotoolkit.util.HsvColor.prototype.getHue = function(){};
    /**
     * Return saturation
     *
     * @returns {number}
     */
    geotoolkit.util.HsvColor.prototype.getSaturation = function(){};
    /**
     * Return value
     *
     * @returns {number}
     */
    geotoolkit.util.HsvColor.prototype.getValue = function(){};
    /** \
     * Add delta to saturation.
     * Saturation is between 0 and 1
     * @param {number} delta delta value to be added
     */
    geotoolkit.util.HsvColor.prototype.adjustSaturation = function(delta){};
    /**
     * Add delta to value.
     * Value is between 0 and 1
     * @param {number} delta delta value to be added
     */
    geotoolkit.util.HsvColor.prototype.adjustValue = function(delta){};
    /**
     * Multiply saturation factor.
     * Saturation is between 0 and 1
     * @param {number} factor saturation factor (between 0 - 1)
     */
    geotoolkit.util.HsvColor.prototype.adjustSaturationByFactor = function(factor){};
    /**
     * Multiply value by factor.
     * Value is between 0 and 1
     * @param {number} factor factor to multiply this color by
     */
    geotoolkit.util.HsvColor.prototype.adjustValueByFactor = function(factor){};
    /**
     * Convert current value and saturation to RGBA
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.util.HsvColor.prototype.toRgbaColor = function(){};

/**
 * Specify HLS color, which can be defined as a set of the three color components (Hue, Luminosity and Saturation). It provides several functions to manipulate
 * colors based on (HLS) as well as to convert colors to {@link geotoolkit.util.RgbaColor}
 * @class geotoolkit.util.HlsColor
 * @param {number} hue RGBA color between 0 - 360
 * @param {number} luminosity between 0 - 1
 * @param {number} saturation between 0 - 1
 */
geotoolkit.util.HlsColor = {};
    /**
     * Return hue
     *
     * @returns {number}
     */
    geotoolkit.util.HlsColor.prototype.getHue = function(){};
    /**
     * Return saturation
     *
     * @returns {number}
     */
    geotoolkit.util.HlsColor.prototype.getSaturation = function(){};
    /**
     * Return luminosity
     *
     * @returns {number}
     */
    geotoolkit.util.HlsColor.prototype.getLuminosity = function(){};
    /**
     * Convert color from HLS to RGBA
     *
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.util.HlsColor.prototype.toRgbaColor = function(){};
    /**
     * Make the color lighter
     *
     * @param {number} percLighter percentage to lighten the color
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.util.HlsColor.prototype.lighter = function(percLighter){};
    /**
     * Make the color darker
     *
     * @param {number} percDarker percentage to make the color darker
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.util.HlsColor.prototype.darker = function(percDarker){};

/**
 * Defines helper methods to work with geometries
 * @class geotoolkit.util.GeometryUtil
 */
geotoolkit.util.GeometryUtil = {};
    /**
     * Gets bounding box for a geometry defined by array of {@link geotoolkit.util.Point} points
     * or by arrays of x-ordinates and y-ordinates.
     *
     * @param {!Array} parameter1 array of {@link geotoolkit.util.Point} or array of numbers (x-values)
     * @param {!Array} [parameter2] array of numbers (y-values)
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.util.GeometryUtil.getBoundingBox = function(parameter1, parameter2){};
    /**
     * Gets device size of vector specified in model coordinates
     * @param {number} x x position of vector in model coordinates
     * @param {number} y y position of vector in model coordinates
     * @param {!geotoolkit.util.Transformation} transformation context transformation
     * @returns {number}
     */
    geotoolkit.util.GeometryUtil.getVectorLength = function(x, y, transformation){};
    /**
     * Gets model size of vector specified in device coordinates
     * @param {number} x x position of vector in device coordinates
     * @param {number} y y position of vector in device coordinates
     * @param {!geotoolkit.util.Transformation} transformation context transformation
     * @returns {number}
     */
    geotoolkit.util.GeometryUtil.getVectorLengthInModel = function(x, y, transformation){};

/**
 * The class Math contains methods for performing basic numeric operations and basic algorithms.
 * @class geotoolkit.util.Math
 */
geotoolkit.util.Math = {};
    /**
     * constant for epsilon
     * equal to 1E-10
     */
    geotoolkit.util.Math.epsilon = {};
    /**
     * Calculates log base 10
     * @param {number} val value to calculate log base 10
     * @param {number} [precision = null] the number of digits after the decimal point
     * @param {boolean} [handlenegative = false] set true if handling of negative value and 0 is required when mapping
     * @returns {number}
     * @example
     * geotoolkit.util.Math.log10(-10, null, true) will give -1 result and geotoolkit.util.Math.log10(-10) will be NaN
     */
    geotoolkit.util.Math.log10 = function(val, precision, handlenegative){};
    /**
     * Get sign of specified value
     * @param {number} x current value
     * @returns {number} -1 for negative | 0 for zero | +1 for positive
     */
    geotoolkit.util.Math.sign = function(x){};
    /**
     * Clamp the value to the range
     * @param {number} value current value
     * @param {number} min minimum value
     * @param {number} max maximum value
     * @returns {number} clamped value
     */
    geotoolkit.util.Math.clamp = function(value, min, max){};
    /**
     * Compare two values with specified precision
     * @param {number} v1 1st number to compare
     * @param {number} v2 2nd number to compare
     * @param {number} [epsilon] difference bet 2 numbers to compare
     * @returns {boolean}
     */
    geotoolkit.util.Math.equals = function(v1, v2, epsilon){};
    /**
     * Uses binary search to find an index between 2 indices, that is the closest to the given value.
     * @param {object} value object to find
     * @param {Array<object>} values sorted array on objects
     * @param {number} [fromIndex=0] index to start the search
     * @param {number} [toIndex] index to end search scope
     * @param {function(a, b)} [compareFunction] compare function that defines the sort order. If omitted, the object type must be number.
     * The second parameter passed to this compareFunction is the value passed to findIndex().
     * @returns {number}
     */
    geotoolkit.util.Math.findIndex = function(value, values, fromIndex, toIndex, compareFunction){};
    /**
     * Bezier curves are aften used to model smooth curves. calcCubicBezier Performs cubic Bezier approximation.
     * The control points P1 and P2 are only used to provide directional information.The arc or circle is divided into four equal sections and each section fit to a cubic Bézier curve.
     * When points are spaced far apart approximation is performed based on the precision(flatness) and control points on the same side of vector.
     * @param {geotoolkit.util.Point} first first point
     * @param {geotoolkit.util.Point} p1 control point #1
     * @param {geotoolkit.util.Point} p2 control point #2
     * @param {geotoolkit.util.Point} last last point
     * @param {number} [flatness] precision
     * @returns {Array | undefined} array of interpolated points if "param" is undefined or is an Array instance
     */
    geotoolkit.util.Math.calcCubicBezier = function(first, p1, p2, last, flatness){};
    /**
     * Computes rounded limits using margin percentages as constraints.<br>
     * <br>
     * This function tries to compute a 'smart' range that includes the given min/max.<br>
     * To do so it will try to simplify the decimal part of the given values to the closest value.<br>
     * The original range is always contained in the returned range, meaning that the returned 'low' is lesser than the given min and the returned 'high' is greater than the given max.<br>
     * <br>
     * The given margin parameters will be used to constrain rounding process:<br>
     * <ul>
     * <li>Margin:<br>
     * The margin percentage determines how much margin the algorithm will try to introduce.<br>
     * If the given margin percentage is 10%, then the returned 'high'' will be around:<br>
     * <i>high = max + 10% * (max - min)</i>.<br>
     * </li>
     * <br>
     * <li>Margin tolerance:<br>
     * The margin tolerance percentage determines how much the 'smart rounding' process can change the value computed above.<br>
     * If the given margin percentage is 4%, then the returned 'high' will be in the range:<br>
     * <i>[high - <b>0.02</b> * (max - min), high + <b>0.04</b> * (max - min)]</i>.<br>
     * Note that margin tolerance is applied differently for inner tolerance.<br>
     * <pre>
     * ------------------|-----------<----|-------->
     * max +10% (margin)
     *
     *
     * -2% +4% (margin tolerance)
     * ------------------|-----------<----|-------->
     * high (before rounding)
     * </pre>
     *
     *
     * @param {number} min The minimum value to be rounded
     * @param {number} max The maximum value to be rounded
     * @param {number} [marginPercentage=0.05] Percentage of margin desired
     * @param {number} [marginPercentageTolerance=0.06] Percentage of margin tolerance desired
     * @returns {geotoolkit.util.Range} The computed range
     * @example
     * With default margin :
     * Math.calculateRoundedLimits(347.242, 372.110);
     * => return new geotoolkit.util.Range(345, 374);
     *
     * With bigger margin (10%) :
     * Math.calculateRoundedLimits(347.242, 372.110, 0.10);
     * => return new geotoolkit.util.Range(344, 375);
     *
     * With values close to zero :
     * Math.calculateRoundedLimits(-0.0041, 0.012);
     * => return new geotoolkit.util.Range(-0.005, 0.013);
     */
    geotoolkit.util.Math.calculateRoundedLimits = function(min, max, marginPercentage, marginPercentageTolerance){};
    /**
     * Find a "nice" settings based on "Algorithm for Optimal Scaling on a Chart Axis".
     * @param {number} min minimum value
     * @param {number} max maximum value
     * @param {number} modelStep desired model space between ticks
     * @param {number} [minPadding=0] percentage padding for minimum size based on range
     * @param {number} [maxPadding=0] percentage padding for maximum size based on range
     * @returns {object|null} limits calculated limits
     * @returns {number} [limits.min] calculated minimum limit
     * @returns {number} [limits.max] calculated maximum limit
     * @returns {number} [limits.spacing] calculated step
     * @returns {number} [limits.count] calculated possible amount of ticks
     */
    geotoolkit.util.Math.findNiceLimits = function(min, max, modelStep, minPadding, maxPadding){};
    /**
     * Create a "nice" range based on "Algorithm for Optimal Scaling on a Chart Axis".
     * @param {number} min minimum value
     * @param {number} max maximum value
     * @param {number} desiredNumberOfTicks desired number of ticks
     * @param {number} [minPadding=0] percentage padding for minimum size based on range
     * @param {number} [maxPadding=0] percentage padding for maximum size based on range
     * @returns {object} limits calculated limits
     * @returns {number} [limits.min] calculated minimum limit
     * @returns {number} [limits.max] calculated maximum limit
     * @returns {number} [limits.spacing] calculated step
     * @returns {number} [limits.count] calculated possible amount of ticks
     */
    geotoolkit.util.Math.calculateNiceLimits = function(min, max, desiredNumberOfTicks, minPadding, maxPadding){};
    /**
     * Returns a "nice" number approximately equal to range Rounds
     * the number if round = true takes the ceiling if round = false.
     * @param {number} value input number
     * @param {number} [round=false] round value
     * @returns {number} output number
     */
    geotoolkit.util.Math.niceNumber = function(value, round){};
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
     * @param {number} min The minimum value
     * @param {number} max The maximum value
     * @param {boolean} [logScale=false] If this should use a logarithmic scale instead of linear
     * @param {boolean} [centerOnZeroOnNegativeMin=false] If this should center the limits around 0 if minimum is a negative value
     * @param {boolean} [splitOnZero=false] If this should split neat limits result around 0, applicable only when Math.sign(minimum) != Math.sign(maximum)
     * @returns {geotoolkit.util.Range} The computed neat limits
     */
    geotoolkit.util.Math.calculateNeatLimits = function(min, max, logScale, centerOnZeroOnNegativeMin, splitOnZero){};
    /**
     * Quick sort (in-place).
     * @param {Array<number>|Array<object>} array array of numbers or objects
     * @param {number} lo starting index
     * @param {number} hi ending index (including)
     * @param {function} [comparator=null] optional a function that defines an alternative sort order. The function
     * should return a negative, zero, or positive value, depending on the arguments, like:
     * function(a, b){return a-b}
     * When the sort() method compares two values, it sends the values to the compare function, and
     * sorts the values according to the returned (negative, zero, positive) value.
     * @param {function} [swap=null] optional swap function to swap two elements of collection, like:
     * function(array, i, j) { }
     */
    geotoolkit.util.Math.quickSort = {};
    /**
     * Rounds "src" to relative (see example below) "precision"
     * @param {number} src source value to be rounded
     * @param {!number} precision relative precision
     * @returns {number} rounded value
     * @example
     * var a = 0.0000056789;
     * var resA = geotoolkit.util.Math.roundTo(a, 2); // resA = 0.00000568
     * var b = 56789.56789;
     * var resB = geotoolkit.util.Math.roundTo(b, 2); // resB = 56800
     */
    geotoolkit.util.Math.roundTo = function(src, precision){};
    /**
     * Return the min value of a given array.
     * it internally filter NaN and null values.
     *
     * @param {!Array<number>} arr represents the array.
     * @param {!number} [init=POSITIVE_INFINITY] represents the initial min value
     * @param {number} [nullvalue] A nullvalue to ignore, note that null and NaN are ignored
     * @returns {number} the minimum valid value in the given array.
     */
    geotoolkit.util.Math.getMin = function(arr, init, nullvalue){};
    /**
     * Return the max values of a given array.<br>
     * This function ignores NaN and null values.
     *
     * @param {!Array<number>} arr represents the array.
     * @param {!number} [init=NEGATIVE_INFINITY] represents the initial max value
     * @param {number} [nullvalue] A nullvalue to ignore, note that null and NaN are ignored
     * @returns {number} the minimum valid value in the given array.
     */
    geotoolkit.util.Math.getMax = function(arr, init, nullvalue){};
    /**
     * Get centile
     * @param {Array<number>} values the percent value
     * @param {number} centileNum percentile
     * @returns {number}
     */
    geotoolkit.util.Math.getCentile = function(values, centileNum){};
    /**
     * Return the min and max values of a given array.<br>
     * This function ignores NaN and null values.
     *
     * @param {!Array<number>} arr represents the array
     * @param {Array<number>} [init=[POSITIVE_INFINITY,NEGATIVE_INFINITY]] represents the initials min and max values: [min, max]
     * @param {number} [nullvalue] A nullvalue to ignore, note that null and NaN are ignored
     * @returns {Array<number>} An array containing the [min, max]
     */
    geotoolkit.util.Math.getLimits = function(arr, init, nullvalue){};
    /**
     * Convert degree to radians
     * @param {number} deg The angle in degrees
     * @returns {number} The angle in radians
     */
    geotoolkit.util.Math.degToRad = function(deg){};
    /**
     * Convert radians to degree
     * @param {number} rad The angle in radians
     * @returns {number} The angle in degrees
     */
    geotoolkit.util.Math.radToDeg = function(rad){};
    /**
     * Normalizes the provided angle to be in range [0, 2*PI]
     * @param {number} angle Angle to normalize
     * @returns {number}
     */
    geotoolkit.util.Math.normalizeAngle = function(angle){};
    /**
     * Compute Statistics for a collection
     * @param {Array.<number>} array raw number array
     * @returns {object} statistics
     * @returns {number} [statistics.count] count of samples
     * @returns {number} [statistics.minvalue] minvalue in the collection
     * @returns {number} [statistics.maxvalue] minvalue in the collection
     * @returns {number} [statistics.average] average of the collection
     * @returns {number} [statistics.variance]
     * @returns {number} [statistics.avgdeviation] average deviation
     * @returns {number} [statistics.stddeviation] standard deviation
     * @returns {number} [statistics.skewness]
     * @returns {number} [statistics.kurtosis]
     * @returns {number} [statistics.p10] Theoretical P10 value (centile)
     * @returns {number} [statistics.p50] Theoretical P50 value (centile)
     * @returns {number} [statistics.p90] Theoretical P90 value (centile)
     */
    geotoolkit.util.Math.computeStatistics = function(array){};
    /**
     * Checks if current platform is little endian
     * @returns {boolean}
     */
    geotoolkit.util.Math.isPlatformLittleEndian = function(){};

/**
 * Implements a dimension which is defined by an absolute width and height
 *
 * @class geotoolkit.util.Dimension
 * @param {number|object} [width] Width of dimension or JSON with properties
 * @param {number} [width.width=0] Width of dimension or JSON with properties
 * @param {number} [width.height=0] Height of dimension
 * @param {number} [height=0] Height of dimension
 */
geotoolkit.util.Dimension = {};
    /**
     * return clone object
     * @returns {geotoolkit.util.Dimension} clone
     */
    geotoolkit.util.Dimension.prototype.clone = function(){};
    /**
     * Gets width
     *
     * @returns {number}
     */
    geotoolkit.util.Dimension.prototype.getWidth = function(){};
    /**
     * Gets height
     *
     * @returns {number}
     */
    geotoolkit.util.Dimension.prototype.getHeight = function(){};
    /**
     * Sets width and height
     *
     * @param {number} width desired width
     * @param {number} height desired height
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.util.Dimension.prototype.setSize = function(width, height){};
    /**
     * Round width and height of dimension object and return itself
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.util.Dimension.prototype.round = function(){};
    /**
     * Inflate dimension by the specified amount.
     * @param {number} w the amount to inflate this dimension horizontally.
     * @param {number} h the amount to inflate this dimension vertically.
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.util.Dimension.prototype.inflate = function(w, h){};
    /**
     * returns a string that represents the current dimension.
     * @returns {string}
     */
    geotoolkit.util.Dimension.prototype.toString = function(){};
    /**
     * compares a dimension against this one, if equal returns true
     * @param {geotoolkit.util.Dimension} dimension to check against
     * @param {number} [epsilon=0] acceptance criteria
     * @returns {boolean} if these two dimensions are equal
     */
    geotoolkit.util.Dimension.prototype.equalsDimension = function(dimension, epsilon){};
    /**
     * Returns properties pertaining to dimension
     * @returns {object} obj JSON with properties
     * @returns {number} obj.width Width of the dimension
     * @returns {number} obj.height Height of the dimension
     */
    geotoolkit.util.Dimension.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to dimension
     * @param {object} props JSON with properties
     * @param {number} [props.width] Width of the dimension
     * @param {number} [props.height] Height of the dimension
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.util.Dimension.prototype.setProperties = function(props){};
    /**
     * Create or get dimension from object
     * @param {Object|geotoolkit.util.Dimension} [object] object can be in format of constructor of geotoolkit.util.Dimension
     * @returns {?geotoolkit.util.Dimension} dimension
     */
    geotoolkit.util.Dimension.fromObject = function(object){};

/**
 * Represents a data range, with low and high value
 *
 * @class geotoolkit.util.Range
 * @param {number | geotoolkit.util.Range | object} [low=0] Lower range boundary
 * @param {number} [low.low] Lower range boundary
 * @param {number} [low.high] Upper range boundary
 * @param {number} [high=0] Upper range boundary
 */
geotoolkit.util.Range = {};
    /**
     * returns true if the Ranges are equal
     *
     * @param {geotoolkit.util.Range} range range to compare to
     * @param {number} [epsilon=0] acceptance criteria
     * @returns {boolean} if these two ranges are equal
     */
    geotoolkit.util.Range.prototype.equalsRange = function(range, epsilon){};
    /**
     * Gets upper range boundary
     *
     * @returns {number} high value
     */
    geotoolkit.util.Range.prototype.getHigh = function(){};
    /**
     * Gets lower range boundary
     *
     * @returns {number} lower range boundary
     */
    geotoolkit.util.Range.prototype.getLow = function(){};
    /**
     * Sets upper range boundary
     * @param {number} high New upper boundary
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.util.Range.prototype.setHigh = function(high){};
    /**
     * Sets lower range boundary
     * @param {number} low New low boundary
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.util.Range.prototype.setLow = function(low){};
    /**
     * Sets a new range with given lower and upper boundaries. This method
     * checks if low is less then high otherwise swaps limits
     *
     * @param {number|geotoolkit.util.Range} low Lower range boundary
     * @param {number} [high] Upper range boundary
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.util.Range.prototype.setRange = function(low, high){};
    /**
     * Gets all the properties pertaining to this object
     * @example
     * {'low': 0, 'high': 1}
     * @returns {object} properties
     * @returns {number} properties.low
     * @returns {number} properties.high
     */
    geotoolkit.util.Range.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.low] Lower range boundary
     * @param {number} [properties.high] Upper range boundary
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.util.Range.prototype.setProperties = function(properties){};
    /**
     * Returns string representation
     * @returns {string}
     */
    geotoolkit.util.Range.prototype.toString = function(){};
    /**
     * Return clone object.
     * @returns {geotoolkit.util.Range} clone a copy of this object
     */
    geotoolkit.util.Range.prototype.clone = function(){};
    /**
     * return the size of the range
     * @returns {number}
     */
    geotoolkit.util.Range.prototype.getSize = function(){};
    /**
     * Determines whether or not this Range and the specified Range
     * intersection. Two ranges intersect if their intersection is nonempty.
     *
     * @param {number|geotoolkit.util.Range} low range or lower range boundary
     * @param {number} [high] Upper range boundary
     * @returns {boolean}
     */
    geotoolkit.util.Range.prototype.intersects = function(low, high){};
    /**
     * Determines whether or not this Range and the specified Range
     * intersection. Two ranges intersect if their intersection is nonempty.
     *
     * @param {number|geotoolkit.util.Range} low range or lower range boundary
     * @param {number} [high] Upper range boundary
     * @returns {geotoolkit.util.Range} this
     */
    geotoolkit.util.Range.prototype.intersect = function(low, high){};
    /**
     * Check if range contains another range
     * @param {geotoolkit.util.Range} range The range to check containment with current one
     * @returns {boolean}
     */
    geotoolkit.util.Range.prototype.contains = function(range){};
    /**
     * Union this Range with the specified
     *
     * @param {geotoolkit.util.Range} range The range to union with current one
     */
    geotoolkit.util.Range.prototype.union = function(range){};
    /**
     * Subtract second range from the first range and returns result as array of non-overlapping contiguous ranges.
     * @param {geotoolkit.util.Range} first the first range
     * @param {geotoolkit.util.Range} second range the first range
     * @returns {geotoolkit.util.Range[]} array of ranges
     */
    geotoolkit.util.Range.subtract = function(first, second){};
    /**
     * Create or get range from object
     * @param {Object|geotoolkit.util.Range} [object] object can be in format of constructor of geotoolkit.util.Range
     * @returns {?geotoolkit.util.Range} range
     */
    geotoolkit.util.Range.fromObject = function(object){};

/**
 * Represents an abstract class that specify model area.
 *
 * @class geotoolkit.util.Area
 */
geotoolkit.util.Area = {};
    /**
     * Check if the area contains point
     * @function
     * @param {number|geotoolkit.util.Point} x x position of the point if parameter is a number OR if parameter is a point then it checks if point is inside the rect or not
     * @param {number} [y] y position of the point
     * @returns {boolean}
     * @throws {Error} if illegal argument count
     */
    geotoolkit.util.Area.prototype.contains = function(x, y){};
    /**
     * Return bounds and locks the bounds rect from further editing.
     * @function
     * @returns {geotoolkit.util.Rect|null} bounds
     */
    geotoolkit.util.Area.prototype.getBounds = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.util.Area.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @returns {geotoolkit.util.Area} this
     */
    geotoolkit.util.Area.prototype.setProperties = function(properties){};

/**
 * Represents a rectangle with sides parallel to the axes. This rectangle has methods that allow the geometry
 * to be queried and modified. The geometry that makes up a rectangle consists
 * of two coordinate points that define the diagonal between the left bottom
 * corner and the right top corner. Note that the bottom vertical coordinate is
 * guaranteed to be less than the top vertical coordinate, and that the left
 * horizontal coordinate is less than the right horizontal coordinate.
 *
 * @class geotoolkit.util.Rect
 * @augments geotoolkit.util.Area
 * @param {number|geotoolkit.util.Rect|object} [x1] left or object to copy
 * @param {number} [x1.x] left
 * @param {number} [x1.y] top
 * @param {number} [x1.width] width
 * @param {number} [x1.height] height
 * @param {number} [y1] top
 * @param {number} [x2] right
 * @param {number} [y2] bottom
 *
 * @example
 * var r1 = new geotoolkit.util.Rect({'x': 4,
 * 'y': 3,
 * 'width': 2,
 * 'height': 1
 * });
 *
 * var r2 = new geotoolkit.util.Rect(r1);
 * var r3 = new geotoolkit.util.Rect(4, 3, 6, 4); // x1, y1, x2, y2
 * // r1, r2, and r3 are now equal
 */
geotoolkit.util.Rect = {};
    /**
     * Returns a path shape which represents a rectangle which is defined by this rect
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.util.Rect.prototype.toGeometry = function(){};
    /**
     * Return clone object.
     * @returns {geotoolkit.util.Rect} clone a copy of this object
     */
    geotoolkit.util.Rect.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties
     * @returns {number} properties.x
     * @returns {number} properties.y
     * @returns {number} properties.width
     * @returns {number} properties.height
     */
    geotoolkit.util.Rect.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {boolean} [properties.readonly] readonly flag
     * @param {number} [properties.x] left value
     * @param {number} [properties.y] top value
     * @param {number} [properties.width] width
     * @param {number} [properties.height] height
     * @returns {geotoolkit.util.Rect} this
     */
    geotoolkit.util.Rect.prototype.setProperties = function(properties){};
    /**
     * return Rect state. If true, rect cannot be modified.
     *
     * @returns {boolean} readOnly
     */
    geotoolkit.util.Rect.prototype.isReadOnly = function(){};
    /**
     * protect Rect instance from modification.
     *
     * @returns {geotoolkit.util.Rect} this
     */
    geotoolkit.util.Rect.prototype.lock = function(){};
    /**
     * unlock Rect instance. Will allow modification again.
     *
     * @returns {geotoolkit.util.Rect} this
     */
    geotoolkit.util.Rect.prototype.unlock = function(){};
    /**
     * Intersects this rectangle with the specified one
     *
     * @param {number | geotoolkit.util.Rect} x The x coordinate or rectangle to intersect with
     * @param {number} [y] The y coordinate
     * @param {number} [width] The width
     * @param {number} [height] The height
     * @returns {geotoolkit.util.Rect} this
     * @throws {Error} if the rect is null or if illegal arguments
     */
    geotoolkit.util.Rect.prototype.intersect = function(x, y, width, height){};
    /**
     * Union this Rect with the specified
     * @param {geotoolkit.util.Rect} rect The rect to union with current one
     * @returns {geotoolkit.util.Rect} this
     */
    geotoolkit.util.Rect.prototype.union = function(rect){};
    /**
     * Unions this Rect with the specified x,y-point
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @returns {geotoolkit.util.Rect} this
     */
    geotoolkit.util.Rect.prototype.unionPoint = function(x, y){};
    /**
     * Returns true if rectangles are identical
     *
     * @param {geotoolkit.util.Rect} rect rect to compare to
     * @param {number} [epsilon=0] acceptance criteria
     * @returns {boolean} equals this and rect have same x, y, width, height
     */
    geotoolkit.util.Rect.prototype.equalsRect = function(rect, epsilon){};
    /**
     * Determines whether or not this Rectangle and the specified Rectangle
     * intersection. Two rectangles intersect if their intersection is nonempty.
     *
     * @param {number|geotoolkit.util.Rect} x The x coordinate or another rectangle
     * @param {number} [y] The y coordinate
     * @param {number} [w] The width
     * @param {number} [h] The height
     * @returns {boolean}
     */
    geotoolkit.util.Rect.prototype.intersects = function(x, y, w, h){};
    /**
     * Set left position
     * @param {number} x left position
     * @returns {geotoolkit.util.Rect} this
     */
    geotoolkit.util.Rect.prototype.setX = function(x){};
    /**
     * Set top position
     * @param {number} y top position
     * @returns {geotoolkit.util.Rect} this
     */
    geotoolkit.util.Rect.prototype.setY = function(y){};
    /**
     * Return left position
     * @returns {number}
     */
    geotoolkit.util.Rect.prototype.getX = function(){};
    /**
     * Return top position
     * @returns {number} y
     */
    geotoolkit.util.Rect.prototype.getY = function(){};
    /**
     * Sets width
     * @param {number} w width
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.util.Rect.prototype.setWidth = function(w){};
    /**
     * Sets height
     * @param {number} h height
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.util.Rect.prototype.setHeight = function(h){};
    /**
     * Return height
     * @returns {number}
     */
    geotoolkit.util.Rect.prototype.getHeight = function(){};
    /**
     * Return width
     * @returns {number}
     */
    geotoolkit.util.Rect.prototype.getWidth = function(){};
    /**
     * Return coordinate of left corner
     * @returns {number} x
     */
    geotoolkit.util.Rect.prototype.getLeft = function(){};
    /**
     * Return coordinate of right corner
     * @returns {number} x
     */
    geotoolkit.util.Rect.prototype.getRight = function(){};
    /**
     * Return top coordinate
     * @returns {number} y
     */
    geotoolkit.util.Rect.prototype.getTop = function(){};
    /**
     * Return bottom coordinate (always top < bottom)
     * @returns {number} y
     */
    geotoolkit.util.Rect.prototype.getBottom = function(){};
    /**
     * Return bounds and locks the bounds rect from further editing.
     * @override
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.util.Rect.prototype.getBounds = function(){};
    /**
     * Sets rectangle center
     * @param {number} x X coordinate of the rectangle's center
     * @param {number} y Y coordinate of the rectangle's center
     * @returns {geotoolkit.util.Rect} the actual instance
     */
    geotoolkit.util.Rect.prototype.setCenter = function(x, y){};
    /**
     * Gets X coordinate of the rectangle's center
     *
     * @returns {number} X coordinate of the center
     */
    geotoolkit.util.Rect.prototype.getCenterX = function(){};
    /**
     * Gets Y coordinate of the rectangle's center
     *
     * @returns {number} Y coordinate of the center
     */
    geotoolkit.util.Rect.prototype.getCenterY = function(){};
    /**
     * Gets coordinates of the rectangle's center
     *
     * @returns {geotoolkit.util.Point} coordinates of the center
     */
    geotoolkit.util.Rect.prototype.getCenter = function(){};
    /**
     * Return left top position
     *
     * @returns {geotoolkit.util.Point} a new point to specify left top position
     */
    geotoolkit.util.Rect.prototype.getLeftTop = function(){};
    /**
     * Return left top position
     *
     * @returns {geotoolkit.util.Point} a new point to specify left top position
     */
    geotoolkit.util.Rect.prototype.getRightTop = function(){};
    /**
     * Return right bottom position
     *
     * @returns {geotoolkit.util.Point} a new point to specify right bottom position
     */
    geotoolkit.util.Rect.prototype.getRightBottom = function(){};
    /**
     * Return left bottom position
     *
     * @returns {geotoolkit.util.Point} a new point to specify right bottom position
     */
    geotoolkit.util.Rect.prototype.getLeftBottom = function(){};
    /**
     * Return Left center position
     *
     * @returns {geotoolkit.util.Point} a new point to specify right bottom position
     */
    geotoolkit.util.Rect.prototype.getLeftCenter = function(){};
    /**
     * Return Right center position
     *
     * @returns {geotoolkit.util.Point} a new point to specify right bottom position
     */
    geotoolkit.util.Rect.prototype.getRightCenter = function(){};
    /**
     * Return Top center position
     *
     * @returns {geotoolkit.util.Point} a new point to specify right bottom position
     */
    geotoolkit.util.Rect.prototype.getTopCenter = function(){};
    /**
     * Return Bottom center position
     *
     * @returns {geotoolkit.util.Point} a new point to specify right bottom position
     */
    geotoolkit.util.Rect.prototype.getBottomCenter = function(){};
    /**
     * Sets rectangle
     *
     * @param {number|geotoolkit.util.Rect} x1
     * the x-coordinate of one corner
     * @param {number} [y1]
     * the y-coordinate of one corner
     * @param {number} [x2]
     * the x-coordinate of the opposite corner
     * @param {number} [y2]
     * the y coordinate of the opposite corner
     * @returns {geotoolkit.util.Rect} this
     * @throws {Error} if illegal argument count
     */
    geotoolkit.util.Rect.prototype.setRect = function(x1, y1, x2, y2){};
    /**
     * Check if rectangle contains point
     * @override
     * @param {number|geotoolkit.util.Point} x x position of the point if parameter is a number OR if parameter is a point then it checks if point is inside the rect or not
     * @param {number} [y] y position of the point
     * @returns {boolean}
     * @throws {Error} if illegal argument count
     */
    geotoolkit.util.Rect.prototype.contains = function(x, y){};
    /**
     * Check if rectangle contains rectangle
     * @param {number|geotoolkit.util.Rect} x x positon
     * @param {number} [y] y position
     * @param {number} [w] width
     * @param {number} [h] height
     * @throws {Error} if illegal argument count
     * @returns {boolean}
     */
    geotoolkit.util.Rect.prototype.containsRect = function(x, y, w, h){};
    /**
     * Clips a line by rectangle.
     *
     * a1 [IN] the start position of the line. a2 [IN] the end position of the
     * line. result1 [OUT] the first point of the clipped line. result2 [OUT]
     * the end point of the clipped line. return true if clipped rectangle
     * intersects line or line is inside of the rectangle.
     * @param {geotoolkit.util.Point} a1 the first input point
     * @param {geotoolkit.util.Point} a2 the second input point
     * @param {geotoolkit.util.Point} result1 the first output point
     * @param {geotoolkit.util.Point} result2 the second output point
     * @returns {number} how many times line intersects rectangle
     */
    geotoolkit.util.Rect.prototype.clipLine = function(a1, a2, result1, result2){};
    /**
     * Translates rectangle a specified distance
     * @param {number} tx x translation
     * @param {number} ty y translation
     * @returns {geotoolkit.util.Rect} this
     */
    geotoolkit.util.Rect.prototype.translate = function(tx, ty){};
    /**
     * Inflate rectangle from each side by width and height
     *
     * @param {number} width extend in horizontal direction
     * @param {number} height extend in vertical direction
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.util.Rect.prototype.inflate = function(width, height){};
    /**
     * Inflate rectangle
     *
     * @param {geotoolkit.util.Rect} source rect to be inflated
     * @param {number} w The width to inflate
     * @param {number} h The height to inflate
     * @returns {geotoolkit.util.Rect} a new inflated rectangle
     */
    geotoolkit.util.Rect.inflateRect = function(source, w, h){};
    /**
     * returns Rect state
     * @returns {boolean} true if width or height == 0
     */
    geotoolkit.util.Rect.prototype.isEmpty = function(){};
    /**
     * Round this rectangle to integer values for coordinates.
     * This method sets the largest whole numbers less than or equal to the current
     * values of left-top corner and sets the smallest whole numbers greater than or equal
     * to the current values of right-bottom corner of the rectangle.
     * @returns {geotoolkit.util.Rect} this
     */
    geotoolkit.util.Rect.prototype.round = function(){};
    /**
     * Returns string like: "Rect: x1,y1:x2,y2
     * With x1 left
     * With y1 top
     * With x2 right
     * With y2 bottom
     * @returns {string} string value
     */
    geotoolkit.util.Rect.prototype.toString = function(){};
    /**
     * Merges provided rectangular areas according to the operation applied.
     *
     * @param {!geotoolkit.util.Rect} oldRect 1st rect to merge
     * @param {!geotoolkit.util.Rect} newRect 2nd rect to merge
     * @param {geotoolkit.util.GeometryOperation} [operation=geotoolkit.util.GeometryOperation.Replace] operation to be performed on the new rect
     * @param {geotoolkit.util.Rect} [dstRect] destination rectangular geometry
     *
     * @returns {!geotoolkit.util.Rect} merged rectangular geometry
     * @throws {Error} if either of the rects provided is null
     */
    geotoolkit.util.Rect.merge = function(oldRect, newRect, operation, dstRect){};
    /**
     * Merges with provided rectangular area according to the operation applied.
     *
     * @param {!geotoolkit.util.Rect} newRect rect to be merged with the current
     * @param {geotoolkit.util.GeometryOperation} [operation=geotoolkit.util.GeometryOperation.Replace] operation to apply
     *
     * @returns {geotoolkit.util.Rect} this
     * @throws {Error} if the rects provided is null
     */
    geotoolkit.util.Rect.prototype.merge = function(newRect, operation){};
    /**
     * Check if rectangle1 contains rectangle2
     * @param {geotoolkit.util.Rect} rect1 rectangle 1
     * @param {geotoolkit.util.Rect} rect2 rectangle 2
     * @returns {boolean} true if contains, else false
     */
    geotoolkit.util.Rect.containsRect = function(rect1, rect2){};
    /**
     * Check if rectangle1 intersects rectangle2
     * @param {geotoolkit.util.Rect} rect1 rectangle 1
     * @param {geotoolkit.util.Rect} rect2 rectangle 2
     * @returns {boolean} true if intersects, else false
     */
    geotoolkit.util.Rect.intersectsRect = function(rect1, rect2){};
    /**
     * Check if rectangle contains polygon
     * @param {geotoolkit.util.Polygon} polygon polygon
     * @returns {boolean} true if contains, else false
     */
    geotoolkit.util.Rect.prototype.containsPolygon = function(polygon){};
    /**
     * Check if rectangle intersects polygon
     * @param {geotoolkit.util.Polygon} polygon polygon
     * @returns {boolean} true if intersects, else false
     */
    geotoolkit.util.Rect.prototype.intersectsPolygon = function(polygon){};
    /**
     * Casts rectangle to polygon
     * @returns {geotoolkit.util.Polygon} polygon
     */
    geotoolkit.util.Rect.prototype.toPolygon = function(){};
    /**
     * Create or get rect from object
     * @param {Object|geotoolkit.util.Rect} [object] object can be in format of constructor of geotoolkit.util.Rect
     * @returns {?geotoolkit.util.Rect} rect
     */
    geotoolkit.util.Rect.fromObject = function(object){};
    /**
     * Get diagonal length of rectangle
     * @returns {number} diagonal length
     */
    geotoolkit.util.Rect.prototype.getDiagonalLength = function(){};
    /**
     * Empty rectangle
     * @type {geotoolkit.util.Rect}
     */
    geotoolkit.util.Rect.Empty = {};
    /**
     * Unitsquare (0, 0, 1, 1)
     * @type {geotoolkit.util.Rect}
     */
    geotoolkit.util.Rect.UnitSquare = {};

/**
 * Represents a polygon with methods that allow the geometry of the polygon
 * to be queried and modified.
 *
 * @class geotoolkit.util.Polygon
 * @augments geotoolkit.util.Area
 * @param {Array<number>} [x] x coordinates
 * @param {Array<number>} [y] y coordinates
 * @param {boolean} [evenOddMode] even odd mode
 */
geotoolkit.util.Polygon = {};
    /**
     * Return bounds and locks the bounds rect from further editing.
     * @override
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.util.Polygon.prototype.getBounds = function(){};
    /**
     * Sets arrays of points. Will overwrite any exisitng points in this polygon.
     *
     * @param {number[]} x array of x coordinates
     * @param {number[]} y array of y coordinates
     * @returns {geotoolkit.util.Polygon}
     */
    geotoolkit.util.Polygon.prototype.setCoordinates = function(x, y){};
    /**
     * Add point to array of points.
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    geotoolkit.util.Polygon.prototype.push = function(x, y){};
    /**
     * Gets x-coords of points
     * @returns {number[]} array of x-coordinates
     */
    geotoolkit.util.Polygon.prototype.getPointsX = function(){};
    /**
     * Gets y-coords of points
     * @returns {number[]} array of y-coordinates
     */
    geotoolkit.util.Polygon.prototype.getPointsY = function(){};
    /**
     * Gets number of points
     * @returns {number} points the number of points in this polygon
     */
    geotoolkit.util.Polygon.prototype.getSize = function(){};
    /**
     * Set even odd mode
     * @param {boolean} mode even odd mode
     * @returns {geotoolkit.util.Polygon}
     */
    geotoolkit.util.Polygon.prototype.setEvenOddMode = function(mode){};
    /**
     * Get even odd mode
     * @returns {boolean} will this use even odd mode or not
     */
    geotoolkit.util.Polygon.prototype.getEvenOddMode = function(){};
    /**
     * Check if polygon contains point
     * @override
     * @param {number|geotoolkit.util.Point} x x position of the point if parameter is a number OR if parameter is a point then it checks if point is inside the rect or not
     * @param {number} [y] y position of the point
     * @returns {boolean}
     * @throws {Error} if illegal argument count
     */
    geotoolkit.util.Polygon.prototype.contains = function(x, y){};
    /**
     * Check if polygon contains polygon
     * @param {geotoolkit.util.Polygon} polygon polygon
     * @returns {boolean} true if contains, else false
     */
    geotoolkit.util.Polygon.prototype.containsPolygon = function(polygon){};
    /**
     * Check if polygon intersects polygon
     * @param {geotoolkit.util.Polygon} polygon polygon
     * @returns {boolean} true if intersects, else false
     */
    geotoolkit.util.Polygon.prototype.intersectsPolygon = function(polygon){};
    /**
     * Check if polygon contains rectangle
     * @param {geotoolkit.util.Rect} rectangle rectangle
     * @returns {boolean} true if contains, else false
     */
    geotoolkit.util.Polygon.prototype.containsRectangle = function(rectangle){};
    /**
     * Check if polygon intersects rectangle
     * @param {geotoolkit.util.Rect} rectangle rectangle
     * @returns {boolean} true if intersects, else false
     */
    geotoolkit.util.Polygon.prototype.intersectsRectangle = function(rectangle){};
    /**
     * Clone polygon
     * @returns {geotoolkit.util.Polygon} polygon
     */
    geotoolkit.util.Polygon.prototype.clone = function(){};
    /**
     * Intersects polygon with the rectangle and leaves only the inner part of polygon
     * WARNING! The result might have self-intersections in some cases
     * @param {geotoolkit.util.Rect} rectangle rectangle
     * @returns {geotoolkit.util.Polygon} this
     */
    geotoolkit.util.Polygon.prototype.intersectRectangle = function(rectangle){};

/**
 * Create transformation matrix
 *
 * @class geotoolkit.util.Transformation
 * @param {number} [xx] x scale
 * @param {number} [yx] yx skew
 * @param {number} [xy] xy skew
 * @param {number} [yy] y scale
 * @param {number} [dx] x axis translation
 * @param {number} [dy] y axis translation
 */
geotoolkit.util.Transformation = {};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.util.Transformation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.xx] x scale
     * @param {number} [properties.yx] yx skew
     * @param {number} [properties.xy] xy skew
     * @param {number} [properties.yy] y scale
     * @param {number} [properties.dx] x axis translation
     * @param {number} [properties.dy] y axis translation
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.setProperties = function(properties){};
    /**
     * Transform point defined by two coordinates X and Y
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.util.Transformation.prototype.transformXY = function(x, y){};
    /**
     * Inverse transform point defined by two coordinates X and Y
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.util.Transformation.prototype.inverseTransformXY = function(x, y){};
    /**
     * Transforms from one point, rect, or dimension to another
     *
     * @param {number|geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension} source origin to be transformed from
     * @param {number|geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension} [destination] destination rectangle
     * @returns {number|geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension} transformation from source to destination
     */
    geotoolkit.util.Transformation.prototype.transform = function(source, destination){};
    /**
     * Performs an inverse transform using points, rect or dimension
     *
     * @param {geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension} source source rect
     * @param {geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension|null} [destination] destination rect
     * @returns {geotoolkit.util.Point|geotoolkit.util.Rect|geotoolkit.util.Dimension} transformation from source to destination
     */
    geotoolkit.util.Transformation.prototype.inverseTransform = function(source, destination){};
    /**
     * Transform rectangle
     *
     * @param {geotoolkit.util.Rect} source source rectangle
     * @param {geotoolkit.util.Rect} [destination] destination rectangle
     * @returns {geotoolkit.util.Rect|null}
     * @throws {Error} if destination is readonly mode
     */
    geotoolkit.util.Transformation.prototype.transformRect = function(source, destination){};
    /**
     * Sets rect to rect transformation
     *
     * @param {geotoolkit.util.Rect} source source rectangle
     * @param {geotoolkit.util.Rect} destination destination rectangle
     * @param {boolean} [horizontalFlip] horizontal flip
     * @param {boolean} [verticalFlip] vertical flip
     * @param {boolean} [aspectRatio] keeps aspect ratio
     * @throws {Error} if illegal source or destination rectangle
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.setRectToRectTransformation = function(source, destination, horizontalFlip, verticalFlip, aspectRatio){};
    /**
     * Inverse transform rectangle
     * @param {geotoolkit.util.Rect} source source rectangle
     * @param {geotoolkit.util.Rect} [destination] destination rectangle
     * @returns {geotoolkit.util.Rect} the transformed rect
     */
    geotoolkit.util.Transformation.prototype.inverseTransformRect = function(source, destination){};
    /**
     * Transform point
     *
     * @param {geotoolkit.util.Point} src
     * source point to transform
     * @param {geotoolkit.util.Point} [dst] optional returned transformed point
     * @returns {geotoolkit.util.Point} the transformed point
     */
    geotoolkit.util.Transformation.prototype.transformPoint = function(src, dst){};
    /**
     * Inverse transforms the specified point
     * @param {geotoolkit.util.Point} sourcePoint source point to transform
     * @param {geotoolkit.util.Point} [destinationPoint] optional destination point
     * @returns {geotoolkit.util.Point} the result of the inverse transform.
     */
    geotoolkit.util.Transformation.prototype.inverseTransformPoint = function(sourcePoint, destinationPoint){};
    /**
     * Inverse transforms the specified dimension
     *
     * @param {geotoolkit.util.Dimension} sourceSize the point to be inverse transformed
     * @param {geotoolkit.util.Dimension} [targetSize] the size to hold the transformed point
     * @returns {geotoolkit.util.Dimension} the result of the transform.
     */
    geotoolkit.util.Transformation.prototype.transformDimension = function(sourceSize, targetSize){};
    /**
     * Inverse transforms the specified dimension
     * @param {geotoolkit.util.Dimension} sourceSize
     * the point to be inverse transformed
     * @param {geotoolkit.util.Dimension} [targetSize] the size to hold the transformed point
     * @returns {geotoolkit.util.Dimension} the result of the inverse transform.
     */
    geotoolkit.util.Transformation.prototype.inverseTransformDimension = function(sourceSize, targetSize){};
    /**
     * Resets this transform to the Identity transform.
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.setToIdentity = function(){};
    /**
     * Returns X Scale(xx)
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.getScaleX = function(){};
    /**
     * Returns Y Scale(yy)
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.getScaleY = function(){};
    /**
     * Sets X & Y Scale by xx and yy
     * @param {number} xx x scale
     * @param {number} yy y scale
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.setScale = function(xx, yy){};
    /**
     * Returns X sheer (xy)
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.getShearX = function(){};
    /**
     * Returns Y sheer (yx)
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.getShearY = function(){};
    /**
     * Returns X translation (dx)
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.getTranslateX = function(){};
    /**
     * Returns Y translation (dy)
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.getTranslateY = function(){};
    /**
     * Returns translation in both X & Y (dx, dy)
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.util.Transformation.prototype.getTranslate = function(){};
    /**
     * Sets X & Y translation by dx and dy
     * @param {number} dx x offset
     * @param {number} dy y offset
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.setTranslate = function(dx, dy){};
    /**
     * Returns matrix determinant
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.getDeterminant = function(){};
    /**
     * Pre-concatenates transformation matrix with Tx
     * @param {geotoolkit.util.Transformation} Tx transformation
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.preConcatenate = function(Tx){};
    /**
     * Is rotated transformation
     * @returns {boolean} rotation flag
     */
    geotoolkit.util.Transformation.prototype.isRotated = function(){};
    /**
     * Is identity transformation
     * @returns {boolean} is this identity transformation.
     */
    geotoolkit.util.Transformation.prototype.isIdentity = function(){};
    /**
     * Concatenates Tx to transformation
     * @param {geotoolkit.util.Transformation} Tx transformation
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.concatenate = function(Tx){};
    /**
     * Sets transformation
     * @param {number} [xx] x scale
     * @param {number} [yx] yx skew
     * @param {number} [xy] xy skew
     * @param {number} [yy] y scale
     * @param {number} [dx] x axis translation
     * @param {number} [dy] y axis translation
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.setTransformation = function(xx, yx, xy, yy, dx, dy){};
    /**
     * Create inverse transformation
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.util.Transformation.prototype.createInverse = function(){};
    /**
     * Rotate
     *
     * @param {number} theta angle to rotate
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.rotate = function(theta){};
    /**
     * Translate
     * @param {number} tx x offset along x coordinate
     * @param {number} ty y offset along y coordinate
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.translate = function(tx, ty){};
    /**
     * Scale
     * @param {number} sx scale factor along x coordinate
     * @param {number} sy scale factor along y coordinate
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.scale = function(sx, sy){};
    /**
     * Applies a shear mapping to the transform
     *
     * @param {number} shx shear coefficient along x coordinate
     * @param {number} shy shear coefficient along y coordinate
     * @returns {geotoolkit.util.Transformation} this
     */
    geotoolkit.util.Transformation.prototype.shear = function(shx, shy){};
    /**
     * Transform a set of point defined by two arrays
     *
     * @param {Array<number>} x an array of x-coordinates
     * @param {Array<number>} y an array of y-coordinates
     * @param {number} count a count of point to transform
     */
    geotoolkit.util.Transformation.prototype.transformPoints = function(x, y, count){};
    /**
     * Apply X transformation do x,y
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.transformX = function(x, y){};
    /**
     * Apply Y transformation do x,y
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.transformY = function(x, y){};
    /**
     * Transforms GraphicsPath
     *
     * @param {geotoolkit.renderer.GraphicsPath} srcPath source path to transform
     * @param {geotoolkit.renderer.GraphicsPath} [dstPath] transformed path
     * @returns {geotoolkit.renderer.GraphicsPath} transformed path
     */
    geotoolkit.util.Transformation.prototype.transformPath = function(srcPath, dstPath){};
    /**
     * Return true if transformation are identical
     * @param {geotoolkit.util.Transformation} Tx transformation
     * @returns {boolean}
     */
    geotoolkit.util.Transformation.prototype.fastEquals = function(Tx){};
    /**
     * Return length to X ratio
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.getLengthToXRatioAt = function(){};
    /**
     * Return length to Y ratio
     * @returns {number}
     */
    geotoolkit.util.Transformation.prototype.getLengthToYRatioAt = function(){};
    /**
     * Return clone object.
     * @returns {geotoolkit.util.Transformation} a copy of this transformation
     */
    geotoolkit.util.Transformation.prototype.clone = function(){};
    /**
     * Gets translate instance
     *
     * @param {!number} x x coordinate
     * @param {!number} y y coordinate
     * @param {geotoolkit.util.Transformation} [dst] destination transformation object
     * @returns {geotoolkit.util.Transformation} new transformation
     */
    geotoolkit.util.Transformation.getTranslateInstance = function(x, y, dst){};
    /**
     * Gets rotate instance
     *
     * @param {!number} theta angle
     * @param {!number} x x coordinate
     * @param {!number} y y coordinate
     * @param {geotoolkit.util.Transformation} [dst] destination transformation object
     * @returns {geotoolkit.util.Transformation} new transformation
     */
    geotoolkit.util.Transformation.getRotateInstance = function(theta, x, y, dst){};
    /**
     * Gets rect to rect transformation
     *
     * @param {!geotoolkit.util.Rect} source source rectangle
     * @param {!geotoolkit.util.Rect} destination destination rectangle
     * @param {boolean} [horizontalFlip] horizontal flip
     * @param {boolean} [verticalFlip] vertical flip
     * @param {boolean} [aspectRatio] keeps aspect ratio
     * @param {geotoolkit.util.Transformation} [dst] destination transformation object
     * @returns {geotoolkit.util.Transformation} new transformation
     */
    geotoolkit.util.Transformation.getRectToRectInstance = function(source, destination, horizontalFlip, verticalFlip, aspectRatio, dst){};
    /**
     * Return true if transformation can be created from source rectangle to destination rectangle.
     * Vertical or horizontal dimension can be empty
     * @param {geotoolkit.util.Rect} source source rectangle
     * @param {geotoolkit.util.Rect} destination destination rectangle
     * @returns {boolean}
     */
    geotoolkit.util.Transformation.canCreateRectToRectInstance = function(source, destination){};
    /**
     * Get a new transformation instance based on scale values
     * @param {!number} scaleX scale factor along x coordinate
     * @param {!number} scaleY scale factor along y coordinate
     * @param {geotoolkit.util.Transformation} [dst] destination transformation object
     * @returns {geotoolkit.util.Transformation} new transformation
     */
    geotoolkit.util.Transformation.getScaleInstance = function(scaleX, scaleY, dst){};
    /**
     * Get a new transformation instance based on shear values
     * @param {!number} shx shear coefficient along x coordinate
     * @param {!number} shy shear coefficient along y coordinate
     * @param {geotoolkit.util.Transformation} [dst] destination transformation object
     * @returns {geotoolkit.util.Transformation} new transformation
     */
    geotoolkit.util.Transformation.getShearInstance = function(shx, shy, dst){};
    /**
     * Multiply two matrices
     *
     * @param {!geotoolkit.util.Transformation} a
     * the first matrix
     * @param {!geotoolkit.util.Transformation} b
     * the second matrix
     * @param {geotoolkit.util.Transformation} [dst] destination transformation object
     * @returns {geotoolkit.util.Transformation} new transformation
     */
    geotoolkit.util.Transformation.multiply = function(a, b, dst){};
    /**
     * Divide two matrices
     *
     * @param {!geotoolkit.util.Transformation} a
     * the first matrix
     * @param {!geotoolkit.util.Transformation} b
     * the second matrix
     * @param {geotoolkit.util.Transformation} [dst] destination transformation object
     * @returns {geotoolkit.util.Transformation} new transformation
     */
    geotoolkit.util.Transformation.divide = function(a, b, dst){};
    /**
     * Returns transformation parameters as one string
     * @returns {string}
     */
    geotoolkit.util.Transformation.prototype.toString = function(){};

/**
 * An interface that represents an unit
 *
 * @class geotoolkit.util.AbstractUnit
 */
geotoolkit.util.AbstractUnit = {};
    /**
     * Convert unit value from base unit
     *
     * @function
     * @abstract
     * @param {number} value value to be converted
     * @returns {number} converted
     */
    geotoolkit.util.AbstractUnit.prototype.fromBaseUnit = function(value){};
    /**
     * Convert unit value to base unit
     *
     * @function
     * @abstract
     * @param {number} value value to be converted
     * @returns {number} converted
     */
    geotoolkit.util.AbstractUnit.prototype.toBaseUnit = function(value){};
    /**
     * Unit symbol
     *
     * @function
     * @abstract
     * @returns {string} unit symbol
     */
    geotoolkit.util.AbstractUnit.prototype.getSymbol = function(){};
    /**
     * get the Quantity types of the unit
     *
     * @function
     * @abstract
     * @returns {Array.<string>} quantity types
     */
    geotoolkit.util.AbstractUnit.prototype.getQuantityType = function(){};
    /**
     * Returns unit name
     *
     * @function
     * @abstract
     * @returns {string} unit name
     */
    geotoolkit.util.AbstractUnit.prototype.getName = function(){};
    /**
     * Returns unit description
     *
     * @function
     * @abstract
     * @returns {string} unit name
     */
    geotoolkit.util.AbstractUnit.prototype.getDescription = function(){};
    /**
     * Convert the value to a specific unit if <code>canConvertTo</code>
     *
     * @function
     * @param {number|Array.<number>} value value to be converted
     * @param {geotoolkit.util.AbstractUnit|string} other other unit to be converted
     * @returns {number|Array.<number>} converted
     */
    geotoolkit.util.AbstractUnit.prototype.convert = function(value, other){};
    /**
     * Check if a unit can be converted from the current unit
     *
     * @function
     * @param {geotoolkit.util.AbstractUnit|string} other unit to be converted
     * @returns {boolean} true if a unit can be converted from the specific unit
     */
    geotoolkit.util.AbstractUnit.prototype.canConvertTo = function(other){};
    /**
     * Check if the unit belongs to the type
     *
     * @function
     * @abstract
     * @param {string} type quantity type to be tested
     * @returns {boolean} result
     */
    geotoolkit.util.AbstractUnit.prototype.belongsTo = function(type){};
    /**
     * Compares this unit with another unit
     * @function
     * @param {geotoolkit.util.AbstractUnit|string} other
     * @returns {boolean}
     */
    geotoolkit.util.AbstractUnit.prototype.sameAs = function(other){};
    /**
     * Returns base unit symbol
     * @function
     * @abstract
     * @returns {string} base unit symbol
     */
    geotoolkit.util.AbstractUnit.prototype.getBaseUnitSymbol = function(){};

/**
 * Defines an interface, which represents an unit of measure,
 * the ratio for new unit is computed with: y= (a+b*x)/(c+d*x)
 *
 * @class geotoolkit.util.Unit
 * @augments geotoolkit.util.AbstractUnit
 * @param {string|geotoolkit.util.Unit|Object} name represent the name of the unit (example : 'pint')
 * @param {Array.<string>} [quantityType] represent the quantity type of the unit like length, time, pressure etc. (example: 'volume')
 * @param {string} [symbol] symbol to represent the unit (example: 'pt' to represent pint)
 * @param {string} [baseUnitSymbol] represents the unit symbol of it's base unit (example for volume, 'm3' can be the base unit)
 * @param {number} [a] factor
 * @param {number} [b] factor
 * @param {number} [c] factor
 * @param {number} [d] factor
 * @param {string} [description] It represents the description of unit
 */
geotoolkit.util.Unit = {};
    /**
     * Converts value from base unit and gives value in current unit
     * @param {number} value value to be converted
     * @returns {number}
     */
    geotoolkit.util.Unit.prototype.fromBaseUnit = function(value){};
    /**
     * Converts value from current unit to base unit
     * @param {number} value value to be converted
     * @returns {number}
     */
    geotoolkit.util.Unit.prototype.toBaseUnit = function(value){};
    /**
     * Returns the quantityTypes of this unit
     * @returns {Array.<string>}
     */
    geotoolkit.util.Unit.prototype.getQuantityType = function(){};
    /**
     * Returns the symbol of this unit
     * @returns {string}
     */
    geotoolkit.util.Unit.prototype.getSymbol = function(){};
    /**
     * Returns baseUnitSymbol of this unit
     * @returns {string}
     */
    geotoolkit.util.Unit.prototype.getBaseUnitSymbol = function(){};
    /**
     * Returns the name of the unit
     * @returns {string}
     */
    geotoolkit.util.Unit.prototype.getName = function(){};
    /**
     * Returns the description of the unit
     * @returns {string} unit name
     */
    geotoolkit.util.Unit.prototype.getDescription = function(){};
    /**
     * Convert value to other unit if conversation is possible and giver converted value(s) in other unit
     * @param {number|Array.<number>} value specific value(s) to be converted to other unit
     * @param {geotoolkit.util.AbstractUnit|string} other represents the other unit to which the values will be converted
     * @returns {number|Array.<number>}
     */
    geotoolkit.util.Unit.prototype.convert = function(value, other){};
    /**
     * Returns whether the unit conversation is possible from this unit to other unit
     * @param {geotoolkit.util.AbstractUnit|string} other unit to be converted
     * @returns {boolean}
     */
    geotoolkit.util.Unit.prototype.canConvertTo = function(other){};
    /**
     * Returns whether current unit belongs to the specified type(s)
     * @param {string|Array.<string>} type quantityType(s) to be tested
     * @returns {boolean}
     */
    geotoolkit.util.Unit.prototype.belongsTo = function(type){};
    /**
     * Returns whether this unit is similar to other unit
     * @param {geotoolkit.util.AbstractUnit|string} other
     * @returns {boolean}
     */
    geotoolkit.util.Unit.prototype.sameAs = function(other){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.util.Unit.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {Object} properties An object containing the properties to set
     * @param {string|geotoolkit.util.Unit|Object} [properties.name] represent the name of the unit (example : 'pint')
     * @param {Array.<string>} [properties.quantitytype] represent the quantity type of the unit like length, time, pressure etc. (example: 'volume')
     * @param {string} [properties.symbol] symbol to represent the unit (example: 'pt' to represent pint)
     * @param {string} [properties.baseunitsymbol] represents the unit symbol of it's base unit (example for volume, 'm3' can be the base unit)
     * @param {number} [properties.a] factor
     * @param {number} [properties.b] factor
     * @param {number} [properties.c] factor
     * @param {number} [properties.d] factor
     * @param {string} [properties.description] It represents the description of unit
     * @returns {geotoolkit.util.Unit} this
     */
    geotoolkit.util.Unit.prototype.setProperties = function(properties){};
    /**
     * Returns a clone of the unit.
     * @returns {geotoolkit.util.Unit} clone
     */
    geotoolkit.util.Unit.prototype.clone = function(){};

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
 *
 * @example
 * var unit = factory.getUnit('foot');
 * //unit is named unit.getName(), and display a unit.getQuantityType() in unit.getSymbol()
 * //convert to another length unit:
 * unit.convert(1500.00, 'm'); //1500.00 ft = 457.20 m
 *
 * //Add new unit for your own use
 * factory.addUnit({
 * //information about the new Unit
 * 'name': "pint",
 * 'quantityType': "volume", //or create your own
 * 'symbol': "pt",
 * 'description': "drink responsibly",
 * //Computation Detail : newunit = (a+b*base)/(c+d*base)
 * 'baseUnitSymbol': "m3",
 * 'a': 0, 'b': 0.000473176, 'c': 1, 'd': 0
 * });
 *@class geotoolkit.util.UnitFactory
 */
geotoolkit.util.UnitFactory = {};
    /**
     * Returns the time stamp (version) of unit factory. This value will be updated whenever modification made.
     * @returns {number}
     */
    geotoolkit.util.UnitFactory.prototype.getTimeStamp = function(){};
    /**
     * Returns an instance of unit based on specified information
     * @param {string | geotoolkit.util.AbstractUnit} value represent the {string} name, {string} symbol or {geotoolkit.util.AbstractUnit} unit to be created
     * @param {Array.<string>} [quantityType] expected quantity types
     * @param {boolean} [nullIfNotExist=false] return null if unit does not exist instead of returning a user-defined unit
     * @returns {geotoolkit.util.AbstractUnit|null}
     */
    geotoolkit.util.UnitFactory.prototype.getUnit = function(value, quantityType, nullIfNotExist){};
    /**
     * Return array of unit symbols by class name
     * @param {string} name class name
     * @returns {Array.<string>}
     */
    geotoolkit.util.UnitFactory.prototype.getUnitSymbolsByClass = function(name){};
    /**
     * Returns all convertable unit symbols
     * @param {geotoolkit.util.AbstractUnit|string} unit unit to convert from/to
     * @returns {Array.<string>}
     */
    geotoolkit.util.UnitFactory.prototype.getConvertableUnitSymbols = function(unit){};
    /**
     * Clears all units from unit factory except CSS units (pixel, point and pica)
     * @returns {geotoolkit.util.UnitFactory} this
     */
    geotoolkit.util.UnitFactory.prototype.clearUnits = function(){};
    /**
     * Add a unit to factory. please reference the constructor in {@link geotoolkit.util.Unit} for more details.
     * @param {string|geotoolkit.util.AbstractUnit|object} name unit name or unit inherited from AbstractUnit
     * @param {Array.<string>|string} quantityType expected quantity type
     * @param {string} symbol unit symbol
     * @param {string} baseUnitSymbol base unit symbol
     * @param {number} a factor
     * @param {number} b factor
     * @param {number} c factor
     * @param {number} d factor
     * @param {string} [description] description of the unit
     * @returns {geotoolkit.util.UnitFactory} this
     */
    geotoolkit.util.UnitFactory.prototype.addUnit = function(name, quantityType, symbol, baseUnitSymbol, a, b, c, d, description){};
    /**
     * Clears all unit classes from unit factory
     * @returns {geotoolkit.util.UnitFactory} this
     */
    geotoolkit.util.UnitFactory.prototype.clearUnitClasses = function(){};
    /**
     * Adds a unit class to unit factory
     * @param {string} name unit name
     * @param {string} baseUnitSymbol base unit symbol
     * @param {Array.<string>} unitSymbols array of unit symbols
     * @returns {geotoolkit.util.UnitFactory} this
     */
    geotoolkit.util.UnitFactory.prototype.addUnitClass = function(name, baseUnitSymbol, unitSymbols){};
    /**
     * Clears all unit alias from unit factory
     * @returns {geotoolkit.util.UnitFactory} this
     */
    geotoolkit.util.UnitFactory.prototype.clearUnitAlias = function(){};
    /**
     * Adds a unit alias to unit factory
     * @param {string} baseUnitSymbol base unit symbol
     * @param {string | boolean} isCaseSensitive case sensitivity flag
     * @param {Array.<string>| string} [alias] alias unit symbols
     * @returns {geotoolkit.util.UnitFactory} this
     */
    geotoolkit.util.UnitFactory.prototype.addUnitAlias = function(baseUnitSymbol, isCaseSensitive, alias){};
    /**
     * Adds device PPI list
     * @param {Array.<object>} list each JSON object should be <pre>{'device': 'device name', 'ppi': 96, 'ppcp': 1, 'accept': function}. </pre> Accept function returns true if device matched.
     * @returns {geotoolkit.util.UnitFactory} this
     */
    geotoolkit.util.UnitFactory.prototype.addDevicePPIList = function(list){};
    /**
     * Clears device PPI list
     * @returns {geotoolkit.util.UnitFactory} this
     */
    geotoolkit.util.UnitFactory.prototype.clearDevicePPIList = function(){};
    /**
     * Returns physical pixels per inch of the device
     * @returns {number}
     */
    geotoolkit.util.UnitFactory.prototype.getPPI = function(){};
    /**
     * Sets physical pixels per inch of the device
     * @param {number} ppi pixel per inch
     * @param {number} ppcp pixel per css pixel (sometimes different from geotoolkit.window.devicePixelRatio)
     * @returns {geotoolkit.util.UnitFactory} this
     */
    geotoolkit.util.UnitFactory.prototype.setPPI = function(ppi, ppcp){};
    /**
     * Returns the number of CSS pixels (browser) per physical inch (device)
     * CSS pixels per physical inch is different from pixels per inch of the device.
     * It considers operating system and browser scaling and the ratio between browser inch and physical device inch
     * @returns {number}
     */
    geotoolkit.util.UnitFactory.prototype.getCSSPixelPerInch = function(){};
    /**
     * Updates CSS pixels per physical inch
     * @returns {geotoolkit.util.UnitFactory} this
     */
    geotoolkit.util.UnitFactory.prototype.updateDevicePPI = function(){};
    /**
     * Returns instance of unit factory
     * @returns {geotoolkit.util.UnitFactory} factory
     */
    geotoolkit.util.UnitFactory.getInstance = function(){};

/**
 * This class provides a Timer feature. It uses the browser's native capabilities to implement a Timer mechanism that will notify the given callback at the given rate.
 * Calling code is responsible for stopping the timer to dispose it cleanly.
 *
 * @class geotoolkit.util.Timer
 * @param {number} [interval] interval between ticks in ms. Default is 1000 ms.
 * @param {function()} [listener] function to be called for each tick
 */
geotoolkit.util.Timer = {};
    /**
     * Start timer
     * @returns {geotoolkit.util.Timer} this
     */
    geotoolkit.util.Timer.prototype.start = function(){};
    /**
     * Stop timer
     */
    geotoolkit.util.Timer.prototype.stop = function(){};
    /**
     * Return true if timer is started
     * @returns {boolean} if timer is started
     */
    geotoolkit.util.Timer.prototype.isStarted = function(){};
    /**
     * Sets interval of the timer in ms. The given interval will not be applied if the Timer is already started. One should stop and restart the timer to make this change effective.
     * @param {number} interval interval
     */
    geotoolkit.util.Timer.prototype.setInterval = function(interval){};
    /**
     * Return time interval im ms between ticks
     * @returns {number} time interval
     */
    geotoolkit.util.Timer.prototype.getInterval = function(){};
    /**
     * Sets listener
     * @param {function()} listener function to be called for each tick
     */
    geotoolkit.util.Timer.prototype.setListener = function(listener){};

/**
 * Defines sender of the events. This class implements a dispatcher/listeners pattern. It's inherited by many classes of the toolkit that requires to send events.<br>
 * Listeners are callbacks(functions) that can be added and removed at any time. Those will be notified when the corresponding event-type is fired on this object.
 *
 * @class geotoolkit.util.EventDispatcher
 */
geotoolkit.util.EventDispatcher = {};
    /**
     * EventDispatcher Events
     * @readonly
     * @enum
     */
    geotoolkit.util.EventDispatcher.Events = {};
        /**
         * This Event is fired when the property was changed
         * @type {string}
         */
        geotoolkit.util.EventDispatcher.Events.PropertyChanged = "";
    /**
     * Dispose.
     */
    geotoolkit.util.EventDispatcher.prototype.dispose = function(){};
    /**
     * Attach listener on event
     * @param {string} type type of event or property
     * @param {function()} callback to be called
     * @returns {geotoolkit.util.EventDispatcher} this
     */
    geotoolkit.util.EventDispatcher.prototype.on = function(type, callback){};
    /**
     * Detach listener on event.
     * Calling .off() with no arguments removes all attached listeners.
     * Calling .off(type) with no callback removes all attached listeners for specific type.
     * @param {string} [type] type of the event
     * @param {function()} [callback] function to be called
     * @returns {geotoolkit.util.EventDispatcher} this
     */
    geotoolkit.util.EventDispatcher.prototype.off = function(type, callback){};
    /**
     * Notify listeners
     * @param {string} type event types
     * @param {object} source of the event
     * @param {object} [args] arguments of the event
     * @returns {geotoolkit.util.EventDispatcher} this
     * @protected
     */
    geotoolkit.util.EventDispatcher.prototype.notify = function(type, source, args){};
    /**
     * Return true if the event dispatcher doesn't notify any events
     * @returns {boolean}
     */
    geotoolkit.util.EventDispatcher.prototype.isSilent = function(){};
    /**
     * Set silent mode
     *
     * @param {boolean} bool flag to enable silent mode
     * @returns {geotoolkit.util.EventDispatcher} this
     */
    geotoolkit.util.EventDispatcher.prototype.setSilent = function(bool){};
    /**
     * Returns whether this object has been disposed
     * @returns {boolean}
     */
    geotoolkit.util.EventDispatcher.prototype.isDisposed = function(){};

/**
 * Defines a fragment of the underlying pixel data of an area.
 * @class geotoolkit.attributes.Raster
 */
geotoolkit.attributes.Raster = {};
    /**
     * Return an array of colors for the current position
     * @param {number} x x position to get color
     * @param {number} y y position to get color
     * @param {Array.<number>} color array of color components
     * @param {number} [offset=0] offset inside of array fo colors
     * @param {number} [count=1] a count of samples in the line
     * @function
     */
    geotoolkit.attributes.Raster.prototype.getColors = function(x, y, color, offset, count){};
    /**
     * Return the actual width, in pixels, of the raster
     * @function
     * @returns {number} the actual width, in pixels, of the raster
     */
    geotoolkit.attributes.Raster.prototype.getWidth = function(){};
    /**
     * Return the actual height, in pixels, of the raster
     * @function
     * @returns {number} the actual height, in pixels, of the raster
     */
    geotoolkit.attributes.Raster.prototype.getHeight = function(){};

/**
 * Define an object which can return Raster
 * @interface
 */
geotoolkit.attributes.IRasterable = {};
    /**
     * Returns a new instance of geotoolkit.attributes.Raster
     * @function
     * @abstract
     *
     * @param {number} [xMin=0] x Min position to get color
     * @param {number} [yMin=0] y Min position to get color
     * @param {number} [xMax=0] x Max position to get color
     * @param {number} [yMax=0] y Max position to get color
     * @returns {geotoolkit.attributes.Raster}
     */
    geotoolkit.attributes.IRasterable.prototype.getRaster = function(xMin, yMin, xMax, yMax){};

/**
 * This abstract class is the parent class of all ColorProviders. A colorprovider converts a value to a color based on its configuration. It's generally created by associating some colors to specific values.<br>
 * Then it will interpolate (algorithm depends of the actual implementation) those colors on the fly to find the actual color corresponding to a value.<br>
 * This class also provides a list of builtin color maps {@link geotoolkit.util.ColorProvider.KnownScales}.<br>
 * All the color providers inherit from this class, for examples please refer to:<br>
 * <br>
 * {@link geotoolkit.util.DefaultColorProvider} ; <br>
 * {@link geotoolkit.util.DiscreteGradientColorProvider} ; <br>
 * {@link geotoolkit.util.LogColorProvider} ; <br>
 * {@link geotoolkit.util.RangeColorProvider} ; <br>
 *
 * @class geotoolkit.util.ColorProvider
 * @augments geotoolkit.util.EventDispatcher
 * @implements geotoolkit.attributes.IRasterable
 */
geotoolkit.util.ColorProvider = {};
    /**
     * Enum of known Named Colors
     * @enum
     * @readonly
     */
    geotoolkit.util.ColorProvider.KnownColors = {};
        /**
         * NaN
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownColors.NaN = "";
        /**
         * NegativeInfinity
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownColors.NegativeInfinity = "";
        /**
         * PositiveInfinity
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownColors.PositiveInfinity = "";
    /**
     * Enum of known Scales
     * @enum
     * @readonly
     */
    geotoolkit.util.ColorProvider.KnownScales = {};
        /**
         * Autumn
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Autumn = "";
        /**
         * Blue to Red
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.BlueToRed = "";
        /**
         * Cool
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Cool = "";
        /**
         * Copper
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Copper = "";
        /**
         * Dark body
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.DarkBody = "";
        /**
         * Flag
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Flag = "";
        /**
         * Gray
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Gray = "";
        /**
         * Hot
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Hot = "";
        /**
         * HSV
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.HSV = "";
        /**
         * Orange
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Orange = "";
        /**
         * Rainbow
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Rainbow = "";
        /**
         * Spring
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Spring = "";
        /**
         * Summer
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Summer = "";
        /**
         * Winter
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Winter = "";
        /**
         * Bone
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Bone = "";
        /**
         * Binary
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Binary = "";
        /**
         * Pink
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Pink = "";
        /**
         * Parula
         * @type {string}
         */
        geotoolkit.util.ColorProvider.KnownScales.Parula = "";
    /**
     * Style Events enumerator
     * @enum
     * @readonly
     */
    geotoolkit.util.ColorProvider.Events = {};
        /**
         * Invalidate
         * @type {string}
         */
        geotoolkit.util.ColorProvider.Events.Invalidate = "";
    /**
     * Returns a new instance of geotoolkit.attributes.Raster
     *
     * @param {number} [xMin=0] x Min position to get color
     * @param {number} [yMin=0] y Min position to get color
     * @param {number} [xMax=0] x Max position to get color
     * @param {number} [yMax=0] y Max position to get color
     * @returns {geotoolkit.attributes.Raster} new instance of the Raster
     */
    geotoolkit.util.ColorProvider.prototype.getRaster = function(xMin, yMin, xMax, yMax){};
    /**
     * Return ColorProvider constructor from the object class name or type.
     * @param {string} [objectType] ColorProvider class name
     * @returns {*} ColorProvider constructor
     */
    geotoolkit.util.ColorProvider.getColorProviderType = function(objectType){};
    /**
     * Returns known color value/s
     * @param {string|geotoolkit.util.ColorProvider.KnownColors} [colorName] color name, if not specified then returns list of known colors
     * @returns {Array<object>} array of [colorPair]
     * @returns {string} [colorPair.name] name of the color
     * @returns {object|string|geotoolkit.attributes.FillStyle} [colorPair.value] named color or fill style
     */
    geotoolkit.util.ColorProvider.prototype.getNamedColor = function(colorName){};
    /**
     * Set color value
     * @param {string|geotoolkit.util.ColorProvider.KnownColors} colorName
     * @param {object|string|geotoolkit.attributes.FillStyle} colorValue
     * @returns {geotoolkit.util.ColorProvider} this
     */
    geotoolkit.util.ColorProvider.prototype.setNamedColor = function(colorName, colorValue){};
    /**
     * Return color for the current value
     * @function
     * @abstract
     * @param {number} value
     * the specified color
     * @returns {geotoolkit.util.RgbaColor} the RgbaColor.
     */
    geotoolkit.util.ColorProvider.prototype.getColor = function(value){};
    /**
     * Return list of used Stop Points
     * @function
     * @returns {object[]} Array of {color,value}
     */
    geotoolkit.util.ColorProvider.prototype.getStopPoints = function(){};
    /**
     * Return min
     * @function
     * @abstract
     * @returns {number} Minimum of ColorProvider
     */
    geotoolkit.util.ColorProvider.prototype.getMinValue = function(){};
    /**
     * Return max
     * @function
     * @abstract
     * @returns {number} Maximum of ColorProvider
     */
    geotoolkit.util.ColorProvider.prototype.getMaxValue = function(){};
    /**
     * invalidate the color provider and fire an event to the visuals
     * @function
     * @abstract
     */
    geotoolkit.util.ColorProvider.prototype.invalidate = function(){};
    /**
     * Enable / disable notification
     * @function
     * @param {boolean} enable enable or disable notifications
     * @param {boolean} [force=false] true if parent should be invalidated immediately
     * @returns {geotoolkit.util.ColorProvider} this
     */
    geotoolkit.util.ColorProvider.prototype.setNotification = function(enable, force){};
    /**
     * Return state of notification
     * @function
     * @abstract
     * @returns {boolean}
     */
    geotoolkit.util.ColorProvider.prototype.isNotificationEnabled = function(){};
    /**
     * set properties
     * @function
     * @abstract
     * @param {object} properties
     * @returns {geotoolkit.util.ColorProvider} this
     */
    geotoolkit.util.ColorProvider.prototype.setProperties = function(properties){};
    /**
     * get properties
     * @function
     * @abstract
     * @returns {object}
     */
    geotoolkit.util.ColorProvider.prototype.getProperties = function(){};

/**
 * A utility class that provides helpful functions to manipulate colors. This class provides functions to parse, edit and convert colors from rgba to hsb.
 * It's especially useful to convert colors in css format to toolkit {@link geotoolkit.util.RgbaColor}.
 * @class geotoolkit.util.ColorUtil
 */
geotoolkit.util.ColorUtil = {};
    /**
     * Returns random RGBA color
     * @param {number} [alpha=undefined] transparency chanel from 0 to 1
     * @returns {string} random color
     */
    geotoolkit.util.ColorUtil.getRandomColorRgba = function(alpha){};
    /**
     * return random RGB color
     *
     * @returns {string} random color
     */
    geotoolkit.util.ColorUtil.getRandomColorRgb = function(){};
    /**
     * return new color
     * @returns {string}
     */
    geotoolkit.util.ColorUtil.getNewColor = function(){};
    /**
     * convert css color {string} to {geotoolkit.util.RgbaColor}
     * @param {string|geotoolkit.util.RgbaColor} color color to parse
     * @returns {geotoolkit.util.RgbaColor} color
     */
    geotoolkit.util.ColorUtil.parseColor = function(color){};
    /**
     *
     * @param {string} color CSS Color
     * @returns {geotoolkit.util.RgbaColor | null}
     */
    geotoolkit.util.ColorUtil.prototype.parseColor = function(color){};
    /**
     * set value for the alpha chanel
     * @param {string} color CSS color
     * @param {number} a alpha component 0 - 255
     * @returns {string}
     */
    geotoolkit.util.ColorUtil.setAlpha = function(color, a){};
    /**
     * Converts legacy MS Access Code to a RGBA color
     * @see http://cloford.com/resources/colours/500col.htm
     * @param {number} accessCode The MS access code to convert to a color
     * @returns {geotoolkit.util.RgbaColor|null} The converted color or null
     */
    geotoolkit.util.ColorUtil.parseMSColor = function(accessCode){};
    /**
     * converts color to string
     * @param {string|geotoolkit.util.RgbaColor|geotoolkit.util.HsvColor} color color to convert
     * @returns {string}
     */
    geotoolkit.util.ColorUtil.colorToString = function(color){};

/**
 * This class is the default implementation of a colorprovider.<br>
 * <br>
 * It uses a map of sorted values and colors.<br>
 * When retrieving the Color for a specified value, if the value is not found in the collection it gets the minimum and maximum value relative to the specified value.<br>
 * Then it gets the colors corresponding to these values, interpolates the colors and returns the color according to the relative position of the value between the minimum and maximum values.<br>
 *
 * @class geotoolkit.util.DefaultColorProvider
 * @augments geotoolkit.util.ColorProvider
 * @param {Array.<number>|object} values The values or a json
 * @param {Array.<number>} [values.values] The values
 * @param {Array.<geotoolkit.util.RgbaColor>} [values.colors] The colors
 * @param {boolean} [values.reversed=false] boolean to define the sorting direction
 * @param {geotoolkit.util.ColorProvider.KnownScales} [values.scale=null] A predefined set of colors
 * @param {number} [values.min=0] Start value for the scale
 * @param {number} [values.max=1] End value for the scale
 * @param {Array.<geotoolkit.util.RgbaColor>} [colors] The colors
 * @example
 * // 1). Default Color Provider allows for linear gradient with stops
 * var colorprovider = new geotoolkit.util.DefaultColorProvider({
 * 'values' : [ -2 , -1 , 0 , 1 , 2 ],
 * 'colors' : ['orange', 'yellow', 'blue', 'green', 'gray']
 * });
 * // 2). To use 'JET' colormap like in MATLAB you can use the following code to create color provider for specified min and max values.
 * var min = -100, max = 100;
 * var colors = ['#00007F','#0000FF','#007FFF','#00FFFF','#7FFF7F','#FFFF00','#FF7F00','#FF0000','#7F0000'];
 * var values = [];
 * var delta = (max-min) / (colors.length-1);
 * for(var i=0; i < colors.length; ++i) {
 * values.push(min+i*delta);
 * }
 * var colorprovider = new geotoolkit.util.DefaultColorProvider({
 * 'values': values,
 * 'colors': colors
 * }
 * );
 */
geotoolkit.util.DefaultColorProvider = {};
    /**
     * Style Events enumerator
     * @enum
     * @readonly
     */
    geotoolkit.util.DefaultColorProvider.Events = {};
    /**
     * Add color to the collection
     * Compatibility: old JSON format {'value': 0, 'red': 255, 'green': 255, 'blue': 255, 'alpha': 1} is supported,
     * but new parameter list is recommended
     *
     * @param {number} value index of this color on the colorbar
     * @param {string|geotoolkit.util.RgbaColor} color CSS color string or RgbaColor object
     * @returns {geotoolkit.util.DefaultColorProvider} this
     */
    geotoolkit.util.DefaultColorProvider.prototype.addColor = function(value, color){};
    /**
     * Replace all colors in the collection by this set
     *
     * @param {Array.<number>} values new values
     * @param {Array.<string|geotoolkit.util.RgbaColor>} [colors] new colors
     * @returns {geotoolkit.util.DefaultColorProvider} this
     */
    geotoolkit.util.DefaultColorProvider.prototype.setColors = function(values, colors){};
    /**
     * Replace all colors in the collection by this scale
     *
     * @param {geotoolkit.util.ColorProvider.KnownScales} scale Scale to use
     * @param {number} [start] Start value to use
     * @param {number} [end] End value to use
     * @returns {geotoolkit.util.DefaultColorProvider} this
     */
    geotoolkit.util.DefaultColorProvider.prototype.setScale = function(scale, start, end){};
    /**
     * @returns {geotoolkit.util.ColorProvider.KnownScales} scale scale being used
     */
    geotoolkit.util.DefaultColorProvider.prototype.getScale = function(){};
    /**
     * Remove color from the collection
     *
     * @param {number} value value to remove color
     * @returns {geotoolkit.util.DefaultColorProvider} this
     */
    geotoolkit.util.DefaultColorProvider.prototype.removeColor = function(value){};
    /**
     * Returns minimum value set in the collection
     * @returns {number}
     */
    geotoolkit.util.DefaultColorProvider.prototype.getMinValue = function(){};
    /**
     * Returns the maximum value set in this collection
     * @returns {number}
     */
    geotoolkit.util.DefaultColorProvider.prototype.getMaxValue = function(){};
    /**
     * Always return a reference to sorted array of values.
     * Don't change this array.
     * @returns {number[]} an array of the values
     */
    geotoolkit.util.DefaultColorProvider.prototype.getValues = function(){};
    /**
     * @returns {geotoolkit.util.RgbaColor[]} an array of the colors
     */
    geotoolkit.util.DefaultColorProvider.prototype.getColors = function(){};
    /**
     * reverse the axis
     * @returns {geotoolkit.util.DefaultColorProvider}
     */
    geotoolkit.util.DefaultColorProvider.prototype.reverse = function(){};
    /**
     * return true if the min / max is reversed
     *
     * @returns {boolean}
     */
    geotoolkit.util.DefaultColorProvider.prototype.isReversed = function(){};
    /**
     * set the min/max of the colorprovider, interpolating all values on the way.
     * @param {number} start Start value to use
     * @param {number} end End value to use
     * @returns {geotoolkit.util.DefaultColorProvider} this
     */
    geotoolkit.util.DefaultColorProvider.prototype.scaleTo = function(start, end){};
    /**
     * @returns {object[]} an array of the {color,values} couples
     */
    geotoolkit.util.DefaultColorProvider.prototype.getStopPoints = function(){};
    /**
     * Return color for the current value
     *
     * @param {number} value index of this color on the colorbar
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.util.DefaultColorProvider.prototype.getColor = function(value){};
    /**
     * get Properties
     * @returns {object}
     */
    geotoolkit.util.DefaultColorProvider.prototype.getProperties = function(){};
    /**
     * set Properties
     * @param {object} properties Json object with properties
     * @param {geotoolkit.util.ColorProvider.KnownScales} [properties.scale] color scale for provider to use
     * @param {number} [properties.min] min value to use
     * @param {number} [properties.max] max value to use
     * @param {boolean} [properties.reversed] reversed flag
     * @returns {geotoolkit.util.DefaultColorProvider} this
     */
    geotoolkit.util.DefaultColorProvider.prototype.setProperties = function(properties){};
    /**
     * Invalidate Default ColorProvider and notify visuals for update
     * @returns {geotoolkit.util.DefaultColorProvider}
     */
    geotoolkit.util.DefaultColorProvider.prototype.invalidate = function(){};
    /**
     * Enable / disable notification
     * @param {boolean} enable enable or disable notifications
     * @param {boolean} [force=false] true if parent should be invalidated immediately
     * @returns {geotoolkit.util.DefaultColorProvider} this
     */
    geotoolkit.util.DefaultColorProvider.prototype.setNotification = function(enable, force){};
    /**
     * Return state of notification
     * @returns {boolean} current notification state
     */
    geotoolkit.util.DefaultColorProvider.prototype.isNotificationEnabled = function(){};
    /**
     * Create or get DefaultColorProvider from an object
     * @override
     * @param {object} object to get provider from
     * @returns {geotoolkit.util.DefaultColorProvider} provider
     */
    geotoolkit.util.DefaultColorProvider.fromObject = function(object){};

/**
 * This class implements a colorprovider that use discretization to emulate a gradient.<br>
 * It's main purpose is to simplify a gradient by reducing the amount of possible colors (mostly for performance reasons).<br>
 * <br>
 * The discretization process can be controlled through the given 'bins' parameter that defines how many discrete colors will be used.<br>
 *
 * @class geotoolkit.util.DiscreteGradientColorProvider
 * @augments geotoolkit.util.DefaultColorProvider
 * @param {Array.<number> | object} values list of values
 * @param {Array.<string>} values.values list of colors
 * @param {Array.<string>} values.colors list of colors
 * @param {number} values.bins number of bins
 * @param {Array<geotoolkit.util.RgbaColor>} [colors] list of colors
 * @param {number} [bins=0] number of bins
 * @example
 * //Discrete Gradient Color Provider allows for limited number of bins
 * var discreteCP = new geotoolkit.util.DiscreteGradientColorProvider({
 * 'values' : [ -2 , -1 , 0 , 1 , 2 ],
 * 'colors' : ['orange', 'yellow', 'blue', 'green', 'gray']
 * 'bins': 16
 * });
 */
geotoolkit.util.DiscreteGradientColorProvider = {};
    /**
     * Sets how many colors can be provided
     *
     * @param {number} colorNumber number of colors that can be provided
     * @returns {geotoolkit.util.DiscreteGradientColorProvider} this
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.setColorNumber = function(colorNumber){};
    /**
     * Returns how many colors can be provided
     *
     * @returns {number}
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.getColorNumber = function(){};
    /**
     * @returns {object[]} an array of the {color,values} couples
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.getStopPoints = function(){};
    /**
     * @override
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.getColors = function(){};
    /**
     * @override
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.getValues = function(){};
    /**
     * Returns color
     *
     * @param {number} value index of this color on the colorbar
     * @returns {geotoolkit.util.RgbaColor | null}
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.getColor = function(value){};
    /**
     * @override
     * @param {Array.<number>} values new values
     * @param {Array.<string|geotoolkit.util.RgbaColor>} colors new colors
     * @returns {geotoolkit.util.DiscreteGradientColorProvider} this
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.setColors = function(values, colors){};
    /**
     * Replace all colors in the collection by this scale
     *
     * @override
     * @param {geotoolkit.util.ColorProvider.KnownScales} scale Scale to use
     * @param {number} min Minimum to use
     * @param {number} max Maximum to use
     * @returns {geotoolkit.util.DiscreteGradientColorProvider} this
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.setScale = function(scale, min, max){};
    /**
     * reverse the axis
     * @override
     * @returns {geotoolkit.util.DiscreteGradientColorProvider}
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.reverse = function(){};
    /**
     * get Properties
     *
     * @returns {*}
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.getProperties = function(){};
    /**
     * set Properties of the object
     * @param {object} properties color provider properties
     * @param {number} [properties.bins] number of bins.
     * @returns {geotoolkit.util.DiscreteGradientColorProvider} this
     */
    geotoolkit.util.DiscreteGradientColorProvider.prototype.setProperties = function(properties){};
    /**
     * Create or get DiscreteGradientColorProvider from an object
     * @param {geotoolkit.util.DiscreteGradientColorProvider|object} object gradient provider properties or instance
     * @returns {geotoolkit.util.DiscreteGradientColorProvider} provider
     */
    geotoolkit.util.DiscreteGradientColorProvider.fromObject = function(object){};

/**
 * Creates a representation of Log color provider
 *
 * @class geotoolkit.util.DefaultLogColorProvider
 * @augments geotoolkit.util.DefaultColorProvider
 * @param {Array.<number>|object} values list of values
 * @param {Array.<number>} values.values list of values
 * @param {Array.<number>} values.colors list of colors
 * @param {number} values.bins number of bins
 * @param {Array<geotoolkit.util.RgbaColor>} colors list of colors
 * @param {number} bins number of bins
 * @example
 * //Log Color Provider emulates logarithmic behavior
 * var logCP = new geotoolkit.util.DefaultLogColorProvider({
 * 'values' : [ 1 , 10 , 100 , 300 , 1000 ],
 * 'colors' : ['orange', 'yellow', 'blue', 'green', 'gray'],
 * 'bins': 16
 * });
 */
geotoolkit.util.DefaultLogColorProvider = {};
    /**
     * Enum of display style
     * @enum
     * @readonly
     */
    geotoolkit.util.DefaultLogColorProvider.DisplayStyle = {};
        /**
         * linear
         * @type {string}
         */
        geotoolkit.util.DefaultLogColorProvider.DisplayStyle.Linear = "";
        /**
         * logarithmic
         * @type {string}
         */
        geotoolkit.util.DefaultLogColorProvider.DisplayStyle.Logarithmic = "";
    /**
     * Replace all colors in the collection by this set
     *
     * @param {Array.<number>} values new values
     * @param {Array.<string|geotoolkit.util.RgbaColor>} colors new colors
     * @returns {geotoolkit.util.DefaultLogColorProvider} this
     */
    geotoolkit.util.DefaultLogColorProvider.prototype.setColors = function(values, colors){};
    /**
     * Method used to set graphical representation of DefaultLogColorProvider in a fillStyle
     * @param {geotoolkit.util.DefaultLogColorProvider.DisplayStyle} style
     * @returns {geotoolkit.util.DefaultLogColorProvider} this
     */
    geotoolkit.util.DefaultLogColorProvider.prototype.setDisplayStyle = function(style){};
    /**
     * @returns {geotoolkit.util.DefaultLogColorProvider.DisplayStyle} display style.
     */
    geotoolkit.util.DefaultLogColorProvider.prototype.getDisplayStyle = function(){};
    /**
     * @returns {object[]} an array of the {color,values} couples
     */
    geotoolkit.util.DefaultLogColorProvider.prototype.getStopPoints = function(){};
    /**
     * Replace all colors in the collection by this scale
     *
     * @param {geotoolkit.util.ColorProvider.KnownScales} scale Scale to Use
     * @param {number} min Minimum to Use
     * @param {number} max Maximum to Use
     * @returns {geotoolkit.util.DefaultLogColorProvider} this
     */
    geotoolkit.util.DefaultLogColorProvider.prototype.setScale = function(scale, min, max){};
    /**
     * get Properties
     * @returns {object}
     */
    geotoolkit.util.DefaultLogColorProvider.prototype.getProperties = function(){};
    /**
     * set Properties of the object
     * @param {object} properties Json with properties to set
     * @param {geotoolkit.util.DefaultLogColorProvider.DisplayStyle} [properties.style] Enum of display style
     * @returns {geotoolkit.util.DefaultLogColorProvider} this
     */
    geotoolkit.util.DefaultLogColorProvider.prototype.setProperties = function(properties){};
    /**
     * Create or get DefaultLogColorProvider from an object
     * @override
     * @param {object} object to get provider from
     * @returns {geotoolkit.util.DefaultLogColorProvider} provider
     */
    geotoolkit.util.DefaultLogColorProvider.fromObject = function(object){};

/**
 * Creates a representation of Log color provider
 *
 * @class geotoolkit.util.LogColorProvider
 * @augments geotoolkit.util.DiscreteGradientColorProvider
 * @param {Array.<number>|object} values list of values
 * @param {Array.<number>} values.values list of values
 * @param {Array.<number>} values.colors list of colors
 * @param {number} values.bins number of bins
 * @param {Array<geotoolkit.util.RgbaColor>} colors list of colors
 * @param {number} bins number of bins
 * @example
 * //Log Color Provider emulates logarithmic behavior
 * var logCP = new geotoolkit.util.LogColorProvider({
 * 'values' : [ 1 , 10 , 100 , 300 , 1000 ],
 * 'colors' : ['orange', 'yellow', 'blue', 'green', 'gray'],
 * 'bins': 16
 * });
 */
geotoolkit.util.LogColorProvider = {};
    /**
     * Enum of display style
     * @enum
     * @readonly
     */
    geotoolkit.util.LogColorProvider.DisplayStyle = {};
        /**
         * linear
         * @type {string}
         */
        geotoolkit.util.LogColorProvider.DisplayStyle.Linear = "";
        /**
         * logarithmic
         * @type {string}
         */
        geotoolkit.util.LogColorProvider.DisplayStyle.Logarithmic = "";
    /**
     * Replace all colors in the collection by this set
     *
     * @param {Array.<number>} values new values
     * @param {Array.<string|geotoolkit.util.RgbaColor>} colors new colors
     * @returns {geotoolkit.util.LogColorProvider} this
     */
    geotoolkit.util.LogColorProvider.prototype.setColors = function(values, colors){};
    /**
     * Method used to set graphical representation of LogColorProvider in a fillStyle
     * @param {geotoolkit.util.LogColorProvider.DisplayStyle} style
     * @returns {geotoolkit.util.LogColorProvider} this
     */
    geotoolkit.util.LogColorProvider.prototype.setDisplayStyle = function(style){};
    /**
     * @returns {geotoolkit.util.LogColorProvider.DisplayStyle} display style.
     */
    geotoolkit.util.LogColorProvider.prototype.getDisplayStyle = function(){};
    /**
     * @returns {object[]} an array of the {color,values} couples
     */
    geotoolkit.util.LogColorProvider.prototype.getStopPoints = function(){};
    /**
     * Replace all colors in the collection by this scale
     *
     * @param {geotoolkit.util.ColorProvider.KnownScales} scale Scale to Use
     * @param {number} min Minimum to Use
     * @param {number} max Maximum to Use
     * @returns {geotoolkit.util.LogColorProvider} this
     */
    geotoolkit.util.LogColorProvider.prototype.setScale = function(scale, min, max){};
    /**
     * convert value v to logarithmic t
     */
    geotoolkit.util.LogColorProvider.prototype.valToLog = function(){};
    /**
     * convert logarithmic t to value v
     */
    geotoolkit.util.LogColorProvider.prototype.logToVal = function(){};
    /**
     * get Properties
     */
    geotoolkit.util.LogColorProvider.prototype.getProperties = function(){};
    /**
     * set Properties of the object
     * @param {object} properties
     * @param {geotoolkit.util.LogColorProvider.DisplayStyle} [properties.style] Enum of display style
     * @returns {geotoolkit.util.LogColorProvider} this
     */
    geotoolkit.util.LogColorProvider.prototype.setProperties = function(properties){};
    /**
     * Create or get LogColorProvider from an object
     * @override
     * @param {object} object
     * @returns {geotoolkit.util.LogColorProvider} provider
     */
    geotoolkit.util.LogColorProvider.fromObject = function(object){};

/**
 * Creates a representation of Range color provider
 *
 * @class geotoolkit.util.RangeColorProvider
 * @augments geotoolkit.util.ColorProvider
 * @param {geotoolkit.util.Range[]} values list of ranges
 * @param {string[]|geotoolkit.util.RgbaColor[]} colors list of colors
 * @example
 * //Discrete Range Color Provider allows for specific bins
 * var rangem2 = new geotoolkit.util.Range(-2,-1.5); //set color orange in the [-2,-1.5] range.
 * //Do the same for the [-1.5, 0], [0, 0.5], [0.5,1] and [1,2] ranges
 * var rangeCP = new geotoolkit.util.RangeColorProvider({
 * 'values' : [ rangem2, rangem1, range0, rangep1, rangep2 ],
 * 'colors' : ['orange', 'yellow', 'blue', 'green', 'gray']
 * });
 */
geotoolkit.util.RangeColorProvider = {};
    /**
     * Enum of display style
     * @enum
     * @readonly
     */
    geotoolkit.util.RangeColorProvider.DisplayStyle = {};
        /**
         * linear
         * @type {string}
         */
        geotoolkit.util.RangeColorProvider.DisplayStyle.Linear = "";
        /**
         * block
         * @type {string}
         */
        geotoolkit.util.RangeColorProvider.DisplayStyle.Block = "";
    /**
     * Method used to set graphical representation of LogColorProvider in a fillStyle
     * @param {geotoolkit.util.RangeColorProvider.DisplayStyle} style
     * @returns {geotoolkit.util.RangeColorProvider} this
     */
    geotoolkit.util.RangeColorProvider.prototype.setDisplayStyle = function(style){};
    /**
     * @returns {geotoolkit.util.RangeColorProvider.DisplayStyle} display style.
     */
    geotoolkit.util.RangeColorProvider.prototype.getDisplayStyle = function(){};
    /**
     * @returns {object[]} an array of the {color,values} couples
     */
    geotoolkit.util.RangeColorProvider.prototype.getStopPoints = function(){};
    /**
     * Replace all colors in the collection by this set
     *
     * @param {geotoolkit.util.Range[]} values list of ranges
     * @param {string[]|geotoolkit.util.RgbaColor[]} colors list of colors
     * @returns {geotoolkit.util.RangeColorProvider} this
     */
    geotoolkit.util.RangeColorProvider.prototype.setColors = function(values, colors){};
    /**
     * Returns color
     *
     * @param {number} value index of the color
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.util.RangeColorProvider.prototype.getColor = function(value){};
    /**
     * sets the default/out of range color
     *
     * @param {string} color default/out of range color
     * @returns {geotoolkit.util.RangeColorProvider}
     */
    geotoolkit.util.RangeColorProvider.prototype.setDefaultColor = function(color){};
    /**
     * gets the default/out of range color
     *
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.util.RangeColorProvider.prototype.getDefaultColor = function(){};
    /**
     * Returns minimum value set in the collection
     * @returns {number}
     */
    geotoolkit.util.RangeColorProvider.prototype.getMinValue = function(){};
    /**
     * Returns the maximum value set in this collection
     * @returns {number}
     */
    geotoolkit.util.RangeColorProvider.prototype.getMaxValue = function(){};
    /**
     * Returns color provider properties
     * @returns {object} properties
     * @returns {Array<geotoolkit.util.Range>} [properties.values] array of ranges
     * @returns {Array<string|geotoolkit.util.RgbaColor>} [properties.colors] array of colors
     * @returns {string} [properties.default] default color
     */
    geotoolkit.util.RangeColorProvider.prototype.getProperties = function(){};
    /**
     * Sets properties
     * @param {object} properties properties
     * @param {geotoolkit.util.Range[]} [properties.values] list of ranges
     * @param {string[]|geotoolkit.util.RgbaColor[]} [properties.colors] list of colors
     * @returns {geotoolkit.util.RangeColorProvider} this
     */
    geotoolkit.util.RangeColorProvider.prototype.setProperties = function(properties){};
    /**
     * Invalidate Default ColorProvider and notify visuals for update
     * @returns {geotoolkit.util.RangeColorProvider}
     */
    geotoolkit.util.RangeColorProvider.prototype.invalidate = function(){};
    /**
     * Return state of notification
     * @returns {boolean} current notification state
     */
    geotoolkit.util.RangeColorProvider.prototype.isNotificationEnabled = function(){};
    /**
     * Enable / disable notification
     * @param {boolean} enable enable or disable notifications
     * @param {boolean} [force=false] true if parent should be invalidated immediately
     * @returns {geotoolkit.util.RangeColorProvider} this
     */
    geotoolkit.util.RangeColorProvider.prototype.setNotification = function(enable, force){};
    /**
     * Create or get RangeColorProvider from an object
     * @override
     * @param {object} object
     * @returns {geotoolkit.util.RangeColorProvider} provider
     */
    geotoolkit.util.RangeColorProvider.fromObject = function(object){};

/**
 * Uses the filesystem API to make files locally for temporary storage.
 * Currently each FileInOut object makes a filesystem for one file. The file
 * can be written to with outToFile.
 *
 * The file can be emptied with clearFile after the writer has been initialized, or written to with outToFile
 *
 * @class geotoolkit.util.FileInOut
 * @deprecated since 2.6
 */
geotoolkit.util.FileInOut = {};
    /**
     * Called after the writer is initialized to perform all of the queued writes
     *
     * Called onwriteend to write the next queued item
     */
    geotoolkit.util.FileInOut.prototype.onWriterReady = function(){};
    /**
     * Called to clear the contents of a file
     */
    geotoolkit.util.FileInOut.prototype.clearFile = function(){};
    /**
     * Builds a new file system
     */
    geotoolkit.util.FileInOut.prototype.initFileSystem = function(){};
    /**
     * Private method to build a blob and write it to the fileWriter
     * @param {string} str
     */
    geotoolkit.util.FileInOut.prototype.pushToFileStream = function(str){};
    /**
     * Returns the URL of a file.
     *
     * This URL may not be downloadable. Further testing required
     */
    geotoolkit.util.FileInOut.prototype.getFileURL = function(){};
    /**
     * Will open up a window
     */
    geotoolkit.util.FileInOut.prototype.openFileWindow = function(){};

/**
 * Defines helper methods to work with URL
 *
 * @class geotoolkit.util.URLUtil
 */
geotoolkit.util.URLUtil = {};
    /**
     * Return host URL from document location
     * @returns {string}
     */
    geotoolkit.util.URLUtil.getHost = function(){};
    /**
     * Return base host URL from document location
     * @returns {string}
     */
    geotoolkit.util.URLUtil.getBaseHost = function(){};
    /**
     * Compress integer array by creating difference array and use RLE
     * @param {Array<number>} data input array
     * @returns {string}
     */
    geotoolkit.util.URLUtil.compressArray = function(data){};
    /**
     *
     * @param {string} url URL to decompress
     * @returns {Array<number>}
     */
    geotoolkit.util.URLUtil.decompressToArray = function(url){};

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
 *
 * @example
 * Example of use to load an image:
 *
 * var promise = new geotoolkit.util.Promise(function (resolve, reject) {
 * var img = new Image();
 * img.onload = function () {
 * resolve(img);
 * };
 * img.src = 'path_to_img';
 * }).then(function (result) {
 * //display the result
 * }, function (reason) {
 * //display the error
 * });
 *
 * @class geotoolkit.util.Promise
 * @param {!function(resolve, reject)} execute execute function
 * @param {!function} [abort=null] optional abort function
 */
geotoolkit.util.Promise = {};
    /**
     * Abort promise execution
     */
    geotoolkit.util.Promise.prototype.abort = function(){};
    /**
     * Appends fulfillment and rejection handlers to the promise and return a new promise
     *
     * @param {function(result)} [onResolved] called if promise is accepted
     * @param {function(reason)} [onRejected] called if promise is rejected
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.util.Promise.prototype.then = function(onResolved, onRejected){};
    /**
     * Appends a rejection handler callback to the promise and returns a new promise resolving to the return value
     * of the callback
     *
     * @param {function(error)} [onRejected] called if the promise is rejected
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.util.Promise.prototype.catch = function(onRejected){};
    /**
     * returns a new promise that will give the result of all promises when fulfilled
     *
     * @param {Array.<geotoolkit.util.Promise>} promises an array of promises
     * @returns {geotoolkit.util.Promise} promise
     */
    geotoolkit.util.Promise.all = function(promises){};
    /**
     * Returns a new promise that resolves or rejects as soon as one of the promises in the array resolves or rejects
     *
     * @param {Array.<geotoolkit.util.Promise>} promises an array of promises
     * @param {number} [interval=250] [interval] to check promises result
     * @param {number} [timeout=5000] [timeout] that automatically reject the promise.
     * @returns {geotoolkit.util.Promise} promise
     */
    geotoolkit.util.Promise.race = function(promises, interval, timeout){};
    /**
     * returns a new promise that has been rejected.
     *
     * tip: it is useful to make reason an instance of Error. (for debugging purpose)
     *
     * @param {object} [reason] reason why the promise has been rejected.
     * @returns {geotoolkit.util.Promise} promise
     */
    geotoolkit.util.Promise.reject = function(reason){};
    /**
     * returns a new promise that has been resolved.
     *
     * @param {object | geotoolkit.util.Promise} [value] value to resolve
     * @returns {geotoolkit.util.Promise} promise
     */
    geotoolkit.util.Promise.resolve = function(value){};
    /**
     * returns true if the object is an instance of geotoolkit.util.Promise
     * @param {object} object object to check if it is a promise
     * @returns {boolean}
     */
    geotoolkit.util.Promise.isPromise = function(object){};

/**
 * Collection represents a group of objects, known as its elements
 *
 * @class geotoolkit.util.Collection
 * @augments geotoolkit.util.EventDispatcher
 */
geotoolkit.util.Collection = {};
    /**
     * Collection events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.util.Collection.Events = {};
        /**
         * Add
         * @type {string}
         */
        geotoolkit.util.Collection.Events.Add = "";
        /**
         * Remove
         * @type {string}
         */
        geotoolkit.util.Collection.Events.Remove = "";
        /**
         * Change
         * @type {string}
         */
        geotoolkit.util.Collection.Events.Change = "";
        /**
         * Clear
         * @type {string}
         */
        geotoolkit.util.Collection.Events.Clear = "";
    /**
     * Add item(s)
     * @param {Object|Array.<Object>} items item(s) to add
     */
    geotoolkit.util.Collection.prototype.add = function(items){};
    /**
     * insert item at index
     * @param {number} index index
     * @param {Object} item item to insert
     */
    geotoolkit.util.Collection.prototype.insert = function(index, item){};
    /**
     * Remove At index
     * @param {number} index index of item
     */
    geotoolkit.util.Collection.prototype.removeAtIndex = function(index){};
    /**
     * Remove
     * @param {Object} item item
     */
    geotoolkit.util.Collection.prototype.remove = function(item){};
    /**
     * Clear All
     */
    geotoolkit.util.Collection.prototype.clear = function(){};
    /**
     * Return number of items int eh collection
     *
     * @returns {number}
     */
    geotoolkit.util.Collection.prototype.getCount = function(){};
    /**
     * Return item by index
     * @param {number} index index of the item in collection
     * @returns {Object}
     */
    geotoolkit.util.Collection.prototype.get = function(index){};
    /**
     * Return index of item
     * ( index of the specified child or -1 if node is not found)
     *
     * @param {Object} item item to check index
     * @returns {number}
     */
    geotoolkit.util.Collection.prototype.indexOf = function(item){};
    /**
     * Get Iterator
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.util.Collection.prototype.getIterator = function(){};

/**
 * This utility class allows fast checking of point existence in constant time.
 * This is optimized for speed and not memory efficiency.
 * @deprecated since 2.6
 * @class geotoolkit.util.FastLookup
 */
geotoolkit.util.FastLookup = {};
    /**
     * Adds a new point to the lookup set
     * @param {number}x The x-coordinate.
     * @param {number}y The y-coordinate.
     */
    geotoolkit.util.FastLookup.prototype.add = function(x, y){};
    /**
     * Checks if there is an point with the given coordinates in the set.
     * @param {number}x The x-coordinate.
     * @param {number}y The y-coordinate.
     * @returns {boolean}
     */
    geotoolkit.util.FastLookup.prototype.check = function(x, y){};
    /**
     * Clears all the data without typed array de-allocation the arrays
     */
    geotoolkit.util.FastLookup.prototype.clear = function(){};

/**
 * This utility class performs a various line simplification algorithms
 * @class geotoolkit.util.PolylineOptimizer
 */
geotoolkit.util.PolylineOptimizer = {};
    /**
     * Enum of Polygon data types
     * @enum
     * @readonly
     */
    geotoolkit.util.PolylineOptimizer.ResultType = {};
        /**
         * The resulting tolerances (squared)
         * @type {number}
         */
        geotoolkit.util.PolylineOptimizer.ResultType.Tolerances = NaN;
        /**
         * The resulting x-coordinates.
         * @type {number}
         */
        geotoolkit.util.PolylineOptimizer.ResultType.XCoordinates = NaN;
        /**
         * The resulting y-coordinates
         * @type {number}
         */
        geotoolkit.util.PolylineOptimizer.ResultType.YCoordinates = NaN;
        /**
         * The number of points in the result set
         * @type {number}
         */
        geotoolkit.util.PolylineOptimizer.ResultType.Cardinality = NaN;
        /**
         * Association of input and output indices
         * @type {number}
         */
        geotoolkit.util.PolylineOptimizer.ResultType.IndexAssociations = NaN;
    /**
     * Determines what points can be removed without compromising the polyline structure. (Douglas-Peucker algorithm)
     *
     * @param {Float64Array}x The x-coordinates of the points
     * @param {Float64Array}y The y-coordinates of the points
     * @param {number}size The size of the coordinate arrays to use
     * @param {Float64Array|array<number>}tolerancesArray The tolerance limit
     * @param {geotoolkit.util.FastLookup} [nonSmoothedPoints] deprecated (since 2.6) The non-smoothed points (for polygons only)
     */
    geotoolkit.util.PolylineOptimizer.reducePoints = function(x, y, size, tolerancesArray, nonSmoothedPoints){};
    /**
     * Enum of clipping sides
     * @enum
     * @readonly
     */
    geotoolkit.util.PolylineOptimizer.ClippingSide = {};
        /**
         * The top side
         * @type {number}
         */
        geotoolkit.util.PolylineOptimizer.ClippingSide.Top = NaN;
        /**
         * The right side
         * @type {number}
         */
        geotoolkit.util.PolylineOptimizer.ClippingSide.Right = NaN;
        /**
         * The bottom side
         * @type {number}
         */
        geotoolkit.util.PolylineOptimizer.ClippingSide.Bottom = NaN;
        /**
         * The left side
         * @type {number}
         */
        geotoolkit.util.PolylineOptimizer.ClippingSide.Left = NaN;

/**
 * Class with can handle some operation with rectangles and polygons and represent a geometry region
 *
 * @class geotoolkit.util.Region
 * @param {number} [epsilon=0.01] epsilon, accuracy of clipping
 */
geotoolkit.util.Region = {};
    /**
     * Enum for defining clipping operation
     * @enum
     * @readonly
     */
    geotoolkit.util.Region.Operations = {};
        /**
         * Intersect
         * @type {number}
         */
        geotoolkit.util.Region.Operations.Intersect = NaN;
        /**
         * Subtract
         * @type {number}
         */
        geotoolkit.util.Region.Operations.Subtract = NaN;
        /**
         * Union
         * @type {number}
         */
        geotoolkit.util.Region.Operations.Union = NaN;
    /**
     * Union shape
     * @param {geotoolkit.util.Polygon | geotoolkit.util.Rect | geotoolkit.util.Region | geotoolkit.util.Polygon[] | geotoolkit.util.Rect[] | geotoolkit.util.Region[]} shape shape
     * @param {geotoolkit.util.Region} dest destination region
     * @returns {geotoolkit.util.Polygon[]} result polygons
     */
    geotoolkit.util.Region.prototype.union = function(shape, dest){};
    /**
     * Intersect shape
     * @param {geotoolkit.util.Polygon | geotoolkit.util.Rect | geotoolkit.util.Region | geotoolkit.util.Polygon[] | geotoolkit.util.Rect[] | geotoolkit.util.Region[]} shape shape
     * @param {geotoolkit.util.Region} dest destination region
     * @returns {geotoolkit.util.Polygon[]} result polygons
     */
    geotoolkit.util.Region.prototype.intersect = function(shape, dest){};
    /**
     * Check if region contains shape
     * @param {geotoolkit.util.Polygon | geotoolkit.util.Rect | geotoolkit.util.Region} shape shape
     * @returns {boolean} true if contains, else false
     */
    geotoolkit.util.Region.prototype.contains = function(shape){};
    /**
     * Check if region intersects shape
     * @param {geotoolkit.util.Polygon | geotoolkit.util.Rect | geotoolkit.util.Region} shape shape
     * @returns {boolean} true if intersects, else false
     */
    geotoolkit.util.Region.prototype.intersects = function(shape){};
    /**
     * Subtract polygon
     * @param {geotoolkit.util.Polygon | geotoolkit.util.Rect | geotoolkit.util.Region | geotoolkit.util.Polygon[] | geotoolkit.util.Rect[] | geotoolkit.util.Region[]} shape shape
     * @param {geotoolkit.util.Region} dest destination region
     * @returns {geotoolkit.util.Polygon[]} result polygons
     */
    geotoolkit.util.Region.prototype.subtract = function(shape, dest){};
    /**
     * Check if region contains point
     * @param {geotoolkit.util.Point} point point
     * @returns {boolean} true if contains, else false
     */
    geotoolkit.util.Region.prototype.containsPoint = function(point){};
    /**
     * Check if region is empty
     * @returns {boolean} true if it is empty, else false
     */
    geotoolkit.util.Region.prototype.isEmpty = function(){};
    /**
     * Transform region
     * @param {geotoolkit.util.Transformation} transformation transformation
     * @returns {geotoolkit.util.Region} this
     */
    geotoolkit.util.Region.prototype.transformRegion = function(transformation){};
    /**
     * Return bounding rectangle
     * @returns {geotoolkit.util.Rect} bounding box
     */
    geotoolkit.util.Region.prototype.getBoundingBox = function(){};
    /**
     * Return polygon as any array of non-overlapping graphics paths.
     * @returns {geotoolkit.renderer.GraphicsPath[]} array of graphic paths
     */
    geotoolkit.util.Region.prototype.getGraphicsPaths = function(){};
    /**
     * Return polygon as graphics path
     * @returns {geotoolkit.renderer.GraphicsPath} graphics path
     */
    geotoolkit.util.Region.prototype.getGraphicsPath = function(){};
    /**
     * Returns polygons
     * @returns {geotoolkit.util.Polygon[]} polygons
     */
    geotoolkit.util.Region.prototype.getPolygons = function(){};
    /**
     * Return an array of non-overlapping rectangles that make up the region
     * @param {number} [eps] epsilon, accuracy
     * @returns {geotoolkit.util.Rect[]} array array of non-overlapping rectangles that make up the region
     */
    geotoolkit.util.Region.prototype.getRectangles = function(eps){};
    /**
     * Clear region
     * @returns {geotoolkit.util.Region} this
     */
    geotoolkit.util.Region.prototype.clear = function(){};

/**
 * Defines helper methods to work with line style
 * @class geotoolkit.util.LineStyleUtil
 */
geotoolkit.util.LineStyleUtil = {};
    /**
     * Returns line width in dest units
     * @param {geotoolkit.attributes.LineStyle} lineStyle the line style
     * @param {geotoolkit.util.Unit} destUnit dest unit
     * @returns {number}
     */
    geotoolkit.util.LineStyleUtil.getLineWidth = function(lineStyle, destUnit){};

/**
 * Service to provide reusable patterns
 *
 * @class geotoolkit.attributes.PatternFactory
 */
geotoolkit.attributes.PatternFactory = {};
    /**
     * add a new category
     * @param {string} categoryName name of category
     */
    geotoolkit.attributes.PatternFactory.prototype.add = function(categoryName){};
    /**
     * return an array with all the categories
     * @returns {Array<string>}
     */
    geotoolkit.attributes.PatternFactory.prototype.getCategories = function(){};
    /**
     * return the service if exist otherwise null
     * @param {string} categoryName unique name of category of patterns
     * @returns {geotoolkit.attributes.PatternService|null} patternservice or null if categoryName is not a valid string
     */
    geotoolkit.attributes.PatternFactory.prototype.getCategory = function(categoryName){};
    /**
     * remove a category
     * @param {string} name name of the Pattern
     */
    geotoolkit.attributes.PatternFactory.prototype.remove = function(name){};
    /**
     * remove all the categories
     */
    geotoolkit.attributes.PatternFactory.prototype.clear = function(){};
    /**
     * Returns instance of the registry
     * @returns {geotoolkit.attributes.PatternFactory} pattern factory
     */
    geotoolkit.attributes.PatternFactory.getInstance = function(){};

/**
 * The serialization context
 *
 * @class geotoolkit.persistence.SerializationContext
 */
geotoolkit.persistence.SerializationContext = {};
    /**
     * Adds the specified value with name "name" to the current context
     * @function
     * @abstract
     * @param {string} name unique property name
     * @param {object} value object value
     */
    geotoolkit.persistence.SerializationContext.prototype.addValue = function(name, value){};
    /**
     * Adds child element with the specified name and optional type to the current context.
     * Unlike "setObject", this method creates a child node to store the object.
     * @function
     * @param {string} name unique property name
     * @param {object} object object to be serialized
     * @param {string} [type=null] the optional serialization type
     * @returns {geotoolkit.persistence.SerializationContext}
     */
    geotoolkit.persistence.SerializationContext.prototype.addObject = function(name, object, type){};
    /**
     * Sets value to the current context (no child nodes for the value will be created in current context)
     * @function
     * @abstract
     * @param {object} value object value
     * @returns {geotoolkit.persistence.SerializationContext}
     */
    geotoolkit.persistence.SerializationContext.prototype.setValue = function(value){};
    /**
     * Sets object to the current context (no child nodes for the object will be created in current context)
     * @function
     * @param {object} value object value
     * @param {string} [type=null] the optional serialization type
     * @returns {geotoolkit.persistence.SerializationContext}
     */
    geotoolkit.persistence.SerializationContext.prototype.setObject = function(value, type){};
    /**
     * Create child element in the current context
     * @function
     * @param {string} name unique property name
     * @param {string} [type=null] type of the object
     * @returns {geotoolkit.persistence.SerializationContext}
     */
    geotoolkit.persistence.SerializationContext.prototype.createChild = function(name, type){};
    /**
     * Get reference id for the specified object. Null as return value means that the object
     * was not saved before
     * @function
     * @abstract
     * @param {object} object object value
     * @returns {string|number|null} reference id or null if not found
     */
    geotoolkit.persistence.SerializationContext.prototype.getReferenceId = function(object){};
    /**
     * Add reference to the object
     * @function
     * @param {object} object object to get reference
     * @returns {string|number} id of the reference
     */
    geotoolkit.persistence.SerializationContext.prototype.addReference = function(object){};
    /**
     * Get registry of memento serializers
     * @function
     * @abstract
     * @returns {geotoolkit.persistence.Registry}
     */
    geotoolkit.persistence.SerializationContext.prototype.getRegistry = function(){};
    /**
     * Commit changes
     * @function
     * @abstract
     */
    geotoolkit.persistence.SerializationContext.prototype.commit = function(){};

/**
 * The deserialization context
 *
 * @class geotoolkit.persistence.DeserializationContext
 */
geotoolkit.persistence.DeserializationContext = {};
    /**
     * Get value
     * @function
     * @abstract
     * @param {string} name name of the property
     * @returns {object} value
     */
    geotoolkit.persistence.DeserializationContext.prototype.getValue = function(name){};
    /**
     * Get object
     * @function
     * @abstract
     * @param {string} type type of the object
     * @param {string} name name of the property
     * @returns {object} value
     */
    geotoolkit.persistence.DeserializationContext.prototype.getObject = function(type, name){};
    /**
     * Request object
     * @function
     * @abstract
     * @param {string} id unique id of the object
     * @param {function()} callback function contains parameter object that can be requested
     */
    geotoolkit.persistence.DeserializationContext.prototype.requestObject = function(id, callback){};
    /**
     * Enumerate each child property
     * @function
     * @param {function()} callback function called by each object child
     * @param {string} [propertyName = null] optional property name
     */
    geotoolkit.persistence.DeserializationContext.prototype.queryChildren = function(callback, propertyName){};
    /**
     * Get object by reference
     * @function
     * @abstract
     * @param {string} id reference id
     * @returns {object}
     */
    geotoolkit.persistence.DeserializationContext.prototype.getReference = function(id){};
    /**
     * Register instance of the object
     * @function
     * @abstract
     * @param {string} id unique id of the object
     * @param {object} object instance of the deserialised class
     */
    geotoolkit.persistence.DeserializationContext.prototype.addReference = function(id, object){};
    /**
     * Get registry of memento deserializers
     * @function
     * @abstract
     * @returns {geotoolkit.persistence.Registry}
     */
    geotoolkit.persistence.DeserializationContext.prototype.getRegistry = function(){};
    /**
     * Push the current deserialized object. This method can be used if it is necessary to
     * provide the existing object for deserialization
     * @function
     * @abstract
     * @param {object} object instance of the deserialised class
     */
    geotoolkit.persistence.DeserializationContext.prototype.pushCurrentObject = function(object){};
    /**
     * Pop the current object from the stack
     * @function
     * @abstract
     * @returns {object}
     */
    geotoolkit.persistence.DeserializationContext.prototype.popCurrentObject = function(){};
    /**
     * Return the current object on the stack
     * @function
     * @abstract
     * @returns {object}
     */
    geotoolkit.persistence.DeserializationContext.prototype.getCurrentObject = function(){};

/**
 * The serialization context to Memento
 * @class geotoolkit.persistence.MementoSerializationContext
 * @augments geotoolkit.persistence.SerializationContext
 */
geotoolkit.persistence.MementoSerializationContext = {};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.MementoSerializationContext.prototype.addValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.MementoSerializationContext.prototype.setValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.MementoSerializationContext.prototype.getRegistry = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.MementoSerializationContext.prototype.addReference = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.MementoSerializationContext.prototype.getReferenceId = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.MementoSerializationContext.prototype.setObject = function(){};
    /**
     * Commits changes
     */
    geotoolkit.persistence.MementoSerializationContext.prototype.commit = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.MementoSerializationContext.prototype.addObject = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.MementoSerializationContext.prototype.createChild = function(){};
    /**
     * Gets a result of the serialization to memento
     * @returns {object}
     */
    geotoolkit.persistence.MementoSerializationContext.prototype.getMemento = function(){};

/**
 * The deserialization context to Memento
 *
 * @class geotoolkit.persistence.MementoDeserializationContext
 * @augments geotoolkit.persistence.DeserializationContext
 */
geotoolkit.persistence.MementoDeserializationContext = {};
    /**
     * Get value
     * @function
     * @param {string} name name of the property
     * @param {string} [type] optional type
     * @returns {object | null}
     */
    geotoolkit.persistence.MementoDeserializationContext.prototype.getValue = function(name, type){};
    /**
     * Gets object. This method is for compatibility with Viewer only
     * @param {string} type type of the object
     * @param {string} name name of the property
     * @returns {object} value
     */
    geotoolkit.persistence.MementoDeserializationContext.prototype.getObject = function(type, name){};
    /**
     * Request value
     * @param {string} id unique id of the object
     * @param {function()} callback function contains parameter object that can be requested
     */
    geotoolkit.persistence.MementoDeserializationContext.prototype.requestObject = function(id, callback){};
    /**
     * Set object reference
     * @function
     * @param {string} id of the property
     * @param {object} reference of the property
     */
    geotoolkit.persistence.MementoDeserializationContext.prototype.addReference = function(id, reference){};
    /**
     * Get object
     * @param {string} id of the property
     * @returns {object} reference
     */
    geotoolkit.persistence.MementoDeserializationContext.prototype.getReference = function(id){};
    /**
     * Enumerate each child property
     * @param {function()} callback function called by each child
     * @param {string} [propertyName = null] optional property name
     */
    geotoolkit.persistence.MementoDeserializationContext.prototype.queryChildren = function(callback, propertyName){};
    /**
     * Get registry of memento serializers
     * @function
     * @returns {geotoolkit.persistence.Registry}
     */
    geotoolkit.persistence.MementoDeserializationContext.prototype.getRegistry = function(){};
    /**
     * Push the current deserialized object. This method can be used if it is necessary to
     * provide the existing object for deserialization
     * @param {object} object instance of the deserialised class
     */
    geotoolkit.persistence.MementoDeserializationContext.prototype.pushCurrentObject = function(object){};
    /**
     * Pop the current object from the stack
     * @returns {object}
     */
    geotoolkit.persistence.MementoDeserializationContext.prototype.popCurrentObject = function(){};
    /**
     * Return the current object on the stack
     * @returns {object}
     */
    geotoolkit.persistence.MementoDeserializationContext.prototype.getCurrentObject = function(){};

/**
 * The abstract serializer
 *
 * @class geotoolkit.persistence.ObjectSerializer
 */
geotoolkit.persistence.ObjectSerializer = {};
    /**
     * Save object to context
     * @function
     * @param {object} object object to save
     * @param {object} context context to save
     */
    geotoolkit.persistence.ObjectSerializer.prototype.save = function(object, context){};
    /**
     * Load object from context
     * @function
     * @param {object} context context to save
     * @param {object} [object] object save properties
     */
    geotoolkit.persistence.ObjectSerializer.prototype.load = function(context, object){};

/**
 * The implementation fo the default serializer registry
 *
 * @class geotoolkit.persistence.Registry
 */
geotoolkit.persistence.Registry = {};
    /**
     * Return instance of the default registry
     * @returns {geotoolkit.persistence.Registry} registry
     */
    geotoolkit.persistence.Registry.getInstance = function(){};
    /**
     * Add serializer
     * @param {string} type type of the serializer
     * @param {object} serializer serializer
     */
    geotoolkit.persistence.Registry.prototype.addSerializer = function(type, serializer){};
    /**
     * Remove serializer
     * @param {string} type type of the serializer
     */
    geotoolkit.persistence.Registry.prototype.removeSerializer = function(type){};
    /**
     * Return serializer for the specified type
     * @param {string|object} type serializer for the specified type
     * @returns {?object}
     */
    geotoolkit.persistence.Registry.prototype.getSerializer = function(type){};

/**
 * The JsonSerializer class exposes the trivial serialization functions from a
 * JavaScript object to JSON and back
 * @param {geotoolkit.persistence.Registry} registry registry of serializers
 * @class geotoolkit.persistence.JsonSerializer
 *
 */
geotoolkit.persistence.JsonSerializer = {};
    /**
     * Serializes an object to a JSON string
     * @param {string|object} name the name of the object or the object to mementoize
     * @param {object} [value=null] The value to mementoize
     * @param {object} [source=null] the source project to add property
     * @returns {string}
     */
    geotoolkit.persistence.JsonSerializer.prototype.serialize = function(name, value, source){};
    /**
     * Deserializes a JSON string to the original object
     * @param {string} str text to be deserialised
     * @returns {geotoolkit.persistence.MementoDeserializationContext}
     */
    geotoolkit.persistence.JsonSerializer.prototype.deserialize = function(str){};

/**
 * The serialization context to XML
 * @class geotoolkit.persistence.XmlSerializationContext
 * @augments geotoolkit.persistence.SerializationContext
 */
geotoolkit.persistence.XmlSerializationContext = {};
    /**
     * Commit changes
     */
    geotoolkit.persistence.XmlSerializationContext.prototype.commit = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.XmlSerializationContext.prototype.addValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.XmlSerializationContext.prototype.setValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.XmlSerializationContext.prototype.getRegistry = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.XmlSerializationContext.prototype.addReference = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.XmlSerializationContext.prototype.getReferenceId = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.XmlSerializationContext.prototype.setObject = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.XmlSerializationContext.prototype.addObject = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.persistence.XmlSerializationContext.prototype.createChild = function(){};
    /**
     * Return a result of the serialization to Node
     * @returns {object}
     */
    geotoolkit.persistence.XmlSerializationContext.prototype.getNode = function(){};

/**
 * The deserialization context from XML
 *
 * @class geotoolkit.persistence.XmlDeserializationContext
 * @augments geotoolkit.persistence.DeserializationContext
 */
geotoolkit.persistence.XmlDeserializationContext = {};
    /**
     * Get value
     * @function
     * @param {string} name unique property name
     * @param {string} [type] optional type
     */
    geotoolkit.persistence.XmlDeserializationContext.prototype.getValue = function(name, type){};
    /**
     * Gets object. This method is for compatibility with Viewer only
     * @param {string} type type of the object
     * @param {string} name name of the property
     * @returns {object} value
     */
    geotoolkit.persistence.XmlDeserializationContext.prototype.getObject = function(type, name){};
    /**
     * Request value
     * @param {string} id unique id of the object
     * @param {function()} callback function contains parameter object that can be requested
     */
    geotoolkit.persistence.XmlDeserializationContext.prototype.requestObject = function(id, callback){};
    /**
     * Add reference
     * @param {string} id unique id for the object
     * @param {object} reference reference to the object to be connected to current id
     */
    geotoolkit.persistence.XmlDeserializationContext.prototype.addReference = function(id, reference){};
    /**
     * Get reference to object
     * @function
     * @param {string} id unique object id
     */
    geotoolkit.persistence.XmlDeserializationContext.prototype.getReference = function(id){};
    /**
     * Enumerate each child property
     * @param {function()} callback called by each child
     * @param {string} [propertyName = null] optional property name
     */
    geotoolkit.persistence.XmlDeserializationContext.prototype.queryChildren = function(callback, propertyName){};
    /**
     * Get registry of memento serializers
     * @function
     * @returns {geotoolkit.persistence.Registry}
     */
    geotoolkit.persistence.XmlDeserializationContext.prototype.getRegistry = function(){};
    /**
     * Push the current deserialized object. This method can be used if it is necessary to
     * provide the existing object for deserialization
     * @param {object} object current deserialized object
     */
    geotoolkit.persistence.XmlDeserializationContext.prototype.pushCurrentObject = function(object){};
    /**
     * Pop the current object from the stack
     * @returns {object}
     */
    geotoolkit.persistence.XmlDeserializationContext.prototype.popCurrentObject = function(){};
    /**
     * Return the current object on the stack
     * @returns {object}
     */
    geotoolkit.persistence.XmlDeserializationContext.prototype.getCurrentObject = function(){};

/**
 * The XmlSerializer class exposes the trivial serialization functions from a JavaScript object to
 * XML
 * @param {geotoolkit.persistence.Registry} registry registry of serializers
 * @class geotoolkit.persistence.XmlSerializer
 */
geotoolkit.persistence.XmlSerializer = {};
    /**
     * Serialize data
     * @param {string} name property name
     * @param {object} value object value
     * @returns {string}
     */
    geotoolkit.persistence.XmlSerializer.prototype.serialize = function(name, value){};
    /**
     * Deserialize data
     * @param {string|Node} data text to be deserialized
     * @returns {object}
     */
    geotoolkit.persistence.XmlSerializer.prototype.deserialize = function(data){};

/**
 * Parent class for all styles
 *
 * @class geotoolkit.attributes.Style
 * @augments geotoolkit.util.EventDispatcher
 */
geotoolkit.attributes.Style = {};
    /**
     * All inheritors should implement copy constructor or provide custom implementation for this method
     * @returns {object} clone copy
     */
    geotoolkit.attributes.Style.prototype.clone = function(){};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.attributes.Style} src Source to copy from
     * @param {boolean} [deepCopy=false] deep copy
     * @returns {geotoolkit.attributes.Style} this
     */
    geotoolkit.attributes.Style.prototype.copyConstructor = function(src, deepCopy){};
    /**
     * Gets time stamp
     *
     * @returns {number} timeStamp
     */
    geotoolkit.attributes.Style.prototype.getTimeStamp = function(){};
    /**
     * Update time stamp to indicate that style has been changed.
     * @returns {geotoolkit.attributes.Style} this
     */
    geotoolkit.attributes.Style.prototype.updateTimeStamp = function(){};
    /**
     * Set silent mode
     *
     * @param {boolean} bool flag to enable silent mode
     * @param {boolean} [force=false] true if parent should be invalidated immediately
     * @returns {geotoolkit.attributes.Style} this
     */
    geotoolkit.attributes.Style.prototype.setSilent = function(bool, force){};
    /**
     * Enable / disable notification
     * @param {boolean} enable enable or disable notifications
     * @param {boolean} [force=false] true if parent should be invalidated immediately
     * @deprecated Use setSilent instead
     * @returns {geotoolkit.attributes.Style} this
     */
    geotoolkit.attributes.Style.prototype.setNotification = function(enable, force){};
    /**
     * Return state of notification
     * @deprecated Use isSilent instead
     * @returns {boolean} current notification state
     */
    geotoolkit.attributes.Style.prototype.isNotificationEnabled = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties JSON containing properties
     */
    geotoolkit.attributes.Style.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @function
     */
    geotoolkit.attributes.Style.prototype.setProperties = function(properties){};
    /**
     * Notify the node that the style is invalidated
     * @returns {geotoolkit.attributes.Style} this
     */
    geotoolkit.attributes.Style.prototype.invalidate = function(){};
    /**
     * Return status of the global notification for all styles.
     * @returns {boolean}
     */
    geotoolkit.attributes.Style.isStyleNotificationEnabled = function(){};

/**
 * Defines properties to specify margins or
 * padding
 *
 * @class geotoolkit.attributes.SpaceStyle
 * @augments geotoolkit.attributes.Style
 * @param {object} [space] object which contains the following fields
 * @param {number | string} [space.left] left position
 * @param {number | string} [space.right] right position
 * @param {number | string} [space.top] top position
 * @param {number | string} [space.bottom] bottom position
 */
geotoolkit.attributes.SpaceStyle = {};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.SpaceStyle.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.SpaceStyle.prototype.copyConstructor = function(){};
    /**
     * return JSON representation of the space object
     *
     * @returns {object} o offsets
     * @returns {number|string} o.left left
     * @returns {number|string} o.right right
     * @returns {number|string} o.bottom bottom
     * @returns {number|string} o.top top
     */
    geotoolkit.attributes.SpaceStyle.prototype.getStyle = function(){};
    /**
     * Set style
     * @param {geotoolkit.attributes.SpaceStyle | object} spaceStyle space style
     * @returns {geotoolkit.attributes.SpaceStyle}
     */
    geotoolkit.attributes.SpaceStyle.prototype.setStyle = function(spaceStyle){};
    /**
     * Return left position
     * @returns {number | string}
     */
    geotoolkit.attributes.SpaceStyle.prototype.getLeft = function(){};
    /**
     * Set left position
     *
     * @param {number | string} left position
     * @returns {geotoolkit.attributes.SpaceStyle} this
     */
    geotoolkit.attributes.SpaceStyle.prototype.setLeft = function(left){};
    /**
     * Return top position
     * @returns {number | string}
     */
    geotoolkit.attributes.SpaceStyle.prototype.getTop = function(){};
    /**
     * Set top position
     *
     * @param {number | string} top position
     * @returns {geotoolkit.attributes.SpaceStyle} this
     */
    geotoolkit.attributes.SpaceStyle.prototype.setTop = function(top){};
    /**
     * Return right position
     * @returns {number | string}
     */
    geotoolkit.attributes.SpaceStyle.prototype.getRight = function(){};
    /**
     * Set right position
     *
     * @param {number | string} right position
     * @returns {geotoolkit.attributes.SpaceStyle} this
     */
    geotoolkit.attributes.SpaceStyle.prototype.setRight = function(right){};
    /**
     * Return bottom position
     * @returns {number | string}
     */
    geotoolkit.attributes.SpaceStyle.prototype.getBottom = function(){};
    /**
     * Set bottom position
     *
     * @param {number | string} bottom position
     * @returns {geotoolkit.attributes.SpaceStyle} this
     */
    geotoolkit.attributes.SpaceStyle.prototype.setBottom = function(bottom){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.attributes.SpaceStyle.setProperties}
     */
    geotoolkit.attributes.SpaceStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] object which contains the following fields
     * @param {number | string} [properties.left] left position
     * @param {number | string} [properties.right] right position
     * @param {number | string} [properties.top] top position
     * @param {number | string} [properties.bottom] bottom position
     * @returns {geotoolkit.attributes.SpaceStyle}
     */
    geotoolkit.attributes.SpaceStyle.prototype.setProperties = function(properties){};
    /**
     * Create or get space style from object
     *
     * @param {Object|geotoolkit.attributes.SpaceStyle} [object] object can be in format of constructor
     * geotoolkit.attributes.SpaceStyle
     * @returns {?geotoolkit.attributes.SpaceStyle} space style
     */
    geotoolkit.attributes.SpaceStyle.fromObject = function(object){};
    /**
     * Return area excluding space
     * @param {geotoolkit.attributes.SpaceStyle} style style to exclude space
     * @param {?geotoolkit.util.Rect} rect original area
     * @returns {?geotoolkit.util.Rect} area with excluding space
     */
    geotoolkit.attributes.SpaceStyle.excludeSpace = function(style, rect){};
    /**
     * Return area including space
     * @param {geotoolkit.attributes.SpaceStyle} style style to add space
     * @param {?geotoolkit.util.Rect} rect original area
     * @returns {?geotoolkit.util.Rect} area with including space
     */
    geotoolkit.attributes.SpaceStyle.addSpace = function(style, rect){};

/**
 * Defines a base class to define a pattern.
 *
 * @class geotoolkit.attributes.Pattern
 * @augments geotoolkit.util.EventDispatcher
 * @param {object} [data=null] The image patterns options
 * @param {string} [data.patternname=null] name of this pattern for indexing
 * @param {object} [data.userhandle=null] additional info associated with current image pattern
 * @param {string} [data.containername=null] an optional container name, which creates an image pattern. This
 * parameter is used for serialization if you want to save are reference to pattern instead of the pattern itself
 * @param {boolean} [data.scalable=false] flag that sets scalability of the pattern
 * coordinates, or relative to the shape it is filling (It is not supported)
 */
geotoolkit.attributes.Pattern = {};
    /**
     * Makes a pattern from the image
     *
     * @param {object} context 2d rendering context from canvas
     * @param {string} repetition style of repetition
     * @param {string} [foregroundColor=undefined] of the pattern
     * @param {geotoolkit.util.Transformation} [transform=undefined] current transformation
     * @returns {CanvasPattern} pattern
     */
    geotoolkit.attributes.Pattern.prototype.getPattern = function(context, repetition, foregroundColor, transform){};
    /**
     * Gets the X scale for image transformation.
     *
     * @protected
     * @returns {number}
     */
    geotoolkit.attributes.Pattern.prototype.getScaleX = function(){};
    /**
     * Gets the Y scale for image transformation.
     *
     * @protected
     * @returns {number}
     */
    geotoolkit.attributes.Pattern.prototype.getScaleY = function(){};
    /**
     * Returns true if image has already loaded and current instance is ready to draw.
     *
     * @returns {boolean}
     */
    geotoolkit.attributes.Pattern.prototype.isReady = function(){};
    /**
     * Returns size as a Dimension object with width and height attributes
     *
     * @returns {geotoolkit.util.Dimension} size
     */
    geotoolkit.attributes.Pattern.prototype.getSize = function(){};
    /**
     * Width of this pattern's image
     *
     * @returns {number} width
     */
    geotoolkit.attributes.Pattern.prototype.getWidth = function(){};
    /**
     * Height of this pattern's image
     *
     * @returns {number} height
     */
    geotoolkit.attributes.Pattern.prototype.getHeight = function(){};
    /**
     *
     * @returns {object} userHandle
     */
    geotoolkit.attributes.Pattern.prototype.getUserHandle = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.attributes.Pattern.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     *
     * @param {object} properties An object containing the properties to set
     * @param {string} [properties.patternname] Pattern name
     * @param {string} [properties.containername] Container name
     * @param {boolean} [properties.scalable] Defines pattern scalability
     * @param {function} [properties.userhandle] User handle function
     * @returns {geotoolkit.attributes.Pattern} this
     */
    geotoolkit.attributes.Pattern.prototype.setProperties = function(properties){};
    /**
     * invalidate parent
     *
     * @param {string} [foregroundColor=undefined] of the pattern
     * @returns {geotoolkit.attributes.Pattern} this
     */
    geotoolkit.attributes.Pattern.prototype.invalidate = function(foregroundColor){};
    /**
     * return the load image promise
     *
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.attributes.Pattern.prototype.getPromise = function(){};
    /**
     * This method sets the container and pattern name to be
     * used for serialization.
     *
     * @param {string} patternName pattern name
     * @param {string} containerName container name
     * @returns {geotoolkit.attributes.Pattern} this
     */
    geotoolkit.attributes.Pattern.prototype.setPatternName = function(patternName, containerName){};
    /**
     * Returns pattern name
     *
     * @returns {string} a pattern name
     */
    geotoolkit.attributes.Pattern.prototype.getPatternName = function(){};
    /**
     * Returns a name of the pattern container
     *
     * @returns {string} a container name
     */
    geotoolkit.attributes.Pattern.prototype.getContainerName = function(){};
    /**
     * Return the imagepattern data url promise
     *
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.attributes.Pattern.prototype.getDataURL = function(){};

/**
 * Defines a base class to define an image pattern.
 *
 * @class geotoolkit.attributes.ImagePattern
 * @example Example usage of pattern
 * var pattern = new geotoolkit.attributes.ImagePattern({'url': 'mysite/myimage.png'});
 * @example Example usage of pattern with container
 * geotoolkit.attributes.PatternFactory.getInstance().add("testpatterns");
 * var mypatterns = geotoolkit.attributes.PatternFactory.getInstance().getCategory("testpatterns");
 * mypatterns.add('salt', new geotoolkit.attributes.ImagePattern({'url': 'mysite/myimage.png'}));

 * // The next patatrn will point to pattern from container
 * var pattern = new geotoolkit.attributes.ImagePattern({'patternName': 'salt','containerName': "testpatterns"});
 *
 * @augments geotoolkit.attributes.Pattern
 * @param {HTMLImageElement | object} src image from DOM element or The image patterns options
 * @param {HTMLImageElement} src.src image from DOM element
 * @param {string} [src.patternname] name of this pattern for indexing
 * @param {object} [src.userhandle] additional info associated with current image pattern
 * @param {string} [src.url] or url of the image to load
 * @param {boolean} [src.rawsize] using image raw size
 * @param {string} [src.containername=null] an optional container name, which creates an image pattern. This
 * parameter is used for serialization if you want to save are reference to pattern instead of the pattern itself
 * @param {boolean} [src.scalable=false] Flag that sets scalability of the pattern
 * @param {number} [src.desiredWidth=null] desired image width
 * @param {number} [src.desiredHeight=null] desired image height
 * @param {string} [patternName] name of this pattern for indexing
 * @param {object} [userHandle] additional info associated with current image pattern
 * @param {string} [url] or url of the image to load
 * @param {boolean} [rawsize] using image raw size
 * @param {string} [containerName=null] an optional container name, which creates an image pattern. This
 * parameter is used for serialization if you want to save are reference to pattern instead of the pattern itself
 * @param {boolean} [scalable=false] Flag that sets scalability of the pattern
 * coordinates, or relative to the shape it is filling
 */
geotoolkit.attributes.ImagePattern = {};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.attributes.ImagePattern.prototype.getPattern = function(){};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.attributes.ImagePattern.prototype.getWidth = function(){};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.attributes.ImagePattern.prototype.getHeight = function(){};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.attributes.ImagePattern.prototype.getScaleX = function(){};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.attributes.ImagePattern.prototype.getScaleY = function(){};
    /**
     * Sets desired image width and height
     *
     * @param {geotoolkit.util.Dimension|number} width either dimension object or desired width of the image pattern
     * @param {number} [height] desired height of the image pattern
     * @returns {geotoolkit.attributes.ImagePattern} this
     */
    geotoolkit.attributes.ImagePattern.prototype.setDesiredSize = function(width, height){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {string} props.src Image source in b64 or url
     * @returns {string} props.alt Default text for an image
     * @returns {boolean} props.rawsize Raw size flag
     */
    geotoolkit.attributes.ImagePattern.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {boolean} [properties.rawsize] using image raw size
     * @param {number} [properties.desiredwidth] desired width of the image pattern
     * @param {number} [properties.desiredheight] desired height of the image pattern
     * @param {string} [properties.alt] text for an image
     * @param {HTMLImageElement | object} [properties.src] image from DOM element or The image patterns options
     * @returns {geotoolkit.attributes.ImagePattern}
     */
    geotoolkit.attributes.ImagePattern.prototype.setProperties = function(properties){};

/**
 * Defines pattern as a collection of shapes
 *
 * @class geotoolkit.attributes.GeometryPattern
 * @augments geotoolkit.attributes.Pattern
 * @param {object} [options] The image patterns options
 * @param {string} [options.patternname] name of this pattern for indexing
 * @param {object} [options.userhandle] additional info associated with current image pattern
 * parameter is used for serialization if you want to save are reference to pattern instead of the pattern itself
 * @param {geotoolkit.scene.Group} [options.model] A geometry to draw the pattern from
 * @param {boolean} [options.scalable=false] Flag that sets scalability of the pattern
 * coordinates, or relative to the shape it is filling
 * @example
 * // ImagePattern doesn't support scalable flag so the code belows shows how to create an image shape to fill a rectangle, add this image as a part of geometry pattern and use this pattern in FillStyle as an image pattern.
 * function createGeometry () {
 * var shape = new geotoolkit.scene.shapes.Image( {'url': "../images/intpattern.png", // path will differ per user.
 * 'x' : 0,
 * 'y' : 0,
 * 'alignment' : geotoolkit.util.AnchorType.LeftTop,
 * 'width': 10,
 * 'height': 10,
 * }).
 * on('ImageLoaded', function () {
 * shape.invalidate();
 * });
 *
 * return new geotoolkit.scene.Group()
 * .setBounds(new geotoolkit.util.Rect(0,0,150,150))
 * .setModelLimits(new geotoolkit.util.Rect(0,0,10,10))
 * .addChild(shape);
 * }
 * function createAnnotatedModel() {
 * // Scalable
 * var genPattern = new geotoolkit.attributes.GeometryPattern({
 * 'model': createGeometry(),
 * 'patternname': 'General Tutorial Pattern',
 * 'scalable': true
 * });
 * return new geotoolkit.scene.Group()
 * .addChild([
 * new geotoolkit.scene.Group()
 * .setCache(new geotoolkit.scene.ViewCache())
 * .addChild([
 * new geotoolkit.scene.shapes.Rectangle({
 * 'left': 50,
 * 'top': 50,
 * 'width': 150,
 * 'height': 150,
 * 'fillstyle': new geotoolkit.attributes.FillStyle({
 * 'pattern': genPattern
 * })
 * })
 * ])
 * ])
 * .setModelLimits(new geotoolkit.util.Rect(0, 0, 400, 400));
 * }
 */
geotoolkit.attributes.GeometryPattern = {};
    /**
     * Makes a pattern from the image
     *
     * @param {object} context 2d rendering context from canvas
     * @param {string} repetition style of repetition
     * @param {string} [foregroundColor=undefined] of the pattern
     * @param {geotoolkit.util.Transformation} transform Current transformation
     * @returns {CanvasPattern} pattern
     */
    geotoolkit.attributes.GeometryPattern.prototype.getPattern = function(context, repetition, foregroundColor, transform){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {string} props.patternname Name of the pattern
     * @returns {boolean} props.scalable Scalability flag
     */
    geotoolkit.attributes.GeometryPattern.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     *
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.scene.Group} [properties.model] A geometry to draw the pattern from
     * @returns {geotoolkit.attributes.GeometryPattern}
     */
    geotoolkit.attributes.GeometryPattern.prototype.setProperties = function(properties){};

/**
 * Define an image container or named collection of images.
 *
 * @class geotoolkit.attributes.ImageContainer
 * @param {string} name name of this image container
 */
geotoolkit.attributes.ImageContainer = {};
    /** IE9 is supported with Fl;
     * Query image element by name
     *
     * @param {string} imageName name of the image
     * @returns {?HTMLImageElement} element
     */
    geotoolkit.attributes.ImageContainer.prototype.queryImage = function(imageName){};
    /**
     * Query image pattern by name
     *
     * @param {string} imageName name of the image
     * @returns {geotoolkit.attributes.ImagePattern} image pattern
     */
    geotoolkit.attributes.ImageContainer.prototype.queryPattern = function(imageName){};
    /**
     * Register image element
     *
     * @param {string} [imageName] nullable an unique name
     * @param {HTMLImageElement} [element] nullable image element to be registered
     * @param {Object} [userHandler] optional user handle
     */
    geotoolkit.attributes.ImageContainer.prototype.register = function(imageName, element, userHandler){};
    /**
     * Unregister image element
     * @param {string} imageName an unique name
     */
    geotoolkit.attributes.ImageContainer.prototype.unRegister = function(imageName){};
    /**
     * Clear all the image
     */
    geotoolkit.attributes.ImageContainer.prototype.clear = function(){};
    /**
     * Return an array that contains all images names in container
     * @returns {string[]}
     */
    geotoolkit.attributes.ImageContainer.prototype.queryImageNames = function(){};
    /**
     * Returns image container by name
     *
     * @param {string} name name of the container
     * @returns {geotoolkit.attributes.ImageContainer} container
     */
    geotoolkit.attributes.ImageContainer.getContainer = function(name){};

/**
 * Implements a container to store geometries that define a pattern
 *
 * @class geotoolkit.attributes.GeometryContainer
 * @param {string} name name of this geometry container
 */
geotoolkit.attributes.GeometryContainer = {};
    /**
     * Query geometry element by name
     *
     * @param {string} geometryName name of the geometry
     * @returns {geotoolkit.scene.Group} geometry element
     */
    geotoolkit.attributes.GeometryContainer.prototype.queryGeometry = function(geometryName){};
    /**
     * Query geometry pattern by name
     *
     * @param {string} geometryName name of the geometry
     * @returns {geotoolkit.attributes.GeometryPattern} geometry pattern
     */
    geotoolkit.attributes.GeometryContainer.prototype.queryPattern = function(geometryName){};
    /**
     * Register geometry element
     *
     * @param {string} [geometryName=null] an unique name
     * @param {geotoolkit.scene.Group} [element=null] geometry element to be registered
     * @param {Object} [userHandler=null] optional user handle
     */
    geotoolkit.attributes.GeometryContainer.prototype.register = function(geometryName, element, userHandler){};
    /**
     * Unregister geometry element
     *
     * @param {string} geometryName an unique name
     */
    geotoolkit.attributes.GeometryContainer.prototype.unRegister = function(geometryName){};
    /**
     * Unregisteres and removes all the geometries from container
     */
    geotoolkit.attributes.GeometryContainer.prototype.clear = function(){};
    /**
     * Returns an array of names registered in geometry container at the moment of calling
     * @returns {Array.<string>}
     */
    geotoolkit.attributes.GeometryContainer.prototype.queryGeometryNames = function(){};
    /**
     * Returns geometry container by name
     *
     * @param {string} name name of the container
     * @returns {geotoolkit.attributes.GeometryContainer} get new instance of geometry container
     */
    geotoolkit.attributes.GeometryContainer.getContainer = function(name){};

/**
 * Defines a base class to define a style that has a color attribute.
 *
 * @class geotoolkit.attributes.ColoredStyle
 * @augments geotoolkit.attributes.Style
 * @param {(string|geotoolkit.util.RgbaColor|object)} [color=black] color in CSS form
 * @param {Object} [shadow] JSON for displaying shadow
 * @param {string} [shadow.color = 'grey'] shadow color
 * @param {number} [shadow.blur = 0] shadow blur
 * @param {number} [shadow.offsetx = 0] shadow offset in x direction
 * @param {number} [shadow.offsety = 0] shadow offset in y direction
 * @param {boolean} [shadow.enable = false] check if shadow is enable or not
 */
geotoolkit.attributes.ColoredStyle = {};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.ColoredStyle.prototype.copyConstructor = function(){};
    /**
     * Sets color
     *
     * @param {(string|geotoolkit.util.RgbaColor)} color in CSS string form or RgbaColor object
     * @returns {geotoolkit.attributes.ColoredStyle} this
     */
    geotoolkit.attributes.ColoredStyle.prototype.setColor = function(color){};
    /**
     * Returns color
     *
     * @returns {string} color in CSS form
     */
    geotoolkit.attributes.ColoredStyle.prototype.getColor = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {Object} props JSON containing properties
     * @returns {string|geotoolkit.util.RgbaColor} [props.color] The attribute color
     * @returns {Object} [props.shadow] shadow JSON with offsetx, offsety, color and blur properites
     * @returns {string} [props.shadow.color] shadow color
     * @returns {number} [props.shadow.blur] shadow blur
     * @returns {number} [props.shadow.offsetx] shadow offset in x direction
     * @returns {number} [props.shadow.offsety] shadow offset in y direction
     * @returns {boolean} [props.shadow.enable] check if shadow is enable or not
     */
    geotoolkit.attributes.ColoredStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     *
     * @param {Object} properties An object containing the properties to set
     * @param {string|geotoolkit.util.RgbaColor} [properties.color] The attribute color
     * @param {Object} [properties.shadow] shadow JSON see {@link geotoolkit.attributes.ColoredStyle#setShadow}
     * @returns {geotoolkit.attributes.ColoredStyle} this
    
    
     */
    geotoolkit.attributes.ColoredStyle.prototype.setProperties = function(properties){};
    /**
     * Sets all properties pertaining to shadow
     * @param {Object} shadow data
     * @param {string} [shadow.color = 'grey'] color of shadow
     * @param {number} [shadow.blur = 0] blur shadow
     * @param {number} [shadow.offsetx = 0] x offset for shadow
     * @param {number} [shadow.offsety = 0] y offset for shadow
     * @param {boolean} [shadow.enable = false] check if shadow is enable or not
     * @returns {geotoolkit.attributes.ColoredStyle} this
     */
    geotoolkit.attributes.ColoredStyle.prototype.setShadow = function(shadow){};
    /**
     * Gets all properties pertaining to shadow
     * @returns {Object} shadow
     * @returns {string|geotoolkit.util.RgbaColor} [props.color] The attribute color
     * @returns {Object} [shadow.shadow] shadow JSON with offsetX, offsetY, color and blur properites
     * @returns {string} [shadow.shadow.color] shadow color
     * @returns {number} [shadow.shadow.blur] shadow blur
     * @returns {number} [shadow.shadow.offsetx] shadow offset in x direction
     * @returns {number} [shadow.shadow.offsety] shadow offset in y direction
     * @returns {boolean} [shadow.shadow.enable] check if shadow is enable or not
     */
    geotoolkit.attributes.ColoredStyle.prototype.getShadow = function(){};

/**
 * Defines properties of outline. It contains line color, line width, and
 * pattern. Patterns can be passed in using LineStyle.Pattern.Dot etc.
 *
 * @class geotoolkit.attributes.LineStyle
 * @augments geotoolkit.attributes.ColoredStyle
 * @param {(Object|string|geotoolkit.util.RgbaColor)} [color="black"] The line color
 * @param {(string|geotoolkit.util.RgbaColor)} [color.color="black"] The line color
 * @param {number} [color.width=1] The line thickness
 * @param {Array.<number>|geotoolkit.attributes.LineStyle.Patterns} [color.pattern=null] The line pattern
 * @param {geotoolkit.attributes.LineStyle.JoinStyle|string} [color.linejoin=Round] The line join style
 * @param {geotoolkit.attributes.LineStyle.CapStyle|string} [color.linecap=Butt] The line cap style
 * @param {geotoolkit.attributes.FillStyle} [color.fill=null] optional fill style to be used to fill lines generated with this style.
 * @param {geotoolkit.util.AbstractUnit|string} [color.unit=null] optional unit for the width
 * @param {Object} [color.shadow] JSON for displaying shadow
 * @param {string} [color.shadow.color = 'grey'] shadow color
 * @param {number} [color.shadow.blur = 0] shadow blur
 * @param {number} [color.shadow.offsetx = 0] shadow offset in x direction
 * @param {number} [color.shadow.offsety = 0] shadow offset in y direction
 * @param {boolean} [color.shadow.enable = false] check if shadow is enable or not
 * @param {Object} [color.pixelsnapmode] pixelSnapMode JSON with x and y attributes with booleans default({'x': false, 'y': false})
 * @param {number} [width=1] The line thickness
 * @param {Array.<number>|geotoolkit.attributes.LineStyle.Patterns} [pattern=null] The line pattern
 */
geotoolkit.attributes.LineStyle = {};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.LineStyle.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.LineStyle.prototype.copyConstructor = function(){};
    /**
     * Enum of line style patterns
     * @enum
     * @readonly
     */
    geotoolkit.attributes.LineStyle.Patterns = {};
        /**
         * Solid line
         * @type {null}
         */
        geotoolkit.attributes.LineStyle.Patterns.Solid = {};
        /**
         * Line with long dashes
         * @type {Array.<number>}
         */
        geotoolkit.attributes.LineStyle.Patterns.Dash = {};
        /**
         * Small dots continuously
         * @type {Array.<number>}
         */
        geotoolkit.attributes.LineStyle.Patterns.Dot = {};
        /**
         * Dash followed by dot
         * @type {Array.<number>}
         */
        geotoolkit.attributes.LineStyle.Patterns.DashDot = {};
        /**
         * Short Dashes
         * @type {Array.<number>}
         */
        geotoolkit.attributes.LineStyle.Patterns.ShortDash = {};
        /**
         * Very long dashes
         * @type {Array.<number>}
         */
        geotoolkit.attributes.LineStyle.Patterns.LongDash = {};
        /**
         * Dash followed by two dots
         * @type {Array.<number>}
         */
        geotoolkit.attributes.LineStyle.Patterns.DashDotDot = {};
        /**
         * Dash followed by long dash
         * @type {Array.<number>}
         */
        geotoolkit.attributes.LineStyle.Patterns.DashLongDash = {};
    /**
     * Enum of line join
     * @enum
     * @readonly
     */
    geotoolkit.attributes.LineStyle.JoinStyle = {};
        /**
         * Angular
         * @type {string}`
         */
        geotoolkit.attributes.LineStyle.JoinStyle.Miter = "";
        /**
         * Rounded
         * @type {string}
         */
        geotoolkit.attributes.LineStyle.JoinStyle.Round = "";
        /**
         * Bevelled
         * @type {string}
         */
        geotoolkit.attributes.LineStyle.JoinStyle.Bevel = "";
    /**
     * Enum of line join
     * @enum
     * @readonly
     */
    geotoolkit.attributes.LineStyle.CapStyle = {};
        /**
         * Short Angular
         * @type {string}
         */
        geotoolkit.attributes.LineStyle.CapStyle.Butt = "";
        /**
         * Rounded
         * @type {string}
         */
        geotoolkit.attributes.LineStyle.CapStyle.Round = "";
        /**
         * Long Angular
         * @type {string}
         */
        geotoolkit.attributes.LineStyle.CapStyle.Square = "";
    /**
     * return Pixel Snap Mode
     * @returns {{x: boolean, y: boolean}}
     */
    geotoolkit.attributes.LineStyle.prototype.getPixelSnapMode = function(){};
    /**
     * Set Pixel Snap Mode
     *
     * @param {object | boolean} [pixelSnapMode] JSON with x and y attributes with booleans
     * @param {boolean} [pixelSnapMode.x] snap by x
     * @param {boolean} [pixelSnapMode.y] snap by y
     * @returns {geotoolkit.attributes.LineStyle} this
     */
    geotoolkit.attributes.LineStyle.prototype.setPixelSnapMode = function(pixelSnapMode){};
    /**
     * Sets fill style to fill line content. if fill is set line color is ignored
     *
     * @param {geotoolkit.attributes.FillStyle|object} fill fill style to to be used to fill line.
     * @returns {geotoolkit.attributes.LineStyle} this
     */
    geotoolkit.attributes.LineStyle.prototype.setFillStyle = function(fill){};
    /**
     * Returns fill style
     * @returns {geotoolkit.attributes.FillStyle} fill style
     */
    geotoolkit.attributes.LineStyle.prototype.getFillStyle = function(){};
    /**
     * Line join style, passes through to the underlying html5 canvas renderer.
     *
     * @param {geotoolkit.attributes.LineStyle.JoinStyle|string} lineJoin style, can be 'miter', 'round' and 'bevel'
     * @returns {geotoolkit.attributes.LineStyle} this
     */
    geotoolkit.attributes.LineStyle.prototype.setJoinStyle = function(lineJoin){};
    /**
     * Get current lineJoin style
     *
     * @returns {geotoolkit.attributes.LineStyle.JoinStyle|string} lineJoin style, can be 'miter', 'round' and 'bevel'
     */
    geotoolkit.attributes.LineStyle.prototype.getJoinStyle = function(){};
    /**
     * Line cap style, passes through to canvas directly
     * @param {geotoolkit.attributes.LineStyle.CapStyle|string} capStyle can be 'butt', 'square', or 'round'
     * @returns {geotoolkit.attributes.LineStyle} this
     */
    geotoolkit.attributes.LineStyle.prototype.setCapStyle = function(capStyle){};
    /**
     * Get current line cap style
     * @returns {geotoolkit.attributes.LineStyle.CapStyle|string} capStyle can be 'butt', 'square', or 'round'
     */
    geotoolkit.attributes.LineStyle.prototype.getCapStyle = function(){};
    /**
     * Returns unit of the measure for the width
     *
     * @returns {geotoolkit.util.AbstractUnit}
     */
    geotoolkit.attributes.LineStyle.prototype.getUnit = function(){};
    /**
     * Sets unit of the measure for the width
     *
     * @param {geotoolkit.util.AbstractUnit|string} unit a scale unit or string symbol
     * @returns {geotoolkit.attributes.LineStyle} this
     */
    geotoolkit.attributes.LineStyle.prototype.setUnit = function(unit){};
    /**
     * Sets line width
     *
     * @param {number} width line width
     * @returns {geotoolkit.attributes.LineStyle} this
     */
    geotoolkit.attributes.LineStyle.prototype.setWidth = function(width){};
    /**
     * Return line width
     *
     * @returns {number} line width
     */
    geotoolkit.attributes.LineStyle.prototype.getWidth = function(){};
    /**
     * Return line pattern
     *
     * @returns {geotoolkit.attributes.LineStyle.Patterns|Array.<number>} pattern
     */
    geotoolkit.attributes.LineStyle.prototype.getPattern = function(){};
    /**
     * Sets line pattern
     *
     * @param {geotoolkit.attributes.LineStyle.Patterns|Array.<number>} pattern line pattern
     * @returns {geotoolkit.attributes.LineStyle} this
     */
    geotoolkit.attributes.LineStyle.prototype.setPattern = function(pattern){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {Object}
     */
    geotoolkit.attributes.LineStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
    
     * <br>
     * <br>
     * <h5>CSS Descriptions:</h5>
     * <table class="params">
     * <thead>
     * <tr>
     * <th>Property</th><th>Description</th><th>Example</th>
     * </tr>
     * </thead>
     * <tbody>
     * <tr>
     * <td>linestyle-color</td><td>Change line style color</td><td>{ linestyle-color: #000; }</td>
     * </tr>
     * <tr>
     * <td>linestyle-width</td><td>Change line style width </td><td>{ linestyle-width: 2 ;}</td>
     * </tr>
     * <tbody>
     * </table>
     * <br>
     *
     * @override
     * @param {Object} [properties] An object containing the properties to set
     * @param {number} [properties.width] line thickness
     * @param {geotoolkit.attributes.LineStyle.Patterns|Array.<number>} [properties.pattern] line pattern
     * @param {geotoolkit.attributes.LineStyle.Patterns|Array.<number>} [properties.linepattern] deprecated (since 2.6) line pattern
     * @param {geotoolkit.attributes.LineStyle.JoinStyle|string} [properties.linejoin] The line join style
     * @param {geotoolkit.attributes.LineStyle.CapStyle|string} [properties.linecap] The line cap style
     * @param {geotoolkit.util.AbstractUnit|string} [properties.unit] optional unit for the width
     * @param {Object} [properties.pixelsnapmode] pixel SnapMode JSON see {@link geotoolkit.attributes.LineStyle#setPixelSnapMode}
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.attributes.LineStyle.prototype.setProperties = function(properties){};
    /**
     * Create or get line style from object
     * @param {Object|geotoolkit.attributes.LineStyle} [object] object can be in format of constructor of geotoolkit.attributes.LineStyle
     * @returns {?geotoolkit.attributes.LineStyle} line style
     */
    geotoolkit.attributes.LineStyle.fromObject = function(object){};
    /**
     * Merge css linestyle object with existing instance
     * @param {geotoolkit.scene.Node} node
     * @param {geotoolkit.attributes.LineStyle} lineStyle instance of node property
     * @param {geotoolkit.attributes.LineStyle|string|object} object contains line style
     * @param {boolean} [merge=false] merge flag
     * @param {function} [invalidateMethod=null]
     * @returns {geotoolkit.attributes.LineStyle} lineStyle
     * @example
     * Shape.prototype.setLineStyle = function (lineStyle, merge) {
     * if (this.lineStyle === lineStyle) {
     * return this;
     * }
     *
     * this.lineStyle = geotoolkit.attributes.LineStyle.mergeFromObject(this, this.lineStyle, lineStyle, merge, this.getInvalidateMethod());
     *
     * this.updateState()
     * .invalidate();
     * return this;
     * };
     */
    geotoolkit.attributes.LineStyle.mergeFromObject = function(node, lineStyle, object, merge, invalidateMethod){};
    /**
     * Empty style
     * @type {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.attributes.LineStyle.Empty = {};

/**
 * Defines fill style. This fill style can have a color and a pattern
 *
 * @class geotoolkit.attributes.FillStyle
 * @augments geotoolkit.attributes.ColoredStyle
 * @implements geotoolkit.attributes.IRasterable
 * @param {string|geotoolkit.util.RgbaColor|geotoolkit.attributes.FillStyle|object} [color='black'] - The fill color
 * @param {string|geotoolkit.util.RgbaColor} [color.color='black'] - The fill color
 * @param {geotoolkit.attributes.ImagePattern} [color.pattern=null] - The background pattern
 * @param {string|geotoolkit.util.RgbaColor} [color.foreground=undefined] - The foreground color of the pattern
 * @param {boolean} [color.evenoddmode=false] - The flag indicating whether even-odd fill mode is to be used.
 * @param {geotoolkit.attributes.ImagePattern} [pattern=null] - The background pattern
 * @param {string|geotoolkit.util.RgbaColor} [foreground=undefined] - The foreground color of the pattern
 * @param {boolean} [evenoddmode=false] - The flag indicating whether even-odd fill mode is to be used.
 * @param {Object} [shadow] JSON for displaying shadow
 * @param {string} [shadow.color = 'grey'] shadow color
 * @param {number} [shadow.blur = 0] shadow blur
 * @param {number} [shadow.offsetx = 0] shadow offset in x direction
 * @param {number} [shadow.offsety = 0] shadow offset in y direction
 * @param {boolean} [shadow.enable = false] check if shadow is enable or not
 */
geotoolkit.attributes.FillStyle = {};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.FillStyle.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.FillStyle.prototype.copyConstructor = function(){};
    /**
     * Attach listener on event
     * @param {string} type type of event or property
     * @param {function()} callback to be called
     * @returns {geotoolkit.attributes.FillStyle} this
     */
    geotoolkit.attributes.FillStyle.prototype.on = function(type, callback){};
    /**
     * Detach listener on event.
     * Calling .off() with no arguments removes all attached listeners.
     * Calling .off(type) with no callback removes all attached listeners for specific type.
     * @param {string} [type] type of the event
     * @param {function()} [callback] function to be called
     * @returns {geotoolkit.attributes.FillStyle} this
     */
    geotoolkit.attributes.FillStyle.prototype.off = function(type, callback){};
    /**
     * Return fill pattern. Can pass in rendering context to get HTML DOM
     * pattern, or no arguments to get fillPattern object.
     *
     * @param {geotoolkit.renderer.RenderingContext} [context=undefined] Rendering Context
     * @returns {?geotoolkit.attributes.ImagePattern} image pattern
     */
    geotoolkit.attributes.FillStyle.prototype.getPattern = function(context){};
    /**
     * Sets fill pattern.
     *
     * @param {geotoolkit.attributes.ImagePattern} [pattern] fill pattern
     * @returns {geotoolkit.attributes.FillStyle} this
     */
    geotoolkit.attributes.FillStyle.prototype.setPattern = function(pattern){};
    /**
     * Gets type of style this is, STYLE_TYPE_COLOR or STYLE_TYPE_PATTERN
     *
     * @returns {string} styleType
     */
    geotoolkit.attributes.FillStyle.prototype.getStyleType = function(){};
    /**
     * Sets foreground color
     *
     * @param {(string|geotoolkit.util.RgbaColor)} color RgbaColor for foreground
     * @returns {geotoolkit.attributes.FillStyle} this
     */
    geotoolkit.attributes.FillStyle.prototype.setForegroundColor = function(color){};
    /**
     * gets foreground color
     *
     * @returns {string} color in CSS form
     */
    geotoolkit.attributes.FillStyle.prototype.getForegroundColor = function(){};
    /**
     * Gets the even odd fill mode
     *
     * @returns {boolean} evenOddMode The even odd fill mode flag.
     */
    geotoolkit.attributes.FillStyle.prototype.getEvenOddMode = function(){};
    /**
     * Sets the even odd fill mode
     *
     * @param {boolean}evenOddMode The even odd fill mode flag.
     * @returns {geotoolkit.attributes.FillStyle} this
     */
    geotoolkit.attributes.FillStyle.prototype.setEvenOddMode = function(evenOddMode){};
    /**
     * Returns true if fills are identical
     *
     * @param {geotoolkit.attributes.FillStyle} other FillStyle to compare against
     * @returns {boolean}
     */
    geotoolkit.attributes.FillStyle.prototype.equalsTo = function(other){};
    /**
     * Gets all the properties pertaining to this object
     *
     * @returns {Object} object The object configuration
     * @returns {geotoolkit.attributes.ImagePattern} object.pattern The pattern object
     * @returns {string|geotoolkit.util.RgbaColor} object.foreground The foreground color
     */
    geotoolkit.attributes.FillStyle.prototype.getProperties = function(){};
    /**
     *
     * Sets all the properties pertaining to this object
     * <br>
     * <br>
     * <h5>CSS Descriptions:</h5>
     * <table class="params">
     * <thead>
     * <tr>
     * <th>Property</th><th>Description</th><th class="last">Example</th>
     * </tr>
     * </thead>
     * <tbody>
     * <tr>
     * <td class="name"> fillstyle-color </td><td class="type">Change fill style color</td><td class="description last">{ fillstyle-color: #000; }</td>
     * </tr>
     * </tbody>
     * </table>
     * <br>
     * <br>
     * @override
     * @param {Object} properties An object containing the properties to set
     * @param {geotoolkit.attributes.ImagePattern} [properties.pattern] the pattern to fill
     * @param {geotoolkit.attributes.ImagePattern} [properties.fillpattern] deprecated (since 2.6) the pattern to fill
     * @param {string|geotoolkit.util.RgbaColor} [properties.foreground] foreground color
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.attributes.FillStyle.prototype.setProperties = function(properties){};
    /**
     * Returns a new instance of geotoolkit.attributes.Raster
     *
     * @param {number} [xMin=0] x Min position to get color
     * @param {number} [yMin=0] y Min position to get color
     * @param {number} [xMax=0] x Max position to get color
     * @param {number} [yMax=0] y Max position to get color
     * @returns {geotoolkit.attributes.Raster}
     */
    geotoolkit.attributes.FillStyle.prototype.getRaster = function(xMin, yMin, xMax, yMax){};
    /**
     * Disposes this style, once disposes a style should not be used anymore.
     * @override
     */
    geotoolkit.attributes.FillStyle.prototype.dispose = function(){};
    /**
     * Create or get fill style from object
     *
     * @param {Object|geotoolkit.attributes.FillStyle} [object] object can be in format of constructor
     * geotoolkit.attributes.FillStyle
     * @returns {?(geotoolkit.attributes.FillStyle|geotoolkit.attributes.LinearGradientStyle|geotoolkit.attributes.RadialGradientStyle)}
     */
    geotoolkit.attributes.FillStyle.fromObject = function(object){};
    /**
     * Merge css fillstyle object with existing instance
     * @param {geotoolkit.scene.Node} node
     * @param {geotoolkit.attributes.FillStyle} fillStyle instance of node property
     * @param {geotoolkit.attributes.FillStyle|object|string} object contains fill style
     * @param {boolean} [merge=false] merge flag
     * @param {function} [invalidateMethod=null]
     * @returns {geotoolkit.attributes.FillStyle} fillStyle
     * @example
     * Shape.prototype.setFillStyle = function (fillStyle, merge) {
     * if (this.fillStyle === fillStyle) {
     * return this;
     * }
     *
     * this.fillStyle = geotoolkit.attributes.FillStyle.mergeFromObject(this, this.fillStyle, fillStyle, merge, this.getInvalidateMethod());
     *
     * this.updateState()
     * .invalidate();
     * return this;
     * };
     */
    geotoolkit.attributes.FillStyle.mergeFromObject = function(node, fillStyle, object, merge, invalidateMethod){};
    /**
     * Empty style
     * @type {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.attributes.FillStyle.Empty = {};
    /**
     * Pick style
     * @type {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.attributes.FillStyle.Pick = {};

/**
 * Defines a collection of text properties.
 * Constructor can be TextStyle(color,baseLine,alignment,font) or
 * TextStyle(font) or TextStyle(baseLine, alignment)
 *
 * @class geotoolkit.attributes.TextStyle
 * @augments geotoolkit.attributes.ColoredStyle
 * @param {string|geotoolkit.util.RgbaColor|object} [options="black"] text color or a json object
 * @param {string|geotoolkit.util.RgbaColor} [options.color="black"] text color
 * @param {geotoolkit.attributes.TextStyle.BaseLineStyle|string} [options.baseline=TextStyle.BaseLineStyle.Middle] base line.
 * @param {geotoolkit.attributes.TextStyle.AlignmentStyle|string} [options.alignment=TextStyle.AlignmentStyle.Left] alignment.
 * @param {string} [options.font="12px sans-serif"] font.
 * @param {boolean} [options.autosize=true] auto font size on high definition display.
 * @param {boolean} [options.multiline=true] allow multi-line text
 * @param {string} [options.fonturl] the place from which the font will be loaded, if null - uses system fonts
 * @param {geotoolkit.attributes.TextStyle.BaseLineStyle|string} [baseLine=TextStyle.BaseLineStyle.Middle] base line.
 * @param {geotoolkit.attributes.TextStyle.AlignmentStyle|string} [alignment=TextStyle.AlignmentStyle.Left] alignment.
 * @param {string} [font="12px sans-serif"] font.
 * @param {boolean} [autoSize=true] auto font size on high definition display.
 * @param {boolean} [multiline=true] allow multi-line text
 * @param {Object} [shadow] JSON for displaying shadow
 * @param {string} [shadow.color = 'grey'] shadow color
 * @param {number} [shadow.blur = 0] shadow blur
 * @param {number} [shadow.offsetx = 0] shadow offset in x direction
 * @param {number} [shadow.offsety = 0] shadow offset in y direction
 * @param {boolean} [shadow.enable = false] check if shadow is enable or not
 */
geotoolkit.attributes.TextStyle = {};
    /**
     * Create a deep copy
     * @returns {geotoolkit.attributes.TextStyle} clone
     */
    geotoolkit.attributes.TextStyle.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.TextStyle.prototype.copyConstructor = function(){};
    /**
     * utility function to parse inline font string to json object.
     * if the font string is not valid it will return an null object.
     *
     * @param {string} font
     * @returns {object|null}
     */
    geotoolkit.attributes.TextStyle.parseFont = {};
    /**
     * Allows text to be printed along multiple lines.
     *
     * @param {boolean} multiLine allow text to be printed along multiple lines or not
     * @returns {geotoolkit.attributes.TextStyle} this
     */
    geotoolkit.attributes.TextStyle.prototype.setMultiLine = function(multiLine){};
    /**
     * true if text is multiline
     *
     * @returns {boolean} multiline
     */
    geotoolkit.attributes.TextStyle.prototype.getMultiLine = function(){};
    /**
     * Sets line height
     * see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
     *
     * @param {string|number} lineHeight line height
     * @returns {geotoolkit.attributes.TextStyle} this
     */
    geotoolkit.attributes.TextStyle.prototype.setLineHeight = function(lineHeight){};
    /**
     * Return line height
     * see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
     *
     * @returns {string|number} lineHeight
     */
    geotoolkit.attributes.TextStyle.prototype.getLineHeight = function(){};
    /**
     * Return font
     *
     * @returns {string} font in CSS format
     */
    geotoolkit.attributes.TextStyle.prototype.getFont = function(){};
    /**
     * Sets font
     *
     * @param {string} font font in CSS format
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.attributes.TextStyle.prototype.setFont = function(font){};
    /**
     * Gets outline style
     *
     * @returns {geotoolkit.attributes.LineStyle} ouline style
     */
    geotoolkit.attributes.TextStyle.prototype.getOutline = function(){};
    /**
     * Sets outline style
     *
     * @param {string|object|geotoolkit.attributes.LineStyle} style outline style
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.attributes.TextStyle.prototype.setOutline = function(style){};
    /**
     * Return current text baseline
     * @returns {geotoolkit.attributes.TextStyle.BaseLineStyle} baseline in CSS format
     */
    geotoolkit.attributes.TextStyle.prototype.getBaseLine = function(){};
    /**
     * Enum of base line
     * @readonly
     * @enum
     */
    geotoolkit.attributes.TextStyle.BaseLineStyle = {};
        /**
         * Alphabetic (Default)
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.BaseLineStyle.Alphabetic = "";
        /**
         * Top
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.BaseLineStyle.Top = "";
        /**
         * Hanging
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.BaseLineStyle.Hanging = "";
        /**
         * Middle
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.BaseLineStyle.Middle = "";
        /**
         * Ideographic
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.BaseLineStyle.Ideographic = "";
        /**
         * Bottom
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.BaseLineStyle.Bottom = "";
    /**
     * Enum of alignment
     * @readonly
     * @enum
     */
    geotoolkit.attributes.TextStyle.AlignmentStyle = {};
        /**
         * Start
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.AlignmentStyle.Start = "";
        /**
         * End
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.AlignmentStyle.End = "";
        /**
         * Left (Default)
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.AlignmentStyle.Left = "";
        /**
         * Center
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.AlignmentStyle.Center = "";
        /**
         * Right
         * @type {string}
         */
        geotoolkit.attributes.TextStyle.AlignmentStyle.Right = "";
    /**
     * Sets base line, for alignment geotoolkit.scene.shapes.Text use AnchorType
     * @param {geotoolkit.attributes.TextStyle.BaseLineStyle|string} baseLine in CSS format
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.attributes.TextStyle.prototype.setBaseLine = function(baseLine){};
    /**
     * Return text alignment
     *
     * @returns {string|geotoolkit.attributes.TextStyle.AlignmentStyle} alignment in CSS format
     */
    geotoolkit.attributes.TextStyle.prototype.getAlignment = function(){};
    /**
     * Sets text alignment
     *
     * @param {geotoolkit.attributes.TextStyle.AlignmentStyle|string} alignment in CSS format
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.attributes.TextStyle.prototype.setAlignment = function(alignment){};
    /**
     * Sets auto size
     *
     * @param {boolean} autoSize autosize enable or not
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.attributes.TextStyle.prototype.setAutoSize = function(autoSize){};
    /**
     * Return an object results of the {@link geotoolkit.attributes.TextStyle.parseFont} of the inline font string.
     *
     * @returns {Object}
     */
    geotoolkit.attributes.TextStyle.prototype.getProcessedFont = function(){};
    /**
     * Return text auto size
     *
     * @returns {boolean}
     */
    geotoolkit.attributes.TextStyle.prototype.getAutoSize = function(){};
    /**
     * @returns {string} string value of font
     */
    geotoolkit.attributes.TextStyle.prototype.toString = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.attributes.TextStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * <br>
     * <br>
     * <h5>CSS Descriptions:</h5>
     * <table class="params">
     * <thead>
     * <tr>
     * <th>Property</th><th>Description</th><th>Example</th>
     * </tr>
     * </thead>
     * <tbody>
     * <tr>
     * <td>textstyle-color</td><td>Change text style color</td><td>{ textstyle-color: #000; }</td>
     * </tr>
     * <tr>
     * <td>textstyle-baseline</td><td>Change baseline</td><td>{ textstyle-baseline: alphabetic; }</td>
     * </tr>
     * <tr>
     * <td>textstyle-font</td><td>Change font</td><td>{textstyle-font: 42px Roboto;}</td>
     * </tr>
     * <tr>
     * <td>textstyle-alignment</td><td>Change text style alignment</td><td>{textstyle-alignment: center;}</td>
     * </tr>
     * <tbody>
     * </table>
     * <br>
     * @see {@link geotoolkit.attributes.ColoredStyle}
     * @override
     * @param {object} [properties] An object containing the properties to set
     * @param {string} [properties.font] font in CSS format
     * @param {geotoolkit.attributes.TextStyle.AlignmentStyle|string} [properties.alignment] alignment
     * @param {geotoolkit.attributes.TextStyle.BaseLineStyle|string} [properties.baseline] baseLine in CSS
     * @param {string|number} [properties.lineheight] line height
     * @param {boolean} [properties.multiline] multi line
     * @param {boolean} [properties.autosize] auto size
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.attributes.TextStyle.prototype.setProperties = function(properties){};
    /**
     * Create or get fill style from object
     *
     * @param {object|string|geotoolkit.attributes.TextStyle|null} object object can be in format of constructor of
     * geotoolkit.attributes.TextStyle
     * @returns {geotoolkit.attributes.TextStyle | null}
     */
    geotoolkit.attributes.TextStyle.fromObject = function(object){};
    /**
     * Merge css textstyle object with existing instance
     * @param {geotoolkit.scene.Node} node node
     * @param {geotoolkit.attributes.TextStyle} textStyle instance of node property
     * @param {geotoolkit.attributes.TextStyle|object|string} object contains text style
     * @param {boolean} [merge=false] merge flag
     * @param {function} [invalidateMethod=null] optional invalidate method
     * @returns {geotoolkit.attributes.TextStyle} textStyle
     * @example
     * Shape.prototype.setTextStyle = function (textStyle, merge) {
     * if (this.textStyle === textStyle) {
     * return this;
     * }
     *
     * this.textStyle = geotoolkit.attributes.TextStyle.mergeFromObject(this, this.textStyle, textStyle, merge, this.getInvalidateMethod());
     *
     * this.updateState()
     * .invalidate();
     * return this;
     * };
     */
    geotoolkit.attributes.TextStyle.mergeFromObject = function(node, textStyle, object, merge, invalidateMethod){};

/**
 * Defines an abstract gradient fill style. It contains information about gradient stops and colors.
 *
 * @class geotoolkit.attributes.GradientStyle
 * @augments geotoolkit.attributes.FillStyle
 * @param {geotoolkit.util.RgbaColor | string | object} color Color of FillStyle (not used in Gradient) or JSON with parameters
 * @param {geotoolkit.util.RgbaColor | string} [color.color=undefined] Color of FillStyle (not used in Gradient)
 * @param {geotoolkit.attributes.ImagePattern} [color.pattern=undefined] - The background pattern (not used in Gradient)
 * @param {string | geotoolkit.util.RgbaColor} [color.foreground=undefined] - The foreground color of the pattern (not used in Gradient)
 * @param {boolean} [color.evenoddmode=undefined] - The flag indicating whether even-odd fill mode is to be used.
 * @param {geotoolkit.attributes.GradientStyle.SpreadMethods|string} [color.spreadMethod=geotoolkit.attributes.GradientStyle.SpreadMethods.Pad]
 * Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
 * @param {geotoolkit.attributes.GradientStyle.GradientUnits|string} [color.unitType=geotoolkit.attributes.GradientStyle.GradientUnits.ObjectBoundingBox]
 * Type of coordinated used to define gradient
 * @param {geotoolkit.util.Transformation} [color.transformation=new geotoolkit.util.Transformation()] Gradient transformation
 * @param {geotoolkit.attributes.ImagePattern} [pattern=undefined] - The background pattern (not used in Gradient)
 * @param {string | geotoolkit.util.RgbaColor} [foreground=undefined] - The foreground color of the pattern (not used in Gradient)
 * @param {boolean} [evenoddmode=undefined] - The flag indicating whether even-odd fill mode is to be used.
 * @param {geotoolkit.attributes.GradientStyle.SpreadMethods|string} [spreadMethod=geotoolkit.attributes.GradientStyle.SpreadMethods.Pad]
 * Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
 * @param {geotoolkit.attributes.GradientStyle.GradientUnits|string} [unitType=geotoolkit.attributes.GradientStyle.GradientUnits.ObjectBoundingBox]
 * Type of coordinated used to define gradient
 * @param {geotoolkit.util.Transformation} [transformation=new geotoolkit.util.Transformation()] Gradient transformation
 */
geotoolkit.attributes.GradientStyle = {};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.GradientStyle.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.GradientStyle.prototype.copyConstructor = function(){};
    /**
     * Returns the transformation set on the gradient
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.attributes.GradientStyle.prototype.getTransformation = function(){};
    /**
     * Sets transformation for the gradient
     * @param {geotoolkit.util.Transformation} transform The new gradient transformation
     * @returns {geotoolkit.attributes.GradientStyle}
     */
    geotoolkit.attributes.GradientStyle.prototype.setTransformation = function(transform){};
    /**
     * Enum for gradient Spread methods
     * @enum
     * @readonly
     */
    geotoolkit.attributes.GradientStyle.SpreadMethods = {};
        /**
         * Reflect
         * @type {string}
         */
        geotoolkit.attributes.GradientStyle.SpreadMethods.Reflect = "";
        /**
         * Repeat
         * @type {string}
         */
        geotoolkit.attributes.GradientStyle.SpreadMethods.Repeat = "";
        /**
         * Pad
         * @type {string}
         */
        geotoolkit.attributes.GradientStyle.SpreadMethods.Pad = "";
    /**
     * Enum for gradient units
     * @enum
     * @readonly
     */
    geotoolkit.attributes.GradientStyle.GradientUnits = {};
        /**
         * Absolute Coordinates
         * @type {string}
         */
        geotoolkit.attributes.GradientStyle.GradientUnits.AbsoluteCoordinates = "";
        /**
         * Object Bounding Box
         * @type {string}
         */
        geotoolkit.attributes.GradientStyle.GradientUnits.ObjectBoundingBox = "";
        /**
         * User Space On Use
         * @type {string}
         */
        geotoolkit.attributes.GradientStyle.GradientUnits.UserSpaceOnUse = "";
    /**
     * @returns {geotoolkit.attributes.GradientStyle.SpreadMethods|string}
     */
    geotoolkit.attributes.GradientStyle.prototype.getSpreadMethod = function(){};
    /**
     * Changes spread method for the gradient
     * @param {geotoolkit.attributes.GradientStyle.SpreadMethods | string} sMethod Spread method to apply to the gradient
     * @returns {geotoolkit.attributes.GradientStyle} this
     */
    geotoolkit.attributes.GradientStyle.prototype.setSpreadMethod = function(sMethod){};
    /**
     * Sets unit type for the gradient
     * @param {geotoolkit.attributes.GradientStyle.GradientUnits|string} u Unit type
     * @returns {geotoolkit.attributes.GradientStyle} this
     */
    geotoolkit.attributes.GradientStyle.prototype.setUnits = function(u){};
    /**
     * Gets the type of units
     * @returns {geotoolkit.attributes.GradientStyle.GradientUnits|string}
     */
    geotoolkit.attributes.GradientStyle.prototype.getUnits = function(){};
    /**
     * Enable usage of absolute coordinates as units. By default it is relative
     * coordinates, which means it displayed in model limits. Relative
     * coordinates are defined from 0 to 1.
     *
     * @deprecated since 2.5
     * @param {boolean} enable enable or disable gradient stops defined in absolute coordinates
     * @returns {geotoolkit.attributes.GradientStyle} this
     */
    geotoolkit.attributes.GradientStyle.prototype.enableAbsoluteCoordinates = function(enable){};
    /**
     * Returns true if gradient stop coordinates are absolute, false if relative.
     *
     * @deprecated since 2.5
     * @returns {boolean} absCoordinates
     */
    geotoolkit.attributes.GradientStyle.prototype.isAbsoluteCoordinates = function(){};
    /**
     * Return the number of defined gradient stop points
     *
     * @returns {number} stops number of stops
     */
    geotoolkit.attributes.GradientStyle.prototype.getStopPointsCount = function(){};
    /**
     * Add a new stop point at a given position and color.
     *
     * @param {number} position position of the stop point, if in relative coordinates from 0 to 1
     * @param {string} color color in CSS form for specified stop point
     * @returns {geotoolkit.attributes.GradientStyle} this
     */
    geotoolkit.attributes.GradientStyle.prototype.addStopPoint = function(position, color){};
    /**
     * Removes stop point at index.
     *
     * @param {number} index index of the stop point
     * @returns {geotoolkit.attributes.GradientStyle} this
     */
    geotoolkit.attributes.GradientStyle.prototype.removeStopPoint = function(index){};
    /**
     * Return color at a stop point by index.
     *
     * @param {number} index index of a stop point
     * @returns {string|null} color in CSS format, or null if index is out of range.
     */
    geotoolkit.attributes.GradientStyle.prototype.getStopPointColor = function(index){};
    /**
     * Sets color to a stop point by index.
     *
     * @param {number} index index of a stop point
     * @param {string | geotoolkit.util.RgbaColor} color Color to set to the stop point
     * @returns {geotoolkit.attributes.GradientStyle}
     */
    geotoolkit.attributes.GradientStyle.prototype.setStopPointColor = function(index, color){};
    /**
     * Return stop point position
     *
     * @param {number} index index of stop point
     * @returns {number|null} position either in relative or absolute terms or null if index is out of range.
     */
    geotoolkit.attributes.GradientStyle.prototype.getStopPointPosition = function(index){};
    /**
     * Clear all stop points
     *
     * @returns {geotoolkit.attributes.GradientStyle} this
     */
    geotoolkit.attributes.GradientStyle.prototype.clearStopPoints = function(){};
    /**
     * Returns style type
     *
     * @returns {string} STYLE_TYPE_GRADIENT
     */
    geotoolkit.attributes.GradientStyle.prototype.getStyleType = function(){};
    /**
     * Gets all the properties pertaining to this object
     *
     * @returns {Object} properties JSON containing properties
     * @returns {Array.<object>} properties.stoppoints Array with stop points. Each object contains the position and the color.
     * @returns {boolean} properties.absolutecoordinates Specifies if the gradient is defined in absolute coordinates. This parameter is
     * deprecated, use unittype instead.
     * @returns {geotoolkit.attributes.GradientStyle.SpreadMethods|string} [properties.spreadMethod.Pad]
     * Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
     * @returns {geotoolkit.attributes.GradientStyle.GradientUnits|string} [properties.unitType]
     * Type of coordinates used to define gradient
     * @returns {geotoolkit.util.Transformation} [properties.transformation] Gradient transformation
     */
    geotoolkit.attributes.GradientStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     *
     * @param {Object} [properties] An object containing the properties to set
     * @param {Array.<object>} [properties.stoppoints] Array with stop points. Each object should contain the position and the color.
     * @param {boolean} [properties.absolutecoordinates] deprecated (since 2.3, use unitType instead) Specifies if the gradient is defined in absolute coordinates.
     * @param {geotoolkit.attributes.GradientStyle.SpreadMethods|string} [properties.spreadmethod] Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
     * @param {geotoolkit.attributes.GradientStyle.GradientUnits|string} [properties.unitType] Type of coordinated used to define gradient
     * @param {geotoolkit.util.Transformation} [properties.transformation] Gradient transformation
     * @returns {geotoolkit.attributes.GradientStyle} this
     */
    geotoolkit.attributes.GradientStyle.prototype.setProperties = function(properties){};
    /**
     * Removes points that are identical, leaving only one
     * @returns {geotoolkit.attributes.GradientStyle} this
     */
    geotoolkit.attributes.GradientStyle.prototype.cleanDuplicatePoints = function(){};

/**
 * Defines a linear gradient fill style to provide smooth transitions between two or more specified colors.
 *
 * @class geotoolkit.attributes.LinearGradientStyle
 * @augments geotoolkit.attributes.GradientStyle
 * @param {string | object} [startColor="white"] start color in CSS format or JSON with parameters
 * @param {string} [startColor.startcolor="white"] start color in CSS format
 * @param {string} [startColor.endcolor="black"] end color in CSS format
 * @param {geotoolkit.util.Point} [startColor.startpoint=geotoolkit.util.Point(0, 0)] start point of gradient in relative form, 0-1 or absolute coordinates
 * @param {geotoolkit.util.Point} [startColor.endpoint=geotoolkit.util.Point(0, 1)] end point of gradient in relative form, 0-1 or absolute coordinates
 * @param {geotoolkit.util.ColorProvider} [startColor.colorprovider=null] colorProvider
 * @param {geotoolkit.attributes.GradientStyle.SpreadMethods|string} [startColor.spreadmethod=geotoolkit.attributes.GradientStyle.SpreadMethods.Pad]
 * Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
 * @param {geotoolkit.attributes.GradientStyle.GradientUnits|string} [startColor.unitType=geotoolkit.attributes.GradientStyle.GradientUnits.ObjectBoundingBox]
 * Type of coordinated used to define gradient
 * @param {geotoolkit.util.Transformation} [startColor.transformation=new geotoolkit.util.Transformation()] Gradient transformation

 * @param {string} [endColor="black"] end color in CSS format
 * @param {geotoolkit.util.Point} [startPoint=geotoolkit.util.Point(0, 0)] start point of gradient in relative form, 0-1 or absolute coordinates
 * @param {geotoolkit.util.Point} [endPoint=geotoolkit.util.Point(0, 1)] end point of gradient in relative form, 0-1 or absolute coordinates
 * @param {geotoolkit.util.ColorProvider} [colorProvider=null] colorProvider
 * @param {geotoolkit.attributes.GradientStyle.SpreadMethods|string} [spreadMethod=undefined]
 * Spread method defines how the gradient fills given area if gradient vector does not cover the whole area
 * @param {geotoolkit.attributes.GradientStyle.GradientUnits|string} [unitType=undefined]
 * Type of coordinated used to define gradient
 * @param {geotoolkit.util.Transformation} [transformation=new geotoolkit.util.Transformation()] Gradient transformation
 */
geotoolkit.attributes.LinearGradientStyle = {};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.copyConstructor = function(){};
    /**
     * Set start point from 0 to 1
     *
     * @param {geotoolkit.util.Point} p start point
     * @returns {geotoolkit.attributes.LinearGradientStyle} this
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.setStartPoint = function(p){};
    /**
     * Return start point from 0 to 1
     *
     * @returns {geotoolkit.util.Point} point
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.getStartPoint = function(){};
    /**
     * Set end point from 0 to 1
     *
     * @param {geotoolkit.util.Point} p end point
     * @returns {geotoolkit.attributes.LinearGradientStyle} this
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.setEndPoint = function(p){};
    /**
     * Return end point from 0 to 1
     *
     * @returns {geotoolkit.util.Point} end point
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.getEndPoint = function(){};
    /**
     * Sets start color
     *
     * @param {string} color color to set
     * @returns {geotoolkit.attributes.LinearGradientStyle} this
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.setStartColor = function(color){};
    /**
     * Returns start color
     *
     * @returns {string} color in CSS format
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.getStartColor = function(){};
    /**
     * Sets end color
     *
     * @param {string} color color to set in CSS format
     * @returns {geotoolkit.attributes.LinearGradientStyle} this
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.setEndColor = function(color){};
    /**
     * Returns end color
     *
     * @returns {string} color color in CSS format
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.getEndColor = function(){};
    /**
     * Return type of the style.
     *
     * @returns {string} STYLE_TYPE_LINEAR_GRADIENT
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.getStyleType = function(){};
    /**
     * Gets all the properties pertaining to this object
     *
     * @returns {Object} props JSON containing properties
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     *
     * @param {Object} properties An object containing the properties to set
     * @param {string} [properties.startcolor] start color in CSS format
     * @param {string} [properties.endcolor] end color in CSS format
     * @param {geotoolkit.util.Point} [properties.startpoint] start point of gradient in relative form, 0-1 or absolute coordinates
     * @param {geotoolkit.util.Point} [properties.endpoint] end point of gradient in relative form, 0-1 or absolute coordinates
     * @returns {geotoolkit.attributes.LinearGradientStyle}
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.setProperties = function(properties){};
    /**
     * Returns a new instance of geotoolkit.attributes.Raster
     *
     * @param {number} [xMin=0] x Min position to get color
     * @param {number} [yMin=0] y Min position to get color
     * @param {number} [xMax=0] x Max position to get color
     * @param {number} [yMax=0] y Max position to get color
     * @returns {geotoolkit.attributes.Raster}
     */
    geotoolkit.attributes.LinearGradientStyle.prototype.getRaster = function(xMin, yMin, xMax, yMax){};

/**
 * Defines a radial gradient fill style, which represents a gradient of colors along of cone between two circles.<br>
 * Radial gradients are defined with relative numbers from 0-1 describing the inner and outer circles. radius values are percentages of the shape's radius
 * @class geotoolkit.attributes.RadialGradientStyle
 * @augments geotoolkit.attributes.GradientStyle
 * @param {object | string} startColor start color in CSS format or a JSON with properties
 * @param {string} [startColor] start color in CSS format
 * @param {string} [startColor.endcolor] end color in CSS format
 * @param {geotoolkit.util.Point} [startColor.innercenter] centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
 * @param {geotoolkit.util.Point} [startColor.outercenter] centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
 * @param {number} [startColor.innerradius] radius of inner circle in relative form, 0-1 or absolute coordinates
 * @param {number} [startColor.outerradius] radius of outer circle of gradient from 0-1 or absolute coordinates
 * @param {geotoolkit.util.Transformation} [startColor.transformation=geotoolkit.util.Transformation()] Gradient transformation
 * @param {geotoolkit.attributes.GradientStyle.GradientUnits|string} [startColor.unitType=geotoolkit.attributes.GradientStyle.GradientUnits.ObjectBoundingBox]
 * Type of coordinated used to define gradient
 * @param {string} [endColor=black] end color in CSS format
 * @param {geotoolkit.util.Point} [innerCenter=geotoolkit.util.Point(0.5, 0.5)] centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
 * @param {geotoolkit.util.Point} [outerCenter=geotoolkit.util.Point(0.5, 0.5)] centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
 * @param {number} [innerRadius=0] radius of inner circle in relative form, 0-1 or absolute coordinates
 * @param {number} [outerRadius=0.5] radius of outer circle of gradient from 0-1 or absolute coordinates
 * @param {geotoolkit.util.Transformation} [transformation=geotoolkit.util.Transformation()] Gradient transformation
 * @param {geotoolkit.attributes.GradientStyle.GradientUnits|string} [unitType=geotoolkit.attributes.GradientStyle.GradientUnits.ObjectBoundingBox]
 * Type of coordinated used to define gradient
 */
geotoolkit.attributes.RadialGradientStyle = {};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.copyConstructor = function(){};
    /**
     * Set inner centerpoint in relative terms
     * @param {geotoolkit.util.Point} p point defining center of inner circle
     * @returns {geotoolkit.attributes.RadialGradientStyle} this
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.setInnerCenter = function(p){};
    /**
     * Get the center of the inner circle
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.getInnerCenter = function(){};
    /**
     * Set end point from 0 to 1
     *
     * @param {geotoolkit.util.Point} p end point
     * @returns {geotoolkit.attributes.RadialGradientStyle} this
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.setOuterCenter = function(p){};
    /**
     * Return start center in relative coordinates from 0 to 1
     *
     * @returns {geotoolkit.util.Point} point
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.getOuterCenter = function(){};
    /**
     * Set end point from 0 to 1
     *
     * @param {number} r radius of outer circle of gradient from 0-1
     * @returns {geotoolkit.attributes.RadialGradientStyle} this
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.setOuterRadius = function(r){};
    /**
     * Return start point from 0 to 1
     *
     * @returns {number} radius of outer circle of gradient from 0-1
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.getOuterRadius = function(){};
    /**
     * @param {number} r Radius of inner circle
     * @returns {geotoolkit.attributes.RadialGradientStyle} this
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.setInnerRadius = function(r){};
    /**
     *
     * @returns {number} radius of the inner circle
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.getInnerRadius = function(){};
    /**
     * Sets start color
     *
     * @param {string}color color to set
     * @returns {geotoolkit.attributes.RadialGradientStyle} this
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.setStartColor = function(color){};
    /**
     * Returns start color
     *
     * @returns {string} color in CSS format
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.getStartColor = function(){};
    /**
     * Sets end color
     *
     * @param {string} color color to set in CSS format
     * @returns {geotoolkit.attributes.RadialGradientStyle} this
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.setEndColor = function(color){};
    /**
     * Returns end color
     *
     * @returns {string} color color in CSS format
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.getEndColor = function(){};
    /**
     * Return type of the style.
     *
     * @returns {string} STYLE_TYPE_RADIAL_GRADIENT
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.getStyleType = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     *
     * @param {object} properties An object containing the properties to set
     * @param {string} [properties.startcolor] start color in CSS format
     * @param {string} [properties.endcolor] end color in CSS format
     * @param {geotoolkit.util.Point} [properties.innercenter] centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
     * @param {geotoolkit.util.Point} [properties.outercenter] centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
     * @param {number} [properties.innerradius] radius of inner circle in relative form, 0-1 or absolute coordinates
     * @param {number} [properties.outerradius] radius of outer circle of gradient from 0-1 or absolute coordinates
     * @returns {geotoolkit.attributes.RadialGradientStyle}
     */
    geotoolkit.attributes.RadialGradientStyle.prototype.setProperties = function(properties){};

/**
 * Defines an elliptical gradient fill style.
 *
 * @deprecated since 2.6 use geotoolkit.attributes.RadialGradientStyle instead
 * @class geotoolkit.attributes.EllipticalGradientStyle
 * @augments geotoolkit.attributes.GradientStyle
 * @param {string} [startColor="white"] start color in CSS format
 * @param {string} [endColor="black"] end color in CSS format
 * @param {geotoolkit.util.Point} [innerCenter=geotoolkit.util.Point(0.5, 0.5)] centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
 * @param {geotoolkit.util.Point} [outerCenter=geotoolkit.util.Point(0.5, 0.5)] centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
 * @param {number} [innerRadius=0] radius of inner circle in relative form, 0-1 or absolute coordinates
 * @param {number} [outerRadius=0.5] radius of outer circle of gradient from 0-1 or absolute coordinates
 * @param {number} [yScale=1] height to width ratio of ellipse.
 * @param {object} [options=undefined] options pertaining to the fill style
 * @param {string} [options.startcolor="white"] start color in CSS format
 * @param {string} [options.endcolor="black"] end color in CSS format
 * @param {geotoolkit.util.Point} [options.innercenter=geotoolkit.util.Point(0.5, 0.5] centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
 * @param {geotoolkit.util.Point} [options.outercenter=geotoolkit.util.Point(0.5, 0.5] centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
 * @param {number} [options.innerradius=0] radius of inner circle in relative form, 0-1 or absolute coordinates
 * @param {number} [options.outerradius=0.5] radius of outer circle of gradient from 0-1 or absolute coordinates
 * @param {number} [options.yscale=1] height to width ratio of ellipse.
 */
geotoolkit.attributes.EllipticalGradientStyle = {};
    /**
     * copy constructor
     *
     * @protected
     * @param {geotoolkit.attributes.EllipticalGradientStyle} src Source to copy from
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.copyConstructor = function(src){};
    /**
     * Set inner centerpoint in relative terms
     *
     * @param {geotoolkit.util.Point} p point defining center of inner circle
     * @returns {geotoolkit.attributes.EllipticalGradientStyle} this
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.setInnerCenter = function(p){};
    /**
     * Get the center of the inner circle
     *
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.getInnerCenter = function(){};
    /**
     * Set outer center point
     *
     * @param {geotoolkit.util.Point} p point defining center of outer circle
     * @returns {geotoolkit.attributes.EllipticalGradientStyle} this
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.setOuterCenter = function(p){};
    /**
     * Return start center in relative coordinates from 0 to 1
     *
     * @returns {geotoolkit.util.Point} point
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.getOuterCenter = function(){};
    /**
     * Set outer radius from 0 to 1
     *
     * @param {number} r radius of outer circle in relative form 0-1
     * @returns {geotoolkit.attributes.EllipticalGradientStyle} this
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.setOuterRadius = function(r){};
    /**
     * Return outer circle radius from 0 to 1
     *
     * @returns {number} radius of outer circle
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.getOuterRadius = function(){};
    /**
     * Set the inner circle radius from 0 to 1
     *
     * @param {number} r Radius of inner circle
     * @returns {geotoolkit.attributes.EllipticalGradientStyle} this
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.setInnerRadius = function(r){};
    /**
     * Get the inner circle radius
     *
     * @returns {number} radius of the inner circle
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.getInnerRadius = function(){};
    /**
     * Sets start color
     *
     * @param {string}color color to set
     * @returns {geotoolkit.attributes.EllipticalGradientStyle} this
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.setStartColor = function(color){};
    /**
     * Get height to width ratio of ellipse
     *
     * @returns {number} yScale the ratio of y to x axis in the gradient
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.getYScale = function(){};
    /**
     * Set height to width ratio of ellipse
     *
     * @param {number} yScale the ratio of y to x axis in the gradient
     * @returns {geotoolkit.attributes.EllipticalGradientStyle} this
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.setYScale = function(yScale){};
    /**
     * Returns start color
     *
     * @returns {string} color in CSS format
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.getStartColor = function(){};
    /**
     * Sets end color
     *
     * @param {string} color color to set in CSS format
     * @returns {geotoolkit.attributes.EllipticalGradientStyle} this
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.setEndColor = function(color){};
    /**
     * Returns end color
     *
     * @returns {string} color color in CSS format
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.getEndColor = function(){};
    /**
     * Return type of the style.
     *
     * @returns {string} STYLE_TYPE_ELLIPTICAL_GRADIENT
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.getStyleType = function(){};
    /**
     * Gets all the properties pertaining to this object
     *
     * @returns {Object} props JSON containing properties
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     *
     * @param {Object} properties An object containing the properties to set
     * @param {number} [properties.innerRadius] radius of inner circle in relative form, 0-1 or absolute coordinates
     * @param {geotoolkit.util.Point} [properties.innerCenter] centerpoint of inner circle of gradient in relative form, 0-1 or absolute coordinates
     * @param {geotoolkit.util.Point} [properties.outerCenter] centerpoint of outer circle of gradient in relative form, 0-1 or absolute coordinates
     * @param {number} [properties.outerRadius] radius of outer circle of gradient from 0-1 or absolute coordinates
     * @param {string} [properties.startColor] start color in CSS format
     * @param {string} [properties.endColor] end color in CSS format
     * @param {number} [properties.yScale] height to width ratio of ellipse
     * @returns {geotoolkit.attributes.EllipticalGradientStyle}
     */
    geotoolkit.attributes.EllipticalGradientStyle.prototype.setProperties = function(properties){};

/**
 * Service to provide patterns
 *
 * @class geotoolkit.attributes.PatternService
 * @param {string} name name of the container of patterns
 */
geotoolkit.attributes.PatternService = {};
    /**
     * Returns this pattern service name
     * @returns {string}
     */
    geotoolkit.attributes.PatternService.prototype.getName = function(){};
    /**
     * Returns all image patterns contained in this service
     * @returns {Array<geotoolkit.attributes.ImagePattern>} The patterns
     */
    geotoolkit.attributes.PatternService.prototype.getPatterns = function(){};
    /**
     * Adds pattern alias
     * @param {string} base original pattern name
     * @param {string|Array<string>} alias name(s) of the original name
     */
    geotoolkit.attributes.PatternService.prototype.addAlias = function(base, alias){};
    /**
     * Returns the pattern of specific name
     * @param {string} name of the pattern
     * @returns {?geotoolkit.attributes.Pattern}
     */
    geotoolkit.attributes.PatternService.prototype.getPattern = function(name){};
    /**
     * Returns a promise which gets all the patterns
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.attributes.PatternService.prototype.getAll = function(){};
    /**
     * Return the list of pattern names
     * @returns {Array<string>} pattern names
     */
    geotoolkit.attributes.PatternService.prototype.getNames = function(){};
    /**
     * Return a promise which gets data urls of all patterns
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.attributes.PatternService.prototype.getDataURLs = function(){};
    /**
     * Returns a promise which gets width of all patterns
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.attributes.PatternService.prototype.getWidths = function(){};
    /**
     * Returns a promise which gets height of all patterns
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.attributes.PatternService.prototype.getHeights = function(){};
    /**
     * Adds a new pattern with the specified pattern image.
     * note: if the pattern already exist it will override it.
     * This method specifies pattern name and container for registered pattern
     * @param {string} name name of the pattern
     * @param {geotoolkit.attributes.Pattern|string} pattern pattern object or image url
     */
    geotoolkit.attributes.PatternService.prototype.add = function(name, pattern){};
    /**
     * Removes a pattern from this service
     * @param {string} name name of the pattern
     */
    geotoolkit.attributes.PatternService.prototype.remove = function(name){};
    /**
     * Removes a pattern alias
     * @param {string} alias name
     */
    geotoolkit.attributes.PatternService.prototype.removeAlias = function(alias){};
    /**
     * Removes all aliases
     */
    geotoolkit.attributes.PatternService.prototype.clearAliases = function(){};
    /**
     * Removes all patterns and aliases
     */
    geotoolkit.attributes.PatternService.prototype.clear = function(){};

/**
 * Defines style to be used as model clipping style.
 *
 * @class geotoolkit.attributes.ClipStyle
 * @augments geotoolkit.attributes.Style
 * @param {geotoolkit.renderer.GraphicsPath|object} [geometry=null] clipping geometry or options object
 * @param {geotoolkit.renderer.GraphicsPath} [geometry.geometry=null] clipping geometry
 * @param {boolean} [geometry.evenodd=false] true if evenodd mode is on ('nonzero' mode otherwise)
 * @param {boolean} [evenodd=false] true if evenodd mode is on ('nonzero' mode otherwise)
 */
geotoolkit.attributes.ClipStyle = {};
    /**
     * Return clone object
     *
     * @returns {geotoolkit.attributes.ClipStyle} clone a copy of this object
     */
    geotoolkit.attributes.ClipStyle.prototype.clone = function(){};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.attributes.ClipStyle} src Source to copy from
     */
    geotoolkit.attributes.ClipStyle.prototype.copyConstructor = function(src){};
    /**
     * Sets clipping geometry
     *
     * @param {geotoolkit.renderer.GraphicsPath} geometry region or area
     * @returns {geotoolkit.attributes.ClipStyle}
     */
    geotoolkit.attributes.ClipStyle.prototype.setGeometry = function(geometry){};
    /**
     * Gets clipping geometry
     *
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.attributes.ClipStyle.prototype.getGeometry = function(){};
    /**
     * Sets evenodd clipping mode
     *
     * @param {boolean} bool true if evenodd mode is on
     * @returns {geotoolkit.attributes.ClipStyle} this
     */
    geotoolkit.attributes.ClipStyle.prototype.setEvenOdd = function(bool){};
    /**
     * Returns true if evenodd clipping mode is on
     *
     * @returns {boolean}
     */
    geotoolkit.attributes.ClipStyle.prototype.getEvenOdd = function(){};
    /**
     * Gets all the properties pertaining to this object
     *
     * @returns {Object}
     */
    geotoolkit.attributes.ClipStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     *
     * @param {Object} properties An object containing the properties to set
     * @param {geotoolkit.renderer.GraphicsPath} [properties.geometry] clipping geometry
     * @param {boolean} [properties.evenodd] true if evenodd mode is on ('nonzero' mode otherwise)
     * @returns {geotoolkit.attributes.ClipStyle}
     */
    geotoolkit.attributes.ClipStyle.prototype.setProperties = function(properties){};
    /**
     * Create or get clipping style from object
     * @param {Object|geotoolkit.attributes.ClipStyle} [object] object can be in format of constructor ofgeotoolkit.attributes.ClipStyle
     * @returns {?geotoolkit.attributes.ClipStyle} clipping style
     */
    geotoolkit.attributes.ClipStyle.fromObject = function(object){};

/**
 * Defines properties of transition animation. Its transition duration, easing function and array of animated properties
 * @class geotoolkit.attributes.AnimationStyle
 * @augments geotoolkit.attributes.Style
 * @param {object[]} effects Please refer to geotoolkit.animation.effects.AbstractEffect properties
 */
geotoolkit.attributes.AnimationStyle = {};
    /**
     * Type of state changes
     * @enum
     */
    geotoolkit.attributes.AnimationStyle.Events = {};
        /**
         * Animation starts
         * @type {string}
         */
        geotoolkit.attributes.AnimationStyle.Events.AnimationBegin = "";
        /**
         * Animation ends
         * @type {string}
         */
        geotoolkit.attributes.AnimationStyle.Events.AnimationEnd = "";
    /**
     * Returns true if animation is active
     * @returns {boolean}
     */
    geotoolkit.attributes.AnimationStyle.prototype.isActive = function(){};
    /**
     * Makes effect active when an event occurs
     * @param {string} id event id. See {@link https://www.w3.org/TR/SVG/animate.html#BeginValueSyntax} for details
     */
    geotoolkit.attributes.AnimationStyle.prototype.activateEffects = function(id){};
    /**
     * @inheritdoc
     */
    geotoolkit.attributes.AnimationStyle.prototype.setProperties = function(){};

/**
 * Defines a class which contains default easing functions to apply to animation
 * @class geotoolkit.animation.Easing
 */
geotoolkit.animation.Easing = {};
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
     * @enum
     * @readonly
     */
    geotoolkit.animation.Easing.Functions = {};
        /**
         * NoEing sing function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.NoEasing = "";
        /**
         * Linear function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.Linear = "";
        /**
         * Easing InQuad function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInQuad = "";
        /**
         * Easing OutQuad function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseOutQuad = "";
        /**
         * Easing InOutQuad function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInOutQuad = "";
        /**
         * Easing InCubic function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInCubic = "";
        /**
         * Easing OutCubic function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseOutCubic = "";
        /**
         * Easing InOutCubic function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInOutCubic = "";
        /**
         * Easing InQuart function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInQuart = "";
        /**
         * Easing OutQuart function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseOutQuart = "";
        /**
         * easing InOutQuart function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.easeInOutQuart = "";
        /**
         * Easing InQuint function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInQuint = "";
        /**
         * Easing OutQuint function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseOutQuint = "";
        /**
         * Easing InOutQuint function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInOutQuint = "";
        /**
         * Easing InSine function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInSine = "";
        /**
         * Easing OutSine function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseOutSine = "";
        /**
         * Easing InOutSine function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInOutSine = "";
        /**
         * Easing InExpo function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInExpo = "";
        /**
         * Easing OutExpo function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseOutExpo = "";
        /**
         * Easing InOutExpo function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInOutExpo = "";
        /**
         * Easing InCirc function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInCirc = "";
        /**
         * Easing OutCirc function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseOutCirc = "";
        /**
         * Easing InOutCirc function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInOutCirc = "";
        /**
         * Easing InElastic function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInElastic = "";
        /**
         * Easing OutElastic function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseOutElastic = "";
        /**
         * Easing InOutElastic function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInOutElastic = "";
        /**
         * Easing InBack function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInBack = "";
        /**
         * Easing OutBack function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseOutBack = "";
        /**
         * Easing InOutBack function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseInOutBack = "";
        /**
         * Easing OutBounce function
         * @type {string}
         */
        geotoolkit.animation.Easing.Functions.EaseOutBounce = "";
    /**
     * Returns an object with easing functions indexed by function name
     * Functions have signature
     * param: x; type: geotoolkit.gauges.Gauge; description: Gauge which will be calling the animation
     * param: t; type: number; description: currentTime
     * param: b; type: number; description: startValue
     * param: c; type: number; description: changeInValue
     * param: d; type: number; description: totalIterations
     * @returns {object}
     */
    geotoolkit.animation.Easing.getFunctions = function(){};

/**
 * Represent interface for an off-screen image representation
 * @class geotoolkit.renderer.Pixmap
 * @augments geotoolkit.attributes.Raster
 */
geotoolkit.renderer.Pixmap = {};
    /**
     * Return a one-dimensional array containing the data in the
     * RGBA order, with integer values between 0 and 255 (included).
     * @function
     * @returns {array.<number>} the actual width, a one-dimensional array containing the data in the
     * RGBA order, with integer values between 0 and 255 (included).
     */
    geotoolkit.renderer.Pixmap.prototype.getData = function(){};

/**
 * Graphics
 * @class geotoolkit.renderer.Graphics
 */
geotoolkit.renderer.Graphics = {};
    /**
     * Sets clipping
     * @function
     * @param {geotoolkit.util.Rect | geotoolkit.renderer.GraphicsPath | geotoolkit.util.Region} geometry geometry to clip
     * @param {geotoolkit.renderer.ClipOperation} operation operation to be applied for a new clipping
     * @param {boolean} isModel model coordinates flag
     */
    geotoolkit.renderer.Graphics.prototype.setClip = function(geometry, operation, isModel){};
    /**
     * Draw and fill rectangle with the current style. If fill style is null
     * then it draws outline only.
     * @function
     * @param {geotoolkit.util.Rect|number} x X coordinate of the start point
     * @param {number} [y=undefined] Y coordinate of the start point
     * @param {number} [width=undefined] Width of rectangle
     * @param {number} [height=undefined] Height of rectangle
     */
    geotoolkit.renderer.Graphics.prototype.drawRectangle = function(x, y, width, height){};
    /**
     * Draw line
     * @function
     * @param {number} x1
     * x-position of start point
     * @param {number} y1
     * y-position of start point
     * @param {number} x2
     * x-position of end point
     * @param {number} y2
     * y-position of end point
     */
    geotoolkit.renderer.Graphics.prototype.drawLine = function(x1, y1, x2, y2){};
    /**
     * Draw polyline
     * @function
     * @abstract
     * @param {Array} x array of x coordinates of points
     * @param {Array} y array of y coordinates of points
     * @param {number} start index of the first point in the array
     * @param {number} end index of the last point in the array
     * @param {boolean} [multiDirection] false for one direction array
     */
    geotoolkit.renderer.Graphics.prototype.drawPolyline = function(x, y, start, end, multiDirection){};
    /**
     * Draw and fill polygon. If fill style is null
     * then it draws outline only.
     * @function
     * @abstract
     * @param {Array} x array of x coordinates of points
     * @param {Array} array of y coordinates of points
     * @param {number} start index of the first point in the array
     * @param {number} end index of the last point in the array
     */
    geotoolkit.renderer.Graphics.prototype.drawPolygon = function(x, array, start, end){};
    /**
     * Draw and fill ellipse
     * @function
     * @param {number} x x-coordinate of the upper-left corner of the bounding rectangle that defines the ellipse
     * @param {number} y y--coordinate of the upper-left corner of the bounding rectangle that defines the ellipse
     * @param {number} width width of the bounding rectangle that defines the ellipse.
     * @param {number} height height of the bounding rectangle that defines the ellipse.
     */
    geotoolkit.renderer.Graphics.prototype.drawEllipse = function(x, y, width, height){};
    /**
     * Draws an arc clockwise from startAngle to endAngle.
     * If endAngle exceeds startAngle by Math.PI * 2 or more then ellipse is drawn.
     * If fillStyle is not null, will fill the arc area using a direct line
     * to close the path between start and end of arc.
     * By default this function renders a "pie" shape, using given fill and stroke style. In order to draw a real arc,
     * set suppressLineToCenter=true.
     * @function
     * @param {number} x x-coordinate of the upper-left corner of the rectangle that bounds the ellipse.
     * @param {number} y y-coordinate of the upper-left corner of the rectangle that bounds the ellipse.
     * @param {number} width width of the rectangle that bounds the ellipse.
     * @param {number} height height of the rectangle that bounds the ellipse.
     * @param {number} startAngle angle in radians measured clockwise from positive x-axis to the starting point of the arc.
     * @param {number} endAngle Angle in radians measured clockwise from positive x-axis to the ending point of the arc.
     * @param {number} [sweepAngle=0] Defines the sweep of the arc in radians. This parameter used if and only if
     * startAngle == endAngle
     * @param {boolean} [suppressLineToCenter=false] Does not draw lines from the edges of arc to center point
     */
    geotoolkit.renderer.Graphics.prototype.drawArc = function(x, y, width, height, startAngle, endAngle, sweepAngle, suppressLineToCenter){};
    /**
     * Draws a portion of an annulus clockwise ranging from startAngle to endAngle.
     * If endAngle exceeds startAngle by Math.PI * 2 or more then annulus is drawn.
     * Will fill in between the two arcs if fillStyle exists.
     *
     * @function
     * @param {number} x x-coordinate of the center of the arc.
     * @param {number} y y-coordinate of the center of the arc.
     * @param {number} innerRadius inner radius of the arc
     * @param {number} outerRadius outer radius of the arc
     * @param {number} startAngle angle in radians measured from x-axis to the starting point of the arc
     * (clockwise means positive angle; counterclockwise - otherwise).
     * @param {number} endAngle Angle in radians measured from x-axis to ending point of the arc.
     * @param {number} [sweepAngle] Defines the sweep of the arc
     * @returns {geotoolkit.renderer.RenderingContext}
     */
    geotoolkit.renderer.Graphics.prototype.drawAnnulusArc = function(x, y, innerRadius, outerRadius, startAngle, endAngle, sweepAngle){};
    /**
     * Draw text
     * @function
     * @abstract
     * @param {number} x
     * x anchor position
     * @param {number} y
     * y anchor position
     * @param {string} text
     * text to draw
     */
    geotoolkit.renderer.Graphics.prototype.drawText = function(x, y, text){};
    /**
     * Draw image
     * @function
     * @param {HTMLImageElement|geotoolkit.renderer.Surface} image image to be rendered
     * @param {number} srcX source x position
     * @param {number} srcY source y position
     * @param {number} srcW source width
     * @param {number} srcH source height
     * @param {number} dstX destination x position
     * @param {number} dstY destination y position
     * @param {number} dstW destination width
     * @param {number} dstH destination height
     */
    geotoolkit.renderer.Graphics.prototype.drawImage = function(image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH){};
    /**
     * Set fill style
     * @function
     * @param {geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle} style fill style
     * @param {geotoolkit.util.Rect} [area] area
     */
    geotoolkit.renderer.Graphics.prototype.setFillStyle = function(style, area){};
    /**
     * Set fill pattern
     * @function
     * @abstract
     * @param {geotoolkit.attributes.ImagePattern} pattern pattern to fill the area
     */
    geotoolkit.renderer.Graphics.prototype.setFillPattern = function(pattern){};
    /**
     * Set line style
     * @function
     * @param {geotoolkit.attributes.LineStyle} style a line style
     * @param {geotoolkit.util.Rect} [area=null] area to apply fill property of line style
     */
    geotoolkit.renderer.Graphics.prototype.setLineStyle = function(style, area){};
    /**
     * Set text style
     * @function
     * @abstract
     * @param {geotoolkit.attributes.TextStyle} textStyle
     * style
     */
    geotoolkit.renderer.Graphics.prototype.setTextStyle = function(textStyle){};
    /**
     * Begin path
     * @function
     * @abstract
     */
    geotoolkit.renderer.Graphics.prototype.beginPath = function(){};
    /**
     * Move current position to x,y. Create a new subpath with the specified
     * point as its first (and only) point.
     * @function
     * @abstract
     * @param {number} x
     * x position
     * @param {number} y
     * y position
     */
    geotoolkit.renderer.Graphics.prototype.moveTo = function(x, y){};
    /**
     * Draw line from the current position to the specified position
     * @function
     * @abstract
     * @param {number} x x position
     * @param {number} y y position
     */
    geotoolkit.renderer.Graphics.prototype.lineTo = function(x, y){};
    /**
     * Draws a cubic B\u00e9zier curve from the current point to the point (x,
     * y), with control points (cp1x, cp1y) and (cp2x, cp2y).
     * @function
     * @abstract
     * @param {number} cp1x
     * the x coordinate of the first control point
     * @param {number} cp1y
     * the y coordinate of the first control point
     * @param {number} cp2x
     * the x coordinate of the second control point
     * @param {number} cp2y
     * the y coordinate of the second control point
     * @param {number} x
     * the x coordinate of the end point
     * @param {number} y
     * the y coordinate of the end point
     */
    geotoolkit.renderer.Graphics.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y){};
    /**
     * Calculate the strokes of all the subpaths of the current path
     * @function
     * @abstract
     */
    geotoolkit.renderer.Graphics.prototype.stroke = function(){};
    /**
     * Draws an arc to the target point as part of a path.
     * @function
     * @abstract
     * @param {number} x1 coordinate of destination
     * @param {number} y1 coordinate of destination
     * @param {number} x2 coordinate
     * @param {number} y2 coordinate
     * @param {number} radius radius of arc
     */
    geotoolkit.renderer.Graphics.prototype.arcTo = function(x1, y1, x2, y2, radius){};
    /**
     * Do nothing if the context has no subpaths. Otherwise, it marks the last
     * subpath as closed, create a new subpath whose first point is the same as
     * the previous subpath's first point, and finally add this new subpath to
     * the path.
     * @function
     * @abstract
     */
    geotoolkit.renderer.Graphics.prototype.closePath = function(){};
    /**
     * Fill all the subpaths of the current path, using fillStyle, and using the
     * non-zero winding number rule. Open subpaths will be implicitly closed
     * when being filled (without affecting the actual subpaths).
     * @function
     * @abstract
     */
    geotoolkit.renderer.Graphics.prototype.fillPath = function(){};
    /**
     * Apply geometry on the rendering context. The method stroke must be called to draw path outlines or fillPath to fill the geometry
     * @param {geotoolkit.renderer.GraphicsPath} path path to draw
     */
    geotoolkit.renderer.Graphics.prototype.drawPath = function(path){};

/**
 * Provides a container for connected lines, curves.
 *
 * @class geotoolkit.renderer.GraphicsPath
 */
geotoolkit.renderer.GraphicsPath = {};
    /**
     * @enum
     * @readonly
     */
    geotoolkit.renderer.GraphicsPath.PointType = {};
        
        geotoolkit.renderer.GraphicsPath.PointType.LINETO = {};
        
        geotoolkit.renderer.GraphicsPath.PointType.MOVETO = {};
        
        geotoolkit.renderer.GraphicsPath.PointType.BEZIERCURVETO = {};
        
        geotoolkit.renderer.GraphicsPath.PointType.CLOSE = {};
        
        geotoolkit.renderer.GraphicsPath.PointType.ARCTO = {};
    /**
     * Copy constructor
     * @protected
     * @param {geotoolkit.renderer.GraphicsPath} src instance to create a copy from
     */
    geotoolkit.renderer.GraphicsPath.prototype.copyConstructor = function(src){};
    /**
     * Copy path from source
     * @param {geotoolkit.renderer.GraphicsPath} src source path to copy from
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.renderer.GraphicsPath.prototype.copy = function(src){};
    /**
     * Create a deep copy
     * @returns {geotoolkit.renderer.GraphicsPath} clone
     */
    geotoolkit.renderer.GraphicsPath.prototype.clone = function(){};
    /**
     * Add command to move the current position.
     *
     * @param {number} x The x-coordinate of the destination point
     * @param {number} y The y-coordinate of the destination point
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.renderer.GraphicsPath.prototype.moveTo = function(x, y){};
    /**
     * Close path
     *
     * @returns {geotoolkit.renderer.GraphicsPath} this
     */
    geotoolkit.renderer.GraphicsPath.prototype.close = function(){};
    /**
     * Add command to draw a line from the current position to specified point
     *
     * @param {number} x The x-coordinate of the destination point
     * @param {number} y The y-coordinate of the destination point
     * @returns {geotoolkit.renderer.GraphicsPath} this
     */
    geotoolkit.renderer.GraphicsPath.prototype.lineTo = function(x, y){};
    /**
     * Add command to draw an arc from the current position to specified point
     *
     * @param {number} x1 x-coordinate of control point
     * @param {number} y1 y-coordinate of control point
     * @param {number} x2 The x-coordinate of the destination point
     * @param {number} y2 The y-coordinate of the destination point
     * @param {number} radius The radius of arc
     * @returns {geotoolkit.renderer.GraphicsPath} this
     */
    geotoolkit.renderer.GraphicsPath.prototype.arcTo = function(x1, y1, x2, y2, radius){};
    /**
     * Draws a cubic Bezier curve from the current point to the point (x, y),
     * with control points (cp1x, cp1y) and (cp2x, cp2y).
     *
     * @param {number} cp1x the x coordinate of the first control point
     * @param {number} cp1y the y coordinate of the first control point
     * @param {number} cp2x the x coordinate of the second control point
     * @param {number} cp2y the y coordinate of the second control point
     * @param {number} x the x coordinate of the end point
     * @param {number} y the y coordinate of the end point
     * @returns {geotoolkit.renderer.GraphicsPath} this
     */
    geotoolkit.renderer.GraphicsPath.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y){};
    /**
     * Return bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.renderer.GraphicsPath.prototype.getBounds = function(){};
    /**
     * Remove all of this path's points.
     */
    geotoolkit.renderer.GraphicsPath.prototype.clear = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.renderer.GraphicsPath.prototype.getProperties = function(){};
    /**
     * Returns true if there are no elements in this path
     * @returns {boolean}
     */
    geotoolkit.renderer.GraphicsPath.prototype.isEmpty = function(){};
    /**
     * Returns the length of the current path.
     * @returns {number}
     */
    geotoolkit.renderer.GraphicsPath.prototype.getLength = function(){};
    /**
     * Returns an array of tags.
     * @returns {Array}
     */
    geotoolkit.renderer.GraphicsPath.prototype.getTags = function(){};
    /**
     * Returns an array of x coordinates.
     * @returns {Array}
     */
    geotoolkit.renderer.GraphicsPath.prototype.getX = function(){};
    /**
     * Returns an array of y coordinates.
     * @returns {Array}
     */
    geotoolkit.renderer.GraphicsPath.prototype.getY = function(){};
    /**
     * Returns a start index in the x and y for the current command.
     * @param {number} i index of the element
     * @returns {number}
     */
    geotoolkit.renderer.GraphicsPath.prototype.getIndex = function(i){};
    /**
     * Returns the element at the given index in the painter path.
     * @param {number} i index of the element
     * @returns {object}
     */
    geotoolkit.renderer.GraphicsPath.prototype.getElement = function(i){};
    /**
     * Returns the number of elements
     * @returns {number}
     */
    geotoolkit.renderer.GraphicsPath.prototype.getElementCount = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number[]} [properties.x] x
     * @param {number[]} [properties.y] y
     * @param {number[]} [properties.index] index
     * @param {geotoolkit.renderer.GraphicsPath.PointType[]} [properties.tags] tags
     * @param {geotoolkit.util.Rect} [properties.bounds] bounds
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.renderer.GraphicsPath.prototype.setProperties = function(properties){};
    /**
     * Returns the path's string representation
     * @returns {string}
     */
    geotoolkit.renderer.GraphicsPath.prototype.toString = function(){};
    /**
     * Makes the intersection of this path's fill area
     * and rectangle. This methid is experemental and work for
     * bounds only.
     *
     * @param {geotoolkit.util.Rect} rect the specified rectangle
     * @returns {geotoolkit.renderer.GraphicsPath} this
     * @throws {Error} if the rect is null
     */
    geotoolkit.renderer.GraphicsPath.prototype.intersect = function(rect){};
    /**
     * Transform path using the current transformation
     * @param {geotoolkit.util.Transformation} transformation the specified transformation
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.renderer.GraphicsPath.prototype.transform = function(transformation){};

/**
 * Defines text metrics
 *
 * @class geotoolkit.renderer.TextMetrics
 */
geotoolkit.renderer.TextMetrics = {};
    /**
     * setMetrics
     * @param {number} width width
     * @param {number} height height
     * @param {object} [fontMetrics] font metrics
     * @returns {geotoolkit.renderer.TextMetrics} this
     */
    geotoolkit.renderer.TextMetrics.prototype.setMetrics = function(width, height, fontMetrics){};
    /**
     * Return font metrics
     * @returns {object} fontMetrics font metrics
     * @returns {number} [fontMetrics.ascent] font ascent
     * @returns {number} [fontMetrics.descent] font descent
     * @returns {number} [fontMetrics.height] font height
     */
    geotoolkit.renderer.TextMetrics.prototype.getFontMetrics = function(){};
    /**
     * return width
     * @returns {number}
     */
    geotoolkit.renderer.TextMetrics.prototype.getWidth = function(){};
    /**
     * return height
     * @returns {number}
     */
    geotoolkit.renderer.TextMetrics.prototype.getHeight = function(){};
    /**
     * Return clone object.
     * @returns {geotoolkit.renderer.TextMetrics} clone a copy of this object
     */
    geotoolkit.renderer.TextMetrics.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.renderer.TextMetrics.prototype.getProperties = function(){};
    /**
     * Convert current instance TextMetrics to geotoolkit.util.Rect
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.renderer.TextMetrics.prototype.toRect = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.width] set the width
     * @param {number} [properties.height] set the height
     * @returns {geotoolkit.renderer.TextMetrics}
     */
    geotoolkit.renderer.TextMetrics.prototype.setProperties = function(properties){};
    /**
     * Enum of text measure strategies
     * @enum
     * @readonly
     */
    geotoolkit.renderer.TextMetrics.TextMetricsMeasureStrategy = {};
        /**
         * LimitedCache
         * @type {number}
         */
        geotoolkit.renderer.TextMetrics.TextMetricsMeasureStrategy.LimitedCache = NaN;
        /**
         * SymbolCache
         * @type {number}
         */
        geotoolkit.renderer.TextMetrics.TextMetricsMeasureStrategy.SymbolCache = NaN;
        /**
         * CanvasAndLimited
         * @type {number}
         */
        geotoolkit.renderer.TextMetrics.TextMetricsMeasureStrategy.CanvasAndLimited = NaN;
        /**
         * CanvasMRULimited
         * @type {number}
         */
        geotoolkit.renderer.TextMetrics.TextMetricsMeasureStrategy.CanvasMRULimited = NaN;
        /**
         * NodeCanvas
         * @type {number}
         */
        geotoolkit.renderer.TextMetrics.TextMetricsMeasureStrategy.NodeCanvas = NaN;
    /**
     * Parse font weight, size and family based on font string
     * follow w3 recommendation see {@link http://www.w3.org/TR/css3-fonts/}
     * if the font cannot be parsed it will return default font : 12px arial.
     * @example
     * it returns {fontweight: String, fontsize: String, fontfamily: String, fontlineheight: String, fontstyle: String}
     *
     * @param {string|geotoolkit.attributes.TextStyle} font current font for the text
     * @returns {object} obj
     * @returns {string} obj.fontweight
     * @returns {string} obj.fontsize
     * @returns {string} obj.fontfamily
     * @returns {string} obj.fontlineheight
     * @returns {string} obj.fontstyle
     */
    geotoolkit.renderer.TextMetrics.parseFont = function(font){};
    /**
     * Sets the maximum cache limit
     * @param {number} val number of different font metrics that can be implemented
     */
    geotoolkit.renderer.TextMetrics.setCacheLimit = function(val){};
    /**
     * clears the current cache
     */
    geotoolkit.renderer.TextMetrics.clearCache = function(){};
    /**
     * Measure text size in device coordinates
     * @param {string} text current text string
     * @param {geotoolkit.attributes.TextStyle} [textStyle] the text style
     * @param {boolean} [useFontMetrics=false] flag to calculate font metrics
     * @returns {geotoolkit.renderer.TextMetrics} text metrics
     */
    geotoolkit.renderer.TextMetrics.measureText = function(text, textStyle, useFontMetrics){};
    /**
     * Measure text size in device coordinates
     * @deprecated since 2.5 use measureText instead
     * @param {string} text current text string
     * @param {geotoolkit.attributes.TextStyle} [textStyle] the text style
     * @returns {geotoolkit.renderer.TextMetrics} text metrics
     */
    geotoolkit.renderer.TextMetrics.MeasureText = function(text, textStyle){};
    /**
     * Sets the strategy to use when measuring text size
     * This function sets the 'MeasureText' function according ot the strategy
     * @param {geotoolkit.renderer.TextMetrics.TextMetricsMeasureStrategy} val strategy to measure text
     */
    geotoolkit.renderer.TextMetrics.setMeasureTextStrategy = function(val){};
    /**
     * Returns the current text measure strategy
     * @returns {geotoolkit.renderer.TextMetrics.TextMetricsMeasureStrategy}
     */
    geotoolkit.renderer.TextMetrics.getMeasureTextStrategy = function(){};

/**
 * Represents context to traverse nodes during picking and rendering
 *
 * @class geotoolkit.renderer.RenderingContext
 * @augments geotoolkit.renderer.Graphics
 * @param {string | geotoolkit.util.AbstractUnit} deviceUnit represent the {string} name, {string} symbol or {geotoolkit.util.AbstractUnit} unit to be used as unit for device
 * @param {geotoolkit.renderer.IFilter[]} [filters] an array of filters
 */
geotoolkit.renderer.RenderingContext = {};
    /**
     * Add filter to be applied
     * @param {geotoolkit.renderer.IFilter} filter filter to add
     * @returns {geotoolkit.renderer.RenderingContext}
     */
    geotoolkit.renderer.RenderingContext.prototype.addFilter = function(filter){};
    /**
     * Remove an instance of the filter
     * @param {geotoolkit.renderer.IFilter} filter filter to remove
     * @returns {geotoolkit.renderer.RenderingContext}
     */
    geotoolkit.renderer.RenderingContext.prototype.removeFilter = function(filter){};
    /**
     * Gets an array of filters
     * @protected
     * @returns {geotoolkit.renderer.IFilter[]|null}
     */
    geotoolkit.renderer.RenderingContext.prototype.getFilters = function(){};
    /**
     * Sets an array of filters
     * @protected
     * @param {geotoolkit.renderer.IFilter[]|null} filters filters
     * @returns {geotoolkit.renderer.RenderingContext}
     */
    geotoolkit.renderer.RenderingContext.prototype.setFilters = function(filters){};
    /**
     * Gets the current transformation, which defines transformation from model
     * coordinates to device coordinates
     * @function
     * @abstract
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.renderer.RenderingContext.prototype.getTransformation = function(){};
    /**
     * Sets the current transformation, which defines transformation from model
     * coordinates to device coordinates
     * @function
     * @abstract
     * @param {geotoolkit.util.Transformation} transformation transformation to be set
     */
    geotoolkit.renderer.RenderingContext.prototype.setTransformation = function(transformation){};
    /**
     * Gets the current transformation, which defines transformation from device
     * coordinates to model coordinates.
     * Note, that inverse transformation can be calculated based on
     * getTransformation() call (and vice versa).
     * @function
     * @abstract
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.renderer.RenderingContext.prototype.getInverseTransformation = function(){};
    /**
     * Gets a transformation from model coordinates to parent. For node it means
     * node contents of rendered node to parent node.
     * @function
     * @abstract
     * @deprecated Since 2.6
     * @returns {geotoolkit.util.Transformation} a transformation from model
     * coordinates to parent
     */
    geotoolkit.renderer.RenderingContext.prototype.getLocalTransformation = function(){};
    /**
     * Creates rendering state
     * @function
     * @abstract
     * @returns {geotoolkit.renderer.RenderingState} a new instance of the rendering state
     */
    geotoolkit.renderer.RenderingContext.prototype.createRenderingState = function(){};
    /**
     * Creates a new surface
     * @function
     * @abstract
     * @param {number} width
     * width of surface
     * @param {number} height
     * height of surface
     * @returns {geotoolkit.renderer.Surface} a new instance of surface
     */
    geotoolkit.renderer.RenderingContext.prototype.createSurface = function(width, height){};
    /**
     * Creates a new context with concatenated transformation
     * @function
     * @abstract
     * @param {geotoolkit.util.Transformation} tr a transformation to concatenate
     * @returns {geotoolkit.renderer.RenderingContext} a new context
     */
    geotoolkit.renderer.RenderingContext.prototype.pushTransformation = function(tr){};
    /**
     * Gets rectangular area (defined in device space) to invalidate
     * @function
     * @abstract
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.renderer.RenderingContext.prototype.getDeviceRect = function(){};
    /**
     * Gets "global" view port (defined in device space).
     * The implementation calls for "this.getDeviceRect()"
     * @function
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.renderer.RenderingContext.prototype.getGlobalViewPort = function(){};
    /**
     * Sets "global" view port (defined in device space)
     * The implementation is empty
     * @param {!geotoolkit.util.Rect} globalViewPort "global" view port
     * @returns {geotoolkit.renderer.RenderingContext}
     */
    geotoolkit.renderer.RenderingContext.prototype.setGlobalViewPort = function(globalViewPort){};
    /**
     * Gets rectangular area (defined in model space) to invalidate.
     * Note, that having called getTransformation() (or getInverseTransformation())
     * model rect can be calculated based on device rect (and vice versa).
     * @function
     * @abstract
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.renderer.RenderingContext.prototype.getModelRect = function(){};
    /**
     * Sets device rectangle area of interest
     * @function
     * @abstract
     * @param {geotoolkit.util.Rect} rect
     */
    geotoolkit.renderer.RenderingContext.prototype.setDeviceRect = function(rect){};
    /**
     * Sets model rectangle
     * @function
     * @abstract
     * @param {geotoolkit.util.Rect} rect model area of interest
     */
    geotoolkit.renderer.RenderingContext.prototype.setModelRect = function(rect){};
    /**
     * Return true if context is doing picking now
     * @function
     * @abstract
     * @returns {boolean} true if is is picking context
     */
    geotoolkit.renderer.RenderingContext.prototype.isPicking = function(){};
    /**
     * Return text metrics
     * @function
     * @abstract
     * @param {string} text
     * text
     * @param {geotoolkit.attributes.TextStyle} [textStyle] the text style
     * @returns the text metrics
     */
    geotoolkit.renderer.RenderingContext.prototype.measureText = function(text, textStyle){};
    /**
     * Returns line dimension at the current context
     * @function
     * @param {geotoolkit.attributes.LineStyle} lineStyle the line style
     * @returns {number} the line width
     */
    geotoolkit.renderer.RenderingContext.prototype.measureLine = function(lineStyle){};
    /**
     * Save the current state
     * @function
     * @abstract
     */
    geotoolkit.renderer.RenderingContext.prototype.save = function(){};
    /**
     * Restore current state
     * @function
     * @abstract
     */
    geotoolkit.renderer.RenderingContext.prototype.restore = function(){};
    /**
     * Filter node
     * @param {geotoolkit.scene.Node} node node to be rendered
     * @returns {boolean}
     */
    geotoolkit.renderer.RenderingContext.prototype.filter = function(node){};
    /**
     * Specify node to be rendered
     * @param {geotoolkit.scene.Node} node node to be rendered
     */
    geotoolkit.renderer.RenderingContext.prototype.setCurrentNode = function(node){};
    /**
     * Prepare rendering context. The default implementation blocks notifications from nodes and
     * styles. if you call beginRendering then call the endRendering.
     */
    geotoolkit.renderer.RenderingContext.prototype.beginRendering = function(){};
    /**
     * End usage ot the rendering context
     */
    geotoolkit.renderer.RenderingContext.prototype.endRendering = function(){};

/**
 * Represents context to traverse nodes during picking and rendering
 * @class geotoolkit.renderer.DocumentRenderingContext
 * @augments geotoolkit.renderer.RenderingContext
 */
geotoolkit.renderer.DocumentRenderingContext = {};
    /**
     * Sets the pages count
     *
     * @function
     * @abstract
     * @param {number} xPageCount page count along x
     * @param {number} yPageCount page count along y
     */
    geotoolkit.renderer.DocumentRenderingContext.prototype.setPagesCount = function(xPageCount, yPageCount){};
    /**
     * Sets the page info settings
     *
     * @function
     * @abstract
     * @param {number} pageX index of the page by x
     * @param {number} pageY index of the page by y
     */
    geotoolkit.renderer.DocumentRenderingContext.prototype.setPageInfoSettings = function(pageX, pageY){};
    /**
     * Sets document settings
     *
     * @function
     * @param {Object} documentSettings document settings
     * @returns {geotoolkit.renderer.DocumentRenderingContext}
     */
    geotoolkit.renderer.DocumentRenderingContext.prototype.setDocumentSettings = function(documentSettings){};
    /**
     * Return document settings
     * @returns {?Object}
     */
    geotoolkit.renderer.DocumentRenderingContext.prototype.getDocumentSettings = function(){};

/**
 * Define buffer of commands
 *
 * @class geotoolkit.renderer.RenderingState
 * @augments geotoolkit.renderer.Graphics
 */
geotoolkit.renderer.RenderingState = {};
    /**
     * Clear buffer
     * @function
     * @abstract
     */
    geotoolkit.renderer.RenderingState.prototype.clear = function(){};
    /**
     * Draw buffer on context.
     * @function
     * @abstract
     * @param {geotoolkit.renderer.RenderingContext} context
     */
    geotoolkit.renderer.RenderingState.prototype.draw = function(context){};
    /**
     * Check if the state is valid for the current context
     * @function
     * @abstract
     * @param {geotoolkit.renderer.RenderingContext} context context to check
     * @returns {boolean}
     */
    geotoolkit.renderer.RenderingState.prototype.isValid = function(context){};

/**
 * Define interface for a raster surface. This surface can be rendered to
 * context
 *
 * @class geotoolkit.renderer.Surface
 */
geotoolkit.renderer.Surface = {};
    /**
     * Begin paint
     * @function
     * @param {geotoolkit.util.Transformation} tr transformation
     * @param {geotoolkit.util.Point} offset The offset of the surface relative to device.
     * @param {geotoolkit.util.Rect} [rect] The rectangle area to be cleared
     * @param {boolean} [clearArea=true] clear rendering area
     * @returns {geotoolkit.renderer.RenderingContext} a node rendering context
     */
    geotoolkit.renderer.Surface.prototype.beginPaint = function(tr, offset, rect, clearArea){};
    /**
     * End paint
     * @function
     * @abstract
     */
    geotoolkit.renderer.Surface.prototype.endPaint = function(){};
    /**
     * Render a surface at specified position of the target device. This method ignores transformation,
     * which is set on context.
     * @function
     * @param {geotoolkit.renderer.RenderingContext} context context to render surface
     * @param {number} x the x coordinate of the upper-left corner of the destination
     * rectangle
     * @param {number} y the y coordinate of the upper-left corner of the destination
     * rectangle
     * @param {number} [dstW] device width
     * @param {number} [dstH] device height
     * @param {number} [xImg] xPosition of the image to start rendering
     * @param {number} [yImg] yPosition of the image to start rendering
     * @param {number} [imgW] width of the image to draw
     * @param {number} [imgH] height of the image to draw
     */
    geotoolkit.renderer.Surface.prototype.render = function(context, x, y, dstW, dstH, xImg, yImg, imgW, imgH){};
    /**
     * Return width of the surface
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.renderer.Surface.prototype.getWidth = function(){};
    /**
     * Return height of the surface
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.renderer.Surface.prototype.getHeight = function(){};
    /**
     * Draw image to surface
     * @function
     * @param {geotoolkit.scene.shapes.Image} image image to draw
     * @param {number} dx the x coordinate of the upper-left corner of the destination
     * rectangle
     * @param {number} dy the y coordinate of the upper-left corner of the destination
     * rectangle
     */
    geotoolkit.renderer.Surface.prototype.drawImage = function(image, dx, dy){};
    /**
     * Clear surface
     * @function
     * @abstract
     */
    geotoolkit.renderer.Surface.prototype.clear = function(){};
    /**
     * Release surface
     * @function
     * @abstract
     */
    geotoolkit.renderer.Surface.prototype.release = function(){};
    /**
     * Create pixmap object with the specified dimensions
     * @function
     * @abstract
     * @param {number} width width of the image data
     * @param {number} height height of the image data
     * @returns {geotoolkit.renderer.Pixmap}
     */
    geotoolkit.renderer.Surface.prototype.createPixmap = function(width, height){};
    /**
     * Get pixmap object representing the underlying pixel data for the area of the surface
     * denoted by the rectangle which starts at (x, y) and has width and height.
     * @function
     * @abstract
     * @param {number} x The x coordinate of the upper left corner of the rectangle from which the Pixmap will be extracted.
     * @param {number} y The y coordinate of the upper left corner of the rectangle from which the Pixmap will be extracted.
     * @param {number} width width of the image data
     * @param {number} height height of the image data
     * @returns {geotoolkit.renderer.Pixmap}
     */
    geotoolkit.renderer.Surface.prototype.getPixmap = function(x, y, width, height){};
    /**
     * Renders data from the given Pixmap object onto the surface. If a dirty rectangle is provided, only the
     * pixels from that rectangle are rendered.
     * @function
     * @param {geotoolkit.renderer.Pixmap} pixmap pixmap, which contains pixels to be rendered
     * @param {number} srcX horizontal position (x-coordinate) of the upper-left corner of the pixmap data rectangle in the target surface.
     * @param {number} srcY vertical position (y-coordinate) of the upper-left corner of the pixmap data rectangle in the target surface
     * @param {number} [dstX] horizontal position (x-coordinate) where to place the image on the surface. Defaults to the top left
     * of the whole pixmap.
     * @param {number} [dstY] vertical position (y-coordinate) where to place the image on the surface. Defaults to the top left of the
     * whole image data.
     * @param {number} [dstWidth] width of the rectangle to be rendered, in the origin image data. Defaults to the width of the image data.
     * @param {number} [dstHeight] width of the rectangle to be rendered, in the origin image data. Defaults to the width of the image data.
     */
    geotoolkit.renderer.Surface.prototype.putPixmap = function(pixmap, srcX, srcY, dstX, dstY, dstWidth, dstHeight){};
    /**
     * Check if surface is valid. If it was created for different pixel scale it is marked as invalid
     * @function
     * @abstract
     * @returns {boolean}
     */
    geotoolkit.renderer.Surface.prototype.isValid = function(){};

/**
 * Define an interface that controls whether or not to render a particular nodes
 * @interface
 */
geotoolkit.renderer.IFilter = {};
    /**
     * Checks if the node should be drawn.
     * <p>
     * All children nodes will be given
     * the chance to render or not to render.
     * </p>
     * @function
     * @abstract
     * @param {geotoolkit.scene.Node} node node to check
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {boolean} flag filter flag ("true" to render node; "false" otherwise)
     */
    geotoolkit.renderer.IFilter.prototype.filter = function(node, context){};
    /**
     * Begin filtering. If a filter should be applied to children nodes it needs to
     * be added to context and removed in the method end
     * @function
     * @abstract
     * @example Implementation fo filter to be applied for children
     * MyFilter.prototype.begin = function(context) {
     * context.addFilter(this);
     * };
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {geotoolkit.renderer.IFilter}
     */
    geotoolkit.renderer.IFilter.prototype.begin = function(context){};
    /**
     * End filtering. If a filter should be applied to children nodes it needs to
     * be added to context and removed in the method end
     * @function
     * @abstract
     * @example Implementation fo filter to be applied for children
     * MyFilter.prototype.end = function(context) {
     * context.removeFilter(this);
     * };
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {geotoolkit.renderer.IFilter}
     */
    geotoolkit.renderer.IFilter.prototype.end = function(context){};

/**
 * Define an object which can be laid out.
 * @interface
 */
geotoolkit.layout.ILayoutable = {};
    /**
     * Returns area, which object occupies
     * @function
     * @abstract
     * @returns {geotoolkit.util.Rect} return area, which object occupies
     */
    geotoolkit.layout.ILayoutable.prototype.getBounds = function(){};
    /**
     * Set area, which object occupies
     * @function
     * @abstract
     * @param {geotoolkit.util.Rect} area an area to occupy
     * @returns {geotoolkit.layout.ILayoutable} this
     */
    geotoolkit.layout.ILayoutable.prototype.setBounds = function(area){};
    /**
     * Return desired layout style
     * @function
     * @abstract
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.layout.ILayoutable.prototype.getLayoutStyle = function(){};

/**
 * Defines properties for node layout.
 *
 * @class geotoolkit.layout.LayoutStyle
 * @augments geotoolkit.attributes.SpaceStyle
 * @param {object} [layoutStyle] object which contains the following fields
 * @param {number|string} [layoutStyle.left] left position
 * @param {number|string} [layoutStyle.right] right position
 * @param {number|string} [layoutStyle.width] width
 * @param {number|string} [layoutStyle.height] height
 * @param {number|string} [layoutStyle.top] top position
 * @param {number|string} [layoutStyle.bottom] bottom position
 * @param {geotoolkit.layout.SizeConstraint} [layoutStyle.constraint=geotoolkit.layout.SizeConstraint.NoConstraint] layout constrains
 * @param {number|string} [layoutStyle.min-height] minimum height
 * @param {number|string} [layoutStyle.max-height] maximum height
 * @param {number|string} [layoutStyle.min-width] minimum width
 * @param {number|string} [layoutStyle.max-width] maximum width
 */
geotoolkit.layout.LayoutStyle = {};
    /**
     * @inheritdoc
     */
    geotoolkit.layout.LayoutStyle.prototype.clone = function(){};
    /**
     * return width position
     * @returns {number|string}
     */
    geotoolkit.layout.LayoutStyle.prototype.getWidth = function(){};
    /**
     * set width
     *
     * @param {number|string} width position
     * @returns {geotoolkit.layout.LayoutStyle} this
     */
    geotoolkit.layout.LayoutStyle.prototype.setWidth = function(width){};
    /**
     * return height position
     * @returns {number|string}
     */
    geotoolkit.layout.LayoutStyle.prototype.getHeight = function(){};
    /**
     * set height
     *
     * @param {number|string} height position
     * @returns {geotoolkit.layout.LayoutStyle} this
     */
    geotoolkit.layout.LayoutStyle.prototype.setHeight = function(height){};
    /**
     * return size
     * @returns {number|string}
     */
    geotoolkit.layout.LayoutStyle.prototype.getSize = function(){};
    /**
     * set size
     *
     * @param {number|string} size size
     * @returns {geotoolkit.layout.LayoutStyle} this
     */
    geotoolkit.layout.LayoutStyle.prototype.setSize = function(size){};
    /**
     * set size constraint
     *
     * @param {geotoolkit.layout.SizeConstraint} constraint size constraint
     * @returns {geotoolkit.layout.LayoutStyle} this
     */
    geotoolkit.layout.LayoutStyle.prototype.setSizeConstraint = function(constraint){};
    /**
     * Return size constraint
     * @returns {geotoolkit.layout.SizeConstraint} constraint size constraint
     */
    geotoolkit.layout.LayoutStyle.prototype.getSizeConstraint = function(){};
    /**
     * sets minimum height
     * @param {number|string} height height
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.layout.LayoutStyle.prototype.setMinHeight = function(height){};
    /**
     * Returns minimum height
     * @returns {number|string} minimum height
     */
    geotoolkit.layout.LayoutStyle.prototype.getMinHeight = function(){};
    /**
     * sets maximum height
     * @param {number|string} height height
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.layout.LayoutStyle.prototype.setMaxHeight = function(height){};
    /**
     * Returns maximum height
     * @returns {number|string} maximum height
     */
    geotoolkit.layout.LayoutStyle.prototype.getMaxHeight = function(){};
    /**
     * sets minimum width
     * @param {number|string} width width
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.layout.LayoutStyle.prototype.setMinWidth = function(width){};
    /**
     * Returns minimum width
     * @returns {number|string} minimum width
     */
    geotoolkit.layout.LayoutStyle.prototype.getMinWidth = function(){};
    /**
     * sets maximum width
     * @param {number|string} width width
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.layout.LayoutStyle.prototype.setMaxWidth = function(width){};
    /**
     * Returns maximum width
     * @returns {number|string} maximum width
     */
    geotoolkit.layout.LayoutStyle.prototype.getMaxWidth = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.layout.LayoutStyle.setProperties}
     */
    geotoolkit.layout.LayoutStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number|string} [properties.width] width
     * @param {number|string} [properties.height] height
     * @param {number|string} [properties.size] size
     * @param {geotoolkit.layout.SizeConstraint} [properties.constraint] layout constrains
     * @param {number|string} [properties.min-height] minimum height
     * @param {number|string} [properties.max-height] maximum height
     * @param {number|string} [properties.min-width] minimum width
     * @param {number|string} [properties.max-width] maximum width
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.layout.LayoutStyle.prototype.setProperties = function(properties){};
    /**
     * Create or get layout style from object
     *
     * @param {Object|geotoolkit.layout.LayoutStyle} [object] object can be in format of constructor
     * geotoolkit.layout.LayoutStyle
     * @returns {?geotoolkit.layout.LayoutStyle} layout style
     */
    geotoolkit.layout.LayoutStyle.fromObject = function(object){};

/**
 * The Layout class provides an abstract class for all layouts in the toolkits. This class defines a virtual API for arranging children nodes using method layout, which has parameter area.
 *
 * @class geotoolkit.layout.Layout
 */
geotoolkit.layout.Layout = {};
    /**
     * Performs layout operation
     * @param {geotoolkit.util.Rect} area desired rect to layout
     * @param {geotoolkit.layout.ILayoutable[]|geotoolkit.scene.Node[]|geotoolkit.util.Iterator} [targets=null] array of nodes or iterator of nodes supposed to layout
     * @returns {geotoolkit.layout.Layout} this
     * @function
     * @abstract
     */
    geotoolkit.layout.Layout.prototype.layout = function(area, targets){};
    /**
     * Return the preferable size of children. Default implementation returns desired rect
     * @param {geotoolkit.util.Rect} rect desired rect to layout
     * @param {geotoolkit.scene.Node[]} [targets=null] array of nodes supposed to layout
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.layout.Layout.prototype.getPreferredSize = function(rect, targets){};
    /**
     * All subclasses should override copyConstructor or provide custom implementation for this method
     * @returns {geotoolkit.layout.Layout}
     */
    geotoolkit.layout.Layout.prototype.clone = function(){};
    /**
     * Copy constructor function.<br>
     * Function used as part of the cloning mechanism.<br>
     * Implementations should copy the given instance state to this instance.<br>
     * @protected
     * @param {geotoolkit.layout.Layout} src Source to copy from
     */
    geotoolkit.layout.Layout.prototype.copyConstructor = function(src){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties An object containing the properties of the layout
     */
    geotoolkit.layout.Layout.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.layout.Layout} This
     */
    geotoolkit.layout.Layout.prototype.setProperties = function(properties){};

/**
 * Defines a container of layouts
 *
 * @class geotoolkit.layout.CompositeLayout
 * @augments geotoolkit.layout.Layout
 */
geotoolkit.layout.CompositeLayout = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.layout.CompositeLayout} src Source to copy from
     */
    geotoolkit.layout.CompositeLayout.prototype.copyConstructor = function(src){};
    /**
     * @inheritdoc
     */
    geotoolkit.layout.CompositeLayout.prototype.layout = function(){};
    /**
     * Return the preferable size of children. It returns an union of all children
     * @param {geotoolkit.util.Rect} rect desired rect to layout
     * @param {geotoolkit.scene.Node[]} [targets=null] array of nodes supposed to layout
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.layout.CompositeLayout.prototype.getPreferredSize = function(rect, targets){};
    /**
     * Return index of child
     * ( index of the specified child or -1 if layout is not found)
     *
     * @param {geotoolkit.layout.Layout} layout layout to check index
     * @returns {number}
     */
    geotoolkit.layout.CompositeLayout.prototype.indexOfChild = function(layout){};
    /**
     * Insert child layout at specified index
     *
     * @param {number} index
     * specified index
     * @param {geotoolkit.layout.Layout} layout
     * a child layout to add
     * @returns {geotoolkit.layout.CompositeLayout}
     */
    geotoolkit.layout.CompositeLayout.prototype.insertChild = function(index, layout){};
    /**
     * Add a child layout(s)
     *
     * @param {geotoolkit.layout.Layout|Array<geotoolkit.layout.Layout>} layout the child layout to be added
     * @returns {geotoolkit.layout.CompositeLayout}
     */
    geotoolkit.layout.CompositeLayout.prototype.add = function(layout){};
    /**
     * Return iterator by child layouts
     *
     * @param {function()} [filter] a filter function. Returns all layouts if null
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.layout.CompositeLayout.prototype.getChildren = function(filter){};
    /**
     * Remove child layout
     *
     * @param {geotoolkit.layout.Layout} layout layout to be removed
     * @returns {geotoolkit.layout.CompositeLayout}
     */
    geotoolkit.layout.CompositeLayout.prototype.removeChild = function(layout){};
    /**
     * Remove all child layouts from this composite layout
     */
    geotoolkit.layout.CompositeLayout.prototype.clearChildren = function(){};
    /**
     * Return layout by index
     *
     * @param {number} i
     * index of the layout
     * @returns {geotoolkit.layout.Layout}
     */
    geotoolkit.layout.CompositeLayout.prototype.getChild = function(i){};
    /**
     * Return number of child layouts
     *
     * @returns {number}
     */
    geotoolkit.layout.CompositeLayout.prototype.getChildrenCount = function(){};

/**
 * Implements simple css layout (in absolute values)
 *
 * @class geotoolkit.layout.CssLayout
 * @augments geotoolkit.layout.Layout
 */
geotoolkit.layout.CssLayout = {};
    /**
     * Add item to be layout
     * @param {geotoolkit.layout.ILayoutable} item item to add to layout
     * @returns {geotoolkit.layout.CssLayout}
     */
    geotoolkit.layout.CssLayout.prototype.add = function(item){};
    /**
     * Add additional item to be layout
     * @param {geotoolkit.layout.ILayoutable} item item to add to layout
     * @returns {geotoolkit.layout.CssLayout}
     */
    geotoolkit.layout.CssLayout.prototype.remove = function(item){};
    /**
     * Performs layout operation
     * @param {geotoolkit.util.Rect} rect desired rect to layout
     * @param {Array<geotoolkit.scene.Node>} targets of nodes supposed to layout
     * @returns {geotoolkit.layout.CssLayout}
     */
    geotoolkit.layout.CssLayout.prototype.layout = function(rect, targets){};
    /**
     * Return the preferable size of children. Default implementation returns null
     * @param {geotoolkit.util.Rect} rect desired rect to layout
     * @param {geotoolkit.scene.Node[]} [targets=null] array of nodes supposed to layout
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.layout.CssLayout.prototype.getPreferredSize = function(rect, targets){};

/**
 * This utility class provides functions used by geotoolkit.layout.LayoutStyle implementations
 *
 * @class geotoolkit.layout.LayoutHelper
 */
geotoolkit.layout.LayoutHelper = {};
    /**
     * Converts desired width of the "node" layoutable component to {number} if possible
     *
     * @param {geotoolkit.layout.ILayoutable} node layoutable component
     * @param {number} totalWidth parent width of the container or layoutable area
     * @returns {number | undefined} converted value; or 0 if
     * the node is not visible; or "undefined" the conversion failed.
     *
     * @example
     * node.setDesiredWidth('15');
     * var w1 = LayoutHelper.getDesiredWidth(node); // So, w1==15.
     * node.setDesiredWidth('15%');
     * var w2 = LayoutHelper.getDesiredWidth(node, 200); // So, w2==30.
     */
    geotoolkit.layout.LayoutHelper.getDesiredWidth = function(node, totalWidth){};
    /**
     * Converts desired height of the "node" layoutable component to {number} if possible
     *
     * @param {geotoolkit.layout.ILayoutable} node layoutable component
     * @param {number} totalHeight parent height of the container or layoutable area
     * @returns {number | undefined} converted value; or 0 if
     * the node is not visible; or "undefined" the conversion failed.
     *
     * @example
     * node.setDesiredHeight('15');
     * var h1 = LayoutHelper.getDesiredHeight(node); // So, h1==15.
     * node.setDesiredHeight('15%');
     * var h2 = LayoutHelper.getDesiredHeight(node, 200); // So, h2==30.
     */
    geotoolkit.layout.LayoutHelper.getDesiredHeight = function(node, totalHeight){};
    /**
     * Returns left margin
     * @param {geotoolkit.layout.ILayoutable} node layoutable component
     * @param {number} [totalWidth] parent width of the container or layoutable area
     * @returns {number}
     */
    geotoolkit.layout.LayoutHelper.getLeftMargin = function(node, totalWidth){};
    /**
     * Returns right margin
     * @param {geotoolkit.layout.ILayoutable} node layoutable component
     * @param {number} [totalWidth] parent width of the container or layoutable area
     * @returns {number}
     */
    geotoolkit.layout.LayoutHelper.getRightMargin = function(node, totalWidth){};
    /**
     * Returns top margin
     * @param {geotoolkit.layout.ILayoutable} node layoutable component
     * @param {number} [totalHeight] parent height of the container or layoutable area
     * @returns {number}
     */
    geotoolkit.layout.LayoutHelper.getTopMargin = function(node, totalHeight){};
    /**
     * Returns bottom margin
     * @param {geotoolkit.layout.ILayoutable} node layoutable component
     * @param {number} [totalHeight] parent height of the container or layoutable area
     * @returns {number}
     */
    geotoolkit.layout.LayoutHelper.getBottomMargin = function(node, totalHeight){};
    /**
     * Gets the Maximum Height of layoutable component
     * @param {geotoolkit.layout.ILayoutable} node layoutable component
     * @param {number} [totalHeight] parent height of the container or layoutable area
     * @returns {number} Maximum Height
     */
    geotoolkit.layout.LayoutHelper.getDesiredMaxHeight = function(node, totalHeight){};
    /**
     * Gets the Minimum Height of layoutable component
     * @param {geotoolkit.layout.ILayoutable} node layoutable component
     * @param {number} [totalHeight] parent height of the container or layoutable area
     * @returns {number} Minimum Height
     */
    geotoolkit.layout.LayoutHelper.getDesiredMinHeight = function(node, totalHeight){};
    /**
     * Gets the Maximum Width of layoutable component
     * @param {geotoolkit.layout.ILayoutable} node layoutable component
     * @param {number} [totalWidth] parent width of the container or layoutable area
     * @returns {number} Maximum Width
     */
    geotoolkit.layout.LayoutHelper.getDesiredMaxWidth = function(node, totalWidth){};
    /**
     * Gets the Minimum Width of layoutable component
     * @param {geotoolkit.layout.ILayoutable} node layoutable component
     * @param {number} [totalWidth] parent width of the container or layoutable area
     * @returns {number} Minimum Width
     */
    geotoolkit.layout.LayoutHelper.getDesiredMinWidth = function(node, totalWidth){};
    /**
     * Update layout style preferred size based on size constrains from calculated size
     * @param {geotoolkit.layout.LayoutStyle} style style to be updated
     * @param {geotoolkit.util.Rect} [rect=null] desired rect to layout
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.layout.LayoutHelper.getPreferredStyle = function(style, rect){};
    /**
     * Return number from value
     * @param {string|number} val value as absolute or percentage value form maxValue
     * @param {number} [maxValue] maximum value
     * @param {number} [defaultValue] default value if val is null
     * @returns {?number}
     */
    geotoolkit.layout.LayoutHelper.getNumber = function(val, maxValue, defaultValue){};

/**
 * Define an abstract class for box layout to line up child <code>geotoolkit.layout.ILayoutable</code> horizontally or vertically.
 *
 * Children can be added using methods: <code>add</code> or <code>insert</code> or can be passed as parameter in method <code>layout</code>
 *
 * @class geotoolkit.layout.BoxLayout
 * @augments geotoolkit.layout.Layout
 * @param {geotoolkit.util.Rect} [dstRect] layout area
 */
geotoolkit.layout.BoxLayout = {};
    /**
     * Enum of alignment
     * @enum
     * @readonly
     */
    geotoolkit.layout.BoxLayout.Alignment = {};
        /**
         * Top
         * @type {number}
         */
        geotoolkit.layout.BoxLayout.Alignment.Top = NaN;
        /**
         * Bottom
         * @type {number}
         */
        geotoolkit.layout.BoxLayout.Alignment.Bottom = NaN;
        /**
         * Left
         * @type {number}
         */
        geotoolkit.layout.BoxLayout.Alignment.Left = NaN;
        /**
         * Right
         * @type {number}
         */
        geotoolkit.layout.BoxLayout.Alignment.Right = NaN;
        /**
         * Center
         * @type {number}
         */
        geotoolkit.layout.BoxLayout.Alignment.Center = NaN;
    /**
     * Gets rectangular layout area
     *
     * @returns {geotoolkit.util.Rect} rectangular layout area ("undefined" by default)
     */
    geotoolkit.layout.BoxLayout.prototype.getRect = function(){};
    /**
     * Sets rectangular layout area
     *
     * @param {geotoolkit.util.Rect} dstRect rectangular layout area
     * @returns {geotoolkit.layout.BoxLayout} this
     */
    geotoolkit.layout.BoxLayout.prototype.setRect = function(dstRect){};
    /**
     * Adds layoutable element
     *
     * @param {geotoolkit.layout.ILayoutable | geotoolkit.layout.ILayoutable[] | geotoolkit.util.Iterator} node layoutable element(s)
     * @throws {Error} if "node" parameter is not layoutable element
     * @returns {geotoolkit.layout.BoxLayout} this
     */
    geotoolkit.layout.BoxLayout.prototype.add = function(node){};
    /**
     * Inserts layoutable element
     * @param {number} index index where element will be inserted
     * @param {geotoolkit.layout.ILayoutable | geotoolkit.layout.ILayoutable[] | geotoolkit.util.Iterator} node layoutable element(s)
     * @throws {Error} if "node" parameter is not layoutable element
     * @returns {geotoolkit.layout.BoxLayout} this
     */
    geotoolkit.layout.BoxLayout.prototype.insert = function(index, node){};
    /**
     * Removes a layoutable node if found
     *
     * @param {geotoolkit.scene.Group} node layoutable element
     * @returns {geotoolkit.layout.BoxLayout} this
     */
    geotoolkit.layout.BoxLayout.prototype.remove = function(node){};
    /**
     * Returns iterator by layoutable elements
     *
     * @param {function()} [filter] a filter function. Returns all elements if null
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.layout.BoxLayout.prototype.getIterator = function(filter){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object
     * @returns {geotoolkit.util.Rect} [properties.rect] bounds of the layout
     */
    geotoolkit.layout.BoxLayout.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] An object containing the properties to set
     * @param {geotoolkit.util.Rect} [properties.rect] bounds of the layout
     * @param {geotoolkit.layout.ILayoutable[]} [properties.layoutables]
     * @returns {geotoolkit.layout.BoxLayout} this
     */
    geotoolkit.layout.BoxLayout.prototype.setProperties = function(properties){};

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
 * @class geotoolkit.layout.HorizontalBoxLayout
 * @augments geotoolkit.layout.BoxLayout
 * @param {geotoolkit.util.Rect} dstRect layout area
 * @param {geotoolkit.layout.BoxLayout.Alignment} [alignment=geotoolkit.layout.BoxLayout.Alignment.Top] vertical alignment
 * @param {geotoolkit.layout.HorizontalBoxLayout.Direction} [direction=geotoolkit.layout.HorizontalBoxLayout.Direction.LeftToRight] optional direction of layout
 */
geotoolkit.layout.HorizontalBoxLayout = {};
    /**
     * Returns vertical alignment
     * @returns {geotoolkit.layout.BoxLayout.Alignment} alignment vertical alignment
     */
    geotoolkit.layout.HorizontalBoxLayout.prototype.getAlignment = function(){};
    /**
     * Sets vertical alignment
     * @param {geotoolkit.layout.BoxLayout.Alignment} alignment alignment
     * @returns {geotoolkit.layout.HorizontalBoxLayout} this
     */
    geotoolkit.layout.HorizontalBoxLayout.prototype.setAlignment = function(alignment){};
    /**
     * Enum for Direction of Layout
     * @enum
     * @readonly
     */
    geotoolkit.layout.HorizontalBoxLayout.Direction = {};
        /**
         * LeftToRight
         * @type {string}
         */
        geotoolkit.layout.HorizontalBoxLayout.Direction.LeftToRight = "";
        /**
         * RightToLeft
         * @type {string}
         */
        geotoolkit.layout.HorizontalBoxLayout.Direction.RightToLeft = "";
    /**
     * Set direction
     * @param {geotoolkit.layout.HorizontalBoxLayout.Direction} value direction
     * @returns {geotoolkit.layout.HorizontalBoxLayout} this
     */
    geotoolkit.layout.HorizontalBoxLayout.prototype.setDirection = function(value){};
    /**
     * Returns direction of layout
     * @returns {geotoolkit.layout.HorizontalBoxLayout.Direction}
     */
    geotoolkit.layout.HorizontalBoxLayout.prototype.getDirection = function(){};
    /**
     * Sets rectangular layout area
     *
     * @param {geotoolkit.util.Rect} dstRect rectangular layout area
     * @returns {geotoolkit.layout.HorizontalBoxLayout} this
     * @throws {Error} if parameter is undefined or the rect's width is no greater than 0.
     */
    geotoolkit.layout.HorizontalBoxLayout.prototype.setRect = function(dstRect){};
    /**
     * Return the preferable size of children. It returns an union of all children
     * @param {geotoolkit.util.Rect} layoutRect desired rect to layout
     * @param {geotoolkit.scene.Node[]} [targets=null] array of nodes supposed to layout
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.layout.HorizontalBoxLayout.prototype.getPreferredSize = function(layoutRect, targets){};
    /**
     * @inheritdoc
     */
    geotoolkit.layout.HorizontalBoxLayout.prototype.layout = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.layout.HorizontalBoxLayout.setProperties}
     */
    geotoolkit.layout.HorizontalBoxLayout.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.layout.BoxLayout.Alignment} [properties.alignment] alignment of the layout
     * @param {geotoolkit.layout.HorizontalBoxLayout.Direction} [properties.direction] direction of the layout
     * @returns {geotoolkit.layout.HorizontalBoxLayout} this
     */
    geotoolkit.layout.HorizontalBoxLayout.prototype.setProperties = function(properties){};

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
 * @class geotoolkit.layout.VerticalBoxLayout
 * @augments geotoolkit.layout.BoxLayout
 * @param {geotoolkit.util.Rect} [dstRect=null] layout area
 * @param {geotoolkit.layout.BoxLayout.Alignment} [alignment=geotoolkit.layout.BoxLayout.Alignment.Left] horizontal alignment
 * @param {geotoolkit.layout.VerticalBoxLayout.Direction} [direction=geotoolkit.layout.VerticalBoxLayout.Direction.TopToBottom] optional direction of layout
 */
geotoolkit.layout.VerticalBoxLayout = {};
    /**
     * Returns horizontal alignment
     * @returns {geotoolkit.layout.BoxLayout.Alignment} alignment
     */
    geotoolkit.layout.VerticalBoxLayout.prototype.getAlignment = function(){};
    /**
     * Sets horizontal alignment
     * @param {geotoolkit.layout.BoxLayout.Alignment} alignment alignment
     * @returns {geotoolkit.layout.VerticalBoxLayout} this
     */
    geotoolkit.layout.VerticalBoxLayout.prototype.setAlignment = function(alignment){};
    /**
     * Enum for Direction of Layout
     * @enum
     * @readonly
     */
    geotoolkit.layout.VerticalBoxLayout.Direction = {};
        /**
         * TopToBottom
         * @type {string}
         */
        geotoolkit.layout.VerticalBoxLayout.Direction.TopToBottom = "";
        /**
         * BottomToTop
         * @type {string}
         */
        geotoolkit.layout.VerticalBoxLayout.Direction.BottomToTop = "";
    /**
     * Set direction
     * @param {geotoolkit.layout.VerticalBoxLayout.Direction} value direction
     * @returns {geotoolkit.layout.VerticalBoxLayout} this
     */
    geotoolkit.layout.VerticalBoxLayout.prototype.setDirection = function(value){};
    /**
     * Returns direction of layout
     * @returns {geotoolkit.layout.VerticalBoxLayout.Direction}
     */
    geotoolkit.layout.VerticalBoxLayout.prototype.getDirection = function(){};
    /**
     * Sets rectangular layout area
     *
     * @param {geotoolkit.util.Rect} dstRect rectangular layout area
     * @returns {geotoolkit.layout.VerticalBoxLayout} this
     * @throws {Error} if parameter is undefined or the rect's height is no greater than 0.
     */
    geotoolkit.layout.VerticalBoxLayout.prototype.setRect = function(dstRect){};
    /**
     * Return the preferable size of children. It returns an union of all children
     * @param {geotoolkit.util.Rect} layoutRect desired rect to layout
     * @param {geotoolkit.scene.Node[]} [targets=null] array of nodes supposed to layout
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.layout.VerticalBoxLayout.prototype.getPreferredSize = function(layoutRect, targets){};
    /**
     * Performs layout operation
     * @param {geotoolkit.util.Rect} [layoutRect = null] desired rect to layout
     * @param {geotoolkit.scene.Node[]} [targets = null] array of nodes supposed to layout
     * @returns {geotoolkit.layout.VerticalBoxLayout} this
     */
    geotoolkit.layout.VerticalBoxLayout.prototype.layout = function(layoutRect, targets){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.layout.VerticalBoxLayout.setProperties}
     */
    geotoolkit.layout.VerticalBoxLayout.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.layout.BoxLayout.Alignment} [properties.alignment] alignment of the layout
     * @param {geotoolkit.layout.VerticalBoxLayout.Direction} [properties.direction] direction of the layout
     * @returns {geotoolkit.layout.VerticalBoxLayout} this
     */
    geotoolkit.layout.VerticalBoxLayout.prototype.setProperties = function(properties){};

/**
 * Children are arranged in a grid based on
 * number of Rows and Columns in the grid.
 *
 * @class geotoolkit.layout.RegularGridLayout
 * @augments geotoolkit.layout.BoxLayout
 * @param {number} rowCount number of columns for layout
 * @param {number} colCount number of rows for layout
 * @param {geotoolkit.layout.RegularGridLayout.ContainerDirection} containerDirection direction for container's layout
 * @param {geotoolkit.util.Rect} dstRect rectangular layout area
 */
geotoolkit.layout.RegularGridLayout = {};
    /**
     * Sets rectangular layout area
     *
     * @param {geotoolkit.util.Rect} dstRect rectangular layout area
     * @returns {geotoolkit.layout.RegularGridLayout} this
     * @throws {Error} if parameter is undefined or the rect's width (or its height) is no greater than 0.
     */
    geotoolkit.layout.RegularGridLayout.prototype.setRect = function(dstRect){};
    /**
     * Enum of mutual columns and rows positions in the layout
     * @enum
     * @readonly
     * @example
     * // Elements in the layout array go column-by-column:
     * var direction1 = RegularGridLayout.ContainerDirection.Vertical;
     *
     * // Elements in the layout array go row-by-row:
     * var direction2 = RegularGridLayout.ContainerDirection.Vertical;
     */
    geotoolkit.layout.RegularGridLayout.ContainerDirection = {};
        /**
         * Elements in the layout array go column-by-column.
         * @type {string}
         */
        geotoolkit.layout.RegularGridLayout.ContainerDirection.Vertical = "";
        /**
         * Elements in the layout array go row-by-row.
         * @type {string}
         */
        geotoolkit.layout.RegularGridLayout.ContainerDirection.Horizontal = "";
    /**
     * Layout
     * @override
     * @param {geotoolkit.util.Rect} [layoutRect = null] desired rect to layout
     * @param {geotoolkit.layout.ILayoutable[]} [targets = null] array of nodes supposed to layout
     * @returns {geotoolkit.layout.RegularGridLayout} this
     * @throws {Error} if layout area is undefined or its width (or its height) is no greater than 0;
     * or if the grid size does not match numbers of elements to layout.
     */
    geotoolkit.layout.RegularGridLayout.prototype.layout = function(layoutRect, targets){};
    /**
     * Sets direction for container's layout
     * @param {geotoolkit.layout.RegularGridLayout.ContainerDirection} direction direction for container's layout
     * @returns {geotoolkit.layout.RegularGridLayout} this
     */
    geotoolkit.layout.RegularGridLayout.prototype.setDirection = function(direction){};
    /**
     * Gets direction of the container that this layout for
     * @returns {geotoolkit.layout.RegularGridLayout.ContainerDirection}
     */
    geotoolkit.layout.RegularGridLayout.prototype.getDirection = function(){};
    /**
     * Sets number of columns for layout
     * @param {number} colCount number of columns for layout
     * @returns {geotoolkit.layout.RegularGridLayout} this
     */
    geotoolkit.layout.RegularGridLayout.prototype.setColumnCount = function(colCount){};
    /**
     * Gets number of columns for layout
     * @returns {number}
     */
    geotoolkit.layout.RegularGridLayout.prototype.getColumnCount = function(){};
    /**
     * Sets number of rows for layout
     * @param {number} rowCount number of rows for layout
     * @returns {geotoolkit.layout.RegularGridLayout} this
     */
    geotoolkit.layout.RegularGridLayout.prototype.setRowCount = function(rowCount){};
    /**
     * Gets number of rows for layout
     * @returns {number}
     */
    geotoolkit.layout.RegularGridLayout.prototype.getRowCount = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.layout.RegularGridLayout.setProperties}
     */
    geotoolkit.layout.RegularGridLayout.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.rowcount] rowcount rowcount
     * @param {number} [properties.columncount] columncount columncount
     * @param {geotoolkit.layout.RegularGridLayout.ContainerDirection} [properties.direction] direction of the layout
     * @returns {geotoolkit.layout.RegularGridLayout} this
     */
    geotoolkit.layout.RegularGridLayout.prototype.setProperties = function(properties){};

/**
 * @class geotoolkit.layout.HorizontalPriorityLayout
 * @augments geotoolkit.layout.Layout
 */
geotoolkit.layout.HorizontalPriorityLayout = {};
    /**
     * Enum for Horizontal Priority Layout
     * @enum
     * @readonly
     */
    geotoolkit.layout.HorizontalPriorityLayout.Direction = {};
        /**
         * LeftToRight
         * @type {string}
         */
        geotoolkit.layout.HorizontalPriorityLayout.Direction.LeftToRight = "";
        /**
         * RightToLeft
         * @type {string}
         */
        geotoolkit.layout.HorizontalPriorityLayout.Direction.RightToLeft = "";
    /**
     * Set direction
     * @param {geotoolkit.layout.HorizontalPriorityLayout.Direction} value direction of layout
     * @returns {geotoolkit.layout.HorizontalPriorityLayout} this
     */
    geotoolkit.layout.HorizontalPriorityLayout.prototype.setDirection = function(value){};
    /**
     * Returns direction
     * @returns {geotoolkit.layout.HorizontalPriorityLayout.Direction} direction of layout
     */
    geotoolkit.layout.HorizontalPriorityLayout.prototype.getDirection = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.layout.HorizontalPriorityLayout.prototype.layout = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties An object containing the properties of the layout
     * @returns {geotoolkit.layout.HorizontalPriorityLayout.Direction} [properties.direction] direction of the layout
     */
    geotoolkit.layout.HorizontalPriorityLayout.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] An object containing the properties to set
     * @param {geotoolkit.layout.HorizontalPriorityLayout.Direction} [properties.direction] direction of the layout
     * @returns {geotoolkit.layout.HorizontalPriorityLayout} this
     */
    geotoolkit.layout.HorizontalPriorityLayout.prototype.setProperties = function(properties){};

/**
 * @class geotoolkit.layout.VerticalPriorityLayout
 * @augments geotoolkit.layout.Layout
 */
geotoolkit.layout.VerticalPriorityLayout = {};
    /**
     * Enum for Horizontal Priority Layout
     * @enum
     * @readonly
     */
    geotoolkit.layout.VerticalPriorityLayout.Direction = {};
        /**
         * TopToBottom
         * @type {string}
         */
        geotoolkit.layout.VerticalPriorityLayout.Direction.TopToBottom = "";
        /**
         * BottomToTop
         * @type {string}
         */
        geotoolkit.layout.VerticalPriorityLayout.Direction.BottomToTop = "";
    /**
     * Set direction
     * @param {geotoolkit.layout.VerticalPriorityLayout.Direction} value the new layout direction
     * @returns {geotoolkit.layout.VerticalPriorityLayout} this
     */
    geotoolkit.layout.VerticalPriorityLayout.prototype.setDirection = function(value){};
    /**
     * Returns direction
     * @returns {geotoolkit.layout.VerticalPriorityLayout.Direction} direction
     */
    geotoolkit.layout.VerticalPriorityLayout.prototype.getDirection = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.layout.VerticalPriorityLayout.prototype.layout = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.layout.VerticalPriorityLayout.setProperties}
     */
    geotoolkit.layout.VerticalPriorityLayout.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.layout.VerticalPriorityLayout.Direction} [properties.direction] direction of the layout
     * @returns {geotoolkit.layout.VerticalPriorityLayout} this
     */
    geotoolkit.layout.VerticalPriorityLayout.prototype.setProperties = function(properties){};

/**
 * @class geotoolkit.layout.TableLayout
 * @augments geotoolkit.layout.Layout
 * @param {number} [rowCount = 0] A count of rows
 * @param {number} [colCount = 0] A count of columns
 * @param {geotoolkit.util.Rect} [dstRect=null]
 */
geotoolkit.layout.TableLayout = {};
    /**
     * Enum of mutual columns and rows positions in layout
     * @enum
     * @readonly
     * @example
     * // Elements in the layout array go column-by-column:
     * var direction1 = TableLayout.Direction.Horizontal;
     *
     * // Elements in the layout array go row-by-row:
     * var direction2 = TableLayout.Direction.Horizontal;
     */
    geotoolkit.layout.TableLayout.Direction = {};
        /**
         * Elements set in row-by-row manner.
         * @type {string}
         */
        geotoolkit.layout.TableLayout.Direction.Horizontal = "";
        /**
         * Elements set column-by-column manner.
         * @type {string}
         */
        geotoolkit.layout.TableLayout.Direction.Vertical = "";
    /**
     * set direction for Table layout
     * @param {geotoolkit.layout.TableLayout.Direction} value a new direction
     * @returns {geotoolkit.layout.TableLayout} this
     */
    geotoolkit.layout.TableLayout.prototype.setDirection = function(value){};
    /**
     * Gets direction of the layout
     * @returns {geotoolkit.layout.TableLayout.Direction}
     */
    geotoolkit.layout.TableLayout.prototype.getDirection = function(){};
    /**
     * Sets the number of columns
     * @param {number} colCount the number of columns for the layout
     * @returns {geotoolkit.layout.TableLayout} this
     */
    geotoolkit.layout.TableLayout.prototype.setColumnCount = function(colCount){};
    /**
     * Gets the number of columns
     * @returns {number} columnCount
     */
    geotoolkit.layout.TableLayout.prototype.getColumnCount = function(){};
    /**
     * Sets the number of rows
     * @param {number} rowCount the number of rows for the layout
     * @returns {geotoolkit.layout.TableLayout} this
     */
    geotoolkit.layout.TableLayout.prototype.setRowCount = function(rowCount){};
    /**
     * Gets the number of Rows
     * @returns {number} rowCount
     */
    geotoolkit.layout.TableLayout.prototype.getRowCount = function(){};
    /**
     * Sets Distance between two columns.
     * @param {number} distance a horizontal distance
     * @returns {geotoolkit.layout.TableLayout}
     */
    geotoolkit.layout.TableLayout.prototype.setHorizontalDistance = function(distance){};
    /**
     * Gets the Horizontal Distance between two columns
     * @returns {number}
     */
    geotoolkit.layout.TableLayout.prototype.getHorizontalDistance = function(){};
    /**
     * Sets Distance between two rows.
     * @param {number} distance a vertical distance
     * @returns {geotoolkit.layout.TableLayout}
     */
    geotoolkit.layout.TableLayout.prototype.setVerticalDistance = function(distance){};
    /**
     * Gets the Vertical Distance between two rows
     * @returns {number}
     */
    geotoolkit.layout.TableLayout.prototype.getVerticalDistance = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.layout.TableLayout.prototype.layout = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.layout.TableLayout.setProperties}
     */
    geotoolkit.layout.TableLayout.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.rowcount] rowcount rowcount
     * @param {number} [properties.columncount] columncount columncount
     * @param {number} [properties.horizontaldistance] horizontaldistance horizontal distance
     * @param {number} [properties.verticaldistance] verticaldistance vertical distance
     * @param {geotoolkit.layout.TableLayout.Direction} [properties.direction] direction of the layout
     * @returns {geotoolkit.layout.TableLayout} this
     */
    geotoolkit.layout.TableLayout.prototype.setProperties = function(properties){};

/**
 * Interface to layout {@link geotoolkit.layout.ILayoutElement1D} elements.
 * @see {@link geotoolkit.layout.ILayoutElement1D}
 *
 * @interface
 */
geotoolkit.layout.ILayout1D = {};
    /**
     * Layouts elements
     * @function
     * @abstract
     *
     * @param {!geotoolkit.util.Iterator} elements {@link geotoolkit.layout.ILayoutElement1D} elements to layout
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.util.Range} limits limits to layout elements within
     */
    geotoolkit.layout.ILayout1D.prototype.layout = function(elements, context, limits){};

/**
 * Layout element to be used for layout by {@link geotoolkit.layout.ILayout1D} implementation.
 * @see {@link geotoolkit.layout.ILayout1D}
 *
 * @interface
 */
geotoolkit.layout.ILayoutElement1D = {};
    /**
     * Gets value
     * @function
     * @abstract
     *
     * @returns {!number}
     */
    geotoolkit.layout.ILayoutElement1D.prototype.getValue = function(){};
    /**
     * Gets value range to layout
     * @function
     * @abstract
     *
     * @returns {!geotoolkit.util.Range}
     */
    geotoolkit.layout.ILayoutElement1D.prototype.getLayoutRange = function(){};
    /**
     * Updates value range to layout
     * @function
     * @abstract
     *
     */
    geotoolkit.layout.ILayoutElement1D.prototype.updateLayoutRange = function(){};
    /**
     * Gets offset applied
     * @function
     * @abstract
     *
     * @returns {!number}
     */
    geotoolkit.layout.ILayoutElement1D.prototype.getOffset = function(){};
    /**
     * Sets offset to apply
     * @function
     * @abstract
     *
     * @param {!number} offset to apply
     * @returns {geotoolkit.layout.ILayoutElement1D} this
     */
    geotoolkit.layout.ILayoutElement1D.prototype.setOffset = function(offset){};
    /**
     * Gets "overlapped" flag
     * @function
     * @abstract
     *
     * @returns {!boolean}
     */
    geotoolkit.layout.ILayoutElement1D.prototype.getOverlapped = function(){};
    /**
     * Sets "overlapped" flag
     * @function
     * @abstract
     *
     * @param {!boolean} overlapped "overlapped" flag
     */
    geotoolkit.layout.ILayoutElement1D.prototype.setOverlapped = function(overlapped){};

/**
 *
 * @class geotoolkit.layout.ValueCorrelatedRangeLayout1D
 * @implements geotoolkit.layout.ILayout1D
 *
 * @param {!object} [options] layout options
 * @param {!string} [options.overlap='some'] what to do if ranges don't fit: 'some' or 'all'
 * @param {!number} [options.maxoffset] if defined do not draw labels further than 'maxoffset' device units from its model position
 */
geotoolkit.layout.ValueCorrelatedRangeLayout1D = {};
    /**
     * Layouts elements
     *
     * @param {!geotoolkit.util.Iterator} elements elements to layout
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.util.Range} [limits] limits to layout elements within
     */
    geotoolkit.layout.ValueCorrelatedRangeLayout1D.prototype.layout = function(elements, context, limits){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.layout.ValueCorrelatedRangeLayout1D.setProperties}
     */
    geotoolkit.layout.ValueCorrelatedRangeLayout1D.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.offset] offset offset
     * @param {boolean} [properties.overlapped] overlapped overlapped
     * @returns {geotoolkit.layout.ValueCorrelatedRangeLayout1D} this
     */
    geotoolkit.layout.ValueCorrelatedRangeLayout1D.prototype.setProperties = function(properties){};

/**
 * Defines behavior of responsive nodes.
 *
 * @class geotoolkit.responsive.ResponsiveStyle
 * @augments geotoolkit.attributes.Style
 * @param {object} [options] options
 * @param {function} [options.start=null] start applying options
 * @param {function} [options.end=null] end applying options
 * @param {geotoolkit.scene.Node} [options.target=null] optional target to apply styles
 * @param {array.<string>} [options.events=[geotoolkit.scene.Node.Events.LocalTransformationChanged,geotoolkit.scene.Node.Events.BoundsChanged]] events to apply responsive style
 * @param {geotoolkit.responsive.ResponsiveStyle~Rule[]|object[]|geotoolkit.responsive.ResponsiveStyle~Rule|object} [options.rules=null] an array of rules {@link geotoolkit.responsive.ResponsiveStyle~Rule}
 * @example Function as condition
 * var rules = [
 * {
 * 'condition': function (node) {
 * return node.getBounds().getWidth() < 500 && node.getBounds().getWidth() > 200;
 * },
 * 'properties': {
 * 'z': {
 * 'annotationsize': 0
 * }
 * }
 * }];
 * var style = new geotoolkit.responsive.ResponsiveStyle({
 * 'rules': rules
 * });
 * @example Object as condition
 * var rules = [
 * {
 * 'condition': {
 * 'maxWidth': 500,
 * 'maxHeight': 500
 * },
 * 'properties': {
 * 'z': {
 * 'annotationsize': 0
 * }
 * }
 * }];
 * var style = new geotoolkit.responsive.ResponsiveStyle({
 * 'rules': rules
 * });
 * @example Expressions as condition
 * var rules = [
 * {
 * 'condition': 'node => width(node) < 500 || height(node) < 500',
 * 'properties': {
 * 'z': {
 * 'annotationsize': 0
 * }
 * }
 * }];
 * var style = new geotoolkit.responsive.ResponsiveStyle({
 * 'rules': rules
 * });
 * @example CSS style as properties
 * var rules = [
 * {
 * 'condition': function (node) {
 * return node.getBounds().getWidth() < 500 && node.getBounds().getWidth() > 200;
 * },
 * 'css': [
 * '.Grid { ',
 * ' visible: false;',
 * '}',
 * '.CrossPlot {',
 * 'z-annotationsize: 0;',
 * 'x-annotationsize: 0;',
 * 'y-annotationsize: 0;',
 * '}'
 * ].join('\n')
 * }];
 */
geotoolkit.responsive.ResponsiveStyle = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.responsive.ResponsiveStyle} src Source to copy from
     */
    geotoolkit.responsive.ResponsiveStyle.prototype.copyConstructor = function(src){};
    /**
     * Check if style should be applied for the current event
     * @param {string} event event to check
     * @returns {boolean}
     */
    geotoolkit.responsive.ResponsiveStyle.prototype.supportsEvent = function(event){};
    /**
     * Return a source of events
     * @returns {?geotoolkit.scene.Node}
     */
    geotoolkit.responsive.ResponsiveStyle.prototype.getSource = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} result
     * @returns {geotoolkit.responsive.ResponsiveStyle~Rule[]|object[]} [result.rules=null] an array of rules {@link geotoolkit.responsive.ResponsiveStyle~Rule}
     */
    geotoolkit.responsive.ResponsiveStyle.prototype.getProperties = function(){};
    /**
     * Apply rules for the current node
     * @param {geotoolkit.scene.Node} node current instance of the node
     */
    geotoolkit.responsive.ResponsiveStyle.prototype.apply = function(node){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.responsive.ResponsiveStyle~Rule[]} [properties.rules] an array of rules {@link geotoolkit.responsive.ResponsiveStyle~Rule}
     * @param {geotoolkit.scene.Node.Events[]} [properties.events] events
     * @returns {geotoolkit.responsive.ResponsiveStyle}
     */
    geotoolkit.responsive.ResponsiveStyle.prototype.setProperties = function(properties){};
    /**
     * Create or get responsive style from object
     *
     * @param {?(Object|geotoolkit.responsive.ResponsiveStyle)} object object can be in format of constructor
     * geotoolkit.responsive.ResponsiveStyle
     * @returns {?geotoolkit.responsive.ResponsiveStyle} responsive style
     */
    geotoolkit.responsive.ResponsiveStyle.fromObject = function(object){};

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
 * @class geotoolkit.scene.Node
 * @augments geotoolkit.util.EventDispatcher
 * @param {object} [options] The options
 * @param {string} [options.name=''] name of the node. It is often used for debugging purposes or to simplify queries
 * @param {boolean} [options.visible=true] visibility of the node, A boolean to determine if the node should be rendered or not
 * @param {boolean} [options.selectable=true] selectable node A boolean to determine if selection should consider this node
 * @param {!number|string} [options.id=null] id of the node , its a unique identifier
 * @param {object} [options.tag=null] custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
 * @param {string} [options.cssclass=null] The css class name of this node
 */
geotoolkit.scene.Node = {};
    /**
     * @function
     * @desc
     * Returns the instance class name, see {@link geotoolkit.setClassName}
     * @returns {string} The class name
     */
    geotoolkit.scene.Node.prototype.getClassName = function(){};
    /**
     * All subclasses should override copyConstructor or provide custom implementation for this method
     * @returns {geotoolkit.scene.Node} clone
     */
    geotoolkit.scene.Node.prototype.clone = function(){};
    /**
     * Copy constructor function.<br>
     * Function used as part of the cloning mechanism.<br>
     * Implementations should copy the given instance state to this instance.<br>
     * @protected
     * @param {geotoolkit.scene.Node} src Source to copy from
     * @param {boolean} [deepCopy=false] deep copy
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.copyConstructor = function(src, deepCopy){};
    /**
     * Type of state changes
     * @enum
     * @readonly
     */
    geotoolkit.scene.Node.StateChanges = {};
        /**
         * Window pixel scale is changed
         * @type {string}
         */
        geotoolkit.scene.Node.StateChanges.PixelScaleChanged = "";
        /**
         * Node is translated
         * @type {string}
         */
        geotoolkit.scene.Node.StateChanges.Translated = "";
        /**
         * Required to rebuild tree
         * @type {string}
         */
        geotoolkit.scene.Node.StateChanges.Rebuild = "";
        /**
         * Parent state changed
         * @type {string}
         */
        geotoolkit.scene.Node.StateChanges.TransformationChanged = "";
        /**
         * UpdateLayout
         * @type {string}
         */
        geotoolkit.scene.Node.StateChanges.UpdateLayout = "";
        /**
         * Style Changed
         * @type {string}
         */
        geotoolkit.scene.Node.StateChanges.StyleChanged = "";
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties An object containing the properties to set
     * @returns {boolean} [properties.selectable] selectable node
     * @returns {string} [properties.name] name of the node
     * @returns {boolean} [properties.visible] visibility of the node
     * @returns {string} [properties.id] id of the node
     * @returns {object} [properties.tag] custom information associated with node
     */
    geotoolkit.scene.Node.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {boolean} [properties.selectable] selectable node
     * @param {string} [properties.name] name of the node
     * @param {boolean} [properties.visible] visibility of the node
     * @param {string} [properties.id] id of the node
     * @param {object} [properties.tag] custom information associated with node
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.setProperties = function(properties){};
    /**
     * Returns a string representation of this object (generally the classname)
     * @returns {string} A string representation
     */
    geotoolkit.scene.Node.prototype.toString = function(){};
    /**
     * Returns true if node can be picked/selected.
     *
     * @returns {boolean} The selectable flag
     */
    geotoolkit.scene.Node.prototype.isSelectable = function(){};
    /**
     * Allows to select node. If node is not selectable then child node is
     * not selectable.
     *
     * @param {boolean} selectable flag to allow node selection
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.setSelectable = function(selectable){};
    /**
     * Returns the node name
     *
     * @returns {string} The node name
     */
    geotoolkit.scene.Node.prototype.getName = function(){};
    /**
     * Sets name of the node
     *
     * @param {string} name The node name
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.setName = function(name){};
    /**
     * Returns css class name to be used to apply CSS style
     *
     * @returns {string} the css class name
     */
    geotoolkit.scene.Node.prototype.getCssClass = function(){};
    /**
     * Sets css class name of the node to be used to apply CSS style
     *
     * @param {string} name css class name of the node
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.setCssClass = function(name){};
    /**
     * Returns the object associated with the node by user.
     * @returns {object} The node's user-object
     */
    geotoolkit.scene.Node.prototype.getTag = function(){};
    /**
     * Allows the user to associate any arbitrary object with the node.
     *
     * @param {object} tag The object to be associated with the node.
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.setTag = function(tag){};
    /**
     * Returns the associated identifier of the node
     * @returns {!number|string} The node's id
     */
    geotoolkit.scene.Node.prototype.getId = function(){};
    /**
     * Allows the user to associate any identifier
     *
     * @param {!number|string} id object id
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.setId = function(id){};
    /**
     * Return visibility of the node
     *
     * @returns {boolean} true if node is visible
     */
    geotoolkit.scene.Node.prototype.getVisible = function(){};
    /**
     *
     * Sets visibility of the node
     *
     * @param {boolean} value flag specifying visibility of the node
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.setVisible = function(value){};
    /**
     * Return parent node
     *
     * @returns {geotoolkit.scene.Node} parent node
     */
    geotoolkit.scene.Node.prototype.getParent = function(){};
    /**
     * <code>getWorldTransform</code> retrieves the local transformation
     * of the inner node coordinates to parent coordinates.
     *
     * @returns {geotoolkit.util.Transformation|null} the world transform.
     */
    geotoolkit.scene.Node.prototype.getWorldTransform = function(){};
    /**
     * Returns transformation from node to root scene
     *
     * @returns {geotoolkit.util.Transformation} a transformation from node to root scene
     */
    geotoolkit.scene.Node.prototype.getSceneTransform = function(){};
    /**
     * Update state. This methods reset node state and update state for children. this method is useful to
     * refresh a scene graph
     * @param {geotoolkit.util.Rect[]} [regions] optional array to return invalid rectangles in the parent coordinates
     * @param {geotoolkit.scene.Node.StateChanges} [changes] optional parameter to specify a reason of changes
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.updateState = function(regions, changes){};
    /**
     * Update scene transformation
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.updateSceneTransformation = function(){};
    /**
     * Returns root node. <br>
     * If node doesn't have parent then it returns itself.
     *
     * @returns {geotoolkit.scene.Node} the root node
     */
    geotoolkit.scene.Node.prototype.getRoot = function(){};
    /**
     * Invalidate area of the shape. This method invalidates parent by default. invalidated from parent to root node.
     * @param {geotoolkit.util.Rect | undefined | null} [bounds] bounds of the invalid rectangle in the inner node coordinates
     * @param {boolean} [force=false] true if parent should be invalidated immediately
     * if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.invalidate = function(bounds, force){};
    /**
     * set notification state
     * @param {boolean} notify flag set to invalidate parent or not
     * @param {boolean} [force=false] true if parent should be invalidated immediately
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.setNotification = function(notify, force){};
    /**
     * return state of notification
     * @returns {boolean} current notification state
     */
    geotoolkit.scene.Node.prototype.isNotificationEnabled = function(){};
    /**
     * Invalidate parent and notify all listeners.
     * @protected
     * @param {geotoolkit.util.Rect} [bounds] bounds of the invalid rectangle in the inner node coordinates
     * @param {boolean} [force] force rendering
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.invalidateParent = function(bounds, force){};
    /**
     * Add invalidate handler
     * @param {function} handler handler to be notified about invalidation
     */
    geotoolkit.scene.Node.prototype.addInvalidateHandler = function(handler){};
    /**
     * Remove invalidate handler
     * @param {function} handler handler to be notified about invalidation
     */
    geotoolkit.scene.Node.prototype.removeInvalidateHandler = function(handler){};
    /**
     * Check if this node is within the area being rendered by the context
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} true if object is inside of renderable area
     */
    geotoolkit.scene.Node.prototype.checkCollision = function(context){};
    /**
     * Renders node
     * @function
     * @abstract
     * @param {geotoolkit.renderer.RenderingContext} context The rendering context to be used to draw the node
     */
    geotoolkit.scene.Node.prototype.render = function(context){};
    /**
     * Render node in asynchronous mode. Default implementation creates call method "render" inside
     * @param {geotoolkit.renderer.RenderingContext} context The rendering context to be used to draw the node
     * @param {function} callback callback function
     */
    geotoolkit.scene.Node.prototype.renderAsync = function(context, callback){};
    /**
     * Executes delegate and return the result.It allows us to keep all initialization calls in one place, <br>
     * and we do not need to scroll up or down in IDE to find how and where it was initialized.
     * @param {function} delegate Function to execute
     * @returns {object} The result if any or this
     * @example
     * // All setters (.setName() for example) returns reference to the this.
     * // In order to modify inner object like LineStyle or Pattern, to get this object (property) we should call getter to get object reference.
     * // Then modify it as shown below in Option 1 or you can use execute methos shown in Option 2.
     * //
     * // Option 1
     * var group = new geotoolkit.scene.Group()
     * .setName("Group # " + (this.getChildrenCount()()))
     * .setBounds(new geotoolkit.util.Rect(0, 0, Width, DEFAULT_HEIGHT))
     * .enableClipping(true)
     * .setTag({"type": groupType});
     *
     * group.getLineStyle().setPattern("pattern");
     * return group;
     *
     * // Options 2 ( using execute method )
     * return new geotoolkit.scene.Group()
     * .setName("Group # " + (this.getChildrenCount()))
     * .setBounds(new geotoolkit.util.Rect(0, 0, Width, DEFAULT_HEIGHT))
     * .enableClipping(true)
     * .setTag({"type": groupType})
     * .execute(function () {
     * this.getLineStyle()
     * .setPattern("pattern");
     * });
     *
     */
    geotoolkit.scene.Node.prototype.execute = function(delegate){};
    /**
     * @override
     * @protected
     * @param {string} event type of event
     * @param {geotoolkit.scene.Node} source source who called the event
     * @param {object} [args] event arguments
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.notify = function(event, source, args){};
    /**
     * Disposes this node, once disposes a node should not be used anymore.<br>
     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
     * Also aggressively 'cleanup' this node by setting some of its members to null.
     */
    geotoolkit.scene.Node.prototype.dispose = function(){};
    /**
     * Connects style.<br>
     * <br>
     * This convenience method subscribes a listener to given style for the specified type.<br>
     * And automatically un-subscribes listener if node is disposed to prevent memory leaks
     * @protected
     * @param {geotoolkit.util.EventDispatcher} style connect style
     * @param {string} type type of event or property
     * @param {function()} callback function to be called
     */
    geotoolkit.scene.Node.prototype.connectStyle = function(style, type, callback){};
    /**
     * Disconnect style<br>
     * <br>
     * This convenience method un-subscribes a listener to given style for the specified type.<br>
     * @protected
     * @param {geotoolkit.util.EventDispatcher} style connect style
     * @param {string} type type of event or property
     * @param {function()} callback function to be called
     */
    geotoolkit.scene.Node.prototype.disconnectStyle = function(style, type, callback){};
    /**
     * Gets dynamic property by name. These properties can be
     * used as a property bags
     * @param {string} name property name
     * @returns {object}
     */
    geotoolkit.scene.Node.prototype.getProperty = function(name){};
    /**
     * Sets dynamic property by name
     * @param {string} name property name
     * @param {object} value property value
     * @returns {geotoolkit.scene.Node} this
     */
    geotoolkit.scene.Node.prototype.setProperty = function(name, value){};
    /**
     * Enable / disable all notifications
     * @param {boolean} enabled sets if this object sends notifications
     */
    geotoolkit.scene.Node.enableSceneGraphNotification = function(enabled){};
    /**
     * Return status of the global notification for all nodes.
     * @returns {boolean}
     */
    geotoolkit.scene.Node.isSceneGraphNotificationEnabled = function(){};
    /**
     * Gets list of css class names which applied to this node
     * @returns {string[]}
     */
    geotoolkit.scene.Node.prototype.getCssClasses = function(){};
    /**
     * Check if node has specified css class
     * @param {string} cssClass css class name
     * @returns {boolean}
     */
    geotoolkit.scene.Node.prototype.hasCssClass = function(cssClass){};
    /**
     * Adds new css class to node
     * @param {string[]|string} cssclass css class name('s)
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.scene.Node.prototype.addCssClass = function(cssclass){};
    /**
     * Removes css class from node
     * @param {string[]|string} cssclass css class name('s)
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.scene.Node.prototype.removeCssClass = function(cssclass){};
    /**
     * Find root of the node with specified type
     * @param {geotoolkit.scene.Node} node node to start search
     * @param {object} classType type of the class to search for
     * @returns {geotoolkit.scene.Node | null}
     */
    geotoolkit.scene.Node.findParent = function(node, classType){};
    /**
     * Node Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.scene.Node.Events = {};
        /**
         * Event type fired when a shape is modified and requires a render cycle to be done
         * @type {string}
         */
        geotoolkit.scene.Node.Events.Invalidate = "";
        /**
         * Event type fired when a shape is added as a child to another shape
         * @type {string}
         */
        geotoolkit.scene.Node.Events.ChildAdded = "";
        /**
         * Event type fired when a shape is removed from another shape children.
         * @type {string}
         */
        geotoolkit.scene.Node.Events.ChildRemoved = "";
        /**
         * Event type fired when a shape's modellimits have been changed. For example using setModelLimits()
         * @type {string}
         */
        geotoolkit.scene.Node.Events.ModelLimitsChanged = "";
        /**
         * Event type fired when a node's SceneTransformation has been changed.
         * @type {string}
         */
        geotoolkit.scene.Node.Events.SceneTransformationChanged = "";
        /**
         * Event type fired when a node's LocalTransformation has been changed.
         * @type {string}
         */
        geotoolkit.scene.Node.Events.LocalTransformationChanged = "";
        /**
         * Event type fired when a node's order has been changed.
         * @type {string}
         */
        geotoolkit.scene.Node.Events.NodeOrderChanged = "";
        /**
         * Changed
         * @type {string}
         */
        geotoolkit.scene.Node.Events.Changed = "";
        /**
         * Changed
         * @type {string}
         */
        geotoolkit.scene.Node.Events.BoundsChanged = "";
        /**
         * Visibility is changed
         * @type {string}
         */
        geotoolkit.scene.Node.Events.VisibilityChanged = "";
        /**
         * Css class is changed
         * @type {string}
         */
        geotoolkit.scene.Node.Events.CssClassChanged = "";

/**
 * Defines an abstract implementation of a graphics node. Abstract node supports rotation, clipping and local transform.
 * It has several helper methods like scale, rotate, translate, shear.
 * @class geotoolkit.scene.AbstractNode
 * @augments geotoolkit.scene.Node
 * @param {object} [options] options
 * @param {boolean} [options.visible=true] visibility of node
 * @param {boolean} [options.selectable=true] selectable node A boolean to determine if selection should consider this node
 * @param {string} [options.id=null] id of the node , its a unique identifier
 * @param {object} [options.tag=null] custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
 * @param {string} [options.cssclass] The ccs class name of this node
 * @param {geotoolkit.attributes.ClipStyle|object} [options.clipstyle] clipping style
 * @param {geotoolkit.responsive.ResponsiveStyle|object} [options.responsivestyle] responsive style
 * @param {object|geotoolkit.attributes.SpaceStyle} [options.margins] It has properties for specifying the margins for each side
 * @param {number|string} [options.margins.top=0] top margin
 * @param {number|string} [options.margins.bottom=0] top margin
 * @param {number|string} [options.margins.right=0] right margin
 * @param {number|string} [options.margins.left=0] left margin
 * @param {geotoolkit.renderer.IFilter} [options.renderingfilter=null] rendering filter
 * @param {geotoolkit.attributes.AnimationStyle} [options.animationstyle] animation style
 */
geotoolkit.scene.AbstractNode = {};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.AbstractNode.prototype.copyConstructor = function(){};
    /**
     * Sets a new clipping style
     * @param {geotoolkit.attributes.ClipStyle|object} style a new clipping style
     * @returns {geotoolkit.scene.AbstractNode} this
     */
    geotoolkit.scene.AbstractNode.prototype.setClipStyle = function(style){};
    /**
     * Gets the current clipping style
     * @returns {geotoolkit.attributes.ClipStyle} clipstyle
     */
    geotoolkit.scene.AbstractNode.prototype.getClipStyle = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {object} [props.localtransform] local transform
     * @returns {geotoolkit.attributes.ClipStyle|object} [props.clipstyle] clipping style
     * @returns {geotoolkit.responsive.ResponsiveStyle|object} [props.responsivestyle] responsive style
     * @returns {?geotoolkit.attributes.SpaceStyle} [props.margins] margins
     * @returns {?geotoolkit.renderer.IFilter} [props.renderingFilter] rendering filter
     */
    geotoolkit.scene.AbstractNode.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.util.Transformation} [properties.localtransform] local transform
     * @param {geotoolkit.attributes.ClipStyle|object} [properties.clipstyle] clipping style
     * @param {geotoolkit.responsive.ResponsiveStyle|object} [properties.responsivestyle] responsive style
     * @param {object|geotoolkit.attributes.SpaceStyle} [properties.margins] It has properties for specifying the margin for each side
     * @param {object|geotoolkit.attributes.SpaceStyle} [properties.margins] margin style
     * @param {?geotoolkit.renderer.IFilter} [properties.renderingfilter] rendering filter
     * @returns {geotoolkit.scene.AbstractNode}
     */
    geotoolkit.scene.AbstractNode.prototype.setProperties = function(properties){};
    /**
     * Sets local transformation to be used to transform from local to parent
     * coordinate
     *
     * @param {geotoolkit.util.Transformation} localTransform local transformation for this node
     * @returns {geotoolkit.scene.AbstractNode} this
     */
    geotoolkit.scene.AbstractNode.prototype.setLocalTransform = function(localTransform){};
    /**
     * Scale node
     *
     * @param {number} xx x scale factor
     * @param {number} yy y scale factor
     * @returns {geotoolkit.scene.AbstractNode} this
     */
    geotoolkit.scene.AbstractNode.prototype.scale = function(xx, yy){};
    /**
     * Translate bounds
     *
     * @param {number} tx x translation
     * @param {number} ty y translation
     * @returns {geotoolkit.scene.AbstractNode} this
     */
    geotoolkit.scene.AbstractNode.prototype.translate = function(tx, ty){};
    /**
     * Shear this node's bounds
     *
     * @param {number} shx x-axis shear
     * @param {number} shy y-axis shear
     * @returns {geotoolkit.scene.AbstractNode} this
     */
    geotoolkit.scene.AbstractNode.prototype.shear = function(shx, shy){};
    /**
     * Rotate bounds around a given coordinate
     *
     * @param {number} theta angle to rotate node, in radians
     * @param {number} x x coordinate to rotate around
     * @param {number} y y coordinate to rotate around
     * @returns {geotoolkit.scene.AbstractNode} this
     */
    geotoolkit.scene.AbstractNode.prototype.rotate = function(theta, x, y){};
    /**
     * Retrieves the transformation of bounds to parent
     *
     * @returns {geotoolkit.util.Transformation} transform the local transform.
     */
    geotoolkit.scene.AbstractNode.prototype.getLocalTransform = function(){};
    /**
     * Retrieves the local transformation
     * of the node which represents multiplication of parent to bounds and
     * contents transformations.
     *
     * @returns {geotoolkit.util.Transformation} transform the world transform.
     */
    geotoolkit.scene.AbstractNode.prototype.getWorldTransform = function(){};
    /**
     * Occurs before rendering this method sets clipping by default. Call this method
     * if you override method render
     * @protected
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.AbstractNode.prototype.preRendering = function(context){};
    /**
     * To be called after rendering. Call this method if you override method render
     * @protected
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.AbstractNode.prototype.postRendering = function(context){};
    /**
     * Sets CSS style. This style will be applied for all inserted elements
     * @param {string|Object|geotoolkit.css.CssStyle} style CSS style to be applied to inserted elements
     * @param {boolean} [merge=false] merge flag
     * @returns {geotoolkit.scene.AbstractNode} this
     */
    geotoolkit.scene.AbstractNode.prototype.setCss = function(style, merge){};
    /**
     * Return CSS style
     * @returns {geotoolkit.css.CssStyle}
     */
    geotoolkit.scene.AbstractNode.prototype.getCss = function(){};
    /**
     * Sets responsive style.
     * @param {string|Object|geotoolkit.responsive.ResponsiveStyle} style responsive style
     * @returns {geotoolkit.scene.AbstractNode} this
     */
    geotoolkit.scene.AbstractNode.prototype.setResponsiveStyle = function(style){};
    /**
     * Return responsive style
     * @returns {geotoolkit.responsive.ResponsiveStyle}
     */
    geotoolkit.scene.AbstractNode.prototype.getResponsiveStyle = function(){};
    /**
     * Sets margins style
     * @param {geotoolkit.attributes.SpaceStyle|object} [margins] margins style
     * @returns {geotoolkit.scene.AbstractNode}
     */
    geotoolkit.scene.AbstractNode.prototype.setMarginsStyle = function(margins){};
    /**
     * Return margins style
     * @returns {?geotoolkit.attributes.SpaceStyle} padding
     */
    geotoolkit.scene.AbstractNode.prototype.getMarginsStyle = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.AbstractNode.prototype.notify = function(){};
    /**
     * Apply a responsive style rules it is exists
     * @protected
     */
    geotoolkit.scene.AbstractNode.prototype.applyResponsiveStyle = function(){};
    /**
     * Sets filter to be applied before rendering and picking
     * @param {geotoolkit.renderer.IFilter} filter filter to set
     * @returns {geotoolkit.scene.AbstractNode} this
     */
    geotoolkit.scene.AbstractNode.prototype.setRenderingFilter = function(filter){};
    /**
     * Return filter to be used for rendering and picking
     * @returns {geotoolkit.renderer.IFilter} current filter
     */
    geotoolkit.scene.AbstractNode.prototype.getRenderingFilter = function(){};
    /**
     * Gets invalidate method
     * @protected
     * @returns {function()} method to invalidate this object
     */
    geotoolkit.scene.AbstractNode.prototype.getInvalidateMethod = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.AbstractNode.prototype.setParent = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.AbstractNode.prototype.updateState = function(){};
    /**
     * Return animation style
     * @returns {geotoolkit.attributes.AnimationStyle} animationStyle current animation style
     */
    geotoolkit.scene.AbstractNode.prototype.getAnimationStyle = function(){};
    /**
     * Sets animation style
     * @param {geotoolkit.attributes.AnimationStyle} animationStyle animation style
     * @returns {geotoolkit.scene.AbstractNode}
     */
    geotoolkit.scene.AbstractNode.prototype.setAnimationStyle = function(animationStyle){};
    /**
     * Filter node
     * @protected
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} flag filter flag ("true" to render node; "false" otherwise)
     */
    geotoolkit.scene.AbstractNode.prototype.filter = function(context){};
    /**
     * Check if this node is within the area being rendered by the context
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} true if object is inside of renderable area
     */
    geotoolkit.scene.AbstractNode.prototype.checkCollision = function(context){};

/**
 * Define an interface to support a simple iteration over a nodes
 * @interface
 */
geotoolkit.scene.INodeEnumerable = {};
    /**
     * Enumerate children nodes
     * @function
     * @abstract
     * @param {function(node, target)} callback callback
     * @param {object} target target
     */
    geotoolkit.scene.INodeEnumerable.prototype.enumerateNodes = function(callback, target){};

/**
 * A compositenode is a container for other nodes. Nodes/Children can be added/removed/inserted at any time.<br>
 * When clipping is enabled shapes will not be rendered outside the bounds of the composite node. Clipping children is based on the composite bounds.<br>
 * New clipping style can be set using setClipStyle() and it replaces the bounds clipping. If bounds clipping is disabled the new clip style will still be applied for the children.
 *
 * @class geotoolkit.scene.CompositeNode
 * @augments geotoolkit.scene.AbstractNode
 * @implements geotoolkit.scene.INodeEnumerable
 * @param {object} [options=null] options
 * @param {boolean} [options.clipping=false] enable clipping, This does not consider the clipstyle , it is related to bounds-clipping.
 */
geotoolkit.scene.CompositeNode = {};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.CompositeNode.prototype.copyConstructor = function(){};
    /**
     * Enum for node order
     * @enum
     * @static
     * @readonly
     */
    geotoolkit.scene.CompositeNode.NodeOrder = {};
        /**
         * First in array
         * @type {string}
         */
        geotoolkit.scene.CompositeNode.NodeOrder.First = "";
        /**
         * An index prior to the given anchor node
         * @type {string}
         */
        geotoolkit.scene.CompositeNode.NodeOrder.Before = "";
        /**
         * An index next to the given anchor node
         * @type {string}
         */
        geotoolkit.scene.CompositeNode.NodeOrder.After = "";
        /**
         * Last in the array
         * @type {string}
         */
        geotoolkit.scene.CompositeNode.NodeOrder.Last = "";
        /**
         * An index next to where it currently is
         * @type {string}
         */
        geotoolkit.scene.CompositeNode.NodeOrder.Forward = "";
        /**
         * An index prior to where it currently is
         * @type {string}
         */
        geotoolkit.scene.CompositeNode.NodeOrder.Backward = "";
    /**
     * Returns if clipping is enabled or not for this node.
     *
     * @returns {boolean}
     */
    geotoolkit.scene.CompositeNode.prototype.isClippingEnabled = function(){};
    /**
     * Enables or disables clipping of this node. If enabled,
     * shapes will not be rendered outside of its bounds.
     *
     * @param {boolean} doClip enable clipping on this node
     * @returns {geotoolkit.scene.CompositeNode}
     */
    geotoolkit.scene.CompositeNode.prototype.enableClipping = function(doClip){};
    /**
     * Return index of child
     * ( index of the specified child or -1 if node is not found)
     *
     * @param {geotoolkit.scene.Node} node node to check index
     * @returns {number}
     */
    geotoolkit.scene.CompositeNode.prototype.indexOfChild = function(node){};
    /**
     * Insert child node at specified index
     *
     * @param {number} index
     * specified index
     * @param {geotoolkit.scene.Node} node
     * a child node to add
     * @returns {geotoolkit.scene.CompositeNode}
     */
    geotoolkit.scene.CompositeNode.prototype.insertChild = function(index, node){};
    /**
     * Add a child node
     *
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node> | geotoolkit.util.Iterator} node the child node to be added
     * @returns {geotoolkit.scene.CompositeNode}
     */
    geotoolkit.scene.CompositeNode.prototype.addChild = function(node){};
    /**
     * Return iterator by child nodes
     *
     * @param {function()} [filter] a filter function. Returns all nodes if null
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.scene.CompositeNode.prototype.getChildren = function(filter){};
    /**
     * Remove child node
     *
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node>} node node or array of nodes to be removed
     * @returns {geotoolkit.scene.CompositeNode} this
     */
    geotoolkit.scene.CompositeNode.prototype.removeChild = function(node){};
    /**
     * Remove all child nodes from this composite group
     * @param {boolean} [disposeChildren=false] automatically dispose children. If it is
     * true then method dispose is called for each child.
     * @returns {geotoolkit.scene.CompositeNode} this
     */
    geotoolkit.scene.CompositeNode.prototype.clearChildren = function(disposeChildren){};
    /**
     * Return node by index
     *
     * @param {number} i
     * index of the node
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.scene.CompositeNode.prototype.getChild = function(i){};
    /**
     * Return number of child nodes
     *
     * @returns {number}
     */
    geotoolkit.scene.CompositeNode.prototype.getChildrenCount = function(){};
    /**
     * changes the z-order of the nodes being rendered.
     * @param {geotoolkit.scene.Node} node any child added in the Composite node
     * @param {geotoolkit.scene.CompositeNode.NodeOrder} order position to be added
     * @param {geotoolkit.scene.Node} [anchor=null] anchor node to specify changeOrder with respect to this node
     * @returns {geotoolkit.scene.CompositeNode} this
     *
     * @throws {Error} will throw an error if [anchor = null] with the order = Before or order = After
     * @throws {Error} will throw an error if [anchor != null] with the order = Backward or order = Forward
     */
    geotoolkit.scene.CompositeNode.prototype.changeChildOrder = function(node, order, anchor){};
    /**
     * @param {function(node, target)} callback callback
     * @param {object} target target
     */
    geotoolkit.scene.CompositeNode.prototype.enumerateNodes = function(callback, target){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.CompositeNode.prototype.updateState = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.CompositeNode.prototype.invalidateParent = function(){};
    /**
     * Occurs before child rendering
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.CompositeNode.prototype.preRendering = function(context){};
    /**
     * To be called after rendering, used for PDF output
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.CompositeNode.prototype.postRendering = function(context){};
    /**
     * Render node in asynchronous mode
     * @param {geotoolkit.renderer.RenderingContext} context The rendering context to be used to draw the node
     * @param {function} callback callback function
     * @returns {geotoolkit.scene.CompositeNode}
     */
    geotoolkit.scene.CompositeNode.prototype.renderAsync = function(context, callback){};
    /**
     * Render children in asynchronous mode
     * @protected
     * @param {geotoolkit.renderer.RenderingContext} context The rendering context to be used to draw the node
     * @param {function} callback callback function to be called then all children are rendered
     * @returns {geotoolkit.scene.CompositeNode}
     */
    geotoolkit.scene.CompositeNode.prototype.renderContentAsync = function(context, callback){};
    /**
     * render to specified context. This method calls preRendering, renderChildren, postRendering
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.CompositeNode.prototype.renderContent = function(context){};
    /**
     * Render children
     * @protected
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.CompositeNode.prototype.renderChildren = function(context){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.CompositeNode.prototype.render = function(context){};
    /**
     * Return true if the representation is flipped vertically
     *
     * @returns {boolean}
     */
    geotoolkit.scene.CompositeNode.prototype.isVerticalFlip = function(){};
    /**
     * Return true if the representation is flipped horizontally
     *
     * @returns {boolean}
     */
    geotoolkit.scene.CompositeNode.prototype.isHorizontalFlip = function(){};
    /**
     * Sets node by index
     *
     * @param {number} index index of the node
     * @param {geotoolkit.scene.Node} node node
     * @returns {?geotoolkit.scene.Node}
     */
    geotoolkit.scene.CompositeNode.prototype.set = function(index, node){};
    /**
     * Set visible model limits
     * @param {geotoolkit.util.Rect} visibleModelBounds visible model limits or bounds
     * @param {geotoolkit.util.Rect} [deviceBounds=null] device bounds
     * @returns {geotoolkit.scene.CompositeNode}
     */
    geotoolkit.scene.CompositeNode.prototype.setVisibleModelLimits = function(visibleModelBounds, deviceBounds){};
    /**
     * Return visible model limits
     * @param {boolean} [ignoreModelLimits=false] flag defines whether to ignore ModelLimits or not
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.CompositeNode.prototype.getVisibleModelLimits = function(ignoreModelLimits){};
    /**
     * Return visible device limits
     * @param {boolean} [ignoreModelLimits=false] flag defines whether to ignore ModelLimts or not
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.CompositeNode.prototype.getVisibleDeviceLimits = function(ignoreModelLimits){};
    /**
     * Return device limits
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.CompositeNode.prototype.getDeviceLimits = function(){};
    /**
     * Return model limits. (By default it returns null)
     *
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.scene.CompositeNode.prototype.getModelLimits = function(){};
    /**
     * Gets bounds in the parent coordinates
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.CompositeNode.prototype.getBounds = function(){};
    /**
     * Transformation of inner contents to bounds
     *
     * @returns {?geotoolkit.util.Transformation}
     */
    geotoolkit.scene.CompositeNode.prototype.getContentsTransform = function(){};
    /**
     * Retrieves the local transformation of the node which represents multiplication of parent to bounds and
     * contents transformations.
     *
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.scene.CompositeNode.prototype.getWorldTransform = function(){};
    /**
     * Check culling
     * Returns true if object is inside of renderable area
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} true if node is collided
     */
    geotoolkit.scene.CompositeNode.prototype.checkCollision = function(context){};
    /**
     * Adjust position of node to specified area
     *
     * @param {geotoolkit.util.Rect} [area] specified area. Default to Parent Model Limits
     * @param {string} [vAlign="top"] vertical alignment. It can be "top", "bottom", "center". Defaults to "top".
     * @param {string} [hAlign="left"] horizontal alignment It can be "left", "right", "center". Defaults to "left".
     * @returns {geotoolkit.scene.CompositeNode} this
     */
    geotoolkit.scene.CompositeNode.prototype.adjustPosition = function(area, vAlign, hAlign){};
    /**
     * MoveTo position of node to specified area
     *
     * @param {geotoolkit.util.Rect} area specified area
     * @param {string} [vAlign="top"] vertical alignment. It can be "top", "bottom", "center".
     * @param {string} [hAlign="left"] horizontal alignment It can be "left", "right", "center".
     * @returns {geotoolkit.scene.CompositeNode} this
     */
    geotoolkit.scene.CompositeNode.prototype.moveTo = function(area, vAlign, hAlign){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.scene.CompositeNode.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {boolean} [properties.clipping] flag set to enable clipping or not
     * @param {geotoolkit.scene.Node[]} [properties.children] array of children nodes, nodes won't be disposed
     * @returns {geotoolkit.scene.CompositeNode}
     */
    geotoolkit.scene.CompositeNode.prototype.setProperties = function(properties){};
    /**
     * Dispose node. Clear all listeners
     * and disconnect style to avoid memory
     * leaks
     */
    geotoolkit.scene.CompositeNode.prototype.dispose = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.CompositeNode.prototype.notify = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.CompositeNode.prototype.registerAnimationStyle = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.CompositeNode.prototype.unregisterAnimationStyle = function(){};

/**
 * Define a composite node, which always has the same bounds and model limits as its parent
 * @class geotoolkit.scene.Layer
 * @augments geotoolkit.scene.CompositeNode
 * @param {object} [options] addition options
 * @param {boolean} [options.verticalFlip=false] vertical axis goes from bottom to top
 * @param {boolean} [options.horizontalFlip=false] horizontal axis goes from right to left
 * @param {geotoolkit.util.Rect|null} [options.modelLimits=null] define inner model coordinates of the group
 * @param {geotoolkit.util.Rect|null} [options.bounds=null] define position of the group in the parent
 * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node> | geotoolkit.util.Iterator} [options.children=null] the child nodes to be added
 */
geotoolkit.scene.Layer = {};
    /**
     * Returns parent bounds
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.scene.Layer.prototype.getBounds = function(){};
    /**
     * Returns parent model limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.Layer.prototype.getModelLimits = function(){};
    /**
     * Returns parent visible model limits
     * @param {boolean} [ignoreModelLimits=undefined] a flag to ignore model limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.Layer.prototype.getVisibleModelLimits = function(ignoreModelLimits){};
    /**
     * Invalidate parent and notify all listeners.
     * @param {geotoolkit.util.Rect} [bounds] bounds of the invalid rectangle in the inner node coordinates
     * @param {boolean} [force] force invalidate
     * @returns {geotoolkit.scene.Layer} this
     */
    geotoolkit.scene.Layer.prototype.invalidateParent = function(bounds, force){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.Layer.prototype.render = function(context){};

/**
 * Abstract parent class of caches
 *
 * @class geotoolkit.scene.Cache
 */
geotoolkit.scene.Cache = {};
    /**
     * Sets cache owner.
     * @param {geotoolkit.scene.Node} owner node which should be cached
     */
    geotoolkit.scene.Cache.prototype.setOwner = function(owner){};
    /**
     * Returns cache owner.
     * @returns {?geotoolkit.scene.Node} owner
     */
    geotoolkit.scene.Cache.prototype.getOwner = function(){};
    /**
     * Sets render content delegate.
     * @param {function} renderContentDelegate parameter which can render content for this node
     */
    geotoolkit.scene.Cache.prototype.setRenderContent = function(renderContentDelegate){};
    /**
     * Render cache.
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.scene.Cache.prototype.render = function(context){};
    /**
     * Rebuilds cache.
     */
    geotoolkit.scene.Cache.prototype.rebuild = function(){};
    /**
     * Invalidates cache. Marks cache to be rendered.
     * @param {geotoolkit.util.Rect} [bounds] rectangular area to be invalidated
     */
    geotoolkit.scene.Cache.prototype.invalidate = function(bounds){};
    /**
     * for internal use only
     */
    geotoolkit.scene.Cache.prototype.expand = function(){};
    /**
     * Returns resource manager.
     * @function
     * @returns {?geotoolkit.scene.TileResourceManager}
     */
    geotoolkit.scene.Cache.prototype.getResourceManager = function(){};
    /**
     * Returns a cloned cache object.
     * All inheritors should emplement copy constructor or provide custom implementation for this method.
     * @returns {geotoolkit.scene.Cache}
     */
    geotoolkit.scene.Cache.prototype.clone = function(){};
    /**
     * Enum of cache mode
     *
     * @enum
     * @readonly
     */
    geotoolkit.scene.Cache.CacheMode = {};
        /**
         * Shared
         * @type {number}
         */
        geotoolkit.scene.Cache.CacheMode.Shared = NaN;
        /**
         * Independent
         * @type {number}
         */
        geotoolkit.scene.Cache.CacheMode.Independent = NaN;

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
 *
 * @class geotoolkit.scene.Group
 * @augments geotoolkit.scene.CompositeNode
 * @implements geotoolkit.layout.ILayoutable
 * @param {object} [options=null] options
 * @param {boolean} [options.verticalFlip=false] vertical axis goes from bottom to top
 * @param {boolean} [options.horizontalFlip=false] horizontal axis goes from right to left
 * @param {?geotoolkit.util.Rect|null} [options.modelLimits=null] define inner model coordinates of the group
 * @param {?geotoolkit.util.Rect|null} [options.bounds=null] define position of the group in the parent
 * @param {?geotoolkit.attributes.LineStyle|object} [options.linestyle=null] line style
 * @param {?geotoolkit.attributes.FillStyle|object} [options.fillstyle=null] fill style
 * @param {object|geotoolkit.attributes.SpaceStyle} [options.padding] It has properties for specifying the padding for each side
 * @param {number|string} [options.padding.top=0] top padding
 * @param {number|string} [options.padding.bottom=0] top padding
 * @param {number|string} [options.padding.right=0] right padding
 * @param {number|string} [options.padding.left=0] left padding
 * @param {object|geotoolkit.attributes.SpaceStyle} [options.margins] It has properties for specifying the margins for each side
 * @param {number|string} [options.margins.top=0] top margin
 * @param {number|string} [options.margins.bottom=0] top margin
 * @param {number|string} [options.margins.right=0] right margin
 * @param {number|string} [options.margins.left=0] left margin
 * @param {object|geotoolkit.layout.LayoutStyle} [options.layoutstyle] layout style to be used for parent layout
 * @param {number | string} [options.layoutstyle.left] left position
 * @param {number | string} [options.layoutstyle.right] right position
 * @param {number | string} [options.layoutstyle.width] width
 * @param {number | string} [options.layoutstyle.height] height
 * @param {number | string} [options.layoutstyle.top] top position
 * @param {number | string} [options.layoutstyle.bottom] bottom position
 * @param {geotoolkit.layout.SizeConstraint} [options.layoutstyle.constraint=geotoolkit.layout.SizeConstraint.NoConstraint] layout constrains
 * @param {number | string} [options.layoutstyle.min-height] minimum height
 * @param {number | string} [options.layoutstyle.max-height] maximum height
 * @param {number | string} [options.layoutstyle.min-width] minimum width
 * @param {number | string} [options.layoutstyle.max-width] maximum width
 * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node> | geotoolkit.util.Iterator} [options.children=null] the child nodes to be added
 */
geotoolkit.scene.Group = {};
    /**
     * specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle|object} layoutStyle desired layout style
     * @param {boolean} [silent=false] silent setting
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.scene.Group.prototype.setLayoutStyle = function(layoutStyle, silent){};
    /**
     * return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.scene.Group.prototype.getLayoutStyle = function(){};
    /**
     * Return preferred size to layout children
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.Group.prototype.getPreferredSize = function(){};
    /**
     * Returns desired width of the group as a layoutable object.
     * This method is a helper method to get access to getLayoutStyle()
     * @returns {string | number | undefined} desired width ("undefined" by default)
     */
    geotoolkit.scene.Group.prototype.getDesiredWidth = function(){};
    /**
     * Sets desired width of the group as a layoutable object
     * @param {string | number} value desired width to set
     * @param {boolean} [silent=false] silent setting
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setDesiredWidth = function(value, silent){};
    /**
     * Returns desired height of the group as a layoutable object
     * This method is a helper method to get access to getLayoutStyle()
     * @returns {string | number | undefined} desired height ("undefined" by default)
     */
    geotoolkit.scene.Group.prototype.getDesiredHeight = function(){};
    /**
     * Sets desired height of the group as a layoutable object
     * @param {string | number} value desired height to set
     * @param {boolean} [silent=false] silent setting
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setDesiredHeight = function(value, silent){};
    /**
     * Associate layout with a group.
     * @param {geotoolkit.layout.Layout} layout layout to be set
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setLayout = function(layout){};
    /**
     * Returns layout associated with the group
     * @returns {geotoolkit.layout.Layout} layout
     */
    geotoolkit.scene.Group.prototype.getLayout = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.Group.prototype.notify = function(){};
    /**
     * Updates layout(s)
     * @param {Array<geotoolkit.scene.Node>} [targets] optional parameter about which element to layout
     * @returns {geotoolkit.scene.Group} this
     * @fires geotoolkit.layout.Events~LayoutUpdated
     */
    geotoolkit.scene.Group.prototype.updateLayout = function(targets){};
    /**
     * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.invalidateLayout = function(){};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.Group} src Source to copy from
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.scene.Group.prototype.copyConstructor = function(src){};
    /**
     * Return true if the representation is flipped vertically
     *
     * @returns {boolean} flip
     */
    geotoolkit.scene.Group.prototype.isVerticalFlip = function(){};
    /**
     * Set vertical flip of the representation
     *
     * @param {boolean} flip flag to set the vertical flip of the representation
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setVerticalFlip = function(flip){};
    /**
     * Return true if the representation is flipped horizontally
     *
     * @returns {boolean} flip
     */
    geotoolkit.scene.Group.prototype.isHorizontalFlip = function(){};
    /**
     * Set horizontal flip of the representation
     *
     * @param {boolean} enable enable flip
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setHorizontalFlip = function(enable){};
    /**
     * Sets cache to be used to cache
     *
     * @param {geotoolkit.scene.Cache} cache cache to be used
     * @param {boolean} [rebuild=true] rebuild cache
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setCache = function(cache, rebuild){};
    /**
     * Return cache strategy to be used to cache children nodes
     *
     * @returns {geotoolkit.scene.Cache} cache
     */
    geotoolkit.scene.Group.prototype.getCache = function(){};
    /**
     * Clear cache
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.clearCache = function(){};
    /**
     * Dispose node. Clear all listeners
     * and disconnect style to avoid memory
     * leaks
     */
    geotoolkit.scene.Group.prototype.dispose = function(){};
    /**
     * Render node in asynchronous mode. This implementation doesn't support cache for now.
     * @param {geotoolkit.renderer.RenderingContext} context The rendering context to be used to draw the node
     * @param {function} callback callback function
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.scene.Group.prototype.renderAsync = function(context, callback){};
    /**
     * Render group
     *
     * @param {geotoolkit.renderer.RenderingContext} context context to render group
     */
    geotoolkit.scene.Group.prototype.render = function(context){};
    /**
     * Draws a rectangle at the bounding box (in parent coordinates)
     *
     * @protected
     * @param {geotoolkit.renderer.RenderingContext} localContext The local rendering context
     * @param {geotoolkit.util.Rect} [bounds=null] group bounds
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.drawBorder = function(localContext, bounds){};
    /**
     * Return border style
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.scene.Group.prototype.getLineStyle = function(){};
    /**
     * Sets border color
     * Returns this
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {number[]} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Return fill style
     *
     * @returns {geotoolkit.attributes.FillStyle} fillStyle current fill style
     */
    geotoolkit.scene.Group.prototype.getFillStyle = function(){};
    /**
     * Sets fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.scene.Group.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Rebuild node. This method resets state, cache, and invalidate node.
     * @param {boolean} [force=false] optional boolean parameter that can force invalidation
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.rebuild = function(force){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect | object} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setBounds = function(bounds){};
    /**
     * Sets inner model limits
     *
     * @param {geotoolkit.util.Rect} limits inner limits
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setModelLimits = function(limits){};
    /**
     * Get the bounds in the parents model space. If bounds are not set,
     * then parent model limits are used.
     *
     * @returns {geotoolkit.util.Rect | null} current bounds
     */
    geotoolkit.scene.Group.prototype.getBounds = function(){};
    /**
     * Gets model limits, the limits of this groups inside space
     *
     * @returns {geotoolkit.util.Rect | null} the current model limits
     */
    geotoolkit.scene.Group.prototype.getModelLimits = function(){};
    /**
     * Invalidate node
     * @param {geotoolkit.util.Rect} [bounds] optional rectangular area to be invalidated, or force flag if rectangle is empty
     * @param {boolean} [force] optional boolean parameter that can force invalidation
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.invalidate = function(bounds, force){};
    /**
     * Invalidate parent area
     * @param {geotoolkit.util.Rect} [bounds=null] area to invalidate
     * @param {boolean} [force=false] force
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.invalidateParent = function(bounds, force){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.Group.prototype.updateState = function(){};
    /**
     * Return state of suspend state
     * @returns {boolean} state of update
     */
    geotoolkit.scene.Group.prototype.updateSuspended = function(){};
    /**
     * Suspend auto update
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.suspendUpdate = function(){};
    /**
     * Resume auto update
     * @param {boolean} [rebuild=true] force rebuild
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.resumeUpdate = function(rebuild){};
    /**
     * <code>getContentsTransform()</code> retrieves the world transformation
     * of the node.
     *
     * @returns {geotoolkit.util.Transformation} transformation from model coordinates
     * to bounds of the group
     */
    geotoolkit.scene.Group.prototype.getContentsTransform = function(){};
    /**
     * Set Model Limits Logics to use when no Model Limits have been set
     * set to true: will use parents width and height, starting at 0
     * set to false: will use parents bounds. This is convenient method. It
     * creates @see {geotoolkit.scene.AutoModelLimitsStrategy}
     * @param {boolean} mode Model Limits Logics to be used
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setAutoModelLimitsMode = function(mode){};
    /**
     * Set Model Limits Logics Strategy
     * @param {geotoolkit.scene.ModelLimitsStrategy} strategy Model Limits logic strategy to use
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setAutoModelLimitsStrategy = function(strategy){};
    /**
     * Get Model Limits Logics Strategy
     * @returns {geotoolkit.scene.ModelLimitsStrategy} strategy
     */
    geotoolkit.scene.Group.prototype.getAutoModelLimitsStrategy = function(){};
    /**
     * Get Model Limits Logics to use when no Model Limits have been set
     * set to true: will use parents width and height, starting at 0
     * set to false: will use parents bounds
     * @returns {boolean} mode
     */
    geotoolkit.scene.Group.prototype.getAutoModelLimitsMode = function(){};
    /**
     * Returns if picking children is enabled or not for this node.
     *
     * @returns {boolean} pickingChildren
     */
    geotoolkit.scene.Group.prototype.isPickingChildrenEnabled = function(){};
    /**
     * Enables or disables picking children
     *
     * @param {boolean} enable enable picking children
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.enablePickingChildren = function(enable){};
    /**
     * Sets padding style
     * @param {geotoolkit.attributes.SpaceStyle|object} paddingStyle padding style
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.scene.Group.prototype.setPaddingStyle = function(paddingStyle){};
    /**
     * Return padding style
     * @returns {?geotoolkit.attributes.SpaceStyle} padding
     */
    geotoolkit.scene.Group.prototype.getPaddingStyle = function(){};
    /**
     * Return area without paddings. Model limits are
     * mapped to content area, where children are layout.
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.Group.prototype.getContentsArea = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.scene.Group.setProperties}
     */
    geotoolkit.scene.Group.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.util.Rect} [properties.bounds] bounds of the group
     * @param {geotoolkit.util.Rect} [properties.limits] modellimits of the group
     * @param {boolean} [properties.verticalflip] vertical flip of the group
     * @param {boolean} [properties.horizontalflip] horizontal flip of the group
     * @param {boolean} [properties.pickingchildren] enable picking children
     * @param {geotoolkit.attributes.LineStyle|object} [properties.linestyle] line style
     * @param {geotoolkit.attributes.FillStyle|object} [properties.fillstyle] fill style
     * @param {geotoolkit.layout.LayoutStyle|object} [properties.layoutstyle] layout style
     * @param {geotoolkit.layout.Layout} [properties.layout] layout to be set
     * @param {geotoolkit.attributes.FillStyle|object} [properties.backgroundfillstyle] deprecated (since 2.3) use [properties.fillstyle] instead
     * @param {object|geotoolkit.attributes.SpaceStyle} [properties.padding] It has properties for specifying the padding for each side. See {@link geotoolkit.attributes.SpaceStyle#setProperties}
     * @returns {geotoolkit.scene.Group} this
     */
    geotoolkit.scene.Group.prototype.setProperties = function(properties){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.Group.prototype.removeChild = function(){};

/**
 * Abstraction to calculate auto model limits
 *
 * @class geotoolkit.scene.ModelLimitsStrategy
 */
geotoolkit.scene.ModelLimitsStrategy = {};
    /**
     * Adjusts model limits
     * @function
     * @abstract
     * @param {geotoolkit.scene.Group} model model
     * @param {geotoolkit.util.Rect} modelLimits model limits
     * @returns {geotoolkit.util.Rect} adjusted model limits
     */
    geotoolkit.scene.ModelLimitsStrategy.prototype.adjustModelLimits = function(model, modelLimits){};

/**
* Synchronize model limits with bounds in horizontal or/and vertical direction

* @class geotoolkit.scene.AutoModelLimitsStrategy
* @augments geotoolkit.scene.ModelLimitsStrategy
* @param {object} [options] options
* @param {boolean} [options.horizontalDirection=false] flag to set synchronization with bounds in horizontal direction
* @param {boolean} [options.verticalDirection=true] flag to set synchronization with bounds in vertical direction
*/
geotoolkit.scene.AutoModelLimitsStrategy = {};
    /**
     * Adjusts model limits
     * @param {geotoolkit.scene.Group} model model
     * @param {geotoolkit.util.Rect} modelLimits model limits
     * @returns {geotoolkit.util.Rect} adjusted model limits
     */
    geotoolkit.scene.AutoModelLimitsStrategy.prototype.adjustModelLimits = function(model, modelLimits){};

/**
 * Implements node with four annotations by default (west, north, east and south)
 *
 * @class geotoolkit.scene.AnnotatedNode
 * @augments geotoolkit.scene.Group
 * @param {object} [model]
 * @param {geotoolkit.scene.Group} [model.model] the model to display
 * @param {geotoolkit.util.Rect} [model.bounds] the bounds to use
 * @param {Array.<geotoolkit.scene.Node> | geotoolkit.scene.Node} [model.north] the Array of geotoolkit.scene.Node to display on top of the model
 * @param {Array.<geotoolkit.scene.Node> | geotoolkit.scene.Node} [model.south] the Array of geotoolkit.scene.Node to display on bottom of the model
 * @param {Array.<geotoolkit.scene.Node> | geotoolkit.scene.Node} [model.west] the Array of geotoolkit.scene.Node to display on left of the model
 * @param {Array.<geotoolkit.scene.Node> | geotoolkit.scene.Node} [model.east] the Array of geotoolkit.scene.Node to display on right of the model
 * @param {Array.<geotoolkit.scene.Node> | geotoolkit.scene.Node} [model.northwest] the Array of geotoolkit.scene.Node to display on northwest corner of the model
 * @param {Array.<geotoolkit.scene.Node> | geotoolkit.scene.Node} [model.northeast] the Array of geotoolkit.scene.Node to display on northeast corner of the model
 * @param {Array.<geotoolkit.scene.Node> | geotoolkit.scene.Node} [model.southwest] the Array of geotoolkit.scene.Node to display on southwest corner of the model
 * @param {Array.<geotoolkit.scene.Node> | geotoolkit.scene.Node} [model.southeast] the Array of geotoolkit.scene.Node to display on southeast corner of the model
 * @param {boolean} [model.keepvisiblelimits=true] keep visible model limits of the center part if size of the node is changed
 * @param {boolean} [model.isdatamodel=true] is the model passed via first parameter the data model
 * @param {boolean} [model.annotationitemswrap=true] wrap annotation items in constructor with a new group with zero to one limits
 * @example
 * this._plotControl = new geotoolkit.scene.AnnotatedNode({
 * 'model': this._model,
 * 'bounds': new geotoolkit.util.Rect(clientArea),
 * 'north': [titleNorth, groupLegend],
 * 'west': [titleWest1, axisWest1, titleWest2, axisWest2],
 * 'east': [axisEast1, titleEast1, axisEast2, titleEast2]
 * });
 * A handler that listens to the bounds and tranformation change events
 * can be attached to this node by using the following method:
 * @example
 * this.annotationNode.on(geotoolkit.scene.AnnotatedNode.Events.Updating, this.onAnnotationNodeUpdated.bind(this));
 */
geotoolkit.scene.AnnotatedNode = {};
    /**
     * AnnotatedNode's Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.scene.AnnotatedNode.Events = {};
        /**
         * Event type fired when the shape is updating
         * @type {string}
         */
        geotoolkit.scene.AnnotatedNode.Events.Updating = "";
    /**
     * Sets layout, not supported in this class
     * @param {geotoolkit.layout.Layout} layout layout
     * @throws {Error} The operation is NOT allowed on AnnotatedNode
     */
    geotoolkit.scene.AnnotatedNode.prototype.setLayout = function(layout){};
    /**
     * get Annotation at given point
     * @param {number} x x coordinate in parent domain coordinates
     * @param {number} y y coordinate in parent domain coordinates
     * @returns {geotoolkit.scene.Group} annotation
     */
    geotoolkit.scene.AnnotatedNode.prototype.getAnnotationAt = function(x, y){};
    /**
     * get Annotation Location at given point
     * @param {number} x x coordinate in parent domain coordinates
     * @param {number} y y coordinate in parent domain coordinates
     * @returns {geotoolkit.layout.AnnotationLocation} location
     */
    geotoolkit.scene.AnnotatedNode.prototype.getAnnotationLocationAt = function(x, y){};
    /**
     * Gets center plot
     * @returns {geotoolkit.scene.Group} center plot
     */
    geotoolkit.scene.AnnotatedNode.prototype.getCenterPlot = function(){};
    /**
     * Gets annotation at specified location
     * @param {geotoolkit.layout.AnnotationLocation} location Enum of annotation locations used to specify direction to insert
     * @returns {?geotoolkit.scene.Group}
     */
    geotoolkit.scene.AnnotatedNode.prototype.getAnnotation = function(location){};
    /**
     * Helper method to add group to the annotation and layout at specified location
     * @param {geotoolkit.scene.Group} item group to be inserted in the annotated node
     * @param {geotoolkit.layout.AnnotationLocation} location Enum of annotation locations used to specify direction to insert
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.addItem = function(item, location){};
    /**
     * Helper method to insert group to the annotation and it layout at specified location
     * @param {number} index index where to item to be inserted
     * @param {geotoolkit.scene.Group} item group to be inserted in the annotated node
     * @param {geotoolkit.layout.AnnotationLocation} location Enum of annotation locations used to specify direction to insert
     * @throws {Error} if annotation doesn't have layout or annotation is not exist
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.insertItem = function(index, item, location){};
    /**
     * Helper method to remove group from the annotation and it layout at specified location
     * @param {geotoolkit.scene.Group} item group to be inserted in the annotated node
     * @param {geotoolkit.layout.AnnotationLocation} location Enum of annotation locations used to specify direction to insert
     * @throws {Error} if annotation doesn't have layout
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.removeItem = function(item, location){};
    /**
     * Synchronizes object with a model
     *
     * @param {geotoolkit.scene.Group | geotoolkit.axis.Axis} object object to connect to the central component
     * @param {geotoolkit.scene.Group} [model] source model
     * @param {geotoolkit.util.Orientation} [orientation] model orientation
     * @param {boolean} [autoSize] true if object and model share the same device size in the orientation, true by default if not specified
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.connect = function(object, model, orientation, autoSize){};
    /**
     * Disconnect an object from its source model
     *
     * @param {geotoolkit.scene.Group | geotoolkit.axis.Axis} object object to disconnect
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.disconnect = function(object){};
    /**
     * Gets data model
     * @returns {geotoolkit.scene.Group} data model
     */
    geotoolkit.scene.AnnotatedNode.prototype.getModel = function(){};
    /**
     * Sets data model
     * @param {geotoolkit.scene.Group} model data model
     * @param {boolean} [keepvisiblelimits=true] keep visible model limits of the center part
     * @param {boolean} [isdatamodel=true] is the model passed the data model?
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.setModel = function(model, keepvisiblelimits, isdatamodel){};
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
     * @param {geotoolkit.scene.ScaleScrollStrategy | function() } scaleScrollStrategy scaleScrollStrategy to set
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.setScaleScrollStrategy = function(scaleScrollStrategy){};
    /**
     * Gets ScaleScrollStrategy ("undefined" by default)
     * @returns {geotoolkit.scene.ScaleScrollStrategy | function() } ScaleScrollStrategy
     * (see "setScaleScrollStrategy" description for more info)
     */
    geotoolkit.scene.AnnotatedNode.prototype.getScaleScrollStrategy = function(){};
    /**
     * Attempts to set local transformation for the model.
     * NOTE: the local transformation set may not be equal
     * to tranformation passed - it depends on current
     * ScaleScrollStrategy set on the node.
     * @param {geotoolkit.util.Transformation} transformation transformation to set
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.setModelTransformation = function(transformation){};
    /**
     * Attempts to translate the model using specified "dx" and "dy" pixels.
     * @param {number} dx in pixels
     * @param {number} dy in pixels
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.translateModel = function(dx, dy){};
    /**
     * Attempts to scale the model using specified x and y scale factors
     * relative to {posX, posY} provided.
     * NOTE: the local transformation set may not be equal
     * to transformation passed - it depends on current
     * ScaleScrollStrategy set on the node.
     * @param {number} fX x scaling factor
     * @param {number} fY y scaling factor
     * @param {number} [posX] x position to scale from (in pxl)
     * @param {number} [posY] y position to scale from (in pxl)
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.scaleModel = function(fX, fY, posX, posY){};
    /**
     * Attempts to set model's visible limits to specified limits.
     * NOTE: the limits set may not be equal
     * to the limit passed - it depends on current
     * ScaleScrollStrategy set on the node.
     * @param {geotoolkit.util.Rect} newVisibleModelLimits limits to set
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.setVisibleModelLimits = function(newVisibleModelLimits){};
    /**
     * Updates underlying layout
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.updateLayout = function(){};
    /**
     * Suspends layout update.
     * @returns {geotoolkit.scene.AnnotatedNode}
     */
    geotoolkit.scene.AnnotatedNode.prototype.suspendUpdateLayout = function(){};
    /**
     * Resumes layout update.
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.resumeUpdateLayout = function(){};
    /**
     * Sets bounds of the node in its parent's coordinate system
     *
     * @param {geotoolkit.util.Rect} bounds bound of the node to set
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.setBounds = function(bounds){};
    /**
     * Update model limits and transform of all connected objects
     *
     * @returns {geotoolkit.scene.AnnotatedNode} this
     */
    geotoolkit.scene.AnnotatedNode.prototype.updateConnectedObjects = function(){};
    /**
     * This method creates an axis, put it in the
     * new group, add this group to annotated node and returns the axis and group
     * @param {geotoolkit.scene.AnnotatedNode} annotatednode node to add axis
     * @param {object} [options] options
     * @param {geotoolkit.layout.AnnotationLocation} [options.location = geotoolkit.layout.AnnotationLocation.South] location of the axis
     * @param {geotoolkit.axis.TickGenerator} [options.tickgenerator] optional tick generator (by default geotoolkit.axis.AdaptiveTickGenerator is used)
     * @param {boolean} [options.connect=true] connect axis to the center model
     * @param {boolean} [options.autolabelrotation] auto label rotation {@link geotoolkit.axis.Axis.prototype.setAutoLabelRotation}
     * @param {number} [options.autolabelrotationangle] auto label rotation {@link geotoolkit.axis.Axis.prototype.setAutoLabelRotationAngle}
     * @param {object|string} [options.title=null] title properties {@link geotoolkit.axis.Axis.prototype.setTitle}
     * @returns {object} { "axis": {geotoolkit.axis.Axis}, "group": {geotoolkit.scene.Group} )
     */
    geotoolkit.scene.AnnotatedNode.createAxis = function(annotatednode, options){};
    /**
     * This method creates text title, put it in the
     * new group, add this group to annotated node
     * and return the title and group
     * @param {geotoolkit.scene.AnnotatedNode} annotatednode node to add title
     * @param {object} options options
     * @param {string} [options.text] text to display int eh title
     * @param {geotoolkit.layout.AnnotationLocation} [options.location = AnnotationLocation.South] location of the axis
     * @param {object | geotoolkit.attributes.TextStyle} [options.textstyle = null] title text style
     * @returns {object} { "text": {geotoolkit.scene.shapes.Text}, "group": {geotoolkit.scene.Group} )
     */
    geotoolkit.scene.AnnotatedNode.createTitle = function(annotatednode, options){};

/**
 * Filter nodes based on range of scale factor
 * @class geotoolkit.scene.filters.ScaleRange
 * @implements geotoolkit.renderer.IFilter
 *
 * @param {object} [options] options
 * @param {number} [options.minscale] minimal scale
 * @param {number} [options.maxscale] maximal scale
 * @param {number} [options.minscaleinclusive=true] minimal scale is inclusive
 * @param {number} [options.maxscaleinclusive=true] maximal scale is inclusive
 */
geotoolkit.scene.filters.ScaleRange = {};
    /**
     * Filters node based on scale range provided
     * @param {geotoolkit.scene.Node} node to apply filter to
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {boolean} flag filter flag ("true" to render layer; "false" otherwise)
     */
    geotoolkit.scene.filters.ScaleRange.prototype.filter = function(node, context){};
    /**
     * Gets options
     * @returns {object} options options
     */
    geotoolkit.scene.filters.ScaleRange.prototype.getOptions = function(){};
    /**
     * Sets options
     * @param {object} [options] options
     * @param {number} [options.minscale] minimal scale
     * @param {number} [options.maxscale] maximal scale
     * @returns {geotoolkit.scene.filters.ScaleRange} this
     */
    geotoolkit.scene.filters.ScaleRange.prototype.setOptions = function(options){};
    /**
     * Begin filtering
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {geotoolkit.scene.filters.ScaleRange}
     */
    geotoolkit.scene.filters.ScaleRange.prototype.begin = function(context){};
    /**
     * End filtering
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {geotoolkit.scene.filters.ScaleRange}
     */
    geotoolkit.scene.filters.ScaleRange.prototype.end = function(context){};

/**
 * Define a composite filter to apply a several filters
 * @class geotoolkit.scene.filters.Composite
 * @implements geotoolkit.renderer.IFilter
 *
 * @param {geotoolkit.renderer.IFilter[]} [filters] an array of filters
 */
geotoolkit.scene.filters.Composite = {};
    /**
     * Add filter to be applied
     * @param {geotoolkit.renderer.IFilter} filter filter to add
     * @returns {geotoolkit.scene.filters.Composite}
     */
    geotoolkit.scene.filters.Composite.prototype.addFilter = function(filter){};
    /**
     * Remove an instance of the filter
     * @param {geotoolkit.renderer.IFilter} filter filter to remove
     * @returns {geotoolkit.scene.filters.Composite}
     */
    geotoolkit.scene.filters.Composite.prototype.removeFilter = function(filter){};
    /**
     * Filters node based on an array of filters
     * @param {geotoolkit.scene.Node} node to apply filter to
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {boolean} flag filter flag ("true" to render layer; "false" otherwise)
     */
    geotoolkit.scene.filters.Composite.prototype.filter = function(node, context){};
    /**
     * Begin filtering
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {geotoolkit.scene.filters.Composite}
     */
    geotoolkit.scene.filters.Composite.prototype.begin = function(context){};
    /**
     * End filtering
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {geotoolkit.scene.filters.Composite}
     */
    geotoolkit.scene.filters.Composite.prototype.end = function(context){};

/**
 * Define a simple filter based on array
 * @class geotoolkit.scene.filters.InArray
 * @implements geotoolkit.renderer.IFilter
 *
 * @param {Array} [array] array
 */
geotoolkit.scene.filters.InArray = {};
    /**
     * Set array to be used
     * @param {Array} array array
     * @returns {geotoolkit.scene.filters.InArray}
     */
    geotoolkit.scene.filters.InArray.prototype.setArray = function(array){};
    /**
     * Get array to be used
     * @returns {geotoolkit.scene.filters.InArray}
     */
    geotoolkit.scene.filters.InArray.prototype.getArray = function(){};
    /**
     * Filters node based on array
     * @param {geotoolkit.scene.Node} node to apply filter to
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {boolean} flag filter flag ("true" to render node; "false" otherwise)
     */
    geotoolkit.scene.filters.InArray.prototype.filter = function(node, context){};
    /**
     * Begin filtering
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {geotoolkit.scene.filters.InArray}
     */
    geotoolkit.scene.filters.InArray.prototype.begin = function(context){};
    /**
     * End filtering
     * @param {geotoolkit.renderer.RenderingContext} [context] rendering context
     * @returns {geotoolkit.scene.filters.InArray}
     */
    geotoolkit.scene.filters.InArray.prototype.end = function(context){};

/**
 * Defines a cache strategy to prerender composite node's children in a set of tiles,
 * which have a raster format. For example, it can be an image or texture. The format
 * depends on rendering engine.
 *
 * @class geotoolkit.scene.ViewCache
 * @augments geotoolkit.scene.Cache
 * @param {object|number} [tileWidth=256] tile width in device coordinates
 * @param {number} [tileWidth.tileWidth=256] tile width in device coordinates
 * @param {number} [tileWidth.tileHeight=256] tile height in device coordinates
 * @param {geotoolkit.scene.Cache.CacheMode} [tileWidth.mode=Shared] Shared mode by default
 * @param {number} [tileWidth.memoryLimit] Upper memory limit in Megabyte, ignored when in Shared mode
 * use geotoolkit.scene.TileResourceManager.getInstance().setMemoryLimit() to set memory limit in Shared mode
 * @param {boolean} [tileWidth.async=false] true if actions are performed asynchronously
 * @param {boolean} [tileWidth.keepalive=false] keep alive strategy, keeps tiles alive when rebuild as mach as possible
 * @param {number} [tileHeight=256] tile height in device coordinates
 * @param {geotoolkit.scene.Cache.CacheMode} [mode] Shared mode by default
 * @param {number} [memoryLimit] memoryLimit Upper memory limit in Megabyte, ignored when in Shared mode
 * use geotoolkit.scene.TileResourceManager.getInstance().setMemoryLimit() to set memory limit in Shared mode
 * @param {boolean} [async=false] true if actions are performed asynchronously
 */
geotoolkit.scene.ViewCache = {};
    /**
     * Set extend
     * @param {geotoolkit.util.Dimension} extend overlap between 2 tiles
     * @returns {geotoolkit.scene.ViewCache} this
     */
    geotoolkit.scene.ViewCache.prototype.setExtend = function(extend){};
    /**
     * Set keep alive strategy, keep tiles alive when rebuild as mach as possible
     * @param {boolean} keepAlive flag
     * @returns {geotoolkit.scene.ViewCache}
     */
    geotoolkit.scene.ViewCache.prototype.setKeepAlive = function(keepAlive){};
    /**
     * When this is set to true will essentially freeze the cache - tiles will no longer be created, existing tiles will be used and scaled to fit the visible bounds
     * if tiles do not exist for a particular area nothing will be rendered.
     *
     * @param {boolean} stop flag to freeze the cache
     * @returns {geotoolkit.scene.ViewCache} this
     */
    geotoolkit.scene.ViewCache.prototype.setStopCreationOrUpdate = function(stop){};
    /**
     * Returns flag which freezes the cache.
     * @returns {boolean} stop
     */
    geotoolkit.scene.ViewCache.prototype.getStopCreationOrUpdate = function(){};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.ViewCache} src Source to copy from
     */
    geotoolkit.scene.ViewCache.prototype.copyConstructor = function(src){};
    /**
     * Sets cache owner.
     * @param {geotoolkit.scene.Node} owner node which should be cached
     * @returns {geotoolkit.scene.ViewCache} this
     */
    geotoolkit.scene.ViewCache.prototype.setOwner = function(owner){};
    /**
     * Returns cache owner.
     * @returns {?geotoolkit.scene.Node} owner this cache's owner
     */
    geotoolkit.scene.ViewCache.prototype.getOwner = function(){};
    /**
     * @override
     */
    geotoolkit.scene.ViewCache.prototype.getResourceManager = function(){};
    /**
     * Returns tile width.
     * @returns {number} width
     */
    geotoolkit.scene.ViewCache.prototype.getTileWidth = function(){};
    /**
     * Returns tile height.
     * @returns {number} height
     */
    geotoolkit.scene.ViewCache.prototype.getTileHeight = function(){};
    /**
     * Render to context. Will only render tiles within visible model limits.
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.scene.ViewCache.prototype.render = function(context){};
    /**
     * Sets render content.
     * @override
     * @param {function} renderContentDelegate external method to render tiles
     * @returns {geotoolkit.scene.ViewCache} this
     */
    geotoolkit.scene.ViewCache.prototype.setRenderContent = function(renderContentDelegate){};
    /**
     * Invalidates cache. Marks cache to be rendered.
     * @override
     * @param {geotoolkit.util.Rect} [bounds] rectangular area to be invalidated
     */
    geotoolkit.scene.ViewCache.prototype.invalidate = function(bounds){};
    /**
     * Stops all asynchronous rendering processes (if existed)
     * @returns {geotoolkit.scene.ViewCache} this
     */
    geotoolkit.scene.ViewCache.prototype.stopRenderAsync = function(){};
    /**
     * Checks if cache is asynchronous
     * @returns {boolean}
     */
    geotoolkit.scene.ViewCache.prototype.isAsync = function(){};
    /**
     * Sets asynchrony of the cache
     * @param {boolean} [bool] true if cache should be asynchronous
     * @returns {geotoolkit.scene.ViewCache} this
     */
    geotoolkit.scene.ViewCache.prototype.setAsync = function(bool){};
    /**
     * Flags the ViewCache as needing a clear / rebuild.
     * Called after zooming or when we've hit the cap for number of images
     * @override
     * @param {boolean} [force=false] force flag
     * @returns {geotoolkit.scene.ViewCache} this
     */
    geotoolkit.scene.ViewCache.prototype.rebuild = function(force){};

/**
 * Keeps handles to HTML Canvas objects so they can be re-used
 *
 * @class geotoolkit.scene.TileResourceManager
 * @param {number} memoryLimit Upper memory limit in Megabyte
 */
geotoolkit.scene.TileResourceManager = {};
    /**
     * Returns upper memory limit
     *
     * @returns {number} Memory limit in MB
     */
    geotoolkit.scene.TileResourceManager.prototype.getMemoryLimit = function(){};
    /**
     * Sets upper memory limit
     *
     * @param {number} memoryLimit in MB
     * @returns {geotoolkit.scene.TileResourceManager} this
     */
    geotoolkit.scene.TileResourceManager.prototype.setMemoryLimit = function(memoryLimit){};
    /**
     * Access surface. This function should be called whenever the surface has been drawn.
     *
     * @param {geotoolkit.renderer.Surface} surface surface to be released
     */
    geotoolkit.scene.TileResourceManager.prototype.accessSurface = function(surface){};
    /**
     * Returns TileResourceManager instance
     *
     * @returns {geotoolkit.scene.TileResourceManager} manager
     */
    geotoolkit.scene.TileResourceManager.getInstance = function(){};

/**
 * Utility class to export nodes of various types for PDF output.
 *
 * @class geotoolkit.scene.exports.NodeExport
 */
geotoolkit.scene.exports.NodeExport = {};
    /**
     * Exports node to image.
     *
     * @param {geotoolkit.scene.Node | object} node node to be exported
     * @param {number} [imageWidth] width
     * @param {number} [imageHeight] height
     * @param {boolean} horizontalFlip flag to set horizontal flip
     * @param {boolean} verticalFlip flag to set vertical flip
     * @param {geotoolkit.util.Rect} [modelLimits] model limits
     * @param {function()} [handler] called when image is ready
     * @returns {HTMLElement} image
     */
    geotoolkit.scene.exports.NodeExport.exportToImage = function(node, imageWidth, imageHeight, horizontalFlip, verticalFlip, modelLimits, handler){};
    /**
     * Exports node imageUrl
     *
     * @param {geotoolkit.scene.Node | object} node node
     * @param {number} [imageWidth] width
     * @param {number} [imageHeight] height
     * @param {boolean} horizontalFlip flag to set horizontal flip
     * @param {boolean} verticalFlip flag to set vertical flip
     * @param {geotoolkit.util.Rect} [modelLimits] model limits. if it is not specified then node model limits is used.
     * @returns {string} 64bit encoded url for the rendered image
     */
    geotoolkit.scene.exports.NodeExport.exportToImageUrl = function(node, imageWidth, imageHeight, horizontalFlip, verticalFlip, modelLimits){};
    /**
     * Export to surface
     *
     * @param {geotoolkit.scene.Node} node node to export
     * @param {number} imageWidth image width
     * @param {number} imageHeight image height
     * @param {boolean} horizontalFlip flag to set horizontal flip
     * @param {boolean} verticalFlip flag to set vertical flip
     * @param {geotoolkit.util.Rect} [modelLimits] model limits. model limits. if it is not specified then node model limits is used.
     * @returns {geotoolkit.renderer.Surface} canvas
     */
    geotoolkit.scene.exports.NodeExport.exportToSurface = function(node, imageWidth, imageHeight, horizontalFlip, verticalFlip, modelLimits){};
    /**
     * Export the node using a given context.
     * This will separate the scene into pages using print settings, header and footer information
     *
     * @param {geotoolkit.renderer.DocumentRenderingContext} context rendering context
     * @param {geotoolkit.scene.exports.Document} document Document class representing a pdf document
     * @param {Object} printSettings print settings
     */
    geotoolkit.scene.exports.NodeExport.render = function(context, document, printSettings){};
    /**
     * Compute page settings
     *
     * @param {geotoolkit.scene.exports.Document} document
     * @param {object} printSettings
     * @param {boolean} drawWestToEast
     *
     * @returns {?object} pageSettings :
     * @returns {?number} pageSettings.X :
     * the number of X pages ( horizontal )
     * @returns {?number} pageSettings.Y :
     * the number of Y pages ( vertical )
     * @returns {?object} pageSettings.ScaleFactor :
     * @returns {?number} pageSettings.ScaleFactor.X :
     * scale sX
     * @returns {?number} pageSettings.ScaleFactor.Y :
     * scale sY
     * @returns {?object} pageSettings.PageSpace :
     * page size in pixel unit
     * @returns {?number} pageSettings.PageSpace.X :
     * page width without margin west and east
     * @returns {?number} pageSettings.PageSpace.Y :
     * page height without margin north and south
     * @returns {?geotoolkit.scene.exports.PaperFormat} pageSettings.Page :
     * page format
     * @returns {?object} pageSettings.Margin :
     * margin object
     * @returns {?number} pageSettings.Margin.Top :
     * top margin
     * @returns {?number} pageSettings.Margin.Bottom :
     * bottom margin
     * @returns {?number} pageSettings.Margin.Left :
     * left margin
     * @returns {?number} pageSettings.Margin.Right :
     * right margin
     * @returns {?boolean} pageSettings.Continuous :
     * is page continuous
     * @returns {?geotoolkit.util.Dimension} FixedDimension :
     * the fixed dimension
     * @returns {?object} ScaledDimension :
     * the scaled dimension
     */
    geotoolkit.scene.exports.NodeExport.computeDocumentSettings = function(document, printSettings, drawWestToEast){};
    /**
     *
     * @protected
     * @param {geotoolkit.scene.exports.Document} document Document class representing a pdf document
     * @param {object} docSettings
     * @param {geotoolkit.scene.exports.PageElement} header
     * @param {geotoolkit.scene.exports.PageElement} footer
     * @param {geotoolkit.util.AbstractUnit} pixelUnit unit
     * @param {geotoolkit.util.AbstractUnit} outputUnit device unit
     * @returns {?Array}
     */
    geotoolkit.scene.exports.NodeExport.computeElementsSizeInPages = function(document, docSettings, header, footer, pixelUnit, outputUnit){};

/**
 * Utility class used to create page component such as header and footer in a document. Used in PDF output.
 *
 * @class geotoolkit.scene.exports.PageElement
 * @param {number} width
 * width of the component
 * @param {number} height
 * height of the component
 * */
geotoolkit.scene.exports.PageElement = {};
    /**
     * draw component
     *
     * @function
     * @param {geotoolkit.renderer.RenderingContext} context RenderingContext
     * @param {object} [pageInfo] optional-contains all data about the pdf page
     */
    geotoolkit.scene.exports.PageElement.prototype.render = function(context, pageInfo){};
    /**
     * get the defaultSize of the component
     *
     * @returns {geotoolkit.util.Dimension} dimension
     */
    geotoolkit.scene.exports.PageElement.prototype.getDefaultSize = function(){};
    /**
     * get the maximum size of the component
     *
     * @returns {geotoolkit.util.Dimension} dimension
     */
    geotoolkit.scene.exports.PageElement.prototype.getMaximumSize = function(){};

/**
 * Footer Component that print the page number of the document, and any additional data
 *
 * @class geotoolkit.scene.exports.FooterComponent
 * @augments geotoolkit.scene.exports.PageElement
 * @param {number} width paper width
 * @param {number} height paper height
 * @param {string} textStyle text style
 */
geotoolkit.scene.exports.FooterComponent = {};
    /**
     * render the footer
     *
     * @param {geotoolkit.renderer.DocumentRenderingContext} context PdfRenderingContext
     * @param {object} [pageInfo] JSON Object
     * @param {Object} [pageInfo.Margin] JSON Object
     * @param {number} [pageInfo.Margin.Top] Top margin
     * @param {number} [pageInfo.Margin.Bottom] Bottom margin
     * @param {number} [pageInfo.Margin.Left] Left margin
     * @param {number} [pageInfo.Margin.Right] Right margin
     * @param {geotoolkit.scene.exports.AbstractPaperFormat} [pageInfo.Page]
     * @param {number} [pageInfo.currentPage]
     * @param {number} [pageInfo.numberPage]
     * @param {Date} [pageInfo.date]
     * @param {string} [pageInfo.title]
     */
    geotoolkit.scene.exports.FooterComponent.prototype.render = function(context, pageInfo){};

/**
 * Header Component that print the title and the date of the pdf document
 *
 * @class geotoolkit.scene.exports.HeaderComponent
 * @augments geotoolkit.scene.exports.PageElement
 * @param {number} width
 * @param {number} height
 * @param {string} title
 * @param {Date} date
 * @param {string} textStyle
 */
geotoolkit.scene.exports.HeaderComponent = {};
    /**
     * print title and date in the context
     *
     * @param {geotoolkit.renderer.DocumentRenderingContext} context PdfRenderingContext
     * @param {object} [pageInfo] JSON Object
     * @param {Object} [pageInfo.Margin] JSON Object
     * @param {number} [pageInfo.Margin.Top] Top margin
     * @param {number} [pageInfo.Margin.Bottom] Bottom margin
     * @param {number} [pageInfo.Margin.Left] Left margin
     * @param {number} [pageInfo.Margin.Right] Right margin
     * @param {geotoolkit.scene.exports.AbstractPaperFormat} [pageInfo.Page]
     * @param {number} [pageInfo.currentPage]
     * @param {number} [pageInfo.numberPage]
     * @param {Date} [pageInfo.date]
     * @param {string} [pageInfo.title]
     */
    geotoolkit.scene.exports.HeaderComponent.prototype.render = function(context, pageInfo){};
    /**
     * get title
     * @returns {string} title
     */
    geotoolkit.scene.exports.HeaderComponent.prototype.getTitle = function(){};
    /**
     * get date
     * @returns {Date} date
     */
    geotoolkit.scene.exports.HeaderComponent.prototype.getDate = function(){};

/**
 * Abstract parent class used for PDF output.
 *
 * @class geotoolkit.scene.exports.AbstractDocumentElement
 */
geotoolkit.scene.exports.AbstractDocumentElement = {};
    /**
     * Compute the dimension in the layout, this dimension is described by a fixed dimension and a scaled dimension
     * @function
     * @returns {Object} layoutedDimension
     * that contains two objects
     * fixed : {geotoolkit.util.Dimension}
     * scaled : {geotoolkit.util.Dimension}
     */
    geotoolkit.scene.exports.AbstractDocumentElement.prototype.getLayoutedDimension = function(){};
    /**
     * render the document in the context
     * @function
     * @abstract
     * @param {geotoolkit.renderer.DocumentRenderingContext} context rendering context
     * @param {geotoolkit.util.Point} position position of current document element relative to the parent document
     */
    geotoolkit.scene.exports.AbstractDocumentElement.prototype.render = function(context, position){};
    /**
     * Render document in asynchronous mode. Default implementation creates call method "render" inside
     * @function
     * @param {geotoolkit.renderer.DocumentRenderingContext} context rendering context
     * @param {geotoolkit.util.Point} position position of current document element relative to the parent document
     * @param {function} callback callback function
     */
    geotoolkit.scene.exports.AbstractDocumentElement.prototype.renderAsync = function(context, position, callback){};
    /**
     * Used to restore object's state after exporting
     */
    geotoolkit.scene.exports.AbstractDocumentElement.prototype.endExport = function(){};
    /**
     * Used to prepare object before exporting
     */
    geotoolkit.scene.exports.AbstractDocumentElement.prototype.beginExport = function(){};
    /**
     * Set the document bounds
     * @function
     * @abstract
     * @param {geotoolkit.util.Rect} [rect] document bounds
     */
    geotoolkit.scene.exports.AbstractDocumentElement.prototype.updateLayout = function(rect){};
    /**
     * set the document scale depending of the parameters isScaledVertically and isScaledHorizontally
     * @function
     * @abstract
     * @param {number} sx scale factor in x direction
     * @param {number} sy scale factor in y direction
     * @returns {geotoolkit.scene.exports.AbstractDocumentElement} this
     */
    geotoolkit.scene.exports.AbstractDocumentElement.prototype.setScale = function(sx, sy){};
    /**
     * set the document translation
     * @function
     * @abstract
     * @param {number} x offset x coordinate
     * @param {number} y offset y coordinate
     * @returns {geotoolkit.scene.exports.AbstractDocumentElement} this
     */
    geotoolkit.scene.exports.AbstractDocumentElement.prototype.setTranslation = function(x, y){};

/**
 * Document Element class that is used to layout the pdf document
 *
 * @class geotoolkit.scene.exports.NodeAdapter
 * @augments geotoolkit.scene.exports.AbstractDocumentElement
 * @implements geotoolkit.layout.ILayoutable
 * @param {geotoolkit.scene.Group} node node
 * @param {geotoolkit.util.Rect} exportLimits export limits in the bounds coordinates
 */
geotoolkit.scene.exports.NodeAdapter = {};
    /**
     * Enum of node adapter scaling options:
     * - TrueScale : 'TrueScale'
     * - PixelScale : 'PixelScale'
     * @enum
     * @readonly
     */
    geotoolkit.scene.exports.NodeAdapter.ScaleMode = {};
        /**
         * True Scale
         * @type {string}
         */
        geotoolkit.scene.exports.NodeAdapter.ScaleMode.TrueScale = "";
        /**
         * Pixel Scale
         * @type {string}
         */
        geotoolkit.scene.exports.NodeAdapter.ScaleMode.PixelScale = "";
    /**
     * Returns node adapter scale mode
     * @returns {geotoolkit.scene.exports.NodeAdapter.ScaleMode} scale mode
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.getScaleMode = function(){};
    /**
     * Set node adapter scale mode
     * @param {geotoolkit.scene.exports.NodeAdapter.ScaleMode} scaleMode scale mode
     * @returns {geotoolkit.scene.exports.NodeAdapter} this
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.setScaleMode = function(scaleMode){};
    /**
     * Sets bounds of the node
     * @param {geotoolkit.util.Rect} bounds bound of the node
     * @returns {geotoolkit.scene.exports.NodeAdapter}
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.setBounds = function(bounds){};
    /**
     * Specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle|object} layoutStyle desired layout style
     * @returns {geotoolkit.scene.exports.NodeAdapter}
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.setLayoutStyle = function(layoutStyle){};
    /**
     * Return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.getLayoutStyle = function(){};
    /**
     * Sets export limits of the node
     * @param {geotoolkit.util.Rect} bounds bound of the node
     * @returns {geotoolkit.scene.exports.NodeAdapter} this
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.setExportLimits = function(bounds){};
    /**
     * Returns export limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.getExportLimits = function(){};
    /**
     * Return bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.getBounds = function(){};
    /**
     * Compute dimensions in the layout, this dimension is described by a fixed dimension and a scaled dimension
     *
     * @returns {?object} layoutedDimension JSON object contains 'fixed' and 'scaled' dimensions
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.getLayoutedDimension = function(){};
    /**
     * get the Element node
     *
     * @returns {geotoolkit.scene.Group} node
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.getNode = function(){};
    /**
     * return local transformation
     * @returns {?geotoolkit.util.Transformation}
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.getLocalTransformation = function(){};
    /**
     * set local transformation
     * @param {geotoolkit.util.Transformation} localTransformation local transformation
     * @returns {geotoolkit.scene.exports.NodeAdapter}
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.setLocalTransformation = function(localTransformation){};
    /**
     * render the document in the context
     *
     * @param {geotoolkit.renderer.DocumentRenderingContext} context rendering context
     * @param {geotoolkit.util.Point} position position of the current document relative to the parent document
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.render = function(context, position){};
    /**
     * render the document in the context
     *
     * @param {geotoolkit.renderer.DocumentRenderingContext} context rendering context
     * @param {geotoolkit.util.Point} position position of the current document relative to the parent document
     * @param {function} callback callback function
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.renderAsync = function(context, position, callback){};
    /**
     * set the document translation
     * @param {number} x offset x
     * @param {number} y offset y
     * @returns {geotoolkit.scene.exports.NodeAdapter} this
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.setTranslation = function(x, y){};
    /**
     * set the document scale depending of the parameters isScaledVertically and isScaledHorizontally
     *
     * @param {number} sx scale factor in x direction
     * @param {number} sy scale factor in y direction
     * @returns {geotoolkit.scene.exports.NodeAdapter} this
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.setScale = function(sx, sy){};
    /**
     * update the layout of the document
     * @param {geotoolkit.util.Rect} rect rect to layout area
     */
    geotoolkit.scene.exports.NodeAdapter.prototype.updateLayout = function(rect){};

/**
 * Define an interface to provide exportable elements.
 * It is used to provide custom layouting for printing and exporting
 * to various graphic formats.
 * @interface
 */
geotoolkit.scene.exports.IExportable = {};
    /**
     * Returns exportable element
     * @function
     * @abstract
     * @param {object} [options]
     * @returns {geotoolkit.scene.exports.AbstractDocumentElement} return exportable element
     */
    geotoolkit.scene.exports.IExportable.prototype.getExportElement = function(options){};
    /**
     * Used to prepare object before exporting
     * @function
     * @abstract
     */
    geotoolkit.scene.exports.IExportable.prototype.beginExport = function(){};
    /**
     * Used to restore object's state after exporting
     * @function
     * @abstract
     */
    geotoolkit.scene.exports.IExportable.prototype.endExport = function(){};

/**
 * Document Element class that is used to layout the pdf document
 *
 * @class geotoolkit.scene.exports.DocumentElement
 * @augments geotoolkit.scene.exports.AbstractDocumentElement
 *
 * @param {geotoolkit.scene.Group} node node
 * @param {boolean} isScaledVertically flag to scale vertically
 * @param {boolean} isScaledHorizontally flag to scale horizontally
 */
geotoolkit.scene.exports.DocumentElement = {};
    /**
     * Compute dimensions in the layout, this dimension is described by a fixed dimension and a scaled dimension
     *
     * @returns {?object} layoutedDimension JSON object contains fixed and scaled dimensions
     */
    geotoolkit.scene.exports.DocumentElement.prototype.getLayoutedDimension = function(){};
    /**
     * get the Element node
     *
     * @returns {geotoolkit.scene.Group} node
     */
    geotoolkit.scene.exports.DocumentElement.prototype.getNode = function(){};
    /**
     * get if the document element is scaled vertically
     *
     * @returns {boolean} isScaledVertically
     */
    geotoolkit.scene.exports.DocumentElement.prototype.isScaledVertically = function(){};
    /**
     * get if the document element is scaled horizontally
     *
     * @returns {boolean} isScaledHorizontally
     */
    geotoolkit.scene.exports.DocumentElement.prototype.isScaledHorizontally = function(){};
    /**
     * render the document in the context
     *
     * @param {geotoolkit.renderer.DocumentRenderingContext} context PdfRendering Context
     * @param {geotoolkit.util.Point} position position of the current document relative to the parent document
     */
    geotoolkit.scene.exports.DocumentElement.prototype.render = function(context, position){};
    /**
     * set the document translation
     * @param {number} x offset x
     * @param {number} y offset y
     * @returns {geotoolkit.scene.exports.DocumentElement} this
     */
    geotoolkit.scene.exports.DocumentElement.prototype.setTranslation = function(x, y){};
    /**
     * set the document scale depending of the parameters isScaledVertically and isScaledHorizontally
     *
     * @param {number} sx scale factor in x
     * @param {number} sy scale factor in y
     * @returns {geotoolkit.scene.exports.DocumentElement} this
     */
    geotoolkit.scene.exports.DocumentElement.prototype.setScale = function(sx, sy){};
    /**
     * update the layout of the document
     * @param {geotoolkit.util.Rect} rect rect to layout area
     */
    geotoolkit.scene.exports.DocumentElement.prototype.updateLayout = function(rect){};

/**
 * CompositeDocumentElement class contains layouts as children for PDF rendering
 *
 * @class geotoolkit.scene.exports.CompositeDocumentElement
 * @augments geotoolkit.scene.exports.AbstractDocumentElement
 * @implements geotoolkit.layout.ILayoutable
 * @param {geotoolkit.scene.exports.AbstractDocumentElement[]} list of {geotoolkit.scene.exports.AbstractDocumentElement}
 * DocumentElement
 *
 * @param {geotoolkit.scene.exports.AnnotatedLayout | geotoolkit.scene.exports.LinearLayout | geotoolkit.layout.Layout} [layout] layout of elements
 */
geotoolkit.scene.exports.CompositeDocumentElement = {};
    /**
     * Add DocumentElement as child
     *
     * @param {geotoolkit.scene.exports.AbstractDocumentElement| geotoolkit.scene.exports.IExportable} child Document Element
     * @returns {geotoolkit.scene.exports.AbstractDocumentElement}
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.addChild = function(child){};
    /**
     * Set child at specific index
     *
     * @param {number} index index where to set the child
     * @param {geotoolkit.scene.exports.AbstractDocumentElement} child Document Element
     * @returns {geotoolkit.scene.exports.CompositeDocumentElement} this
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.setChild = function(index, child){};
    /**
     * Add child at specific index
     *
     * @param {number} index index where to insert the child
     * @param {geotoolkit.scene.exports.DocumentElement} child Document Element
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.insertChildAtIndex = function(index, child){};
    /**
     * Clear all children
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.clearChild = function(){};
    /**
     * Get child at index.
     *
     * @param {number} index index where to get the child
     * @returns {?geotoolkit.scene.exports.AbstractDocumentElement} child DocumentElement at index.
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.getChild = function(index){};
    /**
     * Get the number of children in the composite document element.
     *
     * @returns {number} count
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.getChildrenCount = function(){};
    /**
     * Get index of a specified element.
     *
     * @param {geotoolkit.scene.exports.DocumentElement} element document element
     * @returns {number} index
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.getIndex = function(element){};
    /**
     * Gets the list of children.
     *
     * @returns {Array} list
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.getList = function(){};
    /**
     * Compute dimensions in the layout, this dimension is described by a fixed dimension and a scaled dimension.
     *
     * @returns {object} layoutedDimension JSON object contains fixed and scaled dimensions
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.getLayoutedDimension = function(){};
    /**
     * Render the document in the context.
     *
     * @param {geotoolkit.renderer.DocumentRenderingContext} context rendering context
     * @param {geotoolkit.util.Point} position position of the current document relative to the parent document
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.render = function(context, position){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.renderAsync = function(){};
    /**
     * set the layout
     *
     * @param {geotoolkit.scene.exports.AnnotatedLayout | geotoolkit.scene.exports.LinearLayout | geotoolkit.layout.Layout} layout current layout
     * @returns {geotoolkit.scene.exports.CompositeDocumentElement} this
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.setLayout = function(layout){};
    /**
     * set the document scale depending of the parameters isScaledVertically and isScaledHorizontally
     *
     * @param {number} sx scale factor if scaledVertically
     * @param {number} sy scale factor if ScaledHorizontally
     * @returns {geotoolkit.scene.exports.CompositeDocumentElement} this
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.setScale = function(sx, sy){};
    /**
     * set the document translation
     *
     * @param {number} x offset x coordinate
     * @param {number} y offset y coordinate
     * @returns {geotoolkit.scene.exports.CompositeDocumentElement} this
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.setTranslation = function(x, y){};
    /**
     * Return preferred size to layout children
     * @param {geotoolkit.util.Rect} [rect] layout area of document
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.getPreferredSize = function(rect){};
    /**
     * Sets bounds of the document if it is a part of layout
     * @param {geotoolkit.util.Rect} bounds bound of the node
     * @returns {geotoolkit.scene.exports.CompositeDocumentElement} this
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.setBounds = function(bounds){};
    /**
     * Return bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.getBounds = function(){};
    /**
     * Specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle|object} layoutStyle desired layout style
     * @returns {geotoolkit.scene.exports.NodeAdapter}
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.setLayoutStyle = function(layoutStyle){};
    /**
     * Return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.getLayoutStyle = function(){};
    /**
     * update the layout of the document
     * @param {geotoolkit.util.Rect} [rect] layout area of document
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.updateLayout = function(rect){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.endExport = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.exports.CompositeDocumentElement.prototype.beginExport = function(){};

/**
 * Document class represents a pdf document
 * this class can contains a :
 * - root element { geotoolkit.scene.exports.CompositeDocumentElement || geotoolkit.scene.exports.DocumentElement}
 * - header : pdf header component {@link geotoolkit.scene.exports.PageElement}
 * - footer : pdf footer component {@link geotoolkit.scene.exports.PageElement}
 * @class geotoolkit.scene.exports.Document
 *
 * @param {geotoolkit.scene.exports.CompositeDocumentElement | geotoolkit.scene.exports.DocumentElement} root
 * @param {geotoolkit.scene.exports.PageElement} pageHeader
 * @param {geotoolkit.scene.exports.PageElement} pageFooter
 * @param {boolean} trueScale enable true scale
 * @param {Object} document options
 */
geotoolkit.scene.exports.Document = {};
    /**
     * Returns options
     * @returns {Object} options
     */
    geotoolkit.scene.exports.Document.prototype.getOptions = function(){};
    /**
     * Set Root document
     *
     * @param {geotoolkit.scene.exports.CompositeDocumentElement | geotoolkit.scene.exports.DocumentElement} root Root document
     * @returns {geotoolkit.scene.exports.Document} this
     */
    geotoolkit.scene.exports.Document.prototype.setRoot = function(root){};
    /**
     * Get root document
     * @returns {geotoolkit.scene.exports.CompositeDocumentElement | geotoolkit.scene.exports.DocumentElement} root
     */
    geotoolkit.scene.exports.Document.prototype.getRoot = function(){};
    /**
     * Used to restore object's state after exporting
     */
    geotoolkit.scene.exports.Document.prototype.endExport = function(){};
    /**
     * Used to prepare object before exporting
     */
    geotoolkit.scene.exports.Document.prototype.beginExport = function(){};
    /**
     * Set PDF Page Header component.
     *
     * @param {geotoolkit.scene.exports.PageElement} pageHeader pdf Header component
     * @deprecated since 2.6, replaced with setPageHeader(...)
     */
    geotoolkit.scene.exports.Document.prototype.setHeader = function(pageHeader){};
    /**
     * Get PDF Page Header component
     *
     * @returns {geotoolkit.scene.exports.PageElement} pageHeader
     * @deprecated since 2.6, replaced with getPageHeader()
     */
    geotoolkit.scene.exports.Document.prototype.getHeader = function(){};
    /**
     * Set PDF Page Footer Component
     *
     * @param {geotoolkit.scene.exports.PageElement} pageFooter pdf Footer Component
     * @deprecated since 2.6 replaced with setPageFooter(...)
     */
    geotoolkit.scene.exports.Document.prototype.setFooter = function(pageFooter){};
    /**
     * Get PDF Page Footer Component
     *
     * @returns {geotoolkit.scene.exports.PageElement} pageFooter
     * @deprecated since 2.6 replaced with getPageFoooter()
     */
    geotoolkit.scene.exports.Document.prototype.getFooter = function(){};
    /**
     * Set PDF Page Header component.
     *
     * @param {geotoolkit.scene.exports.PageElement} pageHeader Page Header
     * @returns {geotoolkit.scene.exports.Document} this
     */
    geotoolkit.scene.exports.Document.prototype.setPageHeader = function(pageHeader){};
    /**
     * Get PDF Page Header component
     *
     * @returns {geotoolkit.scene.exports.PageElement} Page Header
     */
    geotoolkit.scene.exports.Document.prototype.getPageHeader = function(){};
    /**
     * Set PDF Page Footer Component
     *
     * @param {geotoolkit.scene.exports.PageElement} pageFooter Page Footer
     * @returns {geotoolkit.scene.exports.Document} this
     */
    geotoolkit.scene.exports.Document.prototype.setPageFooter = function(pageFooter){};
    /**
     * Get PDF Page Footer Component
     *
     * @returns {geotoolkit.scene.exports.PageElement} Page Footer
     */
    geotoolkit.scene.exports.Document.prototype.getPageFooter = function(){};
    /**
     * Set PDF Document Header component.
     *
     * @param {geotoolkit.scene.exports.PageElement} docHeader Document Header
     * @returns {geotoolkit.scene.exports.Document} this
     */
    geotoolkit.scene.exports.Document.prototype.setDocumentHeader = function(docHeader){};
    /**
     * Get PDF Document Header component
     *
     * @returns {geotoolkit.scene.exports.PageElement} Document Header
     */
    geotoolkit.scene.exports.Document.prototype.getDocumentHeader = function(){};
    /**
     * Set PDF Document Footer Component
     *
     * @param {geotoolkit.scene.exports.PageElement} docFooter Document Footer
     * @returns {geotoolkit.scene.exports.Document} this
     */
    geotoolkit.scene.exports.Document.prototype.setDocumentFooter = function(docFooter){};
    /**
     * Get PDF Document Footer Component
     *
     * @returns {geotoolkit.scene.exports.PageElement} Document Footer
     */
    geotoolkit.scene.exports.Document.prototype.getDocumentFooter = function(){};
    /**
     * Get true if true scale mode is enabled
     *
     * @returns {boolean} true scale
     */
    geotoolkit.scene.exports.Document.prototype.getTrueScale = function(){};

/**
 * @class geotoolkit.scene.exports.LinearLayout
 *
 * @param {geotoolkit.scene.exports.CompositeDocumentElement} parent
 * @param {geotoolkit.scene.exports.LinearLocation} orientation 'horizontal' or 'vertical'
 */
geotoolkit.scene.exports.LinearLayout = {};
    /**
     * set the parent
     *
     * @param {geotoolkit.scene.exports.CompositeDocumentElement} parent parent
     * @returns {geotoolkit.scene.exports.LinearLayout} this
     */
    geotoolkit.scene.exports.LinearLayout.prototype.setParent = function(parent){};
    /**
     * set the layout orientation
     *
     * @param {geotoolkit.scene.exports.LinearLocation} orientation layout orientation
     * @returns {geotoolkit.scene.exports.LinearLayout} this
     */
    geotoolkit.scene.exports.LinearLayout.prototype.setOrientation = function(orientation){};
    /**
     * compute the dimension in the layout this dimension is represented by a fixed dimension and a scaled dimension
     *
     * @returns {Object} layoutedDimension
     * that contains two objects
     * fixed : {@link geotoolkit.util.Dimension}
     * scaled : {@link geotoolkit.util.Dimension}
     */
    geotoolkit.scene.exports.LinearLayout.prototype.getLayoutedDimension = function(){};
    /**
     * update the position of elements in the layout
     */
    geotoolkit.scene.exports.LinearLayout.prototype.updateLayout = function(){};

/**
 * Layout class that represents an AnnotatedLayout
 * @class geotoolkit.scene.exports.AnnotatedLayout
 *
 * @param {geotoolkit.scene.exports.CompositeDocumentElement} parent parent document element of this layout
 */
geotoolkit.scene.exports.AnnotatedLayout = {};
    /**
     * Set the parent of this annotated layout.
     *
     * @param {geotoolkit.scene.exports.CompositeDocumentElement} parent parent document element of this layout
     * @returns {geotoolkit.scene.exports.AnnotatedLayout} this
     */
    geotoolkit.scene.exports.AnnotatedLayout.prototype.setParent = function(parent){};
    /**
     * Compute the dimension in the layout this dimension is represented by a fixed dimension and a scaled dimension.
     *
     * @returns {?Object} [layoutedDimension] that contains two objects
     * @returns {?geotoolkit.util.Dimension} [layoutedDimension.fixed]
     * @returns {?geotoolkit.util.Dimension} [layoutedDimension.scaled]
     */
    geotoolkit.scene.exports.AnnotatedLayout.prototype.getLayoutedDimension = function(){};
    /**
     * update the position of elements in the layout
     */
    geotoolkit.scene.exports.AnnotatedLayout.prototype.updateLayout = function(){};

/**
 * @class geotoolkit.scene.exports.FreeLayout
 *
 * @param {number} width
 * @param {number} height
 */
geotoolkit.scene.exports.FreeLayout = {};
    /**
     * compute the dimension in the layout this dimension is represented by a fixed dimension and a scaled dimension
     *
     * @returns {Object} layoutedDimension
     * that contains two objects
     * fixed : {@link geotoolkit.util.Dimension}
     * scaled : {@link geotoolkit.util.Dimension}
     */
    geotoolkit.scene.exports.FreeLayout.prototype.getLayoutedDimension = function(){};
    /**
     * set the parent
     * @function
     * @param {geotoolkit.scene.exports.CompositeDocumentElement} parent parent document for this layout
     * @returns {geotoolkit.scene.exports.FreeLayout} this
     */
    geotoolkit.scene.exports.FreeLayout.prototype.setParent = function(parent){};
    /**
     * update the position of elements in the layout
     */
    geotoolkit.scene.exports.FreeLayout.prototype.updateLayout = function(){};

/**
 * Abstract Paper Format class
 *
 * @class geotoolkit.scene.exports.AbstractPaperFormat
 *
 * @param {string} name
 * paper name
 * @param {number} width
 * paper width
 * @param {number} height
 * paper height
 * @param {number} top margin
 * paper top margin
 * @param {number} right margin
 * paper right margin
 * @param {number} bottom margin
 * paper bottom margin
 * @param {number} left margin
 * paper left margin
 * @param {geotoolkit.util.AbstractUnit} unit
 * paper measure unit
 * @param {geotoolkit.scene.exports.PaperOrientation} orientation
 * paper orientation
 */
geotoolkit.scene.exports.AbstractPaperFormat = {};
    /**
     * get the paper name
     * @returns {string} paper name
     */
    geotoolkit.scene.exports.AbstractPaperFormat.prototype.getName = function(){};
    /**
     * get paper width
     * @returns {number} width
     */
    geotoolkit.scene.exports.AbstractPaperFormat.prototype.getWidth = function(){};
    /**
     * get paper height
     * @returns {number} height
     */
    geotoolkit.scene.exports.AbstractPaperFormat.prototype.getHeight = function(){};
    /**
     * get top margin
     * @returns {number} top margin
     */
    geotoolkit.scene.exports.AbstractPaperFormat.prototype.getTop = function(){};
    /**
     * get bottom margin
     * @returns {number} bottom margin
     */
    geotoolkit.scene.exports.AbstractPaperFormat.prototype.getBottom = function(){};
    /**
     * get left margin
     * @returns {number} left margin
     */
    geotoolkit.scene.exports.AbstractPaperFormat.prototype.getLeft = function(){};
    /**
     * get right margin
     * @function
     * @returns {number} right margin
     */
    geotoolkit.scene.exports.AbstractPaperFormat.prototype.getRight = function(){};
    /**
     * get paper unit
     * @returns {geotoolkit.util.AbstractUnit} unit
     */
    geotoolkit.scene.exports.AbstractPaperFormat.prototype.getUnit = function(){};
    /**
     * get dimension
     * @returns {geotoolkit.util.Dimension} dimension
     */
    geotoolkit.scene.exports.AbstractPaperFormat.prototype.getDimension = function(){};
    /**
     * get paper orientation
     * @returns {geotoolkit.scene.exports.PaperOrientation} orientation
     */
    geotoolkit.scene.exports.AbstractPaperFormat.prototype.getOrientation = function(){};

/**
 * Paper format factory
 *
 * @class geotoolkit.scene.exports.PaperFormatFactory
 */
geotoolkit.scene.exports.PaperFormatFactory = {};
    /**
     * Return the instance of paper format factory. Will build new one if one has not been constructed.
     *
     * @returns {geotoolkit.scene.exports.PaperFormatFactory} format factory
     */
    geotoolkit.scene.exports.PaperFormatFactory.getInstance = function(){};
    /**
     * Return an instance of paper format.
     *
     * @param {geotoolkit.scene.exports.PaperFormat | string} paperformat paper format
     * @param {geotoolkit.util.AbstractUnit|string} [unit]
     * optional if paperformat is a {geotoolkit.scene.exports.PaperFormat}
     * @param {geotoolkit.scene.exports.PaperOrientation} [orientation]
     * optional if paperformat is a {geotoolkit.scene.exports.PaperFormat}
     * @returns {geotoolkit.scene.exports.AbstractPaperFormat} result
     */
    geotoolkit.scene.exports.PaperFormatFactory.prototype.getPaper = function(paperformat, unit, orientation){};
    /**
     * Register a custom paper format to the paper format factory. The paper format must extend AbstractPaperFormat.
     *
     * @param {geotoolkit.scene.exports.CustomPaperFormat} newPaper custom paper format
     */
    geotoolkit.scene.exports.PaperFormatFactory.prototype.registerNewPaperFormat = function(newPaper){};
    /**
     * Return the list of all papers supported by the factory.
     *
     * @returns {Array} paperList all of the supported paper types
     */
    geotoolkit.scene.exports.PaperFormatFactory.prototype.getPaperList = function(){};

/**
 * Paper format
 *
 * @class geotoolkit.scene.exports.PaperFormat
 * @augments geotoolkit.scene.exports.AbstractPaperFormat
 *
 * @param {string} name
 * @param {number} width
 * @param {number} height
 * @param {number} top margin
 * @param {number} right margin
 * @param {number} bottom margin
 * @param {number} left margin
 * @param {geotoolkit.util.AbstractUnit} unit
 * @param {geotoolkit.scene.exports.PaperOrientation} orientation
 */
geotoolkit.scene.exports.PaperFormat = {};

/**
 * Custom paper format
 *
 * @class geotoolkit.scene.exports.CustomPaperFormat
 * @augments geotoolkit.scene.exports.PaperFormat
 *
 * @param {string} name
 * @param {number} width
 * @param {number} height
 * @param {number} top margin
 * @param {number} right margin
 * @param {number} bottom margin
 * @param {number} left margin
 * @param {geotoolkit.util.AbstractUnit} unit
 * @param {geotoolkit.scene.exports.PaperOrientation} orientation
 */
geotoolkit.scene.exports.CustomPaperFormat = {};
    /**
     * set the paper name
     *
     * @param {string} name paper name
     * @returns {geotoolkit.scene.exports.CustomPaperFormat} this
     */
    geotoolkit.scene.exports.CustomPaperFormat.prototype.setName = function(name){};
    /**
     * set paper width
     *
     * @param {number} width paper width
     * @returns {geotoolkit.scene.exports.CustomPaperFormat} this
     */
    geotoolkit.scene.exports.CustomPaperFormat.prototype.setWidth = function(width){};
    /**
     * set paper height
     *
     * @param {number} height paper height
     * @returns {geotoolkit.scene.exports.CustomPaperFormat} this
     */
    geotoolkit.scene.exports.CustomPaperFormat.prototype.setHeight = function(height){};
    /**
     * set top margin
     *
     * @param {number} top top margin
     * @returns {geotoolkit.scene.exports.CustomPaperFormat} this
     */
    geotoolkit.scene.exports.CustomPaperFormat.prototype.setTop = function(top){};
    /**
     * set bottom margin
     *
     * @param {number} bottom bottom margin
     * @returns {geotoolkit.scene.exports.CustomPaperFormat} this
     */
    geotoolkit.scene.exports.CustomPaperFormat.prototype.setBottom = function(bottom){};
    /**
     * set left margin
     *
     * @param {number} left left margin
     * @returns {geotoolkit.scene.exports.CustomPaperFormat} this
     */
    geotoolkit.scene.exports.CustomPaperFormat.prototype.setLeft = function(left){};
    /**
     * set right margin
     *
     * @param {number} right right margin
     * @returns {geotoolkit.scene.exports.CustomPaperFormat} this
     */
    geotoolkit.scene.exports.CustomPaperFormat.prototype.setRight = function(right){};
    /**
     * set paper unit
     *
     * @param {geotoolkit.util.AbstractUnit} unit paper unit
     * @returns {geotoolkit.scene.exports.CustomPaperFormat} this
     */
    geotoolkit.scene.exports.CustomPaperFormat.prototype.setUnit = function(unit){};
    /**
     * set dimension
     *
     * @param {geotoolkit.util.Dimension} dimension paper dimension
     * @returns {geotoolkit.scene.exports.CustomPaperFormat} this
     */
    geotoolkit.scene.exports.CustomPaperFormat.prototype.setDimension = function(dimension){};
    /**
     * set paper orientation
     *
     * @param {geotoolkit.scene.exports.PaperOrientation} orientation paper orientation
     * @returns {geotoolkit.scene.exports.CustomPaperFormat} this
     */
    geotoolkit.scene.exports.CustomPaperFormat.prototype.setOrientation = function(orientation){};

/**
 * Defines an abstract shape node with predefined line, fill and, text styles
 *
 * @class geotoolkit.scene.shapes.Shape
 * @augments geotoolkit.scene.AbstractNode
 * @param {geotoolkit.attributes.LineStyle|string|object} [options] style applied on outline or it is options
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle] style applied on outline
 * @param {geotoolkit.attributes.FillStyle|string|object} [options.fillstyle] style applied on fill
 * @param {boolean} [options.visible=true] visibility of node
 * @param {boolean} [options.selectable=true] a boolean to determine if selection should consider this shape
 * @param {string} [options.id=null] id of the node , its a unique identifier
 * @param {object} [options.tag=null] custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
 * @param {string} [options.cssclass] The ccs class name of this node
 * @param {geotoolkit.attributes.FillStyle|string|object} [fillstyle] style applied on fill
 */
geotoolkit.scene.shapes.Shape = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Shape} src Source to copy from
     * @returns {geotoolkit.scene.shapes.Shape} this
     */
    geotoolkit.scene.shapes.Shape.prototype.copyConstructor = function(src){};
    /**
     * Return line style
     *
     * @returns {geotoolkit.attributes.LineStyle} lineStyle current line style
     */
    geotoolkit.scene.shapes.Shape.prototype.getLineStyle = function(){};
    /**
     * Sets line style
     *
     * @param {geotoolkit.attributes.LineStyle|string|object} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.scene.shapes.Shape} this
     */
    geotoolkit.scene.shapes.Shape.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Return fill style
     *
     * @returns {geotoolkit.attributes.FillStyle} fillStyle current fill style
     */
    geotoolkit.scene.shapes.Shape.prototype.getFillStyle = function(){};
    /**
     * Sets fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.scene.shapes.Shape}
     */
    geotoolkit.scene.shapes.Shape.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Invalidate bounds
     * @param {geotoolkit.util.Rect | undefined | null} bounds
     * if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
     * @param {boolean} [force] flag indicating if the parent must be forcibly invalidated
     * @returns {geotoolkit.scene.shapes.Shape} this
     */
    geotoolkit.scene.shapes.Shape.prototype.invalidateParent = function(bounds, force){};
    /**
     * Check collision of the shape bounds with parent invalid area
     * @param {geotoolkit.util.Rect} bounds shape bounds
     * @param {geotoolkit.util.Transformation} localTransformation local transformation of the bounds
     * @param {geotoolkit.util.Rect} parentInvalidArea invalid parent area
     * @param {geotoolkit.util.Dimension} [expand=null] optional expand the bounds in model coordinate
     * @returns {boolean} true if bounds intersect the invalid area
     */
    geotoolkit.scene.shapes.Shape.intersectsBounds = function(bounds, localTransformation, parentInvalidArea, expand){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.scene.shapes.Shape.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.attributes.LineStyle|string|object} [properties.linestyle] line style
     * @param {geotoolkit.attributes.FillStyle|string|object} [properties.fillstyle] fill style
     * @returns {geotoolkit.scene.shapes.Shape}
     */
    geotoolkit.scene.shapes.Shape.prototype.setProperties = function(properties){};
    /**
     * invalidate Method
     * @returns {function} method to invalidate this object
     */
    geotoolkit.scene.shapes.Shape.prototype.getInvalidateMethod = function(){};

/**
 * Define abstract shape with defined anchor point and scalable or restricted size.
 *
 * @class geotoolkit.scene.shapes.AnchoredShape
 * @augments geotoolkit.scene.shapes.Shape
 * @implements geotoolkit.layout.ILayoutable
 * @param {number|Object} options anchor x position
 * @param {number} [options.ax] anchor x position
 * @param {number} [options.ay] anchor y position
 * @param {number} [options.width] shape width
 * @param {number} [options.height] shape height
 * @param {number} [options.rotationangle=0] rotation angle at anchor
 * @param {geotoolkit.util.AnchorType} [options.alignment=geotoolkit.util.AnchorType.Center] alignment according of the anchor point
 * @param {boolean} [options.sizeisindevicespace=false] is coordinate in device space
 * @param {boolean} [options.preserveaspectratio=false] preserve aspect ratio of the anchored shape
 * @param {boolean} [options.ispointingup=false] pointing up
 * @param {boolean} [options.preservereadingorientation=false] preserve reading orientation for local transform
 * @param {boolean} [options.preserverightangle=false] preserve right angle for local transformation
 * @param {boolean} [options.useminmaxdimensions=false] use the min max dimensions to limit visual size
 * @param {geotoolkit.util.Dimension} [options.mindimension=null] minimum size for rendering
 * @param {geotoolkit.util.Dimension} [options.maxdimension=null] maximum size for rendering
 * @param {geotoolkit.layout.LayoutStyle|object} [options.layoutstyle=null] layout style to specify how to lay out shape
 * @param {number} [ay=0] anchor y position
 * @param {number} [width=0] symbol width
 * @param {number} [height=0] symbol height
 * @param {geotoolkit.util.AnchorType} [alignment=geotoolkit.util.AnchorType.Center] alignment according of the anchor point
 * @param {boolean} [sizeIsInDeviceSpace=false] flag to indicate if size of the symbol in device,
 * @param {geotoolkit.attributes.LineStyle|string|object} [linestyle=null] the line style
 * @param {geotoolkit.attributes.FillStyle|string|object} [fillstyle=null] the fill style
 */
geotoolkit.scene.shapes.AnchoredShape = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.AnchoredShape} src Source to copy from
     * @returns {geotoolkit.scene.shapes.AnchoredShape}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.copyConstructor = function(src){};
    /**
     * Return anchor position
     * @param {geotoolkit.util.Rect} rect rectangle to get anchor position
     * @param {geotoolkit.util.AnchorType} anchorType anchor type
     * @returns {geotoolkit.util.Point} anchor
     */
    geotoolkit.scene.shapes.AnchoredShape.getAnchorPosition = function(rect, anchorType){};
    /**
     * Sets whether the shape size is set in device space.
     *
     * @param {boolean} sizeIsInDeviceSpace
     * true if the shape size is fixed in device space; otherwise, false.
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setSizeIsInDeviceSpace = function(sizeIsInDeviceSpace){};
    /**
     * Returns true if the shape size is set in device space
     * @returns {boolean} true if size is defined in device space
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getSizeIsInDeviceSpace = function(){};
    /**
     * Sets whether to use the min max device space sizes
     *
     * @param {boolean} useMinMaxSize
     * true if using the min max device space sizes otherwise, false.
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setUseMinMaxSize = function(useMinMaxSize){};
    /**
     * true if using the min max device space sizes
     * @returns {boolean} true if using the min max device space sizes
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getUseMinMaxSize = function(){};
    /**
     * returns the maximum device space rendering dimension
     * only works when setUseMinMaxSize is enabled.
     * @returns {geotoolkit.util.Dimension} max size
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getMaxSize = function(){};
    /**
     * returns the minimum device space rendering dimension
     * * only works when setUseMinMaxSize is enabled.
     * @returns {geotoolkit.util.Dimension} min size
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getMinSize = function(){};
    /**
     * sets the maximum device space rendering dimension
     * @param {geotoolkit.util.Dimension} maxSize maximum device space rendering dimension
     * @returns {geotoolkit.scene.shapes.AnchoredShape}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setMaxSize = function(maxSize){};
    /**
     * sets the minimum device space rendering dimension
     * only works when setUseMinMaxSize is enabled.
     * @param {geotoolkit.util.Dimension} minSize minimum device space rendering dimension
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setMinSize = function(minSize){};
    /**
     * Sets whether the shape is always pointing up. Particularly useful for text.
     *
     * @param {boolean} isPointingUp flag setting whether the shape is always pointing up
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setIsPointingUp = function(isPointingUp){};
    /**
     * Returns true if the shape is always pointing up
     * @returns {boolean} true if the shape is always pointing up
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getIsPointingUp = function(){};
    /**
     * Sets whether the shape is always in a readable orientation. Particularly useful for text. Prevents mirror effects
     * @param {boolean} preserveReadingOrientation sets flag whether the shape is always in a readable orientation
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setPreserveReadingOrientation = function(preserveReadingOrientation){};
    /**
     * Returns true if the shape is always in a readable orientation
     * @returns {boolean} true if the shape is always in a readable orientation
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getPreserveReadingOrientation = function(){};
    /**
     * Sets whether right angles are preserved
     * @param {boolean} preserveRightAngle flag setting if right angles are preserved
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setPreserveRightAngle = function(preserveRightAngle){};
    /**
     * Returns true if right angles are preserved
     * @returns {boolean} true if right angles are preserved
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getPreserveRightAngle = function(){};
    /**
     * Sets whether aspect ratio is preserved
     * @param {boolean} preserveAspectRatio flag Sets whether aspect ratio is preserved
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setPreserveAspectRatio = function(preserveAspectRatio){};
    /**
     * Returns true if aspect ratio is preserved
     * @returns {boolean} true if aspect ratio is preserved
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getPreserveAspectRatio = function(){};
    /**
     * Returns aspect ratio of the content of the shape
     * Returns 1
     * @returns {number}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getAspectRatio = function(){};
    /**
     * Returns the current anchor type.
     * @returns {geotoolkit.util.AnchorType} current anchor type
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getAnchorType = function(){};
    /**
     * Sets the anchor type.
     * @param {geotoolkit.util.AnchorType} alignment anchor alignment
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setAnchorType = function(alignment){};
    /**
     * Returns rotation angle (in radians)
     * @returns {number} rotationAngle rotation angle at anchor
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getRotationAngle = function(){};
    /**
     * Set rotation angle
     * @param {number} rotationAngle rotation angle (in radians) at anchor
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setRotationAngle = function(rotationAngle){};
    /**
     * Gets the anchor
     * @param {geotoolkit.util.Transformation} [tr=null] transformation to transform anchor
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getAnchor = function(tr){};
    /**
     * Return anchored x position
     * @returns {number}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getAnchorX = function(){};
    /**
     * Sets x anchor position
     * @param {number} ax anchor x position
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setAnchorX = function(ax){};
    /**
     * Return anchored y position
     * @returns {number}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getAnchorY = function(){};
    /**
     * Sets y anchor position
     * @param {number} ay anchor x position
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setAnchorY = function(ay){};
    /**
     * Sets anchor point to given position
     *
     * @param {geotoolkit.util.Point|number} p1 point or x coordinate
     * @param {number} [p2] y coordinate
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setAnchor = function(p1, p2){};
    /**
     * Sets size of the shape, will accept a width and height number or a Dimension object.
     *
     * @param {number | geotoolkit.util.Dimension} width width of the shape
     * @param {number} [height] height of the shape
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setSize = function(width, height){};
    /**
     * Returns the size as a dimension object.
     * @returns {geotoolkit.util.Dimension} size
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getSize = function(){};
    /**
     * Return width of the shape
     * @returns {number}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getWidth = function(){};
    /**
     * Sets width of the shape
     * @param {number} width width of the shape
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setWidth = function(width){};
    /**
     * Return height of the shape
     * @returns {number}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getHeight = function(){};
    /**
     * Sets height of the shape
     * @param {number} height height of the shape
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setHeight = function(height){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.invalidate = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.checkCollision = function(){};
    /**
     * Return bound in the parent coordinates
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getBounds = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {number} [props.ax] x coordinate of the anchor
     * @returns {number} [props.ay] y coordinate of the anchor
     * @returns {number} [props.width] width
     * @returns {number} [props.height] height
     * @returns {number} [props.rotationangle] rotation angle
     * @returns {geotoolkit.util.AnchorType} [props.alignment] anchor type
     * @returns {boolean} [props.sizeisindevicespace] size is in device space
     * @returns {boolean} [props.preserveaspectratio] is preserve ratio activated
     * @returns {boolean} [props.ispointingup] is pointing up
     * @returns {boolean} [props.preservereadingorientation] is preserve reading orientation activated
     * @returns {boolean} [props.preserverightangle] is preserve right angle activated
     * @returns {boolean} [props.useminmaxdimensions] use device space size capping
     * @returns {geotoolkit.util.Dimension} [props.mindimension] minimum device space size
     * @returns {geotoolkit.util.Dimension} [props.maxdimension] maximum device space size
     * @returns {geotoolkit.layout.LayoutStyle} [props.layoutstyle] layout style to specify how to lay out shape
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {number} [properties.ax] x coordinate of the anchor
     * @param {number} [properties.ay] y coordinate of the anchor
     * @param {number} [properties.width] width
     * @param {number} [properties.height] height
     * @param {number} [properties.rotationangle] rotation angle
     * @param {geotoolkit.util.AnchorType} [properties.alignment] anchor type
     * @param {boolean} [properties.sizeisindevicespace] size is in device space
     * @param {boolean} [properties.preserveaspectratio] is preserve ratio activated
     * @param {boolean} [properties.ispointingup] is pointing up
     * @param {boolean} [properties.preservereadingorientation] is preserve reading orientation activated
     * @param {boolean} [properties.preserverightangle] is preserve right angle activated
     * @param {boolean} [properties.useminmaxdimensions] use device space size capping
     * @param {geotoolkit.util.Dimension} [properties.mindimension] minimum device space size
     * @param {geotoolkit.util.Dimension} [properties.maxdimension] maximum device space size
     * @param {geotoolkit.layout.LayoutStyle | object} [properties.layoutstyle] layout style to specify how to lay out shape
     * @returns {geotoolkit.scene.shapes.AnchoredShape}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setProperties = function(properties){};
    /**
     * Specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle | object} layoutStyle desired layout style
     * @returns {geotoolkit.scene.shapes.AnchoredShape}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setLayoutStyle = function(layoutStyle){};
    /**
     * return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getLayoutStyle = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.getWorldTransform = function(){};
    /**
     * Sets bounds of the node in the parent coordinates. This method
     * takes anchor position and width and height if size is not in device space.
     * This method was added to support layout.
     * @param {geotoolkit.util.Rect | object} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.scene.shapes.AnchoredShape} this
     */
    geotoolkit.scene.shapes.AnchoredShape.prototype.setBounds = function(bounds){};

/**
 * The abstract class for a number of shapes whose geometry
 * is scaled by specified transformation. The scaled shapes has bounds, which
 * specify geometry bounding box without applying local transformation
 *
 * @class geotoolkit.scene.shapes.ScaledShape
 * @augments geotoolkit.scene.shapes.Shape
 * @param {geotoolkit.attributes.LineStyle|string|object} [options] style applied on outline or it is options
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle] style applied on outline
 * @param {geotoolkit.attributes.FillStyle|string|object} [options.fillstyle] style applied on fill
 * @param {boolean} [options.visible=true] visibility of node
 * @param {boolean} [options.selectable=true] a boolean to determine if selection should consider this shape
 * @param {string} [options.id=null] id of the node , its a unique identifier
 * @param {object} [options.tag=null] custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
 * @param {string} [options.cssclass] The ccs class name of this node
 * @param {geotoolkit.attributes.FillStyle|string|object} [fillstyle] style applied on fill
 */
geotoolkit.scene.shapes.ScaledShape = {};
    /**
     * Return bounds
     * @function
     * @abstract
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.scene.shapes.ScaledShape.prototype.getBounds = function(){};
    /**
     * Check collision
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} true if object is inside of rendering area
     */
    geotoolkit.scene.shapes.ScaledShape.prototype.checkCollision = function(context){};

/**
 * Symbols are shapes created using Symbol Painters {@link geotoolkit.scene.shapes.painters}. It has builtin function to draw the shape based on the selected painter.
 *
 * @class geotoolkit.scene.shapes.Symbol
 * @augments geotoolkit.scene.shapes.AnchoredShape
 * @param {number|object} [options] anchor x position
 * @param {number} [options.ax] anchor x position
 * @param {number} [options.ay] anchor y position
 * @param {number} [options.width] symbol width
 * @param {number} [options.height] symbol height
 * @param {geotoolkit.util.AnchorType} [options.alignment] anchor type of symbol
 * @param {boolean} [options.sizeIsInDeviceSpace] flag to indicate if size of the symbol in device
 * @param {function|object} [options.painter] a function with has parameters: symbol, box, context
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.lineStyle] line style of symbol
 * @param {geotoolkit.attributes.FillStyle|string|object} [options.fillStyle] fill style of symbol
 * @param {number} [ay] anchor y position
 * @param {number} [width] symbol width
 * @param {number} [height] symbol height
 * @param {geotoolkit.util.AnchorType} [alignment] anchor type of symbol
 * @param {boolean} [sizeIsInDeviceSpace] flag to indicate if size of the symbol in device
 * @param {function|object} [painter] a function with has parameters: symbol, box, context
 * @param {geotoolkit.attributes.LineStyle|string|object} [lineStyle] line style of symbol
 * @param {geotoolkit.attributes.FillStyle|string|object} [fillStyle] fill style of symbol
 */
geotoolkit.scene.shapes.Symbol = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Symbol} src Source to copy from
     * @returns {geotoolkit.scene.shapes.Symbol} this
     */
    geotoolkit.scene.shapes.Symbol.prototype.copyConstructor = function(src){};
    /**
     * Sets painter function for this symbol.
     *
     * @param {string|object|function()} painter painter function for this symbol
     * @returns {geotoolkit.scene.shapes.Symbol} this
     */
    geotoolkit.scene.shapes.Symbol.prototype.setPainter = function(painter){};
    /**
     * Get painter function
     *
     * @returns {object|function()}
     */
    geotoolkit.scene.shapes.Symbol.prototype.getPainter = function(){};
    /**
     * Render
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.shapes.Symbol.prototype.render = function(context){};
    /**
     * Draw
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {geotoolkit.scene.shapes.Symbol} this
     */
    geotoolkit.scene.shapes.Symbol.prototype.draw = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {string} [props.painter] symbol's painter's className
     */
    geotoolkit.scene.shapes.Symbol.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {string} [properties.painter] symbol's painter's className
     * @returns {geotoolkit.scene.shapes.Symbol} this
     */
    geotoolkit.scene.shapes.Symbol.prototype.setProperties = function(properties){};

/**
 * Define a line shape.
 * <p>
 * Line shapes are the simplest shapes and they provide a foundation for more complex shapes.
 * Width, color, and style is set by assigning attributes to the line shape.<br>
 * Line shape itself defines geometry and assigned attributes provide information about drawing.
 * </p>
 *
 * @class geotoolkit.scene.shapes.Line
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {geotoolkit.util.Point|object} [from] origin point of line
 * @param {geotoolkit.util.Point} [from.from] origin point of line
 * @param {geotoolkit.util.Point} [from.to] endpoint of line
 * @param {boolean} [from.visible] line visible
 * @param {geotoolkit.attributes.LineStyle|string|object} [from.linestyle='black'] line style
 * @param {geotoolkit.util.Point} [to] endpoint of line
 * @param {boolean} [visible=true] line visible
 * @param {geotoolkit.attributes.LineStyle|string|object} [linestyle='black'] line style
 */
geotoolkit.scene.shapes.Line = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Line} src Source to copy from
     */
    geotoolkit.scene.shapes.Line.prototype.copyConstructor = function(src){};
    /**
     * returns from point
     * @returns {?geotoolkit.util.Point}
     */
    geotoolkit.scene.shapes.Line.prototype.getFrom = function(){};
    /**
     * returns to point
     * @returns {?geotoolkit.util.Point}
     */
    geotoolkit.scene.shapes.Line.prototype.getTo = function(){};
    /**
     * Set line positions
     * @param {object} line set of two points
     * @param {geotoolkit.util.Point} line.from from position
     * @param {geotoolkit.util.Point} line.to to position
     * @returns {geotoolkit.scene.shapes.Line} this
     */
    geotoolkit.scene.shapes.Line.prototype.setLine = function(line){};
    /**
     * Render line
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.shapes.Line.prototype.render = function(context){};
    /**
     * Update bounds
     * @returns {geotoolkit.scene.shapes.Line} this
     */
    geotoolkit.scene.shapes.Line.prototype.updateBounds = function(){};
    /**
     * Return bounding box of this line.
     *
     * @returns {geotoolkit.util.Rect} bounds.
     */
    geotoolkit.scene.shapes.Line.prototype.getBounds = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {geotoolkit.util.Point} [props.from] from
     * @returns {geotoolkit.util.Point} [props.to] to
     * @returns {geotoolkit.util.Rect} [properties.bounds] shape bounds
     */
    geotoolkit.scene.shapes.Line.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.util.Point} [properties.from] from
     * @param {geotoolkit.util.Point} [properties.to] to
     * @param {geotoolkit.util.Rect|object} [properties.bounds] shape bounds
     * @returns {geotoolkit.scene.shapes.Line}
     */
    geotoolkit.scene.shapes.Line.prototype.setProperties = function(properties){};
    /**
     * @override
     */
    geotoolkit.scene.shapes.Line.prototype.updateState = function(){};
    /**
     * @override
     */
    geotoolkit.scene.shapes.Line.prototype.checkCollision = function(){};
    /**
     * @override
     */
    geotoolkit.scene.shapes.Line.prototype.invalidate = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.Line.prototype.getInvalidateMethod = function(){};

/**
 * The base abstract class for a number of shapes whose geometry
 * is defined by a rectangular frame. This class does not directly
 * specify any specific geometry by itself, but merely provides
 * manipulation methods inherited by a whole category of shapes.
 *
 * @class geotoolkit.scene.shapes.RectangularShape
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @implements geotoolkit.layout.ILayoutable
 * @param {number | object} [options] x coordinate of the top left corner
 * @param {number} [options.left] x coordinate of the top left corner
 * @param {number} [options.top] y coordinate of the top left corner
 * @param {number} [options.right] x coordinate of the bottom right corner (if 'width' not specified)
 * @param {number} [options.bottom] y coordinate of the bottom right corner (if 'height' not specified)
 * @param {number} [options.width] width (if 'right' not specified)
 * @param {number} [options.height] height (if 'bottom' not specified)
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle] style applied on outline
 * @param {geotoolkit.attributes.FillStyle|string|object} [options.fillstyle] style applied on fill
 * @param {boolean} [options.visible=true] visibility of node
 * @param {boolean} [options.selectable=true] a boolean to determine if selection should consider this shape
 * @param {string} [options.id=null] id of the node , its a unique identifier
 * @param {object} [options.tag=null] custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
 * @param {string} [options.cssclass] The ccs class name of this node
 * @param {number} [top] y coordinate of the top left corner
 * @param {number} [right] x coordinate of the bottom right corner (if 'width' not specified)
 * @param {number} [bottom] y coordinate of the bottom right corner (if 'height' not specified)
 */
geotoolkit.scene.shapes.RectangularShape = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.RectangularShape} src Source to copy from
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.copyConstructor = function(src){};
    /**
     * Returns the X coordinate of the center of the framing
     * rectangle of this rectangular shape.
     * @returns {number}
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.getCenterX = function(){};
    /**
     * Returns the Y coordinate of the center of the framing
     * rectangle of this rectangular shape.
     * @returns {number}
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.getCenterY = function(){};
    /**
     * Returns the X coordinate of the left bottom corner of the framing rectangle.
     * @returns {number}
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.getX = function(){};
    /**
     * Returns the Y coordinate of the left bottom corner of
     * the framing rectangle.
     * @returns {number}
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.getY = function(){};
    /**
     * Returns the width of the framing rectangle.
     * @returns {number}
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.getWidth = function(){};
    /**
     * Returns the height of the framing rectangle.
     * @returns {number}
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.getHeight = function(){};
    /**
     * Return bounds. Will also lock the bounds so they cannot be directly modified.
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.getBounds = function(){};
    /**
     * Sets the location and size of the framing rectangle of this
     * rectangular shape to the specified values. This method is the same as setRect.
     *
     * @param {number|geotoolkit.util.Rect} x1 x coordinate of the top left corner
     * @param {number} [y1] y coordinate of the top left corner
     * @param {number} [x2] x coordinate of the bottom right corner
     * @param {number} [y2] y coordinate of the bottom right corner
     * @returns {geotoolkit.scene.shapes.RectangularShape} this
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.setBounds = function(x1, y1, x2, y2){};
    /**
     * Specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle | object} layoutStyle desired layout style
     * @returns {geotoolkit.scene.shapes.RectangularShape}
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.setLayoutStyle = function(layoutStyle){};
    /**
     * Return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.getLayoutStyle = function(){};
    /**
     * Sets the location and size of the framing rectangle of this
     * rectangular shape to the specified values.
     *
     * @param {number|geotoolkit.util.Rect} x1 x coordinate of the top left corner
     * @param {number} [y1] y coordinate of the top left corner
     * @param {number} [x2] x coordinate of the bottom right corner
     * @param {number} [y2] y coordinate of the bottom right corner
     * @returns {geotoolkit.scene.shapes.RectangularShape}
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.setRect = function(x1, y1, x2, y2){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.invalidate = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {geotoolkit.util.Rect} [props.bounds] shape bounds
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.util.Rect | object} [properties.bounds] shape bounds
     * @returns {geotoolkit.scene.shapes.RectangularShape}
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.setProperties = function(properties){};
    /**
     * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
     * @returns {geotoolkit.scene.shapes.RectangularShape} this
     */
    geotoolkit.scene.shapes.RectangularShape.prototype.invalidateLayout = function(){};

/**
 * Defines rectangle node
 *
 * @class geotoolkit.scene.shapes.Rectangle
 * @augments geotoolkit.scene.shapes.RectangularShape
 * @param {number | object} [options] x coordinate of the top left corner
 * @param {number} [options.left] x coordinate of the top left corner
 * @param {number} [options.top] y coordinate of the top left corner
 * @param {number} [options.right] x coordinate of the bottom right corner (if 'width' not specified)
 * @param {number} [options.bottom] y coordinate of the bottom right corner (if 'height' not specified)
 * @param {number} [options.width] width (if 'right' not specified)
 * @param {number} [options.height] height (if 'bottom' not specified)
 * @param {number} [options.radius] This defines if the rectangle has rounded border corners. 'radius' is the length denoting a radius for the rounded border of each corner.
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle] style applied on outline
 * @param {geotoolkit.attributes.FillStyle|string|object} [options.fillstyle] style applied on fill
 * @param {boolean} [options.visible=true] visibility of node
 * @param {boolean} [options.selectable=true] a boolean to determine if selection should consider this shape
 * @param {string} [options.id=null] id of the node , its a unique identifier
 * @param {object} [options.tag=null] custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
 * @param {string} [options.cssclass] The ccs class name of this node
 * @param {number} [top] y coordinate of the top left corner
 * @param {number} [right] x coordinate of the bottom right corner (if 'width' not specified)
 * @param {number} [bottom] y coordinate of the bottom right corner (if 'height' not specified)
 */
geotoolkit.scene.shapes.Rectangle = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Rectangle} src Source to copy from
     * @returns {geotoolkit.scene.shapes.Rectangle}
     */
    geotoolkit.scene.shapes.Rectangle.prototype.copyConstructor = function(src){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.shapes.Rectangle.prototype.render = function(context){};
    /**
     * Set border radius in model coordinates.
     * @param {number} radius border radius in model coordinates
     * @returns {geotoolkit.scene.shapes.Rectangle} this
     */
    geotoolkit.scene.shapes.Rectangle.prototype.setCornerRadius = function(radius){};
    /**
     * return corner radius
     * @returns {number} radius
     */
    geotoolkit.scene.shapes.Rectangle.prototype.getCornerRadius = function(){};
    /**
     * Sets fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.scene.shapes.Rectangle}
     */
    geotoolkit.scene.shapes.Rectangle.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Sets line style
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.scene.shapes.Rectangle} this
     */
    geotoolkit.scene.shapes.Rectangle.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Update state
     * @override
     */
    geotoolkit.scene.shapes.Rectangle.prototype.updateState = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {geotoolkit.util.Rect} [props.bounds] shape bounds
     */
    geotoolkit.scene.shapes.Rectangle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {number} [properties.radius] corner radius
     * @returns {geotoolkit.scene.shapes.Rectangle}
     */
    geotoolkit.scene.shapes.Rectangle.prototype.setProperties = function(properties){};

/**
 * Defines ellipse node which is an elongated circle defined by a bounding frame.
 *
 * @class geotoolkit.scene.shapes.Ellipse
 * @augments geotoolkit.scene.shapes.RectangularShape
 * @param {number | object} [centerX] - x coordinate of the center
 * @param {number | object} [centerX.centerx] - x coordinate of the center
 * @param {number} [centerX.centery] - y coordinate of the center
 * @param {number} [centerX.radiusx] - radius along the x axis
 * @param {number} [centerX.radiusy] - radius along the y axis
 * @param {boolean} [centerX.visible] - visibility
 * @param {geotoolkit.attributes.LineStyle|string|object} [centerX.linestyle] - style applied on outline
 * @param {geotoolkit.attributes.FillStyle|string|object} [centerX.fillstyle] - style applied on fill
 * @param {number} [centerY] - y coordinate of the center
 * @param {number} [radiusX] - radius along the x axis
 * @param {number} [radiusY] - radius along the y axis
 * @param {boolean} [visible] - visibility
 * @param {geotoolkit.attributes.LineStyle|string|object} [linestyle] - style applied on outline
 * @param {geotoolkit.attributes.FillStyle|string|object} [fillstyle] - style applied on fill
 */
geotoolkit.scene.shapes.Ellipse = {};
    /**
     * Creates ellipse
     * @param {number | object} [x]
     * x coordinate of the center OR options to specify ellipse { x : {number}, y : {number}, radiusX :
     * {number}, radiusY : {number} }
     * @param {number} [y]
     * y coordinate of the center
     * @param {number} [radiusX]
     * radius along the x axis
     * @param {number} [radiusY]
     * radius along the y axis
     * @returns {geotoolkit.scene.shapes.Ellipse}
     */
    geotoolkit.scene.shapes.Ellipse.prototype.setEllipse = function(x, y, radiusX, radiusY){};
    /**
     * Render
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @override
     */
    geotoolkit.scene.shapes.Ellipse.prototype.render = function(context){};

/**
 * Defines AnnulusArc node
 *
 * @class geotoolkit.scene.shapes.AnnulusArc
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {number | object} [x] x coordinate of the center
 * @param {number} [x.x] - x coordinate of the center
 * @param {number} [x.y] - y coordinate of the center
 * @param {number} [x.innerradius] innerRadius
 * @param {number} [x.outerradius] outerRadius
 * @param {number} [x.startarc] start arc
 * @param {number} [x.endarc] end arc
 * @param {number} [x.sweepsngle] sweep angle of the arc
 * @param {number} [y] y coordinate of the center
 * @param {number} [innerRadius] innerRadius
 * @param {number} [outerRadius] outerRadius
 * @param {number} [startArc] start arc
 * @param {number} [endArc] end arc
 */
geotoolkit.scene.shapes.AnnulusArc = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.AnnulusArc} src Source to copy from
     * @returns {geotoolkit.scene.shapes.AnnulusArc}
     */
    geotoolkit.scene.shapes.AnnulusArc.prototype.copyConstructor = function(src){};
    /**
     * Creates arc
     * @param {number | object} [x]
     * x coordinate of the center OR options to specify ellipse { x : {number}, y : {number}, radius :
     * {number}, startArc : {number}, endArc: {number} }
     * @param {object} [x.x] - x coordinate of the center
     * @param {number} [x.y] - y coordinate of the center
     * @param {number} [x.innerradius] innerRadius
     * @param {number} [x.outerradius] outerRadius
     * @param {number} [x.startarc] start arc
     * @param {number} [x.endarc] end arc
     * @param {number} [y]
     * y coordinate of the center
     * @param {number} [innerRadius] innerRadius
     * @param {number} [outerRadius] outerRadius
     * @param {number} [startArc] start arc
     * @param {number} [endArc] end arc
     *
     * @returns {geotoolkit.scene.shapes.AnnulusArc}
     */
    geotoolkit.scene.shapes.AnnulusArc.prototype.setAnnulusArc = function(x, y, innerRadius, outerRadius, startArc, endArc){};
    /**
     * Return bounds of annulus arc, these bounds will include entire arc.
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.shapes.AnnulusArc.prototype.getBounds = function(){};
    /**
     * Render
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @override
     */
    geotoolkit.scene.shapes.AnnulusArc.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {number} [props.x] x coordinate of the center
     * @returns {number} [props.y] y coordinate of the center
     * @returns {number} [props.innerRadius] size of the inner radius
     * @returns {number} [props.outerRadius] size of the outer radius
     * @returns {number} [props.startArc] angle where the arc starts
     * @returns {number} [props.endArc] angle where the arc ends
     * @returns {geotoolkit.util.Rect} [props.bounds] shape bounds
     */
    geotoolkit.scene.shapes.AnnulusArc.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {number} [properties.x] x coordinate of the center
     * @param {number} [properties.y] y coordinate of the center
     * @param {number} [properties.innerradius] size of the innerradius
     * @param {number} [properties.outerradius] size of the outerradius
     * @param {number} [properties.startarc] angle where the arc starts
     * @param {number} [properties.endarc] angle where the arc ends
     * @param {number} [properties.sweepangle] Sweep angle of the arc
     * @param {geotoolkit.util.Rect|object} [properties.bounds] shape bounds
     * @returns {geotoolkit.scene.shapes.AnnulusArc}
     */
    geotoolkit.scene.shapes.AnnulusArc.prototype.setProperties = function(properties){};

/**
 * Defines the StripArc class, which is a modified AnnulusArc to allow "height" for pseudo-3d pie chart cap drawing
 * @class geotoolkit.scene.shapes.StripArc
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {number | object} [x]
 * x coordinate of the center OR options to specify ellipse { x : {number}, y : {number}, radius :
 * {number}, startArc : {number}, endArc: {number}, height: {number} }
 * @param {number} [y] y coordinate of the center
 * @param {number} [innerradius] innerRadius
 * @param {number} [outerradius] outerRadius
 * @param {number} [startarc] start arc
 * @param {number} [endarc] end arc
 * @param {geotoolkit.attributes.LineStyle|string|object} [linestyle] the linestyle
 * @param {geotoolkit.attributes.FillStyle|string|object} [fillstyle] the fillstyle
 * @param {number} [height] height of the arc when drawn with a "depth"
 */
geotoolkit.scene.shapes.StripArc = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.StripArc} src Source to copy from
     * @returns {geotoolkit.scene.shapes.StripArc} this
     */
    geotoolkit.scene.shapes.StripArc.prototype.copyConstructor = function(src){};
    /**
     * Sets data for the arc
     * @param {number | object} [x]
     * x coordinate of the center OR options to specify ellipse { x : {number}, y : {number}, radius :
     * {number}, startArc : {number}, endArc: {number}, height: {number} }
     * @param {number} [y]
     * y coordinate of the center
     * @param {number} [innerRadius] innerRadius
     * @param {number} [outerRadius] outerRadius
     * @param {number} [startArc] start arc
     * @param {number} [endArc] end arc
     * @param {number} [height] height of the arc when drawn with a "depth"
     */
    geotoolkit.scene.shapes.StripArc.prototype.setData = function(x, y, innerRadius, outerRadius, startArc, endArc, height){};
    /**
     * Return bounds of strip arc, these bounds will include entire arc.
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.shapes.StripArc.prototype.getBounds = function(){};
    /**
     * Render
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @override
     */
    geotoolkit.scene.shapes.StripArc.prototype.render = function(context){};
    /**
     * getProperties function
     * @returns {*}
     */
    geotoolkit.scene.shapes.StripArc.prototype.getProperties = function(){};
    /**
     * Set properties
     * @param {object} properties the properties to set
     * @param {number | object} [properties.x] x coordinate of the center
     * @param {number} [properties.y] y coordinate of the center
     * @param {number} [properties.innerradius] innerRadius
     * @param {number} [properties.outerradius] outerRadius
     * @param {number} [properties.startarc] start arc
     * @param {number} [properties.endarc] end arc
     * @param {number} [properties.height] height of the arc when drawn with a "depth"
     * @param {geotoolkit.util.Rect} [properties.bounds]
     * @returns {geotoolkit.scene.shapes.StripArc}
     */
    geotoolkit.scene.shapes.StripArc.prototype.setProperties = function(properties){};

/**
 * The Arc shape is defined by its center, radius and start/end angles.<br>
 *
 * @class geotoolkit.scene.shapes.Arc
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {number | object} [options] x coordinate of the center
 * @param {object} [options.x=0] x coordinate of the center
 * @param {number} [options.y=0] y coordinate of the center
 * @param {number} [options.radius=10] The radius of the arc
 * @param {number} [options.startarc=0] The start angle for the arc in radians
 * @param {number} [options.endarc=2*Math.PI] The end angle for the arc in radians
 * @param {number} [options.sweepArc] Defines the sweep of the arc
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle=null] style applied on outline
 * @param {geotoolkit.attributes.FillStyle|string|object} [options.fillstyle=null] style applied on fill
 * @param {boolean} [options.visible=true] visiblity of node
 * @param {boolean} [options.selectable=true] A boolean to determine if selection should consider this node
 * @param {string} [options.id=null] id of the node, its a unique identifier
 * @param {object} [options.tag=null] custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shapes
 * @param {string} [options.cssclass] The ccs class name of this node
 * @param {boolean} [options.connecttocenter] A flag which specifies if the end points of the arc should be connected to
 * center with lines, like a pie slice
 * @param {number} [y=0] y coordinate of the center
 * @param {number} [radius=10] The radius of the arc
 * @param {number} [startArc=0] The start angle for the arc in radians
 * @param {number} [endArc=2*Math.PI] The end angle for the arc in radians
 * @param {number} [sweepArc] Defines the sweep of the arc
 * @param {boolean} [connectToCenter=true] A flag which specifies if the end points of the arc should be connected to
 * center with lines, like a pie slice
 */
geotoolkit.scene.shapes.Arc = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Arc} src Source to copy from
     */
    geotoolkit.scene.shapes.Arc.prototype.copyConstructor = function(src){};
    /**
     * Set arc parameters
     * @param {number | object} [options] x coordinate of the center
     * @param {object} [options.x] x coordinate of the center
     * @param {number} [options.y] y coordinate of the center
     * @param {number} [options.radius] The radius of the arc
     * @param {number} [options.startarc] The start angle for the arc in radians
     * @param {number} [options.endarc] The end angle for the arc in radians
     * @param {number} [y] y coordinate of the center
     * @param {number} [radius] The radius of the arc
     * @param {number} [startArc] The start angle for the arc in radians
     * @param {number} [endArc] The end angle for the arc in radians
     * @param {number} [sweepArc] Defines the sweep of the arc
     * @param {boolean} [connectToCenter] connect to center
     * @returns {geotoolkit.scene.shapes.Arc}
     */
    geotoolkit.scene.shapes.Arc.prototype.setArc = function(options, y, radius, startArc, endArc, sweepArc, connectToCenter){};
    /**
     * Return bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.shapes.Arc.prototype.getBounds = function(){};
    /**
     * Render arc
     *
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @override
     */
    geotoolkit.scene.shapes.Arc.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {boolean} [props.visible] is the shape visible
     * @returns {number} [props.x] x coordinate of the center
     * @returns {number} [props.y] y coordinate of the center
     * @returns {number} [props.radius] size of the radius
     * @returns {number} [props.startarc] angle where the arc starts
     * @returns {number} [props.endarc] angle where the arc ends
     * @returns {number} [props.sweeparc] angle by which the arc sweeps
     * @returns {geotoolkit.util.Rect} [props.bounds] shape bounds
     */
    geotoolkit.scene.shapes.Arc.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {number} [properties.x] x coordinate of the center
     * @param {number} [properties.y] y coordinate of the center
     * @param {number} [properties.radius] size of the radius
     * @param {number} [properties.startarc] angle where the arc starts
     * @param {number} [properties.endarc] angle where the arc ends
     * @param {number} [properties.sweeparc] Defines the sweep of the arc
     * @param {boolean} [properties.connecttocenter] A flag which specifies if the end points of the arc should be connected to center with lines, like a pie slice
     * @param {geotoolkit.util.Rect|object} [properties.bounds] shape bounds
     * @returns {geotoolkit.scene.shapes.Arc}
     */
    geotoolkit.scene.shapes.Arc.prototype.setProperties = function(properties){};

/**
 * Defines image node. Image shapes help in manipulating pictures and support all common transformations such as scaling and rotation.<br>
 * Image shapes also support the anchoring technique.
 * @class geotoolkit.scene.shapes.Image
 * @augments geotoolkit.scene.shapes.AnchoredShape
 * @param {number | object} [x] left
 * @param {number} [x.x] left
 * @param {number} [x.y] top
 * @param {string} [x.url] Image dataUrls
 * @param {number} [x.w] width
 * @param {number} [x.h] height
 * @param {number} [x.opacity=1] image opacity (from 0 to 1)
 * @param {?HTMLImageElement} [x.image=null] an instance of image instead of url
 * @param {geotoolkit.util.AnchorType} [x.alignment] alignment
 * @param {boolean} [x.sizeisindevicespace] image size is in pixel
 * @param {string | null} [x.crossorigin] cross origin to set when loading images
 * @param {number} [y] top
 * @param {string} [url] Image dataUrls
 * @param {number} [w] - width
 * @param {number} [h] - height
 * @param {geotoolkit.util.AnchorType} [alignment]
 * @param {boolean} [sizeisindevicespace] image size is in pixel
 */
geotoolkit.scene.shapes.Image = {};
    /**
     * Image's Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.scene.shapes.Image.Events = {};
        /**
         * Event type fired when an image is done loading
         * @type {string}
         */
        geotoolkit.scene.shapes.Image.Events.ImageLoaded = "";
        /**
         * Event type fired if an image loading is failed
         * @type {string}
         */
        geotoolkit.scene.shapes.Image.Events.ImageFailed = "";
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Image} src Source to copy from
     * @returns {geotoolkit.scene.shapes.Image} this
     */
    geotoolkit.scene.shapes.Image.prototype.copyConstructor = function(src){};
    /**
     * LoadImage image
     */
    geotoolkit.scene.shapes.Image.prototype.loadImage = function(){};
    /**
     * Render image
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.shapes.Image.prototype.render = function(context){};
    /**
     * Sets image opacity
     * @param {number} opacity image opacity from 0 to 1
     * @returns {geotoolkit.scene.shapes.Image} this
     */
    geotoolkit.scene.shapes.Image.prototype.setOpacity = function(opacity){};
    /**
     * Returns current image opacity
     * @returns {number} opacity
     */
    geotoolkit.scene.shapes.Image.prototype.getOpacity = function(){};
    /**
     * Returns this images aspect ratio, width over height
     * @returns {number} ratio
     */
    geotoolkit.scene.shapes.Image.prototype.getAspectRatio = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {string} [props.url] Image dataUrls
     * @returns {string} [props.alt] alternative text
     * @returns {HTMLImageElement} [props.image] image
     */
    geotoolkit.scene.shapes.Image.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {string} [properties.url] Image dataUrls
     * @param {string} [properties.alt] alternative text
     * @param {HTMLImageElement} [properties.image] image
     * @returns {geotoolkit.scene.shapes.Image}
     */
    geotoolkit.scene.shapes.Image.prototype.setProperties = function(properties){};
    /**
     * Gets image element
     * @returns {HTMLImageElement} image
     */
    geotoolkit.scene.shapes.Image.prototype.getImage = function(){};

/**
 * Defines Path node
 *
 * @class geotoolkit.scene.shapes.Path
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {object | boolean} [options] options or visible flag
 * @param {boolean} [options.visible = true] visibility of the path
 * @param {geotoolkit.renderer.GraphicsPath} [options.geometry=new geotoolkit.renderer.GraphicsPath()] geometry the path
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle=new geotoolkit.attributes.LineStyle()] linestyle
 * @param {geotoolkit.attributes.LineStyle|string|object} [linestyle] linestyle
 */
geotoolkit.scene.shapes.Path = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Path} src Source to copy from
     */
    geotoolkit.scene.shapes.Path.prototype.copyConstructor = function(src){};
    /**
     * Remove all of this path's points.
     * @returns {geotoolkit.scene.shapes.Path}
     */
    geotoolkit.scene.shapes.Path.prototype.clear = function(){};
    /**
     * Add command to move the current position.
     *
     * @param {number} x The x-coordinate of the destination point
     * @param {number} y The y-coordinate of the destination point
     * @returns {geotoolkit.scene.shapes.Path}
     */
    geotoolkit.scene.shapes.Path.prototype.moveTo = function(x, y){};
    /**
     * Close path
     *
     * @returns {geotoolkit.scene.shapes.Path} this
     */
    geotoolkit.scene.shapes.Path.prototype.close = function(){};
    /**
     * Add command to draw a line from the current position to specified point
     *
     * @param {number} x The x-coordinate of the destination point
     * @param {number} y The y-coordinate of the destination point
     * @returns {geotoolkit.scene.shapes.Path} this
     */
    geotoolkit.scene.shapes.Path.prototype.lineTo = function(x, y){};
    /**
     * Add command to draw an arc from the current position to specified point
     *
     * @param {number} x1 The x-coordinate of the destination point
     * @param {number} y1 The y-coordinate of the destination point
     * @param {number} x2 x-coordinate of control point
     * @param {number} y2 y-coordinate of control point
     * @param {number} radius The radius of arc
     * @returns {geotoolkit.scene.shapes.Path} this
     */
    geotoolkit.scene.shapes.Path.prototype.arcTo = function(x1, y1, x2, y2, radius){};
    /**
     * Draws a cubic Bezier curve from the current point to the point (x, y),
     * with control points (cp1x, cp1y) and (cp2x, cp2y).
     *
     * @param {number | object} cp1x
     * the the x coordinate of the first control point OR options to specify bezier curve { x : {number}, y : {number},
     * cp1x : {number}, cp1y : {number}, cp2x : {number}, cp2y :
     * {number} }
     * @param {number} cp1y the y coordinate of the first control point
     * @param {number} cp2x the x coordinate of the second control point
     * @param {number} cp2y the y coordinate of the second control point
     * @param {number} x the x coordinate of the end point
     * @param {number} y the y coordinate of the end point
     * @returns {geotoolkit.scene.shapes.Path}
     */
    geotoolkit.scene.shapes.Path.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y){};
    /**
     * Return bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.shapes.Path.prototype.getBounds = function(){};
    /**
     * Render
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @returns {geotoolkit.scene.shapes.Path}
     */
    geotoolkit.scene.shapes.Path.prototype.render = function(context){};
    /**
     * Update geometry
     * @deprecated since 2.6
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.scene.shapes.Path.prototype.updateGeometry = function(context){};
    /**
     * Returns the geometry of this item as a GeometryPath in
     * model coordinates.
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.scene.shapes.Path.prototype.getGeometry = function(){};
    /**
     * Sets a geometry for the path in model coordinates
     * @param {geotoolkit.renderer.GraphicsPath} geometry New geometry
     * @returns {geotoolkit.scene.shapes.Path}
     */
    geotoolkit.scene.shapes.Path.prototype.setGeometry = function(geometry){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.scene.shapes.Path.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set see {@link geotoolkit.renderer.GraphicsPath#setProperties}
     * @returns {geotoolkit.scene.shapes.Path}
     */
    geotoolkit.scene.shapes.Path.prototype.setProperties = function(properties){};

/**
 * Defines text label. Text shapes support various kinds of text strings in the model. Anchoring technique allows developer to specify location of the text relative to anchor point.<br>
 * Other attributes like text size and style can also be set.
 *
 * @class geotoolkit.scene.shapes.Text
 * @augments geotoolkit.scene.shapes.AnchoredShape
 * @param {string|object} [options] text to display or object, which contains shape properties
 * @param {string} [options.text] text to display
 * @param {number} [options.ax] x coordinate of anchor
 * @param {number} [options.ay] y coordinate of anchor
 * @param {number} [options.width] desired width
 * @param {number} [options.height] desired height
 * @param {geotoolkit.attributes.TextStyle|string|object} [options.textstyle] textStyle to display
 * @param {boolean} [options.sizeisindevicespace] size Is In Device Space
 * @param {geotoolkit.util.AnchorType} [options.alignment] anchor type
 * @param {boolean} [options.visible=true] visibility of node
 * @param {boolean} [options.selectable=true] a boolean to determine if selection should consider this shape
 * @param {string} [options.id=null] id of the node , its a unique identifier
 * @param {object} [options.tag=null] custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
 * @param {string} [options.cssclass] The ccs class name of this node
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle] linestyle of border rectangle
 * @param {geotoolkit.attributes.FillStyle|string|object} [options.fillstyle] fillstyle of border rectangle
 * @param {number} [ax] x coordinate of anchor
 * @param {number} [ay] y coordinate of anchor
 * @param {number} [width] desired width
 * @param {number} [height] desired height
 * @param {geotoolkit.attributes.TextStyle|string|object} [textStyle] textStyle to display
 * @param {boolean} [sizeIsInDeviceSpace=false] size Is In Device Space
 * @param {boolean} [showellipsis=false] boolean flag that enables/disables ellipsis in case if text is too long
 * @param {geotoolkit.util.AnchorType} [alignment] anchor type
 */
geotoolkit.scene.shapes.Text = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Text} src Source to copy from
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.copyConstructor = function(src){};
    /**
     * Enum of size modes (to specify that size mode depends from width and height use Text.SizeMode.FixedWidth | Text.SizeMode.FixedHeight)
     * @enum
     * @readonly
     */
    geotoolkit.scene.shapes.Text.SizeMode = {};
        /**
         * From Font: calculates text size based only on font
         * @type {number}
         */
        geotoolkit.scene.shapes.Text.SizeMode.FromFont = NaN;
        /**
         * Fixed Width: calculates text size based on width
         * @type {number}
         */
        geotoolkit.scene.shapes.Text.SizeMode.FixedWidth = NaN;
        /**
         * Fixed Height: calculates text size based on height
         * @type {number}
         */
        geotoolkit.scene.shapes.Text.SizeMode.FixedHeight = NaN;
        /**
         * From Font when possible: calculates text size based only on font. Makes it fit width/height if text too big.
         * @type {number}
         */
        geotoolkit.scene.shapes.Text.SizeMode.FromFontWhenPossible = NaN;
        /**
         * Wrapped Width: adds line breaks between words to fit it into a user defined width
         * Will not Split words that are larger than Width
         * *WARNING* This is an expensive operation and using it for very large pieces of texts is not advised
         * If you know your width and font and will not be changing these it is better to manually split the line yourself
         * @type {number}
         */
        geotoolkit.scene.shapes.Text.SizeMode.WrappedWidth = NaN;
        /**
         * WrappedWidthSplitWords: adds line breaks to text to fit it into a user defined width
         * Will Split words that are larger than Width
         * *WARNING* This is an expensive operation and using it for very large pieces of texts is not advised
         * If you know your width and font and will not be changing these it is better to manually split the line yourself
         * @type {number}
         */
        geotoolkit.scene.shapes.Text.SizeMode.WrappedWidthSplitWords = NaN;
    /**
     * Calculates the size from text style
     *
     * @param {string} text to be measured
     * @param {geotoolkit.attributes.TextStyle} textStyle text style
     * @returns {geotoolkit.util.Rect} layout measurement of the text as a rect
     */
    geotoolkit.scene.shapes.Text.prototype.recalculateLayout = function(text, textStyle){};
    /**
     * Returns the text string that will be rendered depending on textStyle's wrapping value.
     * @returns {string} the text string that will be rendered
     */
    geotoolkit.scene.shapes.Text.prototype.getDisplayableText = function(){};
    /**
     * Set show ellipsis
     * @param {boolean} showEllipsis showEllipsis boolean flag that enables/disables ellipsis in case if text is too long
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setShowEllipsis = function(showEllipsis){};
    /**
     * Returns ellipsis flag
     * @returns {boolean} ellipsis flag
     */
    geotoolkit.scene.shapes.Text.prototype.getShowEllipsis = function(){};
    /**
     * Sets how text size is computed
     * @param {geotoolkit.scene.shapes.Text.SizeMode|string} sizeMode Enum of size modes
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setSizeMode = function(sizeMode){};
    /**
     * Returns how the size is computed
     * @returns {geotoolkit.scene.shapes.Text.SizeMode|string} sizeMode
     */
    geotoolkit.scene.shapes.Text.prototype.getSizeMode = function(){};
    /**
     * Get this text's contents as a string.
     *
     * @returns {string} text
     */
    geotoolkit.scene.shapes.Text.prototype.getText = function(){};
    /**
     * The style associated with this text.
     *
     * @returns {geotoolkit.attributes.TextStyle} textStyle
     */
    geotoolkit.scene.shapes.Text.prototype.getTextStyle = function(){};
    /**
     * Sets rectangle geometry.
     *
     * @param {number} x1
     * x coordinate of the top left corner
     * @param {number} y1
     * y coordinate of the top left corner
     * @param {number} x2
     * x coordinate of the bottom right corner
     * @param {number} y2
     * y coordinate of the bottom right corner
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setRect = function(x1, y1, x2, y2){};
    /**
     * Update the string this text displays.
     *
     * @param {string} text new text for this shape *
     * can contains text formatting tags, <p> <font> <b> <strong> <i> <em> <mark> <small> <del> <ins> <sub> <sup>
     * see https://www.w3schools.com/html/html_formatting.asp
     * each tags except <br> can contains style attribute with set of 'font-size', 'font-family', 'font-weight', 'font-style', 'font-color' properties
     *
     * @example
     * text.setText('Temperature <b style="font-color:red">110&deg;</b> (<i style="font-color:gray">Fahrenheit</i>')
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setText = function(text){};
    /**
     * Set size
     * @param {number} width text width
     * @param {number} height text height
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setSize = function(width, height){};
    /**
     * Called internally to save user size.
     *
     * @param {number} width width
     * @param {number} height height
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setUserSize = function(width, height){};
    /**
     * Set text width. If width set to zero, text will accept size from font.
     *
     * @param {number} width text width
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setWidth = function(width){};
    /**
     * Set text height. If height set to zero, text will get its height from font.
     *
     * @param {number} height text height
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setHeight = function(height){};
    /**
     * Set text style
     *
     * @param {geotoolkit.attributes.TextStyle|string|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Set border radius in device coordinates.
     * @param {number} radius border radius in device coordinates
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setCornerRadius = function(radius){};
    /**
     * return corner radius
     * @returns {number} radius
     */
    geotoolkit.scene.shapes.Text.prototype.getCornerRadius = function(){};
    /**
     * Set inner padding in device coordinates.
     * @param {number} padding inner padding in device coordinates
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.setPadding = function(padding){};
    /**
     * return inner padding
     * @returns {number} radius
     */
    geotoolkit.scene.shapes.Text.prototype.getPadding = function(){};
    /**
     * Render
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.shapes.Text.prototype.render = function(context){};
    /**
     * Update geometry
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {geotoolkit.scene.shapes.Text} this
     */
    geotoolkit.scene.shapes.Text.prototype.updateGeometry = function(context){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.Text.prototype.updateState = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {string} [props.text] text
     * @returns {geotoolkit.attributes.TextStyle} [props.textstyle] textStyle
     * @returns {geotoolkit.util.Rect} [props.bounds] shape bounds
     * @returns {string} [props.state] state
     * @returns {geotoolkit.util.Rect} [props.layout] layout
     * @returns {geotoolkit.scene.shapes.Text.SizeMode|string} [props.sizemode] enum size mode
     * @returns {boolean} [props.ellipsis] ellipsis flag
     * @returns {number} [props.userheight] height
     * @returns {number} [props.userwidth] width
     * @returns {number} [props.radius] radius
     * @returns {number} [props.padding] padding
     */
    geotoolkit.scene.shapes.Text.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {string} [properties.text] text
     * @param {geotoolkit.attributes.TextStyle|object} [properties.textstyle] JSON containing the properties to set TextStyle. See {geotoolkit.attributes.TextStyle#setProperties}
     * @param {string} [properties.state] state
     * @param {geotoolkit.scene.shapes.Text.SizeMode|string} [properties.sizemode] enum size mode
     * @param {boolean} [properties.ellipsis] ellipsis flag
     * @param {number} [properties.userheight] height
     * @param {number} [properties.userwidth] width
     * @param {number} [properties.radius] radius
     * @param {number} [properties.padding] padding
     * @returns {geotoolkit.scene.shapes.Text}
     */
    geotoolkit.scene.shapes.Text.prototype.setProperties = function(properties){};
    /**
     * Disposes the Text
     * @override
     */
    geotoolkit.scene.shapes.Text.prototype.dispose = function(){};
    /**
     * invalidate Method
     * @returns {function} method to invalidate this object
     */
    geotoolkit.scene.shapes.Text.prototype.getInvalidateMethod = function(){};

/**
 * A polygon node which is defined by arrays of points.
 *
 * @class geotoolkit.scene.shapes.Polygon
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {Array.<number>|object} options set of x coordinates or object, which contains shape properties
 * @param {Array.<number>} [options.x] set of x coordinates
 * @param {Array.<number>} [options.y] set of y coordinates
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle] style applied on outline
 * @param {geotoolkit.attributes.FillStyle|string|object} [options.fillstyle] apply polygon fillstyle
 * @param {boolean} [options.visible=true] visibility of node
 * @param {boolean} [options.selectable=true] a boolean to determine if selection should consider this shape
 * @param {string} [options.id=null] id of the node , its a unique identifier
 * @param {object} [options.tag=null] custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
 * @param {string} [options.cssclass] The ccs class name of this node
 * @param {Array.<number>} [y] set of y coordinates
 * @param {boolean} [visible=true]
 * @param {geotoolkit.attributes.LineStyle|string|object} [linestyle=null]
 * @param {geotoolkit.attributes.FillStyle|string|object} [fillstyle=null] apply polygon fillstyle
 */
geotoolkit.scene.shapes.Polygon = {};
    /**
     * Returns path geometry of the polygon
     * @returns {geotoolkit.renderer.GraphicsPath}
     */
    geotoolkit.scene.shapes.Polygon.prototype.getGeometry = function(){};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Polygon} src Source to copy from
     * @returns {geotoolkit.scene.shapes.Polygon}
     */
    geotoolkit.scene.shapes.Polygon.prototype.copyConstructor = function(src){};
    /**
     * Returns bounds and locks the bounds rect from further editing.
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.scene.shapes.Polygon.prototype.getBounds = function(){};
    /**
     * Sets arrays of points. Will overwrite any existing points in this polygon.
     *
     * @param {number[]} x array of x coordinates
     * @param {number[]} y array of y coordinates
     * @returns {geotoolkit.scene.shapes.Polygon} this
     */
    geotoolkit.scene.shapes.Polygon.prototype.setCoordinates = function(x, y){};
    /**
     * Adds point to array of points.
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     * @returns {geotoolkit.scene.shapes.Polygon} this
     */
    geotoolkit.scene.shapes.Polygon.prototype.push = function(x, y){};
    /**
     * Gets x-coords of points
     * @returns {number[]} array of x-coordinates
     */
    geotoolkit.scene.shapes.Polygon.prototype.getPointsX = function(){};
    /**
     * Gets y-coords of points
     * @returns {number[]} array of y-coordinates
     */
    geotoolkit.scene.shapes.Polygon.prototype.getPointsY = function(){};
    /**
     * Gets number of points
     * @returns {number} points the number of points in this polygon
     */
    geotoolkit.scene.shapes.Polygon.prototype.getSize = function(){};
    /**
     * Render
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.scene.shapes.Polygon.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {number[]} [props.x] set of x coordinates
     * @returns {number[]} [props.y] set of y coordinates
     * @returns {number} [props.npts] number of points
     */
    geotoolkit.scene.shapes.Polygon.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {number[]} [properties.x] set of x coordinates
     * @param {number[]} [properties.y] set of y coordinates
     * @returns {geotoolkit.scene.shapes.Polygon} this
     */
    geotoolkit.scene.shapes.Polygon.prototype.setProperties = function(properties){};

/**
 * A line defined by x and y arrays of coordinates.
 *
 * @class geotoolkit.scene.shapes.Polyline
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {Array.<number>|object} options set of x coordinates or object, which contains shape properties
 * @param {Array.<number>} [options.x] set of x coordinates
 * @param {Array.<number>} [options.y] set of y coordinates
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle] style applied on outline
 * @param {boolean} [options.visible=true] visibility of node
 * @param {boolean} [options.selectable=true] a boolean to determine if selection should consider this shape
 * @param {string} [options.id=null] id of the node , its a unique identifier
 * @param {object} [options.tag=null] custom information associated with node. It is a user object which can be used by client code to store information or attach an application object to the shape
 * @param {string} [options.cssclass] The ccs class name of this node
 * @param {Array.<number>} [y] set of y coordinates
 * @param {boolean} [visible=true]
 * @param {geotoolkit.attributes.LineStyle|string|object} [linestyle='black']
 */
geotoolkit.scene.shapes.Polyline = {};
    /**
     * Enum of rendering optimization types
     * @enum
     * @readonly
     */
    geotoolkit.scene.shapes.Polyline.OptimizationType = {};
        /**
         * Filter points which are close to each other and are rendered in one pixel
         * @type {number}
         */
        geotoolkit.scene.shapes.Polyline.OptimizationType.FilterClosePoints = NaN;
        /**
         * Ramer–Douglas–Peucker optimization
         * @type {number}
         */
        geotoolkit.scene.shapes.Polyline.OptimizationType.RDP = NaN;
    /**
     * Sets optimization type
     * @param {geotoolkit.scene.shapes.Polyline.OptimizationType} optimizationType optimization type which used with current line
     * @returns {geotoolkit.scene.shapes.Polyline} this
     */
    geotoolkit.scene.shapes.Polyline.prototype.setOptimizationType = function(optimizationType){};
    /**
     * Returns optimization type
     * @returns {geotoolkit.scene.shapes.Polyline.OptimizationType} optimization type
     */
    geotoolkit.scene.shapes.Polyline.prototype.getOptimizationType = function(){};
    /**
     * Turns on/off optimization for line
     * @param {boolean} [needOptimization] Is optimization for line on
     * @returns {geotoolkit.scene.shapes.Polyline} this
     */
    geotoolkit.scene.shapes.Polyline.prototype.setOptimization = function(needOptimization){};
    /**
     * Returns current optimization state
     * @returns {boolean} optimization state
     */
    geotoolkit.scene.shapes.Polyline.prototype.getOptimization = function(){};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Polyline} src Source to copy from
     * @returns {geotoolkit.scene.shapes.Polyline} this
     */
    geotoolkit.scene.shapes.Polyline.prototype.copyConstructor = function(src){};
    /**
     * Check collision
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} true if object is inside of rendering area
     * @this {geotoolkit.scene.Node}
     */
    geotoolkit.scene.shapes.Polyline.prototype.checkCollision = function(context){};
    /**
     * Update shape bounds
     * @returns {geotoolkit.scene.shapes.Polyline}
     */
    geotoolkit.scene.shapes.Polyline.prototype.updateBounds = function(){};
    /**
     * Return bounds
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.scene.shapes.Polyline.prototype.getBounds = function(){};
    /**
     * Sets arrays of points
     *
     * @param {Array.<number>} x an array of x coordinates
     * @param {Array.<number>} y an array of y coordinates
     * @returns {geotoolkit.scene.shapes.Polyline} this
     */
    geotoolkit.scene.shapes.Polyline.prototype.setCoordinates = function(x, y){};
    /**
     * Add point to array of points.
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {geotoolkit.scene.shapes.Polyline} this
     */
    geotoolkit.scene.shapes.Polyline.prototype.push = function(x, y){};
    /**
     * Gets x-coords of points
     * @returns {number[]}
     */
    geotoolkit.scene.shapes.Polyline.prototype.getPointsX = function(){};
    /**
     * Gets y-coords of points
     * @returns {number[]}
     */
    geotoolkit.scene.shapes.Polyline.prototype.getPointsY = function(){};
    /**
     * @returns {number} a number of the points
     */
    geotoolkit.scene.shapes.Polyline.prototype.getSize = function(){};
    /**
     * Render
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {geotoolkit.scene.shapes.Polyline} this
     */
    geotoolkit.scene.shapes.Polyline.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [properties] JSON containing properties
     * @returns {string} [properties.optimization] optimization settings 'none' | 'rdp' | 'closepoints'
     * @returns {number[]} [properties.x] set of x coordinates
     * @returns {number[]} [properties.y] set of y coordinates
     * @returns {number} [properties.npts] number of points
     */
    geotoolkit.scene.shapes.Polyline.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @override
     * @param {object} [properties] JSON containing the properties to set
     * @param {boolean|string} [properties.optimization] optimization type boolean || ['none' | 'rdp' | 'closepoints']
     * @param {number[]} [properties.x] set of x coordinates
     * @param {number[]} [properties.y] set of y coordinates
     * @returns {geotoolkit.scene.shapes.Polyline}
     */
    geotoolkit.scene.shapes.Polyline.prototype.setProperties = function(properties){};

/**
 * The set of polyline shape.
 *
 * @class geotoolkit.scene.shapes.PolylineSet
 * @augments geotoolkit.scene.shapes.ScaledShape
 */
geotoolkit.scene.shapes.PolylineSet = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.PolylineSet} src Source to copy from
     */
    geotoolkit.scene.shapes.PolylineSet.prototype.copyConstructor = function(src){};
    /**
     * Add new polyline segment
     * @param {Array<number>} x x-coordinates
     * @param {Array<number>} y y-coordinates
     */
    geotoolkit.scene.shapes.PolylineSet.prototype.add = function(x, y){};
    /**
     * Return bounds and lock bounds rect from modification.
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.scene.shapes.PolylineSet.prototype.getBounds = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.scene.shapes.PolylineSet.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.util.Rect} [properties.bounds] bounds of the model
     * @param {geotoolkit.scene.shapes.PolylineSegment} [properties.segments] polyline segment
     * @returns {geotoolkit.scene.shapes.PolylineSet}
     */
    geotoolkit.scene.shapes.PolylineSet.prototype.setProperties = function(properties){};

/**
 * The set of polyline shape.
 *
 * @class geotoolkit.scene.shapes.PolylineSegment
 */
geotoolkit.scene.shapes.PolylineSegment = {};
    /**
     * Return bounds
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.scene.shapes.PolylineSegment.prototype.getBounds = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {number[]} [props.x] set of x coordinates
     * @returns {number[]} [props.y] set of y coordinates
     * @returns {geotoolkit.util.Rect} [props.bounds] shape bounds
     * @returns {number} [props.npts] number of points
     */
    geotoolkit.scene.shapes.PolylineSegment.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {number[]} [properties.x] set of x coordinates
     * @param {number[]} [properties.y] set of y coordinates
     * @param {geotoolkit.util.Rect | object} [properties.bounds] shape bounds
     * @returns {geotoolkit.scene.shapes.PolylineSegment}
     */
    geotoolkit.scene.shapes.PolylineSegment.prototype.setProperties = function(properties){};

/**
 * Spline curve where the polynomial of each spline is in bezier form
 *
 * @class geotoolkit.scene.shapes.BezierSpline
 */
geotoolkit.scene.shapes.BezierSpline = {};

/**
 * Define spline shape
 *
 * @class geotoolkit.scene.shapes.Spline
 * @augments geotoolkit.scene.shapes.Path
 * @param {Array.<number> | object} x coordinates
 * @param {Array.<number>} [x.x] x coordinates
 * @param {Array.<number>} [x.y] y coordinates
 * @param {geotoolkit.attributes.LineStyle|string|object} [x.linestyle] line style
 * @param {Array.<number>} [y] coordinates
 * @param {geotoolkit.attributes.LineStyle|string|object} [linestyle] style
 */
geotoolkit.scene.shapes.Spline = {};
    /**
     * Sets arrays of points
     *
     * @param {Array.<number>} x x coordinates
     * @param {Array.<number>} y y coordinates
     * @returns {geotoolkit.scene.shapes.Spline} this
     */
    geotoolkit.scene.shapes.Spline.prototype.setCoordinates = function(x, y){};
    /**
     * Gets x-coords of points
     * @returns {number[]}
     */
    geotoolkit.scene.shapes.Spline.prototype.getPointsX = function(){};
    /**
     * Gets y-coords of points
     * @returns {number[]}
     */
    geotoolkit.scene.shapes.Spline.prototype.getPointsY = function(){};
    /**
     * @returns {number} a number of the points
     */
    geotoolkit.scene.shapes.Spline.prototype.getSize = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {object} [props] JSON containing properties
     */
    geotoolkit.scene.shapes.Spline.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @override
     * @param {object} [properties] JSON containing the properties to set
     * @param {number[]} [properties.x] x coordinates
     * @param {number[]} [properties.y] y coordinates
     * @returns {geotoolkit.scene.shapes.Spline}
     */
    geotoolkit.scene.shapes.Spline.prototype.setProperties = function(properties){};

/**
 * Defines an abstract node to represents a big tiled image
 *
 * @class geotoolkit.scene.shapes.TiledImage
 * @deprecated since 2.6
 * @augments geotoolkit.scene.shapes.RectangularShape
 * @param {number | object} [x1]
 * x coordinate of the top left corner OR options to specify rectangle { x1 : {number}, y1 : {number}, x2 :
 * {number}, y2 : {number} }
 * @param {number} [y1]
 * y coordinate of the top left corner
 * @param {number} [x2]
 * x coordinate of the bottom right corner
 * @param {number} [y2]
 * y coordinate of the bottom right corner
 */
geotoolkit.scene.shapes.TiledImage = {};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {geotoolkit.scene.ViewCache} [props.cache] cache
     */
    geotoolkit.scene.shapes.TiledImage.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.scene.ViewCache} [properties.cache] cache
     * @returns {geotoolkit.scene.shapes.TiledImage}
     */
    geotoolkit.scene.shapes.TiledImage.prototype.setProperties = function(properties){};

/**
 * Defines shape to draw a dynamic snapped rectangle which can be used to draw borders
 *
 * @class geotoolkit.scene.shapes.Border
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {geotoolkit.attributes.LineStyle|string|object} [options] deprecated (since 2.6 function type deprecated) options object or a function to return {@link geotoolkit.util.Rect} rectangle to draw a border
 * @param {function|object} [options] deprecated (since 2.6 function type deprecated) options object or a function to return {@link geotoolkit.util.Rect} rectangle to draw a border
 * @param {function} [options.callback] deprecated a function to return {@link geotoolkit.util.Rect} rectangle to draw a border
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle='#757575'] style applied on outline
 * @param {geotoolkit.attributes.FillStyle|string|object} [options.fillstyle] style applied on fill
 * @param {object} [options.borders] style applied on borders, by default is {'left': true, 'right': true, 'bottom': true, 'top': true}
 * @param {string} [options.borderstyle="model-bounds"] style applied on borders, "visible-bounds", "visible-width", "visible-height" or "model-bounds"
 * @param {geotoolkit.attributes.FillStyle|string|object} [fillstyle] style applied on fill
 */
geotoolkit.scene.shapes.Border = {};
    /**
     * Sets the border style. Can be one from the list: "visible-bounds", "visible-width", "visible-height" or "model-bounds"
     * @param {string} style border style
     * @returns {geotoolkit.scene.shapes.Border}
     */
    geotoolkit.scene.shapes.Border.prototype.setBorderStyle = function(style){};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.scene.shapes.Border} src Source to copy from
     */
    geotoolkit.scene.shapes.Border.prototype.copyConstructor = function(src){};
    /**
     * Returns an object { left: {boolean}, right: {boolean}, bottom: {boolean}, top: {boolean} };
     * @returns {object}, where it is possible to specify the visibility of the each border
     */
    geotoolkit.scene.shapes.Border.prototype.getBorders = function(){};
    /**
     * Sets borders state
     * @param {object} borders JSON which defines border settings
     * @param {boolean} [borders.top] visibility of top part
     * @param {boolean} [borders.bottom] visibility of bottom part
     * @param {boolean} [borders.left] visibility of left part
     * @param {boolean} [borders.right] visibility of right part
     * @returns {geotoolkit.scene.shapes.Border} this
     */
    geotoolkit.scene.shapes.Border.prototype.setBorders = function(borders){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.shapes.Border.prototype.render = function(context){};
    /**
     * Returns bounds
     * @returns {?geotoolkit.util.Rect} bounds
     */
    geotoolkit.scene.shapes.Border.prototype.getBounds = function(){};
    /**
     * Sets bounds
     * @param {geotoolkit.util.Rect} bounds bounds of the shape
     * @returns {geotoolkit.scene.shapes.Border} this
     */
    geotoolkit.scene.shapes.Border.prototype.setBounds = function(bounds){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.scene.shapes.Border.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {string} [properties.borderstyle] border style to be set
     * @param {object} [properties.borders] borders see {@link geotoolkit.scene.shapes.Border#setBorders}
     * @returns {geotoolkit.scene.shapes.Border}
     */
    geotoolkit.scene.shapes.Border.prototype.setProperties = function(properties){};

/**
 * Defines arrow node, a line with a symbol on one, both, or no ends.
 *
 * @class geotoolkit.scene.shapes.Arrow
 * @augments geotoolkit.scene.shapes.Line
 * @param {geotoolkit.util.Point | object} [options=Point(0,0)] origin point of arrow or the object with arrow properties
 * @param {geotoolkit.util.Point} [options.from=Point(0,0)] origin point of arrow
 * @param {geotoolkit.util.Point} [options.to=Point(1,1)] endpoint of arrow
 * @param {boolean} [options.visible=true] arrow visible
 * @param {geotoolkit.scene.shapes.Symbol} [options.symbolstart=null] arrow start symbol
 * @param {geotoolkit.scene.shapes.Symbol} [options.symbolend=null] arrow end symbol
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle='black'] line style
 *
 * @param {geotoolkit.util.Point} [to=Point(1,1)] endpoint of arrow
 * @param {boolean} [visible=true] arrow visible
 * @param {geotoolkit.scene.shapes.Symbol} [symbolstart=null] arrow start symbol
 * @param {geotoolkit.scene.shapes.Symbol} [symbolend=null] arrow end symbol
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.linestyle='black'] line style

 */
geotoolkit.scene.shapes.Arrow = {};
    /**
     * Enum to define types of heads that arrow can have
     * @enum
     * @readonly
     */
    geotoolkit.scene.shapes.Arrow.Heads = {};
        /**
         * Symbol at start of arrow
         * @type {string}
         */
        geotoolkit.scene.shapes.Arrow.Heads.Start = "";
        /**
         * Symbol at end of arrow
         * @type {string}
         */
        geotoolkit.scene.shapes.Arrow.Heads.End = "";
        /**
         * Symbol on both ends of the arrow
         * @type {string}
         */
        geotoolkit.scene.shapes.Arrow.Heads.Both = "";
        /**
         * No symbols on arrow
         * @type {string}
         */
        geotoolkit.scene.shapes.Arrow.Heads.None = "";
    /**
     * Sets the symbol to be drawn at the start of the arrow
     *
     * @param {geotoolkit.scene.shapes.Symbol} symbol symbol to be drawn at the start of the arrow
     * @returns {geotoolkit.scene.shapes.Arrow} this
     */
    geotoolkit.scene.shapes.Arrow.prototype.setSymbolStart = function(symbol){};
    /**
     * Sets the symbol to be drawn at the end of the arrow
     *
     * @param {geotoolkit.scene.shapes.Symbol} symbol symbol to be drawn at the end of the arrow
     * @returns {geotoolkit.scene.shapes.Arrow} this
     */
    geotoolkit.scene.shapes.Arrow.prototype.setSymbolEnd = function(symbol){};
    /**
     * Sets the symbol to be drawn at both ends of the arrow
     *
     * @param {geotoolkit.scene.shapes.Symbol} symbol symbol to be drawn at both ends of the arrow
     * @returns {geotoolkit.scene.shapes.Arrow} this
     */
    geotoolkit.scene.shapes.Arrow.prototype.setSymbol = function(symbol){};
    /**
     *
     * @returns {geotoolkit.scene.shapes.Symbol} symbol
     */
    geotoolkit.scene.shapes.Arrow.prototype.getSymbolStart = function(){};
    /**
     *
     * @returns {geotoolkit.scene.shapes.Symbol} symbol
     */
    geotoolkit.scene.shapes.Arrow.prototype.getSymbolEnd = function(){};
    /**
     *
     * @param {geotoolkit.scene.shapes.Arrow.Heads|string} heads the type of ends that this arrow had
     * @returns {geotoolkit.scene.shapes.Arrow} this
     */
    geotoolkit.scene.shapes.Arrow.prototype.setHeads = function(heads){};
    /**
     * Returns arrow heads
     * @returns {geotoolkit.scene.shapes.Arrow.Heads|string} heads the type of ends that this arrow had
     */
    geotoolkit.scene.shapes.Arrow.prototype.getHeads = function(){};
    /**
     * Render arrow
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.scene.shapes.Arrow.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {geotoolkit.scene.shapes.Symbol} [props.symbolstart] start symbol
     * @returns {geotoolkit.scene.shapes.Symbol} [props.symbolend] end symbol
     * @returns {geotoolkit.scene.shapes.Arrow.Heads|string} [props.heads] arrow heads visible
     */
    geotoolkit.scene.shapes.Arrow.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.scene.shapes.Symbol|object} [properties.symbolstart] start symbol
     * @param {geotoolkit.scene.shapes.Symbol|object} [properties.symbolend] end symbol
     * @param {geotoolkit.scene.shapes.Arrow.Heads|string} [properties.heads] the type of ends that this arrow had
     * @returns {geotoolkit.scene.shapes.Arrow}
     */
    geotoolkit.scene.shapes.Arrow.prototype.setProperties = function(properties){};

/**
 * Define abstract source of tile for TiledShape
 *
 * @class geotoolkit.scene.shapes.tiledshape.AbstractTileSource
 * @augments geotoolkit.util.EventDispatcher
 * @abstract
 */
geotoolkit.scene.shapes.tiledshape.AbstractTileSource = {};
    /**
     * Sends load request for the image, and sets callbacks
     * @function
     * @abstract
     * @param {geotoolkit.scene.shapes.TiledShape} tiledImg tiled image to load
     * @param {function()} callback callback on successful load
     * @param {function()} errCallback callback on loading error
     * @param {geotoolkit.util.Rect} area The total area of the image
     * @param {geotoolkit.util.Rect} tileRect Tile rect in device coordinates
     * @param {geotoolkit.util.Rect} modelTileRect Tile rect im model coordinates
     * @param {number} i i-coordinate of the tile (x)
     * @param {number} j j-coordinate of the tile (y)
     */
    geotoolkit.scene.shapes.tiledshape.AbstractTileSource.prototype.load = function(tiledImg, callback, errCallback, area, tileRect, modelTileRect, i, j){};
    /**
     * Kills an image whenever Tiled Shape has processed it
     * @function
     * @abstract
     * @param {object} id id of the tile
     */
    geotoolkit.scene.shapes.tiledshape.AbstractTileSource.prototype.doneWorkingWithImage = function(id){};
    /**
     * @function
     * @abstract
     * @param {object} id Id of the image
     * @returns {boolean} true if the image is already being loaded, else otherwise
     */
    geotoolkit.scene.shapes.tiledshape.AbstractTileSource.prototype.requestPosted = function(id){};
    /**
     * @function
     * @abstract
     * @returns {number} Number of images that are being loaded at this time
     */
    geotoolkit.scene.shapes.tiledshape.AbstractTileSource.prototype.numOfImages = function(){};
    /**
     * Kills all images and their callbacks, however, images are not being stopped from loading
     * @function
     * @abstract
     */
    geotoolkit.scene.shapes.tiledshape.AbstractTileSource.prototype.killAllImages = function(){};
    /**
     * Resend load request for particular image
     * @function
     * @abstract
     * @param {object} id The id of the image
     */
    geotoolkit.scene.shapes.tiledshape.AbstractTileSource.prototype.reloadImage = function(id){};
    /**
     * Sends a request to server to get image information
     * @function
     * @abstract
     * @param {object} obj the calling object instance
     * @param {function()} callback callback to be called when info is received
     */
    geotoolkit.scene.shapes.tiledshape.AbstractTileSource.prototype.getImageSize = function(obj, callback){};

/**
 * Define default implementation of tile source
 *
 * @class geotoolkit.scene.shapes.tiledshape.TileSource
 * @augments geotoolkit.scene.shapes.tiledshape.AbstractTileSource
 * @param {string} fileName the name of image to load
 * @param {string} host that will return titles upon request
 * @param {function | null} uriResolver resolver
 */
geotoolkit.scene.shapes.tiledshape.TileSource = {};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.tiledshape.TileSource.prototype.load = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.tiledshape.TileSource.prototype.doneWorkingWithImage = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.tiledshape.TileSource.prototype.requestPosted = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.tiledshape.TileSource.prototype.numOfImages = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.tiledshape.TileSource.prototype.killAllImages = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.tiledshape.TileSource.prototype.reloadImage = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.tiledshape.TileSource.prototype.getImageSize = function(){};

/**
 * Defines a shape which displays tiled images
 *
 * @class geotoolkit.scene.shapes.TiledShape
 * @augments geotoolkit.scene.shapes.RectangularShape
 * @param {object} options JSON object with parameters
 * @param {geotoolkit.scene.shapes.tiledshape.AbstractTileSource} [options.provider=null] Instance of data provider
 * @param {geotoolkit.util.Rect} [options.modelArea=geotoolkit.util.Rect(0, 0, 1000, 1000)] Bounds of the shape,
 * defines the size of image on the server
 * @param {number} [options.capacity=0] Number of tiles stored in cache
 * @param {number} [options.tileW=256] Width of a tile
 * @param {number} [options.tileH=256] Height of a tile
 * @param {number} [options.maxNumReq=8] Maximum number of requests that can be sent at the same time
 * @param {number} [options.extendedrenderingborders=0] option to request more data not only visible part
 */
geotoolkit.scene.shapes.TiledShape = {};
    /**
     * Sets options
     * @param {object} options JSON object with parameters
     * @param {geotoolkit.scene.shapes.tiledshape.AbstractTileSource} [options.provider=null] Instance of tile provider
     * @param {geotoolkit.util.Rect} [options.modelArea=geotoolkit.util.Rect(0, 0, 1000, 1000)] Bounds of the shape,
     * defines the size of image on the server
     * @param {number} [options.capacity=0] Number of tiles stored in cache
     * @param {number} [options.tileW=256] Width of a tile
     * @param {number} [options.tileH=256] Height of a tile
     * @param {number} [options.maxNumReq=8] Maximum number of requests that can be sent at the same time
     */
    geotoolkit.scene.shapes.TiledShape.prototype.setOptions = function(options){};
    /**
     * Render method, overrides render method of the parent. Calculates tiles required
     * for the invalidated area (all the calculations are made in device coordinates),
     * renders existing ones, or requests non existing ones
     *
     * @param {geotoolkit.renderer.RenderingContext} context a rendering context
     */
    geotoolkit.scene.shapes.TiledShape.prototype.render = function(context){};
    /**
     * Gets image size of the tiled shape
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.shapes.TiledShape.prototype.getModelArea = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.TiledShape.prototype.getWorldTransform = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.shapes.TiledShape.prototype.dispose = function(){};

/**
 * Define TiledShapeDataProvider
 *
 * @class geotoolkit.scene.shapes.TiledShape.TiledShapeDataProvider
 * @augments geotoolkit.scene.shapes.tiledshape.TileSource
 * @deprecated Since 2.6 Use geotoolkit.scene.shapes.tiledshape.TileSource instead
 * @param {string} fileName the name of image to load
 * @param {string} host that will return titles upon request
 * @param {function | null} uriResolver resolver
 */
geotoolkit.scene.shapes.TiledShape.TiledShapeDataProvider = {};

/**
 * Abstract Painter class
 * @class geotoolkit.scene.shapes.painters.AbstractPainter
 * @abstract
 * @param {geotoolkit.scene.shapes.Symbol} symbol the parent symbol, used to set properties
 * @param {geotoolkit.util.Rect} bbox bounding box this symbolPainter should paint within
 * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
 */
geotoolkit.scene.shapes.painters.AbstractPainter = {};

/**
 * Draws a circle symbol
 * @class geotoolkit.scene.shapes.painters.CirclePainter
 *
 * @param {geotoolkit.scene.shapes.Symbol} symbol the parent symbol, used to set properties
 * @param {geotoolkit.util.Rect} bbox bounding box this symbolPainter should paint within
 * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
 */
geotoolkit.scene.shapes.painters.CirclePainter = {};

/**
 * Draws a cross symbol
 *
 * @class geotoolkit.scene.shapes.painters.CrossPainter
 * @param {geotoolkit.scene.shapes.Symbol} symbol the parent symbol, used to set properties
 * @param {geotoolkit.util.Rect} bbox bounding box this symbolPainter should paint within
 * @param {geotoolkit.renderer.RenderingContext} context rendering Context
 */
geotoolkit.scene.shapes.painters.CrossPainter = {};

/**
 * Draws a diamond symbol
 *
 * @class geotoolkit.scene.shapes.painters.DiamondPainter
 * @param {geotoolkit.scene.shapes.Symbol} symbol the parent symbol, used to set properties
 * @param {geotoolkit.util.Rect} bbox bounding box this symbolPainter should paint within
 * @param {geotoolkit.renderer.RenderingContext} context rendering Context
 */
geotoolkit.scene.shapes.painters.DiamondPainter = {};

/**
 * Draws a plus symbol
 *
 * @class geotoolkit.scene.shapes.painters.PlusPainter
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.PlusPainter = {};

/**
 * Draws a plus bar symbol that can be filled in by color
 *
 * @class geotoolkit.scene.shapes.painters.PlusBarPainter
 * @param {geotoolkit.scene.shapes.Symbol} symbol the parent symbol, used to set properties
 * @param {geotoolkit.util.Rect} bbox bounding box this symbolPainter should paint within
 * @param {geotoolkit.renderer.RenderingContext} context rendering Context
 */
geotoolkit.scene.shapes.painters.PlusBarPainter = {};

/**
 * Draws a square symbol
 *
 * @class geotoolkit.scene.shapes.painters.SquarePainter
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.SquarePainter = {};

/**
 * Draws a star symbol
 *
 * @class geotoolkit.scene.shapes.painters.StarPainter
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.StarPainter = {};

/**
 * Draws a star symbol with 5 spikes
 *
 * @class geotoolkit.scene.shapes.painters.Star5Painter
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.Star5Painter = {};

/**
 * Draws a triangle symbol
 *
 * @class geotoolkit.scene.shapes.painters.TrianglePainter
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 * */
geotoolkit.scene.shapes.painters.TrianglePainter = {};

/**
 * Draws a horizontal line
 * @class geotoolkit.scene.shapes.painters.HorizontalLinePainter
 *
 * @param {geotoolkit.scene.shapes.Symbol} symbol the parent symbol, used to set properties
 * @param {geotoolkit.util.Rect} bbox bounding box this symbolPainter should paint within
 * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
 */
geotoolkit.scene.shapes.painters.HorizontalLinePainter = {};

/**
 * Draws a font symbol
 *
 * @class geotoolkit.scene.shapes.painters.FontPainter
 * @augments geotoolkit.util.EventDispatcher
 * @param {string} url font url
 * @param {string} family font family, must match to file name
 * @param {string} text text which be drawn as a symbol, ascii or unicode
 */
geotoolkit.scene.shapes.painters.FontPainter = {};
    /**
     * Draw text on context
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.scene.shapes.Symbol} symbol symbol, which uses this painter
     * @param {geotoolkit.util.Rect} bbox bounding box
     */
    geotoolkit.scene.shapes.painters.FontPainter.prototype.render = function(context, symbol, bbox){};

/**
 * Draws line and symbol defined by painter
 *
 * @class geotoolkit.scene.shapes.painters.LineAndSymbolPainter
 * @augments geotoolkit.util.EventDispatcher
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [painter] Painter to be displayed with Horizontal line painter
 */
geotoolkit.scene.shapes.painters.LineAndSymbolPainter = {};
    /**
     * Sets symbol painter for Line Chart
     * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [painter] Painter to be displayed with Horizontal line painter
     */
    geotoolkit.scene.shapes.painters.LineAndSymbolPainter.prototype.setPainter = function(painter){};
    /**
     * Returns symbol painter
     * @returns {null|geotoolkit.scene.shapes.painters.AbstractPainter} painter
     */
    geotoolkit.scene.shapes.painters.LineAndSymbolPainter.prototype.getPainter = function(){};
    /**
     * Draw text on context
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {geotoolkit.scene.shapes.Symbol} symbol symbol, which uses this painter
     * @param {geotoolkit.util.Rect} bbox bounding box
     */
    geotoolkit.scene.shapes.painters.LineAndSymbolPainter.prototype.render = function(context, symbol, bbox){};

/**
 * Draws a Brine symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.Brine
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.Brine = {};

/**
 * Draws a Dry symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.Dry
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.Dry = {};

/**
 * Draws a Dry Show Gas symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.DryShowGas
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.DryShowGas = {};

/**
 * Draws a Dry Show Oil symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.DryShowOil
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.DryShowOil = {};

/**
 * Draws a Dry Show OilGas symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.DryShowOilGas
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.DryShowOilGas = {};

/**
 * Draws a Gas symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.Gas
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.Gas = {};

/**
 * Draws a Gas Show Oil symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.GasShowOil
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.GasShowOil = {};

/**
 * Draws a Injection symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.Injection
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.Injection = {};

/**
 * Draws a location permit symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.LocationPermit
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.LocationPermit = {};

/**
 * Draws a Location Permit Expired symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.LocationPermitExpired
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.LocationPermitExpired = {};

/**
 * Draws a Lost symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.Lost
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.Lost = {};

/**
 * Draws a Observation symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.Observation
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.Observation = {};

/**
 * Draws a Oil symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.Oil
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.Oil = {};

/**
 * Draws a Oil Gas symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.OilGas
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.OilGas = {};

/**
 * Draws a Oil Show Gas symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.OilShowGas
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.OilShowGas = {};

/**
 * Draws a Plugged Brine symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.PluggedBrine
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.PluggedBrine = {};

/**
 * Draws a Plugged Gas symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.PluggedGas
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.PluggedGas = {};

/**
 * Draws a Plugged Gas Show Oil symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.PluggedGasShowOil
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.PluggedGasShowOil = {};

/**
 * Draws a Plugged Injection symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.PluggedInjection
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.PluggedInjection = {};

/**
 * Draws a Plugged Oil symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.PluggedOil
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.PluggedOil = {};

/**
 * Draws a Plugged Oil Gas symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.PluggedOilGas
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.PluggedOilGas = {};

/**
 * Draws a Plugged Oil Show Gas symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.PluggedOilShowGas
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.PluggedOilShowGas = {};

/**
 * Draws a Plugged Water Supply symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.PluggedWaterSupply
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.PluggedWaterSupply = {};

/**
 * Draws a Show Gas symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.ShowGas
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.ShowGas = {};

/**
 * Draws a Show Oil symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.ShowOil
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.ShowOil = {};

/**
 * Draws a Show OilGas symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.ShowOilGas
 * @param {geotoolkit.scene.shapes.Symbol} symbol
 * @param {geotoolkit.util.Rect} bbox
 * @param {geotoolkit.renderer.RenderingContext} context
 */
geotoolkit.scene.shapes.painters.oilandgas.ShowOilGas = {};

/**
 * Draws a Unknown symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.Unknown
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.Unknown = {};

/**
 * Draws a Water symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.Water
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.Water = {};

/**
 * Draws a Water Supply symbol
 *
 * @class geotoolkit.scene.shapes.painters.oilandgas.WaterSupply
 * @param {geotoolkit.scene.shapes.Symbol} symbol symbol
 * @param {geotoolkit.util.Rect} bbox bounding box
 * @param {geotoolkit.renderer.RenderingContext} context rendering context
 */
geotoolkit.scene.shapes.painters.oilandgas.WaterSupply = {};

/**
* Abstraction to formalize an input transformation adjustment
*
* @class geotoolkit.scene.ScaleScrollStrategy
*/
geotoolkit.scene.ScaleScrollStrategy = {};
    /**
     * Adjusts input transformation
     * @function
     * @abstract
     * @param {geotoolkit.scene.Group} model
     * @param {geotoolkit.util.Transformation} newTr transformation to adjust
     * @returns {geotoolkit.util.Transformation} adjusted transformation
     */
    geotoolkit.scene.ScaleScrollStrategy.prototype.adjustTransformation = function(model, newTr){};
    /**
    * Modifies (if necessary) input transformation so that vertical scaling and translation is suppressed.
    * @param {geotoolkit.scene.Group} model data model
    * @param {geotoolkit.util.Transformation} newTr requested transformation
    * @returns {geotoolkit.util.Transformation} adjusted transformation
    */
    geotoolkit.scene.ScaleScrollStrategy.noVerticalScaleScroll = function(model, newTr){};
    /**
    * Modifies (if necessary) input transformation so that horizontal scaling and translation is suppressed.
    * @param {geotoolkit.scene.Group} model data model
    * @param {geotoolkit.util.Transformation} newTr requested transformation
    * @returns {geotoolkit.util.Transformation} adjusted transformation
    */
    geotoolkit.scene.ScaleScrollStrategy.noHorizontalScaleScroll = function(model, newTr){};
    /**
    * Modifies (if necessary) input transformation so that the model's visible limits do not go beyond data model limits.
    * @param {geotoolkit.scene.Group} model data model
    * @param {geotoolkit.util.Transformation} newTr requested transformation
    * @returns {geotoolkit.util.Transformation} adjusted transformation
    */
    geotoolkit.scene.ScaleScrollStrategy.restrictVisibleModelLimits = function(model, newTr){};
    /**
    * Modifies input transformation so that the model's visible limits do not go beyond data model limits if visible area size is smaller
    * than data model size; aligns position of the model in the opposite case.
    * @param {geotoolkit.scene.Group} model data model
    * @param {geotoolkit.util.Transformation} newTr requested transformation
    * @param {string} [horizontalAlignment="left"] horizontal alignment It can be "left", "right" or "center"
    * @param {string} [verticalAlignment="top"] vertical alignment. It can be "top", "bottom" or "center"
    * @returns {geotoolkit.util.Transformation} adjusted transformation
    */
    geotoolkit.scene.ScaleScrollStrategy.anchoredTransformationAdjustment = function(model, newTr, horizontalAlignment, verticalAlignment){};
    /**
     * KeepAspectRatio scaling modes
     * @enum
     * @readonly
     */
    geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode = {};
        /**
         * Most
         * @type {string}
         */
        geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode.Most = "";
        /**
         * Least
         * @type {string}
         */
        geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode.Least = "";
        /**
         * Average
         * @type {string}
         */
        geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode.Average = "";
    /**
    * Modifies input transformation so that the model scene transformation's "getScaleY()/getScaleY()==aspectRatio".
    * @param {geotoolkit.scene.Group} model data model
    * @param {geotoolkit.util.Transformation} newLocalTr requested local transformation
    * @param {number} [aspectRatio=1] y-scale to x-scale ratio; must be greater than "0"
    * @param {geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode} [mode=geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode.Most] scaling mode
    * @returns {geotoolkit.util.Transformation} adjusted transformation
    */
    geotoolkit.scene.ScaleScrollStrategy.keepAspectRatioAdjustment = function(model, newLocalTr, aspectRatio, mode){};
    /**
    * Modifies (if necessary) input transformation so that vertical scaling and translation is suppressed.
    * @param {geotoolkit.scene.Group} model data model
    * @param {geotoolkit.util.Transformation} newTr requested transformation
    * @function
    * @deprecated since 2.5 use geotoolkit.scene.ScaleScrollStrategy.noVerticalScaleScroll instead
    * @returns {geotoolkit.util.Transformation} adjusted transformation
    */
    geotoolkit.scene.ScaleScrollStrategy.NoVerticalScaleScroll = function(model, newTr){};
    /**
    * Modifies input transformation so that the model's visible limits do not go beyond data model limits if visible area size is smaller
    * than data model size; aligns position of the model in the opposite case.
    * @function
    * @param {geotoolkit.scene.Group} model data model
    * @param {geotoolkit.util.Transformation} newTr requested transformation
    * @param {string} [horizontalAlignment="left"] horizontal alignment It can be "left", "right" or "center"
    * @param {string} [verticalAlignment="top"] vertical alignment. It can be "top", "bottom" or "center"
    * @deprecated since 2.5 use geotoolkit.scene.ScaleScrollStrategy.anchoredTransformationAdjustment instead
    * @returns {geotoolkit.util.Transformation} adjusted transformation
    */
    geotoolkit.scene.ScaleScrollStrategy.AnchoredTransformationAdjustment = function(model, newTr, horizontalAlignment, verticalAlignment){};
    /**
    * Modifies (if necessary) input transformation so that the model's visible limits do not go beyond data model limits.
    * @function
    * @deprecated since 2.5 use geotoolkit.scene.ScaleScrollStrategy.restrictVisibleModelLimits instead
    * @param {geotoolkit.scene.Group} model data model
    * @param {geotoolkit.util.Transformation} newTr requested transformation
    * @returns {geotoolkit.util.Transformation} adjusted transformation
    */
    geotoolkit.scene.ScaleScrollStrategy.RestrictVisibleModelLimits = function(model, newTr){};
    /**
    * Modifies input transformation so that the model scene transformation's "getScaleY()/getScaleY()==aspectRatio".
    * @function
    * @param {geotoolkit.scene.Group} model data model
    * @param {geotoolkit.util.Transformation} newLocalTr requested local transformation
    * @param {number} [aspectRatio=1] y-scale to x-scale ratio; must be greater than "0"
    * @param {geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode} [mode=geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode.Most] scaling mode
    * @deprecated since 2.5 use geotoolkit.scene.ScaleScrollStrategy.keepAspectRatioAdjustment instead
    * @returns {geotoolkit.util.Transformation} adjusted transformation
    */
    geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioAdjustment = function(model, newLocalTr, aspectRatio, mode){};
    /**
    * Modifies (if necessary) input transformation so that horizontal scaling and translation is suppressed.
    * @function
    * @deprecated since 2.5 use geotoolkit.scene.ScaleScrollStrategy.noHorizontalScaleScroll instead
    * @param {geotoolkit.scene.Group} model data model
    * @param {geotoolkit.util.Transformation} newTr requested transformation
    * @returns {geotoolkit.util.Transformation} adjusted transformation
    */
    geotoolkit.scene.ScaleScrollStrategy.NoHorizontalScaleScroll = function(model, newTr){};

/**
* NoHorizontalScaleScrollStrategy input transformation adjustment. horizontal part of scaling/scrolling is blocked
*
* @class geotoolkit.scene.NoHorizontalScaleScrollStrategy
* @augments geotoolkit.scene.ScaleScrollStrategy
*/
geotoolkit.scene.NoHorizontalScaleScrollStrategy = {};
    /**
     * Adjusts input transformation the way its horizonal components are ignored
     * @function
     * @param {geotoolkit.scene.Group} model data model
     * @param {geotoolkit.util.Transformation} newTr transformation to adjust
     * @returns {geotoolkit.util.Transformation} adjusted transformation
     */
    geotoolkit.scene.NoHorizontalScaleScrollStrategy.prototype.adjustTransformation = function(model, newTr){};

/**
* NoVerticalScaleScrollStrategy input transformation adjustment. vertical part of scaling/scrolling is blocked
*
* @class geotoolkit.scene.NoVerticalScaleScrollStrategy
* @augments geotoolkit.scene.ScaleScrollStrategy
*/
geotoolkit.scene.NoVerticalScaleScrollStrategy = {};
    /**
     * Adjusts input transformation the way its vertical components are ignored
     * @function
     * @param {geotoolkit.scene.Group} model data model
     * @param {geotoolkit.util.Transformation} newTr transformation to adjust
     * @returns {geotoolkit.util.Transformation} adjusted transformation
     */
    geotoolkit.scene.NoVerticalScaleScrollStrategy.prototype.adjustTransformation = function(model, newTr){};

/**
* RestrictVisibleModelLimitsStrategy input transformation adjustment is restricted based on the options supplied.<br>
* This is same as either:<br>
*"ScaleScrollStrategy.RestrictVisibleModelLimits + ScaleScrollStrategy.NoHorizontalScaleScroll" <br>
* -or- <br>
* "ScaleScrollStrategy.RestrictVisibleModelLimits + ScaleScrollStrategy.NoVerticalScaleScroll" <br>
* depending to the options applied.
*
* @class geotoolkit.scene.RestrictVisibleModelLimitsStrategy
* @augments geotoolkit.scene.ScaleScrollStrategy
* @param {object} [options]
* @param {boolean} [options.nohorizontalscalescroll=false] flag to set nohorizontalscalescroll
* @param {boolean} [options.noverticalscalescroll=false] flag to set noverticalscalescroll
*/
geotoolkit.scene.RestrictVisibleModelLimitsStrategy = {};
    /**
     * Adjusts input transformation
     * @function
     * @param {geotoolkit.scene.Group} model data model
     * @param {geotoolkit.util.Transformation} newTr transformation to adjust
     * @returns {geotoolkit.util.Transformation} adjusted transformation
     */
    geotoolkit.scene.RestrictVisibleModelLimitsStrategy.prototype.adjustTransformation = function(model, newTr){};

/**
* AnchoredTransformationAdjustmentStrategy input transformation adjustment <br>
* This adjustments is same as "ScaleScrollStrategy.KeepAspectRatioAdjustment + ScaleScrollStrategy.AnchoredTransformationAdjustment"
*
* @class geotoolkit.scene.AnchoredTransformationAdjustmentStrategy
* @augments geotoolkit.scene.ScaleScrollStrategy
* @param {object} [options]
* @param {string} [options.horizontalAlignment='left'] horizontal alignment
* @param {string} [options.verticalAlignment='top'] vertical alignment
* @param {boolean} [options.keepAspectRatio=false] keep aspect ratio flag
* @param {number} [options.aspectRatio=1] y-scale to x-scale ratio; must be greater than "0"
* @param {geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode} [options.mode=Most] scaling mode
*/
geotoolkit.scene.AnchoredTransformationAdjustmentStrategy = {};
    /**
     * Adjusts input transformation
     * @param {!geotoolkit.scene.Group} model modle to adjaust transformation
     * @param {geotoolkit.util.Transformation} newLocalTr transformation to adjust
     * @returns {geotoolkit.util.Transformation} adjusted transformation
     */
    geotoolkit.scene.AnchoredTransformationAdjustmentStrategy.prototype.adjustTransformation = function(model, newLocalTr){};

/**
* KeepAspectRatioRestrictedAnchoredStrategy input transformation adjustment. This keeps aspect ratio based on the options supplied and also aligns the model bounds.
*
* @class geotoolkit.scene.KeepAspectRatioRestrictedAnchoredStrategy
* @augments geotoolkit.scene.ScaleScrollStrategy
* @param {object} [options]
* @param {string} [options.horizontalAlignment='left'] horizontal alignment
* @param {string} [options.verticalAlignment='top'] vertical alignment
* @param {number} [options.aspectRatio=1] y-scale to x-scale ratio
* @param {geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode} [options.mode=Most] scaling mode
*/
geotoolkit.scene.KeepAspectRatioRestrictedAnchoredStrategy = {};
    /**
     * Adjusts input transformation
     * @param {!geotoolkit.scene.Group} model modle to adjust transformation
     * @param {geotoolkit.util.Transformation} newTr transformation to adjust
     * @returns {geotoolkit.util.Transformation} adjusted transformation
     */
    geotoolkit.scene.KeepAspectRatioRestrictedAnchoredStrategy.prototype.adjustTransformation = function(model, newTr){};

/**
 * KeepAspectRestrictVisibleStrategy input transformation adjustment. This is same as "RestrictVisibleModelLimitsStrategy + KeepAspectRatioRestrictedAnchoredStrategy"
 *
 * @class geotoolkit.scene.KeepAspectRestrictVisibleStrategy
 * @augments geotoolkit.scene.ScaleScrollStrategy
 * @param {object} [options] JSON object
 * @param {string} [options.horizontalAlignment='left'] horizontal alignment
 * @param {string} [options.verticalAlignment='top'] vertical alignment
 * @param {number} [options.aspectRatio=1] y-scale to x-scale ratio
 * @param {geotoolkit.scene.ScaleScrollStrategy.KeepAspectRatioScalingMode} [options.mode=Most] scaling mode
 */
geotoolkit.scene.KeepAspectRestrictVisibleStrategy = {};
    /**
     * Adjusts input transformation
     * @function
     * @param {geotoolkit.scene.Group} model data model
     * @param {geotoolkit.util.Transformation} newTr transformation to adjust
     * @returns {geotoolkit.util.Transformation} adjusted transformation
     * @override
     */
    geotoolkit.scene.KeepAspectRestrictVisibleStrategy.prototype.adjustTransformation = function(model, newTr){};

/**
 * KeepScaleAspectRatioStrategy input transformation adjustment. Keeps transformation scale when parent bounds were changed,
 * if not possible scales with keeping aspect ratio
 *
 * @class geotoolkit.scene.KeepScaleAspectRatioStrategy
 * @augments geotoolkit.scene.ScaleScrollStrategy
 * @param {object} [options] JSON object
 * @param {string} [options.horizontalAlignment='left'] horizontal alignment
 * @param {string} [options.verticalAlignment='top'] vertical alignment
 * @param {number} [options.aspectRatio=1] y-scale to x-scale ratio
 * @param {boolean} [options.wrapped=false] true if model limits should be wrapped
 */
geotoolkit.scene.KeepScaleAspectRatioStrategy = {};
    /**
     * Adjusts input transformation
     * @function
     * @param {geotoolkit.scene.Group} model data model
     * @param {geotoolkit.util.Transformation} newTr transformation to adjust
     * @returns {geotoolkit.util.Transformation} adjusted transformation
     * @override
     */
    geotoolkit.scene.KeepScaleAspectRatioStrategy.prototype.adjustTransformation = function(model, newTr){};
    /**
     * Sets scale scroll options
     * @param {object} [options] JSON object
     * @param {string} [options.horizontalAlignment='left'] horizontal alignment
     * @param {string} [options.verticalAlignment='top'] vertical alignment
     * @param {number} [options.aspectRatio=1] y-scale to x-scale ratio
     * @param {boolean} [options.wrapped=false] true if model limits should be wrapped
     * @returns {geotoolkit.scene.KeepScaleAspectRatioStrategy} this
     */
    geotoolkit.scene.KeepScaleAspectRatioStrategy.prototype.setOptions = function(options){};

/**
 * Defines helper method(s) to create annotation title instance
 *
 * @class geotoolkit.scene.AnnotationTitleFactory
 */
geotoolkit.scene.AnnotationTitleFactory = {};
    /**
     * Returns instance of the factory
     * @returns {geotoolkit.scene.AnnotationTitleFactory} factory
     */
    geotoolkit.scene.AnnotationTitleFactory.getInstance = function(){};
    /**
     * Creates annotation title
     *
     * @param {!object} options annotation title options
     * @param {!string} options.text text
     * @param {geotoolkit.attributes.TextStyle|object} [options.textstyle] text style
     * @param {string} [options.textstyle.color="#757575"] text color
     * @param {string} [options.textstyle.font="18px Roboto"] text font
     * @param {boolean} [options.sizeisindevicespace=true] device size flag
     *
     * @returns {geotoolkit.scene.shapes.Text} annotation title
     */
    geotoolkit.scene.AnnotationTitleFactory.prototype.create = function(options){};

/**
 * Define a base selection context to be used for picking strategies
 * @class geotoolkit.selection.SelectionContext
 * @augments geotoolkit.renderer.RenderingContext
 */
geotoolkit.selection.SelectionContext = {};
    /**
     * Check selection of node and call onselect if node is selected
     *
     * @function
     * @abstract
     * @param {geotoolkit.scene.Node} node node to pick
     * @param {function()} listener function to be called on select
     */
    geotoolkit.selection.SelectionContext.prototype.pick = function(node, listener){};
    /**
     * Push selection
     * @function
     * @abstract
     * @param {object} selection selected object
     * @returns {geotoolkit.selection.SelectionContext} this
     */
    geotoolkit.selection.SelectionContext.prototype.pushSelection = function(selection){};

/**
 * Defines node selection. This class provides the logic to do shape selection using device coordinates.<br>
 * It implements several algorithms to perform different types of selection:
 * <ul>
 * <li> By point: At a given point with an optional radius </li>
 * <li> By rect: In a given rectangle </li>
 * <li> By polygon: In a given arbitrary polygon </li>
 * </ul>
 * The picking algorithm implemented in this Selector emulates 'rendering' to perform the selection and find the shape(s) at the given coordinates.<br>
 * Selection returns multiple objects in the current position.
 *
 * @class geotoolkit.selection.Selector
 * @param {geotoolkit.util.Transformation} [transformation] transformation from current node to plot (device). It is equal
 * to node.getParent().getSceneTransform(). If a root node is used as a start node then it is not necessary
 * to specify transformation.
 * @example
 * // following code show how to get the names of the selected items.
 * // The method 'select' returns an array of selected objects. Also it has a radius of selection. In this code is 5 pixels.
 * var selector = new geotoolkit.selection.Selector();
 * var radius = 5;
 * var select = selector.select(widget, pt.x, pt.y, radius);
 * if (select == null) return;
 * for (var i = 0; i < select.length; i++) {
 * console.log(select[i].getName());
 * }
 *
 */
geotoolkit.selection.Selector = {};
    /**
     * Select node in the current point OR in the polygonal area. This method starts selection from the specified node.
     * Coordinates provided are in the parent node coordinate system or device coordinates if the node is a root.
     * @param {geotoolkit.scene.Node} root node to be used for selection.
     * @param {number | Array | geotoolkit.util.Rect} p1 x-coordinate of the selection point OR x-coordinates of the selection polygon OR a selection rectangle.
     * @param {number | Array} p2 y-coordinate of the selection point OR y-coordinates of the selection polygon.
     * @param {number | boolean} p3 selection radius OR "allow intersection" flag
     * @param {boolean} [p4] even odd mode for polygonal selection
     * @returns {Array.<geotoolkit.scene.Node>} a collection of selected nodes
     * @example
     * // The selector returns visuals in the order in which they are rendered. If user wants to select visuals that were rendered last, just reverse the order of the selected nodes.
     * const nodes: any = selector.select(this.widget.widget, pt.x, pt.y, 2).reverse();
     */
    geotoolkit.selection.Selector.prototype.select = function(root, p1, p2, p3, p4){};
    /**
     * Select node in the current point OR in the polygonal area. This method starts selection from the specified node.
     * Coordinates provided are in the parent node coordinate system or device coordinates if the node is a root.
     * @param {function()} callback selection callback
     * @param {geotoolkit.scene.Node} root node to be used for selection.
     * @param {number | Array | geotoolkit.util.Rect | geotoolkit.util.Point} p1 x-coordinate of the selection point OR x-coordinates of the selection polygon OR a selection rectangle OR center point.
     * @param {number | Array} p2 y-coordinate of the selection point OR y-coordinates of the selection polygon OR radius (in case if p1 is geotoolkit.util.Point).
     * @param {number | boolean} p3 selection radius OR "allow intersection" flag
     * @param {boolean} [p4] even odd mode for polygonal selection
     */
    geotoolkit.selection.Selector.prototype.asyncSelect = function(callback, root, p1, p2, p3, p4){};
    /**
     * Sets current transformation
     * @param {geotoolkit.util.Transformation} transformation transformation from current node to device
     * @returns {geotoolkit.selection.Selector} this
     */
    geotoolkit.selection.Selector.prototype.setTransformation = function(transformation){};
    /**
     * Gets current transformation
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.selection.Selector.prototype.getTransformation = function(){};

/**
 * This class parses formulas and logical conditions to expression, which can be used as
 * a function
 *
 * @class geotoolkit.selection.QueryParser
 * @param {Array<function()>} functions array of functions
 */
geotoolkit.selection.QueryParser = {};
    /**
     * Register additional functions
     * @param {object} functions function to be registered
     */
    geotoolkit.selection.QueryParser.prototype.registerFunctions = function(functions){};
    /**
     * Parse string to expressions
     * @param {string} s string to parse
     * @returns {?object} object with methods execute and variables
     */
    geotoolkit.selection.QueryParser.prototype.parse = function(s){};

/**
 * Provides search by any item in the hierarchical structure
 * @class geotoolkit.selection.QueryBuilder
 * @param {object} item item to apply this query
 * @param {object} [options=null] an additional options
 * @param {geotoolkit.selection.QueryParser} [options.parser=null] a parser to be used to parse search request
 * @param {object} [options.map=null] a map of functions to be used
 * @param {function(item, callback)} [options.enumerateItems=null] enumerate children items
 * @param {function(item)} [options.values] function tio return a map of values to be used in query like node
 */
geotoolkit.selection.QueryBuilder = {};
    /**
     * Iterates over the children of the given item.
     * This iterator does not support concurrent modification (the callback provided should not add/remove children)
     * @param {geotoolkit.scene.Node|object} item item to apply this query
     * @param {function()} callback The callback function taking the parameters: (child, index, node, this)
     */
    geotoolkit.selection.QueryBuilder.prototype.enumerateNodes = function(item, callback){};
    /**
     * Specify filter
     * @param {function | string} f function or condition to provide filter of items or string to specify query
     * @returns {geotoolkit.selection.QueryBuilder}
     */
    geotoolkit.selection.QueryBuilder.prototype.where = function(f){};
    /**
     * Execute all queries
     * @param {function()} callback function called for each item that matches this query condition
     * @returns {geotoolkit.selection.QueryBuilder}
     */
    geotoolkit.selection.QueryBuilder.prototype.select = function(callback){};
    /**
     * Register functions
     * @param {object} functions allows to register additional functions
     * @returns {geotoolkit.selection.QueryBuilder}
     * @example
     * geotoolkit.selection.from(group1)
     * .functions( { "isLine": function(node) { return node instanceof geotoolkit.scene.shapes.Line; }
     * "isRect": function(node) { return node instanceof geotoolkit.scene.shapes.Rectangle; }
     * })
     * .where( 'node => isLine(node) || node => isRectangle(node)' )
     */
    geotoolkit.selection.QueryBuilder.prototype.functions = function(functions){};
    /**
     * Execute all queries
     * @param {function()} callback function called for each item that matches this query condition
     * @returns {geotoolkit.selection.QueryBuilder}
     */
    geotoolkit.selection.QueryBuilder.prototype.execute = function(callback){};
    /**
     * Select all items to array
     * @returns {Array.<object>} an array of the selected items
     */
    geotoolkit.selection.QueryBuilder.prototype.selectToArray = function(){};
    /**
     * Select the first item
     * @returns {object | null}
     */
    geotoolkit.selection.QueryBuilder.prototype.selectFirst = function(){};

/**
 * @class geotoolkit.selection.NodeQueryBuilder
 * @param {geotoolkit.scene.Node} node node to apply this query
 * @param {geotoolkit.selection.QueryParser} [parser] query parser
 * @param {geotoolkit.selection.Direction} [direction=geotoolkit.selection.Direction.Downwards] traverse direction
 * @augments geotoolkit.selection.QueryBuilder
 */
geotoolkit.selection.NodeQueryBuilder = {};

/**
 * Define axis model dimension. This is experimental api
 * @class geotoolkit.axis.AxisDimension
 * @augments geotoolkit.util.EventDispatcher
 * @param {object} [options] The options
 * @param {string} [options.name=''] name of the dimension
 * @param {geotoolkit.axis.AxisOrientation} [options.orientation=geotoolkit.axis.AxisOrientation.Vertical] axis orientation
 */
geotoolkit.axis.AxisDimension = {};
    /**
     * Dimension Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.axis.AxisDimension.Events = {};
        /**
         * Changed
         * @type {string}
         */
        geotoolkit.axis.AxisDimension.Events.Changed = "";
    /**
     * Sets axis orientation
     * @param {geotoolkit.axis.AxisOrientation} orientation axis orientation
     * @returns {geotoolkit.axis.AxisDimension} this
     */
    geotoolkit.axis.AxisDimension.prototype.setOrientation = function(orientation){};
    /**
     * Gets axis orientation
     * @returns {geotoolkit.axis.AxisOrientation}
     */
    geotoolkit.axis.AxisDimension.prototype.getOrientation = function(){};
    /**
     * Return minimum value
     * @returns {number}
     */
    geotoolkit.axis.AxisDimension.prototype.getMin = function(){};
    /**
     * Sets options
     * @param {object} options data
     * @returns {geotoolkit.axis.AxisDimension} this
     */
    geotoolkit.axis.AxisDimension.prototype.setOptions = function(options){};
    /**
     * Enable / disable neat limits
     * @param {boolean} enable enable or disable neat limits
     * @returns {geotoolkit.axis.AxisDimension} this
     */
    geotoolkit.axis.AxisDimension.prototype.setNeatLimits = function(enable){};
    /**
     * Returns true if neat limits is enabled.
     * @returns {boolean}
     */
    geotoolkit.axis.AxisDimension.prototype.getNeatLimits = function(){};
    /**
     * Return options
     * @returns {object} options
     */
    geotoolkit.axis.AxisDimension.prototype.getOptions = function(){};
    /**
     * Return minimum value
     * @returns {number}
     */
    geotoolkit.axis.AxisDimension.prototype.getMax = function(){};
    /**
     * Update limits
     * @function
     * @param {number} min minimum value
     * @param {number} max maximum value
     * @param {geotoolkit.util.Transformation} transformation from model range to device
     */
    geotoolkit.axis.AxisDimension.prototype.updateLimits = function(min, max, transformation){};

/**
 * Define axis model dimension. This is experimental api
 * @class geotoolkit.axis.AxisLinearDimension
 * @augments geotoolkit.axis.AxisDimension
 * @param {object} [options] The options
 * @param {string} [options.name=''] name of the dimension
 * @param {number} [options.minspan = 50] desired minimum distance between ticks in pixels
 * @param {number} [options.desiredmodelstep = Number.NaN] desired model step
 */
geotoolkit.axis.AxisLinearDimension = {};
    /**
     * Return desired model spacing
     * @returns {number}
     */
    geotoolkit.axis.AxisLinearDimension.prototype.getSpacing = function(){};
    /**
     * Update limits
     * @param {number} min minimum value
     * @param {number} max maximum value
     * @param {geotoolkit.util.Transformation} transformation from model range to device
     */
    geotoolkit.axis.AxisLinearDimension.prototype.updateLimits = function(min, max, transformation){};

/**
 * Abstraction to formalize an input value transform
 * @class geotoolkit.axis.ValueTransformer
 */
geotoolkit.axis.ValueTransformer = {};
    /**
     * Transforms input value
     * @function
     * @abstract
     * @param {number} inputValue value to transform
     * @returns {number} transformed value
     */
    geotoolkit.axis.ValueTransformer.prototype.transform = function(inputValue){};

/**
 * ValueTransform implementation for piece-linear case.
 * @class geotoolkit.axis.PieceLinearValueTransformer
 * @augments geotoolkit.axis.ValueTransformer
 * @param {number[]} [inputValues = null] array of input values
 * @param {number[]} [outputValues = null] array of output values
 * @param {geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType} [extrapolationType = null] Enum of ExtrapolationType
 */
geotoolkit.axis.PieceLinearValueTransformer = {};
    /**
     * Enum of extrapolation types (Out-of-range input value's transformed value)
     * @enum
     * @readonly
     */
    geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType = {};
        /**
         * Transformed value is Number.NaN
         * @type {number}
         */
        geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType.NaN = NaN;
        /**
         * Transformed value is equal to corresponding boundary's output value
         * @type {number}
         */
        geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType.Boundary = NaN;
        /**
         * Transformed value is an linearly extrapolated value based on corresponding boundary's piece mapping.
         * @type {number}
         */
        geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType.Extrapolated = NaN;
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.axis.PieceLinearValueTransformer.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number[]} [properties.inputValues = null] array of input values with size not less than 2
     * @param {number[]} [properties.outputValues = null] array of output values
     * @param {geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType} [properties.extrapolationType] Enum of ExtrapolationType
     * @returns {geotoolkit.axis.PieceLinearValueTransformer}
     */
    geotoolkit.axis.PieceLinearValueTransformer.prototype.setProperties = function(properties){};
    /**
     * Gets extrapolation type (by default: PieceLinearValueTransformer.ExtrapolationType.Boundary)
     * @function
     * @returns {geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType} extrapolationType
     */
    geotoolkit.axis.PieceLinearValueTransformer.prototype.getExtrapolationType = function(){};
    /**
     * Sets extrapolation type for out-of-range input values
     * @function
     * @param {geotoolkit.axis.PieceLinearValueTransformer.ExtrapolationType} extrapolationType Enum of ExtrapolationType
     * @returns {geotoolkit.axis.PieceLinearValueTransformer} this
     */
    geotoolkit.axis.PieceLinearValueTransformer.prototype.setExtrapolationType = function(extrapolationType){};
    /**
     * Transforms input value
     * @function
     * @param {number} val inputValue value to transform
     * @param {boolean} [reverse=false] direction of transformation
     * @returns {number} transformed value
     * @throws {Error} if value mapping is invalid or input value is undefined
     */
    geotoolkit.axis.PieceLinearValueTransformer.prototype.transform = function(val, reverse){};

/**
 * Define a base class for tick generators. Toolkit provides several tick generators to help generate numeric labels.<br>
 * It generates ticks and labels based on the tick info and tickgrades. {@link geotoolkit.axis.Axis} uses the TickGenerator while creating the axis.
 * Please refer to Axes and Grids Tutorial in CarnacJS for examples of the different tick generators supported.<br>
 * A tick generator mainly provides the positions of sequential ticks as well as the informational data associated with tick positions.
 *
 * @class geotoolkit.axis.TickGenerator
 */
geotoolkit.axis.TickGenerator = {};
    /**
     * Returns valid Tick Grades : "EDGE", "MAJOR", "MINOR"
     * @returns {Array.<string>} array of known Tick Grades
     */
    geotoolkit.axis.TickGenerator.prototype.getTickGrades = function(){};
    /**
     * Reset max label info
     * @protected
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.resetMaxLabels = function(){};
    /**
     * Returns max labels for each type of grades
     * @protected
     * @param {geotoolkit.axis.TickInfo} tickInfo info about the tick
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {number} fromValue generate labels from
     * @param {number} toValue generate labels to
     * @returns {object[]} array of {'type':tickGrade, 'value':maxValue}
     */
    geotoolkit.axis.TickGenerator.prototype.getMaxLabels = function(tickInfo, orient, fromValue, toValue){};
    /**
     * Returns maximum label.
     *
     * @deprecated since 2.6
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orientation orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo info about tick position
     * @param {number} fromValue generate labels from
     * @param {number} toValue generate labels to
     * @returns {string}
     */
    geotoolkit.axis.TickGenerator.prototype.getMaxLabel = function(parent, orientation, tickInfo, fromValue, toValue){};
    /**
     * Returns maximum label metrics. For internal use only
     *
     * @protected
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orientation orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo info about tick position
     * @param {number} fromValue generate labels from
     * @param {number} toValue generate labels to
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.axis.TickGenerator.prototype.getMaxLabelMetrics = function(parent, orientation, tickInfo, fromValue, toValue){};
    /**
     * Returns bounding box of label
     * @param {geotoolkit.axis.TickInfo} tickInfo info about the tick
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {number} labelPos label position along index direction
     * @param {string} [labelText] label text. If not defined labelPos.toString() is used.
     * @returns {geotoolkit.util.Rect} bbox bounding box
     */
    geotoolkit.axis.TickGenerator.prototype.getBoundingBox = function(tickInfo, orient, labelPos, labelText){};
    /**
     * Gets label anchor type
     * @param {!string} grade tick grade
     * @returns {?geotoolkit.util.AnchorType}
     */
    geotoolkit.axis.TickGenerator.prototype.getLabelAnchorType = function(grade){};
    /**
     * Sets label anchor type
     * @param {!string} grade tick grade
     * @param {geotoolkit.util.AnchorType} anchorType anchorType
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setLabelAnchorType = function(grade, anchorType){};
    /**
     * Sets visibility of tick for a specific tick grade
     * Implementation of the reset should check visibility of the ticks
     * @param {string} tickGrade Tick grade
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @param {boolean} visible tick grade visibility flag
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setVisibleTickGrade = function(tickGrade, visible){};
    /**
     * Returns visibility of tick for a specific tick grade
     * @param {string} tickGrade Tick grade
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @returns {boolean} true if the tick is visible
     */
    geotoolkit.axis.TickGenerator.prototype.isVisibleTickGrade = function(tickGrade){};
    /**
     * Sets visibility of label for a specific tick grade
     * Implementation of the reset should check visibility of the labels.
     * @param {string} tickGrade Tick grade
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @param {boolean} visible tick label visibility flag
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setVisibleLabelGrade = function(tickGrade, visible){};
    /**
     * Returns visibility of label for a specific tick grade
     * @param {string} tickGrade Tick grade
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @returns {boolean} true if label is visible
     */
    geotoolkit.axis.TickGenerator.prototype.isVisibleLabelGrade = function(tickGrade){};
    /**
     * Sets tick style
     * @param {string} tickGrade Tick grade
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @param {geotoolkit.attributes.LineStyle|string|object} [lineStyle] line style for the tick
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setTickStyle = function(tickGrade, lineStyle){};
    /**
     * Changes the size of specified ticks
     * @param {string} grade Grade of the tick to set the size
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @param {number} size New size
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setTickSize = function(grade, size){};
    /**
     * Returns the size of specified tick
     * @param {string} grade Grade of the tick to get the size
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @returns {number | null}
     */
    geotoolkit.axis.TickGenerator.prototype.getTickSize = function(grade){};
    /**
     * Returns tick style
     * @param {string} tickGrade Tick Grade
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @returns {?geotoolkit.attributes.LineStyle} line style
     */
    geotoolkit.axis.TickGenerator.prototype.getTickStyle = function(tickGrade){};
    /**
     * Sets label style
     * @param {string} tickGrade Tick grade
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @param {geotoolkit.attributes.TextStyle|string|object} [labelStyle] tick text style
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setLabelStyle = function(tickGrade, labelStyle){};
    /**
     * Returns label style
     * @param {string} tickGrade Tick grade
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @returns {?geotoolkit.attributes.TextStyle} label style
     */
    geotoolkit.axis.TickGenerator.prototype.getLabelStyle = function(tickGrade){};
    /**
     * Sets label rotation angle
     * @param {string} tickGrade Tick grade
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @param {number} angle label rotation angle, in radians
     * @returns {geotoolkit.axis.TickGenerator} this
     * @example
     * // user can customize the label rotation angle based on tick grade.
     * setLabelRotationAngle("MAJOR", -Math.PI / 2)
     */
    geotoolkit.axis.TickGenerator.prototype.setLabelRotationAngle = function(tickGrade, angle){};
    /**
     * Returns label rotation angle
     * @param {string} tickGrade Tick grade
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @returns {number} label rotation angle
     */
    geotoolkit.axis.TickGenerator.prototype.getLabelRotationAngle = function(tickGrade){};
    /**
     * Sets precision from string
     * @param {string} precision precision to be set
     * @returns {geotoolkit.axis.TickGenerator} this
     * @deprecated since 2.6
     */
    geotoolkit.axis.TickGenerator.prototype.setPrecision = function(precision){};
    /**
     * Executes delegate and returns the result
     * @param {function()} delegate execute delegate and return the result
     * @returns {object|geotoolkit.axis.TickGenerator}
     */
    geotoolkit.axis.TickGenerator.prototype.execute = function(delegate){};
    /**
     * Sets tag
     * @param {object} tag user can specify info associated with current object
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setTag = function(tag){};
    /**
     * Returns tag
     * @returns {?object} the tag
     */
    geotoolkit.axis.TickGenerator.prototype.getTag = function(){};
    /**
     * Resets tick generator
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {Array.<string>} a supported tick grade list
     */
    geotoolkit.axis.TickGenerator.prototype.reset = function(parent, orient, tickInfo){};
    /**
     * Resets tick generator asynchronously
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @param {function(array)} callback calls when asynchronous reset is done
     */
    geotoolkit.axis.TickGenerator.prototype.resetAsync = function(parent, orient, tickInfo, callback){};
    /**
     * Reset labels. This method is called to start iteration by labels.
     * The implementation also sets appropriate {@link geotoolkit.attributes.TextStyle} on labels.
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about labels. This information is used to pass and receive information about the current tick or label
     * @returns {number} labels count for the current tick type
     */
    geotoolkit.axis.TickGenerator.prototype.resetLabels = function(parent, orient, tickInfo){};
    /**
     * Resets ticks. This method is called to start iteration by ticks.
     * The implementation also sets appropriate {@link geotoolkit.attributes.LineStyle} on the ticks
     * as well as their tick size.
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about labels. This information is used to pass and receive information about the current tick or label
     * @returns {number} ticks count for the current tick type. The implementation returns 0 if the ticks can not be drawn; a positive number otherwise.
     */
    geotoolkit.axis.TickGenerator.prototype.resetTicks = function(parent, orient, tickInfo){};
    /**
     * Generates information about next label
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo info about tick
     * @param {number} tickIndex tickIndex tick index from 0 to count-1, which resetLabels returns
     * @returns {number} the model position of the label
     */
    geotoolkit.axis.TickGenerator.prototype.nextLabel = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Generates information about next tick
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo info about tick
     * @param {number} tickIndex tick index from 0 to count-1, which resetTicks returns
     * @returns {number} the model position of the tick
     */
    geotoolkit.axis.TickGenerator.prototype.nextTick = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Gets adjust label anchor flag for specified label grade
     * @param {!string} grade label grade
     * @returns {!boolean} label anchor flag ("true" by default for any grade)
     */
    geotoolkit.axis.TickGenerator.prototype.getAdjustLabelAnchor = function(grade){};
    /**
     * Sets adjust label anchor flag for specified label grade
     * @param {!string} grade label grade
     * @param {!boolean} flag adjust label anchor flag
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setAdjustLabelAnchor = function(grade, flag){};
    /**
     * Formats label text. This method must be overridden in the base classes and the the base class method must be called first.
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about tick
     * @param {number} tickIndex tickIndex tick index from 0 to count-1, which resetLabels returns
     * @param {number} modelValue model value
     * @returns {?string} formatted label text
     */
    geotoolkit.axis.TickGenerator.prototype.formatLabel = function(parent, orient, tickInfo, tickIndex, modelValue){};
    /**
     * Returns an array of the visible tick grades
     * @param {Array.<string>} supported supported grades
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @returns {Array.<string>} the visible grades
     */
    geotoolkit.axis.TickGenerator.prototype.getVisibleTickGrades = function(supported){};
    /**
     * Return an array of the visible label grades
     * @param {Array.<string>} supported supported grades
     * see {@link geotoolkit.axis.TickGenerator.getTickGrades()} for valid Tick types
     * @returns {Array.<string>} the visible grades
     */
    geotoolkit.axis.TickGenerator.prototype.getVisibleLabelGrades = function(supported){};
    /**
     * Copy constructor
     * @protected
     * @param {geotoolkit.axis.TickGenerator} src Source to copy from
     */
    geotoolkit.axis.TickGenerator.prototype.copyConstructor = function(src){};
    /**
     * Clone
     * @returns {geotoolkit.axis.TickGenerator} clone
     */
    geotoolkit.axis.TickGenerator.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * See {@link geotoolkit.axis.TickGenerator.setProperties} for details
     * @returns {object} props JSON containing properties
     */
    geotoolkit.axis.TickGenerator.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {object} [properties.major] An object containing major grade properties
     * @param {object} [properties.minor] An object containing minor grade properties
     * @param {object} [properties.edge] An object containing edge grade properties
     * See {geotoolkit.axis.TickGenerator.setTickOptions} for Tick properties
     * @param {object} [properties.tickstyles] An object containing tick styles for specified grades
     * @param {object} [properties.visibleticks] An object containing tick visibility for specified grades
     * @param {object} [properties.ticksizes] An object containing tick sizes for specified grades
     * @param {object} [properties.labelstyles] An object containing label style for specified grades
     * @param {object} [properties.visiblelabels] An object containing label visibility for specified grades
     * @param {object} [properties.labelangles] An object containing label rotation angles for specified grades
     * @param {geotoolkit.axis.ValueTransformer|function|null} [properties.transformer] transformer label value transformer
     * @param {object} [properties.tag] tag user can specify info associated with current object
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setProperties = function(properties){};
    /**
     * Sets label value transformer (optional)
     * @param {geotoolkit.axis.ValueTransformer|function|null} transformer label value transformer
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setLabelValueTransformer = function(transformer){};
    /**
     * Gets label value transformer (by default: 'undefined' - no transformation is applied to a value)
     *
     * @returns {geotoolkit.axis.TickGenerator | undefined} transformer label value transformer
     */
    geotoolkit.axis.TickGenerator.prototype.getLabelValueTransformer = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] An object containing the properties to set
     * @param {object} [properties.major] An object containing the major ticks properties
     * @param {object} [properties.major.tickstyle] JSON containing the properties to set LineStyle of tick. See {geotoolkit.attributes.LineStyle.setProperties} for details
     * @param {boolean} [properties.major.tickvisible] tick visibility
     * @param {object} [properties.major.labelstyle] JSON containing the properties to set TextStyle of label. See {geotoolkit.attributes.TextStyle.setProperties} for details
     * @param {boolean} [properties.major.labelvisible] label visibility
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setOptions = function(properties){};
    /**
     * Sets all the properties pertaining to this tick
     * @param {object} [properties] An object containing the properties to set
     * @param {object} [properties.tickstyle] JSON containing the properties to set LineStyle of tick. See {geotoolkit.attributes.LineStyle.setProperties} for details
     * @param {boolean} [properties.tickvisible] tick visibility
     * @param {number} [properties.ticksize] tick size
     * @param {object} [properties.labelstyle] JSON containing the properties to set TextStyle of label. See {geotoolkit.attributes.TextStyle.setProperties} for details
     * @param {boolean} [properties.labelvisible] label visibility
     * @param {number} [properties.labelangle] angle label rotation angle, in radians
     * @param {string} [tickGrade] Tick grade
     * @returns {geotoolkit.axis.TickGenerator} this
     */
    geotoolkit.axis.TickGenerator.prototype.setTickOptions = function(properties, tickGrade){};

/**
 * Define an abstract class for numeric tick generators
 *
 * @class geotoolkit.axis.NumericTickGenerator
 * @augments geotoolkit.axis.TickGenerator
 */
geotoolkit.axis.NumericTickGenerator = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.axis.NumericTickGenerator} src Source to copy from
     */
    geotoolkit.axis.NumericTickGenerator.prototype.copyConstructor = function(src){};
    /**
     * Sets label format
     * @param {string} tickGrade grade to set format: "MAJOR", "MINOR", "EDGE"
     * @param {geotoolkit.util.NumberFormat} format number format for label
     * @returns {geotoolkit.axis.NumericTickGenerator} this
     *
     * @example
     * // to set the precision of the tickGenerator labels use the following
     * axis.getTickGenerator().setLabelFormat(tickGrade, new geotoolkit.util.NumberFormat({'maximumfractiondigits':2}));
     */
    geotoolkit.axis.NumericTickGenerator.prototype.setLabelFormat = function(tickGrade, format){};
    /**
     * Returns label format
     * @param {string} tickGrade grade to get format: "MAJOR", "MINOR", "EDGE"
     * @returns {?geotoolkit.util.NumberFormat} label format
     */
    geotoolkit.axis.NumericTickGenerator.prototype.getLabelFormat = function(tickGrade){};
    /**
     * Sets locale
     * @param {geotoolkit.util.Locale|string} locale locale
     * @returns {geotoolkit.axis.NumericTickGenerator} this
     */
    geotoolkit.axis.NumericTickGenerator.prototype.setLocale = function(locale){};
    /**
     * Return the current locale
     * @returns {geotoolkit.util.Locale|string}
     */
    geotoolkit.axis.NumericTickGenerator.prototype.getLocale = function(){};
    /**
     * Format label
     * @param {string} upperTickType "EDGE" or "MAJOR" or "MINOR"
     * @param {number} modelValue model coordinate position
     * @returns {?string}
     * @protected
     */
    geotoolkit.axis.NumericTickGenerator.prototype.formatLabelInternal = function(upperTickType, modelValue){};
    /**
     * Formats label text
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @param {number} tickIndex index at tick position
     * @param {number} modelValue model coordinate value
     * @returns {string}
     */
    geotoolkit.axis.NumericTickGenerator.prototype.formatLabel = function(parent, orient, tickInfo, tickIndex, modelValue){};
    /**
     * Sets format label handler
     * @param {function()} handler handler is called to specify format of the label
     * @returns {geotoolkit.axis.NumericTickGenerator} this
     */
    geotoolkit.axis.NumericTickGenerator.prototype.setFormatLabelHandler = function(handler){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.axis.NumericTickGenerator.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     *
     * @param {object} [properties.transformer] class used for transformation
     * @param {object|geotoolkit.util.NumberFormat} [properties.labelformat] label format, label format to be applied to all grades
     * @param {object} [properties.edge.labelformat] edge label format
     * @param {object} [properties.major.labelformat] major label format
     * @param {object} [properties.minor.labelformat] minor label format
     * @param {function()} [properties.formatlabeleventhandler] formatlebeleventhandler
     * @returns {geotoolkit.axis.NumericTickGenerator}
     */
    geotoolkit.axis.NumericTickGenerator.prototype.setProperties = function(properties){};

/**
 * Define information about tick, which is used in tick generator
 * @class geotoolkit.axis.TickInfo
 * @param {string} tickType tick type like major, minor, edge
 * @param {geotoolkit.axis.TickInfo.TickPosition} tickPosition Enum of axis tick positions
 * @param {number} tickSize size of the tick
 * @param {geotoolkit.attributes.LineStyle} lineStyle line style
 * @param {geotoolkit.attributes.TextStyle} textStyle text style
 */
geotoolkit.axis.TickInfo = {};
    /**
     * Enum of axis tick positions
     * @enum
     * @readonly
     */
    geotoolkit.axis.TickInfo.TickPosition = {};
        /**
         * Ticks and labels are on the left side.
         * @type {string}
         */
        geotoolkit.axis.TickInfo.TickPosition.Left = "";
        /**
         * Ticks and labels are on the top side.
         * @type {string}
         */
        geotoolkit.axis.TickInfo.TickPosition.Top = "";
        /**
         * Ticks and labels are on the right side.
         * @type {string}
         */
        geotoolkit.axis.TickInfo.TickPosition.Right = "";
        /**
         * Ticks and labels are on the bottom side.
         * @type {string}
         */
        geotoolkit.axis.TickInfo.TickPosition.Bottom = "";
        /**
         * Ticks are on the left and right side.
         * @type {string}
         */
        geotoolkit.axis.TickInfo.TickPosition.LeftAndRight = "";
        /**
         * Ticks are on the top and bottom side.
         * @type {string}
         */
        geotoolkit.axis.TickInfo.TickPosition.TopAndBottom = "";
        /**
         * Ticks is rendering between the axis or grid border.
         * @type {string}
         */
        geotoolkit.axis.TickInfo.TickPosition.Between = "";
        /**
         * Ticks and labels are at the center.
         * @type {string}
         */
        geotoolkit.axis.TickInfo.TickPosition.Middle = "";
    /**
     * Enum of label positions
     * @enum
     * @readonly
     */
    geotoolkit.axis.TickInfo.LabelPosition = {};
        /**
         * Labels are centered in the axis (default)
         * @type {string}
         */
        geotoolkit.axis.TickInfo.LabelPosition.Center = "";
        /**
         * Labels are left-aligned and on the left side of the axis
         * @type {string}
         */
        geotoolkit.axis.TickInfo.LabelPosition.Left = "";
        /**
         * Labels are top-aligned and on the top side of the axis
         * @type {string}
         */
        geotoolkit.axis.TickInfo.LabelPosition.Top = "";
        /**
         * Labels are right-aligned and on the right side of the axis
         * @type {string}
         */
        geotoolkit.axis.TickInfo.LabelPosition.Right = "";
        /**
         * Labels are bottom-aligned and on the bottom side of the axis
         * @type {string}
         */
        geotoolkit.axis.TickInfo.LabelPosition.Bottom = "";
    /**
     * Set model bounds
     * @param {geotoolkit.util.Rect} modelBounds model bounds
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setModelBounds = function(modelBounds){};
    /**
     * Set visible model bounds
     * @param {geotoolkit.util.Rect} modelBounds visible model bounds
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setVisibleModelBounds = function(modelBounds){};
    /**
     * Get model bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.axis.TickInfo.prototype.getModelBounds = function(){};
    /**
     * Get visible model bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.axis.TickInfo.prototype.getVisibleModelBounds = function(){};
    /**
     * Set device bounds
     * @param {geotoolkit.util.Rect} deviceBounds bounds of the device
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setDeviceBounds = function(deviceBounds){};
    /**
     * Set visible device bounds
     * @param {geotoolkit.util.Rect} deviceBounds visible device bounds
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setVisibleDeviceBounds = function(deviceBounds){};
    /**
     * Get device bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.axis.TickInfo.prototype.getDeviceBounds = function(){};
    /**
     * Get visible device bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.axis.TickInfo.prototype.getVisibleDeviceBounds = function(){};
    /**
     * Set context transform
     * @param {geotoolkit.util.Transformation} transformation transformation from model space to device space
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setContextTransformation = function(transformation){};
    /**
     * Get context transform
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.axis.TickInfo.prototype.getContextTransformation = function(){};
    /**
     * Set tick end
     * @param {number} end tick end
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setTickEnd = function(end){};
    /**
     * Get tick end
     * @returns {number}
     */
    geotoolkit.axis.TickInfo.prototype.getTickEnd = function(){};
    /**
     * Set tick origin
     * @param {number} origin tick origin
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setTickOrigin = function(origin){};
    /**
     * Get tick origin
     * @returns {number}
     */
    geotoolkit.axis.TickInfo.prototype.getTickOrigin = function(){};
    /**
     * Set anchor type
     * @param {geotoolkit.util.AnchorType} type anchor position of the label
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setAnchorType = function(type){};
    /**
     * Get anchor type
     * @returns {geotoolkit.util.AnchorType}
     */
    geotoolkit.axis.TickInfo.prototype.getAnchorType = function(){};
    /**
     * Return tick type as string
     * @returns {string} type
     */
    geotoolkit.axis.TickInfo.prototype.getTickType = function(){};
    /**
     * Sets tick type
     * @param {string} tickType a tick type
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setTickType = function(tickType){};
    /**
     * Return line style
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.axis.TickInfo.prototype.getLineStyle = function(){};
    /**
     * Sets line style
     * @param {geotoolkit.attributes.LineStyle} lineStyle line style
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setLineStyle = function(lineStyle){};
    /**
     * Return text style
     * @returns {geotoolkit.attributes.TextStyle} a text style
     */
    geotoolkit.axis.TickInfo.prototype.getTextStyle = function(){};
    /**
     * Sets text style
     * @param {geotoolkit.attributes.TextStyle} textStyle text style
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setTextStyle = function(textStyle){};
    /**
     * Return tick position
     * @returns {number} a tick position
     */
    geotoolkit.axis.TickInfo.prototype.getTickPosition = function(){};
    /**
     * Sets tick position
     * @param {number} tickPosition tick position
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setTickPosition = function(tickPosition){};
    /**
     * Return rotation angle
     * @returns {number} the angle of rotation
     */
    geotoolkit.axis.TickInfo.prototype.getRotationAngle = function(){};
    /**
     * Sets rotation angle
     * @param {number} rotationAngle rotation angle
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setRotationAngle = function(rotationAngle){};
    /**
     * Return tick size
     * @returns {number} a tick size
     */
    geotoolkit.axis.TickInfo.prototype.getTickSize = function(){};
    /**
     * Return axis dimension
     * @returns {geotoolkit.axis.AxisDimension}
     */
    geotoolkit.axis.TickInfo.prototype.getAxisDimension = function(){};
    /**
     * Sets axis dimension
     * @param {geotoolkit.axis.AxisDimension} dimension axis dimension
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setAxisDimension = function(dimension){};
    /**
     * Set tick size
     *
     * @param {number} tickSize a tick size
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setTickSize = function(tickSize){};
    /**
     * Cancel
     */
    geotoolkit.axis.TickInfo.prototype.cancel = function(){};
    /**
     * Repeat
     */
    geotoolkit.axis.TickInfo.prototype.repeat = function(){};
    /**
     * Is canceled
     * @returns {boolean}
     */
    geotoolkit.axis.TickInfo.prototype.isCanceled = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.axis.TickInfo.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {string} [properties.ticktype] a tick type
     * @param {number} [properties.tickposition] tick position
     * @param {number} [properties.ticksize] a tick size
     * @param {geotoolkit.attributes.LineStyle} [properties.linestyle] line style
     * @param {geotoolkit.attributes.TextStyle} [properties.textstyle] text style
     * @param {geotoolkit.util.AnchorType} [properties.anchortype] anchor position of the label
     * @param {number} [properties.rotationangle] rotation angle
     * @param {geotoolkit.util.Rect} [properties.visiblemodelbounds] visible model bounds
     * @param {geotoolkit.util.Rect} [properties.modelbounds] model bounds
     * @param {geotoolkit.util.Rect} [properties.devicevisiblebounds] visible device bounds
     * @param {geotoolkit.util.Rect} [properties.devicebounds] bounds of the device
     * @param {number} [properties.tickorigin] tick origin
     * @param {number} [properties.tickend] tick end
     * @param {geotoolkit.util.Transformation} [properties.contexttransformation] transformation from model space to device space
     * @param {boolean} [properties.cancel] cancel flag
     * @returns {geotoolkit.axis.TickInfo} this
     */
    geotoolkit.axis.TickInfo.prototype.setProperties = function(properties){};

/**
 * Creates adaptive tick generator. It generates ticks and labels considering the minimum distance between ticks in pixels and it automatically configures itself to create ticks at a reasonable intervals.<br>
 *
 * @class geotoolkit.axis.AdaptiveTickGenerator
 * @augments geotoolkit.axis.NumericTickGenerator
 */
geotoolkit.axis.AdaptiveTickGenerator = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.axis.AdaptiveTickGenerator} src Source to copy from
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.copyConstructor = function(src){};
    /**
     * Gets min span
     * @returns {number} minSpan minimun distance between ticks
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.getMinSpan = function(){};
    /**
     * Sets min span
     * @param {number} minSpan minimun distance between ticks
     * @returns {geotoolkit.axis.AdaptiveTickGenerator} this
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.setMinSpan = function(minSpan){};
    /**
     * Set tick grades priority
     * @param {Array<string>} tickGradesPriority default is ["MAJOR", "MINOR", "EDGE"]
     * @returns {geotoolkit.axis.AdaptiveTickGenerator}
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.setGradesPriority = function(tickGradesPriority){};
    /**
     * Returns tick grades priority
     * @returns {Array<string>}
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.getGradesPriority = function(){};
    /**
     * Sets min span's grade
     * @param {!string} minSpanGrade ('MAJOR' or 'MINOR' values are allowed)
     * @returns {geotoolkit.axis.AdaptiveTickGenerator} this
     * @throws {Error} if grade to set is neither 'MAJOR' nor 'MINOR'
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.setMinSpanGrade = function(minSpanGrade){};
    /**
     * Gets min span's grade ('MINOR' by default)
     * @returns {string} min span's grade
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.getMinSpanGrade = function(){};
    /**
     * Returns minor ticks amount
     * @returns {number} minor ticks amount
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.getMinorTicksAmount = function(){};
    /**
     * Set amount of minor ticks
     * @param {number} minorTicksAmount minor ticks amount
     * @returns {geotoolkit.axis.AdaptiveTickGenerator}
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.setMinorTicksAmount = function(minorTicksAmount){};
    /**
     * An enumeration defining rounding precision values.
     * @enum
     * @readonly
     */
    geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision = {};
        /**
         * By1
         * @type {number}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision.By1 = NaN;
        /**
         * By2
         * @type {number}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision.By2 = NaN;
        /**
         * By3
         * @type {number}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision.By3 = NaN;
        /**
         * By4
         * @type {number}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision.By4 = NaN;
        /**
         * By5
         * @type {number}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision.By5 = NaN;
        /**
         * By6
         * @type {number}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision.By6 = NaN;
        /**
         * By7
         * @type {number}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision.By7 = NaN;
        /**
         * By8
         * @type {number}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision.By8 = NaN;
        /**
         * By9
         * @type {number}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision.By9 = NaN;
    /**
     * An enumeration defining rounding precision values.
     * @enum
     * @readonly
     */
    geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType = {};
        /**
         * Fixed limits
         * @type {string}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType.Fixed = "";
        /**
         * Nice, nice adaptive algorithm
         * @type {string}
         */
        geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType.Nice = "";
    /**
     * Sets label alignment
     * @deprecated since 2.6
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.setLabelsAlignment = function(){};
    /**
     * Returns precision
     *
     * @returns {geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision} precision
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.getPrecision = function(){};
    /**
     * Sets precision
     *
     * @param {string | geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision} precision legacy algorithm precision
     * @returns {geotoolkit.axis.AdaptiveTickGenerator} this
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.setPrecision = function(precision){};
    /**
     * Returns type of adaptive algorithm
     * @returns {geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType} adaptive type
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.getAdaptiveType = function(){};
    /**
     * Sets type of adaptive algorithm
     *
     * @param {geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType} adaptiveType type of adaptive algorithm
     * @returns {geotoolkit.axis.AdaptiveTickGenerator} this
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.setAdaptiveType = function(adaptiveType){};
    /**
     * Sets spacing to be used instead of calculated step in nice mode
     * If spaicng is NaN then it is not used
     * @param {number} spacing desired step between major ticks
     * @returns {geotoolkit.axis.AdaptiveTickGenerator} this
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.setSpacing = function(spacing){};
    /**
     * Returns spacing to be used instead of calculated step in nice mode
     * If spacing is NaN then it is not used
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.getSpacing = function(){};
    /**
     * Reset
     * @override
     * @returns {Array<string>} array of visible grades (either ticks' or labels')
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.reset = function(){};
    /**
     * Reset ticks
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.resetTicks = function(parent, orient, tickInfo){};
    /**
     * @override
     * @param {geotoolkit.axis.TickInfo} ti tickInfo tickinfo
     * @param {geotoolkit.axis.AxisOrientation|string} orient axis orientation
     * @param {number} fromValue generate labels from
     * @param {number} toValue generate labels to
     * @returns {Array}
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.getMaxLabels = function(ti, orient, fromValue, toValue){};
    /**
     * Resets labels
     * Generate labels from the model limits and return number of labels
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.resetLabels = function(parent, orient, tickInfo){};
    /**
     * Gets next tick index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientaion
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @param {number} tickIndex index at tick position
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.nextTick = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Gets next label index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @param {number} tickIndex index at tick position
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.nextLabel = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Gets hide labels on span too small flag ("true" by default)
     * @returns {!boolean} hide labels flag
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.getHideLabelsOnSpanTooSmall = function(){};
    /**
     * Sets hide labels on span too small flag
     * @param {!boolean} flag hide labels flag
     * @returns {geotoolkit.axis.AdaptiveTickGenerator} this
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.setHideLabelsOnSpanTooSmall = function(flag){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.minspan] minimum distance between ticks
     * @param {number} [properties.minspangrade] tick grade to be used for minimum distance between ticks
     * @param {string|geotoolkit.axis.AdaptiveTickGenerator.AdaptivePrecision} [properties.precision] precision for legacy algorithm
     * @param {geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType} [properties.adaptivetype] type of adaptive algorithm
     * @param {number} [properties.minorticksamount] count of minor ticks
     * @param {Array<string>} [properties.gradespriority] default is ["MAJOR", "MINOR", "EDGE"]
     * @param {!boolean} [properties.hidelabelsonspantoosmall] hide labels flag
     * @returns {geotoolkit.axis.AdaptiveTickGenerator}
     */
    geotoolkit.axis.AdaptiveTickGenerator.prototype.setProperties = function(properties){};

/**
 * Defines helper method(s) to create tick generator instance
 *
 * @class geotoolkit.axis.NumericTickGeneratorFactory
 */
geotoolkit.axis.NumericTickGeneratorFactory = {};
    /**
     * Enum of axis tick generator type
     * @enum
     * @readonly
     */
    geotoolkit.axis.NumericTickGeneratorFactory.GeneratorType = {};
        /**
         * Adaptive tick generator
         * @type {string}
         */
        geotoolkit.axis.NumericTickGeneratorFactory.GeneratorType.Adaptive = "";
        /**
         * Linear tick generator
         * @type {string}
         */
        geotoolkit.axis.NumericTickGeneratorFactory.GeneratorType.Linear = "";
    /**
     * Returns instance of the factory
     * @returns {geotoolkit.axis.NumericTickGeneratorFactory} factory
     */
    geotoolkit.axis.NumericTickGeneratorFactory.getInstance = function(){};
    /**
     * Creates tick generator instance based on specified type
     *
     * @param {object} [options] tick generator options
     * @param {object} [options.ticks] ticks options
     * @param {string} [options.ticks.EDGE] 'EDGE' grade ticks options
     * @param {boolean} [options.ticks.EDGE.visible=false] 'EDGE' grade ticks visibility
     *
     * @param {object} [options.labels] labels options
     * @param {string} [options.labels.EDGE] 'EDGE' grade labels options
     * @param {boolean} [options.labels.EDGE.visible=false] 'EDGE' grade labels visibility
     * @param {geotoolkit.axis.NumericTickGeneratorFactory.GeneratorType|string} [type='adaptive'] type of tick generator
     * @returns {geotoolkit.axis.NumericTickGenerator} tick generator
     */
    geotoolkit.axis.NumericTickGeneratorFactory.prototype.create = function(options, type){};
    /**
     * Creates linear numeric tick generator instance
     *
     * @param {object} [options] tick generator options
     * @param {object} [options.ticks] ticks options
     * @param {string} [options.ticks.EDGE] 'EDGE' grade ticks options
     * @param {boolean} [options.ticks.EDGE.visible=false] 'EDGE' grade ticks visibility
     *
     * @param {object} [options.labels] labels options
     * @param {string} [options.labels.EDGE] 'EDGE' grade labels options
     * @param {boolean} [options.labels.EDGE.visible=false] 'EDGE' grade labels visibility
     *
     * @returns {geotoolkit.axis.NumericLinearTickGenerator} tick generator
     */
    geotoolkit.axis.NumericTickGeneratorFactory.prototype.createLinear = function(options){};
    /**
     * Creates adaptive tick generator instance
     *
     * @param {object} [options] adaptive tick generator options
     * @param {geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType} [options.adaptivetype=geotoolkit.axis.AdaptiveTickGenerator.AdaptiveType.Nice]
     * type of adaptive algorithm
     * @param {number} [options.minspan=75] minimum distance between ticks
     * @param {number} [options.minspangrade='MAJOR'] tick grade to be used for minimum distance between ticks
     *
     * @param {object} [options.ticks] ticks options
     * @param {string} [options.ticks.EDGE] 'EDGE' grade ticks options
     * @param {boolean} [options.ticks.EDGE.visible=false] 'EDGE' grade ticks visibility
     *
     * @param {object} [options.labels] labels options
     * @param {string} [options.labels.EDGE] 'EDGE' grade labels options
     * @param {boolean} [options.labels.EDGE.visible=false] 'EDGE' grade labels visibility
     *
     * @returns {geotoolkit.axis.AdaptiveTickGenerator} tick generator
     */
    geotoolkit.axis.NumericTickGeneratorFactory.prototype.createAdaptive = function(options){};

/**
 * Logarithmic tick generator with automatic spacing of ticks and labels.
 *
 * @class geotoolkit.axis.AdaptiveLogTickGenerator
 * @augments geotoolkit.axis.NumericTickGenerator
 * @param {boolean} [rounded=true] specify how to use powers of ten
 */
geotoolkit.axis.AdaptiveLogTickGenerator = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.axis.AdaptiveLogTickGenerator} src Source to copy from
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.copyConstructor = function(src){};
    /**
     * Sets label alignment
     * @deprecated since 2.6
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.setLabelsAlignment = function(){};
    /**
     * Resets this tick generator to given parameters
     * @override
     * @param {geotoolkit.scene.Node} parent for the node
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {string[]}
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.reset = function(parent, orient, tickInfo){};
    /**
     * Reset ticks (lineStyles, tickSizes, tickTypes)
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.resetTicks = function(parent, orient, tickInfo){};
    /**
     * @override
     * @param {geotoolkit.axis.TickInfo} ti tickInfo tickinfo
     * @param {geotoolkit.axis.AxisOrientation|string} orient axis orientation
     * @param {number} fromValue generate labels from
     * @param {number} toValue generate labels to
     * @returns {object[]}
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.getMaxLabels = function(ti, orient, fromValue, toValue){};
    /**
     * Reset labels (textStyles)
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.resetLabels = function(parent, orient, tickInfo){};
    /**
     * Gets next tick index
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @param {number} tickIndex index at the tick position
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.nextTick = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Gets next label index
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @param {number} tickIndex index at tick position
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.nextLabel = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Formats label text
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about tick
     * @param {number} tickIndex tickIndex tick index from 0 to count-1, which resetLabels returns
     * @param {number} modelValue model value
     * @returns {?string} formatted label text
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.formatLabel = function(parent, orient, tickInfo, tickIndex, modelValue){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     *
     * @param {geotoolkit.axis.AxisOrientation|string} [properties.orientation] orientation
     * @returns {geotoolkit.axis.AdaptiveLogTickGenerator}
     */
    geotoolkit.axis.AdaptiveLogTickGenerator.prototype.setProperties = function(properties){};

/**
 * Creates discrete value tick generator
 *
 * @class geotoolkit.axis.DiscreteValueTickGenerator
 * @augments geotoolkit.axis.NumericTickGenerator
 * @param {object|function} dataProvider should be a function or instance of class that implements 'getTicksAndLabels' method
 * @param {array.<string>} [dataProvider.labels] array of labels
 * @param {array.<number>} [dataProvider.positions] array of the model label positions
 */
geotoolkit.axis.DiscreteValueTickGenerator = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.axis.DiscreteValueTickGenerator} src Source to copy from
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.copyConstructor = function(src){};
    /**
     * Sets label alignment
     * @deprecated since 2.6
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.setLabelsAlignment = function(){};
    /**
     * Set Major or Minor tick step size
     *
     * @param {string} tickGrade
     * tick grade MAJOR or MINOR
     * @param {number} tickStep
     * amount each tick should step
     * @returns {geotoolkit.axis.DiscreteValueTickGenerator}
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.setTickStep = function(tickGrade, tickStep){};
    /**
     * Reset
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {string[]}
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.reset = function(parent, orient, tickInfo){};
    /**
     * Reset ticks and by reset this means you are getting the amount of ticks for this grade
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {number}
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.resetTicks = function(parent, orient, tickInfo){};
    /**
     * Gets maximum label.
     * Orient defines if it is horizontal of vertical.
     * Uses fromLabel and toLabel values
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo info about tick position
     * @param {number} fromValue generate labels from
     * @param {number} toValue generate labels to
     * @returns {string}
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.getMaxLabel = function(parent, orient, tickInfo, fromValue, toValue){};
    /**
     * Reset labels
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation horizontal or vertical
     * @param {geotoolkit.axis.TickInfo} tickInfo information about the tick
     * @returns {number}
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.resetLabels = function(parent, orient, tickInfo){};
    /**
     * Sets label format handler
     * @param {function()} handler handler is called to specify format of the label
     * @returns {geotoolkit.axis.DiscreteValueTickGenerator} this
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.setFormatLabelHandler = function(handler){};
    /**
     * Gets next tick index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation : horizontal or vertical
     * @param {geotoolkit.axis.TickInfo} tickInfo information about the tick
     * @param {number} tickIndex index at the tick position
     * @returns {number}
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.nextTick = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Gets next label index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation : horizontal or vertical
     * @param {geotoolkit.axis.TickInfo} tickInfo information about the tick
     * @param {number} tickIndex index at the tick position
     * @returns {number}
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.nextLabel = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Formats label text
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about tick
     * @param {number} tickIndex tickIndex tick index from 0 to count-1, which resetLabels returns
     * @param {number} modelValue model value
     * @returns {?string} formatted label text
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.formatLabel = function(parent, orient, tickInfo, tickIndex, modelValue){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {string} [properties.maxlabel] max label
     * @returns {geotoolkit.axis.DiscreteValueTickGenerator}
     */
    geotoolkit.axis.DiscreteValueTickGenerator.prototype.setProperties = function(properties){};

/**
 * Creates numeric linear tick generator
 *
 * @class geotoolkit.axis.NumericLinearTickGenerator
 * @augments geotoolkit.axis.NumericTickGenerator
 */
geotoolkit.axis.NumericLinearTickGenerator = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.axis.NumericLinearTickGenerator} src Source to copy from
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.copyConstructor = function(src){};
    /**
     * Sets label alignment
     * @deprecated since 2.6
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.setLabelsAlignment = function(){};
    /**
     * Set Major or Minor tick step size
     *
     * @param {string} tickGrade
     * tick grade MAJOR or MINOR
     * @param {number} tickStep
     * amount each tick should step
     * @returns {geotoolkit.axis.NumericLinearTickGenerator} this
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.setTickStep = function(tickGrade, tickStep){};
    /**
     * Sets offset for tick generator
     * @param {number} offset tick generator offset
     * @returns {geotoolkit.axis.NumericLinearTickGenerator}
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.setOffset = function(offset){};
    /**
     * Return offset
     * @returns {number}
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.getOffset = function(){};
    /**
     * Returns precision
     * @returns {number}
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.getPrecision = function(){};
    /**
     * set precision
     * @param {string} precision precision value to be set
     * @returns {geotoolkit.axis.NumericLinearTickGenerator} this
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.setPrecision = function(precision){};
    /**
     * Reset
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo information about the tick
     * @returns {Array<string>}
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.reset = function(parent, orient, tickInfo){};
    /**
     * Reset ticks
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo information about the tick
     * @returns {number}
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.resetTicks = function(parent, orient, tickInfo){};
    /**
     * @override
     * @param {geotoolkit.axis.TickInfo} ti tickInfo tickinfo
     * @param {geotoolkit.axis.AxisOrientation|string} orient axis orientation
     * @param {number} fromValue generate labels from
     * @param {number} toValue generate labels to
     * @returns {object[]}
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.getMaxLabels = function(ti, orient, fromValue, toValue){};
    /**
     * Reset labels
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo information about the tick
     * @returns {number}
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.resetLabels = function(parent, orient, tickInfo){};
    /**
     * Gets next tick index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo information about the tick
     * @param {number} tickIndex index at the tick poisition
     * @returns {number}
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.nextTick = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Gets next label index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo information about the tick
     * @param {number} tickIndex index at the tick
     * @returns {number}
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.nextLabel = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Gets hide labels on span between labels is too small flag ("true" by default)
     * @returns {!boolean} hide labels flag
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.getHideLabelsOnSpanTooSmall = function(){};
    /**
     * Sets hide labels on span between lebels too small flag
     * @param {!boolean} flag hide labels flag
     * @returns {geotoolkit.axis.NumericLinearTickGenerator} this
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.setHideLabelsOnSpanTooSmall = function(flag){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @override
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.majormodelstep] step for each major tick
     * @param {number} [properties.minormodelstep] step for each minor tick
     * @param {number} [properties.precision] precision
     * @param {number} [properties.offset] tick generator offset
     * @param {!boolean} [properties.hidelabelsonspantoosmall] hide labels flag
     * @returns {geotoolkit.axis.NumericLinearTickGenerator}
     */
    geotoolkit.axis.NumericLinearTickGenerator.prototype.setProperties = function(properties){};

/**
 * Define date and time tick generator. Ticks are generated based on UTC date and time by default if no timezone offset is specified
 *
 * @class geotoolkit.axis.DateTimeTickGenerator
 * @augments geotoolkit.axis.TickGenerator
 * @param {number} timeZoneOffset UTC time if timeZoneOffset is 0
 * @param {geotoolkit.util.AbstractUnit} offsetUnit offset unit specified in sec,mls,hours.
 */
geotoolkit.axis.DateTimeTickGenerator = {};
    /**
     * Enum of label mode
     * @enum
     * @readonly
     */
    geotoolkit.axis.DateTimeTickGenerator.LabelMode = {};
        /**
         * Default
         * @type {number}
         */
        geotoolkit.axis.DateTimeTickGenerator.LabelMode.Default = NaN;
        /**
         * Between
         * @type {number}
         */
        geotoolkit.axis.DateTimeTickGenerator.LabelMode.Between = NaN;
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.axis.DateTimeTickGenerator} src Source to copy from
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.copyConstructor = function(src){};
    /**
     * Set time zone
     * @param {geotoolkit.axis.TimeZone} timeZone time zone UTC or Local Time
     * @returns {geotoolkit.axis.DateTimeTickGenerator} this
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.setTimeZone = function(timeZone){};
    /**
     *@override
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.getMaxLabels = function(){};
    /**
     * Get time zone
     * @returns {geotoolkit.axis.TimeZone} timeZone
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.getTimeZone = function(){};
    /**
     * Reset
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {Array<string>}
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.reset = function(parent, orient, tickInfo){};
    /**
     * Sets rotation strategy
     * @deprecated since 2.6
     * @param {boolean} rotate rotate labels or not
     * @returns {geotoolkit.axis.DateTimeTickGenerator} this
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.setRotateLabels = function(rotate){};
    /**
     * Sets label mode
     * @param {geotoolkit.axis.DateTimeTickGenerator.LabelMode} mode label mode
     * @returns {geotoolkit.axis.DateTimeTickGenerator} this
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.setLabelMode = function(mode){};
    /**
     * Gets label mode
     * @returns {geotoolkit.axis.DateTimeTickGenerator.LabelMode}
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.getLabelMode = function(){};
    /**
     * Sets zoom level
     * @param {geotoolkit.axis.DateZoomLevel|number} zoomLevel Date ZoomLevel
     * @returns {geotoolkit.axis.DateTimeTickGenerator} this
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.setZoomLevel = function(zoomLevel){};
    /**
     * Gets zoom level
     * @returns {geotoolkit.axis.DateZoomLevel|number}
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.getZoomLevel = function(){};
    /**
     * Reset ticks (lineStyles, tickSizes, tickTypes)
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {number}
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.resetTicks = function(parent, orient, tickInfo){};
    /**
     * Reset labels (textStyles)
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {number}
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.resetLabels = function(parent, orient, tickInfo){};
    /**
     * Gets next tick index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @param {number} tickIndex index at the tick position
     * @returns {number}
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.nextTick = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Gets next label index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @param {number} tickIndex index at tick position
     * @returns {number}
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.nextLabel = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Formats label text
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @param {number} tickIndex index at tick position
     * @param {number} modelValue model coordinate value
     * @returns {string}
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.formatLabel = function(parent, orient, tickInfo, tickIndex, modelValue){};
    /**
     * Sets format label handler
     * @param {function()} handler handler is called to set the format of the label
     * @returns {geotoolkit.axis.DateTimeTickGenerator} this
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.setFormatLabelHandler = function(handler){};
    /**
     * Sets unit
     *
     *
     * @param {string|geotoolkit.util.AbstractUnit} unit unit to be set
     * @returns {geotoolkit.axis.DateTimeTickGenerator} this
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.setUnit = function(unit){};
    /**
     * Enables week starting from Monday
     * @param {boolean} enable Enables or disables week starting from Monday
     */
    geotoolkit.axis.DateTimeTickGenerator.setWeekStartMonday = function(enable){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.axis.TimeZone} [properties.timezone] time zone UTC or Local Time
     * @param {number} [properties.zoomlevel] zoom level
     * @param {number} [properties.minspan] minimum span between ticks
     * @param {boolean} [properties.rotatelabels] rotate lebels or not
     * @param {geotoolkit.axis.DateTimeTickGenerator.LabelMode} [properties.labelmode] label mode (0 or 1)
     * @param {function()} [properties.formatlabeleventhandler] format label event handler
     * @param {number} [properties.localtimezoneoffset] local time zone offset unit
     * @param {number} [properties.unitconversionfactor] unit converstion factor
     * @param {string[]} [properties.tickgrades] array of the type of ticks that are supported
     * @param {object|geotoolkit.attributes.LineStyle} [properties.major.majortick] major tick line style
     * @param {object|geotoolkit.attributes.TextStyle} [properties.major.majorlabel] major label text style
     * @returns {geotoolkit.axis.DateTimeTickGenerator}
     */
    geotoolkit.axis.DateTimeTickGenerator.prototype.setProperties = function(properties){};

/**
 * The adaptive data time tick generator will automatically configure itself to create DateTime Ticks at a reasonable interval.
 *
 * @class geotoolkit.axis.AdaptiveDateTimeTickGenerator
 * @augments geotoolkit.axis.TickGenerator
 * @param {number} timeZoneOffset UTC time if timeZoneOffset is 0
 * @param {geotoolkit.util.AbstractUnit|string} offsetUnit specified in sec,mls,hours.
 */
geotoolkit.axis.AdaptiveDateTimeTickGenerator = {};
    /**
     * @override
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.getTickGrades = function(){};
    /**
     * Sets locale
     * @param {geotoolkit.util.Locale|string} locale locale
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setLocale = function(locale){};
    /**
     * Return the current locale
     * @returns {geotoolkit.util.Locale|string}
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.getLocale = function(){};
    /**
     * Set Daylight Saving Time dates in milliseconds
     * @param {number[]} [timeStamps] Daylight Saving Time dates in milliseconds
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setDSTTimestamps = function(timeStamps){};
    /**
     * Copy constructor
     * @protected
     * @param {geotoolkit.axis.AdaptiveDateTimeTickGenerator} src Source to copy from
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.copyConstructor = function(src){};
    /**
     * Invalidate
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.invalidate = function(){};
    /**
     * Set time zone
     * @param {geotoolkit.axis.TimeZone|string} timeZone UTC or local time,
     * If using Third Party such as momentJS see also {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setTimeZone = function(timeZone){};
    /**
     * Set time zone offset
     * @param {number} timeZoneOffset UTC time if timeZoneOffset is 0
     * @param {geotoolkit.util.AbstractUnit|string} [offsetUnit='h'] specified in sec,mls,hours.
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setTimeZoneOffset = function(timeZoneOffset, offsetUnit){};
    /**
     * Get time zone
     * @returns {geotoolkit.axis.TimeZone|string} timeZone current time zone
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.getTimeZone = function(){};
    /**
     * Get time zone offset
     * @param {geotoolkit.util.AbstractUnit|string} [offsetUnit='h'] specified in sec,mls,hours
     * @returns {geotoolkit.axis.TimeZone|string} timeZone offset
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.getTimeZoneOffset = function(offsetUnit){};
    /**
     * @override
     * @param {geotoolkit.axis.TickInfo} tickInfo information about the tick
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {number} fromValue get max labels from
     * @param {number} toValue get max labels to
     * @returns {object[]}
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.getMaxLabels = function(tickInfo, orient, fromValue, toValue){};
    /**
     * Reset
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient axis orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick Info
     * @returns {Array<string>}
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.reset = function(parent, orient, tickInfo){};
    /**
     * Sets rotation strategy
     * @deprecated since 2.3
     * @param {boolean} rotate rotate labels or not
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setRotateLabels = function(rotate){};
    /**
     * Set label pattern
     * @param {object} pattern internal object represents labels pattern information
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator}
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setLabelPattern = function(pattern){};
    /**
     * Reset ticks
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.resetTicks = function(parent, orient, tickInfo){};
    /**
     * Reset labels
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tickinfo
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.resetLabels = function(parent, orient, tickInfo){};
    /**
     * Gets next tick index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo info about the tick
     * @param {number} tickIndex tick index from 0 to count-1
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.nextTick = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Gets next label index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo info about the tick
     * @param {number} tickIndex tick index from 0 to count-1,
     * @returns {number}
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.nextLabel = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Formats label text
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo info about the tick
     * @param {number} tickIndex tick index from 0 to count-1,
     * @param {number} modelValue model coordinate position
     * @returns {string}
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.formatLabel = function(parent, orient, tickInfo, tickIndex, modelValue){};
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
     * modelValue {number} The value to build a label for
     *
     * @param {function()} handler handler is called to specify format of the label
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setFormatLabelHandler = function(handler){};
    /**
     * Set label max text
     * @param {string} tickGrade valid values are "EDGE", "DST", "MAJOR" and "MINOR"
     * @see {@link geotoolkit.axis.AdaptiveDateTimeTickGenerator.getTickGrades()} for valid Tick types
     * @param {string} text label text
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setLabelMaxText = function(tickGrade, text){};
    /**
     * Sets format dictionary
     *
     * Default dictionary is ["s.u", "s.u", "s.u", "H:i:s", "H:i:s", "H:i", "H:i", "M j<b\r/>H:i", "M j<b\r/>H:i", "M j<b\r/>H:i", "M j", "M, Y", "Y", "Y", "Y"]
     * The index of the dictionary should match geotoolkit.axis.DateZoomLevel
     *
     * @param {Array.<string>} dictionary dictionary to use to format "EDGE", "DST", "MAJOR" and "MINOR" and labels when label grade format not specified
     * @see {@link geotoolkit.axis.AdaptiveDateTimeTickGenerator.getTickGrades()} for valid Tick types
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setFormatDictionary = function(dictionary){};
    /**
     * Set label grade format
     * @param {string} tickGrade valid values are "EDGE", "DST", "MAJOR" and "MINOR"
     * @see {@link geotoolkit.axis.AdaptiveDateTimeTickGenerator.getTickGrades()} for valid Tick types
     * @param {string} [format] label grade format
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setLabelGradeFormat = function(tickGrade, format){};
    /**
     * Return label grade format
     * @param {string} tickGrade valid values are "EDGE", "DST", "MAJOR" and "MINOR"
     * @see {@link geotoolkit.axis.AdaptiveDateTimeTickGenerator.getTickGrades()} for valid Tick types
     * @returns {?string} format label grade format
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.getLabelGradeFormat = function(tickGrade){};
    /**
     * Sets unit
     *
     * @param {string|geotoolkit.util.AbstractUnit} unit unit to set
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setUnit = function(unit){};
    /**
     * Sets supported ticks visible.
     * Note that this would also change the resulting visibility of the corresponding label.
     * (An AdaptiveDateTimeTickGenerator's label can be visible only if the corresponding tick is visible)
     * Use LineStyle null to make tick invisible.
     *
     * @param {string} tickGrade Tick grade
     * @param {boolean} visible Tick visibility
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setVisibleTickGrade = function(tickGrade, visible){};
    /**
     * Enable or disable 'Monday' flag
     * @param {boolean} enable Enables week starting from Monday, default is disabled
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.setWeekStartMonday = function(enable){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties see {@link geotoolkit.axis.AdaptiveDateTimeTickGenerator#setProperties}
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     *
     * @param {function()} [properties.formatlabeleventhandler] format of the label see {@link geotoolkit.axis.AdaptiveDateTimeTickGenerator#setFormatLabelHandler}
     * @param {object} [properties.labelformat] tickGrade valid values are "EDGE", "DST", "MAJOR" and "MINOR" with corresponding format label grade format
     * @param {number} [properties.labelminspan] min distance between 2 labels
     * @param {number} [properties.labeledgespan] distance of label from edge
     * @param {number} [properties.labelautohide] minimum distance to hide label
     * @param {boolean} [properties.rotatelabels] rotate label or not
     * @param {geotoolkit.util.Locale|string} [properties.locale] locale
     * @param {geotoolkit.axis.TimeZone|string} [properties.timezone] timeZone UTC or local time
     * @param {number} [properties.localtimezoneoffset] timezoneoffset
     * @param {number} [properties.minspan] min distance between ticks in device space
     * @param {object|geotoolkit.attributes.LineStyle} [properties.edgetick] style for edge tick
     * @param {object|geotoolkit.attributes.LineStyle} [properties.majortick] style for major tick
     * @param {object|geotoolkit.attributes.LineStyle} [properties.minortick] style for minor tick
     * @param {object|geotoolkit.attributes.LineStyle} [properties.dsttick] style for DST tick
     * @param {object|geotoolkit.attributes.TextStyle} [properties.edgelabel] text style for edge label
     * @param {object|geotoolkit.attributes.TextStyle} [properties.majorlabel] text style for major label
     * @param {object|geotoolkit.attributes.TextStyle} [properties.minorlabel] text style for minor label
     * @param {object|geotoolkit.attributes.TextStyle} [properties.dstlabel] text style for DST label
     * @returns {geotoolkit.axis.AdaptiveDateTimeTickGenerator} this
     */
    geotoolkit.axis.AdaptiveDateTimeTickGenerator.prototype.setProperties = function(properties){};

/**
 * SecondaryTickGenerator utilizes "primaryValues-to-secondaryValues" mapping
 * to generate ticks/labels linearly spaced in secondary model space, so that distance
 * between major ticks/labels in the space is equal to "majorStep" (or "minorStep" for
 * minor ticks/labels correspondingly). Note, that linear spacing in secondary space
 * does not mean linear spacing in primary space.
 *
 * @class geotoolkit.axis.SecondaryTickGenerator
 * @augments geotoolkit.axis.NumericTickGenerator
 *
 * @param {number[]} primaryValues growing array of values in primary model space
 * (the generator's axis parent model space)
 * @param {number[]} secondaryValues an array of values in a secondary space
 * @param {number} majorStep tick step for major ticks (in secondary space)
 * @param {number} minorStep tick step for minor ticks (in secondary space)
 */
geotoolkit.axis.SecondaryTickGenerator = {};
    /**
     * Copy constructor
     * @protected
     * @param {geotoolkit.axis.SecondaryTickGenerator} src Source to copy from
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.copyConstructor = function(src){};
    /**
     * Sets labels decimation state
     * @param {boolean} labelsDecimation labels decimation state
     * @returns {geotoolkit.axis.SecondaryTickGenerator} this
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.setLabelsDecimation = function(labelsDecimation){};
    /**
     * Gets labels decimation state
     * @returns {boolean} labelsDecimation labels decimation state
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.getLabelsDecimation = function(){};
    /**
     * Gets primary-to-secondary values mapping.
     * @returns {object} value mapping
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.getMapping = function(){};
    /**
     * Gets primary-to-secondary values mapping.
     * @param {number[]} primaryValues growing array of values in primary model space (the generator's axis parent model space)
     * @param {number[]} secondaryValues an array of values in a secondary space
     * @returns {geotoolkit.axis.SecondaryTickGenerator} this
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.setMapping = function(primaryValues, secondaryValues){};
    /**
     * Sets tick step (in secondary space)
     *
     * @param {string} tickGrade tick grade
     * @param {number} tickStep amount each tick should step
     * @returns {geotoolkit.axis.SecondaryTickGenerator} this
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.setTickStep = function(tickGrade, tickStep){};
    /**
     * Gets tick step (in secondary space)
     *
     * @param {string} tickGrade tick grade
     * @returns {number} tick step
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.getTickStep = function(tickGrade){};
    /**
     * Sets tick size (length)
     *
     * @param {string} tickGrade tick grade
     * @param {number} tickSize tick size to set
     * @returns {geotoolkit.axis.SecondaryTickGenerator} this
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.setTickSize = function(tickGrade, tickSize){};
    /**
     * Gets tick size (length)
     *
     * @param {string} tickGrade tick grade
     *
     * @returns {number} tickSize tick size
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.getTickSize = function(tickGrade){};
    /**
     * Resets tick generator state
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     *
     * @returns {string[]} supported tick grades: ["MAJOR", "MINOR", "MAJORREVERSED" and "MINORREVERSED"]
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.reset = function(parent, orient, tickInfo){};
    /**
     * Returns supported tick grades: ["MAJOR", "MINOR", "MAJORREVERSED" and "MINORREVERSED"]
     * @override
     * @returns {string[]} supported tick grades: ["MAJOR", "MINOR", "MAJORREVERSED" and "MINORREVERSED"]
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.getTickGrades = function(){};
    /**
     * Resets labels. This method is called to start iterating through labels.
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about labels
     *
     * @returns {number} labels count for the current tick type
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.resetLabels = function(parent, orient, tickInfo){};
    /**
     * Resets ticks. This method is called to start iterating through ticks.
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about labels
     *
     * @returns {number} ticks count for the current tick type
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.resetTicks = function(parent, orient, tickInfo){};
    /**
     * Generates information about next tick
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo an info about tick
     * @param {number} tickIndex tick index from 0 to count-1, which resetTicks returns
     *
     * @returns {number} a model position of the tick
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.nextTick = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Generates information about next label
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo an info about tick
     * @param {number} tickIndex tick index from 0 to count-1, which resetLabels returns
     *
     * @returns {number} a model position of the label
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.nextLabel = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Formats label text positioned at "labelPos" in primary model space.
     * IMPORTANT: Textual content of the label is formatted out of its position
     * in secondary space.
     *
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo an info about tick
     * @param {number} tickIndex tick index from 0 to count-1, which resetTicks returns
     * @param {number} labelPos model value (in primary space) - ignored by the implementation
     *
     * @returns {string} label text
     */
    geotoolkit.axis.SecondaryTickGenerator.prototype.formatLabel = function(parent, orient, tickInfo, tickIndex, labelPos){};

/**
 * This class uses the {@link geotoolkit.axis.TickGenerator} which is passed to it and creates an axis.<br>
 * It allows to modify the axis tick positions, axis orientations, axis label positions etc. CSS can be used to modify all axis settings.
 * @class geotoolkit.axis.Axis
 * @augments geotoolkit.scene.shapes.Shape
 * @implements geotoolkit.layout.ILayoutable
 * @param {geotoolkit.axis.TickGenerator|object} [tickGenerator] User can pass an object OR a tickGenerator (by default geotoolkit.axis.AdaptiveTickGenerator is used of nothing is passed)
 * @param {geotoolkit.axis.TickGenerator} [tickGenerator.tickgenerator=geotoolkit.axis.AdaptiveTickGenerator] tickGenerator to use in axis
 * @param {geotoolkit.axis.TickInfo.TickPosition} [tickGenerator.tickposition] tick position
 * @param {geotoolkit.axis.TickInfo.LabelPosition} [tickGenerator.labelposition] label position
 * @param {geotoolkit.axis.AxisOrientation} [tickGenerator.orientation] axis orientation
 * @param {string|object} [tickGenerator.title=null] deprecated (since 2.6 type string is obsolete, use object) axis title
 * @param {string} [tickGenerator.title.text=null] axis title
 * @param {boolean} [tickGenerator.title.showellipsis=false] boolean flag that enables/disables ellipsis in case if text is too long
 * @param {boolean} [tickGenerator.title.visible=false] axis title visibility
 * @param {geotoolkit.attributes.TextStyle|object} [tickGenerator.title.textstyle=null] a new title text style
 * @param {geotoolkit.util.AnchorType} [tickGenerator.title.alignment=geotoolkit.util.AnchorType.None] title anchor
 * @param {geotoolkit.util.AnchorType} [tickGenerator.title.anchor=geotoolkit.util.AnchorType.None] deprecated (since 2.6) title anchor
 * @param {boolean} [tickGenerator.titlevisible=false] deprecated (since 2.6 use tickGenerator.title.visible) axis title visibility
 * @param {geotoolkit.attributes.TextStyle|object} [tickGenerator.titletextstyle=null] deprecated (since 2.6 use tickGenerator.title.textstyle) a new title text style
 * @param {string|geotoolkit.util.RgbaColor} [tickGenerator.titletextstyle.color] deprecated (since 2.6) text color
 * @param {string} [tickGenerator.titletextstyle.baseLine] deprecated (since 2.6) base line
 * @param {string} [tickGenerator.titletextstyle.alignment] deprecated (since 2.6) alignment
 * @param {string} [tickGenerator.titletextstyle.font] deprecated (since 2.6) font
 * @param {boolean} [tickGenerator.titleanchor=geotoolkit.util.AnchorType.None] deprecated (since 2.6 use tickGenerator.title.anchor) title anchor
 * @param {boolean} [tickGenerator.hideoverlappedtext=true] hide overlapped text flag
 * @param {number} [tickGenerator.labelpadding=0] label padding size in pixels
 *
 * @example
 * // In this example we have used AdaptiveLogTickGenerator and set the label rotation to true. Refer to the axes and grid tutorial for more options.
 * tickGenerator = new geotoolkit.axis.AdaptiveLogTickGenerator()
 * .setVisibleTickGrade("MINOR", true);
 * minValue = 0;
 * maxValue = 3;
 * bounds = new geotoolkit.util.Rect(105, 10, 195, 340);
 *
 * var axis = new geotoolkit.axis.Axis(tickGenerator)
 * .setBounds(bounds)
 * .setModelLimits(new geotoolkit.util.Rect(minValue, minValue, maxValue, maxValue)); // note that group has a clipping by model limits, so to avoid overlapping set models limits accordingly.
 * axis.setAutoLabelRotation(true);
 */
geotoolkit.axis.Axis = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.axis.Axis} src Source to copy from
     */
    geotoolkit.axis.Axis.prototype.copyConstructor = function(src){};
    /**
     * Sets label manual settings mode (AnchorType and no shifts)
     * @param {boolean} state label manual settings mode
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setLabelManualSettings = function(state){};
    /**
     * Gets label manual settings mode (AnchorType and no shifts)
     * @returns {boolean} label manual settings mode
     */
    geotoolkit.axis.Axis.prototype.getLabelManualSettings = function(){};
    /**
     * Sets label padding
     * @param {number} padding label padding
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setLabelPadding = function(padding){};
    /**
     * Gets label padding
     * @returns {number} padding label padding
     */
    geotoolkit.axis.Axis.prototype.getLabelPadding = function(){};
    /**
     * Sets the labelPosition
     * @param {geotoolkit.axis.TickInfo.LabelPosition} position label position
     * number is deprecated
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setLabelPosition = function(position){};
    /**
     * Return the labelPosition
     * @returns {geotoolkit.axis.TickInfo.LabelPosition}
     */
    geotoolkit.axis.Axis.prototype.getLabelPosition = function(){};
    /**
     * Sets the labelOffset
     * @param {number} offset the label offset
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setLabelOffset = function(offset){};
    /**
     * Return the labelOffset
     * @returns {number}
     */
    geotoolkit.axis.Axis.prototype.getLabelOffset = function(){};
    /**
     * Sets a base line style
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setBaseLineStyle = function(lineStyle, merge){};
    /**
     * Return a base line style
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.axis.Axis.prototype.getBaseLineStyle = function(){};
    /**
     * Return base line visibility
     * @returns {boolean}
     */
    geotoolkit.axis.Axis.prototype.getBaseLineVisible = function(){};
    /**
     * Set base line visibility
     * @param {boolean} visible
     * @returns {geotoolkit.axis.Axis}
     */
    geotoolkit.axis.Axis.prototype.setBaseLineVisible = function(visible){};
    /**
     * Return a text style
     * @returns {geotoolkit.attributes.TextStyle} textStyle
     */
    geotoolkit.axis.Axis.prototype.getTextStyle = function(){};
    /**
     * Set text style
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Return boolean flag that enables/disables ellipsis in case if text is too long
     * @returns {boolean}
     */
    geotoolkit.axis.Axis.prototype.getShowTitleEllipsis = function(){};
    /**
     * Enables/disables ellipsis in case if text is too long
     * @param {boolean} showellipsis true for ellipsis
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setShowTitleEllipsis = function(showellipsis){};
    /**
     * Sets tick generator
     *
     * @param {geotoolkit.axis.TickGenerator} tickGenerator a tick generator to be used
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setTickGenerator = function(tickGenerator){};
    /**
     * Return a current tick generator
     *
     * @returns {geotoolkit.axis.TickGenerator} a current tick generator
     */
    geotoolkit.axis.Axis.prototype.getTickGenerator = function(){};
    /**
     * Gets axis bounds
     *
     * @returns {?geotoolkit.util.Rect} axis bounds
     */
    geotoolkit.axis.Axis.prototype.getBounds = function(){};
    /**
     * Gets model limits
     *
     * @returns {geotoolkit.util.Rect} model limits
     */
    geotoolkit.axis.Axis.prototype.getModelLimits = function(){};
    /**
     * Sets model limits
     *
     * @param {geotoolkit.util.Rect} modelLimits model limits or rectangle where ticks are to be generated
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setModelLimits = function(modelLimits){};
    /**
     * Sets a axis bounds
     *
     * @param {geotoolkit.util.Rect} bounds axis bounds
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setBounds = function(bounds){};
    /**
     * @inheritdoc
     */
    geotoolkit.axis.Axis.prototype.render = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.axis.Axis.prototype.renderAsync = function(){};
    /**
     * Sets hide overlapped text flag
     * @param {!boolean} flag hide overlapped text flag
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setHideOverlappedText = function(flag){};
    /**
     * Gets hide overlapped text flag
     * @returns {!boolean} hide overlapped text flag
     */
    geotoolkit.axis.Axis.prototype.getHideOverlappedText = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.axis.Axis.prototype.updateState = function(){};
    /**
     * Enum of axis tick positions
     * @enum
     * @deprecated Use geotoolkit.util.AnchorType instead
     * @readonly
     */
    geotoolkit.axis.Axis.TitleAlignment = {};
        /**
         * Title is on the top side.
         * @type {string}
         */
        geotoolkit.axis.Axis.TitleAlignment.Top = "";
        /**
         * Title is on the center.
         * @type {string}
         */
        geotoolkit.axis.Axis.TitleAlignment.Center = "";
        /**
         * Title is on the bottom side.
         * @type {string}
         */
        geotoolkit.axis.Axis.TitleAlignment.Bottom = "";
    /**
     * Get title anchor
     * @returns {geotoolkit.util.AnchorType} alignment
     */
    geotoolkit.axis.Axis.prototype.getTitleAnchor = function(){};
    /**
     * Set title alignment
     * @param {geotoolkit.util.AnchorType} titleAnchor anchor
     * @returns {geotoolkit.axis.Axis}
     */
    geotoolkit.axis.Axis.prototype.setTitleAnchor = function(titleAnchor){};
    /**
     * Set title visibility state
     * @param {boolean} visible visible title
     * @returns {geotoolkit.axis.Axis}
     */
    geotoolkit.axis.Axis.prototype.setTitleVisible = function(visible){};
    /**
     * Get title visibility state
     * @returns {boolean} visible state
     */
    geotoolkit.axis.Axis.prototype.getTitleVisible = function(){};
    /**
     * Sets title text
     * @param {string} titleText title text
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setTitleText = function(titleText){};
    /**
     * Set title
     * @param {string|object} title axis title text or title object
     * @param {string} [title.title] deprecated (since 2.4 use title.text instead) axis title text
     * @param {string} [title.text] axis title text
     * @param {boolean} [title.visible] visibility
     * @param {geotoolkit.util.Dimension} [title.offset] offset
     * @param {geotoolkit.attributes.TextStyle|object} [title.textstyle] text style
     * @param {geotoolkit.util.AnchorType} [title.alignment] alignment
     * @param {boolean} [title.showellipsis] enables/disables ellipsis in case if text is too long
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setTitle = function(title){};
    /**
     * Get axis title
     * @returns {string} axis title
     */
    geotoolkit.axis.Axis.prototype.getTitle = function(){};
    /**
     * Returns title offset
     * @returns {geotoolkit.util.Dimension} offset
     */
    geotoolkit.axis.Axis.prototype.getTitleOffset = function(){};
    /**
     * Sets title offset
     * @param {geotoolkit.util.Dimension} titleOffset offset
     * @returns {geotoolkit.axis.Axis}
     */
    geotoolkit.axis.Axis.prototype.setTitleOffset = function(titleOffset){};
    /**
     * Set axis title text style
     *
     * @param {geotoolkit.attributes.TextStyle|object} titleTextStyle
     * a new title text style
     * @param {string|geotoolkit.util.RgbaColor} [titleTextStyle.color] text color
     * @param {string} [titleTextStyle.baseLine] base line.
     * @param {string} [titleTextStyle.alignment] alignment.
     * @param {string} [titleTextStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setTitleTextStyle = function(titleTextStyle, merge){};
    /**
     * The style associated with this axis title.
     *
     * @returns {geotoolkit.attributes.TextStyle} textStyle
     */
    geotoolkit.axis.Axis.prototype.getTitleTextStyle = function(){};
    /**
     * Sets axis orientation as text
     *
     * @param {string} orientation (It can be "Vertical" or "Horizontal");
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setOrientation = function(orientation){};
    /**
     * Return axis orientation
     *
     * @returns {string} "horizontal" or "vertical"
     */
    geotoolkit.axis.Axis.prototype.getOrientation = function(){};
    /**
     * Returns axis tick info
     * @returns {geotoolkit.axis.TickInfo} tickInfo
     */
    geotoolkit.axis.Axis.prototype.getTickInfo = function(){};
    /**
     * Draw base line
     * @deprecated since 2.6
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.axis.Axis.prototype.drawBaseLine = function(context){};
    /**
     * Return tick position
     * @returns {geotoolkit.axis.TickInfo.TickPosition} tickPosition
     */
    geotoolkit.axis.Axis.prototype.getTickPosition = function(){};
    /**
     * Sets tick position as text
     *
     * @param {string|number|geotoolkit.axis.TickInfo.TickPosition} position (Can be "left", "right", "leftandright", "between", "middle");
     * number is deprecated
     * @returns {geotoolkit.axis.Axis}
     */
    geotoolkit.axis.Axis.prototype.setTickPosition = function(position){};
    /**
     * Sets auto rotation angle for vertical axis
     *
     * @param {number} angle angle of label auto rotation
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setAutoLabelRotationAngle = function(angle){};
    /**
     * Gets auto rotation angle for vertical axis
     *
     * @returns {number} angle
     */
    geotoolkit.axis.Axis.prototype.getAutoLabelRotationAngle = function(){};
    /**
     * Set auto label rotation
     * @param {boolean} enable enable automatic label rotation
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.setAutoLabelRotation = function(enable){};
    /**
     * Get auto label rotation
     * @returns {boolean}
     */
    geotoolkit.axis.Axis.prototype.getAutoLabelRotation = function(){};
    /**
     * Check culling
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} true if object is inside of rendarable area
     * @this {geotoolkit.scene.Shape}
     */
    geotoolkit.axis.Axis.prototype.checkCollision = function(context){};
    /**
     * Specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle | object} layoutStyle desired layout style
     * @returns {geotoolkit.axis.Axis}
     */
    geotoolkit.axis.Axis.prototype.setLayoutStyle = function(layoutStyle){};
    /**
     * return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.axis.Axis.prototype.getLayoutStyle = function(){};
    /**
     * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
     * @returns {geotoolkit.axis.Axis} this
     */
    geotoolkit.axis.Axis.prototype.invalidateLayout = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.axis.Axis.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     *
     * @param {geotoolkit.axis.AxisOrientation|string} [properties.orientation] axis orientation
     * @param {geotoolkit.util.Rect} [properties.modellimits] rectangle where to generate ticks
     * @param {geotoolkit.axis.TickGenerator} [properties.tickgenerator] instance of tick generator
     * @param {geotoolkit.axis.TickInfo.TickPosition|string} [properties.tickposition] position of the tick
     * @param {geotoolkit.axis.TickInfo.LabelPosition} [properties.labelposition] position label position
     * @param {number} [properties.labeloffset] offset the label offset
     * @param {object|geotoolkit.attributes.LineStyle} [properties.baselinestyle] base line style
     * @param {boolean} [properties.autolabelrotation=false] automatic label rotation
     * @param {boolean} [properties.visiblebaseline=true] visibility of baseline
     * @param {boolean} [properties.hideoverlappedtext=true] enable label filtering if labels are overlapped.
     * @param {object} [properties.title] see {@link geotoolkit.axis.Axis#setTitle}
     * @returns {geotoolkit.axis.Axis}
     */
    geotoolkit.axis.Axis.prototype.setProperties = function(properties){};
    /**
     * Dispose node. Clear all listeners
     * and disconnect style to avoid memory
     * leaks
     */
    geotoolkit.axis.Axis.prototype.dispose = function(){};
    /**
     * Sets axis dimension to synchronize tick generator parameters with external source
     * @param {geotoolkit.axis.AxisDimension} dimension dimension
     * @returns {geotoolkit.axis.Axis}
     */
    geotoolkit.axis.Axis.prototype.setAxisDimension = function(dimension){};
    /**
     * Called if axis dimension is changed
     * @protected
     * @param {geotoolkit.axis.AxisDimension} dimension dimension
     */
    geotoolkit.axis.Axis.prototype.onAxisDimensionChanged = function(dimension){};

/**
 * Defines helper method(s) to create axis instance
 *
 * @class geotoolkit.axis.AxisFactory
 */
geotoolkit.axis.AxisFactory = {};
    /**
     * Returns instance of the factory
     * @returns {geotoolkit.axis.AxisFactory} factory
     */
    geotoolkit.axis.AxisFactory.getInstance = function(){};
    /**
     * Creates axis
     *
     * @param {object} options axis options
     * @param {geotoolkit.layout.AnnotationLocation} options.location of the axis
     * @param {geotoolkit.axis.TickGenerator} [options.tickgenerator] optional tick generator (by default geotoolkit.axis.AdaptiveTickGenerator is used)
     * @param {boolean} [options.autolabelrotation] auto label rotation {@link geotoolkit.axis.Axis.prototype.setAutoLabelRotation}
     * @param {number} [options.autolabelrotationangle] auto label rotation {@link geotoolkit.axis.Axis.prototype.setAutoLabelRotationAngle}
     * @param {object|string} [options.title] title properties {@link geotoolkit.axis.Axis.prototype.setTitle}
     *
     * @returns {geotoolkit.axis.Axis} axis
     */
    geotoolkit.axis.AxisFactory.prototype.create = function(options){};

/**
 * Creates a grid that will fill its parent container with grid lines
 *
 * @class geotoolkit.axis.Grid
 * @augments geotoolkit.scene.Node
 * @param {geotoolkit.axis.TickGenerator} [htg = null] horizontal tick generator
 * @param {geotoolkit.axis.TickGenerator} [vtg = null] vertical tick generator
 *
 */
geotoolkit.axis.Grid = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.axis.Grid} src Source to copy from
     * @returns {geotoolkit.axis.Grid} this
     */
    geotoolkit.axis.Grid.prototype.copyConstructor = function(src){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.axis.Grid.prototype.render = function(context){};
    /**
     * Gets bounds in the parent coordinates
     *
     * @returns {geotoolkit.util.Rect} a bounds in the parent coordinates.
     */
    geotoolkit.axis.Grid.prototype.getBounds = function(){};
    /**
     * Gets line style for the specified tick type and orientation
     * @param {geotoolkit.util.Orientation|string} orient orientation
     * @param {string} tickGrade tick type, which supports tick generator like "MAJOR", "MINOR"
     * @returns {geotoolkit.attributes.LineStyle|null}
     */
    geotoolkit.axis.Grid.prototype.getLineStyle = function(orient, tickGrade){};
    /**
     * Sets line style for the specified tick type and orientation
     * WARNING! since 2.7 returning value type is geotoolkit.axis.Grid, not geotoolkit.attributes.LineStyle
     *
     * @param {geotoolkit.util.Orientation|string} orient orientation
     * @param {string} tickGrade tick type, which supports tick generator like "MAJOR", "MINOR"
     * @param {geotoolkit.attributes.LineStyle|object} style line style for the specified tick type
     * @param {boolean} [returnThis=false] return this or style
     * @returns {geotoolkit.attributes.LineStyle | geotoolkit.axis.Grid} this
     */
    geotoolkit.axis.Grid.prototype.setLineStyle = function(orient, tickGrade, style, returnThis){};
    /**
     * Return tick generator
     *
     * @param {geotoolkit.util.Orientation|string} orient orientation
     * @returns {geotoolkit.axis.TickGenerator|null} tickgenerator
     */
    geotoolkit.axis.Grid.prototype.getTickGenerator = function(orient){};
    /**
     * Sets tick generator
     *
     * @param {geotoolkit.util.Orientation|string} orient orientation
     * @param {geotoolkit.axis.TickGenerator|null} tg a new tick generator
     * @returns {geotoolkit.axis.Grid}
     */
    geotoolkit.axis.Grid.prototype.setTickGenerator = function(orient, tg){};
    /**
     * Sets axis dimension to synchronize tick generator parameters with external source
     * @param {geotoolkit.util.Orientation|string} orient orientation
     * @param {geotoolkit.axis.AxisDimension} dimension dimension
     * @returns {geotoolkit.axis.Grid}
     */
    geotoolkit.axis.Grid.prototype.setAxisDimension = function(orient, dimension){};
    /**
     * Called if axis dimension is changed
     * @protected
     * @param {geotoolkit.axis.AxisDimension} dimension dimension
     */
    geotoolkit.axis.Grid.prototype.onAxisDimensionChanged = function(dimension){};
    /**
     * Draw grid
     * @deprecated since 2.6
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation ( horizontal or vertical)
     * @param {geotoolkit.axis.TickGenerator} tg tick generator
     */
    geotoolkit.axis.Grid.prototype.drawGrid = function(context, orient, tg){};
    /**
     * Draw grids
     * @deprecated since 2.6
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.axis.Grid.prototype.drawGrids = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.axis.Grid.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     *
     * @param {object} [properties.vtg] vertical tick generator
     * @param {object} [properties.htg] horizontal tick generator
     * @param {object|geotoolkit.attributes.LineStyle} [properties.hstyles] line style for horizontal ticks
     * @param {object|geotoolkit.attributes.LineStyle} [properties.vstyles] line style for vertical ticks
     * @returns {geotoolkit.axis.Grid}
     */
    geotoolkit.axis.Grid.prototype.setProperties = function(properties){};

/**
 * Defines a CSS style which has a set of css rules to be applied for a node and all children.
 * This CSS wrapper class can parse css given as a String.<br>
 * <b>CSS Styles Tutorial</b> in CarnacJS shows how CSS Styles can be applied.
 * @class geotoolkit.css.CssStyle
 * @augments geotoolkit.attributes.Style
 * @param {object|string} [options={}] Object containing css and additional properties or the CSS string
 * @param {string|object|object[]} [options.css=''] css The css string to parse or object with selector and properties or array
 * of objects with selector and properties
 * @param {string} [options.css.selector] selector of CSS
 * @param {object} [options.css.properties] properties to apply
 * @param {geotoolkit.persistence.Registry} [options.registry=null] registry of serializers for declaration blocks
 * @example var css = ['',
 * '* {',
 * ' textstyle-color: darkblue;',
 * ' textstyle-font: 42px Roboto; ',
 * ' textstyle-alignment: center; ',
 * '}'
 * ].join('\n');
 * // Style will be applied for all shapes
 * group.setCss(new geotoolkit.css.CssStyle({'css': css}));
 * @example CSS as an object
 * var css = {
 * 'selector': '.Group',
 * 'properties': {
 * 'fillstyle': {
 * 'color': 'green'
 * },
 * 'visible': false
 * }
 *};
 * group.setCss(new geotoolkit.css.CssStyle({
 * 'css': css
 * }));
 */
geotoolkit.css.CssStyle = {};
    /**
     * Return the current CSS properties
     * @returns {object|string}
     */
    geotoolkit.css.CssStyle.prototype.getCss = function(){};
    /**
     * Return clone object
     * @returns {geotoolkit.css.CssStyle} clone a copy of this object
     */
    geotoolkit.css.CssStyle.prototype.clone = function(){};
    /**
     * Apply CSS for the current node
     * @param {geotoolkit.scene.Node|Array<geotoolkit.scene.Node>} node current instance of the node
     * @returns {geotoolkit.css.CssStyle}
     */
    geotoolkit.css.CssStyle.prototype.apply = function(node){};
    /**
     * Return a state of node and selected children before applying style
     * @param {object} [node] node to apply selectors
     * @returns {object} object with serialized properties to be changed
     */
    geotoolkit.css.CssStyle.prototype.getState = function(node){};
    /**
     * Create or get css style from object
     * @param {string|Object|geotoolkit.css.CssStyle} [object] object can be in format of constructor of geotoolkit.css.CssStyle
     * @returns {?geotoolkit.css.CssStyle} css style
     */
    geotoolkit.css.CssStyle.fromObject = function(object){};

/**
 * Defines css Lexical unit
 * @class geotoolkit.css.LexicalUnit
 */
geotoolkit.css.LexicalUnit = {};
    /**
     * Gets an integer representing the type of CssLexeme
     * @param {string} [type]
     * @returns {number}
     */
    geotoolkit.css.LexicalUnit.prototype.getLexicalUnitType = function(type){};
    /**
     * Parses value passed into constructor
     * @param {string} value Value of the parameter
     * @param {geotoolkit.css.LexicalUnit} [p] Previous lexical unit
     * @returns {geotoolkit.css.LexicalUnit}
     */
    geotoolkit.css.LexicalUnit.prototype.parseParameters = function(value, p){};
    /**
     * Returns string representing dimension unit
     * @returns {?string}
     */
    geotoolkit.css.LexicalUnit.prototype.getDimensionUnitText = function(){};
    /**
     * Get number value
     * @returns {?number}
     */
    geotoolkit.css.LexicalUnit.prototype.getNumberValue = function(){};
    /**
     * Gets the next lexical unit, if present, otherwise null
     * @returns {geotoolkit.css.LexicalUnit | null}
     */
    geotoolkit.css.LexicalUnit.prototype.getNextLexicalUnit = function(){};
    /**
     * Gets the previous lexical unit, if present, otherwise null
     * @returns {geotoolkit.css.LexicalUnit|null}
     */
    geotoolkit.css.LexicalUnit.prototype.getPreviousLexicalUnit = function(){};
    /**
     * Gets the string representation of value
     * If the type is CSS_URI, the return value doesn't contain uri(....) or quotes.
     * If the type is CSS_ATTR, the return value doesn't contain attr(....).
     * @returns {string}
     */
    geotoolkit.css.LexicalUnit.prototype.getStringValue = function(){};

/**
 * Defines utility class to support CSS parser.
 * @class geotoolkit.css.Parser
 * @deprecated since 2.6
 * @param {geotoolkit.persistence.Registry} registry registry of serializers for declaration blocks
 */
geotoolkit.css.Parser = {};
    /**
     * Parse CSS text
     * @param {string| object| array<object>} css CSS text
     * @param {object} options custom options
     * @returns {object} abstract syntax tree
     */
    geotoolkit.css.Parser.parse = function(css, options){};
    /**
     * Gets state of all selected objects from the current node
     * @param {geotoolkit.scene.Node} node node to apply CSS rules
     * @param {object} ast abstract syntax tree
     * @param {geotoolkit.persistence.Registry} [registry] registry of serializer for declaration blocks
     * @returns {?object} returns a state of selected objects
     * @protected
     */
    geotoolkit.css.Parser.getState = function(node, ast, registry){};
    /**
     * Apply CSS for the current object
     * @param {geotoolkit.scene.Node} node node to apply CSS rules
     * @param {object} ast abstract syntax tree
     * @param {geotoolkit.persistence.Registry} registry registry of serializers for declaration blocks
     * @protected
     */
    geotoolkit.css.Parser.applyAST = function(node, ast, registry){};
    /**
     * Apply CSS for the current object
     * @param {geotoolkit.scene.Node} node node to apply CSS rules
     * @param {string} css text
     */
    geotoolkit.css.Parser.prototype.apply = function(node, css){};
    /**
     * Parses a css property value from a string
     * @param {string} stringValue The input string
     * @returns {object}
     */
    geotoolkit.css.Parser.prototype.parsePropertyValue = function(stringValue){};
    /**
     * Parses a CSS style string
     * @param {string} str Css string
     * @returns {Object} Object with css attribute as a key and attribute value as a value
     */
    geotoolkit.css.Parser.prototype.parseStyleString = function(str){};

/**
 * Define an interface that implement plot tool
 * @interface
 */
geotoolkit.plot.ITool = {};
    /**
     * return tool name if any
     * @function
     * @abstract
     * @returns {string} name of the tool
     */
    geotoolkit.plot.ITool.prototype.getName = function(){};
    /**
     * set enable state
     * @function
     * @abstract
     * @param {boolean} enabled sets the enabled state
     * @returns {geotoolkit.plot.ITool} this
     */
    geotoolkit.plot.ITool.prototype.setEnabled = function(enabled){};
    /**
     * returns enable state
     * @function
     * @abstract
     * @returns {boolean} state
     */
    geotoolkit.plot.ITool.prototype.isEnabled = function(){};

/**
 * Define an interface that implement plot tool container
 * @interface
 */
geotoolkit.plot.IToolContainer = {};
    /**
     * Returns tool by name
     * @function
     * @abstract
     * @param {string} node node to check
     * @returns {geotoolkit.plot.ITool} plot tool
     */
    geotoolkit.plot.IToolContainer.prototype.getToolByName = function(node){};
    /**
     * Returns the tool matching the given type. or null if nothing is matching the tool type<br>
     * @function
     * @abstract
     * @param {string} toolType toolType of the tool
     * @returns {?geotoolkit.plot.ITool}
     */
    geotoolkit.plot.IToolContainer.prototype.getToolByType = function(toolType){};
    /**
     * List all the tools contained in this composite.
     * Prepend their parent tools parent using a '.'.
     * @function
     * @abstract
     * @returns {string[]}
     */
    geotoolkit.plot.IToolContainer.prototype.listToolsNames = function(){};
    /**
     * Add tool
     * @function
     * @abstract
     * @param {geotoolkit.plot.ITool | Array<geotoolkit.plot.ITool>} tool tool to add
     * @returns {geotoolkit.plot.IToolContainer}
     */
    geotoolkit.plot.IToolContainer.prototype.add = function(tool){};
    /**
     * Remove tool
     * @function
     * @abstract
     * @param {geotoolkit.plot.ITool} tool tool to remove
     * @returns {geotoolkit.plot.IToolContainer}
     */
    geotoolkit.plot.IToolContainer.prototype.remove = function(tool){};
    /**
     * Dispose
     * @function
     * @abstract
     */
    geotoolkit.plot.IToolContainer.prototype.dispose = function(){};

/**
 * A plot with 2D rendering capabilities.<br>
 * The plot requires a canvas to be passed in the options to render its content.<br>
 *<br>
 * The plot is internally structured as a SceneGraph, using {@link geotoolkit.scene.Node}.<br>
 * Each node having a scene-transform transformation that will be applied at render time.<br>
 *<br>
 * The plot offers an autoupdate behavior that will check regularly if a render is required (using requestanimationframe if available,
 * polling otherwise).<br> When this autoupdate lands, the plot will check if it is flagged as dirty.<br> If so, it will trigger a render
 * phase.<br> This mechanism can be configured when instantiating the Plot or changed using the corresponding setters.<br> One could also
 * temporarily suspend any rendering by calling suspendUpdate in order to apply large scale changes or simply force the plot to hibernate
 * when not used/visible.<br>
 * <br>
 * If the autoupdate mechanism is not enabled, the client code is responsible of calling the update function to tell the plot that it
 * should render itself.<br>
 * <br>
 *
 * @class geotoolkit.plot.Plot
 * @augments geotoolkit.util.EventDispatcher
 * @param {Object} [options] The plot options
 * @param {HTMLCanvasElement} [options.canvaselement] The canvas to be used as target for rendering
 * @param {geotoolkit.scene.Node} [options.root] The scenegraph root
 * @param {boolean} [options.autoupdate=true] If true, the plot will automatically update when a node is invalidated
 * @param {number} [options.autoupdateinterval=40] Auto update time interval. window.requestAnimationFrame will be used if available and
 * autoUpdateInterval not specified
 * @param {boolean} [options.infiniteautoupdate=false] Enables or disables infinite auto update mechanism.<br>
 * if true, run timer or request animation frame in infinite loop overwise if node is invalidated it will trigger a Plot
 * update/render. if false, browser pixel scale is not updated.
 * @param {boolean} [options.autosize=false] If true, canvas element automatically fulfill its parent element
 * @param {boolean} [options.autorootbounds=true] If true, set automatically root node bounds to the size of the canvas
 * @param {boolean} [options.suspendupdate=false] Suspend plot update until resumeUpdate is called
 * @param {boolean} [options.offscreendetection=false] Suspend auto plot update if canvas is not in the visible part of the page. if this mode is enabled then
 * infiniteautoupdate is enabled automatically
 * @param {boolean} [options.debuginfo=false] If true, plot will write to console render time in milliseconds
 * @param {number} [options.canvassize = 2048]
 * @param {HTMLDivElement} [options.divelement=null]
 */
geotoolkit.plot.Plot = {};
    /**
     * Returns root tool associated to this widget
     * @returns {geotoolkit.plot.IToolContainer}
     */
    geotoolkit.plot.Plot.prototype.getTool = function(){};
    /**
     * Disposes the plot and the associated resources.<br>
     * This may also call dispose on the root node (see disposeRoot).<br>
     * The plot should not be used/accessed anymore after this has been called.<br>
     * @param {boolean} [disposeRoot=true] Also dispose root node
     */
    geotoolkit.plot.Plot.prototype.dispose = function(disposeRoot){};
    /**
     * Sets the root node ot be the given node.<br>
     * @param {geotoolkit.scene.Node} root The scenegraph root node
     * @returns {geotoolkit.plot.Plot} this
     */
    geotoolkit.plot.Plot.prototype.setRoot = function(root){};
    /**
     * Returns the root node of the scenegraph.<br>
     * @returns {geotoolkit.scene.Node} The root node
     */
    geotoolkit.plot.Plot.prototype.getRoot = function(){};
    /**
     * Updates the plot, forcing a render.<br>
     * This will be called automatically when the plot has been marked as dirty if the autoupdate is enabled.<br>
     * @returns {geotoolkit.plot.Plot} this
     */
    geotoolkit.plot.Plot.prototype.update = function(){};
    /**
     * Returns the canvas element or elements used by this plot
     *
     * @returns {HTMLCanvasElement|HTMLCanvasElement[]} The canvas element
     */
    geotoolkit.plot.Plot.prototype.getCanvas = function(){};
    /**
     * Sets the plot size to the given dimensions.<br>
     * This will also change the canvas size if autosize is enabled.<br>
     * If autorootbounds is enabled, this will also update the bounds of the root node.<br>
     * @param {number} width The width of plot
     * @param {number} height The height of plot
     * @returns {geotoolkit.plot.Plot} this
     */
    geotoolkit.plot.Plot.prototype.setSize = function(width, height){};
    /**
     * Returns the containing element for the plot<br>
     * This is either the canvas element or the div element depending on the chosen functionality<br>
     * @returns {?HTMLElement} The canvas width
     */
    geotoolkit.plot.Plot.prototype.getContainingElement = function(){};
    /**
     * Returns the containing element width in virtual pixels.<br>
     * This returns the raw size given at initialization or through the setSize function.<br>
     * It ignores any Browser zoom.<br>
     * @returns {number} The canvas width
     */
    geotoolkit.plot.Plot.prototype.getWidth = function(){};
    /**
     * Returns the containing element height in virtual pixels.<br>
     * This returns the raw size given at initialization or through the setSize function.<br>
     * It ignores any Browser zoom.<br>
     * @returns {number} The canvas height
     */
    geotoolkit.plot.Plot.prototype.getHeight = function(){};
    /**
     * Returns the canvas width in virtual pixels.<br>
     * This returns the raw size given at initialization or through the setSize function.<br>
     * It ignores any Browser zoom.<br>
     * @returns {number} The canvas width
     * @deprecated since 2.6
     */
    geotoolkit.plot.Plot.prototype.getCanvasWidth = function(){};
    /**
     * Returns the canvas height in virtual pixels.<br>
     * This returns the raw size given at initialization or through the setSize function.<br>
     * It ignores any Browser zoom.<br>
     * @returns {number} The canvas height
     * @deprecated since 2.6
     */
    geotoolkit.plot.Plot.prototype.getCanvasHeight = function(){};
    /**
     * Suspends plot update, preventing the update function from triggering a render.<br>
     * @returns {geotoolkit.plot.Plot} this
     */
    geotoolkit.plot.Plot.prototype.suspendUpdate = function(){};
    /**
     * Resumes plot update, allowing the update function of triggering a render.<br>
     * @param {boolean} [refresh=false] If set to true, a render will be run immediately
     * @returns {geotoolkit.plot.Plot} this
     */
    geotoolkit.plot.Plot.prototype.resumeUpdate = function(refresh){};
    /**
     * Adds an invalidate handler.<br>
     * The invalidate handlers will be notified whenever an invalidation occurs.<br>
     * @param {function} handler The handler to be notified about invalidation
     * @returns {geotoolkit.plot.Plot} this
     * @deprecated use on/off
     */
    geotoolkit.plot.Plot.prototype.addInvalidateHandler = function(handler){};
    /**
     * Removes an invalidate handler.<br>
     * The invalidate handlers will be notified whenever an invalidation occurs.<br>
     * @param {function} handler The handler to be notified about invalidation
     * @returns {geotoolkit.plot.Plot} this
     * @deprecated use on/off
     */
    geotoolkit.plot.Plot.prototype.removeInvalidateHandler = function(handler){};
    /**
     * Enables or disables auto update mechanism.<br>
     * If auto update is enabled, whenever a node is invalidated it will trigger a Plot update/render.<br>
     * @param {boolean} enable The autoupdate status
     * @param {boolean} [infinite=true] Enables or disables infinite auto update mechanism.<br>
     * if true, run timer or request animation frame in infinite
     * loop overwise if node is invalidated it will trigger a Plot
     * update/render. if false, browser pixel scale is not updated.
     * @returns {geotoolkit.plot.Plot} this
     */
    geotoolkit.plot.Plot.prototype.setAutoUpdate = function(enable, infinite){};
    /**
     * Return true if auto update is enabled.<br>
     * @returns {boolean} The status of autoupdate
     */
    geotoolkit.plot.Plot.prototype.isAutoUpdate = function(){};
    /**
     * Return true if infinite auto update is enabled.<br>
     * @returns {boolean} The status of infinite auto update
     */
    geotoolkit.plot.Plot.prototype.isInfiniteAutoUpdate = function(){};
    /**
     * Sets the time interval for autoupdate mechanism.<br>
     * This will define the delay for polling the status of the Plot and trigger an update/render if necessary.<br>
     * @param {number} [interval] The time interval in ms. window.requestAnimationFrame will be used if available and interval set to null.
     * @returns {geotoolkit.plot.Plot} this
     */
    geotoolkit.plot.Plot.prototype.setAutoUpdateInterval = function(interval){};
    /**
     * Returns the time interval for autoupdate mechanism.<br>
     * @returns {?number} The time interval in ms
     */
    geotoolkit.plot.Plot.prototype.getAutoUpdateInterval = function(){};
    /**
     * Returns the client rect for the plots container element as DOMRect.<br>
     * @returns {?object} the client rect for the plots container element
     */
    geotoolkit.plot.Plot.prototype.getBoundingClientRect = function(){};
    /**
     * Enable or disable autosize mechanism.<br>
     * If enabled, this will let the Plot resize the associated canvas whenever the plot itself is resized.<br>
     * @param {boolean} autoSize The status of autosize
     * @returns {geotoolkit.plot.Plot} this
     */
    geotoolkit.plot.Plot.prototype.setAutoSize = function(autoSize){};
    /**
     * Forces a resize on the plot using its known width and height.<br>
     * @returns {geotoolkit.plot.Plot} this
     */
    geotoolkit.plot.Plot.prototype.onResize = function(){};

/**
 * This class provide interface for processors which are used by geotoolkit.animation.effects.AbstractEffect to animate complex structures
 * like object, array or other.
 * @class geotoolkit.animation.processors.AbstractProcessor
 */
geotoolkit.animation.processors.AbstractProcessor = {};
    /**
     * Method iterates over passed object, extracts numeric properties and call function func with them
     * @function
     * @abstract
     * @param {object} from initial state
     * @param {object} to target state
     * @param {object} out destination state
     * @param {function} func interpolate function
     * @returns {object} res destination state
     */
    geotoolkit.animation.processors.AbstractProcessor.prototype.process = function(from, to, out, func){};
    /**
     * Calculate distance between two object
     * @param {object} v1 first object
     * @param {object} v2 second object
     * @returns {number} distance
     */
    geotoolkit.animation.processors.AbstractProcessor.prototype.distance = function(v1, v2){};
    /**
     * Returns clone of passed object
     * @function
     * @abstract
     * @param {object} v object to clone
     * @return {object} clone
     */
    geotoolkit.animation.processors.AbstractProcessor.prototype.clone = function(v){};

/**
 * Can process number
 * @class geotoolkit.animation.processors.NumberProcessor
 * @augments geotoolkit.animation.processors.AbstractProcessor
 */
geotoolkit.animation.processors.NumberProcessor = {};
    /**
     * @inheritdoc
     */
    geotoolkit.animation.processors.NumberProcessor.prototype.process = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.animation.processors.NumberProcessor.prototype.distance = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.animation.processors.NumberProcessor.prototype.clone = function(){};
    /**
     * Returns instance of the Effects registry
     * @returns {geotoolkit.animation.effects.Registry}
     */
    geotoolkit.animation.processors.NumberProcessor.getInstance = function(){};

/**
 * Can process object {key: value}, typeof value === number
 * @class geotoolkit.animation.processors.ObjectProcessor
 * @augments geotoolkit.animation.processors.AbstractProcessor
 */
geotoolkit.animation.processors.ObjectProcessor = {};
    /**
     * @inheritdoc
     */
    geotoolkit.animation.processors.ObjectProcessor.prototype.process = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.animation.processors.ObjectProcessor.prototype.clone = function(){};
    /**
     * Returns instance of the Effects registry
     * @returns {geotoolkit.animation.effects.Registry}
     */
    geotoolkit.animation.processors.ObjectProcessor.getInstance = function(){};

/**
 * Can process array of number
 * @class geotoolkit.animation.processors.ArrayProcessor
 * @augments geotoolkit.animation.processors.AbstractProcessor
 */
geotoolkit.animation.processors.ArrayProcessor = {};
    /**
     * @inheritdoc
     */
    geotoolkit.animation.processors.ArrayProcessor.prototype.process = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.animation.processors.ArrayProcessor.prototype.clone = function(){};
    /**
     * Returns instance of the Effects registry
     * @returns {geotoolkit.animation.effects.Registry}
     */
    geotoolkit.animation.processors.ArrayProcessor.getInstance = function(){};

/**
 * Registry which stores animation effect.
 * If you want to add your own effect you should call geotoolkit.animation.effects.Registry.getInstance().registerEffect(class_name)
 * If you want to instantiate class from object you should call geotoolkit.animation.effects.Registry.getInstance().createEffect(effect_object)
 * @class geotoolkit.animation.effects.Registry
 */
geotoolkit.animation.effects.Registry = {};
    /**
     * Finds class appropriate passed object and instantiates it
     * @param {object} effect effect properties
     * @param {geotoolkit.scene.AbstractNode} node node to which effect would be applied
     * @returns {geotoolkit.animation.effects.AbstractEffect} effect
     */
    geotoolkit.animation.effects.Registry.prototype.createEffect = function(effect, node){};
    /**
     * Register effect in registry
     * @param {function} Effect effect
     * @returns {geotoolkit.animation.effects.Registry} this
     */
    geotoolkit.animation.effects.Registry.prototype.registerEffect = function(Effect){};
    /**
     * Returns instance of the Effects registry
     * @returns {geotoolkit.animation.effects.Registry} Effects registry
     */
    geotoolkit.animation.effects.Registry.getInstance = function(){};

/**
 * Defines abstract animation effect, API is subset of SMIL animation with two extensions: <br>
 * 1. Can accept param 'function' - like transition-timing-function in CSS <br>
 * 2. Can accept value 'auto' as 'begin' parameter - animation will run automatically when animated attribute is changed.
 * @class geotoolkit.animation.effects.AbstractEffect
 * @param {object} options object that contains effect options
 * @param {geotoolkit.animation.Accumulate} [options.accumulate] Controls whether or not the animation is cumulative. For more information
 * @param {geotoolkit.animation.Additive} [options.additive] Controls whether or not the animation is additive. For more information .
 * @param {string} [options.begin = 0] The begin time of an animation in ms or 'auto' for transition animation
 * @param {geotoolkit.animation.CalcMode} [options.calcmode] Defines effect's interpolation mode.
 * @param {number} options.duration effect duration
 * @param {geotoolkit.animation.AnimationFill} [options.fill] Defines animation behavior after it ends.
 * @param {number[]} [options.keypoints]
 * @param {number} [options.repeatcount = 1] repeat count
 * @param {string} [options.id=null] effect id
 * @param {string} options.attributename name of animated attribute
 * @param {geotoolkit.animation.Easing.Functions} [options.function] easing function, if provide keypoints param will be ignored
 * @param {string|number} options.from start value of animated attribute, ignored when 'begin'='auto'
 * @param {string|number} options.to end value of animated attribute, ignored when 'begin'='auto'
 * @param {string} [options.type] type animated attribute for 'attributename'='transform', valid value: 'translate', 'scale', 'rotate'
 */
geotoolkit.animation.effects.AbstractEffect = {};
    /**
     * Returns true if this class can accept passed effect as a parameter
     * @param {object} effect effect parameters
     * @param {geotoolkit.scene.Node} node target node
     * @returns {boolean}
     */
    geotoolkit.animation.effects.AbstractEffect.prototype.isApplicable = function(effect, node){};
    /**
     * Extracts value which can animated from node
     * @protected
     * @param {geotoolkit.scene.Node} node animated node
     * @returns {number|string|object}
     */
    geotoolkit.animation.effects.AbstractEffect.prototype.getAnimatedValue = function(node){};
    /**
     * Returns current value, which should be applied
     * @protected
     * @returns {object}
     */
    geotoolkit.animation.effects.AbstractEffect.prototype.getCurrentValue = function(){};
    /**
     * Set processor, which will be used for calculate intermediate values
     * @protected
     * @param {geotoolkit.animation.processors.AbstractProcessor} processor processor for calculate intermediate values
     * @returns {geotoolkit.animation.effects.AbstractEffect}
     */
    geotoolkit.animation.effects.AbstractEffect.prototype.setProcessor = function(processor){};
    /**
     * Gets the number of the time segment.
     * @param {number} time time from effect's start
     * @returns {number} result time segment
     */
    geotoolkit.animation.effects.AbstractEffect.prototype.getTimeSegmentIndex = function(time){};
    /**
     * Returns transformation, that will be applied to the node
     * @protected
     * @returns {?geotoolkit.util.Transformation} transformation
     */
    geotoolkit.animation.effects.AbstractEffect.prototype.getTransformation = function(){};
    /**
     * Applies effect to node and invalidate it
     * To add animation support to target class create new Animation Effect by inherit from this class,
     * and override method 'apply' to apply intermediate_value to target class(for example with setters)
     * @protected
     * @param {geotoolkit.scene.AbstractNode} node target node
     */
    geotoolkit.animation.effects.AbstractEffect.prototype.apply = function(node){};
    /**
     * Create or get effect from object
     * @param {Object|geotoolkit.animation.effects.AbstractEffect} [object] effect
     * @returns {?geotoolkit.animation.effects.AbstractEffect} effect
     */
    geotoolkit.animation.effects.AbstractEffect.fromObject = function(object){};

