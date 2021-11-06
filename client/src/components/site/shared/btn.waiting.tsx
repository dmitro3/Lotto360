import { FunctionComponent } from "react";

interface ButtonWaitingProps {}

const ButtonWaiting: FunctionComponent<ButtonWaitingProps> = () => {
    return (
        <>
            <i className="fa-solid fa-1x me-2 fa-spinner-third fa-spin"></i> waiting ...
        </>
    );
};

export default ButtonWaiting;
