// cek session login
const session = sessionStorage.getItem('id');
if( !session ){
    document.location.href = '../login.html';
}

$(document).ready(function(){

    const readData = async() => {
        const url = "../../php/peminjaman/GetData.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert("Server Bermasalah !");
            }
            return response.json();
        })
        .then(response => {
            let data = '';
            for( let i = 0; i < response.length; i++ ){
                data += showTable(response, i);
            }
            $('#target-data').html(data);

            // EVENT KETIKA TOMBOL UBAH DI KLIK
            const btn_ubah = document.querySelectorAll('#btn-ubah');
            btn_ubah.forEach( el => {
                el.addEventListener('click', function(){
                    let id = this.dataset.id;
                    document.location.href = `ubah-peminjaman.html?data=${id}`;
                })
            })


            // EVENT KETIKA TOMBOL DELETE DI KLIK
            const btn_del = document.querySelectorAll('#btn-hapus');
            btn_del.forEach(el => {
                el.addEventListener('click', function(){
                    let id = this.dataset.id;
                    if( confirm('Apakah Anda Yakin Ingin Menghapus ?') ){
                        hapusData(id);
                    }
                })
            })

        });

    }

    const hapusData = (id) => {
        $.ajax({
            type : "POST",
            url : "../../php/peminjaman/HapusData.php",
            data : `id_peminjaman=${id}`,
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

    // EVENT KETIKA TOMBOL TAMBAH DI KLIK
    $('#submit').click(() => {
        prosesTambahData();
    })

    const prosesTambahData = () => {

        const id_admin = sessionStorage.getItem('I');
        const kd_pinjam = $('#kd_pinjam').val();
        const nm_brg = $('#nm_brg').val();
        const jumlah = $('#jmlh_pinjam').val();
        const ruangan = $('#nm_ruangan').val();
        const peminjaman = $('#nm_peminjam').val();
        const tgl_pinjam = $('#tgl_pinjam').val();
        const statusPinjam = $('#status').val();

        $.ajax({
            type : "POST",
            url : "../../php/peminjaman/TambahData.php",
            data : `id_admin=${id_admin}&kd_pinjam=${kd_pinjam}&nm_brg=${nm_brg}&jumlah=${jumlah}&ruangan=${ruangan}&peminjaman=${peminjaman}&tgl_pinjam=${tgl_pinjam}&status_pinjam=${statusPinjam}`,
            dataType : "JSON",
            success : (response) => {
                
                if( response.status == '1' ){
                    alert(response.msg);
                    resetForm();
                    readData();
                }else{
                    alert(response.msg);
                    readData();
                }

            }
        })

    }

    const getRuangan = async () => {
        const url = "../../php/peminjaman/GetRuangan.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Server Bermasalah !');
            }
            return response.json();
        })
        .then(response => {
            
            response.map( ruangan => {
                $('#nm_ruangan').append(getShowRuangan(ruangan));
            })

        });
    }

    const getBarang = async () => {
        const url = "../../php/peminjaman/GetBarang.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Server bermasalah !');
            }
            return response.json()
        })
        .then(response => {
           
            response.map(brg => {
                $('#nm_brg').append(getShowBarang(brg));
            })

        });
    }

    const getKdPinjam = async() => {
        const url = "../../php/peminjaman/GetKdPinjam.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Server Bermasalah !');
            }
            return response.json()
        })
        .then(response => {
            $('#kd_pinjam').val(response);
        })
    }

    const getShowBarang = (response) => {
        return `<option value="${response.id_brg}" class="capitalize">${response.nm_brg}</option>`;
    }

    const getShowRuangan = (response) => {
        return `<option value="${response.id_ruangan}" class="capitalize">${response.nm_ruangan}</option>`;
    }

    const showTable = (response, i) => {
        return `
            <tr>
                <td>${response[i].kode}</td>
                <td>${response[i].nm_brg}</td>
                <td>${response[i].nm_ruangan}</td>
                <td>${response[i].tanggal}</td>
                <td>${response[i].status}</td>
                <td class="aksi">
                    <button class='btn-edit px-2 p-1 bg-green-600 text-white rounded-[3px]' data-id="${response[i].id_peminjaman}" id="btn-ubah">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    </button>
                    <button class='ml-1 btn-hapus px-2 p-1 bg-orange-600 text-white rounded-[3px]' data-id="${response[i].id_peminjaman}" id="btn-hapus">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </td>
            </tr>`
    } 

    const resetForm = () => {
        $('#kd_pinjam').val('');
        $('#nm_brg').val('');
        $('#jmlh_pinjam').val('');
        $('#nm_ruangan').val('');
        $('#nm_peminjam').val('');
        $('#tgl_pinjam').val('');
        $('#status').val('');
    }

    getKdPinjam();
    getBarang();
    getRuangan();
    readData();
})