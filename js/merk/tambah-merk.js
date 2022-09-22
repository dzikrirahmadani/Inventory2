$(document).ready(function(){

    // cek session login
    const session = sessionStorage.getItem('id');
    if( !session ){
        document.location.href = '../login.html';
    }
    
        $('#submit').click(function(){
            prosesTambahMerk();
        })

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

    const prosesTambahMerk = () => {

        const merk = $('#merk').val();

        const message = document.getElementById('notif');
        const pesan = document.querySelector('.pesan');
        const text = document.querySelector('.message');

        if( !merk ){
            alert('Yang anda masukan kosong  !');
        }else{
            $.ajax({
                type : "POST",
                url : "../../php/merk/TambahData.php",
                data : `nm_merk=${merk}`,
                dataType : "JSON",
                success : function(response){
                    if(response.status == '1'){
                        message.style.transition = 'all 5s 5s ease-in-out';
                        message.style.opacity = '1';
                        message.style.display = 'flex';
                        pesan.style.top = '10%';
                        text.innerHTML = `<h1 class='capitalize'>${response.msg}</h1>`;
                        resetForm();
                        setTimeout(() => {
                            document.location.href = 'merk.html';
                            message.style.display = 'none';
                            message.style.opacity = '0';
                            pesan.style.top = '-100rem';
                        }, 2000);
                    }else{
                        alert(response.msg);
                    }
                } 
            })
        }
        
    }

    const resetForm = () => {
        $('#merk').val('');
    }

})