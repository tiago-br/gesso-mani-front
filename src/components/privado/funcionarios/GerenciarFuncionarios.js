import React, { Component } from 'react'

class GerenciarFuncionarios extends Component {
    state={
        load:false
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <div>
                {this.state.load?
                    <section>
                        
                    </section>
                    :
                    null  
                }
            </div>
        )
    }
}

export default GerenciarFuncionarios
