import { FunctionComponent } from "react";

interface TargetNavigationProps {
    id: string;
}

const TargetNavigation: FunctionComponent<TargetNavigationProps> = ({ id }) => (
    <a href="/#" id={id} className="opacity-0">
        {" "}
    </a>
);

export default TargetNavigation;
