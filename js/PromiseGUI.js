	
		// Just a simple Graphical interface for the functions esposed by PromiseGUI
		// {resolved; rejected; fulfilled; catched}
		
		function PromiseGUI (rowspan){
		
		let _this = this;
		
		let _html = '<td class="PGUIBase" rowSpan="' + rowspan + '" title="Pending">&nbsp;</td>';		
		
		this.$td = $(_html);
		
		this.catched    = function(){
			_this.$td
			.removeClass('fulfilled')
			.addClass('error PGUIError')
			.css({borderColor:'#F00', backgroundColor: '#FFF'})
			.attr('title', 'catched (error)');
		};
		
		this.rejected   = function(){
			_this.$td
			.removeClass('error PGUIError')
			.css({backgroundColor: '#ff4d4d'})
			.attr('title', 'rejected');
		};
		
		this.resolved   = function(){
			_this.$td
			.removeClass('error PGUIError')
			.css({backgroundColor: '#52BE80'})
			.attr('title', 'resolved');
		};
		
		this.reset      = function(){
			_this.$td
			.removeClass('error PGUIError fulfilled')
			.css({borderColor:'#ccc', backgroundColor: '#fff'})
			.attr('title', 'Pending')
		};
		
		this.fulfilled  = function(){
			_this.$td
			.removeClass('error')
			.addClass('fulfilled')
			.css({borderColor:'#555'})
			.attr('title', 'fulfilled');
		};
		
		this.reset();

	}

