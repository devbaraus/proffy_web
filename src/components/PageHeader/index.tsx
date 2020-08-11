import React, { CSSProperties } from 'react'
import './styles.scss'
import TopBarContainer from '../TopBarContainer'

interface PageHeaderProps {
  title?: string
  description?: string
  background?: string
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  description,
  background,
  children,
}) => {
  const headerContentStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'contain',
  }
  return (
    <header
      className="page-header"
      style={(background as CSSProperties) && headerContentStyle}
    >
      <TopBarContainer />
      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  )
}

export default PageHeader
