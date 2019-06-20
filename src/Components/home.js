import React from "react";

class Home extends React.Component {
    render() {
        return (
            <div>
                <h2 className="front_head">Willkommen !</h2>
                <p className="front_text">
                    Dies ist das Classification Correction Helper Interface. Hier können die Fehler des neuronalen Netzes ausgemerzt werden, auf dass es lernt.
                    <br/><br/>
                    Ein Klick auf <i>classifier</i> oben links startet die Korrekturen. Nach Korrektur aller Gedichte wird das Interface bescheid geben.
                    Allerdings können Änderungen auch nachträglich korrigiert werden (in diesem Falle bitte das popup ignorieren).
                    Nebenbei, der <i>classifier</i> beinhaltet ein Balkendiagramm. Falls es nicht sichtbar sein sollte ist die Browserfensterweite zu gering.
                    <br/><br/>
                    <i>Categories</i> zeigt eine Übersicht über die vorhandenenen Kategorien, sowie aller in das Interface geladener Gedichte.
                    Die Ansicht beinhaltet darüber hinaus die Optionen Kategorien hinzuzufügen, umzubenennen und (rudimentär) zu löschen.
                    Außerdem können von dort aus einzelne Gedichte zur Korrektur angesteuert werden.
                    <br/><br/>
                    Diese Seite wurde von Jasper E. gebaut, alle Beschwerden bitte an <a href="mailto:2elbesha@informatik.uni-hamburg.de">ihn</a>.
                </p>



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
                    This page was built by Jasper E. , all complaints should go to <a href="mailto:2elbesha@informatik.uni-hamburg.de">him</a>
                </p>
            </div>
        );
    }
}

export default Home;