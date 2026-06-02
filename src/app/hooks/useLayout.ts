import { useLocation } from "react-router";

export function useLayout() {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === "/app") {
            return location.pathname === "/app";
        }
        return location.pathname.startsWith(path);
    };

    return {
        location,
        isActive,
    };
}