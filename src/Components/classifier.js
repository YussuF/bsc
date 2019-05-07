import React from 'react';
import PropTypes from 'prop-types';

import Poem from './Classifier/poem.js';
import Input from './Classifier/input.js';
import Output from './Classifier/test.js';

let textdata = require('../datamock.json');
let machinedata = require('../machinemock.json');


class Classifier extends React.Component {
    state = {
        machinedata: machinedata,
        textdata: textdata
    }


    render() {
    console.log(this.state.machinedata);
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
                        <Input machinedata={this.state.machinedata} />
                    </div>
                </div>
            </div>
        );
    }
}



export default Classifier;
