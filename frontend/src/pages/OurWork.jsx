import { useState } from "react";

function Img({ src, alt }) {
  const [err, setErr] = useState(false);
  const fallback = `https://placehold.co/300x220/e8d5b7/333?text=${encodeURIComponent(alt)}`;
  return (
    <img src={err ? fallback : src} alt={alt} onError={() => setErr(true)}
      style={{ width: "100%", height: "220px", objectFit: "cover" }} />
  );
}

const GALLERY = [
  { src: "/assets/img/Group.jpg",                         desc: "Visit to Orphanage" },
  { src: "/assets/img/cloth_distribution.jpg",    desc: "Donating Clothes" },
  { src: "/assets/img/food_donation.jpg",         desc: "Flood Relief" },
  { src: "/assets/img/World_image.webp",          desc: "Donating Essentials" },
  { src: "/assets/img/SchoolChilds.jpeg",          desc: "Healthcare" },
  { src: "/assets/img/cloth__distribution.webp",        desc: "Food Donations" },
  { src: "/assets/img/group2.jpg",                desc: "Polio Vaccination" },
  { src: "/assets/img/indian_children.jpeg",          desc: "School Bags" },
  { src: "/assets/img/free checkup.jpg",         desc: "Free Checkups in Schools" },
  { src: "/assets/img/group photo.webp",         desc: "Happy Children" },
  { src: "/assets/img/cloth distribution.webp",  desc: "Cloth Distribution" },
  { src: "/assets/img/vaccine.jpg",              desc: "Vaccination" },
];

export default function OurWork() {
  return (
    <div style={{ background: "linear-gradient(to bottom,#e6e6e6,#fde7a4)", minHeight: "100vh", padding: "40px 20px" }}>
      <div className="container">
        <h2 className="text-center fw-bold mb-2" style={{ fontSize: "2rem" }}>
          Our Work <span style={{ color: "#ff5722" }}>Gallery</span>
        </h2>
        <p className="text-center text-muted mb-4">A glimpse of the difference we're making together</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {GALLERY.map((item) => (
            <div key={item.desc}
              style={{ width:"300px", borderRadius:"10px", overflow:"hidden", background:"#fff",
                boxShadow:"0 3px 12px rgba(0,0,0,0.12)", transition:"transform 0.25s,box-shadow 0.25s", cursor:"pointer" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 3px 12px rgba(0,0,0,0.12)"; }}
            >
              <a href={item.src} target="_blank" rel="noreferrer">
                <Img src={item.src} alt={item.desc} />
              </a>
              <div style={{ background:"rgba(223,223,223,0.85)", padding:"10px", textAlign:"center",
                fontWeight:"500", fontSize:"16px", fontFamily:"Trebuchet MS,sans-serif" }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
