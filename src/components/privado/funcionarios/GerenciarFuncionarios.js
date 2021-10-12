import React, { Component } from 'react'
import api from '../../../utils/api.util'
import UsersCard from './UsersCard'

class GerenciarFuncionarios extends Component {
    state={
        load:false,
        users:[]
    }
    componentDidMount = async() =>{
        const {data} = await api.getUsers()

        this.setState({
            users:data,
            load:true
        })
    }
    handleDeleteUser = async(id) =>{
        try {
           await api.deleteUsers(id)
           const {data} = await api.getUsers()
           this.setState({
               users:data
           })
        } catch (error) {
        }
    }
    render() {
        console.log(this.state.users)
        return (
            <div>
                {this.state.load?
                    <section>
                        {
                            this.state.users.map(user=>
                            <UsersCard delete={this.handleDeleteUser} id={user._id} user={user.username}/>
                            )
                        }
                    </section>
                    :
                    null  
                }
            </div>
        )
    }
}

export default GerenciarFuncionarios
