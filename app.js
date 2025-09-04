document.addEventListener('DOMContentLoaded', () => {
    // Nuevos mensajes más amorosos y de apoyo para Curi
    const messages = [
        "Curi, eres más fuerte de lo que piensas. Sé que puedes con esto. 💖",
        "Siempre estoy aquí para ti. No estás sola en esto. ✨",
        "Poquito a poquito, todo mejora. Confío en ti. 🐾",
        "Tu sonrisa es increíble, Curi. Es un recordatorio de lo especial que eres. ☀️",
        "Hoy mereces una dosis extra de mimos. Te envío todo mi apoyo. 💕",
        "Nada es para siempre, las nubes también pasan. Ánimo, Curi. ⛅",
        "Estoy orgulloso de ti por seguir intentándolo.🌸",
        "Tómate tu tiempo, tú importas. Estoy a tu lado. 🌟",
        "Eres luz, aunque ahora no lo sientas. Estoy aquí para recordártelo. 🔆",
        "Tu corazón es un lugar seguro. Y mi corazon, también. 🫶",
        "Cada día es una nueva oportunidad para brillar. Y tú brillas mucho, Curi. 🌈"
    ,];

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
    const catBlings = catContainer.querySelectorAll('.blink-animation');
    const backgroundBitsContainer = document.querySelector('.background-bits');

    let currentMessage = null;
    let currentVariant = null;
    let currentMessageIndex = 0; // Se utiliza para mostrar los mensajes en orden
    let availableVariants = [...catVariants];

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
        // Seleccionar el siguiente mensaje de la lista
        const newMessage = messages[currentMessageIndex];
        currentMessageIndex = (currentMessageIndex + 1) % messages.length; // Avanzar el índice y reiniciar al final de la lista

        // Actualizar el texto del mensaje con una animación
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            messageElement.textContent = newMessage;
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 200);

        // Cambiar el color del gatito sin repetir el anterior
        const newVariant = pick(availableVariants, currentVariant);
        currentVariant = newVariant;
        
        const newFill = catPalette[newVariant];
        catBody.setAttribute('fill', newFill);
        catTail.setAttribute('stroke', newFill);
        catEars.forEach(ear => ear.setAttribute('fill', newFill));
        catPaws.forEach(paw => paw.setAttribute('fill', newFill));
        catBlings.forEach(bling => bling.setAttribute('fill', newFill));
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
        heart.className = 'heart-animation';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

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