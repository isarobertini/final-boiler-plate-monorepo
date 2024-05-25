import { create } from 'zustand';
import { formatDistanceToNow, isValid } from 'date-fns';
import { userStore } from './userStore';

const useBookingStore = create((set) => ({
    bookings: [],
    loading: false,
    error: null,
    isAuthenticated: userStore.isAuthenticated,

    setError: (error) => set({ error }),

    checkAuthentication: () => {
        set({ isAuthenticated: userStore.isAuthenticated });
    },

    submitBookings: async (forms, isGroupBooking, groupID) => {
        set({ loading: true, error: null });

        try {
            const responses = await Promise.all(
                forms.map(async (form) => {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/booking`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: form.name,
                            age: form.age,
                            weight: form.weight,
                            height: form.height,
                            film: form.film,
                            droneVideos: form.droneVideos,
                            photo: form.photo,
                            email: form.email,
                            phonenumber: form.phonenumber,
                            message: form.newPost,
                            beginner: form.beginner,
                            intermediate: form.intermediate,
                            advanced: form.advanced,
                            createdAt: Date.now(),
                            groupID: isGroupBooking ? groupID : null,
                        }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || `Network response was not ok. Status: ${response.status}`);
                    }

                    return await response.json();
                })
            );

            set({
                bookings: responses,
                loading: false,
            });

            return responses;
        } catch (error) {
            console.error("Error submitting forms:", error);
            set({ error: "Unable to send request now. Please try again later!", loading: false });
            return [];
        }
    },

    // Action to handle the click event when marking a booking as handled or unhandled
    bookingIsHandledClick: async (bookingId, currentHandledState) => {
        try {
            // If the booking is already handled, show an alert and do nothing
            if (currentHandledState) {
                alert("This booking is already marked as handled!");
                return;
            }

            // Show a confirmation dialog before marking as handled
            const userConfirmed = window.confirm(`Are you sure you want to mark this booking as handled?`);

            if (!userConfirmed) {
                // User clicked Cancel, do nothing
                return;
            }

            // Toggle the handled state
            const newHandledState = !currentHandledState;

            // Update the booking on the server
            await fetch(`${import.meta.env.VITE_API_URL}/booking/${bookingId}/handled`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                },
            });

            // Update the local state to toggle the handled state
            set((state) => ({
                bookings: state.bookings.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, bookingIsHandled: newHandledState }
                        : booking
                ),
            }));
        } catch (error) {
            // Handle errors during the bookingIsHandledClick process
            console.error('Error marking booking as handled:', error);
        }
    },
    // Action to delete one booking by id 
    handleDeleteBooking: async (id) => {
        try {
            // Show a confirmation dialog before deleting the booking
            const userConfirmed = window.confirm("Are you sure you want to delete this booking?");

            if (!userConfirmed) {
                // User clicked Cancel, do nothing
                return;
            }

            // Make an API request to delete the booking
            await fetch(`${import.meta.env.VITE_API_URL}/booking/deleteBooking/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                },
            });

            // Remove the deleted booking from the bookings array
            set((state) => ({
                bookings: state.bookings.filter((booking) => booking._id !== id),
            }));
        } catch (error) {
            // Handle errors during the handleDeleteBooking process
            console.error('Error deleting booking:', error);
        }
    },

    // Action to fetch all bookings from the server
    fetchBookings: async () => {
        try {
            set({ loading: true, error: null });

            // Make an API request to fetch all bookings
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });

            // Check if the request was successful
            if (response.ok) {
                // Parse the response data
                const data = await response.json();

                // Update the local state with the fetched bookings
                set({ bookings: data });
            } else {
                // Handle errors when the request fails
                console.error('Failed to fetch bookings');
                set({ error: 'Failed to fetch bookings', loading: false });
            }
        } catch (error) {
            // Handle errors during the fetchBookings process
            set({ error: error.message, loading: false });
            console.error('Error fetching bookings:', error);
            alert('Error fetching bookings:', error);
        }
    },

    // Action to fetch all bookings from the server
    fetchBookingByDate: async () => {
        try {
            set({ loading: true, error: null });

            // Make an API request to fetch all bookings
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/handledBookings/bookingsByDate`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });

            // Check if the request was successful
            if (response.ok) {
                // Parse the response data
                const bookings = await response.json();

                // Update the local state with the fetched bookings
                setBookingsByDate(bookings);

                // Extract unique dates from bookings
                const dates = Array.from(new Set(bookings.map((booking) => booking.date)));
                setUniqueDates(dates);
            } else {
                // Handle errors when the request fails
                console.error('Failed to fetch bookings');
                setError('Failed to fetch bookings');
            }
        } catch (error) {
            // Handle errors during the fetchBookings process
            setError(error.message);
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    },

    // Action to fetch handled bookings from the server
    fetchHandledBookings: async () => {
        try {
            set({ loading: true, error: null });

            // Make an API request to fetch handled bookings
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/handledBookings`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });

            // Check if the request was successful
            if (response.ok) {
                // Parse the response data
                const data = await response.json();

                // Update the local state with the fetched handled bookings
                set({ bookings: data });
            } else {
                // Handle errors when the request fails
                console.error('Failed to fetch handled bookings');
                set({ error: 'Failed to fetch handled bookings', loading: false });
            }
        } catch (error) {
            // Handle errors during the fetchHandledBookings process
            set({ error: error.message, loading: false });
            console.error('Error fetching handled bookings:', error);
        }
    },

    // Action to fetch unhandled bookings from the server
    fetchUnHandledBookings: async () => {
        try {
            set({ loading: true, error: null });

            // Make an API request to fetch unhandled bookings
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/unhandledBookings`, {
                headers: {
                    method: "GET",
                    Authorization: localStorage.getItem("accessToken"),
                },
            });

            // Check if the request was successful
            if (response.ok) {
                // Parse the response data
                const data = await response.json();

                // Update the local state with the fetched unhandled bookings
                set({ bookings: data });
            } else {
                // Handle errors when the request fails
                console.error('Failed to fetch unhandled bookings');
                set({ error: 'Failed to fetch unhandled bookings', loading: false });
            }
        } catch (error) {
            // Handle errors during the fetchUnHandledBookings process
            set({ error: error.message, loading: false });
            console.error('Error fetching unhandled bookings:', error);
        }
    },

    // Action to delete all bookings
    handleDeleteAllBookings: async () => {
        try {
            // Trigger the deleteAllBookings action from the store
            const response = await fetch(`${import.meta.env.VITE_API_URL}/booking/deleteAll`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                },
            });

            // Parse the response data
            const result = await response.json();

            // Log the result message
            console.log(result.message);
        } catch (error) {
            // Handle errors during the handleDeleteAllBookings process
            console.error('Error deleting all bookings:', error);
        }
    },


    // Format the time difference between the current time and a given timestamp
    formatTimeDifference: (timestamp) => {
        if (!timestamp || !isValid(new Date(timestamp))) {
            // Log an error for invalid timestamps
            console.error('Invalid timestamp:', timestamp);
            return "Invalid date";
        }

        // Get the current time and the booking time
        const currentTime = new Date();
        const bookingTime = new Date(timestamp);

        // Return the formatted time difference
        return formatDistanceToNow(bookingTime, { addSuffix: true });
    }
}));

export default useBookingStore;