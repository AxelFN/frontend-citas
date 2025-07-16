document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch("https://backend-citas-4ye2.onrender.com/api/auth/login", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('rol', data.usuario.rol);
    window.location.href = data.usuario.rol === 'admin' ? 'dashboard.html' : 'agendar.html';
  } else {
    alert(data.msg);
  }
});
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;

    const res = await fetch("https://backend-citas-4ye2.onrender.com/api/auth/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password, rol })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Registro exitoso. Inicia sesión.');
      window.location.href = 'index.html';
    } else {
      alert(data.msg);
    }
  });
}
