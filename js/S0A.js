


S0 = {};

S0.progressBar = new ProgressBar('progressBar');

tools.append(S0.progressBar, 'tdS0A');	

S0.progressBar.probabilities.resolve  =  70;

S0.progressBar.probabilities.reject   =  10;
S0.progressBar.probabilities.error    =  10;
S0.progressBar.probabilities.timeout  =  10;

S0.progressBar.interval =  2;

function btnS0AStartS_onclick(btn){
		
	MoveHtml('#divSync');
	S0.progressBar.reset();
	S0.progressBar.green();

	let wMax = Math.floor(100 * Math.random());
	let w = 0;

	debugger;
	
	while (true) {
		S0.progressBar.width(w);
		w++;

		if(w > wMax){ break; }
	}
}

	

function btnS0AStartA_onclick(btn){
		
	MoveHtml('#divAsync');
	S0.progressBar.reset();
	S0.progressBar.green();

	let wMax = Math.floor(100 * Math.random());
	let w = 0;

	debugger;

	let intervalId = setInterval(() => {
		S0.progressBar.width(w);
		w++;

		if(w > wMax){ clearInterval(intervalId);}
	}, 8);
}	


// In this example 'info' is a string but can be anything. 
function onResolve(info) {
	alert(`promise.then onResolve -> ${info}`);
}	
	
// 'jse' should be a javascript Error object. 
function onReject(jse) {
	alert(`promise.then onReject -> ${jse.message}`);
}

// 'jse' should be a javascript Error object. 
function onCatch(jse) {		
	alert(`promise.catch onCatch -> ${jse.message}`);
}

// 'onFinally' does expect any parameter. 
function onFinally() {
	alert(`promise.finally onFinally`);
}

function btnI41_onclick(btn){

	function executor(resolve, reject) {

		debugger;

		// This will call 'onResolve'.
		resolve("executor resolved");
	}

	new Promise(executor)
		.then(onResolve, onReject)
		.catch(onCatch)
		.finally(onFinally);

}	
function btnI42_onclick(btn){

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

		// 'Promise' will call 'onReject' passing an error as a parameter
		throw new Error('executor error thown');
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
