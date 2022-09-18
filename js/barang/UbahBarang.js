$(document).ready(function(){
    
    ubahData();
    getMerk();

    function ubahData(){
        const id = getUrlVars('data');
        $.ajax({
            type : "POST",
            url : "php/barang/UbahBarang.php",
            data : `id=${id}`,
            dataType : "JSON",
            success : function(response){

                $('#kd_brg').val(response.kd_brg);
                $('#nama').val(response.nm_brg); 
                 
            }
        })
    }

    function getSatuan(){
        $.ajax({
            type : "GET",
            url : "php/barang/GetSatuanData.php",
            dataType : "JSON",
            success : function(response){
                let satuan = '';
                for(let i = 0; i < response.length; i++){
                    satuan += getShowSatuan(response, i);
                }
                $('#satuan').append(satuan);
            }
        })

    }

    function getKategori(){
        $.ajax({
            type : "GET",
            url : "php/barang/GetKategoriData.php",
            dataType : "JSON",
            success : function(response){
                let kategori = '';
                for(let i = 0; i < response.length; i++){
                    kategori += getShowKategori(response, i);
                }
                
                $('#kategori').append(kategori);
            }
        })
    }

    function getMerk(){
        $.ajax({
            type : "GET",
            url : "php/barang/GetMerk.php",
            dataType : "JSON",
            success : function(response){
                console.log(response);
                let merk = '';
                for(let i = 0; i < response.length; i++){
                    merk += getShowMerk(response, i);
                }
                $('#merk').append(merk);
            }
        })
    }

    function getUrlVars(param=null){
        if(param !== null){
            let vars = [], hash;
            let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

            for(let i = 0; i < hashes.length; i++){
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }  
            return vars[param];
        }else{
            return null;
        }
    }

})