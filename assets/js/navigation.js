function init(){
    
    const navLinks = document.querySelectorAll('.nav-link');
    const activeClass = 'active';

    navLinks.forEach(link => {

        link.addEventListener('click', () => {
          
            localStorage.setItem('activeLink', link.getAttribute('href'));

        });

        window.onload = () => {

            const storedActiveLink = localStorage.getItem('activeLink');
            if(storedActiveLink) {
                
                const activeLink = document.querySelector(`.nav-link[href="${storedActiveLink}"]`);
                if(activeLink) {
                    activeLink.classList.add(activeClass);
                }
            }
        }

    });

}

init();