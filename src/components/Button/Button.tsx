import React from "react";
import './Button.scss';

const Button: React.FC<{ title: string, url: string }> = ({ title, url }) => {

    return (
        <a href={url} className="link">{title}</a>
    )
}

export default Button;