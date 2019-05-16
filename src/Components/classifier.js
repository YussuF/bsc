import React from 'react';
import Poem from './Classifier/poem.js';
import Input from './Classifier/input.js';
import Output from './Classifier/test.js';


//Classifier is the Wrapper for the classifier site, loading all jsons needed. Possibly this has to be moved to index.js once the poem is rendered dynamically and not hardcoded.




class Classifier extends React.Component {
state ={
    poem_id: 0,
    poem_title: '',
}

    findPoem = () => {
        var temp = 0;
        var res = 42;
        for (var key in this.props.machinedata) {
            if(this.isEmpty(this.props.correctiondata)){
                if (parseInt(this.props.machinedata[key].Confidence) > temp) {

                    temp = parseInt(this.props.machinedata[key].Confidence);
                    res = key;
                }
            }
            else {
                for (var k in this.props.correctiondata) {
                    console.log('yay');
                    if (parseInt(this.props.correctiondata[k].output.poem_id) === parseInt(key)) {
                        console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
                    } else if (parseInt(this.props.machinedata[key].Confidence) > temp) {

                        temp = parseInt(this.props.machinedata[key].Confidence);
                        res = key;
                    }
                }
            }

        }
        console.log(res);

        this.setState({poem_id: res})
        this.setState({poem_title : 'Yay'});
        return res;
    }

    componentDidMount() {

    }

    componentWillMount() {
        this.findPoem();
        this.setState({poem_title : this.props.machinedata[this.state.poem_id].id});
        console.log(this.props.machinedata[this.state.poem_id].id);
        console.log('teils-teils');
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
