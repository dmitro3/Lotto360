import { FunctionComponent } from "react";
import ButtonWaiting from "../../4.lotto360/shared/btn.waiting";

interface InputSettingProps {
    loading: boolean;
    value: any;
    title: string;
    btnTitle: string;
    onChange: any;
    onClick: () => void;
}

const InputSetting: FunctionComponent<InputSettingProps> = ({
    btnTitle,
    loading,
    onChange,
    onClick,
    title,
    value,
}) => {
    return (
        <>
            <h4 className="fw-bold">{title}</h4>
            <div className="input-group mb-3">
                <input
                    disabled={loading}
                    type="text"
                    className="form-control"
                    placeholder="Enter value"
                    aria-label="Enter value"
                    aria-describedby="button-addon2"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button
                    disabled={loading}
                    className="btn btn-primary"
                    type="button"
                    id="button-addon2"
                    onClick={() => onClick()}
                >
                    {loading ? <ButtonWaiting /> : btnTitle}
                </button>
            </div>
        </>
    );
};

export default InputSetting;
