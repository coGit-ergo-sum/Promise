{

	let pb = new ProgressBar('ProgressBar');
	
	pb.resolvePercent = 50;
	pb.errorPercent   =  0;
		
		
	tools.append2Demo(pb, 'tdR1CC1');
	
	let pgui = new PromiseGUI(1);		
	tools.prepend(pgui.$td, pb.$tr);	
	


	function btnR1C_onclick(btn){

		try{
			console.clear();
			pgui.reset();		
			
			debugger;

			pb.executor(pgui.resolved, pgui.rejected);

		}
		catch(e){
			pgui.catched;
		}
		finally{
			pgui.fulfilled;
		}	
	}

	function MainFlow(){
		// ...
		asynchronousFunction();
		// ...
	}

	function asynchronousFunction(){
		let intervalId = setInterval(deferredTask, takeyourTime); 
	}

	function deferredTask(){
		// Do something
	}




	function MainFlow2(){
		// ...
		setInterval(() => {
			// Do something (with x, y, ...)
		}, asyncDelay); 
		// ...
	}

}