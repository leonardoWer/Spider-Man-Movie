import {LinkBase} from 's/components/Links/LinkBase.js';
import styles from './CircleLink.module.css';

export function CircleLink({href}) {
    const link = LinkBase({href: href});
    link.classList.add(styles.circleLink);
    link.innerHTML = `
        <i class="fa-solid fa-up-right-from-square ${styles.arrow}" aria-hidden="true"></i>
    `

    return link;
}