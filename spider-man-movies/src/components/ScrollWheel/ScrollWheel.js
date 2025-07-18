import styles from './ScrollWheel.module.css';

export function ScrollWheel(parentContainer, scrollWheelNumber) {
    let wheelElement;
    let wheelItemsList;
    let titleElement;
    let descriptionElement;

    let numberOfDots = 4;
    let currentActivePointIndex = 0; // Активная точка(отображается над колесом)
    scrollWheelNumber - 1 < 0 ? currentActivePointIndex = 0 : currentActivePointIndex = scrollWheelNumber - 1;

    const pointData = [
        { number: 0, title: "Название для точки 0", description: "Контент для точки 0" },
        { number: 1, title: "Название для точки 1", description: "Контент для точки 1" },
        { number: 2, title: "Название для точки 2", description: "Контент для точки 2" },
        { number: 3, title: "Название для точки 3", description: "Контент для точки 3" },
    ];

    const rotationStep = 72;
    let rotation = -currentActivePointIndex * rotationStep; // Текущий угол поворота колеса в градусах

    const scrollSensitivity = 0.0689;
    let scrollingDirection = 0; // 0: none, 1: down, -1: up

    let isWheelActive = false;
    let isNextPointScrolled = false;

    // Обсервер для состояния прокрутки
    const parentContainerViewThreshold = 0.8;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                isWheelActive = entry.isIntersecting && entry.intersectionRatio >= parentContainerViewThreshold;
            });
        },
        {
            root: null,
            threshold: parentContainerViewThreshold,
        }
    );

    // Начинаем наблюдение за элементом сразу после инициализации Observer
    if (parentContainer) {
        observer.observe(parentContainer);
    }

    // Function to handle scroll event
    function handleScroll(event) {
        if (isWheelActive && !isNextPointScrolled) {
            // Скроллим как надо
            const parentRect = parentContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            let targetScrollTop = parentRect.bottom + window.pageYOffset - windowHeight;

            window.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth',
            });

            // Prevent page scroll
            event.preventDefault();

            let delta = event.deltaY; // Вращение колеса мыши
            scrollingDirection = delta > 0 ? 1 : -1; // 1: down, -1: up

            // Потенциальный новый угол поворота, который получится, если применить текущую прокрутку.
            let newRotation = rotation - delta * scrollSensitivity;
            console.log("Потенциальный новый угол поворота", newRotation);

            if (scrollingDirection === 1) { // Scrolling down
                // угол, соответствующий следующей точке
                const nextActivePointCorner = -(currentActivePointIndex * rotationStep + rotationStep);
                console.log("nextActivePointCorner", nextActivePointCorner)

                // Если при прокрутке к следующей точке угол поворота дальше чем точка, обновляем флаг
                isNextPointScrolled = newRotation <= nextActivePointCorner;
                console.log("Достигнута ли сл точка:", isNextPointScrolled)
                // Если следующая точка достигается
                if (isNextPointScrolled) {
                    // Ограничивает newRotation так, чтобы он не мог быть больше угла следующей
                    newRotation = nextActivePointCorner;

                    // Обновляем текущий ActivePointIndex
                    let newIndex = Math.abs(Math.round(rotation / rotationStep) % numberOfDots);
                    if (newIndex !== currentActivePointIndex) {
                        currentActivePointIndex = newIndex;
                        updateUI();
                    }
                }

            }
            // else if (scrollingDirection === -1) { // Scrolling up
            //     isNextPointScrolled = newRotation <= currentActivePointIndex * rotationStep - rotationStep;
            //     newRotation = Math.max(newRotation, currentActivePointIndex * rotationStep - rotationStep); // Limit to previous point
            // }

            rotation = newRotation; // Запоминаем новый поворот колеса

            wheelElement.style.transform = `rotate(${rotation}deg)`;
            console.log("Степень прокрутки колеса", wheelElement.style.transform)

        }
    }

    function updateUI() {
        // Сбрасываем стили для всех элементов
        for (let i = 0; i < numberOfDots; i++) {
            const wheelItem = wheelItemsList.children[i];
            const dot = wheelItem.querySelector(`.${styles.wheelItem__dot}`);
            const descriptionContainer = wheelItem.querySelector(`.${styles.wheelItem__descriptionContainer}`);

            dot.classList.remove(styles.active);
            descriptionContainer.classList.remove(styles.active); // Hide content by default
        }

        // Применяем стили для активного элемента
        const activeItem = wheelItemsList.children[currentActivePointIndex];
        const activeDot = activeItem.querySelector(`.${styles.wheelItem__dot}`);
        const activeDescriptionContainer = activeItem.querySelector(`.${styles.wheelItem__descriptionContainer}`);

        activeDot.classList.add(styles.active);
        activeDescriptionContainer.classList.add(styles.active); // Show active content
    }

    function createWheel() {
        // Контейнер для колеса
        const wheelContainer = document.createElement('div');
        wheelContainer.classList.add(styles.wheelContainer);

        const wheelHeight = document.createElement('div');
        wheelHeight.classList.add(styles.wheelHeight);

        // Колесо
        wheelElement = document.createElement('div');
        wheelElement.classList.add(styles.wheel);
        wheelElement.style.transform = `rotate(-${currentActivePointIndex * rotationStep}deg)`;
        console.log("Степень прокрутки колеса", scrollWheelNumber, wheelElement.style.transform);

        // Create the circle wrapper
        const circleListWrapper = document.createElement('div');
        circleListWrapper.classList.add(styles.wheelItemsListWrapper);

        // Список с элементами колеса
        wheelItemsList = document.createElement('div');
        wheelItemsList.classList.add(styles.wheelItemsList);
        wheelItemsList.setAttribute('role', 'list');

        // Добавляем точки
        for (let i = 0; i < numberOfDots; i++) {
            const wheelItem = document.createElement('div');
            wheelItem.classList.add(styles.wheelItem);

            const numberContainer = document.createElement('div');
            numberContainer.classList.add(styles.wheelItem__numberContainer);

            const number = document.createElement('p');
            number.classList.add(styles.wheelItem__number);
            number.textContent = i;

            const dot = document.createElement('div');
            dot.classList.add(styles.wheelItem__dot);

            numberContainer.appendChild(number);
            numberContainer.appendChild(dot);

            const descriptionContainer = document.createElement('div');
            descriptionContainer.classList.add(styles.wheelItem__descriptionContainer);

            const line = document.createElement('div');
            line.classList.add(styles.wheelItem__line);

            const textContainer = document.createElement('div');
            textContainer.classList.add(styles.wheelItem__textContainer)

            titleElement = document.createElement('h4');
            titleElement.classList.add(styles.wheelItem__title);
            titleElement.textContent = pointData[i].title;

            descriptionElement = document.createElement('p');
            descriptionElement.classList.add(styles.wheelItem__description);
            descriptionElement.textContent = pointData[i].description;

            textContainer.appendChild(titleElement);
            textContainer.appendChild(descriptionElement);

            descriptionContainer.appendChild(line);
            descriptionContainer.appendChild(textContainer);

            wheelItem.appendChild(numberContainer);
            wheelItem.appendChild(descriptionContainer);
            wheelItem.style.transform = `rotate(${i * rotationStep}deg)`;

            wheelItemsList.appendChild(wheelItem);
        }

        // Append items
        circleListWrapper.appendChild(wheelItemsList);
        wheelElement.appendChild(circleListWrapper);

        wheelHeight.appendChild(wheelElement)
        wheelContainer.appendChild(wheelHeight);
        parentContainer.appendChild(wheelContainer);
    }

    // Создаём колесо
    createWheel();
    updateUI();
    window.addEventListener('wheel', handleScroll, { passive: false }); // Add scroll event listener

    return () => {
        window.removeEventListener('wheel', handleScroll);
    };
}