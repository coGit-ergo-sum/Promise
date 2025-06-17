

let R3B = {};

R3B.pbs   = [];
R3B.pguis = [];

{
	n = 5;

	for(let i = 0; i < n; i++){
		
		R3B.pbs[i] = new ProgresBar2('ProgressBar' + i);

		R3B.pbs[i].probabilities.resolve = 70;
		R3B.pbs[i].probabilities.error   =  0;		
		R3B.pbs[i].probabilities.reject  = 20;
		R3B.pbs[i].probabilities.timeout = 20;

		R3B.pbs[i].appendTo('tdR3BProgressBar');
		
		R3B.pguis[i] = new PromiseGUI(1);	
		R3B.pbs[i].prependTd(R3B.pguis[i].$td);

		let pguiElement = R3B.pguis[i].getTopElement();
		R3B.pbs[i].appendPGui(pguiElement);
	}

}

function btnR3BGO_onclick(btn){

	for(let i = 0; i < n; i++){

		var pb = R3B.pbs[i];
		var pgui = R3B.pguis[i];
		pb.reset();	
		pgui.reset();	
		
		function executorR3B(resolve, reject) {
			let alea = Math.floor(100 * Math.random());	
			pb.executor(resolve, reject, alea);
		}
				

		let promise = new Promise(executorR3B);
		promise
		.then(pgui.onResolve, pgui.onReject)
		.catch(pgui.onCatch)
		.finally(pgui.onFinally);
	}
}

// Handlers
R3B.resolve = function(envelope){
	window.console.promise.log.resolve(envelope.result.id);
	envelope.pgui.onResolve();
}	

R3B.reject = function(envelope){
	window.console.promise.log.reject(envelope.result.id);
	envelope.pgui.onReject();		
}	

R3B.finally = function(pb, pgui, btn){
	window.console.promise.log.finally(pb.id);
	pgui.onFinally();
	tools.enableBtns(btn);		
}	

R3B.catch = function(error, pb, pgui){
	window.console.promise.log.catch(error);
	pgui.onCatch();		
}	
