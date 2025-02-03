let array = [];
let speed = 1000;

function generateArray() {
    const arrayContainer = document.getElementById('array');
    arrayContainer.innerHTML = '';
    const size = parseInt(document.getElementById('arraySize').value);
    if (isNaN(size) || size < 1 || size > 60) {
        alert("Please enter a valid number between 1 and 60.");
        return;
    }
    array = [];
    const maxBarWidth = 35;
    const containerWidth = arrayContainer.clientWidth;
    const barWidth = Math.min(maxBarWidth, containerWidth / size - 10);

    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 6}px`;
        bar.style.width = `${Math.max(barWidth, 5)}px`;
        bar.innerText = value;
        array.push(value);
        arrayContainer.appendChild(bar);
    }
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 6}px`;
                bars[j + 1].style.height = `${array[j + 1] * 6}px`;
                bars[j].innerText = array[j];
                bars[j + 1].innerText = array[j + 1];
            }
            await delay();
        }
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 6}px`;
            bars[j + 1].innerText = array[j + 1];
            j = j - 1;
            await delay();
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 6}px`;
        bars[j + 1].innerText = key;
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            bars[i].style.height = `${array[i] * 6}px`;
            bars[minIndex].style.height = `${array[minIndex] * 6}px`;
            bars[i].innerText = array[i];
            bars[minIndex].innerText = array[minIndex];
        }
        await delay();
    }
}

async function mergeSort() {
    await mergeSortHelper(array, 0, array.length - 1);
}

async function mergeSortHelper(arr, l, r) {
    if (l >= r) {
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSortHelper(arr, l, m);
    await mergeSortHelper(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    let i = 0, j = 0, k = l;
    const bars = document.getElementsByClassName('bar');
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            bars[k].style.height = `${arr[k] * 6}px`;
            bars[k].innerText = arr[k];
            i++;
        } else {
            arr[k] = R[j];
            bars[k].style.height = `${arr[k] * 6}px`;
            bars[k].innerText = arr[k];
            j++;
        }
        k++;
        await delay();
    }
    while (i < n1) {
        arr[k] = L[i];
        bars[k].style.height = `${arr[k] * 6}px`;
        bars[k].innerText = arr[k];
        i++;
        k++;
        await delay();
    }
    while (j < n2) {
        arr[k] = R[j];
        bars[k].style.height = `${arr[k] * 6}px`;
        bars[k].innerText = arr[k];
        j++;
        k++;
        await delay();
    }
}

async function quickSort() {
    await quickSortHelper(array, 0, array.length - 1);
}

async function quickSortHelper(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = (low - 1);
    const bars = document.getElementsByClassName('bar');
    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            bars[i].style.height = `${arr[i] * 6}px`;
            bars[j].style.height = `${arr[j] * 6}px`;
            bars[i].innerText = arr[i];
            bars[j].innerText = arr[j];
        }
        await delay();
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i + 1].style.height = `${arr[i + 1] * 6}px`;
    bars[high].style.height = `${arr[high] * 6}px`;
    bars[i + 1].innerText = arr[i + 1];
    bars[high].innerText = arr[high];
    return (i + 1);
}

function delay() {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 3000 / speed)
    );
}
