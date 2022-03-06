import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoplayComponent, MoveComponent, Splide as SplideJs } from "@splidejs/splide";
import { FunctionComponent, useState } from "react";

interface SpinnerColorsProps {
    autoPlay: boolean;
    stopNumber?: number;
}

export const colorsList = ["🍏", "🍐", "🍊", "🍉", "🍇", "🍓", "🍌", "🍒", "🍑", "🍆"];

const SpinnerColors: FunctionComponent<SpinnerColorsProps> = ({ autoPlay, stopNumber }) => {
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
            {colorsList.map((n, i) => renderSplideSlide(n, i))}
        </Splide>
    );
};

export default SpinnerColors;

const renderSplideSlide = (colors: string, i: number) => (
    <SplideSlide key={i}>
        <div className="fw-bold display-4 text-center h-100 w-100 d-flex justify-content-center align-items-center">
            {colors}
        </div>
    </SplideSlide>
);

export const getColors = (num: number) => colorsList[num];
