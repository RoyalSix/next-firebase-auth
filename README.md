[![Build Status](https://img.shields.io/github/workflow/status/gladly-team/next-firebase-auth/Unit%20test,%20log%20code%20coverage,%20and%20build)](https://github.com/gladly-team/next-firebase-auth/actions?query=workflow%3A%22Unit+test%2C+log+code+coverage%2C+and+build%22)
[![codecov](https://codecov.io/gh/gladly-team/next-firebase-auth/branch/main/graph/badge.svg)](https://codecov.io/gh/gladly-team/next-firebase-auth)
[![npm](https://img.shields.io/npm/v/next-firebase-auth.svg)](https://www.npmjs.com/package/next-firebase-auth)

# next-firebase-auth
Simple Firebase authentication for all Next.js rendering strategies.

#### [Demo](#demo) • [Alternatives](#when-not-to-use-this-package) • [Getting Started](#get-started) • [API](#api) • [Config](#config) • [Types](#types) • [Troubleshooting](#troubleshooting) • [Limitations](#limitations--feedback)

## What It Does
This package makes it simple to get the authenticated Firebase user and ID token during both client-side and server-side rendering (SSR).

###### &nbsp;&nbsp;&nbsp;&nbsp; 🌍 &nbsp; Support for all Next.js rendering strategies
######  &nbsp;&nbsp;&nbsp;&nbsp; 🔒 &nbsp; Signed, secure, HTTP-only cookies by default
###### &nbsp;&nbsp;&nbsp;&nbsp; 🆔 &nbsp; Server-side access to the user's Firebase ID token
######  &nbsp;&nbsp;&nbsp;&nbsp; 🍪 &nbsp; Built-in cookie management
###### &nbsp;&nbsp;&nbsp;&nbsp; ↩️ &nbsp; Built-in support for redirecting based on the user's auth status

We treat the Firebase JS SDK as the source of truth for auth status. When the user signs in, we call an endpoint to generate a refresh token and store the user info, ID token, and refresh token in cookies. Future requests to SSR pages receive the user info and ID token from cookies, refreshing the ID token as needed. When the user logs out, we unset the cookies.

## Demo
[See a live demo](https://nfa-example.vercel.app/) of the [example app](https://github.com/gladly-team/next-firebase-auth/tree/main/example).

## When (Not) to Use this Package

Depending on your app's needs, other approaches might work better for you.

**If your app only uses static pages** or doesn't need the Firebase user for SSR, use the Firebase JS SDK directly to load the user on the client side.
  * *Pros:* It's simpler and removes this package as a dependency.
  * *Cons:* You will not have access to the Firebase user when you use `getServerSideProps`.

**If your app needs the Firebase user for SSR (but does not need the ID token server-side)**, you could consider one of these approaches: 
  1. On the client, set a JavaScript cookie with the Firebase user information once the Firebase JS SDK loads.
      * *Pros:* You won't need login/logout API endpoints. You can include any auth data you'd like, so you can add custom claims, which are not currently supported by this package.
      * *Cons:* The cookie will be unsigned and accessible to other JavaScript, making this approach less secure. You won't always have access to the Firebase ID token server-side, so you won't be able to access other Firebase services. (Note that you can set the ID token in the cookie, but it will expire after an hour and be invalid for future server-side-rendered pages.)
  2. Use [Firebase's session cookies](https://firebase.google.com/docs/auth/admin/manage-cookies).
      * *Pros:* You'll have server-side access to custom claims, which are not currently supported by this package.
      * *Cons:* You won't have access to the Firebase ID token server-side, so you won't be able to access other Firebase services. You'll need to implement logic for verifying the session and managing session state.
      
**This package will likely be helpful** if you expect to use both static pages and SSR or if you need access to Firebase ID tokens server-side. Please check out [current limitations](#limitations--feedback) before diving in.

## Get Started

Install:

`yarn add next-firebase-auth`

Make sure peer dependencies are also installed:

`yarn add firebase firebase-admin next react react-dom`

Create a module to initialize `next-firebase-auth`.

#### Example config:
```js
// ./initAuth.js
import { init } from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    firebaseAuthEmulatorHost: 'localhost:9099',
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'my-example-app-id',
        clientEmail: 'example-abc123@my-example-app.iam.gserviceaccount.com',
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      databaseURL: 'https://my-example-app.firebaseio.com',
    },
    firebaseClientInitConfig: {
      apiKey: 'MyExampleAppAPIKey123', // required
      authDomain: 'my-example-app.firebaseapp.com',
      databaseURL: 'https://my-example-app.firebaseio.com',
      projectId: 'my-example-app-id',
    },
    cookies: {
      name: 'ExampleApp', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  })
}

export default initAuth

```

Set the private environment variables `FIREBASE_PRIVATE_KEY`, `COOKIE_SECRET_CURRENT`, and `COOKIE_SECRET_PREVIOUS` in `.env.local`. See [the config](#config) documentation for details. If you have enabled [the Firebase Authentication Emulator](#https://firebase.google.com/docs/emulator-suite/connect_auth), you will also need to set the `FIREBASE_AUTH_EMULATOR_HOST` environment variable.

Initialize `next-firebase-auth` in `_app.js`:
```js
// ./pages/_app.js
import initAuth from '../initAuth' // the module you created above

initAuth()

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

```

Create login and logout API endpoints that set auth cookies:

```js
// ./pages/api/login
import { setAuthCookies } from 'next-firebase-auth'
import initAuth from '../../initAuth' // the module you created above

initAuth()

const handler = async (req, res) => {
  try {
    await setAuthCookies(req, res)
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ success: true })
}

export default handler
```

```js
// ./pages/api/logout
import { unsetAuthCookies } from 'next-firebase-auth'
import initAuth from '../../initAuth' // the module you created above

initAuth()

const handler = async (req, res) => {
  try {
    await unsetAuthCookies(req, res)
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ success: true })
}

export default handler
```

Finally, use the authenticated user in a page:

```js
// ./pages/demo
import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'

const Demo = () => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <p>Your email is {AuthUser.email ? AuthUser.email : "unknown"}.</p>
    </div>
  )
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Demo)
```

## API

* [init](#initconfig)
* [withAuthUser](#withauthuser-options-pagecomponent)
* [withAuthUserTokenSSR](#withauthusertokenssr-options-getserversidepropsfunc---authuser---)
* [withAuthUserSSR](#withauthuserssr-options-getserversidepropsfunc---authuser---)
* [useAuthUser](#useauthuser)
* [setAuthCookies](#setauthcookiesreq-res)
* [unsetAuthCookies](#unsetauthcookiesreq-res)
* [verifyIdToken](#verifyidtokentoken--promiseauthuser)
* [AuthAction](#authaction)

-----
#### `init(config)`

Initializes `next-firebase-auth`, taking a [config](#config) object. Must be called before calling any other method.

#### `withAuthUser({ ...options })(PageComponent)`

A higher-order function to provide the `AuthUser` context to a component. Use this with any Next.js page that will access the authed user via the [`useAuthUser`](#useauthuser) hook. Optionally, it can client-side redirect based on the user's auth status.

It accepts the following options:

Option | Description | Default
------------ | ------------- | -------------
`whenAuthed` | The action to take if the user is authenticated. One of `AuthAction.RENDER` or `AuthAction.REDIRECT_TO_APP`. | `AuthAction.RENDER` 
`whenUnauthedBeforeInit` | The action to take if the user is *not* authenticated but the Firebase client JS SDK has not yet initialized. One of: `AuthAction.RENDER`, `AuthAction.REDIRECT_TO_LOGIN`, `AuthAction.SHOW_LOADER`. | `AuthAction.RENDER`
`whenUnauthedAfterInit` | The action to take if the user is *not* authenticated and the Firebase client JS SDK has already initialized. One of: `AuthAction.RENDER`, `AuthAction.REDIRECT_TO_LOGIN`. | `AuthAction.RENDER`
`appPageURL` | The redirect destination URL when we should redirect to the app. | `config.appPageURL`
`authPageURL` | The redirect destination URL when we should redirect to the login page. | `config.authPageURL`
`LoaderComponent` | The component to render when the user is unauthed and `whenUnauthedBeforeInit` is set to `AuthAction.SHOW_LOADER`. | null

For example, this page will redirect to the login page if the user is not authenticated:
```jsx
import { withAuthUser, AuthAction } from 'next-firebase-auth'

const DemoPage = () => <div>My demo page</div>

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/my-login-page/'
})(DemoPage)
```

Here's an example of a login page that shows a loader until Firebase is initialized, then redirects to the app if the user is already logged in:
```jsx
import { withAuthUser, AuthAction } from 'next-firebase-auth'

const MyLoader = () => <div>Loading...</div>

const LoginPage = () => <div>My login page</div>

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(LoginPage)
```

#### `withAuthUserTokenSSR({ ...options })(getServerSidePropsFunc = ({ AuthUser }) => {})`

A higher-order function that wraps a Next.js pages's `getServerSideProps` function to provide the `AuthUser` context during server-side rendering. Optionally, it can server-side redirect based on the user's auth status. A wrapped function is optional; if provided, it will be called with a `context` object that contains an [`AuthUser`](#authuser) property.

It accepts the following options:

Option | Description | Default
------------ | ------------- | -------------
`whenAuthed` | The action to take if the user is authenticated. Either `AuthAction.RENDER` or `AuthAction.REDIRECT_TO_APP`. | `AuthAction.RENDER` 
`whenUnauthed` | The action to take if the user is *not* authenticated. Either `AuthAction.RENDER` or `AuthAction.REDIRECT_TO_LOGIN`. | `AuthAction.RENDER`
`appPageURL` | The redirect destination URL when we should redirect to the app. | `config.appPageURL`
`authPageURL` | The redirect destination URL when we should redirect to the login page. | `config.authPageURL`


For example, this page will SSR for authenticated users, fetching props using their Firebase ID token, and will server-side redirect to the login page if the user is not authenticated:

```jsx
import { withAuthUser, AuthAction } from 'next-firebase-auth'

const DemoPage = ({ thing }) => <div>The thing is: {thing}</div>

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  // Optionally, get other props.
  const token = await AuthUser.getIdToken()
  const response = await fetch('/api/my-endpoint', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
  const data = await response.json()
  return {
    props: {
      thing: data.thing
    }
  }
})

export default withAuthUser()(DemoPage)
```

#### `withAuthUserSSR({ ...options })(getServerSidePropsFunc = ({ AuthUser }) => {})`

Behaves nearly identically to `withAuthUserTokenSSR`, with one key difference: it does not validate an ID token. Instead, it simply uses the `AuthUser` data from a cookie. Consequently:
* It does not provide an ID token on the server side. The `AuthUser` provided via context will resolve to null when you call `AuthUser.getIdToken()`.
* It does not need to make a network request to refresh an expired ID token, so it will, on average, be faster than `withAuthUserTokenSSR`.
* It does *not* check for token revocation. If you need verification that the user's credentials haven't been revoked, you should always use `withAuthUserTokenSSR`.

This takes the same options as `withAuthUserTokenSSR`.

#### `useAuthUser()`

A hook that returns the current [`AuthUser`](#authuser). To use this, the Next.js page must be wrapped in `withAuthUser`. If the user is not authenticated, `useAuthUser` will return an `AuthUser` instance with a null `id`.

For example:

```jsx
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

const Demo = () => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <p>Your email is {AuthUser.email ? AuthUser.email : "unknown"}.</p>
    </div>
  )
}

export default withAuthUser()(DemoPage)
```

#### `setAuthCookies(req, res)`

Sets cookies to store the authenticated user's info. Call this from your "login" API endpoint.

Cookies are managed with [`cookies`](https://github.com/pillarjs/cookies). See [the config for cookie options](#cookies).

The `req` argument should be an `IncomingMessage` / Next.js request object. The `res` argument should be a `ServerResponse` / Next.js response object. It requires that the `Authorization` request header be set to the Firebase user ID token, which this package handles automatically.

This can only be called on the server side.

#### `unsetAuthCookies(req, res)`

Unsets (expires) the auth cookies. Call this from your "logout" API endpoint.

The `req` argument should be an `IncomingMessage` / Next.js request object. The `res` argument should be a `ServerResponse` / Next.js response object.

This can only be called on the server side.

#### `verifyIdToken(token) => Promise<AuthUser>`

Verifies a Firebase ID token and resolves to an [`AuthUser`](#authuser) instance. This serves a similar purpose as Firebase admin SDK's [verifyIdToken](https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_the_firebase_admin_sdk).

#### `AuthAction`

An object that defines rendering/redirecting options for `withAuthUser` and `withAuthUserTokenSSR`. See [AuthAction](#authaction-1).

## Config

See an [example config here](#example-config). Provide the config when you call `init`.

**authPageURL**: The default URL to navigate to when `withAuthUser` or `withAuthUserTokenSSR` need to redirect to login. Optional unless using the `AuthAction.REDIRECT_TO_LOGIN` auth action.

**appPageURL**: The default URL to navigate to when `withAuthUser` or `withAuthUserTokenSSR` need to redirect to the app. Optional unless using the `AuthAction.REDIRECT_TO_APP` auth action.

**loginAPIEndpoint**: The API endpoint to call when the auth state changes for an authenticated Firebase user. Must be set unless `tokenChangedHandler` is set.

**logoutAPIEndpoint**: The API endpoint to call when the auth state changes for an unauthenticated Firebase user. Must be set unless `tokenChangedHandler` is set.

**tokenChangedHandler**: A callback that runs when the auth state changes for a particular user. Use this if you want to customize how your client-side app calls your login/logout API endpoints (for example, to use a custom fetcher or add custom headers). `tokenChangedHandler` receives an `AuthUser` as an argument and is called when the user's ID token changes, similarly to Firebase's `onIdTokenChanged` event.

If this callback is specified, user is responsible for:
1. Calling their login/logout endpoints depending on the user's auth state.
2. Passing the user's ID token in the Authorization header
3. Ensuring it allows the request to set cookies.

Cannot be set with `loginAPIEndpoint` or `logoutAPIEndpoint`.

**firebaseAuthEmulatorHost**: The host and port for the local [Firebase Auth Emulator](https://firebase.google.com/docs/emulator-suite/connect_auth#admin_sdks). If this value is set, the auth emulator will be initialized with the provided host and port. 

Must be exactly the same as the value of the `FIREBASE_AUTH_EMULATOR_HOST` environment variable, e.g., `localhost:9099`. 

#### **firebaseAdminInitConfig**

Configuration passed to `firebase-admin`'s [`initializeApp`](https://firebase.google.com/docs/admin/setup#initialize-sdk). It should contain a `credential` property (a plain object) and a `databaseURL` property. **Required** unless you initialize `firebase-admin` yourself before initializing `next-firebase-auth`.

The `firebaseAdminInitConfig.credential.privateKey` cannot be defined on the client side and should live in a secret environment variable.

> Note: if using environent variables in Vercel, add the private key *with double quotes* via the CLI:
>
>   `vercel secrets add firebase-private-key '"my-key-here"'`
>
> Then, use `JSON.parse` in the `firebaseAdminInitConfig.credential.privateKey` property:
>
>    ```
>      privateKey: process.env.FIREBASE_PRIVATE_KEY
>        ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
>        : undefined
>    ```
>
> See [this Vercel issue](https://github.com/vercel/vercel/issues/749#issuecomment-707515089) for more information.

**firebaseClientInitConfig**: Configuration passed to the Firebase JS SDK's [`initializeApp`](https://firebase.google.com/docs/reference/node/firebase#initializeapp). The "firebaseClientInitConfig.apiKey" value is always **required**. Other properties are required unless you initialize the `firebase` app yourself before initializing `next-firebase-auth`.

#### **cookies**

Settings used for auth cookies. We use [`cookies`](https://github.com/pillarjs/cookies) to manage cookies.

Properties include:
* `name`: Used as a base for cookie names: if `name` is set to "MyExample", cookies will be named `MyExample.AuthUser` and `MyExample.AuthUserTokens` (plus `MyExample.AuthUser.sig` and `MyExample.AuthUserTokens.sig` if cookies are signed). **Required.**
* `keys`: Used to sign cookies, as described in [`cookies`](https://github.com/pillarjs/cookies#cookies--new-cookies-request-response--options--). **Required** unless `signed` is set to `false`.
* [All options for `cookies.set`](https://github.com/pillarjs/cookies#cookiesset-name--value---options--0).

The `keys` value cannot be defined on the client side and should live in a secret environment variable.

For security, the `maxAge` value must be two weeks or less. Note that `maxAge` is defined in milliseconds.

> **Note:** The cookies' expirations will be extended automatically when the user loads the Firebase JS SDK.
>
> The Firebase JS SDK is the source of truth for authentication, so if the cookies expire but the user is still authed with Firebase, the cookies will be automatically set again when the user loads the Firebase JS SDK—but the user will not be authed during SSR on that first request.

## Types

### AuthAction

Defines actions to take depending on on a user's auth status, using the following constants:

**`AuthAction.RENDER`**: render the child component

**`AuthAction.SHOW_LOADER`**: show a loader component

**`AuthAction.RETURN_NULL`**: return null instead of any component

**`AuthAction.REDIRECT_TO_LOGIN`**: redirect to the login page

**`AuthAction.REDIRECT_TO_APP`**: redirect to the app

### AuthUser

The auth user object used across server- and client-side contexts. This is a normalized representation of a Firebase user.

**id** - `String|null`

The Firebase user's ID, or null if the user is not authenticated.

**email** - `String|null`

The Firebase user's email address, or null if the user has no email address.

**emailVerified** - `Boolean`

Whether the user's email address is verified.

**getIdToken** - `Function => Promise<String|null>`

An async function that resolves to a valid Firebase ID token string, or null if no valid token is available.

**clientInitialized** - `Boolean`

Whether the Firebase JS SDK has initialized. If `true`, we are no longer using any user info from server-side props.

**firebaseUser** - [`FirebaseUser`](https://firebase.google.com/docs/reference/js/firebase.User)`|null`

The user from the Firebase JS SDK, if it has initialized. Otherwise, null.

**signOut** - `Function => Promise<void>`

A method that calls Firebase's [`signOut`](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout) if the Firebase JS SDK has initialized. If the SDK has not initialized, this method is a noop.

## Troubleshooting

_Stuck? Search [discussions](https://github.com/gladly-team/next-firebase-auth/discussions) or open your own Q&A discussion describing what you've already tried._

#### I get the error "[Some setting] should not be available on the client side."

We expect certain sensitive config values to be falsy on the client side (see the [config validation code](https://github.com/gladly-team/next-firebase-auth/blob/main/src/config.js)). This is a precaution to make sure developers aren't accidentally bundling something like their Firebase private key with client JS.

To fix this, ensure the config setting is `undefined` on the client side by logging it to your browser console. You can use Next's `.env` support to set server-only variables. Never use the `NEXT_PUBLIC*` prefix for any secret values.

#### I get an "INVALID_CUSTOM_TOKEN" error when trying to get a refresh token.

This package will call [a Google endpoint](https://firebase.google.com/docs/reference/rest/auth#section-verify-custom-token) when it needs to refresh a token server-side. You're seeting an error in that request.

To fix this, confirm that your `firebaseAdminInitConfig.credential.clientEmail` is correct. It should be the email paired with your Firebase private key.

If that doesn't help, try inspecting the custom token to manually validate the values and structure. Some people encounter this problem [when their server time is incorrect](https://github.com/firebase/php-jwt/issues/127#issuecomment-291862337).

#### Server-side auth is not working. The user and token are always null when using `withAuthUserTokenSSR`, but client-side auth works.

If auth is working on the client side but not on the server-side, the auth cookies are most likely not set.

To fix this, confirm the auth cookies are set in your browser's dev tools. If they're not set, please check that the `secure`, `sameSite`, and `path` options passed in the `next-firebase-auth` config make sense for your environment. For example, if you're testing on non-HTTPS localhost, make sure `secure` is false.

#### I can't access the Firebase app.

You may want to access the Firebase JS SDK or admin app. To do so, you can initialize the Firebase apps yourself _prior_ to initializing `next-firebase-auth`. [Here's some example code](https://github.com/gladly-team/next-firebase-auth/discussions/61#discussioncomment-323977) with this pattern.

## Limitations & Feedback

We expect some apps will need some features that are not currently available:

* **Dynamic redirect destinations:** Currently, built-in *dynamic* redirects aren't fully supported, because `authPageURL` and `appPageURL` are static. Check out [this proposed enhancement](https://github.com/gladly-team/next-firebase-auth/issues/57) for details. However, it is possible to perform custom routing at SSR by leveraging [the officially-supported](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) `notFound` and `redirect` objects that `getServerSideProps` may return.
* **Supporting custom claims:** Currently, the `AuthUser` object does not include any Firebase custom claims.
* **Firebase emulator support:** It's not simple to use the Firebase emulator with this package. We'd love to make this easier and welcome suggestions. See [this discussion](https://github.com/gladly-team/next-firebase-auth/discussions/63).
* **Supporting custom session logic:** Currently, this package doesn't allow using a custom cookie or session module. Some developers may need this flexibility to, for example, keep auth user data in server-side session storage.

We'd love to hear your feedback on these or other features. Please feel free to [open a discussion](https://github.com/gladly-team/next-firebase-auth/discussions)!

## Developing / Contributing

We welcome contributions! Please feel free to jump into any open issues.

### Using a local version of the package

It can be helpful to use an in-development version of `next-firebase-auth` in another app:

1. Install [yalc](https://www.npmjs.com/package/yalc): `yarn global add yalc`
2. In `next-firebase-auth`, publish a local version: `yarn run dev:publish` -- this builds your local package code, then publishes it with Yalc
3. In another local Next.js app: `yalc add next-firebase-auth`
4. After you make changes to your local `next-firebase-auth`, use `yarn run dev:publish` again to use the latest local code in your app
