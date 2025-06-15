class ProgresBar2 {
    
    constructor(id) {
        this.id = id;

        // Modifica qui: Aggiungi lo span per il testo all'interno del td della progress bar
        let htmlL = `<td class="tdLeft" title="Input value"></td>`;
        let htmlC = `<td class="progressBar"><span class="progress-text" id="progressText-${id}">0%</span></td>`; // Aggiunto lo span con ID unico
        let htmlR = `<td class="tdRight" title="Output value"></td>`;
        let htmlW = `<tr>${htmlL}${htmlC}${htmlR}</tr>`;

        this.#table = document.createElement("table");
        ////////////////this.#table.style.width = '450px';
        this.#table.innerHTML = htmlW;
        this.#table.classList.add('tblProgressBar');
        this.#tdpb = this.#table.querySelector("td.progressBar");
        this.#tdLeft = this.#table.querySelector("td.tdLeft");
        this.#tdRight = this.#table.querySelector("td.tdRight");
        this.#progressTextSpan = this.#table.querySelector(`#progressText-${id}`); // Seleziona il nuovo span

        // Flag indicating whether the process is synchronous or asynchronous
        this.isSynchronous = false;

        this.probabilities = {resolve: 25, reject: 25, error: 25, timeout: 25};
    }

    #table;
    #tdpb;
    #tdLeft;
    #tdRight;
    #progressTextSpan; // Nuova proprietà per lo span del testo
    
    getHTML(){
        return this.#table.querySelector('tr').innerHTML;
    }

    prependTd($tdElement){
       ////this.#table.querySelector('tr').innerHTML = html + this.#table.querySelector('tr').innerHTML;
       var td = document.createElement('td');
       //debugger;
       //td.innerHTML = '&nbsp;'
       td.style.width = '8px';
       this.#table.querySelector('tr').prepend(td);
       this.#table.querySelector('tr').prepend($tdElement[0]);
    }

    appendPGui(element){
        ////this.#table.querySelector('tr').innerHTML = html + this.#table.querySelector('tr').innerHTML;
        var tr = this.#table.querySelector('tr');

        var td = document.createElement('td');
        td.style.width = '8px';     
        tr.append(td);
        tr.append(element);

        //
        //this.#table.querySelector('tr').append(td); 
        
        var td1 = document.createElement('td');
        td1.innerText = '99';
        //td1.style.
        td1.style.paddingLeft = "5px";
        //td1.style.paddingRight = "5px";
        //tr.append(td1);

                
        var td2 = document.createElement('td');

        //td1.style.paddingLeft = "5px";
        //td1.style.paddingRight = "5px";
        //tr.append(td2);
        
     }
    

    appendTo(elementId){
        document.getElementById(elementId).appendChild(this.#table);
    }

    #red = 'FF4D4D';
    #gray = 'DDDDDD';
    #green = '52BE80';
    #progressBarBgColor = 'FAFAFA'; // Colore di sfondo del td.progressBar quando "vuoto"
    #progressBarFillColor = '333'; // Colore della barra di riempimento

    duration = 1000;

    #color = this.#gray;
    #width = 0;
    #isStop = false;

    #setBar(color, width){

        // keeps width between 0 and 100 (included)
        this.#width = (((width ?? 0) % 101) + 101) % 101;
        this.#color = color;
        // Modifica qui: Usa il colore del riempimento per il linear-gradient
        this.#tdpb.style.background = `linear-gradient(to right, #${this.#color} ${this.#width}%, #${this.#progressBarBgColor} ${this.#width}%)`;
        // Aggiorna il testo all'interno dello span
        this.#progressTextSpan.textContent = `${this.#width}%`;
    }

    green(){this.#setBar(this.#green, this.#width);}
    gray(){this.#setBar(this.#gray, this.#width);}
    red(){this.#setBar(this.#red, this.#width);}

    width = function(value){
        value = (((value ?? 0) % 101) + 101) % 101;
        this.#setBar(this.#color, value);
    }

    reset(){
        this.#isStop = false; 
        this.#setBar(this.#gray, 0); // La barra è grigia e a 0%
        this.#tdLeft.innerHTML = '&nbsp;';
        // Il testo della percentuale è già gestito da #setBar(..., 0)
        this.#tdRight.innerHTML = '&nbsp;';
        this.#tdRight.classList.remove("error");
    }


    // GO(value) {
    //     // The Promise constructor strictly expects an executor function with only 'resolve' and 'reject' parameters.
    //     // To allow our asynchronous process to receive 'value', we use an arrow function here
    //     // that calls our class's 'executor' method, passing all necessary arguments.
    //     return new Promise((resolve, reject) => {
    //         this.executor(resolve, reject, value);
    //     });
    // }
    
    // This 'executor' method embodies the logic for our asynchronous operation.
    // While standard Promise executors are designed for two parameters,
    // our process requires 'value' to start. This 'value' is specifically
    // injected into this method via the 'GO()' call.
    executor(resolve, reject, value) {
        this.onResolve = resolve;
        this.onReject = reject;
        this.run(value);
    }

    stop(){
        this.#isStop = true;
    }

    run = function(value){

        let startTime = null;
        let _this = this;

        this.reset();

        this.#tdLeft.innerHTML = value;
        this.#tdLeft.title = 'Input data. (from the caller.)';

        let outcome = this.#getOutcome(this.probabilities);

        if(outcome.isError){ _this.#render(outcome, value);;}

        let maxIterations = outcome.isTimeout ? 100 : (Math.floor(Math.random() * 99) + 1);



        // ================================================================== //
        function animateProgressBar(currentTime) {

            if(_this.#isStop){return;}
            // function throwError(jse){throw jse;} // Questa funzione non è utilizzata e può essere rimossa

            if (!startTime) startTime = currentTime;
            let progress = (currentTime - startTime) / _this.duration;
            if (progress > 1) progress = 1;

            let alea = Math.floor(progress * 100) % 101;

            _this.width(alea); // Questo chiamerà #setBar e aggiornerà il testo

            if (alea < maxIterations) {
                requestAnimationFrame(animateProgressBar);
            }
            else{
                _this.#render(outcome, value + alea);
            }
        }

        requestAnimationFrame(animateProgressBar);
        // ================================================================== //

        return; // 'return' senza valore o 'return;' basta, non 'return' vuoto
    }

    onReject = reason => {};
    onResolve = value => {};

    #render(outcome, value){

        let resolved = 'Process Resolved (fullfilled).';
        let rejected = 'Process Rejected.';

        if(outcome.isTimeout){
            this.red();
            // Il testo Timeout andrebbe nel tdRight o in una sua parte, non sovrapposto alla percentuale
            // this.#tdpb.innerHTML = 'Timeout.'; // Rimuovi questo per mantenere la percentuale
            this.#tdRight.innerHTML = '⚠️';
            this.#tdRight.title = rejected;
            this.onReject(new Error('Timeout.'));
        }
        else if(outcome.isResolve){
            this.green();
            this.#tdRight.innerHTML = value;
            this.#tdRight.title = `Process Resolved (fullfilled). Output value: ${value}`;
            this.onResolve(value);
        }
        else if(outcome.isReject){
            this.red();
            this.#tdRight.innerHTML = '⚠️';
            this.#tdRight.title = rejected;
            this.onReject(new Error('Process was rejected.'));
        }
        else if(outcome.isError){
            this.red();
            this.#tdRight.classList.add("error");
            this.#tdRight.title = 'The process thrown an error.';
            throw new Error('Simulated Internal error');
        }
    }

    // La logica di #getOutcome rimane invariata
    #getOutcome(probabilities){
        let P =
            probabilities.resolve +
            probabilities.reject  +
            probabilities.error   +
            probabilities.timeout;

        let p1 = probabilities.resolve / P;
        let p2 = probabilities.reject  / P;
        let p3 = probabilities.error   / P;

        let alea = Math.random();

        let s1 = p1;
        let s2 = p1 + p2;
        let s3 = p1 + p2 + p3;

        let result = {};
        // Utilizziamo la soluzione corretta memorizzata in precedenza
        result.isResolve = (0 <= alea) && (alea < s1);
        result.isReject  = (s1 <= alea) && (alea < s2);
        result.isError   = (s2 <= alea) && (alea < s3);
        result.isTimeout = (s3 <= alea) && (alea < P); // 'P' qui dovrebbe essere '1' se le probabilità sono già normalizzate a 1

        return result;
    }
}




/*class ProgresBar2 {

    constructor(id) {
        // ❌ ⚠️

        this.id = id; 

  
        let htmlL = `<td class="tdLeft" title="Input value"></td>`
        let htmlC = `<td class="progressBar"></td>`
        let htmlR = `<td class="tdRight" title="Output value"></td>`
        let htmlW = `<tr>${htmlL}${htmlC}${htmlR}</tr>`
        this.#table = document.createElement("table");
        this.#table.innerHTML = htmlW;
        this.#table.classList.add('tblProgressBar');
        this.#tdpb = this.#table.querySelector("td.progressBar"); 
        this.#tdLeft = this.#table.querySelector("td.tdLeft"); 
        this.#tdRight = this.#table.querySelector("td.tdRight"); 
           
        // Flag indicating whether the process is synchronous or asynchronous
        this.isSynchronous = false;

        this.probabilities = {resolve: 25, reject: 25, error: 25, timeout: 25};       
    }


    #table
    #tdpb 
    #tdLeft
    #tdRight

    appendTo(elementId){
        document.getElementById(elementId).appendChild(this.#table);
    }

    #red = 'FF4D4D';
    #gray = 'DDDDDD';
    #green = '52BE80';

    duration = 1000;

    #color = this.#gray;
    #width = 0;
    #setBar(color, width){

        // keeps width between 0 and 100 (included)
        this.#width = (((width ?? 0) % 101) + 101) % 101; 
        this.#color = color;
        this.#tdpb.style.background = `linear-gradient(to right, #${this.#color} ${this.#width}%, transparent ${this.#width}%)`;        
    }

    green(){this.#setBar(this.#green, this.#width);}
    gray(){this.#setBar(this.#gray, this.#width);}
    red(){this.#setBar(this.#red, this.#width);} 

    width = function(value){
        value =  (((value ?? 0) % 101) + 101) % 101; 
        this.#setBar(this.#color, value);
    }

    reset(){
        this.#setBar(this.#gray, 0),
        this.#tdLeft.innerHTML = '&nbsp;';
        this.#tdpb.innerHTML = '&nbsp;';
        this.#tdRight.innerHTML = '&nbsp;';        
        this.#tdRight.classList.remove("error");       
    }

 
    executor(resolve, reject, value){
        this.onResolve = resolve;
        this.onReject = reject;
        this.run(value);
    }   

    run = function(value){
    
        let startTime = null;
        let _this = this;    

        this.reset();

        this.#tdLeft.innerHTML = value;
        this.#tdLeft.title = 'Input data. (from the caller.)';
        
        let outcome = this.#getOutcome(this.probabilities);

        // if(outcome.isError){throw new Error('Simulated Internal error (for test pourposes)');}
        if(outcome.isError){ _this.#render(outcome, value);;}

        // Set a random number of iterations based on whether it's a timeout
        // maxIterations can be: 100 or any number between 1 to 99;
        let maxIterations = outcome.isTimeout ? 100 : (Math.floor(Math.random() * 99) + 1);

  

        // ================================================================== //
		function animateProgressBar(currentTime) {
            
            function throwError(jse){throw jse;}

			if (!startTime) startTime = currentTime;
			let progress = (currentTime - startTime) / _this.duration; 
			if (progress > 1) progress = 1;
			
            let value = Math.floor(progress * 100) % 101;

			_this.width(value);

			if (value < maxIterations) {
				requestAnimationFrame(animateProgressBar);
			}
            else{
                _this.#render(outcome, value);
            }
		}

		requestAnimationFrame(animateProgressBar);
        // ================================================================== //

        //this.width(maxIterations);

        return

    } 

    onReject = reason => {};
    onResolve = value => {};

    #render(outcome, value){

        let resolved = 'Process Resolved (fullfilled).';
        let rejected = 'Process Rejected.';

        if(outcome.isTimeout){
            this.red();            
            this.#tdpb.innerHTML = 'Timeout.';            
            this.#tdRight.innerHTML = '⚠️'; 
            this.#tdRight.title = rejected;
            this.onReject(new Error('Timeout.'));
        }
        else if(outcome.isResolve){
            this.green();
            this.#tdRight.innerHTML = value;
            this.#tdRight.title = `Process Resolved (fullfilled). Output value: ${value}`;
            this.onResolve(value);
        }
        else if(outcome.isReject){
            this.red();
            this.#tdRight.innerHTML = '⚠️';
            this.#tdRight.title = rejected; 
            this.onReject(new Error('Process was rejected.'));
        }
        else if(outcome.isError){            
            this.red();
            this.#tdRight.classList.add("error");
            this.#tdRight.title = 'The process thrown an error.';            
            // this.onReject(new Error('Process was rejected.'));
            throw new Error('Simulated Internal error');
        }
    }

    #getOutcome(probabilities){

        // Data normalization starts here
        let P = 
            probabilities.resolve +
            probabilities.reject  +
            probabilities.error   +
            probabilities.timeout;
        
        // I'm mapping some variables to more convenient ones because
        // it'll be easier to recognise the subsequent manipulations
        let p1 = probabilities.resolve / P;
        let p2 = probabilities.reject  / P;
        let p3 = probabilities.error   / P;

// R4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBisR4DBis--- //
        // Now I'm deciding what the outcome of this processing should be
        // with the constraint that the four possible outcomes each have their
        // own probability of occurring.
        // That is, I'm trying to ensure that over 100 repetitions of this processing
        // the is1 event has occurred p1 times out of 100
        // the is2 event has occurred p2 times out of 100
        // the is3 event has occurred p3 times out of 100
        // the is4 event has occurred p4 times out of 100
        let alea = Math.random(); 

        // sx introduced only to make more readable the next step
        let s1 = p1; 
        let s2 = p1 + p2; 
        let s3 = p1 + p2 + p3; 
        
        let result = {};
        result.isResolve = ( 0 <= alea) && (alea < s1);
        result.isReject  = (s1 <= alea) && (alea < s2);
        result.isError   = (s2 <= alea) && (alea < s3); 
        result.isTimeout = (s3 <= alea) && (alea <  P); 

        return result;
    }
}

*/
