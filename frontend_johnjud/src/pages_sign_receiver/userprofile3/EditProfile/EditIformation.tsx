import React, { useEffect, useState } from 'react';
import '../Profile.css';
import profileservice from '../ProfileService';
import {Userinfo} from '../Interface';


const LeftBlockEdit=(prop:any) =>{
    
    const[obj,setObj] = useState<Userinfo>({UserName: '',
      FirstName: '',
      LastName: '',
      Address:'',
      Birthday: '',
      Gender: '',
      PhoneNo: '',
      Email: '',
      Facebook:'',
      Location: '',
      Description: ''});
    //



    const fetchProfileInfo=() =>{
      return(
        profileservice.fetchProfileInfo(prop.userId)
        .then(res => {
          
          setObj(res)
          console.log(obj)
        })
      )
    }
    useEffect(()=>{
      fetchProfileInfo()
    },[])


    const username = obj.UserName;
    const firstname = obj.FirstName;
    const lastname = obj.LastName;
    const birthday = obj.Birthday;
    const gender = obj.Gender;
    const address = obj.Address;
    const facebook = obj.Facebook;

    const [isMale, setIsMale] = useState<boolean>();
    const [isFemale, setIsFemale] = useState<boolean>();
    const [isOthers, setIsOthers] = useState<boolean>();
    const [newFirstName, setNewFirstName] = useState<string>();
    const [newLastName, setNewLastName] = useState<string>();
    const [newBirthDay, setNewBirthDay] = useState<string>();
    const [newGender, setNewGender] = useState<string>();
    const [newAddress, setNewAddress] = useState<string>();
    const [newFacebook, setNewFacebook] = useState<string>();
    
    const initNewlastname = () =>{
      setNewLastName(lastname)
    }
    const initNewfirstname = () =>{
      setNewFirstName(firstname)
    }
    const initNewbirthday = () =>{
      setNewBirthDay(birthday)
    }
    const initNewgender = () =>{
      setNewGender(gender)
    }
    const initNewfacebook = () =>{
      setNewFacebook(facebook)
    }
    const initNewaddress = () =>{
      setNewAddress(address)
    }
    
    useEffect(()=>{
      if(firstname != undefined){
        initNewfirstname()
      }
    },[firstname]);

    useEffect(()=>{
      if(firstname != undefined){
        initNewlastname()
      }
    },[lastname]);

    useEffect(()=>{
      if(firstname != undefined){
        initNewaddress()
      }

    },[address])
    useEffect(()=>{
      if(firstname != undefined){
        initNewgender()
      }
      
    },[gender])
    useEffect(()=>{
      if(firstname != undefined){
        initNewfacebook()
      }
    },[facebook])
    useEffect(()=>{
      if(firstname != undefined){
        initNewbirthday()
      }
    },[birthday])

    useEffect(()=>{
      checkGender();
    },[newGender])

    const checkGender = ()=>{
      if(newGender=="Male"){
        setIsMale(true);
      }else if(newGender=="Female"){
        setIsFemale(true);
      }else if(newGender=="Others"){
        setIsOthers(true);
      }
    }  

    const update=() =>{
      let error_msg = '';
      if(newFirstName==''){
        error_msg = error_msg+'FirstName\n';
      }
      if(newLastName==''){
        error_msg = error_msg+'LastName\n';
      }
      if(newBirthDay==''){
        error_msg = error_msg+'BirthDay\n';
      }
      if(newAddress==''){
        error_msg = error_msg+'Address\n';
      }
      if(error_msg!=''){
        alert('Please inform required information : \n' + error_msg);
        return;
      }

        const newInfoProfile = {
            FirstName: newFirstName,
            LastName: newLastName,
            Birthday: newBirthDay,
            Gender: newGender,
            Address: newAddress,
        }
        profileservice.updateinfo(newInfoProfile,prop.userId);
    }


    return(
        <div className='EditInformationBlock'>
            <br/><br/><br/>
            <div className='profilename'>
            <h1 style={{fontSize:20,textAlign:"center"}}><u>{username}</u></h1>
            <br/>
            <div className='Info'><h5>
            <p className='bold'>FirstName: <input id='Input' value={newFirstName} onChange={(e) => {setNewFirstName(e.target.value);}}></input></p>
            <p className='bold'>LastName: <input id='Input' value={newLastName} onChange={(e) => {setNewLastName(e.target.value);}}></input></p>
            <p className='bold'>Birthday: <input id='Input' type="date" value={newBirthDay} onChange={(e) => {setNewBirthDay(e.target.value);}}></input></p>
            <p className='bold'>Gender: 
            <input type='radio' value='Male' name='gender' checked={isMale} onChange={(e) => {setNewGender(e.target.value);}}></input>
            <label>Male</label>
            <input type='radio' value='Female' name='gender' checked={isFemale} onChange={(e) => {setNewGender(e.target.value);}}></input>
            <label>Female</label>
            <input type='radio' value='Others' name='gender' checked={isOthers} onChange={(e) => {setNewGender(e.target.value);}}></input>
            <label>Others</label>
            </p>
            <p className='bold'>Address: <textarea id='AddressInput' value={newAddress} onChange={(e) => {setNewAddress(e.target.value);}}></textarea></p>
            <button id='ButtonUpdate' onClick={update} >Update</button>
            </h5>
            </div>
            </div>
        </div>
    )
}

export default LeftBlockEdit;