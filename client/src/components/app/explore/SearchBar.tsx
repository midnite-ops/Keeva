interface SearchBarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
    showCategory: boolean;
    showFilters: boolean;
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar = ({search, setSearch, onSearch}: SearchBarProps) => {
    return(
        <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    onSearch();
                }
            }}
        />
    )
} 