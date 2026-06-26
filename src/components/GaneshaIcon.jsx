import ganeshaImg from "../assets/ganesha.png";

export default function GaneshaIcon() {
  return (
    <img
      src={ganeshaImg}
      alt="Ganesha"
      className="hero-icon animate-float"
      width={90}
      height={90}
      draggable={false}
    />
  );
}
