import React from "react";


class Input extends React.Component {
    render(){
        return (
            <div className="corrector">
                <p>Diese Angabe ist</p>
                {/*<input type="radio" className="cor_correct">Korrekt</input>
			<br></br>
			<p>Falsch, bei diesem Gedicht handelt es sich um </p>
			<input type="radio" className="cor_alt1">Variabler Versfuß</input>
			<input type="radio" className="cor_alt1">gehobenes Enjambement</input>
			<input type="radio" className="cor_alt1">unebetontes Enjambement</input>
			<input type="radio" className="cor_alt1">lettristische Dekomposition</input>
			<input type="radio" className="cor_alt1">syntaktische Dekomposition</input>*/}
                <input type="radio" value="option1" checked={true} />Korrekt <br/>
                <p> Falsch, es handelt sich um ein(e/en)</p>
                <input type="radio" value="option1" checked={false} />Variabler Versfuß<br/>
                <input type="radio" value="option1" checked={false} />gehobenes Enjambement<br/>
                <input type="radio" value="option1" checked={false} />unbetontes Enjambement<br/>
                <input type="radio" value="option1" checked={false} />lettristische Dekomposition <br/>
                <input type="radio" value="option1" checked={false} />syntaktische Dekomposition
                <button style={{float:"right", margin:"0 0 200px 0"}}>Nächstes Gedicht</button>
            </div>
        );
    }
}


export default Input;