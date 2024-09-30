
function initCarousel() {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (!carouselImages || images.length === 0 || !prevButton || !nextButton) {
        return;
    }

    let counter = 0;
    const size = images[0].clientWidth;

    nextButton.addEventListener('click', () => {
        if (counter >= images.length - 1) return;
        carouselImages.style.transition = "transform 0.4s ease-in-out";
        counter++;
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    prevButton.addEventListener('click', () => {
        if (counter <= 0) return;
        carouselImages.style.transition = "transform 0.4s ease-in-out";
        counter--;
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });
}

async function loadWikipediaData(page, elementId) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${page}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        
        document.getElementById(elementId).innerHTML = `
            <h3>${data.title}</h3>
            <img src="${data.thumbnail ? data.thumbnail.source : ''}" alt="${data.title}">
            <p>${data.extract}</p>
            <a href="${data.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a>
        `;
    } catch (error) {
        console.error("Error fetching data from Wikipedia: ", error);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    initCarousel(); 
});


if (document.getElementById('mir-castle')) {
    loadWikipediaData("Mir_Castle_Complex", "mir-castle");
    loadWikipediaData("Nesvizh_Castle", "nesvizh-castle");
    loadWikipediaData("Brest_Fortress", "brest-fortress");
}
