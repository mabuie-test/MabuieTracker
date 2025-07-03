import { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    api.get('/vehicles').then(res => setVehicles(res.data));
  }, []);
  return (
    <ul>
      {vehicles.map(v => (
        <li key={v._id}>
          {v.plateNumber} — <Link to={`/map/${v._id}`}>Ver Mapa</Link>
        </li>
      ))}
    </ul>
  );
}
