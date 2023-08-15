import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { domain } from "hooks/customQueryClient";
import axios from "axios";
import { useCenterStore } from "hooks/Center/CenterMutation";
import { useCenterData } from "hooks/Center/useCenterData";

interface CenterData {
  uuid: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

function WalkCenter() {
  const [center, setCenter] = useState(["A 보호소", "B 보호소", "C 보호소"]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { centerData } = useCenterData();
  const uuid = centerData?.uuid;

  const [centerDetail, setCenterDetail] = useState<any | null>(null);

  useEffect(() => {
    const fetchCenterDetail = async () => {
      try {
        const response = await axios.get(
          `${domain}/center/detail?id=${uuid}`,
          {}
        );
        setCenterDetail(response.data);
      } catch (error) {
        console.error("Failed to fetch center details:", error);
      }
    };

    fetchCenterDetail();
  }, [uuid]);

  return (
    <div className="my-0.5 border rounded">
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <p className="grow">{centerDetail.name}를 에 산책 신청하기</p>
        <p className="grow">{centerDetail.phone}</p>
        <p className="grow">{centerDetail.email}</p>
        <p className="grow">신청하시기 전에 연락을 통해</p>
        <p className="grow">스케쥴을 확인하시는건 어떨까요?</p>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      ></Menu>
      <HouseSidingIcon className="m-3" color="action"></HouseSidingIcon>
    </div>
  );
}

export default WalkCenter;
