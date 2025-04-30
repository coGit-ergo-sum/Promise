{

	
	let n = 5;
		
	// the array with the progress bars
	let pbs   = [];


	let pguis = [];	
		
	for(let i = 0; i < n; i++){
		pbs[i] = new ProgressBar('ProgressBar' + i);

		pbs[i].probabilities.resolve = 40;
		pbs[i].probabilities.error   = 20;		
		pbs[i].probabilities.reject  = 30;
		pbs[i].probabilities.timeout = 10;

		// adds a progress bar to the page
		tools.append2Demo(pbs[i], 'tdR4BC2');	
		
		pguis[i] = new PromiseGUI(1);
		
		// adds a promiseGUI tothempage
		tools.prepend(pguis[i].$td, pbs[i].$tr);
	}
		
	// This is the master promiseGUI that esposes the status of the master Promise
	let pguiAllSettled = new PromiseGUI(n);

	// adds the master promiseGUI to the page
	tools.prepend(pguiAllSettled.$td, pbs[0].$tr);
	

	function btnR4BAllSettled_onclick(btn){
		
		console.clear();
		tools.disableBtns(btn);
		tools.highlight.clear(btn);		
		tools.reset(pguis);
		pguiAllSettled.reset();		
		
		let promises = [];

		// When the page is in 'Debug Mode' this 'debugger' sets a breakpoint
		debugger;
		
		for(let i = 0; i < pbs.length; i++){
			
			// for the 'closure' to work properly inside a loop it is necessary to assign every 'pbs[i]' 
			// and 'pguis[i]' to a local variable, otherwise it will always refer to the last one item
			let pb   = pbs[i];			
			let pgui = pguis[i];
			
			// every promise is configurated to manage its own 'ProgressBar'
			promises[i] = new Promise(function(resolve, reject) {
				
				try{
					
					let _resolve = function(result){ 
						let envelope = {result: result, pgui: pgui};	
						resolve(envelope);
					}

					let _reject = function(result){ 
						let envelope = {result: result, pgui: pgui};		
						reject(envelope);
					}
					
					pb.executor(_resolve, _reject);
					
				}
				catch(jse){
					window.console.promise.log.catch(jse);
						
					let rejectionResult = pb.getRejectionResult(jse);
					let envelope = {result: rejectionResult, pgui: pgui};	
						
					// this ensures '_reject' will always receive the correct 
					// type parameter, and all the info it needs.
					reject(envelope);
				}
			})
			
			tools.highlight.resolved(btn);
		}
		
				
		// Now the new promise does not controls the progressBar, instead it controls an array 
		// of 'promises' like an orchestra conductor. 
		// Despite, something new happens, what we have is always a 'promise' and know how to manage it.
		let promiseAlllSettled = Promise.allSettled(promises);
		
		// and now we can use the 'promise' in the way we learn 
		promiseAlllSettled.then(
			items  => resolveAllSettled(items, pguiAllSettled), 
			envelope => rejectAlllSettled(envelope, pguiAllSettled)
		)
		.finally(() => { finallyAllSettled(pguiAllSettled, btn); })
		.catch((error) => catchAllSettled(error, pguiAllSettled, btn));

	
	}

		

	let resolveAllSettled = function(items, pgui){		
		
			items.forEach(item => {
				("value"  in item) ? item.value.pgui.onResolve():
				("reason" in item) ? item.reason.pgui.onReject():	
				alert('Unknown result.');
				
				(item.value || item.reason).pgui.onFinally();
			});
			
			// this is the 'master' 'Promise'
			pgui.onResolve();		
	}	


	// ------------------------------------------------------------ //
	// Seems that 'alllSettled' never rejects.
	let rejectAlllSettled = function(envelope, pgui){

		window.console.promise.log.reject(envelope.result.id);
		
		tools.stop(pbs);
		pgui.onReject();		
	}	
	// ------------------------------------------------------------ //

	
	let finallyAllSettled = function(pgui, btn){
		window.console.promise.log.finally();
		pgui.onFinally();		
		tools.enableBtns(btn);
	}	


	let catchAllSettled = function(error, pgui, btn){
		window.console.promise.log.catch(error);
		pgui.onCatch();		
		tools.highlight.rejected(btn);				
	}
		
}