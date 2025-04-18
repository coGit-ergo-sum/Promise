

R0A       = {}
R0A.progressBar   = [];

{

	let n = 5;

	for(i = 0; i < n; i++){

		R0A.pbs[i] = new ProgressBar('PbR0A' + i);

		R0A.pbs[i].probabilities.resolve  =  70;
		R0A.pbs[i].probabilities.reject   =  10;
		R0A.pbs[i].probabilities.error    =  10;
		R0A.pbs[i].probabilities.timeout  =  10;

		R0A.pbs[i].interval =  2;
		debugger;
		R0A.pbs[i].gray();
	
		tools.append2Demo(R0A.pbs[i], 'tdR0AC2');
	}	

	function btnR0AStartS_onclick(btn){
		
		MoveHtml('#divSync');
		resetPBs();

		function sleepSync(milliseconds)
		{
			var startMoment = new Date();
			do {} while ( new Date() - startMoment < milliseconds );
		}

		function loop(progressBar){
			let jMax = Math.floor(100 * Math.random());
			for(j = 0; j < jMax; j++){
				progressBar.width(j);
			}
		}

		for(i = 0; i < n; i++){

			R0A.pbs[i].gray();
			loop(R0A.pbs[i]);			
			R0A.pbs[i].green();
		}

	}

	

	function btnR0AStartA_onclick(btn){
		
		MoveHtml('#divAsync');
		resetPBs();

		function iteration(_pb, _w, _wMax){
			debugger;
			if(_w <= _wMax){
				_pb.width(_w++);
				setTimeout(iteration, _pb.interval * n, _pb, _w, _wMax);
			}
			else{				
				_pb.green();
			}
			
		}

		for(i = 0; i < n; i++){
			let wMax = Math.floor(100 * Math.random());
			
			R0A.pbs[i].gray();
			iteration(R0A.pbs[i], 0, wMax);
		}

	}	

	// ======================================================================================================================== //

	
	function MoveHtml(idSource){
		var html = $(idSource).html();
		$('#preCommon').html(html);
	}

}

	
async function btnR0AStartH_onclick(btn) {
	tools.disableBtns(btn);	
	MoveHtml('#divHybrid');
	resetPBs();

	// funzione che anima una singola progress bar, restituendo una Promise
	function animateProgressBar(pb, wMax) {
		return new Promise(resolve => {
			let w = 0;

			function step() {
				if (w <= wMax) {
					pb.width(w++);
					setTimeout(step, pb.interval * n);
				} else {
					pb.green();
					resolve(); // segnala che ha finito
				}
			}

			pb.gray(); // reset colore
			step(); // parte l'animazione

		});
	}

	// animazione delle progress bar una alla volta, in sequenza
	for (let i = 0; i < n; i++) {
		let pb = R0A.pbs[i];
		let wMax = Math.floor(100 * Math.random());

		await animateProgressBar(pb, wMax); // attende la fine prima di passare alla prossima
	}
}
function resetPBs(){
	for (let i = 0; i < n; i++) {
		R0A.pbs[i].reset();
	}
}
// tools.disableBtns(btn);					
// tools.reset(R0A.pbs);
// window.console.clear();
// tools.highlight.clear(btn);

// function loop(){
// 	for(i = 0; i < n; i++){
// 		R0A.pbs[i].interval  = interval * n;
// 		R0A.pbs[i].isSynchronous  = false;
// 		R0A.pbs[i].executor();	 
// 	}	
// }

// setTimeout(loop, 1);

// tools.disableBtns(btn);					
// tools.reset(R0A.pbs);
// window.console.clear();
// tools.highlight.clear(btn);

// function loop(){
// 	for(i = 0; i < n; i++){		
// 		R0A.pbs[i].interval  = interval;		
// 		R0A.pbs[i].isSynchronous  = true;	
// 		R0A.pbs[i].executor();	 
// 	}	
// }
// setTimeout(loop, 1);