function transition(e, page) {
    e.parentElement.parentElement.classList.add('transition-out');
    const pages = [document.getElementById('home'), document.getElementById('contact'), document.getElementById('friends'), document.getElementById('music'), document.getElementById('websites')]

    setTimeout(() => {
        e.parentElement.parentElement.classList.remove('active')
        e.parentElement.parentElement.classList.remove('active')
        e.parentElement.parentElement.classList.remove('transition-in')
        pages[page].classList.remove('transition-out')
        pages[page].classList.add('transition-in')
        pages[page].classList.add('active')
        if (page === 3 || page === 4) {
            let iframes = pages[page].getElementsByTagName('iframe')
            for (let i = 0; i < iframes.length; i++) {
                iframes[i].src = iframes[i].src
            }
        }
    }, 300);
}