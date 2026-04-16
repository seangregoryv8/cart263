import { ranNum } from "./constants.js";
import { allLights } from "./main.js";

let verses = [];

export var isSpeaking = false;

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

    const time = ranNum(5000, 15000); // 5–15 seconds
    setTimeout(() => {
        speakRandomVerse();
        isSpeaking = true;
        scheduleVerse(); // schedule next one
    }, time);
}

function speakRandomVerse()
{
    const verse = verses[Math.floor(Math.random() * verses.length)];

    const utterance = new SpeechSynthesisUtterance(verse.text);
    utterance.lang = 'en-US';
    utterance.rate = ranNum(0.5, 2.0);
    utterance.pitch = ranNum(0.5, 1.5);
    utterance.voice = getAlienVoice();
    utterance.volume = ranNum(0.5, 1.0);
    // speechSynthesis.speak(utterance);

    const verseDisplay = document.getElementById("verseDisplay");
    verseDisplay.style.rotate = ranNum(-15, 15) + "deg";

    const margin = 150;
    let x, y;
    const centreX = window.innerWidth / 2;
    const centreY = window.innerHeight / 2;

    do x = ranNum(margin, window.innerWidth - verseDisplay.clientWidth - margin);
    while (Math.abs(x - centreX) < margin); // avoid center

    do y = ranNum(margin, window.innerHeight - verseDisplay.clientHeight - margin);
    while (Math.abs(y - centreY) < margin); // avoid center
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
            allLights[3].distance = 10 + (verseDisplay.style.opacity * 10);
            requestAnimationFrame(fade);
        }
        else
        {
            isSpeaking = false;
            verseDisplay.style.opacity = '0';
        }
    }
    fade();
}

function getAlienVoice()
{
    const voices = speechSynthesis.getVoices();
    const alienVoices = voices.filter(v => v.lang.includes('en') && !v.default);
    return alienVoices[Math.floor(Math.random() * alienVoices.length)] || voices[0];
}