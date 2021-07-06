import './header.css';
import React from 'react';

function Header() {
  return (
    <header>
        <h1><a href="/" className="homeLink">PASTEBIN</a></h1>
        <a href="/list" className="allPastesLink">all pastes</a>
    </header>
  );
}

export default React.memo(Header);
