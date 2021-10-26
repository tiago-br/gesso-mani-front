import React, { Component } from 'react'
import api from '../../../utils/api.util'
import {ImWarning} from 'react-icons/im'
import styled from 'styled-components'

const ContainerGeral = styled.div`

border: 3px solid black;
height: 23rem;
background-color: #574F43 ;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 3rem;
width: 30rem;
@media (max-width: 960px) {  
    
    width: 80vw;
    
    }
`

const TextForm = styled.h2`

margin-top: 2rem;

`

const DataAndAluguel = styled.div`
margin-top: 3rem;
width: 80%;
border: 2px solid black;
background-color: #1D1D1C;
border: 3px solid black;
color: white;
border-radius: 10px;
display: flex;
align-items: center;
height: 3rem;
justify-content: space-around;
@media (max-width: 960px) {  
    
    width: 95%;
    
    }


`

const Input = styled.input`

background-color: #2B2B2A;
color: white;
width: 15rem;
margin-bottom: 8px;
border: 3px solid black;
text-align: center;
:focus{
  outline: none;
  background-color: white;
  color: black;
  cursor: text;
 
}
@media (max-width: 960px) {  
    
    width: 10rem;
    
    }

`

const ContainerDown = styled.div`

margin-top: 1rem;

`

const ContainerButton = styled.div`
display: flex;

width: 10rem;
justify-content: space-around;
margin-top: 1rem;
align-items: center;

`
const Button = styled.button`
width: 8rem;
text-decoration: none;
height: 2rem;
color: white;
cursor: pointer;
border: 3px solid black;
background-color: #1D1D1C;

:hover{
    background-color:  #727165;
    color: black;
}

@media (max-width: 960px) {
    width: 20vw;
    }
`

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
        dataAnoMes:'',
        idDespesas:[]
    }
    onChangeData = async(e) =>{
        e.preventDefault()
        const {value} = e.target
        await this.setState({
            data:value
        })
        const dataAnoMes = value


        //Valor total das Despesas
        const todasAsDespesas =  await api.getDespesa()
        const filterDespesas = todasAsDespesas.filter(e=>e.data.includes(dataAnoMes))//<-----Despesas filtrada pela data
        const mapIdFilterDespesas = filterDespesas.map(e=>e._id)
        const DespesasGerais = filterDespesas.map(e=>{
            const objectDespesa ={
                nome:e.name,
                valor:e.gasto_total,
                descricao:e.descricao
            }
            return objectDespesa
        })
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
        console.log(valor_total_compras_do_mes)
        await this.setState({
            valor_total_vendas_do_mes,
            salarios_colaboradores,
            valor_total_compras_do_mes,
            despesas_gerais_valor,
            DespesasGerais,
            idDespesas:mapIdFilterDespesas
            
            
        })

    }
    onChangeAluguel = async (e) =>{
        e.preventDefault()
        const {name,value} = e.target
        await this.setState({
            [name]:Number(value)
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
                    DespesasGerais: this.state.DespesasGerais,
                    despesas_gerais_valor: this.state.despesas_gerais_valor,
                    despesas_totais:this.state.salarios_colaboradores + this.state.aluguel +  this.state.valor_total_compras_do_mes +this.state.despesas_gerais_valor,
                    resultado:this.state.valor_total_vendas_do_mes - (this.state.salarios_colaboradores + this.state.aluguel +  this.state.valor_total_compras_do_mes +this.state.despesas_gerais_valor),
                    user: localStorage.getItem('user'),
                }
                console.log(payload)
                await api.postFechamento(payload)
                await this.state.idDespesas.forEach(e=>{
                    api.deleteDespesa(e)
                })
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
            <ContainerGeral>
                <TextForm>Formulário</TextForm>
                
                    <DataAndAluguel>
                        <label>Data:</label>
                        <Input type='month' value={this.state.data} onChange={this.onChangeData}/>
                        
                    </DataAndAluguel>
                    <DataAndAluguel>
                        <label>Aluguel:</label>
                        <Input type='number' name="aluguel" value={this.state.aluguel} onChange={this.onChangeAluguel}/>
                    </DataAndAluguel>
                    <ContainerDown>
                        <div>
                            <h3>{this.state.msg}</h3>
                        </div>
                        <ContainerButton>
                            <Button type="button" onClick={this.onClickSubmit}>Enviar</Button>
                            <span><ImWarning/></span>
                        </ContainerButton>
                    </ContainerDown>
                
            </ContainerGeral>
        )
    }
}

export default FechamentoForm
