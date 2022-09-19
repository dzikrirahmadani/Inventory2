$(document).ready(function(){   

    $('#submit').click(function(){
        prosesTambahData();
    })

    function prosesTambahData(){

        const nm_kategori = $('#kategori').val();
        if( nm_kategori != null ){
            $.ajax({
                type : "POST",
                url : "../../php/kategori/TambahKategori.php",
                data : `nm_kategori=${nm_kategori}`,
                dataType : "JSON",
                success : function(response){
                    console.log(response);
                }
            })
        }

    }
})