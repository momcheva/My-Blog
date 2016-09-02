class UserController {
    constructor (userView, requester, baseUrl, appKey) {
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/";
    }
    
    showLoginPage(isLoggedIn){
        this._userView.showLoginPage(isLoggedIn);
    }
    
    showRegisterPage(isLoggedIn){
        this._userView.showRegisterPage(isLoggedIn);
    }
    
    register(data) {
        if (data.username.length < 5) {
          showPopup('error', 'Username must consist of at least 5 symbols.');
          return;
        }

        if (data.fullName.length < 8) {
            showPopup('error', 'Fullname must consist of at least 8 symbols.');
            return;
        }

        if (data.password.length < 6) {
            showPopup('error', 'Password must consist of at least 6 symbols.');
            return;
        }

        if (data.password != data.confirmPassword) {
            showPopup('error', 'Passwords do not match');
        }


        delete data['confirmPassword'];

        let requestUrl = this._baseServiceUrl;

        this._requester.post(
            requestUrl,
            data,
            function successCallback(data) {
                showPopup('success', 'You have successfully registered.');
                redirectUrl('#/login');
            },
            function errorCallback(data) {
                showPopup('error', 'An error has occurred while attempting to register.');
            });
    }


    login(data){
        let requestUrl = this._baseServiceUrl + 'login';
        
        this._requester.post(
            requestUrl,
            data,
            function successCallback(data) {
                showPopup('success', 'You have successfully logged in.');

                sessionStorage['_authToken'] = data._kmd.authtoken;
                sessionStorage['username'] = data.username;
                sessionStorage['fullName'] = data.fullName;

                redirectUrl("#/");
            },
            function errorCallback(data) {
                showPopup('error', 'An error occurred while attempting to login.');
            });
        
    }
    
    
    logout(){
        sessionStorage.clear();

            redirectUrl('#/');
        
    }
}