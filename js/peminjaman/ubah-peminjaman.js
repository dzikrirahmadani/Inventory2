// cek session login
const session = sessionStorage.getItem('id');
if( !session ){
    document.location.href = '../login.html';
}

$(document).ready(function(){

    // EVENT KETIKA BUTTON UBAH DI KLIK
    $('#submit').click(() => {
        prosesUbahData();
    })
    
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
    
    if( getUrlVars('data') == null ){
        document.location.href = 'peminjaman.html';
    }

    const prosesUbahData = () => {

        const id_peminjaman = getUrlVars('data');
        const kd_pinjam = $("#kd_pinjam").val();
        const nm_brg = $("#nm_brg").val();
        const ruangan = $('#nm_ruangan').val();
        const tanggal = $('#tgl_pinjam').val();
        const status = $('#status').val();

        if( !id_peminjaman || !kd_pinjam || !nm_brg || !ruangan || !tanggal || !status ){
            alert('Data Tidak Boleh kosong !');
        }else{

            $.ajax({
                type : "POST",
                url : "../../php/peminjaman/UbahData.php",
                data : `id_peminjaman=${id_peminjaman}&kd_pinjam=${kd_pinjam}&nm_brg=${nm_brg}&ruangan=${ruangan}&tanggal=${tanggal}&status=${status}`,
                dataType : "JSON",
                success : (response => {
                    if( response.status == '1' ){
                        alert(response.msg);
                        resetForm();
                        setTimeout(() => {
                            document.location.href = "peminjaman.html";
                        }, 1000)
                    }else{
                        response.msg;
                    }
                })
            })

        }

    }

    const getRuangan = async (id) => {
        const url = "../../php/peminjaman/GetRuangan.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Server Bermasalah !');
            }
            return response.json();
        })
        .then(response => {
            
            let ruangan = '';
            for( let i = 0; i < response.length; i++ ){
                if( response[i].id_ruangan != id ){
                    ruangan += `<option value="${response[i].id_ruangan}" >${response[i].nm_ruangan}</option>`;
                }else{
                    ruangan += `<option value="${response[i].id_ruangan}" selected >${response[i].nm_ruangan}</option>`;
                }
            }

            $('#nm_ruangan').append(ruangan);

        })
    }

    const getBarang = async(id) => {
        const url = "../../php/peminjaman/GetBarang.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Server Bermasalah !');
            }
            return response.json();
        })
        .then(response => {

            let barang = '';
            for( let i = 0; i < response.length; i++ ){
                if( response[i].id_brg != id ){
                    barang += `<option value="${response[i].id_brg}" >${response[i].nm_brg}</option>`;
                }else{
                    barang += `<option value="${response[i].id_brg}" selected >${response[i].nm_brg}</option>`
                }
            }
            
            $('#nm_brg').append(barang);

        })
        
    }

    const getSingleData = () => {

        const id_peminjaman = getUrlVars('data');

        $.ajax({
            type : "POST",
            url : "../../php/peminjaman/GetSingleData.php",
            data : `id_peminjaman=${id_peminjaman}`,
            dataType : "JSON",
            success : (response => {

                console.log(response);

                document.getElementById('kd_pinjam').value = response.kode;
                document.getElementById('tgl_pinjam').value = response.tanggal;
                document.getElementById('status').value = response.status;

                // DROPDOWN
                getBarang(response.id_brg);
                getRuangan(response.id_ruangan);

            })
        })

    }

    const resetForm = () => {
        $("#kd_pinjam").val('');
        $("#nm_brg").val('');
        $('#nm_ruangan').val('');
        $('#tgl_pinjam').val('');
        $('#status').val('');
    }

    getSingleData();
})