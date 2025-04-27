{

	let pb = new ProgressBar('ProgressBarRA2');
	
	pb.resolvePercent = 50;
	pb.errorPercent   =  0;
		
		
	tools.append2Demo(pb, 'tdR2AC2');
	
	let pgui = new PromiseGUI(1);		
	tools.prepend(pgui.$td, pb.$tr);	
	
	function btnR2ADIYThen_onclick(btn){

		console.clear();
		pgui.reset();
				
		debugger;

		let promise = new PromiseDIY(pb.executor)
		.then(pgui.resolved, pgui.rejected)
		.catch(pgui.catched)
		.finally(pgui.fulfilled);	
	}

	function btnR2AThen_onclick(btn){

		console.clear();
		pgui.reset();		
		
		debugger;
		
		let promise = new Promise(pb.executor)
		.then(pgui.resolved, pgui.rejected)
		.catch(pgui.catched)
		.finally(pgui.fulfilled);
		
				
	}
	

	

}