import React from "react";
import { ErrorMessage, Field, FormikErrors, FormikTouched } from "formik";

interface InputBoxProps {
    label: string;
    property: string;
    inputType: string;
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
}

const InputBox: React.FC<InputBoxProps> = ({
    errors,
    inputType,
    label,
    property,
    touched,
}) => {
    if (inputType === "checkbox") {
        return (
            <div className="my-4 form-check">
                <Field
                    type={inputType}
                    name={property}
                    id={property}
                    className={
                        errors[property] && touched[property]
                            ? "is-invalid form-check-input clickable"
                            : "form-check-input clickable"
                    }
                />
                <label htmlFor={property} className="form-check-label clickable">
                    {label}
                </label>
                <ErrorMessage
                    component="span"
                    name={property}
                    className="error text-danger"
                />
            </div>
        );
    }

    return (
        <div className="mb-3 col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <label htmlFor={property} className="form-label">
                {label}
            </label>
            <Field
                type={inputType}
                name={property}
                placeholder={`Please enter your ${label}`}
                className={
                    errors[property] && touched[property]
                        ? "is-invalid  form-control"
                        : !errors[property] && touched[property]
                        ? "is-valid  form-control"
                        : "form-control"
                }
            />
            <ErrorMessage
                component="span"
                name={property}
                className="error text-danger"
            />
        </div>
    );
};

export default InputBox;
