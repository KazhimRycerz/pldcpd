import React, { useEffect, useState } from 'react';



const REVIEWS = [
   {
       id: 6,
       name: 'Alice',
       role: 'Data Scientist',
       avatar: 'https://i.pravatar.cc/150?img=23',
       review: `Absolutely mind-blowing! From graphics to gameplay, it's a virtual masterpiece. I lost track of time in the immersive experience.`,
   },
   {
       id: 0,
       name: 'Bob',
       role: 'Architect',
       avatar: 'https://i.pravatar.cc/150?img=13',
       review: `A hidden gem for tech enthusiasts. The selection is vast, and the ease of discovering new tech is addictively delightful!`,
   },
   {
       id: 2,
       name: 'Charlie',
       role: 'DevOps Engineer',
       avatar: 'https://i.pravatar.cc/150?img=8',
       review: `Results speak louder than words. I've never seen progress like this. The workflows are challenging but oh-so-rewarding. Kudos!`,
   },
   {
       id: 3,
       name: 'Diana',
       role: 'Product Manager',
       avatar: 'https://i.pravatar.cc/150?img=41',
       review: `It's very easy to customize and categorize lists for new projects/task categories.`,
   },
   {
       id: 13,
       name: 'Ethan',
       role: 'Software Engineer',
       avatar: 'https://i.pravatar.cc/150?img=57',
       review: `An adventure for the curious mind. Every click led to a new discovery. It's like a digital journey through the wonders of the internet.`,
   },
   {
       id: 4,
       name: 'Fiona',
       role: 'Marketing Specialist',
       avatar: 'https://i.pravatar.cc/150?img=42',
       review: `Plan, create, and explore seamlessly. This service made my creative dreams a reality. Smooth navigation, and the recommendations were spot on.`,
   },
   {
       id: 10,
       name: 'George',
       role: 'Software Developer',
       avatar: 'https://i.pravatar.cc/150?img=21',
       review: `A game-changer for organization. Tasks, calendars, notes – everything neatly synced. My life has never been this streamlined. Pure genius!`,
   },
   {
       id: 11,
       name: 'Hannah',
       role: 'Graphic Designer',
       avatar: 'https://i.pravatar.cc/150?img=18',
       review: `Drowning in a sea of creativity. The content here is a visual feast. An endless source of inspiration for my artistic endeavors.`,
   },
   {
       id: 5,
       name: 'Ian',
       role: 'CTO',
       avatar: 'https://i.pravatar.cc/150?img=33',
       review: `Discovering new beats is addictive with this service. The curated playlists are spot-on, and the personalized recommendations are eerily accurate. A music lover's paradise!`,
   },
];

const Testimonials = () => {
    const [currentCard, setCurrentCard] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        renderReviews();
    }, []);

    const renderReviews = () => {
        return REVIEWS.map((r, idx) => {
            const isFirstCard = idx === 0;
            const opacityClass = isFirstCard ? '' : 'opacity-0';
            const scaleClass = isFirstCard ? '' : 'scale-0';
            const translateYClass = isFirstCard ? '' : 'translate-y-[150px]';

            return (
                <div key={r.id} className={`card ${opacityClass}`}>
                    <blockquote className={`bg-black text-white rounded-md p-6 text-sm transition-all duration-500 ${scaleClass} relative isolate before:absolute before:bg-black before:w-4 before:h-4 before:rotate-45 before:-bottom-2 before:left-2/4 before:-translate-x-2/4 before:-z-10 before:-translate-y-full before:transition before:duration-500 before:delay-500`}>
                        "{r.review}"
                    </blockquote>
                    <div className={`details text-sm transition-all duration-500 flex flex-col items-center gap-2 mt-6 ${translateYClass}`}>
                        <img className="w-16 h-16 object-cover rounded-full" src={r.avatar} alt="" />
                        <div>
                            <p className="text-sm font-bold">{r.name}</p>
                            <p className="text-xs">{r.role}</p>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const handleSlide = (direction) => {
        const totalSlides = REVIEWS.length;
        const newIndex = direction === 'prev' ? (totalSlides + currentIndex - 1) % totalSlides : (totalSlides + currentIndex + 1) % totalSlides;

        const slides = document.querySelectorAll(".card");
        const prevCard = currentCard;

        if (prevCard) {
            prevCard.querySelector("blockquote").classList.add("scale-0", "before:-translate-y-full");
            prevCard.querySelector(".details").classList.add("scale-0", "translate-y-[150px]");

            setTimeout(() => {
                setCurrentIndex(newIndex);
                const newCard = slides[newIndex];
                setCurrentCard(newCard);
                newCard.classList.remove("opacity-0");
                newCard.querySelector("blockquote").classList.remove("scale-0", "before:-translate-y-full");
                newCard.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]");
            }, 500);
        }
    };

    return (
        <main className="bg-white my-4 w-full max-w-2xl rounded-3xl text-center p-8 sm:p-16">
            <h1 className="text-xl font-bold">A word from our customers</h1>
            <p className="text-sm">We've been helping businesses do their best since 2018</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-[60px_auto_60px] [grid-template-areas:'slider_slider'_'nav-left_nav-right'] sm:[grid-template-areas:'nav-left_slider_nav-right'] gap-2 sm:gap-6">
                <button data-slide="prev" className="material-symbols-outlined" onClick={() => handleSlide('prev')}>navigate_before</button>
                <div id="slider" className="[grid-area:slider]">
                    <div id="list-cards" className="grid [grid-template-areas:'stack'] overflow-hidden">
                        {renderReviews()}
                    </div>
                </div>
                <button data-slide="next" className="material-symbols-outlined" onClick={() => handleSlide('next')}>navigate_next</button>
            </div>
        </main>
    );
};

export default Testimonials;
