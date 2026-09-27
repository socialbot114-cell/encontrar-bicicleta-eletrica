# Urban Mobility & Smart Data Roadmap (v1.1)

## Current Objective
Transition from a "Bike Network Viewer" to an "Urban Mobility Companion".

## 1. Technical Performance & Scaling
- [x] **React Query Integration**: Migrate data fetching to TanStack Query for caching and background sync.
- [x] **Marker Clustering**: Implement clustering for global view to handle 500+ networks smoothly.
- [x] **API Load Management**: Debounced fetching on map movement with a rounded map-center cache key.

## 2. Active Mobility (The "User" Focus)
- [x] **"Near Me" Geolocation**: Button to snap map to user position.
- [x] **Favorites & Personalization**: Ability to "star" stations or networks (stored in LocalStorage).
- [x] **Cycling Routing**: Preview bicycle routes to selected stations inside the app using the public OpenStreetMap routing service.
- [x] **Native Sharing**: Share a selected bike station and its latest reported availability using the system share sheet.
- [ ] **Real-time Availability Alerts**: Notify if a favorite station goes below 2 bikes.
- [x] **Nearby Network Discovery**: After the user opts into location, rank suggested networks by distance without requesting location at launch.

## 3. Smart City Features (New Data)
- [ ] **Public Transport Overlay**: Add nearby bus and train stations (Overpass API).
- [ ] **Real-time Traffic**: Integrate a traffic flow layer (OpenTraffic/HERE/TomTom).
- [ ] **Safety Map**: Highlight bike lanes and "Low Traffic" streets for safer routing.

## 4. Visualization & Design
- [x] **Smart Dashboard**: Modal with forecast charts (Weather trends, usage analytics).
- [x] **Custom Glow Markers**: High-fidelity SVG markers for different entity types (Bikes, EV, POI).
- [x] **Dynamic Theming**: Dark mode applies a dark visual filter to OpenStreetMap tiles while keeping the original attribution.

## 5. Gamification (Future)
- [ ] **Mobility Score**: Area ranking based on sustainability metrics.
- [ ] **CO2 Saved Tracker**: Estimated carbon savings by choosing bikes over cars.
