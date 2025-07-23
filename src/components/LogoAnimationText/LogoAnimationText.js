import gsap from 'gsap';
import styles from './LogoAnimationText.module.css';

const IMG_BASE_URL = "img/";

export function LogoAnimationText() {
    const contentContainerElement = document.createElement('div');
    contentContainerElement.classList.add(styles.contentContainer);

    const kinoContainerElement = document.createElement('div');
    kinoContainerElement.classList.add(styles.kinoTextContainer);

    const textElement = document.createElement('div');
    textElement.className = styles.text;
    textElement.id = 'text';

    const imageContainer = document.createElement('div');
    imageContainer.className = styles['image-container'];
    imageContainer.id = 'image-container';

    const images = [
        'movies/s-m-1-1.png',
        'movies/sm-1-2.jpg',
        'movies/sm-1-3.jpg',
        'movies/sm-2-1.jpg',
        'movies/s-m-2-2.jpeg',
        'movies/s-m-3-1.png',
        'movies/s-m-3-2.png',
        'movies/sm-3-3.jpg',
    ];

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = IMG_BASE_URL + src;
        img.alt = 'logo-img';
        img.className = styles.image;
        img.style.opacity = 0; // Изначально невидимые
        imageContainer.appendChild(img);
    });

    const letterO = document.createElement('span');
    letterO.className = styles['letter-o'];
    letterO.id = 'letter-o';
    letterO.textContent = 'О';

    kinoContainerElement.appendChild(textElement);
    kinoContainerElement.appendChild(imageContainer);
    kinoContainerElement.appendChild(letterO);
    contentContainerElement.appendChild(kinoContainerElement);

    // Анимация
    const imageSwitchInterval = 300;
    const animationDuration = 1;

    let currentImageIndex = 0;
    let intervalId;
    const imageElements = imageContainer.querySelectorAll(`.${styles.image}`);
    const fullText = "КИН";

    const switchImage = () => {
        gsap.to(imageElements[currentImageIndex], { opacity: 0, duration: 0.5 });
        currentImageIndex = (currentImageIndex + 1) % imageElements.length;
        gsap.to(imageElements[currentImageIndex], { opacity: 1, duration: 0.5 });
    };

    const startAnimation = () => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) { // Проверяем, что индекс в пределах строки
                textElement.textContent += fullText[i];
                i++;
            } else {
                clearInterval(typingInterval); // Останавливаем печатание
                animateImage();
            }
        }, 200);
    };

    const animateImage = () => {
        gsap.to(imageContainer, {
            duration: animationDuration,
            width: textElement.offsetHeight * 0.8,
            ease: "power2.inOut",
            onStart: () => {
                imageContainer.style.display = 'block';
                imageContainer.style.left = `${textElement.offsetWidth * 1.03}px`; // Позиционируем картинку после "Н"
                gsap.to(imageElements[0], { opacity: 1, duration: 0 });
                intervalId = setInterval(switchImage, imageSwitchInterval);
            },
            onComplete: () => {
                setTimeout(() => {
                    clearInterval(intervalId);
                    gsap.to(imageContainer, {
                        duration: animationDuration,
                        width: 0,
                        ease: "power2.inOut",
                        onComplete: () => {
                            imageContainer.style.display = 'none';
                            letterO.style.display = 'inline';
                            gsap.fromTo(letterO, { opacity: 0 }, { opacity: 1, duration: animationDuration });
                            addSpiderManText();
                        },
                    });
                }, imageSwitchInterval * images.length);
            },
        });
    };

    const addSpiderManText = () => {
        const spiderManContainer = document.createElement('div');
        spiderManContainer.classList.add(styles['spider-man-container']);

        const spiderManText = "Человек-Паук";

        // Создаем span для каждой буквы
        for (let i = 0; i < spiderManText.length; i++) {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = spiderManText[i];
            letterSpan.classList.add(styles['spider-man-letter']);
            spiderManContainer.appendChild(letterSpan);
        }

        contentContainerElement.appendChild(spiderManContainer);

        // Анимация для каждой буквы
        gsap.fromTo(
            spiderManContainer.querySelectorAll(`.${styles['spider-man-letter']}`),
            {
                yPercent: 100, // Начинаем снизу (100% от высоты буквы)
                opacity: 0
            },
            {
                yPercent: 0,   // Поднимаем наверх (до исходной позиции)
                opacity: 1,
                duration: 0.8,
                stagger: 0.05, // Задержка между буквами
                ease: "power3.out",
                delay: 0.5 // Общая задержка перед началом анимации
            }
        );
    };


    letterO.style.display = 'none';
    imageContainer.style.display = 'none';

    // Анимация только тогда, когда компонент виден
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation();
                observer.unobserve(contentContainerElement); // Останавливаем наблюдение после запуска
            }
        });
    });

    observer.observe(contentContainerElement); // Наблюдаем за contentContainerElement

    // Очистка интервала при переходе на другую страницу
    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
    });

    return(contentContainerElement);
}