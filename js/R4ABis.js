

let R4ABis = {};

{
	let n = 5;
	
	R4ABis.pbs   = [];
	R4ABis.pguis = [];

	
	for(let i = 0; i < n; i++){
		
		R4ABis.pbs[i] = new ProgresBar2('ProgressBar' + i);

		//////R4A.pbs[i].interval = 1;

		R4ABis.pbs[i].probabilities.resolve = 70;
		R4ABis.pbs[i].probabilities.error   =  0;		
		R4ABis.pbs[i].probabilities.reject  = 20;
		R4ABis.pbs[i].probabilities.timeout = 10;
	
		R4ABis.pbs[i].appendTo('tdR4ABisProgressBar');		
		R4ABis.pguis[i] = new PromiseGUI(1);	
		debugger;
		let pguiElement = R4ABis.pguis[i].getTopElement();
		R4ABis.pbs[i].appendPGui(pguiElement);	
	}	
	
	R4ABis.pgui = new PromiseGUI(1);
	R4ABis.pgui.appendTo('trR4ABis');



	function btnR4ABisGOX_onclick(btn){

		for(let i = 0; i < n; i++){
		
			debugger;

			var pb = R4ABis.pbs[i];
			var pgui = R4ABis.pguis[i];
			pb.reset();	
			pgui.reset();	
			
			function executorR4ABis(resolve, reject) {
				let alea = Math.floor(100 * Math.random());	
				pb.executor(resolve, reject, alea);
			}					

			let promise = new Promise(executorR4ABis);
			promise
			.then(pgui.onResolve, pgui.onReject)
			.catch(pgui.onCatch)
			.finally(pgui.onFinally);
		}
	}

	function btnR4ABisGO_onclick(btn){

		let promises = [];

		R4ABis.pgui.reset();

		for(let i = 0; i < n; i++){
		
			//debugger;

			var pb = R4ABis.pbs[i];
			let pgui = R4ABis.pguis[i];
			pb.reset();	
			pgui.reset();	
			
			function executorR4ABis(resolve, reject) {
				let alea = Math.floor(100 * Math.random());	
				pb.executor(resolve, reject, alea);
			}
					
			function _onReject(reason){
				pgui.onReject(reason);
				for(let i = 0; i < n; i++){
					var pb = R4ABis.pbs[i];
					pb.stop();
				}
			}

			let promise = new Promise(executorR4ABis);
			promise
			.then(pgui.onResolve, _onReject)	
			.catch(pgui.onCatch)
			.finally(pgui.onFinally);

			promises[i] = promise;
		}

		// The new promise does not controls the 'ProgressBar', instead it controls an array 
		// of 'promises' like an orchestra conductor. 
		// Now we have 2 levels of 'Promise': it's a little bit more complex, but the concepts
		// are all the same!
		let promiseAll = Promise.all(promises);
		
		// and now we can use the 'promise' in the way we learned 
		promiseAll.then(R4ABis.pgui.onResolve,  R4ABis.pgui.onReject)
		.finally(R4ABis.pgui.onFinally)
		.catch(R4ABis.pgui.onCatch);
	}

}
























/*


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


		tools.append2Demo(pbs[i], 'tdR4ABisC2');

		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);		
	}
			
	let pguiAll = new PromiseGUI(n);
	tools.prepend(pguiAll.$td, pbs[0].$tr);
	
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

	// this to control 'PromiseAll'
	
	let resolveAll = function(pguiAll, envelopes, btn){		
		try{
			pguiAll.onResolve();
			tools.highlight.resolved(btn);	
		}
		catch(jse){
			window.console.promise.log.catch(jse);
		}
		
	}	

	// The first progressBar that reject stops the 'race'
	let rejectOne = function(pguiAll, envelope, btn){		
		pguiAll.rejected();
		tools.highlight.rejected(btn);

		tools.stop(pbs);
		window.console.promise.log.reject(envelope.result.id);
	}	
	
	let finallyAll = function(pguiAll, btn){
		window.console.promise.log.finally();			
		tools.enableBtns(btn);
		pguiAll.onFinally();
	}	

	let catchAll = function(error, pguiAll, btn){
		window.console.promise.log.catch(error);
		pguiAll.onCatch();			
	}	

	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
	function btnR4ABisAll_onclick(btn){
		debugger;
		console.clear();
		tools.disableBtns(btn);
		tools.highlight.clear(btn);
		tools.reset(pguis);
		pguiAll.reset();
		
		
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
			// Seems that 'Promises' controlled by a control 'Promise' ('PromiseAll' in this example.)
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
			* /
			;
			// WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM //		
		}

		// ================================================================================================ //
		
		// The configuration of the 'master Promise': PromiseAll		
		
		// Now the new promise does not controls the progressBar, instead it controls an array 
		// of 'promises' like an orchestra conductor. 
		// Despite, something new happens, what we have is always a 'promise' and know how to manage it.
		let promiseAll = Promise.all(promises);
		
		// and now we can use the 'promise' in the way we learned 
		promiseAll.then(
			envelopes => resolveAll(pguiAll, envelopes, btn),
			envelope  => rejectOne (pguiAll, envelope,  btn)
		)
		.finally(() => { finallyAll(pguiAll, btn); })
		.catch((error) => catchAll(error, pguiAll, btn));
		
		// ================================================================================================ //
		
		


	
	}

}
	*/