import React from 'react'

import './styles.scss'
import Promote from "../Promote";
import TopBarContainer from "../TopBarContainer";

const WrapperContent: React.FunctionComponent<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div id="page-content" className={className}>
      <TopBarContainer transparent={true}/>
      {children}
      <Promote/>
    </div>
  )
}

export default WrapperContent
