import * as React from "react"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from "@material-ui/core/FormHelperText"
import PropTypes from 'prop-types';

export function CitySelector({disabled, onChange, cities, className, showHelperText}) {
    return (
        <div className={className}>
            <FormControl fullWidth>
                <InputLabel htmlFor="city-select">City</InputLabel>
                <Select 
                    native
                    disabled={disabled}
                    onChange={onChange}
                    inputProps={{
                        id: "city-select",
                        // data-testid makes it very convienient to find the input while testing
                        "data-testid": "city-selector-input"
                    }}
                >
                    <option aria-label="None" value={null} />
                    {cities.map(({display}, i) => (
                        <option key={i} value={i}>{display}</option>
                    ))}
                </Select>
                {showHelperText && (
                    <FormHelperText>
                        Select a city to make a travel plan.
                    </FormHelperText>
                )}
            </FormControl>
        </div>
    )
}

CitySelector.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    cities: PropTypes.arrayOf(PropTypes.shape({
        display: PropTypes.string.isRequired,
    })).isRequired,
    className: PropTypes.string,
    showHelperText: PropTypes.bool.isRequired
}
