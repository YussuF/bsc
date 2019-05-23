import React from 'react';

export default class ChangeButton extends React.Component {

    onClick(e){
        this.props.onClick(e);
    }
    render() {
        return (
            <button onClick={() => this.onClick(this.props.value)}>
                Ändern
            </button>
        );
    }
}
