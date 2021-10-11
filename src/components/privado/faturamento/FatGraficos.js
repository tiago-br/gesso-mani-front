import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';


const separarVendasPorMes = (ano,vendas) =>{
    const listaDoFatDosMeses = [];

    const vendasFilterByYear = vendas.filter (e=>e.data.ano===ano);

    for(let i=0 ; i<=11 ; i++){
        let mes = `${i+1}`
        if(i<9){
            mes = `0${i+1}`
        }
        const vendasMes = vendasFilterByYear.filter(vendas=>vendas.data.mes===mes).reduce((acc,e)=>{
            return acc+e.valor_total
        },0)
        listaDoFatDosMeses.push(vendasMes)
    }
    return listaDoFatDosMeses
}
    

export class FatGraficos extends Component {
    state={
        load:false,
        graficos:{
            labels: this.props.meses,
            datasets: 
                    [
                        {
                        label: 'Rainfall',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'black',
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56],
                        color:'white'
                        },
                        {
                            label: 'Test',
                            fill: false,
                            lineTension: 0.5,
                            backgroundColor: 'rgba(80,80,192,1)',
                            borderColor: 'red',
                            borderWidth: 2,
                            data: [65, 59, 80, 81, 70]
                        }
                    ]
        }
    }
    componentDidMount = () =>{
        const {meses, anos, vendas} = this.props
        console.log(vendas)
        this.setState({
            load:true
        })
    }
    render() {
        return (
            <div className="container-grafico-fat">
                <h1>Faturamento gráfico</h1>
                {this.state.load?
                <>
                <div>
                    <button onClick={this.props.voltar}>Voltar</button>
                </div>
                <section>
                   <Line
                data={this.state.graficos}
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
            </>
            :
            <h2>Carregando...</h2>}
        </div>
        )
    }
}

export default FatGraficos
