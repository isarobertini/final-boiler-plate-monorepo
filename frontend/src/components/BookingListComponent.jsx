import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { BtnComponent } from "./BtnComonent";
import { ParagraphComponent } from "./ParagraphComponent";

export const BookingListComponent = ({ handleLike }) => {
    const [bookings, setBookings] = useState([]);

    const formatTimeDifference = (timestamp) => {
        const currentTime = new Date();
        const bookingTime = new Date(timestamp);
        return formatDistanceToNow(bookingTime, { addSuffix: true });
    };

    const fetchBookings = () => {
        fetch(`${import.meta.env.VITE_API_URL}/booking`)
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
            })
            .catch((error) => {
                console.error("Error fetching bookings:", error);
            });
    };
    //fetch(`${import.meta.env.VITE_API_URL}/booking`)
    useEffect(() => {
        fetchBookings();
    }, []);

    const handleLikeClick = async (bookingId) => {
        try {
            await fetch(
                `${import.meta.env.VITE_API_URL}/booking/${bookingId}/like`,
                {
                    method: "POST",
                }
            );
            //`${import.meta.env.VITE_API_URL}/booking/${bookingId}/like`,
            const updatedBookings = bookings.map((booking) => {
                if (booking._id === bookingId) {
                    return {
                        ...booking,
                        hearts: booking.hearts + 1,
                    };
                }
                return booking;
            });

            setBookings(updatedBookings);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                {/* Displaying bookings */}
                {bookings.map((booking, index) => (
                    <div key={index} className="flex justify-center items-center h-auto">
                        <div className="bg-customPink p-4">

                            {/* Booking details */}
                            <div>
                                <ParagraphComponent text={`${booking.name}, ${booking.age} years old`} category="Name" />

                                <ParagraphComponent text={`${booking.weight || "N/A"}`} category="Weight" />
                                <ParagraphComponent text={`${booking.height || "N/A"}`} category="Height" />

                                <ParagraphComponent text={`${booking.film ? "Yes" : "No"}`} category="Film" />
                                <ParagraphComponent text={`${booking.droneVideos ? "Yes" : "No"}`} category="Drone Videos" />
                                <ParagraphComponent text={`${booking.photo ? "Yes" : "No"}`} category="Photo" />

                                <ParagraphComponent text={`${booking.email}`} category="Email" />
                                <ParagraphComponent text={`${booking.phonenumber}`} category="Phone number" />

                                <ParagraphComponent text={`Other message: ${booking.message}`} />
                            </div>

                            {/* Like button */}
                            <div className="flex items-center justify-center p-4">
                                <BtnComponent className="heartButton" onClick={() => handleLikeClick(booking._id)} label="Read Booking" />
                                <BtnComponent className="heartButton" onClick={() => handleLikeClick(booking._id)} label="Delete Booking" />
                            </div>

                            {/* Booking information */}
                            <div className="infoText">
                                <p className="likeCount">x{booking.hearts}</p>
                                <p className="bookingTime">{formatTimeDifference(booking.createdAt)}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}      