import React, { Component } from 'react'
import api from '../../../utils/api.util'
import {ImWarning} from 'react-icons/im'


class FechamentoForm extends Component {
    state={
        data:"",
        valor_total_vendas_do_mes:0,
        salarios_colaboradores: 0,
        aluguel: 0,
        valor_total_compras_do_mes: 0,
        DespesasGerais: [],
        despesas_gerais_valor: 0,
        despesas_totais: 0,
        resultado: 0,
        user: localStorage.getItem('user'),
        msg:'',
        dataAnoMes:''
    }
    onChangeData = async(e) =>{
        e.preventDefault()
        const {value} = e.target
        await this.setState({
            data:value
        })
        const splitData = value.split('-')
        const mes = splitData[1]
        const ano = splitData[0]
        const dataAnoMes = `${ano}-${mes}`

        await this.setState({
            dataAnoMes
        })

        //Valor total das Despesas
        const todasAsDespesas =  await api.getDespesa()
        const filterDespesas = todasAsDespesas.filter(e=>e.data.includes(dataAnoMes))//<-----Despesas filtrada pela data
        const despesas_gerais_valor = filterDespesas.reduce((acc,e)=>{return acc + e.gasto_total},0)//<--Valor total das despesas

        //Salario Colaboradores
        const {data:colaboradores} = await api.getColaborador()
        const filterColaborador = colaboradores.filter(e=>e.ativo===true)
        const salarios_colaboradores = filterColaborador.reduce((acc,e)=>{return acc + e.salario},0)
        
        //Vendas Mes
        const {data:vendas} = await api.getVendas()
        const filterVendas = vendas.filter(e=>e.data.includes(dataAnoMes))
        const valor_total_vendas_do_mes = filterVendas.reduce((acc,e)=>{return acc + e.valor_total},0)
        
        //Compras Mes 
        const comprasMes = await api.getCompra()
        const filterComprasMes = comprasMes.filter(e=>e.data.includes(dataAnoMes))
        const valor_total_compras_do_mes = filterComprasMes.reduce((acc,e)=>{return acc + e.valor_total_compra},0)

        await this.setState({
            valor_total_vendas_do_mes,
            salarios_colaboradores,
            valor_total_compras_do_mes,
            despesas_gerais_valor,
            
        })

    }
    onChangeAluguel = async (e) =>{
        e.preventDefault()
        const {name,value} = e.target
        this.setState({
            [name]:value
        })

    }
    onClickSubmit = async () =>{
        const fechamentos = await api.getFechamento()
        const dataFechamentos = fechamentos.map(e=>{
            const dataMesAno = e.data.split('-')
            const mes  = dataMesAno[1]
            const ano = dataMesAno[0]
            return `${ano}-${mes}`
    
        })
        const checkExist = dataFechamentos.every(e=>e!==this.state.dataAnoMes)
        if(!this.state.data){
            this.setState({
                msg:'Insira uma data válida'
            })
            return setTimeout(()=>{this.setState({msg:''})},3000)
        }
        if(checkExist){
            try {
                const payload ={
                    data:this.state.data,
                    valor_total_vendas_do_mes:this.state.valor_total_vendas_do_mes,
                    salarios_colaboradores: this.state.salarios_colaboradores,
                    aluguel: this.state.aluguel,
                    valor_total_compras_do_mes: this.state.valor_total_compras_do_mes,
                    DespesasGerais: [],
                    despesas_gerais_valor: this.state.despesas_gerais_valor,
                    despesas_totais:this.state.salarios_colaboradores + this.state.aluguel +  this.state.valor_total_compras_do_mes +this.state.despesas_gerais_valor,
                    resultado:this.state.valor_total_vendas_do_mes - (this.state.salarios_colaboradores + this.state.aluguel +  this.state.valor_total_compras_do_mes +this.state.despesas_gerais_valor),
                    user: localStorage.getItem('user'),
                }
                await api.postFechamento(payload)
                this.setState({
                    msg:`Fechamento cadastrado com sucesso`
                })
                return setTimeout(()=>{this.setState({msg:''})},3000)
            } catch (error) {
                this.setState({
                    msg:`Erro ao cadastrar fechamento`
                })
                return setTimeout(()=>{this.setState({msg:''})},3000)
            }
        }else{
            this.setState({
                msg:`Já existe um fechamento para ${this.state.dataAnoMes}`
            })
            return setTimeout(()=>{this.setState({msg:''})},3000)
        }
        
        
         

        
    }
    render() {
        return (
            <div>
                <h2>Formulário</h2>
                <form>
                    <div>
                        <label>Data:</label>
                        <input type='date' value={this.state.data} onChange={this.onChangeData}/>
                        
                    </div>
                    <div>
                        <label>Aluguel:</label>
                        <input type='number' name="aluguel" value={this.state.aluguel} onChange={this.onChangeAluguel}/>
                    </div>
                    <div>
                        <div>
                            <h3>{this.state.msg}</h3>
                        </div>
                        <div>
                            <button type="button" onClick={this.onClickSubmit}>Enviar</button>
                            <span><ImWarning/></span>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default FechamentoForm
