import { FunctionComponent } from "react";
import support from "../../../content/img/support.svg";
import telegram from "../../../content/img/telegram.svg";

interface SupportProps {}

const Support: FunctionComponent<SupportProps> = () => {
    return (
        <div className="container margin_120_90">
            <div className="row justify-content-md-center">
                <div className="main_title version_2 col-lg-5">
                    <span>
                        <em></em>
                    </span>
                    <h2>Support & social</h2>

                    <p data-cue="slideInUp" className="mb-1 mt-5">
                        Feel free to contact our telegram admin, ask questions, or report
                        problems..
                    </p>
                    <div data-cue="slideInUp" className="mb-5">
                        <a
                            href="https://t.me/recreativelarson"
                            target="_blank"
                            rel="noreferrer"
                            className="position-relative border-0 p-0 align-items-center d-flex"
                        >
                            <img src={telegram} width="50" alt="admin" />
                            <span className="fw-bold text-white ms-3">Admin</span>
                        </a>
                    </div>
                    <p data-cue="slideInUp" className="mb-1">
                        Check our public channel for free signals, user profits, and
                        random signal result.
                    </p>
                    <div data-cue="slideInUp">
                        <a
                            href="https://t.me/tradesignalpublic"
                            target="_blank"
                            rel="noreferrer"
                            className="position-relative border-0 p-0 align-items-center d-flex"
                        >
                            <img src={telegram} width="50" alt="admin" />
                            <span className="fw-bold text-white ms-3">
                                Public channel
                            </span>
                        </a>
                    </div>
                </div>
                <div className="col-lg-5 d-flex justify-content-center align-items-center">
                    <div style={{ width: "90%" }}>
                        <img
                            src={support}
                            className="w-100"
                            alt="support"
                            data-cue="slideInUp"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
