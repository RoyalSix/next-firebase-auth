(()=>{"use strict";var e={281:(e,t,n)=>{var r=n(469),i={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},s={};function u(e){return r.isMemo(e)?a:s[e.$$typeof]||i}s[r.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},s[r.Memo]=a;var l=Object.defineProperty,c=Object.getOwnPropertyNames,f=Object.getOwnPropertySymbols,d=Object.getOwnPropertyDescriptor,h=Object.getPrototypeOf,p=Object.prototype;e.exports=function e(t,n,r){if("string"!=typeof n){if(p){var i=h(n);i&&i!==p&&e(t,i,r)}var a=c(n);f&&(a=a.concat(f(n)));for(var s=u(t),v=u(n),g=0;g<a.length;++g){var b=a[g];if(!(o[b]||r&&r[b]||v&&v[b]||s&&s[b])){var y=d(n,b);try{l(t,b,y)}catch(e){}}}}return t}},355:(e,t,n)=>{n.d(t,{S:()=>i,Z:()=>o});var r=n(689),i=(0,r.createContext)(void 0);const o=function(){var e=(0,r.useContext)(i);if(!e)throw new Error("When using `useUser`, the page must be wrapped in `withUser`.");return e}},324:e=>{e.exports=require("firebase/app")},610:e=>{e.exports=require("firebase/auth")},853:e=>{e.exports=require("next/router")},689:e=>{e.exports=require("react")},469:e=>{e.exports=require("react-is")}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{n.r(r),n.d(r,{AuthAction:()=>p,getUserFromCookies:()=>D,init:()=>N,setAuthCookies:()=>j,unsetAuthCookies:()=>H,useUser:()=>v.Z,verifyIdToken:()=>q,withUser:()=>_,withUserSSR:()=>z,withUserTokenSSR:()=>K});var e=n(324),t=n(610);const i=function(){return"undefined"!=typeof window};var o=function(e,t,n){if(n||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))},a=!1;const s=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];if(a){var n=i()?["%cnext-firebase-auth","background: #ffa000; color: #fff; border-radius: 2px; padding: 2px 6px"]:["next-firebase-auth:"];console.log.apply(console,o(o([],n,!1),e,!1))}};var u,l={debug:!1,onVerifyTokenError:function(e){},onTokenRefreshError:function(e){},cookies:{httpOnly:!0,maxAge:6048e5,overwrite:!0,path:"/",sameSite:"strict",secure:!0,signed:!0}},c=function(){return c=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},c.apply(this,arguments)},f=12096e5,d=function(e){var t;s("[init] Setting config with provided value:",c(c(c({},t=e),{cookies:c(c({},t.cookies),{keys:["hidden"]})}),t.firebaseAdminInitConfig&&{firebaseAdminInitConfig:c(c({},t.firebaseAdminInitConfig),t.firebaseAdminInitConfig.credential&&{credential:c(c({},t.firebaseAdminInitConfig.credential),{privateKey:"hidden",clientEmail:"hidden"})})}));var n=e.cookies,r=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}(e,["cookies"]),o=c(c(c({},l),r),{cookies:c(c({},l.cookies),n||{})}),a=function(e){var t=[];e.tokenChangedHandler&&(e.loginAPIEndpoint&&t.push('The "loginAPIEndpoint" setting should not be set if you are using a "tokenChangedHandler".'),e.logoutAPIEndpoint&&t.push('The "logoutAPIEndpoint" setting should not be set if you are using a "tokenChangedHandler".'),e.onLoginRequestError&&t.push('The "onLoginRequestError" setting should not be set if you are using a "tokenChangedHandler".'),e.onLogoutRequestError&&t.push('The "onLogoutRequestError" setting should not be set if you are using a "tokenChangedHandler".')),e.firebaseClientInitConfig&&e.firebaseClientInitConfig.apiKey||t.push('The "firebaseClientInitConfig.apiKey" value is required.'),e.firebaseAuthEmulatorHost&&e.firebaseAuthEmulatorHost.startsWith("http")&&t.push("The firebaseAuthEmulatorHost should be set without a prefix (e.g., localhost:9099)");var n=["function","undefined"];n.indexOf(typeof e.onVerifyTokenError)<0&&t.push('Invalid next-firebase-auth options: The "onVerifyTokenError" setting must be a function.'),n.indexOf(typeof e.onTokenRefreshError)<0&&t.push('Invalid next-firebase-auth options: The "onTokenRefreshError" setting must be a function.'),n.indexOf(typeof e.onLoginRequestError)<0&&t.push('Invalid next-firebase-auth options: The "onLoginRequestError" setting must be a function.'),n.indexOf(typeof e.onLogoutRequestError)<0&&t.push('Invalid next-firebase-auth options: The "onLogoutRequestError" setting must be a function.');var r=e.cookies.keys,o=Array.isArray(r)?r.length&&(!r.filter||r.filter((function(e){return void 0!==e})).length):!!r;return i()?(e.tokenChangedHandler||(e.loginAPIEndpoint||t.push('The "loginAPIEndpoint" setting is required.'),e.logoutAPIEndpoint||t.push('The "logoutAPIEndpoint" setting is required.')),e.firebaseAdminInitConfig&&e.firebaseAdminInitConfig.credential&&e.firebaseAdminInitConfig.credential.privateKey&&t.push('The "firebaseAdminInitConfig" private key setting should not be available on the client side.'),o&&t.push('The "cookies.keys" setting should not be available on the client side.')):(e.cookies.name||t.push('The "cookies.name" setting is required on the server side.'),e.firebaseAuthEmulatorHost&&(process.env.FIREBASE_AUTH_EMULATOR_HOST?process.env.FIREBASE_AUTH_EMULATOR_HOST!==e.firebaseAuthEmulatorHost&&t.push('The "FIREBASE_AUTH_EMULATOR_HOST" environment variable should be the same as the host set in the config'):t.push('The "FIREBASE_AUTH_EMULATOR_HOST" environment variable should be set if you are using the "firebaseAuthEmulatorHost" option')),(!e.cookies.maxAge||e.cookies.maxAge>f)&&t.push('The "cookies.maxAge" setting must be less than two weeks ('.concat(f," ms)."))),{isValid:0===t.length,errors:t}}(o),d=a.isValid,h=a.errors;if(!d)throw new Error("Invalid next-firebase-auth options: ".concat(h.join(" ")));u=o},h=function(){if(!u)throw new Error("next-firebase-auth must be initialized before rendering.");return u};var p;!function(e){e.RENDER="render",e.SHOW_LOADER="showLoader",e.RETURN_NULL="returnNull",e.REDIRECT_TO_LOGIN="redirectToLogin",e.REDIRECT_TO_APP="redirectToApp"}(p||(p={}));var v=n(355),g=n(281),b=n.n(g),y=["aud","auth_time","email","email_verified","exp","firebase","iat","iss","name","phone_number","picture","sub","uid","user_id"],m=function(e){void 0===e&&(e={});var t={};return Object.keys(e).forEach((function(n){y.includes(n)||(t[n]=e[n])})),t},w=function(){return w=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},w.apply(this,arguments)},E=function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{u(r.next(e))}catch(e){o(e)}}function s(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},O=function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(u){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,u])}}};const T=function(e){var t=void 0===e?{}:e,r=t.firebaseUserClientSDK,o=t.firebaseUserAdminSDK,a=t.serializedUser,s=t.clientInitialized,u=void 0!==s&&s,l=t.token,c=void 0===l?null:l,f=t.claims;if([r,o,a].reduce((function(e,t){return t?e+1:e}),0)>1)throw new Error('createUser cannot receive more than one of the following properties: "firebaseUserClientSDK", "firebaseUserAdminSDK", "serializedUser"');if(u&&(o||a))throw new Error('The "clientInitialized" value can only be true when called with the "firebaseUserClientSDK" property or no user.');if(f&&(o||a))throw new Error('The "claims" value can only be set in conjunction with the "firebaseUserClientSDK" property.');if(c&&!o)throw new Error('The "token" value can only be set if the "firebaseUserAdminSDK" property is defined.');var d={},h=null,p=null,v=!1,g=null,b=null,y=null,T=null,R=function(){return E(void 0,void 0,void 0,(function(){return O(this,(function(e){return[2,null]}))}))},A=function(){return E(void 0,void 0,void 0,(function(){return O(this,(function(e){return[2]}))}))},I=null;if(r){if(i()){var U=n(324).getApp,k=n(610),S=k.getAuth,x=k.signOut;A=function(){return E(void 0,void 0,void 0,(function(){return O(this,(function(e){return[2,x(S(U()))]}))}))}}d=m(f),h=r.uid,p=r.email,v=r.emailVerified,b=r.phoneNumber,y=r.displayName,T=r.photoURL,g=r.tenantId,R=function(e){return E(void 0,void 0,void 0,(function(){return O(this,(function(t){return[2,r.getIdToken(e)]}))}))},I=null}else if(o)d=m(o),h=o.uid,p=o.email||null,v=o.email_verified||!1,b=o.phone_number||null,y=o.name,g=o.firebase&&o.firebase.tenant||null,T=o.picture||null,R=function(){return E(void 0,void 0,void 0,(function(){return O(this,(function(e){return[2,c]}))}))},I=c;else if(a){var C=JSON.parse(a);d=C.claims||{},h=C.id||null,p=C.email||null,v=C.emailVerified,g=C.tenantId||null,b=C.phoneNumber||null,y=C.displayName||null,T=C.photoURL||null,R=function(){return E(void 0,void 0,void 0,(function(){return O(this,(function(e){return[2,C._token||null]}))}))},I=C._token||null}return{id:h,email:p,emailVerified:v,tenantId:g,phoneNumber:b,displayName:y,photoURL:T,claims:d,getIdToken:R,clientInitialized:u,firebaseUser:r||null,signOut:A,serialize:function(e){var t=(void 0===e?{}:e).includeToken,n=void 0===t||t;return JSON.stringify(w({id:h,claims:d,email:p,emailVerified:v,tenantId:g,phoneNumber:b,displayName:y,photoURL:T,clientInitialized:u},n&&{_token:I}))}}};var R=n(689),A=function(){return A=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},A.apply(this,arguments)},I=function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{u(r.next(e))}catch(e){o(e)}}function s(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},U=function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(u){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,u])}}},k=function(e){return I(void 0,void 0,void 0,(function(){var t,n,r,i,o,a,u,l,c,f;return U(this,(function(d){switch(d.label){case 0:return t=h(),n=t.loginAPIEndpoint,r=t.logoutAPIEndpoint,i=t.onLoginRequestError,o=t.onLogoutRequestError,e.id?(s("[withUser] Calling the login endpoint."),[4,e.getIdToken()]):[3,11];case 1:if(u=d.sent(),!n)throw new Error("Invalid config.");d.label=2;case 2:return d.trys.push([2,6,,10]),[4,fetch(n,{method:"POST",headers:{Authorization:u||void 0},credentials:"include"})];case 3:return(a=d.sent()).ok?[3,5]:[4,a.json()];case 4:throw c=d.sent(),s("[withUser] The call to the login endpoint failed with status ".concat(a.status," and response: ").concat(JSON.stringify(c))),new Error("Received ".concat(a.status," response from login API endpoint: ").concat(JSON.stringify(c)));case 5:return[3,10];case 6:return l=d.sent(),i&&l instanceof Error?[4,i(l)]:[3,8];case 7:return d.sent(),[3,9];case 8:throw l;case 9:return[3,10];case 10:return[3,20];case 11:if(s("[withUser] Calling the logout endpoint."),!r)throw new Error("Invalid config.");d.label=12;case 12:return d.trys.push([12,16,,20]),[4,fetch(r,{method:"POST",credentials:"include"})];case 13:return(a=d.sent()).ok?[3,15]:[4,a.json()];case 14:throw c=d.sent(),s("[withUser] The call to the logout endpoint failed with status ".concat(a.status," and response: ").concat(JSON.stringify(c))),new Error("Received ".concat(a.status," response from logout API endpoint: ").concat(JSON.stringify(c)));case 15:return[3,20];case 16:return f=d.sent(),o&&f instanceof Error?[4,o(f)]:[3,18];case 17:return d.sent(),[3,19];case 18:throw f;case 19:return[3,20];case 20:return[2,a]}}))}))},S=function(e){return I(void 0,void 0,void 0,(function(){var t,n;return U(this,(function(r){return t=h().tokenChangedHandler,n=T({firebaseUserClientSDK:e,clientInitialized:!0}),t?(s('[withUser] Calling the custom "tokenChangedHandler" provided in the config.'),[2,t(n)]):[2,k(n)]}))}))};var x=function(){return x=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},x.apply(this,arguments)},C=function(e){var t=e.ctx,n=e.user,r=e.redirectDestination;if("function"==typeof r){var i=r({ctx:t,user:n});return C({ctx:t,user:n,redirectDestination:i})}return"string"==typeof r?{destination:r,permanent:!1}:"object"==typeof r?x({permanent:!1},r):void 0},P=function(e){var t=e.redirectConfigName,n=e.redirectURL,r=e.ctx,i=e.user,o=n||h()[t];return function(e,t){if(!t||"string"!=typeof t&&!("destination"in t))throw new Error('The "'.concat(e,'" must be set to a non-empty string, an object literal containing "destination", or a function that returns either.'));return t}(t,C({ctx:r,user:i,redirectDestination:o}))},L=function(){return L=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},L.apply(this,arguments)};const _=function(r){var o=void 0===r?{}:r,a=o.whenAuthed,u=void 0===a?p.RENDER:a,l=o.whenUnauthedBeforeInit,c=void 0===l?p.RENDER:l,f=o.whenUnauthedAfterInit,d=void 0===f?p.RENDER:f,h=o.whenAuthedBeforeRedirect,v=void 0===h?p.RETURN_NULL:h,g=o.appPageURL,y=o.authPageURL,w=o.LoaderComponent,E=void 0===w?null:w;return function(r){s('[withUser] Calling "withUser".');try{var o=n(689),a=n(689),l=a.useEffect,f=a.useCallback,h=a.useMemo,w=n(853).useRouter,O=n(355).S}catch(e){throw"MODULE_NOT_FOUND"===e.code?new Error('The dependencies "react" and "next" are required when calling `withUser`.'):e}var k=function(n){var a=n.userSerialized,b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}(n,["userSerialized"]),k=h((function(){return T({serializedUser:a})}),[a]),x=function(){var n=(0,R.useState)({user:null,claims:{},initialized:!1}),r=n[0],i=n[1],o=(0,R.useState)(!1),a=o[0],u=o[1];return(0,R.useEffect)((function(){var n=!1,r=(0,t.onIdTokenChanged)((0,t.getAuth)((0,e.getApp)()),(function(e){return I(void 0,void 0,void 0,(function(){var r,o;return U(this,(function(a){switch(a.label){case 0:return s("[withUser] The Firebase ID token changed. New Firebase user:",e),u(!1),r={},e?[4,(0,t.getIdTokenResult)(e)]:[3,2];case 1:o=a.sent(),r=m(o.claims),a.label=2;case 2:return i({user:e,claims:r,initialized:!0}),[4,S(e||void 0)];case 3:return a.sent(),n?s("[withUser] Component unmounted before completing the auth API request."):(u(!0),s("[withUser] Completed the auth API request.")),[2]}}))}))}));return function(){r(),n=!0}}),[]),A(A({},r),{authRequestCompleted:a})}(),C=x.user,_=x.claims,N=x.initialized,D=x.authRequestCompleted,j=h((function(){return T({firebaseUserClientSDK:C||void 0,clientInitialized:N,claims:_})}),[C,N,_]),H=N?j:k,q=!!H.id&&!!H.email&&!H.isAnonymous,z=H.clientInitialized,K=q&&u===p.REDIRECT_TO_APP,F=K&&i()&&D,M=!q&&(!z&&c===p.REDIRECT_TO_LOGIN||z&&d===p.REDIRECT_TO_LOGIN),J=M&&i()&&(c===p.REDIRECT_TO_LOGIN||D),V=w(),W=f((function(e){var t=e.basePath,n=e.destination;!1===t?window.location.replace(n):V.replace(n)}),[V]),B=f((function(){s("[withUser] Redirecting to app.");var e=function(e){return P({redirectConfigName:"appPageURL",redirectURL:e.redirectURL,user:e.user,ctx:e.ctx})}({user:H,redirectURL:g});W(e)}),[H,W]),G=f((function(){s("[withUser] Redirecting to login.");var e=function(e){return P({redirectConfigName:"authPageURL",redirectURL:e.redirectURL,user:e.user,ctx:e.ctx})}({user:H,redirectURL:y});W(e)}),[H,W]);l((function(){i()&&(F?B():J&&G())}),[F,J,B,G]);var $,Z=E?o.createElement(E,null):null,Q=o.createElement(O.Provider,{value:H},o.createElement(r,L({},b)));return $=K?v===p.RENDER?Q:v===p.SHOW_LOADER?Z:null:M?c===p.RETURN_NULL?null:c===p.SHOW_LOADER?Z:Q:q||D?Q:c===p.SHOW_LOADER?Z:c===p.RETURN_NULL?null:Q,s("[withUser] Set user to:",H),$};return k.displayName="WithUserHOC",b()(k,r),k}};var N=function(n){(function(e){var t;t=!0===(null==e?void 0:e.debug),a=t,d(e)})(n),i()&&function(){var n=h(),r=n.firebaseClientInitConfig,i=n.firebaseAuthEmulatorHost,o=n.tenantId;if((0,e.getApps)().length)s("[init] Did not initialize the Firebase JS SDK because an app already exists.");else{if(!r)throw new Error('If not initializing the Firebase JS SDK elsewhere, you must provide "firebaseClientInitConfig" to next-firebase-auth.');(0,e.initializeApp)(r),o&&((0,t.getAuth)().tenantId=o),s("[init] Initialized the Firebase JS SDK.")}i&&(0,t.connectAuthEmulator)((0,t.getAuth)((0,e.getApp)()),"http://".concat(i))}()},D=function(){throw new Error('"getUserFromCookies" can only be called server-side.')},j=function(){throw new Error('"setAuthCookies" can only be called server-side.')},H=function(){throw new Error('"unsetAuthCookies" can only be called server-side.')},q=function(){throw new Error('"verifyIdToken" can only be called server-side.')},z=function(){throw new Error('"withUserSSR" can only be called server-side.')},K=function(){throw new Error('"withUserTokenSSR" can only be called server-side.')}})(),module.exports=r})();