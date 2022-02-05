import { FunctionComponent } from "react";
import { blockExplorerUrl, lotto360ContractAddress } from "../../../config/config";
import { flexItemsCenter } from "../../constants/classes";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <footer className="p-5 bg5">
            <div className="container">
                <div className={`socials ${flexItemsCenter}`}>
                    <a
                        className="text-white text-decoration-none rounded-100"
                        href="https://twitter.com/Lotto360_io"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fa-brands fa-twitter fa-2x p-3 rounded-100 shadow"></i>
                    </a>
                    <a
                        className="text-white text-decoration-none rounded-100 mx-3"
                        href="https://instagram.com/Lotto360.io"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fa-brands fa-instagram fa-2x p-3 rounded-100 shadow"></i>
                    </a>
                    <a
                        className="text-white text-decoration-none rounded-100 me-3"
                        href="https://t.me/lotto360_io"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fa-brands fa-telegram fa-4x rounded-100 shadow"></i>
                    </a>
                    <a
                        className="text-white text-decoration-none rounded-100"
                        href="mailto:admin@lotto360.io"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fa-solid fa-at fa-2x p-3 rounded-100 shadow"></i>
                    </a>
                </div>
                <div className={`${flexItemsCenter} mt-5`}>
                    <a
                        href={`${blockExplorerUrl}address/${lotto360ContractAddress}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none text-white"
                    >
                        <button className="btn btn-secondary">contract address</button>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
