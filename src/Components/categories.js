import React from 'react';
/*jshint loopfunc:true */
import ChangeButton from './Categories/change_button.js';
export default class Categories extends React.Component {


    handleClick(e) {
        console.log('yo');
        console.log(e);
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
                for (var i in this.props.correctiondata){
                    if(parseInt(this.props.correctiondata[i].output.poem_id) === parseInt(key)) {
                        var temp = i;
                    }
                    else temp = "boing";
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
                console.log(key);
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
                <h3>Poems available at this interface right now: </h3>
                <table>
                {this.createCategoryTable()}
                </table>
            </div>
        );
    }
}

