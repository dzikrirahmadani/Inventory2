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

        document.cookie = "id=''";
        sessionStorage.setItem('id', '');
        sessionStorage.setItem('I', '');

        document.location.href = '../login.html';
    }

    const prosesTambahMerk = () => {

        const merk = $('#merk').val();
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
                        alert(response.msg);
                        resetForm();
                        setTimeout(() => {
                            document.location.href = 'merk.html';
                        }, 500);
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