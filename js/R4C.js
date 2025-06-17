







let R4C = {};

{
	let n = 5;
	
	R4C.pbs   = [];
	R4C.pguis = [];

	for(let i = 0; i < n; i++){
		
		R4C.pbs[i] = new ProgresBar2('ProgressBar' + i);

		R4C.pbs[i].probabilities.resolve = 70;
		R4C.pbs[i].probabilities.error   =  0;		
		R4C.pbs[i].probabilities.reject  = 20;
		R4C.pbs[i].probabilities.timeout = 10;
	
		R4C.pbs[i].appendTo('tdR4CProgressBar');		
		R4C.pguis[i] = new PromiseGUI(1);	

		let pguiElement = R4C.pguis[i].getTopElement();
		R4C.pbs[i].appendPGui(pguiElement);	
	}	
	
	R4C.pgui = new PromiseGUI(1);
	R4C.pgui.appendTo('trR4C');



	function btnR4CGO_onclick(btn){

		let promises = [];

		R4C.pgui.reset();

		for(let i = 0; i < n; i++){
		
			//debugger;

			var pb = R4C.pbs[i];
			let pgui = R4C.pguis[i];
			pb.reset();	
			pgui.reset();	
			
			function executorR4C(resolve, reject) {
				let alea = Math.floor(100 * Math.random());	
				pb.executor(resolve, reject, alea);
			}

			function _onResolve(value){
				pgui.onResolve(value);
				for(let i = 0; i < n; i++){
					var pb = R4C.pbs[i];
					pb.stop();
				}
			}

			function _onReject(reason){
				pgui.onReject(reason);
				for(let i = 0; i < n; i++){
					var pb = R4C.pbs[i];
					pb.stop();
				}
			}

			let promise = new Promise(executorR4C);
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
		let promiseAll = Promise.all(promises);
		
		// and now we can use the 'promise' in the way we learned 
		promiseAll.then(R4C.pgui.onResolve,  R4C.pgui.onReject)
		.finally(R4C.pgui.onFinally)
		.catch(R4C.pgui.onCatch);
	}

}











// let R4C = {};

// {
// 	let n = 5;
	
// 	R4C.pbs   = [];
// 	R4C.pguis = [];

	
// 	for(let i = 0; i < n; i++){
		
// 		R4C.pbs[i] = new ProgresBar2('ProgressBar' + i);

// 		//////R4A.pbs[i].interval = 1;

// 		R4C.pbs[i].probabilities.resolve = 70;
// 		R4C.pbs[i].probabilities.error   =  0;		
// 		R4C.pbs[i].probabilities.reject  = 20;
// 		R4C.pbs[i].probabilities.timeout = 10;
	
// 		R4C.pbs[i].appendTo('tdR4CProgressBar');
// 		//tools.append2Demo(R4C.pbs[i], 'tdR4CC2');
// 		//pbR4C.appendTo('tdR4CC2')	
		
// 		R4C.pguis[i] = new PromiseGUI(1);	
// 		//R4C.pguis[i].prependTo(R4C.pguis[i]);
// 		debugger;
// 		let html1 = R4C.pguis[i].getHTML();
// 		let html2 = R4C.pbs[i].getHTML();
// 		R4C.pbs[i].prependTd(R4C.pguis[i].$td);
// 		//R4ABis.pguis[i].appendTo('tdR4ABisPromiseGui');

// 		//   

// 		//tools.prepend(R4ABis.pguis[i].$td, R4ABis.pbs[i].$tr);	
// 	}	

// 	R4C.pgui = new PromiseGUI(1);
// 	R4C.pgui.append2ndChild('trR4C');


// 	function btnR4CGO_onclick(btn){

// 		for(let i = 0; i < n; i++){
		
// 			debugger;

// 			var pb = R4C.pbs[i];
// 			var pgui = R4C.pguis[i];
// 			pb.reset();	
// 			pgui.reset();	
			
// 			function executorR4C(resolve, reject) {
// 				let alea = Math.floor(100 * Math.random());	
// 				pb.executor(resolve, reject, alea);
// 			}
					

// 			let promise = new Promise(executorR4C);
// 			promise
// 			.then(pgui.onResolve, pgui.onReject)
// 			.catch(pgui.onCatch)
// 			.finally(pgui.onFinally);
// 		}
// 	}
// }






























/*
//let R4C = {};

{
	
	let n = 5;
		
	// the array with the progress bars
	let pbs   = [];
	let pguis = [];	
		
	for(let i = 0; i < n; i++){
		pbs[i] = new ProgressBar('ProgressBar' + i);
			

		pbs[i].interval = 15;

		pbs[i].probabilities.resolve = 40;
		pbs[i].probabilities.error   = 20;		
		pbs[i].probabilities.reject  = 30;
		pbs[i].probabilities.timeout = 10;

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
			envelope.pgui.onResolve();
			envelope.pgui.onFinally();

			// this is the pguiRace
			pgui.onResolve();

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

		envelope.pgui.onReject();
		envelope.pgui.onFinally();
		pgui.onReject();

		tools.stop(pbs);		
		tools.highlight.rejected(btn);		
	}	
	
	R4C.finally = function(pgui, btn){		
		window.console.promise.log.finally();
		pgui.onFinally();	
		
		tools.enableBtns(btn);
	}	

	R4C.catch = function(error, pgui, btn){
		window.console.promise.log.catch(error);
		pguiRace.onCatch();		
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
	
*/