import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import WrapperContent from '../../components/WrapperContent'
import LogoContainer from '../../components/LogoContainer'
import Input from '../../components/Input'
import Check from '../../components/Check'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import { AuthContext } from '../../contexts/auth'
import './styles.scss'

function Login() {
  const history = useHistory()
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function handleSignIn(e: React.MouseEvent) {
    e.preventDefault()
    await signIn({ email, password })
    history.push('/')
  }

  return (
    <div id="page-login">
      <WrapperContent className="page-content-right">
        <LogoContainer />
        <div className="login-container">
          <form className="form-80">
            <fieldset>
              <legend>
                <p>Fazer login</p>
                <Link to="/signup">Criar uma conta</Link>
              </legend>
              <Input
                name="email"
                placeholder="E-mail"
                stacked={true}
                value={String(email)}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <Input
                name="password"
                type="password"
                placeholder="Senha"
                stacked={true}
                value={String(password)}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <div className="login-tools">
                <Check label="Lembrar-me" name="remind" />
                <Link to="/forgot-password">Esqueci minha senha</Link>
              </div>
              <button
                onClick={handleSignIn}
                className="login-submit"
                type="submit"
              >
                Entrar
              </button>
            </fieldset>
            <div className="login-footer">
              <div className="signup">
                <p>Não tem conta?</p>
                <Link to="/signup">Cadastre-se</Link>
              </div>
              <span>
                É de graça <img src={purpleHeartIcon} alt="Coração roxo" />
              </span>
            </div>
          </form>
        </div>
      </WrapperContent>
    </div>
  )
}

export default Login
