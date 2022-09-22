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
    
    $('#btn-add').click(function(){
        prosesTambahData();
    })

    function prosesTambahData(){

        const nm_vendor = $('#nm_vendor').val();
        const alamat = $('#alamat').val();
        const no_telp = $('#no_telp').val();

        const message = document.getElementById('notif');
        const pesan = document.querySelector('.pesan');
        const text = document.querySelector('.message');

        $.ajax({
            type : "POST",
            url : "../../php/vendor/TambahDataVendor.php",
            data : `nm_vendor=${nm_vendor}&alamat=${alamat}&no_telp=${no_telp}`,
            dataType : "JSON",
            success : function(response){
                if( response.status == '1' ){
                    message.style.transition = 'all 5s 5s ease-in-out';
                    message.style.opacity = '1';
                    message.style.display = 'flex';
                    pesan.style.top = '10%';
                    text.innerHTML = `<h1 class='capitalize'>${response.msg}</h1>`;
                    resetForm();
                    setTimeout(() => {
                        document.location.href = 'vendor.html';
                        message.style.display = 'none';
                        message.style.opacity = '0';
                        pesan.style.top = '-100rem';
                    }, 2000);
                }else{
                    alert(response.msg);
                    resetForm();
                }
            }
        })
    }

    function resetForm(){
        $('#nm_vendor').val('');
        $('#alamat').val('');
        $('#no_telp').val('');
    }

})