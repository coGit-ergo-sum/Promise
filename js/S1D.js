
{

    let n = 3;
	
	let pbs   = [];
	let pguis = [];

	
	for(let i = 0; i < n; i++){
		
		pbs[i] = new ProgressBar('ProgressBar' + i);

		pbs[i].interval = 5;

		pbs[i].probabilities.resolve = 90;
		pbs[i].probabilities.error   =  0;		
		pbs[i].probabilities.reject  =  5;
		pbs[i].probabilities.timeout =  5;
	
		tools.append2Demo(pbs[i], 'tdS1D');
		
		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);	
	}	




    // // Handling of an ASynchronous function by callbacks (no 'Promise')
	// function btnS1D0_onclick(btn) {

    //     tools.resetAll(pbs, pguis)

	// 	debugger;

    //     pbs[0].executor(() => {
    //         pbs[1].executor(() => {
    //             pbs[2].executor(() => {
    //                 pbs[3].executor(() => {
    //                     pbs[4].executor(pguis[4].onResolve, pguis[4].onReject)
    //                 }, pguis[3].onReject)
    //             }, pguis[2].onReject)
    //         }, pguis[1].onReject)
    //     }, pguis[0].onReject)

	// }


    // Handling of an ASynchronous function by callbacks (no 'Promise')
	function btnS1D1_onclick(btn) {

        tools.resetAll(pbs, pguis);

		debugger;

        new Promise(pbs[0].executor)
        .then(() => new Promise(pbs[1].executor))
        .then(() => new Promise(pbs[2].executor))
        .then(() => new Promise(pbs[3].executor))
        .then(() => new Promise(pbs[4].executor));
	}

    // Handling of an ASynchronous function by callbacks (no 'Promise')
	function btnS1D2_onclick(btn) {

        tools.resetAll(pbs, pguis)

        debugger;

        function makeStep(_pb){
            return () => new Promise(_pb.executor)
        } 

        //const makeStep = (pb) => () => new Promise(pb.executor);

        // Costruzione della chain
        let chain = Promise.resolve();  // Promise iniziale risolta

        for (let i = 0; i < pbs.length; i++) {
            chain = chain.then(makeStep(pbs[i]));
        }
    }


}    
