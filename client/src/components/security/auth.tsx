import { decode } from "jsonwebtoken";
import { ACCESS_TOKEN_KEY } from "../../config/config";

export const AuthenticationService = {
    getCurrentUser: (): CurrentUser | null => {
        const refreshToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (refreshToken) {
            const data: any = decode(refreshToken);

            if (data && data["roles"] && data["id"]) {
                return {
                    id: data["id"],
                    roles: data["roles"],
                };
            } else return null;
        }
        return null;
    },
};

export interface CurrentUser {
    id: number;
    roles: string[];
}
