import React, { Component } from 'react'
import api from '../../../utils/api.util'
import ListaProdutosVendasCard from './ListaProdutosVendasCard'
const imagemLixeira = "https://2.bp.blogspot.com/-DqfqcqsH47M/UMixbjsQlnI/AAAAAAAAI_U/IQkIeo-wOaU/s1600/Lixeira+-+Premium+Design+3D+(1).png"
class FatVENDAcard extends Component {
    state={
        deleteVenda:false,
        deletNumber:"",
        confirmDeletNumber:"",
        msgDeletError:"",
        produtos:[],
        openListProdutos:false,
        toggleButtonListProdutosMsg:"Ver mais",
        load:false,
        classNameForm:"container-form-vendas"
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
            deletNumber:randomNumber(),
            produtos:this.props.produtos,
            load:true
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
    deletVenda = async () =>{
        if(this.state.deletNumber !==this.state.confirmDeletNumber){
           this.setState({
            msgDeletError:"Número de confirmamento inválido"
           })
        }else{
            await this.props.deleteVenda(this.props.id,this.state.deletNumber,this.state.confirmDeletNumber)
        }
        setTimeout(()=>{this.setState({msgDeletError:""})}, 1500)
        
        
    }
    handleToggleListProdutos = async() =>{
        await this.setState({
            openListProdutos:!this.state.openListProdutos
        })
        if(this.state.toggleButtonListProdutosMsg==="Ver mais"){
            this.setState({
                toggleButtonListProdutosMsg:"Ver menos",
                classNameForm:"container-form-vendas-ver-mais"
            })
        }else{
            this.setState({
                toggleButtonListProdutosMsg:"Ver mais",
                classNameForm:"container-form-vendas"
            })
        }
    }
    render() {
        console.log(this.state.produtos)
        return (
            <div>
                {this.state.load?
                <form className={this.state.classNameForm}>
                    {this.state.deleteVenda?
                    <div>
                        <div>
                            <h3>Tem certeza que deseja deletar esta venda?</h3>
                            <h3>Para deletar, digite o número abaixo e depois clique em confirmar</h3>
                            <h3>{this.state.deletNumber}</h3>
                        </div>
                        <div>
                            <input type="text"  name="confirmDeletNumber" value={this.state.confirmDeletNumber} onChange={this.handleInputChange} placeholder="Digite aqui o número a cima para deletar"/>
                        </div>
                        <div>
                        <button type ="button" onClick={this.handleOpenDeletVenda}>Cancelar</button>
                        <button type ="button" onClick={this.deletVenda}>Confirmar</button>
                        </div>
                        <div>
                            {this.state.msgDeletError}
                        </div>
                    </div>
                    :
                    <>
                    <div className="form-vendas-dia-e-id">
                        <p>Data: {this.props.data.dia}/{this.props.data.mes}/{this.props.data.ano}</p>
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
                    <div>
                        <button type="button"onClick={this.handleToggleListProdutos}>{this.state.toggleButtonListProdutosMsg}</button>
                    </div>
                    <div>
                        {this.state.openListProdutos?
                        this.state.produtos.map((e)=>
                            <ListaProdutosVendasCard key={e.id} produtos={e}/>
                        )
                        :null}
                    </div>

                    </>
                    }
                </form>
                :
                <h1>{null}</h1>
                }
            </div>
        )
    }
}

export default FatVENDAcard
