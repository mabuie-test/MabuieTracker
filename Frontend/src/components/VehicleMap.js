import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import api from '../api/api';
import { useParams } from 'react-router-dom';

export default function VehicleMap() {
  const { id } = useParams();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // fetch histórico inicial
    api.get(`/vehicles/${id}/positions?range=day`)
      .then(res => setPositions(res.data));
    // TODO: ligar WebSocket para updates em tempo real
  }, [id]);

  return (
    <MapContainer center={[0,0]} zoom={13} style={{height:'80vh'}}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {positions.length > 0 && (
        <>
          <Marker position={[positions.at(-1).lat, positions.at(-1).lng]} />
          <Polyline positions={positions.map(p => [p.lat,p.lng])} />
        </>
      )}
    </MapContainer>
  );
}
