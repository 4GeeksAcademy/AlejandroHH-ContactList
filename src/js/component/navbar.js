import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="container">
      <div className="row">

			<nav className="navbar nv navbar-light bg-light mb-3 justify-content-between">
				<div className="col-4 d-flex justify-content-center">
					<Link to="/">
						<span className="nv navbar-brand mb-0 h1 ms-5" style={{ color: 'white' }}>Home</span>
					</Link>
				</div>

				<div className="col-4 d-flex justify-content-center">
					<Link to="/newAgenda">
						<span className="nv navbar-brand mb-0 h1 ms-5" style={{ color: 'white' }}>Create agenda/contact</span>
					</Link>
				</div>

				<div className="col-4 d-flex justify-content-center">
					<Link to="/agendas">
						<span className="nv navbar-brand mb-0 h1 ms-5" style={{ color: 'white' }}>Explore the agendas</span>
					</Link>
				</div>

			</nav>

      </div>
    </div>
  );
};
