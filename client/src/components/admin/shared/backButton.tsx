import React from "react";
import { Link } from "react-router-dom";

interface BackButtonProps {
    route: string;
}

const BackButton: React.FC<BackButtonProps> = ({ route }) => {
    return (
        <Link to={route} className="d-flex align-items-center back-arrow">
            <i className="fas fa-arrow-left fa-1x me-2"></i>
            <h6 className="m-0">Back</h6>
        </Link>
    );
};

export default BackButton;
