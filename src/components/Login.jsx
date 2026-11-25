import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const initialForm = {
  email: '',
  password: '',
  terms: false,
}

export default function Login() {
  const [form, setForm] = useState(initialForm)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/success', { state: { email: form.email } })
  }

  return (
    <form className="login-card" onSubmit={handleSubmit} noValidate>
      <h1>Giriş Yap</h1>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="ornek@mail.com"
        value={form.email}
        onChange={handleChange}
        data-cy="email-input"
      />

      <label htmlFor="password">Şifre</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Şifrenizi girin"
        value={form.password}
        onChange={handleChange}
        data-cy="password-input"
      />

      <label className="terms">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={form.terms}
          onChange={handleChange}
          data-cy="terms-input"
        />
        Şartları kabul ediyorum
      </label>

      <button type="submit" data-cy="submit-button">
        Giriş Yap
      </button>
    </form>
  )
}
