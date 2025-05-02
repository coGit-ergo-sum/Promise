
var S1E = {};




    S1E.n = 5;
	
	S1E.pbs   = [];
	S1E.pguis = [];

	
	for(let i = 0; i < S1E.n; i++){
		
		S1E.pbs[i] = new ProgressBar('ProgressBar' + i);

		S1E.pbs[i].interval = 5;

		S1E.pbs[i].probabilities.resolve = 90;

		S1E.pbs[i].probabilities.error   =  0;		
		S1E.pbs[i].probabilities.reject  =  5;
		S1E.pbs[i].probabilities.timeout =  5;
	
		tools.append2Demo(S1E.pbs[i], 'tdS1E');
		
		S1E.pguis[i] = new PromiseGUI(1);		
		tools.prepend(S1E.pguis[i].$td, S1E.pbs[i].$tr);	
	}	




   
    // Handling of an ASynchronous function by callbacks (no 'Promise')
	async function btnS1E3_onclick(btn) {

        tools.resetAll(S1E.pbs, S1E.pguis)

        debugger;

        for (let i = 0; i < S1E.pbs.length; i++) {
            await new Promise(S1E.pbs[i].executor);
        }
    }