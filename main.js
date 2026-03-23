// Şehirlerin başlangıç verileri (Bunu ileride veritabanından çekeceğiz)
const sehirler = {
    "istanbul": { nufus: 1200, havuz: 5000 },
    "ankara": { nufus: 800, havuz: 3000 },
    "izmir": { nufus: 600, havuz: 2500 }
};

// Aktiflik kontrolü simülasyonu
function aktiflikKontrol(sonGirisTarihi) {
    const birAyOnce = new Date();
    birAyOnce.setMonth(birAyOnce.getMonth() - 1);
    return sonGirisTarihi > birAyOnce; 
}

// Ödül katsayısı hesaplama (Kafanda oturtamadığın yer)
function katsayiHesapla(sehirKey) {
    const sehir = sehirler[sehirKey];
    // Mantık: Havuz / Nüfus (Nüfus azsa ama havuz büyükse katsayı artar)
    let katsayi = sehir.havuz / sehir.nufus;
    return katsayi.toFixed(2);
}

// Test için konsola yazdıralım
console.log("İstanbul Ödül Katsayısı: " + katsayiHesapla("istanbul"));

