import React, { Component } from 'react'

class FatMEScard extends Component {
    componentDidMount = () =>{
    }
    render() {
        return (
            <div>
                <button>
                    {this.props.mes}
                </button>
            </div>
        )
    }
}

export default FatMEScard
