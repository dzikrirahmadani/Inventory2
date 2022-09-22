$(document).ready(function(){   

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

    $('#submit').click(function(){
        prosesTambahData();
    })

    const logout = () => {

        sessionStorage.removeItem('id');
        sessionStorage.removeItem('I');

        document.location.href = '../login.html';
    }

    function prosesTambahData(){

        const nm_kategori = $('#kategori').val();

        const message = document.getElementById('notif');
        const pesan = document.querySelector('.pesan');
        const text = document.querySelector('.message');

        if( !nm_kategori ){
            alert('Yang anda masukan kosong !');
        }else{
            $.ajax({
                type : "POST",
                url : "../../php/kategori/TambahKategori.php",
                data : `nm_kategori=${nm_kategori}`,
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
                           document.location.href = 'kategori.html'; 
                           message.style.display = 'none';
                           message.style.opacity = '0';
                           pesan.style.top = '-100rem';
                        }, 2000);
                    } else{
                        alert(response.msg);
                    }
                }
            })
        }
    }

    const resetForm = () => {
        $('#kategori').val('');
    }
})