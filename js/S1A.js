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
	
	function btnS1AStep1_onclick(btn){

		console.clear();
		pgui.reset();		
		
		debugger;

		promise = new Promise(pb.executor);

	}

	function btnS1AStep2_onclick(btn){	
		
		debugger;

		promise
			.then(pgui.resolved, pgui.rejected)
			.catch(pgui.catched)
			.finally(pgui.fulfilled);	

	}

	function btnS1A_onclick(btn){

		try{
			console.clear();
			pgui.reset();		
			
			debugger;

			pb.executor(pgui.resolved, pgui.rejected);

		}
		catch(e){
			pgui.catched;
		}
		finally{
			pgui.fulfilled;
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