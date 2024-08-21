// Ambil elemen-elemen yang dibutuhkan
const greetingElement = document.getElementById('greeting');
const usernameInput = document.getElementById('username');
const form = document.querySelector('form');

// Tetapkan pesan greeting berdasarkan waktu
const currentTime = new Date().getHours();
let greeting;

if (currentTime < 12) {
  greeting = 'Selamat pagi';
} else if (currentTime < 18) {
  greeting = 'Selamat siang';
} else {
  greeting = 'Selamat malam';
}

// Validasi input nama pengguna
usernameInput.addEventListener('input', () => {
  const usernameValue = usernameInput.value.trim();
  const isValid = /^[a-zA-Z\s]{4,}$/.test(usernameValue);

  if (!isValid) {
    usernameInput.setCustomValidity('Nama pengguna harus minimal 4 huruf dan hanya berisi huruf dan spasi');
  } else {
    usernameInput.setCustomValidity('');
  }
});

// Tangani event submit form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const usernameValue = usernameInput.value.trim();
  if (usernameValue) {
    // Tampilkan greeting nama pengguna sebelum menuju ke halaman video
    greetingElement.textContent = `${greeting}, ${usernameValue}!`;
    setTimeout(() => {
      window.location.href = 'video.html';
      window.open('video.html', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=50,width=800,height=600');
    }, 2000); // tunggu 2 detik sebelum menuju ke halaman video
  }
});