import { Link } from "react-router-dom";

export const goBack = () => {
  return (
    <div className="col-md-12">
      <Link className="btn btn-secondary btn-md rounded my-2" to="/admin/dashboard">
        Go To Dashboard
      </Link>
    </div>
  );
};
