import { blockExplorerUrl } from "../config/config";

export const CustomToastWithLink = (hash: string, message: string) => (
    <div>
        {message}{" "}
        <a
            href={`${blockExplorerUrl}tx/${hash}`}
            target="_blank"
            rel="noreferrer"
            className="text-white"
        >
            link
        </a>
    </div>
);
