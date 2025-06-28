class MetronomeView {
    setNotesNumber(noteNumber) {
        const parentDiv = $('#beats');
        parentDiv.empty();

        const screenWidth = Math.min(window.innerWidth, parentDiv.parent().width() || window.innerWidth);
        const maxWidth = screenWidth * 0.9;
        const gap = screenWidth * 0.01 * (noteNumber - 1);
        const minSize = 28;
        const maxSize = 80;
        let beatSize = Math.floor((maxWidth - gap) / noteNumber);
        beatSize = Math.max(minSize, Math.min(maxSize, beatSize));

        parentDiv.css('--beat-size', `${beatSize}px`);

        for (let index = 0; index < noteNumber; index++) {
            const newBeat = $(`<div class="circular-beat" id="${index}">${index + 1}</div>`);
            parentDiv.append(newBeat);
        }
    }
    setNoteIndex(index) {
        $(".circular-beat-active").toggleClass("circular-beat-active");
        $(`#${index}`).toggleClass("circular-beat-active");
    }
}