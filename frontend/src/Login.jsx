import { useState } from 'react';

function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: user, password: pass }),
    });
    const resultado = await res.text();
    if (resultado.startsWith("¡Bienvenido")) { // acepta cualquier mensaje que empiece por "¡Bienvenido"
      setMsg(resultado);
      onLogin();
    } else {
      setMsg('Credenciales inválidas');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-green-200 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2 text-green-700">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          className="w-full mb-3 px-3 py-2 border rounded border-green-400 focus:outline-none focus:border-green-600"
          placeholder="Correo"
          value={user}
          onChange={e => setUser(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full mb-3 px-3 py-2 border rounded border-green-400 focus:outline-none focus:border-green-600"
          placeholder="Contraseña"
          value={pass}
          onChange={e => setPass(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold">
          Entrar
        </button>
        {msg && <p className="text-red-600 mt-3 text-center">{msg}</p>}
      </form>
    </div>
  );
}

export default Login;
