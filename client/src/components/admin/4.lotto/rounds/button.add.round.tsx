import { FunctionComponent } from "react";

interface AddRoundButtonProps {
    setShowModalAddRound: (val: boolean) => void;
}

const AddRoundButton: FunctionComponent<AddRoundButtonProps> = ({
    setShowModalAddRound,
}) => {
    return (
        <div className="d-flex">
            <button
                className="btn btn-primary ms-auto"
                onClick={() => setShowModalAddRound(true)}
            >
                <i className="fa-solid fa-plus fa-xl me-2"></i>
                create round
            </button>
        </div>
    );
};

export default AddRoundButton;
