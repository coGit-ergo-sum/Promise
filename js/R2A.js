{

	let pb = new ProgressBar('ProgressBarRA2');
	
	pb.probabilities.resolve = 50;
	pb.probabilities.error   =  0;
	pb.probabilities.reject  = 40;
	pb.probabilities.timeout = 10;
		
		
	tools.append2Demo(pb, 'tdR2AC2');
	
	let pgui = new PromiseGUI(1);		
	tools.prepend(pgui.$td, pb.$tr);	
	
	function btnR2ADIYThen_onclick(btn){

		console.clear();
		pgui.reset();
				
		debugger;

		let promise = new PromiseDIY(pb.executor)
		.then(pgui.onResolve, pgui.onReject)
		.catch(pgui.onCatch)
		.finally(pgui.onFinally);	
	}

	function btnR2AThen_onclick(btn){

		console.clear();
		pgui.reset();		
		
		debugger;
		
		let promise = new Promise(pb.executor)
		.then(pgui.onResolve, pgui.onReject)
		.catch(pgui.onCatch)
		.finally(pgui.onFinally);
		
				
	}
	

	

}