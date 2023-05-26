import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => (
	<div className="container text-center mt-5">
		<div className="mb-5">
			<h2>Still without agenda? Create it!</h2>
			<Link to="/newAgenda"><button className="btn btn-warning">New Agenda</button></Link>
		</div>
		<div >
			<h1 className="mb-3">My agendas:</h1>

			<div className="box">
				<h1>Añade un contacto: <Link to="/register"><button className="btn btn-warning">Register</button></Link></h1>
				<h1>HOLA</h1>
				<h1>HOLA</h1>
			</div>
		</div>
	</div>
);
