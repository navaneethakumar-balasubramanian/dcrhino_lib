define(['geotoolkit.widgets', './data.js', 'helpers', 'highlight.pack', 'axios', 'geotoolkit.gauges'], function () {
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
    var rssi_gauge = null;
    var min_axial_scale = 0;
    var max_axial_scale = 0;
    var min_tangential_scale = 0;
    var max_tangential_scale = 0;
    var min_model_time = 0;


    function init(){

        listenForDataStream();

        var limits = new geotoolkit.util.Rect(0, -5, 2000, 5);
        var bounds = new geotoolkit.util.Rect(50,0,500,170)
        axial_plot = createPlot("axial", limits,bounds, ideal_timestamps, axial_data);
        limits = new geotoolkit.util.Rect(0, -5, 2000, 5);
        tangential_plot = createPlot("tangential", limits,bounds, ideal_timestamps, tangential_data);
        bounds = new geotoolkit.util.Rect(0, 0, 200, 50);
        rssi_gauge = createGauge("RSSI(dB)", bounds, "rssi")
        bounds = new geotoolkit.util.Rect(200, 0, 400, 50);
        packets_gauge = createGauge("Packets", bounds, "packets")
        bounds = new geotoolkit.util.Rect(400, 0, 600, 50);
        batt_gauge = createGauge("Battery (V)", bounds, "batt")
        bounds = new geotoolkit.util.Rect(0, 100, 200, 50);
        temp_gauge = createGauge("Temperature (deg C)", bounds, "temp")
        bounds = new geotoolkit.util.Rect(200, 100, 400, 50);
        axial_accel_gauge = createGauge("Axial Acceleration (G)", bounds, "acceleration")
        bounds = new geotoolkit.util.Rect(400, 100, 600, 50);
        tangential_accel_gauge = createGauge(" Tang. Acceleration (G)", bounds, "acceleration")

        var health_group = new geotoolkit.scene.Group();
        health_group.addChild(rssi_gauge);
        health_group.addChild(packets_gauge);
        health_group.addChild(batt_gauge);
        health_group.addChild(temp_gauge);
        health_group.addChild(axial_accel_gauge);
        health_group.addChild(tangential_accel_gauge);

        var canvas = document.getElementById("health");

        var plot = new geotoolkit.plot.Plot({
            'canvasElement': canvas,
            'root': health_group
        });
    }


    function createGauge(name, bounds, canvas_id){
        // Create a circular gauge with 180 deg sweep angle
        var gaugeRegistry = geotoolkit.gauges.registry.GaugeRegistry.getDefaultInstance();
        var gauge = gaugeRegistry.createGauge(geotoolkit.gauges.defaults.Templates.SimpleNumeric, {
            'bounds': bounds,
            'name': name
        });

        gauge.getFunctionRegistry().registerFunction({
            'turnOn': function(value, gauge) {
                gauge.setOptions({"background":{"fillstyle":"red"}})
            },
            'turnOff': function(value, gauge) {
                gauge.setOptions({"background":{"fillstyle":"green"}})
            }
        });

        gauge.addAlarm(new geotoolkit.gauges.Alarm({
            'name': 'on',
            'range': new geotoolkit.util.Range(-40, -100),
            'handlername': 'turnOn'
        }));

        gauge.addAlarm(new geotoolkit.gauges.Alarm({
            'name': 'off',
            'range': new geotoolkit.util.Range(0, -39),
            'handlername': 'turnOff'
        }));

//        var canvas = document.getElementById(canvas_id);
//
//        var plot = new geotoolkit.plot.Plot({
//            'canvasElement': canvas,
//            'root': gauge
//        });

        return gauge
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

        var timeAxisTickGenerator = new geotoolkit.axis.AdaptiveDateTimeTickGenerator(0*6, geotoolkit.util.UnitFactory
        .getInstance().getUnit('second'));
        timeAxisTickGenerator.getTickStyle('MAJOR').setColor('#ededed');
        timeAxisTickGenerator.getTickStyle('MINOR').setColor('#000000');
        timeAxisTickGenerator.setVisibleTickGrade('EDGE', true);
        timeAxisTickGenerator.setVisibleTickGrade('MINOR', true);
        var accelerationTickGenerator = new geotoolkit.axis.AdaptiveTickGenerator()

        bounds = new geotoolkit.util.Rect(50, 190, 500, 170);
        horizontalAxis  = new geotoolkit.axis.Axis(timeAxisTickGenerator)
        .setBounds(bounds)
        horizontalAxis.setModelLimits(limits)
        horizontalAxis.setOrientation("Horizontal")



        bounds = new geotoolkit.util.Rect(0, 0, 50, 170);
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
            rssi = data["rssi"]
            packets = data["packets"]
            batt = data["batt"]
            temp = data["temp"]
            accel = data["acceleration"]
            console.log(isNaN(batt), isNaN(temp))

            if (initial_timestamp == null){
                initial_timestamp = timestamp;
                min_model_time = timestamp;
            }

            data_oversize = axial_data.getLength() - (10 * 2000);

            if (data_oversize > 0){
                axial_data.removeValues(0,data_oversize)
                tangential_data.removeValues(0,data_oversize)
                ideal_timestamps.removeValues(0,data_oversize)
                min_axial_scale = axial_data.getMin()
                max_axial_scale = axial_data.getMax()
                min_tangential_scale = tangential_data.getMin()
                max_tangential_scale = tangential_data.getMax()
            }

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
                return (value + timestamp) * 1000; //The timestamps need to be in milliseconds
            } );


            var limits = new geotoolkit.util.Rect(ideal_timestamps.getMin(), min_axial_scale, timestamp*1000+1,
             max_axial_scale);
            AutoScale(axial_plot, limits)
            limits = new geotoolkit.util.Rect(ideal_timestamps.getMin(), min_tangential_scale, timestamp*1000+1,
            max_tangential_scale);
            AutoScale(tangential_plot, limits)
            ideal_timestamps.addValues(timeAxis)
            axial_data.addValues(axial)
            tangential_data.addValues(tangential)
            rssi_gauge.setValue(rssi)
            packets_gauge.setValue(packets)
            batt_gauge.setValue(batt)
            temp_gauge.setValue(temp)
            axial_accel_gauge.setValue(Math.max(Math.abs(accel["axial"]["max"]),Math.abs(accel["axial"]["min"])))
            tangential_accel_gauge.setValue(Math.max(Math.abs(accel["tangential"]["max"]),Math.abs
            (accel["tangential"]["min"])))
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