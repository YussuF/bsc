import React from 'react';
import Poem from './Classifier/poem.js';
import Input from './Classifier/input.js';
import Output from './Classifier/test.js';


//Classifier is the Wrapper for the classifier site, loading all jsons needed. Possibly this has to be moved to index.js once the poem is rendered dynamically and not hardcoded.




class Classifier extends React.Component {
state ={
    poem_id: 42,
    poem_title: '',
}

    findPoem = () => {
        var temp = 0;
        var res = 0;
        for (var key in this.props.machinedata) {
            for(var k in this.props.correctiondata){
                console.log(this.props.correctiondata[k].output);
                console.log(temp);
                console.log(parseInt(this.props.machinedata[key].Confidence) > temp);
                if(this.props.correctiondata[k].output.poem_id === this.props.machinedata[key]){
                    console.log('once');
                }
                else
                if(parseInt(this.props.machinedata[key].Confidence) > temp) {
                    console.log('yay');
                    console.log(key);
                    temp = parseInt(this.props.machinedata[key].Confidence);
                    res = key;
                }
            }

        }
        console.log(res);
        return res;
    }


    render() {
        {this.state.poem_id = this.findPoem()}
        {this.state.poem_title = this.props.machinedata[this.state.poem_id].id}
        return(
            <div className="site">
                <div className="container">
                    <div className="left">
                        <Output machinedata={this.props.machinedata} poem_id={this.state.poem_id} />
                        <p>Hello{this.props.greeting}</p>
                    </div>
                    <div className="middle">
                        <Poem textdata={this.props.textdata}  poem_title={this.state.poem_title}/>
                    </div>
                    <div className="right">
                        <Input machinedata={this.props.machinedata} categorydata={this.props.categorydata} poem_id={this.state.poem_id} />
                    </div>
                </div>
            </div>
        );
    }
}



export default Classifier;
