// Source of truth for offices — transcribed from diazreus.com/offices and the site footer (2026-11-18).
// `listedOn` notes where the official site shows each location. Coordinates are city centres for the map.
export const REGIONS = ['North America', 'Latin America', 'Europe', 'Middle East & Asia', 'Africa'];

export const OFFICES = [
  // North America
  { city: 'Miami', country: 'Florida, USA', region: 'North America', hq: true, email: 'miami@diazreus.com', phone: '+1 (305) 375-9220', address: 'Miami Tower at International Place, 100 S.E. Second Street, Suite 3400, Miami, Florida 33131', lat: 25.7743, lng: -80.1937 },
  { city: 'Washington, D.C.', country: 'USA', region: 'North America', email: 'washingtondc@diazreus.com', phone: '+1 (202) 684-2334', address: '1120 Connecticut Avenue, NW, Suite 500, Washington D.C. 20036', lat: 38.9072, lng: -77.0369 },
  { city: 'New York', country: 'New York, USA', region: 'North America', email: 'newyork@diazreus.com', phone: '+1 (212) 563-7000', address: '990 Stewart Ave, Suite 201, Garden City, New York 11530', lat: 40.7128, lng: -74.006 },
  { city: 'Los Angeles', country: 'California, USA', region: 'North America', email: 'losangeles@diazreus.com', phone: '+1 (877) 247-9277', address: '12100 Wilshire Blvd, Suite 1090, Los Angeles, CA 90025', lat: 34.0522, lng: -118.2437 },
  { city: 'Houston', country: 'Texas, USA', region: 'North America', phone: '+1 (877) 247-9277', address: '3663 N. Sam Houston Pkwy E, Suite 4100, Houston, TX 77032', lat: 29.7604, lng: -95.3698 },
  { city: 'Toronto', country: 'Canada', region: 'North America', phone: '+1 (877) 247-9277', address: '1984 Yonge Street, Toronto, Ontario, M4S 1Z7', lat: 43.6532, lng: -79.3832 },
  // Latin America
  { city: 'Belo Horizonte', country: 'Brazil', region: 'Latin America', email: 'saopaulo@diazreus.com', phone: '+1 (877) 247-9277', address: 'Ed. Renaissance, R. Paraíba 550, 10º andar, Savassi, CEP 30130-140', lat: -19.9167, lng: -43.9345 },
  { city: 'Bogotá', country: 'Colombia', region: 'Latin America', email: 'bogota@diazreus.com', phone: '+57 (601) 390-6506', address: 'Calle 90 No. 13a-31, Oficina 305, Bogotá D.C., Colombia', lat: 4.711, lng: -74.0721 },
  { city: 'Bonaire', country: 'Caribbean Netherlands', region: 'Latin America', email: 'aruba@diazreus.com', phone: '+1 (877) 247-9277', address: 'Kaya L.D. Gerharts, Les Galeries Shopping Mall L-15-16', lat: 12.15, lng: -68.27 },
  { city: 'Buenos Aires', country: 'Argentina', region: 'Latin America', email: 'buenosaires@diazreus.com', phone: '+1 (877) 247-9277', address: 'Moreau de Justo 740, Piso 3, Oficina #1, Ciudad de Buenos Aires (C1107AAP)', lat: -34.6037, lng: -58.3816 },
  { city: 'Caracas', country: 'Venezuela', region: 'Latin America', email: 'caracas@diazreus.com', phone: '+1 (877) 247-9277', address: 'Ctro. Altamira Piso 6, Oficina #1, Urb. Altamira', lat: 10.4806, lng: -66.9036 },
  { city: 'Willemstad', country: 'Curaçao', region: 'Latin America', email: 'aruba@diazreus.com', phone: '+1 (877) 247-9277', address: 'Passaatstraat 8b, Willemstad', lat: 12.1091, lng: -68.9316 },
  { city: 'Guatemala City', country: 'Guatemala', region: 'Latin America', email: 'guatemala@diazreus.com', phone: '+1 (877) 247-9277', address: 'Guatemala City, Guatemala', lat: 14.6349, lng: -90.5069 },
  { city: 'Lima', country: 'Peru', region: 'Latin America', email: 'lima@diazreus.com', phone: '+1 (877) 247-9277', address: 'Av. República de Panamá N.3418, Of. 502, San Isidro, Lima', lat: -12.0464, lng: -77.0428 },
  { city: 'Mexico City', country: 'Mexico', region: 'Latin America', email: 'mexicocity@diazreus.com', phone: '+1 (877) 247-9277', address: 'Bosque de Duraznos #65-110, Colonia Bosques de las Lomas, C.P. 11700', lat: 19.4326, lng: -99.1332 },
  { city: 'Monterrey', country: 'Mexico', region: 'Latin America', phone: '+1 (877) 247-9277', address: 'Centro Convex, Piso 5, Av. Morones Prieto 1500, Monterrey, N.L. 64710', lat: 25.6866, lng: -100.3161 },
  { city: 'Panama City', country: 'Panama', region: 'Latin America', email: 'panama@diazreus.com', phone: '+1 (877) 247-9277', address: 'Calle Manuel María Icasa, Urb. Obarrio, Edificio Proconsa 1, Piso P.H.', lat: 8.9824, lng: -79.5199 },
  { city: 'Santiago', country: 'Chile', region: 'Latin America', email: 'santiago@diazreus.com', phone: '+1 (877) 247-9277', address: 'Santa Lucía 330, Piso 2, Santiago', lat: -33.4489, lng: -70.6693 },
  { city: 'Santo Domingo', country: 'Dominican Republic', region: 'Latin America', email: 'santodomingo@diazreus.com', phone: '+1 (877) 247-9277', address: 'Gustavo Mejía Ricart No. 106, Torre Piantini, Suite 802', lat: 18.4861, lng: -69.9312 },
  { city: 'São Paulo', country: 'Brazil', region: 'Latin America', email: 'saopaulo@diazreus.com', phone: '+1 (877) 247-9277', address: 'Ed. Berrini One, Av. Engenheiro Luis Carlos Berrini, 105, 15th floor, Itaim Bibi', lat: -23.5505, lng: -46.6333 },
  { city: 'Oranjestad', country: 'Aruba', region: 'Latin America', email: 'aruba@diazreus.com', phone: '+1 (877) 247-9277', address: 'Weststraat 13, Oranjestad', lat: 12.5092, lng: -70.0086 },
  { city: 'Paramaribo', country: 'Suriname', region: 'Latin America', email: 'info@diazreus.com', phone: '+1 (877) 247-9277', address: 'Dr. J.F. Nassylaan 25, Paramaribo', lat: 5.852, lng: -55.2038 },
  { city: 'Uberlândia', country: 'Brazil', region: 'Latin America', email: 'saopaulo@diazreus.com', phone: '+1 (877) 247-9277', address: 'Ed. Uberlândia 2000, Av. Cesário Alvim, 818, Conj. 707/708, CEP 38400-098', lat: -18.9186, lng: -48.2772 },
  // Europe
  { city: 'Athens', country: 'Greece', region: 'Europe', email: 'athens@diazreus.com', phone: '+1 (877) 247-9277', address: '3 Omirou Str., 15451 Neo Psychiko, Athens', lat: 37.9838, lng: 23.7275 },
  { city: 'Frankfurt', country: 'Germany', region: 'Europe', email: 'frankfurt@diazreus.com', phone: '+1 (877) 247-9277', address: 'Neue Mainzer Straße 75, 60311 Frankfurt a.M.', lat: 50.1109, lng: 8.6821 },
  { city: 'The Hague', country: 'The Netherlands', region: 'Europe', email: 'netherlands@diazreus.com', phone: '+1 (877) 247-9277', address: 'Alexanderveld 5, 2585 DB Den Haag', lat: 52.0705, lng: 4.3007 },
  { city: 'Madrid', country: 'Spain', region: 'Europe', email: 'madrid@diazreus.com', phone: '+1 (877) 247-9277', address: 'Avda. de Brasil, 17, 28020 Madrid', lat: 40.4168, lng: -3.7038 },
  { city: 'Moscow', country: 'Russia', region: 'Europe', email: 'moscow@diazreus.com', phone: '+1 (877) 247-9277', address: 'Myasnitskaya 24/7, Office 73, Moscow', lat: 55.7558, lng: 37.6173 },
  { city: 'Mykonos', country: 'Greece', region: 'Europe', phone: '+1 (877) 247-9277', address: 'Drafaki, Mykonos, 84600', lat: 37.4467, lng: 25.3289 },
  { city: 'Nicosia', country: 'Cyprus', region: 'Europe', phone: '+1 (877) 247-9277', address: 'Tefkrou 1, 1066 Nicosia', lat: 35.1856, lng: 33.3823 },
  { city: 'Prague', country: 'Czech Republic', region: 'Europe', email: 'prague@diazreus.com', phone: '+1 (877) 247-9277', address: 'Palace Chicago, Národní 58/32, 110 00 Prague 1', lat: 50.0755, lng: 14.4378 },
  // Middle East & Asia
  { city: 'Abu Dhabi', country: 'United Arab Emirates', region: 'Middle East & Asia', phone: '+1 (877) 247-9277', address: 'Bainounah Road, C6 ADIB Tower, Flat 906C', lat: 24.4539, lng: 54.3773 },
  { city: 'Aleppo', country: 'Syria', region: 'Middle East & Asia', phone: '+1 (877) 247-9277', address: 'Aleppo City, next to Sheikh Al Fath Street', lat: 36.2021, lng: 37.1343 },
  { city: 'Amman', country: 'Jordan', region: 'Middle East & Asia', phone: '+1 (877) 247-9277', address: 'Bir As-Sabee St., Amman', lat: 31.9454, lng: 35.9284 },
  { city: 'Baghdad', country: 'Iraq', region: 'Middle East & Asia', phone: '+1 (877) 247-9277', address: 'Al Karada, Arasat Entrance, Nazeniya Al Ameen Commercial Complex, 1st Floor', lat: 33.3152, lng: 44.3661 },
  { city: 'Beirut', country: 'Lebanon', region: 'Middle East & Asia', phone: '+1 (877) 247-9277', address: '130 Foch Street, Downtown', lat: 33.8938, lng: 35.5018 },
  { city: 'Dubai', country: 'United Arab Emirates', region: 'Middle East & Asia', phone: '+1 (877) 247-9277', address: 'Emirates Financial Tower, North Tower, Office No. 1001', lat: 25.2048, lng: 55.2708 },
  { city: 'Lahore', country: 'Pakistan', region: 'Middle East & Asia', phone: '+1 (877) 247-9277', address: '4/1 Golf Road, GOR 1, Lahore', lat: 31.5204, lng: 74.3587 },
  { city: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East & Asia', phone: '+1 (877) 247-9277', address: 'Tamkeen Tower, Floor 19, King Fahad Road with King Salman Road, P.O. Box 13325, Riyadh', lat: 24.7136, lng: 46.6753 },
  { city: 'Shanghai', country: 'China', region: 'Middle East & Asia', email: 'shanghai@diazreus.com', phone: '+86 (21) 6877-9903', address: '1155 Fang Dian Road, 4th Floor, Kerry Parkside, Shanghai 201204, P.R.C.', lat: 31.2304, lng: 121.4737 },
  // Africa (listed in the official site footer)
  { city: 'Johannesburg', country: 'South Africa', region: 'Africa', phone: '+1 (877) 247-9277', address: 'Johannesburg, South Africa', lat: -26.2041, lng: 28.0473 },
];
