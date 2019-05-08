import React from "react";

{/*
    Input takes care of the right-hand side of the classifier, namely the form for the user-input. Categories for the form are loaded dynamically from categorymock.json. Poem-class detected by NN is filtered from form.
    TODO: Form Submit needs to save to json.

*/}
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
            // TODO: Hardcoded 0 is the first poem in machinemock, should be found via machinedata[i].id === id of the current poem
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
                                {/*TODO: value here is kinda shite. Perhaps make it something like correct or no action needed or such*/}
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