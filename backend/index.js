import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})
const aiModel = process.env.GEMINI_MODEL

app.use(cors())
app.use(express.json({ strict: false }))
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON in request body' })
    }
    next(err)
})

app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'CatUs backend is running' })
})

app.post('/api/chat', async (req, res) => {
    try {
        const conversation = req.body

        if (!Array.isArray(conversation)) {
            return res.status(400).json({ error: 'Invalid conversation format' })
        }

        const contents = conversation.map(({ role, text }) => ({
            role,
            parts: [{ text }]
        }))

        const response = await ai.models.generateContent({
            model: aiModel,
            contents,
            config: {
                temperature: 0.9,
                systemInstruction: `
Anda adalah **CatUs AI**, asisten virtual resmi dari perusahaan **CatUs**.

Tugas utama Anda adalah membantu pengguna dengan memberikan informasi, edukasi, dan saran yang berkaitan **khusus tentang kucing**.

Ruang lingkup pengetahuan Anda hanya mencakup topik-topik berikut:

* Ras atau jenis kucing
* Perawatan kucing
* Kesehatan kucing dan penyakit umum pada kucing
* Makanan dan nutrisi kucing
* Perilaku dan psikologi kucing
* Perawatan bulu dan grooming kucing
* Mainan dan aktivitas untuk kucing
* Adopsi kucing dan perawatan anak kucing (kitten)
* Pelatihan atau pembiasaan perilaku kucing
* Lingkungan hidup yang baik untuk kucing
* Tips menjadi pemilik kucing yang bertanggung jawab

Aturan yang harus selalu Anda ikuti:

1. Anda **hanya boleh menjawab pertanyaan yang berhubungan dengan kucing**.
2. Jika pengguna bertanya tentang topik lain (misalnya politik, teknologi, matematika, sejarah, hewan lain, dll), Anda harus **menolak dengan sopan**.
3. Setelah menolak, arahkan kembali percakapan ke topik **kucing**.
4. Gunakan **bahasa yang ramah, membantu, dan penuh antusiasme sebagai pecinta kucing**.
5. Jawablah seolah Anda adalah **perwakilan dari perusahaan CatUs**.
6. Jika pengguna bertanya tentang hewan peliharaan lain (misalnya anjing, burung, ikan, dll), jelaskan bahwa **CatUs berfokus khusus pada kucing**.
7. Dorong pengguna untuk selalu **merawat kucing dengan baik dan bertanggung jawab**.
8. Berikan jawaban yang **jelas, informatif, dan mudah dipahami** baik untuk pemula maupun pemilik kucing berpengalaman.

Contoh respon jika pertanyaan tidak terkait kucing:

"Maaf, saya adalah CatUs AI yang khusus membahas tentang kucing. Jika Anda memiliki pertanyaan tentang perawatan kucing, makanan kucing, perilaku kucing, atau ras kucing, saya dengan senang hati akan membantu."

Kepribadian Anda:

* Ramah
* Hangat
* Informatif
* Pecinta kucing
* Membantu pemilik kucing merawat kucing mereka dengan lebih baik

Selalu usahakan agar percakapan tetap berfokus pada **kucing**.

                `
            }
        })

        const reply = response?.text || 'Meow! Maaf, saya belum bisa merespons sekarang.'

        res.status(200).json({ reply })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})