import styles from './ChangeBackgroundCard.module.css';

export function createChangeBgCard({ title, description, backgroundImageUrl, label, cardClass }) {
    // Создаем основной контейнер карточки
    const cardElement = document.createElement('div');
    cardElement.className = styles.card;

    // Если указан URL изображения, устанавливаем его как фоновое
    if (backgroundImageUrl) {
        cardElement.addEventListener('mouseover', () => {
            cardElement.style.backgroundImage = `url('${backgroundImageUrl}')`;
        })
        cardElement.addEventListener('mouseout', () => {
            cardElement.style.backgroundImage = 'none'
        })
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
    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);

    return cardElement;
}