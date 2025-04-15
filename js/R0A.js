

R0A = {}

R0A.pbsS   = [];
R0A.pbsA   = [];

{

	let n = 1;

	//debugger;

	for(i = 0; i < n; i++){
		
		R0A.pbsS[i] = new ProgressBar('PbS' + i);

		R0A.pbsS[i].resolvePercent = 70;
		R0A.pbsS[i].errorPercent   =  0;
		R0A.pbsS[i].interval       = 10;
		//R0A.pbsS[i].isSynchronous  = true;
	
		tools.append2Demo(R0A.pbsS[i], 'tdR0AC1');
	}	


	for(i = 0; i < n; i++){
		
		R0A.pbsA[i] = new ProgressBar('PbA' + i);

		R0A.pbsA[i].resolvePercent = 70;
		R0A.pbsA[i].errorPercent   =  0;
		R0A.pbsA[i].interval       = 10;
		//R0A.pbsA[i].isSynchronous  = false;
	
		tools.append2Demo(R0A.pbsA[i], 'tdR0AC2');
	}	

	function btnR0AStartS_onclick(btn){

		console.clear();
		tools.disableBtns(btn);

		for(i = 0; i < n; i++){				
			R0A.pbsS[i].isSynchronous  = true;	
			R0A.pbsS[i].executor();	 
		}	

		debugger;
		

	}
	

	function btnR0AStartA_onclick(btn){

		console.clear();
		tools.disableBtns(btn);

		for(i = 0; i < n; i++){
			
			R0A.pbsA[i].isSynchronous  = false;
			R0A.pbsA[i].executor();	 
		}	

		debugger;
		

	}	
	
}