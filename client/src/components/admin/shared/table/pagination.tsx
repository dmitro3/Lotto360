/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

interface PaginationProps {
    itemsCount: number;
    pageSize: number;
    currentPage: number;
    onPageChange: Function;
}

const Pagination: React.FC<PaginationProps> = ({
    itemsCount,
    pageSize,
    currentPage,
    onPageChange,
}) => {
    /**
     * Constants *****************************************************************
     */
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const elements: JSX.Element[] = [];
    const leftArrow = (
        <li className="page-item" key="left">
            <i
                className="fas fa-angle-left page-link"
                onClick={() => onPageChange(currentPage - 1)}
            ></i>
        </li>
    );
    const rightArrow = (
        <li className="page-item" key="right">
            <i
                className="fas fa-angle-right page-link"
                onClick={() => onPageChange(currentPage + 1)}
            ></i>
        </li>
    );
    const last = (
        <li className="page-item" key="last">
            <span className="page-link" onClick={() => onPageChange(pagesCount)}>
                Last
            </span>
        </li>
    );
    const first = (
        <li className="page-item" key="first">
            <span className="page-link" onClick={() => onPageChange(1)}>
                First
            </span>
        </li>
    );

    /**
     * Main Conditional Rendering ***************************************************
     */
    if (pagesCount <= 5) {
        if (currentPage > 1) elements.push(leftArrow);

        for (let i = 0; i < pagesCount; i++) {
            i + 1 !== currentPage
                ? elements.push(generatePager(i + 1, onPageChange))
                : elements.push(generatePager(i + 1, onPageChange, true));
        }
        if (currentPage < pagesCount) elements.push(rightArrow);
    } else if (pagesCount > 5 && currentPage <= 3) {
        if (currentPage > 1) elements.push(leftArrow);

        for (let i = 0; i < 5; i++) {
            i + 1 !== currentPage
                ? elements.push(generatePager(i + 1, onPageChange))
                : elements.push(generatePager(i + 1, onPageChange, true));
        }
        elements.push(rightArrow);
        elements.push(last);
    } else if (pagesCount - currentPage > 2) {
        return (
            <nav>
                <ul className="pagination">
                    {first}
                    {leftArrow}
                    {generatePager(currentPage - 2, onPageChange)}
                    {generatePager(currentPage - 1, onPageChange)}
                    {generatePager(currentPage, onPageChange, true)}
                    {generatePager(currentPage + 1, onPageChange)}
                    {generatePager(currentPage + 2, onPageChange)}
                    {rightArrow}
                    {last}
                </ul>
            </nav>
        );
    } else if (pagesCount - currentPage <= 2) {
        elements.push(first);
        elements.push(leftArrow);
        for (let i = 0; i < 5; i++) {
            pagesCount - 4 + i === currentPage
                ? elements.push(generatePager(pagesCount - 4 + i, onPageChange, true))
                : elements.push(generatePager(pagesCount - 4 + i, onPageChange));
        }
        if (currentPage < pagesCount) elements.push(rightArrow);
    }

    return (
        <nav>
            <ul className="pagination">{elements}</ul>
        </nav>
    );
};

const generatePager = (
    number: number,
    onPageChange: Function,
    isMain: boolean = false
) => {
    const liClass = isMain ? "page-item active" : "page-item";

    return (
        <li className={liClass} key={number}>
            <span
                className="page-link"
                onClick={!isMain ? () => onPageChange(number) : () => null}
            >
                {number}
            </span>
        </li>
    );
};

export default Pagination;
