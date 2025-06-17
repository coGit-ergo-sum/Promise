












let R4D = {};

{
	let n = 5;
	
	R4D.pbs   = [];
	R4D.pguis = [];

	for(let i = 0; i < n; i++){
		
		R4D.pbs[i] = new ProgresBar2('ProgressBar' + i);

		R4D.pbs[i].probabilities.resolve = 50;
		R4D.pbs[i].probabilities.error   = 10;		
		R4D.pbs[i].probabilities.reject  = 20;
		R4D.pbs[i].probabilities.timeout = 20;
	
		R4D.pbs[i].appendTo('tdR4DProgressBar');		
		R4D.pguis[i] = new PromiseGUI(1);	

		let pguiElement = R4D.pguis[i].getTopElement();
		R4D.pbs[i].appendPGui(pguiElement);	
	}	
	
	R4D.pgui = new PromiseGUI(1);
	R4D.pgui.appendTo('trR4D');



	function btnR4DGO_onclick(btn){

		let promises = [];

		R4D.pgui.reset();

		for(let i = 0; i < n; i++){
		
			//debugger;

			var pb = R4D.pbs[i];
			let pgui = R4D.pguis[i];
			pb.reset();	
			pgui.reset();	
			
			function executorR4D(resolve, reject) {
				let alea = Math.floor(100 * Math.random());	
				pb.executor(resolve, reject, alea);
			}

			function _onResolve(value){
				pgui.onResolve(value);
				for(let i = 0; i < n; i++){
					var pb = R4D.pbs[i];
					pb.stop();
				}
			}

			function _onReject(reason){
				pgui.onReject(reason);
				// for(let i = 0; i < n; i++){
				// 	var pb = R4D.pbs[i];
				// 	pb.stop();
				// }
			}

			let promise = new Promise(executorR4D);
			promise
			.then(_onResolve, _onReject)	
			.catch(pgui.onCatch)
			.finally(pgui.onFinally);

			promises[i] = promise;
		}

		// The new promise does not controls the 'ProgressBar', instead it controls an array 
		// of 'promises' like an orchestra conductor. 
		// Now we have 2 levels of 'Promise': it's a little bit more complex, but the concepts
		// are all the same!
		let promiseAny = Promise.any(promises);
		
		// and now we can use the 'promise' in the way we learned 
		promiseAny.then(R4D.pgui.onResolve,  R4D.pgui.onReject)
		.finally(R4D.pgui.onFinally)
		.catch(R4D.pgui.onCatch);
	}

}



























// let R4D = {};

// {
// 	let n = 5;
	
// 	R4D.pbs   = [];
// 	R4D.pguis = [];

	
// 	for(let i = 0; i < n; i++){
		
// 		R4D.pbs[i] = new ProgresBar2('ProgressBar' + i);

// 		//////R4A.pbs[i].interval = 1;

// 		R4D.pbs[i].probabilities.resolve = 70;
// 		R4D.pbs[i].probabilities.error   =  0;		
// 		R4D.pbs[i].probabilities.reject  = 20;
// 		R4D.pbs[i].probabilities.timeout = 10;
	
// 		R4D.pbs[i].appendTo('tdR4DProgressBar');
// 		//tools.append2Demo(R4D.pbs[i], 'tdR4DC2');
// 		//pbR4D.appendTo('tdR4DC2')	
		
// 		R4D.pguis[i] = new PromiseGUI(1);	
// 		//R4D.pguis[i].prependTo(R4D.pguis[i]);
// 		debugger;
// 		let html1 = R4D.pguis[i].getHTML();
// 		let html2 = R4D.pbs[i].getHTML();
// 		R4D.pbs[i].prependTd(R4D.pguis[i].$td);
// 		//R4ABis.pguis[i].appendTo('tdR4ABisPromiseGui');

// 		//   

// 		//tools.prepend(R4ABis.pguis[i].$td, R4ABis.pbs[i].$tr);	
// 	}	

// 	R4D.pgui = new PromiseGUI(1);
// 	R4D.pgui.append2ndChild('trR4D');


// 	function btnR4DGO_onclick(btn){

// 		for(let i = 0; i < n; i++){
		
// 			debugger;

// 			var pb = R4D.pbs[i];
// 			var pgui = R4D.pguis[i];
// 			pb.reset();	
// 			pgui.reset();	
			
// 			function executorR4D(resolve, reject) {
// 				let alea = Math.floor(100 * Math.random());	
// 				pb.executor(resolve, reject, alea);
// 			}
					

// 			let promise = new Promise(executorR4D);
// 			promise
// 			.then(pgui.onResolve, pgui.onReject)
// 			.catch(pgui.onCatch)
// 			.finally(pgui.onFinally);
// 		}
// 	}
// }





























// // Some function used in this section will be used in other section.
// // This is one of the possible way to share them between sessions.
// //let R4D = {};


// {
// 	let n = 5;
		
// 	// the array with the progress bars & the PromiseGUI
// 	let pbs   = [];
// 	let pguis = [];	
		
// 	for(let i = 0; i < n; i++){
		
// 		pbs[i] = new ProgressBar('ProgressBar' + i);	

// 		//pbs[i].isSynchronous  = true;
// 		pbs[i].probabilities.resolve = 55;
// 		pbs[i].probabilities.error   =  0;		
// 		pbs[i].probabilities.reject  = 45;
// 		pbs[i].probabilities.timeout =  0;
		
// 		tools.append2Demo(pbs[i], 'tdR4DC2');

// 		pguis[i] = new PromiseGUI(1);		
// 		tools.prepend(pguis[i].$td, pbs[i].$tr);			
// 	}

// 	// The 'Promise' that 'controls' all the other 'Promises'
// 	let pguiAny = new PromiseGUI(n);
// 	tools.prepend(pguiAny.$td, pbs[0].$tr);
	
	
// 	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //	
// 	// The callbacks used by the 'Promise.any'
		
// 	R4D.resolve = function(pguiAny, envelope, btn){		
// 		try{			
// 			envelope.pgui.onResolve();
// 			envelope.pgui.onFinally();

// 			pguiAny.onResolve();
// 			tools.highlight.resolved(btn);
// 			tools.stop(pbs);
// 		}
// 		catch(jse){
// 			// this catch stops the chaining of the error to the function 'R4D-catch'
// 			window.console.promise.log.catch(jse);
// 		}
		
// 	}	

// 	// The first progressBar that reject, stops the 'race'
// 	R4D.reject = function(pguiAny, error, btn){
// 		try{	
// 			pguiAny.rejected();
// 			pguiAny.onFinally();
// 			//window.console.promise.log.reject(envelope.result.id);

// 			// As soon a 'ProgressBar' rejects, The 'PromiseAny' stops listening the other 'Promise'
// 			// That means, this stop is an option. It is up to developer write it, based on what he/she 
// 			// needs to do.
// 			//tools.stop(pbs);
// 			tools.highlight.rejected(btn);			
// 		}
// 		catch(jse){
// 			window.console.promise.log.catch(jse);
// 		}		
// 	}	

// 	R4D.finally = function(pguiAny, btn){
// 		window.console.promise.log.finally();			
// 		tools.enableBtns(btn);
// 		pguiAny.onFinally();
// 	}	

// 	R4D.catch = function(error, pguiAny){
// 		window.console.promise.log.catch(error);			
// 	}
	
// 	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
	
// 	function btnR4DAny_onclick(btn){

// 		if(!Promise.any){
// 			alert("'Promise.any' not definet on this browser.");
// 			return false;
// 		}
		
// 		debugger;	
		
// 		console.clear();
// 		tools.disableBtns(btn);
// 		tools.highlight.clear(btn);
// 		tools.reset(pguis);
// 		pguiAny.reset();		
		
// 		let promises = [];
		
// 		for(let i = 0; i < pbs.length; i++){
			
// 			// closure needs to be managed in that way, in a 'for loop'			
// 			let pb   = pbs[i];			
// 			let pgui = pguis[i];			
			
			
// 			// every promise is configurated to manage its own 'ProgressBar'
// 			promises[i] = new Promise(function(resolve, reject) {
				
// 				try{
					
// 					let _resolve = function(result){ 
// 						let envelope = {result: result, pgui: pgui};	
// 						resolve(envelope);
// 					}

// 					let _reject = function(result){ 
// 						let envelope = {result: result, pgui: pgui};		
// 						reject(envelope);
// 					}
					
// 					pb.executor(_resolve, _reject);
// 				}
// 				catch(jse){
// 					window.console.promise.log.catch(jse);
						
// 					let rejectionResult = pb.getRejectionResult(jse);
// 					let envelope = {result: rejectionResult, pgui: pgui};	
						
// 					// this ensures '_reject' will always receive the correct 
// 					// type parameter, and Any the info it needs.
// 					reject(envelope);
// 				}
// 			})
// 		}
		
				
		
// 		// The new promise does not controls the 'ProgressBar', instead it controls an array 
// 		// of 'promises' like an orchestra conductor. 
// 		// Now we have 2 levels of 'Promise': it's a little bit more complex, but the concepts
// 		// are Any the same!
// 		let promiseAny = Promise.any(promises);
		
// 		// and now we can use the 'promise' in the way we learned 
// 		promiseAny.then(
// 			envelope => R4D.resolve(pguiAny, envelope, btn), 
// 			envelope => R4D.reject (pguiAny, envelope, btn)
// 		)
// 		.finally(()    => R4D.finally(pguiAny, btn))
// 		.catch((error) => R4D.catch  (error, pguiAny));
	
// 	}
// }