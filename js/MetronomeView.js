class MetronomeView {
    setNotesNumber(noteNumber) {
        const parentDiv = $('#beats');
        parentDiv.empty();
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