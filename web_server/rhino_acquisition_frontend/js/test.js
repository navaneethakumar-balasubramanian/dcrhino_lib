define(['geotoolkit.widgets', './data.js', 'helpers', 'highlight.pack', 'axios'], function (Widgets, data,
Helpers) {
const axios = require('axios')

    function init () {
        createRealtimeWidget();
    }

    var traceData = [1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1]
    var timeAxis = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

//    traceData = [0]
//    timeAxis = [0]

    var x = new geotoolkit.data.NumericalDataSeries({
           'name': 'Samples',
           'data': timeAxis

        });

    var y = new geotoolkit.data.NumericalDataSeries({
       'name': 'Acceleration',
       'data': traceData,
       'unit': 'G'
    });

    function createRealtimeWidget () {
        var plot = createPlot('myCanvasRealtimeWidget');


        // Use NumericalDataSeries

        var vlimits = new geotoolkit.util.Range(-500, 500); // These need to be replaced by config.sensor_saturation_g
        this._vSpace = new geotoolkit.axis.AxisLinearDimension({'neatlimits':true});
        var bounds = new geotoolkit.util.Rect({
            'x':0,
            'y':vlimits.getLow(),
            'width':2000, // This needs to be replaced with sampling rate
            'height': vlimits.getHigh() - vlimits.getLow()});
        var limits = new geotoolkit.util.Rect(0, 0, 2000, -1);
        var linechart = new geotoolkit.controls.shapes.LineChart({
            'x': [x],
            'y': [y],
            'gridvisible': true,
            'bounds': limits,
            'modelLimits':limits,
            'linestyles': [{'color': "blue", 'width': 1}]
        });
        var widget = linechart;
        plot.setRoot(widget);
        plot.update();

        var update = function () {
            getAxiosData()

            x.clearValues()
            y.clearValues()
            x.addValues(timeAxis)
            y.addValues(traceData)
            plot.update();
        };
        window.setInterval(update, 500);
    }

    function createPlot () {
        return new geotoolkit.plot.Plot({
            'canvasElement': document.getElementById("canvas"),
            'autoUpdate': false
        });
    }

//    var last_time = 1

    function getAxiosData(){
        axios.get('http://localhost:5000/traces', {
            responseType: 'arraybuffer'
        })
        .then(function(_result) {
            result_data = new Float32Array(_result.data)
//            console.log(result_data.length)
//            console.log(traceData)
            timeAxis = [];
            traceData = []
            for (i=0; i<result_data.length; i++)
            {
                timeAxis.push(i);
                traceData.push(result_data[i])
            }
//            last_time += traceData.length
        });
    }

    return {
        'init': init
    };
});