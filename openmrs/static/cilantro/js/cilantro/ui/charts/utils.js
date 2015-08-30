define(["underscore","highcharts"],function(t,e){var s=function(t){var s=e.getOptions().colors;return s[t%s.length]},a=function(t){var e=parseInt(t.substr(0,4)),s=parseInt(t.substr(5,2))-1,a=parseInt(t.substr(8,2));return Date.UTC(e,s,a)},r=function(t,r,i){if(r.length>2)throw new Error("3-dimensional charts are not supported.Specify which field the series applies to.");if(!r)throw new Error("The field instances must be supplied");var n,o,u,l,h,p,m,b=[],c=[],x=r[0],d=r[1];n=x.get("name"),o=x.get("enumerable")||"boolean"===x.get("simple_type"),u="date"===x.get("simple_type")||"datetime"===x.get("simple_type")?"datetime":"linear",d?(l=d.get("name"),h=d.get("enumerable")||"boolean"===d.get("simple_type"),p="date"===d.get("simple_type")||"datetime"===d.get("simple_type")?"datetime":"linear"):(l="Frequency",h=!1,p="linear"),o&&h?(m="scatter",b.push(" "),c.push(" ")):m=!d||o||h?h?"scatter":"column":"scatter";for(var g,y,v,f={},F=t.clustered,A=t.data,_=0;_<A.length;_++){g=A[_],y=i?g.values.slice(i,i+1)[0]:"",(v=f[y])?(v.data.push(g),v.stats.min=Math.min(v.stats.min,g.count),v.stats.max=Math.max(v.stats.max,g.count),v.stats.sum+=g.count):(v=f[y]={name:y,stats:{min:g.count,max:g.count,sum:g.count}},v.data=o&&h?[{x:0,y:0,radius:0,sentinel:!0},g]:[g]);var w=g.values[0];null===w&&(w="(no data)"),o?-1===b.indexOf(w.label)&&(w=b.push(w.label)-1):w="datetime"===u?a(w.value):w.value;var I;d?(I=g.values[1],null===I&&(I="(no data)"),h?-1===c.indexOf(I.label)&&(I=c.push(I.label)-1):I="datetime"===p?a(I.value):I.value):I=g.count,g.x=w,g.y=I}var M,O,C=[];o&&h&&(M=b.push(" ")-1,O=c.push(" ")-1);var T=0;for(var k in f){v=f[k],o&&h&&(v.data.push({x:0,y:O,radius:0,sentinel:!0}),v.data.push({x:M,y:O,radius:0,sentinel:!0}),v.data.push({x:M,y:O,radius:0,sentinel:!0})),C.push(v);var E=v.stats.avg=v.stats.sum/parseFloat(v.data.length,10);if("scatter"===m)for(var _=0;_<v.data.length;_++){var S=v.data[_];if(!S.sentinel){var q=Math.min(Math.max(parseInt(parseFloat(S.count,10)/E*5)/10,.05),1),z=e.Color(s(T)).setOpacity(q);S.marker={fillColor:z.get()},o&&(S.marker.radius=7)}}T++}var B;B="scatter"===m&&o?C[1]?function(){return"<h5>"+this.series.name+"</h5><br /><b>"+n+":</b>"+this.series.xAxis.categories[this.point.x]+"<br /><b>"+l+":</b>"+this.series.yAxis.categories[this.point.y]}:function(){return"<b>"+n+":</b>"+this.series.xAxis.categories[this.point.x]+"<br /><b>"+l+":</b>"+this.series.yAxis.categories[this.point.y]}:"column"===m&&o?C[1]?function(){return"<h5>"+this.series.name+"</h5><br /><b>"+n+":</b>"+this.series.xAxis.categories[this.point.x]+"<br /><b>"+l+":</b>"+e.numberFormat(parseFloat(this.y))}:function(){return"<b>"+n+":</b>"+this.series.xAxis.categories[this.point.x]+"<br /><b>"+l+":</b>"+e.numberFormat(parseFloat(this.y))}:C[1]?function(){return"<h5>"+this.series.name+"</h5><br /><b>"+n+":</b>"+e.numberFormat(parseFloat(this.x))+"<br /><b>"+l+":</b>"+e.numberFormat(parseFloat(this.y))}:function(){return"<b>"+n+":</b>"+e.numberFormat(parseFloat(this.x))+"<br /><b>"+l+":</b> "+e.numberFormat(parseFloat(this.y))};var D={clustered:F,chart:{type:m},title:{text:d?""+n+" vs. "+l:""+n+" "+l},series:C,xAxis:{title:{text:n},type:u},yAxis:{title:{text:l},type:p},tooltip:{formatter:B}};return b.length&&(D.xAxis.categories=b),c.length&&(D.yAxis.categories=c),C[1]||(D.legend={enabled:!1}),"scatter"===m&&(D.yAxis.gridLineWidth=0,o||(D.chart.zoomType="xy")),D},i=function(e){for(var s,a,r=[],i=0;i<e.length;i++)a=e[i],s=t.clone(a),s.x=a.values[0],s.y=null!==a.values[1]?a.values[1]:a.count,r.push(s);return{data:t.sortBy(r,"x")}};return{processResponse:r,getSeries:i}});
//# sourceMappingURL=utils.js.map