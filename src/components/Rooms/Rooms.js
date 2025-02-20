import React, { useState, useEffect } from 'react';
import axios from "axios";
import Error from '../Error';
import Loader from '../Loader';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch rooms using useEffect
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/rooms/getallrooms");
        setRooms(data); // Assuming the API returns data in a `data` object
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchRooms(); // Call the async function once when the component mounts
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className='col-md-11'>
      <h1>Rooms</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <table className='table table-bordered table-dark'>
            <thead className='bs'>
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}> {/* Adding key prop to help React identify items uniquely */}
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Rooms;
