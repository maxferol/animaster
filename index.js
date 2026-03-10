addListeners();

function addListeners() {

    let heartBeatingAnimation = null;

    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeInStop')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().resetFadeIn(block);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });
    document.getElementById('fadeOutStop')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().resetFadeOut(block);
        });
    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });
    document.getElementById('moveStop')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().resetMove(block);
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 1000, 0.7, {x: 100, y: 10});
        });
    document.getElementById('moveAndHideStop')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().resetMoveAndHide(block);
        });
    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 5000);
        });
    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            if (!heartBeatingAnimation) {
                heartBeatingAnimation = animaster().heartBeating(block);
            }
        });
    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            if (heartBeatingAnimation) {
                heartBeatingAnimation.stop();
                heartBeatingAnimation = null; 
            }
    });
}

function animaster(){
    const animator = {
        move: function(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },
        fadeIn: function(element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },
        fadeOut: function(element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.add('hide');
            element.classList.remove('show');
        },
        scale: function(element, duration, ratio) {
            element.style.transitionDuration =  `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },
        resetFadeIn: function(element) {
            element.style.transitionDuration = null;
            //element.style.opacity = 0;
            element.classList.add('hide');
            element.classList.remove('show');
        },
        resetFadeOut: function(element) {
            element.style.transitionDuration = null;
            //element.style.opacity = 1;
            element.classList.remove('hide');
            element.classList.add('show');
        },
        resetMove: function(element) {
            element.style.transitionDuration = null;
            element.style.transform = null;
        },
        moveAndHide: function(element, duration, ratio, translation) {
            this.move(element, duration * ratio, translation);
            setTimeout(this.fadeOut, duration * ratio, element, duration * (1 - ratio));
        },
        resetMoveAndHide: function(element) {
            this.resetMove(element);
            this.resetFadeOut(element);
        },
        showAndHide: function(element, duration) {
            let internDuration = duration / 3;
            this.fadeIn(element, internDuration);
            setTimeout(this.fadeOut, internDuration * 2, element, internDuration);
        },

        heartBeating: function(element) {
            let isActive = true;
            
            const stepDuration = 500;
            
            const beat = () => {
                if (!isActive) 
                    return;
                this.scale(element, stepDuration, 1.4);

                this.heartBeatTimeout = setTimeout(() => {
                    if (!isActive) 
                        return;
                    this.scale(element, stepDuration, 1);
                    
                    this.heartBeatTimeout = setTimeout(beat, stepDuration);
                }, stepDuration);

                return {
                    stop(){
                        
                    }
                };
            };
            
            beat();

            return {
                stop: () => {
                    isActive = false;
                    element.style.transform = getTransform(null, 1);
                    element.style.transitionDuration = '';
                }
            };
        },

        addMove: function(element){
            this._steps.add();
            return this;
        },

        play: function(element){
            
        },

        _steps: [],
    }

    return animator;
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}
