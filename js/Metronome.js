class Metronome {
    index = 0;
    bpm = 120;
    time = 500;
    running = false;
    notesNumber = 4;
    noteType = 4;
    noteAccent = -1;
    metronomeView = null;
    normalSound = new Audio('resources/metronome_piano.wav');
    accentSound = new Audio('resources/metronome_forte.wav');
    intervalId;
    isRunning() {
        return this.running;
    }

    setNoteType(noteType) {
        if (this.noteType != noteType) {
            this.noteType = noteType;
            this.calculateTime();
            this.index = 0;
        }
    }

    setNotesNumber(noteNumber) {
        this.notesNumber = noteNumber;
        this.index = 0;
    }
    setView(metronomeView) {
        this.metronomeView = metronomeView;
    }
    run() {
        this.running = true;
        this.intervalId = setInterval(() => {
            if (this.running) {
                this.playSound();
            } else {
                clearInterval(this.intervalId);
            }
        }, this.time);
    }

    playSound() {
        console.log("Time " + performance.now());
        const noteNumber = this.index % this.notesNumber;
        metronomeView.setNoteIndex(noteNumber);
        if (noteNumber == this.noteAccent) {
            this.accentSound.currentTime = 0;
            this.accentSound.play();
        } else {
            this.normalSound.currentTime = 0;
            this.normalSound.play();
        }
        this.index++;
    };

    pause() {
        this.running = false;
        this.intervalId = null;
    }

    setBpm(bpm) {
        if (bpm > 500 || bpm < 1) {
            throw new Error("BPM out of bounds");
        }
        if (this.bpm != bpm) {
            this.bpm = bpm;
            this.calculateTime();
        }
    }

    calculateTime() {
        if (this.noteType != 4) {
            this.time = Math.round((60000 / this.bpm) / (this.noteType / 4));
        } else {
            this.time = Math.round(60000 / this.bpm);
        }
        console.log("new time: " + this.time);
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.run();
        }

    }

    setNoteAccent(noteAccent) {
        this.noteAccent = noteAccent;
    }
}