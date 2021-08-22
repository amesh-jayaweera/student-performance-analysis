import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import { db } from "../../..";
import { data } from "../../../models/data";
import {TOAST_FAILURE, TOAST_SUCCESS} from "../../Common/Toasts/Toast";

export function StudentMarksAddPopUpModal({status,isUpdated}:{status : any,isUpdated : any}) {

    const history  = useHistory();
    const [loading,setLoading] = useState(false);
    const [subjects,setSubjects] = useState<string[]>([]);
    const [alreadyExists,setAlreadyExists] = useState(false);
    
    const [data,setData] = useState<data>(
        {
            indexNumber : '',
            subject : '',
            quiz : 0,
            assignment : 0,
            midTerm : 0,
            miniProject : 0,
            endExam : 0
        }
    );

    useEffect(() => {
        db.collection("subjects").get().then((querySnapshot) => {
            let temp : string[] = [];
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                let d = doc.data()
                if(d !== undefined && d['name'] !== undefined && d['name'] !== "") {
                    temp.push(d['name']);
                } 
            });
            setSubjects(temp);
            setData({
                ...data,
                subject : !!subjects[0] ? subjects[0] : ''
            })
           //console.log(subjects)
        });
    },[])

    const [required, setRequired] = useState({
        indexNumber : false,
        subject : false
    });

    const [isMarksValid,setIsMarksValid] = useState({
        quiz : true,
        assignment : true,
        midTerm : true,
        miniProject : true
    });

    function addStudentMarks() {
        setRequired({
            indexNumber : false,
            subject : false
        })
        setIsMarksValid({
            quiz : true,
            assignment : true,
            miniProject : true,
            midTerm : true
        })
        setAlreadyExists(false)
        if(!!data.indexNumber) {
            console.log(data)
            if(!!data.subject) {
                
                if(data.quiz < 0 || data.quiz > 100) {
                    setIsMarksValid({
                        ...isMarksValid,
                        quiz : false
                    })
                } else if(data.assignment < 0 || data.assignment > 100) {
                    setIsMarksValid({
                        ...isMarksValid,
                        assignment : false
                    })
                } else if(data.midTerm < 0 || data.midTerm > 100) {
                    setIsMarksValid({
                        ...isMarksValid,
                        midTerm : false
                    })
                }  else if(data.miniProject < 0 || data.miniProject > 100) {
                    setIsMarksValid({
                        ...isMarksValid,
                        miniProject : false
                    })
                } else {
                    setLoading(true);
                    const ref = db.collection("marks");

                    db.collection("marks").where("indexNumber","==",data.indexNumber.trim()).where("subject","==",data.subject.trim())
                    .get()
                    .then(function(querySnapshot) {
                        let flag : boolean = false;
                        querySnapshot.forEach(function(doc) {
                            let d = doc.data();
                            if(d['indexNumber'] === data.indexNumber && d['subject'] === data.subject) {
                                flag = true;
                                setAlreadyExists(true)
                            }
                        });
                        if(!flag) {
                            let predicted_end_exam_score = 0.302839783 * data.assignment
                                + 0.0849104368 * data.quiz - 0.0000801704296 * data.midTerm +
                                0.444330645 * data.miniProject + 0.10504678;
                            setData({
                                ...data,
                                endExam : predicted_end_exam_score
                            });
                            db.collection("marks").add({
                                ...data,
                                endExam : predicted_end_exam_score
                            })
                            .then(function(docRef) {
                                setLoading(false)
                                isUpdated()
                                status(TOAST_SUCCESS)
                                history.goBack()
                            })
                            .catch(function(error) {
                                setLoading(false)
                                status(TOAST_FAILURE)
                                history.goBack()
                            });
                        } else {
                            setLoading(false)
                        }
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });
                }
            } else {
                setRequired({
                    ...required,
                    subject : true
                })
            }
        } else {
            setRequired({
                ...required,
                indexNumber: true
            })
        }
    }

    return (
        <>
        <div className="modal fade show d-block animated fadeInDown" id="discover-merchants-modal" tabIndex={-1} aria-labelledby="exampleModalLabel3"
             aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel3">Add Student Marks</h5>
                        <button onClick={()=> history.goBack()} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="bold-font mt-3 mb-1">Index Number</p>
                                    <input onChange={(e)=> setData({
                                        ...data,
                                        indexNumber : e.target.value
                                    })} className="form-control"
                                        type="text"/>
                                        {required.indexNumber &&
                                    <div className={"invalid-feedback d-block"}>{"Index Number Required"}</div> }
                                    {alreadyExists &&
                                    <div className={"invalid-feedback d-block"}>{"Index Number and Subject combination already exists"}</div> }
                                </div>
                                <div className="col-sm-6">
                                    <p className="bold-font mt-3 mb-1">Subject</p>
                                    <select className="form-control" onChange={(e)=> setData({
                                        ...data,
                                        subject : e.target.value
                                    })}>
                                        {
                                            subjects.map((name)=> {
                                                return (
                                                    <option value={name}>{name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    {required.subject &&
                                    <div className={"invalid-feedback d-block"}>{"Subject Required"}</div> }
                                    {alreadyExists &&
                                    <div className={"invalid-feedback d-block"}>{"Index Number and Subject combination already exists"}</div> }
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <p className="bold-font mt-3 mb-1">Quiz</p>
                                    <input onChange={(e)=> setData({
                                        ...data,
                                        quiz : Number(e.target.value)
                                    })} className="form-control"
                                        type="number" min={0} max={100}/>

                                {!isMarksValid.quiz &&
                                    <div className={"invalid-feedback d-block"}>{"Range should be 1-100"}</div> }
                                </div>
                                <div className="col-sm-4">
                                    <p className="bold-font mt-3 mb-1">Assignment</p>
                                    <input onChange={(e)=> setData({
                                        ...data,
                                        assignment : Number(e.target.value)
                                    })} className="form-control"
                                        type="number" min={0} max={100}/>
                                        {!isMarksValid.assignment &&
                                    <div className={"invalid-feedback d-block"}>{"Range should be 1-100"}</div> }
                                </div>
                                <div className="col-sm-4">
                                    <p className="bold-font mt-3 mb-1">Mid Term</p>
                                    <input onChange={(e)=> setData({
                                        ...data,
                                        midTerm : Number(e.target.value)
                                    })} className="form-control"
                                        type="number" min={0} max={100}/>
                                        {!isMarksValid.midTerm &&
                                    <div className={"invalid-feedback d-block"}>{"Range should be 1-100"}</div> }
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="bold-font mt-3 mb-1">Mini Project</p>
                                    <input onChange={(e)=> setData({
                                        ...data,
                                        miniProject : Number(e.target.value)
                                    })} className="form-control"
                                        type="number" min={0} max={100}/>
                                        {!isMarksValid.miniProject &&
                                    <div className={"invalid-feedback d-block"}>{"Range should be 1-100"}</div> }
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={()=> history.goBack()} type="button" className="btn btn-secondary" data-dismiss="modal">
                            Close</button>
                        <button onClick={()=> addStudentMarks()} type="button" className={!loading ? "btn btn-primary modal-footer__discover-merchants-save-btn"
                            : "btn btn-primary modal-footer__discover-merchants-save-btn d-none"}>Add
                        </button>
                        <button type="button"
                                className={loading ? "btn btn-primary modal-footer__discover-merchants-saving-btn"
                                    : "btn btn-primary modal-footer__discover-merchants-saving-btn d-none"}><i
                            className="fas fa-spin fa-spinner"></i>&nbsp;Adding...
                        </button>
                    </div>
                </div>
            </div>
            {   loading &&
            <div
                className={"overlay animated-overlay"}>
                <img src={require("../../../resources/images/animation.gif")} alt=""/>
            </div>
            }
        </div>
            <div className={"modal-backdrop show"}></div>
            </>
    );
}
