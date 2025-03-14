// const { createApp, ref } = Vue;

// createApp({
//     setup() {
//         const warningMessage = ref("");
//         const darkOverlay = ref(false);

//         const showWarning = (message) => {
//             warningMessage.value = message;
//             darkOverlay.value = true; // Visa mörk bakgrund endast när varningen visas
//             document.querySelector(".dark-overlay").classList.add("active");
//         };

//         const closeWarning = () => {
//             warningMessage.value = "";
//             darkOverlay.value = false; 
//             document.querySelector(".dark-overlay").classList.remove("active");
//         };


        
//         const playText = () => {
//             if (!window.speechSynthesis) {
//                 showWarning("Din webbläsare stöder inte text-till-tal.");
//                 return;
//             }

//             const selectedText = window.getSelection().toString().trim();

//             if (selectedText) {
//                 const utterance = new SpeechSynthesisUtterance(selectedText);
//                 utterance.lang = "sv-SE"; // Sätter språket till svenska
//                 window.speechSynthesis.speak(utterance);
//             } else {
//                 showWarning("Inget text markerad. Markera ett stycke och försök igen.");
//             }
//         };

//         return { warningMessage, closeWarning, playText };
//     }
// }).mount("#app");

const { createApp, ref } = Vue;

createApp({
    setup() {
        const warningMessage = ref("");
        const darkOverlay = ref(false);
        let speechInstance = null; // Håller koll på uppläsningen

        const showWarning = (message) => {
            warningMessage.value = message;
            darkOverlay.value = true;
            document.querySelector(".dark-overlay").classList.add("active");
        };

        const closeWarning = () => {
            warningMessage.value = "";
            darkOverlay.value = false;
            document.querySelector(".dark-overlay").classList.remove("active");
        };

        const playText = () => {
            if (!window.speechSynthesis) {
                showWarning("Din webbläsare stöder inte text-till-tal.");
                return;
            }

            if (window.speechSynthesis.speaking) {
                // ✅ Om text redan läses upp → Stoppa den istället
                window.speechSynthesis.cancel();
                return;
            }

            let selectedText = window.getSelection().toString().trim();

            if (!selectedText || selectedText.length < 2) {
                showWarning("Inget text markerad. Markera ett stycke och försök igen.");
                return;
            }

            speechInstance = new SpeechSynthesisUtterance(selectedText);
            speechInstance.lang = "sv-SE";
            window.speechSynthesis.speak(speechInstance);
        };

        return { warningMessage, closeWarning, playText };
    }
}).mount("#app");





// const playButton = document.getElementById('playButton');

// playButton.addEventListener('click', () => {
//     const selectedText = window.getSelection().toString().trim();
    
//     if (selectedText) {
//         const utterance = new SpeechSynthesisUtterance(selectedText);
//         window.speechSynthesis.speak(utterance);
//     } else {
//         alert('Inget text markerad. Markera ett stycke och försök igen.');
//     }
// });





let menuToggle = document.querySelector('.menuToggle');
let menu = document.querySelector('.menu');
menuToggle.onclick = function(){
    menu.classList.toggle('active');
}

// Kolla om Dark Mode eller Bakgrundsfärg är sparad i localStorage vid sidladdning
if (localStorage.getItem('darkMode') === 'enabled') {
document.body.classList.add('dark-mode');
} else if (localStorage.getItem('customBgColor')) {
document.body.style.backgroundColor = localStorage.getItem('customBgColor');
}

// Växla Dark Mode och spara inställningen
document.getElementById('darkModeToggle').addEventListener('click', function() {
if (document.body.classList.contains('dark-mode')) {
document.body.classList.remove('dark-mode');
localStorage.setItem('darkMode', 'disabled');

// Återställ den senaste bakgrundsfärgen om den fanns
if (localStorage.getItem('customBgColor')) {
    document.body.style.backgroundColor = localStorage.getItem('customBgColor');
} else {
    document.body.style.backgroundColor = ""; // Standardfärg
}
} else {
document.body.classList.add('dark-mode');
localStorage.setItem('darkMode', 'enabled');
localStorage.removeItem('customBgColor'); // Tar bort bakgrundsfärgen
document.body.style.backgroundColor = ""; // Återställ bakgrund vid Dark Mode
}
});

// Uppdaterad funktion för slumpmässig bakgrundsfärg
document.getElementById('randomBg').addEventListener('click', function() {
let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
document.body.style.backgroundColor = randomColor;

localStorage.setItem('customBgColor', randomColor);
localStorage.setItem('darkMode', 'disabled'); // Stänger av Dark Mode
document.body.classList.remove('dark-mode');
});


const fonts = ["Arial, sans-serif", "Georgia, serif", "Courier New, monospace", "Comic Sans MS, cursive"];
let fontIndex = 0;

document.getElementById('toggleFont').addEventListener('click', function() {
fontIndex = (fontIndex + 1) % fonts.length;

// Ändra textstilen på alla relevanta element
document.body.style.fontFamily = fonts[fontIndex];


document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, a, button").forEach(element => {
element.style.fontFamily = fonts[fontIndex];
});
});



document.getElementById('showSecret').addEventListener('click', function() {
let secretMessage = document.getElementById('secretMessage');

if (secretMessage.style.display === 'block') {
secretMessage.style.display = 'none';
} else {
secretMessage.style.display = 'block';
}
});




document.getElementById('showSecret').addEventListener('click', function() {
    let secretMessage = document.getElementById('secretMessages');
    
    if (secretMessage.style.display === 'block') {
    secretMessage.style.display = 'none';
    } else {
    secretMessage.style.display = 'block';
    }
    });




document.getElementById('triggerAnimation').addEventListener('click', function() {
let box = document.getElementById('animatedBox');
box.classList.add('animated');

setTimeout(() => {
box.classList.remove('animated');
box.style.display = 'none';
}, 1500);
});
