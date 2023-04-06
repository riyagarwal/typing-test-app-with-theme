import AccountCircle from './AccountCircle'

const Header = () => {
  return (
    <div className="header">
        <div className="logo">
            LOGO
        </div>
        <div className="user-btn">
            <AccountCircle/>
        </div>
    </div>
  )
}

export default Header