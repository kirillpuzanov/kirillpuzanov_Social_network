import React from 'react';
import c from './Header.module.css';
export function Header() {
    return (
        <header className={c.Header}>
            <a href='#'><img alt='logo'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"/>
            </a>
        </header>
    )
}