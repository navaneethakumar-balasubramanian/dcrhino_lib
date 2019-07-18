/* tslint:disable */
/* eslint-disable */
/**
 * Copyright: Copyright (c) 2016 by INT, Inc.  All rights reserved.<br>
 * Company: INT, Inc. <br>
 * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import {_geo} from './geotoolkit.adv.module.js';
import {seismic} from './geotoolkit.seismic.adv.module.js';
import {welllog} from './geotoolkit.welllog.adv.module.js';

export let seislog = (function (_geo) {var _geo=_geo||{};_geo.c.YY=_geo.c.YY||{};_geo.c.YY.headers=_geo.c.YY.headers||{};
_geo.c.YY.Fhb=function(){function b(a,b,e,d,f){_geo.c.ra.pd.h4.call(this,a,b,e,d,f);a=e;this.translate(0,-a).scale(1,1/(f-a)).rotate(Math.PI/2,.5,.5).scale(1,f-a).translate(0,a)}_geo.c.na(b,_geo.c.ra.pd.h4);_geo.c.ja(b,"geotoolkit.seislog.WaveSeismicImage");b.prototype.Ga=function(a,b,e,d){_geo.c.ra.pd.h4.prototype.Ga.call(this,a,b,e,d);a=this.ha().ta();b=this.ha().xa();this.je(null).translate(0,-a).scale(1,1/(b-a)).rotate(Math.PI/2,.5,.5).scale(1,b-a).translate(0,a);return this};return b}();
_geo.c.YY.headers.TVa=function(){function b(b){_geo.c.ca.jb.cA.call(this,b);this.bo=new _geo.c.f.NumberFormat;this.bo.eu(2);this.ao=new _geo.c.f.NumberFormat;this.ao.eu(2);var e={visible:!0,text:"",verticalpos:"top",horizontalpos:"center"};b={gap:5,priority:["Name","ScaleFrom","ScaleTo"],order:["Name","ScaleFrom","ScaleTo"]};var d=_geo.c.Ja(e,{});_geo.c.Ja({updatemethod:a.CVa,cut:"left-to-right",textstyle:this.ec().clone()},d);var f=_geo.c.Ja(e,{});_geo.c.Ja({updatemethod:function(a){a=a.re();if(!a)return"";
a=a.uq().z1();a=a.limits.nb()*a.scale;return this.bo.format(a)}.bind(this),textstyle:this.ec().clone(),horizontalpos:"left"},f);e=_geo.c.Ja(e,{});_geo.c.Ja({updatemethod:function(a){a=a.re();if(!a)return"";a=a.uq().z1();a=a.limits.wb()*a.scale;return this.ao.format(a)}.bind(this),textstyle:this.ec().clone(),horizontalpos:"right"},e);this.An("ScaleFrom",f);this.An("Name",d);this.An("ScaleTo",e);this.es(b);this.cb(new _geo.c.f.Rect(0,0,100,40));this.Ga(new _geo.c.f.Rect(0,0,100,40))}var a=_geo.c.ca.jb.gc;
_geo.c.na(b,_geo.c.ca.jb.cA);_geo.c.ja(b,"geotoolkit.seislog.headers.AdaptiveSeismicImageHeader");b.prototype.Aa=function(a){var b=null!=this.sb()?a.Qc(this.sb()):a,d=this.re();if(null!=d)if(b.Sd())this.Ot(b,_geo.c.attributes.Ha.Ui);else if(this.An("Name",{text:this.re().getName()}),_geo.c.ca.jb.cA.prototype.Aa.call(this,a),null!=d.uq().GQ()){var f=d.uq().GQ().cc();if(0!==f&&(d=_geo.c.ra.f.pxa.Kp().A5a(d.uq().xb().colors.colorMap,f),null!==d)){a=this.va().clone();var h=d.ad(),l=d.kd(),k=a.ba()/f,
m=a.da()/2,q=a.ua(),f=(l-h)/f,h=h+f/2;for(b.Ba(null);q<a.ya();)b.Ea(new _geo.c.attributes.Ha(d.Kc(h).Dr())),b.xc(q,a.xa()-m,k,m),h+=f,q+=k}}};b.prototype.fb=function(a){this.bo=a.bo;this.ao=a.ao;this.cb(a.va());this.Ga(a.ha())};b.prototype.uy=function(){return this.bo};b.prototype.sy=function(){return this.ao};b.prototype.hV=function(a){this.bo=a;return this};b.prototype.P2=function(a){this.ao=a;return this};return b}();_geo.c.ca.jb.Z3.ow().aM(_geo.c.ra.pd.h4.getClassName(),new _geo.c.YY.headers.TVa);
_geo.c.ca.jb.Z3.ow().aM(_geo.c.YY.Fhb.getClassName(),new _geo.c.YY.headers.TVa);
(function(){var b="geotoolkit",a=_geo.c.hx,g=_geo.c.gx,e=null;a(b+".seislog.WaveSeismicImage",_geo.c.YY.Fhb);g(e=_geo.c.YY.Fhb.prototype,"setBounds",e.Ga,{Ga:0});a(b+".seislog.headers.AdaptiveSeismicImageHeader",_geo.c.YY.headers.TVa);g(e=_geo.c.YY.headers.TVa.prototype,"render",e.Aa,{Aa:0});g(e,"copyConstructor",e.fb,{fb:0});g(e,"getMinValueFormat",e.uy,{uy:0});g(e,"getMaxValueFormat",e.sy,{sy:0});g(e,"setMinValueFormat",e.hV,{hV:0});g(e,"setMaxValueFormat",e.P2,{P2:0})})();

    return _geo.geotoolkit.seislog;
}(_geo));
/* eslint-enable */
/* tslint:enable */