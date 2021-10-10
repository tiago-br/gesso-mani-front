import React, { Component } from 'react'
import api from '../../../utils/api.util'
const imagemLixeira = "https://2.bp.blogspot.com/-DqfqcqsH47M/UMixbjsQlnI/AAAAAAAAI_U/IQkIeo-wOaU/s1600/Lixeira+-+Premium+Design+3D+(1).png"
class FatVENDAcard extends Component {
    state={
        deleteVenda:false,
        deletNumber:"",
        confirmDeletNumber:""
    }

    componentDidMount = () =>{
            const randomNumber = () => {
                const numero = []
            for(let i=0; i<6; i++){
                let rnd = Math.floor(Math.random()*10)
                numero.push(`${rnd}`)
            }
            return numero.join('')
        }
    
        this.setState({
            deletNumber:randomNumber()
        })
    }
    handleOpenDeletVenda = () =>{
        this.setState({
            deleteVenda:!this.state.deleteVenda
        })
    }
    handleInputChange = (e) =>{
        const {name,value} = e.target

        this.setState({
            [name]:value
        })
    }
    render() {
        console.log(this.state.confirmDeletNumber)
        return (
            <div>
                <form className="container-form-vendas">
                    {this.state.deleteVenda?
                    <div>
                        <div>
                            <h3>Tem certeza que deseja deletar esta venda?</h3>
                            <h3>Para deletar digite o numero abaixo e depois clique em confirmar</h3>
                            <h3>{this.state.deletNumber}</h3>
                        </div>
                        <div>
                            <input type="text"  name="confirmDeletNumber" value={this.state.confirmDeletNumber} onChange={this.handleInputChange} placeholder="Digite o código a cima para deletar"/>
                        </div>
                        <div>
                        <button type ="button" onClick={this.handleOpenDeletVenda}>Cancelar</button>
                        <button type ="button" onClick={()=>this.props.deleteVenda(this.props.id)}>Confirmar</button>
                        </div>
                    </div>
                    :
                    <>
                    <div className="form-vendas-dia-e-id">
                        <p>{this.props.data.dia}/{this.props.data.mes}/{this.props.data.ano}</p>
                        <p>ID: {this.props.id}</p>
                    </div>
                    <section>
                        <div>
                            <ul>
                                <li>Cliente: <span>{this.props.cliente}</span></li>
                                <li>Vendedor: <span>{this.props.vendedor}</span></li>
                                <li>Valor total: <span>R${this.props.valor_total.toLocaleString('pt-BR')}</span></li>
                            </ul>              
                        </div>
                        <div>
                            <button type="button" onClick={this.handleOpenDeletVenda}><img src={imagemLixeira} alt="botao-excluir"/></button>
                        </div>
                    </section>
                    </>
                    }
                </form>
            </div>
        )
    }
}

export default FatVENDAcard
