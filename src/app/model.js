import { merge, createStore } from 'effector';
import { noAuth, asyncSignIn, asyncSignUp } from '../auth/model';
import { TOKEN_NAME } from '../constants';

export const auth = merge([asyncSignIn.done, asyncSignUp.done]);

export const $appName = createStore('Conduit');
export const $currentUser = createStore(null);
export const $viewChangeCounter = createStore(0);
export const $errors = createStore({});
export const $token = $currentUser.map((user) => user && user.token);

$currentUser.on(auth, (_, { result }) => result.user);

$errors.on(noAuth, (_, { error }) => JSON.parse(error.response.text).errors);

$token.watch((token) => {
  if (token) {
    localStorage.setItem(TOKEN_NAME, token);
  }
});
