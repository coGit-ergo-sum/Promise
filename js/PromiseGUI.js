

// This is a simple graphical interface that visually represents the states of a Promise object
// (resolved, rejected, fulfilled, and caught) and updates accordingly based on the promise state.
function PromiseGUI (rowspan){

    let _this = this;
    
    // Initialize the graphical element for displaying Promise states.
    // The element is a table cell with rowspan and a 'Pending' state by default.	
    let _html = '<td class="PGUIBase" rowSpan="' + rowspan + '"  title="Pending">&nbsp;</td>';  /// style="margin-right: 20px;padding-right: 0px;border:solid 1px red;"
    
    this.getHTML = function(){
        return _html;
    }

    //  Return the top level element containing this object
    this.getTopElement = function(){
        return this.$td[0];
    }
    this.append2ndChild = function(trId){
        let tr = document.getElementById(trId);
        tr.insertBefore(this.$td[0], tr.children[1]);
    }
    this.appendTo = function(elementId){
        document.getElementById(elementId).appendChild(this.$td[0]);
    }
    this.prependTo = function(element){
        element.prepend(this.$td[0]);
    }
    // jQuery object to store the table cell
    this.$td = $(_html);

    // Method to represent the "caught" (error) state of the Promise
    // This changes the appearance to indicate an error was caught.
    this.onCatch = function(){
        _this.$td
            .removeClass('fulfilled')           // Remove fulfilled class
            .addClass('error PGUIError')        // Add error and custom error class
            .css({borderColor:'#F00', backgroundColor: 'transparent'}) 
            .attr('title', 'caught (error)');   // Tooltip indicating "caught" state
    };

    // callback parameter for the 'then' function of the Promise
    // This changes the appearance to indicate the Promise was rejected (error occurred).
    this.onReject = function(){
        _this.$td
            .removeClass('error PGUIError')    // Remove error classes
            .css({backgroundColor: '#ff4d4d'}) // Red background for rejected 
            .attr('title', 'rejected');        // Tooltip indicating "rejected" 
    };

    // callback parameter for the 'then' function of the Promise
    // This changes the appearance to indicate the Promise was resolved .
    this.onResolve = function(){
        _this.$td
            .removeClass('error PGUIError')    // Remove error classes
            .css({backgroundColor: '#52BE80'}) // Green background for resolved result
            .attr('title', 'resolved');        // Tooltip indicating "resolved" 
    };

    // Handler for the method 'finally' of the 'Promise'
    // This changes the appearance to indicate the Promise has been fulfilled.
    this.onFinally = function(){
        _this.$td
            .addClass('fulfilled')              // Add fulfilled class
            .css({borderColor:'#555'})          // Style for fulfilled state
            .attr('title', 'fulfilled');        // Tooltip indicating "fulfilled" 
    };
   
    // Method to reset the graphical element to its initial state
    this.reset = function(){
        _this.$td
            .removeClass('error PGUIError fulfilled') // Remove all state classes
            .css({borderColor:'#ccc', backgroundColor: '#FFF'}) // Default styling for pending
            .attr('title', 'Pending');               // Tooltip indicating "Pending" 
    };


    // Call the reset method to ensure the Promise starts in the "Pending" 
    this.reset();
}




