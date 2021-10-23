import React, { Component } from 'react'
import { FaSkullCrossbones } from 'react-icons/fa'
const imgLixeira = 'https://2.bp.blogspot.com/-DqfqcqsH47M/UMixbjsQlnI/AAAAAAAAI_U/IQkIeo-wOaU/s1600/Lixeira+-+Premium+Design+3D+(1).png'

export class TodasAsDespesasCard extends Component {
    state={
        dataFormatada:0,
        classNameDespesaProduto:'',
        deleteOn:true,
        hardDeletOn:false
    }
    componentDidMount = async() =>{
        const data = this.props.data.split('T')[0].split('-')
        const dataFormatada = `${data[2]}/${data[1]}/${data[0]}`
        if(this.props.name==="Despesa Produtos"){
            await this.setState({
                classNameDespesaProduto:'red-despesa-produto'
            })
        }
        await this.setState({
            dataFormatada
        })
    }
    onToggleDelete = () =>{
        this.setState({
            deleteOn:!this.state.deleteOn
        })
    }
    onToggleDeleteHardDelet=()=>{
        this.setState({
            hardDeletOn:!this.state.hardDeletOn
        })
    }
    render() {
        return (
            <div className='card-todas-as-compras-main'>
            {this.state.deleteOn?
            <>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <p className={this.state.classNameDespesaProduto}>{this.props.name}</p>
                    <p>Data: {this.state.dataFormatada} </p>
                    <p>Feito por: {this.props.user}</p>
                    <p>Valor: R${this.props.gasto_total.toLocaleString('pt-BR')}</p>
                </div>
                <section className="descricao-despesa-todas-as-despesas">
                    <h4>Descrição</h4>
                    <p>{this.props.descricao}</p>
                </section>
                {this.props.name==="Despesa Produtos"?
                null
                :
                <div className='card-todas-as-compras-btn-delete'>
                    <button onClick={()=>{this.onToggleDelete()}}><img src={imgLixeira} alt="excluir"/></button>
                </div>}
                </>
                :
                <>
                {this.state.hardDeletOn?
                <div className="container-btn-todas-as-despesas-card-delet">
                    <h3>Ao confirmar, todas as despesas com nome "{this.props.name}" serão excluídas! </h3>
                    <h3>Antes de confirmar, cheque se não existe nenhuma despesa que não queira deletar com o mesmo nome.</h3>
                    <div>
                        <div>
                            <button className="btn-todas-as-despesas-card-delet"onClick={this.onToggleDeleteHardDelet}>Cancelar</button>
                        </div>
                        <div>
                            <button className="btn-todas-as-despesas-card-delet" onClick={()=>{this.props.delete(this.props.name)}}>Confirmar <FaSkullCrossbones/></button>
                        </div>
                    </div>
                </div>
                :
                
                <div className="container-btn-todas-as-despesas-card-delet">
                    <h3>Tem certeza que deseja deletar a despesa {this.props.name}?</h3>
                    <div>
                        <div>
                            <button className="btn-todas-as-despesas-card-delet" onClick={()=>{this.props.deleteUma(this.props.name)}}>Deletar</button>
                        </div>
                        <div>
                            <button  className="btn-todas-as-despesas-card-delet" onClick={this.onToggleDeleteHardDelet}>Deletar todas as despesas com esse nome <FaSkullCrossbones/></button>
                        </div>
                        <div>
                            <button className="btn-todas-as-despesas-card-delet" onClick={this.onToggleDelete}>Cancelar</button>
                        </div>
                    </div>
                </div>
                }
                </>
            }
            </div>
        )
    }
}

export default TodasAsDespesasCard
