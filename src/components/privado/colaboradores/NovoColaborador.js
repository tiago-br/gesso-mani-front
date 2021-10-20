import React, { Component } from 'react'
import apiUtil from '../../../utils/api.util'

export class NovoColaborador extends Component {
    state={
        nome:'',
        cargo:'',
        ativo:true,
        data_de_entrada:'',
        salario:0,
        img:'',
        file:''
    }
    componentDidMount= ()=>{
        const date= new Date()
        let dia = date.getDate()
        if(`${dia}`.length<2){
            dia = `0${dia}`
        }
 
        let mes = date.getMonth() + 1
        if(`${mes}`.length<2){
            mes = `0${mes}`
        }
        const ano = date.getFullYear()
 
        this.setState({
            data_de_entrada:`${ano}-${mes}-${dia}`
        })
    }
    onChange = (e) =>{
        e.preventDefault()
        const {name,value} = e.target
        this.setState({
            [name] : value
        })
    }
    onChangeFoto = (e) =>{
        e.preventDefault()
        const file = e.target.files[0]
        const imgUrl = URL.createObjectURL(file);
        this.setState({
            img:imgUrl,
            file

        })
    }
    onClickSubmit = async() =>{
        const payload ={
            nome:this.state.nome,
            cargo:this.state.cargo,
            ativo:true,
            data_de_entrada:this.state.data_de_entrada,
            salario:this.state.salario,
            img:'',
        }
        try {
            await apiUtil.postColaborador(payload)
        } catch (error) {
            alert('erro ao criar novo colaborador')
        }
    }

    
    render() {
        return (
            <div>
                <div>
                    <h2>Novo colaborador</h2>
                    <form>
                        <div>
                        <label>Nome:</label>
                        <input type="text" name="nome" value={this.state.nome} onChange={this.onChange}/>
                        </div>
                        <div>
                        <label>Data de entrada:</label>
                        <input type="date" name="data_de_entrada" value={this.state.data_de_entrada} onChange={this.onChange}/>
                        </div>
                        <div>
                        <label>Cargo:</label>
                        <input type="text" name="cargo" value={this.state.cargo} onChange={this.onChange}/>
                        </div>
                        <div>
                        <label>Salário:</label>
                        <input type="number" name="salario" value={this.state.salario} onChange={this.onChange}/>
                        </div>
                        <div>
                            <div>
                                <button type="button"onClick={this.onClickSubmit}>Criar novo colaborador</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default NovoColaborador
