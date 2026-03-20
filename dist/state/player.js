export class Player {
    steps = [];
    index = 0;
    playSpeed = 100;
    playTimeout = null;
    onStepChange;
    load(steps) {
        this.steps = steps;
        this.index = 0;
    }
    setIndex(n) {
        this.index = n;
        this.onStepChange?.(this.steps[n]);
    }
    next() {
        if (this.index < this.steps.length - 1) {
            this.setIndex(this.index + 1);
        }
    }
    back() {
        if (this.index > 0) {
            this.setIndex(this.index - 1);
        }
    }
    play() {
        if (this.playTimeout === null && this.index < this.steps.length - 1) {
            this.next();
            this.playTimeout = setTimeout(() => {
                this.playTimeout = null;
                this.play();
            }, this.playSpeed);
        }
    }
    stop() {
        if (this.playTimeout !== null) {
            clearTimeout(this.playTimeout);
            this.playTimeout = null;
        }
    }
}
//# sourceMappingURL=player.js.map