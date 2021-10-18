import React, { Component } from 'react'

export class NovoColaborador extends Component {
    state={
        nome:'',
        cargo:'',
        ativo:true,
        data_de_entrada:'',
        salario:0,
        img:''
    }
    onChange = (e) =>{
        e.preventDefault()
        const {name,value} = e.target
        this.setState({
            [name] : value
        })
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
                        <label>Salario:</label>
                        <input type="number" name="salario" value={this.state.salario} onChange={this.onChange}/>
                        </div>
                        <div>
                        <label>Salario:</label>
                        <input type="number" name="salario" value={this.state.salario} onChange={this.onChange}/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default NovoColaborador
