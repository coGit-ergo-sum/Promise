{

    function initalizePB(pb, pgui){

		pb.interval = 1;

		pb.probabilities.resolve = 70;
		pb.probabilities.error   =  0;		
		pb.probabilities.reject  = 20;
		pb.probabilities.timeout = 10;
	
		tools.append2Demo(pb, 'tdS1C');
		tools.prepend(pgui.$td, pb.$tr);		
    }

    debugger;

    let pb1 = new ProgressBar('ProgressBar1');
    let pb2 = new ProgressBar('ProgressBar2');
    let pb3 = new ProgressBar('ProgressBar3');

	let pgui1 = new PromiseGUI(1);	
	let pgui2 = new PromiseGUI(1);	
	let pgui3 = new PromiseGUI(1);		

    initalizePB(pb1, pgui1)
    initalizePB(pb2, pgui2)
    initalizePB(pb3, pgui3)
	

	function XbtnS1C_onclick(btn) {

        console.clear();

        tools.resetAll([pb1, pb2, pb3], [pgui1, pgui2, pgui3]);

        debugger;

        function onResolve1(){
            pgui1.onResolve();
            pb2.executor(onResolve2, onReject2)
        }

        function onResolve2(){
            pgui2.onResolve();
            pb3.executor(pgui3.onResolve, onReject3)
        }

        let onReject2 = () => pgui2.onReject();
        let onReject3 = () => pgui3.onReject();

        // This is the inception point -----------
        pb1.executor(onResolve1, pgui1.onReject);
        // ---------------------------------------

	}

    function btnS1C_onclick(btn) {

        console.clear();

        tools.resetAll([pb1, pb2, pb3], [pgui1, pgui2, pgui3]);

        debugger;

        // And here it is—callback hell.
        pb1.executor(
            () => {
            pgui1.onResolve()   
            pb2.executor(() => {
                pgui2.onResolve()   
                pb3.executor(pgui3.onResolve, pgui3.onReject)
            }, pgui2.onReject)
        }, pgui1.onReject);


	}
}

