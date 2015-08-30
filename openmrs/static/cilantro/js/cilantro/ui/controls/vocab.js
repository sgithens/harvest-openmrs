define(["jquery","underscore","backbone","marionette","./base","./search","../search","../values","../paginator","../../models"],function(e,t,i,a,o,n,s,r,l,c){var h=i.Collection.extend({_matches:function(e){var t=e.attributes||e;return this.matcher(t)},initialize:function(e,i){this.matcher=i.matcher,this.values=i.collection,this.listenTo(this.values,{change:function(e,t){this._matches(e)?this.add(e,t):this.remove(e,t)},add:function(e,t,i){this._matches(e)&&this.add(e,i)},remove:function(e,t,i){this._matches(e)&&this.remove(e,i)},reset:function(e,i,a){var o=null;o=e&&e.length?t.filter(e,this._matches):[],o&&this.reset(o,a)}})}}),u=c.Value.extend({defaults:{operator:"in"}}),m=c.Values.extend({model:u}),d=r.ValueItem.extend({template:"controls/vocab/bucket-item",ui:{remove:"[data-target=remove]"},events:{"click @ui.remove":"removeItem"},removeItem:function(){this.model.destroy()}}),v=a.CompositeView.extend({className:"vocab-bucket",template:"controls/vocab/bucket",itemView:d,itemViewContainer:"[data-target=items]",options:{name:"Bucket"},ui:{items:"[data-target=items]"},events:{"sortreceive [data-target=items]":"receiveItem"},collectionEvents:{"add remove reset":"renderListState"},serializeData:function(){return{name:this.options.name}},receiveItem:function(e,t){var i=t.item.find("[data-value]").data("value"),a=this.collection.values.findWhere({value:parseInt(i,10)});a.set("operator",this.options.operator)},onRender:function(){this.ui.items.sortable({forcePlaceholderSize:!0,forceHelperSize:!0,placeholder:"placeholder",scroll:!1,opacity:.7,cursor:"move",connectWith:".vocab-bucket [data-target=items]"}),this.renderListState()},renderListState:function(){this.$el.toggleClass("empty",0===this.collection.length)}}),p=a.View.extend({initialize:function(){var e=this.model.get("alt_name").toLowerCase(),t=this.model.get("alt_plural_name").toLowerCase();this.buckets=[{name:"At least one "+e+" must match",operator:"in",collection:new h(null,{collection:this.collection,matcher:function(e){return"in"===e.operator}})},{name:"All the "+t+" must match",operator:"all",collection:new h(null,{collection:this.collection,matcher:function(e){return"all"===e.operator}})},{name:"The combination of "+t+" cannot match",operator:"-all",collection:new h(null,{collection:this.collection,matcher:function(e){return"-all"===e.operator}})},{name:"None of the "+t+" can match",operator:"-in",collection:new h(null,{collection:this.collection,matcher:function(e){return"-in"===e.operator}})}]},render:function(){for(var e=0;e<this.buckets.length;e++){var t=new v(this.buckets[e]);t.render(),this.$el.append(t.el)}return this.el}}),g=a.ItemView.extend({template:"controls/vocab/path",className:"vocab-path"}),f=a.ItemView.extend({className:"value-item",template:"controls/vocab/item",ui:{actions:".actions",addButton:".add-item-button",removeButton:".remove-item-button"},events:{"click .add-item-button":"addItem","click .remove-item-button":"removeItem"},constructor:function(e){e=e||{},(this.values=e.values)&&(this.listenTo(this.values,"add",this.setState),this.listenTo(this.values,"remove",this.setState),this.listenTo(this.values,"reset",this.setState)),a.ItemView.prototype.constructor.call(this,e)},serializeData:function(){var e;if(this.model.attributes._links){var t=this.model.get("_links").children;e=t?t.href:null}else e=this.model.links.children;return{url:e,label:this.model.get("label")}},addItem:function(){var e=t.extend(this.model.toJSON(),{valid:!0});this.values.add(e)},removeItem:function(){this.values.remove(this.model)},setState:function(){this.values.get(this.model)?(this.ui.addButton.hide(),this.ui.removeButton.show()):(this.ui.addButton.show(),this.ui.removeButton.hide())},onRender:function(){this.setState()}}),b=l.ListingPage.extend({className:"search-value-list",itemView:f}),w=l.PageRoll.extend({listView:b}),V=o.ControlLayout.extend({className:"vocab-control",template:"controls/vocab/layout",events:{"click [data-action=clear]":"clearValues","click .browse-region a":"triggerDescend","click .path-region button":"triggerAscend"},options:{resetPathOnSearch:!1},regions:{paginator:".paginator-region",search:".search-region",path:".path-region",browse:".browse-region",buckets:".buckets-region"},regionViews:{search:s.Search,paginator:l.Paginator,path:g,browse:w,buckets:p},initialize:function(){this.selectedValues=new m,this.listenTo(this.selectedValues,"all",this.change),this.valuesPaginator=new n.SearchPaginator(null,{field:this.model}),this._path=new i.Collection},triggerDescend:function(t){t.preventDefault(),t.stopPropagation();var i=e(t.target);this._path.push({label:i.text(),url:i.prop("href")})},triggerAscend:function(){event.preventDefault(),event.stopPropagation(),this._path.pop()},refreshPaginator:function(){var e=this._path.last();this.path.show(new this.regionViews.path({model:e})),this.valuesPaginator.currentUrl=e.get("url"),this.valuesPaginator.refresh()},onRender:function(){var e=new this.regionViews.search({model:this.model,placeholder:"Search "+this.model.get("plural_name")+"..."});this.listenTo(e,"search",this.handleSearch);var t=new this.regionViews.browse({collection:this.valuesPaginator,values:this.selectedValues}),i=new this.regionViews.paginator({className:"paginator mini",model:this.valuesPaginator}),a=new this.regionViews.buckets({model:this.model,collection:this.selectedValues});this.search.show(e),this.browse.show(t),this.paginator.show(i),this.buckets.show(a),this.listenTo(this._path,"add remove",this.refreshPaginator),this._path.push({label:"Top-level"})},handleSearch:function(e){this.options.resetPathOnSearch&&(this.valuesPaginator.currentUrl=null),this.valuesPaginator.urlParams=e?{query:e}:null,this.valuesPaginator.refresh()},get:function(){var e,i={};this.selectedValues.each(function(t){e=t.get("operator"),i[e]||(i[e]=[]),i[e].push(t.pick("label","value"))});var a=t.keys(i);if(a.length)return 1===a.length?{field:this.model.id,operator:a[0],value:i[a[0]]}:{type:"and",children:t.map(i,function(e,t){return{field:this.model.id,operator:t,value:e}},this)}},_mapSetValues:function(e,i){return t.map(e,function(e){return e=t.clone(e),e.operator=i,e})},set:function(e){if(e){var i=[];e.children?t.each(e.children,function(e){i=i.concat(this._mapSetValues(e.value,e.operator))},this):i=this._mapSetValues(e.value,e.operator),this.selectedValues.set(i,{remove:!1})}},isEmpty:function(e){return e.children?!1:o.ControlLayout.prototype.isEmpty.call(this,e)}});return{VocabControl:V}});
//# sourceMappingURL=vocab.js.map