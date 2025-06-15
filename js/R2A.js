{

	let pb = new ProgresBar2('ProgressBarRA2');
	
	pb.probabilities.resolve = 50;
	pb.probabilities.error   =  0;
	pb.probabilities.reject  = 40;
	pb.probabilities.timeout = 10;
		
	let pgui = new PromiseGUI(1);	
	pb.appendTo('divXXX')	
	let pguiElement = pgui.getTopElement();
	pb.appendPGui(pguiElement);	

	function executor(resolve, reject) {
		let alea = Math.floor(100 * Math.random());	
		pb.executor(resolve, reject, alea);
	}

	function btnR2ADIYThen_onclick(btn){

		console.clear();
		pgui.reset();


				
		debugger;

		let promise = new PromiseDIY(executor)
		.then(pgui.onResolve, pgui.onReject)
		.catch(pgui.onCatch)
		.finally(pgui.onFinally);	
	}

	function btnR2AThen_onclick(btn){

		console.clear();
		pgui.reset();		
		
		debugger;
		
		let promise = new Promise(executor)
		.then(pgui.onResolve, pgui.onReject)
		.catch(pgui.onCatch)
		.finally(pgui.onFinally);
		
				
	}
	

	

}
		
	/*

	// L'executor conforme alle richieste della promise
	function executor(resolve, reject) {		

		// Il processo asincrono con tutti i dati necessari
		function run(resolve, reject, id) {
			// ...
		}
	}



	// L'executor conforme alle richieste della promise
	function getExecutor(id) {
	
		// Il processo asincrono con tutti i dati necessari
		function executor(resolve, reject) {
			setTimeout(_ => {
				let people = [
					{name : 'John', age : '20'}, 
					{name : 'Mary', age : '25'}
				];
				resolve(people[id].name)
			}, 100)
		}

		return executor;
	}

	var promise = new Promise(getExecutor(0));
	promise.then(alert);


	function getPerson(id) {
	
		// Il processo asincrono con tutti i dati necessari
		function executor(resolve, reject) {
			setTimeout(_ => {
				let people = [
					{name : 'John', age : '20'}, 
					{name : 'Mary', age : '25'}
				];
				resolve(people[id].name)
			}, 100)
		}

		return new Promise(executor);;
	}

	getPerson(1).then(alert)

	*/