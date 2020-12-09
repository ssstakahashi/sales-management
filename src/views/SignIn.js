import React, {useState, useCallback} from 'react';
import { PrimaryButton, TextInput } from "../components/uikit";
import { useDispatch } from "react-redux";
import { signIn } from "../reducks/users/operations";
// import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
        csectioncontainer: {
            margin: "0 auto",
            maxWidth: "400px",
            padding: "1rem",
            height: "auto",
            width: "calc(100% - 2rem)",
        },
        utextcenter : {
            textAlign: "center",
            color: "#4dd0e1",
            fontSize: "1.563rem",
            margin: "0 auto 1rem auto",
        },

        modulespacermedium : {
            height: "48px",
        },
        center : {
            margin: "0 auto",
            textAlign: "center",
          }

    }
)

const SignIn = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[]);

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    },[]);

    return (
        <div className={classes.csectioncontainer}>
            <h2 className={classes.utextcenter}>ログイン</h2>
            <div className={classes.modulespacermedium} />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <div className={classes.modulespacermedium} />
            <div className={classes.center}>
                <PrimaryButton label={"ログイン"} onClick={() => dispatch(signIn(email, password))} />
                {/* <div className="module-spacer--small" />
                <p className="u-text-small" onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</p>
                <p className="u-text-small" onClick={() => dispatch(push('/signup'))}>アカウント登録がまだですか？</p> */}
            </div>
        </div>
    );
};

export default SignIn;