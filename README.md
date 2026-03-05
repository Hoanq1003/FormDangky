# Đăng Ký Nhiều Mục — Registration Webapp

Webapp mobile-first thay thế Google Forms cho quy trình đăng ký nhiều mục.

## 🛠 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form** + **Zod**
- **Google Sheets API** (server-side)
- **Vercel** (deployment)

## 📋 Tính năng

- Đăng ký thông tin chung + nhiều mục chi tiết
- 5 loại mục (hương linh trong/ngoài 49 ngày, tâm linh bài 8, tâm linh khác, đăng ký lại)
- Sửa / Xoá / Nhân bản mục trước khi gửi
- Gợi ý chọn mục tự động (helper flow)
- Auto-save draft bằng localStorage
- Ghi dữ liệu vào Google Sheets (server-side only)
- Admin area xem/tìm kiếm đăng ký
- Mobile-first, responsive

---

## 🚀 Bắt đầu

### 1. Cài dependencies

```bash
npm install
```

### 2. Tạo Google Cloud Project

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới (hoặc chọn project có sẵn)
3. Bật **Google Sheets API**: API & Services → Library → tìm "Google Sheets API" → Enable

### 3. Tạo Service Account

1. IAM & Admin → Service Accounts → Create Service Account
2. Đặt tên (VD: `sheets-writer`)
3. Bỏ qua vai trò (hoặc chọn Editor)
4. Tạo key: Keys tab → Add Key → Create New Key → JSON
5. Tải file JSON về

### 4. Tạo Google Spreadsheet

1. Tạo Google Spreadsheet mới
2. Tạo 5 tab (sheets) với tên chính xác:
   - `settings`
   - `categories`
   - `submissions`
   - `submission_items`
   - `audit_logs`

3. **Tab `settings`** — Thêm header row:
   ```
   key | value | description
   ```
   Và seed rows:
   ```
   app_name | Dang ky nhieu muc |
   submission_prefix | DK |
   ```

4. **Tab `categories`** — Thêm header row:
   ```
   category_key | category_label | helper_text | choose_if_text | example_text | active | sort_order
   ```

5. **Tab `submissions`** — Thêm header row:
   ```
   submission_id | submission_code | created_at | updated_at | status | applicant_name | applicant_phone | applicant_zalo | applicant_address | total_items | categories_text | applicant_payload_json | source | notes
   ```

6. **Tab `submission_items`** — Thêm header row:
   ```
   item_id | submission_id | item_index | category_key | category_label | created_at | updated_at | display_name | summary_text | subject_name | reference_value | item_payload_json | status
   ```

7. **Tab `audit_logs`** — Thêm header row:
   ```
   log_id | submission_id | action | created_at | detail
   ```

### 5. Share Spreadsheet cho Service Account

1. Copy email từ file JSON (trường `client_email`)
2. Mở Google Spreadsheet → Share → Paste email đó → Editor → Send

### 6. Cấu hình `.env.local`

```bash
cp .env.example .env.local
```

Điền thông tin:

```env
GOOGLE_CLIENT_EMAIL=your-sa@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
ADMIN_PASSWORD=your-admin-password
NEXT_PUBLIC_APP_NAME=Đăng Ký Nhiều Mục
```

> **Lưu ý:** `GOOGLE_PRIVATE_KEY` phải giữ nguyên format với `\n`. Copy từ file JSON.

### 7. Chạy local

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

### 8. Deploy lên Vercel

1. Push code lên GitHub
2. Vào [Vercel](https://vercel.com/) → Import project
3. Thêm Environment Variables (giống `.env.local`)
4. Deploy

> **Lưu ý Vercel:** `GOOGLE_PRIVATE_KEY` trên Vercel cần thay `\n` thành actual newlines hoặc giữ nguyên — code đã xử lý `replace(/\\n/g, '\n')`.

---

## ⚙️ Cách thêm category mới

1. Mở `src/config/categories.ts`
2. Thêm entry mới vào mảng `CATEGORIES`:

```typescript
{
  key: 'new_category_key',
  label: 'Tên mục mới',
  helperText: 'Mô tả ngắn...',
  chooseIfText: 'Chọn mục này nếu...',
  exampleText: 'Ví dụ: ...',
  icon: '🆕',
  fields: [
    { name: 'fieldName', label: 'Tên field', type: 'text', required: true, placeholder: '...' },
  ],
  defaultValues: { fieldName: '' },
}
```

3. Thêm Zod schema tương ứng vào `src/schemas/submission.ts`
4. Thêm key mới vào `CategoryKey` type trong `src/types/index.ts`

## ⚙️ Cách đổi field của category

1. Mở `src/config/categories.ts`
2. Tìm category cần đổi
3. Edit mảng `fields` và object `defaultValues`
4. Cập nhật Zod schema tương ứng trong `src/schemas/submission.ts`

---

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── admin/page.tsx          # Admin area
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── actions/
│   ├── admin.ts                # Admin server actions
│   └── submit.ts               # Submit server action
├── components/
│   ├── screens/                # All wizard screens
│   ├── ui/                     # shadcn/ui components
│   └── RegistrationWizard.tsx  # Main wizard orchestrator
├── config/
│   └── categories.ts           # Category registry (edit here!)
├── lib/
│   ├── sheets/                 # Google Sheets client
│   └── utils/                  # Draft, submission code utils
├── schemas/
│   ├── applicant.ts            # Applicant Zod schema
│   └── submission.ts           # Category + submission schemas
└── types/
    └── index.ts                # TypeScript types
```
