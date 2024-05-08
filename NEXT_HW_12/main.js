document.addEventListener('DOMContentLoaded', () => {
    const keys = Array.from(document.querySelectorAll('li'));
    
    keys.forEach(key => {
        key.addEventListener('mousedown', playSound);
        key.addEventListener('mouseup', stopSound);
    });

    function playSound(e) {
        const keyData = e.target.dataset.key;
        const audio = document.querySelector(`audio[data-key="${keyData}"]`);
        if (!audio) return;

        e.target.classList.add('playing');
        audio.currentTime = 0;
        audio.play();
    }

    function stopSound(e) {
        const keyData = e.target.dataset.key;
        const audio = document.querySelector(`audio[data-key="${keyData}"]`);
        if (!audio) return;

        e.target.classList.remove('playing');
        audio.pause();
        audio.currentTime = 0;
    }

    window.addEventListener('keydown', e => {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`li[data-key="${e.keyCode}"]`);
        if (!audio) return;

        key.classList.add('playing');
        audio.currentTime = 0;
        audio.play();
    });

    window.addEventListener('keyup', e => {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`li[data-key="${e.keyCode}"]`);
        if (!audio || !key) return;

        audio.pause();
        audio.currentTime = 0;
        key.classList.remove('playing');
    });

    keys.forEach(key => key.addEventListener('transitionend', removeTransition));

    function removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
    }
});
