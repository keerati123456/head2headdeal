# Head2HeadDeal

เปรียบเทียบสินค้าตัวต่อตัว (1v1) สร้างด้วย Next.js + TypeScript + Tailwind + Markdown

## 🚀 เริ่มต้นใช้งาน
```bash
npm i
npm run dev # http://localhost:3000
```

## 📦 Build (Static Export)
สำหรับ GitHub Pages:
- ตั้งค่า env ใน Actions: `GITHUB_PAGES=true`, `NEXT_PUBLIC_BASE_PATH=head2headdeal`, `NEXT_PUBLIC_SITE_URL=https://<username>.github.io`
```bash
npm run build
```
ผลลัพธ์จะอยู่ใน `out/`

## ✍️ เขียนบทความใหม่
สร้างไฟล์ Markdown ใน `content/posts/<slug>.md` แล้วใส่ frontmatter ตามตัวอย่าง

## 🥊 หน้าเปรียบเทียบ
เปิด `/compare?left=<slugA>&right=<slugB>`
