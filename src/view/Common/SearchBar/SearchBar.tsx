import React from "react";

export function SearchBar({placeHolder,action,className}: { placeHolder: string,action : any,className : string}){
    return (
        <div className={className}>
            <input onChange={(e)=> action(e.target.value)} type="text" className="form-control" placeholder={placeHolder}/>
        </div>
    );
}