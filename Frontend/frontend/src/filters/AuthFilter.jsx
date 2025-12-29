import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";

export default function AuthFilter({ navUri, Component }) {
    const navigate = useNavigate();
    const data = AuthService.Get();

    useEffect(() => {
        if (!data) {
            navigate("/login", { replace: true });
        } else if (navUri) {
            navigate(navUri, { replace: true });
        }
    }, [data, navUri, navigate]);

    if (!data) {
        return null;
    }

    if (navUri) {
        return null;
    }

    return <Component/>;
}
