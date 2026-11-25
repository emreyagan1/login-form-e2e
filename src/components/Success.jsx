import { Link, useLocation } from 'react-router-dom'
import './Login.css'

export default function Success() {
  const { state } = useLocation()

  return (
    <div className="login-card success" data-cy="success-page">
      <h1>Giriş başarılı!</h1>
      <p>{state?.email ? `Hoş geldin, ${state.email}` : 'Hoş geldin.'}</p>
      <Link to="/">Login sayfasına dön</Link>
    </div>
  )
}
