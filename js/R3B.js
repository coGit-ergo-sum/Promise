/*
	let pbR3B = new ProgresBar2('ProgressBarRA2');
	
	pbR3B.probabilities.resolve = 50;
	pbR3B.probabilities.error   = 10;
	pbR3B.probabilities.reject  = 30;
	pbR3B.probabilities.timeout = 10;
		
	let pguiR3B = new PromiseGUI(1);	
	pbR3B.appendTo('tdSR3BPb')	
	pguiR3B.appendTo('tdR3Bgui')	


	function executorR3B(resolve, reject) {
		let alea = Math.floor(100 * Math.random());	
		pbR3B.executor(resolve, reject, alea);
	}





async function runExecutorAsync(pb, pgui) {
	return new Promise((resolve, reject) => {
		try {
			const _resolve = (result) => {
				resolve({ result, pgui });
			};

			const _reject = (result) => {
				reject({ result, pgui });
			};

			pb.executor(_resolve, _reject);
		} catch (jse) {
			window.console.promise.log.catch(jse);

			const rejectionResult = pb.getRejectionResult(jse);
			reject({ result: rejectionResult, pgui });
		}
	});
}

*/


function btnR3BGO_onclick(btn){

	for(let i = 0; i < n; i++){
	
		debugger;

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

let R3B = {};

{
	let n = 5;
	
	R3B.pbs   = [];
	R3B.pguis = [];
	
	for(let i = 0; i < n; i++){
		
		R3B.pbs[i] = new ProgresBar2('ProgressBar' + i);

		//////R3B.pbs[i].interval = 1;

		R3B.pbs[i].probabilities.resolve = 70;
		R3B.pbs[i].probabilities.error   =  0;		
		R3B.pbs[i].probabilities.reject  = 20;
		R3B.pbs[i].probabilities.timeout = 10;
	
		R3B.pbs[i].appendTo('tdR3BProgressBar');
		//tools.append2Demo(R3B.pbs[i], 'tdR3BC2');
		//pbR3B.appendTo('tdR3BC2')	
		
		R3B.pguis[i] = new PromiseGUI(1);	
		//R3B.pguis[i].prependTo(R3B.pguis[i]);
		debugger;
		let html1 = R3B.pguis[i].getHTML();
		let html2 = R3B.pbs[i].getHTML();
		R3B.pbs[i].prependTd(R3B.pguis[i].$td);
		//R3B.pguis[i].appendTo('tdR3BPromiseGui');

		//tools.prepend(R3B.pguis[i].$td, R3B.pbs[i].$tr);	
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