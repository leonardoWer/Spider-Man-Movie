import styles from './ChangeBackgroundCard.module.css';
import {initMouseTarget} from "s/components/MouseTargetCard/MouseTargetCard.js";

export function createChangeBgCard({ backgroundColor, titleImg, title, description, backgroundImageUrl}) {
    // Создаем основной контейнер карточки
    const cardElement = document.createElement('div');
    cardElement.className = styles.card;

    const bgContainer = document.createElement('div');
    bgContainer.className = styles.bgContainer;
    bgContainer.style.backgroundColor = backgroundColor;

    if (titleImg) {
        const img = document.createElement('img');
        img.className = styles.titleImg;
        img.src = titleImg;
        img.alt = title + " spider";
        bgContainer.appendChild(img);
    }

    // Если указан URL изображения, устанавливаем его как фоновое
    if (backgroundImageUrl) {
        cardElement.style.backgroundImage = `url('${backgroundImageUrl}')`;
    }

    // Создаем элемент для заголовка
    const titleElement = document.createElement('h3');
    titleElement.className = styles.title;
    titleElement.textContent = title;

    // Создаем элемент для описания
    const descriptionElement = document.createElement('p');
    descriptionElement.className = styles.description;
    descriptionElement.textContent = description;

    // Добавляем заголовок и описание в карточку
    cardElement.appendChild(bgContainer);
    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);

    // Добавляем таргет от мыши
    initMouseTarget(cardElement);

    return cardElement;
}