

class Utils {
  constructor() { }

  shuffle(array: any[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  rotate(arr: any[], num: number, reverse: boolean) {
    // console.log('before', arr);
    for (var i = 0; i < num; i++) {
      this.rotateArray(arr, reverse);
    }
    // console.log('after', arr);
    return arr;
  }

  rotateArray(arr: any[], reverse?: boolean) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr
  }
}

export const utils = new Utils();
