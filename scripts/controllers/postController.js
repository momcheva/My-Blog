class PostController {
    constructor(postView, requester, baseUrl, appKey) {
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts/";
    }

    showCreatePostPage(data, isLoggedIn) {
        this._postView.showCreatePostPage(data, isLoggedIn);
    }

 /*   showSinglePost(data, isLoggedIn) {
        this._postView.showSinglePost(data, isLoggedIn);
    }*/

    createNewPost(data) {

        if (data.title.length < 10) {
            showPopup('error', "Post title must consist of at least 10 symbols.");
            return;
        }
        if (data.content.length < 50) {
            showPopup('error', "Post content must consist of at least 50 symbols.");
            return;
        }

        this._requester.post(this._baseServiceUrl, data,
            function success(responseData) {
                showPopup('success', 'Post created');
                redirectUrl('#/');
            },
            function error(responseData) {
                showPopup('error', 'An error has occurred while attempting to create a new post.');

            });
    }

    editPost(data) {

    }

    deletePost(postId) {

    }


/*    // Attach a submit handler to the form
    $(document).ready(function(){
        $( "#searchForm" ).submit(function( event ) {

    // Stop form from submitting normally
    event.preventDefault();

    // Get some values from elements on the page:
    var $form = $( this ),
        term = $form.find( "input[name='s']" ).val(),
        url = $form.attr( "action" );

    // Send the data using post
    var posting = $.post( url,{s: term});

        });

    // Put the results in a div
    posting.done(function( data ) {
        var content = $( data ).find( "#content" );
        $( "#result" ).empty().append( content );
      });
    });
    */
    
}