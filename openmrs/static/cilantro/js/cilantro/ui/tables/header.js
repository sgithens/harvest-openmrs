define(["underscore","marionette","./row"],function(e,t,i){var s=t.ItemView.extend({tagName:"th",events:{click:"onClick"},constructor:function(e){if(!e.view)throw new Error("ViewModel instance required");this.view=e.view,delete e.view,t.ItemView.prototype.constructor.call(this,e)},onClick:function(){e.each(this.view.facets.models,function(e){var t;e.get("concept")===this.model.id?(t=e.get("sort"),t?"asc"===t.toLowerCase()?(e.set("sort","desc"),e.set("sort_index",0)):(e.unset("sort"),e.unset("sort_index")):(e.set("sort","asc"),e.set("sort_index",0))):(e.unset("sort"),e.unset("sort_index"))},this),this.view.save()},initialize:function(){this.listenTo(this.model,"change:visible",this.toggleVisible)},getSortIconClass:function(){var e,t;if(t=this.view.facets.findWhere({concept:this.model.id}))switch(e=(t.get("sort")||"").toLowerCase()){case"asc":return"icon-sort-up";case"desc":return"icon-sort-down";default:return"icon-sort"}},render:function(){this.toggleVisible();var e=this.getSortIconClass();return this.$el.html("<span>"+this.model.get("name")+" <i class="+e+"></i></span>"),this.$el.attr("title",this.model.get("name")),this},toggleVisible:function(){this.$el.toggle(this.model.get("visible"))}}),n=i.Row.extend({itemView:s}),o=t.ItemView.extend({tagName:"thead",render:function(){var e=new n(this.options);return this.$el.html(e.el),e.render(),this}});return{Header:o}});
//# sourceMappingURL=header.js.map