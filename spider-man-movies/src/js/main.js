import { ScrollWheel } from "s/components/ScrollWheel/ScrollWheel.js";
import { createChangeBgCard } from "s/components/ChangeBackgroundCard/ChangeBackgroundCard.js";

document.addEventListener("DOMContentLoaded", function() {

    const threeSMContainer = document.getElementById('s-m-all-container');

    // Пример данных для карточек
    const cardData = [
        {
            title: 'Beratung',
            description: 'Persönlich, kompetent und reaktionsschnell: Unsere Spezialistinnen und Spezialisten finden immer die passende Lösung.',
            backgroundImageUrl: '/img/s-m-bg.jpg'
        },
        {
            title: 'Strukturelles Design',
            description: 'Unser Verpackungstechnologe hilft Ihnen gerne, Ihre Idee in eine tragfähige Konstruktion zu verwandeln.',
            backgroundImageUrl: '/img/s-m-bg.jpg'
        },
        {
            title: 'Konfektionierung und Filialversand',
            description: 'Wir kommissionieren Ihre Kampagne filialgerecht, so dass jeder Empfänger exakt die Mengen erhält, die er benötigt.',
            backgroundImageUrl: '/img/s-m-bg.jpg'
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