$(document).ready(function(){
    getSatuan();
    function getSatuan(){
        
        $.ajax({
            type : "GET",
            url : "php/GetSatuanData.php",
            dataType : "JSON",
            success : function(response){
                let satuan = '';
                for(let i = 0; i < response.length; i++){
                    satuan += getShowSatuan(response, i);
                }
                $('.option').append(satuan);
            }
        })

    }
    function getShowSatuan(response, i){
        return `<option value="${response[i].id_satuan}">${response[i].satuan}</option>`;
    }
})