import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUserInfoFromToken } from '../fetchUser';
import Icons from '../icons/icons'
import { Waveform } from '@uiball/loaders'

export default function SideBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
    }

    getUserInfo();
  }, []);

  return (
    <>
      <div className="menu">
        <ul className="side-bar-ul">
          { user ? (
          <li className="profile">
            <div className="img-box">
              <img
                src={
                  user.profilePic
                    ? user.profilePic
                    : "https://img.freepik.com/free-icon/man_318-677829.jpg"
                }
                alt="profile"
              />
            </div>
            <h2>{user.firstName}<br></br>{user.lastName}</h2>
          </li>
          ) : (
            <div className="flex justify-center items-center">
            <Waveform size={25} color="#fff" />
            </div>
          )}
          <li>
            <Link to="/dash">
              <i>
              <Icons.Home />
              </i>
              <p>Dashbord</p>
            </Link>
          </li>
          <li>
            <Link to="/dash/movies">
              <i>
              <Icons.Film />
              </i>
              <p>Movies</p>
            </Link>
          </li>
          <li>
            <Link to="/dash/cinemaroom">
              <i>
                <Icons.EventSeat />
              </i>
              <p>Rooms</p>
            </Link>
            </li>
          <li>
            <Link to="/dash/users">
              <i>
                <Icons.Users />
              </i>
              <p>Users</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i>
                <Icons.Ticket />
              </i>
              <p>Tickets</p>
            </Link>
          </li>
          <li>
            <Link to="/dash/feedback">
              <i>
                <Icons.Feedback />
              </i>
              <p>Feedbacks</p>
            </Link>
          </li>
          <li>
            <Link to="/dash/reviews">
              <i>
                <Icons.Feedback />
              </i>
              <p>Reviews</p>
            </Link>
          </li>
          <li className="log-out">
            <Link to="/">
              <i>
                <Icons.LogOut />
              </i>
              <p>Logout</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}