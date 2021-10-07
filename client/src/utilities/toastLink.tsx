import { rinkebyScan } from "../config/config";

export const CustomToastWithLink = (hash: string) => (
    <div>
        transaction failed click link for detail
        <a href={`${rinkebyScan}tx/${hash}`} target="_blank" rel="noreferrer">
            {" "}
            link
        </a>
    </div>
);
