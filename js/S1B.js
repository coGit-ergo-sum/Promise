///var S1B = {};
{
    let pb = new ProgressBar('ProgressBar');

    pb.probabilities.resolve  =  48;
    pb.probabilities.reject   =  16;
    pb.probabilities.error    =  16;
    pb.probabilities.timeout  =  16;

    tools.append2Demo(pb, 'tdS1B');

    let pgui = new PromiseGUI(1);		
    tools.prepend(pgui.$td, pb.$tr);	

    // Handling of an ASynchronous function by callbacks (no 'Promise')
	function btnS1B_onclick(btn) {
		try{
			console.clear();
			pgui.reset();		

			// Keep the browser in 'debug-mode' to show the live code.
			debugger;

			// 'pgui.resolved' & 'pgui.rejected' are the callbacks functions
			// provided to the 'then' function of the 'Promise'.
			pb.executor(pgui.resolved, pgui.rejected);
		}

		// 'pgui.catched' is the callback function
		// provided to the 'catch' function of the 'Promise'.
		catch(e){
			pgui.catched;
		}
		
		// 'pgui.fulfilled' is the callback function
		// provided to the 'finally' function of the 'Promise'.
		finally{
			pgui.fulfilled;
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

//             pb.executor(pgui.resolved, pgui.rejected);

//         }
//         catch(jse){
//             pgui.catched;
//         }
//         finally{
//             pgui.fulfilled;
//         }	
//     }


// }