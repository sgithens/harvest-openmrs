define(["jquery","underscore","marionette"],function(e,i,t){var s=t.ItemView.extend({align:"center",constructor:function(e){if(t.ItemView.prototype.constructor.call(this,e),!this.template)if(this.options.template)this.template=this.options.template;else{var s=[],n=i.result(this.options,"icon")||i.result(this,"icon"),a=i.result(this.options,"message")||i.result(this,"message");n&&s.push(n),a&&s.push(a),this.template=function(){return s.join(" ")}}this.align&&this.$el.css("text-align",this.align)}}),n=s.extend({className:"empty-view",icon:'<i class="icon-info"></i>',message:"No data available"}),a=n.extend({className:"empty-search-view",icon:'<i class="icon-search icon-2x"></i>',message:"We could not find anything related to your search"}),o=s.extend({className:"error-view",icon:'<i class="icon-exclamation"></i>',message:"Something went awry.."}),r=o.extend({className:"error-overlay-view",template:"base/error-overlay",onRender:function(){e(this.options.target).css("position","relative").append(this.$el)}}),c=s.extend({className:"load-view",icon:'<i class="icon-spinner icon-spin"></i>',message:"Loading..."});return{EmptyView:n,EmptySearchView:a,ErrorView:o,ErrorOverlayView:r,LoadView:c}});
//# sourceMappingURL=base.js.map