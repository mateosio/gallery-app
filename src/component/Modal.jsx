import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { changeDescription, selectFavoritePhotos } from '../features/favoritePhotosSlice';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, setOpen, photo}) {
  const [newDescription, setNewDescription] = useState("");
 
  console.log(photo);
  const dispatch = useDispatch();
  
  const handleSave = ()=>{
    const newObject = {
      ...photo,
      description: newDescription
      }
      dispatch(changeDescription(newObject))
     console.log(newObject);
         
     setOpen(false);
     setNewDescription("");
}
  
  return (
    <div>
     
      <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <p>Likes: {photo.likes} ♥.</p>
            <p>Heigh: {photo.height}.</p>
            <p>Width: {photo.width}.</p>
            <p>Description: {photo.description}.</p>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 5, pb:3}}>
            You can change the description and save it:
          </Typography>
          
          <div>
                
              <input style={{borderBottom: "1px solid", width:"300px", borderRadius: "20px"}} 
              value={newDescription} 
              onChange={(e)=>{setNewDescription(e.target.value)}}></input>

               <button style={{cursor:"pointer", display:"block", marginTop: "6px"}} onClick={handleSave}>Save</button>
             
            </div>  
        </Box>
      </Modal>
    </div>
  );
}