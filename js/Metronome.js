class Metronome {
    index = 0;
    bpm = 120;
    time = 500;
    running = false;
    notesNumber = 4;
    noteType = 4;
    noteAccent = 0;
    metronomeView = null;
    isRunning() {
        return this.running;
    }

    setNoteType(noteType) {
        if (this.noteType != noteType) {
            this.noteType = noteType;
            this.calculateTime();
            this.index=-1;
        }
    }

    setNotesNumber(noteNumber) {
        this.notesNumber = noteNumber;
        this.index=-1;
    }
    setView(metronomeView) {
        this.metronomeView = metronomeView;
    }
    run() {
        const normalSound = new Audio('resources/metronome_piano.wav');
        const accentSound = new Audio('resources/metronome_forte.wav');

        this.running = true;
        const playSound = () => {
            const noteNumber = this.index % this.notesNumber;
            this.metronomeView.setNoteIndex(noteNumber);
            if (noteNumber == this.noteAccent) {
                accentSound.currentTime = 0;
                accentSound.play();
            } else {
                normalSound.currentTime = 0;
                normalSound.play();
            }
            console.log("Time " + Date.now() + " " + this.index);
            setTimeout(() => {
                this.index++;
                if (this.running) {
                    playSound();
                }
            }, this.time);

        };
        setTimeout(playSound, 0);
    }


    pause() {
        running = false;
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

    }

    setNoteAccent(noteAccent) {
        this.noteAccent = noteAccent;
    }
}