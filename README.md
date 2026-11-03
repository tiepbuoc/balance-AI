# BalanceAI

BalanceAI: khảo sát đo mức độ lệ thuộc nhận thức vào AI. Web tĩnh (GitHub Pages) + Firebase Firestore (project `balanceai-764b2`).

## Gọi AI qua n8n (BalanceAI Gateway)
Web **không còn API key LLM**. Hai chỗ dùng AI (nhận xét cá nhân hoá cho học sinh, soạn đề ở `admin.html`) đều gọi qua n8n:
`balance-gateway.js` → đăng nhập Firebase ẩn danh → `/balance-gw-token` → `/balance-gw-chat` (mode `feedback` | `generate_test`).
Workflow và hướng dẫn cài: thư mục `n8n/` (`balance-new-nodes-paste.json` / `gateway-combined.json`, `HUONG-DAN-N8N-GATEWAY.md`). Cấu hình URL: `balance-api-config.js`.
Cần bật **Anonymous** trong Firebase Authentication của project `balanceai-764b2`.

## Trang chủ & xuất dữ liệu
- Trang chủ (giới thiệu khảo sát) là `index.html`. Trang `admin.html` có nút "Về trang chủ".
- `admin.html` → tab "Quản trị đề khảo sát" → "Xuất ngân hàng câu hỏi" (CSV / Excel, toàn bộ hoặc chỉ đề đang chọn).
- `balance-data.html` → xuất CSV tổng hợp, CSV chi tiết đáp án, hoặc Excel (sheet Tổng hợp + Chi tiết đáp án). Chi tiết ghi nguyên văn câu hỏi, đáp án đã chọn và câu trả lời tự luận.
  Bài nộp mới lưu sẵn nguyên văn trong trường `responses`; bài nộp cũ được suy ra từ ngân hàng đề hiện tại và không có câu trả lời tự luận.
- Helper xuất file: `balance-export.js` (Excel dùng SheetJS qua CDN).
