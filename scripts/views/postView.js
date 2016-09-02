class PostView {
    constructor(mainContentSelector, wrapperSelector) {
        this._mainContentSelector = mainContentSelector;
        this._wrapperSelector = wrapperSelector
    }

    showCreatePostPage(data, isLoggedIn) {
        let _that = this;

        let requestTemplate;

        if (isLoggedIn) {
            requestTemplate = "templates/form-user.html";
        }
        else {
            requestTemplate = "templates/form-guest.html";
        }

        $.get(requestTemplate, function (template) {
            let renderedTemplate = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedTemplate);

            $.get('templates/create-post.html', function (template) {
                let renderedLogin = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderedLogin);

                $('#author').val(data.fullName);

                $('#create-new-post-request-button').on('click', function (ev) {
                    let title = $('#title').val();
                    let author = $('#author').val();
                    let content = $('#content').val();
                    let date = moment().format("MMM Do YYYY");


                    let data = {
                        title: title,
                        content: content,
                        author: author,
                        date: date
                    };

                    triggerEvent('createNewPost', data);
                }) 
            })

        });
    }

    showSinglePost() {
            $('a.single-post-id').click(function (ev) {
            alert('Hellow world');
            ev.preventDefault();
        });
    }
}

    

