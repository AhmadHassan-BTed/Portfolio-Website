function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    initHoverEffects();
    initMobileAnimations();
});

function initHoverEffects() {
    const elements = document.querySelectorAll('.gameTab1, .gameTab2, .gameTab3, .gameTab4, .gameTab5');

    // Simple transition handler if not defined elsewhere
    const handleHoverTransition = (event) => {
        event.target.style.transition = 'all 0.3s ease';
    };

    const debouncedHoverTransition = debounce(handleHoverTransition, 200);

    elements.forEach((element) => {
        element.addEventListener('mouseenter', debouncedHoverTransition);
    });
}

function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) return "Windows Phone";
    if (/android/i.test(userAgent)) return "Android";
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";

    return "unknown";
}

function initMobileAnimations() {
    const mobileOS = getMobileOperatingSystem();
    const gameTabs = {
        tab1: document.querySelector('.gameTab1'),
        tab2: document.querySelector('.gameTab2'),
        tab3: document.querySelector('.gameTab3'),
        tab4: document.querySelector('.gameTab4'),
        tab5: document.querySelector('.gameTab5'),
    };

    if (mobileOS === "iOS") {
        Object.values(gameTabs).forEach((tab, index) => {
            if (tab) {
                tab.style.animation = `moveTab${index + 1} 60s linear infinite`;
                tab.classList.add("rotate-15deg");
            }
        });
    } else {
        const animatedTabs = [gameTabs.tab1, gameTabs.tab3, gameTabs.tab5];
        animatedTabs.forEach(tab => {
            if (tab) tab.style.animation = "movee1 6s infinite linear";
        });

        const staticTabs = [gameTabs.tab2, gameTabs.tab4];
        staticTabs.forEach(tab => {
            if (tab) tab.style.animation = "none";
        });
    }
}
