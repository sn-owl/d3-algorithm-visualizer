import type { Step } from "./step";
export declare class Player<T extends Step<any>> {
    steps: T[];
    index: number;
    private playSpeed;
    private playTimeout;
    onStepChange?: (step: T) => void;
    load(steps: T[]): void;
    setIndex(n: number): void;
    next(): void;
    back(): void;
    play(): void;
    stop(): void;
}
//# sourceMappingURL=player.d.ts.map