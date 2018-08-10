import React, { Component } from 'react';
import './App.css';
import soundBank from './soundBank';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: 1,
      playing: '...',
    };
    soundBank.forEach(k => (this[k.keyVal] = React.createRef()));
    this.selectBank = this.selectBank.bind(this);
    this.playSound = this.playSound.bind(this);
    this.keyPlay = this.keyPlay.bind(this);
  }
  playSound(k) {
    this.setState({ playing: this.state.bank === 1 ? k.id1 : k.id2 });
    const sound = this[k.keyVal].current;
    sound.currentTime = 0;
    sound.play();
  }
  keyPlay(e) {
    soundBank.forEach((k, i) => {
      if (e.keyCode === soundBank[i].keyCode) {
        const button = document.getElementById(this.state.bank === 1 ? k.id1 : k.id2);
        button.focus();
        return this.playSound(k);
      }
    });
    if (e.keyCode === 32) {
      return this.selectBank();
    }
  }
  selectBank() {
    this.setState({ bank: this.state.bank === 1 ? 2 : 1, playing: '...' });
  }
  componentWillMount() {
    window.addEventListener('keyup', this.keyPlay);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyPlay);
  }
  render() {
    const soundPad = soundBank.map((k, i) => (
      <button
        className="drum-pad"
        id={this.state.bank === 1 ? k.id1 : k.id2}
        key={i}
        onClick={() => this.playSound(k)}
      >
        {k.keyVal}
        <audio
          className="clip"
          id={k.keyVal}
          ref={this[k.keyVal]}
          src={this.state.bank === 1 ? k.link1 : k.link2}
        >
          Your browser does not support the <code>audio</code> element.
        </audio>
      </button>
    ));

    return (
      <div className="app">
        <header>
          <h1>Drum Machine</h1>
        </header>
        <main id="drum-machine">
          <section className="soundPad">{soundPad}</section>
          <section id="display">
            <h2>Now Playing:</h2>
            <h1 className="text">{this.state.playing}</h1>
          </section>
          <section className="bank">
            <button
              className={this.state.bank === 1 ? 'pressed' : ''}
              onClick={this.state.bank === 2 ? this.selectBank : null}
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            >
              1
            </button>
            <button
              className={this.state.bank === 2 ? 'pressed' : ''}
              onClick={this.state.bank === 1 ? this.selectBank : null}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              2
            </button>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
