import React from 'react';
import Poem from './Classifier/poem.js';
import Input from './Classifier/input.js';
import Output from './Classifier/test.js';


//Classifier is the Wrapper for the classifier site, loading all jsons needed. Possibly this has to be moved to index.js once the poem is rendered dynamically and not hardcoded.




class Classifier extends React.Component {


    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            poem_id: 0,
            poem_title: 'teils-teils',
            poems_available: true,
        };
    }





    findPoem = () => {

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

        if (this.isEmpty(uncorrected_ids)){
            this.setState({
                poems_available: false,
            })
        }


        for(var i in uncorrected_ids){
            if (parseInt(this.props.machinedata[uncorrected_ids[i]].Confidence) > temp) {
                temp = parseInt(this.props.machinedata[uncorrected_ids[i]].Confidence);
                res = uncorrected_ids[i];
            }
        }
        return parseInt(res);
    }



    //  this.props.machinedata[this.state.poem_id].id

    componentDidMount() {
        this.setState({poem_id: parseInt(this.findPoem())}, () => this.setState({poem_title : this.props.machinedata[this.state.poem_id].id}));
        this.setState({poem_title : this.props.machinedata[this.state.poem_id].id});
        //if(this.state.poems_available)alert('All Poems corrected');
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
