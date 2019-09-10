/*
 * Copyright: Copyright (c) 2013 by INT, Inc.  All rights reserved.<br>
 * Company: INT, Inc. <br>
 * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */

define(['geotoolkit.widgets', './data.js', 'helpers', 'highlight.pack'], function (Widgets, data, Helpers) {
    hljs.initHighlighting();

    var maxIndex = 1000, index = 0, counter = 0;
    var startDate = new Date().getTime();
    var data1 = data.data[0];
    var data2 = data.data[1];
    var data3 = data.data[2];
    var MAX_DATA_LENGTH = 5*2000;
    var INDEXCOLUMN = 0;
    var VALUECOLUMN = 1;

    var _dataTables = [
        getDataTableView([], '', [], ''),
        getDataTableView([], '', [], ''),
        getDataTableView([], '', [], '')
    ];

    var ideal_timestamps = [];
    var axial_data = [];
    var tangential_data = [];

    function getDataTableView (values, valueunit, indices, indexunit) {
        var dataTable = new geotoolkit.data.DataTable({'cols': [
            {'type': 'number', 'data': indices.slice()},
            {'type': 'number', 'data': values.slice()}
        ]});
        dataTable.getColumn(0).setUnit(indexunit);
        dataTable.getColumn(1).setUnit(valueunit);

        var dataTableView = new geotoolkit.data.DataTableView(dataTable);

        return {
            'datatable': dataTable,
            'datatableview': dataTableView
        };
    }

    function init () {
        createRealtimeWidget();
    }

    function createRealtimeWidget () {
        var plot = createPlot('axial');
        var options = {
            'model': new geotoolkit.scene.Group()
//                .setModelLimits(new geotoolkit.util.Rect(startDate - 5 * 60 * 1000, 0, startDate, 1)),
                .setModelLimits(new geotoolkit.util.Rect(startDate - 5 * 1000, 0, startDate, 1)),
            'title': {
                'text': 'Real-time Monitoring'
            },
            'legends': {
                'height': 25
            },
            'scrollbar': {
                'visible': false
            },
            'viewcache': true,
            'intervalbuttons': {
                'visible': true,
                'intervals': {
                    '5s': 1000 * 5,
                    '2s': 1000 * 2,
                    '1m': 1000
                }
            }
        };
        var widget = new geotoolkit.widgets.TimeSeriesWidget(options);
        // disable all tools
        widget.getToolByName('picking').setEnabled(false);
        widget.getToolByName('cursor').setEnabled(false);
        widget.getToolByName('scroll').setEnabled(false);
        widget.disconnectTool(widget.getToolByName('picking'));
        widget.disconnectTool(widget.getToolByName('cursor'));
        widget.disconnectTool(widget.getToolByName('scroll'));


        widget.addCurve({
            'name': 'CALI',
            'uri': '//test//cali',
            'data': _dataTables[0]['datatableview'],
            'properties': {
                'autoscale': true,
                'unit': 'INS',
                'linestyle': {
                    'color': Helpers.getColor('orange'),
                    'width': 1.5
                }
            }});
        widget.addCurve({
            'name': 'DLT',
            'uri': '//test//dlt',
            'data': _dataTables[1]['datatableview'],
            'properties': {
                'autoscale': true,
                'unit': 'US/FT',
                'linestyle': {
                    'color': Helpers.getColor('blue'),
                    'width': 1.5
                }
            }});
        widget.addCurve({
            'name': 'GR',
            'uri': '//test//gr',
            'data': _dataTables[2]['datatableview'],
            'properties': {
                'autoscale': true,
                'unit': 'API',
                'linestyle': {
                    'color': Helpers.getColor('green'),
                    'width': 1.5
                }
            }});

        var customPattern = new geotoolkit.attributes.ImagePattern({
            'src': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAA' +
            'AQCAYAAABQrvyxAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAScwAAE' +
            'nMBjCK5BwAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw' +
            '9HKhAAAAo0lEQVRIS81WQQ6AIAzj/5/GaAIq26DVQDmYYEJ1XVtGyjm' +
            'n8qR0Lu93dq3Am+K/FlFwq/EXgfanbBFKvCm+ZyePWEQW3fsbj/pcZZ' +
            'G2oUZthIDSIiOL1xBHRBiJvW/Mxg8JIAop9xgC7AnUFr8a/yKwa1B7C' +
            'odTmO2kKujuIGOvFrODCimABpFVZnZGqFNox4zABFQej+xcm4lYR+lx' +
            'bxI/SR1oUFAhMA7PXAAAAABJRU5ErkJggg=='});


        var fillStyles = [
            'rgba(21,101,192,0.5)',
            'rgba(239,108,0,0.5)',
            'rgba(253,216,53,0.25)',
            {
                'color': 'rgba(21,101,192,0.25)', // violet
                'pattern': customPattern,
                'foreground': 'rgba(21,101,192,0.5)'
            }
        ];

        widget.addFill(
            '//test//dlt', '//test//gr',
            fillStyles[0],
            geotoolkit.widgets.TimeSeriesWidget.FillType.CurveToCurve,
            geotoolkit.widgets.TimeSeriesWidget.FillDirection.Top
        );

        widget.addFill(
            '//test//dlt', '//test//gr',
            fillStyles[3],
            geotoolkit.widgets.TimeSeriesWidget.FillType.CurveToCurve,
            geotoolkit.widgets.TimeSeriesWidget.FillDirection.Bottom
        );


        plot.setRoot(widget);
        var toolContainer = new geotoolkit.controls.tools.ToolsContainer(plot);
        toolContainer.add(widget.getTool());
        plot.update();

        var range = new geotoolkit.util.Range(startDate - 5 * 60 * 1000, startDate);
        widget.setVisibleRange(range);

        var update = function () {
            var _index = startDate + counter * 1000,
                cd1 = data1[index], cd2 = data2[index], cd3 = data3[index];

            var currentRange = widget.getVisibleRange();
            range.setRange(_index - (5 * 60 * 1000), _index+1000);

            ideal_timestamps = [];
            axial_data = [];
            var m = []

            for (i=0;i<2000;i++){

//                ideal_timestamps.push(_index+i*500)
//                axial_data.push(Math.random()*cd1);
                m.push([_index+i*0.5,Math.random()*cd1])
            }





//            _dataTables[0]['datatable'].addRow([_index, cd1]);
//            _dataTables[1]['datatable'].addRow([_index, cd2]);
//            _dataTables[2]['datatable'].addRow([_index, cd3]);
            _dataTables[0]['datatable'].addRows(m);
            console.log(m[0], m[1999])
//            console.log([cd1, axial_data[0], axial_data[1999]])
//            console.log(widget.getModelLimits())

//            trim data
            _dataTables.forEach(function (dt) {
                var length = dt['datatableview'].getNumberOfRows();
                if (length > MAX_DATA_LENGTH) {
                    var delta = length - MAX_DATA_LENGTH;

                    if (delta !== 0) {
                        var indexColumn = dt['datatable'].getColumn(INDEXCOLUMN),
                            valueColumn = dt['datatable'].getColumn(VALUECOLUMN);
                        geotoolkit.data.DataSeriesUtil.trimValues(indexColumn, indexColumn.getValue(0), indexColumn.getValue(delta), [valueColumn]);
                    }
                }
            });


            widget.setRange(range);
            widget.setVisibleRange(new geotoolkit.util.Range(m[1999][0] - 5000, m[1999][0]));
//            widget.setVisibleRange(new geotoolkit.util.Range(_index - (currentRange.getHigh() - currentRange.getLow()),_index));
//
//            ++index;
//            if (index >= maxIndex) {
//                index = 0;
//            }
            ++counter;
            plot.update();
        };

        window.setInterval(update, 1000);
    }

    function createPlot (id) {
        return new geotoolkit.plot.Plot({
            'canvasElement': document.getElementById(id),
            'autoUpdate': false
        });
    }

    return {
        'init': init
    };
});