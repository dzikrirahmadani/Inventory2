// cek session login
const session = sessionStorage.getItem('id');
if( !session ){
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

        $.ajax({
            type : "POST",
            url : "../../php/vendor/TambahDataVendor.php",
            data : `nm_vendor=${nm_vendor}&alamat=${alamat}&no_telp=${no_telp}`,
            dataType : "JSON",
            success : function(response){
                if( response.status == '1' ){
                    alert(response.msg);
                    resetForm();
                    setTimeout(() => {
                        document.location.href = 'vendor.html';
                    }, 500);
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