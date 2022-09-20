$(document).ready(function(){   

    // cek session login
    const session = sessionStorage.getItem('id');
    if( !session ){
        document.location.href = '../login.html';
    }

    $('#submit').click(function(){
        prosesTambahData();
    })

    function prosesTambahData(){

        const nm_kategori = $('#kategori').val();
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
                        alert(response.msg);
                        resetForm();
                        setTimeout(() => {
                           document.location.href = 'kategori.html'; 
                        }, 500);
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