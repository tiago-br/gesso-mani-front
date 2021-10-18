import React, { Component } from 'react'
import api from '../../../utils/api.util'
import './stylecolaboradores/style.colaboradores.css'
import ColaboradorCard from './ColaboradorCard'
export class TodosColaboradores extends Component {
    state ={
        colaboradores:[]
    }

    componentDidMount = async () =>{
        const {data} = await api.getColaborador()
        this.setState({
            colaboradores:data,
            load:true
        })
    }
    render() {
        return (
            <div className="container-todos-colaboradores">
                {this.state.load?
                <div className="container-colaboradores-cards">
                    {
                        this.state.colaboradores.map(colaborador =>
                            <ColaboradorCard {...colaborador} key={colaborador._id}/>
                        )
                    }
                </div>
                :
                null}
            </div>
        )
    }
}

export default TodosColaboradores
