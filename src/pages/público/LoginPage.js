import React, { Component } from 'react'

import FormLogin from '../../components/público/FormLogin'
import NavBarClient from '../../components/público/NavBarClient'



class LoginPage extends Component {
    render() {
        return (
            <div>
                <NavBarClient/>
                
                    <FormLogin {...this.props}/>
               
            </div>
        )
    }
}

export default LoginPage
