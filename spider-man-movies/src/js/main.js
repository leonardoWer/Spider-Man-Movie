import { ScrollWheel } from "s/components/ScrollWheel/ScrollWheel.js";
import { createChangeBgCard } from "s/components/ChangeBackgroundCard/ChangeBackgroundCard.js";
import { createNavigationTabsMenu } from "s/components/NavigationTabsMenu/NavigationTabsMenu.js";
import { createFilmsContent, createPersonsContent } from "s/components/NavigationTabsContent/NavigationTabsContent.js";
import { PersonCard } from "s/components/PersonCard/PersonCard.js";

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

    const navigationTabsData = getTabsMenuData();
    navigationTabsData.forEach(data => {
        createNavigationTabsMenu(data.menuContainer, data.contentContainer, data.tabsData);
    })

});


function getTabsMenuData() {
    // Списки
    const filmsData_SM1 = [
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
    ];
    const personsData_SM1 = [
        {
            name: "Тоби Магуайер",
            title: "Питер Паркер",
            img: "/img/s-m-1.png",
        },
        {
            name: "Мэри Джейн",
            title: "Кирстен Данст",
            img: "/img/s-m-1.png",
        }
    ];
    const navigationTabsMenuItems_SM1 = [
        {
            title: 'Фильмы',
            content: createFilmsContent(filmsData_SM1)
        },
        {
            title: 'Люди',
            content: createPersonsContent(personsData_SM1)
        },
        {
            title: 'Интересные факты',
            content: null
        }
    ];

    // Второй ЧП
    const filmsData_SM2 = [
        {
            title: "Новый Человек-паук 2012",
            description: "Попытка Sony создать новую киновселенную",
            titleImg: "/img/s-m-2-spider.png",
            titleBackgroundColor: "var(--vinous-black)",
            hoverBackground: "var(--dark-red-gradient)",
        },
        {
            title: "Новый Человек-паук: Высокое напряжение 2014",
            description: "Продолжение душераздирающей дилогии про Питера Паркера",
            titleImg: "/img/s-m-2-spider.png",
            titleBackgroundColor: "var(--vinous-black)",
            hoverBackground: "var(--dark-red-gradient)",
        },
    ];

    const personsData_SM2 = [
        {
            name: "Эндрю Гарфилд",
            title: "Питер Паркер",
            img: "/img/s-m-2.png",
        },
        {
            name: "Эмма Стоун",
            title: "Гвен Стейси",
            img: "/img/s-m-2.png",
        },
    ];

    const navigationTabsMenuItems_SM2 = [
        {
            title: 'Фильмы',
            content: createFilmsContent(filmsData_SM2)
        },
        {
            title: 'Люди',
            content: createPersonsContent(personsData_SM2)
        },
        {
            title: 'Интересные факты',
            content: null
        }
    ];

    const filmsData_SM3 = [
        {
            title: "Человек-паук: Возвращение домой",
            description: "Фильм про паука №3",
            titleImg: "/img/s-m-3-spider.png",
            titleBackgroundColor: "var(--vinous-black)",
            hoverBackground: "var(--light-red-gradient)",
        },
        {
            title: "Человек-паук: Вдали от дома",
            description: "Второй фильм с Томом Холландом",
            titleImg: "/img/s-m-3-spider.png",
            titleBackgroundColor: "var(--vinous-black)",
            hoverBackground: "var(--light-red-gradient)",
        },
        {
            title: "Человек-паук: Нет пути домой",
            description: "Третий фильм с Томом Холландом и мультивселенной",
            titleImg: "/img/s-m-3-spider.png",
            titleBackgroundColor: "var(--vinous-black)",
            hoverBackground: "var(--light-red-gradient)",
        },
    ];

    const personsData_SM3 = [
        {
            name: "Том Холланд",
            title: "Питер Паркер",
            img: "/img/tom-holland.png",
        },
        {
            name: "Зендая",
            title: "ЭмДжей",
            img: "/img/zendaya.png",
        },
        {
            name: "Джон Уоттс",
            title: "Режиссёр",
            img: "/img/jon-watts.png",
        },
    ];

    const navigationTabsMenuItems_SM3 = [
        {
            title: 'Фильмы',
            content: createFilmsContent(filmsData_SM3)
        },
        {
            title: 'Люди',
            content: createPersonsContent(personsData_SM3)
        },
        {
            title: 'Интересные факты',
            content: null
        }
    ];

    const allTabData = [
        navigationTabsMenuItems_SM1,
        navigationTabsMenuItems_SM2,
        navigationTabsMenuItems_SM3,
    ]

    // Get elements from DOM
    const navigationTabsMenuContainers = document.querySelectorAll('.navigation-tabs-menu-container');
    const navigationTabsContentContainers = document.querySelectorAll('.navigation-tabs-content-container');

    // Build the data structure
    return Array.from({ length: navigationTabsMenuContainers.length }, (_, index) => ({
        menuContainer: navigationTabsMenuContainers[index] || null,
        contentContainer: navigationTabsContentContainers[index] || null,
        tabsData: allTabData[index] || null
    }));
}