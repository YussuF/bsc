import React from 'react';
import ChangeButton from "./Categories/change_button";
import {Redirect} from "react-router-dom";

export default class Corrected extends React.Component {
    state = {
        poem_id: 42,
        counter: 0,
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    renderRedirect() {

        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/classifier',
                state: {poem_id2: this.state.poem_id}
            }}/>
        }
    }

    handleClick(e) {
        this.setState({
            poem_id: e
        }, () => {
            this.setState({redirect:true});
        });
    }

    createCorrectedOverview = () => {
        let table = [];

        let cats = [];
        let header = [];
        let corrected_ids = [];

        header.push(<th key="poem_id">Poem Id</th>);
        header.push(<th key="poem_class">Poem Class</th>);
        header.push(<th key="poem_conf">Confidence</th>);
        header.push(<th key="poem_corrected">Corrected</th>);
        table.push(header);

        for (var k in this.props.correctiondata) {
            corrected_ids.push(this.props.correctiondata[k].output.poem_id)
        }
        var k = corrected_ids.length-1;
        corrected_ids.reverse();
        for(var i in corrected_ids){

                    let children = [];
                    children.push(<td> {this.props.correctiondata[k].output.poem_id}</td>);
                    children.push(<td> {this.props.correctiondata[k].output.machinecat} </td>);
                    children.push(<td> {[this.props.correctiondata[k].output.conf.toString().substr(2).slice(0, 2), '.', this.props.correctiondata[k].output.conf.toString().substr(2).slice(2)].join('').substring(0,6)} </td>)

                    children.push(<td> {this.props.correctiondata[k].output.cat} </td>);
                    children.push(<ChangeButton
                        onClick={this.handleClick}
                        value={corrected_ids[i]}/>);
                    table.push(<tr>{children}</tr>);
                    k--;
                    console.log(k);

            }

        return table;
    }

    createCategoryOverview = () => {
        let table = [];
        let children = [];
        let cats = [];



        for (var key in this.props.categorydata){
            children.push(<tr><th key={this.props.categorydata[key]}>{key}</th><td key={this.props.categorydata[key]}> {this.props.categorydata[key]}</td></tr>)
        }
        table.push(<tbody key="children" >{children}</tbody>);

        return table;
    }

    render() {
        return (
            <div className="Corrected_wrap">
                <h3>Corrected Poems</h3>
                <p>in order of their correction. The Poem last corrected appears on top of the list</p>
                <table className="Corr_list">
                    <tbody>
                        {this.createCorrectedOverview()}
                    </tbody>
                </table>
                <table className="Catview">
                        {this.createCategoryOverview()}
                </table>
                {this.renderRedirect()}
            </div>
        );
    }
}