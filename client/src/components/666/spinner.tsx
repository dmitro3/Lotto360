import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoplayComponent, MoveComponent, Splide as SplideJs } from "@splidejs/splide";
import { FunctionComponent, useState } from "react";
import devil from "../../contents/images/devil.png";

interface SpinnerProps {
    autoPlay: boolean;
    speed: number;
    stopNumber?: number;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ autoPlay, speed, stopNumber }) => {
    const [splideInstance, setSplideInstance] = useState<SplideJs>();
    const [autoplayComponent, setAutoplay] = useState<AutoplayComponent>();
    const [move, setMove] = useState<MoveComponent>();
    const [currentIndex, setCurrentIndex] = useState(0);

    if (currentIndex === stopNumber && stopNumber !== undefined && !!autoplayComponent) {
        autoplayComponent.pause();
    } else if (autoPlay && !!splideInstance && !!autoplayComponent && !stopNumber) {
        autoplayComponent.play();
    } else if (!autoPlay && !!splideInstance && !!autoplayComponent) {
        autoplayComponent.pause();
        move?.jump(0);
    }

    return (
        <Splide
            options={{
                arrows: false,
                autoplay: autoPlay,
                gap: 0,
                direction: "ttb",
                drag: false,
                easing: "linear",
                focus: "center",
                height: 110,
                interval: 0,
                keyboard: false,
                pagination: false,
                pauseOnFocus: false,
                pauseOnHover: false,
                resetProgress: true,
                rewind: true,
                slideFocus: true,
                speed: 105,
                trimSpace: true,
                type: "slide",
                wheel: false,
            }}
            onMounted={(s) => {
                setSplideInstance(s);
                const { Autoplay, Move } = s.Components;
                setAutoplay(Autoplay);
                setMove(Move);
            }}
            onMoved={(_splide, index, _prev, _dest) => setCurrentIndex(index)}
        >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => renderSplideSlide(n))}
        </Splide>
    );
};

export default Spinner;

const renderSplideSlide = (num: number) => (
    <SplideSlide key={num}>
        <div className="fw-bold display-4 text-center h-100 w-100 d-flex justify-content-center align-items-center">
            {num !== 6 ? (
                <span>{num}</span>
            ) : (
                <img className="spinner-devil-pic" src={devil} alt="devil" />
            )}
        </div>
    </SplideSlide>
);
