import styles from './ContactLink.module.css';
import gsap from 'gsap';

export function createContactLink({ icon, href, hoverText }) {
    const colors = ['#007bff', '#6610f2', '#dc3545', '#ffc107', '#28a745'];
    const numLines = colors.length;
    let lines = [];

    const linkContainer = document.createElement('div');
    linkContainer.className = styles.linkContainer;

    const link = document.createElement('a');
    link.className = styles.contactLink;

    const linesContainer = document.createElement('div');
    linesContainer.className = styles.linesContainer;

    const linesWrapper = document.createElement('div');
    linesWrapper.className = styles.linesWrapper;

    linesContainer.appendChild(linesWrapper);
    linkContainer.appendChild(link);
    linkContainer.appendChild(linesContainer);

    let containerRect = null;  // Store the container's bounding rectangle

    // Animation Constants
    const ENTER_DURATION = 0.3;
    const LEAVE_DURATION = 0.3;
    const MOVE_DURATION = 0.15;
    const EASING = "power2.out"; // Common easing function
    const MOVE_EASING = "power1.out";

    const INITIAL_OFFSET = 4;
    const MOUSE_SENSITIVITY = 0.1;
    const MOUSE_MULTIPLIER = 3;


    const handleMouseEnter = (event) => {
        // Очищаем массив линий перед созданием новых
        lines = [];

        // Get the bounding rectangle of the container. Only do this once on enter.
        containerRect = linkContainer.getBoundingClientRect();

        for (let i = 0; i < numLines; i++) {
            const line = document.createElement('div');
            line.classList.add(styles.line);
            line.style.borderColor = colors[i];
            line.style.zIndex = (i + 1);

            linkContainer.appendChild(line);
            lines.push(line);

            gsap.set(line, {
                transformOrigin: "center center",
                xPercent: -50,
                yPercent: -50,
                translate: `${-i * INITIAL_OFFSET}px`, // Apply initial offset during setup
            });

            // Initialize GSAP timeline for each line
            gsap.to(line, {
                duration: ENTER_DURATION,
                ease: EASING,
                x: 0,
                y: 0,
                overwrite: "auto"
            });
        }

        link.setAttribute('title', hoverText);
        handleMouseMove(event);
    };

    const handleMouseLeave = (event) => {
        lines.forEach((line) => {

            gsap.to(line, {
                duration: LEAVE_DURATION,
                ease: EASING,
                x: 0,
                y: 0,
                translate: `0px`, // Animate translate back to 0
                onComplete: () => {
                    line.remove();
                }
            });
        });

        lines = [];

        link.removeAttribute('title');
        containerRect = null;
    };

    const handleMouseMove = (event) => {
        if (!containerRect) return;  // Ensure the containerRect is available

        const mouseX = (event.clientX - containerRect.left);
        const mouseY = (event.clientY - containerRect.top);

        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;


        lines.forEach((line, index) => {
            // Calculate the distance from the center
            const deltaX = mouseX - (containerWidth / 2);
            const deltaY = mouseY - (containerHeight / 2);

            // Scale the translation based on the distance and line index
            const translateX = deltaX * ((index + 1) * MOUSE_MULTIPLIER) * MOUSE_SENSITIVITY;
            const translateY = deltaY * ((index + 1) * MOUSE_MULTIPLIER) * MOUSE_SENSITIVITY;

            // Animate the line's position with GSAP
            gsap.to(line, {
                duration: MOVE_DURATION,
                ease: MOVE_EASING,
                x: translateX,
                y: translateY,
                overwrite: "auto"
            });
        });
    };

    // Устанавливаем параметры
    link.href = href;
    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);
    link.addEventListener('mousemove', handleMouseMove); // Add mousemove listener
    link.setAttribute('aria-label', hoverText);
    link.innerHTML = icon;

    return linkContainer;
}