define(["marionette","../../base"],function(e,t){var o=e.ItemView.extend({tagName:"li",template:"concept/columns/selected-item",events:{"click [data-action=remove]":"triggerRemove",sortupdate:"updateIndex"},modelEvents:{"columns:remove":"remove"},triggerRemove:function(e){e.preventDefault(),this.model.trigger("columns:remove",this.model)},updateIndex:function(e,t){e.stopPropagation(),this.collection.remove(this.model,{silent:!0}),this.collection.add(this.model,{at:t,silent:!0})}}),i=t.EmptyView.extend({message:"No columns selected."}),n=e.CollectionView.extend({tagName:"ul",className:"selected-columns",itemView:o,emptyView:i,events:{sortupdate:"triggerItemSort"},itemViewOptions:function(e,t){return{model:e,index:t,collection:this.collection}},onRender:function(){this.$el.sortable({cursor:"move",forcePlaceholderSize:!0,placeholder:"placeholder"})},triggerItemSort:function(e,t){t.item.trigger(e,[t.item.index()])}});return{SelectedItem:o,SelectedColumns:n}});
//# sourceMappingURL=selected.js.map