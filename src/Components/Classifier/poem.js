import React from "react";
import ReactAudioPlayer from "react-audio-player";

class Poem extends React.Component {
    render(){

        return (
            <div className="poem-wrap">
                <div className="poem">
                    <h3>Head</h3>
                    <p>
                        Body
                    </p>
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