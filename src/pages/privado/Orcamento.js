import React, { Component } from 'react'
import NavbarUser from '../../components/privado/navbar/Navbar'
import CardOrçamento from '../../components/privado/orçamento/CardOrçamento'
import api from '../../utils/api.util'
import styled from 'styled-components'
import NavBarColaborador from '../../components/privado/NavBarColaborador'


const Bt = styled.button`

width: 15rem;
height: 3rem;
color: white;
background-color: #1d1d1c;
cursor: pointer;
border: 3px solid black;


@media (max-width: 960px) {  
    width: 10rem;
    }

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
const ContainerGeral = styled.div`

 background-color: #B8B4B1;
 
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
            return {backgroundColor: '#727165',color: 'black' }     
        } 
        
       return {color: "white" }
    }
    handleActiveButtonPendente = () => {

        if(!this.state.boolean){
            return {backgroundColor: '#727165',color: 'black' }      
        } 
        
       return {color: "white" }
    }


    render() {
        return (
            <ContainerGeral>
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
            </ContainerGeral>
            
        )
    }
}

export default Orcamento
