

	R0A       = {}
	R0A.progressBar = new ProgressBar('PbR0A');


	R0A.progressBar.probabilities.resolve  =  70;
	R0A.progressBar.probabilities.reject   =  10;
	R0A.progressBar.probabilities.error    =  10;
	R0A.progressBar.probabilities.timeout  =  10;

	R0A.progressBar.interval =  2;

	R0A.progressBar.gray();

	tools.append2Demo(R0A.progressBar, 'tdR0AC2');



	// function btnR0AStartS_onclick(btn){
		
	// 	MoveHtml('#divSync');
	// 	R0A.progressBar.reset();
	// 	R0A.progressBar.green();

	// 	let wMax = Math.floor(100 * Math.random());
	// 	let w = 0;
		
	// 	while (true) {
	// 		R0A.progressBar.width(w);
	// 		w++;

	// 		if(w > wMax){ break; }
	// 	}
	// }

	

	// function btnR0AStartA_onclick(btn){
		
	// 	MoveHtml('#divAsync');
	// 	R0A.progressBar.reset();
	// 	R0A.progressBar.green();

	// 	let wMax = Math.floor(100 * Math.random());
	// 	let w = 0;

	// 	let intervalId = setInterval(() => {
	// 		R0A.progressBar.width(w);
	// 		w++;

	// 		if(w > wMax){ clearInterval(intervalId);}
	// 	}, 8);
	// }	



	// ======================================================================================================================== //

	
	function MoveHtmlOLD(idSource){
		var html = $(idSource).html();
		$('#preCommon').html(html);
	}

	function MoveHtml(idSource){
		const sourceElement = document.getElementById(idSource);
		const destinationElement = document.getElementById('preCommon');
	
		// Trasferisce la stringa HTML da uno all'altro
		destinationElement.innerHTML = sourceElement.innerHTML;
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
