import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import {GoSignOut} from 'react-icons/go'

function Navbar() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    // const [user, setUser] = useState(localStorage.getItem('user'))

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    const handleLogout = () => {

        localStorage.clear()
        window.location.reload()
    }

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    Gesso Mania
                    <i class='fab fa-firstdraft' />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/sistema/vendas' className='nav-links' onClick={closeMobileMenu}>
                            Vendas
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/sistema/orçamento' className='nav-links' onClick={closeMobileMenu}>
                            Orçamento
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/sistema/estoque' className='nav-links' onClick={closeMobileMenu}>
                            Estoque
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/sistema/compras' className='nav-links' onClick={closeMobileMenu}>
                            Compras
                        </Link>
                    </li>
                    


                    <li
                        className='nav-item'
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <Link
                            to='/services'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Services <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown && <Dropdown />}
                    </li>
                    <li>
                        <Link
                            to='/sign-up'
                            className='nav-links-mobile'
                            onClick={closeMobileMenu}
                        >
                            Sair
                        </Link>
                    </li>
                    
                </ul>
                           
                   <button className= 'btsignout' onClick = {handleLogout}>Sair<GoSignOut className='icon-sair'/></button>
                
                
                
            </nav>
        </>
    );
}

export default Navbar;