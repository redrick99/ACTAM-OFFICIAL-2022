import * as Tone from 'tone'
import Instrument from './Instrument';

/**
 * IIFE - Singleton
 * Handles everything that has to do with MIDI interaction (playing notes, mostly)
 */
const midiHandler = (function() {
    // Array containing currently on notes to pass onto the GUI
    let playedNotes = [];
    // Array containing frequencies mapped to MIDI notes
    const frequencies = [];
    for (let i = 0; i < 128; i++) {
        frequencies[i] = Tone.Frequency(i, "midi").toFrequency();
    }
    // Instrument used to play notes
    const instrument = new Instrument();
    // Boolean to check if a MIDI controller is connected
    let midiConnected = false;
    // Function to call to change the GUI when a note is played
    let notesChange = (notes) => null;

    /**
     * Called on startup to map MIDI events to functions
     * @param {object} midiAccess 
     */
    function success(midiAccess) {
        midiAccess.addEventListener('statechange', updateDevices);
    
        const inputs = midiAccess.inputs;
        console.log(inputs);
        if(inputs.size > 0) {
            midiConnected = true;
        }
    
        inputs.forEach((input) => {
            input.addEventListener('midimessage', handleInput);
        });
    }

    /**
     * Called on startup when MIDI fails to connect
     */
    function failure() {
        console.log("ERROR: Could not connect MIDI")
    }

    /**
     * Prints all available MIDI devices on the browser's console
     * @param {event} event 
     */
    function updateDevices(event) {
        console.log(event);
    }

    /**
     * Called on noteOn MIDI events.
     * Plays a note
     * @param {number} note MIDI integer of the note
     * @param {number} velocity of the note coming from the controller
     */
    function noteOn(note, velocity) {
        playedNotes = [...playedNotes];
        playedNotes.push(note);
        notesChange(playedNotes);
        instrument.playNote(frequencies[note], velocity);
    }

    /**
     * Called on noteOff MIDI events.
     * Triggers release of a note
     * @param {number} note MIDI integer of the note
     */
    function noteOff(note) {
        playedNotes = playedNotes.filter(item => item != note);
        notesChange(playedNotes);
        instrument.stop(frequencies[note]);
    }

    /**
     * Handles MIDI input messages
     * @param {object} input 
     */
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

    /**
     * Public functions
     */
    return {
        /**
         * Initializes MIDI interaction
         */
        init: function() {
            if(navigator.requestMIDIAccess) {
                navigator.requestMIDIAccess().then(success, failure);
            }
        },
        /**
         * Connects the volume node of the instrument to a master node
         * @param {node} node to connect to
         */
        connect: function(node) {
            instrument.connect(node);
        },
        /**
         * Returns the instrument to change its properties
         * @returns the instrument
         */
        getInstrument: function() {
            return instrument;
        },
        /**
         * Getter for midiConnected
         * Needed on GUI side to change the MIDI led's color
         * @returns midiConnected
         */
        isMidiConnected: function() {
            return midiConnected;
        },
        /**
         * Sets the function to callback when MIDI messages are received
         * @param {function} notesChangeFunction callback function
         */
        setNoteChangeFunction: function(notesChangeFunction) {
            notesChange = notesChangeFunction;
        },
    }
})();

export default midiHandler;