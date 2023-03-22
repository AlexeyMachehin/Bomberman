export {};

if (!Array.prototype.bomberSort) {
  Array.prototype.bomberSort = function <T>(fn: (a: T, b: T) => number): T[] {
    function quickSort(arr: Array<T>, start = 0, end = arr.length - 1) {
      if (end <= start) {
        return arr;
      }

      const pivotIndex = partition(arr, start, end);

      quickSort(arr, start, pivotIndex - 1);
      quickSort(arr, pivotIndex + 1, end);

      return arr;
    }

    function partition(arr: Array<T>, start = 0, end = arr.length - 1) {
      const pivotValue = arr[end];

      let pivotIndex = start;

      for (let i = start; i < end; i++) {
        const direction = fn(pivotValue, arr[i]) >= 0 ? true : false;
        if (direction) {
          swap(arr, i, pivotIndex);
          pivotIndex++;
        }
      }

      swap(arr, pivotIndex, end);

      return pivotIndex;
    }

    function swap(arr: Array<T>, i: number, j: number) {
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }

    return quickSort(this);
  };
}
