javascript:(function() {
    const elements = document.querySelectorAll('a.open-PDFViewer');
    const getOwnerAndBuildingInfo = () => {
        // Fungsi untuk mendapatkan informasi pemilik dan lainnya
        const info = {
            jenisKonsultasi: '',
            namaPemilik: '',
            alamatPemilik: '',
            lokasiBangunan: '',
            dataBangunan: ''
        };

        const labelElements = document.querySelectorAll('.control-label.col-md-3');
        labelElements.forEach(label => {
            const text = label.textContent.trim();
            switch (text) {
                case 'Jenis Konsultasi':
                    const jenisKonsultasiDiv = label.nextElementSibling;
                    if (jenisKonsultasiDiv) {
                        info.jenisKonsultasi = jenisKonsultasiDiv.textContent.trim();
                    }
                    break;
                case 'Nama Pemilik':
                    const namaPemilikDiv = label.nextElementSibling;
                    if (namaPemilikDiv) {
                        info.namaPemilik = namaPemilikDiv.textContent.trim();
                    }
                    break;
                case 'Alamat Pemilik Bangunan':
                    const alamatPemilikDiv = label.nextElementSibling;
                    if (alamatPemilikDiv) {
                        info.alamatPemilik = alamatPemilikDiv.textContent.trim();
                    }
                    break;
                case 'Lokasi Bangunan Gedung':
                    const lokasiBangunanDiv = label.nextElementSibling;
                    if (lokasiBangunanDiv) {
                        info.lokasiBangunan = lokasiBangunanDiv.textContent.trim();
                    }
                    break;
                case 'Data Bangunan Prasarana':
                    const dataBangunanDiv = label.nextElementSibling;
                    if (dataBangunanDiv) {
                        info.dataBangunan = dataBangunanDiv.textContent.trim();
                    }
                    break;
                default:
                    break;
            }
        });

        return info;
    };

    const downloadPDFs = async () => {
        const ownerInfo = getOwnerAndBuildingInfo(); // Dapatkan informasi pemilik dan bangunan

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const dataId = element.getAttribute('data-id');
            
            if (dataId) {
                try {
                    // Ambil file PDF menggunakan fetch
                    const response = await fetch(dataId);
                    const blob = await response.blob();

                    // Buat URL objek dari Blob
                    const url = URL.createObjectURL(blob);

                    // Dapatkan nama file dari URL data-id
                    const filename = dataId.substring(dataId.lastIndexOf('/') + 1);

                    // Buat nama file dengan menambahkan informasi pemilik dan bangunan
                    let fullFilename = `${ownerInfo.jenisKonsultasi}_${ownerInfo.namaPemilik}_${ownerInfo.alamatPemilik}_${filename}`;

                    // Hapus karakter khusus yang tidak diizinkan dalam nama file
                    fullFilename = fullFilename.replace(/[\\/:*?"<>|]/g, '_');

                    // Buat elemen <a> baru untuk mengunduh PDF
                    const downloadLink = document.createElement('a');
                    downloadLink.href = url;
                    downloadLink.download = fullFilename; // Nama file untuk diunduh
                    downloadLink.style.display = 'none';
                    document.body.appendChild(downloadLink);

                    // Klik secara otomatis pada tautan unduhan untuk memulai unduhan
                    downloadLink.click();

                    // Hapus elemen <a> setelah unduhan selesai
                    document.body.removeChild(downloadLink);
                } catch (error) {
                    console.error('Error downloading PDF:', error);
                }
            }
        }
    };

    // Panggil fungsi untuk mengunduh semua PDF
    downloadPDFs();
})();