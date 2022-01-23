import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoplayComponent, MoveComponent, Splide as SplideJs } from "@splidejs/splide";
import { FunctionComponent, useState } from "react";

interface SpinnerProps {
    autoPlay: boolean;
    speed: number;
    stopNumber?: number;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ autoPlay, speed, stopNumber }) => {
    const [splideInstance, setSplideInstance] = useState<SplideJs>();
    const [autoplayComponent, setAutoplay] = useState<AutoplayComponent>();
    const [move, setMove] = useState<MoveComponent>();

    const handleOnMove = (index: number) => {
        if (index === stopNumber && autoplayComponent) autoplayComponent.pause();
    };

    if (autoPlay && splideInstance && autoplayComponent) autoplayComponent.play();
    if (!autoPlay && splideInstance && autoplayComponent) {
        autoplayComponent.pause();
        move?.jump(0);
    }

    return (
        <Splide
            options={{
                type: "loop",
                arrows: false,
                autoplay: autoPlay,
                resetProgress: true,
                rewind: true,
                interval: speed,
                speed: speed,
                direction: "ttb",
                heightRatio: 1.45,
                pauseOnHover: false,
                pauseOnFocus: false,
                gap: 0,
                easing: "linear",
                pagination: false,
            }}
            onMounted={(s) => {
                setSplideInstance(s);
                const { Autoplay, Move } = s.Components;
                setAutoplay(Autoplay);
                setMove(Move);
            }}
            onMoved={(_splide, index, _prev, _dest) => handleOnMove(index)}
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
