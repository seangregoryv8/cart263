import { ranNum } from "./constants.js";

let verses = [];

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
            requestAnimationFrame(fade);
        }
        else verseDisplay.style.opacity = '0';
    }
    fade();
}

function fancyText(text, fontSize = 64, color = "#FFD700") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 128;

    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });

    const geometry = new THREE.PlaneGeometry(10, 2.5);
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}
function getAlienVoice()
{
    const voices = speechSynthesis.getVoices();
    const alienVoices = voices.filter(v => v.lang.includes('en') && !v.default);
    return alienVoices[Math.floor(Math.random() * alienVoices.length)] || voices[0];
}