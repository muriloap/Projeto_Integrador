"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmDev() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home"); // redireciona para a home
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={overlayStyle}>
      <div style={textStyle}>🚧 Em Desenvolvimento 🚧</div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const textStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "20px 40px",
  borderRadius: "12px",
  boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
};
