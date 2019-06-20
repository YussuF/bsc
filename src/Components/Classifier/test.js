import React from "react";


//This is the renamed Output.js for reasons unknown. It takes care of the left-hand side of the classifier site, namely the confidence table.
//The Table is created in createConfidenceTable using data passed as props from the calling classifier.js

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



class Output extends React.Component {

    createConfidenceTable = () => {
        let table = []
        for (var key in this.props.machinedata[this.props.poem_id].distribution) {
            let children = [];

            var dist = [this.props.machinedata[this.props.poem_id].distribution[key].toString().substr(2).slice(0, 2), '.', this.props.machinedata[this.props.poem_id].distribution[key].toString().substr(2).slice(2)].join('');
            children.push(dist.substring(0,6) + ' %  ' + key);
            table.push(<tr key={this.props.machinedata[this.props.poem_id].distribution[key]}>{children}</tr>);
        }
        return table
    }

    createManualNotice = () => {
        if (!this.isEmpty(this.props.machinedata[this.props.poem_id].trueclass)){
            return <p>Dieses Gedicht wurde <span className="red"> manuell</span> als {this.props.machinedata[this.props.poem_id].trueclass} klassifiziert</p>
        }
    }


    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render(){
        let data = [];
        var tempo = this.props.machinedata[this.props.poem_id].distribution;
        var classes = Object.keys(tempo)
        var counter = 0;
        var temp = '';
        var curr_class = '';
        var curr_dist = '';
        for (var key in this.props.machinedata[this.props.poem_id].distribution) {
            curr_class = classes[counter];
            curr_dist = this.props.machinedata[this.props.poem_id].distribution[key];
            temp = "{ name:'" + classes[counter] + "', confidence:'" + this.props.machinedata[this.props.poem_id].distribution[key] + "',},";
            counter++;
            data.push({name:curr_class, confidence:curr_dist,});

        }


        return(

            <div className="classifier_output">
                <p>Dieses Gedicht wurde mit <u>{[this.props.machinedata[this.props.poem_id].confidence.toString().substr(2).slice(0, 2), '.', this.props.machinedata[this.props.poem_id].confidence.toString().substr(2).slice(2)].join('').substring(0,6)}% Confidence</u> als <b>{this.props.machinedata[this.props.poem_id].class}</b> klassifiziert.
                    Weitere Konfidenzen </p>

                    <table className="Confidence_table">
                        <tbody>
                            {this.createConfidenceTable()}
                        </tbody>
                    </table>
                {this.createManualNotice()}
                <BarChart
                    width={450}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="confidence" fill="#8884d8" />
                </BarChart>
            </div>
        );
    }
}
export default Output;