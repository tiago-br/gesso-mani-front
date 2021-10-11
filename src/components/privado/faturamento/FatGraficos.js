import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';


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
        graficosMeses:{
            labels: this.props.meses,
            datasets: 
                    [
                        {
                            label: 'Rainfall',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#000000',
                            borderColor: '#000000',
                            borderWidth: 2,
                            data: [65, 59, 80, 81, 56],
                            color:'white'
                        },
                        {
                            label: 'Test',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#FF0000',
                            borderColor: '#FF0000',
                            borderWidth: 2,
                            data: [65, 59, 80, 81, 70]
                        },
                        {
                            label: 'asas',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#D2691E',
                            borderColor: '#D2691E',
                            borderWidth: 2,
                            data: [65, 40, 80, 90, 70]
                        },
                        {
                            label: 'lll',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#0000CD',
                            borderColor: '#0000CD',
                            borderWidth: 2,
                            data: [30, 20, 10, 100, 70]
                        },
                        {
                            label: 'ultimo',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#008000',
                            borderColor: '#008000',
                            borderWidth: 2,
                            data: [100, 10, 100, 100, 70]
                        },
                    ]
        }
    }
    componentDidMount = () =>{
        const {anos, vendas} = this.props
        let copyAnos = [...anos]
        if(copyAnos.length>5){
            copyAnos = copyAnos.splice(-5)
        }
        const listaColors = ["#000000","#FF0000","#D2691E","#0000CD","#008000"]

        const graficos = anos.map((ano,index)=>{
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

        this.setState({
            load:true,
            graficosMeses:{
                labels:this.props.meses,
                datasets:graficos
            }
        })
    }
    render() {
        console.log(this.state.graficosMeses)
        return (
            <div className="container-grafico-fat">
                <h1>Faturamento gráfico</h1>
                <h3>Faturamento dos últimos 5 anos</h3>
                {this.state.load?
                <>
                <div>
                    <button onClick={this.props.voltar}>Voltar</button>
                </div>
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
            }}
            />
            </section>
            </>
            :
            <h2>Carregando...</h2>}
        </div>
        )
    }
}

export default FatGraficos
