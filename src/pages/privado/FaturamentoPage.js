import React, { Component } from 'react'
import NavbarUser from '../../components/privado/NavbarUser'
import api from '../../utils/api.util'


class FaturamentoPage extends Component {
    state={
        todasAsVendas:[],
        datas:"",
        test:[],
        todosOsAnos:[]
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
                todosOsAnos.push(parseInt(e.data.ano))
            }
        })
        const sortTodosOsAnos = todosOsAnos.sort((a,b)=>a-b)
    
       
        await this.setState({
            todasAsVendas:data,
            datas:dateDasVendas,
            todosOsAnos:sortTodosOsAnos
        })
    }
    render()
         {
        console.log(this.state.todosOsAnos)
        return (
            <div>
                <NavbarUser/>
                <h1>Faturamento</h1>
                <h2>Selcione um ano</h2>
                <div>
                    <form>
                        {
                            this.state.todosOsAnos.map(e=>
                            <input type="radio" value={e} name="ano"  key={e}/>
                            )
                        }
                    </form>
                </div>

                
            </div>
        )
    }
}

export default FaturamentoPage
