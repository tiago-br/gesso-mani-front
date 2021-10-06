import React, { Component } from 'react'
import EstoqueNovoProduto from '../../components/privado/EstoqueNovoProduto'
import NavbarUser from '../../components/privado/NavbarUser'




class EstoquePage extends Component {
    state={
        user:"",
        novoProduto:false,
        load:false
    }

    componentDidMount(){
        const user = localStorage.getItem('user')

        this.setState({
            user,
            load:true
        })
    }
    render() {
        
        return (
            <>  
                <NavbarUser/>
                {this.state.load ?
                <div>
                    <EstoqueNovoProduto user={this.state.user}/>
                </div>
                :
                <h1>Carregando ...</h1>
                }
            </>
        )
    }
}

export default EstoquePage
