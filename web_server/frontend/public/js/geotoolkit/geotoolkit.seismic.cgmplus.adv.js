/* tslint:disable */
/* eslint-disable */
/**
 * Copyright: Copyright (c) 2016 by INT, Inc.  All rights reserved.<br>
 * Company: INT, Inc. <br>
 * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
(function (root, factory) {
if (root && typeof root['define'] === 'function') {
    root['define']("geotoolkit.seismic.cgmplus", ["geotoolkit.seismic","geotoolkit.cgm"], function() {
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
var _geo=_geo||{};_geo.c.ra.Fha=_geo.c.ra.Fha||{};
_geo.c.ra.Fha.SFb=function(){function b(){this.CK=null;_geo.c.jo.vWa.call(this)}_geo.c.na(b,_geo.c.jo.vWa);_geo.c.ja(b,"geotoolkit.seismic.cgmplus.CgmPlusExport");b.prototype.xXb=function(a,b,e,d,f,h){function l(){m.CK.close();m.CK.LI();null!=k&&k.Mn();m.O7b(a);h&&h()}var k=null;_geo.c.$l(a,_geo.c.V.Sb.Bea)&&(k=a,k.ho(),a=a.Kz(d));d=this.Q7b(a)||e;e=e||d;b={stream:b,op:d,ODc:f};this.CK=new _geo.c.ra.Fha.feb(b);this.CK.AI();this.CK.open(e);e=new _geo.c.f.sa;var m=this;a instanceof _geo.c.V.Sb.BV?a.Mu(this.CK,
e,l):a.Mu(this.CK,l)};b.prototype.cancel=function(){this.CK.Rrc()};return b}();
_geo.c.ra.Fha.feb=function(){function b(a){_geo.c.jo.wHa.call(this,a);this.J_a=0;this.Xna=[];this.J_a=0;this.Rx.oBa=1;this.Rx.Rwb=4096;this.SQb=a.progress||function(){};this.hKa=a.cancelled||!1}_geo.c.na(b,_geo.c.jo.wHa);_geo.c.Rg(b,_geo.c.ra.pd.kIa);_geo.c.ja(b,"geotoolkit.seismic.cgmplus.CgmPlusRenderingContext");b.prototype.jYb=function(){return'"ProfileId: CGM+","ColorClass: Colour","Source: (c) '+(new Date).getFullYear()+' Interactive Network Technologies Inc."'};b.prototype.Rrc=function(){this.hKa=
!0;this.DOb.Ra();this.Jmb.Ra();this.uc.IL().Ra()};b.prototype.kra=function(a,g,e){function d(a){t.push(function(b){l.select(a,function(d){if(!u.hKa){if(!0===d.ge())for(var e=a.from;e<=a.to;e++){var f=d.Oh(e);p=f.$f();null!=p&&u.Vuc(p)}u.SQb(a.to/q);u.uc.IL().compile()}b()})})}function f(a,b){function d(){var b=a[f++];b.call(null,e)}function e(g){if(g||f===a.length||u.hKa)return b();d()}var f=0;u.hKa?b():d()}this.$v=a;var h=this.uc.Orb();this.uc.NOa(0);var l=a.uq(),k=l.GQ();null!=k&&(this.uc.$ob(k.mo(),
this.Rx.oBa),this.uc.tba());this.Jlb=l.UN();this.Pnc=b.r5b(this.Jlb);e=l.getReader();var m=new _geo.c.f.Range(0,e.Ds());a=0;var q=e.Xg()-1,p=[];this.Xyc(l,a,m);this.mrc();var u=this,t=[];for(e=5E3;a<q;a+=e+1)d({from:a,to:a+e<q?a+e:q});f(t,function(){u.uc.NOa(h);u.Rx.oBa+=k.mE;g()})};b.prototype.Qc=function(a){return new _geo.c.ra.Fha.feb({parent:this,Dd:this.uc,op:this.a4a,kf:_geo.c.f.Fa.multiply(this.$a(),a),Qz:a,fillStyle:this.ve,PBa:this.IP,af:this.Ys,qe:this.lf,HBa:this.uE,clip:this.Ch,Aob:this.Rx,
krb:this.LP,fonts:this.UM,ODc:this.SQb,VKc:this.hKa})};b.prototype.mrc=function(){var a=this.$v.uq(),b=1,e=-1,d=a.z1().limits,f=d.nb(),d=d.wb(),b=(b-e)/(d-f),e=e-f*b,f=a.z8a();this.ejb=b*f;this.gjb=e*f;a=a.GQ().cc()/2;this.fjb=this.ejb*a;this.hjb=(this.gjb+1)*a};b.prototype.Xyc=function(a,b,e){this.TUa(a,b);this.ADc(a,b,e);this.uc.Ud(this.uc.Dd(4,10),4*this.uc.pu()+9*this.uc.$u()+8*this.uc.qK());this.uc.jn(-4);this.uc.xm(this.$k.udc);this.uc.xm(this.$k.Q4a);this.uc.xm(this.$k.F4a);this.uc.xm(this.$k.Vcb);
this.uc.jn(0);this.uc.v(this.$k.bUb);this.uc.v(this.$k.Lnb);this.uc.v(this.$k.WDb);this.uc.v(this.$k.rec);this.uc.v(this.$k.N7b);this.uc.v(this.$k.y6b);this.uc.jn(this.$k.CGa);this.uc.jn(this.$k.uzb);this.uc.jn(this.$k.ej);this.uc.v(this.$k.M7b);this.uc.v(this.$k.x6b);this.uc.jn(0);this.uc.jn(this.$k.Cec);this.uc.jn(this.$k.L6b);this.uc.jn(this.$k.wdc)};b.prototype.ltb=function(){return _geo.c.f.Fa.Sf(this.$v.va()||new _geo.c.f.Rect,this.Ch.ha())};b.prototype.ADc=function(a,g,e){this.$k={udc:new _geo.c.f.sa,
Q4a:new _geo.c.f.sa,F4a:new _geo.c.f.sa,Vcb:new _geo.c.f.sa,bUb:0,Lnb:0,WDb:0,rec:0,N7b:0,y6b:0,M7b:0,x6b:0,CGa:0,uzb:0,ej:0,Cec:0,L6b:0,wdc:0};var d=a.va();g=d.ga();d=d.ta()+e.nb()*a.getReader().no().Zm();g=this.ltb().hb(new _geo.c.f.sa(g,d));g=this.LP.hb(g);this.$k.udc=g;g=1;var d=0,f=1,h=0;this.$k.Q4a=new _geo.c.f.sa(0,-1);this.$k.Vcb=new _geo.c.f.sa(g,d);this.$k.F4a=new _geo.c.f.sa(f,h);this.$k.bUb=this.Ch.ha().da()/e.cc();this.$k.WDb=Math.abs(this.ltb().Rb());this.$k.Lnb=32767;this.$k.rec=0;
g=a.xb().plot.clippingFactor*this.$k.WDb/this.$k.Lnb;this.$k.N7b=g;this.$k.y6b=-g;this.$k.CGa=this.tyc(a.UN());g=_geo.c.f.Fa.Dba(this.$a());0!==g&&(g=_geo.c.f.Fa.hp(g,0,0),g.Ie(this.$k.Q4a,this.$k.Q4a),g.Ie(this.$k.Vcb,this.$k.Vcb),g.Ie(this.$k.F4a,this.$k.F4a),this.kAc(a.UN()));a=b.r5b(a.UN());this.$k.uzb=a?4:0;this.$k.ej=e.cc();this.$k.M7b=1;this.$k.x6b=-1;this.$k.Cec=1;this.$k.L6b=0;this.$k.wdc=1};b.prototype.kAc=function(a){a.SimpleDensity||(this.$k.CGa+=8);a.InterpolatedDensity&&(this.$k.CGa-=
16)};b.prototype.TUa=function(a,b){var e=a.GQ(),e=e.Oga+1;this.uc.V9a(this.Rx.oBa+e);this.uc.fillColor(this.Rx.oBa+e);return this};b.r5b=function(a){return!!(a.PositiveColorFill||a.NegativeColorFill||a.LobeColorFill||a.SimpleDensity||a.InterpolatedDensity)};b.prototype.Vuc=function(a){var b=Math.abs(this.ltb().Rb()),e=0===this.$k.uzb?2:4,e=(null!=a?a.length:0)*e,d=e+this.uc.$u();if(null==this.Xna||this.Xna.length!==e)this.Xna=[];this.J_a=0;this.uc.Ud(this.uc.Dd(4,10),d);this.uc.jn(-5);this.Pnc?this.Nuc(a,
b,this.Jlb):this.cvc(a,b,this.Jlb);this.uc.IL().ji(this.Xna,0,e);return this};b.prototype.cvc=function(a,b,e){for(var d=0;d<a.length;d++)e=(this.ejb*a[d]+this.gjb)*b,0<e?e+=.5:0>e&&(e-=.5),this.yzb(e,this.Xna)};b.prototype.Nuc=function(a,b,e){var d,f,h=this.$v.uq().GQ().cc(),l=0;for(f=0;f<a.length;f++){d=e.Wiggle||e.NegativeColorFill||e.PositiveColorFill?(this.ejb*a[f]+this.gjb)*b:this.fjb*a[f]+this.hjb;0<d?d+=.5:0>d&&(d-=.5);this.yzb(d,this.Xna);d=a[f]*this.fjb+this.hjb;if(e.LobeColorFill){if(0>
d&&0<=l||0<d&&0>=l)l=this.JAc(a,f)*this.fjb+this.hjb;d=~~(l+1)}else d=~~(d+1);0>d?d=0:d>=h&&(d=h-1);this.yzb(this.Rx.oBa+d,this.Xna)}};b.prototype.tyc=function(a){if(null==a)return-1;var b=0;a.Wiggle&&(b+=1);a.PositiveFill&&(b+=2);a.NegativeFill&&(b+=4);a.SimpleDensity&&(b+=8);a.InterpolatedDensity&&(b+=16);a.PositiveColorFill&&(b+=32);a.NegativeColorFill&&(b+=64);a.LobeColorFill&&(b+=96);return b};b.prototype.JAc=function(a,b){var e=0,d=0<a[b],f=b;if(d)for(;f<a.length&&0<=a[f];)a[f]>e&&(e=a[f]),
f++;else for(;f<a.length&&0>=a[f];)a[f]<e&&(e=a[f]),f++;return e};b.prototype.yzb=function(a,b){b[this.J_a++]=a>>8&255;b[this.J_a++]=a&255};b.prototype.vPc=function(a,b){return b?new _geo.c.f.Rect(a.y,a.x,a.y+a.height,a.x+a.width):new _geo.c.f.Rect(a)};return b}();
(function(){var b=_geo.c.hx,a=_geo.c.gx,g=null;b("geotoolkit.seismic.cgmplus.CgmPlusExport",_geo.c.ra.Fha.SFb);a(g=_geo.c.ra.Fha.SFb.prototype,"exportToCgmStreamAsync",g.xXb,{xXb:0});a(g,"cancel",g.cancel,{cancel:0});a(g=_geo.c.ra.Fha.feb.prototype,"drawSeismicImage",g.kra,{kra:0});a(g,"pushTransformation",g.Qc,{Qc:0})})();

    return _geo;
}));
/* eslint-enable */
/* tslint:enable */