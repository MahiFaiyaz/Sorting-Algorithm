const getMergeSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
};

const mergeSortHelper = (mainArray, startInd, endInd, auxArray, animations) => {
  if (startInd === endInd) return;
  const middleInd = Math.floor((startInd + endInd) / 2);
  mergeSortHelper(auxArray, startInd, middleInd, mainArray, animations);
  mergeSortHelper(auxArray, middleInd + 1, endInd, mainArray, animations);
  doMerge(mainArray, startInd, middleInd, endInd, auxArray, animations);
};

const doMerge = (
  mainArray,
  startInd,
  middleInd,
  endInd,
  auxArray,
  animations
) => {
  let k = startInd;
  let i = startInd;
  let j = middleInd + 1;
  while (i <= middleInd && j <= endInd) {
    if (auxArray[i] <= auxArray[j]) {
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    } else {
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }
  while (i <= middleInd) {
    animations.push([k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }
  while (j <= endInd) {
    animations.push([k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
};

export default getMergeSortAnimations;
