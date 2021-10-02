import { FunctionComponent } from "react";

interface HowtoPlayProps {}

const HowtoPlay: FunctionComponent<HowtoPlayProps> = () => {
    return (
        <>
            <div className="border-transparent"></div>
            <h4 className="text-center mt-5 fw-bold mt-4">How to participate</h4>
            <p className="text-center mx-auto text-dark max-width-rule">
                Follow the steps to participate in the selected lottery round. Then, if
                your ticket numbers match the winning numbers announced after the draw you
                will be rewarded base on match numbers.
            </p>

            <div className="row">
                <div className="col col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="rounded border border-3 border-info px-3 py-4 mb-3">
                        <div className="d-flex align-items-center">
                            <i className="fa-duotone fa-circle-1 fa-xl me-2"></i>
                            <span className="fw-bold fs-5 text-primary">Buy tickets</span>
                        </div>
                        <p className="text-dark mt-3 mb-0">
                            Buy as many coins as you want. we set ticket price in the
                            begining of each round. you pay BNB to buy tickets.
                        </p>
                    </div>
                </div>

                <div className="col col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="rounded border border-3 border-info px-3 py-4 mb-3">
                        <div className="d-flex align-items-center">
                            <i className="fa-duotone fa-circle-2 fa-xl me-2"></i>
                            <span className="fw-bold fs-5 text-primary">
                                Wait till draw
                            </span>
                        </div>
                        <p className="text-dark mt-3 mb-0">
                            Wait until the draw. You can see each round draw date and time
                            in the upper right corner of round information.
                        </p>
                    </div>
                </div>

                <div className="col col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="rounded border border-3 border-info px-3 py-4 mb-3">
                        <div className="d-flex align-items-center">
                            <i className="fa-duotone fa-circle-3 fa-xl me-2"></i>
                            <span className="fw-bold fs-5 text-primary">
                                Check for prize
                            </span>
                        </div>
                        <p className="text-dark mt-3 mb-0">
                            After each round is finished come back to this page and click
                            check now button to check for any winning tickets.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HowtoPlay;
