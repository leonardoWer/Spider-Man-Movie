import { ScrollWheel } from "s/components/ScrollWheel/ScrollWheel.js";
import { createChangeBgCard } from "s/components/ChangeBackgroundCard/ChangeBackgroundCard.js";

document.addEventListener("DOMContentLoaded", function() {

    const threeSMContainer = document.getElementById('s-m-all-container');

    // Пример данных для карточек
    const cardData = [
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

    cardData.forEach(data => {
        const card = createChangeBgCard(data);
        threeSMContainer.appendChild(card);
    });

    const wheelParentContainers = document.querySelectorAll('.scroll-wheel-container');
    wheelParentContainers.forEach(parentContainer => {
        const wheelNumber = parentContainer.dataset.number;
        ScrollWheel(parentContainer, wheelNumber);
    })

});