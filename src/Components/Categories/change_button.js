import React from 'react';

export default class change_button extends React.Component {
    handleClick = () => {
        this.props.onHeaderClick(this.props.value);
    }

    render() {
        return (
            <td onClick={this.handleClick}>
                {this.props.column} Test
            </td>
        );
    }
}
