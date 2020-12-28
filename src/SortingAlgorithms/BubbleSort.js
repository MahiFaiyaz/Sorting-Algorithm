const getBubbleSortAnimations = (array) => {
  const animations = [];
  const swap = (arr, a, b) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  };
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      let a = array[j];
      let b = array[j + 1];
      if (a > b) {
        animations.push([j, j + 1]);
        swap(array, j, j + 1);
      }
    }
  }

  return animations;
};

export default getBubbleSortAnimations;
