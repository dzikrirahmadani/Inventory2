// cek session login
const session = sessionStorage.getItem('id');
if( !session ){
    document.location.href = '../login.html';
}

$(document).ready(function(){

    // Read Data
    const readData = async () => {

        $('#target-data').html('');

        const url = "../../php/pengajuan/GetPengajuan.php";
        await fetch(url, {method:"GET"})
        .then(response => {
            if( !response.ok ){
                alert('Sever bermasalah !');
            }
            return response.json()
        })
        .then(response => {
            response.map(brg => {
                $('#target-data').append(showTable(brg));
            })
            
            // EVENT KETIK TOMBOL UBAH DI KLIK
            const btn_ubah = document.querySelectorAll('#btn-ubah');
            btn_ubah.forEach(el => {
                el.addEventListener('click', function(){
                    let id = this.dataset.id;
                    document.location.href = `ubah-pengajuan.html?data=${id}`;
                })
            })

            // EVENT KETIKA TOMBOL DELETE DI KLIK
            const btn_del = document.querySelectorAll('#btn-hapus');
            btn_del.forEach(el => {
                el.addEventListener('click', function(){
                    let id = this.dataset.id;
                    if( confirm('Apakah Yakin Ingin Menghapus ?') ){
                        hapusData(id);
                    }
                })
            })
        })
    }

    // TAMBAH PENGAJUAN
    $('#btn-tambah').click(() => {
        prosesTambahData();
    })

    const prosesTambahData = () => {

        const id_admin = sessionStorage.getItem('I');
        const kode_pengajuan = $('#kd_pengajuan').val();
        const nm_brg = $('#nm_brg').val();
        const hrg_beli = $('#hrg_beli').val();
        const vendor = $('#vendor').val();
        const tgl_pengajuan = $('#tgl_pengajuan').val();
        const status = $('#status').val();

        if( !kode_pengajuan || !tgl_pengajuan || !vendor || !status ){
            alert('Field Tidak boleh kosong !');
        }else{
             $.ajax({
                type : "POST",
                url : "../../php/pengajuan/TambahPengajuan.php",
                data : `id_admin=${id_admin}&kode=${kode_pengajuan}&nm_brg=${nm_brg}&hrg_beli=${hrg_beli}&tgl_pengajuan=${tgl_pengajuan}&vendor=${vendor}&status=${status}`,
                dataType : "JSON",
                success : (response) => {

                    if( response.status = '1' ){
                        alert(response.msg);
                        resetForm();
                        readData();
                    }else{
                        alert(response.msg);
                    }

                }
            })
        }
       
    }

    const hapusData = (id) => {
        $.ajax({
            type : "POST",
            url : "../../php/pengajuan/HapusData.php",
            data : `id_pengajuan=${id}`,
            dataType : "JSON",
            success : (response) => {
                if( response.status == '1' ){
                    alert(response.msg);
                    readData();
                }else{
                    alert(response.msg);
                    readData();
                }
            }
        })

    }

    const getBarang = async () => {

        const url = "../../php/pengajuan/GetBarang.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Server Bermasalah !');
            }
            return response.json()
        })
        .then(response => {
        
            response.map( brg => {
                $('#nm_brg').append(showOptionBarang(brg));
            } )
        
        })    
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
            document.getElementById('kd_pengajuan').value = response;
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
                $('#vendor').append(showOptionVendor(v));
            });
        });
    }

    const showOptionVendor = (v) => {
        return `<option value="${v.id_vendor}" class="capitalize">${v.nm_vendor}</option>`
    }

    const showOptionBarang = (response) => {
        return `<option value="${response.id_brg}" class="capitalize">${response.nm_brg}</option>`;
    }

    const showTable = (response) => {
        return `
            <tr>
                <td>${response.kode}</td>
                <td>${response.nm_brg}</td>
                <td>${response.hrg_beli}</td>
                <td>${response.nm_vendor}</td>
                <td>${response.tanggal}</td>
                <td>${response.status}</td>
                <td class="aksi">
                    <button class='btn-edit px-2 p-1 bg-green-600 text-white rounded-[3px]' data-id="${response.id_pengajuan}" id="btn-ubah">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    </button>
                    <button class='ml-1 btn-hapus px-2 p-1 bg-orange-600 text-white rounded-[3px]' data-id="${response.id_pengajuan}" id='btn-hapus'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </td>
            </tr>`;
    }

    const resetForm = () => {
        $('#kd_pengajuan').val('');
        $('#nm_brg').val('');
        $('#hrg_beli').val('');
        $('#vendor').val('');
        $('#tgl_pengajuan').val('');
        $('#status').val('');
    }

    getKode();
    getvendor();
    getBarang();
    readData();
})