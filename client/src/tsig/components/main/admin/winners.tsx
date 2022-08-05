import { FunctionComponent, useState } from "react";
import { WinnerModel } from "../../../reducer/reducer";

interface WinnersProps {
    winners: WinnerModel[];
}

const Winners: FunctionComponent<WinnersProps> = ({ winners }) => {
    const [search, setSearch] = useState("");

    let data = [...winners];
    if (search) {
        data = data.filter((s) => s.wallet.toLowerCase().includes(search.toLowerCase()));
    }
    data.reverse();
    return (
        <>
            <hr />

            <span>
                <em></em>
            </span>
            <h2 className="mb-5">Winners</h2>

            <div>
                <div className="col-md-6 col-lg-5">
                    <div className="form-group mb-2">
                        <input
                            className="form-control bg-white text-dark"
                            type="text"
                            placeholder="search"
                            value={search}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                        />
                    </div>
                </div>
                <div className="rounded overflow-hidden border border-2 border-color-1">
                    <table className="table table-borderless table-dark table-striped mb-0 table-responsive-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">prize</th>
                                <th scope="col">date</th>
                                <th scope="col">wallet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((r, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{r.id}</th>
                                        <td>{r.prize}</td>
                                        <td>{r.date}</td>
                                        <td>{r.wallet}</td>
                                    </tr>
                                );
                            })}
                            {data.length === 0 ? (
                                <tr>
                                    <th>0</th>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0x</td>
                                </tr>
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Winners;
