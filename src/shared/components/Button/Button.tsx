import React from "react";
import {IButtonProps} from "./types/IButtonProps";

const Button: React.FC<IButtonProps> = React.memo(({ onClick }) => {
    return (
        <button type="button" onClick={onClick}>
            get random user
        </button>
    );
});

export default Button;