import { Link } from 'react-router';

const NoPage = () => {
  return (
    <div>
      <h1>404 Page not found</h1>
      <Link to='/'>Home</Link>
    </div>
  );
};

export default NoPage;
