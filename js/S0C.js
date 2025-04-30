
var S0C = {};

// In this example 'info' is a string but can be anything. 
S0C.onResolve = function(info) {
	alert(`promise.then onResolve ${info}`);
}	
	
// 'jse' should be a javascript Error object. 
S0C.onReject = function(jse) {
	alert(`promise.then onReject ${jse.message}`);
}

// 'jse' should be a javascript Error object. 
S0C.onCatch = function(jse) {		
	alert(`promise.catch onCatch ${jse.message}`);
}

// 'onFinally' does expect any parameter. 
S0C.onFinally = function() {
	alert(`promise.finally onFinally`);
}

S0C.promise;
S0C.btnS0C71_onclick = function(btn) {

	debugger;

	// Generate a random number: 0, 1, or 2
	var alea = Math.floor(Math.random() * 3);

	// Array of executors, each representing a possible outcome
	var executors = [ 
		(resolve, reject) => { resolve('resolved');           }, 
		(resolve, reject) => { reject(new Error('rejected')); },
		(resolve, reject) => { throw new Error('Error');      }
	];

	// Randomly select one executor
	var executor = executors[alea];	

	// Instantiate the Promise and immediately run the selected executor
	S0C.promise = new Promise(executor);

	// Since no callbacks have been provided yet, the Promise can only inform you of its commitment
	alert('Message from the object promise:\n\nI promise I will take care of handling your process.');

	
}

S0C.btnS0C72_onclick = function(btn) {

    // If the Promise has been created...
    if (S0C.promise) {
        // ...we attach the 4 callbacks to handle its outcome.
        S0C.promise
            .then(S0C.onResolve, S0C.onReject)
            .catch(S0C.onCatch)
            .finally(S0C.onFinally);

        // Clear the reference to the Promise to avoid reusing it.
        S0C.promise = null;
    } 
    else {
        // If the Promise hasn't been instantiated yet, notify the user.
        alert('The Promise object has not been instantiated yet. Please click the other button.');
    }
}



S0C.btnI42_onclick = function(btn){

	function executor(resolve, reject) {

		debugger;

		// This will call 'onReject' in the correct way.
		reject(new Error("executor rejected"));
	}

	new Promise(executor)
		.then(onResolve, onReject)
		.catch(onCatch)
		.finally(onFinally);

}	

function btnI43_onclick(btn){

	function executor(resolve, reject) {

		debugger;

		// Error thrown without explicitly using 'throw new Error'
		eval("notExistingFunction()");
	}

	new Promise(executor)
		.then(onResolve, onReject)
		.catch(onCatch)
		.finally(onFinally);

}	

function btnI44_onclick(btn){

	function executor(resolve, reject) {

		debugger;

		// 'Promise' will call 'onCatch' passing an error as a parameter
		throw new Error('executor error thown');
	}	

	new Promise(executor)
		// In the absence of 'onReject', 'onCatch' will be called.
		.then(onResolve) 
		.catch(onCatch)
		.finally(onFinally);

}

function btnI45_onclick(btn){	

	function executor(resolve, reject) {

		debugger;

		// 'Promise' will call 'onReject' passing an error as a parameter
		throw new Error('executor error thown');
	}	

	// A locally defined 'onReject'
	function _onReject(jse) {
		// This is the common 'onReject'
		onReject(jse);
		
		// The 'Promise' will call 'onCatch'
		throw new Error("Error thrown into the 'onReject' callback");
	}
	
	new Promise(executor)
		.then(onResolve, _onReject)
		.catch(onCatch)
		.finally(onFinally);

}	



function btnI46_onclick(btn){	

	

	function executor(resolve, reject) {

		debugger;

		// 'Promise' will call 'onReject' passing an error as a parameter
		throw new Error('1 - executor error thown');
	}	

	// A locally defined 'onReject'
	function _onReject(jse) {
		// This is the common 'onReject'
		onReject(jse) ;

		// The 'Promise' will call 'onCatch'
		throw new Error("2 - Error thrown into the 'onReject' callback");
	}

	// A locally defined 'onCatch'
	function _onCatch(jse) {
		// This is the common 'onCatch'
		onCatch(jse) ;

		// this exception will be sillent.
		throw new Error("3 - Error thrown into the 'onReject' callback");
	}
	
	new Promise(executor)
		.then(onResolve, _onReject)
		.catch(_onCatch)
		.finally(onFinally);

}	
