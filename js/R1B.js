
{
	
	let pgui = new PromiseGUI(1);
	
	let $tr = $('#tdR1B tr');
	tools.prepend(pgui.$td, $tr);
	
	// let btnR1BResolved =  $('#btnR1BResolved');
	// let btnR1BRejected =  $('#btnR1BRejected');
	// let btnR1BFulfilled =  $('#btnR1BFulfilled');
	// let btnR1BCatched =  $('#btnR1BCatched');
	
	function btnR1BResolved_onclick(btn){
		debugger;
		pgui.reset();
		pgui.onResolve();
	}		
	
	function btnR1BRejected_onclick(btn){
		pgui.reset();
		pgui.onReject();
	}	
	
	function btnR1BFulfilled_onclick(btn){
		pgui.onFinally();
	}
	
	function btnR1BReset_onclick(btn){
		pgui.reset();
	}	
	
	function btnR1BCatched_onclick(btn){
		pgui.onCatch();
	}	
	
	btnR1BReset_onclick();

}