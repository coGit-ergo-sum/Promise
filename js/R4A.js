







let R4A = {};

{
	let n = 5;
	
	R4A.pbs   = [];
	R4A.pguis = [];

	
	for(let i = 0; i < n; i++){
		
		R4A.pbs[i] = new ProgresBar2('ProgressBar' + i);

		R4A.pbs[i].probabilities.resolve = 76;
		R4A.pbs[i].probabilities.error   =  0;		
		R4A.pbs[i].probabilities.reject  = 12;
		R4A.pbs[i].probabilities.timeout = 12;
	
		R4A.pbs[i].appendTo('tdR4AProgressBar');
		
		R4A.pguis[i] = new PromiseGUI(1);	
		debugger;
		let pguiElement = R4A.pguis[i].getTopElement();
		R4A.pbs[i].appendPGui(pguiElement);
	}	

	R4A.pgui = new PromiseGUI(1);
	R4A.pgui.appendTo('trR4A');


	function btnR4AGO_onclick(btn){

		let promises = [];

		R4A.pgui.reset();

		for(let i = 0; i < n; i++){
		
			//debugger;

			var pb = R4A.pbs[i];
			let pgui = R4A.pguis[i];
			pb.reset();	
			pgui.reset();	
			
			function executorR4A(resolve, reject) {
				let alea = Math.floor(100 * Math.random());	
				pb.executor(resolve, reject, alea);
			}
					
			function _onReject(reason){
				pgui.onReject(reason);
				for(let i = 0; i < n; i++){
					var pb = R4A.pbs[i];
					pb.stop();
				}
			}

			let promise = new Promise(executorR4A);
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
		promiseAll.then(R4A.pgui.onResolve,  R4A.pgui.onReject)
		.finally(R4A.pgui.onFinally)
		.catch(R4A.pgui.onCatch);
	}
}