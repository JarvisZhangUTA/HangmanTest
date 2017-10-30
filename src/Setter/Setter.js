import React from 'react';
import Dict from '../dictionary.json';
import Cand from '../candidate.json';
import './Setter.css';

class Setter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            word:'',
            result: [],
            success: 0,
            fail: 0
        };

        this.result = [];
        this.success = 0;
        this.fail = 0;
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ 
            result: this.result,
            success: this.success,
            fail: this.fail
         }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

        return (
            <div>
                <br/><br/><br/>

                <div className="row">
                    <input className="col s3" placeholder="Word" type="text"
                        onChange = {(e)=>{this.setState({word: e.target.value})}}
                    />

                    <a className="col s2 waves-effect waves-light btn" 
                        onClick={() => this.startGame(this.state.word)}>
                        Start
                    </a>
                    <a className="col offset-s1 s2 waves-effect waves-light btn" 
                        onClick={() => this.random(1)}>
                        Random 1
                    </a>
                    <a className="col s2 waves-effec waves-light btn" 
                        onClick={() => this.random(10)}>
                        Random 10
                    </a>
                </div>

                <div className="row">
                    <div className="chip">Success: {this.state.success}</div>
                    <div className="chip">Fail: {this.state.fail}</div>
                    <div className="chip">
                        Hit rate: {  this.state.success/(this.state.success + this.state.fail) }
                    </div>
                </div>

                <div className="row">
                    <div className="card">
                        {result_list}
                    </div>
                </div>
            </div>
        );
    }

    random(times) {
        for(let i = 0; i < times; i++) {
            console.log(i);

            let index = Math.floor(Math.random() * (Dict.length - 1));
            let word = Dict[index];

            this.result.push('===============================');
            this.result.push('Round ' + (i+1));
            this.result.push('start guess ' + word);

            this.startGame(word);
        }
    }

    startGame(word) {

        this.dictionary = Dict.concat();
        this.candidate = Cand.concat();

        let reg = '';
        for(let i = 0; i < word.length; i++) {
            reg += '*';
        }
        this.reg = reg;

        for(let i = 0; i < 10; i++) {
            const cur = this.guess();

            let candidate = this.candidate;
            const index = candidate.findIndex(obj => obj.char === cur);
            if(index !== -1){
                candidate.splice(index, 1);
            }

            let reg = this.reg;
            for(let j = 0; j < word.length; j++) {
                if(word.charAt(j) === cur){
                    reg = reg.substr(0, j) + cur + reg.substr(j+1);
                }
            }
            
            this.candidate = candidate;
            this.reg = reg;

            this.result.push('times ' + (i+1) + ': try ' + cur);
            // this.result.push('current ' + this.reg);

            if(this.reg === word){
                this.success += 1;
                this.result.push('success');
                return;
            }
        }

        this.result.push('fail');
        this.fail += 1;
    }

    guess() {
        const reg = this.reg;
        const candidate = this.candidate;

        let char = 'a';
        let times = 0;
        
        for(let i = this.dictionary.length -1; i >= 0; i--) {
            if(!this.match(reg, this.dictionary[i])){
                this.dictionary.splice(i, 1);
            } else {
                const word = this.dictionary[i];
                for(let j = 0; j < word.length; j++) {
                    const index = candidate.findIndex(obj => obj.char === word.charAt(j));
                    if(index !== -1){
                        candidate[index].times += 1;

                        if(candidate[index].times > times) {
                            char = word.charAt(j);
                            times = candidate[index].times;
                        }
                    }
                }
            }
        }

        return char;
    }

    match(reg, word) {

        if(word === undefined){
            return false;
        }

        if(reg.length !== word.length){
            return false;
        }

        for(let i = 0; i < word.length; i++) {
            if(reg.charAt(i) !== '*' && reg.charAt(i) !== word.charAt(i)){
                return false;
            }
        }

        return true;
    }
}

export default Setter;