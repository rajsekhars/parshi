/* =========================
   CONFIG (edit these)
========================= */
const WHATSAPP_NUMBER = "918688486336"; 
const PHONE_NUMBER = "+91 8688486336";  
const INSTAGRAM_URL = "https://www.instagram.com/parshi_healthywaffles/";            
const GOOGLE_MAPS_DIRECTIONS_URL = "https://www.google.com/maps?q=Manikonda%2C%20Hyderabad"; // replace with exact

const DEFAULT_ORDER_MESSAGE =
  "Hi Parshi 👋 I want to place an order.%0A%0AName:%0AItem:%0AQty:%0AAddress:%0APayment: UPI/COD%0A%0AThank you!";

function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

/* =========================
   NAV (mobile)
========================= */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

hamburgerBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});
mobileMenu?.querySelectorAll("a").forEach(a=>{
  a.addEventListener("click", ()=> mobileMenu.classList.remove("show"));
});

/* =========================
   Buttons: WhatsApp, Call, Directions, Social
========================= */
document.getElementById("whatsappDisplay").textContent = "+" + WHATSAPP_NUMBER;

["orderTopBtn","orderBottomBtn","orderSignatureBtn"].forEach(id=>{
  document.getElementById(id)?.addEventListener("click",(e)=>{
    e.preventDefault();
    window.open(waLink(DEFAULT_ORDER_MESSAGE), "_blank");
  });
});

document.getElementById("bulkBtn")?.addEventListener("click",(e)=>{
  e.preventDefault();
  const msg = encodeURIComponent(
    "Hi Parshi!  I’m looking for bulk/party order pricing. Please share combo options and rates.\n\nDate:\nQty:\nArea:\n"
  );
  window.open(waLink(msg), "_blank");
});

document.getElementById("callBtn")?.addEventListener("click",(e)=>{
  e.preventDefault();
  window.location.href = `tel:${PHONE_NUMBER.replace(/\s/g,'')}`;
});

document.getElementById("directionsBtn")?.addEventListener("click",(e)=>{
  e.preventDefault();
  window.open(GOOGLE_MAPS_DIRECTIONS_URL, "_blank");
});

document.getElementById("igLink").href = INSTAGRAM_URL;
document.getElementById("waLink").href = waLink(DEFAULT_ORDER_MESSAGE);

/* =========================
   Menu item modal
========================= */
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModal");
const close2 = document.getElementById("mCloseBtn2");
const mTitle = document.getElementById("mTitle");
const mDesc = document.getElementById("mDesc");
const mIngredients = document.getElementById("mIngredients");
const mNutri = document.getElementById("mNutri");
const mOrderBtn = document.getElementById("mOrderBtn");

let currentItem = null;

function openModal(itemEl){
  currentItem = itemEl;
  const name = itemEl.dataset.name || "Waffle";
  const price = itemEl.dataset.price || "";
  const desc = itemEl.dataset.desc || "";
  const ingredients = (itemEl.dataset.ingredients || "")
    .split(",").map(s=>s.trim()).filter(Boolean);

  const nutrients = (itemEl.dataset.nutrients || "")
    .split("|").map(s=>s.trim()).filter(Boolean);

  mTitle.textContent = `${name} • ${price}`;
  mDesc.textContent = desc;

  mIngredients.innerHTML = "";
  ingredients.forEach(i=>{
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = i;
    mIngredients.appendChild(chip);
  });

  mNutri.innerHTML = "";
  nutrients.forEach(n=>{
    const parts = n.split(":");
    const row = document.createElement("div");
    row.className = "nutriRow";
    row.innerHTML = `<b>${(parts[0]||"").trim()}</b><span>${(parts[1]||"").trim()}</span>`;
    mNutri.appendChild(row);
  });

  modalOverlay.style.display = "flex";
  modalOverlay.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modalOverlay.style.display = "none";
  modalOverlay.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
  currentItem = null;
}

document.querySelectorAll(".menuItem").forEach(item=>{
  item.querySelector(".viewBtn")?.addEventListener("click", ()=> openModal(item));
  item.querySelector(".orderBtn")?.addEventListener("click", ()=>{
    const name = item.dataset.name || "Waffle";
    const msg = encodeURIComponent(
      `Hi Parshi 👋 I want to order:\n\nItem: ${name}\nQty: 1\nAddress: \nPayment: UPI/COD\n\nPlease confirm total and delivery time.`
    );
    window.open(waLink(msg), "_blank");
  });
  item.querySelector(".menuThumb")?.addEventListener("click", ()=> openModal(item));
});

closeModalBtn?.addEventListener("click", closeModal);
close2?.addEventListener("click", closeModal);
modalOverlay?.addEventListener("click", (e)=>{
  if(e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown",(e)=>{
  if(e.key === "Escape" && modalOverlay.style.display === "flex") closeModal();
});

mOrderBtn?.addEventListener("click", ()=>{
  if(!currentItem) return;
  const name = currentItem.dataset.name || "Waffle";
  const msg = encodeURIComponent(
    `Hi Parshi 👋 I want to order:\n\nItem: ${name}\nQty: 1\nAddress: \nPayment: UPI/COD\n\nPlease confirm total and delivery time.`
  );
  window.open(waLink(msg), "_blank");
});

/* Footer year */
document.getElementById("year").textContent = new Date().getFullYear();
