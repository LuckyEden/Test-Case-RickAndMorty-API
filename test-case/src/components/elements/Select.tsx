import { TCTypes } from "../../types";


const Select: React.FC<TCTypes.SelectProps> = ({ options, value, onChange, Label, ...rest }) => {
    return (
        <div
            className="relative w-full flex gap-2 flex-col group"
        >
            {Label &&
                <label
                    htmlFor={rest.id}
                    className="text-white group-focus-within:text-secondary-main transition-all"
                >
                    {Label}
                </label>
            }
            <select
                id={rest.id}
                onChange={onChange}
                className=" w-full bg-paper text-white p-2 rounded-md shadow outline-none hover:bg-paper-dark transition-all cursor-pointer border-b hover:border-secondary-main"
                {...rest}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}

            </select>
        </div>
    );
}

export default Select;