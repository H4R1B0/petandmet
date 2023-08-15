import { Container, Typography, Button } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";
import { domain } from "hooks/customQueryClient";
import { useAccessToken } from "hooks/useAccessToken";

interface Center{
    uuid : string | null,
    name: string | null,
    address : string | null,
    email : string | null,
    phone : string | null,
  }

function UpdateCenter() {
    const location = useLocation();
    const navigate = useNavigate();
    // const [center, setCenter] = useState<Center | null>(location.state); 
    const center: Center = location.state as Center
    const [updatedName, setUpdatedName] = useState(center?.name);
    const [updatedAddress, setUpdatedAddress] = useState(center?.address);
    const [updatedPhone, setUpdatedPhone] = useState(center?.phone);
    const [updatedEmail, setUpdatedEmail] = useState(center?.email);
    const { accessToken } = useAccessToken()

    console.log(updatedName)

    const goToBack = () =>{
        navigate(-1)
    }
    const goToUpdate = async () => {
        const updatedData = {
          uuid: center.uuid, // Make sure to include the uuid
          name: updatedName,
          address: updatedAddress,
          phone: updatedPhone,
          email: updatedEmail,
        };
    
        try {
          await axios.patch(`${domain}/center`, updatedData, 
          {
            headers: {
                Authorization : `${accessToken}`
            }
          }
          )
          .then((res) =>{
              console.log('수정 완료', updatedData)
              navigate(-1); 
          })
          .catch((error) => {
            console.log(error)
          }) 
        } catch (error) {
            console.error('Error updating center:', error);
            console.log('수정 에러', updatedData)
        }
      };

    return(
        <>
        <Container>     
            <div style={{ padding: 20 }}>
                <Typography
                    variant="h4"
                    style={{ color: '#FFA629', fontWeight: 'bold' }}
                >
                    보호소 정보 수정
                </Typography>
            </div>  
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '80%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField 
                id="outlined-basic" 
                label="이름" 
                variant="outlined" 
                onChange={(e) => setUpdatedName(e.target.value)}
                defaultValue={updatedName}
                />

            <TextField
                id="outlined-multiline-static"
                label="주소"
                onChange={(e) => setUpdatedAddress(e.target.value)}
                defaultValue={updatedAddress}
                />
            <TextField 
                id="outlined-basic" 
                label="전화번호" 
                variant="outlined" 
                onChange={(e) => setUpdatedPhone(e.target.value)}
                defaultValue={updatedPhone}
                />

            <TextField
                id="outlined-multiline-static"
                label="e-mail"
                onChange={(e) => setUpdatedEmail(e.target.value)}
                defaultValue={updatedEmail}
                />
        </Box>
        <Box>
            <Button
                sx={{
                    backgroundColor: '#1E90FF',
                    '&:hover': { backgroundColor: '#4FC3F7' },
                    color: 'black',
                    marginRight: '5px',
                }}
                onClick={goToUpdate}
                >
                수정
                </Button>
                <Button
                sx={{
                    backgroundColor: '#FF0044',
                    '&:hover': { backgroundColor: '#FA8072' },
                    color: 'black',
                }}
                onClick={goToBack}
                >
                돌아가기
            </Button>
        </Box>

        </Container>
    </>
    )
}

export default UpdateCenter;
export{};
