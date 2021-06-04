(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./auth/auth.module": [
		"./src/app/auth/auth.module.ts",
		"auth-auth-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error('Cannot find module "' + req + '".');
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/analytics/analyitics.service.ts":
/*!*************************************************!*\
  !*** ./src/app/analytics/analyitics.service.ts ***!
  \*************************************************/
/*! exports provided: AnalyticsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsService", function() { return AnalyticsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BACKEND_URL_Analytics = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl + '/analytics';
var AnalyticsService = /** @class */ (function () {
    function AnalyticsService(http) {
        this.http = http;
        this.analytics = [];
        this.userAnalytics = [];
        this.userAnnotion = [];
        this.analyticsUpdate = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.userAnalyticsUpdate = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.userAnnotationUpdate = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    AnalyticsService.prototype.getAnalytics = function () {
        var _this = this;
        this.http
            .get(BACKEND_URL_Analytics)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data.analytics.map(function (user) {
                return {
                    userId: user.userId,
                    visitDate: user.visitDate,
                    visitDurationSeconds: user.visitDurationSeconds,
                    postId: user.postId
                };
            });
        }))
            .subscribe(function (result) {
            _this.analytics = result;
            _this.analyticsUpdate.next(_this.analytics.slice());
        }, function (error) {
            // console.log(error);
        });
    };
    AnalyticsService.prototype.getClicks = function () {
        var _this = this;
        this.http
            .get(BACKEND_URL_Analytics + '/user-clicks')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data.users.map(function (user) {
                return {
                    user: user
                };
            });
        }))
            .subscribe(function (result) {
            _this.userAnalytics = result;
            _this.userAnalyticsUpdate.next(_this.userAnalytics.slice());
        }, function (error) {
            console.log(error);
        });
    };
    AnalyticsService.prototype.getAnnotationAnalytics = function () {
        var _this = this;
        this.http
            .get(BACKEND_URL_Analytics + '/user-annotation')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data.words.map(function (user) {
                return {
                    word: user.word,
                    userId: user.userId,
                    visitDate: user.visitDate,
                    postId: user.postId
                };
            });
        }))
            .subscribe(function (result) {
            _this.userAnnotion = result;
            _this.userAnnotationUpdate.next(_this.userAnnotion.slice());
        }, function (error) {
            // console.log(error);
        });
    };
    AnalyticsService.prototype.getUserAnalyticsClicks = function () {
        return this.userAnalyticsUpdate.asObservable();
    };
    AnalyticsService.prototype.getWordUpdateListenerTwo = function () {
        return this.analyticsUpdate.asObservable();
    };
    AnalyticsService.prototype.getUserAnnotationClicks = function () {
        return this.userAnnotationUpdate.asObservable();
    };
    AnalyticsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AnalyticsService);
    return AnalyticsService;
}());



/***/ }),

/***/ "./src/app/analytics/analytics.component.css":
/*!***************************************************!*\
  !*** ./src/app/analytics/analytics.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".centerTheButtons {\r\n  text-align: center;\r\n}\r\n\r\n.bgColor {\r\n  background-color: #c3c3c3;\r\n}\r\n"

/***/ }),

/***/ "./src/app/analytics/analytics.component.html":
/*!****************************************************!*\
  !*** ./src/app/analytics/analytics.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <br>\r\n  <div class=\"centerTheButtons\">\r\n    <button class=\"btn btn-secondary\" data-toggle=\"collapse\" href=\"#multiCollapseExample1\" role=\"button\" aria-expanded=\"false\"\r\n      aria-controls=\"multiCollapseExample1\">Clicks Analytics</button>\r\n    <button class=\"btn btn-secondary\" type=\"button\" data-toggle=\"collapse\" data-target=\"#multiCollapseExample2\"\r\n      aria-expanded=\"false\" aria-controls=\"multiCollapseExample2\">User Analytics</button>\r\n    <button class=\"btn btn-secondary\" type=\"button\" data-toggle=\"collapse\" data-target=\"#multiCollapseExample3\"\r\n      aria-expanded=\"false\" aria-controls=\"multiCollapseExample3\">Word Analytics</button>\r\n  </div>\r\n  <br>\r\n  <div class=\"row\">\r\n    <div class=\"col\">\r\n      <div class=\"collapse multi-collapse\" id=\"multiCollapseExample1\">\r\n        <div class=\"card card-body\">\r\n          <table class=\"table table-bordered table-inverse\">\r\n            <thead>\r\n              <tr>\r\n                <th>User ID</th>\r\n                <th>Visits</th>\r\n                <th>Post Visited</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let res of result; let count=index\">\r\n                <th>{{ res.userId }}</th>\r\n                <th>{{ res.visitCount }}</th>\r\n                <th>{{ res.visitPostId }}</th>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col\">\r\n      <div class=\"collapse multi-collapse\" id=\"multiCollapseExample2\">\r\n        <div class=\"card card-body\">\r\n          <table class=\"table table-bordered table-inverse\">\r\n            <thead>\r\n              <tr>\r\n                <th>User ID</th>\r\n                <th>Post Visited</th>\r\n                <th>Visit Date</th>\r\n                <th>Visit Duration In Seconds</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let analytic of analytics; let count=index\">\r\n                <!-- <ng-container *ngIf=\"analytic.visitDurationSeconds >= 5\"> -->\r\n                  <th>{{ analytic.userId }}</th>\r\n                  <th>{{ analytic.postId }}</th>\r\n                  <th>{{ analytic.visitDate }}</th>\r\n                  <th>{{ analytic.visitDurationSeconds }}</th>\r\n                <!-- </ng-container> -->\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col\">\r\n      <div class=\"collapse multi-collapse\" id=\"multiCollapseExample3\">\r\n        <div class=\"card card-body\">\r\n          <table class=\"table table-bordered table-inverse\">\r\n            <thead>\r\n              <tr>\r\n                <th>Word Visited</th>\r\n                <th>User ID</th>\r\n                <th>Visit Date</th>\r\n                <th>Post Visited</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let userAnnotion of userAnnotions; let count=index\">\r\n                <th>{{ userAnnotion.word }}</th>\r\n                <th>{{ userAnnotion.userId }}</th>\r\n                <th>{{ userAnnotion.visitDate }}</th>\r\n                <th>{{ userAnnotion.postId }}</th>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- <br>\r\n  <div class=\"accordion\" id=\"accordionExample\">\r\n    <div class=\"card\">\r\n      <div class=\"card-header\" id=\"headingOne\">\r\n        <h5 class=\"mb-0\">\r\n          <button class=\"btn btn-link\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseOne\" aria-expanded=\"true\"\r\n            aria-controls=\"collapseOne\">\r\n            Clicks Analytics\r\n          </button>\r\n        </h5>\r\n      </div>\r\n      <div id=\"collapseOne\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordionExample\">\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-bordered table-inverse\">\r\n            <thead>\r\n              <tr>\r\n                <th>User ID</th>\r\n                <th>Visits</th>\r\n                <th>Post Visited</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let res of result; let count=index\">\r\n                <th>{{ res.userId }}</th>\r\n                <th>{{ res.visitCount }}</th>\r\n                <th>{{ res.visitPostId }}</th>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" id=\"headingTwo\">\r\n          <h5 class=\"mb-0\">\r\n            <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\">\r\n                User Analytics\r\n            </button>\r\n          </h5>\r\n        </div>\r\n        <div id=\"collapseTwo\" class=\"collapse\" aria-labelledby=\"headingTwo\" data-parent=\"#accordionExample\">\r\n          <div class=\"card-body\">\r\n              <table class=\"table table-bordered table-inverse\">\r\n                  <thead>\r\n                    <tr>\r\n                      <th>User ID</th>\r\n                      <th>Post Visited</th>\r\n                      <th>Visit Date</th>\r\n                      <th>Visit Duration</th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    <tr *ngFor=\"let analytic of analytics; let count=index\">\r\n                      <th>{{ analytic.userId }}</th>\r\n                      <th>{{ analytic.postId }}</th>\r\n                      <th>{{ analytic.visitDate }}</th>\r\n                      <th>{{ analytic.visitDurationSeconds }}</th>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n  </div>\r\n  <br> -->\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/analytics/analytics.component.ts":
/*!**************************************************!*\
  !*** ./src/app/analytics/analytics.component.ts ***!
  \**************************************************/
/*! exports provided: AnalyticsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsComponent", function() { return AnalyticsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _analyitics_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analyitics.service */ "./src/app/analytics/analyitics.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AnalyticsComponent = /** @class */ (function () {
    function AnalyticsComponent(authService, analyticsService) {
        var _this = this;
        this.authService = authService;
        this.analyticsService = analyticsService;
        this.analytics = [];
        this.userClicks = [];
        this.userAnnotions = [];
        this.result = [];
        this.parseVisitData = function (allUsers) {
            _this.result = [];
            allUsers.forEach(function (userData) {
                // For some reason `userData` is an Object with a single "user" property.
                var user = userData.user;
                var userId = user._id;
                user.visits.forEach(function (userVisit) {
                    var visitCount = userVisit.visitCount;
                    var visitPostId = userVisit.postId;
                    // Now we have all the data for a single row!
                    // We have references for "userId", "visitCount", and "visitPostId"
                    _this.result.push({
                        userId: userId,
                        visitCount: visitCount,
                        visitPostId: visitPostId
                    });
                });
            });
            return _this.result;
        };
    }
    AnalyticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.userIsAuthenticated = false;
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService
            .getAuthStatus()
            .subscribe(function (isAuthenticated) {
            _this.userIsAuthenticated = isAuthenticated;
            _this.role = _this.authService.getUserRole();
            _this.isLoading = false;
        });
        this.analyticsService.getAnalytics();
        this.analyticsSub = this.analyticsService
            .getWordUpdateListenerTwo()
            .subscribe(function (analytics) {
            _this.analytics = analytics;
        });
        this.analyticsService.getClicks();
        this.userClicksSub = this.analyticsService
            .getUserAnalyticsClicks()
            .subscribe(function (userClicks) {
            _this.userClicks = userClicks;
            _this.parseVisitData(_this.userClicks);
        });
        this.analyticsService.getAnnotationAnalytics();
        this.userAnnotationSub = this.analyticsService
            .getUserAnnotationClicks()
            .subscribe(function (userAnnotions) {
            _this.userAnnotions = userAnnotions;
        });
    };
    AnalyticsComponent.prototype.ngOnDestroy = function () {
        this.authStatusSub.unsubscribe();
        this.analyticsSub.unsubscribe();
        this.userClicksSub.unsubscribe();
        this.userAnnotationSub.unsubscribe();
    };
    AnalyticsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-analytics',
            template: __webpack_require__(/*! ./analytics.component.html */ "./src/app/analytics/analytics.component.html"),
            styles: [__webpack_require__(/*! ./analytics.component.css */ "./src/app/analytics/analytics.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _analyitics_service__WEBPACK_IMPORTED_MODULE_2__["AnalyticsService"]])
    ], AnalyticsComponent);
    return AnalyticsComponent;
}());



/***/ }),

/***/ "./src/app/angular-material.module.ts":
/*!********************************************!*\
  !*** ./src/app/angular-material.module.ts ***!
  \********************************************/
/*! exports provided: AngularMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularMaterialModule", function() { return AngularMaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AngularMaterialModule = /** @class */ (function () {
    function AngularMaterialModule() {
    }
    AngularMaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"]
            ]
        })
    ], AngularMaterialModule);
    return AngularMaterialModule;
}());



/***/ }),

/***/ "./src/app/annotation/annotation.component.css":
/*!*****************************************************!*\
  !*** ./src/app/annotation/annotation.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n  padding-top: 2em;\r\n  padding-left: 3em;\r\n}\r\n\r\n#stronger {\r\n  padding-right: 5px;\r\n  font-family: \"Times New Roman\", Times, serif;\r\n  font-size: large;\r\n}\r\n\r\n.myStyle {\r\n  font-family: \"Times New Roman\", Times, serif;\r\n  line-height: 1.5;\r\n  font-size: 16px;\r\n  font-weight: 550;\r\n}\r\n\r\n#scrollable {\r\n  margin-top: 2em;\r\n  margin-bottom: 2em;\r\n  outline: 2px solid black;\r\n  outline-offset: 12px;\r\n  font-family: \"Times New Roman\", Times, serif;\r\n  line-height: 2.0;\r\n  font-size: 14px;\r\n  white-space: pre-wrap;\r\n}\r\n\r\n#reference{\r\n  white-space: pre-wrap;\r\n}\r\n\r\n#btnHighLight {\r\n  margin-top: 0.75em;\r\n  min-width: 11.25em;\r\n  visibility: hidden;\r\n}\r\n\r\n#btnShow {\r\n  margin-top: 3em;\r\n}\r\n\r\n#postbtn {\r\n  margin-top: 0.25em;\r\n}\r\n\r\n#postDocbtn {\r\n  margin-top: 1.0em;\r\n}\r\n\r\n#annotation {\r\n  margin-top: 0.5em;\r\n}\r\n\r\n.highlighted {\r\n  background-color: yellow;\r\n  display: inline;\r\n}\r\n\r\n.high {\r\n  background-color: yellow;\r\n  display: inline;\r\n}\r\n\r\n.margin-top {\r\n  margin-top: 0.75em;\r\n  min-width: 11.25em;\r\n}\r\n\r\n#editBtn {\r\n  margin-top: 0.5em;\r\n}\r\n\r\n#deleteBtn {\r\n  margin-top: 1.25em;\r\n}\r\n\r\n#editDocBtn {\r\n  margin-top: 0.5em;\r\n}\r\n\r\n#deleteDocBtn {\r\n  margin-top: 1.25em;\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  max-width: 1200px;\r\n}\r\n\r\n/**\r\n* The loading spinner which is set to the middle.\r\n*/\r\n\r\nmat-spinner {\r\n  margin: auto;\r\n}\r\n\r\n.column.left {\r\n  flex: 0 0 230px;\r\n}\r\n\r\n.column.center {\r\n  flex: 0 0 450px;\r\n  max-width: 450px;\r\n}\r\n\r\n.column.right {\r\n  position: fixed;\r\n  left: 55em;\r\n  max-width: 200px;\r\n}\r\n\r\n#wordRef {\r\n  margin-top: 3em;\r\n}\r\n\r\n.margin-left {\r\n  margin-left: 0.5em;\r\n}\r\n\r\n#difficultWords {\r\n  min-width: 11.25em;\r\n  background-color: #5c85d6;\r\n  border-color: #5c85d6;\r\n}\r\n\r\n#editAnnotation {\r\n  background-color: #2eb8b8;\r\n  border-color: #2eb8b8;\r\n}\r\n\r\n.difScale {\r\n  margin-bottom: 1em;\r\n}\r\n\r\n.textCenter {\r\n  text-align: center;\r\n}\r\n"

/***/ }),

/***/ "./src/app/annotation/annotation.component.html":
/*!******************************************************!*\
  !*** ./src/app/annotation/annotation.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <mat-spinner *ngIf=\"isLoading\"></mat-spinner>\r\n  <ng-container *ngIf=\"!isLoading\">\r\n    <div class=\"column left\">\r\n      <!-- Empty here -->\r\n    </div>\r\n    <div class=\"column center\">\r\n      <!-- Get post by ID Request on backend -->\r\n      <div *ngFor=\"let post of posts;\">\r\n        <ng-template [ngIf]=\"post.id === id\">\r\n          <strong id=\"stronger\">{{ post.header }}</strong>\r\n          <hr>\r\n          <div>\r\n            {{ post.abstract }}\r\n          </div>\r\n          <div id=\"scrollable\">\r\n            {{ selectedPost }}\r\n          </div>\r\n          <div class=\"myStyle\">\r\n            References to the above paper and or extra reading material can be found below:\r\n          </div>\r\n          <br>\r\n          <div id=\"reference\">\r\n            {{ post.references }}\r\n          </div>\r\n          <br>\r\n        </ng-template>\r\n      </div>\r\n    </div>\r\n    <div class=\"column right\">\r\n      <ng-template [ngIf]=\"userIsAuthenticated && this.role == 'teacher' || this.role == 'admin'\">\r\n        <button type=\"button\" id=\"difficultWords\" class=\"btn btn-secondary btn-sm shadow mb-5 rounded\" data-toggle=\"modal\" data-target=\"#exampleModal\" data-backdrop=\"static\" data-keyboard=\"false\">\r\n          Difficult Words\r\n          <i class=\"fas fa-search\"></i>\r\n        </button>\r\n        <div>\r\n          <a class=\"btn btn-warning btn-sm shadow mb-5 rounded\" id=\"btnHighLight\" (click)=\"highlightSelection()\">\r\n            Selected Text\r\n            <i class=\"fas fa-highlighter\"></i>\r\n          </a>\r\n        </div>\r\n      </ng-template>\r\n      <ng-template [ngIf]='word'>\r\n        <form [formGroup]='form'>\r\n          <div class=\"alert alert-warning alert-dismissible fade show shadow rounded\" id=\"annotation\" role=\"alert\">\r\n            <strong>{{ word }}</strong>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)='resetAlertBox(false)'>\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <ng-template [ngIf]=\"userIsAuthenticated && (this.role == 'teacher' || this.role == 'admin')\">\r\n            <div class=\"form-group\">\r\n              <ng-template [ngIf]=\"userIsAuthenticated && showingAnnotation && !editing\">\r\n                <div class=\"alert alert-info shadow rounded\" role=\"alert\">\r\n                  {{ showingAnnotation }}\r\n                </div>\r\n              </ng-template>\r\n              <ng-template [ngIf]=\"userIsAuthenticated && showingAnnotation && editing && !docTrue\">\r\n                <div class=\"alert alert-info\" role=\"alert\">\r\n                  <textarea class=\"form-control\" id=\"exampleFormControlTextarea1\" placeholder=\"{{ showingAnnotation }}\" rows=\"3\" formControlName=\"annotation\"\r\n                    value=\"{{ showingAnnotation }}\"></textarea>\r\n                </div>\r\n                <button class=\"btn btn-success btn-sm\" id=\"saveDocEditBtn\" type=\"button\" (click)='onDocEditSub()' [disabled]=\"!form.valid\">Save Edited Annotation</button>\r\n              </ng-template>\r\n              <ng-template [ngIf]=\"userIsAuthenticated && !showingAnnotation\">\r\n                <textarea class=\"form-control\" id=\"exampleFormControlTextarea1\" placeholder=\"Describe Word\" rows=\"3\" formControlName=\"annotation\"></textarea>\r\n              </ng-template>\r\n            </div>\r\n          </ng-template>\r\n          <ng-template [ngIf]=\"userIsAuthenticated && form.valid && !editing && (this.role == 'teacher' ||  this.role == 'admin')\">\r\n            <button class=\"btn btn-success btn-sm\" id=\"postDocbtn\" type=\"button\" (click)='addToDoc()' [disabled]=\"!form.valid\">Save To This Document</button>\r\n          </ng-template>\r\n          <ng-template [ngIf]=\"userIsAuthenticated && !editing && showingAnnotation && !docTrue && (this.role == 'teacher' ||  this.role == 'admin')\">\r\n            <div>\r\n              <button class=\"btn btn-secondary btn-sm margin-top shadow rounded\" id=\"editAnnotation\" type=\"button\" (click)='onDocEditWord()'>Edit Annotation\r\n                <i class=\"fas fa-pencil-alt margin-left\"></i>\r\n              </button>\r\n            </div>\r\n            <button class=\"btn btn-danger btn-sm margin-top shadow rounded\" type=\"button\" (click)='onDocDelete()'>Delete Annotation\r\n              <i class=\"far fa-trash-alt margin-left\"></i>\r\n            </button>\r\n          </ng-template>\r\n        </form>\r\n        <ng-template [ngIf]=\"userIsAuthenticated && this.role == 'student'\">\r\n          <div class=\"alert alert-info\" role=\"alert\">\r\n            {{ showingAnnotation }}\r\n          </div>\r\n        </ng-template>\r\n      </ng-template>\r\n    </div>\r\n  </ng-container>\r\n</div>\r\n<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Text Scanner</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"modalClosed()\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <form [formGroup]='secondForm'>\r\n        <div class=\"modal-body textCenter\">\r\n          <h6 class=\"card-subtitle mb-2 text-muted textCenter\">Text Scanner Difficulty Scale</h6>\r\n          <div class=\"form-check form-check-inline\">\r\n            <input class=\"form-check-input\" type=\"radio\" name=\"difficulty\" id=\"inlineRadio1\" value=\"beginner\" formControlName=\"difficulty\">\r\n            <label class=\"form-check-label\" for=\"inlineRadio1\">Beginner</label>\r\n          </div>\r\n          <div class=\"form-check form-check-inline\">\r\n            <input class=\"form-check-input\" type=\"radio\" name=\"difficulty\" id=\"inlineRadio2\" value=\"intermediate\" formControlName=\"difficulty\">\r\n            <label class=\"form-check-label\" for=\"inlineRadio2\">Intermediate</label>\r\n          </div>\r\n          <div class=\"form-check form-check-inline difScale\">\r\n            <input class=\"form-check-input\" type=\"radio\" name=\"difficulty\" id=\"inlineRadio3\" value=\"advanced\" formControlName=\"difficulty\">\r\n            <label class=\"form-check-label\" for=\"inlineRadio3\">Advanced</label>\r\n          </div>\r\n          <hr>\r\n          <ng-template [ngIf]=\"!secondForm.value.difficulty\">\r\n            Please pick one of these options!\r\n          </ng-template>\r\n          <ng-template [ngIf]=\"secondForm.value.difficulty\">\r\n            Checking for difficult words could take a few seconds, do you still want to proceed?\r\n          </ng-template>\r\n        </div>\r\n      </form>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\" (click)=\"modalClosed()\">Close</button>\r\n        <ng-template [ngIf]=\"secondForm.value.difficulty\">\r\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"possibleWords()\" data-dismiss=\"modal\">Continue</button>\r\n        </ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/annotation/annotation.component.ts":
/*!****************************************************!*\
  !*** ./src/app/annotation/annotation.component.ts ***!
  \****************************************************/
/*! exports provided: AnnotationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationComponent", function() { return AnnotationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _posts_posts_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../posts/posts.service */ "./src/app/posts/posts.service.ts");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _document_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./document.service */ "./src/app/annotation/document.service.ts");
/* harmony import */ var _highlighter_txt2JSON__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../highlighter/txt2JSON */ "./src/app/highlighter/txt2JSON.js");
/* harmony import */ var _highlighter_jsFunctionManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../highlighter/jsFunctionManager */ "./src/app/highlighter/jsFunctionManager.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AnnotationComponent = /** @class */ (function () {
    function AnnotationComponent(postsService, authService, route, docService) {
        this.postsService = postsService;
        this.authService = authService;
        this.route = route;
        this.docService = docService;
        this.posts = [];
        this.docWord = [];
        this.isLoading = true;
        this.docWords = [];
        this.theHardWords = [];
        this.wordWithAnnotation = [];
        this.userIsAuthenticated = false;
    }
    /**
     * This function runs at the start when you load this component.
     * Contains the form validation.
     * This function gets the complex words, posts and document specific words from the database and passes them to the component.
     * This function also checks if the user is authenticated and check what role the user is in order to allow a user to create a
     * post or view a post.
     * When everything has gone through the loading spinner gets set to false.
     */
    AnnotationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.startTime = Date.now();
        this.id = this.route.snapshot.paramMap.get('postId');
        this.editing = false;
        this.annotation = '';
        this.editAnnotation = '';
        this.form = this.createForm();
        this.secondForm = this.createSecondForm();
        this.postsService.getPosts();
        this.postsSub = this.postsService
            .getPostUpdateListenerTwo()
            .subscribe(function (posts) {
            _this.posts = posts;
            _this.posts.map(function (post) {
                if (post.id === _this.id) {
                    _this.selectedPost = post.body;
                }
            });
        });
        this.docService.getWords(); //Gets previously annotated complex words
        this.docSub = this.docService
            .getWordUpdateListenerTwo()
            .subscribe(function (docWord) {
            _this.docWords = docWord;
            _this.docWords.map(function (doc) {
                if (doc.document_id === _this.id) {
                    _this.docWords.push(doc.word);
                }
            });
        });
        this.role = this.authService.getUserRole();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatus = this.authService
            .getAuthStatus()
            .subscribe(function (isAuthenticated) {
            _this.userIsAuthenticated = isAuthenticated;
            _this.role = _this.authService.getUserRole();
        });
        this.isLoading = false;
    };
    /**
     * Validation for the form when creating the annotations using FormGroup/FormControl.
     */
    AnnotationComponent.prototype.createForm = function () {
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            annotation: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(450)
                ]
            })
        });
    };
    AnnotationComponent.prototype.createSecondForm = function () {
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            difficulty: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
                ]
            })
        });
    };
    AnnotationComponent.prototype.reInit = function () {
        var _this = this;
        this.docService.getWords();
        this.docSub = this.docService
            .getWordUpdateListenerTwo()
            .subscribe(function (docWord) {
            _this.docWords = docWord;
            _this.docWords.map(function (doc) {
                if (doc.document_id === _this.id) {
                    _this.docWords.push(doc.word);
                }
            });
            _this.docManager.reset();
            _this.highlightDocumentSpecificWords(_this.docWords);
            if (_this.DifficultWords)
                _this.DifficultWords.apply();
        });
    };
    /**
     * documentSpecificWords method gets the (Per document words) from the database, passing them through this method which gets
     * the #id of the element of the HTML which shows the post. The same pretty much as the Highlight method. Runs the text from
     * that element through a map where if any (document word) match any word from the post or better said the text inside the
     * (#scrollable) div. It will then wrap it in an <a> tag and give it different styles and click listner.
     */
    AnnotationComponent.prototype.highlightDocumentSpecificWords = function (words) {
        var _this = this;
        try {
            var high = document.getElementById('scrollable');
            if (!this.docManager)
                this.docManager = new _highlighter_txt2JSON__WEBPACK_IMPORTED_MODULE_6__["highlightManager"](high); //add in post //also or check if element is the same as high....
            new _highlighter_jsFunctionManager__WEBPACK_IMPORTED_MODULE_7__["highlightWords"](this.docManager, words).apply('clickable');
            var elementsToMakeClickable = document.getElementsByClassName('clickable');
            var elementsToMakeClickableArray = Array.from(elementsToMakeClickable);
            elementsToMakeClickableArray.map(function (element) {
                element.addEventListener('click', _this.viewAnnotation.bind(_this));
            });
            document.getElementById('btnHighLight').style.visibility = 'visible';
        }
        catch (e) { }
    };
    /**
     * ViewAnnotation Method gets called when you click on an annotation (yellow highlighted word in the text). When it has been
     * clicked it pushes that word through to here, either from the highlight/documentSpecificWords method and calls findAnnotation.
     * @param e Contains the word of which you have clicked on.
     */
    AnnotationComponent.prototype.viewAnnotation = function (e) {
        this.resetAlertBox(false);
        var word = e.target.textContent;
        if (this.role === 'student') {
            var currentDate = new Date();
            this.date = currentDate;
            this.docService.annotationClick(word, this.date, this.id);
        }
        this.findAnnotation(word);
    };
    /**
     * findAnnotation sets the setWord to e, the word to e, then maps the complex words and document specific words to find out which
     * word matches and then stores the annotation of the current word that has been clicked to the showingAnnotation. This also will
     * let the user know if the word is a 'Global Word' or if the word is a 'Document Specific Word'.
     * @param e - e is the word that the user has clicked.
     */
    AnnotationComponent.prototype.findAnnotation = function (e) {
        var _this = this;
        // this.setWord = e;
        this.word = e.toLowerCase();
        this.docService.getWords();
        this.docWords.map(function (word) {
            if (word.word === _this.word && word.document_id === _this.id) {
                _this.docTrue = false;
                _this.wordId = word.document_id;
                _this.showingAnnotation = word.annotation;
                _this.theWordId = word._id;
            }
        });
    };
    /**
     * highlightSelection sets the showingAnnotation to '', followed by getting the window.getSelection which is the selection
     * of which the user has highlighted. If the user has not highlighted anything but triggered this in any way it will then
     * return. Else it will get the range count from the text begining of text being 0 end of text being possibibly 5000. It then
     * get the range of which the user has highlighted. Then follows by calling the highlightRange and passing the range over.
     */
    AnnotationComponent.prototype.highlightSelection = function () {
        var _this = this;
        this.showingAnnotation = '';
        var userSelection = window.getSelection();
        if (userSelection.toString() === null) {
            return;
        }
        else {
            var _loop_1 = function (i) {
                this_1.highlightRange(userSelection.getRangeAt(i));
                this_1.word = userSelection.toString();
                var theWord;
                var theAnnotation;
                this_1.docWords.map(function (word) {
                    if (word.word === _this.word) {
                        theWord = _this.word;
                        theAnnotation = word.annotation;
                    }
                });
                if (theWord && theAnnotation) {
                    if (confirm(theWord +
                        ' has previously been annotated as ' +
                        theAnnotation +
                        ' would you like to use this annotation?')) {
                        this_1.docService.addWord(theWord, theAnnotation, this_1.id);
                        this_1.word = '';
                        setTimeout(function () {
                            _this.ngOnInit();
                        }, 400);
                    }
                    else {
                        alert('You can create you\'re own annotation for this word.');
                    }
                }
                var node = this_1.highlightRange(userSelection.getRangeAt(i) /*.toString()*/);
                // Make the range into a variable so we can replace it
                var range = userSelection.getRangeAt(i);
                // Delete the current selection
                range.deleteContents();
                // Insert the copy
                range.insertNode(node);
            };
            var this_1 = this;
            for (var i = 0; i < userSelection.rangeCount; i++) {
                _loop_1(i);
            }
        }
    };
    /**
     * guidGenerator generates a random ID for the node ID. Currently not very useful unless you want to
     * modify specific nodes.
     */
    AnnotationComponent.prototype.guidGenerator = function () {
        var S4 = function () {
            // tslint:disable-next-line:no-bitwise
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() +
            S4() +
            '-' +
            S4() +
            '-' +
            S4() +
            '-' +
            S4() +
            '-' +
            S4() +
            S4() +
            S4());
    };
    /**
     * Using the range passed on from highlightSelection method, it then puts that text into an <a> tag followed by
     * giving it a unique ID, with a class named 'clickable' and sets style to the text.
     * @param range Range is the range between the highlighted word from x to y. An example would be this is the text:
     * Today I went to the market. If you highlighted 'went' it would be 9 to 12 would be the range.
     */
    AnnotationComponent.prototype.highlightRange = function (range) {
        var newNode = document.createElement('a');
        newNode.id = this.guidGenerator();
        newNode.className = 'clickable';
        newNode.setAttribute('style', 'background-color: yellow; display: inline; text-decoration: underline;');
        // Add Text for replacement (for multiple nodes only)
        newNode.appendChild(range.cloneContents());
        // Apply Node around selection (used for individual nodes only)
        return newNode;
    };
    /**
     * addToDoc will be the method which stores the document specific words. It will check if the form is valid and if not
     * then it will return. If the form is valid it will then ask the user if they are sure they want to save the word
     * that they have highlighted to *This Document Only*. The annotation recieves the value from the form.value.annotation.
     * It then passes the value from the front end and calls the service 'addWord' passing the word that needs to be stored,
     * the annotation associated with it and the post ID. Then following by reseting the form. Else it will alert the user
     * that the selected word has not been saved.
     */
    AnnotationComponent.prototype.addToDoc = function () {
        var _this = this;
        if (!this.form.valid) {
            return;
        }
        if (confirm('Are you sure you want to save ' + this.word + ' to this document?')) {
            this.annotation = this.form.value.annotation;
            this.word = this.word.replace(/[.,\/#!$%?\^&\*;:{}=\-_—–`'‘’~()\n\t]/g, '');
            this.word = this.word.trim().toLowerCase(); //removes whitespace surrounding word and sets word to lower case
            this.docService.addWord(this.word, this.annotation, this.id);
            this.form.reset();
            this.word = '';
            setTimeout(function () {
                _this.reInit();
            }, 400);
        }
        else {
            alert(this.word + ' has not been saved.');
        }
    };
    /**
     * onDocEditWord method gets called when the edit button has been clicked, this then sets editing to true, hides the edit
     * button & delete button. Editing boolean hides button on the HTML page.
     */
    AnnotationComponent.prototype.onDocEditWord = function () {
        this.editing = true;
        try {
            document.getElementById('#editDocBtn').style.visibility = 'hidden';
            document.getElementById('#deleteDocBtn').style.visibility = 'hidden';
        }
        catch (e) { }
    };
    /**
     * onDocEditSub handles the submission of an edit made to a Document Specific Word. It will first ask for confimation,
     * it will display a message asking if the user is sure that they want to edit this word on this document. Editing then
     * become false followed by grabbing the word, the form value of annotation and the word ID then passing it through to the
     * Doc Service. Then the reset will happen in order to refresh the changes on the page. If the user does not confirm the
     * change then it will return an alert saying the word has not been edited.
     */
    AnnotationComponent.prototype.onDocEditSub = function () {
        if (confirm('Are you sure you want to edit ' + this.word + ' on this document?')) {
            this.editing = false;
            var theAnnotation = void 0;
            var wordID = void 0;
            theAnnotation = this.form.value.annotation;
            wordID = this.theWordId;
            this.docService.editWord(wordID, theAnnotation);
            this.resetAlertBox(true);
        }
        else {
            alert(this.word + ' has not been edited.');
        }
    };
    /**
     * ResetAlertBox method is used when you click close on an annotation. It resets everything so the user can
     * experience a new fresh start on any other word or in order to view different words that the user clicks.
     * @param callNgOnInit If this is true then it will run the ngOnInit function, this has been made in such a way
     * because this resetAlertBox method gets run regularly but we do not want to call ngOnInit everytime.
     */
    AnnotationComponent.prototype.resetAlertBox = function (callNgOnInit) {
        this.word = '';
        this.annotation = '';
        this.form.reset();
        this.editing = false;
        if (callNgOnInit) {
            this.reInit();
        }
    };
    /**
     * onDocDelete method handles the deletion of the Document specific words. It will ask for confimation before deleting
     * the selected word if so then it will run the following function. This will call the Doc Service and it will pass the
     * selected word that you want to delete. find all the words and make a refresh and set everything back to ''. If the
     * user decides to cancel when the confimation is promted then no effect will be made to the page/word.
     */
    AnnotationComponent.prototype.onDocDelete = function () {
        var _this = this;
        if (confirm('Are you sure you want to DELETE ' +
            this.word +
            ' off this specific document?')) {
            var wordID = void 0;
            wordID = this.theWordId;
            this.docService.deleteWord(wordID);
            // const index = this.docWords.indexOf(deleteWord);
            // this.docWords.splice(index);
            this.word = '';
            setTimeout(function () {
                _this.reInit();
            }, 400);
        }
        else {
            alert(this.word + ' has not been deleted.');
        }
    };
    /**
     * After View is checked, run the highlight method passing the (complex words from the database through).
     * Run the documentSpecificWords method passing the document specific words.
     * Run the urlify method which gets hold of all the references in the post and checks which ones are a link.
     */
    AnnotationComponent.prototype.ngAfterViewChecked = function () {
        // console.clear();
        this.highlightDocumentSpecificWords(this.docWords);
    };
    AnnotationComponent.prototype.possibleWords = function () {
        var _this = this;
        this.readTextSub = this.docService.readText(this.id).subscribe(function (data) {
            _this.fileText = data;
            _this.highlightPossibleWords(_this.fileText, _this.secondForm.value.difficulty);
        });
    };
    AnnotationComponent.prototype.highlightPossibleWords = function (words, diff) {
        var _this = this;
        try {
            if (this.role === 'student') {
                return;
            }
            else {
                var high = document.getElementById('scrollable');
                if (!this.docManager)
                    this.docManager = new _highlighter_txt2JSON__WEBPACK_IMPORTED_MODULE_6__["highlightManager"](high);
                else
                    this.docManager.reset();
                switch (diff) {
                    case 'beginner':
                        var difficultWords = words[0];
                        break;
                    case 'intermediate':
                        var difficultWords = words[1];
                        break;
                    case 'advanced':
                        var difficultWords = words[2];
                        break;
                    default:
                        throw new Error("Difficulty level not received");
                }
                this.DifficultWords = new _highlighter_jsFunctionManager__WEBPACK_IMPORTED_MODULE_7__["highlightWords"](this.docManager, difficultWords);
                this.DifficultWords.apply();
                var elementsToMakeClickable = document.getElementsByClassName('clickable');
                var elementsToMakeClickableArray = Array.from(elementsToMakeClickable);
                elementsToMakeClickableArray.map(function (element) {
                    element.addEventListener('click', _this.viewAnnotation.bind(_this));
                });
                document.getElementById('btnHighLight').style.visibility = 'visible';
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    // DETECTING COMPLEX WORDS
    /*
     highlightPossibleWords(words: string[], diff: string) {
       try {
         if (this.role === 'student') {
           return;
         } else {
           const high = document.getElementById('scrollable');
           //const paragraph = high.innerHTML.split(' '); //new lines aren't spaces
           const paragraph = this.documentSplitter(high.innerHTML) //works better doesn't damage format
           const res = [];
           paragraph.map(word => {
             let wordsInParagraph = word;
             // const withoutPunct = wordsInParagraph.replace(/[.,\/#!$%?\^&\*;:{}=\_—`'‘’~()]/g, '');
             //const withoutPunct = wordsInParagraph.replace(/[.,\/#!$%?\^&\*;:{}=\-_—–`'‘’~()\n\t]/g, '').toLowerCase();
             const withoutPunct = wordsInParagraph.replace(/[.,\/#!$%?\^&\*;:{}=\_`'‘’~()\n\t]/g, '').toLowerCase(); //keep conjuntions atm (—–) //generalize the function for this to avoid multiple uses of different regex, could get confusing!
             if (diff === 'beginner') {
               if (words[0].indexOf(withoutPunct) > -1) {
                 wordsInParagraph =
                   '<a class="optional" style="background-color:#dcdfe5; text-decoration: underline;">' +
                   word +
                   '</a>';
               }
             } else if (diff === 'intermediate') {
               if (words[1].indexOf(withoutPunct) > -1) {
                 wordsInParagraph =
                   '<a class="optional" style="background-color:#dcdfe5; text-decoration: underline;">' +
                   word +
                   '</a>';
               }
             } else if (diff === 'advanced') {
               if (words[2].indexOf(withoutPunct) > -1) {
                 wordsInParagraph =
                   '<a class="optional" style="background-color:#dcdfe5; text-decoration: underline;">' +
                   word +
                   '</a>';
               }
             }
             res.push(wordsInParagraph);
           });
           high.innerHTML = res.join(' ');
           const elementsToMakeClickable = document.getElementsByClassName(
             'clickable'
           );
           const elementsToMakeClickableArray = Array.from(
             elementsToMakeClickable
           );
           elementsToMakeClickableArray.map(element => {
             element.addEventListener('click', this.viewAnnotation.bind(this));
           });
           document.getElementById('btnHighLight').style.visibility = 'visible';
         }
       } catch (e) {}
     }
   
       highlightDocumentSpecificWords(words: string[]) {
       try {
         const high = document.getElementById('scrollable');
         //const paragraph = high.innerHTML.split(' '); //new lines aren't spaces this causes issues
         const paragraph = this.documentSplitter(high.innerHTML); // has to be done in both places to maintain formatting
         const res = [];
         paragraph.map(word => { //changes made to the paragh effect future changes this needs to be redone, will have to think carefully
           let t = word;
           const withoutPunct = t.replace(/[.,\/#!$%?\^&\*;:{}=\-_—–`'‘’~()\n\t]/g, '').toLowerCase();
           // const withoutPunct = t.replace(/[.,\/#!$%\^&\*;:{}=\_`'~()]/g, '');
           // const wordWithoutPunch = word.replace(/[.,\/#!$%\^&\*;:{}=\_~()]/g, '');
           if (words.indexOf(withoutPunct) > -1) {
             t =
               '<a class="clickable" style="background-color: yellow; text-decoration: underline;">' +
               word +
               '</a>';
           }
           res.push(t);
         });
         high.innerHTML = res.join(' ');
         const elementsToMakeClickable = document.getElementsByClassName(
           'clickable'
         );
         const elementsToMakeClickableArray = Array.from(elementsToMakeClickable);
         elementsToMakeClickableArray.map(element => {
           element.addEventListener('click', this.viewAnnotation.bind(this));
         });
         document.getElementById('btnHighLight').style.visibility = 'visible';
       } catch (e) {} //better solution than try catch here surely
     }
     */
    AnnotationComponent.prototype.modalClosed = function () {
        this.secondForm.reset();
    };
    /**
     * When the user closes the page or navigates away from the page, all the subscriptions get unsubscribed so we do not have issues
     * or any unnessasary waste of memory.
     */
    AnnotationComponent.prototype.ngOnDestroy = function () {
        this.postsSub.unsubscribe();
        this.authStatus.unsubscribe();
        this.docSub.unsubscribe();
        if (this.fileText) {
            this.readTextSub.unsubscribe();
        }
        if (this.role === 'student') {
            var currentDate = new Date();
            this.date = currentDate;
            this.endTime = Date.now();
            var totalTime = this.endTime - this.startTime;
            var seconds = void 0;
            seconds = Math.floor(totalTime / 1000);
            seconds = seconds % 60;
            this.modifiedTime = seconds;
            if (seconds >= 5) {
                this.docService.userActiveDate(this.date, this.modifiedTime, this.id);
                return {
                    seconds: seconds
                };
            }
        }
    };
    AnnotationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-annotation',
            template: __webpack_require__(/*! ./annotation.component.html */ "./src/app/annotation/annotation.component.html"),
            styles: [__webpack_require__(/*! ./annotation.component.css */ "./src/app/annotation/annotation.component.css")]
        })
        /**
         * Annotation Component is the component which creates the annotations.
         * It currently creates the annotations automatically which have previously been stored in the database.
         * This component also allows Teachers/Admins to create annotations on the fly with the highlight method.
         * Delete and edit annotations.
         */
        ,
        __metadata("design:paramtypes", [_posts_posts_service__WEBPACK_IMPORTED_MODULE_3__["PostsService"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _document_service__WEBPACK_IMPORTED_MODULE_5__["DocService"]])
    ], AnnotationComponent);
    return AnnotationComponent;
}());



/***/ }),

/***/ "./src/app/annotation/document.service.ts":
/*!************************************************!*\
  !*** ./src/app/annotation/document.service.ts ***!
  \************************************************/
/*! exports provided: DocService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocService", function() { return DocService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BACKEND_URL_Document = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl + '/documentWords/';
var DocService = /** @class */ (function () {
    function DocService(http) {
        this.http = http;
        this.docWords = [];
        this.docWordUpdate = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    DocService.prototype.readText = function (id) {
        return this.http.get(BACKEND_URL_Document + id);
    };
    /**
     * This is the Get query. It requests the backend for the words and annotations and document ID.
     */
    DocService.prototype.getWords = function () {
        var _this = this;
        this.http
            .get(BACKEND_URL_Document)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (wordData) {
            return wordData.words.map(function (word) {
                return {
                    _id: word._id,
                    word: word.word,
                    annotation: word.annotation,
                    document_id: word.document_id
                };
            });
        }))
            .subscribe(function (result) {
            _this.docWords = result;
            _this.docWordUpdate.next(_this.docWords.slice());
        });
    };
    /**
     * This is a normal get word as observable.
     */
    DocService.prototype.getWordUpdateListenerTwo = function () {
        return this.docWordUpdate.asObservable();
    };
    /**
     * This gets the words as an observable with a type <any>.
     */
    DocService.prototype.getWordUpdateListener = function () {
        return this.http.get(BACKEND_URL_Document);
    };
    /**
     * This is the Post query, will create a Doc Word to a specific document.
     * @param word The word that you are adding to the database.
     * @param annotation The annotation accociated with the word.
     * @param document_id The document the word/annotation is getting saved too.
     */
    DocService.prototype.addWord = function (word, annotation, document_id) {
        var docWord = {
            word: word,
            annotation: annotation,
            document_id: document_id
        };
        // console.log(docWord);
        return this.http
            .post(BACKEND_URL_Document + '/new-word', docWord)
            .subscribe(function (response) {
            // console.log(response);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * This is the Put query, this will update the annotation on the given word.
     * @param wordID The word ID you would like to make changes on.
     * @param theAnnotation The annotation that you are changing so the updated annotation.
     */
    DocService.prototype.editWord = function (wordID, theAnnotation) {
        var anno = {
            annotation: theAnnotation
        };
        this.http
            .put(BACKEND_URL_Document + '/update' + wordID, anno)
            .subscribe(function (response) {
            // const updatedWords = [...this.docWords];
            // const oldWordIndex = updatedWords.findIndex(w => w.word === theWord);
            // const makeDocWord: DocWord = {
            //   word: theWord,
            //   annotation: theAnnotation,
            //   document_id: document_id
            // };
            // updatedWords[oldWordIndex] = makeDocWord;
            // this.docWords = updatedWords;
            // this.docWordUpdate.next([...this.docWords]);
        });
    };
    /**
     * This is the Delete query. It would pass the word ID you would like to remove.
     * @param wordID The word ID you would like to remove will get passed through here.
     */
    DocService.prototype.deleteWord = function (wordID) {
        this.http
            .delete(BACKEND_URL_Document + '/delete-word' + wordID)
            .subscribe(function () {
            // const result = this.docWords.filter(
            //   theword => theword.word !== word
            // );
            // this.docWords = result;
            // this.docWordUpdate.next([...this.docWords]);
        });
    };
    DocService.prototype.userActiveDate = function (date, time, postId) {
        var dates = {
            date: date,
            time: time,
            postId: postId
        };
        return this.http
            .post(BACKEND_URL_Document + 'page-activity', dates)
            .subscribe(function (response) {
            // console.log(response);
        }, function (error) {
            // console.log(error);
        });
    };
    DocService.prototype.annotationClick = function (word, date, postId) {
        var information = {
            word: word,
            date: date,
            postId: postId
        };
        return this.http
            .post(BACKEND_URL_Document + 'annotation-activity', information)
            .subscribe(function (response) {
            // console.log(response);
        }, function (error) {
            // console.log(error);
        });
    };
    DocService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' })
        /**
         * Doc Service retreives all *Document Specific* Words/Annotation/ID from the database. There is the Get,
         * Put, Delete and Post queries.
         */
        ,
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], DocService);
    return DocService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _course_course_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./course/course.component */ "./src/app/course/course.component.ts");
/* harmony import */ var _course_module_module_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./course/module/module.component */ "./src/app/course/module/module.component.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/auth.guard */ "./src/app/auth/auth.guard.ts");
/* harmony import */ var _annotation_annotation_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./annotation/annotation.component */ "./src/app/annotation/annotation.component.ts");
/* harmony import */ var _analytics_analytics_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./analytics/analytics.component */ "./src/app/analytics/analytics.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







/**
 * This takes care of the routes. The 'canActivate: [AuthGuard]' checks if the
 * user is authenticated before accessing that route.
 */
var appRoutes = [
    { path: '', redirectTo: '/course', pathMatch: 'full' },
    { path: 'course', component: _course_course_component__WEBPACK_IMPORTED_MODULE_2__["CourseComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]] },
    { path: 'analytics', component: _analytics_analytics_component__WEBPACK_IMPORTED_MODULE_6__["AnalyticsComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]] },
    { path: 'module/:text', component: _course_module_module_component__WEBPACK_IMPORTED_MODULE_3__["ModuleComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]] },
    { path: 'module/:text/edit/:postId', component: _course_module_module_component__WEBPACK_IMPORTED_MODULE_3__["ModuleComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]] },
    { path: 'annotation', component: _annotation_annotation_component__WEBPACK_IMPORTED_MODULE_5__["AnnotationComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]] },
    { path: 'annotation/:postId', component: _annotation_annotation_component__WEBPACK_IMPORTED_MODULE_5__["AnnotationComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]] },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
    // { path: 'module', component: ModuleComponent, canActivate: [AuthGuard]  },
    // { path: 'edit/:postId', component: ModuleComponent, canActivate: [AuthGuard] },›
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(appRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]],
            providers: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\r\n<main>\r\n  <router-outlet></router-outlet>\r\n</main>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(authService) {
        this.authService = authService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.authService.authUser();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _course_course_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./course/course.component */ "./src/app/course/course.component.ts");
/* harmony import */ var _course_module_module_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./course/module/module.component */ "./src/app/course/module/module.component.ts");
/* harmony import */ var _auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./auth/auth-interceptor */ "./src/app/auth/auth-interceptor.ts");
/* harmony import */ var _annotation_annotation_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./annotation/annotation.component */ "./src/app/annotation/annotation.component.ts");
/* harmony import */ var _error_interceptor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./error-interceptor */ "./src/app/error-interceptor.ts");
/* harmony import */ var _error_error_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./error/error.component */ "./src/app/error/error.component.ts");
/* harmony import */ var _angular_material_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./angular-material.module */ "./src/app/angular-material.module.ts");
/* harmony import */ var _posts_posts_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./posts/posts.module */ "./src/app/posts/posts.module.ts");
/* harmony import */ var _analytics_analytics_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./analytics/analytics.component */ "./src/app/analytics/analytics.component.ts");
/* harmony import */ var _posts_posts_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./posts/posts.service */ "./src/app/posts/posts.service.ts");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _annotation_document_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./annotation/document.service */ "./src/app/annotation/document.service.ts");
/* harmony import */ var _analytics_analyitics_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./analytics/analyitics.service */ "./src/app/analytics/analyitics.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__["NavbarComponent"],
                _course_course_component__WEBPACK_IMPORTED_MODULE_8__["CourseComponent"],
                _course_module_module_component__WEBPACK_IMPORTED_MODULE_9__["ModuleComponent"],
                _annotation_annotation_component__WEBPACK_IMPORTED_MODULE_11__["AnnotationComponent"],
                _error_error_component__WEBPACK_IMPORTED_MODULE_13__["ErrorComponent"],
                _analytics_analytics_component__WEBPACK_IMPORTED_MODULE_16__["AnalyticsComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_material_module__WEBPACK_IMPORTED_MODULE_14__["AngularMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _posts_posts_module__WEBPACK_IMPORTED_MODULE_15__["PostsModule"],
            ],
            providers: [
                _posts_posts_service__WEBPACK_IMPORTED_MODULE_17__["PostsService"], _auth_auth_service__WEBPACK_IMPORTED_MODULE_18__["AuthService"], _annotation_document_service__WEBPACK_IMPORTED_MODULE_19__["DocService"], _analytics_analyitics_service__WEBPACK_IMPORTED_MODULE_20__["AnalyticsService"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"], useClass: _auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_10__["AuthInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"], useClass: _error_interceptor__WEBPACK_IMPORTED_MODULE_12__["ErrorInterceptor"], multi: true }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
            entryComponents: [_error_error_component__WEBPACK_IMPORTED_MODULE_13__["ErrorComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth/auth-interceptor.ts":
/*!******************************************!*\
  !*** ./src/app/auth/auth-interceptor.ts ***!
  \******************************************/
/*! exports provided: AuthInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authService) {
        this.authService = authService;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var authToken = this.authService.getToken();
        var authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
        return next.handle(authRequest);
    };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());



/***/ }),

/***/ "./src/app/auth/auth.guard.ts":
/*!************************************!*\
  !*** ./src/app/auth/auth.guard.ts ***!
  \************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var isAuth = this.authService.getIsAuth(); // Checks if user is authenticated
        if (!isAuth) {
            this.router.navigate(['/auth/login']); // if not authenticated then user gets navigated to login page
        }
        return isAuth;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
        /**
         * This will guard users from accessing certain pages without authentication. If not authenticated then
         * you get redirected to the '/auth/login'.
         */
        ,
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/*!**************************************!*\
  !*** ./src/app/auth/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BACKEND_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl + '/user/';
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.isAuthenticated = false;
        this.authStatus = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    /**
     * Returns token if request from outside this component.
     */
    AuthService.prototype.getToken = function () {
        return this.token;
    };
    /**
     * Returns if user is authenticated from outside this component when requested.
     */
    AuthService.prototype.getIsAuth = function () {
        return this.isAuthenticated;
    };
    /**
     * Returns the authentication status as an Observable.
     */
    AuthService.prototype.getAuthStatus = function () {
        return this.authStatus.asObservable();
    };
    /**
     * Returns the current user ID.
     */
    AuthService.prototype.getUserId = function () {
        return this.userId;
    };
    /**
     * Returns the users role, provided by this service.
     */
    AuthService.prototype.getUserRole = function () {
        return this.role;
    };
    /**
     * This is the Post query to create a user, currently it is enabled but probably will be disabled so users
     * can not create fake accounts. Maybe implement this so only Admins can create accounts.
     * @param email Email of the user being created.
     * @param password Password of the user being created(Gets Hashed).
     * @param role Role of the user when creating account.
     */
    AuthService.prototype.createUser = function (email, password, role) {
        var _this = this;
        var authData = { email: email, password: password, role: role };
        this.http
            .post(BACKEND_URL + '/signup', authData)
            .subscribe(function () {
            _this.router.navigate(['/auth/login']);
        }, function (error) {
            _this.authStatus.next(false);
        });
    };
    /**
     * These are the login details which get passed to the backend and get checked if they match the records
     * in the database.
     * @param email Email the user has entered to login.
     * @param password Password the user has entered to login.
     * @param role Role the user has entered to login.
     */
    AuthService.prototype.userLogin = function (email, password, role) {
        var _this = this;
        var authData = { email: email, password: password, role: role };
        this.http.post(BACKEND_URL + '/login', authData)
            .subscribe(function (response) {
            var token = response.token;
            _this.token = token;
            if (token) {
                var expiresDuration = response.expiresIn;
                _this.authTimer(expiresDuration);
                _this.isAuthenticated = true;
                _this.role = response.role;
                _this.userId = response.userId;
                _this.authStatus.next(true);
                var now = new Date();
                var expirationDate = new Date(now.getTime() + expiresDuration * 1000);
                _this.saveAuthData(token, expirationDate, _this.userId, _this.role);
                _this.router.navigate(['/course']);
            }
        }, function (error) {
            _this.authStatus.next(false);
        });
    };
    /**
     * This will check if the user is in the past, if the user is in the past it will return, if not in the past
     * then it will set a token timer.
     */
    AuthService.prototype.authUser = function () {
        var authInfo = this.getAuthData();
        if (!authInfo) {
            return;
        }
        var now = new Date();
        var expiresIn = authInfo.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInfo.token;
            this.isAuthenticated = true;
            this.userId = authInfo.userId;
            this.role = authInfo.role;
            this.authTimer(expiresIn / 1000);
            this.authStatus.next(true);
        }
    };
    /**
     * This would be the logout method that gets called when a user logs out. So it sets the token to null, clears token,
     * sets authentication to false, clears authentication data, resets all the fields below as can be seen. Then redirects
     * user to the '/auth/login' page.
     */
    AuthService.prototype.logout = function () {
        this.token = null;
        this.isAuthenticated = false; // Sets Auth to false
        this.authStatus.next(false);
        clearTimeout(this.tokenTimer); // Clear token timer
        this.clearAuthData();
        this.userId = null;
        this.role = null;
        this.router.navigate(['/auth/login']);
    };
    /**
     * Saves token, expiration date, user ID and role to local storage.
     * @param token This would be the token that the user stores in the local storage.
     * @param expirationDate The expiration date of the token that gets stored.
     * @param userId The user ID gets stored of the user in the local storage.
     * @param role The role of the user gets stored in the local storage too.
     */
    AuthService.prototype.saveAuthData = function (token, expirationDate, userId, role) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
    };
    /**
     * Clears the token, removes the expiration date of token, the user ID and the role of the user.
     */
    AuthService.prototype.clearAuthData = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
    };
    /**
     * This gets the authentication data such as the token, the expiration date of the token, the user ID
     * and the user role. If there is no token and expirationData then simply return.
     */
    AuthService.prototype.getAuthData = function () {
        var token = localStorage.getItem('token');
        var expirationDate = localStorage.getItem('expiration');
        var userId = localStorage.getItem('userId');
        var role = localStorage.getItem('role');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId,
            role: role
        };
    };
    /**
     * Auth Timer sets the authantication token timer, when the time is up it will simply call the logout method.
     * @param duration The duration of the token, gets sent to console so it can be seen.
     */
    AuthService.prototype.authTimer = function (duration) {
        var _this = this;
        console.log('setting timer: ' + duration);
        this.tokenTimer = setTimeout(function () {
            _this.logout();
        }, duration * 1000);
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' })
        /**
         * This class is the Authentication Service class. It will create tokens, token timers, check if authenticated
         * and it will show the users role/ID.
         */
        ,
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/course/course.component.css":
/*!*********************************************!*\
  !*** ./src/app/course/course.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n  padding-top: 2.5em;\r\n  text-align: center;\r\n}\r\n\r\n.imgshrink {\r\n  max-width: 10em;\r\n  min-height: 11em;\r\n}\r\n\r\n.card {\r\n  margin: 0 auto;\r\n  float: none;\r\n  max-width: 17em;\r\n  text-align: center;\r\n}\r\n\r\n.space {\r\n  margin-top: 2em;\r\n  min-height: 5em;\r\n}\r\n"

/***/ }),

/***/ "./src/app/course/course.component.html":
/*!**********************************************!*\
  !*** ./src/app/course/course.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"card\">\r\n    <div class=\"card shadow-sm rounded\" (click)=\"onClickWeb('First Year Seminar')\">\r\n      <div class=\"card-body\">\r\n        <h5 class=\"card-title\">First Year Seminar</h5>\r\n        <img class=\"card-img-top imgshrink\" src=\"https://upload.wikimedia.org/wikipedia/commons/2/20/Text-x-generic_with_pencil.svg\"\r\n          alt=\"Card image cap\">\r\n        <p class=\"card-text space\">Click to view the First Year Seminar Page.</p>\r\n        <p class=\"card-text\">\r\n          <small class=\"text-muted\">(6G6Z345431_171834_93Z6)</small>\r\n        </p>\r\n      </div>\r\n    </div>\r\n    </div>\r\n    <!-- <div class=\"card-deck\">\r\n     <div class=\"card shadow-sm rounded\" (click)=\"onClickWeb('Advanced..Web..Development')\">\r\n      <div class=\"card-body\">\r\n        <h5 class=\"card-title\">Advanced Web Development</h5>\r\n        <img class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg\"\r\n          alt=\"Card image cap\">\r\n        <p class=\"card-text\"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis\r\n          natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>\r\n        <p class=\"card-text\">\r\n          <small class=\"text-muted\">(6G6Z345431_171834_93Z6)</small>\r\n        </p>\r\n      </div>\r\n    </div>\r\n     <div class=\"card shadow-sm rounded\" (click)=\"onClickWeb('Data..Engineering')\">\r\n      <div class=\"card-body\">\r\n        <h5 class=\"card-title\">Data Engineering</h5>\r\n        <img class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/4/46/BigData_2267x1146_white.png\"\r\n          alt=\"Card image cap\">\r\n        <p class=\"card-text\"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis\r\n          natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>\r\n        <p class=\"card-text\">\r\n          <small class=\"text-muted\">(643G236_33248_923Z6)</small>\r\n        </p>\r\n      </div>\r\n    </div>\r\n    <div class=\"card shadow-sm rounded\" (click)=\"onClickWeb('Project..Managment')\">\r\n      <div class=\"card-body\">\r\n        <h5 class=\"card-title\">Project Managment</h5>\r\n        <img class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/3/37/Toicon-icon-fandom-game.svg\"\r\n          alt=\"Card image cap\">\r\n        <p class=\"card-text\"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis\r\n          natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>\r\n        <p class=\"card-text\">\r\n          <small class=\"text-muted\">(634ZG1101_5718_9Z6)</small>\r\n        </p>\r\n      </div>\r\n    </div>\r\n    <div class=\"card shadow-sm rounded\" (click)=\"onClickWeb('Information..Systems..Strategy')\">\r\n      <div class=\"card-body\">\r\n        <h5 class=\"card-title\">Information Systems Strategy</h5>\r\n        <img class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/d/d0/NIST_Enterprise_Architecture_Model.jpg\"\r\n          alt=\"Card image cap\">\r\n        <p class=\"card-text\"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis\r\n          natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>\r\n        <p class=\"card-text\">\r\n          <small class=\"text-muted\">(6G62336_123418_93Z6)</small>\r\n        </p>\r\n      </div>\r\n    </div> -->\r\n  <!-- </div> -->\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/course/course.component.ts":
/*!********************************************!*\
  !*** ./src/app/course/course.component.ts ***!
  \********************************************/
/*! exports provided: CourseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseComponent", function() { return CourseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CourseComponent = /** @class */ (function () {
    function CourseComponent(router) {
        this.router = router;
    }
    CourseComponent.prototype.ngOnInit = function () { };
    /**
     * If a module is clicked, it will then route you to the module page.
     */
    CourseComponent.prototype.onClickWeb = function (text) {
        this.router.navigate(['/module', text]);
    };
    CourseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-course',
            template: __webpack_require__(/*! ./course.component.html */ "./src/app/course/course.component.html"),
            styles: [__webpack_require__(/*! ./course.component.css */ "./src/app/course/course.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], CourseComponent);
    return CourseComponent;
}());



/***/ }),

/***/ "./src/app/course/module/module.component.css":
/*!****************************************************!*\
  !*** ./src/app/course/module/module.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n  padding-top: 2em;\r\n  max-width: 50%;\r\n}\r\n"

/***/ }),

/***/ "./src/app/course/module/module.component.html":
/*!*****************************************************!*\
  !*** ./src/app/course/module/module.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <!-- <div class=\"card\"> -->\r\n    <!-- <div class=\"card-body\"> -->\r\n        <h5 class=\"card-title\">{{ moduleNameWithoutPunc }}</h5>\r\n      <!-- <h5 class=\"card-title\">{{Web Development}}</h5> -->\r\n      <!-- <p class=\"card-text\"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>\r\n      <p class=\"card-text\">\r\n        <small class=\"text-muted\">\r\n          (6G6Z345431_171834_93Z6)\r\n        </small>\r\n      </p> -->\r\n    <!-- </div> -->\r\n  <!-- </div> -->\r\n  <br>\r\n  <app-create-post></app-create-post>\r\n  <app-show-post></app-show-post>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/course/module/module.component.ts":
/*!***************************************************!*\
  !*** ./src/app/course/module/module.component.ts ***!
  \***************************************************/
/*! exports provided: ModuleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleComponent", function() { return ModuleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { Subscription } from 'rxjs';
var ModuleComponent = /** @class */ (function () {
    function ModuleComponent(route) {
        this.route = route;
        this.createPost = true;
    }
    ModuleComponent.prototype.ngOnInit = function () {
        this.theModuleName = this.route.snapshot.paramMap.get('text');
        var withoutPunct = this.theModuleName.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, ' ');
        this.moduleNameWithoutPunc = withoutPunct;
    };
    ModuleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-module',
            template: __webpack_require__(/*! ./module.component.html */ "./src/app/course/module/module.component.html"),
            styles: [__webpack_require__(/*! ./module.component.css */ "./src/app/course/module/module.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], ModuleComponent);
    return ModuleComponent;
}());



/***/ }),

/***/ "./src/app/error-interceptor.ts":
/*!**************************************!*\
  !*** ./src/app/error-interceptor.ts ***!
  \**************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _error_error_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error/error.component */ "./src/app/error/error.component.ts");
/* harmony import */ var _error_error_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./error/error.service */ "./src/app/error/error.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(dialog, errorService) {
        this.dialog = dialog;
        this.errorService = errorService;
    }
    ErrorInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["catchError"])(function (error) {
            var errorMessage = 'An unknown error occurred!';
            if (error.error.message) {
                errorMessage = error.error.message;
            }
            _this.dialog.open(_error_error_component__WEBPACK_IMPORTED_MODULE_4__["ErrorComponent"], { data: { message: errorMessage } });
            // alert(error.error.message);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(error);
        }));
    };
    ErrorInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
        /**
         * Error Interceptor class handles the errors. It handles the error by sending over
         * the error message to the Error Component, which then displays it.
         */
        ,
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"], _error_error_service__WEBPACK_IMPORTED_MODULE_5__["ErrorService"]])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());



/***/ }),

/***/ "./src/app/error/error.component.html":
/*!********************************************!*\
  !*** ./src/app/error/error.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>An Error Occurred!</h1>\r\n<div mat-dialog-content>\r\n  <p class=\"mat-body-1\">{{ data?.message }}</p>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button mat-dialog-close>Okay</button>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/error/error.component.ts":
/*!******************************************!*\
  !*** ./src/app/error/error.component.ts ***!
  \******************************************/
/*! exports provided: ErrorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorComponent", function() { return ErrorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(data) {
        this.data = data;
    }
    ErrorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./error.component.html */ "./src/app/error/error.component.html"),
            selector: 'app-error',
        })
        /**
         * Error Component handles the errors using the Mat_Dialog popup provided by Angular Material.
         */
        ,
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [Object])
    ], ErrorComponent);
    return ErrorComponent;
}());



/***/ }),

/***/ "./src/app/error/error.service.ts":
/*!****************************************!*\
  !*** ./src/app/error/error.service.ts ***!
  \****************************************/
/*! exports provided: ErrorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorService", function() { return ErrorService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ErrorService = /** @class */ (function () {
    function ErrorService() {
        this.errorListener = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
    ErrorService.prototype.getErrorListener = function () {
        return this.errorListener.asObservable();
    };
    /**
     * This will push the error through to the listener which then gets caught by the error.component.ts.
     * @param message This message gets pushed to the error.component.ts so the user can see the issue.
     */
    ErrorService.prototype.throwError = function (message) {
        this.errorListener.next(message);
    };
    ErrorService.prototype.handleError = function () {
        this.errorListener.next(null);
    };
    ErrorService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' })
        /**
         * Error Service will listen to any errors. If it captures any errors it will send them to the error.component.ts.
         * There it will be handled by the Mat_Dialog popup.
         */
    ], ErrorService);
    return ErrorService;
}());



/***/ }),

/***/ "./src/app/highlighter/jsFunctionManager.js":
/*!**************************************************!*\
  !*** ./src/app/highlighter/jsFunctionManager.js ***!
  \**************************************************/
/*! exports provided: highlightWords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightWords", function() { return highlightWords; });

class highlightWords{
    constructor(highlightManager, difficultWords){
        this.highlightManager = highlightManager;
        this.difficultWords = difficultWords;
    }
    apply(type = 'optional'){
        if(type != 'optional')this.difficultWords = this.difficultWords.filter(el=>typeof(el)==="string");
        
        this.difficultWords.sort((a,b)=>a.length-b.length); //sort by ascending length, match longest case of a phrase
    
        for(let token of this.difficultWords){
            this.highlightManager.findTokens(token).highlight(type);
        }
        this.highlightManager.buildDoc();
    }
}

/***/ }),

/***/ "./src/app/highlighter/txt2JSON.js":
/*!*****************************************!*\
  !*** ./src/app/highlighter/txt2JSON.js ***!
  \*****************************************/
/*! exports provided: highlightManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightManager", function() { return highlightManager; });
class highlightManager{
    constructor(element){
        this.element = element;
        this.document = this.element.innerHTML;;
        this.docUncased;
        this.docChars = this.document.split("");
        this.obj = [];
        this.buildObj();
        this.occurs;
        this.optional = '<a class="optional" style="background-color:#dcdfe5; text-decoration: underline;">'
        this.clickable = '<a class="clickable" style="background-color: yellow; text-decoration: underline;">'
    } //we should store highlighted words;
    buildObj(){
        for(let i in this.docChars){
            let cur = {
                "tagged":false,
                "formatting":"",
                "pre":"",
                "char":this.docChars[i],
                "post":"",
            }
            this.obj.push(cur);
        }
        let tempObj = [];

        for(let i=0; i<this.obj.length;i++){
            if(i!=this.obj.length-1){
                if(this.obj[i].char.match(/\r?\n|\r/ig)){
                    this.obj[i+1].formatting = `${this.obj[i].formatting}${this.obj[i].char}`;
                    if(this.obj[i-1].char.trim().length && this.obj[i+1].char.trim().length) this.obj[i].char = " "; //document may contain a newline and no space break between words causing non match
                    else {
                        continue;
                    }
                } //newlines // adds non important characters to the next words formatting attribute
                if(!this.obj[i].char.trim().length && !this.obj[i+1].char.trim().length){this.obj[i+1].formatting = `${this.obj[i].formatting}${this.obj[i].char}`; continue;} //store but remove double whitespaces
                tempObj.push(this.obj[i]); //continue statements are used if the above conditions are met
            }else tempObj.push(this.obj[i]);
        }
        this.obj = tempObj;
        this.document = this.obj.map(el=>el.char).join('');
        this.docUncased = this.document.toLowerCase();
    }
    findTokens(_word){
        let word = _word.toLowerCase().replace(/[)(]/g,""); //remove brackets, issues with brackets;
        let occurs =  [...this.docUncased.matchAll(word)].map(el=>[el.index,el.index+el[0].length]);
        this.occurs = occurs;
        return this;
    }
    highlight(type){ 
        let highlightClass;
        switch(type){
            case 'optional':
                highlightClass = this.optional;
                break;
            case 'clickable':
                highlightClass = this.clickable;
        }
        for(let index of this.occurs){
            let i1 = index[0]; let i2 = index[1];
			if(type == 'optional'){ //allow subwords that have been manually annotated
				if(i1!=0 && this.obj[i1-1].char.match(/['’a-z—–-]/ig) || i2!=this.obj.length && this.obj[i2].char.match(/['’a-z—–-]/ig)){
					continue; //don't want to match subwords i.e because shoudn't have cause highlighted
				}
			}
            let toHighlight = this.obj.slice(...index);
            for(let el of toHighlight){
                el.tagged = false;
                el.pre='';
                el.post='';
            }
            toHighlight[0].pre = highlightClass;

            if(highlightClass == this.clickable) toHighlight[toHighlight.length-1].post = '</endClickable>';
            else toHighlight[toHighlight.length-1].post = '</a>'; 

            for(let char of toHighlight) char.tagged = true;
        }
        return this;
    }

    buildDoc(){
        let newDoc = this.obj.map(el=>{
            let post = el.post;
            if(el.post == '</endClickable>')post = '</a>';
            return [el.formatting,el.pre,el.char,post];
        }).flat(1).join("");

        this.element.innerHTML = newDoc;
    }
    reset(){
        this.obj = this.obj.map(el=>{
            let pre = "";
            let post = "";
            if(el.pre == this.clickable) pre = ''//this.clickable;
            if(el.post == '</endClickable>')post = ''//</endClickable>';
            return {
                "tagged":false,
                "formatting":el.formatting,
                "pre":pre,
                "char":el.char,
                "post":post,
            }
        });   
        this.buildDoc();
    }
	
	
	getItemIndex(start_,word){  //for grabbing word in context for definition selection
		let at = 0
		let strings = []
		let start = null
		let end = null
		let periods = [null,null]
		
		for(let key in this.obj){
			let cur = this.obj[key]
			if(start==null && cur.char == '.'){
				periods[0] = parseInt(key)+1;
			}
			if(start!=null && cur.char == '.'){
				periods[1] = parseInt(key)+1;
				break;
			}
			for(let i=0; i<cur.formatting.length+1;i++){
				if(start == null && at == start_){
					start = parseInt(key);
				}
				at += 1
			}
		}
		return {'query':this.document.substr(start,word.length),'string':this.document.substr(periods[0],periods[1]-periods[0])}
		
	}
}


/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/*!*********************************************!*\
  !*** ./src/app/navbar/navbar.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* .navbar-nav {\r\n  width: 100%;\r\n  text-align: center;\r\n} */\r\n\r\n/* .nav-item-cust {\r\n  padding-left: 50px;\r\n} */\r\n\r\n/* #navbarColor {\r\n  color: black;\r\n} */\r\n\r\n/* .mr-auto {\r\n  margin-right: auto !important;\r\n} */\r\n\r\n#navbar {\r\n  font-family: Arial, Helvetica Neue, Helvetica, sans-serif !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\" id=\"navbar\" style=\"background-color: #e1e5e9;\">\r\n  <div class=\"container\">\r\n    <a class=\"navbar-brand\" routerLink=\"/course\">CTAS</a>\r\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\"\r\n      aria-label=\"Toggle navigation\">\r\n      <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n    <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n      <ul class=\"navbar-nav mr-auto\">\r\n        <!-- <li class=\"nav-item\" routerLinkActive=\"active\">\r\n          <a class=\"nav-link\" id=\"navbarColor\" routerLink=\"/home\">Home\r\n            <span class=\"sr-only\">(current)</span>\r\n          </a>\r\n        </li> -->\r\n        <li class=\"nav-item\" routerLinkActive=\"active\">\r\n          <a class=\"nav-link\" id=\"navbarColor\" routerLink=\"/course\">My Course</a>\r\n        </li>\r\n        <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"this.role === 'admin'\">\r\n          <a class=\"nav-link\" id=\"navbarColor\" routerLink=\"/analytics\">Analytics</a>\r\n        </li>\r\n      </ul>\r\n      <ul class=\"navbar-nav\">\r\n        <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"!userIsAuthenticated\">\r\n          <a class=\"nav-link\" id=\"navfix1\" routerLink=\"/auth/login\">Log In</a>\r\n        </li>\r\n        <li class=\"nav-item\" *ngIf=\"userIsAuthenticated\">\r\n          <a class=\"nav-link\" id=\"navfix2\" (click)=\"onLogout()\">Log Out</a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</nav>\r\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authService) {
        this.authService = authService;
        this.isLoading = true;
        this.userIsAuthenticated = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListener = this.authService.getAuthStatus().subscribe(function (isAuthenticated) {
            _this.userIsAuthenticated = isAuthenticated;
        });
        this.role = this.authService.getUserRole();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatus = this.authService
            .getAuthStatus()
            .subscribe(function (isAuthenticated) {
            _this.userIsAuthenticated = isAuthenticated;
            _this.role = _this.authService.getUserRole();
        });
        this.isLoading = false;
    };
    /**
     * When clicked logout, then it will call the authentication service, which will trigger more actions such as: Clearing
     * tokens and other informtion.
     */
    NavbarComponent.prototype.onLogout = function () {
        this.authService.logout();
    };
    /**
     * When the naviation is navigated away from, which only happens on reloads then unsubscribe and create new subscription.
     */
    NavbarComponent.prototype.ngOnDestroy = function () {
        this.authListener.unsubscribe();
        this.authStatus.unsubscribe();
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/navbar/navbar.component.css")]
        })
        /**
         * Navbar Component handles the navigation pane and at the same time, checks if the user is authenticated.
         */
        ,
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/posts/create-post/create-post.component.css":
/*!*************************************************************!*\
  !*** ./src/app/posts/create-post/create-post.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#postbtn {\r\n  margin-top: 1em;\r\n  margin-bottom: 2em;\r\n}\r\n\r\n.container {\r\n  text-align: center;\r\n  /* padding-top: 0.25em; */\r\n}\r\n\r\n.input-group {\r\n  padding-bottom: 1em;\r\n}\r\n\r\nmat-spinner {\r\n  margin: auto;\r\n}\r\n"

/***/ }),

/***/ "./src/app/posts/create-post/create-post.component.html":
/*!**************************************************************!*\
  !*** ./src/app/posts/create-post/create-post.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-spinner *ngIf=\"isLoading\"></mat-spinner>\r\n<div class=\"container\">\r\n  <ng-template [ngIf]=\"userIsAuthenticated && this.role == 'teacher' || userIsAuthenticated && this.role == 'admin'\">\r\n    <form [formGroup]='form' name=\"test\" *ngIf=\"!isLoading\">\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control ng-pristine ng-invalid\" name=\"header\" placeholder=\"Post Title\" formControlName=\"header\">\r\n      </div>\r\n      <div class=\"input-group\">\r\n        <textarea class=\"form-control\" rows=\"3\" name=\"message\" placeholder=\"Info (Description)\" formControlName=\"message\"></textarea>\r\n      </div>\r\n      <div class=\"input-group\">\r\n        <textarea class=\"form-control\" rows=\"3\" name=\"abstract\" placeholder=\"Abstract\" formControlName=\"abstract\"></textarea>\r\n      </div>\r\n      <div class=\"input-group\">\r\n        <textarea class=\"form-control\" rows=\"3\" name=\"body\" placeholder=\"Body (Content)\" formControlName=\"body\"></textarea>\r\n      </div>\r\n      <div class=\"input-group\">\r\n        <textarea class=\"form-control\" rows=\"3\" name=\"references\" placeholder=\"References (Links to external web pages/books)\" formControlName=\"references\"></textarea>\r\n      </div>\r\n      <button class=\"btn btn-success btn-sm\" id=\"postbtn\" type=\"button\" [disabled]=\"!form.valid\" (click)=\"onSavePost()\">{{ btnText }}</button>\r\n    </form>\r\n  </ng-template>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/posts/create-post/create-post.component.ts":
/*!************************************************************!*\
  !*** ./src/app/posts/create-post/create-post.component.ts ***!
  \************************************************************/
/*! exports provided: CreatePostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatePostComponent", function() { return CreatePostComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _posts_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../posts.service */ "./src/app/posts/posts.service.ts");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../auth/auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CreatePostComponent = /** @class */ (function () {
    function CreatePostComponent(postsService, route, authService, router) {
        this.postsService = postsService;
        this.route = route;
        this.authService = authService;
        this.router = router;
        this.isLoading = false;
        this.mode = 'create';
        this.userIsAuthenticated = false;
        this.btnText = 'Create Post';
    }
    /**
     * This runs when this component is loaded. Checks if the user is authenticted and what
     * role the user is in order to be able to use extra features. It checks the Post ID which
     * is set in the URL.
     */
    CreatePostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.theModuleName = this.route.snapshot.paramMap.get('text');
        var withoutPunct = this.theModuleName.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, ' ');
        this.moduleNameWithoutPunc = withoutPunct;
        this.form = this.createForm();
        this.role = this.authService.getUserRole();
        this.route.paramMap.subscribe(function (paramMap) {
            if (paramMap.has('postId')) {
                _this.mode = 'edit';
                _this.btnText = 'Modify Post';
                _this.postId = paramMap.get('postId');
                _this.isLoading = true;
                _this.postsService.getPost(_this.postId).subscribe(function (postData) {
                    _this.isLoading = false;
                    _this.post = {
                        id: postData._id,
                        header: postData.header,
                        message: postData.message,
                        body: postData.body,
                        references: postData.references,
                        poster: postData.poster,
                        moduleName: postData.moduleName,
                        abstract: postData.abstract,
                    };
                    _this.form.setValue({
                        header: _this.post.header,
                        message: _this.post.message,
                        body: _this.post.body,
                        references: _this.post.references,
                        abstract: _this.post.abstract
                    });
                });
            }
            else {
                _this.mode = 'create';
                _this.btnText = 'Create Post';
                _this.postId = null;
            }
        });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatus = this.authService
            .getAuthStatus()
            .subscribe(function (isAuthenticated) {
            _this.userIsAuthenticated = isAuthenticated;
            _this.role = _this.authService.getUserRole();
            _this.isLoading = false;
        });
    };
    /**
     * CreateForm handles the form validation for the Post creation.
     */
    CreatePostComponent.prototype.createForm = function () {
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            header: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(200)
                ]
            }),
            message: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(400)
                ]
            }),
            body: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(5),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(15000)
                ]
            }),
            references: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(5),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(2000)
                ]
            }),
            abstract: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(20),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(2000)
                ]
            })
        });
    };
    /**
     * When onSavePost is called then, it checks if the form is valid if not it will return.
     * The spinner is set to true until the process is complete.
     * If the mode is on create it will call a different method from the Post Service.
     * You will then get redirected once its complete to the '/module' followed by setting the
     * spinner to false and reseting the form. Reseting the form is not required, but we have it
     * just incase any issues arrise.
     */
    CreatePostComponent.prototype.onSavePost = function () {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postsService.addPost(this.form.value.header, this.form.value.message, this.form.value.body, this.form.value.references, this.postId, this.moduleNameWithoutPunc, this.form.value.abstract);
        }
        else {
            this.postsService.updatePost(this.postId, this.form.value.header, this.form.value.message, this.form.value.body, this.form.value.references, this.form.value.abstract);
            this.router.navigate(['/module', this.theModuleName]);
        }
        this.isLoading = false;
        this.form.reset();
    };
    /**
     * If you navigate of this HTML page it will then unsubscribe from the subscription to avoid
     * memory leakage.
     */
    CreatePostComponent.prototype.ngOnDestroy = function () {
        this.authStatus.unsubscribe();
    };
    CreatePostComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-post',
            template: __webpack_require__(/*! ./create-post.component.html */ "./src/app/posts/create-post/create-post.component.html"),
            styles: [__webpack_require__(/*! ./create-post.component.css */ "./src/app/posts/create-post/create-post.component.css")]
        })
        /**
         * Create Post Component handles the creation of Posts. It also takes care of editing posts.
         * Checks if user is authenticated before allowing user to view particular buttons and restricts
         * user with a limited amount of features depending on authorisation level.
         */
        ,
        __metadata("design:paramtypes", [_posts_service__WEBPACK_IMPORTED_MODULE_3__["PostsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], CreatePostComponent);
    return CreatePostComponent;
}());



/***/ }),

/***/ "./src/app/posts/posts.module.ts":
/*!***************************************!*\
  !*** ./src/app/posts/posts.module.ts ***!
  \***************************************/
/*! exports provided: PostsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostsModule", function() { return PostsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _create_post_create_post_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./create-post/create-post.component */ "./src/app/posts/create-post/create-post.component.ts");
/* harmony import */ var _show_post_show_post_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./show-post/show-post.component */ "./src/app/posts/show-post/show-post.component.ts");
/* harmony import */ var _angular_material_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../angular-material.module */ "./src/app/angular-material.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PostsModule = /** @class */ (function () {
    function PostsModule() {
    }
    PostsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_create_post_create_post_component__WEBPACK_IMPORTED_MODULE_4__["CreatePostComponent"], _show_post_show_post_component__WEBPACK_IMPORTED_MODULE_5__["ShowPostComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                _angular_material_module__WEBPACK_IMPORTED_MODULE_6__["AngularMaterialModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]
            ],
            exports: [
                _create_post_create_post_component__WEBPACK_IMPORTED_MODULE_4__["CreatePostComponent"],
                _show_post_show_post_component__WEBPACK_IMPORTED_MODULE_5__["ShowPostComponent"]
            ]
        })
    ], PostsModule);
    return PostsModule;
}());



/***/ }),

/***/ "./src/app/posts/posts.service.ts":
/*!****************************************!*\
  !*** ./src/app/posts/posts.service.ts ***!
  \****************************************/
/*! exports provided: PostsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostsService", function() { return PostsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BACKEND_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl + '/posts/';
var PostsService = /** @class */ (function () {
    function PostsService(http) {
        this.http = http;
        this.posts = [];
        this.postsUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    /**
     * This is the Get query. It requests the backend for all the Posts which include the
     * header, message, post ID, body, references and the poster ID.
     */
    PostsService.prototype.getPosts = function () {
        var _this = this;
        this.http
            .get(BACKEND_URL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (postData) {
            return postData.posts.map(function (post) {
                return {
                    header: post.header,
                    message: post.message,
                    id: post._id,
                    body: post.body,
                    references: post.references,
                    poster: post.poster,
                    moduleName: post.moduleName,
                    abstract: post.abstract
                };
            });
        }))
            .subscribe(function (transformedPosts) {
            _this.posts = transformedPosts;
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    /**
     * This is the get updated posts as Observable.
     */
    PostsService.prototype.getPostUpdateListenerTwo = function () {
        return this.postsUpdated.asObservable();
    };
    /**
     * This gets the posts as an observable with a type (currently set as <any>).
     */
    PostsService.prototype.getPostUpdateListener = function () {
        return this.http.get(BACKEND_URL);
    };
    /**
     * This returns the post with the ID, header, message, body, reference and
     * the poster, by providing the ID to the post.
     * @param id Gets post by the ID.
     */
    PostsService.prototype.getPost = function (id) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(BACKEND_URL + id);
    };
    /**
     * This is a Post method, you are passing the header, message, body, references and poster.
     * The ID of the post gets done automatically by Mongoose.
     * @param header The header of the post provided by the user when creating the post.
     * @param message The message of the post provided by the user when creating the post.
     * @param body The body of the post provided by the user when creating the post.
     * @param references The reference of the post provided by the user when creating the post.
     * @param poster The poster of the post provided by the user when creating the post.
     */
    PostsService.prototype.addPost = function (header, message, body, references, poster, moduleName, abstract) {
        var _this = this;
        var postData = {
            header: header,
            message: message,
            body: body,
            references: references,
            moduleName: moduleName,
            abstract: abstract
        };
        console.log(postData);
        this.http
            .post(BACKEND_URL, postData)
            .subscribe(function (responseData) {
            var post = {
                id: responseData.post.id,
                header: header,
                message: message,
                body: body,
                references: references,
                poster: poster,
                moduleName: moduleName,
                abstract: abstract
            };
            _this.posts.push(post);
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    /**
     * This is the Put method, You provide the header, message, body and reference and the ID of
     * the Post and the Poster is not required to be provided since they should not change.
     * @param id ID is automatically provided, this was tweaked in the Show.Post.component
     * @param header The header of the post provided by the user when updating the post.
     * @param message The message of the post provided by the user when updating the post.
     * @param body The body of the post provided by the user when updating the post.
     * @param references The reference of the post provided by the user when updating the post.
     */
    PostsService.prototype.updatePost = function (id, header, message, body, references, abstract) {
        var _this = this;
        var postData;
        postData = {
            id: id,
            header: header,
            message: message,
            body: body,
            references: references,
            poster: null,
            abstract: abstract,
        };
        this.http
            .put(BACKEND_URL + id, postData)
            .subscribe(function (response) {
            var updatedPosts = _this.posts.slice();
            var oldPostIndex = updatedPosts.findIndex(function (p) { return p.id === id; });
            var post = {
                id: id,
                header: header,
                message: message,
                body: body,
                references: references,
                poster: null,
                abstract: abstract,
            };
            updatedPosts[oldPostIndex] = post;
            _this.posts = updatedPosts;
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    /**
     * This is a delete method, you send the ID of the post that you want to delete
     * to the backend.
     * @param postId The ID of the Post that the user wishes to delete.
     */
    PostsService.prototype.deletePost = function (postId) {
        var _this = this;
        this.http
            .delete(BACKEND_URL + postId)
            .subscribe(function () {
            var updatedPosts = _this.posts.filter(function (post) { return post.id !== postId; });
            _this.posts = updatedPosts;
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    PostsService.prototype.pageVisitCount = function (postId) {
        var postViewCount = {
            postId: postId
        };
        return this.http
            .post(BACKEND_URL + '/page-count', postViewCount)
            .subscribe(function (response) {
            // console.log(response);
        }, function (error) {
            console.log(error);
        });
    };
    PostsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' })
        /**
         * Post Service works with all the posts. There is a Put, Delete, Get and Post query.
         */
        ,
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], PostsService);
    return PostsService;
}());



/***/ }),

/***/ "./src/app/posts/show-post/show-post.component.css":
/*!*********************************************************!*\
  !*** ./src/app/posts/show-post/show-post.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#deleteBtn {\r\n  margin-left: 1em;\r\n}\r\n\r\n.card-title {\r\n  font-weight: bold;\r\n}\r\n\r\n#editBtn {\r\n  margin-left: 1em;\r\n}\r\n\r\n#btnPro {\r\n  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\r\n  font-family: courier;\r\n  color: white;\r\n}\r\n\r\nmat-spinner {\r\n  margin: auto;\r\n}\r\n\r\n/* #btn {\r\n  max-height: 3px;\r\n} */\r\n"

/***/ }),

/***/ "./src/app/posts/show-post/show-post.component.html":
/*!**********************************************************!*\
  !*** ./src/app/posts/show-post/show-post.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-spinner *ngIf=\"isLoading\"></mat-spinner>\r\n<div class=\"container\">\r\n  <ng-template [ngIf]=\"posts.length > 0 && !isLoading\">\r\n    <ng-template ngFor let-post [ngForOf]=\"posts\" let-$index=\"index\">\r\n      <div class=\"card\" *ngIf=\"post.moduleName === this.moduleNameWithoutPunc\">\r\n        <div id=\"accordion\">\r\n          <div class=\"card-body\">\r\n            <h5 class=\"mb-0\">\r\n              <button class=\"btn btn-link\" data-toggle=\"collapse\" [attr.data-target]=\"'#demo' + $index\" aria-expanded=\"true\"\r\n                aria-controls=\"collapseOne\">\r\n                {{ post.header }}\r\n              </button>\r\n            </h5>\r\n            <div id=\"demo{{$index}}\" class=\"collapse hide\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\r\n              <div class=\"card-body\">\r\n                {{ post.message }}\r\n                <hr>\r\n                <a class=\"btn btn-dark btn-sm\" id=\"btnPro\" (click)=\"onAnnotation(post.id)\"> View Document\r\n                  <i class=\"far fa-file-alt\"></i>\r\n                </a>\r\n              </div>\r\n            </div>\r\n            <ng-template [ngIf]=\"userIsAuthenticated && userId == post.poster || userIsAuthenticated && this.role == 'admin'\">\r\n              <hr>\r\n              <button class=\"btn btn-outline-primary btn-sm\" id=\"editBtn\" (click)=\"onEdit(post.id)\">Edit</button>\r\n              <button class=\"btn btn-outline-danger btn-sm\" id=\"deleteBtn\" (click)=\"onDelete(post.id)\">Delete</button>\r\n            </ng-template>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </ng-template>\r\n  </ng-template>\r\n  <div>\r\n    <p *ngIf=\"posts.length <= 0 && !isLoading\">No posts added yet!</p>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/posts/show-post/show-post.component.ts":
/*!********************************************************!*\
  !*** ./src/app/posts/show-post/show-post.component.ts ***!
  \********************************************************/
/*! exports provided: ShowPostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowPostComponent", function() { return ShowPostComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _posts_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../posts.service */ "./src/app/posts/posts.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../auth/auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ShowPostComponent = /** @class */ (function () {
    function ShowPostComponent(postsService, router, authService, route) {
        this.postsService = postsService;
        this.router = router;
        this.authService = authService;
        this.route = route;
        this.posts = [];
        this.editClicked = false;
        this.annoClicked = false;
        this.userIsAuthenticated = false;
    }
    ShowPostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.theModuleName = this.route.snapshot.paramMap.get('text');
        var withoutPunct = this.theModuleName.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, ' ');
        this.moduleNameWithoutPunc = withoutPunct;
        this.isLoading = true;
        this.postsService.getPosts();
        this.role = this.authService.getUserRole();
        this.userId = this.authService.getUserId();
        this.postsSub = this.postsService
            .getPostUpdateListenerTwo()
            .subscribe(function (posts) {
            var thePosts = posts;
            _this.isLoading = false;
            thePosts.map(function (post) {
                if (post.moduleName === _this.moduleNameWithoutPunc) {
                    _this.posts = posts;
                }
            });
            _this.posts.reverse();
        });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatus = this.authService
            .getAuthStatus()
            .subscribe(function (isAuthenticated) {
            _this.userIsAuthenticated = isAuthenticated;
            _this.userId = _this.authService.getUserId();
            _this.role = _this.authService.getUserRole();
        });
    };
    /**
     * When clicking the edit post it sets it to true and then navigates you to /edit with
     * the post ID that you wish to edit.
     * @param postId The ID of the post you wish to edit.
     */
    ShowPostComponent.prototype.onEdit = function (postId) {
        if (this.editClicked === false) {
            this.editClicked = true;
            this.router.navigate(['/module', this.theModuleName, 'edit', postId]);
            // this.router.navigate(['/edit', postId]);
        }
        else {
            this.editClicked = false;
            this.router.navigate(['/module', this.theModuleName]);
        }
    };
    /**
     * When clicking the document icon/button on the Post, you can then view the annotation,
     * it will redirect you to '/annotation' and passes the postId.
     * @param postId The ID of the post you want to view.
     */
    ShowPostComponent.prototype.onAnnotation = function (postId) {
        if (this.annoClicked === false) {
            this.annoClicked = true;
            if (this.role === 'student') {
                this.postsService.pageVisitCount(postId);
            }
            this.router.navigate(['/annotation', postId]);
        }
        this.annoClicked = false;
    };
    /**
     * When onDelete method will delete the Post ID you have passed through by clicking the
     * delete on the post.
     * @param postId The ID of the post you wish to delete.
     */
    ShowPostComponent.prototype.onDelete = function (postId) {
        // this.isLoading = true;
        this.postsService.deletePost(postId);
    };
    /**
     * If you navigate of this HTML page it will then unsubscribe from the subscription to avoid
     * memory leakage.
     */
    ShowPostComponent.prototype.ngOnDestroy = function () {
        this.postsSub.unsubscribe();
        this.authStatus.unsubscribe();
    };
    ShowPostComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-show-post',
            template: __webpack_require__(/*! ./show-post.component.html */ "./src/app/posts/show-post/show-post.component.html"),
            styles: [__webpack_require__(/*! ./show-post.component.css */ "./src/app/posts/show-post/show-post.component.css")]
        })
        /**
         * Show Post Component, this component reterives all the posts from the database.
         * They can then be edited through this component. The loading spinner turns true
         * until the posts have all been reterived.
         */
        ,
        __metadata("design:paramtypes", [_posts_service__WEBPACK_IMPORTED_MODULE_1__["PostsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ShowPostComponent);
    return ShowPostComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    apiUrl: 'http://localhost:3000/api'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Robert\Desktop\MRes\CTASGithub\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map