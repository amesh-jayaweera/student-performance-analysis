import React, {useEffect, useState} from "react";
import {column} from "./column";
import {useHistory, useLocation} from "react-router";
import {Toast, TOAST_FAILURE, TOAST_SUCCESS} from "../Toasts/Toast";

export const EDIT = "fa-edit";

export function Table ({columns,data,actions,isUpdated,name} : {columns : column[],data : any[],actions : string[],isUpdated : any,name : string}) {

    const location =  useLocation();
    const history  = useHistory();
    const [success,setSuccess] = useState<boolean>(false);
    const [failure,setFailure] = useState<boolean>(false);
    const [selectedRow,setSelectedRow] = useState(null);
    const [userMessage,setUserMessage] = useState<string>("'");

    useEffect(()=> {
        if(success) {
            setTimeout(
                function () {
                    setSuccess(false)
                },
                1000
            );
        }
        if(failure) {
            setTimeout(
                function () {
                    setFailure(false)
                },
                1000
            );
        }
    },[success,failure])

    return (
        <>
            <div className="row mt-3">
                <div className="col">
                    <div className="card">
                        <div className="card-body p-2">
                            <div className="table-responsive border-0 p-0 shadow-none">
                                <table id={name} className="table table-borderless">
                                    <thead>
                                    <tr>
                                        {
                                            columns.map((column) => {
                                                return (
                                                    <th key={`col-${column.id}`} className={`table-column-width-${column.width}`}>{column.title}</th>
                                                );
                                            })
                                        }
                                        {
                                            !!actions && (actions.length > 0) &&
                                            <th key={"col-actions"} className={"table-column-width-17 text-center"}>Actions</th>
                                        }
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {!!data &&
                                    data.map((data : any) => {
                                        return (
                                            <tr key={`row-${data['key']}`}>
                                                {
                                                    columns.map((column : column) => {
                                                        return (
                                                            <td key={`col-${column.id}-${data['key']}`}>
                                                                 <span className="responsive-mobile-heading">
                                                                     {column.title}
                                                                 </span>
                                                                {(data as any)[column.id]}
                                                            </td>
                                                        );
                                                    })
                                                }
                                                {
                                                    !!actions && (actions.length > 0) &&
                                                    <td key={`col-actions-${data['key']}`} className="table-actions">
                                                        <span className="responsive-mobile-heading">Actions</span>
                                                        {
                                                            actions.map((action:string) => {
                                                                return (
                                                                    <a key={`action-${action}-${data['key']}`} className="btn"
                                                                       onClick={()=> {

                                                                       }}
                                                                    >
                                                                        <i className={`fas ${action}`}/>
                                                                    </a>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                }
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/*<TableNavigation/>*/}
                </div>
            </div>
            {
                success && <Toast type={TOAST_SUCCESS} message={userMessage}
                                  timeout={3000}/>
            }
            {
                failure && <Toast type={TOAST_FAILURE} message={userMessage}
                                  timeout={3000}/>
            }
        </>
    );
}
