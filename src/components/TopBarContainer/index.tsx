import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import backIcon from '../../assets/images/icons/back.svg'
import leaveIcon from '../../assets/images/icons/leave.svg'
import logoImg from '../../assets/images/logo.svg'

import './styles.scss'
import { AuthContext } from '../../contexts/auth'

interface TopBarContainerProps {
  profile?: boolean
}

const TopBarContainer: React.FunctionComponent<TopBarContainerProps> = ({
  profile = false,
}) => {
  const { signOut, user } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="holder-top-bar">
      {profile ? (
        <div className="top-bar-container">
          <Link to="/profile" className="profile-button">
            <img
              src={
                user.avatar ||
                'https://api.adorable.io/avatars/285/abott@adorable.png'
              }
              alt="Perfil"
            />
            <p>{[user.name, user.surname].join(' ')}</p>
          </Link>
          <img onClick={(e) => handleSignOut()} src={leaveIcon} alt="Sair" />
        </div>
      ) : (
        <div className="top-bar-container">
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <img src={logoImg} alt="Proffy" />
        </div>
      )}
    </div>
  )
}

export default TopBarContainer
