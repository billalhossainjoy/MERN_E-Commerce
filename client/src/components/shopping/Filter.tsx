import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { filterOptions } from "./constants";

interface Props {
  filterProducts: FilterType;
  setFilterProducts: React.Dispatch<React.SetStateAction<FilterType>>;
}

const ProductsFilter: React.FC<Props> = ({
  filterProducts,
  setFilterProducts,
}) => {
  const handleFilter = (key: string, value: string) => {
    const filters = filterProducts[key as FilterOptionType];

    if (filters.includes(value)) {
      const index = filters.indexOf(value);
      filters.splice(index, 1);
    } else {
      filters.push(value);
    }

    setFilterProducts({
      ...filterProducts,
      [key]: [...filters],
    });

    sessionStorage.setItem("Filters", JSON.stringify(filterProducts));
  };

  return (
    <div className=" rounded-lg shadow-sm">
      <div className=" p-4 border-b">
        <h2 className="text-lg font-bold text-primary">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((key, index) => (
          <div key={key}>
            <h2 className="font-semibold text-primary mb-3">{key}</h2>
            <div className="flex flex-col gap-3">
              {filterOptions[key as FilterOptionType].map((option) => (
                <Label
                  key={option.id}
                  className="flex items-center gap-2 px-2 py-1"
                >
                  <Checkbox
                    checked={filterProducts[key as FilterOptionType].includes(
                      option.id
                    )}
                    className="rounded"
                    onCheckedChange={() => handleFilter(key, option.id)}
                  />
                  <span>{option.label}</span>
                </Label>
              ))}
            </div>
            {index != Object.keys(filterOptions).length - 1 && (
              <Separator className="mt-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductsFilter;
