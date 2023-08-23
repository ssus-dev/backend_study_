import React from "react";
import { AuthTemplate } from "../components/auth/AuthTemplate";
import RegisterForm from "../containers/auth/RegisterForm";

export const RegisterPage = () => {
    return (
        <AuthTemplate>
            <RegisterForm />
        </AuthTemplate>
    );
}