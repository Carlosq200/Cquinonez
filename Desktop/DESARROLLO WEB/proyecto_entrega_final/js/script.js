const KEY_BG='bgColor';const KEY_FORM='formData';
function saveForm(){const d={nombre:document.getElementById('nombre').value.trim(),correo:document.getElementById('correo').value.trim(),bio:document.getElementById('bio').value.trim()};localStorage.setItem(KEY_FORM,JSON.stringify(d));return d;}
function loadForm(){try{return JSON.parse(localStorage.getItem(KEY_FORM)||'null');}catch{return null;}}
document.addEventListener('DOMContentLoaded',()=>{
  const bg=localStorage.getItem(KEY_BG); if(bg){document.body.style.background=bg;}
  const data=loadForm(); if(data){nombre.value=data.nombre||''; correo.value=data.correo||''; bio.value=data.bio||''; tdNombre.textContent=data.nombre||'—'; tdCorreo.textContent=data.correo||'—';}
  btnBienvenida.addEventListener('click',()=>alert('¡Bienvenido/a!'));
  btnColor.addEventListener('click',()=>{const c=['#f5f7fb','#eef2ff','#ecfeff','#fff7ed'];const a=localStorage.getItem(KEY_BG)||c[0];const i=(c.indexOf(a)+1)%c.length;const n=c[i];document.body.style.background=n;localStorage.setItem(KEY_BG,n);});
  btnAgregar.addEventListener('click',()=>{const val=(nuevoInteres.value||'').trim();if(!val)return;const li=document.createElement('li');li.textContent=val;lista.appendChild(li);const previo=(tdIntereses.textContent||'').trim();tdIntereses.textContent=previo&&previo!=='—'?`${previo}, ${val}`:val;nuevoInteres.value='';});
  perfilForm.addEventListener('submit',(ev)=>{ev.preventDefault();let ok=true;if(!nombre.value.trim()){nombre.classList.add('is-invalid');ok=false;}else{nombre.classList.remove('is-invalid');}if(!correo.checkValidity()){correo.classList.add('is-invalid');ok=false;}else{correo.classList.remove('is-invalid');}if(!ok)return;const d=saveForm();tdNombre.textContent=d.nombre;tdCorreo.textContent=d.correo;});
  foto.addEventListener('mouseover',()=>{foto.style.cursor='pointer';});
});