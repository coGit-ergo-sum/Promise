class ProgresBar2 {

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

// ----------------------------------------------------------------------- //
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
