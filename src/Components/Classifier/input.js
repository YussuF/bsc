import React from "react";
import axios from 'axios';
axios.defaults.port = 3001;



//Input takes care of the right-hand side of the classifier, namely the form for the user-input. Categories for the form are loaded dynamically from categorymock.json. Poem-class detected by NN is filtered from form.

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
        var output = {};
        if (this.state.selectedOption === 'option1') {
            output = {
                cat: 'unchanged',
                poem_id: this.props.poem_id,
                categories: this.props.categorydata,
            }
        } else

        output = {
            cat: this.state.selectedOption,
            poem_id: this.props.poem_id,
            categories: this.props.categorydata,
        }

        axios.post(`/api/greeting/`, { output })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }


    createRadioTable = () => {
        let table = []
        for (var key in this.props.categorydata) {
            var i = 1;
            let children = [];
            if (this.props.categorydata[key] === this.props.machinedata[this.props.poem_id].class)children.push('');
            else children.push(<div key={key} className="form-check">
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
            table.push(<div key={key}>{children}</div>)
            i = i+1;
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
                            {/*TODO: value here is kinda shite. Perhaps make it something like correct or no action needed or such*/}
                            <input
                                type="radio"
                                name="input_form_radio"
                                value="option1"
                                checked={this.state.selectedOption === "option1"}
                                onChange={this.handleOptionChange}
                                className="form-radio-input"
                            />
                            Korrekt ({this.props.machinedata[this.props.poem_id].class})
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