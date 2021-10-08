import React, { Component } from 'react'
import NavbarUser from '../../components/privado/NavbarUser'
import api from '../../utils/api.util'
import '../../components/privado/faturamento/style/FaturamentoPageStyle.css'

class FaturamentoPage extends Component {
    state={
        todasAsVendas:[],
        datas:"",
        test:[],
        todosOsAnos:[],
        currentYear:2021
    }
    componentDidMount= async () =>{
        const {data} = await api.getVendas()
        const vendas = [...data]
        const dateDasVendas = vendas.map(e=>{
            const dataSeparada = e.data.split("T")[0].split("-")
            const objectoDataSeparado ={
                ano: dataSeparada[0],
                mes: dataSeparada[1],
                dia: dataSeparada[2]
            }
            const objectData ={
                data:objectoDataSeparado,
                id:e._id
            }
            return objectData
        })
        const copyDateDasVendas = [...dateDasVendas]
        const todosOsAnos =[]
        copyDateDasVendas.forEach(e=>{
            if(!todosOsAnos.includes(e.data.ano)){
                todosOsAnos.push(e.data.ano)
            }
        })
        const sortTodosOsAnos = todosOsAnos.sort((a,b)=>a-b)
    
       
        this.setState({
            todasAsVendas:data,
            datas:dateDasVendas,
            todosOsAnos:sortTodosOsAnos
        })
    }
    handleChooseYear = async(e) =>{
        await this.setState({
            currentYear:e.target.value,
        })
        console.log(this.state.currentYear)
    }
    render()
        {
        return (
            <div>
                <NavbarUser/>
                <h1>Faturamento</h1>
                <h2>Selcione um ano</h2>
                <div>
                    <form class="faturamento-form-escolher-ano">
                        {
                            this.state.todosOsAnos.map(ano=>
                            <div key={ano}>
                            <input type="radio" value={ano} checked={`${this.state.currentYear}`===`${ano}`} onChange={this.handleChooseYear}/>
                            <label>{`${ano}`}</label>
                            </div>
                            )
                        }
                        <button>Pesquisar Ano</button>
                    </form>
                </div>

                
            </div>
        )
    }
}

export default FaturamentoPage
