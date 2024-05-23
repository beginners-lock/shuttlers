export const URL = 'http://localhost:3001';
export const PASSWORD_LENGTH = 9;

export const datefunct = () => {
    let today = new Date();

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let H = today.getHours();
    let M = today.getMinutes();
    let S = today.getSeconds();

    let str = H + ':' + M + ':' + S + '	    ' + dd + '/' + mm + '/' + yyyy;
    return str;
}