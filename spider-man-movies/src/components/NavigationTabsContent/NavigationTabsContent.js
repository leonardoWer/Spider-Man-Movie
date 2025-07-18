import styles from './NavigationTabsContent.module.css';
import {createChangeBgCard} from 's/components/ChangeBackgroundCard/ChangeBackgroundCard.js';

export function createFilmsContent(filmsInfoData) {
    const filmsContainer = document.createElement('div');
    filmsContainer.className = 'change-bg-cards-container'

    filmsInfoData.forEach(item => {
        const card = createChangeBgCard({
            backgroundColor: 'transparent',
            titleImg: item.titleImg,
            title: item.title,
            description: item.description,
            backgroundImageUrl: item.backgroundImg,
        });

        filmsContainer.appendChild(card);
    });

    return filmsContainer;
}