define(['geotoolkit.widgets', './data.js', 'helpers', 'highlight.pack', 'axios'], function () {
    const axios = require('axios');
    const INPUT = 'http://localhost:5000/traces';
    const socket = io('');

    var timestamp = null;
    var axial_data = [];
    var tangential_data = [];
    var ideal_timestamps = [];
    var axial_plot = null;
    var tangential_plot = null;
    var initial_timestamp = null;
    var min_axial_scale = 0;
    var max_axial_scale = 0;
    var min_tangential_scale = 0;
    var max_tangential_scale = 0;
    var min_model_time = 0;


    function init(){

        listenForDataStream();

        var limits = new geotoolkit.util.Rect(0, -5, 2000, 5);
        var bounds = new geotoolkit.util.Rect(50,0,500,70)
        axial_plot = createPlot("axial", limits,bounds, ideal_timestamps, axial_data);
        var limits = new geotoolkit.util.Rect(0, -5, 2000, 5);
        tangential_plot = createPlot("tangential", limits,bounds, ideal_timestamps, tangential_data);
    }

    var ideal_timestamps = new geotoolkit.data.NumericalDataSeries({
           'name': 'Time',
           'data': []
     });

    var axial_data = new geotoolkit.data.NumericalDataSeries({
       'name': 'Axial Acceleration',
       'data': [],
       'unit': 'G'
    });

    var tangential_data = new geotoolkit.data.NumericalDataSeries({
       'name': 'Tangential Acceleration',
       'data': [],
       'unit': 'G'
    });

    var horizontalAxis = null;
    var verticalAxis = null;


    function createPlot(canvas_id,limits,bounds, x,y){

        var group = new geotoolkit.scene.Group();

        var lineChart = new geotoolkit.controls.shapes.LineChart({
            'x': [x],
            'y': [y],
           'modelLimits': limits,
           'bounds':bounds
        });



        group.addChild(lineChart);


        var timeAxisTickGenerator = new geotoolkit.axis.AdaptiveTickGenerator()
        var accelerationTickGenerator = new geotoolkit.axis.AdaptiveTickGenerator()

        bounds = new geotoolkit.util.Rect(50, 90, 500, 70);
        horizontalAxis  = new geotoolkit.axis.Axis(timeAxisTickGenerator)
        .setBounds(bounds)
        horizontalAxis.setModelLimits(limits)
        horizontalAxis.setOrientation("Horizontal")



        bounds = new geotoolkit.util.Rect(0, 0, 50, 70);
        verticalAxis = new geotoolkit.axis.Axis(accelerationTickGenerator)
        .setBounds(bounds)
        verticalAxis.setModelLimits(limits)

        group.addChild(horizontalAxis);
        group.addChild(verticalAxis);


        var canvas = document.getElementById(canvas_id);

        var plot = new geotoolkit.plot.Plot({
            'canvasElement': canvas,
            'root': group
        });

        return {"chart":lineChart,
                "vAxis":verticalAxis,
                "hAxis":horizontalAxis
               }
    }

    function listenForDataStream(){
        socket.on('data', (data) => {
            timestamp = data["timestamp"]
            axial = data["axial"].map(Number)
            tangential = data["tangential"].map(Number)
            timeAxis = data["ideal_timestamps"].map(Number)

            if (initial_timestamp == null){
                initial_timestamp = timestamp;
                min_model_time = timestamp;
            }

            data_oversize = axial_data.getLength() - (1 * 2000);


            if (data_oversize > 0){
                axial_data.removeValues(0,data_oversize)
                tangential_data.removeValues(0,data_oversize)
                ideal_timestamps.removeValues(0,data_oversize)
                min_axial_scale = axial_data.getMin()
                max_axial_scale = axial_data.getMax()
                min_tangential_scale = tangential_data.getMin()
                max_tangential_scale = tangential_data.getMax()
            }

//            console.log(min_model_time, timestamp)

            if (Math.min(...axial) < min_axial_scale){
                min_axial_scale = Math.min(...axial);
            }

            if (Math.max(...axial) > max_axial_scale){
                max_axial_scale = Math.max(...axial);
            }

            if (Math.min(...tangential) < min_tangential_scale){
                min_tangential_scale = Math.min(...tangential);
            }

            if (Math.max(...tangential) > max_tangential_scale){
                max_tangential_scale = Math.max(...tangential);
            }

            var timeAxis = timeAxis.map( function(value) {
                return value + timestamp;
            } );

//            timeAxis = timeAxis.map(Date)
//            console.log(timeAxis)


            var limits = new geotoolkit.util.Rect(ideal_timestamps.getMin(), min_axial_scale, timestamp+1,
             max_axial_scale);
            AutoScale(axial_plot, limits)
            limits = new geotoolkit.util.Rect(ideal_timestamps.getMin(), min_tangential_scale, timestamp+1,
            max_tangential_scale);
            AutoScale(tangential_plot, limits)
            ideal_timestamps.addValues(timeAxis)
            axial_data.addValues(axial)
            tangential_data.addValues(tangential)
        });
    }

    function AutoScale(plot, limits){
        plot.chart.setModelLimits(limits)
        _limits = plot.chart.getModelLimits()
        plot.vAxis.setModelLimits(_limits)
        plot.hAxis.setModelLimits(_limits)

    }

    return {"init":init}

});