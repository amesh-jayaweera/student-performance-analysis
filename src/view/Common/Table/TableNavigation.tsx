import React from "react";

export function TableNavigation () {
    return (
        <nav aria-label="Page navigation example">
            <div className="row">
                <div className="col-sm-4">
                    <p className="mt-4">Showing 30 of 1000</p>
                </div>
                <div className="col-sm-8">
                    <ul className="pagination justify-content-sm-end mt-3">
                        <li className="page-item disabled">
                            <a className="page-link" href="#"  aria-disabled="true">«</a>
                        </li>
                        <li className="page-item disabled">
                            <a className="page-link" href="#"
                               aria-disabled="true">&lt;</a>
                        </li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">&gt;</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">»</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}