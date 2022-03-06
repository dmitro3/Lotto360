import { FunctionComponent } from "react";

interface ColorsMusicProps {}

const ColorsMusic: FunctionComponent<ColorsMusicProps> = () => {
    return (
        <>
            <iframe
                width="100%"
                title="Number of the Beast"
                height="166"
                scrolling="no"
                frameBorder={"none"}
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/164194778&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            ></iframe>
            <div
                style={{
                    fontSize: 10,
                    color: "#cccccc",
                    lineHeight: "anywhere",
                    wordBreak: "normal",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontFamily:
                        "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                    fontWeight: 100,
                }}
            >
                <a
                    rel="noreferrer"
                    href="https://soundcloud.com/anthraxmaiden"
                    title="ImTrappedUnderIce"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                >
                    ImTrappedUnderIce
                </a>{" "}
                ·{" "}
                <a
                    rel="noreferrer"
                    href="https://soundcloud.com/anthraxmaiden/iron-maiden-the-number-of-the-beast-1"
                    title="Iron Maiden - The Number Of The Beast"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                >
                    Iron Maiden - The Number Of The Beast
                </a>
            </div>
        </>
    );
};

export default ColorsMusic;
