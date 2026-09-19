# Urban Mobility & Smart Data Roadmap (v1.1)

## Current Objective
Transition from a "Bike Network Viewer" to an "Urban Mobility Companion".

## 1. Technical Performance & Scaling
- [x] **React Query Integration**: Migrate data fetching to TanStack Query for caching and background sync.
- [x] **Marker Clustering**: Implement clustering for global view to handle 500+ networks smoothly.
- [ ] **API Load Management**: Implement debounced fetching on map move to reduce API calls.

## 2. Active Mobility (The "User" Focus)
- [x] **"Near Me" Geolocation**: Button to snap map to user position.
- [x] **Favorites & Personalization**: Ability to "star" stations or networks (stored in LocalStorage).
- [x] **Cycling Routing**: Integrate OSRM (Open Source Routing Machine) to show routes to selected stations.
- [ ] **Real-time Availability Alerts**: Notify if a favorite station goes below 2 bikes.
- [ ] **Near Me Geolocation**: Auto-select the nearest network on app start.

## 3. Smart City Features (New Data)
- [ ] **Public Transport Overlay**: Add nearby bus and train stations (Overpass API).
- [ ] **Real-time Traffic**: Integrate a traffic flow layer (OpenTraffic/HERE/TomTom).
- [ ] **Safety Map**: Highlight bike lanes and "Low Traffic" streets for safer routing.

## 4. Visualization & Design
- [x] **Smart Dashboard**: Modal with forecast charts (Weather trends, usage analytics).
- [x] **Custom Glow Markers**: High-fidelity SVG markers for different entity types (Bikes, EV, POI).
- [ ] **Dynamic Theming**: Enhanced dark mode with custom map tiles.

## 5. Gamification (Future)
- [ ] **Mobility Score**: Area ranking based on sustainability metrics.
- [ ] **CO2 Saved Tracker**: Estimated carbon savings by choosing bikes over cars.
