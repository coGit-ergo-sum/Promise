
async function btnR3BThen_onclick(btn){
	tools.reset(R3B.pguis);
	tools.disableBtns(btn);
	console.clear();	
	
	debugger;

	for(let i = 0; i < n; i++){		
		
		let pb   = R3B.pbs[i];
		let pgui = R3B.pguis[i];
		
		try {
			const envelope = await runExecutorAsync(pb, pgui);
			R3B.resolve(envelope);
		} 
		catch (envelope) {
			R3B.reject(envelope);
			R3B.catch(envelope, pb, pgui); // facoltativo se già gestito in R3B.reject
		} 
		finally {
			R3B.finally(pb, pgui, btn);
		}
	}
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



let R3B = {};

{
	let n = 5;
	
	R3B.pbs   = [];
	R3B.pguis = [];
	
	for(let i = 0; i < n; i++){
		
		R3B.pbs[i] = new ProgressBar('ProgressBar' + i);

		R3B.pbs[i].resolvePercent = 70;
		R3B.pbs[i].errorPercent   =  0;
		R3B.pbs[i].interval       = 10;
	
		tools.append2Demo(R3B.pbs[i], 'tdR3BC2');
		
		R3B.pguis[i] = new PromiseGUI(1);		
		tools.prepend(R3B.pguis[i].$td, R3B.pbs[i].$tr);	
	}	
}

// Handlers
R3B.resolve = function(envelope){
	window.console.promise.log.resolve(envelope.result.id);
	envelope.pgui.resolved();
}	

R3B.reject = function(envelope){
	window.console.promise.log.reject(envelope.result.id);
	envelope.pgui.rejected();		
}	

R3B.finally = function(pb, pgui, btn){
	window.console.promise.log.finally(pb.id);
	pgui.fulfilled();
	tools.enableBtns(btn);		
}	

R3B.catch = function(error, pb, pgui){
	window.console.promise.log.catch(error);
	pgui.catched();		
}	