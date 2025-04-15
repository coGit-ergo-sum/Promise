{

	let pb = new ProgressBar('ProgressBar');
	
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
		.then(
			pgui.resolved, 
			pgui.rejected
		)
		.finally(pgui.fulfilled)
		.catch(pgui.catched);	
	}

	function btnR2AThen_onclick(btn){

		console.clear();
		pgui.reset();		
		
		debugger;
		
		let promise = new Promise(pb.executor)
		.then(pgui.resolved, pgui.rejected)
		.finally(pgui.fulfilled)
		.catch(pgui.catched);
		
		
		// *********************************************************************************************************************************** //
		// ATTENTION: be aware of: 
		//
		// 'resolve' and 'reject' are not the same of 'pgui.resolved' and 'pgui.rejected'
		// - 'resolve' and 'reject' are provided by the 'Promise'
		//
		// - 'pgui.resolved' and 'pgui.rejected' are developed by the developer

		// In the real world:
		//
		// pb.executor    can be, an asynchronous call to an AJAX API. The call can return a 'result' (e.g. data from the server.) 
		//                like the 'ProgressBar' that provides data to 'resolve' or 'reject' assigning the parameter 'result'
		//                Be aware of this: the 'Promise' immediatly calls the function 'pb.executor'. As soon the funtion 'pb.executor'
        //                complete will call either resolve or reject. At that moment, 'Promise' knows which will be the next step, 
		//                but 'Promise' store the inner state and stops waiting the moment when the method 'then' will be called.
		//                Only after the call of the function 'then' the 'Promise' will compete its job. not before! 
		//                (Take a look at the Sections 7A and 7B) 
		//                job. GETS a function (as parameter), but doesn't call it. 
		//                When 'then' will be called, in that moment, the function will be called, calling the method 'pb.executor'.
		// 
		// pgui.resolved  can be, a DOM function that displays on page the data fetched by 'pb.executor'.
		//
		// pgui.rejected  can be, an alert showing a message like «action rejected from the server».
		//
		// pgui.fulfilled this functions runs in any case, can be a function that hides the 'wait...' message.
		//
		// pgui.catched   can be, an error message.
		// *********************************************************************************************************************************** //

		
	}
	

	

}