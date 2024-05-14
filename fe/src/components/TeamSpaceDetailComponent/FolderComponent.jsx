import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import getEnv from "../../utils/getEnv";
function FolderComponent({ folderList }) {
  const isDark = useSelector((state) => state.isDark.isDark);
  const [folder, setFolder] = useState(null);
  const back_url = getEnv("BACK_URL");
  const myCurrentProject = useSelector((state) => state.myCurrentProject.value); //프로젝트
  const projectId = myCurrentProject?.projectId;
  const handleChange = (event) => {
    setFolder(event.target.value);
  };

  const execSonarQube = async () => {
    const ans = await Swal.fire({
      title: `${folder}폴더로 정적분석을 \n실행하시겠습니까?`,
      text: `약 2~3분의 시간이 소요됩니다.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      reverseButtons: true,
    });

    if (ans.isConfirmed) {
      Swal.fire({
        title: "분석 중...",
        html: `<img src="/image/sonarQube/SinaSona.PNG" style={{width:"20px", marginBottom:"10px"}}><br>정적분석이 진행 중입니다.<br> 잠시만 기다려주세요.<br> 정적 분석은 약 2~3분 소요됩니다.`,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const res = await axios.post(
          `${back_url}/scan`,
          {
            projectId: projectId,
            folderName: folder,
          },
          { withCredentials: true }
        );

        if (res.data.isSuccess) {
          Swal.fire({
            icon: "success",
            title: "정적분석이 완료되었습니다!",
            showConfirmButton: false,
            timer: 10000,
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "정적분석에 실패하였습니다.",
          text: "다시 시도해주세요.",
        });
      } finally {
        Swal.close(); // 로딩 창 닫기
      }
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <select
        id="folderSelect"
        style={{
          backgroundColor: isDark ? "#353535" : "",
          borderColor: isDark ? "white" : "",
          color: isDark ? "white" : "",
          height: "45px",
          marginRight: "10px", // select와 button 사이의 간격 추가
        }}
        onChange={handleChange}
      >
        <option value="">정적분석할 폴더를 선택해주세요 🌼</option>
        {folderList.map((folder, index) => (
          <option key={index} value={folder}>
            {folder}
          </option>
        ))}
      </select>
      <button
        style={{
          border: "2px solid",
          borderRadius: "5px",
          backgroundColor: "white",
          borderColor: "white",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={execSonarQube}
      >
        <img
          src="/image/sonarQube/fast-forward.gif"
          style={{ width: "40px", filter: "hue-rotate(270deg)" }}
        />
      </button>
    </div>
  );
}

export default FolderComponent;
