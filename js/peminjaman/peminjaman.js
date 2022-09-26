// cek session login
const session = sessionStorage.getItem('id');
if( !session ){
    document.location.href = '../login.html';
}

$(document).ready(function(){

    const getNmBrg = async () => {
        const url = "../../php/peminjaman/GetBarang.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Server bermasalah !');
            }
            return response.json()
        })
        .then(response => console.log(response));
    }

    const getKdPinjam = async() => {
        const url = "../../php/peminjaman/GetKdPinjam.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Server Bermasalah !');
            }
            return response.json()
        })
        .then(response => {
            $('#kd_pinjam').val(response);
        })
    }

    getKdPinjam();
})