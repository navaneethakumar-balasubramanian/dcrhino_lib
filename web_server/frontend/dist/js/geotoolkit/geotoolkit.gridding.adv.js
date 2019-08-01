/* tslint:disable */
/* eslint-disable */
/**
 * Copyright: Copyright (c) 2016 by INT, Inc.  All rights reserved.<br>
 * Company: INT, Inc. <br>
 * INT PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
(function (root, factory) {
if (root && typeof root['define'] === 'function') {
    root['define']("geotoolkit.gridding", ["geotoolkit"], function() {
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
var _geo=_geo||{};_geo.c.aO.Kva=function(){function b(a){this.qz=_geo.c.Ja(a,{filter:!0},!0)}_geo.c.ja(b,"geotoolkit.gridding.AbstractInterpolator");b.prototype.lka=function(a,b,e){this.qz&&this.Fvc(a,b,e);return this.g3(a,b,e)};b.prototype.g3=_geo.c.Ua;b.prototype.Qg=_geo.c.Ua;b.prototype.Fvc=function(a,b,e){for(var d={},f=a.length,f=f-1;0<=f;f--){if(d.hasOwnProperty(a[f])){if(d[a[f]].hasOwnProperty(b[f])){a.splice(f,1);b.splice(f,1);e.splice(f,1);continue}}else d[a[f]]={};d[a[f]][b[f]]=e[f]}};return b}();
_geo.c.aO.LXa=function(){function b(a){_geo.c.aO.Kva.call(this,a);a=_geo.c.Ja(a,{model:b.Oma.swa,sigma2:0,alfa:10},!0);this.mnb=null;this.Zc=a.model;this.mpc=a.sigma2;this.cmc=a.alfa}function a(a,b,d,e,f){return a>d?b+(e-b)/d:b+(e-b)/d*(a/d*1.5-.5*Math.pow(a/d,3))}function g(a,b,d,e,f){return b+(e-b)/d*(1-Math.exp(a/d*-(1/f)))}function e(a,b,d,e,f){return b+(e-b)/d*(1-Math.exp(-(1/f)*Math.pow(a/d,2)))}function d(a,b){var d=b,e=Array(b*b),f=Array(b),g=Array(b),h=Array(b),k,l=0,m=0,n,q,p;for(k=0;k<
b;k++)for(n=0;n<b;n++)e[k*b+n]=k===n?1:0;for(n=0;n<b;n++)h[n]=0;for(k=0;k<b;k++){for(n=p=0;n<b;n++)if(1!==h[n])for(q=0;q<b;q++)0===h[q]&&Math.abs(a[n*b+q])>=p&&(p=Math.abs(a[n*b+q]),m=n,l=q);++h[l];if(m!==l){for(n=0;n<b;n++)p=a[m*b+n],a[m*b+n]=a[l*b+n],a[l*b+n]=p;for(n=0;n<d;n++)p=e[m*b+n],e[m*b+n]=e[l*b+n],e[l*b+n]=p}g[k]=m;f[k]=l;if(0===a[l*b+l])return!1;q=1/a[l*b+l];a[l*b+l]=1;for(n=0;n<b;n++)a[l*b+n]*=q;for(n=0;n<d;n++)e[l*b+n]*=q;for(q=0;q<b;q++)if(q!==l){p=a[q*b+l];for(n=a[q*b+l]=0;n<b;n++)a[q*
b+n]-=a[l*b+n]*p;for(n=0;n<d;n++)e[q*b+n]-=e[l*b+n]*p}}for(n=b-1;0<=n;n--)if(g[n]!==f[n])for(q=0;q<b;q++)p=a[q*b+g[n]],a[q*b+g[n]]=a[q*b+f[n]],a[q*b+f[n]]=p;return!0}function f(a,b){var d,e,f,g;for(d=0;d<b;d++)for(a[d*b+d]=1/a[d*b+d],e=d+1;e<b;e++){g=0;for(f=d;f<e;f++)g-=a[e*b+f]*a[f*b+d];a[e*b+d]=g/a[e*b+e]}for(d=0;d<b;d++)for(e=d+1;e<b;e++)a[d*b+e]=0;for(d=0;d<b;d++){a[d*b+d]*=a[d*b+d];for(f=d+1;f<b;f++)a[d*b+d]+=a[f*b+d]*a[f*b+d];for(e=d+1;e<b;e++)for(f=e;f<b;f++)a[d*b+e]+=a[f*b+d]*a[f*b+e]}for(d=
0;d<b;d++)for(e=0;e<d;e++)a[d*b+e]=a[e*b+d]}function h(a,b){var d,e,f,g=Array(b);for(d=0;d<b;d++)g[d]=a[d*b+d];for(d=0;d<b;d++){for(e=0;e<d;e++)g[d]-=a[d*b+e]*a[d*b+e];if(0>=g[d])return!1;g[d]=Math.sqrt(g[d]);for(e=d+1;e<b;e++){for(f=0;f<d;f++)a[e*b+d]-=a[e*b+f]*a[d*b+f];a[e*b+d]/=g[d]}}for(d=0;d<b;d++)a[d*b+d]=g[d];return!0}function l(a,b,d,e,f){var g,h,k,l=Array(d*f);for(g=0;g<d;g++)for(h=0;h<f;h++)for(k=l[g*f+h]=0;k<e;k++)l[g*f+h]+=a[g*e+k]*b[k*f+h];return l}function k(a,b,d,e){var f,g,h=Array(d*
e);for(f=0;f<d;f++)for(g=0;g<e;g++)h[f*e+g]=a[f*e+g]+b[f*e+g];return h}function m(a,b,d){var e,f,g=Array(d*b);for(e=0;e<b;e++)for(f=0;f<d;f++)g[f*b+e]=a[e*d+f];return g}function q(a,b){var d,e=u(0,b*b);for(d=0;d<b;d++)e[d*b+d]=a;return e}function p(a,b,d){var e,f,g=!1;e=0;for(f=a.length-1;e<a.length;f=e++)a[e][1]>d!==a[f][1]>d&&b<(a[f][0]-a[e][0])*(d-a[e][1])/(a[f][1]-a[e][1])+a[e][0]&&(g=!g);return g}function u(a,b){if(b<n)return Array.apply(null,Array(b)).map(Number.prototype.valueOf,a);for(var d=
b/n<<0,e=Array.apply(null,Array(b%n)).map(Number.prototype.valueOf,a),f=0;f<d;f++)e=e.concat(Array.apply(null,Array(n)).map(Number.prototype.valueOf,a));return e}function t(a){return Math.min.apply(null,a)}function r(a){return Math.max.apply(null,a)}var n=65534,v={g3:function(b,n,p,r,t,v){var D={t:b,x:n,y:p,Ita:0,Oj:0,pGa:0,C:1/3,n:0};switch(r){case "gaussian":D.nt=e;break;case "exponential":D.nt=g;break;case "spherical":D.nt=a;break}var E,F,J,H,G=b.length,K=Array((G*G-G)/2);for(J=E=0;E<G;E++)for(F=
0;F<E;F++,J++)K[J]=Array(2),K[J][0]=Math.pow(Math.pow(n[E]-n[F],2)+Math.pow(p[E]-p[F],2),.5),K[J][1]=Math.abs(b[E]-b[F]);K.sort(function(a,b){return a[0]-b[0]});D.Oj=K[(G*G-G)/2-1][0];var M=30<(G*G-G)/2?30:(G*G-G)/2,O=D.Oj/M,L=u(0,M),N=u(0,M);if(30>M)for(H=0;H<M;H++)L[H]=K[H][0],N[H]=K[H][1];else{for(H=J=F=E=0;E<M&&F<(G*G-G)/2;E++,J=0){for(;K[F][0]<=(E+1)*O&&!(L[H]+=K[F][0],N[H]+=K[F][1],F++,J++,F>=(G*G-G)/2););0<J&&(L[H]/=J,N[H]/=J,H++)}if(2>H)return D}G=H;D.Oj=L[G-1]-L[0];J=u(1,2*G);F=Array(G);
H=D.C;for(E=0;E<G;E++){switch(r){case "gaussian":J[2*E+1]=1-Math.exp(-(1/H)*Math.pow(L[E]/D.Oj,2));break;case "exponential":J[2*E+1]=1-Math.exp(-(1/H)*L[E]/D.Oj);break;case "spherical":J[2*E+1]=L[E]/D.Oj*1.5-.5*Math.pow(L[E]/D.Oj,3);break}F[E]=N[E]}E=m(J,G,2);r=l(E,J,2,G,2);r=k(r,q(1/v,2),2,2);v=r.slice(0);h(r,2)?f(r,2):(d(v,2),r=v);G=l(l(r,E,2,2,G),F,2,G,1);D.Ita=G[0];D.pGa=G[1]*D.Oj+D.Ita;G=D.n=n.length;v=Array(G*G);for(E=0;E<G;E++){for(F=0;F<E;F++)v[E*G+F]=D.nt(Math.pow(Math.pow(n[E]-n[F],2)+Math.pow(p[E]-
p[F],2),.5),D.Ita,D.Oj,D.pGa,D.C),v[F*G+E]=v[E*G+F];v[E*G+E]=D.nt(0,D.Ita,D.Oj,D.pGa,D.C)}n=k(v,q(t,G),G,G);p=n.slice(0);h(n,G)?f(n,G):(d(p,G),n=p);v=n.slice(0);b=l(n,b,G,G,1);D.wic=v;D.Pic=b;return D},uO:function(a,b,d){var e,f=Array(d.n);for(e=0;e<d.n;e++)f[e]=d.nt(Math.pow(Math.pow(a-d.x[e],2)+Math.pow(b-d.y[e],2),.5),d.Ita,d.Oj,d.pGa,d.C);return l(f,d.Pic,1,d.n,1)[0]},EPc:function(a,b,d){var e,f=Array(d.n);for(e=0;e<d.n;e++)f[e]=d.nt(Math.pow(Math.pow(a-d.x[e],2)+Math.pow(b-d.y[e],2),.5),d.Ita,
d.Oj,d.pGa,d.C);return d.nt(0,d.Ita,d.Oj,d.pGa,d.C)+l(l(f,d.wic,1,d.n,d.n),f,1,d.n,1)[0]},IMc:function(a,b,d){var e,f,g,h=a.length;if(0===h)return null;var k=[a[0][0][0],a[0][0][0]],l=[a[0][0][1],a[0][0][1]];for(e=0;e<h;e++)for(f=0;f<a[e].length;f++)a[e][f][0]<k[0]&&(k[0]=a[e][f][0]),a[e][f][0]>k[1]&&(k[1]=a[e][f][0]),a[e][f][1]<l[0]&&(l[0]=a[e][f][1]),a[e][f][1]>l[1]&&(l[1]=a[e][f][1]);var m,n,q=Array(2),u=Array(2),M=Array(2),O=Array(2);f=Math.ceil((k[1]-k[0])/d);g=Math.ceil((l[1]-l[0])/d);var L=
Array(f+1);for(e=0;e<=f;e++)L[e]=Array(g+1);for(e=0;e<h;e++){M[0]=a[e][0][0];M[1]=M[0];O[0]=a[e][0][1];O[1]=O[0];for(f=1;f<a[e].length;f++)a[e][f][0]<M[0]&&(M[0]=a[e][f][0]),a[e][f][0]>M[1]&&(M[1]=a[e][f][0]),a[e][f][1]<O[0]&&(O[0]=a[e][f][1]),a[e][f][1]>O[1]&&(O[1]=a[e][f][1]);q[0]=Math.floor((M[0]-(M[0]-k[0])%d-k[0])/d);q[1]=Math.ceil((M[1]-(M[1]-k[1])%d-k[0])/d);u[0]=Math.floor((O[0]-(O[0]-l[0])%d-l[0])/d);u[1]=Math.ceil((O[1]-(O[1]-l[1])%d-l[0])/d);for(f=q[0];f<=q[1];f++)for(g=u[0];g<=u[1];g++)m=
k[0]+f*d,n=l[0]+g*d,p(a[e],m,n)&&(L[f][g]=v.uO(m,n,b))}L.SPc=k;L.dQc=l;L.eQc=[t(b.t),r(b.t)];L.width=d;return L}};_geo.c.ja(b,"geotoolkit.gridding.KrigingInterpolator");_geo.c.na(b,_geo.c.aO.Kva);b.Oma={zhc:"gaussian",swa:"exponential",Skc:"spherical"};b.prototype.g3=function(a,b,d){if(!(a instanceof Array&&b instanceof Array&&d instanceof Array)||a.length!==b.length||a.length!==d.length||0===a.length)return _geo.c.f.Promise.reject("train needs arrays with same not null length");var e=this;return new _geo.c.f.Promise(function(f){e.mnb=
v.g3(d,a,b,e.Zc,e.mpc,e.cmc);f()})};b.prototype.Qg=function(a,b){if(!(a instanceof Array&&b instanceof Array)||a.length!==b.length||0===a.length)return _geo.c.f.Promise.reject("train needs arrays with same length");if(null==this.mnb)return _geo.c.f.Promise.reject("interpolator should be trained firstly");var d=this;return new _geo.c.f.Promise(function(e){for(var f=a.length,g=Array(f),h=0;h<f;h++)g[h]=v.uO(a[h],b[h],d.mnb);e(g)})};return b}();
_geo.c.aO.fMb=function(){function b(b,d){var f=a(b,d);return 0===f?0:Math.pow(f,2)*Math.log(f)}function a(a,b){var f=0;if(!a.length)return Math.sqrt(Math.pow(a-b,2));for(var g=0;g<a.length;g++)f+=Math.pow(a[g]-b[g],2);return Math.sqrt(f)}function g(a){_geo.c.aO.Kva.call(this,a);this.S_=null;this.MAa=[]}_geo.c.ja(g,"geotoolkit.gridding.ThinPlateInterpolator");_geo.c.na(g,_geo.c.aO.Kva);g.prototype.g3=function(a,d,f){this.S_=a.map(function(a,b){return[a,d[b]]});a=this.S_.length;f=f.slice();var g=[],
l,k=[],m,q,p;for(q=0;q<a;q++){m=new window.Float32Array(this.S_[q].length+1);m[0]=1;for(l=0;l<this.S_[q].length;l++)m[l+1]=this.S_[q][l];l=new window.Float32Array(a+m.length);for(p=0;p<a;p++)l[p]=b(this.S_[q],this.S_[p]);for(p=a;p<a+m.length;p++)l[p]=m[p-a];k.push(m);g.push(l)}a=(new _geo.c.f.Rfb(k)).kHc();a=a.elements.map(function(a){var b=new window.Float32Array(g[0].length);b.set(a);for(a=a.length;a<g[0].length;a++)b[a]=0;return b});for(q=0;q<a.length;q++)g.push(a[q]),f.push(0);return(this.MAa=
this.GGc(f,g))?_geo.c.f.Promise.resolve(this.MAa):_geo.c.f.Promise.reject(Error("Failed to compile with given centers. Centers must be unique"))};g.prototype.GGc=function(a,b){var f=new _geo.c.f.Rfb(b),g=new _geo.c.f.Rfb(a);return(f=f.inverse())?f.multiply(g):null};g.prototype.Da=function(a){var d=0,f;for(f=0;f<this.S_.length;f++)d+=Number(this.MAa.elements[f])*b(a,this.S_[f]);d+=Number(this.MAa.elements[this.S_.length]);for(f=0;f<a.length;f++)d+=a[f]*Number(this.MAa.elements[this.S_.length+(f+1)]);
return d};g.prototype.Qg=function(a,b){var f=a.map(function(a,e){return this.Da([a,b[e]])},this);return _geo.c.f.Promise.resolve(f)};return g}();
(function(){var b="geotoolkit",a=_geo.c.hx,g=_geo.c.gx,e=null,d=null;a(b+".gridding.AbstractInterpolator",(d=_geo.c.aO).Kva);g(e=_geo.c.aO.Kva.prototype,"prepare",e.lka,{lka:0});g(e,"train",e.g3,{g3:0});g(e,"getValues",e.Qg,{Qg:0});a(b+".gridding.KrigingInterpolator",d.LXa);a(b+".gridding.KrigingInterpolator.Model",_geo.c.aO.LXa.Oma);a(b+".gridding.KrigingInterpolator.Model.Gaussian",(d=_geo.c.aO.LXa.Oma).zhc);a(b+".gridding.KrigingInterpolator.Model.Exponential",d.swa);a(b+".gridding.KrigingInterpolator.Model.Spherical",
d.Skc);g(e=_geo.c.aO.LXa.prototype,"train",e.g3,{g3:0});g(e,"getValues",e.Qg,{Qg:0});a(b+".gridding.ThinPlateInterpolator",_geo.c.aO.fMb);g(e=_geo.c.aO.fMb.prototype,"train",e.g3,{g3:0});g(e,"getValues",e.Qg,{Qg:0})})();

    return _geo;
}));
/* eslint-enable */
/* tslint:enable */