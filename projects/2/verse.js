let verses = [];

function ranInt2(min, max)
{
    return Math.random() * (max - min) + min;
}

async function loadVerses()
{
    const response = await fetch('verses.json');
    verses = await response.json();
    scheduleVerse();
}

loadVerses();

function scheduleVerse()
{
    if (verses.length === 0) return;

    const time = Math.random() * 10000 + 5000; // 5–15 seconds
    setTimeout(() => {
        speakRandomVerse();
        scheduleVerse(); // schedule next one
    }, time);
}

function speakRandomVerse()
{
    const verse = verses[Math.floor(Math.random() * verses.length)];

    // Web Speech API thing I found online
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const dest = audioCtx.createMediaStreamDestination();
    const utterance = new SpeechSynthesisUtterance(verse.text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.5;
    utterance.voice = getAlienVoice();
    speechSynthesis.speak(utterance);

    const verseDisplay = document.getElementById("verseDisplay");
    verseDisplay.style.rotate = ranInt2(-45, 45) + "deg";
    const x = Math.random() * (window.innerWidth - verseDisplay.clientWidth);
    const y = Math.random() * (window.innerHeight - verseDisplay.clientHeight);

    verseDisplay.style.left = `${x}px`;
    verseDisplay.style.top = `${y}px`;
    verseDisplay.innerHTML = `${verse.text} <br><span style="font-size:0.8em; color:#aaa;">${verse.reference}</span>`;

    // Fade out over 5 seconds
    verseDisplay.style.opacity = '1';
    const fadeDuration = 5000;
    const fadeStart = Date.now();
    function fade()
    {
        const elapsed = Date.now() - fadeStart;
        if (elapsed < fadeDuration)
        {
            verseDisplay.style.opacity = (1 - elapsed / fadeDuration).toString();
            requestAnimationFrame(fade);
        }
        else verseDisplay.style.opacity = '0';
    }
    fade();
}
function getAlienVoice() {
    const voices = speechSynthesis.getVoices();
    // Example: pick a voice that is not your default English one
    const alienVoice = voices.find(v => v.lang.includes('en') && !v.default);
    return alienVoice || voices[0];
}