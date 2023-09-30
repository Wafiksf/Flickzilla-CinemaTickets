import React, { useState, useEffect } from "react";
import axios from "axios";
import Icons from '../../components/icons/icons'
import "./dashboard.css"
import SideBar from "../../components/sidebar/sideBar"

export default function Dashboard() {
    const [moviesData, setMoviesData] = useState([]);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        const fetchMoviesData = async () => {
          try {
            const response = await axios.get("http://localhost:5000/movies/all");
            if (response.status === 200) {
              setMoviesData(response.data);
            }
          } catch (error) {
            console.error("Error fetching movies data:", error);
          }
        };
    
        fetchMoviesData();
      }, []);

      useEffect(() => {
        const fetchUsersData = async () => {
          try {
            const response = await axios.get(
                `http://localhost:5000/users`,
                {
                  headers: {
                    token: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
        
            if (response.status === 200) {
                setUsersData(response.data);
            }
          } catch (error) {
            console.error("Error fetching users data:", error);
          }
        };
    
        fetchUsersData();
      }, []);
  return (
    <>
    <div className='dash-body'>
    <div><SideBar/></div>

    <div className="content">
        <div className="title-info">
            <p>Dashbord</p>
            <i><Icons.ChartBar/></i>
        </div>

        <div className="data-info">
            <div className="box">
                <i><Icons.Users/></i>
                <div className="data">
                    <p>users</p>
                    <span>{usersData.length}</span>
                </div>
            </div>
            <div className="box">
                <i><Icons.Film/></i>
                <div className="data">
                    <p>Movies</p>
                    <span>{moviesData.length}</span>
                </div>
            </div>
            <div className="box">
                <i><Icons.TicketAlt/></i>
                <div className="data">
                    <p>Tickets</p>
                    <span>20</span>
                </div>
            </div>
            <div className="box">
                <i><Icons.DollarSign/></i>
                <div className="data">
                    <p>revenue</p>
                    <span>140$</span>
                </div>
            </div>
        </div>


    </div>
    </div>
    </>
  )
}
