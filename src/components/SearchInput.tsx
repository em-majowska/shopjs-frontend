"use client";
import debounce from "debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchInput = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = debounce((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    replace(`${path}?${params.toString()}`);
  }, 500);
  return (
    <div className="field border-border flex items-center gap-2 border md:max-w-xs">
      <HiOutlineMagnifyingGlass className="text-muted-foreground size-4" />
      <input
        type="search"
        name="searchBar"
        id="searchBar"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Rechercher un produit..."
        className="field-pwd"
      />
    </div>
  );
};

export default SearchInput;
