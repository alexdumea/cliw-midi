document.addEventListener("DOMContentLoaded", function(){

    //Frequencies list for piano
    const frequencies = [
        ["rest", 0],
        ["b3", 233.08],
        ["c4", 261.63],
        ["db4", 277.18],
        ["d4", 293.66],
        ["eb4", 311.13],
        ["e4", 329.63],
        ["f4", 349.23],
        ["gb4", 369.99],
        ["g4", 392.00],
        ["ab4", 415.30],
        ["a4", 440.00],
        ["bb4", 466.16],
        ["b4", 493.88],
        ["c5", 523.25],
        ["db5", 554.37],
        ["d5", 587.33],
        ["eb5", 622.25],
        ["e5", 659.25],
        ["f5", 698.46],
        ["gb5", 739.99],
        ["g5", 783.99],
        ["ab5", 830.61],
        ["a5", 880.00],
        ["bb5", 932.33],
        ["b5", 987.77],
        ["c6", 1046.50],
        ["d6", 1174.66],
        ["e6", 1318.51]
    ];

    const tempoInput = document.querySelector('.tempo');
    const volumeInput = document.querySelector('.volume');
    const blackKey = Array.from(document.querySelectorAll('.black'));
    const whiteKey = Array.from(document.querySelectorAll('.white'));
    const record = document.querySelector('.record');
    const pause = document.querySelector('.pause');
    const play = document.querySelector('.play');
    const help = document.querySelector('.help');
    const key = Array.from(document.querySelectorAll('.key'));
    let volume = 0.5;
    //Lower value = faster speed
    let tempo = 5;

    //Create new audio context when note played
    function playNote(note, length) {
        const AudioContext = window.AudioContext || window.webkitAudioContext,
            ctx = new AudioContext(),
            oscillator = ctx.createOscillator(),
            gainNode = ctx.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.value = note;
        gainNode.gain.value = volume;
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.start(0);
        //Trying to prevent popping sound on note end
        gainNode.gain.setTargetAtTime(0, length/1000-0.05, 0.08);
        oscillator.stop(ctx.currentTime + (length/1000+0.2));
        oscillator.onended = () => ctx.close();
    }

    //Finds clicked element returns data-note value and runs playKey function
    function onClickPlay(e) {
        let key = 0;
        let length = 400;
        let noteClass = e.target.dataset.note;
        for (let i = 0; i < frequencies.length; i++) {
            if (frequencies[i][0] === noteClass) {
                key = frequencies[i][1];
            }
        }
        addVisual(e.target);
        playNote(key, length);
    }

    //Finds pressed key and returns data-note value
    function keyDownSearch(event) {
        let key = 0;
        let length = 400;
        let keyPressed = document.querySelector(`div[data-key="${event.keyCode}"]`);
        if (keyPressed === null) {
            return;
        }
        let note = keyPressed.dataset.note;
        for (let i = 0; i < frequencies.length; i++) {
            if (frequencies[i][0] === note) {
                key = frequencies[i][1];
            }
        }
        addVisual(keyPressed);
        playNote(key, length);
    }

    //input handlers
    function updateTempo(e){
        tempo = e.target.value;
    }
    function updateVolume(e){
        volume = e.target.value;
    }

    //adds css class when note played
    function addVisual(key, length) {
        key.classList.add('played');
        setTimeout(() => {
            key.classList.remove('played');
        }, length || 400);
    }

    //keyboard information toggle
    let helpOn = true;
    function helpToggle() {
        if (helpOn) {
            blackKey.forEach((key)=>{
                key.style.color = 'rgba(0,0,0,0)';
            });
            whiteKey.forEach((key)=>{
                key.style.color = 'rgba(255,255,255,0)';
            });
            help.classList.remove('on');
            helpOn = !helpOn;
        } else {
            blackKey.forEach((key)=>{
                key.style.color = 'rgba(255,255,255,1)';
            })
            whiteKey.forEach((key)=>{
                key.style.color = 'rgba(0,0,0,1)';
            })
            help.classList.add('on');
            helpOn = !helpOn;
        }
    }

    //event listeners
    help.addEventListener('click', helpToggle);
    key.forEach((key)=>{
        key.addEventListener('click', onClickPlay);
    })
    window.addEventListener('keydown', keyDownSearch);
    tempoInput.addEventListener('change', updateTempo);
    volumeInput.addEventListener('change', updateVolume);

    //Hide keyboard help letters on load
    helpToggle();
});