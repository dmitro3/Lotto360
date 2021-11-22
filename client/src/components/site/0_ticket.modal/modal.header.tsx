import { Dispatch, FunctionComponent } from "react";
import { ActionModel, LottoActions } from "../../../reducer/reducer";

interface ModalHeaderProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
}

const ModalHeader: FunctionComponent<ModalHeaderProps> = ({ dispatch }) => {
    return (
        <div className="header text-light d-flex align-items-center justify-content-between px-4 py-3 bg-dark">
            <h5 className="fw-bold fs-5 mb-0">Buy ticket</h5>
            <i
                className="fa-solid fa-multiply fa-xl p-2 pointer"
                onClick={() =>
                    dispatch({ type: LottoActions.SET_SHOW_MODAL, payload: false })
                }
            ></i>
        </div>
    );
};

export default ModalHeader;
