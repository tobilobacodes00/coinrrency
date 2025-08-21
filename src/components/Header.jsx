import { Link } from 'react-router';

const Header = () => {
  return (
    <div className='top-nav'>
      <img className="img-logo" src="https://i.postimg.cc/NF5mTdbQ/tobiloba-Codes-logo-1.png" alt="tobilobaCodes" />
            <h1 className="header-h1">Crypt.now 🚀</h1>
      <div>
        <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      </div>
      
      
    </div>
  );
};

export default Header;