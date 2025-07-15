import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import ListingsPage from "@/components/pages/ListingsPage";
import PropertyDetailPage from "@/components/pages/PropertyDetailPage";
import FavoritesPage from "@/components/pages/FavoritesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListingsPage />} />
          <Route path="property/:id" element={<PropertyDetailPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;