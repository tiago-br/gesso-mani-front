import React, { Component } from 'react'
import apiUtil from '../../../utils/api.util'
import Navbar from '../navbar/Navbar'
import { NavLink } from 'react-router-dom'
import './styles/styleDespesas.css'
import TodasAsComprasCard from './TodasAsComprasCard'

export class TodasAsCompras extends Component {
    state={
        compras:[],
        filterByDataCompras:[],
        dataYearMonth:0,
        load:false
    }
    componentDidMount = async()=>{
        const novaData = new Date()
        const currentYear= novaData.getFullYear()
        const currentMonth= novaData.getMonth()+1
        const dataYearMonth = `${currentYear}-${currentMonth}`
        this.setState({
            dataYearMonth,
        })
        const compras = await apiUtil.getCompra()
        const filterByDataCompras = compras.filter(compra=>compra.data.includes(dataYearMonth))
        await this.setState({
            compras,
            filterByDataCompras,
            load:true
        })
        
    }
    onChangeData = async (e) =>{
        e.preventDefault()
        const {value} = e.target
        const filterByDataCompras = this.state.compras.filter(compra=>compra.data.includes(value))
        await this.setState({
            dataYearMonth:value,
            filterByDataCompras
        })
    }
    onClickDeleteCompra = async(id,produtos) =>{
      
        try {
        await produtos.forEach(element => {
            const payload ={
                quantidade:element.quantidade
            }
            apiUtil.putVendaParaProduto(element.name,payload)
        });
       
        await apiUtil.deleteCompra(id)
        window.location.reload()
        }catch (error) {
            alert('Fatal-erro-confira-o-estoque e a compra se foi deletada')
        }

        
    }
    render() {
        return (
            <div>
                {this.state.load?
                <>
                <Navbar/>
                
                <div>
                    <div className="todas-as-compras-buttons-page">
                        <div className="container-buttons-despesa-page">
                                <NavLink to='/sistema/despesas'>Página despesas</NavLink> 
                    
                                <NavLink to='/sistema/despesas/todas-as-compras'>Todas as compras</NavLink>
                            
                                <NavLink to='/sistema/despesas/todas-as-vendas'>Todas as vendas</NavLink>
                        </div>
                        <h1>Todas as compras</h1>
                    </div>
                   
                    <div className="todas-as-compras-selecione-data">
                        <label>Selecione o ano e o mês</label>
                        <input type="month" name='dataYearMonth'
                                 value={this.state.dataYearMonth} min='2021-10'onChange={this.onChangeData}></input>
                    </div>
                    <div className="container-todas-as-compras-cards">
                        <div>
                            {this.state.filterByDataCompras.map(compra=>
                                <TodasAsComprasCard delete={this.onClickDeleteCompra} {...compra} key={compra._id}/>
                            )}
                        </div>
                    </div>
                </div>
                </>
                :
                <h1>Carregando...</h1>}
            </div>
        )
    }
}

export default TodasAsCompras
