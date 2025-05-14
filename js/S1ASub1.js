
{

    function initalize(pb, pgui){

		pb.interval = 2;

		pb.probabilities.resolve = 80;
		pb.probabilities.error   =  7;		
		pb.probabilities.reject  =  7;
		pb.probabilities.timeout =  6;
	
		tools.append2Demo(pb, 'tdS1ASub1');
		tools.prepend(pgui.$td, pb.$tr);		
    }

    let pb1 = new ProgressBar('ProgressBar1');
    let pb2 = new ProgressBar('ProgressBar2');
    let pb3 = new ProgressBar('ProgressBar3');
    let pb4 = new ProgressBar('ProgressBar4');
    let pb5 = new ProgressBar('ProgressBar5');

	let pgui1 = new PromiseGUI(1);	
	let pgui2 = new PromiseGUI(1);	
	let pgui3 = new PromiseGUI(1);		
    let pgui4 = new PromiseGUI(1);
    let pgui5 = new PromiseGUI(1);

    initalize(pb1, pgui1)
    initalize(pb2, pgui2)
    initalize(pb3, pgui3)
    initalize(pb4, pgui4)
    initalize(pb5, pgui5)

    // 'NO Promise - callback hell' version
    function btnS1ASub1B1_onclick(btn){

        btn.disabled = true;
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);

        debugger;

        // Behold! Callback hell in all its glory.
        pb1.executor(
            () => {pgui1.onResolve();pb2.executor(
                () => {pgui2.onResolve();pb3.executor(
                    () => {pgui3.onResolve(); pb4.executor(
                        () => {pgui4.onResolve(); pb5.executor(
                            () => {pgui5.onResolve(); btn.disabled = false;}, 
                            () => {pgui5.onReject(); btn.disabled = false;});
                    },() => {pgui4.onReject(); btn.disabled = false;});
                },() => {pgui3.onReject(); btn.disabled = false;});
            },() => {pgui2.onReject(); btn.disabled = false;});
        }, () => {pgui1.onReject(); btn.disabled = false;});
    }   
    
    // 'NO Promise - No callback hell' version
    function btnS1ASub1B2_onclick(btn){
        console.clear();
        
        btn.disabled = true;

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);

        debugger;

        function onResolve1(){
            pgui1.onResolve();
            pb2.executor(onResolve2, onReject2);
        }
        function onResolve2(){
            pgui2.onResolve();
            pb3.executor(onResolve3, onReject3);
        }

        function onResolve3(){
            pgui3.onResolve();
            pb4.executor(onResolve4, onReject4);
        }

        function onResolve4(){
            pgui4.onResolve();
            pb5.executor(onResolve5, onReject5);
        }
        function onResolve5(){
            pgui5.onResolve();
            btn.disabled = false;
        }

        
        let onReject1 = () => {pgui1.onReject(); btn.disabled = false;}
        let onReject2 = () => {pgui2.onReject(); btn.disabled = false;}
        let onReject3 = () => {pgui3.onReject(); btn.disabled = false;}
        let onReject4 = () => {pgui4.onReject(); btn.disabled = false;}
        let onReject5 = () => {pgui5.onReject(); btn.disabled = false;}

        // This is the inception point -----------
        pb1.executor(onResolve1, onReject1);
        // ---------------------------------------

    }

    // 'Promise Broken chain' version
    function btnS1ASub1B3_onclick(btn){

        btn.disabled = true;
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);

        function onResolve1(value){
            pgui1.onResolve();            
            return new Promise (pb2.executor).then(onResolve2, onReject2);
        }
        function onResolve2(value){
            pgui2.onResolve();
            return new Promise (pb3.executor).then(onResolve3, onReject3);
        }
        function onResolve3(value){
            pgui3.onResolve();
            return new Promise (pb4.executor).then(onResolve4, onReject4);
        }        
        function onResolve4(value){
            pgui4.onResolve();
            return new Promise (pb5.executor).then(onResolve5, onReject5);
        }
        function onResolve5(value){
            pgui5.onResolve();
            btn.disabled = false;
        }

        function onReject1(reason){
            pgui1.onReject()
            btn.disabled = false;            
        }
        function onReject2(reason){
            pgui2.onReject()
            btn.disabled = false;
        }
        function onReject3(reason){
            pgui3.onReject()            
            btn.disabled = false;
        }
        function onReject4(reason){
            pgui4.onReject()            
            btn.disabled = false;
        }
        function onReject5(reason){
            pgui5.onReject()            
            btn.disabled = false;
        }

        debugger;

        new Promise (pb1.executor).then(onResolve1, onReject1);

    }

    // 'PromisePro Broken chain' version
    // To show the 2 version behave exactly the same.
    function btnS1ASub1B4_onclick(btn){

        btn.disabled = true;
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);

        function onResolve1(value){
            pgui1.onResolve();            
            return new PromisePro (pb2.executor).then(onResolve2, onReject2);
        }

        function onResolve2(value){
            pgui2.onResolve();
            return new PromisePro (pb3.executor).then(onResolve3, onReject3);
        }
        function onResolve3(value){
            pgui3.onResolve();
            return new PromisePro (pb4.executor).then(onResolve4, onReject4);
        }        
        function onResolve4(value){
            pgui4.onResolve();
            return new PromisePro (pb5.executor).then(onResolve5, onReject5);
        }
        function onResolve5(value){
            pgui5.onResolve();
            btn.disabled = false;
        }

        function onReject1(reason){
            pgui1.onReject()
            btn.disabled = false;            
        }
        function onReject2(reason){
            pgui2.onReject()
            btn.disabled = false;
        }
        function onReject3(reason){
            pgui3.onReject()            
            btn.disabled = false;
        }
        function onReject4(reason){
            pgui4.onReject()            
            btn.disabled = false;
        }
        function onReject5(reason){
            pgui5.onReject()            
            btn.disabled = false;
        }

        debugger;

        new PromisePro (pb1.executor).then(onResolve1, onReject1);
        
    }

    // 'Promise chained' version
    function btnS1ASub1B5_onclick(btn){

        btn.disabled = true;
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);

        function onResolve1(value){
            pgui1.onResolve();            
            return new Promise (pb2.executor);
        }

        function onResolve2(value){
            pgui2.onResolve();
            return new Promise (pb3.executor);
        }
        function onResolve3(value){
            pgui3.onResolve();
            return new Promise (pb4.executor);
        }        
        function onResolve4(value){
            pgui4.onResolve();
            return new Promise (pb5.executor);
        }
        function onResolve5(value){
            pgui5.onResolve();
            btn.disabled = false;
        }

        function onReject1(reason){
            pgui1.onReject();
            reason.reject = true;
            return Promise.reject(reason);
        }
        function onReject2(reason){
            if(!('reject' in reason)){pgui2.onReject()};
            reason.reject = true;
            return Promise.reject(reason);
        }
        function onReject3(reason){
            if(!('reject' in reason)){pgui3.onReject()};
            reason.reject = true;
            return Promise.reject(reason);
        }
        function onReject4(reason){
            if(!('reject' in reason)){pgui4.onReject()};
            reason.reject = true;
            return Promise.reject(reason);
        }
        function onReject5(reason){
            if(!('reject' in reason)){pgui5.onReject()};
            btn.disabled = false;    
        }

        debugger;
        
        new Promise (pb1.executor)
            .then(onResolve1, onReject1)
            .then(onResolve2, onReject2)
            .then(onResolve3, onReject3)
            .then(onResolve4, onReject4)
            .then(onResolve5, onReject5);
    }
}



function Wrapper(value){

    function executor(resolve, reject){
        MyAsyncProcess(resolve, reject, value)
    }

    return executor
}


// function proof(){

//     var promise1 = new Promise(executor1);
//     var promise2 = promise1.then(value => {
//         // do something;
//     })
    
//     var promise1 = new Promise(executor1);
//     var promise3 = promise1.then(value => {
//         let promise2 = new Promise(executor2);
//         return promise2;
//     })

//     var promise3 = new Promise(executor1).then(value => {
//         return new Promise(executor2);
//     });

// }

// function CCC(value){

//     new Promise(executor).then
// }


    // function btnS1ASub1B0_onclick(btn){

    //     btn.disabled = true;
        
    //     function executor(resolve){
    //         setTimeout(resolve, 500, "message from executor 0");
    //     }

    //     function onResolve(value){
    //         return `${value} ---> message from onResolve 0`;
    //     }

    //     debugger;

    //     var promise0 = new Promise(executor);
    //     promise0
    //         .then(onResolve)
    //         .then(alert);
    // }
// fetch(`/api/users/${userId}`)
//     .then(response => response.json())
//     .then(data => resolve(data))
//     .catch(error => reject(error));



// function fetchUserData(userId) {
//     return new Promise((resolve, reject) => {
//         // Qui, userId è l'input per l'operazione asincrona
//         fetch(`/api/users/${userId}`)
//             .then(response => response.json())
//             .then(data => resolve(data))
//             .catch(error => reject(error));
//     });
// }

// // Quando chiami fetchUserData, fornisci l'input:
// fetchUserData(123)
//     .then(userData => {
//         console.log("Dati utente:", userData);
//     })
//     .catch(error => {
//         console.error("Errore nel recupero dati:", error);
//     });




//     async function avviaSequenzaProgressBarNonConcatenata() {
//         try {
//           await avviaEVisualizzaProgressBar(pb1, pgui1);
//           await avviaEVisualizzaProgressBar(pb2, pgui2);
//           await avviaEVisualizzaProgressBar(pb3, pgui3);
//           await avviaEVisualizzaProgressBar(pb4, pgui4);
//           console.log("Tutte le ProgressBar sono state completate con successo!");
//         } catch (errore) {
//           console.error("La sequenza è stata interrotta a causa di un rifiuto in:", errore);
//           // Qui potremmo aggiungere logica per "fermare" ulteriormente il processo,
//           // se necessario, a livello superiore.
//         }
//       }
      
//       function avviaEVisualizzaProgressBar(progressBar, promiseGUI) {
//         return new Promise((resolve, reject) => {

      
//           const customExecutor = async (innerResolve, innerReject) => {
//             try {
//               await progressBar.executor(innerResolve, innerReject);
//               promiseGUI.setResolved({ id: progressBar.id });
//               resolve(); // Risolviamo con un valore generico (l'esito è già nella GUI)
//             } catch (error) {
//               promiseGUI.setRejected(error);
//               innerReject(error); // Propaga il rifiuto per interrompere la sequenza
//             }
//           };
      
//           customExecutor(resolve, reject);
//         });
//       }
      
//       // Avvia la sequenza non concatenata
//       ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function xxxx(valore){
//     try {
//         if (typeof onFulfilled === 'function') {
//           const risultatoOnFulfilled = onFulfilled(valore);

//           // Caso 1: onFulfilled restituisce un valore non-Promise
//           if (!(risultatoOnFulfilled instanceof MioPromise) && typeof risultatoOnFulfilled !== 'undefined') {
//             resolveThen(risultatoOnFulfilled);
//           }
//           // Caso 2: onFulfilled restituisce un'altra Promise
//           else if (risultatoOnFulfilled instanceof MioPromise) {
//             risultatoOnFulfilled.then(resolveThen, rejectThen); // "Adotta" lo stato della Promise restituita
//           }
//           // Caso 3: onFulfilled non restituisce nulla (undefined)
//           else {
//             resolveThen(undefined); // La Promise successiva si risolve con undefined
//           }
//         } else {
//           resolveThen(valore); // Se onFulfilled non è una funzione, passa il valore
//         }
//       } catch (errore) {
//         rejectThen(errore); // Se onFulfilled lancia un errore, la Promise successiva si rifiuta
//       }
// }

// function onResolve(ragione){

//     try {
//         if (typeof onRejected === 'function') {
//           const risultatoOnRejected = onRejected(ragione);
//           // Logica simile a onFulfilled per il valore di ritorno di onRejected
//           if (!(risultatoOnRejected instanceof MioPromise) && typeof risultatoOnRejected !== 'undefined') {
//             resolveThen(risultatoOnRejected); // Importante: la Promise successiva si *risolve* se onRejected restituisce un valore
//           } else if (risultatoOnRejected instanceof MioPromise) {
//             risultatoOnRejected.then(resolveThen, rejectThen);
//           } else {
//             resolveThen(undefined);
//           }
//         } else {
//           rejectThen(ragione); // Se onRejected non è una funzione, propaga il rifiuto
//         }
//       } catch (errore) {
//         rejectThen(errore); // Se onRejected lancia un errore, la Promise successiva si rifiuta
//       }

// }


//       function mioThen(promisePrecedente, onFulfilled, onRejected) {
//         return new MioPromise((resolveThen, rejectThen) => {
//           promisePrecedente.then(xxxx, onresolve
//           );
//         });
//       }





