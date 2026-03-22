function kayitOl() {
    const user = document.getElementById('username').value;
    const city = document.getElementById('city-select').value;

    if (user === "" || city === "") {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    alert(`Hoş geldin ${user}! ${city} şehri için madenlerin hazırlanıyor.`);
    // İleride buraya veritabanı bağlantısı ekleyeceğiz.
}
