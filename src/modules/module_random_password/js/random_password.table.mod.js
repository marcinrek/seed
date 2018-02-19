const list = document.getElementById('passwd_list');
let passwdArray = [];

// https://stackoverflow.com/questions/948172/password-strength-meter
const scorePasswd = (passwd) => {
	let score = 0;
	if (!passwd) {
		return score;
	}

    // award every unique letter until 5 repetitions
    let letters = {};
    for (let i=0; i<passwd.length; i+=1) {
        letters[passwd[i]] = (letters[passwd[i]] || 0) + 1;
        score += 5.0 / letters[passwd[i]];
    }

    // bonus points for mixing it up
    let variations = {
        digits:   /\d/.test(passwd),
        lower:    /[a-z]/.test(passwd),
        upper:    /[A-Z]/.test(passwd),
        nonWords: /\W/.test(passwd),
    }

    let variationCount = 0;
    for (let check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

const checkPassStrength = (score) => {
    if (score > 80)
        return 'strong';
    if (score > 60)
        return 'good';
    if (score >= 30)
        return 'weak';

    return '';
}

const passwdArrayHandler = (passwd) => {
    let passwdItem = {
        passwd:   passwd,
        score:    scorePasswd(passwd),
        strength: checkPassStrength(scorePasswd(passwd))
    }

    if (passwdArray.length > 9) {
		passwdArray.pop();
    }
    
    passwdArray.push(passwdItem)

    sortByScore();
}

const sortByScoreCompare = (a,b) => {
    if (a.score > b.score)
        return -1;
    if (a.score < b.score)
        return 1;
    return 0;
}

const sortByScore = () => {
    passwdArray.sort(sortByScoreCompare);
}

const printPasswd = () => {
	list.innerHTML = '';

	passwdArray.map((item) => {
		let passwdRow = document.createElement('li');
        passwdRow.innerHTML = `${item.passwd} <span class='random_password__rank random_password__rank--${item.strength}'>[Strength: ${item.score}]</span> `;
		list.appendChild(passwdRow);
	});
}

export const passwordTable = (passwd) => {
	passwdArrayHandler(passwd);
    printPasswd();
}
