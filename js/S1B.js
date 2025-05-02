///var S1B = {};
{
    let pb = new ProgressBar('ProgressBar');

    pb.probabilities.resolve  =  50;
    pb.probabilities.reject   =  17;
    pb.probabilities.error    =  17;
    pb.probabilities.timeout  =  16;

    tools.append2Demo(pb, 'tdS1B');

    let pgui = new PromiseGUI(1);		
    tools.prepend(pgui.$td, pb.$tr);	

    // Handling of an ASynchronous function by callbacks (no 'Promise')
	function btnS1B_onclick(btn) {
		try{
			console.clear();

			// Cleans the layout of the PromiseGUI
			pgui.reset();		

			// Keep the browser in 'debug-mode' to show the live code.
			debugger;

			// 'executor' can run independently of the 'Promise'.
			pb.executor(pgui.onResolve, pgui.onReject);
		}

		// This is the caught session.
		catch(e){
			pgui.onCatch;
		}
		
		
		// This is the 'finally' session.
		finally{
			pgui.onFinally;
		}	
	}
}






// var S1B = {};

// S1B.pb = new ProgressBar('ProgressBar');


// S1B.pb.probabilities.resolve  =  48;
// S1B.pb.probabilities.reject   =  16;
// S1B.pb.probabilities.error    =  16;
// S1B.pb.probabilities.timeout  =  16;
    
// {
//     tools.append2Demo(S1B.pb, 'tdS1B');

//     S1B.pgui = new PromiseGUI(1);		
//     tools.prepend(S1B.pgui.$td, S1B.pb.$tr);	
//     S1B.pgui


//     S1B.btnS1B_onclick = function(btn){

//         try{
//             console.clear();
//             pgui.reset();		
            
//             debugger;

//             pb.executor(pgui.onResolve, pgui.onReject);

//         }
//         catch(jse){
//             pgui.onCatch;
//         }
//         finally{
//             pgui.onFinally;
//         }	
//     }


// }