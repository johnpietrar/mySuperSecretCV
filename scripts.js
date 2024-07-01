document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('ul li').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('ul li').forEach(li => li.classList.remove('active'));
        this.classList.add('active');
    });
});
