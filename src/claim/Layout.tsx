import { Link } from 'react-router';

const Layout = () => {
  return (
    <div>
      <h1>This is the Claim page</h1>
      <h2>Claims for Umang</h2>
      <Link to='/claim-umang/login'>Umang Login</Link>
      <Link to='/claim-umang/otp'>Umang Otp</Link>
      <h2>Claims from EPFO</h2>
      <Link to='/claim-epfo/login'>Epfo Login</Link>
      <Link to='/claim-epfo/otp'>Epfo Otp</Link>
    </div>
  );
};

export default Layout;
