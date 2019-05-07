import React from "react";

class Output extends React.Component {
    render(){

        return(
            <div className="classifier_output">
                <p>Dieses Gedicht wurde mit <u>95% Confidence</u> als <b>Parlando</b> klassifiziert.
                    Weitere Konfidenzen </p>
                <ul>
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