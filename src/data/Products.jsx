// src/data/products.js

export const products = [
  {
    id: 1,
    brand: "TCL",
    name: "TCL FreshIN 3.0",
    code: "TAC-11CSD/P7",
    capacities: ["1.0HP", "1.5HP", "2.0HP"],
    features: ["FreshIN Technology", "T-AI Energy-saving", "Smart Voice Control"],
    image: "/images/freshin3.0.jpg",
    type: "Split Wall-mounted"
  },
  {
    id: 2,
    brand: "TCL",
    name: "TCL VoxIN Air Conditioner",
    code: "TAC-10CSD/WEI",
    capacities: ["1.0HP", "1.5HP", "2.0HP"],
    features: ["T-AI Energy-saving", "Gentle Breeze", "Smart WiFi Control"],
    image: "/images/voxin.jpg",
    type: "Split Wall-mounted"
  },
  {
    id: 3,
    brand: "TCL BreezeIN Series",
    name: "TCL BreezeIN Series",
    code: "TAC-10CSD/KEI2",
    capacities: ["1.0HP", "1.5HP", "2.0HP"],
    features: ["Gentle Breeze", "Hotel Mode", "Self-cleaning"],
    image: "/images/breezein.jpg",
    type: "Window Type"
  },
  {
    id: 4,
    brand: "TCL Portable Cool",
    name: "TCL Portable Cool",
    code: "TAC-12CPA/KEI",
    capacities: ["1.0HP", "1.5HP"],
    features: ["Portable Design", "Smart Timer", "Remote Control"],
    image: "/images/portable.jpg",
    type: "Portable Aircon"
  },
  {
    id: 5,
    brand: "TCL Light Commercial",
    name: "TCL Light Commercial",
    code: "TAC-18LCSD/P7",
    capacities: ["2.0HP", "2.5HP"],
    features: ["High Power", "Energy Efficient", "Durable"],
    image: "/images/lightcommercial.jpg",
    type: "Light Commercial"
  },
  {
    id: 6,
    brand: "AUX",
    name: "AUX Wall Split",
    code: "AUX-10SW",
    capacities: ["1.0HP", "1.5HP"],
    features: ["Energy Saving", "Quiet Operation"],
    image: "/images/aux-wall.jpg",
    type: "Split Wall-mounted"
  },
  {
    id: 7,
    brand: "AUX Portable",
    name: "AUX Portable",
    code: "AUX-12P",
    capacities: ["1.0HP", "1.5HP"],
    features: ["Compact", "Easy to Install"],
    image: "/images/aux-portable.jpg",
    type: "Portable Aircon"
  },
  {
    id: 8,
    brand: "AUX Floor Standing",
    name: "AUX Floor Standing",
    code: "AUX-20FS",
    capacities: ["2.0HP", "2.5HP"],
    features: ["Powerful Cooling", "Elegant Design"],
    image: "/images/aux-floor.jpg",
    type: "Floor Standing"
  },
  {
    id: 9,
    brand: "AUX Window Type",
    name: "AUX Window Type",
    code: "AUX-10WT",
    capacities: ["1.0HP"],
    features: ["Basic Cooling", "Reliable Motor"],
    image: "/images/aux-window.jpg",
    type: "Window Type"
  },
  {
    id: 10,
    brand: "AUX Light Commercial",
    name: "AUX Light Commercial",
    code: "AUX-25LC",
    capacities: ["2.5HP"],
    features: ["Heavy Duty", "Large Rooms"],
    image: "/images/aux-commercial.jpg",
    type: "Light Commercial"
  }
];

export const getPrice = (product, selectedSize) => {
  let price = 0;

  if (product.brand.includes('AUX')) {
    switch (selectedSize) {
      case '1.0HP': price = 22499; break;
      case '1.5HP': price = 24999; break;
      case '2.0HP': price = 31999; break;
      case '2.5HP': price = 40499; break;
      case '3.0HP': price = 45999; break;
      default: price = 0;
    }
  } else if (product.brand.includes('TCL')) {
    switch (selectedSize) {
      case '1.0HP': price = 21499; break;
      case '1.5HP': price = 22499; break;
      case '2.0HP': price = 28499; break;
      case '2.5HP': price = 32500; break;
      default: price = 0;
    }
  }

  return price;
};
