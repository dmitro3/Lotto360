import { FunctionComponent } from "react";
import refCode from "../../../content/img/ref.png";
import refPic from "../../../content/img/ref.svg";

interface ReferProps {}

const Refer: FunctionComponent<ReferProps> = () => {
    return (
        <div className="container margin_120_90">
            <div className="row justify-content-md-center">
                <div className="main_title version_2 col-lg-5">
                    <span>
                        <em></em>
                    </span>
                    <h2>Referral</h2>
                    <div data-cue="slideInUp">
                        <p>
                            Earn 10% of your friend's registering fee simply by referring.
                            <br />
                            To receive your referring share after registration, give your
                            wallet address to a friend and ask them to enter it during the
                            registration process. <br />
                            You can also copy your referral link by clicking the ref link
                            button below the purchase history and asking your friend to
                            register with that link.
                        </p>
                    </div>
                    <div>
                        <h4 data-cue="slideInUp">Referring rules</h4>
                        <p data-cue="slideInUp">
                            We check two condition in our contract before transferring
                            your referral share. referrer should be registered user and
                            you can't reffer to your own wallet.
                        </p>
                        <img
                            data-cue="slideInUp"
                            src={refCode}
                            className="w-100"
                            alt="contract code"
                        />
                    </div>
                </div>
                <div className="col-lg-5 d-flex justify-content-center align-items-center">
                    <div style={{ width: "90%" }}>
                        <img
                            src={refPic}
                            className="w-100"
                            alt="refer friend"
                            data-cue="slideInUp"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Refer;
