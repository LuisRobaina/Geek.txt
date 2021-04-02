// Need to push this to server side
export function sortBy(arr, value){
  console.log(value)
  if(value === "most popular"){
    value = 'soldCount'
  }
  if(value === 'published date'){
    value = 'publisherDate'
  }
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

export function filterRating(arr, rate){
  return arr.filter(item => item.rating === rate)
}