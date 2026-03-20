import type { Step } from "./step";

export class Player<T extends Step<any>> {
    steps: T[] = [];
    index: number = 0;
    playSpeed: number = 100;
    private playTimeout: number | null = null;

    onStepChange?: (step: T) => void;

    load(steps: T[]): void {
        this.steps = steps;
        this.index = 0;
    }

    setIndex(n: number): void {
        this.index = n;
        this.onStepChange?.(this.steps[n]!);
    }

    next(): void {
        if (this.index < this.steps.length - 1) {
            this.setIndex(this.index + 1);
        }
    }

    back(): void {
        if (this.index > 0) {
            this.setIndex(this.index - 1);
        }
    }

    play(): void {
        if (this.playTimeout === null && this.index < this.steps.length - 1) {
            this.next();
            this.playTimeout = setTimeout(() => {
                this.playTimeout = null;
                this.play();
            }, this.playSpeed);
        }
    }

    stop(): void {
        if (this.playTimeout !== null) {
            clearTimeout(this.playTimeout);
            this.playTimeout = null;
        }
    }
}