import { ref, push, onChildAdded, set, onValue, onDisconnect, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const chatBox = document.getElementById('chatBox');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatMessage');
const emojiBtn = document.getElementById("emojiBtn");
const emojiPanel = document.getElementById("emojiPanel");
let username = localStorage.getItem('chatUsername') || null;
let lastChatTime = 0;

// Toggle chat box (chỉ mở/đóng chat, không gọi popup tên)
window.toggleChat = function(){
  chatBox.classList.toggle("show");
}

// Emoji
emojiBtn.addEventListener("click", e=>{
  e.stopPropagation(); 
  emojiPanel.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  const panel = document.getElementById("emojiPanel");
  const btn = document.getElementById("emojiBtn");

  // ❌ Không đóng nếu đang click trong panel
  if (panel.contains(e.target)) return;

  // ❌ Không đóng nếu click nút mở emoji
  if (btn.contains(e.target)) return;

  // ✔ Còn lại thì đóng
  panel.classList.remove("show");
});

window.addEmoji = function(emoji){
  chatInput.value += emoji + " ";
  chatInput.focus();
}

// Save username
window.sendMessage = function(){
  if(!username){
    // Hiển thị popup **chỉ khi nhấn gửi**
    document.getElementById('namePrompt').style.display='flex';
    return;
  }
  const msg = chatInput.value.trim();
  if(!msg) return;
  if(username.length>30){ alert("Tên tối đa 30 ký tự"); return; }
  if(msg.length>1000){ alert("Tin nhắn tối đa 1000 ký tự"); return; }

  push(ref(window.db,'messages'), { name: username, text: msg, time: Date.now() });
  chatInput.value='';
}

window.saveUsername = function(){
  const name = document.getElementById('usernameInput').value.trim();
  if(!name){ alert("Nhập tên!"); return; }
  localStorage.setItem('chatUsername', name);
  username = name;
  document.getElementById('namePrompt').style.display='none';
  alert("Xin chào " + name + "!");
}

// Enter key
chatInput.addEventListener('keydown', e => { if(e.key==='Enter') sendMessage(); });

// Receive messages
onChildAdded(ref(window.db,'messages'), snap=>{
  const data = snap.val();
  const div = document.createElement('div');
  div.className = 'chat-message';
  const d = new Date(data.time);
  const tStr = `${d.getHours()}:${d.getMinutes()} - ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
  div.innerHTML = `<b>${data.name}</b> <small>(${tStr})</small><br>${data.text}`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
window.openEmojiTab = function(tabId) {
  // Ẩn tất cả nội dung
  document.querySelectorAll('.emoji-content').forEach(e => e.classList.remove('show'));

  // Bỏ active
  document.querySelectorAll('.emoji-tab').forEach(b => b.classList.remove('active'));

  // Hiện tab được chọn
  document.getElementById(tabId).classList.add('show');

  // Active nút tab
  const index = ['tab-smileys','tab-animals','tab-food','tab-travel','tab-symbols'].indexOf(tabId);
  document.querySelectorAll('.emoji-tab')[index].classList.add('active');
};

// ==== Realtime visitor statistics ====
const now = new Date();
const todayKey = now.toISOString().slice(0,10);
const yesterdayKey = new Date(now - 86400000).toISOString().slice(0,10);

const todayRef = ref(window.db, "visitors/days/" + todayKey);
get(todayRef).then(snap => set(todayRef, (snap.exists()?snap.val():0)+1));

const userId = Date.now().toString(36) + Math.random().toString(36).slice(2);
set(ref(window.db, "visitors/online/"+userId), true);
onDisconnect(ref(window.db, "visitors/online/"+userId)).remove();

onValue(ref(window.db, "visitors/online"), snap=>{
  const val = snap.val();
  document.getElementById("online").textContent = val ? Object.keys(val).length : 0;
});

onValue(ref(window.db,"visitors/days"), snap=>{
  const data = snap.val() || {};
  const today = data[todayKey] || 0;
  const yesterday = data[yesterdayKey] || 0;

  const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate()-now.getDay()+1);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let thisWeek=0, lastWeek=0, thisMonth=0, lastMonth=0;
  for(let [day,count] of Object.entries(data)){
    const d = new Date(day);
    const weekDiff = Math.floor((now-d)/604800000);
    const monthDiff = now.getMonth()-d.getMonth() + 12*(now.getFullYear()-d.getFullYear());
    if(d>=startOfWeek) thisWeek+=count;
    else if(weekDiff===1) lastWeek+=count;
    if(d>=startOfMonth) thisMonth+=count;
    else if(monthDiff===1) lastMonth+=count;
  }

  document.getElementById("today").textContent = today;
  document.getElementById("yesterday").textContent = yesterday;
  document.getElementById("thisweek").textContent = thisWeek;
  document.getElementById("lastweek").textContent = lastWeek;
  document.getElementById("thismonth").textContent = thisMonth;
  document.getElementById("lastmonth").textContent = lastMonth;
});

// Stats panel toggle
const toggleBtn = document.getElementById("stats-toggle");
const statsPanel = document.getElementById("stats-panel");

toggleBtn.addEventListener("click", ()=>{
  toggleBtn.classList.toggle("open");
  statsPanel.classList.toggle("open");
  toggleBtn.textContent = statsPanel.classList.contains("open") ? "<" : ">";
});
