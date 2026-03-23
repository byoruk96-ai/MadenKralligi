// Supabase kütüphanesini başlatalım
const { createClient } = supabase;

// --- DİKKAT: BU İKİ SATIRI DEĞİŞTİRECEKSİN ---
const SUPABASE_URL = 'https://mwssxiruwitxubniknac.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_Kd1WDTpmBMFMaNO_L0e-XQ_VTIJ0sQb';
// --------------------------------------------

const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function kayitOl() {
    // HTML'deki kutulardan verileri alıyoruz
    const isim = document.getElementById('username').value;
    const sehir = document.getElementById('city-select').value;

    // Boş alan kontrolü
    if (!isim || !sehir) {
        alert("Lütfen bir isim yazın ve şehir seçin!");
        return;
    }

    // Supabase'deki 'kullanıcılar' tablosuna veri ekleme
    const { data, error } = await _supabase
        .from('kullanıcılar')
        .insert([
            { 
                username: isim, 
                city: sehir, 
                maden_bakiyesi: 0 
                // son_giris otomatik dolacak (now() demiştik)
            }
        ]);

    if (error) {
        console.error("Hata detayı:", error);
        alert("Bir hata oluştu: " + error.message);
    } else {
        alert("Tebrikler " + isim + "! Krallığa başarıyla katıldın.");
        // İleride buraya: window.location.href = "profil.html"; ekleyeceğiz.
    }
}
