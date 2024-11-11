import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import WishlistPage from "@/pages/wishlist.tsx";
import BrandsPage from "@/pages/brands.tsx";
import SynthsPage from "@/pages/synths.tsx";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SynthsPage />} path="/synths" />
      <Route element={<BrandsPage />} path="/brands" />
      <Route element={<WishlistPage />} path="/wishlist" />
    </Routes>
  );
}

export default App;
