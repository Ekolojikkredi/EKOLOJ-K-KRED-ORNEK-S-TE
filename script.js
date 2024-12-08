function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function kayitOl() {
    const form = document.getElementById('kayitForm');
    const isim = form.isim.value;
    const email = form.email.value;
    const okul = form.okul.value;
    const okul_num = form.okul_num.value;
    const sifre = form.sifre.value;

    const ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || [];
    ogrenciler.push({ isim, email, okul, okul_num, sifre });
    localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
    alert("Kayıt başarılı!");
}

function veriGirisi() {
    const form = document.getElementById('veriGirisiForm');
    const ogr_id = form.ogr_id.value;
    const atik_turu = form.atik_turu.value;
    const atik_kg = form.atik_kg.value;
    const turu_ayrildi = form.turu_ayrildi.value === 'evet';

    let kredi = turu_ayrildi ? 10 : 0;

    const atiklar = JSON.parse(localStorage.getItem('atiklar')) || [];
    atiklar.push({ ogr_id, atik_turu, atik_kg, turu_ayrildi, kredi });
    localStorage.setItem('atiklar', JSON.stringify(atiklar));

    const toplamKredi = atiklar.reduce((acc, curr) => acc + curr.kredi, 0);
    const toplamAtik = atiklar.reduce((acc, curr) => acc + parseFloat(curr.atik_kg), 0);

    document.getElementById('toplamKredi').textContent = toplamKredi;
    document.getElementById('toplamAtik').textContent = toplamAtik + " kg";
    
    alert("Veri başarıyla eklendi!");
}

function goruntule() {
    const form = document.getElementById('veriGoruntulemeForm');
    const email = form.email.value;
    const sifre = form.sifre.value;

    const ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || [];
    const ogrenci = ogrenciler.find(o => o.email === email && o.sifre === sifre);

    if (ogrenci) {
        const atiklar = JSON.parse(localStorage.getItem('atiklar')) || [];
        const ogrenciAtiklar = atiklar.filter(a => a.ogr_id === ogrenci.okul_num);
        const toplamKredi = ogrenciAtiklar.reduce((acc, curr) => acc + curr.kredi, 0);
        const toplamAtik = ogrenciAtiklar.reduce((acc, curr) => acc + parseFloat(curr.atik_kg), 0);

        document.getElementById('veriGoruntulemeIsim').textContent = ogrenci.isim;
        document.getElementById('veriGoruntulemeKredi').textContent = toplamKredi;
        document.getElementById('veriGoruntulemeAtik').textContent = toplamAtik + " kg";

        document.querySelector('.left-info').style.display = 'block';
    } else {
        alert("Kullanıcı bulunamadı veya şifre yanlış.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toplamKredi = JSON.parse(localStorage.getItem('atiklar'))?.reduce((acc, curr) => acc + curr.kredi, 0) || 0;
    const toplamAtik = JSON.parse(localStorage.getItem('atiklar'))?.reduce((acc, curr) => acc + parseFloat(curr.atik_kg), 0) || 0;
    document.getElementById('toplamKredi').textContent = toplamKredi;
    document.getElementById('toplamAtik').textContent = toplamAtik + " kg";
});
