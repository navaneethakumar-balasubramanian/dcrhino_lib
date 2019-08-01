/**
 * Created by dmitriy on 6/4/2014.
 */
require.config({
    waitSeconds: 35,
    urlArgs: 'bust=' + (new Date()).getTime(),
    paths: {
        'axios':'../js/axios',
        'geotoolkit': '../js/geotoolkit//geotoolkit.adv',
        'geotoolkit.pdf': '../js/geotoolkit//geotoolkit.pdf.adv',
        'geotoolkit.cgm': '../js/geotoolkit//geotoolkit.cgm.adv',
        'geotoolkit.controls': '../js/geotoolkit//geotoolkit.controls.adv',
        'geotoolkit.data': '../js/geotoolkit//geotoolkit.data.adv',
        'geotoolkit.widgets': '../js/geotoolkit//geotoolkit.widgets.adv',
        'geotoolkit.welllog': '../js/geotoolkit//geotoolkit.welllog.adv',
        'geotoolkit.welllog.las': '../js/geotoolkit//geotoolkit.welllog.las.adv',
        'geotoolkit.welllog.widgets': '../js/geotoolkit//geotoolkit.welllog.widgets.adv',

        'printdialog': '../js/printdialog',
        'warningdialog': '../js/warningdialog',

        'preview': 'src/preview',
        'modellimitsmanipulator': 'src/tools/modellimitsmanipulator',
        'annotationsmanipulator': 'src/tools/annotationsmanipulator',

        'datasource': 'src/data/datasource',
        'lassource': 'src/data/lassource',

        'bootbox': '../../../3rdparty/js/bootbox.min',
        'jquery': '../../../3rdparty/js/jquery.min',
        'jqueryui': '../../../3rdparty/js/jquery-ui.min',
        'jquerytouchpunch': '../../../3rdparty/js/jquery.ui.touch-punch.min',
        'jquery-contextmenu': '../../../3rdparty/js/jquery.contextMenu.min',
        'underscore': '../../../3rdparty/js/underscore-min',
        'backbone': '../../../3rdparty/js/backbone-min',
        'bootstrap': '../../../3rdparty/js/bootstrap.min',
        'bsdropdown': '../../../3rdparty/js/bootstrap-dropdown',
        'bsselect': '../../../3rdparty/js/bootstrap-select.min',
        'minicolors': '../../../3rdparty/js/jquery.minicolors.min',
        'icheck': '../../../3rdparty/js/icheck.min',
        'color': '../../../3rdparty/js/color.min',
        'geotoolkit.welllog.widgets.ui': '../js/geotoolkit//geotoolkit.welllog.widgets.ui.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'bootbox': {
            deps: ['jquery', 'bootstrap']
        },
        'backbone': {
            deps: ['jquery', 'underscore']
        },
        'bsselect': {
            deps: ['bootstrap']
        },
        'minicolors': {
            deps: ['jquery']
        },
        'icheck': {
            deps: ['jquery']
        },
        'jqueryui': {
            deps: ['jquery']
        },
        'jquerytouchpunch': {
            deps: ['jqueryui']
        },
        'modellimitsmanipulator': {
            deps: ['geotoolkit', 'geotoolkit.controls', 'geotoolkit.welllog.widgets']
        },
        'preview': {
            deps: ['modellimitsmanipulator', 'geotoolkit.welllog.widgets']
        },
        'geotoolkit.welllog.widgets.ui': {
            deps: ['backbone', 'jqueryui', 'jquerytouchpunch', 'bootstrap', 'icheck', 'minicolors', 'bsselect', 'color', 'geotoolkit.welllog.widgets']
        }
    }
});
