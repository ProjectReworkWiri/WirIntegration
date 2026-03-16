const avatarInput = document.querySelector("#avatarInput");
const avatarLabel = document.querySelector(".avatar");
<<<<<<< HEAD
let footerAvatar; // La declaramos arriba pero sin asignar

const apiUrl = "http://localhost:4000/";

// 1. Cargamos el partial
=======
let footerAvatar; // Reference to the avatar element inside the loaded navbar/footer

const apiUrl = "https://wirintegration-production.up.railway.app/";

// 1. Load the navbar/footer partial dynamically
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
fetch("../partials/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;

<<<<<<< HEAD
    // 2. IMPORTANTE: Buscamos el elemento RECIÉN CARGADO aquí adentro
=======
    // 2. Important: select the avatar element AFTER the HTML fragment is inserted
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    footerAvatar = document.querySelector(".footeravatar");
  });

if (avatarInput && avatarLabel) {
  avatarInput.addEventListener("change", (event) => {
<<<<<<< HEAD
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    // Actualizar avatar principal
    avatarLabel.innerHTML = ""; // Más limpio que textContent = ""
=======

    // Get the selected image file
    const file = event.target.files[0];
    if (!file) return;

    // Create a temporary URL to preview the selected image
    const imageUrl = URL.createObjectURL(file);

    // Update main avatar preview
    avatarLabel.innerHTML = "";
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    const preview = document.createElement("img");
    preview.src = imageUrl;
    preview.alt = "Avatar";
    avatarLabel.appendChild(preview);

<<<<<<< HEAD
    // 3. Sincronizar con el avatar del navbar/footer
    // Volvemos a intentar capturarlo por si el fetch tardó
=======
    // 3. Sync avatar with the navbar/footer avatar
    // Try to capture it again in case the fetch finished later
>>>>>>> 6ce25b36f8885c6b442e86ef96400980d33a1d8c
    const dynamicAvatar = document.querySelector(".footeravatar");

    if (dynamicAvatar) {
      dynamicAvatar.innerHTML = "";
      const navPreview = document.createElement("img");
      navPreview.src = imageUrl;
      dynamicAvatar.appendChild(navPreview);
    }
  });
}