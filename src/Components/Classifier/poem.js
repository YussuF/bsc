import React from "react";
import ReactAudioPlayer from "react-audio-player";


//poem takes care of the middle part of the classifier site, namely the poem text itself. Lines of the poem come from datamock.json.



class Poem extends React.Component {




    createPoemTable = () => {
        let table = []
        for (var key in this.props.textdata[this.props.poem_title].lines) {
            let children = []
            children.push(this.props.textdata[this.props.poem_title].lines[key].line)
            table.push(<tr key={key}>{children}</tr>)
        }
        return table
    }



    render(){
        return (
            <div className="poem-wrap">
                <div className="poem">
                    <h3>{this.props.poem_title}</h3>
                    <table className="Poem_table">
                        <tbody>
                            {this.createPoemTable()}
                        </tbody>
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