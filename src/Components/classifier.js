import React from 'react';
import Poem from './Classifier/poem.js';
import Input from './Classifier/input.js';
import Output from './Classifier/test.js';

{/*
    Classifier is the Wrapper for the classifier site, loading all jsons needed. Possibly this has to be moved to index.js once the poem is rendered dynamically and not hardcoded.
*/}



class Classifier extends React.Component {


    findPoem = () => {
        console.log(this.props.machinedata);
        return
    }


    render() {
        return(
            <div className="site">
                <div className="container">
                    <div className="left">
                        <Output machinedata={this.props.machinedata} />
                        <p>Hello{this.props.greeting}</p>
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
