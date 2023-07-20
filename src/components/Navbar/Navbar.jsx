import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, logout }) {
  return (
    <nav className="px-3 navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        T- shop
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Product">
              Product
            </Link>
          </li>
          {user ? (
            <li className="nav-item">
              <Link className="nav-link" to="Cart">
                Cart
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
        <ul className="navbar-nav ms-auto">
          {user ? (
            <li className="nav-item">
              <p className="nav-link" onClick={logout}>
                Logout
              </p>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="Login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="Register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
