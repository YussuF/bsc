import React from "react";


//This is the renamed Output.js for reasons unknown. It takes care of the left-hand side of the classifier site, namely the confidence table.
//The Table is created in createConfidenceTable using data passed as props from the calling classifier.js
//TODO : Some styling. The problem of getting the values for any poem instead of a hardcoded one should be in the calling classifier.js and not here, but im not sure rn.



class Output extends React.Component {

    createConfidenceTable = () => {
        let table = []
        for (var key in this.props.machinedata[this.props.poem_id].distribution) {
            let children = [];
            children.push(this.props.machinedata[this.props.poem_id].distribution[key] + ' %  ' + key);
            table.push(<tr key={this.props.machinedata[this.props.poem_id].distribution[key]}>{children}</tr>);
        }
        return table
    }


    render(){
        return(

            <div className="classifier_output">
                <p>Dieses Gedicht wurde mit <u>{this.props.machinedata[this.props.poem_id].Confidence}% Confidence</u> als <b>Parlando</b> klassifiziert.
                    Weitere Konfidenzen </p>


                    <table className="Confidence_table">
                        <tbody>
                            {this.createConfidenceTable()}
                        </tbody>
                    </table>

            </div>
        );
    }
}
export default Output;