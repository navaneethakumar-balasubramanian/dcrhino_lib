define([ "geotoolkit","axios"], function () {
    const axios = require('axios')
    //const numjs = require('numjs')

    var traceData = [1,2,3,4,5,6,7,8,9,10]
    var timeAxis = [1,2,3,4,5,6,7,8,9,10]
    var df = []

    var widget = null;

    var DEFAULT_DARK_COLOR = '#757575';
    var DEFAULT_LIGHT_COLOR = '#f5f5f5';
    var traceCount = 3657;
    var sampleRate = 5000;
    var sampleCount = 400;
//    var traceData = null

    function getAxiosData(){
//        axios.get('http://localhost:5000/traces', {
//            responseType: 'arraybuffer'
//        })
//        .then(function(_result) {
//            traceData = new Float32Array(_result.data)
////            x.data = traceData
//            console.log(traceData)
//            timeAxis = [];
//            for (i=0; i<traceData.length; i++)
//            {
//                timeAxis.push(i);
//            }
//        });
        traceData = [1,2,3,4,5,6,7,8,9,10]
        timeAxis = [1,2,3,4,5,6,7,8,9,10]
        console.log(traceData)
        console.log(timeAxis)
    }



    function createLineChart (x, y) {
       /* var lineChart = new geotoolkit.controls.shapes.LineChart({
            'x': x,
            'y': y,
            'linestyles': ['#bbdefb'],
            'gridvisible': false
        });
        lineChart.setBounds(lineChart.getModelLimits());
        return lineChart;*/
    }

//    // Use NumericalDataSeries
//    var x = new geotoolkit.data.NumericalDataSeries({
//       'name': 'Months',
//       'data': traceData
//    });
//
//    var y = new geotoolkit.data.NumericalDataSeries({
//       'name': 'Temperature',
//       'data': timeAxis,
//       'unit': 'c'
//    });



    function initialize() {
        //setInterval(function(){ getAxiosData(); }, 1000);

        var linestyle = new geotoolkit.attributes.LineStyle({
           'color' : 'blue', // Default value 'black'
           'width' : 2, // default value 1
           'pattern' : geotoolkit.attributes.LineStyle.Patterns.Solid
        });


        var group = new geotoolkit.scene.Group();
        // Add the shape to the group
       // widget = createLineChart(traceData,timeAxis);
        group.addChild(linestyle);
        console.log(linestyle)
        var canvas = document.getElementById('canvas');
        console.log(canvas)
       //
        console.log(group)
        var plot = new geotoolkit.plot.Plot({
           'canvasElement': canvas,
           'root': group
        });
        console.log(plot)
        return plot
    }


    return {
        'initialize': initialize
    };
});