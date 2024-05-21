import './index.css'
const Header=()=>{
    return (
      <div className="header-main-container">
        <div className="header-sub-container">
          <h1 className="header-main-heading">Hi, Kapil</h1>
          <p className="header-sub-heading">
            Welcome to <span style={{ color: "#33ff33",fontWeight:"600" }}>Expense Tracker</span>
          </p>
        </div>
      </div>
    );
}

export default Header