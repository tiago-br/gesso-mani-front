import React, { Component } from 'react'
import NavBarClient from '../../components/público/NavBarClient'
import apiUtil from '../../utils/api.util'

class Home extends Component {

    componentDidMount = () => {

    }

    teste = async () => {
        const payload = {
            data: 5,
            valor_total_vendas_do_mes: 10,
            salarios_colaboradores:5,
            aluguel: 10,
            valor_total_compras_do_mes:20,
            DespesasGerais: [
              { nome: 'String', valor: 5, descricao: 'String' },
            ],
            despesas_gerais_valor: 5,
            despesas_totais: 20,
            resultado: 30,
          }


        await apiUtil.deleteFechamento("61689538c4da46f954bedf35")
    }

    render() {
        return (
            <div>
                <NavBarClient />
                <button onClick={this.teste}>AAAAAAAAA</button>
            </div>
        )
    }
}

export default Home
