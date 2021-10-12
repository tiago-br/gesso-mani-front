import React, { Component } from 'react'
import NavbarUser from '../../components/privado/NavbarUser'
import CardOrçamento from '../../components/privado/orçamento/CardOrçamento'
import api from '../../utils/api.util'

class Orcamento extends Component {

    state = {
        orçamentos : []
    }

    componentDidMount = async () => {

        let { data } = await api.getOrcamento()
        this.setState({
            orçamentos : data
        })
    }

    render() {
        return (
            <div>
                <NavbarUser/>
                {this.state.orçamentos.map(orçamento => <CardOrçamento key = {orçamento._id} {...orçamento}  />)}
         
            </div>
        )
    }
}

export default Orcamento
