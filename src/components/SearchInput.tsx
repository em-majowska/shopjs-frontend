"use client";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchInput = () => {
  return (
    <div className="field border-border flex items-center gap-2 border md:max-w-xs">
      <HiOutlineMagnifyingGlass className="text-muted-foreground size-4" />
      <input
        type="search"
        name="searchBar"
        id="searchBar"
        placeholder="Rechercher un produit..."
        className="field-pwd"
      />
    </div>
  );
};

export default SearchInput;
