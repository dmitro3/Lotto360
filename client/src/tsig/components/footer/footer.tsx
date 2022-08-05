import moment from "moment";
import { FunctionComponent } from "react";

interface FooterProps {
    length: number;
}

const Footer: FunctionComponent<FooterProps> = ({ length }) => {
    return (
        <footer className={length === 0 ? "bg_gray " : ""}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <h3>Marketplace</h3>
                        <div className="links">
                            <ul>
                                <li>
                                    <a href="#0">Home</a>
                                </li>
                                <li>
                                    <a href="#0">Explore</a>
                                </li>
                                <li>
                                    <a href="#0">Login</a>
                                </li>
                                <li>
                                    <a href="#0">Register</a>
                                </li>
                                <li>
                                    <a href="#0">Contacts</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <h3>Useful Links</h3>
                        <div className="links">
                            <ul>
                                <li>
                                    <a href="#0">Help Center</a>
                                </li>
                                <li>
                                    <a href="#0">Connect Wallet</a>
                                </li>
                                <li>
                                    <a href="#0">Faq</a>
                                </li>
                                <li>
                                    <a href="#0">Pricing</a>
                                </li>
                                <li>
                                    <a href="#0">Become an Author</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <h3>Resources</h3>
                        <div className="links">
                            <ul>
                                <li>
                                    <a href="#0">Blog</a>
                                </li>
                                <li>
                                    <a href="#0">Community</a>
                                </li>
                                <li>
                                    <a href="#0">Best Price</a>
                                </li>
                                <li>
                                    <a href="#0">Latest Submissions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <h3>Keep in touch</h3>
                        <div id="newsletter">
                            <div id="message-newsletter"></div>
                            <form
                                method="post"
                                name="newsletter_form"
                                id="newsletter_form"
                            >
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email_newsletter"
                                        id="email_newsletter"
                                        className="form-control"
                                        placeholder="Your email"
                                    />
                                    <button type="submit" id="submit-newsletter">
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="follow_us">
                            <ul>
                                <li>
                                    <a href="#0">
                                        <img
                                            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                                            data-src="img/twitter_icon.svg"
                                            alt=""
                                            className="lazy"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#0">
                                        <img
                                            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                                            data-src="img/facebook_icon.svg"
                                            alt=""
                                            className="lazy"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#0">
                                        <img
                                            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                                            data-src="img/instagram_icon.svg"
                                            alt=""
                                            className="lazy"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#0">
                                        <img
                                            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                                            data-src="img/youtube_icon.svg"
                                            alt=""
                                            className="lazy"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row add_bottom_25">
                    <div className="col-md-6">
                        <ul className="footer-selector clearfix">
                            <li>
                                <div className="styled-select lang-selector">
                                    <select defaultValue="English">
                                        <option value="English">English</option>
                                        <option value="French">French</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="Russian">Russian</option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="additional_links">
                            <li>
                                <a href="#0">Terms and conditions</a>
                            </li>
                            <li>© {moment().year()} PinkSignal</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
