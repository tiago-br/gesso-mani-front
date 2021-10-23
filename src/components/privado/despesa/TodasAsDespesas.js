import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import { NavLink } from 'react-router-dom'
import apiUtil from '../../../utils/api.util'
import {TiInfoOutline} from 'react-icons/ti'
import TodasAsDespesasCard from './TodasAsDespesasCard'

export class TodasAsDespesas extends Component {
    state={
        despesas:[],
        load:false,
        filterByName:[],
        filterText:'',
    }
    componentDidMount = async ()=>{
        const despesas = await apiUtil.getDespesa()
        const sortDespesa = despesas.sort((a,b)=>{
            //a
            const data = a.data.split('T')[0].split('-')
            const aNumberCompare = Number((data[0]+data[1]))
            
            //b
            const dataB = b.data.split('T')[0].split('-')
            const bNumberCompare = Number((dataB[0]+dataB[1]))
            return aNumberCompare-bNumberCompare
        })
        this.setState({
            despesas:sortDespesa,
            load:true,
            filterByName:sortDespesa
        })
    }
    onClickDeleteDespesa = async (nomeDespesa) =>{
        await this.setState({
            load:false
        })
        try {
            
        while (this.state.despesas.some(e=>e.name.includes(nomeDespesa))===true) {
            const indexDespesa = this.state.despesas.findIndex(e=>e.name===nomeDespesa)
            await apiUtil.deleteDespesa(this.state.despesas[indexDespesa]._id)
            const novaDespesa = await apiUtil.getDespesa()
            await this.setState({
                despesas:novaDespesa
            })
        }
        } catch (error) {
            alert('Server Error - confira a despesa e exclua novamente')
        }
        window.location.reload()
    }
    onClickDeleteUmaDespesa = async (nomeDespesa) =>{
        await this.setState({
            load:false
        })
            try {
            const indexDespesa = this.state.despesas.findIndex(e=>e.name===nomeDespesa)
            await apiUtil.deleteDespesa(this.state.despesas[indexDespesa]._id)
            } catch (error) {
                alert('erro ao deletar compra')
            }
        window.location.reload()
    }
    onChangeFilterByName = async(e)=>{
        e.preventDefault()
        await this.setState({
            filterText:e.target.value.toLocaleLowerCase()
        })

        const despesas = this.state.despesas
        const filterByName = despesas.filter(despesa=>despesa.name.toLocaleLowerCase().includes(this.state.filterText))
        await this.setState({
            filterByName
        })
    }
    render() {
        return (
            <div>
                <Navbar/>
                {this.state.load?
                <>
                <div className="todas-as-compras-buttons-page">
                        <div className="container-buttons-despesa-page">
                                <NavLink to='/sistema/despesas'>Página despesas</NavLink> 
                    
                                <NavLink to='/sistema/despesas/todas-as-compras'>Todas as compras</NavLink>
                            
                                <NavLink to='/sistema/despesas/todas-as-despesas'>Todas as despesas</NavLink>
                        </div>
                        <h1>Todas as despesas<span></span></h1>
                        <h2 className="info-todas-as-despesas"><TiInfoOutline/><span>Após o fechamento mensal as despesas vão para o fechamento</span></h2>
                        <div className="todas-as-despesas-filtro-nome-container">
                            <div>
                                <input type="text" name='filterText' value={this.state.filterText} onChange={this.onChangeFilterByName} placeholder="Pesquise a despesa por nome"/>
                            </div>
                        </div>
                </div>
                <div className="container-todas-as-compras-cards">
                    <div>
                        {this.state.filterByName.map(despesa=>
                            <TodasAsDespesasCard key={despesa._id} delete={this.onClickDeleteDespesa} deleteUma={this.onClickDeleteUmaDespesa}{...despesa}/>
                        )}
                    </div>
                </div>
                </>
                :
                <h1>Carregando...</h1>
                }
            </div>
        )
    }
}

export default TodasAsDespesas
