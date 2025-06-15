//////////var S1A = {};

{

	let pb = new ProgresBar2('ProgressBar');


	pb.probabilities.resolve  =  48;
	pb.probabilities.reject   =  16;
	pb.probabilities.error    =  16;
	pb.probabilities.timeout  =  16;
		
	pb.appendTo('tdS1AE2Pb')
	
	let pgui = new PromiseGUI(1);	
	pgui.appendTo('tdS1AE2gui');

	let pguiElement = pgui.getTopElement();
	pb.appendPGui(pguiElement);
	
	
	function executor(resolve, reject) {
		let alea = Math.floor(100 * Math.random());	
		pb.executor(resolve, reject, alea);
	}

	let promise = null;
	
	function btnS1AStep1_onclick(btn){

		console.clear();
		pgui.reset();		
		
		debugger;

		promise = new Promise(executor);

	}

	function btnS1AStep2_onclick(btn){	
		
		debugger;



		if (promise) {
			// ...we attach the 4 callbacks to handle its outcome.
			promise
				.then(pgui.onResolve, pgui.onReject)
				.catch(pgui.onCatch)
				.finally(pgui.onFinally);
	
			// Clear the reference to the Promise to avoid reusing it.
			promise = null;
		} 
		else {
			pgui.reset();
			pb.reset();

			var message = 'The Promise object has not been instantiated yet. Please click the other button.';
			// If the Promise hasn't been instantiated yet, notify the user.
			setTimeout(alert, 0, message);
		}			

	}

	function btnS1A_onclick(btn){

		try{
			console.clear();
			pgui.reset();		
			
			debugger;

			
			let alea = Math.floor(100 * Math.random());	

			pb.executor(pgui.onResolve, pgui.onReject, alea);

		}
		catch(e){
			pgui.onCatch;
		}
		finally{
			pgui.onFinally;
		}	
	}

	function btnS1A1_onclick(btn){
		debugger;
		var promise = new Promise((resolve, reject) => {resolve();});
		promise.whoAreYou = "It's Me";

		alert(promise.whoAreYou);
		alert(promise.then().whoAreYou);
	}

	function btnS1A2_onclick(btn){
		debugger;
		var promise = new PromiseDIY((resolve, reject) => {resolve();});
		promise.whoAreYou = "It's Me";

		alert(promise.then().whoAreYou);
	}

	function btnS1A3_onclick(btn){

		function executor(resolve, reject){
			setTimeout(() => {	resolve(11); }, 1); 
		}

		debugger;

		let  promise1 = new Promise(executor);

		promise1.then( value => { return value * 3; });
		promise1.then( alert );

		let promise2 = new Promise(executor);

		promise2
			.then( value => { return value * 3; })
			.then( alert );
		}

	let td11 = document.getElementById("td11");
	let td21 = document.getElementById("td21");
	let td31 = document.getElementById("td31");

	let td12 = document.getElementById("td12");
	let td22 = document.getElementById("td22");
	let td32 = document.getElementById("td32");

	function btnS11S_onclick(btn){
		td11.innerText = "1) button Sync: START";
		syncFunction();
		td31.innerText = "3) button Sync: END";
	}
	function syncFunction(){
		td21.innerText = "2) Sync function START"
	}
	
	function btnS11A_onclick(btn){
		td12.innerText = "1) button ASync: START";
		 setTimeout(asyncFunction,1);
		td22.innerText = "2) button ASync: END";
	}
	function btnS1Reset_onclick(btn){
		td11.innerHTML = "&nbsp;";
		td21.innerHTML = "&nbsp;";
		td31.innerHTML = "&nbsp;";
		td12.innerHTML = "&nbsp;";
		td22.innerHTML = "&nbsp;";
		td32.innerHTML = "&nbsp;";
	}
	function asyncFunction(){
		td32.innerText = "3) ASync function START";
	}


}