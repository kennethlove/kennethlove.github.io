const tlite = require('tlite');

const classWhen = (el) => {
    let classes = (el.className || '').split(' ');
    return function (cssClass, opts) {
        return ~classes.indexOf(cssClass) && opts;
    }
}

const focusTooltips = () => {
    let posts = document.querySelectorAll('.post-nav-item');
    for (const post of posts) {
        post.addEventListener('focus', () => {
            tlite.show(post, { grav: 'e' });
        });
        post.addEventListener('blur', () => {
            tlite.hide(post);
        });
    }
}

tlite((el) => {
    let when = classWhen(el);
    return when('post-nav-item', {grav: 'e'})
});
focusTooltips();