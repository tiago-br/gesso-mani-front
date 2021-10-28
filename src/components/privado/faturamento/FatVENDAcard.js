import React, { Component } from 'react'
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
        classNameForm:"container-form-vendas",
        statusVenda:"",
        statusVendaClassName:"",
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
        const checkStatusVenda = this.props.produtos.every(e=>e.quantidade>=0)
        const checkStatusEstorno = this.props.produtos.every(e=>e.quantidade<0)
        if(checkStatusVenda){
            this.setState({
                statusVenda:"venda",
                statusVendaClassName:"status-venda"
            })
        }else if(checkStatusEstorno){
            this.setState({
                statusVenda:"estorno",
                statusVendaClassName:"status-estorno"
            })
        }else{
            this.setState({
                statusVenda:"troca",
                statusVendaClassName:"status-troca"
            })
        }
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
        return (
            <div>
                {this.state.load?
                <form className={this.state.classNameForm}>
                    {this.state.deleteVenda?
                    <div className="delet-venda-fat-card-venda">
                        
                            <h3>Tem certeza que deseja deletar esta venda?</h3>
                            <h3>Para deletar, digite, ou copie e cole, o número abaixo e depois clique em confirmar</h3>
                            <p onselectstart="return false">{this.state.deletNumber}</p>
                        
                        <div>
                            <input type="text"  name="confirmDeletNumber" value={this.state.confirmDeletNumber} onChange={this.handleInputChange} placeholder="Digite aqui"/>
                        </div>
                        <div className="bts-delet-venda-fat-card-venda">
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
                        <p><b>status</b>: <span className={this.state.statusVendaClassName}>{this.state.statusVenda}</span></p>
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
                            <button className='bt-lixeira' type="button" onClick={this.handleOpenDeletVenda}><img src={imagemLixeira} alt="botao-excluir"/></button>
                        </div>
                    </section>
                    <div className='toogle-container-button'>
                        <button className="toggle-button-ver-mais-ver-menos"type="button"onClick={this.handleToggleListProdutos}>{this.state.toggleButtonListProdutosMsg}</button>
                    </div>
                    <div className='container-lista-vendas'>
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
