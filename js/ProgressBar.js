

// This 'object' simulates a generic asynchronous process and exposes the possible outcomes it may have.
// This object will be controlled by the promise, responding with results typical of an asynchronous process.
// This object represents the generic process that the programmer will need to manage with the Promise.
function ProgressBar(id) {
    var _this = this;
    
    // HTML template for the progress bar element
    let _html = '<tr><td><div class="progressBar" id="" title=""><div class="bar" style=""><span></span></div></div></td></tr>';
    
    var _iterations = 0;
    
    this.id = id;    
    
    // Flag indicating whether the process is synchronous or asynchronous
    this.isSynchronous = false;
    
    // The interval in milliseconds between iterations
    this.interval = 15;


	this.probabilities = {resolve: 60, reject: 30, error: 2, timeout: 8};
    
    // The root element of the progress bar
    this.$tr = $(_html);
    this.$progressBar = this.$tr.find('div.progressBar').attr('id', id).attr('title', id);

	// Sets the width of the progress bar
	this.width = function(value) { _$bar.width((value % 101) + '%'); };
    
    // ---------------------------------------------------------- //
    // These are internal variables and functions
    var _$bar = this.$progressBar.find('div.bar');
    let _$span = _$bar.find('span');    
    
    // Function to mark the progress bar with an error class
    var _onCatch = function() { _this.$progressBar.addClass("error"); };

    
    
    // Function to set the text inside the progress bar
    var _text = function(value) { _$span.text(value); };    
    
    let _intervalId = 0;
    let _isStopped = false;
    // ---------------------------------------------------------- //
    
    // Function to stop the progress bar and clear the interval
    this.stop = function() { clearInterval(_intervalId); _isStopped = true; };
    
	this.green = function(){_color('#52BE80');}
	this.gray = function(){_color('#DDDDDD');}
	this.red = function(){_color('#ff4d4d');}
    // Set the background colour of the progress bar

    var _color = function(value) { _$bar.css('background-color', value); };
    
    // Function to reset the progress bar to its initial state
    this.reset = function() {
        _this.stop();
        _iterations = 0;
        _isStopped = false;
        this.width(0);
        _text('');
        _this.$progressBar.removeClass("error");
        _this.gray();
    };
    
    // This is a 'factory' method to create a rejection result object
    // The 'result' returned is not the same as the one used in the 'resolve' function
    this.getRejectionResult = function(_error) {
        let result = {};
        
        result.id = _this.id;
        
        // Include the error that occurred (if any)
        result.error = _error;
        
        return result;
    };
    
    // ----------------------------------------------------------------------------------- //
    // This function is designed to work with 'Promise'. When a 'Promise' calls this function, 
    // it provides two callbacks: 'resolve' and 'reject'.
    // The only thing that 'Promise' expects from this function is that ONE AND ONLY ONE 
    // of the two callbacks is called.
    // Any of the callbacks can be called, passing any value you like:
    // resolve(whatYouWant) xor reject(whatYouWant).
    // If an uncaught exception occurs, 'Promise' treats this as if reject(error) was called.
    //
    // This function should be protected by a 'try-catch' block.
    // It's not, because this is a 'case study'.
    // ----------------------------------------------------------------------------------- //
    
    this.executor = async function(resolve, reject) {
        _this.reset();    

        try {
			
            resolve = resolve || (() => {});
            reject  = reject  || (() => {});

            // ============================================================ //
            let _resolve = function() { 
                _this.stop();
                _this.green();
    
                // The data sent by the promise to the 'then' function
                let _result = { id: _this.id };
    
                resolve(_result);
            };
    
            let _reject = function(_error) {
                _this.stop();
                _this.red();
    
                // The rejection result, which includes the error details
                let _result = _this.getRejectionResult(_error);
                reject(_result); 
            };
    
            // Timeout function in case the process takes too long
            let _timeout = function() {
                _text('timeout');
                let _error = new Error("Timeout");
                _reject(_error);
            };
            
            // Function to handle errors in the progress bar process
            let _error = function(jse) {
                _this.stop();    
                _color('transparent');    
                _onCatch();            
                let _result = _this.getRejectionResult(jse);
                reject(_result);    
            };                    
    
            // Determine the outcome of the process
            //let alea = 1 + Math.floor(99 * Math.random()); 

			// mappo alcune variabili con variabili di comodo perchè 
			// sia piu facile riconoscere le prossime manipolazioni
			let p1 = _this.probabilities.resolve;
			let p2 = _this.probabilities.reject;
			let p3 = _this.probabilities.error;
			let p4 = _this.probabilities.timeout;

			// Inizio la normalizzazione dei dati
			let P = p1 + p2 + p3 + p4 
			
			// e con questo passaggio le variabili sono normalizzate 
			// ad 1: 100%
			p1 = p1 / P;
			p2 = p2 / P;
			p3 = p3 / P;
			p4 = p4 / P;


            // ----------------------------------------------------------------------- //
			// adesso decido quale dovra essere il risultato di questa elaborazione
			// con il vincolo che i quattro possibili risultati abbiano ognuno la 
			// propria possibilità di verificarsi. 
			// Ossia cerco di fare in modo che su 100 ripetizioni di questa elaborazione
			// l'evento is1 si sia presentato p1 volte
			// l'evento is2 si sia presentato p2 volte
			// l'evento is3 si sia presentato p3 volte
			// l'evento is4 si sia presentato p4 volte
			let alea = Math.random(); 
			let is1 =  (0 <= alea) && (alea < p1); 
			let is2 =  (p1 <= alea) && (alea < (p1 + p2)); 		
			let is3 =  ((p1 + p2) <= alea) && (alea < (p1 + p2 + p3)); 
			let is4 =  ((p1 + p2 + p3) <= alea) && (alea < (p1 + p2 + p3 + p4)); 

			// faccio la mappature inversa per identificare i diversi eventi
			let isResolve = is1;
			let isReject  = is2;
			let isError   = is3;
			let isTimeout = is4;
			//debugger;
            // ----------------------------------------------------------------------- //
    
            // Set a random number of iterations based on whether it's a timeout
            // maxIterations can be: 100 or any number between 1 to 99;
            let maxIterations = isTimeout ? 100 : (Math.floor(Math.random() * 99) + 1);
    
			//debugger;

            // Set the initial width of the progress bar
            _this.width(++_iterations);

			function sleepAsync(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			}

			function sleepSync(ms)
			{
				var now = new Date();
				do {} while(new Date()-now < ms);
			}

			var sleep = _this.isSynchronous ? sleepSync : sleepAsync;

			for (let i = 1; i <= maxIterations; i++) {
				iteration();
				await sleep(_this.interval);
			}	

			let msg = "Synchronous error thrown randomly to test the application.";
            // Iteration function which updates the progress bar
            async function iteration() {
                try {
                    if (_iterations >= maxIterations) {
                        if (false) {} 
                        else if (isResolve) { _resolve(); }
                        else if (isReject) { _reject(); }
                        else if (isTimeout) { _timeout(); }
                        else if (isError) { _error(); }
                        else { throw new Error(msg);
                        }
                    } else {					
						_this.width(++_iterations);
                    }
                } catch (jse) {
                    window.console.log(jse);
                    _error(jse);
                }
            }
        } catch (jse) {
            // If an uncaught exception occurs, handle the rejection
            let _result = _this.getRejectionResult(jse);
            reject(_result);
        }
    };

	this.reset();
}