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

    let pb0 = new ProgressBar('ProgressBar0');
    let pb1 = new ProgressBar('ProgressBar1');
    let pb2 = new ProgressBar('ProgressBar2');
    let pb3 = new ProgressBar('ProgressBar3');
    let pb4 = new ProgressBar('ProgressBar4');

    let pgui0 = new PromiseGUI(1);
	let pgui1 = new PromiseGUI(1);	
	let pgui2 = new PromiseGUI(1);	
	let pgui3 = new PromiseGUI(1);		
    let pgui4 = new PromiseGUI(1);

    initalizePB(pb0, pgui0)
    initalizePB(pb1, pgui1)
    initalizePB(pb2, pgui2)
    initalizePB(pb3, pgui3)
    initalizePB(pb4, pgui4)
	

	function btnS1C_onclick(btn) {

        console.clear();

        tools.resetAll([pb0, pb1, pb2, pb3, pb4], [pgui0, pgui1, pgui2, pgui3, pgui4]);

        debugger;

        function onResolve0(){
            pgui0.onResolve();
            pb1.executor(onResolve1, onReject1)
        }

        function onResolve1(){
            pgui1.onResolve();
            pb2.executor(onResolve2, onReject2)
        }

        function onResolve2(){
            pgui2.onResolve();
            pb3.executor(onResolve3, onReject3)
        }

        function onResolve3(){
            pgui3.onResolve();
            pb4.executor(pgui4.onResolve, onReject4)
        }

        
        let onReject1 = () => pgui1.onReject();
        let onReject2 = () => pgui2.onReject();
        let onReject3 = () => pgui3.onReject();
        let onReject4 = () => pgui4.onReject();

        // This is the inception point -----------
        pb0.executor(onResolve0, pgui0.onReject);
        // ---------------------------------------

	}

    function XbtnS1C_onclick(btn) {

        console.clear();

        tools.resetAll([pb1, pb2, pb3], [pgui1, pgui2, pgui3]);

        debugger;

        // And here it is—callback hell.
        pb1.executor(() => {
            pgui1.onResolve()   
            pb2.executor(() => {
                pgui2.onResolve()   
                pb3.executor(pgui3.onResolve, pgui3.onReject)
            }, pgui2.onReject)
        }, pgui1.onReject);


	}
}

