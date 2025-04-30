

// Some function used in this section will be used in other section.
// This is one of the possible way to share them between sessions.
let R3A = {};


{
	let n = 5;
	
	let pbs   = [];
	let pguis = [];
	
	for(i = 0; i < n; i++){
		
		pbs[i] = new ProgressBar('ProgressBar' + i);

		pbs[i].probabilities.resolve = 70;
		pbs[i].probabilities.error   = 10;		
		pbs[i].probabilities.reject  = 20;
		pbs[i].probabilities.timeout  = 0;

	
		tools.append2Demo(pbs[i], 'tdR3AC2');
		
		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);	
	}	


	function btnR3AThen_onclick(btn){
		
		tools.reset(pguis);
		tools.disableBtns(btn);
		console.clear();	

		debugger;
		
		for(let i = 0; i < n; i++){		
				
				// Closure needs must be managed in that way, when used within a loop 
				let pb   = pbs[i];
				let pgui = pguis[i];
				
				
				let promise = new Promise(function(resolve, reject) {
					try{
						
						// both the callbacks: 'resolve' and 'reject', can have ONLY ONE PARAMETER.
						// On the other hand our functions 'resolve' & 'reject' need 2 parameters (each one)
						// The following variable 'envelope', wraps 2 parameters.
						// (just to show another way to carry extra information with 'resolve' & 'reject')	
						
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
				
				
				promise.then(
					R3A.resolve, 
					R3A.reject
				)
				.finally(()      => { R3A.finally(pb, pgui, btn);} )
				.catch  ((error) => { R3A.catch(error, pb, pgui);});
		}	



		
	}
	

	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
	
	R3A.resolve = function(envelope){
		window.console.promise.log.resolve(envelope.result.id);
		envelope.pgui.onResolve();
	}	
	

	R3A.reject = function(envelope){
		window.console.promise.log.reject(envelope.result.id);
		envelope.pgui.onReject();		
	}	

	
	R3A.finally = function(pb, pgui, btn){
		window.console.promise.log.finally(pb.id);
		pgui.onFinally();
		
		tools.enableBtns(btn);		
	}	
	

	R3A.catch = function(error, pb, pgui){
		window.console.promise.log.catch(error);
		pgui.onCatch();		
	}	


	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
}	
