import React from "react";
import { css } from "@emotion/react";
import { PulseLoader } from "react-spinners";

export interface LoaderProps {}

const style: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5000,
    backgroundColor: "white",
    flexDirection: "column",
};

const spanStyle: React.CSSProperties = {
    display: "block",
};

const FullScreenLoader: React.FC<LoaderProps> = (): JSX.Element => {
    return (
        <div className="form-loader" style={style}>
            <PulseLoader
                color="#2780e3"
                css={css`
                    height: max-content;
                `}
            />
            <span style={spanStyle} className="mt-2 text-primary">
                Please wait
            </span>
        </div>
    );
};

export default FullScreenLoader;
