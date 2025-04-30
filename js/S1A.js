//////////var S1A = {};

{

	let pb = new ProgressBar('ProgressBar');


	pb.probabilities.resolve  =  48;
	pb.probabilities.reject   =  16;
	pb.probabilities.error    =  16;
	pb.probabilities.timeout  =  16;
		
		
	tools.append2Demo(pb, 'tdS1AE2');
	
	let pgui = new PromiseGUI(1);		
	tools.prepend(pgui.$td, pb.$tr);
	
	let promise = null;
	
	function btnS1AStep1_onclick(btn){

		console.clear();
		pgui.reset();		
		
		debugger;

		promise = new Promise(pb.executor);

	}

	function btnS1AStep2_onclick(btn){	
		
		debugger;

		if (promise) {
			// ...we attach the 4 callbacks to handle its outcome.
			promise
				.then(pgui.onResolve, pgui.onReject)
				.catch(pgui.onCatch)
				.finally(pgui.onFinally);
	
			// Clear the reference to the Promise to avoid reusing it.
			promise = null;
		} 
		else {
			// If the Promise hasn't been instantiated yet, notify the user.
			alert('The Promise object has not been instantiated yet. Please click the other button.');
		}			

	}

	function btnS1A_onclick(btn){

		try{
			console.clear();
			pgui.reset();		
			
			debugger;

			pb.executor(pgui.onResolve, pgui.onReject);

		}
		catch(e){
			pgui.onCatch;
		}
		finally{
			pgui.onFinally;
		}	
	}

	// function MainFlow(){
	// 	// ...
	// 	asynchronousFunction();
	// 	// ...
	// }

	// function asynchronousFunction(){
	// 	let intervalId = setInterval(deferredTask, takeyourTime); 
	// }

	// function deferredTask(){
	// 	// Do something
	// }




	// function MainFlow2(){
	// 	// ...
	// 	setInterval(() => {
	// 		// Do something (with x, y, ...)
	// 	}, asyncDelay); 
	// 	// ...
	// }

	// function executor(resolve, reject){

	// 	// 'alea' is a random number, Could be 1, 2 or 3
	// 	var alea = Math.floor(Math.random() * 3) + 1; 

	// 	// 'setTimeout' makes this function ASynchronous.
	// 	setInterval(() => {
	// 		if (alea == 1) { resolve(alea);} 
	// 		else if (alea == 2) { reject(alea); }
			
	// 		// Simulate an error occurrence
	// 		// This will trigger the 'catch' method, calling 'onCatch'.
	// 		else{ throw new Error(alea); }	
	// 	}, asyncDelay); 

	// }

}