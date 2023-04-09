import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { createPost, getAllPost } from '../utils/Api';
import { Box, Button, Input, Modal, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: "20px",
    border: "1px solid grey",
    borderRadius: "20px"
};

function CreatePost() {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState({ user_id: "", content: "", image: "" });
    const [photo, setPhoto] = useState("")


    async function CreateSinglePost(data) {
        var res = await createPost(data);
        console.log(res.data, "res")
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostInput({ ...postInput, [name]: value });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        data.append("file", photo);
        data.append("upload_preset", "social_media");
        const res = photo && await axios.post("https://api.cloudinary.com/v1_1/dz84rrvfb/image/upload", data)
        postInput.image = res?.data?.secure_url
        CreateSinglePost(postInput)
        navigate('/')
    }

    const { user_id, content } = postInput;
    return (
        <div>
            <Box style={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="user_id"
                        label="User ID"
                        variant="outlined"
                        fullWidth
                        width='100%'
                        autoFocus
                        name='user_id'
                        value={user_id}
                        onChange={handleChange}
                        required
                    />
                    <Input type='file'
                        id="image"
                        label="Image"
                        variant="outlined"
                        fullWidth

                        name="image"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                    <br />
                    <TextField
                        id="content"
                        label="Content"
                        variant="outlined"
                        inputProps={{ maxLength: 300 }}
                        multiline
                        rows={10}
                        fullWidth
                        name="content"
                        value={content}
                        onChange={handleChange}
                        required
                        style={{ marginTop: "15px" }}
                    />
                    <Button style={{ marginTop: "15px" }} type='submit' variant="contained" color="primary" margin='auto'>
                        Post
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default CreatePost;