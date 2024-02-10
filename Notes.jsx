import React,{useEffect, useState} from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./Notes.css"

const Notes = () => {
    const [Data, setData] = useState({})
    const [getData, setgetData] = useState([])
    const [AllData, setAllData] = useState([])
    const [Mode, setMode] = useState('Save')
    const [Index, setIndex] = useState()
    const [Error, setError] = useState("")
    const time = new Date().toLocaleTimeString()
    const date = new Date().toLocaleDateString()
    useEffect(()=>{
const data = JSON.parse(localStorage.getItem('data')) || []
setgetData(data)
    },[AllData])
const ChangeHandle=(e)=>{
    setData({...Data ,[e.target.name]: e.target.value, time:time,date:date })
}

const AddData=(e)=>{
  let localdata =[...getData]
  localdata = getData.concat(Data)
  localStorage.setItem('data',JSON.stringify(localdata))
  setAllData(localdata)
  setData({title:"", des:""})
}
const UpdateHandle=(e,i)=>{
  let localdata=[...getData]
  localdata[Index] = Data
  setAllData(localdata)
  setData({title:"",des:""})
  localStorage.setItem('data',JSON.stringify(localdata))
  // UpdateHandle[i].bgColor = e.target.value;
  setMode("Save")



}
const EditHandle=(e,i)=>{
setData({title:e.title,des:e.des})
setIndex(i)
setMode("Update")
}
const  SubmitHandle=(e)=>{
e.preventDefault()
if (verify()) {
  if (Data.title && Data.des) {
    if (Mode=== "Save") {
      AddData()
    }else{
UpdateHandle()
    }
  }
}
}
const DeleteHandle=(e,i)=>{
getData.splice(i,1)
setData(getData)
localStorage.setItem('data',JSON.stringify(getData))
}
console.log(getData)
const verify=()=>{
  let localError ={}
  let valid = true
  if (!Data.title || Data.title.length === 0) {
    localError.title = "Title is required";
    valid = false;
  }
  if (!Data.des || Data.des.length === 0) {
    localError.des = "Description is required";
    valid = false;
  }
  setError(localError)
  return valid
}
const BgColorHandle=(e,i)=>{
let localdata = JSON.parse(localStorage.getItem('data')) || []
// let localdata;
localdata[i] = {...localdata[i],[e.target.name]:e.target.value}
setgetData(localdata)
localStorage.setItem('data',JSON.stringify(localdata))

}
const ColorHandle=(e,i)=>{
let localdata = [...getData]
localdata[i] = {...localdata[i],[e.target.name]:e.target.value}
setgetData(localdata)
localStorage.setItem('data',JSON.stringify(localdata))
}
const BgImageHandle = (e, i) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onload = () => {
    let localdata = [...getData];
    localdata[i] = { ...localdata[i], bgImage: reader.result }; // Use reader.result to set the background image
    setgetData(localdata);
    localStorage.setItem('data', JSON.stringify(localdata));
  };
  
  if (file) {
    reader.readAsDataURL(file);
  }
};


console.log(ChangeHandle)
  return (
    <>
    <center>
    <div className='main'>
        <h1 className='bg-dark text-light '>My Notes</h1>
      <div className=' notes py-3 my-3'>
        <h2>Title</h2>
        <input type="text"className='px-1' onChange={ChangeHandle} name='title' value={Data.title} placeholder={Error && Error.title}/>
        {/* {Error && <p className='text-danger '>{Error.title}</p>} */}
        <h2>Description</h2>
        <textarea className='px-1' name="des" id="" cols="36" rows="8" value={Data.des} placeholder={Error && Error.des } onChange={ChangeHandle}></textarea> <br />
        <button className='btn btn-primary px-5 my-3' onClick={SubmitHandle}>{Mode}</button>
      </div>
    </div>
    </center> <br />
      <h1 className='bg-secondary'>Saved Notes</h1>
    <div className='  d-flex gap-3 flex-wrap justify-content-center  ' >
    { 
    getData.map((e,i)=>{
        return(
            <>
    <div class="card  text-center "  style={{width:'19rem',background:e.BgColor || "black", color:e.Color || "white",backgroundSize:'cover',objectFit:'cover', backgroundPosition:'center center' , backgroundImage: `url(${e.bgImage})`}}>
   <div class="card-body">
    <h5 class="card-title">Title</h5>
    <p class="card-title">{e.title}</p>
    <hr />
    <h5 class="card-text">Description</h5>
    <p class="card-text">{e.des}</p>
    <hr />
    <div className='DateTime d-flex justify-content-center gap-4'>
    <div className='d-flex   flex-column'>
    <h5 class="card-text">Time</h5>
    <p class="card-text">{e.time}</p>
    </div>
    <div className='d-flex  flex-column'>
    <h5 class="card-text "> Date</h5>
    <p class="card-text">{e.date}</p>
    </div>
    </div>
    <hr />
    <div className='gap-2 d-flex justify-content-center' style={{paddingLeft:'1.9rem'}}>
    <label htmlFor="" >Select Color</label>
    <input type="color" name='BgColor'  onChange={(e)=>BgColorHandle(e,i)} /> 
    </div>
    <div className='mt-3 d-flex gap-2 justify-content-center '>
    <label htmlFor="" >Select Text Color</label>
    <input type="color" name='Color' onChange={(e)=>ColorHandle(e,i)}  /> 
    </div>
                
    <hr />
    <button className='btn btn btn-danger me-4' onClick={(e)=>{DeleteHandle(e,i)}}>{<MdDelete/>}</button>
    <button className='btn btn-primary' onClick={()=>{EditHandle(e,i)}}>{<FaEdit/>}</button> <hr />
    <div className="gap-2 d-flex flex-column justify-content-center" style={{ paddingLeft: '1.9rem' }}>
                  <label htmlFor="">Select Background Image</label>
                  <input type="file" name="bgImage" onChange={(e) => BgImageHandle(e, i)} />
                </div>
  </div>
</div>
            </> 
        )
      })}
      </div>
    </>
  )
}

export default Notes
