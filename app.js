document.addEventListener('DOMContentLoaded', () => {
    const messages = [
        "Eres más fuerte de lo que piensas 💖",
        "Respira hondo: lo estás haciendo bien ✨",
        "Poquito a poquito: todo mejora 🐾",
        "Tu sonrisa cambia el día de alguien ☀️",
        "Hoy mereces una dosis extra de mimos 💕",
        "Nada es para siempre: las nubes también pasan ⛅",
        "Orgullx de ti por seguir intentándolo 🌸",
        "Tómate tu tiempo, tú importas 🌟",
        "Eres luz, aunque hoy no lo sientas 🔆",
        "Tu corazón es un lugar seguro 🫶",
    ];

    const catVariants = ["tabby", "white", "gray", "peach"];
    const catPalette = {
        tabby: "#F8C77E",
        white: "#FFF8EF",
        gray: "#D9DEE8",
        peach: "#FFD6C9"
    };

    const messageElement = document.getElementById('message-text');
    const refreshButton = document.getElementById('refresh-button');
    const catContainer = document.getElementById('cat-container');
    const catBody = document.getElementById('cat-body');
    const catTail = document.getElementById('cat-tail');
    const catEars = catContainer.querySelectorAll('path');
    const catPaws = catContainer.querySelectorAll('rect');
    const backgroundBitsContainer = document.querySelector('.background-bits');

    let currentMessage = null;
    let currentVariant = null;

    // Función de utilidad para elegir un elemento aleatorio sin repetir
    const pick = (arr, avoid) => {
        if (!arr.length) return null;
        let choice = arr[Math.floor(Math.random() * arr.length)];
        if (avoid && arr.length > 1) {
            while (choice === avoid) {
                choice = arr[Math.floor(Math.random() * arr.length)];
            }
        }
        return choice;
    };

    // Función para mostrar un nuevo mensaje y cambiar el gatito
    const showNewContent = () => {
        const newMessage = pick(messages, currentMessage);
        const newVariant = pick(catVariants, currentVariant);
        
        currentMessage = newMessage;
        currentVariant = newVariant;

        // Actualizar el texto del mensaje con una animación
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            messageElement.textContent = newMessage;
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 200);

        // Cambiar el color del gatito
        const newFill = catPalette[newVariant];
        catBody.setAttribute('fill', newFill);
        catTail.setAttribute('stroke', newFill);
        catEars.forEach(ear => ear.setAttribute('fill', newFill));
        catPaws.forEach(paw => paw.setAttribute('fill', newFill));
    };

    // Crear las estrellas de fondo
    const createFloatingBits = () => {
        for (let i = 0; i < 16; i++) {
            const bit = document.createElement('div');
            bit.classList.add('background-bit');
            bit.textContent = Math.random() > 0.5 ? '★' : '✦';
            bit.style.left = `${Math.random() * 100}%`;
            bit.style.fontSize = `${8 + Math.random() * 10}px`;
            bit.style.animationDuration = `${6 + Math.random() * 6}s`;
            bit.style.animationDelay = `${Math.random() * 4}s`;
            backgroundBitsContainer.appendChild(bit);
        }
    };

    // Manejar el clic en el gatito
    const handleCatClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const heart = document.createElement('span');
        heart.textContent = '💗';
        heart.className = 'heart';
        heart.style.position = 'absolute';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.transform = 'scale(0.6)';
        heart.style.transition = 'transform 1.2s ease-out, opacity 1.2s ease-out, top 1.2s ease-out';
        heart.style.opacity = '1';

        catContainer.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = 'scale(1.2)';
            heart.style.opacity = '0';
            heart.style.top = `${y - 80}px`;
        }, 10);

        setTimeout(() => {
            heart.remove();
        }, 1300);
    };

    // Inicializar
    showNewContent();
    createFloatingBits();

    // Event listeners
    refreshButton.addEventListener('click', showNewContent);
    catContainer.addEventListener('click', handleCatClick);
});