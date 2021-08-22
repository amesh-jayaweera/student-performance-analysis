import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import {Toast, TOAST_FAILURE, TOAST_SUCCESS} from "../Common/Toasts/Toast";
import { data } from "../../models/data";
import { db } from "../../";
import { Line } from "react-chartjs-2";
import { barChart } from "../../models/barChart";

export function StudentPerformanceSubject () {

    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);
    const [success,setSuccess] = useState<boolean>(false);
    const [failure,setFailure] = useState<boolean>(false);
    const [userMessage,setUserMessage] = useState<string>("'");
    const [subject,setSubject] = useState<string>("");
    const [subjects,setSubjects] = useState<string[]>([]);
    const [data,setData] = useState<data[]>([]);

    const [pieChartData,setPieChartData] = useState<barChart>({
        labels : ['A+','A','A-','B+','B','B-','C+','C','C-','D','F'],
        datasets: [
            {
                label : 'End Exam',
                data : [
                ],
                backgroundColor : 'rgba(245,178,198,0.6)'
                
            } 
        ]
    })

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
            if(temp.length > 0) setSubject(temp[0])
           //console.log(subjects)
        });
    },[])


    useEffect(()=> {
        if(!!subject) {
            db.collection("marks").where("subject","==",subject.trim())
                    .get()
                    .then(function(querySnapshot) {
                        let aPlus = 0;
                        let a = 0;
                        let aMinus = 0;
                        let bPlus = 0;
                        let b = 0;
                        let bMinus = 0;
                        let cPlus = 0;
                        let c = 0;
                        let cMinus = 0;
                        let dR = 0;
                        let f = 0;
                        querySnapshot.forEach(function(doc) {
                            let d = doc.data();
                            let num = d['endExam'];
                            if(num >= 85) {
                                aPlus++;
                            } else if(num >= 75) {
                                a++;
                            } else if(num >= 70) {
                                aMinus++;
                            } else if(num >= 65) {
                                bPlus++;
                            } else if(num >= 60) {
                                b++;
                            } else if(num >= 55) {
                                bMinus++;
                            } else if(num >= 50) {
                                cPlus++;
                            } else if(num >= 45) {
                                c++;
                            } else if(num >= 40) {
                                cMinus++;
                            } else if(num >= 35){
                                dR++;
                            } else {
                                f++;
                            }
                        });

                       setPieChartData( {
                           ...pieChartData,
                            labels : ['A+','A','A-','B+','B','B-','C+','C','C-','D','F'],
                            datasets: [
                                {
                                    label : 'End Exam',
                                    data : [aPlus,a,aMinus,bPlus,b,bMinus,cPlus,c,cMinus,dR,f
                                    ],
                                    backgroundColor : 'rgba(245,178,198,0.6)'
                                    
                                } 
                            ]
                        })

                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });
        }
    },[subject])




    return (
        <>
            {(!loading) &&
                <main className="flex-shrink-0">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 col-md-7">
                                <h5 className="font-weight-bold mt-1 mb-1">Student Performance Analysis By Subject</h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-6">
                                    <p className="bold-font mt-3 mb-1">Select Subject</p>
                                    <select className="form-control" onChange={(e)=> setSubject(
                                        e.target.value
                                    )}>
                                        {
                                            subjects.map((name)=> {
                                                return (
                                                    <option value={name}>{name}</option>
                                                );
                                            })
                                        }
                                    </select>
                            </div>
                        </div>
                    
                    <br/><br/>

                    {
                        !!pieChartData  && <div>
                           
                           <Line
                            data={pieChartData}
                            width={100}
                            height={100}
                            options={{ maintainAspectRatio: false }}
                        />
                        </div>
                    }
                    
                        {/* {
                            !studentExists &&  <div className="row">
                                <h5 className="font-weight-bold mt-1 mb-1">No data available for the entered student index number</h5>
                            </div>
                        } */}
                       
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
