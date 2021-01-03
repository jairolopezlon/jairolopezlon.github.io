const mainSectionActive = () => {
    let items = [...document.getElementsByClassName('section-item')];
    for (let item of items) {
        item.addEventListener('click', (e) => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                items.map((i) => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    }
};

export { mainSectionActive };
