define(["underscore","./range"],function(e,n){var t=n.RangeControl.extend({events:function(){return e.extend({"changeDate .range-lower,.range-upper":"_change"},n.RangeControl.prototype.events)},onRender:function(){n.RangeControl.prototype.onRender.apply(this,arguments),this.ui.lowerBound.datepicker({autoclose:!0}),this.ui.upperBound.datepicker({autoclose:!0})},_setPlaceholder:function(e,n){var t=n.replace(/T.*$/,""),o=t.split("-");3===o.length&&(t=""+o[1]+"/"+o[2]+"/"+o[0],e.attr("placeholder",t))},setLowerBoundPlaceholder:function(e){this._setPlaceholder(this.ui.lowerBound,e)},setUpperBoundPlaceholder:function(e){this._setPlaceholder(this.ui.upperBound,e)}});return{DateControl:t}});
//# sourceMappingURL=date.js.map