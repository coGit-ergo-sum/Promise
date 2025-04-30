
//let R6B = {};

{
	let n = 5;
	let counter = 0;
		
	let pbs = [];
	
	for(i = 0; i < n; i++){
		pbs[i] = new ProgressBar('ProgressBar' + i);

		pbs[i].probabilities.resolve = 80;
		pbs[i].probabilities.error   =  0;		
		pbs[i].probabilities.reject  = 20;
		pbs[i].probabilities.timeout =  0;				
	
		tools.append2Demo(pbs[i], 'tdR6BC2');			
		tools.prependTdCounter(pbs[i].$tr);	
	}	

	
	function btnR6BStartA_onclick(btn){
		executor(isSynchronous = false, btn);
	}

	
	function btnR6BStartS_onclick(btn){
		executor(isSynchronous = true, btn)
	}
	
	function executor(isSynchronous, btn){
		debugger;
		
		counter = 0;
		tools.clearCounters(btn);
		
		tools.disableBtns(btn);
		console.clear();
		tools.reset(pbs);				

		for(let i = 0; i < n; i++){	
			let pb = pbs[i];
			pb.isSynchronous  = isSynchronous;
			pb.executor(
				result => _resolve(result, pb), 
				result => _reject(result, pb)
			);				
		}	

		tools.enableBtns(btn);
	}
	
	// ********************************************************* //
	
	let _resolve = function(result, pb){
		window.console.log(result.id);
		tools.showCounter(pb.$tr, ++counter);
	}	
	
	let _reject = function(result, pb){
		window.console.log(result.id);
		tools.showCounter(pb.$tr, ++counter);
	}		
	
}