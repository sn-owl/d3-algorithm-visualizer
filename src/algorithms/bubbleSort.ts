import type { Step } from '../state/step';

export type BubbleSortStep = Step<number[]> & {
    comparing: [number, number];
    swapped: boolean;
}
export function bubbleSort(arr: number[]): BubbleSortStep[] {
    const steps: BubbleSortStep[] = [];
    const a = [...arr];
    const n = a.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            const swapped = a[j]! > a[j + 1]!;
            if (swapped) {
                [a[j]!, a[j + 1]!] = [a[j + 1]!, a[j]!];
            }
            steps.push({
                data: [...a],
                comparing: [j, j + 1],
                swapped
            });
        }
    }
    return steps;
}