import { FunctionComponent } from "react";
import TargetNavigation from "../shared/target.nav.link";

interface CheckWinProps {}

const CheckWin: FunctionComponent<CheckWinProps> = () => {
    return (
        <div>
            <TargetNavigation id={"check-win"} />
            <div className="p-5 gradient-pink bg5 position-relative">
                <div className="container rounded p-4">
                    <h2 className="text-center fw-bold text-white">
                        Check for winning tickets
                    </h2>
                    <div className="d-flex justify-content-center align-items-center">
                        <div
                            className="max-content px-3 py-1 d-flex my-4 mb-5
                    justify-content-center align-items-center mx-auto rounded text-black"
                        >
                            <i className="fa-duotone fa-question fa-xl fa-flash text-white"></i>
                            <button
                                type="button"
                                className="btn btn-lg btn-secondary mx-5"
                            >
                                <i className="fa-duotone fa-trophy fa-xl me-2"></i>
                                Check now
                            </button>
                            <i className="fa-duotone fa-question fa-xl fa-flash text-white"></i>
                        </div>
                    </div>
                </div>
                <div className="divider-history bg-dark"></div>
            </div>
        </div>
    );
};

export default CheckWin;
