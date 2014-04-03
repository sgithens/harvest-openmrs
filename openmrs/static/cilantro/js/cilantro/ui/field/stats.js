var __bind=function(t,e){return function(){return t.apply(e,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(t,e){function r(){this.constructor=t}for(var n in e)__hasProp.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t};define(["jquery","underscore","backbone","marionette","../core","../base","../charts","../charts/utils"],function(t,e,r,n,s,o,a,i){var p,u,c,l,_;return _=function(t){return e.isNumber(t)?s.utils.prettyNumber(t):t},p=function(t){function e(){return this.template=__bind(this.template,this),e.__super__.constructor.apply(this,arguments)}return __extends(e,t),e.prototype.tagName="li",e.prototype.keyMap={min:"Min",max:"Max",avg:"Average",count:"Count",distinct_count:"Unique values"},e.prototype.template=function(t){return"<span class=stat-label>"+(this.keyMap[t.key]||t.key)+'</span> <span class=stat-value title="'+t.value+'">'+_(t.value)+"</span>"},e}(n.ItemView),l=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return __extends(e,t),e.prototype.tagName="ul",e.prototype.itemView=p,e}(n.CollectionView),c=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return __extends(n,e),n.prototype.className="sparkline",n.prototype.chartOptions=r.Sparkline.prototype.chartOptions,n.prototype.getChartOptions=function(e){var r;return r={series:[i.getSeries(e.data)]},t.extend(!0,r,this.chartOptions),r.chart.renderTo=this.ui.chart[0],r},n}(a.FieldChart),u=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return __extends(e,t),e.prototype.className="field-stats",e.prototype.template="field/stats",e.prototype.regions={values:".stats-values",chart:".stats-chart"},e.prototype.onRender=function(){return null==this.model.stats||(this.values.show(new l({collection:this.model.stats})),this.model.stats.length)?void 0:this.model.stats.fetch({reset:!0})},e}(n.Layout),{FieldStats:u}});
//# sourceMappingURL=stats.js.map