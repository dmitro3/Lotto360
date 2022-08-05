import { FunctionComponent } from "react";
import termPic from "../../../content/img/terms.svg";

interface TermsAndServicesProps {}

const TermsAndServices: FunctionComponent<TermsAndServicesProps> = () => {
    return (
        <div className="container margin_120_90">
            <div className="row justify-content-md-center">
                <div className="col-lg-5 d-flex justify-content-center align-items-center">
                    <div style={{ width: "90%" }}>
                        <img
                            src={termPic}
                            className="w-100"
                            alt="refer friend"
                            data-cue="slideInUp"
                        />
                    </div>
                </div>
                <div className="main_title version_2 col-lg-5">
                    <span>
                        <em></em>
                    </span>
                    <h2>Terms of service</h2>
                    <div>
                        <div>
                            <div data-cue="slideInUp" className="mb-3 mt-3">
                                <span className="num_color">#1</span> We only provide you
                                trading signals with no trading responsibility.
                            </div>
                            <div data-cue="slideInUp" className="mb-3">
                                <span className="num_color">#2</span> We assume that you
                                have a basic knowledge of spot and margin trading on
                                famous trading platforms (Binance, Kucoin, or others).
                            </div>
                            <div data-cue="slideInUp" className="mb-3">
                                <span className="num_color">#3</span> Make sure you can
                                handle your positions during sudden market movements.
                            </div>
                            <div data-cue="slideInUp" className="mb-3">
                                <span className="num_color">#4</span> Double-check your
                                telegram username during registration. We have no
                                responsibility for wrong registration.
                            </div>
                            <div data-cue="slideInUp" className="mb-3">
                                <span className="num_color">#5</span> You have permanent
                                access to the premium telegram channel after registration.
                            </div>
                            <div data-cue="slideInUp" className="mb-3">
                                <span className="num_color">#6</span> It takes a few hours
                                to check your registration and adding you to the premium
                                channel (send a message to our telegram admin if you are
                                not added).
                            </div>
                            <div data-cue="slideInUp">
                                <span className="num_color">#7</span> Do not invest most
                                of your resources on the shitcoins announcing time to time
                                in the channel (just 2% - 3%).
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndServices;
