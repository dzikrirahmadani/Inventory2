// Cek Session login
const session = sessionStorage.getItem('id');
if( !session ){
    document.location.href = '../login.html';
}

// Event ketika tombol logout di klik
const btn_out = document.querySelector('#btn-out');
btn_out.addEventListener('click', () => {
    if( confirm('Apakah Yakin Ingin Keluar ?') ){
        logout();
    }
})

function delete_cookie( name, path, domain ) {
    if( get_cookie( name ) ) {
      document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }
  

const logout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('I');

    delete_cookie('id', "/Inventory2/views", "localhost");
    // document.location.href = '../login.html';
}