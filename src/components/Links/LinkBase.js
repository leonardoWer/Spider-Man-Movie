export function LinkBase({ text, href, target = '_blank' }) {
    const link = document.createElement('a');
    text ? link.textContent = text : '';
    href ? link.href = href : '';
    link.target = target; // _blank, _self и т.д.
    return link;
}