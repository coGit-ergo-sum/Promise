
{
	
	text('...', '#dddddd');	

	let pb = new ProgresBar2('progressBar');	
	pb.appendTo('divProgressBars')
	
	// ----------------------------------------------------------------------- //

	// These are the default settings,
	pb.probabilities.resolve =  52;
	pb.probabilities.error   =  16;	
	pb.probabilities.reject  =  16;
	pb.probabilities.timeout =  16;
	
	function btnR1AStart_onclick(btn){


		let _resolve = function(value){
			window.console.pb.log.resolve(value);
			//tools.enableBtns(btn);
			text('Resolved', '#44CD5A');
			showMessage( '<b>onResolve</b> result: ' + value);
		}

		let _reject = function(reason){
			window.console.pb.log.reject(reason.message);
			//tools.enableBtns(btn);		
			text('Rejected', 'red');
			showMessage( '<b>onReject</b> reason: ' + reason.message);
		}
		
		debugger;
		
		showMessage('&nbsp;')
		text('&nbsp;', 'transparent');
		console.clear();
		//tools.disableBtns(btn);
		
		text('Started: pending', '#cccccc');
		try{
			let alea = Math.floor(100 * Math.random());	

			pb.executor(
				_resolve, 
				_reject,
				alea
			);	
			
		}
		catch(jse){	
			//text(jse.message)
			text("error in the executor", '#cccccc');
			showMessage('<b>ERROR</b>, reason: ' + jse.message);
		}
		/*
		pb2.executor(
			_resolve, 
			_reject
		);	
		*/
	}

	function showMessage(text){
		const divMessage = document.getElementById("divMessage");
		divMessage.innerHTML = text;
		//setTimeout(btnR1AStart_onclick, 500);
	}
	
	
	// writes a message at the right of the button.
	function text(value, color){
		$('#tdR1AC1 span')
		.css('background-color', color)
		.css('color', '#fff')
		.text(value);

	}

	// function asynchronousFunction(value, success, fail ) {
		
	// 	let intervalId = setInterval(() => {     
	// 		let result = `any manipulation of ${value}`;       
	// 		if(ok){ success(result)}
	// 		else{ fail()}
	// 	}, asyncDelay);
	
	// }	

	// function mainFlow() {
	// 	// ...
	// 	asynchronousFunction(
	// 		value,
	// 		result => { /* do something with result */ },
	// 		_      => { /*  do something if failed  */ }
	// 	);
	// 	// ...
	// }
	

}