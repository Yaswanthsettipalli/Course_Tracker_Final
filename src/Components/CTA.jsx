import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta">
      <h2>
        Ready to Start Learning?
      </h2>

      <Link to="/login">
        <button>
          Create Free Account
        </button>
      </Link>
    </section>
  );
}

export default CTA;