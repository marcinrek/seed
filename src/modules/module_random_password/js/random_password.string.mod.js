const charsArray = [
    '0','1','2','3','4','5','6','7','8','9',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','o','P','R','S','T','U','W','X','Y','Z',
    '!','@','#','$','%','^','&','*','(',')','-','_','+','='
    ]

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomChar = (cArray) => {
    return cArray[randomNum(0, cArray.length)];
}

export const randomString = (size) => {
    let passwd = [];

    for(let i=0;i<size;i+=1){
        passwd.push(randomChar(charsArray));
    }
    return passwd.join('');
}
