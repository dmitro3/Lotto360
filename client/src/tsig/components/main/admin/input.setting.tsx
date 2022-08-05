/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

interface InputSettingProps {
    placeHolder: string;
    buttonTitle: string;
    loading: boolean;
    value: string;
    onClick: (value: string) => void;
}

const InputSetting: FunctionComponent<InputSettingProps> = ({
    placeHolder,
    buttonTitle,
    loading,
    value,
    onClick,
}) => {
    const [val, setVal] = useState("");

    useEffect(() => setVal(value), []);

    return (
        <div className="row g-0 custom-search-input mx-auto">
            <div className="col-md-9">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder={placeHolder}
                        value={val}
                        disabled={loading}
                        onChange={(e) => setVal(e.currentTarget.value)}
                    />
                </div>
            </div>
            <div className="col-md-3">
                <button
                    className="btn btn-purchase d-flex align-items-center justify-content-center"
                    disabled={loading}
                    onClick={() => onClick(val)}
                >
                    {loading ? <BounceLoader color="#fff" size={30} /> : buttonTitle}
                </button>
            </div>
        </div>
    );
};

export default InputSetting;
