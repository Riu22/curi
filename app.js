document.addEventListener('DOMContentLoaded', () => {
    // Mensajes con un tono de apoyo y cariño equilibrado
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
        "Tu corazón es un lugar seguro. Y mi hombro, también. 🫶",
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
    const kissLink = document.getElementById('kiss-link'); // Cambié de 'hugLink' a 'kissLink' para mayor claridad
    const catContainer = document.getElementById('cat-container');
    const catBody = document.getElementById('cat-body');
    const catTail = document.getElementById('cat-tail');
    const catEars = catContainer.querySelectorAll('path');
    const catPaws = catContainer.querySelectorAll('rect');
    const catBlings = catContainer.querySelectorAll('.blink-animation');
    const backgroundBitsContainer = document.querySelector('.background-bits');

    let currentMessage = null;
    let currentVariant = null;
    let currentMessageIndex = 0;
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
        const newMessage = messages[currentMessageIndex];
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;

        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(10px)';

        setTimeout(() => {
            messageElement.textContent = newMessage;
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 200);

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

    // Función para lanzar corazones desde la parte inferior de la pantalla
    const createHearts = (count) => {
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('span');
            heart.classList.add('heart');
            heart.textContent = '💖'; // O '❤️', '💗', etc.
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${2 + Math.random() * 2}s`;
            heart.style.animationDelay = `${Math.random() * 1}s`;
            document.body.appendChild(heart);

            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }
    };

    // Función para mostrar el modal
    const showModal = () => {
        const modal = document.createElement('div');
        modal.classList.add('modal-container');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <p>¡Te quiero Curi! ❤️</p>
            </div>
        `;
        document.body.appendChild(modal);

        // Cerrar el modal al hacer clic en el botón de cierre
        modal.querySelector('.close-button').addEventListener('click', () => {
            modal.remove();
        });

        // Cerrar el modal al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    };

    // Inicializar
    showNewContent();
    createFloatingBits();

    // Event listeners
    refreshButton.addEventListener('click', showNewContent);

    // Event listener para el botón "kiss-link"
    kissLink.addEventListener('click', (e) => {
        e.preventDefault();
        createHearts(50); // Lanza 50 corazones
        showModal(); // Muestra el modal
    });
});