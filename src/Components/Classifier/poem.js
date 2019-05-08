import React from "react";
import ReactAudioPlayer from "react-audio-player";

class Poem extends React.Component {




    createPoemTable = () => {
        let table = []

        // Outer loop to create parent
        for (var key in this.props.textdata["teils-teils"].lines) {
            let children = []
            children.push(this.props.textdata["teils-teils"].lines[key].line)

            //Create the parent and add the children
            table.push(<tr>{children}</tr>)
        }
        return table
    }



    render(){
        console.log(this.props.textdata["teils-teils"].lines[0].line)
        return (
            <div className="poem-wrap">
                <div className="poem">
                    <h3>Teils-Teils</h3>
                    <table className="Poem_table">
                        {this.createPoemTable()}
                    </table>
                </div>
                <ReactAudioPlayer
                    src="/sound/53.mp3"
                    controls
                />
            </div>
        );
    }
}

export default Poem;