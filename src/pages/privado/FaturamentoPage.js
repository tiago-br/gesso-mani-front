import React, { Component } from 'react'
import NavbarUser from '../../components/privado/NavbarUser'
import api from '../../utils/api.util'
import '../../components/privado/faturamento/style/FaturamentoPageStyle.css'
import FatMEScard from '../../components/privado/faturamento/FatMEScard'

class FaturamentoPage extends Component {
    state={
        novaVendas:[],
        datas:"",
        test:[],
        todosOsAnos:[],
        currentYear:"2021",
        vendasFilterByYear:[],
        meses:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
        vendasMesesArr:[]
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
        const vendasMesesArr=[]
        for(let i=0; i<=11; i++){
            let valorMes = i
            if(valorMes+1 < 10){
                valorMes = `0${i+1}`
            }else{
                valorMes = `${i+1}`
            }
            const vendasMes = vendasFilterByYear.filter(mes=>mes.data.mes===valorMes)
            vendasMesesArr.push(vendasMes)
        }

    
       
        this.setState({
            todasAsVendas:data,
            novaVendas:novaVendas,
            todosOsAnos:sortTodosOsAnos,
            vendasFilterByYear,
            vendasMesesArr
        })
    }
    handleChooseYear = async(e) =>{
        const copyDateDasVendas = [...this.state.novaVendas]
        const vendasFilterByYear = copyDateDasVendas.filter(vendas=>vendas.data.ano===e.target.value)
        const vendasMesesArr =[]
        for(let i=0; i<=11; i++){
            let valorMes = i
            if(valorMes+1 < 10){
                valorMes = `0${i+1}`
            }else{
                valorMes = `${i+1}`
            }
            const vendasMes = vendasFilterByYear.filter(mes=>mes.data.mes===valorMes)
            vendasMesesArr.push(vendasMes)
        }
        await this.setState({
            currentYear:e.target.value,
            vendasFilterByYear,
            vendasMesesArr
        })
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
                    </form>
                </div>
                <div>
                        <h3>Ano <b>{this.state.currentYear}</b> selecionado</h3>
                    <div>
                        {this.state.vendasMesesArr.map((e,i)=>
                            <FatMEScard vendas={[...e]} mes={this.state.meses[i]}/>
                        )}
                    </div>
                </div>

                
            </div>
        )
    }
}

export default FaturamentoPage
