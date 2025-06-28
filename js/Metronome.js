class Metronome {
    index = 0;
    bpm = 120;
    time = 500;
    running = false;
    notesNumber = 4;
    noteType = 4;
    noteAccent = -1;
    metronomeView = null;
    audioContext = null;
    normalBuffer = null;
    accentBuffer = null;
    schedulerId = null;
    scheduleAheadTime = 0.1; // seconds
    nextNoteTime = 0;
    lastScheduledTime = null; // For profiling
    maxIntervalMs = 0; // Maximum interval between scheduled sounds
    minIntervalMs = null; // Minimum interval between scheduled sounds

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
    async loadSounds() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const loadBuffer = async (url) => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return await this.audioContext.decodeAudioData(arrayBuffer);
        };
        this.normalBuffer = await loadBuffer('resources/metronome_piano.wav');
        this.accentBuffer = await loadBuffer('resources/metronome_forte.wav');
    }

    async run() {
        if (!this.audioContext) await this.loadSounds();
        this.running = true;
        this.index = 0;
        this.nextNoteTime = this.audioContext.currentTime + 0.05;
        this.scheduler();
    }

    scheduler = () => {
        if (!this.running) return;
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            this.scheduleTick(this.index, this.nextNoteTime);
            this.nextNoteTime += this.time / 1000;
            this.index++;
        }
        this.schedulerId = setTimeout(this.scheduler, 25);
    };

    scheduleTick(noteIndex, time) {
        // Profiling: log ms between scheduled sounds
        if (this.lastScheduledTime !== null) {
            const intervalMs = (time - this.lastScheduledTime) * 1000;
            console.log(`Interval between scheduled sounds: ${intervalMs.toFixed(2)} ms`);
            if (intervalMs > this.maxIntervalMs) {
                this.maxIntervalMs = intervalMs;
                console.log(`New max interval: ${this.maxIntervalMs.toFixed(2)} ms`);
            }
            if (this.minIntervalMs === null || intervalMs < this.minIntervalMs) {
                this.minIntervalMs = intervalMs;
                console.log(`New min interval: ${this.minIntervalMs.toFixed(2)} ms`);
            }
        }
        this.lastScheduledTime = time;

        const noteNumber = noteIndex % this.notesNumber;
        const buffer = (noteNumber == this.noteAccent) ? this.accentBuffer : this.normalBuffer;
        if (buffer) {
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);
            source.start(time);
            source.onended = () => {
                if (this.metronomeView) this.metronomeView.setNoteIndex(noteNumber);
            }

        }
    }

    pause() {
        this.running = false;
        if (this.schedulerId) clearTimeout(this.schedulerId);
        this.schedulerId = null;
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