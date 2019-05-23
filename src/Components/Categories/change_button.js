import React from 'react';

export default class ChangeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    onClick = () => {
    this.props.onClick(this.props.value);
    }

    onFlick(e){
        this.props.onClick(e);
    }


    render() {
        return (
            <button onClick={() => this.onFlick(this.props.value)}>
                {this.props.value} Test
            </button>
        );
    }
}
