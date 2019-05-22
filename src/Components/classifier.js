import React from 'react';
import Poem from './Classifier/poem.js';
import Input from './Classifier/input.js';
import Output from './Classifier/test.js';


//Classifier is the Wrapper for the classifier site, loading all jsons needed. Possibly this has to be moved to index.js once the poem is rendered dynamically and not hardcoded.




class Classifier extends React.Component {
state ={
    poem_id: 1,
    poem_title: '',
}

    findcorrectedpoems = () =>{
        var corrected_ids = [];
        for (var k in this.props.correctiondata){
            corrected_ids.push(parseInt(this.props.correctiondata[k].output.poem_id));
        }
        var loaded_ids = [];
        for (var key2 in this.props.machinedata){
            loaded_ids.push(parseInt(key2));
        }
        var filtered = loaded_ids.filter(
            function(e) {
                return this.indexOf(e) < 0;
            },
            corrected_ids
        );
        console.log(filtered);


        console.log('findcorrected end');
    }



    findPoem = () => {
    console.log('findpoem start');
        var temp = 0;
        var res = 0;
        var corrected_ids = [];
        for (var k in this.props.correctiondata){
            corrected_ids.push(parseInt(this.props.correctiondata[k].output.poem_id));
        }

        var loaded_ids = [];
        for (var key2 in this.props.machinedata){
            loaded_ids.push(parseInt(key2));
        }

        var uncorrected_ids = loaded_ids.filter(
            function(e) {
                return this.indexOf(e) < 0;
            },
            corrected_ids
        );

        console.log(uncorrected_ids);

        for(var i in uncorrected_ids){
            if (parseInt(this.props.machinedata[uncorrected_ids[i]].Confidence) > temp) {
                console.log('Yeah, once, with a 1');
                console.log(uncorrected_ids[i]);
                temp = parseInt(this.props.machinedata[uncorrected_ids[i]].Confidence);
                res = i;
            }
        }



        console.log('findpoem end');
        return res;
    }

    componentDidMount() {

    }

    //  this.props.machinedata[this.state.poem_id].id

    componentWillMount() {
        this.setState({poem_id: parseInt(this.findPoem())}, () => this.setState({poem_title : this.props.machinedata[this.state.poem_id].id}));
        console.log('findpoem output')
        console.log(this.props.machinedata[this.state.poem_id].id);
        this.setState({poem_title : this.props.machinedata[this.state.poem_id].id});
        console.log(this.state.poem_id);
        console.log(this.state.poem_title);
    }


    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }



    render() {
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
