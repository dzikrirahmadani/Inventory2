// cek session login
// const session = sessionStorage.getItem('id');
// if( !session ){
//     document.location.href = '../login.html';
// }

$(document).ready(function(){

    $('#btn-tambah').click(() => {
        prosesTambahData();
    })

    const prosesTambahData = () => {

        const id_admin = sessionStorage.getItem('I');
        const kode = $('#kode').val();
        const tgl_pengajuan = $('#tgl_pengajuan').val();
        const vendor = $('#vendor').val();
        const status = $('#status').val();

        if( !kode || !tgl_pengajuan || !vendor || !status ){
            alert('Field Tidak boleh kosong !');
        }else{
             $.ajax({
                type : "POST",
                url : "../../php/pengajuan/TambahPengajuan.php",
                data : `id_admin=${id_admin}&kode=${kode}&tgl_pengajuan=${tgl_pengajuan}&vendor=${vendor}&status=${status}`,
                dataType : "JSON",
                success : (response) => {
                    if( response.status = '1' ){
                        alert(response.msg);
                        resetForm();
                        setTimeout(()=>{
                            document.location.href = 'pengajuan.html';
                        }, 500);
                    }else{
                        alert(response.msg);
                    }
                }
            })
        }
       
    }
    
    const getKode = async () => {
        const url = "../../php/pengajuan/GetKode.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Server Bermasalah !');
            }
            return response.json();
        })
        .then(response => {
            document.getElementById('kode').value = response;
        })
    }

    const getvendor = async () => {
        const url = "../../php/pengajuan/GetVendor.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('server bermasalah !');
            }
            return response.json();
        })
        .then(response => {
            
            response.map(v => {
                $('#vendor').append(showOption(v));
            });
        });
    }

    const showOption = (v) => {
        return `<option value="${v.id_vendor}">${v.nm_vendor}</option>`
    }

    const resetForm = () => {
        $('#kode').val();
        $('#tgl_pengajuan').val();
        $('#vendor').val();
        $('#status').val();
    }
    getKode();
    getvendor();
})