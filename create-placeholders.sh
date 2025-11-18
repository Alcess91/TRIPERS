#!/bin/bash

# Images Caraïbes
cat > public/destinations/caraibes-fort-de-france.jpg << 'SVG'
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#0ea5e9"/>
  <text x="800" y="450" font-family="Arial" font-size="48" fill="white" text-anchor="middle">Fort-de-France</text>
</svg>
SVG

cat > public/destinations/caraibes-autres-iles.jpg << 'SVG'
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#0284c7"/>
  <text x="800" y="450" font-family="Arial" font-size="48" fill="white" text-anchor="middle">Autres îles</text>
</svg>
SVG

# Images Cap-Vert
cat > public/destinations/cap-vert-sal.jpg << 'SVG'
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#f59e0b"/>
  <text x="800" y="450" font-family="Arial" font-size="48" fill="white" text-anchor="middle">Sal</text>
</svg>
SVG

cat > public/destinations/cap-vert-santo-antao.jpg << 'SVG'
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#d97706"/>
  <text x="800" y="450" font-family="Arial" font-size="48" fill="white" text-anchor="middle">Santo Antão</text>
</svg>
SVG

# Images Colombie
cat > public/destinations/colombie-cartagena.jpg << 'SVG'
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#ef4444"/>
  <text x="800" y="450" font-family="Arial" font-size="48" fill="white" text-anchor="middle">Cartagena</text>
</svg>
SVG

cat > public/destinations/colombie-medellin.jpg << 'SVG'
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#dc2626"/>
  <text x="800" y="450" font-family="Arial" font-size="48" fill="white" text-anchor="middle">Medellín</text>
</svg>
SVG

# Images Maroc
cat > public/destinations/maroc-marrakech.jpg << 'SVG'
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#d97706"/>
  <text x="800" y="450" font-family="Arial" font-size="48" fill="white" text-anchor="middle">Marrakech</text>
</svg>
SVG

cat > public/destinations/maroc-ouzoud.jpg << 'SVG'
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#b45309"/>
  <text x="800" y="450" font-family="Arial" font-size="48" fill="white" text-anchor="middle">Ouzoud</text>
</svg>
SVG

cat > public/destinations/maroc-zagora.jpg << 'SVG'
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#92400e"/>
  <text x="800" y="450" font-family="Arial" font-size="48" fill="white" text-anchor="middle">Zagora</text>
</svg>
SVG

echo "✅ Toutes les images placeholder ont été créées !"
