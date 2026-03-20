export function bubbleSort(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            const swapped = a[j] > a[j + 1];
            if (swapped) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
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
//# sourceMappingURL=bubbleSort.js.map