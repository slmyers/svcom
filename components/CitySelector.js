import * as React from "react"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export function CitySelector({disabled, onChange, cities, className}) {
    return (
        <div className={className || ""}>
            <FormControl fullWidth>
                <InputLabel htmlFor="city-select">City</InputLabel>
                <Select 
                    native
                    disabled={disabled}
                    onChange={onChange}
                    inputProps={{
                        id: "city-select"
                    }}
                >
                    <option aria-label="None" value={null} />
                    {cities.map(({display}, i) => (
                        <option key={i} value={i}>{display}</option>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
