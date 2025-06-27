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
    intervalId = null;
    lastSoundTime = null; // For profiling
    HighestTime = 0; // For profiling
    LowestTime = 0; // For profiling
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
        this.index = 0;
        this.nextTick = performance.now();
        this.tick();
    }
    tick = () => {
        if (!this.running) return;

        const now = performance.now();
        if (now >= this.nextTick) {
            this.playSound(); 
            this.nextTick += this.time;

            // Ajute por retraso
            if (now > this.nextTick + this.time) {
                this.nextTick = now + this.time;
            }
        }
        this.timerId = setTimeout(this.tick, 1); 
    };

    playSound() {
        const now = performance.now();
        // Profiling: measure time between sounds
        if (this.lastSoundTime !== null) {
            if (now - this.lastSoundTime > this.HighestTime) {
                this.HighestTime = now - this.lastSoundTime;
                console.log(`New highest time: ${this.HighestTime.toFixed(2)} ms`);
            }
            if (this.LowestTime === 0 || now - this.lastSoundTime < this.LowestTime) {
                this.LowestTime = now - this.lastSoundTime;
                console.log(`New lowest time: ${this.LowestTime.toFixed(2)} ms`);
            }
            const interval = now - this.lastSoundTime;
            console.log(`Interval since last sound: ${interval.toFixed(2)} ms`);
        }
        this.lastSoundTime = now;

        console.log("Time " + now);
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
        clearTimeout(this.timerId);
        this.timerId = null;
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