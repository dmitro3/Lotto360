import { FunctionComponent } from "react";
import { flexItemsCenter } from "../../constants/classes";

interface RulesProps {}

const Rules: FunctionComponent<RulesProps> = () => {
    return (
        <>
            <h4 className="text-center mt-5 fw-bold mt-4">Winning rules</h4>
            <p className="text-center mx-auto text-dark max-width-rule">
                Check your ticket numbers if they are matched in the correct order you are
                the winner check the example below.
            </p>

            <div>
                <div className={flexItemsCenter}>
                    <div className="px-4 py-2 mt-3">
                        <div className="d-flex align-items-center mt-0">
                            <span className="fw-bold fs-5 me-3">Winning numbers</span>
                            <div>
                                <i className="fa-solid fa-circle-7 text-primary fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-4 text-primary fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-9 text-primary fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-3 text-primary fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-0 text-primary fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-3 text-primary fa-2x"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 my-2">
                        <div className="px-4 py-2 mt-3 rounded shadow bg-white h-100">
                            <div className="d-flex align-items-center mt-0">
                                <span className="fw-bold fs-5 me-3 mt-2">3 match:</span>
                            </div>
                            <div className="my-2">
                                <i className="fa-solid fa-circle-7 text-success fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-4 text-success fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-9 text-success fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-4 text-danger fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-8 text-danger fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-2 text-danger fa-2x"></i>
                            </div>
                            <p className="max-width-rule text-dark mb-0">
                                The first three numbers match winning numbers so it wins 3
                                match prize.
                            </p>
                        </div>
                    </div>
                    <div className="col col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 my-2">
                        <div className="px-4 py-2 mt-3 rounded shadow bg-white h-100">
                            <div className="d-flex align-items-center mt-0">
                                <span className="fw-bold fs-5 me-3 mt-2">2 match:</span>
                            </div>
                            <div className="my-2">
                                <i className="fa-solid fa-circle-7 text-success fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-4 text-success fa-2x me-1"></i>
                                <i className="fa-solid fa-circle-6 text-danger fa-2x me-1"></i>
                                <i className="fa-regular fa-circle-3 text-success fa-2x me-1"></i>
                                <i className="fa-regular fa-circle-0 text-success fa-2x me-1"></i>
                                <i className="fa-regular fa-circle-3 text-success fa-2x"></i>
                            </div>
                            <p className="max-width-rule text-dark mb-0">
                                The first two numbers match winning numbers so it wins 2
                                match prize. however, the last three numbers match winning
                                numbers, because of wrong third number it doesn't count so
                                it wins 2 match prize.
                            </p>
                        </div>
                    </div>
                    <div className="col col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 my-2">
                        <div className="px-4 py-2 mt-3 rounded shadow bg-white h-100">
                            <div className="d-flex align-items-center mt-0">
                                <span className="fw-bold fs-5 me-3 mt-2">No match:</span>
                            </div>
                            <div className="my-2">
                                <i className="fa-solid fa-circle-2 text-danger fa-2x me-1"></i>
                                <i className="fa-regular fa-circle-4 text-success fa-2x me-1"></i>
                                <i className="fa-regular fa-circle-9 text-success fa-2x me-1"></i>
                                <i className="fa-regular fa-circle-3 text-success fa-2x me-1"></i>
                                <i className="fa-regular fa-circle-0 text-success fa-2x me-1"></i>
                                <i className="fa-regular fa-circle-3 text-success fa-2x"></i>
                            </div>
                            <p className="max-width-rule text-dark mb-0">
                                The first number does not match so the ticket wins no
                                prize however all other numbers match the winning numbers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Rules;
