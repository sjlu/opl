$(document).ready(function(){var e=new Frontpage;e.init()});var Frontpage=function(){function u(){var e=Math.floor(n/60),t=n%60;t<10&&(t="0"+t);var r=o({minutes:e,seconds:t});$("#timer").html(r)}function a(e){n=parseInt(e)*60,r=n,$("#timer").show(),u(),t=setInterval(function(){n-=1,u();if(!n){clearInterval(t),$("#timer").hide(),E(),g();return}n%60||i++},1e3)}function g(){var e=[];for(var t in p){var n=p[t];e.push({key:String.fromCharCode(t),presses:d[t],seconds:n/1e3})}var r=l({key_presses:e});$("#results").html(r),$("#results").show();var i=[];for(var s in v){var o=[];for(var t in v[s])o.push({key:String.fromCharCode(t),presses:m[s][t],seconds:v[s][t]/1e3});i.push({minute:s,results:o})}var r=h({results:i});$("#breakdown").html(r),$("#breakdown").show()}function b(e,t){p[e]||(p[e]=0),p[e]+=t,d[e]||(d[e]=0),d[e]++;var n=i;v[n]||(v[n]={}),v[n][e]||(v[n][e]=0),v[n][e]+=t,m[n]||(m[n]={}),m[n][e]||(m[n][e]=0),m[n][e]++}function w(){$(document).keydown(function(e){if(y[e.which])return;y[e.which]=(new Date).getTime()}),$(document).keyup(function(e){var t=(new Date).getTime()-y[e.which];b(e.which,t),delete y[e.which]})}function E(){$(document).unbind("keydown"),$(document).unbind("keyup");var e=(new Date).getTime();for(var t in y){var n=y[t],r=e-n;b(t,r),delete y[t]}}function S(){$("#duration-form").submit(function(){var e=$("#duration",this).val();return $(this).hide(),w(),a(e),!1})}var e={},t,n=0,r=0,i=1,s=$("#timer-template").html(),o=Handlebars.compile(s),f=$("#results-template").html(),l=Handlebars.compile(f),c=$("#breakdown-template").html(),h=Handlebars.compile(c),p={},d={},v={},m={},y={};return e.init=S,e};