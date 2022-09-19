const readData = async () => {
    let url = "../../php/barang/DataBarang.php";
    await fetch(url, {
        method : "GET"
    })
    .then(response => response.json())
    .then(response => {
        let barang = '';
        for( let i = 0; i < response.length; i++ ){
            barang += showTable(response, i);
        }
        
        // Isikan Data Ke dalam target element
        document.getElementById('targetData').innerHTML = barang;
        
        // Event ketika Tombol ubah di klik
        const btn_ubah = document.querySelectorAll('#btn-ubah');
        btn_ubah.forEach(el => {
            el.addEventListener('click', function() {
                let id = this.dataset.id;
                document.location.href = `ubah-barang.html?data=${id}`;
            })
        })
    });
}


function showTable(response, i){
    return `<tr>
                <td>${i+1}</td>
                <td>${response[i].kd_brg}</td>
                <td>${response[i].nm_brg}</td>
                <td>${response[i].nm_kategori}</td>
                <td>${response[i].satuan}</td>
                <td>${response[i].stok}</td>
                <td>${response[i].nm_merk}</td>
                <td>${response[i].spesifikasi}</td>
                <td>
                <button class='btn-edit px-4 p-2 bg-green-600 text-white rounded-lg' data-id="${response[i].id_brg}" id="btn-ubah">Ubah</button>
                    <button class='btn-hapus px-4 p-2 bg-orange-600 text-white rounded-lg' id='${response[i].id_brg}'>Hapus</button>
                </td>
               </tr>`;
}

readData();