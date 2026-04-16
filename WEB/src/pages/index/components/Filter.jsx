import { memo } from "react";
import dataDe from "../../../utils/data/data.json";
import { Select } from "../../../components/Select";

export const Filter = memo(
    ({ handleSubmit, handleChangeDataFilter, dataFilter }) => {
        return (
            <div className="filter p-4">
                <div className="form row" >
                    <div className="search col-4 px-0">
                        <input
                            type="text"
                            placeholder="enter for keyword search"
                            className="form-control"
                            value={dataFilter["title"]}
                            onChange={(event) =>
                                handleChangeDataFilter(
                                    "title",
                                    event.target.value
                                )
                            }
                        />
                    </div>
                    <div className="row col-6">
                        <div className="row my-1">
                            <div className="col-4">
                                <Select
                                    defaultName="Price"
                                    defaultValue={{min: 0, max: 0}}
                                    listItems={dataDe.price}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="price"
                                />
                            </div>
                            <div className="col-4">
                                <Select
                                    defaultName="Square"
                                    defaultValue={{min: 0, max: 0}}
                                    listItems={dataDe.square}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="square"
                                />
                            </div>
                            <div className="col-4">
                                <Select
                                    defaultName="Direct"
                                    defaultValue=""
                                    listItems={dataDe.direct}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="direct"
                                />
                            </div>
                        </div>
                        <div className="row my-1">
                            <div className="col-4">
                                <Select
                                    defaultName="City/Province"
                                    defaultValue=""
                                    listItems={dataDe.province}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="province"
                                />
                            </div>
                            {/* <div className="col-4">
                                <Select
                                    defaultName="District"
                                    defaultValue=""
                                    listItems={data.province}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="province"
                                />
                            </div>
                            <div className="col-4">
                                <Select
                                    defaultName="Ward"
                                    defaultValue=""
                                    listItems={data.province}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="province"
                                />
                            </div> */}
                        </div>
                    </div>
                    <button
                        className="btn btn-primary btn-search col-2"
                        onClick={handleSubmit}
                    >
                        <div>Search</div>
                    </button>
                </div>
            </div>
        );
    }
);
