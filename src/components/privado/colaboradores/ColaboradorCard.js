import React, { Component } from 'react'
import apiUtil from '../../../utils/api.util'

export class ColaboradorCard extends Component {
    state={
        nome:'',
        cargo:'',
        data_de_entrada:'',
        data_de_saida:'',
        img:'',
        ativo:false,
        salario:'',
        id:'',
        msgAtivo:'',
        msgAtualizar:'',
        msgColorAtualizar:'',
        editOn:true,
        openExcluir:false
    }
    componentDidMount = () =>{
        const {nome,cargo,data_de_saida,data_de_entrada,img,ativo,salario,_id} =this.props
        const splitData = data_de_entrada.split('T')[0].split('-')

        const dataFormatada = `${splitData[2]}/${splitData[1]}/${splitData[0]}`
        let msgAtivo;
        if(ativo===true){
            msgAtivo = 'Sim'
        }else{
            msgAtivo = 'Não'
        }

        this.setState({
            nome,
            cargo,
            data_de_saida,
            data_de_entrada:dataFormatada,
            img,
            ativo,
            salario,
            id:_id,
            load:true,
            msgAtivo
        })
    }
    onChange = async(e)=>{
        e.preventDefault()

        const {name,value} = e.target
        await this.setState({
            [name] : value
        })
    }
    handleCheckBox = async () =>{
        let msgAtivo;
        await this.setState({
            ativo:!this.state.ativo
        })
        if(this.state.ativo){
            msgAtivo='Sim'
        }else{
            msgAtivo='Não'
        }
        await this.setState({
            msgAtivo
        })
        
    }
    handleAtualizarForm = async () =>{

        const payload = {
            nome : this.state.nome,
            cargo : this.state.cargo,
            data_de_saida: this.state.data_de_saida,
            data_de_entrada:this.props.data_de_entrada,
            img:this.props.img,
            ativo:this.state.ativo,
            salario:this.state.salario    
        }
        try {
            await apiUtil.putColaborador(this.state.id,payload)
            this.setState({
                msgAtualizar:'Colaborador atualizado com sucesso',
                msgColorAtualizar:'green',
                editOn:true
            })
        } catch (error) {
            await this.setState({
                msgAtualizar:'Erro ao atualizar colaborador',
                msgColorAtualizar:'red',
                editOn:true
            })
        }
        
    }
    handleEditar = async () =>{
        this.setState({
            editOn:!this.state.editOn,
            msgAtualizar:''
        })
    }
    handleOpenExcluir =  () =>{
        this.setState({
            openExcluir:!this.state.openExcluir
        })
    }
    confirmDelete = async () =>{
        try {
            await apiUtil.deleteColaborador(this.state.id)
        } catch (error) {
            alert('erro ao excluir')
        }
    }
    render() {
        console.log(this.state.openExcluir)
        return (
            <div>
                {this.state.load?
                <div className="container-form-edit-card-colaborador">
                    <form className="form-edit-card-colaborador">
                    {this.state.openExcluir?
                    <div className="container-form-confirm-delete-colaborador">
                        <div>
                            <h3>Tem certeza que deseja deletar o colaborador {this.state.nome}</h3>
                            <div>
                                <div>
                                <button onClick={this.handleOpenExcluir}>Cancelar</button>
                                </div>
                                <div>
                                <button onClick={this.confirmDelete}>Confirmar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <fieldset disabled={this.state.editOn}>
                        <div>
                            <div>
                                <label>Nome:</label>
                                <input type="text" name='nome' value={this.state.nome} onChange={this.onChange}/>
                            </div>
                            
                        </div>

                        <div>
                        <label>Cargo:</label>
                        <input type="text" name='cargo' value={this.state.cargo} onChange={this.onChange}/>
                        </div>

                        <div>
                        <label>Data de entrada:</label>
                        <input type="text" value={this.state.data_de_entrada} readOnly disabled={true}/>
                        </div>

                        <div>
                        <label>salario:</label>
                        <input type="number" name="salario" value={this.state.salario} onChange={this.onChange}/>
                        </div>

                        <div>
                        <label>Ativo:</label>
                        <input className="card-colaborador-checkbox"type="checkbox" onChange={this.handleCheckBox} defaultChecked={this.state.ativo}/>
                        <span>{this.state.msgAtivo}</span>
                        </div>
                        <div className="container-card-buttons-excluir-att">
                            <div>
                                <button type="button" onClick={this.handleAtualizarForm}>Atualizar</button>
                                <span style={{color:this.state.msgColorAtualizar}}>{this.state.msgAtualizar}</span>
                            </div>
                            <div>
                                <button type="button" onClick={this.handleOpenExcluir}>Excluir</button>
                            </div>
                        </div>
                        </fieldset>
                        
                        
                        <button type="button" className='button-edit-card-colaborador'onClick={this.handleEditar}>Editar</button>
                        <div className="card-colaborador-img">
                            <div><img src={this.state.img} alt={this.state.nome}/></div>
                        </div>
                        </>
                    }
                    </form>
                </div>
                :
                null
                }
            </div>
        )
    }
}

export default ColaboradorCard
