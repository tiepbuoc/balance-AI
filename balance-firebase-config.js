// balance-firebase-config.js
// Cấu hình Firebase RIÊNG cho hệ thống BalanceAI — độc lập hoàn toàn với AI SMART
// (AI SMART Chatbot / Learning Passport dùng project Firebase khác, xem firebase-config.js).
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const acdiFirebaseConfig = {
  apiKey: "AIzaSyBJHnEDIsvpNRXVA3ZtV9pHiJta361ZsNs",
  authDomain: "balanceai-764b2.firebaseapp.com",
  projectId: "balanceai-764b2",
  storageBucket: "balanceai-764b2.firebasestorage.app",
  messagingSenderId: "507672694571",
  appId: "1:507672694571:web:9660b55ea7d1433c8d7f6e",
  measurementId: "G-K3HFRQ8Y4D",
};

export const acdiApp = initializeApp(acdiFirebaseConfig, "acdi");
export const acdiDb = getFirestore(acdiApp);
// Auth chỉ dùng để tạo phiên ẨN DANH (Anonymous) xin token gọi BalanceAI Gateway (n8n) — học sinh vẫn không cần đăng nhập.
export const acdiAuth = getAuth(acdiApp);
