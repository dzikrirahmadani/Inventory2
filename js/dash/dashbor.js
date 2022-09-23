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
}

const landingOn = () => {
    const landing = document.getElementById('landing');
    landing.style.opacity = '0';
    landing.style.transition = 'all 1s .6s ease-in-out';
    setTimeout(() => {
        landing.style.display = 'none';
    }, 1200)
}
