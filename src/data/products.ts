export interface Product {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  description: string;
  capacity: string;
  speed: string;
  headRange: string;
  discharge: string;
  pipeSize: string;
  suctionLift: string;
  color3d: string; // Color code for Three.js render
  shape3d: 'monobloc' | 'centrifugal' | 'submersible' | 'jet'; // Type of 3D geometry to render
  features: string[];
  applications: string[];
  similarPumps: string[]; // List of related product IDs
  brochureUrl: string;
}

export const productsData: Product[] = [
  {
    id: "self-priming-pump",
    name: "Mini Monobloc Self Priming Pump",
    category: "Domestic Pumps",
    shortDesc: "High efficiency domestic self-priming pump ideal for residential water supply.",
    description: "OX Pumps Mini Monobloc Self Priming Pumps are designed with high precision for domestic application. Features a robust design, high suction lift capability, and long-lasting durability.",
    capacity: "0.5 HP to 1.0 HP",
    speed: "2880 RPM",
    headRange: "6 to 36 Meters",
    discharge: "10 to 50 LPM",
    pipeSize: "25 x 25 mm",
    suctionLift: "8 Meters",
    color3d: "#0066cc",
    shape3d: "monobloc",
    features: [
      "High grade copper winding for low temperature rise",
      "Forged brass impeller for long life",
      "Double shielded ball bearings (pre-lubricated)",
      "Thermal Overload Protector (TOP) to protect motor",
      "Robust cast iron motor body"
    ],
    applications: [
      "Domestic water supply",
      "Overhead tanks",
      "Gardening & lawn sprinklers",
      "Car washing",
      "Residential apartments"
    ],
    similarPumps: ["regenerative-monobloc-pump", "centrifugal-monobloc-pump"],
    brochureUrl: "#"
  },
  {
    id: "regenerative-monobloc-pump",
    name: "Regenerative Self Priming Stage Monobloc Pump",
    category: "Domestic & Commercial",
    shortDesc: "Regenerative impeller pump with stable pressure and self-priming capability.",
    description: "Designed for high head operations, this regenerative self-priming stage pump offers stable discharge and high operational efficiency. Perfect for domestic water supply and pressure boosting.",
    capacity: "1.0 HP to 1.5 HP",
    speed: "2880 RPM",
    headRange: "10 to 45 Meters",
    discharge: "8 to 40 LPM",
    pipeSize: "25 x 25 mm",
    suctionLift: "8 Meters",
    color3d: "#0088aa",
    shape3d: "monobloc",
    features: [
      "Forged brass impeller with radial vanes",
      "High quality carbon steel shaft",
      "Thermal overload protection",
      "Low power consumption",
      "Low maintenance design"
    ],
    applications: [
      "High rise residential buildings",
      "Water transfer to overhead tanks",
      "Commercial offices",
      "Curing at construction sites"
    ],
    similarPumps: ["self-priming-pump", "jet-pump"],
    brochureUrl: "#"
  },
  {
    id: "centrifugal-monobloc-pump",
    name: "Single Phase Centrifugal Monobloc Pump",
    category: "Agricultural & Domestic",
    shortDesc: "Single-phase power pump for high volume water transfer.",
    description: "Designed for high volume water transfer, the Single Phase Centrifugal Monobloc Pump is highly reliable and handles large flow rates with a robust cast iron structure.",
    capacity: "1.0 HP to 2.0 HP",
    speed: "2880 RPM",
    headRange: "6 to 26 Meters",
    discharge: "50 to 250 LPM",
    pipeSize: "50 x 50 mm / 65 x 50 mm",
    suctionLift: "7 Meters",
    color3d: "#0044bb",
    shape3d: "centrifugal",
    features: [
      "Dynamically balanced rotating parts",
      "High discharge capacity",
      "Heavy duty cast iron volute casing",
      "Corrosion-resistant shaft sleeve",
      "High grade copper winding"
    ],
    applications: [
      "Agriculture and irrigation",
      "Industrial water transfer",
      "Domestic water supply",
      "Hotels and hospitals"
    ],
    similarPumps: ["three-phase-centrifugal-pump", "slow-speed-centrifugal-pump"],
    brochureUrl: "#"
  },
  {
    id: "three-phase-centrifugal-pump",
    name: "Three Phase Centrifugal Monobloc Pump",
    category: "Industrial & Agricultural",
    shortDesc: "Heavy duty industrial monobloc pump with three-phase power.",
    description: "OX Pumps Three Phase Centrifugal Monobloc Pumps are engineered for continuous duty operations in industrial water distribution, processing plants, and heavy agriculture irrigation.",
    capacity: "2.0 HP to 10.0 HP",
    speed: "2880 RPM",
    headRange: "12 to 55 Meters",
    discharge: "100 to 1200 LPM",
    pipeSize: "80 x 80 mm / 100 x 100 mm",
    suctionLift: "7 Meters",
    color3d: "#003399",
    shape3d: "centrifugal",
    features: [
      "Industrial grade motor with high efficiency",
      "Bronze or high tensile cast iron impeller",
      "Heavy duty shaft with quality steel keys",
      "Designed for continuous running S1 duty",
      "Robust structure with vibration-damping feet"
    ],
    applications: [
      "Industrial water distribution",
      "Cooling towers & heat exchangers",
      "Large scale agriculture irrigation",
      "Fire fighting systems",
      "Drip and sprinkler irrigation"
    ],
    similarPumps: ["centrifugal-monobloc-pump", "slow-speed-centrifugal-pump"],
    brochureUrl: "#"
  },
  {
    id: "slow-speed-centrifugal-pump",
    name: "Slow Speed Centrifugal Monobloc Pump",
    category: "Agricultural & Industrial",
    shortDesc: "Slow speed 1440 RPM pump for longer lifespan and continuous heavy use.",
    description: "Operating at a lower speed of 1440 RPM, this pump experiences lower wear and tear, ensuring an extremely long lifespan for continuous, heavy duty applications in farming and chemical processing plants.",
    capacity: "2.0 HP to 7.5 HP",
    speed: "1440 RPM",
    headRange: "6 to 30 Meters",
    discharge: "150 to 1600 LPM",
    pipeSize: "75 x 75 mm / 100 x 100 mm",
    suctionLift: "6 Meters",
    color3d: "#1e5b8a",
    shape3d: "centrifugal",
    features: [
      "Slow speed motor (1440 RPM) for minimal wear",
      "Extra thick casing walls for heavy industrial use",
      "Large impeller design for superior volume displacement",
      "Dual mechanical seal or gland packing option",
      "Double ball bearings on solid shaft"
    ],
    applications: [
      "Irrigation canals & river water extraction",
      "Chemical and process industries",
      "Civil construction dewatering",
      "Farms and dairies"
    ],
    similarPumps: ["three-phase-centrifugal-pump", "horizontal-openwell-pump"],
    brochureUrl: "#"
  },
  {
    id: "horizontal-openwell-pump",
    name: "Horizontal Openwell Submersible Pump",
    category: "Submersible Pumps",
    shortDesc: "Submerged openwell pump designed for open wells or sumps with fluctuating water levels.",
    description: "This pump sits at the bottom of the well, completely submerged in water, eliminating suction lift problems. The horizontal footprint is ideal for wide wells and residential sumps.",
    capacity: "1.0 HP to 3.0 HP",
    speed: "2880 RPM",
    headRange: "10 to 45 Meters",
    discharge: "30 to 450 LPM",
    pipeSize: "50 x 40 mm / 50 x 50 mm",
    suctionLift: "Fully Submerged",
    color3d: "#00a28f",
    shape3d: "submersible",
    features: [
      "Water lubricated motor for eco-friendly operation",
      "Stainless steel body casing for zero rusting",
      "No suction lift / priming issues (submerged)",
      "High grade copper winding with polymer insulated wire",
      "Designed for wide voltage operation"
    ],
    applications: [
      "Open wells and farm sumps",
      "Apartments & high rise buildings water supply",
      "Fountains & water parks",
      "Drip & sprinkler irrigation systems"
    ],
    similarPumps: ["vertical-openwell-pump", "4inch-borewell-pump"],
    brochureUrl: "#"
  },
  {
    id: "vertical-openwell-pump",
    name: "Vertical Openwell Submersible Pump",
    category: "Submersible Pumps",
    shortDesc: "Vertical submerged pump, perfect for narrow, deep open wells.",
    description: "OX Pumps Vertical Openwell Submersible Pumps are designed for deep, narrow open wells. Submerged operation protects it from dry-run overhead heating and keeps the operation quiet.",
    capacity: "1.5 HP to 5.0 HP",
    speed: "2880 RPM",
    headRange: "15 to 65 Meters",
    discharge: "40 to 600 LPM",
    pipeSize: "65 x 50 mm / 80 x 65 mm",
    suctionLift: "Fully Submerged",
    color3d: "#00b2aa",
    shape3d: "submersible",
    features: [
      "Vertical design takes minimal footprint at the bottom of the well",
      "Premium stainless steel construction",
      "Dynamically balanced thrust bearing system",
      "Sand guard protection for dirty well water",
      "High electrical efficiency"
    ],
    applications: [
      "Deep open wells",
      "Agricultural water pumping",
      "Municipal water supply distribution",
      "Industrial sumps and storage tanks"
    ],
    similarPumps: ["horizontal-openwell-pump", "6inch-borewell-pump"],
    brochureUrl: "#"
  },
  {
    id: "4inch-borewell-pump",
    name: "4 Inch Borewell Submersible Pump",
    category: "Borewell Pumps",
    shortDesc: "Slim 4-inch diameter pump designed for deep borewells.",
    description: "Engineered to fit inside a 4-inch (100mm) casing borewell, this multistage submersible pump operates at great depths to deliver fresh groundwater with remarkable pressure.",
    capacity: "0.5 HP to 5.0 HP",
    speed: "2880 RPM",
    headRange: "20 to 180 Meters",
    discharge: "15 to 150 LPM",
    pipeSize: "32 mm / 40 mm / 50 mm",
    suctionLift: "Fully Submerged",
    color3d: "#116666",
    shape3d: "submersible",
    features: [
      "Multistage radial/mixed flow impellers",
      "Stainless steel AISI 304 outer shell and shaft",
      "NEMA standard coupling for easy motor attachment",
      "Built-in non-return valve (NRV) to prevent water backflow",
      "Sand resistant design for extended life"
    ],
    applications: [
      "Deep borewells (4\" or larger)",
      "Domestic drinking water systems",
      "Agricultural sprinklers and drip systems",
      "Industrial water supply"
    ],
    similarPumps: ["6inch-borewell-pump", "vertical-openwell-pump"],
    brochureUrl: "#"
  },
  {
    id: "6inch-borewell-pump",
    name: "6 Inch Borewell Submersible Pump",
    category: "Borewell Pumps",
    shortDesc: "High power 6-inch diameter pump for agricultural and industrial borewells.",
    description: "Designed for 6-inch (150mm) or larger borewells, this high-discharge pump is ideal for large scale agricultural farms, industrial factories, and district water schemes.",
    capacity: "3.0 HP to 20.0 HP",
    speed: "2880 RPM",
    headRange: "30 to 320 Meters",
    discharge: "50 to 800 LPM",
    pipeSize: "50 mm / 65 mm / 80 mm",
    suctionLift: "Fully Submerged",
    color3d: "#0e5252",
    shape3d: "submersible",
    features: [
      "High power copper-wound water lubricated motor",
      "Premium stainless steel impellers and diffusers",
      "Dynamically balanced rotor and shaft assembly",
      "Thrust bearings made of graphite for heavy axial loads",
      "Special anti-friction coatings"
    ],
    applications: [
      "Deep borewells (6\" or larger)",
      "Large irrigation schemes",
      "Industrial water transfer & processing",
      "Community water supply schemes",
      "Mining and construction dewatering"
    ],
    similarPumps: ["4inch-borewell-pump", "vertical-openwell-pump"],
    brochureUrl: "#"
  },
  {
    id: "jet-pump",
    name: "Single & Multistage Jet Pump",
    category: "Domestic & Deep Suction",
    shortDesc: "High suction lift jet pump for deep water tables from the surface.",
    description: "For locations where the water level is deep but installing a submersible pump is not feasible, OX Pumps Jet Pumps utilize an external jet ejector package to pull water from depths up to 25 meters.",
    capacity: "0.5 HP to 1.5 HP",
    speed: "2880 RPM",
    headRange: "15 to 48 Meters",
    discharge: "10 to 60 LPM",
    pipeSize: "32 x 25 x 25 mm",
    suctionLift: "Up to 25 Meters (with Jet Ejector)",
    color3d: "#8b263e",
    shape3d: "jet",
    features: [
      "High suction capability with jet ejector unit",
      "Dynamically balanced brass impeller",
      "High-grade silicon steel laminations",
      "Quiet operational sound levels",
      "Robust double-chamber build"
    ],
    applications: [
      "Deep well suction from surface",
      "Hillside residential water pumping",
      "Gardening & light agriculture",
      "Domestic water supply booster systems"
    ],
    similarPumps: ["self-priming-pump", "regenerative-monobloc-pump"],
    brochureUrl: "#"
  }
];
