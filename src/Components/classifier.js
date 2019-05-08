import React from 'react';
import Poem from './Classifier/poem.js';
import Input from './Classifier/input.js';
import Output from './Classifier/test.js';

{/*
    Classifier is the Wrapper for the classifier site, loading all jsons needed. Possibly this has to be moved to index.js once the poem is rendered dynamically and not hardcoded.
*/}



class Classifier extends React.Component {



    render() {
        return(
            <div className="site">
                <div className="container">
                    <div className="left">
                        <Output machinedata={this.props.machinedata} />
                    </div>
                    <div className="middle">
                        <Poem textdata={this.props.textdata} />
                    </div>
                    <div className="right">
                        <Input machinedata={this.props.machinedata} categorydata={this.props.categorydata} />
                    </div>
                </div>
            </div>
        );
    }
}



export default Classifier;
