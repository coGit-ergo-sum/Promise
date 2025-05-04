
{

    let n = 5;
	
	let pbs1   = [];
	let pguis1 = [];

    let pbs2   = [];
	let pguis2 = [];
    
    let pbs3   = [];
	let pguis3 = [];

    initialize(pbs1, pguis1, 'tdS1D1');
    initialize(pbs2, pguis2, 'tdS1D2');
    initialize(pbs3, pguis3, 'tdS1D3');

	function initialize(pbs, pguis, tdId){
        for(let i = 0; i < n; i++){
            
            pbs[i] = new ProgressBar('ProgressBar' + i);

            pbs[i].interval = 5;

            // pbs[i].probabilities.resolve = 74;
            // pbs[i].probabilities.error   =  2;		
            // pbs[i].probabilities.reject  = 12;
            // pbs[i].probabilities.timeout = 12;


            // pbs[i].probabilities.resolve = 25;
            // pbs[i].probabilities.error   = 23;		
            // pbs[i].probabilities.reject  = 24;
            // pbs[i].probabilities.timeout = 28;   
            
            
            pbs[i].probabilities.resolve = 76;
            pbs[i].probabilities.error   =  8;		
            pbs[i].probabilities.reject  =  8;
            pbs[i].probabilities.timeout =  8;  
        
            tools.append2Demo(pbs[i], tdId);
            
            pguis[i] = new PromiseGUI(1);		
            tools.prepend(pguis[i].$td, pbs[i].$tr);	
        }	
    }

    

    // Handling of an ASynchronous function by callbacks (no 'Promise')
    function btnS1D1_onclick(btn) {

        tools.resetAll(pbs1, pguis1)

        debugger;

        pbs1[0].executor(() => {
            pguis1[0].onResolve()
            pbs1[1].executor(() => {
                pguis1[1].onResolve()
                pbs1[2].executor(() => {
                    pguis1[2].onResolve()
                    pbs1[3].executor(() => {
                        pguis1[3].onResolve()
                        pbs1[4].executor(pguis1[4].onResolve, pguis1[4].onReject)
                    }, pguis1[3].onReject)
                }, pguis1[2].onReject)
            }, pguis1[1].onReject)
        }, pguis1[0].onReject)

    }

    function btnS1D2_onclick(btn) { // Renaming to avoid confusion with previous attempts
        
        tools.resetAll([pbs2[0], pbs2[1], pbs2[2], pbs2[3], pbs2[4]], [pguis2[0], pguis2[1], pguis2[2], pguis2[3], pguis2[4]]);
        
        debugger;
    
        const executeStep = (pb, onResolveGUI, onRejectGUI, nextExecutor) => {
            return new Promise((resolve, reject) => {
                pb.executor(
                    () => {
                        onResolveGUI.onResolve();
                        resolve(); // Resolve the Promise when this step succeeds
                    },
                    (error) => {
                        onRejectGUI.onReject(error);
                        reject(error); // Reject the Promise when this step fails
                    }
                );
            }).then(() => {
                if (nextExecutor) {
                    return nextExecutor(); // Return the Promise of the next step
                }
                return Promise.resolve(); // End of the chain
            });
        };
    
        executeStep(pbs2[0], pguis2[0], pguis2[0], () =>
            executeStep(pbs2[1], pguis2[1], pguis2[1], () =>
                executeStep(pbs2[2], pguis2[2], pguis2[2], () =>
                    executeStep(pbs2[3], pguis2[3], pguis2[3], () =>
                        executeStep(pbs2[4], pguis2[4], pguis2[4], null)
                    )
                )
            )
        ).catch((error) => {
            console.error("Errore nella catena:", error);
            // Optionally handle errors that propagate through the chain
        });
    }

    // function btnS1D2_onclick(btn) {
    //     tools.resetAll(pbs2, pguis2);
    //     debugger;
    
    //     const makePromiseStep = (pb) => {
    //         return new Promise((resolve, reject) => {
    //             pb.executor(resolve, reject); // Executor simply resolves or rejects
    //         });
    //     };
    
    //     makePromiseStep(pbs2[0])
    //         .then((result) => {
    //             pguis2[0].onResolve();
    //             return makePromiseStep(pbs2[1]);
    //         })
    //         .then((result) => {
    //             pguis2[1].onResolve();
    //             return makePromiseStep(pbs2[2]);
    //         })
    //         .then((result) => {
    //             pguis2[2].onResolve();
    //             return makePromiseStep(pbs2[3]);
    //         })
    //         .then((result) => {
    //             pguis2[3].onResolve();
    //             return makePromiseStep(pbs2[4]);
    //         })
    //         .then((result) => {
    //             pguis2[4].onResolve();
    //             // Optional: do something with the final result
    //         })
    //         .catch((error) => {
    //             console.error("Errore nella catena:", error);
    //             // Consider more specific error handling for each step if needed
    //             if (pbs2 && pguis2) {
    //                 const index = pbs2.findIndex(p => p && p._state === 'rejected'); // Crude way to find the failing pb
    //                 if (index !== -1 && pguis2[index]) {
    //                     pguis2[index].onReject(error);
    //                 } else if (pguis2[pguis2.length - 1]) {
    //                     pguis2[pguis2.length - 1].onReject(error); // Fallback
    //                 }
    //             }
    //         });
    // }

    // function btnS1D2_onclick(btn) {

    //     tools.resetAll(pbs2, pguis2);
    //     debugger;

    
    //     const makePromiseStep = (pb) => {
    //         return new Promise((resolve, reject) => {
    //             pb.executor(resolve, reject); // L'executor ora si limita a chiamare resolve o reject
    //         });
    //     };
    
 

    //     .then((result) => {
    //         pguis2[1].onResolve();
    //         return makePromiseStep(pbs2[2]);
    //     })
    //     .catch(pguis2[1].onReject)
    //     .then((result) => {
    //         pguis2[2].onResolve();
    //         return makePromiseStep(pbs2[3]);
    //     })
    //     .catch(pguis2[2].onReject)
    //     .then((result) => {
    //         pguis2[3].onResolve();
    //         return makePromiseStep(pbs2[4]);
    //     })            
    //     .catch(pguis2[3].onReject)
    //     .then((result) => {
    //         pguis2[4].onResolve();
    //         // Qui potresti fare qualcosa con il risultato dell'ultimo step, se necessario
    //     })
    //     .catch(pguis2[4].onReject);


    //     // .catch((error) => {
    //     //     // Gestione generica degli errori per tutta la catena
    //     //     console.error("Si è verificato un errore:", error);
    //     //     // Potresti voler chiamare pguis[i].onReject() qui, a seconda della logica
    //     //     // di gestione degli errori che desideri (es. propagare il rifiuto).
    //     // });

            
    // }

    /*
    function btnS1D2_onclick(btn) {

        tools.resetAll(pbs2, pguis2);
    
        debugger;

        function _executor(_resolve, _reject){

        }
    
        const makeStep = (pb, onResolve, onReject) => {
            var promise = new Promise((resolve, reject) => {
                pb.executor(
                    () => {
                        onResolve();
                        resolve();
                    }, () => {
                        onReject();
                        reject();
                    }
                );
            });

            return promise;
        }
    
        makeStep(pbs2[0], pguis2[0].onResolve, pguis2[0].onReject)
        .then(() => makeStep(pbs2[1], pguis2[1].onResolve, pguis2[1].onReject))
        .then(() => makeStep(pbs2[2], pguis2[2].onResolve, pguis2[2].onReject))
        .then(() => makeStep(pbs2[3], pguis2[3].onResolve, pguis2[3].onReject))
        .then(() => makeStep(pbs2[4], pguis2[4].onResolve, pguis2[4].onReject));
    }
    */

    // Handling of an ASynchronous function by callbacks (no 'Promise')
	function btnS1D2_onclickOLD(btn) {

        tools.resetAll(pbs2, pguis2);

		debugger;

        function makeStep(_pb){
            return () => new Promise(_pb.executor)
        } 

        function onResolve0(){
            return new Promise(pbs2[1].executor);
        }
        function onResolve1(){
            return new Promise(pbs2[2].executor);
        }
        function onResolve2(){
            return new Promise(pbs2[3].executor);
        }
        function onResolve3(){
            return new Promise(pbs2[4].executor);
        }

        //onResolve2()


        var p0 = () => new Promise(pbs2[0].executor);
        var p1 = () => new Promise(pbs2[1].executor);
        var p2 = () => new Promise(pbs2[2].executor);
        var p3 = () => new Promise(pbs2[3].executor);
        var p4 = () => new Promise(pbs2[4].executor);

        var promise0 = new Promise(pbs2[0].executor);
        
        var promise1 = promise0.then(() => {return onResolve0();}, pguis2[0].onReject )
        .then(() => {return onResolve1();}, pguis2[1].onReject )
        .then(() => {return onResolve2();}, pguis2[2].onReject )
        .then(() => {return onResolve3();}, pguis2[3].onReject )
        .then(pguis2[4].onResolve, pguis2[4].onReject)

        // new Promise(pbs2[0].executor)
        // .then(() => {pguis2[0].onResolve(); return new Promise(pbs2[1].executor);}, pguis2[0].onReject )
        // .then(() => {pguis2[1].onResolve(); return new Promise(pbs2[2].executor);}, pguis2[1].onReject )
        // .then(() => {pguis2[2].onResolve(); return new Promise(pbs2[3].executor);}, pguis2[2].onReject )
        // .then(() => {pguis2[3].onResolve(); return new Promise(pbs2[4].executor);}, pguis2[3].onReject )
        // .then(pguis2[4].onResolve, pguis2[4].onReject)
	}



    // Handling of an ASynchronous function by callbacks (no 'Promise')
	function btnS1D3_onclick(btn) {

        tools.resetAll(pbs3, pguis3)

        debugger;

        function makeStep(_pb){
            return () => new Promise(_pb.executor)
        } 

        //const makeStep = (pb) => () => new Promise(pb.executor);

        // Costruzione della chain
        let chain = Promise.resolve();  // Promise iniziale risolta

        for (let i = 0; i < pbs3.length; i++) {
            chain = chain.then(makeStep(pbs3[i]), pguis3[i].onReject);
        }
    }
}    


