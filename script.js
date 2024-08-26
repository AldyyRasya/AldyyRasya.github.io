// Ambil elemen-elemen yang dibutuhkan
const greetingElement = document.getElementById('greeting');
const usernameInput = document.getElementById('username');
const form = document.querySelector('form');

// Tetapkan pesan greeting berdasarkan waktu
const currentTime = new Date().getHours();
let greeting;

if (currentTime < 12) {
  greeting = 'Selamat pagi';
} else if (currentTime < 15) {
  greeting = 'Selamat siang';
} else if (currentTime < 18) {
  greeting = 'Selamat sore';
} else {
  greeting = 'Selamat malam';
}

// Validasi input nama pengguna
usernameInput.addEventListener('input', () => {
  const usernameValue = usernameInput.value.trim();
  const hasVowel = /[aeiouAEIOU]/.test(usernameValue); // Cek apakah ada huruf vokal
  const isValid = /^[a-zA-Z\s]{4,}$/.test(usernameValue) && hasVowel;

  if (!isValid) {
    usernameInput.setCustomValidity('Username must be at least 4 letters, contain only letters and spaces, and include at least one vowel.');
  } else {
    usernameInput.setCustomValidity('');
  }
});

// Fungsi untuk mengirim pesan ke bot Telegram
async function sendTelegramMessage(username) {
  const token = '7387826039:AAGR6GjoVPi7MOCu8jJMG6p2FlvWXINUwBg'; // Token bot Telegram
  const chatId = '-1002212055424'; // ID chat Telegram
  const message = `SESEORANG BARU SAJA MASUK\n\n> ${username} has logged in.`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error('Failed to send message to Telegram:', data.description);
  }
}

// Tangani event submit form
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const usernameValue = usernameInput.value.trim();
  if (usernameValue) {
    // Simpan username di localStorage
    localStorage.setItem('username', usernameValue);

    // Tampilkan greeting nama pengguna sebelum menuju ke halaman maintenance
    greetingElement.textContent = `${greeting}, ${usernameValue}!`;

    // Kirim pesan ke Telegram
    await sendTelegramMessage(usernameValue);

    // Tunggu 2 detik sebelum menuju ke halaman maintenance
    setTimeout(() => {
      window.location.href = 'maintenance/maintenance.html'; // Ganti dengan nama file halaman maintenance jika perlu
    }, 2000);
  } else {
    alert('Please enter a valid username.');
  }
});

// Mengubah judul tab setiap detik
    document.addEventListener('DOMContentLoaded', () => {
    // Ganti judul tab
    document.title = 'Your Domain Name'; // Ganti dengan nama domain atau teks yang diinginkan

    // Opsi tambahan untuk mengubah judul setiap detik jika diperlukan
    // const titles = ['Your Domain Name'];
    // let titleIndex = 0;

    // setInterval(() => {
    //     document.title = titles[titleIndex];
    //     titleIndex = (titleIndex + 1) % titles.length;
    // }, 1000);
});
