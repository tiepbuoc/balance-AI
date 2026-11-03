// balance-export.js — Tiện ích xuất CSV / Excel dùng chung cho trang Admin và trang Dữ liệu.
// Excel dùng thư viện SheetJS (biến toàn cục XLSX, nạp bằng thẻ <script> trong trang).
// Dữ liệu truyền vào luôn là mảng 2 chiều: rows[0] là dòng tiêu đề.

// Chống "CSV/formula injection": ô văn bản bắt đầu bằng = + - @ sẽ bị Excel hiểu là công thức.
// Câu trả lời tự luận của học sinh là văn bản tự do nên phải vô hiệu hoá bằng dấu nháy đơn đứng đầu.
function safeText(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "number" || typeof v === "boolean") return v;
  const s = String(v);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function csvCell(v) {
  const s = String(safeText(v));
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

export function toCSV(rows) {
  return rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// BOM (﻿) để Excel mở file CSV tiếng Việt đúng font, không bị lỗi dấu.
export function downloadCSV(filename, rows) {
  saveBlob(new Blob(["﻿" + toCSV(rows)], { type: "text/csv;charset=utf-8;" }), filename);
}

function sheetName(name, used) {
  let n = String(name).replace(/[\\\/?*\[\]:]/g, " ").trim().slice(0, 31) || "Sheet";
  let i = 2;
  const base = n;
  while (used.has(n)) n = base.slice(0, 28) + " " + i++;
  used.add(n);
  return n;
}

// sheets: [{ name, rows, widths? }] — widths: mảng độ rộng cột (ký tự), không bắt buộc.
export function downloadXLSX(filename, sheets) {
  if (typeof XLSX === "undefined") throw new Error("Chưa nạp được thư viện xuất Excel (SheetJS). Kiểm tra kết nối mạng rồi thử lại.");
  const wb = XLSX.utils.book_new();
  const used = new Set();
  sheets.forEach((sh) => {
    const aoa = sh.rows.map((r) => r.map((v) => (v === null || v === undefined ? "" : v)));
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    // Tự ước lượng độ rộng cột theo nội dung (tối đa 60 ký tự) nếu không truyền sẵn.
    const nCols = Math.max(0, ...aoa.map((r) => r.length));
    ws["!cols"] = sh.widths
      ? sh.widths.map((w) => ({ wch: w }))
      : Array.from({ length: nCols }, (_, c) => ({
          wch: Math.min(60, Math.max(8, ...aoa.slice(0, 200).map((r) => String(r[c] ?? "").length)) + 2),
        }));
    if (aoa.length > 1) ws["!autofilter"] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: aoa.length - 1, c: nCols - 1 } }) };
    XLSX.utils.book_append_sheet(wb, ws, sheetName(sh.name, used));
  });
  XLSX.writeFile(wb, filename);
}

export function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}
