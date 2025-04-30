{
		
	let pb0 = new ProgressBar('ProgressBar0');	
	tools.append2Demo(pb0, 'tdR2DC2');	

	let pgui0 = new PromiseGUI(1);		
	tools.prepend(pgui0.$td, pb0.$tr);	
	
	
	let _resolve = function(result, pgui){
		window.console.promise.log.resolve(result.id);
		pgui.onResolve();	
	}	

	
	let _reject = function(result, pgui){
		window.console.promise.log.reject(result.id);
		pgui.onReject();
	}	
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	let _finally = function(pb, pgui, btn){
		window.console.promise.log.finally(pb.id);
		pgui.onFinally();
		
		tools.enableBtns(btn);
			
		debugger;
		
		// this exception will cause a call to '_catch'	
		//(simulate an uncaught exception in this function.)
		throw new Error("Synchronous error thrown randomly to test the application.");
		
	}	
	
	let _catch = function(error, pb, pgui, btn){
		window.console.promise.log.catch(error);
		pgui.onCatch();
	}	
	
	function btnR2DFinally_onclick(btn){
		try{
			
			pgui0.reset();
			console.clear();				
			tools.disableBtns(btn);		
			
			let promise = new Promise(function(resolve, reject) {	
				
				// The function 'executor' will always 'resolve'!	
				pb0.probabilities.resolve = 100;
				pb0.probabilities.error   =   0;		
				pb0.probabilities.reject  =   0;
				pb0.probabilities.timeout =   0;
				
				pb0.executor(resolve, reject);
				
			});
			
			promise
			.then(
				result => _resolve(result, pgui0), 
				result => _reject(result, pgui0)
			)
			.finally(() => { _finally(pb0, pgui0, btn); })
			.catch((error) => _catch(error, pb0, pgui0, btn));

		}
		catch(jse){
			alert(jse.message);
		}	
	}
}

