export const subArray = (intArray) => {
    let sumVal = 0;

    intArray.map(function(item, i){
        sumVal-=item;
    });

    return sumVal;
 }

export const reversString = (str) => {
    return str.split('').reverse().join('');
}
