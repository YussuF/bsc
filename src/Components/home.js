import React from "react";

class Home extends React.Component {
    render() {
        return (
            <div>
                <h2 className="front_head">Welcome !</h2>
                <p className="front_text">
                    This is the Classification Correction Helper Interface.
                    Here you can correct the neural net's wrongdoings.
                    <br/><br/>
                    By clicking on <i>classifier</i> in the upper left, you start the correction.
                    Once you corrected all poems the interface will give you an alert.
                    However, you can still edit your inputs by just continuing correcting (just ignore the alert in that case).<br/>
                    By the way, there's a bar chart on <i>classifier</i>. If you can't see it, your browser width is too small.
                    <br/><br/>
                    By clicking on <i>categories</i>, you can get an overview of the categories, as well as all loaded poems in this interface.
                    There you have the option to add and remove categories, as well as to change the classifications of self-selected poems.
                    <br/><br/>
                    This page was built by jasper E. , all complaints should go to <a href="mailto:2elbesha@informatik.uni-hamburg.de">Him</a>
                </p>
            </div>
        );
    }
}

export default Home;