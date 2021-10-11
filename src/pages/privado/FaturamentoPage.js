import React, { Component } from 'react'
import NavbarUser from '../../components/privado/NavbarUser'
import api from '../../utils/api.util'
import '../../components/privado/faturamento/style/FaturamentoPageStyle.css'
import FatMEScard from '../../components/privado/faturamento/FatMEScard'
import FatDIAcard from '../../components/privado/faturamento/FatDIAcard'
import FatVENDAcard from '../../components/privado/faturamento/FatVENDAcard'
import FatGraficos from '../../components/privado/faturamento/FatGraficos'


class FaturamentoPage extends Component {
    state={
        novaVendas:[],
        datas:"",
        test:[],
        todosOsAnos:[],
        currentYear:"2021",
        vendasFilterByYear:[],
        meses:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
        vendasMesesArr:[],
        fatTotal:"",
        load:false,
        vendasMesSelecionado:[],
        selectedMonth:"",
        todosOsDiasComVenda:[],
        listaDeDiasComVendas:[],
        selectedDay:"",
        vendasDia:[],
        msgErrorDelet:"",
        openGraficos:false,
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
        let copyVendasMesesArr = [...vendasMesesArr]
        const vendaTotalMeses = copyVendasMesesArr.flat().map(valorTotal=>valorTotal.valor_total).reduce((acc,valor)=>{
            return acc+valor
        },0)
        const totalFormatado = vendaTotalMeses.toLocaleString('pt-BR')

    
       
        this.setState({
            todasAsVendas:data,
            novaVendas:novaVendas,
            todosOsAnos:sortTodosOsAnos,
            vendasFilterByYear,
            vendasMesesArr,
            fatTotal:totalFormatado,
            load:true,
            
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
        const copyVendasMesesArr = [...vendasMesesArr]
        const vendaTotalMeses = copyVendasMesesArr.flat().map(valorTotal=>valorTotal.valor_total).reduce((acc,valor)=>{
            return acc+valor
        },0)
        const totalFormatado = vendaTotalMeses.toLocaleString('pt-BR')
        await this.setState({
            currentYear:e.target.value,
            vendasFilterByYear,
            vendasMesesArr:vendasMesesArr,
            fatTotal:totalFormatado
        })
    }
    clickMonth = async (vendasMesSelecionado,month) => {
        
       let todosOsDiasComVenda = []
       vendasMesSelecionado.forEach(e=>{
           if(!todosOsDiasComVenda.includes(e.data.dia)){
               todosOsDiasComVenda.push(e.data.dia)
           }
       })
       todosOsDiasComVenda.sort((a,b)=>parseInt(a) - parseInt(b)
       )
       const listaDeDiasComVendas = todosOsDiasComVenda.map(e=>vendasMesSelecionado.filter(a=>a.data.dia===e))
       await this.setState({
           todosOsDiasComVenda,
           listaDeDiasComVendas,
           selectedMonth:month,
           vendasMesSelecionado
       })
    }
    backPageYears = () =>{
        this.setState({
            selectedMonth:""
        })
    }
    backPageDays = () =>{
        this.setState({
            selectedDay:""
        })
    }
    clickDay = async (vendasDia, selectedDay) =>{
        await this.setState({
            selectedDay,
            vendasDia
        })
    }
    deleteVenda = async (id,numero,confirmNumero) =>{
        
        try {
            await api.deleteVenda(id)
            window.location.reload()
            alert(`Venda id: ${id} deletada com sucesso 
            a página será recarregada`)
        } catch (error) {
            alert("erro no servidor")
        }
    }
    handleToggleOpenGraficos = () =>{
        this.setState({
            openGraficos:!this.state.openGraficos
        })
    }
    render()
    {
        return (
            <div className="page-Faturamento">
                <NavbarUser/>
                <div>
                    {this.state.load?
                        !this.state.openGraficos?
                            this.state.selectedMonth?
                                this.state.selectedDay?
                                
                        <div>
                            <div className="fat-page-container-button-voltar-dia">
                                <div>
                                    <button onClick={this.backPageYears}>Voltar página inicial</button>
                                    <button onClick={this.backPageDays}>Voltar</button>
                                </div>
                            </div>
                            <h1>Vendas</h1>
                            <br/>
                            <h2>Vendas do dia {this.state.selectedDay} de {this.state.selectedMonth} de {this.state.currentYear}</h2>
                            <br/>
                            <div className="faturament-page-container-venda-card">
                                {this.state.vendasDia.map(e=>
                                    <FatVENDAcard key={e.id} {...e} deleteVenda={this.deleteVenda}/>
                                )}
                            </div>
                        </div>
                    :
                    //dia----------------------------
                    <div>
                        <div className="fat-page-container-button-voltar-dia">
                            <div>
                                <button onClick={this.backPageYears}>Voltar</button>
                            </div>
                        </div>
                    <h1>Faturamento</h1>
                    <br/>
                    <h2>{this.state.selectedMonth} de {this.state.currentYear}</h2>
                    <br/>
                    {this.state.listaDeDiasComVendas.map((e,i)=>
                        <FatDIAcard vendas={[...e]} dia={this.state.todosOsDiasComVenda[i]} key={i+this.state.selectedMonth} click={this.clickDay}/>
                    )}
                    </div>
                    //dia---------------------
                    :
                    <>
                    <h1>Faturamento</h1>
                    <h2>Selcione um ano</h2>
                    <div className="container-faturamento-form-escolher-ano">
                        
                        <form className="faturamento-form-escolher-ano">
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
                        <button onClick={this.handleToggleOpenGraficos}>Gráfico Faturamento</button>
                    
                    </div>
                    <p>Ano <b>{this.state.currentYear}</b> selecionado</p>
                    <div>
                        {this.state.vendasMesesArr.map((e,i)=>
                            <FatMEScard vendas={[...e]} mes={this.state.meses[i]} key={this.state.meses[i] + this.state.currentYear} click={this.clickMonth}/>
                        )}
                    </div>
                        <div className="container-fat-total-value">
                            <div className="fat-total-value">
                                <h3>Faturamento total de {this.state.currentYear}: R${`${this.state.fatTotal}`}</h3>
                            </div>
                        </div>
                    </div>
                    </>
                    :
                    <FatGraficos vendas={this.state.novaVendas} meses={this.state.meses} voltar={this.handleToggleOpenGraficos} anos={this.state.todosOsAnos}/>
                    :
                    <h2>Carregando ...</h2>
                    
                    }
                </div>   
            </div>
        )
    }
}

export default FaturamentoPage
