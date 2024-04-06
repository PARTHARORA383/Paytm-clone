import { Link } from "react-router-dom";

export function BottomPlate({ buttonname, to, textcolor }) {
  return (
    <div className="duration-300 flex px-9 py-3 ">
      <Link to={to} className={`hover:${textcolor} hover:duration-75 `}>
        {buttonname}
      </Link>
    </div>
  );
}
