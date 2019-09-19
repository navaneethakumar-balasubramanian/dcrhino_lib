<template>
  <canvas id='test' style='width:100%; height:100%'></canvas>
</template>

<script>

export default {
  data: () => ({
     dataLimits: null
  }),
  mounted() {
    this.dataLimits = new geotoolkit.util.Rect(-480, -500, 480, 500)
    this.initialize()
  },
  methods:{
    createWidget:function (model) {
        // Create a XY widget with two axes
        var axisSouth, axisWest;
        // Create space to calculate nice model limits and step for vertical direction
        // This step is needed only for automatic model limits and step
        var verticalSpace = new geotoolkit.axis.AxisLinearDimension({'neatlimits': true});
        var widget = new geotoolkit.widgets.AnnotatedWidget({
            'model': model,
            'annotationssizes': {
                'north': '5',
                'south': '50',
                'east': '12',
                'west': '50'
            },
            'keepvisiblelimits': false,
            'north': [],
            'east': [],
            'south': [
                axisSouth = new geotoolkit.axis.Axis({
                    'tickposition': geotoolkit.axis.TickInfo.TickPosition.Top,
                    'labelposition': geotoolkit.axis.TickInfo.LabelPosition.Top,
                    'orientation': geotoolkit.axis.AxisOrientation.Horizontal,
                    'title': {
                        'text': 'X Axis',
                        'visible': true,
                        'anchor': geotoolkit.util.AnchorType.BottomCenter,
                        'textstyle': {
                            'color': '#757575'
                        }
                    }
                })
            ],
            'west': [
                axisWest = new geotoolkit.axis.Axis({
                    'tickposition': geotoolkit.axis.TickInfo.TickPosition.Right,
                    'labelposition': geotoolkit.axis.TickInfo.LabelPosition.Right,
                    'orientation': geotoolkit.axis.AxisOrientation.Vertical,
                    'title': {
                        'text': 'Y Axis',
                        'visible': true,
                        'anchor': geotoolkit.util.AnchorType.LeftCenter,
                        'textstyle': {
                            'color': '#757575'
                        }
                    }
                })
            ],
            'tools': {
                'horizontalscroll': {
                    'visible': false
                },
                'verticalscroll': {
                    'visible': false
                }
            }
        })
            .connect(axisWest, model)
            .connect(axisSouth, model)
            .setCenterModelLimits(model.getModelLimits())
            .setScaleScrollStrategy(function (model, transformation) {
                return geotoolkit.scene.ScaleScrollStrategy.anchoredTransformationAdjustment(model, transformation);
            })
            .refreshLayout();
        // Set space to update axis
        axisWest.setAxisDimension(verticalSpace);
        verticalSpace.on(geotoolkit.axis.AxisDimension.Events.Changed, function () {
            // Sets calculated model limits
            var modelLimits = model.getModelLimits().clone();
            model.setModelLimits(modelLimits.setY(verticalSpace.getMin()).setHeight(verticalSpace.getMax() - verticalSpace.getMin()));
        });
        // Calculate nice limits for current transformation
        verticalSpace.updateLimits(this.dataLimits.getTop(), this.dataLimits.getBottom(), model.getSceneTransform());
        return widget;
    },

     createData:function (dataLimits) {
        var n = 500;
        var step = dataLimits.getWidth() / n;
        var amp = (dataLimits.getHeight()) / 2;
        var multiplier = 50 / n;
        var beta = 3.0 / n;
        var x = [], y = [];
        for (var i = 0; i < n; ++i) {
            x[i] = dataLimits.getX() + i * step;
            y[i] = (amp * Math.exp(-beta * i)) * Math.sin(multiplier * i);
        }
        
        return {
            'x': x,
            'y': y
        };
    },

    createLineChart:function (x, y) {
        var lineChart = new geotoolkit.controls.shapes.LineChart({
            'x': x,
            'y': y,
            'linestyles': ['#bbdefb'],
            'gridvisible': false
        });
        lineChart.setBounds(lineChart.getModelLimits());
        return lineChart;
    },
    createModel:function () {
        var group = new geotoolkit.scene.Group();
        // cache content
        group.setCache(new geotoolkit.scene.ViewCache());
        // Create simple gridlines
        var yGridTickGenerator = new geotoolkit.axis.AdaptiveTickGenerator();
        yGridTickGenerator.getTickStyle('MAJOR').setColor('#ededed');
        yGridTickGenerator.getTickStyle('MINOR').setColor('#ededed');
        var xGridTickGenerator = new geotoolkit.axis.AdaptiveTickGenerator();
        xGridTickGenerator.getTickStyle('MAJOR').setColor('#ededed');
        xGridTickGenerator.getTickStyle('MINOR').setColor('#ededed');
        var data = this.createData(this.dataLimits);
        var lineChart = this.createLineChart(data.x, data.y);
        // Add gridlines  and line chart to the model
        group.addChild([
            new geotoolkit.axis.Grid(xGridTickGenerator, yGridTickGenerator),
            lineChart
        ]);
        group.setModelLimits(new geotoolkit.util.Rect(-500, -500, 500, 500));
        group.adjustPosition();
        return group;
    },

    initialize:function () {
        // Create a model
        var model = this.createModel();
        // Create a widget to display a model
        var widget = this.createWidget(model);
        // Get the canvas as a DOM object
        var canvas = document.getElementById('test');
        // Create a new Plot object from the canvas and group
        var plot = new geotoolkit.plot.Plot({
            'canvasElement': canvas,
            'root': widget
        });

        // init tools container to support interactions with widget
        var toolContainer = new geotoolkit.controls.tools.ToolsContainer(plot);
        toolContainer.add(widget.getTool());
        console.log(canvas)
        return plot;
    }

  }
};
</script>
