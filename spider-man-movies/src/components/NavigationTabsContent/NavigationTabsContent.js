import styles from './NavigationTabsContent.module.css';
import {createChangeBgCard} from 's/components/ChangeBackgroundCard/ChangeBackgroundCard.js';

export function createFilmsContent(filmsInfoData) {
    const filmsContainer = document.createElement('div');
    filmsContainer.className = 'change-bg-cards-container'

    filmsInfoData.forEach(item => {
        const card = createChangeBgCard({
            title: item.title,
            description: item.description,
            titleImg: item.titleImg,
            needHideTitleImg: item.needHideTitleImg,
            titleBackgroundColor: item.titleBackgroundColor,
            hoverBackground: item.hoverBackground,
        });

        filmsContainer.appendChild(card);
    });

    return filmsContainer;
}