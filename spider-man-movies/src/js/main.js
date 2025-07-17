import { ScrollWheel } from "s/components/ScrollWheel/ScrollWheel.js";

document.addEventListener("DOMContentLoaded", function() {

    const wheelParentContainers = document.querySelectorAll('.scroll-wheel-container');
    wheelParentContainers.forEach(parentContainer => {
        const wheelNumber = parentContainer.dataset.number;
        ScrollWheel(parentContainer, wheelNumber);
    })

});