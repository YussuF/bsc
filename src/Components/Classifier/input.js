import React from "react";
import axios from 'axios';
axios.defaults.port = 3001;



//Input takes care of the right-hand side of the classifier, namely the form for the user-input. Categories for the form are loaded dynamically from categorymock.json. Poem-class detected by NN is filtered from form.

class Input extends React.Component {

    state = {
        selectedOption: "option1",
        rename: "",
    }

    constructor(props) {
        super(props);
        this.handleRename = this.handleRename.bind(this);
    }

    handleRename(e){
        let value = e.target.value;

        this.setState({rename: value});
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        var e = this.state.rename;
        var output = {};
        if(!this.state.rename.length == 0){
            output = {
                poem_id: this.props.machinedata[this.props.poem_id].id,
                machinecat : this.props.machinedata[this.props.poem_id].class,
                cat: this.state.rename,
                conf: this.props.machinedata[this.props.poem_id].confidence
            };

            axios.post(`/api/category/`, { e })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
        }
        else{
            output = {
                poem_id: this.props.machinedata[this.props.poem_id].id,
                machinecat : this.props.machinedata[this.props.poem_id].class,
                cat: this.state.selectedOption,
                conf: this.props.machinedata[this.props.poem_id].confidence
            }
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
                        value={this.props.categorydata[key]}
                        checked={this.state.selectedOption === this.props.categorydata[key]}
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
                                checked={this.state.selectedOption === "unchanged"}
                                onChange={this.handleOptionChange}
                                className="form-radio-input"
                            />
                            Korrekt ({this.props.machinedata[this.props.poem_id].class})
                        </label>
                    </div>
                    <p>Falsch, es handelt sich um</p>
                    {this.createRadioTable()}
                    <p>Alles quatsch, es handelt sich um</p>
                    <input value={this.state.rename} onChange={this.handleRename} type="text"></input>
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