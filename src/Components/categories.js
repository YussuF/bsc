import React from 'react';
import { Redirect } from 'react-router-dom'
/*jshint loopfunc:true */
import ChangeButton from './Categories/change_button.js';


export default class Categories extends React.Component {
    state = {
        redirect: false,
        poem_id: 42,
        value: '',
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleClick(e) {

        this.setState({
            poem_id: e
        }, () => {
            this.setState({redirect:true});
        });
        //this.setState({redirect: true});

        //this.props.onPoemSelection(e);
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }

    handleSubmit(e){
        console.log(this.state.value);
        e.preventDefault();
        this.props.onCategoryAdd(this.state.value);
    }


    setRedirect() {
        this.setState({
            redirect: true
        });
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/classifier',
                search: '?lol',
                state: {poem_id2: this.props.poem_id}
            }}/>
        }
    }


    addCategory(e){
        this.setState({
            value: e
        }, () => {
            console.log(this.state.value);
        });
        console.log(this.state.value);
    }


    createCategoryTable = () => {
        let table = [];
        let header = [];

        header.push(<th key="poem_id">Poem Id</th>);
        header.push(<th key="poem_class">Poem Class</th>);
        header.push(<th key="poem_conf">Confidence</th>);
        header.push(<th key="poem_corrected">Corrected</th>);
        table.push(header);

        for (var key in this.props.machinedata) {
            var temp = 'boing';
                for (var i in this.props.correctiondata){
                    if(parseInt(this.props.correctiondata[i].output.poem_id) === parseInt(key)) {

                        temp = i;
                    }

                }


                let children = [];
                children.push(<td key={this.props.machinedata[key].id}> {this.props.machinedata[key].id} </td>);
                children.push(<td key={this.props.machinedata[key].class}> {this.props.machinedata[key].class} </td>);
                children.push(<td key={this.props.machinedata[key].Confidence}> {this.props.machinedata[key].Confidence} </td>);
                if(!(temp === "boing")) {
                    children.push(<td key={this.props.correctiondata[temp].output.poem_id}> {this.props.correctiondata[temp].output.cat}</td>);
                }
                else
                    children.push(<td key={key}> Uncorrected</td>);
            children.push(<ChangeButton
                onClick={this.handleClick}
                value={key}/>);

            table.push(<tr key={key}>{children}</tr>);
        }
        return table
    }




    createCategoryOverview = () => {
        let table = [];
        let children = [];
        let cats = [];

        for (var k in this.props.categorydata){
            cats.push(<td key={this.props.categorydata[k]}>{k}</td>)
        }

        table.push(<tr key="children2" >{cats}</tr>);

        for (var key in this.props.categorydata){
            children.push(<td key={this.props.categorydata[key]}> {this.props.categorydata[key]}</td>)
        }
        table.push(<tr key="children" >{children}</tr>);

        return table;
    }

    render(){
        return(
            <div>
                <h3>Categories available at this interface right now: </h3>
                <table>
                    <tbody>
                {this.createCategoryOverview()}
                    </tbody>
                </table>
                <h3>Want to add another Category ? </h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        New Category:
                        <input type="text" onChange={this.handleChange} />
                    </label>

                </form>
                <h3>Poems available at this interface right now: </h3>
                <table>
                {this.createCategoryTable()}
                </table>
                {this.renderRedirect()}
            </div>
        );
    }
}

