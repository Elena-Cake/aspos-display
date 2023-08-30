import React from "react";
import { Link } from "react-router-dom";
import './Button.scss';

type Props = {
    title: string,
    url: string,
    isActive: boolean,
    setActiveLink: () => void
}

const Button: React.FC<Props> = ({ title, url, isActive, setActiveLink }) => {

    return (
        <Link onClick={() => setActiveLink()} to={url} className={`link ${isActive && 'link__active'}`}>{title}</Link>
    )
}

export default Button;