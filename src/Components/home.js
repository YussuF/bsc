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
                    By Clicking on <i>Classifier</i> in the upper right, you start the correction.
                    At the Moment, the <i>Classifier</i> is adjusted to show you the poem-classification with the <b>highest Confidence</b> first.
                    Once you corrected all poems the Interface will give you an alert.
                    However, you can still edit your inputs by just going on correcting (just ignore the alert in that case).<br/>
                    By the way, there's a Bar Chart on <i>Classifier</i>. If you can't see it, your browser width is too small.
                    <br/><br/>
                    By Clicking on <i>Categories</i>, you can get an overview of the categories, as well as all loaded poems in this interface.
                    There you have the option to add and remove Categories, as well as to change the classifications of self-selected poems.
                    <br/><br/>
                    This page was built by jasper E. , all Complaints should go to <a href="mailto:2elbesha@informatik.uni-hamburg.de">Him</a>
                </p>
            </div>
        );
    }
}

export default Home;