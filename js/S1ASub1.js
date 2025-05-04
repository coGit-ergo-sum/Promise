
{

    function initalizePB(pb, pgui){

		pb.interval = 1;

		pb.probabilities.resolve = 75;
		pb.probabilities.error   =  5;		
		pb.probabilities.reject  = 15;
		pb.probabilities.timeout =  5;
	
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

    initalizePB(pb1, pgui1)
    initalizePB(pb2, pgui2)
    initalizePB(pb3, pgui3)
    initalizePB(pb4, pgui4)
    initalizePB(pb5, pgui5)


    function btnS1ASub1B1_onclick(btn){

        btn.disabled = true;
        
        function executor(resolve){
            setTimeout(resolve, 500, "message from executor 0");
        }

        function onResolve(value){
            return `${value} ---> message from onResolve 0`;
        }

        debugger;

        var promise0 = new Promise(executor);
        promise0
            .then(onResolve)
            .then(alert);
    }

    function btnS1ASub1B2_onclick(btn){

        //avviaSequenzaProgressBar();
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);
        
      avviaSequenzaProgressBarNonConcatenata();
    }

    
    function btnS1ASub1B3_onclick(btn){

        btn.disabled = true;
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);

        function onResolve1(value){
            pgui1.onResolve();            
            promise2 = promise1.then(onResolve2, onReject2);
            return new Promise(pb2.executor);
        }

        function onResolve2(value){
            pgui2.onResolve();
            promise3 = promise2.then(onResolve3, onReject3);
            return new Promise(pb3.executor);
        }
        function onResolve3(value){
            pgui3.onResolve();
            promise4 = promise3.then(onResolve4, onReject4);
            return new Promise(pb4.executor);
        }        
        function onResolve4(value){
            pgui4.onResolve();
            promise5 = promise4.then(onResolve5, onReject5);
            return new Promise(pb5.executor);
        }
        function onResolve5(value){
            pgui4.onResolve();
        }
        function onResolve5(value){
            pgui5.onResolve();
            btn.disabled = false;
        }

        function onReject1(value){
            pgui1.onReject()
            btn.disabled = false;            
        }
        function onReject2(value){
            pgui2.onReject()
            btn.disabled = false;
        }
        function onReject3(value){
            pgui3.onReject()            
            btn.disabled = false;
        }
        function onReject4(value){
            pgui4.onReject()            
            btn.disabled = false;
        }
        function onReject5(value){
            pgui5.onReject()            
            btn.disabled = false;
        }

        //debugger;

        var promise1 = null;
        var promise2 = null;
        var promise3 = null;
        var promise4 = null;
        var promise5 = null;

        var promise0 = new Promise(pb1.executor);
        promise1 = promise0.then(onResolve1, onReject1);
        
    }

    async function avviaSequenzaProgressBarNonConcatenata() {
        try {
          await avviaEVisualizzaProgressBar(pb1, pgui1);
          await avviaEVisualizzaProgressBar(pb2, pgui2);
          await avviaEVisualizzaProgressBar(pb3, pgui3);
          await avviaEVisualizzaProgressBar(pb4, pgui4);
          console.log("Tutte le ProgressBar sono state completate con successo!");
        } catch (errore) {
          console.error("La sequenza è stata interrotta a causa di un rifiuto in:", errore);
          // Qui potremmo aggiungere logica per "fermare" ulteriormente il processo,
          // se necessario, a livello superiore.
        }
      }
      
      function avviaEVisualizzaProgressBar(progressBar, promiseGUI) {
        return new Promise((resolve, reject) => {

      
          const customExecutor = async (innerResolve, innerReject) => {
            try {
              await progressBar.executor(innerResolve, innerReject);
              promiseGUI.setResolved({ id: progressBar.id });
              resolve(); // Risolviamo con un valore generico (l'esito è già nella GUI)
            } catch (error) {
              promiseGUI.setRejected(error);
              innerReject(error); // Propaga il rifiuto per interrompere la sequenza
            }
          };
      
          customExecutor(resolve, reject);
        });
      }
      
      // Avvia la sequenza non concatenata





















}

