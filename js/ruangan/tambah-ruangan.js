// cek session login
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

const logout = () => {

    sessionStorage.removeItem('id');
    sessionStorage.removeItem('I');

    document.location.href = '../login.html';
}


$(document).ready(function(){

    const getKdRuangan = () => {

        const url = "../../php/ruangan/GetKdRuangan.php";
        fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                console.log('Server Bermasalah !');
            }
            return response.json();
        })
        .then(response => {
            
            document.getElementById('kd_ruangan').setAttribute('value', response);

        });

    }

    const prosesTambahData = () => {

        const kd_ruangan = document.getElementById('kd_ruangan').value;
        const nm_ruangan = document.getElementById('nm_ruangan').value;
        const spesifikasi = document.getElementById('spesifikasi').value;

        const message = document.getElementById('notif');
        const pesan = document.querySelector('.pesan');
        const text = document.querySelector('.message');

        if( !kd_ruangan || !nm_ruangan || !spesifikasi ){
            alert('Yang anda masukan kosong !');
        }else{
            $.ajax({
                type : "POST",
                url : "../../php/ruangan/TambahRuangan.php",
                data : `kd_ruangan=${kd_ruangan}&nm_ruangan=${nm_ruangan}&spesifikasi=${spesifikasi}`,
                dataType : "JSON",
                success : (response) => {
                    if( response.status == '1' ){
                        message.style.transition = 'all 5s 5s ease-in-out';
                        message.style.opacity = '1';
                        message.style.display = 'flex';
                        pesan.style.top = '10%';
                        text.innerHTML = `<h1 class='capitalize'>${response.msg}</h1>`;
                        resetForm();
                        setTimeout( () => {
                            document.location.href = 'ruangan.html';
                            message.style.display = 'none';
                            message.style.opacity = '0';
                            pesan.style.top = '-100rem';
                        }, 2000)
                    }else{
                        alert(response.msg);
                    }
                }
            })
        }

    }

    const resetForm = () => {
        $('#kd_ruangan').val('');
        $('#nm_ruangan').val('');
        $('#spesifikasi').val('');
    }

    const btn_submit = document.getElementById('submit');
    btn_submit.addEventListener('click', () => {
        prosesTambahData();
    })
    
    getKdRuangan();
})