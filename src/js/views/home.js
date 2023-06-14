import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => (
	<div className="container text-center mt-5">
		<div className="mb-5">
			<h2>Still without agenda? Create one!</h2>
			<Link to="/newAgenda"><button className="btn btn-warning">New Agenda</button></Link>
		</div>
		<div >
			<h1 className="mb-3">My agendas:</h1>

			<div className="box">
				<h1>Añade un contacto: <Link to="/register"><button className="btn btn-warning">Register</button></Link></h1>
				<h1>Explora las agendas: <Link to="/agendas"><button className="btn btn-success">Explore the Agendas</button></Link></h1>
				<h1>Delete an agenda: <Link to="/delete"><button className="btn btn-success">Delete</button></Link></h1>
			</div>
		</div>
	</div>
);
