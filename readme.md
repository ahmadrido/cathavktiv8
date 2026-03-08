# 🐾 CatUs MeowChat

Chatbot berbasis AI yang khusus membahas tentang kucing. Dibangun menggunakan **Google Gemini AI** sebagai backend dan **vanilla HTML/CSS/JS** sebagai frontend.

## Fitur

- 💬 Chat interaktif dengan AI yang paham segala hal tentang kucing
- 🐱 Sistem instruksi khusus — AI hanya menjawab topik seputar kucing
- 🔄 Riwayat percakapan dikirim setiap request untuk konteks yang lebih baik
- 🔒 Tombol submit di-disable saat menunggu respons (mencegah double request)
- ⏳ Animasi loading spinner pada tombol kirim selama menunggu balasan bot
- 🎨 UI bertema kucing dengan dekorasi telinga kucing dan paw

## Tech Stack

| Layer    | Teknologi                                          |
| -------- | -------------------------------------------------- |
| Frontend | HTML, CSS, Vanilla JavaScript                      |
| Backend  | Node.js, Express 5                                 |
| AI Model | Google Gemini AI (`@google/genai`)                 |
| Lainnya  | CORS, dotenv                                       |

## Struktur Folder

```
├── index.html          # Halaman utama chatbot
├── script.js           # Logika frontend (fetch API, UI state)
├── style.css           # Styling dengan tema kucing
├── readme.md
└── backend/
    ├── index.js        # Express server + Gemini AI integration
    ├── package.json
    └── .env            # API key (tidak di-commit)
```

## Cara Menjalankan

### 1. Clone repository

```bash
git clone <repo-url>
cd starter
```

### 2. Setup backend

```bash
cd backend
npm install
```

### 3. Buat file `.env` di folder `backend/`

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash
PORT=3000
```

> Dapatkan API key di [Google AI Studio](https://aistudio.google.com/apikey)

### 4. Jalankan backend

```bash
node index.js
```

Server akan berjalan di `http://localhost:3000`.

### 5. Buka frontend

Buka file `index.html` di browser (bisa langsung double-click atau gunakan Live Server di VS Code).

## API Endpoint

### `POST /api/chat`

Mengirim percakapan ke Gemini AI dan menerima balasan.

**Request body** (JSON array):

```json
[
  { "role": "user", "text": "Apa ras kucing yang cocok untuk pemula?" },
  { "role": "model", "text": "Untuk pemula, ras kucing yang cocok antara lain..." },
  { "role": "user", "text": "Kalau British Shorthair bagaimana?" }
]
```

**Response:**

```json
{
  "reply": "British Shorthair adalah ras kucing yang tenang dan cocok untuk..."
}
```

## Screenshot

> Tambahkan screenshot UI chatbot di sini.

## Lisensi

ISC