
import { authLoading , authError } from '@/redux/slices/appSlice';
import { onAuthSuccess, signIn, createAccount, signInSuccess, signOut, signOutSuccess } from '@/redux/slices/authSlice';
import { clearCart } from '@/redux/slices/cartSlice';
import { clearProfile, setProfile } from '@/redux/slices/profileSlice';
import toast from 'react-hot-toast';
import { call, put } from 'redux-saga/effects'
import { apiCreateAccount, apiSignIn, apiSignOut } from "@/pages/services/authService";

function* handleError(err) {
    yield put(authLoading(false));

    switch (err.code) {
        case 'auth/network-request-failed':
            yield(put(authError({message: 'Network error has occured. Please try again.'})))
            break;
            case 'auth/email-already-in-use':
              yield put(authError({ message: 'Email is already in use. Please use another email' }));
              break;
            case 'auth/wrong-password':
              yield put(authError({ message: 'Incorrect email or password' }));
              break;
            case 'auth/user-not-found':
              yield put(authError({ message: 'Incorrect email or password' }));
              break;
            case 'auth/reset-password-error':
              yield put(authError({ message: 'Failed to send password reset email. Did you type your email correctly?' }));
              break;
            default:
              yield put(authError({ message: err.message }));
              break;
    }
}

function* initRequest() {
    yield put(authError(null));
    yield put(authLoading(true));
}

function* authSaga({type, payload}) {
    switch(type){
           case createAccount.type:
            try {
                yield initRequest()
               const data = yield call(apiCreateAccount, payload.email, payload.password);
               // Profile mock
        yield put(setProfile({
          fullname: data.user.fullname || "client",
          email: data.user.email,
          address: "",
          postalCode: "",
          mobile: "",
          dateJoined: data.user.dateJoined,
        }));

        // Auth state
        yield put(signInSuccess({
          id: data.user.uid,
          role: "USER",
          user_name: data.user.fullname || "User",
        }));

        yield put(authLoading(false));
      } catch (err) {
        yield handleError(err);
      }
      break;

        case signIn.type:
              try {
        yield initRequest();
        const data = yield call(apiSignIn, payload.email, payload.password);

        yield put(setProfile({
          fullname: data.user.fullname,
          email: data.user.email,
          address: "",
          postalCode: "",
          mobile: "",
          dateJoined: data.user.dateJoined,
        }));

        yield put(signInSuccess({
          id: data.user.uid,
          role: "USER",
          user_name: data.user.fullname || "User",
        }));

        yield put(authLoading(false));
      } catch (err) {
        yield handleError(err);
      }
      break;
case signOut.type:
  try {
    yield initRequest();
    yield call(apiSignOut);

    yield put(clearCart());
    yield put(clearProfile());
    yield put(signOutSuccess(null));

    yield put(authLoading(false));
  } catch (err) {
    yield handleError(err);
  }
break;
  
    }
}

export default authSaga;