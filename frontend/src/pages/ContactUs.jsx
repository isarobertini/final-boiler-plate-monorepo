
import { Fade } from "react-awesome-reveal";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';

//import relevant components
import { NavigationMenu } from "../components/Common/NavigationMenu";
import { HeadingComponent } from "../components/Reusables/HeadingComponent";
import { FooterComponent } from '../components/Common/FooterComponent';
import { SubHeadingComponent } from '../components/Reusables/SubHeadingComponent';
import { PostNewsletter } from "../components/Newsletter/PostNewsletter";
import { PhotoComponent } from "../components/Reusables/PhotoComponent";

//import relevant media
import ContactUsPhoto from "../assets/contactUs/ContactUsPhoto.webp";
import phoneIcon from "../assets/icons/phoneIcon.webp";
import emailIcon from "../assets/icons/emailIcon.webp";
import instagramLogo from "../assets/icons/instagramLogo.webp";
import tripAdvisorLogo from "../assets/icons/tripAdvisorLogo.webp";
import facebookLogo from "../assets/icons/facebookLogo.webp";

export const ContactUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the About component mounts
    }, []);

    const backgroundImageStyle = {
        backgroundImage: `url(${ContactUsPhoto})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Default backgroundSize for larger screens
        backgroundSize: 'cover',
    };

    return (
        <div className="bg-backgroundPink">

            {/* Set meta description dynamically */}
            <Helmet>
                <meta name="description" content="Contact Tuanis Surf School with your questions. Get in touch via phone or email. Check out our reviews on TripAdvisor and follow us on Facebook and Instagram." />
            </Helmet>

            <NavigationMenu />

            <div className="h-screen" style={backgroundImageStyle}>

            </div>
            {/* Any content you want on top of the background image */}
            <HeadingComponent text="Contact Us" level={1} style={{}} />

            <div className="mx-6 my-6 md:mx-10 rounded-md bg-custumPink lg:grid lg:grid-cols-2">

                {/* Left column with contact info */}
                <Fade>
                    <div className="lg:pr-8 lg:text-center border-y-4 border-customPink my-6 lg:border-x-4 border-customPink lg:border-y-0 h-auto md:m-4 lg:m-8 pb-4 rounded-md">
                        <SubHeadingComponent className="lg:pt-12 md:text-5xl text-pink-500" text="Do you have questions?" />
                        <SubHeadingComponent className="lg:pt-1 pb-4 text-pink-500 md:text-5xl" text="Get in contact with us!" />

                        <div className="md:p-4 lg:py-2 text-lg font-josefin-sans max-w-4xl mx-auto">

                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-row items-center">
                                    <PhotoComponent className="h-6 w-8 pr-2" src={phoneIcon} alt="Phone icon" />
                                    <a href="tel:+50661407609">+50661407609</a>
                                </div>

                                <div className="pt-2 flex flex-row items-center">
                                    <PhotoComponent className="h-6 w-8 pr-2" src={emailIcon} alt="Phone icon" />
                                    <a href="mailto:tuanissurfschool@gmail.com"> tuanissurfschool@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div className="pt-2 flex flex-row items-center">
                                    <PhotoComponent className="h-9 w-16 md:h-7 md:w-8 pr-2" src={tripAdvisorLogo} alt="Tripadvicer icon" />
                                    <a href="https://www.tripadvisor.com/Attraction_Review-g309247-d19787493-Reviews-Tuanis_Surf_School_CR-Playa_Samara_Province_of_Guanacaste.html">Check us out on TRIP ADVISOR: Tuanis Surf School CR </a>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div className="pt-2 flex flex-row items-center">
                                    <PhotoComponent className="h-6 w-8 pr-2" src={facebookLogo} alt="Facebook icon" />
                                    <a href="https://www.facebook.com/tuanissurfschool/?paipv=0&eav=AfZcAqHp8xoNj6BXPrqGBrlM8DZiMLhXSdGfqcH8it8et64jyuXr0dA06xiFsvnXss0&_rdr">FACEBOOK &</a>
                                </div>
                                <div className="pt-2 flex flex-row items-center">
                                    <PhotoComponent className="h-6 w-8 pr-2" src={instagramLogo} alt="Instagram icon" />
                                    <a href="https://www.instagram.com/tuanissurfschool/">INSTAGRAM: Tuanis Surf School </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </Fade>

                {/* Right column with newsletter */}
                <div className="">
                    <PostNewsletter />
                </div>

            </div>
            <FooterComponent />
        </div >
    );
};