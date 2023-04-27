function transition(e) {
    e.parentElement.parentElement.classList.add('transition-out');

    setTimeout(() => {
        e.parentElement.parentElement.classList.remove('active')
        e.parentElement.parentElement.classList.remove('active')
        e.parentElement.parentElement.classList.remove('transition-in')
        document.getElementById('contact').classList.add('transition-in')
        document.getElementById('contact').classList.add('active')

    }, 300);
}