import styles from './NavigationTabsMenu.module.css';

export function createNavigationTabsMenu(navigationTabsMenuContainer, navigationTabsContentContainer, tabsData) {
    navigationTabsMenuContainer.classList.add(styles.navigation);

    const list = document.createElement('ul');
    list.classList.add(styles.navigationList);

    let activeItemIndex = 0;
    let activeElement = null;

    function createMenuItem(text, index) {
        const listItem = document.createElement('li');
        listItem.classList.add(styles.navigationItem);
        listItem.textContent = text;
        listItem.dataset.index = index;

        listItem.addEventListener('mouseover', () => {
            if (index !== activeItemIndex) {
                moveHoverElement(index);
            }
        });

        listItem.addEventListener('mouseout', () => {
            resetHoverElement();
        });

        listItem.addEventListener('click', () => {
            setActive(index);
        });

        list.appendChild(listItem);

        if (index === activeItemIndex) {
            activeElement = listItem;
            listItem.classList.add(styles.active);
        }
    }

    function createContent(contentElement, index) {
        if (index !== activeItemIndex) {
            contentElement.classList.add(styles.hideContent)
        }
        navigationTabsContentContainer.appendChild(contentElement);
    }

    tabsData.forEach((tabData, index) => {
        createMenuItem(tabData.title, index);
        tabData.content ? createContent(tabData.content, index) : '';
    });

    navigationTabsMenuContainer.appendChild(list);

    // Create the active element and position it
    const activeElementWrapper = document.createElement('div');
    activeElementWrapper.classList.add(styles.activeElementWrapper);

    // Create the hover element
    const hoverElementWrapper = document.createElement('div');
    hoverElementWrapper.classList.add(styles.hoverElementWrapper);

    // Wait for the activeElement to be attached to the DOM to get its offsetWidth and offsetLeft
    requestAnimationFrame(() => {
        activeElementWrapper.style.width = activeElement.offsetWidth + 'px';
        activeElementWrapper.style.left = activeElement.offsetLeft + 'px';

        hoverElementWrapper.style.width = activeElement.offsetWidth + 'px';
        hoverElementWrapper.style.left = activeElement.offsetLeft + 'px';
    });

    navigationTabsMenuContainer.appendChild(activeElementWrapper);
    navigationTabsMenuContainer.appendChild(hoverElementWrapper);

    function setActive(newIndex) {
        if (newIndex === activeItemIndex) {
            return;
        }

        const oldActiveMenuItem = list.querySelector(`.${styles.navigationItem}.${styles.active}`);
        oldActiveMenuItem.classList.remove(styles.active);

        const newActiveMenuItem = list.querySelector(`.${styles.navigationItem}[data-index="${newIndex}"]`);
        newActiveMenuItem.classList.add(styles.active);

        try {
            const oldContentElement = navigationTabsContentContainer.children[activeItemIndex];
            oldContentElement.classList.add(styles.hideContent);
            const newContentElement = navigationTabsContentContainer.children[newIndex];
            newContentElement.classList.remove(styles.hideContent);
        } catch (error) {}

        // Move the active element smoothly
        activeElementWrapper.style.left = newActiveMenuItem.offsetLeft + 'px';
        activeElementWrapper.style.width = newActiveMenuItem.offsetWidth + 'px';
        hoverElementWrapper.style.left = newActiveMenuItem.offsetLeft + 'px';
        hoverElementWrapper.style.width = newActiveMenuItem.offsetWidth + 'px';

        activeItemIndex = newIndex;
    }

    function moveHoverElement(newIndex) {
        const newHover = list.querySelector(`.${styles.navigationItem}[data-index="${newIndex}"]`);
        newHover.classList.add(styles.hovered);
        hoverElementWrapper.style.left = newHover.offsetLeft + 'px';
        hoverElementWrapper.style.width = newHover.offsetWidth + 'px';
    }

    function resetHoverElement() {
        const active = list.querySelector(`.${styles.navigationItem}[data-index="${activeItemIndex}"]`);
        const navigationItems = list.querySelectorAll(`.${styles.navigationItem}`);
        navigationItems.forEach(item => item.classList.remove(styles.hovered));
        hoverElementWrapper.style.left = active.offsetLeft + 'px';
        hoverElementWrapper.style.width = active.offsetWidth + 'px';
    }
}