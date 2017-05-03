;(function($){
	'use strict';
	
	var Scroll = function(element, options){
		this.$element = null;
		this.options = null;
		
		this.init(element, options);
	};
	
	Scroll.DEFAULTS = {
		children: null,
		activeClass: 'show',
		offset: 0
	};
	
	Scroll.prototype.init = function(element, options){
		this.$element = $(element);
		this.options = this.getOptions(options);
	};
	
	Scroll.prototype.getDefault = function(){
		return Scroll.DEFAULTS;
	};
	
	Scroll.prototype.getOptions = function(options){
		options = $.extend({}, this.getDefault(), this.$element.data(), options);
		
		if(typeof options.depth === 'string')
			options.depth = parseFloat(options.depth);
		
		if(options.depth <= 0 || options.depth > 1)
			options.depth = Scroll.DEFAULTS.depth;
		
		return options;
	};
	
	Scroll.prototype.getChildren = function(){
		return (this.options.children === null ? this.$element : this.$element.find(this.options.children));
	};
	
	Scroll.prototype.getChildrenPositions = function(){
		var pos = [];
		
		this.getChildren().each(function(index){
			var $this = $(this),
				offset = $this.data('offset');
			
			offset = (typeof offset !== 'undefined' ? parseInt(offset) : 0);
			
			pos[index] = {
				top: $this.offset().top + offset,
				element: $this
			};
		});
		
		return pos;
	};
	
	function Plugin(options){
		return this.each(function(){
			var obj = new Scroll(this, options),
				o = obj.options,
				children_pos = obj.getChildrenPositions();
			
			$(window).on('scroll',function(){
				var scroll_top = $(this).scrollTop() + window.innerHeight - o.offset;
				
				children_pos.forEach(function(item){
					if(item.top < scroll_top)
						item.element.addClass(o.activeClass);
					else
						item.element.removeClass(o.activeClass);
				});
			});
		});
	}
	
	$.fn.scrollShow = Plugin;
	$.fn.scrollShow.Constructor = Scroll;
	
})(jQuery);