const sectionContactActive = () => {
    let elems = [...document.getElementsByClassName('btn-contact__img')];
    for (let elem of elems) {
        elem.addEventListener('click', (e) => {
            document
                .querySelector('.container-contact')
                .classList.toggle('active');
            document
                .querySelector('.contact-content')
                .classList.toggle('active');
            document
                .querySelector('.btn-contact--close')
                .classList.toggle('active');
            document.querySelector('.btn-contact').classList.toggle('hidden');
        });
    }
    document
        .querySelector('.btn-contact--close')
        .addEventListener('click', (e) => {
            document
                .querySelector('.container-contact')
                .classList.toggle('active');
            document
                .querySelector('.contact-content')
                .classList.toggle('active');
            document
                .querySelector('.btn-contact--close')
                .classList.toggle('active');
            document.querySelector('.btn-contact').classList.toggle('hidden');
        });
};

export { sectionContactActive };
