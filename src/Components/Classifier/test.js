import React from "react";

class Output extends React.Component {
state = {
    distribution : [],
    i:0
}



    createConfidenceTable = () => {
        let table = []

        // Outer loop to create parent
        for (var key in this.props.machinedata[0].distribution) {
            let children = []
            console.log(key);
            this.state.distribution.push(key)
            console.log(this.props.machinedata[0].distribution[key]);

            children.push(this.props.machinedata[0].distribution[key])
            children.push(' %  ')
            children.push(key)
            //Create the parent and add the children
            table.push(<tr>{children}</tr>)
        }
        return table
    }


    delTodo = (id) => {

//            { todos: [...this.state.todos.filter(todo => todo.id !== id)] }
        //return this.props.todos.map((todo) => (
        // <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo} />
    }

    render(){
        return(

            <div className="classifier_output">
                <p>Dieses Gedicht wurde mit <u>{this.props.machinedata[0].Confidence}% Confidence</u> als <b>Parlando</b> klassifiziert.
                    Weitere Konfidenzen </p>


                    <table className="Confidence_table">
                        {this.createConfidenceTable()}
                    </table>

            </div>
        );
    }
}
export default Output;