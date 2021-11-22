import React, { Component } from 'react'

export class TableRow extends Component {
    
    render() {
        var row = this.props.row;
        return (
            <tr>
                {console.log(row)}
                {/* {row.map(val => <tr><td>{val}</td></tr>)} */}
            </tr>
        )
    }
}

export default TableRow
