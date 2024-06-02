import './App.css';
import {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import {EditableText, InputGroup,Toaster} from '@blueprintjs/core'

const AppToaster = Toaster.create({
  position:"top"
})
function App() {
  const [users,setUser] = useState([]);
  const [newName,setNewname]=useState('');
  const [newemail,setEmail]=useState('');
  const [newwebsite,setwebsite]=useState('');
  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((res)=>res.json())
    .then((res)=>setUser(res));

  },[])

  function  adduser(){
    const name = newName.trim();
    const email = newemail.trim();
    const website = newwebsite.trim();

      if(name&&email&&website){
        fetch(`https://jsonplaceholder.typicode.com/users`,
        {
          method:"POST",
          body:JSON.stringify({
            name,
            email,
            website
          }),
          headers:{
            "content-type":"application/json"
          }
        }

        ).then((res)=>res.json())
        .then(data=>{
          setUser([...users,data])
          AppToaster.show({
            message:"user added successfully",
            intent:"success",
            timeout:3000,
          })
          setNewname("")
          setEmail("")
          setwebsite("")


        })
        
      }

  }

  function onChangeHandler(id,key,value){
    setUser((users)=>{
     return users.map(user=>{
        return user.id=== id ? {...user,[key]:value}:user;
      })
    })

  }
   function userUpdate(id){
    const  user=users.find((user)=>user.id===id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(user),
      headers:{
        "content-type":"application/json;charset=UTF-8"
      }

    }
 
   )
   .then((res)=>res.json())
   .then((data)=>{
    
    AppToaster.show({
      message:"user Upadte successfully",
      intent:"success",
      timeout:3000,
    })
   })

   }

   function userDelete(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method:"DELETE",
      

      }
    )
    .then((res)=>res.json())
    .then(data=>{
      setUser((users)=>{
        return users.filter(user=>user.id!==id)
      })
      AppToaster.show({
        message:"user delete succesfully",
        intent:"success",
        timeout:3000,

      })

    })

   }
  return (
    <div className="App">
      <tabel className="bp4-html-table modifier">
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>

        </thead>
        <tbody>
        {users.map(((user) =>
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td> <EditableText onChange={value=>onChangeHandler(user.id,'email',value)} value={user.email}/></td>
            <td> <EditableText  onChange={value=>onChangeHandler(user.id,'email',value)} value={user.email}/></td>
            <td>
            <button type="button" class="btn btn-primary" onClick={()=>userUpdate(user.id)}>Update</button>
            &nbsp;
            <button type="button" class="btn btn-danger" onClick={()=>userDelete(user.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>
            <InputGroup  value={newName} onChange={(e)=>setNewname(e.target.value)}
            placeholder='Enter name'
             />
            
          </td>
          <td>
            <InputGroup  value={newemail} onChange={(e)=>setEmail(e.target.value)}
            placeholder='Enter Email'
             />
            
          </td>
          <td>
            <InputGroup  value={newwebsite} onChange={(e)=>setwebsite(e.target.value)}
            placeholder='Enter Website'
             />
            
          </td>
          <td>
          <button type="button" class="btn btn-success" onClick={adduser}>Add User</button>
          </td>
        </tr>
      </tfoot>
      </tabel>
  
    </div>
  );
}

export default App;
 