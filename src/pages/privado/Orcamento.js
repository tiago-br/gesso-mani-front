import React, { Component } from 'react'
import NavbarUser from '../../components/privado/NavbarUser'
import CardOrçamento from '../../components/privado/orçamento/CardOrçamento'
import api from '../../utils/api.util'
import styled from 'styled-components'
import NavBarColaborador from '../../components/privado/NavBarColaborador'


const Bt = styled.button`

width: 15rem;
height: 3rem;
background-color: grey;
cursor: pointer;

`
const ContainerBt = styled.div`
width: 100vw;
display: flex;
justify-content: space-around;
margin-top: 2rem;
margin-bottom: 5rem;

`
const ContainerH1 = styled.div`

width: 100vw;
justify-content: center;
margin-top: 2rem;
align-items: center;
text-align: center;

`

class Orcamento extends Component {

    state = {
        orçamentos: [],
        pendentes: [],
        boolean: true,
        admin:false,
        load:false
    }

    componentDidMount = async () => {
        
        let { data } = await api.getOrcamento()
        let orçamento =  data.filter(e => e.status === "Orçamento")
        let Pendente = data.filter(e => e.status === "Pendente")
        let checkAdmin = localStorage.getItem('admin')
        if(checkAdmin !== "ebq$lS6h$@IqGbzM7jNFFZCe70gg&t*5F&9pnNRxTgPVak7Q*%"){
            checkAdmin = false
        }else{
            checkAdmin = true
        }
        this.setState({
            orçamentos: orçamento.reverse(),
            pendentes: Pendente.reverse(),
            admin:checkAdmin,
            load:true
        })
    }

    handleOrçamento = () => {

        this.setState({
            boolean: true
        })
    }

    handlePendente = () => {

        this.setState({
            boolean: false
        })
    }

    handleActiveButton = () => {

        if(this.state.boolean){
            return {boxShadow : "5px 5px 5px black" }      
        } 
        
       return {color: "black" }
    }
    handleActiveButtonPendente = () => {

        if(!this.state.boolean){
            return {boxShadow : "5px 5px 5px black" }      
        } 
        
       return {color: "black" }
    }


    render() {
        return (
            <div>
            {this.state.load?
            <>
                {this.state.admin?<NavbarUser />:<NavBarColaborador/>}
                <ContainerH1>
                        {this.state.boolean ? <h1>Orçamentos</h1> : <h1>Pendentes</h1>} 
                </ContainerH1>
                <ContainerBt>

                    <Bt style={this.handleActiveButton()} onClick={this.handleOrçamento}>Orçamentos</Bt>
                    <Bt style={this.handleActiveButtonPendente()} onClick={this.handlePendente}>Pendentes</Bt>
                </ContainerBt>
                {this.state.boolean ? this.state.orçamentos.map(orçamento => <CardOrçamento key={orçamento._id} {...orçamento} />)
                    :
                    this.state.pendentes.map(orçamento => <CardOrçamento key={orçamento._id} {...orçamento} />)}
            </>
            :
            <h2>Carregando...</h2>
            }
            </div>
            
        )
    }
}

export default Orcamento
