import { AutoplayComponent, MoveComponent, Splide as SplideJs } from "@splidejs/splide";
import { FunctionComponent, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

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
                heightRatio: 1.45,
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
            <SplideSlide>
                <div className="fw-bold display-4 text-center py-4 px-4">0</div>
            </SplideSlide>
            <SplideSlide>
                <div className="fw-bold display-4 text-center py-4 px-4">1</div>
            </SplideSlide>
            <SplideSlide>
                <div className="fw-bold display-4 text-center py-4 px-4">2</div>
            </SplideSlide>
            <SplideSlide>
                <div className="fw-bold display-4 text-center py-4 px-4">3</div>
            </SplideSlide>
            <SplideSlide>
                <div className="fw-bold display-4 text-center py-4 px-4">4</div>
            </SplideSlide>
            <SplideSlide>
                <div className="fw-bold display-4 text-center py-4 px-4">5</div>
            </SplideSlide>
            <SplideSlide>
                <div className="fw-bold display-4 text-center py-4 px-4">6</div>
            </SplideSlide>
            <SplideSlide>
                <div className="fw-bold display-4 text-center py-4 px-4">7</div>
            </SplideSlide>
            <SplideSlide>
                <div className="fw-bold display-4 text-center py-4 px-4">8</div>
            </SplideSlide>
            <SplideSlide>
                <div className="fw-bold display-4 text-center py-4 px-4">9</div>
            </SplideSlide>
        </Splide>
    );
};

export default Spinner;
