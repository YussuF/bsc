import React from 'react';



export default class Categories extends React.Component {

    createCategoryTable = () => {
        let table = [];
        let header = [];
        header.push(<th>Poem Id</th>);
        header.push(<th>Poem Class</th>);
        header.push(<th>Confidence</th>);
        table.push(header);
        for (var key in this.props.machinedata) {
            let children = [];

                children.push(<td> {this.props.machinedata[key].id} </td>);
                children.push(<td> {this.props.machinedata[key].class} </td>);
                children.push(<td> {this.props.machinedata[key].Confidence} </td>);

            table.push(<tr key={key}>{children}</tr>);
        }
        return table
    }

    createCategoryOverview = () => {
        let table = [];
        let children = [];
        for (var key in this.props.categorydata){
            children.push(<td> {this.props.categorydata[key]}</td>)
        }
        table.push(<tr>{children}</tr>);
        return table
    }

    render(){
        return(
            <div>
                <h3>Categories available at this interface right now: </h3>
                {this.createCategoryOverview()}
                <h3>Poems available at this interface right now: </h3>
                {this.createCategoryTable()}
            </div>
        );
    }
}

