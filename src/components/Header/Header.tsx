import React from "react";
import './Header.scss';

const Header: React.FC = () => {

    return (
        <header className="header">
            <div className="logo"></div>
            <h1 className='title'>Программа отображения</h1>
        </header>
    )
}

export default Header;