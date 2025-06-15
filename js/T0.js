

function btnI01_onclick(btn){

	debugger;

	let w =  Math.floor(100 * Math.random());
    let bkg = `linear-gradient(to right, #3D3 ${w}%, transparent ${w}%)`; 
    document.getElementById('tdI01ProgressBar').style.background = bkg;
	
}

	// Increases the width of the progressBar  Synchronously.
function btnI02_onclick(id) {	
    
    
    document.getElementById('tdI03Message').innerHTML = "synchronous implementation.";
    //document.getElementById('pre2').innerHTML = pre2InnerHTML;
    //document.getElementById('cod2').style.visibility = 'visible';

    let wMax = Math.floor(100 * Math.random());
    let w = 0;

    // This line STARTS the loop
    while (true) {                  		
        let bkg = `linear-gradient(to right, #3D3 ${w}%, transparent ${w}%)`; 
        document.getElementById(id).style.background = bkg;
        w++;
        // This line ENDS the loop
        if (w > wMax) { break;}
    }
}

// Increases the width of the progressBar ASynchronously.
function btnI03_onclick(btn) {	

    document.getElementById('tdI03Message').innerHTML = "<b>asynchronous</b> implementation";    
    document.getElementById('pre3').innerHTML = pre3InnerHTML;

    debugger;

    let wMax = Math.floor(100 * Math.random());
    let w = 0;

    // This line STARTS the loop
    let intervalId = setInterval(() => {		
        let bkg = `linear-gradient(to right, #3D3 ${w}%, transparent ${w}%)`; 
        document.getElementById('tdI03ProgressBar').style.background = bkg;	
        w++;
        // This line ENDS the loop
        if (w > wMax) { clearInterval(intervalId); }
    }, 8);	
}

// Increases the width of the progressBar ASynchronously.
function btnI04_onclick(btn) {	
    // Trasferisce la stringa HTML da uno all'altro
    //document.getElementById('cod2').style.visibility = 'hidden';
    //document.getElementById('cod2').innerHTML = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    document.getElementById('pre3').innerHTML = pre2InnerHTML;
    btnI02_onclick('tdI03ProgressBar')
}

var pre2InnerHTML = document.getElementById('pre2').innerHTML;
var pre3InnerHTML = document.getElementById('pre3').innerHTML;


// var promise1 = new Promise((resolve, reject) =>{resolve(123);});
// promise1.then(alert);
// promise1.then(alert);
// promise1.then(alert);
// promise1.then(alert);

// var promise1 = new Promise((resolve, reject) =>{resolve(333);}).then(alert).then(alert).then(alert).then(alert);


// let promise1 = new Promise(executor1);

// promise1.then(onResolve, onReject);
// promise1.then(onResolve, onReject);
// promise1.then(onResolve, onReject);

// let promise2 = new Promise(executor2);
// promise2
// .then(onResolve, onReject)
// .then(onResolve, onReject)
// .then(onResolve, onReject);

// function getPerson(id) {
	
//     // The asynchronous process with all necessary data
//     function executor(resolve, reject) {
//         setTimeout(() => {
//             try {
//                 // This is just an example of data manipulation	
//                 let people = [
//                     {name : 'John', age : '20'}, 
//                     {name : 'Mary', age : '25'}
//                 ];
//                 resolve(people[id].name);
//             }
//             catch (reason) {
//                 // sends back the error otherwise will be silent
//                 reject(reason);
//             }
//         }, 100);
//     }

//     return new Promise(executor);
// }

// // This is the modern way 'Promises' are used.
// getPerson(1).then(onResolve, onReject);



// function main(){ 

//     function onResolve(employee) {
//         // Do something with 'employee'
//     }

//     function onReject(reason) {
//          // Do something with 'reason'
//     }

//     // This is the modern way 'Promises' are used.
//     getPerson(1).then(onResolve, onReject);

// }



// function getPerson2(id) {
	
//     // The asynchronous process with all necessary data
//     function executor(resolve, reject) {
//         setTimeout(() => {
//             try {
//                 // This is just an example of data manipulation	
//                 let people = [
//                     {name : 'John', age : '20'}, 
//                     {name : 'Mary', age : '25'}
//                 ];
//                 resolve(people[id].name);
//             }
//             catch (reason) {
//                 // sends back the error otherwise will be silent
//                 reject(reason);
//             }
//         }, 100);
//     }

//     return new Promise(executor);
// }

// async function main2(){ 

//     try{
//         // This is the modern way 'Promises' are used.
//         let employee = await getPerson2(1);
//         // Do something with 'employee'
//     }
//     catch(reason){
//         // Do something with 'reason'
//     }

// }
