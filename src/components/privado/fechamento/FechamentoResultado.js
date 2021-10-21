import React, { Component } from 'react'
import apiUtil from '../../../utils/api.util';
import FechamentoResultadoCard from './FechamentoResultadoCard';

export class FechamentoResultado extends Component {
    state={
        meses:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
        selectedYear:'',
        fechamentos:[],
        filterDataFechamentos:[],
        load:false,
        todosOsAnosUnicos:[],
        resultadoGeral:0,
        resultadoAnual:0
    }
    componentDidMount = async() =>{
        const dataAtual = new Date();
        const currentYear = `${dataAtual.getFullYear()}`
        
        await this.setState({
            selectedYear:currentYear
        })
        let currentMonth = `${dataAtual.getMonth()+1}`
        if(currentMonth.length < 2){
            currentMonth = `0${dataAtual.getMonth()}`
        }
        // const mesAnoAtual = `${currentYear}-${currentMonth}`
        
        const fechamentos = await apiUtil.getFechamento()
        const todosOsAnos = fechamentos.map(e=>{
          
            const splitData = e.data.split('T')
            const split2Data = splitData[0].split('-')
            return split2Data[0]
        })
        const anosUnicos = [...new Set(todosOsAnos)]
        const sortAnoUnicos = anosUnicos.map(e=>Number(e)).sort((a,b)=>a-b)
        await this.setState({
            todosOsAnosUnicos:sortAnoUnicos
        })
        const filterDataFechamentos = fechamentos.filter(fechamento=>fechamento.data.includes(currentYear))
        const resultadoAnual = filterDataFechamentos.reduce((acc,e)=>{
            return acc + e.resultado
        },0)
        const sortFilterDataFechamentos = filterDataFechamentos.sort((a,b)=>{
            // elemento a 
            const adataSplit = a.data.split('T')
            const adata2split = adataSplit[0].split('-')
            const anovaData = adata2split[0]+adata2split[1]
            const adataNumber = parseInt(anovaData)
            //elemento b
            const bdataSplit = b.data.split('T')
            const bdata2split = bdataSplit[0].split('-')
            const bnovaData = bdata2split[0]+bdata2split[1]
            const bdataNumber = parseInt(bnovaData)
            return adataNumber - bdataNumber
        })
        await this.setState({
            fechamentos,
            filterDataFechamentos:sortFilterDataFechamentos,
            resultadoAnual:resultadoAnual
        })

        const somaTotalFechamento = fechamentos.reduce((acc,e)=>{
            return acc + e.resultado
        },0)
        
        await this.setState({
            load:true,
            resultadoGeral:somaTotalFechamento
        })
    }
    handleChooseYear = async (e) =>{
        const {value} = e.target
        
        const filterDataFechamentos = this.state.fechamentos.filter(fechamento=>fechamento.data.includes(value))
        const sortFilterDataFechamentos = filterDataFechamentos.sort((a,b)=>{
            // elemento a 
            const adataSplit = a.data.split('T')
            const adata2split = adataSplit[0].split('-')
            const anovaData = adata2split[0]+adata2split[1]
            const adataNumber = parseInt(anovaData)
            //elemento b
            const bdataSplit = b.data.split('T')
            const bdata2split = bdataSplit[0].split('-')
            const bnovaData = bdata2split[0]+bdata2split[1]
            const bdataNumber = parseInt(bnovaData)
            return adataNumber - bdataNumber
        })
        const resultadoAnual = filterDataFechamentos.reduce((acc,e)=>{
            return acc + e.resultado
        },0)
        await this.setState({
            selectedYear:value,
            filterDataFechamentos:sortFilterDataFechamentos,
            resultadoAnual
        })
    }
    render() {
        console.log(this.state.todosOsAnosÚnicos)
        return (
            
            <div>
                {this.state.load?
                <div>
                <h2>Resultado</h2>
                <div>
                    
                    <form>
                            <div>
                                <h3>Selecione um ano:  </h3>
                           
                                <select name="year" value={this.state.selectedYear} onChange={this.handleChooseYear}>   
                                {
                                    this.state.todosOsAnosUnicos.map(ano=>
                                        <option key={ano} value={ano}>{`${ano}`}</option>
                                    
                                    )
                                }
                                </select>
                            </div>
                    </form>
                    <h3>Ano selecionado:{this.state.selectedYear}</h3>
                </div>
                <div>
                    <div>
                        {this.state.filterDataFechamentos.map(fechamento=>
                        <FechamentoResultadoCard {...fechamento} key={fechamento._id}/>)
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                        <h3>Resultado {this.state.selectedYear}: R${this.state.resultadoAnual.toLocaleString('pt-BR')}</h3>
                        <h3>Resultado total: R${this.state.resultadoGeral.toLocaleString('pt-BR')}</h3>
                        
                        </div>
                    </div>
                </div>
                </div>
            
                :
                <h1>Carregando...</h1>
                }
            </div>
        )
    }
}

export default FechamentoResultado
