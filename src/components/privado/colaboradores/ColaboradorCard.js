import React, { Component } from 'react'

export class ColaboradorCard extends Component {
    state={
        nome:'',
        cargo:'',
        data_de_entrada:'',
        data_de_saida:'',
        img:'',
        ativo:false,
        salario:'',
        id:''
    }
    componentDidMount = () =>{
        const {nome,cargo,data_de_saida,data_de_entrada,img,ativo,salario,id} =this.props
        this.setState({
            nome,
            cargo,
            data_de_saida,
            data_de_entrada,
            img,
            ativo,
            salario,
            id,
            load:true
        })
    }
    onChange = async(e)=>{
        e.preventDefault()

        const {name,value} = e.target
        await this.setState({
            [name] : value
        })
    }
    handleCheckBox = async (e) =>{
        // e.preventDefault()
        
        await this.setState({
            ativo:!this.state.ativo
        })
    }
    render() {
        console.log(this.state.ativo)
        return (
            <div>
                {this.state.load?
                <div>
                    <form>
                        <fieldset>

                        <div>
                        <label>Nome:</label>
                        <input type="text" name='nome' value={this.state.nome} onChange={this.onChange}/>
                        </div>

                        <div>
                        <label>Cargo:</label>
                        <input type="text" name='cargo' value={this.state.cargo} onChange={this.onChange}/>
                        </div>

                        <div>
                        <label>Ativo:</label>
                        <input type="checkbox" onChange={this.handleCheckBox} defaultChecked={this.state.ativo}/>
                        </div>

                        </fieldset>
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
