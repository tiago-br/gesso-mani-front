import React, { Component } from 'react'
import apiUtil from '../../../utils/api.util'
import Navbar from '../navbar/Navbar'

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
    render() {
        return (
            <div>
                {this.state.load?
                <>
                <Navbar/>
                <h1>Todas as compras</h1>
                <div>
                    <div>
                        <label>Selecione o ano e o mês</label>
                        <input type="month" name='dataYearMonth'
                                 value={this.state.dataYearMonth} onChange={this.onChangeData}></input>
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
