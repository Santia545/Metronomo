const playBtn = document.getElementById("start-playing");
let metronome = new Metronome();
let metronomeView = new MetronomeView();
metronome.setView(metronomeView);
metronome.noteAccent = -1;
playBtn.onclick =
    function () {
        metronome.running = !metronome.running;
        if (metronome.isRunning()) {
            metronome.run();
            $('#start-playing').text("Pause");
        } else {
            metronome.index=0;
            $('#start-playing').text("Play");
        }
    };
const dropdown = document.getElementById('my-dropdown');
dropdown.addEventListener('change', function () {
    const selectedValue = dropdown.value;
    console.log(`Selected value: ${selectedValue}`);
    let timeSignature = selectedValue.split("/");
    let noteNumber = Number(timeSignature[0]);
    let noteType = Number(timeSignature[1]);
    metronomeView.setNotesNumber(noteNumber);
    metronome.setNotesNumber(noteNumber);
    metronome.setNoteType(noteType);
});
$('#my-switch').change(function () {
    if (this.checked) {
        metronome.setNoteAccent(0);
        console.log("Switch is on");
    } else {
        metronome.setNoteAccent(-2);
        console.log("Switch is off");
    }
});

const numberInput = document.getElementById('my-number-input');
function checkInput() {
    const value = parseInt(numberInput.value);
    if (isNaN(value) || value < 1 || value > 500) {
        alert("Please enter a number between 1 and 500");
        numberInput.value = "120";
    } else {
        metronome.setBpm(value);
    }
}