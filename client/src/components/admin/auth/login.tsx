import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { Redirect } from "react-router";

import { AuthenticationApiService } from "../../../api/auth.service";
import { ActionModel, LottoActions } from "../../../reducer/reducer";
import { LoginApiModel } from "../../../api/models/auth.models";
import ButtonWaiting from "../../site/shared/btn.waiting";

interface SigninProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
}

const Signin: FunctionComponent<SigninProps> = ({ dispatch }) => {
    const [loginModel, setLoginModel] = useState<LoginApiModel>({
        name: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        setLoading(true);
        AuthenticationApiService.getCurrentUser()
            .then((res) => {
                if (res && res.data && res.data.result) {
                    dispatch({
                        type: LottoActions.SET_ADMIN_NAME,
                        payload: res.data.result.name,
                    });
                    setRedirect(true);
                } else setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [dispatch]);

    const { name, password } = loginModel;

    const handleSignin = () => {
        setLoading(true);
        AuthenticationApiService.signin(loginModel)
            .then((res) => {
                if (res && res.data && res.data.result) {
                    dispatch({
                        type: LottoActions.SET_ADMIN_NAME,
                        payload: res.data.result.name,
                    });
                    localStorage.setItem("jwt", res.headers["jwt"]);
                    setLoading(false);
                    setRedirect(true);
                } else setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    if (redirect) return <Redirect to={{ pathname: "/admin/dashboard" }} />;

    return (
        <div className="login-bg d-flex justify-content-center align-items-center">
            <div className="bg-light shadow p-4 rounded">
                <h4>Signin</h4>
                <hr />
                <label className="form-label" htmlFor="username">
                    Username
                </label>
                <input
                    id="username"
                    className="form-control"
                    type="text"
                    placeholder="enter username"
                    value={name}
                    onChange={(e) =>
                        setLoginModel({ ...loginModel, name: e.target.value })
                    }
                />
                <label className="form-label mt-3" htmlFor="password">
                    password
                </label>
                <input
                    id="password"
                    autoComplete="false"
                    className="form-control"
                    type="password"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) =>
                        setLoginModel({ ...loginModel, password: e.target.value })
                    }
                />
                <div>
                    <button
                        disabled={loading}
                        className="btn btn-primary btn-lg mt-4"
                        onClick={() => handleSignin()}
                    >
                        {loading && <ButtonWaiting />}
                        {!loading && "signin"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signin;
