import React, { Component } from 'react'
import FechamentoForm from '../../components/privado/fechamento/FechamentoForm'
import FechamentoResultado from '../../components/privado/fechamento/FechamentoResultado'
import NavbarUser from '../../components/privado/navbar/Navbar'


class FechamentoPage extends Component {
    state={
        fechamentoOn:true,
        load:false
    }
    componentDidMount = async () =>{

        this.setState({
            load:true
        })
    }
    handleFechamentoOn = (msg) =>{
        if(msg==="sim"){
        this.setState({
            fechamentoOn:true
        })
        }
        if(msg==="nao"){
            this.setState({
                fechamentoOn:false
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.load?
                <>
                <NavbarUser/>
                <div>
                    <div>
                        <button onClick={()=>{this.handleFechamentoOn("sim")}}>Fechamento</button>
                    </div>
                    <div>
                        <button onClick={()=>{this.handleFechamentoOn("nao")}}>Resultado</button>
                    </div>
                </div>
               
                <div>
                {this.state.fechamentoOn?
                    <FechamentoForm/>
                    :
                    <FechamentoResultado/>
                }
                </div>
                </>
               
                :
                <h1>Carregando...</h1>
                }
            </div>
        )
    }
}

export default FechamentoPage
