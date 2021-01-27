import React from "react";

export function Button ({buttonText,action} : {buttonText : string,action : any}) {
    return (
        <div className="col-lg-4 col-sm-6">
            <div className="row">
                <div className="col">
                    <button  onClick={()=> action()} className="btn btn-primary w-100 bold-font" data-toggle="modal"
                            data-target="#discover-merchants-modal"><i
                        className="fas fa-plus"></i> {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}