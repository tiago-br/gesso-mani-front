import React, { Component } from 'react'





class NavbarUser extends Component {
    state = {
        user: localStorage.getItem('user'),
        clicked: false
    }

    handleClick = () => {

        this.setState({
            clicked: !this.state.clicked
        })

    }

    handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    render() {
        return (

            
<p>alooo</p>

        )
    }
}

export default NavbarUser
