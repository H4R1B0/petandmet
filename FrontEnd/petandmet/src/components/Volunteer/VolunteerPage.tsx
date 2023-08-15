import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import newLogo from "images/new_logo.jpg";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CenterDataList from "hooks/Center/CenterMutation";
import { useCenterData } from "hooks/Center/useCenterData";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFA629",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "orange",
  },
  margin: "5px",
}));

function CustomCard({
  uuid,
  title,
  content,
}: {
  uuid: string;
  title: string;
  content: string;
}) {
  const { updateCenterData } = useCenterData();

  const handleCardClick = () => {
    console.log(`선택한 보호소의 UUID: ${uuid}`);
    updateCenterData(uuid);
    // 여기에 라우팅 코드를 추가합니다.
  };
  return (
    <Card sx={{ maxWidth: 3 }} onClick={handleCardClick}>
      <CardMedia component="img" height="80" image={newLogo} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>{/* Add your button actions here */}</CardActions>
      <CustomButton>산책 신청하기</CustomButton>
      <CustomButton>봉사 신청하기</CustomButton>
    </Card>
  );
}

// 1. VolunteerPage에서의 center 의 state를 받는다.
// 2. 해당 state 에는 보호소 관련 DB 데이터를 받을 수 있다 => 등록된 보호소 개수만큼 mapping
// 2-1 보호소가 4개를 넘어가면 그 다음 Carousel 에서 보여주기
// 3. 두가지 선택지 (산책하기, 봉사하기) 중 선택
// 3-1 산책하기를 누르면 해당 보호소를 선택한 상태 state를 담은채로 WalkPage(산책페이지)로 이동. (Zustand로 상태 관리)
// 3-2 봉사하기를 누르면 해당 보호소에 직접 연락을 할 수 있는 연락처 or 봉사 관련 게시판에 봉사 내용 신청

function VolunteerPage() {
  // 여기있는 데이터를 DB에서 받아와서 쓸 거임
  const [center, setCenter] = useState<any[]>([]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(center.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const centersData = await CenterDataList();
      setCenter(centersData);
    };
    fetchData();
  }, []);

  const [data, setData] = useState(null);

  const response = CenterDataList();
  console.log("센터는 response");
  console.log(response);

  return (
    <>
      <CssBaseline />
      <h4 className="text-3xl text-yellow-500 font-extrabold my-9">봉사활동</h4>
      <Container
        sx={{
          mt: 5,
          display: "flex",
          bgcolor: "#FFE8A3",
          height: "100%",
          width: "60%",
          borderRadius: 5,
        }}
      >
        <Container
          sx={{
            my: 5,
            mx: 3,
            display: "",
            bgcolor: "#ffffff",
            height: "90%",
            width: "98%",
            borderRadius: 5,
          }}
        >
          <Box sx={{ width: "100%" }} marginY={5} marginLeft={3}>
            <Grid container rowSpacing={5}>
              {center
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                )
                .map((centerItem) => (
                  <Grid key={centerItem.uuid} item xs={5} md={6}>
                    <CustomCard
                      uuid={centerItem.uuid}
                      title={centerItem.name || "No Name"}
                      content={centerItem.address || "No Address"}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
          {/* Pagination buttons */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                sx={{ margin: "0.5rem" }}
                variant={currentPage === index ? "contained" : "outlined"}
                color="primary"
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default VolunteerPage;
