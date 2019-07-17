define(["highlight.pack", "geotoolkit", "axios","numjs","geotoolkit.seismic", "geotoolkit.widgets", "geotoolkit.seismic.widgets"], function () {
    const axios = require('axios')
    const numjs = require('numjs')

    var traceData = []
    var df = []
    

    hljs.initHighlighting();

    var widget = null;

    var DEFAULT_DARK_COLOR = '#757575';
    var DEFAULT_LIGHT_COLOR = '#f5f5f5';
    var traceCount = 3657;
    var sampleRate = 90000;
    var sampleCount = 400;
    var createReader = function () {
        
        

        var reader = new geotoolkit.seismic.data.MemoryReader({
                'numberOfTraces': traceCount,
                'numberOfSamples': sampleCount,
                'sampleRate': sampleRate,
                'samplePower': 10   })
            .setTraceProcessor({
                    'getTraceData': function (reader, trace, traceId) {
                        for (var i = 0; i < sampleCount; i++) {
                            //trace[i] = Math.sin(( i / 10.0 + traceId / 4.0 ) * Math.PI);
                            
                            trace[i] = traceData[traceId*sampleCount+i]
                        }
                        //console.log(traceData.subarray(traceId*501,traceId*501+501))
                        
                        //console.log(traceId,trace[0],trace[1],trace[2])
                        //trace = traceData.slice(traceId*501,traceId*501+501)
                        //#console.log(traceId,trace[0])
                        //console.log(traceId*501,traceId*501+501,traceId,trace[0])
                    },
                    'getTraceHeaderFields': function () {
                        headerFields = []
                        for ( key in Object.keys(df[0])) { 
                            headerFields[key] =  new geotoolkit.seismic.data.FieldDesc(key, Object.keys(df[0])[key])
                        }
                        return headerFields;
                    },
                    'getTraceHeader': function (reader, header, headerData, traceId) {
                        var data = headerData;
                    
                        for ( key in Object.keys(df[0])) { 
                            data[key] =  df[traceId][Object.keys(df[0])[key]]
                        }
                        
                    },
                    'getDataStatistics': function () {
                        return {
                            'average': 0,
                            'min': -1,
                            'max': 1,
                            'rms': Math.sqrt(2)/2
                        };
                    }
                }
            );
        return reader;
    };
    var createPipeline = function (reader) {

        var positions = new geotoolkit.data.NumericalDataSeries();
        var pos = 0;
        for (var i = 0; i < traceCount; ++i) {
            positions.addValue(df[i]['measured_depth']);
        }
        


        var pipeline = new geotoolkit.seismic.pipeline.SeismicPipeline("MemorySeismic", reader, reader.getStatistics());
        var mapping = new geotoolkit.seismic.data.VSTraceMapping(pipeline, positions);
        //console.log(mapping)
        var colorProvider = geotoolkit.seismic.util.SeismicColors.getDefault();
        pipeline.setOptions({
            'colors': {
                'colorMap': geotoolkit.seismic.util.SeismicColors.getDefault()
                    .createNamedColorMap("RedYellowBlue", 1024),
                'alpha' : 1
            },
            "normalization": {
                "type": geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType.RMS
            },
            'plot': {
                'type': {
                    'Wiggle': false,
                    'NegativeColorFill': false,
                    'PositiveColorFill': false,
                    "IntepolatedDensity": false,
                    'SimpleDensity': true
                },
                'decimationSpacing':  1
            },
            'tracemapping': mapping
        });
        return pipeline;
    };

    function createWidget(pipeline) {
        var widget = new geotoolkit.seismic.widgets.SeismicWidget(pipeline)
            .setAutoModelLimitsMode(true)
            .setLayoutStyle({left: 0, top: 0, bottom: 0, right: 0})
            .setLayout(new geotoolkit.layout.CssLayout());
        widget.setOptions({
            'colorbar': {
                'axis': {
                    'size': 30
                },
                'title': {
                    'size': 20
                },
                'colorbox': {
                    'size': 10
                },
                'maxheight': '90%',
                'alignment': geotoolkit.layout.BoxLayout.Alignment.Center
            }, 'title': {
                'text': 'Seismic Widget',
                'visible': true
            }, 'axes': {
                'samples': {
                    'location': geotoolkit.layout.AnnotationLocation.West,
                    'size': 40
                }
            },
            'table': {
                'visible': 'visible',
                'size': 300,
                
            },
           
            'auxiliarychart': {
                'size': 120,
                'title': {
                    'text': 'Auxiliary MWD',
                    'textstyle': {
                        'font': '16px Roboto',
                        'color': 'gray'
                    },
                    'size': 20
                },
                'charts': [
                    {
                        'name': 'ROP',
                        'linestyle': "green",
                        'range': new geotoolkit.util.Range(0, 0.03),
                    }, {
                        'name': 'MSE',
                        'linestyle' :'blue',
                        'range': new geotoolkit.util.Range(0, 200),
                    }]
            }
        });

        widget.setScaleOptions({
        //    'tracescale': 10,
            //'samplescale': 0.00001,
           // 'deviceunit': 'in',
            //'sampleunit': 'ms'
        });
        
        return widget;
    }

    function initialize() {

        axios.get('http://localhost:5000/df', {
        })
        .then(function(_result) {
            df = _result.data
            loadedData()
        })
        
    }

    function loadedData(){

        axios.get('http://localhost:5000/traces', {
            responseType: 'arraybuffer'
        })
        .then(function(_result) {
            traceData = new Float32Array(_result.data)
            
            loadedDataaxis()

        })
        
    }
    function loadedDataaxis(){
        
        // Create a reader
        var reader = createReader();
        // create pipeline
        var pipeline = createPipeline(reader);
        // Create a widget to display a model
        widget = createWidget(pipeline);
        var axisInfo = widget.getTraceHeaderAxis('TraceNumber');
        axisInfo['axis'].getTickGenerator().setDisplayValueType(geotoolkit.seismic.axis.IndexTickGenerator.DisplayValueType.Mapped);
        axisInfo['label'].setText('Depth');
        // Get the canvas as a DOM object
        var canvas = document.getElementById("canvas");
        // Create a new Plot object from the canvas and group
        var plot = new geotoolkit.plot.Plot({
            'canvasElement': canvas,
            'root': widget
        });
        // init tools container to support interactions with widget
        var toolContainer = new geotoolkit.controls.tools.ToolsContainer(plot);
        toolContainer.add(widget.getTool());
        
        return plot;

    }

    var activateRubberBandZoom = function () {
        if (widget == null) {
            return;
        }

        var manipulatorTypes = geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType;
        widget.setManipulatorType(manipulatorTypes.RubberBand);
        highlightActiveButton();
    };

    function resetRubberBandZoom () {
        if (widget == null) {
            return;
        }
        //widget.resetZoom();
        widget.zoomOut();
        var manipulatorTypes = geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType;
        widget.setManipulatorType(manipulatorTypes.Panning);
        //highlightActiveButton();
        widget.fitToBounds()
    }

    var setHighlightButton = function (id, highlight) {
        
    };
    function highlightActiveButton () {
        var manipulatorTypes = geotoolkit.seismic.widgets.SeismicViewWidget.ManipulatorType;
        var highlightWithOutline = widget.getManipulatorType() === manipulatorTypes.RubberBand;
        setHighlightButton('resetButton', !highlightWithOutline);
        setHighlightButton('zoomButton', highlightWithOutline);
    }


    return {
        'initialize': initialize,
        'activateRubberBandZoom': activateRubberBandZoom,
        'resetRubberBandZoom': resetRubberBandZoom
    };
});