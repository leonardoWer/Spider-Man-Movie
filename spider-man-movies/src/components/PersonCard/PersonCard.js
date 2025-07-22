import styles from './PersonCard.module.css';
import {CircleLink} from "s/components/Links/CircleLink/CircleLink.js";

export function PersonCard({ name, title, img, personLink }) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add(styles.personCard);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add(styles.personCard__imgContainer);

    const image = document.createElement('img');
    image.src = img;
    image.alt = name;
    image.classList.add(styles.personCard__image);

    imgContainer.appendChild(image);

    if (personLink) {
        const blur = document.createElement('div');
        blur.classList.add(styles.blur);

        const circleLink = CircleLink({href: personLink});
        circleLink.classList.add(styles.link);

        imgContainer.appendChild(blur);
        imgContainer.appendChild(circleLink);
    }

    cardDiv.appendChild(imgContainer);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add(styles.personCard__info);

    const heading = document.createElement('h2');
    heading.classList.add(styles.personCard__name);
    heading.textContent = name;

    const paragraph = document.createElement('p');
    paragraph.classList.add(styles.personCard__title);
    paragraph.textContent = title;

    infoDiv.appendChild(heading);
    infoDiv.appendChild(paragraph);

    cardDiv.appendChild(infoDiv);

    return cardDiv;
}