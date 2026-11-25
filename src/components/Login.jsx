import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// En az 8 karakter; en az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

const errorMessages = {
  email: 'Lütfen geçerli bir email adresi girin.',
  password:
    'Şifre en az 8 karakter olmalı; büyük harf, küçük harf, rakam ve özel karakter içermeli.',
  terms: 'Devam etmek için şartları kabul etmelisiniz.',
}

const initialForm = {
  email: '',
  password: '',
  terms: false,
}

const validate = (form) => ({
  email: emailRegex.test(form.email.trim()),
  password: strongPasswordRegex.test(form.password),
  terms: form.terms,
})

export default function Login() {
  const [form, setForm] = useState(initialForm)
  // Hata mesajı sadece kullanıcının dokunduğu alanlarda gösterilir
  const [touched, setTouched] = useState({ email: false, password: false, terms: false })
  const navigate = useNavigate()

  const valid = validate(form)
  const isFormValid = valid.email && valid.password && valid.terms
  const showError = (field) => touched[field] && !valid[field]

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    setTouched({ ...touched, [name]: true })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isFormValid) return
    navigate('/success', { state: { email: form.email.trim() } })
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
        className={showError('email') ? 'invalid' : ''}
        aria-invalid={showError('email')}
        data-cy="email-input"
      />
      {showError('email') && (
        <p className="error" data-cy="error-email">
          {errorMessages.email}
        </p>
      )}

      <label htmlFor="password">Şifre</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Şifrenizi girin"
        value={form.password}
        onChange={handleChange}
        className={showError('password') ? 'invalid' : ''}
        aria-invalid={showError('password')}
        data-cy="password-input"
      />
      {showError('password') && (
        <p className="error" data-cy="error-password">
          {errorMessages.password}
        </p>
      )}

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
      {showError('terms') && (
        <p className="error" data-cy="error-terms">
          {errorMessages.terms}
        </p>
      )}

      <button type="submit" disabled={!isFormValid} data-cy="submit-button">
        Giriş Yap
      </button>
    </form>
  )
}
