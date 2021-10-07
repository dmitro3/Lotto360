import { FunctionComponent } from "react";

interface RulesProps {}

const Rules: FunctionComponent<RulesProps> = () => {
    return (
        <>
            <h4 className="text-center mt-5 fw-bold mt-4">Winning rules</h4>
            <p className="text-center mx-auto text-dark max-width-rule">
                Check your ticket numbers if they are matched in the correct order you are
                the winner check the example below.
            </p>

            <div className="alert alert-dismissible alert-secondary d-flex align-items-center px-3 py-2 mt-4 mb-0">
                <span className="fw-bold fs-5 me-3">Winning numbers</span>
                <div>
                    <i className="fa-solid fa-square-7 text-primary fa-xl me-1"></i>
                    <i className="fa-solid fa-square-4 text-primary fa-xl me-1"></i>
                    <i className="fa-solid fa-square-9 text-primary fa-xl me-1"></i>
                    <i className="fa-solid fa-square-3 text-primary fa-xl me-1"></i>
                    <i className="fa-solid fa-square-0 text-primary fa-xl me-1"></i>
                    <i className="fa-solid fa-square-3 text-primary fa-xl"></i>
                </div>
            </div>

            <div>
                <div className="px-3 py-2 mt-3 rounded border border-2 bg-secondary">
                    <div className="d-flex align-items-center mt-0">
                        <span className="fw-bold fs-5 me-3">3 match numbers</span>
                        <div>
                            <i className="fa-solid fa-square-7 text-success fa-xl me-1"></i>
                            <i className="fa-solid fa-square-4 text-success fa-xl me-1"></i>
                            <i className="fa-solid fa-square-9 text-success fa-xl me-1"></i>
                            <i className="fa-solid fa-square-4 text-danger fa-xl me-1"></i>
                            <i className="fa-solid fa-square-8 text-danger fa-xl me-1"></i>
                            <i className="fa-solid fa-square-2 text-danger fa-xl"></i>
                        </div>
                    </div>
                    <p className="max-width-rule text-dark mb-0">
                        The first three numbers match winning numbers so it wins 3 match
                        prize.
                    </p>
                </div>

                <div className="px-3 py-2 mt-3 rounded border border-2 bg-secondary">
                    <div className="d-flex align-items-center mt-0">
                        <span className="fw-bold fs-5 me-3">2 match numbers</span>
                        <div>
                            <i className="fa-solid fa-square-7 text-success fa-xl me-1"></i>
                            <i className="fa-solid fa-square-4 text-success fa-xl me-1"></i>
                            <i className="fa-solid fa-square-6 text-danger fa-xl me-1"></i>
                            <i className="fa-regular fa-square-3 text-success fa-xl me-1"></i>
                            <i className="fa-regular fa-square-0 text-success fa-xl me-1"></i>
                            <i className="fa-regular fa-square-3 text-success fa-xl"></i>
                        </div>
                    </div>
                    <p className="max-width-rule text-dark mb-0">
                        The first two numbers match winning numbers so it wins 2 match
                        prize. however, the last three numbers match winning numbers,
                        because of wrong third number it doesn't count so it wins 2 match
                        prize.
                    </p>
                </div>

                <div className="px-3 py-2 mt-3 rounded border border-2 bg-secondary">
                    <div className="d-flex align-items-center mt-0">
                        <span className="fw-bold fs-5 me-3">no match number</span>
                        <div>
                            <i className="fa-solid fa-square-2 text-danger fa-xl me-1"></i>
                            <i className="fa-regular fa-square-4 text-success fa-xl me-1"></i>
                            <i className="fa-regular fa-square-9 text-success fa-xl me-1"></i>
                            <i className="fa-regular fa-square-3 text-success fa-xl me-1"></i>
                            <i className="fa-regular fa-square-0 text-success fa-xl me-1"></i>
                            <i className="fa-regular fa-square-3 text-success fa-xl"></i>
                        </div>
                    </div>
                    <p className="max-width-rule text-dark mb-0">
                        The first number does not match so the ticket wins no prize
                        however all other numbers match the winning numbers.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Rules;