const URL = "https://backend-citas-4ye2.onrender.com";

// Espera a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();

      try {
        const res = await fetch(`${URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, contrasena }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.usuario));

          if (data.tipo === "admin") {
            window.location.href = "dashboard.html";
          } else {
            window.location.href = "agendar.html";
          }
        } else {
          alert(data.mensaje || "Credenciales incorrectas");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error del servidor. Intenta más tarde.");
      }
    });
  }
});

