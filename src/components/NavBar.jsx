import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { setUser } from "../store/user";
import { setProducts } from "../store/products";
import "../Styles/NavBar.css";

const Navbar = () => {
  //le avisamos al store que hay un nuevo usuario logueado
  const dispatch = useDispatch();

  //ahora traemos el usuario logueado con el hook useSelector
  const user = useSelector((state) => state.user);
  //lo que hace la funcion es traer el estado del store y lo guarda en user

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res) => res.data)
      .then((user) => {
        console.log(user);
        dispatch(setUser(user));
      })
      .catch(() =>
        console.error("Necesitas loguearte para obtener tu usuario.")
      );
  }, []);

  /*   useEffect(() => {
    //la idea es que cada vez que cambie el usuario, se traigan los productos
    //tambien SIEMPRE QUE CARGUE LA NAVBAR, los setea(products) en el store
    axios
      .get("api que posee los productos")
      .then((res) => res.data)
      .then((products) => {
        console.log(products);
        dispatch(setProducts(products));
      })
      .catch(() =>
        console.error("Necesitas loguearte para obtener tu usuario.")
      );
  }, []);
 */
  return (
    <div className="navbar">
      <nav>
        <div className="logoContainer">
          <Link to="/home">
            <label className="logo">DIVINO</label>
          </Link>
        </div>
        <div className="ulContainer">
          <ul>
            <li>CATEGORIAS</li>
            <li>PRODUCTOS</li>
            <li>
              {user.name ? (
                <>
                  <p>{user.name}</p>
                  <Link to="/logout">
                    <button>Logout</button>
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link to="/register">
                    <button>REGISTER</button>
                  </Link>
                  <Link to="/login">
                    <button>LOGIN</button>
                  </Link>
                </>
              )}{" "}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
