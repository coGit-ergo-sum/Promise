
{
	
	text('...', '#dddddd');	

	let pb = new ProgressBar('progressBar');
	
	tools.append(pb, 'tdR1AC2');	


	// ----------------------------------------------------------------------- //
	// These are the default settings,
	pb.probabilities.resolve =  60;
	pb.probabilities.error   =   0;	
	pb.probabilities.reject  =  30;
	pb.probabilities.timeout =  10;


	pb.interval=  15;    // milliseconds per iteration. (The unit of time for the ProgressBar)	



	
	function btnR1AStart_onclick(btn){

		// ----------------------------------------------------------------------- //

		let _resolve = function(result){
			window.console.pb.log.resolve(result.id);
			//tools.enableBtns(btn);
			text('Resolved', '#44CD5A');
		}

		let _reject = function(result){
			window.console.pb.log.reject(result.id);
			//tools.enableBtns(btn);		
			text('Rejected', 'red');
		}

		// ----------------------------------------------------------------------- //
		
		debugger;
		
		console.clear();
		//tools.disableBtns(btn);
		
		text('Started: pending', '#cccccc');
		
		pb.executor(
			_resolve, 
			_reject
		);	
	}
	
	
	
	// writes a message at the right of the button.
	function text(value, color){
		
		$('#tdR1AC1 span')
		.css('background-color', color)
		.css('color', '#fff')
		.text(value);

	}
	

}