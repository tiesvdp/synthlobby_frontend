import { FunctionComponent } from "react";
import { v4 as uuidv4 } from "uuid";

import { useGetBrands } from "@/api/synths.ts";

const BrandList: FunctionComponent = () => {
  const { data } = useGetBrands("");
  const brands = data || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr my-5">
      {brands.map((brand) => (
        <div key={uuidv4()}>{brand}</div>
      ))}
    </div>
  );
};

export default BrandList;