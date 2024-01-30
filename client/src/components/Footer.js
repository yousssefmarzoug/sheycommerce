import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 d-flex flex-column align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contactez-nous</h5>
            <p>Email : contact@example.com</p>
            <p>Téléphone : +123 456 789</p>
          </div>
          <div className="col-md-4">
            <h5>Liens rapides</h5>
            <ul className="list-unstyled">
              <li><a href="/">Accueil</a></li>
              <li><a href="/produits">Produits</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Suivez-nous</h5>
            <p>Connectez-vous avec nous sur les réseaux sociaux :</p>
            <div className="d-flex">
              <a href="#" className="me-2"><i className="bi bi-facebook"></i></a>
              <a href="#" className="me-2"><i className="bi bi-twitter"></i></a>
              <a href="#" className="me-2"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p>&copy; 2024 Nom de votre entreprise. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
