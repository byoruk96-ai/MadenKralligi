const { createClient } = supabase;
const SUPABASE_URL = 'https://mwssxiruwitxubniknac.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_Kd1WDTpmBMFMaNO_L0e-XQ_VTIJ0sQb';
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Şehir Verileri ve Simgeleri
const cityIconsData = {
    "TR-34": { icons: ["🗼 Galata Kulesi", "👑 Metropol Bonusu: %5"] },
    "TR-06": { icons: ["🏛️ Anıtkabir", "🛡️ Savunma Bonusu: %3"] },
    "TR-16": { icons: ["⛰️ Uludağ Madenleri", "🧶 Tekstil Bonusu"] },
    "TR-35": { icons: ["🕒 Saat Kulesi", "⚓ Liman Ticareti"] }
};

// Harita Etkileşimi
document.querySelectorAll('.city-node').forEach(city => {
    city.addEventListener('click', function() {
        const cityId = this.getAttribute('id');
        const cityName = this.getAttribute('title');

        // Modalı aç ve bilgileri doldur
        document.getElementById('selected-city-name').innerText = cityName;
        document.getElementById('selected-city-value').value = cityName; // Gizli inputa yaz
        
        const iconsDiv = document.getElementById('city-icons');
        iconsDiv.innerHTML = "";
        
        if(cityIconsData[cityId]) {
            cityIconsData[cityId].icons.forEach(icon => {
                const p = document.createElement('p');
                p.innerText = icon;
                p.style.color = "#d4af37";
                p.style.fontSize = "0.9rem";
                iconsDiv.appendChild(p);
            });
        }

        document.getElementById('register-modal').style.display = "flex";
    });
});

// Modalı Kapatma
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('register-modal').style.display = "none";
});

// Kayıt Fonksiyonu
async function kayitOl() {
    const isim = document.getElementById('username').value;
    const sehir = document.getElementById('selected-city-value').value; // Haritadan gelen değer

    if (!isim) {
        alert("Lütfen isminizi yazın!");
        return;
    }

    const btn = document.getElementById('katil-btn');
    btn.disabled = true;
    btn.innerText = "Kaydediliyor...";

    const { data, error } = await _supabase
        .from('kullanicilar')
        .insert([{ username: isim, city: sehir, maden_bakiyesi: 0 }]);

    if (error) {
        alert("Hata: " + error.message);
        btn.disabled = false;
        btn.innerText = "KRALLIĞA KATIL";
    } else {
        alert("Tebrikler " + isim + "! " + sehir + " krallığı seni bekler.");
        window.location.href = "profil.html?user=" + encodeURIComponent(isim);
    }
}
