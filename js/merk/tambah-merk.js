$(document).ready(function(){

    $('#submit').click(function(){
        prosesTambahMerk();
    })

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