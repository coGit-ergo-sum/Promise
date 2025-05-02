
{
	
	let pgui = new PromiseGUI(1);
	
	let $tr = $('#tdR1B tr');
	tools.prepend(pgui.$td, $tr);
	
	// let btnR1BResolved =  $('#btnR1BResolved');
	// let btnR1BRejected =  $('#btnR1BRejected');
	// let btnR1BFulfilled =  $('#btnR1BFulfilled');
	// let btnR1BCatched =  $('#btnR1BCatched');
	
	function btnR1BResolved_onclick(btn){
		debugger;
		pgui.reset();
		pgui.onResolve();
	}		
	
	function btnR1BRejected_onclick(btn){
		pgui.reset();
		pgui.onReject();
	}	
	
	function btnR1BFulfilled_onclick(btn){
		pgui.onFinally();
	}
	
	function btnR1BReset_onclick(btn){
		pgui.reset();
	}	
	
	function btnR1BCatched_onclick(btn){
		pgui.onCatch();
	}	
	
	btnR1BReset_onclick();


	function executor(resolve, reject) {
		try{
			eval('notExistingFunction()');
		}
		catch(jse){
			reject("any parameter type you want");
		}		
	}



}


//////////////////////////////////////////
function getUserData(userId, asyncComplete) {
    setTimeout(() => {
        asyncComplete(null, { userId: userId, name: 'John Doe' });
    }, 1000);
}

function getUserPosts(userId, asyncComplete) {
    setTimeout(() => {
        asyncComplete(null, [{ postId: 1, content: 'Hello world' }, { postId: 2, content: 'My second post' }]);
    }, 1000);
}

function getPostComments(postId, asyncComplete) {
    setTimeout(() => {
        asyncComplete(null, [{ commentId: 1, text: 'Great post!' }, { commentId: 2, text: 'Nice one' }]);
    }, 1000);
}

// Callback hell
getUserData(1, function (err, userData) {
    if (err) {
        console.error('Error getting user data');
    } else {
        getUserPosts(userData.userId, function (err, posts) {
            if (err) {
                console.error('Error getting posts');
            } else {
                getPostComments(posts[0].postId, function (err, comments) {
                    if (err) {
                        console.error('Error getting comments');
                    } else {
                        console.log('Comments for post 1:', comments);
                    }
                });
            }
        });
    }
});