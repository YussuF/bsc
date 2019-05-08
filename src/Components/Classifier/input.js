import React from "react";


class Input extends React.Component {

    state = {
        selectedOption: "option1",
    }


    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        console.log('Submitted:', this.state.selectedOption);
    }


    createRadioTable = () => {
        let table = []
        for (var key in this.props.categorydata) {
            let children = []
            if (this.props.categorydata[key] === this.props.machinedata[0].class)children.push('');
            else children.push(<div className="form-check">
                <label>
                    <input
                        type="radio"
                        name="input_form_radio"
                        value={key}
                        checked={this.state.selectedOption === key}
                        onChange={this.handleOptionChange}
                        className="form-radio-input"
                    />
                    {this.props.categorydata[key]}
                </label>
            </div>)
            table.push(<tr>{children}</tr>)
        }
        return table
    }




    render(){

        return (
            <div className="corrector">
                <p>Diese Angabe ist</p>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-check">
                        <label>
                            <input
                                type="radio"
                                name="input_form_radio"
                                value="option1"
                                checked={this.state.selectedOption === "option1"}
                                onChange={this.handleOptionChange}
                                className="form-radio-input"
                            />
                            Korrekt
                        </label>
                    </div>
                    <p>Falsch, es handelt sich um</p>
                    {this.createRadioTable()}
                    <div className="form-submit">
                        <button className="btn form-submit-button" type="submit">
                            Nächstes Gedicht
                        </button>
                    </div>
                </form>

            </div>
        );
    }
}


export default Input;