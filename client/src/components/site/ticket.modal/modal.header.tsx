import { FunctionComponent } from "react";

interface ModalHeaderProps {}

const ModalHeader: FunctionComponent<ModalHeaderProps> = () => {
    return (
        <div className="header text-light d-flex align-items-center justify-content-between px-4 py-3 bg-dark">
            <h5 className="fw-bold fs-5 mb-0">Buy ticket</h5>
            <i className="fa-solid fa-multiply fa-xl p-2 pointer"></i>
        </div>
    );
};

export default ModalHeader;
