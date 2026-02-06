import { Button, Card } from "antd";

const themes = [
  { key: "default", label: "Admin Panel", img: require("../../../assets/school.jpg"), size:"(1460px X 1080px)" },
  { key: "yellow", label: "User Panel", img: require("../../../assets/schoolmanagementsystem.webp"), size:"(1460px X 1080px)" }
];

const LogoBackgroundTab = () => {


  return (
    <div style={{ paddingTop: 10, paddingBottom: 20 }}>
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {themes.map((theme) => (
          <Card
            key={theme.key}
            title={theme.label}
            hoverable
            style={{
              width: "calc(25% - 12px)", // ✅ 4 per row
              height:"18.5rem",
              cursor:"default"
            }}
          >
            <img
              src={theme.img}
              alt={theme.label}
              style={{
                width: "100%",
                display: "block",
                padding:0
              }}
            />
            <div style={{fontSize:"1rem", fontWeight:600, textAlign:'center', marginTop:5}}>{theme.size}</div>
            <Button
              style={{
                width: "50%",
                backgroundColor: "gray",
                color:"white",
                padding: "8px 0",
                fontWeight: 500,
                textAlign: "center",
                marginTop:40,
                position:'absolute',
                border:"none",
                marginLeft:'4rem'
              }}
            >
              Update
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LogoBackgroundTab;
