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

    hasxml = (title) => {
        if(this.props.textdata[title].xml){
            return this.createLink(title);
        }
       else {
            return this.noxml(title);
        }
    }

    createLink = (title) => {
        for (var key in this.props.textdata[this.props.poem_title].xml){
            if(this.props.textdata[this.props.poem_title].xml[key]["DC.source"])
                var link = this.props.textdata[this.props.poem_title].xml[key]["DC.source"];
        }
        return <div className="poem_link"><a href={link}>Link to the Lyrikline-Page of this poem. </a><p>(Not working right now, the xml-data from the poem folders is wrong.)</p> </div>;
    }

    noxml = (title) => {
        return <div className="poem_link"><p>Unfortunately, no xml files could be found to provide a link or an audio</p></div>
    }

    componentDidMount() {

    }

    createAudioPlayer(title){
        for (var key in this.props.textdata[this.props.poem_title].xml){
            if(this.props.textdata[this.props.poem_title].xml[key]["DC.source.audio"])
                var link = this.props.textdata[this.props.poem_title].xml[key]["DC.source.audio"];
        }
        return <ReactAudioPlayer
            src={link}
            controls
        />
    }


    render(){
        return (
            <div className="poem-wrap">
                <div className="poem">
                    <h3>{this.props.poem_title}</h3>
                    {this.hasxml(this.props.poem_title)}
                    <table className="Poem_table">
                        <tbody>
                            {this.createPoemTable()}
                        </tbody>
                    </table>
                </div>
                {this.createAudioPlayer(this.props.poem_title)}
            </div>
        );
    }
}

export default Poem;