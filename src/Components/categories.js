import React from 'react';
import { Redirect } from 'react-router-dom'
/*jshint loopfunc:true */
import ChangeButton from './Categories/change_button.js';
import axios from "axios";


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
        this.handleRemove = this.handleRemove.bind(this);
    }


    handleClick(e) {

        this.setState({
            poem_id: e
        }, () => {
            this.setState({redirect:true});
        });
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onCategoryAdd(this.state.value);
    }

    handleRemove(e){
        e.preventDefault();
        axios.post(`/api/categoryremove/`, {})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    renderRedirect() {

        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/classifier',
                search: '?lol',
                state: {poem_id2: this.state.poem_id}
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
            <div className="category_wrap">
                <h3>Categories available at this interface right now: </h3>
                <table>
                    <tbody>
                {this.createCategoryOverview()}
                    </tbody>
                </table>
                <h3 className="category_head">Want to add another Category ? </h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        New Category:
                        <input type="text" onChange={this.handleChange} />
                    </label>

                </form>
                <h3 className="category_head">Want to remove the last Category ?</h3>
                <p className="toolong_p"> ATTENTION: This removes the Category with the highest Index.
                    Do not remove Categories with poems already assigned to them because that can and will break the site.
                    Future Versions might be able to handle this better. As of now, it's meant to avoid having to deal with typos in newly added Categories.</p>
                <form onSubmit={this.handleRemove}>
                    <button>Remove</button>
                </form>
                <h3 className="category_head">Poems available at this interface right now: </h3>
                <table>
                {this.createCategoryTable()}
                </table>
                {this.renderRedirect()}
            </div>
        );
    }
}

