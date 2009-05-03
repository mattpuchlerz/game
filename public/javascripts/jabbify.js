(function(){
if(typeof include!="undefined"&&typeof include.end!="undefined"){
return include.end();
}else{
if(typeof include!="undefined"&&typeof include.end=="undefined"){
throw ("Include is defined as function or an element's id!");
}
}
MVC=typeof MVC=="undefined"?{}:MVC;
MVC.Object={extend:function(d,s){
for(var p in s){
d[p]=s[p];
}
return d;
}};
MVC.Object.extend(MVC,{Test:{},_no_conflict:false,no_conflict:function(){
MVC._no_conflict=true;
},runner:function(f){
if(!MVC.Browser.Rhino){
f();
}
},Ajax:{},IO:{},_env:"development",env:function(_5){
MVC._env=_5||MVC._env;
return MVC._env;
},Browser:{IE:!!(window.attachEvent&&!window.opera),Opera:!!window.opera,WebKit:navigator.userAgent.indexOf("AppleWebKit/")>-1,Gecko:navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")==-1,MobileSafari:!!navigator.userAgent.match(/Apple.*Mobile.*Safari/),Rhino:!!window._rhino},mvc_root:null,include_path:null,root:null,page_dir:null,Object:{extend:function(d,s){
for(var p in s){
d[p]=s[p];
}
return d;
}},$E:function(id){
return typeof id=="string"?document.getElementById(id):id;
},app_name:"app",get_random:function(_a){
var _b="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
var _c="";
for(var i=0;i<_a;i++){
var _e=Math.floor(Math.random()*_b.length);
_c+=_b.substring(_e,_e+1);
}
return _c;
},K:function(){
}});
MVC.random=MVC.get_random(6);
MVC.Ajax.factory=function(){
return window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
};
MVC.File=function(_f){
this.path=_f;
};
var _10=MVC.File;
MVC.File.prototype={clean:function(){
return this.path.match(/([^\?#]*)/)[1];
},dir:function(){
var _11=this.clean().lastIndexOf("/");
return _11!=-1?this.clean().substring(0,_11):"";
},domain:function(){
if(this.path.indexOf("file:")==0){
return null;
}
var _12=this.path.match(/^(?:https?:\/\/)([^\/]*)/);
return _12?_12[1]:null;
},join:function(url){
return new _10(url).join_from(this.path);
},join_from:function(url,_15){
if(this.is_domain_absolute()){
var u=new _10(url);
if(this.domain()&&this.domain()==u.domain()){
return this.after_domain();
}else{
if(this.domain()==u.domain()){
return this.to_reference_from_same_domain(url);
}else{
return this.path;
}
}
}else{
if(url==MVC.page_dir&&!_15){
return this.path;
}else{
if(url==""){
return this.path.replace(/\/$/,"");
}
var _17=url.split("/"),_18=this.path.split("/"),_19=_18[0];
if(url.match(/\/$/)){
_17.pop();
}
while(_19==".."&&_18.length>0){
_18.shift();
_17.pop();
_19=_18[0];
}
return _17.concat(_18).join("/");
}
}
},join_current:function(){
return this.join_from(include.get_path());
},relative:function(){
return this.path.match(/^(https?:|file:|\/)/)==null;
},after_domain:function(){
return this.path.match(/(?:https?:\/\/[^\/]*)(.*)/)[1];
},to_reference_from_same_domain:function(url){
var _1b=this.path.split("/"),_1c=url.split("/"),_1d="";
while(_1b.length>0&&_1c.length>0&&_1b[0]==_1c[0]){
_1b.shift();
_1c.shift();
}
for(var i=0;i<_1c.length;i++){
_1d+="../";
}
return _1d+_1b.join("/");
},is_cross_domain:function(){
if(this.is_local_absolute()){
return false;
}
return this.domain()!=new _10(location.href).domain();
},is_local_absolute:function(){
return this.path.indexOf("/")===0;
},is_domain_absolute:function(){
return this.path.match(/^(https?:|file:)/)!=null;
},normalize:function(){
var _1f=include.get_path();
var _20=this.path;
if(new _10(include.get_absolute_path()).is_cross_domain()&&!this.is_domain_absolute()){
if(this.is_local_absolute()){
var _21=_1f.split("/").slice(0,3).join("/");
_20=_21+_20;
}else{
_20=this.join_from(_1f);
}
}else{
if(_1f!=""&&this.relative()){
_20=this.join_from(_1f+(_1f.lastIndexOf("/")===_1f.length-1?"":"/"));
}
}
return _20;
}};
MVC.page_dir=new _10(window.location.href).dir();
var _22=document.getElementsByTagName("script");
for(var i=0;i<_22.length;i++){
var src=_22[i].src;
if(src.match(/include\.js/)){
MVC.include_path=src;
MVC.mvc_root=new _10(new _10(src).join_from(MVC.page_dir)).dir();
var loc=MVC.mvc_root.match(/\.\.$/)?MVC.mvc_root+"/..":MVC.mvc_root.replace(/jmvc$/,"");
if(loc.match(/.+\/$/)){
loc=loc.replace(/\/$/,"");
}
MVC.root=new _10(loc);
if(src.indexOf("?")!=-1){
MVC.script_options=src.split("?")[1].split(",");
}
}
}
MVC.Options={load_production:true,env:"development",production:"/javascripts/production.js",encoding:"utf-8",cache_include:true};
var _26=true,_27=false,_28=[],cwd="",_2a=[],_2b=[],_2c=[];
include=function(){
if(include.get_env().match(/development|compress|test/)){
for(var i=0;i<arguments.length;i++){
include.add(include.add_defaults(arguments[i]));
}
}else{
if(!_27){
return;
}
for(var i=0;i<arguments.length;i++){
include.add(include.add_defaults(arguments[i]));
}
return;
}
if(_26&&!MVC.Browser.Opera){
_26=false;
_2e();
}
};
MVC.Object.extend(include,{add_defaults:function(inc){
if(typeof inc=="string"){
inc={path:inc.indexOf(".js")==-1?inc+".js":inc};
}
if(typeof inc!="function"){
inc.original_path=inc.path;
inc=MVC.Object.extend({},inc);
}
return inc;
},setup:function(o){
MVC.Object.extend(MVC.Options,o||{});
MVC.Options.production=MVC.Options.production+(MVC.Options.production.indexOf(".js")==-1?".js":"");
if(MVC.Options.env=="test"){
include.plugins("test");
}
if(MVC.Options.env=="production"&&!MVC.Browser.Opera&&MVC.Options.load_production){
return document.write("<script type=\"text/javascript\" src=\""+include.get_production_name()+"\"></script>");
}
},get_env:function(){
return MVC.Options.env;
},get_production_name:function(){
return MVC.Options.production;
},set_path:function(p){
cwd=p;
},get_path:function(){
return cwd;
},get_absolute_path:function(){
var fwd=new _10(cwd);
return fwd.relative()?fwd.join_from(MVC.root.path,true):cwd;
},add:function(_33){
if(typeof _33=="function"){
var _34=include.get_path();
var _35=function(){
include.set_path(_34);
_33();
};
include.functions.push(_35);
_2b.unshift(_35);
return;
}
if(_27){
return include.insert_head(_33.path);
}
var pf=new _10(_33.path);
_33.path=pf.normalize();
_33.absolute=pf.relative()?pf.join_from(include.get_absolute_path(),true):_33.path;
_33.start=new MVC.File(_33.path).dir();
if(include.should_add(_33.absolute)){
for(var i=0;i<_2a.length;i++){
if(_2a[i].absolute==_33.absolute){
_2a.splice(i,1);
break;
}
}
_2b.unshift(_33);
}else{
}
},should_add:function(_38){
for(var i=0;i<_2c.length;i++){
if(_2c[i].absolute==_38){
return false;
}
}
for(var i=0;i<_2b.length;i++){
if(_2b[i].absolute==_38){
return false;
}
}
return true;
},force:function(){
for(var i=0;i<arguments.length;i++){
include.insert_head(MVC.root.join(arguments[i]));
}
},close_time:function(){
setTimeout(function(){
document.close();
},10);
},close:function(){
if(include.get_env()=="production"){
include.close_time();
}else{
include._close=true;
}
},end:function(src){
_2a=_2a.concat(_2b);
var _3c=_2a.pop();
if(!_3c){
_27=true;
if(include.get_env()=="compress"){
setTimeout(include.compress,10);
}
if(typeof MVCOptions!="undefined"&&MVCOptions.done_loading){
MVCOptions.done_loading();
}
if(include._close){
this.close_time();
}
return;
}
_2c.push(_3c);
_2b=[];
if(typeof _3c=="function"){
_3c();
_2e();
}else{
include.set_path(_3c.start);
include.current=_3c.path;
if(include.get_env()=="compress"){
var _3d=_3c.path.split("/");
if(_3d.length>4){
_3d=_3d.slice(_3d.length-4);
}
print("   "+_3d.join("/"));
_3c.text=include.request(MVC.root.join(_3c.path));
}
_3c.ignore?_2e():_2e(_3c.path);
}
},end_of_production:function(){
_27=true;
},compress:function(){
MVCOptions.compress_callback(_2c);
},opera:function(){
include.opera_called=true;
if(MVC.Browser.Opera){
MVC.Options.env=="production"?document.write("<script type=\"text/javascript\" src=\""+include.get_production_name()+"\"></script>"):include.end();
}
},opera_called:false,plugin:function(_3e){
var _3f=include.get_path();
include.set_path("");
include("jmvc/plugins/"+_3e+"/setup");
include.set_path(_3f);
},engine:function(_40){
var _41=include.get_path();
include.set_path("");
include("engines/"+_40+"/apps/"+_40+".js");
include.set_path(_41);
},plugins:function(){
for(var i=0;i<arguments.length;i++){
include.plugin(arguments[i]);
}
},engines:function(){
for(var i=0;i<arguments.length;i++){
include.engine(arguments[i]);
}
},app:function(f){
return function(){
for(var i=0;i<arguments.length;i++){
arguments[i]=f(arguments[i]);
}
include.apply(null,arguments);
};
},functions:[],next_function:function(){
var _46=include.functions.pop();
if(_46){
_46();
}
},css:function(){
var arg;
for(var i=0;i<arguments.length;i++){
arg=arguments[i];
var _49=new MVC.File("../stylesheets/"+arg+".css").join_current();
include.create_link(MVC.root.join(_49));
}
},create_link:function(_4a){
var _4b=document.createElement("link");
_4b.rel="stylesheet";
_4b.href=_4a;
_4b.type="text/css";
_4c().appendChild(_4b);
},check_exists:function(_4d){
var xhr=MVC.Ajax.factory();
try{
xhr.open("HEAD",_4d,false);
xhr.send(null);
}
catch(e){
return false;
}
if(xhr.status>505||xhr.status==404||xhr.status==2||xhr.status==3||(xhr.status==0&&xhr.responseText=="")){
return false;
}
return true;
},request:function(_4f,_50){
var _51=_50||"application/x-www-form-urlencoded; charset="+MVC.Options.encoding;
var _52=MVC.Ajax.factory();
_52.open("GET",_4f,false);
_52.setRequestHeader("Content-type",_51);
if(_52.overrideMimeType){
_52.overrideMimeType(_51);
}
try{
_52.send(null);
}
catch(e){
return null;
}
if(_52.status==500||_52.status==404||_52.status==2||(_52.status==0&&_52.responseText=="")){
return null;
}
return _52.responseText;
},insert_head:function(src,_54){
_54=_54||"UTF-8";
var _55=_56();
_55.src=src;
_55.charset=_54;
_4c().appendChild(_55);
},write:function(src,_58){
_58=_58||"UTF-8";
document.write("<script type=\"text/javascript\" src=\""+src+"\" encode=\"+encode+\"></script>");
}});
include.controllers=include.app(function(i){
return "../controllers/"+i+"_controller";
});
include.models=include.app(function(i){
return "../models/"+i;
});
include.resources=include.app(function(i){
return "../resources/"+i;
});
var _56=function(){
var _5c=document.createElement("script");
_5c.type="text/javascript";
return _5c;
};
var _2e=function(src){
if(src){
var _5e=new MVC.File(src);
if(!_5e.is_local_absolute()&&!_5e.is_domain_absolute()){
src=MVC.root.join(src);
}
}
if(!document.write){
if(src){
load(new MVC.File(src).clean());
}
load(new MVC.File(MVC.include_path).clean());
}else{
if(MVC.Browser.Opera||MVC.Browser.Webkit){
if(src){
var _5f=_56();
_5f.src=src+"?"+MVC.random;
document.body.appendChild(_5f);
}
var _60=_56();
_60.src=MVC.include_path+"?"+MVC.random;
document.body.appendChild(_60);
}else{
document.write((src?"<script type=\"text/javascript\" src=\""+src+(MVC.Options.cache_include?"":"?"+MVC.random)+"\"></script>":"")+_61());
}
}
};
var _61=function(src){
return MVC.Browser.Gecko?"<script type=\"text/javascript\">include.end()</script>":"<script type=\"text/javascript\" src=\""+MVC.mvc_root+"/end.js\"></script>";
};
var _4c=function(){
var d=document,de=d.documentElement;
var _65=d.getElementsByTagName("head");
if(_65.length>0){
return _65[0];
}
var _66=d.createElement("head");
de.insertBefore(_66,de.firstChild);
return _66;
};
if(MVC.script_options){
_26=false;
MVC.apps_root=MVC.root.join("apps");
MVC.app_name=MVC.script_options[0];
if(MVC.Browser.Rhino){
MVC.script_options[1]=MVCOptions.env;
}
var _67=window.location.hash.match(/&jmvc\[env\]=(\w+)/);
if(_67){
MVC.script_options[1]=_67[1];
}
if(MVC.script_options.length>1){
if(!MVC.script_options[1].match(/^(?:production|development|test|compress)$/)){
throw "env should be one of: production,development,test,compress";
}
include.setup({env:MVC.script_options[1],production:MVC.apps_root+"/"+MVC.script_options[0]+"/production"});
}
include("apps/"+MVC.app_name);
if(MVC.script_options[1]=="test"){
include.plugins("lang","dom/query");
var _68=function(){
include("apps/"+MVC.app_name+"/test");
};
if(navigator.userAgent.match(/Firefox\/3/)){
_68();
}else{
if(include.check_exists(MVC.apps_root+"/"+MVC.app_name+"/test.js")){
_68();
}else{
setTimeout(function(){
MVC.Console.log("There is no application test file at:\n    \"apps/"+MVC.app_name+"/test.js\"\nUse it to include your test files.\n\nTest includes:\n    include.unit_tests('product')\n    include.functional_tests('widget')");
},1000);
}
}
}
if(!MVC.Browser.Opera){
_2e();
}
include.opera();
}
if(MVC.Browser.Opera){
setTimeout(function(){
if(!include.opera_called&&MVC.Options.load_production){
alert("You forgot include.opera().");
}
},10000);
}
})();
include.setup({env:"production",load_production:false});
MVC.root=new MVC.File("/");
include.set_path("apps");
include.engines("jabbify_core");
include.set_path("engines/jabbify_core/apps");
include.plugins("controller/comet","lang/openajax","io/jsonp","lang/json");
include(function(){
MVC.no_conflict();
include.models("core","environment");
});
include.plugins("io/xdoc");
include(function(){
include.controllers("jabbify_comet");
});
include.set_path("jmvc/plugins/controller/comet");
include.plugins("io/comet","controller");
include("comet_controller");
include.set_path("jmvc/plugins/io/comet");
include.plugins("dom/event");
include("comet");
if(MVC.Console){
include("debug");
}
include.set_path("jmvc/plugins/dom/event");
if(typeof Prototype=="undefined"){
include("standard");
}else{
include("prototype_event");
}
include.set_path("jmvc/plugins/dom/event");
if(document.addEventListener){
MVC.Event={observe:function(el,_6a,_6b,_6c){
if(_6c==null){
_6c=false;
}
el.addEventListener(_6a,_6b,_6c);
},stop_observing:function(el,_6e,_6f,_70){
if(_70==null){
_70=false;
}
el.removeEventListener(_6e,_6f,false);
}};
}else{
if(document.attachEvent){
MVC.Event={observe:function(_71,_72,_73){
if(MVC.Event._find(_71,_72,_73)!=-1){
return;
}
var _74=function(e){
if(!e){
e=window.event;
}
var _76={_event:e,type:e.type,target:_72=="mouseover"?e.toElement:(_72=="mouseout"?e.fromElement:(e.srcElement||document)),currentTarget:_71,relatedTarget:_72=="mouseover"?e.fromElement:e.toElement,eventPhase:(e.srcElement==_71)?2:3,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY,altKey:e.altKey,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,charCode:e.keyCode,stopPropagation:function(){
this._event.cancelBubble=true;
},preventDefault:function(){
this._event.returnValue=false;
},which:e.which||(e.button&1?1:(e.button&2?3:(e.button&4?2:0)))};
if(Function.prototype.call){
_73.call(_71,_76);
}else{
_71._currentHandler=_73;
_71._currentHandler(_76);
_71._currentHandler=null;
}
};
_71.attachEvent("on"+_72,_74);
var h={element:_71,eventType:_72,handler:_73,wrappedHandler:_74};
var d=_71.document||_71,w=d.parentWindow,id=MVC.Event._uid();
if(!w._allHandlers){
w._allHandlers={};
}
w._allHandlers[id]=h;
if(!_71._handlers){
_71._handlers=[];
}
_71._handlers.push(id);
if(!w._onunloadHandlerRegistered){
w._onunloadHandlerRegistered=true;
w.attachEvent("onunload",MVC.Event._removeAllHandlers);
}
},stop_observing:function(_7b,_7c,_7d){
var i=MVC.Event._find(_7b,_7c,_7d);
if(i==-1){
return;
}
var d=_7b.document||_7b,w=d.parentWindow,_81=_7b._handlers[i],h=w._allHandlers[_81];
_7b.detachEvent("on"+_7c,h.wrappedHandler);
_7b._handlers.splice(i,1);
delete w._allHandlers[_81];
},_find:function(_83,_84,_85){
var _86=_83._handlers;
if(!_86){
return -1;
}
var d=_83.document||_83,w=d.parentWindow;
for(var i=_86.length-1;i>=0;i--){
var h=w._allHandlers[_86[i]];
if(h.eventType==_84&&h.handler==_85){
return i;
}
}
return -1;
},_removeAllHandlers:function(){
var w=this;
for(var id in w._allHandlers){
if(!w._allHandlers.hasOwnProperty(id)){
continue;
}
var h=w._allHandlers[id];
if(h.element){
h.element.detachEvent("on"+h.eventType,h.wrappedHandler);
}
delete w._allHandlers[id];
}
},_counter:0,_uid:function(){
return "h"+MVC.Event._counter++;
}};
}
}
if(!MVC._no_conflict&&typeof Event=="undefined"){
Event=MVC.Event;
}
include.set_path("jmvc/plugins/io/comet");
MVC.Comet=function(url,_8f){
this.url=url;
this.options=_8f||{};
this.options.wait_time=this.options.wait_time||0;
this.onSuccess=_8f.onSuccess;
this.onComplete=_8f.onComplete;
this.onFailure=_8f.onFailure;
delete this.options.onSuccess;
delete this.options.onComplete;
this.options.onComplete=MVC.Function.bind(this.callback,this);
var _90=false;
var _91=true;
this.kill=function(){
_90=true;
};
this.poll_now=MVC.Function.bind(function(){
if(this.is_polling()){
return;
}
clearTimeout(this.timeout);
this.options.polling();
MVC.Comet.connection=new this.transport(this.url,this.options);
},this);
this.options.is_killed=function(){
return _90;
};
this.options.waiting_to_poll=function(){
_91=false;
};
this.options.polling=function(){
_91=true;
};
this.is_polling=function(){
return _91;
};
this.transport=this.options.transport||MVC.Comet.transport;
MVC.Comet.connection=new this.transport(url,this.options);
};
MVC.Comet.transport=MVC.Ajax;
MVC.Comet.prototype={callback:function(_92){
this.options.waiting_to_poll();
if(this.options.is_killed()){
return;
}
if(this.onSuccess&&_92.responseText!=""&&this.onSuccess(_92)==false){
return false;
}
if(this.onComplete){
if(this.onComplete(_92)==false){
return false;
}
}
var url=this.url;
var _94=this.options;
var _92=this.transport;
var _95=typeof _94.wait_time=="function"?_94.wait_time():_94.wait_time;
this.timeout=setTimeout(MVC.Function.bind(function(){
_94.polling();
MVC.Comet.connection=new _92(url,_94);
},this),_95);
}};
MVC.Event.observe(window,"unload",function(){
MVC.Comet.send=false;
if(MVC.Comet.connection&&MVC.Comet.connection.transport&&MVC.Comet.transport.className&&MVC.Comet.transport.className=="Ajax"){
MVC.Comet.connection.transport.abort();
}
});
MVC.IO.Comet=MVC.Comet;
if(!MVC._no_conflict&&typeof Comet=="undefined"){
Comet=MVC.Comet;
}
include.set_path("jmvc/plugins/controller");
include.plugins("lang","lang/inflector","dom/event","lang/class","lang/openajax","dom/data");
include("delegator","controller");
if(MVC.View){
include.plugins("controller/view");
}
include.set_path("jmvc/plugins/lang");
include("standard_helpers");
include.set_path("jmvc/plugins/lang");
MVC.String={};
MVC.String.strip=function(_96){
return _96.replace(/^\s+/,"").replace(/\s+$/,"");
};
MVC.Function={};
MVC.Function.params=function(_97){
var ps=_97.toString().match(/^[\s\(]*function[^(]*\((.*?)\)/)[1].split(",");
if(ps.length==1&&!ps[0]){
return [];
}
for(var i=0;i<ps.length;i++){
ps[i]=MVC.String.strip(ps[i]);
}
return ps;
};
MVC.Native={};
MVC.Native.extend=function(_9a,_9b){
if(!MVC[_9a]){
MVC[_9a]={};
}
var _9c=MVC[_9a];
for(var _9d in _9b){
_9c[_9d]=_9b[_9d];
if(!MVC._no_conflict){
window[_9a][_9d]=_9b[_9d];
if(typeof _9b[_9d]=="function"){
var _9e=MVC.Function.params(_9b[_9d]);
if(_9e.length==0){
continue;
}
MVC.Native.set_prototype(_9a,_9d,_9b[_9d]);
}
}
}
};
MVC.Native.set_prototype=function(_9f,_a0,_a1){
if(!_a1){
_a1=MVC[_9f][_a0];
}
window[_9f].prototype[_a0]=function(){
var _a2=[this];
for(var i=0,_a4=arguments.length;i<_a4;i++){
_a2.push(arguments[i]);
}
return _a1.apply(this,_a2);
};
};
MVC.Native.Object={};
MVC.Native.Object.extend=function(_a5,_a6){
for(var _a7 in _a6){
_a5[_a7]=_a6[_a7];
}
return _a5;
};
MVC.Native.Object.to_query_string=function(_a8,_a9){
if(typeof _a8!="object"){
return _a8;
}
return MVC.Native.Object.to_query_string.worker(_a8,_a9).join("&");
};
MVC.Native.Object.to_query_string.worker=function(obj,_ab){
var _ac=[],_ad;
for(var _ae in obj){
if(obj.hasOwnProperty(_ae)&&((_ad=obj[_ae])!=null)){
if(_ad&&_ad.constructor===Date){
_ad=_ad.getUTCFullYear()+"-"+MVC.Number.to_padded_string(_ad.getUTCMonth()+1,2)+"-"+MVC.Number.to_padded_string(_ad.getUTCDate(),2)+" "+MVC.Number.to_padded_string(_ad.getUTCHours(),2)+":"+MVC.Number.to_padded_string(_ad.getUTCMinutes(),2)+":"+MVC.Number.to_padded_string(_ad.getUTCSeconds(),2);
}
if(_ad instanceof Array&&_ad.length){
var _af=encodeURIComponent(_ab?_ab+"["+_ae+"]":_ae);
for(var i=0;i<_ad.length;i++){
var _b1=encodeURIComponent(_ad[i].toString());
_ac.push(_af+"="+_b1);
}
}else{
if(typeof _ad!="object"){
var _b1=encodeURIComponent(_ad.toString());
var _af=encodeURIComponent(_ab?_ab+"["+_ae+"]":_ae);
_ac.push(_af+"="+_b1);
}else{
_ac=_ac.concat(MVC.Native.Object.to_query_string.worker(_ad,_ab?_ab+"["+_ae+"]":_ae));
}
}
}
}
return _ac;
};
MVC.Native.extend("String",{capitalize:function(s){
return s.charAt(0).toUpperCase()+s.substr(1).toLowerCase();
},include:function(s,_b4){
return s.indexOf(_b4)>-1;
},ends_with:function(s,_b6){
var d=s.length-_b6.length;
return d>=0&&s.lastIndexOf(_b6)===d;
},camelize:function(s){
var _b9=s.split(/_|-/);
for(var i=1;i<_b9.length;i++){
_b9[i]=MVC.String.capitalize(_b9[i]);
}
return _b9.join("");
},classize:function(s){
var _bc=s.split(/_|-/);
for(var i=0;i<_bc.length;i++){
_bc[i]=MVC.String.capitalize(_bc[i]);
}
return _bc.join("");
},strip:MVC.String.strip});
MVC.Native.extend("Array",{include:function(a,_bf){
for(var i=0;i<a.length;i++){
if(a[i]==_bf){
return true;
}
}
return false;
}});
MVC.Array.from=function(_c1){
if(!_c1){
return [];
}
var _c2=[];
for(var i=0,_c4=_c1.length;i<_c4;i++){
_c2.push(_c1[i]);
}
return _c2;
};
MVC.Array.is=function(_c5){
return Object.prototype.toString.call(a)==="[object Array]";
};
MVC.Native.extend("Function",{bind:function(f,obj){
var _c8=MVC.Array.from(arguments);
_c8.shift();
_c8.shift();
var _c9=f,_ca=arguments[1];
return function(){
return _c9.apply(_ca,_c8.concat(MVC.Array.from(arguments)));
};
},params:MVC.Function.params});
MVC.Native.extend("Number",{to_padded_string:function(n,len,_cd){
var _ce=n.toString(_cd||10);
var ret="",_d0=len-_ce.length;
for(var i=0;i<_d0;i++){
ret+="0";
}
return ret+_ce;
}});
MVC.Native.Array=MVC.Array;
MVC.Native.Function=MVC.Function;
MVC.Native.Number=MVC.Number;
MVC.Native.String=MVC.String;
MVC.Object=MVC.Native.Object;
if(!MVC._no_conflict){
Array.from=MVC.Array.from;
}
include.set_path("jmvc/plugins/lang/inflector");
include.plugins("lang");
include("inflector");
include.set_path("jmvc/plugins/lang/inflector");
MVC.Inflector={Inflections:{plural:[[/(quiz)$/i,"$1zes"],[/^(ox)$/i,"$1en"],[/([m|l])ouse$/i,"$1ice"],[/(matr|vert|ind)ix|ex$/i,"$1ices"],[/(x|ch|ss|sh)$/i,"$1es"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/(hive)$/i,"$1s"],[/(?:([^f])fe|([lr])f)$/i,"$1$2ves"],[/sis$/i,"ses"],[/([ti])um$/i,"$1a"],[/(buffal|tomat)o$/i,"$1oes"],[/(bu)s$/i,"$1ses"],[/(alias|status)$/i,"$1es"],[/(octop|vir)us$/i,"$1i"],[/(ax|test)is$/i,"$1es"],[/s$/i,"s"],[/$/,"s"]],singular:[[/(quiz)zes$/i,"$1"],[/(matr)ices$/i,"$1ix"],[/(vert|ind)ices$/i,"$1ex"],[/^(ox)en/i,"$1"],[/(alias|status)es$/i,"$1"],[/(octop|vir)i$/i,"$1us"],[/(cris|ax|test)es$/i,"$1is"],[/(shoe)s$/i,"$1"],[/(o)es$/i,"$1"],[/(bus)es$/i,"$1"],[/([m|l])ice$/i,"$1ouse"],[/(x|ch|ss|sh)es$/i,"$1"],[/(m)ovies$/i,"$1ovie"],[/(s)eries$/i,"$1eries"],[/([^aeiouy]|qu)ies$/i,"$1y"],[/([lr])ves$/i,"$1f"],[/(tive)s$/i,"$1"],[/(hive)s$/i,"$1"],[/([^f])ves$/i,"$1fe"],[/(^analy)ses$/i,"$1sis"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i,"$1$2sis"],[/([ti])a$/i,"$1um"],[/(n)ews$/i,"$1ews"],[/s$/i,""]],irregular:[["move","moves"],["sex","sexes"],["child","children"],["man","men"],["foreman","foremen"],["person","people"]],uncountable:["sheep","fish","series","species","money","rice","information","equipment"]},pluralize:function(_d2){
for(var i=0;i<MVC.Inflector.Inflections.uncountable.length;i++){
var _d4=MVC.Inflector.Inflections.uncountable[i];
if(_d2.toLowerCase()==_d4){
return _d4;
}
}
for(var i=0;i<MVC.Inflector.Inflections.irregular.length;i++){
var _d5=MVC.Inflector.Inflections.irregular[i][0];
var _d6=MVC.Inflector.Inflections.irregular[i][1];
if((_d2.toLowerCase()==_d5)||(_d2==_d6)){
return _d2.substring(0,1)+_d6.substring(1);
}
}
for(var i=0;i<MVC.Inflector.Inflections.plural.length;i++){
var _d7=MVC.Inflector.Inflections.plural[i][0];
var _d8=MVC.Inflector.Inflections.plural[i][1];
if(_d7.test(_d2)){
return _d2.replace(_d7,_d8);
}
}
},singularize:function(_d9){
for(var i=0;i<MVC.Inflector.Inflections.uncountable.length;i++){
var _db=MVC.Inflector.Inflections.uncountable[i];
if(_d9.toLowerCase()==_db){
return _db;
}
}
for(var i=0;i<MVC.Inflector.Inflections.irregular.length;i++){
var _dc=MVC.Inflector.Inflections.irregular[i][0];
var _dd=MVC.Inflector.Inflections.irregular[i][1];
if((_d9.toLowerCase()==_dc)||(_d9.toLowerCase()==_dd)){
return _d9.substring(0,1)+_dc.substring(1);
}
}
for(var i=0;i<MVC.Inflector.Inflections.singular.length;i++){
var _de=MVC.Inflector.Inflections.singular[i][0];
var _df=MVC.Inflector.Inflections.singular[i][1];
if(_de.test(_d9)){
return _d9.replace(_de,_df);
}
}
}};
MVC.Native.extend("String",{pluralize:function(_e0,_e1,_e2){
if(typeof _e1=="undefined"){
return MVC.Inflector.pluralize(_e0);
}else{
return _e1+" "+(1==parseInt(_e1)?_e0:_e2||MVC.Inflector.pluralize(_e0));
}
},singularize:function(_e3,_e4){
if(typeof _e4=="undefined"){
return MVC.Inflector.singularize(_e3);
}else{
return _e4+" "+MVC.Inflector.singularize(_e3);
}
},is_singular:function(_e5){
if(MVC.String.singularize(_e5)==null&&_e5){
return true;
}
return false;
}});
include.set_path("jmvc/plugins/lang/class");
(function(){
var _e6=false,_e7=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
MVC.Class=function(){
};
MVC.Class.extend=function(_e8,_e9,_ea){
if(typeof _e8!="string"){
_ea=_e9;
_e9=_e8;
_e8=null;
}
if(!_ea){
_ea=_e9;
_e9=null;
}
_ea=_ea||{};
var _eb=this;
var _ec=this.prototype;
_e6=true;
var _ed=new this();
_e6=false;
for(var _ee in _ea){
_ed[_ee]=typeof _ea[_ee]=="function"&&typeof _ec[_ee]=="function"&&_e7.test(_ea[_ee])?(function(_ef,fn){
return function(){
var tmp=this._super;
this._super=_ec[_ef];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(_ee,_ea[_ee]):_ea[_ee];
}
function _f3(){
if(!_e6&&this.init){
this.init.apply(this,arguments);
}
};
_f3.prototype=_ed;
_f3.prototype.Class=_f3;
_f3.constructor=_f3;
for(var _ee in this){
if(this.hasOwnProperty(_ee)&&_ee!="prototype"){
_f3[_ee]=this[_ee];
}
}
for(var _ee in _e9){
_f3[_ee]=typeof _e9[_ee]=="function"&&typeof _f3[_ee]=="function"&&_e7.test(_e9[_ee])?(function(_f4,fn){
return function(){
var tmp=this._super;
this._super=_eb[_f4];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(_ee,_e9[_ee]):_e9[_ee];
}
_f3.extend=arguments.callee;
if(_e8){
_f3.className=_e8;
}
if(_f3.init){
_f3.init(_f3);
}
if(_eb.extended){
_eb.extended(_f3);
}
return _f3;
};
})();
if(!MVC._no_conflict&&typeof Class=="undefined"){
Class=MVC.Class;
}
include.set_path("jmvc/plugins/lang/openajax");
if(!window["OpenAjax"]){
OpenAjax=new function(){
var t=true;
var f=false;
var g=window;
var ooh="org.openajax.hub.";
var h={};
this.hub=h;
h.implementer="http://openajax.org";
h.implVersion="1.0";
h.specVersion="1.0";
h.implExtraData={};
var _fd={};
h.libraries=_fd;
h.registerLibrary=function(_fe,_ff,_100,_101){
_fd[_fe]={prefix:_fe,namespaceURI:_ff,version:_100,extraData:_101};
this.publish(ooh+"registerLibrary",_fd[_fe]);
};
h.unregisterLibrary=function(_102){
this.publish(ooh+"unregisterLibrary",_fd[_102]);
delete _fd[_102];
};
h._subscriptions={c:{},s:[]};
h._cleanup=[];
h._subIndex=0;
h._pubDepth=0;
h.subscribe=function(name,_104,_105,_106,_107){
if(!_105){
_105=window;
}
var _108=name+"."+this._subIndex;
var sub={scope:_105,cb:_104,fcb:_107,data:_106,sid:this._subIndex++,hdl:_108};
var path=name.split(".");
this._subscribe(this._subscriptions,path,0,sub);
return _108;
};
h.publish=function(name,_10c){
var path=name.split(".");
this._pubDepth++;
this._publish(this._subscriptions,path,0,name,_10c);
this._pubDepth--;
if((this._cleanup.length>0)&&(this._pubDepth==0)){
for(var i=0;i<this._cleanup.length;i++){
this.unsubscribe(this._cleanup[i].hdl);
}
delete (this._cleanup);
this._cleanup=[];
}
};
h.unsubscribe=function(sub){
var path=sub.split(".");
var sid=path.pop();
this._unsubscribe(this._subscriptions,path,0,sid);
};
h._subscribe=function(tree,path,_114,sub){
var _116=path[_114];
if(_114==path.length){
tree.s.push(sub);
}else{
if(typeof tree.c=="undefined"){
tree.c={};
}
if(typeof tree.c[_116]=="undefined"){
tree.c[_116]={c:{},s:[]};
this._subscribe(tree.c[_116],path,_114+1,sub);
}else{
this._subscribe(tree.c[_116],path,_114+1,sub);
}
}
};
h._publish=function(tree,path,_119,name,msg,pcb,pcid){
if(typeof tree!="undefined"){
var node;
if(_119==path.length){
node=tree;
}else{
this._publish(tree.c[path[_119]],path,_119+1,name,msg,pcb,pcid);
this._publish(tree.c["*"],path,_119+1,name,msg,pcb,pcid);
node=tree.c["**"];
}
if(typeof node!="undefined"){
var _11f=node.s;
var max=_11f.length;
for(var i=0;i<max;i++){
if(_11f[i].cb){
var sc=_11f[i].scope;
var cb=_11f[i].cb;
var fcb=_11f[i].fcb;
var d=_11f[i].data;
var sid=_11f[i].sid;
var scid=_11f[i].cid;
if(typeof cb=="string"){
cb=sc[cb];
}
if(typeof fcb=="string"){
fcb=sc[fcb];
}
if((!fcb)||(fcb.call(sc,name,msg,d))){
if((!pcb)||(pcb(name,msg,pcid,scid))){
cb.call(sc,name,msg,d,sid);
}
}
}
}
}
}
};
h._unsubscribe=function(tree,path,_12a,sid){
if(typeof tree!="undefined"){
if(_12a<path.length){
var _12c=tree.c[path[_12a]];
this._unsubscribe(_12c,path,_12a+1,sid);
if(_12c.s.length==0){
for(var x in _12c.c){
return;
}
delete tree.c[path[_12a]];
}
return;
}else{
var _12e=tree.s;
var max=_12e.length;
for(var i=0;i<max;i++){
if(sid==_12e[i].sid){
if(this._pubDepth>0){
_12e[i].cb=null;
this._cleanup.push(_12e[i]);
}else{
_12e.splice(i,1);
}
return;
}
}
}
}
};
h.reinit=function(){
for(var lib in OpenAjax.hub.libraries){
delete OpenAjax.hub.libraries[lib];
}
OpenAjax.hub.registerLibrary("OpenAjax","http://openajax.org/hub","1.0",{});
delete OpenAjax._subscriptions;
OpenAjax._subscriptions={c:{},s:[]};
delete OpenAjax._cleanup;
OpenAjax._cleanup=[];
OpenAjax._subIndex=0;
OpenAjax._pubDepth=0;
};
};
OpenAjax.hub.registerLibrary("OpenAjax","http://openajax.org/hub","1.0",{});
}
OpenAjax.hub.registerLibrary("JavaScriptMVC","http://JavaScriptMVC.com","1.5",{});
include.set_path("jmvc/plugins/dom/data");
MVC.Dom={cache:{},expando:"mvc"+(+new Date),uuid:0,window_data:{},data:function(elem,name,data){
elem=elem==window?MVC.Dom.window_data:elem;
var id=elem[MVC.Dom.expando];
if(!id){
id=elem[MVC.Dom.expando]=++MVC.Dom.uuid;
}
if(!MVC.Dom.cache[id]){
MVC.Dom.cache[id]={};
}
if(data!==undefined){
MVC.Dom.cache[id][name]=data;
}
return name?MVC.Dom.cache[id][name]:MVC.Dom.cache[id];
},get_or_set_data:function(elem,name,data){
var got=MVC.Dom.data(elem,name);
return got?got:MVC.Dom.data(elem,name,data);
},remove_data:function(elem,name){
elem=elem==window?MVC.Dom.window_data:elem;
var id=elem[MVC.Dom.expando];
if(name){
if(MVC.Dom.cache[id]){
delete MVC.Dom.cache[id][name];
name="";
for(name in MVC.Dom.cache[id]){
break;
}
if(!name){
MVC.Dom.remove_data(elem);
}
}
}else{
try{
delete elem[MVC.Dom.expando];
}
catch(e){
if(elem.removeAttribute){
elem.removeAttribute(MVC.Dom.expando);
}
}
delete MVC.Dom.cache[id];
}
}};
include.set_path("jmvc/plugins/controller");
MVC.Delegator=function(_13d,_13e,f,_140){
this._event=_13e;
this._selector=_13d;
this._func=f;
this.element=_140||document.documentElement;
MVC.Delegator.jmvc(this.element);
if(_13e=="contextmenu"&&MVC.Browser.Opera){
return this.context_for_opera();
}
if(_13e=="submit"&&MVC.Browser.IE){
return this.submit_for_ie();
}
if(_13e=="change"&&MVC.Browser.IE){
return this.change_for_ie();
}
if(_13e=="change"&&MVC.Browser.WebKit){
return this.change_for_webkit();
}
this.add_to_delegator();
};
MVC.Object.extend(MVC.Delegator,{jmvc:function(_141){
var data=MVC.Dom.data(_141);
if(!data.delegation_events){
data.delegation_events={};
}
if(data.responding==null){
data.responding=true;
}
return data;
},add_kill_event:function(_143){
if(!_143.kill){
if(!_143){
_143=window.event;
}
var _144=false;
_143.kill=function(){
_144=true;
try{
if(_143.stopPropagation){
_143.stopPropagation();
}
if(_143.preventDefault){
_143.preventDefault();
}
}
catch(e){
}
};
_143.is_killed=function(){
return _144;
};
_143.stop_propagation=function(){
_144=true;
try{
if(_143.stopPropagation){
_143.stopPropagation();
}
}
catch(e){
}
};
_143.prevent_default=function(){
try{
if(_143.preventDefault){
_143.preventDefault();
}
}
catch(e){
}
};
}
},sort_by_order:function(a,b){
if(a.order<b.order){
return 1;
}
if(b.order<a.order){
return -1;
}
var ae=a._event,be=b._event;
if(ae=="click"&&be=="change"){
return 1;
}
if(be=="click"&&ae=="change"){
return -1;
}
return 0;
},events:{},onload_called:false});
MVC.Event.observe(window,"load",function(){
MVC.Delegator.onload_called=true;
});
MVC.Delegator.prototype={event:function(){
if(MVC.Browser.IE){
if(this._event=="focus"){
return "activate";
}else{
if(this._event=="blur"){
return "deactivate";
}
}
}
return this._event;
},capture:function(){
return MVC.Array.include(["focus","blur"],this._event);
},add_to_delegator:function(_149,_14a,func){
var s=_149||this._selector;
var e=_14a||this.event();
var f=func||this._func;
var _14f=MVC.Dom.data(this.element,"delegation_events");
if(!_14f[e]||_14f[e].length==0){
var _150=MVC.Function.bind(this.dispatch_event,this);
MVC.Event.observe(this.element,e,_150,this.capture());
_14f[e]=[];
_14f[e]._bind_function=_150;
}
_14f[e].push(this);
},_remove_from_delegator:function(_151){
var _152=_151||this.event();
var _153=MVC.Dom.data(this.element,"delegation_events")[_152];
for(var i=0;i<_153.length;i++){
if(_153[i]==this){
_153.splice(i,1);
break;
}
}
if(_153.length==0){
MVC.Dom.data(this.element,"delegation_events")[_152]=null;
MVC.Event.stop_observing(this.element,_152,_153._bind_function,this.capture());
}
},submit_for_ie:function(){
this.add_to_delegator(null,"click");
this.add_to_delegator(null,"keypress");
this.filters={click:function(el,_156,_157){
if(el.nodeName.toUpperCase()=="INPUT"&&el.type.toLowerCase()=="submit"){
for(var e=0;e<_157.length;e++){
if(_157[e].tag=="FORM"){
return true;
}
}
}
return false;
},keypress:function(el,_15a,_15b){
if(el.nodeName.toUpperCase()!="INPUT"){
return false;
}
var res=typeof Prototype!="undefined"?(_15a.keyCode==13):(_15a.charCode==13);
if(res){
for(var e=0;e<_15b.length;e++){
if(_15b[e].tag=="FORM"){
return true;
}
}
}
return false;
}};
},change_for_ie:function(){
this.add_to_delegator(null,"click");
this.add_to_delegator(null,"keyup");
this.add_to_delegator(null,"beforeactivate");
this.end_filters={click:function(el,_15f){
switch(el.nodeName.toLowerCase()){
case "select":
if(typeof el.selectedIndex=="undefined"){
return false;
}
var data=MVC.Dom.data(el);
if(data._change_old_value==null){
data._change_old_value=el.selectedIndex.toString();
return false;
}else{
if(data._change_old_value==el.selectedIndex.toString()){
return false;
}
data._change_old_value=el.selectedIndex.toString();
return true;
}
break;
case "input":
if(el.type.toLowerCase()=="checkbox"){
return true;
}
return false;
}
return false;
},keyup:function(el,_162){
if(el.nodeName.toLowerCase()!="select"){
return false;
}
if(typeof el.selectedIndex=="undefined"){
return false;
}
var data=MVC.Dom.data(el);
if(data._change_old_value==null){
data._change_old_value=el.selectedIndex.toString();
return false;
}else{
if(data._change_old_value==el.selectedIndex.toString()){
return false;
}
data._change_old_value=el.selectedIndex.toString();
return true;
}
},beforeactivate:function(el,_165){
return el.nodeName.toLowerCase()=="input"&&el.type.toLowerCase()=="radio"&&!el.checked&&MVC.Delegator.onload_called;
}};
},change_for_webkit:function(){
this.add_to_delegator(null,"change");
this.end_filters={change:function(el,_167){
if(el.nodeName.toLowerCase()=="input"){
return true;
}
if(typeof el.value=="undefined"){
return false;
}
var old=el.getAttribute("_old_value");
el.setAttribute("_old_value",el.value);
return el.value!=old;
}};
},context_for_opera:function(){
this.add_to_delegator(null,"click");
this.end_filters={click:function(el,_16a){
return _16a.shiftKey;
}};
},regexp_patterns:{tag:/^\s*(\*|[\w\-]+)(\b|$)?/,id:/^#([\w\-\*]+)(\b|$)/,className:/^\.([\w\-\*]+)(\b|$)/},selector_order:function(){
if(this.order){
return this.order;
}
var _16b=this._selector.split(/\s+/);
var _16c=this.regexp_patterns;
var _16d=[];
if(this._selector){
for(var i=0;i<_16b.length;i++){
var v={},r,p=_16b[i];
for(var attr in _16c){
if(_16c.hasOwnProperty(attr)){
if((r=p.match(_16c[attr]))){
if(attr=="tag"){
v[attr]=r[1].toUpperCase();
}else{
v[attr]=r[1];
}
p=p.replace(r[0],"");
}
}
}
_16d.push(v);
}
}
this.order=_16d;
return this.order;
},match:function(el,_174,_175){
if(this.filters&&!this.filters[_174.type](el,_174,_175)){
return null;
}
var _176=0;
var _177=this.selector_order();
if(_177.length==0){
return {node:_175[0].element,order:0,delegation_event:this};
}
for(var n=0;n<_175.length;n++){
var node=_175[n],_17a=_177[_176],_17b=true;
for(var attr in _17a){
if(!_17a.hasOwnProperty(attr)||attr=="element"){
continue;
}
if(_17a[attr]&&attr=="className"){
if(!MVC.Array.include(node.className.split(" "),_17a[attr])){
_17b=false;
}
}else{
if(_17a[attr]&&node[attr]!=_17a[attr]){
_17b=false;
}
}
}
if(_17b){
_176++;
if(_176>=_177.length){
if(this.end_filters&&!this.end_filters[_174.type](el,_174)){
return null;
}
return {node:node.element,order:n,delegation_event:this};
}
}
}
return null;
},dispatch_event:function(_17d){
var _17e=_17d.target,_17f=false,_180=true,_181=[];
var _182=MVC.Dom.data(this.element,"delegation_events")[_17d.type];
var _183=this.node_path(_17e);
for(var i=0;i<_182.length;i++){
var _185=_182[i];
var _186=_185.match(_17e,_17d,_183);
if(_186){
_181.push(_186);
}
}
if(_181.length==0){
return true;
}
MVC.Delegator.add_kill_event(_17d);
_181.sort(MVC.Delegator.sort_by_order);
var _187;
for(var m=0;m<_181.length;m++){
_187=_181[m];
_180=_187.delegation_event._func({event:_17d,element:MVC.$E(_187.node),delegate:this.element})&&_180;
if(_17d.is_killed()){
return false;
}
}
},node_path:function(el){
var body=this.element,_18b=[],_18c=el;
if(_18c==body){
return [{tag:_18c.nodeName,className:_18c.className,id:_18c.id,element:_18c}];
}
do{
_18b.unshift({tag:_18c.nodeName,className:_18c.className,id:_18c.id,element:_18c});
}while(((_18c=_18c.parentNode)!=body)&&_18c);
if(_18c){
_18b.unshift({tag:_18c.nodeName,className:_18c.className,id:_18c.id,element:_18c});
}
return _18b;
},destroy:function(){
if(this._event=="contextmenu"&&MVC.Browser.Opera){
return this._remove_from_delegator("click");
}
if(this._event=="submit"&&MVC.Browser.IE){
this._remove_from_delegator("keypress");
return this._remove_from_delegator("click");
}
if(this._event=="change"&&MVC.Browser.IE){
this._remove_from_delegator("keyup");
this._remove_from_delegator("beforeactivate");
return this._remove_from_delegator("click");
}
this._remove_from_delegator();
}};
include.set_path("jmvc/plugins/controller");
MVC.Object.is_number=function(o){
return o&&(typeof o=="number"||(typeof o=="string"&&!isNaN(o)));
};
MVC.Controller=MVC.Class.extend({init:function(){
if(!this.className){
return;
}
this.singularName=MVC.String.singularize(this.className);
if(!MVC.Controller.controllers[this.className]){
MVC.Controller.controllers[this.className]=[];
}
MVC.Controller.controllers[this.className].unshift(this);
var val,act;
if(!this.modelName){
this.modelName=MVC.String.is_singular(this.className)?this.className:MVC.String.singularize(this.className);
}
if(this._should_attach_actions){
this._create_actions();
}
if(include.get_env()=="test"){
var path=MVC.root.join("test/functional/"+this.className+"_controller_test.js");
var _191=include.check_exists(path);
if(_191){
MVC.Console.log("Loading: \"test/functional/"+this.className+"_controller_test.js\"");
include("../test/functional/"+this.className+"_controller_test.js");
}else{
MVC.Console.log("Test Controller not found at \"test/functional/"+this.className+"_controller_test.js\"");
}
}
this._path=include.get_path().match(/(.*?)controllers/)[1]+"controllers";
},_should_attach_actions:true,_create_actions:function(){
this.actions={};
for(var _192 in this.prototype){
var val=this.prototype[_192];
if(typeof val=="function"&&_192!="Class"){
for(var a=0;a<MVC.Controller.actions.length;a++){
var act=MVC.Controller.actions[a];
if(act.matches(_192)){
var _196=this.dispatch_closure(_192);
this.actions[_192]=new act(_192,_196,this.className,this._element,this._events);
}
}
}
}
},dispatch_closure:function(_197){
return MVC.Function.bind(function(_198){
_198=_198||{};
_198.action=_197;
_198.controller=this;
_198=_198.constructor==MVC.Controller.Params?_198:new MVC.Controller.Params(_198);
return this.dispatch(_197,_198);
},this);
},dispatch:function(_199,_19a){
if(!_199){
_199="index";
}
if(typeof _199=="string"){
if(!(_199 in this.prototype)){
throw "No action named "+_199+" was found for "+this.Class.className+" controller.";
}
}else{
_199=_199.name;
}
var _19b=this._get_instance(_199,_19a);
return this._dispatch_action(_19b,_199,_19a);
},_get_instance:function(_19c,_19d){
return new this(_19c,_19d);
},_dispatch_action:function(_19e,_19f,_1a0){
if(!this._listening){
return;
}
_19e.params=_1a0;
_19e.action_name=_19f;
return _19e[_19f](_1a0);
},controllers:{},actions:[],publish:function(_1a1,_1a2){
OpenAjax.hub.publish(_1a1,_1a2);
},get_controller_with_name_and_action:function(_1a3,_1a4){
if(!_1a3||!_1a4){
return null;
}
var _1a5=MVC.Controller.controllers[_1a3];
if(!_1a5){
return null;
}
for(var i=0;i<_1a5.length;i++){
var _1a7=_1a5[i];
if(_1a7.prototype[_1a4]){
return _1a7;
}
}
return null;
},modelName:null,_listening:true,_events:MVC.Delegator.events,_element:document.documentElement},{continue_to:function(_1a8){
var args=MVC.Array.from(arguments);
var _1a8=args.shift();
if(typeof this[_1a8]!="function"){
throw "There is no action named "+_1a8+". ";
}
return MVC.Function.bind(function(){
this.action_name=_1a8;
this[_1a8].apply(this,args.concat(MVC.Array.from(arguments)));
},this);
},delay:function(_1aa,_1ab,_1ac){
if(typeof this[_1ab]!="function"){
throw "There is no action named "+_1ab+". ";
}
return setTimeout(MVC.Function.bind(function(){
this.Class._dispatch_action(this,_1ab,_1ac);
},this),_1aa);
},publish:function(_1ad,data){
this.Class.publish(_1ad,data);
}});
MVC.Controller.Action=MVC.Class.extend({init:function(){
if(this.matches){
MVC.Controller.actions.push(this);
}
}},{init:function(_1af,_1b0,_1b1,_1b2){
this.action=_1af;
this.callback=_1b0;
this.className=_1b1;
this.element=_1b2;
},destroy:function(){
}});
MVC.Controller.Action.Subscribe=MVC.Controller.Action.extend({match:new RegExp("(.*?)\\s?(subscribe)$"),matches:function(_1b3){
return this.match.exec(_1b3);
}},{init:function(_1b4,_1b5,_1b6,_1b7){
this._super(_1b4,_1b5,_1b6,_1b7);
this.message();
this.subscription=OpenAjax.hub.subscribe(this.message_name,MVC.Function.bind(this.subscribe,this));
},message:function(){
this.parts=this.action.match(this.Class.match);
this.message_name=this.parts[1];
},subscribe:function(_1b8,data){
var _1ba=data||{};
_1ba.event_name=_1b8;
this.callback(_1ba);
},destroy:function(){
OpenAjax.hub.unsubscribe(this.subscription);
this._super();
}});
MVC.Controller.Action.Event=MVC.Controller.Action.extend({match:new RegExp("^(?:(.*?)\\s)?(change|click|contextmenu|dblclick|keydown|keyup|keypress|mousedown|mousemove|mouseout|mouseover|mouseup|reset|resize|scroll|select|submit|dblclick|focus|blur|load|unload)$"),matches:function(_1bb){
return this.match.exec(_1bb);
}},{init:function(_1bc,_1bd,_1be,_1bf){
this._super(_1bc,_1bd,_1be,_1bf);
this.css_and_event();
var _1c0=this.selector();
if(_1c0!=null){
this.delegator=new MVC.Delegator(_1c0,this.event_type,_1bd,_1bf);
}
},css_and_event:function(){
this.parts=this.action.match(this.Class.match);
this.css=this.parts[1]||"";
this.event_type=this.parts[2];
},main_controller:function(){
if(!this.css&&MVC.Array.include(["blur","focus"],this.event_type)){
this.bound_event=MVC.Function.bind(function(_1c1){
this.callback({event:_1c1,element:window});
},this);
MVC.Event.observe(window,this.event_type,MVC.Function.bind(this.bound_event));
this.css_selector="";
return;
}
return this.css;
},plural_selector:function(){
if(this.css=="#"||this.css.substring(0,2)=="# "){
var _1c2=this.css.substring(2,this.css.length);
if(this.element==document.documentElement){
return "#"+this.className+(_1c2?" "+_1c2:"");
}else{
return (_1c2?" "+_1c2:"");
}
}else{
return "."+MVC.String.singularize(this.className)+(this.css?" "+this.css:"");
}
},singular_selector:function(){
if(this.element==document.documentElement){
return "#"+this.className+(this.css?" "+this.css:"");
}else{
return this.css;
}
},selector:function(){
if(MVC.Array.include(["load","unload","resize","scroll"],this.event_type)){
this.bound_event=MVC.Function.bind(function(_1c3){
this.callback({event:_1c3,element:window});
},this);
MVC.Event.observe(window,this.event_type,this.bound_event);
this.css_selector="";
return;
}
if(this.className=="main"){
this.css_selector=this.main_controller();
}else{
this.css_selector=MVC.String.is_singular(this.className)?this.singular_selector():this.plural_selector();
}
return this.css_selector;
},destroy:function(){
if(this.delegator){
this.delegator.destroy();
}
if(this.bound_event){
MVC.Event.stop_observing(window,this.event_type,this.bound_event);
}
this._super();
}});
MVC.Controller.Params=function(_1c4){
var _1c4=_1c4||{};
var _1c5=false;
this.kill=function(){
_1c5=true;
if(_1c4.event&&_1c4.event.kill){
_1c4.event.kill();
}
};
this.is_killed=function(){
return _1c4.event.is_killed?_1c4.event.is_killed():_1c5;
};
for(var _1c6 in _1c4){
if(_1c4.hasOwnProperty(_1c6)){
this[_1c6]=_1c4[_1c6];
}
}
this.constructor=MVC.Controller.Params;
};
MVC.Controller.Params.prototype={form_params:function(){
var data={};
if(this.element.nodeName.toLowerCase()!="form"){
return data;
}
var els=this.element.elements,_1c9=[];
for(var i=0;i<els.length;i++){
var el=els[i];
if(el.type.toLowerCase()=="submit"){
continue;
}
var key=el.name||el.id,_1cd=key.match(/(\w+)/g),_1ce;
if(!key){
continue;
}
switch(el.type.toLowerCase()){
case "checkbox":
case "radio":
_1ce=!!el.checked;
break;
default:
_1ce=el.value;
break;
}
if(_1cd.length>1){
var last=_1cd.length-1;
var _1d0=_1cd[0].toString();
if(!data[_1d0]){
data[_1d0]={};
}
var _1d1=data[_1d0];
for(var k=1;k<last;k++){
_1d0=_1cd[k];
if(!_1d1[_1d0]){
_1d1[_1d0]={};
}
_1d1=_1d1[_1d0];
}
_1d1[_1cd[last]]=_1ce;
}else{
if(key in data){
if(typeof data[key]=="string"){
data[key]=[data[key]];
}
data[key].push(_1ce);
}else{
data[key]=_1ce;
}
}
}
return data;
},class_element:function(){
var _1d3=this.element;
var _1d4=this._className();
var _1d5=function(el){
var _1d7=el.className.split(" ");
for(var i=0;i<_1d7.length;i++){
if(_1d7[i]==_1d4){
return true;
}
}
return false;
};
while(_1d3&&!_1d5(_1d3)){
_1d3=_1d3.parentNode;
if(_1d3==document){
return null;
}
}
return MVC.$E(_1d3);
},is_event_on_element:function(){
return this.event.target==this.element;
},_className:function(){
return this.controller.singularName;
},element_instance:function(){
var ce,_1da,_1db,_1dc=this.controller.modelName,id,_1de=new RegExp("^"+_1dc+"_(.*)$");
if(!(_1db=MVC.Model.models[_1dc])){
throw "No model for the "+this.controller.className+" controller!";
}
ce=this.class_element();
return Model._find_by_element(ce,_1dc,_1db);
}};
if(!MVC._no_conflict&&typeof Controller=="undefined"){
Controller=MVC.Controller;
}
include.set_path("jmvc/plugins/controller/comet");
MVC.Controller.Comet=MVC.Controller.extend({init:function(){
},run:function(_1df){
var _1e0=new this();
_1e0.run(_1df);
},kill:function(){
var _1e1=new this();
_1e1.kill();
},convert:function(_1e2){
return _1e2;
},set_wait_time:function(val){
this._wait_time=val*1000;
if(this._comet){
this._comet.poll_now();
}
},_wait_time:0,wait_time:function(){
return this._wait_time;
},dispatch:function(_1e4){
var _1e5=this.convert(_1e4);
for(var _1e6 in _1e4){
if(_1e6=="responseText"){
continue;
}
var _1e7=_1e4[_1e6];
for(var _1e8 in _1e7){
var _1e9=_1e7[_1e8];
if(this.models_map&&this.models_map[_1e6]!=null){
if(this.models_map[_1e6]!=false){
_1e9=this.models_map[_1e6].create_many_as_existing(_1e9);
}
}else{
if(MVC.Model&&MVC.Model.models[_1e6.toLowerCase()]){
_1e9=MVC.Model.models[_1e6.toLowerCase()].create_many_as_existing(_1e9);
}
}
var _1ea=this.controller_map[_1e6]?this.controller_map[_1e6]:MVC.String.pluralize(_1e6).toLowerCase();
MVC.Controller.publish(_1ea+"."+_1e8,{data:_1e9});
}
}
},controller_map:{},error_mode:false},{run:function(){
this.start_polling();
},start_polling:function(){
this.Class._comet=new MVC.Comet((this.Class.domain?this.Class.domain:"")+"/"+this.Class.className,{method:"get",onComplete:this.continue_to("complete"),onSuccess:this.continue_to("success"),onFailure:this.continue_to("failure"),parameters:this.Class.parameters||null,session:this.Class.session||null,transport:this.Class.transport,wait_time:MVC.Function.bind(this.Class.wait_time,this.Class)});
},failure:function(){
this.error_mode=true;
this.run();
},success:function(_1eb){
this.Class.dispatch(_1eb);
},complete:function(){
if(this.error_mode&&this.restore_from_failure){
this.restore_from_failure();
}
this.error_mode=false;
},kill:function(){
if(this.Class._comet){
this.Class._comet.kill();
}
}});
include.set_path("jmvc/plugins/io/jsonp");
include.plugins("lang");
include("jsonp");
include.set_path("jmvc/plugins/io/jsonp");
MVC.JsonP=function(url,_1ed){
this.url=url;
this.options=_1ed||{};
this.remove_script=this.options.remove_script==false?false:true;
this.options.parameters=this.options.parameters||{};
this.error_timeout=this.options.error_timeout*1000||1000*70;
this.send();
};
MVC.JsonP.prototype={send:function(){
var n="c"+MVC.get_random(5);
if(this.options.session){
var _1ef=typeof this.options.session=="function"?this.options.session():this.options.session;
this.url+=(MVC.String.include(this.url,";")?"&":";")+MVC.Object.to_query_string(_1ef);
}
var _1f0=typeof this.options.parameters=="function"?this.options.parameters():this.options.parameters;
this.url+=(MVC.String.include(this.url,"?")?"&":"?")+MVC.Object.to_query_string(_1f0);
this.add_method();
var _1f1=this.callback_and_random(n);
var _1f2=this.check_error(this.url,this.options.onFailure);
MVC.JsonP._cbs[_1f1]=MVC.Function.bind(function(_1f3){
clearTimeout(_1f2);
this.remove_scripts();
var _1f4={};
if(_1f3==null){
_1f4.responseText="";
}else{
if(typeof _1f3=="string"){
_1f4.responseText=_1f3;
}else{
_1f4=_1f3;
_1f4.responseText=_1f3.toString();
}
}
var _1f5=true;
if(this.options.onSuccess){
_1f5=this.options.onSuccess(_1f4);
}
if(this.options.onComplete&&_1f5){
this.options.onComplete(_1f4);
}
delete MVC.JsonP._cbs[_1f1];
},this);
include({path:this.url});
},add_method:function(){
if(this.options.method&&this.options.method!="get"){
this.url+="&_method="+this.options.method;
}
},callback_and_random:function(n){
this.options.callback="MVC.JsonP._cbs."+n;
this.url+="&callback="+this.options.callback;
return n;
},check_error:function(url,_1f8){
return setTimeout(function(){
if(_1f8){
_1f8(url);
}else{
throw "URL:"+url+" timedout!";
}
},this.error_timeout);
},remove_scripts:function(){
if(this.remove_script){
setTimeout(MVC.Function.bind(this._remove_scripts,this),2000);
}
},_remove_scripts:function(){
var _1f9=document.getElementsByTagName("script");
for(var s=0;s<_1f9.length;s++){
var _1fb=_1f9[s];
if(MVC.String.include(_1fb.src.toLowerCase(),this.url.toLowerCase())){
_1fb.parentNode.removeChild(_1fb);
}
}
}};
MVC.JsonP._cbs={};
MVC.IO.JsonP=MVC.JsonP;
include.set_path("jmvc/plugins/lang/json");
include.plugins("lang");
include("json");
include.set_path("jmvc/plugins/lang/json");
MVC.Object.extend(MVC.Number,{to_json:function(_1fc){
return isFinite(_1fc)?_1fc.toString():"null";
}});
if(!MVC.Date){
MVC.Date={};
}
MVC.Object.extend(MVC.Date,{to_json:function(date){
return "\""+date.getUTCFullYear()+"-"+MVC.Number.to_padded_string(date.getUTCMonth()+1,2)+"-"+MVC.Number.to_padded_string(date.getUTCDate(),2)+"T"+MVC.Number.to_padded_string(date.getUTCHours(),2)+":"+MVC.Number.to_padded_string(date.getUTCMinutes(),2)+":"+MVC.Number.to_padded_string(date.getUTCSeconds(),2)+"Z\"";
}});
MVC.Object.extend(MVC.String,{to_json:function(_1fe){
var _1ff={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\\":"\\\\"};
var _200=_1fe.replace(/[\x00-\x1f\\]/g,function(_201){
var _202=_201.slice(0);
var _203=_1ff[_202];
return _203?_203:"\\u00"+MVC.Number.to_padded_string(_202.charCodeAt(),2,16);
});
return "\""+_200.replace(/"/g,"\\\"")+"\"";
}});
MVC.Object.extend(MVC.Array,{to_json:function(_204,_205){
var _206=[];
for(var i=0;i<_204.length;i++){
var val=MVC.Object.to_json(_204[i],true);
if(typeof val!="undefined"){
_206.push(val);
}
}
return "["+_206.join(", ")+"]";
}});
MVC.Object.to_json=function(_209,_20a){
var type=typeof _209;
switch(type){
case "undefined":
case "function":
case "unknown":
return;
case "boolean":
return _209.toString();
case "string":
return MVC.String.to_json(_209);
case "number":
return MVC.Number.to_json(_209);
}
if(_209===null){
return "null";
}
switch(_209.constructor){
case Array:
return MVC.Array.to_json(_209);
case Date:
return MVC.Array.to_json(_209);
}
if(_209.to_json){
return _209.to_json();
}
if(_209.nodeType==1){
return;
}
var _20c=[];
for(var _20d in _209){
var _20e=MVC.Object.to_json(_209[_20d],true);
if(typeof _20e!="undefined"){
_20c.push(MVC.String.to_json(_20d)+": "+_20e);
}
}
return "{"+_20c.join(", ")+"}";
};
include.set_path("undefined");
undefined;
include.set_path("engines/jabbify_core/models");
(function(){
if(typeof Jabbify!="undefined"){
var _20f=Jabbify;
}
Jabbify=MVC.Class.extend("jabbify",{domain:"http://jabbify.com",comet_domain:"http://comet"+MVC.random+".jabbify.com:8443",user_domain:"http://comet"+MVC.random+".jabbify.com:8443",version:0.2,connect:function(user,_211){
user=user||{};
random_id=function(){
var _212="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
var _213=128;
var _214="";
for(var i=0;i<_213;i++){
var rnum=Math.floor(Math.random()*_212.length);
_214+=_212.substring(rnum,rnum+1);
}
return _214;
};
Jabbify.from=user.from||random_id();
var _217={name:user.name||"anonymous_jab"+parseInt(Math.random()*100),website:user.website||"",user_id:user.user_id||random_id(),from:Jabbify.from};
if(user.data){
_217.data=user.data;
}
Jabbify.send("user","create",_217,function(_218){
if(!_218||!_218.session_id){
return;
}
Jabbify.session_id=_218.session_id;
Jabbify.CometController.run();
if(_211){
_211();
}
});
},send:function(type,_21a,data,_21c){
if(!type||!_21a){
throw new Error("Type and action are required parameters for Jabbify.send");
}
if(!(type=="user"&&_21a=="create")&&!Jabbify.session_id){
throw new Error("Must call Jabbify.connect() before sending a Jabbify message");
}
data=data||{};
MVC.Object.extend(data,{type:type,action:_21a,version:Jabbify.version});
var _21d=MVC.Object.to_json(data);
var _21e={onComplete:_21c||function(){
},parameters:{data:_21d}};
var _21f=Jabbify.comet_domain+"/message"+(Jabbify.session_id?";jsessionid="+Jabbify.session_id:"");
new MVC.JsonP(_21f,_21e);
},messages_list:function(_220,_221){
var _222={limit:_220||0};
if(Jabbify.from){
_222.from=Jabbify.from;
}
new MVC.JsonP(Jabbify.domain+"/messages.json",{parameters:_222,onComplete:_221,method:"get"});
},user_count:function(_223){
var _224={};
if(Jabbify.from){
_224.from=Jabbify.from;
}
new MVC.JsonP(Jabbify.user_domain+"/user_count",{parameters:_224,onComplete:_223,method:"get"});
},users_list:function(_225){
var _226={};
if(Jabbify.from){
_226.from=Jabbify.from;
}
new MVC.JsonP(Jabbify.user_domain+"/users",{parameters:_226,onComplete:_225,method:"get"});
},set_interval:function(time){
Jabbify.CometController.set_wait_time(time);
}},{});
for(var attr in _20f){
Jabbify[attr]=_20f[attr];
}
if(typeof JabbifyEnv!="undefined"){
Jabbify.env=JabbifyEnv;
}
}());
if(MVC.Browser.IE){
MVC.Event.observe(document.documentElement,"click",function(_229){
if(_229.target.nodeName.toLowerCase()=="a"&&_229.target.href.match(/^\w*javascript:/)){
try{
_229.cancelBubble=true;
if(_229.stopPropagation){
_229.stopPropagation();
}
if(_229.preventDefault){
_229.preventDefault();
}
}
catch(e){
}
}
});
}
include.set_path("engines/jabbify_core/models");
if(typeof Jabbify=="undefined"){
Jabbify={};
}
if(typeof Jabbify.env=="undefined"){
Jabbify.env="production";
if(location.host.indexOf("moschelrules.com")!=-1){
Jabbify.env="staging";
}
}
if(Jabbify.env=="development"){
Jabbify.domain="http://127.0.0.1";
Jabbify.comet_domain="http://127.0.0.1:8080";
Jabbify.user_domain="http://127.0.0.1:8040";
}else{
if(Jabbify.env=="staging"&&Jabbify.ssl){
Jabbify.domain="https://moschelrules.com";
Jabbify.comet_domain="https://comet"+MVC.random+".moschelrules.com:8443";
Jabbify.user_domain="https://comet"+MVC.random+".moschelrules.com:8443";
}else{
if(Jabbify.env=="staging"&&!Jabbify.ssl){
Jabbify.domain="http://moschelrules.com";
Jabbify.comet_domain="http://comet"+MVC.random+".moschelrules.com:8444";
Jabbify.user_domain="http://comet"+MVC.random+".moschelrules.com:8444";
}else{
if(Jabbify.env=="production"&&Jabbify.ssl){
Jabbify.domain="https://jabbify.com";
Jabbify.comet_domain="https://comet"+MVC.random+".jabbify.com:8443";
Jabbify.user_domain="https://comet"+MVC.random+".jabbify.com:8443";
}else{
if(Jabbify.env=="production"&&!Jabbify.ssl){
Jabbify.domain="http://jabbify.com";
Jabbify.comet_domain="http://comet"+MVC.random+".jabbify.com:8444";
Jabbify.user_domain="http://comet"+MVC.random+".jabbify.com:8444";
}
}
}
}
}
include.set_path("jmvc/plugins/io/xdoc");
include("xdoc");
include.set_path("jmvc/plugins/io/xdoc");
if(MVC.Browser.Opera){
MVC.XDoc=function(url,_22b){
this.url=url;
this.options=_22b||{};
this.options.method=this.options.method||"post";
this.options.parameters=this.options.parameters||{};
if(MVC.XDoc._can_request){
this.send();
}else{
MVC.XDoc.waiting_requests.push(this);
}
};
MVC.XDoc.requesting=null;
MVC.XDoc.waiting_requests=[];
MVC.XDoc.prototype={send:function(){
if(this.options.session){
var _22c=typeof this.options.session=="function"?this.options.session():this.options.session;
this.url+=(MVC.String.include(this.url,";")?"&":";")+MVC.Object.to_query_string(_22c);
}
var _22d=typeof this.options.parameters=="function"?this.options.parameters():this.options.parameters;
this.url+=(MVC.String.include(this.url,"?")?"&":"?")+MVC.Object.to_query_string(_22d);
var _22e=MVC.XDoc._frame;
MVC.XDoc.requesting=this;
try{
_22e.contentWindow.postMessage(this.url);
}
catch(e){
_22e.contentDocument.postMessage(this.url);
}
},handle:function(_22f){
if(_22f.data!="null"){
eval("var data = "+_22f.data);
data.responseText=_22f.data;
}else{
data={responseText:""};
}
this.options.onComplete(data);
}};
MVC.XDoc.next=function(){
var next=MVC.XDoc.waiting_requests.shift();
if(next){
next.send();
}
};
MVC.XDoc.observing=false;
MVC.XDoc.styleFrame=function(_231){
_231.style.width="100%";
_231.style.height="100%";
_231.style.border="0px";
_231.style.display="none";
};
MVC.XDoc._can_request=false;
MVC.XDoc.frame_loaded=function(){
MVC.XDoc._can_request=true;
MVC.XDoc.next();
};
(function(){
var _232=document.createElement(MVC.Browser.IE?"<iframe name=\"Jabbify\" onload=\"MVC.XDoc.frame_loaded()\">":"iframe");
MVC.XDoc.styleFrame(_232);
document.body.appendChild(_232);
_232.onload=MVC.Function.bind(MVC.XDoc.frame_loaded,MVC.XDoc);
_232.contentWindow.location=Jabbify.comet_domain+"/crossdomain.html";
MVC.XDoc._frame=_232;
})();
MVC.Event.observe(document,"message",function(_233){
MVC.XDoc.requesting.handle(_233);
MVC.XDoc.next();
});
}else{
MVC.XDoc=function(){
alert("XDoc should not be called");
};
}
include.set_path("undefined");
undefined;
include.set_path("engines/jabbify_core/controllers");
Jabbify.CometController=MVC.Controller.Comet.extend("jabbify",{domain:Jabbify.comet_domain,parameters:function(){
return {version:Jabbify.version};
},session:function(){
return {jsessionid:Jabbify.session_id};
},transport:MVC.Browser.Opera?MVC.XDoc:MVC.JsonP,dispatch:function(_234){
for(var type in _234){
if(type=="responseText"){
continue;
}
var _236=_234[type];
for(var _237 in _236){
var data=_236[_237];
OpenAjax.hub.publish("jabbify."+type+"."+_237,{data:data});
}
}
}},{});
(function(){
Jabbify.set_interval(parseInt(Math.random()*1000)/1000);
}());
include.end_of_production();
