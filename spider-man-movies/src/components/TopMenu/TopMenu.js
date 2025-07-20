import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import styles from './TopMenu.module.css';

gsap.registerPlugin(ScrollToPlugin);

export function TopMenu() {
    let logoText;
    let menuButton;
    let mainMenuBg;
    let menuItems;
    let isMenuOpen = false;

    // Функция для создания HTML структуры
    function render(parent) {
        parent.innerHTML = `
        <div class="${styles['top-menu__left']}">
            <span class="${styles['smm-logo']}">SMM</span>
        </div>

        <div class="${styles['top-menu__right']}">
            <button class="${styles['menu-button']}">
                <span class="${styles['menu-button-item']}"></span>
                <span class="${styles['menu-button-item']}"></span>
                <span class="${styles['menu-button-item']}"></span>
            </button>

            <div class="${styles['main-menu-bg']}">
                <nav class="${styles['main-menu__inner']}">
                    <ul class="${styles['main-menu-inner__pages-list']}">
                      <li class="${styles['m-m-i-p-l__item']}">
                          <a href="/" class="${styles['menu-link']}">home</a>
                      </li>
                      <li class="${styles['m-m-i-p-l__item']}">
                          <a href="#s-m-1-section" class="${styles['menu-link']}" data-scroll-to="s-m-1-section">Spider-Man 1</a>
                      </li>
                      <li class="${styles['m-m-i-p-l__item']}">
                          <a href="#s-m-2-section" class="${styles['menu-link']}" data-scroll-to="s-m-2-section">Spider-Man 2</a>
                      </li>
                      <li class="${styles['m-m-i-p-l__item']}">
                          <a href="#s-m-3-section" class="${styles['menu-link']}" data-scroll-to="s-m-3-section">Spider-Man 3</a>
                      </li>
                      <li class="${styles['m-m-i-p-l__item']}">
                          <a href="/about" class="${styles['menu-link']}">about</a>
                      </li>
                  </ul>

                  <ul class="${styles['main-menu-inner__contacts-list']}">
                      <li class="${styles['m-m-i-c-l__item']}">
                          <a href="https://vk.com/leonardo_Wer" target="_blank" rel="noopener noreferrer" class="${styles['menu-link']}">vk</a>
                      </li>
                      <li class="${styles['m-m-i-c-l__item']}">
                          <a href="https://t.me/leonardo_Wer" target="_blank" rel="noopener noreferrer" class="${styles['menu-link']}">tg</a>
                      </li>
                      <li class="${styles['m-m-i-c-l__item']}">
                          <a href="https://github.com/leonardoWer" target="_blank" rel="noopener noreferrer" class="${styles['menu-link']}">git</a>
                      </li>
                      <li class="${styles['m-m-i-c-l__item']}">
                          <a href="https://github.com/leonardoWer/Portfolio_Levakhin_Lev" target="_blank" rel="noopener noreferrer" class="${styles['menu-link']}">portfolio</a>
                      </li>
                  </ul>

                </nav>
            </div>
        </div>
    `;
    }

    // Функция для инициализации обработчиков событий и GSAP
    function init(parent) {
        logoText = parent.querySelector(`.${styles['smm-logo']}`);
        menuButton = parent.querySelector(`.${styles['menu-button']}`);
        mainMenuBg = parent.querySelector(`.${styles['main-menu-bg']}`);
        menuItems = parent.querySelectorAll(`.${styles['m-m-i-l__item']}`);

        menuButton.addEventListener('click', toggleMenu);
        gsap.set(mainMenuBg, { yPercent: -100 });

        // Добавляем обработчик для прокрутки
        const scrollLinks = parent.querySelectorAll('[data-scroll-to]');
        scrollLinks.forEach(link => {
            link.addEventListener('click', handleScroll);
        });
    }

    // Функция для переключения состояния меню
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }
    // Функция для открытия меню
    function openMenu() {
        gsap.to(mainMenuBg, {
            yPercent: 0,
            duration: 0.5,
            ease: 'power3.out',
        });
        logoText.classList.add(styles['smm-logo--active']);
        menuButton.classList.add(styles['menu-button--active']);
    }
    // Функция для закрытия меню
    function closeMenu() {
        gsap.to(mainMenuBg, {
            yPercent: -100,
            duration: 0.5,
            ease: 'power3.in',
        });
        logoText.classList.remove(styles['smm-logo--active']);
        menuButton.classList.remove(styles['menu-button--active']);
    }

    function handleScroll(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение ссылки

        const targetId = event.currentTarget.dataset.scrollTo;
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            gsap.to(window, {
                duration: 0.8,
                scrollTo: { y: targetElement.offsetTop}, // offsetY для небольшого отступа
                ease: 'power3.inOut',
                onComplete: toggleMenu // Закрываем меню после прокрутки
            });
        }
        if (isMenuOpen) {
            closeMenu();
        }
    }

    // Инициализация компонента
    const topMenu = document.createElement('div');
    topMenu.classList.add(styles['top-menu']);
    render(topMenu); // Добавляем внутрь контент
    init(topMenu); // Анимации и логика

    return topMenu;
}