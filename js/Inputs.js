const playBtn = document.getElementById("start-playing");
let metronome = new Metronome();
let metronomeView = new MetronomeView();
metronome.setView(metronomeView);
playBtn.onclick =
    function () {
        metronome.running = !metronome.running;
        if (metronome.isRunning()) {
            metronome.run();
            $('#start-playing').text("Pause");
        } else {
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

const numberInput = document.getElementById('my-number-input');
function checkInput() {
    const value = parseInt(numberInput.value);
    if (isNaN(value) || value < 1 || value > 500) {
        alert("Please enter a number between 1 and 500");
        numberInput.value="120";
    }else{
        metronome.setBpm(value);
    }
}