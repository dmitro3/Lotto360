import { rinkebyScan } from "../config/config";

export const CustomToastWithLink = (hash: string, message: string) => (
    <div>
        {message}{" "}
        <a
            href={`${rinkebyScan}tx/${hash}`}
            target="_blank"
            rel="noreferrer"
            className="text-white"
        >
            link
        </a>
    </div>
);
