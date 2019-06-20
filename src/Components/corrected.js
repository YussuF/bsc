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
                    children.push(<td> {this.props.machinedata[corrected_ids[i]].id}</td>);
                    children.push(<td> {this.props.machinedata[corrected_ids[i]].class} </td>);
                    children.push(<td> {this.props.machinedata[corrected_ids[i]].confidence} </td>)
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

    render() {
        return (
            <div className="Corrected_wrap">
                <h3>Corrected Poems</h3>
                <p>in order of their correction. The Poem last corrected appears on top of the list</p>
                <table>
                    <tbody>
                        {this.createCorrectedOverview()}
                    </tbody>
                </table>
                <table>
                    <tbody>
                        {this.createCategoryOverview()}
                    </tbody>
                </table>
                {this.renderRedirect()}
            </div>
        );
    }
}