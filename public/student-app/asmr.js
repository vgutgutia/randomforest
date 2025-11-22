// App State
const appState = {
    currentPage: 'home',
    currentStreak: 0,
    achievements: [],
    checkIns: [],
    challenges: [],
    currentChallenge: null,
    currentAudio: null,
    currentAudioType: null,
    weeklyCheckIns: 0,
    totalDays: 0
};

// Web Audio API Audio Generation System
// All sounds are programmatically generated to mimic YouTube ASMR and music

let audioContext = null;
let audioNodes = {
    asmr: {},
    music: {}
};

// Initialize Audio Context
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Helper: Create white noise
function createWhiteNoise() {
    const bufferSize = 2 * audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
}

// Helper: Create oscillator with envelope
function createOscillator(freq, type = 'sine') {
    const osc = audioContext.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    return osc;
}

// Helper: Create gain node with envelope
function createGainNode(volume = 0.5) {
    const gain = audioContext.createGain();
    gain.gain.value = volume;
    return gain;
}

// ASMR Sound Generators
const asmrGenerators = {
    rain: () => {
        const ctx = initAudioContext();
        const noise = createWhiteNoise();
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 0.5;
        
        const gain = createGainNode(0.3);
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.5;
        lfoGain.gain.value = 500;
        
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        lfo.start();
        noise.start();
        
        return { source: noise, lfo, gain };
    },
    
    ocean: () => {
        const ctx = initAudioContext();
        const noise = createWhiteNoise();
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 300;
        filter.Q.value = 1;
        
        const gain = createGainNode(0.4);
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.1;
        lfoGain.gain.value = 100;
        
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        lfo.start();
        noise.start();
        
        return { source: noise, lfo, gain };
    },
    
    forest: () => {
        const ctx = initAudioContext();
        const nodes = [];
        
        // Wind background
        const windNoise = createWhiteNoise();
        const windFilter = ctx.createBiquadFilter();
        windFilter.type = 'lowpass';
        windFilter.frequency.value = 800;
        const windGain = createGainNode(0.2);
        windNoise.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(ctx.destination);
        windNoise.start();
        nodes.push({ source: windNoise, gain: windGain });
        
        // Bird chirps
        const birdChirp = () => {
            const osc = createOscillator(800 + Math.random() * 2000, 'sine');
            const gain = createGainNode(0.15);
            const env = ctx.createGain();
            env.gain.setValueAtTime(0, ctx.currentTime);
            env.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
            env.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            
            osc.frequency.exponentialRampToValueAtTime(osc.frequency.value * 2, ctx.currentTime + 0.1);
            osc.connect(env);
            env.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.3);
        };
        
        const birdInterval = setInterval(birdChirp, 2000 + Math.random() * 3000);
        nodes.push({ interval: birdInterval });
        
        return { nodes, gain: windGain };
    },
    
    fire: () => {
        const ctx = initAudioContext();
        const nodes = [];
        
        const crackle = () => {
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < buffer.length; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / buffer.length * 5);
            }
            noise.buffer = buffer;
            
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 2000 + Math.random() * 3000;
            filter.Q.value = 2;
            
            const gain = createGainNode(0.2);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start();
            noise.stop(ctx.currentTime + 0.1);
        };
        
        const crackleInterval = setInterval(crackle, 300 + Math.random() * 500);
        nodes.push({ interval: crackleInterval });
        
        // Base fire rumble
        const rumble = createWhiteNoise();
        const rumbleFilter = ctx.createBiquadFilter();
        rumbleFilter.type = 'lowpass';
        rumbleFilter.frequency.value = 500;
        const rumbleGain = createGainNode(0.15);
        rumble.connect(rumbleFilter);
        rumbleFilter.connect(rumbleGain);
        rumbleGain.connect(ctx.destination);
        rumble.start();
        nodes.push({ source: rumble, gain: rumbleGain });
        
        return { nodes, gain: rumbleGain };
    },
    
    wind: () => {
        const ctx = initAudioContext();
        const noise = createWhiteNoise();
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600;
        filter.Q.value = 0.5;
        
        const gain = createGainNode(0.3);
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.3;
        lfoGain.gain.value = 200;
        
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        lfo.start();
        noise.start();
        
        return { source: noise, lfo, gain };
    },
    
    birds: () => {
        const ctx = initAudioContext();
        const nodes = [];
        
        const birdChirp = () => {
            const baseFreq = 1000 + Math.random() * 2000;
            const osc = createOscillator(baseFreq, 'sine');
            const gain = createGainNode(0.2);
            const env = ctx.createGain();
            
            env.gain.setValueAtTime(0, ctx.currentTime);
            env.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05);
            env.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            
            osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.1);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, ctx.currentTime + 0.2);
            
            osc.connect(env);
            env.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.2);
        };
        
        const birdInterval = setInterval(() => {
            birdChirp();
            setTimeout(birdChirp, 100 + Math.random() * 200);
        }, 1500 + Math.random() * 2000);
        nodes.push({ interval: birdInterval });
        
        return { nodes };
    }
};

// Music Generators
const musicGenerators = {
    meditation: () => {
        const ctx = initAudioContext();
        const nodes = [];
        
        // Create a peaceful pad sound
        const createPad = (freq, delay = 0) => {
            const osc1 = createOscillator(freq, 'sine');
            const osc2 = createOscillator(freq * 1.01, 'sine');
            const gain = createGainNode(0.1);
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 2000;
            
            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            
            osc1.start(ctx.currentTime + delay);
            osc2.start(ctx.currentTime + delay);
            nodes.push({ source: osc1, source2: osc2, gain });
        };
        
        // Play chord progression
        const chord = [220, 261.63, 329.63]; // A, C, E
        chord.forEach((freq, i) => createPad(freq, i * 0.2));
        
        // Add slow modulation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.1;
        lfoGain.gain.value = 0.05;
        lfo.connect(lfoGain);
        nodes.forEach(node => {
            if (node.gain) {
                // Connect LFO to modulate gain
                const baseGain = node.gain.gain.value;
                lfoGain.connect(node.gain.gain);
                node.gain.gain.value = baseGain;
            }
        });
        lfo.start();
        nodes.push({ lfo, lfoGain });
        
        return { nodes };
    },
    
    piano: () => {
        const ctx = initAudioContext();
        const nodes = [];
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C major scale
        
        const playNote = (freq, time) => {
            const osc = createOscillator(freq, 'sine');
            const gain = createGainNode(0.3);
            const env = ctx.createGain();
            
            env.gain.setValueAtTime(0, time);
            env.gain.linearRampToValueAtTime(0.5, time + 0.01);
            env.gain.exponentialRampToValueAtTime(0.01, time + 2);
            
            osc.connect(env);
            env.connect(gain);
            gain.connect(ctx.destination);
            osc.start(time);
            osc.stop(time + 2);
            nodes.push({ source: osc, gain });
        };
        
        let currentTime = ctx.currentTime;
        const playSequence = () => {
            notes.forEach((note, i) => {
                playNote(note, currentTime + i * 0.5);
            });
            currentTime += notes.length * 0.5 + 1;
        };
        
        playSequence();
        const interval = setInterval(playSequence, notes.length * 0.5 * 1000 + 1000);
        nodes.push({ interval });
        
        return { nodes };
    },
    
    ambient: () => {
        const ctx = initAudioContext();
        const nodes = [];
        
        // Create ambient pad
        const filters = [];
        const createAmbientPad = (freq) => {
            const osc = createOscillator(freq, 'triangle');
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 1500;
            const gain = createGainNode(0.15);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            nodes.push({ source: osc, gain, filter });
            filters.push(filter);
        };
        
        createAmbientPad(110); // A2
        createAmbientPad(146.83); // D3
        createAmbientPad(196); // G3
        
        // Slow filter modulation
        if (filters.length > 0) {
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.value = 0.05;
            lfoGain.gain.value = 300;
            lfo.connect(lfoGain);
            filters.forEach(filter => {
                lfoGain.connect(filter.frequency);
            });
            lfo.start();
            nodes.push({ lfo, lfoGain, filters });
        }
        
        return { nodes };
    },
    
    nature: () => {
        const ctx = initAudioContext();
        const nodes = [];
        
        // Combine forest sounds with gentle music
        const forest = asmrGenerators.forest();
        nodes.push(...forest.nodes);
        
        // Add gentle musical tones
        const playTone = (freq, time) => {
            const osc = createOscillator(freq, 'sine');
            const gain = createGainNode(0.1);
            const env = ctx.createGain();
            env.gain.setValueAtTime(0, time);
            env.gain.linearRampToValueAtTime(0.2, time + 0.5);
            env.gain.exponentialRampToValueAtTime(0.01, time + 4);
            
            osc.connect(env);
            env.connect(gain);
            gain.connect(ctx.destination);
            osc.start(time);
            osc.stop(time + 4);
        };
        
        const tones = [220, 261.63, 329.63];
        let currentTime = ctx.currentTime;
        const playTones = () => {
            tones.forEach((freq, i) => {
                playTone(freq, currentTime + i * 1.5);
            });
            currentTime += tones.length * 1.5;
        };
        
        playTones();
        const interval = setInterval(playTones, tones.length * 1.5 * 1000);
        nodes.push({ interval });
        
        return { nodes };
    },
    
    lofi: () => {
        const ctx = initAudioContext();
        const nodes = [];
        
        // Kick drum
        const playKick = (time) => {
            const osc = createOscillator(60, 'sine');
            const gain = createGainNode(0.4);
            const env = ctx.createGain();
            env.gain.setValueAtTime(1, time);
            env.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
            
            osc.connect(env);
            env.connect(gain);
            gain.connect(ctx.destination);
            osc.start(time);
            osc.stop(time + 0.3);
        };
        
        // Hi-hat
        const playHihat = (time) => {
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < buffer.length; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / buffer.length * 10);
            }
            noise.buffer = buffer;
            const gain = createGainNode(0.2);
            noise.connect(gain);
            gain.connect(ctx.destination);
            noise.start(time);
            noise.stop(time + 0.05);
        };
        
        // Chord progression
        const playChord = (freqs, time) => {
            freqs.forEach(freq => {
                const osc = createOscillator(freq, 'triangle');
                const gain = createGainNode(0.15);
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 2000;
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                osc.start(time);
                osc.stop(time + 2);
            });
        };
        
        let beatTime = ctx.currentTime;
        const playBeat = () => {
            playKick(beatTime);
            playHihat(beatTime + 0.5);
            playHihat(beatTime + 1);
            playKick(beatTime + 1.5);
            playHihat(beatTime + 1.75);
            
            if (Math.floor(beatTime * 2) % 8 === 0) {
                playChord([261.63, 329.63, 392.00], beatTime);
            }
            
            beatTime += 2;
        };
        
        playBeat();
        const interval = setInterval(playBeat, 2000);
        nodes.push({ interval });
        
        return { nodes };
    },
    
    jazz: () => {
        const ctx = initAudioContext();
        const nodes = [];
        
        const playJazzChord = (freqs, time) => {
            freqs.forEach(freq => {
                const osc = createOscillator(freq, 'sawtooth');
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 3000;
                const gain = createGainNode(0.12);
                const env = ctx.createGain();
                
                env.gain.setValueAtTime(0, time);
                env.gain.linearRampToValueAtTime(0.3, time + 0.1);
                env.gain.exponentialRampToValueAtTime(0.01, time + 3);
                
                osc.connect(filter);
                filter.connect(env);
                env.connect(gain);
                gain.connect(ctx.destination);
                osc.start(time);
                osc.stop(time + 3);
            });
        };
        
        // Jazz chord progression (ii-V-I)
        const chords = [
            [146.83, 174.61, 220], // Dm
            [164.81, 196, 246.94], // G7
            [130.81, 164.81, 196]  // C
        ];
        
        let chordTime = ctx.currentTime;
        let chordIndex = 0;
        const playProgression = () => {
            playJazzChord(chords[chordIndex], chordTime);
            chordIndex = (chordIndex + 1) % chords.length;
            chordTime += 2;
        };
        
        playProgression();
        const interval = setInterval(playProgression, 2000);
        nodes.push({ interval });
        
        return { nodes };
    }
};

// Daily Challenges
const challenges = [
    {
        text: "Take 5 deep breaths. Inhale for 4 counts, hold for 4, exhale for 4.",
        hint: "Find a quiet place, sit comfortably, and focus on your breathing. Count slowly and evenly.",
        points: 10
    },
    {
        text: "Write down 3 things you're grateful for today.",
        hint: "They can be simple things like a warm cup of coffee, a friendly smile, or a beautiful sky.",
        points: 10
    },
    {
        text: "Spend 5 minutes in nature or looking at nature through a window.",
        hint: "Take a walk outside, sit in a park, or simply look at trees and sky from your window.",
        points: 15
    },
    {
        text: "Do 10 minutes of stretching or gentle yoga.",
        hint: "You can find simple stretching routines online or just move your body in ways that feel good.",
        points: 15
    },
    {
        text: "Listen to calming music or sounds for 10 minutes.",
        hint: "Use the Sounds section in this app to find relaxing music or ASMR sounds.",
        points: 10
    },
    {
        text: "Drink a full glass of water mindfully.",
        hint: "Sip slowly, notice the temperature, the taste, and how it feels as you drink.",
        points: 5
    },
    {
        text: "Write a positive affirmation and repeat it 3 times.",
        hint: "Examples: 'I am calm and peaceful', 'I handle stress with ease', 'I am doing my best'.",
        points: 10
    },
    {
        text: "Take a 5-minute break from screens.",
        hint: "Put away your phone, close your laptop, and do something else like reading or walking.",
        points: 15
    },
    {
        text: "Practice mindfulness by noticing 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
        hint: "This is called the 5-4-3-2-1 grounding technique. Take your time with each sense.",
        points: 20
    },
    {
        text: "Do something kind for yourself today.",
        hint: "Take a relaxing bath, enjoy your favorite snack, read a book, or do something you love.",
        points: 15
    }
];

// Daily Tips
const dailyTips = [
    "Take a moment to breathe deeply. Inhale for 4 counts, hold for 4, exhale for 4. Repeat this cycle three times to help calm your mind and reduce stress.",
    "Practice gratitude by writing down three things you're thankful for each day. This simple practice can boost your mood and perspective.",
    "Stay hydrated! Drinking enough water throughout the day helps maintain energy levels and reduces stress.",
    "Take regular breaks from screens. Every hour, look away from your screen for at least 5 minutes to reduce eye strain and mental fatigue.",
    "Get moving! Even a short 10-minute walk can help reduce stress and improve your mood.",
    "Practice mindfulness by focusing on the present moment. Notice your surroundings, your breath, and how you feel right now.",
    "Connect with nature. Spending time outdoors or even looking at nature can have a calming effect on your mind.",
    "Create a relaxing bedtime routine. Try to go to bed and wake up at the same time each day for better sleep.",
    "Limit caffeine intake, especially in the afternoon. Too much caffeine can increase anxiety and disrupt sleep.",
    "Practice self-compassion. Be kind to yourself, especially during difficult times. You're doing your best."
];

// Initialize App
function initApp() {
    loadState();
    setupNavigation();
    setupMoodButtons();
    setupChallenge();
    setupSoundButtons();
    setupProgress();
    updateUI();
    setDailyTip();
}

// Audio generation state
let currentAudioNodes = null;

// Navigation
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            switchPage(page);
            
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`${page}-page`).classList.add('active');
    appState.currentPage = page;
    
    // Show audio player if sound is playing (make it accessible from all pages)
    if (appState.currentAudio && page !== 'sounds') {
        // Keep audio player visible but move it to current page or keep it floating
        // Actually, let's keep it floating at the bottom - it's already positioned fixed
    }
    
    if (page === 'progress') {
        updateProgressPage();
    }
    
    if (page === 'sounds' && appState.currentAudio) {
        // Highlight the currently playing sound button
        const playingBtn = document.querySelector(`[data-sound="${appState.currentAudio.sound}"][data-type="${appState.currentAudio.type}"]`);
        if (playingBtn) {
            playingBtn.classList.add('playing');
        }
        // Show audio player if sound is playing
        if (currentAudioNodes) {
            document.getElementById('audio-player-container').classList.remove('hidden');
        }
    }
}

// Mood Buttons
function setupMoodButtons() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mood = btn.dataset.mood;
            recordCheckIn(mood);
            showMoodFeedback(mood);
        });
    });
}

function recordCheckIn(mood) {
    const today = new Date().toDateString();
    const existingCheckIn = appState.checkIns.find(c => c.date === today);
    
    if (!existingCheckIn) {
        appState.checkIns.push({
            date: today,
            mood: mood
        });
        
        // Update total days
        appState.totalDays = appState.checkIns.length;
        
        // Update weekly check-ins
        updateWeeklyCheckIns();
        
        // Update streak
        updateStreak();
        
        // Check for achievements
        checkAchievements();
        
        saveState();
        updateUI();
    }
}

function updateWeeklyCheckIns() {
    const weekStart = getWeekStart();
    weekStart.setHours(0, 0, 0, 0);
    
    const weekCheckIns = appState.checkIns.filter(c => {
        const checkInDate = new Date(c.date);
        checkInDate.setHours(0, 0, 0, 0);
        return checkInDate >= weekStart;
    });
    
    appState.weeklyCheckIns = weekCheckIns.length;
}

function showMoodFeedback(mood) {
    const messages = {
        great: "Awesome! Keep up the great mood! 🌟",
        okay: "That's okay! Take care of yourself today. 💙",
        stressed: "It's okay to feel stressed. Remember to breathe and take things one step at a time. 💜"
    };
    
    alert(messages[mood]);
}

// Challenges
function setupChallenge() {
    const hintBtn = document.getElementById('hint-btn');
    const skipBtn = document.getElementById('skip-btn');
    const completeBtn = document.getElementById('complete-btn');
    const hintText = document.getElementById('hint-text');
    
    hintBtn.addEventListener('click', () => {
        if (appState.currentChallenge) {
            hintText.textContent = appState.currentChallenge.hint;
            hintText.classList.remove('hidden');
        }
    });
    
    skipBtn.addEventListener('click', () => {
        loadNewChallenge();
    });
    
    completeBtn.addEventListener('click', () => {
        if (appState.currentChallenge) {
            completeChallenge();
        }
    });
    
    loadNewChallenge();
}

function loadNewChallenge() {
    // Check if we already have a challenge for today
    const today = new Date().toDateString();
    const todayChallenge = appState.challenges.find(c => c.date === today);
    
    if (todayChallenge && !todayChallenge.completed) {
        appState.currentChallenge = todayChallenge.challenge;
        displayChallenge(todayChallenge.challenge);
    } else {
        // Get a random challenge
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        appState.currentChallenge = randomChallenge;
        
        // Save challenge for today
        appState.challenges.push({
            date: today,
            challenge: randomChallenge,
            completed: false
        });
        
        displayChallenge(randomChallenge);
        saveState();
    }
    
    document.getElementById('hint-text').classList.add('hidden');
}

function displayChallenge(challenge) {
    document.getElementById('challenge-text').textContent = challenge.text;
}

function completeChallenge() {
    const today = new Date().toDateString();
    const todayChallengeIndex = appState.challenges.findIndex(c => c.date === today);
    
    if (todayChallengeIndex !== -1) {
        appState.challenges[todayChallengeIndex].completed = true;
        
        // Award points
        const points = appState.currentChallenge.points;
        
        // Check for achievements
        checkChallengeAchievements();
        
        saveState();
        updateUI();
        
        alert(`Great job! You completed today's challenge! 🎉`);
        loadNewChallenge();
    }
}

// Sound Buttons
function setupSoundButtons() {
    const soundButtons = document.querySelectorAll('.sound-btn');
    soundButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const sound = btn.dataset.sound;
            const type = btn.dataset.type;
            playSound(sound, type, btn);
        });
    });
    
    const stopBtn = document.getElementById('stop-audio-btn');
    stopBtn.addEventListener('click', stopSound);
}

function playSound(sound, type, buttonElement) {
    // Stop current sound if playing
    if (appState.currentAudio) {
        stopSound();
    }
    
    // Initialize audio context (may need user interaction)
    const ctx = initAudioContext();
    if (ctx.state === 'suspended') {
        ctx.resume().catch(err => {
            console.error('Error resuming audio context:', err);
        });
    }
    
    // Get generator function
    let generator = null;
    if (type === 'asmr' && asmrGenerators[sound]) {
        generator = asmrGenerators[sound];
    } else if (type === 'music' && musicGenerators[sound]) {
        generator = musicGenerators[sound];
    }
    
    if (!generator) {
        alert('Sound not available. Please try another one.');
        return;
    }
    
    // Update UI immediately for better UX
    document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.remove('playing'));
    buttonElement.classList.add('playing');
    
    const soundNames = {
        rain: '🌧️ Rain',
        ocean: '🌊 Ocean Waves',
        forest: '🌲 Forest',
        fire: '🔥 Crackling Fire',
        wind: '💨 Gentle Wind',
        birds: '🐦 Birds Chirping',
        meditation: '🧘 Meditation',
        piano: '🎹 Peaceful Piano',
        ambient: '✨ Ambient',
        nature: '🍃 Nature Symphony',
        lofi: '☕ Lo-fi',
        jazz: '🎷 Jazz'
    };
    
    document.getElementById('now-playing-text').textContent = soundNames[sound] || sound;
    const iconElement = buttonElement.querySelector('.sound-icon');
    if (iconElement) {
        document.getElementById('now-playing-icon').textContent = iconElement.textContent;
    }
    document.getElementById('audio-player-container').classList.remove('hidden');
    
    try {
        // Generate and play audio
        const audioNodes = generator();
        currentAudioNodes = audioNodes;
        appState.currentAudio = { sound, type };
        console.log('Generated audio playing:', sound);
    } catch (error) {
        console.error('Error generating audio:', error);
        alert('Unable to play this sound. Please try again.');
        stopSound();
    }
}

function stopSound() {
    if (currentAudioNodes) {
        try {
            // Stop all audio sources
            if (currentAudioNodes.source) {
                currentAudioNodes.source.stop();
            }
            if (currentAudioNodes.source2) {
                currentAudioNodes.source2.stop();
            }
            if (currentAudioNodes.lfo) {
                currentAudioNodes.lfo.stop();
            }
            
            // Stop all nodes in array
            if (currentAudioNodes.nodes) {
                currentAudioNodes.nodes.forEach(node => {
                    if (node.source) {
                        try { node.source.stop(); } catch (e) {}
                    }
                    if (node.source2) {
                        try { node.source2.stop(); } catch (e) {}
                    }
                    if (node.lfo) {
                        try { node.lfo.stop(); } catch (e) {}
                    }
                    if (node.lfoGain) {
                        try { node.lfoGain.disconnect(); } catch (e) {}
                    }
                    if (node.interval) {
                        clearInterval(node.interval);
                    }
                    if (node.gain) {
                        try { node.gain.disconnect(); } catch (e) {}
                    }
                    if (node.filters) {
                        node.filters.forEach(filter => {
                            try { filter.disconnect(); } catch (e) {}
                        });
                    }
                });
            }
            
            // Disconnect gain nodes
            if (currentAudioNodes.gain) {
                try { currentAudioNodes.gain.disconnect(); } catch (e) {}
            }
            if (currentAudioNodes.lfoGain) {
                try { currentAudioNodes.lfoGain.disconnect(); } catch (e) {}
            }
        } catch (e) {
            console.log('Error stopping audio:', e);
        }
        currentAudioNodes = null;
    }
    
    document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.remove('playing'));
    document.getElementById('audio-player-container').classList.add('hidden');
    
    appState.currentAudio = null;
}

// Progress Tracking
function setupProgress() {
    updateProgressPage();
}

function updateProgressPage() {
    updateWeeklyCheckIns(); // Recalculate weekly check-ins when viewing progress page
    updateWeeklyProgress();
    updateActivityCalendar();
    updateStats();
    updateAchievementsList();
}

function updateWeeklyProgress() {
    const maxCheckIns = 7;
    const percentage = (appState.weeklyCheckIns / maxCheckIns) * 100;
    document.getElementById('weekly-progress-bar').style.width = `${percentage}%`;
    document.getElementById('weekly-checkins').textContent = appState.weeklyCheckIns;
}

function updateActivityCalendar() {
    const calendar = document.getElementById('activity-calendar');
    calendar.innerHTML = '';
    
    // Get last 28 days
    const today = new Date();
    const days = [];
    
    for (let i = 27; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        days.push(date);
    }
    
    days.forEach((date, index) => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const dateStr = date.toDateString();
        const checkIn = appState.checkIns.find(c => c.date === dateStr);
        
        if (checkIn) {
            dayElement.classList.add(checkIn.mood);
        }
        
        if (date.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        dayElement.textContent = date.getDate();
        calendar.appendChild(dayElement);
    });
}

function updateStats() {
    document.getElementById('total-days').textContent = appState.totalDays;
    document.getElementById('total-weeks').textContent = Math.floor(appState.totalDays / 7);
    document.getElementById('total-achievements').textContent = appState.achievements.length;
}

function updateAchievementsList() {
    const list = document.getElementById('achievements-list');
    list.innerHTML = '';
    
    if (appState.achievements.length === 0) {
        list.innerHTML = '<p style="color: #888; text-align: center; padding: 20px;">Complete challenges and check-ins to earn achievements! 🏆</p>';
        return;
    }
    
    appState.achievements.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    appState.achievements.forEach(achievement => {
        const item = document.createElement('div');
        item.className = 'achievement-item';
        item.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-date">Earned on ${new Date(achievement.date).toLocaleDateString()}</div>
            </div>
        `;
        list.appendChild(item);
    });
}

// Achievements
function checkAchievements() {
    const today = new Date().toDateString();
    
    // First Check-in
    if (appState.checkIns.length === 1 && !hasAchievement('first-checkin')) {
        addAchievement('first-checkin', 'First Step', '🎯', 'Completed your first daily check-in!');
    }
    
    // 7 Day Streak
    if (appState.currentStreak >= 7 && !hasAchievement('week-streak')) {
        addAchievement('week-streak', 'Week Warrior', '🔥', 'Maintained a 7-day streak!');
    }
    
    // 30 Day Streak
    if (appState.currentStreak >= 30 && !hasAchievement('month-streak')) {
        addAchievement('month-streak', 'Monthly Master', '⭐', 'Maintained a 30-day streak!');
    }
    
    // 10 Check-ins
    if (appState.checkIns.length === 10 && !hasAchievement('ten-checkins')) {
        addAchievement('ten-checkins', 'Dedicated', '💪', 'Completed 10 check-ins!');
    }
    
    // 50 Check-ins
    if (appState.checkIns.length === 50 && !hasAchievement('fifty-checkins')) {
        addAchievement('fifty-checkins', 'Consistent', '🌟', 'Completed 50 check-ins!');
    }
}

function checkChallengeAchievements() {
    const completedChallenges = appState.challenges.filter(c => c.completed).length;
    
    // First Challenge
    if (completedChallenges === 1 && !hasAchievement('first-challenge')) {
        addAchievement('first-challenge', 'Challenge Accepted', '🎯', 'Completed your first challenge!');
    }
    
    // 10 Challenges
    if (completedChallenges === 10 && !hasAchievement('ten-challenges')) {
        addAchievement('ten-challenges', 'Challenge Master', '🏆', 'Completed 10 challenges!');
    }
    
    // 25 Challenges
    if (completedChallenges === 25 && !hasAchievement('twentyfive-challenges')) {
        addAchievement('twentyfive-challenges', 'Challenge Champion', '👑', 'Completed 25 challenges!');
    }
}

function hasAchievement(id) {
    return appState.achievements.some(a => a.id === id);
}

function addAchievement(id, title, icon, description) {
    appState.achievements.push({
        id: id,
        title: title,
        icon: icon,
        description: description,
        date: new Date().toISOString()
    });
    
    saveState();
    updateUI();
    
    // Show achievement notification
    setTimeout(() => {
        alert(`🏆 Achievement Unlocked: ${title}!\n${description}`);
    }, 500);
}

// Streak Calculation
function updateStreak() {
    if (appState.checkIns.length === 0) {
        appState.currentStreak = 0;
        return;
    }
    
    // Sort check-ins by date
    const sortedCheckIns = [...appState.checkIns].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if today has a check-in
    const todayStr = today.toDateString();
    const hasToday = sortedCheckIns.some(c => c.date === todayStr);
    
    if (!hasToday) {
        // Check yesterday
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        const hasYesterday = sortedCheckIns.some(c => c.date === yesterdayStr);
        
        if (!hasYesterday) {
            appState.currentStreak = 0;
            return;
        }
    }
    
    // Count consecutive days backwards from today or yesterday
    let currentDate = hasToday ? new Date(today) : new Date(today.getTime() - 86400000);
    
    while (true) {
        const dateStr = currentDate.toDateString();
        const hasCheckIn = sortedCheckIns.some(c => c.date === dateStr);
        
        if (hasCheckIn) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    appState.currentStreak = streak;
}

function getWeekStart() {
    const today = new Date();
    const day = today.getDay();
    // Get Monday of current week (or Sunday if day is 0)
    const diff = day === 0 ? -6 : 1 - day; // Monday = 1, so subtract (day - 1), but if Sunday (0), go back 6 days
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + diff);
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
}

// UI Updates
function updateUI() {
    document.getElementById('streak-value').textContent = `${appState.currentStreak} days`;
    document.getElementById('achievement-count').textContent = appState.achievements.length;
    
    if (appState.currentPage === 'progress') {
        updateProgressPage();
    }
}

function setDailyTip() {
    const today = new Date().getDate();
    const tipIndex = today % dailyTips.length;
    document.getElementById('daily-tip').textContent = dailyTips[tipIndex];
}

// Local Storage
function saveState() {
    try {
        localStorage.setItem('serenityAppState', JSON.stringify(appState));
    } catch (e) {
        console.error('Error saving state:', e);
    }
}

function loadState() {
    try {
        const saved = localStorage.getItem('serenityAppState');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge saved state with default state
            Object.assign(appState, parsed);
            
            // Restore current challenge if it exists for today
            const today = new Date().toDateString();
            const todayChallenge = appState.challenges.find(c => c.date === today && !c.completed);
            if (todayChallenge) {
                appState.currentChallenge = todayChallenge.challenge;
                displayChallenge(todayChallenge.challenge);
            }
        }
    } catch (e) {
        console.error('Error loading state:', e);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
