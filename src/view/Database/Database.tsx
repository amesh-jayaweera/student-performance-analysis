import React, {useEffect, useState} from "react";
import {SearchBar} from "../Common/SearchBar/SearchBar";
import {Button} from "../Common/Button/Button";
import {column} from "../Common/Table/column";
import {EDIT, Table} from "../Common/Table/Table";
import {useHistory, useLocation} from "react-router";
import {Toast, TOAST_FAILURE, TOAST_SUCCESS} from "../Common/Toasts/Toast";
import { data } from "../../models/data";
import {  StudentMarksAddPopUpModal } from "../Database/PopUp/StudentMarksAddPopUpModal";
import { db } from "../../";

const columns : column[] = [
    {id : "indexNumber",title : "Index Number",width : "12"},
    {id : "subject",title : "Subject",width : "20"},
    {id : "assignment",title : "Assignment",width : "8"},
    {id : "quiz",title : "quiz",width : "8"},
    {id : "midTerm",title : "Mid Term",width : "8"},
    {id : "miniProject" , title : "Mini Project" , width : "8"},
    {id : "endExam" , title : "End Exam" , width : "8"}
];

export function Database () {

    const history = useHistory();
    const location = useLocation();
    const [data,setData] = useState<data[]>([]);
    const [filteredData,setFilteredData] = useState<data[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [success,setSuccess] = useState<boolean>(false);
    const [failure,setFailure] = useState<boolean>(false);
    const [userMessage,setUserMessage] = useState<string>("'");
    const [isUpdated,setIsUpdated] = useState<boolean>(false);
    const [searchKey,setSearchKey] = useState<string>("");
    let subjects : string[] = [];

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

    useEffect(() => {
        loadData()
    }, []);

    useEffect(() => {
        if(isUpdated) {
            setIsUpdated(false)
            loadData()
        }
    },[isUpdated])

    function loadData() {
        setLoading(false);
        db.collection("marks").get().then((querySnapshot) => {
            let temp : data[] = [];
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                let d  = doc.data()
                if(!!d) {
                    temp.push(d as data);
                }
            });
            setData(temp);
            setFilteredData(temp);
        });
    }

    

    function search(key : string) {
        setFilteredData([]);
        let tempData : any = [];
        for(let i=0;i<data.length;i++) {
            let temp : data  = data[i];
            if(temp['indexNumber'].toLowerCase().includes(key.toLowerCase()) ||
                temp['subject'].toLowerCase().includes(key.toLowerCase()))
            {
                tempData.push(temp);
            } 
        }
        setFilteredData(tempData);
    }

    return (
        <>
            {(!loading) &&
                <main className="flex-shrink-0">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 col-md-7">
                                <h5 className="font-weight-bold mt-1 mb-1">Database</h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <SearchBar
                                placeHolder={"search"}
                                action={(key : string)=> {search(key)}}
                                className={"col-lg-8 col-sm-6 mb-2"}
                            />
                            <Button
                                buttonText={"Add Student Marks"}
                                action={()=> history.push("#add")}
                            />
                        </div>
                        {
                            !!columns &&
                            <Table
                                columns={columns}
                                data={filteredData}
                                actions={
                                    [
                                        EDIT
                                    ]
                                }
                                isUpdated={()=> setIsUpdated(true)}
                                name={"student marks"}
                            />
                        }
                        {
                            location.hash === "#add" && <StudentMarksAddPopUpModal
                                status={(type : string) =>
                                    {
                                        if(type === TOAST_SUCCESS) {
                                            setUserMessage(`Add Student Marks Data Successfully`)
                                            setSuccess(true)
                                        }
                                        if(type === TOAST_FAILURE) {
                                            setUserMessage(`Failed To Add Student Marks Data`)
                                            setFailure(true)
                                        }
                                    }}
                                isUpdated={()=> setIsUpdated(true)}
                            />
                        }
                        {
                            success && <Toast type={TOAST_SUCCESS} message={userMessage}
                                              timeout={3000}/>
                        }
                        {
                            failure && <Toast type={TOAST_FAILURE} message={userMessage}
                                              timeout={3000}/>
                        }
                    </div>
                </main>
            }
        </>
    );
}
