import { ScrollWheel } from "s/components/ScrollWheel/ScrollWheel.js";
import { createChangeBgCard } from "s/components/ChangeBackgroundCard/ChangeBackgroundCard.js";
import { createNavigationTabsMenu } from "s/components/NavigationTabsMenu/NavigationTabsMenu.js";

document.addEventListener("DOMContentLoaded", function() {

    const threeSMContainer = document.getElementById('s-m-all-container');

    // Карточки
    const threeSpiderSectionCardsData = [
        {
            backgroundColor: "var(--red-3)",
            title: 'Человек-паук',
            description: 'Трилогия с Тоби Магуайером',
            backgroundImageUrl: '/img/s-m-1.png'
        },
        {
            backgroundColor: "var(--red-2)",
            title: 'Новый Человек-паук',
            description: 'Два фильма с Эндрю Гарфилдом',
            backgroundImageUrl: '/img/s-m-2.png'
        },
        {
            backgroundColor: "var(--red-1)",
            title: 'Человек-паук',
            description: 'Трилогия с Томом Холландом',
            backgroundImageUrl: '/img/s-m-3.png'
        }
    ];

    threeSpiderSectionCardsData.forEach(data => {
        const card = createChangeBgCard(data);
        threeSMContainer.appendChild(card);
    });

    // Колёса
    const wheelParentContainers = document.querySelectorAll('.scroll-wheel-container');
    wheelParentContainers.forEach(parentContainer => {
        const wheelNumber = parentContainer.dataset.number;
        ScrollWheel(parentContainer, wheelNumber);
    })

    // Табы навигации
    const navigationTabsMenuItems = ['Фильмы', 'Люди', 'Интересные факты'];

    const navigationTabsMenuContainers = document.querySelectorAll('.navigation-tabs-menu-container');
    navigationTabsMenuContainers.forEach(navigationTabsMenuItem => {
        createNavigationTabsMenu(navigationTabsMenuItem, navigationTabsMenuItems);
    })

});