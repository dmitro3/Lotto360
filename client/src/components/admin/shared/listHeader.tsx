import React from "react";
import { Link } from "react-router-dom";

export interface ListHeaderProps {
    formRoute: string;
    title: string;
    buttonTitle: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({
    formRoute,
    title,
    buttonTitle,
}): JSX.Element => {
    return (
        <div className="d-flex align-items-center">
            <i className="far fa-list-alt fa-2x me-2"></i>
            <h4 className="m-0">{title}</h4>
            <Link to={formRoute} className="ms-auto">
                <button type="button" className="btn btn-primary">
                    <i className="fas fa-plus pr-2 me-2" aria-hidden="true"></i>
                    {buttonTitle}
                </button>
            </Link>
        </div>
    );
};

export default ListHeader;
