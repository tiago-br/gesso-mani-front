import React, { Component } from 'react'
import NavbarUser from '../../components/privado/NavbarUser'
import api from '../../utils/api.util'
import '../../components/privado/faturamento/style/FaturamentoPageStyle.css'

class FaturamentoPage extends Component {
    state={
        novaVendas:[],
        datas:"",
        test:[],
        todosOsAnos:[],
        currentYear:"2021",
        vendasFilterByYear:[]
    }
    componentDidMount= async () =>{
        const {data} = await api.getVendas()
        const vendas = [...data]
        const novaVendas = vendas.map(e=>{
            const dataSeparada = e.data.split("T")[0].split("-")
            const objectoDataSeparado ={
                ano: dataSeparada[0],
                mes: dataSeparada[1],
                dia: dataSeparada[2]
            }
            const objectData ={
                data:objectoDataSeparado,
                id:e._id,
                vendedor:e.vendedor,
                cliente:e.cliente,
                produtos: [...e.produtos],
                valor_total:e.valor_total
            }
            return objectData
        })
        const copyDateDasVendas = [...novaVendas]
        const vendasFilterByYear = copyDateDasVendas.filter(e=>e.data.ano==="2021")
        const todosOsAnos =[]
        copyDateDasVendas.forEach(e=>{
            if(!todosOsAnos.includes(e.data.ano)){
                todosOsAnos.push(e.data.ano)
            }
        })
        const sortTodosOsAnos = todosOsAnos.sort((a,b)=>a-b)
    
       
        this.setState({
            todasAsVendas:data,
            novaVendas:novaVendas,
            todosOsAnos:sortTodosOsAnos,
            vendasFilterByYear
        })
    }
    handleChooseYear = async(e) =>{
        const copyDateDasVendas = [...this.state.todasAsVendas]
        console.log(copyDateDasVendas)
        const vendasFilterByYear = copyDateDasVendas.filter(vendas=>vendas.data.ano===e.target.value)
        await this.setState({
            currentYear:e.target.value,
            vendasFilterByYear
        })
    }
    render()
        {
        console.log(this.state.vendasFilterByYear)
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
                    </form>
                </div>
                <div>
                    <div>
                        {}
                    </div>
                </div>

                
            </div>
        )
    }
}

export default FaturamentoPage
