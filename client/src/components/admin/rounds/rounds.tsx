import { FunctionComponent, useReducer } from "react";
import SortColumn from "../../models/sort.column";
import ListHeader from "../shared/listHeader";
import SearchBox from "../shared/searchBox";
import Pagination from "../shared/table/pagination";
import TableLoader from "../shared/table/tableLoader";
import roundListReducer, {
    RoundListAction,
    roundListInitialState,
} from "./reducer/round.list.reducer";
import RoundsTable from "./rounds.table";

interface RoundsProps {}

const Rounds: FunctionComponent<RoundsProps> = () => {
    const [state, dispatch] = useReducer(roundListReducer, roundListInitialState);

    const {
        searchQuery,
        sortColumn,
        isLoading,
        rounds,
        totalCount,
        pageSize,
        currentPage,
    } = state;

    return (
        <>
            <ListHeader
                formRoute="/admin/rounds/add"
                title="Round"
                buttonTitle="Add Round"
            />
            <div className="mt-5 d-flex justify-content-between">
                <SearchBox
                    onPageSizeChange={(size: number) =>
                        dispatch({ type: RoundListAction.UPDATE_PAGESIZE, payload: size })
                    }
                    value={searchQuery}
                    onChange={(text: string) =>
                        dispatch({ type: RoundListAction.UPDATE_SEARCH, payload: text })
                    }
                    selectedSize={pageSize}
                />
            </div>
            {isLoading ? (
                <TableLoader />
            ) : (
                <>
                    <RoundsTable
                        rounds={rounds}
                        sortColumn={sortColumn}
                        onDelete={
                            // todo: think about it
                            () => null
                        }
                        onSort={(sort: SortColumn) =>
                            dispatch({
                                type: RoundListAction.UPDATE_SORT,
                                payload: sort,
                            })
                        }
                        itemsCount={totalCount}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={(pageNumber: number) =>
                            dispatch({
                                type: RoundListAction.UPDATE_PAGE,
                                payload: pageNumber,
                            })
                        }
                    />
                </>
            )}
        </>
    );
};

export default Rounds;
