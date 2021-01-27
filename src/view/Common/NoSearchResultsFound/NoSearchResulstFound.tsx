import React from "react";

export function NoSearchResultsFound() {
    return (
        <div className="row mt-3">
            <div className="col">
                <div className="card">
                    <div className="card-body text-center">
                        <img src={require("../../../resources/images/icon-search.png")}/>
                        <h4 className="">No search results found</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}