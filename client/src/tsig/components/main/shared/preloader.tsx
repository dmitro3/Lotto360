import { FunctionComponent } from "react";

interface PreLoaderProps {}

const PreLoader: FunctionComponent<PreLoaderProps> = () => {
    return (
        <div id="preloader">
            <div data-loader="circle-side"></div>
        </div>
    );
};

export default PreLoader;
