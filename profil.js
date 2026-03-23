const { createClient } = supabase;
const SUPABASE_URL = 'https://mwssxiruwitxubniknac.supabase.co'; 
const SUPABASE_KEY = 'KEY_BURAYA';
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// URL'den kullanıcı adını çekiyoruz (main.js'den gelen isim)
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('user');

let currentMaden = 0;

// Sayfa açıldığında kullanıcının mevcut madenini veritabanından çekelim
async function verileriGetir() {
    if (!username) return;
    
    const { data, error } = await _supabase
        .from('kullanicilar')
        .select('*')
        .eq('username', username)
        .single();

    if (data) {
        currentMaden = data.maden_bakiyesi;
        document.getElementById('karsilama').innerText = "Hoş Geldin, " + data.username;
        document.getElementById('user-city').innerText = data.city;
        document.getElementById('bakiye').innerText = currentMaden;
    }
}

async function madenKaz() {
    const btn = document.getElementById('kazma-btn');
    const mesaj = document.getElementById('mesaj');
    btn.disabled = true;

    // Şans Faktörü (Rastgele sayı üretimi)
    let sans = Math.random() * 100;
    let kazanc = 0;

    if (sans < 70) {
        kazanc = Math.floor(Math.random() * 5) + 1; // 1-5 arası
        mesaj.innerText = "Küçük bir damar buldun: +" + kazanc;
    } else if (sans < 95) {
        kazanc = Math.floor(Math.random() * 40) + 10; // 10-50 arası
        mesaj.innerText = "GÜMÜŞ DAMARI! +" + kazanc;
    } else {
        kazanc = Math.floor(Math.random() * 400) + 100; // 100-500 arası
        mesaj.innerText = "👑 ALTIN DAMARI! KRAL ÇIPLAK! +" + kazanc;
    }

    currentMaden += kazanc;
    document.getElementById('bakiye').innerText = currentMaden;

    // Veritabanını Güncelle
    const { error } = await _supabase
        .from('kullanicilar')
        .update({ maden_bakiyesi: currentMaden })
        .eq('username', username);

    if (error) console.error("Güncelleme hatası:", error);

    // 1 saniye bekleme süresi (sürekli basılmasın diye)
    setTimeout(() => {
        btn.disabled = false;
        mesaj.innerText = "";
    }, 1000);
}

// Sayfa yüklenince verileri çek
verileriGetir();
