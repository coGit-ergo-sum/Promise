

{


	function btnR7D_onclick(btn){

		console.clear
		function executor(resolve, reject){
			
			// This function runs in the 'context' of btnR7D_onclick.
			// 'setTimeout' push' the function 'resolve' out of the 'context' of  btnR7D_onclick. (immediatly after, because of the zero, but after);
			// 
			setTimeout(resolve,0);
		}	
		
		debugger;
				
		// The promises are created now. Instead the callback 'resolve' will be called after the end of the current function.
		// (take a look at the implementation of the function 'executor', please)
		var promises = [new Promise(executor), new Promise(executor)];
		
		
		var masterPromise = Promise.race(promises);
		
		
		masterPromise
		.then(() => console.log('resolved'), () => console.log('rejected'))
		.finally(() => console.log('finally'))
		.catch(() => console.log('catch'));
		
		
		// this line will be logged before any other log, (in this block of code).
		console.log('masterPromise configurated');	
		// That was what we were looking for.	
	}
}
