import {db, auth } from '../../firebase/index';
import { signInAction } from "./actions";
import {push} from 'connected-react-router'
// import {isValidEmailFormat, isValidRequiredInput} from "../../function/common";
// import {hideLoadingAction, showLoadingAction} from "../loading/actions";

const usersRef = db.collection('users')

export const signIn = (email, password) => {
    return async (dispatch) => {
        // dispatch(showLoadingAction("Sign in..."));
        // if (!isValidRequiredInput(email, password)) {
        //     dispatch(hideLoadingAction());
        //     alert('メールアドレスかパスワードが未入力です。')
        //     return false
        // }
        // if (!isValidEmailFormat(email)) {
        //     dispatch(hideLoadingAction());
        //     alert('メールアドレスの形式が不正です。')
        //     return false
        // }
        return auth.signInWithEmailAndPassword(email, password)
            .then( result => {
                const userState = result.user
                // if (userState) {
                //     dispatch(hideLoadingAction());
                //     throw new Error('ユーザーIDを取得できません');
                // }
                const userId = userState.uid;

                return usersRef.doc(userId).get().then(snapshot => {
                    const data = snapshot.data();
                    // if (!data) {
                    //     dispatch(hideLoadingAction());
                    //     throw new Error('ユーザーデータが存在しません');
                    // }

                    dispatch(signInAction({
                        organizationId : (data.organizationId) ? data.organizationId : "",
                        email: data.email,
                        isSignedIn: true,
                        role: data.role,
                        payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                        userId: userId,
                        userName: data.userName,
                    }));

                    // dispatch(hideLoadingAction());
                    dispatch(push('/'))
                })
            }).catch(() => {
                // dispatch(hideLoadingAction());
            });
    }
};

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                usersRef.doc(user.uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()
                        console.log(data)
                        if (!data) {
                            throw new Error('ユーザーデータが存在しません。')
                        }

                        // Update logged in user state
                        dispatch(signInAction({
                            organizationId : (data.organizationId) ? data.organizationId : "",
                            email: data.email,
                            isSignedIn: true,
                            payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                            role: data.role,
                            userId: user.uid,
                            userName: data.userName,
                        }))
                    })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
};
