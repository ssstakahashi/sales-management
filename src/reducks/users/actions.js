export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
        payload: userState
    }
};