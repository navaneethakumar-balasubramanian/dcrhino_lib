define(["highlight.pack", "geotoolkit", "axios","numjs","geotoolkit.seismic", "geotoolkit.welllog.widgets", 'geotoolkit.seislog',"geotoolkit.widgets", "geotoolkit.seismic.widgets"], function () {
    const axios = require('axios')
    const numjs = require('numjs')

    function initialize() {
        var line = new geotoolkit.scene.shapes.Line({
            'from': new geotoolkit.util.Point(50, 50),
            'to': new geotoolkit.util.Point(300, 200),
            'linestyle': {
                'color': "blue",
                'width': 3
            }
        });

        var canvas = document.getElementById("canvas");

        // Create a new Plot object from the canvas and group
        return new geotoolkit.plot.Plot({
            'canvasElement' : canvas,
            'root' : line
        });
    }

    function startProcess () {
        axios.get('http://localhost:5000/start_acquisition')
    }


    return {
        'initialize': initialize,
        'start_process': startProcess
    };
});