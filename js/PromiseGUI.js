

// This is a simple graphical interface that visually represents the states of a Promise object
// (resolved, rejected, fulfilled, and caught) and updates accordingly based on the promise state.
function PromiseGUI (rowspan){

    let _this = this;
    
    // Initialize the graphical element for displaying Promise states.
    // The element is a table cell with rowspan and a 'Pending' state by default.
    let _html = '<td class="PGUIBase" rowSpan="' + rowspan + '" title="Pending">&nbsp;</td>';		

    // jQuery object to store the table cell
    this.$td = $(_html);

    // Method to represent the "catched" (error) state of the Promise
    // This changes the appearance to indicate an error was caught.
    this.catched = function(){
        _this.$td
            .removeClass('fulfilled')           // Remove fulfilled class
            .addClass('error PGUIError')        // Add error and custom error class
            .css({borderColor:'#F00', backgroundColor: '#FFF'}) // Style for error state
            .attr('title', 'catched (error)');  // Tooltip indicating "catched" state
    };

    // Method to represent the "rejected" state of the Promise
    // This changes the appearance to indicate the Promise was rejected (error occurred).
    this.rejected = function(){
        _this.$td
            .removeClass('error PGUIError')    // Remove error classes
            .css({backgroundColor: '#ff4d4d'}) // Red background for rejected state
            .attr('title', 'rejected');       // Tooltip indicating "rejected" state
    };

    // Method to represent the "resolved" state of the Promise
    // This changes the appearance to indicate the Promise was resolved successfully.
    this.resolved = function(){
        _this.$td
            .removeClass('error PGUIError')    // Remove error classes
            .css({backgroundColor: '#52BE80'}) // Green background for resolved state
            .attr('title', 'resolved');       // Tooltip indicating "resolved" state
    };

    // Method to reset the graphical element to its initial state
    // This indicates that the Promise is still pending and hasn't been resolved or rejected yet.
    this.reset = function(){
        _this.$td
            .removeClass('error PGUIError fulfilled') // Remove all state classes
            .css({borderColor:'#ccc', backgroundColor: '#fff'}) // Default styling for pending
            .attr('title', 'Pending');               // Tooltip indicating "Pending" state
    };

    // Method to represent the "fulfilled" state of the Promise
    // This changes the appearance to indicate the Promise has been fulfilled successfully.
    this.fulfilled = function(){
        _this.$td
            .removeClass('error')               // Remove error class
            .addClass('fulfilled')              // Add fulfilled class
            .css({borderColor:'#555'})          // Style for fulfilled state
            .attr('title', 'fulfilled');       // Tooltip indicating "fulfilled" state
    };

    // Call the reset method to ensure the Promise starts in the "Pending" state
    this.reset();
}





	// 	// Just a simple Graphical interface for the functions esposed by PromiseGUI
	// 	// {resolved; rejected; fulfilled; catched}
		
	// 	function PromiseGUI (rowspan){
		
	// 	let _this = this;
		
	// 	let _html = '<td class="PGUIBase" rowSpan="' + rowspan + '" title="Pending">&nbsp;</td>';		
		
	// 	this.$td = $(_html);
		
	// 	this.catched    = function(){
	// 		_this.$td
	// 		.removeClass('fulfilled')
	// 		.addClass('error PGUIError')
	// 		.css({borderColor:'#F00', backgroundColor: '#FFF'})
	// 		.attr('title', 'catched (error)');
	// 	};
		
	// 	this.rejected   = function(){
	// 		_this.$td
	// 		.removeClass('error PGUIError')
	// 		.css({backgroundColor: '#ff4d4d'})
	// 		.attr('title', 'rejected');
	// 	};
		
	// 	this.resolved   = function(){
	// 		_this.$td
	// 		.removeClass('error PGUIError')
	// 		.css({backgroundColor: '#52BE80'})
	// 		.attr('title', 'resolved');
	// 	};
		
	// 	this.reset      = function(){
	// 		_this.$td
	// 		.removeClass('error PGUIError fulfilled')
	// 		.css({borderColor:'#ccc', backgroundColor: '#fff'})
	// 		.attr('title', 'Pending')
	// 	};
		
	// 	this.fulfilled  = function(){
	// 		_this.$td
	// 		.removeClass('error')
	// 		.addClass('fulfilled')
	// 		.css({borderColor:'#555'})
	// 		.attr('title', 'fulfilled');
	// 	};
		
	// 	this.reset();

	// }

