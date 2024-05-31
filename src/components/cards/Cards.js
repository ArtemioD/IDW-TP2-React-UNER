import React from 'react'
import "./Cards.css"
import bicen1 from "../../img/bicen1.jpg"
import bicen2 from "../../img/bicen2.jpg"
import bicen3 from "../../img/bicen3.jpg"


function Cards() {


    
  return (
    <div>
        <div className="cards">
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="9000">
                    <div className="carousel-inner">
                        <div className="carousel-item active imgCard">
                            <img src={bicen1} className="d-block w-100 borderImg" alt="..."/>
                        </div>
                        <div className="carousel-item imgCard">
                            <img src={bicen2}  className="d-block w-100 borderImg" alt="..."/>
                        </div>
                        <div className="carousel-item imgCard">
                            <img src={bicen3}  class="d-block w-100 borderImg" alt="..."/>
                        </div>
                    </div>
                </div>
                <a href="" className="text-decoration-none text-dark">
                    <div className="textCard">
                        <h3 className="h3Card">Hotel Bicentenario Mendoza</h3>
                        <p className="p1Card">El Hotel Bicentenario Suites & Spa se encuentra en Mendoza y ofrece un spa, piscina y centro de fitness.</p>
                        <p className="p2Card">$114 USD x noche</p>
                    </div> 
                </a>
            </div>
    </div>
  )
}

export default Cards