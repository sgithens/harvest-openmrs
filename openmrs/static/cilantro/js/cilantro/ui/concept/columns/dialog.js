define(["underscore","marionette","./layout"],function(e,t,o){var i=t.Layout.extend({className:"columns-modal modal hide full",template:"concept/columns/dialog",events:{"click [data-save]":"save","click [data-dismiss]":"reset"},ui:{error:"[data-target=error]"},regions:{body:".concept-columns-region"},regionViews:{body:o.ConceptColumnsLayout},initialize:function(){if(this.data={},!(this.data.view=this.options.view))throw new Error("view required");if(!(this.data.concepts=this.options.concepts))throw new Error("concepts collection required");this.listenTo(this.data.view,"sync",this.reset)},onRender:function(){this.$el.modal({show:!1,keyboard:!1,backdrop:"static"}),this.columns=new this.regionViews.body({view:this.data.view,concepts:this.data.concepts}),this.body.show(this.columns)},reset:function(){var t=this;e.delay(function(){t.columns.resetSelected()},25),this.render()},save:function(){this.ui.error.hide();var e=this.columns.selectedToFacets();return 0===e.length?void this.ui.error.html("<p>You must select one or more columns.</p>").show():(this.data.view.facets.reset(e),this.data.view.save(),void this.close())},open:function(){this.ui.error.hide(),this.$el.modal("show")},close:function(){this.$el.modal("hide")}});return{ConceptColumnsDialog:i}});
//# sourceMappingURL=dialog.js.map