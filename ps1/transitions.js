

function transition(e, page) {
    e.parentElement.parentElement.classList.add('transition-out');
    const pages = [document.getElementById('home'), document.getElementById('contact'), document.getElementById('friends'), document.getElementById('music')]

    setTimeout(() => {
        e.parentElement.parentElement.classList.remove('active')
        e.parentElement.parentElement.classList.remove('active')
        e.parentElement.parentElement.classList.remove('transition-in')
        console.log(pages[page])
        pages[page].classList.remove('transition-out')
        pages[page].classList.add('transition-in')
        pages[page].classList.add('active')
    }, 300);
}