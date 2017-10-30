import React from 'react';
import Dict from '../dictionary.json';
import KeyBoard from 'keyboard-handler';
import './Guesser.css';

class Guesser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            word: '',
            reg: '',
            round: 0,
            result: []
        };

        KeyBoard.keyPressed((e) => {
            if(this.state.round > 0 && this.state.word !== this.state.reg)
                this.guess(String.fromCharCode(e.which).toLowerCase());
        });

        this.startGame = this.startGame.bind(this);
    }

    startGame() {
        let index = Math.floor(Math.random() * (Dict.length - 1));
        let word = Dict[index];
        let reg = '';

        console.log(word);

        for(let i = 0; i < word.length; i++) {
            if(i % 3 === 0)
                reg += '*';
            else
                reg += word.charAt(i);
        }

        this.setState({
            word: word,
            reg: reg,
            round: 10,
            result: ['=============== Game start =============== ']
        });
    }

    guess(char) {
        let word = this.state.word;
        let reg = this.state.reg;
        let result = this.state.result;

        result.push('Round ' + this.state.round);

        for(let i = 0; i < word.length; i++) {
            if(word.charAt(i) === char) {
                reg = reg.substr(0, i) + char + reg.substr(i+1);

                result.push(char + ' hitted');
            }
        }

        result.push(char + ' tried, current ' + reg);

        this.setState({
            reg: reg,
            round: this.state.round - 1,
            result: result
        });
    }

    render() {
        const result_list = this.state.result.map(
            function (result) {
                return (
                    <div key={Math.random()}>
                        {result}
                    </div>
                );
            }
        );

        let msg = '';

        if(this.state.round === 0) {
            if(this.state.word) {
                msg = 'Fail';
            } else {
                msg = 'Click to start';
            }
        } else if(this.state.reg === this.state.word){
            msg = 'Win';
        } else {
            msg = this.state.round + ' steps left';
        }

        return (
            <div>
                <br/><br/><br/>

                <div className="row">
                    <h1 className="center-align">
                        {this.state.reg}
                    </h1>
                </div>

                <div className="row">
                    <h5 className="center-align">{msg}</h5>
                </div>

                <div className="row">
                    <a className="col s12 waves-effect waves-light btn-large" onClick={this.startGame}>
                        Start
                    </a>
                </div>

                <div className="row">
                    <div className="card">
                        {result_list}
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Guesser;