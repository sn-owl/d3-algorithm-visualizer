export type Step<T> = {
    data: T;
};
export type BubbleSortStep = Step<number[]> & {
    comparing: [number, number];
    swapped: boolean;
};
//# sourceMappingURL=step.d.ts.map