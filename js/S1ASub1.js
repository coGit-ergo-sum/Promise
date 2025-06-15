
{

    function initalize(pb, pgui, n){

		pb.interval = 2;

		pb.probabilities.resolve = 80;
		pb.probabilities.error   =  0;		
		pb.probabilities.reject  = 10;
		pb.probabilities.timeout = 10;

        pb.appendTo('tdtdS1ASub1pb' + n);
        //pgui.appendTo('tdtdS1ASub1gui' + n);

        let pguiElement = pgui.getTopElement();
        pb.appendPGui(pguiElement);	
		
    }

    let pb1 = new ProgresBar2('ProgressBar1');
    let pb2 = new ProgresBar2('ProgressBar2');
    let pb3 = new ProgresBar2('ProgressBar3');
    let pb4 = new ProgresBar2('ProgressBar4');
    let pb5 = new ProgresBar2('ProgressBar5');

	let pgui1 = new PromiseGUI(1);	
	let pgui2 = new PromiseGUI(1);	
	let pgui3 = new PromiseGUI(1);		
    let pgui4 = new PromiseGUI(1);
    let pgui5 = new PromiseGUI(1);

    initalize(pb1, pgui1, 1)
    initalize(pb2, pgui2, 2)
    initalize(pb3, pgui3, 3)
    initalize(pb4, pgui4, 4)
    initalize(pb5, pgui5, 5)

    // 'NO Promise - callback hell' version
    function btnS1ASub1B1_onclick(btn){

        btn.disabled = true;
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);

        showMessage('&nbsp;');
        
        let alea1 = Math.floor(100 * Math.random());
        //////let total = alea1;

        debugger;

        // Behold! Callback hell in all its glory.
        pb1.executor(
            (value) => {pgui1.onResolve();pgui1.onFinally();pb2.executor(
                (value) => {pgui2.onResolve();pgui2.onFinally();pb3.executor(
                    (value) => {pgui3.onResolve();pgui3.onFinally(); pb4.executor(
                        (value) => {pgui4.onResolve();pgui4.onFinally(); pb5.executor(
                            (value) => {showTotal(value); pgui5.onResolve();pgui5.onFinally(); btn.disabled = false;}, 
                            (reason) => {showReason(reason); pgui5.onReject(); btn.disabled = false;},
                            value);
                    },(reason) => {showReason(reason); pgui4.onReject(); btn.disabled = false;}, value);
                },(reason) => {showReason(reason); pgui3.onReject(); btn.disabled = false;}, value);
            },(reason) => {showReason(reason); pgui2.onReject(); btn.disabled = false;}, value);
        }, (reason) => {showReason(reason); pgui1.onReject(); btn.disabled = false;}, alea1);
        // pb1.executor(
        //     (value) => {total = value; pgui1.onResolve();pgui1.onFinally();pb2.executor(
        //         (value) => {total = value; pgui2.onResolve();pgui2.onFinally();pb3.executor(
        //             (value) => {total = value; pgui3.onResolve();pgui3.onFinally(); pb4.executor(
        //                 (value) => {total = value; pgui4.onResolve();pgui4.onFinally(); pb5.executor(
        //                     (value) => {total = value; showTotal(total); pgui5.onResolve();pgui5.onFinally(); btn.disabled = false;}, 
        //                     (reason) => {showReason(reason); pgui5.onReject(); btn.disabled = false;},
        //                     total);
        //             },(reason) => {showReason(reason); pgui4.onReject(); btn.disabled = false;}, total);
        //         },(reason) => {showReason(reason); pgui3.onReject(); btn.disabled = false;}, total);
        //     },(reason) => {showReason(reason); pgui2.onReject(); btn.disabled = false;}, total);
        // }, (reason) => {showReason(reason); pgui1.onReject(); btn.disabled = false;}, alea1);
    }   




    
    // 'NO Promise - No 'callback hell' version
    function btnS1ASub1B2_onclick(btn){

        console.clear();
        
        btn.disabled = true;

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);
        showMessage('&nbsp;');
        
        let alea1 = Math.floor(100 * Math.random());

        debugger;

        function onResolve1(value){
            pgui1.onResolve();
            pgui1.onFinally();
            pb2.executor(onResolve2, onReject2, value);
        }

        function onResolve2(value){         
            pgui2.onResolve();  
            pgui2.onFinally();
            pb3.executor(onResolve3, onReject3, value);
        }

        function onResolve3(value){
            pgui3.onResolve();
            pgui3.onFinally();
            pb4.executor(onResolve4, onReject4, value);
        }

        function onResolve4(value){
            pgui4.onResolve();
            pgui4.onFinally();
            pb5.executor(onResolve5, onReject5, value);
        }

        function onResolve5(value){
            pgui5.onResolve();
            pgui5.onFinally();
            btn.disabled = false;
            showTotal(value);
        }
          
        let onReject1 = (reason) => {showReason(reason); pgui1.onReject(); btn.disabled = false;}
        let onReject2 = (reason) => {showReason(reason); pgui2.onReject(); btn.disabled = false;}
        let onReject3 = (reason) => {showReason(reason); pgui3.onReject(); btn.disabled = false;}
        let onReject4 = (reason) => {showReason(reason); pgui4.onReject(); btn.disabled = false;}
        let onReject5 = (reason) => {showReason(reason); pgui5.onReject(); btn.disabled = false;}

        // This is the inception point -------------------------
        pb1.executor(onResolve1, onReject1, alea1);
        // -----------------------------------------------------
    }

    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx //
    // This function adds a certain level of complexity (or genericity)
    // into the client code. This is done specifically to demonstrate that
    // the same code that *uses* Promises can seamlessly interact with BOTH:
    // - the native JavaScript Promise implementation
    // - PromisePro implementation 
    //
    // The primary intent here is to prove that PromisePro behaves exactly
    // like the native Promise in this scenario. This allows you to examine
    // PromisePro's source code to understand the underlying mechanics of
    // how the native Promise operates.
    //
    // (Remember: while their behavior is identical here, their internal
    // implementations are distinct.)
    function Promise_PromisePro(btn, new_Promise){

        btn.disabled = true;
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);
        showMessage('&nbsp;');
        
        let alea1 = Math.floor(100 * Math.random());
        //////let total = alea1;

        function onResolve1(value){
            /////total += value;
            pgui1.onResolve();              
            pgui1.onFinally();
            
            function executor(resolve, reject) {
                pb2.executor(resolve, reject, value);
            }

            return new_Promise(executor).then(onResolve2, onReject2);
        }

        function onResolve2(value){
           /////total += value;
            pgui2.onResolve();
            pgui2.onFinally();
            
            function executor(resolve, reject) {
                pb3.executor(resolve, reject, value);
            }
            return new_Promise (executor).then(onResolve3, onReject3);
        }

        function onResolve3(value){
            //////total += value;
            pgui3.onResolve();
            pgui3.onFinally();
            
            function executor(resolve, reject) {
                pb4.executor(resolve, reject, value);
            }
            return new_Promise (executor).then(onResolve4, onReject4);
        }        

        function onResolve4(value){
            //////total += value;
            pgui4.onResolve();
            pgui4.onFinally();
            
            function executor(resolve, reject) {
                pb5.executor(resolve, reject, value);
            }
            return new_Promise (executor).then(onResolve5, onReject5);
        }

        function onResolve5(value){
            //////total += value;
            pgui5.onResolve();
            pgui5.onFinally();
            btn.disabled = false;
            showTotal(value);
        }

        function onReject1(reason){
            showReason(reason);
            pgui1.onReject()
            btn.disabled = false;            
        }

        function onReject2(reason){
            showReason(reason);
            pgui2.onReject()
            btn.disabled = false;
        }

        function onReject3(reason){
            showReason(reason);
            pgui3.onReject()            
            btn.disabled = false;
        }

        function onReject4(reason){
            showReason(reason);
            pgui4.onReject()            
            btn.disabled = false;
        }

        function onReject5(reason){
            showReason(reason);
            pgui5.onReject()            
            btn.disabled = false;
        }

        debugger;

        function executor(resolve, reject) {
            pb1.executor(resolve, reject, alea1);
        }
        new_Promise (executor).then(onResolve1, onReject1);
    }
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx //

    // 'Promise Broken chain' version. USES 'Promise'
    function btnS1ASub1B3_onclick(btn){
        Promise_PromisePro(btn, executor => new Promise(executor));
    }

    // 'PromisePro Broken chain' version. USES 'PromisePro'
    // To show 'Promise' & 'PromisePro' behave exactly the same.
    function btnS1ASub1B4_onclick(btn){
        Promise_PromisePro(btn, executor => new PromisePro(executor));
    }

    // 'Promise chained' version
    function btnS1ASub1B5_onclick(btn){

        btn.disabled = true;
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);
        showMessage('&nbsp;');
        
        let alea1 = Math.floor(100 * Math.random());
   

        function onResolve1(value){
            pgui1.onResolve(); 
            pgui1.onFinally();
            
            function executor(resolve, reject) {
                pb2.executor(resolve, reject, value);
            }           
            return new Promise (executor);
        }

        function onResolve2(value){
            pgui2.onResolve();
            pgui2.onFinally();
            
            function executor(resolve, reject) {
                pb3.executor(resolve, reject, value);
            }     
            return new Promise (executor);
        }

        function onResolve3(value){
            pgui3.onResolve();
            pgui3.onFinally();
            
            function executor(resolve, reject) {
                pb4.executor(resolve, reject, value);
            }     
            return new Promise (executor);
        }

        function onResolve4(value){
            pgui4.onResolve();
            pgui4.onFinally();
            
            function executor(resolve, reject) {
                pb5.executor(resolve, reject, value);
            }     
            return new Promise (executor);
        }

        function onResolve5(value){
            pgui5.onResolve();
            pgui5.onFinally();
            btn.disabled = false;
            showTotal(total);
        }

        function onReject1(reason){
            showReason(reason);
            pgui1.onReject();
            reason.reject = true;
            return Promise.reject(reason);
        }

        function onReject2(reason){
            showReason(reason);
            if(!('reject' in reason)){pgui2.onReject()};
            reason.reject = true;
            return Promise.reject(reason);
        }

        function onReject3(reason){
            showReason(reason);
            if(!('reject' in reason)){pgui3.onReject()};
            reason.reject = true;
            return Promise.reject(reason);
        }

        function onReject4(reason){
            showReason(reason);
            if(!('reject' in reason)){pgui4.onReject()};
            reason.reject = true;
            return Promise.reject(reason);
        }

        function onReject5(reason){
            showReason(reason);
            if(!('reject' in reason)){pgui5.onReject()};
            btn.disabled = false;    
        }

        debugger;
        function executor(resolve, reject) {
            pb1.executor(resolve, reject, alea1);
        }

        new Promise (executor)
            .then(onResolve1, onReject1)
            .then(onResolve2, onReject2)
            .then(onResolve3, onReject3)
            .then(onResolve4, onReject4)
            .then(onResolve5, onReject5);
    }

    
    function showMessage(text){
        document.getElementById('tdS1ASub1Message').innerHTML = text;
    }
    function showTotal(text){
        showMessage(`Total = ${text}`);
    }
    function showReason(reason){
        showMessage(reason.message);
    }
    
}

        /*
        return;

        btn.disabled = true;
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);
        showMessage('&nbsp;');
        
        let alea1 = Math.floor(100 * Math.random());
        let total = alea1;

        function onResolve1(value){
            total += value;
            pgui1.onResolve();              
            pgui1.onFinally();
            
            function executor(resolve, reject) {
                pb2.executor(resolve, reject, total);
            }

            return new Promise (executor).then(onResolve2, onReject2);
        }

        function onResolve2(value){
            total += value;
            pgui2.onResolve();
            pgui2.onFinally();
            
            function executor(resolve, reject) {
                pb3.executor(resolve, reject, total);
            }
            return new Promise (executor).then(onResolve3, onReject3);
        }

        function onResolve3(value){
            total += value;
            pgui3.onResolve();
            pgui3.onFinally();
            
            function executor(resolve, reject) {
                pb4.executor(resolve, reject, total);
            }
            return new Promise (executor).then(onResolve4, onReject4);
        }        

        function onResolve4(value){
            total += value;
            pgui4.onResolve();
            pgui4.onFinally();
            
            function executor(resolve, reject) {
                pb5.executor(resolve, reject, total);
            }
            return new Promise (executor).then(onResolve5, onReject5);
        }

        function onResolve5(value){
            total += value;
            pgui5.onResolve();
            pgui5.onFinally();
            btn.disabled = false;
            showTotal(total);
        }

        function onReject1(reason){
            showReason(reason);
            pgui1.onReject()
            btn.disabled = false;            
        }

        function onReject2(reason){
            showReason(reason);
            pgui2.onReject()
            btn.disabled = false;
        }

        function onReject3(reason){
            showReason(reason);
            pgui3.onReject()            
            btn.disabled = false;
        }

        function onReject4(reason){
            showReason(reason);
            pgui4.onReject()            
            btn.disabled = false;
        }

        function onReject5(reason){
            showReason(reason);
            pgui5.onReject()            
            btn.disabled = false;
        }

        debugger;

        function executor(resolve, reject) {
            pb1.executor(resolve, reject, alea1);
        }
        new Promise (executor).then(onResolve1, onReject1);
        */

        /*
        /*
        btn.disabled = true;
        console.clear();

        tools.resetAll([pb1, pb2, pb3, pb4, pb5], [pgui1, pgui2, pgui3, pgui4, pgui5]);
        showMessage('&nbsp;');
        
        let alea1 = Math.floor(100 * Math.random());
        let total = alea1;

        function onResolve1(value){
            total += value;
            pgui1.onResolve();
            pgui1.onFinally();
            function executor(resolve, reject) {
                pb2.executor(resolve, reject, value);
            }
            return new PromisePro (executor).then(onResolve2, onReject2);
        }

        function onResolve2(value){
            total += value;
            pgui2.onResolve();
            pgui2.onFinally();
            function executor(resolve, reject) {
                pb3.executor(resolve, reject, value);
            }
            return new PromisePro (executor).then(onResolve3, onReject3);
        }

        function onResolve3(value){
            total += value;
            pgui3.onResolve();
            pgui3.onFinally();
            function executor(resolve, reject) {
                pb4.executor(resolve, reject, value);
            }
            return new PromisePro (executor).then(onResolve4, onReject4);
        }        

        function onResolve4(value){
            total += value;
            pgui4.onResolve();
            pgui4.onFinally();
            function executor(resolve, reject) {
                pb5.executor(resolve, reject, value);
            }
            return new PromisePro (executor).then(onResolve5, onReject5);
        }

        function onResolve5(value){
            total += value;
            pgui5.onResolve();
            pgui5.onFinally();
            btn.disabled = false;
            showTotal(total);
        }

        // -------------------------------------------------------------------- //

        function onReject1(reason){
            showReason(reason);
            pgui1.onReject()
            btn.disabled = false;            
        }
        function onReject2(reason){
            showReason(reason);
            pgui2.onReject()
            btn.disabled = false;
        }
        function onReject3(reason){
            showReason(reason);
            pgui3.onReject()            
            btn.disabled = false;
        }
        function onReject4(reason){
            showReason(reason);
            pgui4.onReject()            
            btn.disabled = false;
        }
        function onReject5(reason){
            showReason(reason);
            pgui5.onReject()            
            btn.disabled = false;
        }

        debugger;

        function executor(resolve, reject) {
            pb1.executor(resolve, reject, alea1);
        }

        // ATTENTION: 'PromisePro' is used instead of 'Promise2' only to show 'PromisePro' 
        //             really works as expected  Therefore, the implementation of the 
        //             functions 'then', 'catch', 'finally' can help to understand
        //             how 'Promise' (The real 'Promise') works
        new PromisePro (executor).then(onResolve1, onReject1);
        */