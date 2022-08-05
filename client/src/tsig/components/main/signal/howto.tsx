import { FunctionComponent } from "react";

interface HowToProps {}

const HowTo: FunctionComponent<HowToProps> = () => {
    return (
        <div className="container margin_90_90">
            <div className="main_title center">
                <span>
                    <em></em>
                </span>
                <h2>How to purchase membership</h2>
                <div className="row justify-content-md-center how_2 mt-5">
                    <div className="col-lg-5 text-center">
                        <figure className="mb-5">
                            <img
                                src="img/web_wireframe.svg"
                                data-src="img/web_wireframe.svg"
                                alt=""
                                className="img-fluid lazy"
                                width="360"
                                height="380"
                            />
                        </figure>
                    </div>
                    <div className="col-lg-5">
                        <ul className="text-start">
                            <li data-cue="slideInUp">
                                <h3>
                                    <span>#01.</span>
                                </h3>
                                <h3 className="mt-0 ps-5">Set up your wallet</h3>
                                <p>Set up and connect to your metamask wallet.</p>
                            </li>
                            <li data-cue="slideInUp">
                                <h3>
                                    <span>#02.</span>
                                </h3>
                                <h3 className="mt-0 ps-5">Pay membership fee</h3>
                                <p>Enter your telegram Id & hit Purchase button.</p>
                            </li>
                            <li data-cue="slideInUp">
                                <h3>
                                    <span>#03.</span>
                                </h3>
                                <h3 className="mt-0 ps-5">Wait</h3>
                                <p>It takes afew hours for adding you to channel.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowTo;
