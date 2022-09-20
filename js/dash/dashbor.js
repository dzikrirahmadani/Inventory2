
const session = sessionStorage.getItem('id');
if( !session ){
    document.location.href = '../login.html';
}