import { useState, useRef, useLayoutEffect } from 'react';

export function PersonCard({ person }) {
    const [showDescription, setShowDescription] = useState(false);
    const [descStyle, setDescStyle] = useState({});
    const timerRef = useRef(null);
    const cardRef = useRef(null);

    useLayoutEffect(() => {
        if (showDescription && cardRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            // console.log('descRect:', cardRect, 'window.innerWidth:', window.innerWidth);
            let style = {};
            // Check right overflow
            let translateValue = 250 - cardRect.width/2 - (window.innerWidth - cardRect.right);
            if ((window.innerWidth - 8 - cardRect.right < 200) && translateValue > 0) {
                style.translate = `calc(-50% - ${translateValue}px) 0`;
                // console.log('Right overflow detected', style.translate);
            }
            setDescStyle(style);
        }
    }, [showDescription]);

    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => {
            setShowDescription(true);
        }, 500);
    };

    const handleMouseLeave = () => {
        clearTimeout(timerRef.current);
        setShowDescription(false);
        setTimeout(() => {
            setDescStyle({});
        }, 200);
    };

    return (
        <div
            className="card personCard"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
        >
            <div
                className={`personCardDescription${showDescription ? ' show' : ''}`}
                style={descStyle}
            >
                {/* <h3>{person.name}</h3> */}
                <img src={person.cardUrl} alt={person.name} />
                <p>{person.desc}</p>
            </div>
            <img src={person.cardUrl} alt={person.name} />
        </div>
    );
}