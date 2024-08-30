import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    testId?: string;
    appearance?: 'primary' | 'secondary'
}