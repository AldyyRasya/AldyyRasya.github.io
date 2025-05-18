document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen-elemen yang dibutuhkan
    const usernameElement = document.getElementById('username');
    const timeDisplay = document.getElementById('time-display');
    const logoutButton = document.getElementById('logout-button');

    // Ambil username dari localStorage
    const username = localStorage.getItem('username');
    if (username) {
        usernameElement.textContent = username;
    } else {
        // Jika tidak ada username, arahkan kembali ke halaman login
        window.location.href = './index.html';
    }

    // Update tanggal dan waktu
    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        const formattedTime = now.toLocaleTimeString('en-US');
        
        timeDisplay.textContent = `${formattedDate}, ${formattedTime}`;
    }

    setInterval(updateTime, 1000);
    updateTime();

    // Tangani tombol logout
    logoutButton.addEventListener('click', () => {
        const confirmLogout = confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            // Hapus username dari localStorage
            localStorage.removeItem('username');
            // Tampilkan notifikasi logout dan arahkan ke halaman login
            alert('You have been logged out.');
            window.location.href = './index.html';
        }
    });

    // Feedback Popup
    const feedbackButton = document.querySelector('.feedback-button');
    const feedbackPopup = document.getElementById('feedback-popup');
    const closePopup = document.getElementById('close-popup');
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackMessage = document.getElementById('feedback-message');

    // Tampilkan popup feedback saat tombol ditekan
    feedbackButton.addEventListener('click', () => {
        feedbackPopup.style.display = 'block';
    });

    // Tutup popup feedback saat tombol close ditekan
    closePopup.addEventListener('click', () => {
        feedbackPopup.style.display = 'none';
    });

    // Tangani pengiriman formulir
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Kirim data feedback ke bot Telegram
        const token = '7387826039:AAGR6GjoVPi7MOCu8jJMG6p2FlvWXINUwBg'; // Ganti dengan token bot Telegram Anda
        const chatId = '-1002192013454'; // Ganti dengan ID chat Anda
        const feedbackText = `Feedback Received:\nName: ${name}\nEmail: ${email || 'N/A'}\nMessage: ${message}`;
        
        try {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: feedbackText,
                }),
            });
            feedbackMessage.textContent = 'Thank you for your feedback!\nYour feedback has been submitted to the developer';
            feedbackMessage.style.color = '#28a745'; // Warna hijau untuk pesan berhasil

            // Kosongkan textarea setelah 2 detik
            setTimeout(() => {
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                feedbackPopup.style.display = 'none';
            }, 2000);
        } catch (error) {
            feedbackMessage.textContent = 'Failed to send feedback. Please try again.';
            feedbackMessage.style.color = '#d9534f'; // Warna merah untuk pesan gagal
        }
    });
});
