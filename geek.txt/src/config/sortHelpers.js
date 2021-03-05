export function sortBy(arr, value){
    return arr.sort((a, b) => {
        if (a[value] > b[value]) {
            return 1;
          }
          if (a[value] < b[value]) {
            return -1;
          }
          return 0;
    })
}


export function filterBy(arr, value){
    return arr.filter(item => item.genre === value);
}