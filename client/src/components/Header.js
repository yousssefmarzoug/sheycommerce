import React from "react";

const Header = () => {
  return (
    <div>
      <header className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <p className="h3">Delivery</p>
            <p className="text-muted">LIVRAISON GRATUITE À PARTIR DE 600 MAD</p>
          </div>
          <div className="col-md-4">
            <p className="h3">Offre de bienvenue</p>
            <p className="text-success">20% OFF</p>
          </div>
          <div className="col-md-4">
            <p className="h3">Retours gratuits</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
