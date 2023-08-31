import React from "react";
import './Header.scss';
import { useLocation } from "react-router-dom";
import { links } from "../../App";

const Header: React.FC = () => {
    const { pathname } = useLocation()
    const [title, setTitle] = React.useState('')

    React.useEffect(() => {
        console.log(pathname)
        const titleLink = links.find((link) => link.url === pathname.substring(1))?.title
        if (titleLink && pathname !== '/') {
            setTitle(titleLink)
        } else {
            setTitle('')
        }
    }, [pathname])

    return (
        <header className="header">
            <div className="logo"></div>
            <h1 className='title'>{`Программа отображения${title !== '' ? ' - ' + title : ''}`}</h1>
        </header>
    )
}

export default Header;