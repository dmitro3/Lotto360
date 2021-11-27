import { FunctionComponent } from "react";
const { Chart } = require("react-google-charts");

interface FundsProps {}

const Funds: FunctionComponent<FundsProps> = () => {
    return (
        <>
            <h4 className="text-center mt-5 fw-bold mt-4">Prize funds</h4>
            <p className="text-center mx-auto text-dark max-width-rule">
                The prizes of each round comes from three sources.
            </p>

            <div className="row">
                <div className="col col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 my-2">
                    <div className="px-4 py-2 mt-3 rounded bg-white shadow h-100">
                        <div className="d-flex align-items-center mt-0">
                            <span className="fw-bold fs-5 me-3 mt-2">
                                Tickets purchases
                            </span>
                        </div>
                        <p className="max-width-rule text-dark mb-0">
                            All BNB paid to buy tickets for each round goes directly to
                            the prize pool.
                        </p>
                    </div>
                </div>

                <div className="col col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 my-2">
                    <div className="px-4 py-2 mt-3 rounded bg-white shadow h-100">
                        <div className="d-flex align-items-center mt-0">
                            <span className="fw-bold fs-5 me-3 mt-2">
                                Rollover prizes
                            </span>
                        </div>
                        <p className="max-width-rule text-dark mb-0">
                            After every round, if nobody wins in one of the prize pools,
                            all remaining BNB in that pool rolls over into the next round
                            and are redistributed among the prize pools.
                        </p>
                    </div>
                </div>

                <div className="col col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 my-2">
                    <div className="px-4 py-2 mt-3 rounded bg-white shadow h-100">
                        <div className="d-flex align-items-center mt-0">
                            <span className="fw-bold fs-5 me-3 mt-2">
                                Bonus BNB charge
                            </span>
                        </div>
                        <p className="max-width-rule text-dark mb-0">
                            We add bonus BNB in some rounds based on upcoming events.
                        </p>
                    </div>
                </div>
            </div>

            <div className="history-divide my-5 mb-4"></div>

            <div className="d-flex flex-wrap justify-content-center">
                <Chart
                    width={"500px"}
                    height={"300px"}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ["Pool", "Percentage"],
                        ["1 match (2%)", 2],
                        ["2 match (3%)", 3],
                        ["3 match (5%)", 5],
                        ["4 match (10%)", 10],
                        ["5 match (20%)", 20],
                        ["6 match (50%)", 50],
                        ["Treasury (10%)", 10],
                    ]}
                    options={{
                        title: "Prize distribution",
                        backgroundColor: "#f6f6f6",
                        is3D: true,
                    }}
                    rootProps={{ "data-testid": "2" }}
                />
            </div>

            <div className="alert alert-primary rounded px-4 shadow">
                <h4 className="alert-heading fw-bold">Treasury Box</h4>
                <p className="mb-0">
                    BNB in treasury box used for our team funds, social media giveaways,
                    and bonus prize injection to some rounds.
                </p>
            </div>

            <div className="alert alert-warning rounded px-4 mb-0 shadow">
                <h4 className="alert-heading fw-bold">Warning</h4>
                <p className="mb-0">
                    Lottery may cause addiction. Play on your responsibility. for more
                    info check{" "}
                    <a
                        href="https://fherehab.com/news/signs-of-a-gambling-addiction/"
                        target="_blank"
                        className="alert-link"
                        rel="noreferrer"
                    >
                        this link
                    </a>
                    .
                </p>
            </div>
        </>
    );
};

export default Funds;
