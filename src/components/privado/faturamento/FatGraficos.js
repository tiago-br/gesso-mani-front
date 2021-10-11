import React, { Component } from 'react'
import {Line,Bar} from 'react-chartjs-2';


const separarVendasPorMes = (ano,vendas) =>{
    const listaDoFatDosMeses = [];

    const vendasFilterByYear = vendas.filter(e=>e.data.ano===ano);

    for(let i=0 ; i<=11 ; i++){
        let mes = `${i+1}`
        if(i<9){
            mes = `0${i+1}`
        }
        const vendasMes = vendasFilterByYear.filter(vendas=>vendas.data.mes===mes).reduce((acc,e)=>{

            return acc+Math.floor(e.valor_total)
        },0)
        listaDoFatDosMeses.push(vendasMes)
    }
    return listaDoFatDosMeses
}
    

export class FatGraficos extends Component {
    state={
        load:false,
        graficoAnoOn:false,
        msgFat:"Faturamento dos últimos 5 anos",
        graficosMeses:{
            labels: this.props.meses,
            datasets:[]
        },
        graficosAnos:{
            labels: ['January', 'February', 'March',
            'April', 'May',"fev","marco","asas","lll","kkk"],
            datasets: [
                {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56]
                }
            ]
        }
    }
    componentDidMount = () =>{
        const {anos, vendas} = this.props
        let copyAnos = [...anos]
        let copy2Anos = [...anos]
        if(copyAnos.length > 5){
            copyAnos = copyAnos.slice(-5)
        }
        if(copy2Anos.length >10){
            copy2Anos = copy2Anos.slice(-10)
        }
        const listaColors = ["#000000","#FF0000","#D2691E","#0000CD","#008000"]
        console.log(copyAnos)
        const graficos = copyAnos.map((ano,index)=>{
                const grafico = {
                    label:`${ano}`,
                    fill:false,
                    lineTension: 0.1,
                    backgroundColor: listaColors[index],
                    borderColor: listaColors[index],
                    borderWidth: 2,
                    data: separarVendasPorMes(ano,vendas)
                }
                return grafico
        })

        const grafico2 = {
            labels:[...copy2Anos],
            datasets:[
                {
                label: 'Faturamento Ano',
                backgroundColor: '#008000',
                borderColor: 'black',
                borderWidth: 1,
                data: copy2Anos.map(ano => separarVendasPorMes(ano,vendas).reduce((acc,e)=>{
                    return acc + Math.floor(e)
                },0))
                }
            ]
        }
        console.log(grafico2)

        this.setState({
            load:true,
            graficoAnoOn:false,
            graficosMeses:{
                labels:this.props.meses,
                datasets:graficos
            },
            graficosAnos:grafico2
        })
    }
    graficoAnoTurnOn =() =>{
        this.setState({
            graficoAnoOn:true,
            msgFat:"Faturamento dos últimos 10 anos"
        })
    }
    graficoAnoTurnOff =() =>{
        this.setState({
            graficoAnoOn:false,
            msgFat:"Faturamento dos últimos 5 anos"
        })
    }
    render() {
        return (
            <div className="container-grafico-fat">
                <h1>Faturamento gráfico</h1>
                <h3>{this.state.msgFat}</h3>
                {this.state.load?
                <>
                <div>
                    <button onClick={this.props.voltar}>Voltar</button>
                    <button onClick={this.graficoAnoTurnOff}>Gráfico mês</button>
                    <button onClick={this.graficoAnoTurnOn}>Gráfico ano</button>
                </div>
                {this.state.graficoAnoOn?
                
                <section>
                <Bar
                data={this.state.graficosAnos}
                options={{
                title:{
                    display:true,
                    text:'Average Rainfall per month',
                    fontSize:20
                },
                legend:{
                    display:true,
                    position:'right'
                }
          }}
        />
                </section>
                
                :
                
                
                
                
                <section>
                   <Line
                data={this.state.graficosMeses}
                options={{
                title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:10
                },
                legend:{
                display:true,
                position:'right'
                }
                }}/>
                </section>
                }
            </>
            :
            <h2>Carregando...</h2>
            }
        </div>
        )
    }
}

export default FatGraficos
