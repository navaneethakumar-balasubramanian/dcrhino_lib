/* tslint:disable */
/* eslint-disable */
/**
 * Copyright: Copyright (c) 2016 by INT, Inc.  All rights reserved.<br>
 * Company: INT, Inc. <br>
 * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
(function (root, factory) {
if (root && typeof root['define'] === 'function') {
    root['define']("geotoolkit.intgeo", ["geotoolkit"], function() {
      root._geo = factory(root, root._geo);
      root.geotoolkit = root._geo.geotoolkit || root.geotoolkit;
      return root.geotoolkit;
    });
} else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    var m = factory(root, root && root._geo);
    module.exports._geo = m;
    if (root) { 
        root._geo = module.exports._geo;
        if(!root.geotoolkit) {
            root.geotoolkit = module.exports._geo.geotoolkit;
        }
    }
    if (!module.exports.geotoolkit) module.exports.geotoolkit=module.exports._geo.geotoolkit;
} else {
    root._geo = factory(root, root._geo);
    root.geotoolkit = root._geo.geotoolkit || root.geotoolkit;
    return root.geotoolkit;
}

}(typeof window !== "undefined" ? window : undefined, function (window, _geo) {
var _geo=_geo||{};_geo.c.wja=_geo.c.wja||{};
_geo.c.wja.BKb=function(){function b(a){this.options=_geo.c.Ja(a,{server:"",metaservice:"json/faultdata",dataservice:"json/faultquery",file:""})}function a(a,b){return(0,window.encodeURI)(a+"?json=")+(0,window.encodeURIComponent)(JSON.stringify({filePath:b}))}_geo.c.ja(b,"geotoolkit.intgeo.RemoteFaultPillarDataSource");b.prototype.oka=function(b,e){var d=new _geo.c.window.XMLHttpRequest;d.onreadystatechange=function(){if(d.readyState===d.DONE)if(200===d.status&&null!=d.response){var a=JSON.parse(d.response);
b(a)}else _geo.c.log("Failed to download:"+d.status+" "+d.statusText),e(d)};d.open("GET",a(this.options.server+this.options.metaservice,this.options.file),!0);d.send();return d};b.prototype.HEa=function(b,e){var d=new _geo.c.window.XMLHttpRequest;d.onreadystatechange=function(){d.readyState===d.DONE&&(200===d.status&&null!=d.response?b(JSON.parse(d.response)):(_geo.c.log("Failed to download:"+d.status+" "+d.statusText),e(d)))};d.open("GET",a(this.options.server+this.options.dataservice,this.options.file),
!0);d.send();return d};return b}();
_geo.c.wja.CKb=function(){function b(a){this.options=_geo.c.Ja(a,{server:"",metaservice:"json/gridsurfacestream",dataservice:"json/gridsurfacestreampts",file:""})}function a(a,b){return(0,window.encodeURI)(a+"?json=")+(0,window.encodeURIComponent)(JSON.stringify({filePath:b}))}_geo.c.ja(b,"geotoolkit.intgeo.RemoteGridSurfaceDataSource");b.prototype.oka=function(b,e){var d=new _geo.c.window.XMLHttpRequest;d.onreadystatechange=function(){if(d.readyState===d.DONE)if(200===d.status&&null!=d.response){var a=
JSON.parse(d.response);b(a)}else _geo.c.log("Failed to download:"+d.status+" "+d.statusText),e(d)};d.open("GET",a(this.options.server+this.options.metaservice,this.options.file),!0);d.send();return d};b.prototype.j8b=function(b,e){var d=new _geo.c.window.XMLHttpRequest;d.onreadystatechange=function(){d.readyState===d.DONE&&(200===d.status&&null!=d.response?b(new window.Float32Array(d.response)):(_geo.c.log("Failed to download:"+d.status+" "+d.statusText),e(d)))};d.open("GET",a(this.options.server+
this.options.dataservice,this.options.file),!0);d.responseType="arraybuffer";d.send();return d};return b}();
_geo.c.wja.EKb=function(){function b(a){this.options=_geo.c.Ja(a,{server:"",metaservice:"json/welldata",dataservice:"json/logcurvedata",file:""})}function a(a,b,d){return null==d?(0,window.encodeURI)(a+"?json=")+(0,window.encodeURIComponent)(JSON.stringify({filePath:b})):(0,window.encodeURI)(a+"?json=")+(0,window.encodeURIComponent)(JSON.stringify({filePath:b,logCurve:d}))}_geo.c.ja(b,"geotoolkit.intgeo.RemoteWelllogDataSource");b.prototype.oka=function(b,e){var d=new _geo.c.window.XMLHttpRequest;
d.onreadystatechange=function(){if(d.readyState===d.DONE)if(200===d.status&&null!=d.response){var a=JSON.parse(d.response);b(a)}else _geo.c.log("Failed to download:"+d.status+" "+d.statusText),e(d)};d.open("GET",a(this.options.server+this.options.metaservice,this.options.file),!0);d.send();return d};b.prototype.i8b=function(b,e,d){var f=new _geo.c.window.XMLHttpRequest;f.onreadystatechange=function(){if(f.readyState===f.DONE)if(200===f.status&&null!=f.response){var a=JSON.parse(f.response);e(a)}else _geo.c.log("Failed to download:"+
f.status+" "+f.statusText),d(f)};f.open("GET",a(this.options.server+this.options.dataservice,this.options.file,b),!0);f.send();return f};return b}();
(function(){var b="geotoolkit",a=_geo.c.hx,g=_geo.c.gx,e=null,d=null;a(b+".intgeo.RemoteFaultPillarDataSource",(d=_geo.c.wja).BKb);g(e=_geo.c.wja.BKb.prototype,"readMetadata",e.oka,{oka:0});g(e,"readData",e.HEa,{HEa:0});a(b+".intgeo.RemoteGridSurfaceDataSource",d.CKb);g(e=_geo.c.wja.CKb.prototype,"readMetadata",e.oka,{oka:0});g(e,"readDataArray",e.j8b,{j8b:0});a(b+".intgeo.RemoteWelllogDataSource",d.EKb);g(e=_geo.c.wja.EKb.prototype,"readMetadata",e.oka,{oka:0});g(e,"readCurve",e.i8b,{i8b:0})})();

    return _geo;
}));
/* eslint-enable */
/* tslint:enable */