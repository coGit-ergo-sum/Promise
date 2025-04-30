var R1C = {};



{
/*
	R1C.pb = new ProgressBar('ProgressBar');


	R1C.pb.probabilities.resolve  =  48;
	R1C.pb.probabilities.reject   =  16;
	R1C.pb.probabilities.error    =  16;
	R1C.pb.probabilities.timeout  =  16;
		
		
	tools.append2Demo(R1C.pb, 'tdR1CC1');
	
	R1C.pgui = new PromiseGUI(1);		
	tools.prepend(R1C.pgui.$td, R1C.pb.$tr);	
	
	function btnR1CStep1_onclick(btn){

		console.clear();
		R1C.pgui.reset();		
		
		debugger;

		R1C.promise = new Promise(R1C.pb.executor);

	}

	function btnR1CStep2_onclick(btn){	
		
		debugger;

		R1C.promise
			.then(R1C.pgui.onResolve, R1C.pgui.onReject)
			.catch(R1C.pgui.onCatch)
			.finally(R1C.pgui.onFinally);	

	}
*/
	// function btnR1C_onclick(btn){

	// 	try{
	// 		console.clear();
	// 		pgui.reset();		
			
	// 		debugger;

	// 		pb.executor(pgui.onResolve, pgui.onReject);

	// 	}
	// 	catch(e){
	// 		pgui.onCatch;
	// 	}
	// 	finally{
	// 		pgui.onFinally;
	// 	}	
	// }

	function MainFlow(){
		// ...
		asynchronousFunction();
		// ...
	}

	function asynchronousFunction(){
		let intervalId = setInterval(deferredTask, takeyourTime); 
	}

	function deferredTask(){
		// Do something
	}




	function MainFlow2(){
		// ...
		setInterval(() => {
			// Do something (with x, y, ...)
		}, asyncDelay); 
		// ...
	}

	function executor(resolve, reject){

		// 'alea' is a random number, Could be 1, 2 or 3
		var alea = Math.floor(Math.random() * 3) + 1; 

		// 'setTimeout' makes this function ASynchronous.
		setInterval(() => {
			if (alea == 1) { resolve(alea);} 
			else if (alea == 2) { reject(alea); }
			
			// Simulate an error occurrence
			// This will trigger the 'catch' method, calling 'onCatch'.
			else{ throw new Error(alea); }	
		}, asyncDelay); 

	}

}