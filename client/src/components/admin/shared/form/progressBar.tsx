import React from "react";
interface ProgressBarProps {
    progress: number | undefined;
    barClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, barClass = "" }) => {
    return (
        <div className="bs-component">
            <div className="progress">
                <div
                    className={`progress-bar ${barClass}`}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{
                        width: `${progress}%`,
                    }}
                    aria-valuenow={progress}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
