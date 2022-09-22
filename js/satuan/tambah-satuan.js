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
    
    $('#submit').click(function(){
        prosesTambahData();
    })

    function prosesTambahData(){
        const nm_satuan = $('#satuan').val();
        if( nm_satuan != null ){
            $.ajax({
                type : "POST",
                url : "../../php/satuan/TambahSatuan.php",
                data : `nm_satuan=${nm_satuan}`,
                dataType : "JSON",
                success : function(response) {
                    if( response.status == '1'){
                        alert(response.msg);
                        resetForm();
                        setTimeout( () => {
                            document.location.href = 'satuan.html';
                        }, 500);
                    }else{
                        alert(response.msg);
                    }

                }
            })
        }

    }

    const resetForm = () => {
        $('#satuan').val('');
    }
})