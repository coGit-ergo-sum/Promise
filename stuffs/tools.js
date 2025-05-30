	var tools = {};
	
	tools.highlight = {};
	
	tools.highlight.clear = function (element){
		$(element).removeClass('resolved rejected');
	}
	
	tools.highlight.clearAll = function (element){
		$(element).closest('table').find('button').removeClass('resolved rejected');
	}
	tools.highlight.resolved = function (element){
		$(element).addClass('resolved');
	}
	tools.highlight.rejected = function (element){
		$(element).addClass('rejected');
	}
	
	tools.disableBtns = function (element){
	
		let $context = $(element).closest('table').find('td.btnsContainer');
		$('button', $context).each((index, btn) => tools.disableBtn(btn));
		
	}
	tools.enableBtns = function (element){	
		let $context = $(element).closest('table').find('td.btnsContainer');		
		$('button', $context).each((index, btn) => tools.enableBtn(btn));
	}
	tools.disableBtn = function (btn){
	
		$(btn)
		.prop( "disabled", true )
		.stop(true, false)
		.fadeTo('fast', 0.5);
		
	}
	tools.enableBtn = function (btn){
	
		$(btn)
		.prop( "disabled", false )
		.stop(true, false)
		.fadeTo('fast', 1);
	}
	
	// ====================================================================
	
	
	tools.append = function (pb, tdId){		
		$('#' + tdId).append(pb.$progressBar);
	}

	tools.append2Demo = function (pb, tdId){	
		$('#' + tdId).find('table.demo').append(pb.$tr);
	}
	

	tools.prepend = function (td, tr){			
		$(tr).prepend(td);
	}		

	tools.showCounter = function ($tr, text){
		$tr.find('td.counter').text(text);
	}
	tools.clearCounters = function (element){
		$(element).closest('table').find('td.counter').text('');
	}	
	tools.prependTdCounter = function ($tr){	
	
		let $td = $('<td class="counter" style="width:20px;border:solid 1px transparent;text-align:center;"></td>');
		tools.prepend($td, $tr);	
	}		
	
	tools.resetAll = function(pbs, pguis){

		console.clear();
		
		pbs.forEach(pb => {			
			pb.reset();			
		});

		pguis.forEach(pgui => {			
			pgui.reset();			
		});
	}
	
	tools.stop = function(pbs){
		pbs.forEach(pb => {			
			pb.stop();			
		});
	}

	tools.getPromises = function(pbs, reject){
	
		let promises = [];	

		for(index = 0; index < pbs.length; index++){
			promises[index] = new Promise(pbs[index].executor);

				// required by the closure: does not work properly in a 'for loop'
				let pb = pbs[index];
				
				try{
					pb.executor(resolve, reject);
				}
				catch(jse){
					window.console.log(jse);	
					
					// this ensures '_reject' will always receive the correct type parameter.
					reject(pb)
				}		
		}

		return promises;
	}
	
	tools.getPromise = function(pb, reject){
	


			let promise = new Promise(function(resolve, reject) {
				
				try{
					pb.executor(resolve, reject);
				}
				catch(jse){
					window.console.log(jse);	
					
					// this ensures '_reject' will always receive the correct type parameter.
					reject(pb)
				}
			});				
		

		return promises;
	}
