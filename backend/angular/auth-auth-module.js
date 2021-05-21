(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["auth-auth-module"],{

/***/ "./src/app/auth/auth-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/auth/auth-routing.module.ts ***!
  \*********************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../signup/signup.component */ "./src/app/signup/signup.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/**
 * These are the two routes which are loaded when the application is loaded. By only loading these two,
 * it then gives the advantage of lazy loading, increases performance. Only load required pages.
 */
var routes = [
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: 'signup', component: _signup_signup_component__WEBPACK_IMPORTED_MODULE_3__["SignupComponent"] },
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());



/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../signup/signup.component */ "./src/app/signup/signup.component.ts");
/* harmony import */ var _angular_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../angular-material.module */ "./src/app/angular-material.module.ts");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth-routing.module */ "./src/app/auth/auth-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"],
                _signup_signup_component__WEBPACK_IMPORTED_MODULE_4__["SignupComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_material_module__WEBPACK_IMPORTED_MODULE_5__["AngularMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _auth_routing_module__WEBPACK_IMPORTED_MODULE_6__["AuthRoutingModule"]
            ]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n  padding-top: 3em;\r\n  text-align: center;\r\n}\r\n\r\n#userRole {\r\n  margin-top: 1.5em;\r\n}\r\n\r\n.textCenter {\r\n  text-align: center;\r\n}\r\n"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-spinner *ngIf=\"isLoading\"></mat-spinner>\r\n<div class=\"container\">\r\n  <form [formGroup]='form' (submit)=\"onLogin()\" *ngIf=\"!isLoading\">\r\n    <div class=\"row\">\r\n      <div class=\"col\">\r\n      </div>\r\n      <div class=\"col-6\">\r\n        <div class=\"card shadow-sm p-3 mb-5 bg-white rounded\" style=\"width: 30rem;\">\r\n          <div class=\"card-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"email\">Email</label>\r\n              <input type=\"email\" class=\"form-control textCenter\" name=\"email\" placeholder=\"Email\" formControlName=\"email\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"password\">Password</label>\r\n              <input type=\"password\" class=\"form-control textCenter\" name=\"password\" placeholder=\"Password\" formControlName=\"password\">\r\n            </div>\r\n            <h6 class=\"card-subtitle mb-2 text-muted\" id=\"userRole\">User Role</h6>\r\n            <div class=\"form-check form-check-inline\">\r\n              <br>\r\n              <input class=\"form-check-input\" type=\"radio\" name=\"role\" id=\"inlineRadio1\" value=\"student\" formControlName=\"role\">\r\n              <label class=\"form-check-label\" for=\"inlineRadio1\">Student</label>\r\n            </div>\r\n            <div class=\"form-check form-check-inline\">\r\n              <input class=\"form-check-input\" type=\"radio\" name=\"role\" id=\"inlineRadio2\" value=\"teacher\" formControlName=\"role\">\r\n              <label class=\"form-check-label\" for=\"inlineRadio2\">Teacher</label>\r\n            </div>\r\n            <div class=\"form-check form-check-inline\">\r\n              <input class=\"form-check-input\" type=\"radio\" name=\"role\" id=\"inlineRadio3\" value=\"admin\" formControlName=\"role\">\r\n              <label class=\"form-check-label\" for=\"inlineRadio3\">Admin</label>\r\n            </div>\r\n            <div>\r\n              <br>\r\n              <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!form.valid\">Login</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.isLoading = false;
    }
    /**
     * When it gets the authentication status, the spinner becomes false.
     */
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authStatusSub = this.authService.getAuthStatus().subscribe(function (authStatus) {
            _this.isLoading = false;
        });
        /**
         * Email, Password and Role validation.
         */
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3)]
            }),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3)]
            }),
            role: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            }),
        });
    };
    /**
     * When login button is clicked, this method is called. If the form is invalid then return. If form is valid then
     * values for the email, password and role will be pushed to the Auth Service, passing it through the UserLogin.
     * Then navigating you to the course.
     */
    LoginComponent.prototype.onLogin = function () {
        if (this.form.invalid) {
            return;
        }
        this.authService.userLogin(this.form.value.email, this.form.value.password, this.form.value.role);
        this.router.navigate(['/course']);
    };
    /**
     * When user navigates away from the login.html it will unsubscribe the subscription so we don't get a memory leak.
     */
    LoginComponent.prototype.ngOnDestroy = function () {
        this.authStatusSub.unsubscribe();
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        })
        /**
         * Login Component handles the user login, subscriptions and form validation.
         */
        ,
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _auth_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/signup/signup.component.css":
/*!*********************************************!*\
  !*** ./src/app/signup/signup.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".textCenter {\r\n  text-align: center;\r\n}\r\n\r\n.container {\r\n  padding-top: 3em;\r\n  text-align: center;\r\n}\r\n\r\n#userRole {\r\n  margin-top: 1.5em;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/signup/signup.component.html":
/*!**********************************************!*\
  !*** ./src/app/signup/signup.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-spinner *ngIf=\"isLoading\"></mat-spinner>\r\n<div class=\"container\">\r\n    <form [formGroup]='form' (submit)=\"onSignup()\" *ngIf=\"!isLoading\">\r\n        <div class=\"row\">\r\n            <div class=\"col\">\r\n            </div>\r\n            <div class=\"col-6\">\r\n              <div class=\"card shadow-sm p-3 mb-5 bg-white rounded\" style=\"width: 30rem;\">\r\n                <div class=\"card-body\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"email\">Email</label>\r\n                    <input type=\"email\" class=\"form-control textCenter\" name=\"email\" placeholder=\"Email\" formControlName=\"email\">\r\n                  </div>\r\n                  <div class=\"form-group\">\r\n                    <label for=\"password\">Password</label>\r\n                    <input type=\"password\" class=\"form-control textCenter\" name=\"password\" placeholder=\"Password\" formControlName=\"password\">\r\n                  </div>\r\n                  <h6 class=\"card-subtitle mb-2 text-muted\" id=\"userRole\">User Role</h6>\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <br>\r\n                    <input class=\"form-check-input\" type=\"radio\" name=\"role\" id=\"inlineRadio1\" value=\"student\" formControlName=\"role\">\r\n                    <label class=\"form-check-label\" for=\"inlineRadio1\">Student</label>\r\n                  </div>\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <input class=\"form-check-input\" type=\"radio\" name=\"role\" id=\"inlineRadio2\" value=\"teacher\" formControlName=\"role\">\r\n                    <label class=\"form-check-label\" for=\"inlineRadio2\">Teacher</label>\r\n                  </div>\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <input class=\"form-check-input\" type=\"radio\" name=\"role\" id=\"inlineRadio3\" value=\"admin\" formControlName=\"role\">\r\n                    <label class=\"form-check-label\" for=\"inlineRadio3\">Admin</label>\r\n                  </div>\r\n                  <div>\r\n                    <br>\r\n                    <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!form.valid\">Sign Up</button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col\"></div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n"

/***/ }),

/***/ "./src/app/signup/signup.component.ts":
/*!********************************************!*\
  !*** ./src/app/signup/signup.component.ts ***!
  \********************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService, fb) {
        this.authService = authService;
        this.fb = fb;
        this.isLoading = false;
    }
    SignupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authStatusSub = this.authService.getAuthStatus().subscribe(function (authStatus) {
            _this.isLoading = false;
        });
        /**
         * Email, Password and Role validation.
         */
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3)]
            }),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3)]
            }),
            role: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            })
        });
    };
    /**
    * When Signup button is clicked, this method is called. If the form is invalid then return. If form is valid then
     * values for the email, password and role will be pushed to the Auth Service, passing it through the CreateUser.
     */
    SignupComponent.prototype.onSignup = function () {
        if (this.form.invalid) {
            return;
        }
        this.authService.createUser(this.form.value.email, this.form.value.password, this.form.value.role);
    };
    /**
     * When user navigates away from the signup.html it will unsubscribe the subscription so we don't get a memory leak.
     */
    SignupComponent.prototype.ngOnDestroy = function () {
        this.authStatusSub.unsubscribe();
    };
    SignupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(/*! ./signup.component.html */ "./src/app/signup/signup.component.html"),
            styles: [__webpack_require__(/*! ./signup.component.css */ "./src/app/signup/signup.component.css")]
        })
        /**
         * Signup Component handles the user signup, subscriptions and form validation.
         */
        ,
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ })

}]);
//# sourceMappingURL=auth-auth-module.js.map