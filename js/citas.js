const token = localStorage.getItem('token');

if (!token) {
  alert('No has iniciado sesión');
  window.location.href = 'index.html';
}

async function cargarSelects() {
  const [medicos, especialidades, unidades] = await Promise.all([
    fetch('http://localhost:5000/api/medicos', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    fetch('http://localhost:5000/api/especialidades', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    fetch('http://localhost:5000/api/unidades', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
  ]);

  medicos.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m._id;
    opt.textContent = m.nombre;
    document.getElementById('medico').appendChild(opt);
  });

  especialidades.forEach(e => {
    const opt = document.createElement('option');
    opt.value = e._id;
    opt.textContent = e.nombre;
    document.getElementById('especialidad').appendChild(opt);
  });

  unidades.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u._id;
    opt.textContent = u.nombre;
    document.getElementById('unidad').appendChild(opt);
  });
}

document.getElementById('formCita').addEventListener('submit', async (e) => {
  e.preventDefault();
  const cita = {
    medico_id: document.getElementById('medico').value,
    especialidad_id: document.getElementById('especialidad').value,
    unidad_medica_id: document.getElementById('unidad').value,
    tipo_consulta: document.getElementById('tipo').value,
    fecha: document.getElementById('fecha').value,
  };

  const res = await fetch('http://localhost:5000/api/citas', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cita)
  });

  if (res.ok) {
    alert('Cita agendada correctamente');
  } else {
    alert('Error al agendar cita');
  }
});

cargarSelects();
