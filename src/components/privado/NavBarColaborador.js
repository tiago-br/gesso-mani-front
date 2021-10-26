import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar/Navbar.css';

import {GoSignOut} from 'react-icons/go'

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const handleLogout = () => {

        localStorage.clear()
        window.location.reload()
    }

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo' >
                    Gesso Mania
                    <i className='fab fa-firstdraft' />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/sistema/vendas' className='nav-links'>
                            Vendas
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/sistema/orçamento' className='nav-links' >
                            Orçamento
                        </Link>
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
