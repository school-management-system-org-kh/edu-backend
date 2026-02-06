import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import 'antd/dist/reset.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
