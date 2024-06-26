import { useNavigate, useLocation } from 'react-router-dom';

//Dropdown for the booking system
export const DropDownComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event) => {
        navigate(event.target.value);
    };

    return (
        <div className='bg-amber-300 p-6 rounded-md'>
            <div>
                <label htmlFor="booking-filter">Filter Bookings: </label>
                <select id="booking-filter" onChange={handleChange} value={location.pathname}>
                    <option value="/Admin">All Bookings</option>
                    <option value="/HandledBooking">Accepted Bookings</option>
                    <option value="/UnHandledBooking">Unhandled Bookings</option>
                    <option value="/Newsletter">Newsletter</option>
                </select>
            </div>
        </div>
    );
};





