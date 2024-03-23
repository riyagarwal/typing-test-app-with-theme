import AccountCircle from './AccountCircle'

const Header = () => {
  return (
    <div className="header">
        <div className="logo">
            TYPING TEST
        </div>
        <div className="user-btn">
            <AccountCircle/>
        </div>
    </div>
  )
}

export default Header