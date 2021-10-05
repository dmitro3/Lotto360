import React from "react";

interface SubmitButtonProps {
    dirty: boolean;
    isValid: boolean;
    isSubmitting: boolean;
    label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    dirty,
    isValid,
    isSubmitting,
    label,
}) => {
    return (
        <button
            type="submit"
            className={
                dirty && isValid
                    ? "btn btn-lg btn-primary btn-block text-uppercase d-flex align-item-center"
                    : "btn btn-lg btn-primary btn-block text-uppercase d-flex align-item-center disabled-btn"
            }
            disabled={!(dirty && isValid)}
        >
            {isSubmitting ? (
                <>
                    <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    <span className="">Loading...</span>
                </>
            ) : (
                label
            )}
        </button>
    );
};

export default SubmitButton;
