import React from "react";
import { PageSize } from "../../../config/config";

interface SearchBoxProps {
    value: string;
    onChange: Function;
    onPageSizeChange: Function;
    selectedSize: number;
}

const SearchBox: React.FC<SearchBoxProps> = ({
    value,
    onChange,
    onPageSizeChange,
    selectedSize,
}) => {
    return (
        <>
            <input
                type="text"
                name="query"
                className="form-control w-auto col-xl-3 col-md-4 col-sm-12"
                placeholder="Search..."
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)}
            />

            <select
                className="form-select w-auto col-xl-3 col-md-4 col-sm-12 clickable"
                aria-label="Default select example"
                defaultValue={selectedSize}
            >
                <option
                    onClick={() => onPageSizeChange(PageSize.SMALL)}
                    value={PageSize.SMALL}
                >
                    {PageSize.SMALL}
                </option>
                <option
                    onClick={() => onPageSizeChange(PageSize.MEDIUM)}
                    value={PageSize.MEDIUM}
                >
                    {PageSize.MEDIUM}
                </option>
                <option
                    onClick={() => onPageSizeChange(PageSize.BIG)}
                    value={PageSize.BIG}
                >
                    {PageSize.BIG}
                </option>
            </select>
        </>
    );
};

export default SearchBox;
