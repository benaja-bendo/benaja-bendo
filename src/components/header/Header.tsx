import React from "react";
import './Header.scss'

export const Header: React.FC = () => {
    return (<>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </>)
}