




let R4C = {};

{
	
	let n = 5;
		
	// the array with the progress bars
	let pbs   = [];
	let pguis = [];	
		
	for(let i = 0; i < n; i++){
		pbs[i] = new ProgressBar('ProgressBar' + i);
			
		pbs[i].resolvePercent = 20;
		pbs[i].errorPercent   =  0;
		pbs[i].interval       = 15;
		pbs[i].isSynchronous  = false;
		
		tools.append2Demo(pbs[i], 'tdR4CC2');

		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);		
	}
	
	let pguiRace = new PromiseGUI(n);
	tools.prepend(pguiRace.$td, pbs[0].$tr);
	
	
	
	R4C.resolve = function(pgui, envelope, btn){		
		try{		
			window.console.promise.log.resolve(envelope.result.id);
			envelope.pgui.resolved();
			envelope.pgui.fulfilled();

			// this is the pguiRace
			pgui.resolved();

			tools.stop(pbs);
			tools.highlight.resolved(btn);
		}
		catch(jse){
			window.console.promise.log.catch(jse);
		}
		
	}	

	// The first progressBar that rejects and stops the 'race'
	R4C.reject = function(pgui, envelope, btn){		
		window.console.promise.log.reject(envelope.result.id);

		envelope.pgui.rejected();
		envelope.pgui.fulfilled();
		pgui.rejected();

		tools.stop(pbs);		
		tools.highlight.rejected(btn);		
	}	
	
	R4C.finally = function(pgui, btn){		
		window.console.promise.log.finally();
		pgui.fulfilled();	
		
		tools.enableBtns(btn);
	}	

	R4C.catch = function(error, pgui, btn){
		window.console.promise.log.catch(error);
		pguiRace.catched();		
	}	

	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
	function btnR4CRace_onclick(btn){
		
		debugger;
		
		console.clear();
		tools.highlight.clear(btn);
		tools.disableBtns(btn);
		tools.reset(pguis);
		pguiRace.reset();
		
		
		let promises = [];
		
		for(let i = 0; i < pbs.length; i++){
			
			// closure needs to be managed in that way, in a 'for loop'		
			let pb     = pbs[i];	
			let pgui   = pguis[i];					
			
			
			
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
				
			});
			
		}		
				
		
		// The new promise does not controls the progressBar, instead it controls an array 
		// of 'promises' like an orchestra conductor. 
		// Despite something new happens, what we have is always a 'promise' and we know how to manage it.
		let promiseRace = Promise.race(promises);
		
		// and now we can use the 'promise' in the way we learned 
		promiseRace.then(
			envelope => R4C.resolve(pguiRace, envelope, btn),
			envelope => R4C.reject (pguiRace, envelope, btn)
		)
		.finally(() => { R4C.finally(pguiRace, btn); })
		.catch((error) => R4C.catch(error, pguiRace, btn));
	
	
	}

}