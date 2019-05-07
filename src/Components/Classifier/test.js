import React from "react";

class Output extends React.Component {
state = {
    distribution : []
}




    delTodo = (id) => {

//            { todos: [...this.state.todos.filter(todo => todo.id !== id)] }
        //return this.props.todos.map((todo) => (
        // <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo} />
    }

    render(){
        for (var key in this.props.machinedata[0].distribution) {
            this.state.distribution.push(key);
            this.state.distribution.push(this.props.machinedata[0].distribution[key]);
        }
        console.log('---1--------');
        console.log(...this.props.machinedata);
        console.log('---2--------');
        console.log(...this.props.machinedata.map(id =>
            id.distribution));
        console.log('----3------');
        console.log(Object.values(this.props.machinedata[0].distribution).map((propKey) => propKey));
        console.log(Object.keys(this.props.machinedata[0].distribution))
        return(

            <div className="classifier_output">
                <p>Dieses Gedicht wurde mit <u>{this.props.machinedata[0].Confidence}% Confidence</u> als <b>Parlando</b> klassifiziert.
                    Weitere Konfidenzen </p>
                <ul>
                    {this.state.distribution.map((test) => (
                        <li>{test}</li>
                        ))
                       //Object.values(this.props.machinedata[0].distribution);
                    }

                    for(key in Object.keys(this.props.machinedata[0].distribution)){
                        <div>test</div>
                    }

                    }         {Object.keys(this.props.machinedata[0].distribution).map( (propKey) => {
                    propKe


                    })}



                    <li> <b>82 %</b> Variabler Versfuß</li>
                    <li> <b>76 %</b> unebetontes Enjambement</li>
                    <li> <b>64 %</b> lettristische Dekomposition</li>
                    <li> <b>63 %</b> gehobenes Enjambement</li>

                </ul>
            </div>
        );
    }
}
export default Output;