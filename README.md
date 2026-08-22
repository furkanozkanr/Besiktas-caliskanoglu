# Beşiktaş Çalışkanoğlu

**Teknolojinin Kalbinde Siyah-Beyaz Bir Sevda**

Fan yapımı, ticari olmayan bir 3D teknoloji üssü deneyimi. Sinan Çalışkanoğlu'na
hediye edilebilecek şekilde tasarlanmış bir mobil PWA. Beşiktaş Jimnastik Kulübü
veya ilgili kişi/kurumlarla resmi bir bağlantısı **yoktur**.

## Öne çıkan özellikler

- Three.js / React Three Fiber ile gerçek zamanlı 3D teknoloji üssü sahnesi
  (dönen madalyon-arma, enerji halkası, ızgara zemin, cam paneller, parçacıklar)
- Parmakla/mouse ile hafif kamera paralaksı (mide bulandırmayacak şekilde damped)
- Sinematik açılış animasyonu + "ATLA" (skip) seçeneği
- Hologram pankart, hologram futbolcu kartları (3D tilt/hover), genişleyen kart modalı
- "SİNAN ÇALIŞKANOĞLU" için özel hologram konsolu + kolayca düzenlenebilir kişisel mesaj
- Easter egg'ler: armaya 5 kez dokunma → "BEŞİKTAŞ MODE ACTIVATED", "1903" rozetine dokunma
- Ses varsayılan olarak kapalı; açılırsa Web Audio ile üretilen düşük seviyeli teknoloji uğultusu
- WebGL desteklenmiyorsa otomatik 2D "SYSTEM FALLBACK" arayüzü
- Otomatik / manuel **Performance Mode** (düşük güçlü cihazlarda 3D efektleri azaltır)
- Tam PWA desteği: manifest, service worker, ikonlar, offline fallback, "ana ekrana ekle"
- Mobil öncelikli, safe-area destekli, 360px–1440px+ arası responsive tasarım

## Klasör yapısı

```
besiktas-caliskanoglu/
├── public/
│   ├── manifest.json
│   ├── sw.js
│   ├── offline.html
│   ├── icons/              # PWA ikonları (placeholder — kendi ikonunuzla değiştirin)
│   └── assets/
│       ├── logo/            # Arma (crest.svg / crest.png)
│       ├── players/          # Futbolcu görselleri (placeholder)
│       ├── backgrounds/ icons/ textures/ holograms/  # genişletmek için hazır klasörler
├── src/
│   ├── components/          # 3D sahne, kartlar, nav, splash, hologram pankart, easter egg…
│   ├── pages/                # Ana Üs, Hologram Kartlar, Beşiktaş, Sinan Abi, Sistem
│   ├── data/players.ts       # Merkezi futbolcu veri yapısı
│   ├── hooks/                 # WebGL desteği, pointer/parallax
│   ├── styles/global.css      # Tasarım tokenları (renk, tipografi, glass, glow…)
│   ├── App.tsx / App.css
│   └── main.tsx
├── index.html
├── vite.config.ts
├── package.json
└── tsconfig.json
```

## Görselleri değiştirme

Bu proje **hiçbir gerçek futbolcu fotoğrafı veya resmi kulüp logosu içermez.**
Tüm görseller placeholder'dır ve isim alanları `[FUTBOLCU ADI]` şeklindedir.

- **Arma:** `public/assets/logo/crest.png` (ve `crest.svg`) — kendi yasal
  olarak kullanabileceğiniz arma görseliyle bu dosyayı değiştirin. Aynı dosya
  adını korursanız kod içinde başka hiçbir değişiklik gerekmez (splash ekranı,
  3D madalyon ve 2D fallback hepsi bu dosyayı kullanır).
- **Futbolcular:** `src/data/players.ts` içindeki `image` alanlarını
  `public/assets/players/` altına koyacağınız kendi görsellerinizin yoluyla
  değiştirin.

## Kişisel mesajı düzenleme

`src/pages/SinanAbi.tsx` dosyasının en üstünde:

```ts
const personalMessage = "Sinan abi, bu küçük teknoloji üssü ...";
```

Bu satırı doğrudan düzenleyerek mesajı istediğiniz gibi değiştirebilirsiniz.

## Kurulum ve çalıştırma

```bash
npm install
npm run dev        # geliştirme sunucusu (http://localhost:5173)
npm run build       # production build → dist/
npm run preview      # build'i yerelde önizleme
```

## GitHub'a yükleme

1. Bu klasörü yeni bir GitHub reposuna yükleyin (`git init`, `git add .`,
   `git commit`, `git remote add origin ...`, `git push`).
2. `vite.config.ts` içindeki `base` değerini repo adınızla eşleştirin:
   ```ts
   const base = process.env.BASE_PATH || '/REPO-ADINIZ/';
   ```
3. `public/manifest.json` içindeki `start_url` ve `scope` alanlarını da aynı
   şekilde güncelleyin.

## GitHub Pages'e deploy etme

En basit yol `gh-pages` paketiyledir (zaten `devDependencies` içinde):

```bash
npm run build
npx gh-pages -d dist
```

Ardından GitHub reponuzda **Settings → Pages** bölümünden `gh-pages` dalını
kaynak olarak seçin. Birkaç dakika içinde uygulama
`https://KULLANICI_ADINIZ.github.io/REPO-ADINIZ/` adresinde yayında olur.

Alternatif olarak GitHub Actions ile otomatik deploy da kurabilirsiniz
(`actions/deploy-pages`), ancak yukarıdaki manuel yöntem en hızlı başlangıçtır.

## Android APK'ya ilerleme (opsiyonel, ileride)

Proje yapısı [Capacitor](https://capacitorjs.com/) ile paketlemeye uygun
bırakılmıştır. İleride APK üretmek isterseniz:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Beşiktaş Çalışkanoğlu" "com.example.bjkcaliskanoglu"
npm run build
npx cap add android
npx cap sync
```

İlk aşamada odak PWA'dır; APK adımı tamamen opsiyoneldir.

## Performans notları

- 3D sahne düşük poligon sayılı geometrilerle kuruludur; ağır GLTF modelleri
  kullanılmaz.
- `Performance Mode` (Sistem sayfasından açılabilir, düşük çekirdek sayılı /
  küçük ekranlı cihazlarda otomatik açılır) parçacık sayısını ve kayan
  panelleri azaltır.
- Kamera hareketi damped'dir (ani sıçrama yapmaz), `prefers-reduced-motion`
  tercihine saygı gösterilir.

## Telif / Fan Yapımı Bildirimi

> Bu uygulama tamamen fan yapımı ve ticari olmayan bir hayran projesidir.
> Beşiktaş Jimnastik Kulübü veya ilgili kişi/kurumlarla resmi bir bağlantısı
> yoktur.

Bu bildirim uygulama içinde **Sistem** sayfasında da görünür durumdadır.
Projedeki arma tamamen orijinal, stilize bir fan-art tasarımıdır — resmi
kulüp amblemi değildir. Kendi yasal haklarınız dahilindeki görselleri
kullanmak sizin sorumluluğunuzdadır.

## Lisans

Bu proje **özel bir hediyedir** ve açık kaynak değildir. Tüm hakları
sinancaliskanogluabi fan sayfasına aittir. Kopyalanamaz, başka bir isim
altında paylaşılamaz veya ticari amaçla kullanılamaz. Ayrıntılar için
[`LICENSE.txt`](./LICENSE.txt) dosyasına bakın.
