(function () {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_Sy6_aaFY"; // Place your appKey from Kinvey here...
    let appSecret = "336eb505094e423bb40f0da1d9a317ff"; // Place your appSecret from Kinvey here...
    var _guestCredentials = "e92689de-9de9-4b6b-b55d-6d427159c5bc.FbdieqLuDrQnB3frx1Ui3JK2+zIpY/ebQWpBNHav+AU="; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...

    //Create AuthorizationService and Requester
    
    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
    let requester = new Requester(authService);

    authService.initAuthorizationType("Kinvey");

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    // Create HomeView, HomeController, UserView, UserController, PostView and PostController

    let homeView = new HomeView(mainContentSelector, selector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);

    

    let userView = new UserView(mainContentSelector, selector);
    let userController = new UserController(userView, requester, baseUrl, appKey);

    
    let postView = new PostView(mainContentSelector,selector);
    let postController = new PostController(postView, requester, baseUrl, appKey);

    initEventServices();

    onRoute("#/", function () {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        if(authService.isLoggedIn()){
            homeController.showUserPage();
        }
        else{
            homeController.showGuestPage();
        }
    });

    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
        let top = $('#post-' + this.params['id']).position().top;
        $(window).scrollTop(top);

    });

    onRoute("#/login", function () {
        // Show the login page...
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        // Show the register page...
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        // Logout the current user...
        userController.logout();
    });

    onRoute('#/posts/create', function () {
        // Show the new post page...
        let data = {
            fullName: sessionStorage['fullName']
        };
       // let fullName = sessionStorage.getItem('fullName')
        postController.showCreatePostPage(data, authService.isLoggedIn());
    });

    bindEventHandler('login', function (ev, data) {
        // Login the user...
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data);
    });

    bindEventHandler('createNewPost', function (ev, data) {
        // Create a new post...
        postController.createNewPost(data);
    });

    run('#/');
})();
