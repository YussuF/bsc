import React from "react";

{/*
    This is the renamed Output.js for reasons unknown. It takes care of the left-hand side of the classifier site, namely the confidence table.
    The Table is created in createConfidenceTable using data passed as props from the calling classifier.js
    TODO : Some styling. The problem of getting the values for any poem instead of a hardcoded one should be in the calling classifier.js and not here, but im not sure rn.

*/}

class Output extends React.Component {

    createConfidenceTable = () => {
        let table = []

        // Outer loop to create parent
        for (var key in this.props.machinedata[0].distribution) {
            let children = []
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