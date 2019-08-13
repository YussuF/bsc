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
            old_id:0
        };
    }





    findPoem = () => {

        var temp = 0.0;
        var res = 0;
        var corrected_ids = [];
        for (var k in this.props.correctiondata){
            corrected_ids.push(this.props.correctiondata[k].output.poem_id);
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

        for(var j in this.props.machinedata){
            if (this.props.machinedata[j].confidence > temp){
                if(!(corrected_ids.includes(this.props.machinedata[j].id))){

                    temp = this.props.machinedata[j].confidence;
                    res = this.props.machinedata[j].id;
                    console.log('hier' + temp + 'und' + res);
                    var old_id = j;
                    this.setState({
                        old_id: old_id
                    }, () => {

                    });
                }

            }
        }

        return res;
    }


    componentDidMount() {

        console.log(this.props)

        if(this.isEmpty(this.props.location.state)){

            this.setState({poem_id: this.findPoem()}, () => {this.checkavailability(); this.setState({poem_title: this.props.machinedata[this.state.old_id].id})} );

        }
        else{
            this.setState({poem_id: this.props.location.state.poem_id2}, () => this.setState({poem_title: this.props.machinedata[this.state.poem_id].id}));
        }

        console.log(this.state.correctiondata)


    }

    checkavailability(){
        this.setState({poem_title : this.props.machinedata[this.state.old_id].id})
        if(!this.state.poems_available)alert('All Poems corrected');
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
                        <Output machinedata={this.props.machinedata} old_id={this.state.old_id} poem_id={this.state.poem_id} />
                    </div>
                    <div className="middle">
                        <Poem textdata={this.props.textdata}  poem_title={this.state.poem_title}/>
                    </div>
                    <div className="right">
                        <Input machinedata={this.props.machinedata} old_id={this.state.old_id} categorydata={this.props.categorydata} poem_id={this.state.poem_id} />
                    </div>
                </div>
            </div>
        );
    }
}



export default Classifier;
