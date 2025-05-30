{
	
	// When the going gets tough, the tough get going   ;)
	let n = 5;
		
	// the array with the progress bars
	let pbs   = [];
	let pguis = [];	
		
	for(let i = 0; i < n; i++){
		pbs[i] = new ProgressBar('ProgressBar' + i);	

		pbs[i].probabilities.resolve = 70;
		pbs[i].probabilities.error   =  0;		
		pbs[i].probabilities.reject  = 30;
		pbs[i].probabilities.timeout =  0;

		tools.append2Demo(pbs[i], 'tdR4DBisC2');

		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);		
	}
			
	let pguiAny = new PromiseGUI(n);
	tools.prepend(pguiAny.$td, pbs[0].$tr);
	
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	// In this session we need 2 sets of callbacks
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
	// This set, to control each of the promises
	
	let _resolve = function(pb, pgui){
		window.console.promise.log.resolve(pb.id);
		pgui.onResolve();
		_finally(pb, pgui);
	}	
	
	let _reject = function(pb, pgui){
		window.console.promise.log.reject(pb.id);
		pgui.onReject();
		_finally(pb, pgui);
	}	
	

	// 'finally' is a reserved word. A function named 'finally' isn't allowed.
	// (That's way the 'underscore'.)
	let _finally = function(pb, pgui){
		window.console.promise.log.finally(pb.id);
		pgui.onFinally();		
	}	

	let _catch = function(error, pgui){
		window.console.promise.log.catch(error);
		pgui.onCatch();		
	}	
		
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //

	// this to control 'PromiseAny'
	
	let resolveAny = function(pguiAny, envelopes, btn){		
		try{
			pguiAny.onResolve();
			tools.highlight.resolved(btn);	
		}
		catch(jse){
			window.console.promise.log.catch(jse);
		}
		
	}	

	// The first progressBar that reject stops the 'race'
	let rejectAll = function(pguiAny, envelope, btn){		
		pguiAny.rejected();
		tools.highlight.rejected(btn);
		
		window.console.promise.log.reject(envelope.result.id);
	}	
	
	let finallyAny = function(pguiAny, btn){
		window.console.promise.log.finally();			
		tools.enableBtns(btn);
		pguiAny.onFinally();
		tools.stop(pbs);
	}	

	let catchAny = function(error, pguiAny, btn){
		window.console.promise.log.catch(error);
		pguiAny.onCatch();			
	}	

	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
	function btnR4DBisAny_onclick(btn){
		
		
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
			let pb     = pbs[i];	
			let pgui   = pguis[i];			

			// WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM //	

			// The confuguration of the 'promises'	
			
			// every promise is configurated to manage its own 'ProgressBar'
			promises[i] = new Promise(function(resolve, reject) {
				
				try{
					
					// In this example we don't need to wrap info in a 'envelope'.
					// object but we choose to call '_resolve' & '_finally' for  
					// each 'Promise' bound with each 'ProgressBar'
						
					let __resolve = function(result){

						_resolve(pb, pgui);

						let envelope = {result: result, pgui: pgui};	
						resolve(envelope);
					}
					
					let __reject = function(result){
						
						_reject(pb, pgui);

						let envelope = {result: result, pgui: pgui};	
						reject(envelope);
					}
					pb.executor(__resolve, __reject);

				}
				catch(jse){
					
					window.console.promise.log.catch(jse);

					let rejectionResult = pb.getRejectionResult(jse);
					let envelope = {result: rejectionResult, pgui: pgui};	
					
					// this ensures '_reject' will always receive the correct type parameter.
					reject(envelope)
				}
			})
			/*
			// Seems that 'Promises' controlled by a control 'Promise' ('PromiseAny' in this example.)
			// cannot be configured that way. 
			.then(
				result => _resolve(pb, result.pgui),
				result => _reject(pb, result.pgui)
			)
			
			.finally(function(){
				 _finally(pb, pgui);
			})
			.catch(function(envelope){ 
				 if(envelope.error != null){_catch(envelope, pgui);};
			})
			*/
			;
			// WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM //		
		}

		// ================================================================================================ //
		
		// The configuration of the 'master Promise': PromiseAny		
		
		// Now the new promise does not controls the progressBar, instead it controls an array 
		// of 'promises' like an orchestra conductor. 
		// Despite, something new happens, what we have is always a 'promise' and know how to manage it.
		let promiseAny = Promise.any(promises);
		
		// and now we can use the 'promise' in the way we learned 
		promiseAny.then(
			envelopes => resolveAny(pguiAny, envelopes, btn),
			envelope  => rejectAll (pguiAny, envelope,  btn)
		)
		.finally(() => { finallyAny(pguiAny, btn); })
		.catch((error) => catchAny(error, pguiAny, btn));
		
		// ================================================================================================ //
		
		


	
	}

}