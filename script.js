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

// Tangani event submit form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const usernameValue = usernameInput.value.trim();
  if (usernameValue) {
    // Simpan username di localStorage
    localStorage.setItem('username', usernameValue);

    // Tampilkan greeting nama pengguna sebelum menuju ke halaman maintenance
    greetingElement.textContent = `${greeting}, ${usernameValue}!`;
    setTimeout(() => {
      window.location.href = 'maintenance/maintenance.html'; // Ganti dengan nama file halaman maintenance jika perlu
    }, 2000); // Tunggu 2 detik sebelum menuju ke halaman maintenance
  } else {
    alert('Please enter a valid username.');
  }
});
