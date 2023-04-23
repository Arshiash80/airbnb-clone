"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

// Reassign the marker icons.
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src,
});

type MapProps = {
	center?: number[];
	label?: string;
};

const Map: React.FC<MapProps> = ({ center, label }) => {
	return (
		<MapContainer
			center={(center as L.LatLngExpression) || [51, -0.09]}
			zoom={center ? 4 : 2}
			scrollWheelZoom={false}
			className="h-[35vh] rounded-lg"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{center && (
				<Marker position={center as L.LatLngExpression}>
					{label && <Popup>{label}</Popup>}
				</Marker>
			)}
		</MapContainer>
	);
};

export default Map;
