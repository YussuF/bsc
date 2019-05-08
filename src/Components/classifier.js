import React from 'react';
import Poem from './Classifier/poem.js';
import Input from './Classifier/input.js';
import Output from './Classifier/test.js';

let textdata = require('../datamock.json');
let machinedata = require('../machinemock.json');
let categorydata = require('../categorymock.json');


class Classifier extends React.Component {
    state = {
        machinedata: machinedata,
        textdata: textdata,
        categorydata: categorydata
    }


    render() {
    console.log(this.state.categorydata);
        return(
            <div className="site">
                <div className="container">
                    <div className="left">
                        <Output machinedata={this.state.machinedata} />
                    </div>
                    <div className="middle">
                        <Poem textdata={this.state.textdata} />
                    </div>
                    <div className="right">
                        <Input machinedata={this.state.machinedata} categorydata={this.state.categorydata} />
                    </div>
                </div>
            </div>
        );
    }
}



export default Classifier;
