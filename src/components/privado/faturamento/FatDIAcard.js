import React, { Component } from 'react'

class FatDIAcard extends Component {
    render() {
        return (
            <div>
                <button>
                    {this.props.dia}
                </button>
            </div>
        )
    }
}

export default FatDIAcard
