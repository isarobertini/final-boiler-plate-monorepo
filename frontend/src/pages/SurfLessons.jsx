//Import relevant library
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';

//Import relevant components
import { NavigationMenu } from "../components/Common/NavigationMenu";
import { HeadingComponent } from "../components/Reusables/HeadingComponent";
import { FooterComponent } from '../components/Common/FooterComponent';
import { SubHeadingComponent } from '../components/Reusables/SubHeadingComponent';
import { ParagraphComponent } from "../components/Reusables/ParagraphComponent";
import { BtnComponent } from "../components/Reusables/BtnComonent";
import { PhotoComponent } from "../components/Reusables/PhotoComponent";
import Slider from "../components/Reusables/slider"
//Import relevant media
import OurSurfLessonPhoto from "../assets/surfLessons/OurSurfLessonPhoto.webp";
import ssurfboardIcon from "../assets/icons/surfboardIcon.webp";
import LeashIcon from "../assets/icons/leashIcon.webp";
import rashGuardIcon from "../assets/icons/rashGuardIcon.webp";
import GiftIcon from "../assets/icons/giftIcon.webp";

export const SurfLessons = () => {

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the About component mounts
    }, []);

    const handleButtonClick = () => {
        // Navigate to the "BookNow" page
        navigate('/BookNow');
    };

    //set default bg-style
    const backgroundImageStyle = {
        backgroundImage: `url(${OurSurfLessonPhoto})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

    };

    return (

        <div className="bg-backgroundPink">

            {/* Set meta description dynamically */}
            <Helmet>
                <meta name="description" content="Experience personalized surf lessons at Playa Samara with Tuanis Surf School. Group and private lessons available. Book now!" />
            </Helmet>

            <NavigationMenu />

            <div className="h-screen" style={backgroundImageStyle}>
            </div>
            <HeadingComponent text="Our Surf Lessons" level={1} style={{}} />
            <div className="bg-backgroundPink mx-6 my-10 md:mx-10">

                <SubHeadingComponent className="text-pink-500 lg:text-5xl lg:px-32" text="Surf with us!" />

                <ParagraphComponent className="py-12 lg:my-14" text="Our surf-lessons are offered at Playa Samara, a beautiful white sand beach surrounded by jungle and mountains. The ocean here is shallow with sand covering the ocean floor. The waves are present enough to learn how to surf but unforgiving enough to enjoy a day playing around in them. Which makes it the perfect place to learn at, Playa Samara is truly home to the friendliest waves to surf on. Each lesson is personalised to fit your specific needs, age, physic and experience. Our instructors are fluent in Spanish, English and Swedish. All of our surf-instructors have different nationalities and we work with both female and male surfers. They all have years of experience and are professionally trained. Our awesome instructors love sharing their stoke for the sport with the local community and tourists. We offer surf coaching for both complete beginners as well as more advanced surfers with a maximum of three students per instructor." />


                <SubHeadingComponent className="text-pink-500 lg:px-32" text="Our group-lessons are 2 hours long." />

                <SubHeadingComponent className="text-pink-500 lg:px-32" text="Our private lessons are 1,5 hours long" />

                <ParagraphComponent className="py-12 lg:my-14" text="Each lesson starts with a 20-30 minute theory and warm-up on land. Here we will also talk ocean safety, conditions, technique, etiquette, and practice our movements on land before heading out into the water. We then spend the rest of our time in the water catching and riding waves and improving your skills." />

                <Slider />


                <div className="lg:p-12">
                    <SubHeadingComponent className="text-pink-500" text="All of our lessons include:" />

                    {/* Icons Included */}
                    <div className="mx-36 my-12 grid gap-1 items-center justify-center md:grid-cols-1 lg:grid-cols-3">
                        <div className="flex flex-col items-center justify-center md:mt-10">
                            <div className="border-2 border-customPink w-44 flex flex-col items-center justify-center rounded-t-lg">
                                <ParagraphComponent text="Surf-board" />
                            </div>
                            <div className="p-4 bg-customPink w-44 flex items-center justify-center rounded-b-lg">
                                <PhotoComponent className="h-20 w-20" src={ssurfboardIcon} alt="Surfboard icon" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center mt-10">
                            <div className="border-2 border-customPink w-44 flex flex-col items-center justify-center rounded-t-lg">
                                <ParagraphComponent text="Rash-guard" />
                            </div>
                            <div className="p-4 bg-customPink w-44 flex items-center justify-center rounded-b-lg">
                                <PhotoComponent className="h-20 w-20" src={rashGuardIcon} alt="Rash guard icon" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-10">
                            <div className="border-2 border-customPink w-44 flex flex-col items-center justify-center rounded-t-lg">
                                <ParagraphComponent text="Leash" />
                            </div>
                            <div className="p-4 bg-customPink w-44 flex items-center justify-center rounded-b-lg">
                                <PhotoComponent className="h-20 w-20" src={LeashIcon} alt="Leash icon" />
                            </div></div>
                    </div>
                </div>


                <ParagraphComponent className="py-12" text="We schedule our lessons based on the tides and conditions of the day to ensure that you have the best possible conditions for your personalized lesson. We also have different kinds of surfboards and will be able to offer you one that suits your level." />

                <SubHeadingComponent className="pb-12 text-pink-500" text="Activity description" />
                <ParagraphComponent text="We always start the surf-lesson with some theory on land. Here we will talk about surfing
on your level, safety, discuss your goals, practice the movements and have a warm-up
before heading out in the water to catch waves. Our focus during the lesson is to teach you
on a level that is suitable for you, so that you feel comfortable and have the best time." />


                <SubHeadingComponent className="pb-12 text-pink-500" text="Pricing for our lessons:" />

                {/* Icons Pricing */}
                <div className="md:mx-36 lg:my-12 grid gap-1 items-center justify-center md:grid-cols-1 lg:grid-cols-3">
                    <div className="flex flex-col items-center justify-center md:mt-10">
                        <div className="p-4 border-2 border-customPink w-60 flex flex-col items-center justify-center rounded-t-lg">
                            <SubHeadingComponent className="my-10" text="Book a package of one lesson:" />
                            <ParagraphComponent text="Group Lesson: $60 (a minimum of 2 people per group)." />
                            <ParagraphComponent text="Private Lesson: $80 for one person" />
                        </div>
                        <div className="p-4 bg-customPink w-60 flex items-center justify-center rounded-b-lg">
                            <PhotoComponent className="h-20 w-20" src={GiftIcon} alt="Gift icon" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center mt-10">
                        <div className="p-4 border-2 border-customPink w-60 flex flex-col items-center justify-center rounded-t-lg">
                            <SubHeadingComponent className="my-10" text="Book a package of 3 lessons:" />
                            <ParagraphComponent text="3 group-lessons: $55x3 = $165" />
                            <ParagraphComponent text="3 private-lessons: $75x3 = $225" />
                        </div>
                        <div className="p-4 bg-customPink w-60 flex items-center justify-center rounded-b-lg">
                            <PhotoComponent className="h-20 w-20" src={GiftIcon} alt="Gift icon" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <div className="p-4 border-2 border-customPink w-60 flex flex-col items-center justify-center rounded-t-lg">
                            <SubHeadingComponent className="my-10" text="Book a package of 6 lessons:" />
                            <ParagraphComponent text="6 group-lessons: $50x6 = $300" />
                            <ParagraphComponent text="6 private-lesson: $70x6 = $420" />
                        </div>
                        <div className="p-4 bg-customPink w-60 flex items-center justify-center rounded-b-lg">
                            <PhotoComponent className="h-20 w-20" src={GiftIcon} alt="Gift icon" />
                        </div>
                    </div>
                </div>
                <ParagraphComponent className="py-12" text="All of our packages needs to be paid in full up-front and the dates for the lessons need to
be scheduled at once." />

                <div className="flex items-center justify-center p-4 m-6">
                    <BtnComponent label="Book Now" onClick={handleButtonClick} />
                </div>

            </div>
            <FooterComponent />
        </div>


    )
}