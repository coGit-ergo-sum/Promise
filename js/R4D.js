

// Some function used in this section will be used in other section.
// This is one of the possible way to share them between sessions.
let R4D = {};


{
	let n = 5;
		
	// the array with the progress bars & the PromiseGUI
	let pbs   = [];
	let pguis = [];	
		
	for(let i = 0; i < n; i++){
		
		pbs[i] = new ProgressBar('ProgressBar' + i);	

		//pbs[i].isSynchronous  = true;
		pbs[i].probabilities.resolve = 55;
		pbs[i].probabilities.error   =  0;		
		pbs[i].probabilities.reject  = 45;
		pbs[i].probabilities.timeout =  0;
		
		tools.append2Demo(pbs[i], 'tdR4DC2');

		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);			
	}

	// The 'Promise' that 'controls' all the other 'Promises'
	let pguiAny = new PromiseGUI(n);
	tools.prepend(pguiAny.$td, pbs[0].$tr);
	
	
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //	
	// The callbacks used by the 'Promise.any'
		
	R4D.resolve = function(pguiAny, envelope, btn){		
		try{			
			envelope.pgui.onResolve();
			envelope.pgui.onFinally();

			pguiAny.onResolve();
			tools.highlight.resolved(btn);
			tools.stop(pbs);
		}
		catch(jse){
			// this catch stops the chaining of the error to the function 'R4D-catch'
			window.console.promise.log.catch(jse);
		}
		
	}	

	// The first progressBar that reject, stops the 'race'
	R4D.reject = function(pguiAny, error, btn){
		try{	
			pguiAny.rejected();
			pguiAny.onFinally();
			//window.console.promise.log.reject(envelope.result.id);

			// As soon a 'ProgressBar' rejects, The 'PromiseAny' stops listening the other 'Promise'
			// That means, this stop is an option. It is up to developer write it, based on what he/she 
			// needs to do.
			//tools.stop(pbs);
			tools.highlight.rejected(btn);			
		}
		catch(jse){
			window.console.promise.log.catch(jse);
		}		
	}	

	R4D.finally = function(pguiAny, btn){
		window.console.promise.log.finally();			
		tools.enableBtns(btn);
		pguiAny.onFinally();
	}	

	R4D.catch = function(error, pguiAny){
		window.console.promise.log.catch(error);			
	}
	
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
	
	function btnR4DAny_onclick(btn){

		if(!Promise.any){
			alert("'Promise.any' not definet on this browser.");
			return false;
		}
		
		debugger;	
		
		console.clear();
		tools.disableBtns(btn);
		tools.highlight.clear(btn);
		tools.reset(pguis);
		pguiAny.reset();		
		
		let promises = [];
		
		for(let i = 0; i < pbs.length; i++){
			
			// closure needs to be managed in that way, in a 'for loop'			
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
					// type parameter, and Any the info it needs.
					reject(envelope);
				}
			})
		}
		
				
		
		// The new promise does not controls the 'ProgressBar', instead it controls an array 
		// of 'promises' like an orchestra conductor. 
		// Now we have 2 levels of 'Promise': it's a little bit more complex, but the concepts
		// are Any the same!
		let promiseAny = Promise.any(promises);
		
		// and now we can use the 'promise' in the way we learned 
		promiseAny.then(
			envelope => R4D.resolve(pguiAny, envelope, btn), 
			envelope => R4D.reject (pguiAny, envelope, btn)
		)
		.finally(()    => R4D.finally(pguiAny, btn))
		.catch((error) => R4D.catch  (error, pguiAny));
	
	}
}