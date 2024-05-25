import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import useBookingStore from "../../stores/bookingStore";
import { SubHeadingComponent } from "../Reusables/SubHeadingComponent";
import { ParagraphComponent } from "../Reusables/ParagraphComponent";
import { BtnComponent } from "../Reusables/BtnComonent";
import { SucessMessage } from "./sucessMessage";
import { Checkbox } from '../Reusables/Checkbox';
import { FormComponent } from './FormComponent';
import { SpinningLogo } from "../Reusables/SpinningLogo";

export const PostBookingComponent = () => {
    const [minDate, setMinDate] = useState(new Date());
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [isGroupBooking, setIsGroupBooking] = useState(false);
    const [groupID, setGroupID] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [errors, setErrors] = useState(Array.from({ length: numberOfPeople }, () => ({})));

    const [nameError, setNameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [phonenumberError, setPhonenumberError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [weightError, setWeightError] = useState("");
    const [heightError, setHeightError] = useState("");
    const [dateError, setDateError] = useState("");
    const [surfLevelError, setSurfLevelError] = useState("");
    const [groupIDError, setGroupIDError] = useState("");

    const bookingStore = useBookingStore();
    const { error, submitBookings, loading } = bookingStore;

    const [forms, setForms] = useState(Array.from({ length: numberOfPeople }, () => ({
        name: "",
        age: "",
        weight: "",
        height: "",
        film: false,
        droneVideos: false,
        photo: false,
        email: "",
        phonenumber: "",
        newPost: "",
        date: null,
        beginner: false,
        intermediate: false,
        advanced: false,
        errorMessage: "",
        createdAt: Date.now(),
        groupID: "",
        groupIDError: "",
    })));

    const generateUniqueGroupID = () => `group_${Date.now()}`;

    const handleChangeNumberOfPeople = (e) => {
        const number = parseInt(e.target.value, 10);
        setNumberOfPeople(number);

        setForms(Array.from({ length: number }, () => ({
            name: "",
            age: "",
            weight: "",
            height: "",
            film: false,
            droneVideos: false,
            photo: false,
            email: "",
            phonenumber: "",
            newPost: "",
            date: null,
            beginner: false,
            intermediate: false,
            advanced: false,
            createdAt: Date.now(),
            groupID: isGroupBooking ? generateUniqueGroupID() : "",
            groupIDError: "",
        })));

        setErrors(Array.from({ length: number }, () => ({})));
        setMinDate(new Date());
    };

    const handleGroupBookingCheckboxChange = () => {
        setIsGroupBooking(!isGroupBooking);
        setGroupID(isGroupBooking ? "" : generateUniqueGroupID());
        setGroupIDError("");
    };

    const validateForm = () => {
        let isValid = true;

        const newErrors = Array.from({ length: numberOfPeople }, () => ({
            name: "",
            age: "",
            phonenumber: "",
            email: "",
            weight: "",
            height: "",
            date: "",
            surfLevel: "",
            newPost: "",
            confirmation: "",
        }));

        forms.forEach((form, index) => {
            if (!form.name) {
                newErrors[index].name = "Name is required";
                isValid = false;
            }
            if (!form.age) {
                newErrors[index].age = "Age is required (must be between 4 and 100)";
                isValid = false;
            }
            if (!form.phonenumber) {
                newErrors[index].phonenumber = "Phone number is required";
                isValid = false;
            } else if (!isValidPhoneNumber(form.phonenumber)) {
                newErrors[index].phonenumber = "Invalid phone number format";
                isValid = false;
            }
            if (!form.email) {
                newErrors[index].email = "Email is required";
                isValid = false;
            } else if (!isValidEmail(form.email)) {
                newErrors[index].email = "Invalid email format";
                isValid = false;
            }
            if (!form.weight) {
                newErrors[index].weight = "Weight is required";
                isValid = false;
            } else if (form.weight < 0) {
                newErrors[index].weight = "Weight cannot be negative";
                isValid = false;
            }
            if (!form.height) {
                newErrors[index].height = "Height is required";
                isValid = false;
            } else if (form.height < 0) {
                newErrors[index].height = "Height cannot be negative";
                isValid = false;
            }
            if (!(form.beginner || form.intermediate || form.advanced)) {
                newErrors[index].surfLevel = "Surf level is required";
                isValid = false;
            }
            if (form.newPost.length > 140) {
                newErrors[index].newPost = "You message length must be 140 characters or less";
                isValid = false;
            }
            if (numberOfPeople > 1 && !isGroupBooking) {
                newErrors[index].confirmation = "Confirmation required";
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const isValidPhoneNumber = (phonenumber) => /^\d{9,}$/.test(phonenumber);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const responses = await submitBookings(forms, isGroupBooking, groupID);

        if (!responses || responses.length !== forms.length) {
            window.location.reload();
        } else {
            resetFormState();
            setShowSuccessMessage(true);
        }
    };

    const resetFormState = () => {
        setForms((prevForms) => prevForms.map(() => ({
            name: "",
            age: "",
            weight: "",
            height: "",
            film: false,
            droneVideos: false,
            photo: false,
            email: "",
            phonenumber: "",
            newPost: "",
            date: null,
            beginner: false,
            intermediate: false,
            advanced: false,
            createdAt: Date.now(),
            groupID: isGroupBooking ? generateUniqueGroupID() : "",
        })));
        clearErrorMessages();
    };

    const clearErrorMessages = () => {
        setNameError("");
        setAgeError("");
        setPhonenumberError("");
        setEmailError("");
        setWeightError("");
        setHeightError("");
        setSurfLevelError("");
        setGroupIDError("");
    };

    useEffect(() => {
        if (error) {
            alert(error); // Display the error message using alert or any other way
            window.location.reload();
        }
    }, [error]);

    return (
        <div>
            {isLoading ? (
                <Fade>
                    <div className="flex text-center flex-col items-center h-screen m-9">
                        <SpinningLogo />
                    </div>
                </Fade>
            ) : showSuccessMessage ? (
                <Fade>
                    <SucessMessage />
                </Fade>
            ) : (
                <div className="flex justify-center items-center h-auto m-4 text-s font-josefin-sans">
                    <div className="w-full max-w-md rounded-md border-4 border-customPink p-4 px-10 rounded">
                        <div className="mb-2">
                            <label htmlFor="numberOfPeople" className="mr-2">
                                Number of Surfers*
                            </label>
                            <select
                                id="numberOfPeople"
                                value={numberOfPeople}
                                onChange={handleChangeNumberOfPeople}
                                className="border rounded"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {forms.map((form, index) => (
                            <FormComponent
                                key={index}
                                form={form}
                                index={index}
                                setForms={setForms}
                                minDate={minDate}
                                errors={errors[index]} />
                        ))}

                        {numberOfPeople > 1 && (
                            <div className="mb-2">
                                <Checkbox
                                    label="I confirm that this is a booking request for multiple people"
                                    checked={isGroupBooking}
                                    onChange={handleGroupBookingCheckboxChange}
                                />
                                {groupIDError && <p className="text-red-600">{groupIDError}</p>}
                            </div>
                        )}

                        <div className="flex items-center justify-center pt-0 p-4">
                            <BtnComponent
                                type="submit"
                                label="Send request"
                                onClick={() => {
                                    if (validateForm()) {
                                        handleSubmit();
                                        window.scrollTo(0, 0);
                                    }

                                }}
                            />
                        </div>

                        <ParagraphComponent className="text-sm m-0 pl-0" text="* if more than 10 people inquire tuanissurfachool@gmail.com" />
                        <ParagraphComponent className="text-sm m-0 pl-0" text="* Please note that dates are subject to change based on weather conditions and availability." />
                    </div>
                </div>
            )}
        </div>
    );
}