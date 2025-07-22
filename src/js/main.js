import gsap from "gsap";
import {TopMenu} from "s/components/TopMenu/TopMenu.js";
import {ScrollWheel} from "s/components/ScrollWheel/ScrollWheel.js";
import {createChangeBgCard} from "s/components/ChangeBackgroundCard/ChangeBackgroundCard.js";
import {createNavigationTabsMenu} from "s/components/NavigationTabsMenu/NavigationTabsMenu.js";
import {createFilmsContent, createPersonsContent} from "s/components/NavigationTabsContent/NavigationTabsContent.js";
import {LogoAnimationText} from "s/components/LogoAnimationText/LogoAnimationText.js";
import {createContactLink} from "s/components/Links/ContactLink/ContactLink.js";

document.addEventListener("DOMContentLoaded", function () {
    // Верхнее меню
    const topMenuContainer = document.getElementById("top-menu-container");
    topMenuContainer.appendChild(TopMenu());

    // Хедер
    const headerLogoContainer = document.querySelector('.header-text-container');
    if (headerLogoContainer) {
        headerLogoContainer.appendChild(LogoAnimationText());
    }

    // Футер
    const footerLogoContainer = document.querySelector('.f-c-c__logo-container');
    if (footerLogoContainer) {
        footerLogoContainer.appendChild(LogoAnimationText());
    }

    const contactsLinkData = [
        { icon: 'tg', href: 'https://telegram.org/', hoverText: 'Visit my Telegram' },
        { icon: 'vk', href: 'https://vk.com/', hoverText: 'Visit my VK' },
        { icon: 'git', href: 'https://github.com/', hoverText: 'Visit my GitHub' },
        { icon: 'p', href: '#', hoverText: 'Visit my portfolio' },
    ]
    const footerContactsContainer = document.querySelector('.f-c-c__contacts-container');
    if (footerContactsContainer) {
        contactsLinkData.forEach(contactData => {
            footerContactsContainer.appendChild(createContactLink(contactData));
        })
    }

    // Карточки
    const threeSMContainer = document.getElementById('s-m-all-container');

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

    // Анимации
    initAnimations();

});


function initAnimations() {

    function initHoverText() {
        const hoverTexts = document.querySelectorAll('.hover__down-text');
        hoverTexts.forEach((hoverText) => {
            const letters = hoverText.querySelectorAll('span');

            hoverText.addEventListener('mouseenter', () => {
                gsap.to(letters, {
                    yPercent: 100,  // Сдвигаем буквы вниз на 100% высоты
                    stagger: 0.09,   // Задержка между буквами
                    duration: 0.3,
                    ease: "power2.in" // Функция easing (ускорение в начале)
                });
            });

            hoverText.addEventListener('mouseleave', () => {
                gsap.to(letters, {
                    yPercent: 0,    // Возвращаем буквы на исходную позицию
                    stagger: 0.05,   // Задержка между буквами
                    duration: 0.3,
                    ease: "power2.out" // Функция easing (замедление в конце)
                });
            });
        })
    }

    initHoverText();
}


function getTabsMenuData() {
    // Списки
    // ВАЖНО: При добавлении новых полей, не забыть добавить изменения в NavigationTabsContent
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
            img: "/img/persons/tobey.jpg",
            personLink: "https://tobey.com/",
        },
        {
            name: "Кирстен Данст",
            title: "Мэри Джейн",
            img: "/img/persons/kirsten.jpg",
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
            img: "/img/persons/andrew.jpg",
        },
        {
            name: "Эмма Стоун",
            title: "Гвен Стейси",
            img: "/img/persons/emma.jpg",
        },
        {
            name: "Марк Уэбб",
            title: "Режиссёр",
            img: "/img/persons/mark-uebb.png",
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
            img: "/img/persons/tom-holland.jpg",
        },
        {
            name: "Зендея",
            title: "ЭмДжей",
            img: "/img/persons/zendaya.jpg",
        },
        {
            name: "Джон Уоттс",
            title: "Режиссёр",
            img: "/img/persons/jon-watts.jpg",
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
    return Array.from({length: navigationTabsMenuContainers.length}, (_, index) => ({
        menuContainer: navigationTabsMenuContainers[index] || null,
        contentContainer: navigationTabsContentContainers[index] || null,
        tabsData: allTabData[index] || null
    }));
}