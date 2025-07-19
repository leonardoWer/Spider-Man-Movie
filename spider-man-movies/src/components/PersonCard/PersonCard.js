import styles from './PersonCard.module.css';

export function PersonCard({ name, title, img }) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add(styles.personCard);

    const image = document.createElement('img');
    image.src = img;
    image.alt = name;
    image.classList.add(styles.personCard__image);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add(styles.personCard__info);

    const link = document.createElement('a');
    link.href = "#"; // Или ваша ссылка

    const heading = document.createElement('h2');
    heading.classList.add(styles.personCard__name);
    heading.textContent = name;
    link.appendChild(heading);

    const paragraph = document.createElement('p');
    paragraph.classList.add(styles.personCard__title);
    paragraph.textContent = title;

    infoDiv.appendChild(link);
    infoDiv.appendChild(paragraph);

    cardDiv.appendChild(image);
    cardDiv.appendChild(infoDiv);

    return cardDiv;
}