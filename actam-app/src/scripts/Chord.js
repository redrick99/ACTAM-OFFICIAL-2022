class Chord {
    constructor(fundamental, array, duration, name) {
        this.fundamental = fundamental;
        this.array = array;
        this.duration = duration;
        this.score = this.#calculateScore(duration, array, fundamental);
        this.name = name;
    }

    #calculateScore(duration, array, fundamental) {
        return 0;
    }
}

export default Chord;