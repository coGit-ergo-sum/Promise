

R0A = {}

R0A.pbsS   = [];
R0A.pbsA   = [];

{

	let n = 5;
	let interval = 1;

	//debugger;

	for(i = 0; i < n; i++){
		
		R0A.pbsS[i] = new ProgressBar('PbS' + i);

		R0A.pbsS[i].probabilities.resolve =  70;
		R0A.pbsS[i].probabilities.reject  =  10;
		R0A.pbsS[i].probabilities.error   =  10;
		R0A.pbsS[i].probabilities.timeout =  10;

		R0A.pbsS[i].interval = interval;
	
		tools.append2Demo(R0A.pbsS[i], 'tdR0AC1');
	}	


	for(i = 0; i < n; i++){
		
		R0A.pbsA[i] = new ProgressBar('PbA' + i);

		R0A.pbsA[i].probabilities.resolve =  70;
		R0A.pbsA[i].probabilities.reject  =  10;
		R0A.pbsA[i].probabilities.error   =  10;
		R0A.pbsA[i].probabilities.timeout =  10;

		R0A.pbsA[i].interval = interval * n;
	
		tools.append2Demo(R0A.pbsA[i], 'tdR0AC2');
	}	

	function btnR0AStartS_onclick(btn){

		tools.disableBtns(btn);					
		tools.reset(R0A.pbsS);
		window.console.clear();
		tools.highlight.clear(btn);

		function loopS(){
			for(i = 0; i < n; i++){				
				R0A.pbsS[i].isSynchronous  = true;	
				R0A.pbsS[i].executor();	 
			}	
		}
		setTimeout(loopS, 1);

		debugger;
		

	}
	

	function btnR0AStartA_onclick(btn){

		tools.disableBtns(btn);					
		tools.reset(R0A.pbsA);
		window.console.clear();
		tools.highlight.clear(btn);

		function loopA(){
			for(i = 0; i < n; i++){
				
				R0A.pbsA[i].isSynchronous  = false;
				R0A.pbsA[i].executor();	 
			}	
		}

		setTimeout(loopA, 1);

		//debugger;
		

	}	
	
}