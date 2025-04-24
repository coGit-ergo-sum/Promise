

function btnI1StartS_onclick(btn){
		
	MoveHtml('#divSync');
	R0A.progressBar.reset();
	R0A.progressBar.green();

	let wMax = Math.floor(100 * Math.random());
	let w = 0;
	
	while (true) {
		R0A.progressBar.width(w);
		w++;

		if(w > wMax){ break; }
	}
}

	

function btnI1StartA_onclick(btn){
		
	MoveHtml('#divAsync');
	R0A.progressBar.reset();
	R0A.progressBar.green();

	let wMax = Math.floor(100 * Math.random());
	let w = 0;

	let intervalId = setInterval(() => {
		R0A.progressBar.width(w);
		w++;

		if(w > wMax){ clearInterval(intervalId);}
	}, 8);
}	


// In this example 'info' is a string but can be anything. 
function onResolve(info) {
	alert(`promise.then onResolve ${info}`);
}	
	
// 'jse' should be a javascript Error object. 
function onReject(jse) {
	alert(`promise.then onReject ${jse.message}`);
}

// 'jse' should be a javascript Error object. 
function onCatch(jse) {		
	alert(`promise.catch onCatch ${jse.message}`);
}

// 'onFinally' does expect any parameter. 
function onFinally() {
	alert(`promise.finally onFinally`);
}

function btnI41_onclick(btn){

	function executor(resolve, reject) {
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

