import { ScrollWheel } from "s/components/ScrollWheel/ScrollWheel.js";
import { createChangeBgCard } from "s/components/ChangeBackgroundCard/ChangeBackgroundCard.js";
import { createNavigationTabsMenu } from "s/components/NavigationTabsMenu/NavigationTabsMenu.js";
import { createFilmsContent } from "s/components/NavigationTabsContent/NavigationTabsContent.js";

document.addEventListener("DOMContentLoaded", function() {

    const threeSMContainer = document.getElementById('s-m-all-container');

    // Карточки
    const threeSpiderSectionCardsData = [
        {
            title: 'Человек-паук',
            description: 'Трилогия с Тоби Магуайером',
            titleBackgroundColor: "var(--red-3)",
            hoverBackgroundImg: '/img/s-m-1.png'
        },
        {
            title: 'Новый Человек-паук',
            description: 'Два фильма с Эндрю Гарфилдом',
            titleBackgroundColor: "var(--red-2)",
            hoverBackgroundImg: '/img/s-m-2.png'
        },
        {
            title: 'Человек-паук',
            description: 'Трилогия с Томом Холландом',
            titleBackgroundColor: "var(--red-1)",
            hoverBackgroundImg: '/img/s-m-3.png'
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
    const filmsSM1data = [
        {
            title: "Человек-Паук 2002",
            description: "Первая часть легендарной классики о дружелюбном соседе",
            titleImg: "/img/s-m-1-spider.png",
            titleBackgroundColor: "var(--vinous-black)",
            hoverBackground: "var(--red-blue-gradient)",
        },
        {
            title: "Человек-Паук 2 2004",
            description: "Вторая часть легендарной классики о дружелюбном соседе",
            titleImg: "/img/s-m-1-spider.png",
            titleBackgroundColor: "var(--vinous-black)",
            hoverBackground: "var(--red-blue-gradient)",
        },
        {
            title: "Человек-Паук 3 Враг в отражении",
            description: "Третья и последняя часть легендарной классики о дружелюбном соседе",
            titleImg: "/img/s-m-1-spider.png",
            titleBackgroundColor: "var(--vinous-black)",
            hoverBackground: "var(--red-blue-gradient)",
        }
    ]
    const navigationTabsMenuItemsSM1 = [
        {
            title: 'Фильмы',
            content: createFilmsContent(filmsSM1data)
        },
        {
            title: 'Люди',
            content: null
        },
        {
            title: 'Интересные факты',
            content: null
        }
    ]

    const navigationTabsData = [
        {
            menuContainer: null,
            contentContainer: null,
            tabsData: navigationTabsMenuItemsSM1
        },
        // {
        //     menuContainer: null,
        //     contentContainer: null,
        //     tabsData: null
        // },
        // {
        //     menuContainer: null,
        //     contentContainer: null,
        //     tabsData: null
        // }
    ]

    const navigationTabsMenuContainers = document.querySelectorAll('.navigation-tabs-menu-container');
    const navigationTabsContentContainers = document.querySelectorAll('.navigation-tabs-content-container');

    navigationTabsMenuContainers.forEach((navigationTabsMenuContainer, index) => {
        navigationTabsData[index].menuContainer = navigationTabsMenuContainer;
    })
    navigationTabsContentContainers.forEach((navigationTabsContentContainer, index) => {
        navigationTabsData[index].contentContainer = navigationTabsContentContainer;
    })

    navigationTabsData.forEach(data => {
        createNavigationTabsMenu(data.menuContainer, data.contentContainer, data.tabsData);
    })

});