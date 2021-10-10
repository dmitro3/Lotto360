import { FunctionComponent } from "react";

interface TicketAmountTitleProps {}

const TicketAmountTitle: FunctionComponent<TicketAmountTitleProps> = () => {
    return (
        <div className="d-flex align-items-center mt-2">
            <i className="fa-duotone fa-ticket fa-xl p-2 pointer"></i>
            <h5 className="fw-bold fs-6 mb-0">
                Enter ticket amount <span className="text-dark">(max 50)</span>
            </h5>
        </div>
    );
};

export default TicketAmountTitle;
