import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import {Toast, TOAST_FAILURE, TOAST_SUCCESS} from "../Common/Toasts/Toast";
import { data } from "../../models/data";
import { db } from "../../";
import { Bar, Line } from "react-chartjs-2";
import { barChart } from "../../models/barChart";

export function StudentPerformance () {

    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);
    const [success,setSuccess] = useState<boolean>(false);
    const [failure,setFailure] = useState<boolean>(false);
    const [userMessage,setUserMessage] = useState<string>("'");
    
    const [studentID,setStudentID] = useState<string>("");
    const [subject,setSubject] = useState<string>("");
    const [subjects,setSubjects] = useState<string[]>([]);
    const [selectedSubject,setSelectedSubject] = useState<data>();

    const [data,setData] = useState<data[]>([]);

    const [required,setRequired] = useState({
       indexNumber : false,
       subject : false 
    });

    const [studentExists,setStudentExists] = useState(true);

    const [barChartData,setBarChartData] = useState<barChart>({
        labels : [],
        datasets: [
            {
                label : 'Quiz',
                data : [
                ],
                backgroundColor : 'rgba(255,123,78,0.6)'
            },
            {
                label : 'Assignment',
                data : [
                ],
                backgroundColor : 'rgba(255,67,255,0.6)'
                
            },
            {
                label : 'Mid Term',
                data : [
                ],
                backgroundColor : 'rgba(245,178,198,0.6)'
                
            },
            {
                label : 'Mini Project',
                data : [
                ],
                backgroundColor : 'rgba(255,255,78,0.6)'
                
            },
            {
                label : 'End Exam',
                data : [
                ],
                backgroundColor : 'rgba(210,88,90,0.6)'
                
            }
        ]
    })

    const [lineChartData,setLineChartData] = useState<barChart>(
        {
            labels : ['Quiz','Assignment','Mid Term','Mini Project','End Exam'],
            datasets: [
                {
                    label : 'Subject Marks',
                    data : [],
                    backgroundColor : 'rgba(255,123,78,0.6)'
                }
            ]}
    );

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

    useEffect(()=> {
        if(subjects.length > 0)
            setSubject(subjects[0])
    },[subjects])

    useEffect(()=> {
        for(var i=0;i < data.length;i++) {
            let d = data[i];
            if(!!d && d['subject'] === subject.trim()) {
                setSelectedSubject(d)
                break;
            }   
        }
    },[subject])

    useEffect(()=> {

        let _lables = [];
        let quizM  = [];
        let assignmentM  = [];
        let midTermM  = [];
        let miniProjectM  = [];
        let endExamM  = [];

        for(var i=0;i < data.length;i++) {
            let d = data[i];
            if(!!d) {
                _lables.push(d['subject'])
                quizM.push(d['quiz'])
                assignmentM.push(d['assignment'])
                midTermM.push(d['midTerm'])
                miniProjectM.push(d['miniProject'])
                endExamM.push(d['endExam'])
            }
        }

        setSubjects(_lables)
        setBarChartData({
            ...barChartData,
            labels : _lables, 
            datasets: [
            {
                label : 'Quiz',
                data : quizM,
                backgroundColor : 'rgba(255,123,78,0.6)'
            },
            {
                label : 'Assignment',
                data : assignmentM,
                backgroundColor : 'rgba(255,67,255,0.6)'
                
            },
            {
                label : 'Mid Term',
                data : midTermM,
                backgroundColor : 'rgba(245,178,198,0.6)'
                
            },
            {
                label : 'Mini Project',
                data : miniProjectM,
                backgroundColor : 'rgba(255,255,78,0.6)'
                
            },
            {
                label : 'End Exam',
                data : endExamM,
                backgroundColor : 'rgba(210,88,90,0.6)'
                
            }
        ]
        })

    },[data])

    useEffect(()=> {
        if(!!selectedSubject) {
            let d  = [];
            d.push(selectedSubject.quiz)
            d.push(selectedSubject.assignment)
            d.push(selectedSubject.midTerm)
            d.push(selectedSubject.miniProject)
            d.push(selectedSubject.endExam)
            setLineChartData({
                ...lineChartData,
                labels : ['Quiz','Assignment','Mid Term','Mini Project','End Exam'],
                datasets: [
                    {
                        label : 'Subject Marks',
                        data : d,
                        backgroundColor : 'rgba(255,123,78,0.6)'
                    }
                ]
            })
        }
    },[subject])


    function onStudentSearch() {
        setRequired({
            ...required,
            indexNumber : false
        })
        if(!!studentID) {
            setData([])
            let flag : boolean = false;
            db.collection("marks").where("indexNumber","==",studentID).get().then((querySnapshot) => {
                let temp : data[] = [];
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`);
                    let d  = doc.data()
                    if(!!d) {
                        flag = true;
                        temp.push(d as data);
                    }
                });
                if(flag) {
                    setData(temp)
                    setStudentExists(true)
                } else {
                    setStudentExists(false)
                }
            });
        } else {
            setRequired({
                ...required,
                indexNumber : true
            })
        }
    }

    return (
        <>
            {(!loading) &&
                <main className="flex-shrink-0">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 col-md-7">
                                <h5 className="font-weight-bold mt-1 mb-1">Student Performance Analysis By Student</h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-8 col-sm-8">
                                <div className={""}>
                                    <input onChange={(e)=> setStudentID(e.target.value)} type="text" className="form-control" placeholder={"Student Index Number"}/>
                                    {required.indexNumber &&
                                    <div className={"invalid-feedback d-block"}>{"Index Number Required"}</div> }
                                </div>
                            </div>
                            <div className="col">
                                <button  onClick={()=> onStudentSearch()} className="btn btn-primary w-100 bold-font" data-toggle="modal"
                                        ><i
                                    className="fas fa-sync"></i> {"Search"}
                                </button>
                            </div>
                        </div>
                    
                    <br/><br/>

                    {
                        !!data && data.length > 0 && <div>
                            <Bar
                            data={barChartData}
                            width={100}
                            height={20}
                            options={{ maintainAspectRatio: false }}
                        />

                        <br/><br/>

                        <div className="row">
                                    <p className="bold-font mt-3 mb-1">Select Subject</p>
                                    <select className="form-control" onChange={(e)=> setSubject(e.target.value)}>
                                        {
                                            subjects.map((name)=> {
                                                return (
                                                    <option value={name}>{name}</option>
                                                );
                                            })
                                        }
                                    </select>

                        </div> 

                        <Line
                        data={lineChartData}
                        width={100}
                        height={20}
                        options={ {maintainAspectRatio: false} }
                        />

                        </div>
                    }
                    
                        {
                            !studentExists &&  <div className="row">
                                <h5 className="font-weight-bold mt-1 mb-1">No data available for the entered student index number</h5>
                            </div>
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
