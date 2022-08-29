import * as Tone from 'tone'
import Instrument from './Instrument';

const midiHandler = (function() {
    const frequencies = [];
    const instrument = new Instrument();
    for (let i = 0; i < 128; i++) {
        frequencies[i] = Tone.Frequency(i, "midi").toFrequency();
    }

    function success(midiAccess) {
        midiAccess.addEventListener('statechange', updateDevices);
    
        const inputs = midiAccess.inputs;
    
        inputs.forEach((input) => {
            input.addEventListener('midimessage', handleInput);
        });
    }

    function failure() {
        console.log("ERROR: Could not connect MIDI")
    }

    function updateDevices(event) {
        console.log(event);
    }

    function noteOn(note, velocity) {
        instrument.playNote(frequencies[note], velocity);
    }

    function noteOff(note) {
        instrument.stop(frequencies[note]);
    }

    function handleInput(input) {
        const command = input.data[0];
        const note = input.data[1];
        const velocity = input.data[2]/127;
    
        switch(command) {
            case 158: // noteOn
            if(velocity > 0) {
                noteOn(note, velocity);
            } else {
                noteOff(note);
            }
            break;
    
            case 142: //noteOff
            noteOff(note);
            break;
        }
    }

    return {
        init: function() {
            if(navigator.requestMIDIAccess) {
                navigator.requestMIDIAccess().then(success, failure);
            }
        },
        connect: function(node) {
            instrument.connect(node);
        },
        getInstrument: function() {
            return instrument;
        }
    }
})();

export default midiHandler;