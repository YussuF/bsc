import React from "react";

class distributionitem extends React.Component {
state = {}

    render() {
        const key = this.props.key
        return(

            {this.props.key.map((todo) => (
                    <div>{key}</div>
                ))}
        );
    }
}

export default distributionitem;