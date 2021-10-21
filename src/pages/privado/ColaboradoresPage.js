import React, { Component } from 'react'
import NovoColaborador from '../../components/privado/colaboradores/NovoColaborador'
import TodosColaboradores from '../../components/privado/colaboradores/TodosColaboradores'
import NavbarUser from '../../components/privado/navbar/Navbar'
import '../../components/privado/colaboradores/stylecolaboradores/style.colaboradores.css'



class ColaboradoresPage extends Component {
    state={
        load:false,
        novoColaborador:false,
        disableButton:true
    }
    componentDidMount = () =>{
        this.setState({
            load:true
        })
    }
    handleToggleChangePage = () =>{
        this.setState({
            novoColaborador:!this.state.novoColaborador,
            disableButton:!this.state.disableButton
        })
    }
    render() {
        return (
            <div>
                {this.state.load?
                <>
                <NavbarUser/>
                    <div className="container-colaboradores-page">
                        <div>
                            <h1>Colaboradores</h1>
                        </div>
                        <div className="colaboradores-page-container-buttons">
                            <div><button onClick={this.handleToggleChangePage} disabled={this.state.disableButton}>Colaboradores</button></div>
                            <div><button onClick={this.handleToggleChangePage} disabled={!this.state.disableButton}>Novo colaborador</button></div>
                        </div>
                        <div>
                            {this.state.novoColaborador?<NovoColaborador/>:<TodosColaboradores/>}
                        </div>
                    </div>
                </>
                :
                <h1>Carregando</h1>
                }
            </div>
               
            
        )
    }
}

export default ColaboradoresPage
