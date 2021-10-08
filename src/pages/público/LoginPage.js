import React, { Component } from 'react'

import FormLogin from '../../components/público/FormLogin'
import NavBarClient from '../../components/público/NavBarClient'



class LoginPage extends Component {
    render() {
        return (
            <div>
                <NavBarClient/>
                <div>
                    <FormLogin {...this.props}/>
                </div>
            </div>
        )
    }
}

export default LoginPage
