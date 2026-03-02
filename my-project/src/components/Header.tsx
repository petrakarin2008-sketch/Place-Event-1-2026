

const Header = () => {
  return (
    <header className="header">
      <h2>
        Welcom to{' '}
        <span>
          <span>Learn</span>ify
        </span>
      </h2>
      <div className="left-item">
        <div className="seach">
          <input type="text" placeholder="Search..." />
          <img src="./image//search-svgrepo.png" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
